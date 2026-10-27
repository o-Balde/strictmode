"use client";

/**
 * A millisecond-step model of how the HTML parser and two scripts share the
 * main thread under each loading strategy. The document has 1,000 ms of
 * parsing work, with script A found 30% of the way in and script B at 60%.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, Slider, Switch } from "./ui";

type Mode = "plain" | "async" | "defer" | "module";
type Activity = "parse" | "blocked" | "A" | "B" | "idle";

const PARSE_MS = 1000;
const EXEC_MS = 150;
const POSITIONS = { A: 300, B: 600 } as const;
const MODES: { id: Mode; label: string; markup: string }[] = [
  { id: "plain", label: "plain", markup: "<script src>" },
  { id: "async", label: "async", markup: "<script async src>" },
  { id: "defer", label: "defer", markup: "<script defer src>" },
  { id: "module", label: "module", markup: '<script type="module" src>' },
];

interface Timeline {
  main: { from: number; to: number; activity: Activity }[];
  downloads: Record<"A" | "B", { from: number; to: number }>;
  domContentLoaded: number;
  load: number;
}

function simulate(mode: Mode, download: Record<"A" | "B", number>, preloadScanner: boolean): Timeline {
  const names = ["A", "B"] as const;
  const discovered: Partial<Record<"A" | "B", number>> = {};
  const executed: Partial<Record<"A" | "B", { start: number; end: number }>> = {};
  const activity: Activity[] = [];
  let parsed = 0;
  let parseEnd: number | null = null;
  let running: { name: "A" | "B"; end: number } | null = null;
  const deferred = mode === "defer" || mode === "module";

  const downloadEnd = (name: "A" | "B") => (discovered[name] ?? Infinity) + download[name];
  const discover = (t: number) => {
    for (const name of names) if (discovered[name] === undefined && parsed >= POSITIONS[name]) discovered[name] = t;
  };

  for (let t = 0; t < 20000; t++) {
    if (running && t >= running.end) running = null;
    if (running) {
      activity.push(running.name);
      continue;
    }
    const startExec = (name: "A" | "B") => {
      executed[name] = { start: t, end: t + EXEC_MS };
      activity.push(name);
      return { name, end: t + EXEC_MS };
    };

    if (mode === "plain") {
      const waitingFor = names.find((name) => discovered[name] !== undefined && !executed[name]);
      if (waitingFor) {
        if (preloadScanner) for (const name of names) discovered[name] ??= t; // the scanner looks ahead while blocked
        if (downloadEnd(waitingFor) <= t) running = startExec(waitingFor);
        else activity.push("blocked");
        continue;
      }
    }
    if (mode === "async") {
      const ready = names.find((name) => !executed[name] && downloadEnd(name) <= t);
      if (ready) {
        running = startExec(ready);
        continue;
      }
    }
    if (parsed < PARSE_MS) {
      parsed += 1;
      activity.push("parse");
      discover(t + 1);
      if (parsed === PARSE_MS) parseEnd = t + 1;
      continue;
    }
    if (deferred) {
      const next = names.find((name) => !executed[name]);
      if (next && downloadEnd(next) <= t) {
        running = startExec(next);
        continue;
      }
    }
    activity.push("idle");
    if (names.every((name) => (executed[name]?.end ?? Infinity) <= t)) break;
  }

  const main: Timeline["main"] = [];
  activity.forEach((kind, t) => {
    const last = main.at(-1);
    if (last && last.activity === kind) last.to = t + 1;
    else main.push({ from: t, to: t + 1, activity: kind });
  });
  const ends = names.map((name) => executed[name]?.end ?? 0);
  const domContentLoaded = deferred ? Math.max(parseEnd ?? 0, ...ends) : (parseEnd ?? 0);
  return {
    main: main.filter((segment) => segment.activity !== "idle"),
    downloads: {
      A: { from: discovered.A ?? 0, to: downloadEnd("A") },
      B: { from: discovered.B ?? 0, to: downloadEnd("B") },
    },
    domContentLoaded,
    load: Math.max(domContentLoaded, ...ends),
  };
}

const TONE: Record<Exclude<Activity, "idle">, string> = {
  parse: "fill-mint/70",
  blocked: "fill-rust-line",
  A: "fill-flame",
  B: "fill-binary",
};

export function ScriptLoading() {
  const [downloadA, setDownloadA] = useState(600);
  const [downloadB, setDownloadB] = useState(250);
  const [preloadScanner, setPreloadScanner] = useState(false);

  const timelines = useMemo(
    () => MODES.map((mode) => ({ ...mode, timeline: simulate(mode.id, { A: downloadA, B: downloadB }, preloadScanner) })),
    [downloadA, downloadB, preloadScanner],
  );
  const end = Math.max(...timelines.map(({ timeline }) => timeline.load)) + 80;
  const x = (ms: number) => (ms / end) * 1000;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
        <Slider label="script A download" value={downloadA} min={50} max={1500} step={50} unit=" ms" onChange={setDownloadA} />
        <Slider label="script B download" value={downloadB} min={50} max={1500} step={50} unit=" ms" onChange={setDownloadB} />
        <Switch label="preload scanner" checked={preloadScanner} onChange={setPreloadScanner} />
      </div>

      <div className="flex flex-col gap-4">
        {timelines.map(({ id, markup, timeline }) => (
          <div key={id} className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <code className="text-paper font-mono text-[12px]">{markup}</code>
              <span className="text-ash font-mono text-[11px]">
                DOMContentLoaded <span className="text-peach">{timeline.domContentLoaded} ms</span> · load{" "}
                <span className="text-bone">{timeline.load} ms</span>
              </span>
            </div>
            <svg viewBox="0 0 1000 46" preserveAspectRatio="none" className="h-12 w-full" role="img" aria-label={`${markup}: DOMContentLoaded at ${timeline.domContentLoaded} ms`}>
              <rect x={0} y={0} width={1000} height={14} className="fill-surface-4" />
              {timeline.main.map((segment, index) => (
                <rect
                  key={index}
                  x={x(segment.from)}
                  y={0}
                  width={Math.max(0.5, x(segment.to) - x(segment.from))}
                  height={14}
                  className={TONE[segment.activity as Exclude<Activity, "idle">]}
                />
              ))}
              {(["A", "B"] as const).map((name, row) => (
                <rect
                  key={name}
                  x={x(timeline.downloads[name].from)}
                  y={20 + row * 12}
                  width={Math.max(0.5, x(timeline.downloads[name].to) - x(timeline.downloads[name].from))}
                  height={8}
                  rx={2}
                  className={cn(name === "A" ? "fill-flame/40" : "fill-binary/40")}
                />
              ))}
              <line x1={x(timeline.domContentLoaded)} x2={x(timeline.domContentLoaded)} y1={0} y2={46} className="stroke-peach" strokeWidth={2} />
            </svg>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Legend tone="bg-mint/70" label="parsing" />
        <Legend tone="bg-rust-line" label="parser blocked, waiting" />
        <Legend tone="bg-flame" label="script A runs" />
        <Legend tone="bg-binary" label="script B runs" />
        <Legend tone="bg-flame/40" label="downloads (A, then B)" />
        <Legend tone="bg-peach" label="DOMContentLoaded" />
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Make B download faster than A: with <code className="prep-code">async</code> B runs first; with <code className="prep-code">defer</code> it still
        waits its turn. Real browsers&apos; preload scanner starts later downloads while the parser is blocked, which helps plain scripts but
        does not unblock the parser.
      </p>
    </div>
  );
}

function Legend({ tone, label }: Readonly<{ tone: string; label: string }>) {
  return (
    <span className={cn(DEMO_LABEL, "inline-flex items-center gap-1.5 normal-case tracking-normal")}>
      <span className={cn("inline-block size-2.5 rounded-sm", tone)} />
      {label}
    </span>
  );
}
