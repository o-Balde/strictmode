import { js, list, p, say, steps, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_FUNDAMENTALS: PrepSection = {
  id: "react-fundamentals",
  track: "react",
  title: "React fundamentals",
  blurb:
    "Asked in nearly every React interview at every level. Juniors are expected to know the definitions; seniors are expected to explain why each one is the way it is.",
  drill: "rendering-keys",
  questions: [
    {
      id: "react-what-is-react",
      question: "What is React, and what are its main features?",
      level: "junior",
      short:
        "React is a JavaScript library for building user interfaces out of components. You describe what the UI should look like for a given state, and React works out which DOM updates are needed when that state changes.",
      body: [
        list(
          "**Declarative.** You write the UI as a function of state. You do not write the steps to get from the old screen to the new one.",
          "**Component-based.** The UI is a tree of small, reusable functions, each owning its markup, logic and state.",
          "**One-way data flow.** Data moves down through props; changes are requested upward through callbacks.",
          "**A virtual DOM with reconciliation.** React diffs the new description against the previous one and touches the real DOM as little as it can.",
          "**Hooks.** State, effects and shared logic in plain functions.",
          "**Renderer-agnostic.** The same model drives the browser (React DOM), native apps (React Native) and server rendering.",
        ),
        tsx(`
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
`),
        p(
          "React is a library, not a framework: it renders. Routing, data fetching, bundling and server rendering come from the ecosystem, which is why new projects usually start on a framework such as Next.js or React Router, or on Vite for a client-only app. Create React App is deprecated.",
        ),
      ],
      followUps: [
        {
          q: "What are React's limitations?",
          a: "It is only the view layer, so every project assembles (or picks a framework for) the rest. The render model takes time to internalise: stale closures, effect dependencies and unnecessary re-renders are learned the hard way. And a client-only React app ships a lot of JavaScript before anything appears, unless you add server rendering.",
        },
        {
          q: "How is it different from Angular or Vue?",
          a: "Angular is a full framework with its own templates, dependency injection, router and forms, and it uses two-way binding in forms. Vue sits in between, with templates and a reactivity system that tracks dependencies automatically. React is the smallest of the three in scope, uses JSX, and re-runs component functions instead of tracking fine-grained dependencies.",
        },
      ],
      docs: "https://react.dev/learn/thinking-in-react",
    },
    {
      id: "react-jsx",
      question: "What is JSX, and how does a browser run it?",
      level: "junior",
      short:
        "JSX is a syntax extension that lets you write markup inside JavaScript. Browsers cannot run it. A compiler (Babel, SWC, esbuild, TypeScript) turns each tag into a function call that returns a plain object describing the element.",
      body: [
        tsx(
          `
function Greeting({ name }: { name: string }) {
  return <h1 className="title">Hello, {name}</h1>;
}
`,
          { caption: "What you write" },
        ),
        js(
          `
import { jsxs } from "react/jsx-runtime";

function Greeting({ name }) {
  return jsxs("h1", { className: "title", children: ["Hello, ", name] });
}

// ...which returns an element, a plain object:
// { type: "h1", props: { className: "title", children: ["Hello, ", "Ada"] }, key: null }
`,
          { caption: "What the compiler emits" },
        ),
        list(
          "A component returns one root. Use a fragment (`<>...</>`) to return siblings.",
          "Curly braces embed any JavaScript expression, not statements: no `if` or `for` inside JSX.",
          "Attributes are camelCase and follow the DOM property names: `className`, `htmlFor`, `onClick`, `tabIndex`.",
          "`style` takes an object: `style={{ marginTop: 8 }}`.",
          "Lowercase tags are DOM elements; capitalised tags are components. `<card />` would look for an HTML element named `card`.",
        ),
      ],
      followUps: [
        {
          q: "Why `className` and not `class`?",
          a: "JSX attributes become keys of a JavaScript object and map to DOM properties, and the DOM property is `className`. `class` is also a reserved word in JavaScript.",
        },
        {
          q: "Why did older code need `import React from \"react\"` in every file?",
          a: "Before React 17 the compiler emitted `React.createElement(...)`, so `React` had to be in scope. The automatic runtime imports `jsx` from `react/jsx-runtime` itself.",
        },
        {
          q: "How does JSX protect against XSS?",
          a: "Everything embedded with `{}` is rendered as text: React escapes it before it reaches the DOM, so a string containing `<script>` is displayed, not executed. The escape hatch is `dangerouslySetInnerHTML`, which is exactly as safe as the HTML you give it.",
        },
        {
          q: "Can you use React without JSX?",
          a: "Yes, by calling `createElement(type, props, ...children)` directly. JSX is only a more readable way to write those calls.",
        },
      ],
      docs: "https://react.dev/learn/writing-markup-with-jsx",
    },
    {
      id: "react-element-vs-component",
      question: "What is the difference between a React element and a React component?",
      level: "junior",
      short:
        "A component is a function that accepts props and returns a description of UI. An element is that description: a small immutable object saying 'render this type with these props'. `Button` is a component; `<Button />` is an element.",
      body: [
        tsx(`
// A component: a function. Defined once.
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

// An element: a plain object. Created on every render.
const element = <Welcome name="Ada" />;
// { type: Welcome, props: { name: "Ada" }, key: null }
`),
        list(
          "**Element**: cheap, immutable, recreated every render. It is the output of JSX.",
          "**Component**: the function (or class) React calls to get elements.",
          "**Instance / fiber**: React's internal record for a mounted component. This is where state lives.",
          "**Node** (`ReactNode`): anything renderable, so elements plus strings, numbers, `null`, arrays.",
        ),
        trap(
          "Two mistakes follow from blurring these. Calling a component as a function (`Welcome({ name })`) makes its hooks belong to the caller. Defining a component inside another component creates a brand-new component type on every render, so React unmounts and remounts it each time and its state is lost.",
        ),
        tsx(
          `
function Page() {
  // A new function identity on every render of Page:
  // React sees a different component type and remounts it, wiping its state.
  function SearchBox() {
    const [query, setQuery] = useState("");
    return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
  }

  return <SearchBox />;
}
`,
          { caption: "Do not nest component definitions", tone: "bad" },
        ),
      ],
      docs: "https://react.dev/learn/your-first-component",
    },
    {
      id: "react-virtual-dom",
      question: "What is the virtual DOM? How is it different from the real DOM and the shadow DOM?",
      level: "junior",
      short:
        "The virtual DOM is React's in-memory description of the UI: a tree of plain objects. On each update React builds a new tree, compares it with the previous one, and applies only the differences to the real DOM. The shadow DOM is unrelated: it is a browser feature for encapsulating a component's markup and styles.",
      body: [
        steps(
          "**Render.** State changes, and React calls the affected components to produce a new tree of elements.",
          "**Reconcile.** It diffs the new tree against the previous one to find what changed.",
          "**Commit.** It applies the minimal set of DOM operations, then runs effects.",
        ),
        table(
          ["", "What it is", "Who provides it"],
          ["Real DOM", "The browser's live tree of nodes; changing it can trigger layout and paint", "The browser"],
          ["Virtual DOM", "A lightweight JavaScript description of what the DOM should be", "React (a library concept)"],
          ["Shadow DOM", "An encapsulated subtree with scoped styles, used by web components", "The browser (a web standard)"],
        ),
        list(
          "**What it buys you:** you write the UI declaratively, and React batches and minimises DOM writes for you. It also makes other render targets possible, such as native views or server-side HTML.",
          "**What it costs:** building and diffing trees takes CPU and memory. It is not automatically faster than careful hand-written DOM code; it is fast enough while being far easier to reason about.",
        ),
        say(
          "The virtual DOM is not what makes React fast. It is what makes a declarative model affordable. The win is that I never write the code that moves the UI from one state to another.",
        ),
      ],
      followUps: [
        {
          q: "Does a re-render mean the DOM was updated?",
          a: "No. Rendering means React called your component and compared the result. If the output is identical, the commit phase changes nothing in the DOM.",
        },
        {
          q: "Do all frameworks use a virtual DOM?",
          a: "No. Svelte compiles components into direct DOM updates, and Solid uses fine-grained signals. They trade React's 're-run the function' model for dependency tracking.",
        },
      ],
      docs: "https://react.dev/learn/render-and-commit",
    },
    {
      id: "react-props-vs-state",
      question: "What is the difference between props and state?",
      level: "junior",
      short:
        "Props are inputs passed in by the parent, read-only from the component's point of view. State is data the component owns and can change over time. A change to either causes a re-render.",
      body: [
        table(
          ["", "Props", "State"],
          ["Owned by", "The parent", "The component itself"],
          ["Can the component change it?", "No, they are read-only", "Yes, through the setter"],
          ["Purpose", "Configure a component from outside", "Remember something between renders"],
          ["Changes come from", "The parent re-rendering with new values", "Events, effects, responses"],
        ),
        tsx(`
function Stepper({ step, label }: { step: number; label: string }) { // props
  const [value, setValue] = useState(0); // state

  return (
    <button onClick={() => setValue(value + step)}>
      {label}: {value}
    </button>
  );
}
`),
        p(
          "A useful test when deciding whether something should be state: does it change over time, is it not passed in from a parent, and can it not be computed from other props or state? Only if all three are true does it belong in `useState`.",
        ),
        trap(
          "Copying a prop into state (`useState(props.value)`) only reads the prop on the first render. When the parent later passes a new value, the state does not follow. Either use the prop directly, name it `initialValue` to make the one-time read explicit, or reset the component with a `key`.",
        ),
      ],
      followUps: [
        {
          q: "How does a child change something the parent owns?",
          a: "It cannot change the prop. The parent passes down a callback (`onChange`), the child calls it, the parent updates its own state, and new props flow back down.",
        },
      ],
      docs: "https://react.dev/learn/state-a-components-memory",
    },
    {
      id: "react-state-immutability",
      question: "Why must you not mutate state directly? How do you update objects and arrays?",
      level: "junior",
      short:
        "React decides whether anything changed by comparing references. If you mutate an object or array in place, the reference is the same, so React can skip the re-render, and memoised children and effect dependencies see no change. Always produce a new value.",
      body: [
        tsx(`
interface Todo {
  id: string;
  title: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addWrong(todo: Todo) {
    todos.push(todo); // mutates the array React is holding
    setTodos(todos); // same reference: React bails out, nothing re-renders
  }

  const add = (todo: Todo) => setTodos((current) => [...current, todo]);

  const remove = (id: string) =>
    setTodos((current) => current.filter((todo) => todo.id !== id));

  const toggle = (id: string) =>
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );

  return <p>{todos.length} todos</p>;
}
`),
        table(
          ["Instead of (mutates)", "Use (returns a new value)"],
          ["`push`, `unshift`", "`[...items, item]`, `[item, ...items]`"],
          ["`pop`, `shift`, `splice`", "`filter`, `slice`, `toSpliced`"],
          ["`sort`, `reverse`", "`toSorted`, `toReversed`, or copy first"],
          ["`items[i] = x`", "`map`, or `items.with(i, x)`"],
          ["`obj.key = x`", "`{ ...obj, key: x }`"],
        ),
        p("Nested data has to be copied at every level along the path you are changing:"),
        tsx(`
interface Profile {
  name: string;
  address: { city: string; country: string };
}

function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    name: "Ada",
    address: { city: "London", country: "UK" },
  });

  const moveTo = (city: string) =>
    setProfile((current) => ({
      ...current,
      address: { ...current.address, city },
    }));

  return [profile, moveTo] as const;
}
`),
      ],
      followUps: [
        {
          q: "What else relies on immutability besides re-rendering?",
          a: "`React.memo`, `useMemo` and `useEffect` dependency checks all compare by reference. Each render is also meant to be a snapshot: mutating state makes past renders, closures and concurrent rendering see data that changed underneath them.",
        },
        {
          q: "Deep updates get ugly. What then?",
          a: "Flatten the state shape so updates are shallow, or use Immer (`useImmer`, and built into Redux Toolkit), which lets you write mutating code against a draft and produces the immutable copy for you.",
        },
      ],
      docs: "https://react.dev/learn/updating-objects-in-state",
    },
    {
      id: "react-data-flow",
      question: "Explain one-way data flow and 'lifting state up'.",
      level: "junior",
      short:
        "Data moves in one direction: down the tree through props. A child that needs to change something calls a function its parent gave it. When two components need the same data, you move that state up to their closest common ancestor and pass it down to both.",
      body: [
        tsx(`
function SearchPage({ products }: { products: { id: string; name: string }[] }) {
  const [query, setQuery] = useState(""); // lifted: both children need it

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <Results items={products.filter((product) => product.name.includes(query))} />
    </>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <input value={value} onChange={(event) => onChange(event.target.value)} />;
}

function Results({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
`),
        list(
          "There is a single source of truth for each piece of state, so two views of it cannot disagree.",
          "To find out why something changed, you follow the props up to the component that owns the state. There is nowhere else to look.",
          "The cost is plumbing: lifting state far up leads to prop drilling, which is the point at which composition, context or a store earn their place.",
        ),
      ],
      followUps: [
        {
          q: "Does React have two-way binding?",
          a: "Not built in. A controlled input is the same effect built from two one-way pieces: `value` flows down and `onChange` flows up.",
        },
        {
          q: "How high should state be lifted?",
          a: "As high as it needs to be and no higher. State kept close to where it is used re-renders less of the tree and is easier to delete.",
        },
      ],
      docs: "https://react.dev/learn/sharing-state-between-components",
    },
    {
      id: "react-keys",
      question: "What are keys for? What goes wrong when you use the array index as a key?",
      level: "junior",
      short:
        "A key gives each item in a list a stable identity between renders, so React can tell which item moved, which was added and which was removed. With index keys the identity is the position, not the item: reorder or delete, and React keeps the DOM nodes and component state where they were and just swaps the contents, so state ends up attached to the wrong row.",
      body: [
        tsx(`
interface Task {
  id: string;
  label: string;
}

function Checklist({ tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" /> {task.label}
        </li>
      ))}
    </ul>
  );
}
`),
        p(
          "Now imagine `key={index}`, the user ticks the first task, and then that task is deleted. React sees keys `0..n-2` still present and key `n-1` gone. It keeps the first `<li>` (with its ticked checkbox), updates its label to the second task's text, and removes the last `<li>`. The tick has moved to a task the user never touched.",
        ),
        table(
          ["Key", "Verdict"],
          ["A stable ID from the data", "Correct"],
          ["Array index", "Only safe for a static list with no reordering, filtering or per-item state"],
          ["`Math.random()` or a new UUID in render", "Wrong: a new key every render remounts every item"],
          ["No key", "React warns and falls back to the index"],
        ),
        list(
          "Keys only need to be unique among siblings, not globally.",
          "`key` is not a prop: the child cannot read it. Pass the ID separately if it needs it.",
          "For items created on the client, generate the ID once when the item is created and store it in the data.",
        ),
      ],
      followUps: [
        {
          q: "Can you use `key` outside a list?",
          a: "Yes, and it is the idiomatic way to reset a component. `<ProfileForm key={userId} />` gives React a different identity when the user changes, so it unmounts the old form and mounts a fresh one with fresh state, with no effect needed to clear the fields.",
        },
        {
          q: "Is an index key a performance problem or a correctness problem?",
          a: "Both, but correctness is the one that matters. Performance: inserting at the top re-renders every row. Correctness: uncontrolled inputs, focus, animations and component state stay with the position instead of the item.",
        },
      ],
      docs: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    },
    {
      id: "react-controlled-uncontrolled",
      question: "What is the difference between controlled and uncontrolled components?",
      level: "junior",
      short:
        "A controlled input gets its value from React state and reports changes through `onChange`, so state is the single source of truth. An uncontrolled input keeps its own value in the DOM, and you read it when you need it, through a ref or from the form on submit.",
      body: [
        tsx(`
function Controlled() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return (
    <>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <button disabled={!isValid}>Subscribe</button>
    </>
  );
}

function Uncontrolled() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(inputRef.current?.value); // read from the DOM on demand
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} name="email" defaultValue="" />
      <button>Subscribe</button>
    </form>
  );
}
`),
        table(
          ["", "Controlled", "Uncontrolled"],
          ["Source of truth", "React state", "The DOM"],
          ["Props", "`value` + `onChange`", "`defaultValue` (+ `ref`)"],
          ["Re-renders on each keystroke", "Yes", "No"],
          ["Good for", "Live validation, formatting, dependent fields, disabling submit", "Simple forms, file inputs, wrapping non-React widgets"],
        ),
        trap(
          "`value={user?.name}` starts as `undefined`, which React treats as uncontrolled, and then becomes a string: 'A component is changing an uncontrolled input to be controlled'. Give it a defined value from the start: `value={user?.name ?? \"\"}`. And a `value` with no `onChange` renders a read-only field.",
        ),
      ],
      followUps: [
        {
          q: "Which should you use for a large form?",
          a: "Controlled inputs re-render on every keystroke, which gets noticeable with many fields. Libraries like React Hook Form keep inputs uncontrolled and subscribe only where needed. React 19's form actions also lean uncontrolled: the action receives a `FormData`.",
        },
        {
          q: "Why is `<input type=\"file\">` always uncontrolled?",
          a: "Its value is a file chosen by the user, which script cannot set for security reasons. You read `files` from the element.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable",
    },
    {
      id: "react-conditional-rendering",
      question: "What are the ways to render conditionally, and what is the `&&` pitfall?",
      level: "junior",
      short:
        "An early `return`, a ternary, or `&&`. They are plain JavaScript, since JSX is just expressions. The pitfall: `&&` returns its left operand when that is falsy, and React renders the number `0`, so `{items.length && <List />}` prints a `0` on screen when the list is empty.",
      body: [
        tsx(`
interface InboxProps {
  user: { name: string; isAdmin: boolean } | null;
  messages: string[];
}

function Inbox({ user, messages }: InboxProps) {
  if (!user) return <p>Please sign in.</p>; // early return for a whole-component guard

  return (
    <section>
      <h1>Hello, {user.name}</h1>
      {messages.length > 0 ? <p>{messages.length} new messages</p> : <p>All caught up.</p>}
      {user.isAdmin && <a href="/admin">Admin</a>}
    </section>
  );
}
`),
        tsx(
          `
function Count({ items }: { items: string[] }) {
  return (
    <div>
      {items.length && <p>{items.length} items</p>}
      {items.length > 0 && <p>{items.length} items</p>}
    </div>
  );
}
// With an empty array the first line renders "0". The second renders nothing.
`,
          { caption: "The pitfall and the fix" },
        ),
        list(
          "React renders strings and numbers (including `0` and `NaN`). It renders nothing for `false`, `true`, `null` and `undefined`.",
          "For more than two or three cases, map the state to a component with an object lookup or a `switch`, and avoid nested ternaries.",
        ),
      ],
      followUps: [
        {
          q: "How do you stop a component from rendering anything?",
          a: "Return `null`. The component stays mounted, with its state and effects intact; it just outputs nothing.",
        },
        {
          q: "What is the difference between returning `null` and not rendering the component at all?",
          a: "If the parent stops rendering it, the component is unmounted and its state is destroyed. If you want to hide something and keep its state, keep it mounted and hide it with CSS, or use `<Activity mode=\"hidden\">` in React 19.2.",
        },
      ],
      docs: "https://react.dev/learn/conditional-rendering",
    },
    {
      id: "react-fragments",
      question: "What are fragments, and why use one instead of a `div`?",
      level: "junior",
      short:
        "A fragment groups several elements without adding a node to the DOM. A component must return a single root, and a wrapper `div` is not always harmless: it can break flex and grid layouts, produce invalid HTML inside tables and lists, and deepen the DOM for no reason.",
      body: [
        tsx(`
function Glossary({ terms }: { terms: { id: string; term: string; meaning: string }[] }) {
  return (
    <dl>
      {terms.map((entry) => (
        // The long form is required here: the shorthand <>...</> cannot take a key.
        <Fragment key={entry.id}>
          <dt>{entry.term}</dt>
          <dd>{entry.meaning}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Email</td>
    </>
  );
}
`),
        p(
          "A `<div>` between `<tr>` and `<td>`, or between `<dl>` and `<dt>`, is invalid HTML, and browsers will rearrange it. The fragment disappears at render time and leaves the correct structure.",
        ),
      ],
      docs: "https://react.dev/reference/react/Fragment",
    },
    {
      id: "react-events",
      question: "How does event handling work in React? What is a synthetic event?",
      level: "intermediate",
      short:
        "React wraps the browser's native event in a `SyntheticEvent`, an object with the same interface in every browser. It also uses event delegation: listeners are attached once at the root of the app, not on each element, and React dispatches to your handlers as the event bubbles.",
      body: [
        tsx(`
function Row({ id, onRemove }: { id: string; onRemove: (id: string) => void }) {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // returning false does nothing in React
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => onRemove(id)}>Remove</button>
    </form>
  );
}
`),
        table(
          ["", "HTML", "React"],
          ["Naming", "`onclick`", "`onClick` (camelCase)"],
          ["Value", "A string of code", "A function reference"],
          ["Preventing the default", "`return false` works", "Must call `event.preventDefault()`"],
        ),
        tsx(
          `
function Bad({ save }: { save: () => void }) {
  // save() is called during render, and its return value becomes the handler.
  return <button onClick={save()}>Save</button>; // error: void is not a click handler
}

function Good({ save }: { save: () => void }) {
  return <button onClick={save}>Save</button>;
}
`,
          { caption: "The classic mistake: calling instead of passing" },
        ),
        list(
          "Since React 17, events are delegated to the root container, not `document`, so several React roots (or React inside another app) do not interfere.",
          "Event pooling was removed in React 17. You can read the event after an `await` without `event.persist()`.",
          "`event.nativeEvent` gives you the underlying browser event.",
          "Events bubble through the React tree, which for portals is not the same as the DOM tree.",
        ),
      ],
      followUps: [
        {
          q: "How do you pass an argument to a handler?",
          a: "Close over it with an arrow function: `onClick={() => remove(item.id)}`. The arrow is created each render, which is fine unless the child is memoised and that prop is what breaks the memoisation.",
        },
        {
          q: "When do you need a native listener instead?",
          a: "For events on `window` or `document`, and when you need `{ passive: false }` to call `preventDefault` on wheel or touch events. Add it in an effect with a cleanup.",
        },
      ],
      docs: "https://react.dev/learn/responding-to-events",
    },
    {
      id: "react-refs",
      question: "What are refs, and when should you use them?",
      level: "intermediate",
      short:
        "A ref is a mutable box, `{ current }`, that persists for the lifetime of a component and does not trigger a re-render when it changes. It has two jobs: holding a DOM node so you can call imperative methods on it, and holding values the render output does not depend on, such as a timer ID.",
      body: [
        tsx(`
function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} type="search" />
      <button onClick={() => inputRef.current?.focus()}>Focus the field</button>
    </>
  );
}
`),
        list(
          "**Use a ref for:** focus, text selection, scrolling, measuring, media playback, and handing a DOM node to a non-React library.",
          "**Do not use a ref for:** anything you can express declaratively. If the screen should change, it is state.",
          "**Do not read or write `ref.current` during render.** Do it in event handlers and effects. Render must stay pure.",
        ),
        p(
          "To let a parent hold a ref to something inside your component, accept `ref` as a prop. In React 19 that is all it takes; earlier versions required wrapping the component in `forwardRef`. `useImperativeHandle` narrows what the parent gets from the raw DOM node to a small API of your choosing.",
        ),
        tsx(`
interface PlayerHandle {
  play(): void;
  pause(): void;
}

function Player({ src, ref }: { src: string; ref?: Ref<PlayerHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => void videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
  }));

  return <video ref={videoRef} src={src} />;
}

function Screen() {
  const playerRef = useRef<PlayerHandle>(null);
  return (
    <>
      <Player ref={playerRef} src="/intro.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
    </>
  );
}
`),
      ],
      followUps: [
        {
          q: "`useRef` vs `createRef`?",
          a: "`createRef` returns a new object every time it is called, so it suits class components, where it is called once in the constructor. In a function component it would reset on every render; `useRef` returns the same object each time.",
        },
        {
          q: "What is a callback ref?",
          a: "A function passed to `ref`. React calls it with the node when it attaches and with `null` when it detaches (or, in React 19, calls the cleanup function you returned). It is the tool for measuring a node as soon as it exists, or for collecting refs to a dynamic list.",
        },
        {
          q: "Ref or state?",
          a: "If the value affects what is rendered, state. If it is bookkeeping that should survive renders without causing one, a ref.",
        },
      ],
      docs: "https://react.dev/learn/manipulating-the-dom-with-refs",
    },
    {
      id: "react-strict-mode",
      question: "What does Strict Mode do? Why does my effect run twice?",
      level: "intermediate",
      short:
        "`<StrictMode>` is a development-only tool that deliberately stresses your components to expose bugs. It renders each component twice to catch impure renders, and on mount it runs every effect's setup, cleanup, then setup again to catch missing cleanups. Nothing is doubled in production.",
      body: [
        list(
          "**Double render**: component bodies, state initialisers, updater functions and `useMemo` callbacks run twice. If the result differs, your render has a side effect.",
          "**Double effect**: setup, cleanup, setup. If the app misbehaves, an effect is not undoing what it did.",
          "**Double ref callbacks**, for the same reason.",
          "**Deprecation warnings** for legacy APIs.",
        ),
        tsx(`
declare function createConnection(roomId: string): { connect(): void; disconnect(): void };

function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    // Without this cleanup, Strict Mode leaves two open connections in development,
    // and production leaks one every time roomId changes.
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Room {roomId}</h1>;
}
`),
        say(
          "If Strict Mode breaks something, the bug was already there. The fix is to make the effect symmetrical, so setup followed by cleanup leaves no trace, not to remove Strict Mode or guard the effect with a ref.",
        ),
      ],
      followUps: [
        {
          q: "My API request fires twice in development. How do I fix it?",
          a: "Make the duplicate harmless: abort or ignore the first response in the cleanup. Better still, fetch with a library or framework that de-duplicates and caches requests. In production it fires once.",
        },
        {
          q: "Why would React ever mount, unmount and remount a component for real?",
          a: "Fast Refresh already does it in development, and features that hide and restore UI while keeping its state (such as `<Activity>`) depend on effects being safe to tear down and re-run.",
        },
      ],
      docs: "https://react.dev/reference/react/StrictMode",
    },
    {
      id: "react-portals",
      question: "What is a portal, and when do you need one?",
      level: "intermediate",
      short:
        "`createPortal(children, domNode)` renders children into a different part of the DOM while keeping them in the same place in the React tree. You need it when an element must visually escape its parent: modals, tooltips, dropdowns and toasts that would otherwise be clipped by `overflow: hidden` or trapped in a stacking context.",
      body: [
        tsx(`
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
`),
        list(
          "Context still works: the portal's children read providers from where the portal is rendered in React, not where it lands in the DOM.",
          "Events bubble through the React tree. A click inside the modal reaches an `onClick` on the component that rendered it, even though the DOM nodes are not nested.",
          "On the server there is no `document`, so a portal has to be rendered on the client only.",
        ),
        trap(
          "A portal solves positioning, not accessibility. A real modal also needs focus moved into it, focus trapped while it is open, focus restored on close, `Escape` to dismiss and the background made inert. The native `<dialog>` element and the Popover API now give you much of that for free.",
        ),
      ],
      docs: "https://react.dev/reference/react-dom/createPortal",
    },
    {
      id: "react-error-boundaries",
      question: "What are error boundaries? What do they not catch?",
      level: "intermediate",
      short:
        "An error boundary is a component that catches errors thrown while rendering anything below it, and shows a fallback instead of letting the whole app unmount. They catch errors in rendering, in lifecycle methods and in constructors. They do not catch errors in event handlers, asynchronous code, server rendering, or in the boundary itself.",
      body: [
        tsx(`
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true }; // render phase: switch to the fallback
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack); // commit phase: report it
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function App({ children }: { children: ReactNode }) {
  return <ErrorBoundary fallback={<p>Something went wrong.</p>}>{children}</ErrorBoundary>;
}
`),
        list(
          "This is the one thing that still requires a class component. In practice most teams use the `react-error-boundary` package, which wraps it with a reset API and hooks.",
          "An error that no boundary catches unmounts the entire React tree. A blank page is judged safer than a UI in a corrupted state.",
          "Place boundaries at more than one level: one at the root as a last resort, one per route, and one around anything risky (a third-party widget, a chart, user-generated content).",
        ),
        table(
          ["Not caught", "Handle it with"],
          ["Event handlers", "`try`/`catch` in the handler, then set error state"],
          ["`setTimeout`, promises, `async` code", "`try`/`catch` or `.catch`; your data library's error state"],
          ["Server-side rendering", "The framework's error handling"],
          ["Errors thrown by the boundary itself", "A boundary further up"],
        ),
      ],
      followUps: [
        {
          q: "How do you let the user retry?",
          a: "Reset the boundary's state. The simplest way is to change its `key` (for example a retry counter), which remounts it and its children. `react-error-boundary` exposes `resetErrorBoundary` and `resetKeys` for this.",
        },
        {
          q: "How do you get an async error into a boundary?",
          a: "Rethrow it during render: store it in state and throw on the next render, which is what `showBoundary` from `react-error-boundary` does. In React 19, errors thrown inside a transition or Action are routed to the nearest boundary automatically.",
        },
        {
          q: "`try`/`catch` vs an error boundary?",
          a: "`try`/`catch` is imperative and covers the synchronous code inside the block. A boundary is declarative and covers rendering of a whole subtree, including components you did not write.",
        },
      ],
      docs: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    },
    {
      id: "react-class-vs-function",
      question: "Class components vs function components: what changed, and do you ever still write a class?",
      level: "junior",
      short:
        "Function components with hooks are the standard. They are plain functions, share logic through custom hooks, and are the only kind that new features (Server Components, the `use` hook, Actions, the React Compiler) support. The single remaining reason to write a class is an error boundary.",
      body: [
        tsx(`
import { Component, useEffect, useState } from "react";

class ClassCounter extends Component<{ label: string }, { count: number }> {
  state = { count: 0 };

  componentDidMount() {
    document.title = this.props.label + ": " + this.state.count;
  }

  componentDidUpdate() {
    document.title = this.props.label + ": " + this.state.count;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}

function FunctionCounter({ label }: { label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = label + ": " + count; // one effect replaces both lifecycle methods
  }, [label, count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
`),
        table(
          ["Class", "Function equivalent"],
          ["`this.state`, `this.setState`", "`useState`, `useReducer`"],
          ["`componentDidMount`", "`useEffect(fn, [])`"],
          ["`componentDidUpdate`", "`useEffect(fn, [deps])`"],
          ["`componentWillUnmount`", "The cleanup function returned from an effect"],
          ["`shouldComponentUpdate`, `PureComponent`", "`React.memo`"],
          ["`getDerivedStateFromProps`", "Compute the value during render"],
          ["`componentDidCatch`, `getDerivedStateFromError`", "No hook equivalent"],
          ["HOCs and render props for reuse", "Custom hooks"],
        ),
        trap(
          "The mapping is a translation aid, not a mental model. An effect is not 'the mount lifecycle'; it synchronises something outside React with the current props and state, and re-runs whenever those change. Thinking in lifecycles is where most stale-dependency bugs come from.",
        ),
      ],
      followUps: [
        {
          q: "Are function components faster?",
          a: "Not meaningfully. The reasons to prefer them are simpler code, no `this`, logic reuse through hooks, and compatibility with everything React has shipped since 2019.",
        },
        {
          q: "Do you need to rewrite existing class components?",
          a: "No. Classes are still supported and can be mixed freely with function components. Convert when you are changing the component anyway.",
        },
      ],
      docs: "https://react.dev/reference/react/Component#alternatives",
    },
    {
      id: "react-styling",
      question: "What are the ways to style a React application?",
      level: "junior",
      short:
        "Plain CSS files, CSS Modules, utility classes such as Tailwind, CSS-in-JS, and inline styles. They differ in how styles are scoped, whether there is a runtime cost, and how dynamic values are handled.",
      body: [
        table(
          ["Approach", "Scoping", "Trade-off"],
          ["Global CSS / Sass", "None; naming conventions like BEM", "Simple and cacheable, but class names collide as the app grows"],
          ["CSS Modules", "Class names made unique per file at build time", "No runtime cost; dynamic values need CSS variables"],
          ["Utility classes (Tailwind)", "No custom class names to collide", "Fast to write and small CSS output; long `className` strings"],
          ["Runtime CSS-in-JS (styled-components, Emotion)", "Per component", "Styles react to props, but there is a runtime cost and it does not work in Server Components"],
          ["Zero-runtime CSS-in-JS (vanilla-extract, StyleX, Panda)", "Per component", "Typed styles, extracted to CSS at build time"],
          ["Inline `style`", "The element", "Good for truly dynamic values; no pseudo-classes or media queries"],
        ),
        tsx(`
import styles from "./Button.module.css";

function Button({ active, width }: { active: boolean; width: number }) {
  // Conditional class from a CSS Module, plus one dynamic value inline.
  const className = active ? styles.button + " " + styles.active : styles.button;
  return <button className={className} style={{ width }} />;
}
`),
        say(
          "My default is whatever the codebase already uses. Starting fresh, I would pick CSS Modules or Tailwind: both are static CSS with no runtime and work with server rendering.",
        ),
      ],
      docs: "https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx",
    },
  ],
};
