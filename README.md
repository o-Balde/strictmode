# StrictMode

Ten minutes of React + TypeScript reps a day. Five questions, no accounts, no server-side
state — an implementation of the Claude Design prototype `StrictMode Mockups.dc.html`
against the 767-question bank in `src/data/`.

Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn/ui · Motion · Shiki.

```bash
npm run dev        # build the index, then start on :3000
npm run build      # production build
npm run verify     # 97 assertions over the pure logic
npm run typecheck  # tsc --noEmit against the strict tsconfig
npm run lint
```

---

## Where each mockup screen lives

| Mockup | Route | Component |
|---|---|---|
| 1a landing | `/` (no progress) | `components/home/landing.tsx` |
| 1b dashboard | `/` (with progress) | `components/home/dashboard.tsx` |
| 1c single-focus path | `/path`, or `/` when chosen | `components/home/path-home.tsx` |
| 1d multiple choice | `/drill` | `components/session/question-view.tsx` |
| 1e output prediction | `/drill` | same, with the terminal skin |
| 1f live code | `/drill` | same, snippet as hero at 15px |
| 1g correct | `/drill`, inline | `components/session/feedback.tsx` |
| 1h wrong | `/drill`, inline | same |
| 1i summary | `/drill/done` | `components/session/session-summary.tsx` |
| 1j progress | `/progress` | `components/progress-view.tsx` |
| 1k topic picker | `/topics` | `components/topics/topic-picker.tsx` |
| 1l topic exhausted | `/topics/[subject]` | `components/topics/subject-view.tsx` |
| 1l nothing due | `/`, inline | `components/home/dashboard.tsx` |
| 1m mobile | `/` at ≤`lg` | the dashboard is responsive, not a separate build |

`/` decides between 1a and 1b **server-side** from the `sm_hud` cookie, so a returning user
never sees the marketing page and there is no redirect or flash.

### Not built

**1f's editor and assertion panel, 1n (fill-the-blank), 1o (order the lines) and 1r (tap the
broken line)** have no data behind them. `types.ts` declares `starterCode`, `solutionCode`,
`assertions`, `fixData`, `puzzleData`, `consoleOutput` and `fileName`, but every one of them
has **zero occurrences** across all eleven question modules. Every question in the bank —
including all 30 `live_code` and 29 `fix` items — is four-option multiple choice with a
`codeSnippet`. Those types keep their own chrome (badge, larger code) but are answered as MCQ.

**1h's red/green diff** is likewise absent; there is no diff data. It shows YOU PICKED vs
ANSWER, the question's `misconception`, and the chosen option's `explanation` instead — all
populated for all 691 questions.

---

## Architecture

### The bank never reaches the browser, and neither does the compute

`src/data/questions/*.ts` is 2.25 MB. Shipping it would cost ~600 KB gzipped on first load.
But progress lives in localStorage, so the server cannot pick a drill either — it does not know
what you have seen. Everything is therefore resolved at build time and read from the CDN:

```
scripts/build-index.ts  ──►  src/generated/question-index.json   packed index + titles
                             src/generated/bank-stats.json
                             public/q/<id>.json                  767 payloads, 3.05 MB
                                                                 Shiki markup already rendered

  client: composes a drill from the packed index + localStorage
       └─ lib/question-source.ts  ──►  GET /q/<id>.json   (CDN, no invocation)
                                  └─►  POST /api/questions (fallback only)
```

The index is **columnar**: an `ids` array plus base36-packed enum strings for
subject/category/type/level and minutes, and the titles. Titles ride along so the dashboard
queue renders with no request at all — it previously fetched five full question bodies to show
five strings. Regenerate with `npm run build:index` (wired to `predev`/`prebuild`; output is
gitignored).

**Why highlighting moved to the build.** Shiki costs ~171 ms of CPU for five snippets and
~394 ms for all 370 — the entire bank costs less than three drill requests did. Doing it per
request meant paying that forever for immutable content. It now runs once per build and Shiki
appears in neither the client nor the server bundle.

**`lib/question-source.ts` is the seam.** Callers ask for bodies by id and know nothing about
delivery. Two adapters, both in use: `staticSource` reads the CDN files; `routeSource` covers
the one case that cannot, a client left open across a deploy asking for an id the new build no
longer emits. Moving highlighting out of the request path touched no caller.

**Rendering modes.** `/topics/[subject]` is prerendered via `generateStaticParams` (16 pages),
and `/drill` reads its query string on the client, so both are static. Only `/` and `/path`
are dynamic, because they read the `sm_hud` cookie to choose landing-vs-dashboard without a
flash — a deliberate trade of one invocation for no flash.

### Persistence

`localStorage['strictmode.progress.v1']` is the single source of truth:

