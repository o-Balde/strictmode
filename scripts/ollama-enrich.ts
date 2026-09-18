/**
 * Serial Ollama question enricher (scripts/ollama-enrich.ts)
 *
 * Walks every question in src/data/questions/*.ts one at a time and has a
 * local thinking model rewrite its teaching copy: the explanation, every
 * option (sharper text, plausible traps) and its explanation, the
 * misconception, the interview line, progressive hints, and a new code
 * example. Each question gets two passes — a draft, then the same model
 * reviewing its own draft against the answer key — with thinking on and no
 * time limit worth mentioning.
 *
 * The answer key never passes through the model (see mergeEnrichment), and a
 * reply that fails validation is retried with the problems fed back, then
 * skipped. Each accepted question is written to its module immediately, so the
 * run can be stopped and resumed at any point.
 *
 * Default model: qwen3.8:27b — the largest dense thinking model on the box and
 * the only one that produced clean, accurate copy in testing (~45 min per
 * question on the CPU-only host: two passes of ~9k chars of thinking each).
 * gpt-oss:20b generates 8× faster but at high effort thought past 39k chars
 * without answering; it now runs at medium effort and is capped by
 * --max-thinking.
 *
 * Usage:
 *   npm run enrich -- --dry-run --id react-what-are-linters
 *   npm run enrich -- --id react-what-are-linters
 *   npm run enrich -- --max 10
 *   npm run enrich                                  # everything, resumable
 *   npm run enrich -- --subject hooks --model gpt-oss:20b
 *   npm run enrich -- --force --id <id>             # redo one already done
 *   npm run enrich -- --model qwen3.6:27b --review-model qwen3.8:27b
 *
 * Flags: --model --review-model --host --id (repeatable) --subject --type --file --max --force
 *        --status --dry-run --no-review --retries 2 --ctx 32768 --timeout 40 (minutes)
 *        --max-thinking 30000 (chars) --pause 0 (seconds) --out-dir
 *
 * Resuming: every start skips what is already enriched, read from the bank
 * itself (only enriched questions carry `example`) as well as state.json, so
 * a run killed at any point loses at most the question in flight. Ollama
 * outages are waited out instead of failing the queue. For multi-day runs use
 * `npm run enrich:forever`, which restarts the enricher if it dies and keeps
 * the Mac awake; `npm run enrich:status` shows progress and what is next.
 *
 * Ctrl+C once finishes the current question and stops; twice aborts now.
 * Thinking logs, originals and run state live in scratch/ollama-enrich/.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { QuizQuestion } from "../src/data/types";
import { loadBank, writeModule, type BankModule } from "./ollama/bank-io";
import {
  SYSTEM_PROMPT,
  buildDraftPrompt,
  buildReviewPrompt,
  chat,
  isHostDown,
  mergeEnrichment,
  parseEnrichment,
  validate,
  type ChatOptions,
  type Enrichment,
} from "./ollama/enrich-core";

// ─── Options ────────────────────────────────────────────────────────────────

interface CliOptions {
  host: string;
  model: string;
  /** Model for the review pass; the draft model when not given. */
  reviewModel: string;
  ids: string[];
  subject: string | null;
  type: string | null;
  file: string | null;
  max: number | null;
  force: boolean;
  dryRun: boolean;
  status: boolean;
  thinking: boolean;
  reviewThinking: boolean;
  review: boolean;
  retries: number;
  numCtx: number;
  timeoutMin: number;
  maxThinking: number;
  pauseSec: number;
  outDir: string;
}

function parseArgs(argv: string[]): CliOptions {
  const get = (name: string, fallback: string | null = null) => {
    const i = argv.indexOf(`--${name}`);
    return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
  };
  const has = (name: string) => argv.includes(`--${name}`);
  const ids = argv.flatMap((a, i) => (a === "--id" && argv[i + 1] ? [argv[i + 1]] : []));

  const model = get("model", process.env.OLLAMA_MODEL ?? "qwen3.8:27b")!;
  return {
    host: get("host", process.env.OLLAMA_HOST ?? "http://100.124.192.6:11434")!.replace(/\/$/, ""),
    model,
    reviewModel: get("review-model", process.env.OLLAMA_REVIEW_MODEL ?? model)!,
    ids,
    subject: get("subject"),
    type: get("type"),
    file: get("file"),
    max: get("max") ? Number(get("max")) : null,
    force: has("force"),
    dryRun: has("dry-run"),
    status: has("status"),
    thinking: true, // both settled against the models' capabilities in checkModels
    reviewThinking: true,

    review: !has("no-review"),
    retries: Number(get("retries", "2")),
    numCtx: Number(get("ctx", "32768")),
    timeoutMin: Number(get("timeout", "40")),
    maxThinking: Number(get("max-thinking", "30000")),
    pauseSec: Number(get("pause", "0")),
    outDir: get("out-dir", "scratch/ollama-enrich")!,
  };
}

