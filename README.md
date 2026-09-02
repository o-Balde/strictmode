# StrictMode

> **Ten minutes of React + TypeScript reps a day.**  
> Five questions, spaced repetition, zero accounts, local-first.
> 
> 🌐 **Live Demo:** [strictmode.bermeo.dev](https://strictmode.bermeo.dev)

---

**StrictMode** is a fast, daily deliberate practice tool for frontend engineers preparing for senior technical interviews and mastering modern React and TypeScript mechanics. 

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Motion**, and **Shiki** (pre-rendered at build time).

```bash
npm run dev        # Build columnar index + question payloads, then start on :3000
npm run build      # Production build with Turbopack
npm run verify     # 122 pure-logic assertions (streaks, schedulers, transitions, indexes, card-bank invariants)
npm run typecheck  # Strict TypeScript verification (tsc --noEmit)
npm run lint       # ESLint check
```

---

## ✨ Features

- 🧠 **SM-2-Lite Spaced Repetition**: Adaptive review intervals (`1 → 3 → 7 → 16` days × ease factor). Due and lapsed questions automatically jump to the front of your queue.
- 🔥 **Daily Streak with Grace Period**: Computed against local midnight with a 1-day grace window ("at risk" status) before resetting.
- ⚡ **Local-First & Zero Auth**: 100% client-side privacy using `localStorage`. An ultra-light `sm_hud` cookie snapshot prevents SSR layout shift and landing-page flash.
- 💡 **Interactive Hints & Canonical Docs**: Progressive in-session hint panel (hotkey `H`) with links directly to official React, TypeScript, and web standards documentation.
- ⌨️ **Keyboard-First Experience**: Unrestricted hotkey navigation (`A`–`D` select, `Space`/`Enter` submit, `H` hint, `S` skip, `Esc` exit). Inputs are never locked during animations.
- 🖥️ **Dual Code Surfaces**: Strict visual distinction between source code (custom editor theme) and standard output (phosphor CRT terminal scanlines). Rich tokenized option rendering for code literals.
- 📊 **Progress & Mastery Dashboard**: Activity heatmap, topic mastery breakdowns, speed metrics, saved questions, and non-destructive JSON backup import/export.
- 🃏 **Binary Cards**: A tactile 10-card True/False game with swipe, button, and keyboard controls, drawn from a 180-card bank of React, TypeScript, and JavaScript claims. Statements mark their load-bearing words, wrong answers flip into concise explanations, and misses return through an independent spaced-review schedule. The build enforces anti-gameability invariants so the deck cannot be answered from phrasing alone.
- 🎯 **Multiple Practice Modes**:
  - **Daily Challenge**: Choose either the 5-question Classic Drill or a 10-card Binary deck to update your streak.
  - **Daily Drill**: 5 balanced questions (3 quick conceptual/output + 2 code/fix) that update your review schedule.
  - **Topic Practice**: Deep-dive into 16 focused subjects.
  - **Single-Focus Path**: Targeted continuous training on specific concepts.
  - **Free Play / Extra Rounds**: Extra reps that record practice time and review state without penalizing streaks.

---

## 🗺️ Screen & Route Map

| Screen | Route | Component | Notes |
|---|---|---|---|
| **Landing** | `/` (new user) | `components/home/landing.tsx` | Terminal hero, feature overview, interactive demo |
| **Dashboard** | `/` (returning) | `components/home/dashboard.tsx` | Daily queue, streak radar, review stats, heatmap |
| **Focus Path** | `/path` | `components/home/path-home.tsx` | Single-topic focused repetition flow |
| **Drill Runner** | `/drill` | `components/session/drill-runner.tsx` | Active 5-question session with clock & progress |
| **Binary Cards** | `/binary` | `components/binary/binary-game.tsx` | 10-card difficulty-filtered swipe deck |
| **Binary Summary** | `/binary/done` | `components/binary/binary-summary.tsx` | Score, misses, and scheduled reviews |
| **Question View** | `/drill` | `components/session/question-view.tsx` | Code well, options, terminal detection, hint panel |
| **Feedback Panel**| `/drill` (inline) | `components/session/feedback.tsx` | Correct/wrong verdict, misconception & explanation |
| **Summary** | `/drill/done` | `components/session/session-summary.tsx` | Session accuracy, speed, interval updates, streak |
| **Progress** | `/progress` | `components/progress-view.tsx` | Full lifetime stats, review backlog, data export |
| **Topic Picker** | `/topics` | `components/topics/topic-picker.tsx` | 16 subject cards sorted by bank volume |
| **Subject Drill** | `/topics/[subject]`| `components/topics/subject-view.tsx` | Subject-specific drill queue (static pre-rendered) |

> `/` and `/path` inspect the lightweight `sm_hud` cookie server-side to resolve between the landing page and the active dashboard without client-side redirects or visual flash.

---

## 🏗️ Architecture & Performance

### Zero Runtime Highlighter Bundle

Syntax highlighting with Shiki is notoriously heavy for client bundles. In StrictMode:
1. `scripts/build-index.ts` processes all **743 questions** at build time.
2. Code snippets are pre-rendered into static HTML with the custom `strictmode-flame` theme.
3. Payloads are written to `public/q/<id>.json` (cached via CDN with immutable content addressing).
4. **Zero syntax highlighter code** is bundled into either the client or edge runtime.

```
scripts/build-index.ts  ──►  src/generated/question-index.json   (Packed columnar index + titles)
                             src/generated/bank-stats.json       (Taxonomy & subject totals)
                             public/q/<id>.json                  (743 pre-highlighted payloads)

Client: Combines columnar index + local review schedule
       ├─ Binary metadata + 180 pre-highlighted payloads under public/b/
       └─ lib/question-source.ts  ──►  GET /q/<id>.json (Static CDN, zero compute)
                                  └─►  POST /api/questions (Fallback handler)
```

### Columnar Indexing

The metadata index uses packed base36 strings for categories, types, difficulty levels, and estimated durations. Question titles are packaged directly in the index so the daily queue renders instantaneously on the dashboard without fetching full question bodies upfront.

### State & Persistence Architecture

`localStorage['strictmode.progress.v1']` is the single source of truth:
```ts
{
  version: number;
  seenQuestionIds: string[];
  correctQuestionIds: string[];
  wrongQuestionIds: string[];
  savedQuestionIds: string[];
  streakDays: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  completedDays: string[];
  activityHeatmap: Record<string, number>;
  reviewState: Record<string, { ease: number; interval: number; due: string; lapses: number; streak: number }>;
  totalMs: number;
  perQuestionMs: Record<string, number>;
  homeVariant?: "standard" | "path";
}
```

- **Pure State Transitions**: All mutations (`applyAnswer`, `completeDailyDrill`, `toggleSavedQuestion`, etc.) are pure, deterministic functions in `lib/progress.ts`.
- **`useSyncExternalStore`**: Reads from localStorage use external store subscriptions to ensure clean SSR hydration and instant cross-tab synchronization.
- **Non-Destructive Import**: Importing a progress backup merges question records and takes the maximum streak, preserving work done across multiple devices.

---

## 📚 Topic Taxonomy

The 743-question bank spans 16 core frontend engineering subjects:

- **React Internals & Lifecycle**: `hooks`, `rendering-keys`, `state-management`, `server-components`
- **TypeScript Type System**: `types`, `generics`, `narrowing`
- **JavaScript Core & Runtime**: `closures`, `async-await`, `event-loop`
- **Architecture & System**: `performance`, `system-architecture`, `data-fetching`, `design-patterns`
- **Foundations & Algorithms**: `data-structures`, `concurrency`

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> or <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> | Select option |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Submit answer |
| <kbd>Enter</kbd> | Continue to next question (on feedback panel) |
| <kbd>H</kbd> | Toggle hint and documentation link |
| <kbd>S</kbd> | Skip question |
| <kbd>Esc</kbd> | Exit session to dashboard |

Binary Cards use <kbd>←</kbd> for False, <kbd>↓</kbd> for “I don’t know,” <kbd>→</kbd> for True, and <kbd>Enter</kbd> to continue after a correction.

---

## 🛠️ Project Structure

```
strictmode/
├── public/q/              # Pre-rendered static question payloads (generated)
├── scripts/
│   ├── build-index.ts     # Compiles question bank & pre-renders Shiki markup
│   ├── verify-logic.ts    # Assertion suite for scheduler, streaks, and index
│   └── authored/          # Curated & verified question source files
├── src/
│   ├── app/               # Next.js App Router pages and API routes
│   ├── components/
│   │   ├── home/          # Landing page, dashboard, and focus path
│   │   ├── session/       # Drill runner, question view, hint panel, feedback
│   │   ├── topics/        # Topic browser and subject drill views
│   │   └── ui/            # Base UI & Radix primitive components
│   ├── data/              # Question datasets and schema definitions
│   └── lib/               # Progress engine, SM-2 scheduler, drill builder, motion
└── next.config.ts         # Cache-Control headers and deployment config
```

---

## 📄 License

MIT © [Bermeo](https://strictmode.bermeo.dev)
