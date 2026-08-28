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
 * Tokenise an option that has been classified as console output.
 * Values stay values; connectives and anything wordy become prose.
 */
export function tokeniseOutput(text: string): OptionToken[] {
  const out: OptionToken[] = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      appendProse(out, part);
      continue;
    }
    if (VALUE.test(part) && !CONNECTIVE.test(part)) out.push({ kind: "value", text: part });
    else appendProse(out, part);
  }
  return merge(out);
}

/**
 * Tokenise a prose option, promoting anything that reads as code. Used for the
 * many options that name an API inline: "Use Object.freeze() on the result".
 */
export function tokeniseProse(text: string): OptionToken[] {
  const out: OptionToken[] = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      appendProse(out, part);
      continue;
    }
    if (CODEISH.test(part) && part.length > 3) out.push({ kind: "code", text: part });
    else appendProse(out, part);
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
