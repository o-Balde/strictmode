"use client";

import { cn } from "@/lib/utils";
import { tokeniseOutput, tokeniseProse, type OptionToken } from "@/lib/option-tokens";

/**
 * Renders an option's text, setting console values and inline code in mono and
 * leaving the connecting words as prose. "0 then 2" is two printed values
 * joined by a word the program never printed.
 */
export function OptionText({ text, terminal }: { text: string; terminal: boolean }) {
  const tokens: OptionToken[] = terminal ? tokeniseOutput(text) : tokeniseProse(text);
  return (
    <>
      {tokens.map((t, i) => {
        if (t.kind === "prose") {
          return (
            <span key={i} className={cn(terminal && "font-sans text-bone")}>
              {t.text}
            </span>
          );
        }
        if (t.kind === "value") {
          return (
            <span key={i} className="term-glow font-mono text-[var(--term-fg)]">
              {t.text}
            </span>
          );
        }
        return (
          <code
            key={i}
            className="rounded-[3px] px-[3px] py-px font-mono"
            style={{ background: "var(--well)", color: "var(--code-function)" }}
          >
            {t.text}
          </code>
        );
      })}
    </>
  );
}
