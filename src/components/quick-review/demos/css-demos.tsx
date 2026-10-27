"use client";

/**
 * The CSS demos that render real CSS and read the result back: specificity
 * (with the browser validating each selector), flexbox columns, sibling
 * combinators, sprites and focus rings. Nothing here is simulated except
 * the specificity arithmetic, which is tested in verify:prep.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@lib";
import { compareSpecificity, specificityOf, splitList, type Breakdown } from "./specificity";
import { DEMO_LABEL, DemoButton, DemoConsole, Segmented, Slider, line, type ConsoleLine } from "./ui";

// ── Specificity ──────────────────────────────────────────────────────────────

const COLUMN_TONE = { A: "border-flame text-flame", B: "border-binary text-binary-soft", C: "border-mint text-mint-soft", none: "border-line-3 text-slate" } as const;

function validSelector(selector: string): boolean {
  try {
    document.createDocumentFragment().querySelector(selector);
    return true;
  } catch {
    return false;
  }
}

function SelectorInput({ label, value, onChange, breakdown, winner }: Readonly<{ label: string; value: string; onChange: (value: string) => void; breakdown: Breakdown | null; winner: boolean }>) {
  const valid = value.trim() !== "" && validSelector(value);
  return (
    <div className={cn("border-line-2 bg-surface-2 flex flex-col gap-2 rounded-lg border p-3", winner && "border-mint-line")}>
      <label className="flex flex-col gap-1">
        <span className={DEMO_LABEL}>{label}</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className={cn("bg-well text-paper rounded-md border px-2.5 py-1.5 font-mono text-[13px] outline-none", valid ? "border-line-3 focus:border-flame" : "border-rust-line")}
        />
      </label>
      {!valid ? (
        <p className="text-rust m-0 text-[12px]">This browser rejects it as a selector.</p>
      ) : breakdown ? (
        <>
          <div className="flex items-center gap-2 font-mono">
            {(["A", "B", "C"] as const).map((column, index) => (
              <span key={column} className={cn("rounded-md border px-2.5 py-1 text-[15px] font-semibold tabular-nums", COLUMN_TONE[column])}>
                {breakdown.specificity[index]}
              </span>
            ))}
            {winner ? <span className="text-mint-soft ml-1 text-[12px]">wins</span> : null}
          </div>
          <div className="flex flex-wrap gap-1">
            {breakdown.parts.map((part, index) => (
              <span key={index} className={cn("rounded border px-1.5 py-0.5 font-mono text-[11px]", COLUMN_TONE[part.column])}>
                {part.text}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function SpecificityCalculator() {
  const [first, setFirst] = useState("#nav .link:hover");
  const [second, setSecond] = useState("nav ul li a.link.active.current");
  const breakdown = (selector: string) => {
    if (!selector.trim() || !validSelector(selector)) return null;
    const list = splitList(selector).map(specificityOf);
    return list.reduce((best, current) => (compareSpecificity(current.specificity, best.specificity) > 0 ? current : best));
  };
  const a = breakdown(first);
  const b = breakdown(second);
  const order = a && b ? compareSpecificity(a.specificity, b.specificity) : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <SelectorInput label="selector 1" value={first} onChange={setFirst} breakdown={a} winner={order > 0} />
        <SelectorInput label="selector 2" value={second} onChange={setSecond} breakdown={b} winner={order < 0} />
      </div>
      <p className="text-bone m-0 text-[13px]" aria-live="polite">
        {!a || !b
          ? "Type two valid selectors."
          : order === 0
            ? "A tie: the rule that comes later in the stylesheet wins."
            : `Selector ${order > 0 ? 1 : 2} wins. Columns are compared left to right: the first column that differs decides, however large the later ones are.`}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {[":where(#app) .btn", ":is(#app, .x) .btn", "a:not(#a, .b)", "li:nth-child(2 of .done)", "p::first-line", "*"].map((example) => (
          <DemoButton key={example} onClick={() => setSecond(example)} className="font-mono">
            {example}
          </DemoButton>
        ))}
      </div>
      <p className="text-ash m-0 text-[12px]">
        <span className="text-flame">A</span> IDs · <span className="text-binary-soft">B</span> classes, attributes, pseudo-classes ·{" "}
        <span className="text-mint-soft">C</span> types, pseudo-elements. A selector list scores as its most specific item.
      </p>
    </div>
  );
}

// ── Flexbox columns ──────────────────────────────────────────────────────────

export function FlexPlayground() {
  const [spans, setSpans] = useState([2, 7, 3]);
  const [mode, setMode] = useState<"grow" | "width">("grow");
  const [gap, setGap] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<number[]>([]);
  const [rowWidth, setRowWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      setWidths(refs.current.map((element) => element?.getBoundingClientRect().width ?? 0));
      setRowWidth(rowRef.current?.getBoundingClientRect().width ?? 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [spans, mode, gap]);

  const total = spans.reduce((sum, value) => sum + value, 0);
  const styleOf = (span: number): React.CSSProperties => (mode === "grow" ? { flex: span } : { flex: "0 0 auto", width: `calc(${span} / 12 * 100%)` });
  const overflow = widths.reduce((sum, width) => sum + width, 0) + gap * (spans.length - 1) - rowWidth;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Segmented
          label="Approach"
          value={mode}
          options={[
            { value: "grow", label: "flex: n" },
            { value: "width", label: "width: n/12" },
          ]}
          onChange={setMode}
        />
        <Slider label="gap" value={gap} min={0} max={32} step={4} unit="px" onChange={setGap} className="w-36" />
        {spans.map((span, index) => (
          <Slider
            key={index}
            label={`col ${index + 1} n`}
            value={span}
            min={1}
            max={12}
            onChange={(value) => setSpans((current) => current.map((other, at) => (at === index ? value : other)))}
            className="w-28"
          />
        ))}
      </div>
      <div className="border-line-3 overflow-hidden rounded-md border border-dashed p-1.5">
        <div ref={rowRef} className="flex" style={{ gap }}>
          {spans.map((span, index) => (
            <div
              key={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
              className={cn("min-w-0 rounded px-2 py-3 text-center font-mono text-[11.5px]", ["bg-flame-deep text-peach", "bg-binary-deep text-binary-soft", "bg-mint-deep text-mint-soft"][index])}
              style={styleOf(span)}
            >
              col-{span}
              <br />
              {Math.round(widths[index] ?? 0)}px
            </div>
          ))}
        </div>
      </div>
      <pre className="border-line-4 bg-well text-bone m-0 overflow-x-auto rounded-md border px-3 py-2 font-mono text-[12px]">
        {`.row { display: flex;${gap ? ` gap: ${gap}px;` : ""} }\n` +
          spans.map((span) => (mode === "grow" ? `.col-${span} { flex: ${span}; }` : `.col-${span} { flex: 0 0 auto; width: calc(${span} / 12 * 100%); }`)).join("\n")}
      </pre>
      <p className={cn("m-0 text-[12px]/[1.6]", overflow > 1 ? "text-rust" : "text-ash")}>
        {mode === "grow"
          ? `The columns share the space in the ratio ${spans.join(" : ")} (n out of ${total}${total === 12 ? ", which is n/12" : `, not 12: the ratio no longer equals n/12`}), and the gap is absorbed.`
          : overflow > 1
            ? `The fixed widths plus ${gap * (spans.length - 1)}px of gaps overflow the row by ${Math.round(overflow)}px.`
            : `Each column is exactly n/12 of the row${total < 12 ? `, leaving ${12 - total}/12 empty` : ""}.`}
      </p>
    </div>
  );
}

// ── Sibling combinators ──────────────────────────────────────────────────────

type Tag = "h2" | "p" | "div" | "span";
const TAGS: Tag[] = ["h2", "p", "div", "span"];

export function SiblingSelectors() {
  const [items, setItems] = useState<Tag[]>(["p", "h2", "p", "p", "div", "p", "span", "p"]);
  const [selector, setSelector] = useState("h2 + p");
  const containerRef = useRef<HTMLDivElement>(null);
  const [matches, setMatches] = useState<boolean[]>([]);
  const [valid, setValid] = useState(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    try {
      const matched = new Set(container.querySelectorAll(`:scope > :is(${selector})`));
      setMatches([...container.children].map((child) => matched.has(child)));
      setValid(true);
    } catch {
      setValid(false);
      setMatches([]);
    }
  }, [items, selector]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {["h2 + p", "h2 ~ p", "div + p", "p + p", "h2 ~ *", "p:has(+ div)"].map((option) => (
          <DemoButton key={option} onClick={() => setSelector(option)} className={cn("font-mono", option === selector && "border-flame text-paper")}>
            {option}
          </DemoButton>
        ))}
        <input
          value={selector}
          onChange={(event) => setSelector(event.target.value)}
          aria-label="Custom selector"
          spellCheck={false}
          className={cn("bg-well text-paper w-40 rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] outline-none", valid ? "border-line-3 focus:border-flame" : "border-rust-line")}
        />
      </div>
      <div ref={containerRef} className="flex flex-wrap gap-1.5" aria-label="Siblings inside one parent">
        {items.map((tag, index) => {
          const Element = tag;
          const matched = matches[index];
          return (
            <Element
              key={index}
              className={cn(
                "m-0 flex h-12 w-14 items-center justify-center rounded-md border font-mono text-[12px] font-normal transition-colors",
                matched ? "border-flame bg-flame text-ink" : "border-line-3 bg-surface-3 text-stone",
              )}
            >
              <button
                type="button"
                onClick={() => setItems((current) => current.map((other, at) => (at === index ? TAGS[(TAGS.indexOf(other) + 1) % TAGS.length] : other)))}
                aria-label={`Sibling ${index + 1}: ${tag}${matched ? ", matched" : ""}. Change its element type`}
                className="size-full cursor-pointer"
              >
                {tag}
              </button>
            </Element>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <DemoButton onClick={() => setItems((current) => [...current, "p"])}>Add a p</DemoButton>
        <DemoButton onClick={() => setItems((current) => current.slice(0, -1))} disabled={items.length <= 2}>
          Remove the last
        </DemoButton>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        These are real <code className="prep-code">h2</code>, <code className="prep-code">p</code>, <code className="prep-code">div</code> and{" "}
        <code className="prep-code">span</code> elements in one parent, matched with <code className="prep-code">querySelectorAll</code>. Click one to change its
        type. Neither combinator ever looks backwards; <code className="prep-code">:has()</code> is how you select by what follows.
      </p>
    </div>
  );
}

// ── Sprites ──────────────────────────────────────────────────────────────────

const ICON = 32;
const ICONS = [
  { name: "home", path: "M6 16 L16 7 L26 16 M9 14 V25 H23 V14" },
  { name: "search", path: "M14 8 a6 6 0 1 0 0.01 0 M18.5 18.5 L25 25" },
  { name: "user", path: "M16 8 a4.5 4.5 0 1 0 0.01 0 M8 25 C9 19 23 19 24 25" },
  { name: "heart", path: "M16 24 C6 17 7 9 12 9 C14.5 9 16 11 16 12 C16 11 17.5 9 20 9 C25 9 26 17 16 24 Z" },
  { name: "star", path: "M16 6 L19 13 L26 13.5 L20.5 18 L22.5 25 L16 21 L9.5 25 L11.5 18 L6 13.5 L13 13 Z" },
  { name: "bell", path: "M10 21 V15 C10 11 13 9 16 9 C19 9 22 11 22 15 V21 L24 23 H8 Z M14 25 H18" },
  { name: "mail", path: "M7 10 H25 V23 H7 Z M7 10 L16 17 L25 10" },
  { name: "gear", path: "M16 12 a4 4 0 1 0 0.01 0 M16 6 V9 M16 23 V26 M6 16 H9 M23 16 H26 M9 9 L11 11 M21 21 L23 23 M23 9 L21 11 M9 23 L11 21" },
];
const COLUMNS = 4;

const SHEET_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON * COLUMNS}" height="${ICON * 2}" viewBox="0 0 ${ICON * COLUMNS} ${ICON * 2}">${ICONS.map(
  (icon, index) =>
    `<g transform="translate(${(index % COLUMNS) * ICON} ${Math.floor(index / COLUMNS) * ICON})"><rect width="32" height="32" fill="#1e1b19"/><path d="${icon.path}" fill="none" stroke="#e4572e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`,
).join("")}</svg>`;
const SHEET_URL = `data:image/svg+xml,${encodeURIComponent(SHEET_SVG)}`;

export function SpriteSheet() {
  const [selected, setSelected] = useState(1);
  const reduced = useReducedMotion();
  const x = (selected % COLUMNS) * ICON;
  const y = Math.floor(selected / COLUMNS) * ICON;
  const SCALE = 2;

  return (
    <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="flex flex-col gap-2">
        <span className={DEMO_LABEL}>the sheet: one image, {ICONS.length} icons</span>
        <div className="relative" style={{ width: ICON * COLUMNS * SCALE, height: ICON * 2 * SCALE }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- a data: URI sprite sheet, nothing to optimise */}
          <img src={SHEET_URL} alt="" width={ICON * COLUMNS * SCALE} height={ICON * 2 * SCALE} className="rounded" style={{ imageRendering: "auto" }} />
          <motion.div
            aria-hidden
            className="border-flame pointer-events-none absolute rounded-sm border-2 shadow-[0_0_0_9999px_rgba(12,11,10,0.55)]"
            style={{ width: ICON * SCALE, height: ICON * SCALE, left: 0, top: 0 }}
            animate={{ x: x * SCALE, y: y * SCALE }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {ICONS.map((icon, index) => (
            <DemoButton key={icon.name} onClick={() => setSelected(index)} aria-pressed={index === selected} className={cn("font-mono", index === selected && "border-flame text-paper")}>
              {icon.name}
            </DemoButton>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <span className={DEMO_LABEL}>the element: a 32×32 window onto the sheet</span>
        <div className="flex items-center gap-4">
          <div
            role="img"
            aria-label={ICONS[selected].name}
            className="border-line-3 rounded border"
            style={{ width: ICON, height: ICON, backgroundImage: `url("${SHEET_URL}")`, backgroundPosition: `-${x}px -${y}px`, backgroundRepeat: "no-repeat" }}
          />
          <div
            aria-hidden
            className="border-line-3 rounded border"
            style={{ width: ICON * SCALE, height: ICON * SCALE, backgroundImage: `url("${SHEET_URL}")`, backgroundPosition: `-${x * SCALE}px -${y * SCALE}px`, backgroundSize: `${ICON * COLUMNS * SCALE}px ${ICON * 2 * SCALE}px`, backgroundRepeat: "no-repeat" }}
          />
          <span className="text-ash text-[12px]">actual size, and 2× with background-size</span>
        </div>
        <pre className="border-line-4 bg-well text-bone m-0 overflow-x-auto rounded-md border px-3 py-2 font-mono text-[12px]">
          {`.icon-${ICONS[selected].name} {\n  width: 32px;\n  height: 32px;\n  background: url("icons.svg") no-repeat;\n  background-position: ${x ? `-${x}px` : 0} ${y ? `-${y}px` : 0};\n}`}
        </pre>
      </div>
    </div>
  );
}

// ── Focus rings ──────────────────────────────────────────────────────────────

export function FocusRing() {
  const [log, setLog] = useState<ConsoleLine[]>([]);
  const [lastPointer, setLastPointer] = useState(false);

  useEffect(() => {
    const onPointer = () => setLastPointer(true);
    const onKey = () => setLastPointer(false);
    window.addEventListener("pointerdown", onPointer, true);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  function onFocus(event: React.FocusEvent<HTMLButtonElement>, label: string) {
    const visible = event.currentTarget.matches(":focus-visible");
    setLog((current) => [...current.slice(-6), line(`${label} focused by ${lastPointer ? "pointer" : "keyboard"} · :focus-visible ${visible ? "matches" : "does not match"}`, visible ? "default" : "dim")]);
  }

  return (
    <div className="flex flex-col gap-3">
      <style>{`
        .qr-focus-a:focus { outline: 3px solid #e4572e; outline-offset: 2px; }
        .qr-focus-b:focus { outline: none; }
        .qr-focus-b:focus-visible { outline: 3px solid #4fb477; outline-offset: 2px; }
        .qr-focus-c:focus { outline: none; }
      `}</style>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { className: "qr-focus-a", label: "styled with :focus", note: "Ring on every focus, mouse clicks included." },
          { className: "qr-focus-b", label: "styled with :focus-visible", note: "Ring when focus should be visible: keyboard, yes; mouse click on a button, no." },
          { className: "qr-focus-c", label: "outline: none", note: "No ring at all. Keyboard users can't see where they are." },
        ].map((button) => (
          <div key={button.className} className="flex flex-col gap-2">
            <button
              type="button"
              onFocus={(event) => onFocus(event, button.label)}
              className={cn(button.className, "border-line-3 bg-surface-4 text-paper rounded-md border px-3 py-2 text-[13px]")}
            >
              {button.label}
            </button>
            <p className={cn("m-0 text-[12px]/[1.5]", button.className === "qr-focus-c" ? "text-rust" : "text-ash")}>{button.note}</p>
          </div>
        ))}
      </div>
      <DemoConsole lines={log} empty="Click a button, then press Tab and Shift+Tab to move between them." />
    </div>
  );
}

