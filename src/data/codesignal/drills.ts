import { list, output, p, say, table, trap, ts, tsx } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

/**
 * Short drills for the days before: each card is one bug, one compiler error
 * or one grading rule that has cost candidates points. Read the question,
 * find the problem yourself, then open the card.
 */
export const SPOT_THE_BUG: PrepSection = {
  id: "cs-spot-the-bug",
  track: "react",
  title: "Spot the bug",
  blurb:
    "The React mistakes that hidden tests are built to catch. Each one compiles, renders, and looks fine in a quick manual check.",
  drill: "hooks",
  questions: [
    {
      id: "cs-bug-stale-interval",
      question: "A countdown shows 9 and then stops changing. Why?",
      level: "intermediate",
      short:
        "The interval callback closed over the first render's `seconds`. Every tick computes `10 - 1`. Use the updater form, which receives the latest value.",
      body: [
        tsx(
          `
function Countdown() {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return <p>{seconds}</p>;
}
`,
          { caption: "Bug", tone: "bad" },
        ),
        tsx(
          `
function Countdown() {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  return <p>{seconds}</p>;
}
`,
          { caption: "Fix", tone: "good" },
        ),
      ],
      followUps: [
        {
          q: "Why not add `seconds` to the dependencies?",
          a: "It works, but tears down and recreates the interval every second, which drifts. The updater keeps one interval and always reads fresh state.",
        },
      ],
    },
    {
      id: "cs-bug-effect-object-dep",
      question: "The network tab shows the same request firing forever. What is in the dependency list?",
      level: "intermediate",
      short:
        "An object or array created during render. It is a new reference every render, the effect sets state, the state change re-renders, and the loop never ends. Depend on primitives, or create the object inside the effect.",
      body: [
        tsx(
          `
function Results({ page }: { page: number }) {
  const [rows, setRows] = useState<string[]>([]);
  const params = { page, size: 20 };
  useEffect(() => {
    fetch(\`/api/rows?page=\${params.page}&size=\${params.size}\`)
      .then((response) => response.json())
      .then(setRows);
  }, [params]);
  return <p>{rows.length}</p>;
}
`,
          { caption: "Bug: `params` is new on every render", tone: "bad" },
        ),
        tsx(
          `
function Results({ page }: { page: number }) {
  const [rows, setRows] = useState<string[]>([]);
  useEffect(() => {
    fetch(\`/api/rows?page=\${page}&size=20\`)
      .then((response) => response.json())
      .then(setRows);
  }, [page]);
  return <p>{rows.length}</p>;
}
`,
          { caption: "Fix", tone: "good" },
        ),
      ],
    },
    {
      id: "cs-bug-missing-ok",
      question: "The API returns 404 and the list shows one empty row. Where is the bug?",
      level: "junior",
      short:
        "`fetch` resolved with the 404 and the code parsed the error body as data. `fetch` rejects only on network failure; check `response.ok` (or `status`) before reading the body.",
      body: [
        ts(
          `
async function loadUsers(): Promise<{ id: string }[]> {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error(\`GET /api/users failed with \${response.status}\`);
  return (await response.json()) as { id: string }[];
}
`,
          { caption: "The check every fetch needs", tone: "good" },
        ),
        trap("A 204 No Content has no body: `response.json()` throws on it. Check the status before parsing when an endpoint can answer 204."),
      ],
    },
    {
      id: "cs-bug-search-race",
      question: "Typing \"react\" quickly sometimes shows the results for \"re\". Why, and what is the smallest fix?",
      level: "intermediate",
      short:
        "Requests for \"re\" and \"react\" were both in flight and \"re\" answered last. Ignore any response whose effect has been cleaned up: a local flag set in the cleanup (plus AbortController to cancel the request itself).",
      body: [
        tsx(
          `
function useSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;
    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, { signal: controller.signal })
      .then((response) => response.json() as Promise<string[]>)
      .then((items) => {
        if (!ignore) setResults(items);
      })
      .catch(() => {});
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [query]);
  return results;
}
`,
          { caption: "Cleanup decides who may write", tone: "good" },
        ),
      ],
      followUps: [
        {
          q: "Isn't AbortController alone enough?",
          a: "With real `fetch`, an aborted request rejects, so it cannot write. A test's mocked fetch or an SDK may ignore the signal; the flag still protects you.",
        },
      ],
    },
    {
      id: "cs-bug-mutate-state",
      question: "Clicking Add changes the array (you can see it in the console) but the list does not update. Why?",
      level: "junior",
      short:
        "The array was mutated and set back: same reference, so React treats it as unchanged and skips the render. Build a new array (or Set, or object).",
      body: [
        tsx(
          `
function Todos() {
  const [items, setItems] = useState<string[]>([]);
  return (
    <button
      onClick={() => {
        items.push("new");
        setItems(items);
      }}
    >
      Add ({items.length})
    </button>
  );
}
`,
          { caption: "Bug", tone: "bad" },
        ),
        tsx(
          `
function Todos() {
  const [items, setItems] = useState<string[]>([]);
  return <button onClick={() => setItems((current) => [...current, "new"])}>Add ({items.length})</button>;
}
`,
          { caption: "Fix", tone: "good" },
        ),
        table(
          ["Instead of", "Write"],
          ["`items.push(x)`", "`[...items, x]`"],
          ["`items.splice(i, 1)`", "`items.filter((_, index) => index !== i)`"],
          ["`items[i].done = true`", "`items.map((item, index) => (index === i ? { ...item, done: true } : item))`"],
          ["`set.add(id)`", "`new Set(set).add(id)`"],
          ["`items.sort()`", "`[...items].sort()`"],
        ),
      ],
    },
    {
      id: "cs-bug-zero-render",
      question: "An empty cart shows a stray `0` on the page. Where does it come from?",
      level: "junior",
      short:
        "`{items.length && <Badge />}`: when the length is `0`, the expression is `0`, and React renders numbers. Compare explicitly: `items.length > 0 && …`, or a ternary.",
      body: [
        tsx(
          `
declare const items: string[];
declare function Badge(props: { count: number }): JSX.Element;

const bad = <div>{items.length && <Badge count={items.length} />}</div>;
const good = <div>{items.length > 0 ? <Badge count={items.length} /> : null}</div>;
`,
        ),
        trap("A test asserting the cart is empty with `toBeEmptyDOMElement()` or exact text fails on that `0`."),
      ],
    },
    {
      id: "cs-bug-props-in-state",
      question: "The parent passes a new `initialCount`, but the child keeps showing the old number. Why?",
      level: "intermediate",
      short:
        "`useState(props.x)` reads the prop once, on mount. If the value should follow the prop, do not copy it into state: use the prop, or derive from it. If it is truly an initial value, reset the child with a `key`.",
      body: [
        tsx(
          `
function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount); // ignores later initialCount values
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function Parent({ resetTo }: { resetTo: number }) {
  // A new key remounts Counter, so its state starts again from resetTo.
  return <Counter key={resetTo} initialCount={resetTo} />;
}
`,
        ),
      ],
    },
    {
      id: "cs-bug-onclick-call",
      question: "The list empties itself on the first render. What is wrong with `onClick={remove(item.id)}`?",
      level: "junior",
      short:
        "It calls `remove` while rendering and passes its return value as the handler. Every render removes something; with a state update inside, React throws \"Too many re-renders\". Pass a function: `onClick={() => remove(item.id)}`.",
      body: [
        tsx(
          `
declare const items: { id: string; name: string }[];
declare function remove(id: string): void;

const list = items.map((item) => (
  <button key={item.id} onClick={() => remove(item.id)}>
    Remove {item.name}
  </button>
));
`,
          { caption: "Fix", tone: "good" },
        ),
      ],
    },
    {
      id: "cs-bug-double-update",
      question: "`setCount(count + 1); setCount(count + 1);` adds 1, not 2. Why?",
      level: "junior",
      short:
        "Both calls read the same render's `count`. Updates are queued and applied on the next render, so both set it to `count + 1`. When the next value depends on the previous one, use the updater form.",
      body: [
        ts(
          `
let count = 0;
const queue: ((current: number) => number)[] = [];
const setCount = (next: number | ((current: number) => number)) =>
  queue.push(typeof next === "function" ? next : () => next);

setCount(count + 1);
setCount(count + 1);
console.log(queue.reduce((value, update) => update(value), count));

queue.length = 0;
setCount((current) => current + 1);
setCount((current) => current + 1);
console.log(queue.reduce((value, update) => update(value), count));
`,
          { caption: "A model of React's update queue" },
        ),
        output(`
1
2
`),
      ],
    },
    {
      id: "cs-bug-strict-mode",
      question: "In development every row appears twice after the first load, but the test passes. What happened?",
      level: "intermediate",
      short:
        "StrictMode mounts, unmounts and remounts components in development, so a mount effect runs twice. An effect that appends (`setRows(rows => [...rows, ...page])`) appends twice. Make loads idempotent (page 0 replaces), or clean up so the first run cannot write.",
      body: [
        tsx(
          `
type Row = { id: string };
declare function loadPage(page: number): Promise<{ data: Row[] }>;

function Feed() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    let ignore = false;
    loadPage(0).then(({ data }) => {
      if (!ignore) setRows(data); // replace, never append, for the first page
    });
    return () => {
      ignore = true;
    };
  }, []);
  return <p>{rows.length}</p>;
}
`,
          { caption: "Idempotent and cleaned up", tone: "good" },
        ),
        say("Vite's and Create React App's templates wrap the app in `<StrictMode>`; assume the assessment's starter does too."),
      ],
    },
    {
      id: "cs-bug-index-keys",
      question: "Deleting the first row of an editable list moves the text typed in it into the next row. Why?",
      level: "intermediate",
      short:
        "The rows are keyed by index. After the delete, the component that was at index 1 is now at index 0, and React keeps the DOM input (and any state) that belonged to position 0. Key by a stable id.",
      body: [
        tsx(
          `
declare const rows: { id: string; label: string }[];

const bad = rows.map((row, index) => <input key={index} defaultValue={row.label} />);
const good = rows.map((row) => <input key={row.id} defaultValue={row.label} />);
`,
        ),
      ],
    },
    {
      id: "cs-bug-controlled-undefined",
      question: "React warns that a component is changing an uncontrolled input to be controlled. Where is it coming from?",
      level: "junior",
      short:
        "`value={user.name}` while `user.name` is `undefined` (still loading, or an optional field): the input starts uncontrolled, then becomes controlled. Always pass a string: `value={user.name ?? \"\"}`.",
      body: [
        tsx(
          `
declare const user: { name?: string };
declare function setName(value: string): void;

const field = <input value={user.name ?? ""} onChange={(event) => setName(event.target.value)} />;
`,
          { caption: "Fix", tone: "good" },
        ),
      ],
    },
  ],
};

