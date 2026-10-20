import { list, p, trap, tsx } from "../interview-prep/blocks";
import type { WidgetDrill } from "./types";

/**
 * Single-component drills. Each is the kind of task that shows up on its own
 * in a company-built test, or as one level of a framework task. 20–30 minutes
 * each; the spec file is the grader.
 */
export const WIDGETS: WidgetDrill[] = [
  {
    id: "typewriter",
    title: "Typewriter from a URL",
    basis: "Reported in a Ramp front-end OA on CodeSignal (November 2025): fetch text from a URL and reveal it like a typewriter, in JavaScript/React only.",
    sources: ["ramp-typewriter"],
    minutes: 20,
    spec: "widgets/typewriter/specs/typewriter.test.tsx",
    brief: [
      p("Implement two components in `src/Typewriter.tsx`. No CSS animation: the reveal is JavaScript."),
      list(
        "`<Typewriter text intervalMs={50} onDone />` renders `<p data-testid=\"typewriter\">`, empty at first, then one more character every `intervalMs` (default 50) until the whole text shows.",
        "`onDone` is called once, when the last character appears. Re-rendering with a new `onDone` function must not restart the animation.",
        "A new `text` starts over from empty.",
        "Characters are code points: an emoji is never shown half-drawn.",
        "No timer may outlive the animation or the component.",
        "`<TypewriterFromUrl url intervalMs />` fetches the URL as text, shows `<p data-testid=\"typewriter-status\">Loading...</p>` meanwhile, then types out the trimmed text. A failed request shows `Failed to load` with `role=\"alert\"`.",
      ),
    ],
    notes: [
      p(
        "One interval per text, cleared in the effect's cleanup. The count lives in a local variable inside the effect, not in state read from a closure, so the interval never sees a stale value.",
      ),
      trap(
        "`text.slice(0, n)` counts UTF-16 code units: after three ticks on `\"Hi 👋\"` it shows half of the emoji's surrogate pair. `Array.from(text)` splits by code point.",
      ),
      tsx(
        `
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
`,
        { caption: "Read the latest callback without making it a dependency", tone: "good" },
      ),
    ],
    solution: [{ path: "widgets/typewriter/solution/Typewriter.tsx" }],
  },
  {
    id: "otp-input",
    title: "One-time code input",
    basis: "A recurring standalone UI task: six boxes, focus management, Backspace, arrows and paste. Focus handling is what separates a passing answer from a demo.",
    sources: [],
    minutes: 25,
    spec: "widgets/otp-input/specs/otp-input.test.tsx",
    brief: [
      p("Implement `<OtpInput length={6} onComplete />` in `src/OtpInput.tsx`."),
      list(
        "Render `length` inputs labelled `Digit 1` … `Digit n` (`aria-label`); focus the first on mount.",
        "Typing a digit fills the box and moves focus to the next one. Anything that is not a digit is ignored. Typing into a filled box replaces its digit.",
        "Backspace in a filled box clears it and stays; in an empty box it moves back and clears the previous one.",
        "Arrow Left / Right move focus, stopping at the ends.",
        "Pasting spreads the digits (non-digits dropped) from the focused box onwards, and focuses after the last one filled.",
        "Whenever a change leaves every box filled, call `onComplete(code)`.",
      ),
    ],
    notes: [
      p(
        "The digits live in one array; inputs only display it. Typing goes through `onChange` (keep the last digit in the value, which makes typing over a digit a replacement), Backspace and arrows through `onKeyDown` with `preventDefault`, paste through `onPaste`. Focus moves with an array of refs.",
      ),
      trap(
        "`maxLength={1}` looks right and breaks replacing: a box that already holds a digit refuses the keystroke, so `onChange` never fires.",
      ),
    ],
    solution: [{ path: "widgets/otp-input/solution/OtpInput.tsx" }],
  },
  {
    id: "nested-checkboxes",
    title: "Nested checkboxes",
    basis: "A recurring tree task: parents check all descendants, children recompute ancestors, and a partial parent shows as indeterminate.",
    sources: [],
    minutes: 25,
    spec: "widgets/nested-checkboxes/specs/nested-checkboxes.test.tsx",
    brief: [
      p("Implement `<CheckboxTree nodes />` in `src/CheckboxTree.tsx` for the tree in `tree.ts`."),
      list(
        "Every node is a checkbox labelled with its `label`, children nested inside their parent's `<li>`. All start unchecked.",
        "Checking a leaf makes each ancestor indeterminate (some leaves checked) or checked (all leaves checked).",
        "Clicking an unchecked or indeterminate parent checks every descendant; clicking a checked parent unchecks them all.",
        "Indeterminate is the DOM property `input.indeterminate` (also expose `aria-checked=\"mixed\"`).",
      ),
    ],
    notes: [
      p(
        "Store only the checked **leaves**. A parent's look is derived from its leaves on every render, so it cannot drift from them, and clicking a parent is \"set all my leaves\".",
      ),
      trap(
        "There is no `indeterminate` attribute in HTML; React cannot set it from JSX. Set it on the element in an effect through a ref.",
      ),
    ],
    solution: [{ path: "widgets/nested-checkboxes/solution/CheckboxTree.tsx" }],
  },
  {
    id: "progress-queue",
    title: "Progress bars with a concurrency limit",
    basis: "A recurring timer task (\"run at most N jobs at once\"): intervals, cleanup, pause and resume.",
    sources: [],
    minutes: 25,
    spec: "widgets/progress-queue/specs/progress-queue.test.tsx",
    brief: [
      p("Implement `<ProgressQueue durationMs={2000} limit={3} />` in `src/ProgressQueue.tsx`."),
      list(
        "`Add` appends a bar at 0%. A bar fills at a constant rate, 0 → 100% over `durationMs`. Render each as `role=\"progressbar\"` with `aria-valuenow` (whole percent), `aria-valuemin=\"0\"`, `aria-valuemax=\"100\"`.",
        "At most `limit` bars fill at once: the earliest-added unfinished ones. A waiting bar starts as soon as a slot frees.",
        "`Pause` freezes every bar and becomes `Resume`; `Resume` continues from where they were.",
        "`Reset` removes every bar.",
        "Hold no timer when nothing can move (empty, all done, or paused) or after unmounting.",
      ),
    ],
    notes: [
      p(
        "One interval for the whole queue, alive only while something can move. Each tick advances the first `limit` unfinished bars: the concurrency rule is that loop. The tick uses the updater form, so it never reads stale bars.",
      ),
      trap("One `setInterval` per bar, started on Add: pausing, resetting and the limit each need their own bookkeeping, and leaked timers keep firing after Reset."),
    ],
    solution: [{ path: "widgets/progress-queue/solution/ProgressQueue.tsx" }],
  },
  {
    id: "autocomplete",
    title: "Debounced autocomplete",
    basis: "Debounce, cancellation and out-of-order responses in one component: the async trio every front-end screen eventually asks about.",
    sources: [],
    minutes: 25,
    spec: "widgets/autocomplete/specs/autocomplete.test.tsx",
    brief: [
      p("Implement `<Autocomplete search delayMs={300} />` in `src/Autocomplete.tsx`, where `search(query, signal)` returns `Promise<string[]>`."),
      list(
        "An input labelled `Search`. Search only once typing has paused for `delayMs`, with the trimmed term; never for blank input.",
        "While a search runs, show `<p data-testid=\"search-status\">Loading...</p>`; then the suggestions as `role=\"option\"` items, or `No results`, or `Something went wrong` with `role=\"alert\"`.",
        "When the term changes, abort the request in flight (its `signal`) and never let an older answer replace a newer one, even if the search function ignores the signal.",
        "Clearing the input clears the suggestions. No timer survives unmounting.",
      ),
    ],
    notes: [
      p(
        "The effect is the debounce: each keystroke re-runs it, and its cleanup clears the pending timer and aborts the request. Checking `controller.signal.aborted` before writing state is what makes stale answers harmless.",
      ),
      tsx(
        `
declare const search: (query: string, signal: AbortSignal) => Promise<string[]>;
declare const query: string;
declare const setItems: (items: string[]) => void;

useEffect(() => {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    search(query, controller.signal).then((items) => {
      if (!controller.signal.aborted) setItems(items);
    });
  }, 300);
  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [query, search]);
`,
        { caption: "Debounce + cancel + stale guard, in one effect", tone: "good" },
      ),
    ],
    solution: [{ path: "widgets/autocomplete/solution/Autocomplete.tsx" }],
  },
  {
    id: "cancellable",
    title: "Cancellable promises",
    basis: "Reported as one task of a 90-minute front-end CodeSignal assessment: \"a JavaScript module that handles cancellable promises\".",
    sources: ["glassdoor-frontend"],
    minutes: 20,
    spec: "widgets/cancellable/specs/cancellable.test.ts",
    brief: [
      p("Implement `src/cancellable.ts`. Plain TypeScript, no React."),
      list(
        "`makeCancellable(promise)` returns `{ promise, cancel }`. Left alone, `promise` settles like the original.",
        "After `cancel()`, it rejects with a `CancelledError` (an `Error` named `\"CancelledError\"`) immediately, whatever the original does later. Cancelling a settled promise does nothing; cancelling twice is harmless.",
        "An original rejection that arrives after cancel must not surface as an unhandled rejection.",
        "`isCancelledError(error)` is a type guard that tells a cancellation from a failure.",
        "`latestOnly(fn)` wraps an async function so each call cancels the previous call's result.",
      ),
    ],
    notes: [
      p(
        "A promise cannot be stopped, only ignored. Race the original against a cancel signal, and always attach both handlers to the original so its late rejection is consumed.",
      ),
    ],
    solution: [{ path: "widgets/cancellable/solution/cancellable.ts" }],
  },
];
