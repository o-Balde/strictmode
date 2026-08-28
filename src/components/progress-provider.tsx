"use client";

/**
 * React adapter over the progress record.
 *
 * This file deliberately contains no rules. Every mutation is a pure transition
 * in lib/progress.ts; the provider only wires them to the external store and
 * hands them to components. Keeping the rules out of here is what lets
 * `npm run verify` assert against the code that actually persists.
 */
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  addPracticeTime,
  applyAnswer,
  chooseHomeVariant,
  completeDailyDrill,
  emptyProgress,
  exportProgress,
  forgetQuestions,
  importProgress,
  toggleSavedQuestion,
  type AnswerEvent,
  type StoredProgress,
} from "@/lib/progress";
import * as store from "@/lib/progress-store";
import { useHydrated } from "@/hooks/use-hydrated";

export type { AnswerEvent };

interface ProgressContextValue {
  progress: StoredProgress;
  hydrated: boolean;
  recordAnswer: (a: AnswerEvent) => void;
  completeDaily: (totalMs: number) => void;
  recordFreePlay: (totalMs: number) => void;
  toggleSaved: (id: string) => void;
  setHomeVariant: (v: StoredProgress["homeVariant"]) => void;
  resetSubject: (ids: string[]) => void;
  resetAll: () => void;
  exportJson: () => string;
  importJson: (json: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const hydrated = useHydrated();

  const recordAnswer = useCallback(
    (event: AnswerEvent) => store.update((p) => applyAnswer(p, event)),
    [],
  );
  const completeDaily = useCallback(
    (totalMs: number) => store.update((p) => completeDailyDrill(p, totalMs)),
    [],
  );
  const recordFreePlay = useCallback(
    (totalMs: number) => store.update((p) => addPracticeTime(p, totalMs)),
    [],
  );
  const toggleSaved = useCallback(
    (id: string) => store.update((p) => toggleSavedQuestion(p, id)),
    [],
  );
  const setHomeVariant = useCallback(
    (v: StoredProgress["homeVariant"]) => store.update((p) => chooseHomeVariant(p, v)),
    [],
  );
  const resetSubject = useCallback(
    (ids: string[]) => store.update((p) => forgetQuestions(p, ids)),
    [],
  );
  const resetAll = useCallback(() => store.replace(emptyProgress()), []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      hydrated,
      recordAnswer,
      completeDaily,
      recordFreePlay,
      toggleSaved,
      setHomeVariant,
      resetSubject,
      resetAll,
      exportJson: () => exportProgress(progress),
      importJson: (json: string) => store.replace(importProgress(progress, json)),
    }),
    [
      progress,
      hydrated,
      recordAnswer,
      completeDaily,
      recordFreePlay,
      toggleSaved,
      setHomeVariant,
      resetSubject,
      resetAll,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
