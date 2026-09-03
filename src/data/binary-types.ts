import type {
  CodeLanguage,
  QuestionLevel,
  QuestionSubject,
} from "./types";

export type BinaryCategory = "react" | "typescript" | "javascript";
export type BinaryChoice = boolean | null;

export interface BinaryCard {
  id: string;
  statement: string;
  truth: boolean;
  explanation: string;
  level: QuestionLevel;
  category: BinaryCategory;
  subject: QuestionSubject;
  codeSnippet?: string;
  codeLanguage?: CodeLanguage;
}

export interface BinaryCardIndexRow {
  id: string;
  level: QuestionLevel;
  category: BinaryCategory;
  subject: QuestionSubject;
}

export interface BinaryCardPayload extends BinaryCard {
  codeHtml: string | null;
}

export interface BinaryAnswer {
  cardId: string;
  choice: BinaryChoice;
  correct: boolean;
  elapsedMs: number;
}

export interface ActiveBinarySession {
  version: 1;
  day: string;
  difficulty: QuestionLevel;
  countsForDaily: boolean;
  cardIds: string[];
  index: number;
  answers: BinaryAnswer[];
  /** A wrong or unknown answer keeps the current card open on its back. */
  showingExplanation: boolean;
}

export interface BinarySessionResult {
  version: 1;
  day: string;
  difficulty: QuestionLevel;
  countsForDaily: boolean;
  answers: BinaryAnswer[];
  cards: BinaryCardPayload[];
  totalMs: number;
  finishedAt: string;
}
