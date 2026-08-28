"use client";

/**
 * Screen chrome: the type badges, the segment progress strip, and the soft
 * elapsed clock. Deliberately thin — one top bar, one progress strip, one
 * primary action per screen.
 */
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { QuestionType } from "@/data/types";
import { formatClock } from "@/lib/dates";

const TYPE_LABEL: Record<QuestionType, string> = {
  concept: "CONCEPT",
  output: "OUTPUT",
  puzzle: "TYPE PUZZLE",
  live_code: "LIVE CODE",
  fix: "FIX",
};

export function typeLabel(type: QuestionType) {
  return TYPE_LABEL[type];
}

export function TypeBadge({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase",
        "px-2 py-1",
        tone === "accent"
          ? "border-flame-dim bg-flame-deep text-clay border"
          : "border-line-2 text-ash border",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type SegmentState = "correct" | "wrong" | "current" | "pending";

/** The five-segment strip that tracks a session. */
export function SegmentStrip({
  states,
  className,
  thickness = 5,
}: {
  states: SegmentState[];
  className?: string;
  thickness?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("flex flex-1 gap-[5px]", className)}>
      {states.map((state, i) => (
        <div
          key={i}
          className="bg-line flex-1 overflow-hidden rounded-[3px]"
          style={{ height: thickness }}
        >
          <motion.div
            className={cn(
              "h-full rounded-[3px]",
              state === "correct" && "bg-mint",
              state === "wrong" && "bg-flame",
              state === "current" && "bg-flame",
              state === "pending" && "bg-transparent",
            )}
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: state === "pending" ? 0 : 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

/** Counts up. Never expires, never auto-advances. */
export function ElapsedClock({
  ms,
  className,
  tone = "muted",
}: {
  ms: number;
  className?: string;
  tone?: "muted" | "accent";
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium tabular-nums",
        tone === "accent" ? "text-clay" : "text-ash",
        className,
      )}
    >
      {formatClock(ms)}
    </span>
  );
}
