"use client";

/**
 * Three demos about values, all computed live by this browser's own engine:
 * the loose/strict equality grid, a table of how values convert, and the
 * short-circuit operators (with what React renders for `count && ...`).
 */
import { useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, Panel, Segmented } from "./ui";

interface Sample {
  label: string;
  make: () => unknown;
}

/** Factories, so every comparison gets fresh objects, as two literals would. */
const EQUALITY_VALUES: Sample[] = [
  { label: "true", make: () => true },
  { label: "false", make: () => false },
  { label: "1", make: () => 1 },
  { label: "0", make: () => 0 },
  { label: "-1", make: () => -1 },
  { label: '"true"', make: () => "true" },
  { label: '"false"', make: () => "false" },
  { label: '"1"', make: () => "1" },
  { label: '"0"', make: () => "0" },
  { label: '"-1"', make: () => "-1" },
  { label: '""', make: () => "" },
  { label: "null", make: () => null },
  { label: "undefined", make: () => undefined },
  { label: "Infinity", make: () => Infinity },
  { label: "-Infinity", make: () => -Infinity },
  { label: "[]", make: () => [] },
  { label: "{}", make: () => ({}) },
  { label: "[[]]", make: () => [[]] },
  { label: "[0]", make: () => [0] },
  { label: "[1]", make: () => [1] },
  { label: "NaN", make: () => NaN },
];

type Operator = "==" | "===" | "Object.is";

function compare(operator: Operator, a: unknown, b: unknown): boolean {
  if (operator === "==") return a == b;
  if (operator === "===") return a === b;
  return Object.is(a, b);
}

