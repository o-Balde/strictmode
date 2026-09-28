/**
 * Ollama question enricher (scripts/ollama-enrich.ts)
 *
 * Walks every question in src/data/questions/*.ts and has a local model
 * rewrite its teaching copy: the explanation, every option (sharper text,
 * plausible traps) and its explanation, the misconception, the interview
 * line, progressive hints, and a new code example.
 *
 * Pipeline per question (prompts in scripts/ollama/prompts.ts):
 *   1. draft   — the author model writes the full copy, thinking first.
 *   2. fix     — anything the automated checks reject (validate in
 *                enrich-core.ts: lengths, markdown, giveaways, example code
 *                that does not parse...) goes back as a small patch request,
 *                no thinking, instead of redoing the whole draft.
 *   3. review  — the reviewer model checks the draft and returns only a patch
 *                of what is wrong; a good draft costs a few output tokens.
 *                A review that fails keeps the draft; three failed reviews in
 *                a row switch review off for the rest of the run.
 *
 * Speed on a CPU-only host comes from not wasting tokens: a thinking call
 * gets no grammar (with one, Ollama re-evaluates the whole thinking before
 * the answer — minutes of prompt processing per call on hybrid models like
 * qwen3.x), prompts are compact labelled text instead of pretty JSON, and
 * reviews and fixes answer with patches. A thinking call that runs away,
 * loops or stalls is retried once without thinking under a grammar, which
 * always terminates.
 *
 * The answer key never passes through the model (see mergeEnrichment). Each
 * accepted question is written to its module immediately, so the run can be
 * stopped and resumed at any point.
 *
 * Usage:
 *   npm run enrich -- --dry-run --id react-what-are-linters     # print the prompts
 *   npm run enrich -- --preview --id react-what-are-linters     # run, write nothing to the bank
 *   npm run enrich -- --max 10
 *   npm run enrich                                              # everything, resumable
 *   npm run enrich -- --subject hooks --model gpt-oss:20b
 *   npm run enrich -- --force --id <id>                         # redo one already done
 *   npm run enrich -- --review-model qwen3.6:27b --concurrency 2
 *   npm run enrich -- --recheck                                 # repair enriched copy that fails today's checks
 *
 * Flags: --model --review-model --host --id (repeatable) --subject --type --file --max --force
 *        --status --dry-run --preview --recheck --no-review --no-think --retries 2 (fix rounds)
 *        --ctx 16384 --max-tokens 8192 --max-thinking 16000 (chars) --timeout 45 (min per call)
 *        --concurrency 1 --keep-alive 30m --threads <n> --pause 0 (seconds) --out-dir
 *
 * --concurrency N runs N questions at once. With two models (draft and review
 * differ) that pipelines them; with one model, start Ollama with
 * OLLAMA_NUM_PARALLEL=N or the extra requests just queue. --keep-alive 0
 * unloads each model after every call, for hosts that cannot hold both.
 *
 * Resuming: every start skips what is already enriched, read from the bank
 * itself (only enriched questions carry `example`) as well as state.json.
 * Ollama outages are waited out instead of failing the queue. For multi-day
 * runs use `npm run enrich:forever`; `npm run enrich:status` shows progress,
 * failures, and questions whose answer key the model doubted.
 *
 * Ctrl+C once finishes the questions in flight and stops; twice aborts now.
 * Logs, originals, previews and run state live in scratch/ollama-enrich/.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { QuizQuestion } from "../src/data/types";
import { loadBank, writeModule, type BankModule } from "./ollama/bank-io";
import {
  ChatError,
  chat,
  estimateTokens,
  isHostDown,
  samplingFor,
  thinkFor,
  type ChatMessage,
  type ChatOptions,
  type ChatResult,
  type Progress,
} from "./ollama/client";
import {
  ENRICHMENT_SCHEMA,
  REVIEW_SCHEMA,
  applyPatch,
  describeTargets,
  fixSchema,
  fixTargets,
  mergeEnrichment,
  normalizeEnrichment,
  parseJsonObject,
  parsePatch,
  parseReview,
  patchedFields,
  validate,
  type Enrichment,
} from "./ollama/enrich-core";
import {
  AUTHOR_SYSTEM,
  FIXER_SYSTEM,
  REVIEWER_SYSTEM,
  buildDraftPrompt,
  buildFixPrompt,
  buildReformatPrompt,
  buildReviewPrompt,
} from "./ollama/prompts";

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
  preview: boolean;
  recheck: boolean;
  status: boolean;
  review: boolean;
  think: boolean;
  retries: number;
  numCtx: number;
  maxTokens: number;
  maxThinking: number;
  timeoutMin: number;
  concurrency: number;
  keepAlive: string;
  threads: number | null;
  pauseSec: number;
  outDir: string;
}

function parseArgs(argv: string[]): CliOptions {
  const get = (name: string, fallback: string | null = null) => {
    const i = argv.indexOf(`--${name}`);
    return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
  };
  const num = (name: string, fallback: number) => {
    const v = Number(get(name, String(fallback)));
    if (!Number.isFinite(v) || v < 0) throw new ConfigError(`--${name} must be a non-negative number`);
    return v;
  };
  const has = (name: string) => argv.includes(`--${name}`);
  const ids = argv.flatMap((a, i) => (a === "--id" && argv[i + 1] ? [argv[i + 1]] : []));

  const model = get("model", process.env.OLLAMA_MODEL ?? "qwen3.8:27b")!;
  return {
    host: get("host", process.env.OLLAMA_HOST ?? "http://localhost:11434")!.replace(/\/$/, ""),
    model,
    reviewModel: get("review-model", process.env.OLLAMA_REVIEW_MODEL ?? model)!,
    ids,
    subject: get("subject"),
    type: get("type"),
    file: get("file"),
    max: get("max") ? num("max", 0) : null,
    force: has("force"),
    dryRun: has("dry-run"),
    preview: has("preview"),
    recheck: has("recheck"),
    status: has("status"),
    review: !has("no-review"),
    think: !has("no-think"),
    retries: num("retries", 2),
    numCtx: num("ctx", 16384),
    maxTokens: num("max-tokens", 8192),
    maxThinking: num("max-thinking", 16000),
    timeoutMin: num("timeout", 45),
    concurrency: Math.max(1, Math.floor(num("concurrency", 1))),
    keepAlive: get("keep-alive", "30m")!,
    threads: get("threads") ? num("threads", 0) : null,
    pauseSec: num("pause", 0),
    outDir: get("out-dir", "scratch/ollama-enrich")!,
  };
}

/** A mistake in how the run was started: exit 2 so enrich-forever gives up. */
class ConfigError extends Error {}

