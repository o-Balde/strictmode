"use client";

/**
 * The question bank's client-side controls: track and level filters for the
 * full-stack tracks, a "draw a question" button for mock rounds, and links that
 * open a question card wherever it is on the page.
 *
 * All of it drives the shared prep provider, so search, filters and open state
 * behave exactly as they do on the interview prep sheet.
 */
import { useEffect } from "react";
import { Shuffle } from "lucide-react";
import type { PrepTrack } from "@data";
import { FilterPill, usePrep } from "@components";
import { PREP_LEVELS, PREP_LEVEL_LABEL, PREP_TRACK_LABEL } from "@lib";

/** Opens a question card and brings it into view, clearing filters that hide it. */
function useRevealQuestion() {
  const { visibleIds, setOpen, clearFilters } = usePrep();

  return (id: string) => {
    if (!visibleIds.has(id)) clearFilters();
    setOpen(id, true);
    // The card un-hides on the next render; scroll once it has.
    requestAnimationFrame(() => {
      const card = document.getElementById(id);
      if (!card) return;
      card.scrollIntoView({ block: "start" });
      card.querySelector("summary")?.focus({ preventScroll: true });
      history.replaceState(null, "", `#${id}`);
    });
  };
}

export interface BankFilterBarProps {
  tracks: readonly PrepTrack[];
}

export function BankFilterBar({ tracks }: Readonly<BankFilterBarProps>) {
  const { track, level, setTrack, setLevel } = usePrep();

  return (
    <div className="flex flex-col gap-2.5">
      <div role="group" aria-label="Filter by track" className="flex flex-wrap gap-2">
        <FilterPill active={track === "all"} onClick={() => setTrack("all")}>
          All
        </FilterPill>
        {tracks.map((option) => (
          <FilterPill key={option} active={track === option} onClick={() => setTrack(option)}>
            {PREP_TRACK_LABEL[option]}
          </FilterPill>
        ))}
      </div>
      <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
        <FilterPill active={level === "all"} onClick={() => setLevel("all")}>
          Any level
        </FilterPill>
        {PREP_LEVELS.filter((option) => option !== "senior").map((option) => (
          <FilterPill key={option} active={level === option} onClick={() => setLevel(option)}>
            {PREP_LEVEL_LABEL[option]}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

/** Picks a random question among those the filters leave visible: one rep of a mock round. */
export function DrawQuestionButton() {
  const { visibleIds } = usePrep();
  const reveal = useRevealQuestion();

  function draw() {
    const ids = [...visibleIds];
    if (ids.length === 0) return;
    reveal(ids[Math.floor(Math.random() * ids.length)]);
  }

  return (
    <button
      type="button"
      onClick={draw}
      disabled={visibleIds.size === 0}
      className="border-line-3 text-bone hover:border-flame inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors disabled:opacity-40"
    >
      <Shuffle aria-hidden className="size-3.5" />
      Draw a question
    </button>
  );
}

export interface OpenQuestionLinkProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/** A link to a question card that also opens it. */
export function OpenQuestionLink({ id, children, className }: Readonly<OpenQuestionLinkProps>) {
  const reveal = useRevealQuestion();

  return (
    <a
      href={`#${id}`}
      onClick={(event) => {
        event.preventDefault();
        reveal(id);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/** Opens the card named in the URL fragment on arrival, so a shared link lands on an open answer. */
export function OpenFromHash() {
  const { setOpen } = usePrep();

  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const card = id ? document.getElementById(id) : null;
    if (card?.tagName !== "DETAILS") return;
    setOpen(id, true); // nothing is filtered on arrival, so the card is already visible
    requestAnimationFrame(() => card.scrollIntoView({ block: "start" }));
  }, [setOpen]);

  return null;
}
