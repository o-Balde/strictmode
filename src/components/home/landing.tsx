"use client";

/**
 * Mockup 1a — one screen, one promise, and a live sample of the real thing.
 *
 * The hero "boots" like a terminal because the whole product is
 * terminal-adjacent; the sample question is the actual format a drill uses.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Brand } from "@/components/brand";
import { BANK_TOTAL, QUESTION_INDEX } from "@/lib/question-index";
import { stagger, staggerChild } from "@/lib/motion";
import { OptionText } from "@/components/option-text";
import { cn } from "@/lib/utils";

const SAMPLE_OPTIONS = ["0 then 0", "0 then 1", "1 then 2", "2 then 2"];

/** Hand-tokenised: the landing sample never goes through the build highlighter. */
const K = { color: "var(--code-keyword)" };
const F = { color: "var(--code-function)" };
const N = { color: "var(--code-number)" };

function SampleCode() {
  return (
    <>
      <span style={K}>const</span> [n, setN] = <span style={F}>useState</span>(
      <span style={N}>0</span>);{"\n"}
      <span style={K}>function</span> <span style={F}>onClick</span>() {"{"}
      {"\n"}  <span style={F}>setN</span>(n + <span style={N}>1</span>);{"\n"}
      {"  "}<span style={F}>setN</span>(n + <span style={N}>1</span>);{"\n"}
      {"  "}console.<span style={F}>log</span>(n);{"\n"}
      {"}"}
    </>
  );
}
const HEADLINE = "Ten minutes of React + TypeScript reps a day.";

export function Landing() {
  const codeQuestions = QUESTION_INDEX.filter(
    (r) => r.type === "live_code" || r.type === "fix",
  ).length;

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand href={null} />
        <nav className="flex items-center gap-5 sm:gap-[22px]">
          <Link href="/topics" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Topics
          </Link>
          <Link href="/progress" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Progress
          </Link>
          <Link
            href="/drill"
            className="border-line-3 text-chalk hover:border-flame rounded-md border px-3 py-1.5 font-mono text-[12.5px] font-medium transition-colors"
          >
            Start drilling
          </Link>
        </nav>
      </header>

      <main className="mx-auto grid max-w-[1180px] items-start gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={staggerChild}
            className="border-line-3 text-clay self-start rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]"
          >
            free · no signup · runs in your browser
          </motion.div>

          <motion.h1
            variants={staggerChild}
            className="text-parchment m-0 text-[38px]/[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-[50px]/[1.06]"
          >
            <BootLine text={HEADLINE} />
          </motion.h1>

          <motion.p
            variants={staggerChild}
            className="text-stone m-0 max-w-[29em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]"
          >
            Five short questions a day, picked from what you haven&apos;t seen yet. Built for the
            two weeks before a technical interview.
          </motion.p>

          <motion.div variants={staggerChild} className="mt-0.5 flex flex-wrap items-center gap-3.5">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/drill"
                className="bg-flame text-ink inline-block rounded-lg px-[26px] py-[15px] text-[15px] font-semibold"
              >
                Start today&apos;s drill →
              </Link>
            </motion.div>
            <Link
              href="/topics"
              className="border-line-3 text-bone hover:border-line-2 rounded-lg border px-5 py-[15px] text-[14px] font-medium transition-colors"
            >
              Browse topics
            </Link>
          </motion.div>

          <motion.div
            variants={staggerChild}
            className="bg-line border-line mt-3.5 grid gap-px overflow-hidden rounded-lg border sm:grid-cols-3"
          >
            <Stat value={String(BANK_TOTAL)} label="questions, never repeated until you've seen them all" />
            <Stat value={String(codeQuestions)} label="code-reading exercises drawn from real bugs" />
            <Stat value="0" label="accounts, trackers or servers involved" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border-line-2 bg-surface overflow-hidden rounded-[10px] border"
        >
          <div className="border-line bg-surface-4 flex items-center justify-between border-b px-[15px] py-[11px]">
            <span className="text-ash font-mono text-[11px] font-medium tracking-[0.06em]">
              SAMPLE · OUTPUT PREDICTION
            </span>
            <span className="text-ash font-mono text-[11px] font-medium">00:42</span>
          </div>
          <div className="p-5">
            <p className="text-paper m-0 mb-4 text-[15.5px]/[1.5] font-medium">
              What does this log when the button is clicked twice?
            </p>
            {/* The program: set like an editor. */}
            <div className="text-slate mb-1.5 flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.12em] uppercase">
              <span aria-hidden className="bg-line-3 h-px w-3" />
              source
            </div>
            <div className="border-line-4 bg-well scrollbar-hairline mb-4 overflow-x-auto rounded-[7px] border">
              <pre
                className="m-0 w-max min-w-full overflow-visible p-4 font-mono text-[13.5px]/[1.7]"
                style={{ color: "var(--code-plain)" }}
              >
                <SampleCode />
              </pre>
            </div>
            {/* What it prints: set like a console. */}
            <div className="mb-1.5 flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.12em] text-[#28fe14]/70 uppercase">
              <span aria-hidden className="h-px w-3 bg-[#28fe14]/40" />
              stdout
            </div>
            <div data-skin="terminal" className="flex flex-col gap-2">
              {SAMPLE_OPTIONS.map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className={cn(
                    "term-scanlines relative flex items-center gap-[11px] rounded-[7px] border bg-[var(--term-bg)]",
                    "px-[13px] py-[11px] text-[13.5px] text-bone",
                    i === 2 ? "border-flame" : "border-[#123c0c]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] font-semibold",
                      i === 2 ? "text-flame" : "text-[var(--term-dim)]",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <OptionText text={text} terminal />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-line text-slate mx-auto max-w-[1180px] border-t px-6 py-8 text-[12.5px] sm:px-10">
        Progress is kept in this browser only. Nothing is uploaded, ever.
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface px-4 pt-4 pb-[18px]">
      <div className="text-flame font-mono text-xl font-semibold">{value}</div>
      <div className="text-ash mt-1 text-[12px]/[1.45]">{label}</div>
    </div>
  );
}

/** Types the headline in, then leaves it alone. A cursor blinks while typing. */
function BootLine({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.floor(text.length * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduced]);

  const done = shown >= text.length;
  return (
    <>
      {text.slice(0, shown)}
      {!done ? (
        <motion.span
          aria-hidden
          className="bg-flame ml-1 inline-block h-[0.8em] w-[0.5ch] translate-y-[0.02em]"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
        />
      ) : null}
    </>
  );
}