// ─── Run state ──────────────────────────────────────────────────────────────

interface StateEntry {
  status: "done" | "failed";
  model: string;
  reviewModel?: string;
  at: string;
  seconds: number;
  error?: string;
  reviewed?: boolean;
  reviewIssues?: number;
  fixRounds?: number;
  /** The model doubted the answer key; a human should look. */
  keyConcern?: string;
}
interface State {
  /** Questions in flight, so a dead run shows where it stopped. */
  inFlight?: Record<string, { startedAt: string; pid: number }>;
  /** The single in-flight question of runs before --concurrency. */
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

const isAlive = (pid: number) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return (err as NodeJS.ErrnoException).code === "EPERM";
  }
};

/**
 * Two enrichers on one bank would each rewrite whole modules from their own
 * stale copy and silently revert the other's work.
 */
function acquireLock(lockPath: string, state: State) {
  const holders = [
    existsSync(lockPath) ? Number(readFileSync(lockPath, "utf-8")) : 0,
    state.current?.pid ?? 0,
    ...Object.values(state.inFlight ?? {}).map((f) => f.pid),
  ];
  const other = holders.find((pid) => pid && pid !== process.pid && isAlive(pid));
  if (other) throw new ConfigError(`another enricher is running (pid ${other}); stop it first, or delete ${lockPath} if it is stale`);
  writeFileSync(lockPath, String(process.pid));
  process.on("exit", () => {
    try {
      if (readFileSync(lockPath, "utf-8") === String(process.pid)) unlinkSync(lockPath);
    } catch {
      // already gone
    }
  });
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
    console.log("\n  [ABORT] Second Ctrl+C — aborting the in-flight requests.");
    hardStop.abort();
    return;
  }
  stopRequested = true;
  firstSigint = Date.now();
  softStop.abort();
  console.log("\n  [STOP] Finishing the questions in flight, then stopping. Ctrl+C again to abort now.");
});

