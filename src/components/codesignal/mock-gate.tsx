"use client";

/**
 * Locks a mock's levels the way the assessment does: Level N+1 opens only
 * once Level N is fully green. The page cannot run your specs, so you confirm
 * it after `npm run level` passes; the point is to not read ahead.
 *
 * The levels are rendered on the server and passed in; this component only
 * decides which are showing. Progress is kept per mock across visits.
 */
import { useSyncExternalStore } from "react";
import { Lock, LockOpen, RotateCcw } from "lucide-react";
import { cn, codesignalStore as store, relockMock, unlockAll, unlockNextLevel, unlockedLevel } from "@lib";

export interface GatedLevel {
  title: string;
  minutes: number;
  content: React.ReactNode;
}

export interface MockGateProps {
  mockId: string;
  levels: readonly GatedLevel[];
  /** The debrief and reference solution: opened after the last level. */
  debrief: React.ReactNode;
}

export function MockGate({ mockId, levels, debrief }: Readonly<MockGateProps>) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const open = unlockedLevel(state, mockId);
  const finished = open > levels.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-ash font-mono text-[11.5px]">
          {finished ? "All levels open" : `Level ${open} of ${levels.length} open`}
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {!finished ? (
            <button
              type="button"
              onClick={() => store.update((current) => unlockAll(current, mockId, levels.length))}
              className="text-slate hover:text-bone font-mono text-[11.5px] underline-offset-2 transition-colors hover:underline"
            >
              Open everything (review mode)
            </button>
          ) : null}
          {open > 1 ? (
            <button
              type="button"
              onClick={() => store.update((current) => relockMock(current, mockId))}
              className="text-slate hover:text-bone inline-flex items-center gap-1 font-mono text-[11.5px] transition-colors"
            >
              <RotateCcw aria-hidden className="size-3" />
              Start over
            </button>
          ) : null}
        </div>
      </div>

      {levels.map((level, index) => {
        const number = index + 1;
        const unlocked = number <= open;
        const current = number === open;
        return (
          <section
            key={level.title}
            aria-label={`Level ${number}: ${level.title}`}
            className={cn(
              "rounded-[9px] border",
              unlocked ? "border-line-3 bg-surface-2" : "border-line-2 border-dashed",
            )}
          >
            <header className="flex items-center gap-3 px-4.5 py-3.5 sm:px-5">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-md font-mono text-[12px] font-semibold",
                  unlocked ? "bg-flame-deep text-clay border-flame-dim border" : "border-line-2 text-slate border",
                )}
              >
                {unlocked ? number : <Lock aria-hidden className="size-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className={cn("text-[14.5px] font-medium", unlocked ? "text-paper" : "text-ash")}>
                  Level {number}: {level.title}
                </div>
                <div className="text-slate font-mono text-[11px]">about {level.minutes} min</div>
              </div>
            </header>

            {unlocked ? (
              <div className="border-line border-t px-4.5 pt-4 pb-5 sm:px-5">
                {level.content}
                {current ? (
                  <button
                    type="button"
                    onClick={() => store.update((state) => unlockNextLevel(state, mockId, levels.length))}
                    className="bg-flame text-ink mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-opacity hover:opacity-90"
                  >
                    <LockOpen aria-hidden className="size-4" />
                    {number < levels.length
                      ? `Every Level ${number} spec passes: open Level ${number + 1}`
                      : "Every spec passes: open the debrief"}
                  </button>
                ) : null}
              </div>
            ) : (
              <p className="text-slate border-line m-0 border-t px-4.5 py-3 text-[12.5px] sm:px-5">
                Locked until Level {number - 1} passes, as in the real assessment.
              </p>
            )}
          </section>
        );
      })}

      {finished ? (
        <div className="border-line-3 bg-surface-2 rounded-[9px] border px-4.5 pt-4 pb-5 sm:px-5">{debrief}</div>
      ) : null}
    </div>
  );
}
