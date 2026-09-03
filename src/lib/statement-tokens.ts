/**
 * Tokenises a Binary card's statement or explanation.
 *
 * A Binary card is decided by one or two load-bearing words: the difference
 * between "cleanup runs when the component unmounts" and "cleanup runs *only*
 * when the component unmounts" is the whole question. Those words are marked
 * `**like this**` in the bank and rendered as emphasis so the reader's eye
 * lands on the part of the sentence that actually carries the truth value.
 *
 * Emphasis is applied to true and false cards alike. If only false cards were
 * marked, the emphasis would become a tell and the deck would be answerable
 * without knowing React — the same failure mode as phrasing every false claim
 * as an absolute.
 *
 * Backtick spans (`useState`, `Promise.all`) follow the convention already used
 * by option text, so an API name reads as code rather than prose.
 */

export type StatementToken =
  | { kind: "prose"; text: string }
  | { kind: "code"; text: string }
  | { kind: "emphasis"; text: string };

/** `**emphasis**` or `` `code` ``, whichever comes first. */
const SPAN = /\*\*([^*]+)\*\*|`([^`]+)`/g;

export function tokeniseStatement(text: string): StatementToken[] {
  const out: StatementToken[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  SPAN.lastIndex = 0;
  while ((match = SPAN.exec(text)) !== null) {
    if (match.index > last) {
      push(out, { kind: "prose", text: text.slice(last, match.index) });
    }
    if (match[1] !== undefined) push(out, { kind: "emphasis", text: match[1] });
    else push(out, { kind: "code", text: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) push(out, { kind: "prose", text: text.slice(last) });

  return out;
}

/** The authored text with markers removed, for length checks and dedupe. */
export function stripMarkers(text: string): string {
  return text.replace(SPAN, (_, emphasis: string | undefined, code: string | undefined) =>
    emphasis ?? code ?? "",
  );
}

/** The emphasised phrases in authoring order. */
export function emphasisedPhrases(text: string): string[] {
  const phrases: string[] = [];
  for (const token of tokeniseStatement(text)) {
    if (token.kind === "emphasis") phrases.push(token.text);
  }
  return phrases;
}

function push(out: StatementToken[], token: StatementToken) {
  if (!token.text) return;
  const last = out.at(-1);
  if (last && last.kind === token.kind) {
    last.text += token.text;
    return;
  }
  out.push(token);
}
