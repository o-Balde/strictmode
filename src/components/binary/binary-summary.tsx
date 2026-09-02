"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Layers3, RotateCcw, X } from "lucide-react";
import { CountUp } from "@/components/meters";
import { StatementText } from "@/components/binary/statement-text";
import { useHydrated } from "@/hooks/use-hydrated";
import { readBinaryResult } from "@/lib/binary";
import { formatDuration } from "@/lib/dates";
import { stagger, staggerChild } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function BinarySummary() {
  const hydrated = useHydrated();
  const result = useMemo(() => (hydrated ? readBinaryResult() : null), [hydrated]);

  if (!hydrated) return <div className="min-h-dvh" />;
  if (!result) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <Layers3 className="text-binary mx-auto mb-4 size-7" />
          <h1 className="text-parchment mb-3 text-xl font-semibold">No Binary deck to summarise.</h1>
          <Link href="/binary" className="text-binary-soft text-sm underline underline-offset-4">
            Draw a deck
          </Link>
        </div>
      </div>
    );
  }

  const correct = result.answers.filter((answer) => answer.correct).length;
  const missed = result.answers.filter((answer) => !answer.correct);
  const cards = new Map(result.cards.map((card) => [card.id, card]));

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-10">
      <motion.main
        variants={stagger(0.055, 0.04)}
        initial="hidden"
        animate="show"
        className="border-binary-line bg-ink w-full max-w-[680px] rounded-2xl border p-6 sm:p-9"
      >
        <motion.div variants={staggerChild} className="mb-5 flex items-center justify-between gap-3">
          <span className="text-binary-soft flex items-center gap-2 font-mono text-[11px] tracking-[0.09em] uppercase">
            <Layers3 className="size-3.5" /> Deck complete
          </span>
          <span className="text-slate font-mono text-[10.5px] tracking-[0.08em] uppercase">{result.difficulty}</span>
        </motion.div>

        <motion.div variants={staggerChild} className="flex items-end gap-3">
          <CountUp value={correct} className="text-binary font-mono text-[68px] leading-none font-bold" />
          <span className="text-shadow mb-1 font-mono text-3xl">/10</span>
        </motion.div>
        <motion.h1 variants={staggerChild} className="text-parchment mt-4 mb-2 text-[25px]/[1.2] font-semibold tracking-[-0.025em]">
          {correct === 10 ? "Clean sweep." : correct >= 7 ? "Strong read." : "Good catches for next time."}
        </motion.h1>
        <motion.p variants={staggerChild} className="text-stone m-0 text-[14px]/[1.6]">
          {formatDuration(result.totalMs)} · {result.countsForDaily ? "daily challenge complete" : "extra practice saved"}
        </motion.p>

        <motion.div variants={staggerChild} className="my-7 flex gap-1.5" aria-label={`${correct} of 10 correct`}>
          {result.answers.map((answer) => (
            <span
              key={answer.cardId}
              className={cn(
                "h-2 flex-1 rounded-full",
                answer.correct ? "bg-mint" : "bg-flame",
              )}
            />
          ))}
        </motion.div>

        {missed.length > 0 ? (
          <motion.section variants={staggerChild} className="border-line bg-surface rounded-xl border p-4 sm:p-5">
            <div className="text-slate mb-4 font-mono text-[10.5px] tracking-[0.09em] uppercase">
              Returning tomorrow
            </div>
            <div className="divide-line flex flex-col divide-y">
              {missed.map((answer) => {
                const card = cards.get(answer.cardId);
                if (!card) return null;
                return (
                  <div key={answer.cardId} className="grid grid-cols-[22px_1fr_auto] gap-3 py-3 first:pt-0 last:pb-0">
                    <X className="text-flame mt-0.5 size-4" aria-hidden />
                    <p className="text-bone m-0 text-[13.5px]/[1.55]">
                      <StatementText text={card.statement} />
                    </p>
                    <span className={cn(
                      "h-fit rounded border px-2 py-1 font-mono text-[10px] font-semibold uppercase",
                      card.truth
                        ? "border-mint-line bg-mint-deep text-mint-soft"
                        : "border-rust-line bg-rust-bg text-salmon",
                    )}>
                      {card.truth ? "True" : "False"}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ) : (
          <motion.div variants={staggerChild} className="border-mint-line bg-mint-deep text-mint-soft mt-7 flex items-center gap-3 rounded-xl border p-4 text-[13.5px]">
            <Check className="size-4" /> Nothing added to tomorrow&apos;s review queue.
          </motion.div>
        )}

        <motion.div variants={staggerChild} className="mt-6 grid gap-2.5 sm:grid-cols-2">
          <Link
            href="/binary"
            className="bg-binary text-ink flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" /> Play another deck
          </Link>
          <Link
            href="/"
            className="border-line-3 text-bone hover:border-line-2 flex min-h-12 items-center justify-center rounded-xl border px-5 text-[14px] font-medium transition-colors"
          >
            Back to today
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
