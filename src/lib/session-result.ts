/**
 * The handoff between /drill and /drill/done.
 *
 * Kept in sessionStorage rather than a query string or a store: the summary
 * screen must survive a refresh, but it is meaningless in a new tab and should
 * not outlive the browser session.
 */
import type { QuestionSubject } from "@data";

export const SESSION_RESULT_KEY = "strictmode.lastSession";

export interface SessionItemResult {
  id: string;
  title: string;
  subject: QuestionSubject;
  subjectTitle: string;
  correct: boolean;
  skipped: boolean;
  elapsedMs: number;
}

export interface SessionResult {
  mode: "daily" | "extra" | "free";
  subject?: QuestionSubject;
  items: SessionItemResult[];
  totalMs: number;
  /** Streak *after* this session; unchanged for extra rounds and free play. */
  streak: number;
  dayNumber: number;
  countsForStreak: boolean;
  finishedAt: string;
}

export function storeSessionResult(result: SessionResult): void {
  try {
    sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(result));
  } catch {
    /* storage unavailable — the summary falls back to an empty state */
  }
}

export function readSessionResult(): SessionResult | null {
  try {
    const raw = sessionStorage.getItem(SESSION_RESULT_KEY);
    return raw ? (JSON.parse(raw) as SessionResult) : null;
  } catch {
    return null;
  }
}
