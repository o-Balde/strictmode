/**
 * Saved state for the Scotiabank concept review: which flashcards the reader
 * knows, and how the deck is filtered.
 *
 * Kept apart from the drill progress record on purpose: a flashcard isn't a
 * scored drill and shouldn't touch the streak. Every change is a pure
 * transition here; scotiabank-study-store only persists and broadcasts it.
 */
export const STUDY_STORAGE_KEY = "strictmode.scotiabank-study.v1";

/** Which cards the deck draws: concepts, questions, or both. */
export type StudyDeckKind = "all" | "concept" | "question";

export interface StudyState {
  version: 1;
  /** Card ids marked "got it", in the order they were marked. */
  known: string[];
  /** A topic id, or "all". */
  topic: string;
  kind: StudyDeckKind;
  hideKnown: boolean;
}

export function emptyStudy(): StudyState {
  return { version: 1, known: [], topic: "all", kind: "all", hideKnown: false };
}

export function loadStudy(): StudyState {
  if (typeof window === "undefined") return emptyStudy();
  try {
    const raw = window.localStorage.getItem(STUDY_STORAGE_KEY);
    if (!raw) return emptyStudy();
    const parsed = JSON.parse(raw) as Partial<StudyState>;
    if (parsed.version !== 1) return emptyStudy();
    const fallback = emptyStudy();
    return {
      version: 1,
      known: Array.isArray(parsed.known) ? parsed.known.filter((id): id is string => typeof id === "string") : [],
      topic: typeof parsed.topic === "string" ? parsed.topic : fallback.topic,
      kind: parsed.kind === "concept" || parsed.kind === "question" ? parsed.kind : fallback.kind,
      hideKnown: parsed.hideKnown === true,
    };
  } catch {
    // Private mode or corrupt JSON: study without persistence.
    return emptyStudy();
  }
}

export function saveStudy(state: StudyState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: the marks last until the tab closes.
  }
}

export function markCard(state: StudyState, id: string, known: boolean): StudyState {
  const has = state.known.includes(id);
  if (has === known) return state;
  return { ...state, known: known ? [...state.known, id] : state.known.filter((other) => other !== id) };
}

/** Forgets the given cards, so a deck can start over without touching the others. */
export function forgetCards(state: StudyState, ids: readonly string[]): StudyState {
  const forget = new Set(ids);
  const known = state.known.filter((id) => !forget.has(id));
  return known.length === state.known.length ? state : { ...state, known };
}

export interface StudyDeckFilter {
  topic?: string;
  kind?: StudyDeckKind;
  hideKnown?: boolean;
}

export function setStudyDeck(state: StudyState, filter: StudyDeckFilter): StudyState {
  const next = { ...state, ...filter };
  const same = next.topic === state.topic && next.kind === state.kind && next.hideKnown === state.hideKnown;
  return same ? state : next;
}