const STOPPED_WAITING = "stopped while waiting for the host";

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
 * drop off the network; failing the queue through that would mark hundreds of
 * questions failed in minutes.
 */
async function waitForHost(host: string, reason: string) {
  console.warn(`\n    [HOST DOWN] ${reason} — waiting for ${host} to come back...`);
  const since = Date.now();
  let delay = 15_000;
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

// ─── Model calls ────────────────────────────────────────────────────────────

let opts: CliOptions;
/** Which models can think, from /api/tags. */
const canThink: Record<string, boolean> = {};

const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
const fmtDur = (ms: number) => (ms >= 90_000 ? `${Math.round(ms / 60_000)}m` : `${Math.round(ms / 1000)}s`);

/**
 * One live line on an interactive terminal with one worker; otherwise a line
 * every two minutes, which stays readable in run.log and with several workers.
 */
function progressReporter(tag: string) {
  const live = opts.concurrency === 1 && process.stdout.isTTY;
  let lastLogged = 0;
  const line = (p: Progress) =>
    `${tag}: ${p.thinking || p.content ? `thinking ${fmtK(p.thinking)} · answer ${fmtK(p.content)} chars` : "waiting for the first token"} · ${fmtDur(p.elapsedMs)}`;
  return {
    onProgress(p: Progress) {
      if (live) process.stdout.write(`\r    ${line(p)}   `);
      else if (p.elapsedMs - lastLogged >= 120_000) {
        lastLogged = p.elapsedMs;
        console.log(`    ${line(p)}`);
      }
    },
    end() {
      if (live) process.stdout.write("\n");
    },
  };
}

/** Markdown log of every call for one question, written even when it fails. */
class QuestionLog {
  private parts: string[];
  constructor(q: QuizQuestion) {
    const models = opts.review && opts.reviewModel !== opts.model ? `draft \`${opts.model}\` · review \`${opts.reviewModel}\`` : `model \`${opts.model}\``;
    this.parts = [`# ${q.title}\n\nid: \`${q.id}\` · ${models} · ${new Date().toISOString()}\n`];
  }
  add(text: string) {
    this.parts.push(text);
  }
  call(label: string, r: ChatResult) {
    const s = r.stats;
    this.add(
      `## ${label}\n\n${fmtDur(s.elapsedMs)} · prompt ${s.promptTokens} tok @ ${s.promptTps.toFixed(1)}/s · output ${s.evalTokens} tok @ ${s.evalTps.toFixed(1)}/s · load ${fmtDur(s.loadMs)}\n\n` +
        (r.thinking ? `### Thinking\n\n${r.thinking}\n\n` : "") +
        `### Reply\n\n\`\`\`json\n${r.content}\n\`\`\`\n`,
    );
  }
  failed(label: string, err: Error) {
    const partial = err instanceof ChatError ? err.partial : null;
    const tail = (s: string) => (s.length > 3000 ? `…${s.slice(-3000)}` : s);
    this.add(
      `## ${label}\n\nFailed: ${err.message}\n` +
        (partial?.thinking ? `\n### Thinking so far (tail)\n\n${tail(partial.thinking)}\n` : "") +
        (partial?.content ? `\n### Reply so far (tail)\n\n${tail(partial.content)}\n` : ""),
    );
  }
  write(path: string) {
    writeFileSync(path, this.parts.join("\n"));
  }
}

interface CallSpec<T> {
  label: string;
  model: string;
  system: string;
  user: string;
  /** Wanted; ignored for models that cannot think. */
  think: boolean;
  /** The grammar used whenever the call does not think. */
  schema: object;
  /** Fix and reformat calls: no creativity wanted. */
  mechanical?: boolean;
  parse: (raw: string) => T;
}

/** Model errors worth one more attempt; host outages are waited out separately. */
const RETRYABLE = new Set(["runaway", "loop", "length", "stall", "timeout", "http"]);

function chatOptions(spec: CallSpec<unknown>, think: boolean, promptText: string): ChatOptions {
  const capable = canThink[spec.model] ?? false;
  const thinking = think && capable;
  const promptTokens = estimateTokens(promptText);
  const wallMs = opts.timeoutMin * 60_000 * opts.concurrency;
  return {
    host: opts.host,
    model: spec.model,
    think: capable ? (thinking ? thinkFor(spec.model) : false) : null,
    format: thinking ? undefined : spec.schema,
    numCtx: opts.numCtx,
    numPredict: Math.max(1024, Math.min(opts.maxTokens, opts.numCtx - promptTokens - 256)),
    numThread: opts.threads ?? undefined,
    keepAlive: opts.keepAlive,
    sampling: samplingFor(spec.model, thinking, spec.mechanical),
    wallMs,
    // Load + prompt evaluation at ≥4 tok/s. With several workers a request can
    // queue behind another worker's whole generation, so only the wall applies.
    firstTokenMs: opts.concurrency > 1 ? wallMs : 5 * 60_000 + promptTokens * 250,
    idleMs: 10 * 60_000,
    maxThinkingChars: opts.maxThinking,
    signal: hardStop.signal,
  };
}

async function chatWithOutages(messages: ChatMessage[], o: ChatOptions, tag: string): Promise<ChatResult> {
  const progress = progressReporter(tag);
  for (let outages = 0; ; outages++) {
    try {
      return await chat(messages, { ...o, onProgress: progress.onProgress });
    } catch (err) {
      if (!isHostDown(err) || outages >= 5) throw err;
      await waitForHost(o.host, (err as Error).message);
    } finally {
      progress.end();
    }
  }
}

/**
 * One model call that must come back parseable. The ladder: think (free-form
 * reply) → if the reply does not parse, reformat it under the grammar → if the
 * call itself failed, once more without thinking, under the grammar.
 */
async function generate<T>(spec: CallSpec<T>, log: QuestionLog, tag: string): Promise<{ value: T; result: ChatResult }> {
  const capable = canThink[spec.model] ?? false;
  const plans = spec.think && capable ? [true, false] : [false, false];
  let lastError: Error | null = null;

  for (const [attempt, think] of plans.entries()) {
    const label = `${spec.label}${attempt ? ` (retry${think ? "" : ", no thinking"})` : ""} · ${spec.model}`;
    const messages: ChatMessage[] = [
      { role: "system", content: spec.system },
      { role: "user", content: spec.user },
    ];
    let result: ChatResult;
    try {
      result = await chatWithOutages(messages, chatOptions(spec, think, spec.system + spec.user), `${tag}${label}`);
    } catch (err) {
      if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) throw err;
      lastError = err as Error;
      log.failed(label, lastError);
      console.warn(`    [WARN] ${label}: ${lastError.message}`);
      if (err instanceof ChatError && !RETRYABLE.has(err.kind) && err.kind !== "host") throw err;
      continue;
    }
    log.call(label, result);
    const s = result.stats;
    console.log(
      `    ${tag}${label}: ${fmtDur(s.elapsedMs)} · thinking ${fmtK(result.thinking.length)} chars · ${s.evalTokens} tok out @ ${s.evalTps.toFixed(1)}/s · prompt ${s.promptTokens} tok @ ${s.promptTps.toFixed(1)}/s`,
    );

    try {
      return { value: spec.parse(result.content), result };
    } catch (err) {
      lastError = new Error(`${spec.label} reply did not parse: ${(err as Error).message}`);
      console.warn(`    [WARN] ${lastError.message}; reformatting under the grammar`);
    }
    if (!think) continue; // it already had the grammar

    const reformat: CallSpec<T> = { ...spec, label: `${spec.label} reformat`, system: "You re-emit content as valid JSON.", user: buildReformatPrompt(result.content), think: false, mechanical: true };
    try {
      const fixed = await chatWithOutages(
        [{ role: "user", content: reformat.user }],
        chatOptions(reformat, false, reformat.user),
        `${tag}${reformat.label}`,
      );
      log.call(reformat.label, fixed);
      return { value: spec.parse(fixed.content), result: fixed };
    } catch (err) {
      if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) throw err;
      lastError = err as Error;
      log.failed(reformat.label, lastError);
    }
  }
  throw new Error(`${spec.label} failed: ${lastError?.message ?? "unknown error"}`);
}