// ─── Run state ──────────────────────────────────────────────────────────────

interface StateEntry {
  status: "done" | "failed";
  model: string;
  reviewModel?: string;
  at: string;
  seconds: number;
  error?: string;
}
interface State {
  /** The question in flight, so a dead run shows where it stopped. */
  current?: { id: string; startedAt: string; pid: number };
  questions: Record<string, StateEntry>;
}

function loadState(path: string): State {
  if (!existsSync(path)) return { questions: {} };
  try {
    const raw = JSON.parse(readFileSync(path, "utf-8"));
    // The first version stored the entries flat.
    return raw.questions ? (raw as State) : { questions: raw };
  } catch {
    return { questions: {} };
  }
}

/** Atomic, like the bank: a kill mid-write must not lose days of state. */
function saveState(path: string, state: State) {
  writeFileSync(`${path}.tmp`, JSON.stringify(state, null, 2));
  renameSync(`${path}.tmp`, path);
}

// ─── Stop handling ──────────────────────────────────────────────────────────

let stopRequested = false;
let firstSigint = 0;
const hardStop = new AbortController();
/** Fires on the first Ctrl+C: cuts short a host wait, never a model call. */
const softStop = new AbortController();
process.on("SIGINT", () => {
  // Wrappers (npm, tsx) can relay the terminal's Ctrl+C a second time; one
  // keypress must never count as two.
  if (stopRequested && Date.now() - firstSigint < 1500) return;
  if (stopRequested) {
    console.log("\n  [ABORT] Second Ctrl+C — aborting the in-flight request.");
    hardStop.abort();
    return;
  }
  stopRequested = true;
  firstSigint = Date.now();
  softStop.abort();
  console.log("\n  [STOP] Finishing the current question, then stopping. Ctrl+C again to abort now.");
});

// ─── Host outages ───────────────────────────────────────────────────────────

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms);
    for (const s of [hardStop.signal, softStop.signal]) {
      s.addEventListener("abort", () => (clearTimeout(t), resolve()), { once: true });
    }
  });

/**
 * Blocks until Ollama answers again. Over days the host will reboot, sleep or
 * drop off the tailnet; failing the queue through that would mark hundreds of
 * questions failed in minutes.
 */
async function waitForHost(host: string, reason: string) {
  console.warn(`\n    [HOST DOWN] ${reason} — waiting for ${host} to come back...`);
  const since = Date.now();
  let delay = 30_000;
  while (!hardStop.signal.aborted && !stopRequested) {
    await sleep(delay);
    try {
      const res = await fetch(`${host}/api/version`, { signal: AbortSignal.timeout(10_000) });
      if (res.ok) {
        console.log(`    [HOST UP] back after ${Math.round((Date.now() - since) / 60_000)} min, retrying.`);
        return;
      }
    } catch {
      // still down
    }
    delay = Math.min(delay * 2, 5 * 60_000);
  }
  throw new Error(STOPPED_WAITING);
}

const STOPPED_WAITING = "stopped while waiting for the host";

// ─── One question ───────────────────────────────────────────────────────────

const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

function progressLine(label: string) {
  return ({ thinking, content, elapsedMs }: { thinking: number; content: number; elapsedMs: number }) => {
    process.stdout.write(
      `\r    ${label}: thinking ${fmtK(thinking)} chars · answer ${fmtK(content)} chars · ${Math.round(elapsedMs / 1000)}s   `,
    );
  };
}

/**
 * One model call that must come back as a valid Enrichment. Failed attempts
 * are shown their own problems and asked again.
 */
