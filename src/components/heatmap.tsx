"use client";

/**
 * Activity heatmap. The dashboard shows twelve weeks in twelve columns; the
 * progress page shows the same data across twenty-eight.
 */
import { motion, useReducedMotion } from "motion/react";
import { cn, dayKey } from "@lib";

const RAMP = [
  "var(--heat-0)",
  "var(--heat-1)",
  "var(--heat-2)",
  "var(--heat-3)",
  "var(--heat-4)",
];

export interface HeatCell {
  readonly day: string;
  readonly count: number;
  readonly level: number;
  readonly drills?: number;
  readonly binary?: number;
}

export interface HeatLevelOptions {
  readonly count?: number;
  readonly drills?: number;
  readonly binary?: number;
  readonly completed?: boolean;
}

function calculateRatioLevel(ratio: number): number {
  if (ratio >= 1) return 4;
  if (ratio >= 0.65) return 3;
  if (ratio >= 0.35) return 2;
  if (ratio > 0) return 1;
  return 0;
}

function calculateBreakdownLevel(drillsDone: number, binariesDone: number): number {
  // Answered the 10 binary cards OR 5 drill questions (or over-study in either)
  if (drillsDone >= 5 || binariesDone >= 10) {
    return 4;
  }

  // Proportional progress (5 drills = 100%, 10 binary cards = 100%)
  const studyRatio: number = drillsDone / 5 + binariesDone / 10;
  return calculateRatioLevel(studyRatio);
}

function calculateLegacyCountLevel(count: number): number {
  // Fallback for legacy counts:
  // 5 questions was a full daily drill; 10 was a full binary deck.
  if (count >= 5) return 4;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

/**
 * Computes the heatmap ramp level (0 to 4).
 * Fully coloured (level 4) only when:
 * - Answered the 10 binary cards
 * - OR answered 5 drill questions
 * - OR over study (e.g. > 10 cards / > 5 drill questions, or combined completion)
 * - OR the day was officially marked as completed (daily drill / daily binary).
 *
 * Partial study maps to levels 1-3. Zero answers maps to 0.
 */
export function heatLevel({
  count = 0,
  drills,
  binary,
  completed = false,
}: HeatLevelOptions): number {
  const drillsDone: number = drills ?? 0;
  const binariesDone: number = binary ?? 0;

  if (count <= 0 && drillsDone <= 0 && binariesDone <= 0) {
    return 0;
  }

  // Any day with an officially completed daily drill or binary deck is fully coloured
  if (completed) {
    return 4;
  }

  // If specific breakdown is available:
  if (drills !== undefined || binary !== undefined) {
    return calculateBreakdownLevel(drillsDone, binariesDone);
  }

  return calculateLegacyCountLevel(count);
}

/** Answers-per-day → ramp index (legacy fallback wrapper). */
export function level(count: number): number {
  return heatLevel({ count });
}

export interface BuildCellsOptions {
  readonly dailyBreakdown?: Record<string, { readonly drills: number; readonly binary: number }>;
  readonly completedDays?: readonly string[];
}

/** The `days` most recent local days, oldest first. */
export function buildCells(
  heatmap: Record<string, number>,
  days: number,
  options?: BuildCellsOptions,
): HeatCell[] {
  const out: HeatCell[] = [];
  const today = new Date();
  const completedSet = new Set(options?.completedDays ?? []);
  const breakdown = options?.dailyBreakdown;

  for (let offset = days - 1; offset >= 0; offset--) {
    const dayDate = new Date(today);
    dayDate.setDate(dayDate.getDate() - offset);
    const key = dayKey(dayDate);
    const count = heatmap[key] ?? 0;
    const dayBreakdown = breakdown?.[key];
    const isCompleted = completedSet.has(key);

    const cellLevel = heatLevel({
      count,
      drills: dayBreakdown?.drills,
      binary: dayBreakdown?.binary,
      completed: isCompleted,
    });

    out.push({
      day: key,
      count,
      level: cellLevel,
      drills: dayBreakdown?.drills,
      binary: dayBreakdown?.binary,
    });
  }
  return out;
}

export interface HeatmapProps {
  cells: readonly HeatCell[];
  columns: number;
  className?: string;
  animate?: boolean;
}

export function Heatmap({
  cells,
  columns,
  className,
  animate = true,
}: Readonly<HeatmapProps>) {
  const reduced = useReducedMotion();
  const still = reduced || !animate;

  return (
    <div
      className={cn("grid gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cells.map((cell, cellIndex) => {
        const detailParts: string[] = [];
        if (cell.drills) detailParts.push(`${cell.drills} drill${cell.drills === 1 ? "" : "s"}`);
        if (cell.binary) detailParts.push(`${cell.binary} card${cell.binary === 1 ? "" : "s"}`);
        const tooltip =
          detailParts.length > 0
            ? `${cell.day} · ${detailParts.join(", ")}`
            : `${cell.day} · ${cell.count} answered`;

        return (
          <motion.div
            key={cell.day}
            title={tooltip}
            className="aspect-square rounded-xs"
            style={{ background: RAMP[cell.level] }}
            initial={still ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              // Cascade across the grid rather than left-to-right in one row.
              delay: still ? 0 : Math.min(0.8, cellIndex * 0.006),
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}

export interface HeatmapAxisProps {
  cells: readonly HeatCell[];
  className?: string;
}

/** Month labels beneath the strip, taken from the real range. */
export function HeatmapAxis({ cells, className }: Readonly<HeatmapAxisProps>) {
  const firstCell = cells.at(0);
  const lastCell = cells.at(-1);
  if (!firstCell || !lastCell) return null;

  const formatMonth = (key: string) =>
    new Date(key).toLocaleDateString(undefined, { month: "short" });

  return (
    <div
      className={cn(
        "text-slate flex justify-between font-mono text-[11px]",
        className,
      )}
    >
      <span>{formatMonth(firstCell.day)}</span>
      <span>{formatMonth(lastCell.day)}</span>
    </div>
  );
}