// ─── One question ───────────────────────────────────────────────────────────

interface Outcome {
  question: QuizQuestion;
  reviewed: boolean;
  reviewIssues: number;
  fixRounds: number;
  keyConcern: string;
}

/** Three failed reviews in a row means the review model is broken for this task. */
const reviewBreaker = { streak: 0, off: false };

/**
 * Feeds failed checks back as a patch request until they pass. Throws when
 * they still fail after --retries rounds.
 */
async function fixUntilValid(q: QuizQuestion, e: Enrichment, stage: string, log: QuestionLog, tag: string) {
  let check = validate(q, e);
  let rounds = 0;
  while (check.problems.length && rounds < opts.retries) {
    rounds++;
    console.warn(`    ${tag}[CHECKS] ${stage}: ${check.problems.length} problem(s): ${check.problems.slice(0, 3).join("; ")}`);
    log.add(`### ${stage} failed checks\n\n${check.problems.map((p) => `- ${p}`).join("\n")}\n`);
    const targets = fixTargets(check.problems, e.options.map((o) => o.id));
    const { value: patch } = await generate(
      {
        label: `${stage} fix ${rounds}`,
        model: opts.model,
        system: FIXER_SYSTEM,
        user: buildFixPrompt(q, e, check.problems, describeTargets(targets)),
        think: false,
        schema: fixSchema(targets),
        mechanical: true,
        parse: parsePatch,
      },
      log,
      tag,
    );
    e = applyPatch(e, patch);
    check = validate(q, e);
  }
  if (check.problems.length) {
    throw new Error(`${stage} still fails ${check.problems.length} check(s) after ${rounds} fix round(s): ${check.problems.slice(0, 3).join("; ")}`);
  }
  for (const w of check.warnings) console.log(`    ${tag}[note] ${w}`);
  return { enrichment: e, warnings: check.warnings, rounds };
}

