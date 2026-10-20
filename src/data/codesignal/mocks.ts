import { list, p, say, ts, tsx } from "../interview-prep/blocks";
import type { Mock } from "./types";

/**
 * Timed mocks. Each level's brief is the spec as the assessment would state
 * it; the file named in `spec` is what grades it. When a brief and its spec
 * disagree, the spec wins, and the brief is the bug.
 */
export const MOCKS: Mock[] = [
  {
    id: "task-board",
    kind: "frontend",
    title: "Task board",
    scenario: "Implement a simple task tracking application, one level at a time.",
    basis:
      "CodeSignal's own example for the Front-End framework (task tracker: render columns from data.json, add tasks with a form, consume an API with a second user endpoint, move cards left and right), merged with the Coinbase report of the same shape.",
    sources: ["cs-frontend-brief", "coinbase-frontendlead"],
    provided: [
      { path: "mocks/task-board/contract.ts", caption: "contract.ts: types and endpoints" },
      { path: "mocks/task-board/data.json", caption: "data.json: Level 1 data" },
      { path: "mocks/task-board/src/App.tsx", caption: "src/App.tsx: your starting point" },
    ],
    levels: [
      {
        title: "Common layout and basic rendering",
        minutes: 15,
        spec: "mocks/task-board/specs/level1.test.tsx",
        brief: [
          p(
            "The designer has provided a static template (in `src/App.tsx`) and `data.json`, whose tasks are split into `todoItems`, `inProgressItems` and `doneItems`. Render every task in its column.",
          ),
          list(
            "The board is `<div className=\"board\">` with `<h2 className=\"board__title\">Tasks</h2>`.",
            "Three columns, in this order: **To do** (`TO_DO`), **In progress** (`IN_PROGRESS`), **Done** (`DONE`). Each is `<section className=\"column\" data-testid=\"column-{STATUS}\">` holding `<h2 className=\"column__title\">{label}</h2>` and `<span className=\"column__count\" data-testid=\"count-{STATUS}\">{n}</span>`.",
            "Each task is `<div className=\"card\" data-testid=\"card-{id}\">` with `<h3 className=\"card__title\">` and `<p className=\"card__description\">`, in data.json's order.",
            "A column with no tasks shows `<p className=\"column__empty\">No tasks</p>` instead.",
          ),
        ],
        traps: [
          "Two tasks share the title \"Fix flaky test\". A `key` built from the title collides, and the spec listens for React's duplicate-key warning.",
          "Three arrays because data.json has three. Level 4 then has to splice between them. One list with a `status` field, filtered per column, survives every later level.",
        ],
      },
      {
        title: "Dynamic interaction",
        minutes: 25,
        spec: "mocks/task-board/specs/level2.test.tsx",
        brief: [
          p("The designer has provided a form for new tasks. Add it below the board:"),
          tsx(
            `
<form className="task-form">
  <div className="input-container">
    <input name="taskTitle" placeholder="Task title*" />
  </div>
  <div className="input-container">
    <textarea name="taskDescription" placeholder="Task description*" />
  </div>
  <div>
    <input type="submit" value="Create task" />
  </div>
</form>
`,
            { caption: "Template" },
          ),
          list(
            "Submitting (the button, or Enter in the title field) appends a new task to the **end** of To do.",
            "Trim both fields. If either is empty after trimming, show `<p className=\"form__error\" role=\"alert\">Title and description are required</p>` and add nothing.",
            "After a successful submit, clear both fields and the error.",
            "New tasks need ids that never collide with existing ones; their cards use `card-{id}` like the rest. Counts update.",
          ),
        ],
        traps: [
          "No `event.preventDefault()`: the browser submits the form for real and reloads. The spec catches jsdom's \"Not implemented\" error for it.",
          "Validating before trimming lets `\"   \"` through.",
          "`Date.now()` as an id: two tasks created in the same millisecond collide, and a test can easily do that.",
        ],
      },
      {
        title: "Consuming an API",
        minutes: 30,
        spec: "mocks/task-board/specs/level3.test.tsx",
        brief: [
          p("The backend is ready. Replace data.json with the API described in `contract.ts`."),
          list(
            "On mount, `GET /api/tasks` returns `{ \"data\": ApiTask[] }`: one flat list. `status` decides the column, array order the order within it.",
            "While loading, render only `<p data-testid=\"board-status\">Loading tasks...</p>`.",
            "On a non-2xx response or a network failure, render `<p role=\"alert\" data-testid=\"board-error\">Could not load tasks</p>` and a `<button>Retry</button>` that tries again.",
            "Each card shows its owner: `<p className=\"card__assignee\">Assigned to {firstName} {lastName}</p>`, or `Unassigned` when the task has no `assignedUser`.",
            "Resolve owners with `GET /api/users/{id}`. Request each distinct user **once**, all in parallel, and show the board when tasks and users are both in. If a user request fails, that user's cards say `Assigned to Unknown user` and the rest of the board renders as normal.",
            "Tasks created with the Level 2 form are `Unassigned`.",
          ),
        ],
        traps: [
          "`fetch` resolves on a 500. Without `if (!response.ok)` you parse an error body as data; the spec's 500 body even contains `data: []`.",
          "Awaiting users one by one in a `for` loop is correct but sequential. The spec holds both user responses back and checks both requests were already sent.",
          "Letting one failed user reject the whole `Promise.all`. Catch per user, inside the map.",
        ],
      },
      {
        title: "Extending the design",
        minutes: 20,
        spec: "mocks/task-board/specs/level4.test.tsx",
        brief: [
          p("Let users move cards between columns. The designer has provided the buttons:"),
          tsx(
            `
<div className="card__buttons">
  <button aria-label="button left" className="card__button card__button--left" type="button" />
  <button aria-label="button right" className="card__button card__button--right" type="button" />
</div>
`,
            { caption: "Template" },
          ),
          list(
            "`button right` moves the card to the next column, `button left` to the previous one. A moved card goes to the **end** of its new column and keeps everything about it, owner included.",
            "Cards in **To do** have no `button left`; cards in **Done** have no `button right`.",
            "Counts and the `No tasks` placeholder stay correct.",
            "Every card also gets `<button aria-label=\"delete task\" type=\"button\" />`, which removes that card only.",
          ),
        ],
        traps: [
          "Changing `status` in place keeps the card's position in the flat list, so it lands mid-column. Remove it and append it.",
          "With one array per column, a move is a splice out and a push in, by index; duplicate titles and stale indexes break it.",
        ],
      },
    ],
    debrief: [
      p(
        "The reference holds **one flat list** of tasks with a `status`, and derives each column with `filter` on render. Level 2 appends to it, Level 3 changes where it comes from, Level 4 changes a status and re-appends. Nothing written in Level 1 is rewritten.",
      ),
      list(
        "Loading is a three-state union (`\"loading\" | \"error\" | \"ready\"`), not two booleans that can both be true.",
        "The fetch effect re-runs on an `attempt` counter, so Retry is `setAttempt(n => n + 1)`, and an `ignore` flag in the cleanup drops a response from a superseded attempt.",
        "Owners: `new Set(...)` for distinct ids, `Promise.all` over a function that catches its own failure, so one missing user cannot fail the board.",
      ),
      tsx(
        `
async function fetchUserName(id: string): Promise<string> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) return "Unknown user";
    const user = (await response.json()) as { firstName: string; lastName: string };
    return \`\${user.firstName} \${user.lastName}\`;
  } catch {
    return "Unknown user";
  }
}

async function ownerNames(ids: string[]): Promise<Map<string, string>> {
  const distinct = [...new Set(ids)];
  return new Map(await Promise.all(distinct.map(async (id) => [id, await fetchUserName(id)] as const)));
}
`,
        { caption: "Distinct ids, in parallel, failure contained per request", tone: "good" },
      ),
    ],
    solution: [{ path: "mocks/task-board/solution/App.tsx" }],
  },
  {
    id: "session-shortlist",
    kind: "frontend",
    title: "Workshop shortlist",
    scenario: "A conference catalogue: shortlist up to three workshops, then keep the shortlist honest as data and filters change.",
    basis:
      "The four-level mock from your research notes, tightened into exact specs: render with capacity → select with a limit → load and reconcile → filter while counting hidden selections. Each level targets a bug class candidates report losing points to.",
    sources: ["cs-frontend-brief"],
    provided: [
      { path: "mocks/session-shortlist/contract.ts", caption: "contract.ts: types and endpoints" },
      { path: "mocks/session-shortlist/sessions.json", caption: "sessions.json: Level 1 data" },
      { path: "mocks/session-shortlist/src/App.tsx", caption: "src/App.tsx: your starting point" },
    ],
    levels: [
      {
        title: "Render the catalogue",
        minutes: 15,
        spec: "mocks/session-shortlist/specs/level1.test.tsx",
        brief: [
          p("Render every session in `sessions.json`, in order, with the template in `src/App.tsx`."),
          list(
            "Above the list: `<p data-testid=\"selected-summary\">0 selected</p>`.",
            "Each session is `<li data-testid=\"session-card-{id}\">` with an `<h3>` title, its track, and `<span data-testid=\"seats-{id}\">` reading `{n} seats left`, `1 seat left`, or `Full` at zero.",
            "Each card has `<button data-testid=\"toggle-btn-{id}\">` reading `Select`, or `Full` and `disabled` when no seats are left.",
          ),
        ],
        traps: [
          "\"1 seats left\" fails an exact-text check.",
          "A `selected: boolean` on each session object. Level 3 replaces the objects and Level 4 filters them; the flag is lost or miscounted both times. Keep a `Set` of ids.",
        ],
      },
      {
        title: "Build a shortlist",
        minutes: 25,
        spec: "mocks/session-shortlist/specs/level2.test.tsx",
        brief: [
          list(
            "Clicking `Select` adds the session to the shortlist: its button reads `Selected` and the summary reads `{count} selected`. Clicking `Selected` removes it.",
            "At most **3** sessions. Once three are selected, every other open session's button is `disabled`; the selected ones stay enabled so they can be removed.",
            "A full session can never be selected.",
          ),
        ],
        traps: [
          "Checking the limit against render-time state (`selectedIds.size`) in the click handler. Two clicks dispatched before a re-render both pass it. Check inside the updater function; the spec does exactly this.",
          "Mutating the Set (`selected.add(id); setSelected(selected)`): same reference, so React bails out and nothing re-renders.",
        ],
      },
      {
        title: "Load the catalogue from the API",
        minutes: 30,
        spec: "mocks/session-shortlist/specs/level3.test.tsx",
        brief: [
          list(
            "Load the catalogue from `GET /api/sessions` on mount. It returns `ApiSession[]` with `session_id`, `session_title`, `category` and `available_spots`; map them onto your `Session`.",
            "Add `<button data-testid=\"refresh-btn\">Refresh catalogue</button>`, which loads again. While a load is in flight, show `<p data-testid=\"status-msg\">Loading...</p>` and disable the button.",
            "If the request fails (non-2xx or network) or the payload has a duplicate `session_id` or a negative seat count, show `<p data-testid=\"error-msg\" role=\"alert\">Failed to load sessions</p>` and `<button data-testid=\"retry-btn\">Retry</button>`. Keep the sessions and selections already on screen.",
            "A valid empty list shows `<p data-testid=\"empty-msg\">No sessions available</p>`.",
            "After a successful load, drop selections whose session disappeared or is now full, and keep the rest.",
          ),
        ],
        traps: [
          "Clearing `sessions` on error (\"reset everything\") breaks the keep-what-you-had rule.",
          "Validating after `setSessions`: by then the bad payload is on screen. Normalise and validate first, then commit.",
          "Not reconciling: the summary keeps counting a session that no longer exists.",
        ],
      },
      {
        title: "Filter, search and bulk-clear",
        minutes: 20,
        spec: "mocks/session-shortlist/specs/level4.test.tsx",
        brief: [
          list(
            "Track filters: `<button data-testid=\"filter-All\">`, `filter-Frontend`, `filter-Architecture`, `filter-AI`, with `aria-pressed` true on the active one (All by default).",
            "A search box `<input data-testid=\"search-input\">`: case-insensitive substring match on the title, ignoring surrounding spaces. Track and search combine.",
            "Filtering changes which cards render, **not** the shortlist. The summary and the three-session limit count hidden selections too.",
            "`<button data-testid=\"clear-visible-btn\">Clear visible selections</button>` deselects only the sessions currently shown.",
            "When nothing matches, show `<p data-testid=\"empty-msg\">No sessions match your filters</p>`.",
            "Filters survive a refresh, and reconciliation still applies to hidden selections.",
          ),
        ],
        traps: [
          "Counting `visible.filter(isSelected).length`: right until a filter hides a selection.",
          "Keeping the filtered list in state: it goes stale on every refresh. Derive it from sessions plus filters with `useMemo`.",
        ],
      },
    ],
    debrief: [
      p(
        "Three kinds of state, never mixed: **server data** (`sessions`, replaced whole by each successful load), **user intent** (`selectedIds`, a Set of ids), and **view** (`track`, `query`). What is visible is derived. That separation is why Level 4 is twenty lines.",
      ),
      p("The reference in your notes gets that separation right. What it would lose points on:"),
      list(
        "`loadSessions` lists `isLoading` as a dependency and reads it as a guard. The callback is recreated on every load, the effect's dependency list leaves it out, and the guard reads a stale value. A stable callback plus a request-id ref does the same job without either problem.",
        "Nothing stops an older response from landing after a newer one (a Retry during a slow load, or StrictMode's double mount). The request-id check drops it.",
        "`isLoading` starts `false`, so the first paint shows \"No sessions available\" before loading begins. Start it `true`.",
      ),
      tsx(
        `
type Session = { id: string; seatsRemaining: number };
declare function fetchSessions(): Promise<Session[]>;

/** After a reload, keep only selections that still exist and still have room. */
function keepStillSelectable(selected: ReadonlySet<string>, sessions: Session[]): ReadonlySet<string> {
  const open = new Set(sessions.filter((session) => session.seatsRemaining > 0).map((session) => session.id));
  return new Set([...selected].filter((id) => open.has(id)));
}

function useCatalogue() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true); // true: the first paint is a loading state
  const [error, setError] = useState<string | null>(null);
  const latestRequest = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;
    setIsLoading(true);
    setError(null);
    try {
      const next = await fetchSessions();
      if (requestId !== latestRequest.current) return; // a newer load owns the state
      setSessions(next);
      setSelectedIds((current) => keepStillSelectable(current, next));
    } catch {
      if (requestId === latestRequest.current) setError("Failed to load sessions");
    } finally {
      if (requestId === latestRequest.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { sessions, selectedIds, setSelectedIds, isLoading, error, load };
}
`,
        { caption: "Stable loader: no stale guard, no out-of-order writes", tone: "good" },
      ),
    ],
    solution: [{ path: "mocks/session-shortlist/solution/App.tsx" }],
  },
  {
    id: "ledger",
    kind: "frontend",
    title: "Expense ledger",
    scenario: "Card transactions for a finance team: render, approve, paginate from the API, filter by employee.",
    basis:
      "The same domain as Ramp's public front-end challenge, rebuilt as four levels: every bug in that challenge (View more replacing data, the All Employees crash, approvals reverting, View more at the end of data) is a spec here that your own code has to pass.",
    sources: ["ramp-fe-challenge", "greatfrontend-coinbase"],
    provided: [
      { path: "mocks/ledger/contract.ts", caption: "contract.ts: types and endpoints" },
      { path: "mocks/ledger/transactions.json", caption: "transactions.json: Level 1 data" },
      { path: "mocks/ledger/src/App.tsx", caption: "src/App.tsx: your starting point" },
    ],
    levels: [
      {
        title: "Render the ledger",
        minutes: 15,
        spec: "mocks/ledger/specs/level1.test.tsx",
        brief: [
          list(
            "Render `transactions.json` as a table: one `<tr data-testid=\"txn-{id}\">` per transaction, in order, showing the merchant, the employee's full name, the date and the amount.",
            "Amounts in US dollars with cents and separators: `$1,234.50`, `$7.00`.",
            "Dates as `Mar 1, 2026`. The data holds calendar dates (`2026-03-01`) that must show the same day in every timezone.",
            "Below the table: `<p data-testid=\"ledger-total\">Total: $1,799.89</p>`, the sum of the rows.",
          ),
        ],
        traps: [
          "`new Date(\"2026-03-01\")` is UTC midnight, which prints as Feb 28 anywhere west of UTC. The specs run on Los Angeles time.",
          "`amount.toFixed(2)` gives `1234.50`, without the `$` or the comma. Use `Intl.NumberFormat`.",
        ],
      },
      {
        title: "Approve transactions",
        minutes: 25,
        spec: "mocks/ledger/specs/level2.test.tsx",
        brief: [
          list(
            "Each row gets `<input type=\"checkbox\" data-testid=\"approve-{id}\" aria-label=\"Approve {merchant}\">`, checked when the transaction is approved. Clicking toggles it.",
            "`<p data-testid=\"approved-summary\">` reads `{approved} of {rows} approved ({approved total})`, for example `2 of 5 approved ($1,324.49)`.",
          ),
        ],
        traps: [
          "Each row holding its own `useState(transaction.approved)`: the summary cannot see it. Lift approvals to the component that renders the summary.",
          "Writing `transaction.approved = true` on the imported JSON object: no re-render, and the change leaks into every later render and test.",
        ],
      },
      {
        title: "Paginate from the API, save approvals",
        minutes: 30,
        spec: "mocks/ledger/specs/level3.test.tsx",
        brief: [
          list(
            "Load pages from `GET /api/transactions?page={n}`, which returns `{ data, nextPage }`, starting at page 0; `nextPage` is null on the last page. While the first page loads, show `<p data-testid=\"ledger-status\">Loading transactions...</p>`.",
            "`<button data-testid=\"view-more\">View more</button>` **appends** the next page. While it loads it is disabled and reads `Loading...`. Hide it when there is no next page.",
            "When a page fails (non-2xx or network), show `<p role=\"alert\" data-testid=\"ledger-error\">Could not load transactions</p>` and `<button data-testid=\"retry-btn\">Retry</button>`, which retries **that** page. Rows already shown stay.",
            "Save approvals with `PUT /api/transactions/{id}/approval` and the body `{ \"approved\": boolean }`. Flip the checkbox immediately; if the request fails, flip it back and show `<p role=\"alert\" data-testid=\"approval-error\">Could not update approval</p>`.",
            "Total and summary cover every loaded row. An empty first page shows `<p data-testid=\"ledger-empty\">No transactions</p>`.",
          ),
        ],
        traps: [
          "`setRows(page.data)` replaces instead of appending: Ramp's bug 4.",
          "Showing View more when `nextPage` is null, so the next click asks for `page=null`: Ramp's bug 6.",
          "Treating the 500 body as a page. The spec's error body is `{ data: [], nextPage: null }`, which looks like a valid last page.",
        ],
      },
      {
        title: "Filter by employee",
        minutes: 20,
        spec: "mocks/ledger/specs/level4.test.tsx",
        brief: [
          list(
            "Add `<select data-testid=\"employee-filter\">` with `All employees` (value `\"\"`) and one option per employee from `GET /api/employees`, labelled with the full name and valued with the id.",
            "Choosing an employee shows only `GET /api/employees/{id}/transactions` (all of theirs, not paginated) and hides View more. Total and summary follow the rows on screen.",
            "Choosing `All employees` again brings back every page already loaded, **without refetching**, and View more with it. Never request an empty employee id.",
            "An approval made in either view still shows after switching views, even before the server has answered.",
            "If the user switches employees quickly, only the last choice's rows may appear, whatever order the responses arrive in.",
          ),
        ],
        traps: [
          "Calling the employee endpoint with `\"\"` when All is chosen: Ramp's bug 3, a crash.",
          "Approvals written into the rows of one list. The other list is a stale server snapshot, so the box snaps back when you switch: Ramp's bug 7.",
          "No request ordering: a slow first response overwrites the second.",
        ],
      },
    ],
    debrief: [
      p(
        "Two lists and a map. `feed` holds every loaded page plus `nextPage`; `employeeView` holds one employee's rows or null; `approvals` holds the user's changes by id and is applied on top of whichever list is showing. Both lists are server snapshots, so neither is where the user's changes live.",
      ),
      tsx(
        `
type Transaction = { id: string; approved: boolean };

const [approvals, setApprovals] = useState<Record<string, boolean>>({});

// One lookup, used by every view: the user's change wins over the snapshot.
const isApproved = (transaction: Transaction) => approvals[transaction.id] ?? transaction.approved;
`,
        { caption: "Overrides on top of snapshots", tone: "good" },
      ),
      list(
        "Page 0 **replaces** and later pages append, so a second page-0 load (StrictMode mounts effects twice in development) cannot duplicate rows.",
        "Retry and View more are the same call: `loadPage(feed.nextPage)`. A failed page leaves `nextPage` where it was.",
        "Employee selection keeps a request counter in a ref; only the newest selection writes state. Choosing All bumps the counter too, so a late response cannot reopen an employee view.",
      ),
    ],
    solution: [{ path: "mocks/ledger/solution/App.tsx" }],
  },
  {
    id: "in-memory-db",
    kind: "icf",
    title: "In-memory database",
    scenario: "Records keyed by `key`, each holding `field → value` strings. Grows from CRUD to scans, TTLs, then backup and restore.",
    basis:
      "The most reported Industry Coding task (Anthropic, Trade Desk, eBay): set/get/delete → scans → timestamps and TTL → backup/restore or look-back.",
    sources: ["blind-anthropic", "prachub-tradedesk", "cs-icf-brief"],
    provided: [
      { path: "icf/in-memory-db/contract.ts", caption: "contract.ts: every method's rules" },
      { path: "icf/in-memory-db/src/simulation.ts", caption: "src/simulation.ts: your starting point" },
    ],
    levels: [
      {
        title: "Basic operations",
        minutes: 12,
        spec: "icf/in-memory-db/specs/level1.test.ts",
        brief: [
          list(
            "`set(key, field, value)`: inserts the field into the record (creating the record), or updates it.",
            "`get(key, field)`: the value, or `null` when the record or the field does not exist.",
            "`delete(key, field)`: removes the field; `true` if it existed, `false` otherwise.",
          ),
        ],
        traps: [
          "`return record[field] || null` turns a stored empty string into `null`. Use `?? null`.",
          "A plain object as the store: a key like `\"constructor\"` or `\"__proto__\"` misbehaves. `Map` has no such keys.",
        ],
      },
      {
        title: "Scans",
        minutes: 18,
        spec: "icf/in-memory-db/specs/level2.test.ts",
        brief: [
          list(
            "`scan(key)`: every field of the record as `\"field(value)\"`, sorted by field name in plain string order; `[]` for a missing record.",
            "`scanByPrefix(key, prefix)`: the same, keeping only fields whose name starts with `prefix`.",
          ),
        ],
        traps: [
          "`localeCompare` sorts `alpha` before `Zeta`; plain string order puts `Zeta` first (uppercase sorts before lowercase). Compare with `<`.",
          "A record whose last field was deleted should scan as `[]`, not error.",
        ],
      },
      {
        title: "Timestamps and TTL",
        minutes: 30,
        spec: "icf/in-memory-db/specs/level3.test.ts",
        brief: [
          p("Every call now carries a timestamp; timestamps strictly increase."),
          list(
            "`setAt(key, field, value, timestamp)`: like `set`; the field never expires, clearing any earlier TTL.",
            "`setAtWithTtl(key, field, value, timestamp, ttl)`: the field exists for timestamps in `[timestamp, timestamp + ttl)`.",
            "`deleteAt`, `getAt`, `scanAt`, `scanByPrefixAt`: as before, at a moment in time, where an expired field counts as not existing.",
          ),
        ],
        traps: [
          "Off by one at the boundary: alive at `start + ttl - 1`, gone at `start + ttl`.",
          "Rewriting Level 1 instead of extending it. If Level 1 stored an expiry per field from the start (`Infinity`), Level 3 is a parameter, not a refactor.",
        ],
      },
      {
        title: "Backup and restore",
        minutes: 25,
        spec: "icf/in-memory-db/specs/level4.test.ts",
        brief: [
          list(
            "`backup(timestamp)`: saves the whole database as it is at `timestamp`, remembering how long each expiring field has left; returns how many records hold at least one live field.",
            "`restore(timestamp, timestampToRestore)`: replaces the database with the latest backup taken at or before `timestampToRestore`. A field that had `r` ms left when backed up now expires at `timestamp + r`.",
          ),
        ],
        traps: [
          "Saving a reference instead of a copy: later writes change the backup.",
          "Restoring the absolute expiry: the field should get its remaining lifetime, counted from the restore.",
          "Taking the first matching backup instead of the latest one at or before the requested time.",
        ],
      },
    ],
    debrief: [
      p(
        "Store an expiry on every field from Level 1 (`Infinity` for never). Then the untimed methods are the timed ones at time 0, Level 3 is a timestamp passed through, and Level 4 is a copy of the map with expiries turned into remaining time.",
      ),
      ts(
        `
interface Entry {
  value: string;
  expiresAt: number; // Number.POSITIVE_INFINITY = never
}

class Store {
  private records = new Map<string, Map<string, Entry>>();

  // Level 1 is Level 3 at a moment where nothing has expired.
  get(key: string, field: string): string | null {
    return this.getAt(key, field, 0);
  }

  getAt(key: string, field: string, timestamp: number): string | null {
    const entry = this.records.get(key)?.get(field);
    return entry && entry.expiresAt > timestamp ? entry.value : null;
  }
}
`,
        { caption: "The Level 1 shape that makes Levels 3 and 4 cheap", tone: "good" },
      ),
    ],
    solution: [{ path: "icf/in-memory-db/solution/simulation.ts" }],
  },
  {
    id: "banking",
    kind: "icf",
    title: "Banking system",
    scenario: "Accounts, deposits and transfers; then rankings, payments with delayed cashback, merges and balance history.",
    basis:
      "The bank variant reported for Dropbox and Ramp: accounts → top spenders → scheduled payments with cashback → merges and historical balances.",
    sources: ["taro-dropbox", "oavo-ramp-banking", "cs-icf-brief"],
    provided: [
      { path: "icf/banking/contract.ts", caption: "contract.ts: every method's rules" },
      { path: "icf/banking/src/simulation.ts", caption: "src/simulation.ts: your starting point" },
    ],
    levels: [
      {
        title: "Accounts, deposits, transfers",
        minutes: 12,
        spec: "icf/banking/specs/level1.test.ts",
        brief: [
          p("Every call carries a timestamp in milliseconds; timestamps strictly increase. Amounts are whole numbers."),
          list(
            "`createAccount(timestamp, accountId)`: `false` if the id is taken.",
            "`deposit(timestamp, accountId, amount)`: the new balance, or `null` for a missing account.",
            "`transfer(timestamp, source, target, amount)`: the source's new balance, or `null` when either account is missing, both are the same, or the source cannot cover it.",
          ),
        ],
        traps: [
          "Transferring to the same account must be refused, not treated as a no-op that returns the balance.",
          "A refused transfer must change nothing, including any spending counter.",
        ],
      },
      {
        title: "Top spenders",
        minutes: 18,
        spec: "icf/banking/specs/level2.test.ts",
        brief: [
          list(
            "`topSpenders(timestamp, n)`: the `n` accounts with the highest outgoing total, as `\"accountId(total)\"`. Outgoing = successful transfers out + successful payments (Level 3).",
            "Highest first; ties by account id ascending. Fewer than `n` accounts returns all of them, including those that spent nothing, as `(0)`.",
          ),
        ],
        traps: [
          "Counting incoming transfers or deposits as spending.",
          "A comparator without a tie-breaker: equal totals come out in insertion order, which the hidden tests will not match.",
        ],
      },
      {
        title: "Payments with cashback",
        minutes: 30,
        spec: "icf/banking/specs/level3.test.ts",
        brief: [
          list(
            "`pay(timestamp, accountId, amount)`: withdraws, and returns `\"payment1\"`, `\"payment2\"`, … numbered across the system, counting successful payments only; `null` for a missing account or insufficient funds.",
            "2% of the amount, rounded down, is credited back at `timestamp + 86_400_000`. Cashback due at or before a call's timestamp is credited before that call does anything else.",
            "`getPaymentStatus(timestamp, accountId, payment)`: `\"IN_PROGRESS\"` until the cashback lands, then `\"CASHBACK_RECEIVED\"`; `null` if the account or payment does not exist or the payment belongs to someone else.",
          ),
        ],
        traps: [
          "Crediting cashback only in `pay`. Every public method must settle due cashback first, including `deposit`, `transfer` and `topSpenders`.",
          "`Math.round` instead of rounding down.",
          "`dueAt < timestamp` instead of `<=`: cashback due exactly now is credited before the call.",
        ],
      },
      {
        title: "Merges and balance history",
        minutes: 25,
        spec: "icf/banking/specs/level4.test.ts",
        brief: [
          list(
            "`mergeAccounts(timestamp, id1, id2)`: folds account 2 into account 1 (balance, outgoing total, payments, pending cashback) and removes account 2, whose id may be created again later. `false` for equal ids or a missing account.",
            "`getBalance(timestamp, accountId, timeAt)`: the balance that id had at `timeAt`, after everything at `timeAt`; `null` if no account had that id then.",
          ),
        ],
        traps: [
          "Leaving the merged account's pending cashback addressed to the old id: it is credited to nobody.",
          "Recording cashback in history at the time it was noticed, not the time it fell due.",
          "Forgetting that a merged-away id existed before the merge and may exist again after it.",
        ],
      },
    ],
    debrief: [
      p(
        "Two private methods from Level 1 carry the last two levels: `settle(timestamp)` at the top of every public method (a no-op until payments exist), and `setBalance`, through which every balance change goes, appending to a per-id history (unused until Level 4).",
      ),
      ts(
        `
type History = { at: number; balance: number | null }[]; // null: the id stopped existing

function balanceAt(history: History, timeAt: number): number | null {
  let balance: number | null = null;
  for (const change of history) {
    if (change.at > timeAt) break;
    balance = change.balance;
  }
  return balance;
}
`,
        { caption: "History with tombstones answers every look-back question", tone: "good" },
      ),
      say(
        "In the debrief: \"I added the settle hook and the balance history in Level 1, before they had a job, because the brief said levels add features and keep old contracts. That made Levels 3 and 4 additive.\"",
      ),
    ],
    solution: [{ path: "icf/banking/solution/simulation.ts" }],
  },
  {
    id: "cloud-storage",
    kind: "icf",
    title: "Cloud storage",
    scenario: "Files with sizes; then ranked queries, users with capacity and merges, then per-user backup and restore.",
    basis:
      "The cloud-storage variant (add/get/delete files → top N by prefix → users, capacity, merge → backup and restore), close to CodeSignal's own file-hosting example.",
    sources: ["cs-icf-brief"],
    provided: [
      { path: "icf/cloud-storage/contract.ts", caption: "contract.ts: every method's rules" },
      { path: "icf/cloud-storage/src/simulation.ts", caption: "src/simulation.ts: your starting point" },
    ],
    levels: [
      {
        title: "Files",
        minutes: 12,
        spec: "icf/cloud-storage/specs/level1.test.ts",
        brief: [
          list(
            "`addFile(name, size)`: `false` if the name exists.",
            "`getFileSize(name)`: the size, or `null`.",
            "`deleteFile(name)`: the deleted file's size, or `null`.",
          ),
        ],
        traps: ["A zero-byte file is a real file: `size || null` returns `null` for it."],
      },
      {
        title: "Largest files",
        minutes: 18,
        spec: "icf/cloud-storage/specs/level2.test.ts",
        brief: [
          list(
            "`getNLargest(prefix, n)`: the `n` largest files whose names start with `prefix`, formatted `\"name1(size1), name2(size2)\"`: largest first, ties by name ascending; `\"\"` when nothing matches.",
          ),
        ],
        traps: ["`join(\",\")` without the space fails an exact string comparison."],
      },
      {
        title: "Users and capacity",
        minutes: 30,
        spec: "icf/cloud-storage/specs/level3.test.ts",
        brief: [
          p("Files added with `addFile` belong to the built-in user `admin`, who has no limit and cannot be added, merged, backed up or restored."),
          list(
            "`addUser(userId, capacity)`: `false` if the user exists.",
            "`addFileBy(userId, name, size)`: the user's remaining capacity after storing it, or `null` if the user is missing, the name is taken, or it does not fit.",
            "`mergeUser(id1, id2)`: moves user 2's files and capacity to user 1, removes user 2 (and any backup of theirs), and returns user 1's remaining capacity; `null` for equal ids, a missing user, or `admin`.",
          ),
        ],
        traps: [
          "Keeping a separate `used` counter per user that `deleteFile` forgets to decrement. Derive usage from the files.",
          "`size >= remaining` refuses a file that fits exactly.",
        ],
      },
      {
        title: "Backups",
        minutes: 25,
        spec: "icf/cloud-storage/specs/level4.test.ts",
        brief: [
          list(
            "`backupUser(userId)`: saves the user's current files (names and sizes), replacing any earlier backup; returns how many, or `null` for a missing user.",
            "`restoreUser(userId)`: deletes all the user's files, then restores the latest backup, skipping files whose name now belongs to someone else. No backup leaves the user with no files. Returns how many were restored, or `null`.",
          ),
        ],
        traps: [
          "Restoring over files that now belong to another user.",
          "Keeping a merged-away user's backup, which a re-created user with the same id would then restore.",
        ],
      },
    ],
    debrief: [
      p(
        "Each file records its owner from Level 1 on (`admin` until users exist), and a user's usage is computed from the files. Capacity checks, merges and restores then all become questions about one map.",
      ),
    ],
    solution: [{ path: "icf/cloud-storage/solution/simulation.ts" }],
  },
];
