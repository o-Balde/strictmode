# CodeSignal practice kit: React + TypeScript

Timed, level-gated practice for CodeSignal's React/TypeScript assessments. Every
task ships with specs that grade the way the hidden grader does: by querying the
DOM for exact text, `data-testid`s, roles and classes, or by calling your class's
methods. The full briefing (format, levels, traps, specs written as prose) is on
the prep page at `/codesignal-react-typescript`.

```bash
cd practice/codesignal
npm install
npm run dev                      # live preview → http://localhost:5173
npm run level -- task-board 1    # grade Level 1 of a mock
```

## How to practise

1. Pick a task. Open only its **Level 1** spec on the prep page.
2. Start a 90-minute timer (the prep page has one with level checkpoints).
3. Work in `src/`. Run `npm run level -- <task> <n>`; it runs Levels 1..n, so a
   regression in an earlier level fails the run, as it would lock you out there.
4. Unlock the next level on the page only when every spec is green.
5. When time is up, compare with `solution/`, then run
   `npm run level -- <task> 4 --solution` to see the reference pass.

To start a task again: `git checkout -- practice/codesignal/<path>/src`.

## Tasks

| Task | Kind | Folder | Specs |
| --- | --- | --- | --- |
| `task-board` | Front-End framework, 4 levels (CodeSignal's own published example) | `mocks/task-board` | 32 |
| `session-shortlist` | Front-End framework, 4 levels (select/limit/reconcile/filter) | `mocks/session-shortlist` | 28 |
| `ledger` | Front-End framework, 4 levels (pagination, optimistic writes, races) | `mocks/ledger` | 28 |
| `ledger-bugs` | Bug hunt: 7 independent bugs in a working app | `mocks/ledger-bugs` | 7 |
| `in-memory-db` | Industry Coding Framework, 4 levels | `icf/in-memory-db` | 23 |
| `banking` | Industry Coding Framework, 4 levels | `icf/banking` | 23 |
| `cloud-storage` | Industry Coding Framework, 4 levels | `icf/cloud-storage` | 24 |
| `typewriter` | Widget (fetch + reveal text, no CSS) | `widgets/typewriter` | 9 |
| `otp-input` | Widget (focus management, paste) | `widgets/otp-input` | 12 |
| `nested-checkboxes` | Widget (derived tree state, `indeterminate`) | `widgets/nested-checkboxes` | 7 |
| `progress-queue` | Widget (timers, concurrency limit, pause) | `widgets/progress-queue` | 8 |
| `autocomplete` | Widget (debounce, abort, stale answers) | `widgets/autocomplete` | 9 |
| `cancellable` | Plain TS module (cancellable promises) | `widgets/cancellable` | 10 |

## Preview

`npm run dev`, then:

- `?mock=task-board` your workspace, `?mock=task-board&solution` the reference
- `?widget=otp-input` a widget drill
- `&latency=1500` slows the mock API (default 400 ms), `&chaos=0.3` fails 30% of requests

The preview renders inside `<StrictMode>`, so effects run twice on mount in
development, which exposes fetch-on-mount code that is not idempotent.

## The mock API

Each mock's `server.ts` is its backend. Your code calls plain `fetch("/api/...")`.
Like a real server: a 4xx/5xx **resolves** (check `response.ok`), only a dropped
connection rejects, and an aborted request rejects with an `AbortError`.

## How close is this to the real thing?

The format (4 progressive levels, 90 minutes, score 200–600, DOM-driven grading)
follows CodeSignal's published framework briefs and candidate reports. The
specific tasks are original, written in the style of the publicly described
ones; they are not leaked questions. Specs use Vitest + Testing Library; the real
grader may be Jest, Mocha or a Selenium browser, which query the DOM the same way.

`npm run verify` type-checks everything and runs all specs against the solutions.
