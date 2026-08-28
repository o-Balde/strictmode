"use client";

/**
 * The hint, revealed on request.
 *
 * Kept behind a press rather than shown alongside the question: a hint you
 * cannot avoid reading is just part of the prompt, and the point of the drill
 * is to try first. Once opened it stays open for that question.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lightbulb, ArrowUpRight } from "lucide-react";
import { unfold } from "@/lib/motion";

export function HintPanel({ hint, docsUrl }: { hint?: string; docsUrl?: string }) {
  const [open, setOpen] = useState(false);
  if (!hint && !docsUrl) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-hint-toggle=""
        className="text-slate hover:text-clay flex items-center gap-2 text-[13px] transition-colors"
      >
        <Lightbulb className="size-3.5" />
        {open ? "Hide hint" : "Need a hint?"}
        <kbd className="border-line-2 text-slate rounded border px-1 font-mono text-[10px]">H</kbd>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div variants={unfold} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
            <div className="border-line-3 mt-3 rounded-lg border border-dashed p-4">
              {hint ? (
                <p className="text-bone m-0 text-[14px]/[1.7] text-pretty">{hint}</p>
              ) : null}
              {docsUrl ? (
                <a
                  href={docsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-clay mt-3 inline-flex items-center gap-1.5 font-mono text-[11.5px] hover:underline"
                >
                  {new URL(docsUrl).hostname.replace(/^www\./, "")}
                  <ArrowUpRight className="size-3" />
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
