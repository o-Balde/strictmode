/**
 * The model-facing half of the question enricher (scripts/ollama-enrich.ts):
 * prompts, the structured-output schema, a streaming Ollama client, and the
 * validation that stands between the model and the bank.
 *
 * The model only ever proposes teaching copy. The answer key — which option is
 * correct, the option ids, the snippet, the console output an `output`
 * question prints — never passes through it, so `mergeEnrichment` rebuilds the
 * question from the original and takes only the prose fields from the model.
 */
import type { CodeLanguage, QuestionExample, QuizQuestion } from "../../src/data/types";

// ─── Shape the model returns ────────────────────────────────────────────────

export interface Enrichment {
  explanation: string;
  options: { id: string; text: string; explanation: string }[];
  misconception: string;
  interviewLine: string;
  hints: string[];
  example: QuestionExample;
}

const LANGUAGES: CodeLanguage[] = ["tsx", "typescript", "javascript", "jsx", "css", "json"];

/** Ollama structured outputs: the reply's `content` is constrained to this. */
export const ENRICHMENT_SCHEMA = {
  type: "object",
  properties: {
    explanation: { type: "string" },
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          text: { type: "string" },
          explanation: { type: "string" },
        },
        required: ["id", "text", "explanation"],
      },
    },
    misconception: { type: "string" },
    interviewLine: { type: "string" },
    hints: { type: "array", items: { type: "string" } },
    example: {
      type: "object",
      properties: {
        caption: { type: "string" },
        language: { type: "string", enum: LANGUAGES },
        code: { type: "string" },
      },
      required: ["caption", "language", "code"],
    },
  },
  required: ["explanation", "options", "misconception", "interviewLine", "hints", "example"],
} as const;

// ─── Prompts ────────────────────────────────────────────────────────────────

export const SYSTEM_PROMPT = `You are a staff frontend engineer and meticulous technical editor for StrictMode, a daily interview-drill app for React, TypeScript, Next.js (App Router) and JavaScript. You are improving ONE multiple-choice question at a time. A learner reads your copy right after answering, so every sentence must teach something true.

Ground truth: React 19, Next.js 16 App Router, TypeScript 5.x, modern ES2024 JavaScript, current browser APIs. Never invent APIs, flags or behaviour. If the original copy contains an error or outdated claim, fix it silently. Accuracy beats length.

THE ANSWER KEY IS FIXED. The option marked CORRECT stays the only correct answer; every other option must stay definitively wrong. Keep the same option ids in the same order.

Write these fields:

explanation — why the correct answer is correct. 2 to 4 short paragraphs separated by a blank line ("\\n\\n"). Cover: the underlying mechanism, why it matters in real code, and one edge case or nuance interviewers probe. Keep every true fact from the original, drop scraped junk ("Learn more", broken sentences). Plain text only: inline code in single backticks, no markdown headings, bullets, bold or fenced code blocks. Aim for 600–1400 characters.

options — for every option, in order:
  text: the option as the learner sees it. Sharpen it, but keep its meaning (a wrong option stays wrong, the correct one stays correct). Wrong options must be PLAUSIBLE traps a real candidate would pick — built from a genuine misconception, similar length and specificity to the correct one, never absurd or joke answers. The correct option must not stand out by length or by hedging words.
  explanation: correct option → start with "Correct. " and say why in 1–3 sentences. Wrong option → name the belief that makes it tempting and precisely why it fails, 1–3 sentences. Never start a wrong option's explanation with "Correct".

misconception — the single most common wrong mental model behind this question, specific to it, in 1–2 sentences. Do not prefix it with "Common misconception" or "The trap".

interviewLine — 1–2 sentences a strong candidate would actually say out loud in an interview: concrete, confident, with the key mechanism named. No "Interview takeaway:" prefix.

hints — 2 or 3 progressive hints, from a gentle nudge to nearly there. Never mention an option letter and never quote the correct option.

example — a small, realistic code example (4 to 25 lines) that illustrates the concept, different from the question's own snippet. caption: one sentence saying what to notice. language: one of tsx, typescript, javascript, jsx, css, json. For conceptual or architecture topics, still show a tiny concrete snippet (a config, a hook, a type, a function).

Think it through carefully before answering: verify each technical claim, check each wrong option really is wrong, then write. Reply with the JSON object only.`;

