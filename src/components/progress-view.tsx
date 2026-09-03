"use client";

/**
 * Mockup 1j — coverage over points. What you've seen, what's shaky, and how
 * consistently you've shown up. Deliberately no score, no XP, no rank.
 */
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Flame } from "lucide-react";
import { Heatmap, MasteryBar, buildCells, useProgress } from "@components";
import {
  BANK_TOTAL,
  BINARY_BANK_SIZE,
  SUBJECTS,
  cn,
  formatDuration,
  isDue,
  stagger,
  staggerChild,
  streakHealth,
  subjectMeta,
  subjectProgress,
} from "@lib";

export function ProgressView() {
  const { progress, hydrated, resetAll } = useProgress();

  const coverage = subjectProgress(
    progress.seenQuestionIds,
    progress.correctQuestionIds,
    SUBJECTS.map((subjectEntry) => ({ subject: subjectEntry.subject, total: subjectEntry.total })),
  );

  const seen = progress.seenQuestionIds.length;
  const correct = progress.correctQuestionIds.length;
  const covered = BANK_TOTAL > 0 ? Math.round((seen / BANK_TOTAL) * 100) : 0;
  // "first-try correct" here means currently-correct over currently-seen; a
  // question re-answered right stops counting against you.
  const accuracy = seen > 0 ? Math.round((correct / seen) * 100) : 0;
  const cells = buildCells(progress.activityHeatmap ?? {}, 84, {
    dailyBreakdown: progress.dailyBreakdown,
    completedDays: progress.completedDays,
  });
  const health = streakHealth(progress);
  const binary = progress.binary;
  const binaryAccuracy = binary.totalAnswers > 0
    ? Math.round((binary.correctAnswers / binary.totalAnswers) * 100)
    : 0;
  const binaryDue = Object.values(binary.reviewState).filter((record) => isDue(record)).length;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-215 px-6 py-8 sm:px-9 sm:py-10">
      <Link
        href="/"
        className="text-ash hover:text-bone mb-7 inline-flex items-center gap-2 text-[13px] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Today
      </Link>

      <motion.div variants={stagger(0.06)} initial="hidden" animate="show">
        <motion.h1
          variants={staggerChild}
          className="text-parchment m-0 mb-1 text-2xl font-semibold tracking-[-0.02em]"
        >
          Progress
        </motion.h1>
        <motion.p variants={staggerChild} className="text-ash m-0 mb-7 text-[13.5px]">
          {seen} of {BANK_TOTAL} questions seen ·{" "}
          <span className={cn(health === "at-risk" && "text-flame")}>
            {progress.streakDays} day streak
          </span>{" "}
          · best {progress.bestStreak}
          {health === "at-risk" ? " · drill today to keep it" : ""}
        </motion.p>

        <motion.div
          variants={staggerChild}
          className="bg-line border-line mb-8 grid gap-px overflow-hidden rounded-[9px] border sm:grid-cols-3"
        >
          <Stat value={`${covered}%`} label="bank covered" />
          <Stat value={`${accuracy}%`} label="currently correct" />
          <Stat value={formatDuration(progress.totalMs)} label="total drilling" />
        </motion.div>

        <motion.div variants={staggerChild}>
          <div className="text-slate mb-3 font-mono text-[11px] font-medium tracking-[0.09em]">
            DAILY ACTIVITY
          </div>
          <Heatmap cells={cells} columns={28} className="mb-8" />
        </motion.div>

        <motion.section variants={staggerChild} className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="text-binary-soft font-mono text-[11px] font-medium tracking-[0.09em]">
              BINARY CARDS
            </div>
            <Link href="/binary" className="text-binary-soft hover:text-parchment text-[12px] transition-colors">
              Play a deck →
            </Link>
          </div>
          <div className="border-binary-line bg-binary-deep grid overflow-hidden rounded-[9px] border sm:grid-cols-4">
            <BinaryStat value={`${binary.seenCardIds.length}/${BINARY_BANK_SIZE}`} label="cards seen" />
            <BinaryStat value={`${binaryAccuracy}%`} label="lifetime accuracy" />
            <BinaryStat value={String(binaryDue)} label="due now" />
            <BinaryStat value={String(binary.bestCorrectRun)} label="best correct run" />
          </div>
          {binary.totalAnswers === 0 ? (
            <p className="text-ash mt-3 text-[12.5px]/[1.6]">
              Binary progress stays separate from Classic mastery because true-or-false cards have a different guess rate.
            </p>
          ) : (
            <p className="text-slate mt-3 text-[12px]">
              {binary.totalAnswers} answers · {formatDuration(binary.totalMs)} practiced · {binary.wrongCardIds.length} currently need work
            </p>
          )}
        </motion.section>

        <motion.div variants={staggerChild}>
          <div className="text-slate mb-4 font-mono text-[11px] font-medium tracking-[0.09em]">
            MASTERY BY TOPIC
          </div>
          {seen === 0 ? (
            <p className="text-ash mb-8 text-[13.5px]/[1.7]">
              Nothing drilled yet.{" "}
              <Link href="/drill" className="text-clay underline underline-offset-2">
                Start today&apos;s drill
              </Link>{" "}
              and this fills in.
            </p>
          ) : (
            <div className="mb-8 flex flex-col gap-4">
              {coverage
                .filter((subjectItem) => subjectItem.seen > 0)
                .sort((firstSubject, secondSubject) => firstSubject.mastery - secondSubject.mastery)
                .map((subjectItem, subjectIndex) => (
                  <MasteryBar
                    key={subjectItem.subject}
                    label={
                      <Link
                        href={`/topics/${subjectItem.subject}`}
                        className="hover:text-parchment transition-colors"
                      >
                        {subjectMeta(subjectItem.subject)?.title ?? subjectItem.subject}
                      </Link>
                    }
                    percent={subjectItem.mastery}
                    detail={`${subjectItem.mastery}% · ${subjectItem.correct}/${subjectItem.seen} of ${subjectItem.total}`}
                    delay={0.2 + subjectIndex * 0.05}
                  />
                ))}
            </div>
          )}
        </motion.div>

        {progress.savedQuestionIds.length > 0 ? (
          <motion.p variants={staggerChild} className="text-ash mb-6 text-[13px]">
            <Flame className="mr-1.5 inline size-3.5" />
            {progress.savedQuestionIds.length} question
            {progress.savedQuestionIds.length === 1 ? "" : "s"} saved to review.
          </motion.p>
        ) : null}

        {hydrated && (seen > 0 || binary.totalAnswers > 0) ? (
          <motion.div variants={staggerChild} className="border-line border-t pt-6">
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Erase all progress in this browser? Streak, seen questions and review schedule will be gone. This cannot be undone.",
                  )
                ) {
                  resetAll();
                }
              }}
              className="text-slate hover:text-flame text-[12.5px] transition-colors"
            >
              Erase all progress in this browser
            </button>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}

interface BinaryStatProps {
  value: string;
  label: string;
}

function BinaryStat({ value, label }: Readonly<BinaryStatProps>) {
  return (
    <div className="border-binary-line border-b p-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
      <div className="text-parchment font-mono text-[21px] font-semibold tabular-nums">{value}</div>
      <div className="text-ash mt-1 text-[11.5px]">{label}</div>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: Readonly<StatProps>) {
  return (
    <div className="bg-surface-2 p-4.5">
      <div className="text-parchment font-mono text-[26px] font-semibold tabular-nums">{value}</div>
      <div className="text-ash mt-1.5 text-[12px]">{label}</div>
    </div>
  );
}
