"use client";

/**
 * End-of-session summary — mockup 1i.
 *
 * The streak lands first, then an honest offer of more. Extra rounds are
 * unlimited but never touch the streak, and the copy says so rather than
 * implying otherwise.
 */
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/meters";
import { readSessionResult, type SessionResult } from "@/lib/session-result";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatDuration } from "@/lib/dates";
import { stagger, staggerChild } from "@/lib/motion";

export function SessionSummary() {
  const router = useRouter();
  const hydrated = useHydrated();
  // sessionStorage is fixed for the life of this page, so reading it once after
  // hydration is stable — no effect, no cascading render.
  const result = useMemo(() => (hydrated ? readSessionResult() : null), [hydrated]);

  if (!hydrated) return <div className="min-h-dvh" />;

  if (!result) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <h1 className="text-parchment mb-3 text-xl font-semibold">No session to summarise.</h1>
          <Link href="/" className="text-clay text-sm underline underline-offset-4">
            Back to today
          </Link>
        </div>
      </div>
    );
  }

  const correct = result.items.filter((i) => i.correct).length;
  const total = result.items.length;
  const wrong = result.items.filter((i) => !i.correct);
  // Anything that took noticeably longer than a quick question is worth a note.
  const slow = [...result.items].sort((a, b) => b.elapsedMs - a.elapsedMs)[0];
  const slowWorthShowing = slow && slow.elapsedMs > 120_000 && slow.correct;

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-10">
      <motion.div
        variants={stagger(0.07, 0.05)}
        initial="hidden"
        animate="show"
        className="border-line bg-ink w-full max-w-[620px] rounded-xl border p-8 text-center sm:p-10"
      >
        <motion.div variants={staggerChild} className="relative">
          {result.countsForStreak ? <Sparks /> : null}
          <div className="mb-2 inline-flex items-baseline gap-2.5">
            <CountUp
              value={correct}
              className="text-flame font-mono text-[64px] leading-none font-bold"
            />
            <span className="text-shadow font-mono text-3xl leading-none">/{total}</span>
          </div>
        </motion.div>

        <motion.h1
          variants={staggerChild}
          className="text-parchment mt-2.5 mb-2 text-2xl font-semibold tracking-[-0.02em] text-balance"
        >
          {headline(result, correct, total)}
        </motion.h1>

        <motion.p variants={staggerChild} className="text-stone mb-7 text-[14.5px]/[1.6]">
          {formatDuration(result.totalMs)}
          {result.countsForStreak
            ? ` · streak now ${result.streak} day${result.streak === 1 ? "" : "s"}.`
            : " · this round doesn't affect your streak."}
        </motion.p>

        <motion.div variants={staggerChild} className="mb-8 flex justify-center gap-[7px]">
          {result.items.map((item, i) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
              title={item.title}
              className={cn(
                "grid size-[34px] place-items-center rounded-[7px] font-mono text-xs font-semibold",
                item.correct ? "bg-mint-deep text-mint-text" : "bg-[#2e1a14] text-flame",
              )}
            >
              {item.correct ? "✓" : "✕"}
            </motion.span>
          ))}
        </motion.div>

        {wrong.length > 0 || slowWorthShowing ? (
          <motion.div
            variants={staggerChild}
            className="border-line bg-surface-3 mb-6 rounded-[9px] border p-5 text-left"
          >
            <div className="text-slate mb-3.5 font-mono text-[11px] font-medium tracking-[0.09em]">
              WORTH A SECOND LOOK
            </div>
            <div className="flex flex-col gap-3.5">
              {wrong.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="text-flame mt-0.5 font-mono text-xs font-semibold">✕</span>
                  <span className="text-bone flex-1 text-[14px]/[1.5]">{item.title}</span>
                  <span className="text-clay shrink-0 font-mono text-xs font-medium">
                    {item.subjectTitle}
                  </span>
                </div>
              ))}
              {slowWorthShowing ? (
                <div className="border-line flex items-start gap-3 border-t pt-3.5">
                  <span className="text-clay mt-0.5 font-mono text-xs">⏱</span>
                  <span className="text-bone flex-1 text-[14px]/[1.5]">
                    {slow.title} took {formatDuration(slow.elapsedMs)}
                  </span>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}

        <motion.div variants={staggerChild} className="flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push("/drill?mode=extra")}
            className="bg-flame text-ink rounded-lg px-4 py-[15px] text-[15px] font-semibold"
          >
            One extra round · 5 min
          </motion.button>
          <Link
            href="/"
            className="border-line-3 text-bone hover:border-line-2 rounded-lg border px-4 py-[15px] text-[14px] font-medium transition-colors"
          >
            Done for today
          </Link>
        </motion.div>

        <motion.p variants={staggerChild} className="text-slate mt-5 text-[12.5px]/[1.6]">
          Extra rounds don&apos;t affect the streak. Come back tomorrow either way.
        </motion.p>
      </motion.div>
    </div>
  );
}

function headline(result: SessionResult, correct: number, total: number): string {
  if (!result.countsForStreak) {
    return correct === total ? "Clean round." : "Round done.";
  }
  if (correct === total) return `Day ${result.dayNumber} done. Perfect run.`;
  return `Day ${result.dayNumber} done. Streak held.`;
}

/** Flame particles behind the score. Decorative only. */
function Sparks() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const sparks = Array.from({ length: 14 }, (_, i) => i);
  return (
    <AnimatePresence>
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        {sparks.map((i) => {
          const angle = (i / sparks.length) * Math.PI * 2;
          const distance = 70 + (i % 4) * 22;
          return (
            <motion.span
              key={i}
              className="bg-flame absolute size-[5px] rounded-full"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: [0.4, 1, 0.2],
              }}
              transition={{ duration: 1.1, delay: 0.25 + (i % 5) * 0.04, ease: "easeOut" }}
            />
          );
        })}
      </div>
    </AnimatePresence>
  );
}
