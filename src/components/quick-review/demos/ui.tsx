"use client";

/**
 * The controls every demo is built from, so forty demos read as one family:
 * buttons, segmented choices, sliders, switches, a console and a code view.
 * Colours come from the app's tokens; nothing here knows about any one demo.
 */
import { useId } from "react";
import { cn } from "@lib";

export const DEMO_LABEL = "text-slate font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase";

export interface DemoButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  tone?: "default" | "primary" | "danger";
}

export function DemoButton({ tone = "default", className, type = "button", ...props }: Readonly<DemoButtonProps>) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
        tone === "primary" && "bg-flame border-flame text-ink hover:opacity-90",
        tone === "danger" && "border-rust-line text-rust hover:bg-rust-bg",
        tone === "default" && "border-line-3 text-bone hover:border-line-2 hover:bg-surface-4",
        className,
      )}
      {...props}
    />
  );
}

export interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: readonly { value: T; label: React.ReactNode }[];
  onChange: (value: T) => void;
  className?: string;
}

/** A row of mutually exclusive choices. */
export function Segmented<T extends string>({ label, value, options, onChange, className }: Readonly<SegmentedProps<T>>) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex flex-wrap gap-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md px-2.5 py-1.5 font-mono text-[11.5px] font-medium transition-colors",
            option.value === value ? "bg-flame text-ink" : "border-line-2 text-stone hover:text-bone border",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({ label, value, min, max, step = 1, unit = "", onChange, className }: Readonly<SliderProps>) {
  const id = useId();
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <label htmlFor={id} className="text-ash flex items-baseline justify-between gap-3 text-[12px]">
        <span>{label}</span>
        <span className="text-bone font-mono text-[11.5px] tabular-nums">
          {value}
          {unit}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-flame w-full"
      />
    </div>
  );
}

export interface SwitchProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Switch({ label, checked, onChange, className }: Readonly<SwitchProps>) {
  return (
    <label className={cn("text-bone inline-flex cursor-pointer items-center gap-2 text-[12.5px]", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-flame size-3.5"
      />
      {label}
    </label>
  );
}

export interface ConsoleLine {
  id: number;
  text: string;
  tone?: "default" | "dim" | "warn" | "error" | "accent";
}

/** Output set like a terminal, the way the rest of the app sets console output. */
export function DemoConsole({
  lines,
  empty = "Nothing logged yet.",
  className,
  title = "console",
}: Readonly<{ lines: readonly ConsoleLine[]; empty?: string; className?: string; title?: string }>) {
  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <figcaption className="mb-1.5 flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.12em] text-[#28fe14]/70 uppercase">
        <span aria-hidden className="h-px w-3 bg-[#28fe14]/40" />
        {title}
      </figcaption>
      <div
        data-skin="terminal"
        role="log"
        aria-live="polite"
        className="scrollbar-hairline max-h-56 min-h-14 overflow-auto rounded-[7px] border border-[#123c0c] bg-[var(--term-bg)] px-3.5 py-2.5"
      >
        {lines.length === 0 ? (
          <p className="m-0 font-mono text-[12.5px] text-[var(--term-dim)]">{empty}</p>
        ) : (
          <ol className="m-0 flex list-none flex-col gap-0.5 p-0 font-mono text-[12.5px]/[1.6]">
            {lines.map((line) => (
              <li
                key={line.id}
                className={cn(
                  "break-words whitespace-pre-wrap",
                  (line.tone ?? "default") === "default" && "text-[var(--term-fg)]",
                  line.tone === "dim" && "text-[var(--term-dim)]",
                  line.tone === "warn" && "text-[#f1fa8c]",
                  line.tone === "error" && "text-[#ff6e6e]",
                  line.tone === "accent" && "text-[#8be9fd]",
                )}
              >
                {line.text}
              </li>
            ))}
          </ol>
        )}
      </div>
    </figure>
  );
}

let nextLineId = 1;

/** A console line with an id that is unique for the page's lifetime. */
export function line(text: string, tone?: ConsoleLine["tone"]): ConsoleLine {
  return { id: nextLineId++, text, tone };
}

// ── Code ────────────────────────────────────────────────────────────────────

const KEYWORDS = new Set(
  "const let var function return if else for while do new class extends super this typeof instanceof in of await async yield try catch finally throw null undefined true false import from export default static break continue switch case".split(
    " ",
  ),
);

type Token = { kind: "k" | "s" | "n" | "c" | "f" | "x"; text: string };

const TOKEN = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?n?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+|.)/g;

