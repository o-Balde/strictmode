"use client";

/**
 * Search and filters for the prep sheet. The search bar stays pinned while the
 * page scrolls; the filter rows are only needed at the top, so they scroll away.
 */
import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { FilterPill, usePrep } from "@components";
import {
  PREP_LEVELS,
  PREP_LEVEL_LABEL,
  PREP_RESULTS_ID,
  PREP_TRACKS,
  PREP_TRACK_LABEL,
} from "@lib";

const FOCUS_KEY = "/";

export function PrepSearch() {
  const { query, search, total, visibleIds, filtered, openIds, openVisible, closeAll } = usePrep();
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" jumps to search, as it does on most reference sites.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== FOCUS_KEY || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable]")) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSearch(nextQuery: string) {
    search(nextQuery);
    // Searching from deep in the page would otherwise leave the matches above the fold.
    const results = document.getElementById(PREP_RESULTS_ID);
    if (results && results.getBoundingClientRect().top < 0) results.scrollIntoView();
  }

  const anyOpen = openIds.size > 0;

  return (
    <div className="border-line bg-ink sticky top-0 z-20 border-y">
      <div className="mx-auto flex max-w-295 items-center gap-3 px-6 py-3 sm:px-10">
        <label className="border-line-2 bg-surface focus-within:border-line-3 flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors">
          <Search aria-hidden className="text-slate size-4 shrink-0" />
          <span className="sr-only">Search questions and answers</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search questions and answers"
            autoComplete="off"
            spellCheck={false}
            className="text-paper placeholder:text-slate min-w-0 flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="border-line-2 text-slate hidden rounded border px-1.5 font-mono text-[10px] sm:block">
            {FOCUS_KEY}
          </kbd>
        </label>

        <span className="text-ash hidden shrink-0 font-mono text-xs tabular-nums sm:block" aria-live="polite">
          {filtered ? `${visibleIds.size} of ${total}` : `${total} questions`}
        </span>

        <button
          type="button"
          onClick={anyOpen ? closeAll : openVisible}
          className="border-line-3 text-bone hover:border-line-2 shrink-0 rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors"
        >
          {anyOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
    </div>
  );
}

export function PrepFilterBar() {
  const { track, level, setTrack, setLevel } = usePrep();

  return (
    <div className="flex flex-col gap-2.5">
      <div role="group" aria-label="Filter by track" className="flex flex-wrap gap-2">
        <FilterPill active={track === "all"} onClick={() => setTrack("all")}>
          All
        </FilterPill>
        {PREP_TRACKS.map((option) => (
          <FilterPill key={option} active={track === option} onClick={() => setTrack(option)}>
            {PREP_TRACK_LABEL[option]}
          </FilterPill>
        ))}
      </div>
      <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
        <FilterPill active={level === "all"} onClick={() => setLevel("all")}>
          Any level
        </FilterPill>
        {PREP_LEVELS.map((option) => (
          <FilterPill key={option} active={level === option} onClick={() => setLevel(option)}>
            {PREP_LEVEL_LABEL[option]}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

/** Shown in place of the sections when the filters match nothing. */
export function PrepEmpty() {
  const { visibleIds, query, clearFilters } = usePrep();
  if (visibleIds.size > 0) return null;

  return (
    <div className="border-line-2 rounded-[9px] border border-dashed px-6 py-12 text-center">
      <p className="text-paper m-0 mb-1.5 text-[15px] font-medium">
        {query.trim() ? `Nothing matches “${query.trim()}”.` : "No questions match these filters."}
      </p>
      <p className="text-ash m-0 mb-5 text-[13.5px]">Try a shorter search, or a different track or level.</p>
      <button
        type="button"
        onClick={clearFilters}
        className="border-line-3 text-bone hover:border-line-2 rounded-lg border px-4.5 py-2.5 text-[13.5px] font-medium transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
