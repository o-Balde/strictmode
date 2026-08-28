/**
 * StrictMode - Question Suite & Practice Platform Types
 * Statically strict-typed definitions for React, TypeScript, Next.js, and JS interview questions.
 */

export type QuestionLevel = 'junior' | 'intermediate' | 'senior';

export type QuestionType = 'concept' | 'output' | 'puzzle' | 'live_code' | 'fix';

export type QuestionCategory =
  | 'react'
  | 'typescript'
  | 'nextjs'
  | 'javascript'
  | 'performance'
  | 'system_design'
  | 'algorithms';

export type QuestionSubject =
  | 'hooks'
  | 'rendering-keys'
  | 'generics'
  | 'narrowing'
  | 'state-management'
  | 'server-components'
  | 'performance'
  | 'closures'
  | 'event-loop'
  | 'async-await'
  | 'types'
  | 'design-patterns'
  | 'data-fetching'
  | 'concurrency'
  | 'system-architecture'
  | 'data-structures';

export type CodeLanguage = 'typescript' | 'javascript' | 'tsx' | 'jsx' | 'css' | 'json';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D' | string;
  text: string;
  codeSnippet?: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface AssertionTest {
  id: string;
  description: string;
  testFn?: string;
  input?: unknown;
  expected?: unknown;
}

export interface CodeFixOption {
  lineIndex: number;
  text: string;
  isCorrect: boolean;
}

export interface CodeFixData {
  codeWithLines: string[];
  brokenLineIndex: number; // 0-indexed line in codeWithLines
  faultySnippet: string;
  fixedSnippet: string;
  bugExplanation: string;
  options?: CodeFixOption[];
}

export interface PuzzleData {
  puzzleType: 'type_eval' | 'order_lines' | 'fill_blank';
  lines?: string[];
  expectedOrder?: number[];
  blankSnippet?: string;
  blankOptions?: string[];
  expectedBlankAnswer?: string;
  solution?: string;
}

export interface BaseQuestion {
  id: string;
  title: string;
  prompt: string;
  level: QuestionLevel;
  type: QuestionType;
  category: QuestionCategory;
  subject: QuestionSubject;
  tags: string[];
  codeSnippet?: string | null;
  codeLanguage?: CodeLanguage;
  explanation: string;
  interviewLine: string; // The concise, high-impact quote to say in an interview
  misconception?: string; // The common trap or mental model flaw
  bestPracticeRef?: string; // Reference to Vercel React Best Practices or Official RFC rule
  hints?: string[];
  source?: string;
  estimatedMinutes: number;
  options?: QuestionOption[];
  correctAnswer?: string;
  consoleOutput?: string;
  puzzleData?: PuzzleData;
  starterCode?: string;
  solutionCode?: string;
  assertions?: AssertionTest[];
  fileName?: string;
  fixData?: CodeFixData;
}

export interface ConceptQuestion extends BaseQuestion {
  type: 'concept';
  options: QuestionOption[];
  correctAnswer: string; // Option ID or exact answer
}

export interface OutputQuestion extends BaseQuestion {
  type: 'output';
  options: QuestionOption[];
  correctAnswer: string; // Option ID or exact console output
  consoleOutput?: string;
}

export interface PuzzleQuestion extends BaseQuestion {
  type: 'puzzle';
  puzzleData?: PuzzleData;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface LiveCodeQuestion extends BaseQuestion {
  type: 'live_code';
  starterCode?: string;
  solutionCode?: string;
  assertions?: AssertionTest[];
  fileName?: string;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface FixQuestion extends BaseQuestion {
  type: 'fix';
  fixData?: CodeFixData;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export type QuizQuestion =
  | ConceptQuestion
  | OutputQuestion
  | PuzzleQuestion
  | LiveCodeQuestion
  | FixQuestion;

export interface TopicMetadata {
  subject: QuestionSubject;
  title: string;
  category: QuestionCategory;
  description: string;
  icon?: string;
  recommendedLevel: QuestionLevel;
}

export interface TopicStat {
  subject: QuestionSubject;
  title: string;
  category: QuestionCategory;
  totalCount: number;
  seenCount: number;
  correctCount: number;
  masteryPercentage: number;
}

export interface DailyDrill {
  day: number;
  items: QuizQuestion[];
  estimatedTotalMinutes: number;
  focusTopics: QuestionSubject[];
}

export interface UserDrillProgress {
  seenQuestionIds: string[];
  correctQuestionIds: string[];
  wrongQuestionIds: string[];
  savedQuestionIds: string[];
  streakDays: number;
  lastCompletedDate?: string;
  activityHeatmap?: Record<string, number>;
}
