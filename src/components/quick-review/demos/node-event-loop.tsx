"use client";

/**
 * Node's event loop as a ring of libuv phases. The current phase is lit; the
 * nextTick and promise queues sit in the middle, because Node drains them
 * between every callback, whatever the phase.
 */
import { useState } from "react";
import { arc } from "d3-shape";
import { LayoutGroup } from "motion/react";
import { PrepText } from "@components";
import { cn } from "@lib";
import { NODE_LOOP_SCENARIOS, NODE_PHASES, type NodeLoopScenarioId } from "./event-loop-scenarios";
import { Lane } from "./event-loop";
import { CodeView, DemoConsole, Segmented, Stepper } from "./ui";

const SIZE = 260;
const OUTER = 120;
const INNER = 84;
const PAD = 0.035;

const segment = arc<{ start: number; end: number }>()
  .innerRadius(INNER)
  .outerRadius(OUTER)
  .startAngle((d) => d.start + PAD)
  .endAngle((d) => d.end - PAD)
  .cornerRadius(5);

export function NodeEventLoop() {
  const [id, setId] = useState<NodeLoopScenarioId>("inside-io");
  const [index, setIndex] = useState(0);
  const scenario = NODE_LOOP_SCENARIOS[id];
  const step = scenario.steps[index];
  const slice = (Math.PI * 2) / NODE_PHASES.length;

  return (
    <div className="flex flex-col gap-4">
      <Segmented
        label="Scenario"
        value={id}
        options={[
          { value: "inside-io", label: "from an I/O callback" },
          { value: "inside-timer", label: "from a timer" },
        ]}
        onChange={(next) => {
          setId(next);
          setIndex(0);
        }}
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <CodeView code={scenario.code} active={step.lines} />
          <div className="bg-surface-3 border-flame min-h-16 rounded-r-lg border-l-2 px-3.5 py-2.5" aria-live="polite">
            <p className="text-bone m-0 text-[13px]/[1.65] text-pretty">
              <PrepText text={step.note} />
            </p>
          </div>
          <Stepper step={index} total={scenario.steps.length} onStep={setIndex} />
        </div>

        <div className="flex min-w-0 flex-col items-center gap-3">
          <svg
            viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
            className="w-full max-w-72"
            role="img"
            aria-label={`Event loop, current phase: ${step.phase === "main" ? "main module" : step.phase}`}
          >
            {NODE_PHASES.map((phase, phaseIndex) => {
              const start = phaseIndex * slice;
              const end = start + slice;
              const mid = start + slice / 2;
              const active = phase.id === step.phase;
              const labelRadius = (INNER + OUTER) / 2;
              return (
                <g key={phase.id}>
                  <path
                    d={segment({ start, end }) ?? undefined}
                    className={cn("transition-colors duration-300", active ? "fill-flame" : "fill-surface-4 stroke-line-3")}
                  />
                  <text
                    x={Math.sin(mid) * labelRadius}
                    y={-Math.cos(mid) * labelRadius}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn("font-mono text-[9.5px]", active ? "fill-ink font-semibold" : "fill-stone")}
                  >
                    {phase.label}
                  </text>
                </g>
              );
            })}
            <circle r={INNER - 10} className="fill-surface-2 stroke-line-2" />
            <text y={-22} textAnchor="middle" className="fill-slate font-mono text-[8.5px] uppercase">
              between callbacks
            </text>
            <text y={-6} textAnchor="middle" className={cn("font-mono text-[11px]", step.nextTicks.length ? "fill-salmon" : "fill-shadow")}>
              nextTick ×{step.nextTicks.length}
            </text>
            <text y={12} textAnchor="middle" className={cn("font-mono text-[11px]", step.microtasks.length ? "fill-mint" : "fill-shadow")}>
              promises ×{step.microtasks.length}
            </text>
            {step.phase === "main" ? (
              <text y={32} textAnchor="middle" className="fill-peach font-mono text-[9.5px]">
                running the main module
              </text>
            ) : null}
          </svg>
          <ul className="text-ash m-0 grid w-full list-none grid-cols-2 gap-x-3 gap-y-0.5 p-0 text-[11px] sm:grid-cols-3">
            {NODE_PHASES.map((phase) => (
              <li key={phase.id}>
                <span className={cn("font-mono", phase.id === step.phase ? "text-flame" : "text-stone")}>{phase.label}</span>: {phase.runs}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <LayoutGroup id={`node-loop-${id}`}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Lane title="Call stack" items={[...step.stack].reverse()} tone="stack" empty="empty" />
        <Lane title="Thread pool / OS" items={step.waiting} tone="waiting" empty="nothing pending" />
        <Lane title="nextTick queue" items={step.nextTicks} tone="stack" empty="empty" horizontal />
        <Lane title="Promise microtasks" items={step.microtasks} tone="micro" empty="empty" horizontal />
        <Lane title="Timers (setTimeout)" items={step.timers} tone="macro" empty="empty" horizontal />
        <Lane title="Check (setImmediate)" items={step.immediates} tone="macro" empty="empty" horizontal />
      </div>
      </LayoutGroup>
      <DemoConsole lines={step.console.map((text, lineIndex) => ({ id: lineIndex, text }))} />
    </div>
  );
}
