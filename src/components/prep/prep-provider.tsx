"use client";

/**
 * Filter and disclosure state for the prep sheet.
 *
 * The answers are rendered on the server and passed through as children, so
 * the only thing the client owns is which questions are visible and which are
 * open. Search reads its text straight from the rendered DOM the first time it
 * is used: every answer is already on the page, and shipping the prose a second
 * time as props just to search it would double the payload.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { PrepTrack, QuestionLevel } from "@data";
import {
  matchesPrepFilters,
  searchPrepText,
  type PrepFilters,
  type PrepQuestionMeta,
} from "@lib";

interface PrepContextValue {
  total: number;
  query: string;
  track: PrepFilters["track"];
  level: PrepFilters["level"];
  visibleIds: ReadonlySet<string>;
  visibleBySection: ReadonlyMap<string, number>;
  openIds: ReadonlySet<string>;
  /** True when a filter or a search is narrowing the list. */
  filtered: boolean;
  search: (query: string) => void;
  setTrack: (track: PrepTrack | "all") => void;
  setLevel: (level: QuestionLevel | "all") => void;
  setOpen: (id: string, open: boolean) => void;
  openVisible: () => void;
  closeAll: () => void;
  clearFilters: () => void;
}

const PrepContext = createContext<PrepContextValue | null>(null);

export function usePrep(): PrepContextValue {
  const value = useContext(PrepContext);
  if (value === null) throw new Error("usePrep must be used inside <PrepProvider>");
  return value;
}

const NO_FILTERS: PrepFilters = { track: "all", level: "all", matches: null };
const NONE_OPEN: ReadonlySet<string> = new Set();

export interface PrepProviderProps {
  questions: readonly PrepQuestionMeta[];
  children: React.ReactNode;
}

export function PrepProvider({ questions, children }: Readonly<PrepProviderProps>) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(NO_FILTERS);
  const [openIds, setOpenIds] = useState(NONE_OPEN);
  const searchIndex = useRef<Map<string, string> | null>(null);

  const search = useCallback(
    (nextQuery: string) => {
      searchIndex.current ??= readSearchIndex(questions);
      const matches = searchPrepText(searchIndex.current, nextQuery);
      setQuery(nextQuery);
      setFilters((current) => ({ ...current, matches }));
    },
    [questions],
  );

  const setTrack = useCallback(
    (track: PrepFilters["track"]) => setFilters((current) => ({ ...current, track })),
    [],
  );

  const setLevel = useCallback(
    (level: PrepFilters["level"]) => setFilters((current) => ({ ...current, level })),
    [],
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setFilters(NO_FILTERS);
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

  const { visibleIds, visibleBySection } = useMemo(() => {
    const ids = new Set<string>();
    const bySection = new Map<string, number>();
    for (const question of questions) {
      if (!matchesPrepFilters(question, filters)) continue;
      ids.add(question.id);
      bySection.set(question.sectionId, (bySection.get(question.sectionId) ?? 0) + 1);
    }
    return { visibleIds: ids, visibleBySection: bySection };
  }, [questions, filters]);

  const openVisible = useCallback(() => setOpenIds(visibleIds), [visibleIds]);
  const closeAll = useCallback(() => setOpenIds(NONE_OPEN), []);

  const value = useMemo<PrepContextValue>(
    () => ({
      total: questions.length,
      query,
      track: filters.track,
      level: filters.level,
      visibleIds,
      visibleBySection,
      openIds,
      filtered: visibleIds.size !== questions.length,
      search,
      setTrack,
      setLevel,
      setOpen,
      openVisible,
      closeAll,
      clearFilters,
    }),
    [
      questions.length,
      query,
      filters.track,
      filters.level,
      visibleIds,
      visibleBySection,
      openIds,
      search,
      setTrack,
      setLevel,
      setOpen,
      openVisible,
      closeAll,
      clearFilters,
    ],
  );

  return <PrepContext.Provider value={value}>{children}</PrepContext.Provider>;
}

/** Lowercased text of every question and its answer, keyed by question id. */
function readSearchIndex(questions: readonly PrepQuestionMeta[]): Map<string, string> {
  const index = new Map<string, string>();
  for (const { id } of questions) {
    const text = document.getElementById(id)?.textContent;
    if (text) index.set(id, text.toLowerCase());
  }
  return index;
}