/** A small JavaScript tokenizer for the demos' code views, where Shiki would be overkill. */
export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  for (const match of code.matchAll(TOKEN)) {
    const [text, comment, string, number, call, word] = match;
    if (comment) tokens.push({ kind: "c", text });
    else if (string) tokens.push({ kind: "s", text });
    else if (number) tokens.push({ kind: "n", text });
    else if (call) tokens.push({ kind: KEYWORDS.has(call) ? "k" : "f", text });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "k" : "x", text });
    else tokens.push({ kind: "x", text });
  }
  return tokens;
}

export interface CodeViewProps {
  code: string;
  /** 1-based lines to mark as the current step. */
  active?: readonly number[];
  className?: string;
}

/** Source set like an editor, with line numbers and the current line marked. */
export function CodeView({ code, active = [], className }: Readonly<CodeViewProps>) {
  const lines = code.split("\n");
  return (
    <div className={cn("border-line-4 bg-well scrollbar-hairline overflow-x-auto rounded-[7px] border", className)}>
      <pre className="m-0 w-max min-w-full py-2.5 font-mono text-[12.5px]/[1.75]" style={{ color: "var(--code-plain)" }}>
        {lines.map((text, index) => {
          const current = active.includes(index + 1);
          return (
            <div
              key={index}
              className={cn("flex pr-4", current ? "bg-flame/12 shadow-[inset_2px_0_0_var(--flame)]" : undefined)}
            >
              <span aria-hidden className="text-slate w-9 shrink-0 pr-3 text-right select-none">
                {index + 1}
              </span>
              <code>
                {tokenize(text).map((token, tokenIndex) =>
                  token.kind === "x" ? (
                    <span key={tokenIndex}>{token.text}</span>
                  ) : (
                    <span key={tokenIndex} className={`tk-${token.kind}`}>
                      {token.text}
                    </span>
                  ),
                )}
                {text === "" ? " " : null}
              </code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/** A small labelled box for grouping a demo's pieces. */
export function Panel({ title, children, className }: Readonly<{ title: React.ReactNode; children: React.ReactNode; className?: string }>) {
  return (
    <section className={cn("border-line-2 bg-surface-2 min-w-0 rounded-lg border p-3", className)}>
      <h4 className={cn(DEMO_LABEL, "m-0 mb-2")}>{title}</h4>
      {children}
    </section>
  );
}

/** A step-through bar: previous, next, a position readout, and reset. */
export function Stepper({
  step,
  total,
  onStep,
  playing,
  onPlay,
}: Readonly<{ step: number; total: number; onStep: (step: number) => void; playing?: boolean; onPlay?: () => void }>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DemoButton onClick={() => onStep(0)} disabled={step === 0} aria-label="First step">
        ⏮
      </DemoButton>
      <DemoButton onClick={() => onStep(step - 1)} disabled={step === 0}>
        ← Back
      </DemoButton>
      <DemoButton tone="primary" onClick={() => onStep(step + 1)} disabled={step >= total - 1}>
        Next step →
      </DemoButton>
      {onPlay ? (
        <DemoButton onClick={onPlay} disabled={step >= total - 1 && !playing}>
          {playing ? "Pause" : "Play"}
        </DemoButton>
      ) : null}
      <span className="text-ash font-mono text-[11.5px] tabular-nums">
        step {step + 1} / {total}
      </span>
    </div>
  );
}
