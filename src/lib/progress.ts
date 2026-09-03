/**
 * Progress persistence.
 *
 * localStorage is the single source of truth: every question seen, every review
 * record, the streak and the heatmap. Nothing is ever uploaded.
 *
 * A ~60-byte cookie mirrors four scalars so the server can render the header and
 * the home headline with real numbers instead of flashing "Day 1" before
 * hydration. The cookie is written from the client and read by the server only
 * for that first paint — it is never authoritative and never used for tracking.
 */
import type {
  BinaryAnswer,
  QuestionLevel,
  QuestionSubject,
  UserDrillProgress,
} from "@data";
import { dayKey, daysBetween } from "./dates";
import { grade, type ReviewRecord } from "./scheduler";

export const STORAGE_KEY = "strictmode.progress.v1";
export const HUD_COOKIE = "sm_hud";
export const SCHEMA_VERSION = 2;

export interface BinaryProgress {
  seenCardIds: string[];
  /** Membership reflects the most recent completed answer for each card. */
  correctCardIds: string[];
  wrongCardIds: string[];
  reviewState: Record<string, ReviewRecord>;
  totalAnswers: number;
  correctAnswers: number;
  totalMs: number;
  perCardMs: Record<string, number>;
  currentCorrectRun: number;
  bestCorrectRun: number;
  lastDifficulty: QuestionLevel;
}

export interface DailyBreakdown {
  drills: number;
  binary: number;
}

/** Extends the shipped UserDrillProgress with scheduling and timing. */
export interface StoredProgress extends UserDrillProgress {
  version: number;
  bestStreak: number;
  /** Day keys on which the daily drill was completed. */
  completedDays: string[];
  reviewState: Record<string, ReviewRecord>;
  /** Total drilling time in ms, across every session. */
  totalMs: number;
  /** Fastest recorded time per question, in ms. */
  perQuestionMs: Record<string, number>;
  /** Which home direction the user prefers: the dashboard or the path. */
  homeVariant: "dashboard" | "path";
  /** Independent knowledge metrics for the faster, 50/50 Binary format. */
  binary: BinaryProgress;
  /** Daily breakdown between standard drill questions and binary cards. */
  dailyBreakdown?: Record<string, DailyBreakdown>;
}

export interface HudCookie {
  /** streak */ s: number;
  /** day number */ d: number;
  /** lastCompletedDate */ l: string;
  /** seen count */ n: number;
}

export function emptyProgress(): StoredProgress {
  return {
    version: SCHEMA_VERSION,
    seenQuestionIds: [],
    correctQuestionIds: [],
    wrongQuestionIds: [],
    savedQuestionIds: [],
    streakDays: 0,
    bestStreak: 0,
    lastCompletedDate: undefined,
    activityHeatmap: {},
    completedDays: [],
    reviewState: {},
    totalMs: 0,
    perQuestionMs: {},
    homeVariant: "dashboard",
    binary: emptyBinaryProgress(),
    dailyBreakdown: {},
  };
}

export function emptyBinaryProgress(): BinaryProgress {
  return {
    seenCardIds: [],
    correctCardIds: [],
    wrongCardIds: [],
    reviewState: {},
    totalAnswers: 0,
    correctAnswers: 0,
    totalMs: 0,
    perCardMs: {},
    currentCorrectRun: 0,
    bestCorrectRun: 0,
    lastDifficulty: "intermediate",
  };
}

/**
 * Tolerant of partial and older records — a missing field is filled rather than
 * throwing away a streak someone actually earned.
 */
