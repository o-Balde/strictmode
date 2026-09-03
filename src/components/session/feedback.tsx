"use client";

/**
 * Post-answer feedback — mockup 1g (correct) and 1h (wrong).
 *
 * The explanation is the reward, not the score, so it leads. The wrong state
 * names the misconception rather than scolding, and says plainly that the
 * question is coming back.
 *
 * The mockup's 1h shows a red/green diff of the fix; the bank carries no diff
 * data for any question, so that panel is replaced by the option-level
 * explanation and the recorded misconception, both of which are populated for
 * all 691 questions.
 */
import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Star } from "lucide-react";
import { toast } from "sonner";
import { CodeWell, OptionText } from "@components";
import {
  cn,
  copyToClipboard,
  formatQuestionPrompt,
  stagger,
  staggerChild,
  type QuestionPayload,
} from "@lib";

export interface FeedbackProps {
  question: QuestionPayload;
  selected: string | null;
  correct: boolean;
  streak: number;
  saved: boolean;
  onToggleSave: () => void;
  onNext: () => void;
  isLast: boolean;
}

export function Feedback({
  question,
  selected,
  correct,
  streak,
  saved,
  onToggleSave,
  onNext,
  isLast,
}: Readonly<FeedbackProps>) {
  const chosen = question.options.find((option) => option.id === selected);
  const answer = question.options.find((option) => option.id === question.correctAnswer);
  const [copied, setCopied] = useState(false);

  const handleCopyForAI = useCallback(async () => {
    const prompt = formatQuestionPrompt(question, selected);
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopied(true);
      toast.success("Copied question for AI explanation");
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy to clipboard");
    }
  }, [question, selected]);

  return (
    <div className="border-line border-t">
      {/* The 4px wipe that colours the whole result. */}
      <motion.div
        className={cn("h-1 origin-left", correct ? "bg-mint" : "bg-flame")}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        variants={stagger(0.05, 0.08)}
        initial="hidden"
        animate="show"
        className="px-6 py-7 sm:px-10 sm:py-8"
      >
        <motion.div variants={staggerChild} className="mb-5 flex items-center gap-3">
          <motion.span
            initial={{ scale: 0.4, rotate: correct ? -20 : 20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className={cn(
              "grid size-6.5 shrink-0 place-items-center rounded-full font-mono text-[13px] font-bold",
              correct ? "bg-mint text-[#0f1a13]" : "bg-flame text-ink",
            )}
          >
            {correct ? "✓" : "✕"}
          </motion.span>
          <span
            className={cn(
              "text-[17px] font-semibold text-balance",
              correct ? "text-mint-soft" : "text-salmon",
            )}
          >
            {correct ? "Right — and for the right reason." : "Not quite — this one trips almost everyone."}
          </span>
          {correct && streak > 1 ? (
            <span className="text-slate ml-auto hidden shrink-0 font-mono text-xs font-medium sm:block">
              +1 · {streak} in a row
            </span>
          ) : null}
        </motion.div>

        {!correct ? (
          <motion.div variants={staggerChild} className="mb-5 grid gap-3 sm:grid-cols-2">
            <div className="border-rust-line bg-rust-bg rounded-lg border p-4">
              <div className="text-rust mb-2 font-mono text-[10.5px] font-medium tracking-[0.08em]">
                YOU PICKED
              </div>
              <div className="text-paper text-[13.5px]/[1.6] wrap-break-word" style={{ overflowWrap: "anywhere" }}>
                {chosen ? <><span className="font-mono">{chosen.id} · </span><OptionText text={chosen.text} terminal={false} /></> : "Skipped"}
              </div>
            </div>
            <div className="border-mint-line rounded-lg border bg-[#131a15] p-4">
              <div className="text-mint-text mb-2 font-mono text-[10.5px] font-medium tracking-[0.08em]">
                ANSWER
              </div>
              <div className="text-paper text-[13.5px]/[1.6] wrap-break-word" style={{ overflowWrap: "anywhere" }}>
                {answer ? <><span className="font-mono">{answer.id} · </span><OptionText text={answer.text} terminal={false} /></> : "—"}
              </div>
            </div>
          </motion.div>
        ) : null}

        <motion.div variants={staggerChild}>
          <div className="text-slate mb-2.5 font-mono text-[11px] font-medium tracking-[0.09em]">
            WHY
          </div>
          <p className="text-bone mb-5 text-[15px]/[1.75] text-pretty">
            {question.explanation}
          </p>
        </motion.div>

        {!correct && chosen?.explanation ? (
          <motion.p
            variants={staggerChild}
            className="text-ash mb-5 text-sm/[1.7] text-pretty"
          >
            <span className="text-rust font-medium">Why {chosen.id} is wrong: </span>
            {chosen.explanation}
          </motion.p>
        ) : null}

        {question.codeSnippet ? (
          <motion.div variants={staggerChild} className="mb-5">
            <CodeWell html={question.codeHtml} code={question.codeSnippet} fontSize={14} />
          </motion.div>
        ) : null}

        {question.misconception ? (
          <motion.div
            variants={staggerChild}
            className="bg-surface-3 border-flame mb-5 rounded-r-lg border-l-2 p-4"
          >
            <p className="text-bone text-sm/[1.7] text-pretty">
              <strong className="text-peach font-semibold">The trap: </strong>
              {question.misconception}
            </p>
          </motion.div>
        ) : null}

        {question.interviewLine ? (
          <motion.div
            variants={staggerChild}
            className="bg-surface-3 border-flame mb-6 rounded-r-lg border-l-2 p-4"
          >
            <p className="text-bone text-sm/[1.7] text-pretty">
              <strong className="text-peach font-semibold">Interview line: </strong>
              {question.interviewLine}
            </p>
          </motion.div>
        ) : null}

        <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-3.5">
          <motion.button
            type="button"
            onClick={onNext}
            autoFocus
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-flame text-ink focus-visible:ring-flame rounded-lg px-7.5 py-3.25 text-[14.5px] font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] focus-visible:outline-none"
          >
            {isLast ? "Finish ↵" : "Next ↵"}
          </motion.button>
          <button
            type="button"
            onClick={onToggleSave}
            className={cn(
              "border-line-3 flex items-center gap-2 rounded-lg border px-4.5 py-3.25 text-[13.5px] font-medium transition-colors",
              saved ? "text-clay border-clay" : "text-bone hover:border-line-2",
            )}
          >
            <Star className={cn("size-3.5", saved && "fill-clay")} />
            {saved ? "Saved" : "Save to review"}
          </button>
          <button
            type="button"
            data-copy-prompt
            onClick={handleCopyForAI}
            className={cn(
              "border-line-3 flex items-center gap-2 rounded-lg border px-4.5 py-3.25 text-[13.5px] font-medium transition-all",
              copied
                ? "border-mint-line bg-mint-deep text-mint-soft"
                : "text-bone hover:border-line-2 active:scale-95",
            )}
            title="Copy prompt for AI explanation (Press C)"
          >
            {copied ? <Check className="size-3.5 text-mint" /> : <Copy className="size-3.5" />}
            <span>{copied ? "Copied for AI explanation" : "Copy for AI explanation"}</span>
          </button>
          {!correct ? (
            <span className="text-ash text-[13px]">
              Back in the queue — you&apos;ll see it again tomorrow.
            </span>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
