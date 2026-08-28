"use client";

/**
 * Mastery bars and coverage rings — the two ways the app shows "how much of
 * this do you actually know", chosen over any kind of point score.
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Below this, a topic reads as shaky and the bar turns flame. */
const SHAKY = 70;

export function MasteryBar({
  label,
  percent,
  detail,
  thickness = 6,
  className,
  delay = 0,
}: {
  label: React.ReactNode;
  percent: number;
  detail?: React.ReactNode;
  thickness?: number;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const strong = percent >= SHAKY;
  return (
    <div className={className}>
      <div className="text-bone mb-[7px] flex justify-between text-[13.5px] font-medium">
        <span>{label}</span>
        {detail ? <span className="text-ash font-mono">{detail}</span> : null}
      </div>
      <div
        className="bg-line overflow-hidden rounded-[3px]"
        style={{ height: thickness }}
      >
        <motion.div
          className={cn("h-full rounded-[3px]", strong ? "bg-mint" : "bg-flame")}
          initial={reduced ? false : { width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/**
 * Coverage ring. Drawn as an SVG arc rather than the mockup's conic-gradient so
 * the stroke can animate on.
 */
export function CoverageRing({
  percent,
  size = 26,
  stroke = 4,
  className,
  delay = 0,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, percent));
  const strong = pct >= SHAKY;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("-rotate-90", className)}
      role="img"
      aria-label={`${Math.round(pct)}% covered`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--line)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={strong ? "var(--mint)" : "var(--flame)"}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={reduced ? false : { strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/** A number that counts up to its value — used for scores and streaks. */
export function CountUp({
  value,
  className,
  duration = 0.9,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const display = useCounter(value, duration, reduced);

  if (reduced) return <span className={className}>{value}</span>;

  return (
    <motion.span
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {display}
    </motion.span>
  );
}

/** Eases a number from 0 to `target` so it decelerates into place. */
function useCounter(target: number, duration: number, reduced: boolean): number {
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);

  return n;
}
