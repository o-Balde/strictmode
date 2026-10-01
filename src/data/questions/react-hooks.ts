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
    interviewLine: "I describe a class component as an ES6 class extending React.Component that manages state through this.state and this.setState and ties logic to lifecycle methods, whereas I write function components as plain functions using Hooks like useState and useEffect for the same work, which also frees me from binding this in handlers.",
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
    interviewLine: "I explain that in a class component React calls componentDidMount after the first commit, componentDidUpdate after each later render, and componentWillUnmount before removal, and that in a function component I collapse all three into one useEffect whose dependency array and cleanup cover the same phases.",
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
    interviewLine: "I treat useEffect as post-paint: React commits the DOM, the browser paints, then my callback fires. Before a re-run the previous cleanup runs, and because the dependency array is compared with Object.is, I know a fresh object reference each render re-triggers the effect even when its fields are identical.",
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
      code: "import { makeAutoObservable } from \"mobx\";\nimport { useObserver } from \"mobx-react-lite\";\n\nclass Cart {\n  total = 0;\n  constructor() {\n    makeAutoObservable(this);\n  }\n  add() {\n    this.total += 1;\n  }\n}\n\nconst cart = new Cart();\n\n// Reading cart.total inside useObserver IS the subscription:\nfunction CartBadge() {\n  return useObserver(() => <span>{cart.total}</span>);\n}\n\nexport default function App() {\n  return (\n    <><CartBadge /><button onClick={() => cart.add()}>Add</button></>\n  );\n}"
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
    interviewLine: "I think of a custom hook as just a function that composes built-in hooks; I use the `use` prefix so the linter can enforce that every hook call inside it stays unconditional and top-level, keeping the call order stable between renders.",
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
    interviewLine: "I write a custom hook as a function starting with `use` that composes built-in hooks; I rely on the prefix as a naming contract so the linter enforces call-order stability, and every component that calls it gets its own isolated state and effects.",
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
    interviewLine: "I point out that React is scoped to the view layer on purpose: I pick companion libraries for routing, state, and data fetching myself, and I treat the JSX-plus-bundler pipeline as a one-time onboarding cost rather than an ongoing limitation.",
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
    interviewLine: "I describe a function component as a function that takes props and uses Hooks like `useState` and `useEffect` for state and side effects, while a class component extends `React.Component`, keeps state in `this.state`, and ties side effects to lifecycle methods like `componentDidMount`.",
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
    interviewLine: "I call it prop drilling when I forward a prop through intermediate components that never consume it, just to reach a deep child \u2014 it works, but I avoid it because it couples unrelated components and makes refactoring painful, since every link has to declare a prop it never reads.",
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
      code: "function Dashboard() {\n  const userId = \"u_42\";\n  return (\n    <Page userId={userId}>\n      <Content userId={userId}>\n        <Panel userId={userId}>\n          <UserBadge userId={userId} />\n        </Panel>\n      </Content>\n    </Page>\n  );\n}\n\ntype Mid = { children: React.ReactNode; userId: string };\n\n// Page, Content and Panel accept userId but never read it:\nfunction Page({ children }: Mid) { return <main>{children}</main>; }\nfunction Content({ children }: Mid) { return <section>{children}</section>; }\nfunction Panel({ children }: Mid) { return <div className=\"panel\">{children}</div>; }\n\nfunction UserBadge({ userId }: { userId: string }) {\n  return <span>user {userId}</span>;\n}"
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
        text: "Git commit hooks: shell scripts in `.git/hooks` that version control runs before a commit or push lands.",
        isCorrect: false,
        explanation: "Tempting because the word \"hook\" is shared, but git hooks are shell scripts in `.git/hooks` (pre-commit, pre-push) that the version-control tool runs; they have no connection to the React library or its rendering model."
      },
      {
        id: "B",
        text: "Functions introduced in React 16.8 that give function components state, lifecycle logic, context, and refs without class components.",
        isCorrect: true,
        explanation: "Correct. Hooks are React's API for giving function components access to state (useState), side effects (useEffect), context (useContext), and mutable refs (useRef), removing the need for a class and its lifecycle methods."
      },
      {
        id: "C",
        text: "CSS pseudo-classes such as `:hover` and `:active` that the browser's style engine applies to elements.",
        isCorrect: false,
        explanation: "A wordplay trap: pseudo-classes like `:hover` are CSS selectors evaluated by the browser's style engine; they are not JavaScript functions and have no runtime relationship to React's component model."
      },
      {
        id: "D",
        text: "Browser extension plugins that hook into Chrome DevTools to profile and inspect network traffic.",
        isCorrect: false,
        explanation: "Conflates the English word \"hook\" with a specific React API. Browser extensions are separate packages loaded by the browser; they do not live inside the `react` npm package or participate in its render cycle."
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
    interviewLine: "I describe hooks as plain functions that call into React's internal fiber API to register state, effects, or context for the current component instance, so I get everything a class used to provide without inheritance or `this`.",
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
    interviewLine: "I lean on class lifecycle methods like `componentDidMount`, `shouldComponentUpdate`, and `componentWillUnmount`, which the renderer calls automatically at mount, update, and unmount, giving me deterministic places to run side effects and clean them up.",
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
    interviewLine: "I remember React's built-in hooks as a small fixed set \u2014 `useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`, `useReducer`, `useLayoutEffect` \u2014 and I treat everything else as a custom hook: a function starting with `use` that composes those built-ins to reuse stateful logic.",
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
        text: "No, because `useState` cannot store objects or arrays, so any non-trivial shape forces teams onto Redux.",
        isCorrect: false,
        explanation: "Tempting if you picture `useState` as a single-value cell, but it accepts any JavaScript value, including nested objects and arrays. The pressure that pushes teams toward Redux is re-render granularity across many components, not the data type the hook can hold."
      },
      {
        id: "B",
        text: "Yes, because the Context API is far faster than Redux under high-frequency updates even without selectors.",
        isCorrect: false,
        explanation: "Tempting if you assume the built-in API must outperform a third-party library, but an unoptimised Context provider re-renders every consumer on each update, while Redux's `useSelector` lets each component subscribe to only the slice it reads."
      },
      {
        id: "C",
        text: "For moderate complexity, `useReducer` and `useContext` handle global state, but Redux adds devtools, middleware, and selector optimizations for large apps.",
        isCorrect: true,
        explanation: "Correct. `useReducer` + `useContext` covers the core state-management job for moderate apps, while Redux adds the tooling layer\u2014devtools, middleware, selector-based subscriptions\u2014that keeps large codebases debuggable and performant."
      },
      {
        id: "D",
        text: "Yes, because installing React Hooks automatically removes the Redux package from the project.",
        isCorrect: false,
        explanation: "No installation of any package uninstalls another. In practice React and Redux coexist: the `react-redux` package exposes `useSelector` and `useDispatch`, which are themselves React hooks wrapping a Redux store."
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
        text: "Class components are automatically transpiled to WebAssembly by the browser engine before execution.",
        isCorrect: false,
        explanation: "Tempting if you conflate transpilation with a runtime change, but React components\u2014class or function\u2014execute as ordinary JavaScript in the browser's V8, SpiderMonkey, or JavaScriptCore engine. No WebAssembly step is involved in either case."
      },
      {
        id: "B",
        text: "Class components extend `React.Component` with `this.state` and lifecycle methods; function components are plain functions using Hooks for state and effects.",
        isCorrect: true,
        explanation: "Correct. This captures the structural difference: class components rely on the `this`-based state model and a fixed set of lifecycle callbacks, while function components express the same capabilities through hooks like `useState` and `useEffect`, which compose more naturally into custom hooks."
      },
      {
        id: "C",
        text: "Class components render on the server while function components are restricted to the browser.",
        isCorrect: false,
        explanation: "Tempting if you associate the older class-based codebase with server rendering, but SSR in Next.js or `renderToString` treats both component types identically; neither is restricted to one environment."
      },
      {
        id: "D",
        text: "Function components are limited to rendering and cannot manage state or run side effects.",
        isCorrect: false,
        explanation: "Tempting if you learned React before 16.8, when function components were indeed stateless. Since `useState` and `useEffect` landed, function components manage state and side effects with the same guarantees as class components."
      }
    ],
    correctAnswer: "B",
    explanation: "Class components are ES6 classes that extend `React.Component`. They store mutable state in `this.state`, read props via `this.props`, and spread logic across lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. Function components are plain functions that receive `props` as an argument and return JSX. They manage state with `useState` and run side effects with `useEffect`, keeping all related logic in one local scope.\n\nIn practice this means a class component that fetches data, updates state, and cleans up an interval must split that work across three separate methods, and reusing the logic requires a higher-order component or a render prop. The same behaviour in a function component is a single `useEffect` call, and extracting it into a custom hook is one function export. Hooks also remove the `this` binding pitfalls that make class callbacks error-prone.\n\nBoth styles render identically on the server and in the browser, and React 19 still supports class components for legacy code. The constraint to remember: hooks can only be called at the top level of a function component, so you cannot use them inside a class's lifecycle methods or behind a condition.",
    interviewLine: "I note that class components use `this.state` and a fixed set of lifecycle methods, while I write function components as plain functions calling hooks like `useState` and `useEffect` for the same state and side-effect capabilities with less ceremony and easier logic extraction.",
    misconception: "Function components are a stripped-down, stateless alternative, so complex UIs still require classes. Hooks were added to make function components as capable as classes, not to replace them with a weaker tool.",
    hints: [
      "Look at where state lives: `this.state` in a class versus a value returned by `useState` in a function.",
      "Ask which model lets you extract a fetch-and-clean-up pattern into a reusable function without wrapping the component in a higher-order component.",
      "Both styles work in SSR and in the browser, so the difference is not about where they execute."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how `useState` and `useEffect` replace `this.state` and the `componentDidMount`/`componentWillUnmount` pair in a single local scope.",
      language: "tsx",
      code: "function Timer({ interval }: { interval: number }) {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => setSeconds((s) => s + 1), interval);\n    return () => clearInterval(id);\n  }, [interval]);\n\n  return <span>{seconds}s</span>;\n}"
    }
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
        text: "Components that are forbidden from rendering any DOM elements or text content, returning only `null`.",
        isCorrect: false,
        explanation: "Tempting if you read 'stateless' as 'does nothing,' but the word 'state' refers to internal mutable data, not to the component's ability to produce output. A stateless component renders exactly as much markup as its props describe."
      },
      {
        id: "B",
        text: "Components that derive their full rendered output from incoming props without holding or managing internal state.",
        isCorrect: true,
        explanation: "Correct. The defining trait is the absence of `useState` or `useReducer` inside the component; given identical props the output is deterministic and there is no internal data to track or reset."
      },
      {
        id: "C",
        text: "Components that must be declared in files carrying a dedicated `.stateless` extension.",
        isCorrect: false,
        explanation: "Tempting if you picture 'stateless' as a file format or compiler directive, but it is a behavioural description of what the component does, not where it lives. There is no `.stateless` extension or special declaration syntax in React or TypeScript."
      },
      {
        id: "D",
        text: "Components that throw a runtime error the moment they are rendered in any modern browser.",
        isCorrect: false,
        explanation: "Tempting if you associate 'stateless' with 'deprecated' or 'legacy,' but stateless components are the most common pattern in modern React and render without issue in every current browser."
      }
    ],
    correctAnswer: "B",
    explanation: "Stateless components are function components that derive their entire rendered output from incoming props without calling `useState` or `useReducer` internally. The same props always produce the same JSX because there is no hidden mutable data shifting between renders.\n\nIn practice this makes them trivial to test: pass a set of props, assert on the returned tree, and there is no state to reset or mock. They are the default shape for leaf nodes in a component tree \u2014 a `Button`, a `Label`, a `Card` header \u2014 where the parent owns the data and the child only displays it.\n\nThe boundary is behavioural, not syntactic: a function component that calls `useState` is stateful, and a class component that never touches `this.state` is effectively stateless. With hooks, most components are functions, so 'stateless' now mostly means 'no `useState` or `useReducer` call inside this component.'",
    interviewLine: "I call a component stateless when its render output is a pure function of its props \u2014 I never call `useState` or `useReducer` in it, so the same input always produces the same JSX and there is no internal data to reset between renders.",
    misconception: "Reading 'stateless' as a restriction on what a component can render or where it can live, rather than recognising it as a description of whether the component calls `useState` or `useReducer` internally.",
    hints: [
      "Look at what the component receives versus what it stores internally.",
      "Ask: does this component call `useState` or `useReducer`? If not, what does it do with the data it receives?",
      "The word 'state' here refers to React's `useState` hook, not to the absence of DOM output."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `Badge` never calls `useState`; all of its data arrives through props from the stateful parent.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Badge({ count, label }) {\n  return (\n    <span className=\"badge\">\n      {label}: {count}\n    </span>\n  );\n}\n\nfunction Dashboard() {\n  const [openTickets, setOpenTickets] = useState(12);\n  return (\n    <section>\n      <h2>Support</h2>\n      <Badge count={openTickets} label=\"Open\" />\n      <button onClick={() => setOpenTickets((c) => c + 1)}>\n        Add ticket\n      </button>\n    </section>\n  );\n}"
    }
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
        text: "Components that persist data in the browser's cookie storage so values survive page reloads.",
        isCorrect: false,
        explanation: "Tempting if you equate \"state\" with \"saved data\", but React state lives in memory on the component instance, not in `document.cookie` or `localStorage`. Cookies are a browser storage API; React never reads or writes them on your behalf."
      },
      {
        id: "B",
        text: "Components that declare internal state with `useState`, `useReducer`, or `this.state` and re-render when it changes.",
        isCorrect: true,
        explanation: "Correct. A component is stateful when it declares its own state with `useState`, `useReducer`, or `this.state`; React tracks that value per instance and re-renders the component whenever it changes."
      },
      {
        id: "C",
        text: "Components that run their logic exactly once during the initial server-side render and never update.",
        isCorrect: false,
        explanation: "This confuses a one-time server initialisation step with the component's client-side lifecycle. A stateful component renders, re-renders, and updates throughout the user's session; \"executing once at boot\" does not describe any React component behaviour."
      },
      {
        id: "D",
        text: "Components that are isolated from their parent and cannot receive or read any props.",
        isCorrect: false,
        explanation: "Props and state are independent axes. A stateful component routinely receives props while also managing its own internal value; the defining trait is state ownership, not the absence of props."
      }
    ],
    correctAnswer: "B",
    explanation: "A stateful component is one that declares internal state \u2014 with `useState`, `useReducer`, or `this.state` in a class component \u2014 and React re-renders it whenever that state value changes. The component does not call `render` or `forceUpdate` manually; React's reconciliation handles the re-render automatically when it detects a state update.\n\nIn the example, clicking the button calls `setCount(count + 1)`. React schedules a re-render of `StatefulComponent`, the function body runs again with the new `count`, and the `<p>` element reflects the updated number. Without that state declaration the component would be stateless: same props in, same output out, every render.\n\nState is per-instance and in-memory. Two sibling instances of the same stateful component each keep their own `count`. State is also independent of props: a stateful component can still receive and use props, and a stateless component can still receive props. The defining distinction is ownership \u2014 state is set and changed by the component itself, while props are set by the parent.",
    interviewLine: "I call a component stateful when it declares its own state with `useState` or `useReducer`; React tracks that value per instance and re-renders whenever I change it, which is what makes my output reactive to interactions.",
    misconception: "Thinking \"stateful\" means the component persists data outside React \u2014 in cookies, `localStorage`, or a server \u2014 rather than holding an in-memory value that React tracks per instance and uses to trigger re-renders.",
    hints: [
      "Look at what the component declares inside itself versus what it receives as arguments.",
      "Ask what causes the component to produce different output on the render after the button click.",
      "State and props are independent: a component can own state and still accept props, or accept props and own no state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `Cart` is stateful (it owns `count` via `useReducer`) yet also receives `items` as a prop \u2014 the two are independent.",
      language: "tsx",
      code: "function Cart({ items }: { items: string[] }) {\n  const [count, dispatch] = React.useReducer(\n    (state: number, action: { type: \"add\" }) =>\n      action.type === \"add\" ? state + 1 : state,\n    0\n  );\n\n  return (\n    <div>\n      <p>Cart has {items.length} items</p>\n      <p>Added {count} times</p>\n      <button onClick={() => dispatch({ type: \"add\" })}>\n        Add to cart\n      </button>\n    </div>\n  );\n}"
    }
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
        explanation: "Correct. Hooks replace class lifecycles and HOCs or render props with composable functions that keep related state, effects, and cleanup in one place, and because no wrapper component is needed the tree stays flat."
      },
      {
        id: "B",
        text: "Hooks automatically share state between all components that call the same custom hook, removing the need for context or prop drilling.",
        isCorrect: false,
        explanation: "Tempting because a custom hook looks like a shared variable, but each call to a hook creates its own independent state; two components calling `useCounter()` do not see the same number. Shared state still requires context, a store, or prop passing."
      },
      {
        id: "C",
        text: "Hooks replace the virtual DOM reconciliation step, so React writes directly to the real DOM on every render without diffing.",
        isCorrect: false,
        explanation: "Tempting if you conflate less boilerplate with faster rendering, but hooks manage state and side effects within a component; the reconciliation and diffing of the virtual DOM is a separate React internal that hooks do not touch."
      },
      {
        id: "D",
        text: "Hooks can be called conditionally inside `if` or `for` blocks to adapt behaviour to props, giving more flexibility than lifecycle methods.",
        isCorrect: false,
        explanation: "Tempting because conditional logic feels natural, but React identifies hooks by their call order in the component; skipping or reordering a call inside a branch desynchronises the internal state list. The rules of hooks exist precisely to keep that order stable."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks let a function component call `useState`, `useEffect`, and other React APIs directly, and they let you extract that logic into a named function (a custom hook) that any other component can call. No class inheritance, no higher-order component, no render prop \u2014 you compose hooks sequentially inside the component body.\n\nIn practice this removes two recurring pain points. First, sharing stateful logic no longer means wrapping a component in an HOC or threading a render prop through the tree, so the component tree stays flat and the logic lives in one file. Second, function components have no `this`, so the entire class of binding bugs (`this` is undefined, stale closure over `this`, lost context after passing a method as a callback) simply does not arise.\n\nThe constraint an interviewer will probe next: hooks must be called unconditionally at the top level of the component or custom hook. React tracks them by call order, so calling one inside a loop, condition, or nested callback breaks the internal bookkeeping. That rule is what makes the flat-tree benefit possible \u2014 you add a hook call instead of a wrapper component, but you commit to a stable call order.",
    interviewLine: "Hooks let me pull stateful logic into a named function and call it from any component, so I skip the HOC wrapper, avoid `this` binding entirely, and keep related state and effects in one place instead of scattering them across lifecycle methods.",
    misconception: "Hooks are treated as a magic layer that removes the need to understand component state, effect lifecycles, or the JavaScript runtime they execute in, rather than as a way to organise that same logic more cleanly.",
    hints: [
      "Think about what you had to do before hooks to share a piece of stateful logic between two components.",
      "What does `this` binding have to do with class components, and does a function component even have a `this` to bind?",
      "Hooks are plain function calls that run in the same JavaScript runtime as everything else around them."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useDebounce` bundles state, an effect, and its cleanup into one callable unit that `SearchBar` uses without any wrapper component.",
      language: "tsx",
      code: "function useDebounce(value: string, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}\n\nexport function SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debounced = useDebounce(query);\n\n  useEffect(() => {\n    if (debounced) fetchResults(debounced);\n  }, [debounced]);\n\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}"
    }
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
        text: "A single component can call no more than two hooks in total.",
        isCorrect: false,
        explanation: "Tempting if you confuse hooks with a small fixed set of lifecycle methods, but there is no numeric cap. A component can call `useState` twenty times and `useEffect` five times as long as every call is unconditional and in the same order on every render."
      },
      {
        id: "B",
        text: "Hooks must always be wrapped in `try/catch` blocks to catch initialization errors.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as async initializers that might throw, but hooks are synchronous function calls. Wrapping them in `try/catch` does not alter their position in the hook list, and React has no per-hook error-recovery path."
      },
      {
        id: "C",
        text: "Call hooks only at the top level, never in loops or conditions, and only from components or custom hooks.",
        isCorrect: true,
        explanation: "Correct. React matches each hook to its stored state by call order, so a stable, unconditional sequence is the only way to guarantee the right state lands on the right hook every render."
      },
      {
        id: "D",
        text: "Hooks must be declared in dedicated `.hook` files that are compiled by SWC.",
        isCorrect: false,
        explanation: "Tempting if you treat hooks as a language feature requiring special tooling, but a hook is just a function whose name starts with `use`. It can live in any `.ts`, `.tsx`, or `.js` file and be imported like any other export."
      }
    ],
    correctAnswer: "C",
    explanation: "React tracks hooks by their position in the call sequence. On every render, React walks an internal linked list of hook objects in the exact order they were called, matching each call to its stored state by index. The two rules that make this work: call hooks only at the top level of a function (never inside loops, conditionals, or nested callbacks), and call them only from function components or custom hooks.\n\nViolating the first rule breaks the index mapping. If a component conditionally skips a `useState` call, every hook after it shifts down by one slot, and the next render hands the wrong state to the wrong hook. The component does not crash immediately; it silently reads a stale or unrelated value, which is harder to debug than an error.\n\nThe second rule is structural: custom hooks are just functions that call other hooks, so they must themselves be invoked from a component render where React can attach the hook list. Calling a hook from a plain utility function or an event handler outside a component has no fiber to bind to, and React cannot register or retrieve the state.",
    interviewLine: "I remember that React stores hook state in a linked list keyed by call position, not by name, which is why I keep the call order identical every render and only call hooks where React has a fiber to attach to. A conditional `useState` does not throw \u2014 it shifts every later hook's index and hands it the wrong state.",
    misconception: "Treating hooks as named, self-identifying APIs rather than position-based slots. Because React matches hooks to state by call index, not by the hook's name, any change in call order or count silently corrupts every hook after the point of change.",
    hints: [
      "Think about how React would know which `useState` call corresponds to which piece of state if a component had three of them.",
      "Ask what happens to the index of every hook after a conditional call when that condition flips between renders.",
      "The two rules protect a single structural invariant about how hook state is stored and retrieved; they are not arbitrary style preferences."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the conditional `useState` shifts the index of the `useEffect` hook when `paused` changes between renders.",
      language: "tsx",
      code: "import { useState, useEffect } from 'react';\n\nfunction Timer({ paused }: { paused: boolean }) {\n  const [count, setCount] = useState(0);\n\n  if (paused) {\n    const [elapsed, setElapsed] = useState(0);\n  }\n\n  // This hook's index shifts when the conditional hook above disappears.\n  useEffect(() => {\n    const id = setInterval(() => setCount(c => c + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return (\n    <div>\n      <span>{count}</span>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n    </div>\n  );\n}"
    }
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
        text: "Both hooks run after React commits DOM changes, but `useLayoutEffect` executes synchronously before the browser paints, while `useEffect` is deferred until after the paint.",
        isCorrect: true,
        explanation: "Correct. Both hooks fire after React commits DOM changes, but `useLayoutEffect` executes before the browser is allowed to paint, so layout reads and writes land in the same frame; `useEffect` is deferred past the paint and cannot adjust what the user just saw."
      },
      {
        id: "B",
        text: "`useEffect` only works in class components, while `useLayoutEffect` only works in function components.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with the component type that introduced them, but both are React Hooks callable only inside function components or custom hooks; neither has a class-component variant."
      },
      {
        id: "C",
        text: "`useLayoutEffect` runs on a fixed timer, firing roughly ten seconds after `useEffect` has completed.",
        isCorrect: false,
        explanation: "No fixed delay separates the two. `useLayoutEffect` fires first, synchronously before the paint, and `useEffect` fires later, after the browser has painted the frame; the gap is one paint cycle, not a timer."
      },
      {
        id: "D",
        text: "`useEffect` is offloaded to the GPU compositor thread, while `useLayoutEffect` runs on the main CPU thread.",
        isCorrect: false,
        explanation: "Both execute as JavaScript on the main thread (CPU). The distinction is timing relative to the browser paint, not which hardware unit runs the code."
      }
    ],
    correctAnswer: "A",
    explanation: "Both hooks run after React commits DOM mutations to the real document. The difference is what the browser does next. `useLayoutEffect` callbacks execute synchronously, and only after they finish does the browser paint the new frame. `useEffect` callbacks are scheduled for after that paint, so the user already sees the updated layout when the effect body runs.\n\nIn practice this matters when an effect reads geometry and writes a style. If you call `ref.current.offsetWidth` inside `useEffect`, the browser has already painted with the old layout, so the measurement can be stale and the follow-up `setState` causes a second visible repaint. Moving the same code into `useLayoutEffect` lets React re-render with the corrected value before the frame ships, eliminating the flicker.\n\nThe trade-off is that `useLayoutEffect` blocks the paint, so heavy work there causes visible jank. For subscriptions, data fetching, or any effect that does not need to synchronise with layout, `useEffect` is the safer default. In server-rendered Next.js pages, `useLayoutEffect` emits a warning because there is no DOM to synchronise with; use `useEffect` or guard with a `typeof window !== 'undefined'` check.",
    interviewLine: "Both hooks run after React commits DOM changes, but `useLayoutEffect` fires synchronously before the browser paints, so I reach for it when I need to read geometry and adjust a style in the same frame; `useEffect` is deferred past the paint, which is the right default for subscriptions and data fetching.",
    misconception: "Treating the two hooks as different kinds of side effect rather than the same post-commit mechanism placed at different points in the render-to-paint pipeline.",
    hints: [
      "Both hooks run after React has committed DOM changes \u2014 the question is what the browser does in the gap before the next visible frame.",
      "Ask which hook the browser must wait for before it is allowed to paint, and what happens if you read `offsetWidth` in the other one.",
      "If the effect reads a measurement and calls `setState`, which hook lets React re-render before the user ever sees the intermediate value?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice that `setHeight` inside `useLayoutEffect` triggers a synchronous re-render before the browser paints, so the user never sees a frame where the text reads 0px.",
      language: "tsx",
      code: "import { useLayoutEffect, useRef, useState } from 'react';\n\nfunction ResizeTracker() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const [height, setHeight] = useState(0);\n\n  useLayoutEffect(() => {\n    const el = containerRef.current;\n    if (!el) return;\n    setHeight(el.offsetHeight);\n    const observer = new ResizeObserver(([entry]) => {\n      setHeight(entry.contentRect.height);\n    });\n    observer.observe(el);\n    return () => observer.disconnect();\n  }, []);\n\n  return (\n    <div>\n      <div ref={containerRef} style={{ height: 200, border: '1px solid #ccc' }} />\n      <p>Measured: {height}px</p>\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you associate the word \"effect\" with off-main-thread work, but React effects always run on the main JavaScript thread after paint. The dependency array has no bearing on threading or concurrency."
      },
      {
        id: "B",
        text: "Controls the size of the JavaScript bundle downloaded from the CDN.",
        isCorrect: false,
        explanation: "This confuses a runtime execution signal with a build-time bundler configuration. The array is evaluated by React at render time in the browser; it never reaches the bundler or the network layer."
      },
      {
        id: "C",
        text: "Encrypts the effect function with AES-256 before running.",
        isCorrect: false,
        explanation: "There is no encryption step anywhere in React's effect scheduling. The array is a plain value list React reads to decide whether to call the callback again; it does not transform the function itself."
      },
      {
        id: "D",
        text: "Controls when the effect re-runs based on shallow comparison of its values.",
        isCorrect: true,
        explanation: "Correct. React performs shallow `Object.is` comparisons on each dependency between consecutive renders and re-executes the effect (after cleanup) only when at least one value differs."
      }
    ],
    correctAnswer: "D",
    explanation: "The dependency array tells React when to re-execute the effect callback. After each render, React compares the current array to the previous one value by value using `Object.is`. If every value is the same, it skips the effect entirely. If any value differs, it calls the cleanup function returned by the previous effect (if any), then runs the new effect.\n\nIn practice this means: omitting the array makes the effect fire after every render, so subscriptions are torn down and re-created constantly. An empty array `[]` means the effect runs once after the first render and its cleanup runs on unmount. Listing specific values, like `[roomId]`, narrows re-execution to only the renders where that value actually changed.\n\nThe comparison is shallow. A new object or array reference triggers re-execution even if its contents are identical, which is why you often see `useMemo` or primitive destructuring used to stabilise the value before it enters the array.",
    interviewLine: "I treat the dependency array as React's re-execution gate: it `Object.is`-compares each value against the previous render, and only when one differs does it run cleanup then the new effect. That's why I watch for unstable object references, since one makes my effect fire every render even when its contents never changed.",
    misconception: "The array is treated as a static list of \"variables this function reads\" (like a closure capture list) rather than as a list of values React re-compares on every render to decide whether to call the callback again.",
    hints: [
      "Think about what React does between two consecutive renders with that array in hand.",
      "React compares each value to its previous-render counterpart. What comparison does it use, and what happens when one value is a new reference?",
      "This is a pure runtime scheduling signal for the effect callback; it does not touch the bundler, the network, or the thread model."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice that the effect re-runs only when `roomId` changes referentially, not on every render of the parent, and the old socket is closed before the new one opens.",
      language: "tsx",
      code: "function ChatRoom({ roomId }: { roomId: string }) {\n  const [messages, setMessages] = useState<string[]>([]);\n\n  useEffect(() => {\n    const socket = connect(roomId);\n    socket.on(\"message\", (text: string) =>\n      setMessages((prev) => [...prev, text])\n    );\n    return () => socket.close();\n  }, [roomId]);\n\n  return (\n    <ul>\n      {messages.map((text, i) => (\n        <li key={i}>{text}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        explanation: "Tempting if you think any mutable value should live in a ref, but if the UI must display the new value, only `useState` mutations schedule a re-render; a ref write is invisible to React and the screen stays stale."
      },
      {
        id: "B",
        text: "A hook that forces the entire component tree to re-render whenever `.current` is modified.",
        isCorrect: false,
        explanation: "Tempting if you treat every mutable container as reactive, but `.current` is a plain JavaScript property with no subscription mechanism; writing to it does not call `setState` or any scheduling function, so nothing re-renders."
      },
      {
        id: "C",
        text: "A stable `{ current }` object across renders; mutating it never triggers a re-render. Used for DOM nodes, timers, and previous values.",
        isCorrect: true,
        explanation: "Correct. `useRef` hands back the same `{ current }` object every render, and writing to `.current` is a silent property assignment that React never sees, making it the right tool for values the UI does not need to react to."
      },
      {
        id: "D",
        text: "A hook used exclusively for executing SQL database migrations in client browsers.",
        isCorrect: false,
        explanation: "A ref is an in-memory object holding a reference; it has no connection to databases, migrations, or any I/O beyond whatever code you write into the effect that reads `.current`."
      }
    ],
    correctAnswer: "C",
    explanation: "useRef returns a stable object with a single mutable property, `.current`, initialized to the argument you pass. Because React hands back the same object reference on every render and never observes writes to `.current`, mutating it is a plain property assignment \u2014 no re-render is scheduled.\n\nIn the example, `inputEl.current.focus()` works because after mount the ref holds the live DOM node. Storing a timer ID or a previous value in `.current` avoids the extra render that `useState` would trigger for a value the UI does not display.\n\nOne edge case: `useRef(null)` means `.current` is `null` until the ref callback runs after the element mounts, so reading it during the first render pass gives `null`. Also, the initial argument is only read once; passing a different value on a later render does not reset `.current`.",
    interviewLine: "useRef gives me a stable `{ current }` object that survives re-renders without scheduling one, so I use it for DOM node access, timer IDs, and tracking previous values where the UI does not need to react to the change.",
    misconception: "Learners treat `useRef` as a slower `useState` or expect mutating `.current` to be reactive, so they either reach for a ref when the UI must update (and the screen goes stale) or expect a ref write to cause a re-render (and it never does).",
    hints: [
      "In the code, `inputEl.current.focus()` runs inside an effect \u2014 what does `.current` actually hold, and when does it stop being `null`?",
      "Ask yourself: does writing to `.current` call any React scheduling function, or is it a plain property assignment that React never observes?",
      "If the new value must appear on screen, which hook actually triggers a re-render and which one does not?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "Notice how the timer ID lives in a ref: storing it in state would cause an unnecessary re-render just to hold a number the UI never displays.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction AutoSaveIndicator() {\n  const timerId = useRef<number | null>(null);\n\n  useEffect(() => {\n    timerId.current = window.setTimeout(() => {\n      console.log(\"saved\");\n    }, 3000);\n\n    return () => {\n      if (timerId.current !== null) {\n        window.clearTimeout(timerId.current);\n        timerId.current = null;\n      }\n    };\n  }, []);\n\n  return <p>Auto-save in 3s\u2026</p>;\n}"
    }
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
        text: "Serializes the state value into a JSON string so the update can be diffed against a server-side copy.",
        isCorrect: false,
        explanation: "Tempting if you read 'callback format' as a data-transformation step, but the updater function simply computes and returns the next state object; no serialization or network call is involved."
      },
      {
        id: "B",
        text: "Defers the state write to the next animation frame so the DOM paints before the value commits.",
        isCorrect: false,
        explanation: "Plausible if you associate 'callback' with asynchronous scheduling, but the updater runs synchronously inside React's render-phase queue; it does not introduce a frame delay or touch the DOM directly."
      },
      {
        id: "C",
        text: "Writes the previous state snapshot to `localStorage` so the component can restore it on remount.",
        isCorrect: false,
        explanation: "Tempting because the parameter is literally named `prevState`, but it is a read-only argument passed to your function; React never persists it anywhere outside the current render cycle."
      },
      {
        id: "D",
        text: "Ensures updates receive the latest pending state value when they depend on previous state, avoiding stale closure issues during batched updates.",
        isCorrect: true,
        explanation: "Correct. The updater function is invoked at the moment React computes the next state, so it always sees the result of any earlier updates in the same batch, eliminating the stale-read problem."
      }
    ],
    correctAnswer: "D",
    explanation: "The updater (callback) form of `setState` passes a function that receives the state value React will actually use for the next render, not the value captured when the callback was written. In a class component, `this.setState((prevState, props) => ({ counter: prevState.counter + 1 }))` guarantees that `prevState` reflects any updates already queued in the same event handler.\n\nWithout the updater form, two consecutive calls like `this.setState({ counter: this.state.counter + 1 })` in the same tick both read the same `this.state.counter`, so the second increment is silently lost. The updater form makes each update compose on top of the previous one, which is exactly how React processes its internal update queue.\n\nIn function components the same mechanism exists as the updater form of `useState`: `setCounter((prev) => prev + 1)`. The class-component version additionally receives `props` as a second argument, but the core guarantee is identical: the function runs at the moment React is ready to compute the next state, not when you wrote the call.",
    interviewLine: "The updater form exists because React batches state updates within a single event handler; by passing a function that receives the queued state, I guarantee each increment builds on the previous one instead of both reading the same stale `this.state`.",
    misconception: "Thinking the updater form is an optimization or a way to defer work, when it is actually a correctness mechanism: without it, two updates in the same tick can silently overwrite each other.",
    hints: [
      "Look at what `prevState` actually is when two `setState` calls fire in the same event handler.",
      "Ask yourself: if I call `this.setState({ count: this.state.count + 1 })` twice in a row, what does the second call read?",
      "The updater function is not an async trick; it runs synchronously inside React's render queue, just at a later point than the call site."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how the two `setCount(count + step)` calls both capture the same stale `count`, while the updater form composes correctly.",
      language: "tsx",
      code: "function Timer({ step }: { step: number }) {\n  const [count, setCount] = useState(0);\n\n  // Bug: both calls read the same `count` (stale closure)\n  const handleDouble = () => {\n    setCount(count + step);\n    setCount(count + step);\n  };\n\n  // Fix: each updater sees the result of the previous one\n  const handleDoubleFixed = () => {\n    setCount((prev) => prev + step);\n    setCount((prev) => prev + step);\n  };\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={handleDouble}>+{step} (buggy)</button>\n      <button onClick={handleDoubleFixed}>+{step} (fixed)</button>\n    </div>\n  );\n}"
    }
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
        text: "An alternative to `useState` for complex state transitions via a reducer function `(state, action) => newState`, decoupling dispatch from state logic.",
        isCorrect: true,
        explanation: "Correct. `useReducer` centralizes complex state transitions into a predictable, action-driven flow, especially when state fields are interdependent and the next state depends on the previous one."
      },
      {
        id: "B",
        text: "A hook that automatically converts class components into functional components by rewriting their lifecycle methods.",
        isCorrect: false,
        explanation: "Tempting if you associate the word \"reducer\" with some kind of transformation pipeline, but `useReducer` is a state-management hook with no knowledge of component type. It does not read, rewrite, or migrate any component."
      },
      {
        id: "C",
        text: "A hook used exclusively for executing GraphQL mutations and subscriptions across HTTP network requests.",
        isCorrect: false,
        explanation: "The name \"reducer\" has nothing to do with HTTP or GraphQL. `useReducer` is a local state primitive; it never touches the network and is not tied to any data-fetching library."
      },
      {
        id: "D",
        text: "A hook that reduces the size of JavaScript bundles by minifying and tree-shaking code at runtime.",
        isCorrect: false,
        explanation: "\"Reducer\" refers to the pure function that reduces a state and an action into a new state, not to reducing bundle size. `useReducer` runs in the browser at render time and has no effect on your build output."
      }
    ],
    correctAnswer: "A",
    explanation: "`useReducer` returns a state value and a `dispatch` function. You supply a reducer, a pure function `(state, action) => newState`, and an initial state. Calling `dispatch(action)` tells React to run the reducer with the current state and that action, then re-render with the returned value.\n\nThis earns its keep when state has several interdependent fields. A form with `name`, `email`, `errors`, and `isSubmitting` would need four separate `useState` hooks and scattered mutation logic. A single reducer keeps every transition in one function, so you can audit the full state machine in one place.\n\nThe reducer must be pure: no side effects, no reading values that change between renders. React calls it during the render phase to compute the next state, and in development StrictMode it may call it more than once to surface impurity. For a single boolean toggle, `useState` is simpler; `useReducer` pays for itself when the number of transitions or the coupling between fields grows.",
    interviewLine: "`useReducer` gives me a state value and a `dispatch` function; I write a pure reducer that maps `(state, action)` to the next state, so all my transitions live in one testable function instead of scattered across multiple `setState` calls.",
    misconception: "Treating `useReducer` as a general-purpose data-transformation utility (like `Array.prototype.reduce`) rather than a component state-management hook that pairs a state value with a dispatch function.",
    hints: [
      "Look at the two values the hook returns: a state and a function you call to trigger a change.",
      "Ask yourself: where does the logic that computes the next state live, and what does it receive as input?",
      "The word \"reducer\" refers to the pure function you write, not to reducing file size or transforming data arrays."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useReducer",
    example: {
      caption: "Notice that every possible state change is expressed as one return inside the reducer, so adding a new action type is a single, auditable edit.",
      language: "typescript",
      code: "type CartState = { items: string[]; total: number };\ntype CartAction =\n  | { type: \"ADD\"; item: string; price: number }\n  | { type: \"CLEAR\" };\n\nfunction cartReducer(state: CartState, action: CartAction): CartState {\n  switch (action.type) {\n    case \"ADD\":\n      return {\n        items: [...state.items, action.item],\n        total: state.total + action.price,\n      };\n    case \"CLEAR\":\n      return { items: [], total: 0 };\n  }\n}"
    }
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
        text: "Generates deterministic IDs that match across server and client renders, keeping `htmlFor`/`aria-describedby` stable and avoiding hydration mismatches.",
        isCorrect: true,
        explanation: "Correct. `useId()` returns a string React derives from the component's position in the tree, so the server and client produce the same value, which keeps `htmlFor`/`id` pairs and `aria-describedby` references consistent across hydration."
      },
      {
        id: "B",
        text: "Authenticates a user session by hashing biometric fingerprint data into a stable identity token.",
        isCorrect: false,
        explanation: "Tempting if you associate the word \"ID\" with identity or authentication, but `useId` produces a short opaque string for DOM attributes; it has no interaction with session tokens, biometrics, or any credential system."
      },
      {
        id: "C",
        text: "Generates cryptographically random encryption keys used to secure outgoing HTTPS request payloads.",
        isCorrect: false,
        explanation: "Tempting if you hear \"unique ID\" and think cryptographic material, but the value is not random in a security sense, is never intended for key derivation, and has no role in TLS or HTTPS negotiation."
      },
      {
        id: "D",
        text: "Creates globally unique UUID primary keys for inserting new rows into a backend SQL database.",
        isCorrect: false,
        explanation: "Tempting if you think of \"primary key\" as a general uniqueness mechanism, but the string is a React-internal value scoped to the component tree, not a persistable identifier, and it is not a UUID format."
      }
    ],
    correctAnswer: "A",
    explanation: "`useId` returns a short opaque string (for example `:r1:`) that React generates deterministically for the component tree. Because the value is derived from React's internal render position rather than from `Math.random()`, the server-rendered HTML and the client-hydrated DOM carry the exact same string, so `htmlFor`, `id`, `aria-describedby`, and `aria-labelledby` attributes never disagree between the two passes.\n\nIn practice this means you can wire a `<label htmlFor={id}>` to an `<input id={id}>` inside a server component or a client component without a hydration error. If you reached for `Math.random()` or a module-level counter instead, the server would emit one value and the client a different one, and React would log a hydration mismatch or silently patch the DOM.\n\nThe string is scoped to the React tree, not globally unique on the page, and it is not a UUID. You do not need it for static IDs you hardcode in markup, and you should not pass it to a database or use it as a cryptographic identifier.",
    interviewLine: "\"useId gives me a string that React generates identically on the server and the client, so I can safely wire it into `htmlFor` and `aria-describedby` without risking a hydration mismatch\u2014unlike `Math.random()` or a module-level counter.\"",
    misconception: "Treating `useId` as a general-purpose unique-value generator like `crypto.randomUUID()`, and missing that its entire purpose is to be deterministic across server and client renders so accessibility attributes never break during hydration.",
    hints: [
      "Look at what the ID is used for in the code: `htmlFor` and `id` on a form input.",
      "Ask what goes wrong if the server and client generate different values for the same attribute.",
      "The hook is not about randomness or uniqueness in a cryptographic sense; it is about producing the same string on both sides of hydration."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Two separate `useId` calls give the input and its conditional error message their own stable references, and `aria-describedby` only points to the error node when it actually renders.",
      language: "tsx",
      code: "import { useId } from 'react';\n\nfunction SearchField({ error }: { error?: string }) {\n  const inputId = useId();\n  const errorId = useId();\n\n  return (\n    <div>\n      <label htmlFor={inputId}>Search</label>\n      <input\n        id={inputId}\n        type=\"search\"\n        aria-describedby={error ? errorId : undefined}\n        aria-invalid={!!error}\n      />\n      {error && (\n        <span id={errorId} role=\"alert\" className=\"error\">\n          {error}\n        </span>\n      )}\n    </div>\n  );\n}"
    }
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
        text: "Mutating state in place, deriving props in `useEffect`, using array indices as keys for dynamic lists, and calling hooks conditionally.",
        isCorrect: true,
        explanation: "Correct. Each item violates a core React contract: mutation bypasses change detection, effect-derived state adds a stale render pass, index keys break reconciliation on reorder, and conditional hooks break the stable-order rule."
      },
      {
        id: "B",
        text: "Defining explicit TypeScript interfaces for component props and state to enforce type safety.",
        isCorrect: false,
        explanation: "Tempting if you equate \"explicit structure\" with \"anti-pattern,\" but typed props and state are a recommended practice that catches mismatches at compile time rather than at runtime."
      },
      {
        id: "C",
        text: "Implementing new features with functional components and hooks instead of class components.",
        isCorrect: false,
        explanation: "Tempting if you still associate class components with the \"official\" React style, but function components with hooks are the current default and the class-component lifecycle methods they replace are either removed or renamed to UNSAFE_*."
      },
      {
        id: "D",
        text: "Decomposing large monolithic components into smaller, composable child components.",
        isCorrect: false,
        explanation: "Tempting if you think decomposition adds indirection and overhead, but composition is the primary way React isolates re-renders and keeps each component's state and logic testable in isolation."
      }
    ],
    correctAnswer: "A",
    explanation: "React's model is one-way data flow: props flow down, state changes trigger re-renders, and hooks must run in the same order every render. The four practices in option A each break one of those contracts. Mutating state (for example `items.push(x)` then `setItems(items)`) skips the reference-change check that `setState` relies on to decide whether to re-render. Deriving a value from props inside `useEffect` inserts an extra render cycle and a window where the derived value is stale. Using array indices as keys in a reorderable list makes React match the wrong DOM nodes to the wrong data. Calling a hook conditionally shifts the hook order, so React cannot pair the call with its stored state.\n\nIn practice, the index-key bug is the one that bites most often: you add or remove a row, React reuses the DOM node at that index, and the input still shows the previous row's text. The conditional-hook bug is the one that crashes immediately: React throws a \"Rendered more/fewer hooks than during the previous render\" error and the component tree unmounts.\n\nOne nuance an interviewer may probe: array indices as keys are not universally wrong. For a static, non-reorderable list (a fixed set of nav items, a colour legend) the index is stable and harmless. The anti-pattern is specifically the combination of index keys with insertion, deletion, or reordering.",
    interviewLine: "The anti-patterns I watch for are the ones that break React's contracts: mutating an array in place instead of creating a new reference, syncing a derived value through `useEffect` when I can just compute it during render, using index keys on a list that gets reordered, and calling a hook inside an `if` block so the hook order shifts between renders.",
    misconception: "Treating any added structure (types, hooks, component splits) as a smell, when the real anti-patterns are the ones that break React's one-way data flow, its reconciliation key contract, or the stable-order rule for hooks.",
    hints: [
      "Ask which practices break React's one-way data flow or the stable-order rule for hooks, rather than which ones add code.",
      "For each option, ask: does this practice make React's reconciliation, change-detection, or hook-ordering less reliable?",
      "The three wrong options all describe things the React docs and the TypeScript handbook explicitly recommend."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The first component renders an empty string on the first pass and patches it in an effect; the second computes the value inline where it belongs, with no extra render.",
      language: "tsx",
      code: "// Anti-pattern: extra render + stale window\nfunction Profile({ user }: { user: { name: string; age: number } }) {\n  const [label, setLabel] = useState(\"\");\n\n  useEffect(() => {\n    setLabel(`${user.name} is ${user.age}`);\n  }, [user]);\n\n  return <p>{label}</p>;\n}\n\n// Correct: derive during render, no effect needed\nfunction Profile({ user }: { user: { name: string; age: number } }) {\n  const label = `${user.name} is ${user.age}`;\n  return <p>{label}</p>;\n}"
    }
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
        text: "Lifecycle methods execute exclusively on the Node.js server during the build step, and the browser only receives their pre-computed output.",
        isCorrect: false,
        explanation: "Tempting if you conflate server-side rendering with component lifecycle, but lifecycle methods are client-side runtime code that React calls in the browser as components mount, update, and unmount. The build step compiles your source; it does not invoke `componentDidMount`."
      },
      {
        id: "B",
        text: "Lifecycle methods fire in an order determined by the OS thread scheduler, so `componentDidMount` and `componentWillUnmount` can swap in concurrent builds.",
        isCorrect: false,
        explanation: "Tempting if you picture React rendering as an async job subject to thread contention, but React defines a strict, deterministic sequence: `constructor` \u2192 render \u2192 `componentDidMount`, and `componentWillUnmount` always fires last. The OS scheduler decides when a frame runs, not the order of methods inside it."
      },
      {
        id: "C",
        text: "Class lifecycles include Mounting (`constructor`, `componentDidMount`), Updating (`shouldComponentUpdate`, `componentDidUpdate`), and Unmounting (`componentWillUnmount`), replaced by `useEffect` in functional components.",
        isCorrect: true,
        explanation: "Correct. React defines exactly these three phases for class components, and `useEffect` with its dependency array and cleanup return value is the functional-component equivalent that covers all three."
      },
      {
        id: "D",
        text: "Lifecycle methods only trigger when the user refreshes the browser tab, since React batches all state changes into a single re-render on page load.",
        isCorrect: false,
        explanation: "Tempting if you equate 'mount' with 'page load', but a component mounts whenever it first appears in the tree, updates on every relevant state or prop change, and unmounts when it is removed. None of that is tied to a full page refresh."
      }
    ],
    correctAnswer: "C",
    explanation: "Class components organize their work into three phases. Mounting: `constructor` initializes state and binds event handlers, then `componentDidMount` runs after the DOM nodes exist, making it safe to start subscriptions or fetch data. Updating: `shouldComponentUpdate` gates whether a re-render happens, and `componentDidUpdate` runs after the DOM has been patched with new props or state. Unmounting: `componentWillUnmount` fires just before the component's DOM is removed, so you tear down listeners, clear timers, or cancel in-flight requests there.\n\nIn functional components, `useEffect` collapses all three phases into one API. An empty dependency array gives you mount-only setup with a cleanup that runs on unmount. Omitting the dependency array runs the effect after every render, covering both mount and update. The cleanup function you return from the effect is the `componentWillUnmount` equivalent.\n\nThe nuance an interviewer will probe: `componentDidMount` and `useEffect` with `[]` are not identical. `componentDidMount` runs synchronously after the DOM is committed, before the browser paints, while `useEffect` is scheduled to run after paint and can be deferred. `useLayoutEffect` is the closer match to `componentDidMount` if you need to read or mutate the DOM before the browser paints.",
    interviewLine: "I split a class component's work into three phases\u2014mounting, updating, unmounting\u2014each method sitting at a precise point relative to the DOM. In function components I replace all three with `useEffect` plus its dependency array and cleanup, reaching for `useLayoutEffect` when I need to read layout before paint.",
    misconception: "Treating lifecycle methods as a one-time page-load event rather than a per-component, per-render sequence that React drives deterministically through mount, update, and unmount phases.",
    hints: [
      "Look at what the code snippet maps each class method to inside the `useEffect` comment.",
      "Ask yourself: does React define a fixed, ordered sequence of methods per phase, or is the order left to the runtime?",
      "Rule out anything that ties lifecycle to a single page-load event or to a server-side build step."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice how `constructor`, `componentDidMount`, and `componentWillUnmount` each map to a distinct part of the `useEffect` equivalent: the setup body, the effect body, and the cleanup return.",
      language: "tsx",
      code: "class Timer extends React.Component {\n  state = { seconds: 0 };\n  id: number | undefined;\n\n  constructor(props: React.ComponentProps<typeof Timer>) {\n    super(props);\n    this.tick = this.tick.bind(this);\n  }\n\n  componentDidMount() {\n    this.id = window.setInterval(this.tick, 1000);\n  }\n\n  componentWillUnmount() {\n    if (this.id !== undefined) window.clearInterval(this.id);\n  }\n\n  tick = () => this.setState((s) => ({ seconds: s.seconds + 1 }));\n\n  render() {\n    return <span>{this.state.seconds}s</span>;\n  }\n}"
    }
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
        text: "A component that wraps another via its `children` prop, adding behavior around the rendered subtree without producing a new component type.",
        isCorrect: false,
        explanation: "Tempting because wrapper components and render props do add behavior around a child, but that pattern renders the same component instance; an HOC is a function that returns a brand-new component, which is a different composition mechanism."
      },
      {
        id: "B",
        text: "A built-in React API, analogous to `React.createContext`, that registers a component for enhanced rendering with extra lifecycle semantics.",
        isCorrect: false,
        explanation: "Tempting if you pattern-match on `React.create*` helpers, but no such API exists; an HOC is a plain userland function that composes components, not a framework-registered component type."
      },
      {
        id: "C",
        text: "A component that must be co-located in the same module as the component it wraps so it can read that component's internal state directly.",
        isCorrect: false,
        explanation: "Tempting if you think the wrapper needs privileged access to internals, but an HOC only sees the props you pass and the JSX it renders; it never reaches into the wrapped component's state or lifecycle."
      },
      {
        id: "D",
        text: "Functions that take a component and return a new component with added props or behavior, now largely replaced by custom hooks.",
        isCorrect: true,
        explanation: "Correct. An HOC is a function that receives a component and returns a new component with injected props or behavior, and custom hooks now handle most of the logic-reuse cases that HOCs previously covered."
      }
    ],
    correctAnswer: "D",
    explanation: "HOCs are functions that take a component and return a new component. The returned component renders the original one, injecting extra props, wrapping it in additional JSX, or intercepting its lifecycle. The prompt shows the minimal case: `withExtraProps` receives `MyComponent` and returns a component that spreads the caller's props onto `MyComponent` while adding `extraProp=\"value\"`. The caller never sees the extra prop in the component's own source.\n\nBefore React 16.8, this was the primary way to share logic: an auth HOC checked a token and conditionally rendered a login form, a data-fetching HOC called an API in `componentDidMount` and passed results down. Each wrapper added a nesting layer, so three HOCs meant three levels of indirection between your JSX and the component actually rendering. Custom hooks give the same logic without the wrapper, which is why new code almost always prefers them.\n\nAn interviewer may ask why HOCs persist. `connect` from older react-redux versions and some styled-components patterns are HOCs under the hood. The pattern still works when you need to alter a component's output at the JSX level, but name the trade-offs: extra render layers, ref forwarding, and nested wrappers in devtools instead of a flat tree.",
    interviewLine: "A HOC is a function that takes a component and returns a new one with injected props or behavior \u2014 it's a composition pattern, not a special React feature. I'd reach for a custom hook in new code because it avoids the nesting and ref-forwarding issues that stack up when you wrap three or four HOCs.",
    misconception: "Treating \"higher-order\" as a React-specific rendering position or execution environment rather than the standard functional-programming term for a function that operates on other functions (here, components).",
    hints: [
      "Look at what `withExtraProps` receives and what it returns \u2014 both are functions, not JSX elements.",
      "Ask yourself: is the HOC a component you render, or a function you call with a component as an argument?",
      "The term \"higher-order\" comes from functional programming, not from a DOM position or execution thread."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the hook delivers the same data-fetching logic without wrapping the component in an extra render layer.",
      language: "tsx",
      code: "const withLoading = (Wrapped: React.FC<{ data: string }>) => {\n  const Enhanced = () => {\n    const [loading, setLoading] = React.useState(true);\n    React.useEffect(() => {\n      fetch(\"/api/data\").then(() => setLoading(false));\n    }, []);\n    if (loading) return <div>Loading\u2026</div>;\n    return <Wrapped data=\"fetched\" />;\n  };\n  Enhanced.displayName = `withLoading(${Wrapped.displayName ?? Wrapped.name})`;\n  return Enhanced;\n};\n\n// Same logic as a hook \u2014 no wrapper component needed\nfunction useFetchedData() {\n  const [data, setData] = React.useState(\"\");\n  React.useEffect(() => {\n    fetch(\"/api/data\").then((r) => r.text()).then(setData);\n  }, []);\n  return data;\n}"
    }
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
        text: "Presentational components are defined as CSS class selectors that style DOM elements, while Container components are server-side SQL queries that fetch and transform data before rendering.",
        isCorrect: false,
        explanation: "Both roles are plain JavaScript or TypeScript functions that return JSX. The pattern is about which component owns state and side effects, not about the language or technology used to write them."
      },
      {
        id: "B",
        text: "Presentational components render exclusively in the browser, while Container components execute inside a Docker container on the server and stream pre-rendered HTML back to the client.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word \"container\" with Docker, but in this pattern it is a component-architecture term. Both roles are client-side React functions; the split is about state ownership, not where the code physically runs."
      },
      {
        id: "C",
        text: "A convention separating concerns: presentational components render UI from props with no internal state, while container components own state, fetch data, and pass results down as props; modern React typically expresses this split through custom hooks instead of wrapper components.",
        isCorrect: true,
        explanation: "Correct. The pattern is a pre-hooks convention for separating pure rendering from stateful logic, and the idiomatic modern equivalent is extracting the stateful part into a custom hook rather than wrapping a presentational component."
      },
      {
        id: "D",
        text: "A mandatory rule enforced by the React compiler, which throws a syntax error at build time if a single component mixes rendering markup with state management or data fetching.",
        isCorrect: false,
        explanation: "React's compiler and bundler impose no such constraint. A component that both calls `useState` and returns JSX is perfectly valid; the pattern is a team-level convention, not a language or tooling rule."
      }
    ],
    correctAnswer: "C",
    explanation: "The presentational vs container pattern splits a component's responsibilities into two layers. The container declares state with `useState`, runs side effects with `useEffect`, and passes the resulting data to the presentational component as props. The presentational component is a pure function of its props: it renders markup and holds no internal state of its own.\n\nIn practice the wrapper adds a render pass and an indirection layer. Before hooks this was the only clean way to extract data-fetching logic from a component. With hooks you pull the same logic into a custom hook like `useUsers()`, keeping a single component that both fetches and renders. The wrapper becomes an unnecessary middleman that complicates testing and makes the data flow harder to trace.\n\nDan Abramov, who popularized the pattern, has since said it is no longer worth following as a hard rule. The conceptual split between pure rendering and stateful logic still has value, but the implementation shifted from component-wrapping to hook-extraction. An interviewer may probe whether you can articulate why the wrapper is redundant: it adds no capability a hook lacks, and it forces you to re-export types through the wrapper's props interface.",
    interviewLine: "I think of it as a pre-hooks split: the container owned `useState` and `useEffect`, the presentational component was a pure function of props. In practice I collapse that into one component plus a custom hook, because the wrapper adds an extra render pass and makes the data flow harder to trace without giving me anything a hook does not already provide.",
    misconception: "Treating the presentational/container split as a mandatory architectural rule or a compiler-enforced constraint, rather than a historical convention that hooks have largely made redundant.",
    hints: [
      "Look at which component in the snippet declares `useState` and `useEffect` versus which one only reads `props` and returns markup.",
      "Ask what the wrapper component actually adds beyond what a custom hook like `useUsers()` would give you in the same file.",
      "This is a naming convention from the pre-hooks era, not a rule the React compiler or bundler enforces at build time."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the custom hook replaces the container wrapper: the same state and effect live in `useUsers`, and the component is a single unit that both fetches and renders.",
      language: "tsx",
      code: "function useUsers() {\n  const [users, setUsers] = useState<User[]>([]);\n  useEffect(() => {\n    fetchUsers().then(setUsers);\n  }, []);\n  return users;\n}\n\nfunction UserList() {\n  const users = useUsers();\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "A compiler flag that enforces a 60fps rendering budget for components in mobile browsers.",
        isCorrect: false,
        explanation: "Tempting if you latch onto the word \"render\" and assume it refers to the GPU compositing pipeline. Render props are a component composition pattern defined in JavaScript source; no compiler or browser flag is involved."
      },
      {
        id: "B",
        text: "A built-in React hook that automatically renders a component's CSS styles into the document head.",
        isCorrect: false,
        explanation: "Tempting if you associate \"render\" with style-injection libraries like styled-components. Render props are not a hook, not built in, and have nothing to do with CSS; they are simply a function-typed prop that returns elements."
      },
      {
        id: "C",
        text: "A pattern where a component accepts a function prop that returns JSX, allowing it to share internal state with the consumer while delegating the UI structure.",
        isCorrect: true,
        explanation: "Correct. The component owns the state, calls the function prop during render, and passes the state as an argument, letting the consumer control the output. Custom hooks now handle most of the same use cases with less nesting."
      },
      {
        id: "D",
        text: "A technique for rendering interactive 3D WebGL scenes directly inside inline SVG tags.",
        isCorrect: false,
        explanation: "Tempting if you read \"render\" as a graphics-pipeline term. Render props have no connection to WebGL, SVG, or any specific visual output; the term describes how a prop is typed and called, not what it draws."
      }
    ],
    correctAnswer: "C",
    explanation: "A render prop is a prop whose value is a function that returns JSX. The component owns the state, calls that function during its own render, and passes the state (or derived values) as arguments. In the snippet, `DataFetcher` owns `data` and invokes `render(data)`, so the consumer decides what to display without `DataFetcher` prescribing a fixed UI.\n\nBefore custom hooks, render props were the primary way to share stateful logic between components. Nesting several of them produced the well-known \"render prop pyramid\": each wrapper added another level of indirection, making the JSX hard to read and the data flow hard to trace. A custom hook like `const data = useFetch(url)` returns the state directly, so the component that needs it renders whatever it wants without an extra function-prop layer.\n\nRender props still appear in headless UI libraries (Radix, Downshift, react-select) where the consumer must control the DOM structure and the library only supplies state and handlers. Two details an interviewer may probe: the render function is called synchronously during render, so it must be pure and must not trigger side effects; and because it is a prop, its identity changes every render unless the consumer memoises it, which can cause extra re-renders in the child.",
    interviewLine: "A render prop is a prop typed as a function that returns JSX; the owning component calls it with its internal state so the consumer controls the output. I use them today mainly in headless UI libraries, but for most data-fetching or state-sharing cases I reach for a custom hook instead because it avoids the nesting problem.",
    misconception: "The word \"render\" in \"render props\" is read as a reference to the browser's rendering pipeline or to a specific React API, rather than to the simple act of producing a React element from a function call during a component's render phase.",
    hints: [
      "Look at the `render` prop in the code: what is its type, and who calls it?",
      "Ask who owns the state and who decides what to display, then name the pattern that lets one component do one and the other do the other.",
      "This pattern predates a React feature introduced in 16.8 that now covers most of the same use cases with less nesting."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A headless select where the consumer controls the DOM and the library only supplies state and handlers \u2014 a modern, common use of render props.",
      language: "tsx",
      code: "function Select({ items, render }) {\n  const [open, setOpen] = useState(false);\n  const [selected, setSelected] = useState(null);\n  return render({\n    open,\n    toggle: () => setOpen((v) => !v),\n    selected,\n    select: (item) => {\n      setSelected(item);\n      setOpen(false);\n    },\n  });\n}\n\n<Select\n  items={[\"Apple\", \"Banana\"]}\n  render={({ open, toggle, selected, select }) => (\n    <div>\n      <button onClick={toggle}>{selected ?? \"Pick one\"}</button>\n      {open && <ul>{items.map((i) => <li key={i} onClick={() => select(i)}>{i}</li>)}</ul>}\n    </div>\n  )}\n/>;"
    }
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
        text: "Creating class inheritance hierarchies where each component `extends` a base component to reuse its behaviour.",
        isCorrect: false,
        explanation: "Tempting if you come from a class-OOP background where you `extend` a `BaseDialog`, but React components compose by nesting, not by subclassing. A `WelcomeDialog extends Dialog` chain forces a rigid type hierarchy and makes it hard to mix and match layouts."
      },
      {
        id: "B",
        text: "Assembling complex UIs by nesting smaller, focused components together via `children` or named props rather than subclassing.",
        isCorrect: true,
        explanation: "Correct. `WelcomeDialog` wraps its content inside `Dialog`; React passes that content as `props.children`, and `Dialog` renders it inside its own markup. The same idea extends to named props like `header` or `footer` for multiple slots."
      },
      {
        id: "C",
        text: "Merging multiple audio tracks into a single encoded stream during the build step.",
        isCorrect: false,
        explanation: "\"Composition\" in React refers to assembling component trees, not audio encoding. No build tool or React API treats this word as a media-muxing operation."
      },
      {
        id: "D",
        text: "Concatenating all JavaScript, CSS, and schema definitions into one monolithic bundle file.",
        isCorrect: false,
        explanation: "This confuses \"composition\" (building a UI from parts) with \"concatenation\" (joining files). React composition is a rendering-time pattern about how components nest; it has nothing to do with bundling strategy."
      }
    ],
    correctAnswer: "B",
    explanation: "The composition pattern means building a complex component by nesting smaller components inside it, instead of subclassing. In the example, `WelcomeDialog` does not `extend` `Dialog`; it places its heading and paragraph between `<Dialog>` and `</Dialog>`. React turns that inner content into the `props.children` value, which `Dialog` renders inside its own `<div>`. Named props work the same way: passing `header={<h1>Hi</h1>}` lets a parent supply a specific slot without the child having to know the markup.\n\nIn practice this removes the need for configuration props like `title=\"Welcome\"` or `body=\"Thank you\u2026\"`. The parent decides the structure and content; the child only provides the shell, layout, and behaviour. Swapping the content means changing one component, not editing a string prop or creating a new subclass.\n\nAn interviewer will often follow up with the difference between `children` and named-slot props. `children` is a single implicit slot; named props (e.g. `header`, `footer`) give you multiple explicit slots and make the expected structure visible at the call site. Both are composition, not inheritance, and both accept any valid React element or component reference as their value.",
    interviewLine: "In React I build complex UIs by nesting: the parent component supplies the content and the child provides the shell. For example, instead of subclassing a `Dialog`, I place my heading and paragraph between its tags and `Dialog` renders them via `props.children`. For multiple slots I use named props like `header` so the call site makes the expected structure explicit.",
    misconception: "Treating React components like classes in a Java or C# hierarchy, where you `extend` a base component to specialise it, instead of nesting content inside a generic container and letting `props.children` carry the markup.",
    hints: [
      "Look at how `WelcomeDialog` uses `Dialog` \u2014 it wraps content inside it rather than inheriting from it.",
      "What does `props.children` contain in `Dialog`, and where did that value come from?",
      "React removed the need for `extends` between components; think about what mechanism replaces it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `header` is a named slot (a prop) while the paragraph flows through `children`, giving the parent two distinct places to inject content.",
      language: "tsx",
      code: "function Card(props) {\n  return (\n    <div className=\"card\">\n      {props.header}\n      <div className=\"card-body\">{props.children}</div>\n    </div>\n  );\n}\n\nfunction ProfileCard() {\n  return (\n    <Card header={<h2>Alice</h2>}>\n      <p>Frontend engineer at Acme.</p>\n    </Card>\n  );\n}"
    }
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
        explanation: "Tempting if you equate \"refresh the view\" with \"refresh the page,\" but a full navigation destroys every in-memory state variable, causes a visible white flash, and the browser will throttle or block rapid successive navigations."
      },
      {
        id: "B",
        text: "Poll `window.innerWidth` in a synchronous while loop on the main thread.",
        isCorrect: false,
        explanation: "A tight `while(true)` loop with no `await` or `setTimeout` blocks the event loop entirely, so the browser cannot paint, process input, or fire the very `resize` event it is trying to detect."
      },
      {
        id: "C",
        text: "Listen for the `resize` event in `useEffect`, update state with the new dimensions, and remove the listener in cleanup.",
        isCorrect: true,
        explanation: "Correct. Calling a `useState` setter from the event handler is the bridge that turns a DOM signal into a React re-render, and the cleanup call to `removeEventListener` prevents leaked listeners across mount/unmount cycles."
      },
      {
        id: "D",
        text: "Rely strictly on CSS `@media` queries to update JavaScript state variables.",
        isCorrect: false,
        explanation: "`@media` rules change computed CSS values on the element, but they never execute JavaScript, so a `useState` value in a React component stays at whatever it was last set to."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct approach is to subscribe to the browser's `resize` event inside `useEffect` and call a state setter with the new `window.innerWidth`. Because `useEffect` with an empty dependency array runs once after mount, the listener is attached exactly once. When the event fires, `setWindowWidth(window.innerWidth)` schedules a React re-render, and the component body re-executes with the fresh value.\n\nThe cleanup function returned from `useEffect` calls `removeEventListener`. Without it, every mount-and-unmount cycle (for example a route change in Next.js) leaves a listener behind that still calls a stale setter, which is a memory leak and can trigger a state update on an already-unmounted component.\n\nDuring a window drag the `resize` event can fire many times per second. React batches the resulting `setState` calls within a single event-loop turn, so you typically get one re-render per frame. If the handler does expensive work, wrap it in `requestAnimationFrame` or a short debounce, but for simply reading `window.innerWidth` the built-in batching is sufficient.",
    interviewLine: "I subscribe to the `resize` event inside `useEffect`, call `setState` with the new `window.innerWidth`, and return a cleanup that removes the listener so I don't leak references across mount and unmount cycles.",
    misconception: "The browser \"notifies\" React automatically when the viewport changes, so no explicit subscription is needed. In reality React has no built-in resize hook; you must bridge the DOM event to a state update yourself inside an effect.",
    hints: [
      "React re-renders a component when its state changes or its parent re-renders \u2014 which of those can a browser event trigger directly?",
      "Where does React let you run imperative browser code like `addEventListener` without re-running it on every render?",
      "The event fires many times per second during a drag; what does React do with the resulting state updates to keep re-renders cheap?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Same subscribe-update-cleanup pattern, but driven by a `matchMedia` query instead of the `resize` event, so the handler only fires when you actually cross the breakpoint.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nfunction useIsMobile(breakpoint = 768) {\n  const [isMobile, setIsMobile] = useState(\n    () => window.innerWidth < breakpoint\n  );\n\n  useEffect(() => {\n    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);\n    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);\n    mql.addEventListener(\"change\", onChange);\n    return () => mql.removeEventListener(\"change\", onChange);\n  }, [breakpoint]);\n\n  return isMobile;\n}\n\nexport default useIsMobile;"
    }
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
        text: "Use a data-fetching library (TanStack Query, SWR), React 19 Server Components with `use`, or `useEffect` with local `data`, `isLoading`, and `error` state.",
        isCorrect: true,
        explanation: "Correct. All three approaches keep the fetch outside the render cycle and deliver the result through React's reactivity system, whether that is local state, a query cache, or server-resolved props."
      },
      {
        id: "B",
        text: "Execute `fetch()` calls directly inside the component render function body and read the resolved value on the same synchronous pass.",
        isCorrect: false,
        explanation: "Tempting if you picture `fetch` as a blocking call, but it returns a Promise; reading its value synchronously in render gives you a Promise object, not the data. Calling `fetch` during render also violates React's purity requirement and can trigger an infinite re-render loop."
      },
      {
        id: "C",
        text: "Store all fetched data in global `window` variables and read them during render without subscribing to any React state change.",
        isCorrect: false,
        explanation: "Tempting as a way to skip state boilerplate, but `window` properties live outside React's render loop; mutating them never schedules a re-render, so the UI stays frozen on whatever it last painted."
      },
      {
        id: "D",
        text: "Force users to refresh the entire browser page to view new data after each fetch completes, discarding all in-memory state.",
        isCorrect: false,
        explanation: "Tempting as a 'simple' solution, but a full reload discards all in-memory state, re-downloads every asset, and defeats the purpose of a component-based UI framework that updates the DOM in place."
      }
    ],
    correctAnswer: "A",
    explanation: "React's render pass is synchronous and pure, so async work must live outside it. The three valid strategies in the answer all respect that boundary: `useEffect` plus `useState` keeps the fetch in an effect and surfaces results through state; libraries like TanStack Query or SWR wrap that pattern with caching, deduplication, and background revalidation; and React 19 Server Components move the `await` to the server so the browser receives already-resolved HTML, eliminating the client-side loading window entirely.\n\nWithout explicit `data`, `isLoading`, and `error` state, the component either paints a blank frame before the Promise settles or crashes reading properties on `undefined`. The code in the prompt tracks `info` and `isLoading` and logs errors to the console, covering the loading and success paths but leaving the user without a visible error state in the UI.\n\nAn interviewer will probe the gap between these approaches: a raw `useEffect` fetch fires after the first paint, causing a layout shift, and it has no built-in deduplication if two components request the same URL. Server Components sidestep both problems by resolving data before the first byte ships, while TanStack Query adds request deduplication and stale-while-revalidate logic that a hand-rolled effect cannot match without significant extra code.",
    interviewLine: "I keep the render pass pure by moving the fetch into a `useEffect` or a Server Component, then surface the result through state so React schedules a re-render once the data lands. In production I reach for TanStack Query to get request deduplication and background revalidation without hand-rolling that logic.",
    misconception: "Treating React's render function as if it were an `async` function, so you believe you can call `fetch` mid-render and read the resolved value on the same pass, when in fact render must return synchronously and any async result only exists after the component has already painted.",
    hints: [
      "React's render function must be synchronous and pure \u2014 what does that imply about where you are allowed to call `fetch`?",
      "Once the Promise resolves, what mechanism tells React to paint the new data into the DOM?",
      "A global variable can hold the response, but nothing inside the component will know it changed."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how TanStack Query owns the fetch lifecycle and exposes `isPending`, `error`, and `data` directly, removing the need for manual `useEffect` cleanup and state juggling.",
      language: "tsx",
      code: "import { useQuery } from '@tanstack/react-query';\n\nfunction UserProfile({ id }: { id: string }) {\n  const { data, isPending, error } = useQuery({\n    queryKey: ['user', id],\n    queryFn: async () => {\n      const res = await fetch(`/api/users/${id}`);\n      if (!res.ok) throw new Error('Failed to load user');\n      return res.json();\n    },\n  });\n\n  if (isPending) return <p>Loading profile\u2026</p>;\n  if (error) return <p>Could not load profile.</p>;\n  return <pre>{JSON.stringify(data, null, 2)}</pre>;\n}"
    }
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
        explanation: "Correct. React Router provides components like `<Routes>`, `<Route>`, `<Link>` and hooks like `useNavigate` and `useParams` that let a React app change the visible view by updating the URL, all without a full page reload."
      },
      {
        id: "B",
        text: "A database driver that routes SQL queries to the appropriate read or write replica based on the statement type.",
        isCorrect: false,
        explanation: "Tempting because the word \"router\" appears in database middleware such as read-replica routers, but React Router operates on the browser URL, not on SQL statements. It has no connection to a database engine."
      },
      {
        id: "C",
        text: "A build tool that routes CSS stylesheets through a bundler pipeline and outputs a single minified file.",
        isCorrect: false,
        explanation: "The word \"routes\" can sound like a file-processing pipeline, but React Router does not transform, bundle, or minify assets. It maps URL paths to component trees at runtime in the browser."
      },
      {
        id: "D",
        text: "A physical networking hardware device that routes IP packets between subnets and assigns addresses in a data center.",
        isCorrect: false,
        explanation: "A network router is hardware that forwards IP packets between subnets. React Router is a JavaScript library that swaps which React component renders for a given path; no packets, no IP addresses, no data center."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router is a library that maps URL paths to React components. Under the hood it uses the browser History API to push or replace entries, so the address bar updates without a full page reload, and React re-renders the matching component subtree.\n\nIn practice you declare routes with `<Route>` elements inside a `<Routes>` block, navigate programmatically with `useNavigate`, and let `<Link>` handle anchor clicks. Because the URL is the source of truth, the browser back and forward buttons work, and a user can share a deep link that resolves to the correct view.\n\nThe word \"router\" here is a software abstraction that runs inside the browser, not a network device. It is also specifically a React library; Next.js uses the same idea but wires it through file-based routing in the App Router rather than a separate package.",
    interviewLine: "I describe React Router as a browser-side library that maps URL paths to React components through the History API, so to me navigation is a state change inside React rather than a new document load.",
    misconception: "The word \"router\" pulls the mind toward network hardware or database middleware, so the candidate answers in terms of packets or SQL instead of URL-to-component mapping in the browser.",
    hints: [
      "The name contains \"React\" and \"Router\" \u2014 what does a router do in a web app, and what does React own?",
      "Think about what changes when you click a link in a single-page app: the URL updates, but does the browser request a new HTML document?",
      "It is not hardware, not a database driver, and not a build step \u2014 it lives inside the JavaScript bundle in the browser."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice that clicking a <Link> updates the URL and swaps the rendered component without the browser requesting a new page.",
      language: "tsx",
      code: "import { BrowserRouter, Routes, Route, Link } from \"react-router-dom\";\n\nfunction Home() {\n  return <h1>Home</h1>;\n}\n\nfunction About() {\n  return <h1>About</h1>;\n}\n\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>{\" | \"}\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    }
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
        text: "`BrowserRouter` is deprecated and has been completely removed from the React Router package.",
        isCorrect: false,
        explanation: "Tempting if you have seen older Router APIs or confuse React Router with a different library, but `BrowserRouter` is the default router in React Router v6 and v7 and is not marked deprecated anywhere in the docs."
      },
      {
        id: "B",
        text: "`BrowserRouter` uses the HTML5 History API for clean URLs and requires server rewrites for deep links; `HashRouter` uses URL hash fragments without any server configuration.",
        isCorrect: true,
        explanation: "Correct. The History API rewrites the path segment the server sees, so a refresh of a deep link needs a rewrite rule; the fragment after `#` is never sent to the server, so no configuration is needed."
      },
      {
        id: "C",
        text: "`HashRouter` encrypts every URL string using a SHA-256 cryptographic hash before the browser navigates.",
        isCorrect: false,
        explanation: "Mixes up the URL fragment identifier (`#`) with cryptographic hashing. The `#` in a URL is a standard fragment delimiter defined in RFC 3986; no encryption or digest computation is involved."
      },
      {
        id: "D",
        text: "`BrowserRouter` only works in Google Chrome, while `HashRouter` is the fallback that works in every other browser.",
        isCorrect: false,
        explanation: "The HTML5 History API has been supported in every evergreen browser since 2011, and `HashRouter` works in Chrome just as well as any other browser. Neither router is restricted to a single engine."
      }
    ],
    correctAnswer: "B",
    explanation: "The difference is which part of the URL each router manipulates. `BrowserRouter` calls the HTML5 History API (`pushState`, `replaceState`) so the address bar shows a clean path like `/about`. `HashRouter` writes the route into the fragment after `#`, producing `/#/about`. The fragment is a browser-only value; it is never included in the HTTP request line the browser sends to the server.\n\nIn practice this means a deep link or a page refresh behaves differently. With `BrowserRouter`, refreshing `https://myapp.com/about` sends `GET /about` to the server, so the server must be configured to serve the app's `index.html` for any path. With `HashRouter`, refreshing `https://myapp.com/#/about` sends only `GET /`, so any static file host works without extra configuration.\n\nThe word \"hash\" in `HashRouter` refers to the URL fragment identifier, the `#` character every browser supports, not a cryptographic function. You would choose `HashRouter` when deploying to a host where you cannot add rewrite rules (GitHub Pages, a plain S3 bucket, or a shared host with no `.htaccess`). For a production app behind a web server or a framework like Next.js that handles rewrites automatically, `BrowserRouter` is the standard choice.",
    interviewLine: "I reach for `BrowserRouter` when I can add a server rewrite, since it uses the History API and a refresh of `/about` hits the server; I use `HashRouter` on a plain static host because the route lives after `#`, which the browser never sends to the server, so it needs zero configuration.",
    misconception: "The \"hash\" in `HashRouter` is the URL fragment identifier (`#`), a standard part of every URL, not a cryptographic digest; and `BrowserRouter` is the default, current router in React Router, not a legacy or deprecated API.",
    hints: [
      "Think about which part of the URL string each router actually changes: the path before `?` or the fragment after `#`.",
      "Ask yourself: when the browser sends a GET request, does the fragment portion appear in the request line?",
      "The \"hash\" in `HashRouter` is the same `#` character you type to jump to a section on any webpage, not a cryptographic function."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "The only difference is whether the route lives in the path (server-visible) or the fragment (browser-only); the comments show what the server receives on refresh.",
      language: "tsx",
      code: "import { BrowserRouter, HashRouter, Routes, Route } from \"react-router-dom\";\n\nfunction Home() {\n  return <h1>Home</h1>;\n}\nfunction About() {\n  return <h1>About</h1>;\n}\nfunction RoutesTree() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n      <Route path=\"/about\" element={<About />} />\n    </Routes>\n  );\n}\n\n// BrowserRouter \u2192 /about ; refresh hits GET /about (needs a server rewrite)\nexport const App = () => <BrowserRouter><RoutesTree /></BrowserRouter>;\n\n// HashRouter \u2192 /#/about ; refresh hits GET / (no rewrite needed)\nexport const AppHash = () => <HashRouter><RoutesTree /></HashRouter>;"
    }
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
        text: "Use the `useNavigate()` hook: `navigate('/path')`, `navigate(-1)`, or `navigate('/path', { replace: true })`",
        isCorrect: true,
        explanation: "Correct. `useNavigate` is the v6+ replacement for v5's `useHistory`; it returns a single function that pushes, replaces, or walks the history stack, and React Router re-renders the matched route without a page reload."
      },
      {
        id: "B",
        text: "Set `document.title` to the target path string so the browser picks up the new route.",
        isCorrect: false,
        explanation: "Tempting if you conflate the tab title with the route, but `document.title` only updates the `<title>` element text in the browser chrome. It triggers no navigation, no history entry, and no re-render of any route."
      },
      {
        id: "C",
        text: "Call `React.navigate('/path')` from the core React package to push a new route onto the stack.",
        isCorrect: false,
        explanation: "Tempting if you assume routing is a built-in React concern, but React core has no `navigate` export. Routing is an orthogonal library; React Router provides `useNavigate`, not React itself."
      },
      {
        id: "D",
        text: "Assign `window.location.href = '/path'` in the event handler to trigger the navigation.",
        isCorrect: false,
        explanation: "Tempting because the browser does change the URL, but the assignment triggers a full document load. The React tree is destroyed, all in-memory state is lost, and the SPA's client-side router never gets a chance to handle the transition."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router v6 exposes `useNavigate`, a hook that returns a function wrapping the library's internal history object. Calling `navigate('/new-page')` pushes a new entry onto that history stack, and React Router's internal listener re-renders the route matching the new URL \u2014 all without the browser issuing a fresh document request.\n\nIn practice this matters because your component tree, in-memory state, and any data fetched in `useEffect` all survive the transition. If you instead set `window.location.href`, the browser tears down the entire React tree, re-downloads the HTML, and every piece of client-side state is gone.\n\nTwo details an interviewer will probe: `navigate(-1)` walks back one history entry (equivalent to the browser back button), and passing `{ replace: true }` swaps the current entry instead of pushing, which keeps the history stack clean when you redirect after a guard or a 404.",
    interviewLine: "I call `useNavigate` at the top of a component to get a function that pushes onto React Router's internal history stack; the router then re-renders the matched route in place, so my component state and any in-memory data survive the transition without a page reload.",
    misconception: "Treating \"changing the URL\" and \"navigating inside a SPA\" as the same operation. The URL is just a string; React Router intercepts the change and swaps the rendered component tree without the browser ever requesting a new document.",
    hints: [
      "The question names React Router specifically, not the browser. What does the router expose to a component for changing the current route?",
      "Think about what happens to your component tree and in-memory state when the URL changes. A full reload destroys both; a router-driven transition preserves them.",
      "The hook must be called inside a component that is rendered within a `<Router>` or `<BrowserRouter>` boundary; calling it outside that tree throws."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice how `navigate` with a path pushes a new history entry, while `{ replace: true }` swaps the current one so the back button skips it.",
      language: "tsx",
      code: "import { useNavigate, useParams } from 'react-router-dom';\n\nfunction EditProfile() {\n  const navigate = useNavigate();\n  const { id } = useParams();\n\n  const handleSave = () => {\n    // Push a new entry so the user can go back to this edit screen\n    navigate(`/users/${id}`);\n  };\n\n  const handleCancel = () => {\n    // Replace the current entry so \"back\" skips the edit screen\n    navigate('/users', { replace: true });\n  };\n\n  return (\n    <div>\n      <button onClick={handleSave}>Save</button>\n      <button onClick={handleCancel}>Cancel</button>\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you think of the active class as a server-rendered attribute that only the browser can set after a full load. In a single-page app the router swaps components client-side, so a reload discards all in-memory state, refetches every API call, and defeats the purpose of using a router in the first place."
      },
      {
        id: "B",
        text: "Use `<NavLink>`'s `isActive` in a `className` callback, or check `pathname` from `useLocation()` to apply active styles.",
        isCorrect: true,
        explanation: "Correct. `<NavLink>` computes `isActive` by comparing its `to` value against the router's current location and passes it to the `className` callback, while `useLocation` exposes the same `pathname` for any component that needs the raw value. Both are declarative, re-render on navigation, and require no manual DOM work."
      },
      {
        id: "C",
        text: "Active route state cannot be tracked in React Router.",
        isCorrect: false,
        explanation: "This stems from treating React Router as a thin wrapper around the History API with no state of its own. In practice the router stores the current location in its context, and both `<NavLink>` and `useLocation` read from that state on every render."
      },
      {
        id: "D",
        text: "Attach a raw `click` event listener to every DOM link and toggle global CSS classes manually.",
        isCorrect: false,
        explanation: "Tempting if you come from vanilla-JavaScript navigation code, but it bypasses React's render cycle. The listener fires before the router updates its state, so the class you set is immediately overwritten on the next render, and browser back/forward navigation never triggers a `click` event at all."
      }
    ],
    correctAnswer: "B",
    explanation: "React Router keeps the current URL in its internal state and exposes it through the `useLocation` hook, which returns an object with `pathname`, `search`, and `hash`. The `<NavLink>` component wraps a standard `<Link>` and adds a computed `isActive` boolean that compares the link's `to` value against the current location. Either mechanism gives you the active-route signal during render without any manual bookkeeping.\n\nIn the question's code, the component reads `location.pathname` and string-compares it against `'/home'` and `'/about'`. That works for flat routes, but it breaks for nested paths: `'/home/settings'` would not match `'/home'`, and you would need a separate comparison for every child. `<NavLink>` handles the exact-match case with the `end` prop, and it also sets `aria-current=\"page\"` automatically, which the manual approach in the snippet skips.\n\nOne nuance an interviewer will probe: `useLocation` causes every component that calls it to re-render on any navigation, even when the path is irrelevant to that component. `<NavLink>` scopes the re-render to itself, so in a nav bar with many links, preferring `<NavLink>` over a shared `useLocation` call keeps the render tree smaller.",
    interviewLine: "I use `<NavLink>` with the `className` callback so the router computes `isActive` for me, and I add the `end` prop where a parent path should not match its children. If I need the path outside a link, I pull `pathname` from `useLocation` and compare it in the component.",
    misconception: "The active state is treated as a CSS or DOM concern that must be applied imperatively\u2014via a page reload or a `click` handler\u2014rather than as reactive state that React Router already tracks and re-renders from.",
    hints: [
      "What does React Router already store internally that tells you the current URL?",
      "Which built-in component or hook exposes that URL as reactive state you can read during render?",
      "You do not need a page reload or a DOM `click` handler; the router already knows where you are and re-renders on change."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the `end` prop on the first link: without it, navigating to `/dashboard/reports` would also mark \"Dashboard\" as active.",
      language: "tsx",
      code: "import { NavLink } from 'react-router-dom';\n\nfunction Sidebar() {\n  const linkClass = ({ isActive }: { isActive: boolean }) =>\n    isActive ? 'nav-link active' : 'nav-link';\n  return (\n    <aside>\n      <nav>\n        <NavLink to=\"/dashboard\" end className={linkClass}>\n          Dashboard\n        </NavLink>\n        <NavLink to=\"/dashboard/reports\" className={linkClass}>\n          Reports\n        </NavLink>\n      </nav>\n    </aside>\n  );\n}"
    }
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
        text: "Parse the query string by running a regex over `window.navigator.userAgent`.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"data the browser sends\" with \"data in the URL.\" `userAgent` is a short fingerprint string like `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0\u2026)`; it never contains the page's `?key=value` pairs."
      },
      {
        id: "B",
        text: "Use the `useSearchParams()` hook to get a `URLSearchParams` object, then call `.get('q')` to read a value.",
        isCorrect: true,
        explanation: "Correct. `useSearchParams` wraps the router's current search string in a standard `URLSearchParams` instance, so `.get()`, `.set()`, and `.has()` work exactly as they do on the native Web API, and the component re-renders when the URL changes."
      },
      {
        id: "C",
        text: "Read `document.cookie` and split on `?` to extract the parameter.",
        isCorrect: false,
        explanation: "Tempting if you treat all browser state as one blob. Cookies live in `document.cookie` as `name=value; name2=value2` pairs set by the server or `document.cookie = \u2026`; they have no `?` delimiter and carry no relation to the URL's query string."
      },
      {
        id: "D",
        text: "Send a POST request to a backend server and read the parameter from the response body.",
        isCorrect: false,
        explanation: "Tempting if you assume the client cannot inspect its own URL. The query string is already present in `window.location.search`; no network round-trip is needed to read it."
      }
    ],
    correctAnswer: "B",
    explanation: "`useSearchParams()` returns a tuple: a `URLSearchParams` instance and a setter function. You call `.get('paramName')` on the first element to read a value, `.has()` to check existence, and `.set()` through the second element to update the URL.\n\nBecause the hook subscribes to the router's location, any change to the URL's search portion \u2014 whether the user edits the address bar, clicks a link, or your code calls the setter \u2014 triggers a re-render with the new values. A component that reads `?page=2` automatically picks up `?page=3` without a manual refresh or a separate fetch.\n\nOne detail interviewers probe: `URLSearchParams` is not a plain object. `params['q']` returns `undefined`; you must use the `.get()` method, which for keys that appear multiple times returns only the first occurrence (use `.getAll()` to retrieve every value).",
    interviewLine: "I use `useSearchParams` to get a `URLSearchParams` instance from the router, call `.get()` on it to read a value, and the component re-renders automatically whenever the search portion of the URL changes.",
    misconception: "Query parameters are treated as server-side data that must be fetched over HTTP, when in fact they live in the client's URL and are readable synchronously through the router's hooks.",
    hints: [
      "The query parameters are already sitting in the URL after the `?` \u2014 no network call, no cookie, no browser fingerprint involved.",
      "React Router exposes that search portion through a hook that returns a standard `URLSearchParams` object; ask what methods that object provides.",
      "You do not need to parse the string yourself; the hook hands you a ready-made `URLSearchParams` you can call `.get()` on."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice the default fallback and the fact that `params.get` returns a string, so we coerce with `Number`.",
      language: "tsx",
      code: "import { useSearchParams } from 'react-router-dom';\n\nfunction PaginatedList({ items }: { items: { id: number; name: string }[] }) {\n  const [params] = useSearchParams();\n  const page = Number(params.get('page') ?? '1');\n\n  return (\n    <div>\n      <span>Showing page {page}</span>\n      <ul>\n        {items.map((item) => (\n          <li key={item.id}>{item.name}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
    }
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
        text: "Wait for the browser cache to expire so the session token refreshes and the page reloads to the dashboard.",
        isCorrect: false,
        explanation: "Tempting if you conflate HTTP caching with client-side routing, but a redirect is an immediate programmatic navigation triggered by your code; no timer, cache expiry, or passive network event is involved."
      },
      {
        id: "B",
        text: "Use the `useNavigate` hook to call `navigate` with the target path and the `replace` flag set to true.",
        isCorrect: true,
        explanation: "Correct. `navigate` performs a client-side route change without a full page load, and `replace: true` removes the login URL from history so the back button does not return to the form."
      },
      {
        id: "C",
        text: "Overwrite `document.referrer` to point to `/dashboard` and let the browser follow it.",
        isCorrect: false,
        explanation: "`document.referrer` is a read-only string that records which page linked to the current one; assigning to it silently fails and it plays no role in triggering navigation."
      },
      {
        id: "D",
        text: "Call `window.close()` so the browser returns to the previously active tab, which is the dashboard.",
        isCorrect: false,
        explanation: "`window.close()` only works on tabs the script itself opened via `window.open`; for a user-opened tab it is a no-op, and even when it does work it destroys the session rather than routing to a new path."
      }
    ],
    correctAnswer: "B",
    explanation: "To perform an automatic redirect after login, call the `navigate` function returned by `useNavigate()` once authentication succeeds. Passing `{ replace: true }` as the second argument tells React Router to replace the current history entry with the new one instead of pushing it, so the back button skips the login page. The declarative alternative is rendering `<Navigate to='/dashboard' replace />` conditionally; React Router resolves it during the commit phase after the auth-state update triggers a re-render.\n\nIn practice, omitting `replace` leaves the login URL in the browser history. A user who presses back after reaching the dashboard lands on the login form again, which looks like a bug and can re-trigger the login request. The `replace` flag is the standard fix for exactly this case.\n\nOne nuance an interviewer may probe: `useNavigate` must be called inside a component rendered under a `<BrowserRouter>` or `<HashRouter>`. Calling it at module scope or outside the router tree throws. Also, `navigate` commits the URL change immediately; if the dashboard fetches data, handle that loading state in the dashboard component itself, not in the login handler.",
    interviewLine: "I call `navigate('/dashboard', { replace: true })` from `useNavigate` right after the auth API resolves \u2014 the `replace` flag keeps the login URL out of history so the back button doesn't send the user back to the form.",
    misconception: "Treating a redirect as a browser-level event (cache expiry, referrer change, tab close) rather than a programmatic state change to the router's location that React maps to a new component tree.",
    hints: [
      "Look at what `useNavigate` returns and when you would call it in the login flow.",
      "After the API call resolves, what function do you invoke to change the URL without a full page reload?",
      "The redirect is a client-side route change, not a browser-cache or document-property event."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice how `<Navigate>` is returned conditionally \u2014 React Router commits the redirect during the same render pass, no `useEffect` needed.",
      language: "tsx",
      code: "import { Navigate } from 'react-router-dom';\nimport { useAuth } from './auth-context';\n\nfunction ProtectedPage() {\n  const { isAuthenticated, loading } = useAuth();\n\n  if (loading) return <p>Loading\u2026</p>;\n  if (!isAuthenticated) return <Navigate to='/login' replace />;\n  return <h1>Dashboard</h1>;\n}"
    }
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
        text: "Use `react-i18next` or `react-intl` to read per-locale dictionaries, format dates and numbers with `Intl`, and switch the active locale through React context.",
        isCorrect: true,
        explanation: "Correct. Externalizing strings into per-locale dictionaries, reading them through a context-backed hook, and delegating date/number formatting to the `Intl` API covers the three concerns a real i18n setup must handle: text, formatting, and reactivity to locale changes."
      },
      {
        id: "B",
        text: "Localize an app by swapping the browser's `font-family` CSS rules per target language only.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"making text look right\" with \"making text say the right thing.\" A font-family change alters glyph rendering but leaves every string, number, and date in the source language; a German user still reads English words."
      },
      {
        id: "C",
        text: "Fork the application into 50 separate duplicate codebases, one per spoken language you support.",
        isCorrect: false,
        explanation: "Tempting only if you imagine each language as a separate product. In reality you share over 90 percent of the code; forking it means every bug fix, security patch, and feature ships 50 times and the branches diverge within weeks."
      },
      {
        id: "D",
        text: "Hardcode all text in one language and inject a Google Translate widget onto `document.body` at runtime.",
        isCorrect: false,
        explanation: "Tempting because it seems to require zero code changes. A browser widget rewrites the DOM after React has rendered, so the virtual DOM and the live DOM disagree, breaking reconciliation, keyboard navigation, and the accessibility tree."
      }
    ],
    correctAnswer: "A",
    explanation: "The standard approach is to externalize every user-facing string into per-locale JSON dictionaries and read them at render time through a hook such as `useTranslation` from react-i18next or `useIntl` from react-intl. The library stores the active locale in a React context, so calling `t('welcome_message')` in any component resolves the correct string for the current locale without prop-drilling.\n\nIn practice this means your components contain zero hardcoded text. You keep a file per locale (en.json, de.json, ar.json), and a locale switch is a single context update that triggers a re-render of the affected subtree. For dates and numbers you reach for `Intl.DateTimeFormat` and `Intl.NumberFormat`, which handle calendar systems, digit grouping, and currency symbols per locale.\n\nThe nuance an interviewer probes: pluralization. English has two forms, Arabic has six, and a naive `count === 1 ? 'item' : 'items'` check breaks the moment you add a third language. Libraries that support ICU MessageFormat (react-intl, i18next) let you declare the plural rules once and let the runtime pick the correct form.",
    interviewLine: "I externalize every user-facing string into per-locale JSON files, pull them through a `useTranslation` hook backed by React context so a locale switch re-renders the tree, and use `Intl.DateTimeFormat` and `Intl.NumberFormat` so dates and currency respect the active locale.",
    misconception: "Localization is treated as a rendering concern (font, CSS, visual style) rather than a data concern: which string is stored, which plural form applies, and how the number or date is formatted for the active locale.",
    hints: [
      "Think about where the text actually lives at runtime: is it baked into the component source or read from a separate data file at render time?",
      "What mechanism in React lets one state change (the active locale) cause every component to re-evaluate its strings without prop-drilling?",
      "Changing the font does not change the characters; what else must adapt for a user in a different locale to see correct dates, plurals, and number grouping?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the locale is a single piece of context state, and every component reads its string through `useT` rather than hardcoding text.",
      language: "tsx",
      code: "import { createContext, useContext, useState } from 'react';\n\ntype Locale = 'en' | 'de';\nconst dict: Record<Locale, Record<string, string>> = {\n  en: { greeting: 'Hello, {name}!', items: '{count} item(s)' },\n  de: { greeting: 'Hallo, {name}!', items: '{count} Element(e)' },\n};\n\nconst LocaleCtx = createContext<Locale>('en');\n\nfunction useT() {\n  const locale = useContext(LocaleCtx);\n  return (key: string) => dict[locale][key];\n}\n\nexport function App() {\n  const [locale, setLocale] = useState<Locale>('en');\n  const t = useT();\n  return (\n    <LocaleCtx.Provider value={locale}>\n      <button onClick={() => setLocale(locale === 'en' ? 'de' : 'en')}>Toggle</button>\n      <p>{t('greeting')}</p>\n    </LocaleCtx.Provider>\n  );\n}"
    }
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
        explanation: "Correct. It is the React binding for FormatJS, giving you `FormattedMessage`, `FormattedDate`, `FormattedNumber`, `FormattedTime` components and the `useIntl` hook to render locale-correct output without manual formatting logic."
      },
      {
        id: "B",
        text: "A numeric precision library that extends JavaScript's integer arithmetic with arbitrary-precision math.",
        isCorrect: false,
        explanation: "Tempting if you read the `int` in the package name as short for \"integer,\" but `intl` is the standard abbreviation for internationalization. The library formats and composes localized strings; it performs no arithmetic."
      },
      {
        id: "C",
        text: "A client-side database adapter that routes queries to geographically distributed international server clusters.",
        isCorrect: false,
        explanation: "The word \"international\" in the name refers to locale and language support, not to network topology. react-intl runs entirely in the browser, reads no database, and issues no network requests."
      },
      {
        id: "D",
        text: "A WebAssembly-accelerated rendering driver that offloads React's reconciliation loop to Intel CPU instruction sets.",
        isCorrect: false,
        explanation: "The `intl` abbreviation stands for internationalization, not the company Intel. react-intl is a pure JavaScript/TypeScript library with no native bindings, no hardware dependency, and no role in React's rendering pipeline."
      }
    ],
    correctAnswer: "A",
    explanation: "react-intl is the React binding for the FormatJS project. It exports components like `FormattedMessage`, `FormattedDate`, `FormattedNumber`, and `FormattedTime`, plus the `useIntl` hook, so a component can render locale-aware output without branching on locale in its own code.\n\nIn practice you author your messages once using ICU MessageFormat syntax, supply a locale (often from a user preference or `navigator.language`), and the library resolves the correct plural form, number grouping, date format, and translated string at render time. A French user sees `1 234,56 \u20ac`; an English user sees `$1,234.56` from the same data.\n\nA nuance worth stating: react-intl does not translate for you. You still write every locale's string. What it handles is the mechanical part \u2014 plural rules, number and date formatting, message composition with named and positional arguments \u2014 on top of the browser's `Intl` API.",
    interviewLine: "react-intl is the React binding for FormatJS. I use its `FormattedMessage` and `FormattedDate` components, or the `useIntl` hook, to render locale-correct numbers, dates, plurals, and translated strings without branching on locale inside my component code.",
    misconception: "The `intl` abbreviation is read as \"integer\" or the company \"Intel\" rather than the standard i18n shorthand for internationalization, so candidates reach for math, networking, or hardware explanations instead of locale formatting.",
    hints: [
      "The abbreviation in the package name is the key: what does `intl` stand for in the React ecosystem?",
      "Think about what a library must do so that a French user sees `1 234,56 \u20ac` while a Japanese user sees `\u00a51,234.56` from the same number.",
      "It is not a network, hardware, or math library; it is a formatting and message-composition layer that sits on top of the browser's `Intl` API."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The same `total` and `issued` values render as `1 234,56 \u20ac` and `15 mars 2025` under `fr-FR` with no manual formatting logic in the component.",
      language: "tsx",
      code: "import { IntlProvider, FormattedNumber, FormattedDate } from \"react-intl\";\n\nfunction Invoice({ total, issued }: { total: number; issued: Date }) {\n  return (\n    <div>\n      <p>\n        Total: <FormattedNumber value={total} style=\"currency\" currency=\"EUR\" />\n      </p>\n      <p>\n        Issued: <FormattedDate value={issued} month=\"long\" day=\"numeric\" year=\"numeric\" />\n      </p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <IntlProvider locale=\"fr-FR\">\n      <Invoice total={1234.56} issued={new Date(\"2025-03-15\")} />\n    </IntlProvider>\n  );\n}"
    }
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
        explanation: "Correct. ICU MessageFormat handles placeholders, plural categories, and gender rules; `Intl.DateTimeFormat` and `Intl.NumberFormat` handle dates, times, currencies, and percentages; all are driven by the locale prop on `IntlProvider`."
      },
      {
        id: "B",
        text: "Translating relational SQL database schemas into equivalent MongoDB document collections.",
        isCorrect: false,
        explanation: "Tempting if you read \"intl\" as \"data transformation,\" but react-intl formats UI strings in the browser; it has no ORM, query parser, or database driver involvement."
      },
      {
        id: "C",
        text: "Compiling React components ahead of time into native Android Java bytecode for the JVM.",
        isCorrect: false,
        explanation: "Tempting if you associate \"react\" with code generation, but react-intl is a runtime text-formatting library, not a compiler, bundler, or build tool."
      },
      {
        id: "D",
        text: "Compressing and transcoding video streams on the client using the H.264 and H.265 codecs.",
        isCorrect: false,
        explanation: "Tempting if you equate \"formatting\" with media encoding, but react-intl formats text, numbers, and dates for display; it never touches binary video or audio streams."
      }
    ],
    correctAnswer: "A",
    explanation: "react-intl is a React library for internationalization. Its core features are ICU MessageFormat for parameterized, pluralized, and gender-aware strings; locale-aware date and time formatting backed by the browser's `Intl.DateTimeFormat`; and number formatting for currencies, percentages, and plain numerals backed by `Intl.NumberFormat`. All of these are driven by a locale value supplied through the `IntlProvider` or the `useIntl` hook.\n\nIn a real component you write translation strings in ICU syntax, for example `{count, plural, =0 {No items} one {# item} other {# items}}`, and render them with `formatMessage` or `<FormattedMessage>`. Date and number output is delegated to the platform `Intl` APIs, so `1234.56` becomes `1.234,56 \u20ac` in `de-DE` and `$1,234.56` in `en-US` without any manual string splitting or regex.\n\nOne nuance an interviewer will probe: react-intl does not translate text between languages. It selects the correct pre-written variant based on locale, plural rules, and gender, then applies locale-aware formatting. The actual translations are authored by a developer or a translation team and stored in JSON message catalogs that the library reads at runtime.",
    interviewLine: "react-intl gives me ICU MessageFormat for parameterized and pluralized strings, plus locale-aware date, time, currency, and percent formatting backed by the browser's Intl API. It selects the right variant and formats the output; I author the translations in message catalogs.",
    misconception: "Thinking react-intl is a translation engine that converts text between languages, when it is actually a formatting and selection layer that picks the right pre-written string variant and applies locale-aware number and date rules at render time.",
    hints: [
      "Think about what \"intl\" stands for in the library name and what problem it solves inside a React component tree.",
      "Ask yourself: does the library generate translations, or does it format and select pre-written strings based on locale and grammatical rules?",
      "It is a frontend text-formatting library, not a database tool, a compiler, or a media encoder."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the plural rule and the currency symbol come from the locale, not from the component code.",
      language: "tsx",
      code: "import { IntlProvider, useIntl } from \"react-intl\";\n\nfunction Cart({ count }: { count: number }) {\n  const { formatMessage, formatDate, formatNumber } = useIntl();\n  return (\n    <div>\n      <p>{formatMessage(\n        { id: \"cart.items\",\n          defaultMessage: \"{count, plural, =0 {No items} one {# item} other {# items}\" },\n        { count }\n      )}</p>\n      <p>{formatDate(new Date(), { dateStyle: \"medium\" })}</p>\n      <p>{formatNumber(1234.56, { style: \"currency\", currency: \"EUR\" })}</p>\n    </div>\n  );\n}"
    }
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
        text: "Synchronous formatting via CSS rules and asynchronous formatting via WebAssembly modules.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"formatting\" with visual styling, but `react-intl` operates on message strings in JavaScript; it never emits CSS rules or spins up a WebAssembly runtime to produce output."
      },
      {
        id: "B",
        text: "Client-side formatting stored in cookies and server-side formatting via SQL queries.",
        isCorrect: false,
        explanation: "This mistakes a presentation library for a persistence layer. `react-intl` reads locale and message descriptors from the React tree and calls FormatJS in-process; it does not write to cookies or query a database."
      },
      {
        id: "C",
        text: "There is only one way: formatting always happens through a single global function.",
        isCorrect: false,
        explanation: "A single-function model would work for a minimal utility, but `react-intl` ships both JSX components and the `useIntl()` hook precisely so you can format where the result needs to be a React element or a plain string."
      },
      {
        id: "D",
        text: "Declarative JSX components (`<FormattedMessage>`, `<FormattedDate>`) and imperative hook methods (`useIntl().formatMessage()`, `formatNumber()`).",
        isCorrect: true,
        explanation: "Correct. Components render formatted text into the tree; the `useIntl()` hook returns methods that produce a string you can use anywhere a value is expected, such as `alt`, `title`, or `aria-label` props."
      }
    ],
    correctAnswer: "D",
    explanation: "react-intl exposes two formatting paths. The first is declarative JSX components \u2014 `<FormattedMessage>`, `<FormattedNumber>`, `<FormattedDate>` \u2014 which render formatted text directly into the tree. The second is the `useIntl()` hook, whose return object carries imperative methods like `formatMessage()`, `formatNumber()`, and `formatDate()` that return a plain string you can assign to a variable or pass as a prop.\n\nIn practice you pick by where the result goes. If the formatted value is the entire visible output of a node, a component is the natural fit. If you need the string for an `alt` attribute, a `title` tooltip, an `aria-label`, or any other place that expects a string value, you call the hook method and pass the result.\n\nBoth paths call the same FormatJS formatting engine under the hood, so for a given locale, message descriptor, and arguments the output is identical. The distinction is purely about the shape of the result: a rendered React element versus a JavaScript string.",
    interviewLine: "I use the `<FormattedMessage>` component when the formatted text is the whole node, and I switch to `useIntl().formatMessage()` when I need the string as a prop value like `alt` or `aria-label` \u2014 both hit the same FormatJS engine, so the output is identical.",
    misconception: "Treating `react-intl` as a styling or persistence library and therefore assuming its output must flow through CSS, cookies, or a database rather than through React elements and plain strings.",
    hints: [
      "Look at what `react-intl` exports: are they components, hooks, or both?",
      "Ask yourself: does the formatted result need to be a React element in the tree, or a plain string you assign to a variable?",
      "The library is not a CSS or database tool; its output is always a rendered element or a JavaScript string."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `formatMessage` returns a string used as a prop, while `<FormattedMessage>` renders the same message directly as the node's content.",
      language: "tsx",
      code: "import { useIntl, FormattedMessage } from 'react-intl';\n\nfunction ProductCard({ nameId, descriptionId }: { nameId: string; descriptionId: string }) {\n  const intl = useIntl();\n\n  return (\n    <figure>\n      <img\n        src=\"/product.png\"\n        alt={intl.formatMessage({ id: descriptionId })}\n      />\n      <figcaption>\n        <FormattedMessage id={nameId} />\n      </figcaption>\n    </figure>\n  );\n}"
    }
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
        text: "Pass dynamic values via the `values` prop as an object whose keys match the placeholder names in the message.",
        isCorrect: true,
        explanation: "Correct. The `values` prop maps each placeholder name in the ICU message to its runtime value, and react-intl performs the substitution at render time."
      },
      {
        id: "B",
        text: "Inject variables through global `window.name` variables so all components can read them at render time.",
        isCorrect: false,
        explanation: "Tempting if you think of globals as a way to share state across components, but `window.name` is a browser property for naming a window in multi-window contexts. It has no role in react-intl's rendering pipeline and would couple the component to a mutable global instead of an explicit prop."
      },
      {
        id: "C",
        text: "Manually string-concatenate variables onto the `id` prop to build the final message string before lookup.",
        isCorrect: false,
        explanation: "Tempting if you treat `id` as a template string, but `id` is a static lookup key into the translation catalog. Appending a value to it changes the key, breaks the lookup, and defeats the purpose of externalised translations."
      },
      {
        id: "D",
        text: "Placeholders are not supported in `react-intl`; you must use template literals outside the component.",
        isCorrect: false,
        explanation: "Tempting if you have only seen static strings in a codebase, but ICU MessageFormat placeholders are the core reason react-intl exists. They enable reordering, pluralisation, and selection in target languages without changing component code."
      }
    ],
    correctAnswer: "A",
    explanation: "The `values` prop is a plain object whose keys match the placeholder names in the ICU MessageFormat string. At render time, react-intl looks up the message by `id` (falling back to `defaultMessage`), finds `{name}` in the resolved string, and substitutes it with `values.name`. The component never touches the message string directly; the library handles the interpolation.\n\nThis separation means the sentence lives in a translation file, not in your JSX. A translator can reorder the placeholder, add a greeting, or change the punctuation for the target language, and the component code stays identical. You also keep the data flow explicit: the parent passes `name` in, the component passes it into `values`, and nothing is read from a global or a string built at call time.\n\nAn interviewer may follow up on edge cases. If a placeholder in the message has no matching key in `values`, react-intl renders the placeholder name as a visible fallback rather than throwing. The `values` object can also hold React elements (for rich-text segments) and nested objects for `select` or `plural` formats, so the same prop covers simple substitution and full ICU formatting.",
    interviewLine: "I pass dynamic values through the `values` prop as a plain object whose keys match the ICU placeholder names in the message, so a translator can reorder or restructure the sentence in the target language without me touching the component.",
    misconception: "Treating the `id` prop as a template string you can format with values, rather than a static key that points to a message in a translation catalog where placeholders are resolved separately through the `values` prop.",
    hints: [
      "Look at the `values` prop in the code \u2014 it is a plain object, not a string.",
      "What does react-intl do with that object at render time relative to the `{name}` token in the message string?",
      "The `id` prop is a lookup key, not a template \u2014 the dynamic data lives in a separate prop."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The same `values` prop drives ICU plural formatting, not just simple name substitution.",
      language: "tsx",
      code: "import { FormattedMessage } from 'react-intl';\n\nfunction CartBadge({ count }: { count: number }) {\n  return (\n    <FormattedMessage\n      id=\"cart.items\"\n      defaultMessage=\"{count, plural, =0 {No items} one {# item} other {# items}}\"\n      values={{ count }}\n    />\n  );\n}"
    }
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
        text: "Parse the computer's BIOS firmware language setting to determine the active locale.",
        isCorrect: false,
        explanation: "Tempting if you imagine locale as an OS-level hardware property, but React Intl is a pure JavaScript library \u2014 it reads the value from the `locale` prop you pass to `<IntlProvider>`, not from any system registry or firmware."
      },
      {
        id: "B",
        text: "Execute a raw SQL query against the browser's local storage cache.",
        isCorrect: false,
        explanation: "This confuses a locale string with a database record. `intl.locale` is a plain string property on an object returned by a hook; no query engine, no storage API, no async I/O is involved."
      },
      {
        id: "C",
        text: "Read `document.currentLocale` from the browser DOM.",
        isCorrect: false,
        explanation: "There is no `document.currentLocale` property. The closest browser API is `navigator.language`, but React Intl does not read it automatically \u2014 you must pass the locale explicitly as a prop to `<IntlProvider>`."
      },
      {
        id: "D",
        text: "Call `useIntl()` in a component and read `intl.locale`, or read the `locale` prop on `<IntlProvider>`.",
        isCorrect: true,
        explanation: "Correct. `useIntl()` returns the intl context object from the nearest `<IntlProvider>` ancestor, and `intl.locale` is the string set via that provider's `locale` prop."
      }
    ],
    correctAnswer: "D",
    explanation: "`useIntl()` is a hook from `react-intl` that returns the intl context object created by the nearest `<IntlProvider>` ancestor. The `locale` property on that object is the exact string you passed as the `locale` prop to the provider, so `intl.locale` gives you the current locale synchronously during render.\n\nIn a real codebase this means any component inside the provider tree can read the locale without prop-drilling. If you swap the `locale` prop from `\"en\"` to `\"fr-CA\"`, React re-renders the subtree and every `useIntl()` consumer sees the new string on the next render pass \u2014 no subscription, no effect, no async fetch.\n\nOne edge an interviewer will probe: `useIntl()` throws if called outside an `<IntlProvider>` ancestor, and `intl.locale` is a plain string, not a `Locale` object. It also does not auto-read `navigator.language`; you must pass that value yourself if you want browser-based detection.",
    interviewLine: "I call `useIntl()` inside any component under `<IntlProvider>` and read `intl.locale` \u2014 it's just the string I passed as the provider's `locale` prop, available synchronously during render with no extra effect or subscription.",
    misconception: "The learner treats locale as a global value the browser or OS exposes (a DOM property, a hardware setting, a cached record) rather than a string the application sets on a React context provider and reads back through a hook.",
    hints: [
      "Look at what `useIntl()` returns \u2014 it is an object, and `locale` is one of its string properties.",
      "Trace that `locale` value back to where it is set: the `locale` prop on `<IntlProvider>`.",
      "No browser API call, no OS query, no async fetch \u2014 it is a plain string on a React context object."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Switching the `locale` prop on `<IntlProvider>` re-renders every `useIntl()` consumer with the new string on the next pass.",
      language: "tsx",
      code: "import { IntlProvider, useIntl } from 'react-intl';\n\nfunction LocaleBadge() {\n  const { locale } = useIntl();\n  return <span data-testid=\"locale\">{locale}</span>;\n}\n\nfunction App({ locale }: { locale: string }) {\n  return (\n    <IntlProvider locale={locale} messages={{}}>\n      <LocaleBadge />\n    </IntlProvider>\n  );\n}"
    }
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
        text: "Manually click through every button and form in the browser, then jot pass-or-fail results in a paper notebook at the end of each sprint.",
        isCorrect: false,
        explanation: "Tempting if you equate testing with simply using the app, but manual clicking gives no repeatability, no regression coverage, and no way to run in CI. You cannot scale this to hundreds of components or catch a bug introduced six weeks ago."
      },
      {
        id: "B",
        text: "Open the compiled minified bundle in a hex editor and visually inspect the raw bytes to confirm each component behaves correctly before shipping.",
        isCorrect: false,
        explanation: "This assumes the minified bundle is the unit under test, but production bundles are transformed, inlined, and stripped of source structure. You cannot assert on component behaviour, accessibility, or user flows from raw bytes."
      },
      {
        id: "C",
        text: "Delete all automated test suites from the repository so that production build speeds stay high and CI pipelines finish faster.",
        isCorrect: false,
        explanation: "This conflates test execution with build output. Tests run in a separate CI step and are never bundled into the production artifact, so deleting them does not change build speed\u2014it only removes the safety net that catches regressions."
      },
      {
        id: "D",
        text: "Use a test runner (Jest or Vitest) with React Testing Library for accessible, user-centric component tests, plus Playwright or Cypress for end-to-end flows.",
        isCorrect: true,
        explanation: "Correct. This is the industry-standard layering: RTL verifies what the user sees and can do at the component level, while a browser-automation tool verifies the full application flow in a real browser."
      }
    ],
    correctAnswer: "D",
    explanation: "The standard stack for testing React applications pairs a test runner such as Jest or Vitest with React Testing Library. RTL lets you render a component into a test DOM, query it the way a user would (by role, label, or text), simulate interactions, and assert on the accessible output. For full application flows, Playwright or Cypress drives a real browser end to end.\n\nIn practice this means your test file imports the component, calls render, finds the element by its accessible role, fires a user event like click or type, and checks that the resulting DOM reflects the expected state. You never reach into internal state or hook internals; the test stays at the level of what a user can see and do.\n\nThe nuance an interviewer probes next: RTL tests verify a component in isolation against its contract, while E2E tests verify the whole app wiring\u2014routing, data fetching, browser APIs\u2014works together. Skipping either layer leaves a gap. RTL catches component regressions; E2E catches integration bugs that isolated tests cannot see.",
    interviewLine: "I write component tests with React Testing Library\u2014render the component, query by accessible role, simulate the user action, assert on the visible result\u2014then layer Playwright on top for full end-to-end flows that exercise routing and data fetching.",
    misconception: "Testing a React component means asserting on its internal state, hook calls, or private implementation details, rather than on the accessible output a user actually sees and interacts with.",
    hints: [
      "Think about what a user actually does: clicks, types, reads. Your test should mirror that, not peek inside the component.",
      "A test runner executes your assertions; a library like RTL gives you the render-and-query API. What sits above both for full-browser coverage?",
      "You do not need to test minified output or skip tests for speed\u2014the question is which layer (component vs. full app) each tool covers."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the test queries by accessible role and name, simulates a real click, and asserts on visible text\u2014no state inspection, no hook mocking.",
      language: "tsx",
      code: "import { render, screen, fireEvent } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\nimport { Counter } from './Counter';\n\ndescribe('Counter', () => {\n  it('increments the visible count when the user clicks', () => {\n    render(<Counter initial={0} />);\n    const button = screen.getByRole('button', { name: 'increment' });\n    fireEvent.click(button);\n    expect(screen.getByText('1')).toBeInTheDocument();\n  });\n});"
    }
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
        text: "Import and call the hook directly in a Node.js test file without any React renderer or test harness.",
        isCorrect: false,
        explanation: "Tempting if you treat a custom hook like a plain utility function, but hooks read React's internal dispatcher (`ReactCurrentDispatcher`) which is only set during a render pass. Calling `useCounter()` outside a component throws the \"Invalid hook call\" error before any assertion runs."
      },
      {
        id: "B",
        text: "Use `renderHook(() => useMyHook())` from `@testing-library/react` and wrap state-updating triggers in `act()` when testing outside user events.",
        isCorrect: true,
        explanation: "Correct. `renderHook` mounts a minimal component that calls your hook, giving you `result.current` to assert on. Wrapping state-updating calls in `act()` guarantees React applies the update before the next assertion reads the value."
      },
      {
        id: "C",
        text: "Instantiate the hook with the `new` keyword, `new useMyHook()`, in the test file.",
        isCorrect: false,
        explanation: "A confusion with class components, where `new` invokes a constructor. Hooks are plain arrow or function declarations with no prototype or constructor; using `new` on them throws a `TypeError: ... is not a constructor` before any React code runs."
      },
      {
        id: "D",
        text: "Hooks cannot be tested in isolation under any circumstances because they are bound to a component instance.",
        isCorrect: false,
        explanation: "This conflates the hook's dependency on a render context with a requirement for a specific component. `renderHook` was designed precisely to supply that render context without you writing a wrapper component, so the hook is tested in isolation while still having the dispatcher it needs."
      }
    ],
    correctAnswer: "B",
    explanation: "`renderHook` from `@testing-library/react` mounts a throwaway component whose only job is to call your hook, then exposes the return value on `result.current`. Because the hook runs inside a real React render, its internal dispatcher is set and `useState`, `useEffect`, etc. work normally. When you call a function returned by the hook (like `increment`) that triggers a state update, you wrap that call in `act(() => { \u2026 })` so React flushes the update synchronously before the next line of your test reads the new value.\n\nIn practice the pattern is: `const { result } = renderHook(() => useCounter())`, then `act(() => { result.current.increment(); })`, then `expect(result.current.count).toBe(1)`. Without `act()`, React may defer the state write and the assertion reads a stale `result.current`, producing a confusing failure that looks like the hook itself is broken.\n\nOne detail an interviewer may probe: `renderHook` originally lived in the separate `@testing-library/react-hooks` package. That package was deprecated and its API merged into `@testing-library/react` in v13 (2021), so new code imports from `@testing-library/react` directly. Also, `act()` is only needed for programmatic state updates; if the update is triggered through a simulated user event like `fireEvent.click`, the event wrapper already handles the flush.",
    interviewLine: "I use `renderHook` from React Testing Library to mount the hook in a minimal component, then wrap any state-updating call in `act()` so React flushes the update before I assert on `result.current`.",
    misconception: "A custom hook is treated like a plain utility function you can invoke from anywhere in Node, forgetting that it depends on React's internal dispatcher which only exists while a component is rendering.",
    hints: [
      "Look at the import in the code snippet: which package actually provides `renderHook` in a current project?",
      "What does `act()` guarantee about the timing of a state write relative to the next line of your test?",
      "A hook is neither a class nor a free-standing utility; it needs a React render pass to access its internal dispatcher."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `act()` wraps the call that triggers a state update, and the assertion on `result.current` comes after the flush.",
      language: "typescript",
      code: "import { renderHook, act } from '@testing-library/react';\nimport { useState } from 'react';\n\nfunction useToggle() {\n  const [on, setOn] = useState(false);\n  const toggle = () => setOn((v) => !v);\n  return { on, toggle };\n}\n\ntest('toggles state', () => {\n  const { result } = renderHook(() => useToggle());\n  expect(result.current.on).toBe(false);\n  act(() => {\n    result.current.toggle();\n  });\n  expect(result.current.on).toBe(true);\n});"
    }
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
        text: "Custom hooks that read context cannot be tested because the context tree only exists during a full page render.",
        isCorrect: false,
        explanation: "Tempting if you imagine a hook as a free-floating function with no component boundary, but `renderHook` accepts a `wrapper` option that mounts any provider tree around the hook, so context-dependent hooks are testable exactly like any other."
      },
      {
        id: "B",
        text: "Convert the custom hook into a class component so its state and lifecycle methods can be inspected directly.",
        isCorrect: false,
        explanation: "Tempting if you think hooks are just syntactic sugar that must be \"compiled\" to classes for inspection, but `renderHook` calls the hook directly inside a minimal component; converting to a class changes the code under test and defeats the purpose of testing the hook as written."
      },
      {
        id: "C",
        text: "Capture the hook's return value into a global variable so test assertions outside the component can read it.",
        isCorrect: false,
        explanation: "Tempting if you picture hook state living in some inspectable global scope, but React stores hook state in an internal fiber node; the only supported access path is `result.current` from `renderHook` or the component's rendered output."
      },
      {
        id: "D",
        text: "Use `renderHook` with a `wrapper` to mount the needed context providers, then assert on `result.current`.",
        isCorrect: true,
        explanation: "Correct. Passing a `wrapper` option mounts the necessary context providers around the hook's internal component, and `result.current` gives you a live reference to the hook's return value for assertions."
      }
    ],
    correctAnswer: "D",
    explanation: "`renderHook` from `@testing-library/react` mounts a minimal internal component that calls your hook, and exposes the return value through `result.current`. When the hook reads context \u2014 a theme provider, a router, a store \u2014 you pass a `wrapper` function that renders the required providers around that internal component, so the hook sees the same context tree it would see in the app.\n\nWithout the wrapper, a hook that calls `useContext(ThemeContext)` would either crash or silently return the context default, making every assertion on `result.current` meaningless. With it, you exercise the real derived state, effects, and memoisation logic rather than a fallback value, which is the point of testing the hook at all.\n\nTwo details an interviewer will probe: you must wrap any call that triggers a state update (e.g. `result.current.doSomething()`) in `act` so React flushes the update before you assert, and you should call the `unmount` function returned by `renderHook` (or let the test framework do it) to avoid leaking the component tree and triggering \"not wrapped in act\" warnings in later tests.",
    interviewLine: "I use `renderHook` from Testing Library, pass a `wrapper` that mounts the context providers the hook depends on, then assert on `result.current` after wrapping any state-triggering calls in `act`.",
    misconception: "Treating a custom hook as a plain function you can call outside a component (`const value = useCustomHook()`) and then wondering why React throws \"Invalid hook call\" \u2014 in reality the hook must execute inside a component's render, which is exactly what `renderHook` provides for free.",
    hints: [
      "Look at what `renderHook` actually mounts under the hood \u2014 it is a component, so it needs the same context tree as any component.",
      "Ask yourself: if the hook calls `useContext(ThemeContext)`, who provides that context in the test environment?",
      "You do not need to render a full page or convert the hook to a class; the test utility handles the component boundary for you."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice how the wrapper supplies the provider the hook reads, and `act` flushes the state update before the assertion runs.",
      language: "tsx",
      code: "import { renderHook, act } from '@testing-library/react';\nimport type { ReactNode } from 'react';\nimport { useCart } from './useCart';\nimport { CartProvider } from './CartContext';\n\nconst wrapper = ({ children }: { children: ReactNode }) => (\n  <CartProvider initialItems={['apple']}>{children}</CartProvider>\n);\n\ntest('useCart adds an item', () => {\n  const { result } = renderHook(() => useCart(), { wrapper });\n\n  act(() => {\n    result.current.addItem('banana');\n  });\n\n  expect(result.current.items).toEqual(['apple', 'banana']);\n});"
    }
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
        text: "Compresses recorded user-action video sessions into MP4 files for later playback and replay.",
        isCorrect: false,
        explanation: "The word \"action\" here refers to a user-initiated mutation (a form submit, a button press), not a video recording. The hook has no relationship to media encoding."
      },
      {
        id: "B",
        text: "Forces the browser tab to shut down and reload whenever the async action rejects with an error.",
        isCorrect: false,
        explanation: "Tempting if you imagine an unhandled rejection crashing the tab, but React never calls `process.exit` or closes the window. Errors in an action propagate to the nearest error boundary; the page stays alive."
      },
      {
        id: "C",
        text: "Takes an async action and initial state, returning `[state, formAction, isPending]` to wire up a mutation's result and loading flag.",
        isCorrect: true,
        explanation: "Correct. useActionState (introduced in React 19, formerly useFormState) bundles the state, the dispatch function, and the pending flag into one hook so a form mutation and its UI feedback share a single source of truth."
      },
      {
        id: "D",
        text: "Stores submitted user passwords in plain, publicly readable browser cookies for the session.",
        isCorrect: false,
        explanation: "No React hook writes to `document.cookie`, and a state-management hook has no reason to handle credential storage. This conflates a UI-state tool with a persistence or security mechanism."
      }
    ],
    correctAnswer: "C",
    explanation: "useActionState accepts an async action function and an initial state value, and returns a three-element tuple: [state, formAction, isPending]. Passing formAction to a <form action={...}> prop triggers the action; while the action is running, isPending is true, and when the action resolves, state is replaced with whatever the action returned.\n\nIn practice this replaces the pattern of three separate useState calls (for data, loading, and error) plus a manual try/catch and setState sequence. Because formAction is itself a function that accepts FormData, you can wire it directly to a form element without writing an onSubmit handler.\n\nOne nuance an interviewer will probe: the hook does not silently catch thrown errors. If the action function throws, the error reaches the nearest error boundary. To surface an error in state, the action must try/catch internally and return an error object as its result.",
    interviewLine: "useActionState gives me back a formAction I can drop straight onto a form element, an isPending flag I bind to a spinner, and a state slot that holds whatever my async action returns, so I skip the three-useState and manual-setState boilerplate.",
    misconception: "Treating useActionState as a general-purpose useState replacement or assuming it automatically catches and stores thrown errors in state, when in fact the action function must handle its own try/catch to put an error object into state.",
    hints: [
      "Look at the return value: it is a three-element tuple, not a single value or an object.",
      "Ask what happens between the moment formAction is invoked and the moment the action promise settles \u2014 which part of the tuple changes?",
      "The hook does not swallow exceptions; if the action throws, the error goes to the nearest error boundary, not into state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how the action function handles its own try/catch to put an error message into state, and how isPending drives the button label without any extra state.",
      language: "tsx",
      code: "import { useActionState } from \"react\";\n\ntype Result = { ok: true; msg: string } | { ok: false; error: string };\n\nasync function saveProfile(prev: Result, formData: FormData): Promise<Result> {\n  try {\n    const res = await fetch(\"/api/profile\", { method: \"POST\", body: formData });\n    if (!res.ok) throw new Error(\"Server rejected the update\");\n    return { ok: true, msg: \"Profile saved\" };\n  } catch (e) {\n    return { ok: false, error: e instanceof Error ? e.message : \"Unknown error\" };\n  }\n}\n\nexport function ProfileForm() {\n  const [result, formAction, isPending] = useActionState<Result>(saveProfile, { ok: true, msg: \"\" });\n\n  return (\n    <form action={formAction}>\n      <input name=\"name\" required />\n      <button disabled={isPending}>{isPending ? \"Saving\u2026\" : \"Save\"}</button>\n      {result.ok ? <p>{result.msg}</p> : <p role=\"alert\">{result.error}</p>}\n    </form>\n  );\n}"
    }
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
        text: "use is a Node.js-only utility for reading files in server terminal scripts and is not available in browser components.",
        isCorrect: false,
        explanation: "Tempting if you confuse the hook name with a Node.js built-in, but use is a React hook that runs inside Client and Server Components in the browser or on the server; it is not a CLI or file-system utility."
      },
      {
        id: "B",
        text: "use replaces CSS stylesheet imports and must be called once at the top of each module to load styles at build time.",
        isCorrect: false,
        explanation: "This mistakes use for a bundler or CSS-in-JS feature. It is a React hook whose sole job is to read a Promise or Context value during render; it has no interaction with stylesheets or the build pipeline."
      },
      {
        id: "C",
        text: "use is just useEffect plus fetch combined, and like every other hook it must be called unconditionally at the top level.",
        isCorrect: false,
        explanation: "The belief here is that all hooks run after paint and must obey the Rules of Hooks. use runs during render, reads Promises directly, and is explicitly allowed in conditionals and loops because it carries no internal state slot."
      },
      {
        id: "D",
        text: "use reads Promises and Context during render, suspends until resolution, and can be called conditionally or in loops because it is not stateful.",
        isCorrect: true,
        explanation: "Correct. use unwraps a Promise or Context synchronously during render, delegates the loading UI to the nearest Suspense boundary, and is the only React hook that may be called conditionally or inside loops."
      }
    ],
    correctAnswer: "D",
    explanation: "`use` reads a Promise or a Context during render. When you pass a Promise, the component suspends \u2014 the nearest <Suspense> boundary shows its fallback \u2014 and once the Promise resolves, React re-renders the suspended subtree with the resolved value available synchronously. This is fundamentally different from `useEffect` + `fetch`, where the effect runs after paint, you store the result in state, and the first render always shows a loading placeholder.\n\nIn practice this removes the `isLoading` / `data` / `error` state trio. The component either has data or it does not render at all; Suspense handles the \"not yet\" case. You also get the ability to call `use` conditionally or inside a loop because it is not a stateful hook \u2014 it simply unwraps a value, so React does not need to track a slot for it.\n\nOne nuance an interviewer will probe: in a Client Component you must create the Promise outside the render call (or wrap the fetch in `cache()`) so that re-renders do not trigger a new fetch. In a Server Component the promise is naturally stable because render runs once per request.",
    interviewLine: "I use `use` to read a Promise during render and suspend the component until it resolves, so the data is synchronously available on the first successful render. Because it is not stateful, I can call it conditionally or in a loop, which I could never do with `useState` or `useEffect`.",
    misconception: "Treating `use` as another stateful hook that must obey the Rules of Hooks, when in fact it is a read-only accessor with no internal slot, which is why conditional and loop calls are safe.",
    hints: [
      "Look at when the value becomes available: does the component render before or after the data arrives?",
      "Ask whether the hook carries internal state that React must track across renders.",
      "The effect-based approach needs a separate loading state; does `use` still need one?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice that `use` is called inside a `.map()` callback, which would be illegal for `useState` or `useEffect`.",
      language: "tsx",
      code: "import { use, Suspense } from 'react';\n\nfunction Gallery({ imagePromises }: { imagePromises: Promise<string>[] }) {\n  return (\n    <div className=\"gallery\">\n      {imagePromises.map((p, i) => {\n        const url = use(p);\n        return <img key={i} src={url} alt={`photo ${i}`} />;\n      })}\n    </div>\n  );\n}\n\nfunction Page() {\n  const pics = [fetchImg('a.jpg'), fetchImg('b.jpg'), fetchImg('c.jpg')];\n  return (\n    <Suspense fallback={<p>Loading gallery\u2026</p>}>\n      <Gallery imagePromises={pics} />\n    </Suspense>\n  );\n}"
    }
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
        explanation: "Correct. React is a library (not a framework) that lets you describe UI as a function of state, composes it from reusable components, and uses Virtual DOM diffing to patch only the nodes that changed."
      },
      {
        id: "B",
        text: "A compiler that transpiles CSS into WebAssembly modules for cross-platform rendering.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'React' with build-tooling vocabulary, but React is a runtime JavaScript library that renders to the DOM (or other targets); it neither compiles CSS nor emits WebAssembly."
      },
      {
        id: "C",
        text: "A monolithic backend MVC framework that manages PostgreSQL connections, request routing, and server clustering.",
        isCorrect: false,
        explanation: "This describes a full-stack backend framework. React handles only the view layer in the browser (or via SSR); it ships no database drivers, no request lifecycle, and no clustering primitives."
      },
      {
        id: "D",
        text: "A browser extension that injects jQuery plugins into production sites for progressive enhancement.",
        isCorrect: false,
        explanation: "React is a standalone library you bundle into your own application; it is not a browser extension, does not depend on jQuery, and is not designed to be injected into third-party pages."
      }
    ],
    correctAnswer: "A",
    explanation: "React is a JavaScript library, not a full framework, for building the view layer of web applications. You describe what the UI should look like for a given state (declarative), and React reconciles that description against the previous render to compute the minimum set of DOM changes. Components are small, composable units \u2014 functions that return JSX \u2014 and state flows one direction from parent to child via props, with child-to-parent communication through callbacks.\n\nIn a single-page application this means the browser never reloads the document between user actions. A button click calls a state setter, React re-renders the affected component subtree, diffs the Virtual DOM, and patches only the changed nodes. The rest of the page stays untouched, which is why SPAs feel instant without a full navigation.\n\nThe nuance an interviewer probes next: React is a library, so routing, data fetching, and server rendering are not built in. You add React Router, a fetch layer, or a meta-framework like Next.js. Calling React a 'framework' is technically imprecise, and conflating it with a backend tool (MVC controllers, database drivers, clustering) shows the candidate has not separated the view layer from the rest of the stack.",
    interviewLine: "React is a declarative, component-based JavaScript library for the view layer. I describe the UI as a function of state, React diffs the Virtual DOM to find the minimal set of DOM mutations, and I keep data flow unidirectional through props and callbacks.",
    misconception: "Treating React as a full-stack framework or a build tool rather than a view-layer library. This leads candidates to expect routing, data fetching, or server logic to be built in, or to confuse it with compilers, bundlers, or backend MVC stacks.",
    hints: [
      "Is React a library, a framework, a compiler, or a backend? Check which layer of the stack it actually owns.",
      "Think about what happens when you call `setState`: React re-renders a component subtree and patches the DOM, not the whole page.",
      "If an option mentions CSS compilation, PostgreSQL, or jQuery injection, it is describing a different tool entirely."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice the component is a pure function of its props and state; React handles the DOM update when `setCount` fires, so you never touch `document` directly.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter({ initial }: { initial: number }) {\n  const [count, setCount] = useState(initial);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}\n\nexport function App() {\n  return <Counter initial={0} />;\n}"
    }
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
        explanation: "Tempting if you associate React with its 2013 debut, but the project was in its 0.x era that year. No major version 12 was ever published; the public line went 0.14.x, then 15, 16, 17, 18, 19."
      },
      {
        id: "B",
        text: "React 25 (an unreleased experimental prototype).",
        isCorrect: false,
        explanation: "Plausible if you extrapolate forward from the current number, but there is no announced 25.x track. The 19.x line is the active release cycle, and no 20, 21, or 25 exists in any public channel."
      },
      {
        id: "C",
        text: "React 5 (which added AngularJS compatibility).",
        isCorrect: false,
        explanation: "This conflates two unrelated frameworks. React never shipped a version 5, and it has no AngularJS compatibility layer. The first public releases were 0.3.x through 0.14.x, then 15.0.0."
      },
      {
        id: "D",
        text: "React 19 (the current stable release).",
        isCorrect: true,
        explanation: "Correct. React 19 is the latest major generation, stabilizing Server Components and shipping Actions, `useActionState`, and the `use` hook. The React Compiler was announced in the same cycle as a companion package."
      }
    ],
    correctAnswer: "D",
    explanation: "React 19 is the current major release. Version 19.0.0 shipped on December 5, 2024, and 19.1.0 followed on March 28, 2025. It stabilizes React Server Components, introduces Actions and the `useActionState` hook, and adds the `use` hook for reading promises and context during render.\n\nIn a project, this means you can wire a form to a server action without a separate event handler, track pending and error state with `useActionState`, and read a `Promise` inline with `use` instead of wrapping it in `useEffect` plus `useState`. The React Compiler, announced alongside React 19, is a separate package that auto-memoizes components and hooks.\n\nThe version history matters for ruling out the other options: React's public releases began at 0.3.0 and jumped to 15.0.0, so no major version 5 or 12 ever existed. React 18 is the previous major and is still widely deployed, but it is not the latest.",
    interviewLine: "I'd say React 19 is the current major release, shipping in December 2024: it stabilizes Server Components, adds Actions with `useActionState` and `useFormStatus`, and gives me the `use` hook for reading promises during render without an effect.",
    misconception: "Assuming React versions are sequential integers starting at 1, when in fact the public release line began at 0.3.0 and jumped to 15.0.0, so versions like 5 or 12 never existed as major releases.",
    hints: [
      "Check whether the version number actually exists in React's published history.",
      "React's public releases started at 0.3.0 and jumped to 15.0.0, so any integer between 1 and 14 was never a major version.",
      "The current major shipped in late 2024 and includes Actions, the `use` hook, and stabilized Server Components."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A form using `useActionState` to track pending and error state, a pattern that is new in React 19.",
      language: "tsx",
      code: "import { useActionState } from \"react\";\n\nexport function SubmitForm() {\n  const [state, formAction, pending] = useActionState(\n    async (_prev, formData) => {\n      const name = formData.get(\"name\");\n      await new Promise((r) => setTimeout(r, 800));\n      return { message: `Hello, ${name}`, error: null };\n    },\n    { message: null, error: null }\n  );\n\n  return (\n    <form action={formAction}>\n      <input name=\"name\" placeholder=\"Your name\" />\n      <button disabled={pending}>{pending ? \"Sending\u2026\" : \"Send\"}</button>\n      {state.error && <p role=\"alert\">{state.error}</p>}\n      {state.message && <p>{state.message}</p>}\n    </form>\n  );\n}"
    }
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
        text: "Props live on the server's disk while state is persisted in the user's browser cookies.",
        isCorrect: false,
        explanation: "Tempting if you picture React as a client-server split where each side owns its data, but both props and state are plain JavaScript values held in the runtime's heap. Neither touches disk or cookies unless you write them there explicitly."
      },
      {
        id: "B",
        text: "Props can be freely mutated by child components, while state is strictly read-only everywhere.",
        isCorrect: false,
        explanation: "Reverses the actual contract. A child receiving `props.count` cannot reassign it, while state is the one value the component is allowed to change — through its `useState` setter or class `setState` — and that change triggers the next render."
      },
      {
        id: "C",
        text: "Props may only hold string values, whereas state may only hold numeric values in a component.",
        isCorrect: false,
        explanation: "Both accept any JavaScript value: objects, arrays, functions, symbols, `null`. The type system (TypeScript) constrains what you pass, but React itself imposes no value-type restriction on either props or state."
      },
      {
        id: "D",
        text: "Props are read-only configuration passed from parent to child; State is internal data owned and managed by the component that triggers re-renders on change.",
        isCorrect: true,
        explanation: "Correct. Props flow one direction, parent to child, and the child treats them as immutable inputs; state is the component's own mutable data, updated only through its setter, and every committed state change schedules a re-render."
      }
    ],
    correctAnswer: "D",
    explanation: "Props are the parent's way of passing configuration into a child. They behave like function arguments: the child reads them but cannot reassign the prop variable, and React does not track prop changes for re-renders on its own \u2014 a re-render happens when the parent re-renders and passes new values. State, declared with `useState` or a class `setState`, is owned by the component itself. Calling the setter schedules a re-render of that component (and its children) with the new value.\n\nIn practice this means a child that needs to change a value must call its own setter, not mutate the prop it received. Trying to do `props.count = 5` either silently fails or triggers a lint error, and the UI never updates because React never sees a state transition. Conversely, a component that stores a value in a plain local variable instead of state will not re-render when that variable changes, so the displayed value goes stale.\n\nOne nuance an interviewer may probe: props are \"read-only\" in the sense that the child cannot reassign them, but a parent can pass a new object or array reference every render, so the child sees a different prop value without any mutation. State updates are also not synchronous DOM writes; React batches them and commits the new DOM in a single paint, which is why multiple `setCount` calls in one handler produce one re-render.",
    interviewLine: "Props are the parent's inputs \u2014 I read them but never reassign them. State is my component's own data; I call the setter, React batches the update, and the next render picks up the new value.",
    misconception: "Treating props and state as the same kind of variable that differs only in where it is declared, rather than recognizing that props are external inputs the child cannot change and state is internal data the component controls and that drives re-renders.",
    hints: [
      "Ask who passes the value in and who is allowed to change it.",
      "Think of props as function arguments and state as a local variable that only the component's setter can reassign.",
      "The component that declares `useState` is the only one that can trigger a re-render from that change."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `initialScore` is read once to seed state; after that, only `setScore` changes what the component displays.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction ScoreBoard({ initialScore }: { initialScore: number }) {\n  const [score, setScore] = useState(initialScore);\n\n  return (\n    <div>\n      <p>Score: {score}</p>\n      <button onClick={() => setScore((s) => s + 1)}>+1</button>\n    </div>\n  );\n}\n\nexport default function App() {\n  return <ScoreBoard initialScore={10} />;\n}"
    }
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
        text: "Static image or asset files that the browser fetches and loads into the HTML document head.",
        isCorrect: false,
        explanation: "Tempting only if you confuse a React component with a static asset. A component is executable code that returns a tree of elements; it is not a file type the browser fetches and inserts into `<head>`."
      },
      {
        id: "B",
        text: "Reusable UI units: Functional components (functions using Hooks) or Class components (extending `React.Component`).",
        isCorrect: true,
        explanation: "Correct. A React component is a function or class that returns renderable output, and those are the two shapes the library recognises. Functional components are the modern default; class components remain supported for legacy code."
      },
      {
        id: "C",
        text: "Database stored procedures written in SQL and executed on a PostgreSQL server at query time.",
        isCorrect: false,
        explanation: "This conflates frontend UI code with backend database logic. React components run in the browser (or during SSR on Node.js) and produce a visual tree; they have no direct relationship to SQL or a database engine."
      },
      {
        id: "D",
        text: "Standalone operating-system processes that run outside the browser as native executables.",
        isCorrect: false,
        explanation: "A component is not an OS process. It is a JavaScript function or class that the React runtime calls during rendering, inside the browser's JavaScript engine or inside Node.js during server-side rendering."
      }
    ],
    correctAnswer: "B",
    explanation: "A React component is a function or class that returns renderable output: JSX, a string, a number, an array of children, or another component. There are two shapes. A functional component is a plain JavaScript function that can call Hooks like `useState` and `useEffect` to manage state and side effects. A class component is an ES6 class extending `React.Component`, using `this.state` and lifecycle methods such as `componentDidMount`.\n\nIn practice, since Hooks landed in React 16.8, nearly all new code uses functional components. A class component still works and you will see them in older codebases, but the two shapes are functionally equivalent: both receive props, both can hold state, and both render a subtree into the DOM.\n\nOne detail an interviewer may probe: a component is not a DOM element. It is a unit of code. In JSX, we distinguish components from built-in HTML tags (like `div`) by using a capital letter for the component name, which tells the parser to treat it as a custom function or class invocation rather than a native tag.",
    interviewLine: "A React component is a plain function or a class that returns renderable output; in modern code I write functions and use Hooks for state and effects, which covers everything class components used to handle, so I only reach for a class when maintaining a legacy codebase.",
    misconception: "Treating a React component as a DOM node or a CSS class rather than as a function or class that produces a tree of elements. The component is the unit of code; the DOM elements it returns are the output.",
    hints: [
      "Look at what a component actually is in source code: a function declaration or a class, not a file format or a server construct.",
      "Ask what two shapes a component can take and what each one returns during render.",
      "It is not an image, a stored procedure, or an OS process; it is a unit of UI code that the React runtime calls."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the component is just a function with a capital-letter name; the `useState` call gives it state without any class syntax.",
      language: "tsx",
      code: "function Badge({ label, count }: { label: string; count: number }) {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <button onClick={() => setOpen(!open)}>\n      {label}: {count}\n      {open && <span> (details)</span>}\n    </button>\n  );\n}"
    }
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
        text: "Browsers rename `.jsx` files to `.html` and render the result as a document without executing any JavaScript.",
        isCorrect: false,
        explanation: "Tempting if you equate the `.jsx` extension with a browser-recognised format, but no browser performs a file-rename step, and JSX describes a component tree that only a JavaScript runtime can instantiate."
      },
      {
        id: "B",
        text: "Browsers cannot read JSX directly; a transpiler such as Babel, SWC, or ESBuild must convert it into `React.createElement` or `_jsx` function calls before the code runs.",
        isCorrect: true,
        explanation: "Correct. JSX is a syntax extension outside the ECMAScript grammar, so the JS engine cannot parse it; a build-time transpiler rewrites it into ordinary function calls the engine understands."
      },
      {
        id: "C",
        text: "Browsers parse JSX tags with the built-in HTML5 XML parser, treating them as custom elements at runtime.",
        isCorrect: false,
        explanation: "Tempting because JSX looks like HTML, but the HTML5 parser produces a DOM tree of elements; it does not produce executable JavaScript, and JSX expressions contain logic (curly braces, props, conditionals) that no DOM parser can evaluate."
      },
      {
        id: "D",
        text: "Browsers download a C++ plugin at runtime that compiles JSX into machine code on the fly.",
        isCorrect: false,
        explanation: "No browser architecture supports loading a C++ translation plugin for a JavaScript syntax extension; transpilation is a pure build-time text-to-text transformation performed by JavaScript or Rust tools."
      }
    ],
    correctAnswer: "B",
    explanation: "Browsers execute JavaScript, and JSX is not JavaScript. It is a syntax extension that no JS engine can parse. A transpiler such as Babel, SWC, or ESBuild rewrites every JSX element into a plain function call \u2014 `React.createElement` in the classic runtime, or `_jsx` / `jsx` in the automatic runtime \u2014 before the code is served to the browser.\n\nIn a Next.js App Router project, that transpilation happens inside the dev server or at build time via SWC. The file you edit ends in `.jsx` or `.tsx`, but the bytes the browser downloads are ordinary `.js` with nested function calls. You can confirm this by opening the Network tab during development: the served module contains no angle-bracket tags.\n\nThe nuance an interviewer may probe: the transpiler is a build-time step, not a runtime one. The browser never installs a parser, never loads a plugin, and never interprets JSX syntax. If you paste JSX directly into a `<script>` tag in raw HTML, the engine throws a `SyntaxError` on the first `<` it encounters.",
    interviewLine: "I remind people that browsers only parse valid JavaScript, so I treat JSX as a build-time convenience: SWC or Babel rewrites each tag into a `React.createElement` or `_jsx` call, and what the engine actually runs is plain function calls in a `.js` file.",
    misconception: "JSX looks like HTML, so it is easy to assume the browser's existing HTML parser can handle it, when in fact JSX is a JavaScript syntax extension that must be rewritten into function calls before any JS engine sees it.",
    hints: [
      "What does a browser's JavaScript engine actually parse \u2014 is JSX valid ECMAScript?",
      "If the engine cannot parse it, what step must happen before the code reaches the browser, and when does that step run?",
      "The HTML5 parser builds a DOM tree of elements; it does not produce executable JavaScript or evaluate expressions inside curly braces."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "This is what the browser actually executes after SWC transpiles a two-line JSX snippet into nested function calls.",
      language: "jsx",
      code: "// Source (what you write in a .tsx file)\nconst card = (\n  <div className=\"card\">\n    <span>Hello</span>\n  </div>\n);\n\n// Transpiled output (what the browser runs)\nconst card = React.createElement(\n  \"div\",\n  { className: \"card\" },\n  React.createElement(\"span\", null, \"Hello\")\n);"
    }
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
        explanation: "Tempting only if you picture a web app as a feature baked into the browser itself. In reality the browser is just a runtime for JavaScript; React code ships as ordinary `.js` files served over HTTP and interpreted by the engine, so no binary modification is involved."
      },
      {
        id: "B",
        text: "Write raw C++ assembly instructions in an `index.exe` file.",
        isCorrect: false,
        explanation: "This assumes the application must be compiled to machine code before the browser can run it. Browsers execute high-level JavaScript (or WASM); React is a JavaScript library, and the tooling layer (Vite, esbuild) only transpiles JSX \u2014 it never emits assembly."
      },
      {
        id: "C",
        text: "Scaffold a project with Vite, install dependencies, define a root component returning JSX, and mount it using `createRoot`.",
        isCorrect: true,
        explanation: "Correct. Vite generates the project structure, `npm install` pulls in React and the dev server, the component supplies the JSX, and `createRoot(...).render(...)` mounts that JSX into the DOM node identified by `id=\"root\"` in `index.html`."
      },
      {
        id: "D",
        text: "Create an empty text file named `app.docx` and upload it to Google Drive.",
        isCorrect: false,
        explanation: "This treats a web application as a static document. A React app is a set of source files processed by a build tool and served as HTML, CSS, and JavaScript; a `.docx` file is neither executable nor interpretable by a browser."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct workflow starts with a scaffolding tool like Vite. `npm create vite@latest` generates a project folder containing `index.html`, a `src/` directory, and a `package.json`. You then run `npm install` to download React, the React DOM package, and the dev-server tooling into `node_modules`. Inside `src/`, you write a component whose `return` statement produces JSX \u2014 for example `<h1>Hello World</h1>` \u2014 and in the entry file you call `createRoot(document.getElementById(\"root\"))` and pass that component to `.render()`.\n\nIn practice this gives you a local dev server with hot module replacement, so editing the component and saving re-renders the page without a full reload. The browser never sees JSX; Vite's dev server transforms it into plain `React.createElement` calls before the script reaches the JavaScript engine.\n\nThe nuance an interviewer may probe: `createRoot` is the React 18+ API that replaces the older `ReactDOM.render`. Calling `.render()` a second time on the same root replaces the previous tree rather than appending, which matters when migrating a legacy app incrementally.",
    interviewLine: "I scaffold with Vite, run `npm install` to pull in React and the dev server, write a component that returns JSX, and mount it with `createRoot(document.getElementById(\"root\")).render(<App />)` \u2014 that is the full pipeline from an empty folder to a rendered Hello World in the browser.",
    misconception: "A junior candidate may picture \"creating a React app\" as modifying the browser or writing in a lower-level language, rather than understanding that React is a JavaScript library and the scaffolding tools (Vite, npm) are only the development and build layer that feeds plain JS to the browser's engine.",
    hints: [
      "Think about what `npm` and Vite actually produce on disk and what the browser ultimately executes.",
      "The browser only runs JavaScript; the build tool's job is to transform JSX into function calls and serve the result over HTTP.",
      "None of the steps involve modifying the browser binary, writing assembly, or uploading a document to a cloud drive."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the entry file is the only place `createRoot` appears; the component itself is a plain function returning JSX.",
      language: "tsx",
      code: "import { createRoot } from \"react-dom/client\";\n\nfunction App() {\n  return <h1>Hello World</h1>;\n}\n\nconst container = document.getElementById(\"root\");\nif (container) {\n  const root = createRoot(container);\n  root.render(<App />);\n}"
    }
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
        text: "An async component that only renders on server hardware and never runs on the client.",
        isCorrect: false,
        explanation: "Tempting if you read \"higher-order\" as a rendering-mode label, but HOCs are synchronous functions that work identically on the client and the server; nothing about the pattern is tied to where the code executes."
      },
      {
        id: "B",
        text: "A function that takes an existing component and returns a new one with added props or shared behavior.",
        isCorrect: true,
        explanation: "Correct. The defining trait is the function-of-a-component shape: you pass in a component, you get back a new one that composes the original with extra logic, and no DOM position or rendering mode is involved."
      },
      {
        id: "C",
        text: "A class component that uses multiple inheritance in C++ to combine parent behaviors.",
        isCorrect: false,
        explanation: "Mixes up functional composition with class inheritance; React components are functions (or classes) in JavaScript, and a HOC is specifically a function that wraps another function, not a language-level inheritance mechanism."
      },
      {
        id: "D",
        text: "A component placed at the absolute top of the HTML DOM tree, above every other node.",
        isCorrect: false,
        explanation: "Reads \"higher-order\" as a spatial position in the DOM. The \"order\" refers to the function's argument type in functional programming, not to where an element sits in the rendered page."
      }
    ],
    correctAnswer: "B",
    explanation: "A higher-order component is a function that takes an existing component and returns a new component with added behavior. The signature is `(Wrapped) => Enhanced`: you pass in a component, and the returned component renders the original while injecting extra props, subscriptions, or logic. The term comes from functional programming, where a higher-order function operates on other functions; a component in React is just a function, so wrapping it follows the same rule.\n\nIn practice this lets you share cross-cutting concerns without duplicating code. A `withAuth` HOC checks a prop or context value and either renders the wrapped component or a sign-in prompt, so every protected page gets the same guard without each one re-implementing the check. In modern React, custom hooks like `useAuth` have largely replaced HOCs for this job because they avoid the extra render layer, keep `displayName` and devtools clean, and compose more naturally with other hooks.\n\nThe nuance an interviewer probes: a HOC is a pattern, not a React API. You can build one with a function, a class, or even a hook that returns JSX, but the defining trait is always the same shape \u2014 a function that receives a component and returns a new one. Confusing \"higher-order\" with a DOM position or a class-inheritance mechanism misses that the \"order\" refers to the function's argument type, not its place in the tree.",
    interviewLine: "A HOC is a function that takes a component and returns a new one with injected behavior \u2014 the functional-composition equivalent of a mixin. In modern React I'd reach for a custom hook first because it skips the extra render layer and keeps devtools readable, but the HOC pattern still shows up in libraries like `react-redux`'s `connect`.",
    misconception: "Reading \"higher-order\" as a position (top of the DOM, top of the component tree) rather than as a functional-programming term meaning \"a function that takes another function as its argument.\"",
    hints: [
      "The word \"higher-order\" comes from functional programming, not from DOM structure or rendering mode.",
      "Ask what the function receives as input and what it returns: if both are components, you have the signature.",
      "\"Higher-order\" describes the argument type of the function, not a position in the tree or a hardware requirement."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the function takes a component, returns a new one, and the original is rendered inside \u2014 no DOM position or async boundary involved.",
      language: "tsx",
      code: "import type { ReactElement } from \"react\";\n\nfunction withAuth(\n  Wrapped: (props: { title: string }) => ReactElement\n) {\n  return function AuthGuard({ user, ...rest }: any) {\n    if (!user) return <p>Please sign in.</p>;\n    return <Wrapped {...rest} />;\n  };\n}\n\nexport const Dashboard = withAuth(({ title }) => <h1>{title}</h1>);"
    }
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
        text: "Functional components do not accept props; only class components receive them through `this.props`.",
        isCorrect: false,
        explanation: "Tempting if you associate props with the `this` object, but a function component's first argument is its props object. `const Button = ({ label }) => <button>{label}</button>` is valid and receives props exactly like a class component does."
      },
      {
        id: "B",
        text: "Functional components are plain JavaScript functions using Hooks for state and effects; class components extend `React.Component`, using `this.state` and lifecycle methods.",
        isCorrect: true,
        explanation: "Correct. This names the two structural axes: the container (function vs. class instance) and the API for state and side effects (Hooks vs. `this.state` + lifecycle methods). Everything else\u2014props, rendering output, composition\u2014is equivalent."
      },
      {
        id: "C",
        text: "Functional components manage their own memory with manual allocation, unlike class components which rely on the garbage collector.",
        isCorrect: false,
        explanation: "Tempting only if you picture a component as a native object with a constructor you must free, but both types are ordinary JavaScript values managed by V8's garbage collector. There is no manual `new` or `delete` step in either case."
      },
      {
        id: "D",
        text: "Class components render exclusively on the client, while functional components are restricted to server-side rendering.",
        isCorrect: false,
        explanation: "Tempting if you conflate component type with rendering environment, but Next.js App Router and any SSR framework can render both types on the server and both types on the client. The choice of environment is orthogonal to whether the component is a function or a class."
      }
    ],
    correctAnswer: "B",
    explanation: "The correct answer is B. A functional component is a plain JavaScript function that receives props as its argument and returns JSX. It reaches for state with `useState` and for side effects with `useEffect`. A class component extends `React.Component`, stores state in `this.state`, and runs logic in lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.\n\nIn practice this means a class component needs `this` binding on every method it passes as a handler, and cross-cutting concerns like data fetching are spread across `componentDidMount` and `componentDidUpdate`. A function component composes the same logic into custom hooks, and there is no `this` to bind. The rendered output is identical; the difference is entirely in how state and side effects are managed internally.\n\nReact 19 still supports class components, but hooks such as `useTransition` and `useDeferredValue` can only be called inside function components, and the broader concurrent-features ecosystem is designed around the function component model. New code in a Next.js App Router project is almost always written as a function component.",
    interviewLine: "I write a function component as a function of props returning JSX that pulls in state and effects through Hooks, versus a class that wraps the same job in an instance with `this.state` and lifecycle methods. The output is identical; what differs for me is how I manage state internally, plus the fact that concurrent features and the React Compiler only target function components.",
    misconception: "Treating functional components as a limited subset of class components\u2014fewer props, no state, server-only\u2014when the only real difference is the internal API (Hooks vs. `this.state` + lifecycle methods) used to manage state and side effects.",
    hints: [
      "Look at what each component type does with its first argument and where it stores values that change between renders.",
      "Ask yourself: where does a functional component get its state, and where does a class component get its state?",
      "Neither type is restricted to one rendering environment, and both receive props the same way."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Both components render the same button; the difference is where state lives and how the update is triggered.",
      language: "tsx",
      code: "class Counter extends React.Component {\n  state = { count: 0 };\n  increment = () => this.setState({ count: this.state.count + 1 });\n  render() {\n    return <button onClick={this.increment}>{this.state.count}</button>;\n  }\n}\n\nfunction CounterFn() {\n  const [count, setCount] = React.useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
    }
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
        text: "Data flows from parent to child via props; children request updates through callbacks, keeping state predictable and debuggable.",
        isCorrect: true,
        explanation: "Correct. Props carry data downward and are read-only at the receiving end; children request changes through callback props, so the parent \u2014 the state owner \u2014 remains the single point of mutation."
      },
      {
        id: "B",
        text: "Data is bound to global database tables over WebSockets, with every render triggering a socket sync.",
        isCorrect: false,
        explanation: "Tempting if 'binding' sounds like a backend or network concept, but React's data binding is purely in-memory prop passing between components in the render tree; no socket or database is involved."
      },
      {
        id: "C",
        text: "Data binds bidirectionally so changing an input automatically mutates parent variables without any event handlers.",
        isCorrect: false,
        explanation: "This describes the two-way binding model of Angular or legacy jQuery plugins. React deliberately avoids auto-mutating a source variable on input change; you must call an explicit handler to trigger a state update."
      },
      {
        id: "D",
        text: "Data flows only from child to parent, with parents inheriting and re-exporting all child state.",
        isCorrect: false,
        explanation: "Inverts the actual direction. In React the parent owns state and passes it down; a child never pushes its internal state upward unprompted. The child's own `useState` is private to that component."
      }
    ],
    correctAnswer: "A",
    explanation: "React's data flow is unidirectional: a parent component owns a piece of state and passes it down to children through props. Props are read-only inputs from the child's perspective. When a child needs to change that value, it calls a callback prop (for example, `onChange` or `onSubmit`) that the parent supplied, and the parent decides whether to update its own state.\n\nIn practice this means every value has exactly one owner. You can trace any rendered number, string, or object back to the `useState` call that created it, and every mutation goes through that component's setter. There is no hidden reference shared between two components that one can silently rewrite.\n\nThe word 'one way' describes the default direction of data movement, not a hard wall. A child can influence a parent's state, but only by requesting it through a callback the parent chose to provide. Context and lifted state are extensions of the same principle: ownership stays with one component, and everyone else receives a read-only view.",
    interviewLine: "In React, props flow down from parent to child as read-only inputs. If I need to change a value in a child, I call a callback prop and the parent, which owns that state, decides what to do \u2014 that keeps one source of truth per value.",
    misconception: "Thinking that 'one-way' means children can never influence parent state, when in fact children request changes through callbacks and the parent \u2014 still the owner \u2014 decides whether to update.",
    hints: [
      "Think about who owns the state and who merely receives it as a prop.",
      "When a child needs to change a value, does it mutate it directly or does it ask the owner to do so?",
      "'One way' describes the default direction of data movement, not a hard prohibition on children influencing the parent."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `Display` and `Button` never touch `count` directly; they only read a prop or call a callback the parent supplied.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <Display value={count} />\n      <Button onClick={() => setCount(count + 1)} label=\"Increment\" />\n    </div>\n  );\n}\n\nfunction Display({ value }: { value: number }) {\n  return <span>{value}</span>;\n}\n\nfunction Button({ onClick, label }: { onClick: () => void; label: string }) {\n  return <button onClick={onClick}>{label}</button>;\n}"
    }
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
        text: "A remote database service hosted on AWS for storing user files and syncing them across devices.",
        isCorrect: false,
        explanation: "Tempting only if you read \"API\" as a network endpoint. Context lives entirely in memory inside React's component tree; no request leaves the browser and no server is involved."
      },
      {
        id: "B",
        text: "A built-in React feature for sharing values across the component tree without manually passing props through intermediate components.",
        isCorrect: true,
        explanation: "Correct. `createContext`, `<Provider>`, and `useContext` are the three public pieces, and their purpose is to let a value set at an ancestor be read by any descendant without prop drilling."
      },
      {
        id: "C",
        text: "A compiler plugin that converts JSX syntax into TypeScript type definitions at build time.",
        isCorrect: false,
        explanation: "This conflates Context with a Babel or SWC transform. `createContext` is a function you call at runtime inside component code; it has nothing to do with how JSX is parsed or typed."
      },
      {
        id: "D",
        text: "A browser API that measures CPU usage and memory allocation for performance profiling.",
        isCorrect: false,
        explanation: "This mistakes a React runtime feature for a Web Platform API like `performance.measure`. Context is imported from the `react` package and participates in reconciliation; the browser never sees it."
      }
    ],
    correctAnswer: "B",
    explanation: "Context API is a built-in React feature made up of three pieces: `createContext` creates the context object, a `<Provider>` component sets the value for a subtree, and `useContext` (or the older `.Consumer`) reads it in any descendant. The value travels down the tree through React's internal fiber links rather than through props, so intermediate components never need to receive or forward it.\n\nIn real code this means a theme object, an auth session, or a locale set once at the app root is available to a deeply nested button or form without threading it through five layout wrappers. You remove the prop from every intermediate component's signature, and the tree stays readable.\n\nThe nuance an interviewer will probe: every consumer re-renders when the value's reference changes. If a parent computes `value={{ user }}` on every render, every `useContext` call sees a new object and triggers a re-render, even if `user` is identical. Stabilise the reference with `useMemo` or lift the object out of the render path to avoid unnecessary updates.",
    interviewLine: "I set a value once with a Provider high in the tree and read it in any descendant via useContext, so I skip threading it through intermediate components. The trade-off is that every consumer re-renders when the value's reference changes, so I keep the value stable.",
    misconception: "Treating Context as a prop-passing shortcut that also controls which components re-render, when in fact it only changes where the value originates; every consumer still re-renders the moment the value's reference changes.",
    hints: [
      "Think about the problem it solves: a value needed by many nested components but defined far up the tree.",
      "The three public pieces are `createContext`, a Provider component, and the `useContext` hook \u2014 all imported from the `react` package at runtime.",
      "It is not a network service, a compiler transform, or a browser measurement API; it lives inside the component tree."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice that `Content` reads the theme directly without `Header` or `Sidebar` passing it along.",
      language: "tsx",
      code: "import { createContext, useContext } from \"react\";\n\nconst ThemeContext = createContext(\"light\");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Header />\n      <Content />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Header() {\n  return <header>My App</header>;\n}\n\nfunction Content() {\n  const theme = useContext(ThemeContext);\n  return <main style={{ background: theme }}>Hello</main>;\n}"
    }
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
        text: "There is no real difference: both approaches reload the entire HTML document from scratch on navigation.",
        isCorrect: false,
        explanation: "Tempting if you equate using React with still loading a full page, but React routing explicitly replaces the server round-trip with an in-place DOM update, so the two mechanisms are fundamentally different."
      },
      {
        id: "B",
        text: "React routing re-downloads every image and asset from the network on each in-app page change.",
        isCorrect: false,
        explanation: "Tempting if you picture every navigation as a fresh page load, but client-side routing only swaps the component tree; already-loaded assets stay in the browser cache and are not re-fetched."
      },
      {
        id: "C",
        text: "React routing is client-side: JavaScript intercepts navigation and swaps the DOM, while conventional routing fetches a new HTML document from the server on every click.",
        isCorrect: true,
        explanation: "Correct. This captures the core distinction: navigation is handled by JavaScript in the browser, matching a route and swapping components, while conventional routing relies on a full server round-trip for every link."
      },
      {
        id: "D",
        text: "Conventional routing runs in the browser while React routing is dispatched from physical hardware satellites.",
        isCorrect: false,
        explanation: "Tempting only if you misread \"conventional\" as a special protocol, but both mechanisms run on standard web infrastructure; React routing executes in the browser's JavaScript engine, not on any special hardware."
      }
    ],
    correctAnswer: "C",
    explanation: "React routing, as in React Router or Next.js App Router, intercepts link clicks with JavaScript event listeners, matches the new URL against a client-side route table, and swaps the rendered component subtree in the DOM. The browser never issues a full HTML document request. Conventional, or server-side, routing sends a new HTTP GET for every navigation; the server returns a complete HTML page and the browser discards the old DOM tree and rebuilds it from scratch.\n\nIn practice this means a React SPA can keep parent-component state, already-fetched data, and loaded CSS or JS bundles alive across navigations. A conventional site pays the full network round-trip, HTML parse, and script re-execution cost on every link click.\n\nThe boundary is not absolute. Next.js App Router server-renders the initial HTML, then switches to client-side navigation with streamed RSC payloads for subsequent route changes. An interviewer will expect you to name both phases rather than claim the app is purely client-side.",
    interviewLine: "I explain that React routing lets me intercept navigation in JavaScript, match the URL to a component, and update the DOM in place, so the browser never round-trips to the server for a new HTML document the way conventional routing does.",
    misconception: "Because React renders components, the browser still must fetch a new HTML page for every route change, so routing is just a cosmetic layer over conventional server navigation.",
    hints: [
      "Think about what happens when you click a link: who sends the HTTP request, the browser or the server?",
      "In a React SPA the URL changes but the tab does not reload, so what must be intercepting the click before it reaches the network layer?",
      "The difference is not in the URL format or the component tree; it is in whether a full HTML document is fetched from the server on each navigation."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice that clicking a Link updates the URL and swaps the matched component inside the existing DOM tree without triggering a full page reload.",
      language: "tsx",
      code: "import { BrowserRouter, Routes, Route, Link } from \"react-router-dom\";\n\nfunction Home() {\n  return <h1>Home Page</h1>;\n}\nfunction About() {\n  return <h1>About Page</h1>;\n}\n\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/home\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/home\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    }
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
        text: "To trigger immediate synchronous re-renders of the entire parent component tree.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"mutating something\" with \"telling React to re-render,\" but the opposite is true: writing to `.current` is completely invisible to React's scheduler and triggers no re-render, for the component or any ancestor."
      },
      {
        id: "B",
        text: "To replace `useState` for all dynamic form inputs that update the visible screen.",
        isCorrect: false,
        explanation: "Tempting because both a ref and state persist across renders, but a ref never causes a re-render, so the input's displayed value would stay stale. Any value the UI reads must live in state."
      },
      {
        id: "C",
        text: "To encrypt component props before transmitting them over HTTPS to the server.",
        isCorrect: false,
        explanation: "Tempting only if you picture a ref as some kind of transport wrapper, but a ref is a plain in-memory JavaScript object holding a reference; it has no role in networking, serialization, or security."
      },
      {
        id: "D",
        text: "To access DOM nodes imperatively (focus, scroll, measure) or hold mutable values across renders without re-rendering.",
        isCorrect: true,
        explanation: "Correct. `useRef` gives you a stable `.current` slot: attach it to a DOM node for imperative access, or use it as a mutable variable that survives re-renders without invalidating the component."
      }
    ],
    correctAnswer: "D",
    explanation: "`useRef` returns a single object whose `.current` property persists across every render of the component. When you pass that ref to a DOM element via the `ref` attribute, `.current` points to the live DOM node after mount. When you use it standalone, `.current` is just a mutable slot you can read and write on any render without React noticing.\n\nIn practice this means you reach for a ref when you need imperative access to the DOM: calling `.focus()` on an input, reading `getBoundingClientRect()` for a tooltip, calling `.scrollTo()` on a container, or playing a video. You also use it to stash values the UI does not display, such as a `setTimeout` id or the previous prop value, so you can mutate them between renders without paying the cost of a re-render.\n\nThe key boundary an interviewer will probe: mutating `.current` never schedules a re-render, so it cannot replace `useState` for any value the screen depends on. In concurrent React, ref reads during render are also not guaranteed to be consistent across interrupted renders, which is why the React docs discourage reading refs in the render body.",
    interviewLine: "I reach for `useRef` when I need imperative DOM access like focusing an input or reading a measurement, or when I need a mutable value such as a timer id that must survive re-renders without triggering one; anything the UI displays still goes in `useState`.",
    misconception: "Because a ref value persists across renders just like state, it is easy to assume it can replace state for any changing value, missing the fact that only state mutations tell React to re-render and update the screen.",
    hints: [
      "What is the one observable difference between writing to `ref.current` and calling a `setState` function?",
      "Ask: does the screen need to change to reflect this value?",
      "Both refs and state persist across renders, but only one of them tells React to re-render."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "Notice that mutating `timerRef.current` does not re-render the component, so the button label stays stable while the timeout id is updated in place.",
      language: "tsx",
      code: "import { useRef, useEffect, useState } from \"react\";\n\nfunction Countdown() {\n  const [label, setLabel] = useState(\"Start\");\n  const timerRef = useRef<number | undefined>(undefined);\n\n  const start = () => {\n    timerRef.current = window.setTimeout(() => setLabel(\"Done\"), 3000);\n  };\n  const cancel = () => {\n    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);\n  };\n\n  useEffect(() => cancel, []);\n\n  return (\n    <div>\n      <p>{label}</p>\n      <button onClick={start}>Start</button>\n      <button onClick={cancel}>Cancel</button>\n    </div>\n  );\n}"
    }
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
        text: "CSS pseudoclass selectors like `:hover` and `:active` that attach styling to interaction states.",
        isCorrect: false,
        explanation: "Tempting if you read \"hook\" as the general English word for \"attach to,\" but CSS selectors are a browser rendering feature with no dependency on the `react` package or its component model."
      },
      {
        id: "B",
        text: "Browser extension plugins that hook into Chrome DevTools to inspect cookies.",
        isCorrect: false,
        explanation: "The word \"hook\" in extension APIs describes attaching to browser events; it has no relationship to React's component rendering or the `react` npm package."
      },
      {
        id: "C",
        text: "Git commit hooks that enforce code linting before `git push`.",
        isCorrect: false,
        explanation: "Git hooks live in `.git/hooks/` and run shell scripts at repository events; they operate on the filesystem and have no connection to React's component tree or render cycle."
      },
      {
        id: "D",
        text: "Functions starting with `use` that give function components state, side effects, refs, and context without class components.",
        isCorrect: true,
        explanation: "Correct. Hooks are the React 16.8+ API for giving function components state, side effects, refs, and context, replacing class lifecycle methods and enabling logic extraction into reusable custom hooks."
      }
    ],
    correctAnswer: "D",
    explanation: "Hooks are functions in the React library \u2014 `useState`, `useEffect`, `useRef`, `useContext`, and any function you write that starts with `use` \u2014 that let function components access state, run side effects, hold mutable refs, and read context without subclassing `React.Component`. They were introduced in React 16.8 and are the current way to write stateful components.\n\nIn practice this means a component that fetches data on mount and cleans up on unmount needs a single `useEffect` with a return function instead of separate `componentDidMount` and `componentWillUnmount` methods. Logic that several components share (a debounced value, a media-query listener) moves into a custom hook like `useDebounce`, so the call site reads `const value = useDebounce(raw, 300)` instead of duplicating state and effect code.\n\nThe constraint an interviewer will probe: hooks are tracked by their call order within a component, not by name. Calling a hook inside a conditional, loop, or nested function changes the order between renders and produces the \"Rendered more hooks than during the previous render\" error. That is why the Rules of Hooks forbid conditionals and require top-level calls.",
    interviewLine: "Hooks are functions I call at the top level of a component \u2014 `useState` for state, `useEffect` for side effects, `useRef` for mutable values \u2014 and because React tracks them by call order, I never call them conditionally or inside loops.",
    misconception: "Treating \"hook\" as a generic English word (as in CSS hooks or git hooks) rather than a specific React API with a naming convention, fixed call order, and rules that tie it to the component's render cycle.",
    hints: [
      "Look at the naming convention: every built-in and custom hook starts with `use`, and they live in the `react` package, not in CSS, git, or browser-extension APIs.",
      "Ask what a function component needed before 16.8 to hold state or run cleanup \u2014 the answer is a class with lifecycle methods, and hooks replace that pattern.",
      "None of the other options are JavaScript APIs in the React library; they are \"hooks\" in CSS, browser extensions, or git, which are unrelated systems."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A custom hook that combines `useRef` and `useEffect` to read the previous render's value, showing how hooks compose into reusable logic.",
      language: "typescript",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction usePrevious<T>(value: T): T | undefined {\n  const ref = useRef<T | undefined>(undefined);\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}"
    }
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
        text: "A utility that writes directly to DOM nodes, patching the live document tree without going through React's diffing or re-render cycle.",
        isCorrect: false,
        explanation: "Tempting if you picture React state as a variable that patches the DOM in place. React's model is declarative: you change state, React diffs the virtual tree, and then patches the real DOM. useState participates in that cycle; it never touches a DOM node itself."
      },
      {
        id: "B",
        text: "A built-in hook declaring local state for a function component; calling the returned setter schedules a re-render with the new value.",
        isCorrect: true,
        explanation: "Correct. useState is the fundamental state hook for function components; the setter schedules a re-render, and the new value is available as the first element of the returned array on the next render pass."
      },
      {
        id: "C",
        text: "A global store provider that broadcasts state changes to every open browser window and keeps all tabs synchronized in real time.",
        isCorrect: false,
        explanation: "Tempting if you conflate component state with a cross-tab mechanism like `BroadcastChannel` or a library such as Redux. useState is scoped to a single component instance; it has no awareness of other components, tabs, or windows."
      },
      {
        id: "D",
        text: "A hook restricted to class components, callable only inside the `constructor` to seed `this.state` before the first render.",
        isCorrect: false,
        explanation: "Tempting if you map useState onto `this.state` in a class component. Hooks are only valid inside function components or other hooks; calling one inside a class constructor violates the Rules of Hooks and throws at runtime."
      }
    ],
    correctAnswer: "B",
    explanation: "useState is a built-in hook that lets a function component keep a value in memory across renders. You call it with an initial value and destructure the returned array into the current value and a setter function. Calling the setter does not mutate the variable in your current scope; it tells React to schedule a re-render in which the new value becomes the one you read.\n\nIn practice this means the value you captured at the top of a render is a snapshot. If you call `setCount(count + 1)` twice in the same event handler, both calls read the same `count` from that render, so the result is `count + 1`, not `count + 2`. The updater-function form, `setCount(prev => prev + 1)`, avoids this because each updater receives the latest committed value.\n\nOne detail interviewers probe: the initial-value argument is only consulted on the first render. Passing a different value on a later render does not reset state, and React batches multiple `setState` calls within the same event handler into a single re-render.",
    interviewLine: "useState gives a function component a value that persists across renders; calling the setter does not change the variable I'm reading right now, it tells React to re-render with the new value, and React batches multiple calls in the same handler into one render.",
    misconception: "Treating the setter as an immediate assignment: `setCount(count + 1)` does not change the `count` variable you already read in this render; it schedules a future render where the new value becomes the one you read.",
    hints: [
      "Look at what `useState` returns and what the setter actually does when you call it.",
      "Does calling `setState` change the variable in the current render, or does it schedule something for the next render?",
      "It is not a DOM API, not a global store, and not tied to class components."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState",
    example: {
      caption: "Notice how the direct-value form reads a stale snapshot on the second call, while the updater form chains correctly.",
      language: "tsx",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n\n  function incrementTwice() {\n    setCount(count + 1); // reads `count` from THIS render\n    setCount(count + 1); // same snapshot \u2192 both schedule count + 1\n  }\n\n  function incrementCorrect() {\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1); // each updater gets the latest value\n  }\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={incrementTwice}>+1 twice (stale)</button>\n      <button onClick={incrementCorrect}>+1 twice (chained)</button>\n    </div>\n  );\n}"
    }
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
        text: "A hook that runs side effects such as data fetching, subscriptions, or DOM mutations after the render is committed, with a dependency array and an optional cleanup callback.",
        isCorrect: true,
        explanation: "Correct. `useEffect` fires after the browser has painted the committed DOM, re-runs when its dependencies change (compared with `Object.is`), and calls the returned cleanup before each re-execution and on unmount."
      },
      {
        id: "B",
        text: "A hook that provides a declarative API for writing SQL queries against a backend database.",
        isCorrect: false,
        explanation: "Tempting if you read \"effect\" as \"execute a query,\" but `useEffect` runs arbitrary client-side JavaScript; it has no built-in SQL, ORM, or database binding of any kind."
      },
      {
        id: "C",
        text: "A hook restricted to conditional branches and loop bodies, so it can only run when a specific runtime path is taken.",
        isCorrect: false,
        explanation: "The Rules of Hooks require calling `useEffect` unconditionally at the top level of a component or custom hook; wrapping it in an `if` or loop changes the hook count between renders and breaks React's internal state tracking."
      },
      {
        id: "D",
        text: "A hook that synchronously blocks browser painting until every promise in the effect has settled.",
        isCorrect: false,
        explanation: "`useEffect` is intentionally asynchronous and non-blocking; the synchronous, pre-paint alternative is `useLayoutEffect`, which React runs between commit and paint."
      }
    ],
    correctAnswer: "A",
    explanation: "`useEffect(fn, deps)` schedules `fn` to run after React has committed the new DOM and the browser has painted it. Unlike `useLayoutEffect`, which runs synchronously between commit and paint, `useEffect` is asynchronous and does not block the user from seeing the updated UI.\n\nIn practice you reach for it when you need to synchronise with something outside React: fetching data, opening a WebSocket, subscribing to a store, or mutating the DOM directly. The dependency array (compared element-by-element with `Object.is`) tells React when to re-run the effect; an empty array `[]` means run once after mount, and omitting the array means run after every render.\n\nThe function `fn` may return a cleanup callback. React calls that cleanup before the next effect execution and again on unmount, which is how you cancel a timer, close a socket, or abort a fetch so the component does not leak resources.",
    interviewLine: "I use useEffect for work after the browser paints the committed DOM \u2014 subscribing to external systems \u2014 and I return a cleanup function that React calls before the next run or on unmount to tear that subscription down.",
    misconception: "Treating `useEffect` as a synchronous lifecycle callback that runs during render, rather than a post-commit, post-paint subscription to an external system with a mandatory teardown path.",
    hints: [
      "Think about where in the render pipeline the effect fires: what has already happened to the DOM before `fn` executes?",
      "The dependency array is compared with `Object.is`; an empty array means \"run once after mount,\" and omitting it means \"run after every render.\"",
      "It does not block the main thread or delay paint; that is the job of `useLayoutEffect`."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice how the cleanup returned from the effect clears the interval before the next run or on unmount, preventing a stale timer from firing after the component is gone.",
      language: "typescript",
      code: "function usePoll(url: string, intervalMs: number) {\n  const [data, setData] = useState<string | null>(null);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      fetch(url)\n        .then((r) => r.text())\n        .then(setData);\n    }, intervalMs);\n    return () => clearInterval(id);\n  }, [url, intervalMs]);\n\n  return data;\n}"
    }
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
        text: "A database administration tool for querying, indexing, and managing PostgreSQL instances across environments.",
        isCorrect: false,
        explanation: "Tempting if you associate 'developer tool' with infrastructure, but React DevTools never connects to a database; it inspects the component tree and render performance of a running React app."
      },
      {
        id: "B",
        text: "A code compiler and bundler that replaces Vite, Webpack, or esbuild in the build pipeline to transpile JSX.",
        isCorrect: false,
        explanation: "Confuses a debugging and inspection tool with a build tool. React DevTools does not transpile, bundle, or replace any part of your build pipeline; it attaches to the already-running app in the browser."
      },
      {
        id: "C",
        text: "An official browser extension and standalone app that inspects the live component tree, edits props and hooks, and profiles rendering.",
        isCorrect: true,
        explanation: "Correct. It is the official extension (plus a standalone app for React Native) with Components and Profiler panels for inspecting the live tree, hook values, and render durations."
      },
      {
        id: "D",
        text: "An automated code-generation agent that reads your codebase and writes React components, tests, and documentation.",
        isCorrect: false,
        explanation: "Mixes up a diagnostic tool with a code-generation agent. React DevTools reads and displays the state of your running app; it does not author or modify source files."
      }
    ],
    correctAnswer: "C",
    explanation: "React Developer Tools is the official browser extension (and standalone app for React Native) maintained by the React team. It adds two panels to your browser's DevTools: Components and Profiler.\n\nIn the Components panel you browse the live component tree, expand any node to read its props, state, and hook values, and optionally edit a prop or state value to see the UI update in place. In the Profiler panel you record a session, then see each commit's duration, which components re-rendered, and why.\n\nIt is a development-only tool: it attaches to the running app through the React DevTools protocol and adds no code to your production bundle. You install it from the Chrome or Firefox extension store, or use the standalone app for React Native.",
    interviewLine: "React DevTools is the official browser extension with Components and Profiler panels; I use it to expand the live component tree, read hook values, and profile commit durations to spot unnecessary re-renders.",
    misconception: "Treating 'developer tool' as something that produces code or handles the build, rather than something that attaches to a running app and exposes its internal state for inspection.",
    hints: [
      "Think about what you open in Chrome's DevTools when debugging a React app that is already running in the browser.",
      "It attaches to the live app and exposes the component tree and render timing; it does not compile, bundle, or generate source code.",
      "It is not a build tool, a database client, or a code-writing agent; it is an inspector and profiler."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "React DevTools would show the two `useState` hooks with their current values (`count`, `label`) and the `useEffect` hook under this component; the Profiler tab records how long this render took.",
      language: "tsx",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n  const [label, setLabel] = useState(\"clicks\");\n\n  useEffect(() => {\n    console.log(\"rendered with\", count);\n  });\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      {label}: {count}\n    </button>\n  );\n}"
    }
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
        text: "Passing props through intermediate components that don't need them; disadvantages include cluttered signatures, tight coupling, and brittle refactoring.",
        isCorrect: true,
        explanation: "Correct. Prop drilling describes the mechanical forwarding of a value through components that only exist to relay it, and the three disadvantages listed are the practical costs that accumulate as the chain grows."
      },
      {
        id: "B",
        text: "A physical manufacturing process for creating vias in printed circuit boards, where a drill bit passes through substrate layers to connect inner traces.",
        isCorrect: false,
        explanation: "Tempting if you take the word 'drilling' literally, but in React the term refers purely to data flow through the component tree, not to any hardware or manufacturing process."
      },
      {
        id: "C",
        text: "A TypeScript compiler error triggered when a prop identifier contains a numeric character, blocking the build until the name is renamed.",
        isCorrect: false,
        explanation: "Tempting if you confuse prop naming rules with a structural anti-pattern, but neither TypeScript nor the React compiler emits an error based on whether a prop name contains a digit."
      },
      {
        id: "D",
        text: "A runtime optimization that reduces prop-passing overhead by caching intermediate values, eliminating redundant work in deep component trees.",
        isCorrect: false,
        explanation: "Tempting if you associate 'drilling' with speed, but prop drilling is the opposite of an optimization: it adds work (extra prop reads, extra type declarations) to every intermediate component."
      }
    ],
    correctAnswer: "A",
    explanation: "Prop drilling is the pattern where a parent passes a value down through one or more intermediate components that do not use it, only so a deeply nested child can receive it. Each intermediate component must accept the prop, declare it in its type, and forward it in JSX \u2014 even though it has no logic around that value.\n\nThe cost shows up during refactoring. Insert a new wrapper between parent and child and every component in the chain needs the prop added, typed, and forwarded. Remove a component and you rewire the remaining links. The intermediates also become harder to reuse because their props now include values they never read.\n\nContext removes the forwarding step but couples every consumer to the provider's re-render cycle, so the value's referential identity matters. Composition \u2014 passing a render function or using `children` \u2014 sidesteps both problems and is the first fix to reach for before adding a global store.",
    interviewLine: "Prop drilling means every intermediate component in the chain must accept, type, and forward a value it never uses, so inserting or removing a component forces a multi-file change; I usually reach for composition or Context before I add another layer of forwarding.",
    misconception: "Treating prop drilling as a minor style nitpick when each forwarded prop actually locks an intermediate component into a specific data shape, making it harder to extract, test, or reuse independently.",
    hints: [
      "Look at the word 'drilling' in the React context \u2014 it describes data moving down a tree, not a tool or a compiler feature.",
      "Ask yourself: what must each intermediate component in the chain do with the prop it doesn't actually use?",
      "The disadvantages are about maintenance and coupling, not about runtime speed or type errors."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice that `theme` appears in the type and JSX of three components that never read it; removing `Sidebar` forces you to rewire the chain.",
      language: "tsx",
      code: "type T = { theme: \"light\" | \"dark\"; children?: React.ReactNode };\n\nfunction Layout({ children }: T) {\n  return <div className=\"layout\">{children}</div>;\n}\nfunction Sidebar({ children }: T) {\n  return <aside className=\"sidebar\">{children}</aside>;\n}\nfunction Button({ theme }: Omit<T, \"children\">) {\n  return <button className={`btn ${theme}`}>Click</button>;\n}\n\n// theme is forwarded through Layout \u2192 Sidebar, neither of which uses it\n<Layout theme=\"dark\">\n  <Sidebar theme=\"dark\">\n    <Button theme=\"dark\" />\n  </Sidebar>\n</Layout>;"
    }
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
        text: "HTML elements that render inline SVG graphics via a special tag syntax.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word \"custom\" with the Web Components custom-element spec, but a custom hook is a plain JavaScript function with no DOM node, no tag, and no rendering responsibility."
      },
      {
        id: "B",
        text: "Functions named `use...` that compose built-in hooks to extract, encapsulate, and share reusable stateful logic across components.",
        isCorrect: true,
        explanation: "Correct. A custom hook is a user-defined function that calls built-in hooks internally and returns values or callbacks, so each component that invokes it gets its own independent state while the logic itself is written once."
      },
      {
        id: "C",
        text: "Redux middleware functions that intercept and transform all outgoing HTTP requests.",
        isCorrect: false,
        explanation: "Tempting if you associate the `use` prefix with Redux bindings like `useSelector`, but those are thin wrappers built on top of React's own hooks; the mechanism is function composition, not middleware in a dispatch pipeline."
      },
      {
        id: "D",
        text: "Low-level USB driver APIs that expose physical peripherals to browser JavaScript.",
        isCorrect: false,
        explanation: "Tempting if the word \"hook\" suggests a system-level callback into hardware, but custom hooks are pure application-level JavaScript with no OS, driver, or peripheral involvement."
      }
    ],
    correctAnswer: "B",
    explanation: "A custom hook is a user-defined JavaScript function whose name starts with `use` and which internally calls one or more built-in React hooks such as `useState`, `useEffect`, or `useContext`. It is not a new React primitive, not a component, and not a class \u2014 it is a plain function that composes existing hooks and returns values, callbacks, or both. The `use` prefix is a naming convention that lets the Rules of Hooks linter statically verify that the function is called at the top level, in the right order, and not conditionally.\n\nIn practice this lets you extract behaviour like debouncing, data fetching, or authentication into a single function and call it from any number of components. Each component that calls the hook gets its own independent state and effects, exactly as if the `useState` and `useEffect` calls were written inline in that component. No state is shared between callers unless you explicitly thread a value through props or context.\n\nThe nuance an interviewer will probe: because a custom hook is just a function, you can call it from another custom hook, but you still cannot call it conditionally or inside a loop. And because it returns plain values rather than JSX, it composes freely with other hooks and with `useMemo` or `useCallback` in the calling component without any extra wrapper.",
    interviewLine: "A custom hook is a plain function that follows the `use` naming convention and composes built-in hooks internally. It is not a component, not a class, and not a new React API \u2014 it is a logic-extraction tool where each caller gets its own state, so I use it to DRY up stateful behaviour without accidentally coupling components through shared state.",
    misconception: "A custom hook is not a shared-state container; every component that calls it receives its own independent `useState` and `useEffect` instances, so state is never synchronised across callers unless you explicitly pass a value through props or context.",
    hints: [
      "Look at what a custom hook is syntactically: a plain `function` declaration, not a class, not an HTML tag, not middleware.",
      "The `use` prefix is a naming convention the Rules of Hooks linter checks so the call is treated as a hook \u2014 it is not a runtime keyword or a special React primitive.",
      "A custom hook returns plain values and callbacks, not JSX, and each component that calls it gets independent state, so it is a logic-extraction tool rather than a shared store."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `useDebounce` is just a function calling `useState` and `useEffect`; every component that calls it gets its own independent `debounced` value.",
      language: "tsx",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    if (debouncedQuery) void fetch(`/api/search?q=${debouncedQuery}`);\n  }, [debouncedQuery]);\n\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}"
    }
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
        text: "`useRef` forces a re-render whenever `.current` is mutated; `createRef` does not.",
        isCorrect: false,
        explanation: "Tempting if you associate refs with state and expect mutation to trigger a render, but neither `useRef` nor `createRef` schedules a re-render when you write to `.current`; both are plain mutable containers whose mutations are invisible to React's render scheduling."
      },
      {
        id: "B",
        text: "`createRef` persists its value to `localStorage` so it survives a full page reload.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'persisting a value' with browser storage, but both refs live in JavaScript heap memory for the component's lifetime and have no interaction with `localStorage` or any other storage API."
      },
      {
        id: "C",
        text: "`useRef` is designed for class components; `createRef` is the hook for function components.",
        isCorrect: false,
        explanation: "Tempting if you remember that `createRef` appears in class examples and assume the pairing is reversed, but `useRef` is a hook and can only be called inside a function component, while `createRef` is a standalone function designed for use in a class constructor."
      },
      {
        id: "D",
        text: "`useRef` returns the same ref object every render; `createRef` creates a new one each call.",
        isCorrect: true,
        explanation: "Correct. `useRef` stores its ref object in the fiber node so React returns the same instance on every render, while `createRef()` is a plain factory that allocates a fresh `{ current: null }` object on each call, which is stable in a class constructor but would lose data if called in a function body."
      }
    ],
    correctAnswer: "D",
    explanation: "`useRef` stores the ref object in React's internal fiber data, so the same `{ current: ... }` instance is returned on every render of the component. `createRef()` is a plain factory function: each call allocates a brand-new `{ current: null }` object with no memory of the previous one.\n\nIn a class component you call `createRef()` once inside the constructor and assign it to `this.myRef`, so the object is stable for the component's lifetime. If you instead call it in a function component body, you get a fresh ref on every render and any value you wrote to `.current` is lost the moment the component re-renders.\n\nNeither ref triggers a re-render when you mutate `.current`; both are plain mutable containers. The only distinction that matters is object identity across renders, which is exactly what `useRef` guarantees and `createRef` does not.",
    interviewLine: "`useRef` keeps the ref object in the fiber so I get the same instance back on every render, while `createRef` is a plain factory that allocates a new object each call, which is fine in a class constructor where I assign it to `this` but would silently lose data if I called it in a function body.",
    misconception: "Believing the two APIs differ in reactivity or storage location, when the only real distinction is object identity: `useRef` guarantees the same object across renders, while `createRef` is just a factory with no such guarantee.",
    hints: [
      "Ask what happens to the ref object's identity when the component renders a second time.",
      "Does the creating function store its result somewhere React can hand back on the next render, or does it just allocate a new one?",
      "The difference is not about reactivity or where the data lives; it is about whether you receive the same object back."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "Notice that `prev.current` holds the value from the previous render because `useRef` returns the same object every time, so the mutation survives across renders.",
      language: "tsx",
      code: "import { useRef } from \"react\";\n\nfunction PreviousValue({ value }: { value: string }) {\n  const prev = useRef(value);\n\n  if (prev.current !== value) {\n    console.log(`changed: ${prev.current} \u2192 ${value}`);\n    prev.current = value;\n  }\n\n  return <span>{value}</span>;\n}"
    }
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
        explanation: "Tempting if you associate the `use` prefix with TypeScript decorator syntax, but custom hooks are plain functions with no class, no inheritance, and no decorator metadata."
      },
      {
        id: "B",
        text: "Compiler plugins that convert JSX into raw WebGL shaders.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as something Babel or SWC injects at build time, but hooks execute at runtime inside React's renderer and have no connection to shader compilation."
      },
      {
        id: "C",
        text: "Built-in browser event listeners that trigger on keyboard keystrokes.",
        isCorrect: false,
        explanation: "Tempting if you conflate `useEffect`'s subscription pattern with the hook itself, but a custom hook is a React-level function; it may call `addEventListener` inside an effect, yet the hook is not a DOM API."
      },
      {
        id: "D",
        text: "User-defined functions starting with `use` that bundle stateful logic via other hooks for reuse.",
        isCorrect: true,
        explanation: "Correct. A custom hook is a user-defined function prefixed with `use` that calls other hooks to bundle stateful logic, letting multiple components reuse the same behavior without HOCs or prop drilling."
      }
    ],
    correctAnswer: "D",
    explanation: "A custom hook is a plain JavaScript function whose name starts with `use` and whose body calls one or more built-in hooks such as `useState`, `useEffect`, or `useContext`. It is not a component, not a decorator, and not a browser API. Because it is a regular function call, it runs during the render phase of whichever component invokes it, and it obeys the same Rules of Hooks: top-level calls only, no conditionals, no loops.\n\nThe practical payoff is extracting stateful logic. A `useDebounce(value, delay)` hook wraps `useState` and `useEffect` so every component that needs a debounced value calls one line instead of repeating timer setup and cleanup. The hook's internal state is scoped to the calling component's instance, so two components using the same custom hook each get independent state without prop drilling or higher-order components.\n\nA custom hook does not create a new node in the React component tree; the call is inlined into the parent's render, so there is no extra reconciliation cost. The `use` prefix is not a runtime mechanism but a naming convention that `eslint-plugin-react-hooks` enforces to guarantee the Rules of Hooks are followed.",
    interviewLine: "I think of a custom hook as a function call that runs during my component's render, so its `useState` and `useEffect` calls register on the calling component's fiber, not on a separate node in the tree.",
    misconception: "Treating a custom hook as a new component or wrapper that adds a node to the React tree, rather than a plain function whose hook calls are inlined into the calling component's render.",
    hints: [
      "Look at what a custom hook actually is at runtime: a function call inlined into the caller, not a component render.",
      "Ask whether the `use` prefix is a runtime mechanism or a linting convention, and what the linter checks.",
      "A custom hook does not create a new entry in the React component tree; its hooks belong to the caller."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice that the hook's `useState` and `useEffect` register on whichever component calls it, not on a separate node.",
      language: "typescript",
      code: "import { useState, useEffect } from \"react\";\n\nfunction useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {\n  const [value, setValue] = useState<T>(() => {\n    const raw = window.localStorage.getItem(key);\n    return raw !== null ? (JSON.parse(raw) as T) : initial;\n  });\n\n  useEffect(() => {\n    window.localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}"
    }
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
        text: "Use `useState` for each field, set `value` and `onChange` on the inputs, and call `e.preventDefault()` in the form's `onSubmit`.",
        isCorrect: true,
        explanation: "Correct. This is the controlled-component pattern: React owns the input's value through state, `onChange` keeps it in sync on every keystroke, and `preventDefault()` stops the browser's default navigation so you can validate or transform the data in JavaScript before it leaves the page."
      },
      {
        id: "B",
        text: "Write raw `document.forms[0].submit()` calls inside the component render body.",
        isCorrect: false,
        explanation: "Tempting if you think of the form as a DOM element you must reach into, but calling `submit()` during render is a side effect in the render phase, and it bypasses React's synthetic event system entirely. The supported way to intercept submission is the `onSubmit` prop on the `<form>` element."
      },
      {
        id: "C",
        text: "Forms cannot be created in React without third-party Java plugins.",
        isCorrect: false,
        explanation: "Tempting if you conflate React with a Java-based framework, but React is a JavaScript library and `<form>`, `<input>`, `<textarea>` are standard HTML elements it renders directly. No plugin, no external language, no build step beyond the normal React toolchain is involved."
      },
      {
        id: "D",
        text: "Use native HTML forms without event handlers and allow full page reloads on every character.",
        isCorrect: false,
        explanation: "Tempting if you assume uncontrolled forms are the only alternative to `useState`, but a native form without `onSubmit` reloads the page once on submit, not on every keystroke. The real cost is losing the ability to validate, transform, or conditionally branch on the values before they leave the browser."
      }
    ],
    correctAnswer: "A",
    explanation: "In React, the idiomatic way to build a form is the controlled-component pattern. Each field gets a `useState` hook; the input's `value` prop reads from that state and `onChange` writes the new value back. The `<form>` element's `onSubmit` handler calls `e.preventDefault()` so the browser does not navigate away before your code runs.\n\nBecause React re-renders whenever state changes, the input always displays the latest value without you querying the DOM. You can validate, transform, or conditionally render fields based on that state, and the component's output stays a pure function of its inputs.\n\nAn interviewer may follow up by asking when an uncontrolled form (using `useRef` to read the value at submit time) is preferable, or about the re-render cost of updating state on every keystroke in a large form. Knowing both patterns and the trade-off between them signals practical experience.",
    interviewLine: "I use the controlled-component pattern: each field is a `useState` hook, the input's `value` reads from it and `onChange` writes back, and I call `e.preventDefault()` in the form's `onSubmit` so the browser doesn't navigate away before I can validate.",
    misconception: "Thinking that React forms require reaching into the DOM with `document.forms` or that the only alternative to `useState`-based controlled inputs is a full page reload on each interaction.",
    hints: [
      "Think about who owns the input's value at any given moment: the DOM or the component's state.",
      "In React, setting `value` and `onChange` on an input makes it controlled; what does the form's `onSubmit` need to do to keep the page from reloading?",
      "You do not need to call `document.forms` or any DOM API; React's synthetic event system already wraps the native form submission."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `e.preventDefault()` is the only line that touches the browser's default behaviour; everything else is plain state and props.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction LoginForm() {\n  const [username, setUsername] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n\n  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    console.log(\"Signing in as\", username);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder=\"Username\" />\n      <input type=\"password\" value={password} onChange={(e) => setPassword(e.target.value)} />\n      <button type=\"submit\">Sign in</button>\n    </form>\n  );\n}"
    }
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
        text: "There is no meaningful difference; React and React Native are the same npm package that renders identical DOM elements with the same CSS styling in any browser.",
        isCorrect: false,
        explanation: "Tempting if you treat \"React\" as one monolithic library, but they are separate packages (`react` + `react-dom` vs `react` + `react-native`) with entirely different renderers and element sets."
      },
      {
        id: "B",
        text: "React is written in C++ for rendering performance; React Native is written in Python to interface with the iOS and Android native toolchains and compilers.",
        isCorrect: false,
        explanation: "This confuses the target platform's implementation language with the framework's own language. Both are written in JavaScript and TypeScript; the C++ and Objective-C code inside React Native is the native bridge, not the framework itself."
      },
      {
        id: "C",
        text: "React targets web browsers rendering HTML DOM elements (`<div>`, `<span>`); React Native targets iOS/Android rendering native platform UI widgets (`<View>`, `<Text>`).",
        isCorrect: true,
        explanation: "Correct. The shared programming model (components, hooks, state) sits on top of two different renderers: one emits DOM nodes the browser styles, the other emits native platform views."
      },
      {
        id: "D",
        text: "React is designed exclusively for mobile phone browsers; React Native is the dedicated framework for building desktop web applications in Chrome, Firefox, and Safari.",
        isCorrect: false,
        explanation: "This reverses the actual targets. React is the web UI library; React Native is the mobile (and now desktop) native app framework."
      }
    ],
    correctAnswer: "C",
    explanation: "React and React Native share the same component model, hooks, and state management, but they differ in what they render to. React's renderer (react-dom) produces HTML DOM elements like `<div>` and `<span>` that the browser styles with CSS. React Native's renderer maps your components to native platform widgets: `<View>` becomes a `UIView` on iOS or an `android.view.View` on Android, and `<Text>` becomes a native text element.\n\nIn practice this means you never write `<div>` or CSS in React Native. You use `<View>`, `<Text>`, and platform-specific style objects. Navigation, keyboard handling, and device APIs all differ because the runtime is the native app, not a browser tab.\n\nThe nuance an interviewer probes: both use the same `useState`, `useEffect`, and component composition rules. The \"React\" in each name refers to the programming model, not the output. Swapping between them means changing your elements and styles, not your component logic.",
    interviewLine: "I point out that they share the same component model and hooks, but the renderer differs: with React I emit DOM elements the browser styles with CSS, while React Native maps my components to native platform views like UIView on iOS.",
    misconception: "Treating \"React\" as a single output rather than a component model that can be rendered to any target, so the two products feel interchangeable.",
    hints: [
      "Think about what appears on screen: an HTML element inside a browser tab, or a native widget inside an installed app.",
      "Ask what the renderer outputs \u2014 DOM nodes or platform-specific view objects \u2014 and which style system each one uses.",
      "They share hooks and component composition; the difference is the rendering target, not the programming model."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The same logical card expressed for two different renderers: DOM elements with inline CSS versus native View and Text with a StyleSheet.",
      language: "jsx",
      code: "// Web (React)\nfunction Card() {\n  return (\n    <div style={{ padding: 16, border: \"1px solid #ccc\" }}>\n      <span>hello</span>\n    </div>\n  );\n}\n\n// Mobile (React Native)\nimport { View, Text, StyleSheet } from \"react-native\";\nconst s = StyleSheet.create({\n  card: { padding: 16, borderWidth: 1, borderColor: \"#ccc\" },\n});\nfunction Card() {\n  return (\n    <View style={s.card}>\n      <Text>hello</Text>\n    </View>\n  );\n}"
    }
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
        text: "State cannot be shared between sibling components under any circumstances, so each must maintain its own independent copy.",
        isCorrect: false,
        explanation: "Tempting if you notice that siblings have no direct reference to each other's state, but lifting the state to a common parent, using React Context, or adopting an external store all let two siblings read and update the same value."
      },
      {
        id: "B",
        text: "Always hoist all state to the root <App> component and pass everything down through props to guarantee a single source of truth.",
        isCorrect: false,
        explanation: "Tempting because it guarantees every component can reach any value, but it forces prop drilling through every intermediate component and causes app-wide re-renders whenever any single piece of state changes."
      },
      {
        id: "C",
        text: "Props are read-only inputs from the parent; state is owned by the component that declares it; siblings share data by lifting state to their nearest common parent.",
        isCorrect: true,
        explanation: "Correct. Props flow top-down and are read-only to the child; state is declared and mutated only by the component that calls useState; lifting to the nearest common parent gives siblings a single source of truth without coupling them directly."
      },
      {
        id: "D",
        text: "State is owned by child components exclusively; props are sourced from global browser objects like window or cookies.",
        isCorrect: false,
        explanation: "Props originate from the parent component's render output, not from any browser global such as cookies; state is owned by whichever component calls useState, regardless of whether that component sits higher or lower in the tree."
      }
    ],
    correctAnswer: "C",
    explanation: "Props are values a parent component passes to a child; the child reads them but cannot call a setter on them. State is declared inside a component with useState and is the only data that component can mutate through its setter function. Ownership is the key word: the component that calls useState owns that state, and no other component can change it directly.\n\nIn practice this means two siblings sitting side by side in the tree have no direct reference to each other's state. When both need to read and update the same value, you lift that state to their nearest common parent, pass the current value down as a prop, and pass a callback prop so each child can request an update. This keeps a single source of truth without coupling the siblings to each other.\n\nYou do not have to lift for every shared value. If a child only needs to notify the parent, a callback prop is enough. If the shared data spans a deep tree and prop drilling becomes unwieldy, React Context or an external store is the next tool. The guiding rule stays the same: keep state as local as possible, and lift only when two or more components must coordinate on the same value.",
    interviewLine: "Props are read-only inputs from the parent, state is local to the component that declares it, and when two siblings need the same value I lift that state to their nearest common parent and pass it back down as a prop with a callback so either child can request an update.",
    misconception: "Thinking that siblings sit side by side and can therefore read each other's state directly, or the opposite extreme that they can never share data at all. The real rule is ownership: each piece of state belongs to exactly one component, and sharing means moving that ownership up to a common ancestor.",
    hints: [
      "Ask yourself: who is allowed to call the setter for a given piece of data?",
      "If two siblings both need to read and update the same value, which component must own the state?",
      "The words \"under any circumstances\" and \"always\" in the other options are red flags; React gives you several valid patterns for sharing."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that neither sibling owns the state; both receive the value (or a callback to change it) from their shared parent.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Dashboard() {\n  const [theme, setTheme] = useState(\"light\");\n\n  return (\n    <div>\n      <ThemeLabel theme={theme} />\n      <ThemeToggle\n        onToggle={() => setTheme(t => (t === \"light\" ? \"dark\" : \"light\"))}\n      />\n    </div>\n  );\n}\n\nfunction ThemeLabel({ theme }: { theme: string }) {\n  return <span>Current: {theme}</span>;\n}\n\nfunction ThemeToggle({ onToggle }: { onToggle: () => void }) {\n  return <button onClick={onToggle}>Switch</button>;\n}"
    }
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
        text: "Prop drilling is the only correct way to pass data in React because Context and composition are anti-patterns that should be avoided.",
        isCorrect: false,
        explanation: "This treats React's top-down model as a mandate for props, but Context, `children` slots, and external stores all let a consumer receive a value without threading it through unrelated intermediates."
      },
      {
        id: "B",
        text: "Avoid prop drilling by moving all shared state into a single global Redux store so no component ever needs to pass props.",
        isCorrect: false,
        explanation: "A global store is appropriate when many components across unrelated subtrees read and write the same slice, but for a single consumer a few levels down it adds boilerplate, a new dependency, and re-render coupling that composition avoids."
      },
      {
        id: "C",
        text: "Prop drilling occurs when passing props through intermediate layers that don't need them; avoid it by using React Context, component composition (`children`), or state management stores.",
        isCorrect: true,
        explanation: "Correct. Context, composition, and stores each let the consumer reach the value without every intermediate re-declaring and forwarding it, removing the coupling that makes the chain brittle."
      },
      {
        id: "D",
        text: "Prop drilling is a performance problem because every intermediate component re-renders when the prop changes, so it must be eliminated with memoization.",
        isCorrect: false,
        explanation: "Intermediates that only forward a prop do not re-render when that prop's reference is unchanged, and even when they do, the real cost is API coupling and refactoring friction, not render count; memoization does not remove the need to thread the prop."
      }
    ],
    correctAnswer: "C",
    explanation: "Prop drilling is the pattern where a value must pass through one or more intermediate components that neither own nor consume it, just to reach a deeply nested leaf. Each intermediate component's props signature grows, its public API widens, and the component becomes coupled to data it does not use. In a typical layout tree\u2014`App \u2192 Shell \u2192 Sidebar \u2192 Panel \u2192 FilterBar`\u2014passing `authUser` down four levels means `Shell` and `Sidebar` must re-declare a prop they will never read.\n\nThe practical cost shows up in refactors and reuse. If you lift `FilterBar` into a different branch of the tree, you must re-thread the prop through that branch's intermediates. If two teams touch `Shell` and `Sidebar` independently, both must keep the forwarded prop in sync or a type-check passes but a runtime `undefined` slips through.\n\nThe escape hatches trade one coupling for another. React Context lets any consumer pull a value without intermediates, but every consumer re-renders whenever the value's reference changes, so memoise or split contexts. Composition via `children` keeps the data in the parent that already owns it and avoids a new global channel entirely. A state-management store (Zustand, Redux, Jotai) is appropriate when many components across unrelated subtrees read and write the same slice; for a single consumer a few levels down, composition is usually the smallest change.",
    interviewLine: "Prop drilling happens when a value has to pass through components that neither own nor consume it, so I reach for composition to let the parent hand the consumer a rendered subtree directly, or Context when many unrelated subtrees need the same value without coupling the intermediates.",
    misconception: "Because React renders top-down, every piece of data must flow through every intermediate component's props, so the only way to reach a deep child is to thread the value through each layer's signature.",
    hints: [
      "Look at the intermediate components between the data owner and the consumer: do they actually read the prop, or just forward it?",
      "Ask whether the consumer is one component or many across unrelated branches\u2014that determines whether composition, Context, or a store is the right tool.",
      "Context re-renders every consumer when the value reference changes, so for a single consumer a few levels down, passing a rendered subtree via `children` is often simpler and avoids a new global channel."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice how the composed `Layout` drops the `user` prop entirely; the parent that owns the data places the consumer inside the slot, so no intermediate needs to re-declare it.",
      language: "tsx",
      code: "type User = { id: string; name: string };\n\n// Drilled: Layout re-declares `user` but never reads it\nfunction LayoutDrilled({ children, user }: { children: React.ReactNode; user: User }) {\n  return (<><header>App</header><main>{children}</main></>);\n}\n\n// Composed: Layout has no knowledge of `user`\nfunction Layout({ children }: { children: React.ReactNode }) {\n  return (<><header>App</header><main>{children}</main></>);\n}\n\nfunction Dashboard({ user }: { user: User }) {\n  return (\n    <Layout>\n      <p>Welcome, {user.name}</p>\n    </Layout>\n  );\n}"
    }
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
        text: "Hooks were a legacy feature introduced in React 15 and later removed entirely in React 18.",
        isCorrect: false,
        explanation: "Tempting only if you confuse React's hook API with an earlier internal proposal, but hooks shipped in React 16.8 and remain the primary way to write components in React 19. No version removed them."
      },
      {
        id: "B",
        text: "Hooks give function components state, effects, refs, and context, and let you extract reusable logic into custom hooks without classes or wrappers.",
        isCorrect: true,
        explanation: "Correct. Hooks are the mechanism that gives function components access to state, effects, refs, and context, and because they are plain functions, composing them into custom hooks replaces both class inheritance and HOC wrappers."
      },
      {
        id: "C",
        text: "Hooks require every state variable to be persisted in a backend Redis cluster rather than memory.",
        isCorrect: false,
        explanation: "Tempting only if you conflate React's client-side state with a server-side cache layer, but `useState` stores a value in the component's fiber node in browser memory; no network call or external store is involved."
      },
      {
        id: "D",
        text: "Hooks compile JavaScript components into native Swift code so they can run directly on iOS.",
        isCorrect: false,
        explanation: "Tempting only if you picture a build step that transpiles to a platform language, but hooks are JavaScript functions that execute inside the standard React runtime; no compiler emits Swift or any other native code."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks like `useState`, `useEffect`, `useRef`, and `useContext` are ordinary functions you call at the top level of a function component. React tracks each call by its position in the render order and stores the returned value in a linked list on the component's fiber node. A custom hook is simply a function that calls several hooks and returns their values, so logic like a debounced value or a media-query subscription can be written once and called from any component without a class, a HOC, or a render prop.\n\nIn practice this removes the wrapper-nesting problem. Before hooks, sharing an auth-style logic meant wrapping your component in `withAuth(Component)`, which added a layer to the tree, required `this` binding, and split related logic across `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. With hooks the same logic is one function: `const user = useAuth();` at the top of the component, with the effect and cleanup in a single `useEffect` block.\n\nThe constraint that hooks must be called unconditionally at the top level exists precisely because React identifies them by call order. Wrapping `useState` in an `if` changes the order on the next render and shifts every subsequent hook to the wrong slot. This is also why hooks cannot be used in plain JavaScript functions that are not components or custom hooks: there is no fiber node to store the value in.",
    interviewLine: "Hooks work because React stores each hook's value in a linked list on the fiber node, keyed by call position, so `useState` and `useEffect` are just functions that read and write into that list \u2014 and because they're plain functions, I can group them into a custom hook and call it from any component without adding a wrapper to the tree.",
    misconception: "Treating hooks as a syntactic rename of class lifecycle methods (constructor becomes `useState`, `componentDidMount` becomes `useEffect`) rather than a different execution model where values are tracked by call position on the fiber node and logic composes through plain function calls.",
    hints: [
      "Where does React store the value returned by `useState` between renders?",
      "What does a custom hook do differently from a HOC in terms of the component tree?",
      "The rules of hooks exist because of a specific tracking mechanism \u2014 what breaks if you wrap a hook call in an `if`?"
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice that `useDebouncedValue` is just a function that calls two hooks and returns a value, so any component can use it at the top level without adding a wrapper to the tree.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nfunction useDebouncedValue<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const debouncedQuery = useDebouncedValue(query, 300);\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <p>Searching for: {debouncedQuery}</p>\n    </div>\n  );\n}"
    }
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
        text: "Acts as a universal replacement for useState, since both track values that change over the component's lifetime.",
        isCorrect: false,
        explanation: "Tempting if you conflate managing a value over time with running a side effect, but useState stores a value synchronously during render while useEffect defers work until after the browser paints; they solve different problems and are not interchangeable."
      },
      {
        id: "B",
        text: "Executes synchronously during the commit phase, before the browser has a chance to repaint the screen.",
        isCorrect: false,
        explanation: "This describes useLayoutEffect. useEffect is intentionally deferred so it does not block painting; the effect callback fires after the browser has already rendered the new DOM."
      },
      {
        id: "C",
        text: "Performs a deep, recursive comparison of every nested property in the dependency array on each render to decide whether to re-run.",
        isCorrect: false,
        explanation: "React compares each dependency with Object.is, a single referential check. Two objects with identical contents but different references are always treated as changed, so you must pass primitives or stable references."
      },
      {
        id: "D",
        text: "Runs after render: an empty [] triggers once on mount with cleanup on unmount; a list like [a, b] re-runs only when those values change; returning a function runs cleanup before the next effect or unmount.",
        isCorrect: true,
        explanation: "Correct. The dependency array gates re-execution with Object.is equality, the empty array pins the effect to mount and unmount, and the returned cleanup function guarantees teardown before the next run or unmount."
      }
    ],
    correctAnswer: "D",
    explanation: "useEffect schedules a side effect to run after React commits the new DOM and the browser has painted. The dependency array is the gate: an empty array [] means run once after mount and clean up on unmount; a list like [userId] means re-run whenever userId changes. If the effect function returns a function, React calls that as cleanup before the next effect run and on unmount.\n\nIn practice this means the effect body sees the latest render's values because it only re-runs when a dependency actually changed. If you omit the array entirely the effect fires after every render. If you pass an object literal or a new function reference, it fires every render too, because Object.is sees a new reference each time. The cleanup function is what lets you cancel a subscription, abort a fetch, or clear an interval so you do not leak resources or race with stale responses.\n\nTwo nuances an interviewer will probe. First, the comparison is Object.is, not deep equality: two objects with identical contents but different references count as changed. Second, useEffect is asynchronous relative to paint; if you need to read or adjust the DOM synchronously before the browser repaints, that is useLayoutEffect's job.",
    interviewLine: "I rely on useEffect firing after the browser paints the new DOM, and I treat the dependency array as an Object.is gate between renders \u2014 if a value differs, React runs cleanup then the effect again; I use an empty array to run once on mount and clean up on unmount.",
    misconception: "The dependency array is a subscription list the component watches in real time. In reality React simply compares the previous and next render's values with Object.is and re-runs the effect if any differ; there is no watcher, no deep inspection, and no scheduling outside the render cycle.",
    hints: [
      "Think about where in the render cycle the effect callback actually executes relative to the browser paint.",
      "Ask what comparison React performs on the dependency array between two renders, and what an empty array means for that comparison.",
      "The cleanup function is the only mechanism React gives you to undo a subscription, abort a fetch, or clear a timer before the next run."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice the AbortController in the cleanup: when roomId changes, the previous fetch is cancelled before the new one starts, preventing a stale response from overwriting fresh data.",
      language: "tsx",
      code: "function ChatRoom({ roomId }: { roomId: string }) {\n  const [messages, setMessages] = useState<string[]>([]);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch(`/api/rooms/${roomId}/messages`, { signal: controller.signal })\n      .then((r) => r.json())\n      .then(setMessages)\n      .catch(() => {});\n    return () => controller.abort();\n  }, [roomId]);\n\n  return <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>;\n}"
    }
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
        text: "Serializes the value into an encrypted cookie that travels with every HTTP request to the server.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word 'reference' with server-side persistence, but useRef is a plain in-memory JavaScript object that lives and dies with the component instance; nothing is serialized, encrypted, or sent to the server."
      },
      {
        id: "B",
        text: "Returns a stable `{ current: initialValue }` object; React never watches `.current`, so writing to it is silent and does not schedule a re-render.",
        isCorrect: true,
        explanation: "Correct. React keeps the same ref object across renders, so .current is a stable mutable slot. Because the reconciler never watches that property, writing to it is silent and does not schedule a render."
      },
      {
        id: "C",
        text: "Swaps in for `useState` on any dynamic form input, since it holds a value that survives across renders.",
        isCorrect: false,
        explanation: "Tempting if you think 'persistent mutable storage' is enough for any changing value, but a form input that must reflect the user's typing needs the UI to re-render, and only a state update gives React that signal. A ref write produces no render."
      },
      {
        id: "D",
        text: "Marks the component dirty the moment `ref.current` is assigned, so the next render picks up the new value.",
        isCorrect: false,
        explanation: "Tempting if you assume every React hook mutation is observable by the scheduler, but ref.current is a plain object property outside React's dependency graph. No render is scheduled; the component simply reads the new value on its next natural render."
      }
    ],
    correctAnswer: "B",
    explanation: "useRef(initialValue) returns a plain object shaped { current: initialValue }. React stores that object on the fiber and hands back the same reference on every render. Mutating .current is a property write on a JavaScript object; the reconciler never observes it, so no re-render is scheduled and no subscribers are notified.\n\nIn practice this means refs are the right tool for values the screen does not display: a setTimeout ID you want to clear, the previous value of a prop you are comparing, or a DOM node you need to call .focus() on. Store a form field's text in a ref and type into it, and the rendered output will never change because React has no signal to re-render.\n\nTwo details an interviewer will probe. First, the ref object is stable, but the DOM node it points to can be null if the element has not mounted yet or has been removed. Second, mutating ref.current during the render phase is a side effect; do it inside an effect or an event handler so React's concurrent features do not replay the render.",
    interviewLine: "useRef gives me a stable mutable slot that React does not observe, so I use it for DOM nodes, timer IDs, or previous-value comparisons where I need persistence without a re-render; the moment the value needs to drive the UI, I switch to useState.",
    misconception: "The learner treats useRef as a reactive store and expects that writing to ref.current notifies React the same way setState does, so they reach for a ref when the value actually needs to drive the UI.",
    hints: [
      "Both useState and useRef survive re-renders, but only one of them tells React to render again.",
      "Ask: after I write to the stored value, does the component's output change? If not, which hook do I need?",
      "The ref object is a plain { current } property bag; React's reconciler never reads or watches that property."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "The timer ID and the previous query live in refs because neither one needs to trigger a re-render; only the input's value (driven by props) is reactive.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction DebouncedSearch({ query }: { query: string }) {\n  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);\n  const prevQuery = useRef(query);\n\n  useEffect(() => {\n    if (prevQuery.current === query) return;\n    prevQuery.current = query;\n\n    clearTimeout(timer.current);\n    timer.current = setTimeout(() => {\n      // fetch results for `query`\n    }, 300);\n\n    return () => clearTimeout(timer.current);\n  }, [query]);\n\n  return <input value={query} readOnly />;\n}"
    }
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
        text: "Custom hooks must be declared as instance methods inside class components, invoked via `this.useHook()` to bind state to the component instance.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as a method you attach to a component instance, but hooks are standalone functions in module scope. A class component has no fiber hook list, so there is nowhere for `useState` or `useEffect` to register, and `this.useHook()` is not a React API."
      },
      {
        id: "B",
        text: "Custom hooks must return a JSX element like `<div />` so the calling component can render their output directly into the tree.",
        isCorrect: false,
        explanation: "This confuses a hook with a render helper. A custom hook returns arbitrary values: a number, an object of handlers, a tuple, or nothing at all. Returning JSX is legal but not required, and most hooks return data or callbacks instead."
      },
      {
        id: "C",
        text: "Custom hooks are functions named with a `use` prefix that call built-in hooks, sharing stateful logic across components with per-instance state isolation.",
        isCorrect: true,
        explanation: "Correct. The `use` prefix triggers the Rules of Hooks, the function body calls built-in or other custom hooks, and each component that invokes the hook gets its own independent set of hook registrations."
      },
      {
        id: "D",
        text: "Custom hooks share a single global state singleton across all components that call them, so a state update in one caller propagates to every other.",
        isCorrect: false,
        explanation: "This reads the hook name as a registry key, but each call site creates fresh `useState` and `useEffect` entries in its own fiber. Two components calling `useFetch(\"/api/users\")` hold two separate copies of state; nothing is shared unless you wire up a context or an external store yourself."
      }
    ],
    correctAnswer: "C",
    explanation: "A custom hook is a plain JavaScript function whose name starts with `use` and that calls one or more built-in hooks (or other custom hooks) internally. The `use` prefix is the naming convention that makes React's linter and the Rules of Hooks apply to it. It returns whatever the calling component needs: a state value, an array of values, a handler object, or a mix.\n\nIn practice, when you extract a `useFetch(url)` hook, every component that calls it registers its own `useState` and `useEffect` entries in its fiber. Two components using the same hook with different arguments maintain completely independent state. There is no implicit cache, no shared reference, and no coupling between callers unless you explicitly build one with `useRef`, a context, or an external store.\n\nThe nuance an interviewer probes next is the call-site constraint. A custom hook must be invoked unconditionally at the top level of a component or another hook, because React identifies each hook by its position in the call order. Wrapping the call in an `if` or a loop shifts that order between renders and corrupts the internal bookkeeping. A custom hook may also call other custom hooks, so you can compose `useAuth` inside `useDashboard` without violating any rule.",
    interviewLine: "A custom hook is just a function that starts with `use` and calls other hooks internally. Every component that invokes it gets its own `useState` and `useEffect` registrations in its fiber, so two components using `useFetch` with different URLs hold completely independent state unless I explicitly build a shared cache with a context or an external store.",
    misconception: "Treating a custom hook's name as a shared-identifier that links all callers to one state instance, rather than understanding that each call site registers its own independent hook entries in its component's fiber.",
    hints: [
      "Look at what a custom hook is syntactically: a plain function in module scope, not a class method or a component that renders JSX.",
      "Ask what happens in the fiber when two different components both call `useFetch(\"/api/users\")`\u2014do they share a `useState` entry or each get their own?",
      "The `use` prefix is a linter convention that enforces call-order rules; it does not register the hook in a global map or create a shared singleton."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Two components call the same `useLocalStorage` hook with different keys; each gets its own independent `useState` entry, and the hook returns a tuple rather than JSX.",
      language: "tsx",
      code: "function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {\n  const [value, setValue] = useState<T>(() => {\n    const stored = window.localStorage.getItem(key);\n    return stored ? (JSON.parse(stored) as T) : initial;\n  });\n\n  const set = (v: T) => {\n    setValue(v);\n    window.localStorage.setItem(key, JSON.stringify(v));\n  };\n\n  return [value, set];\n}\n\nfunction ThemePicker() {\n  const [theme, setTheme] = useLocalStorage(\"theme\", \"light\");\n  return <button onClick={() => setTheme(theme === \"light\" ? \"dark\" : \"light\")}>{theme}</button>;\n}\n\nfunction FontSize() {\n  const [size, setSize] = useLocalStorage(\"fontSize\", 16);\n  return <input type=\"range\" value={size} onChange={(e) => setSize(Number(e.target.value))} />;\n}"
    }
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
        text: "Store the user's credentials in URL query parameters so the redirect target can read them after the page loads.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"passing data for the redirect\" with \"passing secrets around.\" Credentials in the URL leak into browser history, server logs, and the Referer header; the router's `state` object is the in-memory channel meant for this."
      },
      {
        id: "B",
        text: "Capture the intended destination in `location.state.from`, and upon successful auth, call `navigate(from, { replace: true })` to prevent the back button from returning to login.",
        isCorrect: true,
        explanation: "Correct. Storing the path in `state` keeps it out of the URL, and `replace: true` removes the login entry from history so Back skips straight past it."
      },
      {
        id: "C",
        text: "React is purely declarative, so navigation can only happen through user-initiated link clicks and not from code.",
        isCorrect: false,
        explanation: "The declarative model means you describe the UI, but `useNavigate` is a regular function you call from an event handler or effect. Programmatic navigation is a first-class part of React Router's API."
      },
      {
        id: "D",
        text: "Call `window.location.reload()` inside a `setInterval` loop until the auth token appears in storage.",
        isCorrect: false,
        explanation: "A reload loop hammers the network, destroys in-flight state, and can lock the tab. The router already knows how to change the URL and render the new route without a full page load."
      }
    ],
    correctAnswer: "B",
    explanation: "The answer is B. When a guard detects an unauthenticated user, the router sends them to /login and stores the original path in `location.state.from`. After the auth call succeeds, `navigate(from, { replace: true })` sends the user to the path they originally wanted.\n\nThe `replace: true` flag overwrites the login entry in the browser history stack. Without it, pressing Back from the destination lands the user on /login again, which immediately bounces them forward \u2014 a confusing loop that makes the app feel broken.\n\nOne nuance an interviewer will probe next: `location.state.from` is client-controlled. If you pass it straight into `navigate`, a crafted value like `https://evil.com` becomes an open redirect. Validate the stored path against an allowlist of internal routes before navigating.",
    interviewLine: "I stash the original path in `location.state.from` when the guard redirects to login, then after the auth call I call `navigate(from, { replace: true })` so the Back button skips the login page entirely.",
    misconception: "The learner believes post-login redirect requires a full page reload or a server-side 302, so they reach for `window.location` tricks instead of the router's own `navigate` API and `state` object.",
    hints: [
      "What does the router put into `location.state` when it sends an unauthenticated user to /login?",
      "After auth succeeds, which `navigate` option prevents the login entry from staying in the history stack?",
      "You do not need a full page reload; the router can change the URL and render the new route in place."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice how `ProtectedRoute` stashes the original path in `state.from`, and `Login` reads it back after auth to `navigate` with `replace: true`.",
      language: "tsx",
      code: "import { Navigate, useLocation, useNavigate } from \"react-router-dom\";\n\nexport function ProtectedRoute({ children }: { children: React.ReactNode }) {\n  const location = useLocation();\n  if (!sessionStorage.getItem(\"token\")) {\n    return <Navigate to=\"/login\" state={{ from: location.pathname }} replace />;\n  }\n  return <>{children}</>;\n}\n\nexport function Login() {\n  const navigate = useNavigate();\n  const location = useLocation();\n  const from = (location.state as { from?: string })?.from ?? \"/\";\n\n  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    await fetch(\"/api/login\", { method: \"POST\" });\n    navigate(from, { replace: true });\n  }\n\n  return <form onSubmit={handleSubmit}><button>Sign in</button></form>;\n}"
    }
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
        text: "A component that delegates state management to jQuery plugins and reads the DOM directly for reactivity.",
        isCorrect: false,
        explanation: "Tempting if you came from a jQuery codebase, but React Hooks are a built-in state and effect system; they do not wrap or delegate to any external library."
      },
      {
        id: "B",
        text: "A component using `useState` to bind an `<input value={query} onChange={...}>` and `useEffect` with dependency `[query]` to filter or update results reactively.",
        isCorrect: true,
        explanation: "Correct. `useState` makes the input controlled, and `useEffect` with a dependency array ties the filtering logic to the specific state change that should trigger it."
      },
      {
        id: "C",
        text: "A component that issues raw SQL queries inside the JSX return statement and renders the result set.",
        isCorrect: false,
        explanation: "This confuses the rendering layer with a data-access layer; JSX produces a virtual tree, and no SQL engine runs in the browser's render path."
      },
      {
        id: "D",
        text: "A component that mutates `document.body` in a synchronous `while` loop to keep the UI in sync.",
        isCorrect: false,
        explanation: "A `while` loop that mutates `document.body` bypasses React entirely; the reconciler overwrites your changes on the next commit, and the loop blocks the main thread."
      }
    ],
    correctAnswer: "B",
    explanation: "Option B describes the controlled-input-plus-effect pattern. `useState` gives you a `query` variable and a `setQuery` updater; binding `<input value={query} onChange={e => setQuery(e.target.value)}` makes React the single source of truth for the input's text. `useEffect` with `[query]` in the dependency array runs after the render that committed the new query, letting you derive filtered results from the latest state.\n\nIn a real component this means the DOM never holds the authoritative value. When the user types, `onChange` fires, `setQuery` schedules a re-render, React commits the new `value` onto the input, and only then does the effect body execute to recompute `results`. Data flows one way through state; there is no synchronous read-back from the DOM.\n\nAn interviewer will probe the dependency array next. Listing `[query, items]` also re-runs the effect when the `items` prop changes, which is correct for a search list fed by a parent. Omitting the array runs the effect after every render; an empty array runs it once on mount. The array is the contract that tells React exactly which external inputs the effect depends on.",
    interviewLine: "I keep the input controlled so `useState` owns the value, and I give `useEffect` a `[query]` dependency so it runs after the render that committed the new query and derives the filtered list from the latest state.",
    misconception: "Treating the component as an imperative script that reads the DOM, mutates it, and loops until the UI looks right, rather than a declarative description where state changes drive re-renders and effects handle side effects after commit.",
    hints: [
      "Look at the `<input>` element: is its `value` an expression from state, or a static string?",
      "What triggers the filtering logic to re-run, and when does that code actually execute relative to the render?",
      "The effect body does not run during render; it runs after React has committed the new DOM."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input",
    example: {
      caption: "Notice the cleanup function clears the debounce timer when `query` or `endpoint` changes, preventing a stale fetch from being scheduled, and the effect only re-runs when those dependencies change.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nfunction SearchBox({ endpoint }: { endpoint: string }) {\n  const [query, setQuery] = useState(\"\");\n  const [hits, setHits] = useState<string[]>([]);\n  useEffect(() => {\n    if (!query) {\n      setHits([]);\n      return;\n    }\n    const id = setTimeout(() => {\n      fetch(`${endpoint}?q=${encodeURIComponent(query)}`)\n        .then((r) => r.json())\n        .then(setHits);\n    }, 250);\n    return () => clearTimeout(id);\n  }, [query, endpoint]);\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <ul>{hits.map((h) => <li key={h}>{h}</li>)}</ul>\n    </div>\n  );\n}"
    }
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
        text: "React Router requires generating 50 separate HTML files on the server, one per route, and the browser must fetch each before rendering.",
        isCorrect: false,
        explanation: "Tempting if you picture server-rendered pages, but React Router is a client-side library: one HTML shell loads, and the router swaps components in response to URL changes without additional server requests."
      },
      {
        id: "B",
        text: "React Router was deprecated and replaced by manual `location.hash` string parsing in the browser, with no library support remaining.",
        isCorrect: false,
        explanation: "Tempting if you confuse it with the old hash-based URL pattern, but React Router v6 and v7 are actively maintained and remain the standard routing solution in the React ecosystem."
      },
      {
        id: "C",
        text: "React Router v6+ uses `<Routes>`, `<Route>`, `<Outlet />` layouts, and hooks like `useNavigate` and `useParams` for declarative client-side routing.",
        isCorrect: true,
        explanation: "Correct. These are the exact primitives React Router v6 introduced to replace v5's `<Switch>` and render-prop pattern, giving a cleaner declarative API for nested routing and navigation."
      },
      {
        id: "D",
        text: "React Router is a CLI tool that only runs inside Linux terminal sessions and cannot execute in a browser environment.",
        isCorrect: false,
        explanation: "Tempting if you conflate it with a build tool, but React Router is a JavaScript library that executes in the browser (and optionally on a Node.js server for SSR) to manage client-side navigation."
      }
    ],
    correctAnswer: "C",
    explanation: "React Router v6+ maps URL paths to React components inside a single HTML document. You declare a route tree with `<Routes>` and `<Route>`, and the library matches the current URL against that tree to decide which components render. Navigation hooks such as `useNavigate`, `useParams`, `useLocation`, and `useSearchParams` expose routing state as plain values, so any component in the tree can read or change it without prop drilling.\n\nIn a real codebase this means a layout component renders a shared shell (header, sidebar) and places `<Outlet />` where the matched child route's component appears. Adding a new page is one `<Route>` entry and one component file; the browser never requests a second HTML document.\n\nAn interviewer will often probe the split between `useNavigate` (imperative, called from an event handler) and `<Link>` (declarative, rendered as an anchor). Both update the history stack, but `<Link>` keeps the navigation intent visible in the component tree and supports `formAction` for form-driven navigation.",
    interviewLine: "In v6 I define a route tree with `<Routes>` and `<Route>`, drop an `<Outlet />` in my layout component for nested pages, and pull navigation state with `useParams` or `useNavigate` instead of threading props down the tree.",
    misconception: "Treating client-side routing as server-side page generation, where every URL must map to a separate HTML document delivered by the server.",
    hints: [
      "Think about what happens in the browser when you click a link: does the server send a new HTML file, or does JavaScript swap components in place?",
      "In v6, which top-level component replaced the old `<Switch>`, and how does a parent layout render its matched child route?",
      "The correct answer describes a declarative, hook-based API that runs entirely client-side inside one HTML document."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "The `<Outlet />` in `Layout` is where the matched child route renders, and `useParams` reads the `:teamId` segment without any prop passing.",
      language: "tsx",
      code: "import { Routes, Route, Outlet, useParams } from \"react-router-dom\";\n\nfunction Layout() {\n  const { teamId } = useParams();\n  return (\n    <div>\n      <nav>Team: {teamId}</nav>\n      <main>\n        <Outlet />\n      </main>\n    </div>\n  );\n}\n\nexport function App() {\n  return (\n    <Routes>\n      <Route path=\"/teams/:teamId\" element={<Layout />}>\n        <Route index element={<Overview />} />\n        <Route path=\"members\" element={<Members />} />\n      </Route>\n    </Routes>\n  );\n}"
    }
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
        text: "Hooks cover all class features except error boundaries, which still require class components.",
        isCorrect: true,
        explanation: "Correct. Every class lifecycle and state pattern has a direct hook equivalent, and the only feature with no hook API in React 19 is the error boundary mechanism driven by `componentDidCatch`."
      },
      {
        id: "B",
        text: "Hooks cannot be used with React Context or refs, limiting their scope to state and effects.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as limited to state and effects, but `useContext` and `useRef` give functional components full access to context providers and mutable or DOM refs, exactly as class components do via `this.context` and `this.refs`."
      },
      {
        id: "C",
        text: "Hooks cover only a small fraction of class features and cannot handle component state or updates.",
        isCorrect: false,
        explanation: "This underestimates hooks to the point of absurdity: `useState` and `useReducer` are the primary state-management tools in modern React, and `useEffect` handles every lifecycle transition a class component managed."
      },
      {
        id: "D",
        text: "Hooks have completely replaced error boundaries, so class components are no longer needed for them.",
        isCorrect: false,
        explanation: "Two facts are wrong here: hooks shipped in React 16.8, not 15, and as of React 19 there is still no hook-based error boundary, so class components remain the only way to implement `componentDidCatch`."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks map one-to-one onto the class component API: `useState` and `useReducer` replace `this.state` and `this.setState`, `useEffect` replaces `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, `useRef` replaces `this.refs`, and `useContext` replaces `this.context`. The single feature with no hook equivalent in React 19 is the error boundary mechanism driven by `componentDidCatch` and `getDerivedStateFromError`.\n\nIn a production app this means your component tree is entirely functional except for one or two class-based boundary wrappers at strategic levels. You write every data-fetching call, state update, and side-effect in hooks, and the only `class` keyword you see in the codebase is the boundary that catches render errors from its children.\n\nThe reason this gap persists is structural: an error boundary intercepts an exception thrown during a child's render and calls `componentDidCatch` on the boundary. Hooks execute during a component's own render pass and have no mechanism to catch an error originating in a descendant, so React has not shipped a hook-based alternative as of version 19.",
    interviewLine: "I find hooks replace every class feature except error boundaries: I still write a class for `componentDidCatch` in React 19, because catching a child's render error is something no hook API can do.",
    misconception: "Hooks are a strict subset of class capabilities, when in fact the only class feature without a hook equivalent is error boundaries and everything else\u2014state, lifecycles, context, refs\u2014maps directly.",
    hints: [
      "List the class features one by one\u2014state, lifecycles, context, refs\u2014and check whether each has a hook equivalent.",
      "Ask which class method React still has no hook API for, and why the hook model cannot express it.",
      "Error boundaries are the one gap; the rest of the class API maps to hooks."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "The only class component in the tree is the error boundary; everything below it is hooks.",
      language: "tsx",
      code: "import { Component, useState, useEffect } from \"react\";\n\nclass Boundary extends Component<\n  { children: React.ReactNode },\n  { err: boolean }\n> {\n  state = { err: false };\n  static getDerivedStateFromError() { return { err: true }; }\n  componentDidCatch(e: Error) { console.error(e.message); }\n  render() { return this.state.err ? <p>Failed</p> : this.props.children; }\n}\n\nfunction Feed() {\n  const [data, setData] = useState<string[]>([]);\n  useEffect(() => {\n    fetch(\"/api/feed\").then(r => r.json()).then(setData);\n  }, []);\n  return <ul>{data.map(d => <li key={d}>{d}</li>)}</ul>;\n}\n\nexport default () => <Boundary><Feed /></Boundary>;"
    }
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
        text: "`componentDidMount` is replaced by calling `setTimeout` directly inside the render body, since both defer work until after the first paint.",
        isCorrect: false,
        explanation: "Tempting if you equate \"after mount\" with \"after a tick,\" but render must stay pure; any timer, fetch, or subscription belongs in `useEffect` so React controls when it fires and can invoke a cleanup."
      },
      {
        id: "B",
        text: "Class lifecycle methods run on the server during SSR, while hooks run client-side in CSS, so the two are never interchangeable.",
        isCorrect: false,
        explanation: "Neither lifecycle methods nor hooks are bound to a rendering surface; both run in the JavaScript runtime wherever React is executing, whether browser, Node, or a worker."
      },
      {
        id: "C",
        text: "`componentWillUnmount` has no hook equivalent; you must store a cleanup function in a `useRef` and call it manually at unmount time.",
        isCorrect: false,
        explanation: "The cleanup function returned from `useEffect` runs on unmount (and before every re-execution), which is exactly the teardown role `componentWillUnmount` played in a class component."
      },
      {
        id: "D",
        text: "`componentDidMount` -> `useEffect(fn, [])`; `componentDidUpdate` -> `useEffect(fn, [deps])`; `componentWillUnmount` -> returned cleanup; layout reads -> `useLayoutEffect`.",
        isCorrect: true,
        explanation: "Correct. One `useEffect` call covers mount (empty deps), update (changed deps), and unmount (returned cleanup), and `useLayoutEffect` handles the synchronous read-before-paint case that class components handled in `componentDidUpdate`."
      }
    ],
    correctAnswer: "D",
    explanation: "In a class component, `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` are three separate methods you override. In a function component, `useEffect` collapses all three into one hook: the callback runs after mount (empty dependency array) or after any update where a listed dep changed, and the cleanup function it returns runs before unmount and before every re-execution. `useLayoutEffect` covers the synchronous DOM-read portion of `componentDidUpdate` and `getSnapshotBeforeUpdate` when you must measure layout before the browser paints.\n\nIn practice this means a single `useEffect` with a dependency array handles the \"fetch on mount, refetch on prop change, cancel on unmount\" pattern that a class component spread across three methods. Forgetting the cleanup is the most common bug: you get a state update on an unmounted component or a leaked interval.\n\nThe mapping is not one-to-one. `componentDidUpdate` fires on every update regardless of what changed; `useEffect(fn, [deps])` fires only when a dep actually changed. And `getSnapshotBeforeUpdate` has no direct hook equivalent \u2014 the idiom is to store the previous value in a ref during render, then read it alongside the already-updated DOM inside `useLayoutEffect`.",
    interviewLine: "I use a single `useEffect` with a dependency array for the mount-and-update logic and return a cleanup function for unmount; if I need to read layout values synchronously before paint, I switch to `useLayoutEffect` instead.",
    misconception: "Treating the three class lifecycle methods as three separate concerns that each need their own hook, rather than recognising that `useEffect`'s callback-plus-cleanup pattern is one unified primitive covering mount, update, and unmount together.",
    hints: [
      "Look at what `useEffect`'s second argument, the dependency array, controls: an empty array means run once, a list of values means re-run when any of them change.",
      "Ask what happens to the function you return from the effect callback \u2014 that is the unmount path and the re-subscription guard.",
      "The trap is assuming each class method needs its own separate hook; in reality one `useEffect` call covers mount, update, and unmount together."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "The cleanup function returned from `useEffect` is the unmount equivalent; it also runs before the effect re-executes when `symbol` changes, so the old WebSocket is closed before the new one opens.",
      language: "tsx",
      code: "function LivePrice({ symbol }: { symbol: string }) {\n  const [price, setPrice] = useState<number | null>(null);\n\n  useEffect(() => {\n    const ws = new WebSocket(`wss://api.example.com/price/${symbol}`);\n    ws.onmessage = (e) => setPrice(Number(e.data));\n    return () => ws.close();\n  }, [symbol]);\n\n  return <span>{price ?? \"\u2026\"}</span>;\n}"
    }
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
        explanation: "Correct. These four phases describe what React does to a component instance from the moment it first renders to the moment it is removed, and each maps to a specific hook or effect you can observe in code."
      },
      {
        id: "B",
        text: "Parsing (reading source), Transpiling (converting syntax), and Garbage Collecting (freeing memory).",
        isCorrect: false,
        explanation: "Tempting if you think of a lifecycle as what happens to the JavaScript file. Parsing and transpiling happen before React ever sees your code, and garbage collection is a memory-management concern of the engine, not a phase React applies to a component."
      },
      {
        id: "C",
        text: "Connecting (opening a socket), Authenticating (verifying credentials), and Disconnecting (closing the session).",
        isCorrect: false,
        explanation: "Tempting if you associate the word lifecycle with a session. These describe a WebSocket or HTTP connection, not the add, update, and remove steps React performs on a component in the UI tree."
      },
      {
        id: "D",
        text: "Compiling (converting to bytecode), Minifying (stripping comments), and Deploying (shipping to a server).",
        isCorrect: false,
        explanation: "Tempting if you conflate the build pipeline with runtime behavior. Compiling and minifying happen at build time and deploying is an operations step; none of them describe what happens to a rendered component while the app is running."
      }
    ],
    correctAnswer: "A",
    explanation: "React tracks a component through four phases. Initialization sets up initial state and reads the props passed in. Mounting renders the component into the DOM and runs effects whose dependency array is empty. Updating re-renders the component whenever a prop it reads or a piece of state it owns changes. Unmounting removes the component from the tree and runs the cleanup functions returned from its effects.\n\nIn practice this means a `useEffect` with `[]` fires once after the first paint, and the function it returns fires only when the component is removed. Skipping that cleanup is the most common source of leaked intervals and subscriptions in a long-lived app.\n\nOne nuance an interviewer may probe: in development, React 18 Strict Mode mounts, unmounts, and remounts every component to surface missing cleanups, so your cleanup function must be safe to call twice.",
    interviewLine: "I walk through four phases: I initialize state and read props, mount by rendering into the DOM and running effects with empty dependencies, update whenever a prop or state I read changes, and unmount by running the cleanup functions my effects returned.",
    misconception: "Treating the component lifecycle as what happens to the source file (parse, compile, deploy) instead of what React does to a rendered component instance in the tree.",
    hints: [
      "Think about what React does between the moment you call `render(<MyComp />)` and the moment the element appears in the browser, then what happens when a prop changes and when you remove it.",
      "A `useEffect` with an empty dependency array runs once after the first render, and its return function runs when the component is removed. Which two phases do those correspond to?",
      "The phases describe a component instance in the React tree, not the JavaScript file or the build pipeline."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "The effect runs after mount and re-runs when `interval` changes (update phase); the cleanup clears the old timer on unmount or before the next effect run.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nfunction Timer({ interval }: { interval: number }) {\n  const [tick, setTick] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => setTick((t) => t + 1), interval);\n    return () => clearInterval(id);\n  }, [interval]);\n\n  return <span>Tick: {tick}</span>;\n}"
    }
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
        text: "HOCs compile the wrapped React components into native C++ machine instructions at build time.",
        isCorrect: false,
        explanation: "Tempting if you conflate a build-step transform such as Babel with runtime behavior, but an HOC is a JavaScript function that returns a component; no compiler or native code is involved."
      },
      {
        id: "B",
        text: "HOCs wrap components to share behavior (`withAuth(Component)`) but add nesting and obscure props; custom hooks are the flatter modern alternative.",
        isCorrect: true,
        explanation: "Correct. A HOC is a function that returns a new component wrapping the original, injecting behavior like auth checks or subscriptions. Custom hooks return the same logic without adding a tree layer, keeping props and refs transparent."
      },
      {
        id: "C",
        text: "HOCs can only run on a backend Node.js server and never inside a browser-side React tree.",
        isCorrect: false,
        explanation: "Tempting if you associate \"higher-order\" with server-side rendering, but a HOC is a plain function that works identically in the browser, on a Node server, or in a test runner; there is no runtime restriction."
      },
      {
        id: "D",
        text: "HOCs are mandatory wrappers that every React component must use under modern React 19 rules.",
        isCorrect: false,
        explanation: "Tempting if you read \"higher-order\" as a mandatory pattern, but React 19 imposes no requirement to wrap components; a plain function component with hooks covers every use case an HOC would."
      }
    ],
    correctAnswer: "B",
    explanation: "A higher-order component is a plain JavaScript function that accepts a component and returns a new component with added behavior. `withAuth(Component)` reads the auth context, checks the token, and renders either the wrapped component or a redirect. The wrapped component never knows it is inside a wrapper; it simply receives its props.\n\nIn practice, every HOC adds a layer to the component tree. Props from the outer HOC and the inner component merge, so debugging where a prop originated gets harder as wrappers stack. Refs do not pass through by default, requiring `React.forwardRef` or `useImperativeHandle` to bridge them.\n\nSince React 16.8, a custom hook like `useAuth()` returns the same data and logic without wrapping the component at all. The component calls the hook directly, the tree stays flat, and props remain transparent. HOCs still appear in legacy class-based codebases and in render-prop patterns, but for new code the hook is the default choice.",
    interviewLine: "A HOC is just a function that takes a component and returns a new one with injected behavior, so the real cost is the extra tree layer and prop merging. For new code I reach for a custom hook first because it gives me the same logic reuse without wrapping.",
    misconception: "Treating HOCs as a compiler or framework feature rather than a simple function-that-returns-a-function pattern, which obscures what they actually do at runtime and why hooks replaced most of their use cases.",
    hints: [
      "Think of a HOC as a function that takes a component and returns a new component \u2014 what does the returned component do differently from the original?",
      "Where does the extra behavior live, and what does the wrapped component actually see in its props object?",
      "A HOC adds a layer to the tree; ask whether a custom hook could return the same value without that layer."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A HOC wraps a component to inject auth, adding a layer to the tree; a custom hook achieves the same logic without wrapping.",
      language: "tsx",
      code: "import { createContext, useContext } from \"react\";\n\nconst AuthContext = createContext<{ token: string; user: { name: string } } | null>(null);\n\nfunction withAuth(Component: React.ComponentType<any>) {\n  return function Wrapped() {\n    const ctx = useContext(AuthContext);\n    if (!ctx) return null;\n    return <Component />;\n  };\n}\n\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be called inside <AuthProvider>\");\n  return ctx;\n}\n\nfunction Dashboard() {\n  const { user } = useAuth();\n  return <h1>Welcome, {user.name}</h1>;\n}\n\n// HOC approach: withAuth(Dashboard) adds a wrapper layer.\n// Hook approach: Dashboard uses useAuth directly, no wrapper."
    }
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
        text: "Directly mutating a child component's internal state from the parent to share data.",
        isCorrect: false,
        explanation: "Tempting if you picture components as nested objects you can reach into, but React components are opaque render units: the parent holds no reference to the child's state, and even a ref-based mutation would skip the render cycle and leave the displayed value stale."
      },
      {
        id: "B",
        text: "Components are fully isolated and have no mechanism to share data with one another.",
        isCorrect: false,
        explanation: "This would make React unable to build any interactive UI. Props, callbacks, Context, and state stores all exist precisely because components must coordinate; the question is which channel fits the scope."
      },
      {
        id: "C",
        text: "Parent to child via props, child to parent via callback functions, across distant components via Context or a state store, and across routes via URL parameters.",
        isCorrect: true,
        explanation: "Correct. These four patterns cover every scope of component communication in a React app while preserving unidirectional data flow."
      },
      {
        id: "D",
        text: "Firing an HTTP POST to a local server on every interaction so the target component can fetch the new value.",
        isCorrect: false,
        explanation: "Confuses in-memory component communication with client-to-server requests. Props and callbacks are plain function calls within the same JavaScript runtime; no network round-trip is involved."
      }
    ],
    correctAnswer: "C",
    explanation: "React enforces unidirectional data flow. A parent passes values down through props. A child sends data up by calling a function the parent passed as a prop. When components sit far apart in the tree, Context or a state store (Zustand, Redux) avoids threading the value through every intermediate component. When the data must survive a route change, the URL itself carries it as a query parameter or path segment.\n\nIn practice this means a button inside a deeply nested form field does not need to know about the form component. It calls `onSubmit`, which the form passed down. The form owns the state; the field merely reports the event. If you skip this pattern and try to mutate the parent's state from the child, you bypass React's render cycle and the UI stays stale until some unrelated re-render happens.\n\nOne nuance an interviewer will probe: every Context consumer re-renders when the context value's reference changes. If you store an object and recreate it on each render, all consumers re-render even if the field they read is unchanged. Splitting contexts or memoising the value keeps that re-render surface small.",
    interviewLine: "I pass data down through props, bubble events up with callback functions, reach for Context or a store when the tree is too deep for prop drilling, and rely on URL parameters when the data needs to survive a route change.",
    misconception: "Treating components like nested objects you can reach into and mutate directly, rather than as independent render units that exchange data only through props and the functions returned as callbacks.",
    hints: [
      "Think about direction: who sends, who receives, and where the data lives in the tree.",
      "Ask yourself: if a leaf component needs to change something the root owns, what does the root hand down?",
      "You do not need a network request or direct mutation; React already provides in-memory channels for every scope of communication."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "The leaf button calls `onAdd`, the middle component forwards it unchanged, and the grandparent's state updates without the leaf ever knowing the grandparent exists.",
      language: "tsx",
      code: "function Cart() {\n  const [items, setItems] = useState<string[]>([]);\n\n  return (\n    <div>\n      <p>{items.length} items</p>\n      <Shelf onAdd={(name: string) => setItems((prev) => [...prev, name])} />\n    </div>\n  );\n}\n\nfunction Shelf({ onAdd }: { onAdd: (name: string) => void }) {\n  return <ProductButton name=\"Widget\" onAdd={onAdd} />;\n}\n\nfunction ProductButton({ name, onAdd }: { name: string; onAdd: (n: string) => void }) {\n  return <button onClick={() => onAdd(name)}>Add {name}</button>;\n}"
    }
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
        text: "Whenever you build small UI primitives such as buttons, text inputs, or icons.",
        isCorrect: false,
        explanation: "UI primitives are best written as lightweight function components; nothing about a button or input requires a class."
      },
      {
        id: "B",
        text: "Default to function components; a class is only required for an Error Boundary (`componentDidCatch` / `getDerivedStateFromError`).",
        isCorrect: true,
        explanation: "Correct. Hooks enable function components to handle state, effects, and context; only Error Boundaries still require class lifecycle methods."
      },
      {
        id: "C",
        text: "Whenever a component needs to make asynchronous HTTP requests to fetch its data.",
        isCorrect: false,
        explanation: "Function components handle async fetches seamlessly in `useEffect`, a custom hook, or a Server Component; a class offers no advantage here."
      },
      {
        id: "D",
        text: "Whenever a component has to track more than two separate pieces of local state.",
        isCorrect: false,
        explanation: "Function components can call `useState` or `useReducer` as many times as needed; there is no limit that forces a class."
      }
    ],
    correctAnswer: "B",
    explanation: "Default to function components for every new component. Hooks give function components state (`useState`, `useReducer`), lifecycle-style effects (`useEffect`, `useLayoutEffect`), context, refs and memoization, so the historical reason to reach for a class is gone.\n\nThe one capability that still has no Hook equivalent is the error boundary: catching a render-time error from descendants needs a class that implements `componentDidCatch` or the static `getDerivedStateFromError`. Teams usually write one small boundary class and wrap the rest of the tree in it.\n\nThe nuance an interviewer probes is that this is a capability gap, not a style preference. You are not choosing classes because they are faster or cleaner; you are forced into one narrow place the Hooks API has never covered.",
    interviewLine: "I write function components by default and only drop to a class for an error boundary, since `getDerivedStateFromError` and `componentDidCatch` have no Hook equivalent.",
    misconception: "Thinking you still need classes for state or lifecycle work. Hooks replaced all of that; only error boundaries still require a class.",
    hints: [
      "List what Hooks already give a function component: state, effects, context, refs.",
      "Ask which single lifecycle responsibility still has no Hook at all.",
      "The gap is about catching render errors from children, not about styling or data fetching."
    ],
    example: {
      caption: "The one case that still needs a class: an error boundary wrapping function components.",
      language: "tsx",
      code: "class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {\n  state = { failed: false };\n  static getDerivedStateFromError() {\n    return { failed: true };\n  }\n  render() {\n    return this.state.failed ? <p>Something broke.</p> : this.props.children;\n  }\n}"
    },
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
        text: "React events only fire for physical mouse input and are ignored on touch or pointer devices.",
        isCorrect: false,
        explanation: "React events are synthetic wrappers around standard DOM events, which fire for mouse, touch, and pointer inputs alike. The framework does not filter events by input device type."
      },
      {
        id: "B",
        text: "React uses camelCase event names (`onClick`), passes function references instead of strings, and requires calling `e.preventDefault()` explicitly instead of `return false`.",
        isCorrect: true,
        explanation: "Correct. React standardizes event names to camelCase, expects function references rather than executable strings, and removes the `return false` shorthand, requiring explicit `event.preventDefault()` calls to block default browser behavior."
      },
      {
        id: "C",
        text: "HTML events execute on Web Workers while React events execute on the GPU compositor thread.",
        isCorrect: false,
        explanation: "Both HTML and React events execute on the main thread of the browser. Web Workers are separate threads for background tasks, and the GPU handles rendering, not event dispatch logic."
      },
      {
        id: "D",
        text: "React events must always be passed as string statements, for example `onClick='handleClick()'`, just like HTML attributes.",
        isCorrect: false,
        explanation: "Passing strings to React event props is invalid and will not execute as intended. React expects function references in curly braces, such as `onClick={handleClick}`, to avoid the security and scope issues associated with inline HTML strings."
      }
    ],
    correctAnswer: "B",
    explanation: "In HTML you write lowercase attributes with string values: `onclick=\"activateLasers()\"`. In React the same handler becomes a JSX prop with a function reference: `onClick={activateLasers}`. Three concrete differences follow from that shift. Event names use camelCase (`onClick`, `onSubmit`) instead of lowercase (`onclick`, `onsubmit`). The value is a function reference, not a string to be parsed and invoked, so you omit the parentheses. And the inline `return false` shorthand that HTML gives you for stopping a default action has no equivalent in React; you must call `event.preventDefault()` inside the handler.\n\nIn practice this means a copy-paste from an HTML snippet into JSX silently breaks. Writing `<a href=\"#\" onClick={() => { console.log(\"clicked\"); return false; }} />` logs the message but still navigates, because `return false` is just the return value of an arrow function. The default browser action (following the `href`) proceeds unless you call `event.preventDefault()` first.\n\nAn interviewer will often follow up by asking why `return false` in an inline HTML handler does two things at once (prevent default and stop propagation) while in React you need `event.preventDefault()` and `event.stopPropagation()` as separate calls. They may also ask where the listener lives: React 17 and later delegate all events to the root container rather than attaching one to every element.",
    interviewLine: "React switches from string-based HTML attributes to camelCase JSX props that hold function references, and the `return false` shortcut disappears, so I always call `event.preventDefault()` explicitly when I need to block a default browser action.",
    misconception: "The `return false` idiom from inline HTML handlers is assumed to carry over into JSX, so a developer writes it in a React event handler and expects the browser to suppress the default action.",
    hints: [
      "Compare the syntax of the two `<a>` elements in the code block: one uses a string, the other uses a function.",
      "Ask yourself what `return false` actually does inside an arrow function versus what it does inside an inline HTML attribute.",
      "The three differences are about naming, the type of value you pass, and how you stop the default action."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object",
    example: {
      caption: "Notice that `return false` inside the arrow function is just a return value and does not stop navigation; `event.preventDefault()` is what actually blocks the default action.",
      language: "tsx",
      code: "function Link({ label }: { label: string }) {\n  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {\n    console.log(label, \"clicked\");\n    event.preventDefault(); // actually stops the navigation\n  };\n\n  return (\n    <a href=\"#\" onClick={handleClick}>\n      {label}\n    </a>\n  );\n}\n\n// This would NOT prevent navigation:\n// const bad = () => { console.log(\"clicked\"); return false; };"
    }
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
        text: "React event handlers can only receive the event object; there is no way to pass an additional parameter like an id.",
        isCorrect: false,
        explanation: "Tempting if you read the docs and see the handler signature as `(e: MouseEvent) => void`, but the handler is just a function you supply; you can wrap it in any closure that captures extra values before calling it."
      },
      {
        id: "B",
        text: "Write `onClick={handleClick(id)}` so the parameter is already bound before React calls the handler.",
        isCorrect: false,
        explanation: "The parentheses execute `handleClick(id)` during render and hand React its return value, not a callable function. The button's click handler becomes `undefined`, and the side effect runs on every render instead of on click."
      },
      {
        id: "C",
        text: "Assign the parameter to a module-level variable before rendering and read it inside the handler.",
        isCorrect: false,
        explanation: "A module-level variable is shared across every component instance and every render, so two buttons with different ids would clobber each other. It also bypasses React's data flow, making the component impossible to test or reason about in isolation."
      },
      {
        id: "D",
        text: "Wrap the call in an inline arrow `() => handleClick(id)`, use `.bind(this, id)`, or define a curried handler that returns a function taking the event.",
        isCorrect: true,
        explanation: "Correct. Each approach creates a new function that captures the parameter in a closure; React stores that function as the `onClick` value and calls it only when the user clicks, passing the event object as the first argument to the inner call."
      }
    ],
    correctAnswer: "D",
    explanation: "React event handlers receive the event object as their first argument. To pass an additional value such as a ticket id, you create a new function that captures that value in a closure and calls the real handler when the event fires. The inline arrow `() => handleClick(id)` is the simplest form: React stores it as the `onClick` value, and only when the user clicks does it execute `handleClick(id)`.\n\nThe common mistake is writing `onClick={handleClick(id)}`. The parentheses execute the function during render, so React receives its return value (usually `undefined`) as the handler. The side effect fires on every render, and the button does nothing when clicked.\n\n`handleClick.bind(this, id)` and a curried handler that returns a function achieve the same result. All three approaches create a new function reference each render, which matters only if a child is wrapped in `React.memo` and compares the handler prop by identity; for a plain button it is a non-issue.",
    interviewLine: "I wrap the handler in an inline arrow so the parameter lives in a closure and is only used when the event fires, rather than executing the function during render and handing React its return value.",
    misconception: "Reading `onClick={handleClick(id)}` as \"prepare the call with this argument\" rather than \"execute the call now and pass the result to React.\" The parentheses are an invocation, not a binding.",
    hints: [
      "Look at what value React actually stores in the `onClick` prop: a function reference or the result of calling a function?",
      "Ask when the parentheses in `handleClick(id)` execute \u2014 during render or during the click \u2014 and what the expression evaluates to at that moment.",
      "The inline arrow defers the call: it captures `id` in a closure and only invokes `handleClick` when React passes the event object to it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "In a list, each button needs its own id; the inline arrow captures the correct value for that row without any global state.",
      language: "tsx",
      code: "function Ticket({ id, onClaim }: { id: string; onClaim: (id: string) => void }) {\n  return <button onClick={() => onClaim(id)}>Claim {id}</button>;\n}\n\nfunction TicketList({ tickets }: { tickets: string[] }) {\n  const handleClaim = (id: string) => {\n    console.log('Claiming ticket', id);\n  };\n\n  return (\n    <ul>\n      {tickets.map((id) => (\n        <Ticket key={id} id={id} onClaim={handleClaim} />\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Event objects that React serializes and forwards to a Node.js server for processing during server-side rendering, bypassing the browser entirely.",
        isCorrect: false,
        explanation: "Tempting if you conflate React Server Components or SSR rendering with client-side interactivity, but synthetic events are created in the browser when a user clicks, types, or hovers; they have no role on the server."
      },
      {
        id: "B",
        text: "A deprecated wrapper layer that React 18 removed entirely, so handlers now receive raw native DOM events with no normalization or abstraction.",
        isCorrect: false,
        explanation: "Tempting because React 17 removed event pooling, which made the wrapper feel redundant, but the SyntheticEvent class itself is still the object your onClick handler receives in React 18 and 19."
      },
      {
        id: "C",
        text: "Simulated event objects that testing libraries like Jest and Testing Library construct to mimic user interactions without a real browser.",
        isCorrect: false,
        explanation: "Tempting because the word 'synthetic' suggests 'artificial' or 'fake,' but these are the actual event objects delivered to every handler in production; only test libraries like Testing Library construct their own synthetic events for simulation."
      },
      {
        id: "D",
        text: "Cross-browser wrapper objects around native browser events that normalize event properties and methods across different browsers according to W3C specs.",
        isCorrect: true,
        explanation: "Correct. React's SyntheticEvent wraps the native DOM event so every handler sees one consistent API, and since React 17 the object is no longer pooled, so you can read its properties asynchronously."
      }
    ],
    correctAnswer: "D",
    explanation: "React wraps every native DOM event in a SyntheticEvent object before passing it to your handler. This object exposes the same API surface \u2014 preventDefault(), stopPropagation(), target, currentTarget, type \u2014 whether the event originated in Chrome, Firefox, Safari, or Edge. In practice you almost never need to reach for the raw event via e.nativeEvent.\n\nIn practice this means you write e.preventDefault() once and it behaves identically everywhere. You do not need feature-detection for older browser quirks like a missing returnValue property or a non-standard cancelBubble flag. Your handler code is browser-agnostic by construction.\n\nTwo details an interviewer may probe next: in React 17, event delegation moved from the document node to the root container, and event pooling was removed, so the SyntheticEvent object is no longer reused across renders \u2014 you can safely store it or read its properties after the handler returns.",
    interviewLine: "React hands me a SyntheticEvent wrapper instead of the raw DOM event, so I call preventDefault and stopPropagation once and get identical behaviour in Chrome, Safari, and Firefox without any browser sniffing.",
    misconception: "The word 'synthetic' reads as 'fake' or 'test-only,' so learners assume these events do not correspond to real user interactions or do not fire in production browsers.",
    hints: [
      "Look at the type of the argument your onClick or onChange handler actually receives \u2014 it is not the native Event.",
      "Ask why you can call e.preventDefault() without checking which browser the user is on.",
      "The word 'synthetic' here means 'wrapped and normalized,' not 'fake' or 'test-only.'"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object",
    example: {
      caption: "Notice the handler receives a React.SyntheticEvent, not a native Event, and the same method calls work in every browser.",
      language: "tsx",
      code: "function handleRowClick(e: React.SyntheticEvent<HTMLTableRowElement>) {\n  e.preventDefault();\n  e.stopPropagation();\n  console.log(e.currentTarget.dataset.id);\n}\n\nfunction OrderTable() {\n  return (\n    <table>\n      <tbody>\n        <tr data-id=\"42\" onClick={handleRowClick}>\n          <td>Widget</td>\n          <td>$9.99</td>\n        </tr>\n      </tbody>\n    </table>\n  );\n}"
    }
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
        text: "A compiler directive that instructs the build tool to emit multi-threaded WebAssembly output for the current module graph.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'forward' with build-tool or bundler directives, but ref forwarding is a React component API, not a compiler or bundler feature. No build system has a 'forward ref' directive for WebAssembly output."
      },
      {
        id: "B",
        text: "A network-layer utility that forwards inbound HTTP request packets from a client socket to an upstream proxy server.",
        isCorrect: false,
        explanation: "Plausible if you read 'forward' as a networking verb, but this is a React DOM concept about passing a reference down a component tree. It has no relationship to HTTP proxies, sockets, or packet routing."
      },
      {
        id: "C",
        text: "A browser History API call that advances the session forward to the next entry in the navigation stack.",
        isCorrect: false,
        explanation: "`history.forward()` does exist, but it navigates the browser session; it has nothing to do with React refs or component composition. Here 'forward' means passing a value one level down the tree, not advancing a navigation stack."
      },
      {
        id: "D",
        text: "A React technique (`React.forwardRef`) that lets a function component receive a `ref` and attach it to a child DOM node; in React 19, `ref` is a standard prop on function components.",
        isCorrect: true,
        explanation: "Correct. `React.forwardRef` (or, in React 19, a plain `ref` prop) lets a function component accept a `ref` from its parent and attach it to an inner DOM element, so the parent can reach that element directly."
      }
    ],
    correctAnswer: "D",
    explanation: "`React.forwardRef` wraps a function component so it can receive a `ref` prop and attach it to a child DOM node. The parent passes `ref={ref}` to the wrapper, the inner function receives it as its second argument, and assigns it to the `<button>`, `<input>`, or other element it renders. In React 19, function components accept `ref` as a regular prop, so `forwardRef` is no longer required but remains for backward compatibility.\n\nWithout forwarding, a `ref` placed on a function component is `null` because function components have no DOM node of their own. Forwarding is what lets a parent reach the real `<input>` inside a `<FormField>` wrapper and call `.focus()` or read `.value` directly.\n\nIn React 19 you can simply destructure `ref` from props and pass it to the target element. The `forwardRef` call still works and existing code does not break, but new components do not need it.",
    interviewLine: "I use a forward ref when a function component needs to take a `ref` from its parent and attach it to an inner DOM node; since React 19 that `ref` is just a regular prop, so I can skip `forwardRef`.",
    misconception: "Reading 'forward' in 'forward ref' the same way it appears in network forwarding or `history.forward()`, rather than as simply passing a value from a parent component down to a child element.",
    hints: [
      "Look at what the second argument of the wrapped function is and where it gets assigned inside the JSX.",
      "Ask yourself: why can't a plain function component accept `ref` the same way a `<div>` does?",
      "The word 'forward' here means passing a value one level down the component tree, not network or navigation forwarding."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "In React 19, `ref` is a standard prop on function components, so you can destructure it directly from props without `forwardRef`.",
      language: "tsx",
      code: "import { useRef } from 'react';\n\nfunction Input({ label, ref }: { label: string; ref?: React.Ref<HTMLInputElement> }) {\n  return (\n    <label>\n      {label}\n      <input ref={ref} />\n    </label>\n  );\n}\n\nfunction SearchForm() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  return (\n    <form>\n      <Input label=\"Query\" ref={inputRef} />\n      <button onClick={() => inputRef.current?.focus()}>Focus</button>\n    </form>\n  );\n}"
    }
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
        text: "Callback refs were removed in React 16 in favor of string refs, so `findDOMNode()` is the standard way to get a node.",
        isCorrect: false,
        explanation: "Tempting if you remember the React 16 ref cleanup but reverse the direction. String refs were removed in React 16; callback refs and `createRef`/`useRef` are the surviving, fully supported APIs."
      },
      {
        id: "B",
        text: "`findDOMNode()` is preferred because it gives the parent direct access to the child's DOM without extra API surface.",
        isCorrect: false,
        explanation: "This frames convenience as a reason to prefer an API. `findDOMNode()` does reach into the child's rendered output, but that is exactly the problem \u2014 it bypasses the component boundary and is deprecated, so less API surface is not a valid reason to prefer it."
      },
      {
        id: "C",
        text: "Callback refs and `createRef`/`useRef` are preferred; `findDOMNode()` is deprecated and incompatible with concurrent rendering.",
        isCorrect: true,
        explanation: "Correct. `findDOMNode()` bypasses the component boundary and assumes a stable DOM tree, both of which conflict with concurrent rendering; explicit refs keep the node reference owned by the component that renders it."
      },
      {
        id: "D",
        text: "Both APIs are functionally equivalent and use the same internal fiber lookup, so either is fine.",
        isCorrect: false,
        explanation: "They solve the same surface problem (get a DOM node) through different mechanisms. A ref is assigned during render by the component itself; `findDOMNode` is a post-render lookup that walks the fiber tree, so they differ in timing, ownership, and compatibility with concurrent features."
      }
    ],
    correctAnswer: "C",
    explanation: "Callback refs and `createRef`/`useRef` are the preferred way to access a DOM node. `findDOMNode()` is deprecated because it reaches into a class component's rendered output without the component explicitly opting in, which breaks the component boundary. In React 18 and 19, concurrent features like `useTransition` and Suspense can leave the DOM tree in an intermediate state, and `findDOMNode()` assumes a single, stable tree, so it cannot be used safely in that context.\n\nIn practice this means a parent that needs to scroll a child into view should receive a ref from the child (via `forwardRef` or a `ref` prop on a function component) rather than calling `findDOMNode(child)`. The child decides which node to expose, so the parent never has to know the internal structure. This keeps rendering interruptible and lets React reorder or discard work without the parent holding a stale node reference.\n\nThe nuance an interviewer will probe: in React 19 `findDOMNode` is still exported and compiles without error, so legacy codebases keep working, but any new code should treat it as removed. The migration path is always the same \u2014 the component that owns the node exposes it explicitly.",
    interviewLine: "I'd use a callback ref or `createRef` because `findDOMNode` reaches past the component boundary and is incompatible with concurrent rendering \u2014 if a parent needs a node, the child should expose it explicitly through a ref.",
    misconception: "`findDOMNode()` is just a convenience shortcut for the same ref you would set manually, so either approach is interchangeable. In reality it bypasses the component boundary and assumes a non-concurrent, stable DOM tree, which is exactly what modern React no longer guarantees.",
    hints: [
      "Look at what each API actually returns and who assigns the value.",
      "Ask whether the API respects the component boundary and whether it works when React can interrupt rendering.",
      "Remember which ref style was removed in React 16, not which one survived."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "A function component exposes its node via `forwardRef` so the parent can call `scrollIntoView` without `findDOMNode`.",
      language: "tsx",
      code: "import { forwardRef, useRef, useEffect } from \"react\";\n\nconst Scroller = forwardRef<HTMLDivElement, { label: string }>(\n  ({ label }, ref) => {\n    const inner = useRef<HTMLDivElement>(null);\n    useEffect(() => {\n      inner.current?.scrollIntoView({ behavior: \"smooth\" });\n    }, [label]);\n    return <div ref={ref}>{label}</div>;\n  }\n);\nScroller.displayName = \"Scroller\";\n\nexport default function App() {\n  const target = useRef<HTMLDivElement>(null);\n  return (\n    <div>\n      <button onClick={() => target.current?.scrollIntoView()}>Jump</button>\n      <Scroller ref={target} label=\"Section\" />\n    </div>\n  );\n}"
    }
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
        explanation: "Correct. React 15 exposed no stable error boundary API; the experimental `unstable_handleError` was the only hook into the render-error path, and React 16 replaced it with the documented `componentDidCatch` and `getDerivedStateFromError` pair."
      },
      {
        id: "B",
        text: "React 15 handled render errors through a dedicated `useErrorBoundary` hook in each component.",
        isCorrect: false,
        explanation: "Tempting if you associate error handling with hooks, but hooks did not exist until React 16.8 (February 2019), so no hook-based API could have existed in React 15. Error boundaries remain class-component-only to this day."
      },
      {
        id: "C",
        text: "React 15 prevented all errors by automatically detecting and repairing syntax bugs at runtime.",
        isCorrect: false,
        explanation: "This conflates the bundler or a linter with the runtime. React executes the code you pass to it; it never rewrites or repairs source. In 15, an uncaught render error simply unmounted the affected tree."
      },
      {
        id: "D",
        text: "Render errors in React 15 could only be recovered from by restarting the Node web server.",
        isCorrect: false,
        explanation: "Mixes up server-side and client-side execution. A render error in the browser is handled (or not) by the JS runtime and the component tree; restarting the Node.js process has no effect on already-loaded client code."
      }
    ],
    correctAnswer: "A",
    explanation: "React 15 shipped no stable error boundary API. The only path into the render-error lifecycle was the experimental `unstable_handleError` method, an internal hook that React exposed without a compatibility guarantee. React 16 replaced it with the documented `componentDidCatch` instance method and the static `getDerivedStateFromError`, which together form the API used today.\n\nIn practice this meant that in React 15 a component throwing during `render` would unmount the entire tree above it. There was no way to display a fallback UI, log a component stack, or keep sibling branches alive. Teams that wanted that behaviour had to wrap subtrees in a `try/catch` around `ReactDOM.render` or accept a blank screen.\n\nThe `unstable_` prefix was React's convention for an API that could change shape in any subsequent release. Code that called `unstable_handleError` in a 15.x app had to be rewritten when 16 landed, because the method name, signature, and the state-update contract all changed.",
    interviewLine: "I'd note that React 15 had no stable API for catching render errors; the only path was the experimental `unstable_handleError` internal method. React 16 replaced it with `componentDidCatch` and `getDerivedStateFromError`, which is the API I reach for today.",
    misconception: "Treating error boundaries as a React 16 invention with no prior mechanism, or assuming they work like a global `try/catch` that wraps the entire application bundle rather than a per-subtree class-component API.",
    hints: [
      "Check when the first stable error boundary API (`componentDidCatch`) shipped relative to the React 15 release.",
      "What prefix did React use for experimental APIs before they were stabilised, and what did that prefix guarantee about the method's shape?",
      "Hooks and server restarts operate outside the browser render path, so neither can intercept a component-level throw."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    example: {
      caption: "This is the React 16+ stable API that replaced the React 15 experimental method; note it is a class component, not a hook.",
      language: "tsx",
      code: "import { Component, ReactNode } from \"react\";\n\nclass Boundary extends Component<{ children: ReactNode }, { hasError: boolean }> {\n  state = { hasError: false };\n\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error: Error) {\n    console.error(error);\n  }\n\n  render() {\n    return this.state.hasError\n      ? <p>Something went wrong.</p>\n      : this.props.children;\n  }\n}"
    }
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
        text: "Decorators are a JavaScript syntax feature that Babel rewrites at compile time; they have no role in producing Java bytecode or targeting Android.",
        isCorrect: false,
        explanation: "Decorators are a compile-time syntax transformation in JavaScript. They never invoke a Java compiler, emit bytecode, or interact with the Android toolchain in any way."
      },
      {
        id: "B",
        text: "Decorators annotate how a class or method is defined; they do not generate CSS, set borders, or affect any visual property of a rendered element.",
        isCorrect: false,
        explanation: "Decorators modify the definition of a class or method at transpile time. They produce no CSS output and cannot style borders, gradients, or any other visual property."
      },
      {
        id: "C",
        text: "Decorators are a language-level proposal for annotating classes and methods in JavaScript; they are not HTML tags and have no required placement around elements like `<div>`.",
        isCorrect: false,
        explanation: "Decorators live in the JavaScript/TypeScript source and are stripped by the transpiler before any HTML is produced. They are not elements, do not appear in the DOM, and carry no tag semantics."
      },
      {
        id: "D",
        text: "Decorators (e.g. `@withRouter`, `@connect`) were an experimental class syntax enabled via Babel plugins for wrapping classes; modern React favors custom hooks over decorators.",
        isCorrect: true,
        explanation: "Correct. Decorators are syntactic sugar over a function call, enabled by Babel's legacy decorator plugin, used to wrap class components with extra behaviour. Modern React composes that same logic with custom hooks and functional components."
      }
    ],
    correctAnswer: "D",
    explanation: "D is correct. A decorator like `@setTitle('Profile')` is syntactic sugar that Babel's legacy `@babel/plugin-proposal-decorators` rewrites into a plain function call: `Profile = setTitle('Profile')(Profile)`. The class is wrapped in a new component that injects behaviour (here, setting `document.title` in `componentDidMount`) without the original class body changing.\n\nIn real codebases this pattern appeared with MobX (`@observer`, `@autoBind`) and legacy Redux (`@connect`). The wrapped class gains lifecycle hooks or prop injection transparently. Because the mechanism is a compile-time transform, the decorator keyword itself is not a React API; React never sees it.\n\nOne nuance an interviewer will probe: the legacy Stage 1/2 decorators that Babel's `legacy: true` mode implemented are not the same as the Stage 3 standard that TypeScript 5.0 and Babel 7.21+ ship. The new standard uses `static init()` blocks and different semantics, so a codebase compiled with `legacy: true` does not migrate automatically. Modern React sidesteps both by composing logic with custom hooks instead of wrapping classes.",
    interviewLine: "I read a decorator like `@setTitle` as just `Profile = setTitle('Profile')(Profile)` after Babel transforms it, wrapping the class in a new component that injects behaviour. I dropped them once hooks let me compose that same logic without a class wrapper.",
    misconception: "Treating `@decorator` as a runtime React API or a CSS/HTML feature rather than a compile-time transform that Babel rewrites into `Component = decorator()(Component)` before React ever loads the module.",
    hints: [
      "Look at what `@setTitle('Profile')` does to the class below it: it receives the class and returns a new one.",
      "Ask whether this is a runtime React API or a compile-time transformation that a transpiler handles before React loads the module.",
      "The pattern is identical to calling `const Wrapped = setTitle('Profile')(Profile)` \u2014 the `@` keyword adds no runtime behaviour of its own."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The same title-setting wrapper expressed as a plain HOC with a function component and `useEffect`, showing that the decorator was only shorthand for this call.",
      language: "tsx",
      code: "function withTitle(title: string) {\n  return function (Wrapped: React.ComponentType) {\n    function WithTitle(props: React.PropsWithChildren) {\n      React.useEffect(() => {\n        document.title = title;\n      }, [title]);\n      return <Wrapped {...props} />;\n    }\n    WithTitle.displayName = `WithTitle(${Wrapped.name})`;\n    return WithTitle;\n  };\n}\n\nconst Profile = withTitle('Profile')(ProfileComponent);"
    }
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
        text: "Hooks broke render props and removed them from JavaScript.",
        isCorrect: false,
        explanation: "Tempting if you read 'replace' as 'break and delete.' Render props are a React composition pattern, not a JavaScript feature, so no language change removes them. They still work exactly as before; Hooks simply make them unnecessary for most logic-sharing tasks."
      },
      {
        id: "B",
        text: "Hooks only replace CSS stylesheets, not component patterns.",
        isCorrect: false,
        explanation: "This confuses Hooks with CSS-in-JS libraries like styled-components. Hooks manage state, effects, and context inside components; they have no role in styling or in replacing component composition patterns like HOCs and render props."
      },
      {
        id: "C",
        text: "No, Hooks can only be used inside render props.",
        isCorrect: false,
        explanation: "This inverts the relationship. Hooks are called at the top level of any functional component, independent of whether a render prop is present. Render props are a way to pass a function as a prop; they do not gate or enable hook usage."
      },
      {
        id: "D",
        text: "Yes, custom hooks share stateful logic without wrapper nesting.",
        isCorrect: true,
        explanation: "Correct. A custom hook is a function call that returns state and handlers, so the consumer gets reusable logic without an extra component (HOC) or a callback prop (render prop) in the tree."
      }
    ],
    correctAnswer: "D",
    explanation: "Custom hooks are plain functions that call other hooks (useState, useEffect, useRef) and return values. They let you extract and reuse stateful logic by simply calling the function at the top of a component, with no extra component in the tree and no function passed as a prop.\n\nWith an HOC you wrap the target component, adding a layer in devtools and complicating key propagation. With a render prop you pass a function down and the parent calls it, inverting who renders what. A custom hook avoids both: the consumer writes `const [value, setValue] = useLocalStorage('theme')` and gets the same logic without any wrapper or callback.\n\nThe qualifier 'in most cases' is deliberate. HOCs remain useful when you need to render an extra wrapper element or attach a static property to a component. Render props still shine when the parent must hand off a render function for conditional or layout-dependent output. For the dominant use case \u2014 sharing stateful logic between components \u2014 the hook call is the simplest option.",
    interviewLine: "Custom hooks let me pull stateful logic into a plain function call, so I skip the wrapper component an HOC would add to the tree and the function-prop indirection of a render prop \u2014 I just call the hook and get my state back.",
    misconception: "Treating 'replace' as 'break and remove,' when in fact render props and HOCs still work in every React version \u2014 Hooks simply make them unnecessary for the most common job, which is sharing stateful logic between components.",
    hints: [
      "Look at what each pattern adds to the component tree: a wrapper component, a function prop, or just a function call.",
      "Ask whether the pattern introduces an extra component between parent and child in React DevTools.",
      "The qualifier 'in most cases' matters \u2014 think about what a render prop or HOC can still do that a hook call cannot."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the consumer calls `useLocalStorage` like any function \u2014 no wrapper component, no render-prop callback \u2014 yet the hook encapsulates both state and a side effect.",
      language: "typescript",
      code: "function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {\n  const [value, setValue] = useState<T>(() => {\n    const stored = window.localStorage.getItem(key);\n    return stored ? (JSON.parse(stored) as T) : initial;\n  });\n\n  useEffect(() => {\n    window.localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}\n\n// Consumer \u2014 one call, no wrapper, no render prop\nconst [theme, setTheme] = useLocalStorage('theme', 'dark');"
    }
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
        text: "Name the component with a PascalCase class or function identifier rather than a `displayName` prop.",
        isCorrect: true,
        explanation: "Correct. A PascalCase class or function identifier is the name React DevTools, linters, and stack traces read automatically, so no separate `displayName` prop is required for the component itself."
      },
      {
        id: "B",
        text: "Assign a random 10-digit number as the component name to guarantee uniqueness across the render tree.",
        isCorrect: false,
        explanation: "Tempting if you conflate a component name with a generated key or internal ID, but React has no numeric-naming convention; identifiers must be readable PascalCase strings that appear in DevTools and stack traces."
      },
      {
        id: "C",
        text: "Write component names in lowercase with hyphens, following the convention used for HTML custom elements.",
        isCorrect: false,
        explanation: "Tempting if you think of HTML custom-element syntax or CSS class names, but lowercase-with-hyphens is how the browser recognises native tags; React requires PascalCase to distinguish a component from an HTML element."
      },
      {
        id: "D",
        text: "Prefix every component identifier with a reserved internal marker like `__REACT_COMPONENT_PRIVATE__`.",
        isCorrect: false,
        explanation: "Tempting if you have seen React's internal double-underscore properties and assume components need a special marker, but no such prefix convention exists; the PascalCase identifier itself is the full name."
      }
    ],
    correctAnswer: "A",
    explanation: "The recommended approach is to give the component a PascalCase identifier: a named class like `class TodoApp extends Component` or a named function like `function TodoApp()`. The `displayName` pattern comes from the deprecated `React.createClass` API and from anonymous function components; when the class or function already carries a name, adding a separate `displayName` prop is redundant.\n\nIn practice, that identifier is what React DevTools, stack traces, error boundaries, and the `eslint-plugin-react` rules read. A component named `UserProfile` appears as `UserProfile` in the DevTools tree and in any `console.error` output from a render failure. An anonymous function assigned to a variable (`const UserProfile = () => \u2026`) can lose its name in minified production builds, which is the narrow case where `displayName` still helps.\n\nThe nuance an interviewer will probe: `displayName` remains useful inside a higher-order component or after `React.memo` wrapping, where the generated name (e.g. `Memoized(UserProfile)`) may be less readable than a hand-written label. For the component itself, though, the identifier is the name and no extra prop is needed.",
    interviewLine: "I name components with PascalCase function or class identifiers so DevTools and stack traces pick up the name for free; I only set `displayName` when a HOC or `React.memo` wrapper produces a less readable generated name.",
    misconception: "Carrying the `displayName` pattern forward from the deprecated `React.createClass` era and treating it as the primary way to name a component, rather than recognising that the class or function identifier already is the name.",
    hints: [
      "Look at what React DevTools and production stack traces actually read when they need to display a component name.",
      "Ask whether the class or function identifier already carries the name, making an extra prop redundant.",
      "The `displayName` pattern was needed by an API that is no longer current; check whether that API is still in use before reaching for it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that neither component needs a `displayName` prop \u2014 the function identifier is the name DevTools and error messages will show.",
      language: "tsx",
      code: "function UserProfile({ name }: { name: string }) {\n  return <h1>{name}</h1>;\n}\n\n// DevTools tree shows \"UserProfile\" \u2014 no displayName needed.\n\nfunction WithTracking(\n  Component: React.ComponentType<{ name: string }>\n) {\n  function Tracked(props: { name: string }) {\n    return (\n      <div data-tracked=\"true\">\n        <Component {...props} />\n      </div>\n    );\n  }\n  Tracked.displayName = `withTracking(${Component.displayName ?? \"Anonymous\"})`;\n  return Tracked;\n}\n\nconst TrackedProfile = WithTracking(UserProfile);\n// DevTools shows \"withTracking(UserProfile)\" \u2014 displayName helps here."
    }
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
        explanation: "Tempting if you memorised the uppercase rule as absolute, but the JSX spec explicitly carves out member-expression tags. The dot in `<obj.component />` is the standard, documented exception that lets a lowercase name compile to a component reference."
      },
      {
        id: "B",
        text: "Components named after CSS color names can start with numbers.",
        isCorrect: false,
        explanation: "This conflates CSS custom-property naming with JSX tag parsing. JavaScript identifiers cannot begin with a digit, and CSS colour names have no bearing on whether the JSX transpiler treats a tag as a string or a reference."
      },
      {
        id: "C",
        text: "Components rendered inside `<iframe>` tags must be written in all lowercase.",
        isCorrect: false,
        explanation: "An `<iframe>` loads a separate document; it does not change how the parent page's JSX is parsed. The uppercase-or-dot rule is applied by the transpiler before any rendering context is known, so the host element is irrelevant."
      },
      {
        id: "D",
        text: "Lowercase tag names with a dot accessor (e.g. `<obj.component />`) compile as component references.",
        isCorrect: true,
        explanation: "Correct. The JSX parser sees the dot and emits a member-expression call to `React.createElement`, bypassing the uppercase-first-character check entirely. The property name's case is irrelevant to the transpiler."
      }
    ],
    correctAnswer: "D",
    explanation: "React's JSX parser decides whether a tag is an HTML element or a component reference by checking two things: does the tag name contain a dot, and if not, does it start with an uppercase letter. A dot anywhere in the tag name \u2014 `<obj.component />`, `<components.button />` \u2014 forces the parser to treat it as a member expression, which compiles to `React.createElement(obj.component)` rather than the string `\"obj.component\"`. The first character's case is irrelevant once a dot is present.\n\nIn practice this lets you store components in plain objects or namespaces and render them with lowercase property names. A common pattern is a design-system namespace: `import * as ui from \"./ui\"` followed by `<ui.button />` and `<ui.card />` in markup. The transpiler resolves the dot path at compile time; React never receives a string tag name.\n\nThe nuance an interviewer may probe: the dot must appear in the JSX tag itself. Writing `<obj>.component` or building the tag name dynamically with a template string does not trigger this path \u2014 those are syntax errors or runtime lookups, not the parser-level exception. The rule is a syntactic one enforced by Babel, TypeScript, or the JSX transform, not a runtime check inside React.",
    interviewLine: "I remember that the JSX parser uses a dot in the tag name to tell a string tag from a member expression, so `<obj.component />` compiles to `React.createElement(obj.component)` regardless of the property's case \u2014 a compile-time syntactic rule I rely on, not a runtime one.",
    misconception: "The uppercase rule is often assumed to be a runtime check inside React, so a learner expects that any lowercase name fails at render time. In reality the decision is made by the JSX transpiler (Babel, TypeScript, the automatic runtime) purely from the tag's syntax before React ever executes.",
    hints: [
      "Look at how the JSX transpiler decides between a string tag name and a component reference.",
      "What single character in the tag name tells the parser to emit a member-expression call instead of a string argument to `createElement`?",
      "The rule is about the tag's syntax at parse time, not about where the component ultimately renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A namespace import gives you the same dot-notation exception without a manually built object.",
      language: "tsx",
      code: "import * as ui from \"./ui\";\n\nfunction Page() {\n  return (\n    <div>\n      <ui.button label=\"Save\" />\n      <ui.card title=\"Q3 Report\" />\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you read the broken snippets and conclude that attributes are purely static, but `src={props.img}` is the standard way to pass a dynamic prop into an attribute. The restriction is on interpolation inside quotes, not on using props at all."
      },
      {
        id: "B",
        text: "Use PHP tags `<img src='images/<?php echo this.props.image; ?>' />`.",
        isCorrect: false,
        explanation: "PHP is a server-side scripting language with no runtime in the browser or in JSX. The `<?php ... ?>` syntax is meaningless to the JSX compiler and will either throw a parse error or be treated as literal text."
      },
      {
        id: "C",
        text: "JSX does not interpolate `{expr}` inside quotes; use curly braces with a template literal or concatenation.",
        isCorrect: true,
        explanation: "Correct. Quoted attribute values in JSX are static strings, so `{...}` inside them is never evaluated. Wrapping the entire value in curly braces makes it a JS expression, where template literals and concatenation both work."
      },
      {
        id: "D",
        text: "Use double curly braces inside quotes `<img src='images/{{props.image}}' />`.",
        isCorrect: false,
        explanation: "The belief is that doubling the braces signals an interpolation to the JSX parser, but inside a quoted string the parser sees no special syntax at all. `{{props.image}}` renders as the six literal characters `{{props.image}}` in the output."
      }
    ],
    correctAnswer: "C",
    explanation: "In JSX, an attribute value wrapped in quotes is a plain string literal. Curly braces inside that string are not evaluated; they render as the two characters `{` and `}`. So `src=\"images/{props.img}\"` produces the literal text `images/{props.img}` in the DOM. To embed a dynamic value, the entire attribute value must be a JavaScript expression in curly braces: `src={`images/${props.img}`}` or `src={'images/' + props.img}`.\n\nIn real code you often need a static prefix or suffix around a dynamic value, like a file-path segment. The template-literal form is the idiomatic choice because it reads like the final string and scales to multiple interpolated parts without a chain of `+` operators.\n\nThe distinction an interviewer probes next: curly braces outside quotes are JSX syntax that tells React to evaluate a JS expression; curly braces inside quotes are just two characters in a string. If the whole value is dynamic with no static parts, you skip the template literal entirely and write `src={props.img}`.",
    interviewLine: "In JSX, quoted attribute values are plain strings, so I never interpolate `{expr}` inside them. For a mixed value like a path prefix I wrap the whole value in curly braces and use a template literal: `src={`images/${props.img}`}`.",
    misconception: "Treating JSX attribute quotes like a template engine where `{variable}` is interpolated. In JSX, quotes mean a static string with no evaluation, and curly braces mean \"evaluate this JS expression\"; the two never combine.",
    hints: [
      "Look at where the curly braces sit relative to the quotes in each snippet.",
      "Ask yourself: does JSX evaluate an expression when the curly braces are inside a quoted string, or only when they wrap the entire attribute value?",
      "The curly braces that make JSX work are the ones outside the quotes, not the ones inside them."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the template literal lives inside the outer curly braces that make the whole className a JS expression, not inside the quotes.",
      language: "tsx",
      code: "function UserBadge({ user }: { user: { name: string; role: string } }) {\n  return (\n    <span className={`badge badge-${user.role}`}>\n      {user.name}\n    </span>\n  );\n}"
    }
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
        text: "Use a `class-if` directive inside the element, the way some server-side templating engines let you branch on attributes.",
        isCorrect: false,
        explanation: "React has no `class-if` or similar directive attribute. Class logic lives in the JavaScript expression you pass to `className`; the framework does not parse special keywords out of the string."
      },
      {
        id: "B",
        text: "Request the server to swap in a different CSS file whenever the condition changes, then reload the stylesheet so the new class rules apply.",
        isCorrect: false,
        explanation: "Tempting if you picture classes as living in a stylesheet you must fetch, but toggling a class is a purely client-side string change on the element's `className` prop. No network round-trip or stylesheet reload is involved."
      },
      {
        id: "C",
        text: "Use a template literal, string concatenation, or a helper like `clsx` inside the curly braces of `className` to build the final string.",
        isCorrect: true,
        explanation: "Correct. The value of `className` must be a JavaScript expression that evaluates to a string; template literals, `+` concatenation, and libraries like `clsx` are all valid ways to compute that string conditionally."
      },
      {
        id: "D",
        text: "Write the ternary operator directly inside the double-quoted string, e.g. `className=\"btn {isActive ? 'a' : 'b'}\"`, and let the browser resolve it.",
        isCorrect: false,
        explanation: "This reads as if JSX interpolates expressions inside quoted strings, but it does not. Everything between the quotes is a literal string; the curly braces and ternary become part of the class-name text and match no CSS selector."
      }
    ],
    correctAnswer: "C",
    explanation: "In JSX, an attribute value is either a plain string (wrapped in quotes) or a JavaScript expression (wrapped in curly braces). To build a class name conditionally you need a JavaScript expression: a template literal like `className={`btn ${isActive ? 'active' : ''}`}`, string concatenation like `className={'btn ' + (isActive ? 'active' : '')}`, or a helper such as `clsx('btn', isActive && 'active')`. All three evaluate to a single string before React sets the `class` attribute on the DOM node.\n\nPutting a ternary inside the quoted string, as in `className=\"btn {isActive ? 'a' : 'b'}\"`, does not execute JavaScript. The browser receives the literal text `btn {isActive ? 'a' : 'b'}` as the class name, which matches no CSS rule and silently breaks styling. The fix is to move the expression outside the quotes and into its own pair of curly braces so the JSX compiler treats it as a JS expression.\n\nA practical nuance: when several conditions contribute classes, a template literal can accumulate trailing or double spaces (`\"btn  active\"`), which is harmless in CSS but noisy in DevTools. Libraries like `clsx` or `classnames` filter out falsy values and join with a single space, removing the need for manual `.filter(Boolean).join(' ')` boilerplate.",
    interviewLine: "In JSX the `className` prop is just a string, so I compute it with a template literal or `clsx` inside curly braces; putting a ternary inside the quoted string would ship the braces as literal text to the DOM.",
    misconception: "Treating a JSX attribute string like a template-engine placeholder where you embed `{expression}` inside the quotes, instead of recognising that the entire value must be a JavaScript expression wrapped in its own pair of curly braces.",
    hints: [
      "Look at what sits between the quotes versus what sits between the curly braces in each line of the example.",
      "In JSX, is the attribute value a string literal or a JavaScript expression, and which one actually executes code?",
      "The curly braces in the first example are characters inside the string, not the delimiters that tell the compiler to evaluate an expression."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    example: {
      caption: "Notice how each conditional class is an array element; `filter(Boolean)` drops the empty string so the joined result has no double spaces.",
      language: "tsx",
      code: "function Badge({ status, size }: { status: 'ok' | 'warn' | 'err'; size: 'sm' | 'lg' }) {\n  const cls = [\n    'badge',\n    `badge--${status}`,\n    size === 'lg' ? 'badge--lg' : '',\n  ]\n    .filter(Boolean)\n    .join(' ');\n  return <span className={cls}>{status.toUpperCase()}</span>;\n}"
    }
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
        text: "Call `alert(JSON.stringify(data))` inside the render method to show the JSON in a browser dialog.",
        isCorrect: false,
        explanation: "Tempting if you want to see the data quickly, but `alert` blocks the main thread, is not part of the React component tree, and gives you no control over formatting, styling, or accessibility. It also fires on every render, which means the dialog reappears each time the component updates."
      },
      {
        id: "B",
        text: "Wrap the output of `JSON.stringify(data, null, 2)` inside a `<pre>` element: `<pre>{JSON.stringify(data, null, 2)}</pre>`.",
        isCorrect: true,
        explanation: "Correct. `JSON.stringify(data, null, 2)` produces a multi-line, indented string, and the `<pre>` element preserves the whitespace and newlines so the browser renders the JSON with its formatting intact."
      },
      {
        id: "C",
        text: "JSON objects cannot be rendered in a React application because React only accepts primitive strings as children.",
        isCorrect: false,
        explanation: "This confuses a JSON object with a JSON string. React renders any string child just fine; you simply need to serialise the object first with `JSON.stringify`. The limitation is not React's \u2014 it is that a raw object is not a valid child, which `JSON.stringify` resolves."
      },
      {
        id: "D",
        text: "Call `document.write(JSON.stringify(data))` inside the JSX return to inject the JSON directly into the page.",
        isCorrect: false,
        explanation: "Tempting if you reach for a DOM API you remember from earlier JavaScript, but `document.write` replaces the entire document, destroying the React root and every mounted component. It also has no concept of whitespace preservation, so the output would be a single unformatted line."
      }
    ],
    correctAnswer: "B",
    explanation: "The correct approach is to call `JSON.stringify(data, null, 2)`, which returns a multi-line string with two-space indentation, and render that string inside a `<pre>` element. The `<pre>` tag tells the browser to preserve every whitespace character and newline in its content, so the indentation and line breaks survive rendering. Other inline and block elements collapse consecutive whitespace into a single space by default, which would flatten the output into one long line.\n\nWithout `<pre>`, the newlines and spaces produced by the stringify call are collapsed by the browser's normal whitespace handling, and the JSON appears as a single unreadable run of text. With `<pre>`, each key sits on its own line, nested objects are indented, and the structure is immediately scannable. This is the same pattern you see in React DevTools, Next.js error overlays, and any in-app debug panel.\n\nThe second argument to `JSON.stringify` can also be a replacer function for filtering or transforming keys, but for pretty-printing the two-space indentation argument is all you need. For richer display such as syntax highlighting or collapsible nodes you would reach for a library, but `<pre>` with `JSON.stringify` is the idiomatic, dependency-free answer.",
    interviewLine: "I serialise the object with `JSON.stringify` and pass `null` plus an indentation number as the second and third arguments to get a multi-line string, then render it inside a `<pre>` element so the browser keeps the whitespace and line breaks intact.",
    misconception: "Assuming that any HTML element will preserve the newlines and spaces inside a string, when in fact only `<pre>` (and a few other elements) opt out of the browser's default whitespace-collapsing behaviour.",
    hints: [
      "What does `JSON.stringify(data, null, 2)` actually return, and what does the browser do with newlines in a plain `<div>`?",
      "Which single HTML element tells the browser to skip its default whitespace collapsing?",
      "The answer is about how the browser renders whitespace, not about React state, effects, or data fetching."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the same string looks collapsed inside a `<div>` but formatted inside a `<pre>`.",
      language: "tsx",
      code: "function JsonPreview({ value }: { value: unknown }) {\n  const formatted = JSON.stringify(value, null, 2);\n\n  return (\n    <div>\n      <p>Inside a div (whitespace collapsed):</p>\n      <div>{formatted}</div>\n\n      <p>Inside a pre (whitespace preserved):</p>\n      <pre>{formatted}</pre>\n    </div>\n  );\n}"
    }
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
        text: "Because the browser encrypts every prop with AES-256, making the value physically unwritable.",
        isCorrect: false,
        explanation: "Props are plain JavaScript objects (or primitives) passed as function arguments. There is no encryption layer, no browser API involved, and no security boundary between parent and child within the same process."
      },
      {
        id: "B",
        text: "Props actually can be mutated directly, as long as the component is written in TypeScript.",
        isCorrect: false,
        explanation: "Tempting if you conflate the type system with runtime behaviour, but TypeScript erases all type information before execution. A `readonly` modifier prevents accidental mutation at compile time; it adds no runtime guard, and plain JavaScript has none either."
      },
      {
        id: "C",
        text: "React enforces strict unidirectional data flow and pure functions; props are owned by the parent and must be treated as immutable read-only inputs by the child.",
        isCorrect: true,
        explanation: "Correct. The rendering model treats components as pure functions of their inputs. The parent owns the data, the child reads it, and React's shallow prop comparison on re-render depends on that ownership contract holding."
      },
      {
        id: "D",
        text: "Because JavaScript raises a hardware CPU exception the instant any object property is modified.",
        isCorrect: false,
        explanation: "JavaScript allows arbitrary property mutation on ordinary objects; there is no CPU-level guard tied to React. The \"can't\" refers to the architectural contract and rendering-model assumptions that break when you violate it, not a hardware restriction."
      }
    ],
    correctAnswer: "C",
    explanation: "Props are plain JavaScript values passed as function arguments to a component. React's rendering model treats every component as a pure function: given the same props and state, it must produce the same output. The parent owns the data; the child receives a read-only view of it. Mutating a prop means the child is writing into the parent's data behind the parent's back.\n\nIf a child mutates a prop object in place, the parent's state is now different from what the parent believes. On the next render, React compares new props to old props with a shallow reference check. Because the object reference is unchanged, React may skip re-rendering the child entirely, and the UI silently shows stale data.\n\nReact does not throw a runtime error when you mutate a prop. The restriction is architectural, not enforced by the language or the runtime. TypeScript's `Readonly<T>` or a `readonly` modifier catches accidental mutation at compile time, but the real guarantee comes from React's assumption that a component's output is a deterministic function of its inputs.",
    interviewLine: "I treat props as read-only inputs because React's rendering model assumes components are pure functions of their props and state. If a child mutates a prop object in place, the parent's data changes behind its back, and React's shallow reference comparison on the next render won't detect the change, so the child skips re-rendering and the UI shows stale data.",
    misconception: "Treating \"can't update props\" as a runtime enforcement (an error, a frozen object, a browser restriction) when it is actually an architectural contract: React's rendering and diffing logic assumes components are pure functions of their inputs, so mutating a prop silently breaks that assumption without any error being thrown.",
    hints: [
      "Think of a component as a function call. What is the caller's responsibility versus the callee's?",
      "What happens to React's shallow prop comparison if the child writes into the same object the parent still holds a reference to?",
      "React does not throw an error if you mutate a prop, so the restriction is about the rendering model's assumptions, not a runtime guard."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that mutating `item.qty` in place leaves the object reference unchanged, which breaks the purity assumption and can lead to inconsistent UI if the component relies on reference equality to optimize updates.",
      language: "tsx",
      code: "function Row({ item }: { item: { name: string; qty: number } }) {\n  // Mutating the prop directly violates the read-only contract.\n  item.qty += 1;\n  return <li>{item.name}: {item.qty}</li>;\n}\n\nfunction Cart({ items }: { items: { name: string; qty: number }[] }) {\n  // The parent owns this data. If a child mutates it,\n  // the parent's state no longer matches the UI.\n  return (\n    <ul>\n      {items.map((i) => (\n        <Row key={i.name} item={i} />\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Import the `React` namespace and read its `version` property, which is a string like `'19.0.0'`.",
        isCorrect: true,
        explanation: "Correct. `React.version` is a static string property on the namespace object exported by the `react` package, available in every build."
      },
      {
        id: "B",
        text: "React's version is stripped from the production bundle and cannot be read at runtime.",
        isCorrect: false,
        explanation: "Tempting if you assume tree-shaking removes all unused metadata, but `version` is a top-level property of the module's default export, so it survives bundling in both dev and prod builds."
      },
      {
        id: "C",
        text: "Read `window.navigator.reactVersion`, which the browser exposes for every loaded library.",
        isCorrect: false,
        explanation: "The `Navigator` interface has no `reactVersion` member; it exposes hardware, language, and platform data, not third-party library versions. No browser ships such a property."
      },
      {
        id: "D",
        text: "Query the browser's IndexedDB store where React persists its build metadata.",
        isCorrect: false,
        explanation: "IndexedDB is a key-value object store with no SQL dialect, and React never writes its version there. React's version is a module-level string, not database state."
      }
    ],
    correctAnswer: "A",
    explanation: "The `react` package exports a namespace object that carries a static `version` property. When you write `import React from 'react'` or `import * as React from 'react'`, `React.version` is a plain string such as `'19.0.0'`. It is baked into the bundle at build time and is present in both development and production builds.\n\nIn practice you might log it to a console, branch on the major number to feature-detect, or include it in an error report. It is a single property read with no side effects, so accessing it inside a render or an event handler is safe.\n\nOne nuance an interviewer may probe: even with the automatic JSX runtime introduced in React 17, you do not need to import `React` to write JSX, but you still need the import to access `React.version`. The property lives on the module's default export, not on the JSX factory or on `globalThis`.",
    interviewLine: "I import the React namespace and read `React.version` \u2014 it's a static string property like `'19.0.0'` that's present in both production and development bundles, so I can parse the major number to feature-detect without any extra dependency.",
    misconception: "Because React is a library that gets bundled and minified, its version string is assumed to be stripped away or hidden inside dev tools, so candidates look for it in the DOM, the navigator, or some browser storage instead of simply reading a property on the imported namespace.",
    hints: [
      "Think about what the `react` package exports as a module-level property, not a hook or a DOM query.",
      "The version is a string constant set at build time; it is just a property on the namespace object you import.",
      "It is not a method you call, not something on `window.navigator`, and not stored in IndexedDB or the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `React.version` is read as a plain string and can be split to extract the major version for a feature check.",
      language: "tsx",
      code: "import React from 'react';\n\nfunction VersionBadge() {\n  const [major] = React.version.split('.').map(Number);\n  return (\n    <span data-testid=\"version-badge\">\n      {major >= 19\n        ? 'React 19: useActionState available'\n        : `React ${React.version}: legacy hooks only`}\n    </span>\n  );\n}"
    }
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
        text: "HTTPS cannot be used in local development because it requires a certificate issued by a public CA.",
        isCorrect: false,
        explanation: "Tempting if you equate HTTPS with a CA-signed production certificate. In reality webpack-dev-server generates a self-signed certificate in-process the moment it sees `HTTPS=true`, so local TLS is a first-class CRA feature."
      },
      {
        id: "B",
        text: "Set `HTTPS=true` in a `.env` file or prefix the start script with `cross-env HTTPS=true react-scripts start`.",
        isCorrect: true,
        explanation: "Correct. `HTTPS=true` is the single flag react-scripts checks at startup; it causes webpack-dev-server to generate a self-signed certificate and serve over TLS instead of plain HTTP."
      },
      {
        id: "C",
        text: "Purchase a physical hardware SSL firewall and configure it to terminate TLS before forwarding to the dev server.",
        isCorrect: false,
        explanation: "Tempting if you picture HTTPS as requiring dedicated network hardware. The dev server creates the certificate in-process; no external device, appliance, or paid service is part of the local development loop."
      },
      {
        id: "D",
        text: "Change all image and script URLs in CSS and HTML from `http://` to `https://` to eliminate mixed-content warnings.",
        isCorrect: false,
        explanation: "Tempting if you read the question as 'make sure no resource loads over plain HTTP.' The question is about the protocol the dev server itself listens on, which is controlled by the `HTTPS` environment variable, not by individual asset URLs."
      }
    ],
    correctAnswer: "B",
    explanation: "Setting `HTTPS=true` is the documented CRA flag. When react-scripts starts webpack-dev-server, it reads that variable, generates a self-signed certificate in memory, and switches the listener from plain HTTP to TLS. No external certificate authority or hardware device is involved.\n\nIn practice this lets you reproduce mixed-content errors, test `Secure` cookie flags, or debug a service worker that refuses to register over HTTP \u2014 all from `localhost`. The browser will show a self-signed certificate warning on first visit; you accept it once and the session proceeds normally.\n\nThe variable can live in a `.env` file for a persistent default, or be prefixed to the script for a one-off run. On Windows the shell syntax is `set HTTPS=true && react-scripts start`; on Unix it is `HTTPS=true react-scripts start`; `cross-env` unifies both without shell-specific syntax.",
    interviewLine: "I set `HTTPS=true` as an environment variable \u2014 in a `.env` file or prefixed to the `react-scripts start` command \u2014 and webpack-dev-server picks it up, generates a self-signed certificate in memory, and serves the app over TLS on the same port.",
    misconception: "The learner treats 'HTTPS in development' the same as a production TLS setup that requires a CA-issued certificate and dedicated infrastructure, rather than a locally generated self-signed cert that the dev server handles automatically from one environment variable.",
    hints: [
      "Look at what `react-scripts start` actually wraps under the hood.",
      "Ask which single environment variable webpack-dev-server checks at startup to decide whether to enable TLS.",
      "The answer is a flag the dev server reads, not a certificate you purchase or a URL you rewrite."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `cross-env` makes the `HTTPS=true` prefix work identically on Windows, macOS, and Linux without shell-specific syntax.",
      language: "json",
      code: "{\n  \"name\": \"my-app\",\n  \"scripts\": {\n    \"start\": \"cross-env HTTPS=true react-scripts start\",\n    \"start:plain\": \"react-scripts start\"\n  }\n}"
    }
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
        text: "Set `baseUrl` and `paths` in `tsconfig.json` or `jsconfig.json` to map `@/` to `src/`.",
        isCorrect: true,
        explanation: "Correct. `baseUrl` plus `paths` is the compiler-level mechanism CRA's toolchain reads to resolve aliases like `@/` to `src/`, giving you short, stable imports with full IDE support."
      },
      {
        id: "B",
        text: "Move all application source files into a single flat directory to eliminate every `../` segment.",
        isCorrect: false,
        explanation: "Flattening the entire project removes the need for `../` segments, but it destroys every folder boundary you use to group features, components, and utilities. The codebase becomes unmanageable at any scale and you lose the semantic structure that makes the project readable."
      },
      {
        id: "C",
        text: "Absolute imports are prohibited in React projects and will cause a build failure.",
        isCorrect: false,
        explanation: "This is simply false. Path aliases and root-relative imports are standard practice in React projects of every size. CRA, Next.js, Vite, and every major bundler support them out of the box or with a one-line config."
      },
      {
        id: "D",
        text: "Copy source files into `node_modules` before each build so the module resolver finds them.",
        isCorrect: false,
        explanation: "`node_modules` is managed by the package manager and is wiped on every `npm install` or `npm ci`. Even if the copy worked once, it would silently disappear, and you would be fighting the toolchain instead of configuring it."
      }
    ],
    correctAnswer: "A",
    explanation: "The correct approach is to set `baseUrl` and `paths` in `tsconfig.json` (TypeScript projects) or `jsconfig.json` (JavaScript projects). This tells the compiler and the bundler how to resolve a short alias like `@/components/Button` to the real file `src/components/Button`, so you never write `../../components/Button` again.\n\nIn day-to-day code the import path is stable no matter where the importing file sits. A component five directories deep imports `@/utils/format` exactly the same way a file at the project root does. VS Code and other editors read the same config, so you get autocomplete and go-to-definition for aliased paths without extra setup.\n\nThe `NODE_PATH` variable shown in the question also extends Node's module search path and works in CRA, but it is invisible to the TypeScript compiler and to most IDEs, so you lose type-aware imports and refactoring. The `tsconfig`/`jsconfig` mapping is the preferred mechanism because every layer of the toolchain \u2014 compiler, bundler, editor \u2014 understands it.",
    interviewLine: "I set `baseUrl` and `paths` in `tsconfig.json` so I can write `@/components/Button` instead of counting how many levels up I need to go. The bundler, the type checker, and my editor all resolve the alias from that one config file.",
    misconception: "The learner reaches for file-system tricks or environment variables to shorten import paths, not realizing that the TypeScript or JavaScript compiler config is the intended place to declare how aliases resolve.",
    hints: [
      "The fix lives in a JSON config file at the project root, not in the file system or an environment variable.",
      "What field in `tsconfig.json` or `jsconfig.json` tells the compiler that `@/` maps to `src/`?",
      "It is not `NODE_PATH` or a shell trick; it is a compiler-level mapping that the bundler and your editor both read."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how a file five directories deep imports from `@/` without a single `../` segment.",
      language: "tsx",
      code: "// src/features/dashboard/widgets/RevenueCard.tsx\nimport { formatCurrency } from '@/utils/format';\nimport { useRevenue } from '@/hooks/useRevenue';\nimport { Card } from '@/components/Card';\n\nexport function RevenueCard() {\n  const { data } = useRevenue();\n  return (\n    <Card title=\"Revenue\">\n      <span>{formatCurrency(data.total)}</span>\n    </Card>\n  );\n}"
    }
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
        text: "Listen to route location changes with the `useLocation()` hook inside a `useEffect` whose dependency array is `[location]`, placed in a top-level component.",
        isCorrect: true,
        explanation: "Correct. `useLocation()` returns a new reference on every navigation, so the effect re-runs exactly when the URL changes, and a single top-level placement captures all transitions without duplication."
      },
      {
        id: "B",
        text: "Embed the Google Analytics `<script>` tag inside every component's JSX return so each view loads its own tracker.",
        isCorrect: false,
        explanation: "Tempting if you think each virtual page needs its own script, but the GA loader must appear once in the document. Repeating it in dozens of components bloats the bundle, creates duplicate trackers, and still does not fire a pageview on client-side navigation."
      },
      {
        id: "C",
        text: "Force a full-page HTTP reload on every link click so the browser's default page-load event triggers GA tracking automatically.",
        isCorrect: false,
        explanation: "Technically the page would load and GA would fire, but you would destroy the SPA experience: all client state, in-progress forms, and cached data are lost on every click, and the user sees a full flash. It also defeats the purpose of using a client-side router."
      },
      {
        id: "D",
        text: "Google Analytics cannot track single-page React applications because the document never reloads.",
        isCorrect: false,
        explanation: "The premise sounds right\u2014the document does not reload\u2014but GA explicitly provides `ga('send', 'pageview', ...)` for exactly this case. SPA tracking is a first-class use case; you just have to trigger the send from JavaScript on route changes."
      }
    ],
    correctAnswer: "A",
    explanation: "In a single-page app the browser never issues a new HTTP request when the user navigates, so Google Analytics' built-in pageview tracking (which fires on document load) never triggers again. The fix is to detect the route change inside React and call `ga('send', 'pageview', ...)` manually. `useLocation()` from React Router returns the current location object, and its reference changes on every navigation, so listing it in a `useEffect` dependency array re-runs the effect exactly when the URL changes.\n\nYou place this logic in one top-level component or a dedicated `<Analytics />` wrapper so every route transition is captured in a single place. Without that, you would either duplicate the send call across many components or miss navigations that do not remount the component you placed the call in.\n\nThe `location` object carries `pathname`, `search`, and `hash`. Depending on your reporting needs you may include `search` to distinguish `/products?category=shoes` from `/products`, or exclude `hash` because in-page anchors are not separate pages. The effect also fires on initial mount, so the first page load is covered without a separate `window.onload` listener.",
    interviewLine: "Since a SPA never triggers a new page load, I hook into route changes with `useLocation()` and send a pageview inside a `useEffect` that depends on the location object, so every client-side navigation is tracked from a single top-level component.",
    misconception: "The learner assumes that because the browser never makes a new HTTP request on SPA navigation, no analytics event can be fired, and does not realize the GA SDK exposes a manual `send` method designed for this exact scenario.",
    hints: [
      "In a SPA the browser does not make a new HTTP request when the URL changes\u2014so what does change inside React on each navigation?",
      "React Router exposes a hook that returns the current location; ask whether its reference is stable across renders or changes with each navigation.",
      "You do not need the browser's page-load event; the GA SDK has a manual `send` call you can invoke from JavaScript."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "A dedicated null-rendering component keeps the analytics logic in one place and fires on both the initial mount and every subsequent route change.",
      language: "jsx",
      code: "import { useEffect } from \"react\";\nimport { useLocation } from \"react-router-dom\";\n\nfunction AnalyticsTracker() {\n  const location = useLocation();\n\n  useEffect(() => {\n    const path = location.pathname + location.search;\n    window.ga(\"set\", \"page\", path);\n    window.ga(\"send\", \"pageview\", { page: path });\n  }, [location]);\n\n  return null;\n}"
    }
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
        text: "Share components by assigning them to `window` globals so every file in the project can read them without an import statement.",
        isCorrect: false,
        explanation: "Tempting if you remember old script-tag bundles, but ES modules give each file its own scope; `window` globals create tight coupling, defeat tree-shaking, and break in server-side rendering where `window` does not exist."
      },
      {
        id: "B",
        text: "Call `require('MyComponent')` inside the JSX return to pull the component in at render time, treating it like a regular function call.",
        isCorrect: false,
        explanation: "Tempting if you confuse CommonJS with ES modules, but `require` is a Node.js runtime function, not a JSX construct; React projects use static `import` statements at the top of the file, which the bundler resolves at build time."
      },
      {
        id: "C",
        text: "Use `export default` (imported without braces) or a named `export const` (imported with braces) to share components between files.",
        isCorrect: true,
        explanation: "Correct. These are the two ES module patterns: a single default export per file imported without braces, and any number of named exports imported with braces. Both work in React, Next.js, and any bundler that supports ES modules."
      },
      {
        id: "D",
        text: "Insert `include('MyComponent.php')` statements inside the JSX to load the component, the way PHP templates pull in partials.",
        isCorrect: false,
        explanation: "Tempting only if you mix up server-side PHP templating with client-side JavaScript; `include` is a PHP keyword that has no meaning in a `.tsx` file and would be a syntax error."
      }
    ],
    correctAnswer: "C",
    explanation: "React projects use ES module syntax to share components. There are two forms: a default export (`export default MyComponent`) imported without braces (`import MyComponent from './MyComponent'`), and a named export (`export const MyComponent = \u2026`) imported with braces (`import { MyComponent } from './MyComponent'`). The code in the prompt shows the default form: `export default class MyProfile` paired with `import User from 'user'`.\n\nIn a real codebase you will see both. A `Button.tsx` file typically has one component and uses a default export. A `utils.ts` or `icons.tsx` file may export several small pieces and uses named exports. Bundlers such as Vite, webpack, and the Next.js compiler resolve static `import` statements at build time, and named exports let the bundler tree-shake code that is never imported.\n\nThe constraint an interviewer may probe: a file can have at most one default export but any number of named exports. Mixing the two in one file is legal, and barrel files often re-export a default as a named one with `export { default as Foo } from './Foo'` so consumers can use either import style.",
    interviewLine: "I use ES module syntax at the top of each file: `export default` for a single component per file, or a named export when a file holds several small pieces. The bundler resolves the static import graph at build time, so there is no runtime lookup.",
    misconception: "Thinking that component sharing requires a global registry or a server-side include mechanism, rather than the static, compile-time module graph that ES `import` and `export` build.",
    hints: [
      "Look at the top and bottom of the file: `import` at the top and `export` at the bottom define the module boundary.",
      "ES modules support exactly two export forms; one allows a single unnamed export per file, the other lets you export many by name.",
      "The code already shows one of the two patterns in action: `import User from 'user'` and `export default class MyProfile`."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the named-export form and its brace-wrapped import, the counterpart to the default export in the question.",
      language: "tsx",
      code: "export const Badge = ({ label }: { label: string }) => (\n  <span className={`badge badge-${label}`}>{label}</span>\n);\n\nexport const BadgeGroup = ({ items }: { items: string[] }) => (\n  <div className=\"badge-group\">\n    {items.map((item) => (\n      <Badge key={item} label={item} />\n    ))}\n  </div>\n);\n\n// In another file:\n// import { Badge, BadgeGroup } from './Badge';"
    }
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
        explanation: "This confuses a frontend JavaScript library with a systems programming language. React runs in the browser or Node.js; there is no C++ file-stream API available, and a constant is an in-memory value, not a file on disk."
      },
      {
        id: "B",
        text: "Constants must be fetched from an external SQL database on every render.",
        isCorrect: false,
        explanation: "Tempting if you conflate a constant with application data that lives in a backend. A constant is a fixed value known at write time; fetching it from a database on every render defeats the purpose of calling it a constant and adds network latency to every paint."
      },
      {
        id: "C",
        text: "Use a module-level `const` or a static class field.",
        isCorrect: true,
        explanation: "Correct. Module-level `const` is created once when the module loads, and a static class field is created once when the class is defined. Both give you a single, stable reference without any React-specific API."
      },
      {
        id: "D",
        text: "Define constants inside an infinite `while` loop.",
        isCorrect: false,
        explanation: "A `while (true)` loop never yields control back to the event loop, so the browser tab freezes and no component ever renders. A constant is a declaration, not a loop, and placing it inside one would never execute in practice."
      }
    ],
    correctAnswer: "C",
    explanation: "In React, a constant is just a JavaScript constant. You declare it at module level with `const` outside any component, or, on a class component, as a static field like `static DEFAULT_PAGINATION = 10`. Either way the value is created once when the module loads or the class is defined, and it lives in memory for the lifetime of the page.\n\nIf you instead write `const LIMIT = 10` inside a component's render body, a new binding is created on every render. That is not a correctness bug for a primitive, but for an object or array it means a fresh reference each time, which can break `useEffect` dependency checks or cause unnecessary re-renders in children that compare by reference.\n\nIn function components, which are the modern default, there is no class to attach a static field to, so module-level `const` is the idiomatic choice. Also note that `const` prevents reassignment of the binding, not mutation of the value: `const config = { limit: 10 }` still allows `config.limit = 20`.",
    interviewLine: "I just declare a `const` at the top of the module, outside the component. It is created once when the module loads and stays in memory, so every render reads the same reference. If I were still on a class component I could use a static field instead, but with function components module-level `const` is the standard approach.",
    misconception: "React is sometimes treated as if it has its own constant mechanism separate from JavaScript, so learners look for a React-specific API or lifecycle hook instead of simply using a plain `const` at module scope.",
    hints: [
      "A constant in React is a constant in JavaScript \u2014 where do you declare it so it is created exactly once?",
      "Think about when module-level code runs versus when a component's render function runs, and what happens if you declare the value inside the render body.",
      "You do not need any React hook, lifecycle method, or framework API to define a constant."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `MAX_RETRIES` and `API_TIMEOUT_MS` are declared once at module scope and read by the hook without being re-created on every render.",
      language: "tsx",
      code: "const MAX_RETRIES = 3;\nconst API_TIMEOUT_MS = 5_000;\n\nfunction useFetchWithRetry(url: string) {\n  const [error, setError] = useState<string | null>(null);\n  useEffect(() => {\n    let attempts = 0;\n    const run = async () => {\n      while (attempts < MAX_RETRIES) {\n        try {\n          const res = await fetch(url, {\n            signal: AbortSignal.timeout(API_TIMEOUT_MS),\n          });\n          if (!res.ok) throw new Error(`HTTP ${res.status}`);\n          return res.json();\n        } catch {\n          attempts++;\n        }\n      }\n      setError('All retries exhausted');\n    };\n    run();\n  }, [url]);\n  return { error };\n}"
    }
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
        text: "Locally scoped CSS class names that prevent global collisions, while keeping standard CSS syntax and zero runtime overhead.",
        isCorrect: true,
        explanation: "Correct. CSS Modules hash every class name in a `.module.css` file at build time, so each file gets a unique identifier and two components can both define `.card` without colliding. The transform is a compile-time string replacement, so the browser receives the final names and no runtime JavaScript is involved."
      },
      {
        id: "B",
        text: "Sandboxing each component's styles in a runtime JavaScript context so that CSS rules are isolated at execution time.",
        isCorrect: false,
        explanation: "Tempting if you picture CSS Modules as a runtime wrapper that executes styles in isolation. In reality the scoping happens at build time as a string replacement on class names; by the time any JavaScript runs, the CSS file already contains the final hashed selectors."
      },
      {
        id: "C",
        text: "Requiring a CSS preprocessor like Sass or PostCSS to generate the scoped class names during the build pipeline.",
        isCorrect: false,
        explanation: "This conflates CSS Modules with a specific toolchain. Any build tool that implements the CSS Modules spec (Webpack, Vite, esbuild, Next.js) can perform the name-hashing; no preprocessor is required, and plain CSS in a `.module.css` file is sufficient."
      },
      {
        id: "D",
        text: "Converting all stylesheet rules into CSS custom properties so components can override inherited values at runtime.",
        isCorrect: false,
        explanation: "This mixes up CSS Modules with CSS custom properties (`--var`). CSS Modules rename class selectors at build time; they do not convert rules into custom properties, and the resulting CSS still uses ordinary class selectors."
      }
    ],
    correctAnswer: "A",
    explanation: "CSS Modules scope class names locally by default. When you write `.card { padding: 16px; }` in a `card.module.css` file, the build tool hashes the class name into something like `card_7f3a2c`. Two components can each define a `.card` class and they never collide, because each file gets its own unique identifier.\n\nIn practice this removes the need for BEM-style prefixes or careful import ordering. You write standard CSS in a `.module.css` file, import it as a typed object (`import styles from './card.module.css'`), and reference `styles.card` in your JSX. The scoping is a build-time string replacement, so there is no runtime cost.\n\nThe one caveat an interviewer may probe: the scoping is file-local, not component-local. If you extract a shared `Button.module.css` and import it from three components, all three share the same hashed class. You can also opt out with `:global(.class)` for reset styles or third-party libraries, but that re-introduces the global namespace for that one rule.",
    interviewLine: "I reach for CSS Modules to get local scoping for free: the build tool hashes every class name in a `.module.css` file so two of my components can both use `.card` without colliding, and because it is a compile-time transform I pay no runtime cost.",
    misconception: "Treating CSS Modules as a runtime sandbox \u2014 a JavaScript library that wraps styles in a scope at execution time \u2014 when the scoping is actually a build-time string replacement that produces hashed class names before any JavaScript runs.",
    hints: [
      "Look at what happens to a class name like `.button` when it lives inside a `.module.css` file versus a plain `.css` file.",
      "The scoping is a build-time string replacement, not a runtime wrapper \u2014 ask yourself what the browser actually receives in the final CSS.",
      "The benefit is about preventing two files from accidentally styling the same class, not about hiding or encrypting the CSS."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how `styles.card` and `styles.heading` are looked up from a typed import \u2014 the browser never sees the literal strings `card` or `heading`.",
      language: "tsx",
      code: "import styles from './card.module.css';\n\nexport function Card({ title, body }: { title: string; body: string }) {\n  return (\n    <div className={styles.card}>\n      <h2 className={styles.heading}>{title}</h2>\n      <p>{body}</p>\n    </div>\n  );\n}"
    }
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
        text: "Query a backend SQL server to retrieve the navigation history.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word \"history\" with a database table of visited pages, but React Router's history object is a client-side JavaScript instance from the `history` npm package; no server or SQL query is involved."
      },
      {
        id: "B",
        text: "Use `withRouter`, `useHistory()`, or a custom `createBrowserHistory` instance.",
        isCorrect: true,
        explanation: "Correct. All three patterns are supported in v4/v5 and give you a callable `push`, `replace`, or `go` method; the custom-module approach additionally lets you navigate from non-component code."
      },
      {
        id: "C",
        text: "Read `window.history.allVisitedUrls` directly from the DOM.",
        isCorrect: false,
        explanation: "Tempting because `window.history` exists in every browser, but it only exposes `length`, `back()`, `forward()`, `go()`, `pushState()`, and `replaceState()`; there is no `allVisitedUrls` property, and React Router does not add one."
      },
      {
        id: "D",
        text: "History is inaccessible; the router does not expose a navigation object.",
        isCorrect: false,
        explanation: "Tempting if you treat the router as a black box that only renders components, but every v4/v5 API surface \u2014 `withRouter`, `useHistory`, and the low-level `<Router>` \u2014 hands you a history object with working navigation methods."
      }
    ],
    correctAnswer: "B",
    explanation: "In React Router v4 and v5 the router does not attach a navigation object to a global. You obtain a `history` instance one of three ways: wrap a component in the `withRouter` higher-order component, call the `useHistory()` hook inside a function component, or create your own instance with `createBrowserHistory` from the `history` package and pass it to the low-level `<Router history={instance}>` component.\n\nThe custom-instance approach is the one shown in the question's code. Because the history object is a plain JavaScript module, you can import it from any file \u2014 an API callback, a utility function, a service worker \u2014 and call `history.push('/new-route')` without a React component in scope. The hook approach is simpler when you only need navigation inside a component body.\n\nIn React Router v6 both `withRouter` and `useHistory` were removed; the replacement is `useNavigate()`, which returns a `navigate` function rather than a full history object. If a codebase is on v6, none of the three v4/v5 patterns compile as written.",
    interviewLine: "In v4 and v5 I'd either call `useHistory()` inside a component or create a shared instance with `createBrowserHistory` and pass it to the low-level `<Router>`, so I can call `push` from anywhere without needing a component in scope.",
    misconception: "Treating the browser's `window.history` API and React Router's `history` package as the same object, or assuming the router is a sealed black box that never exposes a navigation handle to your code.",
    hints: [
      "Look at what the code imports: `createBrowserHistory` from the `history` package, not a property of `window`.",
      "Ask whether the router exposes a navigation object to your code, or whether you must construct one yourself and inject it.",
      "The answer involves the `history` npm package and a React component that accepts a `history` prop, not a browser DOM API."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice that `useHistory` gives you the same `push` and `replace` methods without needing a shared module, but only inside a component render.",
      language: "tsx",
      code: "import { useHistory } from 'react-router-dom';\n\nfunction SearchResults({ query }: { query: string }) {\n  const history = useHistory();\n\n  function clearSearch() {\n    history.push('/');\n  }\n\n  function goBack() {\n    history.goBack();\n  }\n\n  return (\n    <div>\n      <p>Results for {query}</p>\n      <button onClick={clearSearch}>Clear</button>\n      <button onClick={goBack}>Back</button>\n    </div>\n  );\n}"
    }
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
        text: "Parse the system BIOS firmware to read the hardware-level display language setting.",
        isCorrect: false,
        explanation: "Tempting if you conflate the OS display language with the application's locale, but `react-intl` is a pure JavaScript library that reads a string you pass in React props; it never touches firmware, UEFI, or any hardware setting."
      },
      {
        id: "B",
        text: "Locale access is not supported in `react-intl`; it only exposes formatting utilities with no way to read the active locale.",
        isCorrect: false,
        explanation: "Tempting if you picture `react-intl` as only a formatting utility, but the `intl` object it exposes via context includes `locale`, `formatMessage`, `formatDate`, and more; reading `intl.locale` is a first-class, documented feature."
      },
      {
        id: "C",
        text: "Read `document.currentLocale` from the browser DOM, which mirrors the OS display language preference.",
        isCorrect: false,
        explanation: "Tempting because `navigator.language` exists and you might assume a DOM property mirrors it, but no standard DOM API exposes the application's active locale; `react-intl` keeps that value in React context, not on `document`."
      },
      {
        id: "D",
        text: "Call `useIntl()` to destructure `locale` from the `<IntlProvider>` context (or use `injectIntl` for class components).",
        isCorrect: true,
        explanation: "Correct. `useIntl()` pulls the `intl` object from the `<IntlProvider>` context, and `intl.locale` is exactly the string you passed as the provider's `locale` prop."
      }
    ],
    correctAnswer: "D",
    explanation: "`useIntl()` reads the `intl` object from React context, which is created by the nearest `<IntlProvider>` ancestor. The `locale` prop you pass to that provider becomes `intl.locale` on the object the hook returns, so `const { locale } = useIntl()` gives you the active string like `\"fr-FR\"` or `\"en-US\"`.\n\nIn practice this lets you branch rendering, pick a message catalog, or pass the locale to a date formatter without prop-drilling. If no `<IntlProvider>` wraps your component tree, `useIntl()` throws a clear error rather than returning `undefined`, which makes the missing setup obvious during development.\n\nThe value is whatever you set on `<IntlProvider>`, not `navigator.language`. You can switch locales at runtime by changing that prop (e.g. from a language menu), and every component that calls `useIntl()` re-renders with the new value. For class components or older code, `injectIntl` HOC is the equivalent: it injects the same `intl` object as a prop, so `this.props.intl.locale` works identically.",
    interviewLine: "I read it from `useIntl()`, which pulls the `intl` object out of the `<IntlProvider>` context, so the locale is whatever I passed as the `locale` prop at the top of the tree, not `navigator.language`.",
    misconception: "Treating the locale as a browser or OS-level property (`navigator.language`, a DOM field, a system setting) rather than an application-level value that lives in React context and is set explicitly by the developer on `<IntlProvider>`.",
    hints: [
      "Think about where the locale value is set in a React app: which single component owns that configuration string?",
      "react-intl exposes its configuration through React context. Which hook is the documented way to read that context from a function component?",
      "The browser's navigator.language is a user preference hint, not the locale your app is actually running in."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that changing the `locale` prop re-renders every component under the provider, and `useIntl()` picks up the new value automatically.",
      language: "tsx",
      code: "import { IntlProvider, useIntl } from 'react-intl';\n\nfunction Badge() {\n  const { locale } = useIntl();\n  return <span data-locale={locale}>active: {locale}</span>;\n}\n\nfunction App({ locale }: { locale: string }) {\n  return (\n    <IntlProvider locale={locale} messages={{}}>\n      <Badge />\n    </IntlProvider>\n  );\n}"
    }
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
        text: "A general-purpose testing framework that provides a full environment and test runner for unit, integration, and end-to-end tests.",
        isCorrect: false,
        explanation: "This describes Jest or Playwright. `ReactTestUtils` is a thin set of helpers from `react-dom/test-utils`, not a standalone framework with its own runner or environment."
      },
      {
        id: "B",
        text: "A low-level library for simulating user interactions and inspecting the rendered DOM in unit tests, now largely superseded by React Testing Library.",
        isCorrect: true,
        explanation: "Correct. `ReactTestUtils` provided helpers like `Simulate` for synthetic events and `findRenderedDOMComponentWithTag` for assertions, but modern testing prefers React Testing Library's `render` and `fireEvent`."
      },
      {
        id: "C",
        text: "A static analysis tool that scans source code for security vulnerabilities and performance anti-patterns in React components.",
        isCorrect: false,
        explanation: "This describes linters like ESLint or security scanners. `ReactTestUtils` is a runtime library used inside test files to manipulate the DOM; it does not analyze code statically."
      },
      {
        id: "D",
        text: "A browser extension that records user actions to generate test scripts for regression testing of web applications.",
        isCorrect: false,
        explanation: "This describes recording tools like Cypress Studio. `ReactTestUtils` is an npm package imported in test files; it does not run as a browser extension or record sessions."
      }
    ],
    correctAnswer: "B",
    explanation: "`ReactTestUtils` is the object exported by `react-dom/test-utils` (formerly `react-addons-test-utils`). It bundled low-level helpers for unit-testing React components against a simulated DOM: `Simulate` to dispatch synthetic events, `findRenderedDOMComponentWithTag` and `findAllRenderedComponentsByType` to locate rendered output, and `act` to flush updates so assertions run after React finishes its work.\n\nIn a typical pre-RTL test you would call `ReactDOM.render` into a detached `<div>`, trigger an event with `Simulate.click`, then assert on the tree using `findRenderedDOMComponentWithTag`. That approach coupled every test to internal component structure, so a refactoring that renamed a wrapper div broke the test even though the user-facing behaviour was unchanged.\n\nIn React 18 and later, `act` is exported directly from `react` (or still available from `react-dom/test-utils`), and React Testing Library's `render`, `fireEvent`, and `screen` utilities are the standard replacement. `Simulate` and the `findRendered*` helpers remain in the package but are effectively deprecated; new test code should not reach for them.",
    interviewLine: "`ReactTestUtils` from `react-dom/test-utils` gave us `Simulate`, `findRenderedDOMComponentWithTag`, and `act` for unit-testing components against a simulated DOM. In modern code I use React Testing Library's `render` and `fireEvent` instead, and import `act` directly from `react`.",
    misconception: "Treating `ReactTestUtils` as if it were still the primary way to write React tests, or mistaking it for a general-purpose testing framework (Jest, Mocha) rather than a thin layer of DOM-event and component-finding helpers that React Testing Library has replaced.",
    hints: [
      "What does `react-dom/test-utils` export, and in what testing context would you import it?",
      "Compare `Simulate.click` to `fireEvent.click` from React Testing Library \u2014 which one do you reach for in a new project?",
      "It is a frontend DOM-testing helper, not a database, hardware, or security tool."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Modern test using React Testing Library, the direct successor to the `Simulate` + `findRenderedDOMComponentWithTag` pattern.",
      language: "tsx",
      code: "import { render, fireEvent, screen } from \"@testing-library/react\";\nimport Counter from \"./Counter\";\n\ntest(\"increments on click\", () => {\n  render(<Counter />);\n  fireEvent.click(screen.getByRole(\"button\"));\n  expect(screen.getByText(\"Count: 1\")).toHaveTextContent(\"Count: 1\");\n});"
    }
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
        text: "A browser extension that intercepts DOM events and re-renders button elements with custom font styles.",
        isCorrect: false,
        explanation: "Tempting if you associate any developer tool with browser styling, but Jest has no runtime presence in a browser; it is a Node.js process that executes test files and reports results."
      },
      {
        id: "B",
        text: "A database ORM that maps TypeScript classes to tables and generates SQL queries at runtime.",
        isCorrect: false,
        explanation: "Plausible if you conflate framework tooling with data-access libraries, but Jest never opens a database connection, generates SQL, or replaces an ORM like Prisma."
      },
      {
        id: "C",
        text: "A build tool that transpiles JSX components into inline-styled HTML for email clients.",
        isCorrect: false,
        explanation: "Tempting because both involve JSX, but Jest is not a build tool that emits HTML artifacts; it executes test files in a Node.js sandbox and reports pass or fail."
      },
      {
        id: "D",
        text: "A JavaScript test runner and assertion framework with built-in mocking, snapshot testing, and code coverage.",
        isCorrect: true,
        explanation: "Correct. Jest discovers, runs, and reports on test files, and ships with mocking, snapshots, and coverage as first-class features rather than separate packages."
      }
    ],
    correctAnswer: "D",
    explanation: "Jest is a JavaScript test runner and assertion framework. It discovers test files matching patterns like `*.test.ts` or `*.spec.js`, executes them in a sandboxed Node.js environment, and provides `expect()` matchers for assertions. It was created at Meta (formerly Facebook) and ships with zero configuration for most projects.\n\nIn practice, you write `describe` and `it` blocks, call `expect(result).toBe(expected)`, and Jest handles running the suite, reporting pass and fail, and collecting code coverage. For React components it pairs with `@testing-library/react`, which renders into a simulated DOM via the `jest-environment-jsdom` package. Mocking is built in: `jest.fn` creates a spy, `jest.mock` replaces a module before import.\n\nOne nuance an interviewer may probe: Jest executes in Node.js, not a real browser. The `jsdom` environment simulates enough of the DOM for component tests, but it does not replicate browser rendering, CSS layout, or network behavior. If a test depends on any of those, Jest alone is not sufficient.",
    interviewLine: "Jest is a test runner: it discovers test files, executes them in a Node.js environment, and gives me `expect()` assertions, `jest.fn` mocks, and snapshot comparison built in.",
    misconception: "Treating Jest as a general-purpose development tool (build step, styling plugin, or data layer) rather than a test orchestrator that runs assertions in a Node.js sandbox.",
    hints: [
      "Think about what happens when you type `npx jest` in a terminal.",
      "It discovers files, executes them in a sandbox, and reports pass or fail \u2014 what category of tool is that?",
      "It is not a build step, a styling tool, or a data layer; it runs code and checks the results."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://testing-library.com/docs/queries/about/#priority",
    example: {
      caption: "Notice the three parts working together: Jest discovers this file, Node.js executes it, and `expect` asserts the result.",
      language: "typescript",
      code: "import { add } from \"./math\";\n\ndescribe(\"add\", () => {\n  it(\"returns the sum of two numbers\", () => {\n    expect(add(2, 3)).toBe(5);\n  });\n\n  it(\"handles negative numbers\", () => {\n    expect(add(-1, 1)).toBe(0);\n  });\n\n  it(\"logs a warning for non-finite input\", () => {\n    const warn = jest.fn();\n    global.console.warn = warn;\n    add(Infinity, 1);\n    expect(warn).toHaveBeenCalledWith(\n      \"add received a non-finite argument\"\n    );\n  });\n});"
    }
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
        text: "MVW patterns had no meaningful drawbacks and remain the default architecture in every modern web framework today.",
        isCorrect: false,
        explanation: "Tempting if you conflate MVW with the broader MVC lineage, but two-way binding was precisely the fragility that led Facebook to build Flux in 2014 to replace it."
      },
      {
        id: "B",
        text: "MVW patterns required all application code to be written in a low-level language before it could run in the browser.",
        isCorrect: false,
        explanation: "No MVW framework (Backbone, early AngularJS) imposed any language constraint; they were written in and consumed as standard JavaScript in the browser."
      },
      {
        id: "C",
        text: "Bidirectional binding let views and models mutate each other, creating circular update loops that were hard to trace or replay.",
        isCorrect: true,
        explanation: "Correct. Two-way binding let a view mutation propagate into a model, which then pushed updates back to other views, creating circular update paths that were hard to trace and impossible to replay."
      },
      {
        id: "D",
        text: "MVW patterns were roughly 1000 times faster than any modern component-based framework under typical production load.",
        isCorrect: false,
        explanation: "The opposite is closer to the truth: cascading re-renders and layout thrashing caused by unpredictable update order were well-documented performance problems of MVW-era applications."
      }
    ],
    correctAnswer: "C",
    explanation: "The MVW pattern (Model-View-Whatever), popularized by Backbone and early AngularJS, allowed both views and models to mutate shared state. In practice a view's `set` call could trigger a model change, which notified other views, which could write back to the model, creating a circular dependency loop.\n\nIn a real application this made state changes unpredictable. A single user action in one component could cascade through multiple models and views in an order that was hard to trace, and the final DOM state depended on the sequence of those mutations rather than a single source of truth.\n\nThis is the direct motivation behind Flux (2014) and later Redux: enforce a single direction of data flow so that every state change is traceable, replayable, and free of circular update paths.",
    interviewLine: "I'd say MVW's core problem was that bidirectional binding let any view write to any model, so a single user action could trigger a chain of model-to-view-to-model updates I couldn't trace in the debugger \u2014 which is exactly why I favor the unidirectional flow Flux and Redux enforce.",
    misconception: "Thinking of MVW as just 'MVC with a different label' hides the key difference that caused every major drawback: two-way binding between views and models, which allowed any view to write to any model and broke the update-order guarantees that debugging depends on.",
    hints: [
      "Think about what happens when two components both bind to the same model property and both are allowed to write to it.",
      "Ask: if a view writes to a model, and that model change triggers another view to write back, what does the update order look like and who is responsible for breaking the loop?",
      "The pattern that replaced MVW at Facebook in 2014 did so by enforcing a single rule about the direction of data flow."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that both views can write to the same model property, so a keystroke in either view can trigger a write-back loop through the other.",
      language: "javascript",
      code: "const model = new Backbone.Model({ title: \"Draft\" });\n\nconst ViewA = Backbone.View.extend({\n  events: { \"change #input-a\": \"sync\" },\n  sync: function (e) {\n    model.set(\"title\", e.target.value); // view \u2192 model\n  }\n});\n\nconst ViewB = Backbone.View.extend({\n  events: { \"change #input-b\": \"sync\" },\n  sync: function (e) {\n    model.set(\"title\", e.target.value); // view \u2192 model\n  }\n});\n\n// Typing in ViewA updates the model, which re-renders ViewB.\n// If ViewB's render fires a change event, it writes back to\n// the model again \u2014 a circular update path with no single\n// source of truth to debug against."
    }
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
        text: "Mobile apps cannot be tested automatically because their UI depends on real physical device hardware.",
        isCorrect: false,
        explanation: "Tempting if you equate \"mobile\" with \"needs a human hand,\" but Jest runs component tests in Node.js with no device at all, and Detox or Maestro automate taps, typing, and assertions on simulators and real hardware."
      },
      {
        id: "B",
        text: "By printing the component source onto physical paper and reviewing every line by hand.",
        isCorrect: false,
        explanation: "Reading code can catch typos, but it never exercises the render cycle, event handlers, or state updates that the testing frameworks are designed to verify."
      },
      {
        id: "C",
        text: "By opening the app in a desktop browser and exercising it as an ordinary web page.",
        isCorrect: false,
        explanation: "React Native compiles to native UIKit or Android Views, not a DOM, so there is no browser to open; the test environment is a Node.js process or a mobile simulator, not a desktop browser tab."
      },
      {
        id: "D",
        text: "Jest plus React Native Testing Library for component tests; Detox, Maestro, or Appium for end-to-end runs on simulators and real devices.",
        isCorrect: true,
        explanation: "Correct. Jest and React Native Testing Library exercise component logic and rendering in a fast, device-free Node.js environment, while Detox, Maestro, or Appium drive the compiled app through real user flows on simulators and physical hardware."
      }
    ],
    correctAnswer: "D",
    explanation: "React Native apps are tested in two layers. Jest, which ships with every React Native project, runs unit and component tests in Node.js using a custom test environment that mocks native modules. React Native Testing Library sits on top of Jest and renders your components so you can query them by role or text and assert on the output. For end-to-end coverage, frameworks like Detox, Maestro, or Appium drive the compiled app on an iOS simulator, an Android emulator, or a physical device.\n\nIn practice, a component test renders a `Button`, fires a press event, and checks that the `onPress` callback ran. An E2E spec in Detox or Maestro walks through a multi-screen flow\u2014tapping, typing, navigating\u2014and asserts the UI state at each step. The component tests run in under a second with no device attached; the E2E tests need a running simulator or device and take longer.\n\nThe trade-off an interviewer will probe next: Jest tests are fast and isolate logic, but they cannot verify that a native module actually behaves correctly on real hardware. E2E tests cover that gap but are slower and more brittle. A typical project runs both, with Jest covering the majority of components and a small set of E2E specs guarding critical user journeys.",
    interviewLine: "I split testing into two layers: Jest with React Native Testing Library for fast component-level assertions in CI, and a small set of Detox or Maestro specs that drive the real app on a simulator to catch integration issues that in-memory tests cannot see.",
    misconception: "Because React Native renders to native UI elements rather than a DOM, the only way to verify behaviour is to tap a physical phone by hand, or alternatively to treat the app like a web page and open it in a desktop browser.",
    hints: [
      "Think about what environment your test code actually runs in\u2014Node.js or a real device.",
      "Ask whether the test needs to verify component logic in isolation or a full multi-screen user flow.",
      "Neither a desktop browser nor a physical phone is the only option; there is a standard toolchain that covers both."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A React Native Testing Library spec that renders a form, fills both fields, presses the submit button, and asserts a validation error appears when the email is missing.",
      language: "tsx",
      code: "import { render, fireEvent } from '@testing-library/react-native';\nimport { LoginForm } from './LoginForm';\n\nit('shows an error when the email is empty', () => {\n  const { getByRole, getByText } = render(<LoginForm />);\n  fireEvent.changeText(\n    getByRole('textbox', { name: 'Password' }),\n    'secure-password'\n  );\n  fireEvent.press(getByRole('button', { name: 'Sign in' }));\n  expect(getByText('Email is required')).toBeTruthy();\n});"
    }
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
        text: "Send an SMS text message to a remote server on every keystroke to capture the log.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"logging\" with \"shipping data to a backend,\" but React Native `console` output stays on-device and is read locally through the platform log stream; no network call is involved."
      },
      {
        id: "B",
        text: "Call `console.log()` or `console.warn()` and read the output through the CLI tail commands, a connected browser debugger, or Flipper.",
        isCorrect: true,
        explanation: "Correct. The JS engine's `console` object forwards to the native log stream, and the CLI watchers, Safari/Chrome inspectors, and Flipper all surface that stream to you in development."
      },
      {
        id: "C",
        text: "Logging is strictly prohibited by the React Native runtime, so all diagnostic output must be suppressed.",
        isCorrect: false,
        explanation: "Tempting if you assume a native app has no console, but the JS engine (JSC or Hermes) provides the full `console` API and React Native ships CLI tools specifically to read it."
      },
      {
        id: "D",
        text: "Write log strings directly to the phone's SIM card storage for later retrieval.",
        isCorrect: false,
        explanation: "Tempting if you picture \"device storage\" as a single writable medium, but the SIM card holds carrier-identifying data and is not a general-purpose file system; console output goes to the OS log stream, not to SIM hardware."
      }
    ],
    correctAnswer: "B",
    explanation: "React Native executes your JavaScript inside a JS engine\u2014Hermes by default on both iOS and Android. That engine ships the standard `console` object, so `console.log()`, `console.warn()`, and `console.error()` work the same way they do in a browser. The engine forwards each call to the platform's native log stream: `os_log` on iOS, `logcat` on Android.\n\nIn development you read those streams three ways. Run `npx react-native log-ios` or `npx react-native log-android` in a second terminal to tail output live. Attach Safari Web Inspector (iOS) or Chrome DevTools (Android) to the running app for an interactive console pane. Flipper, the bundled RN debugger now in maintenance mode, also exposes a console tab.\n\nIn a release build the picture changes. Hermes removes `console.log` calls during bytecode compilation, so anything you logged in development produces no output in the shipped app. If you need persistent, structured logs in production, use a library such as `react-native-logs` or forward events to a remote collector; do not rely on `console` alone.",
    interviewLine: "React Native runs JS in JSC or Hermes, both of which expose the standard `console` object; the output lands in `os_log` or `logcat`, and I read it with `npx react-native log-ios`, a Safari or Chrome inspector, or Flipper during development.",
    misconception: "React Native is a native app, so it must use a proprietary logging API or have no console at all, rather than running standard JavaScript `console` inside a JS engine that forwards to the platform log stream.",
    hints: [
      "React Native executes your code inside a JS engine\u2014what standard APIs does that engine already provide?",
      "Where does the engine send `console` output on iOS and Android, and what CLI commands tail that stream?",
      "You do not need a proprietary logging API; the same `console` object you use in a browser is available."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "A component that logs on mount and on press; in dev you see both lines in the terminal tail or debugger, in a Hermes release build the `console.log` calls are gone.",
      language: "tsx",
      code: "import { useEffect, useCallback, useState } from \"react\";\nimport { View, Text, Pressable } from \"react-native\";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log(\"[Counter] mounted\");\n    return () => console.log(\"[Counter] unmounted\");\n  }, []);\n\n  const onPress = useCallback(() => {\n    const next = count + 1;\n    console.warn(`[Counter] tapped -> ${next}`);\n    setCount(next);\n  }, [count]);\n\n  return (\n    <View>\n      <Text>{count}</Text>\n      <Pressable onPress={onPress}><Text>Tap</Text></Pressable>\n    </View>\n  );\n}"
    }
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
        text: "Because React's runtime requires a network connection to initialize its component tree, and `file://` URLs have no network context.",
        isCorrect: false,
        explanation: "Tempting if you conflate React with a server-rendered framework, but React's reconciler runs entirely in the browser's JavaScript engine and never opens a socket. The failure here is in the extension's ability to inject code, not in React's ability to execute."
      },
      {
        id: "B",
        text: "Because Chrome's security model permanently blocks all extension functionality on `file://` URLs with no user-facing override.",
        isCorrect: false,
        explanation: "The restriction is real but not permanent. Chrome ships with a per-extension toggle for file-URL access at `chrome://extensions`, so the block is a default-deny permission, not an architectural prohibition."
      },
      {
        id: "C",
        text: "Chrome restricts extension access to `file://` URLs by default; you must open `chrome://extensions`, locate React DevTools, and enable 'Allow access to file URLs'.",
        isCorrect: true,
        explanation: "Correct. Chrome treats `file://` as a separate origin that extensions cannot reach unless the user explicitly grants the permission, which is exactly the toggle described."
      },
      {
        id: "D",
        text: "Because the browser's content-security-policy for `file://` origins strips extension-injected scripts before the page's own scripts execute.",
        isCorrect: false,
        explanation: "CSP does apply to `file://` pages, but the React DevTools failure is not a CSP violation. The content script is never injected in the first place because the extension lacks the file-URL permission; there is no script present for CSP to strip."
      }
    ],
    correctAnswer: "C",
    explanation: "Chrome extensions, including React DevTools, operate by injecting a content script into the page. By default, Chrome does not grant extensions access to `file://` URLs because they are treated as a distinct origin with no network identity. Without that access, the content script never runs, so DevTools never hooks into React's internal reconciler and the panel either does not appear or reports no components.\n\nIn practice, you open a local HTML file that loads React from a script tag, the DevTools tab is missing or empty, and the fix is to go to `chrome://extensions`, find React DevTools, and toggle \"Allow access to file URLs.\" After that, reload the page and the panel populates normally. A dev server at `localhost` never hits this restriction because `http://` origins are within the extension's default scope.\n\nThe nuance an interviewer may probe: this is an extension-permission gate, not a React limitation and not a CSP rule. React itself has no awareness of the protocol; the same bundle runs identically on `file://` and `http://`. The restriction lives entirely in Chrome's extension sandbox model, and other browsers handle extension access to local files differently.",
    interviewLine: "I note React runs identically on `file://` and `http://`; the real issue is that Chrome won't let the DevTools extension inject its content script into a `file://` page until I toggle \"Allow access to file URLs\" in `chrome://extensions`. I treat it as a permission gate, not a runtime limitation.",
    misconception: "The failure is in React or in the page's code, when in reality React runs fine on `file://`; the gap is entirely in Chrome's extension-permission model, which defaults to denying access to local files.",
    hints: [
      "React itself runs fine on `file://` URLs \u2014 the problem is in the tool that observes React, not in React.",
      "Ask what mechanism React DevTools uses to see components, and whether that mechanism can reach a `file://` page by default.",
      "It is not a CSP rule or a React API restriction; think about what permission layer sits between a Chrome extension and a local file."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "React renders this component identically on `file://` and `http://`; the protocol is just a string in `location.protocol`, and the DevTools gap lives in Chrome's extension sandbox, not in this code.",
      language: "tsx",
      code: "import { createRoot } from \"react-dom/client\";\n\nfunction App() {\n  return <p>Rendered on {window.location.protocol}</p>;\n}\n\nconst root = createRoot(document.getElementById(\"root\")!);\nroot.render(<App />);"
    }
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
        text: "Greater flexibility and a pure-JavaScript ecosystem, massive enterprise adoption, a larger job market, seamless mobile cross-platform sharing with React Native, and strong TypeScript integration.",
        isCorrect: true,
        explanation: "Correct. React's all-in-JavaScript design means components, state, tests, and mobile targets share one language and one package ecosystem, which simplifies hiring, tooling, and cross-platform work."
      },
      {
        id: "B",
        text: "React's virtual DOM always outperforms Vue's fine-grained reactivity, and its lack of a built-in state library is offset by superior rendering speed in every benchmark.",
        isCorrect: false,
        explanation: "Tempting because the virtual DOM does batch updates and React's ecosystem is speed-obsessed, but Vue 3's Proxy-based reactivity tracks dependencies at the property level and can skip re-renders that React's full-component re-render model triggers; no public benchmark shows React winning in every case."
      },
      {
        id: "C",
        text: "React is the only major framework that supports server-side rendering and static site generation, making it the default choice for production web applications.",
        isCorrect: false,
        explanation: "Tempting because Next.js is highly visible, but Vue's Nuxt framework provides first-class SSR and SSG out of the box, and frameworks like SvelteKit do the same; SSR and SSG are not unique to React."
      },
      {
        id: "D",
        text: "React's component model requires less boilerplate than Vue because it eliminates the need for a template compiler and a separate reactivity system entirely.",
        isCorrect: false,
        explanation: "Tempting because JSX removes a separate template language, but React still requires explicit state declarations, effect hooks, and manual dependency arrays; Vue's reactivity tracks dependencies automatically, which can reduce boilerplate in data-heavy components."
      }
    ],
    correctAnswer: "A",
    explanation: "React is a pure JavaScript library: components are functions that return JSX, state lives in hooks, and the entire toolchain (npm, TypeScript, Jest, React Native) speaks the same language. There is no separate template syntax, no compiler that translates a custom DSL into JavaScript, and no framework-specific reactivity system bolted onto a different language.\n\nIn practice this means a component you write for a Next.js page can be dropped into a React Native app with minimal changes, and every variable you touch is a plain JavaScript value you can inspect, pass to `console.log`, or type-check with TypeScript. The ecosystem reflects this: a large share of the JavaScript and TypeScript package index is built around React, which drives the job market and the volume of community solutions.\n\nVue's single-file components and its own reactivity compiler are a legitimate design choice that trades some of that language-level flexibility for a more constrained, sometimes faster-rendering template. The advantage is therefore contextual: it is strongest when your team already works in TypeScript, needs cross-platform mobile, or relies on a broad npm ecosystem.",
    interviewLine: "React's edge is that the whole stack is one language. I write a component in TypeScript, it compiles to web via Next.js or to native via React Native, and I never leave JavaScript to interact with state, routing, or testing.",
    misconception: "Treating framework comparison as a feature checklist where one library does something the other literally cannot, rather than an ecosystem-and-tooling tradeoff where both can build the same UI but with different languages, compilers, and package graphs.",
    hints: [
      "Look at what language you actually type: is it standard JavaScript with a small extension, or a separate template syntax with its own directives?",
      "Ask whether the framework's ecosystem (packages, mobile, testing) is built in the same language as the component code, and whether cross-platform mobile is a first-class target.",
      "The real differentiator is not raw rendering capability\u2014both can build the same UI\u2014but the language, ecosystem breadth, and cross-platform story."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Every expression here\u2014optional chaining, Array.prototype.slice, .map\u2014is standard JavaScript; no template directives or mustache syntax are needed.",
      language: "tsx",
      code: "type User = { name: string; roles: string[] };\n\nexport function Badge({ user }: { user: User }) {\n  const primary = user.roles[0] ?? \"guest\";\n  const extras = user.roles.slice(1);\n\n  return (\n    <span className=\"badge\">\n      {user.name} <em>{primary}</em>\n      {extras.map((r) => <small key={r}>{r}</small>)}\n    </span>\n  );\n}"
    }
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
        text: "Because the browser cannot render any extension tab unless a physical keyboard is connected.",
        isCorrect: false,
        explanation: "DevTools tabs are DOM elements the browser renders inside its own chrome; they have no dependency on input hardware. A headless or keyboard-less machine still shows every extension tab."
      },
      {
        id: "B",
        text: "The site isn't using React, React hasn't loaded, the page is in an `<iframe>` without hook injection, or `__REACT_DEVTOOLS_GLOBAL_HOOK__` was blocked or disabled.",
        isCorrect: true,
        explanation: "Correct. In every case `hook.inject()` is never called: React is absent, the reconciler hasn't run yet, the extension never injected into that frame, or the global was stripped before React could see it."
      },
      {
        id: "C",
        text: "Because unlocking the React DevTools tab requires purchasing a paid license key from Meta.",
        isCorrect: false,
        explanation: "React is distributed under the MIT licence and the DevTools extension is free and open-source. No purchase, key, or account is involved at any point in the registration flow."
      },
      {
        id: "D",
        text: "Because the React DevTools panel only activates during certain phases of the lunar calendar.",
        isCorrect: false,
        explanation: "The tab appears based on whether `__REACT_DEVTOOLS_GLOBAL_HOOK__` is present in the page scope when React initialises. Celestial events have no bearing on JavaScript execution."
      }
    ],
    correctAnswer: "B",
    explanation: "The React DevTools browser extension injects a global variable, `__REACT_DEVTOOLS_GLOBAL_HOOK__`, into the page's JavaScript context. When React's reconciler finishes loading, it checks whether that global exists and, if so, calls `hook.inject()` to hand its renderer over to the extension. If the global is absent at that moment, React skips registration silently and no tab appears.\n\nIn practice this means the tab is missing when the site simply does not use React, when the extension is not installed or is disabled for that origin, when the page runs inside an `<iframe>` that the extension did not inject into, or when a Content Security Policy or ad blocker strips the global before React's first render. Each of these breaks the same hand-off: the hook must already exist in scope before React checks for it.\n\nA nuance worth naming in an interview: this is not a feature of React itself. React does not open DevTools; it merely registers with a hook that the extension placed there. The failure mode is always one-sided\u2014React never throws, never retries, and the developer sees nothing except a missing tab.",
    interviewLine: "I know the React tab only appears when the extension has placed `__REACT_DEVTOOLS_GLOBAL_HOOK__` in the page before the reconciler runs its one-time registration check. When I see it missing \u2014 no React, extension disabled, isolated iframe, CSP stripping the global \u2014 React skipped `hook.inject()` silently and the tab never showed.",
    misconception: "Learners treat the React tab as a built-in feature of the React library itself, so they look for a React config flag to enable it. In reality the tab is owned by the browser extension; React only passively registers with a global the extension must have injected first.",
    hints: [
      "Think about who creates the bridge between the browser extension and the page: it is the extension, not React.",
      "What global variable does the extension inject, and at what point does React check for it?",
      "The failure is one-directional: React never retries or throws, so the absence of the tab tells you the hook was not present at registration time, not that React is broken."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that when the hook is absent the code simply continues\u2014no error, no retry, just a silent skip that leaves the DevTools tab empty.",
      language: "javascript",
      code: "// Simplified: what React's reconciler does at initialisation\nconst hook =\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined'\n    ? __REACT_DEVTOOLS_GLOBAL_HOOK__\n    : null;\n\nif (hook) {\n  hook.inject({\n    version: '19.1.0',\n    renderer: {\n      createFiber(type, props, key) {\n        return { type, props, key };\n      },\n      getDisplayName(fiber) {\n        return fiber.type?.name ?? 'Anonymous';\n      },\n    },\n  });\n} else {\n  // No hook: React proceeds normally, no tab, no console warning.\n}"
    }
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
        text: "A CSS-in-JS library that uses tagged template literals to define React components with scoped, dynamic CSS styles.",
        isCorrect: true,
        explanation: "Correct. styled-components lets you write CSS inside a backtick string (a tagged template literal) and binds the resulting scoped, hash-named class to the React component at runtime, so styles and component live together."
      },
      {
        id: "B",
        text: "A hardware graphics accelerator card that offloads styled rendering work to the GPU pipeline.",
        isCorrect: false,
        explanation: "Tempting only if you fixate on the word \"styled\" and think of GPU rendering, but styled-components is an npm package that manipulates the DOM's <style> tags; it has no hardware dependency."
      },
      {
        id: "C",
        text: "A database query engine that replaces SQL with a styled, declarative query syntax for data retrieval.",
        isCorrect: false,
        explanation: "No connection to data storage or query parsing; styled-components is a client-side React styling library that injects CSS into the browser, not a backend or ORM tool."
      },
      {
        id: "D",
        text: "A plugin that generates 3D vector graphics for styled scenes inside the Blender modelling tool.",
        isCorrect: false,
        explanation: "Confuses \"styled\" with 3D modelling software; styled-components has no Blender dependency and only produces flat CSS rules applied to HTML elements in a web page."
      }
    ],
    correctAnswer: "A",
    explanation: "styled-components is a CSS-in-JS library for React. You define a component's styles inside a tagged template literal (a backtick string passed to a function), and the library injects a <style> element into the document head carrying a generated, hash-based class name. Because that class name is unique per component definition, styles are scoped to the component without a global stylesheet or BEM naming convention.\n\nIn practice you write `const Button = styled.button` and then real CSS inside the backticks, with JavaScript interpolation for dynamic values such as `color: ${(p) => p.color}`. The component and its styles live in the same file, so there is no separate `.css` file to keep in sync and no risk of two components accidentally sharing a class name.\n\nOne nuance an interviewer may probe: styled-components operates at runtime, not build time. In a Next.js App Router project you would more often reach for CSS Modules or Tailwind, but styled-components still functions inside a `\"use client\"` boundary if the project already depends on it.",
    interviewLine: "styled-components is a CSS-in-JS library where I define a component's styles using a tagged template literal, and it injects a scoped style tag with a generated class name at runtime, so the component and its styles stay in the same file without a separate stylesheet.",
    misconception: "Treating styled-components like a CSS framework you import and consume (\u00e0 la Bootstrap) rather than a library that lets you author new styled components yourself via tagged template literals.",
    hints: [
      "Think about what \"CSS-in-JS\" means in the React ecosystem: CSS written inside JavaScript, not in a separate file.",
      "A tagged template literal (a backtick string passed to a function) lets you interpolate JavaScript expressions inside CSS; which of the options mentions that mechanism?",
      "It is an npm package you install into a React project, not a piece of hardware, a database, or a 3D-modelling tool."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the `elevated` prop changes a CSS value through interpolation, and both cards share the same `Card` definition without a separate CSS file.",
      language: "tsx",
      code: "import styled from \"styled-components\";\n\nconst Card = styled.div`\n  padding: 1rem;\n  border-radius: 8px;\n  background: ${(props) => (props.elevated ? \"#ffffff\" : \"#f5f5f5\")};\n`;\n\nexport function Dashboard() {\n  return (\n    <>\n      <Card>Flat card</Card>\n      <Card elevated>Elevated card</Card>\n    </>\n  );\n}"
    }
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
        text: "A backend database server that persists application records onto magnetic tape storage.",
        isCorrect: false,
        explanation: "Tempting only if you fixate on the word \"relay\" as infrastructure, but Relay is a client-side JavaScript library that runs in the browser alongside React; it has no role as a server and no relationship to storage media."
      },
      {
        id: "B",
        text: "A GraphQL client framework for React built by Meta, with fragment composition, a normalized cache, and build-time query compilation.",
        isCorrect: true,
        explanation: "Correct. Relay is Meta's React-specific GraphQL client: it compiles queries at build time, normalizes responses into an ID-keyed store, and lets each component declare its data needs as a fragment so the UI re-renders automatically when that data changes."
      },
      {
        id: "C",
        text: "A physical electrical relay switch used to control room lighting from a wall panel.",
        isCorrect: false,
        explanation: "A literal reading of the name, but Relay is a software library written in TypeScript that ships as an npm package; it has no hardware component and does not interface with electrical circuits."
      },
      {
        id: "D",
        text: "A CSS styling framework meant to replace Sass for authoring component stylesheets.",
        isCorrect: false,
        explanation: "Tempting if you hear \"framework\" and think styling, but Relay operates on the data layer — fetching, caching, and normalizing server responses — while leaving all presentation to CSS or a styling library of your choice."
      }
    ],
    correctAnswer: "B",
    explanation: "Relay is a GraphQL client framework built by Meta specifically for React. It compiles your queries at build time, stores the fetched results in a normalized cache keyed by object ID, and lets each component declare exactly the fields it needs through a fragment. The component never touches a raw network response; it receives a pre-sliced, ID-addressed object.\n\nIn practice this means two components that both request the same user object share one entry in the store. When a mutation response updates that user's name, Relay writes the new value into the normalized entry and re-renders every component that read it, without you writing a manual state update.\n\nThe trade-off an interviewer will probe: because queries are compiled ahead of time, you cannot assemble a query string dynamically at runtime the way you might with Apollo Client. You gain type safety, deduplication, and predictable cache behaviour in exchange for less ad-hoc flexibility.",
    interviewLine: "I describe Relay as Meta's GraphQL client for React: it compiles my queries at build time, stores results in a normalized ID-keyed cache, and lets each component declare its data as a fragment, so my UI re-renders automatically when any part of that data changes.",
    misconception: "The word \"relay\" evokes infrastructure, hardware, or a server, so candidates reach for a physical or backend interpretation instead of recognizing it as a client-side data-fetching library that lives inside the React component tree.",
    hints: [
      "The word \"relay\" is a brand name, not a description of the technology's domain.",
      "Ask what problem it solves for a React component tree that needs server data.",
      "It is not a server, not hardware, and not a styling tool."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that the component only asks for the fields it actually renders; Relay's compiler and normalized store handle deduplication and cache invalidation behind the scenes.",
      language: "tsx",
      code: "import { graphql, useFragment } from \"react-relay\";\n\nconst PostCardFragment = graphql`\n  fragment PostCardFragment_Post on Post {\n    id\n    title\n    author {\n      id\n      name\n    }\n  }\n`;\n\nfunction PostCard(props: {\n  post: React.ElementRef<typeof PostCardFragment>;\n}) {\n  const post = useFragment(PostCardFragment_Post, props.post);\n  return (\n    <article>\n      <h2>{post.title}</h2>\n      <p>by {post.author.name}</p>\n    </article>\n  );\n}"
    }
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
        text: "`const selectTax = state => { while (true) {} };` // loop until a value emerges",
        isCorrect: false,
        explanation: "Tempting as a \"brute force\" way to derive a value, but a selector must return a result; an infinite loop never does and would freeze the render thread before any subscriber could receive a value."
      },
      {
        id: "B",
        text: "`const selectTax = 'SELECT * FROM taxes WHERE active = 1';` // a SQL query string",
        isCorrect: false,
        explanation: "Sounds like a database query, but Reselect selectors are plain JavaScript functions that read from an in-memory state object; there is no SQL engine, no connection pool, and no string parsing involved."
      },
      {
        id: "C",
        text: "`const selectTax = eval(window.taxString);` // compute the value dynamically at runtime",
        isCorrect: false,
        explanation: "Looks like it could \"compute\" something dynamically, but `eval` executes an arbitrary string with no caching, no reference tracking, and no connection to Reselect's `createSelector` API or its memoization contract."
      },
      {
        id: "D",
        text: "`const selectTax = createSelector([selectSubtotal, selectTaxRate], (subtotal, rate) => subtotal * (rate / 100));`",
        isCorrect: true,
        explanation: "Correct. `createSelector` accepts input selector functions and an output projector, recomputing the projection only when an input's return value changes by reference."
      }
    ],
    correctAnswer: "D",
    explanation: "D is correct. `createSelector` takes one or more input selector functions and a final output projector. It calls each input selector with the current state, passes their results to the projector, and returns the projected value. The key behaviour is memoization: the projector only re-runs when at least one input's return value changes by reference.\n\nIn the question's code, `taxSelector` depends on `subtotalSelector` and `taxPercentSelector`. If the state object is the same reference and neither `items` nor `taxPercent` has changed, calling `taxSelector` again returns the cached `0.172` without re-running the multiplication. This keeps expensive derivations such as reductions, filters, or joins out of the hot render path.\n\nThe nuance an interviewer will probe: memoization is reference-based, not deep-equality. If you replace the `items` array with a new array of identical objects, every selector in the chain recomputes. That is why Redux conventions pass immutable state and why each selector must be a pure function of the slices it reads.",
    interviewLine: "I use `createSelector` to compose input selectors with an output projector so the expensive calculation only re-runs when a dependency's reference actually changes, keeping derived values cheap across re-renders.",
    misconception: "Treating a selector as a data-fetching or querying mechanism (SQL, `eval`) rather than a pure, memoized derivation of an in-memory state slice.",
    hints: [
      "Look at what `createSelector` accepts as arguments and what it returns.",
      "Ask: when does the final function re-execute, and what triggers that?",
      "The answer is a pure function composition with caching, not a loop, a string, or dynamic code execution."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how the projector only re-runs when `todos` or `filter` change by reference, making the filter call effectively free on unrelated state updates.",
      language: "typescript",
      code: "import { createSelector } from 'reselect';\n\nconst selectTodos = (state: AppState) => state.todos;\nconst selectFilter = (state: AppState) => state.filter;\n\nconst selectVisibleTodos = createSelector(\n  [selectTodos, selectFilter],\n  (todos, filter) =>\n    filter === 'all'\n      ? todos\n      : todos.filter((t) => t.status === filter),\n);\n\n// In a component:\nconst visible = useSelector(selectVisibleTodos);\n// `visible` is the same array reference as last render\n// unless `todos` or `filter` changed."
    }
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
        text: "Yes. SVGR or Vite's `?react` suffix transforms the SVG's XML into a React component at build time, so you render it with JSX and style it with CSS.",
        isCorrect: true,
        explanation: "Correct. The bundler runs the SVG through a transform (SVGR or Vite's built-in loader) and emits a React component, giving you inline DOM nodes you control rather than an opaque image URL."
      },
      {
        id: "B",
        text: "No. Bundlers treat SVG as an opaque binary and throw a syntax error when you import it into a TypeScript module.",
        isCorrect: false,
        explanation: "Tempting if you assume bundlers only parse JavaScript and CSS, but both Vite and Webpack have first-class loaders for SVG; the file is valid XML text, not a binary that would break a parser."
      },
      {
        id: "C",
        text: "No. The SVG must first be re-encoded as a base64 data URI string before any bundler will accept the import.",
        isCorrect: false,
        explanation: "Confuses the `data:` URI pattern (used for inlining small assets in HTML) with the bundler's file-resolution step. You import the `.svg` path directly; the bundler handles the rest."
      },
      {
        id: "D",
        text: "No. SVG files are only rendered by desktop vector editors like Adobe Illustrator and cannot be consumed by a web bundler.",
        isCorrect: false,
        explanation: "Mixes up a design-time editor with a runtime context. Every modern browser renders SVG natively via `<img>`, `<object>`, or inline markup, and bundlers simply package the file or transform it into a component."
      }
    ],
    correctAnswer: "A",
    explanation: "Yes. Tools like SVGR (via `@svgr/webpack` in Webpack) or Vite's `?react` import suffix transform the SVG's XML markup into a React component at build time. The import statement in your source never executes the SVG directly; the bundler replaces it with a generated component that renders the same markup as inline DOM nodes.\n\nBecause the result is a component rather than a URL string, you style it with CSS (`fill`, `stroke`), pass props, and it participates in React's reconciliation. An `<img src={logo} />` gives you an opaque box; `<Logo fill=\"currentColor\" />` gives you individual SVG elements you can target, animate, and conditionally render.\n\nThe syntax differs by tool: Create React App with SVGR exposes a named `ReactComponent` export, while Vite (with an SVGR plugin) uses the `?react` query suffix on a default import. You can import the same file both ways in one module, choosing per-use whether you need a URL or a component.",
    interviewLine: "I import the SVG as a React component using SVGR or Vite's `?react` suffix, which inlines the markup at build time so I can style it with CSS and pass props, instead of getting back a URL string I'd have to hand to an `<img>` tag.",
    misconception: "Importing a non-JavaScript file into a TypeScript module is inherently impossible, or the only way to display an SVG in the browser is through a URL in an `<img>` tag.",
    hints: [
      "Think about what the bundler does with the file at build time, not what the browser does at runtime.",
      "Ask yourself: does the import give you a URL string, or does it give you a callable component you can render with JSX?",
      "The `ReactComponent` named export or the `?react` query suffix is the signal that the SVG is being transformed into JSX rather than served as a static asset."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the same file imported two ways in one module: a URL string for the `<img>` tag and a component you can style with `fill` and `className`.",
      language: "tsx",
      code: "import logoUrl from './logo.svg';\nimport { ReactComponent as Logo } from './logo.svg';\n\nconst App = () => (\n  <div>\n    <img src={logoUrl} alt=\"Company logo\" width={48} />\n    <Logo className=\"logo\" fill=\"currentColor\" />\n  </div>\n);\n\nexport default App;"
    }
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
        text: "Numbers cannot be passed as props because JSX treats all attribute values as strings, so `age={30}` would be a syntax error.",
        isCorrect: false,
        explanation: "Tempting if you conflate JSX with HTML attributes, where every value is a string. But JSX curly braces let you pass any JavaScript value\u2014numbers, booleans, objects, functions\u2014so `<User age={30} />` is perfectly valid."
      },
      {
        id: "B",
        text: "Prefix numbers with `#` as in `<User age=#30 />`; the `#` prefix signals a numeric literal, similar to CSS hex color values.",
        isCorrect: false,
        explanation: "The `#` character has no special meaning in JSX attribute syntax; it is not a numeric-literal marker the way it is in CSS hex colors. Written this way the attribute is either a syntax error or parsed as part of a string, not as a number."
      },
      {
        id: "C",
        text: "Wrap the number in HTML comments as in `<User age=<!-- 30 --> />`; the comment syntax embeds a raw value that bypasses string parsing.",
        isCorrect: false,
        explanation: "HTML comments are block-level markup constructs, not expression syntax. Inside a JSX attribute value they are a syntax error; the JSX parser does not interpret `<!-- -->` as a way to embed a raw value."
      },
      {
        id: "D",
        text: "Wrap the number in curly braces as in `<User age={30} />`; without braces, `age='30'` passes a string instead of a number.",
        isCorrect: true,
        explanation: "Correct. Curly braces evaluate their content as a JavaScript expression, so `{30}` yields the number `30`, while the quoted form `'30'` is always a string literal."
      }
    ],
    correctAnswer: "D",
    explanation: "In JSX, a quoted attribute value like `age='30'` is always the JavaScript string `'30'`. Wrapping the value in curly braces, `age={30}`, tells the JSX compiler to evaluate the content as a JavaScript expression, so the prop receives the number `30` rather than a string.\n\nThis distinction matters at runtime. If a component checks `typeof age`, it gets `'string'` for the quoted form and `'number'` for the braced form. Arithmetic like `age + 1` silently concatenates to `'301'` instead of adding to `31`, and a TypeScript prop typed as `number` will reject the string at compile time.\n\nThe braces are not special to numbers; they work for any JavaScript expression, including `age={user.years * 2}` or `age={Number(ageStr)}`. The rule is simply: quotes produce a literal string, braces produce whatever the expression evaluates to.",
    interviewLine: "I remind people that in JSX a quoted value like `age='30'` is always the string `'30'`, so I wrap it in braces as `age={30}` to have the content evaluated as a JavaScript expression and pass the actual number `30`.",
    misconception: "Treating JSX attributes like HTML attributes where every value is implicitly a string, and not recognizing that curly braces switch the context from a string literal to a JavaScript expression.",
    hints: [
      "Compare what the JSX compiler emits for `age={30}` versus `age='30'`\u2014one is an expression, the other is a string literal.",
      "Ask what `typeof age` returns inside the child component for each form, and what `age + 1` evaluates to.",
      "The `#` prefix and HTML-comment syntax are not part of the JSX attribute grammar; they will not produce a numeric value."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `typeof count` reveals the runtime type, and how TypeScript flags the string where a number is expected.",
      language: "tsx",
      code: "function Badge({ count }: { count: number }) {\n  console.log(typeof count);\n  return <span>{count}</span>;\n}\n\nfunction App() {\n  return (\n    <div>\n      <Badge count={5} />\n      {/* <Badge count=\"5\" /> \u2014 Type 'string' is not assignable to type 'number' */}\n    </div>\n  );\n}"
    }
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
        text: "Deprecated legacy helper functions that React quietly removed in the React 18 release.",
        isCorrect: false,
        explanation: "Tempting if you picture hooks as a short-lived experiment, but they are the standard way to write components in every React release since 16.8; nothing was removed in 18."
      },
      {
        id: "B",
        text: "Functions prefixed with `use` that give functional components access to state and lifecycle features.",
        isCorrect: true,
        explanation: "Correct. Hooks are the functions prefixed with `use` that give functional components access to state, effects, and context, replacing the class-based lifecycle API."
      },
      {
        id: "C",
        text: "A family of CSS utility classes used to style hyperlinks and anchor states on a page.",
        isCorrect: false,
        explanation: "Conflates the word \"hook\" with \"link\" in web-dev vocabulary, but hooks are JavaScript functions that manage state and effects, not CSS selectors."
      },
      {
        id: "D",
        text: "Physical mounting hardware used to hang computer monitors and displays onto walls.",
        isCorrect: false,
        explanation: "Takes the word literally as a physical object; in React, hooks are purely a programming construct with no hardware meaning."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks are functions, by convention prefixed with `use`, that let a plain JavaScript function component use state, side effects, context, and other React features. They were introduced in React 16.8. React tracks each hook call by its position in the component body, so the first `useState` always maps to the first piece of stored state, the second to the second, and so on.\n\nIn the prompt's code, `useState(0)` gives the `Example` function a `count` value and a `setCount` updater. Without hooks, the same counter would require a `class` component with `this.state.count` and lifecycle methods like `componentDidMount`. The hook removes that ceremony: the function runs, React records the hook, and the next render re-runs the function with the stored value.\n\nThe constraint an interviewer will probe next: hooks must be called unconditionally at the top level of the component or a custom hook. Wrapping `useState` in an `if` or a loop changes the call order between renders, and React can no longer match the call to the right stored state.",
    interviewLine: "I describe hooks as functions prefixed with `use` that let my plain function component use state, effects, and context; since React tracks them by call position, I always run them unconditionally at the top level.",
    misconception: "Thinking of hooks as a one-time initialization that runs once per component, when in fact every hook call re-executes on every render and React matches each call to its stored state by call order.",
    hints: [
      "Look at the naming convention: every function called in the component body starts with a specific prefix.",
      "Ask what `useState(0)` gives the function that a plain `let count = 0` does not.",
      "They are the standard component API in every React release since 16.8, not a deprecated experiment."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that `useCountdown` is itself a hook: it calls `useState` and `useEffect`, and the component that calls it gets state and a side effect from a single function.",
      language: "tsx",
      code: "import { useState, useEffect } from 'react';\n\nfunction useCountdown(initial: number) {\n  const [seconds, setSeconds] = useState(initial);\n\n  useEffect(() => {\n    if (seconds <= 0) return;\n    const id = setInterval(() => setSeconds(s => s - 1), 1000);\n    return () => clearInterval(id);\n  }, [seconds]);\n\n  return [seconds, setSeconds] as const;\n}\n\nfunction Timer() {\n  const [seconds, setSeconds] = useCountdown(5);\n  return <p>{seconds > 0 ? `Starts in ${seconds}s` : 'Go!'}</p>;\n}"
    }
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
        text: "There are no rules for using Hooks; they behave like any ordinary function call.",
        isCorrect: false,
        explanation: "Tempting if you treat hooks as plain utilities, but React's internal state list is positional. The runtime and the eslint-plugin-react-hooks rule both enforce the two rules, and violating them causes React to throw on the render where the hook count changes, though the message points at the count rather than the conditional that caused it."
      },
      {
        id: "B",
        text: "1) Call Hooks exclusively inside class render() methods; 2) Pass all hook values through eval() to make them reactive.",
        isCorrect: false,
        explanation: "Hooks were introduced precisely because class components cannot use them; there is no render() method to call them from. Passing values through eval() has no connection to React's scheduling or state system and would raise a runtime error in any modern bundler."
      },
      {
        id: "C",
        text: "1) Only call Hooks inside if statements so they run only when needed; 2) Call Hooks from plain JavaScript helper classes to keep logic testable.",
        isCorrect: false,
        explanation: "Inverts rule one: a conditional hook shifts every subsequent hook's index on renders where the branch is skipped, corrupting state. Rule two requires the caller to be a React function component or a custom hook, not an arbitrary class."
      },
      {
        id: "D",
        text: "1) Only call Hooks at the top level (never inside loops, conditions, or nested functions); 2) Only call Hooks from React function components or custom Hooks.",
        isCorrect: true,
        explanation: "Correct. Both rules guarantee that the call order is identical on every render, so React's internal per-hook state list stays aligned with the right hook on each pass."
      }
    ],
    correctAnswer: "D",
    explanation: "React stores each hook's state in a per-component internal list, indexed by the order the hook is called. The two rules exist to keep that order identical on every render. Rule one: call hooks only at the top level of your component or custom hook, never inside loops, conditions, or nested functions. Rule two: call hooks only from a React function component or from another custom hook.\n\nIf you wrap a useState call in an if, the hook's index shifts on renders where the branch is skipped. React detects the changed hook count and throws, but the message only notes that the number of hooks differs from the previous render, not which state landed in the wrong slot. Tracing the cause back to the offending conditional is still manual work, and any effects that already ran on the prior render may have consumed mismatched state.\n\nA custom hook is just a regular function that happens to call hooks, so it satisfies rule two. The constraint is on the caller's context, not on the callee's name. You can split logic into useAuth, useFetch, and so on, and call them at the top level of your component without violating either rule.",
    interviewLine: "React tracks hook state by call order in a per-component list, so I always call hooks at the top level of a function component or a custom hook. If I put a useState inside an if, the index shifts on the next render and React reads the wrong slot's state without throwing.",
    misconception: "Hooks are treated as ordinary utility functions you can invoke anywhere, missing that React stores their state in a per-component list indexed by call order, so any shift in order silently reassigns state to the wrong hook.",
    hints: [
      "Think about what React does between renders to keep a hook's value stable: it matches hooks to state by position, not by name.",
      "Ask yourself: if a render skips a branch, what happens to every hook that was registered after that branch?",
      "The second rule is about where the call originates, not about the hook's name. A function that calls hooks is itself a hook, but a plain class method is not a valid caller."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how all hook calls sit above the early return, so the hook order is identical on every render whether user is null or not.",
      language: "tsx",
      code: "function Profile({ user }: { user: User | null }) {\n  const [tab, setTab] = useState(\"overview\");\n  const [filters, setFilters] = useState<Filter[]>([]);\n\n  if (!user) {\n    return <Login />;\n  }\n\n  return (\n    <Tabs tab={tab} setTab={setTab}>\n      <FilterBar filters={filters} setFilters={setFilters} />\n    </Tabs>\n  );\n}"
    }
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
        text: "Disable every ESLint rule so that no hook-related warnings appear in the editor or in CI.",
        isCorrect: false,
        explanation: "Tempting if you treat warnings as noise, but silencing the linter removes the only automated check that catches a hook called inside a conditional or a missing dependency before the code runs."
      },
      {
        id: "B",
        text: "Install and configure the official ESLint plugin `eslint-plugin-react-hooks` with rules `rules-of-hooks: 'error'` and `exhaustive-deps: 'warn'`.",
        isCorrect: true,
        explanation: "Correct. This is the official static-analysis plugin from the React team; `rules-of-hooks` hard-errors on conditional or nested hook calls, and `exhaustive-deps` warns when a reactive value is missing from a dependency array."
      },
      {
        id: "C",
        text: "Manually count the lines of code in every file each morning to spot misplaced hook calls.",
        isCorrect: false,
        explanation: "This confuses code volume with code correctness. No amount of manual line-counting inspects whether a hook was called inside a loop or whether a dependency array is complete."
      },
      {
        id: "D",
        text: "Run the components through a Java compiler before deploying to validate the hook calls.",
        isCorrect: false,
        explanation: "React hooks live in JavaScript or TypeScript source files executed by a JS runtime. A Java compiler never sees those files, so it cannot validate hook call order or dependency lists."
      }
    ],
    correctAnswer: "B",
    explanation: "The React team maintains `eslint-plugin-react-hooks`, a static-analysis plugin that ships two rules: `rules-of-hooks`, which errors when a hook is called inside a loop, conditional, or nested function, and `exhaustive-deps`, which warns when a reactive value read inside `useEffect`, `useMemo`, or `useCallback` is missing from the dependency array. You add the plugin to your ESLint configuration and set each rule to `error` or `warn`.\n\nWithout this check, a developer can write `if (ready) { const [x, setX] = useState(0) }` or forget `user.id` in a `useEffect` dependency list, and neither the TypeScript compiler nor the React runtime will flag it. The linter catches both in the editor and in CI before the code ships.\n\nThe common pairing is `rules-of-hooks: \"error\"` and `exhaustive-deps: \"warn\"`. The first rule is deterministic \u2014 a conditional hook call is always a bug. The second is a heuristic: it cannot always tell whether a value is stable across renders, so it over-reports in edge cases like optional-chaining or computed keys. Treating it as a warning keeps the signal useful without blocking on false positives.",
    interviewLine: "I configure `eslint-plugin-react-hooks` in every project: `rules-of-hooks` as an error because a conditional hook call is always a bug, and `exhaustive-deps` as a warning because the heuristic occasionally over-reports on values that are stable but not obviously so to the linter.",
    misconception: "Hook rules are enforced by the React runtime at execution time, so you only need to be careful while writing code. In reality, a hook called inside an `if` block or a missing dependency produces no runtime error in most cases \u2014 the only reliable guard is static analysis on the source.",
    hints: [
      "Look for a tool that runs on your source files before the browser ever executes them.",
      "Ask which two rules the React team ships specifically for hook call-site and dependency-array checking.",
      "The answer is not a runtime check \u2014 it is a static-analysis rule you wire into your existing linter."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Two violations in one component: a conditional `useState` call and a missing `query` dependency \u2014 both caught by the two rules before the code ever runs.",
      language: "tsx",
      code: "\"use client\"\nimport { useState, useEffect } from \"react\"\n\nexport function SearchBar({ query }: { query: string }) {\n  const [results, setResults] = useState<string[]>([])\n\n  useEffect(() => {\n    fetch(`/api/search?q=${query}`)\n      .then((r) => r.json())\n      .then(setResults)\n  }) // exhaustive-deps: \"query\" is missing\n\n  if (query.length > 3) {\n    const [extra, setExtra] = useState(\"\") // rules-of-hooks: called conditionally\n  }\n\n  return <input value={query} readOnly />\n}"
    }
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
        text: "Removes the need for any JavaScript by handling routing entirely through static HTML attributes",
        isCorrect: false,
        explanation: "Tempting if you equate 'declarative' with 'no code at all,' but `<Route>` is still a JavaScript component you import and configure with props like `path` and `render`. The router library itself is JavaScript running in the browser's engine; it does not replace your code with markup."
      },
      {
        id: "B",
        text: "Synchronizes the browser URL with server-rendered HTML so every route change is handled without a JavaScript engine",
        isCorrect: false,
        explanation: "This describes full server-side rendering, not client-side routing. React Router v4 runs entirely in the browser's JavaScript engine; the server only serves the initial HTML shell. Subsequent navigation is handled client-side without a full page reload, which is the opposite of what this option implies."
      },
      {
        id: "C",
        text: "Replaces the browser's native history API with a custom stack persisted in local storage to survive page refreshes",
        isCorrect: false,
        explanation: "React Router uses the browser's `history` API (`pushState`, `popstate`) to update the URL and listen for back and forward. It does not store navigation state in local storage; refreshing the page still triggers a full server request unless you add a separate persistence layer yourself."
      },
      {
        id: "D",
        text: "Declarative component-based routing (`<Route>` is a standard React component), dynamic routing during render rather than static config, and modular packaging (`react-router-dom`).",
        isCorrect: true,
        explanation: "Correct. v4's core design is that routes are React components rendered during the normal render cycle, and the package split lets each platform include only the adapter it needs."
      }
    ],
    correctAnswer: "D",
    explanation: "React Router v4 made routing a component concern. `<Route>` is a standard React component you place in JSX; it renders its children when the current URL matches its `path` prop. No separate configuration array, no imperative `history` registration. The router (`<BrowserRouter>`) simply provides the location and history context that child routes read during the normal render pass.\n\nBecause routes are ordinary components, you can nest them, conditionally render them, and compose them inside layout components without a central config file. The package split (`react-router` core, `react-router-dom` for the browser, `react-router-native` for React Native) means each platform bundles only the adapter it needs, keeping the core engine small.\n\nThe trade-off an interviewer will probe: because matching happens during render, a route's component is mounted and unmounted as the URL changes. There is no central router lifecycle to hook into, so you manage state cleanup yourself with `useEffect`. In practice this means a route that fetches data on mount must cancel that fetch on unmount, or you leak in-flight requests.",
    interviewLine: "React Router v4 treats routes as components, so `<Route>` participates in the normal render cycle and I can nest or conditionally render it anywhere in the tree. The trade-off is that there is no central router lifecycle; mount and unmount follow React's usual rules, so I manage data-fetching cleanup with `useEffect`.",
    misconception: "Treating 'declarative routing' as a separate system outside React's component model, when in fact `<Route>` is just a component that participates in the same render and reconciliation pass as everything else in the tree.",
    hints: [
      "In v4, where does the route-to-component mapping live \u2014 in a config file, or in the JSX tree itself?",
      "Ask whether `<Route>` is a React component you import and render, or an external routing engine that React talks to.",
      "The package name `react-router-dom` hints at a split. What does the `-dom` suffix separate from the core?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice how the route is conditionally included in the tree based on app state, which is only possible because it is a component.",
      language: "tsx",
      code: "import { Route, Link } from \"react-router-dom\";\n\nfunction AdminPanel({ isAdmin }: { isAdmin: boolean }) {\n  return (\n    <div>\n      <Link to=\"/admin/users\">Users</Link>\n      {isAdmin ? (\n        <Route path=\"/admin/users\" render={() => <UserList />} />\n      ) : (\n        <Route path=\"/admin/users\" render={() => <Forbidden />} />\n      )}\n    </div>\n  );\n}"
    }
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
        text: "Props that are permanently frozen and can never be changed by the parent that passes them.",
        isCorrect: false,
        explanation: "Default props are only used when the parent does not provide a value for a prop; the parent can still pass and change that prop freely."
      },
      {
        id: "B",
        text: "A special category of props that are restricted to accepting only boolean `true`/`false` values.",
        isCorrect: false,
        explanation: "Default props can supply a fallback of any data type — strings, numbers, functions, objects — not only booleans."
      },
      {
        id: "C",
        text: "A built-in CSS stylesheet React ships to style default buttons and form controls consistently.",
        isCorrect: false,
        explanation: "`defaultProps` defines fallback prop values in JavaScript; it has nothing to do with CSS or styling."
      },
      {
        id: "D",
        text: "A `MyComponent.defaultProps = { color: 'blue' }` property giving fallbacks for `undefined` props; in function components, ES6 default parameters are now preferred.",
        isCorrect: true,
        explanation: "Correct. `defaultProps` supplied default prop values for undefined props; in modern functional components, standard JavaScript default parameters are the recommended approach."
      }
    ],
    correctAnswer: "D",
    explanation: "`defaultProps` was a static property on a component (`MyButton.defaultProps = { color: 'red' }`) that supplied a value whenever the incoming prop was `undefined`. It never filled in `null`: passing `color={null}` kept the value `null`, because only the absence of a value triggered the fallback.\n\nIn modern function components you express the same intent with ordinary JavaScript default parameters while destructuring props: `function Button({ color = 'red' })`. React 19 removed `defaultProps` support from function components entirely, so default parameters are now the only pattern that works there.\n\nThe edge case worth naming is the `undefined`-versus-`null` distinction: a default parameter also fires only for `undefined`, so the two approaches agree. Passing `null` explicitly still bypasses both.",
    interviewLine: "I use default parameters when destructuring props, because React 19 removed `defaultProps` from function components and both only kick in for `undefined`, never `null`.",
    misconception: "Believing `defaultProps` fills in `null` as well as missing props. It only replaces `undefined`, and React 19 dropped it from function components entirely.",
    hints: [
      "Look at exactly which incoming value triggers the fallback.",
      "Ask whether a default fires for a prop that is missing versus one explicitly set to `null`.",
      "In a modern function component, what plain JavaScript syntax gives the same fallback?"
    ],
    example: {
      caption: "Default parameters replace defaultProps and only apply when the prop is undefined.",
      language: "tsx",
      code: "function Badge({ color = 'blue', label }: { color?: string; label: string }) {\n  return <span style={{ color }}>{label}</span>;\n}\n\n<Badge label=\"new\" />;             // color is 'blue'\n<Badge label=\"old\" color={undefined} />; // still 'blue'\n<Badge label=\"edge\" color={null as unknown as string} />; // stays null, no fallback"
    },
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
        text: "React only runs inside Google Chrome on Android phones and nowhere else on the web.",
        isCorrect: false,
        explanation: "React works across all modern desktop, tablet, and mobile browsers; it is not tied to one browser or device class."
      },
      {
        id: "B",
        text: "All evergreen browsers (Chrome, Firefox, Safari, Edge); IE9-11 needed ES2015 polyfills, and React 18+ dropped IE support entirely.",
        isCorrect: true,
        explanation: "Correct. React supports all modern standard-compliant browsers; legacy IE support was formally discontinued in React 18."
      },
      {
        id: "C",
        text: "React only renders inside terminal text browsers such as Lynx that lack a graphical DOM.",
        isCorrect: false,
        explanation: "React renders into a modern graphical browser DOM; a text-only terminal browser has no DOM for React to drive."
      },
      {
        id: "D",
        text: "React requires a special web browser manufactured exclusively by Meta to run its applications.",
        isCorrect: false,
        explanation: "React runs on any W3C standard-compliant web browser; there is no Meta-specific browser requirement."
      }
    ],
    correctAnswer: "B",
    explanation: "React runs in every modern evergreen browser: current Chrome, Firefox, Safari and Edge all execute its compiled JavaScript without special handling. The browser only ever sees standard ECMAScript, so support tracks whatever your build target emits.\n\nHistorically React could run in Internet Explorer 9 through 11, but only with polyfills for `Map`, `Set`, `Promise` and other ES2015 globals that IE never shipped. React 18 formally dropped Internet Explorer support, so modern React assumes a browser with native ES2015+.\n\nThe practical takeaway for an interviewer is that compatibility is a build-tooling question, not a React one: your transpiler target and polyfill set decide how far back you reach, and legacy IE is no longer on the supported list.",
    interviewLine: "I'd say React runs in all evergreen browsers; IE9-11 needed ES2015 polyfills, and React 18 dropped IE entirely, so for me compatibility now comes down to the build target I choose.",
    misconception: "Assuming React still officially supports Internet Explorer. React 18 dropped IE; modern support is limited to evergreen browsers plus whatever your build targets.",
    hints: [
      "Remember the browser never sees React source, only compiled JavaScript.",
      "Ask what the browser must support natively versus what a polyfill can backfill.",
      "A specific major version removed legacy IE support, moving the floor to evergreen engines."
    ],
    example: {
      caption: "A browserslist target drives which browsers your build and polyfills actually cover.",
      language: "json",
      code: "{\n  \"browserslist\": {\n    \"production\": [\">0.2%\", \"not dead\", \"not op_mini all\"],\n    \"development\": [\"last 1 chrome version\", \"last 1 firefox version\"]\n  }\n}"
    },
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
        text: "Yes — React 16+ supports all standard and custom HTML/SVG attributes, using camelCase (`tabIndex`, `readOnly`) and preserving `data-*`/`aria-*`.",
        isCorrect: true,
        explanation: "Correct. React passes all recognized and custom attributes to the DOM, using camelCase naming conventions aligned with DOM properties."
      },
      {
        id: "B",
        text: "No, React requires every HTML attribute to be written as an uppercase XML-style tag name.",
        isCorrect: false,
        explanation: "React uses standard camelCase JavaScript naming (for example `onClick`, `tabIndex`), not uppercase XML tags."
      },
      {
        id: "C",
        text: "No, custom attributes are illegal in React and cause the build to crash during compilation.",
        isCorrect: false,
        explanation: "Custom attributes and `data-*` / `aria-*` attributes are fully supported and passed straight through to the DOM."
      },
      {
        id: "D",
        text: "No, React supports only `id` and `class`, silently stripping every other HTML attribute from output.",
        isCorrect: false,
        explanation: "React supports the full HTML5 and SVG attribute sets, not just `id` and `class`."
      }
    ],
    correctAnswer: "A",
    explanation: "Since React 16, the renderer passes through all standard and custom DOM attributes. Standard attributes use camelCase that mirrors the DOM property names (`tabIndex`, `readOnly`, `className`), and unknown or custom attributes are written to the DOM as-is instead of being dropped.\n\nThat means `data-*` and `aria-*` attributes work verbatim, and arbitrary custom attributes reach the element rather than triggering a warning. SVG attributes are covered by the same rule, so you can author SVG in JSX with the expected names.\n\nThe nuance to flag is the handful of reserved names that collide with JavaScript or JSX: `class` becomes `className` and `for` becomes `htmlFor`, because `class` and `for` are reserved words. Everything else maps predictably from its DOM property.",
    interviewLine: "I rely on React 16+ forwarding every standard and custom attribute in DOM-style camelCase, and I only remember `className` and `htmlFor` as renames, because `class` and `for` are reserved words.",
    misconception: "Thinking React silently strips unknown attributes. Since React 16 it forwards custom and `data-*`/`aria-*` attributes to the DOM; only `class` and `for` are renamed.",
    hints: [
      "Compare the JSX attribute name with the matching DOM property name.",
      "Ask what happens to a custom `data-` attribute that is not part of the HTML spec.",
      "Two attribute names are special because they clash with JavaScript keywords."
    ],
    example: {
      caption: "Standard, data, and aria attributes all pass straight to the DOM node.",
      language: "tsx",
      code: "function Row() {\n  return (\n    <div\n      className=\"row\"\n      tabIndex={-1}\n      data-row-id=\"42\"\n      aria-selected={true}\n    >\n      Selectable row\n    </div>\n  );\n}"
    },
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
        text: "A prop defaults to `true` only when its name happens to begin with the capital letter 'Z'.",
        isCorrect: false,
        explanation: "Any boolean attribute passed without a value evaluates to `true` in JSX, regardless of its name."
      },
      {
        id: "C",
        text: "A bare prop defaults to `true` only while the machine has an active internet connection.",
        isCorrect: false,
        explanation: "JSX attribute evaluation is pure compile-time syntax resolution; network state has no bearing on it."
      },
      {
        id: "D",
        text: "A prop written with no assigned value defaults to `null` rather than to a boolean.",
        isCorrect: false,
        explanation: "A bare attribute defaults to the boolean `true` in JSX, not to `null`."
      }
    ],
    correctAnswer: "A",
    explanation: "In JSX, writing a prop name with no value assigns it `true`. `<MyInput autoComplete />` is exactly `<MyInput autoComplete={true} />`, which mirrors how boolean HTML attributes behave, where the presence of the attribute means it is on.\n\nThis is purely a JSX shorthand resolved at compile time; the attribute becomes a prop whose value is the boolean `true`. It applies to any bare attribute, not a special list of names.\n\nThe reason the React docs discourage relying on it is readability: a bare `<Input value />` is easy to confuse with the ES2015 object shorthand `{ value }`, so being explicit with `value={true}` keeps intent clear.",
    interviewLine: "A bare JSX attribute compiles to `={true}`, mirroring HTML boolean attributes, though I write the `true` out so it isn't mistaken for object shorthand.",
    misconception: "Expecting a value-less JSX prop to be `null`, `\"\"`, or undefined. JSX resolves a bare attribute to the boolean `true`, matching HTML boolean attributes.",
    hints: [
      "Think about how a boolean HTML attribute behaves when it appears with no value.",
      "Ask what single value JSX substitutes when an attribute has no explicit assignment.",
      "It is a compile-time shorthand, not a runtime default pulled from the prop type."
    ],
    example: {
      caption: "A bare attribute and its explicit boolean form compile to the same props.",
      language: "tsx",
      code: "function Toggle({ disabled }: { disabled?: boolean }) {\n  return <button disabled={disabled}>Save</button>;\n}\n\n<Toggle disabled />;        // disabled is true\n<Toggle disabled={true} />; // identical\n<Toggle />;                 // disabled is undefined, so false"
    },
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
        text: "Event handlers cannot be passed to your own custom components, only to built-in HTML elements.",
        isCorrect: false,
        explanation: "Passing callback functions via props is standard unidirectional communication in React and works for any component."
      },
      {
        id: "B",
        text: "Pass the handler as a string of code, as in `<button onClick='handleClick()'>`, like HTML.",
        isCorrect: false,
        explanation: "String event handlers are invalid in React and trigger console warnings; React expects a function reference."
      },
      {
        id: "C",
        text: "Pass the handler as a function reference in curly braces, e.g. `<button onClick={handleClick}>` or `<Child onSelect={handleSelect} />`.",
        isCorrect: true,
        explanation: "Correct. In React, event handlers are passed as function references via JSX props in curly braces `{}` rather than string attributes."
      },
      {
        id: "D",
        text: "Write raw C++ function pointers directly into the DOM node to bind the handler.",
        isCorrect: false,
        explanation: "React uses standard JavaScript function references passed as props, not native pointers."
      }
    ],
    correctAnswer: "C",
    explanation: "You pass an event handler the same way you pass any other prop: a function reference inside JSX curly braces. `<button onClick={handleClick}>` hands React the function itself, and React invokes it when the synthetic event fires. For your own components you choose the prop name, for example `<Child onSelect={handleSelect} />`.\n\nThe braces matter because they embed a JavaScript expression. Quoting it as a string (`onClick=\"handleClick\"`) passes the literal text, not the function, and React warns about it. Writing `onClick={handleClick()}` is the other common slip: that calls the function during render and passes its return value instead of the handler.\n\nThe subtlety worth raising is identity: passing an inline arrow creates a new function every render, which can defeat memoized children, so stable handlers often come from `useCallback` or a method reference.",
    interviewLine: "I pass handlers as function references in braces, like `onClick={handleClick}`, never a string and never `handleClick()`, which would call it during render.",
    misconception: "Passing a handler as a string or calling it with `()` in JSX. Braces embed a reference React calls later; a string or a call runs the wrong thing.",
    hints: [
      "Look at what the curly braces actually contain, a value or a call.",
      "Ask whether React should receive the function or the result of running it.",
      "The trap is adding `()`, which invokes the handler at render time instead of on the event."
    ],
    example: {
      caption: "Pass the reference, not a call, and name the prop whatever the child expects.",
      language: "tsx",
      code: "function List({ onPick }: { onPick: (id: number) => void }) {\n  return <button onClick={() => onPick(1)}>Pick first</button>;\n}\n\nfunction Parent() {\n  const handlePick = (id: number) => console.log(id);\n  return <List onPick={handlePick} />;\n}"
    },
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
        text: "Reload the entire browser tab on every keypress so the handler is reset each time.",
        isCorrect: false,
        explanation: "Reloading the page destroys application state and user experience; it does not limit how often a handler runs."
      },
      {
        id: "B",
        text: "Disable the user's mouse and keyboard drivers so the events can no longer reach the handler.",
        isCorrect: false,
        explanation: "Software throttling and debouncing limit event-handler frequency cleanly, without disabling the user's input devices."
      },
      {
        id: "C",
        text: "Throttle (cap it to once per time window) or debounce (run only after activity pauses), e.g. with lodash `throttle`/`debounce`.",
        isCorrect: true,
        explanation: "Correct. Throttling and debouncing prevent expensive event handlers (scroll, resize, search input keystrokes) from firing excessively on rapid user actions."
      },
      {
        id: "D",
        text: "Write a synchronous infinite `while` loop that busy-waits five seconds between invocations.",
        isCorrect: false,
        explanation: "Synchronous loops lock up the main thread and freeze the browser; they do not throttle a handler."
      }
    ],
    correctAnswer: "C",
    explanation: "To stop a handler from firing too often you limit its rate rather than its correctness. Throttling caps execution to at most once per time window, so a scroll or resize handler runs on a steady cadence no matter how many events arrive. Debouncing waits for a pause: it only runs after events stop for a set interval, which fits search-as-you-type where you want the final keystroke.\n\nIn practice you wrap the callback with a utility such as lodash `throttle` or `debounce`, or schedule with `requestAnimationFrame` for visual work that should align to frames. In React you keep the debounced function stable across renders, typically with `useMemo` or `useRef`, so each render does not create a fresh timer.\n\nThe nuance an interviewer probes is cleanup: a pending debounce or interval should be cancelled on unmount, and you should pick throttle versus debounce by whether you want regular updates or only the last one.",
    interviewLine: "I throttle when I want a steady cadence on scroll or resize and debounce when I only care about the final event, like search input, then cancel the pending timer on unmount.",
    misconception: "Confusing throttle and debounce. Throttle runs at most once per window; debounce runs only after activity stops, so they fit different event patterns.",
    hints: [
      "Separate the two goals: a fixed cadence versus firing only after a pause.",
      "Ask which one you want for a scroll handler and which for a search box.",
      "In React the limiter must stay stable across renders or you recreate the timer each time."
    ],
    example: {
      caption: "A debounced value hook that fires only after typing pauses.",
      language: "tsx",
      code: "function useDebounced<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}"
    },
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
        text: "Because JavaScript raises a hardware CPU panic the moment any prop object is edited in place.",
        isCorrect: false,
        explanation: "JavaScript allows object mutation; React enforces prop immutability by architectural convention and runtime warnings, not a hardware guard."
      },
      {
        id: "C",
        text: "Props are actually mutable, and child components are encouraged to overwrite them as needed.",
        isCorrect: false,
        explanation: "Modifying props in a child violates React's pure-component contract; the child must request changes through a callback instead."
      },
      {
        id: "D",
        text: "Because props are physically stored in read-only CD-ROM storage that cannot be rewritten.",
        isCorrect: false,
        explanation: "Props are in-memory JavaScript objects; the read-only rule is an architectural contract, not a storage medium."
      }
    ],
    correctAnswer: "A",
    explanation: "React's core contract is that a component must behave like a pure function of its props: given the same props it returns the same output and never mutates them. Props are owned by the parent that passed them, so a child reassigning or mutating a prop breaks the single source of truth for that data.\n\nThe rule exists because React decides what to re-render by comparing values it controls. If a child quietly mutates a prop object, the parent's state and the rendered UI drift apart, producing bugs that are hard to trace because nothing told React the data changed.\n\nThe nuance to raise is that read-only is a contract, not hardware enforcement: JavaScript will happily let you mutate a prop object. Tools like `Object.freeze`, TypeScript `readonly`, and lint rules catch violations, but the discipline is yours to keep.",
    interviewLine: "Components are pure functions of their props, so I never mutate a prop; I lift state up or send changes back through a callback instead.",
    misconception: "Treating a passed-in object prop as scratch space. Props belong to the parent; mutating one desyncs its state from the rendered UI.",
    hints: [
      "Ask who owns the data a prop carries, the parent or the child.",
      "Think about what React compares to decide whether to re-render.",
      "Nothing in JavaScript stops the mutation; the read-only rule is a contract you enforce."
    ],
    example: {
      caption: "A child reports changes upward instead of mutating the prop it received.",
      language: "tsx",
      code: "function Counter({ value, onChange }: { value: number; onChange: (n: number) => void }) {\n  // Do NOT do: value++ or props.value = ...\n  return <button onClick={() => onChange(value + 1)}>{value}</button>;\n}"
    },
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
        text: "React favors composition over inheritance: props and `children` let you customize look and behavior without rigid class hierarchies.",
        isCorrect: true,
        explanation: "Correct. Decades of React development at Meta and across the industry showed that component composition and custom hooks solve all UI reuse cases without class inheritance."
      },
      {
        id: "B",
        text: "Because JavaScript has no `class` keyword, so inheritance is impossible to express in the first place.",
        isCorrect: false,
        explanation: "JavaScript supports ES6 classes, but React's architecture intentionally favors composition over inheritance."
      },
      {
        id: "C",
        text: "Because deep inheritance chains make the computer's CPU overheat under rendering load.",
        isCorrect: false,
        explanation: "Composition provides clearer, more modular, flexible code architecture than inheritance; hardware temperature is irrelevant."
      },
      {
        id: "D",
        text: "Because the W3C formally banned class inheritance in web applications back in 2018.",
        isCorrect: false,
        explanation: "The W3C standardizes web-platform APIs; React's preference for composition is an architectural design decision, not a ban."
      }
    ],
    correctAnswer: "A",
    explanation: "React recommends composition over inheritance for reuse. Props plus the special `children` prop let a component wrap and configure arbitrary content, which covers containment (a `Card` that renders whatever you pass) and specialization (a generic `Dialog` configured by props into a `ConfirmDialog`) without a class hierarchy.\n\nInheritance couples components to a base class's shape and lifecycle, and deep hierarchies become brittle as requirements change. Composition keeps each piece independent: you combine small components and, for non-visual logic, extract shared behavior into plain modules or custom hooks that components import rather than extend.\n\nThe nuance to name is that this is about UI reuse specifically. The React team's position, after years of large codebases at Meta, is that they never found a case where component inheritance beat composition, so the API simply does not encourage it.",
    interviewLine: "I reuse UI by composing components through props and `children`, and share non-visual logic through custom hooks, because component inheritance only adds coupling.",
    misconception: "Assuming you need a shared base component class to reuse UI. Props, `children`, and custom hooks compose behavior without inheritance.",
    hints: [
      "Think about what the `children` prop lets a wrapper component do.",
      "Ask how you would specialize a generic component without subclassing it.",
      "For non-UI logic, the reuse tool is a module or hook you import, not a base class."
    ],
    example: {
      caption: "A generic Dialog specialized by composition, not a subclass.",
      language: "tsx",
      code: "function Dialog({ title, children }: { title: string; children: React.ReactNode }) {\n  return (\n    <div role=\"dialog\">\n      <h2>{title}</h2>\n      {children}\n    </div>\n  );\n}\n\nfunction ConfirmDialog() {\n  return <Dialog title=\"Are you sure?\"><button>Yes</button></Dialog>;\n}"
    },
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
        text: "No — Web Components are an Angular-only technology and never interoperate with React.",
        isCorrect: false,
        explanation: "Web Components are framework-agnostic and work across React, Vue, and Angular alike."
      },
      {
        id: "B",
        text: "No, rendering a Web Component crashes React's virtual DOM reconciler immediately on mount.",
        isCorrect: false,
        explanation: "React natively renders custom HTML elements; a registered Web Component is just another tag in the tree."
      },
      {
        id: "C",
        text: "Only if the whole web browser is first run inside a dedicated hardware emulator.",
        isCorrect: false,
        explanation: "Web Components are a native W3C browser standard supported in all modern browsers; no emulator is involved."
      },
      {
        id: "D",
        text: "Yes — custom elements render directly in JSX (`<custom-element />`), and React 19 natively forwards their properties and custom events.",
        isCorrect: true,
        explanation: "Correct. React supports custom elements out of the box; in React 19, properties and custom event listeners attach directly to Web Components without manual ref wrappers."
      }
    ],
    correctAnswer: "D",
    explanation: "Yes. A custom element is just a tag, so you can render `<vaadin-date-picker>` or any registered Web Component directly in JSX. This matters most when you adopt a third-party design system or widget distributed as Web Components rather than React components.\n\nHistorically the friction was the boundary between the two models: React used to set most values as HTML attributes (strings) and could not easily pass rich data or listen to custom DOM events, so people wrapped the element in a React component that managed a `ref`. React 19 closes much of that gap by passing non-string props as DOM properties and wiring custom event listeners automatically.\n\nThe nuance worth raising is the data boundary: attributes are strings, properties can be objects, and custom elements emit DOM `CustomEvent`s rather than React synthetic events, so interop still means thinking about which side owns which value.",
    interviewLine: "I render Web Components straight in JSX; before React 19 I wrapped them to pass object data and listen to custom events, but 19 forwards properties and events natively.",
    misconception: "Thinking React cannot host custom elements. It renders them like any tag; React 19 even forwards object props and custom events without a ref wrapper.",
    hints: [
      "Remember a custom element is a valid DOM tag, so JSX can emit it.",
      "Ask how React passes a non-string value or hears a custom DOM event.",
      "React 19 changed how non-string props map onto an element: as properties, not attributes."
    ],
    example: {
      caption: "Rendering a registered custom element directly, with React 19 forwarding the object prop.",
      language: "tsx",
      code: "function Picker({ dates }: { dates: string[] }) {\n  return (\n    <vaadin-combo-box\n      label=\"Pick a date\"\n      items={dates}\n      onselected-item-changed={(e: Event) => console.log(e)}\n    />\n  );\n}"
    },
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
        text: "An import statement that randomly renames the imported bindings each time it runs at runtime.",
        isCorrect: false,
        explanation: "Dynamic `import()` loads ES modules asynchronously on demand; it never randomizes names."
      },
      {
        id: "B",
        text: "A deprecated CommonJS loading syntax that was superseded by the `require()` function.",
        isCorrect: false,
        explanation: "Dynamic `import()` is the modern ECMAScript standard for asynchronous module loading, not a CommonJS relic."
      },
      {
        id: "C",
        text: "An ECMAScript syntax `import('./module')` that returns a Promise resolving to the module, enabling on-demand asynchronous code-splitting in bundlers.",
        isCorrect: true,
        explanation: "Correct. Dynamic `import()` enables lazy loading of modules and components when needed (e.g. on route navigation or button click), shrinking initial bundle sizes."
      },
      {
        id: "D",
        text: "A mechanism for importing CSS stylesheets directly out of a Microsoft Word document.",
        isCorrect: false,
        explanation: "Dynamic import is a standardized JavaScript module-loading feature; it has nothing to do with Word or CSS."
      }
    ],
    correctAnswer: "C",
    explanation: "A dynamic import is the function-call form `import('./module')`, which loads a module at runtime and returns a Promise that resolves to the module's namespace object. Unlike the static `import ... from` statement that is resolved up front, the dynamic form runs only when that line executes.\n\nIts purpose is code-splitting: a bundler sees `import()` and emits a separate chunk, so the referenced code is fetched on demand instead of in the initial bundle. You trigger it on a route change, a button click, or any point where you want to defer loading.\n\nIn React this underpins `React.lazy`, which wraps a dynamic import of a component so it loads lazily behind a `Suspense` boundary. The nuance to mention is that dynamic import is now standard ECMAScript, not a proposal, and it returns a Promise, so you handle load failures like any async operation.",
    interviewLine: "I use `import()` as a standard expression that returns a Promise for a module, which is how I get bundlers to code-split and how `React.lazy` defers a component until I actually need it.",
    misconception: "Thinking dynamic import is a non-standard or synchronous feature. It is standard ECMAScript, returns a Promise, and lets bundlers split code into on-demand chunks.",
    hints: [
      "Compare the statement form of import with the call form.",
      "Ask what a bundler can do once it sees a module loaded as a function call.",
      "The result is a Promise, which is exactly what `React.lazy` consumes."
    ],
    example: {
      caption: "React.lazy wraps a dynamic import so the component loads on demand behind Suspense.",
      language: "tsx",
      code: "import { lazy, Suspense } from 'react';\n\nconst Settings = lazy(() => import('./Settings'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <Settings />\n    </Suspense>\n  );\n}"
    },
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
        text: "`ref` can never be passed to any component in React under any version of the library.",
        isCorrect: false,
        explanation: "`ref` is passed via `forwardRef` in React 16-18 and as a standard prop in React 19, so it certainly can be forwarded."
      },
      {
        id: "B",
        text: "Yes — every JavaScript function automatically receives `ref` as its implicit first argument.",
        isCorrect: false,
        explanation: "Standard JavaScript functions only receive the arguments explicitly passed to them; there is no implicit `ref` parameter."
      },
      {
        id: "C",
        text: "In React 16-18 a `ref` arrives only through `React.forwardRef`'s second argument; in React 19, `ref` is a normal prop on function components.",
        isCorrect: true,
        explanation: "Correct. Historically, `(props, ref)` was exclusive to `React.forwardRef` wrappers; React 19 simplified this by making `ref` a regular prop on function components (`({ ref, ...props })`)."
      },
      {
        id: "D",
        text: "The `ref` argument is only delivered to components when the app runs on Linux computers.",
        isCorrect: false,
        explanation: "React component arguments are identical across all operating systems; `ref` handling has nothing to do with the host OS."
      }
    ],
    correctAnswer: "C",
    explanation: "It depends on the React version. In React 16 through 18, an ordinary function component receives only `(props)`, and a class component receives props through its constructor; neither gets a `ref` passed as a usable argument, and `ref` never appears in `props`. To receive a forwarded ref you had to wrap the component in `React.forwardRef`, whose render function takes the second `(props, ref)` argument.\n\nReact 19 changed this: `ref` is now a regular prop on function components, so you can write `function Input({ ref, ...props })` and read it directly, and `forwardRef` is deprecated for new code.\n\nThe nuance to flag is why the old restriction existed at all: `ref` and `key` were special props React consumed itself rather than delivering to the component, which is exactly the constraint React 19 relaxed for `ref`.",
    interviewLine: "Through React 18, `ref` only reached a component via `forwardRef`'s second argument; React 19 makes `ref` a normal prop, so I read it directly and skip `forwardRef`.",
    misconception: "Assuming any component automatically receives a `ref` argument. Pre-19 you needed `forwardRef`; React 19 makes `ref` an ordinary function-component prop.",
    hints: [
      "Separate what a plain function component receives from what the DOM-level API provides.",
      "Ask which wrapper used to be required to get a second `ref` argument.",
      "A recent major version turned `ref` from a special consumed prop into an ordinary one."
    ],
    example: {
      caption: "React 19 lets a function component accept ref as a plain prop, no forwardRef needed.",
      language: "tsx",
      code: "function TextInput({ ref, ...props }: React.ComponentProps<'input'> & { ref?: React.Ref<HTMLInputElement> }) {\n  return <input ref={ref} {...props} />;\n}\n\nfunction Form() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  return <TextInput ref={inputRef} />;\n}"
    },
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
        text: "To replace a component's CSS stylesheets entirely with imperatively-set inline styles.",
        isCorrect: false,
        explanation: "Refs are an escape hatch for imperative DOM access and mutable values; they do not replace CSS styling."
      },
      {
        id: "B",
        text: "To encrypt a component's props before they are transmitted to the server over HTTPS.",
        isCorrect: false,
        explanation: "Refs store mutable in-memory references and have no role in encryption or network transport."
      },
      {
        id: "C",
        text: "Managing focus or media playback, measuring layout with `getBoundingClientRect`, running imperative animations, or integrating a non-React DOM library.",
        isCorrect: true,
        explanation: "Correct. Refs serve as an escape hatch for imperative DOM interactions and mutable values that should not trigger re-renders when changed."
      },
      {
        id: "D",
        text: "For every state update whose new value needs to be displayed on screen to the user.",
        isCorrect: false,
        explanation: "Visual updates must use `useState` so React re-renders; a ref change is silent and never updates the screen."
      }
    ],
    correctAnswer: "C",
    explanation: "Refs are the escape hatch for talking to the DOM imperatively or holding a mutable value that should not drive rendering. The classic cases are managing focus, text selection or media playback, measuring layout with `getBoundingClientRect`, triggering imperative animations, and integrating a non-React library that owns a DOM node.\n\nThey also store render-independent values like a `setInterval` id, the previous value of a prop, or a flag used across renders. Writing to `ref.current` is immediate and does not schedule a render, which is exactly why these values belong in a ref rather than state.\n\nThe nuance to raise is the boundary: anything the rendered output depends on must be state, because changing a ref will not update the screen. Refs are for things the UI reads imperatively or does not display at all.",
    interviewLine: "I reach for a ref to focus or measure a DOM node, or to hold a timer id or previous value, anything the UI doesn't render, since changing a ref never triggers a re-render.",
    misconception: "Using a ref for a value the UI displays. Writing `ref.current` never re-renders, so visible data must be state, not a ref.",
    hints: [
      "Separate reaching into the real DOM from storing data React should display.",
      "Ask whether changing the value needs to update what the user sees.",
      "If the render output depends on it, it belongs in state, not a ref."
    ],
    example: {
      caption: "A ref holds a timer id across renders without causing any re-render.",
      language: "tsx",
      code: "function Timer() {\n  const idRef = useRef<number | null>(null);\n  const start = () => {\n    idRef.current = window.setInterval(() => console.log('tick'), 1000);\n  };\n  const stop = () => {\n    if (idRef.current) window.clearInterval(idRef.current);\n  };\n  return <><button onClick={start}>Start</button><button onClick={stop}>Stop</button></>;\n}"
    },
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
        text: "React is unopinionated: pick CSS Modules or Tailwind for zero-runtime SSR output, or CSS-in-JS for dynamic runtime theming.",
        isCorrect: true,
        explanation: "Correct. React supports every styling paradigm; modern setups increasingly favor Tailwind and CSS Modules because Server Components and SSR reward zero runtime overhead."
      },
      {
        id: "B",
        text: "No — plain CSS is completely banned in React applications and cannot be used at all.",
        isCorrect: false,
        explanation: "Styling is essential and supported through many methodologies; nothing bans CSS in React."
      },
      {
        id: "C",
        text: "Yes, but only if every style is written inline through the element's `style` prop.",
        isCorrect: false,
        explanation: "Inline styles are limited (no pseudo-classes or media queries); CSS Modules, Tailwind, and CSS-in-JS are all standard options."
      },
      {
        id: "D",
        text: "Yes — CSS-in-JS is mandatory and the only sanctioned way to style a React application.",
        isCorrect: false,
        explanation: "React is flexible and unopinionated about styling; CSS-in-JS is one option among many, never mandatory."
      }
    ],
    correctAnswer: "A",
    explanation: "React is unopinionated about styling, so there is no single recommended technique; the right choice depends on your constraints. Plain CSS files or CSS Modules referenced by `className` are a solid default, and utility frameworks like Tailwind cover most needs with zero runtime cost.\n\nCSS-in-JS libraries such as styled-components let you compute styles from props and colocate them with components, which is convenient for highly dynamic theming. The trade-off is a runtime: styles are generated as the component renders, which adds work and complicates streaming server rendering.\n\nThe nuance an interviewer looks for is the Server Components angle. With React Server Components and SSR, zero-runtime approaches (CSS Modules, Tailwind, or build-time CSS-in-JS) are increasingly favored because runtime style injection fights against rendering on the server.",
    interviewLine: "React doesn't mandate a styling approach; I lean on CSS Modules or Tailwind for zero-runtime, SSR-friendly styles and reserve runtime CSS-in-JS for genuinely dynamic theming.",
    misconception: "Treating one styling approach as the mandated React way. React is unopinionated; CSS-in-JS adds a runtime that can clash with Server Components, where zero-runtime CSS fits better.",
    hints: [
      "Recall whether React ships or requires any particular styling system.",
      "Ask what cost a library that generates styles during render adds.",
      "Consider how runtime style injection interacts with server rendering."
    ],
    example: {
      caption: "CSS Modules give scoped class names with no runtime style generation.",
      language: "tsx",
      code: "import styles from './Button.module.css';\n\nexport function Button({ label }: { label: string }) {\n  return <button className={styles.primary}>{label}</button>;\n}"
    },
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
        text: "Data fetching cannot be performed with React Hooks and always requires a class component.",
        isCorrect: false,
        explanation: "`useEffect` and custom hooks are the standard tools for client-side data fetching in function components."
      },
      {
        id: "B",
        text: "Call an async function inside `useEffect` (with the right dependency array), store the result in `useState`, or use a library like TanStack Query.",
        isCorrect: true,
        explanation: "Correct. Defining an async function inside `useEffect` and updating state on response is the foundational hook fetching pattern, while TanStack Query provides production caching and deduplication."
      },
      {
        id: "C",
        text: "Fire synchronous `XMLHttpRequest` calls directly inside the component's render body each pass.",
        isCorrect: false,
        explanation: "Synchronous requests in render block UI painting and cause infinite request loops on every re-render."
      },
      {
        id: "D",
        text: "Mark the `useEffect` callback itself as `async` so you can `await` the fetch inline.",
        isCorrect: false,
        explanation: "The `useEffect` callback cannot be `async` because it must return a synchronous cleanup function or `undefined`, not a Promise."
      }
    ],
    correctAnswer: "B",
    explanation: "The foundational pattern is an effect plus state: declare an async function inside `useEffect`, call it, and store the result with `useState`. The dependency array decides when to refetch; an empty `[]` fetches once after mount, and listing values refetches when they change.\n\nA crucial detail is that the `useEffect` callback itself cannot be `async`, because an async function returns a Promise and React expects the callback to return either a cleanup function or nothing. So you define the async function inside and call it, and you typically track an abort flag or use `AbortController` to ignore a response that arrives after the component unmounts.\n\nIn production this hand-rolled pattern is usually replaced by a data library like TanStack Query, which handles caching, deduplication, retries and stale-while-revalidate. The nuance to raise is that the raw effect approach lacks all of that, so it is a teaching baseline more than a production default.",
    interviewLine: "I define an async function inside `useEffect`, call it, and store results with `useState`, cancelling stale responses on unmount, though in production I reach for TanStack Query.",
    misconception: "Marking the `useEffect` callback itself `async`. It must return a cleanup function or nothing; an async callback returns a Promise, so you define the async function inside.",
    hints: [
      "Look at what a `useEffect` callback is allowed to return.",
      "Ask why you cannot just add `async` to the effect callback itself.",
      "Consider what happens to a response that resolves after the component unmounts."
    ],
    example: {
      caption: "The async work lives inside the effect, and a flag ignores a late response.",
      language: "tsx",
      code: "function useUser(id: string) {\n  const [user, setUser] = useState<unknown>(null);\n  useEffect(() => {\n    let active = true;\n    (async () => {\n      const res = await fetch(`/api/users/${id}`);\n      if (active) setUser(await res.json());\n    })();\n    return () => { active = false; };\n  }, [id]);\n  return user;\n}"
    },
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
        text: "Yes, hooks cover 100% of class lifecycles, including catching render errors as boundaries.",
        isCorrect: false,
        explanation: "Error boundaries still require a class implementing `componentDidCatch` / `getDerivedStateFromError`; no hook catches a descendant's render error."
      },
      {
        id: "B",
        text: "Almost all — except Error Boundaries and the rare `getSnapshotBeforeUpdate`, which still require a class component.",
        isCorrect: true,
        explanation: "Correct. Hooks cover state, effects, context, refs, and memoization; only Error Boundaries still require class lifecycle methods."
      },
      {
        id: "C",
        text: "No, hooks cover essentially 0% of what class components were able to do before.",
        isCorrect: false,
        explanation: "Hooks cover the vast majority of everyday stateful and lifecycle use cases; only a couple of narrow gaps remain."
      },
      {
        id: "D",
        text: "No, hooks are narrowly scoped and only useful for styling buttons and simple UI widgets.",
        isCorrect: false,
        explanation: "Hooks manage state, effects, context, refs, and memoization — the full breadth of component logic, not styling."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks cover nearly every class responsibility. State moves to `useState` or `useReducer`, lifecycle work to `useEffect` and `useLayoutEffect`, context to `useContext`, instance fields to `useRef`, and memoization to `useMemo` and `useCallback`. For day-to-day components there is no reason to reach for a class.\n\nThe remaining gaps are specific. Error boundaries still require a class implementing `getDerivedStateFromError` or `componentDidCatch`, since no Hook catches a descendant's render error. The rarely used `getSnapshotBeforeUpdate`, which reads the DOM between render and commit, also has no direct Hook equivalent.\n\nThe nuance worth stating is that these gaps are narrow and intentional rather than oversights, so the practical answer is almost all cases are covered, with error boundaries being the one you will actually hit.",
    interviewLine: "Hooks cover state, effects, context, refs and memoization, so I only keep a class for an error boundary, and occasionally for `getSnapshotBeforeUpdate`.",
    misconception: "Believing Hooks replace classes completely. Error boundaries and the rare `getSnapshotBeforeUpdate` still have no Hook equivalent.",
    hints: [
      "Map each class lifecycle method to its Hook and see which ones have none.",
      "Ask what catches a render error thrown by a child component.",
      "One obscure pre-commit DOM-reading method also lacks a Hook."
    ],
    example: {
      caption: "The error boundary remains class-only; everything around it is a function component.",
      language: "tsx",
      code: "class Boundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {\n  state = { error: null as Error | null };\n  static getDerivedStateFromError(error: Error) {\n    return { error };\n  }\n  render() {\n    return this.state.error ? <p>Failed: {this.state.error.message}</p> : this.props.children;\n  }\n}"
    },
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
        text: "React 16.8.0, released in February 2019, shipped stable Hooks across React DOM, React DOM Server, and the Test Renderer.",
        isCorrect: true,
        explanation: "Correct. React 16.8 introduced stable Hooks (`useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useDebugValue`)."
      },
      {
        id: "B",
        text: "Hooks remain an experimental, unreleased feature that no stable React version has shipped.",
        isCorrect: false,
        explanation: "Hooks have been the stable standard since React 16.8, released in February 2019."
      },
      {
        id: "C",
        text: "React 0.14.0, released in 2015, was the first version to ship stable Hooks support.",
        isCorrect: false,
        explanation: "React 0.14 split React and ReactDOM, years before Hooks were invented; it had no Hooks API."
      },
      {
        id: "D",
        text: "React 18.0.0, released in 2022, was the first stable version to introduce the Hooks API.",
        isCorrect: false,
        explanation: "React 18 introduced concurrent features; Hooks were already stable years earlier in React 16.8."
      }
    ],
    correctAnswer: "A",
    explanation: "Stable Hooks shipped in React 16.8, released in February 2019. That version added the Hooks API across the packages that run React trees: React DOM, React DOM Server, React Test Renderer, and the Shallow Renderer.\n\nBefore 16.8 Hooks existed only behind an alpha, so code written against those early builds was not production-safe. The 16.8 release is the dividing line where `useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, `useMemo`, `useCallback`, `useImperativeHandle`, `useLayoutEffect` and `useDebugValue` became the supported standard.\n\nThe nuance to note is version alignment: your `react` and `react-dom` versions must both be at least 16.8 for Hooks to work, because the Hooks dispatcher lives in the renderer and must match the core package.",
    interviewLine: "I remember hooks became stable in React 16.8 in February 2019, across React DOM, React DOM Server and the test renderers, so I keep both `react` and `react-dom` at 16.8 or newer.",
    misconception: "Guessing Hooks arrived with React 18 or an early 0.x release. Stable Hooks shipped in React 16.8 (February 2019).",
    hints: [
      "Recall that Hooks predate the concurrent features of a later major version.",
      "Ask which packages needed updating together for Hooks to function.",
      "The core and renderer versions must match because the dispatcher lives in the renderer."
    ],
    example: {
      caption: "Both react and react-dom must be at least 16.8 for Hooks to work.",
      language: "json",
      code: "{\n  \"dependencies\": {\n    \"react\": \"^16.8.0\",\n    \"react-dom\": \"^16.8.0\"\n  }\n}"
    },
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
        text: "Because array destructuring lets you name the value and setter freely (`const [count, setCount] = useState(0)`) instead of being locked to fixed object keys.",
        isCorrect: true,
        explanation: "Correct. Positional array destructuring gives naming flexibility, so several `useState` calls in one component can use distinct, descriptive names without collisions."
      },
      {
        id: "B",
        text: "Because JavaScript arrays are roughly 50x faster to allocate and read than plain objects.",
        isCorrect: false,
        explanation: "Any performance difference is negligible; the real benefit is arbitrary naming flexibility, not speed."
      },
      {
        id: "C",
        text: "Because square brackets are the only kind of bracket that JSX syntax actually permits.",
        isCorrect: false,
        explanation: "Array destructuring is standard JavaScript used for naming convenience; JSX allows many bracket forms."
      },
      {
        id: "D",
        text: "Because object destructuring is forbidden by the ECMAScript specification in this context.",
        isCorrect: false,
        explanation: "Object destructuring is standard syntax, but it would force fixed key names such as `{ state, setState }`."
      }
    ],
    correctAnswer: "A",
    explanation: "`useState` returns a two-element array: the current value at index 0 and the updater function at index 1. Array destructuring lets you name both in one line, `const [count, setCount] = useState(0)`, choosing whatever names describe that piece of state.\n\nThe reason it is an array rather than an object is naming freedom. With object destructuring you would be tied to fixed property names and would have to rename on every call to avoid collisions when a component has several state values. Positional array destructuring sidesteps that entirely.\n\nThe nuance to raise is that the names are purely yours: the array positions are what matter, so a convention like `[thing, setThing]` is just a readability habit, not something the Hook enforces.",
    interviewLine: "`useState` returns a positional pair, and array destructuring lets me name the value and setter anything, so multiple state hooks in one component never collide on fixed keys.",
    misconception: "Thinking the bracket syntax is required by JSX or faster than objects. It's array destructuring, chosen so you can name the value and setter freely.",
    hints: [
      "Recall exactly what `useState` hands back and in what order.",
      "Ask what naming constraint object destructuring would impose instead.",
      "The benefit is picking names, not any performance difference between arrays and objects."
    ],
    example: {
      caption: "Array destructuring lets several useState calls pick distinct names with no collisions.",
      language: "tsx",
      code: "function Form() {\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [agreed, setAgreed] = useState(false);\n  return <button disabled={!agreed}>{name} {email}</button>;\n}"
    },
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
        text: "The `react-future` experiments, render-prop patterns, DisplayScript state cells, ReasonReact reducers, and Rx subscriptions.",
        isCorrect: true,
        explanation: "Correct. The React team synthesized ideas from functional languages (ReasonML/OCaml), reactive streams, and community component patterns to design Hooks."
      },
      {
        id: "B",
        text: "Hooks were adapted directly from the leaked Windows 95 operating-system source code.",
        isCorrect: false,
        explanation: "Hooks evolved from web and functional UI experiments, not from any operating-system source."
      },
      {
        id: "C",
        text: "Hooks were generated automatically by feeding a random-number generator into a code synthesizer.",
        isCorrect: false,
        explanation: "Hooks were carefully researched and designed by the React core team from prior art."
      },
      {
        id: "D",
        text: "The Hooks API was reverse-engineered from patterns found in ancient Egyptian hieroglyphics.",
        isCorrect: false,
        explanation: "Hooks were derived from functional programming and reactive-UI research in computer science."
      }
    ],
    correctAnswer: "A",
    explanation: "The React team has said Hooks drew on several prior ideas rather than one invention. Earlier functional-API experiments in the `react-future` repository explored component logic as functions, and community render-prop patterns showed how to share stateful behavior without classes.\n\nMore ideas came from outside React: state cells in DisplayScript, reducer-based components in ReasonReact (built on OCaml/ReasonML), and reactive subscriptions in Rx. Together these pointed toward attaching reusable, composable state to function components.\n\nThe nuance worth stating is that this lineage explains the design, not just trivia: the reducer influence surfaces in `useReducer`, and the functional-composition goal is why Hooks can be extracted into custom hooks and reused across components.",
    interviewLine: "I'd trace hooks back to render-prop patterns, the `react-future` functional experiments, ReasonReact reducers, DisplayScript state cells and Rx subscriptions, all pulled together into composable function-component state.",
    misconception: "Treating Hooks as an isolated invention. They synthesized render props, functional-API experiments, ReasonReact reducers, DisplayScript state cells, and Rx subscriptions.",
    hints: [
      "Think about which patterns already shared stateful logic before Hooks existed.",
      "Ask which functional language's reducer components influenced the API.",
      "The reducer lineage shows up directly in one of the built-in Hooks."
    ],
    example: {
      caption: "The reducer influence is visible in useReducer, one of the ideas Hooks drew on.",
      language: "tsx",
      code: "function reducer(state: number, action: 'inc' | 'dec') {\n  return action === 'inc' ? state + 1 : state - 1;\n}\n\nfunction Counter() {\n  const [count, dispatch] = useReducer(reducer, 0);\n  return <button onClick={() => dispatch('inc')}>{count}</button>;\n}"
    },
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
        text: "Attach a `ref` to the custom element and call its methods on `elRef.current` inside an effect or an event handler.",
        isCorrect: true,
        explanation: "Correct. Interacting with imperative methods on custom elements requires acquiring a direct DOM reference via `useRef`."
      },
      {
        id: "B",
        text: "The imperative methods of a Web Component cannot be called from inside a React app at all.",
        isCorrect: false,
        explanation: "React refs provide full access to a custom element's native and imperative DOM methods."
      },
      {
        id: "C",
        text: "Reach the element by mutating a global `window.__CUSTOM_ELEMENT__` reference directly in the DOM.",
        isCorrect: false,
        explanation: "Global `window` mutation breaks component isolation; a `ref` gives you a scoped handle to the actual element."
      },
      {
        id: "D",
        text: "Write raw machine code to the GPU to invoke the custom element's imperative methods.",
        isCorrect: false,
        explanation: "Imperative methods are called on the DOM node instance via ordinary JavaScript, not GPU machine code."
      }
    ],
    correctAnswer: "A",
    explanation: "Web Components often expose behavior through imperative methods on the element instance, such as `open()` or `play()`. To call them from React you attach a `ref` to the custom element and invoke the method on `ref.current` inside an effect or an event handler, once the element is mounted.\n\nFor a third-party Web Component the cleaner approach is to write a thin React wrapper component that owns the ref, exposes a tidy prop-and-callback API, and hides the imperative calls. That keeps the imperative boundary in one place instead of scattering `ref.current.method()` through your app.\n\nThe nuance to raise is timing and lifecycle: `ref.current` is only valid after mount, so imperative calls belong in effects or handlers, not in render, and a wrapper lets you synchronize props into imperative calls as they change.",
    interviewLine: "I attach a `ref` to the custom element and call its imperative methods on `ref.current` in an effect, usually behind a small React wrapper that exposes a clean prop API.",
    misconception: "Trying to drive a custom element's methods declaratively through props. Imperative APIs need a `ref` to the element, called after it mounts.",
    hints: [
      "Ask how React gets a handle to the real DOM node of a custom element.",
      "Consider when `ref.current` is actually populated during the component's life.",
      "Wrapping the element keeps the imperative calls in one place rather than scattered."
    ],
    example: {
      caption: "A ref reaches the custom element so its imperative method runs after mount.",
      language: "tsx",
      code: "function Player({ src }: { src: string }) {\n  const ref = useRef<HTMLElement & { play: () => void }>(null);\n  useEffect(() => {\n    ref.current?.play();\n  }, [src]);\n  return <media-player ref={ref} src={src} />;\n}"
    },
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
        text: "No — browsers run only standard JavaScript, so a compiler (Babel, SWC, tsc) must transpile JSX into `_jsx()`/`React.createElement()` calls first.",
        isCorrect: true,
        explanation: "Correct. JSX is a syntax extension for JavaScript, requiring build-time compilation into standard ECMAScript that browser engines can interpret."
      },
      {
        id: "B",
        text: "Yes, modern browser engines parse and execute JSX natively with no compilation step at all.",
        isCorrect: false,
        explanation: "No web browser supports JSX natively; build tools compile JSX into standard JavaScript first."
      },
      {
        id: "C",
        text: "Only Google Chrome can parse JSX directly, while Safari and Firefox cannot understand it.",
        isCorrect: false,
        explanation: "No browser executes JSX directly; all of them run the compiled JavaScript output of a build tool."
      },
      {
        id: "D",
        text: "JSX is actually an image file format that all modern browsers can decode and display.",
        isCorrect: false,
        explanation: "JSX is a JavaScript syntax extension for writing declarative UI markup, not an image format."
      }
    ],
    correctAnswer: "A",
    explanation: "No. JSX is a syntax extension that browsers cannot run; they only execute standard JavaScript. Before the code reaches the browser a compiler transforms each JSX element into a function call, historically `React.createElement(...)` and, with the modern automatic runtime, `_jsx(...)` imported from the React JSX runtime.\n\nThat compilation happens in your build step. Tools like Babel, SWC, esbuild or the TypeScript compiler read JSX and emit plain JavaScript, so what ships is ordinary function calls that produce React elements.\n\nThe nuance worth stating is what JSX actually is: not HTML and not a template language, but sugar over function calls. `<App />` becomes a call whose result is a plain object describing the element, which is why you can only use it where a build tool will transform it.",
    interviewLine: "I stress that browsers never see my JSX; a compiler like Babel, SWC or tsc turns each element into a `_jsx` or `React.createElement` call that returns a plain element object.",
    misconception: "Thinking browsers parse JSX, or that it is HTML. JSX is syntax sugar compiled to `createElement`/`_jsx` calls before it ever reaches a browser.",
    hints: [
      "Ask what the browser's JavaScript engine is actually able to parse.",
      "Think about what JSX turns into after the build step.",
      "It is neither HTML nor a template, just sugar over a function call."
    ],
    example: {
      caption: "What the compiler emits: JSX becomes an _jsx call returning a plain element object.",
      language: "tsx",
      code: "// You write:\nconst el = <button className=\"ok\">Save</button>;\n\n// The compiler emits (automatic runtime):\n// import { jsx as _jsx } from 'react/jsx-runtime';\n// const el = _jsx('button', { className: 'ok', children: 'Save' });"
    },
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
        text: "React uses bidirectional two-way binding in which child components freely mutate the parent's state.",
        isCorrect: false,
        explanation: "React strictly uses one-way data flow; a child invokes a callback to request a change rather than mutating parent state directly."
      },
      {
        id: "B",
        text: "React enforces unidirectional (one-way) data flow: data is passed down from parent to child via props, and updates flow up via callback functions triggering state changes.",
        isCorrect: true,
        explanation: "Correct. Unidirectional flow makes application state predictable, simplifies debugging, and avoids the tangled synchronization bugs of bidirectional two-way binding."
      },
      {
        id: "C",
        text: "Data can only flow from backend database servers straight into the app's CSS stylesheets.",
        isCorrect: false,
        explanation: "Data flows through React's component hierarchy via props and state, not from a database into stylesheets."
      },
      {
        id: "D",
        text: "Data flows randomly between unrelated components by reading and writing shared global variables.",
        isCorrect: false,
        explanation: "Data flows predictably down the component hierarchy via props; React does not rely on ad-hoc globals."
      }
    ],
    correctAnswer: "B",
    explanation: "React uses unidirectional data flow. Data moves down the component tree as props: a parent owns a value and passes it to children, which read but do not alter it. To change that data a child calls a function the parent provided, so updates travel back up by invoking callbacks rather than by mutating anything directly.\n\nThis one-way model makes state predictable. Because only the owner can change a value and children merely request changes, you can trace any piece of UI back to the single place that owns its state, which simplifies debugging.\n\nThe nuance to contrast is two-way binding, where a child can write back to a parent's value directly. React deliberately avoids that because the implicit synchronization makes it hard to tell what caused a change; the callback-up, props-down pattern keeps the data's owner explicit.",
    interviewLine: "React data flows one way: props down, changes up through callbacks, so every value has a single owner and I can always trace the UI back to the state that drives it.",
    misconception: "Expecting two-way binding where children mutate parent state directly. React flows props down and sends changes up through callbacks, keeping one owner per value.",
    hints: [
      "Trace which direction a value travels versus which direction a change request travels.",
      "Ask how a child gets a value updated when it cannot mutate the prop.",
      "Contrast this with two-way binding and why React avoids that implicit sync."
    ],
    example: {
      caption: "The parent owns the value; the child requests a change through a callback.",
      language: "tsx",
      code: "function Child({ text, onChange }: { text: string; onChange: (v: string) => void }) {\n  return <input value={text} onChange={(e) => onChange(e.target.value)} />;\n}\n\nfunction Parent() {\n  const [text, setText] = useState('');\n  return <Child text={text} onChange={setText} />;\n}"
    },
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
        text: "A browser extension that records user clicks to replay them for automated UI testing.",
        isCorrect: false,
        explanation: "`react-scripts` is a Node.js CLI build tool, not a browser extension or a recorder."
      },
      {
        id: "B",
        text: "A collection of Python scripts bundled for training machine-learning models from app data.",
        isCorrect: false,
        explanation: "`react-scripts` is an npm package for bundling React web applications; it is JavaScript tooling, not Python."
      },
      {
        id: "C",
        text: "A database migration tool that versions and applies schema changes to a MySQL database.",
        isCorrect: false,
        explanation: "`react-scripts` manages frontend build and dev-server commands; it has no database or migration role."
      },
      {
        id: "D",
        text: "The npm package used by Create React App containing pre-configured build scripts, Webpack configs, Babel presets, ESLint rules, and dev server setup.",
        isCorrect: true,
        explanation: "Correct. `react-scripts` abstracted away complex build configuration for Create React App projects (`react-scripts start`, `build`, `test`), now largely superseded by Vite and Next.js."
      }
    ],
    correctAnswer: "D",
    explanation: "`react-scripts` was the npm package at the heart of Create React App. It bundled a preconfigured build toolchain, Webpack, Babel presets, ESLint rules and a dev server, behind simple commands like `react-scripts start`, `react-scripts build` and `react-scripts test`, so you could develop without writing any build configuration yourself.\n\nIts appeal was zero-config: the complexity lived inside the package, and you could `eject` to expose the raw config only if you outgrew the defaults. For years this was the standard way to start a React project.\n\nThe nuance an interviewer wants is the present-day status: Create React App is no longer recommended, and the React team now points people to frameworks like Next.js or build tools like Vite. So `react-scripts` is best described as the historical CRA build tool, now effectively deprecated for new projects.",
    interviewLine: "I'd describe `react-scripts` as Create React App's zero-config build package wrapping Webpack and Babel; I treat it as historical now, since the React docs point me toward Next.js or Vite for new projects.",
    misconception: "Treating `react-scripts` as a current recommendation. It was Create React App's zero-config build tool, now superseded by Vite and frameworks like Next.js.",
    hints: [
      "Recall which starter toolchain this package belonged to.",
      "Ask what it hid from you behind its `start` and `build` commands.",
      "Separate the historical role from today's recommended tooling."
    ],
    example: {
      caption: "The CRA package.json scripts that delegated every task to react-scripts.",
      language: "json",
      code: "{\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test\",\n    \"eject\": \"react-scripts eject\"\n  }\n}"
    },
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
    explanation: "You can still render a `javascript:` URL in an `href`, but starting in React 16.9 React logs a deprecation warning when it detects one. The reason is security: a `javascript:` URL executes whatever script follows the colon when the link is activated, so rendering one built from unsanitized data is a cross-site scripting hole.\n\nThe warning exists because this pattern is almost always a mistake, often data that flowed in from a server or user and happened to start with `javascript:`. React chose to flag it loudly and signaled that future versions would harden further against it.\n\nThe nuance to state is the fix: links should carry real URLs, and behavior belongs in an `onClick` handler, not in the `href`. If you must render user-supplied URLs, validate the scheme and reject `javascript:` before it ever reaches the DOM.",
    interviewLine: "React 16.9 warns on `javascript:` URLs because they run arbitrary script and are an XSS vector; I put behavior in `onClick` and validate the scheme of any user-supplied URL.",
    misconception: "Assuming a `javascript:` URL in `href` is a safe or normal pattern. It executes arbitrary script, so React 16.9 warns on it as an XSS vector.",
    hints: [
      "Ask what actually happens when a link whose href starts with `javascript:` is clicked.",
      "Consider where that URL string often comes from in a real app.",
      "The safe place for behavior is an event handler, not the href itself."
    ],
    example: {
      caption: "Reject dangerous schemes before a user-supplied URL reaches an href.",
      language: "tsx",
      code: "function SafeLink({ url, label }: { url: string; label: string }) {\n  const safe = /^https?:\\/\\//i.test(url) ? url : '#';\n  return <a href={safe}>{label}</a>;\n}"
    },
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
        text: "On root `AuthProvider` mount, read the stored token, validate it via an auth API call, then populate auth state before protected routes render.",
        isCorrect: true,
        explanation: "Correct. Re-hydrating authentication state from a persisted token in a top-level provider's mount effect preserves the session across a page refresh."
      },
      {
        id: "B",
        text: "Force the user to re-enter their username and password on every single click within the app.",
        isCorrect: false,
        explanation: "Re-authenticating on every click destroys the user experience; token re-hydration preserves sessions seamlessly."
      },
      {
        id: "C",
        text: "Persist the user's plaintext password inside the browser URL hash to survive a refresh.",
        isCorrect: false,
        explanation: "Storing plaintext credentials in a URL is an extreme security vulnerability; you persist a token, never a password."
      },
      {
        id: "D",
        text: "Authentication persistence is simply impossible to achieve in any single-page React application.",
        isCorrect: false,
        explanation: "Re-hydrating auth state from a stored token on initial load is standard, well-established web-security practice."
      }
    ],
    correctAnswer: "A",
    explanation: "A single-page app loses in-memory state on refresh, so authentication has to be re-hydrated from somewhere durable. The pattern is to run an effect once when the root provider mounts: read the stored session token, validate it against an auth endpoint, and populate the auth context before protected routes render.\n\nWhere you store the token is the security decision. An HttpOnly cookie keeps the token out of reach of JavaScript, which blocks token theft via XSS, at the cost of needing CSRF protection. `localStorage` is simpler but is readable by any script on the page, so a single XSS flaw leaks the session. You never store a plaintext password.\n\nThe nuance an interviewer probes is that persistence and trust are separate: the client re-hydrating a token is a UX convenience, but the server must still verify that token on every request, because client state can be forged.",
    interviewLine: "On provider mount I read a stored token, validate it against the API, then populate auth context; I prefer HttpOnly cookies over localStorage, and the server re-verifies on every request.",
    misconception: "Thinking persisting auth means trusting client storage. The client only re-hydrates a token on mount; the server must verify it every request, and HttpOnly cookies resist XSS theft.",
    hints: [
      "Ask what survives a full page reload in a single-page app and what does not.",
      "Consider where a token can live and which store a script can read.",
      "Separate re-hydrating state on the client from the server actually trusting it."
    ],
    example: {
      caption: "The root provider re-hydrates auth once on mount by validating the stored token.",
      language: "tsx",
      code: "function AuthProvider({ children }: { children: React.ReactNode }) {\n  const [user, setUser] = useState<unknown>(null);\n  useEffect(() => {\n    const token = localStorage.getItem('token');\n    if (!token) return;\n    fetch('/api/auth', { headers: { Authorization: `Bearer ${token}` } })\n      .then((r) => (r.ok ? r.json() : null))\n      .then(setUser);\n  }, []);\n  return <AuthContext value={user}>{children}</AuthContext>;\n}"
    },
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
    explanation: "`useEffect(fn, [])` maps cleanly onto `componentDidMount`, and the cleanup function it returns onto `componentWillUnmount`. The tempting third mapping — `componentDidUpdate` to `useEffect(fn, [count])` — is where the analogy breaks. Every effect runs after the initial mount regardless of its dependencies, so `useEffect(fn, [count])` fires on mount and then again on each change to `count`. `componentDidUpdate`, by contrast, never runs on the first render.\n\nTo reproduce an updates-only callback you have to track the mount yourself: hold a `useRef(false)`, flip it to `true` on the first run and bail out, and only call your logic once the ref is already set. There is no built-in dependency-array value that means \"skip the first render,\" which is why libraries ship a `useUpdateEffect` helper that wraps exactly this ref dance.\n\nThat friction is deliberate rather than an oversight. Effects are designed to synchronise a component with an external system based on the current props and state, not to re-enact class lifecycle hooks. Thinking in terms of \"what should this effect keep in sync\" leads to correct dependency arrays; thinking in terms of \"which lifecycle method is this\" leads you to fight the model and reach for refs you did not actually need.",
    interviewLine: "I tell people effects synchronise rather than sequence: there's no built-in 'on update only' because an effect always runs after the first mount, so when I truly need to skip that first run I hold a `useRef` flag and bail out until it's set.",
    misconception: "Assuming a dependency array means 'only when this changes'. It means 'after every render where this changed', and the mount always counts.",
    hints: [
      "Does an effect with dependencies skip the very first render?",
      "To act only on updates, what extra value must you track between renders?",
      "An empty dependency array is the opposite of 'updates only'; it runs once and never again."
    ],
    example: {
      caption: "Skipping the first run requires a ref, because the effect always fires on mount.",
      language: "tsx",
      code: "function useUpdateEffect(fn: () => void, deps: unknown[]) {\n  const mounted = useRef(false);\n  useEffect(() => {\n    if (!mounted.current) {\n      mounted.current = true;\n      return;\n    }\n    fn();\n  }, deps);\n}"
    },
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
        text: "A ref is read-only once assigned, whereas state can be updated throughout the component's life",
        isCorrect: false,
        explanation: "`ref.current` is freely mutable at any time — that is the entire point of a ref. Both refs and state can change; the real difference is whether that change schedules a render."
      },
      {
        id: "B",
        text: "A ref persists across renders but mutating it never schedules a re-render, unlike state",
        isCorrect: true,
        explanation: "Correct. Both survive re-renders, but React subscribes to state and not to refs: setting state schedules a render while writing `ref.current` changes the value silently."
      },
      {
        id: "C",
        text: "A ref is reset to its initial value on every render while state is what actually persists",
        isCorrect: false,
        explanation: "Both persist for the component's whole lifetime; the ref object returned by `useRef` is stable across renders and is never re-initialised after mount."
      },
      {
        id: "D",
        text: "A ref can only hold a DOM node, while state can hold arbitrary JavaScript values",
        isCorrect: false,
        explanation: "A ref holds any mutable value — a timer id, a previous prop, a flag. Attaching it to a DOM node via the `ref` attribute is just the most common use, not a restriction."
      }
    ],
    correctAnswer: "B",
    explanation: "Both `useRef` and `useState` give you a value that survives re-renders, so persistence is not what separates them. The real difference is subscription: React subscribes to state, so calling the setter schedules a render and the component re-runs with the new value. A ref is a plain mutable box — writing `ref.current = x` changes the value immediately, synchronously, and React never finds out.\n\nThat single property decides which one to reach for. Refs are right for values the render output does not depend on: a DOM node you want to `focus()`, a timer id you need to `clearInterval`, the previous value of a prop you compare against, or a mutable flag that must not reset between renders. None of these should repaint the screen when they change, so the lack of a subscription is exactly what you want.\n\nThe same property makes refs the wrong choice for anything the UI displays. If you store a counter in a ref and render `ref.current`, the number updates in memory but the screen stays frozen, because nothing told React to re-render. The moment a value needs to appear on screen and stay in sync, it belongs in state — and if you only need it between renders without showing it, it belongs in a ref.",
    interviewLine: "My rule of thumb is that both survive renders but only state causes one, so I ask whether the UI has to react to the value: if the screen must update I use `useState`, and if I just need a stable mutable box like a DOM node or a timer id I use `useRef`.",
    misconception: "Reaching for a ref to avoid re-renders on a value the UI actually displays, then wondering why the screen is stale.",
    hints: [
      "Both persist. What does React do differently when each one changes?",
      "Ask whether the screen must update when the value changes.",
      "Mutating a ref is immediate but silent; nothing re-renders to show it."
    ],
    example: {
      caption: "A render counter in a ref updates silently; the displayed count needs state.",
      language: "tsx",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n  const renders = useRef(0);\n  renders.current += 1; // changes every render, triggers none\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      {count} (rendered {renders.current}x)\n    </button>\n  );\n}"
    },
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  }
];
