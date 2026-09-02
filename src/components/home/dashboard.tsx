"use client";

/**
 * Mockup 1b — the command-line dashboard. Today's queue is visible on the
 * left, weak spots and the twelve-week heatmap on the right. At narrow widths
 * this collapses to 1m: one column, primary action within thumb reach.
 */
import Link from "next/link";
import { motion } from "motion/react";
import { Flame, Layers3, ListChecks, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/brand";
import { Heatmap, HeatmapAxis, buildCells } from "@/components/heatmap";
import { MasteryBar } from "@/components/meters";
import { ProgressTransfer } from "@/components/home/progress-transfer";
import { HomeVariantToggle } from "@/components/home/home-variant-toggle";
import { useHomeState } from "@/components/home/use-home-state";
import type { HudCookie } from "@/lib/progress";
import { formatCountdown } from "@/lib/dates";
import { stagger, staggerChild } from "@/lib/motion";

export function Dashboard({ initialHud }: { initialHud: HudCookie | null }) {
  const s = useHomeState(initialHud);
  const cells = buildCells(s.progress.activityHeatmap ?? {}, 84);

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-5 py-3.5 sm:px-6">
        <Brand href={null} size="sm" />
        <nav className="flex items-center gap-4 sm:gap-[18px]">
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-xs font-medium",
              s.health === "at-risk" ? "text-flame" : "text-clay",
            )}
            title={s.health === "at-risk" ? "Drill today to keep the streak" : undefined}
          >
            <Flame className="size-3.5" />
            {s.streak} day streak
          </span>
          <Link href="/topics" className="text-ash hover:text-bone text-[12.5px] transition-colors">
            Topics
          </Link>
          <Link href="/progress" className="text-ash hover:text-bone text-[12.5px] transition-colors">
            Progress
          </Link>
        </nav>
      </header>

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <motion.section
          variants={stagger(0.06, 0.05)}
          initial="hidden"
          animate="show"
          className="border-line min-w-0 px-6 py-10 sm:px-11 sm:py-11 lg:border-r"
        >
          <motion.div variants={staggerChild} className="text-slate mb-1.5 font-mono text-[13px]">
            <span className="text-flame">$</span> drill --today
          </motion.div>

          {s.doneToday ? (
            <NothingDue msLeft={s.msLeft} />
          ) : (
            <>
              <motion.h1
                variants={staggerChild}
                className="text-parchment m-0 mb-1.5 text-[28px]/[1.15] font-semibold tracking-[-0.025em] text-balance sm:text-[34px]/[1.15]"
              >
                Day {s.day} · choose today&apos;s format
              </motion.h1>
              <motion.p variants={staggerChild} className="text-stone m-0 mb-7 text-[14.5px]/[1.6]">
                Take the five-question Classic drill or a ten-card Binary deck. Finishing either one holds today&apos;s streak; the other stays open for extra practice.
              </motion.p>
            </>
          )}

          <motion.div variants={staggerChild} className="mb-7 grid gap-3 sm:grid-cols-2">
            <Link
              href={s.doneToday ? "/drill?mode=extra" : "/drill"}
              className="border-line-3 bg-surface hover:border-flame group rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:ring-flame focus-visible:outline-none"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="bg-flame-deep text-clay grid size-9 place-items-center rounded-lg">
                  <ListChecks className="size-4" />
                </span>
                <span className="text-slate font-mono text-[10px] tracking-[0.08em] uppercase">5 questions · ~10 min</span>
              </div>
              <div className="text-parchment text-[17px] font-semibold">Classic Drill</div>
              <p className="text-ash mt-1.5 mb-4 text-[12.5px]/[1.55]">Multiple choice, code output, and fixes.</p>
              <span className="text-flame text-[13px] font-semibold group-hover:underline group-hover:underline-offset-4">
                {s.doneToday ? "Extra classic round →" : "Choose Classic →"}
              </span>
            </Link>
            <Link
              href="/binary"
              className="border-binary-line bg-binary-deep group rounded-xl border p-5 transition-colors hover:border-binary focus-visible:ring-2 focus-visible:ring-binary focus-visible:outline-none"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="bg-binary text-ink grid size-9 place-items-center rounded-lg">
                  <Layers3 className="size-4" />
                </span>
                <span className="text-slate font-mono text-[10px] tracking-[0.08em] uppercase">10 cards · ~3 min</span>
              </div>
              <div className="text-parchment text-[17px] font-semibold">Binary Cards</div>
              <p className="text-ash mt-1.5 mb-4 text-[12.5px]/[1.55]">Swipe true or false. Misses return later.</p>
              <span className="text-binary-soft text-[13px] font-semibold group-hover:underline group-hover:underline-offset-4">
                {s.doneToday ? "Extra Binary deck →" : "Choose Binary →"}
              </span>
            </Link>
          </motion.div>

          <motion.div variants={staggerChild} className="text-slate mb-3 font-mono text-[10.5px] tracking-[0.08em] uppercase">
            Classic queue preview
          </motion.div>
          <motion.ol
            variants={stagger(0.05, 0.15)}
            className="bg-line border-line mb-7 grid gap-px overflow-hidden rounded-[9px] border"
          >
            {s.queueLoading
              ? Array.from({ length: 5 }, (_, i) => (
                  <li key={i} className="bg-surface h-[54px] animate-pulse" />
                ))
              : s.queue.map((item, i) => (
                  <motion.li
                    key={item.id}
                    variants={staggerChild}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4",
                      i === 0 ? "bg-surface-3" : "bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[22px] shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold",
                        i === 0
                          ? "bg-flame text-ink"
                          : "border-line-3 text-ash border",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[14.5px] font-medium",
                        i === 0 ? "text-paper" : "text-bone",
                      )}
                      title={item.title}
                    >
                      {item.title}
                    </span>
                    <span className="text-ash hidden shrink-0 font-mono text-[11px] font-medium tracking-[0.05em] sm:block">
                      {item.label} · {item.minutes} MIN
                    </span>
                  </motion.li>
                ))}
          </motion.ol>

          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/topics"
              className="border-line-3 text-bone hover:border-line-2 flex items-center gap-2 rounded-lg border px-5 py-[15px] text-[14px] font-medium transition-colors"
            >
              <Shuffle className="size-3.5" />
              Pick a topic
            </Link>
            <span className="text-slate hidden text-[12.5px] lg:block">
              A–D to answer · Enter to continue
            </span>
          </motion.div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-line min-w-0 border-t px-6 py-10 sm:px-7 lg:border-t-0"
        >
          <div className="text-slate mb-3.5 font-mono text-[11px] font-medium tracking-[0.09em]">
            LAST 12 WEEKS
          </div>
          <Heatmap cells={cells} columns={12} className="mb-3" />
          <HeatmapAxis cells={cells} className="mb-8" />

          <div className="text-slate mb-3.5 font-mono text-[11px] font-medium tracking-[0.09em]">
            WEAKEST TOPICS
          </div>
          {s.weakest.length > 0 ? (
            <div className="mb-8 flex flex-col gap-4">
              {s.weakest.map((w, i) => (
                <MasteryBar
                  key={w.subject}
                  label={w.title}
                  percent={w.mastery}
                  detail={`${w.mastery}%`}
                  thickness={4}
                  delay={0.3 + i * 0.08}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate mb-8 text-[12.5px]/[1.6]">
              Answer a few more questions and the topics you keep missing will show up here.
            </p>
          )}

          <HomeVariantToggle current="dashboard" className="mb-4" />
          <ProgressTransfer />
        </motion.aside>
      </div>
    </div>
  );
}

/** Mockup 1l, second card — the daily drill is done for today. */
function NothingDue({ msLeft }: { msLeft: number }) {
  return (
    <motion.div variants={staggerChild} className="mb-7">
      <div className="text-mint mb-3 font-mono text-[11px] font-medium tracking-[0.1em]">
        TODAY: DONE
      </div>
      <h1 className="text-parchment m-0 mb-2.5 text-[26px]/[1.15] font-semibold tracking-[-0.025em] text-balance sm:text-[32px]/[1.15]">
        Nothing due. Come back tomorrow.
      </h1>
      <p className="text-stone m-0 text-[14.5px]/[1.65]">
        Next daily drill unlocks in{" "}
        <span className="text-peach font-mono tabular-nums">{formatCountdown(msLeft)}</span>. Extra
        rounds and free play are always open — they just don&apos;t touch the streak.
      </p>
    </motion.div>
  );
}
