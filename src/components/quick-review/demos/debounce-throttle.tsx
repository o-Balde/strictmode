"use client";

/**
 * Raw pointer events against their debounced and throttled versions, drawn
 * on a scrolling five-second timeline. The debounce and throttle here are the
 * real functions, wired to real events, not a simulation.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEMO_LABEL, Slider } from "./ui";

const WINDOW_MS = 5000;
const MAX_MARKS = 600;

function debounce<A extends unknown[]>(fn: (...args: A) => void, delay: number) {
  let timer: number | undefined;
  const debounced = (...args: A) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => window.clearTimeout(timer);
  return debounced;
}

function throttle<A extends unknown[]>(fn: (...args: A) => void, interval: number) {
  let last = -Infinity;
  let trailing: number | undefined;
  const throttled = (...args: A) => {
    const now = performance.now();
    const wait = interval - (now - last);
    if (wait <= 0) {
      last = now;
      fn(...args);
    } else {
      // Keep the last call of a burst, so the final position is never lost.
      window.clearTimeout(trailing);
      trailing = window.setTimeout(() => {
        last = performance.now();
        fn(...args);
      }, wait);
    }
  };
  throttled.cancel = () => window.clearTimeout(trailing);
  return throttled;
}

type Lane = "raw" | "debounced" | "throttled";

export function DebounceThrottle() {
  const [delay, setDelay] = useState(400);
  const [marks, setMarks] = useState<{ lane: Lane; at: number }[]>([]);
  const [now, setNow] = useState(() => performance.now());
  const lastEvent = useRef(0);

  const add = useCallback(
    (lane: Lane) => setMarks((current) => [...current.slice(-MAX_MARKS), { lane, at: performance.now() }]),
    [],
  );

  const handlers = useMemo(
    () => ({ debounced: debounce(() => add("debounced"), delay), throttled: throttle(() => add("throttled"), delay) }),
    [add, delay],
  );

  useEffect(() => () => {
    handlers.debounced.cancel();
    handlers.throttled.cancel();
  }, [handlers]);

  // Scroll the timeline while anything happened in the last few seconds.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const current = performance.now();
      setNow(current);
      if (current - lastEvent.current < WINDOW_MS + delay) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [marks.length, delay]);

  function onMove() {
    lastEvent.current = performance.now();
    add("raw");
    handlers.debounced();
    handlers.throttled();
  }

  const visible = marks.filter((mark) => now - mark.at < WINDOW_MS);
  const counts = { raw: 0, debounced: 0, throttled: 0 };
  for (const mark of visible) counts[mark.lane] += 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <div
          onPointerMove={onMove}
          onKeyDown={onMove}
          tabIndex={0}
          role="application"
          aria-label="Event pad: move the pointer here, or hold any key while it is focused"
          className="border-line-3 bg-surface grid h-32 cursor-crosshair touch-none place-items-center rounded-lg border border-dashed select-none focus-visible:outline-2 focus-visible:outline-flame"
        >
          <span className="text-ash text-center text-[12.5px]">
            Move the pointer here in bursts
            <br />
            <span className="text-slate text-[11.5px]">(or focus it and hold a key)</span>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label="delay / interval" value={delay} min={100} max={1000} step={50} unit=" ms" onChange={setDelay} />
          <p className="text-ash m-0 text-[12px]/[1.55]">
            Debounce waits for a pause of {delay} ms. Throttle allows one call per {delay} ms while you keep going.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {(["raw", "debounced", "throttled"] as const).map((lane) => (
          <div key={lane} className="grid grid-cols-[5.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
            <span className={DEMO_LABEL}>{lane}</span>
            <svg viewBox={`0 0 ${WINDOW_MS} 20`} preserveAspectRatio="none" className="bg-surface-2 border-line-2 h-6 w-full rounded border">
              {visible
                .filter((mark) => mark.lane === lane)
                .map((mark, index) => (
                  <rect
                    key={`${mark.at}-${index}`}
                    x={WINDOW_MS - (now - mark.at)}
                    y={lane === "raw" ? 6 : 2}
                    width={lane === "raw" ? 12 : 40}
                    height={lane === "raw" ? 8 : 16}
                    className={lane === "raw" ? "fill-stone" : lane === "debounced" ? "fill-flame" : "fill-binary"}
                  />
                ))}
            </svg>
            <span className="text-bone text-right font-mono text-[12px] tabular-nums">{counts[lane]}</span>
          </div>
        ))}
        <p className="text-slate m-0 text-right font-mono text-[11px]">last 5 seconds · newest on the right</p>
      </div>
    </div>
  );
}
