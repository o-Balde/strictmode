"use client";

import { cn, tokeniseOutput, tokeniseProse, type OptionToken } from "@lib";

/**
 * Renders an option's text, setting console values and inline code in mono and
 * leaving the connecting words as prose. "0 then 2" is two printed values
 * joined by a word the program never printed.
 *
 * Backtick-delimited code spans (`useState`, `const [x, setX] = useState(0)`)
 * are always rendered as styled inline code, with proper wrapping so they never
 * get clipped or truncated.
 */
export interface OptionTextProps {
  text: string;
  terminal: boolean;
}

export function OptionText({ text, terminal }: Readonly<OptionTextProps>) {
  const tokens: OptionToken[] = terminal ? tokeniseOutput(text) : tokeniseProse(text);
  return (
    <span className="inline wrap-break-word">
      {tokens.map((token, tokenIndex) => {
        if (token.kind === "prose") {
          return (
            <span key={tokenIndex} className={cn(terminal && "font-sans text-bone")}>
              {token.text}
            </span>
          );
        }
        if (token.kind === "value") {
          return (
            <span key={tokenIndex} className="term-glow font-mono text-[var(--term-fg)]">
              {token.text}
            </span>
          );
        }
        return (
          <code
            key={tokenIndex}
            className="inline rounded-[3px] px-1 py-px font-mono text-[0.92em] break-all"
            style={{ background: "var(--well)", color: "var(--code-function)" }}
          >
            {token.text}
          </code>
        );
      })}
    </span>
  );
}
