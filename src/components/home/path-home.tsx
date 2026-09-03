"use client";

/**
 * Mockup 1c — the single-focus alternative home. One decision on screen, with
 * the recent day nodes above it. Calmer than the dashboard and closer to how
 * the app reads on a phone.
 */
import Link from "next/link";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { Brand, HomeVariantToggle, useHomeState } from "@components";
import {
  cn,
  formatCountdown,
  stagger,
  staggerChild,
  type HudCookie,
} from "@lib";

export interface PathHomeProps {
  initialHud: HudCookie | null;
}

export function PathHome({ initialHud }: Readonly<PathHomeProps>) {
  const homeState = useHomeState(initialHud);
  const nodes = [homeState.day - 3, homeState.day - 2, homeState.day - 1, homeState.day, homeState.day + 1].filter((nodeDay) => nodeDay > 0);
  const focus = homeState.focusTitles.slice(0, 2).join(" & ") || "Mixed review";

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-10">
      <div className="border-line bg-ink w-full max-w-140 overflow-hidden rounded-xl border">
        <header className="border-line flex items-center justify-between border-b px-5 py-3.5">
          <Brand href={null} size="sm" />
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-xs font-medium",
              homeState.health === "at-risk" ? "text-flame" : "text-clay",
            )}
          >
            <Flame className="size-3.5" />
            {homeState.streak}
          </span>
        </header>

        <motion.div
          variants={stagger(0.07, 0.05)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center px-8 py-11 text-center sm:px-10"
        >
          <motion.div variants={staggerChild} className="mb-9 flex items-center">
            {nodes.map((nodeDay, nodeIndex) => {
              const isToday = nodeDay === homeState.day;
              const isPast = nodeDay < homeState.day;
              return (
                <div key={nodeDay} className="flex items-center">
                  {nodeIndex > 0 ? (
                    <span
                      className={cn(
                        "h-0.5 w-6.5",
                        nodeDay <= homeState.day ? (isToday ? "bg-flame" : "bg-flame-dim") : "bg-line",
                      )}
                    />
                  ) : null}
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.1 + nodeIndex * 0.07,
                      type: "spring",
                      stiffness: 380,
                      damping: 20,
                    }}
                    className={cn(
                      "grid place-items-center rounded-full font-mono font-semibold",
                      isToday
                        ? "bg-flame text-ink size-11 text-[15px] shadow-[0_0_0_5px_rgba(228,87,46,0.15)]"
                        : isPast
                          ? "bg-flame-dim text-clay size-6.5 text-[11px]"
                          : "border-line-3 text-shadow size-6.5 border border-dashed text-[11px]",
                    )}
                  >
                    {nodeDay}
                  </motion.span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            variants={staggerChild}
            className={cn(
              "mb-3 font-mono text-[11px] font-medium tracking-widest",
              homeState.doneToday ? "text-mint" : "text-flame",
            )}
          >
            {homeState.doneToday ? "TODAY: DONE" : "TODAY'S DRILL"}
          </motion.div>

          <motion.h1
            variants={staggerChild}
            className="text-parchment m-0 mb-3 text-[26px]/[1.15] font-semibold tracking-tight text-balance sm:text-[30px]/[1.15]"
          >
            {homeState.doneToday ? "Come back tomorrow." : focus}
          </motion.h1>

          <motion.p
            variants={staggerChild}
            className="text-stone m-0 mb-8 max-w-[26em] text-[14.5px]/[1.65] text-pretty"
          >
            {homeState.doneToday ? (
              <>
                Next daily drill unlocks in{" "}
                <span className="text-peach font-mono tabular-nums">
                  {formatCountdown(homeState.msLeft)}
                </span>
                . Free play is always open.
              </>
            ) : (
              <>
                {homeState.drill?.rows.length ?? 5} items, about {homeState.drill?.estimatedMinutes ?? 10} minutes.{" "}
                {homeState.drill?.recycled
                  ? "You've seen these before — they're coming back around."
                  : "New material only — we skip anything you've already answered."}
              </>
            )}
          </motion.p>

          <motion.div variants={staggerChild} className="mb-8 flex gap-1.5">
            {Array.from({ length: homeState.drill?.rows.length ?? 5 }, (_, segmentIndex) => (
              <motion.span
                key={segmentIndex}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + segmentIndex * 0.05 }}
                className={cn(
                  "h-1.25 w-11 origin-left rounded-[3px]",
                  homeState.doneToday ? "bg-mint" : "bg-line",
                )}
              />
            ))}
          </motion.div>

          <motion.div variants={staggerChild} className="w-full">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href={homeState.doneToday ? "/drill?mode=extra" : "/drill"}
                  className="bg-flame text-ink flex min-h-14.5 items-center justify-center rounded-[9px] px-3 text-center text-sm font-semibold"
                >
                  Classic · 5 questions
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/binary"
                  className="bg-binary text-ink flex min-h-14.5 items-center justify-center rounded-[9px] px-3 text-center text-sm font-semibold"
                >
                  Binary · 10 cards
                </Link>
              </motion.div>
            </div>
            <div className="text-ash mt-3.5 text-[13px]">
              or{" "}
              <Link href="/topics" className="text-clay underline underline-offset-2">
                pick a topic yourself
              </Link>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 w-full max-w-60">
            <HomeVariantToggle current="path" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
