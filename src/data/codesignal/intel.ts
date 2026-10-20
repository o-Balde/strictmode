import { list, p, say, table, trap } from "../interview-prep/blocks";
import type { Fact, FormatProfile } from "./types";

/**
 * What a "React/TypeScript" CodeSignal invite can turn out to be. The link
 * itself (`/public-test/<test>/<invite>`) only says that a company configured
 * the test; the format is chosen per test, so all three are rehearsed here.
 */
export const FORMATS: FormatProfile[] = [
  {
    id: "frontend-framework",
    name: "Front-End Development Framework, in React",
    likelihood: "Most likely",
    summary:
      "One app, four levels, 90 minutes. You extend a React app as the designer and the backend \"deliver\": render static data, add interaction, switch to an API, then stretch the design. Tests drive the rendered page.",
    claims: [
      {
        text: "At most 90 minutes, 4 progressive levels, scores from 200 to 600.",
        confidence: "official",
        sources: ["cs-frontend-brief"],
      },
      {
        text: "Average time per level: 15 min (layout and rendering), 25 min (dynamic interaction), 30 min (consuming an API), 20 min (extending the design).",
        confidence: "official",
        sources: ["cs-frontend-brief"],
      },
      {
        text: "Level 4 introduces no new skill: it measures how well the design from Levels 1–3 absorbs related requirements.",
        confidence: "official",
        sources: ["cs-frontend-brief"],
      },
      {
        text: "Level 3 can include REST conventions, error codes, pagination, several dependent endpoints and a token in a header. It excludes GraphQL, WebSockets, OAuth and libraries like axios.",
        confidence: "official",
        sources: ["cs-frontend-brief"],
      },
      {
        text: "React tasks ship with most of the boilerplate written. A coderunner renders your page in an automated (Selenium) browser, interacts with it, and asserts on the DOM.",
        confidence: "official",
        sources: ["cs-react-blog", "cs-ui-blog"],
      },
      {
        text: "Coinbase, 2024: a 90-minute React task on a task management system: list from a .json file, add with a form, load ids from one API and details from another, then remove and prioritise.",
        confidence: "reported",
        sources: ["coinbase-frontendlead"],
      },
      {
        text: "Other reported variants of the same shape: a paginated list, a job board, a task board with add and filter, a blog with likes.",
        confidence: "reported",
        sources: ["greatfrontend-coinbase"],
      },
      {
        text: "A 90-minute front-end CodeSignal scored 525/600 and got no offer; the candidate found 90 minutes short and the debugging output thin.",
        confidence: "reported",
        sources: ["glassdoor-frontend"],
      },
    ],
    tells: [
      "The task text is split into levels and opens with a scenario (\"implement a simple task tracking application\").",
      "Starter files are an `App.tsx` with the designer's static markup and a `data.json`; a live preview sits beside the editor.",
      "Later levels arrive as new requirements for the same app, often with an API whose field names differ from the JSON.",
    ],
    practice: ["task-board", "session-shortlist", "ledger"],
  },
  {
    id: "industry-coding",
    name: "Industry Coding Framework, in TypeScript",
    likelihood: "Possible",
    summary:
      "One project, four levels, 90 minutes, no UI. A class of method stubs (an in-memory database, a bank, file storage); each level adds methods and must keep the earlier ones working. It is language-agnostic, so a TypeScript invite can mean this.",
    claims: [
      {
        text: "One language-agnostic, project-based task with 4 progressive levels; 90 minutes at most; scores from 200 to 600.",
        confidence: "official",
        sources: ["cs-icf-brief"],
      },
      {
        text: "Budgets: L1 10–15 min, 3–4 simple methods, 15–20 lines. L2 20–30 min, 1–2 methods of data processing. L3 30–60 min, 3–5 methods, 90–130 lines in total. L4 30–60 min, 1–2 methods, 110–160 lines in total.",
        confidence: "official",
        sources: ["cs-icf-brief"],
      },
      {
        text: "You are not expected to finish; how far you get in the time is part of the measure. Each passed test earns partial credit, and the task tells you to press Submit often.",
        confidence: "official",
        sources: ["cs-icf-brief"],
      },
      {
        text: "Tasks are randomised and released in variations, with plagiarism checks.",
        confidence: "official",
        sources: ["cs-icf-datasheet"],
      },
      {
        text: "Anthropic: an in-memory database over 4 rounds in 90 minutes; the third round took most of the time.",
        confidence: "reported",
        sources: ["blind-anthropic"],
      },
      {
        text: "Dropbox: a bank transaction system in four parts, each unlocking only after the previous part's tests passed.",
        confidence: "reported",
        sources: ["taro-dropbox"],
      },
      {
        text: "Trade Desk and eBay: an in-memory database: set/get/delete, then scans with a prefix, then timestamps and TTL, then look-back or backup.",
        confidence: "reported",
        sources: ["prachub-tradedesk"],
      },
      {
        text: "Ramp: banking: accounts and transfers, top spenders, scheduled payments with cashback, then merges or balance history.",
        confidence: "unverified",
        sources: ["oavo-ramp-banking"],
      },
    ],
    tells: [
      "The editor opens on a class whose methods are all stubs, next to a test file.",
      "The description is split into Level 1 to Level 4 and says not to change the existing method signatures.",
      "There is no preview pane; you run unit tests.",
    ],
    practice: ["in-memory-db", "banking", "cloud-storage"],
  },
  {
    id: "custom",
    name: "Company-built tasks",
    likelihood: "Possible",
    summary:
      "A company can also load its own questions into the test: a working app with independent bugs to fix, one or more widget tasks, or a mix with algorithm questions.",
    claims: [
      {
        text: "Ramp's public front-end challenge: a React + TypeScript app with 7 independent bugs (dropdown position, approve checkbox, \"All Employees\" crash, View more replacing data, loading labels, approvals reverting).",
        confidence: "reported",
        sources: ["ramp-fe-challenge"],
      },
      {
        text: "Ramp, November 2025, on CodeSignal: fetch text from a URL found in an earlier step and reveal it with a typewriter effect, in JavaScript/React only.",
        confidence: "reported",
        sources: ["ramp-typewriter"],
      },
      {
        text: "One reported front-end task was a module of cancellable promises.",
        confidence: "reported",
        sources: ["glassdoor-frontend"],
      },
      {
        text: "Hudson River Trading's pre-screen had a React portion: build Minesweeper.",
        confidence: "reported",
        sources: ["blind-hrt"],
      },
      {
        text: "An older Uber front-end screen was 2 algorithm problems plus 8 HTML/CSS/JS multiple-choice questions; a later reply says it was replaced by the general 70-minute test.",
        confidence: "reported",
        sources: ["blind-uber"],
      },
    ],
    tells: [
      "A README that lists bugs, or several unrelated items in the task list.",
      "Rules like \"fix only the bugs\", \"do not remove any data-testid\", \"add no dependencies\".",
    ],
    practice: ["ledger-bugs", "typewriter", "otp-input", "nested-checkboxes", "progress-queue", "autocomplete", "cancellable"],
  },
];

