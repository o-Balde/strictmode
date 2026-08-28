"use client";

/**
 * Mockup 1b — the command-line dashboard. Today's queue is visible on the
 * left, weak spots and the twelve-week heatmap on the right. At narrow widths
 * this collapses to 1m: one column, primary action within thumb reach.
 */
import Link from "next/link";
import { motion } from "motion/react";
import { Flame, Shuffle } from "lucide-react";
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
                Day {s.day} · {s.drill?.rows.length ?? 5} items, about{" "}
                {s.drill?.estimatedMinutes ?? 10} minutes
              </motion.h1>
              <motion.p variants={staggerChild} className="text-stone m-0 mb-7 text-[14.5px]/[1.6]">
                {s.weakest.length > 0
                  ? `${s.weakest.map((w) => w.title).join(" and ")} ${s.weakest.length === 1 ? "is" : "are"} due for review. `
                  : `${s.focusTitles.slice(0, 2).join(" and ") || "A mix of topics"} today. `}
                {s.drill?.recycled
                  ? "You've seen everything here before — these are coming back around."
                  : "Nothing here repeats what you've already answered."}
              </motion.p>
            </>
          )}

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
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={s.doneToday ? "/drill?mode=extra" : "/drill"}
                className="bg-flame text-ink inline-block rounded-lg px-7 py-[15px] text-[15px] font-semibold"
              >
                {s.doneToday ? "One extra round →" : "Start →"}
              </Link>
            </motion.div>
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