/** A question's current copy in the shape the model returns. */
const copyOf = (q: QuizQuestion) => normalizeEnrichment(q, { ...q } as unknown as Record<string, unknown>);

/**
 * --recheck: the copy was enriched under older, looser checks. Patch only the
 * fields that fail today's, without thinking — minutes instead of a redraft.
 */
async function recheckOne(q: QuizQuestion, logPath: string, tag: string): Promise<Outcome> {
  const log = new QuestionLog(q);
  try {
    const fixed = await fixUntilValid(q, copyOf(q), "recheck", log, tag);
    const question = mergeEnrichment(q, fixed.enrichment);
    log.add(`## Final\n\n\`\`\`json\n${JSON.stringify(question, null, 2)}\n\`\`\`\n`);
    return { question, reviewed: false, reviewIssues: 0, fixRounds: fixed.rounds, keyConcern: "" };
  } finally {
    log.write(logPath);
  }
}

async function enrichOne(q: QuizQuestion, logPath: string, tag: string): Promise<Outcome> {
  const log = new QuestionLog(q);
  try {
    const draft = await generate(
      {
        label: "draft",
        model: opts.model,
        system: AUTHOR_SYSTEM,
        user: buildDraftPrompt(q),
        think: opts.think,
        schema: ENRICHMENT_SCHEMA,
        parse: (raw) => {
          const obj = parseJsonObject(raw);
          if (typeof obj.explanation !== "string" || !Array.isArray(obj.options)) {
            throw new Error("the object is missing explanation or options");
          }
          return normalizeEnrichment(q, obj);
        },
      },
      log,
      tag,
    );
    const fixed = await fixUntilValid(q, draft.value, "draft", log, tag);
    let current = fixed.enrichment;
    let fixRounds = fixed.rounds;
    let keyConcern = current.keyConcern?.trim() ?? "";
    let reviewed = false;
    let reviewIssues = 0;

    if (opts.review && !reviewBreaker.off) {
      try {
        const { value: review } = await generate(
          {
            label: "review",
            model: opts.reviewModel,
            system: REVIEWER_SYSTEM,
            user: buildReviewPrompt(q, current, fixed.warnings),
            think: opts.think,
            schema: REVIEW_SCHEMA,
            parse: parseReview,
          },
          log,
          tag,
        );
        reviewBreaker.streak = 0;
        reviewed = true;
        reviewIssues = review.issues.length;
        if (review.keyConcern) keyConcern = review.keyConcern;
        const fields = patchedFields(review.patch);
        const issues = review.issues.map((i) => `- ${i.field}: ${i.problem}`).join("\n");
        log.add(`### Review verdict\n\n${issues || "No issues."}\n\nPatched: ${fields.join(", ") || "nothing"}\n`);
        console.log(`    ${tag}review: ${reviewIssues} issue(s)${fields.length ? `, patched ${fields.join(", ")}` : ", draft kept as is"}`);
        if (fields.length) {
          try {
            const revised = await fixUntilValid(q, applyPatch(current, review.patch), "review", log, tag);
            current = revised.enrichment;
            fixRounds += revised.rounds;
          } catch (err) {
            if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) throw err;
            console.warn(`    ${tag}[WARN] the review's patch never passed the checks; keeping the draft: ${(err as Error).message}`);
          }
        }
      } catch (err) {
        if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) throw err;
        console.warn(`    ${tag}[WARN] review failed, keeping the draft: ${(err as Error).message}`);
        if (++reviewBreaker.streak >= 3 && !reviewBreaker.off) {
          reviewBreaker.off = true;
          console.warn(
            `\n  [REVIEW OFF] ${opts.reviewModel} failed ${reviewBreaker.streak} reviews in a row; skipping review for the rest of this run.\n`,
          );
        }
      }
    }

    if (keyConcern) console.log(`    ${tag}[KEY CONCERN] ${keyConcern}`);
    const question = mergeEnrichment(q, current);
    log.add(`## Final\n\n\`\`\`json\n${JSON.stringify(question, null, 2)}\n\`\`\`\n`);
    return { question, reviewed, reviewIssues, fixRounds, keyConcern };
  } finally {
    log.write(logPath);
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

function select(modules: BankModule[], state: State) {
  const queue: { mod: BankModule; index: number }[] = [];
  for (const mod of modules) {
    if (opts.file && mod.file !== opts.file && mod.file !== `${opts.file}.ts`) continue;
    mod.questions.forEach((q, index) => {
      if (opts.ids.length && !opts.ids.includes(q.id)) return;
      if (opts.subject && q.subject !== opts.subject) return;
      if (opts.type && q.type !== opts.type) return;
      if (opts.recheck) {
        // Only enriched copy that today's checks reject; nothing is redrafted.
        if (q.example && validate(q, copyOf(q)).problems.length) queue.push({ mod, index });
        return;
      }
      if (!opts.force && !opts.preview && isEnriched(q, state)) return;
      queue.push({ mod, index });
    });
  }
  return queue;
}

/** Both models must be pulled; thinking is used for each that can. */
async function checkModels() {
  const res = await fetch(`${opts.host}/api/tags`, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`cannot reach Ollama at ${opts.host} (HTTP ${res.status})`);
  const { models } = (await res.json()) as { models: { name: string; capabilities?: string[] }[] };
  const wanted = opts.review ? [opts.model, opts.reviewModel] : [opts.model];
  for (const name of wanted) {
    const found = models.find((m) => m.name === name || m.name === `${name}:latest`);
    if (!found) throw new ConfigError(`model ${name} is not pulled on ${opts.host}; have: ${models.map((m) => m.name).join(", ")}`);
    canThink[name] = found.capabilities?.includes("thinking") ?? true;
    if (!canThink[name]) console.warn(`  [WARN] ${name} cannot think; it answers directly under the grammar.`);
  }
}

function printStatus(all: QuizQuestion[], state: State, queue: { mod: BankModule; index: number }[]) {
  const total = all.length;
  const done = all.filter((q) => isEnriched(q, state)).length;
  const failed = all.filter((q) => !isEnriched(q, state) && state.questions[q.id]?.status === "failed");
  console.log(`\nDone: ${done}/${total} (${((done / total) * 100).toFixed(1)}%) · failed, will retry: ${failed.length} · untouched: ${total - done - failed.length}`);
  for (const q of failed) console.log(`  failed   ${q.id} — ${state.questions[q.id].error}`);

  const entries = Object.entries(state.questions).filter(([, e]) => e.status === "done");
  const reviewed = entries.filter(([, e]) => e.reviewed).length;
  if (entries.some(([, e]) => e.reviewed !== undefined)) console.log(`Reviewed: ${reviewed}/${entries.length} of the enriched questions.`);
  const concerns = entries.filter(([, e]) => e.keyConcern);
  if (concerns.length) {
    console.log(`\nAnswer key doubted by the model — check these by hand (${concerns.length}):`);
    for (const [id, e] of concerns) console.log(`  concern  ${id} — ${e.keyConcern}`);
  }

  const next = queue[0];
  console.log(next ? `\nNext up: ${next.mod.questions[next.index].id}` : "\nNothing left to do.");
  const secs = entries.map(([, e]) => e.seconds).filter((s) => s > 0).slice(-50);
  if (secs.length) {
    const avg = secs.reduce((a, b) => a + b, 0) / secs.length;
    console.log(`Average of the last ${secs.length}: ${Math.round(avg / 60)} min/question → ~${((avg * queue.length) / 86_400).toFixed(1)} days for the remaining ${queue.length} (one worker).`);
  }
}

async function main() {
  opts = parseArgs(process.argv.slice(2));
  const logDir = join(opts.outDir, "logs");
  const origDir = join(opts.outDir, "originals");
  const previewDir = join(opts.outDir, "preview");
  const statePath = join(opts.outDir, "state.json");
  for (const dir of [logDir, origDir, ...(opts.preview ? [previewDir] : [])]) mkdirSync(dir, { recursive: true });

  const modules = await loadBank();
  const state = loadState(statePath);
  const all = modules.flatMap((m) => m.questions);
  // Backfill: enriched in the bank but the run died before recording it.
  for (const q of all) {
    if (q.example && state.questions[q.id]?.status !== "done") {
      state.questions[q.id] = { status: "done", model: "unknown (recovered from bank)", at: new Date().toISOString(), seconds: 0 };
    }
  }
  let queue = select(modules, state);
  if (opts.max !== null) queue = queue.slice(0, opts.max);

  console.log("--- Ollama question enricher ---");
  const review = !opts.review ? "off" : opts.reviewModel === opts.model ? "same model" : opts.reviewModel;
  console.log(
    `Host: ${opts.host} | Draft: ${opts.model} | Review: ${review} | thinking: ${opts.think ? "on" : "off"} | ctx ${opts.numCtx} | workers ${opts.concurrency}${opts.preview ? " | PREVIEW (bank untouched)" : ""}`,
  );
  const done = all.filter((q) => isEnriched(q, state)).length;
  console.log(`Bank: ${all.length} questions, ${done} already enriched. Queue: ${queue.length}.`);
  const stale = [...(state.current ? [state.current.id] : []), ...Object.keys(state.inFlight ?? {})];
  if (stale.length) console.log(`Last run stopped during ${stale.join(", ")}; picked up again.`);

  if (opts.status) return printStatus(all, state, queue);

  if (opts.dryRun) {
    const first = queue[0];
    if (!first) return console.log("Nothing queued.");
    const q = first.mod.questions[first.index];
    const draftPrompt = buildDraftPrompt(q);
    console.log(`\n[DRY RUN] Author system prompt (~${estimateTokens(AUTHOR_SYSTEM)} tokens):\n\n${AUTHOR_SYSTEM}`);
    console.log(`\n[DRY RUN] Draft prompt for ${q.id} (~${estimateTokens(draftPrompt)} tokens):\n\n${draftPrompt}`);
    console.log(`\n[DRY RUN] Reviewer system prompt: ~${estimateTokens(REVIEWER_SYSTEM)} tokens · fixer: ~${estimateTokens(FIXER_SYSTEM)} tokens`);
    return;
  }

  if (!opts.preview) acquireLock(join(opts.outDir, "run.lock"), state);
  delete state.current;
  state.inFlight = {};

  for (;;) {
    try {
      await checkModels();
      break;
    } catch (err) {
      if (!isHostDown(err)) throw err;
      await waitForHost(opts.host, `startup: ${(err as Error).message}`);
    }
  }
  if (opts.concurrency > 1 && (!opts.review || opts.reviewModel === opts.model)) {
    console.log(`Note: ${opts.concurrency} workers on one model only help if Ollama runs with OLLAMA_NUM_PARALLEL=${opts.concurrency}.`);
  }

  let ok = 0;
  let failed = 0;
  let next = 0;
  const runStart = Date.now();

  async function processOne(n: number) {
    const { mod, index } = queue[n];
    const q = mod.questions[index];
    const tag = opts.concurrency > 1 ? `[${q.id}] ` : "";
    console.log(`\n[${n + 1}/${queue.length}] ${q.id}  (${mod.file}, ${q.type}, ${q.level})\n  ${q.title}`);

    const origPath = join(origDir, `${q.id}.json`);
    if (!existsSync(origPath)) writeFileSync(origPath, JSON.stringify(q, null, 2));

    const started = Date.now();
    if (!opts.preview) {
      state.inFlight![q.id] = { startedAt: new Date().toISOString(), pid: process.pid };
      saveState(statePath, state);
    }
    try {
      const out = await (opts.recheck ? recheckOne : enrichOne)(q, join(logDir, `${q.id}${opts.recheck ? ".recheck" : ""}.md`), tag);
      const seconds = Math.round((Date.now() - started) / 1000);
      if (opts.preview) {
        writeFileSync(join(previewDir, `${q.id}.json`), JSON.stringify(out.question, null, 2));
      } else {
        mod.questions[index] = out.question;
        writeModule(mod);
        state.questions[q.id] = opts.recheck
          ? { ...state.questions[q.id], fixRounds: out.fixRounds, at: new Date().toISOString() }
          : {
          status: "done",
          model: opts.model,
          ...(opts.review && opts.reviewModel !== opts.model ? { reviewModel: opts.reviewModel } : {}),
          at: new Date().toISOString(),
          seconds,
          reviewed: out.reviewed,
          reviewIssues: out.reviewIssues,
          fixRounds: out.fixRounds,
          ...(out.keyConcern ? { keyConcern: out.keyConcern } : {}),
        };
      }
      ok++;
      console.log(
        `  ${tag}[DONE] ${fmtDur(seconds * 1000)} · explanation ${q.explanation.length} → ${out.question.explanation.length} chars · hints ${q.hints?.length ?? 0} → ${out.question.hints?.length ?? 0} · ${out.reviewed ? `reviewed (${out.reviewIssues} issue(s))` : "not reviewed"}${opts.preview ? ` · preview: ${join(previewDir, `${q.id}.json`)}` : ""}`,
      );
    } catch (err) {
      if (hardStop.signal.aborted || (err as Error).message === STOPPED_WAITING) {
        console.log(`  ${tag}[STOPPED] left unchanged; it is first in line next run.`);
        return;
      }
      const seconds = Math.round((Date.now() - started) / 1000);
      // A failed recheck leaves the old copy in place; it is still enriched.
      if (!opts.preview && !opts.recheck) {
        state.questions[q.id] = { status: "failed", model: opts.model, at: new Date().toISOString(), seconds, error: (err as Error).message };
      }
      failed++;
      console.error(`  ${tag}[FAILED] ${(err as Error).message}`);
    } finally {
      if (!opts.preview) {
        delete state.inFlight![q.id];
        saveState(statePath, state);
      }
    }

    const finished = ok + failed;
    const left = queue.length - next;
    if (left > 0 && finished > 0) {
      const avg = (Date.now() - runStart) / finished;
      console.log(`  avg ${fmtDur(avg)}/question (wall) · ~${((avg * left) / 3_600_000).toFixed(1)}h left`);
    }
  }

  async function worker() {
    while (!stopRequested && !hardStop.signal.aborted && next < queue.length) {
      await processOne(next++);
      if (opts.pauseSec > 0 && !stopRequested) await sleep(opts.pauseSec * 1000);
    }
  }
  await Promise.all(Array.from({ length: Math.min(opts.concurrency, queue.length) }, worker));

  if (!opts.preview) saveState(statePath, state);
  console.log(`\nFinished: ${ok} enriched, ${failed} failed. Logs: ${logDir}`);
  if (ok > 0 && !opts.preview) console.log("Next: npm run typecheck && npm run build:index");
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
  // A missing model or a second enricher is a setup problem, not a crash:
  // exit 2 so enrich-forever gives up instead of restarting into it.
  if (err instanceof ConfigError) {
    console.error(`Config error: ${err.message}`);
    process.exit(2);
  }
  console.error("Fatal:", err);
  process.exit(1);
});
