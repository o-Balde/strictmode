"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Check, X } from "lucide-react";
import type { BinaryAnswer, BinaryCardPayload, BinaryChoice } from "@/data/binary-types";
import { CodeWell } from "@/components/code-well";
import { StatementText } from "@/components/binary/statement-text";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 92;

export function BinaryCardStack({
  cards,
  index,
  showingExplanation,
  lastAnswer,
  onAnswer,
  onContinue,
}: {
  cards: BinaryCardPayload[];
  index: number;
  showingExplanation: boolean;
  lastAnswer?: BinaryAnswer | null;
  onAnswer: (choice: BinaryChoice) => void;
  onContinue: () => void;
}) {
  const current = cards[index];
  if (!current) return null;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-[min(61dvh,570px)] min-h-[480px] w-full max-w-[660px] [perspective:1400px] sm:min-h-[520px]">
        {[2, 1].map((depth) => {
          const card = cards[index + depth];
          if (!card) return null;
          return (
            <div
              key={card.id}
              aria-hidden
              className="border-binary-line bg-surface absolute inset-x-3 top-0 bottom-0 rounded-[18px] border"
              style={{
                transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.035})`,
                opacity: 1 - depth * 0.23,
              }}
            />
          );
        })}
        <SwipeCard
          key={current.id}
          card={current}
          showingExplanation={showingExplanation}
          lastAnswer={lastAnswer}
          onAnswer={onAnswer}
          onContinue={onContinue}
        />
      </div>

      <div className="mt-7 grid w-full max-w-[660px] grid-cols-[1fr_auto_1fr] items-center gap-2.5 sm:gap-4">
        {showingExplanation ? (
          <button
            type="button"
            onClick={onContinue}
            className="bg-binary text-ink col-span-3 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-binary focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
          >
            <span>Continue</span>
            <kbd className="inline-flex items-center justify-center rounded border border-ink/25 px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none">
              Enter ↵
            </kbd>
          </button>
        ) : (
          <>
            <AnswerButton
              label="False"
              keySymbol="←"
              tone="false"
              onClick={() => onAnswer(false)}
            />
            <button
              type="button"
              onClick={() => onAnswer(null)}
              aria-label="I don't know (Down Arrow)"
              title="I don't know (Down Arrow)"
              className="border-line-3 bg-surface-2 text-ash hover:border-binary-line hover:text-bone grid size-12 place-items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-binary focus-visible:outline-none"
            >
              <kbd className="font-mono text-sm leading-none">↓</kbd>
              <span className="sr-only">I don&apos;t know, Arrow Down</span>
            </button>
            <AnswerButton
              label="True"
              keySymbol="→"
              tone="true"
              onClick={() => onAnswer(true)}
            />
          </>
        )}
      </div>
      {!showingExplanation ? (
        <p className="text-slate mt-3 text-center text-[11.5px]">
          Swipe or use the arrow keys · <span className="text-ash">↓ means I don&apos;t know</span>
        </p>
      ) : null}
    </div>
  );
}

function SwipeCard({
  card,
  showingExplanation,
  lastAnswer,
  onAnswer,
  onContinue,
}: {
  card: BinaryCardPayload;
  showingExplanation: boolean;
  lastAnswer?: BinaryAnswer | null;
  onAnswer: (choice: BinaryChoice) => void;
  onContinue: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 0, 180], [-8, 0, 8]);
  const falseOpacity = useTransform(x, [-110, -25, 0], [1, 0.25, 0]);
  const trueOpacity = useTransform(x, [0, 25, 110], [0, 0.25, 1]);
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.article
      className="absolute inset-0 z-10 touch-pan-y select-none"
      style={{ x, rotate }}
      drag={!showingExplanation ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.68}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) < SWIPE_THRESHOLD && Math.abs(info.velocity.x) < 650) return;
        onAnswer(info.offset.x > 0 || info.velocity.x > 0);
      }}
      whileDrag={reduced ? undefined : { scale: 1.012 }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: showingExplanation ? 180 : 0 }}
        transition={{ duration: reduced ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardFace card={card} falseOpacity={falseOpacity} trueOpacity={trueOpacity} />
        <CardBack card={card} lastAnswer={lastAnswer} onContinue={onContinue} />
      </motion.div>
    </motion.article>
  );
}

function CardFace({
  card,
  falseOpacity,
  trueOpacity,
}: {
  card: BinaryCardPayload;
  falseOpacity: ReturnType<typeof useTransform<number, number>>;
  trueOpacity: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className="border-binary-line bg-surface-2 absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border p-5 shadow-[0_24px_70px_rgb(0_0_0/0.34)] [backface-visibility:hidden] sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="border-binary-line bg-binary-deep text-binary-soft rounded-md border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] uppercase">
          {card.category}
        </span>
        <span className="text-slate font-mono text-[10.5px] tracking-[0.08em] uppercase">
          {card.level}
        </span>
      </div>

      <div className="scrollbar-hairline flex min-h-0 flex-1 flex-col justify-center overflow-y-auto py-2">
        <p
          className={cn(
            "text-parchment m-0 text-balance font-semibold tracking-[-0.025em]",
            card.codeSnippet ? "text-[21px]/[1.35] sm:text-[25px]/[1.35]" : "text-[26px]/[1.3] sm:text-[32px]/[1.28]",
          )}
        >
          <StatementText text={card.statement} />
        </p>
        {card.codeSnippet ? (
          <CodeWell
            html={card.codeHtml}
            code={card.codeSnippet}
            className="mt-6 shrink-0"
            fontSize={12.5}
          />
        ) : null}
      </div>

      <div className="text-slate mt-5 flex items-center justify-between font-mono text-[10.5px] tracking-[0.07em] uppercase">
        <span>← False</span>
        <span>True →</span>
      </div>

      {/* Full-card paint overlay when sliding left (FALSE) */}
      <motion.div
        aria-hidden
        style={{ opacity: falseOpacity }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[18px] border-2 border-rust-line bg-gradient-to-b from-[#3a1915]/95 via-[#2a1311]/95 to-[#190a09]/95 p-6 backdrop-blur-xs"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="border-rust-line bg-rust-bg/90 rounded-2xl border-2 px-8 py-3.5 shadow-[0_0_45px_rgba(228,87,46,0.35)]">
            <span className="font-mono text-4xl font-black tracking-[0.2em] text-salmon sm:text-5xl">
              FALSE
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold tracking-widest text-salmon/80 uppercase">
            Release to commit False
          </span>
        </div>
      </motion.div>

      {/* Full-card paint overlay when sliding right (TRUE) */}
      <motion.div
        aria-hidden
        style={{ opacity: trueOpacity }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[18px] border-2 border-mint-line bg-gradient-to-b from-[#183623]/95 via-[#12281b]/95 to-[#0b1a11]/95 p-6 backdrop-blur-xs"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="border-mint-line bg-mint-deep/90 rounded-2xl border-2 px-8 py-3.5 shadow-[0_0_45px_rgba(79,180,119,0.35)]">
            <span className="font-mono text-4xl font-black tracking-[0.2em] text-mint-soft sm:text-5xl">
              TRUE
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold tracking-widest text-mint-soft/80 uppercase">
            Release to commit True
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function CardBack({
  card,
  lastAnswer,
  onContinue,
}: {
  card: BinaryCardPayload;
  lastAnswer?: BinaryAnswer | null;
  onContinue: () => void;
}) {
  const isCorrect = lastAnswer?.correct;
  const isSkipped = lastAnswer?.choice === null;

  return (
    <div
      className={cn(
        "bg-surface-2 absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border p-6 shadow-[0_24px_70px_rgb(0_0_0/0.34)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9",
        isCorrect ? "border-mint-line" : isSkipped ? "border-line-3" : "border-rust-line",
      )}
      onDoubleClick={onContinue}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        {isCorrect ? (
          <span className="border-mint-line bg-mint-deep text-mint-soft flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase">
            <Check className="size-3.5" /> Correct
          </span>
        ) : isSkipped ? (
          <span className="border-line-3 bg-surface-3 text-ash flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase">
            Skipped
          </span>
        ) : (
          <span className="border-rust-line bg-rust-bg text-salmon flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase">
            <X className="size-3.5" /> Missed · Review
          </span>
        )}
        <span
          className={cn(
            "rounded-md border px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase",
            card.truth
              ? "border-mint-line bg-mint-deep text-mint-soft"
              : "border-rust-line bg-rust-bg text-salmon",
          )}
        >
          {card.truth ? "Truth: True" : "Truth: False"}
        </span>
      </div>

      <div className="scrollbar-hairline min-h-0 flex-1 overflow-y-auto">
        <p className="text-bone m-0 mb-4 text-[16px]/[1.6] font-medium text-pretty sm:text-[18px]/[1.6]">
          <StatementText text={card.statement} />
        </p>
        {card.codeSnippet ? (
          <CodeWell
            html={card.codeHtml}
            code={card.codeSnippet}
            className="mb-5 shrink-0"
            fontSize={12}
          />
        ) : null}
        <div className="bg-binary-deep border-binary-line rounded-xl border p-5 sm:p-6">
          <div className="text-binary-soft mb-2.5 font-mono text-[10.5px] tracking-[0.09em] uppercase">
            Why
          </div>
          <p className="text-paper m-0 text-[15px]/[1.75] text-pretty">
            <StatementText text={card.explanation} />
          </p>
        </div>
      </div>
      <p className="text-slate m-0 mt-5 text-center text-[11.5px]">Enter or continue button to proceed</p>
    </div>
  );
}

function AnswerButton({
  label,
  keySymbol,
  tone,
  disabled = false,
  onClick,
}: {
  label: string;
  keySymbol: string;
  tone: "false" | "true";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none disabled:translate-y-0 disabled:opacity-40",
        tone === "false"
          ? "border-rust-line bg-rust-bg text-salmon focus-visible:ring-rust"
          : "border-mint-line bg-mint-deep text-mint-soft focus-visible:ring-mint",
      )}
    >
      <span>{label}</span>
      <kbd className="inline-flex items-center justify-center rounded border border-current/25 px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none">
        {keySymbol}
      </kbd>
    </button>
  );
}
