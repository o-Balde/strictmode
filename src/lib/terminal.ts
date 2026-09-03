/**
 * Decides when the Homebrew terminal skin (black ground, phosphor green, mono)
 * replaces the standard palette.
 *
 * The skin means one thing: this text is console output. It therefore never
 * applies to a code snippet — a snippet is source code, and in an
 * output-prediction question it is the *program*, not what the program printed.
 * Snippets are set like an editor; only options that read as logged values get
 * the terminal.
 */
import type { QuestionType } from "@data";

/** Bare values a console would print. */
const VALUE_LIKE =
  /^(undefined|null|NaN|Infinity|-?\d+(\.\d+)?|true|false|\[.*\]|\{.*\}|".*"|'.*'|`.*`)$/;

/** Diagnostics a console would print. */
const DIAGNOSTIC_LIKE = /\b(Error|Warning|TypeError|ReferenceError|SyntaxError|RangeError):/;

/** A single option renders in terminal skin. */
export function isTerminalOption(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  // Multi-line options are almost always transcript-shaped ("setup\ncleanup").
  if (t.includes("\n")) return true;
  if (DIAGNOSTIC_LIKE.test(t)) return true;
  // Guard against prose that happens to start with a number ("2 renders, because…").
  if (t.length > 60) return false;
  if (VALUE_LIKE.test(t)) return true;
  // "0 then 0", "1 then 2" — the mockup's own output options.
  if (/^[\w"'[\]{}.-]+(\s+then\s+[\w"'[\]{}.-]+)+$/i.test(t)) return true;
  return false;
}

/**
 * A printed sequence of values, e.g. "1 4 7 5 2 3 6" or "0 → 1 → 2".
 * Tokens are restricted to literal values — matching bare words would classify
 * any short sentence ("It runs on a worker thread") as console output.
 */
const VALUE_TOKEN = String.raw`(?:-?\d+(?:\.\d+)?|true|false|null|undefined|NaN|"[^"]*"|'[^']*')`;
const SEQUENCE_LIKE = new RegExp(
  `^${VALUE_TOKEN}(?:[\\s,]+(?:→|->)?\\s*${VALUE_TOKEN})+$`,
);

/** Longer than this and an option is prose, whatever shape it has. */
const MAX_TRANSCRIPT_LENGTH = 45;

/**
 * Terminal skin is only worth applying to an option *set* — a lone green option
 * among four prose answers reads as a bug, not a theme.
 *
 * An output-prediction question is asking what the console prints, so its
 * options are transcripts by definition — but only if they are actually short.
 * Much of the bank labels a question `output` and then offers four sentences of
 * prose, and those must stay prose.
 */
export function optionsAreTerminal(texts: string[], type?: QuestionType): boolean {
  if (texts.length === 0) return false;

  const allShort = texts.every((t) => t.trim().length <= MAX_TRANSCRIPT_LENGTH);
  if (type === "output" && allShort) return true;

  const hits = texts.filter(
    (t) => isTerminalOption(t) || (t.trim().length <= MAX_TRANSCRIPT_LENGTH && SEQUENCE_LIKE.test(t.trim())),
  ).length;
  return hits >= Math.max(2, Math.ceil(texts.length * 0.75));
}
