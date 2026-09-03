"use client";

import { useMemo } from "react";
import { cn, tokeniseStatement } from "@lib";

/**
 * Renders a Binary statement or explanation, lifting the load-bearing words out
 * of the sentence so a reader scanning at speed sees what the card turns on.
 *
 * Emphasis uses the deck's own accent rather than plain bold: at the 32px
 * display size of a card front the statement is already semibold, so extra
 * weight alone would be nearly invisible.
 */
export interface StatementTextProps {
  text: string;
  className?: string;
}

export function StatementText({ text, className }: Readonly<StatementTextProps>) {
  const tokens = useMemo(() => tokeniseStatement(text), [text]);

  return (
    <span className={cn("inline wrap-break-word", className)}>
      {tokens.map((token, index) => {
        if (token.kind === "prose") return <span key={index}>{token.text}</span>;

        if (token.kind === "emphasis") {
          return (
            <em key={index} className="text-binary-soft font-semibold not-italic">
              {token.text}
            </em>
          );
        }

        return (
          <code
            key={index}
            className="inline rounded-[3px] px-1 py-px font-mono text-[0.9em] break-all"
            style={{ background: "var(--well)", color: "var(--code-function)" }}
          >
            {token.text}
          </code>
        );
      })}
    </span>
  );
}