```ts
{ version, seenQuestionIds, correctQuestionIds, wrongQuestionIds, savedQuestionIds,
  streakDays, bestStreak, lastCompletedDate, completedDays, activityHeatmap,
  reviewState: Record<id, { ease, interval, due, lapses, streak }>,
  totalMs, perQuestionMs, homeVariant }
```

**Every mutation is a pure transition** in `lib/progress.ts`: `applyAnswer`,
`completeDailyDrill`, `addPracticeTime`, `toggleSavedQuestion`, `chooseHomeVariant`,
`forgetQuestions`. `components/progress-provider.tsx` is a React adapter that wires them to the
store and contains no rules of its own.

> This matters because the streak rule used to exist twice: as `streakHealth`/`nextStreak` in
> `lib/progress.ts`, which is what the summary screen *displays*, and hand-inlined a second time
> in the provider's `completeDaily`, which is what actually *persisted*. Only the first was
> covered by `npm run verify`. `completeDailyDrill` now calls `nextStreak`, so the grace policy
> is stated once and the shown streak is by construction the stored one — with assertions on the
> transition that writes.

`migrate()` is tolerant of partial and older records — a missing field is filled rather than
throwing away a streak someone earned. Bump `SCHEMA_VERSION` and extend it when the shape
changes.

A ~60-byte cookie mirrors four scalars so the server can render the header and home headline
with real numbers:

```
sm_hud = {"s":streak,"d":dayNumber,"l":lastCompletedDate,"n":seenCount}
         path=/  max-age=1y  SameSite=Lax   written client-side, never authoritative
```

Reads go through `lib/progress-store.ts` via `useSyncExternalStore` rather than an effect —
that gives a stable SSR snapshot, avoids a cascading render on every mount, and syncs progress
live between tabs.

Export/import is on the dashboard. **Import merges rather than replaces**, so restoring a
backup onto a machine that has since done a few drills does not discard that work.

### Scheduling — SM-2-lite

`lib/scheduler.ts`. Grading is binary (the app only ever knows right or wrong) with a fixed
early ladder so the first intervals are predictable:

- **Right** → `1 → 3 → 7 → 16` days, then `interval × ease`. Ease `+0.05`, capped at 2.8.
- **Wrong** → due tomorrow, streak reset, ease `−0.2`, floored at 1.3. Counts a lapse only if
  the question had previously been answered right.
- **Skipping** counts as wrong — it still needs to come back.

`lib/drill.ts` composes five items in this order: due reviews (max 2, most overdue first) →
unseen in the weakest subjects → unseen anything → recycle least-recently-seen. Always three
quick items (`concept`/`output`/`puzzle`) and up to two code items (`live_code`/`fix`).

> The code pool is only 59 questions (30 `live_code` + 29 `fix`), so at two a day it starts
> recycling after about a month. The fallback branch handles it and flags `recycled`.

`generateDailyDrill()` in `src/data/index.ts` is left untouched but unused — it has no notion
of a review being *due*, which is what 1h's "you'll see it again" promise requires.

### Streak

Local midnight, never UTC — a streak should break when the user's day ends. One day of grace:

| Last completed | Result |
|---|---|
| today | already done; extra rounds don't change it |
| yesterday | continues |
| 2 days ago | continues, flagged **at risk** in the header |
| 3+ days ago | resets to 1 |

Only the daily drill moves the streak. Extra rounds (`?mode=extra`) and free play
(`?mode=free`) record answers, time and review state but never touch it — and the UI says so.

### Timers

Soft elapsed only. The session clock counts up; per-question time is recorded silently for the
summary. Nothing ever expires or auto-advances — the mockup's `04:00 left` became `04:00`,
because the point is remembering before an interview, not scoring.

### Code rendering

Snippets render **verbatim** — no reformatting. Roughly 14% (41 of 298) lost their newlines
during extraction, and some comments swallowed the next statement
(`// Lifting state upconst Parent = () => {`); longest line is 316 characters. By decision
these are shown as-is and **scroll horizontally at every breakpoint, including mobile**. The
bordered wrapper owns the scroll and the `<pre>` is `w-max`, so the trailing padding survives
a scroll to the end of a long line.

Highlighting is Shiki, server-side only, with a `strictmode-flame` theme built from the
mockup's own hex values (`#e08a5e` keyword, `#8fbf7f` string, `#d9c47f` function, `#7fb0d9`
type, `#6f665e` comment). Zero highlighter bytes ship to the client.

### Two code surfaces, never confused

A snippet is **source code** and gets an editor treatment. Console output gets the terminal.
The two are labelled so the distinction is explicit rather than merely tonal:

```
— SOURCE     Dracula's hues on this app's ground (#0c0b0a, not Dracula's cool #282a36)
             pink keywords · green functions · yellow strings · purple numbers
             cyan types (italic) · orange params (italic) · #6272a4 comments

— STDOUT     Homebrew: #000 ground, #28fe14 phosphor, mono, scanline wash
```

