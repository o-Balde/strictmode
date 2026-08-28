/**
 * The wire shape a QuestionSource delivers.
 *
 * Pure content: what a screen renders plus the pre-highlighted snippet markup,
 * and nothing about how it should look. Whether options render in the terminal
 * skin is decided at render time from `type` and the option text, so a styling
 * change never invalidates a cached payload.
 *
 * It does carry the answer key, because grading happens client-side with no
 * server round-trip. That is an accepted trade for an app with no accounts — a
 * determined user can read the answer out of the network tab either way.
 */
import type {
  CodeLanguage,
  QuestionCategory,
  QuestionLevel,
  QuestionSubject,
  QuestionType,
} from "@/data/types";

export interface PayloadOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuestionPayload {
  id: string;
  title: string;
  prompt: string;
  level: QuestionLevel;
  type: QuestionType;
  category: QuestionCategory;
  subject: QuestionSubject;
  subjectTitle: string;
  tags: string[];
  codeSnippet: string | null;
  /** Shiki-highlighted markup for codeSnippet, already themed. */
  codeHtml: string | null;
  codeLanguage: CodeLanguage;
  explanation: string;
  interviewLine: string;
  misconception?: string;
  hints: string[];
  estimatedMinutes: number;
  options: PayloadOption[];
  correctAnswer: string;
}
