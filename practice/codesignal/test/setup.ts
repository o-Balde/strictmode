import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// The grader's clock sits west of UTC, like most laptops in the Americas. A
// date-only string parsed with `new Date("2026-03-01")` is UTC midnight, which
// renders as the previous day here. The specs are meant to catch that.
process.env.TZ = "America/Los_Angeles";

// Testing Library flushes pending work with a setTimeout(0) and only knows how
// to advance Jest's fake clock. Pointing it at Vitest's keeps user-event and
// findBy* working in specs that fake timers (debounce, intervals).
Object.assign(globalThis, { jest: { advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms) } });

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
