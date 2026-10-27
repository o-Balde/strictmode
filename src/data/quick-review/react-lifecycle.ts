import { list, p, say, table, trap, ts, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const REACT_LIFECYCLE: ReviewSection = {
  id: "react-lifecycle",
  topic: "react",
  title: "Lifecycle, classes and patterns",
  blurb: "How a component is born, updates and dies, in class and hook terms, plus the patterns built on top: boundaries, context and higher-order components.",
  questions: [
    {
      id: "lifecycle",
      question: "What are the different phases of the component lifecycle in React?",
      topics: ["react"],
      level: "intermediate",
      short:
        "**Mounting**: the component renders for the first time and its DOM is inserted; then effects run. **Updating**: new props, state or context cause a re-render; React commits the changes, then runs the cleanup and setup of effects whose dependencies changed. **Unmounting**: the component is removed and every effect cleans up. Class components add an **error handling** phase for boundaries.",
      body: [
        tsx(`
function Clock({ timezone }: { timezone: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Mount, and every time \`timezone\` changes: set up.
    const id = setInterval(() => setNow(new Date()), 1000);
    // Before the next setup, and on unmount: clean up.
    return () => clearInterval(id);
  }, [timezone]);

  return <time>{now.toLocaleTimeString("en-US", { timeZone: timezone })}</time>;
}
`),
        list(
          "**Render phase**: React calls your component to compute elements. It must be pure; React may call it more than once or discard the result.",
          "**Commit phase**: React applies the DOM changes, attaches refs, then runs `useLayoutEffect` (before paint) and later `useEffect` (after paint).",
          "With hooks, think in **synchronisation** rather than lifecycle events: an effect keeps something in sync with its dependencies, starting and stopping as they change.",
          "In development, StrictMode mounts, unmounts and remounts every component once, to prove the cleanup undoes the setup.",
        ),
      ],
      demo: { id: "lifecycle-log", hint: "Mount, update and unmount the child and read the order of renders, effects and cleanups." },
      goodToHear: ["Mounting, updating, unmounting (+ error handling)", "Render vs commit phases", "Effects run after commit; cleanup before the next run", "Hooks: synchronisation, not events", "StrictMode double mount"],
      links: [{ title: "react.dev: Lifecycle of reactive effects", url: "https://react.dev/learn/lifecycle-of-reactive-effects" }],
    },
    {
      id: "lifecycle-methods",
      question: "What are the lifecycle methods in React?",
      topics: ["react"],
      level: "intermediate",
      short:
        "Methods React calls on a class component at each phase: `constructor`, `render`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, plus the less common `shouldComponentUpdate`, `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`, and for error boundaries `getDerivedStateFromError` and `componentDidCatch`. In function components, hooks cover the same ground.",
      body: [
        table(
          ["Class method", "When", "Hook equivalent"],
          ["`constructor`", "before the first render; set initial state", "`useState(initial)`"],
          ["`render`", "every render; must be pure", "the function body"],
          ["`componentDidMount`", "after the first commit", "`useEffect(fn, [])`"],
          ["`componentDidUpdate(prevProps, prevState)`", "after every update commit", "`useEffect(fn, [deps])`"],
          ["`componentWillUnmount`", "before removal", "the cleanup returned from `useEffect`"],
          ["`shouldComponentUpdate`", "before a re-render; return `false` to skip", "`memo(Component, areEqual)`"],
          ["`static getDerivedStateFromProps`", "before every render", "compute during render, or a `key` to reset"],
          ["`getSnapshotBeforeUpdate`", "just before DOM changes (read scroll position)", "`useLayoutEffect` (approximately)"],
          ["`getDerivedStateFromError` / `componentDidCatch`", "a child threw while rendering", "none: still a class (or a library)"],
        ),
        tsx(`
class Chat extends Component<{ roomId: string }> {
  componentDidMount() {
    console.log("connect", this.props.roomId);
  }
  componentDidUpdate(prevProps: { roomId: string }) {
    if (prevProps.roomId !== this.props.roomId) {
      console.log("disconnect", prevProps.roomId);
      console.log("connect", this.props.roomId);
    }
  }
  componentWillUnmount() {
    console.log("disconnect", this.props.roomId);
  }
  render() {
    return <h1>Room {this.props.roomId}</h1>;
  }
}
`),
        p("The class version spreads one concern (the connection) across three methods; the hook version keeps it in one `useEffect` with `[roomId]`. That is the main reason hooks replaced classes for new code."),
        trap("`componentWillMount`, `componentWillReceiveProps` and `componentWillUpdate` were renamed `UNSAFE_` in React 16.3 because they misbehave with async rendering. Don't use them in new code."),
      ],
      demo: { id: "lifecycle-log", hint: "The log names the class method that matches each hook event." },
      goodToHear: ["Mount, update, unmount methods", "`shouldComponentUpdate` for performance", "Error boundary methods", "Hook equivalents", "Legacy `UNSAFE_` methods"],
      links: [{ title: "react.dev: Component (class) reference", url: "https://react.dev/reference/react/Component" }],
    },
    {
      id: "callback-in-setstate",
      question: "What is the purpose of callback function as an argument of `setState`?",
      topics: ["react", "javascript"],
      level: "intermediate",
      short:
        "In a class component, `this.setState(update, callback)` runs `callback` after the state has been applied and the component has re-rendered. It exists because `setState` does not update `this.state` immediately: updates are batched. Function components have no such callback; you react to the new state in an effect, or simply use the value you just computed.",
      body: [
        tsx(`
class Search extends Component<{}, { query: string }> {
  state = { query: "" };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value }, () => {
      // Runs after the re-render: this.state.query is the new value here.
      console.log("searching for", this.state.query);
    });
    console.log("still the old value:", this.state.query);
  };

  render() {
    return <input value={this.state.query} onChange={this.handleChange} />;
  }
}
`),
        tsx(`
function SearchBox({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setQuery(next);
    onSearch(next); // use the value you already have, not \`query\`
  }

  return <input value={query} onChange={handleChange} />;
}
`, { caption: "With hooks: no callback needed" }),
        list(
          "When the next state depends on the previous one, pass an updater: `this.setState((s) => ({ count: s.count + 1 }))`, or `setCount((c) => c + 1)` with hooks.",
          "If something really must happen after the DOM updates (scroll to the new item), put it in `useEffect` (or `useLayoutEffect`) keyed on that state.",
        ),
      ],
      goodToHear: ["Runs after the update is committed", "`setState` is batched / asynchronous", "Updater function for derived updates", "Hooks: use the computed value or an effect"],
      links: [{ title: "react.dev: Component.setState", url: "https://react.dev/reference/react/Component#setstate" }],
    },
    {
      id: "methods-context-react-classes",
      question: "How do you ensure methods have the correct `this` context in React component classes?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "Class methods aren't bound to the instance, so `onClick={this.handleClick}` calls the method with `this` undefined. Fix it by binding in the constructor (`this.handleClick = this.handleClick.bind(this)`), by declaring the method as an arrow-function class field (`handleClick = () => {...}`, the usual choice), or by wrapping at the call site (`onClick={() => this.handleClick()}`).",
      body: [
        tsx(`
class Toggle extends Component<{}, { on: boolean }> {
  state = { on: false };

  constructor(props: {}) {
    super(props);
    this.handleBound = this.handleBound.bind(this);
  }

  handleBound() {
    this.setState((s) => ({ on: !s.on }));
  }

  handleField = () => {
    this.setState((s) => ({ on: !s.on }));
  };

  handleUnbound() {
    this.setState((s) => ({ on: !s.on })); // TypeError when passed as onClick={this.handleUnbound}
  }

  render() {
    return (
      <>
        <button onClick={this.handleBound}>bind in constructor</button>
        <button onClick={this.handleField}>class field arrow</button>
        <button onClick={() => this.handleUnbound()}>inline arrow</button>
      </>
    );
  }
}
`),
        list(
          "**Constructor `bind`**: one bound copy per instance; verbose.",
          "**Class field arrow**: one function per instance, `this` captured lexically; the common style.",
          "**Inline arrow**: a new function each render; fine unless passed to a memoized child.",
        ),
        say("This is a JavaScript `this` problem, not a React one, and function components sidestep it entirely: there is no `this`."),
      ],
      demo: { id: "this-binding", hint: "\"Detached method\" is exactly what passing `this.handleClick` as a prop does." },
      goodToHear: ["Methods are not auto-bound", "Bind in the constructor", "Class field arrow functions", "Inline arrows and their cost", "Function components avoid it"],
      links: [{ title: "react.dev: Component, defining class components", url: "https://react.dev/reference/react/Component#defining-a-class-component" }],
    },
    {
      id: "error-boundaries",
      question: "What are error boundaries in React?",
      topics: ["react"],
      level: "senior",
      short:
        "A class component that catches errors thrown while rendering any component below it, and shows a fallback UI instead of unmounting the whole app. It implements `static getDerivedStateFromError` (to switch to the fallback) and usually `componentDidCatch` (to log). It does not catch errors in event handlers, async code, server rendering or in itself.",
      body: [
        tsx(`
class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("render failed", error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <Dashboard />
    </ErrorBoundary>
  );
}
`),
        table(
          ["Thrown in", "Caught by a boundary?"],
          ["rendering, lifecycle methods, constructors of children", "yes"],
          ["`useEffect` / `useLayoutEffect` of children", "yes"],
          ["event handlers", "no: use `try/catch`, or set state that throws during the next render"],
          ["`setTimeout`, promises, other async code", "no"],
          ["the boundary itself", "no: the next boundary up catches it"],
        ),
        list(
          "Without any boundary, an uncaught render error unmounts the whole root.",
          "Place boundaries around independent areas (a widget, a route), so one failure doesn't blank the page.",
          "There is still no hook equivalent; the `react-error-boundary` package wraps the class and adds reset helpers. React 19 adds `onCaughtError` and `onUncaughtError` options to `createRoot` for reporting.",
        ),
      ],
      demo: { id: "error-boundary", hint: "Make the child throw during render, then from a click handler, and compare." },
      goodToHear: ["Catches render-time errors in children", "`getDerivedStateFromError` + `componentDidCatch`", "Not event handlers or async code", "Must be a class", "Granular placement"],
      links: [{ title: "react.dev: Catching rendering errors with an error boundary", url: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary" }],
    },
    {
      id: "context",
      question: "What is context?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "Context passes a value to every component below a provider without threading it through props at each level (prop drilling). Create it with `createContext(defaultValue)`, provide it with `<ThemeContext value={theme}>` (React 19; earlier `<ThemeContext.Provider>`), and read it with `useContext(ThemeContext)` or `use(ThemeContext)`. Every consumer re-renders when the provided value changes.",
      body: [
        tsx(`
type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  return (
    <ThemeContext value={theme}>
      <Toolbar />
      <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>Toggle</button>
    </ThemeContext>
  );
}

function Toolbar() {
  return <ThemedButton />; // passes nothing down
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={"button-" + theme}>Save</button>;
}
`),
        list(
          "**Good for** data many components need and that changes rarely: theme, locale, the signed-in user, a router, a store instance.",
          "**Not a state manager**: context only delivers a value. Pair it with `useState` or `useReducer` above it.",
          "**Re-renders**: React compares the provided value with `Object.is`. An inline object (`value={{ user, setUser }}`) is new every render and re-renders all consumers; memoize it, or split state and setters into two contexts.",
          "Without a provider above it, `useContext` returns the default value from `createContext`.",
        ),
        trap("Reaching for context to avoid passing a prop two levels down usually makes code harder to follow. Composition (passing `children`) often removes the drilling instead."),
      ],
      demo: { id: "context-renders", hint: "Change the context value and watch which components' render counters move." },
      goodToHear: ["Avoids prop drilling", "`createContext`, provider, `useContext`", "Default value without a provider", "All consumers re-render on change", "Memoize the value", "Not a state manager by itself"],
      links: [{ title: "react.dev: Passing data deeply with context", url: "https://react.dev/learn/passing-data-deeply-with-context" }],
    },
    {
      id: "hoc-component",
      question: "What are higher-order components?",
      topics: ["react"],
      level: "senior",
      short:
        "A higher-order component (HOC) is a function that takes a component and returns a new component that renders it with extra behaviour or props: `withRouter(Profile)`, Redux's `connect(...)(List)`, `withAuth(Page)`. It is the component version of a higher-order function. Custom hooks have replaced most HOCs, but they still appear in older code and some libraries.",
      body: [
        tsx(`
function withLogging<P extends object>(Wrapped: React.ComponentType<P>) {
  function WithLogging(props: P) {
    useEffect(() => {
      console.log((Wrapped.displayName ?? Wrapped.name) + " mounted");
    }, []);
    return <Wrapped {...props} />;
  }
  WithLogging.displayName = "withLogging(" + (Wrapped.displayName ?? Wrapped.name) + ")";
  return WithLogging;
}

function Profile({ name }: { name: string }) {
  return <h1>{name}</h1>;
}

const LoggedProfile = withLogging(Profile);
const page = <LoggedProfile name="Ada" />;
`),
        list(
          "**Create HOCs outside components**: calling `withLogging(Profile)` inside a render makes a new component type every time, which remounts the subtree and loses its state.",
          "**Pass all props through** and set a `displayName` so DevTools shows something readable.",
          "**Downsides**: \"wrapper hell\" in the tree, props colliding between layers, and static methods and refs that don't pass through automatically.",
          "**The hook equivalent** is usually simpler: `const user = useAuth()` instead of `withAuth(Page)`.",
        ),
      ],
      goodToHear: ["Function from component to component", "Reuses cross-cutting logic", "Examples: `connect`, `withRouter`", "Define outside render", "Mostly replaced by hooks"],
      links: [{ title: "legacy.reactjs.org: Higher-order components", url: "https://legacy.reactjs.org/docs/higher-order-components.html" }],
    },
    {
      id: "prop-validation",
      question: "How to apply prop validation in React?",
      topics: ["react"],
      level: "senior",
      short:
        "Today, with TypeScript: describe the props as a type, and the compiler checks every use of the component before the code runs. The old runtime approach, `Component.propTypes` with the `prop-types` package, logged warnings in development; React 19 removed those checks entirely, so `propTypes` are silently ignored. For data from outside the program (APIs, forms, URLs), validate at runtime with a schema library.",
      body: [
        tsx(`
interface UserCardProps {
  name: string;
  age?: number;
  role: "admin" | "member";
  onSelect: (name: string) => void;
}

function UserCard({ name, age = 0, role, onSelect }: UserCardProps) {
  return (
    <button onClick={() => onSelect(name)}>
      {name} ({role}){age > 0 ? ", " + age : ""}
    </button>
  );
}

const ok = <UserCard name="Ada" role="admin" onSelect={() => {}} />;
const wrong = <UserCard name="Ada" role="owner" onSelect={() => {}} />; // error
`),
        ts(`
import { z } from "zod";

const User = z.object({ name: z.string(), age: z.number().int().nonnegative() });
type User = z.infer<typeof User>;

async function loadUser(id: string): Promise<User> {
  const response = await fetch("/api/users/" + id);
  return User.parse(await response.json()); // throws if the server sends something else
}
`, { caption: "Runtime validation where the types can't reach: data from the network" }),
        list(
          "React 19 also ignores `defaultProps` on function components; use default parameter values, as above.",
          "TypeScript checks are erased at build time and cost nothing at runtime, but they cannot see inside `JSON.parse` or `response.json()`, which are `any`.",
        ),
        trap("Quoting `PropTypes.string.isRequired` as the answer in 2026 dates you. Mention it as history, then answer with TypeScript."),
      ],
      goodToHear: ["TypeScript prop types", "`propTypes` removed in React 19", "Default parameters instead of `defaultProps`", "Runtime validation for external data (zod, valibot)"],
      links: [
        { title: "react.dev: React 19 upgrade guide (propTypes removed)", url: "https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops" },
        { title: "react.dev: Using TypeScript", url: "https://react.dev/learn/typescript" },
      ],
    },
  ],
};
