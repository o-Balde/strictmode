import { list, output, p, say, table, trap, ts, tsx } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

/**
 * The four levels of each framework, as CodeSignal's briefs define them, with
 * what the tests check at each and the code shape that keeps the next level
 * additive.
 */
export const FRONTEND_LEVELS: PrepSection = {
  id: "cs-frontend-levels",
  track: "react",
  title: "Front-End framework, level by level",
  blurb:
    "What each level is allowed to ask (from the framework brief), what its tests check, and the shape of code that lets the next level add instead of rewrite.",
  questions: [
    {
      id: "cs-fe-level-1",
      question: "Level 1, layout and basic rendering (about 15 min): what is graded?",
      level: "junior",
      short:
        "Static JSON rendered into the designer's markup: exact text, the template's classes and test ids, the data's order, an empty state, stable keys. Normalise the data into **one flat list** now: every later level reads from it.",
      body: [
        p(
          "The brief limits Level 1 to HTML structure, the DOM and plain CSS, plus \"simple scripting\" to render UI from statically provided JSON. It excludes user interaction, API calls, animation, responsive design and specificity puzzles. So the tests are about what is on the page, not how it behaves.",
        ),
        tsx(
          `
type Status = "TO_DO" | "IN_PROGRESS" | "DONE";
interface Task {
  id: string;
  title: string;
  status: Status;
}
interface BoardData {
  todoItems: Task[];
  inProgressItems: Task[];
  doneItems: Task[];
}

const COLUMNS = [
  { status: "TO_DO", label: "To do" },
  { status: "IN_PROGRESS", label: "In progress" },
  { status: "DONE", label: "Done" },
] as const satisfies readonly { status: Status; label: string }[];

// The JSON's shape is the designer's grouping, not a data model.
const flatten = (data: BoardData): Task[] => [...data.todoItems, ...data.inProgressItems, ...data.doneItems];

function Board({ tasks }: { tasks: Task[] }) {
  return (
    <div className="board">
      {COLUMNS.map((column) => {
        const cards = tasks.filter((task) => task.status === column.status);
        return (
          <section key={column.status} className="column" data-testid={\`column-\${column.status}\`}>
            <h2 className="column__title">{column.label}</h2>
            {cards.length === 0 ? <p className="column__empty">No tasks</p> : null}
            {cards.map((task) => (
              <div key={task.id} className="card" data-testid={\`card-\${task.id}\`}>
                <h3 className="card__title">{task.title}</h3>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
`,
          { caption: "Board.tsx: one list, columns derived", tone: "good" },
        ),
        list(
          "**Exact text**: labels, counts, placeholders. Copy strings from the task, never retype them.",
          "**Selectors**: the template's `className`s and every `data-testid` the task names, on the element it names.",
          "**Order**: the order of the data, unless the task says to sort.",
          "**Empty states**: the placeholder renders when there is nothing, and only then.",
          "**Keys**: by id. The data often has duplicate titles on purpose.",
        ),
        trap(
          "Spending ten minutes on CSS. Level 1 can include \"straightforward\" styling, but the grader reads the DOM. Make it render correctly first; polish only if a test names a class or a style.",
        ),
      ],
      followUps: [
        {
          q: "Why not keep data.json's three arrays?",
          a: "Because Level 4 is very likely to move items between groups, and Level 3 may deliver them as one list with a `status`. A flat list with a field turns both into a one-line change.",
        },
        {
          q: "Where should the static data be imported?",
          a: "Once, at the top of the component that owns the state (`useState(() => flatten(data))`), so Level 3 can replace that one line with a fetch.",
        },
      ],
      docs: "https://react.dev/learn/rendering-lists",
    },
    {
      id: "cs-fe-level-2",
      question: "Level 2, dynamic interaction (about 25 min): what changes, and what do the tests try?",
      level: "junior",
      short:
        "User actions and inputs: a form with validation, toggles, counters, disabled states. Tests click and type like a user, then probe the edges: blank or whitespace input, double submits, limits, Enter instead of the button.",
      body: [
        p(
          "The brief's Level 2 adds handling user actions, changing the page in response, and data inputs with validation. Still no API and no animation.",
        ),
        tsx(
          `
function NewTaskForm({ onCreate }: { onCreate: (title: string, description: string) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // no page reload
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) {
      setError("Title and description are required");
      return;
    }
    onCreate(cleanTitle, cleanDescription);
    setTitle("");
    setDescription("");
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="taskTitle" value={title} onChange={(event) => setTitle(event.target.value)} />
      <textarea name="taskDescription" value={description} onChange={(event) => setDescription(event.target.value)} />
      {error ? <p role="alert">{error}</p> : null}
      <input type="submit" value="Create task" />
    </form>
  );
}
`,
          { caption: "The form shape that passes the usual Level 2 checks", tone: "good" },
        ),
        tsx(
          `
const MAX = 3;
const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set());

const toggle = (id: string) =>
  setSelected((current) => {
    const next = new Set(current); // new reference, or React will not re-render
    if (next.has(id)) next.delete(id);
    else if (next.size < MAX) next.add(id); // guard reads the newest state
    return next;
  });
`,
          { caption: "Selection as a Set of ids, guarded inside the updater", tone: "good" },
        ),
        list(
          "`onSubmit` on the `<form>`, not `onClick` on the button: Enter in a field then submits too.",
          "Trim before validating, and render the error as text the test can read (`role=\"alert\"` helps it find it).",
          "Derived values (counts, totals, \"is at limit\") are computed from state on render, never stored beside it.",
          "Limits and rules belong in the state update, not only in `disabled`: a test can dispatch two clicks before a re-render.",
        ),
      ],
      followUps: [
        {
          q: "Controlled inputs or FormData?",
          a: "Either passes. Controlled is easier to clear and to validate live; `new FormData(event.currentTarget)` is shorter for a submit-only form. Pick one and do not mix them on the same field.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/components/form",
    },
    {
      id: "cs-fe-level-3",
      question: "Level 3, consuming an API (about 30 min): what does a full-marks implementation handle?",
      level: "intermediate",
      short:
        "Loading, error and empty as distinct states; `response.ok` checked; the payload mapped onto your model (field names differ on purpose); dependent and parallel requests; pagination; sometimes a token in a header. The data source changes and the Level 1–2 UI should not notice.",
      body: [
        p(
          "The brief's Level 3 list: REST conventions, calling APIs asynchronously from the browser, simple auth (a token or password in a header), handling errors and status codes, pagination, and several, possibly dependent, endpoints. It excludes GraphQL, WebSockets, OAuth and libraries such as axios: it is `fetch`.",
        ),
        ts(
          `
const TOKEN = "candidate-token";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Authorization: \`Bearer \${TOKEN}\` } });
  // fetch only rejects when the network fails. A 404 or 500 resolves.
  if (!response.ok) throw new Error(\`GET \${url} failed with \${response.status}\`);
  return (await response.json()) as T;
}
`,
          { caption: "api.ts", tone: "good" },
        ),
        tsx(
          `
type Load<T> = { status: "loading" } | { status: "error" } | { status: "ready"; data: T };
type Task = { id: string; title: string };

function useTasks(attempt: number): Load<Task[]> {
  const [load, setLoad] = useState<Load<Task[]>>({ status: "loading" });

  useEffect(() => {
    let ignore = false; // set by cleanup: unmount, or a newer attempt
    setLoad({ status: "loading" });
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<{ data: Task[] }>;
      })
      .then(
        ({ data }) => {
          if (!ignore) setLoad({ status: "ready", data });
        },
        () => {
          if (!ignore) setLoad({ status: "error" });
        },
      );
    return () => {
      ignore = true;
    };
  }, [attempt]);

  return load;
}
`,
          { caption: "One effect, one union, a Retry that bumps `attempt`", tone: "good" },
        ),
        table(
          ["The test does", "Your code needs"],
          ["Holds the response back", "A visible loading state on the first render"],
          ["Answers 500 with a JSON body", "`if (!response.ok)`; the body is not data"],
          ["Drops the connection", "A `catch` that lands in the same error state"],
          ["Answers `[]`", "An empty state that is not the error state"],
          ["Clicks Retry", "A way to run the same load again"],
          ["Counts requests", "No duplicate requests; parallel where independent (`Promise.all`)"],
          ["Answers out of order", "Only the newest request writes state"],
        ),
        trap(
          "Awaiting dependent requests in a `for` loop: correct, but N round trips. When the next requests only need ids from the first, fire them together with `Promise.all`, and catch per item if one failure must not sink the rest.",
        ),
      ],
      followUps: [
        {
          q: "AbortController or an ignore flag?",
          a: "The flag is enough for correctness: it stops a stale response from writing state. AbortController also cancels the request itself. Use both when the request is expensive; a mocked `fetch` in a test may not honour the signal, so keep the flag either way.",
        },
        {
          q: "Fetch in an effect or in the click handler?",
          a: "Loading because the component appeared is an effect. Loading because the user clicked (View more, Retry) is the handler's job, or a state change the effect depends on.",
        },
      ],
      docs: "https://react.dev/learn/synchronizing-with-effects#fetching-data",
    },
    {
      id: "cs-fe-level-4",
      question: "Level 4, extending the design (about 20 min): why is it graded on Level 1?",
      level: "intermediate",
      short:
        "The brief says Level 4 adds no new skill: it evaluates how your earlier design absorbs related requirements (filters, sorting, moving items, priorities, bulk actions). With server data, user intent and view state kept apart, it is twenty lines; with flags inside the data, it is a rewrite.",
      body: [
        tsx(
          `
type Session = { id: string; title: string; track: string; seats: number };

declare const sessions: Session[]; // server data: replaced whole on each load
declare const selected: ReadonlySet<string>; // user intent: ids only
declare const track: string; // view state
declare const query: string;

const visible = useMemo(() => {
  const needle = query.trim().toLowerCase();
  return sessions
    .filter((session) => (track === "All" || session.track === track) && session.title.toLowerCase().includes(needle))
    .sort((a, b) => b.seats - a.seats || a.title.localeCompare(b.title));
}, [sessions, track, query]);

// Counts every selection, including those the filters hide.
const summary = \`\${selected.size} selected\`;
`,
          { caption: "Everything visible is derived; nothing derived is stored", tone: "good" },
        ),
        list(
          "**Hidden selections**: select, filter it out of view, check the summary; switch back, check it is still selected.",
          "**Bulk actions on the visible set**: \"clear visible\" uses the derived list; \"clear all\" uses the ids.",
          "**Refresh under a filter**: filters survive, selections reconcile.",
          "**Moves and reorders**: a moved item lands where the spec says (often the end), with all its data.",
        ),
        say(
          "\"I kept the API data, the user's selections and the filters in separate state, and derived what's on screen. So filtering never touched the selections, and Level 4 was a `useMemo`.\"",
        ),
      ],
      followUps: [
        {
          q: "Is `useMemo` required there?",
          a: "Not for correctness, and rarely for speed at this size. It documents that `visible` is derived. Without it, compute the same thing inline on render; never store it in state.",
        },
      ],
    },
  ],
};

export const ICF_LEVELS: PrepSection = {
  id: "cs-icf-levels",
  track: "coding",
  title: "Industry Coding framework, level by level",
  blurb:
    "The brief's budgets per level (time, methods, lines of code), and the TypeScript habits that keep a class fast to write and safe to extend under the clock.",
  questions: [
    {
      id: "cs-icf-level-1",
      question: "Level 1 (10–15 min, 3–4 methods): how do you write it so Levels 3 and 4 need no rewrite?",
      level: "intermediate",
      short:
        "A plain class over `Map`s keyed by id, each method a few lines, plus two hooks with no job yet: an internal shape that can hold time (an expiry per entry, a history per id) and a `settle(timestamp)` call at the top of every public method.",
      body: [
        table(
          ["Level", "Time", "New methods", "Lines (cumulative)", "Can include"],
          ["1", "10–15 min", "3–4 simple", "15–20", "loops, conditions, maps, corner cases, errors"],
          ["2", "20–30 min", "1–2 medium", "30–45", "aggregation, sorting, filtering, formats"],
          ["3", "30–60 min", "3–5, some wrapping old ones", "90–130", "refactoring, backward compatibility, queues, sorted maps"],
          ["4", "30–60 min", "1–2", "110–160", "extending without regressions"],
        ),
        ts(
          `
interface Account {
  balance: number;
  outgoing: number;
}

class Bank {
  private accounts = new Map<string, Account>();

  createAccount(timestamp: number, accountId: string): boolean {
    this.settle(timestamp); // does nothing yet; Level 3 will need it everywhere
    if (this.accounts.has(accountId)) return false;
    this.accounts.set(accountId, { balance: 0, outgoing: 0 });
    return true;
  }

  deposit(timestamp: number, accountId: string, amount: number): number | null {
    this.settle(timestamp);
    const account = this.accounts.get(accountId);
    if (!account) return null;
    account.balance += amount;
    return account.balance;
  }

  private settle(timestamp: number): void {
    void timestamp;
  }
}
`,
          { caption: "Level 1 with the Level 3 hook already in place", tone: "good" },
        ),
        trap(
          "Optimising early. The brief excludes complex algorithms at every level; the tests are about rules and corner cases. A sorted structure you write by hand costs ten minutes you need for Level 3.",
        ),
      ],
      followUps: [
        {
          q: "Should I read all four levels first?",
          a: "Read what is shown; later levels may be locked until the current one passes. The task text itself says to implement level by level while keeping in mind that you will refactor.",
        },
      ],
    },
    {
      id: "cs-icf-level-2",
      question: "Level 2 (20–30 min): which sorting and formatting details cost points?",
      level: "intermediate",
      short:
        "The tie-breaker, the kind of string order, and the exact output format. Sort by the primary key descending, break ties by id ascending with `<` (not `localeCompare`), and build strings exactly as specified, separators included.",
      body: [
        ts(
          `
console.log([10, 9, 1].sort());
console.log(["alpha", "Zeta", "beta"].sort());
console.log(["alpha", "Zeta", "beta"].sort((a, b) => a.localeCompare(b)));

const totals: [string, number][] = [["b", 5], ["a", 5], ["c", 9]];
const ranked = totals.sort(([idA, a], [idB, b]) => b - a || (idA < idB ? -1 : idA > idB ? 1 : 0));
console.log(ranked.map(([id, total]) => \`\${id}(\${total})\`).join(", "));
`,
        ),
        output(`
[ 1, 10, 9 ]
[ 'Zeta', 'alpha', 'beta' ]
[ 'alpha', 'beta', 'Zeta' ]
c(9), a(5), b(5)
`),
        list(
          "`sort()` without a comparator converts to strings: numbers sort as text.",
          "Plain string order puts every uppercase letter before every lowercase one; `localeCompare` does not. Specs that say \"lexicographic\" mean the former.",
          "Top-N with fewer than N items returns all of them. An empty result is `[]` or `\"\"`, whichever the signature says, never `null`.",
        ),
      ],
    },
    {
      id: "cs-icf-level-3",
      question: "Level 3 (30–60 min): how do you keep timestamps, TTLs and scheduled events correct?",
      level: "senior",
      short:
        "Use half-open intervals (`[start, start + ttl)`), process everything due at or before the call's timestamp before the call does anything, and record each effect at the time it fell due. Strictly increasing timestamps mean lazy processing is exact.",
      body: [
        ts(
          `
interface Pending {
  dueAt: number;
  accountId: string;
  amount: number;
}

const DAY = 86_400_000;
const pending: Pending[] = []; // appended in time order, fixed delay, so already sorted

function schedule(timestamp: number, accountId: string, amount: number) {
  pending.push({ dueAt: timestamp + DAY, accountId, amount: Math.floor(amount * 0.02) });
}

function settle(timestamp: number, credit: (accountId: string, amount: number, at: number) => void) {
  while (pending.length > 0 && pending[0].dueAt <= timestamp) {
    const due = pending.shift()!;
    credit(due.accountId, due.amount, due.dueAt); // at dueAt, not at timestamp
  }
}
`,
          { caption: "Lazy, exact scheduling", tone: "good" },
        ),
        list(
          "Alive means `timestamp < expiresAt`. Write it once, in one private method, and call it everywhere.",
          "\"Before anything else at that timestamp\" means `<=`, not `<`.",
          "If delays vary, keep the queue sorted on insert (or scan for the minimum); with a fixed delay, append order is due order.",
        ),
      ],
    },
    {
      id: "cs-icf-level-4",
      question: "Level 4: backup and restore, merges, look-back queries. What do they all need?",
      level: "senior",
      short:
        "Copies, not references; time stored relative where it must be re-anchored (remaining TTL); history per id with a tombstone when the id stops existing; and a merge that moves every reference to the absorbed id, including scheduled ones.",
      body: [
        ts(
          `
type History = { at: number; balance: number | null }[];

function balanceAt(history: History, timeAt: number): number | null {
  let balance: number | null = null;
  for (const change of history) {
    if (change.at > timeAt) break;
    balance = change.balance; // null after a merge removed the id
  }
  return balance;
}
`,
          { caption: "Look-back over an append-only history", tone: "good" },
        ),
        list(
          "Backup: `new Map([...records].map(([key, fields]) => [key, new Map(fields)]))`, or a structured clone; never the live map.",
          "Restore with TTLs: remaining = `expiresAt - backupTime`; new expiry = `restoreTime + remaining`.",
          "Merge: balances, counters, ownership of past records, and pending work all move; then the old id is removed and may be reused.",
        ),
      ],
    },
    {
      id: "cs-icf-typescript",
      question: "Which TypeScript habits keep ICF code fast to write and safe?",
      level: "intermediate",
      short:
        "`Map` over plain objects, `?? null` over `|| null`, return types copied from the interface, whole-number math with `Math.floor`, and no library features newer than the environment's `lib` (`findLast`, `toSorted`, `Object.groupBy`).",
      body: [
        ts(
          `
const sizes = new Map<string, number>([["empty.txt", 0]]);
console.log(sizes.get("empty.txt") || null);
console.log(sizes.get("empty.txt") ?? null);
console.log(Math.floor(149 * 0.02), Math.round(149 * 0.02));
`,
        ),
        output(`
null
0
2 3
`),
        list(
          "`Map` iterates in insertion order, has `.size`, and accepts any string as a key; an object has `__proto__` and `constructor` waiting to collide.",
          "`Array#findLast` and `toSorted` need `lib: ES2023`. If the editor flags them, `[...array].reverse().find(...)` and `[...array].sort(...)` work everywhere.",
          "Implement the provided interface (`class Impl implements Contract`): the compiler then checks every signature for you.",
        ),
      ],
    },
  ],
};
