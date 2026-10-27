"use client";

/**
 * Real promises, two ways. The top half is one promise you settle by hand,
 * which shows that it settles exactly once. The bottom half races three timed
 * promises through Promise.all, allSettled, race and any, and records when and
 * how each combinator settled.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, DemoConsole, Panel, Segmented, Slider, line, type ConsoleLine } from "./ui";

type State = "pending" | "fulfilled" | "rejected";

const STATE_TONE: Record<State, string> = {
  pending: "border-line-3 text-stone",
  fulfilled: "border-mint-line bg-mint-deep text-mint-soft",
  rejected: "border-rust-line bg-rust-bg text-rust",
};

export function PromiseLab() {
  return (
    <div className="flex flex-col gap-4">
      <SinglePromise />
      <Combinators />
    </div>
  );
}

function SinglePromise() {
  const [state, setState] = useState<State>("pending");
  const [log, setLog] = useState<ConsoleLine[]>([]);
  const settle = useRef<{ resolve: (value: string) => void; reject: (reason: Error) => void } | null>(null);
  const [generation, setGeneration] = useState(0);
  const settledOnce = useRef(false);

  useEffect(() => {
    let active = true;
    settledOnce.current = false;
    const promise = new Promise<string>((resolve, reject) => {
      settle.current = { resolve, reject };
    });
    promise.then(
      (value) => {
        if (!active) return;
        setState("fulfilled");
        setLog((current) => [...current, line(`.then ran with "${value}"`)]);
      },
      (reason: Error) => {
        if (!active) return;
        setState("rejected");
        setLog((current) => [...current, line(`.catch ran with Error("${reason.message}")`, "error")]);
      },
    );
    return () => {
      active = false;
    };
  }, [generation]);

  function call(kind: "resolve" | "reject") {
    const note = settledOnce.current ? "ignored: already settled" : "settles the promise";
    setLog((current) => [...current, line(`${kind}(...) called → ${note}`, settledOnce.current ? "dim" : "accent")]);
    settledOnce.current = true;
    if (kind === "resolve") settle.current?.resolve("done");
    else settle.current?.reject(new Error("failed"));
  }

  return (
    <Panel title="One promise">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-2 sm:w-60">
          <div className="flex items-center gap-2">
            <span className="text-ash text-[12px]">state:</span>
            <span className={cn("rounded-md border px-2.5 py-1 font-mono text-[12px] font-semibold", STATE_TONE[state])}>{state}</span>
            {state !== "pending" ? <span className="text-slate font-mono text-[11px]">(settled)</span> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <DemoButton onClick={() => call("resolve")}>resolve(&quot;done&quot;)</DemoButton>
            <DemoButton onClick={() => call("reject")}>reject(new Error)</DemoButton>
            <DemoButton
              onClick={() => {
                setState("pending");
                setLog([]);
                setGeneration((current) => current + 1);
              }}
            >
              New promise
            </DemoButton>
          </div>
          <p className="text-ash m-0 text-[12px]/[1.55]">
            Handlers always run a moment later, as microtasks, even though the call settled the promise immediately.
          </p>
        </div>
        <DemoConsole className="flex-1" lines={log} empty="Call resolve or reject." />
      </div>
    </Panel>
  );
}

type Outcome = "fulfil" | "reject";
interface Contender {
  name: string;
  ms: number;
  outcome: Outcome;
}

const COMBINATORS = ["all", "allSettled", "race", "any"] as const;
type Combinator = (typeof COMBINATORS)[number];

interface Result {
  at: number;
  ok: boolean;
  text: string;
}

const MAX_MS = 3000;

function Combinators() {
  const [contenders, setContenders] = useState<Contender[]>([
    { name: "A", ms: 800, outcome: "fulfil" },
    { name: "B", ms: 1600, outcome: "reject" },
    { name: "C", ms: 2400, outcome: "fulfil" },
  ]);
  const [run, setRun] = useState<{ startedAt: number; settled: Record<string, number>; results: Partial<Record<Combinator, Result>> } | null>(null);
  const [now, setNow] = useState(0);
  const runId = useRef(0);

  // While a run is in progress, tick a clock so the progress bars move.
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - run.startedAt;
      setNow(elapsed);
      if (elapsed < MAX_MS + 200) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  function start() {
    const id = ++runId.current;
    const startedAt = performance.now();
    setNow(0);
    setRun({ startedAt, settled: {}, results: {} });
    const elapsed = () => Math.round(performance.now() - startedAt);
    const promises = contenders.map(
      (contender) =>
        new Promise<string>((resolve, reject) => {
          window.setTimeout(() => {
            if (runId.current === id) {
              setRun((current) => (current ? { ...current, settled: { ...current.settled, [contender.name]: elapsed() } } : current));
            }
            if (contender.outcome === "fulfil") resolve(contender.name);
            else reject(new Error(contender.name));
          }, contender.ms);
        }),
    );
    const record = (name: Combinator, ok: boolean, text: string) => {
      if (runId.current !== id) return;
      const at = elapsed();
      setRun((current) => (current ? { ...current, results: { ...current.results, [name]: { at, ok, text } } } : current));
    };
    Promise.all(promises).then(
      (values) => record("all", true, `[${values.join(", ")}]`),
      (error: Error) => record("all", false, `rejected by ${error.message}`),
    );
    Promise.allSettled(promises).then((outcomes) =>
      record("allSettled", true, outcomes.map((outcome) => (outcome.status === "fulfilled" ? "✓" : "✗")).join(" ")),
    );
    Promise.race(promises).then(
      (value) => record("race", true, `first settled: ${value}`),
      (error: Error) => record("race", false, `first settled: ${error.message} (rejected)`),
    );
    Promise.any(promises).then(
      (value) => record("any", true, `first fulfilled: ${value}`),
      (error: AggregateError) => record("any", false, `AggregateError (${error.errors.length} rejections)`),
    );
  }

  function update(name: string, patch: Partial<Contender>) {
    setRun(null);
    setContenders((current) => current.map((contender) => (contender.name === name ? { ...contender, ...patch } : contender)));
  }

  return (
    <Panel title="Combinators: three promises, four ways to wait for them">
      <div className="flex flex-col gap-3">
        {contenders.map((contender) => {
          const settledAt = run?.settled[contender.name];
          const progress = run ? Math.min(1, (settledAt ?? now) / contender.ms) : 0;
          return (
            <div key={contender.name} className="grid items-center gap-x-3 gap-y-1.5 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,12rem)_auto]">
              <span className="text-paper font-mono text-[13px] font-semibold">{contender.name}</span>
              <div className="bg-line relative h-2.5 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    settledAt === undefined ? "bg-stone/50" : contender.outcome === "fulfil" ? "bg-mint" : "bg-rust",
                  )}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <Slider label="settles after" value={contender.ms} min={100} max={MAX_MS} step={100} unit=" ms" onChange={(ms) => update(contender.name, { ms })} />
              <Segmented
                label={`Outcome of ${contender.name}`}
                value={contender.outcome}
                options={[
                  { value: "fulfil", label: "fulfil" },
                  { value: "reject", label: "reject" },
                ]}
                onChange={(outcome) => update(contender.name, { outcome })}
              />
            </div>
          );
        })}
        <div>
          <DemoButton tone="primary" onClick={start}>
            Run all four
          </DemoButton>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {COMBINATORS.map((name) => {
            const result = run?.results[name];
            return (
              <div key={name} className="border-line-3 bg-surface rounded-md border px-3 py-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-paper font-mono text-[12px]">Promise.{name}</span>
                  <span className={DEMO_LABEL}>{result ? `${result.at} ms` : run ? "pending…" : ""}</span>
                </div>
                <div className={cn("font-mono text-[12px]", !result ? "text-slate" : result.ok ? "text-mint-soft" : "text-rust")}>
                  {result ? `${result.ok ? "fulfilled" : "rejected"}: ${result.text}` : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
