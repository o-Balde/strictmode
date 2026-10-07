/**
 * Authoring helpers for the prep sheet.
 *
 * The sections are long, so the blocks are written as calls rather than object
 * literals: `ts(...)` and `p(...)` keep an answer readable as an answer.
 */
import type { CodeLanguage } from "../types";
import type {
  PrepCallout,
  PrepCode,
  PrepList,
  PrepOutput,
  PrepParagraph,
  PrepTable,
} from "./types";

type CodeOptions = Pick<PrepCode, "caption" | "tone">;

/** Snippets are written on their own lines inside a template literal. */
const trimSnippet = (source: string) => source.replace(/^\n/, "").trimEnd();

function snippet(language: CodeLanguage) {
  return (source: string, options: CodeOptions = {}): PrepCode => ({
    kind: "code",
    language,
    code: trimSnippet(source),
    ...options,
  });
}

export const ts = snippet("typescript");
export const tsx = snippet("tsx");
export const js = snippet("javascript");
/** Untyped on purpose: for the "find the bugs" snippets that would not compile. */
export const jsx = snippet("jsx");
export const json = snippet("json");

export const p = (text: string): PrepParagraph => ({ kind: "p", text });

export const list = (...items: string[]): PrepList => ({ kind: "list", items });

export const steps = (...items: string[]): PrepList => ({
  kind: "list",
  items,
  ordered: true,
});

export const output = (text: string): PrepOutput => ({
  kind: "output",
  text: trimSnippet(text),
});

export const table = (head: string[], ...rows: string[][]): PrepTable => ({
  kind: "table",
  head,
  rows,
});

export const trap = (text: string): PrepCallout => ({
  kind: "callout",
  tone: "trap",
  text,
});

export const say = (text: string): PrepCallout => ({
  kind: "callout",
  tone: "say",
  text,
});
