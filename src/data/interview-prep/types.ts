/**
 * Interview prep — the reference sheet that sits beside the drills.
 *
 * A drill asks one question and scores it. This is the other half of the two
 * weeks before an interview: the questions that get asked out loud, each with
 * the answer worth giving, a worked example, and the follow-up that tends to
 * come next. It is read, not scored, so nothing here touches progress.
 *
 * Prose fields use the bank's inline markers: `backticks` for code and
 * `**double asterisks**` for emphasis (see lib/statement-tokens).
 */
import type { CodeLanguage, QuestionLevel, QuestionSubject } from "../types";

export type PrepTrack = "typescript" | "react" | "javascript" | "coding";

export interface PrepParagraph {
  kind: "p";
  text: string;
}

export interface PrepList {
  kind: "list";
  items: string[];
  ordered?: boolean;
}

export interface PrepCode {
  kind: "code";
  code: string;
  language: CodeLanguage;
  /** Names the snippet: "Before", "The fix", a file name. */
  caption?: string;
  /** Marks a snippet as the bug or the repair, so a pair reads at a glance. */
  tone?: "bad" | "good";
}

/** What a program prints. Set as a console, never as source. */
export interface PrepOutput {
  kind: "output";
  text: string;
}

export interface PrepTable {
  kind: "table";
  head: string[];
  rows: string[][];
}

export interface PrepCallout {
  kind: "callout";
  /** `trap` names the mistake; `say` is the sentence to say out loud. */
  tone: "trap" | "say";
  text: string;
}

export type PrepBlock =
  | PrepParagraph
  | PrepList
  | PrepCode
  | PrepOutput
  | PrepTable
  | PrepCallout;

export interface PrepFollowUp {
  q: string;
  a: string;
}

export interface PrepQuestion {
  /** Stable slug; doubles as the anchor, so it must stay unique page-wide. */
  id: string;
  question: string;
  level: QuestionLevel;
  /** The first twenty seconds of the answer. */
  short: string;
  body: PrepBlock[];
  followUps?: PrepFollowUp[];
  /** Primary source, for the reader who wants the long version. */
  docs?: string;
}

export interface PrepSection {
  id: string;
  track: PrepTrack;
  title: string;
  blurb: string;
  /** The drill topic that exercises this section, when the bank has one. */
  drill?: QuestionSubject;
  questions: PrepQuestion[];
}

/** A snippet after the build has run it through the highlighter. */
export interface RenderedPrepCode extends PrepCode {
  html: string;
}

export type RenderedPrepBlock = Exclude<PrepBlock, PrepCode> | RenderedPrepCode;

export interface RenderedPrepQuestion extends Omit<PrepQuestion, "body"> {
  body: RenderedPrepBlock[];
}

export interface RenderedPrepSection extends Omit<PrepSection, "questions"> {
  questions: RenderedPrepQuestion[];
}