async function obtain(
  q: QuizQuestion,
  label: string,
  userPrompt: string,
  chatOpts: ChatOptions,
  retries: number,
  log: string[],
): Promise<{ enrichment: Enrichment; warnings: string[] }> {
  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];

  let lastError = "";
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const tag = attempt > 1 ? `${label} (retry ${attempt - 1})` : label;
    let result;
    try {
      result = await chat(messages, { ...chatOpts, onProgress: progressLine(tag) });
    } catch (err) {
      process.stdout.write("\n");
      if (chatOpts.signal?.aborted) throw err;
      if (isHostDown(err)) {
        await waitForHost(chatOpts.host, (err as Error).message);
        attempt--; // an outage is not the model's attempt
        continue;
      }
      // Runaway thinking, a timeout or a dropped connection: ask again fresh.
      lastError = (err as Error).message;
      console.warn(`    [WARN] ${tag}: ${lastError}`);
      log.push(`## ${tag}\n\nFailed: ${lastError}\n`);
      continue;
    }
    process.stdout.write("\n");
    console.log(
      `    ${tag}: ${(result.elapsedMs / 1000).toFixed(0)}s, ${fmtK(result.thinking.length)} chars thinking, ${result.evalCount ?? "?"} tokens`,
    );
    log.push(`## ${tag}\n\n### Thinking\n\n${result.thinking || "(none)"}\n\n### Reply\n\n\`\`\`json\n${result.content}\n\`\`\`\n`);

    let enrichment: Enrichment;
    try {
      enrichment = parseEnrichment(result.content);
    } catch (err) {
      lastError = `reply was not valid JSON (${(err as Error).message})`;
      console.warn(`    [WARN] ${lastError}`);
      messages.push({ role: "assistant", content: result.content }, { role: "user", content: `${lastError}. Reply with the complete JSON object only.` });
      continue;
    }

    const { problems, warnings } = validate(q, enrichment);
    if (problems.length === 0) {
      for (const w of warnings) console.log(`    [note] ${w}`);
      return { enrichment, warnings };
    }
    lastError = problems.join("; ");
    console.warn(`    [WARN] ${problems.length} problem(s): ${problems.slice(0, 3).join("; ")}`);
    log.push(`### Rejected\n\n${problems.map((p) => `- ${p}`).join("\n")}\n`);
    messages.push(
      { role: "assistant", content: result.content },
      {
        role: "user",
        content: `Your JSON failed these checks:\n${problems.map((p) => `- ${p}`).join("\n")}\n\nFix every one and return the complete corrected JSON.`,
      },
    );
  }
  throw new Error(`${label} failed after ${retries + 1} attempts: ${lastError}`);
}

