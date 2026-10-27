"use client";

/**
 * Build a pipeline from small pure functions and watch one value flow through
 * it. Switching to compose runs the same list right to left. The functions are
 * real; each box shows the value that came out of that step.
 */
import { useState } from "react";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { DemoButton, Segmented, Slider } from "./ui";

const FUNCTIONS = {
  square: { code: "v => v * v", run: (v: number) => v * v },
  double: { code: "v => v * 2", run: (v: number) => v * 2 },
  addOne: { code: "v => v + 1", run: (v: number) => v + 1 },
  negate: { code: "v => -v", run: (v: number) => -v },
  half: { code: "v => v / 2", run: (v: number) => v / 2 },
  abs: { code: "Math.abs", run: (v: number) => Math.abs(v) },
} as const;

type Name = keyof typeof FUNCTIONS;

const pipe = (...fns: ((v: number) => number)[]) => (x: number) => fns.reduce((value, fn) => fn(value), x);

export function PipeBuilder() {
  const [steps, setSteps] = useState<Name[]>(["square", "double", "addOne"]);
  const [input, setInput] = useState(3);
  const [mode, setMode] = useState<"pipe" | "compose">("pipe");

  const order = mode === "pipe" ? steps : [...steps].reverse();
  const values = order.reduce<number[]>((acc, name) => [...acc, FUNCTIONS[name].run(acc.at(-1) ?? input)], []);
  const result = pipe(...order.map((name) => FUNCTIONS[name].run))(input);

  function move(index: number, by: -1 | 1) {
    setSteps((current) => {
      const next = [...current];
      const target = index + by;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const call = `${mode}(${steps.join(", ")})(${input})`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Slider label="input" value={input} min={-5} max={10} onChange={setInput} className="w-44" />
        <Segmented
          label="Direction"
          value={mode}
          options={[
            { value: "pipe", label: "pipe (left → right)" },
            { value: "compose", label: "compose (right → left)" },
          ]}
          onChange={setMode}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(FUNCTIONS) as Name[]).map((name) => (
          <DemoButton key={name} onClick={() => setSteps((current) => (current.length >= 6 ? current : [...current, name]))} className="font-mono">
            + {name}
          </DemoButton>
        ))}
      </div>

      <p className="text-paper m-0 font-mono text-[13px] break-all">
        {call} <span className="text-slate">=</span> <span className="text-flame">{result}</span>
      </p>

      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        <li className="text-ash font-mono text-[12px]">
          input <span className="text-paper">{input}</span>
        </li>
        {order.map((name, index) => {
          const listIndex = mode === "pipe" ? index : steps.length - 1 - index;
          return (
            <li key={`${name}-${listIndex}`} className="border-line-3 bg-surface flex items-center gap-3 rounded-md border px-3 py-2">
              <span className="text-slate font-mono text-[11px]">{index + 1}</span>
              <span className="text-paper w-16 font-mono text-[12.5px]">{name}</span>
              <code className="text-stone hidden flex-1 font-mono text-[11.5px] sm:block">{FUNCTIONS[name].code}</code>
              <span className="text-flame ml-auto font-mono text-[13px] tabular-nums">→ {values[index]}</span>
              <span className="flex gap-1">
                <button type="button" aria-label={`Move ${name} earlier`} onClick={() => move(listIndex, -1)} className="text-slate hover:text-bone">
                  <ArrowUp className="size-3.5" />
                </button>
                <button type="button" aria-label={`Move ${name} later`} onClick={() => move(listIndex, 1)} className="text-slate hover:text-bone">
                  <ArrowDown className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${name}`}
                  onClick={() => setSteps((current) => current.filter((_, other) => other !== listIndex))}
                  className="text-slate hover:text-rust"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            </li>
          );
        })}
        {steps.length === 0 ? <li className="text-slate font-mono text-[12px]">No steps: pipe() returns the input unchanged.</li> : null}
      </ol>
    </div>
  );
}
