import type { Checklist, Plan } from "./types";

/**
 * Minute-by-minute plans for the 90 minutes. The checkpoints follow the
 * framework briefs' per-level averages, compressed so the last three minutes
 * are kept for submitting a green build.
 */
export const PLANS: Plan[] = [
  {
    id: "frontend",
    title: "Front-End framework (React)",
    steps: [
      {
        at: "0:00–0:03",
        title: "Read, then look around",
        detail:
          "Read the scenario, the template and the data. Find the preview, the file tree, the test runner and its output before writing a line. Run the tests once to see their names.",
      },
      {
        at: "0:03–0:15",
        title: "Level 1",
        detail:
          "Normalise the data into one flat list in state. Render it into the template, keys by id, empty states. Copy strings from the task. Run tests until 100%.",
      },
      {
        at: "0:15–0:40",
        title: "Level 2",
        detail:
          "One requirement at a time, tests after each. Rules live in the state update (updater functions), derived values are computed on render.",
      },
      {
        at: "0:40–1:10",
        title: "Level 3",
        detail:
          "A `getJson` helper that checks `response.ok`. A status union. Map the API shape onto yours in one function. Parallel requests where independent. Retry. Reconcile user state against the new data.",
      },
      {
        at: "1:10–1:27",
        title: "Level 4",
        detail:
          "Add view state (filters, sort) and derive what is visible. Bulk actions act on the derived list. Re-run every level's tests, not just this one's.",
      },
      {
        at: "1:27–1:30",
        title: "Stop, make it green, submit",
        detail:
          "No new features. Revert or comment out anything half-done that breaks an earlier level. No type errors, the preview renders, every finished level passes. Submit.",
      },
    ],
  },
  {
    id: "icf",
    title: "Industry Coding framework (TypeScript class)",
    steps: [
      {
        at: "0:00–0:05",
        title: "Read the contract, write the skeleton",
        detail:
          "Read Level 1 and the interface. Write the class with its private maps, a `settle(timestamp)` hook if calls carry timestamps, and a single place where values change.",
      },
      {
        at: "0:05–0:15",
        title: "Level 1",
        detail: "3–4 short methods. Corner cases: missing ids, duplicates, equal ids, insufficient amounts, empty strings and zeros.",
      },
      {
        at: "0:15–0:35",
        title: "Level 2",
        detail: "Aggregation and formatting. Comparator with a tie-breaker, plain string order, the exact output format. Submit as soon as it passes.",
      },
      {
        at: "0:35–1:05",
        title: "Level 3",
        detail:
          "Timestamps, TTL or scheduled events. Half-open intervals, settle at the top of every method, effects recorded at their due time. Old methods become wrappers of the new ones.",
      },
      {
        at: "1:05–1:27",
        title: "Level 4",
        detail: "Backup/restore, merges or look-back. Copies, re-anchored TTLs, history with tombstones, every reference moved on merge.",
      },
      {
        at: "1:27–1:30",
        title: "Submit what passes",
        detail: "Partial credit is per test. Leave the class compiling, with every finished level green, and submit.",
      },
    ],
  },
];

export const CHECKLISTS: Checklist[] = [
  {
    id: "week",
    title: "The week before",
    items: [
      "Run the task board mock against a 90-minute timer, start to finish.",
      "Run one Industry Coding mock (banking or in-memory database) against the timer.",
      "Do the bug hunt in 60 minutes.",
      "Do one exercise in CodeSignal Learn's React path, only to learn the editor and preview.",
      "Write from memory: a `getJson` with an ok check, a loading union, a Set-of-ids selection, a debounced effect.",
      "Read through Spot the bug, TypeScript under pressure and Grader-proof React.",
    ],
  },
  {
    id: "day-before",
    title: "The day before",
    items: [
      "Re-read the invite email: duration, language, allowed resources, AI policy, camera or ID requirements.",
      "If the format is unclear, ask the recruiter whether it is a front-end (React) task or general coding; it is a normal question.",
      "Up-to-date Chrome, a stable connection, a charger, a quiet room, notifications off.",
      "Keep this page's timer and the kit closed during the real test; they are for practice.",
      "Sleep. The third level is where time goes, and it rewards a clear head more than anything you could cram.",
    ],
  },
  {
    id: "start",
    title: "In the first three minutes",
    items: [
      "Read the intro screen: is Cosmo on, are docs allowed, is it proctored?",
      "Locate the test runner, its output, the preview and the file tree.",
      "Note your checkpoints: Level 1 by 0:15, Level 2 by 0:40, Level 3 by 1:10.",
      "Run the tests once before changing anything, to learn their names.",
    ],
  },
  {
    id: "every-level",
    title: "At every level",
    items: [
      "Copy every string and selector from the task; never retype them.",
      "Run the tests after each requirement, not at the end of the level.",
      "At 100%, move on. Polish later, if ever.",
      "Stuck below 100% for 10 minutes: read the failing test's name and try the usual edges: empty, duplicate, failure, double click, timezone, whitespace.",
    ],
  },
  {
    id: "last-minutes",
    title: "The last five minutes",
    items: [
      "At three minutes left, stop adding features.",
      "Revert or comment out half-done code that breaks an earlier level.",
      "No type errors; the preview renders; every finished level passes.",
      "Submit.",
    ],
  },
];
