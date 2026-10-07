"use client";

/**
 * One question on the prep sheet. Closed by default: the point is to answer it
 * yourself first, and an answer you cannot avoid reading is just more prompt.
 *
 * A native <details> does the disclosure, so opening one works before the page
 * hydrates and the browser's find-in-page can reach inside. React mirrors the
 * open state only so "expand all" and the filters have something to drive.
 */
import { ChevronDown } from "lucide-react";
import type { QuestionLevel } from "@data";
import { PrepText, TypeBadge, usePrep } from "@components";
import { PREP_LEVEL_LABEL } from "@lib";

export interface PrepItemProps {
  id: string;
  /** Position within its section, for the gutter. */
  position: number;
  question: string;
  level: QuestionLevel;
  /** The server-rendered answer. */
  children: React.ReactNode;
}

export function PrepItem({
  id,
  position,
  question,
  level,
  children,
}: Readonly<PrepItemProps>) {
  const { visibleIds, openIds, setOpen } = usePrep();

  return (
    <details
      id={id}
      hidden={!visibleIds.has(id)}
      open={openIds.has(id)}
      onToggle={(event) => setOpen(id, event.currentTarget.open)}
      className="group border-line-2 bg-surface-2 open:border-line-3 scroll-mt-24 rounded-[9px] border transition-colors"
    >
      {/* A grid on narrow screens, so the level sits under the question and the
          question keeps the full width; a single row from sm up. */}
      <summary className="hover:bg-surface-4 grid cursor-pointer list-none grid-cols-[1.25rem_minmax(0,1fr)_auto] items-start gap-x-3.5 gap-y-2 rounded-[9px] px-4.5 py-4 transition-colors group-open:rounded-b-none sm:flex sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="text-slate w-5 shrink-0 pt-0.75 font-mono text-xs font-medium tabular-nums">
          {String(position).padStart(2, "0")}
        </span>
        <span className="text-paper min-w-0 flex-1 text-[15px]/[1.5] font-medium text-pretty">
          <PrepText text={question} />
        </span>
        <TypeBadge
          tone={level === "senior" ? "accent" : "muted"}
          className="col-start-2 row-start-2 justify-self-start sm:mt-0.5 sm:shrink-0"
        >
          {PREP_LEVEL_LABEL[level]}
        </TypeBadge>
        <ChevronDown
          aria-hidden
          className="text-slate col-start-3 row-start-1 mt-1 size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      {children}
    </details>
  );
}
