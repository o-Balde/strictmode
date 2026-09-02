"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Brain, Flame, Layers3, RotateCcw, X } from "lucide-react";
import type { QuestionLevel } from "@/data/types";
import type {
  ActiveBinarySession,
  BinaryAnswer,
  BinaryCardPayload,
  BinaryChoice,
  BinarySessionResult,
} from "@/data/binary-types";
import { Brand } from "@/components/brand";
import { SegmentStrip, type SegmentState } from "@/components/chrome";
import { useProgress } from "@/components/progress-provider";
import { BinaryCardStack } from "@/components/binary/binary-card-stack";
import {
  BINARY_DECK_SIZE,
  clearActiveBinarySession,
  composeBinaryDeck,
  getBinaryCards,
  loadActiveBinarySession,
  saveActiveBinarySession,
  storeBinaryResult,
} from "@/lib/binary";
import { dayKey, msUntilNextLocalMidnight } from "@/lib/dates";
import { hasCompletedToday } from "@/lib/progress";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Array<{
  level: QuestionLevel;
  label: string;
  detail: string;
}> = [
  { level: "junior", label: "Junior", detail: "Core syntax and mental models" },
  { level: "intermediate", label: "Intermediate", detail: "Everyday production behavior" },
  { level: "senior", label: "Senior", detail: "Subtle runtime and type-system edges" },
];

type ScreenStatus = "loading" | "choose" | "playing" | "error";

