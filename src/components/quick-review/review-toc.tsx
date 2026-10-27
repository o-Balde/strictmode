"use client";

/**
 * The section index: a pinned column beside the list on wide screens, a row
 * of chips that scrolls sideways on narrow ones. Counts follow the filters.
 */
import type { ReviewTopic } from "@data";
import { REVIEW_TOPIC_LABEL, cn } from "@lib";
import { useReview } from "./review-provider";

export interface ReviewTocEntry {
  id: string;
  topic: ReviewTopic;
  title: string;
}

export function ReviewToc({ sections }: Readonly<{ sections: readonly ReviewTocEntry[] }>) {
  const { visibleBySection } = useReview();
  const topics = [...new Set(sections.map((section) => section.topic))];

  return (
    <nav
      aria-label="Sections"
      className="scrollbar-hairline -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:sticky lg:top-22 lg:mx-0 lg:max-h-[calc(100dvh-7rem)] lg:flex-col lg:gap-5 lg:self-start lg:overflow-x-visible lg:overflow-y-auto lg:px-0 lg:pb-6"
    >
      {topics.map((topic) => (
        <div key={topic} className="contents lg:block">
          <div className="text-slate mb-2 hidden font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase lg:block">
            {REVIEW_TOPIC_LABEL[topic]}
          </div>
          <ul className="contents list-none lg:m-0 lg:flex lg:flex-col lg:gap-0.5 lg:p-0">
            {sections
              .filter((section) => section.topic === topic)
              .map((section) => {
                const visible = visibleBySection.get(section.id) ?? 0;
                return (
                  <li key={section.id} className="shrink-0">
                    <a
                      href={`#${section.id}`}
                      aria-disabled={visible === 0}
                      tabIndex={visible === 0 ? -1 : undefined}
                      className={cn(
                        "border-line-2 text-stone hover:text-bone flex items-baseline gap-2 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                        "lg:hover:bg-surface-4 lg:justify-between lg:gap-3 lg:rounded-md lg:border-0 lg:px-2 lg:py-1.5 lg:text-[12.5px]/[1.4] lg:whitespace-normal",
                        visible === 0 && "pointer-events-none opacity-35",
                      )}
                    >
                      <span>{section.title}</span>
                      <span className="text-slate font-mono text-[11px] tabular-nums">{visible}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
