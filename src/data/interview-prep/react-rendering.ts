import { list, output, p, say, steps, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_RENDERING: PrepSection = {
  id: "react-rendering",
  track: "react",
  title: "Rendering and reconciliation",
  blurb:
    "How React decides what to do when something changes. This is where intermediate interviews turn into senior ones: the questions stop being 'what is' and become 'why did this re-render'.",
  drill: "rendering-keys",
  questions: [
    {
      id: "render-triggers",
      question: "What causes a component to re-render?",
      level: "junior",
      short:
        "Three things: its own state changed, its parent re-rendered, or a context it reads changed. Note what is missing: 'its props changed'. A component re-renders when its parent does, whether or not the props are different, unless it is wrapped in `memo`.",
      body: [
        tsx(`
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Clicked {count}</button>
      <Child />
    </>
  );
}

function Child() {
  console.log("Child rendered"); // logs on every click, although Child takes no props
  return <p>I never change.</p>;
}
`),
        list(
          "**State change.** Calling a setter (or `dispatch`) with a different value queues a render of that component.",
          "**Parent render.** Rendering is recursive by default: when a component renders, React renders everything it returns.",
          "**Context change.** Every component that reads the context re-renders when the provider's value changes, even through a memoised ancestor.",
          "**External store.** A subscription made with `useSyncExternalStore` (which is what store libraries use) triggers a render when its snapshot changes.",
        ),
        trap(
          "'Re-render' does not mean 'DOM update'. Rendering is React calling your function and comparing the result with last time. If nothing differs, the DOM is not touched. Most re-renders are cheap, and chasing every one of them is the usual premature optimisation.",
        ),
      ],
      followUps: [
        {
          q: "Setting state to the value it already has: does that re-render?",
          a: "No. React compares with `Object.is` and bails out. (It may call the component once more before bailing out, but it will not render the children or run effects.)",
        },
        {
          q: "How do you find out why a component rendered?",
          a: "React DevTools Profiler, with 'Record why each component rendered' enabled. It names the state, prop, hook or parent responsible.",
        },
      ],
      docs: "https://react.dev/learn/render-and-commit",
    },
    {
      id: "render-and-commit",
      question: "What are the render phase and the commit phase? Why must rendering be pure?",
      level: "intermediate",
      short:
        "In the render phase React calls your components and works out what changed; nothing on screen is touched, and the work can be paused, restarted or thrown away. In the commit phase it applies the changes to the DOM in one synchronous step. Because rendering may run more than once or not be used at all, a component must not have side effects while rendering.",
      body: [
        steps(
          "**Trigger.** The initial mount, or a state update.",
          "**Render.** React calls the affected components, builds the new tree of elements, and diffs it against the previous one. Pure computation.",
          "**Commit.** React mutates the DOM, attaches refs, and runs layout effects. Synchronous and uninterruptible, so the user never sees a half-updated screen.",
          "**Paint.** The browser draws the result.",
          "**Passive effects.** `useEffect` cleanups and setups run.",
        ),
        tsx(
          `
let renderCount = 0;

function Impure({ items }: { items: string[] }) {
  renderCount++; // mutates something outside the component
  items.sort(); // mutates a prop
  document.title = items.length + " items"; // touches the DOM during render
  return <p>{items.join(", ")}</p>;
}

function Pure({ items }: { items: string[] }) {
  const sorted = [...items].sort(); // local mutation of a fresh copy is fine

  useEffect(() => {
    document.title = sorted.length + " items"; // side effects belong in effects or handlers
  }, [sorted.length]);

  return <p>{sorted.join(", ")}</p>;
}
`,
          { caption: "Impure and pure" },
        ),
        list(
          "Pure means: given the same props, state and context, return the same JSX, and change nothing that existed before the call.",
          "Strict Mode calls components twice in development precisely to make impurity visible.",
          "Concurrent rendering, Suspense and the React Compiler all assume purity. An impure component may work today and break when one of them is switched on.",
        ),
      ],
      followUps: [
        {
          q: "Where do side effects go, then?",
          a: "In event handlers when they are caused by a user action, and in effects when they are caused by the component being displayed. Never in the component body.",
        },
        {
          q: "Can a render be thrown away?",
          a: "Yes. If a more urgent update arrives while React is rendering a transition, the in-progress work is discarded and restarted. Nothing was committed, so the user sees no inconsistency, provided the render had no side effects.",
        },
      ],
      docs: "https://react.dev/learn/keeping-components-pure",
    },
    {
      id: "render-reconciliation",
      question: "What is reconciliation? How does React's diffing algorithm work?",
      level: "intermediate",
      short:
        "Reconciliation is how React compares the new element tree with the previous one to find the smallest set of DOM changes. A general tree diff is O(n³), so React uses an O(n) heuristic built on two assumptions: elements of different types produce different trees, and keys identify which children are the same across renders.",
      body: [
        table(
          ["Comparing", "What React does"],
          ["Elements of different types (`div` to `section`, `A` to `B`)", "Destroys the old subtree, including all its state, and builds the new one"],
          ["DOM elements of the same type", "Keeps the node and updates only the attributes that changed"],
          ["Components of the same type", "Keeps the instance and its state, passes the new props, and re-renders"],
          ["Lists of children", "Matches by key; without keys, by position"],
        ),
        tsx(`
function Toolbar({ compact }: { compact: boolean }) {
  // Different element type at the same position: the input is destroyed and
  // recreated when compact flips, so whatever the user typed is lost.
  return compact ? (
    <div>
      <input placeholder="Search" />
    </div>
  ) : (
    <section>
      <input placeholder="Search" />
    </section>
  );
}
`),
        p(
          "Children are where keys matter. Insert an item at the top of an unkeyed list and React compares position by position: it rewrites every existing item and appends one at the end. With keys it sees that the old items simply moved down, and inserts one node.",
        ),
        say(
          "Reconciliation compares the previous and next element trees and computes the minimal DOM updates. It runs in linear time thanks to two heuristics: a different type means a different subtree, and keys give list items a stable identity.",
        ),
      ],
      followUps: [
        {
          q: "Is reconciliation the same as the virtual DOM?",
          a: "The virtual DOM is the data (trees of elements); reconciliation is the algorithm that compares them. Fiber is the implementation of that algorithm since React 16.",
        },
        {
          q: "Does the diff look at the real DOM?",
          a: "No. It compares the new elements against React's own record of what it rendered last time. That is why changing the DOM behind React's back leads to surprises.",
        },
      ],
      docs: "https://react.dev/learn/preserving-and-resetting-state",
    },
    {
      id: "render-state-position",
      question: "When does React keep a component's state, and when does it reset it?",
      level: "intermediate",
      short:
        "State belongs to a position in the tree. If the same component type is rendered at the same position on the next render, its state is preserved. If the type changes, the position changes, or the `key` changes, React treats it as a different component: the old one is unmounted and the new one starts fresh.",
      body: [
        tsx(`
function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{label}: {count}</button>;
}

function Scoreboard({ player }: { player: "A" | "B" }) {
  return (
    <>
      {/* 1. Same type, same position: ONE counter. Its count survives the switch. */}
      {player === "A" ? <Counter label="Alice" /> : <Counter label="Bob" />}

      {/* 2. Different keys: two separate counters. Switching resets to 0. */}
      {player === "A" ? <Counter key="A" label="Alice" /> : <Counter key="B" label="Bob" />}

      {/* 3. Different positions: two separate counters. Hiding one destroys its state. */}
      {player === "A" && <Counter label="Alice" />}
      {player === "B" && <Counter label="Bob" />}
    </>
  );
}
`),
        list(
          "It is the position in the rendered tree that counts, not where the JSX appears in your source. Case 1 has two JSX tags and one position.",
          "A `key` is part of the position. Changing it is the supported way to reset a component on purpose: `<Form key={recordId} />`.",
          "Removing a component from the tree destroys its state. To keep it, lift the state up, keep the component mounted and hide it, or use `<Activity mode=\"hidden\">`.",
        ),
      ],
      followUps: [
        {
          q: "A chat app keeps the draft message when you switch contacts. Why, and what is the fix?",
          a: "The `<Chat>` component is the same type at the same position, so its state is preserved while only the `contact` prop changes. Give it `key={contact.id}` and each conversation gets its own state.",
        },
      ],
      docs: "https://react.dev/learn/preserving-and-resetting-state",
    },
    {
      id: "render-order",
      question: "In what order do a parent and child render and run their effects?",
      level: "intermediate",
      short:
        "Rendering goes top-down: parent, then child. Effects go bottom-up: the child's effects run before the parent's. On an update, every cleanup from the previous render runs before any of the new effects.",
      body: [
        tsx(`
function Parent() {
  const [count, setCount] = useState(0);
  console.log("Parent render");

  useEffect(() => {
    console.log("Parent effect");
    return () => console.log("Parent cleanup");
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      <Child />
    </button>
  );
}

function Child() {
  console.log("Child render");

  useLayoutEffect(() => {
    console.log("Child layout effect");
  });

  useEffect(() => {
    console.log("Child effect");
    return () => console.log("Child cleanup");
  });

  return <span>Click</span>;
}
`),
        p("On mount, without Strict Mode:"),
        output(`
Parent render
Child render
Child layout effect
Child effect
Parent effect
`),
        p("After one click:"),
        output(`
Parent render
Child render
Child layout effect
Child cleanup
Parent cleanup
Child effect
Parent effect
`),
        list(
          "Layout effects run during the commit, before the browser paints. Passive effects (`useEffect`) run after.",
          "A cleanup always sees the props and state of the render it was created in.",
          "Under Strict Mode in development, each render line appears twice and the mount shows an extra setup, cleanup, setup cycle.",
        ),
      ],
      followUps: [
        {
          q: "Why do children's effects run first?",
          a: "By the time a parent's effect runs, its whole subtree is mounted and its children's effects have completed, so the parent can safely interact with them (measure them, call methods through refs).",
        },
      ],
      docs: "https://react.dev/learn/lifecycle-of-reactive-effects",
    },
    {
      id: "render-fiber",
      question: "What is React Fiber?",
      level: "senior",
      short:
        "Fiber is the reconciliation engine React has used since version 16, and also the name of its data structure. Each component instance and DOM node is a fiber: a unit of work linked to its parent, first child and next sibling. Because the tree is a linked list rather than a recursive call stack, React can pause work, resume it, prioritise it or throw it away.",
      body: [
        list(
          "**Before Fiber** the reconciler recursed through the whole tree in one synchronous pass. A large update blocked the main thread until it finished, and input and animations stalled.",
          "**A fiber holds** the component type, its props, its state (the list of hooks), pointers to `child`, `sibling` and `return`, and flags describing what must be done at commit.",
          "**Two trees.** `current` is what is on screen; `workInProgress` is being built. On commit React swaps them. If a render is abandoned, the work-in-progress tree is simply discarded.",
          "**Priorities.** Each update is assigned a lane. A keystroke outranks a transition, so React can interrupt the transition's render to handle the keystroke.",
        ),
        table(
          ["Fiber makes possible", "How"],
          ["Concurrent rendering, transitions", "Render work is split into units and can yield to the browser"],
          ["Suspense", "A subtree can be paused and retried later"],
          ["Error boundaries", "A failed unit of work can be unwound to the nearest boundary"],
          ["Returning fragments and strings from render", "A fiber does not need to map to exactly one DOM node"],
        ),
        say(
          "The stack reconciler could not stop once it started. Fiber turned rendering into a loop over units of work that React controls, which is what allows it to schedule, interrupt and resume. The commit phase is still synchronous, so the DOM is never left half-updated.",
        ),
      ],
      followUps: [
        {
          q: "Is Fiber something you use directly?",
          a: "No, it is internal. You see it indirectly: hooks are stored on the fiber in call order (hence the Rules of Hooks), and DevTools shows the fiber tree.",
        },
      ],
      docs: "https://react.dev/learn/render-and-commit",
    },
    {
      id: "render-concurrent",
      question: "What is concurrent rendering?",
      level: "senior",
      short:
        "Since React 18, rendering can be interrupted. React can start rendering an update, pause to handle something more urgent, and then continue or start over. It is not a mode you switch on for the whole app; it is used when you opt in through features such as transitions, deferred values and Suspense.",
      body: [
        list(
          "**Urgent updates** (typing, clicking, pressing) render synchronously, as always.",
          "**Transitions** (`startTransition`, `useDeferredValue`) render in the background in small slices, yielding to the browser between them.",
          "**The commit is still atomic.** However the render was scheduled, the DOM is updated in one go.",
        ),
        table(
          ["Feature", "What concurrency gives it"],
          ["`useTransition`, `useDeferredValue`", "A slow render does not block input"],
          ["Suspense", "React can keep showing the old screen while the next one loads"],
          ["Streaming SSR and selective hydration", "The server sends HTML in chunks; the client hydrates the part the user touches first"],
          ["Automatic batching", "Updates from any source are grouped into one render"],
        ),
        trap(
          "Concurrency raises the cost of impurity. A render that is started twice or discarded must not have done anything observable. External mutable state read during render can also change between slices, which is why stores need `useSyncExternalStore`.",
        ),
      ],
      followUps: [
        {
          q: "How do you enable it?",
          a: "By creating the root with `createRoot` (or `hydrateRoot`), which is the only option since React 19. From there it is feature by feature: an update is concurrent only if it is marked as a transition or deferred.",
        },
        {
          q: "Is it the same as the old 'Concurrent Mode'?",
          a: "That was the experimental all-or-nothing version. It was replaced by this opt-in model so existing apps could upgrade without every component having to be concurrency-safe at once.",
        },
      ],
      docs: "https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react",
    },
    {
      id: "render-react-vs-react-dom",
      question: "What is the difference between `react` and `react-dom`? How does an app start?",
      level: "junior",
      short:
        "`react` is the core: components, elements, hooks. It knows nothing about browsers. `react-dom` is a renderer that turns React's output into DOM operations. Splitting them lets the same core drive other renderers, such as React Native.",
      body: [
        tsx(
          `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello</h1>;
}

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
          { caption: "main.tsx" },
        ),
        table(
          ["Package", "Provides"],
          ["`react`", "`useState`, `useEffect`, `createContext`, `memo`, `lazy`, `Suspense`"],
          ["`react-dom`", "`createPortal`, `flushSync`, `useFormStatus`, resource preloading"],
          ["`react-dom/client`", "`createRoot`, `hydrateRoot`"],
          ["`react-dom/server`", "`renderToPipeableStream`, `renderToReadableStream`, `renderToString`"],
        ),
        list(
          "`createRoot` starts a client-rendered app in an empty container.",
          "`hydrateRoot` attaches React to HTML that was already rendered on the server.",
          "`ReactDOM.render` and `ReactDOM.hydrate`, which you will see in older code, were removed in React 19.",
        ),
      ],
      docs: "https://react.dev/reference/react-dom/client/createRoot",
    },
  ],
};