export function migrate(raw: unknown): StoredProgress {
  const base = emptyProgress();
  if (!raw || typeof raw !== "object") return base;
  const p = raw as Partial<StoredProgress>;
  const arr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

  return {
    ...base,
    ...p,
    version: SCHEMA_VERSION,
    seenQuestionIds: arr(p.seenQuestionIds),
    correctQuestionIds: arr(p.correctQuestionIds),
    wrongQuestionIds: arr(p.wrongQuestionIds),
    savedQuestionIds: arr(p.savedQuestionIds),
    completedDays: arr(p.completedDays),
    activityHeatmap: p.activityHeatmap ?? {},
    dailyBreakdown:
      typeof p.dailyBreakdown === "object" && p.dailyBreakdown !== null
        ? (p.dailyBreakdown as Record<string, DailyBreakdown>)
        : {},
    reviewState: p.reviewState ?? {},
    perQuestionMs: p.perQuestionMs ?? {},
    streakDays: typeof p.streakDays === "number" ? p.streakDays : 0,
    bestStreak: typeof p.bestStreak === "number" ? p.bestStreak : (p.streakDays ?? 0),
    totalMs: typeof p.totalMs === "number" ? p.totalMs : 0,
    homeVariant: p.homeVariant === "path" ? "path" : "dashboard",
    binary: migrateBinaryProgress(p.binary),
  };
}

function migrateBinaryProgress(raw: unknown): BinaryProgress {
  const base = emptyBinaryProgress();
  if (!raw || typeof raw !== "object") return base;
  const binary = raw as Partial<BinaryProgress>;
  const strings = (value: unknown) =>
    Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  const number = (value: unknown) =>
    typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
  const candidate = binary.lastDifficulty;
  const lastDifficulty: QuestionLevel =
    candidate === "junior" || candidate === "senior" ? candidate : "intermediate";

  return {
    seenCardIds: strings(binary.seenCardIds),
    correctCardIds: strings(binary.correctCardIds),
    wrongCardIds: strings(binary.wrongCardIds),
    reviewState: binary.reviewState ?? {},
    totalAnswers: number(binary.totalAnswers),
    correctAnswers: number(binary.correctAnswers),
    totalMs: number(binary.totalMs),
    perCardMs: binary.perCardMs ?? {},
    currentCorrectRun: number(binary.currentCorrectRun),
    bestCorrectRun: number(binary.bestCorrectRun),
    lastDifficulty,
  };
}

export function loadProgress(): StoredProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return migrate(JSON.parse(raw));
  } catch {
    // Private mode, quota, corrupt JSON — start clean rather than crash.
    return emptyProgress();
  }
}

export function saveProgress(p: StoredProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — the session still works, it just won't persist */
  }
  writeHudCookie(p);
}

export function hudFrom(p: StoredProgress): HudCookie {
  return {
    s: p.streakDays,
    d: dayNumber(p),
    l: p.lastCompletedDate ?? "",
    n: p.seenQuestionIds.length,
  };
}

