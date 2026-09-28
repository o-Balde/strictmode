import { QuizQuestion } from '../types';

export const REACT_HOOKS_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-is-the-difference-between-class-based-and-function",
    title: "What is the difference between class-based and functional React components?",
    prompt: "What is the difference between class-based and functional React components?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "class App extends React.Component {\n  state = {\n    value: 0,\n  };\n\n  handleAgeChange = () => {\n    this.setState({\n      value: this.state.value + 1 \n    });\n  };\n\n  render() {\n    return (\n      <>\n        <p>Value is {this.state.value}</p>\n        <button onClick={this.handleAgeChange}>\n        Increment value\n        </button>\n      </>\n    );\n  }\n}\n\nimport { useState } from 'react';\n\nconst App = () => {\n  const [value, setValue] = useState(0);\n\n  const handleAgeChange = () => {\n    setValue(value + 1);\n  };\n\n  return (\n      <>\n        <p>Value is {value}</p>\n        <button onClick={handleAgeChange}>\n        Increment value\n        </button>\n      </>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Class components can only render on the server, while functional components can only render in the browser.",
        isCorrect: false,
        explanation: "Tempting if you conflate SSR with component type, but both class and functional components render identically on the server (via renderToString or Next.js) and in the browser. The rendering environment is determined by where the app runs, not by the component's definition style."
      },
      {
        id: "B",
        text: "Class components render faster than functional components because classes are compiled to C++ by V8.",
        isCorrect: false,
        explanation: "V8 compiles JavaScript to machine code through TurboFan, not to C++, and it does so for every JavaScript construct\u2014classes, functions, arrows\u2014without distinguishing React component types. Both forms execute as ordinary JavaScript objects or functions with no measurable rendering-speed difference."
      },
      {
        id: "C",
        text: "Functional components cannot hold state or run side effects in any version of React.",
        isCorrect: false,
        explanation: "This was true before React 16.8, but useState, useEffect, useReducer, and the other Hooks introduced in that release give functional components the same state and side-effect capabilities that classes had through this.setState and lifecycle methods. The code's functional App uses useState and behaves identically to the class version."
      },
      {
        id: "D",
        text: "Class components extend React.Component and manage state/lifecycle with this and methods; functional components are plain functions using Hooks.",
        isCorrect: true,
        explanation: "Correct. The structural difference is exactly this: a class that extends React.Component and uses this.state, this.setState, and lifecycle methods, versus a plain function that receives props and uses Hooks for state and side effects. Everything else\u2014rendering, reconciliation, prop flow\u2014works the same way."
      }
    ],
    correctAnswer: "D",
    explanation: "Class components are ES6 classes that extend React.Component. They store local data in this.state, update it with this.setState(), and tie logic to the component through lifecycle methods like componentDidMount and componentDidUpdate. Functional components are plain JavaScript functions: they receive props as an argument and return JSX. They manage state with useState and run side effects with useEffect, both imported from react.\n\nIn the code above, both components do the same job. The class version reads this.state.value and calls this.setState({ value: this.state.value + 1 }). The functional version reads value from the useState tuple and calls setValue(value + 1). The class component also needs an arrow-function class property (handleAgeChange = () => {...}) to bind this inside the handler; the functional component's handler is a plain closure that captures value from the render scope.\n\nThere is no performance difference in the rendered output, and class components still work in React 19. The practical shift is that Hooks let you extract and reuse logic across components without a shared base class, and the Rules of Hooks (top-level only, no conditionals) replace the implicit ordering guarantees of lifecycle methods.",
    interviewLine: "A class component is an ES6 class extending React.Component that manages state through this.state and this.setState and attaches logic to lifecycle methods, while a functional component is a plain function that uses Hooks like useState and useEffect for the same responsibilities, which also removes the need to bind this in event handlers.",
    misconception: "Treating functional components as a reduced or 'lighter' version of classes that simply cannot do everything a class can, when in fact Hooks give them equivalent state and effect power and the only real difference is structural (class with this vs plain function with closures and Hooks).",
    hints: [
      "Look at how each component stores and updates its value: one uses this.state and this.setState, the other destructures a useState tuple.",
      "Ask what the handler in each version captures: the class version relies on this, the functional version relies on a closure over the render-scope variable.",
      "The difference is structural and syntactic, not about rendering environment, compiler output, or capability limits."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how a single useEffect with a cleanup return replaces both componentDidMount and componentWillUnmount from the class equivalent.",
      language: "tsx",
      code: "import { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => setCount((c) => c + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return (\n    <>\n      <p>{count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>+1</button>\n    </>\n  );\n}"
    }
  },
  {
    id: "react-what-are-the-lifecycle-methods-of-a-component",
    title: "What are the lifecycle methods of a component?",
    prompt: "What are the lifecycle methods of a component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Methods that only execute when the user reloads the entire browser window tab.",
        isCorrect: false,
        explanation: "Tempting if you equate a component's life with the page's life, but in a single-page app components mount, update, and unmount independently of a full page reload; navigating between routes triggers lifecycle methods without any tab refresh."
      },
      {
        id: "B",
        text: "Methods in class components that run at specific phases (mounting, updating, unmounting).",
        isCorrect: true,
        explanation: "Correct. These three instance methods are invoked by React at the commit phase of rendering, giving you a deterministic place to run setup, react to updates, and clean up resources."
      },
      {
        id: "C",
        text: "Deprecated functions that were permanently removed from JavaScript ES2015 specification.",
        isCorrect: false,
        explanation: "Tempting if you hear \"lifecycle\" and think of language-level features, but componentDidMount and its siblings are methods React defines on its Component base class; no ECMAScript version ever included them."
      },
      {
        id: "D",
        text: "Special HTTP middleware functions that intercept incoming REST API network packets.",
        isCorrect: false,
        explanation: "Tempting if you associate \"lifecycle\" with a request/response cycle, but these methods execute on the client inside a React component instance and have no involvement in the HTTP protocol or server-side routing."
      }
    ],
    correctAnswer: "B",
    explanation: "Lifecycle methods are instance methods on a React class component that React calls at three fixed points: componentDidMount runs after the first render commits to the DOM, componentDidUpdate runs after any subsequent render caused by a prop or state change, and componentWillUnmount runs just before React removes the component from the tree. They are part of React's component API, not the ECMAScript language or the browser's page events.\n\nIn practice this means you set up subscriptions, timers, or fetches in componentDidMount and tear them down in componentWillUnmount, so the browser does not leak listeners or intervals after the component is gone. componentDidUpdate lets you react to a specific prop change without re-running setup logic that only belongs to the first mount. In a function component the same three phases collapse into one useEffect: an empty dependency array mirrors componentDidMount, a non-empty array mirrors componentDidUpdate, and the cleanup function you return mirrors componentWillUnmount.\n\nWhile class components are still supported, modern React development prefers function components with hooks. The older 'will' methods (componentWillMount, componentWillReceiveProps, componentWillUpdate) are deprecated and should not be used in new code; useEffect and other hooks provide the standard, safer way to manage side effects across all component types.",
    interviewLine: "In a class component React calls componentDidMount after the first render commits, componentDidUpdate after every subsequent render, and componentWillUnmount before removal; in a function component all three collapse into a single useEffect whose dependency array and returned cleanup function cover the same three phases.",
    misconception: "Treating lifecycle methods as browser page events (load, unload) rather than React-internal callbacks tied to a component's position in the virtual-DOM tree, which means they fire on every route change in a SPA without any full page reload.",
    hints: [
      "These methods live on a class that extends React.Component; they are not browser events, language keywords, or server middleware.",
      "Ask which three phases a component passes through from first render to removal from the tree.",
      "They are part of React's component API, not the ECMAScript spec or the HTTP protocol."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how componentDidMount sets up the interval and componentWillUnmount tears it down\u2014the same pair you would express as a useEffect with an empty dependency array and a cleanup return in a function component.",
      language: "tsx",
      code: "import { Component } from \"react\";\n\nclass Timer extends Component {\n  state = { seconds: 0 };\n  id: number | undefined;\n\n  componentDidMount() {\n    this.id = window.setInterval(\n      () => this.setState({ seconds: this.state.seconds + 1 }),\n      1000,\n    );\n  }\n\n  componentWillUnmount() {\n    if (this.id !== undefined) window.clearInterval(this.id);\n  }\n\n  render() {\n    return <span>{this.state.seconds}s</span>;\n  }\n}"
    }
  },
  {
    id: "react-what-are-the-peculiarities-of-using-useeffect",
    title: "What are the peculiarities of using useEffect?",
    prompt: "What are the peculiarities of using useEffect?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "useEffect(() => {\n  console.log('Logging something');\n}, [])",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It blocks browser painting synchronously and waits for all internal async promises to settle before the next frame is displayed.",
        isCorrect: false,
        explanation: "Tempting if you treat the effect callback like a synchronous render-phase step, but React schedules it after the browser has already painted the frame; it never blocks the paint pipeline. useLayoutEffect is the hook that runs synchronously before paint, and even it does not wait on promises."
      },
      {
        id: "B",
        text: "It runs after render is committed to screen, cleans up previous effect before re-running, and skips execution if dependencies have not changed.",
        isCorrect: true,
        explanation: "Correct. React commits the DOM, the browser paints, then the effect callback fires; the prior cleanup runs first, and Object.is comparison on the dependency array gates whether the effect re-runs at all."
      },
      {
        id: "C",
        text: "Returning a promise directly from the effect callback, as in useEffect(async () => { ... }), is the standard best practice for async side effects.",
        isCorrect: false,
        explanation: "Tempting because many side effects are inherently async, but the effect callback must return a cleanup function or undefined; a returned Promise is truthy but not a function, so React logs a warning and the cleanup contract is broken. Wrap the async body in an IIFE or a local async helper instead."
      },
      {
        id: "D",
        text: "The dependency array compares objects and arrays using deep structural value equality, so semantically identical values skip the effect.",
        isCorrect: false,
        explanation: "Tempting because a deep comparison would make the hook feel more intuitive for object props, but React uses Object.is on each dependency, which for objects and arrays is a reference check; a new object literal created on every render will always trigger the effect."
      }
    ],
    correctAnswer: "B",
    explanation: "useEffect schedules its callback to run after React has committed the render to the DOM and the browser has painted. Before running a new effect, React calls the cleanup function returned by the previous run of that same effect, so subscriptions, timers, and listeners are torn down before being re-established. On every subsequent render, React compares each dependency with Object.is; if none changed, the effect is skipped entirely.\n\nIn practice this means an effect with an empty dependency array like the one in the snippet fires once, after the first paint. If you subscribe to an event inside the effect but forget to return a cleanup, the second mount (or a StrictMode double-invocation) leaves two live listeners. The cleanup is not optional ceremony; it is the mechanism that keeps the effect idempotent across re-renders.\n\nThe boundary that trips candidates up: useEffect is asynchronous with respect to paint, so reading document dimensions inside it sees the new layout, but the callback is not guaranteed to run before the user interacts. If you need the DOM mutation to land before the next frame, useLayoutEffect is the synchronous counterpart. Neither hook is a place to put logic that belongs in the render body or in an event handler.",
    interviewLine: "useEffect is post-paint: React commits the DOM, the browser paints, then the callback fires. Before a re-run the previous cleanup executes, and the dependency array is compared with Object.is, so a new object reference on every render will re-trigger the effect even if its fields are identical.",
    misconception: "useEffect is often treated as a synchronous did-mount / did-update callback that runs during render, when in fact it is scheduled after paint, its cleanup is a first-class contract called before every re-run and on unmount, and its dependency check is a shallow Object.is comparison rather than a deep one.",
    hints: [
      "Think about when the callback actually fires relative to the browser painting the frame.",
      "What happens to the previous effect's cleanup before the next one runs, and how does React decide whether to run it at all?",
      "The dependency array is not a deep-equal check; ask yourself what Object.is does with two separate object literals."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "The cleanup function is what prevents a second interval from stacking when StrictMode mounts the component twice in development.",
      language: "typescript",
      code: "import { useEffect, useState } from \"react\";\n\nfunction useClock() {\n  const [time, setTime] = useState(() =>\n    new Date().toLocaleTimeString()\n  );\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setTime(new Date().toLocaleTimeString());\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return time;\n}"
    }
  },
  {
    id: "react-which-pattern-does-mobx-implement",
    title: "Which pattern does Mobx implement?",
    prompt: "Which pattern does Mobx implement?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The Abstract Syntax Tree compiler pattern for build-time code transformations.",
        isCorrect: false,
        explanation: "Tempting if you associate MobX with tooling like Babel or SWC, but MobX ships as a runtime library that instruments property access at execution time; it never rewrites your source code into a new AST."
      },
      {
        id: "B",
        text: "The Database Connection Pooling pattern for managing TCP sockets.",
        isCorrect: false,
        explanation: "This conflates client-side state management with server-side resource management. MobX runs entirely in the browser or Node process and has no socket or connection lifecycle to pool."
      },
      {
        id: "C",
        text: "The Strict Redux Reducer pattern requiring immutable state trees and action creators.",
        isCorrect: false,
        explanation: "The most tempting trap because both libraries manage application state, but Redux enforces immutability and explicit dispatch while MobX mutates observable properties directly and infers dependencies from reads, so no action creators or pure reducers are involved."
      },
      {
        id: "D",
        text: "The Observer / Observable pattern with transparent functional reactive programming (TFRP).",
        isCorrect: true,
        explanation: "Correct. MobX wraps state in observables, records which properties a component reads during render, and re-runs that component when a tracked property mutates \u2014 the classic Observer contract, delivered without manual subscribe or notify calls."
      }
    ],
    correctAnswer: "D",
    explanation: "MobX implements the Observer pattern, also called Publish-Subscribe. An observable object holds state; any code that reads that state becomes an observer. When the state mutates, the observable notifies its observers so they re-execute. MobX's creator calls this model transparent functional reactive programming: you write ordinary imperative reads and writes, and the library wires up the subscriptions behind the scenes.\n\nIn a React component, reading `store.name` inside a `useObserver`-wrapped render is the subscription. If `store.name` later mutates, MobX re-runs that render. You never call `subscribe` or `notify` by hand, and you never need to produce a new object reference to signal a change.\n\nThe nuance an interviewer will probe: MobX tracks property-level access, so a component that reads only `store.name` re-renders when `name` changes even if the rest of the store is untouched. Redux, by contrast, relies on reference identity from `mapStateToProps` to decide what re-renders. That difference is the practical fingerprint of the Observer pattern versus the unidirectional-dispatch pattern.",
    interviewLine: "MobX is built on the Observer pattern: I subscribe to state simply by reading it inside a reactive context, and MobX re-runs that context the moment a tracked property mutates, so I never manage subscriptions or produce new references by hand.",
    misconception: "Because MobX and Redux both solve \"application state,\" it is easy to assume they share the same architectural pattern; in fact MobX is mutable and observer-driven while Redux is immutable and dispatch-driven, which places them on opposite sides of the Observer versus unidirectional-flow divide.",
    hints: [
      "Think about what happens when code reads a value and that value later changes \u2014 who is told, and how?",
      "MobX's creator describes the model as transparent functional reactive programming; what does transparent imply about how much subscription boilerplate you write?",
      "Redux needs a new reference to trigger a re-render; MobX does not. That gap points to a fundamentally different underlying pattern."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that the component subscribes by reading cart.total inside useObserver; no useEffect, no subscribe call, no new reference is needed for the badge to update.",
      language: "tsx",
      code: "import { makeAutoObservable } from \"mobx\";\nimport { useObserver } from \"mobx-react-lite\";\n\nclass Cart {\n  total = 0;\n\n  constructor() {\n    makeAutoObservable(this);\n  }\n\n  add() {\n    this.total += 1;\n  }\n}\n\nconst cart = new Cart();\n\nfunction CartBadge() {\n  return useObserver(() => <span>{cart.total}</span>);\n}\n\nexport default function App() {\n  return (\n    <div>\n      <CartBadge />\n      <button onClick={() => cart.add()}>Add</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-what-is-react-context",
    title: "What is React Context?",
    prompt: "What is React Context?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A browser API that reports the user's physical coordinates via GPS satellites.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'context' with the browser's Geolocation API, but React Context has no relationship to location data. It is a React rendering API, not a Web platform API."
      },
      {
        id: "B",
        text: "A configuration file that tells the TypeScript compiler which language features and output format to use.",
        isCorrect: false,
        explanation: "This describes `tsconfig.json`. React Context is a runtime API (`createContext`, `useContext`) that operates during rendering, not a build-time compiler setting."
      },
      {
        id: "C",
        text: "A mechanism for sharing values (like themes, user auth, or locales) across the component tree without manually passing props at every level.",
        isCorrect: true,
        explanation: "Correct. `createContext` creates the channel, `Provider` supplies the value, and `useContext` reads it in any descendant, eliminating the need to forward the value through every intermediate component."
      },
      {
        id: "D",
        text: "A remote database service that persists user credentials across sessions.",
        isCorrect: false,
        explanation: "This describes a backend authentication store. React Context lives entirely in the client-side component tree; it holds no data beyond the current render and persists nothing to a server."
      }
    ],
    correctAnswer: "C",
    explanation: "React Context is a built-in mechanism for sharing values across the component tree without threading props through every intermediate level. You create a context object with `createContext`, wrap a subtree in its `Provider`, and read the current value in any descendant with `useContext`.\n\nIn practice this replaces prop drilling. Without Context, a `Navbar` three levels deep would receive `currentUser` as a prop from `App`, then `Layout`, then `Page` \u2014 each intermediate component just forwards it. With Context, `Navbar` calls `useContext(UserContext)` and gets the value directly, regardless of how many components sit between it and the `Provider`.\n\nThe trade-off an interviewer will probe: every consumer re-renders whenever the Provider's `value` reference changes. If you pass a new object literal on every render (`value={{ user, theme }}`), all consumers re-render even when the data is unchanged. Memoize the value or split contexts to keep re-renders scoped.",
    interviewLine: "Context is a data-passing channel, not a state manager. I use `createContext` to define the channel, wrap a subtree in its Provider, and read the value with `useContext` in any descendant. I keep the value reference stable so I do not trigger unnecessary re-renders in consumers.",
    misconception: "Learners often treat Context as a global state store or a re-render-avoidance tool, when it is specifically a data-passing channel: every consumer re-renders on value change, and it carries no subscription logic, middleware, or persistence of its own.",
    hints: [
      "Think about the problem it solves: a deeply nested component needs a value that originates high in the tree, and every component in between would otherwise just forward it.",
      "Ask yourself: does Context involve a server, a config file, or the browser's location API, or is it purely a React rendering mechanism?",
      "It is not a state store \u2014 it has no `dispatch`, no middleware, and no persistence. It is a channel that connects a Provider to its consumers."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice that `Avatar` reads the theme directly from Context; no intermediate component needs to forward a `theme` prop.",
      language: "tsx",
      code: "import { createContext, useContext, type ReactNode } from \"react\";\n\nconst ThemeContext = createContext(\"light\");\n\nfunction ThemeProvider({ children }: { children: ReactNode }) {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Avatar() {\n  const theme = useContext(ThemeContext);\n  return <div style={{ background: theme === \"dark\" ? \"#111\" : \"#fff\" }}>A</div>;\n}"
    }
  },
  {
    id: "react-what-is-useref-used-for-and-how-does-it-work",
    title: "What is useRef used for and how does it work?",
    prompt: "What is useRef used for and how does it work?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const App = () => {\n  const inputRef = useRef(null);\n\n  const buttonClick = () => {\n    inputRef.current.focus();\n  }\n\n  return (\n    <>\n      <input ref={inputRef} type=\"text\" />\n      <button onClick={buttonClick}>Focus on input tag</button>\n    </>\n  )\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Returns a mutable object `{ current: initialValue }` that persists across renders; mutating `.current` does not trigger a re-render.",
        isCorrect: true,
        explanation: "Correct. `useRef` returns a stable object whose `.current` property is a plain mutable slot; writing to it is invisible to React's reconciliation, so the component does not re-render."
      },
      {
        id: "B",
        text: "Forces the component to re-render whenever `ref.current` is modified, since React tracks all writes to ref objects internally.",
        isCorrect: false,
        explanation: "Tempting if you equate any mutable value with state, but `ref.current` is just a property on a plain object. React never observes writes to it, so no render is scheduled \u2014 the opposite of what `setState` does."
      },
      {
        id: "C",
        text: "Replaces all `useState` calls across the application to reduce the memory overhead of creating new state objects on every render.",
        isCorrect: false,
        explanation: "Tempting if you think of a ref as a lighter state, but they solve different problems. `useState` tells React this value changed, re-render; `useRef` holds a value that should not trigger that update. Swapping one for the other breaks the UI."
      },
      {
        id: "D",
        text: "Stores data in an encrypted cookie that is sent with every HTTP request so the value persists across page navigations.",
        isCorrect: false,
        explanation: "Tempting if the word ref sounds like a persistent storage layer, but it is a plain JavaScript object living in memory. Nothing is serialized, encrypted, or attached to any network request."
      }
    ],
    correctAnswer: "A",
    explanation: "`useRef(initialValue)` returns a plain object `{ current: initialValue }`. React caches that same object for the lifetime of the component, so every render receives the identical reference. Writing to `.current` is a normal property assignment \u2014 it never goes through React's state scheduler, so no re-render is triggered.\n\nIn the code above, `inputRef.current.focus()` reaches the DOM node directly because React attached the element to `.current` during mount. You can use the same pattern to hold a timer id, a previous prop value, or a flag that other logic reads but the rendered output never displays.\n\nOne edge case: the `initialValue` argument is only read on the first render. If you pass a different value on a later render, React silently ignores it and keeps the original. In TypeScript, prefer `useRef<HTMLInputElement>(null)` over `useRef(null)` so `.current` is typed and methods like `.focus()` are available without a cast.",
    interviewLine: "`useRef` gives me a stable object whose `.current` I can mutate freely across renders without triggering a re-render, which is exactly what I need for imperative DOM access or for stashing a value like a timer id that the UI never displays.",
    misconception: "Candidates often treat `ref.current` like a state variable, expecting React to notice the write and re-render, when in fact it is an ordinary object property that React's scheduler never inspects.",
    hints: [
      "Look at what `useRef(null)` actually returns and what happens to that object on the second render.",
      "Ask yourself: does React's reconciliation pipeline see a write to `.current`, or is it just a property on a plain object?",
      "If mutating `.current` did trigger a re-render, the `focus()` call in the example would behave differently \u2014 would it?"
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "Notice that updating `previousWord.current` inside the effect does not re-trigger the effect, because React never sees the write.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction Flashcard({ word }: { word: string }) {\n  const previousWord = useRef(word);\n\n  useEffect(() => {\n    if (previousWord.current !== word) {\n      console.log(`Changed from \"${previousWord.current}\" to \"${word}\"`);\n      previousWord.current = word;\n    }\n  }, [word]);\n\n  return <p>{word}</p>;\n}"
    }
  },
  {
    id: "react-how-to-track-changes-in-a-field-of-an-object-in-a-funct",
    title: "How to track changes in a field of an object in a functional component?",
    prompt: "How to track changes in a field of an object in a functional component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "useEffect(() => {\n  console.log('Changed!')\n}, [obj.someField])",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Pass the entire mutable object into `useCallback` with an empty dependency array so the callback captures the latest value on every render.",
        isCorrect: false,
        explanation: "Tempting if you think of `useCallback` as a general-purpose change tracker, but it only memoises a function reference; it does not observe state. An empty dependency array also means the memoised function is created once and never updated, so it reads a stale closure."
      },
      {
        id: "B",
        text: "Increment `user.age` directly during render and call `forceUpdate()` to schedule a re-render with the new value.",
        isCorrect: false,
        explanation: "Tempting if you come from class-component habits, but `forceUpdate` is a `Component` instance method with no equivalent in function components. Mutating state in place also bypasses React's scheduling, so no re-render is triggered at all."
      },
      {
        id: "C",
        text: "Attach a `document.onpropertychange` listener on the root `<body>` tag and filter events by property name.",
        isCorrect: false,
        explanation: "Tempting if you conflate JavaScript object mutation with DOM events, but `onpropertychange` was an IE-specific event for DOM nodes. Plain object property changes in modern browsers emit no events, so the listener never fires."
      },
      {
        id: "D",
        text: "Pass the specific nested property `user.age` into the dependency array of a `useEffect` hook: `useEffect(() => { ... }, [user.age])`.",
        isCorrect: true,
        explanation: "Correct. Because `user.age` is a primitive, `Object.is` gives a stable value comparison between renders, so the effect re-runs only when that exact field changes, not when the surrounding object is recreated."
      }
    ],
    correctAnswer: "D",
    explanation: "The correct approach is to pass the specific primitive property, such as `user.age`, into the dependency array of `useEffect`. Between renders React compares each dependency with `Object.is`; a number or string that has not changed is skipped, so the effect body does not re-run.\n\nIn practice this matters because the parent object is often recreated on every render. If you listed the whole object, the effect would fire on every unrelated state change. Naming the field keeps the effect scoped to the one value you care about, which also prevents side effects like API calls or DOM writes from firing needlessly.\n\nOne edge case to remember: if the property you track is itself an object or array, `Object.is` compares by reference, so a new reference triggers the effect even when the contents are identical. In that situation you need a derived primitive (a stringified key, a length, a flag) or a custom comparison stored in a `useRef` guard.",
    interviewLine: "I put the specific primitive property in the `useEffect` dependency array so that React's `Object.is` comparison between renders fires the effect only when that field actually changes, not when the parent object gets a new reference.",
    misconception: "Learners often think they need to observe the object itself\u2014via mutation, a DOM event, or a whole-reference comparison\u2014to detect a field change, when React's dependency array already compares individual primitive values with `Object.is` between renders.",
    hints: [
      "Look at what you put inside the dependency array and ask what React compares there between renders.",
      "React uses `Object.is` on each dependency; a primitive number or string is compared by value, while an object is compared by reference.",
      "`useCallback` memoises a function and `forceUpdate` is a class-component method\u2014neither is the tool for reacting to a value change."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that clicking Rename changes the object but does not re-run the effect, while Age up does, because only `user.age` is in the dependency array.",
      language: "tsx",
      code: "import { useState, useEffect } from 'react'\n\nfunction Profile() {\n  const [user, setUser] = useState({ name: 'Ada', age: 30 })\n\n  useEffect(() => {\n    console.log('age changed to', user.age)\n  }, [user.age])\n\n  return (\n    <div>\n      <p>{user.name}</p>\n      <button onClick={() => setUser((u) => ({ ...u, name: 'Grace' }))}>\n        Rename\n      </button>\n      <button onClick={() => setUser((u) => ({ ...u, age: u.age + 1 }))}>\n        Age up\n      </button>\n    </div>\n  )\n}"
    }
  },
  {
    id: "react-how-to-access-a-dom-element",
    title: "How to access a DOM element?",
    prompt: "How to access a DOM element?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const App = () => {\n  const myRef = useRef(null);\n\n  const handleClick = () => {\n    console.log(myRef.current); // Accessing the DOM element\n  };\n\n  return (\n    <div>\n      <input type=\"text\" ref={myRef} />\n      <button onClick={handleClick}>Click Me</button>\n    </div>\n  );\n}\n\nexport default App;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use the `useDOMElement` hook and pass the CSS class name as a string.",
        isCorrect: false,
        explanation: "Tempting because it sounds like a React hook, but no such hook exists in React 19. The standard mechanism for holding a DOM node reference is `useRef` combined with the `ref` prop."
      },
      {
        id: "B",
        text: "Call `document.getElementById` or `querySelector` inside the render function body on every render.",
        isCorrect: false,
        explanation: "Familiar from vanilla JavaScript, but during render the DOM may not yet reflect the latest commit, and the selector reaches outside the component's own subtree. `useRef` scopes the lookup to the exact element and keeps it stable across re-renders."
      },
      {
        id: "C",
        text: "DOM elements cannot be accessed in React under any circumstances.",
        isCorrect: false,
        explanation: "Overstates React's philosophy. React discourages imperative DOM manipulation in favour of state-driven rendering, but it explicitly provides `useRef` and the `ref` prop for cases like focusing an input, playing a video, or reading a scroll position."
      },
      {
        id: "D",
        text: "Use `useRef(null)`, attach it via `ref={myRef}`, and read `myRef.current` in effects or handlers.",
        isCorrect: true,
        explanation: "Correct. React sets `myRef.current` to the committed DOM node on mount and back to `null` on unmount, so reading it in an effect or event handler always gives you the live element."
      }
    ],
    correctAnswer: "D",
    explanation: "`useRef(null)` creates a stable object `{ current: null }` that persists across renders without triggering a re-render. When React commits the element to the DOM, it assigns the live node to `myRef.current`; when the element unmounts, it resets `myRef.current` back to `null`. You read the node in event handlers or `useEffect` callbacks, where the DOM is guaranteed to be in sync with the last committed render.\n\nIn practice this lets you call imperative methods the component API does not expose, such as `inputRef.current.focus()`, `videoRef.current.play()`, or reading `textareaRef.current.value` after a blur. Because mutating `.current` does not call `setState`, the component never re-renders as a side effect of touching the DOM through the ref.\n\nThe edge case interviewers probe: `myRef.current` is `null` during the render pass itself, so reading it inside the function body of a component (or a render-phase callback) is unsafe. That is why the idiomatic pattern is to read the ref inside `useEffect` or an event handler, both of which run after React has committed the DOM update.",
    interviewLine: "I create a ref with `useRef(null)`, attach it to the element through the `ref` prop, and then read `ref.current` inside a `useEffect` or event handler to get the live DOM node. It is `null` during render and after unmount, so I only touch it in a post-commit phase.",
    misconception: "Juniors coming from vanilla JavaScript reach for `document.querySelector` inside the component body, assuming the DOM is always in sync with the latest render. In React the DOM is only updated after the render commits, so the safe place to read a node is an effect or event handler, accessed through a ref React created for you.",
    hints: [
      "Look at the three pieces in the code: `useRef(null)` creates the container, `ref={myRef}` wires it to the element, and `myRef.current` reads the node.",
      "Ask when React actually assigns the DOM node to `ref.current` \u2014 during render, or after the commit phase?",
      "The hook that gives you a mutable, render-stable value without triggering a re-render is the one you want here, not a query against `document`."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that `inputRef.current` is guarded with optional chaining because it is `null` until the effect runs after mount.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction SearchBar() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n\n  return (\n    <input\n      ref={inputRef}\n      type=\"text\"\n      placeholder=\"Search\u2026\"\n    />\n  );\n}\n\nexport default SearchBar;"
    }
  },
  {
    id: "react-what-is-a-custom-hook",
    title: "What is a custom hook?",
    prompt: "What is a custom hook?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A custom HTML element that renders inline SVG graphics within the DOM.",
        isCorrect: false,
        explanation: "Tempting if you read the word 'custom' as implying a custom element, but a hook is a function you write in application code, not a DOM node or a rendering primitive."
      },
      {
        id: "B",
        text: "A browser-level extension that patches the JavaScript engine to expose new built-in functions.",
        isCorrect: false,
        explanation: "This treats a hook as a runtime or engine feature, but a custom hook is a plain function in your source files with no special runtime support or native binding."
      },
      {
        id: "C",
        text: "A JavaScript function whose name starts with `use` that can call other React hooks to encapsulate and share stateful logic across components.",
        isCorrect: true,
        explanation: "Correct. The `use` prefix qualifies the function to call other hooks, and the function body is where you group stateful logic so multiple components can reuse it while each keeps its own state."
      },
      {
        id: "D",
        text: "A Redux middleware function that wraps the dispatch pipeline to intercept and transform actions before they reach reducers.",
        isCorrect: false,
        explanation: "This maps 'custom hook' onto a Redux concept, but hooks are a React API for reusing stateful logic inside components; they have no connection to the Redux dispatch cycle."
      }
    ],
    correctAnswer: "C",
    explanation: "A custom hook is a plain JavaScript function whose name starts with `use`. That prefix is what permits it to call other hooks \u2014 `useState`, `useEffect`, `useContext`, or another custom hook \u2014 because React's Rules of Hooks only allow hook calls at the top level of a component or another `use`-prefixed function.\n\nIn practice you move a block of state and effects out of a component and into the hook, then call the hook from any component that needs that behaviour. Each call site gets its own independent copy of the state; two components using the same custom hook do not share `useState` values unless you pass a shared reference or context explicitly.\n\nA custom hook is not a component: it returns plain data \u2014 a tuple, an object, a number \u2014 rather than JSX, and it does not add a node to the React tree. The `use` prefix is a naming convention enforced by the linter and the React Compiler, not a runtime check; a function named `useFoo` that contains no hook calls is still a perfectly valid custom hook.",
    interviewLine: "A custom hook is a plain function with the `use` prefix \u2014 that's what lets me call other hooks inside it. Each component that calls it gets its own independent copy of the state.",
    misconception: "Thinking a custom hook is a component or a state container \u2014 it is a plain function that returns data, and the state it creates belongs to whichever component calls it, not to the hook itself.",
    hints: [
      "Look at what the `use` prefix actually enables at the call site.",
      "Ask yourself: does calling the function create a new component, or does it just return values into the calling component?",
      "The hook itself has no state \u2014 the state lives in whichever component invoked it."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice that `useDebounce` is a plain function returning a value, and `SearchBar` owns the state it creates \u2014 the hook adds no node to the tree.",
      language: "tsx",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debounced;\n}\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    if (debouncedQuery) {\n      fetch(`/api/search?q=${debouncedQuery}`);\n    }\n  }, [debouncedQuery]);\n\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}"
    }
  },
  {
    id: "react-what-are-the-rules-for-creating-a-custom-hook",
    title: "What are the rules for creating a custom hook?",
    prompt: "What are the rules for creating a custom hook?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Must be declared as an ES6 class extending `React.CustomHook` and registered before use.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as a lifecycle system, but there is no `React.CustomHook` class and no registration step. A custom hook is a plain function; the `use` prefix and the Rules of Hooks are the entire contract."
      },
      {
        id: "B",
        text: "Name must start with `use`, call at least one built-in or custom hook, and obey the Rules of Hooks (unconditional, top-level calls).",
        isCorrect: true,
        explanation: "Correct. The `use` prefix lets the linter identify the function as a hook, the requirement to call at least one hook distinguishes it from a plain utility, and the top-level unconditional rule keeps React's internal state list aligned across renders."
      },
      {
        id: "C",
        text: "Must return a JSX element as its primary return value so the component tree can render it.",
        isCorrect: false,
        explanation: "Tempting if you conflate a hook with a component, but a hook returns data or callbacks \u2014 an array, an object, a primitive \u2014 not a JSX element. The calling component decides what to render with that data."
      },
      {
        id: "D",
        text: "Can only be called inside `for` loops and `switch` statements to guarantee a stable call order.",
        isCorrect: false,
        explanation: "Tempting if you invert the rule and think loops provide stability, but a hook called inside a `for` or `switch` executes a variable number of times, shifting every subsequent hook's position in React's internal list and corrupting state."
      }
    ],
    correctAnswer: "B",
    explanation: "A custom hook is a plain function that composes one or more built-in hooks. Its name must start with `use` so the linter recognises it, it must actually call at least one hook (otherwise it is just a utility function), and every hook call inside it must be unconditional and at the top level \u2014 the same two Rules of Hooks that govern components.\n\nIn practice, if you name the function `fetchUser` instead of `useFetchUser`, `eslint-plugin-react-hooks` will not flag a conditional `useState` call buried inside an `if` block. Once the name carries the `use` prefix, the linter walks the call tree and errors on any hook invocation that sits behind a branch, loop, or nested callback.\n\nThe nuance an interviewer probes: a function that calls no hooks at all is not a custom hook by definition \u2014 it is a helper. And the `use` prefix is a contract with the linter and with the team's mental model, not a runtime requirement; React does not inspect function names, but the linter and the call-order bookkeeping do depend on the convention.",
    interviewLine: "A custom hook is just a function that composes built-in hooks; the `use` prefix is what lets the linter enforce that every hook call inside it is unconditional and top-level, so the call order never shifts between renders.",
    misconception: "Custom hooks are a special class or API you register with React, rather than plain functions whose only contract is the `use` prefix, at least one inner hook call, and unconditional top-level placement.",
    hints: [
      "Think about what React needs to stay true across renders: a stable, predictable list of hook calls in a fixed order.",
      "What naming convention lets `eslint-plugin-react-hooks` know which functions to audit for conditional or nested hook calls?",
      "If a function calls no hooks at all, is it a custom hook or just a utility?"
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice the `use` prefix, the two built-in hook calls at the top level, and the plain value returned \u2014 no JSX, no class.",
      language: "typescript",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}"
    }
  },
  {
    id: "react-what-are-custom-hooks",
    title: "What are Custom Hooks?",
    prompt: "What are Custom Hooks?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Browser-native event subscription APIs that attach to keyboard and pointer events on DOM elements.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word \"hook\" with \"hooking into\" a browser event stream. But hooks are React's state and effect primitives that run inside a component's render cycle; they have no relationship to `addEventListener` or DOM event objects."
      },
      {
        id: "B",
        text: "JavaScript functions whose names start with `use` that call other React hooks to extract, encapsulate, and share reusable stateful logic across components.",
        isCorrect: true,
        explanation: "Correct. The `use` prefix is the naming contract that enforces the rules of hooks, and the function body composes built-in hooks into a single reusable unit that each calling component instantiates independently."
      },
      {
        id: "C",
        text: "TypeScript decorators applied to class fields to enable multiple inheritance and shared class state.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as a class-composition pattern. But custom hooks are plain functions with no `@` syntax, no prototype chain, and no inheritance; they compose via ordinary function calls."
      },
      {
        id: "D",
        text: "Babel or SWC plugins that transform JSX syntax into low-level WebGL buffer and draw-call instructions.",
        isCorrect: false,
        explanation: "Tempting if you associate \"hook\" with a build-time transformation step. But custom hooks execute at runtime inside a component's render and commit phases; they are not compiler plugins and produce no GPU instructions."
      }
    ],
    correctAnswer: "B",
    explanation: "A custom hook is a plain JavaScript function whose name begins with `use` and whose body calls one or more built-in hooks such as `useState`, `useEffect`, or `useContext`. The `use` prefix is a naming contract: it tells React's tooling (the `react-hooks` ESLint plugin, the React Compiler) that the function participates in the hook system and must obey the rules of hooks \u2014 same call order, top-level only, no conditional or loop-wrapped calls.\n\nIn practice you extract a `useDebounce` or `useLocalStorage` hook and call it from five different components. Each caller gets its own independent state instance and its own effect subscriptions; the hook shares the logic, not the state. This is the key difference from a class mixin or a singleton utility.\n\nAn interviewer will probe the edge cases: a custom hook may call other custom hooks (composition), but it still cannot call hooks inside callbacks, conditionals, or loops. Also, a function named `use*` that calls zero built-in hooks is technically allowed but pointless \u2014 the prefix is a convention, not a runtime mechanism, and React never inspects the function body.",
    interviewLine: "A custom hook is just a function that starts with `use` and composes built-in hooks; the prefix is a naming contract that lets the linter enforce call-order stability, and each component that calls it gets its own isolated state and effects.",
    misconception: "A custom hook is imagined as a shared singleton or a class instance whose state is common to all callers, when in reality every component that calls the hook receives its own independent state and effect subscriptions.",
    hints: [
      "Look at what the `use` prefix actually signals to React's tooling rather than what it does at runtime.",
      "A custom hook must follow the same rules as built-in hooks: called unconditionally at the top level, in the same order every render.",
      "The `use` naming convention is what lets the `react-hooks` ESLint plugin enforce the rules; the React runtime itself never inspects the function body."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Each component calling `useDebounce` gets its own `debounced` state and its own timer cleanup, even though the logic is written once.",
      language: "tsx",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debounced;\n}\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    if (debouncedQuery) console.log(\"fetching:\", debouncedQuery);\n  }, [debouncedQuery]);\n\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}"
    }
  },
  {
    id: "react-what-is-the-difference-between-useeffect-and-uselayoute",
    title: "What is the difference between useEffect and useLayoutEffect?",
    prompt: "What is the difference between useEffect and useLayoutEffect?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useEffect` runs asynchronously after the browser paints; `useLayoutEffect` runs synchronously after DOM mutations, before the browser paints.",
        isCorrect: true,
        explanation: "Correct. Both hooks run after React commits DOM changes, but `useLayoutEffect` fires before the browser paints, while `useEffect` is deferred until after paint, making it non-blocking."
      },
      {
        id: "B",
        text: "`useLayoutEffect` runs a fixed 5 seconds after `useEffect` finishes, giving the browser time to settle.",
        isCorrect: false,
        explanation: "Tempting if you picture the two hooks as a timed sequence, but no fixed delay exists between them. `useLayoutEffect` actually fires first, synchronously before paint; `useEffect` follows after the browser has already rendered the frame."
      },
      {
        id: "C",
        text: "`useEffect` runs on the server during SSR, whereas `useLayoutEffect` is skipped on the server and only runs in the browser.",
        isCorrect: false,
        explanation: "Neither hook executes during server-side rendering because there is no browser paint to coordinate with. `useLayoutEffect` specifically logs a console warning when it is reached on the server, since blocking a non-existent paint is meaningless."
      },
      {
        id: "D",
        text: "`useEffect` is for functional components, while `useLayoutEffect` is used exclusively in class components for layout calculations.",
        isCorrect: false,
        explanation: "Both are React hooks and can only be called inside function components or custom hooks. Class components have no hook API at all, so `useLayoutEffect` has no class-component form."
      }
    ],
    correctAnswer: "A",
    explanation: "The difference is timing relative to the browser paint. After React commits DOM mutations, `useLayoutEffect` callbacks run synchronously before the browser paints the new frame. `useEffect` callbacks are deferred until after the browser has painted, so they never block the user from seeing the updated screen.\n\nThis matters when your effect reads layout and then writes a visual change. If you measure `element.offsetWidth` inside `useEffect`, the browser may have already painted the old layout, so the user sees a one-frame flash before your correction lands. `useLayoutEffect` lets you read and write in the same paint cycle, eliminating that flicker.\n\nThe trade-off is that `useLayoutEffect` blocks paint. Heavy work inside it stalls the browser and causes jank. For subscriptions, data fetching, or any work that does not need to synchronise with a visible layout change, `useEffect` is the right choice. Neither hook runs during server-side rendering; `useLayoutEffect` additionally logs a console warning if it is reached on the server.",
    interviewLine: "I reach for `useLayoutEffect` when I need to read a layout value and write a visual correction in the same frame, because it runs synchronously after DOM mutations but before paint. For subscriptions or data fetching I use `useEffect` so the work never blocks the user seeing the new screen.",
    misconception: "Treating the two hooks as different kinds of effect (one for data, one for DOM) rather than the same mechanism placed at different points relative to the browser paint.",
    hints: [
      "Think about what the browser does between \"React commits DOM changes\" and \"the user sees new pixels.\"",
      "One hook runs inside that gap and blocks paint; the other runs after the user already sees the frame.",
      "The difference is not what the effect does (DOM reads, subscriptions) but when it runs relative to paint."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Measuring a node's width and writing it back in the same frame avoids a visible flash that `useEffect` would cause.",
      language: "tsx",
      code: "import { useLayoutEffect, useRef, useState } from \"react\";\n\nfunction AutoWidthLabel() {\n  const ref = useRef<HTMLDivElement>(null);\n  const [width, setWidth] = useState(0);\n\n  useLayoutEffect(() => {\n    if (ref.current) {\n      setWidth(ref.current.offsetWidth);\n    }\n  }, []);\n\n  return (\n    <div ref={ref} style={{ width: width ? `${width}px` : \"auto\" }}>\n      Fitting text\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-what-are-the-limitations-of-react",
    title: "What are the limitations of React?",
    prompt: "What are the limitations of React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It is limited to client-side rendering and cannot produce the static, search-engine-friendly HTML markup that search crawlers need for indexing.",
        isCorrect: false,
        explanation: "Tempting if you equate React with client-side `document.createElement` only, but React's rendering model is environment-agnostic. Next.js, React Router, and Astro all render React components to full HTML on the server, which search engines index without executing JavaScript."
      },
      {
        id: "B",
        text: "It is restricted to server-rendered pages and cannot be used to build single-page applications with client-side navigation and dynamic updates.",
        isCorrect: false,
        explanation: "This inverts React's primary use case. React was designed around a virtual DOM and a re-rendering cycle that makes client-side navigation and dynamic updates its default mode. Most large SPAs (Instagram, Discord, Linear) are built on React."
      },
      {
        id: "C",
        text: "It is a view-only library requiring external packages for routing and state, its ecosystem evolves quickly, and JSX with build tooling adds an initial learning curve.",
        isCorrect: true,
        explanation: "Correct. React deliberately scopes itself to the view layer, so routing, state, and data fetching are separate dependencies you choose and configure. The ecosystem around it (state libraries, data-fetching, styling) sees frequent major versions, and JSX requires a transform step plus a bundler before the browser can execute it."
      },
      {
        id: "D",
        text: "It is incompatible with modern JavaScript ES6+ syntax such as arrow functions and destructuring, and does not support TypeScript type annotations.",
        isCorrect: false,
        explanation: "The opposite is true. React's source and its type definitions assume ES2015+ (arrow functions, destructuring, `class` fields), and the `@types/react` package plus React's own `.d.ts` files give you full TypeScript support out of the box."
      }
    ],
    correctAnswer: "C",
    explanation: "React is a view library, not a full framework. The `react` package ships components, hooks, and the reconciliation engine, but it does not include a router, a state-management store, a data-fetching layer, or a form-handling system. You pair it with React Router, Zustand, Redux, TanStack Query, or similar packages and wire them into your components yourself.\n\nIn practice this means a junior developer coming from Angular or Vue will open a blank `react` project and see no routing, no global store, no `HttpClient`. Every one of those is a separate `npm install` and a separate mental model. On top of that, JSX is not valid JavaScript, so you need a transform step (Babel, SWC, esbuild) and a bundler (Vite, Webpack) before the browser can run the code. That tooling chain is a real onboarding cost that a plain-HTML project does not have.\n\nAn interviewer will probe whether the instability lives in React's own API or in the ecosystem around it. React's core API (hooks, `useEffect`, `useMemo`) has been stable since React 18, and React 19 added Server Components and Actions without breaking those. The churn is in the surrounding libraries: state management, data fetching, and styling all see major rewrites every couple of years. Naming that distinction shows you understand where the real learning cost sits.",
    interviewLine: "React is scoped to the view layer on purpose. Routing, state, and data fetching are deliberate choices you make with companion libraries, and the JSX-plus-bundler pipeline is a real but one-time onboarding cost, not an ongoing limitation.",
    misconception: "Treating React like a full framework such as Angular or Vue, so when you open a blank `react` project and see no router, no DI container, and no global store, you read that as a defect rather than a deliberate scope boundary.",
    hints: [
      "Open the `react` npm package and list what it actually exports, then compare that to what a full application needs.",
      "Ask yourself: which parts of a typical web app (routing, state, data fetching, forms) are missing from the `react` package itself?",
      "SSR and SPAs are both well-supported, so eliminate any option that claims React cannot do them."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `react-router-dom` is a separate import; React itself ships no routing.",
      language: "tsx",
      code: "import { createBrowserRouter, RouterProvider } from \"react-router-dom\";\nimport Home from \"./Home\";\nimport About from \"./About\";\n\nconst router = createBrowserRouter([\n  { path: \"/\", element: <Home /> },\n  { path: \"/about\", element: <About /> },\n]);\n\nexport default function App() {\n  return <RouterProvider router={router} />;\n}"
    }
  },
  {
    id: "react-what-is-usestate-in-react",
    title: "What is useState() in React?",
    prompt: "What is useState() in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "...\nconst [count, setCounter] = useState(0);\nconst [otherStuffs, setOtherStuffs] = useState(...);\n...\nconst setCount = () => {\n   setCounter(count + 1);\n   setOtherStuffs(...);\n   ...\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A React Hook that declares a state variable in a functional component, returning a tuple `[state, setState]` to read and update the value.",
        isCorrect: true,
        explanation: "Correct. `useState(initialValue)` returns a two-element array: the current state value and a setter function that schedules a re-render when called."
      },
      {
        id: "B",
        text: "A hook that can only be called inside class component constructor methods.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with the `this.state` / `this.setState()` pattern, but hooks are designed for functional components. Class components manage state through the instance and have no hook support."
      },
      {
        id: "C",
        text: "A method that mutates DOM elements directly without triggering component re-renders.",
        isCorrect: false,
        explanation: "Tempting if you picture React as a thin DOM wrapper, but `useState` never touches a DOM node. It updates React's internal state, and the re-render is what reconciles the DOM."
      },
      {
        id: "D",
        text: "A global store provider that synchronizes state across all browser windows.",
        isCorrect: false,
        explanation: "Tempting if you picture a single shared store like Redux or Zustand, but `useState` is scoped to one component instance. Two components calling `useState(0)` each get their own independent value."
      }
    ],
    correctAnswer: "A",
    explanation: "`useState` is a built-in React Hook that declares a piece of local state inside a functional component. It returns a two-element array: the current value and a setter function. Calling the setter does not mutate the variable you destructured; it schedules a re-render so the component function runs again and the value reflects the update.\n\nIn the example, `useState(0)` gives `count` and `setCounter`. When `setCounter(count + 1)` fires inside the event handler, React queues a re-render. Because `setCounter` and `setOtherStuffs` are called in the same handler, React batches both updates into a single re-render rather than two.\n\nThe setter never changes the value in the current render pass. If two consecutive calls depend on the previous value, pass a function updater: `setCounter(prev => prev + 1)`. Hooks must also be called unconditionally at the top level of the component; wrapping them in a conditional or loop violates the Rules of Hooks.",
    interviewLine: "`useState` gives me a snapshot value and a setter; calling the setter doesn't change the variable in the current render, it queues a re-render where the component function runs again and the value is fresh.",
    misconception: "Thinking of `useState` as a mutable variable you can read and write freely, rather than a snapshot that only changes when React re-renders the component.",
    hints: [
      "Look at what `useState(0)` returns and how the code destructures it.",
      "Ask what happens in the current render when you call `setCounter` \u2014 does the `count` variable change right there?",
      "It is not a DOM API, not a global store, and not available in class components."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState",
    example: {
      caption: "Notice that `seconds` still reads 0 in the same render even after two setter calls; the new value only appears on the next render.",
      language: "jsx",
      code: "function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  const start = () => {\n    setSeconds(seconds + 1);\n    setSeconds(seconds + 1); // still seconds + 1, not seconds + 2\n    console.log(seconds);    // prints 0 in this render\n  };\n\n  return (\n    <div>\n      <p>{seconds}s</p>\n      <button onClick={start}>+1</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-what-are-the-differences-between-functional-and-class-c",
    title: "What are the differences between functional and class components?",
    prompt: "What are the differences between functional and class components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "function card(props){\n   return(\n      <div className=\"main-container\">\n        <h2>Title of the card</h2>\n      </div>\n    )\n   }\n   const card = (props) =>{\n    return(\n      <div className=\"main-container\">\n        <h2>Title of the card</h2>\n      </div>\n    )\n   }\n\nclass Card extends React.Component{\n  constructor(props){\n     super(props);\n   }\n    render(){\n      return(\n        <div className=\"main-container\">\n          <h2>Title of the card</h2>\n        </div>\n      )\n    }\n   }\n\n<Student Info name=\"Vivek\" rollNumber=\"23\" />\n\nfunction StudentInfo(props){\n   return(\n     <div className=\"main\">\n       <h2>{props.name}</h2>\n       <h4>{props.rollNumber}</h4>\n     </div>\n   )\n }\n\nclass StudentInfo extends React.Component{\n   constructor(props){\n     super(props);\n    }\n    render(){\n      return(\n        <div className=\"main\">\n          <h2>{this.props.name}</h2>\n          <h4>{this.props.rollNumber}</h4>\u00a0\n        </div>\n      )\n    }\n   }\n\nfunction ClassRoom(props){\n   let [studentsCount,setStudentsCount] = useState(0);\n    const addStudent = () => {\n      setStudentsCount(++studentsCount);\n   }\n    return(\n      <div>\n        <p>Number of students in class room: {studentsCount}</p>\n        <button onClick={addStudent}>Add Student</button>\n      </div>\n    )\n   }\n\nclass ClassRoom extends React.Component{\n        constructor(props){\n            super(props);\n            this.state = {studentsCount: 0};\n            \n            this.addStudent = this.addStudent.bind(this);\n         }\n            \n            addStudent(){\n            this.setState((prevState)=>{\n               return {studentsCount: prevState.studentsCount++}\n            });\n         }\n            \n            render(){\n             return(\n               <div>\n                 <p>Number of students in class room: {this.state.studentsCount}</p>\n                 <button onClick={this.addStudent}>Add Student</button>\n               </div>\n             )\n           }\n         }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Class components are executed on the server, while functional components only execute in the browser.",
        isCorrect: false,
        explanation: "Tempting if you conflate component type with rendering location, but both class and functional components render identically on the server (SSR) and the client. The runtime environment is determined by where you call `render` or `hydrateRoot`, not by the component's declaration style."
      },
      {
        id: "B",
        text: "Functional components require manual memory deallocation through C++ pointers, while class components rely on the JavaScript garbage collector.",
        isCorrect: false,
        explanation: "React components, regardless of form, run inside a garbage-collected JavaScript runtime. There is no C++ pointer layer exposed to component code, and neither style requires you to free memory manually."
      },
      {
        id: "C",
        text: "Functional components are JavaScript functions using Hooks for state/effects; class components extend `React.Component` and use `this.state` and lifecycle methods.",
        isCorrect: true,
        explanation: "Correct. This captures the structural difference: a function component is a plain function that leans on Hooks, while a class component is an ES6 class that manages state through `this.state` and side effects through lifecycle methods."
      },
      {
        id: "D",
        text: "Functional components cannot accept or render props, whereas class components receive props through `this.props`.",
        isCorrect: false,
        explanation: "Pre-Hooks, functional components were sometimes called 'stateless,' which led people to assume they could not take props. In reality, props are the first argument to any functional component and are accessed directly, just as `this.props` works in a class component."
      }
    ],
    correctAnswer: "C",
    explanation: "Functional components are plain JavaScript functions\u2014declared with the `function` keyword or an arrow function\u2014that receive props as their argument and use Hooks like `useState` and `useEffect` for state and side effects. Class components extend `React.Component`, initialize state in the constructor via `this.state`, update it with `this.setState`, and manage lifecycle through methods such as `componentDidMount` and `componentDidUpdate`.\n\nIn practice this means a functional component reads state from a local variable (`studentsCount`) and updates it through a setter (`setStudentsCount`), while a class component reads from `this.state.studentsCount` and must bind methods to the instance so that `this` inside `addStudent` still points to the component. Forgetting the bind call is a frequent source of `this is undefined` errors in class components.\n\nBoth forms are fully supported in React 19 and can render on the server or the client. You cannot call Hooks inside a class component, and you cannot use `this.state` or lifecycle methods inside a functional component. Legacy codebases still ship class components, so reading and maintaining them remains a practical skill.",
    interviewLine: "A functional component is just a function that takes props and uses Hooks like `useState` and `useEffect` for state and side effects; a class component extends `React.Component`, keeps state in `this.state`, and ties side effects to lifecycle methods like `componentDidMount`.",
    misconception: "Thinking that 'functional' means 'stateless' or that the two styles differ in where they execute, when the real difference is how state and side effects are managed: Hooks versus `this.state` and lifecycle methods.",
    hints: [
      "Look at how each style declares itself: one is a plain function, the other is an ES6 class extending `React.Component`.",
      "Ask how each one stores and updates state, and how each one runs a side effect like a timer or a fetch.",
      "Neither difference is about where the code executes or whether it can receive props; the split is in the state-and-effects API."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how `useState` replaces `this.state` and `useEffect` replaces `componentDidMount` plus cleanup, with no `this` binding needed.",
      language: "tsx",
      code: "function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => setSeconds((s) => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <p>{seconds}s</p>;\n}"
    }
  },
  {
    id: "react-what-is-prop-drilling-in-react",
    title: "What is prop drilling in React?",
    prompt: "What is prop drilling in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Forwarding a prop through intermediate components that do not use it, just to reach a deeply nested child.",
        isCorrect: true,
        explanation: "Correct. Prop drilling is exactly this: a prop is forwarded through components that accept it but never read it, solely to deliver the value to a deeper child, coupling every link in the chain to data it does not own."
      },
      {
        id: "B",
        text: "A compiler error thrown when a prop name contains uppercase characters.",
        isCorrect: false,
        explanation: "Tempting if you associate the word \"drilling\" with a compiler diagnostic, but prop drilling is a code-organization pattern visible in the component tree, not an error condition. React prop names are conventionally camelCase and uppercase names do not trigger any compiler error."
      },
      {
        id: "C",
        text: "The process of drilling down into JavaScript bytecode to optimize prop access speed.",
        isCorrect: false,
        explanation: "Tempting if you read \"drilling\" as a low-level optimization pass, but prop drilling operates at the component-tree level in your source code. It has no connection to bytecode, JIT compilation, or runtime performance tuning."
      },
      {
        id: "D",
        text: "A tool that automatically generates unit tests for React component props.",
        isCorrect: false,
        explanation: "Tempting if you associate the word \"prop\" with testing utilities, but prop drilling is an architectural pattern you can observe in any component hierarchy. No tool or code generator is involved; it is simply the shape of how data flows through the tree."
      }
    ],
    correctAnswer: "A",
    explanation: "Prop drilling is the pattern of forwarding a prop through one or more intermediate components that do not consume it, solely so a deeply nested child can receive the value. In the example above, `Page`, `Content`, and `Panel` all accept `userId` in their props but never read it; they exist only to hand it down to `UserBadge`.\n\nThe practical cost is coupling. Every intermediate component now has a prop in its public API that it does not use, so renaming or removing that data forces you to touch every link in the chain. Refactoring `Content` into a different layout, or extracting `Panel` into a reusable library component, becomes harder because the component's signature is polluted by a value it was never meant to own.\n\nThe usual remedies are composition (passing the child as `children` or a render prop so the data never traverses the middle layers), React Context for genuinely shared values consumed by many branches, or lifting the consuming component higher in the tree. For a two- or three-level hierarchy, prop drilling is often the simplest and most explicit choice; it becomes a real maintenance problem when the chain grows long or the data is consumed in several unrelated branches.",
    interviewLine: "Prop drilling is when you forward a prop through intermediate components that don't actually consume it, just to reach a deeply nested child \u2014 it works, but it couples unrelated components and makes refactoring painful because every link in the chain has to declare a prop it never reads.",
    misconception: "Treating prop drilling as a bug, an error, or a tool rather than a code-organization pattern that becomes unwieldy as the component tree deepens and intermediate components accumulate props they never use.",
    hints: [
      "Look at what \"drilling\" implies in the context of a component tree hierarchy.",
      "Ask which components in the chain actually consume the prop and which merely accept and re-emit it.",
      "It is not an error, a compiler feature, or a testing utility \u2014 it is a pattern you can see in the component structure itself."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice that Page, Content, and Panel all accept userId in their props but never read it \u2014 they exist solely to pass it down to UserBadge.",
      language: "tsx",
      code: "function Dashboard() {\n  const userId = \"u_42\";\n  return (\n    <Page userId={userId}>\n      <Content userId={userId}>\n        <Panel userId={userId}>\n          <UserBadge userId={userId} />\n        </Panel>\n      </Content>\n    </Page>\n  );\n}\n\nfunction Page({ children, userId }: { children: React.ReactNode; userId: string }) {\n  return <main>{children}</main>;\n}\n\nfunction Content({ children, userId }: { children: React.ReactNode; userId: string }) {\n  return <section>{children}</section>;\n}\n\nfunction Panel({ children, userId }: { children: React.ReactNode; userId: string }) {\n  return <div className=\"panel\">{children}</div>;\n}\n\nfunction UserBadge({ userId }: { userId: string }) {\n  return <span>user {userId}</span>;\n}"
    }
  },
  {
    id: "react-what-is-react-hooks",
    title: "What is React Hooks?",
    prompt: "What is React Hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Git commit hooks that enforce code linting before git push.",
        isCorrect: false,
        explanation: "Tempting because the word \"hook\" is shared, but git hooks are shell scripts in .git/hooks (pre-commit, pre-push) that the version-control tool runs; they have no connection to the React library or its rendering model."
      },
      {
        id: "B",
        text: "Functions introduced in React 16.8 that give function components state, lifecycle logic, context, and refs without class components.",
        isCorrect: true,
        explanation: "Correct. Hooks are React's API for giving function components access to state (useState), side effects (useEffect), context (useContext), and mutable refs (useRef), removing the need for a class and its lifecycle methods."
      },
      {
        id: "C",
        text: "CSS pseudoclasses that hook into `:hover` and `:active` styling states.",
        isCorrect: false,
        explanation: "A wordplay trap: pseudoclasses like :hover are CSS selectors evaluated by the browser's style engine; they are not JavaScript functions and have no runtime relationship to React's component model."
      },
      {
        id: "D",
        text: "Browser extension plugins that hook into Chrome DevTools to profile network traffic.",
        isCorrect: false,
        explanation: "Conflates the English word \"hook\" with a specific React API. Browser extensions are separate packages loaded by the browser; they do not live inside the react npm package or participate in its render cycle."
      }
    ],
    correctAnswer: "B",
    explanation: "React Hooks are a set of built-in functions \u2014 useState, useEffect, useRef, useContext, and others \u2014 introduced in React 16.8 in 2019. They let a plain function component read and update state, run side effects, subscribe to context, and hold refs without extending React.Component or juggling componentDidMount, componentDidUpdate, and componentWillUnmount.\n\nBefore 16.8, any component that needed state or lifecycle logic had to be a class. Hooks moved that capability into function components, which also made it straightforward to extract reusable logic into custom hooks (functions whose names start with use) and share it across components without a render-prop or HOC wrapper.\n\nThe nuance an interviewer probes next: hooks are tracked by their call order in the render function. That is why the Rules of Hooks forbid calling them inside conditionals, loops, or nested functions \u2014 React matches each hook to its internal slot by position, so a skipped or reordered call silently shifts every hook after it.",
    interviewLine: "Hooks are functions like useState and useEffect that let me use React's state, lifecycle, and context features inside a plain function component, so I skip the class boilerplate and can pull reusable logic into custom hooks.",
    misconception: "Treating \"hook\" as a generic programming term (event hook, git hook, CSS hook) rather than a specific React API: a set of functions that tap into React's internal per-component state and rendering pipeline. The word does not mean \"a callback you register\" the way an event listener does.",
    hints: [
      "The word \"hook\" in React is a naming convention for a specific set of functions in the react package, not a general programming concept like event hooks or git hooks.",
      "Before React 16.8, which component type was the only one that could hold state or run lifecycle logic? Hooks solved that limitation.",
      "The answer describes what hooks let a function component do, not a versioning tool, a CSS selector, or a browser plugin."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A function component using useState to hold a counter \u2014 the same pattern a class component would have needed a constructor and a setState handler for.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;"
    }
  },
  {
    id: "react-explain-react-hooks",
    title: "Explain React Hooks.",
    prompt: "Explain React Hooks., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "function Person(props) {\n// We are declaring a state variable called name.\n// setName is a function to update/change the value of name\nlet [name, setName] = useState('');\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks are class methods that must be bound to `this` inside the constructor.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as part of the old class-component API, but hooks are standalone functions called at the top level of a function component; they never reference `this` and cannot be used inside a class at all."
      },
      {
        id: "B",
        text: "Hooks are functions that add state and lifecycle logic to functional components, enabling logic reuse and cleaner composition.",
        isCorrect: true,
        explanation: "Correct. Hooks are ordinary functions that register state, effects, or context on the component's fiber, giving function components the same capabilities classes previously required and allowing logic to be extracted into reusable custom hooks."
      },
      {
        id: "C",
        text: "Hooks are global singletons that can only be instantiated once per domain name.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with module-level singletons, but each call to a hook inside a component creates an independent slot on that component's fiber; two components calling `useState` get completely separate state values."
      },
      {
        id: "D",
        text: "Hooks are asynchronous worker threads that compile JSX into machine assembly instructions.",
        isCorrect: false,
        explanation: "Tempting if you mix up runtime React APIs with build-time tooling, but hooks are synchronous JavaScript functions executed during the render or commit phase; they have nothing to do with Web Workers or code compilation."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks are plain JavaScript functions that call internal React APIs to register state, effects, or context subscriptions on the current component instance. When you write `const [name, setName] = useState('')`, React stores the initial value in a slot on the component's fiber node and returns that value plus a stable setter function. No class, no `this`, no inheritance is involved.\n\nBefore React 16.8, a function component that needed state or lifecycle logic had to be rewritten as a class with `this.state`, `componentDidMount`, and `componentDidUpdate`. Hooks let you keep the function-component shape while declaring local state, running side effects with `useEffect`, and reading context. Custom hooks such as `useDebounce` let you extract that logic into a reusable function without a higher-order component or a render-prop wrapper.\n\nHooks must be called unconditionally at the top level of a component or custom hook, not inside loops, conditions, or nested callbacks. React identifies each hook by its call order in the fiber; breaking that rule shifts every subsequent hook's state to the wrong slot on the next render.",
    interviewLine: "Hooks are plain functions that call into React's internal fiber API to register state, effects, or context subscriptions for the current component instance, so a function component gets the same capabilities a class used to provide without inheritance or `this`.",
    misconception: "Hooks are some special React-internal mechanism tied to the class-component model, rather than plain functions that register data on the component's fiber by call order.",
    hints: [
      "Look at what `useState` actually returns and where the value lives between renders.",
      "Ask yourself what React stores, and where, when a function component calls `useState` at the top level.",
      "Hooks are not tied to `this` or to any class; they are ordinary function calls that React tracks by their position in the call sequence."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A custom hook wraps `useRef` and `useEffect` to expose the previous render's value, showing how hooks compose without a class.",
      language: "tsx",
      code: "function usePrevious<T>(value: T): T | undefined {\n  const ref = useRef<T | undefined>(undefined);\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const prev = usePrevious(count);\n  return <p>{count} (was {prev ?? '\u2014'})</p>;\n}"
    }
  },
  {
    id: "react-what-are-the-rules-that-must-be-followed-while-using-re",
    title: "What are the rules that must be followed while using React Hooks?",
    prompt: "What are the rules that must be followed while using React Hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Call hooks only at the top level of a function component or custom hook, and never inside loops, conditions, or nested functions.",
        isCorrect: true,
        explanation: "Correct. React stores hook state in an array indexed by call order, so a stable, unconditional call sequence is the only way to keep each hook's slot aligned across renders. Restricting calls to function components and custom hooks ensures that array exists and is owned by a single component instance."
      },
      {
        id: "B",
        text: "Call hooks inside `setTimeout` or `requestAnimationFrame` callbacks so they execute after the initial paint.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as deferred lifecycle callbacks, but hooks are plain function calls executed synchronously during render. Deferring them into a timer would place the call outside the render pass, so React's per-render hook array would never record the state."
      },
      {
        id: "C",
        text: "Limit each component to at most two hook calls to keep the internal hook list short.",
        isCorrect: false,
        explanation: "Tempting if you assume React imposes a small fixed budget of hook slots, but there is no cap: a component can call `useState`, `useEffect`, `useMemo`, and any number of custom hooks as long as every call is unconditional and in the same order each render."
      },
      {
        id: "D",
        text: "Every hook must return a boolean that tells React whether to commit the re-render.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with `shouldComponentUpdate` or `React.memo`, but hooks return whatever their API specifies \u2014 a state tuple, a ref, a value \u2014 and React decides whether to commit based on its own scheduling, not on a hook's return type."
      }
    ],
    correctAnswer: "A",
    explanation: "React enforces two rules because it tracks every hook call in a per-component array, indexed by the order the calls appear during render. Rule one: call hooks only at the top level of the function body, never inside loops, conditionals, or nested callbacks. Rule two: call hooks only from function components or from custom hooks (functions whose name starts with `use`), not from class components or from arbitrary utility functions.\n\nIf a conditional skips a `useState` call on one render and includes it on the next, the array shifts: the second hook's state is read from the first slot and vice versa. The component does not crash immediately; it silently assigns the wrong state to the wrong variable, and the bug surfaces only when the branch toggles.\n\nThe custom-hook rule is not an extra restriction. A custom hook is just a function that calls hooks, so the top-level rule still applies inside it. The `use` prefix is a convention that lets the React Compiler and `eslint-plugin-react-hooks` verify both rules mechanically.",
    interviewLine: "React stores hook state in an array indexed by call order, so I always call hooks unconditionally at the top level and only inside function components or custom hooks; that keeps the array aligned across every render and lets the linter verify the order mechanically.",
    misconception: "Hooks are treated as lifecycle callbacks that React schedules at specific times, when they are actually ordinary function calls whose order React records positionally in a per-component array; the rules exist to keep that array stable, not to control when or how often the calls run.",
    hints: [
      "React records hooks in an internal array indexed by the order they are called during a render pass.",
      "Ask what happens to that array if a hook call is skipped on one render but present on the next.",
      "The two rules constrain call-site position and call-site context, not timing or return values."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that every hook call sits at the top level of the custom hook, and the `use` prefix is what lets the linter check both rules.",
      language: "typescript",
      code: "function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(initial);\n\n  useEffect(() => {\n    const stored = window.localStorage.getItem(key);\n    if (stored !== null) setValue(JSON.parse(stored) as T);\n  }, [key]);\n\n  const set = useCallback((next: T) => {\n    setValue(next);\n    window.localStorage.setItem(key, JSON.stringify(next));\n  }, [key]);\n\n  return [value, set] as const;\n}"
    }
  },
  {
    id: "react-why-do-react-hooks-make-use-of-refs",
    title: "Why do React Hooks make use of refs?",
    prompt: "Why do React Hooks make use of refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To replace the virtual DOM with direct real DOM string replacements on every keystroke.",
        isCorrect: false,
        explanation: "Tempting if you picture a ref as a shortcut around React's rendering. In reality React still reconciles the virtual DOM on every render; a ref simply gives you a handle to one mounted node after the fact, not a replacement for the whole diffing pipeline."
      },
      {
        id: "B",
        text: "To hold mutable values that persist across renders without causing re-renders when changed, and to directly access underlying DOM nodes.",
        isCorrect: true,
        explanation: "Correct. `useRef` returns a persistent `{ current }` container whose mutations skip the scheduler, and it also serves as the standard way to reach a DOM node for imperative operations like focus, scroll, or third-party library integration."
      },
      {
        id: "C",
        text: "To trigger immediate synchronous re-renders of the entire parent component tree.",
        isCorrect: false,
        explanation: "This inverts the mechanism. Writing to `ref.current` is a plain property assignment that React never observes; it schedules no work. State updates are what trigger re-renders, and even those are batched, not immediate and synchronous."
      },
      {
        id: "D",
        text: "To encrypt component props before sending them to the backend API.",
        isCorrect: false,
        explanation: "No connection exists between refs and data transmission. A ref is a plain in-memory JavaScript object holding a reference; it has no role in serialisation, encryption, or network requests."
      }
    ],
    correctAnswer: "B",
    explanation: "`useRef` returns a stable object with a `current` property that survives every re-render. Mutating `ref.current` is a plain property write: React's scheduler never sees it, so no re-render is scheduled. This gives hooks a way to hold mutable data\u2014timer IDs, previous values, DOM nodes\u2014across renders without the cost of a state update.\n\nIn practice this means you can call `inputRef.current.focus()` or read `el.scrollHeight` without going through React's reconciliation loop. Storing a `setTimeout` ID in a ref lets you clear it in a cleanup effect without triggering a render just to record the ID. The value lives in memory, invisible to the render tree.\n\nThe edge case interviewers probe: reading a ref during render is fine, but writing to it during render breaks the purity guarantee of the render function. And because refs are non-reactive, no component re-renders when one changes. If your UI depends on the value, it belongs in state, not a ref.",
    interviewLine: "I use `useRef` when a value needs to survive re-renders but the UI doesn't need to react to it\u2014a timer ID, a previous prop, a DOM node handle. Writing to `ref.current` is a plain property mutation; React's scheduler never sees it, so no render is scheduled.",
    misconception: "Treating refs as a kind of slow state or as a reactivity mechanism. Refs are deliberately non-reactive: they exist precisely so you can store or access a value without the render cycle ever noticing.",
    hints: [
      "Compare what happens when you call `setState` versus when you assign to `ref.current`\u2014one schedules a render, the other does not.",
      "Ask yourself: does the UI need to display this value? If not, a ref is the right home.",
      "A ref is not a rendering mechanism; it is a storage-and-access mechanism that sits outside the reconciliation loop."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "Notice that `lastQuery.current` is written without ever calling a setter, and `inputRef.current` is used for an imperative DOM call\u2014neither triggers a re-render.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction SearchInput() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  const lastQuery = useRef(\"\");\n\n  function onSubmit() {\n    console.log(\"connected:\", inputRef.current?.isConnected);\n    lastQuery.current = inputRef.current?.value ?? \"\";\n  }\n\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n\n  return (\n    <input\n      ref={inputRef}\n      placeholder=\"Search\u2026\"\n      onKeyDown={(e) => e.key === \"Enter\" && onSubmit()}\n    />);\n}"
    }
  },
  {
    id: "react-does-react-hook-work-with-static-typing",
    title: "Does React Hook work with static typing?",
    prompt: "Does React Hook work with static typing?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Yes, React Hooks work seamlessly with TypeScript, inferring state types from the initial value or accepting explicit generics (e.g. `useState<User | null>(null)`).",
        isCorrect: true,
        explanation: "Correct. `@types/react` declares every built-in hook with generic parameters, so the compiler infers the state type from the initial value and lets you override it with an explicit type argument, giving full static checking on both the value and the setter."
      },
      {
        id: "B",
        text: "TypeScript removes all React hook calls during compilation, so no runtime hook exists to type.",
        isCorrect: false,
        explanation: "Tempting if you conflate type erasure with code removal. TypeScript strips type annotations and interfaces, but function calls like `useState` and `useEffect` are plain runtime JavaScript that the transpiler preserves untouched."
      },
      {
        id: "C",
        text: "No, React Hooks can only be used in untyped JavaScript files and have no TypeScript support.",
        isCorrect: false,
        explanation: "This assumes hooks are a JavaScript-only feature. In practice React ships its own type declarations, and the entire ecosystem of hooks libraries (`zustand`, `react-query`, `ahooks`) is written and consumed in TypeScript."
      },
      {
        id: "D",
        text: "Only `useEffect` supports static typing; every other hook must be typed as `any` to compile.",
        isCorrect: false,
        explanation: "This overstates the problem to a single hook. `useState`, `useReducer`, `useRef`, `useContext`, `useMemo`, and `useCallback` are all declared with generics in `@types/react`, so none of them require an `any` escape hatch."
      }
    ],
    correctAnswer: "A",
    explanation: "Yes. Every built-in React hook is typed in the `@types/react` package (or React 19's bundled types). TypeScript infers the state type from the initial value you pass to `useState`, and you can override that inference with an explicit generic such as `useState<User | null>(null)`. The same pattern applies to `useReducer`, `useRef`, `useContext`, and `useEffect`, whose callback parameters are checked against the effect's dependencies.\n\nIn real code this means the compiler catches mismatches at the call site. If `useState(0)` produces a `[number, Dispatch<SetStateAction<number>>]` tuple, then `setCount(\"five\")` is a compile error before the browser ever runs the component. Custom hooks inherit the benefit: annotate the return type once in `useAuth()` and every consumer that destructures `user` gets `User | null` without a single `as` cast.\n\nThe nuance an interviewer may probe: TypeScript's checking is opt-in per project, not enforced by the hook itself. You can still pass `any` as the initial value and lose all downstream inference, and `useRef()` with no argument gives `RefObject<undefined>` in React 19 types, which is a common footgun when you actually need a mutable ref to a DOM node.",
    interviewLine: "Yes \u2014 TypeScript infers the tuple from `useState`'s initial value, and I can override it with an explicit generic like `useState<User | null>(null)`. In a custom hook I just annotate the return type once and every consumer gets full static checking without a single `any`.",
    misconception: "TypeScript is a runtime layer that transforms or removes code, rather than a compile-time annotation system that erases type syntax while preserving every function call and expression as-is.",
    hints: [
      "What does TypeScript do at compile time versus what the browser executes at runtime?",
      "Check whether `useState(0)` produces a `number` type on the state variable without any annotation on your part.",
      "The question is whether the type system can see into the hook's return value, not whether the hook itself performs type-checking."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `count` and `increment` are fully inferred from the hook's return type, so the consumer needs zero annotations.",
      language: "tsx",
      code: "function useCounter(start: number) {\n  const [count, setCount] = useState(start);\n  const increment = () => setCount((c) => c + 1);\n  return { count, increment };\n}\n\nfunction Dashboard() {\n  const { count, increment } = useCounter(0);\n  // count: number, increment: () => void \u2014 both inferred\n  return (\n    <button onClick={increment}>\n      Clicked {count} times\n    </button>\n  );\n}"
    }
  },
  {
    id: "react-what-are-the-lifecycle-methods-of-react",
    title: "What are the lifecycle methods of React?",
    prompt: "What are the lifecycle methods of React?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Methods that execute only when the user reboots their physical computer.",
        isCorrect: false,
        explanation: "Tempting if you read 'lifecycle' as the machine's power cycle, but React lifecycle methods are JavaScript methods invoked by the React renderer during a component's mount, update, and unmount phases, not OS events."
      },
      {
        id: "B",
        text: "Class methods including `componentDidMount`, `shouldComponentUpdate`, `getDerivedStateFromProps`, `render`, `componentDidUpdate`, and `componentWillUnmount`.",
        isCorrect: true,
        explanation: "Correct. These are the class-component lifecycle methods React calls automatically at the mount, update, and unmount phases, giving you deterministic hooks into the component's existence."
      },
      {
        id: "C",
        text: "Network packet routers used to configure DNS records.",
        isCorrect: false,
        explanation: "Tempting if you associate 'lifecycle' with network infrastructure, but these are instance methods on a React class component, not routing or DNS configuration."
      },
      {
        id: "D",
        text: "Backend database stored procedures executed on SQL servers.",
        isCorrect: false,
        explanation: "Tempting if you read 'lifecycle' as a database term, but React lifecycle methods run in the browser or during SSR as part of the render pipeline, not on a SQL server."
      }
    ],
    correctAnswer: "B",
    explanation: "React class components define a fixed set of lifecycle methods that the renderer calls automatically at three phases: mounting, updating, and unmounting. `componentDidMount` fires after the first render commits to the DOM, `shouldComponentUpdate` lets you short-circuit an update by returning `false`, `getDerivedStateFromProps` derives state from new props before render, `render` produces the virtual-DOM output, `componentDidUpdate` fires after an update commits, and `componentWillUnmount` fires before the component is removed.\n\nIn practice this means you can start a WebSocket in `componentDidMount` and close it in `componentWillUnmount`, or skip an expensive re-render in `shouldComponentUpdate` when the props you do not use change. Without these methods you would have no clean place to attach or detach browser events, start or stop timers, or synchronise internal state with incoming props.\n\nIn React 19 the function-component equivalent is `useEffect` (and `useLayoutEffect`) with its cleanup callback, and most new code uses hooks. The class lifecycle methods still work in class components, but an interviewer who sees them in a 2025 codebase will ask why you are not using hooks.",
    interviewLine: "React class components expose lifecycle methods like `componentDidMount`, `shouldComponentUpdate`, and `componentWillUnmount` that the renderer calls automatically at mount, update, and unmount, giving you deterministic hooks to run side effects and clean them up.",
    misconception: "Treating 'lifecycle' as a generic systems or OS concept rather than React's specific mount \u2192 update \u2192 unmount sequence for a single component instance.",
    hints: [
      "In React, 'lifecycle' refers to the component's existence from mount through unmount, not the operating system or network stack.",
      "The correct option lists methods that are all defined on a class component and invoked by React's render pipeline at specific phases.",
      "The other options describe OS, network, or database concepts that have no part in React's rendering."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how `componentDidMount` starts the interval and `componentWillUnmount` clears it, preventing a timer leak if the component is removed.",
      language: "tsx",
      code: "class Timer extends React.Component {\n  state = { seconds: 0 };\n  interval: number;\n\n  componentDidMount() {\n    this.interval = window.setInterval(\n      () => this.setState({ seconds: this.state.seconds + 1 }),\n      1000\n    );\n  }\n\n  componentWillUnmount() {\n    window.clearInterval(this.interval);\n  }\n\n  render() {\n    return <span>{this.state.seconds}s</span>;\n  }\n}"
    }
  },
  {
    id: "react-explain-about-types-of-hooks-in-react",
    title: "Explain about types of Hooks in React.",
    prompt: "Explain about types of Hooks in React., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Built-in hooks grouped by capability (state, effects, refs, context, memoization) and user-defined custom hooks.",
        isCorrect: true,
        explanation: "Correct. React provides a fixed set of built-in hooks grouped by capability (state, effects, refs, context, memoization), and any function starting with `use` that composes them is a custom hook."
      },
      {
        id: "B",
        text: "Stateful hooks that persist data between renders and stateless hooks that execute once on mount.",
        isCorrect: false,
        explanation: "Tempting if you pattern-match \"hooks\" to OS-level device hooks, but React Hooks are JavaScript functions that manage component state and side effects; they have no relationship to USB ports, mouse drivers, or any hardware layer."
      },
      {
        id: "C",
        text: "Synchronous hooks that run during the render phase and asynchronous hooks that run after commit.",
        isCorrect: false,
        explanation: "This borrows the public/private vocabulary from access modifiers in other languages. React does not gate hooks by publishing status or licensing; a hook is either a built-in function exported by the `react` package or a user-defined function in your codebase."
      },
      {
        id: "D",
        text: "Component hooks that attach to specific DOM nodes and global hooks that manage app-wide state.",
        isCorrect: false,
        explanation: "This invents a sync/async split tied to markup and styling. Every React Hook is a JavaScript function called during the component's render or commit phase; they do not map to HTML tags or CSS classes."
      }
    ],
    correctAnswer: "A",
    explanation: "React ships a fixed set of built-in hooks, grouped by the capability they expose: state management (`useState`, `useReducer`), side effects (`useEffect`, `useLayoutEffect`), stable references (`useRef`), context consumption (`useContext`), and memoization (`useMemo`, `useCallback`). On top of that, any function whose name starts with `use` and that itself calls other hooks is a custom hook.\n\nIn practice the split matters because custom hooks are the composition unit. You call `useAuth` in three components instead of repeating `useState` plus `useEffect` for a token in each one. The `use` prefix is not just convention: ESLint's `react-hooks` plugin and React's own runtime rely on it to enforce the Rules of Hooks (call at top level, call only from components or other hooks).\n\nThe categories in the list are a teaching aid, not a runtime distinction. `useState` and `useEffect` both participate in the same render-and-commit cycle; they differ in what they store and when their callback fires. A custom hook adds no new capability \u2014 it is a named bundle of built-in hook calls, so its behavior is fully determined by the hooks inside it.",
    interviewLine: "React has a small fixed set of built-in hooks \u2014 `useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`, `useReducer`, `useLayoutEffect` \u2014 and everything else is a custom hook, which is just a named function starting with `use` that composes those built-ins to reuse stateful logic across components.",
    misconception: "The learner treats \"types of hooks\" as a runtime classification (synchronous vs asynchronous, public vs private) rather than a capability grouping of a small fixed API surface plus a naming convention for user-defined wrappers.",
    hints: [
      "Look at what the `react` package actually exports: a short list of functions, not categories like hardware or public/private.",
      "Ask whether the split is by capability (state, effects, refs, memoization) or by some runtime property like timing or access level.",
      "The `use` prefix on user-defined functions is the rule that separates built-in hooks from custom ones; it is not a licensing or protocol distinction."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `useLocalStorage` adds no new primitive \u2014 it is `useState` plus `useEffect` wrapped in a named function that starts with `use`.",
      language: "typescript",
      code: "function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = window.localStorage.getItem(key);\n    return stored !== null ? (JSON.parse(stored) as T) : initial;\n  });\n\n  useEffect(() => {\n    window.localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}"
    }
  },
  {
    id: "react-differentiate-react-hooks-vs-classes",
    title: "Differentiate React Hooks vs Classes.",
    prompt: "Differentiate React Hooks vs Classes., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "JavaScript classes are compiled to C++ by the browser engine, giving class components a measurable speed advantage over function components.",
        isCorrect: false,
        explanation: "Tempting if you equate ES6 `class` syntax with C++ or Java classes, but JavaScript classes are syntactic sugar over prototypes. The V8 engine executes both class components and function components as ordinary JavaScript objects; there is no compilation step to C++."
      },
      {
        id: "B",
        text: "Class components can issue asynchronous network requests in lifecycle methods, while Hooks are limited to synchronous, local computation.",
        isCorrect: false,
        explanation: "Tempting if you picture `useEffect` as a local-only utility, but a function component can call `fetch`, `axios`, or any async API inside an event handler or a `useEffect` callback. Both approaches can initiate and await network requests."
      },
      {
        id: "C",
        text: "Hooks let you extract stateful logic into reusable functions without `this` binding or HOC nesting, keeping components flat and composable.",
        isCorrect: true,
        explanation: "Correct. A custom hook is a plain function that calls other hooks; any component calls it and receives state and handlers. This avoids the `this`-binding pitfalls of class callbacks and the extra nesting layer that HOCs or render props introduce."
      },
      {
        id: "D",
        text: "Hooks can only store primitive numbers, whereas class state can hold strings, objects, and arrays of any shape.",
        isCorrect: false,
        explanation: "Tempting if your only `useState` example is a counter, but `useState` accepts any value: objects, arrays, functions, class instances. The generic signature `useState<T>(initial: T)` has no restriction on the type parameter."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct answer is C. Hooks let you call `useState`, `useEffect`, and other hooks inside a function component, and you can group those calls into a custom hook, which is just a function that calls other hooks. Any component that needs that logic calls the custom hook and receives the state and handlers back. No class, no `this`, no wrapper component.\n\nIn a class component, sharing the same stateful logic between two components means writing a higher-order component or a render prop, which adds a layer of nesting. Callbacks passed to children also need `.bind(this)` or an arrow-function class field, because a plain method loses its `this` reference. Hooks remove both problems: the logic lives in a flat function call, and closures capture the values they need.\n\nThe constraint to remember is the Rules of Hooks: you call them at the top level of the component or custom hook, unconditionally. You cannot call a hook inside an `if` or a loop. Class components still work in React 19, but new code defaults to function components with hooks because the reuse story is simpler.",
    interviewLine: "The key difference is reuse: with classes I wrap components in HOCs or use render props and fight `this` binding on every callback, but with hooks I extract the logic into a custom function and call it wherever I need it, keeping the component tree flat.",
    misconception: "Hooks are just a cosmetic shorthand that compiles to the same class under the hood, so the real difference between the two is speed or capability rather than the structure of reusable logic and `this` handling.",
    hints: [
      "Think about how you would share the same stateful logic between two components in each approach.",
      "In a class, what do you do to a callback you pass to a child so it still knows which instance it belongs to?",
      "Neither approach restricts what data types you can store, and neither is compiled to a lower-level language."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useDebounce` is a plain function that calls two hooks; the component just calls it and gets the value back, with no wrapper or `this` in sight.",
      language: "tsx",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debouncedQuery = useDebounce(query, 300);\n  // use debouncedQuery for the API call\n  return (\n    <input\n      value={query}\n      onChange={(e) => setQuery(e.target.value)}\n      placeholder=\"Search\u2026\"\n    />\n  );\n}"
    }
  },
  {
    id: "react-do-hooks-cover-all-the-functionalities-provided-by-the",
    title: "Do Hooks cover all the functionalities provided by the classes?",
    prompt: "Do Hooks cover all the functionalities provided by the classes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks have fully replaced all class features, including error boundaries, since React 15.",
        isCorrect: false,
        explanation: "Tempting if you conflate the long history of class components with the introduction of Hooks, but Hooks shipped in React 16.8, not 15, and no hook equivalent for `componentDidCatch` or `getDerivedStateFromError` exists in React 19."
      },
      {
        id: "B",
        text: "Hooks cannot interact with React Context or refs, limiting their utility.",
        isCorrect: false,
        explanation: "This reflects an assumption that Context and refs are tied to class internals, but `useContext` reads any context value and `useRef` creates a mutable ref, giving functional components the same capabilities as `this.context` and `this.refs`."
      },
      {
        id: "C",
        text: "Hooks cover most class use cases, but error boundaries still require class components.",
        isCorrect: true,
        explanation: "Correct. Every day-to-day class feature has a hook counterpart; the only remaining gap is the Error Boundary pair and the almost-never-used `getSnapshotBeforeUpdate`."
      },
      {
        id: "D",
        text: "Hooks only handle a small fraction of class features and cannot manage state updates.",
        isCorrect: false,
        explanation: "This underestimates the API surface; `useState` and `useReducer` fully replace `this.state` and `this.setState`, and `useEffect` replaces the mount, update, and unmount lifecycle trio."
      }
    ],
    correctAnswer: "C",
    explanation: "Hooks (introduced in React 16.8) provide functional equivalents for every class feature you use in day-to-day code: `useState` and `useReducer` replace `this.state` and `this.setState`, `useEffect` replaces the mount/update/unmount trio, `useContext` replaces `this.context`, and `useRef` replaces `this.refs`. The only class methods with no hook equivalent are the Error Boundary pair, `componentDidCatch` and `getDerivedStateFromError`, plus the almost-never-used `getSnapshotBeforeUpdate`.\n\nIn practice this means you write every component as a function except for the one wrapper that catches a render error thrown by a child and shows a fallback UI. That wrapper is a short class, and it is the only place `class` still appears in a modern codebase.\n\nAn interviewer will likely follow up by asking whether you could simulate an error boundary with a hook. You cannot: `componentDidCatch` fires synchronously during the commit phase when a child throws during render, and no hook can intercept that error before it propagates up the tree. The class boundary is the only mechanism React provides to stop the error from unmounting the whole tree.",
    interviewLine: "Hooks replace state, lifecycle, context, and refs, so I write every component as a function except for the one case where I need an error boundary, which still requires a class with `componentDidCatch`.",
    misconception: "Assuming that because Hooks are newer, they are a limited subset of class capabilities, or conversely that they already replicate every class method including error handling.",
    hints: [
      "List the class features you use daily: state, lifecycle, context, refs. Now ask which hook maps to each.",
      "The gap is not in state or effects; it is in catching a render error thrown by a child component.",
      "`getSnapshotBeforeUpdate` is also class-only, but in practice the Error Boundary pair is the one you will actually hit."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "The class exists solely to catch render errors from children; the rest of the component tree is plain functions with hooks.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nclass ErrorBoundary extends React.Component<\n  { children: React.ReactNode },\n  { hasError: boolean }\n> {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(e: Error) { console.error(e.message); }\n  render() { return this.state.hasError ? <div>Something went wrong</div> : this.props.children; }\n}\n\nfunction Dashboard() {\n  const [items, setItems] = useState<string[]>([]);\n  useEffect(() => { fetch(\"/api/items\").then(r => r.json()).then(setItems); }, []);\n  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;\n}"
    }
  },
  {
    id: "react-can-react-hook-replaces-redux",
    title: "Can React Hook replaces Redux?",
    prompt: "Can React Hook replaces Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useState` cannot store objects or arrays, forcing teams to use Redux for any complex state.",
        isCorrect: false,
        explanation: "Tempting if you picture `useState` as a single-value cell, but it accepts any JavaScript value, including nested objects and arrays, exactly like a Redux store's state. The pressure that pushes teams toward Redux is re-render granularity across many components, not the data type the hook can hold."
      },
      {
        id: "B",
        text: "Context API is 100x faster than Redux under high-frequency updates without selectors.",
        isCorrect: false,
        explanation: "Tempting if you assume the built-in API must outperform a third-party library, but an unoptimised Context provider re-renders every consumer on each update, while Redux's `useSelector` lets each component subscribe to only the slice it reads, avoiding most of those re-renders."
      },
      {
        id: "C",
        text: "For moderate complexity, `useReducer` and `useContext` handle global state, but Redux adds devtools, middleware, and selector optimizations for large apps.",
        isCorrect: true,
        explanation: "Correct. `useReducer` + `useContext` covers the core state-management job for moderate apps, while Redux adds the tooling layer\u2014devtools, middleware, selector-based subscriptions\u2014that keeps large codebases debuggable and performant."
      },
      {
        id: "D",
        text: "React Hooks immediately delete Redux from the npm registry upon installation.",
        isCorrect: false,
        explanation: "No installation of any package modifies the npm registry. In practice, React and Redux coexist: the `react-redux` package exposes `useSelector` and `useDispatch`, which are themselves React hooks wrapping a Redux store."
      }
    ],
    correctAnswer: "C",
    explanation: "`useReducer` gives you a pure state-transition function and `useContext` lets you share that state across the tree, so for a moderate number of components and a handful of state slices the pair covers what a single Redux store would do. Redux layers on top of that same reducer pattern: time-travel devtools, middleware for async side-effects (thunk, saga), and `useSelector`, which lets each component subscribe to a narrow slice instead of the whole store.\n\nThe practical difference shows up in re-render cost. A Context provider re-renders every consumer whenever its value changes, so a single `theme` update forces all 200 consumers to re-render. With Redux, `useSelector` compares only the slice a component reads, so the 198 components that do not touch `theme` stay untouched.\n\nThe boundary is not simply \"small app vs large app.\" A ten-component form with undo, redo, and optimistic server responses is a good fit for `useReducer` plus an effect for the async work, but a 300-component dashboard with cross-feature selectors and time-travel debugging is where Redux Toolkit's tooling earns its bundle size.",
    interviewLine: "I'd reach for `useReducer` and `useContext` first; the moment I need selector-based subscriptions so that 200 components don't all re-render on one state change, or I want time-travel debugging and middleware for async flows, I'd bring in Redux Toolkit.",
    misconception: "The belief that hooks either fully replace Redux or cannot handle shared state at all, when the real distinction is about re-render granularity, devtooling, and scale rather than the ability to store and transition state.",
    hints: [
      "Ask whether the question is about storing state or about how many components re-render when that state changes.",
      "Both `useReducer` and Redux use a reducer function; the difference is what wraps around that reducer.",
      "Think about what happens to 200 consumers of a single Context provider versus 200 components each calling `useSelector` with a different slice."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that every consumer of Ctx re-renders whenever any part of state changes, which is the cost Redux's useSelector avoids by subscribing to a slice.",
      language: "tsx",
      code: "import React, { createContext, useContext, useReducer } from \"react\";\n\ntype State = { cart: string[]; user: string | null };\ntype Action = { type: \"ADD\"; item: string } | { type: \"LOGIN\"; name: string };\n\nfunction reducer(s: State, a: Action): State {\n  if (a.type === \"ADD\") return { ...s, cart: [...s.cart, a.item] };\n  if (a.type === \"LOGIN\") return { ...s, user: a.name };\n  return s;\n}\n\nconst Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(null!);\n\nfunction Provider({ children }: { children: React.ReactNode }) {\n  const [state, dispatch] = useReducer(reducer, { cart: [], user: null });\n  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;\n}\n\nfunction CartBadge() {\n  const { state } = useContext(Ctx);\n  return <span>{state.cart.length}</span>;\n}"
    }
  },
  {
    id: "react-how-do-you-manage-global-state-compare-context-redux-an",
    title: "How do you manage global state? Compare Context, Redux, and modern alternatives.",
    prompt: "How do you manage global state? Compare Context, Redux, and modern alternatives.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Route every transient UI signal\u2014keystrokes, hover states, focus tracking\u2014through a single global Redux store so all components subscribe to one slice.",
        isCorrect: false,
        explanation: "Tempting if you equate 'shared across components' with 'needs a global store,' but keystrokes and hovers are local to the input or button. Forcing them through a provider means every subscribing component re-renders on each event, and you gain no cross-component benefit."
      },
      {
        id: "B",
        text: "Subscribe a single React Context to a 60 Hz WebSocket price feed so every ticker component reads the latest value directly from the context value.",
        isCorrect: false,
        explanation: "Tempting because Context is the built-in way to share data, but without a selector layer every consumer re-renders on every value change. At 60 updates per second the entire consumer tree re-renders 60 times per second, dropping frames. A Zustand or Redux store with per-component selectors limits re-renders to the slice each component actually reads."
      },
      {
        id: "C",
        text: "Match the tool to the scope: useState for component-local UI, Context for low-frequency app-wide values like theme and auth, Zustand or Redux with selectors for complex client state, and React Query or SWR for server caches.",
        isCorrect: true,
        explanation: "Correct. Each layer solves a different re-render or data-lifecycle problem, and choosing by scope avoids both under-engineering (Context for 60 Hz feeds) and over-engineering (Redux for a theme toggle)."
      },
      {
        id: "D",
        text: "Avoid all global state in modern React applications; every piece of data should live in the component that renders it.",
        isCorrect: false,
        explanation: "Tempting if you internalise 'lift state up' as 'keep state local,' but auth tokens, shopping carts, and theme preferences are inherently cross-cutting. Forcing them into a single component's useState either breaks the app or requires prop-drilling through every intermediate layer."
      }
    ],
    correctAnswer: "C",
    explanation: "State management in React is a scope decision, not a single-tool decision. useState handles component-local state. Context provides app-wide access but re-renders every consumer when the value's identity changes. Zustand and Redux add selector subscriptions, so a component re-renders only when the slice it selects changes. React Query and SWR add server-state semantics: caching, request deduplication, and background revalidation.\n\nPutting a 60 Hz WebSocket price feed into Context means every consumer re-renders on every tick. Moving that value into a Zustand store with per-component selectors limits re-renders to the slice each component actually reads. The opposite mistake is equally common: wrapping a one-time auth token in Redux adds a provider, middleware, and devtools for something Context handles in two lines.\n\nThe boundary between client state and server state is where most production bugs hide. A shopping cart that syncs to a backend is server state; React Query owns the cache, invalidation, and concurrent-mutation queue. The local 'Adding\u2026' spinner is client state. Mixing both into one Redux store means hand-rolling revalidation and stale-while-revalidate logic that a server-state library already provides.",
    interviewLine: "I treat state as a scope decision: local UI stays in useState, low-frequency cross-cutting values go in Context, complex client state with many interacting slices goes in Zustand or Redux with selector subscriptions, and anything that originates from a server goes in React Query so I get caching, deduplication, and revalidation for free.",
    misconception: "If a value is shared across components it must live in a global store, and if a state library exists it must replace every other mechanism for managing data.",
    hints: [
      "Ask what re-renders when the value changes: a single component, every consumer, or only the components that select that slice.",
      "Context has no selector API\u2014every consumer re-renders on every value change\u2014so the frequency of updates determines whether it is the right layer.",
      "Server data has a lifecycle (fetch, cache, invalidate, refetch) that a plain client store does not model; that is a separate concern from local UI state."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Each component selects only the slice it reads, so updating items re-renders Total but not AddButton.",
      language: "tsx",
      code: "import { create } from \"zustand\";\n\nconst useCart = create<{\n  items: { id: string; qty: number }[];\n  add: (id: string) => void;\n}>((set) => ({\n  items: [],\n  add: (id) =>\n    set((s) => ({\n      items: [...s.items, { id, qty: 1 }],\n    })),\n}));\n\nfunction Total() {\n  const items = useCart((s) => s.items);\n  return <span>{items.length} items</span>;\n}\n\nfunction AddButton({ id }: { id: string }) {\n  const add = useCart((s) => s.add);\n  return <button onClick={() => add(id)}>Add</button>;\n}"
    }
  },
  {
    id: "react-what-is-usereducer-and-when-would-you-use-it-over-usest",
    title: "What is useReducer, and when would you use it over useState?",
    prompt: "What is useReducer, and when would you use it over useState?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "setCount(count + 1);\n\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n\nfunction reducer(state, action) {\n  if (action.type === \"increment\") {\n    return { count: state.count + 1 };\n  }\n  return state;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useReducer` is used strictly to reduce the file size of JavaScript bundles by eliminating redundant state code.",
        isCorrect: false,
        explanation: "Tempting if you hear \"reducer\" and think of tree-shaking or minification, but the hook only governs how a component computes its next state from an action; it has no effect on what the bundler includes in the output."
      },
      {
        id: "B",
        text: "`useState` cannot store boolean values, so every flag in a component must be managed through `useReducer`.",
        isCorrect: false,
        explanation: "This inverts the API: `useState` stores any value, including booleans, numbers, and objects. `useReducer` is an organizational tool for complex transitions, not a workaround for a type limitation that does not exist."
      },
      {
        id: "C",
        text: "`useReducer` manages interdependent state through a `(state, action) => newState` reducer, keeping transitions atomic and testable.",
        isCorrect: true,
        explanation: "Correct. The reducer centralises every state transition in one pure function, so interdependent fields update atomically and each change is a named, testable action."
      },
      {
        id: "D",
        text: "`useReducer` is deprecated in React 19 in favor of writing raw mutable assignments directly to `this.state`.",
        isCorrect: false,
        explanation: "Mixes up the modern hooks API with the legacy class-component pattern. `useReducer` is a first-class hook in React 19, and `this.state` mutation is the anti-pattern the hook was designed to replace."
      }
    ],
    correctAnswer: "C",
    explanation: "useReducer takes a reducer function with the signature (state, action) => newState and an initial state, and returns a [state, dispatch] pair. When you call dispatch with an action object, React invokes the reducer with the current state and that action, then stores the returned value as the new state for the next render.\n\nThis matters when state has multiple fields that must change together. A shopping cart holding items, subtotal, and discount is one reducer; three separate useState calls are three independent setters that can leave the cart in an inconsistent state mid-update. The reducer guarantees every transition is a single, named operation, and all the logic lives in one pure function you can unit-test without rendering a component.\n\nAn interviewer will likely probe whether useReducer reduces re-renders. It does not: every dispatch still schedules a re-render exactly like setState. The payoff is testability and a single place to audit every state transition, not a performance win. For a lone boolean or a simple counter, useState remains the lighter-weight choice.",
    interviewLine: "I reach for useReducer when state has interdependent fields\u2014like a cart with items, subtotal, and discount\u2014because a single reducer keeps every transition atomic and testable, whereas three separate useState setters can leave the object in an inconsistent state mid-update.",
    misconception: "Treating useReducer as a performance optimisation that cuts re-renders, when in reality every dispatch triggers a re-render just like setState; its value is centralising and making state transitions testable, not skipping renders.",
    hints: [
      "Look at the reducer signature: it receives the full current state and an action, then returns the entire next state.",
      "Ask yourself: does every field that changes need to change together, or are they truly independent?",
      "The hook is not a re-render optimisation; every dispatch still triggers a render, same as setState."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState",
    example: {
      caption: "Notice how one dispatch updates three fields atomically, and the reducer is a pure function you can test in isolation.",
      language: "typescript",
      code: "type CartState = { items: string[]; subtotal: number; discount: number };\n\nfunction cartReducer(state: CartState, action: { type: string; item?: string; price?: number }): CartState {\n  switch (action.type) {\n    case \"ADD_ITEM\":\n      return {\n        ...state,\n        items: [...state.items, action.item!],\n        subtotal: state.subtotal + action.price!,\n      };\n    case \"APPLY_DISCOUNT\":\n      return { ...state, discount: Math.round(state.subtotal * 0.1) };\n    default:\n      return state;\n  }\n}\n\nconst [cart, dispatch] = useReducer(cartReducer, { items: [], subtotal: 0, discount: 0 });\n\ndispatch({ type: \"ADD_ITEM\", item: \"Widget\", price: 25 });\ndispatch({ type: \"APPLY_DISCOUNT\" });"
    }
  },
  {
    id: "react-useeffect-runs-after-the-browser-has-painted-the-update",
    title: "useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background.",
    prompt: "useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "useEffect(() => {\n  console.log(\"runs after paint\");\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useEffect` blocks the browser paint synchronously until all internal network promises resolve.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'runs after paint' with 'waits for the network', but `useEffect` is scheduled asynchronously and never holds the frame open. There is no built-in mechanism that blocks paint until promises settle."
      },
      {
        id: "B",
        text: "`useEffect` runs inside the browser GPU shader compiler.",
        isCorrect: false,
        explanation: "This mistakes 'after paint' for 'inside the rendering pipeline'. `useEffect` callbacks run on the JavaScript event loop as a low-priority task; they have no access to the GPU or the shader compilation stage."
      },
      {
        id: "C",
        text: "`useEffect` executes only once when the user closes their browser window tab.",
        isCorrect: false,
        explanation: "This reads the effect as a teardown-only hook, but `useEffect` fires after every mount and after every re-render whose dependency array changes. Window close triggers the cleanup function, not the effect body itself."
      },
      {
        id: "D",
        text: "`useEffect` is deferred until after browser layout and paint, so side effects like API calls and logging do not block the UI update.",
        isCorrect: true,
        explanation: "Correct. React schedules `useEffect` at a low priority so the browser finishes layout and paint first, keeping the frame responsive while side effects run in the background."
      }
    ],
    correctAnswer: "D",
    explanation: "Correct. When React commits a render it first mutates the DOM, then the browser performs layout and paint. `useEffect` callbacks are scheduled asynchronously by React's internal scheduler at a low priority, so they execute only after the browser has finished painting the new UI. This is the key difference from `useLayoutEffect`, which runs synchronously after DOM mutations but before the browser paints.\n\nIn practice this means the user sees the updated screen immediately. If you put a `fetch` call, a `console.log`, or a subscription setup inside `useEffect`, none of that work delays the paint. The user never sees a blank or stale frame while the effect runs. If you instead need to measure a DOM node and adjust its style in the same frame\u2014for example, preventing a flash of mispositioned content\u2014you would reach for `useLayoutEffect` because it blocks paint until the measurement is done.\n\nOne nuance an interviewer may probe: React batches multiple `useEffect` calls within the same commit and runs them in declaration order. The cleanup function of a previous effect runs before the next effect fires, so you can safely tear down a subscription and open a new one in the same render cycle without a gap.",
    interviewLine: "`useEffect` is scheduled at a low priority by React's internal scheduler, so the browser gets to finish layout and paint before the callback runs; that is why I put non-visual work like fetches in `useEffect` and reserve `useLayoutEffect` for adjustments that must land before the user sees the frame.",
    misconception: "Treating `useEffect` and `useLayoutEffect` as interchangeable, or reading 'after paint' to mean the effect is a stage inside the browser's rendering pipeline rather than a JavaScript task scheduled after it.",
    hints: [
      "React commits DOM mutations first, then the browser paints; ask where in that sequence `useEffect` fires relative to the paint.",
      "Compare `useEffect` with `useLayoutEffect`: one blocks the paint, the other does not. Which is which?",
      "The effect body is a JavaScript callback on the event loop, not a stage inside the browser's rendering or GPU pipeline."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "The 'Loading\u2026' text is painted to the screen before the `fetch` inside the effect even starts, so the user sees the spinner immediately.",
      language: "tsx",
      code: "function UserCard({ id }: { id: string }) {\n  const [user, setUser] = useState<{ name: string } | null>(null);\n\n  // Painted first: the user sees \"Loading\u2026\" right away.\n  // The fetch starts only after that paint is committed.\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch(`/api/users/${id}`, { signal: controller.signal })\n      .then((res) => res.json())\n      .then(setUser)\n      .catch(() => {});\n    return () => controller.abort();\n  }, [id]);\n\n  return user ? <span>{user.name}</span> : <span>Loading\u2026</span>;\n}"
    }
  },
  {
    id: "react-what-is-the-difference-between-reacts-class-components",
    title: "What is the difference between React's class components and functional components?",
    prompt: "What is the difference between React's class components and functional components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Class components are automatically converted to WebAssembly by the browser engine.",
        isCorrect: false,
        explanation: "Both execute in standard JavaScript engines."
      },
      {
        id: "B",
        text: "Class components extend `React.Component` and use `this.state` and lifecycle methods; Function components are plain functions using Hooks, offering simpler syntax and better composition.",
        isCorrect: true,
        explanation: "Correct. Function components with Hooks are the modern standard, avoiding `this` binding issues and class lifecycle fragmentation."
      },
      {
        id: "C",
        text: "Class components render on the server; function components can only render in the browser.",
        isCorrect: false,
        explanation: "Both can be rendered on the server (SSR) and in the browser."
      },
      {
        id: "D",
        text: "Function components cannot manage state or run side effects.",
        isCorrect: false,
        explanation: "React 16.8 introduced Hooks (`useState`, `useEffect`), giving function components full state and effect capabilities."
      }
    ],
    correctAnswer: "B",
    explanation: "Class components are ES6 classes that extend React.Component and rely on lifecycle methods (componentDidMount, componentDidUpdate, etc.) and this.state. Function components are plain functions that take props as input and return JSX, and use hooks (useState, useEffect, useRef, etc.) for state and side effects. Since hooks landed in React 16.8, function components are the default for new code; class components are kept for backward compatibility and are no longer the recommended pattern.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React's class components and functional components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React's class components and functional components?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-are-stateless-components",
    title: "What are stateless components?",
    prompt: "What are stateless components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "function StatelessComponent({ message }) {  return <div>{message}</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that are prohibited from rendering any HTML markup or text.",
        isCorrect: false,
        explanation: "Stateless components render HTML markup and UI based on their props."
      },
      {
        id: "B",
        text: "Components (typically simple function components) that do not hold or manage internal state, purely deriving their rendered output from incoming props.",
        isCorrect: true,
        explanation: "Correct. Stateless components focus on presentation: given the same props, they deterministically render the same UI without local state mutations."
      },
      {
        id: "C",
        text: "Components that must be declared in separate `.stateless` files.",
        isCorrect: false,
        explanation: "Stateless components are standard JavaScript/TypeScript functions in `.jsx`/`.tsx` files."
      },
      {
        id: "D",
        text: "Components that crash if rendered in modern web browsers.",
        isCorrect: false,
        explanation: "Stateless components are the most common, lightweight component pattern in React."
      }
    ],
    correctAnswer: "B",
    explanation: "Stateless components in React are components that do not manage or hold any internal state. They simply receive data via props and render UI based on that data. These components are often functional components and are used for presentational purposes. Key points: Do not use this.state Render UI based on props Focused on displaying information, not managing behavior Stateless components are simpler, easier to test, and often more reusable. With the introduction of hooks, React components are mostly written using functions and can contain state via the useState hook.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are stateless components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are stateless components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-stateful-components",
    title: "What are stateful components?",
    prompt: "What are stateful components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "function StatefulComponent() {  const [count, setCount] = React.useState(0);\n  return (    <div>      <p>{count}</p>      <button onClick={() => setCount(count + 1)}>Increment</button>    </div>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that store data in the user's permanent browser cookie cache.",
        isCorrect: false,
        explanation: "Stateful components maintain in-memory state during their active lifecycle in the React tree."
      },
      {
        id: "B",
        text: "Components that maintain and manage their own internal state (via `useState`/`useReducer` or `this.state`), re-rendering when their state changes.",
        isCorrect: true,
        explanation: "Correct. Stateful components track dynamic data across user interactions, timers, or network responses, managing state transitions internally."
      },
      {
        id: "C",
        text: "Components that only execute once when the server boots up.",
        isCorrect: false,
        explanation: "Stateful components update and re-render dynamically throughout the client application lifecycle."
      },
      {
        id: "D",
        text: "Components that cannot receive props from parent components.",
        isCorrect: false,
        explanation: "Stateful components frequently receive props from parents while managing their own private state."
      }
    ],
    correctAnswer: "B",
    explanation: "Stateful components in React are components that manage and hold their own internal state. They can modify their state in response to user interactions or other events and re-render themselves when the state changes. Key points: Use this.state (in class components) or useState (in functional components) Can update state using event handlers or lifecycle methods Handle logic and data management Stateful components are essential for handling dynamic and interactive UIs.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are stateful components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are stateful components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-benefits-of-using-hooks-in-react",
    title: "What are the benefits of using hooks in React?",
    prompt: "What are the benefits of using hooks in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks enable state and lifecycle logic reuse without class inheritance, eliminate `this` binding confusion, organize related logic together, and produce flatter component trees.",
        isCorrect: true,
        explanation: "Correct. Hooks replace complex class lifecycles and wrapper-heavy HOCs/render props with composable, extractable functions."
      },
      {
        id: "B",
        text: "Hooks completely eliminate the need for writing JavaScript code.",
        isCorrect: false,
        explanation: "Hooks are written in standard JavaScript/TypeScript."
      },
      {
        id: "C",
        text: "Hooks make all network requests download in 0 milliseconds.",
        isCorrect: false,
        explanation: "Hooks manage stateful logic; they do not alter physical network bandwidth or latency."
      },
      {
        id: "D",
        text: "Hooks allow running React components directly in raw HTML without a browser engine.",
        isCorrect: false,
        explanation: "Hooks run in standard JavaScript environments within browser or Node.js runtimes."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks enable the use of state and other React features in functional components, replacing the need for class components. They streamline code by reducing the reliance on lifecycle methods, enhance readability, and facilitate the reuse of stateful logic across components. Popular hooks like useState and useEffect are used for managing state and side effects. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of using hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of using hooks in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-rules-of-react-hooks",
    title: "What are the rules of React hooks?",
    prompt: "What are the rules of React hooks?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A single component can never call more than two hooks in total.",
        isCorrect: false,
        explanation: "Components can call any number of hooks as long as the call order is unconditional and stable."
      },
      {
        id: "B",
        text: "Hooks must always be executed inside `try/catch` blocks.",
        isCorrect: false,
        explanation: "Wrapping hooks in `try/catch` or conditional blocks violates the constant call order rule."
      },
      {
        id: "C",
        text: "1) Only call hooks at the top level (never in loops, conditions, or nested functions); 2) Only call hooks from React function components or custom hooks.",
        isCorrect: true,
        explanation: "Correct. These rules guarantee that React preserves hook state correctly across renders by maintaining a constant, deterministic hook invocation order."
      },
      {
        id: "D",
        text: "Hooks must be declared inside separate `.hook` files compiled by SWC.",
        isCorrect: false,
        explanation: "Hooks are standard JavaScript functions declared in standard module files."
      }
    ],
    correctAnswer: "C",
    explanation: "React hooks should be called at the top level of a function, not inside loops, conditions, or nested functions. They must only be used within React function components or custom hooks. These guidelines ensure proper state management and lifecycle behavior. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules of React hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules of React hooks?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-useeffect-and-uselayoute-2",
    title: "What is the difference between useEffect and useLayoutEffect in React?",
    prompt: "What is the difference between useEffect and useLayoutEffect in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React, { useEffect, useLayoutEffect, useRef } from 'react';\nfunction Example() {  const ref = useRef();\n  useEffect(() => {    console.log('useEffect: Runs after DOM paint');  });\n  useLayoutEffect(() => {    console.log('useLayoutEffect: Runs before DOM paint');    console.log('Element width:', ref.current.offsetWidth);  });\n  return <div ref={ref}>Hello</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`useEffect` runs asynchronously after the browser paints the screen; `useLayoutEffect` runs synchronously immediately after DOM mutations before browser paint, preventing visual flicker.",
        isCorrect: true,
        explanation: "Correct. `useLayoutEffect` blocks painting so DOM measurements and synchronized layout adjustments happen before the frame is shown; `useEffect` is non-blocking."
      },
      {
        id: "B",
        text: "`useEffect` is only for class components; `useLayoutEffect` is only for functional components.",
        isCorrect: false,
        explanation: "Both are React Hooks and only work in functional components or custom hooks."
      },
      {
        id: "C",
        text: "`useLayoutEffect` runs 10 seconds after `useEffect`.",
        isCorrect: false,
        explanation: "`useLayoutEffect` runs first, synchronously before the paint; `useEffect` fires after the paint."
      },
      {
        id: "D",
        text: "`useEffect` runs on the GPU, while `useLayoutEffect` runs on the CPU.",
        isCorrect: false,
        explanation: "Both execute in JavaScript on the CPU."
      }
    ],
    correctAnswer: "A",
    explanation: "useEffect and useLayoutEffect both handle side effects in React functional components but differ in when they run: useEffect runs asynchronously after the DOM has rendered, making it suitable for tasks like data fetching or subscriptions. useLayoutEffect runs synchronously after DOM updates but before the browser paints, ideal for tasks like measuring DOM elements or aligning the UI with the DOM. Example: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between useEffect and useLayoutEffect in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between useEffect and useLayoutEffect in React?.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-what-does-the-dependency-array-of-useeffect-affect",
    title: "What does the dependency array of useEffect affect?",
    prompt: "What does the dependency array of useEffect affect?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Forces the effect to run in parallel Web Workers on background threads.",
        isCorrect: false,
        explanation: "Effects run on the main JavaScript thread after render."
      },
      {
        id: "B",
        text: "Controls the size of the JavaScript bundle downloaded from the CDN.",
        isCorrect: false,
        explanation: "The dependency array is a runtime execution control array, not a bundler configuration."
      },
      {
        id: "C",
        text: "Encrypts the effect function with AES-256 before running.",
        isCorrect: false,
        explanation: "The dependency array has nothing to do with encryption."
      },
      {
        id: "D",
        text: "Controls when the effect re-runs: omitted runs on every render, empty array `[]` runs only on mount/unmount, and listed dependencies re-run only when those values change referentially.",
        isCorrect: true,
        explanation: "Correct. React performs shallow comparisons (`Object.is`) on dependency array values to decide whether to skip executing the effect callback and its cleanup."
      }
    ],
    correctAnswer: "D",
    explanation: "The dependency array of useEffect controls when the effect re-runs: If it's empty, the effect runs only once after the initial render. If it contains variables, the effect re-runs whenever any of those variables change. If omitted, the effect runs after every render. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does the dependency array of useEffect affect?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does the dependency array of useEffect affect?.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-what-is-the-useref-hook-in-react-and-when-should-it-be",
    title: "What is the useRef hook in React and when should it be used?",
    prompt: "What is the useRef hook in React and when should it be used?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import React, { useRef, useEffect } from 'react';\nfunction TextInputWithFocusButton() {  const inputEl = useRef(null);  useEffect(() => {    inputEl.current.focus();  }, []);  return <input ref={inputEl} type=\"text\" />;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A hook that replaces `useState` for all dynamic form inputs that update the screen.",
        isCorrect: false,
        explanation: "If changes need to be reflected visually on screen, `useState` is required."
      },
      {
        id: "B",
        text: "A hook that forces the entire component tree to re-render whenever `.current` is modified.",
        isCorrect: false,
        explanation: "Mutating `ref.current` is intentionally silent and does not trigger re-renders."
      },
      {
        id: "C",
        text: "Returns a mutable object `{ current: value }` that persists across renders without triggering a re-render when mutated; used for DOM node access, timers, and previous values.",
        isCorrect: true,
        explanation: "Correct. `useRef` stores mutable instance data that survives re-renders silently, making it ideal for DOM access, interval IDs, and keeping mutable references."
      },
      {
        id: "D",
        text: "A hook used exclusively for executing SQL database migrations in client browsers.",
        isCorrect: false,
        explanation: "`useRef` is an in-memory reference object, not a database migration tool."
      }
    ],
    correctAnswer: "C",
    explanation: "The useRef hook creates a mutable object that persists through renders, allowing direct access to DOM elements, storing mutable values without causing re-renders, and maintaining references to values. For instance, useRef can be utilized to focus on an input element: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useRef hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useRef hook in React and when should it be used?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-what-is-the-purpose-of-callback-function-argument-forma",
    title: "What is the purpose of callback function argument format of setState() in React class components and when should it be used?",
    prompt: "What is the purpose of callback function argument format of setState() in React class components and when should it be used?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "this.setState((prevState, props) => ({  counter: prevState.counter + props.increment,}));\n\nconst [counter, setCounter] = useState(0);setCounter((prev) => prev + props.increment);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Converts the state variable from a number into an encrypted string.",
        isCorrect: false,
        explanation: "Updater functions compute and return the new state value."
      },
      {
        id: "B",
        text: "Allows the state update to execute on a separate remote server over WebSockets.",
        isCorrect: false,
        explanation: "The updater callback runs locally and synchronously in React's state queue."
      },
      {
        id: "C",
        text: "Permanently saves the previous state value to browser `localStorage`.",
        isCorrect: false,
        explanation: "Updater functions operate in memory during React reconciliation."
      },
      {
        id: "D",
        text: "Ensures state updates receive the latest, pending state value `setCount(prev => prev + 1)` when updates depend on previous state, avoiding stale closure issues during batched updates.",
        isCorrect: true,
        explanation: "Correct. Passing an updater function guarantees access to the most up-to-date state even when multiple updates are queued in the same event loop tick."
      }
    ],
    correctAnswer: "D",
    explanation: "This applies to class components, which are no longer the recommended pattern. The function-component equivalent (the updater form of useState) is shown at the end. The callback (updater) form of setState() ensures state updates are based on the most current state and props. This matters when the new state depends on the previous state, because React may batch multiple updates and the this.state you'd read directly could be stale. The function-component equivalent uses the updater form of useState: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of callback function argument format of setState() in React class components and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of callback function argument format of setState() in React class components and when should it be used?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-is-the-usereducer-hook-in-react-and-when-should-it",
    title: "What is the useReducer hook in React and when should it be used?",
    prompt: "What is the useReducer hook in React and when should it be used?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "const [state, dispatch] = useReducer(reducer, initialState);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An alternative to `useState` for managing complex state transitions via a reducer function `(state, action) => newState`, decoupling action dispatching from state logic.",
        isCorrect: true,
        explanation: "Correct. `useReducer` centralizes complex state transitions into a predictable, action-driven flow, especially when state fields are interdependent."
      },
      {
        id: "B",
        text: "A hook that converts class components into functional components automatically.",
        isCorrect: false,
        explanation: "`useReducer` is a standard state hook, not a code refactoring tool."
      },
      {
        id: "C",
        text: "A hook used exclusively for executing GraphQL mutations across HTTP networks.",
        isCorrect: false,
        explanation: "`useReducer` is a local React state primitive, not a GraphQL network client."
      },
      {
        id: "D",
        text: "A hook that reduces the size of JavaScript bundles by minifying code at runtime.",
        isCorrect: false,
        explanation: "`useReducer` manages component state logic, not bundle minification."
      }
    ],
    correctAnswer: "A",
    explanation: "The useReducer hook manages complex state logic in functional components, serving as an alternative to useState. It's ideal when state has multiple fields (and there are constraints around how they should be mutated), or when the next state relies on the previous one. The useReducer hook accepts a reducer function + an initial state. The reducer function is passed the current state and action and returns a new state. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useReducer hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useReducer hook in React and when should it be used?.",
    hints: [
      "Reach for a reducer when the next state depends on several fields at once, so the transitions live in one place instead of across many setters."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useReducer"
  },
  {
    id: "react-what-is-the-useid-hook-in-react-and-when-should-it-be-u",
    title: "What is the useId hook in React and when should it be used?",
    prompt: "What is the useId hook in React and when should it be used?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import { useId } from 'react';\nfunction MyComponent() {  const id = useId();\n  return (    <div>      <label htmlFor={id}>Name:</label>      <input id={id} type=\"text\" />    </div>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Generates unique, stable IDs across client and server renders, ensuring consistent accessible HTML attributes (`htmlFor`, `aria-describedby`) and preventing hydration mismatches.",
        isCorrect: true,
        explanation: "Correct. `useId()` creates unique IDs that remain stable across server rendering and client hydration, crucial for accessible form label associations."
      },
      {
        id: "B",
        text: "Authenticates user session tokens with biometric fingerprint hardware.",
        isCorrect: false,
        explanation: "`useId` generates DOM string IDs, unrelated to biometric authentication."
      },
      {
        id: "C",
        text: "Generates random cryptographic encryption keys for HTTPS requests.",
        isCorrect: false,
        explanation: "`useId` is for UI element accessibility IDs, not cryptography."
      },
      {
        id: "D",
        text: "Generates unique UUID primary keys for inserting rows into backend SQL databases.",
        isCorrect: false,
        explanation: "`useId` is designed for HTML accessibility element IDs, not database primary keys."
      }
    ],
    correctAnswer: "A",
    explanation: "The useId hook generates unique IDs for elements within a component, which is crucial for accessibility by dynamically creating ids that can be used for linking form inputs and labels. It guarantees unique IDs across the application even if the component renders multiple times. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useId hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useId hook in React and when should it be used?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-some-react-anti-patterns",
    title: "What are some React anti-patterns?",
    prompt: "What are some React anti-patterns?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Directly mutating state, deriving state from props in `useEffect` instead of calculating during render, using array indices as list keys for dynamic lists, and calling hooks conditionally.",
        isCorrect: true,
        explanation: "Correct. Key anti-patterns include state mutation, unnecessary sync effects, unstable list keys, and violating the Rules of Hooks."
      },
      {
        id: "B",
        text: "Writing TypeScript types for component props and state.",
        isCorrect: false,
        explanation: "Static typing with TypeScript is an industry best practice."
      },
      {
        id: "C",
        text: "Using functional components instead of class components for all new features.",
        isCorrect: false,
        explanation: "Functional components with Hooks are the recommended modern best practice, not an anti-pattern."
      },
      {
        id: "D",
        text: "Splitting large monolithic components into smaller composable child components.",
        isCorrect: false,
        explanation: "Component decomposition is a core best practice that improves maintainability and performance."
      }
    ],
    correctAnswer: "A",
    explanation: "React anti-patterns are practices that can lead to inefficient or hard-to-maintain code. Common examples include: Directly mutating state instead of using the state setter Using useEffect to derive state from props (compute it during render instead) Putting data into state that you can compute from other state or props Not using keys in lists, or using the array index as a key for reorderable lists Effects with missing or stale dependencies Deeply nested state; prefer flat shapes with useReducer or a state library Reading or writing refs during render (do it in effects or event handlers) Using useState for values that don't drive rendering (use useRef instead) Calling hooks conditionally or inside loops (breaks the Rules of Hooks) The older class-component anti-patterns (using componentWillMount for data fetching or relying on componentWillReceiveProps) refer to APIs that were renamed to UNSAFE_* and no longer apply to function-component code. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are some React anti-patterns?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are some React anti-patterns?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-react-component-lifecycle-methods-in-class",
    title: "Explain the React component lifecycle methods in class components.",
    prompt: "Explain the React component lifecycle methods in class components., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "componentDidMount() {  console.log('Component mounted');}\n\ncomponentWillUnmount() {  console.log('Component will unmount');}\n\nuseEffect(  () => {    // componentDidMount + componentDidUpdate    console.log('Mounted or updated');    return () => {      // componentWillUnmount      console.log('Will unmount');    };  },  [    /* deps */  ],);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Lifecycle methods execute exclusively on backend Node.js servers during build time.",
        isCorrect: false,
        explanation: "Lifecycle methods execute during the component's runtime life inside the browser."
      },
      {
        id: "B",
        text: "Lifecycle methods are executed in random order determined by the operating system scheduler.",
        isCorrect: false,
        explanation: "Lifecycle methods follow a strict, deterministic sequence during mounting, updating, and unmounting."
      },
      {
        id: "C",
        text: "Class lifecycles include Mounting (`constructor`, `componentDidMount`), Updating (`shouldComponentUpdate`, `componentDidUpdate`), and Unmounting (`componentWillUnmount`), replaced by `useEffect` in functional components.",
        isCorrect: true,
        explanation: "Correct. Class components use distinct lifecycle methods for each phase; functional components consolidate these behaviors cleanly using `useEffect`."
      },
      {
        id: "D",
        text: "Methods that only execute when the user refreshes the browser tab.",
        isCorrect: false,
        explanation: "Lifecycle phases occur continuously as components mount, update, and unmount in the SPA."
      }
    ],
    correctAnswer: "C",
    explanation: "Class lifecycle methods only apply to class components, which are no longer the recommended pattern. The function-component equivalents (using useEffect) are shown at the end. React class components have lifecycle methods for different phases: Mounting: constructor: Initializes state or binds methods componentDidMount: Runs after the component mounts, useful for API calls or subscriptions Updating: shouldComponentUpdate: Determines if the component should re-render componentDidUpdate: Runs after updates, useful for side effects Unmounting: componentWillUnmount: Cleans up (e.g., removing event listeners). In function components, all of the above are expressed with useEffect:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the React component lifecycle methods in class components.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the React component lifecycle methods in class components.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-are-higher-order-components-in-react",
    title: "What are higher-order components in React?",
    prompt: "What are higher-order components in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate"
    ],
    codeSnippet: "const withExtraProps = (WrappedComponent) => {  return (props) => <WrappedComponent {...props} extraProp=\"value\" />;};\nconst EnhancedComponent = withExtraProps(MyComponent);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that must always be rendered at the root `<html>` tag.",
        isCorrect: false,
        explanation: "HOC is a functional abstraction pattern, not a DOM tree placement rule."
      },
      {
        id: "B",
        text: "Components that can only run inside background Web Worker threads.",
        isCorrect: false,
        explanation: "HOCs operate on standard React components in client and server environments."
      },
      {
        id: "C",
        text: "Components that compile directly to C++ machine instructions.",
        isCorrect: false,
        explanation: "HOCs are standard JavaScript functions that return React components."
      },
      {
        id: "D",
        text: "Functions that take a component and return a new enhanced component with added props or behavior (`(WrappedComponent) => EnhancedComponent`), largely superseded by custom hooks.",
        isCorrect: true,
        explanation: "Correct. HOCs were a primary pattern for logic reuse before Hooks; modern code generally prefers custom hooks to avoid wrapper nesting."
      }
    ],
    correctAnswer: "D",
    explanation: "Higher-order components (HOCs) are functions that take a component and return a new one with added props or behavior, facilitating logic reuse across components. HOCs were the dominant pattern for cross-cutting logic (auth, data fetching, theming) before hooks. Custom hooks cover almost all of those use cases now without the wrapper-component nesting. HOCs still appear in older codebases and some libraries (e.g., connect from react-redux), but new code should prefer a custom hook. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are higher-order components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are higher-order components in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-presentational-vs-container-component-patte",
    title: "Explain the presentational vs container component pattern in React",
    prompt: "Explain the presentational vs container component pattern in React, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate"
    ],
    codeSnippet: "// Container: handles state/datafunction UserListContainer() {  const [users, setUsers] = useState([]);  useEffect(() => {    fetchUsers().then(setUsers);  }, []);  return <UserList users={users} />;}\n// Presentational: pure renderingfunction UserList({ users }) {  return (    <ul>      {users.map((u) => (        <li key={u.id}>{u.name}</li>      ))}    </ul>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Presentational components are written in CSS, while Container components are written in SQL.",
        isCorrect: false,
        explanation: "Both are standard React JavaScript/TypeScript components."
      },
      {
        id: "B",
        text: "Presentational components run on the client, while Container components run in Docker on the server.",
        isCorrect: false,
        explanation: "This is a component architecture design pattern in React, not Docker server infrastructure."
      },
      {
        id: "C",
        text: "A pattern separating concerns: Presentational components handle UI styling and receive props; Container components handle state, data fetching, and business logic (now mostly replaced by custom hooks).",
        isCorrect: true,
        explanation: "Correct. This historical pattern separated visual presentation from stateful logic, though modern React typically uses custom hooks alongside UI components instead of wrapper containers."
      },
      {
        id: "D",
        text: "A mandatory rule enforced by the React compiler that throws syntax errors if violated.",
        isCorrect: false,
        explanation: "It is an optional architectural design convention, not a compiler requirement."
      }
    ],
    correctAnswer: "C",
    explanation: "The presentational vs container pattern split components into two roles: presentational components handled rendering (markup, styling) and received data via props, while container components handled state, data fetching, and behavior, then passed data down. This pattern was popular before hooks; its original author (Dan Abramov) has since said it's no longer worth following as a hard rule. With hooks, the same separation is usually expressed by extracting a custom hook (e.g., useUsers()) rather than a wrapper component. New code typically blends the two roles into a single component plus a custom hook. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the presentational vs container component pattern in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the presentational vs container component pattern in React.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-render-props-in-react",
    title: "What are render props in React?",
    prompt: "What are render props in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "rendering"
    ],
    codeSnippet: "function DataFetcher({ url, render }) {  const [data, setData] = useState(null);  useEffect(() => {    fetch(url)      .then((res) => res.json())      .then(setData);  }, [url]);  return render(data);}\n// Usage<DataFetcher  url=\"/api/data\"  render={(data) => <div>{data ? data.name: 'Loading...'}</div>}/>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A compiler flag that enforces 60fps rendering in mobile browsers.",
        isCorrect: false,
        explanation: "Render props is a component prop pattern, not a compiler flag."
      },
      {
        id: "B",
        text: "A built-in React hook that automatically renders CSS styles into the DOM.",
        isCorrect: false,
        explanation: "Render props is a component composition pattern, not a hook or CSS injector."
      },
      {
        id: "C",
        text: "A technique for sharing code between components using a prop whose value is a function returning JSX (`<DataFetcher render={data => <UI data={data} />} />`), mostly superseded by custom hooks.",
        isCorrect: true,
        explanation: "Correct. Render props allowed components to share dynamic state through function props, though custom hooks provide a cleaner and more direct approach today."
      },
      {
        id: "D",
        text: "A method for rendering 3D WebGL scenes inside SVG tags.",
        isCorrect: false,
        explanation: "Render props share stateful component logic via function callbacks."
      }
    ],
    correctAnswer: "C",
    explanation: "Render props in React allow code sharing between components through a prop that is a function. This function returns a React element, enabling data to be passed to child components. Like HOCs, render props were a pre-hooks solution for sharing stateful logic. Most of those use cases are now solved with a custom hook (const data = useFetch(url)), which composes more naturally and avoids the render-prop pyramid. Render props are still useful in narrow cases where the consumer needs to control what to render based on parent-managed state (e.g., headless component libraries). Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are render props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are render props in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-composition-pattern-in-react",
    title: "Explain the composition pattern in React.",
    prompt: "Explain the composition pattern in React., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "function WelcomeDialog() {  return (    <Dialog>      <h1>Welcome</h1>      <p>Thank you for visiting our spacecraft!</p>    </Dialog>  );}\nfunction Dialog(props) {  return <div className=\"dialog\">{props.children}</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Creating massive class inheritance hierarchies with multiple `extends` keywords.",
        isCorrect: false,
        explanation: "React explicitly recommends composition over inheritance hierarchies."
      },
      {
        id: "B",
        text: "Building complex components by assembling smaller, focused components together (using `children` or named slots as props) rather than relying on class inheritance.",
        isCorrect: true,
        explanation: "Correct. React strongly favors composition over inheritance, allowing flexible, modular UI structures by passing elements as props or nesting children."
      },
      {
        id: "C",
        text: "A method for compiling multiple audio files into a single MP3 stream.",
        isCorrect: false,
        explanation: "Composition in React refers to assembling component hierarchies."
      },
      {
        id: "D",
        text: "Combining all JavaScript, CSS, and database tables into a single monolithic file.",
        isCorrect: false,
        explanation: "Composition promotes modular, reusable components rather than monolithic files."
      }
    ],
    correctAnswer: "B",
    explanation: "The composition pattern in React involves building components by combining smaller, reusable ones instead of using inheritance. This encourages creating complex UIs by passing components as children or props. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the composition pattern in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the composition pattern in React.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-re-render-the-view-when-the-browser-is-resiz",
    title: "How do you re-render the view when the browser is resized?",
    prompt: "How do you re-render the view when the browser is resized?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "rendering"
    ],
    codeSnippet: "import React, { useState, useEffect } from 'react';\nfunction ResizeComponent() {  const [windowWidth, setWindowWidth] = useState(window.innerWidth);\n  useEffect(() => {    const handleResize = () => setWindowWidth(window.innerWidth);    window.addEventListener('resize', handleResize);    return () => window.removeEventListener('resize', handleResize);  }, []);\n  return <div>Window width: {windowWidth}px</div>;}\nexport default ResizeComponent;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Call `window.location.reload()` on every resize event tick.",
        isCorrect: false,
        explanation: "Reloading the page on resize causes terrible user experience and resets all application state."
      },
      {
        id: "B",
        text: "Poll `window.innerWidth` in a synchronous while loop on the main thread.",
        isCorrect: false,
        explanation: "A synchronous while loop blocks the main thread and freezes the browser."
      },
      {
        id: "C",
        text: "Attach a `resize` event listener inside `useEffect` that updates local state with `window.innerWidth/innerHeight`, removing the listener in cleanup.",
        isCorrect: true,
        explanation: "Correct. Updating component state from a window resize listener schedules a re-render with the new viewport dimensions, with cleanup preventing memory leaks."
      },
      {
        id: "D",
        text: "Rely strictly on CSS `@media` queries to update JavaScript state variables.",
        isCorrect: false,
        explanation: "CSS media queries adapt CSS styles, but cannot update JavaScript component state variables directly."
      }
    ],
    correctAnswer: "C",
    explanation: "To re-render the view on browser resize, use the useEffect hook to listen for the resize event and update state. Example: This updates the state and re-renders the component whenever the window is resized.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you re-render the view when the browser is resized?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you re-render the view when the browser is resized?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-how-do-you-handle-asynchronous-data-loading-in-react-ap",
    title: "How do you handle asynchronous data loading in React applications?",
    prompt: "How do you handle asynchronous data loading in React applications?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React, { useState, useEffect } from 'react';\nconst FetchAndDisplayData = () => {  const [info, updateInfo] = useState(null);  const [isLoading, toggleLoading] = useState(true);\n  useEffect(() => {    const retrieveData = async () => {      try {        const res = await fetch('https://api.example.com/data');        const data = await res.json();        updateInfo(data);      } catch (err) {        console.error('Error fetching data:', err);      } finally {        toggleLoading(false);      }    };\n    retrieveData();  }, []);\n  return (    <div>      {isLoading ? (        <p>Fetching data, please wait...</p>      ): (        <pre>{JSON.stringify(info, null, 2)}</pre>      )}    </div>  );};\nexport default FetchAndDisplayData;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use data-fetching libraries (TanStack Query/SWR), React 19 Server Components/`use` hook, or `useEffect` with local `data`, `isLoading`, and `error` state tracking.",
        isCorrect: true,
        explanation: "Correct. Modern React manages async data using dedicated caching libraries, Server Components, or `useEffect` with cleanup and explicit loading/error state management."
      },
      {
        id: "B",
        text: "Execute synchronous `fetch()` calls directly inside the component render function body.",
        isCorrect: false,
        explanation: "Fetching directly in the render body creates infinite loops and blocks rendering."
      },
      {
        id: "C",
        text: "Store all fetched data in global unreactive `window` variables.",
        isCorrect: false,
        explanation: "Unreactive variables do not trigger component re-renders when data arrives."
      },
      {
        id: "D",
        text: "Force users to refresh the entire browser page to view new data.",
        isCorrect: false,
        explanation: "Single-page applications update UI reactively when asynchronous data resolves."
      }
    ],
    correctAnswer: "A",
    explanation: "Asynchronous data loading uses useEffect alongside useState hooks; fetching data inside useEffect updates state with fetched results ensuring re-renders occur with new data. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle asynchronous data loading in React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle asynchronous data loading in React applications?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-a-react-router",
    title: "What is a React Router?",
    prompt: "What is a React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A standard routing library for React applications that enables declarative client-side navigation between views without full page reloads, syncing the UI with the browser URL.",
        isCorrect: true,
        explanation: "Correct. React Router provides routing components (`<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`) and hooks (`useNavigate`, `useParams`) for SPAs."
      },
      {
        id: "B",
        text: "A database driver that routes SQL queries to read replicas.",
        isCorrect: false,
        explanation: "React Router manages web application URLs, not database query routing."
      },
      {
        id: "C",
        text: "A build tool that bundles CSS stylesheets into minified files.",
        isCorrect: false,
        explanation: "React Router handles URL routing, not CSS bundling."
      },
      {
        id: "D",
        text: "A physical networking hardware device used to assign IP addresses in data centers.",
        isCorrect: false,
        explanation: "React Router is a JavaScript library for web navigation, not a physical hardware router."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router is a popular routing library for React applications that enables navigation between different components based on the URL. It provides declarative routing, allowing you to define routes and their corresponding components in a straightforward manner.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-what-is-the-difference-between-browserrouter-and-hashro",
    title: "What is the difference between BrowserRouter and HashRouter?",
    prompt: "What is the difference between BrowserRouter and HashRouter?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`BrowserRouter` is deprecated and completely removed from React Router.",
        isCorrect: false,
        explanation: "`BrowserRouter` is the recommended standard router for web applications."
      },
      {
        id: "B",
        text: "`BrowserRouter` uses the HTML5 History API for clean URLs (`/about`) and requires server rewrites for deep links; `HashRouter` uses URL hash fragments (`/#/about`) without server configuration.",
        isCorrect: true,
        explanation: "Correct. `BrowserRouter` produces modern clean URLs but needs server fallback routing; `HashRouter` works on static hosts (like GitHub Pages) where server rewrites aren't configurable."
      },
      {
        id: "C",
        text: "`HashRouter` encrypts all URL strings using SHA-256 hashes.",
        isCorrect: false,
        explanation: "The hash refers to standard URL fragment identifiers (`#`), not cryptographic hashing."
      },
      {
        id: "D",
        text: "`BrowserRouter` only works in Google Chrome; `HashRouter` works in all other browsers.",
        isCorrect: false,
        explanation: "Both work across all modern web browsers."
      }
    ],
    correctAnswer: "B",
    explanation: "BrowserRouter: Uses the HTML5 History API to manage navigation, enabling clean URLs without the hash (#). It requires server-side configuration to handle routes correctly, especially for deep linking. HashRouter: Uses the hash (#) portion of the URL to simulate navigation. It doesn't require server-side configuration, as the hash is never sent to the server. This makes it suitable for environments where server-side routing isn't possible (e.g., static hosting).",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between BrowserRouter and HashRouter?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between BrowserRouter and HashRouter?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "react-how-do-you-navigate-programmatically-in-react-router",
    title: "How do you navigate programmatically in React Router?",
    prompt: "How do you navigate programmatically in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { useNavigate } from 'react-router-dom';\nfunction MyComponent() {  const navigate = useNavigate();  const goToPage = () => navigate('/new-page');  return <button onClick={goToPage}>Go to New Page</button>;}\n\nimport { useHistory } from 'react-router-dom';\nfunction MyComponent() {  const history = useHistory();  const goToPage = () => history.push('/new-page');  return <button onClick={goToPage}>Go to New Page</button>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use the `useNavigate()` hook in React Router v6 (`const navigate = useNavigate(); navigate('/path')`), optionally passing `{ replace: true }` or relative deltas (`navigate(-1)`).",
        isCorrect: true,
        explanation: "Correct. `useNavigate` is the standard programmatic navigation hook in React Router v6+, replacing the legacy v5 `useHistory` hook."
      },
      {
        id: "B",
        text: "Modify `document.title` to the target URL path.",
        isCorrect: false,
        explanation: "`document.title` only updates the tab header text, not browser routing."
      },
      {
        id: "C",
        text: "Import and call `React.navigate('/path')` from the core React package.",
        isCorrect: false,
        explanation: "Navigation is handled by React Router (`useNavigate`), not React core."
      },
      {
        id: "D",
        text: "Call `window.location.href = '/path'` directly in every event handler.",
        isCorrect: false,
        explanation: "Assigning to `location.href` causes a full page reload, losing client state and breaking SPA navigation."
      }
    ],
    correctAnswer: "A",
    explanation: "In React Router v6, you can navigate programmatically by using the useNavigate hook. First, import useNavigate from react-router-dom and call it to get the navigate function. Then, you can use navigate('/new-page') to navigate to a different route. For example: In React Router v5, the useHistory hook provides access to the history object, which you can use to push a new route. For example, history.push('/new-page') will navigate to the specified route. For example: Both methods allow you to navigate programmatically in React Router.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you navigate programmatically in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you navigate programmatically in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-do-you-manage-the-active-route-state-in-a-multi-pag",
    title: "How do you manage the active route state in a multi-page React application?",
    prompt: "How do you manage the active route state in a multi-page React application?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { useLocation } from 'react-router-dom';\nfunction NavBar() {  const location = useLocation();  return (    <nav>      <ul>        <li className={location.pathname === '/home' ? 'active': ''}>Home</li>        <li className={location.pathname === '/about' ? 'active': ''}>          About        </li>      </ul>    </nav>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Reload the full HTML page on every navigation click to reapply static CSS classes.",
        isCorrect: false,
        explanation: "Full page reloads destroy SPA performance and client state."
      },
      {
        id: "B",
        text: "Use `<NavLink>` with its `className={({ isActive }) => ...}` callback, or inspect `location.pathname` using the `useLocation()` hook to apply active styling.",
        isCorrect: true,
        explanation: "Correct. `<NavLink>` automatically provides an `isActive` boolean parameter for dynamic styling and aria-current attributes, while `useLocation` provides current URL access."
      },
      {
        id: "C",
        text: "Active route state cannot be tracked in React Router.",
        isCorrect: false,
        explanation: "React Router provides first-class support for active routes via `NavLink` and `useLocation`."
      },
      {
        id: "D",
        text: "Attach a raw `click` event listener to every DOM link and toggle global CSS classes manually.",
        isCorrect: false,
        explanation: "Manual DOM mutation breaks declarative React navigation state and fails on browser back/forward navigation."
      }
    ],
    correctAnswer: "B",
    explanation: "Use the useLocation hook to get the current route, and conditionally apply styles for the active state. Example:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you manage the active route state in a multi-page React application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you manage the active route state in a multi-page React application?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-get-query-parameters-in-react-router",
    title: "How to get query parameters in React Router?",
    prompt: "How to get query parameters in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { useSearchParams } from 'react-router-dom';\nfunction MyComponent() {  const [searchParams] = useSearchParams();  const queryParam = searchParams.get('paramName');  return <div>Query Param: {queryParam}</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Parse query strings by manually running regex over `window.navigator.userAgent`.",
        isCorrect: false,
        explanation: "`userAgent` contains browser device info, not URL query parameters."
      },
      {
        id: "B",
        text: "Use the `useSearchParams()` hook in React Router v6 to read and manipulate URL search parameters (e.g. `const [params] = useSearchParams(); params.get('q')`).",
        isCorrect: true,
        explanation: "Correct. `useSearchParams` provides a standard Web `URLSearchParams` interface to read and update query parameters reactively."
      },
      {
        id: "C",
        text: "Execute `document.cookie.split('?')` inside the render function.",
        isCorrect: false,
        explanation: "Cookies and URL query strings are completely separate browser mechanisms."
      },
      {
        id: "D",
        text: "Query parameters can only be accessed by sending a POST request to a backend server.",
        isCorrect: false,
        explanation: "Query parameters exist in the browser URL and can be read directly on the client with `useSearchParams`."
      }
    ],
    correctAnswer: "B",
    explanation: "In React Router v6, you can use the useSearchParams hook to access query parameters from the URL. Example: This hook allows you to retrieve and manipulate query parameters in React Router v6.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get query parameters in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get query parameters in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-do-you-perform-an-automatic-redirect-after-login-in",
    title: "How do you perform an automatic redirect after login in React Router?",
    prompt: "How do you perform an automatic redirect after login in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { useNavigate } from 'react-router-dom';\nfunction Login() {  const navigate = useNavigate();\n  const handleLogin = () => {    // Perform login logic    navigate('/dashboard');  };\n  return (    <div>      <button onClick={handleLogin}>Login</button>    </div>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Wait 60 minutes for the browser cache to expire automatically.",
        isCorrect: false,
        explanation: "Redirects after login should happen immediately upon authentication success."
      },
      {
        id: "B",
        text: "Call `navigate('/dashboard', { replace: true })` from the `useNavigate()` hook upon successful login, or render `<Navigate to='/dashboard' replace />`.",
        isCorrect: true,
        explanation: "Correct. Programmatic navigation with `useNavigate` directs users to their target destination after authentication completes."
      },
      {
        id: "C",
        text: "Mutate `document.referrer` directly in JavaScript.",
        isCorrect: false,
        explanation: "`document.referrer` is a read-only property and cannot trigger navigation."
      },
      {
        id: "D",
        text: "Call `window.close()` to close the browser tab.",
        isCorrect: false,
        explanation: "Closing the user's tab terminates the application rather than navigating to the dashboard."
      }
    ],
    correctAnswer: "B",
    explanation: "To perform an automatic redirect after login in React Router, use the useNavigate hook to navigate to the desired route after successful authentication. Example: In this example, the handleLogin function navigates to the /dashboard route after successful login.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you perform an automatic redirect after login in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you perform an automatic redirect after login in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-do-you-localize-react-applications",
    title: "How do you localize React applications?",
    prompt: "How do you localize React applications?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "// Example using react-i18nextimport { useTranslation } from 'react-i18next';\nconst MyComponent = () => {  const { t } = useTranslation();  return <p>{t('welcome_message')}</p>;};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use internationalization libraries (like `react-i18next` or `react-intl`), maintain structured translation dictionaries, format dates/numbers via `Intl`, and switch locales via context/hooks.",
        isCorrect: true,
        explanation: "Correct. Localization (i18n) involves externalizing strings into translation JSONs, using translation hooks (`useTranslation`), and handling pluralization and locale formatting."
      },
      {
        id: "B",
        text: "Localize applications by altering browser CSS font-family rules only.",
        isCorrect: false,
        explanation: "Localization requires translated content and locale-aware number/date formatting, not just font changes."
      },
      {
        id: "C",
        text: "Create 50 separate duplicate codebases for each spoken language.",
        isCorrect: false,
        explanation: "Maintaining duplicate codebases creates massive technical debt and maintenance nightmares."
      },
      {
        id: "D",
        text: "Hardcode text in one language and inject a Google Translate widget onto `document.body`.",
        isCorrect: false,
        explanation: "Translation widgets cause layout flashing, break React VDOM reconciliation, and lack professional translation control."
      }
    ],
    correctAnswer: "A",
    explanation: "Localization typically involves libraries like react-i18next or react-intl. Set up translation files for different languages and configure the library within your app using provided hooks or components. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you localize React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you localize React applications?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-react-intl",
    title: "What is react-intl?",
    prompt: "What is react-intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A popular internationalization library (part of FormatJS) providing components and hooks to format numbers, dates, times, strings, and plurals based on the user's locale.",
        isCorrect: true,
        explanation: "Correct. `react-intl` integrates with JavaScript's native `Intl` API, offering declarative components (`<FormattedMessage />`, `<FormattedDate />`) and the `useIntl` hook."
      },
      {
        id: "B",
        text: "An integer calculation math library for JavaScript.",
        isCorrect: false,
        explanation: "`react-intl` stands for Internationalization (i18n), not integer math."
      },
      {
        id: "C",
        text: "A database connector for querying international servers.",
        isCorrect: false,
        explanation: "`react-intl` formats client-side localized text and dates in React."
      },
      {
        id: "D",
        text: "An Intel hardware CPU driver that accelerates React rendering.",
        isCorrect: false,
        explanation: "`react-intl` is an internationalization software library, not an Intel CPU driver."
      }
    ],
    correctAnswer: "A",
    explanation: "react-intl is a library that provides internationalization (i18n) support for React applications. It helps in formatting numbers, dates, strings, and handling translation/localization. It integrates with the Intl API in JavaScript to provide locale-specific data and translation management.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is react-intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-main-features-of-react-intl",
    title: "What are the main features of react-intl?",
    prompt: "What are the main features of react-intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Message formatting with ICU syntax, localized date and time formatting, currency and percentage number formatting, and plural/gender-aware translation strings.",
        isCorrect: true,
        explanation: "Correct. Key features include ICU message syntax for placeholders/plurals, `Intl`-backed date/number formatting, and context-based locale distribution."
      },
      {
        id: "B",
        text: "Translating SQL database schemas into MongoDB collections.",
        isCorrect: false,
        explanation: "`react-intl` operates on frontend React UI messages."
      },
      {
        id: "C",
        text: "Compiling React components to native Android Java bytecode.",
        isCorrect: false,
        explanation: "`react-intl` handles UI text formatting and internationalization, not Android compilation."
      },
      {
        id: "D",
        text: "Compressing video streams using H.264 codecs.",
        isCorrect: false,
        explanation: "`react-intl` manages language localization, not video compression."
      }
    ],
    correctAnswer: "A",
    explanation: "Formatted text: Helps in formatting messages and strings with placeholders. Number formatting: Allows for formatting numbers, currencies, and percentages according to the locale. Date and time formatting: Helps in formatting dates and times in various formats based on the locale. Plural and gender support: Provides plural and gender-aware string formatting.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main features of react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main features of react-intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-two-ways-of-formatting-in-react-intl",
    title: "What are the two ways of formatting in react-intl?",
    prompt: "What are the two ways of formatting in react-intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Synchronous formatting in CSS and asynchronous formatting in WebAssembly.",
        isCorrect: false,
        explanation: "Formatting in `react-intl` is JavaScript-based via React components and hooks."
      },
      {
        id: "B",
        text: "Client-side formatting with cookies and server-side formatting with SQL.",
        isCorrect: false,
        explanation: "`react-intl` formats messages in JavaScript component trees via FormatJS APIs."
      },
      {
        id: "C",
        text: "There is only one single way to format in `react-intl`.",
        isCorrect: false,
        explanation: "`react-intl` provides both declarative components and the imperative `useIntl` hook."
      },
      {
        id: "D",
        text: "Component-based formatting (`<FormattedMessage>`, `<FormattedDate>`, `<FormattedNumber>`) and Hook/API-based imperative formatting (`useIntl().formatMessage()`, etc.).",
        isCorrect: true,
        explanation: "Correct. `react-intl` supports declarative JSX components for rendering formatted text and the `useIntl()` hook for imperatively formatting strings (e.g. for HTML `alt` or `title` attributes)."
      }
    ],
    correctAnswer: "D",
    explanation: "Component-based formatting: Using React components like <FormattedMessage />, <FormattedNumber />, <FormattedDate />, etc., to format content. Hook-based formatting: Using hooks like useIntl for formatting messages, numbers, or dates imperatively within components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the two ways of formatting in react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the two ways of formatting in react-intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-use-formattedmessage-as-a-placeholder-using-reac",
    title: "How to use FormattedMessage as a placeholder using react-intl?",
    prompt: "How to use FormattedMessage as a placeholder using react-intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { FormattedMessage } from 'react-intl';\nfunction WelcomeMessage() {  return (    <FormattedMessage      id=\"welcome\"      defaultMessage=\"Hello, {name}!\"      values={{ name: 'John' }}    />  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Pass dynamic values via the `values` prop `<FormattedMessage id='welcome' defaultMessage='Hello, {name}!' values={{ name: 'John' }} />`.",
        isCorrect: true,
        explanation: "Correct. The `values` prop substitutes placeholder variables defined in ICU message strings dynamically."
      },
      {
        id: "B",
        text: "Inject variables through global `window.name` variables.",
        isCorrect: false,
        explanation: "Variables are passed declaratively through the `values` prop in React."
      },
      {
        id: "C",
        text: "Manually string-concatenate variables onto the `id` prop.",
        isCorrect: false,
        explanation: "The `id` prop is a static translation key; dynamic values belong in the `values` prop object."
      },
      {
        id: "D",
        text: "Placeholders are not supported in `react-intl`.",
        isCorrect: false,
        explanation: "Dynamic ICU placeholder interpolation is a foundational feature of `react-intl`."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use the FormattedMessage component to handle placeholders within strings. Placeholders are replaced dynamically with variables in the translated string. Here, {name} is a placeholder, and John will replace it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use FormattedMessage as a placeholder using react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use FormattedMessage as a placeholder using react-intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-access-the-current-locale-with-react-intl",
    title: "How to access the current locale with React Intl?",
    prompt: "How to access the current locale with React Intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { useIntl } from 'react-intl';\nfunction LocaleDisplay() {  const intl = useIntl();  return <div>Current locale: {intl.locale}</div>;}\n\n<IntlProvider locale=\"en\" messages={messages}>  <MyComponent /></IntlProvider>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Parse the computer's motherboard BIOS firmware language setting.",
        isCorrect: false,
        explanation: "Locale is managed in application code via `<IntlProvider>` and `useIntl()`."
      },
      {
        id: "B",
        text: "Execute a raw SQL query against the browser cache.",
        isCorrect: false,
        explanation: "Locale access is a synchronous JavaScript property read via `useIntl()`."
      },
      {
        id: "C",
        text: "Read `document.currentLocale` from the browser DOM.",
        isCorrect: false,
        explanation: "There is no standard `document.currentLocale` property on browser DOM documents."
      },
      {
        id: "D",
        text: "Call `const intl = useIntl(); const currentLocale = intl.locale;` inside a component, or read the `locale` prop on `<IntlProvider>`.",
        isCorrect: true,
        explanation: "Correct. The `useIntl()` hook exposes the active `intl.locale` string configured by the wrapping `<IntlProvider>` ancestor."
      }
    ],
    correctAnswer: "D",
    explanation: "You can access the current locale using the useIntl hook or the IntlProvider's locale prop. Using useIntl: Using IntlProvider: Here, locale=\"en\" defines the current locale.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access the current locale with React Intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access the current locale with React Intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-test-react-applications",
    title: "How do you test React applications?",
    prompt: "How do you test React applications?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Manually click buttons in the browser and write test results in a paper notebook.",
        isCorrect: false,
        explanation: "Automated CI/CD testing with Jest/Vitest and RTL is required for reliable software development."
      },
      {
        id: "B",
        text: "Test exclusively by inspecting compiled minified JavaScript bytecode with hex editors.",
        isCorrect: false,
        explanation: "Tests evaluate runtime component behavior, accessibility, and user flows."
      },
      {
        id: "C",
        text: "Disable all automated tests to increase build speeds in production.",
        isCorrect: false,
        explanation: "Automated testing is critical to prevent regressions and ensure code correctness."
      },
      {
        id: "D",
        text: "Use test runners (Jest / Vitest) paired with React Testing Library (RTL) for accessible user-centric component tests, plus Playwright/Cypress for end-to-end testing.",
        isCorrect: true,
        explanation: "Correct. Modern React testing emphasizes testing user interactions and accessible output rather than internal implementation details."
      }
    ],
    correctAnswer: "D",
    explanation: "Testing React applications can be done using Jest and React Testing Library. Jest serves as the testing framework while React Testing Library provides utilities for testing components similarly to user interactions. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React applications?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-test-react-hooks-in-functional-components",
    title: "How do you test React hooks in functional components?",
    prompt: "How do you test React hooks in functional components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import { renderHook, act } from '@testing-library/react';import useCounter from './useCounter';\ntest('increments counter', () => {  const { result } = renderHook(() => useCounter());  act(() => {    result.current.increment();  });  expect(result.current.count).toBe(1);});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Import and execute the hook directly in Node.js without a React test harness.",
        isCorrect: false,
        explanation: "Hooks must execute within a React component render context; calling them outside throws Rules of Hooks errors."
      },
      {
        id: "B",
        text: "Use `renderHook(() => useMyHook())` from `@testing-library/react` and wrap state-updating triggers in `act()` when testing outside user events.",
        isCorrect: true,
        explanation: "Correct. `renderHook` mounts a test harness for custom hooks, exposing `result.current` to test return values and actions cleanly."
      },
      {
        id: "C",
        text: "Instantiate the hook with the `new` keyword `new useMyHook()` in test files.",
        isCorrect: false,
        explanation: "Hooks are plain functions, not ES6 classes, and cannot be called with `new`."
      },
      {
        id: "D",
        text: "Hooks cannot be tested in isolation under any circumstances.",
        isCorrect: false,
        explanation: "`renderHook` from React Testing Library provides dedicated custom hook testing support."
      }
    ],
    correctAnswer: "B",
    explanation: "Render the hook inside a test using renderHook from @testing-library/react, then call act to drive any state updates. Older sources import renderHook from @testing-library/react-hooks. That package was deprecated and merged into @testing-library/react in v13; use the import shown above.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React hooks in functional components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React hooks in functional components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-test-custom-hooks-in-react",
    title: "How do you test custom hooks in React?",
    prompt: "How do you test custom hooks in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeSnippet: "import { renderHook, act } from '@testing-library/react';import useCustomHook from './useCustomHook';\ntest('hook behavior', () => {  const { result } = renderHook(() => useCustomHook());  act(() => {    result.current.doSomething();  });  expect(result.current.value).toBe('expected value');});\n// With a context provider:const wrapper = ({ children }) => (  <MyProvider value=\"test\">{children}</MyProvider>);const { result } = renderHook(() => useCustomHook(), { wrapper });",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Custom hooks with context dependencies cannot be tested.",
        isCorrect: false,
        explanation: "The `wrapper` property in `renderHook` easily supplies context providers for testing."
      },
      {
        id: "B",
        text: "Rewrite the custom hook into a class component before running tests.",
        isCorrect: false,
        explanation: "Tests evaluate the actual custom hook implementation directly using `renderHook`."
      },
      {
        id: "C",
        text: "Store hook return values in global environment variables.",
        isCorrect: false,
        explanation: "`renderHook` exposes hook returns cleanly via `result.current`."
      },
      {
        id: "D",
        text: "Use `renderHook(() => useCustomHook(), { wrapper })` from `@testing-library/react` to provide required context providers (Theme, Router, Store) and assert on `result.current`.",
        isCorrect: true,
        explanation: "Correct. Passing a `wrapper` option to `renderHook` wraps the hook harness in necessary context providers so context-dependent hooks execute accurately in tests."
      }
    ],
    correctAnswer: "D",
    explanation: "Same approach as above: render the hook with renderHook and assert on result.current. For hooks that depend on context (e.g., a router or theme provider), pass a wrapper option.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test custom hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test custom hooks in React?.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "react-what-does-the-useactionstate-hook-do",
    title: "What does the useActionState hook do?",
    prompt: "What does the useActionState hook do?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Compresses action video recordings into MP4 format.",
        isCorrect: false,
        explanation: "`useActionState` manages React form action state, not video files."
      },
      {
        id: "B",
        text: "Forces the browser to shut down if an async error occurs.",
        isCorrect: false,
        explanation: "`useActionState` catches action errors cleanly and surfaces them in state."
      },
      {
        id: "C",
        text: "Accepts an async action function and initial state, returning `[state, formAction, isPending]` to manage async mutation return values, errors, and loading indicators automatically.",
        isCorrect: true,
        explanation: "Correct. `useActionState` (formerly `useFormState`) streamlines form mutations by combining state, action dispatchers, and pending status into a single hook."
      },
      {
        id: "D",
        text: "Stores user passwords in public browser cookies.",
        isCorrect: false,
        explanation: "`useActionState` manages in-memory component mutation state."
      }
    ],
    correctAnswer: "C",
    explanation: "useActionState takes an action function and an initial state, and returns [state, dispatchAction, isPending]. Calling dispatchAction (usually by passing it to <form action>) runs the action, marks isPending true, and replaces the state with the action's return value when it resolves. One hook covers what you'd otherwise write as three separate useState calls for data, loading, and error.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does the useActionState hook do?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does the useActionState hook do?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-is-the-use-hook-and-how-is-it-different-from-useef",
    title: "What is the use hook and how is it different from useEffect + fetch?",
    prompt: "What is the use hook and how is it different from useEffect + fetch?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import { use, Suspense } from 'react';\nfunction Profile({ userPromise }) {  const user = use(userPromise); // suspends until resolved  return <h1>{user.name}</h1>;}\n// Server Component: render runs once per request, so the promise is stable.// In a Client Component, create the promise outside render (or via `cache()`)// to avoid making a new one on every re-render.async function Page() {  const userPromise = fetchUser();  return (    <Suspense fallback={<p>Loading...</p>}>      <Profile userPromise={userPromise} />    </Suspense>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`use` only works in Node.js server terminal scripts.",
        isCorrect: false,
        explanation: "`use` works in React Client and Server Components."
      },
      {
        id: "B",
        text: "`use` replaces all CSS stylesheet imports across the application.",
        isCorrect: false,
        explanation: "`use` is a React API for unwrapping Promises and Context, not a CSS loader."
      },
      {
        id: "C",
        text: "`use` is identical to `useEffect` and cannot read promises or be called conditionally.",
        isCorrect: false,
        explanation: "`use` can be called conditionally and integrates directly with Suspense to unwrap promises during render."
      },
      {
        id: "D",
        text: "`use` can read Promises and Context directly during render, suspends the component until the promise resolves, and can be called conditionally and inside loops (unlike standard hooks).",
        isCorrect: true,
        explanation: "Correct. The `use(promiseOrContext)` API enables reading async resources during render with Suspense integration, uniquely allowing conditional invocation."
      }
    ],
    correctAnswer: "D",
    explanation: "use reads the value of a Promise or Context during render. When given a Promise, it suspends the component until the promise resolves (handled by the nearest <Suspense> boundary) and then returns the resolved value. Unlike useEffect, use can be called conditionally and inside loops, and the resolved data is available synchronously after suspension, so there's no loading state to thread through the tree.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use hook and how is it different from useEffect + fetch?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use hook and how is it different from useEffect + fetch?.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-what-is-reactjs",
    title: "What is ReactJS?",
    prompt: "What is ReactJS?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A declarative, component-based JavaScript library for building user interfaces, especially single-page applications, using a Virtual DOM and unidirectional data flow.",
        isCorrect: true,
        explanation: "Correct. React enables modular, reusable UI development with efficient in-memory diffing and component-driven state architecture."
      },
      {
        id: "B",
        text: "A compiler that converts CSS files into WebAssembly binaries.",
        isCorrect: false,
        explanation: "React is a JavaScript library for building user interfaces."
      },
      {
        id: "C",
        text: "A monolithic backend MVC framework that handles PostgreSQL database connections and server clustering.",
        isCorrect: false,
        explanation: "React is a frontend view library, not a backend MVC framework."
      },
      {
        id: "D",
        text: "A browser extension that injects jQuery scripts into production websites.",
        isCorrect: false,
        explanation: "React is a modern UI library, not a browser extension or jQuery wrapper."
      }
    ],
    correctAnswer: "A",
    explanation: "ReactJS is a JavaScript library for building the view layer of web apps using reusable components. It shines for single-page applications because components, the Virtual DOM, and efficient re-rendering let the UI update without full page reloads. JSX is commonly used to write React components. Key features include the Virtual DOM, component-based design, Hooks to use state and effects in functions, server-side rendering for faster initial loads and SEO, and routing via libraries such as React Router.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is ReactJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is ReactJS?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-is-the-latest-version-of-react",
    title: "What Is the Latest Version of React?",
    prompt: "What Is the Latest Version of React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React 12 (the original release from 2013).",
        isCorrect: false,
        explanation: "React 12 is a legacy version from over a decade ago."
      },
      {
        id: "B",
        text: "React 25 (an unreleased experimental prototype).",
        isCorrect: false,
        explanation: "React versioning is currently in the 19.x release cycle."
      },
      {
        id: "C",
        text: "React 5 (which added AngularJS compatibility).",
        isCorrect: false,
        explanation: "React started public release versioning with 0.3.x through 0.14.x before jumping to 15.0.0."
      },
      {
        id: "D",
        text: "React 19 (which introduced Actions, `useActionState`, the `use` hook, Server Components, and the React Compiler).",
        isCorrect: true,
        explanation: "Correct. React 19 is the latest major generation of React, stabilizing React Server Components, Actions, and form integrations."
      }
    ],
    correctAnswer: "D",
    explanation: "The latest stable React release is v19.1.0, published March 28, 2025. It builds on the major changes introduced in v19.0.0 from December 5, 2024.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What Is the Latest Version of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What Is the Latest Version of React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-props-and-state-in-react-with-differences",
    title: "Explain Props and State in React with Differences",
    prompt: "Explain Props and State in React with Differences, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props are stored on the server disk; state is stored in the user's browser cookies.",
        isCorrect: false,
        explanation: "Both props and state live in client JavaScript runtime memory."
      },
      {
        id: "B",
        text: "Props can be mutated directly by child components; state is strictly read-only and immutable everywhere.",
        isCorrect: false,
        explanation: "Props are read-only in children; state is updated via `setState` / `useState` setters."
      },
      {
        id: "C",
        text: "Props only accept string values; state only accepts numbers.",
        isCorrect: false,
        explanation: "Both props and state support any JavaScript data type."
      },
      {
        id: "D",
        text: "Props are read-only configuration passed from parent to child; State is internal data owned and managed by the component that triggers re-renders on change.",
        isCorrect: true,
        explanation: "Correct. Props flow unidirectionally downwards and cannot be modified by the receiving child; state is mutable locally via state setters."
      }
    ],
    correctAnswer: "D",
    explanation: "Props pass data into a component from its parent and are read-only. State lives inside a component and can change over time. Quick differences: Props: Passed from parent, immutable, used in both function and class components. State: Local to component, mutable via setState or useState, mostly managed inside the component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Props and State in React with Differences.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Props and State in React with Differences.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-components-and-their-type-in-react",
    title: "What are Components and Their Type in React?",
    prompt: "What are Components and Their Type in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Static image files loaded into the HTML document head.",
        isCorrect: false,
        explanation: "Components are JavaScript functions or classes returning JSX elements."
      },
      {
        id: "B",
        text: "Reusable, independent pieces of UI: Functional components (plain JS functions using Hooks) and Class components (ES6 classes extending `React.Component`).",
        isCorrect: true,
        explanation: "Correct. React components encapsulate markup, logic, and state into reusable units, with functional components being the modern standard."
      },
      {
        id: "C",
        text: "Database stored procedures executed on PostgreSQL servers.",
        isCorrect: false,
        explanation: "React components are frontend UI units, not database stored procedures."
      },
      {
        id: "D",
        text: "Operating system processes that run outside the web browser.",
        isCorrect: false,
        explanation: "Components execute within the web browser or during SSR on Node.js."
      }
    ],
    correctAnswer: "B",
    explanation: "A component is a reusable piece of UI. Two main types: Functional components: Plain functions that return JSX; with Hooks they can hold state and use lifecycle-like effects. Class components: ES6 classes that extend React.Component; they use this.state and lifecycle methods. Hooks have reduced the need for classes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Components and Their Type in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Components and Their Type in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-browsers-read-jsx",
    title: "How Do Browsers Read JSX?",
    prompt: "How Do Browsers Read JSX?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Browsers rename `.jsx` files to `.html` and display them without JavaScript.",
        isCorrect: false,
        explanation: "JSX is JavaScript code describing UI elements, requiring a JavaScript runtime to execute."
      },
      {
        id: "B",
        text: "Browsers cannot read JSX directly; a transpiler/compiler (Babel, SWC, ESBuild) must convert JSX into standard JavaScript `React.createElement` or `_jsx` calls before running.",
        isCorrect: true,
        explanation: "Correct. JSX is a syntax extension that must be compiled into standard JavaScript function calls before browser JS engines can parse it."
      },
      {
        id: "C",
        text: "Browsers natively parse JSX tags using the built-in HTML5 XML parser.",
        isCorrect: false,
        explanation: "Web browsers do not natively support JSX; build tools must compile it to plain JavaScript."
      },
      {
        id: "D",
        text: "Browsers download a C++ plugin that translates JSX into binary machine code at runtime.",
        isCorrect: false,
        explanation: "Transpilation happens at build time via JS/Rust compilers like Babel and SWC."
      }
    ],
    correctAnswer: "B",
    explanation: "Browsers cannot run JSX directly. A transpiler such as Babel converts JSX into plain JavaScript before the code runs in the browser.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Do Browsers Read JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Do Browsers Read JSX?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-steps-to-create-a-react-application-and-pri",
    title: "Explain the Steps to Create a React Application and Print Hello World",
    prompt: "Explain the Steps to Create a React Application and Print Hello World, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Manually edit the browser's binary executable file and restart the operating system.",
        isCorrect: false,
        explanation: "React apps are standard web applications created with Node.js tooling and package managers."
      },
      {
        id: "B",
        text: "Write raw C++ assembly instructions in an `index.exe` file.",
        isCorrect: false,
        explanation: "React applications are written in JavaScript/TypeScript and HTML/CSS."
      },
      {
        id: "C",
        text: "Scaffold a project (e.g. `npm create vite@latest`), install dependencies (`npm install`), define a root component returning `<h1>Hello World</h1>`, and render it via `createRoot`.",
        isCorrect: true,
        explanation: "Correct. Modern React apps are initialized with Vite/Next.js and rendered to the DOM root using `ReactDOM.createRoot`."
      },
      {
        id: "D",
        text: "Create an empty text file named `app.docx` and upload it to Google Drive.",
        isCorrect: false,
        explanation: "React projects consist of source code files built and served via web servers."
      }
    ],
    correctAnswer: "C",
    explanation: "Install Node, then create an app with Vite:npm create vite@latestcd <Application_Name>Example App component:import React from \"react\";import \"./App.css\";function App() { return <div className=\"App\">Hello World !</div>;}export default App;Run the app with:npm start",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Steps to Create a React Application and Print Hello World.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Steps to Create a React Application and Print Hello World.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-higher-order-component-in-react",
    title: "What is Higher-Order Component in React?",
    prompt: "What is Higher-Order Component in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An async component that only renders on server hardware.",
        isCorrect: false,
        explanation: "HOCs wrap standard components and execute on both client and server."
      },
      {
        id: "B",
        text: "A pure function that takes an existing component and returns a new enhanced component with added props or shared behavior (`(Wrapped) => Enhanced`).",
        isCorrect: true,
        explanation: "Correct. HOCs are a functional pattern for reusing cross-cutting component logic, largely superseded by custom hooks in modern React."
      },
      {
        id: "C",
        text: "A class component that uses multiple inheritance in C++.",
        isCorrect: false,
        explanation: "HOCs use functional composition in JavaScript."
      },
      {
        id: "D",
        text: "A component placed at the absolute top of the HTML DOM tree.",
        isCorrect: false,
        explanation: "HOC is an abstraction pattern for code reuse, not a DOM element placement rule."
      }
    ],
    correctAnswer: "B",
    explanation: "A higher-order component is a function that takes a component and returns a new enhanced component. HOCs let you share common functionality without repeating code.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Higher-Order Component in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Higher-Order Component in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-difference-between-functional-and-class-com",
    title: "Explain the Difference Between Functional and Class Component in React?",
    prompt: "Explain the Difference Between Functional and Class Component in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Functional components cannot receive props, whereas class components can.",
        isCorrect: false,
        explanation: "Both accept and render props."
      },
      {
        id: "B",
        text: "Functional components are plain JavaScript functions using Hooks for state and effects; Class components extend `React.Component`, using `this.state` and lifecycle methods.",
        isCorrect: true,
        explanation: "Correct. Functional components with Hooks offer cleaner code, better composition, and avoid `this` binding complexities."
      },
      {
        id: "C",
        text: "Functional components require manual memory allocation with C++ pointers.",
        isCorrect: false,
        explanation: "All React components execute in JavaScript's automatic garbage-collected memory."
      },
      {
        id: "D",
        text: "Class components render only in the browser; functional components render only on the server.",
        isCorrect: false,
        explanation: "Both component types can render in client and server environments."
      }
    ],
    correctAnswer: "B",
    explanation: "Functional Components: Simple JS functions taking props Use Hooks for state and effects No render method Class Components: Extend React.Component and must implement render() Use this.state and lifecycle methods Require constructor when initializing state",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Difference Between Functional and Class Component in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Difference Between Functional and Class Component in React?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-explain-one-way-data-binding-in-react",
    title: "Explain One Way Data Binding in React?",
    prompt: "Explain One Way Data Binding in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Data flows exclusively from parent components down to child components via props; child updates are requested via callbacks, making state predictable and debuggable.",
        isCorrect: true,
        explanation: "Correct. Unidirectional data flow ensures clear data ownership and prevents unpredictable cascading updates."
      },
      {
        id: "B",
        text: "Data is bound to global database tables over WebSockets on every render.",
        isCorrect: false,
        explanation: "Data binding in React is in-memory component prop passing."
      },
      {
        id: "C",
        text: "Data binds bidirectionally so changing an input automatically mutates parent variables without handlers.",
        isCorrect: false,
        explanation: "React rejects automatic two-way binding in favor of explicit unidirectional state updates."
      },
      {
        id: "D",
        text: "Data flows only from child to parent, with parents inheriting all child state.",
        isCorrect: false,
        explanation: "Data flows downwards from parent to child via props."
      }
    ],
    correctAnswer: "A",
    explanation: "React uses one-way data flow: data travels from parent to child via props. Children do not directly modify parent props, which makes behavior easier to reason about.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain One Way Data Binding in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain One Way Data Binding in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-context-api-in-react",
    title: "What is Context API in React?",
    prompt: "What is Context API in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A remote database service hosted on AWS for storing user files.",
        isCorrect: false,
        explanation: "Context API is an in-memory React component hierarchy feature, not a remote cloud database."
      },
      {
        id: "B",
        text: "A built-in feature (`createContext`, `<Provider>`, `useContext`) that allows sharing values across the component tree without manually passing props through intermediate layers.",
        isCorrect: true,
        explanation: "Correct. Context provides a way to pass data like themes, user auth, and locales directly to distant descendants, avoiding prop drilling."
      },
      {
        id: "C",
        text: "A compiler plugin that converts JSX into TypeScript definitions.",
        isCorrect: false,
        explanation: "Context is a runtime React API, not a compiler plugin."
      },
      {
        id: "D",
        text: "A browser API that measures CPU and memory performance.",
        isCorrect: false,
        explanation: "Context manages component tree data flow."
      }
    ],
    correctAnswer: "B",
    explanation: "Context API lets you provide a value at a high level and consume it in nested components without passing props through each level. Use a Provider to set the value and useContext or Consumer to read it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Context API in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Context API in React?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-how-is-react-routing-different-from-conventional-routin",
    title: "How Is React Routing Different from Conventional Routing?",
    prompt: "How Is React Routing Different from Conventional Routing?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There is no difference; both reload the entire page from scratch.",
        isCorrect: false,
        explanation: "React routing prevents page reloads, updating only the necessary component subtrees."
      },
      {
        id: "B",
        text: "React routing requires downloading all images from the internet on every page change.",
        isCorrect: false,
        explanation: "React routing avoids full reloads and preserves already-loaded assets in memory."
      },
      {
        id: "C",
        text: "React routing is client-side (SPA), intercepting navigation in JavaScript and updating the DOM without full page reloads; conventional routing requests a new HTML document from the server on every link click.",
        isCorrect: true,
        explanation: "Correct. Client-side routing provides instant transitions, preserves application state across views, and avoids expensive full-page browser reloads."
      },
      {
        id: "D",
        text: "Conventional routing runs in the browser; React routing runs on physical hardware satellites.",
        isCorrect: false,
        explanation: "Both operate in standard web architectures, with React routing handled in client browser JavaScript."
      }
    ],
    correctAnswer: "C",
    explanation: "React routing runs in the browser for single-page apps and avoids full-page reloads. Conventional routing usually requests new HTML from the server for each navigation and triggers full page reloads.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Is React Routing Different from Conventional Routing?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Is React Routing Different from Conventional Routing?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-what-is-the-use-of-ref-in-react",
    title: "What is the Use of Ref in React?",
    prompt: "What is the Use of Ref in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To trigger immediate synchronous re-renders of the entire parent tree.",
        isCorrect: false,
        explanation: "Mutating a ref intentionally does not trigger a re-render."
      },
      {
        id: "B",
        text: "To replace `useState` for all dynamic form inputs that update the screen.",
        isCorrect: false,
        explanation: "If changes need to update the rendered UI, `useState` is required."
      },
      {
        id: "C",
        text: "To encrypt component props before transmitting over HTTPS.",
        isCorrect: false,
        explanation: "Refs are in-memory JavaScript reference objects, not encryption mechanisms."
      },
      {
        id: "D",
        text: "To directly access underlying DOM nodes (for focus, scrolling, measurements) or to store mutable values that persist across renders without causing re-renders.",
        isCorrect: true,
        explanation: "Correct. Refs provide an escape hatch to interact directly with DOM elements or store instance variables across render lifecycles."
      }
    ],
    correctAnswer: "D",
    explanation: "Refs let you access DOM nodes or component instances directly when needed, for example to manage focus or play a video. Use this.myRef.current in class components or useRef in functions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Use of Ref in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Use of Ref in React?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-what-are-hooks-in-react",
    title: "What are Hooks in React?",
    prompt: "What are Hooks in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "CSS pseudoclasses that hook into `:hover` and `:active` styling states.",
        isCorrect: false,
        explanation: "React Hooks manage JavaScript state and lifecycle, not CSS styling."
      },
      {
        id: "B",
        text: "Browser extension plugins that hook into Chrome DevTools to inspect cookies.",
        isCorrect: false,
        explanation: "Hooks are core React library functions, not browser extensions."
      },
      {
        id: "C",
        text: "Git commit hooks that enforce code linting before git push.",
        isCorrect: false,
        explanation: "React Hooks are JavaScript APIs in the React package."
      },
      {
        id: "D",
        text: "Functions starting with `use` (e.g. `useState`, `useEffect`) that let functional components manage state, side effects, refs, and context without writing class components.",
        isCorrect: true,
        explanation: "Correct. Introduced in React 16.8, Hooks enable functional components to have full stateful and lifecycle capabilities with superior composition."
      }
    ],
    correctAnswer: "D",
    explanation: "Hooks let function components use state, refs, context, and lifecycle-like behavior. They include built-in hooks such as useState, useEffect, useRef, and let you create custom hooks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Hooks in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-usestate-hook-in-react",
    title: "Explain the useState Hook in React?",
    prompt: "Explain the useState Hook in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A method that mutates DOM elements directly without triggering re-renders.",
        isCorrect: false,
        explanation: "`useState` schedules a component re-render; it does not directly mutate DOM elements imperatively."
      },
      {
        id: "B",
        text: "A built-in hook declaring local component state: `const [state, setState] = useState(initialValue);` calling `setState` schedules a re-render with the new value.",
        isCorrect: true,
        explanation: "Correct. `useState` is the fundamental state hook for functional components, supporting direct values and updater functions `prev => next`."
      },
      {
        id: "C",
        text: "A global store provider that synchronizes state across all browser windows.",
        isCorrect: false,
        explanation: "`useState` provides isolated, local component state."
      },
      {
        id: "D",
        text: "A hook that can only be called inside class component constructor methods.",
        isCorrect: false,
        explanation: "Hooks cannot be called inside class components; they are for functional components."
      }
    ],
    correctAnswer: "B",
    explanation: "useState declares state inside a function component:const [state, setState] = useState(initialState);state holds the current value; setState updates it and triggers re-render.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the useState Hook in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the useState Hook in React?.",
    hints: [
      "State is a snapshot. Setting it schedules a render, it does not change the variable you already read, so two updates from the same value collapse into one."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState"
  },
  {
    id: "react-explain-the-useeffect-hook-in-react",
    title: "Explain the useEffect Hook in React?",
    prompt: "Explain the useEffect Hook in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A hook that executes side effects (data fetching, subscriptions, DOM mutations) after render is committed to screen, supporting a dependency array and cleanup callback.",
        isCorrect: true,
        explanation: "Correct. `useEffect(fn, deps)` runs asynchronously after browser paint, re-running when dependencies change and running cleanup before re-execution or unmount."
      },
      {
        id: "B",
        text: "A hook used exclusively for writing SQL queries to the backend database.",
        isCorrect: false,
        explanation: "`useEffect` runs client-side JavaScript side effects."
      },
      {
        id: "C",
        text: "A hook that can only be called inside `if` statements and loops.",
        isCorrect: false,
        explanation: "The Rules of Hooks require calling `useEffect` unconditionally at the top level."
      },
      {
        id: "D",
        text: "A hook that blocks browser painting synchronously until all promises resolve.",
        isCorrect: false,
        explanation: "`useEffect` is non-blocking; `useLayoutEffect` runs synchronously before paint."
      }
    ],
    correctAnswer: "A",
    explanation: "useEffect(function, dependencies) runs side effects like data fetching or subscriptions. The dependencies array controls when the effect re-runs. It replaces lifecycle patterns like componentDidUpdate and componentWillUnmount in many cases.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the useEffect Hook in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the useEffect Hook in React?.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-what-is-a-react-developer-tool",
    title: "What is a React Developer Tool?",
    prompt: "What is a React Developer Tool?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A database management tool for PostgreSQL.",
        isCorrect: false,
        explanation: "React DevTools inspects React component trees and performance metrics."
      },
      {
        id: "B",
        text: "A code compiler that replaces Vite and Webpack.",
        isCorrect: false,
        explanation: "React DevTools is a browser debugging extension, not a build bundler."
      },
      {
        id: "C",
        text: "An official browser extension (and standalone app) that lets developers inspect the live React component tree, view and edit props/state/hooks, and profile rendering performance.",
        isCorrect: true,
        explanation: "Correct. React DevTools provides the Components and Profiler panels in Chrome/Firefox to inspect component hierarchies, hook states, and render durations."
      },
      {
        id: "D",
        text: "An automated robot that writes React code automatically.",
        isCorrect: false,
        explanation: "React DevTools is an inspection and profiling tool for developers."
      }
    ],
    correctAnswer: "C",
    explanation: "React Developer Tools is a browser extension that adds an inspector for React components. You can browse the component tree and inspect props, state, and hooks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a React Developer Tool?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a React Developer Tool?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-prop-drilling-and-its-disadvantages",
    title: "What is Prop Drilling and Its Disadvantages?",
    prompt: "What is Prop Drilling and Its Disadvantages?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Passing props through multiple intermediate components that don't need them; disadvantages include cluttered component signatures, tight coupling, and brittle refactoring.",
        isCorrect: true,
        explanation: "Correct. Prop drilling creates maintenance friction and makes intermediate components difficult to reuse; mitigated via Context, composition, or state stores."
      },
      {
        id: "B",
        text: "A method for drilling holes in computer hardware circuit boards.",
        isCorrect: false,
        explanation: "Prop drilling describes React component prop forwarding down the tree."
      },
      {
        id: "C",
        text: "An automated compiler error thrown when prop names contain numbers.",
        isCorrect: false,
        explanation: "Prop drilling is a structural pattern, not a compiler error."
      },
      {
        id: "D",
        text: "A performance optimization that accelerates prop passing by 100x.",
        isCorrect: false,
        explanation: "Prop drilling is an architectural anti-pattern/friction, not a performance optimization."
      }
    ],
    correctAnswer: "A",
    explanation: "Prop drilling happens when you pass props through intermediate components that do not need the data, just to reach a deeply nested one. It creates cluttered code and makes maintenance harder.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Prop Drilling and Its Disadvantages?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Prop Drilling and Its Disadvantages?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-what-is-customhooks-in-react",
    title: "What is CustomHooks in React?",
    prompt: "What is CustomHooks in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Special HTML tags that render custom SVG graphics.",
        isCorrect: false,
        explanation: "Hooks are logic abstractions, not visual HTML tags."
      },
      {
        id: "B",
        text: "JavaScript functions whose names start with `use` that compose other React hooks to extract, encapsulate, and share reusable stateful logic across components.",
        isCorrect: true,
        explanation: "Correct. Custom hooks let you extract component logic into reusable functions while maintaining independent state per component instance."
      },
      {
        id: "C",
        text: "Global Redux middleware that intercepts all HTTP requests.",
        isCorrect: false,
        explanation: "Custom hooks are React functional composition tools."
      },
      {
        id: "D",
        text: "Hardware USB drivers that connect physical peripherals to the browser.",
        isCorrect: false,
        explanation: "Custom hooks are JavaScript functions in application code."
      }
    ],
    correctAnswer: "B",
    explanation: "Custom hooks are functions starting with use that call built-in hooks. They encapsulate reusable logic so you can share behavior across components without repeating code.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is CustomHooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is CustomHooks in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-useref-and-createref-in",
    title: "What is the Difference Between useRef and createRef in React?",
    prompt: "What is the Difference Between useRef and createRef in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useRef` forces component re-renders on mutation; `createRef` does not.",
        isCorrect: false,
        explanation: "Neither ref triggers a re-render when `.current` is mutated."
      },
      {
        id: "B",
        text: "`createRef` saves data permanently to `localStorage`.",
        isCorrect: false,
        explanation: "Both operate in JavaScript memory during the component lifecycle."
      },
      {
        id: "C",
        text: "`useRef` is for class components; `createRef` is for functional components.",
        isCorrect: false,
        explanation: "The reverse is true: `useRef` is a hook for functions; `createRef` is primarily for class constructors."
      },
      {
        id: "D",
        text: "`useRef` (in functional components) returns the same persistent ref object across all re-renders; `createRef` (for classes) creates a brand-new ref object every time it is called.",
        isCorrect: true,
        explanation: "Correct. Calling `createRef()` in a functional component creates a new ref on every render, losing previous values; `useRef()` preserves the same ref instance across renders."
      }
    ],
    correctAnswer: "D",
    explanation: "useRef Hook used in function components Keeps the same ref across re-renders Returns a mutable object. createRef: Function often used in class components Creates a new ref each render if used in functions Typical usage in class component constructors Examples: const myRef = useRef(); const myRef = React.createRef();",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Difference Between useRef and createRef in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Difference Between useRef and createRef in React?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-what-are-custom-hooks-in-react",
    title: "What are Custom Hooks in React?",
    prompt: "What are Custom Hooks in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Special class decorators that enable multiple inheritance in ES6 classes.",
        isCorrect: false,
        explanation: "Custom hooks are plain functions, not class decorators."
      },
      {
        id: "B",
        text: "Compiler plugins that convert JSX into raw WebGL shaders.",
        isCorrect: false,
        explanation: "Custom hooks manage reactive component logic, not WebGL shaders."
      },
      {
        id: "C",
        text: "Built-in browser event listeners that trigger on keyboard keystrokes.",
        isCorrect: false,
        explanation: "Hooks are React state/lifecycle abstractions, not browser DOM event listeners."
      },
      {
        id: "D",
        text: "User-defined JavaScript functions starting with `use` that call other React hooks, allowing developers to extract and reuse stateful logic across components cleanly.",
        isCorrect: true,
        explanation: "Correct. Custom hooks encapsulate reusable state, effects, and subscriptions without altering component tree hierarchy."
      }
    ],
    correctAnswer: "D",
    explanation: "Custom hooks are user-defined functions that call built-in hooks to encapsulate and reuse stateful logic across components. Name them starting with use.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Custom Hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Custom Hooks in React?.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "react-how-to-create-forms-in-react",
    title: "How to Create Forms in React?",
    prompt: "How to Create Forms in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Declare state variables with `useState`, bind them to input `value` and `onChange`, and handle form submission via `<form onSubmit={handleSubmit}>` calling `e.preventDefault()`.",
        isCorrect: true,
        explanation: "Correct. Controlled form creation binds inputs to React state and intercepts `onSubmit` to process data without full page reloads."
      },
      {
        id: "B",
        text: "Write raw `document.forms[0].submit()` calls inside the component render body.",
        isCorrect: false,
        explanation: "Submitting inside render creates infinite submission loops."
      },
      {
        id: "C",
        text: "Forms cannot be created in React without third-party Java plugins.",
        isCorrect: false,
        explanation: "React provides first-class support for controlled and uncontrolled forms natively."
      },
      {
        id: "D",
        text: "Use native HTML forms without event handlers and allow full page reloads on every character.",
        isCorrect: false,
        explanation: "Full page reloads on every character destroy SPA responsiveness and user experience."
      }
    ],
    correctAnswer: "A",
    explanation: "Steps: Create a state with useState for each input Bind input value to state Update state in onChange handlers Handle submission in onSubmit and prevent default behavior Example: import React, { useState } from 'react';function MyForm() { const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState(''); const handleSubmit = (e) => { e.preventDefault(); console.log('Form submitted:', { name, email, message }); }; return ( <form onSubmit={handleSubmit}> <div> <label>Name:</label> <input type=\"text\" value={name} onChange={e => setName(e.target.value)} /> </div> <div> <label>Email:</label> <input type=\"email\" value={email} onChange={e => setEmail(e.target.value)} /> </div> <div> <label>Message:</label> <textarea value={message} onChange={e => setMessage(e.target.value)} /> </div> <button type=\"submit\">Submit</button> </form> );}export default MyForm;",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Create Forms in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Create Forms in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-is-react-different-from-react-native",
    title: "How is React Different from React Native?",
    prompt: "How is React Different from React Native?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There is no difference; React and React Native are identical packages.",
        isCorrect: false,
        explanation: "They target completely different rendering environments (Browser DOM vs Native Mobile Views)."
      },
      {
        id: "B",
        text: "React is written in C++; React Native is written in Python.",
        isCorrect: false,
        explanation: "Both are written using JavaScript/TypeScript and React component paradigms."
      },
      {
        id: "C",
        text: "React targets web browsers rendering HTML DOM elements (`<div>`, `<span>`); React Native targets iOS/Android rendering native platform UI widgets (`<View>`, `<Text>`).",
        isCorrect: true,
        explanation: "Correct. Both share React's component model and state principles, but React outputs to the browser DOM while React Native maps to native mobile platform components."
      },
      {
        id: "D",
        text: "React is for mobile phones; React Native is exclusively for desktop web browsers.",
        isCorrect: false,
        explanation: "The reverse is true: React is primarily for web, while React Native is for mobile (and desktop native)."
      }
    ],
    correctAnswer: "C",
    explanation: "React: Library for building web UIs using HTML, CSS, and JavaScript React Native: Framework for building native mobile apps using React principles and native UI components like View and Text",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How is React Different from React Native?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How is React Different from React Native?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-state-versus-props-who-owns-what-and-where-to-lift-stat",
    title: "State Versus Props: Who Owns What and Where to Lift State",
    prompt: "State Versus Props: Who Owns What and Where to Lift State, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State cannot be shared between sibling components under any circumstances.",
        isCorrect: false,
        explanation: "Siblings share state by lifting it to their common parent or using Context/state stores."
      },
      {
        id: "B",
        text: "Always hoist all state to the root `<App>` component and pass everything down.",
        isCorrect: false,
        explanation: "Lifting all state to the root causes severe prop drilling and unnecessary app-wide re-renders; state should live close to consumers."
      },
      {
        id: "C",
        text: "Props are owned and passed by parents (read-only to children); State is owned locally by the defining component; when siblings share data, lift state to their nearest common parent.",
        isCorrect: true,
        explanation: "Correct. Lifting state up to a common ancestor establishes a single source of truth when multiple components need to coordinate on shared data."
      },
      {
        id: "D",
        text: "State is owned by child components; props are owned by global window cookies.",
        isCorrect: false,
        explanation: "Props are passed down from parent components; state is declared locally in components."
      }
    ],
    correctAnswer: "C",
    explanation: "Props are inputs from parent components and are read-only. State is owned by the component that defines it and is mutable via setState or Hook setters. When to lift the state up: If two sibling components need the same piece of data, move that state to their closest common parent and pass it down as props. Keep the state as local as possible. Lift it only when multiple components must share it. Patterns: For derived values, compute them during render instead of duplicating state. For many related form fields, keep a single object state or use a form library. Use callbacks passed through props to allow children to request updates.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of State Versus Props: Who Owns What and Where to Lift State.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of State Versus Props: Who Owns What and Where to Lift State.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-prop-drilling-why-it-happens-and-how-to-avoid-it",
    title: "Prop Drilling: Why It Happens and How to Avoid It",
    prompt: "Prop Drilling: Why It Happens and How to Avoid It, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Avoid prop drilling by putting all application code into a single 10,000-line file.",
        isCorrect: false,
        explanation: "Monolithic files create massive maintenance problems and code degradation."
      },
      {
        id: "B",
        text: "Prop drilling is mandatory and cannot be avoided in React.",
        isCorrect: false,
        explanation: "React provides Context and composition specifically to solve prop drilling."
      },
      {
        id: "C",
        text: "Prop drilling occurs when passing props through intermediate layers that don't need them; avoid it by using React Context, component composition (`children`), or state management stores.",
        isCorrect: true,
        explanation: "Correct. Context, composition slots, and global stores decouple deeply nested consumers from intermediate structural components."
      },
      {
        id: "D",
        text: "Avoid prop drilling by copying all state into `window.localStorage` on every keystroke.",
        isCorrect: false,
        explanation: "LocalStorage is for persistent storage, not component hierarchy data passing."
      }
    ],
    correctAnswer: "C",
    explanation: "Prop drilling is passing props down through intermediate components that do not use them, just to reach a deeply nested child. It creates tight coupling and noisy component signatures. Alternatives: Lift state to a common ancestor and pass only what is needed. Use Context for app-wide or cross-subtree data like theme or auth. Use composition patterns or custom hooks to expose behavior without deep prop chains. Practical rule: Use Context when many components across the tree need the same value and prop passing becomes repetitive.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Prop Drilling: Why It Happens and How to Avoid It.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Prop Drilling: Why It Happens and How to Avoid It.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-react-hooks-overview-moving-state-and-lifecycle-into-fu",
    title: "React Hooks Overview: Moving State and Lifecycle Into Functions",
    prompt: "React Hooks Overview: Moving State and Lifecycle Into Functions, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks can only be used in React 15 and were removed in React 18.",
        isCorrect: false,
        explanation: "Hooks were introduced in React 16.8 and remain the core foundation of modern React."
      },
      {
        id: "B",
        text: "Hooks enable functional components to use state, side effects, refs, and context, allowing reusable logic extraction into custom hooks without class boilerplate or wrapper nesting.",
        isCorrect: true,
        explanation: "Correct. Hooks modernized React by replacing class lifecycles and HOC wrapper hell with composable functions."
      },
      {
        id: "C",
        text: "Hooks require all state variables to be stored in backend Redis clusters.",
        isCorrect: false,
        explanation: "Hooks manage in-memory client state in React components."
      },
      {
        id: "D",
        text: "Hooks compile JavaScript components into native Swift code for iOS.",
        isCorrect: false,
        explanation: "Hooks are JavaScript functions executing within standard React runtimes."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks are functions like useState and useEffect that let you manage state and side effects in functional components. They let you reuse logic via custom hooks and reduce the need for class components. Key points: Hooks must be called at the top level of a function component or inside custom hooks. They let you compose behavior across components without changing component hierarchy.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of React Hooks Overview: Moving State and Lifecycle Into Functions.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of React Hooks Overview: Moving State and Lifecycle Into Functions.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-useeffect-explained-running-effects-and-dependency-cont",
    title: "useEffect explained: Running Effects and Dependency Control",
    prompt: "useEffect explained: Running Effects and Dependency Control, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Replaces all `useState` calls across the application.",
        isCorrect: false,
        explanation: "`useState` stores synchronous state; `useEffect` runs deferred side effects."
      },
      {
        id: "B",
        text: "Runs synchronously before the browser paints the screen.",
        isCorrect: false,
        explanation: "`useEffect` is deferred after paint; `useLayoutEffect` runs synchronously before paint."
      },
      {
        id: "C",
        text: "Deeply compares nested object properties in the dependency array automatically.",
        isCorrect: false,
        explanation: "React compares dependencies using shallow referential equality (`Object.is`)."
      },
      {
        id: "D",
        text: "Runs after render: empty `[]` runs once on mount/unmount; listed dependencies `[a, b]` re-run only when those values change; returning a function runs cleanup before re-running or unmounting.",
        isCorrect: true,
        explanation: "Correct. Explicit dependency tracking prevents unnecessary effect re-executions and avoids stale closures, while cleanup handles teardowns."
      }
    ],
    correctAnswer: "D",
    explanation: "useEffect runs after render for side effects like data fetching or document updates. It accepts a function and an optional dependencies array. If you pass dependencies, React runs the effect only when any dependency changes. If you return a function from the effect, React runs that as cleanup before the next effect or unmount. Example: useEffect(() => { fetchData(); return () => cancelFetch();}, [userId]); Best practices: Keep effects focused on a single job. Avoid recreating functions inside dependencies unless needed. Use abort controllers for fetches to cancel stale requests.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useEffect explained: Running Effects and Dependency Control.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useEffect explained: Running Effects and Dependency Control.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-useref-and-refs-in-hooks-when-to-use-them",
    title: "useRef and refs in Hooks: When to Use Them",
    prompt: "useRef and refs in Hooks: When to Use Them, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Stores data in an encrypted cookie sent with every HTTP request.",
        isCorrect: false,
        explanation: "`useRef` is purely an in-memory JavaScript reference object."
      },
      {
        id: "B",
        text: "Returns a mutable object `{ current: initialValue }` that persists across renders without triggering a re-render when mutated; used for DOM node access, timers, and previous values.",
        isCorrect: true,
        explanation: "Correct. `useRef` provides persistent instance storage for values that don't drive visual rendering, as well as direct references to DOM nodes."
      },
      {
        id: "C",
        text: "Replaces `useState` for all dynamic form inputs that update the screen.",
        isCorrect: false,
        explanation: "`useRef` does not trigger UI updates; `useState` is required whenever changes should update the rendered screen."
      },
      {
        id: "D",
        text: "Forces the component to re-render whenever `ref.current` is modified.",
        isCorrect: false,
        explanation: "Mutating `ref.current` is intentionally silent and does not schedule a re-render."
      }
    ],
    correctAnswer: "B",
    explanation: "useRef returns a mutable ref object that survives renders. Use it to access DOM nodes, store timers, or keep mutable values without triggering re-renders. Examples: Managing focus: inputRef.current.focus() Storing previous props: prevRef.current = currentValue Integrating non-React libraries that require DOM elements",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useRef and refs in Hooks: When to Use Them.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useRef and refs in Hooks: When to Use Them.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-custom-hooks-reusable-logic-with-a-simple-rule",
    title: "Custom Hooks: Reusable Logic With a Simple Rule",
    prompt: "Custom Hooks: Reusable Logic With a Simple Rule, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Custom hooks must be declared inside class components using `this.useHook()`.",
        isCorrect: false,
        explanation: "Hooks can only be called from functional components or other custom hooks, never class components."
      },
      {
        id: "B",
        text: "Custom hooks must return a JSX element `<div />`.",
        isCorrect: false,
        explanation: "Custom hooks return arbitrary state values, arrays, or handler objects, not JSX elements."
      },
      {
        id: "C",
        text: "Custom hooks are JavaScript functions named starting with `use` that call built-in hooks, extracting and sharing stateful logic across components while keeping state isolated per instance.",
        isCorrect: true,
        explanation: "Correct. Custom hooks let you package complex logic (data fetching, subscriptions, forms) into composable, testable functions."
      },
      {
        id: "D",
        text: "Custom hooks share a single global state singleton across all components that call them.",
        isCorrect: false,
        explanation: "Each component that calls a custom hook receives its own independent, isolated state."
      }
    ],
    correctAnswer: "C",
    explanation: "Custom Hooks are functions whose names start with use and that call other Hooks. They package reusable behavior like data fetching, form state, or subscriptions and return values or callbacks to the component. Example: function useFetch(url) { const [data, setData] = useState(null); useEffect(() => { fetch(url).then(r => r.json()).then(setData); }, [url]); return data;} Rules: Follow Hook rules when writing custom hooks. Do not use them inside class components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Custom Hooks: Reusable Logic With a Simple Rule.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Custom Hooks: Reusable Logic With a Simple Rule.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "react-smooth-postlogin-redirect-automatic-navigation-after-au",
    title: "Smooth Post, Login Redirect, Automatic Navigation After Authentication",
    prompt: "Smooth Post, Login Redirect, Automatic Navigation After Authentication, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Store user passwords in unencrypted URL query parameters on the redirect.",
        isCorrect: false,
        explanation: "Exposing passwords in URLs is a severe security vulnerability."
      },
      {
        id: "B",
        text: "Capture the intended destination in `location.state.from`, and upon successful auth, call `navigate(from, { replace: true })` to prevent the back button from returning to login.",
        isCorrect: true,
        explanation: "Correct. Preserving the referrer path and replacing the history entry ensures a seamless post-login redirect flow without navigation traps."
      },
      {
        id: "C",
        text: "Redirects cannot be performed programmatically in React applications.",
        isCorrect: false,
        explanation: "React Router's `useNavigate()` hook provides seamless programmatic redirection."
      },
      {
        id: "D",
        text: "Call `window.location.reload()` in a continuous loop until the user is authenticated.",
        isCorrect: false,
        explanation: "Reload loops freeze the browser and destroy user experience."
      }
    ],
    correctAnswer: "B",
    explanation: "Render a redirect from your router when authentication completes, or navigate programmatically. In react, router v5 you can use <Redirect>, and in v6 use the useNavigate hook. Preserve the intended destination in state to return users to where they started, and validate any returnTo value to avoid open redirect attacks. Example v5 (conditional render): class Login extends React.Component { state = { loggedIn: false }; render() { if (this.state.loggedIn) { return <Redirect to=\"/dashboard\" />; } return <form>{/* login form */}</form>; }} Example v6 (programmatic): import { useNavigate, useLocation } from 'react-router-dom';function Login() { const navigate = useNavigate(); const location = useLocation(); const from = (location.state && location.state.from) || '/'; async function onSuccess() { // set token etc navigate(from, { replace: true }); // replace prevents back to login } return <form onSubmit={submit}>.</form>;} Best practices: Use replace for the final redirect to avoid leaving login in history. Store the intended path in location.state or a safe cookie. Validate returnTo against an allowlist to prevent open redirects. For SSR, perform redirect on the server by returning a 302 or by hydrating to the right route.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Smooth Post, Login Redirect, Automatic Navigation After Authentication.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Smooth Post, Login Redirect, Automatic Navigation After Authentication.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-simple-react-hooks-example-state-effect-and-a-controlle",
    title: "Simple React Hooks Example, State, Effect, and a Controlled Input",
    prompt: "Simple React Hooks Example, State, Effect, and a Controlled Input, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A component that replaces React with jQuery plugins.",
        isCorrect: false,
        explanation: "React Hooks provide declarative state and effect management natively."
      },
      {
        id: "B",
        text: "A component using `useState` to bind an `<input value={query} onChange={...}>` and `useEffect` with dependency `[query]` to filter/update results reactively.",
        isCorrect: true,
        explanation: "Correct. Combining `useState` for controlled input and `useEffect` for side-effect reactions illustrates the core reactive loop of modern React components."
      },
      {
        id: "C",
        text: "A component that executes raw SQL queries directly inside the JSX return statement.",
        isCorrect: false,
        explanation: "JSX describes UI elements; SQL database queries cannot run in client JSX."
      },
      {
        id: "D",
        text: "A component that mutates `document.body` directly in a synchronous `while` loop.",
        isCorrect: false,
        explanation: "Synchronous loops block the main thread and direct DOM mutations break React reconciliation."
      }
    ],
    correctAnswer: "B",
    explanation: "A compact, interview, friendly example shows useState and useEffect and demonstrates lifecycle equivalence. Example: import { useState, useEffect } from 'react';function SearchList({ items }) { const [query, setQuery] = useState(''); const [results, setResults] = useState(items); useEffect(() => { setResults(items.filter(i => i.name.includes(query))); }, [query, items]); return ( <div> <input value={query} onChange={e => setQuery(e.target.value)} /> <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul> </div> );} Tips for interviews: Explain how useEffect combines mount/update/unmount logic. Show how to extract behavior into custom hooks for reuse.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Simple React Hooks Example, State, Effect, and a Controlled Input.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Simple React Hooks Example, State, Effect, and a Controlled Input.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-react-router-essentials-modern-routing-and-hooks",
    title: "React Router Essentials, Modern Routing and Hooks",
    prompt: "React Router Essentials, Modern Routing and Hooks, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Router requires creating 50 separate HTML files on the server.",
        isCorrect: false,
        explanation: "React Router is a single-page application routing library that operates in a single HTML document."
      },
      {
        id: "B",
        text: "React Router was deprecated in favor of manual `location.hash` parsing.",
        isCorrect: false,
        explanation: "React Router remains the standard routing framework in the React ecosystem."
      },
      {
        id: "C",
        text: "React Router v6+ uses `<Routes>`, `<Route>`, nested `<Outlet />` layouts, and hooks (`useNavigate`, `useParams`, `useLocation`, `useSearchParams`) for declarative client routing.",
        isCorrect: true,
        explanation: "Correct. Modern React Router provides concise route definitions, nested layout rendering via `<Outlet />`, and powerful navigation hooks."
      },
      {
        id: "D",
        text: "React Router only works on Linux command line terminals.",
        isCorrect: false,
        explanation: "React Router is a web and mobile navigation library."
      }
    ],
    correctAnswer: "C",
    explanation: "React Router provides client routing with sync to URL. v6 simplified route structure and introduced hooks like useNavigate, useParams, useLocation, and useRoutes for nested routing. Key points: Use nested routes to match component hierarchy. Prefer hooks over HOCs; they return simple primitives for navigation and params. For SSR, render routes on the server and handle redirects by checking matched routes during render. Example: import { Routes, Route } from 'react-router-dom';<Routes> <Route path=\"/\" element={<Home/>}/> <Route path=\"users/:id\" element={<User/>}/></Routes>",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of React Router Essentials, Modern Routing and Hooks.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of React Router Essentials, Modern Routing and Hooks.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-do-hooks-cover-class-functionality-mapping-and-exceptio",
    title: "Do Hooks Cover Class Functionality, Mapping and Exceptions",
    prompt: "Do Hooks Cover Class Functionality, Mapping and Exceptions, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks cover virtually all class features (`useState`/`useReducer` for state, `useEffect` for lifecycles), except Error Boundaries (`componentDidCatch`) which still require class components.",
        isCorrect: true,
        explanation: "Correct. Hooks replace almost all class component use cases, with Error Boundaries being the sole remaining feature requiring a class component today."
      },
      {
        id: "B",
        text: "Hooks cannot be used with React Context or refs.",
        isCorrect: false,
        explanation: "`useContext` and `useRef` provide full context and ref support in functional components."
      },
      {
        id: "C",
        text: "Hooks cover only 10% of class features, and cannot handle component state or updates.",
        isCorrect: false,
        explanation: "Hooks provide full state management and lifecycle capabilities."
      },
      {
        id: "D",
        text: "Hooks have completely replaced error boundaries since React 15.",
        isCorrect: false,
        explanation: "Hooks were introduced in React 16.8, and Error Boundaries still rely on class lifecycle methods."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks cover mount/update/unmount flows via useEffect and support state via useState and useReducer. Some class features remain class-only today: Limitations: Error boundaries still require class components (componentDidCatch) until APIs expand. Certain lifecycle control patterns map awkwardly but usually have hook equivalents. Pattern guidance: Use useEffect cleanup for unmount logic. Combine hooks or create custom hooks to model complex lifecycle sequences.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do Hooks Cover Class Functionality, Mapping and Exceptions.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do Hooks Cover Class Functionality, Mapping and Exceptions.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-lifecycle-methods-class-methods-and-hook-equivalents",
    title: "Lifecycle Methods, Class Methods and Hook Equivalents",
    prompt: "Lifecycle Methods, Class Methods and Hook Equivalents, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`componentDidMount` is replaced by creating a raw `setTimeout` inside render.",
        isCorrect: false,
        explanation: "Render functions must be pure; side effects belong in `useEffect`."
      },
      {
        id: "B",
        text: "Class lifecycle methods execute on the server, while hooks execute in CSS.",
        isCorrect: false,
        explanation: "Both execute in JavaScript component runtimes."
      },
      {
        id: "C",
        text: "`componentWillUnmount` has no equivalent in functional components.",
        isCorrect: false,
        explanation: "Returning a cleanup function from `useEffect` handles unmount teardowns cleanly."
      },
      {
        id: "D",
        text: "`componentDidMount` -> `useEffect(fn, [])`; `componentDidUpdate` -> `useEffect(fn, [deps])`; `componentWillUnmount` -> `useEffect(() => cleanup, [])`; layout reads -> `useLayoutEffect`.",
        isCorrect: true,
        explanation: "Correct. `useEffect` consolidates mounting, updating, and unmounting lifecycles into a single unified declarative model."
      }
    ],
    correctAnswer: "D",
    explanation: "Class methods: constructor getDerivedStateFromProps render componentDidMount shouldComponentUpdate getSnapshotBeforeUpdate componentDidUpdate componentWillUnmount Hook mappings: Mount/update/unmount: useEffect Synchronous DOM reads: useLayoutEffect. Avoid getSnapshotBeforeUpdate by capturing values in refs before update.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Lifecycle Methods, Class Methods and Hook Equivalents.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Lifecycle Methods, Class Methods and Hook Equivalents.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-component-lifecycle-phases-initialization-to-unmount",
    title: "Component Lifecycle Phases, Initialization to Unmount",
    prompt: "Component Lifecycle Phases, Initialization to Unmount, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Initialization (initial state/props), Mounting (DOM creation and `useEffect([])`), Updating (re-renders on prop/state changes), and Unmounting (cleanup returned from effects).",
        isCorrect: true,
        explanation: "Correct. The component lifecycle tracks the birth, updates, and destruction of component instances in the React UI tree."
      },
      {
        id: "B",
        text: "Parsing, Transpiling, and Garbage Collecting.",
        isCorrect: false,
        explanation: "These are JavaScript engine execution steps, distinct from React's component lifecycle phases."
      },
      {
        id: "C",
        text: "Connecting, Authenticating, and Disconnecting.",
        isCorrect: false,
        explanation: "These are network socket connection phases, not React component lifecycles."
      },
      {
        id: "D",
        text: "Compiling, Minifying, and Deploying.",
        isCorrect: false,
        explanation: "These are build/deployment stages, not runtime component lifecycle phases."
      }
    ],
    correctAnswer: "A",
    explanation: "Phases: Initialization: set initial state and props. Mounting: component enters DOM; use componentDidMount or useEffect with empty deps. Updating: triggered by props or state changes; use componentDidUpdate or useEffect with deps. Unmounting: cleanup subscriptions with componentWillUnmount or effect return.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Component Lifecycle Phases, Initialization to Unmount.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Component Lifecycle Phases, Initialization to Unmount.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-higherorder-components-when-and-how-to-abstract-behavio",
    title: "Higher, Order Components, When and How to Abstract Behavior",
    prompt: "Higher, Order Components, When and How to Abstract Behavior, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "HOCs compile React components into native C++ machine instructions.",
        isCorrect: false,
        explanation: "HOCs are plain JavaScript functions that return React components."
      },
      {
        id: "B",
        text: "HOCs wrap components to share cross-cutting behavior (`withAuth(Component)`), but can obscure props and add wrapper nesting; custom hooks provide a cleaner, flatter alternative in modern React.",
        isCorrect: true,
        explanation: "Correct. While HOCs enabled behavior abstraction in legacy class codebases, custom hooks achieve the same logic reuse without modifying the component hierarchy."
      },
      {
        id: "C",
        text: "HOCs can only be used on backend Node.js servers.",
        isCorrect: false,
        explanation: "HOCs wrap standard React components on both client and server."
      },
      {
        id: "D",
        text: "HOCs are required for all React components in modern React 19.",
        isCorrect: false,
        explanation: "Modern React favors custom hooks and component composition over HOCs."
      }
    ],
    correctAnswer: "B",
    explanation: "HOC = function that takes a component and returns a new component. Use HOCs to share behavior like subscriptions, data sources, or feature toggles. Example HOC: function withData(Wrapped, select) { return class extends React.Component { state = { data: select(DataSource) }; componentDidMount() { DataSource.subscribe(this.update); } componentWillUnmount() { DataSource.unsubscribe(this.update); } update = () => this.setState({ data: select(DataSource) }); render() { return <Wrapped {.this.props} data={this.state.data} />; } };} Pitfalls and alternatives: HOCs can obscure props and refs; use forwardRef where needed. Consider hooks and composition as simpler alternatives for new code. Preserve displayName and static methods when wrapping.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Higher, Order Components, When and How to Abstract Behavior.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Higher, Order Components, When and How to Abstract Behavior.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-passing-data-between-components-patterns-from-props-to",
    title: "Passing Data Between Components, Patterns From Props to Context",
    prompt: "Passing Data Between Components, Patterns From Props to Context, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Directly modifying child component private variables from the parent.",
        isCorrect: false,
        explanation: "Direct variable mutation violates component encapsulation and does not trigger re-renders."
      },
      {
        id: "B",
        text: "Components cannot communicate with each other under any circumstances.",
        isCorrect: false,
        explanation: "Inter-component communication via props and callbacks is the core foundation of React architecture."
      },
      {
        id: "C",
        text: "Parent to child via props; Child to parent via callback functions; Across distant components via Context API or state stores (Zustand/Redux); Across routes via URL parameters.",
        isCorrect: true,
        explanation: "Correct. React provides clear patterns for every communication scope: props down, callbacks up, Context for shared trees, and URL parameters for route navigation."
      },
      {
        id: "D",
        text: "Sending data through HTTP POST requests to localhost on every click.",
        isCorrect: false,
        explanation: "In-memory props, callbacks, and Context handle component communication efficiently without localhost HTTP requests."
      }
    ],
    correctAnswer: "C",
    explanation: "Parent to child: props. Child to parent: callbacks passed via props. Siblings: lift state to common parent, use Context, or route state. Global: Redux, Zustand, or Context for broadly shared state. Example child-to-parent: function Parent() { const [value, setValue] = useState(0); return <Child onChange={setValue} value={value} />;}function Child({ value, onChange }) { return <button onClick={() => onChange(value + 1)}>Inc</button>;}",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Passing Data Between Components, Patterns From Props to Context.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Passing Data Between Components, Patterns From Props to Context.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-when-to-use-a-class-component-over-a-function-component",
    title: "When to use a Class Component over a Function Component?",
    prompt: "When to use a Class Component over a Function Component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When creating buttons and text inputs.",
        isCorrect: false,
        explanation: "UI primitives are best written as lightweight function components."
      },
      {
        id: "B",
        text: "Default to function components for all new code; class components are only required when creating Error Boundaries (`componentDidCatch` / `getDerivedStateFromError`).",
        isCorrect: true,
        explanation: "Correct. Hooks enable function components to handle state, effects, and context; only Error Boundaries still require class lifecycle methods."
      },
      {
        id: "C",
        text: "Whenever a component makes asynchronous HTTP requests.",
        isCorrect: false,
        explanation: "Function components handle async fetches seamlessly in `useEffect`, custom hooks, or Server Components."
      },
      {
        id: "D",
        text: "Whenever a component needs more than two state variables.",
        isCorrect: false,
        explanation: "Function components can call `useState` or `useReducer` as many times as needed."
      }
    ],
    correctAnswer: "B",
    explanation: "If the component needs state or lifecycle methods then use class component otherwise use function component. However, from React 16.8 with the addition of Hooks, you could use state, lifecycle methods and other features that were only available in class component right in your function component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When to use a Class Component over a Function Component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When to use a Class Component over a Function Component?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-is-the-difference-between-html-and-react-event-han",
    title: "What is the difference between HTML and React event handling?",
    prompt: "What is the difference between HTML and React event handling?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<button onclick=\"activateLasers()\"></button>\n\n<button onClick={activateLasers}>\n\n<a href=\"#\" onclick='console.log(\"The link was clicked.\"); return false;' />\n\nfunction handleClick(event) {\n  event.preventDefault();\n  console.log('The link was clicked.');\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React events only work when the user uses a physical mouse, ignoring touch screens.",
        isCorrect: false,
        explanation: "React SyntheticEvents normalize mouse, touch, pointer, and keyboard interactions across devices."
      },
      {
        id: "B",
        text: "React uses camelCase event names (`onClick`), passes function references instead of strings, and requires calling `e.preventDefault()` explicitly instead of `return false`.",
        isCorrect: true,
        explanation: "Correct. React normalizes events into `SyntheticEvent` instances, uses camelCase JSX props, and requires explicit `preventDefault()` calls to stop default browser actions."
      },
      {
        id: "C",
        text: "HTML events run in Web Workers, while React events run in the GPU.",
        isCorrect: false,
        explanation: "Both run on the browser's main UI JavaScript thread."
      },
      {
        id: "D",
        text: "React events must always be passed as string statements like `onClick='handleClick()' `.",
        isCorrect: false,
        explanation: "Passing strings to event handlers in React is invalid; React requires function references or inline arrow functions."
      }
    ],
    correctAnswer: "B",
    explanation: "Below are some of the main differences between HTML and React event handling, In HTML, the event name should be in lowercase: Whereas in React it follows camelCase convention: In HTML, you can return false to prevent default behavior: Whereas in React you must call preventDefault() explicitly: In HTML, you need to invoke the function by appending () Whereas in react you should not append () with the function name. (refer \"activateLasers\" function in the first point for example): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between HTML and React event handling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between HTML and React event handling?.",
    hints: [
      "React wraps native events in a synthetic event with one consistent API, delegated from the root."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object"
  },
  {
    id: "react-how-to-pass-a-parameter-to-an-event-handler-or-callback",
    title: "How to pass a parameter to an event handler or callback?",
    prompt: "How to pass a parameter to an event handler or callback?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<button onClick={() => this.handleClick(id)} />\n\n<button onClick={this.handleClick.bind(this, id)} />\n\n<button onClick={this.handleClick(id)} />;\nhandleClick = (id) => () => {\n  console.log('Hello, your ticket number is', id);\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Parameters cannot be passed to event handlers in React.",
        isCorrect: false,
        explanation: "Passing parameters via inline arrow functions or curried functions is standard practice."
      },
      {
        id: "B",
        text: "Directly invoke the function in JSX `<button onClick={handleClick(id)}>` without wrapping.",
        isCorrect: false,
        explanation: "Calling `handleClick(id)` directly invokes the function immediately on render instead of passing it as a callback."
      },
      {
        id: "C",
        text: "Store all arguments in global `window.lastArgument` variables.",
        isCorrect: false,
        explanation: "Global variable mutation is unreactive, fragile, and breaks component encapsulation."
      },
      {
        id: "D",
        text: "Use an inline arrow function `<button onClick={() => handleClick(id)}>` or bind the parameter `<button onClick={handleClick.bind(this, id)}>`, or use a curried handler.",
        isCorrect: true,
        explanation: "Correct. Arrow functions and partial application with `.bind()` allow passing custom arguments alongside the event object to handlers."
      }
    ],
    correctAnswer: "D",
    explanation: "You can use an arrow function to wrap around an event handler and pass parameters: This is an equivalent to calling .bind: Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass a parameter to an event handler or callback?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass a parameter to an event handler or callback?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-are-synthetic-events-in-react",
    title: "What are synthetic events in React?",
    prompt: "What are synthetic events in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Events that run exclusively on backend Node.js servers.",
        isCorrect: false,
        explanation: "Synthetic events originate from real user interactions in the browser DOM."
      },
      {
        id: "B",
        text: "A legacy event system that was completely removed in React 18.",
        isCorrect: false,
        explanation: "Synthetic events remain the core event handling mechanism in modern React."
      },
      {
        id: "C",
        text: "Mock events used strictly in unit tests that never fire in real browsers.",
        isCorrect: false,
        explanation: "Synthetic events are standard real runtime event wrappers in all React applications."
      },
      {
        id: "D",
        text: "Cross-browser wrapper objects around native browser events that normalize event properties and methods across different browsers according to W3C specs.",
        isCorrect: true,
        explanation: "Correct. React's `SyntheticEvent` wraps native events to provide consistent behavior, pooling was removed in React 17, and events bubble through React's virtual tree."
      }
    ],
    correctAnswer: "D",
    explanation: "SyntheticEvent is a cross-browser wrapper around the browser's native event. It's API is same as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are synthetic events in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are synthetic events in React?.",
    hints: [
      "React wraps native events in a synthetic event with one consistent API, delegated from the root."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object"
  },
  {
    id: "react-what-are-forward-refs",
    title: "What are forward refs?",
    prompt: "What are forward refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const ButtonElement = React.forwardRef((props, ref) => (\n  <button ref={ref} className=\"CustomButton\">\n    {props.children}\n  </button>\n));\n\n// Create ref to the DOM button:\nconst ref = React.createRef();\n<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A compiler directive that enables multi-threaded WebAssembly compilation.",
        isCorrect: false,
        explanation: "Ref forwarding is a React component API."
      },
      {
        id: "B",
        text: "A tool used to forward HTTP network packets to a proxy server.",
        isCorrect: false,
        explanation: "Ref forwarding passes React DOM references down component hierarchies."
      },
      {
        id: "C",
        text: "A method that redirects browser history forward to the next visited page.",
        isCorrect: false,
        explanation: "History navigation is handled by router hooks (`navigate(1)`), not ref forwarding."
      },
      {
        id: "D",
        text: "A technique (`React.forwardRef`) allowing a component to take a `ref` it receives and pass it down to a child DOM node; in React 19, `ref` is a standard prop on function components.",
        isCorrect: true,
        explanation: "Correct. `forwardRef` enabled parent components to obtain direct DOM node references through intermediate component wrappers, simplified in React 19 as a native prop."
      }
    ],
    correctAnswer: "D",
    explanation: "Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are forward refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are forward refs?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-which-is-preferred-option-with-in-callback-refs-and-fin",
    title: "Which is preferred option with in callback refs and findDOMNode()?",
    prompt: "Which is preferred option with in callback refs and findDOMNode()?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "class MyComponent extends Component {\n  componentDidMount() {\n    findDOMNode(this).scrollIntoView();\n  }\n\n  render() {\n    return <div />;\n  }\n}\n\nclass MyComponent extends Component {\n  constructor(props) {\n    super(props);\n    this.node = createRef();\n  }\n  componentDidMount() {\n    this.node.current.scrollIntoView();\n  }\n\n  render() {\n    return <div ref={this.node} />;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Callback refs were removed in React 16 in favor of string refs.",
        isCorrect: false,
        explanation: "String refs were removed; callback refs and `useRef` remain fully supported."
      },
      {
        id: "B",
        text: "`findDOMNode()` is preferred because it searches the entire operating system for DOM nodes.",
        isCorrect: false,
        explanation: "`findDOMNode()` is a deprecated legacy API that causes major issues with StrictMode and concurrent rendering."
      },
      {
        id: "C",
        text: "Callback refs (or `createRef`/`useRef`) are strongly preferred over `findDOMNode()`, as `findDOMNode()` is deprecated, breaks component encapsulation, and hinders React concurrent mode.",
        isCorrect: true,
        explanation: "Correct. `findDOMNode()` is deprecated because it searches the DOM tree arbitrarily and prevents compiler optimizations; explicit refs are safe and robust."
      },
      {
        id: "D",
        text: "Both APIs are identical and execute the exact same underlying C++ code.",
        isCorrect: false,
        explanation: "`findDOMNode` breaks tree encapsulation, whereas refs maintain clear component boundaries."
      }
    ],
    correctAnswer: "C",
    explanation: "It is preferred to use callback refs over findDOMNode() API. Because findDOMNode() prevents certain improvements in React in the future. The legacy approach of using findDOMNode: The recommended approach is:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Which is preferred option with in callback refs and findDOMNode()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Which is preferred option with in callback refs and findDOMNode()?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-how-error-boundaries-handled-in-react-v15",
    title: "How error boundaries handled in React v15?",
    prompt: "How error boundaries handled in React v15?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React 15 had experimental, unstable support via the internal `unstable_handleError` method, which was standardized in React 16 as `componentDidCatch`.",
        isCorrect: true,
        explanation: "Correct. React 16 formalized error handling with `componentDidCatch` and later `getDerivedStateFromError`, replacing the experimental v15 approach."
      },
      {
        id: "B",
        text: "React 15 used the `useErrorBoundary` hook.",
        isCorrect: false,
        explanation: "Hooks were introduced in React 16.8, long after React 15."
      },
      {
        id: "C",
        text: "React 15 completely prevented all errors by automatically fixing syntax bugs in the browser.",
        isCorrect: false,
        explanation: "No library can automatically fix arbitrary logic bugs; React 16 introduced structured error boundaries."
      },
      {
        id: "D",
        text: "Errors in React 15 could only be caught by restarting the web server.",
        isCorrect: false,
        explanation: "Client-side errors are caught in browser runtime code."
      }
    ],
    correctAnswer: "A",
    explanation: "React v15 provided very basic support for error boundaries using unstable_handleError method. It has been renamed to componentDidCatch in React v16.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How error boundaries handled in React v15?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How error boundaries handled in React v15?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-how-you-use-decorators-in-react",
    title: "How you use decorators in React?",
    prompt: "How you use decorators in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "@setTitle('Profile')\nclass Profile extends React.Component {\n  //....\n}\n\n/*\ntitle is a string that will be set as a document title\nWrappedComponent is what our decorator will receive when\nput directly above a component class as seen in the example above\n*/\nconst setTitle = (title) => (WrappedComponent) => {\n  return class extends React.Component {\n    componentDidMount() {\n      document.title = title;\n    }\n\n    render() {\n      return <WrappedComponent {...this.props} />;\n    }\n  };\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Decorators compile React JSX directly into native Java Android bytecode.",
        isCorrect: false,
        explanation: "Decorators are syntactic wrappers in JavaScript."
      },
      {
        id: "B",
        text: "Decorators are used exclusively to format CSS borders and gradients.",
        isCorrect: false,
        explanation: "Decorators are JavaScript code-wrapping abstractions, not CSS styling rules."
      },
      {
        id: "C",
        text: "Decorators are mandatory HTML tags that must surround every `<div>` element.",
        isCorrect: false,
        explanation: "Decorators are a JavaScript language proposal for decorating classes and methods, not HTML tags."
      },
      {
        id: "D",
        text: "Decorators (e.g. `@withRouter`, `@connect`) were an experimental class syntax enabled via Babel plugins for wrapping classes; modern React favors custom hooks over decorators.",
        isCorrect: true,
        explanation: "Correct. While decorators were popular in class-heavy codebases (like MobX or legacy Redux), modern functional React relies on custom hooks for logic composition."
      }
    ],
    correctAnswer: "D",
    explanation: "You can decorate your class components, which is the same as passing the component into a function. Decorators are flexible and readable way of modifying component functionality. Note: Decorators are a feature that didn't make it into ES7, but are currently a stage 2 proposal.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How you use decorators in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How you use decorators in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-do-hooks-replace-render-props-and-higher-order-componen",
    title: "Do Hooks replace render props and higher order components?",
    prompt: "Do Hooks replace render props and higher order components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks completely broke render props and caused them to be removed from JavaScript.",
        isCorrect: false,
        explanation: "Render props remain a valid React pattern, though custom hooks are usually preferred."
      },
      {
        id: "B",
        text: "Hooks only replace CSS stylesheets, not component patterns.",
        isCorrect: false,
        explanation: "Hooks manage component state and lifecycle logic."
      },
      {
        id: "C",
        text: "No, Hooks can only be used inside render props.",
        isCorrect: false,
        explanation: "Hooks are called at the top level of functional components, independent of render props."
      },
      {
        id: "D",
        text: "Yes, in most cases custom hooks provide a simpler and cleaner way to share stateful logic without adding wrapper nesting to the component tree.",
        isCorrect: true,
        explanation: "Correct. Hooks extract reusable stateful logic into simple function calls, avoiding the 'wrapper hell' of nested HOCs and render props."
      }
    ],
    correctAnswer: "D",
    explanation: "Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do Hooks replace render props and higher order components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do Hooks replace render props and higher order components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-recommended-way-for-naming-components",
    title: "What is the recommended way for naming components?",
    prompt: "What is the recommended way for naming components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "export default React.createClass({\n  displayName: 'TodoApp',\n  // ...\n});\n\nexport default class TodoApp extends React.Component {\n  // ...\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Name the component by reference (`export default class TodoApp extends Component`) or function declaration (`export default function TodoApp()`), rather than using `displayName`.",
        isCorrect: true,
        explanation: "Correct. Standard named ES6 classes/functions allow tools, linters, and stack traces to infer the component name automatically without manual `displayName` maintenance."
      },
      {
        id: "B",
        text: "Always name components using random 10-digit numbers.",
        isCorrect: false,
        explanation: "Random numbers make debugging and component hierarchies unreadable."
      },
      {
        id: "C",
        text: "Component names must be written in lowercase with hyphens.",
        isCorrect: false,
        explanation: "Lowercase tag names are reserved for native HTML/SVG elements; React components use PascalCase."
      },
      {
        id: "D",
        text: "Prefix every component with `__REACT_COMPONENT_PRIVATE__`.",
        isCorrect: false,
        explanation: "PascalCase descriptive names (e.g. `UserProfile`, `NavigationMenu`) are standard convention."
      }
    ],
    correctAnswer: "A",
    explanation: "It is recommended to name the component by reference instead of using displayName. Using displayName for naming component: The recommended approach:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the recommended way for naming components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the recommended way for naming components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-exceptions-on-react-component-naming",
    title: "What are the exceptions on React component naming?",
    prompt: "What are the exceptions on React component naming?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "render(){\n  return (\n      <obj.component /> // `React.createElement(obj.component)`\n      )\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "There are no exceptions whatsoever under any circumstances.",
        isCorrect: false,
        explanation: "Property access expressions (`<obj.myComponent />`) are the standard exception in JSX."
      },
      {
        id: "B",
        text: "Components named after CSS color names can start with numbers.",
        isCorrect: false,
        explanation: "JavaScript identifiers cannot start with numbers."
      },
      {
        id: "C",
        text: "Components rendered inside `<iframe>` tags must be written in all lowercase.",
        isCorrect: false,
        explanation: "Component casing rules in JSX apply equally regardless of iframe rendering."
      },
      {
        id: "D",
        text: "Lowercase tag names that use dot notation property accessors (e.g. `<obj.component />` or `<components.button />`) compile into valid React component elements.",
        isCorrect: true,
        explanation: "Correct. Even if the final property name starts with a lowercase letter, JSX recognises dot-notation paths as component references (`React.createElement(obj.component)`)."
      }
    ],
    correctAnswer: "D",
    explanation: "The component names should start with a uppercase letter but there are few exceptions on this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names. For example the below tag can be compiled to a valid component,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the exceptions on React component naming?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the exceptions on React component naming?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-access-props-in-attribute-quotes",
    title: "How do you access props in attribute quotes?",
    prompt: "How do you access props in attribute quotes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<img className=\"image\" src=\"images/{this.props.image}\" />\n\n<img className=\"image\" src={'images/' + this.props.image} />\n\n<img className=\"image\" src={`images/${this.props.image}`} />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props cannot be used in HTML attribute values.",
        isCorrect: false,
        explanation: "Props are passed dynamically via JSX curly brace expressions `<img src={props.img} />`."
      },
      {
        id: "B",
        text: "Use PHP tags `<img src='images/<?php echo this.props.image; ?>' />`.",
        isCorrect: false,
        explanation: "PHP syntax is invalid in JSX/JavaScript."
      },
      {
        id: "C",
        text: "JSX does not support string interpolation inside quotes `src='images/{props.img}'`; use curly braces with template literals `<img src={`images/${props.img}`} />` or concatenation.",
        isCorrect: true,
        explanation: "Correct. Quotes denote static string literals in JSX; dynamic expressions require curly braces `{}` containing template literals or JS expressions."
      },
      {
        id: "D",
        text: "Use double curly braces inside quotes `<img src='images/{{props.image}}' />`.",
        isCorrect: false,
        explanation: "Double curly braces inside quotes are treated as literal characters in JSX."
      }
    ],
    correctAnswer: "C",
    explanation: "React (or JSX) doesn't support variable interpolation inside an attribute value. The below representation won't work: But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works: Using template strings will also work:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you access props in attribute quotes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you access props in attribute quotes?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-conditionally-apply-class-attributes",
    title: "How to conditionally apply class attributes?",
    prompt: "How to conditionally apply class attributes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<div className=\"btn-panel {this.props.visible ? 'show': 'hidden'}\">\n\n<div className={'btn-panel ' + (this.props.visible ? 'show': 'hidden')}>\n\n<div className={`btn-panel ${this.props.visible ? 'show': 'hidden'}`}>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use `class-if` HTML attribute directives.",
        isCorrect: false,
        explanation: "React uses standard JavaScript expressions in `className`, not custom template directives."
      },
      {
        id: "B",
        text: "Conditionally reload the entire CSS stylesheet file from the server.",
        isCorrect: false,
        explanation: "Class toggling is handled in-memory by updating element `className` values."
      },
      {
        id: "C",
        text: "Use template literals inside curly braces `className={`btn ${isActive ? 'active' : ''}`}`, string concatenation, or helper libraries like `clsx` / `classnames`.",
        isCorrect: true,
        explanation: "Correct. Dynamic class names require JavaScript expressions in curly braces `{}` or utility libraries to conditionally join class name strings."
      },
      {
        id: "D",
        text: "Write JavaScript ternary operators inside plain quotes `className=\"btn {isActive ? 'a' : 'b'}\"`.",
        isCorrect: false,
        explanation: "Expressions inside quotes are evaluated as raw literal text, not executed JavaScript."
      }
    ],
    correctAnswer: "C",
    explanation: "You shouldn't use curly braces inside quotes because it is going to be evaluated as a string. Instead you need to move curly braces outside (don't forget to include spaces between class names): Template strings will also work:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to conditionally apply class attributes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to conditionally apply class attributes?.",
    hints: [
      "A regular function resolves this at call time from its receiver. An arrow captures it at definition time."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
  },
  {
    id: "react-how-to-pretty-print-json-with-react",
    title: "How to pretty print JSON with React?",
    prompt: "How to pretty print JSON with React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const data = { name: 'John', age: 42 };\n\nclass User extends React.Component {\n  render() {\n    return <pre>{JSON.stringify(data, null, 2)}</pre>;\n  }\n}\n\nReact.render(<User />, document.getElementById('container'));",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Pass raw JSON strings to an `alert()` modal on every render.",
        isCorrect: false,
        explanation: "Alert modals block user interaction and do not render formatted JSON inside the UI."
      },
      {
        id: "B",
        text: "Wrap formatted JSON inside a `<pre>` HTML tag: `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve indentation and line breaks.",
        isCorrect: true,
        explanation: "Correct. The `<pre>` tag preserves whitespace and newlines generated by `JSON.stringify(data, null, 2)`, rendering clean readable JSON in the UI."
      },
      {
        id: "C",
        text: "JSON cannot be displayed in React applications.",
        isCorrect: false,
        explanation: "Displaying formatted JSON with `<pre>{JSON.stringify(data, null, 2)}</pre>` is standard."
      },
      {
        id: "D",
        text: "Use `document.write(JSON.stringify(data))` inside JSX.",
        isCorrect: false,
        explanation: "`document.write` destroys the DOM document and breaks React reconciliation."
      }
    ],
    correctAnswer: "B",
    explanation: "We can use <pre> tag so that the formatting of the JSON.stringify() is retained:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pretty print JSON with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pretty print JSON with React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-you-cant-update-props-in-react",
    title: "Why you can't update props in React?",
    prompt: "Why you can't update props in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because props are encrypted with AES-256 by the web browser.",
        isCorrect: false,
        explanation: "Props are plain JavaScript arguments, not encrypted data."
      },
      {
        id: "B",
        text: "Props can be mutated directly if the component is written in TypeScript.",
        isCorrect: false,
        explanation: "TypeScript enforces read-only props at compile time, and React enforces immutability at runtime."
      },
      {
        id: "C",
        text: "React enforces strict unidirectional data flow and pure functions; props are owned by the parent and must be treated as immutable read-only inputs by the child.",
        isCorrect: true,
        explanation: "Correct. Keeping props immutable ensures predictable component rendering, prevents unexpected side effects in parents, and enables fast shallow diffing."
      },
      {
        id: "D",
        text: "Because JavaScript throws a hardware CPU exception if any property is modified.",
        isCorrect: false,
        explanation: "JavaScript allows property mutation; React's architectural contract strictly mandates immutability for props."
      }
    ],
    correctAnswer: "C",
    explanation: "The React philosophy is that props should be immutable and top-down. This means that a parent can send any prop values to a child, but the child can't modify received props.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why you can't update props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why you can't update props in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-can-we-find-the-version-of-react-at-runtime-in-the",
    title: "How can we find the version of React at runtime in the browser?",
    prompt: "How can we find the version of React at runtime in the browser?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const REACT_VERSION = React.version;\n\nReactDOM.render(<div>{`React version: ${REACT_VERSION}`}</div>, document.getElementById('app'));",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Import `React` and read `React.version` (e.g. `console.log(React.version)` returns a string like `'19.0.0'`).",
        isCorrect: true,
        explanation: "Correct. The `React.version` property exposes the current runtime React version string."
      },
      {
        id: "B",
        text: "React versions cannot be determined at runtime.",
        isCorrect: false,
        explanation: "`React.version` provides runtime version inspection."
      },
      {
        id: "C",
        text: "Read `window.navigator.reactVersion` from the browser navigator object.",
        isCorrect: false,
        explanation: "The browser navigator object has no `reactVersion` property."
      },
      {
        id: "D",
        text: "Execute a raw SQL query against browser IndexedDB storage.",
        isCorrect: false,
        explanation: "React version is a standard JavaScript property on the `React` module."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use React.version to get the version.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How can we find the version of React at runtime in the browser?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How can we find the version of React at runtime in the browser?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-use-https-instead-of-http-in-create-react-app",
    title: "How to use https instead of http in create-react-app?",
    prompt: "How to use https instead of http in create-react-app?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "\"scripts\": {\n  \"start\": \"set HTTPS=true && react-scripts start\"\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "HTTPS cannot be used in local development.",
        isCorrect: false,
        explanation: "Local HTTPS development is fully supported via environment variables."
      },
      {
        id: "B",
        text: "Set the environment variable `HTTPS=true` in `.env` or prefix the start script `\"start\": \"HTTPS=true react-scripts start\"` (or `cross-env HTTPS=true`).",
        isCorrect: true,
        explanation: "Correct. Setting `HTTPS=true` instructs CRA's internal development server (Webpack Dev Server) to generate a self-signed SSL certificate for local HTTPS serving."
      },
      {
        id: "C",
        text: "Purchase a physical hardware SSL firewall for your laptop.",
        isCorrect: false,
        explanation: "Development SSL certificates are generated locally by the dev server software."
      },
      {
        id: "D",
        text: "Change all image URLs in CSS stylesheets from `http://` to `https://`.",
        isCorrect: false,
        explanation: "This question is about running the local development server over HTTPS, configured via `HTTPS=true`."
      }
    ],
    correctAnswer: "B",
    explanation: "You just need to use HTTPS=true configuration. You can edit your package.json scripts section: or just run set HTTPS=true && npm start: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use https instead of http in create-react-app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use https instead of http in create-react-app?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-avoid-using-relative-path-imports-in-create-reac",
    title: "How to avoid using relative path imports in create-react-app?",
    prompt: "How to avoid using relative path imports in create-react-app?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "NODE_PATH=src/app",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Configure `\"baseUrl\": \".\"` (or `\"baseUrl\": \"src\"`) and path aliases (`\"@/*\": [\"src/*\"]`) in `tsconfig.json` or `jsconfig.json`.",
        isCorrect: true,
        explanation: "Correct. Configuring `baseUrl` and `paths` in `tsconfig.json` / `jsconfig.json` enables absolute path imports (e.g. `import Button from '@/components/Button'`), eliminating deep `../../` relative chains."
      },
      {
        id: "B",
        text: "Move all 500 application source files into a single flat directory.",
        isCorrect: false,
        explanation: "Flattening the entire project destroys organization and modularity."
      },
      {
        id: "C",
        text: "Absolute imports are prohibited in React projects.",
        isCorrect: false,
        explanation: "Path aliases and absolute base URLs are standard industry practice."
      },
      {
        id: "D",
        text: "Copy files to `node_modules` before every build.",
        isCorrect: false,
        explanation: "Manually copying application files into `node_modules` is an anti-pattern; `tsconfig.json` paths configure aliases cleanly."
      }
    ],
    correctAnswer: "A",
    explanation: "Create a file called .env in the project root and write the import path: After that restart the development server. Now you should be able to import anything inside src/app without relative paths.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to avoid using relative path imports in create-react-app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to avoid using relative path imports in create-react-app?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-add-google-analytics-for-react-router",
    title: "How to add Google Analytics for React Router?",
    prompt: "How to add Google Analytics for React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "history.listen(function (location) {\n  window.ga('set', 'page', location.pathname + location.search);\n  window.ga('send', 'pageview', location.pathname + location.search);\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Listen to route location changes using the `useLocation()` hook inside a top-level effect `useEffect(() => { ga('send', 'pageview', location.pathname); }, [location])`.",
        isCorrect: true,
        explanation: "Correct. Subscribing to `useLocation()` in a custom analytics hook or top-level component triggers tracking pageviews on every SPA route transition."
      },
      {
        id: "B",
        text: "Hardcode the Google Analytics tracking script inside every single component's JSX return statement.",
        isCorrect: false,
        explanation: "Injecting scripts into every component duplicates script tags and breaks tracking."
      },
      {
        id: "C",
        text: "Force a full-page HTTP reload on every link click to trigger default GA page tracking.",
        isCorrect: false,
        explanation: "Full page reloads destroy SPA navigation performance and client state."
      },
      {
        id: "D",
        text: "Google Analytics cannot track single-page React applications.",
        isCorrect: false,
        explanation: "Listening to `location` changes in `useEffect` is the standard SPA analytics integration pattern."
      }
    ],
    correctAnswer: "A",
    explanation: "Add a listener on the history object to record each page view:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to add Google Analytics for React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to add Google Analytics for React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-to-import-and-export-components-using-react-and-es6",
    title: "How to import and export components using React and ES6?",
    prompt: "How to import and export components using React and ES6?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React from 'react';\nimport User from 'user';\n\nexport default class MyProfile extends React.Component {\n  render() {\n    return <User type=\"customer\">//...</User>;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components can only be shared by storing them on global `window` objects.",
        isCorrect: false,
        explanation: "ES modules provide encapsulated, tree-shakeable component imports."
      },
      {
        id: "B",
        text: "Use CommonJS `require()` directly inside JSX tags.",
        isCorrect: false,
        explanation: "ES module `import`/`export` at top level is standard in modern React."
      },
      {
        id: "C",
        text: "Export with `export default MyComponent` (imported via `import MyComponent from './MyComponent'`) or named `export const MyComponent` (imported via `import { MyComponent } from ...`).",
        isCorrect: true,
        explanation: "Correct. ES6 module syntax supports both default and named exports/imports for modular component organization."
      },
      {
        id: "D",
        text: "Use PHP `include('MyComponent.php')` statements inside JSX.",
        isCorrect: false,
        explanation: "PHP statements are invalid in JavaScript/React."
      }
    ],
    correctAnswer: "C",
    explanation: "You should use default for exporting the components With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to import and export components using React and ES6?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to import and export components using React and ES6?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-define-constants-in-react",
    title: "How to define constants in React?",
    prompt: "How to define constants in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  static DEFAULT_PAGINATION = 10;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Store constants on the user's local hard drive using C++ file streams.",
        isCorrect: false,
        explanation: "Constants are declared as standard JavaScript module variables in memory."
      },
      {
        id: "B",
        text: "Constants must be fetched from an external SQL database on every render.",
        isCorrect: false,
        explanation: "Module-level `const` provides instant, static access with zero network overhead."
      },
      {
        id: "C",
        text: "Define module-level `const MY_CONSTANT = 'value'` outside components, or use static class fields (`static DEFAULT_PAGE_SIZE = 10`) on class components.",
        isCorrect: true,
        explanation: "Correct. Declaring constants at the module level (outside component render functions) avoids reallocating them on every render pass."
      },
      {
        id: "D",
        text: "Define constants inside an infinite `while` loop.",
        isCorrect: false,
        explanation: "Infinite loops freeze the browser completely."
      }
    ],
    correctAnswer: "C",
    explanation: "You can use ES7 static field to define constant. Static fields are part of the Class Fields stage 3 proposal.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to define constants in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to define constants in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-benefit-of-styles-modules",
    title: "What is the benefit of styles modules?",
    prompt: "What is the benefit of styles modules?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "export const colors = {\n  white,\n  black,\n  blue,\n};\n\nexport const space = [0, 8, 16, 32, 64];\n\nimport { space, colors } from './styles';",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Locally scoped CSS class names that prevent global namespace pollution and collisions, while maintaining standard CSS syntax and zero runtime overhead.",
        isCorrect: true,
        explanation: "Correct. CSS Modules automatically generate unique hashed class names at build time, guaranteeing style encapsulation without CSS specificity conflicts."
      },
      {
        id: "B",
        text: "Encrypting CSS files with AES-256 to prevent users from seeing colors.",
        isCorrect: false,
        explanation: "CSS Modules scope class names; they do not encrypt stylesheet files."
      },
      {
        id: "C",
        text: "Automatic conversion of CSS into 3D WebGL video games.",
        isCorrect: false,
        explanation: "CSS Modules provide local scoping for CSS stylesheets, not 3D video games."
      },
      {
        id: "D",
        text: "Requiring all styles to be written in Python scripts.",
        isCorrect: false,
        explanation: "CSS Modules use standard CSS syntax in `.module.css` files."
      }
    ],
    correctAnswer: "A",
    explanation: "It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules. For example, these styles could be extracted into a separate component: And then imported individually in other components:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the benefit of styles modules?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the benefit of styles modules?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-to-get-history-on-react-router-v4",
    title: "How to get history on React Router v4?",
    prompt: "How to get history on React Router v4?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { createBrowserHistory } from 'history';\n\n   export default createBrowserHistory({\n     /* pass a configuration object here if needed */\n   });\n\nimport { Router } from 'react-router-dom';\n   import history from './history';\n   import App from './App';\n\n   ReactDOM.render(\n     <Router history={history}>\n       <App />\n     </Router>,\n     holder,\n   );\n\n// some-other-file.js\n   import history from './history';\n\n   history.push('/go-here');",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "History can only be accessed by querying a backend SQL server.",
        isCorrect: false,
        explanation: "Navigation history is managed client-side in the browser."
      },
      {
        id: "B",
        text: "In v4/v5, use the `withRouter` HOC, `useHistory()` hook, or create a custom history module passed to a low-level `<Router history={customHistory}>`.",
        isCorrect: true,
        explanation: "Correct. React Router v4/v5 supported injecting history via `withRouter`, the `useHistory` hook, or configuring a custom history instance."
      },
      {
        id: "C",
        text: "Read `window.history.allVisitedUrls` from the DOM.",
        isCorrect: false,
        explanation: "There is no `allVisitedUrls` property on the browser DOM window object."
      },
      {
        id: "D",
        text: "History is inaccessible in React Router.",
        isCorrect: false,
        explanation: "Router hooks and history instances provide direct navigation access."
      }
    ],
    correctAnswer: "B",
    explanation: "Below are the list of steps to get history object on React Router v4, Create a module that exports a history object and import this module across the project. For example, create history.js file: You should use the <Router> component instead of built-in routers. Imported the above history.js inside index.js file: You can also use push method of history object similar to built-in history object:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get history on React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get history on React Router v4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-to-access-current-locale-with-react-intl",
    title: "How to access current locale with React Intl?",
    prompt: "How to access current locale with React Intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { injectIntl, intlShape } from 'react-intl';\n\nconst MyComponent = ({ intl }) => <div>{`The current locale is ${intl.locale}`}</div>;\n\nMyComponent.propTypes = {\n  intl: intlShape.isRequired,\n};\n\nexport default injectIntl(MyComponent);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Parse the computer motherboard BIOS firmware language setting.",
        isCorrect: false,
        explanation: "Locale is managed in application code via `<IntlProvider>` and `useIntl()`."
      },
      {
        id: "B",
        text: "Locale access is not supported in `react-intl`.",
        isCorrect: false,
        explanation: "`useIntl().locale` provides direct access to the current locale."
      },
      {
        id: "C",
        text: "Read `document.currentLocale` from the browser DOM.",
        isCorrect: false,
        explanation: "There is no standard `document.currentLocale` DOM property."
      },
      {
        id: "D",
        text: "Call `const { locale } = useIntl();` (or wrap with `injectIntl` to access `this.props.intl.locale`), which reads the active locale configured on `<IntlProvider locale={...}>`.",
        isCorrect: true,
        explanation: "Correct. The `useIntl()` hook exposes the active `intl.locale` string provided by the wrapping `<IntlProvider>` ancestor."
      }
    ],
    correctAnswer: "D",
    explanation: "You can get the current locale in any component of your application using injectIntl():: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access current locale with React Intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access current locale with React Intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-purpose-of-reacttestutils-package",
    title: "What is the purpose of ReactTestUtils package?",
    prompt: "What is the purpose of ReactTestUtils package?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A tool for stress-testing backend PostgreSQL servers.",
        isCorrect: false,
        explanation: "`ReactTestUtils` simulated DOM interactions for frontend tests."
      },
      {
        id: "B",
        text: "`ReactTestUtils` (part of `react-dom/test-utils`) provided low-level test utilities (`Simulate`, `act`, `findRenderedDOMComponentWithTag`), now largely superseded by React Testing Library.",
        isCorrect: true,
        explanation: "Correct. `ReactTestUtils` provided foundational test helpers in early React; modern testing uses React Testing Library and `act()` from `react`."
      },
      {
        id: "C",
        text: "A hardware testing kit for calibrating physical computer monitors.",
        isCorrect: false,
        explanation: "`ReactTestUtils` is an npm software package for unit testing React components."
      },
      {
        id: "D",
        text: "A security scanner that finds viruses in JavaScript files.",
        isCorrect: false,
        explanation: "`ReactTestUtils` provided test assertions and event simulations."
      }
    ],
    correctAnswer: "B",
    explanation: "ReactTestUtils are provided in the with-addons package and allow you to perform actions against a simulated DOM for the purpose of unit testing.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of ReactTestUtils package?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of ReactTestUtils package?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-is-jest",
    title: "What is Jest?",
    prompt: "What is Jest?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A browser extension that changes button fonts.",
        isCorrect: false,
        explanation: "Jest is an automated test framework, not a CSS extension."
      },
      {
        id: "B",
        text: "A database ORM that replaces Prisma.",
        isCorrect: false,
        explanation: "Jest is a test framework, not a database ORM."
      },
      {
        id: "C",
        text: "A compiler that converts React JSX into HTML emails.",
        isCorrect: false,
        explanation: "Jest executes and asserts on test specifications."
      },
      {
        id: "D",
        text: "A JavaScript test runner and assertion framework providing automated test discovery, built-in mocking (`jest.fn`/`jest.mock`), snapshot testing, and code coverage reporting.",
        isCorrect: true,
        explanation: "Correct. Jest is a comprehensive test framework widely used for unit and integration testing across React, Node.js, and TypeScript applications."
      }
    ],
    correctAnswer: "D",
    explanation: "Jest is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a jsdom environment. It's often used for testing components.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Jest?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Jest?.",
    hints: [
      "Test what the user does, not how the component stores it. Query by role, assert on output."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://testing-library.com/docs/queries/about/#priority"
  },
  {
    id: "react-what-are-the-drawbacks-of-mvw-pattern",
    title: "What are the drawbacks of MVW pattern?",
    prompt: "What are the drawbacks of MVW pattern?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "MVW patterns had zero drawbacks and are universally used today.",
        isCorrect: false,
        explanation: "The architectural flaws of MVW prompted Facebook to invent Flux and unidirectional data flow."
      },
      {
        id: "B",
        text: "MVW patterns required all code to be written in assembly language.",
        isCorrect: false,
        explanation: "MVW frameworks (Backbone, early Angular) were written in standard JavaScript."
      },
      {
        id: "C",
        text: "Bidirectional data binding created complex cascading updates, circular dependencies between models and views, and made time-travel debugging and state tracking difficult.",
        isCorrect: true,
        explanation: "Correct. Traditional MVC/MVW architectures struggled with two-way data mutations where changing a view updated a model which updated other views unpredictably."
      },
      {
        id: "D",
        text: "MVW patterns ran 1000x faster than any modern web framework.",
        isCorrect: false,
        explanation: "MVW patterns often caused layout thrashing and complex debugging problems."
      }
    ],
    correctAnswer: "C",
    explanation: "DOM manipulation is very expensive which causes applications to behave slow and inefficient. Due to circular dependencies, a complicated model was created around models and views. Lot of data changes happens for collaborative applications(like Google Docs). No way to do undo (travel back in time) easily without adding so much extra code.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the drawbacks of MVW pattern?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the drawbacks of MVW pattern?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-to-test-react-native-apps",
    title: "How to test React Native apps?",
    prompt: "How to test React Native apps?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Mobile apps cannot be tested automatically.",
        isCorrect: false,
        explanation: "Automated unit, integration, and E2E mobile testing is standard industry practice."
      },
      {
        id: "B",
        text: "By printing the source code onto physical paper.",
        isCorrect: false,
        explanation: "Testing uses automated test suites and device simulators."
      },
      {
        id: "C",
        text: "By opening the application in Internet Explorer 6.",
        isCorrect: false,
        explanation: "Mobile apps run on iOS/Android simulators, not legacy desktop browsers."
      },
      {
        id: "D",
        text: "Unit/component tests via Jest and React Native Testing Library; end-to-end tests via Detox, Maestro, or Appium on iOS/Android simulators and real devices.",
        isCorrect: true,
        explanation: "Correct. Jest and RNTL test component logic and layout in memory; Detox and Maestro run automated end-to-end flows on simulators and physical mobile hardware."
      }
    ],
    correctAnswer: "D",
    explanation: "React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to test React Native apps?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to test React Native apps?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-do-logging-in-react-native",
    title: "How to do logging in React Native?",
    prompt: "How to do logging in React Native?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "$ react-native log-ios\n$ react-native log-android",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Send an SMS text message to the server on every keystroke.",
        isCorrect: false,
        explanation: "Logging uses local development console streams."
      },
      {
        id: "B",
        text: "Use `console.log()` / `console.warn()` inspected via React Native DevTools, Flipper, Safari/Chrome debugger, or CLI commands (`npx react-native log-ios` / `log-android`).",
        isCorrect: true,
        explanation: "Correct. Standard `console` methods output logs visible in terminal CLI watchers, Metro bundler output, Flipper, and connected IDE debuggers."
      },
      {
        id: "C",
        text: "Logging is strictly prohibited in React Native.",
        isCorrect: false,
        explanation: "`console.log` and dedicated log viewers are standard in React Native."
      },
      {
        id: "D",
        text: "Write log strings to the phone's physical SIM card.",
        isCorrect: false,
        explanation: "Logs output to console debugging streams, not SIM card hardware."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use console.log, console.warn, etc. As of React Native v0.29 you can simply run the following to see logs in the console:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to do logging in React Native?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to do logging in React Native?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-is-devtools-not-loading-in-chrome-for-local-files",
    title: "Why is DevTools not loading in Chrome for local files?",
    prompt: "Why is DevTools not loading in Chrome for local files?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because React only works when connected to a satellite uplink.",
        isCorrect: false,
        explanation: "React runs locally in any modern browser."
      },
      {
        id: "B",
        text: "Because Chrome bans all local development permanently.",
        isCorrect: false,
        explanation: "Chrome fully supports local development; extension permissions require manual toggling for `file://` protocols."
      },
      {
        id: "C",
        text: "Chrome restricts extension access to `file://` URLs by default; you must open `chrome://extensions`, locate React DevTools, and enable 'Allow access to file URLs'.",
        isCorrect: true,
        explanation: "Correct. By default, Chrome isolates extensions from local filesystem pages until the user explicitly grants 'Allow access to file URLs' in extension settings."
      },
      {
        id: "D",
        text: "Because local files must be written in assembly language.",
        isCorrect: false,
        explanation: "Local HTML/JS files are standard web files."
      }
    ],
    correctAnswer: "C",
    explanation: "If you opened a local HTML file in your browser (file://.) then you must first open Chrome Extensions and check Allow access to file URLs.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is DevTools not loading in Chrome for local files?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is DevTools not loading in Chrome for local files?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-are-the-advantages-of-react-over-vuejs",
    title: "What are the advantages of React over Vue.js?",
    prompt: "What are the advantages of React over Vue.js?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Greater flexibility and pure JS ecosystem, massive enterprise adoption, larger job market, seamless mobile cross-platform sharing with React Native, and strong TypeScript integration.",
        isCorrect: true,
        explanation: "Correct. React's 'all-in-JavaScript' philosophy, huge ecosystem, and React Native synergy provide significant architectural and hiring advantages for large-scale applications."
      },
      {
        id: "B",
        text: "Vue.js only runs in command-line terminals.",
        isCorrect: false,
        explanation: "Vue.js is a full web UI framework."
      },
      {
        id: "C",
        text: "React does not require writing any code at all.",
        isCorrect: false,
        explanation: "Both frameworks require writing application logic; React emphasizes standard JavaScript patterns."
      },
      {
        id: "D",
        text: "React guarantees that applications have zero bugs automatically.",
        isCorrect: false,
        explanation: "Code quality depends on engineering rigor, though React's declarative model helps prevent UI sync bugs."
      }
    ],
    correctAnswer: "A",
    explanation: "React has the following advantages over Vue.js: Gives more flexibility in large apps developing. Easier to test. Suitable for mobile apps creating. More information and solutions available. Note: The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of React over Vue.js?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of React over Vue.js?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-react-tab-is-not-showing-up-in-devtools",
    title: "Why React tab is not showing up in DevTools?",
    prompt: "Why React tab is not showing up in DevTools?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because the computer does not have a physical keyboard attached.",
        isCorrect: false,
        explanation: "DevTools tabs depend on browser runtime script execution, not keyboard hardware."
      },
      {
        id: "B",
        text: "The site is not using React, React hasn't finished loading, the page is inside an `<iframe>` without top-level hook injection, or `__REACT_DEVTOOLS_GLOBAL_HOOK__` was blocked/disabled.",
        isCorrect: true,
        explanation: "Correct. React DevTools depends on the global hook initialized before React runs; if the page does not use React, uses production builds with stripped hooks, or blocks the extension, the tab won't show."
      },
      {
        id: "C",
        text: "Because React requires purchasing a paid license from Meta to show DevTools.",
        isCorrect: false,
        explanation: "React DevTools is free, open-source, and unencumbered."
      },
      {
        id: "D",
        text: "Because DevTools only opens on full moons.",
        isCorrect: false,
        explanation: "DevTools loads whenever React communicates with the extension's global hook."
      }
    ],
    correctAnswer: "B",
    explanation: "When the page loads, React DevTools sets a global named __REACT_DEVTOOLS_GLOBAL_HOOK__, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won't show up the tab.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why React tab is not showing up in DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why React tab is not showing up in DevTools?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-styled-components",
    title: "What are Styled Components?",
    prompt: "What are Styled Components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A CSS-in-JS library that uses tagged template literals to define components with scoped, dynamic CSS styles attached directly to their React component declarations.",
        isCorrect: true,
        explanation: "Correct. `styled-components` generates unique class names automatically, supports dynamic props interpolation in CSS, and eliminates class name collisions."
      },
      {
        id: "B",
        text: "A hardware graphics accelerator card.",
        isCorrect: false,
        explanation: "`styled-components` is an npm styling library."
      },
      {
        id: "C",
        text: "A database query engine that replaces SQL.",
        isCorrect: false,
        explanation: "`styled-components` manages UI styling in JavaScript."
      },
      {
        id: "D",
        text: "A plugin that generates 3D vector graphics in Blender.",
        isCorrect: false,
        explanation: "`styled-components` is a CSS-in-JS library for React web applications."
      }
    ],
    correctAnswer: "A",
    explanation: "styled-components is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Styled Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Styled Components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-relay",
    title: "What is Relay?",
    prompt: "What is Relay?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A database server that stores data on magnetic tape.",
        isCorrect: false,
        explanation: "Relay is a client-side JavaScript GraphQL runtime and compiler."
      },
      {
        id: "B",
        text: "A production-grade GraphQL client framework for React built by Meta, featuring fragment composition, automatic normalization, pagination, and build-time query compilation.",
        isCorrect: true,
        explanation: "Correct. Relay optimizes data fetching by compiling GraphQL queries ahead-of-time and enforcing strict data encapsulation via component fragments."
      },
      {
        id: "C",
        text: "An electrical relay switch that controls room lighting.",
        isCorrect: false,
        explanation: "In React, Relay is a data-fetching and GraphQL state framework."
      },
      {
        id: "D",
        text: "A CSS styling framework that replaces Sass.",
        isCorrect: false,
        explanation: "Relay manages data fetching and GraphQL communication, not CSS styling."
      }
    ],
    correctAnswer: "B",
    explanation: "Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Relay?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Relay?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-give-an-example-of-reselect-usage",
    title: "Give an example of Reselect usage?",
    prompt: "Give an example of Reselect usage?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { createSelector } from 'reselect';\n\nconst shopItemsSelector = (state) => state.shop.items;\nconst taxPercentSelector = (state) => state.shop.taxPercent;\n\nconst subtotalSelector = createSelector(shopItemsSelector, (items) =>\n  items.reduce((acc, item) => acc + item.value, 0),\n);\n\nconst taxSelector = createSelector(\n  subtotalSelector,\n  taxPercentSelector,\n  (subtotal, taxPercent) => subtotal * (taxPercent / 100),\n);\n\nexport const totalSelector = createSelector(subtotalSelector, taxSelector, (subtotal, tax) => ({\n  total: subtotal + tax,\n}));\n\nlet exampleState = {\n  shop: {\n    taxPercent: 8,\n    items: [\n      { name: 'apple', value: 1.2 },\n      { name: 'orange', value: 0.95 },\n    ],\n  },\n};\n\nconsole.log(subtotalSelector(exampleState)); // 2.15\nconsole.log(taxSelector(exampleState)); // 0.172\nconsole.log(totalSelector(exampleState)); // { total: 2.322 }",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`const selectTax = state => { while(true) {} };`",
        isCorrect: false,
        explanation: "Infinite loops freeze the browser UI and are completely invalid."
      },
      {
        id: "B",
        text: "`const selectTax = 'SELECT * FROM taxes';`",
        isCorrect: false,
        explanation: "Reselect uses JavaScript selector functions, not SQL query strings."
      },
      {
        id: "C",
        text: "`const selectTax = eval(window.taxString);`",
        isCorrect: false,
        explanation: "`eval` is dangerous and unrelated to Reselect's memoization architecture."
      },
      {
        id: "D",
        text: "`const selectTax = createSelector([selectSubtotal, selectTaxRate], (subtotal, rate) => subtotal * (rate / 100));` combining input selectors into a memoized output calculation.",
        isCorrect: true,
        explanation: "Correct. `createSelector` takes input selector functions and an output projector function, caching results until input values change."
      }
    ],
    correctAnswer: "D",
    explanation: "Let's take calculations and different amounts of a shipment order with the simplified usage of Reselect:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Give an example of Reselect usage?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Give an example of Reselect usage?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-can-i-import-an-svg-file-as-react-component",
    title: "Can I import an SVG file as react component?",
    prompt: "Can I import an SVG file as react component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { ReactComponent as Logo } from './logo.svg';\n\nconst App = () => (\n  <div>\n    {/* Logo is an actual react component */}\n    <Logo />\n  </div>\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Yes, using SVGR / Vite plugin (`import { ReactComponent as Logo } from './logo.svg'` or `@svgr/webpack`), transforming the SVG file into an inline React component.",
        isCorrect: true,
        explanation: "Correct. SVGR transpiles SVG markup into React JSX components, allowing full SVG customization (color, fills, animations) via component props."
      },
      {
        id: "B",
        text: "Importing SVGs causes fatal JavaScript syntax errors in all bundlers.",
        isCorrect: false,
        explanation: "Vite and Webpack support importing SVGs as React components with appropriate plugins."
      },
      {
        id: "C",
        text: "SVGs must be converted to binary MP3 audio files before importing.",
        isCorrect: false,
        explanation: "SVGs are XML vector graphic files."
      },
      {
        id: "D",
        text: "No, SVG files can only be displayed by opening them in Adobe Illustrator.",
        isCorrect: false,
        explanation: "SVGs render natively in web browsers and can be imported as React components via SVGR."
      }
    ],
    correctAnswer: "A",
    explanation: "You can import SVG directly as component instead of loading it as a file. This feature is available with react-scripts@2.0.0 and higher. Note: Don't forget about the curly braces in the import.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I import an SVG file as react component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I import an SVG file as react component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-pass-numbers-to-react-component",
    title: "How to pass numbers to React component?",
    prompt: "How to pass numbers to React component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "React.render(<User age={30} department={'IT'} />, document.getElementById('container'));",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Numbers cannot be passed as props in React.",
        isCorrect: false,
        explanation: "Numbers are passed using curly brace expressions `<Component count={42} />`."
      },
      {
        id: "B",
        text: "Prefix numbers with `#` `<User age=#30 />`.",
        isCorrect: false,
        explanation: "`#` is not valid JSX attribute syntax for numbers."
      },
      {
        id: "C",
        text: "Wrap numbers in HTML comments `<User age=<!-- 30 --> />`.",
        isCorrect: false,
        explanation: "HTML comments are invalid syntax inside JSX attributes."
      },
      {
        id: "D",
        text: "Pass numbers wrapped in JSX curly braces `<User age={30} />`; passing `age='30'` passes the value as a JavaScript string instead of a number.",
        isCorrect: true,
        explanation: "Correct. In JSX, attribute values in quotes are treated as literal strings; curly braces `{30}` evaluate the content as a JavaScript numeric expression."
      }
    ],
    correctAnswer: "D",
    explanation: "You should be passing the numbers via curly braces({}) where as strings in quotes: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass numbers to React component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass numbers to React component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-hooks",
    title: "What are hooks?",
    prompt: "What are hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import { useState } from 'react';\n\nfunction Example() {\n  // Declare a new state variable, which we'll call \"count\"\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Deprecated legacy functions removed in React 18.",
        isCorrect: false,
        explanation: "Hooks are the primary, recommended way to write React components."
      },
      {
        id: "B",
        text: "Functions starting with `use` (e.g. `useState`, `useEffect`, `useContext`) that let you use state and other React lifecycle features in functional components without writing classes.",
        isCorrect: true,
        explanation: "Correct. Introduced in React 16.8, Hooks enable functional components to encapsulate state, side effects, and shared logic without complex class hierarchies."
      },
      {
        id: "C",
        text: "CSS classes that style hyperlinks.",
        isCorrect: false,
        explanation: "Hooks manage component state and behavior in JavaScript."
      },
      {
        id: "D",
        text: "Hardware tools used to hang computer monitors on walls.",
        isCorrect: false,
        explanation: "In React, Hooks are JavaScript functions that hook into React state and lifecycle mechanisms."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks is a new feature(React 16.8) that lets you use state and other React features without writing a class. Let's see an example of useState hook example,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are hooks?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-are-the-rules-needs-to-follow-for-hooks",
    title: "What are the rules needs to follow for hooks?",
    prompt: "What are the rules needs to follow for hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There are no rules for using Hooks.",
        isCorrect: false,
        explanation: "The Rules of Hooks are strictly enforced by the React runtime and ESLint plugin."
      },
      {
        id: "B",
        text: "1) Call Hooks exclusively inside class `render()` methods; 2) Pass all hooks to `eval()`.",
        isCorrect: false,
        explanation: "Hooks cannot be called inside class components or `eval()`."
      },
      {
        id: "C",
        text: "1) Only call Hooks inside `if` statements; 2) Call Hooks from plain JavaScript helper classes.",
        isCorrect: false,
        explanation: "Hooks must never be called conditionally or inside non-React functions."
      },
      {
        id: "D",
        text: "1) Only call Hooks at the top level (never inside loops, conditions, or nested functions); 2) Only call Hooks from React function components or custom Hooks.",
        isCorrect: true,
        explanation: "Correct. Following the Rules of Hooks ensures that React can preserve state across multiple renders by maintaining a deterministic, identical hook execution order."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to follow two rules in order to use hooks, Call Hooks only at the top level of your react functions. i.e, You shouldn, t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple useState and useEffect calls. Call Hooks from React Functions only. i.e, You shouldn, t call Hooks from regular JavaScript functions.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules needs to follow for hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules needs to follow for hooks?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-to-ensure-hooks-followed-the-rules-in-your-project",
    title: "How to ensure hooks followed the rules in your project?",
    prompt: "How to ensure hooks followed the rules in your project?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "npm install eslint-plugin-react-hooks@next\n\n// Your ESLint configuration\n{\n  \"plugins\": [\n    // ...\n    \"react-hooks\"\n  ],\n  \"rules\": {\n    // ...\n    \"react-hooks/rules-of-hooks\": \"error\"\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Disable all linter warnings in the project.",
        isCorrect: false,
        explanation: "Disabling linters invites subtle race conditions and stale closure bugs."
      },
      {
        id: "B",
        text: "Install and configure the official ESLint plugin `eslint-plugin-react-hooks` with rules `rules-of-hooks: 'error'` and `exhaustive-deps: 'warn'`.",
        isCorrect: true,
        explanation: "Correct. `eslint-plugin-react-hooks` automatically enforces the Rules of Hooks and flags missing dependencies in `useEffect`/`useCallback`/`useMemo`."
      },
      {
        id: "C",
        text: "Manually count the number of lines of code in every file every morning.",
        isCorrect: false,
        explanation: "Automated ESLint static analysis enforces hook rules reliably."
      },
      {
        id: "D",
        text: "Compile the code in Java before deploying.",
        isCorrect: false,
        explanation: "ESLint checks JavaScript/TypeScript source files directly."
      }
    ],
    correctAnswer: "B",
    explanation: "React team released an ESLint plugin called eslint-plugin-react-hooks that enforces these two rules. You can add this plugin to your project using the below command, And apply the below config in your ESLint config file, Note: This plugin is intended to use in Create React App by default.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to ensure hooks followed the rules in your project?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to ensure hooks followed the rules in your project?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-are-the-benefits-of-react-router-v4",
    title: "What are the benefits of React Router V4?",
    prompt: "What are the benefits of React Router V4?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Eliminates the need for writing JavaScript code.",
        isCorrect: false,
        explanation: "React Router is a JavaScript routing library."
      },
      {
        id: "B",
        text: "Automatically translates web pages into Latin.",
        isCorrect: false,
        explanation: "Routing handles URL synchronization, not language translation."
      },
      {
        id: "C",
        text: "Runs directly on the computer motherboard firmware.",
        isCorrect: false,
        explanation: "React Router runs in the browser JavaScript engine."
      },
      {
        id: "D",
        text: "Declarative component-based routing (`<Route>` is a standard React component), dynamic routing during render rather than static config, and modular packaging (`react-router-dom`).",
        isCorrect: true,
        explanation: "Correct. React Router v4 embraced 'all-component routing', allowing routes to be nested and conditionally rendered anywhere within the standard component tree."
      }
    ],
    correctAnswer: "D",
    explanation: "Below are the main benefits of React Router V4 module, In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(<BrowserRouter>) which wraps specific child router components(<Route>). You don't need to manually set history. The router module will take care history by wrapping routes with <BrowserRouter> component. The application size is reduced by adding only the specific router module(Web, core, or native): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of React Router V4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of React Router V4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-what-are-default-props",
    title: "What are default props?",
    prompt: "What are default props?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "class MyButton extends React.Component {\n  // ...\n}\n\nMyButton.defaultProps = {\n  color: 'red',\n};\n\nrender() {\n  return <MyButton />; // props.color will be set to red\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props that can never be changed by the parent component.",
        isCorrect: false,
        explanation: "Default props are only used when the parent does not provide a prop value."
      },
      {
        id: "B",
        text: "Props that only accept boolean values.",
        isCorrect: false,
        explanation: "Default props can be any data type (strings, numbers, functions, objects)."
      },
      {
        id: "C",
        text: "A built-in CSS stylesheet for styling default buttons.",
        isCorrect: false,
        explanation: "`defaultProps` defines fallback prop values in JavaScript."
      },
      {
        id: "D",
        text: "A property (`MyComponent.defaultProps = { color: 'blue' }`) that defines fallback values for props when they are `undefined` (in modern functional React, ES6 default parameters `({ color = 'blue' })` are preferred).",
        isCorrect: true,
        explanation: "Correct. `defaultProps` supplied default prop values for undefined props; in modern functional components, standard JavaScript default parameters are the recommended approach."
      }
    ],
    correctAnswer: "D",
    explanation: "The defaultProps are defined as a property on the component class to set the default props for the class. This is used for undefined props, but not for null props. For example, let us create color default prop for the button component, If props.color is not provided then it will set the default value to 'red'. i.e, Whenever you try to access the color prop it uses default value Note: If you provide null value then it remains null value.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are default props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are default props?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-browser-support-for-react-applications",
    title: "What is the browser support for react applications?",
    prompt: "What is the browser support for react applications?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React only works on Google Chrome on Android phones.",
        isCorrect: false,
        explanation: "React works across all modern desktop, tablet, and mobile browsers."
      },
      {
        id: "B",
        text: "All modern evergreen browsers (Chrome, Firefox, Safari, Edge); older browsers (IE9-IE11) required ES5/ES6 polyfills (Map, Set, Promise), though React 18+ dropped IE support entirely.",
        isCorrect: true,
        explanation: "Correct. React supports all modern standard-compliant browsers; legacy IE support was formally discontinued in React 18."
      },
      {
        id: "C",
        text: "React only works in terminal text browsers like Lynx.",
        isCorrect: false,
        explanation: "React renders to modern graphical browser DOM environments."
      },
      {
        id: "D",
        text: "React requires a browser manufactured exclusively by Meta.",
        isCorrect: false,
        explanation: "React runs on any W3C standard-compliant web browser."
      }
    ],
    correctAnswer: "B",
    explanation: "React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use es5-shim and es5-sham polyfill then it even support old browsers that doesn't support ES5 methods.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the browser support for react applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the browser support for react applications?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-does-react-support-all-html-attributes",
    title: "Does React support all HTML attributes?",
    prompt: "Does React support all HTML attributes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<div tabIndex=\"-1\" />      // Just like node.tabIndex DOM API\n<div className=\"Button\" /> // Just like node.className DOM API\n<input readOnly={true} />  // Just like node.readOnly DOM API",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Yes, React 16+ supports all standard and custom HTML/SVG DOM attributes, using camelCase for standard attributes (`tabIndex`, `readOnly`) and preserving custom `data-*`/`aria-*` attributes.",
        isCorrect: true,
        explanation: "Correct. React passes all recognized and custom attributes to the DOM, using camelCase naming conventions aligned with DOM properties."
      },
      {
        id: "B",
        text: "React requires all HTML attributes to be written in uppercase XML tags.",
        isCorrect: false,
        explanation: "React uses standard camelCase JavaScript naming (e.g. `onClick`, `tabIndex`)."
      },
      {
        id: "C",
        text: "Custom attributes are illegal in React and trigger build crashes.",
        isCorrect: false,
        explanation: "Custom attributes and `data-*` / `aria-*` attributes are fully supported."
      },
      {
        id: "D",
        text: "No, React only supports `id` and `class` attributes; all other HTML attributes are stripped.",
        isCorrect: false,
        explanation: "React supports full HTML5 and SVG attribute sets."
      }
    ],
    correctAnswer: "A",
    explanation: "As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs. Let us take few props with respect to standard HTML attributes, These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does React support all HTML attributes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does React support all HTML attributes?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-when-component-props-defaults-to-true",
    title: "When component props defaults to true?",
    prompt: "When component props defaults to true?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<MyInput autocomplete />\n\n<MyInput autocomplete={true} />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "When a boolean prop is passed without a value (e.g. `<MyInput autocomplete />`), it defaults to `true` to match standard HTML boolean attribute behavior.",
        isCorrect: true,
        explanation: "Correct. In JSX, `<Component disabled />` is equivalent to `<Component disabled={true} />`, mirroring HTML attribute conventions."
      },
      {
        id: "B",
        text: "Props default to `true` only when the prop name begins with the letter 'Z'.",
        isCorrect: false,
        explanation: "Any boolean attribute passed without a value evaluates to `true` in JSX."
      },
      {
        id: "C",
        text: "Props default to `true` if the computer is connected to the internet.",
        isCorrect: false,
        explanation: "JSX attribute evaluation is pure JavaScript syntax resolution."
      },
      {
        id: "D",
        text: "Props passed without values default to `null`.",
        isCorrect: false,
        explanation: "They default to `true` in JSX."
      }
    ],
    correctAnswer: "A",
    explanation: "If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML. For example, below expressions are equivalent, Note: It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, {name} which is short for {name: name}): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When component props defaults to true?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When component props defaults to true?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-pass-an-event-handler-to-a-component",
    title: "How do you pass an event handler to a component?",
    prompt: "How do you pass an event handler to a component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<button onClick=\"{this.handleClick}\"></button>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Event handlers cannot be passed to custom components.",
        isCorrect: false,
        explanation: "Passing callback functions via props is standard unidirectional communication in React."
      },
      {
        id: "B",
        text: "Pass the event handler as a string `<button onClick='handleClick()'>`.",
        isCorrect: false,
        explanation: "String event handlers are invalid in React and throw console warnings."
      },
      {
        id: "C",
        text: "Pass the handler function reference as a prop wrapped in curly braces: `<button onClick={this.handleClick}>` or `<Child onCustomEvent={handleCustomEvent} />`.",
        isCorrect: true,
        explanation: "Correct. In React, event handlers are passed as function references via JSX props in curly braces `{}` rather than string attributes."
      },
      {
        id: "D",
        text: "Write raw C++ function pointers into the DOM.",
        isCorrect: false,
        explanation: "React uses standard JavaScript function references."
      }
    ],
    correctAnswer: "C",
    explanation: "You can pass event handlers and other functions as props to child components. It can be used in child component as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you pass an event handler to a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you pass an event handler to a component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-prevent-a-function-from-being-called-multiple-ti",
    title: "How to prevent a function from being called multiple times?",
    prompt: "How to prevent a function from being called multiple times?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reload the browser tab on every keypress.",
        isCorrect: false,
        explanation: "Reloading the page destroys application state and user experience."
      },
      {
        id: "B",
        text: "Disable the user's mouse and keyboard drivers.",
        isCorrect: false,
        explanation: "Software throttling/debouncing limits event handler execution frequency cleanly."
      },
      {
        id: "C",
        text: "Use Throttling (limiting execution rate to at most once per time window) or Debouncing (delaying execution until a period of inactivity passes, e.g. lodash `debounce`/`throttle`).",
        isCorrect: true,
        explanation: "Correct. Throttling and debouncing prevent expensive event handlers (scroll, resize, search input keystrokes) from firing excessively on rapid user actions."
      },
      {
        id: "D",
        text: "Write a synchronous infinite `while` loop that sleeps for 5 seconds.",
        isCorrect: false,
        explanation: "Synchronous loops lock up the main thread and freeze the browser."
      }
    ],
    correctAnswer: "C",
    explanation: "If you use an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways, Throttling: Changes based on a time based frequency. For example, it can be used using _.throttle lodash function Debouncing: Publish changes after a period of inactivity. For example, it can be used using _.debounce lodash function RequestAnimationFrame throttling: Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to prevent a function from being called multiple times?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to prevent a function from being called multiple times?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-do-you-say-that-props-are-read-only",
    title: "How do you say that props are read only?",
    prompt: "How do you say that props are read only?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "function capital(amount, interest) {\n  return amount + interest;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React components must act like pure functions with respect to their props: they must never modify their incoming props, ensuring predictable top-down data flow.",
        isCorrect: true,
        explanation: "Correct. A core principle of React is that props are immutable inputs owned by the parent; modifying props in a child component causes unpredictable side effects and bugs."
      },
      {
        id: "B",
        text: "Because JavaScript throws a hardware CPU panic if a prop is edited.",
        isCorrect: false,
        explanation: "JavaScript allows object mutation; React enforces prop immutability by architectural convention and runtime warnings."
      },
      {
        id: "C",
        text: "Props are actually mutable and child components are encouraged to overwrite them.",
        isCorrect: false,
        explanation: "Modifying props in child components violates React's pure component contract."
      },
      {
        id: "D",
        text: "Because props are stored in read-only CD-ROM storage.",
        isCorrect: false,
        explanation: "Props are in-memory JavaScript objects."
      }
    ],
    correctAnswer: "A",
    explanation: "When you declare a component as a function or a class, it must never modify its own props. Let us take a below capital function, The above function is called, pure, because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying \"All React components must act like pure functions with respect to their props.\": ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you say that props are read only?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you say that props are read only?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-do-you-not-required-to-use-inheritance",
    title: "Why do you not required to use inheritance?",
    prompt: "Why do you not required to use inheritance?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React embraces composition over inheritance; props and `children` containment provide full flexibility to customize component look and behavior without deep, rigid class hierarchies.",
        isCorrect: true,
        explanation: "Correct. Decades of React development at Meta and across the industry showed that component composition and custom hooks solve all UI reuse cases without class inheritance."
      },
      {
        id: "B",
        text: "Because JavaScript does not have the `class` keyword.",
        isCorrect: false,
        explanation: "JavaScript supports ES6 classes, but React's architecture intentionally favors composition."
      },
      {
        id: "C",
        text: "Because inheritance causes computers to overheat.",
        isCorrect: false,
        explanation: "Composition provides clearer, more modular, and flexible code architecture than inheritance."
      },
      {
        id: "D",
        text: "Because class inheritance was banned by the W3C in 2018.",
        isCorrect: false,
        explanation: "W3C standardizes web platform APIs; React's preference for composition is an architectural design decision."
      }
    ],
    correctAnswer: "A",
    explanation: "In React, it is recommend using composition instead of inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component, s look and behavior in an explicit and safe way. Whereas, If you want to reuse non-UI functionality between components, it is suggested to extracting it into a separate JavaScript module. Later components import it and use that function, object, or a class, without extending it.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do you not required to use inheritance?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do you not required to use inheritance?.",
    hints: [
      "Reads walk the prototype chain; writes land on the object you assigned to. Mutating a value you read is not a write."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain"
  },
  {
    id: "react-can-i-use-web-components-in-react-application",
    title: "Can I use web components in react application?",
    prompt: "Can I use web components in react application?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React, { Component } from 'react';\nimport './App.css';\nimport '@vaadin/vaadin-date-picker';\nclass App extends Component {\n  render() {\n    return (\n      <div className=\"App\">\n        <vaadin-date-picker label=\"When were you born?\"></vaadin-date-picker>\n      </div>\n    );\n  }\n}\nexport default App;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Web Components only work with Angular, never React.",
        isCorrect: false,
        explanation: "Web Components are framework-agnostic and work across React, Vue, and Angular."
      },
      {
        id: "B",
        text: "No, Web Components crash the React Virtual DOM immediately.",
        isCorrect: false,
        explanation: "React natively supports rendering custom HTML elements."
      },
      {
        id: "C",
        text: "Only if the web browser is run inside an emulator.",
        isCorrect: false,
        explanation: "Web Components are a native W3C browser standard supported in all modern browsers."
      },
      {
        id: "D",
        text: "Yes, Web Components (Custom Elements) can be rendered directly in JSX `<custom-element />`, and React 19 provides seamless native support for custom element properties and events.",
        isCorrect: true,
        explanation: "Correct. React supports custom elements out of the box; in React 19, properties and custom event listeners attach directly to Web Components without manual ref wrappers."
      }
    ],
    correctAnswer: "D",
    explanation: "Yes, you can use web components in a react application. Even though many developers won't use this combination, it may require especially if you are using third-party UI components that are written using Web Components. For example, let us use Vaadin date picker web component as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I use web components in react application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I use web components in react application?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-dynamic-import",
    title: "What is dynamic import?",
    prompt: "What is dynamic import?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { add } from './math';\nconsole.log(add(10, 20));\n\nimport('./math').then((math) => {\n  console.log(math.add(10, 20));\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An import statement that changes variable names at runtime randomly.",
        isCorrect: false,
        explanation: "Dynamic `import()` loads ES modules asynchronously on demand."
      },
      {
        id: "B",
        text: "A deprecated CommonJS syntax replaced by `require()`.",
        isCorrect: false,
        explanation: "Dynamic `import()` is the modern ECMAScript standard for asynchronous module loading."
      },
      {
        id: "C",
        text: "An ECMAScript syntax `import('./module')` that returns a Promise resolving to the module, enabling on-demand asynchronous code-splitting in bundlers.",
        isCorrect: true,
        explanation: "Correct. Dynamic `import()` enables lazy loading of modules and components when needed (e.g. on route navigation or button click), shrinking initial bundle sizes."
      },
      {
        id: "D",
        text: "A way to import CSS stylesheets directly from Microsoft Word.",
        isCorrect: false,
        explanation: "Dynamic import is a standardized JavaScript module loading feature."
      }
    ],
    correctAnswer: "C",
    explanation: "The dynamic import() syntax is a ECMAScript proposal not currently part of the language standard. It is expected to be accepted in the near future. You can achieve code-splitting into your app using dynamic import. Let's take an example of addition, Normal Import Dynamic Import: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is dynamic import?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is dynamic import?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-is-it-ref-argument-available-for-all-functions-or-class",
    title: "Is the ref argument available in standard function or class components?",
    prompt: "Is the ref argument available in standard function or class components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`ref` can never be passed to any component in React.",
        isCorrect: false,
        explanation: "`ref` is passed via `forwardRef` in React 16-18 and as a standard prop in React 19."
      },
      {
        id: "B",
        text: "Yes, all functions in JavaScript always receive `ref` as their first argument.",
        isCorrect: false,
        explanation: "Standard JavaScript functions only receive arguments explicitly passed to them."
      },
      {
        id: "C",
        text: "In React 16-18, standard functions/classes do NOT receive a second `ref` argument unless wrapped in `React.forwardRef`; in React 19, `ref` is a standard prop on function components.",
        isCorrect: true,
        explanation: "Correct. Historically, `(props, ref)` was exclusive to `React.forwardRef` wrappers; React 19 simplified this by making `ref` a regular prop on function components (`({ ref, ...props })`)."
      },
      {
        id: "D",
        text: "The `ref` argument is only available on Linux computers.",
        isCorrect: false,
        explanation: "React component arguments are identical across all operating systems."
      }
    ],
    correctAnswer: "C",
    explanation: "Regular function or class components don, t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it ref argument available for all functions or class components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it ref argument available for all functions or class components?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-when-do-you-need-to-use-refs",
    title: "When do you need to use refs?",
    prompt: "When do you need to use refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To replace CSS stylesheets entirely.",
        isCorrect: false,
        explanation: "Refs do not replace CSS styling."
      },
      {
        id: "B",
        text: "To encrypt component props before sending over HTTPS.",
        isCorrect: false,
        explanation: "Refs store mutable in-memory references, unrelated to encryption."
      },
      {
        id: "C",
        text: "Managing focus, text selection, or media playback; measuring DOM layout dimensions (`getBoundingClientRect`); triggering imperative animations; or integrating with non-React DOM libraries.",
        isCorrect: true,
        explanation: "Correct. Refs serve as an escape hatch for imperative DOM interactions and mutable values that should not trigger re-renders when changed."
      },
      {
        id: "D",
        text: "For all state updates that should be displayed on screen.",
        isCorrect: false,
        explanation: "Visual updates should use `useState` so React triggers re-rendering."
      }
    ],
    correctAnswer: "C",
    explanation: "There are few use cases to go for refs, Managing focus, text selection, or media playback. Triggering imperative animations. Integrating with third-party DOM libraries.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When do you need to use refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When do you need to use refs?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-is-it-recommended-to-use-css-in-js-technique-in-react",
    title: "Is it recommended to use CSS In JS technique in React?",
    prompt: "Is it recommended to use CSS In JS technique in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React is unopinionated about styling; teams choose based on needs: CSS Modules / Tailwind for zero-runtime performance and SSR compatibility, or CSS-in-JS (styled-components) for dynamic runtime theme injection.",
        isCorrect: true,
        explanation: "Correct. React supports all styling paradigms; modern setups increasingly favor Tailwind CSS and CSS Modules due to Server Components and zero runtime overhead."
      },
      {
        id: "B",
        text: "CSS is completely banned in React applications.",
        isCorrect: false,
        explanation: "Styling is essential, supported through multiple flexible methodologies."
      },
      {
        id: "C",
        text: "React requires all styles to be written in inline `style` props only.",
        isCorrect: false,
        explanation: "Inline styles are limited (no pseudo-classes, media queries); CSS Modules, Tailwind, and CSS-in-JS are standard."
      },
      {
        id: "D",
        text: "CSS-in-JS is mandatory and the only allowed way to style React apps.",
        isCorrect: false,
        explanation: "React is flexible and unopinionated regarding styling solutions."
      }
    ],
    correctAnswer: "A",
    explanation: "React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate *.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it recommended to use CSS In JS technique in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it recommended to use CSS In JS technique in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-fetch-data-with-react-hooks",
    title: "How to fetch data with React Hooks?",
    prompt: "How to fetch data with React Hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import React, { useState, useEffect } from 'react';\nimport axios from 'axios';\n\nfunction App() {\n  const [data, setData] = useState({ hits: [] });\n\n  useEffect(async () => {\n    const result = await axios('http://hn.algolia.com/api/v1/search?query=react');\n\n    setData(result.data);\n  }, []);\n\n  return (\n    <ul>\n      {data.hits.map((item) => (\n        <li key={item.objectID}>\n          <a href={item.url}>{item.title}</a>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nexport default App;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Data fetching cannot be performed using React Hooks.",
        isCorrect: false,
        explanation: "`useEffect` and custom hooks are standard for client-side data fetching."
      },
      {
        id: "B",
        text: "Call an async function inside `useEffect` with an empty dependency array `[]` (or appropriate dependencies) and update local state with `useState`, or use data fetching libraries like TanStack Query.",
        isCorrect: true,
        explanation: "Correct. Defining an async function inside `useEffect` and updating state on response is the foundational hook fetching pattern, while TanStack Query provides production caching and deduplication."
      },
      {
        id: "C",
        text: "Execute synchronous `XMLHttpRequest` calls inside the component render body.",
        isCorrect: false,
        explanation: "Synchronous requests in render block UI painting and trigger infinite request loops."
      },
      {
        id: "D",
        text: "Make the top-level `useEffect` callback function itself `async` directly.",
        isCorrect: false,
        explanation: "`useEffect` callbacks cannot be `async` because they must return either a synchronous cleanup function or `undefined`."
      }
    ],
    correctAnswer: "B",
    explanation: "The effect hook called useEffect is used to fetch the data with axios from the API and to set the data in the local state of the component with the state hook, s update function. Let's take an example in which it fetches list of react articles from the API Remember we provided an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component. i.e, It fetches only for component mount.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to fetch data with React Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to fetch data with React Hooks?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-is-hooks-cover-all-use-cases-for-classes",
    title: "Do React Hooks cover all use cases of class components?",
    prompt: "Do React Hooks cover all use cases of class components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks cover 100% of all possible lifecycles including error boundaries.",
        isCorrect: false,
        explanation: "Error Boundaries still require class components implementing `componentDidCatch` / `getDerivedStateFromError`."
      },
      {
        id: "B",
        text: "Almost all, except Error Boundaries (`componentDidCatch` / `getDerivedStateFromError`) and the rare `getSnapshotBeforeUpdate`, which currently still require class components.",
        isCorrect: true,
        explanation: "Correct. Hooks cover state, effects, context, refs, and memoization; only Error Boundaries still require class lifecycle methods."
      },
      {
        id: "C",
        text: "Hooks cover 0% of class use cases.",
        isCorrect: false,
        explanation: "Hooks cover the vast majority of everyday stateful and lifecycle use cases."
      },
      {
        id: "D",
        text: "Hooks only work for styling buttons.",
        isCorrect: false,
        explanation: "Hooks manage all aspects of component logic and state."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks doesn't cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon getSnapshotBeforeUpdate and componentDidCatch lifecycles yet.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is Hooks cover all use cases for classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is Hooks cover all use cases for classes?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-what-is-the-stable-release-for-hooks-support",
    title: "What is the stable release for hooks support?",
    prompt: "What is the stable release for hooks support?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React 16.8.0 (released in February 2019) was the official stable release that introduced React Hooks across React DOM, React DOM Server, and React Test Renderer.",
        isCorrect: true,
        explanation: "Correct. React 16.8 introduced stable Hooks (`useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useDebugValue`)."
      },
      {
        id: "B",
        text: "Hooks are an experimental unreleased feature.",
        isCorrect: false,
        explanation: "Hooks have been the stable standard since React 16.8."
      },
      {
        id: "C",
        text: "React 0.14.0 in 2015.",
        isCorrect: false,
        explanation: "React 0.14 split React and ReactDOM, years before Hooks were invented."
      },
      {
        id: "D",
        text: "React 18.0.0 in 2022.",
        isCorrect: false,
        explanation: "React 18 introduced Concurrent features; Hooks were introduced earlier in React 16.8."
      }
    ],
    correctAnswer: "A",
    explanation: "React includes a stable implementation of React Hooks in 16.8 release for below packages React DOM React DOM Server React Test Renderer React Shallow Renderer: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the stable release for hooks support?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the stable release for hooks support?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-why-do-we-use-array-destructuring-square-brackets-notat",
    title: "Why do we use array destructuring (square brackets notation) in useState?",
    prompt: "Why do we use array destructuring (square brackets notation) in useState?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "var userStateVariable = useState('userProfile'); // Returns an array pair\nvar user = userStateVariable[0]; // Access first item\nvar setUser = userStateVariable[1]; // Access second item\n\nconst [user, setUser] = useState('userProfile');",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because array destructuring allows developers to name the state variable and setter function whatever they want (`const [count, setCount] = useState(0)`), rather than being locked into fixed object property names.",
        isCorrect: true,
        explanation: "Correct. Array destructuring provides naming flexibility so multiple `useState` calls in the same component can use distinct, descriptive variable names without renaming collisions."
      },
      {
        id: "B",
        text: "Because JavaScript arrays run 50x faster than JavaScript objects.",
        isCorrect: false,
        explanation: "Performance difference is negligible; the primary benefit is arbitrary naming flexibility."
      },
      {
        id: "C",
        text: "Because square brackets are the only brackets allowed in JSX.",
        isCorrect: false,
        explanation: "Array destructuring is standard JavaScript syntax used for naming convenience."
      },
      {
        id: "D",
        text: "Because object destructuring is forbidden in ECMAScript.",
        isCorrect: false,
        explanation: "Object destructuring is standard syntax, but would require fixed key names (e.g. `{ state, setState }`)."
      }
    ],
    correctAnswer: "A",
    explanation: "When we declare a state variable with useState, it returns a pair, an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead. For example, the array index access would look as follows: Whereas with array destructuring the variables can be accessed as follows:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do we use array destructuring (square brackets notation) in useState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do we use array destructuring (square brackets notation) in useState?.",
    hints: [
      "State is a snapshot. Setting it schedules a render, it does not change the variable you already read, so two updates from the same value collapse into one."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState"
  },
  {
    id: "react-what-are-the-sources-used-for-introducing-hooks",
    title: "What are the sources used for introducing hooks?",
    prompt: "What are the sources used for introducing hooks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Functional API experiments in `react-future`, community render prop patterns, state cells in DisplayScript, ReasonReact reducer components, and reactive subscriptions in Rx.",
        isCorrect: true,
        explanation: "Correct. The React team synthesized ideas from functional languages (ReasonML/OCaml), reactive streams, and community component patterns to design Hooks."
      },
      {
        id: "B",
        text: "The Windows 95 source code.",
        isCorrect: false,
        explanation: "Hooks evolved from web and functional UI experiments."
      },
      {
        id: "C",
        text: "Hooks were invented by a random number generator.",
        isCorrect: false,
        explanation: "Hooks were carefully researched and designed by the React core team."
      },
      {
        id: "D",
        text: "Ancient Egyptian hieroglyphics.",
        isCorrect: false,
        explanation: "Hooks were derived from functional programming and reactive UI research in computer science."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks got the ideas from several different sources. Below are some of them, Previous experiments with functional APIs in the react-future repository Community experiments with render prop APIs such as Reactions Component State variables and state cells in DisplayScript. Subscriptions in Rx. Reducer components in ReasonReact.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the sources used for introducing hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the sources used for introducing hooks?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-do-you-access-imperative-api-of-web-components",
    title: "How do you access imperative API of web components?",
    prompt: "How do you access imperative API of web components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Attach a `ref` to the Web Component DOM element (`<custom-element ref={elRef} />`) and call its imperative methods on `elRef.current` inside effects or event handlers.",
        isCorrect: true,
        explanation: "Correct. Interacting with imperative methods on custom elements requires acquiring a direct DOM reference via `useRef`."
      },
      {
        id: "B",
        text: "Imperative APIs cannot be called on Web Components in React.",
        isCorrect: false,
        explanation: "React refs provide full access to native and custom element DOM methods."
      },
      {
        id: "C",
        text: "Mutate `window.__CUSTOM_ELEMENT__` directly in the DOM.",
        isCorrect: false,
        explanation: "Global window mutation breaks component isolation; refs provide direct element access."
      },
      {
        id: "D",
        text: "Write raw machine code to the GPU.",
        isCorrect: false,
        explanation: "Imperative methods are called on the DOM node instance via JavaScript."
      }
    ],
    correctAnswer: "A",
    explanation: "Web Components often expose an imperative API to implement its functions. You will need to use a ref to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you access imperative API of web components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you access imperative API of web components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-do-browsers-understand-jsx-code",
    title: "Do browsers understand JSX code?",
    prompt: "Do browsers understand JSX code?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "No, browsers only execute standard JavaScript; JSX must be transpiled by a compiler (Babel, SWC, esbuild, TypeScript) into `React.createElement()` or `_jsx()` calls before running.",
        isCorrect: true,
        explanation: "Correct. JSX is a syntax extension for JavaScript, requiring build-time compilation into standard ECMAScript that browser engines can interpret."
      },
      {
        id: "B",
        text: "Yes, modern browsers natively execute JSX without any compilation.",
        isCorrect: false,
        explanation: "No web browser supports JSX natively; build tools compile JSX into standard JavaScript."
      },
      {
        id: "C",
        text: "Only Google Chrome can understand JSX; Safari and Firefox cannot.",
        isCorrect: false,
        explanation: "No browser executes JSX directly; all browsers run compiled JavaScript output."
      },
      {
        id: "D",
        text: "JSX is an image file format supported by all browsers.",
        isCorrect: false,
        explanation: "JSX is a JavaScript language extension for writing declarative UI markup."
      }
    ],
    correctAnswer: "A",
    explanation: "No, browsers can't understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do browsers understand JSX code?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do browsers understand JSX code?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-describe-about-data-flow-in-react",
    title: "Describe about data flow in react?",
    prompt: "Describe about data flow in react?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React uses bidirectional two-way binding where child components freely mutate parent state.",
        isCorrect: false,
        explanation: "React strictly uses one-way data flow; child components invoke callbacks rather than mutating parent state directly."
      },
      {
        id: "B",
        text: "React enforces unidirectional (one-way) data flow: data is passed down from parent to child via props, and updates flow up via callback functions triggering state changes.",
        isCorrect: true,
        explanation: "Correct. Unidirectional flow makes application state predictable, simplifies debugging, and avoids the tangled synchronization bugs of bidirectional two-way binding."
      },
      {
        id: "C",
        text: "Data can only flow from database servers directly to CSS stylesheets.",
        isCorrect: false,
        explanation: "Data flows through React's component hierarchy via props and state."
      },
      {
        id: "D",
        text: "Data flows randomly between unrelated components using global variables.",
        isCorrect: false,
        explanation: "Data flows predictably down the component hierarchy via props."
      }
    ],
    correctAnswer: "B",
    explanation: "React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Describe about data flow in react?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Describe about data flow in react?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-react-scripts",
    title: "What is react scripts?",
    prompt: "What is react scripts?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A browser extension for recording user clicks.",
        isCorrect: false,
        explanation: "`react-scripts` is a Node.js CLI build tool."
      },
      {
        id: "B",
        text: "A collection of Python scripts for machine learning.",
        isCorrect: false,
        explanation: "`react-scripts` is an npm package for bundling React web applications."
      },
      {
        id: "C",
        text: "A database migration tool for MySQL.",
        isCorrect: false,
        explanation: "`react-scripts` manages frontend build and development server scripts."
      },
      {
        id: "D",
        text: "The npm package used by Create React App containing pre-configured build scripts, Webpack configs, Babel presets, ESLint rules, and dev server setup.",
        isCorrect: true,
        explanation: "Correct. `react-scripts` abstracted away complex build configuration for Create React App projects (`react-scripts start`, `build`, `test`), now largely superseded by Vite and Next.js."
      }
    ],
    correctAnswer: "D",
    explanation: "The react-scripts package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The react-scripts start command sets up the development environment and starts a server, as well as hot module reloading.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is react scripts?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is react scripts?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-can-i-use-javascript-urls-in-react169",
    title: "Can I use javascript urls in react16.9?",
    prompt: "Can I use javascript urls in react16.9?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const companyProfile = {\n  website: \"javascript: alert('Your website is hacked')\",\n};\n// It will log a warning\n<a href={companyProfile.website}>More details</a>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Yes, `javascript:` URLs are the officially recommended way to handle button clicks.",
        isCorrect: false,
        explanation: "`javascript:` URLs are insecure anti-patterns; event handlers like `onClick` are standard."
      },
      {
        id: "B",
        text: "`javascript:` URLs run 100x faster than standard React event handlers.",
        isCorrect: false,
        explanation: "`javascript:` URLs create major security vulnerabilities and are blocked by modern React."
      },
      {
        id: "C",
        text: "`javascript:` URLs are encrypted automatically by the browser.",
        isCorrect: false,
        explanation: "They execute raw unescaped script strings in the page context, creating severe XSS risks."
      },
      {
        id: "D",
        text: "React 16.9 logged deprecation warnings for `javascript:` URLs (e.g. `<a href='javascript:alert(1)'>`) due to severe XSS security vulnerabilities, blocking them completely in subsequent releases.",
        isCorrect: true,
        explanation: "Correct. `javascript:` URLs are a notorious Cross-Site Scripting vector; React deprecated them in 16.9 and blocks them to protect applications from malicious URL injection."
      }
    ],
    correctAnswer: "D",
    explanation: "Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like <a href> and create a security hole. Remember that the future versions will throw an error for javascript URLs.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I use javascript urls in react16.9?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I use javascript urls in react16.9?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-how-do-you-make-sure-that-user-remains-authenticated-on",
    title: "How do you make sure that user remains authenticated on page refresh while using Context API State Management?",
    prompt: "How do you make sure that user remains authenticated on page refresh while using Context API State Management?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { loadUser } from '../actions/auth';\nstore.dispatch(loadUser());\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\nimport AuthState from './context/auth/AuthState';\n\nReactDOM.render(\n  <React.StrictMode>\n    <AuthState>\n      <App />\n    </AuthState>\n  </React.StrictMode>,\n  document.getElementById('root'),\n);\n\nconst authContext = useContext(AuthContext);\n\nconst { loadUser } = authContext;\n\nuseEffect(() => {\n  loadUser();\n}, []);\n\nconst loadUser = async () => {\n  const token = sessionStorage.getItem('token');\n\n  if (!token) {\n    dispatch({\n      type: ERROR,\n    });\n  }\n  setAuthToken(token);\n\n  try {\n    const res = await axios('/api/auth');\n\n    dispatch({\n      type: USER_LOADED,\n      payload: res.data.data,\n    });\n  } catch (err) {\n    console.error(err);\n  }\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "On initial app mount (`useEffect` in the root AuthProvider), read the stored token from secure storage (HttpOnly cookies / localStorage), validate it via an auth API call, and populate auth state before rendering protected routes.",
        isCorrect: true,
        explanation: "Correct. Persisting session tokens and re-hydrating authentication state in a top-level Provider mount effect preserves user authentication across page refreshes."
      },
      {
        id: "B",
        text: "Force the user to re-enter their username and password on every single page click.",
        isCorrect: false,
        explanation: "Re-authenticating on every click destroys user experience; token re-hydration preserves sessions."
      },
      {
        id: "C",
        text: "Store the user's plaintext password in the browser URL hash.",
        isCorrect: false,
        explanation: "Storing plaintext credentials in URLs creates extreme security vulnerabilities."
      },
      {
        id: "D",
        text: "Authentication persistence is impossible in single-page React applications.",
        isCorrect: false,
        explanation: "Re-hydrating authentication state from tokens on initial load is standard web security practice."
      }
    ],
    correctAnswer: "A",
    explanation: "When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed. App.js But while using Context API, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as loadUser action will be triggered on each re-render. index.js App.js loadUser: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you make sure that user remains authenticated on page refresh while using Context API State Management?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you make sure that user remains authenticated on page refresh while using Context API State Management?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-lifecycle-methods-as-effects",
    title: "Expressing the class lifecycle with useEffect",
    prompt: "Which useEffect corresponds to componentDidUpdate for a single value, without also firing on mount?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "useEffect",
      "lifecycle",
      "hooks"
    ],
    codeSnippet: "useEffect(() => {\n  console.log(\"mounted\");\n  return () => console.log(\"unmounted\");\n}, []);\n\nuseEffect(() => {\n  console.log(\"count changed\");\n}, [count]);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "useEffect(fn, []), the empty array means updates only",
        isCorrect: false,
        explanation: "An empty array is the opposite: it runs once on mount and never again."
      },
      {
        id: "B",
        text: "useEffect(fn, [count]), it fires only when count changes",
        isCorrect: false,
        explanation: "It also fires once after the initial mount, which componentDidUpdate does not."
      },
      {
        id: "C",
        text: "useEffect(fn) with no dependency array",
        isCorrect: false,
        explanation: "That runs after every render, including the first, closer to componentDidUpdate plus componentDidMount plus more."
      },
      {
        id: "D",
        text: "There is no exact equivalent; you need a ref to skip the first run",
        isCorrect: true,
        explanation: "Correct. Every effect runs after the initial mount, so 'updates only' requires tracking that yourself."
      }
    ],
    correctAnswer: "D",
    explanation: "useEffect(fn, []) maps cleanly onto componentDidMount, and its cleanup function onto componentWillUnmount. componentDidUpdate has no exact equivalent, because every effect also runs after the initial mount, useEffect(fn, [count]) fires on mount and on each change. Skipping the first run means holding a ref and checking it. That friction is deliberate: effects are meant to synchronise with external systems based on current values, not to re-enact lifecycle hooks.",
    interviewLine: "Effects synchronise, they don't sequence. There's no 'on update only' because an effect doesn't care whether this is the first render.",
    misconception: "Assuming a dependency array means 'only when this changes'. It means 'after every render where this changed', and the mount always counts.",
    hints: [
      "Does an effect with dependencies skip the very first render?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "react-refs-persist-without-rerender",
    title: "What separates a ref from state",
    prompt: "What is the defining difference between useRef and useState?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "useRef",
      "useState",
      "hooks"
    ],
    codeSnippet: "const inputRef = useRef<HTMLInputElement>(null);\nconst focus = () => inputRef.current?.focus();\n\nreturn <input ref={inputRef} />;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Refs are read-only once assigned",
        isCorrect: false,
        explanation: "ref.current is freely mutable, that is the point."
      },
      {
        id: "B",
        text: "Refs persist across renders but changing one does not trigger a re-render",
        isCorrect: true,
        explanation: "Correct. That is the whole distinction, same persistence, no subscription."
      },
      {
        id: "C",
        text: "Refs are reset on every render while state persists",
        isCorrect: false,
        explanation: "Both persist for the lifetime of the component; the ref object is stable."
      },
      {
        id: "D",
        text: "Refs can only hold DOM nodes",
        isCorrect: false,
        explanation: "A ref holds any mutable value. DOM nodes are just the most common use."
      }
    ],
    correctAnswer: "B",
    explanation: "Both useRef and useState survive re-renders. The difference is that React subscribes to state: setting it schedules a render. A ref is a plain mutable box, writing ref.current changes the value immediately and React never notices. That makes refs right for values the UI does not display: a DOM node to focus, a timer id to clear, the previous value of a prop. It also makes them wrong for anything the render output depends on, because nothing will re-render to show the change.",
    interviewLine: "Both survive renders; only state causes one. If the UI needs to react to it, it's state, otherwise it's a ref.",
    misconception: "Reaching for a ref to avoid re-renders on a value the UI actually displays, then wondering why the screen is stale.",
    hints: [
      "Both persist. What does React do differently when each one changes?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  }
];
