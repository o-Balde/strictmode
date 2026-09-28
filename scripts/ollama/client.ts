/**
 * Streaming Ollama chat client for the enricher (scripts/ollama-enrich.ts).
 *
 * Talks to /api/chat over node:http rather than fetch. undici's 300 s headers
 * and body timeouts fire while a CPU-only host is still evaluating a long
 * prompt (Ollama sends nothing until the first token) or re-evaluating the
 * thinking before a structured answer; the old client read that as the host
 * being down and retried the same call forever. Here every limit is explicit
 * and ends in a typed ChatError the caller can act on.
 */
import http from "node:http";
import https from "node:https";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/** gpt-oss takes an effort level; every other thinking model a boolean. */
export type Think = boolean | "low" | "medium" | "high";

export type ChatErrorKind =
  /** Unreachable, restarting or dropped the connection: wait, it says nothing about the model. */
  | "host"
  /** Ollama answered with an error status or an error line. */
  | "http"
  /** Our own hard stop (second Ctrl+C). */
  | "aborted"
  /** The wall-clock cap for one call. */
  | "timeout"
  /** No token for too long: a hung runner or a parser holding output back. */
  | "stall"
  /** Thinking past the cap without starting the answer. */
  | "runaway"
  /** The same text over and over, or an endless run of whitespace. */
  | "loop"
  /** Ran out of num_predict before finishing. */
  | "length";

export class ChatError extends Error {
  readonly kind: ChatErrorKind;
  readonly partial: { thinking: string; content: string };
  constructor(kind: ChatErrorKind, message: string, partial = { thinking: "", content: "" }) {
    super(message);
    this.name = "ChatError";
    this.kind = kind;
    this.partial = partial;
  }
}

export interface ChatOptions {
  host: string;
  model: string;
  /** null for models without the capability: Ollama rejects `think` for them. */
  think: Think | null;
  /** JSON schema for structured output (a grammar); omitted for free-form replies. */
  format?: object;
  numCtx: number;
  numPredict: number;
  numThread?: number;
  keepAlive: string;
  /** Sampling overrides; undefined keeps the Modelfile's own defaults. */
  sampling?: Record<string, number>;
  /** Hard cap on the whole call. */
  wallMs: number;
  /** How long to wait for the first token: model load plus prompt evaluation. */
  firstTokenMs: number;
  /** How long a started generation may go without a token. */
  idleMs: number;
  maxThinkingChars: number;
  signal?: AbortSignal;
  onProgress?: (p: Progress) => void;
}

export interface Progress {
  thinking: number;
  content: number;
  elapsedMs: number;
}

export interface ChatStats {
  elapsedMs: number;
  loadMs: number;
  promptTokens: number;
  promptTps: number;
  evalTokens: number;
  evalTps: number;
}

export interface ChatResult {
  thinking: string;
  content: string;
  stats: ChatStats;
}

const HOST_CODES = /ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ENETUNREACH|ETIMEDOUT|EAI_AGAIN|EPIPE|UND_ERR_SOCKET|UND_ERR_CONNECT_TIMEOUT/;

/** ~3.5 characters per token for English prose mixed with code. */
export const estimateTokens = (text: string) => Math.ceil(text.length / 3.5);

/**
 * A model stuck in a loop repeats its own tail. Four copies of the last 150
 * characters inside the last 6000 is not something real prose or code does;
 * neither is 150 characters of pure whitespace (the classic grammar-mode
 * failure, where the model pads the JSON forever).
 */
export function isLooping(text: string): boolean {
  if (text.length < 1500) return false;
  const tail = text.slice(-150);
  if (!tail.trim()) return true;
  const window = text.slice(-6000);
  let count = 0;
  for (let i = window.indexOf(tail); i !== -1; i = window.indexOf(tail, i + 1)) {
    if (++count >= 4) return true;
  }
  return false;
}

/**
 * Each family's recommended sampling. Everything else keeps its Modelfile
 * defaults; a custom Modelfile was usually tuned on purpose. Mechanical calls
 * (fix these fields, reformat this JSON) run cooler for every model.
 */
export function samplingFor(model: string, thinking: boolean, mechanical = false): Record<string, number> | undefined {
  if (mechanical) return { temperature: 0.3, top_p: 0.9 };
  if (/^qwen/i.test(model)) {
    return thinking
      ? { temperature: 0.6, top_p: 0.95, top_k: 20, min_p: 0 }
      : { temperature: 0.7, top_p: 0.8, top_k: 20, min_p: 0 };
  }
  if (/^gpt-oss/i.test(model)) return { temperature: 1, top_p: 1 };
  return undefined;
}

/** gpt-oss at "high" thought past 39k chars without answering on this task. */
export function thinkFor(model: string): Think {
  return /^gpt-oss/i.test(model) ? "medium" : true;
}

function post(url: string, body: string, signal: AbortSignal): Promise<http.IncomingMessage> {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = mod.request(
      u,
      {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
      },
      resolve,
    );
    req.on("error", reject);
    req.end(body);
  });
}

async function readAll(res: http.IncomingMessage): Promise<string> {
  let text = "";
  res.setEncoding("utf8");
  for await (const chunk of res as AsyncIterable<string>) text += chunk;
  return text;
}

const mins = (ms: number) => `${Math.round(ms / 60_000)} min`;

