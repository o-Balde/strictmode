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
  chooseBinaryDifficulty,
  commitBinarySession,
  completeDailyDrill,
  emptyProgress,
  exportProgress,
  forgetQuestions,
  importProgress,
  progressStore as store,
  toggleSavedQuestion,
  type AnswerEvent,
  type BinarySessionCommit,
  type StoredProgress,
} from "@lib";
import { useHydrated } from "@hooks";

export type { AnswerEvent };

export interface ProgressContextValue {
  readonly progress: StoredProgress;
  readonly hydrated: boolean;
  readonly recordAnswer: (event: AnswerEvent) => void;
  readonly completeDaily: (totalMs: number) => void;
  readonly recordFreePlay: (totalMs: number) => void;
  readonly commitBinary: (session: BinarySessionCommit) => void;
  readonly setBinaryDifficulty: (level: StoredProgress["binary"]["lastDifficulty"]) => void;
  readonly toggleSaved: (id: string) => void;
  readonly setHomeVariant: (variant: StoredProgress["homeVariant"]) => void;
  readonly resetSubject: (ids: string[]) => void;
  readonly resetAll: () => void;
  readonly exportJson: () => string;
  readonly importJson: (json: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export interface ProgressProviderProps {
  children: React.ReactNode;
}

export function ProgressProvider({ children }: Readonly<ProgressProviderProps>) {
  const progress = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const hydrated = useHydrated();

  const recordAnswer = useCallback(
    (event: AnswerEvent) => store.update((currentProgress) => applyAnswer(currentProgress, event)),
    [],
  );
  const completeDaily = useCallback(
    (totalMs: number) => store.update((currentProgress) => completeDailyDrill(currentProgress, totalMs)),
    [],
  );
  const recordFreePlay = useCallback(
    (totalMs: number) => store.update((currentProgress) => addPracticeTime(currentProgress, totalMs)),
    [],
  );
  const commitBinary = useCallback(
    (session: BinarySessionCommit) => store.update((currentProgress) => commitBinarySession(currentProgress, session)),
    [],
  );
  const setBinaryDifficulty = useCallback(
    (level: StoredProgress["binary"]["lastDifficulty"]) =>
      store.update((currentProgress) => chooseBinaryDifficulty(currentProgress, level)),
    [],
  );
  const toggleSaved = useCallback(
    (id: string) => store.update((currentProgress) => toggleSavedQuestion(currentProgress, id)),
    [],
  );
  const setHomeVariant = useCallback(
    (variant: StoredProgress["homeVariant"]) => store.update((currentProgress) => chooseHomeVariant(currentProgress, variant)),
    [],
  );
  const resetSubject = useCallback(
    (ids: string[]) => store.update((currentProgress) => forgetQuestions(currentProgress, ids)),
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
      commitBinary,
      setBinaryDifficulty,
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
      commitBinary,
      setBinaryDifficulty,
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
