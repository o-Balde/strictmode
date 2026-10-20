import { useEffect, useRef, useState } from "react";

/**
 * TYPEWRITER: reference solution.
 *
 * One interval per text, cleared by the effect's cleanup, so a new text or an
 * unmount can never leave a timer writing into stale state. Characters are
 * counted with Array.from (code points), so an emoji is never shown half-drawn.
 */
export interface TypewriterProps {
  text: string;
  /** Milliseconds between characters. */
  intervalMs?: number;
  onDone?: () => void;
}

export function Typewriter({ text, intervalMs = 50, onDone }: TypewriterProps) {
  const characters = Array.from(text);
  const [shown, setShown] = useState(0);

  // The latest onDone without restarting the animation when the parent passes
  // a new function on every render.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const total = characters.length;
  useEffect(() => {
    setShown(0);
    if (total === 0) {
      onDoneRef.current?.();
      return;
    }
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setShown(count);
      if (count >= total) {
        clearInterval(timer);
        onDoneRef.current?.();
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [text, total, intervalMs]);

  return <p data-testid="typewriter">{characters.slice(0, shown).join("")}</p>;
}

export interface TypewriterFromUrlProps {
  url: string;
  intervalMs?: number;
}

type Load = { state: "loading" } | { state: "error" } | { state: "ready"; text: string };

export function TypewriterFromUrl({ url, intervalMs }: TypewriterFromUrlProps) {
  const [load, setLoad] = useState<Load>({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setLoad({ state: "loading" });
    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}`);
        const text = (await response.text()).trim();
        if (!controller.signal.aborted) setLoad({ state: "ready", text });
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoad({ state: "error" });
      });
    return () => controller.abort();
  }, [url]);

  if (load.state === "loading") return <p data-testid="typewriter-status">Loading...</p>;
  if (load.state === "error") return <p data-testid="typewriter-status" role="alert">Failed to load</p>;
  return <Typewriter text={load.text} intervalMs={intervalMs} />;
}
