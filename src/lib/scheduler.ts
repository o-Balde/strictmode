/**
 * SM-2-lite spaced repetition.
 *
 * The mockup promises "added back to the queue — you'll see a variant in a few
 * days", so wrong answers need a real due date rather than just being marked
 * seen. This is SM-2 with the grading collapsed to a binary (the app only ever
 * knows right or wrong) and a fixed early ladder so the first few intervals are
 * predictable: 1 → 3 → 7 → 16 days, then ×ease.
 */
import { addDays, dayKey } from "./dates";

export interface ReviewRecord {
  /** Difficulty multiplier once past the fixed ladder. Clamped to [1.3, 2.8]. */
  ease: number;
  /** Days until the next review. */
  interval: number;
  /** Local day key this becomes due. */
  due: string;
  /** How many times this has been answered wrong after previously being right. */
  lapses: number;
  /** Consecutive correct answers; drives position on the ladder. */
  streak: number;
}

const LADDER = [1, 3, 7, 16];
const MIN_EASE = 1.3;
const MAX_EASE = 2.8;
const DEFAULT_EASE = 2.5;

const clampEase = (e: number) => Math.min(MAX_EASE, Math.max(MIN_EASE, e));

export function initialRecord(today = dayKey()): ReviewRecord {
  return { ease: DEFAULT_EASE, interval: 0, due: today, lapses: 0, streak: 0 };
}

/**
 * Fold an answer into a question's review record.
 * Wrong resets to tomorrow and costs ease; right advances the ladder.
 */
export function grade(
  prev: ReviewRecord | undefined,
  correct: boolean,
  today = dayKey(),
): ReviewRecord {
  const record = prev ?? initialRecord(today);

  if (!correct) {
    return {
      ease: clampEase(record.ease - 0.2),
      interval: 1,
      due: addDays(today, 1),
      lapses: record.lapses + (record.streak > 0 ? 1 : 0),
      streak: 0,
    };
  }

  const streak = record.streak + 1;
  const interval =
    streak <= LADDER.length
      ? LADDER[streak - 1]
      : Math.round(record.interval * record.ease);

  return {
    ease: clampEase(record.ease + 0.05),
    interval,
    due: addDays(today, interval),
    lapses: record.lapses,
    streak,
  };
}

export function isDue(record: ReviewRecord | undefined, today = dayKey()): boolean {
  if (!record) return false;
  return record.due <= today;
}

/**
 * Most-overdue first, then most-lapsed — the questions that keep catching the
 * user out surface before ones that merely came around again.
 */
export function compareDue(
  a: ReviewRecord,
  b: ReviewRecord,
): number {
  if (a.due !== b.due) return a.due < b.due ? -1 : 1;
  return b.lapses - a.lapses;
}
