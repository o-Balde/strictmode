"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Copy, Layers3, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";
import { CountUp, StatementText } from "@components";
import { useHydrated } from "@hooks";
import type { BinaryAnswer, BinaryCardPayload } from "@data";
import {
  cn,
  copyToClipboard,
  formatBinaryCardPrompt,
  formatBinaryCardsListPrompt,
  formatDuration,
  readBinaryResult,
  stagger,
  staggerChild,
} from "@lib";

export function BinarySummary() {
  const hydrated = useHydrated();
  const result = useMemo(() => (hydrated ? readBinaryResult() : null), [hydrated]);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const cards = useMemo(
    () => (result ? new Map(result.cards.map((card) => [card.id, card])) : new Map<string, BinaryCardPayload>()),
    [result],
  );
  const missed = useMemo(
    () => (result ? result.answers.filter((answer) => !answer.correct) : []),
    [result],
  );

  const handleCopySingle = useCallback(async (card: BinaryCardPayload, answer: BinaryAnswer) => {
    const prompt = formatBinaryCardPrompt(card, answer);
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopiedCardId(card.id);
      toast.success("Copied question for AI explanation");
      window.setTimeout(() => setCopiedCardId(null), 2000);
    } else {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

  const handleCopyAllMissed = useCallback(async () => {
    const missedCards = missed
      .map((answer) => cards.get(answer.cardId))
      .filter((cardCandidate): cardCandidate is BinaryCardPayload => Boolean(cardCandidate));
    if (missedCards.length === 0) return;
    const prompt = formatBinaryCardsListPrompt(missedCards);
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopiedAll(true);
      toast.success(`Copied ${missedCards.length} missed questions for AI`);
      window.setTimeout(() => setCopiedAll(false), 2000);
    } else {
      toast.error("Failed to copy to clipboard");
    }
  }, [missed, cards]);

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

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-10">
      <motion.main
        variants={stagger(0.055, 0.04)}
        initial="hidden"
        animate="show"
        className="border-binary-line bg-ink w-full max-w-170 rounded-2xl border p-6 sm:p-9"
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
        <motion.p variants={staggerChild} className="text-stone m-0 text-sm/[1.6]">
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
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="text-slate font-mono text-[10.5px] tracking-[0.09em] uppercase">
                Returning tomorrow ({missed.length})
              </div>
              <button
                type="button"
                onClick={handleCopyAllMissed}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase transition-all",
                  copiedAll
                    ? "border-mint-line bg-mint-deep text-mint-soft"
                    : "border-line-3 bg-surface-3 text-ash hover:border-line-2 hover:text-bone active:scale-95",
                )}
                title="Copy all missed questions formatted for AI explanation"
              >
                {copiedAll ? <Check className="size-3 text-mint" /> : <Copy className="size-3" />}
                <span>{copiedAll ? "Copied all" : "Copy all missed for AI explanation"}</span>
              </button>
            </div>
            <div className="divide-line flex flex-col divide-y">
              {missed.map((answer) => {
                const card = cards.get(answer.cardId);
                if (!card) return null;
                return (
                  <div key={answer.cardId} className="grid grid-cols-[22px_1fr_auto] items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <X className="text-flame mt-0.5 size-4 shrink-0" aria-hidden />
                    <p className="text-bone m-0 text-[13.5px]/[1.55] select-text">
                      <StatementText text={card.statement} />
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopySingle(card, answer)}
                        className={cn(
                          "rounded border p-1 text-ash transition-all",
                          copiedCardId === card.id
                            ? "border-mint-line bg-mint-deep text-mint-soft"
                            : "border-line-3 bg-surface-3 hover:border-line-2 hover:text-bone active:scale-95",
                        )}
                        title="Copy prompt for AI explanation"
                        aria-label="Copy prompt for AI explanation"
                      >
                        {copiedCardId === card.id ? (
                          <Check className="size-3 text-mint" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                      <span className={cn(
                        "h-fit rounded border px-2 py-1 font-mono text-[10px] font-semibold uppercase",
                        card.truth
                          ? "border-mint-line bg-mint-deep text-mint-soft"
                          : "border-rust-line bg-rust-bg text-salmon",
                      )}>
                        {card.truth ? "True" : "False"}
                      </span>
                    </div>
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
            className="bg-binary text-ink flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" /> Play another deck
          </Link>
          <Link
            href="/"
            className="border-line-3 text-bone hover:border-line-2 flex min-h-12 items-center justify-center rounded-xl border px-5 text-sm font-medium transition-colors"
          >
            Back to today
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