The skin means one thing — *this text is console output* — so it never applies to a code well.
In an output-prediction question the snippet is the **program**, not what the program printed;
only the options are the output. `lib/terminal.ts` decides per option, at render time, from the
question type and the option text: bare values, array/object literals, multi-line transcripts,
`Error:` lines, printed sequences like `1 4 7 5 2 3 6`. Short transcripts switch to a 2×2 grid.

The type label alone is not enough: much of the bank marks a question `output` and then offers
four sentences of prose, and those stay prose.

### Motion

Route view transitions, a terminal boot on the landing headline, typed-out code, drawn coverage
rings, cascading heatmap cells, a counting score with flame particles, staggered options, a
filling progress strip, and the 4px correct/wrong wipe.

Two rules hold everywhere: **input is never gated** — pressing `A` mid-transition answers
immediately, and any keypress completes the typewriter instantly — and
`prefers-reduced-motion: reduce` collapses everything to opacity-only.

### Answer → verdict scroll

On a long question the feedback unfolds below the fold, so answering scrolls the verdict to the
top of the viewport; advancing to the next question scrolls back up. The session header is
`sticky`, so the progress strip, clock and exit control survive the scroll, and the panel
carries `scroll-mt-[60px]` to clear it.

The scroll is triggered by the unfold's own `onAnimationComplete` rather than on mount: the
document only grows as the panel expands, so an earlier scroll clamps to the old page height
and goes nowhere. A 600 ms timer backs it up in case the animation never reports completion —
backgrounding the tab mid-answer freezes it. Scrolling twice is a no-op.

### Keyboard

`A`–`D` select · `Space`/`Enter` answer · `Enter` continue · `S` skip · `Esc` leave.
Bound at the window, so they work without clicking the right element first.

---

## Topic taxonomy

`TOPIC_METADATA` defines sixteen subjects and all sixteen are now populated, so every card
renders. The picker sorts by bank size, and coverage is still lopsided:

```
hooks 266 · rendering-keys 257 · state-management 76 · types 66 · async-await 29
generics 13 · performance 18 · system-architecture 17 · data-structures 7 · data-fetching 6 · closures 4
narrowing 4 · server-components 1 · event-loop 1 · design-patterns 1 · concurrency 1
```

The picker only renders subjects with at least one question, so a card disappears rather than
rendering empty if a subject is ever emptied.

## Extending the bank

`src/data/questions.json` is the source of truth. `scripts/generate_all_ts_files.py` routes it
into the per-topic modules under `src/data/questions/`, so **never hand-edit those `.ts`
files** — they are regenerated wholesale.

```bash
python3 scripts/extract_quiz_sources.py     # MHTML sources -> scratch/extracted/*.json
python3 scripts/merge_authored_questions.py # authored records -> questions.json (idempotent)
python3 scripts/generate_all_ts_files.py    # questions.json -> src/data/questions/*.ts
npm run build:index                         # -> src/generated/
```

`scripts/extract_quiz_sources.py` decodes the archives in `_REFERENCES/_QUIZ/` as UTF-8. They
declare no charset, and the earlier pass decoded them as latin-1 — which is why 361 of the
original 691 questions contain replacement characters and 297 carry `Back to Top` navigation
text scraped from the source pages. Anything added through `merge_authored_questions.py` is
rejected if it contains either.

Authored question sets live in `scripts/authored/`. The merge script validates every record
against the `QuizQuestion` contract — level, type, category, subject, four options `A`–`D` with
exactly one correct — before it writes, and rejects any record containing a replacement
character or scraped navigation text.

It also **rotates each question's options** by a hash of its id before assigning the `A`–`D`
labels. Authoring naturally parks the correct answer wherever the explanation reads best, which
clusters it; rotating spreads it evenly and is reproducible across runs.

> All **691 pre-existing questions have their answer at `A`**, and every one of them reuses the
> same three distractors ("It is deprecated in modern React 18+…", "It executes strictly on
> background Web Worker threads…", "It is an exclusive feature of React Native…"). That bank is
> answerable without reading the question. The 76 authored records have per-question distractors
> and an even answer spread (A 24 · B 17 · C 16 · D 19). Fixing the older 691 is a separate job.

---

## Layout

```
src/
  app/            routes; icon.svg is the favicon (App Router convention)
  components/     home/ session/ topics/ + shared primitives, ui/ is shadcn
  data/           the question bank — pre-existing, not modified
  generated/      build output, gitignored
  hooks/
  lib/            progress, progress-store, scheduler, drill, dates,
                  terminal, highlight, question-index
scripts/          build-index.ts, verify-logic.ts (+ the original Python extractors)
_REFERENCES/      the Claude Design handoff bundle (lint-ignored)
```
