import { html, list, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const REACT_EVENTS_REFS: ReviewSection = {
  id: "react-events-refs",
  topic: "react",
  title: "Events, refs and the DOM",
  blurb: "How React handles events, how to reach a real DOM node when you need one, and how to render outside your parent.",
  questions: [
    {
      id: "html-vs-react-event-handling",
      question: "What is the difference between HTML and React event handling?",
      topics: ["react", "javascript", "html"],
      level: "intermediate",
      short:
        "In HTML, a handler is a lowercase attribute holding a string of code (`onclick=\"save()\"`), and `return false` can cancel the default action. In React, handlers are camelCase props holding a function (`onClick={save}`), you must call `event.preventDefault()` explicitly, and the handler receives a cross-browser `SyntheticEvent` wrapping the native one.",
      body: [
        html(`
<button onclick="save(); return false;">Save</button>
<form onsubmit="return validate()">...</form>
`, { caption: "HTML" }),
        tsx(`
function SaveForm({ onSave }: { onSave: (data: FormData) => void }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(new FormData(event.currentTarget));
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit">Save</button>
    </form>
  );
}
`, { caption: "React" }),
        table(
          ["", "HTML", "React"],
          ["Naming", "lowercase `onclick`", "camelCase `onClick`"],
          ["Value", "a string of code", "a function"],
          ["Cancel default", "`return false` (in attributes)", "`event.preventDefault()`"],
          ["Event object", "native `Event`", "`SyntheticEvent`; `event.nativeEvent` for the original"],
          ["Where listeners live", "on each element", "one per event type at the root (delegation)"],
          ["Text input", "`change` fires on blur", "`onChange` fires on every keystroke (the native `input` event)"],
        ),
        p("Since React 17, React attaches its listeners to the root container rather than `document`, and event pooling (reusing event objects) is gone, so reading the event asynchronously is safe."),
      ],
      demo: { id: "event-propagation-3d", hint: "React's root listener sits at the top of this stack; your onClick runs when the bubble reaches it." },
      goodToHear: ["camelCase props", "Functions, not strings", "`preventDefault`, not `return false`", "SyntheticEvent", "Delegation at the root", "`onChange` on every input"],
      links: [{ title: "react.dev: Responding to events", url: "https://react.dev/learn/responding-to-events" }],
    },
    {
      id: "passing-arguments-to-event-handlers",
      question: "How do you pass an argument to an event handler or callback?",
      topics: ["react", "javascript"],
      level: "intermediate",
      short:
        "Wrap the call in an arrow function, `onClick={() => remove(item.id)}`, so it runs on click instead of during render. Alternatives: `remove.bind(null, item.id)`, a curried handler `onClick={removeHandler(item.id)}` where `removeHandler` returns a function, or a `data-` attribute read from `event.currentTarget.dataset`.",
      body: [
        tsx(`
function Items({ items, remove }: { items: { id: string; label: string }[]; remove: (id: string) => void }) {
  const removeById = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    if (id) remove(id);
  };
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.label}
          <button onClick={() => remove(item.id)}>Remove</button>
          <button data-id={item.id} onClick={removeById}>Remove (dataset)</button>
        </li>
      ))}
    </ul>
  );
}
`),
        trap("`onClick={remove(item.id)}` calls `remove` while rendering and passes its return value (probably `undefined`) as the handler. If `remove` updates state, the result is an infinite render loop."),
        list(
          "Inline arrows create a new function each render. That is fine almost always; it only matters when passing to a memoized child, where `useCallback` or the dataset version keeps the reference stable.",
          "To keep the event too: `onClick={(event) => remove(item.id, event)}`.",
        ),
      ],
      goodToHear: ["Arrow function wrapper", "Don't call the handler during render", "`bind` and currying", "`data-` attributes", "New functions per render rarely matter"],
      links: [{ title: "react.dev: Passing event handlers as props", url: "https://react.dev/learn/responding-to-events#passing-event-handlers-as-props" }],
    },
    {
      id: "refs",
      question: "What are refs in React? When should they be used?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "A ref is a mutable box, `{ current }`, that React keeps for the lifetime of a component and that does not cause a re-render when it changes. Use refs for the DOM (focus, scroll, measuring, media playback, integrating a non-React widget) and for values that must survive renders without being displayed (timer ids, the previous value, an `AbortController`). Anything shown on screen belongs in state.",
      body: [
        tsx(`
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={inputRef} placeholder="Search" />
      <button onClick={() => inputRef.current?.focus()}>Focus search</button>
    </>
  );
}

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null); // survives renders, never shown

  function start() {
    if (timerRef.current !== null) return;
    timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
  }
  function stop() {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }
  return (
    <p>
      {seconds}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button>
    </p>
  );
}
`),
        list(
          "**React 19**: `ref` is an ordinary prop for function components, so `forwardRef` is no longer needed: `function Input({ ref, ...props }) { return <input ref={ref} {...props} /> }`.",
          "**Callback refs** receive the node when it is attached and can return a cleanup function (React 19) that runs when it is detached.",
          "`useImperativeHandle` exposes a limited API (`focus`, `scrollToEnd`) instead of the whole DOM node.",
        ),
        trap("Don't read or write `ref.current` during rendering (other than lazy initialisation). The value isn't tracked, so the UI won't update, and concurrent rendering can run a render that is thrown away. Read refs in effects and event handlers."),
      ],
      demo: { id: "refs-lab", hint: "Focus, measure, and count renders: the ref changes without re-rendering anything." },
      goodToHear: ["Mutable `{ current }` that persists", "Changing it doesn't re-render", "DOM access: focus, measure, scroll", "Instance values: timers, previous value", "`ref` as a prop in React 19", "Not during render"],
      links: [
        { title: "react.dev: Referencing values with refs", url: "https://react.dev/learn/referencing-values-with-refs" },
        { title: "react.dev: Manipulating the DOM with refs", url: "https://react.dev/learn/manipulating-the-dom-with-refs" },
      ],
    },
    {
      id: "callback-refs-vs-finddomnode",
      question: "Which is the preferred option between callback refs and findDOMNode()?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "Callback refs (or ref objects). `findDOMNode` was deprecated in StrictMode for years and **removed in React 19**. It reached through a component to whatever DOM node it happened to render first, which broke encapsulation, returned only one node, didn't work with fragments and was incompatible with concurrent rendering.",
      body: [
        tsx(`
function MeasuredBox({ children }: { children: ReactNode }) {
  const [height, setHeight] = useState(0);

  const measure = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(() => setHeight(node.getBoundingClientRect().height));
    observer.observe(node);
    return () => observer.disconnect(); // React 19: cleanup when the node detaches
  }, []);

  return (
    <div ref={measure}>
      {children}
      <small>{Math.round(height)} px tall</small>
    </div>
  );
}
`),
        list(
          "A **ref object** (`useRef`) is enough when you only need the node later, in an effect or a handler.",
          "A **callback ref** is right when you need to act the moment the node appears or changes: measure it, observe it, focus it.",
          "To reach a DOM node inside a child component, the child passes `ref` to it: as a prop in React 19, through `forwardRef` before that.",
        ),
      ],
      demo: { id: "refs-lab", hint: "The measuring box uses a callback ref: resize it and the reading updates." },
      goodToHear: ["`findDOMNode` is removed in React 19", "It broke encapsulation and concurrent rendering", "Callback refs run on attach and detach", "Ref objects for later access", "Pass refs explicitly to children"],
      links: [{ title: "react.dev: React 19 upgrade guide (removed APIs)", url: "https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-finddomnode" }],
    },
    {
      id: "portals",
      question: "What are portals in React?",
      topics: ["react", "javascript"],
      level: "senior",
      short:
        "`createPortal(children, domNode)` renders children into a different DOM node, typically `document.body`, while they stay in the same place in the **React** tree. So a modal or tooltip escapes its parent's `overflow: hidden` and stacking context, but still receives context and its events still bubble to its React ancestors.",
      body: [
        tsx(`
import { createPortal } from "react-dom";

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="modal" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
`),
        list(
          "**Use for** modals, popovers, tooltips, dropdowns and toasts that must not be clipped by an ancestor.",
          "**Event bubbling follows the React tree**: a click inside the portal reaches an `onClick` on the component that rendered it, even though the DOM nodes are elsewhere.",
          "**Accessibility is your job**: focus moving into the dialog, Escape to close, focus returning to the trigger, the background made inert.",
          "Native alternatives now cover many cases: `<dialog>` with `showModal()` renders in the top layer, as does the `popover` attribute.",
        ),
        say("A portal changes where the DOM goes, not where the component lives: context, state and events behave as if it never moved."),
      ],
      demo: { id: "portal", hint: "Open the tooltip inside the clipped box, first inline, then through a portal." },
      goodToHear: ["Render into another DOM node", "Stays in the React tree", "Escapes overflow and z-index", "Events bubble through React ancestors", "Focus management and native `<dialog>`"],
      links: [{ title: "react.dev: createPortal", url: "https://react.dev/reference/react-dom/createPortal" }],
    },
  ],
};
