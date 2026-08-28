/**
 * Client-side view of the question bank.
 *
 * Decodes the packed columnar index emitted by scripts/build-index.ts into a
 * flat array of lightweight rows — enough to compose a drill, draw every
 * coverage ring, and render the dashboard queue without fetching a single
 * question body.
 */
import packed from "@/generated/question-index.json";
import stats from "@/generated/bank-stats.json";
import type {
  QuestionCategory,
  QuestionLevel,
  QuestionSubject,
  QuestionType,
} from "@/data/types";

export interface IndexRow {
  id: string;
  title: string;
  subject: QuestionSubject;
  category: QuestionCategory;
  type: QuestionType;
  level: QuestionLevel;
  minutes: number;
}

export interface SubjectSummary {
  subject: QuestionSubject;
  title: string;
  category: QuestionCategory;
  description: string;
  recommendedLevel: QuestionLevel;
  total: number;
}

const decode = (ch: string) => parseInt(ch, 36);

function decodeIndex(): IndexRow[] {
  const subjects = packed.subjects as QuestionSubject[];
  const categories = packed.categories as QuestionCategory[];
  const types = packed.types as QuestionType[];
  const levels = packed.levels as QuestionLevel[];

  return packed.ids.map((id, i) => ({
    id,
    title: packed.titles[i],
    subject: subjects[decode(packed.s[i])],
    category: categories[decode(packed.c[i])],
    type: types[decode(packed.t[i])],
    level: levels[decode(packed.l[i])],
    minutes: decode(packed.m[i]),
  }));
}

export const QUESTION_INDEX: IndexRow[] = decodeIndex();

export const INDEX_BY_ID: Map<string, IndexRow> = new Map(
  QUESTION_INDEX.map((r) => [r.id, r]),
);

/** Subjects that actually have questions, largest bank first. */
export const SUBJECTS = stats.subjects as SubjectSummary[];
export const CATEGORIES = stats.categories as QuestionCategory[];
export const BANK_TOTAL = stats.total;

/** Question types that read as a quick question rather than a code exercise. */
const QUICK_TYPES: QuestionType[] = ["concept", "output", "puzzle"];
const CODE_TYPES: QuestionType[] = ["live_code", "fix"];

export const isQuick = (row: IndexRow) => QUICK_TYPES.includes(row.type);
export const isCode = (row: IndexRow) => CODE_TYPES.includes(row.type);

export function rowsForSubject(subject: QuestionSubject): IndexRow[] {
  return QUESTION_INDEX.filter((r) => r.subject === subject);
}

export function rowsForCategory(category: QuestionCategory): IndexRow[] {
  return QUESTION_INDEX.filter((r) => r.category === category);
}

export function subjectMeta(subject: QuestionSubject): SubjectSummary | undefined {
  return SUBJECTS.find((s) => s.subject === subject);
}
