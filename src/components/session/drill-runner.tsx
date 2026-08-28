"use client";

/**
 * The session shell: top bar, question, feedback, and the keyboard map.
 *
 * Keys are bound at the window so they work regardless of focus — the mockup
 * advertises "Space to answer · Enter to continue" as the primary interaction
 * and it should never depend on having clicked the right element first.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { QuestionSubject } from "@/data/types";
import { useDrillSession, type SessionMode } from "@/hooks/use-drill-session";
import { useProgress } from "@/components/progress-provider";
import { QuestionView } from "@/components/session/question-view";
import { Feedback } from "@/components/session/feedback";
import { HintPanel } from "@/components/session/hint-panel";
import { ElapsedClock, SegmentStrip, type SegmentState } from "@/components/chrome";
import { questionSwap, unfold } from "@/lib/motion";
import { dayNumber, nextStreak } from "@/lib/progress";
import { storeSessionResult } from "@/lib/session-result";
import { subjectMeta } from "@/lib/question-index";

const LETTER_KEYS = ["a", "b", "c", "d"] as const;

export function DrillRunner({
  mode,
  subject,
  reviewOnly,
}: {
  mode: SessionMode;
  subject?: QuestionSubject;
  reviewOnly?: boolean;
}) {
  const router = useRouter();
  const { progress, completeDaily, recordFreePlay, toggleSaved } = useProgress();
  const session = useDrillSession({ mode, subject, reviewOnly });

  const {
    status,
    questions,
    index,
    current,
    results,
    selected,
    answered,
    finished,
    elapsedMs,
    select,
    submit,
    skip,
    next,
  } = session;

  // Hand off to the summary once the last question is done.
  useEffect(() => {
    if (!finished) return;
    const countsForStreak = mode === "daily";
    if (countsForStreak) completeDaily(elapsedMs);
    else recordFreePlay(elapsedMs);

    storeSessionResult({
      mode,
      subject,
      items: results,
      totalMs: elapsedMs,
      streak: countsForStreak ? nextStreak(progress) : progress.streakDays,
      dayNumber: dayNumber(progress),
      countsForStreak,
      finishedAt: new Date().toISOString(),
    });
    router.push("/drill/done");
    // Intentionally keyed only on `finished` — this must run exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const segments = useMemo<SegmentState[]>(() => {
    const total = questions.length || 5;
    return Array.from({ length: total }, (_, i) => {
      if (i < results.length) return results[i].correct ? "correct" : "wrong";
      if (i === index) return "current";
      return "pending";
    });
  }, [questions.length, results, index]);

  const exit = useCallback(() => router.push("/"), [router]);

  const feedbackRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  /**
   * Bring the verdict into view. The explanation is the reward, and on a long
   * question it unfolds well below the fold — leaving the reader to go looking
   * for it undercuts the whole point of the screen.
   *
   * This has to wait for the unfold to finish rather than firing on mount: the
   * document only grows as the panel expands, so an early scroll clamps to the
   * old page height and goes nowhere. It is driven by the panel's own
   * onAnimationComplete below.
   */
  const revealVerdict = useCallback(() => {
    feedbackRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [reduced]);

  /**
   * Fallback for the primary onAnimationComplete trigger: if the unfold never
   * reports completion — a tab backgrounded mid-answer freezes the animation —
   * scroll anyway once it would have settled. Scrolling twice is a no-op.
   */
  useEffect(() => {
    if (!answered) return;
    const t = setTimeout(revealVerdict, 600);
    return () => clearTimeout(t);
  }, [answered, index, revealVerdict]);

  /** Advancing to the next question puts the reader back at its first line. */
  useEffect(() => {
    if (answered) return;
    topRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [answered, index, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;

      const key = e.key.toLowerCase();

      if (key === "escape") {
        e.preventDefault();
        exit();
        return;
      }
      if (answered) {
        if (key === "enter" || key === " ") {
          e.preventDefault();
          next();
        }
        return;
      }
      const letter = LETTER_KEYS.indexOf(key as (typeof LETTER_KEYS)[number]);
      if (letter >= 0 && current?.options[letter]) {
        e.preventDefault();
        select(current.options[letter].id);
        return;
      }
      if (key === "s") {
        e.preventDefault();
        skip();
        return;
      }
      if (key === "h") {
        e.preventDefault();
        document.querySelector<HTMLButtonElement>("[data-hint-toggle]")?.click();
        return;
      }
      if ((key === "enter" || key === " ") && selected) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, current, selected, select, submit, skip, next, exit]);

  if (status === "composing" || status === "loading") {
    return <SessionSkeleton />;
  }

  if (status === "error") {
    return (
      <SessionMessage
        title="Couldn't load the questions."
        body="The question service didn't respond. Your progress is safe — it never left this browser."
        actionLabel="Back to today"
        onAction={exit}
      />
    );
  }

  if (status === "empty") {
    const meta = subject ? subjectMeta(subject) : undefined;
    return (
      <SessionMessage
        title={
          reviewOnly
            ? "Nothing to review."
            : meta
              ? `You've cleared every ${meta.title} question.`
              : "Nothing left to drill right now."
        }
        body={
          reviewOnly
            ? "You haven't got anything wrong yet — there's nothing in the mixed review pile."
            : meta
              ? `All ${meta.total} answered at least once. Reset the topic to cycle them again, or pick your weakest one.`
              : "Every question in the bank has been seen. Reset a topic from the picker to cycle it again."
        }
        actionLabel="Browse topics"
        onAction={() => router.push("/topics")}
      />
    );
  }

  if (!current) return <SessionSkeleton />;

  const lastResult = results[results.length - 1];
  const correctRun = countTrailingCorrect(results);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[860px] flex-col">
      <div ref={topRef} aria-hidden className="scroll-mt-0" />
      <header className="border-line bg-ink sticky top-0 z-20 flex items-center gap-4 border-b px-5 py-3.5 sm:px-6">
        <button
          type="button"
          onClick={exit}
          aria-label="Leave this session"
          className="text-ash hover:text-bone transition-colors"
        >
          <X className="size-4" />
        </button>
        <SegmentStrip states={segments} />
        <ElapsedClock ms={elapsedMs} />
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            variants={questionSwap}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <QuestionView
              question={current}
              selected={selected}
              answered={answered}
              onSelect={select}
            />
          </motion.div>
        </AnimatePresence>

        {!answered ? (
          <div className="px-6 pb-5 sm:px-10">
            <HintPanel hint={current.hints[0]} docsUrl={current.docsUrl} />
          </div>
        ) : null}

        {!answered ? (
          <div className="flex items-center justify-between gap-4 px-6 pb-8 sm:px-10">
            <button
              type="button"
              onClick={skip}
              className="text-slate hover:text-ash text-[13px] transition-colors"
            >
              Skip · <span className="font-mono">S</span>
            </button>
            <motion.button
              type="button"
              onClick={submit}
              disabled={!selected}
              whileHover={selected ? { y: -1 } : undefined}
              whileTap={selected ? { scale: 0.98 } : undefined}
              className="bg-flame text-ink rounded-lg px-[30px] py-[13px] text-[14.5px] font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
            >
              Check
            </motion.button>
          </div>
        ) : null}

        <AnimatePresence>
          {answered && lastResult ? (
            <motion.div
              ref={feedbackRef}
              key={`fb-${current.id}`}
              variants={unfold}
              initial="hidden"
              animate="show"
              exit="exit"
              onAnimationComplete={(definition) => {
                if (definition === "show") revealVerdict();
              }}
              className="overflow-hidden scroll-mt-[60px]"
            >
              <Feedback
                question={current}
                selected={selected}
                correct={lastResult.correct}
                streak={correctRun}
                saved={progress.savedQuestionIds.includes(current.id)}
                onToggleSave={() => toggleSaved(current.id)}
                onNext={next}
                isLast={index + 1 >= questions.length}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

function countTrailingCorrect(results: { correct: boolean }[]): number {
  let n = 0;
  for (let i = results.length - 1; i >= 0; i--) {
    if (!results[i].correct) break;
    n++;
  }
  return n;
}

function SessionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[860px] px-6 py-10 sm:px-10">
      <div className="bg-line mb-8 h-[5px] animate-pulse rounded-full" />
      <div className="bg-surface mb-4 h-7 w-2/3 animate-pulse rounded" />
      <div className="bg-well mb-6 h-32 animate-pulse rounded-lg" />
      <div className="flex flex-col gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface h-14 animate-pulse rounded-lg"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function SessionMessage({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-line bg-surface-2 w-full max-w-[520px] rounded-xl border p-9 text-center"
      >
        <div className="border-line-3 text-clay mx-auto mb-5 grid size-[46px] place-items-center rounded-full border font-mono text-xl">
          ✓
        </div>
        <h1 className="text-parchment mb-2.5 text-xl font-semibold text-balance">{title}</h1>
        <p className="text-stone mx-auto mb-6 max-w-[36ch] text-[14px]/[1.65] text-pretty">
          {body}
        </p>
        <button
          type="button"
          onClick={onAction}
          className="bg-flame text-ink rounded-lg px-[22px] py-[13px] text-[14px] font-semibold"
        >
          {actionLabel}
        </button>
      </motion.div>
    </div>
  );
}