export async function chat(messages: ChatMessage[], o: ChatOptions): Promise<ChatResult> {
  const started = Date.now();
  const ctl = new AbortController();
  const signal = o.signal ? AbortSignal.any([ctl.signal, o.signal]) : ctl.signal;

  let thinking = "";
  let content = "";
  let lastTokenAt = started;
  let gotToken = false;
  // A holder, not a `let`: TS would narrow a let assigned only in closures to null.
  const why = { stopped: null as { kind: ChatErrorKind; message: string } | null };
  const fail = (kind: ChatErrorKind, message: string) => new ChatError(kind, message, { thinking, content });
  const stop = (kind: ChatErrorKind, message: string) => {
    why.stopped ??= { kind, message };
    ctl.abort();
  };

  const watchdog = setInterval(() => {
    const now = Date.now();
    if (now - started > o.wallMs) stop("timeout", `no complete answer after ${mins(o.wallMs)}`);
    else if (!gotToken && now - started > o.firstTokenMs) {
      stop("stall", `no first token after ${mins(o.firstTokenMs)} (model load + prompt evaluation)`);
    } else if (gotToken && now - lastTokenAt > o.idleMs) stop("stall", `no new token for ${mins(o.idleMs)}`);
    o.onProgress?.({ thinking: thinking.length, content: content.length, elapsedMs: now - started });
  }, 1000);

  const body = JSON.stringify({
    model: o.model,
    messages,
    stream: true,
    ...(o.think !== null ? { think: o.think } : {}),
    ...(o.format ? { format: o.format } : {}),
    keep_alive: o.keepAlive,
    options: {
      ...o.sampling,
      num_ctx: o.numCtx,
      num_predict: o.numPredict,
      ...(o.numThread ? { num_thread: o.numThread } : {}),
    },
  });

  try {
    const res = await post(`${o.host}/api/chat`, body, signal);
    if (res.statusCode !== 200) {
      const text = (await readAll(res)).slice(0, 500);
      // 503 is Ollama's "server busy" (queue full): wait it out like an outage.
      throw fail(res.statusCode === 503 ? "host" : "http", `Ollama HTTP ${res.statusCode}: ${text}`);
    }

    let buffer = "";
    let lastCheck = 0;
    let final: { done_reason?: string; [k: string]: unknown } | null = null;
    res.setEncoding("utf8");
    for await (const chunk of res as AsyncIterable<string>) {
      buffer += chunk;
      let nl: number;
      while ((nl = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line) continue;
        const msg = JSON.parse(line);
        if (msg.error) throw fail("http", `Ollama: ${msg.error}`);
        const t: string = msg.message?.thinking ?? "";
        const c: string = msg.message?.content ?? "";
        if (t || c) {
          gotToken = true;
          lastTokenAt = Date.now();
          thinking += t;
          content += c;
        }
        if (msg.done) final = msg;
      }

      const now = Date.now();
      if (now - lastCheck > 2000) {
        lastCheck = now;
        if (thinking.length > o.maxThinkingChars && !content.trim()) {
          stop("runaway", `thought ${thinking.length} chars without starting the answer`);
          break;
        }
        if (isLooping(content) || (!content && isLooping(thinking))) {
          stop("loop", `the ${content ? "answer" : "thinking"} is repeating itself`);
          break;
        }
      }
    }

    if (why.stopped) throw fail(why.stopped.kind, why.stopped.message);
    if (!final) throw fail("host", "the stream ended before the model finished (runner restarted?)");
    if (final.done_reason === "length") {
      throw fail("length", `hit the ${o.numPredict}-token budget before finishing (thinking ${thinking.length} chars)`);
    }

    // Models without a separate thinking channel inline it.
    const inline = content.match(/<think>([\s\S]*?)<\/think>/i);
    if (inline && !thinking) thinking = inline[1].trim();

    const ns = (k: string) => Number(final![k] ?? 0);
    const tps = (count: number, dur: number) => (dur > 0 ? count / (dur / 1e9) : 0);
    return {
      thinking,
      content,
      stats: {
        elapsedMs: Date.now() - started,
        loadMs: ns("load_duration") / 1e6,
        promptTokens: ns("prompt_eval_count"),
        promptTps: tps(ns("prompt_eval_count"), ns("prompt_eval_duration")),
        evalTokens: ns("eval_count"),
        evalTps: tps(ns("eval_count"), ns("eval_duration")),
      },
    };
  } catch (err) {
    if (why.stopped) throw fail(why.stopped.kind, why.stopped.message);
    if (o.signal?.aborted) throw fail("aborted", "stopped by the user");
    if (err instanceof ChatError) throw err;
    const e = err as NodeJS.ErrnoException;
    if (HOST_CODES.test(e.code ?? "") || /socket hang up|aborted|terminated/i.test(e.message ?? "")) {
      throw fail("host", `${e.code ?? ""} ${e.message}`.trim());
    }
    throw err;
  } finally {
    clearInterval(watchdog);
  }
}

/**
 * The host is unreachable or restarting, as opposed to the model misbehaving.
 * Covers ChatError and the plain fetch used for /api/tags.
 */
export function isHostDown(err: unknown): boolean {
  if (err instanceof ChatError) return err.kind === "host";
  const e = err as { name?: string; message?: string; cause?: { code?: string } };
  return (
    e?.name === "TimeoutError" ||
    HOST_CODES.test(e?.cause?.code ?? "") ||
    /fetch failed|other side closed|socket hang up/i.test(e?.message ?? "")
  );
}
