"use client";

/**
 * Filter, disclosure and "known" state for the quick review page.
 *
 * As on the prep sheet, the answers are rendered on the server and passed
 * through as children, so the client owns only which questions are visible
 * and open. Search reads its text from the rendered DOM the first time it is
 * used rather than shipping the prose twice. Known marks live in localStorage
 * through an external store, so every tab agrees.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { QuestionLevel, ReviewTopic } from "@data";
import {
  NO_REVIEW_FILTERS,
  forgetAllKnown,
  matchesReviewFilters,
  quickReviewStore as store,
  searchPrepText,
  setKnown,
  type ReviewFilters,
  type ReviewQuestionMeta,
} from "@lib";

interface ReviewContextValue {
  total: number;
  query: string;
  filters: ReviewFilters;
  visibleIds: ReadonlySet<string>;
  /** Visible questions in page order, for "random" and counters. */
  visibleOrder: readonly string[];
  visibleBySection: ReadonlyMap<string, number>;
  openIds: ReadonlySet<string>;
  known: ReadonlySet<string>;
  /** True when a filter or a search is narrowing the list. */
  filtered: boolean;
  search: (query: string) => void;
  setTopic: (topic: ReviewTopic | "all") => void;
  setLevel: (level: QuestionLevel | "all") => void;
  setInteractiveOnly: (on: boolean) => void;
  setHideKnown: (on: boolean) => void;
  setOpen: (id: string, open: boolean) => void;
  openVisible: () => void;
  closeAll: () => void;
  clearFilters: () => void;
  markKnown: (id: string, known: boolean) => void;
  forgetKnown: () => void;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function useReview(): ReviewContextValue {
  const value = useContext(ReviewContext);
  if (value === null) throw new Error("useReview must be used inside <ReviewProvider>");
  return value;
}

const NONE_OPEN: ReadonlySet<string> = new Set();

export interface ReviewProviderProps {
  questions: readonly ReviewQuestionMeta[];
  children: React.ReactNode;
}

export function ReviewProvider({ questions, children }: Readonly<ReviewProviderProps>) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(NO_REVIEW_FILTERS);
  const [openIds, setOpenIds] = useState(NONE_OPEN);
  const searchIndex = useRef<Map<string, string> | null>(null);
  const saved = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const known = useMemo(() => new Set(saved.known), [saved.known]);

  const search = useCallback(
    (nextQuery: string) => {
      searchIndex.current ??= readSearchIndex(questions);
      const matches = searchPrepText(searchIndex.current, nextQuery);
      setQuery(nextQuery);
      setFilters((current) => ({ ...current, matches }));
    },
    [questions],
  );

  const setTopic = useCallback((topic: ReviewFilters["topic"]) => setFilters((current) => ({ ...current, topic })), []);
  const setLevel = useCallback((level: ReviewFilters["level"]) => setFilters((current) => ({ ...current, level })), []);
  const setInteractiveOnly = useCallback(
    (interactiveOnly: boolean) => setFilters((current) => ({ ...current, interactiveOnly })),
    [],
  );
  const setHideKnown = useCallback((hideKnown: boolean) => setFilters((current) => ({ ...current, hideKnown })), []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setFilters(NO_REVIEW_FILTERS);
  }, []);

  const setOpen = useCallback((id: string, open: boolean) => {
    setOpenIds((current) => {
      if (current.has(id) === open) return current;
      const next = new Set(current);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const markKnown = useCallback((id: string, isKnown: boolean) => store.update((state) => setKnown(state, id, isKnown)), []);
  const forgetKnown = useCallback(() => store.update(forgetAllKnown), []);

  const { visibleIds, visibleOrder, visibleBySection } = useMemo(() => {
    const ids = new Set<string>();
    const order: string[] = [];
    const bySection = new Map<string, number>();
    for (const question of questions) {
      if (!matchesReviewFilters(question, filters, known)) continue;
      ids.add(question.id);
      order.push(question.id);
      bySection.set(question.sectionId, (bySection.get(question.sectionId) ?? 0) + 1);
    }
    return { visibleIds: ids, visibleOrder: order, visibleBySection: bySection };
  }, [questions, filters, known]);

  const openVisible = useCallback(() => setOpenIds(visibleIds), [visibleIds]);
  const closeAll = useCallback(() => setOpenIds(NONE_OPEN), []);

  const value = useMemo<ReviewContextValue>(
    () => ({
      total: questions.length,
      query,
      filters,
      visibleIds,
      visibleOrder,
      visibleBySection,
      openIds,
      known,
      filtered: visibleIds.size !== questions.length,
      search,
      setTopic,
      setLevel,
      setInteractiveOnly,
      setHideKnown,
      setOpen,
      openVisible,
      closeAll,
      clearFilters,
      markKnown,
      forgetKnown,
    }),
    [
      questions.length,
      query,
      filters,
      visibleIds,
      visibleOrder,
      visibleBySection,
      openIds,
      known,
      search,
      setTopic,
      setLevel,
      setInteractiveOnly,
      setHideKnown,
      setOpen,
      openVisible,
      closeAll,
      clearFilters,
      markKnown,
      forgetKnown,
    ],
  );

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

/**
 * Lowercased text of every question and its answer, keyed by question id.
 * Interactive demos are left out: their labels change as they are used.
 */
function readSearchIndex(questions: readonly ReviewQuestionMeta[]): Map<string, string> {
  const index = new Map<string, string>();
  for (const { id } of questions) {
    const item = document.getElementById(id);
    if (!item) continue;
    const copy = item.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[data-demo]").forEach((demo) => demo.remove());
    index.set(id, (copy.textContent ?? "").toLowerCase());
  }
  return index;
}
