"use client";

/**
 * A browser cache in miniature. Edit a file, deploy, and visit: hashed names
 * (real SHA-256 of the content, via SubtleCrypto) change only for files that
 * changed, while fixed names keep being served stale from the cache.
 */
import { useEffect, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, DemoConsole, Panel, Switch, line, type ConsoleLine } from "./ui";

type FileName = "app.js" | "styles.css";

const INITIAL: Record<FileName, string> = {
  "app.js": 'console.log("v1");',
  "styles.css": "body { color: black; }",
};

async function shortHash(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)]
    .slice(0, 4)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const hashedName = (file: FileName, hash: string) => file.replace(/\.(\w+)$/, `.${hash}.$1`);

export function CacheBusting() {
  const [sources, setSources] = useState(INITIAL);
  const [hashing, setHashing] = useState(true);
  /** What the server serves for each URL, after the last deploy. */
  const [server, setServer] = useState<Record<string, string>>({});
  /** What index.html references after the last deploy. */
  const [html, setHtml] = useState<string[]>([]);
  /** The browser's cache: URL → content, cached "forever". */
  const [cache, setCache] = useState<Record<string, string>>({});
  const [log, setLog] = useState<ConsoleLine[]>([]);
  const [hashes, setHashes] = useState<Record<FileName, string>>({ "app.js": "", "styles.css": "" });

  useEffect(() => {
    let active = true;
    Promise.all((Object.keys(sources) as FileName[]).map(async (file) => [file, await shortHash(sources[file])] as const)).then((entries) => {
      if (active) setHashes(Object.fromEntries(entries) as Record<FileName, string>);
    });
    return () => {
      active = false;
    };
  }, [sources]);

  function deploy() {
    const files = Object.keys(sources) as FileName[];
    const urls = files.map((file) => (hashing ? hashedName(file, hashes[file]) : file));
    setServer((current) => ({ ...current, ...Object.fromEntries(urls.map((url, index) => [url, sources[files[index]]])) }));
    setHtml(urls);
    setLog((current) => [...current, line(`deployed: index.html now references ${urls.join(", ")}`, "accent")]);
  }

  function visit() {
    if (html.length === 0) {
      setLog((current) => [...current, line("Deploy first: there is no site yet.", "warn")]);
      return;
    }
    const lines: ConsoleLine[] = [line("GET /index.html → network (no-cache)", "dim")];
    const nextCache = { ...cache };
    for (const url of html) {
      const fresh = server[url];
      if (url in nextCache) {
        const stale = nextCache[url] !== fresh;
        lines.push(line(`GET /${url} → cache hit${stale ? `: STALE, serving "${nextCache[url]}"` : ""}`, stale ? "error" : "default"));
      } else {
        nextCache[url] = fresh;
        lines.push(line(`GET /${url} → network, cached for a year`, "warn"));
      }
    }
    setCache(nextCache);
    setLog((current) => [...current, ...lines]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(sources) as FileName[]).map((file) => (
          <label key={file} className="flex flex-col gap-1">
            <span className={DEMO_LABEL}>
              {file} → <span className="text-clay normal-case">{hashing ? hashedName(file, hashes[file] || "…") : file}</span>
            </span>
            <input
              value={sources[file]}
              onChange={(event) => setSources((current) => ({ ...current, [file]: event.target.value }))}
              spellCheck={false}
              className="border-line-3 bg-well text-paper rounded-md border px-2.5 py-1.5 font-mono text-[12px] outline-none focus:border-flame"
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Switch label="content hash in file names" checked={hashing} onChange={setHashing} />
        <DemoButton tone="primary" onClick={deploy} disabled={hashing && !hashes["app.js"]}>
          Deploy
        </DemoButton>
        <DemoButton onClick={visit}>Visit the site</DemoButton>
        <DemoButton
          onClick={() => {
            setCache({});
            setLog((current) => [...current, line("cache cleared (a hard reload, or a new visitor)", "dim")]);
          }}
        >
          Clear the cache
        </DemoButton>
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Panel title={`browser cache (${Object.keys(cache).length} files)`}>
          {Object.keys(cache).length === 0 ? (
            <p className="text-slate m-0 font-mono text-[12px]">empty</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[11.5px]">
              {Object.entries(cache).map(([url, content]) => (
                <li key={url} className={cn("break-all", html.includes(url) ? "text-bone" : "text-slate line-through")}>
                  /{url}: &quot;{content}&quot;
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <DemoConsole lines={log} empty="Deploy, visit, edit a file, deploy and visit again." />
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Turn hashing off, deploy, visit, change <code className="prep-code">app.js</code>, deploy and visit again: the cache keeps serving v1.
        With hashing on, only the edited file gets a new name, and the untouched one stays a cache hit.
      </p>
    </div>
  );
}