export function EqualityTable() {
  const [operator, setOperator] = useState<Operator>("==");
  const [hover, setHover] = useState<[number, number] | null>(null);
  const count = EQUALITY_VALUES.reduce(
    (total, row) => total + EQUALITY_VALUES.filter((column) => compare(operator, row.make(), column.make())).length,
    0,
  );
  const hovered = hover ? [EQUALITY_VALUES[hover[0]], EQUALITY_VALUES[hover[1]]] : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          label="Operator"
          value={operator}
          options={[
            { value: "==", label: "==" },
            { value: "===", label: "===" },
            { value: "Object.is", label: "Object.is" },
          ]}
          onChange={setOperator}
        />
        <span className="text-ash font-mono text-[12px]">{count} of {EQUALITY_VALUES.length ** 2} pairs are equal</span>
      </div>
      <p className="text-bone m-0 min-h-5 font-mono text-[12.5px]" aria-live="polite">
        {hovered
          ? `${hovered[0].label} ${operator === "Object.is" ? "≡" : operator} ${hovered[1].label}  →  ${compare(operator, hovered[0].make(), hovered[1].make())}`
          : "Hover or focus a cell."}
      </p>
      <div className="scrollbar-hairline overflow-x-auto pb-1">
        <table className="border-collapse font-mono text-[10px]">
          <thead>
            <tr>
              <th />
              {EQUALITY_VALUES.map((value, column) => (
                <th key={value.label} scope="col" className={cn("h-16 w-5 align-bottom", hover?.[1] === column && "text-flame")}>
                  <span className="text-stone inline-block origin-bottom-left translate-x-2.5 -rotate-60 whitespace-nowrap">{value.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EQUALITY_VALUES.map((rowValue, row) => (
              <tr key={rowValue.label}>
                <th scope="row" className={cn("text-stone pr-2 text-right font-normal whitespace-nowrap", hover?.[0] === row && "text-flame")}>
                  {rowValue.label}
                </th>
                {EQUALITY_VALUES.map((columnValue, column) => {
                  const equal = compare(operator, rowValue.make(), columnValue.make());
                  return (
                    <td key={columnValue.label} className="p-px">
                      <button
                        type="button"
                        aria-label={`${rowValue.label} ${operator} ${columnValue.label} is ${equal}`}
                        onMouseEnter={() => setHover([row, column])}
                        onFocus={() => setHover([row, column])}
                        className={cn(
                          "block size-4.5 rounded-[3px] transition-colors",
                          equal ? (row === column ? "bg-mint" : "bg-flame") : "bg-surface-4 hover:bg-line-3",
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Green marks a value compared with itself; with <code className="prep-code">[]</code> and <code className="prep-code">{"{}"}</code> those are still
        two different objects, so they stay grey. Orange is equality between <em>different</em> values.
      </p>
    </div>
  );
}

// ── Conversions ──────────────────────────────────────────────────────────────

const INSPECT_VALUES: Sample[] = [
  { label: "0", make: () => 0 },
  { label: "-0", make: () => -0 },
  { label: "1", make: () => 1 },
  { label: "NaN", make: () => NaN },
  { label: "0n", make: () => 0n },
  { label: '""', make: () => "" },
  { label: '" "', make: () => " " },
  { label: '"0"', make: () => "0" },
  { label: '"false"', make: () => "false" },
  { label: '"42px"', make: () => "42px" },
  { label: "false", make: () => false },
  { label: "true", make: () => true },
  { label: "null", make: () => null },
  { label: "undefined", make: () => undefined },
  { label: "[]", make: () => [] },
  { label: "[5]", make: () => [5] },
  { label: "[1, 2]", make: () => [1, 2] },
  { label: "{}", make: () => ({}) },
  { label: "() => {}", make: () => () => {} },
  { label: 'Symbol("id")', make: () => Symbol("id") },
  { label: "new Date(0)", make: () => new Date(0) },
  { label: "new Boolean(false)", make: () => new Boolean(false) },
];

function attempt(fn: () => string): string {
  try {
    return fn();
  } catch (error) {
    return error instanceof Error ? error.name : "error";
  }
}

const show = (value: unknown): string => {
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(show).join(", ")}]`;
  if (typeof value === "function") return "ƒ";
  if (typeof value === "object" && value !== null && !(value instanceof Date)) return "{…}";
  if (Object.is(value, -0)) return "-0";
  if (typeof value === "bigint") return `${value}n`;
  return String(value);
};

const COLUMNS: { label: string; compute: (value: unknown) => string }[] = [
  { label: "typeof", compute: (value) => typeof value },
  { label: "Boolean(x)", compute: (value) => String(Boolean(value)) },
  { label: "Number(x)", compute: (value) => attempt(() => show(Number(value))) },
  { label: "String(x)", compute: (value) => attempt(() => JSON.stringify(String(value))) },
  { label: "toString tag", compute: (value) => Object.prototype.toString.call(value).slice(8, -1) },
  { label: "x == null", compute: (value) => String(value == null) },
];

export function ValueInspector() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="scrollbar-hairline overflow-x-auto">
        <table className="w-full min-w-152 border-collapse text-left font-mono text-[11.5px]">
          <thead>
            <tr className="bg-surface-4">
              <th scope="col" className="text-ash px-2.5 py-2 font-medium">value</th>
              {COLUMNS.map((column) => (
                <th key={column.label} scope="col" className="text-ash px-2.5 py-2 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INSPECT_VALUES.map((sample, index) => {
              const value = sample.make();
              const falsy = !value;
              return (
                <tr
                  key={sample.label}
                  onClick={() => setSelected(index === selected ? null : index)}
                  className={cn("border-line cursor-pointer border-t transition-colors", index === selected ? "bg-flame-deep" : "hover:bg-surface-3")}
                >
                  <th scope="row" className="text-paper px-2.5 py-1.5 font-normal whitespace-nowrap">
                    {sample.label}
                  </th>
                  {COLUMNS.map((column) => {
                    const result = column.compute(value);
                    return (
                      <td
                        key={column.label}
                        className={cn(
                          "px-2.5 py-1.5 whitespace-nowrap",
                          column.label === "Boolean(x)" && (falsy ? "text-rust" : "text-mint-soft"),
                          result === "TypeError" ? "text-rust italic" : column.label !== "Boolean(x)" && "text-bone",
                        )}
                      >
                        {result}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Every cell is computed by this browser. Note <code className="prep-code">new Boolean(false)</code>: an object, so truthy;{" "}
        <code className="prep-code">Number(&quot; &quot;)</code> is 0; and <code className="prep-code">Number(Symbol())</code> throws.
      </p>
    </div>
  );
}

// ── Short-circuit ────────────────────────────────────────────────────────────

const OPERANDS: Sample[] = [
  { label: "0", make: () => 0 },
  { label: '""', make: () => "" },
  { label: "null", make: () => null },
  { label: "undefined", make: () => undefined },
  { label: "NaN", make: () => NaN },
  { label: "false", make: () => false },
  { label: "1", make: () => 1 },
  { label: '"text"', make: () => "text" },
  { label: "[]", make: () => [] },
];

type Logical = "&&" | "||" | "??";

export function ShortCircuit() {
  const [left, setLeft] = useState(0);
  const [operator, setOperator] = useState<Logical>("&&");
  const [count, setCount] = useState(0);

  let rightRan = false;
  const right = () => {
    rightRan = true;
    return "right";
  };
  const leftValue = OPERANDS[left].make();
  const result = operator === "&&" ? leftValue && right() : operator === "||" ? leftValue || right() : leftValue ?? right();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Which operand comes back?">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1">
            {OPERANDS.map((operand, index) => (
              <button
                key={operand.label}
                type="button"
                aria-pressed={index === left}
                onClick={() => setLeft(index)}
                className={cn(
                  "rounded-md border px-2 py-1 font-mono text-[11.5px] transition-colors",
                  index === left ? "border-flame bg-flame text-ink" : "border-line-2 text-stone hover:text-bone",
                )}
              >
                {operand.label}
              </button>
            ))}
          </div>
          <Segmented
            label="Operator"
            value={operator}
            options={[
              { value: "&&", label: "&&" },
              { value: "||", label: "||" },
              { value: "??", label: "??" },
            ]}
            onChange={setOperator}
          />
          <p className="text-paper m-0 font-mono text-[14px]">
            {OPERANDS[left].label} {operator} right() <span className="text-slate">→</span>{" "}
            <span className="text-flame">{show(result)}</span>
          </p>
          <p className={cn("m-0 font-mono text-[12px]", rightRan ? "text-mint-soft" : "text-rust")}>
            {rightRan ? "right() ran: the left side didn't decide the result" : "right() never ran: short-circuited"}
          </p>
        </div>
      </Panel>
      <Panel title="What React renders">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-ash text-[12px]">count =</span>
            <button type="button" className="border-line-3 text-bone rounded border px-2 font-mono" onClick={() => setCount((value) => Math.max(0, value - 1))}>
              −
            </button>
            <span className="text-paper w-6 text-center font-mono">{count}</span>
            <button type="button" className="border-line-3 text-bone rounded border px-2 font-mono" onClick={() => setCount((value) => value + 1)}>
              +
            </button>
          </div>
          <Rendered label="{count && <Badge />}">{count && <Badge count={count} />}</Rendered>
          <Rendered label="{count > 0 && <Badge />}">{count > 0 && <Badge count={count} />}</Rendered>
          <Rendered label="{count ? <Badge /> : null}">{count ? <Badge count={count} /> : null}</Rendered>
          <p className="text-ash m-0 text-[12px]/[1.55]">
            At 0, the first line renders a stray &quot;0&quot;: React renders numbers, and 0 is what{" "}
            <code className="prep-code">&amp;&amp;</code> returned.
          </p>
        </div>
      </Panel>
    </div>
  );
}

function Badge({ count }: Readonly<{ count: number }>) {
  return <span className="bg-flame text-ink rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold">{count} new</span>;
}

function Rendered({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <code className={cn(DEMO_LABEL, "normal-case")}>{label}</code>
      <span className="border-line-3 bg-surface grid min-h-8 min-w-24 place-items-center rounded border border-dashed px-2 font-mono text-[12px] text-bone">
        {children}
      </span>
    </div>
  );
}
