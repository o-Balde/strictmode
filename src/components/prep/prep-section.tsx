"use client";

import Link from "next/link";
import type { PrepTrack } from "@data";
import { usePrep } from "@components";
import { PREP_TRACK_LABEL } from "@lib";

export interface PrepSectionProps {
  id: string;
  track: PrepTrack;
  title: string;
  blurb: string;
  total: number;
  /** The drill topic that exercises this section, when the bank has one. */
  drill?: { href: string; title: string };
  children: React.ReactNode;
}

/** A titled group of questions. Disappears when the filters leave it empty. */
export function PrepSection({
  id,
  track,
  title,
  blurb,
  total,
  drill,
  children,
}: Readonly<PrepSectionProps>) {
  const { visibleBySection } = usePrep();
  const visible = visibleBySection.get(id) ?? 0;

  return (
    <section id={id} hidden={visible === 0} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="text-slate mb-1.5 font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">
            {PREP_TRACK_LABEL[track]}
          </div>
          <h2
            id={`${id}-title`}
            className="text-parchment m-0 mb-1.5 text-xl font-semibold tracking-[-0.02em] text-balance"
          >
            {title}
          </h2>
          <p className="text-ash m-0 max-w-[62ch] text-[13.5px]/[1.65] text-pretty">{blurb}</p>
        </div>
        <span className="text-ash shrink-0 font-mono text-xs tabular-nums">
          {visible === total ? total : `${visible} / ${total}`}
        </span>
      </div>

      <div className="flex flex-col gap-2">{children}</div>

      {drill ? (
        <p className="text-slate mt-3.5 mb-0 text-[12.5px]">
          Want reps on this?{" "}
          <Link href={drill.href} className="text-clay underline underline-offset-2">
            Drill {drill.title} →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
