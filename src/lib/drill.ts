/**
 * Drill composition.
 *
 * The shipped generateDailyDrill() in src/data/index.ts only skips seen ids and
 * sorts weak subjects first — it has no notion of a review being *due*. This
 * replaces it with a scheduler-aware version that runs entirely on the packed
 * client index, so a drill can be composed from localStorage without the server
 * knowing anything about the user.
 *
 * Shape, from the mockup: five items — three quick questions and up to two code
 * exercises. Selection order:
 *   1. reviews due today (max 2), most overdue first
 *   2. unseen questions in the user's weakest subjects
 *   3. unseen questions, anything
 *   4. recycle least-recently-seen (only once the bank is exhausted)
 */
import type { QuestionSubject } from "@data";
import {
  QUESTION_INDEX,
  INDEX_BY_ID,
  isCode,
  isQuick,
  type IndexRow,
} from "./question-index";
import { compareDue, isDue, type ReviewRecord } from "./scheduler";
import { dayKey } from "./dates";

export const DRILL_SIZE = 5;
export const QUICK_TARGET = 3;
export const CODE_TARGET = 2;
export const MAX_DUE_REVIEWS = 2;

export interface DrillOptions {
  readonly seenIds: readonly string[];
  readonly reviewState: Readonly<Record<string, ReviewRecord>>;
  readonly weakSubjects?: readonly QuestionSubject[];
  /** Restrict to one subject — the free-play path. */
  readonly subject?: QuestionSubject;
  /** Only questions previously answered wrong — "Mixed review". */
  readonly wrongOnly?: readonly string[];
  readonly today?: string;
  /** Deterministic shuffling, so "Shuffle the set" is reproducible per seed. */
  readonly seed?: number;
}

export interface Drill {
  readonly rows: readonly IndexRow[];
  readonly estimatedMinutes: number;
  readonly focusSubjects: readonly QuestionSubject[];
  /** True when every candidate was already seen and we had to recycle. */
  readonly recycled: boolean;
}

/** Mulberry32 — small, fast, and stable across reloads for a given seed. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function composeDrill(options: DrillOptions): Drill {
  const today = options.today ?? dayKey();
  const rand = rng(options.seed ?? hashSeed(today));
  const seen = new Set(options.seenIds);
  const weak = options.weakSubjects ?? [];

  let pool = QUESTION_INDEX;
  if (options.subject) pool = pool.filter((row) => row.subject === options.subject);
  if (options.wrongOnly) {
    const wrong = new Set(options.wrongOnly);
    pool = pool.filter((row) => wrong.has(row.id));
  }

  const picked: IndexRow[] = [];
  const taken = new Set<string>();
  const take = (row: IndexRow) => {
    if (taken.has(row.id)) return false;
    taken.add(row.id);
    picked.push(row);
    return true;
  };

  // 1 — reviews that have come due. These jump the queue regardless of type.
  const due = pool
    .filter((row) => isDue(options.reviewState[row.id], today))
    .sort((firstRow, secondRow) => compareDue(options.reviewState[firstRow.id], options.reviewState[secondRow.id]));
  for (const row of due.slice(0, MAX_DUE_REVIEWS)) take(row);

  // 2/3 — fill the quick and code slots from unseen material, weak subjects first.
  const unseen = shuffle(
    pool.filter((row) => !seen.has(row.id) && !taken.has(row.id)),
    rand,
  ).sort((firstRow, secondRow) => weight(secondRow, weak) - weight(firstRow, weak));

  const quickNeeded = () => QUICK_TARGET - picked.filter(isQuick).length;
  const codeNeeded = () => CODE_TARGET - picked.filter(isCode).length;

  for (const row of unseen) {
    if (picked.length >= DRILL_SIZE) break;
    if (isQuick(row) && quickNeeded() > 0) take(row);
    else if (isCode(row) && codeNeeded() > 0) take(row);
  }

  // 4 — the bank (or the subject) is exhausted; recycle the least recently seen.
  let recycled = false;
  if (picked.length < DRILL_SIZE) {
    const rest = shuffle(
      pool.filter((row) => !taken.has(row.id)),
      rand,
    ).sort((firstRow, secondRow) => dueSort(options.reviewState[firstRow.id], options.reviewState[secondRow.id]));
    for (const row of rest) {
      if (picked.length >= DRILL_SIZE) break;
      if (take(row)) recycled = true;
    }
  }

  // Quick items lead, code items close — the mockup's queue order.
  picked.sort((firstRow, secondRow) => Number(isCode(firstRow)) - Number(isCode(secondRow)));

  return {
    rows: picked,
    estimatedMinutes: picked.reduce((totalMinutes, row) => totalMinutes + row.minutes, 0),
    focusSubjects: [...new Set(picked.map((row) => row.subject))],
    recycled,
  };
}

/** Weak subjects float to the top; unrated subjects sit in the middle. */
function weight(row: IndexRow, weak: readonly QuestionSubject[]): number {
  const index = weak.indexOf(row.subject);
  return index === -1 ? 0 : weak.length - index;
}

function dueSort(firstRecord: ReviewRecord | undefined, secondRecord: ReviewRecord | undefined): number {
  if (!firstRecord && !secondRecord) return 0;
  if (!firstRecord) return -1;
  if (!secondRecord) return 1;
  return firstRecord.due < secondRecord.due ? -1 : firstRecord.due > secondRecord.due ? 1 : 0;
}

function hashSeed(seedString: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seedString.length; i++) {
    hash ^= seedString.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Coverage per subject, for the rings on /topics and the bars on /progress. */
export interface SubjectProgress {
  readonly subject: QuestionSubject;
  readonly total: number;
  readonly seen: number;
  readonly correct: number;
  readonly mastery: number;
  readonly exhausted: boolean;
}

export function subjectProgress(
  seenIds: readonly string[],
  correctIds: readonly string[],
  subjects: readonly { readonly subject: QuestionSubject; readonly total: number }[],
): SubjectProgress[] {
  const seen = new Set(seenIds);
  const correct = new Set(correctIds);
  const counts = new Map<QuestionSubject, { seen: number; correct: number }>();

  for (const id of seen) {
    const row = INDEX_BY_ID.get(id);
    if (!row) continue;
    const stats = counts.get(row.subject) ?? { seen: 0, correct: 0 };
    stats.seen += 1;
    if (correct.has(id)) stats.correct += 1;
    counts.set(row.subject, stats);
  }

  return subjects.map(({ subject, total }) => {
    const stats = counts.get(subject) ?? { seen: 0, correct: 0 };
    return {
      subject,
      total,
      seen: stats.seen,
      correct: stats.correct,
      mastery: stats.seen > 0 ? Math.round((stats.correct / stats.seen) * 100) : 0,
      exhausted: total > 0 && stats.seen >= total,
    };
  });
}
