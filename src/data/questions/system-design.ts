import { QuizQuestion } from '../types';

export const SYSTEM_DESIGN_QUESTIONS: QuizQuestion[] = [
  {
    "id": "react-what-is-the-difference-between-controlled-and-uncontrol",
    "title": "What is the difference between controlled and uncontrolled components?",
    "prompt": "What is the difference between controlled and uncontrolled components?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeSnippet": "import { useState } from 'react'; \n\nfunction App() { \n  const [value, setValue] = useState(''); \n\n  return ( \n    <div> \n      <h3>Controlled Component</h3> \n      <input name=\"name\" value={name} onChange={(e) => setValue(e.target.value)} />\n      <button onClick={() => console.log(value)}>Get Value</button> \n    </div> \n  ); \n}\n\nimport { useRef } from 'react'; \n\nfunction App() { \n  const inputRef = useRef(null); \n\n  return ( \n    <div className=\"App\"> \n      <h3>Uncontrolled Component</h3> \n      <input type=\"text\" name=\"name\" ref={inputRef} /> \n      <button onClick={() => console.log(inputRef.current.value)}>Get Value</button> \n    </div> \n  ); \n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Controlled components cannot be modified by user keystrokes; uncontrolled components accept user input.",
        "isCorrect": false,
        "explanation": "Tempting if you equate controlled with disabled, but both input kinds accept typing. A controlled input routes each keystroke through `onChange` into state and back to `value`; it is not frozen."
      },
      {
        "id": "B",
        "text": "Controlled components are only used in Next.js Server Components; uncontrolled components are Client Components.",
        "isCorrect": false,
        "explanation": "The names sound server-ish, but controlled vs uncontrolled is a client-side form pattern that predates Server Components and is unrelated to where the component renders."
      },
      {
        "id": "C",
        "text": "Controlled components require Redux or MobX; uncontrolled components use local useState.",
        "isCorrect": false,
        "explanation": "Controlled only means the value lives in React state; any `useState` qualifies. No external store like Redux or MobX is required."
      },
      {
        "id": "D",
        "text": "Controlled components have their value driven by React state via value and onChange, while uncontrolled components let the DOM manage state via ref.",
        "isCorrect": true,
        "explanation": "Correct. A controlled input derives its `value` from state and reports changes via `onChange`, while an uncontrolled input keeps its value in the DOM and exposes it through a `ref`."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A controlled component binds its `value` to React state and updates that state in `onChange`, so React is the single source of truth. An uncontrolled component lets the DOM node keep its own value and you read it on demand through a `ref`. In the snippet the first input is controlled; the second reads `inputRef.current.value` only when the button is clicked.\n\nIn practice the controlled form re-renders on every keystroke, which is what lets you validate, format, or disable the submit button live. The uncontrolled form skips those renders and matches plain HTML behaviour, so it is handy for file inputs or when integrating a non-React widget.\n\nThe nuance an interviewer probes: a controlled input needs both `value` and `onChange`; supply `value` without `onChange` and React locks the field read-only and warns. Switching an input between controlled and uncontrolled across renders (value going from `undefined` to a string) triggers the same warning.",
    "interviewLine": "I reach for controlled inputs by default because binding `value` and `onChange` makes React the source of truth, which is what lets me validate and format as the user types.",
    "misconception": "Thinking controlled means the user cannot type, when it actually means every keystroke is routed through React state before it reappears on screen.",
    "hints": [
      "Look at where each input's value lives between keystrokes.",
      "Ask which input re-renders on every character and which only hands you a value when you ask.",
      "One of these inputs never calls `onChange` at all."
    ],
    "source": "44-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice the controlled input re-renders each keystroke so the counter stays live.",
      "language": "tsx",
      "code": "function NameField() {\n  const [name, setName] = useState('');\n  return (\n    <label>\n      Name\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <span>{name.length} chars</span>\n    </label>\n  );\n}"
    }
  },
  {
    "id": "react-what-are-props-in-react",
    "title": "What are props in React?",
    "prompt": "What are props in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "// Parent component\nconst Parent = () => {\n  const data = \"Hello, World!\";\n\n  return (\n    <div>\n      <Child data={data} />\n    </div>\n  );\n};\n\n// Child component\nconst Child = ({ data }) => {\n  return <div>{data}</div>;\n};",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Mutable internal variables that a child component can directly modify and write back to its parent.",
        "isCorrect": false,
        "explanation": "This describes two-way binding, which React avoids. A child cannot write to its props; to affect the parent it invokes a callback the parent supplied."
      },
      {
        "id": "B",
        "text": "Immutable inputs passed from a parent component to a child component to customize its rendering and behavior.",
        "isCorrect": true,
        "explanation": "Correct. Props are read-only values a parent passes to a child to configure what it renders, keeping data flowing in one direction."
      },
      {
        "id": "C",
        "text": "Global browser cookies automatically synchronized across all open browser tabs.",
        "isCorrect": false,
        "explanation": "Props live in React's in-memory tree and are passed as JSX attributes; they have nothing to do with browser cookies or cross-tab storage."
      },
      {
        "id": "D",
        "text": "Private component state variables initialized with the useProps hook.",
        "isCorrect": false,
        "explanation": "There is no `useProps` hook. A function component receives props as its first argument, not from a hook call."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Props are the inputs a parent passes to a child through JSX attributes. In the snippet `Parent` passes `data` to `<Child data={data} />`, and `Child` reads it as a destructured parameter. React treats props as read-only inside the child: you render from them, but you never assign back to them.\n\nThis read-only rule is what preserves unidirectional data flow. A child that wants to change something a parent owns calls a function prop the parent passed down, so the parent updates its state and re-renders the child with new props. Mutating `props.data = 'x'` would desync the UI from the data and React warns against it.\n\nThe edge an interviewer explores: props can be any JavaScript value, including functions and elements. `children` is just a prop with special JSX placement, and default values come from default parameters, not from a separate API.",
    "interviewLine": "I describe props as the read-only inputs a parent hands a child; if the child needs to change something, it calls a callback prop so the owner updates and re-renders.",
    "misconception": "Believing a child can edit the props it receives, rather than treating them as a read-only snapshot owned by the parent.",
    "hints": [
      "Follow the value from `Parent` into `Child`.",
      "Ask who is allowed to change that value and who only reads it.",
      "The child here never writes anything back."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the child reports changes through a callback prop instead of mutating props.",
      "language": "tsx",
      "code": "function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {\n  return <button onClick={onToggle}>{on ? 'On' : 'Off'}</button>;\n}\n\nfunction Panel() {\n  const [on, setOn] = useState(false);\n  return <Toggle on={on} onToggle={() => setOn((v) => !v)} />;\n}"
    }
  },
  {
    "id": "react-what-is-a-state-manager-and-which-ones-have-you-worked",
    "title": "What is a state manager and which ones have you worked with or know?",
    "prompt": "What is a state manager and which ones have you worked with or know?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A centralized store architecture (e.g. Redux, Zustand, MobX) that decouples shared state from UI component hierarchies and avoids deep prop drilling.",
        "isCorrect": true,
        "explanation": "Correct. A state manager keeps shared state in a central store with selective subscriptions, so components across the tree stay in sync without prop drilling."
      },
      {
        "id": "B",
        "text": "A compiler plugin that pre-renders every component to static HTML at build time so the client never manages state at runtime.",
        "isCorrect": false,
        "explanation": "This confuses application state with hardware memory. State managers are userland JavaScript libraries, not RAM allocators."
      },
      {
        "id": "C",
        "text": "A browser DevTools panel that visualizes component state but cannot read, write, or share it between parts of the application.",
        "isCorrect": false,
        "explanation": "That describes a styling tool. State managers hold data and update logic; they do not rewrite CSS at runtime."
      },
      {
        "id": "D",
        "text": "A routing library that stores shared data in the URL exclusively, replacing in-memory state for every value an app needs.",
        "isCorrect": false,
        "explanation": "Schema migrations are a backend database concern. State managers operate on in-memory client state, not SQL tables."
      }
    ],
    "correctAnswer": "A",
    "explanation": "A state manager is a library that holds shared application state outside the component tree and lets any component read or update it without threading props through every intermediate level. Redux, Zustand, and MobX are common examples; React's own Context plus `useReducer` covers many cases too.\n\nThe practical payoff is decoupling: distant components subscribe to the slice they care about, so a cart badge in the header and a cart page deep in the tree stay in sync without a shared ancestor passing props down. It also centralizes the update logic, which makes state changes easier to trace and test.\n\nWhat an interviewer digs into: not all state belongs in a global store. Server data is better handled by a cache like TanStack Query, URL state belongs in the router, and transient UI state stays local. Over-globalizing adds boilerplate and re-renders.",
    "interviewLine": "I use a state manager for data that many disconnected components share, so they subscribe to one source of truth instead of lifting state through unrelated ancestors.",
    "misconception": "Assuming every piece of state should live in a global store, instead of reserving it for data genuinely shared across distant parts of the tree.",
    "hints": [
      "Think about state that two far-apart components both need.",
      "Ask what problem a central store solves that lifting state does not.",
      "The answer is about application data flow, not styling or hardware."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice both components read the same store without any shared parent passing props.",
      "language": "typescript",
      "code": "import { create } from 'zustand';\n\nconst useCart = create<{ count: number; add: () => void }>((set) => ({\n  count: 0,\n  add: () => set((s) => ({ count: s.count + 1 })),\n}));\n\n// Header badge and product page both call useCart() independently.\nexport function badgeCount() {\n  return useCart.getState().count;\n}"
    }
  },
  {
    "id": "react-in-which-cases-can-you-use-local-state-and-when-should",
    "title": "In which cases can you use local state and when should you use global state?",
    "prompt": "In which cases can you use local state and when should you use global state?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Always hoist all state to the root <App> component and pass everything down via props to every child.",
        "isCorrect": false,
        "explanation": "Hoisting all state to the root causes prop drilling and makes trivial updates re-render the whole app; colocate state instead."
      },
      {
        "id": "B",
        "text": "Store all temporary text input keystrokes in global Redux, and store user authentication tokens in local component state.",
        "isCorrect": false,
        "explanation": "This inverts the right split: ephemeral keystrokes should stay local, while cross-route data like auth tokens is what belongs in shared state."
      },
      {
        "id": "C",
        "text": "Local state is deprecated in React 19 in favor of mandatory global SQLite client databases.",
        "isCorrect": false,
        "explanation": "Local state is not deprecated; `useState` and `useReducer` remain the primitives React is built on."
      },
      {
        "id": "D",
        "text": "Use local state for ephemeral UI state encapsulated in a single component (form inputs, toggles); use global state for data shared across multiple distant branches (auth, cart).",
        "isCorrect": true,
        "explanation": "Correct. Keep ephemeral, single-component state local and reserve global state for data shared across distant branches like auth or cart."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Local state (`useState`, `useReducer`) belongs to one component and the subtree it renders. Use it for ephemeral UI concerns: a form field, a dropdown's open flag, a hover state. Global state belongs in a store or Context when data is read or written by components in distant, unrelated branches of the tree, such as the authenticated user or a shopping cart.\n\nColocating state next to where it is used keeps components self-contained, reusable, and cheap to re-render, because only that subtree updates. Lifting everything to the root forces broad re-renders and heavy prop drilling for values most children never touch.\n\nThe judgement call an interviewer wants: start local, lift only when a second component genuinely needs the same value, and reach for global state only when lifting would cross unrelated branches. Server data is a separate category best handled by a fetching cache.",
    "interviewLine": "I keep state as local as possible and only lift to a shared store when unrelated branches of the tree need the same value, like auth or a cart.",
    "misconception": "Treating global state as the default, when the better rule is to keep state local and lift it only when distant components truly share it.",
    "hints": [
      "Ask how many components actually read a given value.",
      "Consider the cost of re-rendering the whole app for a single toggle.",
      "Shared-across-the-app and single-component are the two buckets."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the toggle stays local because nothing outside this component needs it.",
      "language": "tsx",
      "code": "function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {\n  const [open, setOpen] = useState(false);\n  return (\n    <section>\n      <button onClick={() => setOpen((v) => !v)}>{title}</button>\n      {open && <div>{children}</div>}\n    </section>\n  );\n}"
    }
  },
  {
    "id": "react-which-pattern-does-redux-implement",
    "title": "Which pattern does Redux implement?",
    "prompt": "Which pattern does Redux implement?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "The Singleton Factory pattern that compiles JSX into native WebGL shaders.",
        "isCorrect": false,
        "explanation": "Redux manages state; it has nothing to do with compiling JSX or WebGL shaders. This option invents an unrelated mechanism."
      },
      {
        "id": "B",
        "text": "The Active Record pattern where state objects save themselves directly to SQL databases.",
        "isCorrect": false,
        "explanation": "Active Record is an ORM pattern where objects persist themselves to a database. Redux state lives in memory and is updated by pure reducers."
      },
      {
        "id": "C",
        "text": "The Model-View-Controller (MVC) pattern with bidirectional two-way data binding.",
        "isCorrect": false,
        "explanation": "Redux deliberately avoids MVC's two-way binding; its whole premise is strict unidirectional flow, so this is the opposite of what it does."
      },
      {
        "id": "D",
        "text": "The Flux architecture pattern, characterized by unidirectional data flow, a single store, action dispatching, and pure reducers.",
        "isCorrect": true,
        "explanation": "Correct. Redux follows Flux: unidirectional flow with a single store, dispatched actions, and pure reducers."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Redux implements the Flux pattern: a unidirectional data flow where views dispatch actions, pure reducers compute the next state from the previous state and the action, and a single store holds the result. Components then read updated state and re-render.\n\nBecause reducers are pure and the only way to change state is to dispatch an action, every transition is explicit and replayable. That is what makes Redux predictable and gives you time-travel debugging: the state at any moment is a deterministic fold of the action history.\n\nThe distinction an interviewer probes: Flux is unidirectional and rejects two-way binding, unlike classic MVC. Redux also simplifies original Flux by using one store and composed reducers instead of multiple stores coordinated by a dispatcher.",
    "interviewLine": "I'd call Redux a Flux implementation: state changes only through dispatched actions and pure reducers, which is exactly what makes transitions traceable and replayable.",
    "misconception": "Confusing Redux with bidirectional MVC, when Flux's defining trait is one-way flow through pure reducers.",
    "hints": [
      "Think about the direction data moves through a Redux app.",
      "Ask what guarantees every state change is traceable.",
      "It is not the two-way binding of classic MVC."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the reducer is pure: same inputs always yield the same next state.",
      "language": "typescript",
      "code": "type Action = { type: 'inc' } | { type: 'add'; by: number };\n\nfunction counter(state = 0, action: Action): number {\n  switch (action.type) {\n    case 'inc':\n      return state + 1;\n    case 'add':\n      return state + action.by;\n    default:\n      return state;\n  }\n}"
    }
  },
  {
    "id": "react-how-to-access-a-variable-in-mobx-state",
    "title": "How to access a variable in Mobx state?",
    "prompt": "How to access a variable in Mobx state?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "import { observable, computed } from 'mobx';\n\nclass MyStore {\n  @observable myVariable = 'Hello Mobx';\n\n  @computed get capitalizedVariable() {\n    return this.myVariable.toUpperCase();\n  }\n}\n\nconst store = new MyStore();\nconsole.log(store.capitalizedVariable); // Output: HELLO MOBX\n\nstore.myVariable = 'Hi Mobx';\nconsole.log(store.capitalizedVariable); // Output: HI MOBX",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Wrap the component in `observer` and read the property directly from the observable store object (e.g. `store.myVariable`).",
        "isCorrect": true,
        "explanation": "Correct. Wrap the component in `observer` and read the observable directly with dot access; MobX tracks the read and re-renders on change."
      },
      {
        "id": "B",
        "text": "Inject the variable into `window.localStorage` and read it synchronously via JSON parsing.",
        "isCorrect": false,
        "explanation": "That reaches for persisted storage. MobX state lives in memory on the store instance and is read by direct property access."
      },
      {
        "id": "C",
        "text": "Execute `store.selectVariableAsync('myVariable')` inside a `useEffect` on every render.",
        "isCorrect": false,
        "explanation": "MobX reads are synchronous and direct. There is no async selector method, and running one every render would be wasteful and wrong."
      },
      {
        "id": "D",
        "text": "Dispatch an action `dispatch({ type: 'GET_VARIABLE' })` and wait for a callback.",
        "isCorrect": false,
        "explanation": "Dispatching actions and awaiting callbacks is a Redux-style flow. In MobX, actions mutate state but reading is just property access."
      }
    ],
    "correctAnswer": "A",
    "explanation": "In MobX you read an observable by plain property access on the store instance, for example `store.myVariable`. To make a component react to that value, you wrap it in `observer`; MobX then tracks which observables the component read during render and re-renders it when any of them change.\n\nThe tracking is automatic and synchronous: `store.capitalizedVariable` recomputes lazily whenever `myVariable` changes because the `computed` getter declared a dependency simply by reading it. You never dispatch or select; you read the property directly.\n\nThe subtlety an interviewer checks: the reactivity comes from `observer` plus reading observables during render. Read an observable outside a tracked context and no subscription forms, so the component will not update.",
    "interviewLine": "In MobX I read observables with plain property access inside an `observer` component, and MobX subscribes the component to exactly the values it touched during render.",
    "misconception": "Expecting MobX to need selectors or dispatch to read state, when a tracked `observer` component simply reads the observable property directly.",
    "hints": [
      "Look at how the console reads the value in the snippet.",
      "Ask what makes a component re-render when the observable changes.",
      "No dispatch or async selector is involved."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the component reads the observable directly and re-renders when it changes.",
      "language": "tsx",
      "code": "import { makeAutoObservable } from 'mobx';\nimport { observer } from 'mobx-react-lite';\n\nclass Counter { value = 0; constructor() { makeAutoObservable(this); } inc() { this.value++; } }\nconst counter = new Counter();\n\nexport const View = observer(() => (\n  <button onClick={() => counter.inc()}>{counter.value}</button>\n));"
    }
  },
  {
    "id": "react-what-is-props-drilling",
    "title": "What is props drilling?",
    "prompt": "What is props drilling?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "// Parent component\nconst Parent = () => {\n  const data = \"Hello, World!\";\n\n  return (\n    <div>\n      <ChildA data={data} />\n    </div>\n  );\n};\n\n// Intermediate ChildA component\nconst ChildA = ({ data }) => {\n  return (\n    <div>\n      <ChildB data={data} />\n    </div>\n  );\n};\n\n// Leaf ChildB component\nconst ChildB = ({ data }) => {\n  return <div>{data}</div>;\n};",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "The process of passing props through intermediate components that do not need the data themselves, solely to deliver it to deeply nested children.",
        "isCorrect": true,
        "explanation": "Correct. Prop drilling is routing a prop through intermediate components that do not use it, just to reach a deep descendant."
      },
      {
        "id": "B",
        "text": "A validation step that checks the types of props at each level of the tree and throws when an intermediate component forwards the wrong shape.",
        "isCorrect": false,
        "explanation": "Runtime prop validation is PropTypes or TypeScript. Prop drilling is about how a value travels through the tree, not about checking its type."
      },
      {
        "id": "C",
        "text": "An optimization where React preloads a deeply nested component's props into memory before the parent has finished rendering.",
        "isCorrect": false,
        "explanation": "Prop drilling is a structural friction in the component tree, not an image-loading optimization."
      },
      {
        "id": "D",
        "text": "A build-time transform that flattens a deep component tree into a single component so props no longer need to be passed down.",
        "isCorrect": false,
        "explanation": "Generating types from a schema is a tooling concern. Prop drilling describes prop propagation through unneeded layers."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Prop drilling is passing a prop down through components that do not use it themselves, only so a deeply nested descendant can receive it. In the snippet `data` travels Parent to ChildA to ChildB, but ChildA never reads it; it is just a conduit.\n\nThe cost is coupling and noise: intermediate components grow props they do not care about, refactors ripple through every layer, and renaming the data touches files that have no stake in it. It is not a bug, but it signals the data's owner and its consumer are too far apart.\n\nThe fix an interviewer expects you to name: Context for ambient values, component composition (passing elements through `children`) to shorten the chain, or a state store for genuinely global data. Each removes the pass-through layers.",
    "interviewLine": "Prop drilling is when a value passes through components that do not use it; I shorten the chain with composition or lift it to Context when many layers need it.",
    "misconception": "Seeing prop drilling as a feature or a bug, when it is simply the smell of a value whose owner and consumer sit too far apart.",
    "hints": [
      "Watch which component in the chain actually reads `data`.",
      "Ask what the middle components gain from receiving the prop.",
      "The problem is the pass-through layers, not the data itself."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice composition passes the element through so the middle layer needs no data prop.",
      "language": "tsx",
      "code": "function Layout({ children }: { children: React.ReactNode }) {\n  return <main className=\"wrap\">{children}</main>;\n}\n\nfunction Page() {\n  const user = { name: 'Ada' };\n  // Layout stays generic; it never sees `user`.\n  return <Layout><Profile user={user} /></Layout>;\n}"
    }
  },
  {
    "id": "system_design-what-are-the-benefits-of-using-ssr",
    "title": "What are the benefits of using SSR?",
    "prompt": "What are the benefits of using SSR?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Faster First Contentful Paint (FCP), enhanced Search Engine Optimization (SEO) with indexable HTML, and better performance on low-power devices.",
        "isCorrect": true,
        "explanation": "Correct. SSR sends ready-to-view HTML, which speeds first paint, gives crawlers indexable content, and eases load on weak devices."
      },
      {
        "id": "B",
        "text": "Completely eliminates the need for any client-side JavaScript or browser interaction.",
        "isCorrect": false,
        "explanation": "SSR still ships JavaScript for hydration; without it the server HTML is not interactive. It reduces, not eliminates, client work."
      },
      {
        "id": "C",
        "text": "Reduces backend server CPU usage to zero because all rendering is offloaded to the user's GPU.",
        "isCorrect": false,
        "explanation": "This is backwards: rendering HTML per request raises server CPU rather than offloading it to the client GPU."
      },
      {
        "id": "D",
        "text": "Allows React components to run in browsers that have JavaScript completely disabled with full interactivity.",
        "isCorrect": false,
        "explanation": "Static HTML is readable without JS, but handlers and state need JavaScript, so full interactivity without JS is not something SSR provides."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Server-side rendering produces full HTML on the server for each request, so the browser paints meaningful content before any client JavaScript runs. That improves first contentful paint, gives crawlers indexable markup without executing scripts, and helps low-powered devices that are slow to parse large bundles.\n\nIn real apps this means a product page shows text and images immediately, then hydration attaches event handlers to make it interactive. Users on slow networks see content sooner, and SEO improves because the initial response already contains the content.\n\nThe trade-off an interviewer wants named: SSR shifts work to the server (more CPU per request) and still ships JavaScript for hydration, so it is not free interactivity without JS. Caching and streaming are how you keep the server cost in check.",
    "interviewLine": "SSR's win is a fast, indexable first paint because the server ships real HTML; I just weigh that against the extra per-request CPU and plan caching accordingly.",
    "misconception": "Thinking SSR removes the need for client JavaScript, when hydration still runs on the client to make the server HTML interactive.",
    "hints": [
      "Think about what the browser can show before any JS executes.",
      "Ask who does the rendering work and what that costs.",
      "SSR still ships JavaScript to make the page interactive."
    ],
    "source": "44-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/rendering",
    "example": {
      "caption": "Notice the server component fetches and renders HTML before any client JS is involved.",
      "language": "tsx",
      "code": "// app/product/[id]/page.tsx — runs on the server\nexport default async function Page({ params }: { params: { id: string } }) {\n  const product = await fetch(`https://api.shop.com/p/${params.id}`).then((r) => r.json());\n  return (\n    <article>\n      <h1>{product.name}</h1>\n      <p>{product.description}</p>\n    </article>\n  );\n}"
    }
  },
  {
    "id": "system_design-explain-conditional-rendering-in-react",
    "title": "Explain conditional rendering in React.",
    "prompt": "Explain conditional rendering in React., explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Conditionally injecting CSS `@media` query stylesheets into the document head so elements appear or hide based on viewport size.",
        "isCorrect": false,
        "explanation": "Injecting media-query stylesheets is responsive CSS, not conditional rendering. Conditional rendering decides which elements React mounts."
      },
      {
        "id": "B",
        "text": "Rendering different JSX elements or components based on JavaScript expressions, such as ternary operators (`condition ? <A /> : <B />`), logical `&&`, or `if/return` statements.",
        "isCorrect": true,
        "explanation": "Correct. You choose which JSX to return using ordinary JavaScript: ternaries, logical `&&`, or `if`/`return`."
      },
      {
        "id": "C",
        "text": "Toggling elements with a dedicated template directive like `v-if` that React evaluates before building the virtual DOM.",
        "isCorrect": false,
        "explanation": "`v-if` is Vue's directive. React has no template directives; it uses plain JavaScript expressions in JSX."
      },
      {
        "id": "D",
        "text": "Deferring element creation to a background Web Worker so expensive branches render off the main thread when a user clicks.",
        "isCorrect": false,
        "explanation": "Web Workers are about threading. Conditional rendering is about which elements appear, not where code runs."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Conditional rendering in React is just JavaScript deciding which JSX to return. Because JSX is expressions, you branch with ternaries (`cond ? <A /> : <B />`), short-circuit with `cond && <A />`, or write `if`/`return` statements before the JSX. React renders whatever the branch produces and nothing for `null`, `false`, or `undefined`.\n\nThis matters because the chosen branch controls which elements mount and unmount. When a condition flips, React reconciles the old and new trees; a branch that disappears unmounts its components and runs their cleanup, while a branch that appears mounts fresh.\n\nThe trap an interviewer probes: `count && <List />` renders a literal `0` when `count` is `0`, because `0` is falsy but still a renderable value. Prefer an explicit boolean (`count > 0 && ...`) to avoid leaking numbers into the UI.",
    "interviewLine": "Conditional rendering is just JavaScript picking the JSX to return, so I lean on ternaries and guarded `&&` while watching the falsy-`0` trap.",
    "misconception": "Treating conditional rendering as special React syntax, when it is ordinary JavaScript control flow choosing which JSX to return.",
    "hints": [
      "Remember JSX branches are plain JavaScript expressions.",
      "Ask what happens to a component when its branch stops rendering.",
      "Guarding with a non-boolean like a number can leak a value into the UI."
    ],
    "source": "interviewbit-70",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the explicit boolean avoids rendering a stray 0 when the list is empty.",
      "language": "tsx",
      "code": "function Inbox({ messages }: { messages: string[] }) {\n  return (\n    <div>\n      {messages.length > 0 ? (\n        <ul>{messages.map((m) => <li key={m}>{m}</li>)}</ul>\n      ) : (\n        <p>No messages</p>\n      )}\n    </div>\n  );\n}"
    }
  },
  {
    "id": "system_design-what-are-the-advantages-of-using-react",
    "title": "What are the advantages of using React?",
    "prompt": "What are the advantages of using React?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "It replaces backend databases and web servers entirely, letting client-side components persist and query data without any API.",
        "isCorrect": false,
        "explanation": "React runs on the client (and server via SSR) but does not replace databases or servers; apps still need a backend for storage and logic."
      },
      {
        "id": "B",
        "text": "It compiles components directly into GPU machine code so rendering bypasses the browser's JavaScript engine for raw speed.",
        "isCorrect": false,
        "explanation": "React executes in JavaScript engines like V8, not as GPU machine code. This option invents a compilation path React does not use."
      },
      {
        "id": "C",
        "text": "It guarantees zero network latency for HTTP requests by caching every possible API response in the virtual DOM ahead of time.",
        "isCorrect": false,
        "explanation": "No library can guarantee zero network latency; physical transmission time is outside React's control."
      },
      {
        "id": "D",
        "text": "Reusable component-based architecture, efficient Virtual DOM diffing, rich open-source ecosystem, predictable unidirectional data flow, and versatile cross-platform support (React Native, SSR).",
        "isCorrect": true,
        "explanation": "Correct. Reusable components, virtual-DOM diffing, unidirectional flow, a rich ecosystem, and cross-platform reach are React's real advantages."
      }
    ],
    "correctAnswer": "D",
    "explanation": "React's core advantages are a reusable component model, a declarative rendering layer backed by virtual-DOM diffing, predictable unidirectional data flow, a large ecosystem, and reach beyond the web via React Native and SSR. You describe the UI for a given state and React reconciles the minimal DOM changes.\n\nIn day-to-day work this means you compose small components into larger ones, share them across features, and trust React to update only what changed when state moves. The declarative model keeps the UI in sync with state without manual DOM scripting.\n\nThe nuance an interviewer wants: the virtual DOM is not magically fast, it is a diffing strategy that avoids unnecessary DOM work. React is a view library, not a full framework, so routing, data fetching, and build tooling come from the surrounding ecosystem.",
    "interviewLine": "I'd point to React's strengths as composable components and a declarative model where the virtual DOM diffs state changes down to the minimal DOM updates.",
    "misconception": "Believing the virtual DOM makes React inherently fast, when it is a diffing strategy that minimizes DOM work, not a performance guarantee.",
    "hints": [
      "Think about why reusing a component across features is cheap.",
      "Ask what the virtual DOM actually buys you.",
      "React is a view library, so some advantages come from its ecosystem."
    ],
    "source": "interviewbit-70",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice one small component is reused with different props to render distinct UI.",
      "language": "tsx",
      "code": "function Badge({ label, tone }: { label: string; tone: 'ok' | 'warn' }) {\n  return <span className={`badge badge-${tone}`}>{label}</span>;\n}\n\nfunction Row() {\n  return (\n    <>\n      <Badge label=\"Active\" tone=\"ok\" />\n      <Badge label=\"Expiring\" tone=\"warn\" />\n    </>\n  );\n}"
    }
  },
  {
    "id": "react-how-to-pass-data-between-sibling-components-using-react",
    "title": "How to pass data between sibling components using React router?",
    "prompt": "How to pass data between sibling components using React router?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "import React, { Component } from react;\nclass AppDemo extends Component {\nrender() {\n  return (\n    <Router>\n      <div className=\"AppDemo\">\n      <ul>\n        <li>\n          <NavLink to=\"/\"  activeStyle={{ color:'blue' }}>Home</NavLink>\n        </li>\n        <li>\n          <NavLink to=\"/about\"  activeStyle={{ color:'blue' }}>About\n </NavLink>\n        </li>\n </ul>\n             <Route path=\"/about/:aboutId\" component={AboutPage} />\n             <Route path=\"/about\" component={AboutPage} />\n             <Route path=\"/\" component={HomePage} />\n      </div>\n    </Router>\n  );\n}\n}\nexport default AppDemo;\n\nexport default function HomePage(props) {\n const handleClick = (data) => {\n  props.history.push('/about/' + data);\n }\nreturn (\n  <div>\n    <button onClick={() => handleClick('DemoButton')}>To About</button>\n  </div>\n)\n}\n\nexport default function AboutPage(props) {\nif(!props.match.params.aboutId) {\n    return <div>No Data Yet</div>\n}\nreturn (\n  <div>\n    {`Data obtained from HomePage is ${props.match.params.aboutId}`}\n  </div>\n)\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Open a local peer-to-peer channel between the two sibling components so one can stream values directly to the other at runtime.",
        "isCorrect": false,
        "explanation": "Bluetooth peer connections are unrelated to passing data between components; routing and shared state do this in web apps."
      },
      {
        "id": "B",
        "text": "Read the sibling's private state directly through `siblingComponent.state`, since routed components expose their internals to peers.",
        "isCorrect": false,
        "explanation": "React components cannot reach into a sibling's internal state. Siblings communicate through shared state like the router, not direct access."
      },
      {
        "id": "C",
        "text": "Navigate with route parameters (`history.push('/route/' + data)`) or query parameters, which the sibling route component reads from `params`.",
        "isCorrect": true,
        "explanation": "Correct. The URL is shared state: one sibling navigates with route or query params, and the other route component reads them from `params`."
      },
      {
        "id": "D",
        "text": "Assign the value to a global `window.data` property, which both sibling routes watch and re-render from whenever it changes.",
        "isCorrect": false,
        "explanation": "Writing to `window.data` is non-reactive, so changes do not trigger re-renders; the router or a store is the right channel."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Sibling components mapped to different routes do not talk to each other directly; they share data through the router. One sibling writes to the URL via `history.push('/about/' + data)` (or query params or router state), and the other reads it from its route params. In the snippet `HomePage` pushes a value into the path and `AboutPage` reads `props.match.params.aboutId`.\n\nThis works because the URL is shared state the router owns: navigating updates it, and the matched route component re-renders with the new params. It keeps siblings decoupled while still passing information between them.\n\nThe design choice an interviewer probes: route params and query strings are bookmarkable and shareable, router `state` is transient and hidden from the URL, and anything larger or persistent belongs in Context or a store. Note the APIs here are React Router v5-era; v6 uses `useParams` and `useNavigate`.",
    "interviewLine": "I pass data between routed siblings through the URL—path or query params the router owns—so the receiving route re-renders with the new params and the siblings stay decoupled.",
    "misconception": "Expecting sibling components to reference each other directly, when they coordinate through shared state such as the URL the router owns.",
    "hints": [
      "Notice where `HomePage` puts the value before `AboutPage` reads it.",
      "Ask what shared thing both sibling routes can see.",
      "They never touch each other's state directly."
    ],
    "source": "interviewbit-70",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
    "example": {
      "caption": "Notice the destination reads the value from the URL params the router populated.",
      "language": "tsx",
      "code": "import { useNavigate, useParams } from 'react-router-dom';\n\nfunction Home() {\n  const navigate = useNavigate();\n  return <button onClick={() => navigate('/about/42')}>Open</button>;\n}\n\nfunction About() {\n  const { id } = useParams();\n  return <p>Got id {id} from the URL</p>;\n}"
    }
  },
  {
    "id": "system_design-what-is-react-and-what-are-its-main-features",
    "title": "What is React, and what are its main features?",
    "prompt": "What is React, and what are its main features?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A browser extension that imperatively injects jQuery plugins into web pages.",
        "isCorrect": false,
        "explanation": "React is not a browser extension or a jQuery wrapper; it is a declarative library that renders and reconciles UI from component state."
      },
      {
        "id": "B",
        "text": "A declarative, component-based JavaScript library for building user interfaces, featuring a Virtual DOM, unidirectional data flow, and JSX syntax.",
        "isCorrect": true,
        "explanation": "Correct. React is a declarative, component-based UI library with a virtual DOM, unidirectional data flow, and JSX."
      },
      {
        "id": "C",
        "text": "A full-stack MVC framework with built-in ORM, PostgreSQL database drivers, and server clustering tools.",
        "isCorrect": false,
        "explanation": "React is a view layer, not a full-stack MVC framework; it ships no ORM, database drivers, or server clustering."
      },
      {
        "id": "D",
        "text": "A compiler that converts CSS files into WebAssembly graphics pipelines.",
        "isCorrect": false,
        "explanation": "React manages UI in JavaScript/TypeScript; it does not compile CSS into WebAssembly graphics pipelines."
      }
    ],
    "correctAnswer": "B",
    "explanation": "React is a declarative, component-based JavaScript library for building user interfaces. You write components that return JSX describing the UI for the current state, and React keeps the DOM in sync through virtual-DOM reconciliation. Data flows one way, parent to child, via props.\n\nIn practice this lets you compose small, self-contained components, each managing its own state, into whole screens. The declarative model means you describe what the UI should be, not the step-by-step DOM mutations to get there, which React handles.\n\nThe distinction an interviewer wants: React is a view library, not a full framework. It intentionally leaves routing, data fetching, and build tooling to the ecosystem (or meta-frameworks like Next.js), which is why it is flexible but requires assembling pieces.",
    "interviewLine": "React is a declarative, component-based view library: I describe the UI for a given state in JSX, and its virtual DOM reconciles the real DOM to match.",
    "misconception": "Thinking React is a full framework, when it is a view library that leaves routing, data fetching, and tooling to the ecosystem.",
    "hints": [
      "Focus on what React itself provides versus what you add around it.",
      "Ask what 'declarative' means for how you write UI.",
      "It is a library, not a batteries-included framework."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the component declares UI from state; React handles the DOM updates.",
      "language": "tsx",
      "code": "function Clock() {\n  const [now, setNow] = useState(() => new Date());\n  useEffect(() => {\n    const id = setInterval(() => setNow(new Date()), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <time>{now.toLocaleTimeString()}</time>;\n}"
    }
  },
  {
    "id": "react-what-are-props-in-react-how-are-they-different-from-sta",
    "title": "What are props in React? How are they different from state?",
    "prompt": "What are props in React? How are they different from state?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Props may only hold string values passed as JSX attributes, while state is the only place a component can store numbers and objects.",
        "isCorrect": false,
        "explanation": "Both props and state accept any JavaScript type. The difference is ownership and mutability, not which primitive each one holds."
      },
      {
        "id": "B",
        "text": "Props are external, read-only parameters passed down from parents to configure a child; State is internal, mutable data managed within the component that triggers re-renders on change.",
        "isCorrect": true,
        "explanation": "Correct. Props are read-only inputs from a parent; state is private, mutable data a component owns and updates to trigger its own re-renders."
      },
      {
        "id": "C",
        "text": "Props are serialized and stored on the backend server between renders, while state is the client-only copy held in the browser.",
        "isCorrect": false,
        "explanation": "Both live in client memory during rendering. Neither props nor state is inherently a server-side value."
      },
      {
        "id": "D",
        "text": "Props can be reassigned directly by a child to update the parent, while state is strictly read-only and immutable everywhere.",
        "isCorrect": false,
        "explanation": "This inverts the rule: children treat props as read-only, and state is updated through setters, not immutable everywhere."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Props and state are both plain JavaScript data that drive rendering, but ownership differs. Props are passed in from a parent and are read-only to the receiving component; state is declared and owned inside the component and is the only thing it can change, through its setter. Both can hold any value: objects, arrays, functions, primitives.\n\nThe consequence is who can trigger a re-render. A component re-renders when its own state changes or when its parent passes new props. The child cannot mutate props to force an update; it must own the value as state or ask the parent to change it via a callback.\n\nThe nuance an interviewer probes: a value should be state in exactly one place. If two components need it, lift it to their common parent as state and pass it down as props, rather than duplicating state.",
    "interviewLine": "I distinguish props as read-only inputs from a parent from state, the value a component owns and updates, and I stress that ownership is what decides who can trigger a re-render.",
    "misconception": "Blurring the two by their type or location, when the real line is ownership: props come from the parent and are read-only, state is owned and mutated locally.",
    "hints": [
      "Ask who is allowed to change each value.",
      "Think about what causes a component to re-render.",
      "The distinction is ownership, not data type or storage location."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the parent owns state and passes a read-only slice down as a prop.",
      "language": "tsx",
      "code": "function Parent() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onInc={() => setCount((c) => c + 1)} />;\n}\n\nfunction Child({ count, onInc }: { count: number; onInc: () => void }) {\n  return <button onClick={onInc}>Clicked {count}</button>;\n}"
    }
  },
  {
    "id": "react-what-is-the-difference-between-controlled-and-uncontrol-2",
    "title": "What is the difference between Controlled and Uncontrolled React components?",
    "prompt": "What is the difference between Controlled and Uncontrolled React components?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeSnippet": "function ControlledInput() {  const [value, setValue] = React.useState('');  return (    <input      type=\"text\"      value={value}      onChange={(e) => setValue(e.target.value)}    />  );}\n\nfunction UncontrolledInput() {  const inputRef = React.useRef();  return <input type=\"text\" ref={inputRef} />;}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Controlled components run only inside backend Node.js scripts, while uncontrolled components are the versions rendered in the browser.",
        "isCorrect": false,
        "explanation": "Both are client-side form patterns rendered in the browser; neither is a backend Node concept."
      },
      {
        "id": "B",
        "text": "Controlled components cannot validate input as the user types, while uncontrolled components run validation automatically on every change.",
        "isCorrect": false,
        "explanation": "This is backwards: controlled inputs make live validation easier because every change passes through state before re-rendering."
      },
      {
        "id": "C",
        "text": "Uncontrolled components cannot be cleared or reset after submission, while controlled components reset themselves whenever the form submits.",
        "isCorrect": false,
        "explanation": "Uncontrolled inputs reset fine via a form reset or by assigning `ref.current.value`; being uncontrolled does not prevent clearing."
      },
      {
        "id": "D",
        "text": "In controlled components, input data is driven by React state via `value` and `onChange`; in uncontrolled components, the DOM maintains input state, accessed via `ref`.",
        "isCorrect": true,
        "explanation": "Correct. Controlled inputs derive `value` from state via `onChange`; uncontrolled inputs keep their value in the DOM and expose it through a `ref`."
      }
    ],
    "correctAnswer": "D",
    "explanation": "The controlled input binds `value` to React state and updates it in `onChange`, so React holds the current value; the uncontrolled input keeps its value in the DOM and you read it through `inputRef`. The snippet shows both: `ControlledInput` drives `value` from `useState`, while `UncontrolledInput` only attaches a `ref`.\n\nControlled inputs re-render each keystroke, which is what enables live validation, formatting, and a submit button that reacts to the current value. Uncontrolled inputs avoid those renders and behave like native HTML, which suits file inputs or integrating code outside React.\n\nThe subtlety an interviewer tests: a controlled input needs both `value` and `onChange`. Give it `value` alone and React makes it read-only and warns; let `value` flip between `undefined` and a string and React warns about switching controlled/uncontrolled mid-life.",
    "interviewLine": "The split is where the value lives: controlled inputs keep it in React state via `value` and `onChange`, uncontrolled ones leave it in the DOM and I read it with a `ref`.",
    "misconception": "Assuming the two differ in capability (validation or reset), when the real difference is only where the value lives: React state or the DOM.",
    "hints": [
      "Compare how each input in the snippet exposes its value.",
      "Ask which one re-renders on every keystroke.",
      "The difference is the storage location, not what the input can do."
    ],
    "source": "100-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice the uncontrolled input hands over its value only on submit, via the ref.",
      "language": "tsx",
      "code": "function SearchForm() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  function onSubmit(e: React.FormEvent) {\n    e.preventDefault();\n    console.log(inputRef.current?.value);\n  }\n  return (\n    <form onSubmit={onSubmit}>\n      <input ref={inputRef} defaultValue=\"\" />\n      <button>Search</button>\n    </form>\n  );\n}"
    }
  },
  {
    "id": "react-how-would-you-lift-the-state-up-in-a-react-application",
    "title": "How would you lift the state up in a React application, and why is it necessary?",
    "prompt": "How would you lift the state up in a React application, and why is it necessary?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "// Lifting state upconst Parent = () => {  const [counter, setCounter] = useState(0);\n  return (    <div>      <Child1 counter={counter} />      <Child2 setCounter={setCounter} />    </div>  );};\nconst Child1 = ({ counter }) => <h1>{counter}</h1>;const Child2 = ({ setCounter }) => (  <button onClick={() => setCounter((prev) => prev + 1)}>Increment</button>);",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Move the shared state to the closest common parent component and pass the state value and updater callback down to children via props.",
        "isCorrect": true,
        "explanation": "Correct. Move the shared value to the closest common parent and pass the value plus an updater callback down to the children."
      },
      {
        "id": "B",
        "text": "Convert both children into class components that inherit from a shared base class.",
        "isCorrect": false,
        "explanation": "React favors composition and props over class inheritance; sharing state does not require a common base class."
      },
      {
        "id": "C",
        "text": "Store the state directly on the global `window` object and force full page reloads.",
        "isCorrect": false,
        "explanation": "Writing to `window` and reloading bypasses React's declarative updates and destroys the user's session; this is not lifting state."
      },
      {
        "id": "D",
        "text": "Duplicate the state in both child components and synchronize them using `setInterval` polling.",
        "isCorrect": false,
        "explanation": "Duplicating state and polling to sync it causes drift and race conditions; the point of lifting is a single source of truth."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Lifting state up means moving a shared value out of individual children and into their nearest common ancestor, which then passes the value and an updater callback down as props. In the snippet `Parent` owns `counter`; `Child1` displays it and `Child2` increments it through `setCounter`, so both reflect one source of truth.\n\nThis matters when two components must stay in sync. If each kept its own copy, they would drift; a single owning parent guarantees they always show the same value and that updates flow through one place. It also removes the temptation to duplicate and manually synchronize state.\n\nThe trade-off an interviewer probes: lifting too high causes broad re-renders and prop drilling. Lift only to the closest common ancestor, and if the chain is long, consider Context or composition instead.",
    "interviewLine": "When two components must agree, I lift the value to their closest common parent so there is one source of truth, then pass it and an updater down as props.",
    "misconception": "Thinking each component should keep its own copy and sync them, when the fix is one owner at the common ancestor passing the value down.",
    "hints": [
      "Find the lowest component that contains everyone who needs the value.",
      "Ask what guarantees two siblings never disagree.",
      "Duplicating and syncing the value is the trap to avoid."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the parent owns the value so both inputs reflect the same temperature.",
      "language": "tsx",
      "code": "function Converter() {\n  const [celsius, setCelsius] = useState(0);\n  return (\n    <>\n      <input value={celsius} onChange={(e) => setCelsius(Number(e.target.value))} />\n      <output>{celsius * 1.8 + 32}°F</output>\n    </>\n  );\n}"
    }
  },
  {
    "id": "react-explain-one-way-data-flow-of-react",
    "title": "Explain one-way data flow of React",
    "prompt": "Explain one-way data flow of React, explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "function Parent() {  const [count, setCount] = React.useState(0);  return <Child count={count} increment={() => setCount(count + 1)} />;}\nfunction Child({ count, increment }) {  return <button onClick={increment}>Count: {count}</button>;}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Data flows bidirectionally with automatic two-way binding between child DOM inputs and parent state.",
        "isCorrect": false,
        "explanation": "React rejects automatic two-way binding; children request changes through explicit callbacks rather than writing back silently."
      },
      {
        "id": "B",
        "text": "Data flows only upwards from children to parents, with parents receiving state via inheritance.",
        "isCorrect": false,
        "explanation": "Data does not flow up by inheritance. Values pass down via props, and changes are requested upward through callbacks."
      },
      {
        "id": "C",
        "text": "Data flows strictly downwards from parent to child via props; children trigger state updates by calling callback functions passed down from parents.",
        "isCorrect": true,
        "explanation": "Correct. Data flows down through props, and children trigger updates by calling callbacks the parent passed down."
      },
      {
        "id": "D",
        "text": "Data flows exclusively through global cookies synchronized across browser tabs.",
        "isCorrect": false,
        "explanation": "Data flows through the component tree in memory via props and callbacks, not through cookies synchronized across tabs."
      }
    ],
    "correctAnswer": "C",
    "explanation": "One-way data flow means data moves down the tree through props, while changes travel up through callbacks. In the snippet `Parent` owns `count` and passes both the value and an `increment` function to `Child`; the child never mutates `count`, it just calls `increment`, which updates the parent's state and re-renders the child with the new prop.\n\nThis directionality is what makes React predictable: for any state there is exactly one owner, and the UI is a function of that state. You can trace any value to its source and know that children cannot secretly change it.\n\nThe contrast an interviewer wants: unlike two-way binding, where editing a field silently writes back to a model, React requires an explicit event-and-callback round trip. That extra step is deliberate; it keeps the owner in control of every change.",
    "interviewLine": "I describe React's data flow as one way: props go down, and children raise changes through callbacks, so every piece of state has a single, traceable owner.",
    "misconception": "Expecting React to bind inputs back to state automatically, when changes must travel up explicitly through callbacks the owner provides.",
    "hints": [
      "Trace where `count` is owned and how `Child` changes it.",
      "Ask what the child does instead of mutating the prop.",
      "There is no silent two-way binding here."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the child raises intent upward; the parent owns and mutates the state.",
      "language": "tsx",
      "code": "function List() {\n  const [items, setItems] = useState<string[]>([]);\n  return <AddBar onAdd={(x) => setItems((prev) => [...prev, x])} count={items.length} />;\n}\n\nfunction AddBar({ onAdd, count }: { onAdd: (x: string) => void; count: number }) {\n  return <button onClick={() => onAdd('item')}>Add ({count})</button>;\n}"
    }
  },
  {
    "id": "react-explain-prop-drilling",
    "title": "Explain prop drilling",
    "prompt": "Explain prop drilling, explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "function Grandparent() {  const data = 'Hello from Grandparent';  return <Parent data={data} />;}\nfunction Parent({ data }) {  return <Child data={data} />;}\nfunction Child({ data }) {  return <p>{data}</p>;}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Passing props through multiple intermediate layers of components that do not use the data themselves, solely to deliver it to a deeply nested descendant.",
        "isCorrect": true,
        "explanation": "Correct. Prop drilling is passing a value through intermediate components that do not use it, only to deliver it to a nested descendant."
      },
      {
        "id": "B",
        "text": "An automatic transform that converts React props into database columns so nested components read their data straight from SQL.",
        "isCorrect": false,
        "explanation": "There is no automatic conversion of props to database columns; prop drilling is about forwarding props through the tree."
      },
      {
        "id": "C",
        "text": "A CSS technique using descendant grid selectors to style components several levels deep without passing style props down.",
        "isCorrect": false,
        "explanation": "Prop drilling describes prop forwarding, not CSS selectors; the term has nothing to do with styling."
      },
      {
        "id": "D",
        "text": "A compile-time tool that parses the component tree and validates every prop's type before any component is allowed to render.",
        "isCorrect": false,
        "explanation": "Validating prop types is PropTypes or TypeScript. Prop drilling is a structural friction, not a validation tool."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Prop drilling is threading a value through components that do not use it, purely to reach a deep descendant. In the snippet `data` passes Grandparent to Parent to Child, but only `Child` renders it; the middle layer is a pass-through.\n\nIt is not an error, but it couples unrelated components to the data and makes the chain brittle: adding, renaming, or reshaping the prop ripples through every intermediate component that merely forwards it. The deeper the tree, the more noise.\n\nThe fixes an interviewer expects: Context for ambient values many descendants read, composition (passing elements through `children`) to collapse the chain, or a store for genuinely global data. Reach for Context when drilling spans several layers, not for a single hop.",
    "interviewLine": "Prop drilling is forwarding a value through components that never use it; past a couple of hops I lift it into Context or restructure with composition.",
    "misconception": "Reading prop drilling as a bug or a tool, when it is just the smell of forwarding a value through layers that do not use it.",
    "hints": [
      "Check which of the three components in the snippet actually uses `data`.",
      "Ask what the middle component gains from the prop.",
      "The cost is the forwarding layers, not the value."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/useContext",
    "example": {
      "caption": "Notice Context removes the middle layer's need to forward the value.",
      "language": "tsx",
      "code": "const ThemeCtx = React.createContext('light');\n\nfunction App() {\n  return (\n    <ThemeCtx.Provider value=\"dark\">\n      <Toolbar />\n    </ThemeCtx.Provider>\n  );\n}\n\nfunction Toolbar() { return <ThemedButton />; }\nfunction ThemedButton() {\n  const theme = React.useContext(ThemeCtx);\n  return <button className={theme}>Save</button>;\n}"
    }
  },
  {
    "id": "react-what-is-jest-and-how-is-it-used-for-testing-react-appli",
    "title": "What is Jest and how is it used for testing React applications?",
    "prompt": "What is Jest and how is it used for testing React applications?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A browser extension that restyles buttons and components with decorative fonts to make a running React app easier to demo.",
        "isCorrect": false,
        "explanation": "Jest is a test framework, not a styling extension; it runs tests and checks assertions."
      },
      {
        "id": "B",
        "text": "A database ORM for React apps that replaces Prisma and TypeORM by mapping component state directly onto SQL tables.",
        "isCorrect": false,
        "explanation": "Jest is a test runner, not a database ORM; it does not replace Prisma or TypeORM."
      },
      {
        "id": "C",
        "text": "A JavaScript test runner and assertion library that provides test suites (`describe`/`test`), assertions (`expect`), mocking (`jest.fn`/`jest.mock`), and code coverage.",
        "isCorrect": true,
        "explanation": "Correct. Jest is a test runner and assertion library with suites, assertions, mocking, and coverage, often used with jsdom and React Testing Library."
      },
      {
        "id": "D",
        "text": "A compiler that converts React JSX into static HTML email templates so components can be reused in transactional mail.",
        "isCorrect": false,
        "explanation": "Jest executes tests and assertions; it does not compile JSX into email templates."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Jest is a JavaScript test runner and assertion library. It discovers test files, runs them, and provides `describe`/`test` for structure, `expect` for assertions, `jest.fn`/`jest.mock` for mocking, and built-in coverage. For React it pairs with React Testing Library, which renders components into a jsdom DOM so you can query and assert on what the user sees.\n\nIn practice you render a component, interact with it through Testing Library's queries and events, and assert the resulting DOM, mocking network or module boundaries with `jest.mock`. jsdom simulates the browser so no real browser is needed for unit and integration tests.\n\nThe nuance an interviewer probes: Jest is the runner, not the renderer. Testing Library (or React's test renderer) does the component rendering; Jest executes the file and evaluates assertions.",
    "interviewLine": "Jest is the runner and assertion layer; I pair it with React Testing Library over jsdom to render a component and assert on what the user would actually see.",
    "misconception": "Thinking Jest renders React components itself, when it is the runner and Testing Library (or a test renderer) does the rendering into jsdom.",
    "hints": [
      "Separate what runs the test from what renders the component.",
      "Ask where the DOM comes from without a real browser.",
      "Jest supplies `expect` and mocking, not the rendering."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice Jest's expect asserts on DOM that Testing Library rendered into jsdom.",
      "language": "tsx",
      "code": "import { render, screen } from '@testing-library/react';\n\nfunction Greeting({ name }: { name: string }) {\n  return <h1>Hello, {name}</h1>;\n}\n\ntest('renders the name', () => {\n  render(<Greeting name=\"Ada\" />);\n  expect(screen.getByRole('heading')).toHaveTextContent('Hello, Ada');\n});"
    }
  },
  {
    "id": "react-how-do-you-mock-api-calls-in-react-component-tests",
    "title": "How do you mock API calls in React component tests?",
    "prompt": "How do you mock API calls in React component tests?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "data-fetching",
    "tags": [
      "react",
      "data-fetching",
      "junior"
    ],
    "codeSnippet": "import { render, screen } from '@testing-library/react';\njest.mock('./api', () => ({  fetchData: jest.fn(() => Promise.resolve('mocked data')),}));\nimport MyComponent from './MyComponent';\ntest('fetches data and renders it', async () => {  render(<MyComponent />);  expect(screen.getByText('Loading...')).toBeInTheDocument();  expect(await screen.findByText('mocked data')).toBeInTheDocument();});",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Use Mock Service Worker (MSW) to intercept network requests at the network layer, or mock API modules/functions with `jest.mock()` / `vi.mock()` / `jest.fn()`.",
        "isCorrect": true,
        "explanation": "Correct. Intercept at the network layer with MSW, or replace the API module/function with `jest.mock`, `vi.mock`, or `jest.fn`."
      },
      {
        "id": "B",
        "text": "Disable the development machine's network adapters during the test run so the component falls back to built-in sample data.",
        "isCorrect": false,
        "explanation": "Disabling hardware adapters is unnecessary and wrong; mocks intercept requests in memory without touching the machine's network."
      },
      {
        "id": "C",
        "text": "Spin up a fake local internet service provider that answers the component's real requests with canned responses during tests.",
        "isCorrect": false,
        "explanation": "There is no fake ISP involved; mocking happens in JavaScript at the module or request level."
      },
      {
        "id": "D",
        "text": "Let the test make real POST requests to the production database and assert on the rows it writes to verify the component.",
        "isCorrect": false,
        "explanation": "Hitting real production endpoints in tests corrupts data and makes tests slow and flaky; the point of mocking is to avoid that."
      }
    ],
    "correctAnswer": "A",
    "explanation": "You mock API calls either at the module boundary or the network layer. Module mocking with `jest.mock('./api')` (or `vi.mock`) replaces the real function with a `jest.fn` that returns controlled data, as the snippet does for `fetchData`. Network mocking with Mock Service Worker (MSW) intercepts the actual HTTP request, so your code uses real `fetch`/`axios` while MSW answers it.\n\nEither approach lets you test loading, success, and error paths deterministically without hitting a backend. The snippet asserts the loading text first, then awaits the mocked data via `findByText`, exercising the async flow.\n\nThe trade-off an interviewer wants: module mocks are simple but couple the test to your API module's shape; MSW tests the real request path and survives refactors of the client, at the cost of a bit more setup.",
    "interviewLine": "I mock either the API module with `jest.mock` or the network with MSW, which lets me drive success and error paths deterministically without a real backend.",
    "misconception": "Believing tests must reach a real server, when mocking the module or intercepting with MSW gives deterministic responses in memory.",
    "hints": [
      "Look at what the snippet replaces before importing the component.",
      "Ask at which layer you intercept: the module or the request.",
      "A real backend should never be in the loop."
    ],
    "source": "100-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice MSW answers the real fetch, so the component's request path is untouched.",
      "language": "typescript",
      "code": "import { http, HttpResponse } from 'msw';\nimport { setupServer } from 'msw/node';\n\nconst server = setupServer(\n  http.get('/api/user', () => HttpResponse.json({ name: 'Ada' })),\n);\n\nbeforeAll(() => server.listen());\nafterAll(() => server.close());"
    }
  },
  {
    "id": "system_design-explain-the-mvc-architecture",
    "title": "Explain the MVC Architecture",
    "prompt": "Explain the MVC Architecture, explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A compiler pipeline that translates backend Python code into React JSX so a server-rendered app can run on the client.",
        "isCorrect": false,
        "explanation": "MVC is a design pattern for separating concerns, not a Python-to-JSX compiler; this invents an unrelated mechanism."
      },
      {
        "id": "B",
        "text": "An architectural pattern separating concerns into Model (data/business rules), View (UI representation), and Controller (handles user input to update model/view).",
        "isCorrect": true,
        "explanation": "Correct. MVC separates the Model (data and rules), the View (presentation), and the Controller (input handling that updates model and view)."
      },
      {
        "id": "C",
        "text": "A design where database queries, CSS styles, and event handlers all live in one file so a feature is easy to read top to bottom.",
        "isCorrect": false,
        "explanation": "MVC exists precisely to separate concerns; putting queries, styles, and handlers in one file is the opposite of what it prescribes."
      },
      {
        "id": "D",
        "text": "A network protocol for transferring encrypted video files over WebSockets between a model server and a view client.",
        "isCorrect": false,
        "explanation": "MVC is a software architecture pattern, not a network protocol for transferring video."
      }
    ],
    "correctAnswer": "B",
    "explanation": "MVC splits an application into three responsibilities. The Model holds data and business rules, the View renders a presentation of that data, and the Controller handles user input, updating the Model and selecting what the View shows. Separating these keeps data logic independent of presentation and input handling.\n\nIn practice this means a form submission goes to the Controller, which validates and updates the Model, after which the View re-renders from the new Model state. Each part can change or be tested without rewriting the others.\n\nThe distinction an interviewer wants: classic MVC often uses two-way flow between View and Model, which is exactly what Flux/Redux rejected in favor of strict unidirectional flow. React itself is closer to the View layer, with state management filling the Model role.",
    "interviewLine": "I explain MVC as separating data and rules in the Model, presentation in the View, and input handling in the Controller, which keeps each concern independently changeable and testable.",
    "misconception": "Mixing MVC's roles together, when the whole point is isolating data, presentation, and input handling into separate responsibilities.",
    "hints": [
      "Name the three distinct responsibilities.",
      "Ask which part reacts to user input and which only presents data.",
      "The pattern is about separation, not bundling everything together."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/render-and-commit",
    "example": {
      "caption": "Notice the controller mediates input and updates the model, keeping the view pure.",
      "language": "typescript",
      "code": "// Model\nconst model = { count: 0 };\n// View (pure render from model)\nconst view = (m: { count: number }) => `Count: ${m.count}`;\n// Controller (handles input, updates model, re-renders view)\nfunction onIncrement() {\n  model.count += 1;\n  return view(model);\n}"
    }
  },
  {
    "id": "system_design-explain-the-difference-between-react-and-angular",
    "title": "Explain the Difference Between React and Angular",
    "prompt": "Explain the Difference Between React and Angular, explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "React components must be written in Java and compiled to JavaScript, while Angular components are authored directly in Python.",
        "isCorrect": false,
        "explanation": "React uses JavaScript/TypeScript and Angular uses TypeScript; neither requires Java or Python."
      },
      {
        "id": "B",
        "text": "React is a flexible UI library using a Virtual DOM, JSX, and unidirectional data flow; Angular is a full-fledged MVC framework using real DOM, TypeScript templates, and two-way binding.",
        "isCorrect": true,
        "explanation": "Correct. React is a flexible view library with a virtual DOM and one-way flow; Angular is an opinionated full framework with templates and two-way binding."
      },
      {
        "id": "C",
        "text": "React runs exclusively on backend servers to render HTML, while Angular runs exclusively inside native mobile phone apps.",
        "isCorrect": false,
        "explanation": "Both are frontend web technologies; neither is backend-only or mobile-only."
      },
      {
        "id": "D",
        "text": "There is no real difference; React and Angular share the same architecture and are maintained as copies of one codebase.",
        "isCorrect": false,
        "explanation": "They differ fundamentally in scope and philosophy; they are not copies of each other."
      }
    ],
    "correctAnswer": "B",
    "explanation": "React is a focused UI library: it renders views with a virtual DOM, uses JSX, favors unidirectional data flow, and leaves routing, HTTP, and forms to the ecosystem. Angular is a full framework with its own templates, dependency injection, routing, and two-way binding built in, prescribing more structure out of the box.\n\nThe practical effect is choice versus convention. With React you assemble companion libraries and decide architecture; with Angular you adopt an opinionated, batteries-included platform. React's one-way flow and Angular's two-way binding also lead to different mental models for how data moves.\n\nThe nuance an interviewer probes: both use TypeScript today and both render UI, so the real contrast is scope and opinionation, not language or purpose. Virtual DOM versus Angular's change detection is a detail beneath that larger framing.",
    "interviewLine": "React is a view library I compose with my own tools under one-way data flow, while Angular is a full, opinionated framework with built-in templating and two-way binding.",
    "misconception": "Framing the difference as language or platform, when it is really scope: a focused library you compose versus an opinionated framework that prescribes structure.",
    "hints": [
      "Compare how much each gives you out of the box.",
      "Ask which prescribes architecture and which lets you choose.",
      "The contrast is scope and opinionation, not the language."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice React stays a view layer; routing is a separate library you add.",
      "language": "tsx",
      "code": "import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    }
  },
  {
    "id": "react-explain-props-in-react",
    "title": "Explain Props in React?",
    "prompt": "Explain Props in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Read-only properties passed from parent to child components that configure the child's appearance and behavior, maintaining unidirectional data flow.",
        "isCorrect": true,
        "explanation": "Correct. Props are read-only inputs passed parent to child that configure its appearance and behavior under one-way data flow."
      },
      {
        "id": "B",
        "text": "Mutable fields a child reassigns to push updates back to its parent, since props are a shared two-way binding between them.",
        "isCorrect": false,
        "explanation": "Children cannot write to props to update a parent; they call callback props so the parent updates its own state."
      },
      {
        "id": "C",
        "text": "Server environment variables defined in `.env.local` that React injects into components as read-only configuration at build time.",
        "isCorrect": false,
        "explanation": "Props are runtime JavaScript arguments, not `.env` environment variables; the two are unrelated."
      },
      {
        "id": "D",
        "text": "Private per-component variables created by calling a built-in `useProps` hook inside the function component body.",
        "isCorrect": false,
        "explanation": "There is no `useProps` hook; a function component receives props as its first argument."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Props are read-only inputs a parent passes to a child to configure what it renders and how it behaves. A function component receives them as its first argument; a class component reads `this.props`. Either way the child must treat them as immutable and never assign back to them.\n\nThat immutability is what sustains unidirectional data flow: the child renders from props, and if it needs to change something the parent owns, it calls a function prop so the parent updates its state and re-renders the child. Mutating props would desync the UI from its data.\n\nThe edge an interviewer explores: props can be any value, including functions, elements, and `children`. Default values come from default parameters (or `defaultProps` on older class components), not from mutation inside the child.",
    "interviewLine": "I describe props as the read-only inputs a parent passes to configure a child; the child renders from them and raises changes through callbacks rather than mutating them.",
    "misconception": "Treating props as mutable local variables, when they are a read-only snapshot the parent owns.",
    "hints": [
      "Note how the child receives `data` in the snippet.",
      "Ask whether the child may change what it received.",
      "There is no hook that creates props."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice a function prop lets the child request a change without mutating props.",
      "language": "tsx",
      "code": "function Price({ amount, currency = 'USD' }: { amount: number; currency?: string }) {\n  return <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}</span>;\n}\n\nfunction Cart() {\n  return <Price amount={19.99} />;\n}"
    }
  },
  {
    "id": "react-what-is-the-use-of-dangerouslysetinnerhtml-in-react",
    "title": "What is the Use of dangerouslySetInnerHTML in React?",
    "prompt": "What is the Use of dangerouslySetInnerHTML in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A performance flag that tells React to skip reconciliation for a subtree, speeding up CSS animations by rendering raw markup.",
        "isCorrect": false,
        "explanation": "It injects raw HTML, not an animation optimizer; the name is about the XSS risk, not performance."
      },
      {
        "id": "B",
        "text": "React's replacement for `innerHTML` to render raw HTML strings directly into a component; named 'dangerously' because unsanitized input exposes the app to XSS vulnerabilities.",
        "isCorrect": true,
        "explanation": "Correct. It renders a raw HTML string by bypassing React's escaping, named 'dangerously' because unsanitized input invites XSS."
      },
      {
        "id": "C",
        "text": "A TypeScript compiler option that unlocks dangerous experimental features like decorators and ambient module augmentation.",
        "isCorrect": false,
        "explanation": "It is a JSX prop for injecting HTML, not a TypeScript compiler flag."
      },
      {
        "id": "D",
        "text": "A method that wipes the client's local storage and cache if a rendering error is thrown inside the affected component.",
        "isCorrect": false,
        "explanation": "The danger is XSS from unsanitized markup, not any filesystem operation."
      }
    ],
    "correctAnswer": "B",
    "explanation": "`dangerouslySetInnerHTML` is React's escape hatch for injecting a raw HTML string into a node, equivalent to setting `innerHTML`. You pass `dangerouslySetInnerHTML={{ __html: html }}`, and React skips its usual text escaping for that content. The name warns you: unsanitized HTML can carry scripts and cause cross-site scripting.\n\nYou use it when you must render HTML produced elsewhere, like a CMS field or a Markdown renderer's output. The safety requirement is to sanitize that HTML first with a library such as DOMPurify, so attacker-controlled markup cannot execute.\n\nThe nuance an interviewer probes: React escapes normal JSX text precisely to prevent XSS, so this prop opts out of that protection. Prefer rendering structured data as elements; reach for raw HTML only when there is no alternative, and always sanitize.",
    "interviewLine": "`dangerouslySetInnerHTML` injects raw HTML by bypassing React's escaping, so I only use it for sanitized content, typically run through DOMPurify first.",
    "misconception": "Reading the name as hyperbole, when it literally marks that React's XSS escaping is turned off for that content.",
    "hints": [
      "Think about what React normally does to text before rendering it.",
      "Ask what the 'dangerously' prefix is warning you about.",
      "The risk is script injection, not disk access."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the HTML is sanitized before it reaches the raw-injection prop.",
      "language": "tsx",
      "code": "import DOMPurify from 'dompurify';\n\nfunction RichText({ html }: { html: string }) {\n  const clean = DOMPurify.sanitize(html);\n  return <div dangerouslySetInnerHTML={{ __html: clean }} />;\n}"
    }
  },
  {
    "id": "react-what-are-controlled-components-in-react",
    "title": "What are Controlled Components in React?",
    "prompt": "What are Controlled Components in React?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Components whose inputs cannot be edited by typing, since React locks the field and ignores keystrokes until a reset is called.",
        "isCorrect": false,
        "explanation": "Controlled inputs accept typing; every keystroke flows through `onChange` into state, so they are editable, not frozen."
      },
      {
        "id": "B",
        "text": "Components that only work when wired to Redux or MobX, because controlled inputs cannot bind to local `useState`.",
        "isCorrect": false,
        "explanation": "A controlled input only needs React state like `useState`; it does not require Redux or MobX to work."
      },
      {
        "id": "C",
        "text": "Components that run exclusively on backend servers to pre-fill form values before the page is sent to the browser.",
        "isCorrect": false,
        "explanation": "Controlled components are ordinary client-side form inputs rendered in the browser, not server-only constructs."
      },
      {
        "id": "D",
        "text": "Form elements whose values are controlled and driven by React state via `value` and updated via `onChange` handlers, making React the single source of truth.",
        "isCorrect": true,
        "explanation": "Correct. A controlled input binds `value` to React state and updates it via `onChange`, so React is the single source of truth."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A controlled component is a form element whose value is driven by React state through `value` and updated with `onChange`, making React the single source of truth. Each keystroke fires `onChange`, you store the new value in state, and that state flows back into `value`, so the input always shows exactly what React holds.\n\nThis round trip is what enables live behavior: validate as the user types, transform input (uppercase, mask), or disable submit until the value is valid. The displayed value and your state can never drift because they are the same thing.\n\nThe subtlety an interviewer tests: a controlled input needs both `value` and `onChange`. Supplying `value` without `onChange` makes the field read-only and triggers a warning, and letting `value` be `undefined` on some renders warns about switching between controlled and uncontrolled.",
    "interviewLine": "A controlled input binds `value` to state and updates it in `onChange`, so React owns the value and I can validate or format it the instant the user types.",
    "misconception": "Thinking 'controlled' implies the input cannot be edited, when it means every edit is routed through React state before reappearing on screen.",
    "hints": [
      "Trace where the input's value comes from each render.",
      "Ask what fires on every keystroke and what it updates.",
      "A controlled input is fully editable, not locked."
    ],
    "source": "150-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice the onChange uppercases the value before it re-enters state.",
      "language": "tsx",
      "code": "function CodeField() {\n  const [code, setCode] = useState('');\n  return (\n    <input\n      value={code}\n      onChange={(e) => setCode(e.target.value.toUpperCase())}\n      maxLength={6}\n    />\n  );\n}"
    }
  },
  {
    "id": "react-what-is-react-redux",
    "title": "What is React-Redux?",
    "prompt": "What is React-Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A compiler that translates React components and a Redux store into static HTML email templates for transactional messages.",
        "isCorrect": false,
        "explanation": "React-Redux binds a store to components; it does not compile JSX into email templates."
      },
      {
        "id": "B",
        "text": "The official React UI bindings library for Redux, providing `<Provider>` and hooks (`useSelector`, `useDispatch`) to connect components to a Redux store.",
        "isCorrect": true,
        "explanation": "Correct. It is the official React binding for Redux, offering `<Provider>` and hooks like `useSelector` and `useDispatch`."
      },
      {
        "id": "C",
        "text": "A CSS framework that generates utility classes for styling buttons and forms connected to a Redux store.",
        "isCorrect": false,
        "explanation": "React-Redux manages state connections, not styling; it is unrelated to CSS frameworks."
      },
      {
        "id": "D",
        "text": "A database management system that persists the Redux store to disk and replaces PostgreSQL for application data.",
        "isCorrect": false,
        "explanation": "It connects React to a Redux store; it is not a database system."
      }
    ],
    "correctAnswer": "B",
    "explanation": "React-Redux is the official binding layer between a Redux store and React components. It provides `<Provider>` to make the store available to the tree and hooks like `useSelector` to read a slice of state and `useDispatch` to send actions. The Redux core stays UI-agnostic; React-Redux is what connects it to React specifically.\n\nIn practice `useSelector` subscribes a component to exactly the state it reads and re-renders it only when that selected value changes, which is how React-Redux avoids re-rendering every connected component on every dispatch.\n\nThe nuance an interviewer probes: `useSelector` compares the selected value by reference (strict equality) by default, so returning a new object each call defeats the optimization. You either select primitives, memoize with a selector library, or supply a custom equality function.",
    "interviewLine": "I describe React-Redux as the official binding that wires a store to React through `<Provider>` and `useSelector`, which subscribes a component only to the slice it reads.",
    "misconception": "Expecting every connected component to re-render on each dispatch, when `useSelector` only re-renders when its selected value changes by reference.",
    "hints": [
      "Separate the Redux core from the thing that connects it to React.",
      "Ask what decides whether a connected component re-renders.",
      "Returning a fresh object from a selector undercuts its optimization."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice selecting a primitive avoids re-renders from unrelated state changes.",
      "language": "tsx",
      "code": "import { useSelector, useDispatch } from 'react-redux';\n\nfunction Counter() {\n  const count = useSelector((s: { count: number }) => s.count);\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch({ type: 'inc' })}>{count}</button>;\n}"
    }
  },
  {
    "id": "react-explain-the-core-components-of-react-redux",
    "title": "Explain the Core Components of React-Redux?",
    "prompt": "Explain the Core Components of React-Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "HTML, CSS, WebGL, and SVG, the browser rendering layers Redux orchestrates to paint the connected component tree.",
        "isCorrect": false,
        "explanation": "HTML, CSS, WebGL, and SVG are browser rendering technologies, not the pieces of a Redux store."
      },
      {
        "id": "B",
        "text": "Store (single state tree), Actions (objects with `type` and payload), Reducers (pure functions computing next state), and Dispatch (triggers state updates).",
        "isCorrect": true,
        "explanation": "Correct. The Store holds state, Actions describe changes, Reducers compute the next state purely, and Dispatch sends actions in."
      },
      {
        "id": "C",
        "text": "Headers, Footers, Sidebars, and Modals, the standard layout regions a Redux store is responsible for arranging.",
        "isCorrect": false,
        "explanation": "Headers and modals are UI layout parts, not Redux architecture concepts."
      },
      {
        "id": "D",
        "text": "Client, Server, Database, and Router, the full-stack layers that make up a Redux application's architecture.",
        "isCorrect": false,
        "explanation": "Client, server, database, and router are full-stack layers, not Redux state primitives."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Redux's core pieces are the Store, Actions, Reducers, and Dispatch. The Store holds the single state tree. Actions are plain objects with a `type` (and optional payload) that describe what happened. Reducers are pure functions `(state, action) => newState` that compute the next state. Dispatch is the only way to send an action into the store to trigger a reducer.\n\nTogether they form a unidirectional loop: a component dispatches an action, the reducer produces a new state from the old one, and subscribed components read the updated state and re-render. Because reducers are pure, every transition is deterministic and replayable.\n\nThe nuance an interviewer wants: reducers must not mutate state or cause side effects; they return new objects. Async work and side effects live in middleware (thunks, sagas), not in reducers.",
    "interviewLine": "I lay out Redux's loop as Store, Action, Reducer, and Dispatch: components dispatch actions, pure reducers fold them into the next state, and subscribers re-render.",
    "misconception": "Thinking reducers may perform side effects, when they must stay pure and leave async work to middleware.",
    "hints": [
      "Name the four pieces that make a state change happen.",
      "Ask which piece is a pure function and which triggers it.",
      "These are state primitives, not UI or full-stack layers."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the action describes intent and the reducer purely derives the next state.",
      "language": "typescript",
      "code": "type Action = { type: 'add'; text: string };\ntype State = { todos: string[] };\n\nfunction reducer(state: State = { todos: [] }, action: Action): State {\n  if (action.type === 'add') return { todos: [...state.todos, action.text] };\n  return state;\n}"
    }
  },
  {
    "id": "react-how-can-we-combine-multiple-reducers-in-react",
    "title": "How Can We Combine Multiple Reducers in React?",
    "prompt": "How Can We Combine Multiple Reducers in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "You cannot combine reducers in Redux; each store supports exactly one reducer, so multiple slices require multiple stores.",
        "isCorrect": false,
        "explanation": "Reducers combine readily; `combineReducers` exists precisely to merge slice reducers into one root reducer."
      },
      {
        "id": "B",
        "text": "Use Redux's `combineReducers({ users: usersReducer, posts: postsReducer })` helper function to merge slice reducers into a single root reducer.",
        "isCorrect": true,
        "explanation": "Correct. `combineReducers` maps slice keys to reducers and produces one root reducer managing the whole tree."
      },
      {
        "id": "C",
        "text": "Write a `while` loop inside `render()` that calls each reducer in turn and merges their returned state into one object.",
        "isCorrect": false,
        "explanation": "Reducers are called by the store on dispatch, not inside `render()`; a loop there would be a serious misuse."
      },
      {
        "id": "D",
        "text": "Concatenate the reducer source files as plain text during the build so their logic runs sequentially at startup.",
        "isCorrect": false,
        "explanation": "Reducers are composed at runtime as functions, not concatenated as text in a build step."
      }
    ],
    "correctAnswer": "B",
    "explanation": "You combine reducers with Redux's `combineReducers`, which takes an object mapping state-slice keys to their reducer functions and returns a single root reducer. Each slice reducer manages only its part of the tree, and `combineReducers` routes every dispatched action to all of them, assembling their results into one state object.\n\nThis keeps reducers small and focused: a `users` reducer owns `state.users`, a `posts` reducer owns `state.posts`, and neither sees the other's slice. Redux Toolkit's `configureStore` does the same wiring via its `reducer` map.\n\nThe nuance an interviewer probes: every slice reducer receives every action, so a slice can respond to shared actions. Each slice must also return its initial state when called with `undefined`, which is how the store bootstraps.",
    "interviewLine": "I split state into slice reducers and merge them with `combineReducers`, which fans every action out to each slice and reassembles the tree.",
    "misconception": "Imagining reducers are stitched together manually, when `combineReducers` routes each action to every slice and merges their outputs.",
    "hints": [
      "Think about one reducer per slice of the state tree.",
      "Ask what routes a dispatched action to all the slices.",
      "Reducers run on dispatch, never inside render."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice each slice reducer owns one key of the resulting state tree.",
      "language": "typescript",
      "code": "import { combineReducers } from 'redux';\n\nconst users = (s = [], a: { type: string }) => s;\nconst posts = (s = [], a: { type: string }) => s;\n\nexport const rootReducer = combineReducers({ users, posts });"
    }
  },
  {
    "id": "react-explain-cors-in-react",
    "title": "Explain CORS in React?",
    "prompt": "Explain CORS in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "data-fetching",
    "tags": [
      "react",
      "data-fetching",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A query syntax for PostgreSQL that React uses to fetch cross-table data when the frontend talks to a database directly.",
        "isCorrect": false,
        "explanation": "CORS governs cross-origin HTTP requests in the browser, not SQL query syntax."
      },
      {
        "id": "B",
        "text": "CORS is a browser security mechanism that restricts cross-origin HTTP requests; React frontend apps resolve CORS by configuring server headers (`Access-Control-Allow-Origin`) or dev server proxies.",
        "isCorrect": true,
        "explanation": "Correct. CORS is a browser policy restricting cross-origin requests, resolved by server `Access-Control-Allow-Origin` headers or a dev proxy."
      },
      {
        "id": "C",
        "text": "A React hook that configures CSS flexbox layouts to adapt when content is loaded from a different domain.",
        "isCorrect": false,
        "explanation": "CORS is a networking security standard, not a React hook or CSS tool."
      },
      {
        "id": "D",
        "text": "A compile-time error React throws when a JSX tag opened on one line is not closed before the component returns.",
        "isCorrect": false,
        "explanation": "An unclosed JSX tag is a compile error; CORS is a runtime browser security policy."
      }
    ],
    "correctAnswer": "B",
    "explanation": "CORS (Cross-Origin Resource Sharing) is a browser security mechanism, not a React feature. When your frontend at one origin requests an API at a different origin, the browser enforces CORS: the server must return headers like `Access-Control-Allow-Origin` permitting that origin, or the browser blocks the response. React code using `fetch`/`axios` is simply subject to this policy.\n\nIn development you often sidestep it with a dev-server proxy so requests appear same-origin; in production you configure the API server to send the right CORS headers. The error you see in the console comes from the browser enforcing the policy, not from your React code failing.\n\nThe nuance an interviewer wants: CORS is enforced client-side by the browser but configured server-side. Non-simple requests trigger a preflight `OPTIONS` call that the server must also answer with allow headers.",
    "interviewLine": "CORS is a browser policy on cross-origin requests, so I fix it where it is configured—on the server's `Access-Control-Allow-Origin` headers—or proxy requests in dev to look same-origin.",
    "misconception": "Blaming React for CORS errors, when the browser enforces the policy and the fix lives in server headers or a dev proxy.",
    "hints": [
      "Ask who enforces the restriction: the browser, the server, or React.",
      "Think about where the fix actually lives.",
      "It is a network security policy, not a React or CSS concept."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the server, not the client, grants cross-origin access with a header.",
      "language": "javascript",
      "code": "// Express API granting one origin access\napp.use((req, res, next) => {\n  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');\n  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');\n  next();\n});"
    }
  },
  {
    "id": "system_design-what-is-flux-architecture-in-redux",
    "title": "What is Flux Architecture in Redux?",
    "prompt": "What is Flux Architecture in Redux?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "state-management",
    "tags": [
      "system_design",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A compiler that translates React components into optimized C++ binaries so state updates run as native machine code.",
        "isCorrect": false,
        "explanation": "Flux is a state-management pattern, not a compiler that emits C++ binaries."
      },
      {
        "id": "B",
        "text": "A unidirectional data flow pattern where Views dispatch Actions through a central Dispatcher/Store to pure Reducers that compute new State, making state changes predictable.",
        "isCorrect": true,
        "explanation": "Correct. Flux is a unidirectional pattern where views dispatch actions that flow through a store/reducer to produce new state."
      },
      {
        "id": "C",
        "text": "A bidirectional MVC architecture where every input is two-way bound to the model, so views and model mutate each other freely.",
        "isCorrect": false,
        "explanation": "Flux explicitly replaced two-way MVC binding with strict one-way flow, so this is the opposite of what it does."
      },
      {
        "id": "D",
        "text": "A database replication architecture that shards application tables across SQL nodes to keep client state consistent.",
        "isCorrect": false,
        "explanation": "Flux is a client-side application state pattern, not a database replication or sharding architecture."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Flux is a unidirectional data-flow pattern: views dispatch actions, those actions reach stores (via a dispatcher in classic Flux), stores update their state, and views re-render from the new state. Redux is a specific implementation that consolidates the stores into one and replaces the dispatcher with pure reducers.\n\nThe strict one-way flow is the point. Because the only way to change state is to dispatch an action, and reducers derive new state purely, every transition is explicit and traceable, which enables features like time-travel debugging.\n\nThe contrast an interviewer wants: Flux exists to replace the tangled two-way binding of classic MVC, where a view edit could silently mutate a model that mutates other views. Flux forbids that; changes always flow Action to Store to View.",
    "interviewLine": "I describe Flux as strict one-way flow—action to store to view—and Redux as implementing it with a single store and pure reducers so every change is traceable.",
    "misconception": "Confusing Flux with bidirectional MVC, when its defining feature is one-way flow that forbids silent two-way mutation.",
    "hints": [
      "Picture the direction data travels in a Flux app.",
      "Ask what Flux was invented to replace.",
      "It rejects two-way binding."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the only path to new state is dispatching an action into a pure reducer.",
      "language": "typescript",
      "code": "const store = { state: { count: 0 } };\nconst reduce = (s: { count: number }, a: { type: 'inc' }) =>\n  a.type === 'inc' ? { count: s.count + 1 } : s;\n\nfunction dispatch(action: { type: 'inc' }) {\n  store.state = reduce(store.state, action); // one-way: view -> action -> store\n}"
    }
  },
  {
    "id": "react-what-is-redux-and-how-does-it-work-with-react",
    "title": "What is Redux, and How Does It Work with React?",
    "prompt": "What is Redux, and How Does It Work with React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A native hardware driver that manages how much RAM the browser allocates to each component's state during rendering.",
        "isCorrect": false,
        "explanation": "Redux is a userland JavaScript library managing app state, not a hardware RAM driver."
      },
      {
        "id": "B",
        "text": "A browser extension that rewrites CSS style rules at runtime so a React app's appearance stays in sync with its store.",
        "isCorrect": false,
        "explanation": "Redux manages data and update logic, not CSS; it does not rewrite styles at runtime."
      },
      {
        "id": "C",
        "text": "A standalone predictable state container holding application state in a single store, connected to React via `react-redux` (`<Provider>`, `useSelector`, `useDispatch`).",
        "isCorrect": true,
        "explanation": "Correct. Redux is a standalone state container with a single store, connected to React via `react-redux` (`<Provider>`, `useSelector`, `useDispatch`)."
      },
      {
        "id": "D",
        "text": "A database migration tool that alters SQL table schemas whenever the shape of the React application's state changes.",
        "isCorrect": false,
        "explanation": "Redux manages in-memory client state, not SQL schema migrations."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Redux is a standalone, predictable state container: the whole app state lives in one store, and the only way to change it is to dispatch an action that a pure reducer folds into new state. It has no dependency on React. React-Redux is the separate binding that connects the store to components through `<Provider>`, `useSelector`, and `useDispatch`.\n\nWorking together, a component dispatches an action, the reducer computes the next state immutably, and `useSelector` re-renders only the components whose selected slice changed. The store stays the single source of truth across the tree.\n\nThe nuance an interviewer probes: Redux itself is UI-agnostic, so the predictability (pure reducers, immutable updates) comes from Redux, while the subscription efficiency comes from React-Redux's `useSelector` reference checks.",
    "interviewLine": "I describe Redux as a UI-agnostic store updated only through pure reducers, and React-Redux as binding it to components so `useSelector` re-renders just the ones whose slice changed.",
    "misconception": "Treating Redux and React-Redux as one thing, when Redux is a UI-agnostic store and React-Redux is the binding that connects it to components.",
    "hints": [
      "Separate the store from the thing that connects it to React.",
      "Ask what makes the updates predictable.",
      "Only dispatched actions can change the state."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the Provider makes one store available to every connected component.",
      "language": "tsx",
      "code": "import { Provider } from 'react-redux';\nimport { configureStore } from '@reduxjs/toolkit';\n\nconst store = configureStore({ reducer: { count: (s = 0) => s } });\n\nexport function Root() {\n  return (\n    <Provider store={store}>\n      <App />\n    </Provider>\n  );\n}"
    }
  },
  {
    "id": "react-sibling-data-passing-with-react-router-url-params-locat",
    "title": "Sibling Data Passing with React Router, URL Params, Location State, or Shared Store",
    "prompt": "Sibling Data Passing with React Router, URL Params, Location State, or Shared Store, explain the behavior and mechanism.",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Assign the value to a global `window.data` property, which both sibling routes read on every render without any setter.",
        "isCorrect": false,
        "explanation": "Writing to `window.data` is non-reactive, so changes do not re-render consumers; use the router or a store instead."
      },
      {
        "id": "B",
        "text": "Sibling routes cannot share data under any circumstances, so the value must be refetched from the server on each route.",
        "isCorrect": false,
        "explanation": "Sibling routes can absolutely share data through params or a store; the claim that they cannot is false."
      },
      {
        "id": "C",
        "text": "Read the other route's component instance directly through `sibling.state`, since mounted routes expose their state to peers.",
        "isCorrect": false,
        "explanation": "A component cannot read a sibling's private state directly; they coordinate through shared channels like the URL."
      },
      {
        "id": "D",
        "text": "Share data between sibling routes via URL path parameters (`/users/:id`), query search params (`?filter=active`), `location.state`, or a shared Context/store.",
        "isCorrect": true,
        "explanation": "Correct. Share via path params, query params, transient `location.state`, or a shared Context/store, chosen by whether the data must be in the URL."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Sibling routes share data through the things the router owns: path params (`/users/:id`), query params (`?filter=active`), the transient `location.state` carried by a navigation, or a shared Context/store for broader app state. One sibling writes to one of these channels, and the other reads it when its route renders.\n\nThe right channel depends on the data. Path and query params live in the URL, so they are bookmarkable and shareable; `location.state` is transient and hidden from the URL, good for one-off handoffs; Context or a store suits state many routes read over time.\n\nThe nuance an interviewer wants: `location.state` does not survive a manual refresh or a shared link, so anything that must be reconstructable from the URL belongs in params, not state.",
    "interviewLine": "I pick the router channel by durability: path or query params when the data must be bookmarkable, `location.state` for a transient handoff, and a store for state many routes share.",
    "misconception": "Assuming any sharing channel works equally, when the choice hinges on whether the data must survive a refresh or a shared link.",
    "hints": [
      "List what the router can carry between routes.",
      "Ask which channels survive a page refresh.",
      "Direct access to a sibling's state is not one of the options."
    ],
    "source": "150-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
    "example": {
      "caption": "Notice query params keep the filter shareable, unlike transient location state.",
      "language": "tsx",
      "code": "import { useSearchParams } from 'react-router-dom';\n\nfunction UserList() {\n  const [params, setParams] = useSearchParams();\n  const filter = params.get('filter') ?? 'all';\n  return <button onClick={() => setParams({ filter: 'active' })}>Showing {filter}</button>;\n}"
    }
  },
  {
    "id": "system_design-strict-mode-development-checks-that-catch-risky-pattern",
    "title": "Strict Mode, Development Checks That Catch Risky Patterns",
    "prompt": "Strict Mode, Development Checks That Catch Risky Patterns, explain the behavior and mechanism.",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A security layer that encrypts every rendered DOM node in the browser so component output cannot be inspected or tampered with.",
        "isCorrect": false,
        "explanation": "StrictMode is a development diagnostic, not a security firewall; it encrypts nothing."
      },
      {
        "id": "B",
        "text": "`<React.StrictMode>` runs extra development-only checks: intentionally double-mounting components to detect missing effect cleanup, warning on deprecated lifecycles, legacy string refs, and `findDOMNode`.",
        "isCorrect": true,
        "explanation": "Correct. StrictMode runs extra dev-only checks, double-invoking renders and effects and warning on deprecated APIs to surface unsafe patterns early."
      },
      {
        "id": "C",
        "text": "A production optimization flag that suppresses all thrown errors so a single component crash can never take down the page.",
        "isCorrect": false,
        "explanation": "StrictMode runs only in development and surfaces warnings; it is not a production flag that suppresses errors."
      },
      {
        "id": "D",
        "text": "A compiler setting that forbids running JavaScript outside WebAssembly, forcing components to compile to a sandboxed module.",
        "isCorrect": false,
        "explanation": "StrictMode is a standard React component, not a compiler setting about WebAssembly."
      }
    ],
    "correctAnswer": "B",
    "explanation": "`<React.StrictMode>` is a development-only wrapper that runs extra checks to surface fragile patterns. It intentionally double-invokes certain functions, including component bodies and effect setup/cleanup, so impure render logic or missing effect cleanup reveals itself immediately. It also warns about deprecated lifecycles, legacy string refs, and `findDOMNode`.\n\nIn practice the double-mounting in development means an effect that subscribes without unsubscribing, or that is not idempotent, visibly misbehaves early, before concurrent features in production expose the same bug subtly. StrictMode adds no behavior or cost in production builds.\n\nThe senior nuance an interviewer probes: the extra invocation is a feature, not noise. The correct response is to make effects idempotent and clean up properly, not to disable StrictMode or guard against the double run.",
    "interviewLine": "StrictMode double-invokes renders and effects in development on purpose, so I treat a visible double run as a signal to make the effect idempotent and clean up, not to suppress it.",
    "misconception": "Treating StrictMode's double invocation as a bug to work around, when it is a deliberate probe that exposes non-idempotent effects.",
    "hints": [
      "Think about why effects seem to run twice in development.",
      "Ask what kind of bug that double run is designed to expose.",
      "It only affects development, never production."
    ],
    "source": "150-react",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
    "example": {
      "caption": "Notice the cleanup makes this effect safe under StrictMode's double invocation.",
      "language": "tsx",
      "code": "function useOnline() {\n  const [online, setOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setOnline(true);\n    window.addEventListener('online', on);\n    return () => window.removeEventListener('online', on);\n  }, []);\n  return online;\n}"
    }
  },
  {
    "id": "react-what-are-uncontrolled-components",
    "title": "What are uncontrolled components?",
    "prompt": "What are uncontrolled components?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeSnippet": "class UserProfile extends React.Component {\n  constructor(props) {\n    super(props);\n    this.handleSubmit = this.handleSubmit.bind(this);\n    this.input = React.createRef();\n  }\n\n  handleSubmit(event) {\n    alert('A name was submitted: ' + this.input.current.value);\n    event.preventDefault();\n  }\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <label>\n          {'Name:'}\n          <input type=\"text\" ref={this.input} />\n        </label>\n        <input type=\"submit\" value=\"Submit\" />\n      </form>\n    );\n  }\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Components where form input state is managed directly by the browser DOM, and values are pulled on demand (e.g. on submit) using a `ref` or `defaultValue`.",
        "isCorrect": true,
        "explanation": "Correct. The DOM manages the input's value and you read it on demand through a `ref` or seed it with `defaultValue`."
      },
      {
        "id": "B",
        "text": "Components that leak memory because the DOM keeps a hidden reference to every value the user ever typed into the field.",
        "isCorrect": false,
        "explanation": "Uncontrolled components are standard, safe form controls; they do not inherently leak memory."
      },
      {
        "id": "C",
        "text": "Components that are forbidden from using the `ref` attribute, so their current value can never be read after mounting.",
        "isCorrect": false,
        "explanation": "Uncontrolled components rely on `ref` to read values; they are not forbidden from using it—quite the opposite."
      },
      {
        "id": "D",
        "text": "Components that change their own state at random intervals without any user input, driven by an internal DOM timer.",
        "isCorrect": false,
        "explanation": "Uncontrolled refers to the DOM owning the value, not to state changing on its own without input."
      }
    ],
    "correctAnswer": "A",
    "explanation": "An uncontrolled component lets the DOM own the form field's value; React does not track it in state. You read the current value on demand through a `ref` (or an initial `defaultValue`), as the snippet does with `this.input.current.value` on submit. This mirrors traditional HTML form behavior.\n\nBecause the value is not in state, the component does not re-render on each keystroke, which is lighter and integrates well with file inputs or non-React libraries that manage their own DOM. The cost is that you cannot easily validate or transform input as it is typed.\n\nThe nuance an interviewer probes: uncontrolled relies on `ref` and `defaultValue`, not `value`. Mixing a controlled `value` with uncontrolled usage, or omitting `onChange` while setting `value`, is what triggers React's controlled/uncontrolled warnings.",
    "interviewLine": "An uncontrolled input keeps its value in the DOM, so I read it through a `ref` on submit, which skips per-keystroke renders and suits file inputs or non-React widgets.",
    "misconception": "Thinking uncontrolled means dangerous or ref-less, when it simply means the DOM holds the value and you read it via a ref when needed.",
    "hints": [
      "See where the snippet reads the input's value.",
      "Ask whether React re-renders as the user types here.",
      "Uncontrolled inputs do use refs."
    ],
    "source": "300-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice defaultValue seeds the field while the DOM owns subsequent edits.",
      "language": "tsx",
      "code": "function Profile() {\n  const nameRef = useRef<HTMLInputElement>(null);\n  return (\n    <form onSubmit={(e) => { e.preventDefault(); alert(nameRef.current?.value); }}>\n      <input ref={nameRef} defaultValue=\"Ada\" />\n      <button>Save</button>\n    </form>\n  );\n}"
    }
  },
  {
    "id": "react-what-is-lifting-state-up-in-react",
    "title": "What is Lifting State Up in React?",
    "prompt": "What is Lifting State Up in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Converting the children into class components that inherit the shared value from a common base class higher in the hierarchy.",
        "isCorrect": false,
        "explanation": "React prefers composition and props over class inheritance; sharing state does not mean converting children to classes."
      },
      {
        "id": "B",
        "text": "Duplicating the state in each sibling and keeping the copies in sync with a `setInterval` that polls for differences.",
        "isCorrect": false,
        "explanation": "Duplicating state and polling to sync it causes drift and race conditions; the point is one owner, not two copies."
      },
      {
        "id": "C",
        "text": "Moving shared state to the closest common ancestor of the components that need it, passing the state and update callbacks down via props.",
        "isCorrect": true,
        "explanation": "Correct. Move the shared value to the closest common ancestor and pass it plus update callbacks down to the children."
      },
      {
        "id": "D",
        "text": "Moving the shared value onto the global `window` object so every component can read and write it without props.",
        "isCorrect": false,
        "explanation": "Writing state onto `window` is non-reactive and breaks encapsulation; it is not lifting state."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Lifting state up is moving a shared value from the children that use it into their closest common ancestor, which then passes the value and update callbacks back down as props. If two siblings must reflect the same data, keeping separate copies lets them drift; a single owner guarantees one source of truth.\n\nThis is React's standard answer to shared state before reaching for Context or a store: find the lowest component that contains everyone who needs the value, hold it there, and pass it down. Updates flow through that one place, so the siblings always agree.\n\nThe trade-off an interviewer wants: lift only to the closest common ancestor. Lifting too high causes broad re-renders and prop drilling; if the chain grows long, Context or a store is the better tool.",
    "interviewLine": "I explain lifting state up as putting a shared value in the closest common ancestor so there is one source of truth, then passing it and its updater down as props.",
    "misconception": "Keeping a copy of shared state in each sibling, when the fix is a single owner at the common ancestor passing it down.",
    "hints": [
      "Find the lowest ancestor that contains every component needing the value.",
      "Ask what keeps two siblings from disagreeing.",
      "Two synced copies is the anti-pattern to avoid."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the parent owns the selection so both panes stay in sync.",
      "language": "tsx",
      "code": "function Master() {\n  const [selected, setSelected] = useState<string | null>(null);\n  return (\n    <>\n      <List onPick={setSelected} />\n      <Detail id={selected} />\n    </>\n  );\n}"
    }
  },
  {
    "id": "react-how-to-create-props-proxy-for-hoc-component",
    "title": "How to create props proxy for HOC component?",
    "prompt": "How to create props proxy for HOC component?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "function HOC(WrappedComponent) {\n  return class Test extends Component {\n    render() {\n      const newProps = {\n        title: 'New Header',\n        footer: false,\n        showFeatureX: false,\n        showFeatureY: true,\n      };\n\n      return <WrappedComponent {...this.props} {...newProps} />;\n    }\n  };\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Mutate a global `window.__GLOBAL_PROPS__` object before rendering so the wrapped component picks up the extra values.",
        "isCorrect": false,
        "explanation": "Mutating a global is fragile and breaks encapsulation; a props proxy merges props explicitly in the HOC's render."
      },
      {
        "id": "B",
        "text": "In the HOC render method, intercept incoming `this.props`, merge or manipulate additional props, and pass the combined props to `<WrappedComponent {...this.props} {...extraProps} />`.",
        "isCorrect": true,
        "explanation": "Correct. In the HOC's render, merge incoming `this.props` with extra props and pass the combination to the wrapped component."
      },
      {
        "id": "C",
        "text": "Props cannot be modified or extended inside a Higher-Order Component, so the wrapper must render the component unchanged.",
        "isCorrect": false,
        "explanation": "Extending and injecting props is exactly what the props proxy pattern does, so the claim that props cannot be modified is false."
      },
      {
        "id": "D",
        "text": "Delete the `props` property from the component's prototype so the HOC can attach a fresh set in its place at render time.",
        "isCorrect": false,
        "explanation": "Deleting from the prototype corrupts runtime behavior; a props proxy simply spreads and merges props."
      }
    ],
    "correctAnswer": "B",
    "explanation": "A props proxy is a higher-order component that wraps a component, intercepts the incoming props, and passes a merged set down to the wrapped component. In the snippet the HOC spreads `this.props` and then layers extra props (`title`, `showFeatureY`) via `<WrappedComponent {...this.props} {...newProps} />`.\n\nThis lets the wrapper inject defaults, override values, add behavior, or filter props without the wrapped component knowing. Order matters: later spreads win, so `newProps` here overrides any clashing incoming prop.\n\nThe nuance an interviewer probes: props proxies are a classic HOC technique, but hooks now cover most of these cases more directly. When you do use one, forward `ref` deliberately (HOCs do not forward refs automatically) and avoid silently shadowing props the caller passed.",
    "interviewLine": "I describe a props proxy HOC as one that spreads the incoming props and layers its own on top before rendering the wrapped component, so later overrides win by spread order.",
    "misconception": "Believing a HOC cannot reshape props, when the props proxy pattern exists precisely to intercept and extend them.",
    "hints": [
      "Look at the two spreads in the wrapped element.",
      "Ask which spread wins when keys collide.",
      "This is about merging props, not touching globals or prototypes."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the later spread lets the HOC override a prop the caller passed.",
      "language": "tsx",
      "code": "function withDefaults<P extends { size?: string }>(Wrapped: React.ComponentType<P>) {\n  return (props: P) => <Wrapped size=\"md\" {...props} />; // caller's size wins\n}\n\nconst Button = ({ size }: { size?: string }) => <button className={size}>Go</button>;\nconst Primary = withDefaults(Button);"
    }
  },
  {
    "id": "react-what-is-context",
    "title": "What is context?",
    "prompt": "What is context?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const { Provider, Consumer } = React.createContext(defaultValue);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A database connection string stored in browser cookies that components read to reach shared application data.",
        "isCorrect": false,
        "explanation": "Context is an in-memory feature of the component tree, not a connection string stored in cookies."
      },
      {
        "id": "B",
        "text": "A React feature (`createContext`, `useContext`, `<Provider>`) that allows passing data through the component tree without having to pass props down manually at every level.",
        "isCorrect": true,
        "explanation": "Correct. Context (`createContext`, `<Provider>`, `useContext`) passes a value down the tree without manual prop threading at each level."
      },
      {
        "id": "C",
        "text": "A compiler plugin that translates JSX into TypeScript definitions so shared values are typed across the component tree.",
        "isCorrect": false,
        "explanation": "Context is a runtime React API, not a compiler plugin that emits type definitions."
      },
      {
        "id": "D",
        "text": "A browser performance API that measures CPU and memory so components can share profiling data without passing props.",
        "isCorrect": false,
        "explanation": "Context carries component data; it does not measure CPU or memory performance."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Context lets you provide a value at one point in the tree and read it anywhere below without passing it through every intermediate component. You create it with `createContext(defaultValue)`, wrap a subtree in `<Context.Provider value={...}>`, and read it with `useContext(Context)`. It is React's built-in answer to prop drilling for ambient values.\n\nTypical uses are app-wide concerns many components need: theme, the authenticated user, locale. Any consumer below the provider re-renders when the provider's `value` changes.\n\nThe nuance an interviewer probes: every consumer re-renders when `value` changes identity, so passing a fresh object literal as `value` on each render re-renders all consumers unnecessarily. Memoize the value, and split contexts so unrelated consumers do not re-render together.",
    "interviewLine": "Context provides a value to a subtree so any descendant can read it with `useContext`, but since every consumer re-renders on value changes, I memoize the value and split contexts.",
    "misconception": "Assuming Context is free to update, when every consumer re-renders on each change of the provider's value identity.",
    "hints": [
      "Think about ambient values many components need, like theme or user.",
      "Ask what happens to consumers when the provider's value changes.",
      "A fresh object as the value each render is the trap."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/useContext",
    "example": {
      "caption": "Notice the value is memoized so consumers do not re-render on unrelated parent updates.",
      "language": "tsx",
      "code": "const AuthCtx = React.createContext<{ user: string | null }>({ user: null });\n\nfunction AuthProvider({ children }: { children: React.ReactNode }) {\n  const [user] = useState<string | null>('ada');\n  const value = useMemo(() => ({ user }), [user]);\n  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;\n}"
    }
  },
  {
    "id": "react-what-is-children-prop",
    "title": "What is children prop?",
    "prompt": "What is children prop?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "const MyDiv = React.createClass({\n  render: function () {\n    return <div>{this.props.children}</div>;\n  },\n});\n\nReactDOM.render(\n  <MyDiv>\n    <span>{'Hello'}</span>\n    <span>{'World'}</span>\n  </MyDiv>,\n  node,\n);",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "A TypeScript type that only permits integer values, so a component can accept a fixed count of nested elements.",
        "isCorrect": false,
        "explanation": "`children` is not restricted to integers; it can be any renderable `ReactNode`."
      },
      {
        "id": "B",
        "text": "An array of database records a component fetches from a backend API and renders between its opening and closing tags.",
        "isCorrect": false,
        "explanation": "`children` holds nested JSX, not database records fetched from an API."
      },
      {
        "id": "C",
        "text": "A list of operating-system child processes a React component spawns in Node.js to render nested markup in parallel.",
        "isCorrect": false,
        "explanation": "`children` refers to nested UI markup, not operating-system child processes."
      },
      {
        "id": "D",
        "text": "A special prop (`props.children`) containing whatever elements, components, or text are placed between the opening and closing tags of a JSX component.",
        "isCorrect": true,
        "explanation": "Correct. `children` is the prop containing whatever elements, text, or components sit between a component's tags."
      }
    ],
    "correctAnswer": "D",
    "explanation": "`children` is the prop that holds whatever JSX you place between a component's opening and closing tags. React fills it automatically, so a component can render arbitrary nested content with `{props.children}`, which is the basis of composition and layout wrappers.\n\nIt can be anything renderable: elements, strings, numbers, fragments, arrays, or `null`. This is what lets a `Card` or `Layout` accept any content without knowing it in advance, keeping the wrapper generic and reusable.\n\nThe nuance an interviewer probes: `children` may be a single node or many, so helpers like `React.Children.map`, `.count`, and `.toArray` exist to iterate safely regardless of shape. The snippet uses the legacy `React.createClass`/`ReactDOM.render` API; modern code uses function components and `createRoot`.",
    "interviewLine": "I describe `children` as the prop React fills with whatever JSX sits between a component's tags, which is what makes generic wrappers like layouts and cards composable.",
    "misconception": "Thinking `children` is a special narrow type, when it is just a prop holding any renderable content placed between the tags.",
    "hints": [
      "Look at what gets passed into `MyDiv` between its tags.",
      "Ask how a wrapper renders content it did not know about in advance.",
      "It accepts any renderable node, not just one type."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the Card renders arbitrary nested content via children.",
      "language": "tsx",
      "code": "function Card({ children }: { children: React.ReactNode }) {\n  return <div className=\"card\">{children}</div>;\n}\n\nfunction Page() {\n  return (\n    <Card>\n      <h2>Title</h2>\n      <p>Body text</p>\n    </Card>\n  );\n}"
    }
  },
  {
    "id": "react-what-is-the-purpose-of-using-super-constructor-with-pro",
    "title": "What is the purpose of using super constructor with props argument?",
    "prompt": "What is the purpose of using super constructor with props argument?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    console.log(this.props); // prints { name: 'John', age: 42 }\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super();\n\n    console.log(this.props); // prints undefined\n\n    // but props parameter is still available\n    console.log(props); // prints { name: 'John', age: 42 }\n  }\n\n  render() {\n    // no difference outside constructor\n    console.log(this.props); // prints { name: 'John', age: 42 }\n  }\n}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Calling `super(props)` in a class constructor initializes the base `React.Component` and allows accessing `this.props` within the constructor body.",
        "isCorrect": true,
        "explanation": "Correct. `super(props)` initializes the base `React.Component` and makes `this.props` available within the constructor body."
      },
      {
        "id": "B",
        "text": "It enables multi-threaded rendering on the GPU for that component by handing props to a background worker thread.",
        "isCorrect": false,
        "explanation": "`super(props)` is standard class initialization; it has nothing to do with GPU threading."
      },
      {
        "id": "C",
        "text": "It permanently prevents the component from unmounting, so React keeps its props alive for the lifetime of the page.",
        "isCorrect": false,
        "explanation": "`super(props)` does not affect unmounting; it only concerns constructor-time access to `this.props`."
      },
      {
        "id": "D",
        "text": "It opens a connection to an external PostgreSQL database and binds the fetched rows to the component's props.",
        "isCorrect": false,
        "explanation": "`super(props)` is ES6 inheritance setup, unrelated to connecting to a database."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Calling `super(props)` in a class component's constructor runs the `React.Component` base constructor and, crucially, assigns `this.props` so you can read it inside the constructor body. The snippet shows the difference: with `super(props)`, `this.props` is the props object; with `super()`, `this.props` is `undefined` inside the constructor even though the `props` parameter is still available.\n\nIn practice you need `super(props)` only if you read `this.props` during construction. React assigns `this.props` right after the constructor regardless, so outside the constructor both forms behave identically.\n\nThe nuance an interviewer probes: `this` cannot be touched before `super()` is called in any ES6 subclass; passing `props` is specifically about having `this.props` populated during the constructor, not about whether props reach the component.",
    "interviewLine": "I pass `super(props)` so `this.props` is populated inside the constructor; outside it React assigns props regardless, so the two forms only differ during construction.",
    "misconception": "Thinking `super(props)` is what delivers props to the component, when React assigns `this.props` anyway and `super(props)` only matters inside the constructor.",
    "hints": [
      "Compare `this.props` in the two constructors in the snippet.",
      "Ask when the difference actually shows up.",
      "Outside the constructor, both behave the same."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice this.props is readable in the constructor only because super received props.",
      "language": "tsx",
      "code": "class Greeting extends React.Component<{ name: string }> {\n  constructor(props: { name: string }) {\n    super(props);\n    console.log(this.props.name); // available because of super(props)\n  }\n  render() { return <h1>Hi {this.props.name}</h1>; }\n}"
    }
  },
  {
    "id": "react-what-are-error-boundaries-in-react-v16",
    "title": "What are error boundaries in React v16?",
    "prompt": "What are error boundaries in React v16?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeSnippet": "class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  componentDidCatch(error, info) {\n    // You can also log the error to an error reporting service\n    logErrorToMyService(error, info);\n  }\n\n  static getDerivedStateFromError(error) {\n    // Update state so the next render will show the fallback UI.\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      // You can render any custom fallback UI\n      return <h1>{'Something went wrong.'}</h1>;\n    }\n    return this.props.children;\n  }\n}\n\n<ErrorBoundary>\n  <MyWidget />\n</ErrorBoundary>",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Backend Node.js middleware that logs HTTP 500 responses so server-rendered React pages can report failed requests.",
        "isCorrect": false,
        "explanation": "Error boundaries are client-side React UI components, not backend logging middleware."
      },
      {
        "id": "B",
        "text": "Try/catch wrappers that automatically catch asynchronous errors thrown inside `setTimeout` callbacks and event handlers.",
        "isCorrect": false,
        "explanation": "Boundaries do not catch errors in event handlers or async timers; those require ordinary `try/catch`."
      },
      {
        "id": "C",
        "text": "Class components that implement `static getDerivedStateFromError` and/or `componentDidCatch` to catch JavaScript errors in their child component tree and display a fallback UI.",
        "isCorrect": true,
        "explanation": "Correct. A class with `getDerivedStateFromError`/`componentDidCatch` catches render-tree errors in its children and shows a fallback UI."
      },
      {
        "id": "D",
        "text": "A built-in `useErrorBoundary()` hook, added in React 16, that lets any function component catch its children's errors.",
        "isCorrect": false,
        "explanation": "There is no built-in `useErrorBoundary` hook; boundaries are implemented as class components with these lifecycle methods."
      }
    ],
    "correctAnswer": "C",
    "explanation": "An error boundary is a class component that implements `static getDerivedStateFromError` and/or `componentDidCatch` to catch JavaScript errors thrown while rendering its child tree, then renders a fallback UI instead of letting the whole app crash. The snippet flips `hasError` on catch and renders a message in place of the broken subtree.\n\nThis contains failures: a bug in one widget shows a localized fallback rather than unmounting the entire application. `getDerivedStateFromError` updates state for the fallback; `componentDidCatch` is where you log to a reporting service.\n\nThe limitation an interviewer always probes: boundaries catch errors in rendering, lifecycle methods, and constructors of their descendants, but not errors in event handlers, async callbacks, or the boundary's own code. Those need ordinary `try/catch`.",
    "interviewLine": "I'd say an error boundary catches render-time errors in its subtree via `getDerivedStateFromError` and shows a fallback, but I remember event handlers still need their own `try/catch`.",
    "misconception": "Expecting error boundaries to catch everything, when they only catch render-path errors in descendants, not event-handler or async errors.",
    "hints": [
      "Note which lifecycle methods make a class a boundary.",
      "Ask which kinds of errors a boundary does not catch.",
      "An onClick that throws is outside the render path."
    ],
    "source": "300-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    "example": {
      "caption": "Notice the event handler needs its own try/catch; the boundary won't catch it.",
      "language": "tsx",
      "code": "function SaveButton({ save }: { save: () => Promise<void> }) {\n  async function onClick() {\n    try { await save(); } catch (err) { console.error(err); }\n  }\n  return <button onClick={onClick}>Save</button>;\n}"
    }
  },
  {
    "id": "react-what-is-the-purpose-of-getsnapshotbeforeupdate-lifecycl",
    "title": "What is the purpose of getSnapshotBeforeUpdate() lifecycle method?",
    "prompt": "What is the purpose of getSnapshotBeforeUpdate() lifecycle method?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "class MyComponent extends React.Component {\n  getSnapshotBeforeUpdate(prevProps, prevState) {\n    // ...\n  }\n}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Invoked right before DOM mutations are committed, allowing the component to capture information from the DOM (e.g. scroll position) and pass it to `componentDidUpdate`.",
        "isCorrect": true,
        "explanation": "Correct. It runs before DOM mutations commit, letting you capture DOM info and forward it to `componentDidUpdate`."
      },
      {
        "id": "B",
        "text": "It saves a serialized backup of the component's state to disk storage so a crash can restore the previous render.",
        "isCorrect": false,
        "explanation": "It passes transient DOM metrics to `componentDidUpdate`, not a persisted backup to disk."
      },
      {
        "id": "C",
        "text": "It cancels the pending render pass whenever the component's state has not changed since the last commit.",
        "isCorrect": false,
        "explanation": "Cancelling a render is `shouldComponentUpdate`'s job, not this method's."
      },
      {
        "id": "D",
        "text": "It captures a webcam photograph of the user before the DOM updates so analytics can correlate renders with attention.",
        "isCorrect": false,
        "explanation": "It captures DOM measurements like scroll position, not webcam photos."
      }
    ],
    "correctAnswer": "A",
    "explanation": "`getSnapshotBeforeUpdate(prevProps, prevState)` runs right before React commits DOM mutations, so you can read something from the current DOM (like scroll position or size) before it changes. Whatever it returns is passed as the third argument to `componentDidUpdate`, which runs after the commit.\n\nThe classic use is preserving scroll position in a list that is prepending items: capture `scrollHeight` in the snapshot, then adjust `scrollTop` in `componentDidUpdate` using that captured value. It bridges the pre- and post-commit DOM states.\n\nThe nuance an interviewer probes: this pair replaces the removed `componentWillUpdate`, which was unsafe because the DOM could change between it and the actual commit. In function components, you achieve the same by reading layout in `useLayoutEffect`.",
    "interviewLine": "`getSnapshotBeforeUpdate` reads the DOM just before commit and hands that value to `componentDidUpdate`, which is how I preserve scroll position across updates.",
    "misconception": "Mistaking it for a state-persistence or render-skipping hook, when it only captures pre-commit DOM info to hand to `componentDidUpdate`.",
    "hints": [
      "Think about reading the DOM at the exact moment before it changes.",
      "Ask where its return value ends up.",
      "It does not decide whether to render."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice useLayoutEffect is the function-component equivalent for reading layout pre-paint.",
      "language": "tsx",
      "code": "function Measured() {\n  const ref = useRef<HTMLDivElement>(null);\n  useLayoutEffect(() => {\n    const h = ref.current?.offsetHeight ?? 0;\n    console.log('height before paint', h);\n  });\n  return <div ref={ref}>content</div>;\n}"
    }
  },
  {
    "id": "react-why-is-ismounted-an-anti-pattern-and-what-is-the-proper",
    "title": "Why is isMounted() an anti-pattern and what is the proper solution?",
    "prompt": "Why is isMounted() an anti-pattern and what is the proper solution?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "if (this.isMounted()) {\nthis.setState({...})\n}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "`isMounted()` only works on backend Node.js servers, so calling it in the browser silently returns an incorrect value.",
        "isCorrect": false,
        "explanation": "`isMounted()` was a client-side component method; the issue is leaked async work, not where it ran."
      },
      {
        "id": "B",
        "text": "Calling `isMounted()` clears all of the browser's cookies as a side effect, which is why React discourages its use.",
        "isCorrect": false,
        "explanation": "The problem is lingering subscriptions and memory leaks, not cookie deletion."
      },
      {
        "id": "C",
        "text": "`isMounted()` is the recommended best practice for guarding every asynchronous state update in modern React code.",
        "isCorrect": false,
        "explanation": "`isMounted()` is an official anti-pattern and was removed; it is not a recommended practice."
      },
      {
        "id": "D",
        "text": "`isMounted()` masked memory leaks instead of fixing them; the proper solution is cancelling async callbacks, aborting fetch requests (`AbortController`), or clearing timers on unmount.",
        "isCorrect": true,
        "explanation": "Correct. `isMounted()` masks a leak; the fix is cancelling the async callback, aborting the fetch, or clearing the timer on unmount."
      }
    ],
    "correctAnswer": "D",
    "explanation": "`isMounted()` was used to guard `setState` after unmount so React would not warn about updating an unmounted component. The problem is that it treats the symptom, not the cause: if you are calling `setState` after unmount, you are holding a reference past the component's life, which means a subscription, timer, or request was never cleaned up.\n\nThe real fix is to cancel the source of the late update. Abort fetches with `AbortController`, clear timers, and unsubscribe from events in `componentWillUnmount` (or an effect's cleanup). Then there is no late `setState` to suppress.\n\nThe nuance an interviewer wants: `isMounted` was removed from React precisely because it encourages leaving leaks in place. The warning it silenced is pointing at a lifecycle bug you should fix at the source.",
    "interviewLine": "`isMounted` just hides the warning while the leak remains; I fix the cause by aborting the fetch or clearing the subscription in cleanup so there is no late `setState`.",
    "misconception": "Treating the unmounted-setState warning as noise to silence, when it flags an uncleaned subscription, timer, or request to cancel at the source.",
    "hints": [
      "Ask why a component is still trying to setState after it unmounted.",
      "Think about what the warning is really pointing at.",
      "Cancel the source rather than guard the update."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice the cleanup aborts the request so no update fires after unmount.",
      "language": "tsx",
      "code": "function useUser(id: string) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/user/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setUser)\n      .catch(() => {});\n    return () => ac.abort();\n  }, [id]);\n  return user;\n}"
    }
  },
  {
    "id": "react-what-is-the-difference-between-constructor-and-getiniti",
    "title": "What is the difference between constructor and getInitialState?",
    "prompt": "What is the difference between constructor and getInitialState?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      /* initial state */\n    };\n  }\n}\n\nconst MyComponent = React.createClass({\n  getInitialState() {\n    return {\n      /* initial state */\n    };\n  },\n});",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A `constructor` can only return boolean values indicating success, while `getInitialState` returns the full state object.",
        "isCorrect": false,
        "explanation": "Constructors do not return booleans; both approaches establish an initial state object, just through different APIs."
      },
      {
        "id": "B",
        "text": "Initialize state in `constructor(props)` when using ES6 classes (`this.state = ...`); `getInitialState()` was used with legacy `React.createClass` (deprecated).",
        "isCorrect": true,
        "explanation": "Correct. ES6 classes set `this.state` in the constructor; `getInitialState()` was the legacy `React.createClass` way, now deprecated."
      },
      {
        "id": "C",
        "text": "A `constructor` runs only on the server during SSR, while `getInitialState` runs only after the component hydrates on the client.",
        "isCorrect": false,
        "explanation": "Both run during initial instantiation; neither is server-only versus client-only."
      },
      {
        "id": "D",
        "text": "`getInitialState` is the standard Hook used to initialize state in modern React 19 function components.",
        "isCorrect": false,
        "explanation": "`getInitialState` is not a hook; it was removed in React 16, and modern function components use `useState`."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Both set up a component's initial state, but they belong to different APIs. With ES6 classes you assign `this.state = {...}` in the `constructor` (after `super(props)`). With the legacy `React.createClass` factory you defined a `getInitialState()` method that returned the initial state object. The constructor is the modern form.\n\nThe practical point: `getInitialState` only ever existed under `React.createClass`, which React deprecated and removed in v16. Modern components use ES6 class constructors, or more commonly `useState` in function components.\n\nThe nuance an interviewer probes: in a constructor you must call `super(props)` before setting `this.state`, and you set `this.state` directly rather than calling `setState`. The two APIs are not interchangeable; one replaced the other.",
    "interviewLine": "I'd explain that ES6 class components set `this.state` in the constructor, while `getInitialState` was the old `createClass` mechanism React removed in v16, and function components now use `useState`.",
    "misconception": "Treating the two as interchangeable options, when `getInitialState` belonged to the removed `createClass` API that the ES6 constructor replaced.",
    "hints": [
      "Match each form to the API it came from.",
      "Ask which one still exists in modern React.",
      "One of these was removed in React 16."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice the modern form is just useState in a function component.",
      "language": "tsx",
      "code": "function Counter() {\n  const [count, setCount] = useState(0); // replaces constructor state and getInitialState\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}"
    }
  },
  {
    "id": "react-what-is-the-difference-between-super-and-superprops-in",
    "title": "What is the difference between super() and super(props) in React using ES6 classes?",
    "prompt": "What is the difference between super() and super(props) in React using ES6 classes?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    console.log(this.props); // { name: 'John'... }\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super();\n    console.log(this.props); // undefined\n  }\n}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "`super(props)` is required inside every function component that uses Hooks, since Hooks run through the base class constructor.",
        "isCorrect": false,
        "explanation": "Function components with hooks have no constructor or `super`, so `super(props)` does not apply to them."
      },
      {
        "id": "B",
        "text": "`super()` opens a connection to PostgreSQL while `super(props)` connects to MongoDB, depending on the data source.",
        "isCorrect": false,
        "explanation": "`super` is ES6 class inheritance syntax; it has nothing to do with connecting to databases."
      },
      {
        "id": "C",
        "text": "Passing `super(props)` allows accessing `this.props` inside the class constructor; calling `super()` leaves `this.props` undefined inside constructor (though available in render).",
        "isCorrect": true,
        "explanation": "Correct. `super(props)` makes `this.props` readable in the constructor; `super()` leaves it undefined there, though render still gets props."
      },
      {
        "id": "D",
        "text": "Calling `super()` without props permanently disables rendering, so the component can never produce output again.",
        "isCorrect": false,
        "explanation": "React assigns `this.props` after the constructor regardless, so `super()` does not disable rendering."
      }
    ],
    "correctAnswer": "C",
    "explanation": "In an ES6 subclass you must call `super()` before touching `this`. For a React class component, passing `props` to `super(props)` makes React assign `this.props` before the constructor body runs, so you can read `this.props` there. Calling `super()` without props leaves `this.props` as `undefined` inside the constructor, as the snippet shows.\n\nOutside the constructor it makes no difference: React assigns `this.props` right after the constructor returns, so `render` and lifecycle methods always see the correct props either way.\n\nThe nuance an interviewer probes: the choice only affects constructor-time access to `this.props`. The `props` parameter is always available by name, so `super()` plus reading the `props` argument also works; `super(props)` just keeps `this.props` consistent inside the constructor.",
    "interviewLine": "I'd point out that `super(props)` populates `this.props` inside the constructor while `super()` leaves it undefined there, but React assigns props afterward so render is unaffected either way.",
    "misconception": "Believing `super()` versus `super(props)` changes whether the component gets props at all, when it only affects `this.props` inside the constructor.",
    "hints": [
      "Compare `this.props` right after each `super` call.",
      "Ask whether render ever sees undefined props.",
      "The difference is confined to the constructor."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice reading this.props in the constructor requires passing props to super.",
      "language": "tsx",
      "code": "class Panel extends React.Component<{ title: string }> {\n  constructor(props: { title: string }) {\n    super(props);\n    this.state = { heading: this.props.title }; // needs super(props)\n  }\n  state: { heading: string };\n  render() { return <h2>{this.state.heading}</h2>; }\n}"
    }
  },
  {
    "id": "react-how-to-listen-to-state-changes",
    "title": "How to listen to state changes?",
    "prompt": "How to listen to state changes?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "componentDidUpdate(object prevProps, object prevState)",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Attach a DOM `MutationObserver` to the document body so the browser notifies you whenever React commits a state change.",
        "isCorrect": false,
        "explanation": "State is internal JavaScript; you observe it with hooks or lifecycle methods, not a DOM MutationObserver."
      },
      {
        "id": "B",
        "text": "Poll `this.state` inside a synchronous `while(true)` loop on the main thread until the value you are watching changes.",
        "isCorrect": false,
        "explanation": "A synchronous `while(true)` loop blocks the thread so updates never render; this cannot observe state."
      },
      {
        "id": "C",
        "text": "In functional components, use `useEffect(() => { ... }, [stateVar])`; in class components, use `componentDidUpdate(prevProps, prevState)` to compare previous and current state.",
        "isCorrect": true,
        "explanation": "Correct. Use `useEffect` with the value as a dependency in function components, or compare prev values in `componentDidUpdate` in classes."
      },
      {
        "id": "D",
        "text": "State changes cannot be observed in React, so you must re-mount the component each time you need the latest value.",
        "isCorrect": false,
        "explanation": "State changes are observable via `useEffect` and `componentDidUpdate`; the claim that they cannot be is false."
      }
    ],
    "correctAnswer": "C",
    "explanation": "To react to state changes in a function component you use `useEffect` with the changed value in its dependency array; React runs the effect after each commit where that value differs. In a class component you compare `prevState`/`prevProps` to the current ones inside `componentDidUpdate`. Both let you run side effects in response to a change.\n\nThe snippet shows the class form, `componentDidUpdate(prevProps, prevState)`, where you guard with a comparison so the effect only runs when the value you care about actually changed.\n\nThe nuance an interviewer probes: dependency arrays and `prevState` guards exist to avoid running on every render. In `useEffect`, forgetting the dependency or including an unstable one (a fresh object each render) makes the effect fire too often; `componentDidUpdate` without a guard does the same.",
    "interviewLine": "I respond to a state change with `useEffect` keyed on that value, or `componentDidUpdate` with a prev-value guard, so the side effect runs only when it actually changed.",
    "misconception": "Reaching for polling or DOM observers, when React gives you `useEffect` dependencies and `componentDidUpdate` to respond to changes.",
    "hints": [
      "Think about what React calls after a commit when a value changed.",
      "Ask how you avoid running on every render.",
      "Polling in a loop is the wrong approach."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the effect runs only when query changes, thanks to the dependency array.",
      "language": "tsx",
      "code": "function Search({ query }: { query: string }) {\n  useEffect(() => {\n    const id = setTimeout(() => console.log('search', query), 300);\n    return () => clearTimeout(id);\n  }, [query]);\n  return null;\n}"
    }
  },
  {
    "id": "react-what-are-the-possible-ways-of-updating-objects-in-state",
    "title": "What are the possible ways of updating objects in state?",
    "prompt": "What are the possible ways of updating objects in state?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const user = Object.assign({}, this.state.user, { age: 42 });\n this.setState({ user });\n\nconst user = { ...this.state.user, age: 42 };\n this.setState({ user });\n\nthis.setState((prevState) => ({\n     user: {\n       ...prevState.user,\n       age: 42,\n     },\n   }));",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Serialize the object to an XML string, patch the relevant node with a regular expression, then parse it back into state.",
        "isCorrect": false,
        "explanation": "Converting to XML and regex-parsing is absurd overhead; object spread handles updates cleanly."
      },
      {
        "id": "B",
        "text": "Delete the object from memory and prompt the user to refresh the page so the component rebuilds its state from scratch.",
        "isCorrect": false,
        "explanation": "You never delete state and force a refresh; state updates immutably in memory."
      },
      {
        "id": "C",
        "text": "Use object spread `setState(prev => ({ ...prev, age: 42 }))`, `Object.assign({}, prev, { age: 42 })`, or immutable update libraries like Immer (`produce`).",
        "isCorrect": true,
        "explanation": "Correct. Create a new object with the spread, `Object.assign`, or an immutable helper like Immer, preserving unchanged fields."
      },
      {
        "id": "D",
        "text": "Mutate the field in place with `state.user.age = 42` and rely on React noticing the change on its next render pass.",
        "isCorrect": false,
        "explanation": "Mutating `state.user.age` keeps the same reference, so React may skip the re-render; always produce a new object."
      }
    ],
    "correctAnswer": "C",
    "explanation": "You update object state immutably by building a new object rather than mutating the existing one. Common forms are the spread (`setState(prev => ({ ...prev, age: 42 }))`), `Object.assign({}, prev, { age: 42 })`, or an immutable helper like Immer's `produce`. The snippet shows all three in the class `setState` style.\n\nImmutability matters because React (and memoized children) decide whether to re-render by comparing references. Mutating the existing object in place keeps the same reference, so the change can be missed and the UI will not update reliably.\n\nThe nuance an interviewer probes: use the updater function form when the next value depends on the previous one, to avoid stale closures over batched updates. For nested objects, spread each level you change or reach for Immer so you do not accidentally share and mutate inner references.",
    "interviewLine": "I update object state by producing a new object with the spread or Immer, and use the updater function form when the next value depends on the previous.",
    "misconception": "Mutating the existing state object in place, when React compares references and needs a new object to detect the change.",
    "hints": [
      "Ask how React decides whether the object changed.",
      "Think about keeping unchanged fields while replacing one.",
      "Mutating in place keeps the same reference, which is the trap."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the updater returns a new object, preserving the other fields.",
      "language": "typescript",
      "code": "const [user, setUser] = useState({ name: 'Ada', age: 36 });\n\nfunction haveBirthday() {\n  setUser((prev) => ({ ...prev, age: prev.age + 1 }));\n}"
    }
  },
  {
    "id": "react-how-to-make-ajax-call-and-in-which-component-lifecycle",
    "title": "How to make AJAX call and in which component lifecycle methods should I make an AJAX call?",
    "prompt": "How to make AJAX call and in which component lifecycle methods should I make an AJAX call?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      employees: [],\n      error: null,\n    };\n  }\n\n  componentDidMount() {\n    fetch('https://api.example.com/items')\n      .then((res) => res.json())\n      .then(\n        (result) => {\n          this.setState({\n            employees: result.employees,\n          });\n        },\n        (error) => {\n          this.setState({ error });\n        },\n      );\n  }\n\n  render() {\n    const { error, employees } = this.state;\n    if (error) {\n      return <div>Error: {error.message}</div>;\n    } else {\n      return (\n        <ul>\n          {employees.map((employee) => (\n            <li key={employee.name}>\n              {employee.name}-{employee.experience}\n            </li>\n          ))}\n        </ul>\n      );\n    }\n  }\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "HTTP requests are not allowed inside React components; all data must be injected as props from a parent at build time.",
        "isCorrect": false,
        "explanation": "HTTP requests are normal in React; fetching in effects or data libraries is standard practice."
      },
      {
        "id": "B",
        "text": "Make network requests inside `useEffect` in functional components (or `componentDidMount` in class components), using `fetch`, `axios`, or TanStack Query.",
        "isCorrect": true,
        "explanation": "Correct. Fetch in `useEffect` (or `componentDidMount` for classes) using `fetch`, `axios`, or TanStack Query, after the component mounts."
      },
      {
        "id": "C",
        "text": "Call the API synchronously inside the render body so the component always renders with the freshest data available.",
        "isCorrect": false,
        "explanation": "Fetching synchronously in render loops and blocks the UI; data fetching belongs in effects, not the render body."
      },
      {
        "id": "D",
        "text": "Fire the request inside the constructor before mount so the response is guaranteed to arrive before the first render.",
        "isCorrect": false,
        "explanation": "The constructor runs before mount, so responses could arrive before the component is attached; avoid side effects there."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Fetch data where the component is committed to the DOM: in function components that is inside `useEffect`, and in class components it is `componentDidMount`. The snippet uses `componentDidMount` to `fetch`, then `setState` with the result or an error. From there you render loading, error, and data states.\n\nYou avoid fetching in the render body (it would fire on every render and loop) and in the constructor (the component is not mounted, and a response could arrive during an aborted render). Mount is the first safe point where `setState` updates committed UI.\n\nThe nuance an interviewer probes: with `useEffect`, cancel in-flight requests on cleanup (via `AbortController`) and key the effect on the inputs that should refetch, or use a data library like TanStack Query that handles caching, dedup, and cancellation for you.",
    "interviewLine": "I kick off data fetching after mount—`useEffect` or `componentDidMount`—and cancel stale requests on cleanup, or lean on TanStack Query for caching and dedup.",
    "misconception": "Fetching in render or the constructor, when the safe point is after mount via an effect or `componentDidMount`.",
    "hints": [
      "Ask when the component is first safely attached to the DOM.",
      "Think about why fetching in render loops.",
      "The constructor runs too early for side effects."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice the fetch lives in an effect keyed on id, with cleanup to cancel.",
      "language": "tsx",
      "code": "function Items({ id }: { id: string }) {\n  const [items, setItems] = useState<string[]>([]);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/items/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setItems)\n      .catch(() => {});\n    return () => ac.abort();\n  }, [id]);\n  return <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>;\n}"
    }
  },
  {
    "id": "react-how-to-get-query-parameters-in-react-router-v4",
    "title": "How to get query parameters in React Router v4?",
    "prompt": "How to get query parameters in React Router v4?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "data-fetching",
    "tags": [
      "react",
      "data-fetching",
      "junior"
    ],
    "codeSnippet": "const queryString = require('query-string');\nconst parsed = queryString.parse(props.location.search);\n\nconst params = new URLSearchParams(props.location.search);\nconst foo = params.get('name');",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Parse the query parameters out of `document.cookie`, where React Router v4 mirrors the current URL's search string.",
        "isCorrect": false,
        "explanation": "Query parameters come from the URL's search string, not from `document.cookie`."
      },
      {
        "id": "B",
        "text": "Use native `new URLSearchParams(props.location.search)` or parse with libraries like `query-string` (in v6+, use the `useSearchParams()` hook).",
        "isCorrect": true,
        "explanation": "Correct. Parse `props.location.search` with `URLSearchParams` or `query-string` in v4/v5; v6 provides the `useSearchParams` hook."
      },
      {
        "id": "C",
        "text": "Split `window.navigator.userAgent` on the question mark to recover the parameters the router appended to the request.",
        "isCorrect": false,
        "explanation": "`userAgent` describes the browser, not the URL; it does not contain query parameters."
      },
      {
        "id": "D",
        "text": "Query parameters can only be read on the backend web server, so the client must request them from an API endpoint.",
        "isCorrect": false,
        "explanation": "`URLSearchParams` and router hooks read query strings on the client; this is not server-only."
      }
    ],
    "correctAnswer": "B",
    "explanation": "React Router v4/v5 stopped parsing query strings for you, exposing only the raw string at `props.location.search`. To read a param you parse that string yourself, either with the native `URLSearchParams` or a library like `query-string`. The snippet shows both approaches on `location.search`.\n\nThis was a deliberate design choice: query-string formats vary (arrays, nested keys), so the router left parsing to you. `URLSearchParams` covers the common cases without a dependency.\n\nThe nuance an interviewer probes: React Router v6 reintroduced a first-class API, `useSearchParams`, which returns a `URLSearchParams` and a setter. So the right answer depends on version: parse `location.search` in v4/v5, use the `useSearchParams` hook in v6.",
    "interviewLine": "In Router v4/v5 I parse `location.search` with `URLSearchParams`; in v6 I reach for the `useSearchParams` hook, which returns the params and a setter.",
    "misconception": "Expecting the router to hand you parsed query params in v4/v5, when it only gives the raw `location.search` for you to parse.",
    "hints": [
      "Note that v4/v5 only gives you the raw search string.",
      "Ask what native API parses a query string.",
      "v6 brought back a dedicated hook for this."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
    "example": {
      "caption": "Notice the v6 hook returns a URLSearchParams you read directly.",
      "language": "tsx",
      "code": "import { useSearchParams } from 'react-router-dom';\n\nfunction Results() {\n  const [params] = useSearchParams();\n  const q = params.get('q') ?? '';\n  return <p>Searching for {q}</p>;\n}"
    }
  },
  {
    "id": "react-how-to-pass-params-to-historypush-method-in-react-route",
    "title": "How to pass params to history.push method in React Router v4?",
    "prompt": "How to pass params to history.push method in React Router v4?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "data-fetching",
    "tags": [
      "react",
      "data-fetching",
      "junior"
    ],
    "codeSnippet": "this.props.history.push({\n  pathname: '/template',\n  search: '?name=sudheer',\n  state: { detail: response.data },\n});",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Parameters cannot be passed during programmatic navigation, so the destination must refetch them from the server.",
        "isCorrect": false,
        "explanation": "Parameters pass fine during programmatic navigation via the location descriptor's `search` and `state`."
      },
      {
        "id": "B",
        "text": "Pass a location descriptor object: `history.push({ pathname: '/target', search: '?key=value', state: { data } })` (or `navigate('/target', { state: { data } })` in v6).",
        "isCorrect": true,
        "explanation": "Correct. Pass a location descriptor with `pathname`, `search`, and `state` (or `navigate('/target', { state })` in v6)."
      },
      {
        "id": "C",
        "text": "Write the parameters into `document.title`, which the destination route reads back after the navigation completes.",
        "isCorrect": false,
        "explanation": "`document.title` sets the tab title, not navigation parameters."
      },
      {
        "id": "D",
        "text": "Encode every object as a Base64 string and append it to the domain hostname so the next route can decode it on load.",
        "isCorrect": false,
        "explanation": "History `state` carries objects in memory; there is no need to Base64-encode them into the hostname."
      }
    ],
    "correctAnswer": "B",
    "explanation": "`history.push` accepts a location descriptor object, so you can pass a path plus a query string plus transient state in one call: `{ pathname: '/template', search: '?name=sudheer', state: { detail } }`. The `pathname` and `search` end up in the URL; `state` rides along in the history entry without appearing in the URL.\n\nThis lets you send both bookmarkable data (search params) and private handoff data (`state`) during a programmatic navigation. The destination reads `search` from `location.search` and the handoff from `location.state`.\n\nThe nuance an interviewer probes: `location.state` is transient; it does not survive a manual refresh or a shared link, so anything that must be reconstructable belongs in the path or query. In Router v6 the equivalent is `navigate('/target', { state })`.",
    "interviewLine": "I push a location descriptor with `pathname`, `search`, and `state`, keeping bookmarkable data in `search` and transient handoffs in `state`, which does not survive a refresh.",
    "misconception": "Thinking you can only push a path string, when `push` takes a descriptor carrying `search` and transient `state` too.",
    "hints": [
      "Look at the three keys in the pushed object.",
      "Ask which part shows up in the URL and which does not.",
      "The `state` part is transient."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
    "example": {
      "caption": "Notice v6 navigate carries transient state separate from the URL path.",
      "language": "tsx",
      "code": "import { useNavigate } from 'react-router-dom';\n\nfunction Row({ item }: { item: { id: string } }) {\n  const navigate = useNavigate();\n  return <button onClick={() => navigate(`/detail/${item.id}`, { state: { item } })}>Open</button>;\n}"
    }
  },
  {
    "id": "system_design-what-is-flux",
    "title": "What is flux?",
    "prompt": "What is flux?",
    "level": "junior",
    "type": "output",
    "category": "system_design",
    "subject": "system-architecture",
    "tags": [
      "system_design",
      "system-architecture",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A full-stack MVC framework with built-in PostgreSQL database drivers.",
        "isCorrect": false,
        "explanation": "Flux is a client-side state-flow pattern, not a full-stack framework with database drivers."
      },
      {
        "id": "B",
        "text": "A CSS stylesheet preprocessor similar to Sass.",
        "isCorrect": false,
        "explanation": "Flux governs how application data moves, not CSS; it is unrelated to Sass or preprocessing."
      },
      {
        "id": "C",
        "text": "An architectural design pattern created by Facebook that enforces strict unidirectional data flow: Actions -> Dispatcher -> Stores -> Views, making state changes predictable.",
        "isCorrect": true,
        "explanation": "Correct. Flux is Facebook's unidirectional data-flow architecture: Actions to Dispatcher to Stores to Views, making state changes predictable."
      },
      {
        "id": "D",
        "text": "A hardware graphics accelerator card.",
        "isCorrect": false,
        "explanation": "Flux is a software architecture paradigm, not a hardware graphics accelerator."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Flux is an application design pattern Facebook introduced as an alternative to classic MVC for building UIs with React. It is not a library but an architecture built around unidirectional data flow: actions describe what happened, a dispatcher routes them to stores, stores hold state and emit changes, and views re-render from that state.\n\nThe single direction is the whole point. Because views can only trigger changes by dispatching actions, and stores are the only holders of state, you can trace exactly how any piece of state got to its current value, which tames the cascading updates that plague two-way MVC binding.\n\nThe nuance an interviewer probes: Flux inspired Redux, which simplifies it to one store and pure reducers with no separate dispatcher. Flux itself is the pattern; Redux and others are concrete implementations of it.",
    "interviewLine": "I describe Flux as a unidirectional data-flow pattern—action to dispatcher to store to view—that replaced two-way MVC binding and inspired Redux's single-store model.",
    "misconception": "Thinking Flux is a library or framework, when it is an architectural pattern of one-way data flow that libraries like Redux implement.",
    "hints": [
      "Picture which way data flows and what each stage does.",
      "Ask what Flux was designed to replace.",
      "It is a pattern, not a concrete library."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://web.dev/articles/vitals",
    "example": {
      "caption": "Notice the view only emits an action; the store is the sole state holder.",
      "language": "typescript",
      "code": "type Action = { type: 'ADD_TODO'; text: string };\nconst store = { todos: [] as string[] };\n\nfunction dispatch(action: Action) {\n  if (action.type === 'ADD_TODO') store.todos.push(action.text); // view -> action -> store\n}"
    }
  },
  {
    "id": "react-what-is-redux",
    "title": "What is Redux?",
    "prompt": "What is Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A browser extension that converts rendered HTML pages into downloadable PDF files for a React application.",
        "isCorrect": false,
        "explanation": "Redux is a state management library, not a browser extension that converts HTML to PDF."
      },
      {
        "id": "B",
        "text": "A predictable state container for JavaScript apps based on Flux principles, maintaining the entire application state in a single immutable store updated via pure reducers.",
        "isCorrect": true,
        "explanation": "Correct. Redux is a Flux-based predictable state container: one immutable store updated only through pure reducers."
      },
      {
        "id": "C",
        "text": "A database management system that stores application state on disk and replaces MongoDB for persistent data.",
        "isCorrect": false,
        "explanation": "Redux holds in-memory client state, not a disk database; it does not replace MongoDB."
      },
      {
        "id": "D",
        "text": "A styling library that generates responsive CSS utility classes from the shape of a React component's state.",
        "isCorrect": false,
        "explanation": "Redux manages state and transitions, not CSS; it is not a styling library."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Redux is a predictable state container for JavaScript apps based on Flux. It keeps the entire application state in a single immutable store, and the only way to change it is to dispatch an action that a pure reducer folds into a new state. It is tiny and framework-agnostic, usable with React or any view layer.\n\nThe predictability comes from constraints: one store, immutable updates, and pure reducers. Given the same state and action, a reducer always produces the same next state, which makes transitions traceable and enables time-travel debugging.\n\nThe nuance an interviewer probes: Redux core has no React dependency and no async handling. Side effects and async flows live in middleware (thunk, saga), and the React binding is the separate `react-redux` package.",
    "interviewLine": "I describe Redux as a Flux-based predictable store: a single immutable state tree changed only through pure reducers, which is what makes every transition traceable.",
    "misconception": "Expecting Redux to handle async or depend on React, when its core is a tiny, UI-agnostic store with pure reducers and side effects left to middleware.",
    "hints": [
      "Think about where all the state lives and how it changes.",
      "Ask what makes the transitions predictable.",
      "Redux core is UI-agnostic and synchronous."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice state changes only by dispatching an action into the pure reducer.",
      "language": "typescript",
      "code": "import { createStore } from 'redux';\n\nconst reducer = (s = 0, a: { type: string }) => (a.type === 'inc' ? s + 1 : s);\nconst store = createStore(reducer);\nstore.dispatch({ type: 'inc' });\nconsole.log(store.getState()); // 1"
    }
  },
  {
    "id": "react-what-is-the-difference-between-mapstatetoprops-and-mapd",
    "title": "What is the difference between mapStateToProps() and mapDispatchToProps()?",
    "prompt": "What is the difference between mapStateToProps() and mapDispatchToProps()?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const mapStateToProps = (state) => {\n  return {\n    todos: getVisibleTodos(state.todos, state.visibilityFilter),\n  };\n};\n\nconst mapDispatchToProps = (dispatch) => {\n  return {\n    onTodoClick: (id) => {\n      dispatch(toggleTodo(id));\n    },\n  };\n};\n\nconst mapDispatchToProps = {\n  onTodoClick,\n};",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "`mapStateToProps` writes component data to the backend database, while `mapDispatchToProps` reads fresh data from the server.",
        "isCorrect": false,
        "explanation": "Both are client-side store-mapping utilities; neither writes to a database or reads from a server directly."
      },
      {
        "id": "B",
        "text": "There is no difference; they are interchangeable aliases, so you can use either one to both read and update the store.",
        "isCorrect": false,
        "explanation": "They are not interchangeable: one reads state, the other provides dispatchers."
      },
      {
        "id": "C",
        "text": "`mapStateToProps` extracts and subscribes to state data from the Redux store as component props; `mapDispatchToProps` binds action creators to `dispatch` so the component can trigger updates.",
        "isCorrect": true,
        "explanation": "Correct. `mapStateToProps` injects selected state and subscribes to it; `mapDispatchToProps` provides action-dispatching callback props."
      },
      {
        "id": "D",
        "text": "`mapStateToProps` is used only in mobile React Native apps, while `mapDispatchToProps` applies only to desktop web builds.",
        "isCorrect": false,
        "explanation": "Both work across all React platforms; neither is mobile-only or desktop-only."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Both are the arguments you give `connect` to wire a Redux store to a component. `mapStateToProps(state)` selects the slices of state the component needs and injects them as props, subscribing the component to re-render when those values change. `mapDispatchToProps(dispatch)` provides callback props that dispatch actions, so the component can trigger updates. The snippet shows both, including the object-shorthand form for dispatch.\n\nSo one reads from the store and one writes to it. `mapStateToProps` runs on every store change to recompute props; `mapDispatchToProps` runs once (or when `ownProps` change) to build the dispatchers.\n\nThe nuance an interviewer probes: because `mapStateToProps` runs on every dispatch, returning a fresh object or doing heavy work there hurts performance; derive data with memoized selectors. The object-shorthand `mapDispatchToProps` is preferred over hand-wrapping `dispatch`.",
    "interviewLine": "I explain that `mapStateToProps` selects and subscribes to the state a component reads, while `mapDispatchToProps` supplies callback props that dispatch actions to change it.",
    "misconception": "Treating the two as the same, when one subscribes the component to read state and the other supplies callbacks to dispatch actions.",
    "hints": [
      "Separate reading from the store from writing to it.",
      "Ask which one runs on every store change.",
      "Returning a fresh object from the read mapper is the performance trap."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice useSelector reads state and useDispatch writes it, the hook equivalents.",
      "language": "tsx",
      "code": "import { useSelector, useDispatch } from 'react-redux';\n\nfunction Todo() {\n  const todos = useSelector((s: { todos: string[] }) => s.todos);\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch({ type: 'clear' })}>{todos.length}</button>;\n}"
    }
  },
  {
    "id": "react-can-i-dispatch-an-action-in-reducer",
    "title": "Can I dispatch an action in reducer?",
    "prompt": "Can I dispatch an action in reducer?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Reducers do not receive actions at all; the store passes only the current state, so there is nothing to dispatch from.",
        "isCorrect": false,
        "explanation": "Reducers do receive actions as parameters; the rule is only that they must not dispatch new ones."
      },
      {
        "id": "B",
        "text": "Yes, dispatching inside a reducer is the recommended way to kick off asynchronous data fetching when an action arrives.",
        "isCorrect": false,
        "explanation": "Async and dispatching belong in middleware (thunk/saga), never inside a pure reducer."
      },
      {
        "id": "C",
        "text": "No, dispatching an action within a reducer is an anti-pattern; reducers must be pure synchronous functions `(state, action) => newState` with zero side effects.",
        "isCorrect": true,
        "explanation": "Correct. Reducers must be pure synchronous functions with no side effects, so dispatching inside one is an anti-pattern."
      },
      {
        "id": "D",
        "text": "Yes, but only if you wrap the dispatch in a `setInterval` so the follow-up action fires on a later tick of the event loop.",
        "isCorrect": false,
        "explanation": "Timers inside a reducer are side effects that break purity; `setInterval` does not make it acceptable."
      }
    ],
    "correctAnswer": "C",
    "explanation": "No. A reducer must be a pure function `(state, action) => newState` with no side effects: it reads the current state and the action and returns the next state, nothing more. Dispatching from inside a reducer would be a side effect that triggers another reducer run, risking cascading or infinite loops and destroying the predictability Redux is built on.\n\nIn practice this keeps reducers deterministic and replayable, which is what powers features like time-travel debugging. Any logic that needs to dispatch in response to something belongs outside the reducer.\n\nThe nuance an interviewer wants: async work and action-triggering side effects go in middleware (thunks, sagas, listeners/RTK), which can dispatch freely. The reducer stays pure; the middleware orchestrates.",
    "interviewLine": "A reducer must stay pure—just `(state, action) => newState`—so I never dispatch inside it; action-triggering side effects belong in middleware.",
    "misconception": "Thinking a reducer can orchestrate further dispatches, when its purity requires it to only compute the next state.",
    "hints": [
      "Recall the exact signature and contract of a reducer.",
      "Ask what dispatching inside one would trigger.",
      "Side effects live in middleware, not reducers."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice the thunk dispatches; the reducer only computes the next state.",
      "language": "typescript",
      "code": "// middleware (thunk) is where dispatching lives\nconst loadUser = (id: string) => async (dispatch: (a: unknown) => void) => {\n  const user = await fetch(`/api/user/${id}`).then((r) => r.json());\n  dispatch({ type: 'user/loaded', user });\n};\n// reducer stays pure, no dispatch inside"
    }
  },
  {
    "id": "react-how-to-access-redux-store-outside-a-component",
    "title": "How to access Redux store outside a component?",
    "prompt": "How to access Redux store outside a component?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "store = createStore(myReducer);\n\nexport default store;",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Export the configured `store` instance from the file where it is created and import it directly (`import store from './store'; store.getState(); store.dispatch(...)`).",
        "isCorrect": true,
        "explanation": "Correct. Export the `store` singleton from its module and import it to call `getState()` or `dispatch()` from non-component code."
      },
      {
        "id": "B",
        "text": "The Redux store cannot be reached outside React components, so non-component code must proxy requests through a hook.",
        "isCorrect": false,
        "explanation": "The store is a standalone JavaScript object usable anywhere; it is not confined to components."
      },
      {
        "id": "C",
        "text": "Mutate a global `window.__SECRET_STORE__` object on every keystroke so utilities can read the latest state from it.",
        "isCorrect": false,
        "explanation": "Mutating `window.__SECRET_STORE__` is fragile; exporting the module is cleaner and type-safe."
      },
      {
        "id": "D",
        "text": "Store the current state in `document.cookie` and poll it on an interval whenever non-component code needs a value.",
        "isCorrect": false,
        "explanation": "Polling a cookie is unrelated to accessing the Redux store instance."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Export the configured `store` from the module where you create it, then import it wherever you need it. Non-component code—an API client, a utility, an interceptor—can call `store.getState()` to read state or `store.dispatch(action)` to update it, because the store is just a JavaScript object, not something tied to React.\n\nThis works precisely because Redux is UI-agnostic. The React binding is only for connecting components; the store itself can be used anywhere JavaScript runs.\n\nThe nuance an interviewer probes: do not stash the store on `window`; export the singleton module instead. And be careful reading state outside React—you get a snapshot, not a subscription, so pair it with `store.subscribe` if you need to react to changes outside components.",
    "interviewLine": "I export the store singleton from its module and import it in non-component code to call `getState` or `dispatch`, rather than leaking it onto `window`.",
    "misconception": "Assuming the store is only reachable through React, when it is a plain object you can import and use anywhere.",
    "hints": [
      "Remember the store is just a JavaScript object.",
      "Ask how a plain module gets access to it.",
      "Avoid putting it on the global object."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice an API interceptor dispatches via the imported store, no component involved.",
      "language": "typescript",
      "code": "import { store } from './store';\n\nexport function onUnauthorized() {\n  store.dispatch({ type: 'auth/loggedOut' });\n  return store.getState().auth.user;\n}"
    }
  },
  {
    "id": "system_design-are-there-any-similarities-between-redux-and-rxjs",
    "title": "Are there any similarities between Redux and RxJS?",
    "prompt": "Are there any similarities between Redux and RxJS?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "async-await",
    "tags": [
      "system_design",
      "async-await",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Redux is a client-side database engine, while RxJS is a CSS styling tool, so the two libraries never overlap in any way at all.",
        "isCorrect": false,
        "explanation": "Redux manages state and RxJS manages event streams; neither is a database or a styling tool."
      },
      {
        "id": "B",
        "text": "They are identical libraries maintained by the same author, differing only in the name you use when importing them.",
        "isCorrect": false,
        "explanation": "They are distinct libraries with different authors, scopes, and architectures, not identical."
      },
      {
        "id": "C",
        "text": "Both embrace reactive patterns, but Redux is an architectural state container while RxJS is a general observable-stream library.",
        "isCorrect": true,
        "explanation": "Correct. Both embrace reactive patterns, but Redux is a state container (reduce over actions) while RxJS is a general observable-stream library."
      },
      {
        "id": "D",
        "text": "There are no similarities of any kind; Redux is purely imperative and RxJS is purely declarative with no shared ideas.",
        "isCorrect": false,
        "explanation": "They do share reactive and functional roots, so claiming no similarity at all is wrong."
      }
    ],
    "correctAnswer": "C",
    "explanation": "They share the reactive, functional mindset but solve different problems. Redux is a state-management architecture: it models state as an accumulation over a stream of actions, essentially a reduce over time, with the store observing actions and updating. RxJS is a general reactive library: it gives you Observables, composable primitives for handling asynchronous event streams.\n\nThe overlap is conceptual. Redux's store is reactive because it responds to a sequence of actions; RxJS makes the stream itself the primary abstraction. You could even model Redux state with RxJS, but their intended scopes differ.\n\nThe nuance an interviewer wants: Redux is an opinionated application-state container (an alternative to part of a framework), whereas RxJS is a toolkit of stream operators (an alternative to Promises for async). Similar paradigm, very different scope.",
    "interviewLine": "I'd say both are reactive and functional, but I think of Redux as a state container that reduces actions over time, while RxJS gives me Observables for composing async streams.",
    "misconception": "Treating Redux and RxJS as the same because both are 'reactive', when one is an app-state container and the other a general stream toolkit.",
    "hints": [
      "Ask what each library's primary abstraction is.",
      "Compare 'state over actions' with 'stream of events'.",
      "They share a paradigm but not a scope."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice RxJS composes an async stream, a different scope from a state store.",
      "language": "typescript",
      "code": "import { fromEvent, map, debounceTime } from 'rxjs';\n\nconst input = document.querySelector('input')!;\nfromEvent(input, 'input')\n  .pipe(debounceTime(300), map((e) => (e.target as HTMLInputElement).value))\n  .subscribe((v) => console.log('query', v));"
    }
  },
  {
    "id": "react-how-to-use-connect-from-react-redux",
    "title": "How to use connect() from React Redux?",
    "prompt": "How to use connect() from React Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "import React from 'react';\n   import { connect } from 'react-redux';\n\n   class App extends React.Component {\n     render() {\n       return <div>{this.props.containerData}</div>;\n     }\n   }\n\n   function mapStateToProps(state) {\n     return { containerData: state.data };\n   }\n\n   export default connect(mapStateToProps)(App);",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Call `connect()` inside an infinite `while` loop so the component re-subscribes to the store on every iteration.",
        "isCorrect": false,
        "explanation": "An infinite loop would freeze the UI; `connect` is called once to produce a wrapped component."
      },
      {
        "id": "B",
        "text": "`connect()` is used to attach a physical HDMI cable from the Redux store to the monitor rendering the component.",
        "isCorrect": false,
        "explanation": "`connect` is a JavaScript function binding stores to components, not anything to do with physical cables."
      },
      {
        "id": "C",
        "text": "`connect()` deletes the wrapped component from the DOM so a fresh store-backed instance can take its place on render.",
        "isCorrect": false,
        "explanation": "`connect` returns an enhanced wrapper subscribed to the store; it does not delete the component."
      },
      {
        "id": "D",
        "text": "Wrap the component with `connect(mapStateToProps, mapDispatchToProps)(MyComponent)` to inject Redux state and action dispatchers as component props.",
        "isCorrect": true,
        "explanation": "Correct. Wrap the component with `connect(mapStateToProps, mapDispatchToProps)(Component)` to inject store state and dispatchers as props."
      }
    ],
    "correctAnswer": "D",
    "explanation": "`connect` is a higher-order component from `react-redux` that wraps your component and injects store data and dispatchers as props. You call `connect(mapStateToProps, mapDispatchToProps)(MyComponent)`: `mapStateToProps` selects state to pass as props, `mapDispatchToProps` provides action-dispatching callbacks, and the returned wrapper subscribes to the store.\n\nThe snippet connects `App` so `containerData` comes from `state.data`. The wrapper re-renders the component when the selected state changes, using shallow comparison to skip unnecessary renders.\n\nThe nuance an interviewer probes: `connect` predates hooks and is still valid, but modern code typically uses `useSelector`/`useDispatch` directly. With `connect`, returning fresh objects from `mapStateToProps` on every call defeats its render-bailout, so select narrowly or memoize.",
    "interviewLine": "I use `connect(mapState, mapDispatch)(Component)` to wrap a component and inject selected state and dispatchers, subscribing it to the store with a shallow-equality render bailout.",
    "misconception": "Thinking `connect` does something to the DOM, when it simply produces a wrapper component subscribed to the store and injecting props.",
    "hints": [
      "Note the two-call shape: `connect(...)(Component)`.",
      "Ask what the wrapper injects as props.",
      "Fresh objects from the state mapper undercut its optimization."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the hook form replaces connect in modern code.",
      "language": "tsx",
      "code": "import { useSelector } from 'react-redux';\n\nfunction App() {\n  const data = useSelector((s: { data: string }) => s.data); // was mapStateToProps\n  return <div>{data}</div>;\n}"
    }
  },
  {
    "id": "react-whats-the-purpose-of-at-symbol-in-the-redux-connect-dec",
    "title": "Whats the purpose of at symbol in the Redux connect decorator?",
    "prompt": "Whats the purpose of at symbol in the Redux connect decorator?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "import React from 'react';\n  import * as actionCreators from './actionCreators';\n  import { bindActionCreators } from 'redux';\n  import { connect } from 'react-redux';\n\n  function mapStateToProps(state) {\n    return { todos: state.todos };\n  }\n\n  function mapDispatchToProps(dispatch) {\n    return { actions: bindActionCreators(actionCreators, dispatch) };\n  }\n\n  class MyApp extends React.Component {\n    // ...define your main app here\n  }\n\n  export default connect(mapStateToProps, mapDispatchToProps)(MyApp);\n\nimport React from 'react';\n  import * as actionCreators from './actionCreators';\n  import { bindActionCreators } from 'redux';\n  import { connect } from 'react-redux';\n\n  function mapStateToProps(state) {\n    return { todos: state.todos };\n  }\n\n  function mapDispatchToProps(dispatch) {\n    return { actions: bindActionCreators(actionCreators, dispatch) };\n  }\n\n  @connect(mapStateToProps, mapDispatchToProps)\n  export default class MyApp extends React.Component {\n    // ...define your main app here\n  }",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "`@` is a CSS at-rule selector that styles the connected component's borders based on the current store state.",
        "isCorrect": false,
        "explanation": "`@` in a JavaScript class file is decorator syntax, not a CSS selector."
      },
      {
        "id": "B",
        "text": "`@` tells Redux to encrypt the store with AES-256 before the decorated component is allowed to read from it.",
        "isCorrect": false,
        "explanation": "Decorators wrap classes and methods; they do not encrypt anything."
      },
      {
        "id": "C",
        "text": "`@` signifies experimental ES class decorator syntax (`@connect(mapState, mapDispatch) class MyComp ...`), an alternative to calling `connect(...)(MyComp)` on class components.",
        "isCorrect": true,
        "explanation": "Correct. `@` is experimental class-decorator syntax, a shorthand for `connect(...)(Class)` on class components."
      },
      {
        "id": "D",
        "text": "`@` connects the decorated component to a Twitter or X social feed so it can render the latest posts inline.",
        "isCorrect": false,
        "explanation": "The `@` here is JavaScript decorator syntax, unrelated to social-media handles."
      }
    ],
    "correctAnswer": "C",
    "explanation": "The `@` is JavaScript decorator syntax. Writing `@connect(mapState, mapDispatch)` above a class is shorthand for `connect(mapState, mapDispatch)(MyClass)`: the decorator receives the class and returns the wrapped, connected class. The snippet shows the same wiring with and without the decorator.\n\nDecorators let you annotate and transform a class declaratively, which reads cleanly for cross-cutting concerns like connecting to a store. They were a stage proposal, so they require a compiler like Babel and are subject to change.\n\nThe nuance an interviewer probes: decorators only apply to classes/methods, so they never fit function components, and the ecosystem has largely moved to hooks (`useSelector`, `useDispatch`). The `@connect` form is legacy class-component sugar, not required by Redux.",
    "interviewLine": "I'd explain that `@connect(...)` is decorator syntax that wraps a class component with `connect(...)(Class)`; it is legacy class sugar, and I now use `useSelector` and `useDispatch` instead.",
    "misconception": "Reading `@` as a special Redux feature, when it is generic JavaScript decorator syntax that just wraps the class with `connect`.",
    "hints": [
      "Recognize `@` as a general JavaScript syntax feature.",
      "Ask what it desugars to.",
      "It only applies to classes, so hooks replaced it."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the decorator is just sugar for calling connect on the class.",
      "language": "typescript",
      "code": "// @connect(mapState) class MyApp extends React.Component {}\n// is equivalent to:\n// class MyApp extends React.Component {}\n// export default connect(mapState)(MyApp);\nexport {};"
    }
  },
  {
    "id": "react-what-is-the-difference-between-react-context-and-react",
    "title": "What is the difference between React context and React Redux?",
    "prompt": "What is the difference between React context and React Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Context only works in Python-based tooling, while React Redux works only in Java, so the two never run together.",
        "isCorrect": false,
        "explanation": "Both are JavaScript libraries for React web apps; neither is tied to Python or Java."
      },
      {
        "id": "B",
        "text": "Context is a lightweight built-in tool for low-frequency global data (themes/auth); React-Redux provides a full state architecture with middleware, devtools, and granular selector optimizations.",
        "isCorrect": true,
        "explanation": "Correct. Context is a lightweight built-in for low-frequency shared data; React-Redux adds a store, middleware, devtools, and selector-based re-render control."
      },
      {
        "id": "C",
        "text": "Context was removed from React in version 18, so React Redux is now the only way to share values across the tree.",
        "isCorrect": false,
        "explanation": "Context is an active, essential React feature; it was not removed in version 18."
      },
      {
        "id": "D",
        "text": "React Redux cannot store objects or arrays, so Context is required whenever shared data is more than a single value.",
        "isCorrect": false,
        "explanation": "Redux stores any serializable data, including objects and arrays; the claim it cannot is false."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Context is React's built-in way to pass a value down the tree without prop drilling; React-Redux is a full state-management binding built on top of Redux. Context is great for low-frequency, broadly-read values like theme or the current user. React-Redux adds a predictable store, middleware, devtools, and fine-grained selector subscriptions.\n\nThe key behavioral difference is re-rendering. When a Context provider's value changes, every consumer re-renders. React-Redux's `useSelector` subscribes a component to just the slice it reads and re-renders only when that slice changes, which scales better for frequently-updating state.\n\nThe nuance an interviewer wants: React-Redux actually uses Context internally, but it layers selector-based subscriptions on top. So the choice is not Context versus Redux conceptually, but raw Context versus a tuned subscription system for high-frequency, structured state.",
    "interviewLine": "I contrast Context, which passes a value down and re-renders every consumer on change, with React-Redux, which layers selector subscriptions, middleware, and devtools for high-frequency structured state.",
    "misconception": "Treating Context as a drop-in Redux replacement, when every Context consumer re-renders on change while Redux offers selector-scoped subscriptions.",
    "hints": [
      "Compare what happens to consumers when the shared value changes.",
      "Ask which gives you fine-grained subscriptions.",
      "React-Redux is more than just passing data down."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/useContext",
    "example": {
      "caption": "Notice the selector re-renders this component only when its slice changes.",
      "language": "tsx",
      "code": "import { useSelector } from 'react-redux';\n\nfunction UnreadBadge() {\n  // re-renders only when unread changes, not on every store update\n  const unread = useSelector((s: { unread: number }) => s.unread);\n  return <span>{unread}</span>;\n}"
    }
  },
  {
    "id": "react-why-are-redux-state-functions-called-reducers",
    "title": "Why are Redux state functions called reducers?",
    "prompt": "Why are Redux state functions called reducers?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Because they reduce the CPU temperature by throttling how often the store recomputes state on each dispatch.",
        "isCorrect": false,
        "explanation": "The name comes from functional `reduce` semantics, not from reducing CPU temperature."
      },
      {
        "id": "B",
        "text": "Because they match the signature of `Array.prototype.reduce((accumulator, current) => result)`, accumulating actions over time to produce the next state object.",
        "isCorrect": true,
        "explanation": "Correct. A reducer matches `reduce`'s `(accumulator, current) => result` shape, folding actions over time into the next state."
      },
      {
        "id": "C",
        "text": "Because they reduce the size of the JavaScript bundle on disk by compressing the state tree before each render.",
        "isCorrect": false,
        "explanation": "The name derives from the `reduce` accumulator concept, not from shrinking the bundle on disk."
      },
      {
        "id": "D",
        "text": "Because they reduce the number of HTML tags React renders by collapsing unchanged elements out of the output.",
        "isCorrect": false,
        "explanation": "Reducers compute state; rendering determines HTML. The name is about the fold, not fewer tags."
      }
    ],
    "correctAnswer": "B",
    "explanation": "They are called reducers because they match the shape of the function you pass to `Array.prototype.reduce`: `(accumulator, current) => nextAccumulator`. A Redux reducer is `(previousState, action) => nextState`, so dispatching a sequence of actions is exactly reducing that sequence onto an initial state to arrive at the current state.\n\nThat framing explains why reducers must be pure: `reduce` over the same inputs must always yield the same result. The current store state is just the fold of the entire action history over the initial state.\n\nThe nuance an interviewer probes: this is also why you can rebuild state by replaying actions (time-travel), and why side effects break the model. If the reducer were not a pure fold, replaying actions would not reproduce the state.",
    "interviewLine": "I'd note a reducer has the signature of `Array.reduce`'s callback—`(state, action) => nextState`—so the store's state is the fold of the whole action history over the initial state.",
    "misconception": "Reading 'reducer' literally as 'something that reduces size', when it refers to the functional `reduce` fold over actions.",
    "hints": [
      "Recall the signature of the callback you pass to `reduce`.",
      "Ask how the current state relates to all past actions.",
      "It is about accumulation, not file or UI size."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice folding actions with the reducer reproduces the store's state.",
      "language": "typescript",
      "code": "const reducer = (s: number, a: { type: 'inc' }) => (a.type === 'inc' ? s + 1 : s);\nconst actions = [{ type: 'inc' as const }, { type: 'inc' as const }];\nconst state = actions.reduce(reducer, 0); // 2\nconsole.log(state);"
    }
  },
  {
    "id": "react-should-i-keep-all-components-state-in-redux-store",
    "title": "Should I keep all component's state in Redux store?",
    "prompt": "Should I keep all component's state in Redux store?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "No state should ever live in Redux, so even data shared across many features must be passed down as props instead.",
        "isCorrect": false,
        "explanation": "Shared domain data across features benefits from Redux centralization, so 'never use Redux' is wrong."
      },
      {
        "id": "B",
        "text": "No, keep global/shared domain data in Redux, but keep transient local UI state (form inputs, dropdown toggles, hover states) in local component state (`useState`).",
        "isCorrect": true,
        "explanation": "Correct. Keep shared domain data in Redux but transient local UI state in `useState`, matching storage to scope."
      },
      {
        "id": "C",
        "text": "Yes, every mouse coordinate and typed character must be stored in Redux so the whole app shares one state tree.",
        "isCorrect": false,
        "explanation": "Putting every keystroke and mouse coordinate in Redux causes needless global re-renders and boilerplate."
      },
      {
        "id": "D",
        "text": "Components are forbidden from calling `useState` once Redux is installed, so all local UI state moves to the store.",
        "isCorrect": false,
        "explanation": "`useState` and Redux coexist; installing Redux does not forbid local state."
      }
    ],
    "correctAnswer": "B",
    "explanation": "No. Put data that is shared across many features in the store, but keep transient, local UI state—form inputs, a dropdown's open flag, hover state—in local component state with `useState`. Over-centralizing everything in Redux adds boilerplate and causes broad re-renders for state that only one component cares about.\n\nThe guideline is scope. If a value is read or written by distant components, or needs devtools/middleware/persistence, the store earns its keep. If it lives and dies within one component, it belongs there.\n\nThe nuance an interviewer wants: server data is a third category, often better handled by a cache like TanStack Query than by hand-rolled Redux. The modern split is server state, URL state, global client state, and local UI state—each in its right place.",
    "interviewLine": "I keep shared domain data in the store and ephemeral UI state local, so I avoid the boilerplate and broad re-renders of globalizing things only one component uses.",
    "misconception": "Believing Redux should hold all state, when ephemeral UI state belongs local and only shared data belongs in the store.",
    "hints": [
      "Ask how many components actually read a given value.",
      "Think about the cost of globalizing a single toggle.",
      "Server data is often a separate category entirely."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the open flag stays local; only shared data would go to the store.",
      "language": "tsx",
      "code": "function Menu() {\n  const [open, setOpen] = useState(false); // local UI state, not Redux\n  return <button onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Open'}</button>;\n}"
    }
  },
  {
    "id": "react-what-is-the-use-of-the-ownprops-parameter-in-mapstateto",
    "title": "What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?",
    "prompt": "What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "import ConnectedComponent from './containers/ConnectedComponent';\n\n<ConnectedComponent user={'john'} />;\n\n{\n  user: 'john';\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "`ownProps` is available only in Python scripts, so JavaScript components cannot use it to select store state by their props.",
        "isCorrect": false,
        "explanation": "`ownProps` is a React-Redux parameter in JavaScript, not something exclusive to Python."
      },
      {
        "id": "B",
        "text": "`ownProps` holds the props passed to the connected component, letting the mappers select state based on them, like `state.todos[ownProps.id]`.",
        "isCorrect": true,
        "explanation": "Correct. `ownProps` carries the component's own props so the mappers can select state based on them, like `state.todos[ownProps.id]`."
      },
      {
        "id": "C",
        "text": "`ownProps` encrypts all of a component's props before they are handed to the DOM, protecting them from being inspected.",
        "isCorrect": false,
        "explanation": "`ownProps` is a plain props object, not an encryption step before the DOM."
      },
      {
        "id": "D",
        "text": "`ownProps` deletes the component's private state from memory so only store-derived props remain after connect has run.",
        "isCorrect": false,
        "explanation": "`ownProps` gives read access to incoming props inside connect functions; it does not delete state."
      }
    ],
    "correctAnswer": "B",
    "explanation": "`ownProps` is the optional second argument to `mapStateToProps(state, ownProps)` and `mapDispatchToProps(dispatch, ownProps)`. It holds the props passed directly to the connected component, letting you select state based on them. For example, `mapStateToProps(state, ownProps) => ({ todo: state.todos[ownProps.id] })` picks the entity matching the id the parent provided.\n\nThis is how a connected list item reads just its own slice: the parent passes `id`, and the mapper uses it to select from the store. It couples the component's data selection to its incoming props.\n\nThe nuance an interviewer probes: including `ownProps` changes `connect`'s behavior—the mapper now re-runs when `ownProps` change, not only when store state changes. If selection by `ownProps` is expensive, memoize it (per-instance selectors) to avoid recomputing on every render.",
    "interviewLine": "`ownProps` passes a connected component's own props into the mappers, so I can select exactly its slice, like `state.todos[ownProps.id]`, keeping in mind it re-runs the mapper when those props change.",
    "misconception": "Overlooking that `ownProps` ties state selection to the component's own props and makes the mapper re-run when those props change.",
    "hints": [
      "Think about selecting one entity by an id the parent passed.",
      "Ask where that id comes from inside the mapper.",
      "Using it changes when the mapper re-runs."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice selection depends on the component's own id prop.",
      "language": "typescript",
      "code": "type State = { todos: Record<string, { done: boolean }> };\nconst mapState = (state: State, ownProps: { id: string }) => ({\n  todo: state.todos[ownProps.id],\n});"
    }
  },
  {
    "id": "react-what-is-the-mental-model-of-redux-saga",
    "title": "What is the mental model of redux-saga?",
    "prompt": "What is the mental model of redux-saga?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A saga is a synchronous compiler that converts JSX into PHP files so side effects can run on a traditional server.",
        "isCorrect": false,
        "explanation": "Sagas are asynchronous generators running in the browser, not a synchronous JSX-to-PHP compiler."
      },
      {
        "id": "B",
        "text": "A saga is like a separate background thread in the app dedicated to side effects, started/paused/cancelled via standard Redux actions with full access to state and dispatch.",
        "isCorrect": true,
        "explanation": "Correct. A saga is like a background thread for side effects, controlled by dispatched actions, with access to state and the ability to dispatch."
      },
      {
        "id": "C",
        "text": "A saga is a physical network router that directs internet traffic between the store and the components that read it.",
        "isCorrect": false,
        "explanation": "A saga orchestrates in-memory async action streams, not physical internet routing."
      },
      {
        "id": "D",
        "text": "A saga is a dedicated hardware chip on the user's graphics card that offloads asynchronous Redux work from the CPU.",
        "isCorrect": false,
        "explanation": "redux-saga is a pure JavaScript middleware library, not a hardware graphics chip."
      }
    ],
    "correctAnswer": "B",
    "explanation": "The mental model for redux-saga is a background thread dedicated to side effects. It is Redux middleware, so it can be started, paused, and cancelled through ordinary dispatched actions, it has read access to the full store via `select`, and it can dispatch actions back into the store. You write sagas as generator functions that `yield` effect descriptions the middleware runs.\n\nIn practice a saga watches for an action (`takeEvery`, `takeLatest`), performs async work (`call` an API), and dispatches the result. Because effects are yielded as plain objects, the orchestration is testable without running the real async.\n\nThe nuance an interviewer probes: the thread metaphor is conceptual, not real threading. Sagas run on the main thread as cooperative generators; the value is declarative, cancellable effect orchestration, which handles things like debouncing and race cancellation (`takeLatest`) cleanly.",
    "interviewLine": "I think of a saga as a long-lived background process for side effects, driven by dispatched actions, that can read state and dispatch results, using generators so effects stay declarative and cancellable.",
    "misconception": "Taking the thread metaphor literally, when sagas are cooperative generators on the main thread that yield declarative, cancellable effects.",
    "hints": [
      "Picture a long-running process that reacts to actions.",
      "Ask what controls it and what it can do to the store.",
      "The 'thread' is a metaphor, not real threading."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the saga watches an action, calls the API, and dispatches the result.",
      "language": "typescript",
      "code": "import { call, put, takeLatest } from 'redux-saga/effects';\n\nfunction* loadUser(action: { id: string }) {\n  const user: unknown = yield call(fetch, `/api/user/${action.id}`);\n  yield put({ type: 'user/loaded', user });\n}\n\nexport function* watch() {\n  yield takeLatest('user/load', loadUser);\n}"
    }
  },
  {
    "id": "react-what-is-redux-thunk",
    "title": "What is Redux Thunk?",
    "prompt": "What is Redux Thunk?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A middleware that allows action creators to return a function `(dispatch, getState) => ...` instead of a plain action object, enabling delayed or conditional dispatching.",
        "isCorrect": true,
        "explanation": "Correct. Thunk middleware lets action creators return a function `(dispatch, getState) => ...` for delayed or conditional dispatching."
      },
      {
        "id": "B",
        "text": "A database engine that persists dispatched actions to SQLite so the store can be rebuilt after the page reloads.",
        "isCorrect": false,
        "explanation": "Thunks run client-side functions with store access; they are not a SQLite persistence engine."
      },
      {
        "id": "C",
        "text": "A compiler plugin that translates Redux action creators into Java bytecode for execution on a backend server.",
        "isCorrect": false,
        "explanation": "Redux Thunk is lightweight Redux middleware, not a compiler to Java bytecode."
      },
      {
        "id": "D",
        "text": "A rendering tool that draws 3D animations onto an HTML5 Canvas whenever an asynchronous action is dispatched.",
        "isCorrect": false,
        "explanation": "Thunk handles async action logic, not Canvas 3D animation."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Redux Thunk is middleware that lets an action creator return a function instead of a plain action object. When you dispatch that function, the middleware intercepts it and calls it with `dispatch` and `getState`, so you can run async work and dispatch real actions when it resolves, or dispatch conditionally based on current state.\n\nThis is the simplest way to handle async in Redux: a thunk fires a `pending` action, awaits the API, then dispatches `fulfilled` or `rejected`. No new concepts beyond functions.\n\nThe nuance an interviewer probes: thunks are imperative and fine for straightforward async, while sagas or RTK Query suit complex orchestration (cancellation, debouncing, caching). The key enabler is that thunk teaches `dispatch` to accept functions, which plain Redux rejects.",
    "interviewLine": "I describe Redux Thunk as teaching `dispatch` to accept a function that receives `dispatch` and `getState`, which I reach for as the simplest way to run async work and dispatch results conditionally.",
    "misconception": "Thinking Redux handles async out of the box, when plain `dispatch` only takes action objects and thunk is what lets it accept functions.",
    "hints": [
      "Ask what a thunk returns instead of a plain action.",
      "Think about what arguments the inner function receives.",
      "Plain Redux dispatch only accepts action objects."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the thunk dispatches pending then the resolved action.",
      "language": "typescript",
      "code": "const fetchUser = (id: string) => async (dispatch: (a: unknown) => void) => {\n  dispatch({ type: 'user/pending' });\n  const user = await fetch(`/api/user/${id}`).then((r) => r.json());\n  dispatch({ type: 'user/fulfilled', user });\n};"
    }
  },
  {
    "id": "react-what-is-redux-devtools",
    "title": "What is Redux DevTools?",
    "prompt": "What is Redux DevTools?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A hardware device that plugs into your computer over USB to record the store's action history to external memory.",
        "isCorrect": false,
        "explanation": "DevTools is a software extension and library, not a USB hardware device."
      },
      {
        "id": "B",
        "text": "A compiler that converts the Redux store's shape into CSS classes so state changes are reflected as style updates.",
        "isCorrect": false,
        "explanation": "DevTools inspects runtime state and action history; it does not compile Redux into CSS."
      },
      {
        "id": "C",
        "text": "A development tool/browser extension providing live-editing, time-travel debugging, action inspection, state diffing, and state persistence across page reloads.",
        "isCorrect": true,
        "explanation": "Correct. It records actions and state for time-travel debugging, action inspection, state diffing, and persistence."
      },
      {
        "id": "D",
        "text": "A paid cloud hosting service that deploys React applications and bundles their Redux store with the server runtime.",
        "isCorrect": false,
        "explanation": "Redux DevTools is a free open-source debugging tool, not a paid hosting service."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Redux DevTools is a development tool, available as a browser extension and library, that records every dispatched action and the resulting state. It gives you time-travel debugging (step backward and forward through actions), action inspection, state diffs, and optional state persistence across reloads.\n\nThis is possible precisely because Redux state is a pure fold of actions: the DevTools can replay the action log to reconstruct any point in time. You see exactly which action produced which state change.\n\nThe nuance an interviewer wants: time travel works because reducers are pure and side-effect-free; if reducers had side effects, replaying actions would not reproduce the state. DevTools is development-only and typically wired through a store enhancer or Redux Toolkit's defaults.",
    "interviewLine": "Redux DevTools records every action and state so I can time-travel and diff transitions, which only works because pure reducers make the state a replayable fold of actions.",
    "misconception": "Missing why time travel is possible, which is that pure reducers let the tool replay the action log to reconstruct any state.",
    "hints": [
      "Think about what the tool records to let you step through time.",
      "Ask what property of reducers makes replay possible.",
      "It is a development tool, not a hosting service."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice Toolkit wires DevTools automatically, enabling action replay.",
      "language": "typescript",
      "code": "import { configureStore } from '@reduxjs/toolkit';\n\n// devTools defaults to true in development, enabling time-travel\nexport const store = configureStore({\n  reducer: { count: (s = 0) => s },\n});"
    }
  },
  {
    "id": "react-what-are-redux-selectors-and-why-to-use-them",
    "title": "What are Redux selectors and why to use them?",
    "prompt": "What are Redux selectors and why to use them?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const getUserData = (state) => state.user.data;",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Functions that mutate the store directly, bypassing actions so components can write derived data back into state.",
        "isCorrect": false,
        "explanation": "Selectors are read-only getters; they never mutate the store directly."
      },
      {
        "id": "B",
        "text": "Database query locks that prevent two components from reading the same slice of the store at the same time.",
        "isCorrect": false,
        "explanation": "Selectors are pure client JavaScript functions, not database locks."
      },
      {
        "id": "C",
        "text": "CSS selectors that color `<button>` elements based on which slice of the Redux store the component is reading.",
        "isCorrect": false,
        "explanation": "Redux selectors read and derive state in JavaScript; they are not CSS rules."
      },
      {
        "id": "D",
        "text": "Functions `(state) => data` that encapsulate state structure, compute derived data, and (when memoized via Reselect) prevent unnecessary re-computations and component re-renders.",
        "isCorrect": true,
        "explanation": "Correct. Selectors encapsulate state shape and derive data, and when memoized they avoid recomputation and unnecessary re-renders."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A selector is a function that takes the store state and returns some data derived from it, like `(state) => state.user.data`. Selectors centralize knowledge of the state shape so components do not reach into nested structure directly, and they can compute derived values (filtered, sorted, totalled) so you store the minimal raw state.\n\nWhen memoized with a tool like Reselect, a selector recomputes only when its inputs change and otherwise returns the previous reference, which prevents connected components from re-rendering on unrelated updates.\n\nThe nuance an interviewer probes: memoization only helps if inputs are stable and the derivation is non-trivial. A selector that returns a new object every call (e.g. `{ ...slice }`) breaks reference equality and defeats the optimization, so memoize the derivation, not just the access.",
    "interviewLine": "I use a selector to encapsulate the state shape and derive data; memoized with Reselect it recomputes only when inputs change, which keeps components from re-rendering on unrelated updates.",
    "misconception": "Assuming any selector is memoized, when memoization requires stable inputs and a derivation that does not return a fresh reference each call.",
    "hints": [
      "Ask what a selector hides from the component.",
      "Think about when a memoized selector recomputes.",
      "Returning a new object each call undoes the memoization."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the memoized selector only recomputes when todos change.",
      "language": "typescript",
      "code": "import { createSelector } from 'reselect';\n\nconst selectTodos = (s: { todos: { done: boolean }[] }) => s.todos;\nexport const selectDone = createSelector(selectTodos, (todos) =>\n  todos.filter((t) => t.done),\n);"
    }
  },
  {
    "id": "react-what-is-redux-form",
    "title": "What is Redux Form?",
    "prompt": "What is Redux Form?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A legacy library that tracked every form input keystroke and validation state inside the global Redux store; now superseded by React Hook Form and Formik.",
        "isCorrect": true,
        "explanation": "Correct. Redux Form kept form field state in the global store on every keystroke; it has been superseded by React Hook Form and Formik."
      },
      {
        "id": "B",
        "text": "A backend PHP script that receives form submissions and writes them to the Redux store on the server side.",
        "isCorrect": false,
        "explanation": "Redux Form was a client-side React library, not a backend PHP handler."
      },
      {
        "id": "C",
        "text": "A CSS styling framework that themes form buttons and inputs based on the current validation state in Redux.",
        "isCorrect": false,
        "explanation": "Redux Form managed form state and validation, not button styling."
      },
      {
        "id": "D",
        "text": "A built-in HTML5 `<redux-form>` element, standardized by the W3C, that binds native inputs to a Redux store.",
        "isCorrect": false,
        "explanation": "Redux Form was an npm package, not a W3C-standard HTML tag."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Redux Form was a library that stored all form state—field values, touched/visited flags, validation errors—inside the Redux store, updating it on every keystroke. It integrated with UI kits and gave you form state as part of your global state tree.\n\nThe problem that drove it out of favor is performance: routing every keystroke through Redux re-renders broadly and adds significant boilerplate, which is wasteful for state that is usually local to one form. Modern libraries like React Hook Form keep form state local and largely uncontrolled, minimizing re-renders.\n\nThe nuance an interviewer wants: form state is rarely global, so putting it in Redux is usually the wrong scope. React Hook Form (or Formik) plus a schema validator like Zod is the current default; Redux Form is legacy.",
    "interviewLine": "Redux Form put every keystroke in the global store, which was heavy and rarely necessary; I use React Hook Form today to keep form state local with minimal re-renders.",
    "misconception": "Thinking form state belongs in a global store, when it is almost always local and Redux Form's keystroke-to-store approach caused the performance problems that retired it.",
    "hints": [
      "Think about where form state usually belongs.",
      "Ask what cost comes from storing keystrokes globally.",
      "A newer library replaced it for performance reasons."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice React Hook Form keeps form state local and uncontrolled by default.",
      "language": "tsx",
      "code": "import { useForm } from 'react-hook-form';\n\nfunction LoginForm() {\n  const { register, handleSubmit } = useForm<{ email: string }>();\n  return (\n    <form onSubmit={handleSubmit((d) => console.log(d))}>\n      <input {...register('email')} />\n    </form>\n  );\n}"
    }
  },
  {
    "id": "react-how-to-add-multiple-middlewares-to-redux",
    "title": "How to add multiple middlewares to Redux?",
    "prompt": "How to add multiple middlewares to Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "import { createStore, applyMiddleware } from 'redux';\nconst createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Multiple middlewares cannot run in one store, so each middleware you add requires creating a separate Redux store.",
        "isCorrect": false,
        "explanation": "Redux supports chaining multiple middleware; the claim that it cannot is false."
      },
      {
        "id": "B",
        "text": "Pass them as comma-separated arguments to `applyMiddleware(middleware1, middleware2, ...)` when creating the store (or pass an array in Redux Toolkit's `configureStore`).",
        "isCorrect": true,
        "explanation": "Correct. Pass them as arguments to `applyMiddleware(m1, m2, ...)` (or an array to Toolkit's `configureStore`) to form the dispatch chain."
      },
      {
        "id": "C",
        "text": "Store the middleware functions as strings in `document.cookie` and let the store evaluate them on each dispatch.",
        "isCorrect": false,
        "explanation": "Middleware are functions passed to `applyMiddleware`, not strings stored in cookies."
      },
      {
        "id": "D",
        "text": "Wrap each middleware in its own synchronous `while` loop so they run one after another on every dispatched action.",
        "isCorrect": false,
        "explanation": "A `while` loop would block execution; middleware compose as a pipeline, not a loop."
      }
    ],
    "correctAnswer": "B",
    "explanation": "You compose multiple middleware by passing them to `applyMiddleware(a, b, c)` when creating the store; Redux chains them left to right so each wraps `dispatch` for the next. The snippet threads `ReduxThunk` and `logger` through `applyMiddleware(...)(createStore)`. Redux Toolkit's `configureStore` takes a `middleware` array for the same effect.\n\nOrder matters: an action passes through the chain in the order you list the middleware, so a logger placed last sees the final dispatched action, while one placed first sees it before thunks resolve. Each middleware can inspect, transform, delay, or swallow an action.\n\nThe nuance an interviewer probes: middleware forms a pipeline around `dispatch`, so placement affects what each sees. Toolkit prepends/concats around its default middleware (including thunk), so you add to that array rather than replacing it wholesale.",
    "interviewLine": "I compose middleware by passing them to `applyMiddleware` (or Toolkit's `middleware` array), remembering the chain is ordered so placement decides what each sees.",
    "misconception": "Overlooking that middleware form an ordered pipeline, so the order you list them changes what each one observes.",
    "hints": [
      "Recall the function that takes multiple middleware.",
      "Ask why the order you list them matters.",
      "They form a pipeline, not a loop."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice Toolkit concats custom middleware onto its defaults, preserving order.",
      "language": "typescript",
      "code": "import { configureStore } from '@reduxjs/toolkit';\nimport logger from 'redux-logger';\n\nexport const store = configureStore({\n  reducer: { count: (s = 0) => s },\n  middleware: (getDefault) => getDefault().concat(logger),\n});"
    }
  },
  {
    "id": "react-how-to-set-initial-state-in-redux",
    "title": "How to set initial state in Redux?",
    "prompt": "How to set initial state in Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const rootReducer = combineReducers({\n  todos: todos,\n  visibilityFilter: visibilityFilter,\n});\n\nconst initialState = {\n  todos: [{ id: 123, name: 'example', completed: false }],\n};\n\nconst store = createStore(rootReducer, initialState);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Initial state can only be loaded by restarting the web server, which seeds the store before the client connects.",
        "isCorrect": false,
        "explanation": "Initial state is provided synchronously to reducers or the store creator, not by restarting a server."
      },
      {
        "id": "B",
        "text": "Assign `window.__STATE__ = initialData` before importing React so the store picks up the values on first render.",
        "isCorrect": false,
        "explanation": "Assigning a global before importing React is non-reactive and bypasses the store's initialization."
      },
      {
        "id": "C",
        "text": "Redux forbids any initial state, so every slice must begin as `undefined` and be populated by the first action.",
        "isCorrect": false,
        "explanation": "Redux reducers must return non-undefined initial state; starting as `undefined` is exactly what defaults prevent."
      },
      {
        "id": "D",
        "text": "Provide default parameter values in slice reducers (`(state = initialState, action) => ...`) and/or pass a `preloadedState` object as the second argument to `createStore` / `configureStore`.",
        "isCorrect": true,
        "explanation": "Correct. Give slice reducers default parameters and/or pass `preloadedState` to `createStore`/`configureStore` to hydrate from SSR or storage."
      }
    ],
    "correctAnswer": "D",
    "explanation": "There are two complementary places. Each slice reducer declares its default via a default parameter, `(state = initialState, action) => ...`, which supplies state when the store first calls it. Separately, you can pass a `preloadedState` object as the second argument to `createStore` (or `configureStore`), which hydrates the store from SSR output or `localStorage`.\n\nThe snippet seeds `todos` through the `initialState` passed to `createStore`. Slice defaults handle the common case; `preloadedState` is for restoring a known starting state.\n\nThe nuance an interviewer probes: `preloadedState` must match the shape your reducers expect, and where both exist the preloaded value wins for that slice on initialization. Reducers must still return their default when given `undefined`, which is how the store bootstraps slices not covered by `preloadedState`.",
    "interviewLine": "I set defaults per slice with reducer default parameters and pass `preloadedState` to the store when I need to hydrate from SSR or localStorage.",
    "misconception": "Thinking there is a single way, when slice defaults and `preloadedState` serve different purposes and interact at initialization.",
    "hints": [
      "Think about where a single slice declares its default.",
      "Ask how you restore a whole starting state from storage.",
      "Reducers must still return a default for undefined."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice preloadedState hydrates the store from a saved snapshot.",
      "language": "typescript",
      "code": "import { configureStore } from '@reduxjs/toolkit';\n\nconst saved = JSON.parse(localStorage.getItem('state') ?? '{}');\nexport const store = configureStore({\n  reducer: { todos: (s = [], _a) => s },\n  preloadedState: saved,\n});"
    }
  },
  {
    "id": "react-how-to-use-font-awesome-icons-in-react",
    "title": "How to use Font Awesome icons in React?",
    "prompt": "How to use Font Awesome icons in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "$ npm install, save font-awesome\n\nimport 'font-awesome/css/font-awesome.min.css';\n\nrender() {\n     return <div><i className={'fa fa-spinner'} /></div>\n   }",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Copy the icon set's binary `.exe` files into the `public/` directory so the browser can execute them as glyphs.",
        "isCorrect": false,
        "explanation": "Icons render as SVG or icon fonts in the browser, not as `.exe` binaries in `public/`."
      },
      {
        "id": "B",
        "text": "Embed raw Photoshop PSD files directly inside JSX tags, letting React rasterize them into icons at render time.",
        "isCorrect": false,
        "explanation": "Icons are imported as SVG components or font classes, not embedded Photoshop files."
      },
      {
        "id": "C",
        "text": "Install `@fortawesome/react-fontawesome` and icon packages (e.g. `@fortawesome/free-solid-svg-icons`), then render `<FontAwesomeIcon icon={faCoffee} />`.",
        "isCorrect": true,
        "explanation": "Correct. Install `@fortawesome/react-fontawesome` and icon packages, then render `<FontAwesomeIcon icon={faCoffee} />` for scalable SVG icons."
      },
      {
        "id": "D",
        "text": "Font Awesome icons cannot be used in React, so you must redraw each glyph by hand as an inline SVG path.",
        "isCorrect": false,
        "explanation": "Font Awesome ships official React components, so the claim that icons cannot be used is false."
      }
    ],
    "correctAnswer": "C",
    "explanation": "The modern approach is the official React component: install `@fortawesome/react-fontawesome` plus an icon package like `@fortawesome/free-solid-svg-icons`, then render `<FontAwesomeIcon icon={faCoffee} />`. It renders scalable SVG icons and accepts props for size, color, spin, and transforms.\n\nThe snippet shows the older CSS approach (importing the stylesheet and using `className=\"fa fa-spinner\"`), which still works but ships the full font/CSS and lacks the SVG component's tree-shaking and prop control.\n\nThe nuance an interviewer wants: prefer the SVG component because you import only the icons you use, which keeps the bundle small, versus the icon-font CSS that loads the whole set. Either way, icons need accessible labeling (title or `aria-label`) when they convey meaning.",
    "interviewLine": "I use `@fortawesome/react-fontawesome` and import only the icons I need, rendering `<FontAwesomeIcon icon={faCoffee} />` so the bundle stays small and I can label them accessibly.",
    "misconception": "Thinking you must load the entire icon font, when the SVG component lets you import only the icons you use for a smaller bundle.",
    "hints": [
      "Compare the icon-font CSS approach with the SVG component.",
      "Ask which one lets you import only the icons you use.",
      "Icons that convey meaning need an accessible label."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice only the imported icon ships, and it carries an accessible title.",
      "language": "tsx",
      "code": "import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';\nimport { faCoffee } from '@fortawesome/free-solid-svg-icons';\n\nexport function Break() {\n  return <FontAwesomeIcon icon={faCoffee} title=\"Take a break\" />;\n}"
    }
  },
  {
    "id": "react-what-is-react-dev-tools",
    "title": "What is React Dev Tools?",
    "prompt": "What is React Dev Tools?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A compiler that replaces Node.js, running React applications and their component tree without a JavaScript runtime.",
        "isCorrect": false,
        "explanation": "React DevTools inspects a React app's tree; it does not replace Node.js."
      },
      {
        "id": "B",
        "text": "An official browser extension and standalone tool that lets developers inspect the live React component tree, view and edit props/state, inspect hooks, and record render profiling.",
        "isCorrect": true,
        "explanation": "Correct. It is the official extension to inspect the component tree, edit props/state and hooks, and profile renders."
      },
      {
        "id": "C",
        "text": "A code obfuscator that scrambles a React app's source so users cannot read the component tree in production.",
        "isCorrect": false,
        "explanation": "DevTools aids debugging during development; it is not a source obfuscator."
      },
      {
        "id": "D",
        "text": "A cloud server that hosts a React app's production database and exposes the component tree over an API.",
        "isCorrect": false,
        "explanation": "React DevTools is a client-side inspection tool, not a cloud database host."
      }
    ],
    "correctAnswer": "B",
    "explanation": "React DevTools is the official browser extension (and standalone app) for inspecting a running React app. Its Components panel shows the live component tree with each node's props, state, and hooks, which you can edit in place. Its Profiler panel records renders so you can see which components re-rendered, why, and how long each took.\n\nIn practice you use the Components panel to understand structure and current data, and the Profiler to hunt down wasted renders—for example, a parent re-rendering children that received identical props.\n\nThe nuance an interviewer probes: the Profiler attributes render time and shows the trigger (props, state, hooks, or parent), which is how you confirm whether a memoization or key change actually helped, rather than guessing.",
    "interviewLine": "React DevTools lets me inspect and edit the component tree's props, state, and hooks, and its Profiler shows which components re-rendered and why, so I confirm optimizations with data.",
    "misconception": "Seeing DevTools as only a tree viewer, when its Profiler also tells you why a component re-rendered and how long it took.",
    "hints": [
      "Name the two main panels and what each does.",
      "Ask how you find out why a component re-rendered.",
      "It is a development inspection tool."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice React.memo is something the Profiler helps you verify is actually working.",
      "language": "tsx",
      "code": "const Row = React.memo(function Row({ label }: { label: string }) {\n  // Profiler will show this skips re-render when `label` is unchanged\n  return <li>{label}</li>;\n});"
    }
  },
  {
    "id": "react-what-are-the-main-features-of-reselect-library",
    "title": "What are the main features of Reselect library?",
    "prompt": "What are the main features of Reselect library?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Automatic backup of the Redux store to Amazon S3 on every state update, with versioned snapshots for recovery.",
        "isCorrect": false,
        "explanation": "Reselect is a client-side memoization library, not an S3 backup tool."
      },
      {
        "id": "B",
        "text": "Memoized computations (recalculates only when inputs change), composability (selectors can be inputs to other selectors), and clean separation of derived data from stored state.",
        "isCorrect": true,
        "explanation": "Correct. Reselect provides memoized, composable selectors that compute derived data and avoid recomputation and extra re-renders."
      },
      {
        "id": "C",
        "text": "Compilation of selector functions into C++ machine code so derived data is computed outside the JavaScript engine.",
        "isCorrect": false,
        "explanation": "Reselect runs in standard JavaScript memory; it does not compile to C++ machine code."
      },
      {
        "id": "D",
        "text": "Generation of 3D virtual-reality models from state objects so dashboards can render data as immersive scenes.",
        "isCorrect": false,
        "explanation": "Reselect computes and memoizes state slices, not 3D VR models."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Reselect builds memoized selectors for Redux. Its core features are memoized computation (a selector recomputes only when its input selectors return new values, otherwise it returns the cached result), composability (selectors can be inputs to other selectors), and separation of derived data from stored state so the store holds minimal raw data.\n\nThe payoff is fewer re-renders: because a memoized selector returns the same reference when inputs are unchanged, connected components reading it skip rendering on unrelated store updates.\n\nThe nuance an interviewer probes: the default cache size is one, so a single selector shared across many component instances with different arguments can thrash. For per-instance arguments, create a selector per instance (a selector factory) or use `createSelector` with argument-aware memoization.",
    "interviewLine": "Reselect gives me memoized, composable selectors that recompute only when inputs change, which cuts re-renders—though I watch the single-entry cache when a selector is shared with different arguments.",
    "misconception": "Assuming Reselect memoization is unconditional, when its default cache size of one can thrash under per-instance arguments.",
    "hints": [
      "List what memoization and composability buy you.",
      "Ask when a memoized selector actually recomputes.",
      "The default cache holds just one result."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice a factory gives each instance its own memoized cache.",
      "language": "typescript",
      "code": "import { createSelector } from 'reselect';\n\nconst makeSelectById = () =>\n  createSelector(\n    (s: { items: Record<string, unknown> }) => s.items,\n    (_s: unknown, id: string) => id,\n    (items, id) => items[id],\n  );"
    }
  },
  {
    "id": "react-does-the-statics-object-work-with-es6-classes-in-react",
    "title": "Does the statics object work with ES6 classes in React?",
    "prompt": "Does the statics object work with ES6 classes in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "someComponent = React.createClass({\n  statics: {\n    someMethod: function () {\n      // ..\n    },\n  },\n});\n\nclass Component extends React.Component {\n  static propTypes = {\n    // ...\n  };\n\n  static someMethod() {\n    // ...\n  }\n}\n\nclass Component extends React.Component {\n  ....\n}\n\nComponent.propTypes = {...}\nComponent.someMethod = function(){....}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Yes, ES6 classes require you to declare a `statics` object inside the constructor to attach shared members to the class.",
        "isCorrect": false,
        "explanation": "ES6 classes use the `static` keyword on members, not a `statics` object inside the constructor."
      },
      {
        "id": "B",
        "text": "Static class members work only when running under Node.js, so they silently fail whenever the component runs in a browser.",
        "isCorrect": false,
        "explanation": "Static class members work in all modern JavaScript runtimes, not only Node."
      },
      {
        "id": "C",
        "text": "Static methods are banned in ES6 classes, so any shared behavior must be assigned onto the global object instead.",
        "isCorrect": false,
        "explanation": "Static methods and fields are standardized in modern ECMAScript; they are not banned."
      },
      {
        "id": "D",
        "text": "No; the `statics` object was `React.createClass` only. ES6 classes use the `static` keyword or assign members after the class.",
        "isCorrect": true,
        "explanation": "Correct. The `statics` object was `React.createClass` only; ES6 classes use the `static` keyword or assign members after the class."
      }
    ],
    "correctAnswer": "D",
    "explanation": "No. The `statics: { ... }` configuration object only worked with the legacy `React.createClass` factory. In ES6 classes you declare statics with the native `static` keyword—`static propTypes = {...}`, `static someMethod() {...}`—or assign them after the class: `Component.someMethod = ...`. The snippet shows all three forms.\n\nThe practical point is that `createClass` is deprecated and removed in React 16, so modern class components use native static fields and methods, which are now standard ECMAScript.\n\nThe nuance an interviewer probes: static members belong to the class, not instances, so they are shared and accessed via the class name. In function components there are no classes, so component-level statics (like `displayName`) are assigned to the function object directly.",
    "interviewLine": "The `statics` object was a `createClass` feature; in ES6 classes I use the native `static` keyword or assign members on the class after declaration.",
    "misconception": "Expecting the `statics` config object to carry over to ES6 classes, when native `static` members replaced it along with `createClass`.",
    "hints": [
      "Match `statics` to the API it belonged to.",
      "Ask how modern classes declare static members.",
      "`createClass` was removed in React 16."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice the native static field replaces the old statics config object.",
      "language": "tsx",
      "code": "class Widget extends React.Component {\n  static displayName = 'Widget';\n  static defaultSize = 'md';\n  render() { return <div>{Widget.displayName}</div>; }\n}"
    }
  },
  {
    "id": "react-can-redux-only-be-used-with-react",
    "title": "Can Redux only be used with React?",
    "prompt": "Can Redux only be used with React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Yes, Redux is hardcoded to the React DOM renderer, so it throws if you try to connect it to any other view layer.",
        "isCorrect": false,
        "explanation": "Redux core has no React dependency; it is not hardcoded to React DOM."
      },
      {
        "id": "B",
        "text": "Redux can only be used inside Python Django applications, where it manages server-rendered template state.",
        "isCorrect": false,
        "explanation": "Redux is a JavaScript library usable in many environments, not Django-only."
      },
      {
        "id": "C",
        "text": "No, Redux is a standalone, UI-agnostic state container that can be used with any UI layer (Angular, Vue, Svelte, vanilla JavaScript) or backend Node.js apps.",
        "isCorrect": true,
        "explanation": "Correct. Redux is a UI-agnostic container usable with any view layer or plain JavaScript; `react-redux` is just the React binding."
      },
      {
        "id": "D",
        "text": "Redux runs only inside Chrome browser extensions, so a normal web page cannot create or use a Redux store.",
        "isCorrect": false,
        "explanation": "Redux runs in all JavaScript environments, not only Chrome extensions."
      }
    ],
    "correctAnswer": "C",
    "explanation": "No. Redux is a standalone, UI-agnostic state container. Its core—store, actions, reducers, dispatch, subscribe—has no dependency on React. You can drive any view layer (Angular, Vue, Svelte, vanilla JavaScript) or even non-UI Node code from a Redux store.\n\nThe React-specific part is the separate `react-redux` binding, which supplies `<Provider>` and the hooks. Other frameworks have their own bindings, and in plain JavaScript you just call `store.subscribe` and `store.getState`.\n\nThe nuance an interviewer wants: because Redux exposes a simple subscription mechanism, any code can observe state changes. React-Redux merely adapts that subscription into React's render cycle efficiently; the store itself is framework-neutral.",
    "interviewLine": "I'd point out that Redux core is a framework-neutral store exposing subscribe/getState/dispatch; React-Redux is just the binding, so any view layer or plain JavaScript can use it.",
    "misconception": "Believing Redux is tied to React, when its core is framework-neutral and React-Redux is only the React adapter.",
    "hints": [
      "Separate the store from the React binding.",
      "Ask what the store exposes that any code can use.",
      "Other frameworks have their own bindings."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice plain JavaScript consumes the store via subscribe, no React involved.",
      "language": "typescript",
      "code": "import { createStore } from 'redux';\n\nconst store = createStore((s = 0, a: { type: string }) => (a.type === 'inc' ? s + 1 : s));\nstore.subscribe(() => console.log(store.getState()));\nstore.dispatch({ type: 'inc' });"
    }
  },
  {
    "id": "react-do-you-need-to-have-a-particular-build-tool-to-use-redu",
    "title": "Do you need to have a particular build tool to use Redux?",
    "prompt": "Do you need to have a particular build tool to use Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Yes, Redux strictly requires Create React App and throws a configuration error under any other build tool.",
        "isCorrect": false,
        "explanation": "Redux is build-tool agnostic and runs everywhere JavaScript runs; it does not require Create React App."
      },
      {
        "id": "B",
        "text": "Redux must be compiled with the Microsoft Visual Studio C++ compiler before it can run in a JavaScript project.",
        "isCorrect": false,
        "explanation": "Redux is pure JavaScript; it does not need a C++ compiler like Visual Studio."
      },
      {
        "id": "C",
        "text": "Redux can only run inside a Docker container, so a project without containerization cannot create a store.",
        "isCorrect": false,
        "explanation": "Redux runs in any browser or Node environment directly, not only in Docker."
      },
      {
        "id": "D",
        "text": "No, Redux works with any bundler (Vite, Webpack, Rollup, esbuild) and also provides a UMD build that can be loaded directly via a `<script>` tag without any build tool.",
        "isCorrect": true,
        "explanation": "Correct. Redux works with any bundler and even ships a UMD build usable via a plain `<script>` tag without a build step."
      }
    ],
    "correctAnswer": "D",
    "explanation": "No. Redux is plain JavaScript distributed in ESM, CommonJS, and UMD builds, so it works with any bundler—Vite, Webpack, Rollup, esbuild—and even without a build step via a `<script>` tag loading the UMD build. It imposes no tooling requirement.\n\nIn practice you import it like any package in a bundled app, or drop in the UMD script for a quick prototype. The library was authored in modern JavaScript and ships transpiled for consumers.\n\nThe nuance an interviewer wants: this portability is why Redux fits so many environments. The only tool-related consideration is tree-shaking—using the ESM build with a modern bundler lets dead code drop—but no specific build tool is mandated.",
    "interviewLine": "I'd note Redux is plain JavaScript shipped as ESM, CJS, and UMD, so it works with any bundler or even a bare `<script>` tag—no particular build tool required.",
    "misconception": "Assuming Redux requires a specific build setup, when it ships multiple module formats and even a no-build UMD bundle.",
    "hints": [
      "Think about what module formats Redux ships.",
      "Ask whether it can run without any bundler at all.",
      "A UMD build means a script tag is enough."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice the ESM import works with any modern bundler and tree-shakes.",
      "language": "typescript",
      "code": "// Works in Vite, Webpack, Rollup, esbuild — no special config\nimport { configureStore } from '@reduxjs/toolkit';\n\nexport const store = configureStore({ reducer: { n: (s = 0) => s } });"
    }
  },
  {
    "id": "react-how-redux-form-initialvalues-get-updated-from-state",
    "title": "How Redux Form initialValues get updated from state?",
    "prompt": "How Redux Form initialValues get updated from state?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const InitializeFromStateForm = reduxForm({\n  form: 'initializeFromState',\n  enableReinitialize: true,\n})(UserEdit);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Mutate a global `window.__INITIAL_VALUES__` object so the form reads the latest values directly from the DOM.",
        "isCorrect": false,
        "explanation": "Mutating a global is non-reactive and breaks encapsulation; `enableReinitialize` is the supported mechanism."
      },
      {
        "id": "B",
        "text": "Force a full-page browser refresh whenever the mapped state changes so the form re-reads its initial values.",
        "isCorrect": false,
        "explanation": "A full page refresh would destroy SPA state; reinitialization updates fields without reloading."
      },
      {
        "id": "C",
        "text": "Initial values cannot be updated after the form mounts, so new data requires unmounting and remounting the form.",
        "isCorrect": false,
        "explanation": "`enableReinitialize: true` is exactly what allows initial values to update after mount, so the claim they cannot is false."
      },
      {
        "id": "D",
        "text": "Set the configuration option `enableReinitialize: true` in the `reduxForm({ form: '...', enableReinitialize: true })` wrapper.",
        "isCorrect": true,
        "explanation": "Correct. Set `enableReinitialize: true` in the `reduxForm({...})` config so the form re-applies `initialValues` when the prop changes."
      }
    ],
    "correctAnswer": "D",
    "explanation": "By default Redux Form captured `initialValues` once, when the form mounted, so later changes to that prop were ignored. Setting the config option `enableReinitialize: true` tells Redux Form to re-apply `initialValues` whenever the prop changes, which is how a form reflects asynchronously-loaded data (for example, an edit form that fetches the record after mount).\n\nThe snippet wraps `UserEdit` with `reduxForm({ form: 'initializeFromState', enableReinitialize: true })`, so when the mapped `initialValues` arrive from the store, the fields update.\n\nThe nuance an interviewer probes: reinitializing can discard a user's in-progress edits when new initial values arrive, so you pair it with `keepDirtyOnReinitialize` to preserve dirty fields. This is a known rough edge; modern form libraries handle reset/default-value syncing more explicitly.",
    "interviewLine": "Redux Form seeds `initialValues` once, so I set `enableReinitialize: true` to re-apply them when async data arrives, pairing it with `keepDirtyOnReinitialize` to protect in-progress edits.",
    "misconception": "Expecting `initialValues` to track state automatically, when Redux Form only reapplies them if you opt in with `enableReinitialize`.",
    "hints": [
      "Ask when Redux Form reads `initialValues` by default.",
      "Think about an edit form whose data loads after mount.",
      "Reinitializing can clobber a user's edits unless guarded."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice modern libraries reset to new defaults explicitly instead of implicit reinit.",
      "language": "tsx",
      "code": "import { useEffect } from 'react';\nimport { useForm } from 'react-hook-form';\n\nfunction EditUser({ user }: { user?: { name: string } }) {\n  const { register, reset } = useForm();\n  useEffect(() => { if (user) reset(user); }, [user, reset]);\n  return <input {...register('name')} />;\n}"
    }
  },
  {
    "id": "system_design-what-is-the-purpose-of-registerserviceworker-in-react",
    "title": "What is the purpose of registerServiceWorker in React?",
    "prompt": "What is the purpose of registerServiceWorker in React?",
    "level": "junior",
    "type": "concept",
    "category": "system_design",
    "subject": "data-fetching",
    "tags": [
      "system_design",
      "data-fetching",
      "junior"
    ],
    "codeSnippet": "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "To connect the running web page to the user's printer so React can send rendered components to physical paper.",
        "isCorrect": false,
        "explanation": "Service Workers manage network caching, not printers."
      },
      {
        "id": "B",
        "text": "To automatically forward the user's saved passwords to marketing servers for personalized ad targeting.",
        "isCorrect": false,
        "explanation": "Service Workers are standard caching workers; they do not exfiltrate passwords."
      },
      {
        "id": "C",
        "text": "To run background cryptocurrency mining in the user's browser while the React application is open in a tab.",
        "isCorrect": false,
        "explanation": "Service Workers provide caching and offline support, not crypto mining."
      },
      {
        "id": "D",
        "text": "To register a Service Worker that caches static assets (HTML/JS/CSS), enabling offline Progressive Web App (PWA) capabilities and faster subsequent page loads from local cache.",
        "isCorrect": true,
        "explanation": "Correct. It registers a Service Worker that caches static assets for offline support and faster repeat loads."
      }
    ],
    "correctAnswer": "D",
    "explanation": "`registerServiceWorker` registers a Service Worker, a script the browser runs in the background, separate from the page. It can intercept network requests and serve cached assets, which gives the app offline capability and faster repeat loads from cache. Older Create React App templates generated this for you to opt into a Progressive Web App.\n\nIn practice the Service Worker caches the static shell (HTML/JS/CSS) so a return visit loads from the cache instantly and still works on a flaky or absent network. The snippet mounts the app and then calls `registerServiceWorker()`.\n\nThe nuance an interviewer probes: caching introduces staleness—users can keep seeing an old build until the worker updates and the page reloads—so you need an update strategy (skipWaiting/clients.claim, or a prompt). Modern tooling (Workbox, Next PWA) manages this; CRA actually defaulted the worker to unregistered to avoid surprise caching.",
    "interviewLine": "`registerServiceWorker` installs a background worker that caches the app shell for offline and fast repeat loads, so I always pair it with an update strategy to avoid serving a stale build.",
    "misconception": "Thinking a Service Worker is pure upside, when its caching introduces staleness that requires a deliberate update strategy.",
    "hints": [
      "Think about what a background worker does to network requests.",
      "Ask what benefit caching the shell gives on repeat visits.",
      "Caching can serve a stale build without an update plan."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the worker caches the shell on install for offline use.",
      "language": "javascript",
      "code": "// sw.js\nself.addEventListener('install', (event) => {\n  event.waitUntil(\n    caches.open('shell-v1').then((cache) => cache.addAll(['/', '/index.html', '/main.js'])),\n  );\n});"
    }
  },
  {
    "id": "react-how-to-use-class-field-declarations-syntax-in-react-cla",
    "title": "How to use class field declarations syntax in React classes?",
    "prompt": "How to use class field declarations syntax in React classes?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "class Counter extends Component {\n  state = { value: 0 };\n\n  handleIncrement = () => {\n    this.setState((prevState) => ({\n      value: prevState.value + 1,\n    }));\n  };\n\n  handleDecrement = () => {\n    this.setState((prevState) => ({\n      value: prevState.value - 1,\n    }));\n  };\n\n  render() {\n    return (\n      <div>\n        {this.state.value}\n\n        <button onClick={this.handleIncrement}>+</button>\n        <button onClick={this.handleDecrement}>-</button>\n      </div>\n    );\n  }\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Prefix every method with `function*` and `yield` on each line so React can pause and resume the handlers.",
        "isCorrect": false,
        "explanation": "Generators (`function*`) are for iterators, not event handlers; class fields use arrow functions instead."
      },
      {
        "id": "B",
        "text": "Class fields are illegal JavaScript and crash the browser, so state and handlers must stay in the constructor.",
        "isCorrect": false,
        "explanation": "Class fields are standardized in ECMAScript (ES2022); they do not crash browsers."
      },
      {
        "id": "C",
        "text": "Declare state as a class property (`state = { count: 0 };`) and methods as arrow functions (`handleClick = () => ...`) to eliminate constructor boilerplate and manual `.bind(this)`.",
        "isCorrect": true,
        "explanation": "Correct. Declare state as a class property and handlers as arrow-function fields, which auto-bind `this` and remove constructor boilerplate."
      },
      {
        "id": "D",
        "text": "Store every handler on the global `window` object so the component can look them up by name during render.",
        "isCorrect": false,
        "explanation": "Class fields attach members to the instance; they are not stored on the global `window`."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Class field declarations let you write class components without constructor boilerplate. You declare state as a class property (`state = { value: 0 }`) and define handlers as arrow-function fields (`handleIncrement = () => {...}`). The arrow fields capture the instance's `this` lexically, so you never call `.bind(this)`.\n\nThe snippet's `Counter` initializes state and defines two handlers this way, then passes them to `onClick` directly. There is no constructor and no binding, which removes a common source of bugs where an unbound method loses its `this`.\n\nThe nuance an interviewer probes: arrow-function fields create one function per instance (not per class prototype), which is fine for components but means they are not shared across instances. Class fields are standard ECMAScript now, so no special config is needed.",
    "interviewLine": "Class fields let me set state as a property and write handlers as arrow fields, which capture `this` lexically so I drop the constructor and `.bind` entirely.",
    "misconception": "Thinking you still need a constructor and manual binding, when arrow-function class fields capture `this` and initialize state directly.",
    "hints": [
      "Look at how state and handlers are declared without a constructor.",
      "Ask what binds `this` for the arrow-function handlers.",
      "Each instance gets its own copy of an arrow field."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the arrow handler needs no bind because it captures this lexically.",
      "language": "tsx",
      "code": "class Toggle extends React.Component {\n  state = { on: false };\n  flip = () => this.setState((s) => ({ on: !s.on }));\n  render() { return <button onClick={this.flip}>{this.state.on ? 'On' : 'Off'}</button>; }\n}"
    }
  },
  {
    "id": "react-what-are-the-differences-between-flux-and-redux",
    "title": "What are the differences between Flux and Redux?",
    "prompt": "What are the differences between Flux and Redux?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "There are no differences; Flux and Redux are the same library published under two different package names.",
        "isCorrect": false,
        "explanation": "Redux introduced a single immutable store and pure reducers over Flux, so they are not identical."
      },
      {
        "id": "B",
        "text": "Flux is built for mobile apps while Redux is built for desktop apps, so you pick one based on the target device.",
        "isCorrect": false,
        "explanation": "Both are architectural patterns for web and mobile; neither is platform-specific."
      },
      {
        "id": "C",
        "text": "Flux uses multiple stores with a singleton Dispatcher and mutable state; Redux uses a single store with no separate dispatcher, immutable state, and pure reducer functions.",
        "isCorrect": true,
        "explanation": "Correct. Flux uses multiple mutable stores with a dispatcher; Redux uses one immutable store, pure reducers, and no separate dispatcher."
      },
      {
        "id": "D",
        "text": "Flux runs only on Node.js while Redux runs inside MySQL, so they operate at completely different layers of the stack.",
        "isCorrect": false,
        "explanation": "Both are client-side JavaScript patterns; neither runs in MySQL."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Redux is a refinement of Flux. In Flux there are multiple stores, each holding both state and change logic, coordinated by a singleton dispatcher; stores can hold mutable state. Redux collapses this to a single store with hierarchical reducers, treats state as immutable, has no separate dispatcher, and keeps change logic in pure reducers rather than in the stores.\n\nThe practical effect is simpler mental model and stronger guarantees: one source of truth, immutable updates, and pure functions make transitions predictable and replayable, which is harder when state is mutable and spread across stores.\n\nThe nuance an interviewer wants: both are unidirectional, so that is not the difference. The real contrasts are store count (many vs one), where change logic lives (in stores vs in reducers), mutability (mutable vs immutable), and the dispatcher (present vs absent).",
    "interviewLine": "I'd say both are unidirectional, but Redux simplifies Flux to a single immutable store with pure reducers and no dispatcher, versus Flux's multiple mutable stores coordinated by one.",
    "misconception": "Thinking the difference is directionality, when both are unidirectional and the real contrasts are store count, mutability, and the dispatcher.",
    "hints": [
      "List what each does with stores and the dispatcher.",
      "Ask where the change logic lives in each.",
      "Directionality is the same in both."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://redux.js.org/style-guide/",
    "example": {
      "caption": "Notice Redux keeps change logic in a pure reducer, not inside a mutable store.",
      "language": "typescript",
      "code": "type State = { n: number };\ntype Action = { type: 'inc' } | { type: 'reset' };\n\n// Pure reducer: every branch returns a fresh object, never mutates `s`\nfunction reducer(s: State = { n: 0 }, a: Action): State {\n  switch (a.type) {\n    case 'inc':\n      return { n: s.n + 1 };\n    case 'reset':\n      return { n: 0 };\n    default:\n      return s;\n  }\n}"
    }
  },
  {
    "id": "react-what-is-the-main-purpose-of-constructor",
    "title": "What is the main purpose of constructor?",
    "prompt": "What is the main purpose of constructor?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "constructor(props) {\n  super(props);\n  // Don't call this.setState() here!\n  this.state = { counter: 0 };\n  this.handleClick = this.handleClick.bind(this);\n}",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "To register the service worker that caches the app's assets for offline use before the component first renders.",
        "isCorrect": false,
        "explanation": "Registering a Service Worker is unrelated; the constructor initializes the instance in memory."
      },
      {
        "id": "B",
        "text": "To render the component's HTML markup directly to the browser DOM before React takes over the output.",
        "isCorrect": false,
        "explanation": "Rendering happens in `render()`, not the constructor."
      },
      {
        "id": "C",
        "text": "To initialize local component state (`this.state = { ... }`) and bind event handler methods to the component instance (`this.handleClick = this.handleClick.bind(this)`).",
        "isCorrect": true,
        "explanation": "Correct. The constructor initializes `this.state` and binds event-handler methods to the instance before rendering."
      },
      {
        "id": "D",
        "text": "To fetch data from backend servers with synchronous HTTP requests so state is populated before the first render.",
        "isCorrect": false,
        "explanation": "Constructors should not run side effects like fetching; that belongs in mount lifecycle or effects."
      }
    ],
    "correctAnswer": "C",
    "explanation": "In a class component the constructor does two things: initialize local state by assigning `this.state = {...}`, and bind event-handler methods to the instance (`this.handleClick = this.handleClick.bind(this)`) when they are regular methods. The snippet shows both, with the comment reminding you never to call `setState` here.\n\nYou set `this.state` directly (not via `setState`) because the component is not mounted yet. Binding is only needed for regular methods passed as callbacks; arrow-function class fields avoid it.\n\nThe nuance an interviewer probes: the constructor should not run side effects like data fetching—that belongs in `componentDidMount`/effects. With class fields and arrow handlers, many components need no explicit constructor at all.",
    "interviewLine": "I'd name the constructor's two jobs as initializing `this.state` directly and binding handler methods, and I keep side effects like fetching in `componentDidMount`, not here.",
    "misconception": "Treating the constructor as a place for side effects, when its job is only to set initial state and bind handlers.",
    "hints": [
      "Note the two things the snippet does in the constructor.",
      "Ask why you set `this.state` directly rather than calling setState.",
      "Fetching does not belong here."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice class fields remove the need for a constructor entirely here.",
      "language": "tsx",
      "code": "class Counter extends React.Component {\n  state = { count: 0 };\n  inc = () => this.setState((s) => ({ count: s.count + 1 }));\n  render() { return <button onClick={this.inc}>{this.state.count}</button>; }\n}"
    }
  },
  {
    "id": "react-is-it-mandatory-to-define-constructor-for-react-compone",
    "title": "Is it mandatory to define constructor for React component?",
    "prompt": "Is it mandatory to define constructor for React component?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Yes, omitting the constructor throws a fatal JavaScript syntax error, so every class component must declare one.",
        "isCorrect": false,
        "explanation": "Omitting a constructor is fine; JavaScript supplies a default one, so there is no syntax error."
      },
      {
        "id": "B",
        "text": "Constructors are mandatory for function components, which call `super()` implicitly before running their body.",
        "isCorrect": false,
        "explanation": "Function components have no constructors; this option describes the wrong component kind."
      },
      {
        "id": "C",
        "text": "No, if you don't initialize state or bind methods (or if you use class fields `state = { ... }`), you do not need to implement a constructor.",
        "isCorrect": true,
        "explanation": "Correct. A constructor is optional—skip it if you do not initialize state or bind methods, or use class fields instead."
      },
      {
        "id": "D",
        "text": "Yes, but only when the component has fewer than five lines, since short components cannot infer a default constructor.",
        "isCorrect": false,
        "explanation": "Whether a constructor is needed depends on construction-time work, not on how many lines the component has."
      }
    ],
    "correctAnswer": "C",
    "explanation": "No. A constructor is optional. If you do not initialize state in it or bind methods, you do not need one—and with class fields you can declare `state = {...}` and arrow-function handlers directly on the class, skipping the constructor entirely. JavaScript provides a default constructor that calls `super(...args)` for you.\n\nSo you write a constructor only when you have construction-time work: initializing state before class fields were common, or binding regular methods. Otherwise it is pure noise.\n\nThe nuance an interviewer wants: function components have no constructor at all; they use `useState`. For class components, the modern style (class fields) means an explicit constructor is rarely needed, and when present it must still call `super(props)` before touching `this`.",
    "interviewLine": "A constructor is optional; without state init or method binding I skip it, and with class fields I rarely need one at all.",
    "misconception": "Assuming every class component needs a constructor, when it is optional and class fields usually make it unnecessary.",
    "hints": [
      "Ask what the default constructor does for you.",
      "Think about whether class fields remove the need.",
      "Function components have no constructor at all."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice this class component has no constructor and still works.",
      "language": "tsx",
      "code": "class Counter extends React.Component<{ label: string }> {\n  // Class field replaces constructor-based state init\n  state = { count: 0 };\n\n  increment = () => this.setState((s) => ({ count: s.count + 1 }));\n\n  render() {\n    return (\n      <button onClick={this.increment}>\n        {this.props.label}: {this.state.count}\n      </button>\n    );\n  }\n}"
    }
  },
  {
    "id": "react-why-should-not-call-setstate-in-componentwillunmount",
    "title": "Why should not call setState in componentWillUnmount?",
    "prompt": "Why should not call setState in componentWillUnmount?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Because the component is being unmounted and destroyed; it will never re-render, so setting state is meaningless and triggers a React warning.",
        "isCorrect": true,
        "explanation": "Correct. The instance is being destroyed and will never render again, so setting state is pointless and triggers a warning."
      },
      {
        "id": "B",
        "text": "Because `componentWillUnmount` only runs on backend Node.js servers, where `setState` has no DOM to update.",
        "isCorrect": false,
        "explanation": "`componentWillUnmount` runs in the browser when the component is removed, not only in Node."
      },
      {
        "id": "C",
        "text": "Because calling `setState` during unmount turns off the user's monitor until the component finishes tearing down.",
        "isCorrect": false,
        "explanation": "The consequence is a wasted update and a warning, not the monitor turning off."
      },
      {
        "id": "D",
        "text": "Because `setState` in unmount deletes the application's database on the server as an unintended side effect.",
        "isCorrect": false,
        "explanation": "It is an in-memory lifecycle warning, not a server database deletion."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Once `componentWillUnmount` runs, the component instance is being removed from the tree and will never render again. Calling `setState` there schedules an update that can never produce output, so it is wasted work and React warns about updating an unmounted component.\n\nIn practice this method is for cleanup—clearing timers, unsubscribing, aborting requests—not for state changes. If you find yourself wanting to `setState` here, it usually means an async callback is still pending; the fix is to cancel that work, not to set state on the way out.\n\nThe nuance an interviewer probes: the warning you sometimes see about setting state on an unmounted component often originates from a late async callback elsewhere, not from `componentWillUnmount` itself. Cancel the source in cleanup.",
    "interviewLine": "By unmount the instance will never render again, so `setState` there is futile; I use the method to cancel timers and subscriptions instead.",
    "misconception": "Thinking `componentWillUnmount` is a place to update state, when the instance is already leaving and the method is for cleanup only.",
    "hints": [
      "Ask whether the component can render after it unmounts.",
      "Think about what this lifecycle method is actually for.",
      "A late async callback is the usual real culprit."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice unmount cleanup cancels work rather than setting state.",
      "language": "tsx",
      "code": "class Ticker extends React.Component {\n  timer = window.setInterval(() => {}, 1000);\n  componentWillUnmount() {\n    clearInterval(this.timer); // cleanup, not setState\n  }\n  render() { return null; }\n}"
    }
  },
  {
    "id": "react-what-is-the-purpose-of-getderivedstatefromerror",
    "title": "What is the purpose of getDerivedStateFromError?",
    "prompt": "What is the purpose of getDerivedStateFromError?",
    "level": "intermediate",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "intermediate"
    ],
    "codeSnippet": "static getDerivedStateFromError(error)\n\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    // Update state so the next render will show the fallback UI.\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      // You can render any custom fallback UI\n      return <h1>Something went wrong.</h1>;\n    }\n\n    return this.props.children;\n  }\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "A utility that downloads the caught error's full stack trace as a log file to the user's desktop for later analysis.",
        "isCorrect": false,
        "explanation": "It updates state to render a fallback, not download log files to disk."
      },
      {
        "id": "B",
        "text": "A hook used inside function components to catch click events on children and update the parent component's local state.",
        "isCorrect": false,
        "explanation": "It is a static class lifecycle method for boundaries, not a hook for click events."
      },
      {
        "id": "C",
        "text": "A static error-boundary method that runs during render after a child throws, returning state to show a fallback UI.",
        "isCorrect": true,
        "explanation": "Correct. It is a static error-boundary method that runs during render after a child throws, returning state to show a fallback UI."
      },
      {
        "id": "D",
        "text": "A method that reads the thrown error and automatically rewrites the broken child component's source code to fix it.",
        "isCorrect": false,
        "explanation": "It catches thrown runtime errors to switch to a fallback; it does not fix syntax errors."
      }
    ],
    "correctAnswer": "C",
    "explanation": "`static getDerivedStateFromError(error)` is the error-boundary lifecycle that runs during rendering after a descendant throws. It receives the error and returns a state update (like `{ hasError: true }`) so the next render shows a fallback UI instead of crashing. Because it runs in the render phase, it must be pure and only compute state—no side effects.\n\nThe snippet uses it to flip `hasError` so `render` returns the fallback. Logging the error belongs in the companion `componentDidCatch`, which runs in the commit phase.\n\nThe nuance an interviewer probes: the two methods split responsibilities. `getDerivedStateFromError` is pure and sets fallback state; `componentDidCatch` can perform side effects like reporting to Sentry. Neither catches errors in event handlers or async code.",
    "interviewLine": "I'd explain that `getDerivedStateFromError` runs in the render phase after a child throws, so it purely returns fallback state while `componentDidCatch` handles the logging side effect.",
    "misconception": "Expecting `getDerivedStateFromError` to log or do side effects, when it must stay pure and side effects belong in `componentDidCatch`.",
    "hints": [
      "Note that it runs during rendering, so it must be pure.",
      "Ask where you would log the error instead.",
      "It handles render-phase errors, not event handlers."
    ],
    "source": "300-react",
    "estimatedMinutes": 3,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice the pure method sets fallback state; logging lives in componentDidCatch.",
      "language": "tsx",
      "code": "class Boundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(err: Error) { report(err); }\n  render() { return this.state.hasError ? <p>Something broke</p> : this.props.children; }\n}"
    }
  },
  {
    "id": "react-what-is-the-purpose-of-unmountcomponentatnode-method",
    "title": "What is the purpose of unmountComponentAtNode method?",
    "prompt": "What is the purpose of unmountComponentAtNode method?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "ReactDOM.unmountComponentAtNode(container);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A build tool that compiles a React component tree into Python scripts for execution on a server-side rendering runtime.",
        "isCorrect": false,
        "explanation": "It manages client DOM unmounting, not compiling JSX into Python."
      },
      {
        "id": "B",
        "text": "A method that erases the browser's local storage and cache whenever a mounted component is removed from the DOM tree.",
        "isCorrect": false,
        "explanation": "It cleanly unmounts a React tree from a container; it does not delete a disk."
      },
      {
        "id": "C",
        "text": "A legacy ReactDOM method that unmounts a tree from a container and cleans it up, replaced by `root.unmount()` in React 18+.",
        "isCorrect": true,
        "explanation": "Correct. It is the legacy ReactDOM method to unmount a tree from a container and clean up, replaced by `root.unmount()` in React 18+."
      },
      {
        "id": "D",
        "text": "A utility that restarts the user's Wi-Fi router whenever a React component is detached from its container node.",
        "isCorrect": false,
        "explanation": "It is a DOM cleanup function in `react-dom`, unrelated to Wi-Fi."
      }
    ],
    "correctAnswer": "C",
    "explanation": "`ReactDOM.unmountComponentAtNode(container)` detached a React tree previously rendered into a DOM container with `ReactDOM.render`, running cleanup (unsubscribing effects, clearing handlers, resetting state) and emptying the node. It returned `true` if something was unmounted, `false` otherwise.\n\nThis mattered when embedding React into a non-React page or tearing down a widget: you rendered into a node and later unmounted it explicitly. The snippet shows the legacy call.\n\nThe nuance an interviewer probes: it is the legacy API paired with `ReactDOM.render`. React 18 replaced both with the `createRoot` API, where you call `root.unmount()` on the root you created. So the modern equivalent lives on the root object, not as a standalone function.",
    "interviewLine": "`unmountComponentAtNode` tore down a React tree rendered via `ReactDOM.render` and ran its cleanup; in React 18+ I call `root.unmount()` on the created root instead.",
    "misconception": "Reaching for `unmountComponentAtNode` in modern code, when React 18's `createRoot` replaced it with `root.unmount()`.",
    "hints": [
      "Pair it with the render API it belonged to.",
      "Ask what the React 18 equivalent is.",
      "The modern form lives on a root object."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice React 18 unmounts via the root object instead.",
      "language": "tsx",
      "code": "import { createRoot } from 'react-dom/client';\n\nconst root = createRoot(document.getElementById('widget')!);\nroot.render(<Widget />);\n// later, to tear down:\nroot.unmount();"
    }
  },
  {
    "id": "react-what-is-the-benefit-of-strict-mode",
    "title": "What is the benefit of strict mode?",
    "prompt": "What is the benefit of strict mode?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "It encrypts the client's cookies with AES-256 so component state cannot be read by scripts on the same page.",
        "isCorrect": false,
        "explanation": "StrictMode is a dev diagnostic, not a cookie-encryption tool."
      },
      {
        "id": "B",
        "text": "Identifies components with unsafe lifecycles, flags legacy string refs and `findDOMNode`, detects unexpected side effects via double-invoking, and warns about deprecated context APIs.",
        "isCorrect": true,
        "explanation": "Correct. It flags unsafe lifecycles, legacy refs and `findDOMNode`, and double-invokes functions to catch side effects and deprecated APIs in development."
      },
      {
        "id": "C",
        "text": "It increases production download bandwidth by preloading every component variant the user might eventually reach.",
        "isCorrect": false,
        "explanation": "StrictMode is development-only with no production runtime impact, so it cannot increase production bandwidth."
      },
      {
        "id": "D",
        "text": "It enforces TypeScript typing on plain JavaScript files at runtime without needing a separate compile step.",
        "isCorrect": false,
        "explanation": "It is a runtime React check, not a static TypeScript type checker."
      }
    ],
    "correctAnswer": "B",
    "explanation": "`<React.StrictMode>` runs development-only checks to surface fragile patterns before they bite in production. It flags components using unsafe legacy lifecycles, warns about legacy string refs and `findDOMNode`, detects legacy context, and double-invokes certain functions (render, effect setup/cleanup) to expose impure logic and missing cleanup.\n\nThe double invocation is the headline benefit: an effect that subscribes without unsubscribing, or render logic that mutates something, misbehaves visibly in development, which is exactly when you want to catch it. It adds no cost in production.\n\nThe nuance an interviewer probes: these checks prepare code for concurrent features, where React may mount, unmount, and remount components or re-run renders. The right response to the double run is idempotent effects and proper cleanup, not disabling StrictMode.",
    "interviewLine": "I value StrictMode's dev-only checks—double-invoking renders and effects, flagging legacy APIs—because they surface impure logic and missing cleanup early, which readies the code for concurrent features.",
    "misconception": "Treating StrictMode warnings and double-runs as noise, when they are deliberate probes that prepare code for concurrent React.",
    "hints": [
      "List the kinds of problems StrictMode surfaces.",
      "Ask why double-invoking helps catch bugs.",
      "It is development-only with no production cost."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
    "example": {
      "caption": "Notice wrapping the tree enables the dev-only checks.",
      "language": "tsx",
      "code": "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);"
    }
  },
  {
    "id": "react-how-do-you-say-that-state-updates-are-merged",
    "title": "How do you say that state updates are merged?",
    "prompt": "How do you say that state updates are merged?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "constructor(props) {\n    super(props);\n    this.state = {\n      posts: [],\n      comments: []\n    };\n  }\n\ncomponentDidMount() {\n    fetchPosts().then(response => {\n      this.setState({\n        posts: response.posts\n      });\n    });\n\n    fetchComments().then(response => {\n      this.setState({\n        comments: response.comments\n      });\n    });\n  }",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "In class components, calling `this.setState({ comments })` shallowly merges the provided object keys into the existing `this.state` without overwriting other state properties (e.g. `posts`).",
        "isCorrect": true,
        "explanation": "Correct. Class `setState` shallow-merges the keys you pass into existing state, leaving omitted keys like `posts` intact."
      },
      {
        "id": "B",
        "text": "In class components, `setState` replaces every unmentioned key with `null`, so you must restate the full object each time.",
        "isCorrect": false,
        "explanation": "Class `setState` preserves keys you do not mention; it does not null them out."
      },
      {
        "id": "C",
        "text": "State updates cannot be merged under any circumstances, so each `setState` call must pass the entire state object.",
        "isCorrect": false,
        "explanation": "Shallow merging is exactly the default behavior of class `setState`, so the claim it cannot merge is false."
      },
      {
        "id": "D",
        "text": "State updates are merged by uploading each change to a Git repository and resolving conflicts on the server.",
        "isCorrect": false,
        "explanation": "Merging is a shallow in-memory object merge, not an upload to a Git repository."
      }
    ],
    "correctAnswer": "A",
    "explanation": "In class components, `this.setState({ comments })` shallowly merges the keys you pass into the existing `this.state`, leaving other keys untouched. The snippet fetches posts and comments separately and calls `setState` with each; because of merging, setting `comments` does not wipe out `posts`.\n\nThe merge is one level deep. Top-level keys you include replace their old values; keys you omit are preserved. Nested objects are not deep-merged, so you must spread them yourself if you change part of a nested structure.\n\nThe nuance an interviewer probes: this merging is class-only. The `useState` setter replaces the value entirely, so with objects you spread manually (`setObj(prev => ({ ...prev, ...changes }))`). Mixing up the two behaviors is a common source of lost state.",
    "interviewLine": "Class `setState` shallow-merges the keys I pass into existing state, so updating `comments` leaves `posts` intact—unlike the `useState` setter, which replaces the value and makes me spread manually.",
    "misconception": "Assuming all state setters merge, when only class `setState` shallow-merges and `useState` replaces the value entirely.",
    "hints": [
      "Ask what happens to `posts` when you setState only `comments`.",
      "Note that the merge is one level deep.",
      "The `useState` setter behaves differently."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice useState replaces, so you spread to emulate the class merge.",
      "language": "typescript",
      "code": "const [state, setState] = useState({ posts: [] as string[], comments: [] as string[] });\n\n// unlike class setState, you must spread to preserve posts\nsetState((prev) => ({ ...prev, comments: ['hi'] }));"
    }
  },
  {
    "id": "react-how-do-you-pass-arguments-to-an-event-handler",
    "title": "How do you pass arguments to an event handler?",
    "prompt": "How do you pass arguments to an event handler?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "system-architecture",
    "tags": [
      "react",
      "system-architecture",
      "junior"
    ],
    "codeSnippet": "<button onClick={(e) => this.updateUser(userId, e)}>Update User details</button>\n<button onClick={this.updateUser.bind(this, userId)}>Update User details</button>",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Invoke the handler directly in JSX with `onClick={deleteUser(id)}` so the id is captured when the element renders.",
        "isCorrect": false,
        "explanation": "Calling `deleteUser(id)` directly runs it during render, not on click; you need a function reference."
      },
      {
        "id": "B",
        "text": "Store the arguments in a global `window.currentArgument` and have the handler read them back when the click fires.",
        "isCorrect": false,
        "explanation": "A global is a race-condition hazard and breaks encapsulation; use a closure or bind instead."
      },
      {
        "id": "C",
        "text": "Arguments cannot be passed to event handlers in React, so the handler must look the id up from component state.",
        "isCorrect": false,
        "explanation": "Arguments pass fine via arrow functions or `.bind`, so the claim that they cannot is false."
      },
      {
        "id": "D",
        "text": "Use an inline arrow function `<button onClick={(e) => this.deleteUser(id, e)}>` or bind arguments `<button onClick={this.deleteUser.bind(this, id)}>`.",
        "isCorrect": true,
        "explanation": "Correct. Use an inline arrow (`(e) => deleteUser(id, e)`) or `deleteUser.bind(this, id)` to pass arguments alongside the event."
      }
    ],
    "correctAnswer": "D",
    "explanation": "You pass extra arguments to a handler either with an inline arrow function—`onClick={(e) => deleteUser(id, e)}`—or by binding—`onClick={deleteUser.bind(this, id)}`. Both create a new function that calls your handler with the id (and the event). The snippet shows both forms.\n\nThe key is that the attribute value must be a function React calls on the event, not a call you make during render. With the arrow form you pass the event explicitly; with `bind` the bound args come first and the event is forwarded as the last argument.\n\nThe nuance an interviewer probes: inline arrows and `bind` create a new function on every render, which can defeat `React.memo` on a child receiving the handler as a prop. If that matters, memoize with `useCallback` or restructure so the id comes from the element (e.g. a data attribute).",
    "interviewLine": "I pass arguments with an inline arrow or `.bind`, keeping in mind both make a new function each render, so I reach for `useCallback` when a memoized child depends on it.",
    "misconception": "Invoking the handler during render (`onClick={fn(id)}`), when you must pass a function React calls on the event.",
    "hints": [
      "Note that `onClick` needs a function, not a call.",
      "Ask what the two forms in the snippet have in common.",
      "A new function each render can defeat a memoized child."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://web.dev/articles/vitals",
    "example": {
      "caption": "Notice the arrow passes the id without invoking the handler during render.",
      "language": "tsx",
      "code": "function List({ ids, onDelete }: { ids: string[]; onDelete: (id: string) => void }) {\n  return (\n    <ul>\n      {ids.map((id) => (\n        // Arrow closes over `id` so each row deletes the right item\n        <li key={id}>\n          <button onClick={() => onDelete(id)}>Delete {id}</button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
  },
  {
    "id": "react-what-is-the-popular-choice-for-form-handling",
    "title": "What is the popular choice for form handling?",
    "prompt": "What is the popular choice for form handling?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Writing custom assembly-language keyboard drivers so the browser can capture form input before React sees it.",
        "isCorrect": false,
        "explanation": "Form handling uses JavaScript libraries, not custom keyboard drivers."
      },
      {
        "id": "B",
        "text": "Forms cannot be built in React, so a separate backend-rendered page must handle all input and validation.",
        "isCorrect": false,
        "explanation": "Forms are well-supported in React; React Hook Form and Formik are mature solutions."
      },
      {
        "id": "C",
        "text": "Submitting forms through the obsolete HTML `<blink>` tag, which modern browsers map to a form submission event.",
        "isCorrect": false,
        "explanation": "`<blink>` is obsolete and unrelated to forms; this is not a form-handling mechanism."
      },
      {
        "id": "D",
        "text": "React Hook Form (modern standard for performance/uncontrolled inputs) and Formik / TanStack Form, paired with schema validators like Zod or Yup.",
        "isCorrect": true,
        "explanation": "Correct. React Hook Form (modern default), Formik, and TanStack Form, paired with Zod or Yup for schema validation."
      }
    ],
    "correctAnswer": "D",
    "explanation": "The current popular choices are React Hook Form, Formik, and TanStack Form, usually paired with a schema validator like Zod or Yup. React Hook Form is the modern default because it keeps inputs largely uncontrolled and subscribes to field changes selectively, so a large form re-renders minimally.\n\nIn practice these libraries handle the three hard parts of forms: getting values in and out, validation and error messages, and submission. A schema validator declares the rules once and infers types, so your form state and validation stay in sync.\n\nThe nuance an interviewer probes: the performance difference comes from controlled versus uncontrolled handling. Formik is controlled (re-renders per keystroke), while React Hook Form minimizes renders via refs and isolated subscriptions, which is why it scales better on big forms.",
    "interviewLine": "I default to React Hook Form with Zod: it keeps inputs uncontrolled and subscribes to fields selectively, so large forms re-render minimally while the schema drives validation and types.",
    "misconception": "Treating all form libraries as equivalent, when the controlled-vs-uncontrolled difference is why React Hook Form scales to big forms.",
    "hints": [
      "Name the current mainstream form libraries.",
      "Ask why one of them re-renders less on large forms.",
      "A schema validator usually sits alongside them."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
    "example": {
      "caption": "Notice the Zod schema drives validation and infers the form's types.",
      "language": "tsx",
      "code": "import { useForm } from 'react-hook-form';\nimport { z } from 'zod';\n\nconst schema = z.object({ email: z.string().email() });\ntype Form = z.infer<typeof schema>;\n\nfunction Signup() {\n  const { register } = useForm<Form>();\n  return <input {...register('email')} />;\n}"
    }
  },
  {
    "id": "react-give-an-example-on-how-to-use-context",
    "title": "Give an example on How to use context?",
    "prompt": "Give an example on How to use context?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "//Lets create a context with a default theme value \"luna\"\nconst ThemeContext = React.createContext('luna');\n// Create App component where it uses provider to pass theme value in the tree\nclass App extends React.Component {\n  render() {\n    return (\n      <ThemeContext.Provider value=\"nova\">\n        <Toolbar />\n      </ThemeContext.Provider>\n    );\n  }\n}\n// A middle component where you don't need to pass theme prop anymore\nfunction Toolbar(props) {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n// Lets read theme value in the button component to use\nclass ThemedButton extends React.Component {\n  static contextType = ThemeContext;\n  render() {\n    return <Button theme={this.context} />;\n  }\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Assign `window.theme = 'dark'` inside the render method so every component reads the shared value from the global.",
        "isCorrect": false,
        "explanation": "Assigning `window.theme` in render is non-reactive and breaks encapsulation; use a provider and `useContext`."
      },
      {
        "id": "B",
        "text": "Context can only be used after compiling the component to C++, so a build step is required before any provider works.",
        "isCorrect": false,
        "explanation": "Context is a built-in React JavaScript API, not something that requires compiling C++."
      },
      {
        "id": "C",
        "text": "Write the context value to a file on the user's local hard drive so descendant components can read it back on render.",
        "isCorrect": false,
        "explanation": "Context lives in memory during rendering; it does not write values to the hard drive."
      },
      {
        "id": "D",
        "text": "Create context `const ThemeContext = createContext('light')`, provide it `<ThemeContext.Provider value='dark'>`, and consume it with `const theme = useContext(ThemeContext)`.",
        "isCorrect": true,
        "explanation": "Correct. Create the context, wrap a subtree in a Provider, and read it with `useContext`—the standard three-step pattern."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Using Context is a three-step pattern: create it with `createContext(defaultValue)`, wrap a subtree in `<Context.Provider value={...}>`, and read it in any descendant with `useContext(Context)` (or the legacy `Context.Consumer`/`static contextType`). The snippet threads a theme from `App` down to `ThemedButton` without passing a `theme` prop through `Toolbar`.\n\nThis is the standard way to share ambient values—theme, locale, current user—past intermediate components that do not care about them, eliminating prop drilling for those values.\n\nThe nuance an interviewer probes: every consumer re-renders when the provider's `value` changes identity, so avoid passing a fresh object literal each render; memoize it. Split unrelated concerns into separate contexts so a theme change does not re-render user consumers.",
    "interviewLine": "I create a context, wrap the subtree in a Provider, and read it with `useContext`, memoizing the value so I do not needlessly re-render every consumer.",
    "misconception": "Overlooking that each consumer re-renders when the provider value changes, which makes a fresh object value a performance trap.",
    "hints": [
      "Name the three steps the snippet goes through.",
      "Ask how `ThemedButton` gets the theme without a prop.",
      "A fresh object as the value re-renders all consumers."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/useContext",
    "example": {
      "caption": "Notice useContext reads the nearest provider's value with no prop drilling.",
      "language": "tsx",
      "code": "const ThemeCtx = React.createContext('light');\n\nfunction App() { return <ThemeCtx.Provider value=\"dark\"><Button /></ThemeCtx.Provider>; }\nfunction Button() {\n  const theme = React.useContext(ThemeCtx);\n  return <button className={theme}>Save</button>;\n}"
    }
  },
  {
    "id": "react-what-is-the-purpose-of-default-value-in-context",
    "title": "What is the purpose of default value in context?",
    "prompt": "What is the purpose of default value in context?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "const MyContext = React.createContext(defaultValue);",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "The default value passed to `createContext(defaultValue)` is used as a fallback ONLY when a consuming component has no matching `<Provider>` above it in the tree.",
        "isCorrect": true,
        "explanation": "Correct. The default is the fallback used only when a consumer has no matching Provider above it in the tree."
      },
      {
        "id": "B",
        "text": "It sets the background color of the browser window whenever a component consumes the context without a provider.",
        "isCorrect": false,
        "explanation": "`defaultValue` is a fallback data value for consumers, not a window background color."
      },
      {
        "id": "C",
        "text": "It encrypts the context value with AES-256 so only components beneath a matching provider can decrypt and read it.",
        "isCorrect": false,
        "explanation": "It is a plain fallback value in memory, not an encryption step."
      },
      {
        "id": "D",
        "text": "It overrides every provider's value in production builds, so the default always wins once the app is deployed.",
        "isCorrect": false,
        "explanation": "A Provider's `value` always wins when present; the default never overrides it."
      }
    ],
    "correctAnswer": "A",
    "explanation": "The `defaultValue` passed to `createContext(defaultValue)` is used only when a consumer has no matching `<Provider>` above it in the tree. When a provider is present, consumers always get the provider's `value`; the default is a fallback for the no-provider case.\n\nThis is handy for testing a component in isolation (no provider wrapper needed) and for defining sensible defaults so a stray consumer does not crash. The snippet declares a default theme used only when unwrapped.\n\nThe nuance an interviewer probes: a common bug is expecting the default to apply inside a provider—it never does. If you render a consumer outside any provider by accident, you silently get the default instead of an error, so a default of `undefined` with a type-guarded hook can make missing providers fail loudly.",
    "interviewLine": "I describe the context default as a fallback used only when a consumer has no provider above it, which I find useful for isolated tests but can silently mask a forgotten provider.",
    "misconception": "Expecting the default value to apply even under a provider, when it only fills in when no provider exists above the consumer.",
    "hints": [
      "Ask when the default actually takes effect.",
      "Think about a consumer rendered without a provider.",
      "A provider's value always wins when present."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/useContext",
    "example": {
      "caption": "Notice a type-guarded hook turns a missing provider into a loud error.",
      "language": "tsx",
      "code": "const Ctx = React.createContext<{ user: string } | null>(null);\n\nfunction useAuth() {\n  const v = React.useContext(Ctx);\n  if (!v) throw new Error('useAuth must be used within AuthProvider');\n  return v;\n}"
    }
  },
  {
    "id": "react-what-is-a-consumer",
    "title": "What is a consumer?",
    "prompt": "What is a consumer?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "<MyContext.Consumer>\n  {value => /* render something based on the context value */}\n</MyContext.Consumer>",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "A database client that eagerly downloads all of a context's records at once so children can render them synchronously.",
        "isCorrect": false,
        "explanation": "A Consumer subscribes to in-memory context, not a database that downloads records."
      },
      {
        "id": "B",
        "text": "A person who buys products on an e-commerce site, modeled in React as a component that tracks purchase history.",
        "isCorrect": false,
        "explanation": "In React, a Consumer is a context component API, not a shopper on a website."
      },
      {
        "id": "C",
        "text": "A compiler step that minifies CSS files based on which context values the surrounding components happen to read.",
        "isCorrect": false,
        "explanation": "A Consumer renders UI from a context value; it does not minify CSS."
      },
      {
        "id": "D",
        "text": "A React component (`<MyContext.Consumer>{value => <UI data={value} />}</MyContext.Consumer>`) that subscribes to context changes using the render prop pattern.",
        "isCorrect": true,
        "explanation": "Correct. A Consumer is a render-prop component that receives the current context value and returns UI, superseded by `useContext` in function components."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A Consumer is the render-prop component on a context, `<MyContext.Consumer>`, that subscribes to context changes. It takes a function as its child, receives the current context value as the argument, and returns the UI to render. The value equals the nearest matching Provider's `value` above it, or the context default if there is none.\n\nIt was the original way to read context in JSX, including in class components and in multiple places within one render. The snippet shows the render-prop shape.\n\nThe nuance an interviewer probes: in function components `useContext(MyContext)` is the cleaner, now-standard way to consume context; the Consumer render-prop form remains for class components and for reading several contexts without nesting hooks. Like any consumer, it re-renders when the provider value changes.",
    "interviewLine": "I describe a `Context.Consumer` as the render-prop way to read a context value, which I now replace with `useContext` in function components while the Consumer stays useful in classes.",
    "misconception": "Thinking the Consumer is the only way to read context, when `useContext` is the cleaner modern approach for function components.",
    "hints": [
      "Note the function-as-child shape in the snippet.",
      "Ask what argument that function receives.",
      "`useContext` is the modern equivalent."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice useContext replaces the Consumer render-prop in function components.",
      "language": "tsx",
      "code": "const ThemeCtx = React.createContext('light');\n\nfunction Label() {\n  const theme = React.useContext(ThemeCtx); // cleaner than <ThemeCtx.Consumer>\n  return <span className={theme}>Hello</span>;\n}"
    }
  },
  {
    "id": "react-how-to-create-react-class-components-without-es6",
    "title": "How to create react class components without ES6?",
    "prompt": "How to create react class components without ES6?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "var Greeting = createReactClass({\n  getDefaultProps: function () {\n    return {\n      name: 'Jhohn',\n    };\n  },\n  getInitialState: function () {\n    return { message: this.props.message };\n  },\n  handleClick: function () {\n    console.log(this.state.message);\n  },\n  render: function () {\n    return <h1>Hello, {this.props.name}</h1>;\n  },\n});",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Build the component with Microsoft Excel macros that emit the equivalent JavaScript when the workbook is opened.",
        "isCorrect": false,
        "explanation": "`create-react-class` is a JavaScript package, not Excel macros."
      },
      {
        "id": "B",
        "text": "Write the component using PHP `class` statements, which React transpiles into function components at build time.",
        "isCorrect": false,
        "explanation": "React components are written in JavaScript/TypeScript, not PHP classes."
      },
      {
        "id": "C",
        "text": "Use the standalone `create-react-class` package (`var MyComp = createReactClass({ getInitialState: function() { ... }, render: function() { ... } })`).",
        "isCorrect": true,
        "explanation": "Correct. Use the `create-react-class` package with `createReactClass({ getInitialState, render })`, which also auto-binds methods."
      },
      {
        "id": "D",
        "text": "Type the component as raw binary bytecode into the browser console so the engine registers it without a transpiler.",
        "isCorrect": false,
        "explanation": "Non-ES6 components used the `create-react-class` package, not raw bytecode in the console."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Before ES6 classes you created components with the `create-react-class` package: `createReactClass({ getInitialState() {...}, render() {...} })`. It provided `getInitialState` for initial state, `getDefaultProps` for defaults, and crucially auto-bound all methods to the instance, so you never needed `.bind(this)`.\n\nThe snippet shows this factory API. It was how components were written in pre-ES6 environments or without a transpiler.\n\nThe nuance an interviewer probes: `createReactClass` was extracted from React core and is deprecated. The behavioral difference people miss is auto-binding—ES6 class methods are not auto-bound, which is why class components need `bind` or arrow fields. Modern code uses function components and hooks, sidestepping both.",
    "interviewLine": "I'd explain that without ES6 you used `create-react-class` with `getInitialState` and auto-bound methods; ES6 classes dropped the auto-binding, which is why they need `bind` or arrow fields.",
    "misconception": "Forgetting that `createReactClass` auto-bound methods, a behavior ES6 classes dropped, which is why classes need manual binding.",
    "hints": [
      "Name the package that predates ES6 class components.",
      "Ask what binding behavior it gave you for free.",
      "ES6 classes do not auto-bind methods."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/reference/react/Component",
    "example": {
      "caption": "Notice the modern equivalent is just a function component.",
      "language": "tsx",
      "code": "// create-react-class is legacy; modern React uses function components:\nfunction Greeting({ name }: { name: string }) {\n  const [message] = useState('hi');\n  return <h1>{message}, {name}</h1>;\n}"
    }
  },
  {
    "id": "react-what-is-formik",
    "title": "What is formik?",
    "prompt": "What is formik?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A database management tool that stores form submissions on disk and replaces PostgreSQL for application data.",
        "isCorrect": false,
        "explanation": "Formik is a client-side React form library, not a database tool."
      },
      {
        "id": "B",
        "text": "A hardware keyboard tester that verifies each key registers correctly before a React form accepts input.",
        "isCorrect": false,
        "explanation": "Formik is a JavaScript npm package, not a hardware keyboard tester."
      },
      {
        "id": "C",
        "text": "An open-source form library for React that manages form state values, synchronous/asynchronous validation (with Yup/Zod), error messages, and form submissions with minimal boilerplate.",
        "isCorrect": true,
        "explanation": "Correct. Formik is a React form library managing values, validation (with Yup/Zod), errors, and submission with less boilerplate."
      },
      {
        "id": "D",
        "text": "A CSS stylesheet preprocessor, similar to Sass, that compiles form styles into static classes at build time.",
        "isCorrect": false,
        "explanation": "Formik manages form state and validation, not CSS compilation."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Formik is a React form library that handles the three recurring form problems: getting values in and out of form state, validation and error messages, and submission. You wrap a form in `<Formik>` with `initialValues` and an `onSubmit`, and use `<Field>`/`<Form>` or render props to wire inputs.\n\nIt reduces the manual state wiring forms usually need, and integrates with schema validators like Yup for declarative rules. It made controlled React forms far less boilerplate-heavy.\n\nThe nuance an interviewer probes: Formik is controlled, so it re-renders on each keystroke, which can lag on very large forms. React Hook Form, which keeps inputs uncontrolled and subscribes selectively, is the more performant modern alternative; Formik remains popular and perfectly fine for typical forms.",
    "interviewLine": "Formik manages form values, validation, and submission with far less boilerplate, though it is controlled and re-renders per keystroke, so I prefer React Hook Form for very large forms.",
    "misconception": "Assuming Formik is the most performant choice, when its controlled model re-renders per keystroke and React Hook Form scales better.",
    "hints": [
      "Name the three form problems a form library solves.",
      "Ask how Formik handles input values.",
      "Its controlled model re-renders on each keystroke."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice Formik centralizes values, submission, and validation wiring.",
      "language": "tsx",
      "code": "import { Formik, Form, Field } from 'formik';\n\nfunction Login() {\n  return (\n    <Formik initialValues={{ email: '' }} onSubmit={(v) => console.log(v)}>\n      <Form><Field name=\"email\" /></Form>\n    </Formik>\n  );\n}"
    }
  },
  {
    "id": "react-what-is-mobx",
    "title": "What is MobX?",
    "prompt": "What is MobX?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "npm install mobx, save\nnpm install mobx-react: save",
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "A state management library based on Transparent Functional Reactive Programming (TFRP) using observable state, computed values, and actions to auto-track and re-render components on mutation.",
        "isCorrect": true,
        "explanation": "Correct. MobX uses observable state, computed values, and actions to auto-track dependencies and re-render only components that read changed observables."
      },
      {
        "id": "B",
        "text": "A mobile smartphone operating system whose SDK ships a React binding for building native application screens.",
        "isCorrect": false,
        "explanation": "MobX is a JavaScript reactive state library, not a mobile operating system."
      },
      {
        "id": "C",
        "text": "A CSS styling framework that replaces Tailwind by generating utility classes from a component's observable state.",
        "isCorrect": false,
        "explanation": "MobX manages application state reactively, not CSS styling."
      },
      {
        "id": "D",
        "text": "A database engine that stores application data on magnetic tape and exposes it to React through an observable API.",
        "isCorrect": false,
        "explanation": "MobX is an in-memory reactive container, not a magnetic-tape database engine."
      }
    ],
    "correctAnswer": "A",
    "explanation": "MobX is a state-management library built on transparent functional reactive programming. You declare observable state, computed values derived from it, and actions that mutate it; MobX automatically tracks which observables each reaction (or `observer` component) reads and re-runs only those that depend on changed values.\n\nUnlike Redux, MobX embraces direct mutation—you just assign to an observable—and the tracking figures out what to update. This is less boilerplate for many apps, at the cost of less explicit data flow than reducers.\n\nThe nuance an interviewer probes: reactivity depends on reading observables inside a tracked context (`observer`, `autorun`, `reaction`). Reading an observable outside tracking forms no subscription, and destructuring an observable can detach a value from its reactivity, which is a common source of 'why didn't it update' bugs.",
    "interviewLine": "MobX lets me mutate observable state directly and auto-tracks which `observer` components read it, re-rendering only those—so I just make sure reads happen inside a tracked context.",
    "misconception": "Thinking MobX reactivity is automatic everywhere, when it only tracks observables read inside a tracked context like an `observer` component.",
    "hints": [
      "Name the three MobX building blocks.",
      "Ask how MobX knows which components to re-render.",
      "Reading an observable outside tracking forms no subscription."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/choosing-the-state-structure",
    "example": {
      "caption": "Notice the observer re-renders only because it reads the observable during render.",
      "language": "tsx",
      "code": "import { makeAutoObservable } from 'mobx';\nimport { observer } from 'mobx-react-lite';\n\nclass Store { n = 0; constructor() { makeAutoObservable(this); } inc() { this.n++; } }\nconst store = new Store();\nexport const View = observer(() => <button onClick={() => store.inc()}>{store.n}</button>);"
    }
  },
  {
    "id": "react-what-is-the-difference-between-imperative-and-declarati",
    "title": "What is the difference between Imperative and Declarative in React?",
    "prompt": "What is the difference between Imperative and Declarative in React?",
    "level": "junior",
    "type": "concept",
    "category": "react",
    "subject": "state-management",
    "tags": [
      "react",
      "state-management",
      "junior"
    ],
    "codeSnippet": "if (user.likes()) {\n  if (hasBlue()) {\n    removeBlue();\n    addGrey();\n  } else {\n    removeGrey();\n    addBlue();\n  }\n}\n\nif (this.state.liked) {\n  return <blueLike />;\n} else {\n  return <greyLike />;\n}",
    "codeLanguage": "tsx",
    "options": [
      {
        "id": "A",
        "text": "Declarative programming was banned in 2015, so React apps must describe every DOM mutation imperatively by hand each time.",
        "isCorrect": false,
        "explanation": "Declarative UI is the dominant modern paradigm; it was not banned."
      },
      {
        "id": "B",
        "text": "Imperative code describes the DOM mutation steps to perform; declarative code describes the UI for a state and React applies it.",
        "isCorrect": true,
        "explanation": "Correct. Imperative code specifies the DOM mutation steps; declarative code describes the UI for a given state and lets React apply the changes."
      },
      {
        "id": "C",
        "text": "Imperative code runs in the browser while declarative code runs on the GPU, which is why declarative UI renders faster.",
        "isCorrect": false,
        "explanation": "Both run in JavaScript; declarative simply abstracts away the manual DOM mutations."
      },
      {
        "id": "D",
        "text": "There is no difference between the two styles; imperative and declarative are exact duplicates with different names.",
        "isCorrect": false,
        "explanation": "They differ fundamentally: one describes transitions, the other describes target state. They are not duplicates."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Imperative code spells out the step-by-step DOM mutations: check current state, add this class, remove that one. Declarative code describes what the UI should look like for a given state and lets React compute the mutations. The snippet contrasts manual `removeBlue()/addGrey()` logic with simply returning `<blueLike />` or `<greyLike />` based on `liked`.\n\nReact is declarative: you return UI as a function of state, and React diffs and applies the minimal DOM changes. You never undo the previous state's DOM yourself, which is where imperative code gets tangled.\n\nThe nuance an interviewer probes: declarative does not mean no imperative code exists—React performs the imperative mutations under the hood, and you still drop to imperative DOM work via refs for focus, measurement, or integrating non-React widgets. The win is that your component describes the target state, not the transition.",
    "interviewLine": "I contrast imperative code, which lists the DOM steps to mutate, with declarative code, which describes the UI for the current state and lets React diff and apply the minimal changes.",
    "misconception": "Thinking declarative means no imperative work happens, when React performs the imperative mutations for you from your state description.",
    "hints": [
      "Compare the manual class toggling with returning the right element.",
      "Ask who computes the DOM mutations in each style.",
      "Declarative still runs imperative work underneath."
    ],
    "source": "300-react",
    "estimatedMinutes": 2,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the component declares the target UI; React handles the DOM transition.",
      "language": "tsx",
      "code": "function LikeButton({ liked, onToggle }: { liked: boolean; onToggle: () => void }) {\n  // declarative: describe the UI for the state, no manual add/removeClass\n  return <button onClick={onToggle}>{liked ? '❤ Liked' : '♡ Like'}</button>;\n}"
    }
  },
  {
    "id": "system_design-what-is-frontend-system-design-how-is-it-different-from",
    "title": "What is Frontend System Design? How is it different from backend system design?",
    "prompt": "What is Frontend System Design? How is it different from backend system design?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Frontend System Design is limited strictly to graphic design, CSS animations, and visual styling mockups.",
        "isCorrect": false,
        "explanation": "Frontend system design is architecture—data flow, state, caching, performance—not graphic design or CSS mockups."
      },
      {
        "id": "B",
        "text": "Frontend System Design is exclusively about database schema normalization and API gateway routing algorithms.",
        "isCorrect": false,
        "explanation": "Schema normalization and API gateways are backend distributed-systems concerns, not frontend UI architecture."
      },
      {
        "id": "C",
        "text": "Frontend System Design focuses on designing scalable UI architectures, managing component lifecycles, state boundaries, asset pipelines, and client performance.",
        "isCorrect": true,
        "explanation": "Correct. It designs scalable client architectures: component structure, state boundaries, rendering strategy, asset pipelines, and client performance."
      },
      {
        "id": "D",
        "text": "Frontend System Design is only relevant when building native mobile apps in Swift or Kotlin.",
        "isCorrect": false,
        "explanation": "Frontend system design spans all web platforms and SPA/SSR architectures, not only native Swift or Kotlin apps."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Frontend system design is architecting the client: component hierarchy, state boundaries, rendering strategy, data fetching and caching, bundle and asset pipelines, performance, accessibility, and security on the browser side. It is software architecture, not visual mockups.\n\nIt differs from backend system design in what you optimize and constrain. Backend design centers on servers, databases, APIs, and distributed consistency; frontend design centers on the user's device and network—minimizing bytes and main-thread work, choosing where to render (CSR/SSR/SSG/ISR), and deciding what state is server, URL, global, or local.\n\nThe senior nuance an interviewer wants: a structured method. Frameworks like RADIO (Requirements, Architecture, Data model, Interface, Optimizations) force you to state constraints before jumping to code, so your design is driven by targets like FCP and offline support rather than by component trivia.",
    "interviewLine": "Frontend system design is architecting the client—state boundaries, rendering strategy, caching, and performance under device and network constraints—and I structure it with RADIO so requirements drive the design.",
    "misconception": "Equating frontend system design with visual design, when it is client-side software architecture driven by device and network constraints.",
    "hints": [
      "Separate client architecture from visual design.",
      "Ask what the frontend optimizes that the backend does not.",
      "A structured framework beats listing component trivia."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice categorizing state up front is a core frontend-design decision.",
      "language": "typescript",
      "code": "// State taxonomy drives the architecture\ntype StateKind = 'server' | 'url' | 'global' | 'local';\nconst feedPosts: StateKind = 'server'; // cache via React Query\nconst activeTab: StateKind = 'url';    // shareable, bookmarkable\nconst theme: StateKind = 'global';     // context/store\nconst dropdownOpen: StateKind = 'local';"
    }
  },
  {
    "id": "system_design-how-do-you-approach-component-architecture-in-a-large-s",
    "title": "How do you approach component architecture in a large-scale application?",
    "prompt": "How do you approach component architecture in a large-scale application?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior",
      "hooks"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Hardcode all styles and business logic inside single monolithic page files to avoid import overhead.",
        "isCorrect": false,
        "explanation": "Monolithic page files block reuse, testing, and parallel work; split into focused components instead."
      },
      {
        "id": "B",
        "text": "Structure components via hierarchical composition (e.g. Atomic Design), enforce single responsibility, separate UI from container logic, and colocate related assets.",
        "isCorrect": true,
        "explanation": "Correct. Compose hierarchically (e.g. Atomic Design), enforce single responsibility, separate UI from logic, and colocate related assets."
      },
      {
        "id": "C",
        "text": "Wrap every single UI element in its own global Redux connected container with full network dispatching logic.",
        "isCorrect": false,
        "explanation": "Connecting every atom to global state couples the whole tree and kills reusability and performance."
      },
      {
        "id": "D",
        "text": "Place all components in a single flat directory with global inheritance from a master BaseComponent class.",
        "isCorrect": false,
        "explanation": "React favors composition over inheritance; a flat directory with a master base class becomes unmaintainable."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Structure components by composition and responsibility. A layered scheme like Atomic Design (atoms, molecules, organisms, templates, pages) builds complex UI from simple pieces, each with a single responsibility. Separate presentational components from container/logic components, and colocate a component's styles, tests, and stories with it.\n\nThis scales teams and refactors: small, focused components are reusable and testable, and clear boundaries let teams work in parallel. A sensible folder structure (shared `ui`, feature folders, hooks, lib) keeps the system navigable as it grows.\n\nThe senior nuance an interviewer wants: favor composition over inheritance, and avoid two extremes—monolithic page files that bundle everything, and over-connecting every atom to global state, which destroys reusability. Push data access to the edges (containers, hooks) and keep leaf components dumb.",
    "interviewLine": "I compose UI from small single-responsibility components, separate presentational from container logic, and keep data access at the edges so leaf components stay dumb and reusable.",
    "misconception": "Reaching for inheritance or global-connecting every component, when scalable architecture is composition, single responsibility, and dumb leaf components.",
    "hints": [
      "Think in layers from atoms up to pages.",
      "Ask what keeps leaf components reusable.",
      "Composition beats inheritance; dumb leaves beat global-connected atoms."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the container owns data while the presentational leaf stays dumb.",
      "language": "tsx",
      "code": "// container: owns data\nfunction UserCardContainer({ id }: { id: string }) {\n  const user = useUser(id);\n  return <UserCard name={user.name} avatar={user.avatar} />;\n}\n// presentational: pure, reusable\nfunction UserCard({ name, avatar }: { name: string; avatar: string }) {\n  return <figure><img src={avatar} alt={name} /><figcaption>{name}</figcaption></figure>;\n}"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-scalable-data-fetching-and-caching",
    "title": "How do you design a scalable data fetching and caching layer?",
    "prompt": "How do you design a scalable data fetching and caching layer?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Disable all caching and force a hard page reload on every single user mutation.",
        "isCorrect": false,
        "explanation": "Hard reloads destroy perceived performance and negate the SPA; the goal is background revalidation, not full reloads."
      },
      {
        "id": "B",
        "text": "Implement stale-while-revalidate caching, request deduplication, optimistic updates with error rollback, and explicit stale/garbage-collection time controls.",
        "isCorrect": true,
        "explanation": "Correct. Use stale-while-revalidate caching with request dedup, optimistic updates with rollback, and explicit stale/gc controls."
      },
      {
        "id": "C",
        "text": "Execute a raw `fetch` call inside every component's render body without `useEffect` or caching abstractions.",
        "isCorrect": false,
        "explanation": "Fetching in the render body loops and blocks reconciliation; fetching belongs in a cache-backed hook."
      },
      {
        "id": "D",
        "text": "Cache all API responses permanently in `localStorage` without TTL or invalidation mechanisms.",
        "isCorrect": false,
        "explanation": "Permanent uncontrolled caching yields stale data and quota errors; freshness needs TTLs and invalidation."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Build the data layer around a cache that deduplicates requests, revalidates in the background, and exposes explicit freshness controls. A library like TanStack Query or SWR keys each query, shares one in-flight request across all callers, serves cached data instantly, and refetches when data is stale or the window refocuses.\n\nFor mutations, apply optimistic updates: write the expected result to the cache immediately, then roll back if the server rejects. Tune `staleTime` (how long data is fresh) and `gcTime` (how long unused data lingers) per query so prices refetch aggressively while a user profile stays cached.\n\nThe senior nuance an interviewer wants: name the ownership and invalidation story. Server state is not client state—let the cache own it, invalidate by query key after mutations, and decide what the user sees while data is stale (cached value with a background refresh beats a spinner).",
    "interviewLine": "I let a query cache own server state—dedup in-flight requests, serve stale-while-revalidate, tune staleTime per query, and do optimistic updates with rollback keyed by query id.",
    "misconception": "Treating server data like client state you fetch ad hoc, when a cache should own it with dedup, background revalidation, and keyed invalidation.",
    "hints": [
      "Ask who owns server state and when it is invalidated.",
      "Think about what the user sees while data is stale.",
      "Fetching in render is the trap."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/caching",
    "example": {
      "caption": "Notice per-query staleTime tunes freshness to the data's volatility.",
      "language": "typescript",
      "code": "import { useQuery } from '@tanstack/react-query';\n\nuseQuery({ queryKey: ['profile'], queryFn: getProfile, staleTime: Infinity }); // rarely changes\nuseQuery({ queryKey: ['price'], queryFn: getPrice, staleTime: 0 });           // always fresh"
    }
  },
  {
    "id": "system_design-design-an-autocomplete-typeahead-search-component-n-ans",
    "title": "Design an autocomplete / typeahead search component",
    "prompt": "Design an autocomplete / typeahead search component",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Download the entire backend database to `sessionStorage` on page mount and perform regex scans on the client.",
        "isCorrect": false,
        "explanation": "Downloading the whole dataset to the client is insecure and blows up memory; search belongs on the server."
      },
      {
        "id": "B",
        "text": "Debounce input events (~300ms), cancel stale in-flight requests (AbortController), cache previous query results, and provide WAI-ARIA combobox accessibility.",
        "isCorrect": true,
        "explanation": "Correct. Debounce input, cancel stale requests, cache per query, and implement the ARIA combobox pattern with keyboard navigation."
      },
      {
        "id": "C",
        "text": "Use native browser `alert()` dialogs to display search suggestions to the user.",
        "isCorrect": false,
        "explanation": "`alert()` dialogs block the thread and are terrible UX for suggestions."
      },
      {
        "id": "D",
        "text": "Trigger an immediate blocking network fetch on every single `keydown` event without throttling or caching.",
        "isCorrect": false,
        "explanation": "Fetching on every keystroke without throttling causes race conditions and out-of-order result bugs."
      }
    ],
    "correctAnswer": "B",
    "explanation": "An autocomplete must stay responsive while hitting the network sensibly. Debounce the input (~300ms) so you query after the user pauses, enforce a minimum query length, cache results per query so repeats are free, and cancel the previous in-flight request (AbortController) so out-of-order responses cannot overwrite newer ones.\n\nOn top of performance, it must be accessible: implement the WAI-ARIA combobox pattern (`role=combobox`/`listbox`, `aria-expanded`, `aria-activedescendant`) and full keyboard control—arrow keys to move, Enter to select, Escape to close.\n\nThe senior nuance an interviewer wants: the race-condition story. Without cancellation, a slow response to an old query can land after a fast response to a new one, showing stale results; aborting stale requests (or ignoring their responses) is what keeps the dropdown correct.",
    "interviewLine": "I debounce the input, abort the previous request so stale responses can't overwrite newer ones, cache per query, and wire up the ARIA combobox pattern with keyboard navigation.",
    "misconception": "Fetching on each keystroke without cancellation, which lets a slow stale response overwrite results for the newer query.",
    "hints": [
      "Think about what happens between keystrokes and across responses.",
      "Ask how an old slow response could overwrite a new one.",
      "Accessibility means the combobox pattern and keyboard control."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice aborting the prior request prevents out-of-order results.",
      "language": "typescript",
      "code": "let controller: AbortController | null = null;\nasync function search(q: string) {\n  controller?.abort();\n  controller = new AbortController();\n  return fetch(`/api/search?q=${q}`, { signal: controller.signal }).then((r) => r.json());\n}"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-real-time-notification-system-on-th",
    "title": "How do you design a real-time notification system on the frontend?",
    "prompt": "How do you design a real-time notification system on the frontend?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Poll the backend API every 10 milliseconds using a synchronous `while(true)` loop on the main thread.",
        "isCorrect": false,
        "explanation": "A synchronous `while(true)` loop blocks the event loop and freezes the UI; this cannot work."
      },
      {
        "id": "B",
        "text": "Store incoming notifications strictly in volatile DOM element attributes without any React state or storage.",
        "isCorrect": false,
        "explanation": "DOM-attribute storage is non-reactive and wiped on re-render; notifications need state plus persistence."
      },
      {
        "id": "C",
        "text": "Send push notifications through client-to-client peer-to-peer WebRTC without any backend signaling or auth server.",
        "isCorrect": false,
        "explanation": "WebRTC still needs signaling and auth and is overkill for one-way server push."
      },
      {
        "id": "D",
        "text": "Use Server-Sent Events (SSE) or WebSockets with auto-reconnection, optimistic toast display, unread badge counters, and background cache invalidation.",
        "isCorrect": true,
        "explanation": "Correct. Use SSE or WebSockets with auto-reconnect, optimistic toasts, unread badges, and cache invalidation, reconciling missed events on reconnect."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Pick the transport by communication shape. Notifications are one-way server-to-client, which fits Server-Sent Events (SSE): a single long-lived HTTP connection with built-in auto-reconnect, simpler than WebSockets. Use WebSockets when you need bidirectional, low-latency exchange like chat. On receipt, show a toast, update an unread badge, and invalidate the relevant cache so the notification center stays in sync.\n\nReliability is the hard part: reconnect on drop, and on reconnect fetch any notifications missed while offline so the client converges with the server.\n\nThe senior nuance an interviewer wants: name the connection-drop and ordering story. SSE auto-reconnects and can resume with `Last-Event-ID`; you still need to reconcile missed events and dedupe, because a reconnect can replay or gap. Polling is the universal fallback when persistent connections are unavailable.",
    "interviewLine": "For one-way notifications I use SSE for its auto-reconnect, show a toast and bump the unread badge, and on reconnect fetch missed events with Last-Event-ID so the client reconciles with the server.",
    "misconception": "Choosing a transport without a reconnect-and-reconcile plan, so dropped connections silently lose or duplicate notifications.",
    "hints": [
      "Ask whether the data flows one way or both.",
      "Think about what happens when the connection drops.",
      "A blocking poll loop is the wrong approach."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    "example": {
      "caption": "Notice SSE auto-reconnects and can resume from the last event id.",
      "language": "typescript",
      "code": "const es = new EventSource('/api/notifications/stream');\nes.addEventListener('notification', (e) => {\n  const n = JSON.parse(e.data);\n  showToast(n.message); // browser retries + Last-Event-ID resume on drop\n});"
    }
  },
  {
    "id": "system_design-how-do-you-handle-file-uploads-in-a-frontend-system-at",
    "title": "How do you handle file uploads in a frontend system at scale?",
    "prompt": "How do you handle file uploads in a frontend system at scale?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Base64-encode large multi-gigabyte video files and send them inside a single JSON REST query string.",
        "isCorrect": false,
        "explanation": "Base64 inflates payloads ~33% and blows past URL length limits; use binary direct upload."
      },
      {
        "id": "B",
        "text": "Upload files by writing them directly to the client machine's root operating system filesystem via browser JS.",
        "isCorrect": false,
        "explanation": "Browsers are sandboxed and cannot write to the host filesystem; uploads go to cloud storage."
      },
      {
        "id": "C",
        "text": "Request a short-lived S3/Cloud presigned URL from the backend, upload directly from the browser with `XMLHttpRequest`/`fetch` progress tracking, and validate size/MIME types.",
        "isCorrect": true,
        "explanation": "Correct. Request a short-lived presigned URL, upload directly to cloud storage with progress tracking, and validate size/MIME first."
      },
      {
        "id": "D",
        "text": "Block all UI interaction with a modal spinner and disallow cancellation or background chunking.",
        "isCorrect": false,
        "explanation": "Good UX requires non-blocking uploads with cancellation and chunked retries, not a blocking modal."
      }
    ],
    "correctAnswer": "C",
    "explanation": "At scale, do not funnel large files through your application server. Have the frontend request a short-lived presigned URL from your backend, then upload the file directly to cloud storage (S3) from the browser, tracking progress via `XMLHttpRequest`'s upload progress events or `fetch` streams. Validate size and MIME type before starting.\n\nThis keeps your server out of the byte path, so it is not bottlenecked on memory or bandwidth, and gives the user real progress, cancellation, and retry. For very large files, chunk and upload parts (resumable/multipart) so an interrupted upload can resume.\n\nThe senior nuance an interviewer wants: client validation is UX, not security—the backend must still enforce type, size, and auth, and the presigned URL should be scoped and expiring. Cancellation (abort) and retry/backoff are what make uploads robust on flaky networks.",
    "interviewLine": "I upload large files straight to cloud storage via a short-lived presigned URL with progress and cancellation, validating client-side for UX while the backend still enforces type, size, and auth.",
    "misconception": "Routing large uploads through the app server, when presigned direct-to-cloud uploads keep the server out of the byte path.",
    "hints": [
      "Ask who should carry the actual file bytes.",
      "Think about progress, cancellation, and resuming.",
      "Client validation is UX; the server must still enforce it."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice the browser uploads directly to the presigned URL, bypassing the app server.",
      "language": "typescript",
      "code": "async function upload(file: File) {\n  const { url, key } = await fetch('/api/presign', {\n    method: 'POST', body: JSON.stringify({ type: file.type }),\n  }).then((r) => r.json());\n  await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });\n  return key;\n}"
    }
  },
  {
    "id": "system_design-explain-react-rendering-optimisation-227-memo-usememo-u",
    "title": "Explain React rendering optimisation, memo, useMemo, useCallback",
    "prompt": "Explain React rendering optimisation, memo, useMemo, useCallback",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Use `useCallback` to make asynchronous HTTP network requests run faster on the network wire.",
        "isCorrect": false,
        "explanation": "`useCallback` memoizes function references in memory; it has no effect on network latency."
      },
      {
        "id": "B",
        "text": "Replace React's virtual DOM reconciliation with direct imperative `document.getElementById` mutations in event handlers.",
        "isCorrect": false,
        "explanation": "Bypassing reconciliation with manual DOM mutations breaks declarative state sync and causes subtle bugs."
      },
      {
        "id": "C",
        "text": "Use `React.memo` to skip re-renders when props are shallow-equal, `useCallback` for stable function references, and `useMemo` for expensive computations.",
        "isCorrect": true,
        "explanation": "Correct. `React.memo` skips re-renders on shallow-equal props, `useCallback` stabilizes function references, and `useMemo` caches expensive computations."
      },
      {
        "id": "D",
        "text": "Wrap every single JSX primitive (`<div>`, `<span>`) and inline constant in `useMemo` throughout the entire codebase.",
        "isCorrect": false,
        "explanation": "Memoizing every primitive adds comparison and memory overhead that exceeds the cost of a cheap render."
      }
    ],
    "correctAnswer": "C",
    "explanation": "React re-renders a component when its state or props change, or when its parent re-renders. The optimization tools are complementary: `React.memo` skips a component's re-render when its props are shallow-equal; `useCallback` keeps a function prop's reference stable across renders; `useMemo` caches an expensive computed value so it recomputes only when inputs change.\n\nThey work together: memoizing a child is pointless if the parent passes a new function or object prop every render, which is why `useCallback`/`useMemo` provide the stable references the `memo` comparison relies on.\n\nThe senior nuance an interviewer wants: these trade comparison cost and memory for skipped work, so they only pay off when the computation or subtree is genuinely expensive and inputs are genuinely stable. Over-memoizing every primitive adds overhead; profile first, and remember the React Compiler is automating much of this.",
    "interviewLine": "`React.memo` skips re-renders on shallow-equal props, and `useCallback`/`useMemo` supply the stable references it compares against—so I only apply them where the subtree or computation is genuinely expensive.",
    "misconception": "Memoizing indiscriminately, when memo only helps if props are stable and the skipped work is actually expensive.",
    "hints": [
      "Ask what makes a component re-render in the first place.",
      "Think about why memo needs stable prop references.",
      "Memoizing everything can cost more than it saves."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/useMemo",
    "example": {
      "caption": "Notice the memoized child only skips re-renders because the callback reference is stable.",
      "language": "tsx",
      "code": "const Row = React.memo(({ onPick }: { onPick: () => void }) => <button onClick={onPick}>Pick</button>);\n\nfunction List() {\n  const onPick = useCallback(() => console.log('picked'), []); // stable ref makes memo work\n  return <Row onPick={onPick} />;\n}"
    }
  },
  {
    "id": "system_design-how-do-you-handle-authentication-and-authorization-on-t",
    "title": "How do you handle authentication and authorization on the frontend?",
    "prompt": "How do you handle authentication and authorization on the frontend?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Encode user admin permissions in unencrypted public URL hash fragments (`#role=admin`).",
        "isCorrect": false,
        "explanation": "URL hash fragments are user-editable and provide zero security for permissions."
      },
      {
        "id": "B",
        "text": "Store tokens in `HttpOnly`, `Secure`, `SameSite` cookies (or short-lived memory access tokens with refresh rotation), and enforce route guards and RBAC checks.",
        "isCorrect": true,
        "explanation": "Correct. Use HttpOnly/Secure/SameSite cookies (or short-lived in-memory tokens with refresh), plus route guards and RBAC checks."
      },
      {
        "id": "C",
        "text": "Save the user's plaintext password in `localStorage` and transmit it on every API call header.",
        "isCorrect": false,
        "explanation": "Storing plaintext passwords in `localStorage` exposes them to any XSS and violates basic security."
      },
      {
        "id": "D",
        "text": "Rely purely on client-side route guards without verifying JWT permissions on backend endpoints.",
        "isCorrect": false,
        "explanation": "Client guards are cosmetic; the backend must verify auth and permissions on every endpoint."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Store credentials where scripts cannot read them. Prefer `HttpOnly`, `Secure`, `SameSite` cookies for tokens so XSS cannot exfiltrate them, or keep a short-lived access token in memory with a refresh-token rotation. Avoid `localStorage` for tokens—any injected script can read it. Add client route guards and role-based checks to gate navigation.\n\nIn practice you validate the session on load (the server reads the cookie), redirect unauthenticated users, and conditionally render admin UI by role. `SameSite` cookies also blunt CSRF for same-site requests.\n\nThe senior nuance an interviewer wants: client-side guards are cosmetic. Every protected API must independently enforce authentication and authorization, because a user can bypass any client check. The frontend improves UX; the server is the security boundary.",
    "interviewLine": "I keep tokens in HttpOnly cookies or short-lived memory with refresh rotation and add route guards for UX, but I treat the backend as the real boundary since any client check can be bypassed.",
    "misconception": "Trusting client-side route guards for security, when they are UX-only and the server must enforce auth on every request.",
    "hints": [
      "Ask what can read a token in each storage option.",
      "Think about who truly enforces authorization.",
      "Client guards improve UX, not security."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://developer.mozilla.org/en-US/docs/Web/Security",
    "example": {
      "caption": "Notice the client never sees the token; the server reads the HttpOnly cookie.",
      "language": "typescript",
      "code": "// Login: server sets an HttpOnly cookie, JS cannot read it\nawait fetch('/auth/login', { method: 'POST', credentials: 'include', body: creds });\n// Session check on load\nconst me = await fetch('/auth/me', { credentials: 'include' }).then((r) => r.json());"
    }
  },
  {
    "id": "system_design-how-do-you-design-an-accessible-component-library-n-ans",
    "title": "How do you design an accessible component library?",
    "prompt": "How do you design an accessible component library?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Hardcode all icon buttons without `aria-label` or visually hidden accessible text.",
        "isCorrect": false,
        "explanation": "Icon-only buttons without labels are announced as unlabelled; add `aria-label` or visually hidden text."
      },
      {
        "id": "B",
        "text": "Replace all native `<button>` and `<input>` tags with clickable `<div>` elements without `tabIndex` or keyboard handlers.",
        "isCorrect": false,
        "explanation": "Clickable `<div>`s lack keyboard access, focus, and roles; use native semantic elements."
      },
      {
        "id": "C",
        "text": "Set `outline: none` globally across all `:focus` CSS states without providing custom focus rings.",
        "isCorrect": false,
        "explanation": "Removing focus outlines globally without a replacement makes keyboard navigation impossible."
      },
      {
        "id": "D",
        "text": "Adhere to WAI-ARIA authoring practices, maintain keyboard focus management/trapping, ensure 4.5:1 color contrast, and test with screen readers (NVDA/VoiceOver).",
        "isCorrect": true,
        "explanation": "Correct. Follow WAI-ARIA practices, manage focus and trapping, ensure 4.5:1 contrast, and test with screen readers and axe-core."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Design for accessibility from the primitives up. Use semantic HTML (`<button>`, `<input>`) rather than clickable `<div>`s, follow WAI-ARIA authoring practices for roles and states, manage focus (visible focus rings, focus trapping in modals, logical tab order), ensure at least 4.5:1 text contrast, and label icon-only controls. Then verify with screen readers (NVDA/VoiceOver) and automated checks like axe-core.\n\nBuilding this into the library means every consumer gets accessible behavior by default instead of bolting it on per app.\n\nThe senior nuance an interviewer wants: ARIA supplements semantics, it does not replace them—a native `<button>` beats a `<div role=button>` because it brings keyboard and focus behavior for free. And never remove focus outlines without providing a visible replacement, or keyboard users lose their place.",
    "interviewLine": "I build on semantic HTML, follow WAI-ARIA for roles and focus management, hit 4.5:1 contrast, and verify with axe-core and a screen reader, since ARIA supplements semantics rather than replacing them.",
    "misconception": "Treating ARIA as a substitute for semantic HTML, when native elements provide keyboard and focus behavior that ARIA alone does not.",
    "hints": [
      "Ask why a native button beats a clickable div.",
      "Think about focus visibility and trapping.",
      "ARIA supplements semantic HTML, it does not replace it."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
    "example": {
      "caption": "Notice the native button and aria-label give keyboard and screen-reader support for free.",
      "language": "tsx",
      "code": "function IconButton({ onClick, label }: { onClick: () => void; label: string }) {\n  return (\n    <button onClick={onClick} aria-label={label}>\n      <svg aria-hidden=\"true\" /* decorative */ />\n    </button>\n  );\n}"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-micro-frontend-architecture-n-answe",
    "title": "How do you design a micro-frontend architecture?",
    "prompt": "How do you design a micro-frontend architecture?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Load five different duplicate major versions of React simultaneously inside the same DOM tree without singleton configuration.",
        "isCorrect": false,
        "explanation": "Loading multiple React runtimes bloats the bundle and breaks shared context and hooks; share React as a singleton."
      },
      {
        "id": "B",
        "text": "Require all engineering teams to deploy their changes simultaneously in a single synchronized release branch.",
        "isCorrect": false,
        "explanation": "Requiring synchronized releases defeats micro-frontends' whole point of independent deployability."
      },
      {
        "id": "C",
        "text": "Leverage Webpack 5 Module Federation to dynamically load remote apps at runtime, share singleton dependencies (React), and isolate domain boundaries.",
        "isCorrect": true,
        "explanation": "Correct. Use Module Federation to load remotes at runtime, share singleton dependencies like React, and isolate domain boundaries."
      },
      {
        "id": "D",
        "text": "Embed 50 separate nested `<iframe>` tags that communicate exclusively through polling `localStorage`.",
        "isCorrect": false,
        "explanation": "Dozens of nested iframes have severe performance, accessibility, sizing, and state-sync problems."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Micro-frontends split a large frontend into independently deployable pieces owned by different teams. Webpack 5 Module Federation lets a host load remote apps at runtime from their own deployments, while sharing singleton dependencies (one React instance) and isolating domain boundaries. Teams ship on their own cadence without a coordinated monolith release.\n\nThe payoff is organizational scale and independent deployment; the cost is complexity in shared state, consistent design, and performance.\n\nThe senior nuance an interviewer wants: the hard problems are dependency sharing and when not to use it. You must mark React as a `singleton` so you do not load multiple runtimes that break hooks and context, and for small teams the operational overhead outweighs the benefit—a modular monolith is usually better until the org actually needs independent deploys.",
    "interviewLine": "I use Module Federation to load remotes at runtime with React shared as a singleton, but I only reach for micro-frontends when the org genuinely needs independent deploys, since the overhead hurts small teams.",
    "misconception": "Adopting micro-frontends without a dependency-sharing plan or team scale, which causes duplicate React runtimes and needless overhead.",
    "hints": [
      "Ask what breaks if two React copies load at once.",
      "Think about why independent deployment is the goal.",
      "For small teams the overhead may not be worth it."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/render-and-commit",
    "example": {
      "caption": "Notice React is marked singleton so only one runtime loads across remotes.",
      "language": "javascript",
      "code": "new ModuleFederationPlugin({\n  name: 'host',\n  remotes: { checkout: 'checkout@https://checkout.app.com/remoteEntry.js' },\n  shared: { react: { singleton: true, requiredVersion: '^19' } },\n});"
    }
  },
  {
    "id": "system_design-how-do-you-handle-internationalisation-i18n-and-localis",
    "title": "How do you handle internationalisation (i18n) and localisation (l10n) at scale?",
    "prompt": "How do you handle internationalisation (i18n) and localisation (l10n) at scale?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Hardcode text strings in components and use Google Translate DOM widget injection on client load.",
        "isCorrect": false,
        "explanation": "Client-side translation widgets flicker, break reconciliation, and translate inaccurately."
      },
      {
        "id": "B",
        "text": "Store all language translations for all 50 global languages inside a single monolithic synchronous `main.js` bundle.",
        "isCorrect": false,
        "explanation": "Bundling all languages inflates the payload with data most users never need; load locales on demand."
      },
      {
        "id": "C",
        "text": "Format all currencies and dates with manual string splitting and hardcoded '$' symbols.",
        "isCorrect": false,
        "explanation": "Currency and date formats vary by locale; use `Intl.NumberFormat`/`Intl.DateTimeFormat` rather than hardcoded symbols."
      },
      {
        "id": "D",
        "text": "Extract strings into structured translation dictionaries (e.g. `react-i18next`), split locale bundles on demand, use `Intl` for dates/currencies, and support RTL layouts.",
        "isCorrect": true,
        "explanation": "Correct. Extract keyed translation dictionaries, lazy-load locale bundles, use `Intl` for formatting, and support RTL and plural rules."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Extract user-facing text into translation dictionaries keyed by id (e.g. `react-i18next` or FormatJS), and load only the active locale's bundle on demand rather than shipping every language to every user. Use the native `Intl` APIs for dates, numbers, and currencies so formatting is correct per locale, and support RTL layouts with logical CSS properties.\n\nPluralization and interpolation go through an ICU-style message format, because plural rules differ by language and sentences cannot be assembled by concatenation.\n\nThe senior nuance an interviewer wants: localization is more than string swaps. Number, date, and plural rules change per locale; German text can be ~30% longer, breaking fixed layouts; and RTL mirrors the UI. Build these in from the start, and never construct sentences by gluing fragments, which breaks grammar and plurals.",
    "interviewLine": "I externalize text into keyed dictionaries, lazy-load the active locale, and use `Intl` plus ICU plural rules—never concatenating sentence fragments, since grammar and plurals differ by language.",
    "misconception": "Treating i18n as string replacement, when number/date/plural rules, text expansion, and RTL all change per locale.",
    "hints": [
      "Ask what changes besides the words themselves.",
      "Think about loading only the needed locale.",
      "Concatenating fragments breaks plurals and grammar."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl",
    "example": {
      "caption": "Notice Intl formats currency correctly per locale without hardcoded symbols.",
      "language": "typescript",
      "code": "const price = 1000;\n\n// One source value, formatted per locale with no hardcoded symbols\nfunction formatPrice(locale: string, currency: string): string {\n  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);\n}\n\nformatPrice('de-DE', 'EUR'); // '1.000,00 €'\nformatPrice('en-US', 'USD'); // '$1,000.00'\nformatPrice('ja-JP', 'JPY'); // '￥1,000'"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-design-system-from-scratch-n-answer",
    "title": "How do you design a Design System from scratch?",
    "prompt": "How do you design a Design System from scratch?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "system-architecture",
    "tags": [
      "system_design",
      "system-architecture",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Hardcode hex color codes and arbitrary pixel margins inside every component's inline styles.",
        "isCorrect": false,
        "explanation": "Hardcoded hex and pixel values block central theming like dark mode and break consistency; use tokens."
      },
      {
        "id": "B",
        "text": "Copy random CSS snippets from StackOverflow into global component stylesheets without tokens or consistency.",
        "isCorrect": false,
        "explanation": "Random copied CSS yields specificity wars and inconsistency; a system needs tokens and documented primitives."
      },
      {
        "id": "C",
        "text": "Establish design tokens (colors, spacing, typography) as CSS variables, build composable accessible primitive components, and document variants in Storybook.",
        "isCorrect": true,
        "explanation": "Correct. Establish design tokens as CSS variables, build accessible composable primitives, and document variants in Storybook."
      },
      {
        "id": "D",
        "text": "Create 50 different variations of a Button component named `ButtonPrimaryBlue`, `ButtonPrimaryGreen`, etc.",
        "isCorrect": false,
        "explanation": "Fifty near-duplicate button components is unmaintainable; model variation as props on one component."
      }
    ],
    "correctAnswer": "C",
    "explanation": "A design system is a shared language layered from the bottom up. Design tokens hold primitive values (colors, spacing, typography, shadows), expressed as CSS variables so themes and dark mode flip centrally. On top sit accessible primitive components, then composite components, all documented with their variants in a tool like Storybook.\n\nComponents expose composable props (`variant`, `size`, `color`) rather than duplicating a component per style, and are accessible by default. Tokens plus variants give consistency without a combinatorial explosion of components.\n\nThe senior nuance an interviewer wants: the token layer is what makes theming and consistency scalable—hardcoding hex and pixel values defeats central control. And model variation as props on one component, not fifty near-duplicate components, so the API stays small and the system stays coherent.",
    "interviewLine": "I base the system on design tokens as CSS variables, build accessible primitives that take variant props, and document them in Storybook, so theming is central and variation stays a prop, not a new component.",
    "misconception": "Scaling a design system by adding components per style, when tokens plus variant props give consistency without a component explosion.",
    "hints": [
      "Ask what makes dark mode a one-line change.",
      "Think about variants as props versus duplicate components.",
      "Hardcoded values defeat central theming."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://web.dev/articles/vitals",
    "example": {
      "caption": "Notice one variant prop replaces many duplicate components, driven by tokens.",
      "language": "tsx",
      "code": "type Variant = 'primary' | 'ghost' | 'danger';\n\n// One component, many looks: the variant maps to CSS token-driven classes\nfunction Button({ variant = 'primary', children }: { variant?: Variant; children: React.ReactNode }) {\n  return (\n    <button className={`btn btn-${variant}`} data-variant={variant}>\n      {children}\n    </button>\n  );\n}"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-rich-text-editor-n-answer-rich-text",
    "title": "How do you design a rich text editor?",
    "prompt": "How do you design a rich text editor?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Re-render the entire editor component tree from scratch on every single keystroke without virtual selection state.",
        "isCorrect": false,
        "explanation": "Re-rendering the whole editor each keystroke causes caret jumps and IME bugs; a structured model avoids this."
      },
      {
        "id": "B",
        "text": "Adopt a headless schema-driven editor engine (e.g. TipTap, Lexical, Slate), store structured JSON document state, and sanitize exported HTML.",
        "isCorrect": true,
        "explanation": "Correct. Use a schema-driven headless engine (TipTap, Lexical, Slate), store structured JSON, and sanitize exported HTML."
      },
      {
        "id": "C",
        "text": "Store raw unsanitized user HTML directly in the database without XSS validation or AST parsing.",
        "isCorrect": false,
        "explanation": "Storing unsanitized user HTML is a critical XSS vector; sanitize before storing or rendering."
      },
      {
        "id": "D",
        "text": "Use raw `<div contenteditable>` and rely entirely on `document.execCommand` for all formatting actions.",
        "isCorrect": false,
        "explanation": "`document.execCommand` is deprecated and produces inconsistent cross-browser HTML; avoid it."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Do not hand-roll a rich text editor on `contenteditable` and `document.execCommand`—that API is deprecated and produces inconsistent, buggy HTML across browsers. Instead adopt a schema-driven, headless engine like TipTap/ProseMirror, Lexical, or Slate, which models the document as a structured tree and gives you reliable commands, selection, and extensions.\n\nStore the document as structured JSON rather than raw HTML: it is portable, safer, and decoupled from presentation. When you must output HTML, sanitize it (DOMPurify) before storing or rendering to block XSS.\n\nThe senior nuance an interviewer wants: the document model is the whole game. A structured model avoids caret-jumping and IME bugs that come from re-rendering raw HTML on every keystroke, enables features like mentions and collaboration cleanly, and keeps you off the unreliable `execCommand` path.",
    "interviewLine": "I build on a schema-driven engine like TipTap and store the document as JSON, which avoids the caret and IME bugs of re-rendering raw HTML and keeps me off the deprecated execCommand path.",
    "misconception": "Building on `contenteditable`/`execCommand`, when a structured document model from a dedicated engine is what makes editing reliable.",
    "hints": [
      "Ask why re-rendering raw HTML per keystroke breaks the caret.",
      "Think about storing JSON versus HTML.",
      "`execCommand` is deprecated and inconsistent."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/render-and-commit",
    "example": {
      "caption": "Notice autosave persists portable JSON, not fragile HTML.",
      "language": "typescript",
      "code": "editor.on('update', () => {\n  const doc = editor.getJSON(); // structured, portable, safe to store\n  debouncedSave(doc);\n});"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-data-visualisation-system-n-answer",
    "title": "How do you design a data visualisation system?",
    "prompt": "How do you design a data visualisation system?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Render 500,000 interactive SVG DOM elements simultaneously and attach React `onClick` listeners to each.",
        "isCorrect": false,
        "explanation": "500k SVG nodes overwhelm layout and crash memory; high density needs Canvas or WebGL."
      },
      {
        "id": "B",
        "text": "Disable responsive resizing and render charts with fixed immutable pixel dimensions on all screen sizes.",
        "isCorrect": false,
        "explanation": "Charts must resize responsively via `ResizeObserver`; fixed pixel dimensions break on other screens."
      },
      {
        "id": "C",
        "text": "Recompute heavy statistical regressions synchronously on the main thread on every mouse hover tick.",
        "isCorrect": false,
        "explanation": "Heavy math on the main thread per hover drops frames; memoize or offload to a Web Worker."
      },
      {
        "id": "D",
        "text": "Choose SVG for interactive low-element charts and Canvas/WebGL for 10k+ data points, debouncing resize observers and offloading data processing to Web Workers.",
        "isCorrect": true,
        "explanation": "Correct. Use SVG for low-element interactive charts and Canvas/WebGL for 10k+ points, debouncing resize and offloading processing to workers."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Choose the rendering technology by data density. SVG gives crisp, accessible, inspectable DOM nodes and suits interactive charts under about a thousand elements. Canvas or WebGL is an order of magnitude faster for tens of thousands of points because it rasterizes rather than creating DOM. Make charts responsive via `ResizeObserver`, debounce resize work, and move heavy data processing to a Web Worker so the main thread stays smooth.\n\nAggregate on the server rather than shipping a million rows to the client, and use accessible, colorblind-safe palettes with ARIA for tooltips.\n\nThe senior nuance an interviewer wants: the SVG-versus-Canvas tradeoff is the core decision. SVG buys accessibility and easy interactivity at low element counts; past that, DOM node count tanks layout performance and you must switch to Canvas/WebGL, aggregating data and offloading math to keep frames at 60fps.",
    "interviewLine": "I pick SVG for accessible interactive charts under a thousand elements and switch to Canvas or WebGL for high-density data, aggregating server-side and offloading heavy math to a worker to hold 60fps.",
    "misconception": "Using SVG at any scale, when past ~1k nodes DOM count tanks performance and Canvas/WebGL is required.",
    "hints": [
      "Ask what breaks when you render hundreds of thousands of SVG nodes.",
      "Think about where heavy data processing should run.",
      "The core decision is SVG versus Canvas by density."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice the element count decides the rendering strategy.",
      "language": "typescript",
      "code": "type Renderer = 'svg' | 'canvas' | 'webgl';\n\n// Point count picks the strategy: SVG stays accessible, GPU paths scale up\nfunction chooseRenderer(pointCount: number): Renderer {\n  if (pointCount <= 1_000) return 'svg';\n  if (pointCount <= 100_000) return 'canvas';\n  return 'webgl';\n}"
    }
  },
  {
    "id": "system_design-design-a-youtube-video-streaming-frontend-n-answer-requ",
    "title": "Design a YouTube / video streaming frontend",
    "prompt": "Design a YouTube / video streaming frontend",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Run video decoding computations manually in JavaScript using `eval()` scripts.",
        "isCorrect": false,
        "explanation": "Video decoding uses the browser's hardware decoders and MSE, not JavaScript `eval` scripts."
      },
      {
        "id": "B",
        "text": "Download full 4K 10GB MP4 video files completely into browser memory before starting playback.",
        "isCorrect": false,
        "explanation": "Downloading a full 4K file before playback causes huge latency and fails on constrained devices; stream segments instead."
      },
      {
        "id": "C",
        "text": "Integrate adaptive bitrate streaming (HLS/DASH via `hls.js`), buffer management, custom accessible video controls, theater/fullscreen states, and quality selectors.",
        "isCorrect": true,
        "explanation": "Correct. Use adaptive bitrate streaming (HLS/DASH via MSE) with buffer management, custom accessible controls, and quality selectors."
      },
      {
        "id": "D",
        "text": "Rely entirely on browser default video controls without custom overlay controls, analytics, or keyboard shortcuts.",
        "isCorrect": false,
        "explanation": "Default controls lack branding, keyboard shortcuts, and telemetry that production players require."
      }
    ],
    "correctAnswer": "C",
    "explanation": "A video frontend streams rather than downloads. Use adaptive bitrate streaming (HLS or DASH) via Media Source Extensions, so the player fetches small segments and switches quality to match bandwidth, instead of pulling a whole file. Build custom accessible controls (play, seek, quality, captions, keyboard shortcuts) and lazy-load thumbnails below the fold.\n\nThe recommendation feed should virtualize long lists, and the player should buffer a little ahead and preload metadata so playback starts quickly.\n\nThe senior nuance an interviewer wants: downloading the full file is the anti-pattern—segmented ABR is what gives fast start and resilience on variable networks, letting the player drop to a lower bitrate under congestion rather than stalling. Decoding is the browser's job via MSE, not JavaScript.",
    "interviewLine": "I stream with adaptive bitrate HLS over MSE so the player fetches segments and drops bitrate under congestion rather than stalling, and I build custom accessible controls over it.",
    "misconception": "Downloading the whole video, when segmented adaptive bitrate streaming is what enables fast start and resilience under changing bandwidth.",
    "hints": [
      "Ask what happens if you download the whole file first.",
      "Think about how quality adapts to bandwidth.",
      "The browser decodes via MSE, not JS."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice hls.js attaches a segmented stream and auto-selects quality.",
      "language": "typescript",
      "code": "import Hls from 'hls.js';\n\nconst hls = new Hls({ startLevel: -1, maxBufferLength: 30 }); // auto quality, buffer 30s\nhls.loadSource('/video/master.m3u8');\nhls.attachMedia(document.querySelector('video')!);"
    }
  },
  {
    "id": "system_design-design-a-twitter-x-feed-frontend-n-answer-requirements",
    "title": "Design a Twitter / X feed frontend",
    "prompt": "Design a Twitter / X feed frontend",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Render all loaded tweets continuously in the DOM tree without virtualization as the user scrolls for hours.",
        "isCorrect": false,
        "explanation": "Keeping every tweet in the DOM over a long session consumes huge memory and lags scrolling; virtualize."
      },
      {
        "id": "B",
        "text": "Refetch the entire timeline from page 1 on every like or retweet interaction.",
        "isCorrect": false,
        "explanation": "Refetching the whole timeline on each like resets scroll and wastes network; update the cache optimistically."
      },
      {
        "id": "C",
        "text": "Disable image placeholders and let images pop into view causing sudden layout shifts.",
        "isCorrect": false,
        "explanation": "Missing aspect-ratio placeholders causes layout shift (CLS) as media loads; reserve space."
      },
      {
        "id": "D",
        "text": "Combine virtualized infinite scrolling with windowed DOM nodes, optimistic mutation updates (likes/retweets), cursor-based pagination, and media lazy loading.",
        "isCorrect": true,
        "explanation": "Correct. Virtualize the timeline, use optimistic mutations, cursor pagination, and lazy-load media with placeholders."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A feed must stay fast over long sessions. Virtualize the timeline so only the visible rows (plus a buffer) exist in the DOM, use cursor-based pagination to load more, and keep interactions snappy with optimistic updates for likes and retweets that roll back on error. Lazy-load media with aspect-ratio placeholders to avoid layout shift.\n\nFor new tweets arriving in real time, follow Twitter's pattern: do not auto-insert and jump the scroll; stage them and show a 'N new tweets' banner the user clicks, preserving scroll position.\n\nThe senior nuance an interviewer wants: unbounded DOM growth is the killer. Without virtualization, hours of scrolling accumulate thousands of nodes and hundreds of MB, dropping scroll to a crawl; windowing caps the live DOM so the feed stays at 60fps regardless of how far the user scrolls.",
    "interviewLine": "I virtualize the timeline so only visible rows are in the DOM, paginate by cursor, and apply optimistic likes with rollback, staging new tweets behind a banner to preserve scroll.",
    "misconception": "Rendering every loaded tweet, when unbounded DOM growth over a long session is what destroys scroll performance.",
    "hints": [
      "Ask what happens to the DOM after hours of scrolling.",
      "Think about updating one tweet versus refetching all.",
      "New tweets should not jump the scroll position."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice virtualization renders only the visible window of rows.",
      "language": "tsx",
      "code": "import { useVirtualizer } from '@tanstack/react-virtual';\n\nfunction Feed({ tweets, parentRef }: { tweets: unknown[]; parentRef: React.RefObject<HTMLDivElement> }) {\n  const v = useVirtualizer({ count: tweets.length, getScrollElement: () => parentRef.current, estimateSize: () => 160 });\n  return <div style={{ height: v.getTotalSize() }} />; // only visible rows mount\n}"
    }
  },
  {
    "id": "system_design-design-an-e-commerce-product-page-with-add-to-cart-n-an",
    "title": "Design an e-commerce product page with add-to-cart",
    "prompt": "Design an e-commerce product page with add-to-cart",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Use pure client-side rendering (CSR) without metadata, allowing search engines to index empty white pages.",
        "isCorrect": false,
        "explanation": "Pure CSR serves crawlers a blank shell, which is fatal for commerce SEO; use SSR/SSG with structured data."
      },
      {
        "id": "B",
        "text": "Coordinate variant/SKU selection state with URL sync, image gallery carousel with zoom, optimistic cart mutations, and server-side rendering (SSR/SSG) for SEO.",
        "isCorrect": true,
        "explanation": "Correct. Sync variant selection to the URL, build an image gallery with zoom, make cart updates optimistic, and render via SSR/SSG for SEO."
      },
      {
        "id": "C",
        "text": "Force a full page reload and navigate the user away to a blank page whenever they click 'Add to Cart'.",
        "isCorrect": false,
        "explanation": "A full reload to a blank page on add-to-cart disrupts shopping; use a drawer or optimistic toast."
      },
      {
        "id": "D",
        "text": "Download all 20 high-resolution 4000px product photos immediately on initial page load.",
        "isCorrect": false,
        "explanation": "Loading all full-resolution images upfront delays FCP; lazy-load with responsive `srcset`."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Render the product page on the server (SSR or SSG with ISR) so it is fast and indexable, and emit structured data (JSON-LD Product schema) for rich search results. Sync variant/SKU selection (size, color) to the URL so a chosen variant is shareable and bookmarkable, show out-of-stock states, and make add-to-cart optimistic with a drawer confirmation rather than a full navigation. Lazy-load the image gallery with responsive `srcset`.\n\nE-commerce lives on organic search, so SEO and the LCP image (the hero) are first-class concerns—preload the hero and defer the rest.\n\nThe senior nuance an interviewer wants: the SEO-plus-interactivity split. SSR/SSG gives crawlers content and a fast first paint, while the interactive parts (variant picker, cart) hydrate as client components; shipping a pure-CSR page would hand search engines a blank shell.",
    "interviewLine": "I render the product page with SSR/SSG and JSON-LD for SEO, sync variant selection to the URL for shareability, and make add-to-cart optimistic, hydrating only the interactive parts as client components.",
    "misconception": "Shipping the product page as pure CSR, when commerce depends on SSR/SSG for SEO and a fast indexable first paint.",
    "hints": [
      "Ask what a crawler sees with pure client rendering.",
      "Think about keeping the chosen variant in the URL.",
      "The hero image is the LCP to preload."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice JSON-LD gives search engines structured product data from the server render.",
      "language": "tsx",
      "code": "function ProductSchema({ p }: { p: { name: string; price: number } }) {\n  const data = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, offers: { '@type': 'Offer', price: p.price, availability: 'InStock' } };\n  return <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;\n}"
    }
  },
  {
    "id": "system_design-design-a-google-docs-style-collaborative-document-edito",
    "title": "Design a Google Docs-style collaborative document editor",
    "prompt": "Design a Google Docs-style collaborative document editor",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Implement a CRDT (Yjs) or Operational Transformation (OT) data model over WebSockets, with remote presence awareness (multi-user carets), offline edits, and undo/redo stacks.",
        "isCorrect": true,
        "explanation": "Correct. Use a CRDT (Yjs) or OT over WebSockets with presence, offline edits, and undo/redo for conflict-free concurrent editing."
      },
      {
        "id": "B",
        "text": "Send the entire document string over an HTTP POST on every keystroke and overwrite the server's copy each time.",
        "isCorrect": false,
        "explanation": "Full-document overwrites per keystroke race and silently drop concurrent edits; merge with a CRDT/OT."
      },
      {
        "id": "C",
        "text": "Lock the whole document so only one person in the world can type at any moment, queuing everyone else behind them.",
        "isCorrect": false,
        "explanation": "Locking to one typist at a time turns collaboration into a single-user sequential workflow."
      },
      {
        "id": "D",
        "text": "Store the document's full history exclusively in browser cookies, which every collaborator reads on page load.",
        "isCorrect": false,
        "explanation": "Cookies cap at ~4KB and cannot hold document content or history."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Collaborative editing needs a conflict-resolution model, not naive overwrites. Use a CRDT (like Yjs) or Operational Transformation to merge concurrent edits deterministically over a WebSocket connection, with remote presence (other users' cursors), offline editing that syncs on reconnect, and local undo/redo.\n\nCRDTs give mathematical guarantees of eventual consistency without a central coordinator resolving every edit, which is why Yjs is a common choice; it also persists offline to IndexedDB and syncs when back online.\n\nThe senior nuance an interviewer wants: why last-write-wins fails. Sending the whole document per keystroke creates races that silently drop concurrent edits, and locking turns collaboration into single-user turns. A CRDT/OT model is what lets multiple people type simultaneously and converge, which is the entire point.",
    "interviewLine": "I use a CRDT like Yjs over WebSockets so concurrent edits merge deterministically with presence and offline sync, because full-document overwrites race and drop edits and locking kills collaboration.",
    "misconception": "Using last-write-wins overwrites, when concurrent editing requires a CRDT or OT model to merge edits without loss.",
    "hints": [
      "Ask what happens when two people type at once with overwrites.",
      "Think about merging edits versus locking.",
      "A conflict-free model is the core requirement."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice the CRDT doc syncs over WebSocket and persists offline.",
      "language": "typescript",
      "code": "import * as Y from 'yjs';\nimport { WebsocketProvider } from 'y-websocket';\n\nconst ydoc = new Y.Doc();\nnew WebsocketProvider('wss://api.app.com', 'doc-42', ydoc); // concurrent edits merge via CRDT"
    }
  },
  {
    "id": "system_design-design-a-dashboard-with-charts-filters-and-real-time-up",
    "title": "Design a Dashboard with charts, filters, and real-time updates",
    "prompt": "Design a Dashboard with charts, filters, and real-time updates",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Trigger a single massive monolithic API request that must complete before any dashboard widget or card can render.",
        "isCorrect": false,
        "explanation": "A monolithic request blocks every widget on the slowest endpoint; split into independent widget queries."
      },
      {
        "id": "B",
        "text": "Synchronize date/filter controls with URL search params, decouple widget data fetching with independent React Query hooks, and throttle real-time chart updates.",
        "isCorrect": true,
        "explanation": "Correct. Sync filters to URL params, fetch each widget independently with React Query, and throttle real-time chart updates."
      },
      {
        "id": "C",
        "text": "Re-render all chart canvases 100 times per second regardless of whether data has changed.",
        "isCorrect": false,
        "explanation": "Redrawing charts 100x/second regardless of data wastes GPU/CPU and battery; throttle to changes."
      },
      {
        "id": "D",
        "text": "Prevent users from bookmarking or sharing dashboard views by disallowing URL filter parameters.",
        "isCorrect": false,
        "explanation": "URL filter state is essential for shareable, bookmarkable dashboards, not something to disallow."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Decouple each widget's data fetching so a slow query never blocks the fast KPI cards—give every widget its own query hook with appropriate `staleTime`. Sync the date range and filters to URL search params so a dashboard view is shareable and bookmarkable. For real-time, refetch on an interval or stream updates, and throttle chart redraws so you do not repaint faster than data changes.\n\nAggregate data server-side rather than shipping raw rows, and show per-widget skeletons so the page fills progressively.\n\nThe senior nuance an interviewer wants: independent widget loading plus URL-synced filters. A single monolithic request couples all widgets to the slowest endpoint; splitting queries lets each render as its data arrives, and URL state makes dashboards collaborative to share.",
    "interviewLine": "I give each widget its own query with tuned staleTime so slow panels don't block fast cards, sync filters to URL params for shareability, and throttle real-time redraws to actual data changes.",
    "misconception": "Fetching all widgets in one monolithic request, when independent per-widget queries let fast cards render without waiting on slow ones.",
    "hints": [
      "Ask what happens when one widget's endpoint is slow.",
      "Think about making a filtered view shareable.",
      "Redrawing faster than data changes is wasteful."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    "example": {
      "caption": "Notice each widget fetches independently with its own freshness setting.",
      "language": "typescript",
      "code": "function useDashboard(range: { from: string; to: string }) {\n  // KPI cards poll frequently; the revenue chart tolerates staleness\n  const kpis = useQuery({ queryKey: ['kpis', range], queryFn: () => getKpis(range), refetchInterval: 30_000 });\n  const revenue = useQuery({ queryKey: ['revenue', range], queryFn: () => getRevenue(range), staleTime: 300_000 });\n  return { kpis, revenue };\n}"
    }
  },
  {
    "id": "system_design-design-a-chat-application-like-whatsapp-n-answer-requir",
    "title": "Design a chat application like WhatsApp",
    "prompt": "Design a chat application like WhatsApp",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Poll an HTTP endpoint every 5 seconds without WebSocket or push notification fallback.",
        "isCorrect": false,
        "explanation": "Polling every 5s adds latency and server load; chat needs WebSockets for low-latency delivery."
      },
      {
        "id": "B",
        "text": "Store all chat history strictly in React component memory state, clearing all messages on page refresh.",
        "isCorrect": false,
        "explanation": "Memory-only history is lost on refresh; persist to IndexedDB for offline-first chat."
      },
      {
        "id": "C",
        "text": "Render 10,000 chat message bubbles directly into the DOM tree without virtualization.",
        "isCorrect": false,
        "explanation": "Rendering 10k message bubbles without virtualization janks scrolling and bloats memory."
      },
      {
        "id": "D",
        "text": "Use WebSockets for bidirectional messaging, IndexedDB for local offline message persistence, virtualized message lists, and optimistic delivery/read receipts.",
        "isCorrect": true,
        "explanation": "Correct. Use WebSockets for messaging, IndexedDB for offline persistence, virtualized lists, and optimistic delivery/read receipts."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Chat needs low-latency bidirectional messaging, so use WebSockets rather than polling. Persist messages to IndexedDB for offline-first history and queued sends that flush on reconnect, virtualize long conversations so thousands of messages do not bloat the DOM, and model delivery status (sending, sent, delivered, read) with optimistic rendering.\n\nA sent message appears immediately as pending, goes over the socket, and transitions through acknowledgments; if offline, it queues and sends when the connection returns.\n\nThe senior nuance an interviewer wants: the offline-and-ordering story. IndexedDB persistence plus a send queue is what makes messages survive reloads and bad networks, and virtualization keeps long histories at 60fps; polling would add seconds of latency and overload the server.",
    "interviewLine": "I use WebSockets for low-latency messaging, persist to IndexedDB with a send queue for offline-first delivery, and virtualize long conversations while modeling the sent/delivered/read status optimistically.",
    "misconception": "Keeping chat history in memory and polling, when offline-first persistence plus WebSockets and virtualization are what make chat robust.",
    "hints": [
      "Ask why polling is wrong for messaging latency.",
      "Think about surviving a refresh or going offline.",
      "Long histories need virtualization."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice the message renders optimistically and persists before the socket confirms.",
      "language": "typescript",
      "code": "function sendMessage(text: string, connected: boolean) {\n  const msg = { id: crypto.randomUUID(), text, status: connected ? 'sending' : 'queued' };\n  db.messages.put(msg); // persist for offline\n  if (connected) socket.send(JSON.stringify(msg));\n  return msg;\n}"
    }
  },
  {
    "id": "system_design-design-a-netflix-style-video-streaming-frontend-n-answe",
    "title": "Design a Netflix-style video streaming frontend",
    "prompt": "Design a Netflix-style video streaming frontend",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "hooks",
    "tags": [
      "system_design",
      "hooks",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Keep playback timestamps only in component memory and reset every title to the beginning whenever the page reloads.",
        "isCorrect": false,
        "explanation": "Memory-only progress resets on refresh; persist locally and sync to the backend for resume."
      },
      {
        "id": "B",
        "text": "Implement adaptive bitrate streaming (HLS/DASH), debounced hover video preview timers, virtualized horizontal content carousels, and resume-playback timestamp sync.",
        "isCorrect": true,
        "explanation": "Correct. Use adaptive bitrate streaming, debounced hover previews, virtualized carousels, and resume-playback progress sync."
      },
      {
        "id": "C",
        "text": "Re-render the entire carousel row from scratch each time a single card is hovered so the preview can expand in place.",
        "isCorrect": false,
        "explanation": "Re-rendering the whole row on hover is wasteful; isolate hover state to the card or use CSS."
      },
      {
        "id": "D",
        "text": "Autoplay full, unmuted 4K streams for every tile in every carousel at once as soon as the browse page first loads.",
        "isCorrect": false,
        "explanation": "Autoplaying every item's 4K stream at once crashes the browser and exhausts bandwidth."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Combine streaming with discovery UX. Use adaptive bitrate (HLS/DASH over MSE) for playback, persist watch progress locally and sync it to the backend so users resume seamlessly, debounce hover-to-preview so trailers do not fire on every pass, and virtualize the horizontal content carousels so off-screen rows do not render.\n\nResume is a defining feature: save position periodically and on unload, and fetch it on load to continue where the user left off.\n\nThe senior nuance an interviewer wants: the preview-and-progress details. Hover previews must be debounced and prefetched to avoid network churn, progress must survive refresh (local plus server), and you never autoplay many streams at once—that exhausts bandwidth and crashes the tab. Isolate hover animation to the card to avoid row-wide re-renders.",
    "interviewLine": "I stream with adaptive bitrate, debounce hover previews, virtualize the carousels, and persist watch progress locally and server-side so playback resumes seamlessly.",
    "misconception": "Ignoring resume and preview nuance, when progress must persist across reloads and hover previews must be debounced to avoid network churn.",
    "hints": [
      "Ask what should survive a page refresh.",
      "Think about hover previews firing on every pass.",
      "Autoplaying every stream at once is the trap."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/reference/react/hooks",
    "example": {
      "caption": "Notice progress is saved periodically so playback can resume later.",
      "language": "typescript",
      "code": "const save = debounce((videoId: string, position: number) => {\n  localStorage.setItem(`pos:${videoId}`, String(position));\n  fetch('/api/progress', { method: 'POST', body: JSON.stringify({ videoId, position }) });\n}, 10_000);"
    }
  },
  {
    "id": "system_design-how-do-you-handle-error-states-and-loading-states-in-a",
    "title": "How do you handle error states and loading states in a large app?",
    "prompt": "How do you handle error states and loading states in a large app?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Replace the whole site with a blank white screen whenever any single subresource fails, then wait for a manual reload.",
        "isCorrect": false,
        "explanation": "Blanking the whole page on any subresource failure is catastrophic; scoped boundaries isolate crashes."
      },
      {
        "id": "B",
        "text": "Display the raw, unformatted backend HTTP 500 JSON error object directly to the end user with no friendly wrapper.",
        "isCorrect": false,
        "explanation": "Showing raw server error objects confuses users and leaks internals; show friendly, actionable states."
      },
      {
        "id": "C",
        "text": "Show one non-dismissible alert modal on every network timeout that blocks all interaction until the request succeeds.",
        "isCorrect": false,
        "explanation": "Non-dismissible blocking alerts ruin UX; inline retry lets users recover in place."
      },
      {
        "id": "D",
        "text": "Provide granular UI states (skeleton screens, empty states, inline error retry triggers), and wrap fault-tolerant component zones in separate Error Boundaries.",
        "isCorrect": true,
        "explanation": "Correct. Provide skeletons, empty states, and inline retry, and wrap fault-prone zones in separate Error Boundaries for graceful degradation."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Every async surface needs a UI for all four states: loading, error, empty, and success. Use skeleton screens that mirror content shape for the best perceived speed, inline error states with a retry action rather than blocking modals, and distinct empty states (no results, empty cart). Wrap fault-prone zones in separate Error Boundaries so one broken widget shows a localized fallback instead of blanking the page.\n\nPairing `Suspense` for async data with an `ErrorBoundary` for render errors gives a clean per-section pattern you can apply at route and component levels.\n\nThe senior nuance an interviewer wants: failure isolation. Scoped boundaries mean a crash in one widget degrades gracefully while the rest of the screen works; a single top-level catch would blank everything, and raw server errors leak internals and confuse users.",
    "interviewLine": "I give every async surface loading, error, empty, and success states—skeletons and inline retry—and wrap fault-prone zones in scoped Error Boundaries so one broken widget degrades gracefully instead of blanking the page.",
    "misconception": "Relying on one global catch, when scoped Error Boundaries let a single broken widget fail without blanking the whole screen.",
    "hints": [
      "List every state an async section can be in.",
      "Ask what happens to the page when one widget throws.",
      "Raw server errors should never reach the user."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://react.dev/learn/render-and-commit",
    "example": {
      "caption": "Notice each async section gets its own boundary and skeleton fallback.",
      "language": "tsx",
      "code": "function AsyncBoundary({ children }: { children: React.ReactNode }) {\n  return (\n    <ErrorBoundary fallback={<RetryError />}>\n      <Suspense fallback={<Skeleton />}>{children}</Suspense>\n    </ErrorBoundary>\n  );\n}"
    }
  },
  {
    "id": "system_design-how-do-you-design-a-search-system-with-faceted-filterin",
    "title": "How do you design a search system with faceted filtering?",
    "prompt": "How do you design a search system with faceted filtering?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Clear every selected filter whenever the user changes the sort order, so each new sort starts from an empty query.",
        "isCorrect": false,
        "explanation": "Clearing filters on a sort change discards user intent; sorting must preserve active facets."
      },
      {
        "id": "B",
        "text": "Hardcode a fixed list of filter options and allow only one facet value to be selected across the entire interface.",
        "isCorrect": false,
        "explanation": "Faceted search requires multi-select across dimensions; disallowing concurrent selections defeats it."
      },
      {
        "id": "C",
        "text": "Run a full client-side linear scan over millions of unindexed products in JavaScript on every keystroke of the query.",
        "isCorrect": false,
        "explanation": "Client-side scans over millions of items exhaust memory; aggregation belongs on a search engine."
      },
      {
        "id": "D",
        "text": "Serialize filter state into URL parameters, debounce text queries, display facet counts with optimistic updates, and fetch results asynchronously with abort controllers.",
        "isCorrect": true,
        "explanation": "Correct. Serialize filters to URL params, debounce queries, show facet counts, and fetch async with abort, backed by a search engine."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Faceted search lets users filter by multiple attributes at once (category, price, rating, brand). Serialize the active filters and query into URL search params so results are shareable and bookmarkable, debounce the text input, cancel stale requests, and show facet counts (how many results each value yields). Do the heavy lifting on a search engine—Algolia, Elasticsearch, Typesense—not on the client.\n\nFilters should compose and preserve each other: changing the sort order must not clear the facets, and selecting multiple values within a facet is normal.\n\nThe senior nuance an interviewer wants: where the work lives and how state is shared. Searching millions of items client-side is impossible, so the engine computes relevance and facet aggregations; the frontend's job is URL-synced filter state, debounced cancelable queries, and preserving filters across sorts.",
    "interviewLine": "I serialize filters to URL params, debounce and cancel queries, and let a search engine compute relevance and facet counts, making sure a sort change preserves active facets.",
    "misconception": "Trying to filter large datasets client-side, when the search engine computes relevance and facet counts and the frontend manages URL-synced filter state.",
    "hints": [
      "Ask where searching millions of items should happen.",
      "Think about keeping filters in the URL.",
      "Changing sort should not reset the facets."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    "example": {
      "caption": "Notice filter state lives in the URL so results are shareable.",
      "language": "typescript",
      "code": "function toParams(filters: { brand?: string[]; sort?: string }) {\n  const p = new URLSearchParams();\n  filters.brand?.forEach((b) => p.append('brand', b));\n  if (filters.sort) p.set('sort', filters.sort); // sort preserved alongside facets\n  return p.toString();\n}"
    }
  },
  {
    "id": "system_design-how-do-you-approach-frontend-performance-auditing-n-ans",
    "title": "How do you approach frontend performance auditing?",
    "prompt": "How do you approach frontend performance auditing?",
    "level": "senior",
    "type": "concept",
    "category": "system_design",
    "subject": "rendering-keys",
    "tags": [
      "system_design",
      "rendering-keys",
      "senior",
      "rendering"
    ],
    "codeLanguage": "typescript",
    "options": [
      {
        "id": "A",
        "text": "Assume all performance issues are caused by network bandwidth rather than main-thread JavaScript execution.",
        "isCorrect": false,
        "explanation": "Heavy JS execution and layout thrash slow users even on fast networks; it is not only bandwidth."
      },
      {
        "id": "B",
        "text": "Audit systematically using Chrome DevTools Performance profiler, analyze bundle chunks with source-map-explorer, measure Core Web Vitals (RUM/Lighthouse), and eliminate layout thrashing.",
        "isCorrect": true,
        "explanation": "Correct. Audit with Lighthouse and the Performance profiler, analyze the bundle, measure Core Web Vitals (lab and RUM), and fix long tasks and layout thrash."
      },
      {
        "id": "C",
        "text": "Guess performance bottlenecks by looking at source code without running profiler tools or collecting metrics.",
        "isCorrect": false,
        "explanation": "Guessing bottlenecks from source is unreliable; profiling and metrics are essential."
      },
      {
        "id": "D",
        "text": "Disable all compression (Gzip/Brotli) and minify flags to make debugging easier in production.",
        "isCorrect": false,
        "explanation": "Disabling compression and minification multiplies payload size and cripples load times."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Audit with data, not intuition. Run Lighthouse in production (incognito) to get Core Web Vitals and opportunities, use the DevTools Performance panel to find long tasks (>50ms) blocking the main thread, analyze the bundle (source-map-explorer, bundle visualizer) to find heavy dependencies to split or replace, and collect real-user metrics (web-vitals: LCP, INP, CLS) from the field.\n\nThen act on the biggest wins: preload the LCP image, code-split routes, serve optimized images (WebP, `srcset`), trim unused CSS, and defer non-critical scripts. Keep compression (Brotli/Gzip) and minification on.\n\nThe senior nuance an interviewer wants: a systematic, measured loop. Measure first, fix the worst metric, re-measure—and recognize that main-thread JavaScript (long tasks, hydration, re-renders) often dominates perceived slowness, not just network bandwidth.",
    "interviewLine": "I audit with Lighthouse plus the Performance profiler, analyze the bundle, and collect real-user Core Web Vitals, then fix the worst metric and re-measure—often the win is cutting main-thread work, not just bytes.",
    "misconception": "Assuming slowness is always the network, when main-thread JavaScript—long tasks, hydration, re-renders—often dominates and must be measured.",
    "hints": [
      "Ask what tools give you lab versus real-user data.",
      "Think about long main-thread tasks, not only network.",
      "Measure, fix the worst metric, then re-measure."
    ],
    "source": "frontend-system-design-50",
    "estimatedMinutes": 4,
    "bestPracticeRef": "https://web.dev/articles/vitals",
    "example": {
      "caption": "Notice real-user Core Web Vitals feed analytics for field-based auditing.",
      "language": "typescript",
      "code": "import { onLCP, onINP, onCLS } from 'web-vitals';\n\nconst report = (m: { name: string; value: number }) => sendToAnalytics(m);\nonLCP(report); onINP(report); onCLS(report); // measure what real users experience"
    }
  }
];