/** What the model sees of a question: the content, not the bookkeeping. */
function questionView(q: QuizQuestion) {
  return {
    title: q.title,
    prompt: q.prompt,
    level: q.level,
    type: q.type,
    topic: `${q.category} / ${q.subject}`,
    codeSnippet: q.codeSnippet ?? undefined,
    codeLanguage: q.codeSnippet ? q.codeLanguage : undefined,
    consoleOutput: q.consoleOutput,
    fixData: q.fixData,
    options: (q.options ?? []).map((o) => ({
      id: o.id,
      text: o.text,
      status: o.isCorrect ? "CORRECT" : "wrong",
      explanation: o.explanation,
    })),
    explanation: q.explanation,
    misconception: q.misconception,
    interviewLine: q.interviewLine,
    hints: q.hints,
    example: q.example,
  };
}

export function buildDraftPrompt(q: QuizQuestion): string {
  const locked = optionTextLocked(q)
    ? `\nThis is an "${q.type}" question: the option texts are exact program output. Return every option text EXACTLY as given; improve only the explanations.\n`
    : "";
  return `Improve this question. Current version:\n\n${JSON.stringify(questionView(q), null, 2)}\n${locked}\nReturn the improved fields as JSON.`;
}

export function buildReviewPrompt(q: QuizQuestion, draft: Enrichment, warnings: string[]): string {
  const notes = warnings.length
    ? `\nAutomated checks flagged:\n${warnings.map((w) => `- ${w}`).join("\n")}\n`
    : "";
  return `You are now the reviewer. Below is the ORIGINAL question and a DRAFT of improved copy.

ORIGINAL:
${JSON.stringify(questionView(q), null, 2)}

DRAFT:
${JSON.stringify(draft, null, 2)}
${notes}
Check the draft line by line: every technical claim is true; the option marked CORRECT in the original is still unambiguously correct and every other option still unambiguously wrong; no option gives the answer away by length or wording; the example code is valid and actually shows the concept; hints do not reveal the answer. Fix anything wrong and sharpen weak sentences. Do not shorten good content. Return the corrected full JSON.`;
}

export function optionTextLocked(q: QuizQuestion): boolean {
  return q.type === "output" || q.type === "puzzle";
}

// ─── Ollama client ──────────────────────────────────────────────────────────

export interface ChatOptions {
  host: string;
  model: string;
  numCtx: number;
  timeoutMs: number;
  /**
   * Thinking past this is a loop, not diligence: qwen3.8:27b settles in ~9k
   * chars per pass, while gpt-oss:20b at high effort ran past 39k without
   * answering. The call is cut and the caller retries.
   */
  maxThinkingChars: number;
  /** False for models without the capability (the coder models): Ollama rejects `think` for them. */
  thinking: boolean;
  /**
   * How long Ollama keeps the model loaded afterwards. "0" when draft and
   * review use different models: two 27B models resident at once push the
   * CPU-only host into swap, which stalled generation outright in testing.
   */
  keepAlive: string;
  signal?: AbortSignal;
  onProgress?: (p: { thinking: number; content: number; elapsedMs: number }) => void;
}

export interface ChatResult {
  thinking: string;
  content: string;
  elapsedMs: number;
  evalCount?: number;
}

/**
 * gpt-oss takes a reasoning effort instead of a boolean; "high" loops on this
 * task, so it gets "medium". Every other thinking model takes `true`.
 */
function thinkParam(model: string): boolean | "medium" {
  return model.startsWith("gpt-oss") ? "medium" : true;
}

/**
 * Streams, because a 27B model thinking for several minutes would outlive
 * undici's 300 s headers timeout on a non-streaming request.
 */