export const PLATFORM: Fact[] = [
  {
    title: "Tests drive the rendered page, so the DOM is the contract",
    confidence: "official",
    sources: ["cs-react-blog", "cs-ui-blog", "cs-filesystem"],
    body: [
      p(
        "A React task is graded by rendering it in an automated browser (or jsdom in a filesystem task), clicking and typing like a user, then reading the DOM. Every interaction is its own test, so a level's result is a count, not a verdict.",
      ),
      list(
        "Strings are compared exactly. `0 Selected` is not `0 selected`; `1 seats left` is not `1 seat left`; an ellipsis `…` is not three dots.",
        "Selectors from the template are the API: keep every `className`, `id`, `data-testid`, `aria-label` and file/export name the task gives you.",
        "Render, don't hide. A `display: none` element is still in the DOM, and a test asserting it is absent will find it. Use `{condition ? <X /> : null}`.",
        "Some tests are hidden. The visible ones show the style; the hidden ones add edge cases: empty data, duplicates, failures, rapid clicks.",
      ),
      trap(
        "Testing Library's `getByText` matches the text an element holds **directly**. `<p><span>3</span> selected</p>` has no element whose own text is `3 selected`. `<p>{count} selected</p>` does: React renders the two pieces into the same `<p>`.",
      ),
    ],
  },
  {
    title: "Levels unlock one at a time, on 100% of the current level",
    confidence: "reported",
    sources: ["taro-dropbox", "blind-anthropic"],
    body: [
      p(
        "Candidates describe each level opening only after every test of the previous one passes. One missed edge case in Level 1 is worth more than all of Level 4, because it gates it.",
      ),
      say(
        "When Level N is stuck at 90%, stop adding and read the failing test's name and message: it almost always names the rule (\"refuses a blank title\", \"rounds cashback down\").",
      ),
    ],
  },
  {
    title: "The score runs from 200 to 600, and there is no published cut-off",
    confidence: "official",
    sources: ["cs-frontend-brief", "cs-icf-brief", "glassdoor-frontend", "blind-anthropic"],
    body: [
      p(
        "Both frameworks score 200–600. Reports do not support any fixed bar: 525 without an offer, a 600 with a callback, a near-600 with no reply. A specific threshold like \"520+ advances\" (it appears in your notes) has no source behind it.",
      ),
      say("Treat it as \"as many passing tests as possible, in level order\", and stop worrying about the number."),
    ],
  },
  {
    title: "The editor is Monaco, the engine of VS Code",
    confidence: "official",
    sources: ["cs-frontend-interviews"],
    body: [
      p("Task description, editor and preview sit side by side. Editing shortcuts work as in VS Code; workbench features (Quick Open, extensions, settings sync) do not."),
      table(
        ["Do this", "macOS", "Windows / Linux"],
        ["Select next occurrence", "`⌘ D`", "`Ctrl D`"],
        ["Move line up / down", "`⌥ ↑` / `⌥ ↓`", "`Alt ↑` / `Alt ↓`"],
        ["Copy line down", "`⇧ ⌥ ↓`", "`Shift Alt ↓`"],
        ["Toggle comment", "`⌘ /`", "`Ctrl /`"],
        ["Rename symbol", "`F2`", "`F2`"],
        ["Command palette", "`F1`", "`F1`"],
        ["Format document", "`⇧ ⌥ F`", "`Shift Alt F`"],
      ),
    ],
  },
  {
    title: "AI help and monitoring are the employer's settings",
    confidence: "official",
    sources: ["cs-ai-assisted"],
    body: [
      p(
        "Since May 2025 employers can turn on Cosmo, CodeSignal's assistant, as a full co-pilot or as guided help limited to the platform, syntax and documentation, or leave it off. Hiring teams can review session replays and transcripts of AI conversations. Some tests also require camera, screen sharing and ID.",
      ),
      list(
        "Use exactly what the intro screen allows. If Cosmo is on, it is part of the test; if it is off, so is every other assistant.",
        "Assume the replay shows pastes and long gaps, and work like someone is watching: steady, readable commits of progress.",
      ),
    ],
  },
  {
    title: "Open the link only when you are ready to start",
    confidence: "unverified",
    sources: [],
    body: [
      p(
        "Invites usually open on an intro screen with the duration, the rules and sometimes a practice question; the clock starts when you press start, not when the page loads. Recruiters see the invite's status, so opening it early is harmless but not useful. Keeping the link closed until the day is the right call.",
      ),
    ],
  },
  {
    title: "Rehearse in CodeSignal's own editor before the day",
    confidence: "official",
    sources: ["cs-practice", "cs-learn-react"],
    body: [
      p(
        "CodeSignal Learn's React path runs in the same editor-plus-preview layout, free. Do one exercise there to learn where the panes, the test results and the run button are, so the 90 minutes are spent on the task, not the interface. Then use this page's kit for the timed runs.",
      ),
    ],
  },
  {
    title: "Libraries exist, but plan for plain React",
    confidence: "official",
    sources: ["cs-libraries"],
    body: [
      p(
        "Front-end questions can add libraries through the IDE, and the brief excludes knowledge of particular libraries (axios, jQuery) from what is graded. Everything here is `useState`, `useEffect`, `fetch` and `Intl`: that is the whole toolkit the levels need.",
      ),
    ],
  },
];