export function writeHudCookie(p: StoredProgress): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(hudFrom(p)));
  // One year, same-site, not HttpOnly (the client writes it), no domain scope.
  document.cookie = `${HUD_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export function parseHudCookie(raw: string | undefined): HudCookie | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(decodeURIComponent(raw));
    if (typeof v?.s !== "number" || typeof v?.n !== "number") return null;
    return { s: v.s, d: v.d ?? 0, l: typeof v.l === "string" ? v.l : "", n: v.n };
  } catch {
    return null;
  }
}

/** The "Day 12" label — the day of the current streak that is in progress. */
export function dayNumber(p: StoredProgress, today = dayKey()): number {
  if (!p.lastCompletedDate) return p.streakDays > 0 ? p.streakDays : 1;
  return p.lastCompletedDate === today ? p.streakDays : p.streakDays + 1;
}

export function hasCompletedToday(p: StoredProgress, today = dayKey()): boolean {
  return p.lastCompletedDate === today;
}

export type StreakHealth = "fresh" | "active" | "at-risk" | "broken";

/**
 * Local midnight rollover with a single day of grace: miss one day and the
 * streak survives but is flagged; miss two and it resets.
 */
export function streakHealth(p: StoredProgress, today = dayKey()): StreakHealth {
  if (!p.lastCompletedDate || p.streakDays === 0) return "fresh";
  const gap = daysBetween(p.lastCompletedDate, today);
  if (gap <= 1) return "active";
  if (gap === 2) return "at-risk";
  return "broken";
}

/** What the streak becomes if the daily drill is completed right now. */
export function nextStreak(p: StoredProgress, today = dayKey()): number {
  const health = streakHealth(p, today);
  if (p.lastCompletedDate === today) return p.streakDays;
  if (health === "active" || health === "at-risk") return p.streakDays + 1;
  return 1;
}

/** Weakest subjects first — drives both the dashboard bars and drill weighting. */
export function weakSubjects(
  p: StoredProgress,
  subjectOf: (id: string) => QuestionSubject | undefined,
  limit = 3,
): QuestionSubject[] {
  const seen = new Map<QuestionSubject, number>();
  const right = new Map<QuestionSubject, number>();
  for (const id of p.seenQuestionIds) {
    const s = subjectOf(id);
    if (s) seen.set(s, (seen.get(s) ?? 0) + 1);
  }
  for (const id of p.correctQuestionIds) {
    const s = subjectOf(id);
    if (s) right.set(s, (right.get(s) ?? 0) + 1);
  }
  return [...seen.entries()]
    .filter(([, n]) => n >= 2)
    .map(([s, n]) => ({ s, mastery: (right.get(s) ?? 0) / n }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, limit)
    .map((x) => x.s);
}

/* ---------------------------------------------------------------------------
   Transitions.

   Every mutation of the progress record lives here as a pure (prev, event) ->
   next function. They were previously written inline in the React provider,
   which meant the streak rule existed twice: once as streakHealth/nextStreak
   below, and once hand-inlined in completeDaily. The displayed streak used one
   and the persisted streak used the other. One rule, one home.
   --------------------------------------------------------------------------- */

export interface AnswerEvent {
  questionId: string;
  correct: boolean;
  elapsedMs: number;
}

/**
 * Fold one answer into the record: seen/correct/wrong membership, the review
 * schedule, the fastest time for that question, and today's heatmap cell.
 */
export function applyAnswer(
  p: StoredProgress,
  { questionId, correct, elapsedMs }: AnswerEvent,
  today = dayKey(),
): StoredProgress {
  const seenQuestionIds = p.seenQuestionIds.includes(questionId)
    ? p.seenQuestionIds
    : [...p.seenQuestionIds, questionId];

  // A question moves between the correct and wrong lists over time; membership
  // always reflects the most recent answer.
  const correctQuestionIds = correct
    ? [...new Set([...p.correctQuestionIds, questionId])]
    : p.correctQuestionIds.filter((id) => id !== questionId);
  const wrongQuestionIds = correct
    ? p.wrongQuestionIds.filter((id) => id !== questionId)
    : [...new Set([...p.wrongQuestionIds, questionId])];

  const best = p.perQuestionMs[questionId];

  return {
    ...p,
    seenQuestionIds,
    correctQuestionIds,
    wrongQuestionIds,
    reviewState: {
      ...p.reviewState,
      [questionId]: grade(p.reviewState[questionId], correct, today),
    },
    perQuestionMs: {
      ...p.perQuestionMs,
      [questionId]: best === undefined ? elapsedMs : Math.min(best, elapsedMs),
    },
    activityHeatmap: {
      ...p.activityHeatmap,
      [today]: (p.activityHeatmap?.[today] ?? 0) + 1,
    },
    dailyBreakdown: {
      ...p.dailyBreakdown,
      [today]: {
        drills: (p.dailyBreakdown?.[today]?.drills ?? 0) + 1,
        binary: p.dailyBreakdown?.[today]?.binary ?? 0,
      },
    },
  };
}

/**
 * Only the first drill of the day moves the streak. Extra rounds and free play
 * still record answers and time, but never touch it.
 *
 * The new streak comes from nextStreak(), so the grace policy is stated exactly
 * once and the number shown on the summary is by construction the number stored.
 */
export function completeDailyDrill(
  p: StoredProgress,
  totalMs: number,
  today = dayKey(),
): StoredProgress {
  if (p.lastCompletedDate === today) {
    return { ...p, totalMs: p.totalMs + totalMs };
  }
  const streakDays = nextStreak(p, today);
  return {
    ...p,
    streakDays,
    bestStreak: Math.max(p.bestStreak, streakDays),
    lastCompletedDate: today,
    completedDays: [...new Set([...p.completedDays, today])],
    totalMs: p.totalMs + totalMs,
  };
}

/** Extra rounds and free play: time is recorded, the streak is not touched. */
export function addPracticeTime(p: StoredProgress, totalMs: number): StoredProgress {
  return { ...p, totalMs: p.totalMs + totalMs };
}

export interface BinarySessionCommit {
  answers: BinaryAnswer[];
  totalMs: number;
  countsForDaily: boolean;
}

/** Commit a completed Binary deck atomically. */
export function commitBinarySession(
  p: StoredProgress,
  { answers, totalMs, countsForDaily }: BinarySessionCommit,
  today = dayKey(),
): StoredProgress {
  let binary = p.binary;
  for (const answer of answers) {
    const seenCardIds = binary.seenCardIds.includes(answer.cardId)
      ? binary.seenCardIds
      : [...binary.seenCardIds, answer.cardId];
    const correctCardIds = answer.correct
      ? [...new Set([...binary.correctCardIds, answer.cardId])]
      : binary.correctCardIds.filter((id) => id !== answer.cardId);
    const wrongCardIds = answer.correct
      ? binary.wrongCardIds.filter((id) => id !== answer.cardId)
      : [...new Set([...binary.wrongCardIds, answer.cardId])];
    const currentCorrectRun = answer.correct ? binary.currentCorrectRun + 1 : 0;
    const best = binary.perCardMs[answer.cardId];

    binary = {
      ...binary,
      seenCardIds,
      correctCardIds,
      wrongCardIds,
      reviewState: {
        ...binary.reviewState,
        [answer.cardId]: grade(binary.reviewState[answer.cardId], answer.correct, today),
      },
      totalAnswers: binary.totalAnswers + 1,
      correctAnswers: binary.correctAnswers + Number(answer.correct),
      perCardMs: {
        ...binary.perCardMs,
        [answer.cardId]: best === undefined ? answer.elapsedMs : Math.min(best, answer.elapsedMs),
      },
      currentCorrectRun,
      bestCorrectRun: Math.max(binary.bestCorrectRun, currentCorrectRun),
    };
  }

  const withAnswers: StoredProgress = {
    ...p,
    binary: { ...binary, totalMs: binary.totalMs + totalMs },
    activityHeatmap: {
      ...p.activityHeatmap,
      [today]: (p.activityHeatmap?.[today] ?? 0) + answers.length,
    },
    dailyBreakdown: {
      ...p.dailyBreakdown,
      [today]: {
        drills: p.dailyBreakdown?.[today]?.drills ?? 0,
        binary: (p.dailyBreakdown?.[today]?.binary ?? 0) + answers.length,
      },
    },
  };
  return countsForDaily
    ? completeDailyDrill(withAnswers, totalMs, today)
    : addPracticeTime(withAnswers, totalMs);
}

export function chooseBinaryDifficulty(
  p: StoredProgress,
  lastDifficulty: QuestionLevel,
): StoredProgress {
  return { ...p, binary: { ...p.binary, lastDifficulty } };
}

export function toggleSavedQuestion(p: StoredProgress, id: string): StoredProgress {
  return {
    ...p,
    savedQuestionIds: p.savedQuestionIds.includes(id)
      ? p.savedQuestionIds.filter((x) => x !== id)
      : [...p.savedQuestionIds, id],
  };
}

export function chooseHomeVariant(
  p: StoredProgress,
  homeVariant: StoredProgress["homeVariant"],
): StoredProgress {
  return { ...p, homeVariant };
}

/** Clears the "seen" list for one topic so it can be cycled again. */
export function forgetQuestions(p: StoredProgress, ids: string[]): StoredProgress {
  const drop = new Set(ids);
  const reviewState = { ...p.reviewState };
  for (const id of ids) delete reviewState[id];
  return {
    ...p,
    seenQuestionIds: p.seenQuestionIds.filter((id) => !drop.has(id)),
    correctQuestionIds: p.correctQuestionIds.filter((id) => !drop.has(id)),
    wrongQuestionIds: p.wrongQuestionIds.filter((id) => !drop.has(id)),
    reviewState,
  };
}

/** Portable snapshot for the dashboard's "Export it if you switch machines". */
export function exportProgress(p: StoredProgress): string {
  return JSON.stringify({ app: "strictmode", exportedAt: new Date().toISOString(), progress: p }, null, 2);
}

/**
 * Import merges rather than replaces — restoring a backup should never lose
 * questions answered on this machine since the export was taken.
 */
export function importProgress(current: StoredProgress, json: string): StoredProgress {
  const parsed = JSON.parse(json);
  const incoming = migrate(parsed?.progress ?? parsed);
  const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

  const heatmap: Record<string, number> = { ...current.activityHeatmap };
  for (const [day, n] of Object.entries(incoming.activityHeatmap ?? {})) {
    heatmap[day] = Math.max(heatmap[day] ?? 0, n);
  }

  const breakdown: Record<string, DailyBreakdown> = { ...current.dailyBreakdown };
  for (const [day, b] of Object.entries(incoming.dailyBreakdown ?? {})) {
    const existing = breakdown[day] ?? { drills: 0, binary: 0 };
    breakdown[day] = {
      drills: Math.max(existing.drills, b.drills ?? 0),
      binary: Math.max(existing.binary, b.binary ?? 0),
    };
  }

  const reviewState = { ...current.reviewState };
  for (const [id, rec] of Object.entries(incoming.reviewState)) {
    const mine = reviewState[id];
    // Keep whichever record is further along the ladder.
    if (!mine || rec.streak > mine.streak) reviewState[id] = rec;
  }

  const binaryReviewState = { ...current.binary.reviewState };
  for (const [id, rec] of Object.entries(incoming.binary.reviewState)) {
    const mine = binaryReviewState[id];
    if (!mine || rec.streak > mine.streak) binaryReviewState[id] = rec;
  }

  return {
    ...current,
    seenQuestionIds: union(current.seenQuestionIds, incoming.seenQuestionIds),
    correctQuestionIds: union(current.correctQuestionIds, incoming.correctQuestionIds),
    wrongQuestionIds: union(current.wrongQuestionIds, incoming.wrongQuestionIds),
    savedQuestionIds: union(current.savedQuestionIds, incoming.savedQuestionIds),
    completedDays: union(current.completedDays, incoming.completedDays).sort(),
    activityHeatmap: heatmap,
    dailyBreakdown: breakdown,
    reviewState,
    streakDays: Math.max(current.streakDays, incoming.streakDays),
    bestStreak: Math.max(current.bestStreak, incoming.bestStreak),
    totalMs: current.totalMs + incoming.totalMs,
    lastCompletedDate:
      [current.lastCompletedDate, incoming.lastCompletedDate].filter(Boolean).sort().pop() ??
      undefined,
    binary: {
      ...current.binary,
      seenCardIds: union(current.binary.seenCardIds, incoming.binary.seenCardIds),
      correctCardIds: union(current.binary.correctCardIds, incoming.binary.correctCardIds),
      wrongCardIds: union(current.binary.wrongCardIds, incoming.binary.wrongCardIds),
      reviewState: binaryReviewState,
      totalAnswers: current.binary.totalAnswers + incoming.binary.totalAnswers,
      correctAnswers: current.binary.correctAnswers + incoming.binary.correctAnswers,
      totalMs: current.binary.totalMs + incoming.binary.totalMs,
      perCardMs: { ...incoming.binary.perCardMs, ...current.binary.perCardMs },
      currentCorrectRun: Math.max(
        current.binary.currentCorrectRun,
        incoming.binary.currentCorrectRun,
      ),
      bestCorrectRun: Math.max(
        current.binary.bestCorrectRun,
        incoming.binary.bestCorrectRun,
      ),
    },
  };
}
