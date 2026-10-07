import { list, p, say, steps, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_LEGACY: PrepSection = {
  id: "react-legacy",
  track: "react",
  title: "Class components and legacy APIs",
  blurb:
    "You will not write these in new code, but plenty of production codebases still contain them, and plenty of interviewers still ask. Know them well enough to read, maintain and migrate.",
  drill: "hooks",
  questions: [
    {
      id: "legacy-lifecycle",
      question: "What are the lifecycle methods of a class component, and in what order do they run?",
      level: "intermediate",
      short:
        "A class component goes through mounting, updating and unmounting. The three you use constantly are `componentDidMount` (set up), `componentDidUpdate` (react to changed props or state) and `componentWillUnmount` (clean up). The rest exist for optimisation and rare edge cases.",
      body: [
        table(
          ["Phase", "Methods, in order"],
          ["Mounting", "`constructor` → `static getDerivedStateFromProps` → `render` → `componentDidMount`"],
          ["Updating", "`static getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`"],
          ["Unmounting", "`componentWillUnmount`"],
          ["Error handling", "`static getDerivedStateFromError` → `componentDidCatch`"],
        ),
        tsx(`
import { Component } from "react";

interface User {
  id: string;
  name: string;
}
interface Props {
  userId: string;
}
interface State {
  user: User | null;
}

class UserProfile extends Component<Props, State> {
  state: State = { user: null };
  private controller: AbortController | null = null;

  componentDidMount() {
    this.load(); // the DOM exists: start requests and subscriptions here
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) this.load(); // always compare, or it loops forever
  }

  componentWillUnmount() {
    this.controller?.abort(); // cancel what is still in flight
  }

  private load() {
    this.controller?.abort();
    this.controller = new AbortController();

    fetch("/api/users/" + this.props.userId, { signal: this.controller.signal })
      .then((res) => res.json() as Promise<User>)
      .then((user) => this.setState({ user }))
      .catch(() => {});
  }

  render() {
    return <h1>{this.state.user?.name ?? "Loading"}</h1>;
  }
}
`),
        table(
          ["Method", "Purpose"],
          ["`shouldComponentUpdate(nextProps, nextState)`", "Return `false` to skip a re-render. `PureComponent` implements it as a shallow comparison."],
          ["`getDerivedStateFromProps(props, state)`", "Compute state from props before every render. Rarely the right tool."],
          ["`getSnapshotBeforeUpdate(prevProps, prevState)`", "Read the DOM just before it changes (a scroll position) and hand the value to `componentDidUpdate`."],
          ["`componentDidCatch(error, info)`", "Log an error thrown by a descendant. With `getDerivedStateFromError`, this makes an error boundary."],
        ),
        trap(
          "`componentWillMount`, `componentWillReceiveProps` and `componentWillUpdate` were deprecated in 16.3 because they run in the render phase, which can be invoked more than once. They survive only under an `UNSAFE_` prefix. If asked where to fetch data, the answer was always `componentDidMount`, never `componentWillMount`.",
        ),
      ],
      followUps: [
        {
          q: "How do these map to hooks?",
          a: "`componentDidMount`, `componentDidUpdate` and `componentWillUnmount` collapse into one `useEffect` with a cleanup and a dependency array. `shouldComponentUpdate` becomes `React.memo`. `getDerivedStateFromProps` becomes computing during render. The snapshot and error methods have no hook equivalent.",
        },
        {
          q: "Why is the constructor called only once?",
          a: "Because the instance is created once, on mount. Updates call `render` on the same instance. That is why state initialised from props in the constructor does not follow later prop changes.",
        },
      ],
      docs: "https://react.dev/reference/react/Component",
    },
    {
      id: "legacy-setstate",
      question: "How does `this.setState` work in a class? Why pass it a function?",
      level: "intermediate",
      short:
        "`setState` shallow-merges the object you give it into the current state and schedules a re-render. Updates are batched, so `this.state` is not updated immediately. When the next state depends on the previous one, pass a function, which receives the up-to-date state and props.",
      body: [
        tsx(`
import { Component } from "react";

class Counter extends Component<{ step: number }, { count: number; label: string }> {
  state = { count: 0, label: "Clicks" };

  addTwiceWrong = () => {
    // Both read the same this.state.count, so the result is +1.
    this.setState({ count: this.state.count + this.props.step });
    this.setState({ count: this.state.count + this.props.step });
  };

  addTwice = () => {
    // Each updater receives the result of the previous one: +2.
    this.setState((state, props) => ({ count: state.count + props.step }));
    this.setState((state, props) => ({ count: state.count + props.step }));
  };

  save = () => {
    // The optional second argument runs after the update has been applied and rendered.
    this.setState({ label: "Saved" }, () => console.log(this.state.label));
  };

  render() {
    // label is untouched by the count updates: setState merges.
    return (
      <button onClick={this.addTwice}>
        {this.state.label}: {this.state.count}
      </button>
    );
  }
}
`),
        table(
          ["", "Class `setState`", "`useState` setter"],
          ["Partial update", "Merged into the existing state (shallow)", "Replaces the value"],
          ["Updater function", "`(state, props) => partialState`", "`(previous) => next`"],
          ["After-update callback", "Second argument", "None; use an effect"],
          ["Same value", "Still re-renders (unless `PureComponent`)", "Bails out"],
        ),
        list(
          "Never assign `this.state.count = 1`. It changes the object without telling React, and a later `setState` may overwrite it. The only place to assign `this.state` is the constructor or a class field.",
          "The merge is shallow: `setState({ user: { name } })` replaces the whole `user` object.",
          "`forceUpdate()` re-renders without a state change. Needing it is a sign that something that should be state is not.",
        ),
      ],
      followUps: [
        {
          q: "What happens if you call `setState` in the constructor?",
          a: "Nothing useful: the component is not mounted yet, and React warns. Initialise `this.state` directly there.",
        },
        {
          q: "Why should you not call `setState` in `componentWillUnmount`?",
          a: "The component is about to be destroyed and will never render again, so the update is meaningless.",
        },
      ],
      docs: "https://react.dev/reference/react/Component#setstate",
    },
    {
      id: "legacy-this-binding",
      question: "Why did event handlers in class components need `.bind(this)`?",
      level: "junior",
      short:
        "Because a method loses its `this` when it is passed around as a plain function. `onClick={this.handleClick}` hands React the function without its object, and since class bodies run in strict mode, `this` inside it is `undefined` when React calls it.",
      body: [
        tsx(`
import { Component } from "react";

class Toggle extends Component<{ label: string }, { on: boolean }> {
  state = { on: false };

  constructor(props: { label: string }) {
    super(props); // must come first: 'this' does not exist until super() has run
    this.handleBound = this.handleBound.bind(this); // fix 1: bind once in the constructor
  }

  handleUnbound() {
    this.setState({ on: !this.state.on }); // TypeError when clicked: this is undefined
  }

  handleBound() {
    this.setState({ on: !this.state.on });
  }

  // Fix 2: a class field holding an arrow function. Arrows take 'this' from where
  // they are defined, which here is the instance.
  handleArrow = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <>
        <button onClick={this.handleUnbound}>Broken</button>
        <button onClick={this.handleBound}>Bound in constructor</button>
        <button onClick={this.handleArrow}>Class field arrow</button>
        {/* Fix 3: an inline arrow. Works, but creates a new function on every render. */}
        <button onClick={() => this.handleUnbound()}>Inline arrow</button>
      </>
    );
  }
}
`),
        list(
          "This is plain JavaScript behaviour, not a React rule: `const fn = obj.method; fn()` loses `this` anywhere.",
          "The class-field arrow became the standard fix, because it needs no constructor.",
          "Function components have no `this`, so the whole category of bug is gone. It is one of the reasons hooks were introduced.",
        ),
      ],
      followUps: [
        {
          q: "What is the difference between `super()` and `super(props)`?",
          a: "Both run the parent constructor. Passing `props` makes `this.props` available inside your own constructor. Without it, `this.props` is `undefined` until the constructor returns, although React assigns it afterwards.",
        },
        {
          q: "Is a constructor required?",
          a: "No. With class fields for state and arrow-function handlers, most class components never needed one.",
        },
      ],
      docs: "https://react.dev/reference/react/Component#constructor",
    },
    {
      id: "legacy-removed-apis",
      question: "Which old React APIs are deprecated or removed, and what replaces them?",
      level: "intermediate",
      short:
        "React 18 replaced the root API, and React 19 removed most of what had been deprecated for years: `ReactDOM.render`, string refs, `findDOMNode`, legacy context, and `propTypes` and `defaultProps` on function components. Each has a direct modern equivalent.",
      body: [
        table(
          ["Old", "Status", "Use instead"],
          ["`ReactDOM.render(<App />, el)`", "Removed in 19", "`createRoot(el).render(<App />)`"],
          ["`ReactDOM.hydrate`", "Removed in 19", "`hydrateRoot(el, <App />)`"],
          ["`unmountComponentAtNode(el)`", "Removed in 19", "`root.unmount()`"],
          ["`ReactDOM.findDOMNode(this)`", "Removed in 19", "A ref on the element"],
          ["String refs (`ref=\"input\"`)", "Removed in 19", "`useRef` or a callback ref"],
          ["`propTypes` on function components", "Ignored in 19", "TypeScript"],
          ["`defaultProps` on function components", "Removed in 19", "Default parameter values"],
          ["Legacy context (`contextTypes`, `getChildContext`)", "Removed in 19", "`createContext`"],
          ["`forwardRef`", "Unnecessary in 19, to be deprecated", "`ref` as a normal prop"],
          ["`<Context.Provider>`", "Still works", "`<Context>` directly"],
          ["`componentWillMount` and friends", "`UNSAFE_` only", "`componentDidMount` or effects"],
          ["Mixins, `createReactClass`", "Long gone", "Hooks"],
          ["Event pooling, `event.persist()`", "Removed in 17", "Nothing needed"],
          ["`react-test-renderer`, Enzyme shallow rendering", "Deprecated", "React Testing Library"],
          ["Create React App", "Deprecated in 2025", "A framework, or Vite"],
        ),
        say(
          "For an upgrade I go to the last 18 release first and fix every warning under Strict Mode, because 19 removes exactly what 18 warns about. Then I run the codemods and update the type packages.",
        ),
      ],
      followUps: [
        {
          q: "Why were string refs removed?",
          a: "They were tied to the component that happened to be rendering, which broke with render props and composition, could not be statically analysed, and forced React to track the current owner. Object and callback refs have none of those problems.",
        },
        {
          q: "What were mixins, and why did React abandon them?",
          a: "A way to merge shared methods into `createReactClass` components. They created implicit dependencies and name clashes, and did not work with ES classes. Higher-order components replaced them, and hooks replaced those.",
        },
      ],
      docs: "https://react.dev/blog/2024/04/25/react-19-upgrade-guide",
    },
    {
      id: "legacy-class-to-hooks",
      question: "How would you convert a class component to a function component with hooks?",
      level: "intermediate",
      short:
        "Mechanically at first: state becomes `useState` or `useReducer`, instance fields become refs, lifecycle methods become effects grouped by what they synchronise, and `this` disappears. Then go back over it, because a faithful translation of lifecycle code usually reveals effects you do not need.",
      body: [
        steps(
          "**Make sure it is covered by tests** that exercise behaviour, so you can tell if you broke it.",
          "**State.** One `useState` per independent value, or `useReducer` if they change together. Remember that the setter replaces where `setState` merged.",
          "**Instance fields** (`this.timer`, `this.controller`) become `useRef`.",
          "**Lifecycle.** Do not translate method by method. Group by concern: the subscribe in `componentDidMount` and the unsubscribe in `componentWillUnmount` are one effect.",
          "**`componentDidUpdate` comparisons** (`prevProps.id !== this.props.id`) become the effect's dependency array.",
          "**Derived state.** Anything computed in `getDerivedStateFromProps` or synced in `componentDidUpdate` is usually just a calculation during render.",
          "**Handlers** become plain functions. No binding.",
          "**Leave error boundaries as classes.** There is no hook for them.",
        ),
        tsx(
          `
import { Component } from "react";

class ProfileClass extends Component<{ user: string }> {
  handleClick = () => {
    // 'this' is mutable: three seconds later, this.props is whatever the latest props are.
    setTimeout(() => alert("Followed " + this.props.user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}

function ProfileFunction({ user }: { user: string }) {
  function handleClick() {
    // 'user' is a constant of this render: the alert shows who was on screen at the click.
    setTimeout(() => alert("Followed " + user), 3000);
  }

  return <button onClick={handleClick}>Follow</button>;
}
`,
          { caption: "The behavioural difference that is not obvious" },
        ),
        p(
          "Click Follow on one profile and switch to another within three seconds. The class alerts the new profile's name, which is a bug; the function alerts the one you clicked. Function components capture the values of the render they belong to. That is usually what you want, and it is also the source of stale closures when you do not.",
        ),
        trap(
          "A conversion is not required. Class components are fully supported, and a working one can stay as it is. Convert when you are changing the component anyway, or when you need a hook-only feature inside it.",
        ),
      ],
      docs: "https://react.dev/reference/react/Component#alternatives",
    },
    {
      id: "legacy-clone-element",
      question: "What is the difference between `createElement` and `cloneElement`? What is the `Children` API?",
      level: "intermediate",
      short:
        "`createElement(type, props, ...children)` makes a new element; it is what JSX compiles to. `cloneElement(element, props)` copies an existing element with extra props merged in. `Children` is a set of helpers for inspecting and transforming the `children` prop. The last two are legacy patterns for letting a parent inject props into its children.",
      body: [
        tsx(`
import { Children, cloneElement, createElement, isValidElement, type ReactNode } from "react";

const button = createElement("button", { className: "btn" }, "Save");
// identical to <button className="btn">Save</button>

const primary = cloneElement(button, { className: "btn btn-primary" });
// a copy: new props merged over the old ones; key and ref are kept

function RadioGroup({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div role="radiogroup">
      {Children.map(children, (child) =>
        isValidElement<{ name?: string }>(child) ? cloneElement(child, { name }) : child,
      )}
    </div>
  );
}
`),
        table(
          ["", "`createElement`", "`cloneElement`"],
          ["Input", "A type (tag or component), props, children", "An existing element, plus overrides"],
          ["Used by", "The JSX compiler; dynamic element types", "Parents that add props to children they receive"],
          ["Today", "Rarely written by hand", "Discouraged"],
        ),
        list(
          "`cloneElement` makes data flow invisible: the child gets a prop that appears nowhere in the JSX where the child is written.",
          "`Children.map` only sees the elements passed directly. Wrap a child in another component or a fragment and the injection silently stops working.",
          "The modern alternatives are context (the compound component pattern), a render prop, or simply passing the prop explicitly.",
        ),
      ],
      followUps: [
        {
          q: "When is `createElement` still useful?",
          a: "When the element type is only known at runtime and you are not in a JSX file, for example in a library. In JSX the same is done with a capitalised variable: `const Tag = level === 1 ? \"h1\" : \"h2\"; return <Tag />`.",
        },
      ],
      docs: "https://react.dev/reference/react/cloneElement",
    },
  ],
};
