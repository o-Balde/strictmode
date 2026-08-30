/**
 * Splits an option's text into console output and prose.
 *
 * "0 then 2" is not a console transcript: a program that logs 0 and then 2
 * prints `0` and `2`, and the word "then" is the question's own connective.
 * Painting the whole string phosphor green claims the connective was printed
 * too. So an option is tokenised, and only the parts a console would actually
 * emit are set as output.
 *
 * The same split gives options with inline code (`useState`, `arr.length`) the
 * editor treatment they get inside a question.
 *
 * Backtick-delimited code spans (`` `useState(0)` ``) are extracted first, so
 * they always render as inline code regardless of the surrounding context.
 */

export type OptionToken =
  | { kind: "prose"; text: string }
  | { kind: "value"; text: string }
  | { kind: "code"; text: string };

/** Words that join printed values in this bank's option copy. */
const CONNECTIVE = /^(then|and|or|followed\s+by|,)$/i;

/** A bare value a console would print. */
const VALUE = /^(-?\d+(?:\.\d+)?|true|false|null|undefined|NaN|Infinity|"[^"]*"|'[^']*'|\[[^\]]*\]|\{[^}]*\})[.,;]?$/;

/** Reads as an identifier or expression rather than a word. */
const CODEISH = /^(?:[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+|[A-Za-z_$][\w$]*\([^)]*\)|<\/?[A-Za-z][\w-]*\/?>|[A-Za-z_$][\w$]*<[^>]+>)[.,;]?$/;

/**
 * Splits text on backtick-delimited code spans (`` `...` ``).
 * Returns an array of segments, alternating between prose and code.
 * Code segments have their backticks stripped.
 */
function extractBacktickSpans(text: string): { text: string; isCode: boolean }[] {
  const segments: { text: string; isCode: boolean }[] = [];
  const re = /`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    // Prose before this code span
    if (match.index > last) {
      segments.push({ text: text.slice(last, match.index), isCode: false });
    }
    // The code span itself (without backticks)
    segments.push({ text: match[1], isCode: true });
    last = match.index + match[0].length;
  }
  // Trailing prose
  if (last < text.length) {
    segments.push({ text: text.slice(last), isCode: false });
  }
  return segments;
}

/**
 * Tokenise an option that has been classified as console output.
 * Values stay values; connectives and anything wordy become prose.
 * Backtick spans are extracted first and always rendered as code.
 */
export function tokeniseOutput(text: string): OptionToken[] {
  const segments = extractBacktickSpans(text);
  const out: OptionToken[] = [];

  for (const seg of segments) {
    if (seg.isCode) {
      out.push({ kind: "code", text: seg.text });
      continue;
    }
    for (const part of seg.text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        appendProse(out, part);
        continue;
      }
      if (VALUE.test(part) && !CONNECTIVE.test(part)) out.push({ kind: "value", text: part });
      else appendProse(out, part);
    }
  }
  return merge(out);
}

/**
 * Tokenise a prose option, promoting anything that reads as code. Used for the
 * many options that name an API inline: "Use Object.freeze() on the result".
 * Backtick spans are extracted first and always rendered as code.
 */
export function tokeniseProse(text: string): OptionToken[] {
  const segments = extractBacktickSpans(text);
  const out: OptionToken[] = [];

  for (const seg of segments) {
    if (seg.isCode) {
      out.push({ kind: "code", text: seg.text });
      continue;
    }
    for (const part of seg.text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        appendProse(out, part);
        continue;
      }
      if (CODEISH.test(part) && part.length > 3) out.push({ kind: "code", text: part });
      else appendProse(out, part);
    }
  }
  return merge(out);
}

function appendProse(out: OptionToken[], text: string) {
  const last = out[out.length - 1];
  if (last && last.kind === "prose") last.text += text;
  else out.push({ kind: "prose", text });
}

/** Collapse runs of the same kind so the DOM stays small. */
function merge(tokens: OptionToken[]): OptionToken[] {
  const out: OptionToken[] = [];
  for (const t of tokens) {
    const last = out[out.length - 1];
    if (last && last.kind === t.kind && t.kind !== "prose") {
      last.text += t.text;
      continue;
    }
    if (last && last.kind === "prose" && t.kind === "prose") {
      last.text += t.text;
      continue;
    }
    out.push({ ...t });
  }
  return out.filter((t) => t.text.length > 0);
}
