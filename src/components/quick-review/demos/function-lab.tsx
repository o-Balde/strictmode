"use client";

/**
 * The coding-challenge answers, runnable: edit the inputs and the real
 * function from the answer runs on every keystroke.
 */
import { useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, Panel } from "./ui";

// ── batches ──────────────────────────────────────────────────────────────────

type Pantry = Record<string, number>;

const batches = (recipe: Pantry, available: Pantry) =>
  Math.min(...Object.entries(recipe).map(([ingredient, required]) => Math.floor((available[ingredient] ?? 0) / required)));

const BATCH_PRESETS: { label: string; recipe: Pantry; available: Pantry }[] = [
  { label: "0 batches (butter)", recipe: { milk: 100, butter: 50, flour: 5 }, available: { milk: 132, butter: 48, flour: 51 } },
  { label: "0 batches (no butter)", recipe: { milk: 100, flour: 4, sugar: 10, butter: 5 }, available: { milk: 1288, flour: 9, sugar: 95 } },
  { label: "1 batch", recipe: { milk: 100, butter: 50, cheese: 10 }, available: { milk: 198, butter: 52, cheese: 10 } },
  { label: "2 batches", recipe: { milk: 2, sugar: 40, butter: 20 }, available: { milk: 5, sugar: 120, butter: 500 } },
];

function parsePantry(text: string): Pantry | string {
  try {
    const value: unknown = JSON.parse(text);
    if (typeof value !== "object" || value === null || Array.isArray(value)) return "Expected an object like { \"milk\": 100 }";
    for (const [key, amount] of Object.entries(value)) {
      if (typeof amount !== "number" || amount < 0) return `"${key}" must be a non-negative number`;
    }
    return value as Pantry;
  } catch {
    return "Not valid JSON yet";
  }
}

