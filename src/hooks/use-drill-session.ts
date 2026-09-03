"use client";

/**
 * Runs one session end to end: compose from the local index, fetch the bodies,
 * then track answer / timing state as the user moves through them.
 *
 * The composition happens once on mount and is then frozen — reshuffling
 * mid-session would move the goalposts under someone already answering.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { QuestionSubject } from "@data";
import { useProgress } from "@components";
import {
  INDEX_BY_ID,
  composeDrill,
  questionSource,
  weakSubjects,
  type Drill,
  type QuestionPayload,
  type SessionItemResult,
} from "@lib";

export type SessionMode = "daily" | "extra" | "free";

export interface UseDrillSession {
  status: "composing" | "loading" | "ready" | "empty" | "error";
  questions: QuestionPayload[];
  drill: Drill | null;
  index: number;
  current: QuestionPayload | null;
  results: SessionItemResult[];
  selected: string | null;
  answered: boolean;
  wasCorrect: boolean | null;
  elapsedMs: number;
  questionElapsedMs: number;
  finished: boolean;
  select: (optionId: string) => void;
  submit: () => void;
  skip: () => void;
  next: () => void;
  reshuffle: () => void;
}

const subjectOf = (id: string) => INDEX_BY_ID.get(id)?.subject;

export interface SessionConfig {
  mode: SessionMode;
  subject?: QuestionSubject;
  /** "Mixed review" — restrict the pool to questions previously answered wrong. */
  reviewOnly?: boolean;
}

export function useDrillSession({ subject, reviewOnly }: SessionConfig): UseDrillSession {
  const { progress, hydrated, recordAnswer } = useProgress();

  const [drill, setDrill] = useState<Drill | null>(null);
  const [questions, setQuestions] = useState<QuestionPayload[]>([]);
  // Only the fetch outcome is state; "composing" and "empty" are facts about
  // `drill` and are derived below rather than written from an effect.
  const [fetchStatus, setFetchStatus] = useState<"loading" | "ready" | "error">("loading");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<SessionItemResult[]>([]);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [finished, setFinished] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [questionElapsedMs, setQuestionElapsedMs] = useState(0);
  const sessionStart = useRef<number>(0);
  const questionStart = useRef<number>(0);

  // Compose once, from a snapshot of progress taken at mount.
  const composed = useRef(false);
  useEffect(() => {
    if (!hydrated || composed.current) return;
    composed.current = true;
    const weak = weakSubjects(progress, subjectOf);
    setDrill(
      composeDrill({
        seenIds: progress.seenQuestionIds,
        reviewState: progress.reviewState,
        weakSubjects: weak,
        subject,
        wrongOnly: reviewOnly ? progress.wrongQuestionIds : undefined,
        seed,
      }),
    );
  }, [hydrated, progress, subject, reviewOnly, seed]);

  // Fetch the bodies for whatever was composed.
  useEffect(() => {
    if (!drill || drill.rows.length === 0) return;
    let cancelled = false;

    questionSource
      .getQuestions(drill.rows.map((r) => r.id))
      .then((questions: QuestionPayload[]) => {
        if (cancelled) return;
        setQuestions(questions);
        setFetchStatus("ready");
        sessionStart.current = performance.now();
        questionStart.current = performance.now();
      })
      .catch(() => {
        if (!cancelled) setFetchStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [drill]);

  const status: UseDrillSession["status"] = !drill
    ? "composing"
    : drill.rows.length === 0
      ? "empty"
      : fetchStatus === "ready" && questions.length === 0
        ? "empty"
        : fetchStatus;

  // Soft elapsed clocks. One second is plenty of resolution and keeps the
  // re-render cost negligible.
  useEffect(() => {
    if (status !== "ready" || finished) return;
    const id = window.setInterval(() => {
      setElapsedMs(performance.now() - sessionStart.current);
      setQuestionElapsedMs(performance.now() - questionStart.current);
    }, 500);
    return () => window.clearInterval(id);
  }, [status, finished]);

  const current = questions[index] ?? null;

  const select = useCallback(
    (optionId: string) => {
      if (answered) return;
      setSelected(optionId);
    },
    [answered],
  );

  const finish = useCallback(
    (item: SessionItemResult) => {
      setResults((prev) => [...prev, item]);
      setAnswered(true);
    },
    [],
  );

  const submit = useCallback(() => {
    if (!current || answered || !selected) return;
    const correct = selected === current.correctAnswer;
    const elapsed = performance.now() - questionStart.current;
    recordAnswer({ questionId: current.id, correct, elapsedMs: elapsed });
    finish({
      id: current.id,
      title: current.title,
      subject: current.subject,
      subjectTitle: current.subjectTitle,
      correct,
      skipped: false,
      elapsedMs: elapsed,
    });
  }, [current, answered, selected, recordAnswer, finish]);

  /** Skipping counts as seen and as wrong — it still needs to come back. */
  const skip = useCallback(() => {
    if (!current || answered) return;
    const elapsed = performance.now() - questionStart.current;
    recordAnswer({ questionId: current.id, correct: false, elapsedMs: elapsed });
    setSelected(null);
    finish({
      id: current.id,
      title: current.title,
      subject: current.subject,
      subjectTitle: current.subjectTitle,
      correct: false,
      skipped: true,
      elapsedMs: elapsed,
    });
  }, [current, answered, recordAnswer, finish]);

  const next = useCallback(() => {
    if (!answered) return;
    if (index + 1 >= questions.length) {
      setElapsedMs(performance.now() - sessionStart.current);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    questionStart.current = performance.now();
    setQuestionElapsedMs(0);
  }, [answered, index, questions.length]);

  /** "Shuffle the set" — only meaningful before the first answer. */
  const reshuffle = useCallback(() => {
    composed.current = false;
    setSeed(Math.floor(Math.random() * 2 ** 31));
    setQuestions([]);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setFetchStatus("loading");
  }, []);

  const wasCorrect = useMemo(() => {
    if (!answered || !current) return null;
    return results.at(-1)?.correct ?? null;
  }, [answered, current, results]);

  return {
    status,
    questions,
    drill,
    index,
    current,
    results,
    selected,
    answered,
    wasCorrect,
    elapsedMs,
    questionElapsedMs,
    finished,
    select,
    submit,
    skip,
    next,
    reshuffle,
  };
}