export function BinaryGame() {
  const router = useRouter();
  const { progress, hydrated, commitBinary, setBinaryDifficulty } = useProgress();
  const [status, setStatus] = useState<ScreenStatus>("loading");
  const [session, setSession] = useState<ActiveBinarySession | null>(null);
  const [cards, setCards] = useState<BinaryCardPayload[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionLevel | null>(null);
  const difficulty = selectedDifficulty ?? progress.binary.lastDifficulty;
  const [abandonArmed, setAbandonArmed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const questionStartedAt = useRef(0);
  const finishing = useRef(false);

  const loadSession = useCallback(async (active: ActiveBinarySession) => {
    try {
      const payloads = await getBinaryCards(active.cardIds);
      if (payloads.length !== BINARY_DECK_SIZE) throw new Error("Incomplete Binary deck");
      setSession(active);
      setCards(payloads);
      questionStartedAt.current = performance.now();
      setStatus("playing");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const active = loadActiveBinarySession();
    queueMicrotask(() => {
      if (active) void loadSession(active);
      else setStatus("choose");
    });
  }, [hydrated, loadSession]);

  const sessionDay = session?.day;
  useEffect(() => {
    if (!sessionDay) return;
    const timeout = window.setTimeout(() => {
      clearActiveBinarySession();
      setSession(null);
      setCards([]);
      setStatus("choose");
      setNotice("The unfinished deck expired at midnight. Its staged answers were discarded.");
    }, msUntilNextLocalMidnight() + 100);
    return () => window.clearTimeout(timeout);
  }, [sessionDay]);

  const start = useCallback(() => {
    const rows = composeBinaryDeck({
      difficulty,
      progress: progress.binary,
      seed: Math.floor(Math.random() * 2 ** 31),
    });
    if (rows.length !== BINARY_DECK_SIZE) {
      setStatus("error");
      return;
    }
    const active: ActiveBinarySession = {
      version: 1,
      day: dayKey(),
      difficulty,
      countsForDaily: !hasCompletedToday(progress),
      cardIds: rows.map((row) => row.id),
      index: 0,
      answers: [],
      showingExplanation: false,
    };
    setBinaryDifficulty(difficulty);
    saveActiveBinarySession(active);
    setNotice(null);
    setStatus("loading");
    void loadSession(active);
  }, [difficulty, progress, setBinaryDifficulty, loadSession]);

  const finish = useCallback(
    (answers: BinaryAnswer[]) => {
      if (!session || finishing.current) return;
      finishing.current = true;
      const totalMs = answers.reduce((sum, answer) => sum + answer.elapsedMs, 0);
      commitBinary({ answers, totalMs, countsForDaily: session.countsForDaily });
      const result: BinarySessionResult = {
        version: 1,
        day: session.day,
        difficulty: session.difficulty,
        countsForDaily: session.countsForDaily,
        answers,
        cards,
        totalMs,
        finishedAt: new Date().toISOString(),
      };
      storeBinaryResult(result);
      clearActiveBinarySession();
      router.push("/binary/done");
    },
    [session, cards, commitBinary, router],
  );

  const moveForward = useCallback(
    (answers: BinaryAnswer[]) => {
      if (!session) return;
      if (session.index + 1 >= session.cardIds.length) {
        finish(answers);
        return;
      }
      const next: ActiveBinarySession = {
        ...session,
        index: session.index + 1,
        answers,
        showingExplanation: false,
      };
      saveActiveBinarySession(next);
      setSession(next);
      questionStartedAt.current = performance.now();
    },
    [session, finish],
  );

  const answer = useCallback(
    (choice: BinaryChoice) => {
      if (!session || session.showingExplanation) return;
      const card = cards[session.index];
      if (!card) return;
      const correct = choice !== null && choice === card.truth;
      const answerEvent: BinaryAnswer = {
        cardId: card.id,
        choice,
        correct,
        elapsedMs: Math.max(1, performance.now() - questionStartedAt.current),
      };
      const answers = [...session.answers, answerEvent];
      const next: ActiveBinarySession = { ...session, answers, showingExplanation: true };
      saveActiveBinarySession(next);
      setSession(next);
    },
    [session, cards],
  );

  const continueAfterExplanation = useCallback(() => {
    if (!session?.showingExplanation) return;
    moveForward(session.answers);
  }, [session, moveForward]);

  useEffect(() => {
    if (status !== "playing") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (session?.showingExplanation) {
        if (event.key === "Enter") {
          event.preventDefault();
          continueAfterExplanation();
        }
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        answer(false);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        answer(true);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        answer(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status, session?.showingExplanation, answer, continueAfterExplanation]);

  const abandon = useCallback(() => {
    if (!abandonArmed) {
      setAbandonArmed(true);
      window.setTimeout(() => setAbandonArmed(false), 4000);
      return;
    }
    clearActiveBinarySession();
    finishing.current = false;
    setAbandonArmed(false);
    setSession(null);
    setCards([]);
    setNotice("Deck discarded. None of its answers were saved.");
    setStatus("choose");
  }, [abandonArmed]);

  if (!hydrated || status === "loading") return <BinarySkeleton />;
  if (status === "error") {
    return (
      <BinaryMessage
        title="The deck could not be loaded."
        body="Your completed progress is safe. Discard this deck and try a fresh draw."
        action="Discard deck"
        onAction={() => {
          clearActiveBinarySession();
          setSession(null);
          setCards([]);
          setStatus("choose");
        }}
      />
    );
  }
  if (status === "choose") {
    return (
      <DifficultyPicker
        difficulty={difficulty}
        setDifficulty={setSelectedDifficulty}
        countsForDaily={!hasCompletedToday(progress)}
        notice={notice}
        onStart={start}
      />
    );
  }
  if (!session || cards.length === 0) return <BinarySkeleton />;

  const segments: SegmentState[] = Array.from({ length: BINARY_DECK_SIZE }, (_, index) => {
    const result = session.answers[index];
    if (result) return result.correct ? "correct" : "wrong";
    if (index === session.index) return "current";
    return "pending";
  });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[900px] flex-col overflow-x-hidden px-4 pb-5 sm:px-7">
      <header className="flex items-center gap-3 py-4 sm:py-5">
        <Link
          href="/"
          aria-label="Leave and resume later"
          title="Leave and resume later"
          className="text-ash hover:text-bone grid size-8 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-binary focus-visible:outline-none"
        >
          <X className="size-4" />
        </Link>
        <SegmentStrip states={segments} className="max-w-[540px]" thickness={4} />
        <span className="text-binary-soft ml-auto font-mono text-[11px] tabular-nums">
          {session.index + 1}/{BINARY_DECK_SIZE}
        </span>
        <button
          type="button"
          onClick={abandon}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-[11.5px] transition-colors focus-visible:ring-2 focus-visible:ring-binary focus-visible:outline-none",
            abandonArmed ? "bg-rust-bg text-salmon" : "text-slate hover:text-ash",
          )}
        >
          {abandonArmed ? "Discard answers?" : "Abandon"}
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center py-2 sm:py-4">
        <div className="mb-4 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.08em] uppercase">
          <span className="text-binary-soft">{session.countsForDaily ? "Daily deck" : "Extra deck"}</span>
          <span className="text-line-3">/</span>
          <span className="text-slate">{session.difficulty}</span>
        </div>
        <BinaryCardStack
          cards={cards}
          index={session.index}
          showingExplanation={session.showingExplanation}
          lastAnswer={session.answers[session.answers.length - 1] ?? null}
          onAnswer={answer}
          onContinue={continueAfterExplanation}
        />
        <div className="sr-only" aria-live="polite">
          {session.showingExplanation
            ? session.answers[session.answers.length - 1]?.correct
              ? "Correct! The card has flipped to show the explanation."
              : session.answers[session.answers.length - 1]?.choice === null
                ? "Skipped. The card has flipped to show the explanation."
                : "Incorrect. The card has flipped to show the explanation."
            : ""}
        </div>
      </main>
    </div>
  );
}

function DifficultyPicker({
  difficulty,
  setDifficulty,
  countsForDaily,
  notice,
  onStart,
}: {
  difficulty: QuestionLevel;
  setDifficulty: (level: QuestionLevel) => void;
  countsForDaily: boolean;
  notice: string | null;
  onStart: () => void;
}) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[900px] px-5 py-5 sm:px-8 sm:py-7">
      <header className="mb-12 flex items-center justify-between">
        <Brand href="/" size="sm" />
        <Link href="/progress" className="text-ash hover:text-bone text-[12.5px] transition-colors">
          Progress
        </Link>
      </header>

      <main className="mx-auto max-w-[720px]">
        <div className="text-binary-soft mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase">
          <Layers3 className="size-3.5" /> Binary Cards
        </div>
        <h1 className="text-parchment m-0 max-w-[620px] text-[32px]/[1.12] font-semibold tracking-[-0.035em] text-balance sm:text-[44px]/[1.1]">
          Ten calls. True or false.
        </h1>
        <p className="text-stone mt-4 mb-9 max-w-[590px] text-[15px]/[1.7] text-pretty">
          Swipe through React, TypeScript, and JavaScript statements. Each card flips into the mental model you need, and misses return on a spaced schedule.
        </p>

        {notice ? (
          <div className="border-line-3 bg-surface text-ash mb-6 rounded-lg border px-4 py-3 text-[13px]/[1.6]" role="status">
            {notice}
          </div>
        ) : null}

        <fieldset>
          <legend className="text-slate mb-3 font-mono text-[10.5px] tracking-[0.09em] uppercase">
            Choose difficulty
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {DIFFICULTIES.map((item) => {
              const selected = difficulty === item.level;
              return (
                <button
                  key={item.level}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setDifficulty(item.level)}
                  className={cn(
                    "min-h-[104px] rounded-xl border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-binary focus-visible:outline-none",
                    selected
                      ? "border-binary bg-binary-deep"
                      : "border-line-2 bg-surface hover:border-line-3",
                  )}
                >
                  <span className={cn("block text-[14.5px] font-semibold", selected ? "text-binary-soft" : "text-bone")}>
                    {item.label}
                  </span>
                  <span className="text-ash mt-1.5 block text-[12px]/[1.5]">{item.detail}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          className="bg-binary text-ink mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl px-7 text-[15px] font-semibold focus-visible:ring-2 focus-visible:ring-binary focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
        >
          {countsForDaily ? <Flame className="size-4" /> : <RotateCcw className="size-4" />}
          {countsForDaily ? "Start today's Binary deck" : "Start an extra deck"}
        </motion.button>

        <div className="text-slate mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px]">
          <span className="inline-flex items-center gap-1.5"><Brain className="size-3.5" /> 10 mixed cards</span>
          <span>No countdown</span>
          <span>Progress saves after card 10</span>
        </div>
      </main>
    </div>
  );
}

function BinarySkeleton() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[760px] px-5 py-6">
      <div className="bg-line mb-8 h-1 animate-pulse rounded-full" />
      <div className="border-line bg-surface-2 mx-auto h-[min(65dvh,570px)] min-h-[480px] animate-pulse rounded-[18px] border" />
    </div>
  );
}

function BinaryMessage({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="mx-auto grid min-h-dvh max-w-[620px] place-items-center px-6 text-center">
      <div>
        <Layers3 className="text-binary mx-auto mb-5 size-7" />
        <h1 className="text-parchment text-2xl font-semibold">{title}</h1>
        <p className="text-ash mx-auto mt-3 max-w-[48ch] text-[14px]/[1.7]">{body}</p>
        <button type="button" onClick={onAction} className="bg-binary text-ink mt-6 rounded-lg px-6 py-3 text-sm font-semibold">
          {action}
        </button>
      </div>
    </div>
  );
}
