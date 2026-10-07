import { list, p, say, steps, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_HOOKS: PrepSection = {
  id: "react-hooks",
  track: "react",
  title: "Hooks",
  blurb:
    "The centre of any modern React interview. Expect to explain what each hook is for, predict what a snippet logs, and find the bug in an effect.",
  drill: "hooks",
  questions: [
    {
      id: "hooks-what-why",
      question: "What are hooks, and what problems did they solve?",
      level: "junior",
      short:
        "Hooks are functions that let a function component use React features: state, effects, context, refs. They arrived in React 16.8 to fix three problems with classes: stateful logic was hard to share, related code was scattered across lifecycle methods, and `this` was a constant source of bugs.",
      body: [
        list(
          "**Reuse.** Sharing stateful logic used to mean higher-order components or render props, both of which wrap your component in more components. A custom hook is just a function call.",
          "**Cohesion.** A subscription was set up in `componentDidMount`, updated in `componentDidUpdate` and torn down in `componentWillUnmount`. With an effect, setup and cleanup sit together.",
          "**Simplicity.** No `this`, no binding handlers in the constructor, no class boilerplate.",
        ),
        table(
          ["Purpose", "Hooks"],
          ["State", "`useState`, `useReducer`"],
          ["Side effects", "`useEffect`, `useLayoutEffect`, `useInsertionEffect`, `useEffectEvent`"],
          ["Context", "`useContext`, `use`"],
          ["Refs", "`useRef`, `useImperativeHandle`"],
          ["Performance", "`useMemo`, `useCallback`, `useTransition`, `useDeferredValue`"],
          ["Forms and actions (React 19)", "`useActionState`, `useOptimistic`, `useFormStatus`"],
          ["Other", "`useId`, `useSyncExternalStore`, `useDebugValue`"],
        ),
        tsx(`
// Stateful logic, extracted once and reused by any component.
function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update); // setup and cleanup, side by side
  }, []);

  return width;
}

function Sidebar() {
  const width = useWindowWidth();
  return width < 768 ? null : <aside>Navigation</aside>;
}
`),
      ],
      followUps: [
        {
          q: "Do hooks replace Redux, HOCs and render props?",
          a: "They replace most uses of HOCs and render props. `useReducer` plus context covers small global state, but a store library still earns its place when many components need selective subscriptions, middleware or devtools.",
        },
        {
          q: "Can you use hooks in a class component?",
          a: "No. To use hook-based logic from a class, wrap the class in a function component that calls the hook and passes the result as props.",
        },
      ],
      docs: "https://react.dev/reference/react/hooks",
    },
    {
      id: "hooks-rules",
      question: "What are the Rules of Hooks, and why do they exist?",
      level: "junior",
      short:
        "Call hooks only at the top level of a component or custom hook, never inside conditions, loops, nested functions or after an early return; and call them only from React functions. React identifies each hook by the order in which it is called, so that order has to be identical on every render.",
      body: [
        p(
          "React does not know the names of your state variables. For each component it keeps a list of hook slots, and on every render it hands out slot 1 to the first hook call, slot 2 to the second, and so on. Skip one call and every hook after it reads the wrong slot.",
        ),
        tsx(
          `
function Profile({ userId }: { userId: string | null }) {
  if (userId === null) return null; // an early return before the hooks...

  const [name, setName] = useState(""); // ...means these run on some renders and not others
  useEffect(() => {
    document.title = name;
  }, [name]);

  return <input value={name} onChange={(event) => setName(event.target.value)} />;
}
`,
          { caption: "Breaks the rule", tone: "bad" },
        ),
        tsx(
          `
function Profile({ userId }: { userId: string | null }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (userId === null) return; // the condition moves inside the hook
    document.title = name;
  }, [userId, name]);

  if (userId === null) return null; // early return after every hook

  return <input value={name} onChange={(event) => setName(event.target.value)} />;
}
`,
          { caption: "Same behaviour, stable hook order", tone: "good" },
        ),
        list(
          "The `use` prefix is a naming convention with teeth: it is how the linter knows a function is a hook and must follow the rules.",
          "`eslint-plugin-react-hooks` enforces both rules (`rules-of-hooks`) and checks dependency arrays (`exhaustive-deps`).",
          "The one exception is `use`, which may be called inside conditions and loops.",
        ),
      ],
      followUps: [
        {
          q: "What actually happens if you break the rule?",
          a: "React throws 'Rendered fewer hooks than expected' (or more), or worse, silently pairs state with the wrong hook. The linter catches it before that.",
        },
        {
          q: "Why can you not call a hook in an event handler?",
          a: "A handler runs outside of rendering. Hooks only have meaning while React is rendering a component and can tell which component's slots are being filled.",
        },
      ],
      docs: "https://react.dev/reference/rules/rules-of-hooks",
    },
    {
      id: "hooks-usestate",
      question: "How does `useState` work? What are its gotchas?",
      level: "junior",
      short:
        "`useState(initial)` returns the current value and a setter. Calling the setter schedules a re-render with the new value. The state variable itself is a constant for that render: it never changes mid-function, which is the root of most `useState` confusion.",
      body: [
        tsx(`
declare function buildInitialRows(): string[];

function Example() {
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState(() => buildInitialRows()); // lazy initialiser: called once

  function handleClick() {
    setCount(count + 1); // "set it to this value"
    setCount((current) => current + 1); // "compute it from the latest value"
  }

  return <button onClick={handleClick}>{count} / {rows.length}</button>;
}
`),
        list(
          "**The initial value is only used on the first render.** `useState(buildInitialRows())` still calls the function on every render and throws the result away. Pass the function itself to run it once.",
          "**Setting replaces; it does not merge.** Unlike `this.setState` in classes, an object must be spread: `setForm({ ...form, name })`.",
          "**Same value, no render.** If the new value is identical by `Object.is`, React skips the update. That is why mutating an object and setting it again does nothing.",
          "**The setter is stable.** Its identity never changes, so it is safe to omit from dependency arrays and to pass to memoised children.",
          "**Updates are batched.** Several setter calls in one event produce one re-render.",
        ),
        say(
          "State behaves like a snapshot. Every render gets its own copy of every state variable, and the handlers created in that render see that copy forever.",
        ),
      ],
      followUps: [
        {
          q: "One state object or several state variables?",
          a: "Separate variables for values that change independently; one object (or a reducer) for values that always change together. Avoid redundant or contradictory state: if it can be computed from other state, do not store it.",
        },
        {
          q: "When do you need the updater function form?",
          a: "Whenever the next state depends on the previous one and you cannot be sure the value in your closure is current: several updates in one handler, or updates from timers, subscriptions and async callbacks.",
        },
      ],
      docs: "https://react.dev/reference/react/useState",
    },
    {
      id: "hooks-setstate-batching",
      question: "What happens when you call a state setter three times in a row? Is setting state asynchronous?",
      level: "intermediate",
      short:
        "The setter does not change the variable; it queues an update and asks React to re-render. All updates queued during one event are batched into a single render. So three calls with `count + 1` all compute from the same snapshot and the result is one increment, not three.",
      body: [
        tsx(`
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
`),
        p(
          "After the first click the console logs `0`, the snapshot this handler closed over, and the button shows `1`: three requests to set the value to `0 + 1`.",
        ),
        tsx(
          `
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((current) => current + 1); // 0 -> 1
    setCount((current) => current + 1); // 1 -> 2
    setCount((current) => current + 1); // 2 -> 3
  }

  return <button onClick={handleClick}>{count}</button>; // shows 3 after one click
}
`,
          { caption: "With updater functions", tone: "good" },
        ),
        steps(
          "The update is added to a queue on that component.",
          "React schedules a render. Updates from the same event are batched together.",
          "During the render, React runs the queue in order to compute the new state, then calls the component.",
          "It diffs the result against the previous tree and commits the changes to the DOM.",
          "Layout effects run, the browser paints, then effects run.",
        ),
        trap(
          "'Asynchronous' is a misleading word here. The setter returns nothing you can await. The value in the current render will never change no matter how long you wait, because it belongs to that render. The new value exists only in the next one.",
        ),
      ],
      followUps: [
        {
          q: "What changed with batching in React 18?",
          a: "Batching became automatic everywhere: in timeouts, promises and native event handlers, not just React event handlers. Before 18, two setters inside a `setTimeout` caused two renders.",
        },
        {
          q: "How do you run code after the state has been applied?",
          a: "If it needs the new value, compute that value into a local variable first and use it for both the setter and your logic. If it needs the updated DOM, use an effect that depends on the state. For the rare case where you need the DOM updated synchronously inside a handler, `flushSync` forces it.",
        },
      ],
      docs: "https://react.dev/learn/queueing-a-series-of-state-updates",
    },
    {
      id: "hooks-useeffect",
      question: "What is `useEffect` for, and how do the dependency array and cleanup work?",
      level: "junior",
      short:
        "`useEffect` synchronises a component with something outside React: a subscription, a timer, the document title, a network connection. The function runs after the render is committed to the screen. The function it returns is the cleanup, which runs before the effect runs again and when the component unmounts.",
      body: [
        table(
          ["Dependencies", "When the effect runs"],
          ["Omitted", "After every render"],
          ["`[]`", "Once, after the first render (and cleanup on unmount)"],
          ["`[a, b]`", "After the first render, and after any render where `a` or `b` changed (`Object.is`)"],
        ),
        tsx(`
function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000); // setup
    return () => clearInterval(id); // cleanup
  }, []); // nothing from the component is read, so there is nothing to depend on

  return <time>{now.toLocaleTimeString()}</time>;
}

function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]); // re-synchronise whenever title changes

  return null;
}
`),
        list(
          "**The order on an update:** render, commit to the DOM, browser paints, cleanup of the previous effect (with the previous props and state), then the new effect.",
          "**Dependencies are not a choice.** Every reactive value the effect reads (props, state, anything derived from them) belongs in the array. If you want fewer dependencies, change the code so the effect reads less.",
          "**The effect function cannot be `async`.** It must return a cleanup function or nothing, not a promise. Declare an async function inside and call it.",
          "**Effects do not run on the server**, and children's effects run before their parent's.",
        ),
      ],
      followUps: [
        {
          q: "How do you run something when a component unmounts?",
          a: "Return a cleanup function from an effect. With an empty dependency array it runs only on unmount; with dependencies it also runs before each re-run.",
        },
        {
          q: "How do you react to a change in one field of an object?",
          a: "Depend on that field, not on the object: `[user.id]`. The object may be a new reference on every render even when the field has not changed.",
        },
        {
          q: "Is `useEffect(fn, [])` the same as `componentDidMount`?",
          a: "Close, but it is the wrong way to think about it. The effect says 'keep this in sync with nothing', which happens to mean once. In development under Strict Mode it runs twice, to check that your cleanup works.",
        },
      ],
      docs: "https://react.dev/reference/react/useEffect",
    },
    {
      id: "hooks-effect-loop",
      question: "Why does my effect run on every render, or loop forever?",
      level: "intermediate",
      short:
        "Because one of its dependencies is a new reference every render, or because the effect sets state that it also depends on. Objects, arrays and functions created during render are never equal to their previous versions, so React thinks they changed.",
      body: [
        tsx(
          `
interface Filters {
  category: string;
}
declare function search(options: Filters & { limit: number }): Promise<string[]>;

function Results({ filters }: { filters: Filters }) {
  const [data, setData] = useState<string[]>([]);

  const options = { ...filters, limit: 20 }; // a brand-new object on every render

  useEffect(() => {
    search(options).then(setData); // setData -> re-render -> new options -> effect runs again
  }, [options]);

  return <p>{data.length} results</p>;
}
`,
          { caption: "An infinite loop", tone: "bad" },
        ),
        tsx(
          `
interface Filters {
  category: string;
}
declare function search(options: Filters & { limit: number }): Promise<string[]>;

function Results({ filters }: { filters: Filters }) {
  const [data, setData] = useState<string[]>([]);
  const { category } = filters;

  useEffect(() => {
    const options = { category, limit: 20 }; // built inside: no longer a dependency
    search(options).then(setData);
  }, [category]); // a primitive compares by value

  return <p>{data.length} results</p>;
}
`,
          { caption: "Depend on primitives", tone: "good" },
        ),
        table(
          ["Cause", "Fix"],
          ["No dependency array, and the effect sets state", "Add the array"],
          ["An object or array dependency built during render", "Depend on its primitive fields, or build it inside the effect"],
          ["A function dependency defined in the component", "Move it inside the effect, or wrap it in `useCallback`"],
          ["The effect updates the state it reads", "Use an updater function (`setCount((c) => c + 1)`) so the state is not a dependency"],
          ["The effect only derives a value from props or state", "Delete the effect and compute the value during render"],
        ),
      ],
      followUps: [
        {
          q: "Can you just leave the dependency out and silence the linter?",
          a: "You can, and you will ship a stale-closure bug: the effect keeps using values from the render in which it last ran. A suppressed `exhaustive-deps` warning is almost always a real defect waiting for the right sequence of events.",
        },
      ],
      docs: "https://react.dev/learn/removing-effect-dependencies",
    },
    {
      id: "hooks-effect-vs-layout",
      question: "What is the difference between `useEffect` and `useLayoutEffect`?",
      level: "intermediate",
      short:
        "Timing. `useEffect` runs after the browser has painted, so it does not block the screen from updating. `useLayoutEffect` runs synchronously after React has updated the DOM but before the browser paints, so anything it changes is included in the first paint. Use it only when you must measure the DOM and adjust before the user sees a flicker.",
      body: [
        steps(
          "React renders and commits changes to the DOM.",
          "`useLayoutEffect` callbacks run. The DOM is updated but nothing is on screen yet.",
          "The browser paints.",
          "`useEffect` callbacks run.",
        ),
        tsx(`
function Tooltip({ anchorTop, children }: { anchorTop: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Measured and corrected before the browser paints: the tooltip never
    // appears in the wrong place. With useEffect it would flash there first.
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, [children]);

  return (
    <div ref={ref} style={{ position: "absolute", top: anchorTop - height }}>
      {children}
    </div>
  );
}
`),
        table(
          ["", "`useEffect`", "`useLayoutEffect`"],
          ["Runs", "After paint", "Before paint, synchronously"],
          ["Blocks the screen", "No", "Yes"],
          ["Use for", "Fetching, subscriptions, logging, most things", "Measuring layout, positioning, restoring scroll"],
        ),
        trap(
          "Because it blocks painting, slow code in a layout effect makes the whole UI feel sluggish. Default to `useEffect` and switch only when you can see the flicker you are fixing.",
        ),
      ],
      followUps: [
        {
          q: "What is `useInsertionEffect`?",
          a: "An even earlier hook that fires before layout effects, meant for CSS-in-JS libraries to inject style tags before anything reads layout. Application code should not need it.",
        },
        {
          q: "What about server rendering?",
          a: "Neither kind of effect runs on the server. A component that depends on a layout effect to look right will render its unmeasured state in the server HTML, so render that part on the client only or give it a sensible fallback.",
        },
      ],
      docs: "https://react.dev/reference/react/useLayoutEffect",
    },
    {
      id: "hooks-stale-closure",
      question: "What is a stale closure in a hook, and how do you fix it?",
      level: "intermediate",
      short:
        "Every render creates new functions that close over that render's props and state. A stale closure is a function from an old render that is still running, in a timer, subscription or memoised callback, and still sees the old values. It happens when a dependency array claims the function needs nothing that it actually reads.",
      body: [
        tsx(
          `
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // count is 0 here, forever: this closure is from the first render
    }, 1000);
    return () => clearInterval(id);
  }, []); // the lie: the effect reads count but does not list it

  return <p>{count}</p>; // goes to 1 and stays there
}
`,
          { caption: "The bug", tone: "bad" },
        ),
        tsx(
          `
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((current) => current + 1); // asks React for the latest value; reads nothing stale
    }, 1000);
    return () => clearInterval(id);
  }, []); // now true: the effect depends on nothing

  return <p>{count}</p>;
}
`,
          { caption: "The fix", tone: "good" },
        ),
        table(
          ["Fix", "When it fits"],
          ["Updater function", "The stale value is the state you are setting"],
          ["Add the dependency", "Re-running the effect when it changes is acceptable"],
          ["A ref holding the latest value", "You need the current value without re-subscribing"],
          ["`useEffectEvent` (React 19.2)", "The effect should react to some values but only read others"],
        ),
        tsx(
          `
declare function createConnection(roomId: string): {
  connect(): void;
  disconnect(): void;
  on(event: "connected", listener: () => void): void;
};
declare function notify(message: string, theme: string): void;

function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  // Always sees the latest theme, without being a dependency of the effect.
  const onConnected = useEffectEvent(() => notify("Connected", theme));

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // changing the theme does not tear down the connection

  return <h1>Room {roomId}</h1>;
}
`,
          { caption: "Reading a value without reacting to it" },
        ),
      ],
      followUps: [
        {
          q: "A click handler starts a 3-second timeout that alerts `count`. You click it, then increment twice. What does it show?",
          a: "The value from when you clicked. The handler belongs to the render in which it was created and closed over that render's `count`. That is the same mechanism, working as intended.",
        },
        {
          q: "How does `useCallback` cause this?",
          a: "`useCallback(fn, [])` keeps the first render's function forever. If `fn` reads state, it reads the first render's state. The dependency array must list everything the function uses.",
        },
      ],
      docs: "https://react.dev/learn/separating-events-from-effects",
    },
    {
      id: "hooks-no-effect",
      question: "What is wrong with this component? (An effect that computes state from props.)",
      level: "intermediate",
      short:
        "The filtered list is derived data, and it is being stored in state and kept in sync with an effect. That costs an extra render with stale results on every change, and gives two sources of truth that can disagree. Compute it during render instead.",
      body: [
        tsx(
          `
interface Item {
  id: string;
  name: string;
}

function SearchList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);

  useEffect(() => {
    setResults(items.filter((item) => item.name.includes(query)));
  }, [items, query]);

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
`,
          { caption: "As often written", tone: "bad" },
        ),
        tsx(
          `
interface Item {
  id: string;
  name: string;
}

function SearchList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const results = items.filter((item) => item.name.includes(query)); // derived, always in sync

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
`,
          { caption: "Derive it", tone: "good" },
        ),
        table(
          ["You want to", "Instead of an effect"],
          ["Transform data for display", "Compute it during render (`useMemo` if it is measurably slow)"],
          ["Respond to a user action", "Do it in the event handler that caused it"],
          ["Reset all state when a prop changes", "Give the component a `key`"],
          ["Tell the parent that state changed", "Call the parent's callback in the same handler, or lift the state"],
          ["Run a chain of state updates", "Compute the final state in one handler or a reducer"],
          ["Fetch data", "A data library or the framework; if you must use an effect, handle the race"],
        ),
        say(
          "Effects are for synchronising with systems outside React. If nothing external is involved, I probably do not need one.",
        ),
      ],
      followUps: [
        {
          q: "When is an effect the right tool?",
          a: "Subscriptions, timers, manual DOM work, analytics that should fire because the component was shown, and connecting to anything that is not React: a WebSocket, a map widget, the browser's media APIs.",
        },
      ],
      docs: "https://react.dev/learn/you-might-not-need-an-effect",
    },
    {
      id: "hooks-fetch-in-effect",
      question: "How do you fetch data in an effect correctly? What are the pitfalls?",
      level: "intermediate",
      short:
        "Fetch inside the effect, depend on the inputs of the request, and use the cleanup to cancel or ignore a response that is no longer wanted. Without that cleanup you have a race condition: a slow response for a previous input can arrive last and overwrite the current one.",
      body: [
        tsx(`
interface User {
  id: string;
  name: string;
}

type State =
  | { status: "loading" }
  | { status: "success"; user: User }
  | { status: "error"; error: Error };

function UserProfile({ userId }: { userId: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    fetch("/api/users/" + userId, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed with " + res.status); // fetch resolves on 404 and 500
        return res.json() as Promise<User>;
      })
      .then((user) => setState({ status: "success", user }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return; // superseded or unmounted: not an error
        setState({ status: "error", error: error instanceof Error ? error : new Error(String(error)) });
      });

    return () => controller.abort(); // runs when userId changes and on unmount
  }, [userId]);

  if (state.status === "loading") return <p>Loading</p>;
  if (state.status === "error") return <p role="alert">{state.error.message}</p>;
  return <h1>{state.user.name}</h1>;
}
`),
        list(
          "**Race conditions.** `userId` goes 1 then 2; the response for 1 arrives after the response for 2. Without the abort, the screen shows user 1 under a URL for user 2.",
          "**Unchecked status.** `fetch` only rejects on network failure. A 500 is a successful promise.",
          "**Missing states.** Every request has loading, error, empty and success. Each needs a UI.",
          "**No caching.** Every mount refetches; two components asking for the same data make two requests.",
          "**Waterfalls.** A parent fetches, renders, and only then a child starts its own fetch.",
          "**No server rendering.** Effects do not run on the server, so the HTML arrives empty.",
        ),
        say(
          "I can write this by hand, and in production I would not. TanStack Query, SWR or RTK Query handle cancellation, caching, deduplication, retries and revalidation; a framework can fetch on the server so the data is in the first HTML.",
        ),
      ],
      followUps: [
        {
          q: "What if the API cannot be aborted?",
          a: "Use an `ignore` flag: set `let ignore = false` in the effect, check it before calling the setter, and set it to `true` in the cleanup. The request still completes; its result is discarded.",
        },
        {
          q: "Where should a request go in a class component?",
          a: "`componentDidMount`, and again in `componentDidUpdate` when the relevant prop changed, with the same care about stale responses.",
        },
      ],
      docs: "https://react.dev/learn/synchronizing-with-effects#fetching-data",
    },
    {
      id: "hooks-useref-vs-state",
      question: "`useRef` or `useState`? What is a ref good for besides the DOM?",
      level: "intermediate",
      short:
        "Both persist a value across renders. Changing state triggers a re-render; changing a ref does not. So state is for anything the screen depends on, and a ref is for bookkeeping that the render output never reads: timer IDs, the previous value, an 'is this the first run' flag, the latest version of a callback.",
      body: [
        table(
          ["", "`useState`", "`useRef`"],
          ["Changing it re-renders", "Yes", "No"],
          ["Update is visible", "In the next render", "Immediately, on `ref.current`"],
          ["Read during render", "Yes", "Avoid: render should not depend on it"],
          ["Mutable", "No, replace it", "Yes"],
        ),
        tsx(`
function Stopwatch() {
  const [elapsed, setElapsed] = useState(0); // shown on screen: state
  const intervalRef = useRef<number | undefined>(undefined); // never shown: ref

  function start() {
    if (intervalRef.current !== undefined) return; // already running
    const startedAt = Date.now() - elapsed;
    intervalRef.current = window.setInterval(() => setElapsed(Date.now() - startedAt), 100);
  }

  function stop() {
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }

  useEffect(() => () => window.clearInterval(intervalRef.current), []); // clear it on unmount

  return (
    <>
      <output>{(elapsed / 1000).toFixed(1)}s</output>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
`),
        p("The classic small exercise is `usePrevious`, a ref updated after each render:"),
        tsx(`
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value; // runs after the render, so during render it still holds the old value
  }, [value]);

  return ref.current;
}
`),
        trap(
          "If you find yourself changing a ref and wondering why the screen did not update, it should have been state. And reading `ref.current` while rendering makes the output depend on something React cannot track, which is why the linter and the React Compiler flag it.",
        ),
      ],
      followUps: [
        {
          q: "How do you skip an effect on the first render?",
          a: "Keep a ref `isFirstRun`, initialised to `true`; in the effect, if it is true, set it to false and return. It is worth asking whether the logic belongs in an event handler instead, since 'on update but not on mount' usually means 'when the user did something'.",
        },
        {
          q: "Why not a module-level variable?",
          a: "A module variable is shared by every instance of the component, and between requests on the server. A ref belongs to one mounted instance.",
        },
      ],
      docs: "https://react.dev/learn/referencing-values-with-refs",
    },
    {
      id: "hooks-memo-callback",
      question: "What is the difference between `useMemo`, `useCallback` and `React.memo`?",
      level: "intermediate",
      short:
        "`useMemo` caches the result of a calculation between renders. `useCallback` caches a function's identity between renders. `React.memo` wraps a component so it skips re-rendering when its props are shallowly equal. The first two are mostly useful because of the third: they keep props stable so a memoised child can actually skip.",
      body: [
        table(
          ["", "Caches", "Use when"],
          ["`useMemo(fn, deps)`", "The value returned by `fn`", "The calculation is expensive, or the result is passed to a memoised child or used as a dependency"],
          ["`useCallback(fn, deps)`", "`fn` itself", "The function is passed to a memoised child or used as a dependency"],
          ["`memo(Component)`", "The component's rendered output", "It re-renders often with the same props and rendering it is slow"],
        ),
        tsx(`
interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductTable = memo(function ProductTable({
  rows,
  onSelect,
}: {
  rows: Product[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id} onClick={() => onSelect(row.id)}>
          {row.name}
        </li>
      ))}
    </ul>
  );
});

function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  const rows = useMemo(
    () => products.filter((product) => product.name.includes(query)).sort((a, b) => a.price - b.price),
    [products, query],
  );
  const handleSelect = useCallback((id: string) => setSelected(id), []);

  return (
    <div className={dark ? "dark" : "light"}>
      <button onClick={() => setDark(!dark)}>Toggle theme ({selected ?? "none"})</button>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      {/* Toggling the theme re-renders Catalog, but rows and handleSelect keep
          their identity, so the memoised table skips. */}
      <ProductTable rows={rows} onSelect={handleSelect} />
    </div>
  );
}
`),
        list(
          "`useCallback(fn, deps)` is exactly `useMemo(() => fn, deps)`.",
          "Memoisation is not free: it costs memory, a dependency comparison on every render, and readability. An incorrect dependency array turns it into a stale-value bug.",
          "`useCallback` on a function passed to a non-memoised child does nothing useful. The child re-renders anyway.",
          "The React Compiler inserts this memoisation automatically at build time. In a codebase that uses it, manual `useMemo` and `useCallback` are mostly unnecessary.",
        ),
        say(
          "I do not memoise by default. I measure with the Profiler, and before reaching for `memo` I try the structural fixes: move state down, or pass the expensive part as `children`.",
        ),
      ],
      followUps: [
        {
          q: "A component wrapped in `memo` still re-renders. Why?",
          a: "A prop is a new reference each time (an inline object, array, arrow function or JSX `children`), or the component reads a context that changed, or its own state changed. `memo` only compares props, and only shallowly.",
        },
        {
          q: "Is `useMemo` a guarantee?",
          a: "No, it is a performance hint. React may discard the cache, so the code must still be correct if the function runs again. Never rely on it for behaviour, such as running a side effect once.",
        },
      ],
      docs: "https://react.dev/reference/react/useMemo",
    },
    {
      id: "hooks-usereducer",
      question: "What is `useReducer`, and when would you use it instead of `useState`?",
      level: "intermediate",
      short:
        "`useReducer` moves state logic out of event handlers into one pure function, `(state, action) => newState`. Components dispatch actions describing what happened, and the reducer decides how state changes. Reach for it when several values change together, when the next state depends on the previous in non-trivial ways, or when many handlers update the same state.",
      body: [
        tsx(`
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartAction =
  | { type: "added"; item: Omit<CartItem, "quantity"> }
  | { type: "removed"; id: string }
  | { type: "quantityChanged"; id: string; quantity: number }
  | { type: "cleared" };

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "added": {
      const existing = items.find((item) => item.id === action.item.id);
      if (!existing) return [...items, { ...action.item, quantity: 1 }];
      return items.map((item) =>
        item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }
    case "removed":
      return items.filter((item) => item.id !== action.id);
    case "quantityChanged":
      return items.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item,
      );
    case "cleared":
      return [];
  }
}

function Cart() {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button onClick={() => dispatch({ type: "added", item: { id: "p1", name: "Keyboard", price: 80 } })}>
        Add keyboard
      </button>
      <button onClick={() => dispatch({ type: "cleared" })}>Clear</button>
      <p>Total: {total}</p>
    </>
  );
}
`),
        table(
          ["", "`useState`", "`useReducer`"],
          ["Best for", "Independent, simple values", "Related values with rules about how they change"],
          ["Update logic lives", "In each event handler", "In one function"],
          ["Testing", "Through the component", "The reducer is a pure function: call it and assert"],
          ["Passing updates down", "One callback per operation", "One stable `dispatch`"],
        ),
        list(
          "A reducer must be pure: no mutation, no requests, no timers. Same inputs, same output.",
          "Name actions after what happened (`\"added\"`, `\"submitted\"`), not after the setter you would have called.",
        ),
      ],
      followUps: [
        {
          q: "How is this different from Redux?",
          a: "Same idea, smaller scope. `useReducer` state belongs to one component and dies with it; there is no store, middleware, devtools or selector subscription. Combined with context it can serve a subtree, at the cost of re-rendering every consumer on each change.",
        },
        {
          q: "Is `dispatch` stable?",
          a: "Yes, like state setters. That makes it a good thing to pass through context: consumers that only dispatch never need to re-render.",
        },
      ],
      docs: "https://react.dev/reference/react/useReducer",
    },
    {
      id: "hooks-context",
      question: "What is the Context API, and what are its pitfalls?",
      level: "intermediate",
      short:
        "Context makes a value available to every component below a provider without passing it through props at each level. Any descendant can read it with `useContext`. The catch: when the value changes, every component that reads that context re-renders, and there is no way to subscribe to part of it.",
      body: [
        tsx(`
type Theme = "light" | "dark";

const ThemeContext = createContext<Theme>("light"); // the default is used only with no provider above

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext value={theme}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle</button>
      <Toolbar />
    </ThemeContext>
  );
}

function Toolbar() {
  return <ThemedButton />; // knows nothing about the theme
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={"btn-" + theme}>Save</button>;
}
`),
        list(
          "**Good for** values that many components need and that change rarely: theme, locale, the signed-in user, feature flags, a store or client instance.",
          "**Poor for** state that changes often (the text of an input, a mouse position, a large frequently-updated object), because every consumer re-renders on each change.",
        ),
        tsx(
          `
interface User {
  name: string;
}
const AuthContext = createContext<{ user: User | null; signOut: () => void } | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Without useMemo, this object is new on every render of AuthProvider, and every
  // consumer re-renders even though user has not changed.
  const value = useMemo(() => ({ user, signOut: () => setUser(null) }), [user]);

  return <AuthContext value={value}>{children}</AuthContext>;
}
`,
          { caption: "The most common mistake, and its fix" },
        ),
        table(
          ["Pitfall", "Mitigation"],
          ["A new object as `value` every render", "Memoise the value"],
          ["One large context that changes for many reasons", "Split by concern: separate contexts for state and for `dispatch`, or for user and theme"],
          ["Consumers re-render for fields they do not use", "Split further, or use a store with selectors (Zustand, Redux, Jotai)"],
          ["`memo` does not stop context updates", "It only compares props; move the context read into a smaller child"],
          ["Hidden dependencies", "Expose the context through a custom hook that throws without a provider"],
        ),
        say(
          "Context is a way to transport a value, not a state manager. The state still lives in a `useState` or `useReducer` somewhere; context only saves you the prop drilling.",
        ),
      ],
      followUps: [
        {
          q: "What is the difference between `<ThemeContext value>` and `<ThemeContext.Provider value>`?",
          a: "They do the same thing. React 19 lets you render the context object directly as the provider; `.Provider` is the form from earlier versions.",
        },
        {
          q: "Should you reach for context as soon as you see prop drilling?",
          a: "Try composition first. Often the intermediate components do not need to know about the data at all if the parent passes the finished element down as `children` or as a prop.",
        },
      ],
      docs: "https://react.dev/learn/passing-data-deeply-with-context",
    },
    {
      id: "hooks-custom",
      question: "What is a custom hook? Write one.",
      level: "junior",
      short:
        "A custom hook is a function whose name starts with `use` and that calls other hooks. It extracts stateful logic so several components can share it. It shares the logic, not the state: each component that calls the hook gets its own independent state.",
      body: [
        tsx(`
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id); // a newer value cancels the pending update
  }, [value, delayMs]);

  return debounced;
}

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    if (debouncedQuery === "") return;
    const controller = new AbortController();
    fetch("/api/search?q=" + encodeURIComponent(debouncedQuery), { signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, [debouncedQuery]); // one request per pause in typing, not one per keystroke

  return <input value={query} onChange={(event) => setQuery(event.target.value)} />;
}
`),
        list(
          "The name must start with `use`, so the linter can apply the Rules of Hooks to it and to its callers.",
          "It can take any arguments and return anything: a value, a tuple, an object of values and functions.",
          "It follows the same rules as components: top-level calls only, same order every render.",
          "A function that calls no hooks is a plain utility. Do not give it a `use` name.",
        ),
        p(
          "Hooks worth being able to write from memory: `useToggle`, `useDebouncedValue`, `usePrevious`, `useLocalStorage`, `useMediaQuery`, `useOnClickOutside`, `useEventListener`, `useInterval`, `useFetch`.",
        ),
      ],
      followUps: [
        {
          q: "Two components call the same custom hook. Do they share state?",
          a: "No. Each call creates its own state and effects. To share the actual state, lift it up and pass it down, put it in context, or use an external store.",
        },
        {
          q: "When do you extract one?",
          a: "When the same effect-and-state combination appears in a second component, or when a component's intent is buried under plumbing and a name such as `useOnlineStatus()` would make it readable.",
        },
        {
          q: "How do you test a custom hook?",
          a: "With `renderHook` from React Testing Library, wrapping state changes in `act`. Often it is better to test a small component that uses it, since that is how it runs for real.",
        },
      ],
      docs: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    },
    {
      id: "hooks-useid",
      question: "What is `useId` for?",
      level: "intermediate",
      short:
        "It generates a unique ID that is stable across the server render and the client hydration. Its job is wiring up accessibility attributes: `htmlFor` with `id`, `aria-describedby`, `aria-labelledby`. It is not for list keys.",
      body: [
        tsx(`
function PasswordField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Password</label>
      <input id={id} type="password" aria-describedby={id + "-hint"} />
      <p id={id + "-hint"}>At least 12 characters.</p>
    </div>
  );
}
`),
        list(
          "A hard-coded `id=\"password\"` breaks as soon as the component is rendered twice on one page.",
          "A counter or `Math.random()` produces different values on the server and the client, which is a hydration mismatch.",
          "One `useId` call can serve several related elements: add a suffix.",
        ),
        trap(
          "Do not use it as a `key`. Keys must come from your data so they identify the item, not the position in the render.",
        ),
      ],
      docs: "https://react.dev/reference/react/useId",
    },
    {
      id: "hooks-transition-deferred",
      question: "What do `useTransition` and `useDeferredValue` do, and how do they differ?",
      level: "senior",
      short:
        "Both mark an update as non-urgent, so React can keep the interface responsive: it renders the low-priority update in the background and abandons it if something more urgent, like a keystroke, comes in. `useTransition` wraps the code that sets the state. `useDeferredValue` wraps a value you receive and gives you a copy that lags behind.",
      body: [
        tsx(`
declare const SlowList: (props: { query: string }) => ReactNode; // wrapped in memo, renders thousands of rows

function FilterWithDeferredValue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <>
      {/* Urgent: the input updates on every keystroke. */}
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      {/* Not urgent: the list re-renders with the lagging value, and can be interrupted. */}
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <SlowList query={deferredQuery} />
      </div>
    </>
  );
}

function TabsWithTransition() {
  const [tab, setTab] = useState("overview");
  const [isPending, startTransition] = useTransition();

  function select(next: string) {
    startTransition(() => setTab(next)); // the current tab stays interactive while the next one renders
  }

  return (
    <>
      <button onClick={() => select("reports")} disabled={isPending}>
        Reports
      </button>
      <SlowList query={tab} />
    </>
  );
}
`),
        table(
          ["", "`useTransition`", "`useDeferredValue`"],
          ["You control", "The state update", "Only the value (a prop, or state set elsewhere)"],
          ["Gives you", "`isPending` and `startTransition`", "A deferred copy of the value"],
          ["Typical use", "Navigation, tab switches, form submissions", "Filtering or charting as the user types"],
        ),
        list(
          "Neither is a debounce. There is no fixed delay: the work starts immediately and yields to urgent updates. On a fast device there is no visible lag at all.",
          "They help with slow rendering, not slow networks. To cut the number of requests, you still debounce.",
          "With Suspense, a transition keeps the already-visible content on screen instead of replacing it with a fallback while the next screen loads.",
          "The value of a controlled input cannot be set in a transition; typing must stay synchronous.",
        ),
      ],
      followUps: [
        {
          q: "Why does the slow child need to be memoised for `useDeferredValue` to help?",
          a: "When `query` changes, the parent re-renders urgently with the old deferred value. If the child is not memoised it re-renders right then, on the urgent path, which is exactly the work you were trying to defer.",
        },
        {
          q: "What changed for transitions in React 19?",
          a: "`startTransition` accepts async functions. Those are Actions: React tracks the pending state across the `await`, and errors thrown inside go to the nearest error boundary.",
        },
      ],
      docs: "https://react.dev/reference/react/useTransition",
    },
    {
      id: "hooks-lesser-known",
      question: "Which hooks do you rarely need, and what are they for?",
      level: "senior",
      short:
        "`useSyncExternalStore` subscribes to state that lives outside React. `useImperativeHandle` customises what a ref exposes. `useInsertionEffect` is for CSS-in-JS libraries. `useDebugValue` labels custom hooks in DevTools. `useEffectEvent` reads the latest props and state from inside an effect without making the effect depend on them.",
      body: [
        tsx(`
function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // the value on the client
    () => true, // the value during server rendering and hydration
  );
}

function StatusBadge() {
  const online = useOnlineStatus();
  return <span>{online ? "Online" : "Offline"}</span>;
}
`),
        table(
          ["Hook", "Use it when"],
          ["`useSyncExternalStore`", "Reading a browser API or a third-party store; it is what Redux and Zustand use internally"],
          ["`useImperativeHandle`", "A parent needs methods (`focus`, `scrollTo`) rather than your raw DOM node"],
          ["`useInsertionEffect`", "You are writing a styling library that injects `<style>` tags"],
          ["`useDebugValue`", "You want a custom hook to show a readable label in React DevTools"],
          ["`useEffectEvent`", "An effect needs a current value but should not re-run when it changes"],
        ),
        p(
          "`useSyncExternalStore` exists because of concurrent rendering. React can pause a render halfway; if an external store changes during the pause, different components could render with different versions of the data, a glitch called tearing. The hook guarantees a consistent snapshot, and its third argument provides the value for the server so hydration matches.",
        ),
      ],
      followUps: [
        {
          q: "Why not subscribe in a `useEffect` and copy the value into state?",
          a: "It works, with rough edges: the first render shows a default and then flips, a change between render and effect can be missed, and it can tear under concurrent rendering. `useSyncExternalStore` handles all three.",
        },
      ],
      docs: "https://react.dev/reference/react/useSyncExternalStore",
    },
  ],
};
