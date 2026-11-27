/**
 * The Scotiabank concept review: one page to read the night before, and a
 * flashcard deck to drill from it.
 *
 * The prep page asks interview questions and answers them at length. This one
 * goes topic by topic through the job description and lays out the concepts
 * behind those answers: what each technology is, how it compares with its
 * neighbours, what changed between versions, and the short questions an
 * interviewer uses to check you know it. Every concept and question is also a
 * flashcard.
 *
 * Prose uses the prep sheet's inline markers: `code` and **emphasis**.
 */
import type { PrepBlock, PrepCode, RenderedPrepBlock, RenderedPrepCode } from "../../interview-prep";
import type { RequirementWeight } from "../types";

/** One idea in two or three sentences. Its term is the front of a flashcard. */
export interface StudyConcept {
  term: string;
  text: string;
}

/** A question asked out loud, with the answer worth giving. Also a flashcard. */
export interface StudyQuestion {
  q: string;
  a: string;
}

/** The same task written the old way and the current way. */
export interface StudyPair {
  title: string;
  /** Where the new way arrived: "ES2015", "Java 16", "Spring Boot 3". */
  since: string;
  /** Why the new way is better, or what to watch for. */
  note: string;
  before: PrepCode;
  after: PrepCode;
}

/** A comparison, an evolution or a worked example inside a topic. */
export interface StudyPart {
  id: string;
  title: string;
  intro?: string;
  blocks?: PrepBlock[];
  pairs?: StudyPair[];
}

export interface StudyLink {
  label: string;
  url: string;
}

/** A 2025–2026 change worth one sentence in the room, as proof you keep up. */
export interface StudyNews {
  text: string;
  url: string;
}

export interface StudyTopic {
  id: string;
  /** For the nav and the flashcard filter: "JavaScript". */
  short: string;
  title: string;
  /** The posting's own wording for the skill. */
  jd: string;
  weight: RequirementWeight;
  summary: string;
  concepts: StudyConcept[];
  parts: StudyPart[];
  questions: StudyQuestion[];
  news: StudyNews[];
  /** Official documentation, specifications and RFCs. */
  docs: StudyLink[];
  /** Question-bank sections (or page anchors) on /scotiabank that go deeper. */
  bank: string[];
}

/** One card of the deck, flattened from a topic's concepts and questions. */
export interface StudyCard {
  /** Stable across edits that don't change the front, so "known" marks survive. */
  id: string;
  topic: string;
  kind: "concept" | "question";
  front: string;
  back: string;
}

// ── After the build has highlighted the code ────────────────────────────────

export interface RenderedStudyPair extends Omit<StudyPair, "before" | "after"> {
  before: RenderedPrepCode;
  after: RenderedPrepCode;
}

export interface RenderedStudyPart extends Omit<StudyPart, "blocks" | "pairs"> {
  blocks?: RenderedPrepBlock[];
  pairs?: RenderedStudyPair[];
}

export interface RenderedStudyTopic extends Omit<StudyTopic, "parts"> {
  parts: RenderedStudyPart[];
  /** Section titles for the `bank` links, resolved at build time. */
  bankTitles: string[];
}

export interface RenderedStudySheet {
  topics: RenderedStudyTopic[];
  cards: StudyCard[];
}