export const TYPESCRIPT_UNDER_PRESSURE: PrepSection = {
  id: "cs-ts-pressure",
  track: "typescript",
  title: "TypeScript that compiles under pressure",
  blurb:
    "In a TypeScript environment, one unresolved error can stop the build, the preview, or the whole test run. These are the errors that show up mid-task, and the fastest correct way out of each.",
  drill: "types",
  questions: [
    {
      id: "cs-ts-events",
      question: "What are the event types for the handlers you will write in the assessment?",
      level: "junior",
      short:
        "`React.ChangeEvent<HTMLInputElement>` for inputs (`HTMLSelectElement`, `HTMLTextAreaElement` for those), `React.FormEvent<HTMLFormElement>` for submit, `React.MouseEvent<HTMLButtonElement>` for clicks, `React.KeyboardEvent<…>` for keys, `React.ClipboardEvent<…>` for paste. Inline handlers need no annotation at all.",
      body: [
        table(
          ["Handler", "Type", "The value you want"],
          ["`onChange` on `<input>`", "`React.ChangeEvent<HTMLInputElement>`", "`event.target.value` / `.checked`"],
          ["`onChange` on `<select>`", "`React.ChangeEvent<HTMLSelectElement>`", "`event.target.value`"],
          ["`onSubmit` on `<form>`", "`React.FormEvent<HTMLFormElement>`", "`event.preventDefault()`, `new FormData(event.currentTarget)`"],
          ["`onClick`", "`React.MouseEvent<HTMLButtonElement>`", "`event.currentTarget`"],
          ["`onKeyDown`", "`React.KeyboardEvent<HTMLInputElement>`", "`event.key`"],
          ["`onPaste`", "`React.ClipboardEvent<HTMLInputElement>`", "`event.clipboardData.getData(\"text\")`"],
        ),
        tsx(
          `
function Search({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  // Extracted handlers need the type...
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query.trim());
  }

  // ...inline ones infer it from the prop.
  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
    </form>
  );
}
`,
        ),
      ],
      docs: "https://react.dev/learn/typescript#typing-dom-events",
    },
    {
      id: "cs-ts-usestate-null",
      question: "`useState(null)` and later `setUser({ name: \"Ada\" })` does not compile. Why?",
      level: "junior",
      short:
        "From `null` alone TypeScript infers the state type `null`, so nothing else fits. Give the type: `useState<User | null>(null)`. Same for `useState([])`, which infers `never[]`.",
      body: [
        tsx(
          `
interface User {
  name: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    setUser({ name: "Ada" });
    setTags(["admin"]);
  }, []);
  return <p>{user?.name ?? "Loading..."} {tags.join(", ")}</p>;
}
`,
        ),
      ],
    },
    {
      id: "cs-ts-useref",
      question: "How do you type a ref to an input, and a ref that holds a timer id?",
      level: "junior",
      short:
        "DOM ref: `useRef<HTMLInputElement>(null)`, read with `ref.current?.focus()`. Mutable value: `useRef<number | null>(null)` (or `ReturnType<typeof setTimeout>`), which you assign freely.",
      body: [
        tsx(
          `
function FocusOnMount() {
  const input = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    input.current?.focus();
    timer.current = setTimeout(() => input.current?.select(), 100);
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  return <input ref={input} />;
}
`,
        ),
        trap("`setTimeout` returns `number` in the browser and `Timeout` in Node; `ReturnType<typeof setTimeout>` is right in both."),
      ],
    },
    {
      id: "cs-ts-fetch-json",
      question: "`response.json()` returns `any`. How much typing is enough in a timed task?",
      level: "intermediate",
      short:
        "Cast at one boundary (`(await response.json()) as ApiTask[]`) inside a helper, and map the API shape onto your own type there. If the spec mentions malformed data, check the fields you rely on before trusting the cast.",
      body: [
        ts(
          `
interface ApiSession {
  session_id: string;
  available_spots: number;
}
interface Session {
  id: string;
  seats: number;
}

function isApiSession(value: unknown): value is ApiSession {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.session_id === "string" && typeof record.available_spots === "number";
}

async function fetchSessions(): Promise<Session[]> {
  const response = await fetch("/api/sessions");
  if (!response.ok) throw new Error(\`GET /api/sessions failed with \${response.status}\`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || !payload.every(isApiSession)) throw new Error("Unexpected payload");
  return payload.map((item) => ({ id: item.session_id, seats: item.available_spots }));
}
`,
        ),
      ],
    },
    {
      id: "cs-ts-load-union",
      question: "Why model loading as a discriminated union instead of `isLoading`, `error` and `data`?",
      level: "intermediate",
      short:
        "Three independent fields allow impossible combinations (loading with an error, data with an error) and every render has to guess. A union makes each state explicit, and TypeScript narrows `data` to exist only when `status === \"ready\"`.",
      body: [
        tsx(
          `
type Load<T> = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; data: T };

function View({ load }: { load: Load<string[]> }) {
  switch (load.status) {
    case "loading":
      return <p>Loading...</p>;
    case "error":
      return <p role="alert">{load.message}</p>;
    case "ready":
      return <ul>{load.data.map((item) => <li key={item}>{item}</li>)}</ul>;
  }
}
`,
        ),
        say("The exception: Level 3 specs that keep old data on screen during a refresh. Then `data` lives outside the union, next to a status."),
      ],
    },
    {
      id: "cs-ts-json-import",
      question: "Importing data.json gives `Type 'string' is not assignable to type 'Status'`. What is the fix?",
      level: "intermediate",
      short:
        "JSON imports are typed from their values with literals widened: `\"TO_DO\"` becomes `string`. Assert once at the import (`data as BoardData`), or validate it, and work with your own types from there.",
      body: [
        ts(
          `
type Status = "TO_DO" | "IN_PROGRESS" | "DONE";
interface Task {
  id: string;
  status: Status;
}

const raw = { tasks: [{ id: "t1", status: "TO_DO" }] }; // what a JSON import looks like to TypeScript
const tasks: Task[] = raw.tasks; // error
const typed = raw.tasks as Task[];
`,
        ),
      ],
    },
    {
      id: "cs-ts-set-spread",
      question: "`[...selectedIds]` fails with TS2802, \"can only be iterated through when using the --downlevelIteration flag\". Now what?",
      level: "intermediate",
      short:
        "The project's `target` is ES5 (older starters still use it). Do not touch the tsconfig under the clock: `Array.from(set)` and `set.forEach` work under every target.",
      body: [
        ts(
          `
const selected = new Set(["s1", "s3"]);
const ids = Array.from(selected);
const next = new Set<string>();
selected.forEach((id) => {
  if (id !== "s1") next.add(id);
});
console.log(ids, Array.from(next));
`,
        ),
        output(`
[ 's1', 's3' ] [ 's3' ]
`),
      ],
    },
    {
      id: "cs-ts-lib-version",
      question: "`Property 'findLast' does not exist on type 'Snapshot[]'`, though it runs in the browser. Why?",
      level: "intermediate",
      short:
        "Types come from `lib` in tsconfig, not from the browser. `findLast`, `findLastIndex`, `toSorted`, `toReversed`, `with` need ES2023; `Object.groupBy` needs ES2024. Use the older equivalent.",
      body: [
        table(
          ["Newer", "Works on older lib"],
          ["`items.findLast(fn)`", "`[...items].reverse().find(fn)`"],
          ["`items.toSorted(compare)`", "`[...items].sort(compare)`"],
          ["`items.at(-1)` (ES2022)", "`items[items.length - 1]`"],
          ["`Object.groupBy(items, fn)`", "`items.reduce(...)` into a `Map`"],
          ["`structuredClone(value)`", "a hand-written copy for the shape you have"],
        ),
      ],
    },
    {
      id: "cs-ts-catch-unknown",
      question: "`catch (error) { setError(error.message) }` does not compile. What is the type of `error`?",
      level: "junior",
      short:
        "`unknown`, under `strict` (`useUnknownInCatchVariables`). Anything can be thrown. Narrow it: `error instanceof Error ? error.message : String(error)`.",
      body: [
        ts(
          `
function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

try {
  JSON.parse("{");
} catch (error) {
  console.log(error instanceof SyntaxError, typeof messageOf(error));
}
console.log(messageOf("thrown string"));
`,
        ),
        output(`
true string
thrown string
`),
      ],
    },
    {
      id: "cs-ts-async-effect",
      question: "Why does `useEffect(async () => { … })` fail to compile?",
      level: "junior",
      short:
        "An effect may return nothing or a cleanup function. An `async` function returns a Promise, which is neither, so TypeScript rejects it (and React would treat the Promise as a broken cleanup). Define the async function inside and call it.",
      body: [
        tsx(
          `
function Bad() {
  useEffect(async () => { // error
    await fetch("/api/tasks");
  }, []);
  return null;
}

function Good() {
  useEffect(() => {
    let ignore = false;
    async function load() {
      const response = await fetch("/api/tasks");
      if (!ignore && response.ok) console.log(await response.json());
    }
    void load();
    return () => {
      ignore = true;
    };
  }, []);
  return null;
}
`,
        ),
      ],
    },
    {
      id: "cs-ts-config-unions",
      question: "How do you get a type for the filter buttons without writing the list twice?",
      level: "intermediate",
      short:
        "Write the list once `as const` and derive the union with `typeof LIST[number]`. Add `satisfies` when each entry must match a shape, without losing the literal types.",
      body: [
        ts(
          `
const FILTERS = ["All", "Frontend", "Architecture", "AI"] as const;
type Filter = (typeof FILTERS)[number];

const COLUMNS = [
  { status: "TO_DO", label: "To do" },
  { status: "DONE", label: "Done" },
] as const satisfies readonly { status: string; label: string }[];
type ColumnStatus = (typeof COLUMNS)[number]["status"];

const active: Filter = "AI";
const done: ColumnStatus = "DONE";
console.log(active, done);
`,
        ),
        output(`
AI DONE
`),
      ],
    },
    {
      id: "cs-ts-escape-hatches",
      question: "Two minutes left and one type error stands between you and a green build. What is acceptable?",
      level: "intermediate",
      short:
        "A narrow, local escape: a type assertion on the one expression (`as Task[]`), a non-null assertion where you know it holds (`getElementById(\"root\")!`), or `// @ts-expect-error` with a reason. Never `any` across a module, and never leave the build red.",
      body: [
        ts(
          `
interface Task {
  id: string;
}
declare const payload: unknown;

const tasks = payload as Task[];
// @ts-expect-error the API sends seats as a string in this fixture; parsed on the next line
const seats: number = "12";
console.log(tasks.length >= 0, Number(seats));
`,
        ),
        say("If an interviewer reviews the code later, a commented assertion reads as a decision. A silent `any` reads as not knowing."),
      ],
    },
  ],
};