export async function chat(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  opts: ChatOptions,
): Promise<ChatResult> {
  const started = Date.now();
  const timeout = AbortSignal.timeout(opts.timeoutMs);
  const runaway = new AbortController();
  const signal = AbortSignal.any([timeout, runaway.signal, ...(opts.signal ? [opts.signal] : [])]);

  const res = await fetch(`${opts.host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      model: opts.model,
      messages,
      stream: true,
      ...(opts.thinking ? { think: thinkParam(opts.model) } : {}),
      format: ENRICHMENT_SCHEMA,
      keep_alive: opts.keepAlive,
      options: {
        // Qwen3's recommended thinking-mode sampling; fine for the others too.
        temperature: 0.6,
        top_p: 0.95,
        top_k: 20,
        num_ctx: opts.numCtx,
        num_predict: Math.floor(opts.numCtx * 0.75),
      },
    }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`Ollama HTTP ${res.status}: ${await res.text()}`);
  }

  let thinking = "";
  let content = "";
  let evalCount: number | undefined;
  let buffer = "";
  const decoder = new TextDecoder();
  let lastTick = 0;

  for await (const chunk of res.body as unknown as AsyncIterable<Uint8Array>) {
    buffer += decoder.decode(chunk, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      const msg = JSON.parse(line);
      if (msg.error) throw new Error(`Ollama: ${msg.error}`);
      thinking += msg.message?.thinking ?? "";
      content += msg.message?.content ?? "";
      if (msg.done) evalCount = msg.eval_count;
    }
    if (thinking.length > opts.maxThinkingChars && !content) {
      runaway.abort();
      throw new Error(`runaway thinking: ${thinking.length} chars without an answer`);
    }
    const now = Date.now();
    if (opts.onProgress && now - lastTick > 1000) {
      lastTick = now;
      opts.onProgress({ thinking: thinking.length, content: content.length, elapsedMs: now - started });
    }
  }

  // Models without a separate thinking channel inline it.
  const inline = content.match(/<think>([\s\S]*?)<\/think>/i);
  if (inline && !thinking) thinking = inline[1].trim();

  return { thinking, content, elapsedMs: Date.now() - started, evalCount };
}

/**
 * The host is unreachable or restarting, as opposed to the model misbehaving.
 * These say nothing about the question, so they must not count as attempts.
 */
export function isHostDown(err: unknown): boolean {
  const e = err as { message?: string; cause?: { code?: string } };
  const code = e?.cause?.code ?? "";
  const msg = e?.message ?? "";
  return (
    /ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ENETUNREACH|ETIMEDOUT|EAI_AGAIN|UND_ERR_SOCKET|UND_ERR_CONNECT_TIMEOUT/.test(code) ||
    /fetch failed|terminated|other side closed|socket hang up/i.test(msg) ||
    /Ollama HTTP 5\d\d/.test(msg)
  );
}

// ─── Parsing & validation ───────────────────────────────────────────────────

export function parseEnrichment(raw: string): Enrichment {
  let text = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fence) text = fence[1];
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("no JSON object in reply");
  return JSON.parse(text.slice(start, end + 1)) as Enrichment;
}

const TEMPLATED = [
  /^common misconception:/i,
  /^interview takeaway:/i,
  /^the trap:/i,
  /clearly articulate the underlying mechanism/i,
  /misunderstanding the execution lifecycle/i,
];

const str = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/**
 * Hard problems make the attempt fail and retry with the problems fed back.
 * Warnings are handed to the review pass but never block a write.
 */
export function validate(q: QuizQuestion, e: Enrichment): { problems: string[]; warnings: string[] } {
  const problems: string[] = [];
  const warnings: string[] = [];
  const original = q.options ?? [];

  if (!str(e.explanation)) problems.push("explanation is empty");
  else {
    const floor = Math.min(Math.round(q.explanation.length * 0.8), 600);
    if (e.explanation.length < floor) {
      problems.push(`explanation shrank to ${e.explanation.length} chars; it must be at least ${floor}`);
    }
    if (e.explanation.length > 3500) problems.push(`explanation is ${e.explanation.length} chars; keep it under 3500`);
    if (/```/.test(e.explanation)) problems.push("explanation contains a fenced code block; use inline backticks only");
    if (/^\s*(#{1,6}\s|[-*]\s)/m.test(e.explanation)) problems.push("explanation uses markdown headings or bullets");
  }

  if (!Array.isArray(e.options)) problems.push("options is missing");
  else {
    const want = original.map((o) => o.id).join(",");
    const got = e.options.map((o) => o?.id).join(",");
    if (want !== got) problems.push(`option ids must be exactly [${want}] in that order, got [${got}]`);
    for (const [i, o] of e.options.entries()) {
      const src = original[i];
      if (!src || !o) continue;
      if (!str(o.text)) problems.push(`option ${o.id} text is empty`);
      if (!str(o.explanation)) problems.push(`option ${o.id} explanation is empty`);
      else if (!src.isCorrect && /^correct\b/i.test(o.explanation.trim())) {
        problems.push(`option ${o.id} is WRONG but its explanation starts with "Correct"`);
      } else if (src.isCorrect && !/^correct\b/i.test(o.explanation.trim())) {
        warnings.push(`correct option ${o.id}'s explanation should start with "Correct."`);
      }
    }
    if (!optionTextLocked(q) && e.options.length === original.length && original.length > 1) {
      const correct = e.options.find((_, i) => original[i].isCorrect);
      const wrong = e.options.filter((_, i) => !original[i].isCorrect);
      const avg = wrong.reduce((n, o) => n + (o.text?.length ?? 0), 0) / Math.max(1, wrong.length);
      if (correct && avg > 0 && correct.text.length > avg * 1.8) {
        warnings.push(
          `the correct option is ${correct.text.length} chars vs ${Math.round(avg)} on average for the wrong ones — its length gives it away`,
        );
      }
    }
  }

  for (const field of ["misconception", "interviewLine"] as const) {
    const v = e[field];
    if (!str(v)) problems.push(`${field} is empty`);
    else {
      if (TEMPLATED.some((re) => re.test(v.trim()))) problems.push(`${field} is boilerplate; make it specific to this question`);
      if (v.length > 500) problems.push(`${field} is ${v.length} chars; keep it under 500`);
    }
  }

  if (!Array.isArray(e.hints) || e.hints.length < 2 || e.hints.length > 4) {
    problems.push("hints must be an array of 2 to 3 strings");
  } else {
    const correct = original.find((o) => o.isCorrect);
    for (const h of e.hints) {
      if (!str(h)) problems.push("a hint is empty");
      else if (/\b(option|answer)\s+[A-D]\b/i.test(h)) problems.push(`hint names an option letter: "${h}"`);
      else if (correct && correct.text.length > 20 && h.includes(correct.text)) problems.push("a hint quotes the correct option");
    }
  }

  const ex = e.example;
  if (!ex || !str(ex.code) || !str(ex.caption)) problems.push("example needs caption and code");
  else {
    if (!LANGUAGES.includes(ex.language)) problems.push(`example.language must be one of ${LANGUAGES.join(", ")}`);
    const lines = ex.code.trim().split("\n").length;
    if (lines > 30) problems.push(`example is ${lines} lines; keep it at 25 or fewer`);
    if (ex.code.length > 1800) problems.push("example code is too long");
  }

  return { problems, warnings };
}

/**
 * Rebuilds the question around the model's copy. Everything that decides
 * grading comes from the original.
 */
export function mergeEnrichment(q: QuizQuestion, e: Enrichment): QuizQuestion {
  const locked = optionTextLocked(q);
  const options = (q.options ?? []).map((o, i) => ({
    ...o,
    text: locked ? o.text : e.options[i].text.trim(),
    explanation: e.options[i].explanation.trim(),
  }));
  return {
    ...q,
    options,
    explanation: e.explanation.trim(),
    misconception: e.misconception.trim(),
    interviewLine: e.interviewLine.trim(),
    hints: e.hints.map((h) => h.trim()),
    example: {
      caption: e.example.caption.trim(),
      language: e.example.language,
      code: e.example.code.replace(/\s+$/, ""),
    },
  };
}
