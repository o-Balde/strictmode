"use client";

/**
 * Steps through a short program and shows its scopes, the objects on the heap
 * and the console after each step. Values that changed since the previous step
 * are marked, so "what just happened" is the first thing the eye lands on.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PrepText } from "@components";
import { cn } from "@lib";
import { STEPPER_SCENARIOS, type Binding, type StepperScenarioId, type StepperStep } from "./stepper-scenarios";
import { CodeView, DemoConsole, Panel, Stepper } from "./ui";

/** Each heap object gets a colour, so a reference can be matched to its object at a glance. */
const REF_TONES = [
  { border: "border-flame", text: "text-flame" },
  { border: "border-binary", text: "text-binary-soft" },
  { border: "border-mint", text: "text-mint-soft" },
  { border: "border-clay", text: "text-clay" },
  { border: "border-salmon", text: "text-salmon" },
] as const;

type RefTone = (typeof REF_TONES)[number];

const NUMERALS = ["①", "②", "③", "④", "⑤", "⑥"];

export function CodeStepper({ scenario: id }: Readonly<{ scenario: StepperScenarioId }>) {
  const scenario = STEPPER_SCENARIOS[id];
  const [index, setIndex] = useState(0);
  const current = scenario.steps[index];
  const previous = scenario.steps[index - 1];

  // Number the heap objects in the order they first appear across the whole trace.
  const heapOrder = [...new Set(scenario.steps.flatMap((step) => (step.heap ?? []).map((object) => object.id)))];
  const tone = (heapId: string) => REF_TONES[heapOrder.indexOf(heapId) % REF_TONES.length];
  const numeral = (heapId: string) => NUMERALS[heapOrder.indexOf(heapId)] ?? "#";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-paper m-0 text-[13.5px] font-medium">{scenario.title}</p>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <CodeView code={scenario.code} active={current.lines} />
          <div className="bg-surface-3 border-flame min-h-16 rounded-r-lg border-l-2 px-3.5 py-2.5" aria-live="polite">
            <p className="text-bone m-0 text-[13px]/[1.65] text-pretty">
              <PrepText text={current.note} />
            </p>
          </div>
          <Stepper step={index} total={scenario.steps.length} onStep={setIndex} />
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <Panel title="Scopes (innermost first)">
            <div className="flex flex-col gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {current.scopes.map((scope) => (
                  <ScopeBox
                    key={scope.name}
                    name={scope.name}
                    note={scope.note}
                    vars={scope.vars}
                    previous={previous?.scopes.find((other) => other.name === scope.name)?.vars}
                    renderBinding={(binding) => <BindingValue binding={binding} tone={tone} numeral={numeral} />}
                  />
                ))}
              </AnimatePresence>
            </div>
          </Panel>

          {current.heap && current.heap.length > 0 ? (
            <Panel title="Heap objects">
              <div className="flex flex-wrap gap-2">
                {current.heap.map((object) => (
                  <div
                    key={object.id}
                    className={cn(
                      "min-w-28 rounded-md border-2 border-dashed px-2.5 py-2 transition-opacity",
                      tone(object.id).border,
                      object.unreachable && "opacity-40",
                    )}
                  >
                    <div className={cn("mb-1 font-mono text-[11px] font-semibold", tone(object.id).text)}>
                      {numeral(object.id)} {object.label}
                      {object.unreachable ? <span className="text-slate font-normal"> · unreachable</span> : null}
                    </div>
                    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-2 font-mono text-[11.5px]">
                      {object.fields.map((field) => (
                        <FieldRow
                          key={field.name}
                          name={field.name}
                          changed={changedField(previous, object.id, field.name, field.binding)}
                        >
                          <BindingValue binding={field.binding} tone={tone} numeral={numeral} />
                        </FieldRow>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {current.queue ? (
            <Panel title="Task queue">
              {current.queue.length === 0 ? (
                <p className="text-slate m-0 font-mono text-[11.5px]">empty</p>
              ) : (
                <ol className="m-0 flex list-none flex-col gap-1 p-0">
                  {current.queue.map((task, taskIndex) => (
                    <li key={`${taskIndex}-${task}`} className="border-line-3 text-bone rounded border px-2 py-1 font-mono text-[11px]">
                      {task}
                    </li>
                  ))}
                </ol>
              )}
            </Panel>
          ) : null}

          <DemoConsole lines={current.console.map((text, lineIndex) => ({ id: lineIndex, text }))} />
        </div>
      </div>
    </div>
  );
}

function changedField(previous: StepperStep | undefined, heapId: string, field: string, binding: Binding): boolean {
  if (!previous) return false;
  const before = previous.heap?.find((object) => object.id === heapId)?.fields.find((other) => other.name === field);
  return !before || !sameBinding(before.binding, binding);
}

function sameBinding(a: Binding, b: Binding): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "value" && b.kind === "value") return a.value === b.value;
  if (a.kind === "ref" && b.kind === "ref") return a.to === b.to;
  return true;
}

interface ScopeBoxProps {
  name: string;
  note?: string;
  vars: { name: string; binding: Binding }[];
  previous?: { name: string; binding: Binding }[];
  renderBinding: (binding: Binding) => React.ReactNode;
}

function ScopeBox({ name, note, vars, previous, renderBinding }: Readonly<ScopeBoxProps>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
      className="border-line-3 bg-surface rounded-md border px-2.5 py-2"
    >
      <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
        <span className="text-paper font-mono text-[11.5px] font-semibold">{name}</span>
        {note ? <span className="text-clay text-[11px]">{note}</span> : null}
      </div>
      {vars.length === 0 ? (
        <p className="text-slate m-0 font-mono text-[11px]">no bindings</p>
      ) : (
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 font-mono text-[12px]/[1.7]">
          {vars.map((variable) => {
            const before = previous?.find((other) => other.name === variable.name);
            const changed = previous !== undefined && (!before || !sameBinding(before.binding, variable.binding));
            return (
              <FieldRow key={variable.name} name={variable.name} changed={changed}>
                {renderBinding(variable.binding)}
              </FieldRow>
            );
          })}
        </dl>
      )}
    </motion.div>
  );
}

function FieldRow({ name, changed, children }: Readonly<{ name: string; changed: boolean; children: React.ReactNode }>) {
  return (
    <>
      <dt className="text-stone">{name}</dt>
      <dd className={cn("m-0 rounded px-1 transition-colors", changed ? "bg-flame/20 text-paper" : undefined)}>{children}</dd>
    </>
  );
}

function BindingValue({
  binding,
  tone,
  numeral,
}: Readonly<{ binding: Binding; tone: (id: string) => RefTone; numeral: (id: string) => string }>) {
  if (binding.kind === "tdz") return <span className="text-rust italic">uninitialised (TDZ)</span>;
  if (binding.kind === "value") return <span className="text-[var(--code-string)]">{binding.value}</span>;
  const { border, text } = tone(binding.to);
  return (
    <span className={cn("inline-flex items-center gap-1 rounded border px-1.5 text-[11px]", border, text)}>
      → {numeral(binding.to)}
    </span>
  );
}