export const GRADER_PROOF: PrepSection = {
  id: "cs-grader-proof",
  track: "react",
  title: "Grader-proof React",
  blurb:
    "Correct for a person is not always correct for a test that reads the DOM. How the grader sees your page, and the details that make a working feature fail.",
  questions: [
    {
      id: "cs-grader-text",
      question: "The page shows \"3 selected\", but `getByText(\"3 selected\")` fails. Why?",
      level: "intermediate",
      short:
        "Testing Library's default matcher reads the text an element holds **directly**, from its own text nodes. `<p><strong>3</strong> selected</p>` has no element whose own text is \"3 selected\". Keep a required string inside one element: `<p>{count} selected</p>`.",
      body: [
        tsx(
          `
declare const count: number;

const fails = (
  <p data-testid="summary">
    <strong>{count}</strong> selected
  </p>
);
const passes = <p data-testid="summary">{count} selected</p>;
`,
        ),
        p(
          "A Selenium grader reads `element.text`, the visible text including children, so the first version passes there and fails under Testing Library. Writing it the second way passes both.",
        ),
      ],
      docs: "https://testing-library.com/docs/queries/about#textmatch",
    },
    {
      id: "cs-grader-hidden",
      question: "Why should an error message be removed from the DOM rather than hidden with CSS?",
      level: "junior",
      short:
        "A test asserting the error is gone (`queryByText(...)` is null) still finds a `display: none` element. Conditional rendering removes it. The same goes for loading messages, buttons that \"disappear\", and empty states.",
      body: [
        tsx(
          `
declare const error: string | null;

const hidden = <p style={{ display: error ? "block" : "none" }}>{error}</p>;
const removed = error ? <p role="alert">{error}</p> : null;
`,
        ),
      ],
    },
    {
      id: "cs-grader-strings",
      question: "Which string details fail exact-text checks most often?",
      level: "junior",
      short: "Case, plurals, punctuation, whitespace and look-alike characters. Copy every string from the task text.",
      body: [
        table(
          ["The spec says", "Common miss"],
          ["`0 selected`", "`0 Selected`, `0 selected.`"],
          ["`1 seat left`", "`1 seats left`"],
          ["`Loading...` (three dots)", "`Loading…` (one ellipsis character)"],
          ["`$1,234.50`", "`$1234.5`, `1,234.50`"],
          ["`Total: $7.00`", "`Total:$7.00`, `Total: $ 7.00`"],
          ["`No tasks`", "`No tasks found`"],
        ),
        trap("Text built across lines in JSX can lose or gain spaces. `{a}{\" \"}{b}` is explicit; a line break between two expressions is not a space."),
      ],
    },
    {
      id: "cs-grader-money",
      question: "How do you format money and sums so the text matches exactly?",
      level: "junior",
      short:
        "`Intl.NumberFormat(\"en-US\", { style: \"currency\", currency: \"USD\" })` for `$1,234.50`, created once at module level. Sum the numbers, format the result; floating-point noise disappears in formatting.",
      body: [
        ts(
          `
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(money.format(1234.5), money.format(7), money.format(0.1 + 0.2));
console.log((1234.5).toFixed(2), 0.1 + 0.2);
`,
        ),
        output(`
$1,234.50 $7.00 $0.30
1234.50 0.30000000000000004
`),
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",
    },
    {
      id: "cs-grader-dates",
      question: "The data says `2026-03-01` and the page shows Feb 28. What happened?",
      level: "intermediate",
      short:
        "A date-only string is parsed as **UTC** midnight; formatting in a timezone west of UTC shows the previous day. Format in UTC (`timeZone: \"UTC\"`), or build a local date from the parts.",
      body: [
        ts(
          `
const dateOnly = { month: "short", day: "numeric", year: "numeric" } as const;

// On a laptop in Los Angeles, the UTC midnight of "2026-03-01" is still Feb 28.
console.log(new Date("2026-03-01").toLocaleDateString("en-US", { ...dateOnly, timeZone: "America/Los_Angeles" }));
// Formatting in UTC keeps the calendar date the API sent...
console.log(new Date("2026-03-01").toLocaleDateString("en-US", { ...dateOnly, timeZone: "UTC" }));
// ...and so does building a local date from the parts.
const [year, month, day] = "2026-03-01".split("-").map(Number);
console.log(new Date(year, month - 1, day).toLocaleDateString("en-US", dateOnly));
`,
        ),
        output(`
Feb 28, 2026
Mar 1, 2026
Mar 1, 2026
`),
      ],
    },
    {
      id: "cs-grader-first-paint",
      question: "What should the very first render show when data loads in an effect?",
      level: "intermediate",
      short:
        "The loading state. Effects run after paint, so with `isLoading` starting `false` the first frame shows the empty state (\"No items\"), and a test reading the page right after render sees it. Start in the loading state.",
      body: [
        tsx(
          `
function Catalogue() {
  const [status, setStatus] = useState<"loading" | "ready">("loading"); // not "idle"
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json() as Promise<string[]>)
      .then((data) => {
        setItems(data);
        setStatus("ready");
      });
  }, []);
  if (status === "loading") return <p>Loading...</p>;
  return items.length === 0 ? <p>No items</p> : <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
`,
        ),
        trap("Never delay rendering with `setTimeout` to \"wait for data\": async queries poll for about a second by default, and fixed delays are both slow and flaky."),
      ],
    },
    {
      id: "cs-grader-selectors",
      question: "Which parts of the starter must not change, even when refactoring?",
      level: "junior",
      short:
        "Anything a test can import or query: file paths, the default or named export, component and prop names the spec renders, `data-testid`s, the template's class names, `aria-label`s, button text. Refactor freely behind them.",
      body: [
        list(
          "Keep the `data-testid` on the element the spec names (the `<li>`, not a `<div>` inside it). `within(card)` queries depend on it.",
          "Keep `export default function App()` if that is what the starter had; the grader imports it.",
          "Add new files and components as you like; the grader does not mind extra structure.",
        ),
      ],
    },
    {
      id: "cs-grader-forms",
      question: "What makes a form behave the same for a person and for a test?",
      level: "junior",
      short:
        "`onSubmit` on the `<form>` with `preventDefault()`, a real submit button (`type=\"submit\"`), labelled inputs, and validation messages rendered as text. Then a click, Enter in a field, and `user.type(... \"{Enter}\")` all submit.",
      body: [
        tsx(
          `
function AddTask({ onAdd }: { onAdd: (title: string) => void }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = String(new FormData(event.currentTarget).get("title") ?? "").trim();
        if (title) onAdd(title);
        event.currentTarget.reset();
      }}
    >
      <label>
        Title <input name="title" />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
`,
        ),
      ],
    },
  ],
};
