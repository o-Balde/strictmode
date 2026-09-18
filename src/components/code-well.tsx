"use client";

/**
 * The code pane. The mockup's thesis is that "the code is the content", so it
 * is set at a real reading size in Plex Mono and never squeezed into a grey
 * box.
 *
 * Snippets are rendered exactly as they arrive — roughly 14% of the bank lost
 * its newlines during extraction, and per the build decision they are shown
 * verbatim and scroll horizontally at every breakpoint rather than being
 * reflowed or wrapped.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@lib";

export interface CodeWellProps {
  /** Pre-highlighted markup from the server. */
  html: string | null;
  /** Raw text, used for the typewriter measure and as a fallback. */
  code: string | null;
  className?: string;
  /** Reveal the snippet character by character on mount. */
  typewriter?: boolean;
  /** Homebrew terminal skin instead of the flame palette. */
  terminal?: boolean;
  fontSize?: number;
  lineNumbers?: boolean;
}

/** Fast enough never to feel like waiting; hard-capped regardless of length. */
const CHAR_MS = 6;
const MAX_MS = 500;

export function CodeWell({
  html,
  code,
  className,
  typewriter = false,
  terminal = false,
  fontSize = 14,
  lineNumbers = false,
}: Readonly<CodeWellProps>) {
  const reduced = useReducedMotion() ?? false;
  const animating = typewriter && !reduced && Boolean(code);
  const [revealed, setRevealed] = useState(!animating);
  const [progress, setProgress] = useState(animating ? 0 : 1);
  const frame = useRef<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, code, revealed]);

  useEffect(() => {
    if (!animating || !code) return;
    const duration = Math.min(MAX_MS, code.length * CHAR_MS);
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else setRevealed(true);
    };
    frame.current = requestAnimationFrame(tick);

    // Any keypress or pointer press completes the reveal immediately — the
    // animation must never stand between the reader and the code.
    const finish = () => {
      cancelAnimationFrame(frame.current);
      setProgress(1);
      setRevealed(true);
    };
    window.addEventListener("keydown", finish, { once: true });
    window.addEventListener("pointerdown", finish, { once: true });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [code, animating]);

  if (!code) return null;

  const lines = code.split("\n");

  return (
    <div
      data-skin={terminal ? "terminal" : undefined}
      className={cn(
        "relative overflow-hidden rounded-lg border",
        terminal
          ? "term-scanlines border-[#123c0c] bg-[var(--term-bg)]"
          : "border-line-4 bg-well",
        className,
      )}
    >
      {/* Visual edge fades indicating horizontal overflow on scrollable viewports */}
      {canScrollLeft && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r to-transparent",
            terminal ? "from-[var(--term-bg)]" : "from-[var(--well)]",
          )}
        />
      )}
      {canScrollRight && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l to-transparent",
            terminal ? "from-[var(--term-bg)]" : "from-[var(--well)]",
          )}
        />
      )}
      {canScrollRight && (
        <span className="text-slate/60 pointer-events-none absolute bottom-1.5 right-2 z-10 font-mono text-[9px] tracking-wider uppercase select-none sm:hidden">
          scroll →
        </span>
      )}

      {/* The wrapper scrolls; the <pre> grows to its content (w-max) so the
          right-hand padding survives a scroll to the end of a long line. */}
      <div
        ref={scrollRef}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="scrollbar-hairline overflow-x-auto [touch-action:pan-x_pan-y] overscroll-x-contain"
      >
        <pre
          className={cn(
            "m-0 w-max min-w-full overflow-visible px-[22px] py-5 font-mono",
            terminal && "term-glow text-[var(--term-fg)]",
          )}
          style={{ fontSize, lineHeight: 1.75 }}
        >
          {lineNumbers ? (
            <code className="block">
              {lines.map((line, i) => (
                <span key={i} className="block">
                  <span
                    aria-hidden
                    className="mr-4 inline-block w-6 shrink-0 text-right select-none"
                    style={{ color: "var(--code-gutter)" }}
                  >
                    {i + 1}
                  </span>
                  <LineContent
                    code={code}
                    line={line}
                    index={i}
                    lines={lines}
                    progress={progress}
                    revealed={revealed}
                  />
                </span>
              ))}
            </code>
          ) : (
            <RevealedCode
              html={html}
              code={code}
              progress={progress}
              revealed={revealed}
            />
          )}
          {!revealed && (
            <span
              className={cn(
                "ml-0.5 inline-block h-[1em] w-1.75 translate-y-0.5",
                terminal ? "bg-[var(--term-fg)]" : "bg-flame",
              )}
            />
          )}
        </pre>
      </div>
    </div>
  );
}

/**
 * While typing we render sliced plain text (highlighting a partial token
 * produces flicker); once complete we swap in the server's highlighted markup.
 */
interface RevealedCodeProps {
  html: string | null;
  code: string;
  progress: number;
  revealed: boolean;
}

function RevealedCode({
  html,
  code,
  progress,
  revealed,
}: Readonly<RevealedCodeProps>) {
  if (revealed && html) {
    return <code dangerouslySetInnerHTML={{ __html: html }} />;
  }
  const cut = Math.floor(code.length * progress);
  return <code style={{ color: "var(--code-plain)" }}>{code.slice(0, cut)}</code>;
}

interface LineContentProps {
  code: string;
  line: string;
  index: number;
  lines: readonly string[];
  progress: number;
  revealed: boolean;
}

function LineContent({
  code,
  line,
  index,
  lines,
  progress,
  revealed,
}: Readonly<LineContentProps>) {
  if (revealed) {
    // Line numbers and per-token markup can't be interleaved from a single
    // HTML string, so numbered wells render plain-coloured text.
    return <span style={{ color: "var(--code-plain)" }}>{line || " "}</span>;
  }
  const charactersBeforeLine = lines
    .slice(0, index)
    .reduce((totalChars, currentLine) => totalChars + currentLine.length + 1, 0);
  const cut = Math.max(0, Math.floor(code.length * progress) - charactersBeforeLine);
  return <span style={{ color: "var(--code-plain)" }}>{line.slice(0, cut) || " "}</span>;
}
