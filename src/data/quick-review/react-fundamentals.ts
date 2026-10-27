import { jsx, list, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const REACT_FUNDAMENTALS: ReviewSection = {
  id: "react-fundamentals",
  topic: "react",
  title: "React fundamentals",
  blurb: "Elements, components, JSX and where state lives: the vocabulary every other React answer builds on.",
  questions: [
    {
      id: "element-vs-component",
      question: "What is the difference between an element and a component in React?",
      topics: ["react", "javascript"],
      level: "junior",
      short:
        "An element is a plain, immutable object describing what to render: `{ type, props }`, created by JSX or `createElement`. A component is a function (or class) that takes props and returns elements. `<Greeting name=\"Ada\" />` is an element whose `type` is the `Greeting` component.",
      body: [
        tsx(`
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

const element = <Greeting name="Ada" />;
console.log(element.type === Greeting, element.props.name);

const host = <h1 className="title">Hi</h1>;
console.log(host.type, host.props.className);
`),
        list(
          "**Elements are cheap descriptions**: creating one does not render anything or call the component. React calls `Greeting` later, when it renders that element.",
          "**Host elements** have a string type (`\"h1\"`) and become DOM nodes; **component elements** have a function type and expand into more elements.",
          "**Components are capitalised** in JSX, which is how the compiler tells `<Greeting />` (a variable) from `<greeting />` (a tag name).",
        ),
        say("A component is the recipe; an element is one order placed from it, with specific props."),
      ],
      goodToHear: ["Element: plain object `{ type, props }`", "Component: function returning elements", "Elements are immutable", "Capitalisation in JSX"],
      links: [{ title: "react.dev: Your first component", url: "https://react.dev/learn/your-first-component" }],
    },
    {
      id: "class-name",
      question: "Why does React use `className` instead of `class` like in HTML?",
      topics: ["react", "html"],
      level: "intermediate",
      short:
        "JSX compiles to JavaScript, and React's props follow the DOM's property names rather than HTML's attribute names. The DOM property is `element.className` because `class` is a reserved word in JavaScript. The same logic gives `htmlFor` instead of `for`, and camelCase names like `tabIndex` and `onClick`.",
      body: [
        tsx(`
function Field() {
  return (
    <div className="field">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" tabIndex={0} />
    </div>
  );
}
`),
        list(
          "`class` is reserved, so `const { class } = props` would not compile. `className` is safe to destructure.",
          "Using `class` in JSX gets a warning from React (\"Invalid DOM property `class`. Did you mean `className`?\").",
          "Custom elements (Web Components) are the exception: React 19 passes props to them as attributes or properties, and `class` is accepted there.",
          "Other frameworks chose differently: Vue, Svelte, Solid and Preact accept `class`.",
        ),
      ],
      goodToHear: ["JSX is JavaScript", "`class` is a reserved word", "Props follow DOM property names", "`htmlFor` and camelCase attributes"],
      links: [{ title: "react.dev: Common components (DOM props)", url: "https://react.dev/reference/react-dom/components/common" }],
    },
    {
      id: "react-comments",
      question: "How do you write comments inside a JSX tree in React?",
      topics: ["react"],
      level: "junior",
      short:
        "Between children, a comment has to be a JavaScript comment inside braces: `{/* like this */}`. Inside a tag, between props, ordinary `//` and `/* */` comments work. Plain HTML comments (`<!-- -->`) are not valid JSX.",
      body: [
        tsx(`
function Card() {
  return (
    <div
      // A comment between props works too.
      className="card"
    >
      {/* A comment among the children needs braces. */}
      <h2>Title</h2>
      {
        // A line comment also works, but the closing brace must be on its own line.
      }
    </div>
  );
}
`),
        trap("Without braces, `/* text */` between children renders as literal text on the page."),
      ],
      goodToHear: ["`{/* */}` between children", "`//` and `/* */` between props", "No HTML comments in JSX"],
      links: [{ title: "react.dev: JavaScript in JSX with curly braces", url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces" }],
    },
    {
      id: "fragments",
      question: "What are fragments?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "A fragment groups several children without adding a DOM node. A component returns one value, so returning siblings needs a wrapper; `<>...</>` (or `<Fragment>`) is a wrapper that disappears from the output. It matters where an extra `<div>` would break the HTML or the layout: table rows, list items, flex and grid children.",
      body: [
        tsx(`
function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Role</td>
    </>
  );
}

function Glossary({ terms }: { terms: { id: string; term: string; meaning: string }[] }) {
  return (
    <dl>
      {terms.map((item) => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.meaning}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
`),
        list(
          "The short syntax `<></>` cannot take props. To give a fragment a `key` (when mapping pairs of elements), write `<Fragment key={...}>`.",
          "A `<div>` inside `<tr>` or `<ul>` produces invalid HTML; inside a grid or flex container it becomes the item instead of its children.",
          "An array of elements is another way to return siblings, but every item then needs a key.",
        ),
      ],
      goodToHear: ["Group children without a DOM node", "Short syntax vs `Fragment` with `key`", "Tables, lists and layout", "Valid HTML"],
      links: [{ title: "react.dev: Fragment", url: "https://react.dev/reference/react/Fragment" }],
    },
    {
      id: "children-prop",
      question: "What is the `children` prop?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "`children` is the prop holding whatever is written between a component's opening and closing tags: text, elements, an array of them, or even a function. It is what makes composition work: layouts, cards, modals and providers wrap content they know nothing about. Type it as `ReactNode`.",
      body: [
        tsx(`
function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </section>
  );
}

function Profile() {
  return (
    <Card title="Ada Lovelace">
      <p>Mathematician.</p>
      <a href="/ada">Read more</a>
    </Card>
  );
}
`),
        list(
          "**Composition over configuration**: rather than `<Card body=\"...\" link=\"...\" />` with a prop per piece, the caller passes any content.",
          "**Several slots** are just more props of type `ReactNode`: `<Layout sidebar={<Nav />}>main content</Layout>`.",
          "**Render props**: `children` can be a function the component calls with data, as in `<DataLoader>{(data) => <List items={data} />}</DataLoader>`. Hooks have replaced most uses.",
          "The `Children` and `cloneElement` APIs exist but are fragile; prefer passing data through props or context.",
        ),
        trap("Children passed from a parent are created by that parent. A wrapper that re-renders does not re-render them, which is a simple way to keep expensive subtrees from re-rendering."),
      ],
      goodToHear: ["Content between the tags", "Composition", "`ReactNode` type", "Multiple slots via props", "Render props"],
      links: [{ title: "react.dev: Passing JSX as children", url: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children" }],
    },
    {
      id: "inline-conditional-expressions",
      question: "What are inline conditional expressions?",
      topics: ["react", "javascript"],
      level: "intermediate",
      short:
        "Ways to choose what to render inside JSX, which only accepts expressions: the ternary `cond ? <A /> : <B />` for either/or, `cond && <A />` for show-or-nothing, and `null` to render nothing. For anything longer, compute a variable before the `return` or return early.",
      body: [
        tsx(`
function Inbox({ messages, loading }: { messages: string[]; loading: boolean }) {
  if (loading) return <p>Loading…</p>;

  return (
    <section>
      {messages.length > 0 && <span className="badge">{messages.length}</span>}
      {messages.length === 0 ? <p>No messages</p> : <ul>{messages.map((m) => <li key={m}>{m}</li>)}</ul>}
    </section>
  );
}
`),
        jsx(`
// Renders a stray "0" when the list is empty: 0 is falsy, but React renders numbers.
{messages.length && <span className="badge">{messages.length}</span>}
`, { caption: "The classic `&&` bug", tone: "bad" }),
        list(
          "`false`, `null`, `undefined` and `true` render nothing. `0`, `NaN` and `\"\"` are values React does render (an empty string renders nothing visible but still counts as a text node).",
          "Nested ternaries get hard to read quickly. Extract a component, or map a status to a component with an object lookup.",
          "A component that returns `null` is still mounted: its state and effects stay alive. Rendering `{show && <Panel />}` in the parent unmounts it instead.",
        ),
      ],
      demo: { id: "short-circuit", hint: "Set the count to 0 and see what the `&&` version renders." },
      goodToHear: ["Ternary and `&&`", "Rendering `null`", "The `0 &&` pitfall", "Early returns and variables for complex cases"],
      links: [{ title: "react.dev: Conditional rendering", url: "https://react.dev/learn/conditional-rendering" }],
    },
    {
      id: "keys",
      question: "What is a key? What are the benefits of using it in lists?",
      topics: ["react", "javascript"],
      level: "intermediate",
      short:
        "A `key` is a stable identity for an element among its siblings. When a list re-renders, React matches old and new children by key, so it can keep each item's DOM and state, move items instead of recreating them, and only insert or remove what changed. Use an id from the data; the array index breaks when items are inserted, removed or reordered.",
      body: [
        tsx(`
function TodoList({ todos }: { todos: { id: string; text: string }[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" /> {todo.text}
        </li>
      ))}
    </ul>
  );
}
`),
        table(
          ["Key", "Insert at the top of the list"],
          ["`todo.id`", "React inserts one new `<li>`; every checkbox stays with its todo"],
          ["index", "React updates every `<li>`'s text and adds one at the end; the checkboxes stay in place and now belong to the wrong todos"],
          ["`Math.random()`", "every item is new on every render: all DOM and state is thrown away"],
        ),
        list(
          "Keys only need to be unique among siblings, not globally.",
          "The index is acceptable for static lists that never reorder and hold no state.",
          "Changing an element's key on purpose remounts it, which is the simplest way to reset a component's state (`<Form key={userId} />`).",
          "`key` is not passed to the component as a prop.",
        ),
      ],
      demo: { id: "react-keys", hint: "Type in a couple of rows, then add an item at the top with each key strategy." },
      goodToHear: ["Identity among siblings", "Matching during reconciliation", "Preserves state and DOM", "Stable ids, not indexes or random values", "Key changes remount"],
      links: [{ title: "react.dev: Rendering lists", url: "https://react.dev/learn/rendering-lists" }],
    },
    {
      id: "stateful-components",
      question: "What is a stateful component in React?",
      topics: ["react", "javascript"],
      level: "junior",
      short:
        "A component that owns state: data that changes over time and is kept by React between renders. In a function component that is `useState` or `useReducer` (in a class, `this.state` and `setState`). Updating the state makes React re-render the component with the new value.",
      body: [
        tsx(`
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes((current) => current + 1)}>♥ {likes}</button>;
}
`),
        list(
          "State is private to each **instance**: two `<LikeButton />`s count separately.",
          "State is a **snapshot** per render: the handler sees the value of the render it was created in, which is why the updater form exists.",
          "Keep state minimal: anything you can compute from props or other state should be computed during render, not stored.",
        ),
      ],
      goodToHear: ["Owns data that changes", "`useState`/`useReducer` (or `this.state`)", "Updates trigger re-renders", "Per-instance, snapshot semantics"],
      links: [{ title: "react.dev: State, a component's memory", url: "https://react.dev/learn/state-a-components-memory" }],
    },
    {
      id: "stateless-components",
      question: "What is a stateless component?",
      topics: ["react", "javascript"],
      level: "junior",
      short:
        "A component with no state of its own: it renders purely from its props, so the same props always give the same output. They are the easiest components to reuse and test. Before hooks, \"stateless functional component\" meant any function component; today a function component can have state, so \"stateless\" or \"presentational\" describes what it does, not how it is written.",
      body: [
        tsx(`
function Avatar({ name, src, size = 40 }: { name: string; src: string; size?: number }) {
  return <img src={src} alt={name} width={size} height={size} className="avatar" />;
}
`),
        p("A common split is a stateful container that fetches and holds data, rendering stateless pieces that only display it. With hooks, the container's logic often moves into a custom hook instead."),
        say("I try to push state up to where it is needed and keep the leaves stateless; they become trivial to test and to memoize."),
      ],
      goodToHear: ["Renders from props only", "Same props, same output", "Reusable and testable", "Historical name for function components"],
      links: [{ title: "react.dev: Keeping components pure", url: "https://react.dev/learn/keeping-components-pure" }],
    },
    {
      id: "lift-state",
      question: "What does lifting state up in React mean?",
      topics: ["react"],
      level: "junior",
      short:
        "When two components need the same changing data, move the state out of them into their closest common parent, and pass the value and a function to change it down as props. There is then one source of truth, and the components cannot disagree.",
      body: [
        tsx(`
function TemperatureInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      {label} <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Converter() {
  const [celsius, setCelsius] = useState("20");
  const fahrenheit = celsius === "" ? "" : String((Number(celsius) * 9) / 5 + 32);
  return (
    <>
      <TemperatureInput label="°C" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        label="°F"
        value={fahrenheit}
        onChange={(f) => setCelsius(f === "" ? "" : String(((Number(f) - 32) * 5) / 9))}
      />
    </>
  );
}
`),
        list(
          "The inputs became **controlled**: their value comes from props, and they report changes instead of storing them.",
          "Only one temperature is stored; the other is **derived** during render, so they can never drift apart.",
          "If the common parent ends up far away and many layers pass the props through, that is the point to consider context or a store.",
        ),
      ],
      demo: { id: "lift-state", hint: "Type in either box with the state kept in each input, then with it lifted to the parent." },
      goodToHear: ["Shared state in the closest common parent", "Pass value and setter as props", "Single source of truth", "Controlled children", "Derive instead of duplicating"],
      links: [{ title: "react.dev: Sharing state between components", url: "https://react.dev/learn/sharing-state-between-components" }],
    },
  ],
};
