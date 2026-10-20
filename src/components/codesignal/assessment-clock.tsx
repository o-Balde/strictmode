"use client";

/**
 * The mock-assessment clock: 90 minutes, the plan's checkpoints marked on the
 * bar, and a warning when it is time to stop adding features.
 *
 * It keeps running while the tab is closed, like the real one, because a
 * start time is stored rather than a remaining time. Rendering never reads the
 * wall clock: `now` arrives from an interval, so the server and the first
 * client render agree.
 */
import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import {
  ASSESSMENT_MS,
  WRAP_UP_MS,
  choosePlan,
  clockElapsed,
  cn,
  codesignalStore as store,
  currentCheckpoint,
  formatClock,
  pauseClock,
  resetClock,
  startClock,
  type Checkpoint,
  type PracticePlanId,
} from "@lib";

const TICK_MS = 250;

export interface ClockPlan {
  id: PracticePlanId;
  label: string;
  checkpoints: Checkpoint[];
}

export interface AssessmentClockProps {
  plans: readonly ClockPlan[];
}

export function AssessmentClock({ plans }: Readonly<AssessmentClockProps>) {
  const { clock } = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const running = clock.runningSince !== null;
  const now = useTicker(running && clock.bankedMs < ASSESSMENT_MS);

  const elapsed = running ? clockElapsed(clock, Math.max(now, clock.runningSince ?? 0)) : clock.bankedMs;
  const remaining = ASSESSMENT_MS - elapsed;
  const finished = remaining <= 0;
  const wrapUp = !finished && remaining <= WRAP_UP_MS;

  const plan = plans.find((candidate) => candidate.id === clock.plan) ?? plans[0];
  const phase = plan.checkpoints[currentCheckpoint(plan.checkpoints, elapsed)];
  const started = elapsed > 0 || running;

  let status = "Not started: the clock runs while the tab is closed, like the real one.";
  if (started) status = `${phase.label} · done by ${formatMinutes(phase.endsAt)}`;
  if (wrapUp) status = "Stop adding features. Make every finished level green, then submit.";
  if (finished) status = "Time. Whatever passes now is your score.";

  return (
    <div className="border-line bg-ink/95 sticky top-0 z-30 border-y backdrop-blur">
      <div className="mx-auto flex max-w-295 flex-wrap items-center gap-x-4 gap-y-2 px-6 py-2.5 sm:px-10">
        <span
          role="timer"
          aria-label="Time remaining"
          className={cn(
            "font-mono text-xl font-semibold tabular-nums",
            finished || wrapUp ? "text-flame" : running ? "text-parchment" : "text-stone",
          )}
        >
          {formatClock(remaining)}
        </span>

        <span className={cn("min-w-0 flex-1 text-[12.5px]", wrapUp || finished ? "text-peach" : "text-ash")}>{status}</span>

        <div role="group" aria-label="Plan" className="border-line-2 flex rounded-md border p-0.5">
          {plans.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={option.id === plan.id}
              onClick={() => store.update((state) => choosePlan(state, option.id))}
              className={cn(
                "rounded px-2 py-1 font-mono text-[11px] font-medium transition-colors",
                option.id === plan.id ? "bg-surface-4 text-chalk" : "text-slate hover:text-bone",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={finished}
            onClick={() => store.update((state) => (running ? pauseClock(state, Date.now()) : startClock(state, Date.now())))}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[12px] font-medium transition-colors disabled:opacity-40",
              running ? "border-line-3 text-bone hover:border-line-2 border" : "bg-flame text-ink hover:opacity-90",
            )}
          >
            {running ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
            {running ? "Pause" : started ? "Resume" : "Start 90:00"}
          </button>
          <button
            type="button"
            aria-label="Reset the clock"
            onClick={() => store.update(resetClock)}
            className="border-line-2 text-slate hover:text-bone rounded-md border p-1.5 transition-colors"
          >
            <RotateCcw aria-hidden className="size-3.5" />
          </button>
        </div>
      </div>

      <ClockBar plan={plan} elapsed={elapsed} wrapUp={wrapUp || finished} />
    </div>
  );
}

interface ClockBarProps {
  plan: ClockPlan;
  elapsed: number;
  wrapUp: boolean;
}

/** Elapsed time over the plan's checkpoints, one tick per level boundary. */
function ClockBar({ plan, elapsed, wrapUp }: Readonly<ClockBarProps>) {
  const total = ASSESSMENT_MS / 60_000;
  return (
    <div className="bg-line relative h-1" aria-hidden>
      <div
        className={cn("h-full transition-[width] duration-300", wrapUp ? "bg-flame" : "bg-clay")}
        style={{ width: `${(elapsed / ASSESSMENT_MS) * 100}%` }}
      />
      {plan.checkpoints.slice(0, -1).map((checkpoint) => (
        <span
          key={checkpoint.label}
          className="bg-ink absolute top-0 h-full w-0.5"
          style={{ left: `${(checkpoint.endsAt / total) * 100}%` }}
        />
      ))}
    </div>
  );
}

/** Wall-clock time, refreshed while `active`; 0 until the first tick. */
function useTicker(active: boolean): number {
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(timer);
  }, [active]);
  return now;
}

function formatMinutes(minutes: number): string {
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
}
