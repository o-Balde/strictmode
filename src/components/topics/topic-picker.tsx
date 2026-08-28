"use client";

/**
 * Mockup 1k — free-play entry, one coverage ring per topic.
 *
 * Only subjects that actually have questions get a card. Three of the sixteen
 * in TOPIC_METADATA (narrowing, design-patterns, event-loop) have none in the
 * bank, so showing them would mean shipping dead cards.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/progress-provider";
import { CoverageRing } from "@/components/meters";
import { CATEGORIES, SUBJECTS } from "@/lib/question-index";
import { subjectProgress } from "@/lib/drill";
import type { QuestionCategory } from "@/data/types";
import { stagger, staggerChild } from "@/lib/motion";

type Filter = QuestionCategory | "all" | "code";

const CATEGORY_LABEL: Record<QuestionCategory, string> = {
  react: "React",
  typescript: "TypeScript",
  nextjs: "Next.js",
  javascript: "JavaScript",
  performance: "Performance",
  system_design: "System design",
  algorithms: "Algorithms",
};

export function TopicPicker() {
  const { progress } = useProgress();
  const [filter, setFilter] = useState<Filter>("all");

  const coverage = useMemo(
    () =>
      subjectProgress(
        progress.seenQuestionIds,
        progress.correctQuestionIds,
        SUBJECTS.map((s) => ({ subject: s.subject, total: s.total })),
      ),
    [progress.seenQuestionIds, progress.correctQuestionIds],
  );

  const byId = useMemo(
    () => new Map(coverage.map((c) => [c.subject, c])),
    [coverage],
  );

  const visible = SUBJECTS.filter((s) => {
    if (filter === "all") return true;
    if (filter === "code") return true;
    return s.category === filter;
  });

  const wrongCount = progress.wrongQuestionIds.length;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[860px] px-6 py-8 sm:px-9 sm:py-10">
      <Link
        href="/"
        className="text-ash hover:text-bone mb-7 inline-flex items-center gap-2 text-[13px] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Today
      </Link>

      <h1 className="text-parchment m-0 mb-1 text-[23px] font-semibold tracking-[-0.02em]">
        Drill a topic
      </h1>
      <p className="text-ash m-0 mb-6 text-[13.5px]">
        Free play — as many rounds as you like. Doesn&apos;t touch your daily streak.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterPill>
        {CATEGORIES.map((c) => (
          <FilterPill key={c} active={filter === c} onClick={() => setFilter(c)}>
            {CATEGORY_LABEL[c] ?? c}
          </FilterPill>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={stagger(0.04)}
        initial="hidden"
        animate="show"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((s, i) => {
          const c = byId.get(s.subject);
          const seen = c?.seen ?? 0;
          const percent = s.total > 0 ? (seen / s.total) * 100 : 0;
          return (
            <motion.div key={s.subject} variants={staggerChild}>
              <Link
                href={`/topics/${s.subject}`}
                className="border-line-2 bg-surface-2 hover:border-line-3 block h-full rounded-[9px] border p-[18px] transition-colors"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="text-slate font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">
                    {CATEGORY_LABEL[s.category] ?? s.category}
                  </span>
                  <CoverageRing percent={percent} delay={0.1 + i * 0.04} />
                </div>
                <div className="text-paper mb-1.5 text-[15.5px] font-semibold">{s.title}</div>
                <div className="text-ash font-mono text-[12px]">
                  {seen} / {s.total} seen
                  {c?.exhausted ? " · cleared" : ""}
                </div>
              </Link>
            </motion.div>
          );
        })}

        <motion.div variants={staggerChild}>
          <Link
            href="/drill?mode=free&review=1"
            aria-disabled={wrongCount === 0}
            onClick={(e) => {
              if (wrongCount === 0) e.preventDefault();
            }}
            className={cn(
              "border-line-2 flex h-full flex-col justify-center rounded-[9px] border border-dashed bg-[#141312] p-[18px] transition-colors",
              wrongCount > 0 ? "hover:border-flame" : "cursor-not-allowed opacity-60",
            )}
          >
            <div className="text-ash mb-1.5 text-[15px] font-semibold">Mixed review</div>
            <div className="text-shadow font-mono text-[12px]/[1.5]">
              {wrongCount > 0
                ? `${wrongCount} question${wrongCount === 1 ? "" : "s"} you got wrong`
                : "nothing wrong yet"}
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-[7px] font-mono text-[12px] font-medium transition-colors",
        active
          ? "bg-flame text-ink"
          : "border-line-2 text-stone hover:text-bone border",
      )}
    >
      {children}
    </button>
  );
}