async function enrichOne(q: QuizQuestion, opts: CliOptions, logDir: string): Promise<QuizQuestion> {
  const twoModels = opts.review && opts.reviewModel !== opts.model;
  const chatOpts: ChatOptions = {
    host: opts.host,
    model: opts.model,
    numCtx: opts.numCtx,
    timeoutMs: opts.timeoutMin * 60_000,
    maxThinkingChars: opts.maxThinking,
    thinking: opts.thinking,
    keepAlive: twoModels ? "0" : "30m",
    signal: hardStop.signal,
  };
  const reviewOpts: ChatOptions = { ...chatOpts, model: opts.reviewModel, thinking: opts.reviewThinking };
  const models = twoModels ? `draft \`${opts.model}\` · review \`${opts.reviewModel}\`` : `model: \`${opts.model}\``;
  const log: string[] = [`# ${q.title}\n\nid: \`${q.id}\` · ${models} · ${new Date().toISOString()}\n`];

  try {
    const draft = await obtain(q, "draft", buildDraftPrompt(q), chatOpts, opts.retries, log);
    let final = draft.enrichment;

    if (opts.review) {
      try {
        const reviewed = await obtain(
          q,
          "review",
          buildReviewPrompt(q, draft.enrichment, draft.warnings),
          reviewOpts,
          opts.retries,
          log,
        );
        final = reviewed.enrichment;
      } catch (err) {
        if (hardStop.signal.aborted) throw err;
        // A draft that already passed validation beats nothing.
        console.warn(`    [WARN] review failed, keeping the draft: ${(err as Error).message}`);
      }
    }

    const merged = mergeEnrichment(q, final);
    log.push(`## Final\n\n\`\`\`json\n${JSON.stringify(merged, null, 2)}\n\`\`\`\n`);
    return merged;
  } finally {
    writeFileSync(join(logDir, `${q.id}.md`), log.join("\n"));
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

/**
 * Only an enriched question carries `example`, so the bank itself says what
 * is done. That survives a kill between writing the module and the state
 * file, or losing state.json altogether.
 */
const isEnriched = (q: QuizQuestion, state: State) =>
  state.questions[q.id]?.status === "done" || Boolean(q.example);

function select(modules: BankModule[], opts: CliOptions, state: State) {
  const queue: { mod: BankModule; index: number }[] = [];
  for (const mod of modules) {
    if (opts.file && mod.file !== opts.file && mod.file !== `${opts.file}.ts`) continue;
    mod.questions.forEach((q, index) => {
      if (opts.ids.length && !opts.ids.includes(q.id)) return;
      if (opts.subject && q.subject !== opts.subject) return;
      if (opts.type && q.type !== opts.type) return;
      if (!opts.force && isEnriched(q, state)) return;
      queue.push({ mod, index });
    });
  }
  return queue;
}

/** Both models must be pulled; thinking is switched on for each that can. */
async function checkModels(opts: CliOptions) {
  const res = await fetch(`${opts.host}/api/tags`, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`cannot reach Ollama at ${opts.host} (HTTP ${res.status})`);
  const { models } = (await res.json()) as { models: { name: string; capabilities?: string[] }[] };
  const canThink = (name: string) => {
    const found = models.find((m) => m.name === name);
    if (!found) throw new Error(`model ${name} is not pulled on ${opts.host}; have: ${models.map((m) => m.name).join(", ")}`);
    const thinks = found.capabilities?.includes("thinking") ?? true;
    if (!thinks) console.warn(`  [WARN] ${name} cannot think; it answers directly.`);
    return thinks;
  };
  opts.thinking = canThink(opts.model);
  opts.reviewThinking = opts.review ? canThink(opts.reviewModel) : false;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const logDir = join(opts.outDir, "logs");
  const origDir = join(opts.outDir, "originals");
  const statePath = join(opts.outDir, "state.json");
  mkdirSync(logDir, { recursive: true });
  mkdirSync(origDir, { recursive: true });

  const modules = await loadBank();
  const state = loadState(statePath);
  const total = modules.reduce((n, m) => n + m.questions.length, 0);
  const all = modules.flatMap((m) => m.questions);
  // Backfill: enriched in the bank but the run died before recording it.
  for (const q of all) {
    if (q.example && state.questions[q.id]?.status !== "done") {
      state.questions[q.id] = { status: "done", model: "unknown (recovered from bank)", at: new Date().toISOString(), seconds: 0 };
    }
  }
  const done = all.filter((q) => isEnriched(q, state)).length;
  const failedIds = all.filter((q) => !isEnriched(q, state) && state.questions[q.id]?.status === "failed");
  let queue = select(modules, opts, state);
  if (opts.max !== null) queue = queue.slice(0, opts.max);

  console.log("--- Ollama serial question enricher ---");
  const review = !opts.review ? "off" : opts.reviewModel === opts.model ? "same model" : opts.reviewModel;
  console.log(`Host: ${opts.host} | Draft: ${opts.model} | Review: ${review} | ctx: ${opts.numCtx}`);
  console.log(`Bank: ${total} questions, ${done} already enriched. Queue: ${queue.length}.`);

  if (state.current) {
    console.log(`Last run stopped during ${state.current.id} (started ${state.current.startedAt}); it is picked up again.`);
  }

  if (opts.status) {
    console.log(`\nDone: ${done}/${total} (${((done / total) * 100).toFixed(1)}%) · failed, will retry: ${failedIds.length} · untouched: ${total - done - failedIds.length}`);
    for (const q of failedIds) console.log(`  failed  ${q.id} — ${state.questions[q.id].error}`);
    const next = queue[0];
    console.log(next ? `Next up: ${next.mod.questions[next.index].id}` : "Nothing left to do.");
    const secs = Object.values(state.questions).filter((e) => e.status === "done" && e.seconds > 0).map((e) => e.seconds);
    if (secs.length) {
      const avg = secs.reduce((a, b) => a + b, 0) / secs.length;
      console.log(`Average ${Math.round(avg / 60)} min/question → ~${((avg * queue.length) / 86_400).toFixed(1)} days for the remaining ${queue.length}.`);
    }
    return;
  }

  if (opts.dryRun) {
    const first = queue[0];
    if (!first) return console.log("Nothing queued.");
    const q = first.mod.questions[first.index];
    console.log(`\n[DRY RUN] System prompt (${SYSTEM_PROMPT.length} chars):\n\n${SYSTEM_PROMPT}`);
    console.log(`\n[DRY RUN] Draft prompt for ${q.id}:\n\n${buildDraftPrompt(q)}`);
    return;
  }

  for (;;) {
    try {
      await checkModels(opts);
      break;
    } catch (err) {
      if (!isHostDown(err) && !(err instanceof DOMException)) throw err;
      await waitForHost(opts.host, `startup: ${(err as Error).message}`);
    }
  }

  let ok = 0;
  let failed = 0;
  const runStart = Date.now();

  for (const [n, { mod, index }] of queue.entries()) {
    if (stopRequested) break;
    const q = mod.questions[index];
    console.log(`\n[${n + 1}/${queue.length}] ${q.id}  (${mod.file}, ${q.type}, ${q.level})`);
    console.log(`  ${q.title}`);

    const origPath = join(origDir, `${q.id}.json`);
    if (!existsSync(origPath)) writeFileSync(origPath, JSON.stringify(q, null, 2));

    const started = Date.now();
    state.current = { id: q.id, startedAt: new Date().toISOString(), pid: process.pid };
    saveState(statePath, state);
    try {
      const enriched = await enrichOne(q, opts, logDir);
      mod.questions[index] = enriched;
      writeModule(mod);
      const seconds = Math.round((Date.now() - started) / 1000);
      state.questions[q.id] = {
        status: "done",
        model: opts.model,
        ...(opts.review && opts.reviewModel !== opts.model ? { reviewModel: opts.reviewModel } : {}),
        at: new Date().toISOString(), seconds };
      ok++;
      console.log(
        `  [DONE] ${seconds}s · explanation ${q.explanation.length} → ${enriched.explanation.length} chars · hints ${q.hints?.length ?? 0} → ${enriched.hints?.length ?? 0} · example added`,
      );
    } catch (err) {
      if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) {
        console.log("  [STOPPED] left unchanged; it is first in line next run.");
        break;
      }
      const seconds = Math.round((Date.now() - started) / 1000);
      state.questions[q.id] = { status: "failed", model: opts.model, at: new Date().toISOString(), seconds, error: (err as Error).message };
      failed++;
      console.error(`  [FAILED] ${(err as Error).message}`);
    }
    delete state.current;
    saveState(statePath, state);

    if (queue.length - n > 1 && ok + failed > 0) {
      const avg = (Date.now() - runStart) / (ok + failed);
      const eta = (avg * (queue.length - n - 1)) / 3_600_000;
      console.log(`  avg ${Math.round(avg / 1000)}s/question · ~${eta.toFixed(1)}h left`);
    }
    if (opts.pauseSec > 0 && !stopRequested) await new Promise((r) => setTimeout(r, opts.pauseSec * 1000));
  }

  saveState(statePath, state);
  console.log(`\nFinished: ${ok} enriched, ${failed} failed. Logs: ${logDir}`);
  if (ok > 0) console.log("Next: npm run typecheck && npm run build:index");
}

// Anything that escapes is a crash: exit non-zero so enrich-forever restarts us.
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

main().catch((err) => {
  if ((err as Error).message === STOPPED_WAITING) {
    console.log("Stopped while waiting for the host.");
    process.exit(0);
  }
  // A missing model is a typo, not a crash: exit 2 so enrich-forever gives up
  // instead of restarting into the same error every minute.
  if (/is not pulled/.test((err as Error).message)) {
    console.error(`Config error: ${(err as Error).message}`);
    process.exit(2);
  }
  console.error("Fatal:", err);
  process.exit(1);
});
