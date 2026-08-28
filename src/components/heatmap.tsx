"use client";

/**
 * Activity heatmap. The dashboard shows twelve weeks in twelve columns; the
 * progress page shows the same data across twenty-eight.
 */
import { motion, useReducedMotion } from "motion/react";
import { dayKey } from "@/lib/dates";
import { cn } from "@/lib/utils";

const RAMP = [
  "var(--heat-0)",
  "var(--heat-1)",
  "var(--heat-2)",
  "var(--heat-3)",
  "var(--heat-4)",
];

/** Answers-per-day → ramp index. Five buckets, matching the mockup's palette. */
function level(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

export interface HeatCell {
  day: string;
  count: number;
}

/** The `days` most recent local days, oldest first. */
export function buildCells(heatmap: Record<string, number>, days: number): HeatCell[] {
  const out: HeatCell[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    out.push({ day: key, count: heatmap[key] ?? 0 });
  }
  return out;
}

export function Heatmap({
  cells,
  columns,
  className,
  animate = true,
}: {
  cells: HeatCell[];
  columns: number;
  className?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const still = reduced || !animate;

  return (
    <div
      className={cn("grid gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cells.map((cell, i) => (
        <motion.div
          key={cell.day}
          title={`${cell.day} · ${cell.count} answered`}
          className="aspect-square rounded-[2px]"
          style={{ background: RAMP[level(cell.count)] }}
          initial={still ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            // Cascade across the grid rather than left-to-right in one row.
            delay: still ? 0 : Math.min(0.8, i * 0.006),
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

/** Month labels beneath the strip, taken from the real range. */
export function HeatmapAxis({ cells, className }: { cells: HeatCell[]; className?: string }) {
  if (cells.length === 0) return null;
  const fmt = (key: string) =>
    new Date(key).toLocaleDateString(undefined, { month: "short" });
  return (
    <div
      className={cn(
        "text-slate flex justify-between font-mono text-[11px]",
        className,
      )}
    >
      <span>{fmt(cells[0].day)}</span>
      <span>{fmt(cells[cells.length - 1].day)}</span>
    </div>
  );
}
