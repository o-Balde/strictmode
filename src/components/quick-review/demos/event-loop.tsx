"use client";

/**
 * The browser's event loop, one step at a time: the call stack, the work
 * waiting in Web APIs, the task and microtask queues, and the console. Items
 * keep their identity as they move between boxes, so a callback can be seen
 * travelling from a queue onto the stack.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { PrepText } from "@components";
import { cn } from "@lib";
import { BROWSER_LOOP_SCENARIOS, type BrowserLoopScenarioId } from "./event-loop-scenarios";
import { CodeView, DEMO_LABEL, DemoConsole, Stepper } from "./ui";

const PLAY_MS = 1500;

export function EventLoop({ scenario: id }: Readonly<{ scenario: BrowserLoopScenarioId }>) {
  const scenario = BROWSER_LOOP_SCENARIOS[id];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = scenario.steps[index];
  const last = scenario.steps.length - 1;

  useEffect(() => {
    if (!playing || index >= last) return;
    const timer = window.setTimeout(() => {
      setIndex(index + 1);
      if (index + 1 >= last) setPlaying(false);
    }, PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-paper m-0 text-[13.5px] font-medium">{scenario.title}</p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <CodeView code={scenario.code} active={step.lines} />
          <div className="bg-surface-3 border-flame min-h-16 rounded-r-lg border-l-2 px-3.5 py-2.5" aria-live="polite">
            <p className="text-bone m-0 text-[13px]/[1.65] text-pretty">
              <PrepText text={step.note} />
            </p>
          </div>
          <Stepper
            step={index}
            total={scenario.steps.length}
            onStep={(next) => {
              setPlaying(false);
              setIndex(next);
            }}
            playing={playing}
            onPlay={() => {
              if (index >= last) setIndex(0);
              setPlaying((current) => !current);
            }}
          />
        </div>

        <LayoutGroup id={`loop-${id}`}>
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <Lane title="Call stack" items={[...step.stack].reverse()} tone="stack" empty="empty: the loop may pick the next job" />
            <Lane title="Web APIs (timers, network)" items={step.waiting} tone="waiting" empty="nothing pending" />
            <Lane title="Microtask queue (promises)" items={step.microtasks} tone="micro" empty="empty" horizontal />
            <Lane title="Task queue (timers, events)" items={step.macrotasks} tone="macro" empty="empty" horizontal />
            <DemoConsole className="sm:col-span-2" lines={step.console.map((text, lineIndex) => ({ id: lineIndex, text }))} />
          </div>
        </LayoutGroup>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Rule of thumb: run the current task to completion, then drain <strong className="text-bone">all</strong> microtasks, then
        (maybe) render, then take <strong className="text-bone">one</strong> task, and repeat.
      </p>
    </div>
  );
}

const TONES = {
  stack: "border-flame/70 bg-flame-deep text-peach",
  waiting: "border-line-3 bg-surface-4 text-stone",
  micro: "border-mint-line bg-mint-deep text-mint-soft",
  macro: "border-binary-line bg-binary-deep text-binary-soft",
} as const;

interface LaneProps {
  title: string;
  items: readonly string[];
  tone: keyof typeof TONES;
  empty: string;
  horizontal?: boolean;
}

export function Lane({ title, items, tone, empty, horizontal }: Readonly<LaneProps>) {
  const reduced = useReducedMotion();
  return (
    <section className="border-line-2 bg-surface-2 min-w-0 rounded-lg border p-3">
      <h4 className={cn(DEMO_LABEL, "m-0 mb-2")}>{title}</h4>
      <ul className={cn("m-0 flex min-h-9 list-none gap-1.5 p-0", horizontal ? "flex-row flex-wrap" : "flex-col")}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item}
              layoutId={reduced ? undefined : item}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className={cn("rounded-md border px-2.5 py-1.5 font-mono text-[11.5px] break-words", TONES[tone])}
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
        {items.length === 0 ? <li className="text-slate self-center font-mono text-[11px]">{empty}</li> : null}
      </ul>
    </section>
  );
}
