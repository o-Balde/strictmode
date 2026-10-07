import { list, p, say, steps, table, trap, ts, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_PERFORMANCE: PrepSection = {
  id: "react-performance",
  track: "react",
  title: "Performance",
  blurb:
    "Every 'how would you optimise this' question is really asking whether you measure before you fix, and whether you know more than one tool.",
  drill: "performance",
  questions: [
    {
      id: "perf-approach",
      question: "A React app feels slow. How do you approach it?",
      level: "intermediate",
      short:
        "Measure first, in a production build, to find out which kind of slow it is: too much JavaScript to load, too many re-renders, renders that are individually expensive, or waiting on the network. Each has different fixes, and guessing usually optimises the wrong thing.",
      body: [
        steps(
          "**Reproduce and measure.** React DevTools Profiler shows which components rendered, why, and for how long. The browser's Performance panel shows long tasks. Lighthouse and field data show load metrics.",
          "**Classify the problem.** Slow to load, slow to respond to input, or janky while scrolling or animating.",
          "**Fix the biggest thing.** One change at a time, re-measuring after each.",
          "**Guard it.** A bundle-size budget or a performance test in CI so it does not regress.",
        ),
        table(
          ["Symptom", "Likely cause", "Tools"],
          ["Slow first load", "Too much JavaScript, render-blocking resources, large images", "Code splitting, lazy loading, server rendering, image optimisation"],
          ["Typing or clicking lags", "A state change re-renders a large tree", "Move state down, pass content as `children`, `memo`, transitions"],
          ["One interaction freezes the page", "An expensive computation in render", "`useMemo`, move it off the main thread, do it on the server"],
          ["Long lists scroll badly", "Thousands of DOM nodes", "Virtualisation, pagination"],
          ["Spinners everywhere", "Request waterfalls, no caching", "Parallel fetches, a query cache, prefetching, server data"],
        ),
        trap(
          "Development builds are several times slower than production and render everything twice under Strict Mode. Never draw conclusions from profiling a dev build.",
        ),
      ],
      followUps: [
        {
          q: "How do you reduce bundle size?",
          a: "Analyse it first with a bundle visualiser. Then split by route, lazy-load heavy and rarely-used components, replace large dependencies (a date library where `Intl` would do, a utility library imported whole), make sure imports are tree-shakeable, and keep server-only code on the server.",
        },
        {
          q: "Which optimisation do you reach for last?",
          a: "Wrapping things in `memo`, `useMemo` and `useCallback`. They add complexity and can hide the structural problem. Restructuring where state lives usually removes the re-render instead of making it cheaper.",
        },
      ],
      docs: "https://react.dev/reference/react/Profiler",
    },
    {
      id: "perf-avoid-rerenders",
      question: "How do you stop an expensive subtree from re-rendering, without `memo`?",
      level: "intermediate",
      short:
        "Change the structure so the state that changes and the subtree that is expensive are no longer in the same component. Either move the state down into a smaller component, or lift the expensive content up and pass it in as `children`.",
      body: [
        tsx(
          `
declare function ExpensiveTree(): ReactNode;

function Page() {
  const [text, setText] = useState("");

  return (
    <>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <ExpensiveTree /> {/* re-renders on every keystroke, though it does not use text */}
    </>
  );
}
`,
          { caption: "The problem", tone: "bad" },
        ),
        tsx(
          `
declare function ExpensiveTree(): ReactNode;

function SearchInput() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(event) => setText(event.target.value)} />;
}

function Page() {
  return (
    <>
      <SearchInput /> {/* only this re-renders */}
      <ExpensiveTree />
    </>
  );
}
`,
          { caption: "Fix 1: move the state down", tone: "good" },
        ),
        tsx(
          `
declare function ExpensiveTree(): ReactNode;

function ThemePanel({ children }: { children: ReactNode }) {
  const [color, setColor] = useState("#e4572e");

  return (
    <div style={{ color }}>
      <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
      {children}
    </div>
  );
}

function Page() {
  return (
    <ThemePanel>
      <ExpensiveTree /> {/* created by Page, which does not re-render */}
    </ThemePanel>
  );
}
`,
          { caption: "Fix 2: lift the content up", tone: "good" },
        ),
        p(
          "Fix 2 works because `children` is an element that `Page` created. When `ThemePanel` re-renders, it receives the very same element object as before, and React skips a subtree whose element has not changed.",
        ),
        list(
          "Keep state as close as possible to where it is used.",
          "Split a component that mixes fast-changing state with slow-rendering content.",
          "Keep unrelated state out of context: every consumer re-renders when it changes.",
        ),
      ],
      docs: "https://react.dev/learn/choosing-the-state-structure",
    },
    {
      id: "perf-react-memo",
      question: "What is `React.memo`? What are pure components, and when does memoisation fail?",
      level: "intermediate",
      short:
        "`memo` wraps a component so that React skips re-rendering it when the parent re-renders with shallowly equal props. It is the function-component version of the class `PureComponent`. It fails whenever a prop is a new reference each time, and it never blocks updates from the component's own state or context.",
      body: [
        tsx(`
interface RowProps {
  label: string;
  style: { color: string };
  onSelect: () => void;
}

const Row = memo(function Row({ label, style, onSelect }: RowProps) {
  return (
    <li style={style} onClick={onSelect}>
      {label}
    </li>
  );
});

function List({ labels }: { labels: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ul data-selected={selected}>
      {labels.map((label) => (
        <Row
          key={label}
          label={label}
          style={{ color: "tomato" }} // a new object every render: memo never skips
          onSelect={() => setSelected(label)} // a new function every render: same problem
        />
      ))}
    </ul>
  );
}
`),
        table(
          ["Why a memoised component still re-renders", "Fix"],
          ["An inline object or array prop", "Hoist it to a constant, or `useMemo`"],
          ["An inline function prop", "`useCallback`, or pass a stable function such as `dispatch`"],
          ["JSX passed as `children` or another prop", "Elements are new objects each render; memoise the element or restructure"],
          ["It reads a context that changed", "Split the context, or read it in a smaller child"],
          ["Its own state changed", "Nothing to fix: that is a real update"],
        ),
        list(
          "The comparison is shallow: each prop is compared with `Object.is`. Mutating an object in place is therefore invisible to it.",
          "`memo(Component, arePropsEqual)` accepts a custom comparison. It is rarely worth it, and an incorrect one causes stale UI.",
          "Memoising costs a comparison on every render. For a cheap component that almost always receives new props, it is pure overhead.",
        ),
      ],
      followUps: [
        {
          q: "What was `shouldComponentUpdate`?",
          a: "The class method that let a component decide whether to re-render. `PureComponent` implemented it as a shallow comparison of props and state. `memo` is the same idea for props of function components.",
        },
        {
          q: "Should you wrap everything in `memo`?",
          a: "No. Use it where the Profiler shows a component that renders often, with the same props, and is slow to render. With the React Compiler enabled, this is done for you.",
        },
      ],
      docs: "https://react.dev/reference/react/memo",
    },
    {
      id: "perf-code-splitting",
      question: "What are code splitting and lazy loading? How do `React.lazy` and Suspense work together?",
      level: "intermediate",
      short:
        "Code splitting breaks the bundle into chunks that are downloaded on demand, so the first page load only pays for the code it needs. `lazy` wraps a dynamic `import()` in a component; the first time it renders, React suspends, shows the nearest `<Suspense>` fallback while the chunk downloads, then renders the real component.",
      body: [
        tsx(`
import { lazy, Suspense, useState } from "react";

const Settings = lazy(() => import("./Settings")); // a default export
const RevenueChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.RevenueChart })), // a named export
);

export function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Suspense fallback={<p>Loading chart</p>}>
        <RevenueChart />
      </Suspense>

      <button onClick={() => setShowSettings(true)}>Settings</button>
      {showSettings && (
        <Suspense fallback={<p>Loading settings</p>}>
          <Settings />
        </Suspense>
      )}
    </>
  );
}
`),
        table(
          ["Where to split", "Why"],
          ["By route", "The biggest win for the least effort; most routers and frameworks do it for you"],
          ["Heavy components", "Charts, rich text editors, maps, syntax highlighters"],
          ["Below the fold or behind an interaction", "Modals, drawers, tabs the user may never open"],
          ["Large libraries used in one place", "Import them dynamically inside the handler that needs them"],
        ),
        list(
          "Declare `lazy` components at module level. Inside a component, a new lazy component is created on every render and its state resets.",
          "Wrap lazy boundaries in an error boundary: a chunk can fail to load after a deploy or on a bad connection.",
          "Preload on intent (hover, focus, route prefetch) so the chunk is usually there before the click.",
          "Place Suspense boundaries deliberately. One at the root gives a blank page; one per widget gives a pop-in of spinners.",
        ),
      ],
      followUps: [
        {
          q: "Does `lazy` support named exports?",
          a: "Only default exports directly. Either re-export the component as a default from its own file, or map it in the promise as above.",
        },
        {
          q: "How is this different with Server Components?",
          a: "Server Components never ship to the browser at all, so their code is not in any chunk. Splitting happens automatically at each `\"use client\"` boundary.",
        },
      ],
      docs: "https://react.dev/reference/react/lazy",
    },
    {
      id: "perf-virtualization",
      question: "How do you render a list of 100,000 rows?",
      level: "intermediate",
      short:
        "You do not render 100,000 rows. Virtualisation (or windowing) renders only the rows visible in the scroll viewport plus a small buffer, positions them absolutely inside a spacer as tall as the full list, and swaps rows in and out as the user scrolls.",
      body: [
        tsx(`
interface VirtualListProps {
  items: string[];
  rowHeight: number;
  height: number;
}

function VirtualList({ items, rowHeight, height }: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const overscan = 3; // extra rows above and below, so fast scrolling does not show gaps

  const first = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const last = Math.min(items.length, Math.ceil((scrollTop + height) / rowHeight) + overscan);

  return (
    <div style={{ height, overflowY: "auto" }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
      <div style={{ height: items.length * rowHeight, position: "relative" }}>
        {items.slice(first, last).map((item, offset) => {
          const index = first + offset;
          return (
            <div key={index} style={{ position: "absolute", top: index * rowHeight, height: rowHeight, left: 0, right: 0 }}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
`),
        list(
          "The DOM holds a few dozen nodes no matter how long the list is, so memory and layout cost stay flat.",
          "In production use a library: TanStack Virtual, `react-window` or `react-virtuoso`. Variable row heights, sticky headers and scroll restoration are harder than they look.",
        ),
        table(
          ["Cost of virtualising", "Mitigation"],
          ["Browser find-in-page cannot see unrendered rows", "Provide an in-app search"],
          ["Screen readers do not know the list's real size", "`aria-rowcount`, `aria-setsize`, `aria-posinset`"],
          ["Variable-height rows must be measured", "Use a library that measures and caches"],
          ["Fast scrolling can show blank space", "Increase overscan; keep rows cheap to render"],
        ),
      ],
      followUps: [
        {
          q: "When is virtualisation the wrong answer?",
          a: "When the list is a few hundred simple rows, or when pagination or 'load more' matches how people use the data. CSS `content-visibility: auto` is a cheaper middle ground: the nodes exist, but the browser skips rendering the off-screen ones.",
        },
        {
          q: "How do you combine it with infinite scroll?",
          a: "Fetch pages with cursor-based pagination as the user approaches the end (an `IntersectionObserver` on a sentinel row), append them to the data, and let the virtualiser render only the visible window of the growing list.",
        },
      ],
      docs: "https://tanstack.com/virtual/latest",
    },
    {
      id: "perf-context",
      question: "A context update is re-rendering half the app. How do you fix it?",
      level: "senior",
      short:
        "Every consumer of a context re-renders when its value changes, so reduce how often the value changes and how many components consume each piece. Memoise the value, split one large context into several by how often each part changes, and for high-frequency or fine-grained state move to a store with selectors.",
      body: [
        tsx(`
interface Todo {
  id: string;
  title: string;
}
type Action = { type: "added"; todo: Todo } | { type: "removed"; id: string };

const TodosContext = createContext<Todo[]>([]);
const TodosDispatchContext = createContext<React.Dispatch<Action>>(() => {});

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "added":
      return [...todos, action.todo];
    case "removed":
      return todos.filter((todo) => todo.id !== action.id);
  }
}

function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <TodosContext value={todos}>
      <TodosDispatchContext value={dispatch}>{children}</TodosDispatchContext>
    </TodosContext>
  );
}

function AddButton() {
  // Reads only dispatch, which never changes: this never re-renders when todos change.
  const dispatch = useContext(TodosDispatchContext);
  return (
    <button onClick={() => dispatch({ type: "added", todo: { id: crypto.randomUUID(), title: "New" } })}>
      Add
    </button>
  );
}
`),
        steps(
          "**Memoise the value** if it is an object, so the provider re-rendering does not by itself notify every consumer.",
          "**Split by update frequency.** State in one context, `dispatch` (stable) in another; the user in one, the theme in another.",
          "**Push the read down.** Have a small leaf component read the context, so the re-render is cheap.",
          "**Use a store** (Zustand, Redux, Jotai) when components need to subscribe to a slice. Context has no selectors.",
        ),
        trap(
          "`memo` on a consumer does not help: a context change re-renders the component from the inside, not through its props.",
        ),
      ],
      docs: "https://react.dev/learn/scaling-up-with-reducer-and-context",
    },
    {
      id: "perf-expensive-work",
      question: "How do you handle an expensive computation without freezing the UI?",
      level: "senior",
      short:
        "First avoid repeating it (memoise, or compute it on the server). If it still takes long, make it interruptible with a transition so input stays responsive. If it is pure CPU work unrelated to rendering, move it off the main thread into a Web Worker.",
      body: [
        table(
          ["Technique", "Good for", "Limitation"],
          ["`useMemo`", "Recomputing only when inputs change", "The first computation still blocks"],
          ["`useTransition` / `useDeferredValue`", "Slow rendering caused by a state change", "Helps render work, not one long synchronous function"],
          ["Chunking with yields", "Loops over large data", "You manage the scheduling yourself"],
          ["Web Worker", "Parsing, sorting, image or crypto work", "Data is copied across threads; no DOM access"],
          ["Do less", "Pagination, virtualisation, server-side aggregation", "Needs API support"],
        ),
        ts(`
// Break a long loop into chunks and let the browser handle input in between.
async function processInChunks<T>(items: T[], handle: (item: T) => void, chunkSize = 500) {
  for (let start = 0; start < items.length; start += chunkSize) {
    for (const item of items.slice(start, start + chunkSize)) handle(item);
    await new Promise<void>((resolve) => setTimeout(resolve, 0)); // yield to the event loop
  }
}
`),
        tsx(`
function useSortedInWorker(rows: number[]) {
  const [sorted, setSorted] = useState<number[]>([]);

  useEffect(() => {
    const worker = new Worker(new URL("./sort.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<number[]>) => setSorted(event.data);
    worker.postMessage(rows);
    return () => worker.terminate(); // cancel if rows change or the component unmounts
  }, [rows]);

  return sorted;
}
`),
        say(
          "My order of preference is: do not do the work, do it once, do it somewhere else, and only then do it in slices. A transition keeps the UI responsive while React renders; it does not make a 500 ms function shorter.",
        ),
      ],
      docs: "https://react.dev/reference/react/useTransition",
    },
    {
      id: "perf-debounce-throttle",
      question: "What is the difference between debouncing and throttling? Implement a debounce.",
      level: "intermediate",
      short:
        "Debouncing waits until the calls stop: it runs once, after a quiet period. Throttling runs at most once per interval while the calls continue. Debounce a search box; throttle a scroll or resize handler.",
      body: [
        ts(`
function debounce<Args extends unknown[]>(fn: (...args: Args) => void, waitMs: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Args) => {
    clearTimeout(timer); // every call cancels the previous pending one
    timer = setTimeout(() => fn(...args), waitMs);
  };
  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}

function throttle<Args extends unknown[]>(fn: (...args: Args) => void, intervalMs: number) {
  let last = 0;

  return (...args: Args) => {
    const now = Date.now();
    if (now - last < intervalMs) return; // too soon: drop this call
    last = now;
    fn(...args);
  };
}
`),
        table(
          ["", "Debounce", "Throttle"],
          ["Runs", "Once, after the calls stop for `wait` ms", "At most once every `interval` ms"],
          ["Typical use", "Search-as-you-type, autosave, validating a field", "Scroll position, resize, mouse move, rate-limited buttons"],
          ["Ten calls in one burst", "One execution, at the end", "One at the start, more if the burst outlasts the interval"],
        ),
        p("In a component, the debounced function must be the same one across renders, and it must be cancelled on unmount:"),
        tsx(`
declare function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): ((...args: Args) => void) & { cancel(): void };

function SearchBox({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  return (
    <input
      value={query}
      onChange={(event) => {
        setQuery(event.target.value); // the input itself updates immediately
        debouncedSearch(event.target.value);
      }}
    />
  );
}
`),
        trap(
          "Calling `debounce(...)` directly in the component body creates a new debounced function, with a new timer, on every render. Nothing is ever cancelled, and every keystroke fires.",
        ),
      ],
      followUps: [
        {
          q: "Debounce or `useDeferredValue` for a search field?",
          a: "They solve different problems. Debouncing reduces how many requests you send. `useDeferredValue` keeps typing responsive while React renders a slow result list. A search box that hits an API usually wants the debounce, and may want both.",
        },
        {
          q: "What else does a good typeahead need?",
          a: "Cancellation of the previous request, a minimum query length, a cache keyed by query, keyboard navigation, and the ARIA combobox roles so it works with a screen reader.",
        },
      ],
    },
    {
      id: "perf-react-compiler",
      question: "What is the React Compiler?",
      level: "senior",
      short:
        "A build-time tool that analyses your components and inserts memoisation automatically, doing the job of `useMemo`, `useCallback` and `React.memo` at a finer granularity than people write by hand. It works only on code that follows the Rules of React, and skips components it cannot prove are safe.",
      body: [
        tsx(
          `
interface Item {
  id: string;
  name: string;
  price: number;
}
declare function ExpensiveList(props: { items: Item[]; onPick: (id: string) => void }): ReactNode;

function Catalog({ items, onPick }: { items: Item[]; onPick: (id: string) => void }) {
  const [query, setQuery] = useState("");

  // No useMemo, no useCallback. The compiler caches visible and handlePick and
  // reuses them until items, query or onPick change.
  const visible = items.filter((item) => item.name.includes(query));
  const handlePick = (id: string) => onPick(id);

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ExpensiveList items={visible} onPick={handlePick} />
    </>
  );
}
`,
          { caption: "What you write with the compiler enabled" },
        ),
        list(
          "It runs as a plugin in the build (Babel, with integrations for Vite and Next.js). There is nothing to call at runtime.",
          "It assumes components are pure, props and state are not mutated, and hooks are called unconditionally. Code that breaks those rules is left uncompiled, not miscompiled.",
          "Its ESLint rules surface the violations, which is useful even before you enable the compiler.",
          "A `\"use no memo\"` directive opts a single component or hook out while you investigate a problem.",
        ),
        trap(
          "It makes re-renders cheaper; it does not make structural problems go away. State that lives too high, a context that changes constantly, an unvirtualised list of 10,000 rows and a slow first render are all still yours to fix.",
        ),
      ],
      followUps: [
        {
          q: "Do you delete existing `useMemo` and `useCallback` calls?",
          a: "There is no need to: the compiler works alongside them. New code can simply be written without them, and old ones can be removed over time where the compiler covers the case.",
        },
        {
          q: "Does that make memoisation knowledge obsolete?",
          a: "No. You still need to understand referential equality to read a Profiler trace, to work in codebases without the compiler, and to explain why something re-rendered.",
        },
      ],
      docs: "https://react.dev/learn/react-compiler",
    },
    {
      id: "perf-web-vitals",
      question: "What are Core Web Vitals, and what can a React developer do about them?",
      level: "senior",
      short:
        "Three field metrics Google uses to describe user experience: LCP (how fast the main content appears), INP (how quickly the page responds to interactions) and CLS (how much the layout jumps around). Each maps to specific decisions in a React app.",
      body: [
        table(
          ["Metric", "Measures", "Good", "React-side levers"],
          ["LCP: Largest Contentful Paint", "Loading", "≤ 2.5 s", "Server-render or statically generate the page; preload the hero image; split and defer non-critical JavaScript"],
          ["INP: Interaction to Next Paint", "Responsiveness", "≤ 200 ms", "Keep handlers short; use transitions for slow renders; avoid re-rendering large trees; hydrate less"],
          ["CLS: Cumulative Layout Shift", "Visual stability", "≤ 0.1", "Set image and video dimensions; reserve space with skeletons; do not insert content above what is on screen"],
        ),
        list(
          "INP replaced First Input Delay in 2024. It looks at every interaction during the visit, not just the first, so slow re-renders now show up directly in the metric.",
          "A client-only React app typically has poor LCP: the browser must download, parse and run the bundle before anything meaningful is drawn.",
          "Hydration is main-thread work that competes with the user's first interactions. Server Components and code splitting reduce how much there is to hydrate.",
          "Measure in the field (real user monitoring, the `web-vitals` library), not only in Lighthouse on a fast laptop.",
        ),
      ],
      followUps: [
        {
          q: "A skeleton screen or a spinner?",
          a: "A skeleton that matches the final layout, because it reserves the space and so prevents layout shift, and it makes the wait feel shorter. Spinners are fine inside a button or a small region.",
        },
      ],
      docs: "https://web.dev/articles/vitals",
    },
  ],
};
