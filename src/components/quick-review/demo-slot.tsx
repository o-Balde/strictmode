"use client";

/**
 * Where an interactive demo goes in an answer. Nothing is downloaded until the
 * answer is open and the slot scrolls near the viewport, so "expand all" does
 * not pull in three.js; closing the question unmounts the demo again, which
 * also releases its WebGL context. A demo that throws is contained here and
 * never takes the page down with it.
 */
import { Component, useEffect, useRef, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import type { ReviewDemo } from "@data";
import { PrepText } from "@components";
import { DemoPlaceholder } from "./demos/placeholder";
import { DEMOS } from "./demos/registry";
import { useReview } from "./review-provider";

const NEAR_VIEWPORT = "300px 0px";

export interface DemoSlotProps {
  questionId: string;
  demo: ReviewDemo;
}

export function DemoSlot({ questionId, demo }: Readonly<DemoSlotProps>) {
  const { openIds } = useReview();
  const open = openIds.has(questionId);
  const slotRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  // Bumping the key remounts the demo: its own state starts over.
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!open || near) return;
    const slot = slotRef.current;
    if (!slot) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: NEAR_VIEWPORT },
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, [open, near]);

  const Demo = DEMOS[demo.id];
  const show = open && near;

  return (
    <figure data-demo={demo.id} className="border-binary-line bg-ink m-0 mt-7 overflow-hidden rounded-[10px] border">
      <figcaption className="border-binary-line bg-binary-deep/60 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b px-4 py-2.5 sm:px-5">
        <span className="text-binary-soft inline-flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase">
          <Sparkles aria-hidden className="size-3.5" />
          Interactive
        </span>
        <span className="text-stone order-last w-full text-[12.5px]/[1.5] text-pretty sm:order-none sm:w-auto sm:min-w-0 sm:flex-1 sm:text-right">
          <PrepText text={demo.hint} />
        </span>
        {show ? (
          <button
            type="button"
            onClick={() => setRun((count) => count + 1)}
            className="text-slate hover:text-bone inline-flex items-center gap-1 font-mono text-[11px] transition-colors"
            aria-label="Reset the demo"
          >
            <RotateCcw aria-hidden className="size-3" />
            reset
          </button>
        ) : null}
      </figcaption>
      <div ref={slotRef} className="min-h-40 p-4 sm:p-5">
        {show ? (
          <DemoBoundary key={run}>
            <Demo />
          </DemoBoundary>
        ) : (
          <DemoPlaceholder />
        )}
      </div>
    </figure>
  );
}

class DemoBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <p className="text-rust m-0 text-[13px]">
        This demo failed to load in this browser. The explanation above covers the same ground.
      </p>
    );
  }
}