export function BatchesLab() {
  const [recipeText, setRecipeText] = useState(JSON.stringify(BATCH_PRESETS[0].recipe, null, 1));
  const [pantryText, setPantryText] = useState(JSON.stringify(BATCH_PRESETS[0].available, null, 1));
  const recipe = parsePantry(recipeText);
  const available = parsePantry(pantryText);
  const ready = typeof recipe === "object" && typeof available === "object";

  const ratios = ready ? Object.entries(recipe).map(([ingredient, required]) => ({ ingredient, required, have: available[ingredient] ?? 0 })) : [];
  const result = ready ? batches(recipe, available) : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {BATCH_PRESETS.map((preset) => (
          <DemoButton
            key={preset.label}
            onClick={() => {
              setRecipeText(JSON.stringify(preset.recipe, null, 1));
              setPantryText(JSON.stringify(preset.available, null, 1));
            }}
          >
            {preset.label}
          </DemoButton>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <JsonField label="recipe" value={recipeText} onChange={setRecipeText} error={typeof recipe === "string" ? recipe : null} />
        <JsonField label="available" value={pantryText} onChange={setPantryText} error={typeof available === "string" ? available : null} />
      </div>
      {ready ? (
        <Panel title={`batches(recipe, available) = ${result === Infinity ? "Infinity (empty recipe)" : result}`}>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {ratios.map(({ ingredient, required, have }) => {
              const possible = Math.floor(have / required);
              const bottleneck = possible === result;
              return (
                <li key={ingredient} className="grid grid-cols-[6rem_minmax(0,1fr)_7rem] items-center gap-3 font-mono text-[12px]">
                  <span className={bottleneck ? "text-flame" : "text-bone"}>{ingredient}</span>
                  <span className="bg-line h-2 overflow-hidden rounded-full">
                    <span
                      className={cn("block h-full rounded-full", bottleneck ? "bg-flame" : "bg-mint")}
                      style={{ width: `${Math.min(100, (possible / Math.max(1, ...ratios.map((r) => Math.floor(r.have / r.required)))) * 100)}%` }}
                    />
                  </span>
                  <span className="text-ash text-right">
                    {have}/{required} → {possible}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-ash m-0 mt-2 text-[12px]">The ingredient in orange is the bottleneck: the smallest whole ratio decides.</p>
        </Panel>
      ) : null}
    </div>
  );
}

function JsonField({ label, value, onChange, error }: Readonly<{ label: string; value: string; onChange: (value: string) => void; error: string | null }>) {
  return (
    <label className="flex flex-col gap-1">
      <span className={DEMO_LABEL}>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
        spellCheck={false}
        className={cn(
          "bg-well text-paper rounded-md border px-2.5 py-2 font-mono text-[12px] outline-none",
          error ? "border-rust-line" : "border-line-3 focus:border-flame",
        )}
      />
      <span className="text-rust min-h-4 text-[11px]">{error}</span>
    </label>
  );
}

// ── mask ─────────────────────────────────────────────────────────────────────

const mask = (text: string, maskChar = "#") => text.slice(-4).padStart(text.length, maskChar);
const maskCodePoints = (text: string, maskChar = "#") => {
  const chars = [...text];
  return maskChar.repeat(Math.max(0, chars.length - 4)) + chars.slice(-4).join("");
};

export function MaskLab() {
  const [text, setText] = useState("4111111111111111");
  const [maskChar, setMaskChar] = useState("#");
  const char = maskChar || "#";
  const units = mask(text, char);
  const points = maskCodePoints(text, char);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={DEMO_LABEL}>input</span>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            spellCheck={false}
            className="border-line-3 bg-surface text-paper rounded-md border px-2.5 py-1.5 font-mono text-[13px] outline-none focus:border-flame"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={DEMO_LABEL}>mask</span>
          <input
            value={maskChar}
            maxLength={1}
            onChange={(event) => setMaskChar(event.target.value)}
            className="border-line-3 bg-surface text-paper w-14 rounded-md border px-2.5 py-1.5 text-center font-mono text-[13px] outline-none focus:border-flame"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["123456789", "abc", "", "ab🙂cdef", "+44 7700 900123"].map((preset) => (
          <DemoButton key={preset} onClick={() => setText(preset)} className="font-mono">
            {preset === "" ? '""' : preset}
          </DemoButton>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Panel title={`slice + padStart · length ${text.length}`}>
          <p className="text-flame m-0 font-mono text-[15px] break-all">{units || " "}</p>
        </Panel>
        <Panel title={`code points · ${[...text].length} characters`}>
          <p className="text-mint-soft m-0 font-mono text-[15px] break-all">{points || " "}</p>
        </Panel>
      </div>
      {units !== points ? (
        <p className="text-peach m-0 text-[12px]">
          The two disagree: the string contains characters made of two UTF-16 code units, which <code className="prep-code">length</code> and{" "}
          <code className="prep-code">slice</code> count separately.
        </p>
      ) : null}
    </div>
  );
}

// ── anagrams ─────────────────────────────────────────────────────────────────

function anagramGroups(words: readonly string[]) {
  const groups = new Map<string, string[]>();
  for (const word of words) {
    const key = [...word.toLowerCase()].sort().join("");
    groups.set(key, [...(groups.get(key) ?? []), word]);
  }
  return [...groups.entries()];
}

export function AnagramsLab() {
  const [text, setText] = useState("rates rat stare taser tears art tabs tar bats state");
  const words = text.split(/[\s,]+/).filter(Boolean);
  const groups = anagramGroups(words);

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className={DEMO_LABEL}>words (space or comma separated)</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={2}
          spellCheck={false}
          className="border-line-3 bg-well text-paper rounded-md border px-2.5 py-2 font-mono text-[12.5px] outline-none focus:border-flame"
        />
      </label>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([key, group]) => (
          <div
            key={key}
            className={cn("rounded-md border px-3 py-2", group.length > 1 ? "border-flame/60 bg-flame-deep" : "border-line-2 bg-surface-2 opacity-60")}
          >
            <div className="text-slate font-mono text-[11px]">key &quot;{key}&quot;</div>
            <div className={cn("font-mono text-[13px]", group.length > 1 ? "text-paper" : "text-stone")}>{group.join(", ")}</div>
          </div>
        ))}
      </div>
      <p className="text-ash m-0 text-[12px]">
        {groups.filter(([, group]) => group.length > 1).length} anagram groups among {words.length} words. Faded keys have only one word, so they are left out of the answer.
      </p>
    </div>
  );
}
