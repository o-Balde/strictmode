"use client";

import type { ReviewTopic } from "@data";
import { PrepText } from "@components";
import { REVIEW_TOPIC_LABEL } from "@lib";
import { useReview } from "./review-provider";

export interface ReviewSectionProps {
  id: string;
  topic: ReviewTopic;
  title: string;
  blurb: string;
  total: number;
  children: React.ReactNode;
}

/** A titled group of questions. Disappears when the filters leave it empty. */
export function ReviewSection({ id, topic, title, blurb, total, children }: Readonly<ReviewSectionProps>) {
  const { visibleBySection } = useReview();
  const visible = visibleBySection.get(id) ?? 0;

  return (
    <section id={id} hidden={visible === 0} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="text-slate mb-1.5 font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">
            {REVIEW_TOPIC_LABEL[topic]}
          </div>
          <h2 id={`${id}-title`} className="text-parchment m-0 mb-1.5 text-xl font-semibold tracking-[-0.02em] text-balance">
            {title}
          </h2>
          <p className="text-ash m-0 max-w-[62ch] text-[13.5px]/[1.65] text-pretty">
            <PrepText text={blurb} />
          </p>
        </div>
        <span className="text-ash shrink-0 font-mono text-xs tabular-nums">
          {visible === total ? total : `${visible} / ${total}`}
        </span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}
