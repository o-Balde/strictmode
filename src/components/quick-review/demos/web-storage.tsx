"use client";

/**
 * localStorage and sessionStorage, live. Only keys under this demo's own
 * prefix are listed or touched, so the page's other saved state is left
 * alone. `storage` events from other tabs are shown as they arrive.
 */
import { useEffect, useState } from "react";
import { DEMO_LABEL, DemoButton, DemoConsole, Panel, line, type ConsoleLine } from "./ui";

const PREFIX = "quick-review-demo:";
type Area = "localStorage" | "sessionStorage";

function storageOf(area: Area): Storage | null {
  try {
    return window[area];
  } catch {
    return null;
  }
}

function readKeys(area: Area): { key: string; value: string }[] {
  const storage = storageOf(area);
  if (!storage) return [];
  const entries: { key: string; value: string }[] = [];
  try {
    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      if (key?.startsWith(PREFIX)) entries.push({ key: key.slice(PREFIX.length), value: storage.getItem(key) ?? "" });
    }
  } catch {
    // Blocked storage: show nothing.
  }
  return entries.sort((a, b) => a.key.localeCompare(b.key));
}

export function WebStorageDemo() {
  const [key, setKey] = useState("theme");
  const [value, setValue] = useState("dark");
  const [entries, setEntries] = useState(() => ({ localStorage: readKeys("localStorage"), sessionStorage: readKeys("sessionStorage") }));
  const [events, setEvents] = useState<ConsoleLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => setEntries({ localStorage: readKeys("localStorage"), sessionStorage: readKeys("sessionStorage") });

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== null && !event.key.startsWith(PREFIX)) return;
      const name = event.key?.slice(PREFIX.length) ?? "(cleared)";
      setEvents((current) => [...current, line(`storage event from another tab: ${name}: ${event.oldValue ?? "null"} → ${event.newValue ?? "null"}`)]);
      setEntries({ localStorage: readKeys("localStorage"), sessionStorage: readKeys("sessionStorage") });
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function write(area: Area) {
    const storage = storageOf(area);
    try {
      if (!storage) throw new Error("storage is unavailable");
      storage.setItem(PREFIX + key, value);
      setError(null);
    } catch (problem) {
      setError(`${area}.setItem threw: ${problem instanceof Error ? problem.message : String(problem)}`);
    }
    refresh();
  }

  function remove(area: Area, name: string) {
    try {
      storageOf(area)?.removeItem(PREFIX + name);
    } catch {
      // Ignore: the list refresh shows the truth.
    }
    refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className={DEMO_LABEL}>key</span>
          <input value={key} onChange={(event) => setKey(event.target.value)} className="border-line-3 bg-surface text-paper w-36 rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] outline-none focus:border-flame" />
        </label>
        <label className="flex flex-col gap-1">
          <span className={DEMO_LABEL}>value (always stored as a string)</span>
          <input value={value} onChange={(event) => setValue(event.target.value)} className="border-line-3 bg-surface text-paper w-44 rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] outline-none focus:border-flame" />
        </label>
        <DemoButton tone="primary" onClick={() => write("localStorage")} disabled={!key}>
          localStorage.setItem
        </DemoButton>
        <DemoButton onClick={() => write("sessionStorage")} disabled={!key}>
          sessionStorage.setItem
        </DemoButton>
      </div>
      {error ? <p className="text-rust m-0 text-[12px]">{error}</p> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {(["localStorage", "sessionStorage"] as const).map((area) => (
          <Panel key={area} title={area === "localStorage" ? "localStorage: every tab, until cleared" : "sessionStorage: this tab only, until it closes"}>
            {entries[area].length === 0 ? (
              <p className="text-slate m-0 font-mono text-[12px]">no demo keys</p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {entries[area].map((entry) => (
                  <li key={entry.key} className="flex items-center justify-between gap-2 font-mono text-[12px]">
                    <span className="min-w-0 truncate">
                      <span className="text-paper">{entry.key}</span> <span className="text-slate">=</span>{" "}
                      <span className="text-[var(--code-string)]">&quot;{entry.value}&quot;</span>
                    </span>
                    <button type="button" onClick={() => remove(area, entry.key)} className="text-slate hover:text-rust shrink-0 text-[11px]">
                      removeItem
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        ))}
      </div>
      <DemoConsole lines={events} title="storage events" empty="Open this page in a second tab and write a localStorage key there: the event arrives here." />
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Reload the page: both lists survive. Open the page in a new tab: only the localStorage keys are there. Keys written here are
        prefixed with <code className="prep-code">{PREFIX}</code>.
      </p>
    </div>
  );
}
