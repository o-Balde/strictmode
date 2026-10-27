"use client";

/**
 * One question. Closed by default, as on the prep sheet: answer it yourself
 * first. A native <details> does the disclosure, so it works before hydration
 * and find-in-page can reach inside; React mirrors the open state so "expand
 * all", the filters and the demo loader have something to drive.
 */
import { Check, ChevronDown, Sparkles } from "lucide-react";
import type { QuestionLevel, ReviewTopic } from "@data";
import { PrepText, TypeBadge } from "@components";
import { PREP_LEVEL_LABEL, REVIEW_TOPIC_LABEL, cn } from "@lib";
import { useReview } from "./review-provider";

export interface ReviewItemProps {
  id: string;
  /** Position within its section, for the gutter. */
  position: number;
  question: string;
  topics: readonly ReviewTopic[];
  level: QuestionLevel;
  interactive: boolean;
  /** The server-rendered answer. */
  children: React.ReactNode;
}

export function ReviewItem({ id, position, question, topics, level, interactive, children }: Readonly<ReviewItemProps>) {
  const { visibleIds, openIds, setOpen, known } = useReview();
  const isKnown = known.has(id);

  return (
    <details
      id={id}
      hidden={!visibleIds.has(id)}
      open={openIds.has(id)}
      onToggle={(event) => setOpen(id, event.currentTarget.open)}
      className={cn(
        "group border-line-2 bg-surface-2 open:border-line-3 scroll-mt-28 rounded-[9px] border transition-colors",
        "data-[flash=true]:border-flame data-[flash=true]:ring-flame/40 data-[flash=true]:ring-2",
      )}
    >
      <summary className="hover:bg-surface-4 grid cursor-pointer list-none grid-cols-[1.25rem_minmax(0,1fr)_auto] items-start gap-x-3.5 gap-y-2 rounded-[9px] px-4.5 py-4 transition-colors group-open:rounded-b-none sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="text-slate w-5 shrink-0 pt-0.75 font-mono text-xs font-medium tabular-nums">
          {isKnown ? (
            <Check aria-label="Known" className="text-mint size-3.5 translate-y-0.5" />
          ) : (
            String(position).padStart(2, "0")
          )}
        </span>
        <span className={cn("min-w-0 text-[15px]/[1.5] font-medium text-pretty", isKnown ? "text-stone" : "text-paper")}>
          <PrepText text={question} />
        </span>
        <ChevronDown
          aria-hidden
          className="text-slate col-start-3 row-start-1 mt-1 size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
        <span className="col-start-2 row-start-2 flex flex-wrap items-center gap-1.5">
          <TypeBadge tone={level === "senior" ? "accent" : "muted"}>{PREP_LEVEL_LABEL[level]}</TypeBadge>
          {topics.map((topic) => (
            <span key={topic} className="text-slate font-mono text-[10.5px] tracking-[0.04em]">
              {REVIEW_TOPIC_LABEL[topic]}
            </span>
          ))}
          {interactive ? (
            <span className="text-binary-soft inline-flex items-center gap-1 font-mono text-[10.5px] tracking-[0.04em]">
              <Sparkles aria-hidden className="size-3" />
              demo
            </span>
          ) : null}
        </span>
      </summary>
      {children}
    </details>
  );
}

/** Marks a question as known, or not; kept in this browser. */
export function KnownToggle({ id }: Readonly<{ id: string }>) {
  const { known, markKnown } = useReview();
  const isKnown = known.has(id);

  return (
    <button
      type="button"
      aria-pressed={isKnown}
      onClick={() => markKnown(id, !isKnown)}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
        isKnown ? "border-mint-line bg-mint-deep text-mint-soft" : "border-line-3 text-bone hover:border-line-2",
      )}
    >
      <Check aria-hidden className={cn("size-3.5", isKnown ? "opacity-100" : "opacity-40")} />
      I know this one
    </button>
  );
}
