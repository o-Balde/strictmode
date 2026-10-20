import { useEffect, useRef, useState } from "react";

/**
 * PROGRESS QUEUE: reference solution.
 *
 * One interval for the whole queue, not one per bar. It exists only while
 * something can move (not paused, and some bar unfinished), so a finished or
 * paused queue holds no timer. Each tick advances the first `limit`
 * unfinished bars: the concurrency rule is that loop, nothing more.
 */
export interface ProgressQueueProps {
  /** How long one bar takes to fill, in ms. */
  durationMs?: number;
  /** How many bars may fill at the same time. */
  limit?: number;
}

const TICK_MS = 100;

interface Bar {
  id: number;
  percent: number;
}

export function ProgressQueue({ durationMs = 2000, limit = 3 }: ProgressQueueProps) {
  const [bars, setBars] = useState<Bar[]>([]);
  const [paused, setPaused] = useState(false);
  const nextId = useRef(1);

  const moving = !paused && bars.some((bar) => bar.percent < 100);

  useEffect(() => {
    if (!moving) return;
    const step = (100 * TICK_MS) / durationMs;
    const timer = setInterval(() => {
      setBars((current) => {
        let active = 0;
        return current.map((bar) => {
          if (bar.percent >= 100 || active >= limit) return bar;
          active += 1;
          return { ...bar, percent: Math.min(100, bar.percent + step) };
        });
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [moving, durationMs, limit]);

  const add = () => {
    const id = nextId.current;
    nextId.current += 1;
    setBars((current) => [...current, { id, percent: 0 }]);
  };

  return (
    <section>
      <button type="button" onClick={add}>
        Add
      </button>
      <button type="button" onClick={() => setPaused((value) => !value)}>
        {paused ? "Resume" : "Pause"}
      </button>
      <button type="button" onClick={() => setBars([])}>
        Reset
      </button>
      {bars.map((bar) => (
        <div
          key={bar.id}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(bar.percent)}
          style={{ height: 8, background: "#eee" }}
        >
          <div style={{ width: `${bar.percent}%`, height: "100%", background: "#16a34a" }} />
        </div>
      ))}
    </section>
  );
}
