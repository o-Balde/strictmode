"use client";

/**
 * Everything both home directions need: today's composed queue, the streak
 * state, and the weakest topics.
 *
 * The queue is composed from the local index and then resolved to titles via
 * /api/questions, so the dashboard can list what is actually coming up rather
 * than a generic "5 items".
 */
import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@/components/progress-provider";
import { composeDrill } from "@/lib/drill";
import { INDEX_BY_ID, SUBJECTS, subjectMeta } from "@/lib/question-index";
import { subjectProgress } from "@/lib/drill";
import {
  dayNumber,
  hasCompletedToday,
  streakHealth,
  weakSubjects,
  type HudCookie,
} from "@/lib/progress";
import { msUntilNextLocalMidnight } from "@/lib/dates";
import { typeLabel } from "@/components/chrome";
import type { QuestionSubject } from "@/data/types";

export interface QueueItem {
  id: string;
  title: string;
  label: string;
  minutes: number;
}

const subjectOf = (id: string) => INDEX_BY_ID.get(id)?.subject;

export function useHomeState(initialHud: HudCookie | null) {
  const { progress, hydrated } = useProgress();
  const [msLeft, setMsLeft] = useState(() => msUntilNextLocalMidnight());

  const weak = useMemo(
    () => (hydrated ? weakSubjects(progress, subjectOf) : []),
    [progress, hydrated],
  );

  const drill = useMemo(() => {
    if (!hydrated) return null;
    return composeDrill({
      seenIds: progress.seenQuestionIds,
      reviewState: progress.reviewState,
      weakSubjects: weak,
    });
  }, [hydrated, progress, weak]);

  // The queue is built straight from the index — titles ride along in it, so
  // the dashboard renders without a request. It previously fetched five full
  // question bodies (and paid for highlighting all five) to show five strings.
  const queue = useMemo<QueueItem[]>(
    () =>
      (drill?.rows ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        label: typeLabel(row.type),
        minutes: row.minutes,
      })),
    [drill],
  );

  // Countdown to local midnight, for the nothing-due card.
  useEffect(() => {
    const id = window.setInterval(() => setMsLeft(msUntilNextLocalMidnight()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const coverage = useMemo(
    () =>
      subjectProgress(
        progress.seenQuestionIds,
        progress.correctQuestionIds,
        SUBJECTS.map((s) => ({ subject: s.subject, total: s.total })),
      ),
    [progress.seenQuestionIds, progress.correctQuestionIds],
  );

  /**
   * Weakest topics that have enough answers to mean anything. A topic at 100%
   * is not weak — listing it under "weakest" reads as a bug, so it is excluded.
   */
  const weakest = useMemo(
    () =>
      coverage
        .filter((c) => c.seen >= 2 && c.mastery < 100)
        .sort((a, b) => a.mastery - b.mastery)
        .slice(0, 3)
        .map((c) => ({ ...c, title: subjectMeta(c.subject)?.title ?? c.subject })),
    [coverage],
  );

  const focusTitles = useMemo(() => {
    const subjects: QuestionSubject[] = drill?.focusSubjects ?? [];
    return subjects.map((s) => subjectMeta(s)?.title ?? s);
  }, [drill]);

  return {
    hydrated,
    progress,
    drill,
    queue,
    // Nothing is fetched, so nothing is ever loading.
    queueLoading: false,
    coverage,
    weakest,
    focusTitles,
    msLeft,
    // Before hydration these fall back to the cookie so the first paint is right.
    day: hydrated ? dayNumber(progress) : (initialHud?.d ?? 1),
    streak: hydrated ? progress.streakDays : (initialHud?.s ?? 0),
    seenCount: hydrated ? progress.seenQuestionIds.length : (initialHud?.n ?? 0),
    doneToday: hydrated ? hasCompletedToday(progress) : false,
    health: hydrated ? streakHealth(progress) : "active",
  };
}
