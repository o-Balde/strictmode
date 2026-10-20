import { useEffect, useState } from "react";

/**
 * AUTOCOMPLETE: reference solution.
 *
 * The effect is the debounce: every keystroke re-runs it, and its cleanup
 * cancels both the pending timer and the request in flight. The `if
 * (controller.signal.aborted)` checks are what keep a slow, superseded answer
 * from landing, even with a search function that ignores the signal.
 */
export type SearchFn = (query: string, signal: AbortSignal) => Promise<string[]>;

export interface AutocompleteProps {
  search: SearchFn;
  delayMs?: number;
}

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error" }
  | { state: "done"; items: string[] };

export function Autocomplete({ search, delayMs = 300 }: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  useEffect(() => {
    const term = query.trim();
    if (term === "") {
      setResult({ state: "idle" });
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      setResult({ state: "loading" });
      search(term, controller.signal).then(
        (items) => {
          if (!controller.signal.aborted) setResult({ state: "done", items });
        },
        () => {
          if (!controller.signal.aborted) setResult({ state: "error" });
        },
      );
    }, delayMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, search, delayMs]);

  return (
    <div>
      <input aria-label="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
      {result.state === "loading" ? <p data-testid="search-status">Loading...</p> : null}
      {result.state === "error" ? (
        <p data-testid="search-status" role="alert">
          Something went wrong
        </p>
      ) : null}
      {result.state === "done" && result.items.length === 0 ? <p data-testid="search-status">No results</p> : null}
      {result.state === "done" && result.items.length > 0 ? (
        <ul role="listbox" aria-label="Suggestions">
          {result.items.map((item) => (
            <li key={item} role="option" aria-selected={false}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
