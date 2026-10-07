/**
 * Shared vocabulary for the interview prep sheet: the inline markup its prose
 * is written in, and the filters the page applies to it.
 *
 * Prose uses two markers, `backticks` for code and `**asterisks**` for
 * emphasis. Unlike a Binary statement, a prep answer routinely emphasises a
 * code span (`**`as const`**`), so emphasis here may contain code. The flat
 * tokeniser in statement-tokens cannot express that nesting.
 */
import type { PrepTrack, QuestionLevel } from "@data";

export type PrepInline =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "strong"; children: PrepInline[] };

const CODE_MARK = "`";
const STRONG_MARK = "**";

export function parsePrepInline(text: string): PrepInline[] {
  const tokens: PrepInline[] = [];
  let buffer = "";
  let index = 0;

  const flush = () => {
    if (buffer === "") return;
    tokens.push({ kind: "text", text: buffer });
    buffer = "";
  };

  while (index < text.length) {
    if (text[index] === CODE_MARK) {
      const end = text.indexOf(CODE_MARK, index + 1);
      if (end !== -1) {
        flush();
        tokens.push({ kind: "code", text: text.slice(index + 1, end) });
        index = end + 1;
        continue;
      }
    }

    if (text.startsWith(STRONG_MARK, index)) {
      const end = closingStrong(text, index + STRONG_MARK.length);
      if (end !== -1) {
        flush();
        tokens.push({
          kind: "strong",
          children: parsePrepInline(text.slice(index + STRONG_MARK.length, end)),
        });
        index = end + STRONG_MARK.length;
        continue;
      }
    }

    buffer += text[index];
    index += 1;
  }

  flush();
  return tokens;
}

/** The next `**` that is not inside a code span, so `2 ** 3` in code is left alone. */
function closingStrong(text: string, from: number): number {
  let index = from;
  while (index < text.length) {
    if (text[index] === CODE_MARK) {
      const end = text.indexOf(CODE_MARK, index + 1);
      if (end === -1) return -1;
      index = end + 1;
      continue;
    }
    if (text.startsWith(STRONG_MARK, index)) return index;
    index += 1;
  }
  return -1;
}

/**
 * A marker left over after parsing was never closed, and would reach the reader
 * as literal punctuation. The build refuses to emit such a string.
 */
export function hasStrayPrepMarker(text: string): boolean {
  const stray = (tokens: PrepInline[]): boolean =>
    tokens.some((token) => {
      if (token.kind === "code") return false;
      if (token.kind === "strong") return stray(token.children);
      return token.text.includes(CODE_MARK) || token.text.includes(STRONG_MARK);
    });
  return stray(parsePrepInline(text));
}

/** Anchors the top of the question list, so a search can bring its results into view. */
export const PREP_RESULTS_ID = "prep-results";

export const PREP_TRACKS: readonly PrepTrack[] = ["typescript", "react", "javascript", "coding"];

export const PREP_TRACK_LABEL: Record<PrepTrack, string> = {
  typescript: "TypeScript",
  react: "React",
  javascript: "JavaScript",
  coding: "Live coding",
};

export const PREP_LEVELS: readonly QuestionLevel[] = ["junior", "intermediate", "senior"];

export const PREP_LEVEL_LABEL: Record<QuestionLevel, string> = {
  junior: "Junior",
  intermediate: "Mid",
  senior: "Senior",
};

/** The slice of a question the page needs to filter it, without its answer. */
export interface PrepQuestionMeta {
  id: string;
  sectionId: string;
  track: PrepTrack;
  level: QuestionLevel;
}

export interface PrepFilters {
  track: PrepTrack | "all";
  level: QuestionLevel | "all";
  /** IDs matching the search box, or null when it is empty. */
  matches: ReadonlySet<string> | null;
}

export function matchesPrepFilters(question: PrepQuestionMeta, filters: PrepFilters): boolean {
  if (filters.track !== "all" && question.track !== filters.track) return false;
  if (filters.level !== "all" && question.level !== filters.level) return false;
  return filters.matches === null || filters.matches.has(question.id);
}

/** Every whitespace-separated term must appear; order and case do not matter. */
export function searchPrepText(index: ReadonlyMap<string, string>, query: string): Set<string> | null {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return null;

  const matches = new Set<string>();
  for (const [id, text] of index) {
    if (terms.every((term) => text.includes(term))) matches.add(id);
  }
  return matches;
}
