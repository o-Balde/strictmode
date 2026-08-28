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
import type { QuestionSubject } from "@/data/types";
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
  seenIds: string[];
  reviewState: Record<string, ReviewRecord>;
  weakSubjects?: QuestionSubject[];
  /** Restrict to one subject — the free-play path. */
  subject?: QuestionSubject;
  /** Only questions previously answered wrong — "Mixed review". */
  wrongOnly?: string[];
  today?: string;
  /** Deterministic shuffling, so "Shuffle the set" is reproducible per seed. */
  seed?: number;
}

export interface Drill {
  rows: IndexRow[];
  estimatedMinutes: number;
  focusSubjects: QuestionSubject[];
  /** True when every candidate was already seen and we had to recycle. */
  recycled: boolean;
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

export function composeDrill(opts: DrillOptions): Drill {
  const today = opts.today ?? dayKey();
  const rand = rng(opts.seed ?? hashSeed(today));
  const seen = new Set(opts.seenIds);
  const weak = opts.weakSubjects ?? [];

  let pool = QUESTION_INDEX;
  if (opts.subject) pool = pool.filter((r) => r.subject === opts.subject);
  if (opts.wrongOnly) {
    const wrong = new Set(opts.wrongOnly);
    pool = pool.filter((r) => wrong.has(r.id));
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
    .filter((r) => isDue(opts.reviewState[r.id], today))
    .sort((a, b) => compareDue(opts.reviewState[a.id], opts.reviewState[b.id]));
  for (const row of due.slice(0, MAX_DUE_REVIEWS)) take(row);

  // 2/3 — fill the quick and code slots from unseen material, weak subjects first.
  const unseen = shuffle(
    pool.filter((r) => !seen.has(r.id) && !taken.has(r.id)),
    rand,
  ).sort((a, b) => weight(b, weak) - weight(a, weak));

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
      pool.filter((r) => !taken.has(r.id)),
      rand,
    ).sort((a, b) => dueSort(opts.reviewState[a.id], opts.reviewState[b.id]));
    for (const row of rest) {
      if (picked.length >= DRILL_SIZE) break;
      if (take(row)) recycled = true;
    }
  }

  // Quick items lead, code items close — the mockup's queue order.
  picked.sort((a, b) => Number(isCode(a)) - Number(isCode(b)));

  return {
    rows: picked,
    estimatedMinutes: picked.reduce((n, r) => n + r.minutes, 0),
    focusSubjects: [...new Set(picked.map((r) => r.subject))],
    recycled,
  };
}

/** Weak subjects float to the top; unrated subjects sit in the middle. */
function weight(row: IndexRow, weak: QuestionSubject[]): number {
  const i = weak.indexOf(row.subject);
  return i === -1 ? 0 : weak.length - i;
}

function dueSort(a: ReviewRecord | undefined, b: ReviewRecord | undefined): number {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  return a.due < b.due ? -1 : a.due > b.due ? 1 : 0;
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Coverage per subject, for the rings on /topics and the bars on /progress. */
export interface SubjectProgress {
  subject: QuestionSubject;
  total: number;
  seen: number;
  correct: number;
  mastery: number;
  exhausted: boolean;
}

export function subjectProgress(
  seenIds: string[],
  correctIds: string[],
  subjects: { subject: QuestionSubject; total: number }[],
): SubjectProgress[] {
  const seen = new Set(seenIds);
  const correct = new Set(correctIds);
  const counts = new Map<QuestionSubject, { seen: number; correct: number }>();

  for (const id of seen) {
    const row = INDEX_BY_ID.get(id);
    if (!row) continue;
    const c = counts.get(row.subject) ?? { seen: 0, correct: 0 };
    c.seen += 1;
    if (correct.has(id)) c.correct += 1;
    counts.set(row.subject, c);
  }

  return subjects.map(({ subject, total }) => {
    const c = counts.get(subject) ?? { seen: 0, correct: 0 };
    return {
      subject,
      total,
      seen: c.seen,
      correct: c.correct,
      mastery: c.seen > 0 ? Math.round((c.correct / c.seen) * 100) : 0,
      exhausted: total > 0 && c.seen >= total,
    };
  });
}
