"use client";

/**
 * Search, filters and the "known" counter for the quick review page. The
 * search bar stays pinned while the page scrolls; the filter rows only matter
 * at the top, so they scroll away.
 */
import { useEffect, useEffectEvent, useRef } from "react";
import { Dices, Search } from "lucide-react";
import type { QuestionLevel } from "@data";
import { FilterPill } from "@components";
import { PREP_LEVELS, PREP_LEVEL_LABEL, REVIEW_RESULTS_ID, REVIEW_TOPICS, REVIEW_TOPIC_LABEL, cn, pickRandom } from "@lib";
import { useReview } from "./review-provider";

const FOCUS_KEY = "/";
const RANDOM_KEY = "r";
const FLASH_MS = 1600;

function typingInField(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable]") !== null;
}

export function ReviewSearch() {
  const { query, search, total, visibleIds, visibleOrder, known, filtered, openIds, openVisible, closeAll } = useReview();
  const inputRef = useRef<HTMLInputElement>(null);

  function jumpToRandom() {
    const unknown = visibleOrder.filter((id) => !known.has(id));
    const id = pickRandom(unknown.length > 0 ? unknown : visibleOrder);
    if (!id) return;
    const item = document.getElementById(id);
    if (!(item instanceof HTMLDetailsElement)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
    item.querySelector("summary")?.focus({ preventScroll: true });
    item.dataset.flash = "true";
    window.setTimeout(() => delete item.dataset.flash, FLASH_MS);
  }

  // "/" jumps to search and "r" to a random question, unless the reader is typing.
  const onRandomKey = useEffectEvent(jumpToRandom);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || typingInField(event.target)) return;
      if (event.key === FOCUS_KEY) {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.key === RANDOM_KEY) {
        event.preventDefault();
        onRandomKey();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSearch(nextQuery: string) {
    search(nextQuery);
    const results = document.getElementById(REVIEW_RESULTS_ID);
    if (results && results.getBoundingClientRect().top < 0) results.scrollIntoView();
  }

  const anyOpen = openIds.size > 0;

  return (
    <div className="border-line bg-ink sticky top-0 z-20 border-y">
      <div className="mx-auto flex max-w-295 items-center gap-2.5 px-4 py-3 sm:gap-3 sm:px-10">
        <label className="border-line-2 bg-surface focus-within:border-line-3 flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors">
          <Search aria-hidden className="text-slate size-4 shrink-0" />
          <span className="sr-only">Search questions and answers</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={`Search ${total} questions`}
            autoComplete="off"
            spellCheck={false}
            className="text-paper placeholder:text-slate min-w-0 flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="border-line-2 text-slate hidden rounded border px-1.5 font-mono text-[10px] sm:block">{FOCUS_KEY}</kbd>
        </label>

        <span className="text-ash hidden shrink-0 font-mono text-xs tabular-nums md:block" aria-live="polite">
          {filtered ? `${visibleIds.size} of ${total}` : `${total} questions`}
        </span>

        <button
          type="button"
          onClick={jumpToRandom}
          disabled={visibleOrder.length === 0}
          title="Jump to a random question you haven't marked as known (R)"
          className="border-line-3 text-bone hover:border-line-2 inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors disabled:opacity-40"
        >
          <Dices aria-hidden className="size-3.5" />
          <span className="hidden sm:inline">Random</span>
          <span className="sr-only sm:hidden">Random question</span>
        </button>

        <button
          type="button"
          onClick={anyOpen ? closeAll : openVisible}
          className="border-line-3 text-bone hover:border-line-2 shrink-0 rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors"
        >
          {anyOpen ? "Collapse" : "Expand"}
          <span className="hidden sm:inline"> all</span>
        </button>
      </div>
    </div>
  );
}

export function ReviewFilterBar() {
  const { filters, setTopic, setLevel, setInteractiveOnly, setHideKnown } = useReview();

  return (
    <div className="flex flex-col gap-2.5">
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        <FilterPill active={filters.topic === "all"} onClick={() => setTopic("all")}>
          All topics
        </FilterPill>
        {REVIEW_TOPICS.map((option) => (
          <FilterPill key={option} active={filters.topic === option} onClick={() => setTopic(option)}>
            {REVIEW_TOPIC_LABEL[option]}
          </FilterPill>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
          <FilterPill active={filters.level === "all"} onClick={() => setLevel("all")}>
            Any level
          </FilterPill>
          {PREP_LEVELS.map((option: QuestionLevel) => (
            <FilterPill key={option} active={filters.level === option} onClick={() => setLevel(option)}>
              {PREP_LEVEL_LABEL[option]}
            </FilterPill>
          ))}
        </div>
        <div role="group" aria-label="More filters" className="flex flex-wrap gap-2">
          <FilterPill active={filters.interactiveOnly} onClick={() => setInteractiveOnly(!filters.interactiveOnly)}>
            With a demo
          </FilterPill>
          <FilterPill active={filters.hideKnown} onClick={() => setHideKnown(!filters.hideKnown)}>
            Hide known
          </FilterPill>
        </div>
      </div>
    </div>
  );
}

/** How many questions the reader has marked as known, with a way to start over. */
export function ReviewProgress() {
  const { known, total, forgetKnown } = useReview();
  const percent = Math.round((known.size / total) * 100);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex min-w-48 flex-1 items-center gap-3">
        <div
          className="bg-line h-1.5 flex-1 overflow-hidden rounded-full"
          role="progressbar"
          aria-label="Questions marked as known"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={known.size}
        >
          <div className="bg-mint h-full rounded-full transition-[width] duration-300" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-ash shrink-0 font-mono text-xs tabular-nums">
          {known.size} / {total} known
        </span>
      </div>
      <button
        type="button"
        onClick={forgetKnown}
        disabled={known.size === 0}
        className={cn(
          "text-slate font-mono text-[11.5px] underline-offset-2 transition-colors",
          known.size === 0 ? "opacity-0" : "hover:text-bone hover:underline",
        )}
      >
        Start over
      </button>
    </div>
  );
}

/** Shown in place of the sections when the filters match nothing. */
export function ReviewEmpty() {
  const { visibleIds, query, filters, clearFilters } = useReview();
  if (visibleIds.size > 0) return null;

  return (
    <div className="border-line-2 rounded-[9px] border border-dashed px-6 py-12 text-center">
      <p className="text-paper m-0 mb-1.5 text-[15px] font-medium">
        {query.trim()
          ? `Nothing matches “${query.trim()}”.`
          : filters.hideKnown
            ? "You've marked every question here as known."
            : "No questions match these filters."}
      </p>
      <p className="text-ash m-0 mb-5 text-[13.5px]">Try a shorter search, or a different topic or level.</p>
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
