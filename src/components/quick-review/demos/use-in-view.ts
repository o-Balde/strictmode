"use client";

import { useEffect, useState, type RefObject } from "react";

/** Whether an element is on screen, so a WebGL canvas can stop rendering when it isn't. */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

/** The demos' palette as hex, for three.js materials, which can't read CSS variables. */
export const HEX = {
  ink: "#12100f",
  surface: "#1e1b19",
  /** A plate or platform at rest: light enough to read against the ink background. */
  plate: "#4a4440",
  edge: "#8c847d",
  line: "#3a3431",
  paper: "#f0ebe6",
  stone: "#a8a09a",
  flame: "#e4572e",
  peach: "#e0b9a8",
  mint: "#4fb477",
  binary: "#8b91ff",
  clay: "#c9a08e",
  amber: "#f1c27d",
} as const;
