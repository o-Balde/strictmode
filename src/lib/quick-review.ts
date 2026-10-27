/**
 * The quick review page's filters and its one piece of saved state: which
 * questions the reader has marked as known.
 *
 * Kept apart from the progress record on purpose, like the CodeSignal page's
 * practice state: reviewing is not a drill and never touches the streak. Every
 * change is a pure transition here; quick-review-store persists and broadcasts.
 */
import type { QuestionLevel, ReviewTopic } from "@data";

export const REVIEW_STORAGE_KEY = "strictmode.quick-review.v1";

/** Anchors the top of the question list, so a search can bring its results into view. */
export const REVIEW_RESULTS_ID = "review-results";

/** In the order the filters list them. */
export const REVIEW_TOPICS: readonly ReviewTopic[] = ["javascript", "react", "css", "html", "accessibility", "node", "security"];

export const REVIEW_TOPIC_LABEL: Record<ReviewTopic, string> = {
  javascript: "JavaScript",
  react: "React",
  css: "CSS",
  html: "HTML",
  accessibility: "Accessibility",
  node: "Node.js",
  security: "Security",
};

/** The slice of a question the page needs to filter it, without its answer. */
export interface ReviewQuestionMeta {
  id: string;
  sectionId: string;
  topics: readonly ReviewTopic[];
  level: QuestionLevel;
  interactive: boolean;
}

export interface ReviewFilters {
  topic: ReviewTopic | "all";
  level: QuestionLevel | "all";
  interactiveOnly: boolean;
  hideKnown: boolean;
  /** IDs matching the search box, or null when it is empty. */
  matches: ReadonlySet<string> | null;
}

export const NO_REVIEW_FILTERS: ReviewFilters = {
  topic: "all",
  level: "all",
  interactiveOnly: false,
  hideKnown: false,
  matches: null,
};

export function matchesReviewFilters(
  question: ReviewQuestionMeta,
  filters: ReviewFilters,
  known: ReadonlySet<string>,
): boolean {
  if (filters.topic !== "all" && !question.topics.includes(filters.topic)) return false;
  if (filters.level !== "all" && question.level !== filters.level) return false;
  if (filters.interactiveOnly && !question.interactive) return false;
  if (filters.hideKnown && known.has(question.id)) return false;
  return filters.matches === null || filters.matches.has(question.id);
}

// ── Saved state ─────────────────────────────────────────────────────────────

export interface ReviewState {
  version: 1;
  /** Question ids the reader marked as known, in the order they were marked. */
  known: string[];
}

export function emptyReview(): ReviewState {
  return { version: 1, known: [] };
}

export function loadReview(): ReviewState {
  if (typeof window === "undefined") return emptyReview();
  try {
    const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!raw) return emptyReview();
    const parsed = JSON.parse(raw) as Partial<ReviewState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.known)) return emptyReview();
    return { version: 1, known: parsed.known.filter((id): id is string => typeof id === "string") };
  } catch {
    // Private mode or corrupt JSON: review without persistence.
    return emptyReview();
  }
}

export function saveReview(state: ReviewState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: the marks last until the tab closes.
  }
}

export function setKnown(state: ReviewState, id: string, known: boolean): ReviewState {
  const has = state.known.includes(id);
  if (has === known) return state;
  return { ...state, known: known ? [...state.known, id] : state.known.filter((other) => other !== id) };
}

export function forgetAllKnown(state: ReviewState): ReviewState {
  return state.known.length === 0 ? state : { ...state, known: [] };
}

/** A random element, or undefined for an empty list. `random` is injectable for tests. */
export function pickRandom<T>(items: readonly T[], random: () => number = Math.random): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(random() * items.length)];
}
