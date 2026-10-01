import { QuizQuestion } from '../types';

export const TYPESCRIPT_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-is-a-reducer-in-redux-and-what-parameters-does-it",
    title: "What is a reducer in Redux and what parameters does it take?",
    prompt: "What is a reducer in Redux and what parameters does it take?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "export default function appReducer(state = initialState, action) {\n  // The reducer normally looks at the action type field to decide what happens\n  switch (action.type) {\n    // Do something here based on the different types of actions\n    default:\n      // If this reducer doesn't recognize the action type, or doesn't\n      // care about this specific action, return the existing state unchanged\n      return state\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A pure function that takes `(state, action)` and returns the next state without mutating the previous one.",
        isCorrect: true,
        explanation: "Correct. A reducer computes `(previousState, action) => newState` with no side effects, which is what makes state transitions predictable and replayable."
      },
      {
        id: "B",
        text: "An async handler that takes `(url, callback)` and performs the network request for an action.",
        isCorrect: false,
        explanation: "Tempting if you conflate the reducer with the thunk or saga that fetches data, but reducers are synchronous and pure; the async work happens before an action is ever dispatched."
      },
      {
        id: "C",
        text: "A function that calls `state.items.push(action.payload)` in place and returns nothing.",
        isCorrect: false,
        explanation: "Appealing because it looks like the simplest way to update, but mutating the argument and returning `undefined` breaks the store's reference checks and wipes the state."
      },
      {
        id: "D",
        text: "A DOM method that takes `(elementId, newHtml)` and updates the rendered view directly.",
        isCorrect: false,
        explanation: "This confuses state updates with rendering; a reducer only transforms in-memory state, and React, not the reducer, reconciles that state to the DOM."
      }
    ],
    correctAnswer: "A",
    explanation: "A reducer is a pure function with the signature `(previousState, action) => newState`. It reads the current state and an action describing what happened, then returns the next state. Given the same inputs it always returns the same output, and it performs no side effects: no network calls, no mutation of its arguments, no reading of the clock or random values.\n\nThat purity is what makes a Redux store predictable, replayable and testable. Because the reducer returns a brand-new state object rather than editing the old one, the store can compare references cheaply to decide what changed, and tools can time-travel by re-running the same actions over the same initial state.\n\nThe common nuance an interviewer probes is immutability: spreading the top level is not enough for nested data. `state.items.push(x)` mutates in place even inside a reducer, so you copy each level you touch, which is exactly the boilerplate Redux Toolkit's Immer removes while keeping the function pure.",
    interviewLine: "I describe a reducer as a pure `(state, action) => newState` function: no mutation, no side effects, which is what lets the store compare references and makes time-travel debugging possible.",
    misconception: "Thinking a reducer may mutate the state it receives or run async work. Mutating breaks reference-equality checks, and any side effect makes it non-replayable.",
    hints: [
      "Start from the signature: what goes in, what comes out.",
      "Ask whether calling it twice with the same inputs could ever differ.",
      "Returning the same object you were handed, even edited, is not a new state."
    ],
    example: {
      caption: "Spread each level you change so the previous state object is never mutated.",
      language: "typescript",
      code: "type State = { count: number; items: string[] };\ntype Action = { type: \"add\"; item: string } | { type: \"reset\" };\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case \"add\":\n      return { ...state, items: [...state.items, action.item] };\n    case \"reset\":\n      return { ...state, items: [] };\n    default:\n      return state;\n  }\n}"
    },
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-what-is-an-action-and-how-can-you-change-the-state-in-r",
    title: "What is an action and how can you change the state in Redux?",
    prompt: "What is an action and how can you change the state in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "{\n  type: \"SOME_TYPE\"\n}\n\n{\n  type: \"SOME_TYPE\",\n  payload: \"Any payload\",\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State is updated by calling `store.mutateState(key, value)` directly from UI components.",
        isCorrect: false,
        explanation: "Tempting if you picture the store as a mutable object, but Redux exposes no such setter; writing to state outside a reducer bypasses the one update path and breaks replay."
      },
      {
        id: "B",
        text: "An action is a plain object with a `type`; `dispatch(action)` runs it through the reducers.",
        isCorrect: true,
        explanation: "Correct. The action describes the change and `dispatch` is the single entry point that runs the reducers to produce the next state."
      },
      {
        id: "C",
        text: "An action is an event listener that mutates a global `window.state` property when fired.",
        isCorrect: false,
        explanation: "This assumes global mutable state, but Redux keeps an isolated store, and listeners never write to it; only dispatched actions and reducers do."
      },
      {
        id: "D",
        text: "An action is an async thread that overwrites the store's memory buffer when it resolves.",
        isCorrect: false,
        explanation: "Appealing if you expect async work in the action itself, but actions are plain synchronous data; any fetching lives in middleware that dispatches further actions."
      }
    ],
    correctAnswer: "B",
    explanation: "An action is a plain JavaScript object with a required `type` field and, optionally, a `payload` carrying the data for that change. It is a description of something that happened, not the change itself. The only way to update a Redux store is to hand an action to `dispatch`, which runs it through the reducers to produce the next state.\n\nThat indirection is the point: components never write to the store directly, they announce intent by dispatching, and every state transition flows through one choke point. This is what makes the event log inspectable and the whole system replayable, since the sequence of actions fully determines the state.\n\nThe nuance worth stating is serialisability. Actions should hold plain data, not functions, Promises or class instances, so middleware can log, persist and replay them. Side effects such as fetching belong in middleware (thunks, sagas) that dispatch further plain actions when the work completes.",
    interviewLine: "I treat an action as a serialisable description of what happened; `dispatch(action)` is the only path into the store, so every state change runs through the reducers in one place.",
    misconception: "Believing you can mutate the store directly or that an action itself changes state. The action only describes intent; `dispatch` running the reducers is what produces the new state.",
    hints: [
      "Look at what field every action object is required to carry.",
      "Ask what function has to be called before a reducer ever runs.",
      "The action describes the change; it does not apply it."
    ],
    example: {
      caption: "An action creator returns a plain, serialisable object; dispatch sends it to the reducers.",
      language: "typescript",
      code: "const addTodo = (text: string) => ({ type: \"todos/add\", payload: text });\n\n// in a component\ndispatch(addTodo(\"write tests\"));\n// -> { type: \"todos/add\", payload: \"write tests\" } flows through the reducers"
    },
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-peculiarities-of-working-with-mobx",
    title: "What are the peculiarities of working with Mobx?",
    prompt: "What are the peculiarities of working with Mobx?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State is mutable and observable; `observer` components track the properties they read and re-render on change.",
        isCorrect: true,
        explanation: "Correct. MobX records exactly which observables a render touched and re-runs only those readers when the value mutates, giving fine-grained updates for free."
      },
      {
        id: "B",
        text: "All application state is persisted in the browser URL query string and read back on each render.",
        isCorrect: false,
        explanation: "This confuses MobX with URL-based routing state; MobX holds observable state in ordinary in-memory objects, not the query string."
      },
      {
        id: "C",
        text: "Every property change requires an explicit reducer switch and a dispatched action to apply it.",
        isCorrect: false,
        explanation: "That describes Redux, and is the very ceremony MobX avoids: you mutate an observable directly and the tracked readers update themselves."
      },
      {
        id: "D",
        text: "It works only with class components and cannot integrate with React function components.",
        isCorrect: false,
        explanation: "Tempting because MobX stores are often classes, but functional components integrate through the `observer` wrapper in `mobx-react-lite`."
      }
    ],
    correctAnswer: "A",
    explanation: "MobX is built on transparent reactivity. You mark state as observable and mutate it directly, no actions or reducers required by default. Any computation or component that reads an observable is tracked, so when that specific value changes MobX re-runs only the readers that depended on it.\n\nIn React this is wired up through the `observer` wrapper from `mobx-react-lite`. An `observer` component records exactly which observable properties it touched during render, and re-renders only when one of those mutates. The practical consequence is fine-grained updates with almost no manual memoisation: you rarely reach for `useMemo` or `React.memo` because the dependency graph is tracked for you.\n\nThe nuance an interviewer probes is where MobX differs from Redux's explicit, immutable flow. MobX favours direct mutation and derived `computed` values; the trade is less obvious time-travel and a reactivity graph you must understand, which is why `action` and strict mode exist to keep mutations batched and predictable.",
    interviewLine: "I'd explain that MobX tracks exactly which observables a component read and re-renders only those readers on mutation, which is why I barely need manual memoisation in `observer` components.",
    misconception: "Assuming MobX needs reducers and actions like Redux, or that it is class-only. State is mutable and observable, and functional components use it through the `observer` wrapper.",
    hints: [
      "Think about how a component learns that a value it read has changed.",
      "Ask what MobX records during a render and what it does with that record.",
      "Direct mutation is allowed here; the subscription is automatic, not manual."
    ],
    example: {
      caption: "An observer component re-renders only because it read the property that changed.",
      language: "tsx",
      code: "import { makeAutoObservable } from \"mobx\";\nimport { observer } from \"mobx-react-lite\";\n\nclass Counter {\n  value = 0;\n  constructor() { makeAutoObservable(this); }\n  increment() { this.value++; }\n}\n\nconst store = new Counter();\n\nconst View = observer(() => <button onClick={() => store.increment()}>{store.value}</button>);"
    },
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "react-what-is-public-api",
    title: "What is Public API?",
    prompt: "What is Public API?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "// index.js\n\nexport function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nexport function calculateSum(a, b) {\n  return a + b;\n}\n\n// main.js\n\nimport { greet, calculateSum } from './index.js';\n\nconsole.log(greet('John')); // Hello, John!\nconsole.log(calculateSum(5, 3)); // 8",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The exported interface of a module or component, props, methods and exports, that hides its internals.",
        isCorrect: true,
        explanation: "Correct. The public API is the surface consumers depend on, which lets you refactor the private internals freely as long as the exported contract holds."
      },
      {
        id: "B",
        text: "A free, publicly hosted REST service that any client on the internet can call over HTTP.",
        isCorrect: false,
        explanation: "Tempting because 'API' often means a web service, but in module design it refers to the exported surface of your own code, not a network endpoint."
      },
      {
        id: "C",
        text: "A `package.json` field that publishes the module's source to the npm registry automatically.",
        isCorrect: false,
        explanation: "This confuses the contract with the packaging step; the public API is which exports you expose, independent of how or whether you publish."
      },
      {
        id: "D",
        text: "The raw rendered HTML a browser shows under 'View Page Source' for the running app.",
        isCorrect: false,
        explanation: "That is output, not interface; the public API is the code boundary other modules import against, not the markup the browser displays."
      }
    ],
    correctAnswer: "A",
    explanation: "A public API is the surface a module or component deliberately exposes to the outside: its exports, the props it accepts, the methods or refs it forwards. Everything else, the internal state, helper functions and implementation details, is private. A barrel file like `index.ts` is the usual place to declare that surface by re-exporting only what consumers should depend on.\n\nThe value is in the boundary. Consumers couple to the public API, not the internals, so you can refactor or rewrite what is behind it without breaking them, as long as the exported contract holds. This is the same encapsulation idea whether the unit is a React component (props in, callbacks out) or an npm package (its entry point).\n\nThe nuance worth raising is that the public API is a contract you have to maintain: once something is exported, changing it is a breaking change. Keeping the surface small and intentional, rather than re-exporting everything, is what makes a module safe to evolve.",
    interviewLine: "The public API is the surface I let consumers depend on, its exports, props and forwarded refs, so I can rewrite everything behind it without breaking them as long as the contract holds.",
    misconception: "Reading 'API' as a networked web service. Here it means the exported interface of a module or component, the boundary between what consumers may use and the private internals.",
    hints: [
      "Ask which parts of a module other code is allowed to depend on.",
      "Think about what a barrel `index` file deliberately re-exports and what it hides.",
      "It is an interface boundary in your own code, not a server endpoint."
    ],
    example: {
      caption: "The barrel exposes only the intended surface; the helper stays private.",
      language: "typescript",
      code: "// internal.ts\nexport function format(n: number) { return n.toFixed(2); } // not re-exported\nexport function price(cents: number) { return `$${format(cents / 100)}`; }\n\n// index.ts, the public API\nexport { price } from \"./internal\";\n// consumers import { price }; format stays an implementation detail"
    },
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-what-is-the-role-of-proptypes-in-react",
    title: "What is the role of PropTypes in React?",
    prompt: "What is the role of PropTypes in React?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "import PropTypes from 'prop-types';\nfunction MyComponent({ name, age }) {  return (    <div>      {name} is {age} years old    </div>  );}\nMyComponent.propTypes = {  name: PropTypes.string.isRequired,  age: PropTypes.number.isRequired,};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A compiler that transforms React components into WebAssembly binaries for faster execution.",
        isCorrect: false,
        explanation: "This invents a compilation role; PropTypes never compiled anything, it validated prop values at runtime in development."
      },
      {
        id: "B",
        text: "A tool that automatically formats and prefixes the CSS written inside JSX style blocks.",
        isCorrect: false,
        explanation: "Tempting as a vague 'React helper', but PropTypes concerns JavaScript prop values, not stylesheet formatting."
      },
      {
        id: "C",
        text: "A development-only runtime prop validator that warned in the console; now deprecated for TypeScript.",
        isCorrect: true,
        explanation: "Correct. PropTypes checked props at runtime in development and is superseded by TypeScript's compile-time checking, which ships nothing to the client."
      },
      {
        id: "D",
        text: "A security layer that encrypts the props passed over the network to each child component.",
        isCorrect: false,
        explanation: "Props are passed in memory, not over a network, and PropTypes performs type validation, not encryption."
      }
    ],
    correctAnswer: "C",
    explanation: "`PropTypes` was React's runtime prop validator. You declared the expected type of each prop on `Component.propTypes`, and in development React logged a console warning when a value failed the check. It never affected production builds and never changed runtime behaviour, it only surfaced mismatches while you worked.\n\nIt is a runtime mechanism, which is its defining limitation: the check happens when the component renders with bad data, not when you write the code. TypeScript supersedes it by checking prop types statically at compile time, catching the same class of bug before the app runs and adding editor autocomplete and refactoring, with zero bytes shipped to the client.\n\nThe current-state nuance: `prop-types` is deprecated and no longer bundled with React 19, so new code should type props with TypeScript. If you maintain a codebase still importing `prop-types`, the migration is to convert those declarations into `type` or `interface` prop shapes.",
    interviewLine: "I'd say PropTypes was a development-only runtime check that warned in the console, and I now let TypeScript replace it by catching the same mismatches at compile time with nothing shipped to the client.",
    misconception: "Thinking PropTypes validates in production or is still the recommended approach. It only warned in development and is deprecated in React 19 in favour of static TypeScript types.",
    hints: [
      "Ask when the check happens, at build time or while the component renders.",
      "Consider what reaches the production bundle in each approach.",
      "A console warning in dev is not the same as a compile error."
    ],
    example: {
      caption: "The TypeScript equivalent moves the same check from runtime to compile time.",
      language: "tsx",
      code: "type Props = { name: string; age: number };\n\nfunction Profile({ name, age }: Props) {\n  return <div>{name} is {age}</div>;\n}\n\n// <Profile name=\"Ada\" age=\"old\" /> is a compile error, not a dev-only warning"
    },
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-what-are-the-recommended-ways-for-type-checking-of-reac",
    title: "What are the recommended ways for type checking of React component props?",
    prompt: "What are the recommended ways for type checking of React component props?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "type MyComponentProps = {  name: string;  age: number;};\nfunction MyComponent({ name, age }: MyComponentProps) {  return (    <div>      {name} is {age} years old    </div>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Define explicit prop types or interfaces in TypeScript for compile-time checks and editor autocomplete.",
        isCorrect: true,
        explanation: "Correct. A typed prop shape is caught at build time, powers editor tooling, and is erased from the bundle at zero runtime cost."
      },
      {
        id: "B",
        text: "Add `console.log` calls to the render body to inspect each prop's value as it comes in.",
        isCorrect: false,
        explanation: "This is ad-hoc manual debugging that runs after the fact; it checks nothing automatically and never fails a build."
      },
      {
        id: "C",
        text: "Ship plain JavaScript with no type layer and rely on code review to catch bad props.",
        isCorrect: false,
        explanation: "Tempting as the lightest setup, but it gives up compile-time safety, autocomplete and safe refactors that typed props provide for free."
      },
      {
        id: "D",
        text: "Write manual `typeof` guards at the top of every component to assert each prop's type.",
        isCorrect: false,
        explanation: "Appealing as explicit, but it adds runtime boilerplate and overhead for checks TypeScript does statically at compile time."
      }
    ],
    correctAnswer: "A",
    explanation: "The recommended approach is TypeScript: declare a `type` or `interface` for a component's props and annotate the parameter. The compiler then rejects missing or mis-typed props at build time, and your editor gets autocomplete, jump-to-definition and safe renames across every call site. None of this adds a single byte to the runtime bundle, because the types are erased on compile.\n\nThat compile-time guarantee is the whole advantage over the alternatives. A mismatch is caught where you write the JSX, not when the component happens to render with bad data in front of a user, and refactoring a prop name updates its consumers under the type checker's supervision.\n\nThe historical nuance is `PropTypes`, the older runtime checker that warned in development only. It is deprecated as of React 19 and no longer ships from the `react` package, so new code should type props statically and existing `prop-types` declarations should be migrated to TypeScript.",
    interviewLine: "I type props with a `type` or `interface` and let the compiler reject bad props at the call site; it is checked at build time and erased from the bundle, unlike the old runtime PropTypes.",
    misconception: "Assuming prop checking must happen at runtime, as PropTypes did. TypeScript validates props statically at compile time, before the component ever renders.",
    hints: [
      "Ask where a bad prop should be caught, at the call site or during render.",
      "Consider what each option costs in the shipped bundle.",
      "A runtime console warning is weaker than a build-time error."
    ],
    example: {
      caption: "A typed prop shape rejects the mistake before the app runs.",
      language: "tsx",
      code: "interface ButtonProps {\n  label: string;\n  onClick: () => void;\n  disabled?: boolean;\n}\n\nfunction Button({ label, onClick, disabled }: ButtonProps) {\n  return <button onClick={onClick} disabled={disabled}>{label}</button>;\n}\n// <Button label={42} /> fails to compile"
    },
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-how-react-router-is-different-from-the-history-library",
    title: "How React Router is different from the history library?",
    prompt: "How React Router is different from the history library?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "rendering-keys",
    tags: [
      "typescript",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Router runs only on mobile browsers while the `history` library runs only on desktop browsers.",
        isCorrect: false,
        explanation: "This invents a platform split; both are platform-agnostic JavaScript that run anywhere the browser history API exists."
      },
      {
        id: "B",
        text: "The `history` library renders route UI directly into the DOM, and React Router only parses URLs.",
        isCorrect: false,
        explanation: "This reverses the roles: `history` has no UI at all, and React Router is the layer that renders for a location."
      },
      {
        id: "C",
        text: "`history` is a low-level navigation primitive; React Router is the declarative routing layer built on it.",
        isCorrect: true,
        explanation: "Correct. `history` manages the location stack and React Router adds route matching, params and hooks on top of it."
      },
      {
        id: "D",
        text: "They are identical libraries released by two competing teams that never share any code.",
        isCorrect: false,
        explanation: "Tempting if the names feel interchangeable, but React Router is built on `history` by the same maintainers, not a rival of it."
      }
    ],
    correctAnswer: "C",
    explanation: "The `history` library is a small, framework-agnostic primitive. It abstracts the browser's navigation stack, `pushState`, `popState`, the hash, into a single API with `push`, `replace`, `go` and a `listen` subscription. It knows nothing about React, components or rendering; it just manages location.\n\nReact Router is the higher-level layer built on top of that primitive. It adds declarative route matching, URL parameter parsing, nested layouts and the hooks (`useNavigate`, `useParams`, `useLocation`) that connect the current location to the component tree. In other words, `history` tracks where you are, and React Router decides what to render for it.\n\nThe nuance an interviewer may probe is why the split exists: keeping navigation state in a tiny, UI-free package means it can be shared, tested and even used without React, while the routing and rendering concerns live in a separate layer that depends on it. Modern React Router has largely absorbed `history` internally, but the conceptual boundary still explains the architecture.",
    interviewLine: "I describe `history` as a UI-free primitive over the browser navigation stack, and React Router as the declarative routing layer I build on top of it that maps the current location to components.",
    misconception: "Assuming the two are competitors or that `history` renders UI. `history` only manages the location stack; React Router consumes it to do route matching and rendering.",
    hints: [
      "Separate the piece that tracks location from the piece that renders for it.",
      "Ask which one has any knowledge of React components at all.",
      "One is a low-level primitive the other is built on, not an alternative to it."
    ],
    example: {
      caption: "The history primitive manages location with no UI; React Router renders on top of it.",
      language: "typescript",
      code: "import { createBrowserHistory } from \"history\";\n\nconst history = createBrowserHistory();\n\nhistory.listen(({ location }) => {\n  console.log(\"now at\", location.pathname);\n});\n\nhistory.push(\"/about\"); // updates the stack; renders nothing itself"
    },
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "system_design-how-does-the-new-form-action-prop-work-in-react-19",
    title: "How does the new form action prop work in React 19?",
    prompt: "How does the new form action prop work in React 19?",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "types",
    tags: [
      "system_design",
      "types",
      "senior"
    ],
    codeSnippet: "import { useFormStatus } from 'react-dom';\nfunction SubmitButton() {  const { pending } = useFormStatus();  return <button disabled={pending}>{pending ? 'Saving...': 'Save'}</button>;}\nfunction ProfileForm() {  async function save(formData) {    await updateProfile(Object.fromEntries(formData));  }  return (    <form action={save}>      <input name=\"name\" />      <SubmitButton />    </form>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "It forces the browser to perform a synchronous full-page HTTP POST and reload the document.",
        isCorrect: false,
        explanation: "Tempting because that is how a classic HTML form acts, but React intercepts the submit and runs the action in a client transition without a reload."
      },
      {
        id: "B",
        text: "It requires installing several third-party form packages before any form can submit at all.",
        isCorrect: false,
        explanation: "This assumes forms need an external library, but Form Actions are built into React 19 core with no extra dependencies."
      },
      {
        id: "C",
        text: "You pass an async function to `<form action={fn}>`; it receives FormData, runs in a transition, and pairs with the form hooks.",
        isCorrect: true,
        explanation: "Correct. React calls the action with a FormData instance inside a transition, which is what lets `useFormStatus` and `useActionState` track pending state."
      },
      {
        id: "D",
        text: "It disables typing in the `<input>` fields inside the form until the action has resolved.",
        isCorrect: false,
        explanation: "This confuses the action with input locking; Form Actions work with normal controlled and uncontrolled inputs and do not freeze them."
      }
    ],
    correctAnswer: "C",
    explanation: "In React 19 you can pass a function to `<form action={fn}>` (or `<button formAction>`). On submit, React intercepts the native submission, builds a `FormData` from the form, and calls your function with it inside a transition rather than reloading the page. If the action succeeds, React resets uncontrolled inputs for you.\n\nRunning inside a transition is what makes the surrounding hooks work. `useFormStatus` lets a nested component read `pending` without prop-drilling, so a submit button can disable itself while the action runs, and `useActionState` threads the action's return value and pending flag back into the component. You get optimistic, non-blocking submission with very little wiring.\n\nThe nuance worth raising is that the same `action` prop accepts a plain client function or a Server Function (`\"use server\"`). With a Server Function the form can submit before hydration and the mutation runs on the server, which is why this feature is central to the App Router's data-mutation story rather than just a client convenience.",
    interviewLine: "I'd point out that React 19 lets a form action be an async function that receives FormData and runs in a transition, so I can track pending state with `useFormStatus` and `useActionState` without prop-drilling.",
    misconception: "Expecting `<form action={fn}>` to trigger a full-page POST reload. React intercepts the submit, passes FormData to the function, and runs it in a client transition.",
    hints: [
      "Ask what React passes to the function when the form submits.",
      "Think about how a nested submit button learns the form is pending.",
      "The submission does not reload the page; it runs in a transition."
    ],
    example: {
      caption: "useActionState threads the action's result and pending flag back to the component.",
      language: "tsx",
      code: "function Subscribe() {\n  const [error, submit, pending] = useActionState(\n    async (_prev: string | null, formData: FormData) => {\n      const email = String(formData.get(\"email\"));\n      return email.includes(\"@\") ? null : \"invalid email\";\n    },\n    null,\n  );\n  return (\n    <form action={submit}>\n      <input name=\"email\" />\n      <button disabled={pending}>Join</button>\n      {error && <p>{error}</p>}\n    </form>\n  );\n}"
    },
    source: "100-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-what-is-react-material-ui",
    title: "What is React-Material UI?",
    prompt: "What is React-Material UI?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A native hardware driver that accelerates rendering on Intel and AMD graphics cards.",
        isCorrect: false,
        explanation: "This places MUI in the hardware layer; it is JavaScript running in React, with no connection to GPU drivers."
      },
      {
        id: "B",
        text: "A lightweight operating-system kernel designed to run React apps on mobile devices.",
        isCorrect: false,
        explanation: "Tempting if 'Material' sounds system-level, but MUI is a React component library, not an operating system."
      },
      {
        id: "C",
        text: "A database migration tool that versions and applies schema changes to PostgreSQL servers.",
        isCorrect: false,
        explanation: "This confuses a frontend UI library with backend tooling; MUI provides React components and styles, not migrations."
      },
      {
        id: "D",
        text: "An open-source React component library implementing Google's Material Design with accessible, themeable UI parts.",
        isCorrect: true,
        explanation: "Correct. MUI ships ready-made, accessible components and a theming system so you build a consistent Material Design UI quickly."
      }
    ],
    correctAnswer: "D",
    explanation: "MUI, formerly Material-UI, is an open-source React component library that implements Google's Material Design. It ships ready-made, accessible components, buttons, dialogs, text fields, data grids, and a theming system so an application can present a consistent, keyboard- and screen-reader-friendly interface without building each primitive from scratch.\n\nThe practical value is speed and consistency. Instead of hand-rolling a dialog's focus trap or a text field's label-and-error wiring, you compose tested components and adjust them through a central theme, which keeps spacing, colour and typography uniform across the app.\n\nThe nuance an interviewer may probe is the trade-off: a design-system library adds bundle weight and an opinionated styling layer, and deep customisation means learning its theming and `sx` conventions. It is the right tool when you want Material Design quickly; a lighter headless library may fit better when you need full control over markup and styles.",
    interviewLine: "MUI is a React component library implementing Material Design, accessible, themeable components so I compose a consistent UI instead of rebuilding primitives like dialogs and inputs.",
    misconception: "Reading 'Material' as hardware, graphics or an OS feature. MUI is purely a React UI component and theming library implementing Google's Material Design.",
    hints: [
      "Focus on what kind of artefact a React developer installs and renders.",
      "Ask what problem a pre-built component and theming system solves.",
      "It lives in the React UI layer, not in hardware, databases or operating systems."
    ],
    example: {
      caption: "Prebuilt, themeable components compose directly in JSX.",
      language: "tsx",
      code: "import { Button, TextField, Stack } from \"@mui/material\";\n\nfunction LoginForm() {\n  return (\n    <Stack spacing={2}>\n      <TextField label=\"Email\" type=\"email\" />\n      <TextField label=\"Password\" type=\"password\" />\n      <Button variant=\"contained\">Sign in</Button>\n    </Stack>\n  );\n}"
    },
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "typescript-what-is-reconciliation-in-react",
    title: "What is Reconciliation in React?",
    prompt: "What is Reconciliation in React?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "rendering-keys",
    tags: [
      "typescript",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An authentication protocol that encrypts user credentials as they travel between client and server.",
        isCorrect: false,
        explanation: "This invents a security role; reconciliation is about diffing element trees to update the DOM, not transporting credentials."
      },
      {
        id: "B",
        text: "React's diffing algorithm that compares the new and old element trees to compute minimal DOM updates.",
        isCorrect: true,
        explanation: "Correct. Type- and key-based heuristics bring the diff to near O(n), and Fiber makes the work interruptible so urgent updates stay responsive."
      },
      {
        id: "C",
        text: "An exhaustive tree diff that compares every node in one tree against every node in the other.",
        isCorrect: false,
        explanation: "That describes the O(n^3) general tree diff React deliberately avoids; it uses heuristics to reach roughly linear time instead."
      },
      {
        id: "D",
        text: "A sorting algorithm that orders database rows alphabetically before they are rendered to a table.",
        isCorrect: false,
        explanation: "This confuses UI diffing with data sorting; reconciliation compares element trees, it does not order rows."
      }
    ],
    correctAnswer: "B",
    explanation: "Reconciliation is the process React runs when state or props change: it builds a new tree of elements, compares it against the previous one, and computes the minimal set of real DOM mutations to apply. A naive tree diff is O(n^3), so React uses heuristics to get it down to roughly O(n): if two elements have different types it replaces the subtree rather than diffing into it, and within a list it uses `key` to match elements across renders.\n\nThose heuristics are why `key` matters so much. A stable, identity-based key lets React recognise that an item moved rather than that everything after an insertion changed, which preserves component state and avoids needless remounts. Using the array index as a key defeats this whenever the list reorders.\n\nThe senior nuance is Fiber, the implementation that makes reconciliation interruptible. By breaking the work into units that can be paused, prioritised and resumed, React can keep high-priority updates (like typing) responsive and yield to the browser instead of blocking the main thread on a large tree.",
    interviewLine: "I'd explain reconciliation as diffing the new element tree against the old with type- and key-based heuristics to reach near O(n), and Fiber as what makes that work interruptible so urgent updates stay responsive.",
    misconception: "Thinking React compares the real DOM, or that it runs a full O(n^3) tree diff. It diffs element trees using type and key heuristics, and Fiber lets that work be paused.",
    hints: [
      "Ask what React compares against what when state changes.",
      "Consider how React decides an element is the same one between two renders.",
      "A full tree-to-tree diff would be cubic; React avoids that with heuristics."
    ],
    example: {
      caption: "A stable key lets reconciliation match items across renders instead of remounting them.",
      language: "tsx",
      code: "function List({ items }: { items: { id: string; label: string }[] }) {\n  // key={item.id} preserves each row's identity when the list reorders;\n  // key={index} would make React treat a reorder as content changes\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.label}</li>\n      ))}\n    </ul>\n  );\n}"
    },
    source: "150-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "typescript-props-data-in-one-way-flow",
    title: "Props: Data In, One-Way Flow",
    prompt: "Props: Data In, One-Way Flow, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props flow parent to child as read-only inputs; a child requests changes through callbacks passed down.",
        isCorrect: true,
        explanation: "Correct. Unidirectional flow gives every value one owner, and children ask for changes via callbacks rather than mutating what they receive."
      },
      {
        id: "B",
        text: "Props are serialised and sent over a WebSocket to the backend server on every component render.",
        isCorrect: false,
        explanation: "This invents a network step; props are passed in memory between components in the tree, never transmitted on render."
      },
      {
        id: "C",
        text: "A child updates its parent by assigning new values directly to `props.data` on the object it got.",
        isCorrect: false,
        explanation: "Tempting because JavaScript allows the assignment, but props are read-only; mutating them does not re-render and leaves the parent's value stale."
      },
      {
        id: "D",
        text: "Props use automatic two-way binding, so edits in a child flow back up to the parent on every property.",
        isCorrect: false,
        explanation: "This imports a two-way-binding model from other frameworks; React is deliberately one-way, with explicit callbacks for upward requests."
      }
    ],
    correctAnswer: "A",
    explanation: "Props are the read-only inputs a parent passes to a child. Data flows in one direction, down the tree, and the child may read its props but must never reassign them. This unidirectional flow is what makes a React UI predictable: to find why a value is what it is, you follow it up to the parent that owns it, not sideways between siblings.\n\nWhen a child needs to cause a change, it does not reach back up and mutate; the parent passes a callback prop, and the child invokes it to request the update. The parent owns the state and decides how to apply the change, then the new value flows back down as a prop on the next render.\n\nThe nuance an interviewer probes is why mutating a prop is a bug even though JavaScript lets you. React does not re-render because you edited a prop object, and the parent still holds the old value, so the UI and the data silently diverge. Lifting state up and passing callbacks keeps a single owner for every piece of state.",
    interviewLine: "I describe props as read-only inputs flowing parent to child, where a child requests changes through a callback prop rather than mutating, so every value has one clear owner.",
    misconception: "Thinking a child can update a parent by assigning to its props. Props are read-only; the child must call a callback the parent passed so the parent updates its own state.",
    hints: [
      "Ask which direction data is allowed to travel between parent and child.",
      "Think about how a child asks its parent to change something it does not own.",
      "Editing a prop object does not trigger a re-render or update the parent."
    ],
    example: {
      caption: "The child never mutates; it calls the callback the parent owns.",
      language: "tsx",
      code: "function Parent() {\n  const [name, setName] = useState(\"Ada\");\n  return <Child name={name} onRename={setName} />;\n}\n\nfunction Child({ name, onRename }: { name: string; onRename: (n: string) => void }) {\n  // name is read-only; request a change via the callback\n  return <button onClick={() => onRename(\"Grace\")}>{name}</button>;\n}"
    },
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-build-a-page-switcher-mapping-props-to-components-clean",
    title: "Build a Page Switcher, Mapping Props to Components Cleanly",
    prompt: "Build a Page Switcher, Mapping Props to Components Cleanly, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Map page keys to components in a typed object and render `<Comp {...props} />`, composable with `React.lazy`.",
        isCorrect: true,
        explanation: "Correct. A keyed lookup stays flat as pages grow, is type-safe against unknown keys, and code-splits cleanly behind `Suspense`."
      },
      {
        id: "B",
        text: "Write a long chain of nested `if/else` branches that set `document.body.innerHTML` for each page.",
        isCorrect: false,
        explanation: "Tempting as 'simple', but writing to `innerHTML` bypasses React's rendering and lifecycle, and the conditional chain grows with every page."
      },
      {
        id: "C",
        text: "Use `eval()` to run JSX source strings fetched from a remote URL for whichever page is active.",
        isCorrect: false,
        explanation: "This is insecure and slow, and executing fetched code has nothing to do with cleanly selecting a component by key."
      },
      {
        id: "D",
        text: "Create a separate static `index.html` per page and do a full browser reload on each switch.",
        isCorrect: false,
        explanation: "Full reloads throw away single-page-app benefits and reset client state; switching should swap components in place, not reload the document."
      }
    ],
    correctAnswer: "A",
    explanation: "The clean pattern for switching between pages is a lookup object that maps an identifier to a component, then rendering the resolved component dynamically. A capitalised variable holds the component so JSX treats it as a component rather than an HTML tag: `const Comp = PAGES[page] ?? NotFound; return <Comp {...props} />`. Adding a page is one entry in the map, with no growing chain of conditionals.\n\nTyped with a key union, the registry becomes safe: `page` can only be a known key, and passing an unknown one is a compile error. The same map composes cleanly with `React.lazy`, so each page can be code-split and loaded on demand behind a `Suspense` boundary.\n\nThe nuance worth stating is where this pattern ends. For anything a user should be able to link to, bookmark or navigate with the back button, a router (route-driven switching) is the right tool, because it ties the view to the URL. The lookup map is for internal, non-navigable view switching, tabs, wizard steps, where a URL would be overkill.",
    interviewLine: "I map page keys to components in a typed lookup object and render `<Comp {...props} />`, which stays flat as pages grow and composes directly with `React.lazy` for code splitting.",
    misconception: "Reaching for a long if/else or switch chain, or mutating the DOM by hand. A typed lookup object keeps switching flat, type-safe and easy to code-split.",
    hints: [
      "Think about how to pick a component without a growing conditional chain.",
      "Ask why the resolved component must be assigned to a capitalised variable.",
      "For anything linkable or bookmarkable, a router fits better than a bare map."
    ],
    example: {
      caption: "A typed registry resolves the component; lazy loading composes on top.",
      language: "tsx",
      code: "const PAGES = {\n  home: lazy(() => import(\"./Home\")),\n  about: lazy(() => import(\"./About\")),\n} as const;\n\nfunction Router({ page }: { page: keyof typeof PAGES }) {\n  const Comp = PAGES[page];\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Comp />\n    </Suspense>\n  );\n}"
    },
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-static-typing-with-hooks-typescript-patterns-and-exampl",
    title: "Static Typing with Hooks, TypeScript Patterns and Examples",
    prompt: "Static Typing with Hooks, TypeScript Patterns and Examples, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "hooks",
    tags: [
      "typescript",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks reject TypeScript entirely and can only be called from plain untyped JavaScript files.",
        isCorrect: false,
        explanation: "This is simply false; hooks ship first-class generic types in `@types/react` and are used in typed code everywhere."
      },
      {
        id: "B",
        text: "Only `useEffect` is typed; every other hook must annotate its state and return values as `any`.",
        isCorrect: false,
        explanation: "Tempting if you have only typed effects, but all built-in hooks are generically typed, with inference handling most cases."
      },
      {
        id: "C",
        text: "The TypeScript compiler strips every hook call during compilation, so they never run at runtime.",
        isCorrect: false,
        explanation: "This confuses type erasure with code removal; types are erased, but the hook calls themselves are ordinary runtime JavaScript."
      },
      {
        id: "D",
        text: "Hooks are generically typed: `useState<User | null>`, action unions in `useReducer`, `useRef<HTMLInputElement>`.",
        isCorrect: true,
        explanation: "Correct. Inference covers most calls, and an explicit generic is added only when the initial value underspecifies the state or ref type."
      }
    ],
    correctAnswer: "D",
    explanation: "React's hooks are fully typed through `@types/react`, and most of the time inference does the work: `useState(0)` gives `number`, `useState(\"\")` gives `string`. You reach for an explicit generic only when the initial value does not describe the full type, the classic case being `useState<User | null>(null)`, where the initial `null` would otherwise narrow the state to just `null`.\n\nThe other hooks follow the same shape. `useReducer` is typed by giving its reducer a state type and an action union, so `dispatch` only accepts valid actions and the state is narrowed inside each case. `useRef<HTMLInputElement>(null)` types the ref so `ref.current` is `HTMLInputElement | null`, forcing a null check before you touch the node.\n\nThe nuance worth raising is the difference between a value ref and a DOM ref: `useRef<number>(0)` gives a mutable `{ current: number }` you can write to freely, while a DOM ref starts `null` until React attaches the element, which is exactly why its type includes `null`.",
    interviewLine: "I let inference type most hooks and add a generic only when the initial value is too narrow, like `useState<User | null>(null)` or `useRef<HTMLInputElement>(null)`.",
    misconception: "Thinking hooks need `any` or special handling to work with TypeScript. They are generically typed; you add an explicit type parameter only when the initial value underspecifies the state.",
    hints: [
      "Ask when inference from the initial value is enough and when it is not.",
      "Think about what `useState(null)` infers if the eventual value is an object.",
      "A DOM ref is `null` until React attaches it, which its type has to reflect."
    ],
    example: {
      caption: "An explicit generic widens the state beyond what the initial value would infer.",
      language: "tsx",
      code: "type User = { id: string; name: string };\n\nfunction Profile() {\n  const [user, setUser] = useState<User | null>(null); // not just null\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    inputRef.current?.focus(); // null-checked by the type\n  }, []);\n\n  return <input ref={inputRef} onChange={() => setUser({ id: \"1\", name: \"Ada\" })} />;\n}"
    },
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "typescript-what-are-the-recommended-ways-for-static-type-checking",
    title: "What are the recommended ways for static type checking?",
    prompt: "What are the recommended ways for static type checking?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Scatter `console.log` calls through component bodies and read the values while the app runs.",
        isCorrect: false,
        explanation: "This is runtime inspection after the fact, not static checking; it verifies nothing automatically and never fails a build."
      },
      {
        id: "B",
        text: "Use TypeScript (or Flow) for compile-time type validation, autocomplete and safe refactoring across the app.",
        isCorrect: true,
        explanation: "Correct. A static checker catches mismatches at build time and erases the types from the bundle, with no runtime cost."
      },
      {
        id: "C",
        text: "Open the compiled JavaScript in a hex editor and inspect the bytes before each deployment.",
        isCorrect: false,
        explanation: "This is nonsensical for type checking; static analysis is done by a compiler and language server, not by reading binary output."
      },
      {
        id: "D",
        text: "Disable type checking entirely so the code runs faster without the compiler getting in the way.",
        isCorrect: false,
        explanation: "Tempting as a speed shortcut, but static checking runs at build time only and prevents the runtime crashes that cost far more."
      }
    ],
    correctAnswer: "B",
    explanation: "For static type checking in a React codebase, the recommended tool is TypeScript (Flow is the older alternative). A static checker runs at compile time: it reads your annotations, verifies that values, props and hook usage match, and reports mismatches before the code ever executes, while adding editor autocomplete and safe refactoring across the project.\n\nThe word 'static' is the key distinction. The check happens as you build, not while the app runs in front of a user, and the types are erased from the output, so there is no runtime cost and no bundle weight. This is categorically stronger than inspecting values with logs or ad-hoc runtime guards.\n\nThe nuance to state is that the older `PropTypes` approach was a runtime checker, not a static one, and it is deprecated in React 19. Static checking with TypeScript catches the same errors earlier and across far more than just props, which is why it is the default in modern React tooling.",
    interviewLine: "I use TypeScript for static checking: it verifies types at build time and erases them from the bundle, catching mismatches before the app runs rather than warning at runtime like PropTypes.",
    misconception: "Treating runtime PropTypes or console inspection as static type checking. Static checking happens at compile time with TypeScript or Flow, before the code runs, at zero runtime cost.",
    hints: [
      "Separate checks that run at build time from ones that run while the app executes.",
      "Ask what the user's browser pays for each approach.",
      "Inspecting a value at runtime is not the same as verifying a type statically."
    ],
    example: {
      caption: "The static checker rejects the mismatch at build time, before anything runs.",
      language: "typescript",
      code: "function total(prices: number[]): number {\n  return prices.reduce((sum, p) => sum + p, 0);\n}\n\ntotal([10, 20, 30]);  // ok\n// total([\"10\", \"20\"]); // compile error: string[] is not number[]"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "performance-how-to-enable-production-mode-in-react",
    title: "How to enable production mode in React?",
    prompt: "How to enable production mode in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "types",
    tags: [
      "performance",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Build with `NODE_ENV=production` so the bundler strips React's dev warnings, checks and extra bookkeeping.",
        isCorrect: true,
        explanation: "Correct. The bundler inlines the flag and dead-code-eliminates the development-only paths, producing a smaller, faster minified build."
      },
      {
        id: "B",
        text: "Add a `production={true}` attribute to every top-level HTML element the app renders.",
        isCorrect: false,
        explanation: "This confuses a global build flag with per-element markup; production mode is set once at build time, not as a JSX attribute."
      },
      {
        id: "C",
        text: "Switch on a 'Production Browser Mode' option in the end user's browser settings.",
        isCorrect: false,
        explanation: "Tempting if you think the browser decides, but the optimisation happens when you build the bundle, not in the user's browser."
      },
      {
        id: "D",
        text: "Purchase a paid production license from Meta to unlock the optimised React runtime.",
        isCorrect: false,
        explanation: "React is free and MIT-licensed; there is no paid tier, and production mode is purely a build configuration."
      }
    ],
    correctAnswer: "A",
    explanation: "You enable React's production mode by building with `NODE_ENV` set to `production`. Modern tooling, Next.js, Vite, webpack in production configs, does this for you when you run the production build command. React reads `process.env.NODE_ENV`, and when it is `production` the development-only code paths are compiled out.\n\nThe mechanism is dead-code elimination. Bundlers inline `process.env.NODE_ENV` as the literal string `\"production\"`, so blocks guarded by `if (process.env.NODE_ENV !== 'production')` become statically false and the minifier strips them, along with the warnings, prop checks and the extra bookkeeping that `StrictMode`'s double-invocation relies on. The result is a smaller, faster bundle.\n\nThe nuance worth raising is that this is a build-time switch, not a runtime one: you cannot flip it in the browser or with a prop. Shipping a development build to production is a common and expensive mistake, since it keeps all the warnings and slow paths; the React DevTools badge tells you which build is actually running.",
    interviewLine: "I treat production mode as a build-time switch: `NODE_ENV=production` lets the bundler dead-code-eliminate React's dev warnings and checks, which my tooling does automatically on a production build.",
    misconception: "Thinking production mode is a runtime toggle, a prop, a browser setting or a license. It is a build-time `NODE_ENV` flag the bundler uses to strip development-only code.",
    hints: [
      "Ask at what point in the pipeline this is decided, build time or runtime.",
      "Think about how the bundler strips the warning code paths out.",
      "It is not a prop, a browser setting, or something you buy."
    ],
    example: {
      caption: "The bundler inlines the flag so the guarded block is statically dead and stripped.",
      language: "javascript",
      code: "if (process.env.NODE_ENV !== \"production\") {\n  console.warn(\"dev-only warning\");\n}\n// after a production build the condition is literally\n// if (\"production\" !== \"production\") { ... }  -> removed by the minifier"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-pointer-events-supported-in-react",
    title: "What are the Pointer Events supported in React?",
    prompt: "What are the Pointer Events supported in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A unified set of input events, `onPointerDown`, `onPointerMove`, `onPointerUp`, `onPointerCancel`, enter/leave.",
        isCorrect: true,
        explanation: "Correct. One device-agnostic model covers mouse, touch and pen, each event carrying a `pointerType` and `pointerId`."
      },
      {
        id: "B",
        text: "Events that fire only when a dedicated laser-pointer hardware device is connected to the machine.",
        isCorrect: false,
        explanation: "This misreads 'pointer' as a laser; Pointer Events abstract ordinary input devices like mouse, touch and stylus."
      },
      {
        id: "C",
        text: "Events that report the memory pointer addresses of objects, as `*` and `&` do in C or C++.",
        isCorrect: false,
        explanation: "This confuses UI input with memory pointers; Pointer Events are about user interaction, not addresses."
      },
      {
        id: "D",
        text: "A legacy API that React DOM dropped, so pointer interactions must use mouse and touch events instead.",
        isCorrect: false,
        explanation: "Tempting if you assume only mouse/touch exist, but React DOM fully supports the W3C Pointer Events specification."
      }
    ],
    correctAnswer: "A",
    explanation: "Pointer Events are a single, device-agnostic input model. Instead of handling mouse, touch and pen separately, one set of events covers all of them, and each event carries a `pointerType` (`\"mouse\"`, `\"touch\"` or `\"pen\"`) plus pressure, tilt and `pointerId`. React DOM exposes them as camelCased props: `onPointerDown`, `onPointerMove`, `onPointerUp`, `onPointerCancel`, `onPointerEnter`, `onPointerLeave`, `onPointerOver`, `onPointerOut`, and the capture pair `onGotPointerCapture` / `onLostPointerCapture`.\n\nIn practice this replaces the old pattern of wiring up mouse and touch handlers side by side and reconciling their differences. One `onPointerMove` handler works for a mouse drag, a finger swipe and a stylus stroke, and `pointerId` lets you track several simultaneous touches cleanly.\n\nThe nuance worth stating is browser support and `onPointerCancel`: the spec is supported in current browsers, and `pointercancel` fires when the system takes over the gesture (for example the browser starts scrolling), so robust drag code must handle it, not just `pointerup`.",
    interviewLine: "I reach for Pointer Events as one device-agnostic model \u2014 `onPointerDown/Move/Up` and friends, with a `pointerType` and `pointerId` \u2014 so a single handler covers mouse, touch and pen.",
    misconception: "Reading 'pointer' as a laser pointer or a C-style memory pointer. Pointer Events are a unified input model for mouse, touch and pen, exposed by React DOM.",
    hints: [
      "Think about what kinds of input devices a single event model would unify.",
      "Ask how one handler could serve a mouse, a finger and a stylus at once.",
      "This is about user input, not hardware pointers or memory addresses."
    ],
    example: {
      caption: "One handler branches on pointerType instead of separate mouse and touch code.",
      language: "tsx",
      code: "function Canvas() {\n  function handleDown(e: React.PointerEvent<HTMLDivElement>) {\n    console.log(e.pointerType, e.pointerId); // \"mouse\" | \"touch\" | \"pen\"\n  }\n  return <div onPointerDown={handleDown} onPointerCancel={() => {}} />;\n}"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "javascript-how-to-loop-inside-jsx",
    title: "How to loop inside JSX?",
    prompt: "How to loop inside JSX?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "types",
      "junior"
    ],
    codeSnippet: "<tbody>\n  {items.map((item) => (\n    <SomeComponent key={item.id} name={item.name} />\n  ))}\n</tbody>\n\n<tbody>\nfor (let i = 0; i < items.length; i++) {\n  <SomeComponent key={items[i].id} name={items[i].name} />\n}\n</tbody>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Call `Array.prototype.map` returning keyed elements; a `for` statement cannot go inline in JSX braces.",
        isCorrect: true,
        explanation: "Correct. JSX braces accept expressions, and `map` returns an array of elements, whereas `for` is a statement that cannot be interpolated."
      },
      {
        id: "B",
        text: "You cannot iterate arrays in JSX at all; lists must be written out element by element by hand.",
        isCorrect: false,
        explanation: "This is false; mapping an array to elements is the standard way React renders dynamic lists."
      },
      {
        id: "C",
        text: "Place a `while (condition)` loop inside the JSX braces to keep appending elements until it ends.",
        isCorrect: false,
        explanation: "Tempting as another loop form, but `while` is also a statement and still cannot sit inside a JSX expression slot."
      },
      {
        id: "D",
        text: "Write a `for (let i = 0; i < items.length; i++)` loop directly between the JSX tags themselves.",
        isCorrect: false,
        explanation: "This is the exact trap: a `for` statement cannot appear inside JSX braces, which only evaluate expressions."
      }
    ],
    correctAnswer: "A",
    explanation: "Inside JSX you render a list with `Array.prototype.map`, returning one element per item and giving each a stable `key`. The reason a bare `for` loop does not work is structural: JSX curly braces accept a JavaScript expression, something that evaluates to a value, and a `for` statement is a statement, not an expression. `map` returns an array of elements, which JSX renders directly.\n\nThis follows from how JSX compiles. `<li>{...}</li>` becomes a function call whose children are the evaluated contents of the braces, and you cannot drop a statement into an argument position. If you prefer an imperative loop, you run it before the `return`, push elements into an array, and then interpolate that array.\n\nThe nuance worth stating is `key`. It must be a stable identity from your data, not the array index, so React can match elements across renders during reconciliation; an index key breaks that matching the moment the list reorders or has items inserted.",
    interviewLine: "I render lists with `map` because JSX braces take an expression, not a statement, so a `for` loop can't go inline; each element gets a stable `key` from the data.",
    misconception: "Thinking a `for` loop can be written directly inside JSX braces. Braces accept expressions only; `map` returns an array of elements, while `for` is a statement.",
    hints: [
      "Ask what kind of thing JSX curly braces are allowed to contain.",
      "Consider the difference between a statement and an expression here.",
      "If you want an imperative loop, build the array before the return."
    ],
    example: {
      caption: "An imperative loop works only before the return, pushing into an array JSX then renders.",
      language: "tsx",
      code: "function NumberList({ to }: { to: number }) {\n  const items = [];\n  for (let i = 1; i <= to; i++) {\n    items.push(<li key={i}>{i}</li>); // built before return\n  }\n  return <ul>{items}</ul>;\n}"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "react-what-is-react-proptype-array-with-shape",
    title: "What is React proptype array with shape?",
    prompt: "What is React proptype array with shape?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "ReactComponent.propTypes = {\n  arrayWithShape: React.PropTypes.arrayOf(\n    React.PropTypes.shape({\n      color: React.PropTypes.string.isRequired,\n      fontSize: React.PropTypes.number.isRequired,\n    }),\n  ).isRequired,\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A sorting helper that reorders the items of an array by one of their fields, such as color.",
        isCorrect: false,
        explanation: "This reads 'shape' as sorting, but `arrayOf(shape(...))` validates structure; it never reorders anything."
      },
      {
        id: "B",
        text: "A method that draws 3D geometric shapes into an HTML5 `<canvas>` from array data.",
        isCorrect: false,
        explanation: "This confuses the word 'shape' with graphics; it is a prop-validation schema, unrelated to canvas drawing."
      },
      {
        id: "C",
        text: "Nest `PropTypes.arrayOf(PropTypes.shape({ ... }))` to validate that each array item matches a schema.",
        isCorrect: true,
        explanation: "Correct. `arrayOf` applies its inner validator to every element, so a `shape` inside it checks each object's structure."
      },
      {
        id: "D",
        text: "A validator for backend SQL query result sets, checking each returned database row's columns.",
        isCorrect: false,
        explanation: "Tempting because 'schema' sounds database-like, but PropTypes is a client-side React prop validator, not a SQL tool."
      }
    ],
    correctAnswer: "C",
    explanation: "In the `prop-types` library you validate an array of objects by nesting validators: `PropTypes.arrayOf(PropTypes.shape({ ... }))`. `arrayOf` asserts the prop is an array and applies its inner validator to every element, and `shape` describes the expected object structure field by field. Together they check that each item in the array matches the given schema, warning in development when one does not.\n\nThe mechanism is composition: both are higher-order validators that take another validator as an argument, so you can go deeper (`arrayOf(shape({ tags: arrayOf(string) }))`) to describe nested data. `.isRequired` can be attached at any level to reject a missing value there.\n\nThe nuance worth stating is that `prop-types` is a runtime checker and is deprecated in React 19. The modern equivalent is a TypeScript array-of-object type, which expresses the same shape and checks it at compile time instead of warning at runtime.",
    interviewLine: "I nest `PropTypes.arrayOf(PropTypes.shape({ ... }))` to validate an array of objects against a schema, though in modern code I'd express that as a TypeScript object-array type instead.",
    misconception: "Thinking `arrayOf` and `shape` are standalone or unrelated. They compose: `arrayOf` applies its inner validator, here a `shape` schema, to every element of the array.",
    hints: [
      "Ask how you describe one object's structure, then how you say 'an array of those'.",
      "Think about validators that take another validator as their argument.",
      "The modern equivalent is a TypeScript array-of-object type checked at compile time."
    ],
    example: {
      caption: "The TypeScript equivalent of arrayOf(shape(...)) is an object-array type.",
      language: "tsx",
      code: "type Style = { color: string; fontSize: number };\n\nfunction Legend({ styles }: { styles: Style[] }) {\n  return <>{styles.map((s, i) => <span key={i} style={s} />)}</>;\n}\n// <Legend styles={[{ color: \"red\" }]} /> is a compile error: fontSize missing"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "javascript-what-are-the-approaches-to-include-polyfills-in-your-cr",
    title: "What are the approaches to include polyfills in your create-react-app?",
    prompt: "What are the approaches to include polyfills in your create-react-app?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "types",
      "junior"
    ],
    codeSnippet: "import 'core-js/fn/array/find';\n   import 'core-js/fn/array/includes';\n   import 'core-js/fn/number/is-nan';\n\n<script src=\"https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes\"></script>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Import `core-js` features at the entry point `index.js`, or add a polyfill CDN `<script>` in `index.html`.",
        isCorrect: true,
        explanation: "Correct. Loading the polyfills before any app code ensures the missing ECMAScript APIs exist by the time React runs."
      },
      {
        id: "B",
        text: "Flash updated firmware onto the user's computer motherboard so the browser gains the missing APIs.",
        isCorrect: false,
        explanation: "This confuses software shims with hardware; polyfills are JavaScript loaded by the page, nothing to do with firmware."
      },
      {
        id: "C",
        text: "Avoid polyfills entirely, since modern browsers make them unnecessary in all deployment targets.",
        isCorrect: false,
        explanation: "Tempting if you only test current browsers, but polyfills remain essential whenever you support environments lacking a feature."
      },
      {
        id: "D",
        text: "Write the polyfills in Python and compile them to run alongside the JavaScript bundle.",
        isCorrect: false,
        explanation: "This is a category error; polyfills are JavaScript that patches missing browser APIs, not code in another language."
      }
    ],
    correctAnswer: "A",
    explanation: "There are two main approaches. The first is to import polyfills at the application entry point: install `core-js` and `import 'core-js/stable'` (or import only the specific features you need) at the top of `index.js`, before any application code. Because the entry module runs first, the missing APIs, `Promise`, `Array.prototype.includes`, `Object.assign`, exist by the time React executes.\n\nThe second is a hosted polyfill service: add a `<script>` to `index.html` pointing at a CDN that inspects the browser's `User-Agent` and returns only the polyfills that browser actually lacks. You list the features you want, and modern browsers receive little or nothing.\n\nThe nuance worth stating is the trade-off. Bundling polyfills makes delivery self-contained but ships code even to browsers that do not need it, which is why targeted imports and build-time browser targets matter; the hosted service keeps modern browsers lean but adds a third-party request on the critical path. Either way, polyfills must load before the code that depends on them.",
    interviewLine: "I either import `core-js` features at the entry point before any app code, or load a browser-targeted polyfill CDN in `index.html`, so the missing APIs exist before React runs.",
    misconception: "Thinking polyfills are banned, hardware-level, or language-specific. They are ordinary JavaScript that must simply be loaded before the code relying on the APIs they provide.",
    hints: [
      "Ask where the polyfill must run relative to the code that needs the API.",
      "Consider the difference between bundling features and fetching them per browser.",
      "The question is about loading JavaScript shims, not firmware or another language."
    ],
    example: {
      caption: "Importing the polyfill first guarantees the API exists before app code runs.",
      language: "javascript",
      code: "// index.js, before any app imports\nimport \"core-js/stable\";\nimport \"./app\";\n\n// now older browsers have Array.prototype.includes, Promise, etc.\n[1, 2, 3].includes(2); // safe even where it was missing natively"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "react-what-are-the-common-folder-structures-for-react",
    title: "What are the common folder structures for React?",
    prompt: "What are the common folder structures for React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "common/\n    Avatar.js\n    Avatar.css\n    APIUtils.js\n    APIUtils.test.js\n   feed/\n    index.js\n    Feed.js\n    Feed.css\n    FeedStory.js\n    FeedStory.test.js\n    FeedAPI.js\n   profile/\n    index.js\n    Profile.js\n    ProfileHeader.js\n    ProfileHeader.css\n    ProfileAPI.js\n\napi/\n    APIUtils.js\n    APIUtils.test.js\n    ProfileAPI.js\n    UserAPI.js\n   components/\n    Avatar.js\n    Avatar.css\n    Feed.js\n    Feed.css\n    FeedStory.js\n    FeedStory.test.js\n    Profile.js\n    ProfileHeader.js\n    ProfileHeader.css",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Group by feature or route, co-locating a domain's files, or group by file type (`components/`, `hooks/`).",
        isCorrect: true,
        explanation: "Correct. These are the two dominant conventions; feature grouping scales better by keeping code that changes together in one place."
      },
      {
        id: "B",
        text: "React enforces one mandatory folder layout and throws a build error if you deviate from it.",
        isCorrect: false,
        explanation: "This is false; React is unopinionated about structure, leaving the choice to the team."
      },
      {
        id: "C",
        text: "Keep every file flat in a single root folder with no subdirectories, however large the project.",
        isCorrect: false,
        explanation: "Tempting for a tiny demo, but a flat folder becomes unnavigable as the codebase grows; both real conventions subdivide."
      },
      {
        id: "D",
        text: "Organise files strictly by their size in kilobytes, grouping the largest and smallest together.",
        isCorrect: false,
        explanation: "File size is irrelevant to organisation; structures group by domain responsibility or technical role, not bytes."
      }
    ],
    correctAnswer: "A",
    explanation: "React is unopinionated about file layout, so two conventions dominate. Grouping by feature (or route) keeps everything for one domain together, its components, styles, hooks and tests live in the same folder, so a change to that feature touches one place. Grouping by file type puts all components in `components/`, all hooks in `hooks/`, all services in `services/`, organising by technical role instead.\n\nThe practical difference is how each scales. Feature grouping localises change and keeps related code co-located as the app grows, which is why larger codebases trend toward it. Type grouping is simpler to reason about in small projects but tends to scatter a single feature across many top-level folders as the app expands.\n\nThe nuance worth stating is that neither is enforced and the two are often blended: a feature folder internally grouped by type. The real goal is minimising the distance between files that change together, not following a rule for its own sake.",
    interviewLine: "I pick between grouping by feature, co-locating a domain's components, hooks and tests, or by file type; feature grouping scales better because it keeps code that changes together in one place.",
    misconception: "Believing React mandates a specific folder structure. It is unopinionated; teams choose feature-based or type-based layouts, or a blend, based on scale.",
    hints: [
      "Ask whether files are grouped by what they do or by what domain they belong to.",
      "Think about which layout keeps code that changes together in one place.",
      "React does not enforce any particular structure here."
    ],
    example: {
      caption: "Feature grouping co-locates everything a single domain needs.",
      language: "json",
      code: "{\n  \"src/features/checkout\": [\n    \"Checkout.tsx\",\n    \"Checkout.test.tsx\",\n    \"useCart.ts\",\n    \"checkout.api.ts\"\n  ],\n  \"src/features/profile\": [\"Profile.tsx\", \"useProfile.ts\"]\n}"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-downsides-of-redux-compared-to-flux",
    title: "What are the downsides of Redux compared to Flux?",
    prompt: "What are the downsides of Redux compared to Flux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux erases the user's hard drive whenever one of its reducers accidentally returns `undefined`.",
        isCorrect: false,
        explanation: "This is absurd; a reducer returning `undefined` just logs a console error, with no effect on the filesystem."
      },
      {
        id: "B",
        text: "Redux runs only on Linux servers and throws an error when loaded inside a web browser.",
        isCorrect: false,
        explanation: "This invents a platform limit; Redux is plain JavaScript that runs in browsers, Node and mobile alike."
      },
      {
        id: "C",
        text: "Strict immutability and more action/reducer boilerplate (both largely eased by Redux Toolkit's Immer).",
        isCorrect: true,
        explanation: "Correct. These are the real compromises versus Flux's looser model, and Redux Toolkit folds in Immer and generators to remove most of them."
      },
      {
        id: "D",
        text: "Redux disables every React hook in the application, forcing a return to class components.",
        isCorrect: false,
        explanation: "Tempting if you only know connect-based Redux, but React-Redux ships `useSelector` and `useDispatch` as first-class hooks."
      }
    ],
    correctAnswer: "C",
    explanation: "The trade-offs of Redux over Flux are mostly about discipline and ceremony. Redux leans hard on immutability: reducers must return new state rather than mutate, and many ecosystem tools assume you never mutate, so you either copy carefully by hand or reach for a helper. Flux, by contrast, is unopinionated about mutation.\n\nThe second cost is boilerplate: action types, action creators, reducers and store wiring add up, and because Flux solves fewer problems itself, Redux's richer middleware and store-enhancer ecosystem is more to learn and choose from. In practice Redux Toolkit has largely erased this, bundling Immer so you can write 'mutating' logic that stays immutable, and generating action creators and types for you.\n\nThe nuance worth stating is that these are compromises, not disqualifiers. The same single-store, pure-reducer model that creates the ceremony is exactly what gives Redux its predictability, time-travel debugging and testability, which is why the boilerplate was considered a worthwhile exchange even before Toolkit reduced it.",
    interviewLine: "I'd name Redux's costs versus Flux as its strict immutability and action/reducer boilerplate, then note that I lean on Redux Toolkit to fold in Immer and generators and remove most of it while keeping the single-store predictability.",
    misconception: "Treating Redux's boilerplate and immutability as flaws rather than the price of its predictable single-store model, a price Redux Toolkit has largely removed.",
    hints: [
      "Think about what Redux insists on that Flux leaves open.",
      "Ask what you must do by hand to avoid mutating state in a reducer.",
      "Consider how Redux Toolkit changes this comparison today."
    ],
    example: {
      caption: "Redux Toolkit uses Immer so this 'mutating' reducer stays immutable.",
      language: "typescript",
      code: "import { createSlice } from \"@reduxjs/toolkit\";\n\nconst todos = createSlice({\n  name: \"todos\",\n  initialState: [] as string[],\n  reducers: {\n    add(state, action: { payload: string }) {\n      state.push(action.payload); // Immer makes this immutable under the hood\n    },\n  },\n});"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-what-is-an-action-in-redux",
    title: "What is an action in Redux?",
    prompt: "What is an action in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "{\n  type: ADD_TODO,\n  text: 'Add todo item'\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A plain object describing an intended change, with a required `type` and optional payload data.",
        isCorrect: true,
        explanation: "Correct. Actions are the only input to the store; the reducer reads the `type` and payload to compute the next state."
      },
      {
        id: "B",
        text: "A stored procedure that runs inside a PostgreSQL database to persist each state change to disk.",
        isCorrect: false,
        explanation: "This moves the action into the database layer; actions are in-memory JavaScript objects dispatched on the client."
      },
      {
        id: "C",
        text: "A CSS rule that animates a button when the user triggers the corresponding interaction.",
        isCorrect: false,
        explanation: "This confuses an action with styling; actions describe state-change intent, not visual transitions."
      },
      {
        id: "D",
        text: "A synchronous infinite loop that blocks the main thread until the store finishes updating.",
        isCorrect: false,
        explanation: "Tempting if 'action' sounds like running code, but an action is passive data, not a loop or any executing process."
      }
    ],
    correctAnswer: "A",
    explanation: "An action is a plain JavaScript object that describes something that happened in the app. It must have a `type` field, a string identifier the reducers switch on, and may carry additional data, conventionally under `payload`. Actions are the only way information enters the store: nothing changes state except an action flowing through `dispatch` into the reducers.\n\nThat makes actions the event log of the application. Because they are plain, serialisable data, middleware can record, inspect, persist and replay them, which is what powers logging and time-travel debugging. The reducer, not the action, computes the next state; the action merely states intent.\n\nThe nuance an interviewer may probe is naming and shape conventions. Keeping `type` strings namespaced (`\"todos/add\"`) avoids collisions across slices, and keeping payloads plain, no functions, Promises or class instances, is what keeps actions serialisable and replayable.",
    interviewLine: "I describe an action as a serialisable object with a required `type` describing what happened \u2014 it's the only input to the store, and the reducer, not the action, computes the next state.",
    misconception: "Thinking an action itself changes state or may hold arbitrary runtime objects. It only describes intent as plain data, and the reducer applies the change when the action is dispatched.",
    hints: [
      "Identify the one field every action object must contain.",
      "Ask what role the action plays versus what the reducer does.",
      "An action states what happened; it does not apply the change itself."
    ],
    example: {
      caption: "A typed action union keeps type strings namespaced and payloads plain.",
      language: "typescript",
      code: "type TodoAction =\n  | { type: \"todos/add\"; payload: string }\n  | { type: \"todos/clear\" };\n\nconst add = (text: string): TodoAction => ({ type: \"todos/add\", payload: text });\ndispatch(add(\"ship it\")); // { type: \"todos/add\", payload: \"ship it\" }"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-what-is-the-difference-between-react-native-and-react",
    title: "What is the difference between React Native and React?",
    prompt: "What is the difference between React Native and React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Native is written in Swift and cannot share any JavaScript component code with React.",
        isCorrect: false,
        explanation: "This is false; React Native apps are written in JavaScript or TypeScript using the same React component model."
      },
      {
        id: "B",
        text: "There is no real difference between them; they are the same package under two marketing names.",
        isCorrect: false,
        explanation: "Tempting because they share React's core, but they render to entirely different targets, the browser DOM versus native widgets."
      },
      {
        id: "C",
        text: "React DOM renders to the browser DOM with HTML/CSS; React Native renders to native iOS and Android widgets.",
        isCorrect: true,
        explanation: "Correct. Both share React's component and hook model, but the rendering target differs: DOM elements versus native `<View>`/`<Text>` primitives."
      },
      {
        id: "D",
        text: "Plain React runs on mobile phones while React Native runs only on smart TVs and set-top boxes.",
        isCorrect: false,
        explanation: "This invents a device split; React Native targets native mobile (and desktop) platforms, while React DOM targets the browser."
      }
    ],
    correctAnswer: "C",
    explanation: "React is the library for building component trees; React DOM renders those components to the browser's DOM using HTML elements and CSS. React Native uses the same React core and component model but renders to native iOS and Android UI widgets instead, through primitives like `<View>`, `<Text>` and `<Image>` and a bridge/JSI layer that talks to the platform.\n\nSo what you reuse is the mental model, components, props, state and hooks, and what differs is the rendering target. There is no DOM in React Native, no `<div>` or CSS stylesheet; layout uses a Flexbox-based `StyleSheet` and platform components map to real native views.\n\nThe nuance worth stating is that 'learn once, write anywhere' is not 'write once, run anywhere': you reuse skills and often business logic, but the view layer and many platform APIs are distinct, so a web and a native app share patterns rather than the same component tree.",
    interviewLine: "I'd say React plus React DOM render components to the browser DOM, while React Native shares the same React core but renders to native iOS and Android views like `<View>` and `<Text>`.",
    misconception: "Thinking React Native renders HTML/CSS or is a different language. It reuses React's component model but renders to native platform widgets, with no DOM involved.",
    hints: [
      "Separate the component model you reuse from the thing each one renders to.",
      "Ask what `<View>` and `<Text>` map to that `<div>` and `<span>` do not.",
      "React Native shares React's core; the difference is the rendering target."
    ],
    example: {
      caption: "The same hooks and props, but native primitives instead of DOM elements.",
      language: "tsx",
      code: "import { View, Text, Pressable } from \"react-native\";\n\nfunction Counter() {\n  const [n, setN] = useState(0);\n  return (\n    <View>\n      <Text>{n}</Text>\n      <Pressable onPress={() => setN(n + 1)}><Text>+</Text></Pressable>\n    </View>\n  );\n}"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-flow",
    title: "What is Flow?",
    prompt: "What is Flow?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A physical water-cooling device fitted to servers to keep their processors from overheating.",
        isCorrect: false,
        explanation: "This reads 'Flow' as hardware; it is a software static analysis tool for JavaScript."
      },
      {
        id: "B",
        text: "A static type checker for JavaScript from Meta that annotates code to catch type errors at build time.",
        isCorrect: true,
        explanation: "Correct. Flow analyses annotated JavaScript at compile time, with strong null-safety, solving the same problem as TypeScript."
      },
      {
        id: "C",
        text: "A database system for ingesting and querying real-time video streams at large scale.",
        isCorrect: false,
        explanation: "This confuses the name with streaming infrastructure; Flow checks JavaScript source types, not data streams."
      },
      {
        id: "D",
        text: "A CSS animation framework for building liquid, fluid motion effects in the browser.",
        isCorrect: false,
        explanation: "Tempting because 'flow' suggests motion, but Flow is a type checker, unrelated to animation or styling."
      }
    ],
    correctAnswer: "B",
    explanation: "Flow is a static type checker for JavaScript, created at Meta. You add type annotations to variables, functions and components, and Flow analyses the code at build time to catch type errors before it runs, much like TypeScript. It is particularly known for strong null-safety: it tracks where a value can be `null` or `undefined` and forces you to handle those cases.\n\nThe key point is 'static': Flow checks as you build and the annotations are stripped from the output, so there is no runtime cost. Code is written in plain `.js` files with Flow syntax (often marked `// @flow`), rather than a separate language extension.\n\nThe nuance worth stating is adoption. Flow and TypeScript solve the same problem, but TypeScript has become the broad industry standard with far larger ecosystem and tooling support, so Flow is now mostly seen inside Meta's own codebases rather than in new external projects.",
    interviewLine: "I'd describe Flow as Meta's static type checker for JavaScript \u2014 build-time, null-aware, erased from output \u2014 solving the same problem as TypeScript, which I've seen become the industry standard.",
    misconception: "Reading 'Flow' as hardware, a database or an animation tool. It is a static type checker for JavaScript, conceptually alongside TypeScript.",
    hints: [
      "Focus on what kind of tool analyses code without running it.",
      "Ask what Flow and TypeScript have in common.",
      "It operates on JavaScript source at build time, not on data at runtime."
    ],
    example: {
      caption: "Flow annotations look similar to TypeScript and are checked at build time.",
      language: "javascript",
      code: "// @flow\nfunction greet(name /*: string */) /*: string */ {\n  return `Hi ${name}`;\n}\n\ngreet(\"Ada\");\n// greet(42); // Flow reports: number is incompatible with string"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-how-to-use-typescript-in-create-react-app-application",
    title: "How to use TypeScript in create-react-app application?",
    prompt: "How to use TypeScript in create-react-app application?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "npx create-react-app my-app, typescript\n\n# or\n\nyarn create react-app my-app, typescript\n\nmy-app/\n .gitignore\n images.d.ts\n node_modules/\n public/\n src/\n   ...\n package.json\n tsconfig.json\n tsconfig.prod.json\n tsconfig.test.json\n tslint.json",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Install the Java Development Kit on the web server so it can compile the TypeScript at request time.",
        isCorrect: false,
        explanation: "This confuses TypeScript with Java; TS is transpiled by Babel or `tsc` in Node, with no JDK involved."
      },
      {
        id: "B",
        text: "Rename every file to `.html` and switch JavaScript off so the browser reads the types directly.",
        isCorrect: false,
        explanation: "This is nonsensical; TypeScript lives in `.ts`/`.tsx` files and is transpiled to JavaScript, not read as HTML."
      },
      {
        id: "C",
        text: "You cannot use TypeScript with React apps at all; the two toolchains are fundamentally incompatible.",
        isCorrect: false,
        explanation: "Tempting if you have only seen JavaScript setups, but TypeScript is the standard for type-safe React development."
      },
      {
        id: "D",
        text: "Scaffold with `--template typescript`, or add `typescript` and the React `@types` and rename files to `.tsx`.",
        isCorrect: true,
        explanation: "Correct. CRA supported a TypeScript template natively; today the equivalent is Vite's `react-ts` template or a framework like Next.js."
      }
    ],
    correctAnswer: "D",
    explanation: "Create React App supported TypeScript natively through a template: `npx create-react-app my-app --template typescript` scaffolds the project with a `tsconfig.json`, `.tsx` files and the needed `@types` already wired up. To add TypeScript to an existing JavaScript CRA project, you install `typescript @types/react @types/react-dom`, rename your files to `.ts`/`.tsx`, and the build picks up type checking.\n\nThe mechanism is that CRA's build already ran code through Babel, which strips type annotations the same way it transpiles JSX; adding TypeScript provides the `tsconfig` and type packages so the editor and `tsc` can check types while Babel handles the transform.\n\nThe nuance worth stating is that CRA is effectively deprecated: the React team now points new projects at frameworks or Vite, so modern equivalents are `npm create vite@latest -- --template react-ts` or a framework like Next.js, which ship first-class TypeScript support out of the box.",
    interviewLine: "I scaffold with the TypeScript template (`--template typescript`) or, for an existing app, add `typescript` and the React `@types` and rename files to `.tsx`; modern projects use Vite's `react-ts` template instead.",
    misconception: "Thinking TypeScript needs a separate runtime, a Java toolchain, or a different file type like `.html`. It uses `.ts`/`.tsx` files and a `tsconfig`, with Babel or `tsc` doing the transform.",
    hints: [
      "Recall the flag that scaffolds a typed project in one command.",
      "Ask what you add to an existing JavaScript project to turn on type checking.",
      "The modern equivalent is a Vite `react-ts` template or a framework, not CRA."
    ],
    example: {
      caption: "A minimal typed component in a .tsx file after enabling TypeScript.",
      language: "tsx",
      code: "// App.tsx\ntype Props = { greeting: string };\n\nexport default function App({ greeting }: Props) {\n  return <h1>{greeting}</h1>;\n}\n// scaffold: npm create vite@latest my-app -- --template react-ts"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "react-how-react-proptypes-allow-different-types-for-one-prop",
    title: "How React PropTypes allow different types for one prop?",
    prompt: "How React PropTypes allow different types for one prop?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "Component.PropTypes = {\n  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Pass a single combined validator named `PropTypes.stringOrNumber` for the two-type prop.",
        isCorrect: false,
        explanation: "Tempting as a tidy name, but no such validator exists; unions are built with `oneOfType` taking an array."
      },
      {
        id: "B",
        text: "You cannot express a prop that accepts more than one type with the PropTypes library.",
        isCorrect: false,
        explanation: "This is false; `PropTypes.oneOfType([...])` exists precisely to validate union-typed props."
      },
      {
        id: "C",
        text: "PropTypes allows only one global type that every prop in the whole application must share.",
        isCorrect: false,
        explanation: "This misunderstands PropTypes entirely; each prop is validated independently with its own validator."
      },
      {
        id: "D",
        text: "Use `PropTypes.oneOfType([PropTypes.string, PropTypes.number])` so the prop accepts any listed type.",
        isCorrect: true,
        explanation: "Correct. `oneOfType` is a union validator that passes if the value matches any validator in the array."
      }
    ],
    correctAnswer: "D",
    explanation: "In the `prop-types` library you allow a prop to accept more than one type with `PropTypes.oneOfType([...])`, passing an array of validators. The prop passes validation if it satisfies any one of them, so `oneOfType([PropTypes.string, PropTypes.number])` accepts a value that is either a string or a number and warns in development for anything else.\n\nThe mechanism is a union validator: `oneOfType` composes other PropTypes validators, and because each entry is itself a validator you can mix primitives with compound ones like `shape` or `arrayOf`. Appending `.isRequired` additionally rejects a missing value.\n\nThe nuance worth stating is that `prop-types` is a runtime checker and is deprecated in React 19. The modern equivalent is a TypeScript union type, `size: string | number`, which expresses the same 'one of these types' and is checked at compile time rather than warned about at runtime.",
    interviewLine: "I use `PropTypes.oneOfType([...])` for a union-typed prop, though in modern code I'd write it as a TypeScript union like `string | number` checked at compile time.",
    misconception: "Expecting a dedicated multi-type validator name or thinking unions are impossible in PropTypes. You compose them with `oneOfType`, passing an array of validators.",
    hints: [
      "Look for a validator that takes an array of other validators.",
      "Ask what 'one of these types' maps to in a type system.",
      "The modern equivalent is a TypeScript union checked at compile time."
    ],
    example: {
      caption: "The TypeScript equivalent of oneOfType is a plain union type.",
      language: "tsx",
      code: "type BadgeProps = { size: string | number };\n\nfunction Badge({ size }: BadgeProps) {\n  return <span style={{ fontSize: size }} />;\n}\n// <Badge size={true} /> is a compile error: boolean is not string | number"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "typescript-what-is-the-proper-placement-for-error-boundaries",
    title: "What is the proper placement for error boundaries?",
    prompt: "What is the proper placement for error boundaries?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An app may contain at most one error boundary, registered once per deployed domain name.",
        isCorrect: false,
        explanation: "This invents a limit; you can nest many boundaries at different granularities across the tree."
      },
      {
        id: "B",
        text: "Wrap every inline `<span>` and `<b>` tag in its own error boundary for maximum safety.",
        isCorrect: false,
        explanation: "Tempting as 'more is safer', but boundaries on trivial inline tags add huge boilerplate with no real isolation benefit."
      },
      {
        id: "C",
        text: "Put a top-level boundary around routes for a global fallback, and wrap isolated widgets that can fail alone.",
        isCorrect: true,
        explanation: "Correct. This contains a widget crash to its own subtree while still guaranteeing an app-wide fallback for fatal errors."
      },
      {
        id: "D",
        text: "Place error boundaries only in the backend database layer so failures are caught before the UI.",
        isCorrect: false,
        explanation: "This misplaces them entirely; error boundaries are frontend React components that catch render errors in the client."
      }
    ],
    correctAnswer: "C",
    explanation: "Placement of error boundaries is a judgement about blast radius. A boundary catches render-time errors in the subtree below it and shows a fallback instead of unmounting the whole app. So you place a top-level boundary around routes to guarantee a global fallback page, and additional boundaries around independent, risky widgets, a chat panel, a chart, a third-party embed, so a crash in one is contained and the rest of the UI keeps working.\n\nThe granularity is yours to choose: too coarse and one failing widget takes down the page; too fine and you drown in boilerplate for parts that never fail. The useful heuristic is to wrap units that can fail independently and that the user can still use the app without.\n\nThe nuance worth stating is what boundaries do not catch: errors in event handlers, in asynchronous code, during SSR, and in the boundary's own render. Those need ordinary `try/catch` or promise rejection handling, which is why boundaries are only one layer of a resilience strategy.",
    interviewLine: "I put a top-level boundary around routes for a global fallback and wrap independently-failing widgets so one crash is contained, keeping in mind boundaries miss event-handler and async errors.",
    misconception: "Thinking boundaries go on every element or exactly one per app. Place them by blast radius: a top-level fallback plus boundaries around widgets that can fail independently.",
    hints: [
      "Think about which parts of the UI should fail without taking the rest down.",
      "Ask what the user should still be able to do when one widget crashes.",
      "Boundaries also do not catch event-handler or async errors."
    ],
    example: {
      caption: "A top-level fallback plus a boundary isolating one risky widget.",
      language: "tsx",
      code: "function App() {\n  return (\n    <ErrorBoundary fallback={<FullPageError />}>\n      <Header />\n      <ErrorBoundary fallback={<WidgetError />}>\n        <ThirdPartyChart />\n      </ErrorBoundary>\n      <Content />\n    </ErrorBoundary>\n  );\n}"
    },
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "react-why-do-you-need-additional-care-for-component-libraries",
    title: "Why do you need additional care for component libraries while using forward refs?",
    prompt: "Why do you need additional care for component libraries while using forward refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because adding `forwardRef` deletes the library's own `package.json` during the build step.",
        isCorrect: false,
        explanation: "This is invented; the concern is the changed ref semantics and types, not any file deletion."
      },
      {
        id: "B",
        text: "Because component libraries must be rewritten in assembly before `forwardRef` can be used.",
        isCorrect: false,
        explanation: "This is nonsensical; libraries are written in JavaScript and TypeScript, and `forwardRef` is a plain React API."
      },
      {
        id: "C",
        text: "Adopting `forwardRef` changes what a consumer's `ref` attaches to and the exported types, a breaking change.",
        isCorrect: true,
        explanation: "Correct. The ref target and type signatures shift, so library consumers can break and the change belongs in a major version."
      },
      {
        id: "D",
        text: "Because a component library that uses `forwardRef` can no longer ship any CSS stylesheets with it.",
        isCorrect: false,
        explanation: "Tempting as a vague constraint, but `forwardRef` has nothing to do with styling; libraries still distribute CSS freely."
      }
    ],
    correctAnswer: "C",
    explanation: "Adding `forwardRef` to a component changes where a passed `ref` lands, and for a library that is a breaking change. Before, a consumer's `ref` might have attached to a class instance or been ignored; after, it forwards to whatever the component targets, typically an inner DOM node. Any consumer relying on the old behaviour, or on the old exported types, now behaves differently.\n\nBecause the change alters the component's public contract, a library should ship it as a new major version under semver, not a patch or minor. The exported type signatures often shift too (the component now accepts a `ref`), which can break TypeScript consumers at compile time even when runtime behaviour looks similar.\n\nThe nuance worth stating is that React 19 relaxes the mechanics, `ref` can be a regular prop on function components, so new code often does not need `forwardRef` at all. But the compatibility lesson stands: changing what a `ref` attaches to is a contract change, and contract changes belong in a major release.",
    interviewLine: "I'd warn that adopting `forwardRef` changes what a consumer's `ref` attaches to and the exported types, so for a library I treat it as a breaking change that warrants a major version bump.",
    misconception: "Treating `forwardRef` as an internal detail you can add quietly. It changes the ref target and types a consumer depends on, which is a breaking contract change.",
    hints: [
      "Ask what a consumer's `ref` pointed at before and after the change.",
      "Think about which semver bump a changed public contract requires.",
      "The exported types shift too, which can break TypeScript consumers."
    ],
    example: {
      caption: "forwardRef changes the ref target; in React 19 ref can be a plain prop instead.",
      language: "tsx",
      code: "// before: ref was ignored or hit an instance\n// after: ref now reaches the inner input, a contract change\nconst Input = forwardRef<HTMLInputElement, { label: string }>(\n  ({ label }, ref) => <input ref={ref} aria-label={label} />,\n);\n\n// React 19: ref as a regular prop, no forwardRef needed"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "typescript-what-are-the-features-of-create-react-app",
    title: "What are the features of create react app?",
    prompt: "What are the features of create react app?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Automatic conversion of React components into native iOS Swift binaries for the App Store.",
        isCorrect: false,
        explanation: "This invents a native-compile step; CRA bundled web JavaScript, with no iOS binary output."
      },
      {
        id: "B",
        text: "Built-in PostgreSQL clustering and server hardware virtualisation managed from the CLI.",
        isCorrect: false,
        explanation: "This places CRA in the backend/infra layer; it was a client-side frontend scaffolding tool."
      },
      {
        id: "C",
        text: "Zero-config setup with Babel/webpack, TypeScript and Flow support, a test runner, linting and a prod build.",
        isCorrect: true,
        explanation: "Correct. CRA delivered a complete preconfigured build toolchain so you could write components without hand-writing webpack or Babel config."
      },
      {
        id: "D",
        text: "No real features at all; a CRA project could only render a single line of static text.",
        isCorrect: false,
        explanation: "Tempting as dismissive, but CRA provided an end-to-end dev-to-production toolchain, not a static page."
      }
    ],
    correctAnswer: "C",
    explanation: "Create React App's value was a zero-config toolchain. One command scaffolded a project with Babel and webpack already wired up, so you got JSX, modern JavaScript, TypeScript and Flow support, autoprefixed CSS, a Jest test runner, ESLint, a dev server with Fast Refresh and a production build that minified and hashed assets, without hand-writing any build configuration.\n\nThe point was that the configuration was hidden behind `react-scripts`. You could start writing components immediately, and the common 90% of build concerns, transpilation, bundling, dev/prod modes, source maps, were handled for you, with an `eject` escape hatch when you needed full control.\n\nThe nuance worth stating is that CRA is effectively deprecated: the React team now steers new projects toward frameworks or Vite, which offer the same zero-config experience with much faster builds and first-class TypeScript. So the feature list is best framed as 'what a modern React starter gives you', now delivered by Vite or Next.js rather than CRA.",
    interviewLine: "I'd describe CRA as a zero-config toolchain \u2014 Babel and webpack preconfigured for JSX, TypeScript, testing, linting and a prod build \u2014 so I wrote components instead of build config; now I let Vite and frameworks fill that role.",
    misconception: "Thinking CRA compiled to native binaries, bundled a backend, or did nothing useful. It was a client-side zero-config build toolchain for React web apps.",
    hints: [
      "Ask what a developer avoids having to configure by hand with such a tool.",
      "Think about which layer, build tooling or runtime, these features sit in.",
      "The same experience now comes from Vite or a framework rather than CRA."
    ],
    example: {
      caption: "The whole toolchain sat behind react-scripts in package.json.",
      language: "json",
      code: "{\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test\"\n  }\n}"
    },
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-how-do-you-build-a-form-library-with-validation-from-sc",
    title: "How do you build a form library with validation from scratch?",
    prompt: "How do you build a form library with validation from scratch?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "hooks",
    tags: [
      "typescript",
      "hooks",
      "senior",
      "hooks",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Skip all client validation and POST the raw, unvalidated form fields to the server on every change.",
        isCorrect: false,
        explanation: "Tempting as 'let the server decide', but it floods the network and denies users instant feedback like required-field and format checks."
      },
      {
        id: "B",
        text: "Bind all 100 inputs to one top-level state so every keystroke re-renders the entire form at once.",
        isCorrect: false,
        explanation: "This is the exact performance trap: a shared top-level state re-renders every untouched field on each character, causing typing lag."
      },
      {
        id: "C",
        text: "Store each field's value in a global `window` variable, bypassing React state and refs entirely.",
        isCorrect: false,
        explanation: "Mutating globals sidesteps React's lifecycle and reactivity, so the UI never updates and component isolation is lost."
      },
      {
        id: "D",
        text: "Isolate field state (refs or subscriptions), integrate schema validation, and track touched/dirty/error state.",
        isCorrect: true,
        explanation: "Correct. Isolating re-renders per field and validating against a declarative schema is exactly how React Hook Form and Formik scale."
      }
    ],
    correctAnswer: "D",
    explanation: "The core design decision in a form library is where field state lives and how re-renders are scoped. The naive approach, one top-level `useState` object updated on every keystroke, re-renders every field on each character, which lags badly on large forms. A performant library instead isolates state per field (via uncontrolled inputs and refs, or per-field subscriptions) so typing in one input does not re-render the others.\n\nAround that core you need validation and status tracking: integrate a schema validator (Zod, Yup) so rules live in one place, and track `touched`, `dirty`, `isSubmitting` and per-field `errors` so the UI can show messages at the right moment. React Hook Form (uncontrolled, minimal re-renders) and Formik (controlled) are the reference points, and Zod gives TypeScript-first schemas.\n\nThe senior nuance is the controlled-versus-uncontrolled trade-off: controlled inputs are simpler to reason about but re-render on every change, while uncontrolled inputs with refs are far cheaper at scale but need explicit wiring to read values and surface validation.",
    interviewLine: "I isolate field state so one input's change doesn't re-render the whole form, then layer schema validation and touched/dirty/error tracking on top, the uncontrolled approach React Hook Form takes for scale.",
    misconception: "Binding every field to one top-level state object. That re-renders every input on each keystroke, which is the main performance pitfall a form library exists to avoid.",
    hints: [
      "Ask what re-renders when you type into one field of a large form.",
      "Think about where field state should live to keep inputs independent.",
      "A single top-level state object is the pattern that causes the lag."
    ],
    example: {
      caption: "React Hook Form registers uncontrolled inputs and validates against a Zod schema.",
      language: "tsx",
      code: "const schema = z.object({ email: z.string().email() });\n\nfunction SignupForm() {\n  const { register, handleSubmit, formState: { errors } } =\n    useForm({ resolver: zodResolver(schema) });\n  return (\n    <form onSubmit={handleSubmit((d) => console.log(d))}>\n      <input {...register(\"email\")} />\n      {errors.email && <span>{errors.email.message}</span>}\n    </form>\n  );\n}"
    },
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "typescript-ambient-declaration-global-constant",
    title: "Declaring a global constant that survives being included twice",
    prompt: "You need a globally accessible constant in a .d.ts-style setup where the same file may be processed more than once. Which declaration is correct?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "declarations",
      "ambient",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "export const API_VERSION: string = '1.0';",
        isCorrect: false,
        explanation: "export creates a module-scoped binding. It is not global, consumers must import it."
      },
      {
        id: "B",
        text: "globalThis.API_VERSION = '1.0';",
        isCorrect: false,
        explanation: "This is a runtime assignment only. It gives you no compile-time type, no declaration merging, and no checking."
      },
      {
        id: "C",
        text: "declare const API_VERSION: string;",
        isCorrect: true,
        explanation: "Correct. An ambient declaration asserts the symbol exists at runtime without emitting any JavaScript, so processing the file twice cannot produce a duplicate definition."
      },
      {
        id: "D",
        text: "const API_VERSION: string = '1.0';",
        isCorrect: false,
        explanation: "A plain const emits code. If the file is concatenated or included twice you get a redeclaration error."
      }
    ],
    correctAnswer: "C",
    explanation: "`declare const` introduces an ambient declaration: it tells the compiler a symbol exists at runtime with a given type, but emits no JavaScript for it. The `declare` keyword is what distinguishes an assertion about the world from a definition of it, so nothing lands in the output and there is no binding to clash with. That is exactly what makes it safe when the same file is processed more than once, as with legacy `outFile` builds, `/// <reference>` includes or plain script concatenation.\n\nThe three wrong answers each fail on emit or scope. A plain `const API_VERSION = '1.0'` emits a real binding, so concatenating or including the file twice produces a `Cannot redeclare block-scoped variable` error. `export const` emits a binding too and scopes it to the module, so it is not global and consumers must import it. Assigning to `globalThis.API_VERSION` runs at runtime but gives the compiler no declaration to check against, so you get neither a type nor the duplicate-safety.\n\nThe edge an interviewer probes is who supplies the value. An ambient `declare const` only types the symbol; some other mechanism, a bundler `define`, a `<script>` tag, or a build-time replacement, has to put the real value there at runtime, or the reference throws. The declaration is a promise, and it is on you to keep it.",
    interviewLine: "declare says 'this exists, trust me', it types a symbol without emitting it, which is exactly what a global constant in a declaration file needs.",
    misconception: "Assuming declare and const are interchangeable. declare emits nothing; const emits a binding, and a binding declared twice is an error.",
    hints: [
      "Look at what each line would emit into the compiled JavaScript.",
      "Which declaration asserts a symbol exists at runtime without producing a binding?",
      "A binding that appears twice is a redeclaration error; an assertion is not."
    ],
    example: {
      caption: "declare only types a symbol; the runtime value comes from elsewhere.",
      language: "typescript",
      code: "// env.d.ts, processed everywhere, emits nothing\ndeclare const BUILD_ID: string;\ndeclare function track(event: string): void;\n\n// a .ts file supplies the real runtime values\n// (window as any).BUILD_ID = \"abc123\";\n\nconsole.log(BUILD_ID.toUpperCase()); // typed as string, no emit from the declare"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-as-const-literal-widening",
    title: "What as const does to inferred literal types",
    prompt: "What is the inferred type of config?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "as-const",
      "literal-types",
      "senior"
    ],
    codeSnippet: "const config = { apiUrl: 'https://api.example.com', timeout: 5000 } as const;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "{ apiUrl: string; timeout: number }",
        isCorrect: false,
        explanation: "That is the type you get WITHOUT as const, TypeScript widens the literals to their base types."
      },
      {
        id: "B",
        text: "{ readonly apiUrl: 'https://api.example.com'; readonly timeout: 5000 }",
        isCorrect: true,
        explanation: "Correct. as const narrows each value to its literal type and marks every property readonly."
      },
      {
        id: "C",
        text: "{ readonly apiUrl: string; readonly timeout: number }",
        isCorrect: false,
        explanation: "as const does add readonly, but it also prevents the literal widening, the values keep their exact types."
      },
      {
        id: "D",
        text: "Readonly<Record<string, string | number>>",
        isCorrect: false,
        explanation: "as const preserves the exact keys and exact literal values; it does not collapse them into an index signature."
      }
    ],
    correctAnswer: "B",
    explanation: "`as const` does two things to the literal at once. It stops literal widening, so `'https://api.example.com'` keeps its exact string-literal type instead of being widened to `string`, and `5000` stays `5000` rather than `number`. It also marks every property `readonly`, recursively, so the whole object becomes a deeply immutable, maximally specific type. Without the assertion TypeScript infers the mutable, widened `{ apiUrl: string; timeout: number }`.\n\nThe distractors each capture half the truth. Option A is the no-`as const` inference. Option C adds the `readonly` but forgets that widening is also suppressed, so it still shows `string` and `number`. Option D collapses the exact keys and values into an index signature, which `as const` never does, it preserves the precise shape.\n\nThose narrow literal types are the payoff, not a side effect. A `readonly ['admin','editor','viewer']` tuple can be indexed with `[number]` to derive the union `'admin' | 'editor' | 'viewer'`, which is how `as const` turns a plain array into a source of truth for a discriminated union or a key constraint. The edge case to remember is that `as const` is shallow in intent but deep in effect: it freezes nested arrays and objects too, so you cannot later push to or reassign any level of the structure.",
    interviewLine: "I reach for as const to freeze both the value and the type \u2014 readonly properties and literal types instead of widened ones.",
    misconception: "Thinking as const only adds readonly. The bigger effect is that it stops literal widening.",
    hints: [
      "Compare the inferred type with and without the assertion.",
      "It changes two things about every property: mutability and how precise the type is.",
      "The values are not just locked; their types stop widening to string and number."
    ],
    example: {
      caption: "as const keeps the literals narrow, which is what makes them usable as a key union.",
      language: "typescript",
      code: "const ROLES = [\"admin\", \"editor\", \"viewer\"] as const;\n// type: readonly [\"admin\", \"editor\", \"viewer\"]\n\ntype Role = (typeof ROLES)[number];\n// type Role = \"admin\" | \"editor\" | \"viewer\"\n\nconst grant = (r: Role) => r;\ngrant(\"admin\"); // ok\n// grant(\"owner\"); // error: not a member of the union"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types"
  },
  {
    id: "typescript-type-predicate-vs-boolean",
    title: "Why a boolean return type does not narrow",
    prompt: "Both functions have identical runtime behaviour. Why does only isString2 narrow value inside the if?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "type-guards",
      "narrowing",
      "senior"
    ],
    codeSnippet: "function isString1(val: unknown): boolean {\n  return typeof val === 'string';\n}\n\nfunction isString2(val: unknown): val is string {\n  return typeof val === 'string';\n}\n\nfunction process(value: string | number) {\n  if (isString1(value)) {\n    value.toUpperCase(); // error\n  }\n  if (isString2(value)) {\n    value.toUpperCase(); // ok\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "isString2 is generic, so the compiler can infer the argument type",
        isCorrect: false,
        explanation: "Neither function is generic. The difference is entirely in the declared return type."
      },
      {
        id: "B",
        text: "isString2 runs at compile time while isString1 runs at runtime",
        isCorrect: false,
        explanation: "Both run only at runtime. Type predicates are erased in the emitted JavaScript."
      },
      {
        id: "C",
        text: "val is string is a type predicate: it tells the compiler what a true return means about the argument",
        isCorrect: true,
        explanation: "Correct. boolean only says 'a boolean came back'. val is string says 'if this is true, val is a string', which control flow analysis can act on."
      },
      {
        id: "D",
        text: "isString1 needs an explicit return type annotation to narrow",
        isCorrect: false,
        explanation: "It has one: boolean. That is precisely the annotation that throws the information away."
      }
    ],
    correctAnswer: "C",
    explanation: "The difference is entirely in the declared return type, not the function body, which is identical. A predicate return type `val is string` carries information the compiler can act on; a plain `boolean` does not. When `isString1` returns `true`, all TypeScript learns is that some boolean came back, it cannot connect that result to the argument, so `value` stays `string | number` and `.toUpperCase()` is rejected.\n\n`isString2` declares the connection explicitly: a `true` result means `val` is a `string`. Control flow analysis reads that predicate and narrows `value` to `string` inside the `if` branch, and to the complementary type in the `else`. The other options miss this: neither function is generic, both run only at runtime (predicates are erased in the emitted JavaScript), and `isString1` already has a return annotation, `boolean`, which is precisely the annotation that discards the narrowing.\n\nThe nuance an interviewer probes is that the compiler trusts the predicate without verifying the body matches it. You can write `val is string` on a function that actually checks for a number, and TypeScript will narrow incorrectly, a predicate is an assertion you are responsible for, which is why `asserts` guards and `satisfies`-checked implementations matter when the stakes are high.",
    interviewLine: "I'd point out that `boolean` loses the information while a type predicate keeps it \u2014 the runtime behaviour is identical, only the compiler can tell the difference.",
    misconception: "Believing the compiler can infer a type guard from the function body. It will not; you must declare the predicate.",
    hints: [
      "Look at the two declared return types, not the function bodies.",
      "What does the compiler actually learn from a function that returns boolean?",
      "A true result has to say something about the argument, not just that it was true."
    ],
    example: {
      caption: "A predicate guard narrows a union; a boolean-returning check does not.",
      language: "typescript",
      code: "type Cat = { meow(): void };\ntype Dog = { bark(): void };\n\nfunction isCat(pet: Cat | Dog): pet is Cat {\n  return \"meow\" in pet;\n}\n\nfunction speak(pet: Cat | Dog) {\n  if (isCat(pet)) pet.meow(); // narrowed to Cat\n  else pet.bark();            // narrowed to Dog\n}"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
  },
  {
    id: "typescript-infer-conditional-unwrap",
    title: "How infer captures a type inside a conditional type",
    prompt: "What does UnpackPromise<T> resolve to for each of these two inputs?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "conditional-types",
      "infer",
      "generics",
      "senior"
    ],
    codeSnippet: "type UnpackPromise<T> = T extends Promise<infer U> ? U: T;\n\ntype A = UnpackPromise<Promise<string>>;\ntype B = UnpackPromise<number>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A = Promise<string>, B = number",
        isCorrect: false,
        explanation: "The whole point of infer U is to extract the inner type, not to return the Promise itself."
      },
      {
        id: "B",
        text: "A = string, B = never",
        isCorrect: false,
        explanation: "The false branch is T, not never. B falls through to the original type."
      },
      {
        id: "C",
        text: "A = unknown, B = unknown",
        isCorrect: false,
        explanation: "infer produces a concrete inferred type, not unknown."
      },
      {
        id: "D",
        text: "A = string, B = number",
        isCorrect: true,
        explanation: "Correct. T matches Promise<string> so U is captured as string; number does not match, so the false branch returns T unchanged."
      }
    ],
    correctAnswer: "D",
    explanation: "`infer` introduces a fresh type variable that TypeScript solves for while it checks the `extends` clause of a conditional type. `T extends Promise<infer U>` asks two questions at once: is `T` some `Promise`, and if so, what is it a `Promise` of? The answer binds to `U`. For `Promise<string>`, `U` is captured as `string` and the true branch returns it; for `number` the check fails, so the false branch returns `T` unchanged, giving `number`.\n\nThat is why the other answers are wrong. Returning `Promise<string>` would defeat the entire purpose of extracting the inner type; `never` is not what the false branch yields, it returns `T`; and `infer` always produces a concrete inferred type, never `unknown`. Each option corresponds to a specific misread of how the two branches resolve.\n\nThe constraint worth stating is placement: `infer` is only legal inside the `extends` clause of a conditional type, nowhere else. A subtle edge is multiple matches, when a variable like `infer U` appears in a position that could unify with a union, TypeScript infers a union; in contravariant positions such as function parameters it infers an intersection instead, which is how helpers like `UnionToIntersection` are built.",
    interviewLine: "I describe infer as pattern matching for types \u2014 it destructures a type the way you'd destructure a value.",
    misconception: "Trying to use infer outside a conditional type's extends clause; it is only valid there.",
    hints: [
      "Trace what the compiler binds the inferred variable to for each input.",
      "What happens on the branch where the extends check fails?",
      "The false branch returns the original type, not never."
    ],
    example: {
      caption: "infer can capture an array's element type the same way it captures a Promise's.",
      language: "typescript",
      code: "type ElementType<T> = T extends (infer U)[] ? U : T;\n\ntype A = ElementType<string[]>; // string\ntype B = ElementType<number>;   // number (no match, passthrough)\n\ntype First<T> = T extends [infer H, ...unknown[]] ? H : never;\ntype C = First<[boolean, string]>; // boolean"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-never-return-unreachable",
    title: "The return type of a function that always throws",
    prompt: "What return type does TypeScript infer for fail, and what does that buy you at the call site?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "never",
      "control-flow",
      "senior"
    ],
    codeSnippet: "function fail(message: string) {\n  throw new Error(message);\n}\n\nfunction pick(value: string | null) {\n  if (value === null) fail('missing');\n  return value.toUpperCase();\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "never, so the compiler treats code after the call as unreachable",
        isCorrect: true,
        explanation: "Correct. never means this function does not return, which lets control flow analysis narrow value to string after the guard."
      },
      {
        id: "B",
        text: "void, the function returns nothing useful",
        isCorrect: false,
        explanation: "void would mean the function can return undefined normally. This one never returns at all, and void would leave the code after the call reachable."
      },
      {
        id: "C",
        text: "unknown, the compiler cannot tell",
        isCorrect: false,
        explanation: "The compiler can tell precisely: there is no reachable return path."
      },
      {
        id: "D",
        text: "Error, it is inferred from the thrown value",
        isCorrect: false,
        explanation: "The thrown value's type is unrelated to the return type; throwing is not returning."
      }
    ],
    correctAnswer: "A",
    explanation: "Because `fail` unconditionally throws and has no reachable `return`, TypeScript infers its return type as `never`. `never` is the type of a value that cannot exist, the empty set of values, and it drives control flow analysis: the compiler treats any code following a call to a `never`-returning function as unreachable. In `pick`, that means once `fail('missing')` runs in the `null` branch, control cannot continue, so by the time `value.toUpperCase()` executes, `value` has been narrowed from `string | null` to `string`.\n\n`void` would be the wrong inference and the other options show why. `void` says the function returns normally but with no useful value, which would leave the code after the call reachable and `value` still `string | null`. `unknown` is wrong because the compiler can tell precisely that no return path exists, and the thrown value's type is unrelated to the return type, throwing is not returning.\n\nThe edge worth naming is that inference gives you `never` automatically only for functions that always throw; a function annotated `: void` that happens to always throw will not narrow callers. For reusable assertion helpers you make the intent explicit with an `asserts` signature or an explicit `: never` return, which is what powers `assertNever` exhaustiveness checks and invariant helpers.",
    interviewLine: "I think of never as the type of 'this never comes back' \u2014 it's what makes assertion helpers and exhaustiveness checks work.",
    misconception: "Reaching for void when you mean never. void returns; never does not.",
    hints: [
      "Look for a reachable return statement in the throwing function.",
      "Is there any path through this function that reaches a return?",
      "If the function cannot return, what does that let the caller assume afterward?"
    ],
    example: {
      caption: "A never-returning assert lets the compiler narrow past the guard.",
      language: "typescript",
      code: "function assert(cond: unknown, msg: string): asserts cond {\n  if (!cond) throw new Error(msg);\n}\n\nfunction read(value: string | undefined) {\n  assert(value, \"value required\");\n  return value.trim(); // value is string here\n}"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-isolated-modules-constraint",
    title: "What, isolatedModules actually enforces",
    prompt: "What constraint does the, isolatedModules compiler option place on each file?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "tsconfig",
      "modules",
      "build",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Every module must be imported at most once across the program",
        isCorrect: false,
        explanation: "It says nothing about how often a module is imported."
      },
      {
        id: "B",
        text: "Circular imports between modules become compile errors",
        isCorrect: false,
        explanation: "Circular imports are unaffected by this flag."
      },
      {
        id: "C",
        text: "Each file is compiled into a separate output bundle",
        isCorrect: false,
        explanation: "It constrains what you may write; it does not change bundling or output layout."
      },
      {
        id: "D",
        text: "Every file must be independently transpilable, without cross-file type information",
        isCorrect: true,
        explanation: "Correct. It is a compatibility guarantee for single-file transpilers such as Babel, SWC and esbuild."
      }
    ],
    correctAnswer: "D",
    explanation: "`isolatedModules` guarantees that each file can be transpiled entirely on its own, with no knowledge of any other file in the program. It changes nothing about how output is produced; it is a constraint on what syntax you are allowed to write. The reason it exists is tooling: Babel, SWC and esbuild transpile file-by-file for speed and never build a full TypeScript program, so they cannot resolve cross-file type information the way `tsc` can.\n\nThe other options describe things the flag does not do. It says nothing about how often a module is imported, it does not turn circular imports into errors, and it does not split each file into a separate bundle, bundling and output layout are unaffected. All it governs is per-file transpilability.\n\nThat single rule is why several constructs become errors under it. Re-exporting a type needs `export type { T }`, because a single-file transpiler cannot tell whether `T` is a type to erase or a value to re-export. `const enum` is disallowed, because inlining its members requires whole-program knowledge. And a file with no top-level `import`/`export` must add `export {}` to count as a module. Next.js and Vite enable the flag precisely because they transpile with these single-file tools.",
    interviewLine: "I explain isolatedModules as a promise to single-file transpilers: nothing in this file needs cross-file type information to compile.",
    misconception: "Reading it as a bundling or module-resolution flag. It constrains the syntax you may write, not how output is produced.",
    hints: [
      "Think about the tools that compile without building a whole program.",
      "Which tools compile one file at a time without type-checking the whole program?",
      "It constrains the syntax you may write, not how the output is bundled."
    ],
    example: {
      caption: "The constructs isolatedModules forbids all need cross-file type information.",
      language: "typescript",
      code: "// re-exporting a type must say it is a type\nexport type { User } from \"./models\";\n\n// const enum is disallowed: inlining needs the whole program\n// const enum Dir { Up, Down } // error under isolatedModules\n\n// a file with no import/export must still be a module\nexport {};"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/modules.html"
  },
  {
    id: "typescript-mapped-type-key-remapping",
    title: "Renaming keys with an as clause in a mapped type",
    prompt: "What is PersonGetters?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "mapped-types",
      "template-literal-types",
      "senior"
    ],
    codeSnippet: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ninterface Person {\n  name: string;\n  age: number;\n}\n\ntype PersonGetters = Getters<Person>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "{ getName: () => string; getAge: () => number }",
        isCorrect: true,
        explanation: "Correct. The as clause remaps each key through a template literal type, and each value becomes a function returning the original property type."
      },
      {
        id: "B",
        text: "{ getName: string; getAge: number }",
        isCorrect: false,
        explanation: "The value type is () => T[K], a function returning the property type, not the property type itself."
      },
      {
        id: "C",
        text: "{ get: (key: keyof Person) => string | number }",
        isCorrect: false,
        explanation: "A mapped type produces one member per key, not a single lookup method."
      },
      {
        id: "D",
        text: "{ name: () => string; age: () => number }",
        isCorrect: false,
        explanation: "That is what you get without the as clause, the keys would keep their original names."
      }
    ],
    correctAnswer: "A",
    explanation: "Key remapping, added in TypeScript 4.1, lets a mapped type rewrite each key through an `as` clause. In `Getters<Person>`, the clause `` `get${Capitalize<string & K>}` `` runs for every `K in keyof T`, so `name` becomes `getName` and `age` becomes `getAge`. The value type `() => T[K]` makes each remapped member a function returning that key's original property type, which is why `getName` is `() => string` and `getAge` is `() => number`.\n\nThe distractors each drop one piece. Option B keeps the value as the raw property type instead of a function. Option C collapses the per-key members into a single lookup method, which a mapped type never produces, it emits one member per key. Option D is what you would get without the `as` clause, leaving the keys at their original names.\n\nThe detail worth stating is `string & K`. `keyof T` can include `number` and `symbol`, but template literal types require their interpolated parts to be assignable to `string`, so intersecting with `string` filters `K` down to just its string keys and satisfies `Capitalize`. The same `as` clause can also drop keys entirely by mapping them to `never`, which is how utility types like a key-filtering `Omit` are built.",
    interviewLine: "I use the `as` clause in a mapped type to rename keys; combined with template literal types, I can generate whole APIs from a shape.",
    misconception: "Forgetting string & K and hitting an error because keyof T is not assignable to string.",
    hints: [
      "Read the clause that rewrites each key before the value type.",
      "Read the as clause as 'and call this key something else instead'.",
      "The value type is a function returning the property type, not the property itself."
    ],
    example: {
      caption: "Key remapping can also drop keys by mapping them to never.",
      language: "typescript",
      code: "type RemoveId<T> = {\n  [K in keyof T as K extends \"id\" ? never : K]: T[K];\n};\n\ninterface User { id: string; name: string; email: string }\ntype Public = RemoveId<User>; // { name: string; email: string }"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-template-literal-union-distribution",
    title: "How a template literal type distributes over a union",
    prompt: "What is the parameter type of event?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "template-literal-types",
      "unions",
      "senior"
    ],
    codeSnippet: "type EventType = 'click' | 'focus' | 'blur';\ntype Handler = (event: `on${Capitalize<EventType>}`) => void;\n\nconst handler: Handler = (event) => {\n  console.log(event);\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "'Click' | 'Focus' | 'Blur'",
        isCorrect: false,
        explanation: "Tempting if you read the template as just Capitalize<EventType> and overlook the literal `on` prefix, but the prefix is part of the template, so every member starts with it."
      },
      {
        id: "B",
        text: "'onClick' | 'onFocus' | 'onBlur'",
        isCorrect: true,
        explanation: "Correct. The template distributes over each union member and Capitalize uppercases the first letter."
      },
      {
        id: "C",
        text: "`on${Lowercase<string>}`",
        isCorrect: false,
        explanation: "Tempting if you assume the prefix pairs with an open string pattern, but the three union members are known literals, so the result is a concrete three-member union, not an open template."
      },
      {
        id: "D",
        text: "string",
        isCorrect: false,
        explanation: "Template literal types produce specific string literal types, not the widened string."
      }
    ],
    correctAnswer: "B",
    explanation: "A template literal type distributes over any union it interpolates. Each member of `EventType` is substituted into the template in turn, and the results are collected back into a union, so one input union of three produces one output union of three. `Capitalize` is one of TypeScript's built-in intrinsic string types, so `'click'` becomes `'Click'`, and with the literal `on` prefix the whole member resolves to `'onClick'`.\n\nThe wrong answers each drop part of the template. Option A applies `Capitalize` but forgets the `on` prefix, which is part of the pattern and so appears on every member. Option C treats the interpolation as an open `string` pattern, but the members are known literals, so the result is concrete. Option D widens all the way to `string`, which is exactly what template literal types avoid, they produce specific literal types.\n\nThe payoff is a closed union of three exact string literals. That is what lets an editor autocomplete the handler name and the compiler reject a typo like `'onClik'`. The edge to remember is that distribution only happens over a genuine union: interpolate a bare `string` and you do get the open `` `on${string}` `` pattern, which matches any `on`-prefixed string rather than a fixed set.",
    interviewLine: "I'd note that template literal types distribute over unions \u2014 one input union of three gives me an output union of three.",
    misconception: "Expecting a single widened string. The union is preserved through the template.",
    hints: [
      "Substitute each union member into the template separately.",
      "What happens to each member of the union separately?",
      "Capitalize uppercases the first letter, so the result is a closed union, not a widened string."
    ],
    example: {
      caption: "A template literal type can combine two unions into their cross product.",
      language: "typescript",
      code: "type Size = \"sm\" | \"lg\";\ntype Color = \"red\" | \"blue\";\n\ntype ClassName = `${Size}-${Color}`;\n// \"sm-red\" | \"sm-blue\" | \"lg-red\" | \"lg-blue\"\n\nconst c: ClassName = \"lg-blue\"; // ok\n// const bad: ClassName = \"md-green\"; // error"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types"
  },
  {
    id: "typescript-recursive-deep-readonly",
    title: "Why a deep-readonly type needs a conditional check",
    prompt: "In DeepReadonly, why is the T[K] extends object check necessary?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "recursive-types",
      "mapped-types",
      "senior"
    ],
    codeSnippet: "type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]>: T[K];\n};\n\ninterface Config {\n  api: { url: string; timeout: number };\n  features: string[];\n}\n\ntype ReadonlyConfig = DeepReadonly<Config>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It prevents infinite recursion on any input",
        isCorrect: false,
        explanation: "It stops recursion at primitives, but a genuinely cyclic type can still recurse, TypeScript has its own depth limiter for that."
      },
      {
        id: "B",
        text: "It excludes arrays from being made readonly",
        isCorrect: false,
        explanation: "Arrays are objects, so they take the recursive branch and are made deeply readonly too."
      },
      {
        id: "C",
        text: "It is required syntax for any recursive type alias",
        isCorrect: false,
        explanation: "Recursive type aliases do not require a conditional; this one needs it for correctness, not syntax."
      },
      {
        id: "D",
        text: "It stops the recursion at primitives, which have no properties to map over",
        isCorrect: true,
        explanation: "Correct. Without it the type would try to recurse into string and number, which is meaningless and produces a useless mapped type."
      }
    ],
    correctAnswer: "D",
    explanation: "The conditional `T[K] extends object ? DeepReadonly<T[K]> : T[K]` is the base case of the recursion. A mapped type applied to a primitive is not meaningful: mapping over `keyof string` gives you the method names of `string`, not its value, so recursing into `string` or `number` would produce a useless shape. The check stops the recursion at the leaves, object-shaped properties recurse, primitives are returned unchanged.\n\nThe wrong answers each misattribute the purpose. It is not a cycle-breaker, a genuinely cyclic type can still recurse and TypeScript has a separate instantiation-depth limiter for that. It does not exclude arrays, arrays satisfy `extends object`, so they take the recursive branch and are made deeply readonly too, which is usually what you want. And a conditional is not required syntax for recursive aliases; this one needs it for correctness, not to compile.\n\nThe edge an interviewer probes is that `extends object` is a blunt instrument. It catches arrays and plain objects, but it also catches `Date`, `Map`, `RegExp` and functions, which recurse into their method signatures rather than being left intact. A production-grade `DeepReadonly` short-circuits those known built-ins before the object check, which is where the naive one-liner breaks down.",
    interviewLine: "I remember that recursive mapped types need a base case just like recursive functions \u2014 the conditional is that base case.",
    misconception: "Assuming the conditional is about cycle-breaking. It is about not recursing into primitives.",
    hints: [
      "Ask what the recursion does when it reaches a primitive.",
      "What would DeepReadonly<string> mean?",
      "Mapping over a primitive gives you its method names, not a useful shape."
    ],
    example: {
      caption: "A recursive type needs a base case, exactly like a recursive function.",
      language: "typescript",
      code: "type DeepPartial<T> = T extends object\n  ? { [K in keyof T]?: DeepPartial<T[K]> }\n  : T;\n\ninterface Settings { ui: { theme: string; dense: boolean } }\ntype Patch = DeepPartial<Settings>;\n// { ui?: { theme?: string; dense?: boolean } }"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-interface-declaration-merging",
    title: "Declaration merging, and why type aliases cannot do it",
    prompt: "Why does redeclaring Box compile while redeclaring Container is an error?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "declaration-merging",
      "senior"
    ],
    codeSnippet: "interface Box { width: number }\ninterface Box { height: number }\nconst box: Box = { width: 10, height: 20 }; // ok\n\ntype Container = { volume: number };\ntype Container = { weight: number }; // error",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Interfaces merge their declarations into one; a type alias binds a name exactly once",
        isCorrect: true,
        explanation: "Correct. Declaration merging is a feature of interfaces specifically, which is what makes them extensible from other files."
      },
      {
        id: "B",
        text: "Type aliases can only describe primitives and unions",
        isCorrect: false,
        explanation: "Type aliases describe object shapes perfectly well, they simply cannot be declared twice."
      },
      {
        id: "C",
        text: "Box compiles only because both declarations are in the same file",
        isCorrect: false,
        explanation: "Merging works across files too, which is exactly how ambient library augmentation works."
      },
      {
        id: "D",
        text: "Interfaces are hoisted while type aliases are not",
        isCorrect: false,
        explanation: "Both are erased at runtime and both are usable before their declaration. Hoisting is not the difference."
      }
    ],
    correctAnswer: "A",
    explanation: "Interfaces support declaration merging: multiple declarations of the same interface name in scope combine into a single interface. The two `Box` declarations union their members, so `Box` ends up with both `width` and `height`, and `box` must supply both. Identically-named methods across declarations become overloads rather than conflicting. A `type` alias binds a name to exactly one type, so a second `type Container` is a duplicate-identifier error, there is nothing to merge into.\n\nThe other options miss the actual mechanism. Type aliases describe object shapes perfectly well, they simply cannot be redeclared. Merging is not limited to one file, it works across files, which is the whole basis of ambient library augmentation. And hoisting is not the difference: both constructs are erased at runtime and both are usable before their textual declaration.\n\nThe consequence worth stating is extensibility. Because interfaces are open, you can reopen a third-party or global interface, `Window`, `express`'s `Request`, and add members to it from your own code without touching the original. That is a concrete reason to prefer `interface` for public shapes you expect consumers to extend, and to prefer `type` when you want a closed definition that no one can silently widen.",
    interviewLine: "I'd say interfaces are open \u2014 anyone can reopen and extend them \u2014 while type aliases are closed; that's the practical difference I care about, not the syntax.",
    misconception: "Treating interface and type as pure synonyms. Only interfaces merge, which matters for library augmentation.",
    hints: [
      "Think about declaring the same name twice with each construct.",
      "How would you add a property to a type declared in someone else's package?",
      "One form is open and reopenable; the other binds a name exactly once."
    ],
    example: {
      caption: "Merging lets you augment a global interface from your own file.",
      language: "typescript",
      code: "// the library declares: interface Window { ... }\ndeclare global {\n  interface Window {\n    analytics: { track(e: string): void };\n  }\n}\n\nwindow.analytics.track(\"page_view\"); // now typed\nexport {}; // keep this file a module"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-variance-annotations-in-out",
    title: "What the in and out variance annotations declare",
    prompt: "What do the in and out modifiers on these type parameters mean?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "variance",
      "generics",
      "senior"
    ],
    codeSnippet: "interface Producer<out T> {\n  get(): T;\n}\n\ninterface Consumer<in T> {\n  set(value: T): void;\n}\n\ninterface Processor<in out T> {\n  process(value: T): T;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "They declare variance explicitly: out is covariant, in is contravariant, in out is invariant",
        isCorrect: true,
        explanation: "Correct. They state the subtyping relationship the compiler would otherwise infer structurally."
      },
      {
        id: "B",
        text: "They make the type parameter optional at the use site",
        isCorrect: false,
        explanation: "Optionality of type arguments comes from defaults such as <T = string>, not from variance annotations."
      },
      {
        id: "C",
        text: "They mark parameters as input-only or output-only for the runtime",
        isCorrect: false,
        explanation: "They are erased at compile time and have no runtime meaning whatsoever."
      },
      {
        id: "D",
        text: "They restrict T to primitive types in the in case and object types in the out case",
        isCorrect: false,
        explanation: "They say nothing about what T may be, only about how the generic type relates under assignment."
      }
    ],
    correctAnswer: "A",
    explanation: "Variance annotations, added in TypeScript 4.7, declare how a generic type's assignability follows its type argument. `out T` marks `T` covariant: it appears only in output positions, so `Producer<Dog>` is assignable to `Producer<Animal>`, you only ever read a `T` out, so widening the result is safe. `in T` marks `T` contravariant: it appears only in input positions, so `Consumer<Animal>` is assignable to `Consumer<Dog>`, a thing that accepts any `Animal` can stand in where something accepting a `Dog` is wanted. `in out` is invariant: `T` is both read and written, so neither direction is safe.\n\nThe wrong answers confuse variance with unrelated features. Optional type arguments come from defaults like `<T = string>`, not from `in`/`out`. The annotations are erased at compile time and have no runtime meaning. And they say nothing about what `T` may be, they constrain assignability between instantiations, not the set of allowed types.\n\nThe nuance worth stating is that these annotations are usually optional. TypeScript infers variance structurally from how `T` is used, so the main reasons to write them are to document intent, to catch a mistake at the declaration if a parameter is used in the wrong position, and to speed up checking of very large recursive generic types, where structural inference is expensive.",
    interviewLine: "I read `out` as 'I only ever get T out, so widening is safe' and `in` as 'I only ever put T in, so narrowing is safe'.",
    misconception: "Assuming variance annotations change what T can be. They only describe assignability between instantiations.",
    hints: [
      "Think about which direction assignment is safe for a producer versus a consumer.",
      "If you only ever read a T out of something, is it safe to treat it as producing a supertype?",
      "The annotations describe assignability between instantiations, not what T may be."
    ],
    example: {
      caption: "A read-only producer is covariant: a Dog producer is usable as an Animal producer.",
      language: "typescript",
      code: "interface Animal { name: string }\ninterface Dog extends Animal { breed: string }\n\ninterface Producer<out T> { get(): T }\n\nconst dogs: Producer<Dog> = { get: () => ({ name: \"Rex\", breed: \"Lab\" }) };\nconst animals: Producer<Animal> = dogs; // ok: covariant"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-overload-implementation-signature",
    title: "What an implementation signature must satisfy",
    prompt: "A function has two overloads: (a: string) and (a: string.rest: number[]). What must be true of the implementation signature?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "overloads",
      "functions",
      "senior"
    ],
    codeSnippet: "function format(a: string): string;\nfunction format(a: string...rest: number[]): string;\nfunction format(a: string...rest: number[]): string {\n  return rest.length ? `${a}:${rest.join(',')}`: a;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It must be callable by every overload, so the rest parameter has to accept being empty",
        isCorrect: true,
        explanation: "Correct. The first overload passes no rest arguments, so rest must be satisfiable as an empty array."
      },
      {
        id: "B",
        text: "It must exactly match one of the declared overloads",
        isCorrect: false,
        explanation: "It must be compatible with all of them, which usually means it is broader than any single one."
      },
      {
        id: "C",
        text: "It becomes part of the public API alongside the overloads",
        isCorrect: false,
        explanation: "The implementation signature is not callable from outside, only the overload signatures are visible."
      },
      {
        id: "D",
        text: "Rest parameters are not permitted in an implementation signature",
        isCorrect: false,
        explanation: "They are permitted and common; a rest parameter is the usual way to absorb differing arities."
      }
    ],
    correctAnswer: "A",
    explanation: "The overload signatures define the public API; the implementation signature sits below them and is invisible to callers. Its only job is to be compatible with every overload at once. Here the first overload passes no rest arguments and the second passes some, so the implementation's `...rest: number[]` has to accept being empty, which a rest parameter does naturally, calls matching the first overload simply bind `rest` to `[]`.\n\nThe other options misstate the contract. The implementation does not have to exactly match one overload, it must satisfy all of them, so it is usually broader than any single one. It is not part of the public API, callers can only invoke the declared overload signatures, never the implementation. And rest parameters are not forbidden there; they are the usual way to absorb differing arities across overloads.\n\nThe subtlety worth stating is that widening the implementation signature does not widen what callers may pass. Only the overload signatures are visible, so an implementation typed `(a: string | number, ...rest: unknown[])` still rejects a call that no overload permits. This is also why the compiler does not type-check the body against each overload individually, it is on you to ensure the implementation actually honours every declared shape.",
    interviewLine: "I treat the overload signatures as the API and the implementation signature as plumbing that has to satisfy all of them and is never callable itself.",
    misconception: "Expecting callers to be able to use the implementation signature. Only the declared overloads are visible.",
    hints: [
      "Think about what each overload passes to the implementation.",
      "What does rest bind to when the caller passes only one argument?",
      "The implementation must satisfy every overload, so it is usually wider than any one of them."
    ],
    example: {
      caption: "Only the overload signatures are callable; the implementation is invisible to callers.",
      language: "typescript",
      code: "function parse(x: string): number;\nfunction parse(x: number): string;\nfunction parse(x: string | number): string | number {\n  return typeof x === \"string\" ? Number(x) : String(x);\n}\n\nconst n = parse(\"42\"); // number\nconst s = parse(42);   // string"
    },
    source: "tricky-typescript-12",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-superset-static-typing-basics",
    title: "What TypeScript adds on top of JavaScript",
    prompt: "Which statement best describes TypeScript's relationship to JavaScript?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "fundamentals",
      "tooling"
    ],
    codeSnippet: "function add(a: number, b: number): number {\n  return a + b;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A linter that reports type problems without changing the output",
        isCorrect: false,
        explanation: "It is a compiler with its own syntax, enums, interfaces, generics, not a linting layer over JavaScript."
      },
      {
        id: "B",
        text: "A superset that adds optional static types, all of which are erased before the code runs",
        isCorrect: true,
        explanation: "Correct. Every valid JavaScript file is valid TypeScript, and the types exist only at compile time."
      },
      {
        id: "C",
        text: "A separate language that compiles to JavaScript but shares no syntax with it",
        isCorrect: false,
        explanation: "It is a strict superset, plain JavaScript is already valid TypeScript."
      },
      {
        id: "D",
        text: "A runtime that enforces types while the program executes",
        isCorrect: false,
        explanation: "There is no runtime type checking. Annotations are stripped by the compiler."
      }
    ],
    correctAnswer: "B",
    explanation: "TypeScript is a strict superset of JavaScript: every valid JavaScript file is already valid TypeScript, so you adopt typing gradually rather than rewriting. On top of that base it adds its own syntax, type annotations, interfaces, generics, enums, and a structural type system that checks your code as you write it. The `add` function here is ordinary JavaScript with `: number` annotations layered on.\n\nEverything the type system knows is discarded by the compiler before the code runs. The emitted JavaScript carries no annotations, no interfaces, no generics, which means zero runtime cost and zero bundle weight, but equally zero runtime protection. A value that arrives from an API or `JSON.parse` as the wrong shape is not caught by the types; only a runtime check you write yourself can catch it.\n\nThe other options each miss this. It is a compiler with real syntax, not a linter layered over JavaScript; it shares all of JavaScript's syntax rather than being a separate language; and it does no runtime enforcement, annotations are erased, not checked while the program executes. The edge an interviewer probes is exactly that gap: a type assertion like `as User` on an untyped response changes what the compiler believes but validates nothing at runtime, which is why schema validators exist for data crossing a trust boundary.",
    interviewLine: "I stress that types are compile-time only \u2014 they're erased before the code runs, so they catch my mistakes, not my users' data.",
    misconception: "Expecting TypeScript to validate data at runtime. A type assertion on an API response checks nothing.",
    hints: [
      "Think about what the compiler produces after it finishes.",
      "What is left in the emitted JavaScript after compilation?",
      "If the types are gone at runtime, who do they actually protect?"
    ],
    example: {
      caption: "The annotations vanish; the emitted JavaScript is identical to the untyped version.",
      language: "typescript",
      code: "// source.ts\nconst greet = (name: string): string => `Hi ${name}`;\n\n// emitted .js, types stripped:\n// const greet = (name) => `Hi ${name}`;\n\n// so a bad API response is not caught for you:\nconst data = JSON.parse(\"{}\") as { id: number };\ndata.id.toFixed(2); // compiles, throws at runtime"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-interfaces-describe-shape",
    title: "What an interface is for",
    prompt: "What does an interface do in TypeScript?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "contracts"
    ],
    codeSnippet: "interface Person {\n  firstName: string;\n  lastName: string;\n  greet(): void;\n}\n\nclass Employee implements Person {\n  constructor(\n    public firstName: string,\n    public lastName: string,\n  ) {}\n  greet() {\n    console.log(`Hi, ${this.firstName}`);\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It generates a runtime class with default implementations",
        isCorrect: false,
        explanation: "Interfaces emit nothing at all. There is no runtime artifact."
      },
      {
        id: "B",
        text: "It describes the shape a value must have, and is erased at compile time",
        isCorrect: true,
        explanation: "Correct. It is a compile-time contract, properties, their types, and method signatures."
      },
      {
        id: "C",
        text: "It creates a new value that can be instantiated with new",
        isCorrect: false,
        explanation: "You cannot instantiate an interface; only classes produce values."
      },
      {
        id: "D",
        text: "It validates objects against the declared shape when they are created",
        isCorrect: false,
        explanation: "No validation happens at runtime. Checking is entirely static."
      }
    ],
    correctAnswer: "B",
    explanation: "An interface declares the shape a value must have, which properties exist, what types they hold, what methods they expose, and emits nothing into the compiled output. It is a compile-time contract, not a runtime object. In the example, `Employee implements Person` asks the compiler to verify the class provides a `string` `firstName`, a `string` `lastName` and a `greet()` method, and the check happens entirely at build time.\n\nBecause TypeScript is structurally typed rather than nominally typed, `implements` is a convenience, not a requirement. Any object with the right members satisfies `Person`, whether or not it ever named the interface, so a plain object literal `{ firstName, lastName, greet }` is just as assignable as a class that explicitly implements it. This is what lets types from unrelated libraries interoperate without adapters.\n\nThe other options describe things interfaces do not do: they generate no runtime class or default implementations, you cannot instantiate one with `new`, and no validation runs when an object is created. The nuance worth stating is that interfaces merge across declarations, redeclaring the same interface name adds members, which makes them the right choice for shapes other code is expected to extend or augment.",
    interviewLine: "I describe an interface as a compile-time contract, not a runtime object \u2014 structural typing means anything with the right shape satisfies it.",
    misconception: "Thinking a value must explicitly implement an interface to be assignable to it. Structural typing says otherwise.",
    hints: [
      "Think about what an interface leaves behind after compilation.",
      "What does an interface compile down to?",
      "A value does not have to say it implements the interface to satisfy it."
    ],
    example: {
      caption: "Structural typing means a plain object satisfies an interface without declaring it.",
      language: "typescript",
      code: "interface Point { x: number; y: number }\n\nfunction length(p: Point) {\n  return Math.hypot(p.x, p.y);\n}\n\nconst anywhere = { x: 3, y: 4, label: \"origin\" };\nlength(anywhere); // ok: it has the right shape"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-generics-preserve-type-relationship",
    title: "What a generic buys you over any",
    prompt: "Why is identity<T>(value: T): T better than identity(value: any): any?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "any",
      "type-safety"
    ],
    codeSnippet: "function identity<T>(value: T): T {\n  return value;\n}\n\nconst n = identity(42);      // number\nconst s = identity(\"hello\"); // string",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The generic version runs faster because it avoids runtime type checks",
        isCorrect: false,
        explanation: "Neither performs runtime checks; both compile to the same JavaScript."
      },
      {
        id: "B",
        text: "any is not allowed as a return type in strict mode",
        isCorrect: false,
        explanation: "any is permitted everywhere. strict does not forbid it."
      },
      {
        id: "C",
        text: "The generic restricts the function to a single type across the whole program",
        isCorrect: false,
        explanation: "T is resolved per call site, so different calls can use different types."
      },
      {
        id: "D",
        text: "The generic preserves the relationship between argument and return type; any discards it",
        isCorrect: true,
        explanation: "Correct. T links input to output, so the caller keeps the concrete type instead of falling back to any."
      }
    ],
    correctAnswer: "D",
    explanation: "`any` switches the type system off for a value and everything derived from it. `identity(42): any` returns `any`, and from there the compiler lets you call `.toUpperCase()` on what is really a number with no complaint, the error only surfaces at runtime. A type parameter instead captures whatever the caller actually passed and threads it through to the return type, so `identity(42)` is `number` and `identity('hello')` is `string`. The relationship between input and output is preserved.\n\nThe other options misread what generics do. Both versions compile to the same JavaScript, so there is no runtime speed difference; `any` is permitted everywhere, including under `strict`; and `T` is resolved per call site, not fixed once for the whole program, so different calls bind it to different concrete types.\n\nThe nuance worth stating is when to reach for a type parameter: whenever the output type depends on the input type. If a function just accepts a value and returns something unrelated, a generic buys nothing. But the moment the return should mirror or derive from the argument, a parameter keeps that information flowing where `any` would throw it away, which is also why `unknown` is the safer catch-all when you truly do not know a type, since it forces a narrowing before use.",
    interviewLine: "I point out that a generic relates types to each other while `any` just gives up, so I reach for a type parameter whenever output depends on input.",
    misconception: "Treating any as a lightweight generic. It is the absence of typing, not a flexible form of it.",
    hints: [
      "Compare the return type the caller sees in each version.",
      "What type does the caller get back in each version?",
      "One keeps the input type flowing to the output; the other discards it."
    ],
    example: {
      caption: "A generic threads the element type through; any would lose it.",
      language: "typescript",
      code: "function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = first([1, 2, 3]);        // number | undefined\nconst s = first([\"a\", \"b\"]);       // string | undefined\n// first(...) with any would make both results any"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-decorators-what-they-modify",
    title: "What a decorator can attach to",
    prompt: "What is a decorator in TypeScript?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "decorators",
      "metadata"
    ],
    codeSnippet: "function log(target: unknown, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function (...args: unknown[]) {\n    console.log(`calling ${key}`);\n    return original.apply(this, args);\n  };\n}\n\nclass Service {\n  @log\n  fetch() {}\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A macro the compiler expands inline at every call site where the member is used",
        isCorrect: false,
        explanation: "Tempting if you picture a C-style macro, but a decorator is an ordinary function that runs once when the declaration is evaluated, not expanded at each call site."
      },
      {
        id: "B",
        text: "A shorthand for declaration merging on classes",
        isCorrect: false,
        explanation: "Decorators and declaration merging are unrelated features."
      },
      {
        id: "C",
        text: "A type-level annotation that the compiler erases like any other type",
        isCorrect: false,
        explanation: "Decorators emit real runtime code, they are not erased."
      },
      {
        id: "D",
        text: "A function that wraps or annotates a class, method, accessor, property or parameter at definition time",
        isCorrect: true,
        explanation: "Correct. It runs when the definition is evaluated and can replace or annotate what it decorates."
      }
    ],
    correctAnswer: "D",
    explanation: "A decorator is a function applied to a declaration, a class, method, accessor, property or parameter, at the moment that declaration is evaluated, not at each call. It receives a reference to the target and can wrap, replace or annotate it. The `log` example replaces the method's `descriptor.value` with a wrapper that logs and then delegates through `original.apply`, so every `fetch()` call is traced without the method's own body changing.\n\nUnlike type annotations, decorators are not erased: they emit real runtime code and produce real runtime behaviour, which is why option C is wrong. They are also not a macro expanded at call sites and have nothing to do with declaration merging, the other two traps. The defining property is that they run once, at definition time, and the effect persists on whatever they decorated.\n\nThe current-state nuance is their standardisation. For years decorators were a TypeScript experiment behind `experimentalDecorators`, and frameworks like Angular and NestJS built their dependency injection and metadata systems on that version. The TC39 decorators proposal has since reached Stage 3 and shipped in TypeScript 5.0 with a different signature, so modern code should prefer the standard form, and know that the two are not call-compatible.",
    interviewLine: "I'd flag that decorators run at definition time and emit real code \u2014 unlike everything else in TypeScript's syntax, they are not erased.",
    misconception: "Assuming decorators are compile-time only like type annotations. They produce runtime behaviour.",
    hints: [
      "Check whether anything survives into the compiled output.",
      "Is there anything left in the emitted JavaScript?",
      "It runs once when the declaration is evaluated, not at each call."
    ],
    example: {
      caption: "A class decorator receives the constructor and can replace or wrap it.",
      language: "typescript",
      code: "function sealed<T extends new (...a: any[]) => object>(ctor: T) {\n  Object.seal(ctor);\n  Object.seal(ctor.prototype);\n  return ctor;\n}\n\n@sealed\nclass Config {\n  version = 1;\n}"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/decorators.html"
  },
  {
    id: "typescript-async-await-over-promises",
    title: "What async/await changes about a promise",
    prompt: "How does async/await relate to promises?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "async-await",
    tags: [
      "typescript",
      "async-await",
      "promises"
    ],
    codeSnippet: "async function loadUser(id: string): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It makes asynchronous calls run synchronously, blocking the thread",
        isCorrect: false,
        explanation: "Nothing blocks. await yields control and resumes later in a microtask."
      },
      {
        id: "B",
        text: "It is syntax over promises: an async function returns one, and await unwraps one",
        isCorrect: true,
        explanation: "Correct. Same machinery, and it lets try/catch handle rejections."
      },
      {
        id: "C",
        text: "It only works with promises created by fetch",
        isCorrect: false,
        explanation: "await works on any thenable, whatever produced it."
      },
      {
        id: "D",
        text: "It replaces promises with a different concurrency primitive",
        isCorrect: false,
        explanation: "It is built directly on promises, an async function returns one."
      }
    ],
    correctAnswer: "B",
    explanation: "`async`/`await` is syntax built directly on promises, not a replacement for them. An `async` function always returns a promise, wrapping whatever you return (or throw) in one, and `await` suspends the function until the awaited promise settles, then resumes with its resolved value. In `loadUser`, `await fetch(...)` pauses the function, yields control back to the event loop, and continues once the response arrives.\n\nThe practical win is control flow. Sequential asynchronous steps read top to bottom instead of nesting inside `.then` chains, and ordinary `try/catch` handles a rejection the same way it handles a thrown error. The other options get this wrong: nothing blocks the thread, `await` yields rather than halting everything; `await` works on any thenable, not just `fetch`'s promise; and it is built on promises rather than being a separate concurrency primitive.\n\nThe edge an interviewer probes is accidental serialisation. `await`-ing two independent calls one after another runs them in sequence, roughly doubling the latency, even though they do not depend on each other. When the operations are independent you launch them together and `await Promise.all([...])`, which is the difference between concurrent and serial execution that a naive conversion from `.then` chains often misses.",
    interviewLine: "I remind people that `await` doesn't block, it yields; sequential awaits serialise independent work, so I reach for Promise.all when the calls don't depend on each other.",
    misconception: "Assuming await blocks the thread. It suspends one function while everything else keeps running.",
    hints: [
      "Think about what an async function hands back to its caller.",
      "What does an async function return, always?",
      "Awaiting in sequence serialises work that could have run at the same time."
    ],
    example: {
      caption: "Promise.all runs independent awaits concurrently instead of in sequence.",
      language: "typescript",
      code: "async function load() {\n  // sequential: ~2x slower if the calls don't depend on each other\n  // const user = await getUser();\n  // const posts = await getPosts();\n\n  const [user, posts] = await Promise.all([getUser(), getPosts()]);\n  return { user, posts };\n}"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  },
  {
    id: "typescript-modules-encapsulation",
    title: "What makes a file a module",
    prompt: "In TypeScript, what determines whether a file is a module rather than a global script?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "modules",
      "scope"
    ],
    codeSnippet: "// utils.ts, a module: it has an export\nexport function toSlug(s: string) {\n  return s.toLowerCase().replace(/\\s+/g, \"-\");\n}\n\n// globals.ts, a script: no import or export anywhere\nconst VERSION = \"1.0\";",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The .ts extension, every TypeScript file is a module",
        isCorrect: false,
        explanation: "A .ts file with no import or export is a global script."
      },
      {
        id: "B",
        text: "The presence of at least one top-level import or export",
        isCorrect: true,
        explanation: "Correct. That is the rule; without one, declarations land in the global scope and can collide."
      },
      {
        id: "C",
        text: "Being listed in the include array of tsconfig.json",
        isCorrect: false,
        explanation: "That controls which files are compiled, not whether they are modules."
      },
      {
        id: "D",
        text: "Setting module in tsconfig.json",
        isCorrect: false,
        explanation: "That selects the output module format for files that are already modules."
      }
    ],
    correctAnswer: "B",
    explanation: "A file becomes a module the moment it has a top-level `import` or `export`, that single rule is the whole answer. `utils.ts` has an `export`, so `toSlug` is scoped to the module and other files must import it. `globals.ts` has neither, so it is a global script and its `VERSION` lands in the global scope, where it can collide with a `VERSION` declared in any other script file in the program.\n\nThe other options confuse related but distinct settings. The `.ts` extension alone does not make a module; a `.ts` file with no import or export is still a global script. Being listed in `tsconfig`'s `include` only controls which files are compiled. And the `module` compiler option selects the output format (ESM, CommonJS) for files that are already modules, it does not decide module status.\n\nThe consequence worth stating is the `export {}` idiom. A declaration file or an augmentation that has no natural import or export sometimes needs a bare `export {}` purely to force module status and keep its declarations out of the global scope. `isolatedModules` makes this requirement explicit by rejecting any file that is not a module, which is why you see `export {}` in otherwise self-contained files under that flag.",
    interviewLine: "I keep the rule simple: one top-level import or export is the whole thing \u2014 without it I'm writing globals, whether I meant to or not.",
    misconception: "Assuming every .ts file is automatically scoped. Without an import or export it shares the global scope.",
    hints: [
      "Think about what distinguishes a scoped file from a global one.",
      "Why would you ever write a bare `export {}` in a file?",
      "Without a top-level import or export, the declarations share the global scope."
    ],
    example: {
      caption: "An otherwise global file becomes a module with a single empty export.",
      language: "typescript",
      code: "// before: const API = \"/v1\" leaks into the global scope\n// and can collide with another file's API\n\nconst API = \"/v1\";\nexport {}; // now this file is a module; API is local to it"
    },
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/modules.html"
  },
  {
    id: "javascript-coercion-precedence-trap",
    title: "Unary operators, array coercion and left-to-right +",
    prompt: "What does this log?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "coercion",
      "operators",
      "precedence",
      "senior"
    ],
    codeSnippet: "console.log(+\"5\" + [1] + !\"0\");",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "\"51false\"",
        isCorrect: true,
        explanation: "Correct. Unary operators run first, then binary + evaluates left to right, coercing to string as soon as one side is a string."
      },
      {
        id: "B",
        text: "6",
        isCorrect: false,
        explanation: "Only the first operand becomes a number. [1] coerces to the string \"1\", which turns the whole expression into string concatenation."
      },
      {
        id: "C",
        text: "\"5,1false\"",
        isCorrect: false,
        explanation: "A single-element array stringifies to \"1\" with no comma; commas only appear for multiple elements."
      },
      {
        id: "D",
        text: "NaN",
        isCorrect: false,
        explanation: "No arithmetic on a non-numeric value happens, the expression becomes string concatenation before that could occur."
      }
    ],
    correctAnswer: "A",
    explanation: "Unary operators bind tighter than binary `+`, so they resolve first. `+\"5\"` converts the string to the number `5`, and `!\"0\"` evaluates to `false`, because `\"0\"` is a non-empty string and therefore truthy, only the empty string `\"\"` is falsy among strings. That leaves the expression `5 + [1] + false`.\n\nBinary `+` is left-associative, so it evaluates left to right. `5 + [1]` first coerces the array to a primitive: `[1].toString()` is `\"1\"`, and because one operand is now a string, `+` concatenates rather than adds, giving `\"51\"`. The next step, `\"51\" + false`, concatenates again to produce `\"51false\"`. The single-element array is why there is no comma; `[1,2].toString()` would be `\"1,2\"`, but `[1]` stringifies to just `\"1\"`.\n\nThe trap each wrong answer falls into is a different misread: expecting numeric addition throughout (`6`), inventing a comma from the array (`\"5,1false\"`), or expecting arithmetic on a non-number to yield `NaN`. The key mechanism to internalise is that binary `+` is the one arithmetic operator that is overloaded for string concatenation, so the moment any operand resolves to a string, every `+` from that point rightward concatenates instead of adding.",
    interviewLine: "I remember that binary + is the only arithmetic operator that also concatenates \u2014 one string operand anywhere and the whole chain turns into text.",
    misconception: "Thinking !\"0\" is true. The string \"0\" is truthy; only the empty string is falsy.",
    hints: [
      "Resolve the unary operators before touching the binary +.",
      "Evaluate the two unary operators first, then go left to right.",
      "Once one operand is a string, every following + concatenates."
    ],
    example: {
      caption: "A single string operand flips the whole + chain into concatenation.",
      language: "javascript",
      code: "console.log(1 + 2 + \"3\");   // \"33\": 1+2 is 3, then \"3\" concatenates\nconsole.log(\"1\" + 2 + 3);   // \"123\": string wins from the left\nconsole.log(+\"\" + 1);        // 1: +\"\" is 0, then numeric add\nconsole.log(1 + +\"2\" + \"3\"); // \"33\": +\"2\" is 2, 1+2 is 3, then concat"
    },
    source: "advanced-javascript-6",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators"
  },
  {
    id: "typescript-interface-vs-type-alias-capabilities",
    title: "Interface or type alias: which can do what",
    prompt: "Which capability belongs to interfaces but NOT to type aliases?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "type-aliases",
      "declaration-merging"
    ],
    codeSnippet: "interface User { name: string }\ninterface User { age: number }   // merges\n\ntype Point = { x: number };\n// type Point = { y: number };   // error: duplicate identifier",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Being used as the type of a function parameter",
        isCorrect: false,
        explanation: "Both can annotate a parameter."
      },
      {
        id: "B",
        text: "Being extended to build a wider shape",
        isCorrect: false,
        explanation: "Interfaces use extends and type aliases use &, but both compose."
      },
      {
        id: "C",
        text: "Describing the shape of an object",
        isCorrect: false,
        explanation: "Both do this equally well; a type alias for an object literal is entirely idiomatic."
      },
      {
        id: "D",
        text: "Being reopened and merged by a later declaration of the same name",
        isCorrect: true,
        explanation: "Correct. Declaration merging is unique to interfaces, and it is what makes global and module augmentation possible."
      }
    ],
    correctAnswer: "D",
    explanation: "The capability unique to interfaces is declaration merging: declare the same interface name twice and the compiler combines the declarations into one, so `User` here ends up with both `name` and `age`. A `type` alias binds a name to exactly one type, so a second `type Point` is a duplicate-identifier error. That openness is what makes global augmentation and module augmentation possible, you add a property to `Window` or a third-party type by reopening its interface.\n\nThe other options describe things both constructs do. Both can annotate a function parameter, both can be extended to build a wider shape (interfaces with `extends`, aliases with `&`), and both describe object shapes equally well, a type alias for an object literal is entirely idiomatic.\n\nThe counterweight worth stating is where type aliases win outright: unions, tuples, primitives, mapped and conditional types, none of which an interface can express, because an interface only describes an object shape. So the practical rule is to prefer `interface` for public object shapes others may extend, and `type` when you need a union, a tuple, or any computed type. The two are not interchangeable precisely at the edges where extensibility or type-level computation matters.",
    interviewLine: "I'd say interfaces are open and type aliases are closed \u2014 if someone else needs to extend it from another file, I make it an interface.",
    misconception: "Treating the two as pure synonyms. They differ precisely where extensibility matters.",
    hints: [
      "Try declaring the same name twice with each construct.",
      "What happens if you declare the same name twice with each?",
      "The unique ability is being reopened and merged, not describing object shapes."
    ],
    example: {
      caption: "Two interface declarations merge; a type alias cannot be redeclared.",
      language: "typescript",
      code: "interface Theme { color: string }\ninterface Theme { spacing: number }\n\nconst t: Theme = { color: \"blue\", spacing: 8 }; // both merged\n\n// type Theme2 = { color: string };\n// type Theme2 = { spacing: number }; // error: duplicate identifier"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-extends-vs-intersection-conflict",
    title: "extends and & behave differently on a conflict",
    prompt: "Both compose two shapes with a clashing member. What is the difference?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "intersection",
      "extends",
      "interfaces"
    ],
    codeSnippet: "interface A { id: string }\ninterface B extends A { id: number }      // (1)\n\ntype C = { id: string } & { id: number }; // (2)",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "(1) errors immediately; (2) is accepted but id becomes never, so it is unusable",
        isCorrect: true,
        explanation: "Correct. extends checks compatibility eagerly; & silently intersects the members instead."
      },
      {
        id: "B",
        text: "(1) is accepted and B.id narrows to number; (2) errors",
        isCorrect: false,
        explanation: "extends will not let a subtype change a member to an incompatible type."
      },
      {
        id: "C",
        text: "Both are accepted and the last declaration wins",
        isCorrect: false,
        explanation: "Neither uses last-wins semantics."
      },
      {
        id: "D",
        text: "Both are errors, a member cannot be redeclared with a different type",
        isCorrect: false,
        explanation: "Only the interface form errors. The intersection is accepted at the declaration."
      }
    ],
    correctAnswer: "A",
    explanation: "`extends` is checked eagerly, at the point of declaration. An interface that extends another must stay assignable to it, so `interface B extends A { id: number }` is an immediate error, you cannot redeclare `id` as a type incompatible with the `string` it inherits. The feedback arrives exactly where you wrote the mistake.\n\nAn intersection performs no such compatibility check. `{ id: string } & { id: number }` is accepted at the declaration; TypeScript intersects the two `id` members into `string & number`, a type with no inhabitants, so `id` silently becomes `never`. The type exists and compiles, and the failure only surfaces much later, wherever someone tries to assign a value to `id` and finds that nothing is assignable to `never`.\n\nThe other options invert or confuse this. `extends` does not let a subtype narrow a member to an incompatible type; neither construct uses last-wins semantics; and only the interface form errors, the intersection is accepted at its declaration. The practical takeaway an interviewer wants is that this earlier, localised feedback is a real argument for `extends` when you are modelling inheritance, you learn about the clash at the declaration rather than chasing a mysterious `never` to some distant assignment.",
    interviewLine: "I note that `extends` fails at the declaration while `&` fails at the usage \u2014 with a `never` I then have to go looking for.",
    misconception: "Assuming & and extends are interchangeable. They differ exactly when members conflict.",
    hints: [
      "Work out what type the clashing member ends up with in each case.",
      "What is the type string & number?",
      "One construct complains at the declaration; the other defers the failure to usage."
    ],
    example: {
      caption: "An intersection of incompatible members silently becomes never.",
      language: "typescript",
      code: "type Conflict = { id: string } & { id: number };\n\nconst x: Conflict = { id: \"anything\" };\n// error, but at the assignment: id is string & number = never\n\ntype IdType = Conflict[\"id\"]; // never"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-union-requires-type-alias",
    title: "What only a type alias can express",
    prompt: "You need Status to be exactly 'idle' | 'loading' | 'done'. Which declaration works?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "unions",
      "type-aliases",
      "interfaces"
    ],
    codeSnippet: "type Status = 'idle' | 'loading' | 'done';",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "type Status = 'idle' | 'loading' | 'done'",
        isCorrect: true,
        explanation: "Correct. A union is not an object shape, so only a type alias can name it."
      },
      {
        id: "B",
        text: "interface Status { value: 'idle' | 'loading' | 'done' }",
        isCorrect: false,
        explanation: "That declares an object with a property, not the union itself."
      },
      {
        id: "C",
        text: "interface Status extends 'idle' | 'loading' | 'done' {}",
        isCorrect: false,
        explanation: "An interface can only extend an object type or a statically known shape, not a union of literals."
      },
      {
        id: "D",
        text: "Either, interfaces and type aliases both express unions",
        isCorrect: false,
        explanation: "Interfaces describe object shapes only. Unions, tuples and primitives need an alias."
      }
    ],
    correctAnswer: "A",
    explanation: "An interface describes the shape of an object: a set of named members with types. A union like `'idle' | 'loading' | 'done'` is not a shape at all, it is a choice between types, so there is nothing for an interface to declare. That is why only `type Status = 'idle' | 'loading' | 'done'` works directly.\n\nThe other options each fail on that distinction. Wrapping the union in `interface Status { value: ... }` declares an object with a `value` property, not the union itself. `interface Status extends 'idle' | 'loading' | 'done'` is illegal because an interface can only extend an object type or a statically known class/interface, not a union of literals. And the claim that both forms express unions is simply false.\n\nType aliases have no such restriction: a `type` can name any type at all, unions, tuples, primitives, conditional and mapped types, which is the direct counterweight to the one thing interfaces can do and aliases cannot, declaration merging. In practice this trade decides most real choices: reach for an alias whenever the type is a union, tuple or computed type, and for an interface when it is an open object shape others may extend. A discriminated union, the backbone of exhaustive state modelling, is a union and therefore always an alias.",
    interviewLine: "I'd explain that interfaces describe object shapes while aliases name any type \u2014 a union isn't a shape, so I have to make it an alias.",
    misconception: "Reaching for an interface by default and then wrapping the union in a pointless property.",
    hints: [
      "Decide whether a union is a set of members or a choice between types.",
      "Is a union a set of members, or a choice between types?",
      "An interface describes an object shape; a bare union is not one."
    ],
    example: {
      caption: "Only an alias can name a union, a tuple, or a primitive.",
      language: "typescript",
      code: "type Status = \"idle\" | \"loading\" | \"done\";\ntype Pair = [number, number];\ntype Id = string | number;\n\n// none of these can be expressed as an interface\nconst s: Status = \"loading\";"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-module-augmentation-third-party",
    title: "Adding a property to a third-party type",
    prompt: "A library exports interface Config. You need to add a custom field to it from your own code. How?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "declaration-merging",
      "module-augmentation",
      "interfaces"
    ],
    codeSnippet: "declare module \"some-lib\" {\n  interface Config {\n    myFeatureFlag?: boolean;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reopen the interface inside declare module for that package, so the declarations merge",
        isCorrect: true,
        explanation: "Correct. Module augmentation is exactly this: declaration merging targeted at another package's types."
      },
      {
        id: "B",
        text: "Fork the package's .d.ts file and edit it in place",
        isCorrect: false,
        explanation: "It works until the next upgrade silently reverts it. Augmentation is the supported route."
      },
      {
        id: "C",
        text: "Cast every usage to any at the call sites that need the field",
        isCorrect: false,
        explanation: "That disables checking at each site instead of extending the type once."
      },
      {
        id: "D",
        text: "Declare a type alias with the same name in your own file",
        isCorrect: false,
        explanation: "A type alias cannot merge, a duplicate name is an error, and it would not affect the library's type anyway."
      }
    ],
    correctAnswer: "A",
    explanation: "Module augmentation reopens a declaration inside another package's module scope and merges into it. Writing `declare module \"some-lib\" { interface Config { myFeatureFlag?: boolean } }` adds the property to the library's own `Config`, everywhere `Config` is used, without touching its source. It works precisely because interfaces merge; a `type` alias cannot, so this technique only applies when the library declared the shape as an interface, a concrete argument for exporting public shapes as interfaces in library code.\n\nThe other options are the common wrong instincts. Forking and editing the package's `.d.ts` in `node_modules` works until the next `npm install` silently reverts it. Casting each call site to `any` disables checking locally instead of extending the type once, centrally. And declaring your own `type Config` with the same name neither merges, it is a duplicate-identifier error, nor affects the library's type.\n\nThe mechanism generalises: `declare global { interface Window { myApp: App } }` augments global types the same way. The edge worth stating is that an augmenting file must itself be a module, so it needs at least one top-level `import` or `export`, otherwise `declare module` is interpreted as an ambient module declaration rather than an augmentation and does not merge.",
    interviewLine: "I think of augmentation as declaration merging pointed at somebody else's package, which is exactly why I want library authors to export interfaces, not aliases.",
    misconception: "Trying to augment with a type alias, or editing node_modules and losing it on the next install.",
    hints: [
      "Only one of the two declaration forms can be reopened.",
      "Which of the two declaration forms can be reopened?",
      "The augmenting file must itself be a module, so it needs an import or export."
    ],
    example: {
      caption: "Augmenting Express's Request type adds a field everywhere it is used.",
      language: "typescript",
      code: "import \"express\";\n\ndeclare module \"express\" {\n  interface Request {\n    user?: { id: string };\n  }\n}\n\n// now req.user is typed in every route handler"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-access-modifiers-visibility",
    title: "public, private and protected",
    prompt: "Which statement about TypeScript's access modifiers is correct?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "access-modifiers"
    ],
    codeSnippet: "class Base {\n  public id = 1;      // everywhere\n  protected kind = \"b\"; // this class and subclasses\n  private secret = 42;  // this class only\n}\n\nclass Derived extends Base {\n  read() {\n    return this.kind;   // ok\n    // return this.secret; // error\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "protected members are visible to subclasses; private members are not",
        isCorrect: true,
        explanation: "Correct. That is the entire distinction between them."
      },
      {
        id: "B",
        text: "private members are visible to subclasses but not to outside callers",
        isCorrect: false,
        explanation: "That describes protected. private is limited to the declaring class."
      },
      {
        id: "C",
        text: "Members are private unless marked otherwise",
        isCorrect: false,
        explanation: "The default is public."
      },
      {
        id: "D",
        text: "protected members are accessible from any code in the same module",
        isCorrect: false,
        explanation: "Visibility follows the class hierarchy, not the file or module."
      }
    ],
    correctAnswer: "A",
    explanation: "`public` is the default and imposes no restriction, a `public` member is reachable from anywhere. `protected` narrows access to the declaring class and anything that extends it, which is what lets a base class share internals with its subclasses while keeping them hidden from outside consumers; in the example `Derived.read` can return `this.kind` but external code cannot. `private` narrows further still, to the declaring class alone, so even a subclass cannot see `this.secret`. The difference between the two restricted modifiers is exactly whether the inheritance chain can reach the member.\n\nThe wrong options invert or misplace this. `private` members are not visible to subclasses, that is `protected`; the default is `public`, not `private`; and `protected` follows the class hierarchy, not the file or module, so being in the same module grants no access.\n\nThe nuance worth stating is that all three are compile-time only. They are erased from the emitted JavaScript, so none of them prevents access at runtime, a cast to `any`, a bracket index, or plain JavaScript interop can still reach a `private` field, and it still appears in `JSON.stringify` and `Object.keys`. When you need a boundary the runtime actually enforces, you reach for an ECMAScript `#private` field instead.",
    interviewLine: "I'd say `protected` is for my subclasses and `private` is for me alone \u2014 both are erased, so neither stops anyone at runtime.",
    misconception: "Expecting a subclass to reach a private member. Only protected crosses the inheritance boundary.",
    hints: [
      "Decide which modifier is about the inheritance chain.",
      "Which one is about the inheritance chain rather than the class itself?",
      "All three are erased, so none of them restricts access at runtime."
    ],
    example: {
      caption: "A subclass can reach a protected member but not a private one.",
      language: "typescript",
      code: "class Account {\n  protected balance = 0;\n  private pin = 1234;\n}\n\nclass Savings extends Account {\n  check() {\n    return this.balance; // ok\n    // return this.pin;  // error: private to Account\n  }\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "typescript-private-keyword-vs-hash-private",
    title: "private versus #private",
    prompt: "What is the practical difference between private balance and #balance?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "private-fields"
    ],
    codeSnippet: "class A {\n  private balance = 0;\n}\nclass B {\n  #balance = 0;\n}\n\nconsole.log((new A() as any).balance); // 0, erased, still there\nconsole.log((new B() as any).balance); // undefined, genuinely hidden",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "#balance is a TypeScript feature that compiles down to private",
        isCorrect: false,
        explanation: "# private fields are standard ECMAScript, not a TypeScript invention."
      },
      {
        id: "B",
        text: "private works on methods while # works only on fields",
        isCorrect: false,
        explanation: "Both apply to fields and methods."
      },
      {
        id: "C",
        text: "They are identical; # is only newer syntax for the same thing",
        isCorrect: false,
        explanation: "They enforce at different times, one at compile time, the other at runtime."
      },
      {
        id: "D",
        text: "private is a compile-time check that is erased; #balance is enforced by the runtime",
        isCorrect: true,
        explanation: "Correct. A cast to any defeats private; nothing defeats a # field."
      }
    ],
    correctAnswer: "D",
    explanation: "`private` is part of the type system, so it vanishes with the types. At runtime the property is an ordinary property: a cast to `any` or a bracket access `(obj as any).balance` reaches it, it shows up in `JSON.stringify` and `Object.keys`, and plain JavaScript that never saw the types can read and write it freely. It is enforced only by the compiler, as guidance to callers.\n\nA `#` field is genuinely different: it is standard ECMAScript private state, not a TypeScript invention. The `#name` is not a property key at all, so it never appears in serialisation or enumeration, access from outside the class is a syntax error caught at parse time, and no cast can defeat it. This is why option D is correct and the others wrong, they are not identical newer syntax, `#` is not a TypeScript feature compiling down to `private`, and both forms apply equally to fields and methods.\n\nThe decision an interviewer wants is when each fits. Use `private` when you want the compiler to steer callers away from internals but still allow controlled escape hatches (tests, serialisation). Use `#` when the boundary genuinely has to hold at runtime, for example when untrusted code shares the process or when a field must stay out of `JSON.stringify` output. The trade-off is that `#` fields cannot be accessed via computed keys and interact differently with some older tooling and proxies.",
    interviewLine: "I treat `private` as advice to the compiler and `#` as enforced by the engine \u2014 if untrusted code runs in my process, only one of them is real.",
    misconception: "Assuming TypeScript's private survives compilation. It is erased along with every other annotation.",
    hints: [
      "Compare what each leaves in the compiled JavaScript.",
      "What is left in the emitted JavaScript for each?",
      "One is a compile-time check a cast defeats; the other the engine enforces."
    ],
    example: {
      caption: "A # field is absent from serialisation and unreachable from outside.",
      language: "typescript",
      code: "class Wallet {\n  #balance = 100;\n  report() { return this.#balance; }\n}\n\nconst w = new Wallet();\nconsole.log(JSON.stringify(w)); // {} , #balance is hidden\n// console.log(w.#balance);     // SyntaxError at parse time"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "typescript-parameter-properties-shorthand",
    title: "Parameter properties",
    prompt: "What does the modifier on a constructor parameter do?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "constructor",
      "parameter-properties"
    ],
    codeSnippet: "class Point {\n  constructor(\n    public readonly x: number,\n    public readonly y: number,\n  ) {}\n}\n\n// equivalent to declaring both fields and assigning them in the body",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It marks the parameter optional at the call site",
        isCorrect: false,
        explanation: "Optionality comes from? or a default value, not from an access modifier."
      },
      {
        id: "B",
        text: "It makes the parameter available to subclasses only",
        isCorrect: false,
        explanation: "Visibility follows whichever modifier you wrote; the promotion itself is the feature."
      },
      {
        id: "C",
        text: "It has no runtime effect and is purely documentation",
        isCorrect: false,
        explanation: "It emits a real assignment in the constructor."
      },
      {
        id: "D",
        text: "It declares a field and assigns the argument to it automatically",
        isCorrect: true,
        explanation: "Correct. An access modifier or readonly on a constructor parameter promotes it to a property."
      }
    ],
    correctAnswer: "D",
    explanation: "Adding an access modifier (`public`, `private`, `protected`) or `readonly` to a constructor parameter tells TypeScript to declare a class field of the same name and assign the argument to it automatically. The `Point` example is exactly equivalent to declaring `x` and `y` as fields and writing `this.x = x; this.y = y` in the body, the modifier collapses that declare-then-assign boilerplate into one place.\n\nThe other options misread it. It does not make the parameter optional, that comes from `?` or a default value. Its visibility follows whichever modifier you wrote, not subclasses specifically; the promotion to a field is the feature, independent of which modifier. And it is not documentation-only: it emits a real assignment in the constructor, making it one of the few TypeScript constructs that generate code rather than being erased.\n\nThe caveat worth stating is the one that bites people: only a parameter carrying a modifier is promoted. A bare parameter stays an ordinary parameter and never becomes a field, so mixing modified and unmodified parameters in the same constructor, `constructor(public id: string, name: string)`, quietly creates a field for `id` but not `name`, which is a common source of `this.name is undefined` confusion.",
    interviewLine: "I point out that a modifier on a constructor parameter promotes it to a field \u2014 it's one of the rare bits of TypeScript syntax that actually emits code.",
    misconception: "Expecting every constructor parameter to become a property. Only the ones carrying a modifier do.",
    hints: [
      "Compare it with writing the field declaration and the assignment yourself.",
      "Compare it with writing the field declaration and the this.x = x line yourself.",
      "Only a parameter carrying a modifier is promoted; a bare one stays a parameter."
    ],
    example: {
      caption: "The modifier replaces the usual declare-then-assign boilerplate.",
      language: "typescript",
      code: "// shorthand\nclass A {\n  constructor(private name: string) {}\n}\n\n// equivalent longhand\nclass B {\n  private name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-implements-vs-extends",
    title: "implements versus extends",
    prompt: "What is the difference between a class that implements an interface and one that extends a base class?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "interfaces",
      "inheritance"
    ],
    codeSnippet: "interface Serializable { serialize(): string }\n\nclass Base { protected id = 0 }\n\nclass Doc extends Base implements Serializable {\n  serialize() { return String(this.id); }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "extends is erased at compile time while implements emits a prototype link",
        isCorrect: false,
        explanation: "This inverts it: extends emits the prototype chain, implements is erased."
      },
      {
        id: "B",
        text: "implements copies the interface's members into the class",
        isCorrect: false,
        explanation: "It inherits nothing. The class must supply every member itself."
      },
      {
        id: "C",
        text: "implements is a compile-time conformance check that inherits no implementation; extends inherits real members",
        isCorrect: true,
        explanation: "Correct, which is also why a class may implement many interfaces but extend only one class."
      },
      {
        id: "D",
        text: "They are interchangeable; implements is preferred stylistically",
        isCorrect: false,
        explanation: "They do different jobs. Only extends brings behaviour."
      }
    ],
    correctAnswer: "C",
    explanation: "`implements` asks the compiler to verify that a class satisfies a contract. It brings no implementation with it, so every member the interface declares has to be written out in the class, and it disappears entirely from the emitted JavaScript. `extends` is different in kind: it creates a real prototype chain and inherits the base class's concrete members, so `Doc extends Base` gets `Base`'s `id` for free. That inheritance is why a class may `implement` any number of interfaces but `extend` exactly one class.\n\nThe wrong options invert this. It is `extends`, not `implements`, that emits a prototype link; `implements` is erased. `implements` copies nothing, the class must supply every member. And the two are not interchangeable, only `extends` brings behaviour.\n\nThe nuance worth stating follows from structural typing: a class with the right shape is already assignable to an interface whether or not it says `implements`. So `implements` adds no capability, its value is purely that it moves the conformance error onto the class declaration, where you can see immediately that a member is missing or mistyped, rather than letting the mismatch surface at some distant call site that tried to use the class as the interface.",
    interviewLine: "I describe `implements` as a checked promise and `extends` as actual inheritance \u2014 structural typing means I don't need the promise, but I want the error where the class is, not where it's used.",
    misconception: "Expecting implements to provide members. It only verifies that you wrote them.",
    hints: [
      "Check which keyword survives into the compiled JavaScript.",
      "Which one is still present in the compiled JavaScript?",
      "One verifies a contract and brings nothing; the other inherits real members."
    ],
    example: {
      caption: "A class may implement many interfaces but extend only one base.",
      language: "typescript",
      code: "interface Printable { print(): void }\ninterface Loggable { log(): void }\nclass Base { id = 0 }\n\nclass Doc extends Base implements Printable, Loggable {\n  print() {}\n  log() {}\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "typescript-abstract-class-vs-interface",
    title: "Abstract class or interface",
    prompt: "When should you reach for an abstract class rather than an interface?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "abstract",
      "interfaces",
      "design"
    ],
    codeSnippet: "abstract class Repository<T> {\n  abstract find(id: string): Promise<T | null>;\n\n  // shared implementation subclasses inherit\n  async findOrFail(id: string): Promise<T> {\n    const found = await this.find(id);\n    if (!found) throw new Error(`not found: ${id}`);\n    return found;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When the contract must be satisfied by more than one class",
        isCorrect: false,
        explanation: "Interfaces handle that fine, and without consuming the single extends slot."
      },
      {
        id: "B",
        text: "When you want the contract checked at compile time",
        isCorrect: false,
        explanation: "Both are checked at compile time."
      },
      {
        id: "C",
        text: "When the type includes optional members",
        isCorrect: false,
        explanation: "Both express optional members with ?."
      },
      {
        id: "D",
        text: "When you need shared implementation alongside the contract",
        isCorrect: true,
        explanation: "Correct. An abstract class can ship working methods; an interface cannot ship any."
      }
    ],
    correctAnswer: "D",
    explanation: "Both an abstract class and an interface declare a contract, but only an abstract class can also carry implementation. It can ship concrete methods, constructor logic and `protected` state while leaving selected members `abstract` for subclasses to fill in. The `Repository` example does exactly this: `find` is abstract, but `findOrFail` is a working method every subclass inherits, built on top of the abstract `find`. An interface can declare the shape of `findOrFail` but can never provide its body.\n\nThe wrong options point at things interfaces handle fine. A contract satisfied by many classes is an interface's strength, and without consuming the one `extends` slot. Both constructs are checked at compile time, and both express optional members with `?`. None of those is a reason to pay for an abstract class.\n\nThe cost that decides it is the single `extends` slot and a real runtime artifact, an abstract class emits a constructor and prototype. The rule of thumb: if you have behaviour to share, use an abstract class; if you only have a shape to describe, use an interface, which is free at runtime and can be implemented alongside any number of other interfaces. The edge case is wanting shared behaviour across an existing hierarchy, where mixins or composition can beat an abstract base precisely because the base would spend that one inheritance slot.",
    interviewLine: "I pick an interface when I have a shape and an abstract class when I also have behaviour worth inheriting, and I remember it spends the one `extends` slot.",
    misconception: "Reaching for an abstract class purely to declare a contract, and paying the inheritance cost for nothing.",
    hints: [
      "Ask which construct can carry a method body.",
      "Which of the two can contain a method with a body?",
      "If you only have a shape to describe, the free, multiply-implementable option wins."
    ],
    example: {
      caption: "An abstract class ships shared behaviour while leaving some members unfilled.",
      language: "typescript",
      code: "abstract class Shape {\n  abstract area(): number;\n  describe() {\n    return `area is ${this.area()}`; // shared, inherited\n  }\n}\n\nclass Circle extends Shape {\n  constructor(private r: number) { super(); }\n  area() { return Math.PI * this.r ** 2; }\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-generic-constraint-extends",
    title: "Constraining a type parameter",
    prompt: "Why does the unconstrained version fail to compile?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "constraints",
      "keyof"
    ],
    codeSnippet: "function longest1<T>(a: T, b: T) {\n  return a.length >= b.length ? a: b; // error: no 'length' on T\n}\n\nfunction longest2<T extends { length: number }>(a: T, b: T) {\n  return a.length >= b.length ? a: b; // ok\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Generic functions cannot access properties of their parameters at all",
        isCorrect: false,
        explanation: "They can, once the constraint guarantees the property exists."
      },
      {
        id: "B",
        text: "T must be constrained to a class for property access to work",
        isCorrect: false,
        explanation: "Any constraint that guarantees the member is enough, an object literal type works."
      },
      {
        id: "C",
        text: "The two parameters must have different type parameters",
        isCorrect: false,
        explanation: "Sharing T is correct here and is not the cause of the error."
      },
      {
        id: "D",
        text: "An unconstrained T could be anything, so the compiler cannot assume it has length",
        isCorrect: true,
        explanation: "Correct. extends narrows what T may be, which is what unlocks the member access."
      }
    ],
    correctAnswer: "D",
    explanation: "An unconstrained type parameter `T` stands for absolutely any type, so inside the function body the compiler only permits operations valid on every possible type. Reading `.length` is not one of them, a `number` or a `boolean` has no `length`, so `longest1` fails to compile. Adding `T extends { length: number }` narrows the set of types `T` may be to those that have a numeric `length`, and in exchange the compiler lets you read that member in the body, which is why `longest2` compiles.\n\nThe wrong options miss the trade. Generic functions can access parameter properties, once a constraint guarantees them. The constraint need not be a class; any type that guarantees the member works, including an object-literal type like `{ length: number }`. And sharing one `T` across both parameters is correct here, not the cause of the error.\n\nThe principle an interviewer wants named is that a constraint is a two-way deal: the more you constrain `T`, the more you can do with it. It also tightens the call site, `longest2` rejects a plain `number` argument at the caller, because a `number` is not assignable to `{ length: number }`, rather than failing deep inside the body. The subtlety is that `extends` on a type parameter means assignable to, not class inheritance, so `string`, arrays and any `{ length }` object all satisfy it.",
    interviewLine: "I treat a constraint as a two-way deal: I narrow what callers may pass, and in return the compiler lets me use what I've guaranteed.",
    misconception: "Reading extends as inheritance. On a type parameter it means 'is assignable to'.",
    hints: [
      "Ask what operations are valid on a value that could be any type.",
      "What can you safely do to a value whose type could be anything at all?",
      "Here extends means 'is assignable to', not inheritance."
    ],
    example: {
      caption: "A constraint unlocks member access inside the body and tightens the call site.",
      language: "typescript",
      code: "function pluckId<T extends { id: string }>(item: T): string {\n  return item.id; // allowed because the constraint guarantees it\n}\n\npluckId({ id: \"a\", name: \"x\" }); // ok\n// pluckId({ name: \"x\" });        // error: missing id"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-keyof-generic-property-lookup",
    title: "Typing a property getter with keyof",
    prompt: "What is the return type of getProperty(user, 'age')?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "keyof",
      "indexed-access"
    ],
    codeSnippet: "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: \"Ada\", age: 36 };\nconst a = getProperty(user, \"age\");",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "unknown, because T is generic",
        isCorrect: false,
        explanation: "T is inferred from the argument as the concrete object type."
      },
      {
        id: "B",
        text: "string | number, the union of the object's value types",
        isCorrect: false,
        explanation: "The indexed access type T[K] resolves to the specific member, not the union of all of them."
      },
      {
        id: "C",
        text: "number, because K is inferred as the literal 'age' and T['age'] is number",
        isCorrect: true,
        explanation: "Correct. K is inferred as a literal key, so the lookup resolves exactly."
      },
      {
        id: "D",
        text: "any, because the key is only known at runtime",
        isCorrect: false,
        explanation: "The key is a string literal, so it is known statically."
      }
    ],
    correctAnswer: "C",
    explanation: "Two inferences cooperate here. `T` is inferred from `obj` as the concrete object type `{ name: string; age: number }`. `K` is constrained to `keyof T`, which is the union of literal keys `'name' | 'age'`, so when you pass the literal `'age'`, `K` is inferred as the literal `'age'` rather than widening to `string`. The return type `T[K]` is an indexed access type, and with `K` pinned to `'age'` it resolves to exactly `T['age']`, which is `number`.\n\nThe wrong options each misjudge how far inference goes. `T` is not left generic, it is inferred from the argument; the result is not the union `string | number`, because the indexed access resolves to the one member the literal key selects; and the key is a static string literal, not a runtime-only value, so it is not `any`.\n\nThe safety this buys is worth stating: because `K extends keyof T`, calling `getProperty(user, 'email')` is a compile error, `'email'` is not in `keyof T`, so typos and stale keys are caught at build time. The same `keyof` + indexed-access pattern scales to `Pick<T, K>` and to setters typed `(obj: T, key: K, value: T[K])`, turning what would be a loose `string` lookup into a precise, statically-checked one.",
    interviewLine: "I use `keyof` plus an indexed access type to turn a runtime lookup into a compile-time one \u2014 the return type follows the key I actually passed.",
    misconception: "Expecting the union of all property types. The literal key resolves to exactly one.",
    hints: [
      "Work out what K infers to from a string-literal argument.",
      "What does K infer as when the argument is a string literal constrained to keyof T?",
      "The indexed access resolves to one member type, not the union of all of them."
    ],
    example: {
      caption: "The constrained key makes the return type follow the exact key passed.",
      language: "typescript",
      code: "function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {\n  return keys.reduce((acc, k) => ((acc[k] = obj[k]), acc), {} as Pick<T, K>);\n}\n\nconst u = { id: 1, name: \"Ada\", age: 36 };\nconst r = pick(u, [\"id\", \"name\"]); // { id: number; name: string }"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-generic-default-type-parameter",
    title: "Default type parameters",
    prompt: "What does the = Record<string, unknown> do here?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "defaults"
    ],
    codeSnippet: "interface ApiResponse<T = Record<string, unknown>> {\n  data: T;\n  status: number;\n}\n\nconst a: ApiResponse = { data: {}, status: 200 };\nconst b: ApiResponse<User[]> = { data: users, status: 200 };",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It supplies the type argument when the caller omits one",
        isCorrect: true,
        explanation: "Correct, the same idea as a default parameter value, at the type level."
      },
      {
        id: "B",
        text: "It makes T optional at runtime",
        isCorrect: false,
        explanation: "Type parameters have no runtime existence at all."
      },
      {
        id: "C",
        text: "It forces T to be inferred rather than written explicitly",
        isCorrect: false,
        explanation: "Explicit type arguments remain available, as ApiResponse<User[]> shows."
      },
      {
        id: "D",
        text: "It constrains T so only Record<string, unknown> may be passed",
        isCorrect: false,
        explanation: "That is what extends does. = supplies a fallback and constrains nothing."
      }
    ],
    correctAnswer: "A",
    explanation: "`= Record<string, unknown>` supplies a default type argument: when the caller writes `ApiResponse` with no angle brackets, `T` falls back to `Record<string, unknown>`, exactly like a default value on an ordinary function parameter, but at the type level. So `a` uses the default and `b` overrides it with `User[]`. The default keeps the common case terse while leaving the parameter available when a caller needs a specific type.\n\nThe wrong options confuse the default with other features. It has no runtime existence, type parameters are erased. It does not force inference, explicit type arguments like `ApiResponse<User[]>` remain fully available. And it does not constrain `T`, that is what `extends` does; a default supplies a fallback and restricts nothing about what may be passed.\n\nThe nuance worth stating is that defaults and constraints are orthogonal and frequently combine: `<T extends object = Record<string, unknown>>` both restricts `T` to object types and supplies a fallback when none is given. As with value parameters, a defaulted type parameter must come after any non-defaulted ones in the list, otherwise the compiler cannot tell which argument you are omitting.",
    interviewLine: "I read `extends` as restricting what T may be and `=` as saying what T is when nobody specifies \u2014 they're independent and I often use them together.",
    misconception: "Confusing = with extends. One is a fallback, the other a restriction.",
    hints: [
      "Think of the equivalent feature for ordinary function parameters.",
      "What is the analogous feature for ordinary function parameters?",
      "A default supplies a fallback; it does not restrict what may be passed."
    ],
    example: {
      caption: "A default and a constraint are independent and often combined.",
      language: "typescript",
      code: "interface Box<T extends object = Record<string, unknown>> {\n  value: T;\n}\n\nconst a: Box = { value: {} };          // uses the default\nconst b: Box<{ id: number }> = { value: { id: 1 } };\n// const c: Box<string> = ...;         // error: violates the constraint"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-deep-readonly-builtin-objects",
    title: "Where a naive DeepReadonly breaks down",
    prompt: "DeepReadonly<T> recurses whenever a property extends object. What does that do to a Date or a Map?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "recursive-types",
      "mapped-types",
      "built-ins"
    ],
    codeSnippet: "type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]>: T[K];\n};\n\ninterface State {\n  updatedAt: Date;\n  index: Map<string, number>;\n}\n\ntype Frozen = DeepReadonly<State>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The compiler errors, because a mapped type cannot be applied to a built-in",
        isCorrect: false,
        explanation: "It compiles happily. The problem is what it produces."
      },
      {
        id: "B",
        text: "They are mapped over as plain objects, producing a readonly bag of their method signatures rather than a usable Date or Map",
        isCorrect: true,
        explanation: "Correct. You get something shaped like the methods, and the mutating ones are still there, readonly on a method property prevents reassigning it, not calling it."
      },
      {
        id: "C",
        text: "They become never, since their internal state is not enumerable",
        isCorrect: false,
        explanation: "They do not become never; they become a mapped shape over their public members."
      },
      {
        id: "D",
        text: "They are left untouched, because built-in types are excluded automatically",
        isCorrect: false,
        explanation: "There is no exclusion. Date and Map both satisfy extends object."
      }
    ],
    correctAnswer: "B",
    explanation: "`Date` and `Map` both satisfy `extends object`, so the naive `DeepReadonly` takes the recursive branch on them and maps over their members. What comes back is a readonly object with the same method signatures, `{ readonly getTime: () => number; ... }` for `Date`, not a `Date` you can pass anywhere a `Date` is expected. Worse, it offers no actual protection: `readonly` on a property that holds a method stops you reassigning `index.set`, it does nothing to stop you calling `index.set(...)` and mutating the map.\n\nThe other options are wrong about the mechanism. The compiler does not error, it compiles happily; the problem is what it produces. The members do not become `never`, they become a mapped shape over the public API. And there is no automatic exclusion of built-ins, nothing special-cases `Date` or `Map`.\n\nThe fix a senior names is to special-case known built-ins before the generic object check, short-circuiting `Date`, `RegExp` and friends to themselves, and mapping `Map`/`Set` to their `Readonly` collection types. The further edge is TypeScript's instantiation-depth limit: deeply recursive conditional types can hit the compiler's recursion ceiling on large or cyclic shapes, so a one-line `DeepReadonly` is correct only for plain, finite data, not for a general-purpose utility.",
    interviewLine: "I warn that `extends object` catches Date, Map and RegExp too \u2014 I get a readonly bag of method signatures, which is type-safety theatre rather than immutability.",
    misconception: "Believing a one-line DeepReadonly is production-ready. It is correct only for plain data.",
    hints: [
      "Ask whether readonly on a method-valued property stops you calling it.",
      "Does readonly on a property that holds a method prevent calling that method?",
      "Date and Map both satisfy extends object, so neither is excluded automatically."
    ],
    example: {
      caption: "A production DeepReadonly must short-circuit known built-ins.",
      language: "typescript",
      code: "type DeepReadonly<T> = T extends Date | RegExp\n  ? T\n  : T extends Map<infer K, infer V>\n    ? ReadonlyMap<K, DeepReadonly<V>>\n    : T extends object\n      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }\n      : T;"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-unknown-vs-any-boundary",
    title: "unknown versus any at a data boundary",
    prompt: "An API response arrives untyped. Why is unknown the better annotation?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "unknown",
      "any",
      "type-safety",
      "narrowing"
    ],
    codeSnippet: "const a: any = await res.json();\na.user.name.toUpperCase();     // compiles. may explode at runtime.\n\nconst b: unknown = await res.json();\n// b.user;                     // error until you prove the shape\nif (isUser(b)) b.name.toUpperCase();",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "unknown is faster because it skips runtime checks",
        isCorrect: false,
        explanation: "Neither performs runtime checks; both are erased."
      },
      {
        id: "B",
        text: "unknown forces you to narrow before using the value; any silently disables checking and spreads",
        isCorrect: true,
        explanation: "Correct. any leaks outward through every expression it touches."
      },
      {
        id: "C",
        text: "unknown allows every operation that any allows, with better error messages",
        isCorrect: false,
        explanation: "unknown allows almost no operations until narrowed. That is the point."
      },
      {
        id: "D",
        text: "any is disallowed under strict, so unknown is the only option",
        isCorrect: false,
        explanation: "strict does not forbid any."
      }
    ],
    correctAnswer: "B",
    explanation: "`any` switches the type system off for a value and for everything derived from it. Read a property off an `any` and the result is `any` too, call a method and the return is `any`, so a single `any` at a boundary can quietly hollow out the type safety of an entire module as it spreads outward through every expression it touches. `a.user.name.toUpperCase()` compiles even though any link in that chain might be `undefined` at runtime.\n\n`unknown` is the top type with the opposite ergonomics: it accepts any value on the way in but permits almost nothing on the way out until you narrow it, with a `typeof` check, a type guard, an `in` test or a schema validator. `b.user` is an error until you prove the shape. That is why `unknown` is the correct annotation for anything crossing a trust boundary, `fetch`/`res.json()`, `JSON.parse`, `postMessage` payloads, third-party callbacks, where the real shape is not guaranteed.\n\nThe other options get the relationship backwards: neither does runtime checks, both are erased; `unknown` allows far fewer operations than `any`, not the same set; and `strict` does not forbid `any`. The edge an interviewer probes is that `unknown` is contagious in a good way, it forces the narrowing to happen once, at the boundary, instead of letting unchecked data flow deep into the code where a crash is harder to trace.",
    interviewLine: "I describe `any` as an opt-out that spreads and `unknown` as an opt-in that stops \u2014 at a trust boundary I want the one that forces a check.",
    misconception: "Treating any as 'unknown but more convenient'. It is the absence of typing, and it is contagious.",
    hints: [
      "Ask what the type of a property read off an any value is.",
      "What is the type of x.foo when x is any?",
      "One forces a check before use; the other disables checking and spreads."
    ],
    example: {
      caption: "unknown blocks use until a guard proves the shape; any would wave it through.",
      language: "typescript",
      code: "function handle(input: unknown) {\n  // input.trim(); // error: must narrow first\n  if (typeof input === \"string\") {\n    return input.trim(); // ok, narrowed to string\n  }\n  throw new Error(\"expected a string\");\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#unknown"
  },
  {
    id: "typescript-satisfies-operator",
    title: "What satisfies does that an annotation does not",
    prompt: "Why use satisfies here instead of a type annotation?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "satisfies",
      "inference",
      "literal-types"
    ],
    codeSnippet: "type Routes = Record<string, { path: string; auth: boolean }>;\n\nconst routes = {\n  home: { path: \"/\", auth: false },\n  admin: { path: \"/admin\", auth: true },\n} satisfies Routes;\n\nroutes.home.path;   // ok, key is known\n// routes.missing;  // error, not a key\n\nconst annotated: Routes = { /* \u2026same\u2026 */ };\nannotated.anything; // no error, widened to the index signature",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "satisfies is a shorthand for as, without the unsoundness",
        isCorrect: false,
        explanation: "as reinterprets a type; satisfies checks one and changes nothing about the inferred type."
      },
      {
        id: "B",
        text: "satisfies makes the object readonly, like as const",
        isCorrect: false,
        explanation: "It does not affect mutability. Combining it with as const is common precisely because they do different jobs."
      },
      {
        id: "C",
        text: "satisfies checks the value against the type but keeps the narrower inferred type",
        isCorrect: true,
        explanation: "Correct. You get the constraint checked without losing the specific keys and literal values."
      },
      {
        id: "D",
        text: "satisfies performs the check at runtime rather than compile time",
        isCorrect: false,
        explanation: "It is erased like every other type-level construct."
      }
    ],
    correctAnswer: "C",
    explanation: "A type annotation widens the value to the annotated type. Once `routes: Routes`, the compiler only knows it is a `Record<string, { path; auth }>`, so the specific keys `home` and `admin` are forgotten and a typo like `routes.missing` goes unflagged, it is just another string index. `satisfies` instead checks the value against the type and then throws the type away, leaving the narrow inferred type in place. So `routes satisfies Routes` still fails if any entry is missing `auth`, but `routes.home` stays known and the literal values stay literal.\n\nThe other options misread it. `satisfies` is not a safer `as`, `as` reinterprets a type and can be unsound, whereas `satisfies` only validates and never changes the inferred type. It does not affect mutability the way `as const` does; the two are often combined precisely because they do different jobs. And it is erased at compile time like every other type-level construct, nothing runs at runtime.\n\nThe use case to name is 'conform to this contract but remember exactly what I wrote'. It is ideal for configuration objects, route tables, theme palettes, where you want each entry checked against a shape yet still want autocomplete on the concrete keys and precise value types for downstream inference. Reach for an annotation when you want the wider type, and `satisfies` when you want the check without losing specificity.",
    interviewLine: "I remember that an annotation replaces the inferred type while `satisfies` validates against it and keeps what I wrote.",
    misconception: "Thinking satisfies is just a safer as. as reinterprets, satisfies verifies.",
    hints: [
      "Compare what the compiler still knows about the keys after each form.",
      "After annotating with Record<string, \u2026>, does the compiler still know which keys exist?",
      "One replaces the inferred type; the other validates against it and keeps it."
    ],
    example: {
      caption: "satisfies checks the shape but keeps the exact value types for inference.",
      language: "typescript",
      code: "const palette = {\n  primary: [0, 128, 255],\n  danger: [255, 0, 0],\n} satisfies Record<string, number[]>;\n\npalette.primary[0].toFixed(0); // ok: still number[], not unknown\n// palette.secondary;          // error: not a key"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types"
  },
  {
    id: "typescript-discriminated-union-exhaustive-never",
    title: "Exhaustiveness checking with never",
    prompt: "A new variant is added to the union but not to the switch. What does the never assignment do?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "discriminated-unions",
      "never",
      "exhaustiveness"
    ],
    codeSnippet: "type Shape =\n  | { kind: \"circle\"; r: number }\n  | { kind: \"square\"; size: number };\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case \"circle\": return Math.PI * s.r ** 2;\n    case \"square\": return s.size ** 2;\n    default: {\n      const exhaustive: never = s;\n      return exhaustive;\n    }\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Nothing, the default branch is unreachable and is stripped",
        isCorrect: false,
        explanation: "It is reachable as far as the compiler is concerned the moment a variant is unhandled."
      },
      {
        id: "B",
        text: "It throws at runtime when an unknown shape arrives",
        isCorrect: false,
        explanation: "It is a compile-time device; nothing is thrown, and the annotation is erased."
      },
      {
        id: "C",
        text: "It fails to compile, because the unhandled variant is no longer assignable to never",
        isCorrect: true,
        explanation: "Correct. Adding a variant turns a silent omission into a build error at every switch."
      },
      {
        id: "D",
        text: "It widens s to unknown inside the default branch",
        isCorrect: false,
        explanation: "Narrowing works the other way: handled cases are removed from the union."
      }
    ],
    correctAnswer: "C",
    explanation: "Inside the `switch`, control flow analysis removes each handled case from the union. After `case 'circle'` and `case 'square'`, the only variants left for the `default` branch are none, so `s` has narrowed to `never`, the type with no values, and assigning `never` to a `never`-typed variable is legal. That is why the code compiles today.\n\nNow add a third variant, say `{ kind: 'triangle'; base: number; height: number }`, without adding a case. The `default` branch no longer narrows to `never`; `s` is the unhandled `triangle` variant, which is not assignable to `never`, so `const exhaustive: never = s` becomes a compile error at that exact switch. The wrong options misread this: the branch is not stripped as dead code, nothing is thrown at runtime (the annotation is erased), and narrowing removes handled cases rather than widening `s` to `unknown`.\n\nThe payoff an interviewer wants is that this turns 'I forgot to handle a case' from a runtime surprise into a build failure at every exhaustive `switch` in the codebase the moment the union grows. It is the main practical reason to model state as a discriminated union rather than a loose object, the compiler enforces that every consumer stays in sync with the set of variants.",
    interviewLine: "I use the `never` assignment as a tripwire: add a variant and every switch that forgot it stops compiling.",
    misconception: "Thinking the default branch is dead code. It is the assertion that keeps the union honest.",
    hints: [
      "Work out what s has narrowed to by the time the default runs.",
      "What has s narrowed to once every case has been handled?",
      "The default branch is an assertion, not dead code."
    ],
    example: {
      caption: "A tiny helper turns the never assignment into a reusable guard.",
      language: "typescript",
      code: "function assertNever(x: never): never {\n  throw new Error(`unhandled: ${JSON.stringify(x)}`);\n}\n\ntype Action = { type: \"add\" } | { type: \"remove\" };\nfunction run(a: Action) {\n  switch (a.type) {\n    case \"add\": return 1;\n    case \"remove\": return -1;\n    default: return assertNever(a);\n  }\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking"
  },
  {
    id: "typescript-structural-typing-duck",
    title: "Structural typing",
    prompt: "Point was never mentioned when Named was declared. Does the assignment compile?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "structural-typing",
      "assignability"
    ],
    codeSnippet: "interface Named { name: string }\n\nclass Person {\n  constructor(public name: string, public age: number) {}\n}\n\nconst n: Named = new Person(\"Ada\", 36);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Only if Named is declared as a type alias rather than an interface",
        isCorrect: false,
        explanation: "Interfaces and aliases behave identically for assignability."
      },
      {
        id: "B",
        text: "No, Person must declare implements Named",
        isCorrect: false,
        explanation: "That would be required under nominal typing. TypeScript is structural."
      },
      {
        id: "C",
        text: "Yes, Person has a compatible name, and extra members are allowed on a non-literal value",
        isCorrect: true,
        explanation: "Correct. Compatibility is decided by shape, not by declared relationships."
      },
      {
        id: "D",
        text: "No, the extra age property makes it incompatible",
        isCorrect: false,
        explanation: "Extra properties are fine here; excess property checks only apply to fresh object literals."
      }
    ],
    correctAnswer: "C",
    explanation: "TypeScript compares types by structure, not by name. `Named` requires a `string` `name`, and `Person` has one, so a `Person` instance is assignable to `Named` whether or not `Person` ever mentioned the interface. The extra `age` property is fine, a value with more members than required still satisfies the smaller shape. This is why option C is right: compatibility is decided by the members present, not by any declared relationship.\n\nThe wrong options assume nominal typing. `implements Named` is a convenience that moves the conformance check to the class, not a requirement for assignability. Interfaces and type aliases behave identically here, so the choice between them is irrelevant. And the `age` property does not break anything, because excess-property checks apply only to fresh object literals, not to a class instance assigned to a variable.\n\nThe two edges worth naming are exactly those caveats. First, a fresh object literal assigned directly to a typed target does get an excess-property check that rejects unexpected members, which is a deliberate typo-catcher sitting on top of structural assignability. Second, `private` and `#private` members make a class effectively nominal: two classes with identically-named private fields are still not assignable to each other, because structural comparison treats private state as part of the identity.",
    interviewLine: "I remind people that TypeScript checks shape, not lineage \u2014 if it has the members, it's assignable, and declared relationships are just documentation.",
    misconception: "Assuming a class must implement an interface to satisfy it. Structural typing says otherwise.",
    hints: [
      "Ask whether the compiler cares about the name or the members.",
      "Does TypeScript care what the type is called, or what it contains?",
      "A fresh object literal is the one case where extra properties are rejected."
    ],
    example: {
      caption: "Shape alone decides assignability, no declared relationship required.",
      language: "typescript",
      code: "interface Logger { log(msg: string): void }\n\nconst consoleLike = {\n  log: (m: string) => process.stdout.write(m),\n  level: \"info\",\n};\n\nconst l: Logger = consoleLike; // ok: it has log, extra members allowed"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-excess-property-check-literals",
    title: "Why the literal errors but the variable does not",
    prompt: "The same object is rejected in one form and accepted in the other. Why?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "excess-property-check",
      "assignability",
      "literals"
    ],
    codeSnippet: "interface Options { width: number }\n\n// const a: Options = { width: 10, height: 5 }; // error: 'height' does not exist\n\nconst raw = { width: 10, height: 5 };\nconst b: Options = raw; // ok",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "raw is inferred as Options, so the extra height property is discarded at inference",
        isCorrect: false,
        explanation: "Tempting if you think the annotation flows backward, but raw is inferred as { width: number; height: number }; nothing is discarded, and the assignment succeeds for a different reason."
      },
      {
        id: "B",
        text: "Object literals get an excess property check; a variable is only checked for structural compatibility",
        isCorrect: true,
        explanation: "Correct. The literal check is a deliberate extra guard against typos, and it applies only to fresh literals."
      },
      {
        id: "C",
        text: "The error is a compiler bug that a type assertion is meant to work around",
        isCorrect: false,
        explanation: "Tempting when the inconsistency looks arbitrary, but the extra check is intentional behaviour aimed at typos, not a bug, and reaching for an assertion hides the real mistake."
      },
      {
        id: "D",
        text: "Interfaces reject extra properties while type aliases accept them",
        isCorrect: false,
        explanation: "Both behave identically. The difference is literal versus variable, not interface versus alias."
      }
    ],
    correctAnswer: "B",
    explanation: "Structurally, `{ width: number; height: number }` is assignable to `Options`, it has everything `Options` requires, and extra members are normally allowed. So the question is why the inline literal is rejected while the identical object routed through `raw` is accepted. The answer is the excess-property check: TypeScript adds an extra guard, on top of structural assignability, for a fresh object literal assigned directly to a typed target, flagging members that the target does not declare.\n\nThe reason is pragmatic: an unexpected property on a literal written right at the assignment is almost always a typo or a misremembered option name (`heigth`, or `onClick` where the API wants `onPress`). Assign through a variable first and the literal's freshness is gone, so only ordinary structural compatibility applies and the extra `height` is tolerated. The wrong options miss this: `raw` is inferred with both properties, nothing is discarded; the behaviour is intentional, not a bug to assert around; and interfaces and aliases behave identically, the split is literal-versus-variable.\n\nThe edge worth stating is the right fix. When the check fires, the correct response is usually to correct the property name, not to widen the target type, add an index signature, or reach for `as`, each of which silences a check that exists precisely to catch the mistake you just made.",
    interviewLine: "I explain that excess property checks only fire on fresh literals \u2014 it's a typo catcher I think of as sitting on top of structural assignability.",
    misconception: "Concluding the type system is inconsistent. The extra check exists exactly where typos happen.",
    hints: [
      "Compare a value written inline with one that arrived in a variable.",
      "What is different about a value written inline versus one that arrived in a variable?",
      "The extra check is a typo catcher sitting on top of structural assignability."
    ],
    example: {
      caption: "The literal is rejected; routing it through a variable passes the structural check.",
      language: "typescript",
      code: "interface Props { title: string }\n\n// <Comp {...{ title: \"a\", subtitle: \"b\" }} /> inline literal: error on subtitle\n\nconst extra = { title: \"a\", subtitle: \"b\" };\nconst ok: Props = extra; // no error: freshness is gone"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-utility-types-pick-omit-partial",
    title: "Choosing between Partial, Pick, Omit and Required",
    prompt: "You need a type with every property of User optional. Which utility?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "utility-types",
      "partial",
      "pick",
      "omit"
    ],
    codeSnippet: "interface User { id: string; name: string; email: string }\n\ntype Draft = Partial<User>;              // all optional\ntype Public = Omit<User, \"email\">;       // drop a key\ntype Creds = Pick<User, \"id\" | \"email\">; // keep only these\ntype Full = Required<Draft>;             // all required again",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Omit<User, never>",
        isCorrect: false,
        explanation: "Omit removes keys. Removing none leaves the original type."
      },
      {
        id: "B",
        text: "Readonly<User>",
        isCorrect: false,
        explanation: "Readonly changes mutability, not optionality."
      },
      {
        id: "C",
        text: "Pick<User, keyof User>",
        isCorrect: false,
        explanation: "That reproduces User unchanged, Pick selects keys, it does not change optionality."
      },
      {
        id: "D",
        text: "Partial<User>",
        isCorrect: true,
        explanation: "Correct. Partial maps every property to optional; Required is its inverse."
      }
    ],
    correctAnswer: "D",
    explanation: "`Partial<User>` is the answer because it maps every property to optional, which is exactly 'every property optional'. It is a one-line mapped type in `lib.d.ts`: `{ [K in keyof T]?: T[K] }`. Its inverse, `Required<T>`, strips the optionality back off, and `Readonly<T>` is the mutability equivalent that adds `readonly` to each member.\n\nThe distractors are the sibling utilities that do different jobs. `Pick<T, K>` keeps a chosen subset of keys, `Pick<User, keyof User>` just reproduces `User` and changes no optionality. `Omit<T, K>` drops keys, `Omit<User, never>` removes nothing and leaves the original. `Readonly<User>` changes mutability, not whether properties may be absent. None of these touches optionality, which is what the question asks for.\n\nThe practical point an interviewer wants is deriving related shapes from one source instead of maintaining parallel types by hand. A create-DTO is `Omit<User, 'id'>`, an update-DTO is `Partial<Omit<User, 'id'>>`, and because they are derived, adding a field to `User` flows into both automatically. The edge worth knowing is that `Omit` is more maintainable than `Pick` for a public shape: a newly added field is included by default rather than silently missing, which is safer when forgetting a field is the dangerous direction.",
    interviewLine: "I derive my DTOs from one interface with Pick, Omit and Partial \u2014 hand-maintained parallel shapes drift, but derived ones can't.",
    misconception: "Confusing Pick and Omit with Partial. The first two select keys; Partial changes optionality.",
    hints: [
      "Separate the utilities that change keys from the ones that change optionality.",
      "Which of these touches optionality rather than the set of keys?",
      "Pick and Omit select keys; the one you want flips every property to optional."
    ],
    example: {
      caption: "Deriving an update DTO from one source keeps the shapes from drifting.",
      language: "typescript",
      code: "interface User { id: string; name: string; email: string }\n\ntype CreateUser = Omit<User, \"id\">;        // server assigns id\ntype UpdateUser = Partial<Omit<User, \"id\">>; // any subset, no id\n\nconst patch: UpdateUser = { name: \"Ada\" }; // ok"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-returntype-parameters-awaited",
    title: "Deriving types from a function you already have",
    prompt: "getUser returns Promise<User>. What is Result?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "utility-types",
      "ReturnType",
      "Awaited",
      "infer"
    ],
    codeSnippet: "async function getUser(id: string, full: boolean) {\n  return { id, name: \"Ada\" };\n}\n\ntype Args = Parameters<typeof getUser>;          // [string, boolean]\ntype Raw = ReturnType<typeof getUser>;           // Promise<{ id: string; name: string }>\ntype Result = Awaited<ReturnType<typeof getUser>>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "[string, boolean], the parameter tuple",
        isCorrect: false,
        explanation: "That is Parameters, not ReturnType."
      },
      {
        id: "B",
        text: "Promise<{ id: string; name: string }>",
        isCorrect: false,
        explanation: "That is ReturnType alone. Awaited is what unwraps the promise."
      },
      {
        id: "C",
        text: "{ id: string; name: string }",
        isCorrect: true,
        explanation: "Correct. Awaited<T> recursively unwraps promises, so the resolved value type comes out."
      },
      {
        id: "D",
        text: "unknown, because the return type is inferred rather than annotated",
        isCorrect: false,
        explanation: "An inferred return type is a real type and ReturnType reads it fine."
      }
    ],
    correctAnswer: "C",
    explanation: "`typeof getUser` lifts the function value into the type world, giving its full signature as a type. `ReturnType<F>` then extracts the return type using a conditional type with `infer`, and because `getUser` is `async`, that return type is `Promise<{ id: string; name: string }>`. `Awaited<T>` is the step that unwraps the promise, so `Result` resolves to the plain `{ id: string; name: string }`.\n\nThe wrong options each stop at the wrong stage. `[string, boolean]` is what `Parameters<typeof getUser>` gives, the argument tuple, not the return. `Promise<{...}>` is `ReturnType` alone, missing the `Awaited` unwrap. And an inferred return type is a real, fully-known type, so `ReturnType` reads it fine; it is not `unknown`.\n\nThe mechanism worth stating is that `Awaited` recurses: a nested `Promise<Promise<T>>` still resolves to `T`, and a non-promise passes through unchanged, which matches the real flattening behaviour of `await`. The payoff of composing `typeof`, `ReturnType`, `Parameters` and `Awaited` is that derived types follow the implementation automatically, change the function's return shape and every type built from it updates, instead of a hand-written duplicate silently drifting out of sync.",
    interviewLine: "I use `typeof` to lift a value into the type world, then ReturnType, Parameters and Awaited to read it from there \u2014 I derive rather than restate.",
    misconception: "Forgetting the Awaited step and ending up with a Promise where the resolved value was wanted.",
    hints: [
      "Recall what an async function's return type always is.",
      "An async function's return type is always what?",
      "ReturnType gives the Promise; a further step unwraps the resolved value."
    ],
    example: {
      caption: "Deriving the element type of a function's resolved array in one chain.",
      language: "typescript",
      code: "async function listUsers() {\n  return [{ id: \"1\", name: \"Ada\" }];\n}\n\ntype Users = Awaited<ReturnType<typeof listUsers>>; // { id: string; name: string }[]\ntype OneUser = Users[number];                       // { id: string; name: string }"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-record-vs-index-signature",
    title: "Record versus an index signature",
    prompt: "What is the practical difference between these two declarations?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "record",
      "index-signature",
      "mapped-types"
    ],
    codeSnippet: "type A = { [key: string]: number };\ntype B = Record<string, number>;      // identical to A\n\ntype Role = \"admin\" | \"guest\";\ntype C = Record<Role, number>;        // { admin: number; guest: number }\n// type D = { [key: Role]: number };  // not expressible this way",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Record can key on a finite union to produce exactly those keys; an index signature cannot",
        isCorrect: true,
        explanation: "Correct. Over string they are equivalent, but Record<Role, \u2026> gives a closed, required set of keys."
      },
      {
        id: "B",
        text: "Record allows any value type while an index signature only allows primitives",
        isCorrect: false,
        explanation: "Both accept any value type."
      },
      {
        id: "C",
        text: "Record is checked at runtime, an index signature is not",
        isCorrect: false,
        explanation: "Neither exists at runtime."
      },
      {
        id: "D",
        text: "An index signature makes properties optional; Record makes them required",
        isCorrect: false,
        explanation: "An index signature says nothing about which keys exist; Record over a union requires all of them."
      }
    ],
    correctAnswer: "A",
    explanation: "Over an open key type the two are the same thing. `Record<string, V>` is defined in `lib.d.ts` as a mapped type that produces exactly `{ [k: string]: V }`, so `type A` and `type B` are identical and interchangeable. The difference only appears with a finite key union.\n\n`Record<Role, number>` where `Role` is `'admin' | 'guest'` produces two named, required properties, `{ admin: number; guest: number }`. Forgetting one is a compile error, and adding a member to `Role` breaks every record that does not yet handle it, turning an enum extension into a checked task. An index signature can never express that, because `{ [key: Role]: number }` is not even valid syntax, an index signature describes an open set of keys, not a specific finite one. The wrong options miss this: both forms accept any value type, neither exists at runtime, and an index signature says nothing about which keys must be present.\n\nThe edge worth stating is read safety. Reading through an open index signature is unchecked by default, `a[someKey]` is typed as `V` even when the key is absent, so the value could be `undefined` at runtime. Enable `noUncheckedIndexedAccess` and the result becomes `V | undefined`, forcing you to handle the missing-key case that the open signature otherwise hides.",
    interviewLine: "I reach for Record over a union to get a closed, required key set \u2014 that's what turns adding an enum member into a compile error instead of a bug.",
    misconception: "Treating Record<string, V> as safer than an index signature. They are the same; the win comes from a finite key type.",
    hints: [
      "Try keying each form on a finite union of literals.",
      "What happens if you pass a union of literals as the key type?",
      "Over open string they are identical; the win comes from a finite key type."
    ],
    example: {
      caption: "Record over a union forces every key to be present.",
      language: "typescript",
      code: "type Status = \"idle\" | \"active\" | \"done\";\n\nconst labels: Record<Status, string> = {\n  idle: \"Idle\",\n  active: \"Active\",\n  done: \"Done\",\n};\n// omitting \"done\" is a compile error; adding a status breaks this map"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-promise-all-tuple-inference",
    title: "How TypeScript types the result of Promise.all",
    prompt: "What is the type of the destructured results?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "promises",
      "tuples",
      "inference",
      "awaited"
    ],
    codeSnippet: "declare function getUser(): Promise<User>;\ndeclare function getPosts(): Promise<Post[]>;\ndeclare function getCount(): Promise<number>;\n\nconst [user, posts, count] = await Promise.all([\n  getUser(),\n  getPosts(),\n  getCount(),\n]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "All three are unknown until asserted",
        isCorrect: false,
        explanation: "Nothing is lost; the types flow through."
      },
      {
        id: "B",
        text: "All three are Promise-wrapped and need a further await",
        isCorrect: false,
        explanation: "A single await unwraps the aggregate; the elements are already resolved values."
      },
      {
        id: "C",
        text: "All three are (User | Post[] | number), so each needs narrowing",
        isCorrect: false,
        explanation: "That is what you would get from an array type. The overload preserves the tuple positions."
      },
      {
        id: "D",
        text: "user: User, posts: Post[], count: number, the tuple positions are preserved",
        isCorrect: true,
        explanation: "Correct. Promise.all is overloaded for tuples, and Awaited unwraps each element type."
      }
    ],
    correctAnswer: "D",
    explanation: "`Promise.all` is declared with an overload that takes a readonly tuple of promises, so passing an inline array literal of three differently-typed promises preserves both the arity and the position of each element. The signature maps `Awaited` over each slot, so `Promise<User>` resolves to `User` in position 0, `Promise<Post[]>` to `Post[]` in position 1, and `Promise<number>` to `number` in position 2. A single `await` unwraps the aggregate promise, leaving the resolved values.\n\nThat is why the destructured `[user, posts, count]` is fully typed with no assertions, and why the wrong options fail: nothing becomes `unknown`, the elements need no further `await`, and the result is not a union `(User | Post[] | number)` requiring narrowing, the tuple overload keeps the positions distinct.\n\nThe edge an interviewer probes is how to lose the tuple. If you build the array first and give it a type like `Promise<A | B>[]`, you have handed `Promise.all` an array type rather than a tuple, so it collapses to `(A | B)[]` and the positional types are gone. Keep the array literal inline at the call, or use `as const`, so the compiler sees a tuple and the overload can preserve each slot's type.",
    interviewLine: "I keep `Promise.all`'s tuple by passing the array literal inline \u2014 if I hoist it into a variable first, the positions collapse into a union.",
    misconception: "Expecting a union and narrowing each result. The tuple overload already resolved them positionally.",
    hints: [
      "Distinguish a tuple type from an array type at the call.",
      "What is the difference between a tuple type and an array type here?",
      "Hoisting the array into a variable collapses the positions into a union."
    ],
    example: {
      caption: "Keep the array literal inline so the tuple positions survive.",
      language: "typescript",
      code: "const [n, s] = await Promise.all([\n  Promise.resolve(1),\n  Promise.resolve(\"a\"),\n]);\n// n: number, s: string\n\n// const jobs: Promise<number | string>[] = [...];\n// await Promise.all(jobs) -> (number | string)[], positions lost"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  },
  {
    id: "typescript-type-only-imports-isolated-modules",
    title: "Why import type exists",
    prompt: "Under isolatedModules, why must a re-exported type use export type?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "import-type",
      "isolatedModules",
      "transpilation"
    ],
    codeSnippet: "import type { User } from \"./models\";       // erased entirely\nimport { createUser } from \"./models\";      // real import\n\nexport type { User };                        // required under isolatedModules\n// export { User };                          // error: it is a type",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A single-file transpiler cannot tell a type from a value, so the syntax has to say which it is",
        isCorrect: true,
        explanation: "Correct. Babel and SWC never build a full program, so they cannot look up whether User is a type."
      },
      {
        id: "B",
        text: "Types must be re-exported separately so the bundler can tree-shake them",
        isCorrect: false,
        explanation: "Types have no runtime representation to shake out."
      },
      {
        id: "C",
        text: "It prevents circular imports between modules",
        isCorrect: false,
        explanation: "Type-only imports do help with cycles, but that is not what the flag requires."
      },
      {
        id: "D",
        text: "It is a style rule enforced by ESLint rather than the compiler",
        isCorrect: false,
        explanation: "Under isolatedModules the compiler itself enforces it."
      }
    ],
    correctAnswer: "A",
    explanation: "`tsc` knows whether an imported name like `User` is a type or a value because it type-checks the whole program and can look the name up in `./models`. Babel, SWC and esbuild do not: they transpile one file at a time and never build a cross-file view. Faced with `export { User }`, such a tool cannot tell whether to emit a real runtime re-export or erase it, and emitting one for a type produces an import of something that does not exist at runtime, a broken module.\n\n`import type` and `export type` resolve the ambiguity by putting the answer in the syntax itself: `import type { User }` is erased entirely, `import { createUser }` stays. The wrong options miss this. Types have no runtime representation to tree-shake; type-only imports do help with import cycles but that is not what the flag requires; and under `isolatedModules` the compiler itself enforces the rule, it is not merely an ESLint style preference.\n\nThe same single-file constraint explains the flag's other prohibitions, which an interviewer may connect. `const enum` is disallowed because inlining its member values requires whole-program type information no single-file transpiler has. The underlying principle is one promise: nothing in a file may depend on cross-file type information to be transpiled correctly on its own.",
    interviewLine: "I note a single-file transpiler can't look up whether a name is a type, so I use `import type` to put the answer in the syntax instead of the type checker.",
    misconception: "Reading import type as a performance hint. It is a correctness requirement for file-at-a-time transpilers.",
    hints: [
      "Consider what a transpiler that never reads ./models can know about a name.",
      "What does a transpiler that never sees ./models know about User?",
      "The syntax has to say type-or-value because the single-file tool cannot look it up."
    ],
    example: {
      caption: "import type is erased; a value import stays, so the two are declared apart.",
      language: "typescript",
      code: "import type { Config } from \"./config\"; // erased at compile time\nimport { loadConfig } from \"./config\";   // real runtime import\n\nexport function start(c: Config) {\n  return loadConfig(c);\n}"
    },
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/modules.html"
  }
];
