"use client";

/**
 * The in-session question — mockup 1d (multiple choice), 1e (output
 * prediction, terminal skin) and 1f (live code, where the snippet is the hero).
 *
 * Every question in the bank is four-option multiple choice, so the format is
 * shared; what changes per type is the chrome and how much room the code gets.
 */
import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { QuestionPayload } from "@/lib/question-payload";
import { CodeWell } from "@/components/code-well";
import { TypeBadge, typeLabel } from "@/components/chrome";
import { stagger, staggerChild } from "@/lib/motion";
import { isTerminalOption, optionsAreTerminal } from "@/lib/terminal";
import { OptionText } from "@/components/option-text";
import { copyToClipboard, formatQuestionPrompt } from "@/lib/ai-prompt";

const LETTERS = ["A", "B", "C", "D"] as const;

/** Names a surface so "source code" and "console output" are never confused. */
function SurfaceLabel({
  tone,
  children,
}: {
  tone: "code" | "stdout";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-1.5 flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.12em] uppercase",
        tone === "stdout" ? "text-[#28fe14]/70" : "text-slate",
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-3", tone === "stdout" ? "bg-[#28fe14]/40" : "bg-line-3")}
      />
      {children}
    </div>
  );
}

export function QuestionView({
  question,
  selected,
  answered,
  onSelect,
}: {
  question: QuestionPayload;
  selected: string | null;
  answered: boolean;
  onSelect: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const codeIsHero = question.type === "live_code" || question.type === "fix";

  const handleCopyPrompt = async () => {
    try {
      const prompt = formatQuestionPrompt(question, selected);
      const ok = await copyToClipboard(prompt);
      if (ok) {
        setCopied(true);
        toast.success("Prompt copied for AI explanation");
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error("Failed to copy to clipboard");
      }
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  // Presentation policy is decided here, not baked into the payload — a change
  // to the skin rule is a client change, not a cache invalidation.
  const optionTexts = question.options.map((o) => o.text);
  const terminalOptions = optionsAreTerminal(optionTexts, question.type);

  // Short console transcripts read best as a 2x2 grid, the way the mockup lays
  // out its output-prediction answers.
  const gridOptions = terminalOptions && optionTexts.every((t) => t.length <= 40);

  return (
    <div className={cn("px-6 py-8 sm:px-10 sm:py-9")}>
      <motion.div variants={stagger(0.05)} initial="hidden" animate="show">
        <motion.div variants={staggerChild} className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge tone="accent">{typeLabel(question.type)}</TypeBadge>
            <TypeBadge>{question.category.replace("_", " ")}</TypeBadge>
            <TypeBadge>{question.subjectTitle}</TypeBadge>
          </div>
          <button
            type="button"
            data-copy-prompt
            onClick={handleCopyPrompt}
            className={cn(
              "border-line-3 text-ash hover:text-bone hover:border-line flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
              copied && "border-mint-line bg-mint-deep text-mint-soft",
            )}
            title="Copy prompt for AI explanation (Press C)"
          >
            {copied ? <Check className="size-3 text-mint" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied" : "Copy for AI explanation"}</span>
          </button>
        </motion.div>

        <motion.h1
          variants={staggerChild}
          className={cn(
            "text-parchment mb-5 font-semibold tracking-[-0.015em] text-balance",
            codeIsHero ? "text-[20px]/[1.35]" : "text-[21px]/[1.35] sm:text-2xl/[1.35]",
          )}
        >
          {question.title}
        </motion.h1>

        {question.prompt && question.prompt !== question.title ? (
          <motion.p
            variants={staggerChild}
            className="text-stone mb-5 max-w-[70ch] text-[14px]/[1.6] text-pretty"
          >
            {question.prompt}
          </motion.p>
        ) : null}

        {question.codeSnippet ? (
          <motion.div variants={staggerChild} className="mb-[22px]">
            <SurfaceLabel tone="code">source</SurfaceLabel>
            <CodeWell
              html={question.codeHtml}
              code={question.codeSnippet}
              typewriter
              fontSize={codeIsHero ? 15 : 14}
            />
          </motion.div>
        ) : null}

        {/* The program is above; this is what it prints. Naming both surfaces
            makes the distinction explicit rather than purely tonal. */}
        {terminalOptions ? <SurfaceLabel tone="stdout">stdout</SurfaceLabel> : null}

        <motion.div
          variants={stagger(0.04, 0.1)}
          className={cn(
            "mb-6",
            gridOptions ? "grid gap-2.5 sm:grid-cols-2" : "flex flex-col gap-2.5",
          )}
        >
          {question.options.map((option, i) => {
            const optionTerminal = terminalOptions || isTerminalOption(option.text);
            return (
            <motion.button
              key={option.id}
              variants={staggerChild}
              type="button"
              disabled={answered}
              onClick={() => onSelect(option.id)}
              data-skin={optionTerminal ? "terminal" : undefined}
              whileHover={answered ? undefined : { y: -1 }}
              whileTap={answered ? undefined : { scale: 0.995 }}
              className={cn(
                "group flex items-start gap-3.5 rounded-lg border p-4 text-left transition-colors",
                "focus-visible:ring-flame focus-visible:ring-2 focus-visible:outline-none",
                optionTerminal
                  ? "term-scanlines relative border-[#123c0c] bg-[var(--term-bg)]"
                  : "border-line-2 hover:border-line-3",
                selected === option.id &&
                  !optionTerminal &&
                  "border-flame bg-[var(--flame-wash)]",
                selected === option.id && optionTerminal && "border-[var(--term-fg)]",
                answered && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-[5px] font-mono text-[11px] font-semibold",
                  selected === option.id
                    ? "bg-flame text-ink"
                    : optionTerminal
                      ? "border border-[#1a9c0d] text-[var(--term-dim)]"
                      : "border-line-3 text-ash border",
                )}
              >
                {LETTERS[i] ?? option.id}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 break-words",
                  optionTerminal
                    ? "text-bone text-[13.5px]/[1.7] whitespace-pre-wrap"
                    : "text-bone text-[13.5px]/[1.6]",
                  selected === option.id && !optionTerminal && "text-parchment",
                )}
                style={{ overflowWrap: "anywhere" }}
              >
                <OptionText text={option.text} terminal={optionTerminal} />
              </span>
            </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
