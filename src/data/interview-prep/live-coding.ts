import { jsx, list, output, p, say, steps, table, trap, ts, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const LIVE_CODING: PrepSection = {
  id: "coding",
  track: "coding",
  title: "Live coding exercises",
  blurb:
    "The practical round. These are the components and hooks that get asked for again and again. Write each one yourself before opening the solution, out loud, as you would in the room.",
  drill: "hooks",
  questions: [
    {
      id: "code-approach",
      question: "How do you approach a live coding exercise?",
      level: "junior",
      short:
        "Slow down at the start. Clarify what is being asked, say what state you need and where it lives, build the simplest working version end to end, and only then handle loading, errors and edge cases. Narrate throughout: the interviewer is assessing how you think, and silence gives them nothing.",
      body: [
        steps(
          "**Clarify** (two minutes). What are the inputs and outputs? Which states exist: loading, empty, error? Does it need to persist, be accessible, be styled? Restate the task in one sentence.",
          "**Design out loud.** Name the components and the state: what is stored, what is derived, who owns it. Mention the alternative you rejected.",
          "**Happy path first.** Get something on screen that works for the main case before polishing any part of it.",
          "**Then the unhappy paths.** Loading, error, empty, invalid input, rapid repeated actions.",
          "**Test it by hand** and say what you are checking. Fix what you find without apologising.",
          "**Close.** Say what you would do with more time: tests, accessibility, extracting a hook, performance for large inputs.",
        ),
        table(
          ["A quick self-review before you say 'done'", ""],
          ["State", "Nothing stored that could be computed; no mutation; updater functions where the next value depends on the last"],
          ["Lists", "Stable keys from the data, not the index"],
          ["Effects", "Every setup has a cleanup; dependencies are complete; requests can be cancelled"],
          ["Forms", "Inputs have labels; buttons have a `type`; submit is handled on the form, not on the button"],
          ["Async", "Loading, error and empty are each rendered"],
          ["Types", "No `any`; props typed; unions for anything with a fixed set of values"],
        ),
        say(
          "If I am unsure about something, I say so and say how I would find out. 'I do not remember whether this fires before paint; I would check the docs, and for now I will assume it does not' is a strong answer. A confident guess that turns out wrong is not.",
        ),
      ],
      followUps: [
        {
          q: "What if you get stuck?",
          a: "Say where you are stuck and what you have ruled out, then reduce the problem: hard-code the data, drop a requirement temporarily, or write the pure function first and the component second. Asking a precise question is fine; sitting in silence is not.",
        },
      ],
      docs: "https://react.dev/learn/thinking-in-react",
    },
    {
      id: "code-counter",
      question: "Build a counter with increment, decrement and reset, bounded by a minimum and maximum.",
      level: "junior",
      short:
        "One number in state. The buttons use the updater form, clamp the result, and disable themselves at the bounds. The disabled flags are derived during render, not stored.",
      body: [
        tsx(`
interface CounterProps {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function Counter({ initial = 0, min = -Infinity, max = Infinity, step = 1 }: CounterProps) {
  const [count, setCount] = useState(() => clamp(initial, min, max));

  const change = (delta: number) => setCount((current) => clamp(current + delta, min, max));

  return (
    <div role="group" aria-label="Counter">
      <button type="button" onClick={() => change(-step)} disabled={count <= min} aria-label="Decrease">
        −
      </button>
      <output aria-live="polite">{count}</output>
      <button type="button" onClick={() => change(step)} disabled={count >= max} aria-label="Increase">
        +
      </button>
      <button type="button" onClick={() => setCount(clamp(initial, min, max))}>
        Reset
      </button>
    </div>
  );
}
`),
        list(
          "**Updater function.** `setCount((current) => ...)` stays correct when the button is clicked faster than React re-renders.",
          "**`initial`, not `value`.** The name signals that the prop seeds the state once and is not kept in sync.",
          "**Derived, not stored.** `count <= min` is computed each render. A separate `isAtMin` state would be a second source of truth.",
          "**Icon-only buttons need a name.** `aria-label` gives a screen reader something to announce.",
        ),
      ],
      followUps: [
        {
          q: "How would you make it controllable by a parent?",
          a: "Accept `value` and `onChange` and hold no state of its own, like a native input. To support both, use the controlled value when `value` is provided and internal state otherwise.",
        },
        {
          q: "How would you add 'hold to repeat'?",
          a: "Start an interval on pointer down and clear it on pointer up, pointer leave and unmount. The interval callback must use the updater form, or it will repeat with a stale count.",
        },
      ],
      docs: "https://react.dev/learn/state-a-components-memory",
    },
    {
      id: "code-todo",
      question: "Build a todo list: add, toggle, delete, and filter by status.",
      level: "junior",
      short:
        "Two pieces of state: the list of todos and the current filter. The visible list and the remaining count are derived. Every update returns a new array, and each todo carries an ID created once, when it is added.",
      body: [
        tsx(`
interface Todo {
  id: string;
  title: string;
  done: boolean;
}

type Filter = "all" | "active" | "done";
const FILTERS: Filter[] = ["all", "active", "done"];

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState("");

  const visible = todos.filter((todo) => filter === "all" || todo.done === (filter === "done"));
  const remaining = todos.filter((todo) => !todo.done).length;

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();
    if (title === "") return;
    setTodos((current) => [...current, { id: crypto.randomUUID(), title, done: false }]);
    setDraft("");
  }

  const toggle = (id: string) =>
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));

  const remove = (id: string) => setTodos((current) => current.filter((todo) => todo.id !== id));

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">New todo</label>
        <input id="new-todo" value={draft} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div role="group" aria-label="Filter">
        {FILTERS.map((option) => (
          <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>
            {option}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p>Nothing here.</p>
      ) : (
        <ul>
          {visible.map((todo) => (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
                {todo.title}
              </label>
              <button type="button" onClick={() => remove(todo.id)} aria-label={"Delete " + todo.title}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>{remaining} left</p>
    </section>
  );
}
`),
        list(
          "**Submit on the form.** Handling `onSubmit` makes Enter work for free; a click handler on the button does not.",
          "**Keys are IDs.** With index keys, deleting the first item would shift every checkbox onto the wrong todo.",
          "**The filtered list is not state.** It is recomputed from `todos` and `filter`, so it can never be out of date.",
          "**An empty state.** A blank area reads as broken; say that there is nothing to show.",
        ),
      ],
      followUps: [
        {
          q: "How would you persist the list?",
          a: "Initialise state lazily from `localStorage` and write back in an effect that depends on `todos`, guarding both with `try`/`catch`. Under server rendering, read after mount to avoid a hydration mismatch.",
        },
        {
          q: "It now has 10,000 todos and typing in the input lags. Why, and what do you do?",
          a: "Every keystroke re-renders the whole list. Move the draft input into its own component so its state is local, memoise the row component, and virtualise the list.",
        },
        {
          q: "When would you switch to `useReducer`?",
          a: "When the operations multiply (edit, reorder, bulk complete, undo). A reducer keeps every transition in one testable function and gives children a single stable `dispatch`.",
        },
      ],
      docs: "https://react.dev/learn/updating-arrays-in-state",
    },
    {
      id: "code-use-fetch",
      question: "Write a `useFetch` hook.",
      level: "intermediate",
      short:
        "State is a discriminated union of loading, success and error. An effect keyed on the URL makes the request with an `AbortController`, and its cleanup aborts, which handles both unmounting and a URL that changes while a request is in flight.",
      body: [
        tsx(`
type FetchState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    async function load() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Request failed with " + res.status);
        const data = (await res.json()) as T;
        setState({ status: "success", data });
      } catch (error) {
        if (controller.signal.aborted) return; // superseded or unmounted
        setState({ status: "error", error: error instanceof Error ? error : new Error(String(error)) });
      }
    }

    void load();
    return () => controller.abort();
  }, [url]);

  return state;
}

interface Repo {
  id: number;
  name: string;
}

function RepoList({ user }: { user: string }) {
  const state = useFetch<Repo[]>("https://api.github.com/users/" + user + "/repos");

  if (state.status === "loading") return <p>Loading</p>;
  if (state.status === "error") return <p role="alert">{state.error.message}</p>;
  if (state.data.length === 0) return <p>No repositories.</p>;

  return (
    <ul>
      {state.data.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}
`),
        list(
          "**A union, not three booleans.** `isLoading`, `error` and `data` as separate values allow combinations that make no sense. The union lets the compiler narrow `state.data` after the checks.",
          "**The effect is not `async`.** It declares an async function inside and calls it, so it can still return a cleanup.",
          "**Check `res.ok`.** `fetch` resolves for a 404 or a 500.",
          "**Abort is not an error.** An aborted request rejects; that rejection must not be shown to the user.",
        ),
        trap(
          "`useFetch<Repo[]>` looks type-safe and is not: the generic is an unchecked assertion about what the server returns. Say so, and mention validating the response for anything that matters.",
        ),
      ],
      followUps: [
        {
          q: "What is missing compared with a real data library?",
          a: "Caching, de-duplication of identical requests, background revalidation, retries, pagination, mutations with invalidation, and server rendering. That list is the argument for TanStack Query or SWR.",
        },
        {
          q: "How would you add a `refetch` function?",
          a: "Keep a counter in state, include it in the effect's dependencies, and return a function that increments it.",
        },
        {
          q: "The component shows the previous user's repositories for a moment when `user` changes. Why?",
          a: "It does not here, because the effect sets loading before the request. A version that only sets state on success would keep the old data until the new response arrives, which is sometimes exactly what you want (stale-while-revalidate) and sometimes a bug.",
        },
      ],
      docs: "https://react.dev/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks",
    },
    {
      id: "code-debounced-search",
      question: "Build a search box that queries an API as the user types.",
      level: "intermediate",
      short:
        "The input is controlled and updates on every keystroke. An effect waits for a pause in typing before sending a request, and its cleanup cancels both the pending timer and any in-flight request, so results can never arrive out of order.",
      body: [
        tsx(`
interface User {
  id: string;
  name: string;
}

type Status = "idle" | "loading" | "error";

export function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const term = query.trim();
  const active = term.length >= 2; // too short to be worth a request

  useEffect(() => {
    if (!active) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const res = await fetch("/api/users?q=" + encodeURIComponent(term), { signal: controller.signal });
        if (!res.ok) throw new Error("Request failed with " + res.status);
        setResults((await res.json()) as User[]);
        setStatus("idle");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }, 300);

    // The next keystroke cancels the timer if it has not fired, and the request if it has.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term, active]);

  return (
    <div>
      <label htmlFor="user-search">Search users</label>
      <input
        id="user-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
      />

      <div aria-live="polite">
        {!active ? null : status === "error" ? (
          <p role="alert">Search failed. Keep typing to retry.</p>
        ) : status === "loading" && results.length === 0 ? (
          <p>Searching</p>
        ) : results.length === 0 ? (
          <p>No users match “{term}”.</p>
        ) : (
          <ul style={{ opacity: status === "loading" ? 0.6 : 1 }}>
            {results.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
`),
        table(
          ["Requirement", "Where it is handled"],
          ["Typing must feel instant", "The input is bound to `query`, which updates synchronously"],
          ["One request per pause, not per key", "The 300 ms timer, cleared by the effect cleanup"],
          ["No stale results", "`AbortController`: an older response can never overwrite a newer one"],
          ["Do not search for one letter", "`active` gates the effect and the results"],
          ["Encode the query", "`encodeURIComponent`, or a search for `a&b` breaks the URL"],
          ["All four states", "Too short, loading, error, empty, results"],
        ),
      ],
      followUps: [
        {
          q: "How would you make it a proper autocomplete?",
          a: "Keyboard navigation (arrow keys move an active index, Enter selects, Escape closes), the ARIA combobox pattern (`role=\"combobox\"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` on the input; `role=\"listbox\"` and `role=\"option\"` on the results), closing on outside click, and a cache keyed by query so going back a character is instant.",
        },
        {
          q: "Where would `useDeferredValue` fit?",
          a: "If rendering the results is slow, defer the value passed to the list so typing stays responsive. It does not reduce the number of requests, so it complements the debounce.",
        },
      ],
      docs: "https://react.dev/learn/synchronizing-with-effects",
    },
    {
      id: "code-use-local-storage",
      question: "Write a `useLocalStorage` hook.",
      level: "intermediate",
      short:
        "It behaves like `useState` but reads its initial value from `localStorage` and writes changes back. The details that matter are a lazy initialiser, guarding every storage access with `try`/`catch`, not touching `window` on the server, and listening for changes made in other tabs.",
      body: [
        tsx(`
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // server render
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : (JSON.parse(stored) as T);
    } catch {
      return initialValue; // storage blocked, or the stored value is not valid JSON
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage disabled: the in-memory value still works.
    }
  }, [key, value]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch {
        // Ignore a value another tab wrote in a format we cannot read.
      }
    }
    window.addEventListener("storage", onStorage); // fires for changes made in OTHER tabs
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [value, setValue] as const;
}

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Theme: {theme}</button>;
}
`),
        list(
          "**Lazy initialiser.** Reading and parsing storage once, not on every render.",
          "**`localStorage` can throw.** In private browsing, when blocked by policy, or when the quota is full.",
          "**It only stores strings.** `JSON.stringify` loses dates, maps, sets and `undefined`.",
          "**`as const`** makes the return a tuple, so callers get the same shape as `useState`.",
        ),
        trap(
          "With server rendering this version causes a hydration mismatch: the server renders `initialValue`, and the client's first render reads the stored value. Either read storage in an effect after mount (accepting a brief flash), or use `useSyncExternalStore` with a server snapshot.",
        ),
      ],
      followUps: [
        {
          q: "How do you stop a theme from flashing on load?",
          a: "No hook can run early enough. Put a tiny blocking script in the document head that reads the preference and sets a class or attribute on `<html>` before the first paint, or store the preference in a cookie so the server can render the right theme.",
        },
        {
          q: "Why is this unsuitable for auth tokens?",
          a: "Anything in `localStorage` is readable by every script on the page, so one XSS bug exposes it. Session credentials belong in `HttpOnly` cookies.",
        },
      ],
      docs: "https://react.dev/reference/react/useSyncExternalStore",
    },
    {
      id: "code-use-interval",
      question: "Build a countdown timer. Write the `useInterval` hook it needs.",
      level: "intermediate",
      short:
        "The difficulty is that an interval outlives renders, so its callback goes stale. `useInterval` keeps the latest callback in a ref and reads it from the timer, so the interval is created once and restarted only when the delay changes. Passing `null` as the delay pauses it.",
      body: [
        tsx(`
function useInterval(callback: () => void, delayMs: number | null) {
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback; // after every render, point at the newest callback
  });

  useEffect(() => {
    if (delayMs === null) return; // paused
    const id = setInterval(() => latest.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

export function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  const ticking = running && remaining > 0;
  useInterval(() => setRemaining((current) => Math.max(0, current - 1)), ticking ? 1000 : null);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  return (
    <div>
      <output role="timer" aria-live="off">
        {minutes}:{secs}
      </output>
      <button type="button" onClick={() => setRunning(!running)} disabled={remaining === 0}>
        {ticking ? "Pause" : "Start"}
      </button>
      <button
        type="button"
        onClick={() => {
          setRunning(false);
          setRemaining(seconds);
        }}
      >
        Reset
      </button>
      {remaining === 0 && <p role="status">Time is up.</p>}
    </div>
  );
}
`),
        list(
          "**Why not put the callback in the dependency array?** It is a new function every render, so the interval would be torn down and recreated each second, drifting further each time.",
          "**Pausing by delay.** `null` skips the effect, and the cleanup of the previous run has already cleared the timer.",
          "**`ticking` is derived** from `running` and `remaining`. When the count reaches zero the interval stops with no extra state.",
          "**In React 19.2**, `useEffectEvent` replaces the ref: wrap the callback in it and call that from the interval.",
        ),
        trap(
          "`setInterval` is not a clock. Timers are delayed when the tab is in the background or the main thread is busy, so counting ticks drifts. For an accurate timer, store the end timestamp and compute `remaining` from `Date.now()` on each tick.",
        ),
      ],
      followUps: [
        {
          q: "What if `seconds` changes while it is running?",
          a: "As written, nothing: the prop only seeds the state. To restart for a new duration, render it with `key={seconds}` so React creates a fresh instance.",
        },
      ],
      docs: "https://react.dev/reference/react/useEffectEvent",
    },
    {
      id: "code-accordion",
      question: "Build an accessible accordion.",
      level: "intermediate",
      short:
        "State is the set of open panel IDs. Each header is a real `<button>` inside a heading, with `aria-expanded` and `aria-controls`; each panel is a region labelled by its header. A prop switches between one-open-at-a-time and many.",
      body: [
        tsx(`
interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const baseId = useId();

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(allowMultiple ? current : []);
      if (current.has(id)) next.delete(id);
      else next.add(id);
      return next; // a new Set: mutating the old one would not re-render
    });
  }

  return (
    <div>
      {items.map((item) => {
        const open = openIds.has(item.id);
        const headerId = baseId + "-header-" + item.id;
        const panelId = baseId + "-panel-" + item.id;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                {item.title}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={headerId} hidden={!open}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
`),
        list(
          "**A button, not a div.** It is focusable and responds to Enter and Space with no extra code.",
          "**`aria-expanded`** tells assistive technology whether the section is open; **`aria-controls`** says which element it governs.",
          "**`hidden`** removes the panel from both the layout and the accessibility tree while keeping it mounted, so state inside it survives.",
          "**`useId`** keeps the IDs unique when several accordions are on the page.",
        ),
      ],
      followUps: [
        {
          q: "Should closed panels be unmounted?",
          a: "It depends. Unmounting (`{open && ...}`) saves work for heavy content but loses the panel's internal state and scroll position. Keeping it mounted and hidden preserves both. Say which you chose and why.",
        },
        {
          q: "How would you animate the height?",
          a: "Animating to `height: auto` is the classic problem. Options are a CSS grid row transitioning from `0fr` to `1fr`, the newer `interpolate-size`, or measuring the content. And honour `prefers-reduced-motion`.",
        },
        {
          q: "Is there a native element for this?",
          a: "`<details>` and `<summary>` give you a disclosure with no JavaScript, and the `name` attribute groups them so only one is open. Use it when you do not need custom behaviour.",
        },
      ],
      docs: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
    },
    {
      id: "code-star-rating",
      question: "Build a star rating component.",
      level: "intermediate",
      short:
        "A controlled component: `value` in, `onChange` out. Under the stars it is a radio group, which gives keyboard support and screen reader semantics for free. The only local state is which star the pointer is over, for the hover preview.",
      body: [
        tsx(`
interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label?: string;
}

export function StarRating({ value, onChange, max = 5, label = "Rating" }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const name = useId();
  const shown = hovered ?? value; // the preview wins while hovering

  return (
    <fieldset onMouseLeave={() => setHovered(null)}>
      <legend>{label}</legend>
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        return (
          <label key={star} onMouseEnter={() => setHovered(star)}>
            <input
              className="visually-hidden"
              type="radio"
              name={name}
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <span aria-hidden="true">{star <= shown ? "★" : "☆"}</span>
            <span className="visually-hidden">
              {star} of {max}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

function Review() {
  const [rating, setRating] = useState(0);
  return <StarRating value={rating} onChange={setRating} label="Rate this product" />;
}
`),
        list(
          "**Controlled by the parent**, like a native input, so it drops into any form and can be reset from outside.",
          "**Radio inputs do the hard part.** Arrow keys move between stars, Tab enters and leaves the group, and a screen reader announces '3 of 5, radio button, selected'.",
          "**The glyphs are decoration** (`aria-hidden`); the accessible name comes from the hidden text.",
          "**`hovered ?? value`**, not `||`: a rating of 0 is a real value.",
        ),
      ],
      followUps: [
        {
          q: "How would you allow clearing the rating?",
          a: "Radio groups cannot be unselected by clicking, so add an explicit 'Clear' button, or treat a click on the current value as a reset (and say that it is not discoverable by keyboard without the button).",
        },
        {
          q: "And half stars?",
          a: "Double the number of radio options (0.5 steps) and draw each star from two halves, or switch the underlying control to a range input, which is the right semantic for a continuous value.",
        },
      ],
      docs: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/",
    },
    {
      id: "code-form-validation",
      question: "Build a sign-up form with validation, without a library.",
      level: "intermediate",
      short:
        "Values and 'touched' flags are state; errors are derived by a pure `validate` function on every render. Errors are shown for a field once it has been blurred, and for all fields after a submit attempt. The submit handler prevents the default, validates, and tracks a submitting status.",
      body: [
        tsx(`
interface Values {
  email: string;
  password: string;
}
type Errors = Partial<Record<keyof Values, string>>;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!/^\\S+@\\S+\\.\\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.password.length < 12) errors.password = "Use at least 12 characters.";
  return errors;
}

export function SignUpForm({ onSubmit }: { onSubmit: (values: Values) => Promise<void> }) {
  const [values, setValues] = useState<Values>({ email: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "failed">("idle");
  const id = useId();

  const errors = validate(values); // derived: always matches the current values
  const visibleError = (field: keyof Values) => (touched[field] ? errors[field] : undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, password: true }); // reveal every error
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    try {
      await onSubmit(values);
      setStatus("idle");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {(["email", "password"] as const).map((field) => {
        const error = visibleError(field);
        return (
          <div key={field}>
            <label htmlFor={id + field}>{field === "email" ? "Email" : "Password"}</label>
            <input
              id={id + field}
              name={field}
              type={field}
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={error !== undefined}
              aria-describedby={error ? id + field + "-error" : undefined}
              autoComplete={field === "email" ? "email" : "new-password"}
            />
            {error && (
              <p id={id + field + "-error"} role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {status === "failed" && <p role="alert">Could not create the account. Try again.</p>}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating account" : "Sign up"}
      </button>
    </form>
  );
}
`),
        list(
          "**Errors are not state.** Storing them would mean remembering to update them on every change. Deriving them cannot go stale.",
          "**`touched`** stops the form from complaining about fields the user has not reached yet.",
          "**`noValidate`** turns off the browser's own validation bubbles so yours are the only ones.",
          "**The button stays enabled** when the form is invalid. A disabled submit gives no explanation; clicking it and seeing the errors does.",
          "**One `handleChange`** for all fields, keyed by the input's `name`.",
        ),
      ],
      followUps: [
        {
          q: "How would you add 'confirm password' or an async 'email already taken' check?",
          a: "Cross-field rules belong in `validate`, which sees all values. An async check runs on blur or debounced on change, stores its result separately, and is merged into the displayed errors; the server must still enforce uniqueness on submit.",
        },
        {
          q: "At what point do you bring in a library?",
          a: "When there are many fields, dynamic field arrays, nested objects or performance problems from re-rendering on every keystroke. React Hook Form with a schema removes most of this code.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/components/input",
    },
    {
      id: "code-data-table",
      question: "Build a table with search, sorting and pagination.",
      level: "intermediate",
      short:
        "Three small pieces of state: the query, the sort, and the page. Everything else is a pipeline computed from them: filter, then sort, then slice. Sorting copies the array first, and the page is clamped during render instead of being reset in an effect.",
      body: [
        tsx(`
interface Column<T> {
  key: keyof T & string;
  header: string;
}

interface DataTableProps<T extends { id: string | number }> {
  rows: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({ rows, columns, pageSize = 10 }: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: keyof T & string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered =
      needle === ""
        ? rows
        : rows.filter((row) => columns.some((column) => String(row[column.key]).toLowerCase().includes(needle)));

    if (!sort) return filtered;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      if (typeof left === "number" && typeof right === "number") return (left - right) * factor;
      return String(left).localeCompare(String(right)) * factor;
    });
  }, [rows, columns, query, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1); // clamp when filtering shrinks the list
  const visible = sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  function toggleSort(key: keyof T & string) {
    setSort((current) =>
      current?.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" },
    );
  }

  return (
    <div>
      <label>
        Search
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0); // a new search starts from the first page
          }}
        />
      </label>

      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const direction = sort?.key === column.key ? sort.direction : undefined;
              return (
                <th
                  key={column.key}
                  aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
                >
                  <button type="button" onClick={() => toggleSort(column.key)}>
                    {column.header}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>{String(row[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && <p>No rows match.</p>}

      <nav aria-label="Pagination">
        <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= pageCount - 1}>
          Next
        </button>
      </nav>
    </div>
  );
}
`),
        list(
          "**The generic** ties `columns` to `rows`: a column key that is not a property of the row type does not compile.",
          "**`[...filtered].sort(...)`**: `sort` mutates, and `filtered` may be the `rows` prop itself.",
          "**Resetting the page** happens in the event handler that changes the query, not in an effect watching the query.",
          "**`aria-sort`** on the header and a real `<button>` inside it make the sorting usable with a keyboard and a screen reader.",
        ),
      ],
      followUps: [
        {
          q: "The dataset has two million rows. What changes?",
          a: "Everything moves to the server: the query, sort and page become request parameters (and belong in the URL), the component renders one page of results, and the client's job becomes debouncing input, showing loading state and keeping previous data visible while the next page loads.",
        },
        {
          q: "Why keep table state in the URL?",
          a: "So a filtered, sorted view can be bookmarked and shared, survives a refresh, and works with the back button.",
        },
      ],
      docs: "https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes",
    },
    {
      id: "code-infinite-scroll",
      question: "Implement infinite scroll.",
      level: "senior",
      short:
        "Render the items followed by an empty sentinel element, and watch the sentinel with an `IntersectionObserver`. When it comes into view, load the next page using the cursor from the previous response, and append. Guard against loading twice, and stop when the server says there is no more.",
      body: [
        tsx(`
interface Page<T> {
  items: T[];
  nextCursor: string | null; // null means this was the last page
}

interface InfiniteListProps<T extends { id: string }> {
  loadPage: (cursor: string | null) => Promise<Page<T>>;
  renderItem: (item: T) => ReactNode;
}

export function InfiniteList<T extends { id: string }>({ loadPage, renderItem }: InfiniteListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (status === "loading" || !hasMore) return; // already busy, or finished
    setStatus("loading");
    try {
      const page = await loadPage(cursor);
      setItems((current) => [...current, ...page.items]);
      setCursor(page.nextCursor);
      setHasMore(page.nextCursor !== null);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, [cursor, hasMore, loadPage, status]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || status === "error") return; // after an error, wait for an explicit retry

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void loadMore();
      },
      { rootMargin: "400px" }, // start loading before the user reaches the end
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, status]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>

      {status === "loading" && <p aria-busy="true">Loading more</p>}
      {status === "error" && (
        <p role="alert">
          Could not load more. <button onClick={() => void loadMore()}>Retry</button>
        </p>
      )}
      {!hasMore && <p>You have reached the end.</p>}

      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
}
`),
        table(
          ["Decision", "Reason"],
          ["`IntersectionObserver`, not a scroll listener", "No handler firing on every scroll frame, no layout measurement, works in any scroll container"],
          ["Cursor pagination, not page numbers", "With offsets, an item inserted at the top shifts every page and produces duplicates or gaps"],
          ["`rootMargin`", "The next page is usually ready before the user sees a spinner"],
          ["A guard on `status`", "The observer can fire several times while one request is in flight"],
          ["A Retry button", "Auto-retrying a failing request forever, on every scroll, is how you take your own API down"],
        ),
        trap(
          "Infinite scroll has real costs: the footer becomes unreachable, there is no way to link to a position, Back loses your place unless you restore it, and the DOM grows without bound. For long sessions combine it with virtualisation, and consider a 'Load more' button, which keeps the user in control.",
        ),
      ],
      followUps: [
        {
          q: "How do you restore the scroll position when the user comes back?",
          a: "Keep the loaded pages in a cache that outlives the component (a query library does this), and let the browser or router restore the scroll offset once the same content has rendered.",
        },
        {
          q: "How do screen reader users know more content arrived?",
          a: "Announce it in a live region ('20 more results loaded') and make sure focus is not lost. A list that silently grows is invisible to them.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    },
    {
      id: "code-find-the-bugs",
      question: "Code review: find the bugs in this component.",
      level: "intermediate",
      short:
        "There are seven: an `async` effect, a missing dependency, no cancellation, state mutation, an `&&` that renders `0`, index keys, and a handler that is called during render instead of passed.",
      body: [
        jsx(
          `
function UserList({ teamId }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(async () => {
    const res = await fetch("/api/teams/" + teamId + "/users");
    setUsers(await res.json());
  }, []);

  function remove(id) {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    setUsers(users);
  }

  return (
    <ul>
      {users.length &&
        users.map((user, index) => (
          <li key={index} className={selected === user.id ? "selected" : ""} onClick={setSelected(user.id)}>
            {user.name}
            <button onClick={() => remove(user.id)}>Remove</button>
          </li>
        ))}
    </ul>
  );
}
`,
          { caption: "As submitted", tone: "bad" },
        ),
        table(
          ["#", "Bug", "Consequence"],
          ["1", "`useEffect(async () => ...)`", "An async function returns a promise; React expects a cleanup function or nothing"],
          ["2", "`[]` but the effect reads `teamId`", "Changing team never refetches: the list shows the old team"],
          ["3", "No abort or ignore flag", "A slow response for a previous team can overwrite the current one"],
          ["4", "`users.splice` then `setUsers(users)`", "State is mutated and the reference is unchanged, so React skips the re-render"],
          ["5", "`users.length && ...`", "Renders the number `0` when the list is empty"],
          ["6", "`key={index}`", "After a removal, DOM and component state shift to the wrong rows"],
          ["7", "`onClick={setSelected(user.id)}`", "Calls the setter during render: an infinite re-render loop"],
        ),
        tsx(
          `
interface User {
  id: string;
  name: string;
}

function UserList({ teamId }: { teamId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/teams/" + teamId + "/users", { signal: controller.signal })
      .then((res) => res.json() as Promise<User[]>)
      .then(setUsers)
      .catch(() => {});

    return () => controller.abort();
  }, [teamId]);

  const remove = (id: string) => setUsers((current) => current.filter((user) => user.id !== id));

  if (users.length === 0) return <p>No users.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className={selected === user.id ? "selected" : ""}>
          <button type="button" onClick={() => setSelected(user.id)}>
            {user.name}
          </button>
          <button type="button" onClick={() => remove(user.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
`,
          { caption: "Fixed", tone: "good" },
        ),
        p(
          "The fixed version also moves the click from the `<li>` to a `<button>`, so the row can be selected from the keyboard, and stops a click on Remove from also selecting the row through bubbling.",
        ),
      ],
      followUps: [
        {
          q: "What is still missing from the fixed version?",
          a: "Loading and error states, a check of `res.ok`, and validation of the response shape. And `selected` can point at a user that has since been removed, which should be handled by clearing it or deriving the selected user from the list.",
        },
      ],
      docs: "https://react.dev/learn/synchronizing-with-effects",
    },
    {
      id: "code-ts-spot-the-bug",
      question: "Spot the bug: three small TypeScript functions that compile and are wrong.",
      level: "junior",
      short:
        "A filter that keeps the odd numbers, a loop that is off by one at both ends, and a factorial that always returns zero. All three type-check, which is the point: the compiler verifies types, not logic.",
      body: [
        ts(
          `
function evens(numbers: number[]) {
  return numbers.filter((n) => n % 2);
}

function sum(numbers: number[]) {
  let total = 0;
  for (let i = 1; i <= numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function factorial(n: number) {
  let result = 1;
  for (let i = n; i >= 0; i--) {
    result *= i;
  }
  return result;
}

console.log(evens([1, 2, 3, 4]));
console.log(sum([1, 2, 3]));
console.log(factorial(5));
`,
          { caption: "As written", tone: "bad" },
        ),
        output(`
[ 1, 3 ]
NaN
0
`),
        table(
          ["Function", "Bug", "Fix"],
          ["`evens`", "`n % 2` is `1` (truthy) for odd numbers, so the filter keeps the odds", "`n % 2 === 0`"],
          ["`sum`", "Starts at index 1 and runs to `length`, skipping the first element and reading one past the end (`undefined`, hence `NaN`)", "`for (let i = 0; i < numbers.length; i++)`, or `for...of`"],
          ["`factorial`", "The loop runs for `i = 0`, multiplying the result by zero", "`i > 0`"],
        ),
        ts(
          `
function evens(numbers: number[]) {
  return numbers.filter((n) => n % 2 === 0);
}

function sum(numbers: number[]) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("factorial expects a non-negative integer");
  let result = 1;
  for (let i = n; i > 1; i--) result *= i;
  return result;
}

console.log(evens([1, 2, 3, 4]));
console.log(sum([1, 2, 3]));
console.log(factorial(5), factorial(0));
`,
          { caption: "Fixed", tone: "good" },
        ),
        output(`
[ 2, 4 ]
6
120 1
`),
        list(
          "With `noUncheckedIndexedAccess` enabled, the buggy `sum` would not have compiled: `numbers[i]` would be `number | undefined`.",
          "Iterating with `for...of` or `reduce` removes the index, and with it the whole class of off-by-one errors.",
          "Other favourites in this style: a class method that reads a field without `this.`, a property assigned in a constructor but never declared, class members separated by commas, and a function annotated to return `any[]` when it clearly returns `number[]`.",
        ),
      ],
      followUps: [
        {
          q: "The snippet you are handed has no bug. What do you say?",
          a: "That it is correct, and why. Some interviewers include a clean snippet on purpose; inventing a problem to have something to say is worse than confidently finding none.",
        },
      ],
      docs: "https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess",
    },
    {
      id: "code-typed-event-emitter",
      question: "Implement a type-safe event emitter in TypeScript.",
      level: "senior",
      short:
        "Make the class generic over a map from event name to payload type. `on` and `emit` are then generic over a key of that map, so the event name is checked, and the listener's parameter and the emitted payload are inferred from it.",
      body: [
        ts(`
type Listener<Payload> = (payload: Payload) => void;

class TypedEmitter<Events extends Record<string, unknown>> {
  #listeners = new Map<keyof Events, Set<Listener<never>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    const listeners = this.#listeners.get(event) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(event, listeners);
    return () => listeners.delete(listener); // the unsubscribe function
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const listeners = this.#listeners.get(event) as Set<Listener<Events[K]>> | undefined;
    listeners?.forEach((listener) => listener(payload));
  }
}

type AppEvents = {
  login: { userId: string };
  logout: undefined;
  "cart:add": { sku: string; quantity: number };
};

const emitter = new TypedEmitter<AppEvents>();

const unsubscribe = emitter.on("login", ({ userId }) => console.log("welcome", userId));
emitter.on("cart:add", ({ sku, quantity }) => console.log(quantity + " x " + sku));

emitter.emit("login", { userId: "u_1" });
emitter.emit("cart:add", { sku: "kbd-01", quantity: 2 });
unsubscribe();
emitter.emit("login", { userId: "u_2" }); // nobody is listening any more
`),
        output(`
welcome u_1
2 x kbd-01
`),
        ts(`
type AppEvents = { login: { userId: string }; logout: undefined };

// The public shape of TypedEmitter<AppEvents>:
declare const emitter: {
  on<K extends keyof AppEvents>(event: K, listener: (payload: AppEvents[K]) => void): () => void;
  emit<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void;
};

emitter.emit("login", { id: "u_1" }); // error: the payload must be { userId: string }
emitter.emit("signup", { userId: "u_1" }); // error: "signup" is not a known event
emitter.on("login", (payload: { sku: string }) => {}); // error: wrong listener parameter
`,
          { caption: "What the types reject" },
        ),
        list(
          "**`K extends keyof Events`** captures the specific event name, and **`Events[K]`** looks up its payload. That pairing is the whole trick.",
          "**Returning the unsubscribe function** from `on` fits React's effect cleanup exactly: `useEffect(() => emitter.on(\"login\", handler), [])`.",
          "**One honest assertion.** The map stores listeners for different events together, so the lookup in `emit` needs a cast. The public API is fully checked; the unsafety is confined to one private line.",
        ),
        trap(
          "The event map is declared with `type`, not `interface`. An interface is not assignable to `Record<string, unknown>` because it could be extended by declaration merging, so `TypedEmitter<SomeInterface>` fails the constraint.",
        ),
      ],
      followUps: [
        {
          q: "How would you make the payload optional for events that carry none?",
          a: "Type the rest of the arguments as a conditional tuple: `...args: Events[K] extends undefined ? [] : [payload: Events[K]]`. Then `emit(\"logout\")` and `emit(\"login\", { ... })` are both checked.",
        },
        {
          q: "What happens if a listener unsubscribes while an event is being emitted?",
          a: "A `Set` tolerates deletion during iteration, and a listener removed before its turn is skipped. If you need 'everyone registered at the start gets called', iterate over a copy.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
    },
    {
      id: "code-parking-lot",
      question: "Design a parking lot using object-oriented principles in TypeScript.",
      level: "intermediate",
      short:
        "Model the two things that vary, spot kinds and vehicle kinds, as unions, and put the rules for which vehicle fits where in one data table. The lot tracks free spots per kind and hands out tickets; every query the brief asks for becomes a one-line getter.",
      body: [
        p(
          "A typical brief: the lot has motorcycle, car and large spots. A motorcycle can park anywhere, a car in a car or large spot, and a van in one large spot or three car spots. Report total and remaining spots, whether the lot is full or empty, whether a given kind of spot is full, and how many spots vans occupy. Ask about anything unstated, such as whether the van's three spots must be adjacent.",
        ),
        ts(`
type SpotKind = "motorcycle" | "car" | "large";
type VehicleKind = "motorcycle" | "car" | "van";

/** Where each vehicle may park, in order of preference: [spot kind, how many it needs]. */
const PARKING_OPTIONS: Record<VehicleKind, readonly (readonly [SpotKind, number])[]> = {
  motorcycle: [["motorcycle", 1], ["car", 1], ["large", 1]],
  car: [["car", 1], ["large", 1]],
  van: [["large", 1], ["car", 3]],
};

interface Ticket {
  id: number;
  vehicle: VehicleKind;
  spot: SpotKind;
  count: number;
}

const total = (counts: Record<SpotKind, number>) => counts.motorcycle + counts.car + counts.large;

class ParkingLot {
  readonly #capacity: Record<SpotKind, number>;
  readonly #free: Record<SpotKind, number>;
  readonly #tickets = new Map<number, Ticket>();
  #nextId = 1;

  constructor(capacity: Record<SpotKind, number>) {
    this.#capacity = { ...capacity };
    this.#free = { ...capacity };
  }

  park(vehicle: VehicleKind): Ticket | null {
    for (const [spot, count] of PARKING_OPTIONS[vehicle]) {
      if (this.#free[spot] < count) continue;
      this.#free[spot] -= count;
      const ticket: Ticket = { id: this.#nextId++, vehicle, spot, count };
      this.#tickets.set(ticket.id, ticket);
      return ticket;
    }
    return null; // nowhere suitable
  }

  leave(ticketId: number): boolean {
    const ticket = this.#tickets.get(ticketId);
    if (!ticket) return false;
    this.#free[ticket.spot] += ticket.count;
    return this.#tickets.delete(ticketId);
  }

  get totalSpots() {
    return total(this.#capacity);
  }
  get remainingSpots() {
    return total(this.#free);
  }
  get isFull() {
    return this.remainingSpots === 0;
  }
  get isEmpty() {
    return this.#tickets.size === 0;
  }

  isFullFor(spot: SpotKind) {
    return this.#free[spot] === 0;
  }

  spotsTakenBy(vehicle: VehicleKind) {
    let taken = 0;
    for (const ticket of this.#tickets.values()) {
      if (ticket.vehicle === vehicle) taken += ticket.count;
    }
    return taken;
  }
}

const lot = new ParkingLot({ motorcycle: 1, car: 4, large: 1 });

lot.park("van"); // takes the large spot
const secondVan = lot.park("van"); // no large spot left: takes three car spots
lot.park("motorcycle");
lot.park("car");

console.log(lot.totalSpots, lot.remainingSpots);
console.log(lot.isFull, lot.isFullFor("large"));
console.log(lot.spotsTakenBy("van"));
console.log(lot.park("car"));

if (secondVan) lot.leave(secondVan.id);
console.log(lot.remainingSpots, lot.isFull);
`),
        output(`
6 0
true true
4
null
3 false
`),
        list(
          "**Rules as data.** Adding a bus, or letting motorcycles share a spot, is a new row in `PARKING_OPTIONS`, not a new branch in `park`.",
          "**Unions over classes.** A `Vehicle` base class with `Motorcycle`, `Car` and `Van` subclasses would add three files and no behaviour. Reach for classes when the variants carry different logic.",
          "**Encapsulation.** `#free` and `#tickets` are private, so the counts cannot be put out of sync from outside; the only way to change them is `park` and `leave`.",
          "**The ticket is the source of truth** for what must be given back, so `leave` cannot free the wrong number of spots.",
        ),
      ],
      followUps: [
        {
          q: "The van's three car spots must be next to each other. What changes?",
          a: "Counts are no longer enough. Model each row as an array of spots and search for a run of three free ones, storing the indices on the ticket. Mention the cost: allocation becomes a scan, and fragmentation becomes possible.",
        },
        {
          q: "How would you extend this to multiple levels, or to pricing?",
          a: "Compose: a `Garage` holding several `ParkingLot` levels and trying each in turn. Pricing is a separate object that takes a ticket and a duration, so the lot does not need to know about money.",
        },
        {
          q: "What would you test?",
          a: "Each vehicle's preference order, the fallback when the preferred spot is full, `leave` restoring the exact count, an unknown ticket ID, and the full and empty boundaries.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    },
  ],
};
