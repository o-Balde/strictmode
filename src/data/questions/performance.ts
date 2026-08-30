import { QuizQuestion } from '../types';

export const PERFORMANCE_QUESTIONS: QuizQuestion[] = [
  {
    id: "performance-what-react-hooks-do-you-know",
    title: "What React hooks do you know?",
    prompt: "What React hooks do you know?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Core built-in hooks include useState for state, useEffect for side effects, useContext for context subscription, useRef for mutable refs, and useMemo/useCallback for memoization.",
        isCorrect: true,
        explanation: "Correct. React provides built-in hooks categorized into state, context, refs, effects, performance memoization, and reducers."
      },
      {
        id: "B",
        text: "Hooks run exclusively on background server worker threads during compilation and emit plain HTML strings.",
        isCorrect: false,
        explanation: "Hooks execute on the client (or during SSR hydration) within React's standard JavaScript execution flow."
      },
      {
        id: "C",
        text: "Built-in hooks can be called conditionally inside if statements and for loops without restrictions.",
        isCorrect: false,
        explanation: "The Rules of Hooks require calling hooks unconditionally at the top level to preserve call-order index matching."
      },
      {
        id: "D",
        text: "Hooks are class inheritance decorators that must only be declared inside ES6 class constructor methods.",
        isCorrect: false,
        explanation: "Hooks can only be called inside functional components or custom hooks, never inside class components."
      }
    ],
    correctAnswer: "A",
    explanation: "useState: Used for managing state in functional components. useEffect: Used for performing side effects in functional components, such as fetching data or subscribing to events. useContext: Used for accessing the value of a React context within a functional component. useRef: Used for creating mutable references to elements or values that persist across renders. useCallback: Used for memoizing functions to prevent unnecessary re-renders. useMemo: Used for memoizing values to improve performance by caching expensive computations. useReducer: Used for managing state with a reducer function, similar to how Redux works. useLayoutEffect: Similar to useEffect, but the effect runs synchronously after all DOM mutations. These hooks provide powerful tools for managing state, handling side effects, and reusing logic in React functional components. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What React hooks do you know?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What React hooks do you know?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-virtual-dom",
    title: "What is Virtual DOM?",
    prompt: "What is Virtual DOM?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A lightweight in-memory JavaScript object representation of the real DOM that React diffs to compute minimal DOM updates during reconciliation.",
        isCorrect: true,
        explanation: "Correct. The Virtual DOM is a tree of plain JS objects that React compares (diffing) to batch and apply minimal necessary updates to the actual browser DOM."
      },
      {
        id: "B",
        text: "A native browser API built into Chrome and Firefox that replaces the standard HTML DOM with a WebGL canvas.",
        isCorrect: false,
        explanation: "The Virtual DOM is a React library concept implemented in plain JavaScript, not a native browser API."
      },
      {
        id: "C",
        text: "An isolated shadow DOM container used exclusively for sandboxing third-party advertising iframes.",
        isCorrect: false,
        explanation: "Shadow DOM is a Web Component browser standard for scoped CSS/DOM encapsulation, distinct from React's Virtual DOM."
      },
      {
        id: "D",
        text: "A compile-time binary bytecode format that transpiles JSX into WebAssembly instructions.",
        isCorrect: false,
        explanation: "Virtual DOM elements are plain JavaScript objects created at runtime via createElement or JSX runtimes."
      }
    ],
    correctAnswer: "A",
    explanation: "Virtual DOM is a concept in React where a lightweight, virtual representation of the actual DOM (Document Object Model) is created and stored in memory. It is a programming technique used to optimize the performance of web applications. When changes are made to the data or state of a React component, the virtual DOM is updated instead of directly manipulating the real DOM. The virtual DOM then calculates the difference between the previous and updated state of the component, known as the \"diffing\" process. Once the differences are identified, React efficiently updates only the necessary parts of the real DOM to reflect the changes. This approach minimizes the number of actual DOM manipulations and improves the overall performance of the application. By using the virtual DOM, React provides a way to create dynamic and interactive user interfaces while ensuring optimal efficiency and rendering speed.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Virtual DOM?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Virtual DOM?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-how-to-track-the-unmounting-of-a-functional-component",
    title: "How to track the unmounting of a functional component?",
    prompt: "How to track the unmounting of a functional component?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "useEffect(() => {\n  function handleChange(value) {\n    setValue(value);\n  }\n  SomeAPI.doFunction(id, handleChange);\n\n  return function cleanup() {\n    SomeAPI.undoFunction(id, handleChange);\n  };\n})",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Implement componentWillUnmount as an inner closure function inside the functional component.",
        isCorrect: false,
        explanation: "componentWillUnmount is a class component method and does not exist in functional components."
      },
      {
        id: "B",
        text: "Return a cleanup function from a useEffect with an empty dependency array [] (or before subsequent effect executions).",
        isCorrect: true,
        explanation: "Correct. React invokes the cleanup function returned by useEffect when the component unmounts from the DOM."
      },
      {
        id: "C",
        text: "Attach a window.onbeforeunload listener in the root render function.",
        isCorrect: false,
        explanation: "onbeforeunload tracks entire page navigation/close, not individual React component unmount lifecycles."
      },
      {
        id: "D",
        text: "Check this.isMounted === false inside a setTimeout loop on every render.",
        isCorrect: false,
        explanation: "isMounted is an obsolete anti-pattern from old React versions and functional components have no this context."
      }
    ],
    correctAnswer: "B",
    explanation: "Often, useEffect create resources that need to be cleaned up or reset before the component leaves the screen, such as a subscription or a timer identifier. In order to do this, the function passed to useEffect can return a cleanup function. The cleanup function is run before the component is removed from the user interface to prevent memory leaks. Additionally, if the component renders multiple times (as is usually the case), the previous effect is cleaned up before the next effect is executed.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to track the unmounting of a functional component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to track the unmounting of a functional component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-the-difference-between-redux-and-mobx",
    title: "What is the difference between Redux and Mobx?",
    prompt: "What is the difference between Redux and Mobx?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "state-management",
    tags: [
      "performance",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux stores state in client RAM, while MobX stores state on a remote backend Redis server.",
        isCorrect: false,
        explanation: "Both Redux and MobX are client-side JavaScript state management libraries operating in browser RAM."
      },
      {
        id: "B",
        text: "Redux is only for functional components, whereas MobX is only for class components.",
        isCorrect: false,
        explanation: "Both Redux and MobX fully support functional components via hooks and `observer`."
      },
      {
        id: "C",
        text: "Redux uses a single immutable state tree with explicit pure reducers; MobX uses mutable observable objects with automatic granular dependency tracking.",
        isCorrect: true,
        explanation: "Correct. Redux prioritizes immutability, explicit action flows, and strict predictability; MobX prioritizes reactive transparency, mutability, and minimal boilerplate."
      },
      {
        id: "D",
        text: "MobX requires writing significantly more boilerplate code than Redux.",
        isCorrect: false,
        explanation: "MobX typically requires much less boilerplate than standard Redux due to automatic property tracking."
      }
    ],
    correctAnswer: "C",
    explanation: "Redux is a simpler and more opinionated state management library that follows a strict unidirectional data flow and promotes immutability. It requires more boilerplate code and explicit updates but has excellent integration with React. Mobx, on the other hand, provides a more flexible and intuitive API with less boilerplate code. It allows you to directly modify the state and automatically tracks changes for better performance. The choice between Redux and Mobx depends on your specific needs and preferences.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Redux and Mobx?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Redux and Mobx?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "performance-what-is-usememo-used-for-and-how-does-it-work",
    title: "What is useMemo used for and how does it work?",
    prompt: "What is useMemo used for and how does it work?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "const memoValue = useMemo(() => computeFunc(paramA, paramB), [paramA, paramB]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Caches the calculation permanently in `localStorage` across browser tab closures.",
        isCorrect: false,
        explanation: "`useMemo` stores memoized values in component memory during the current session, not `localStorage`."
      },
      {
        id: "B",
        text: "Caches the result of an expensive calculation between renders, recalculating only when specified dependencies change referentially.",
        isCorrect: true,
        explanation: "Correct. `useMemo(() => computeExpensiveValue(a, b), [a, b])` caches the return value to prevent redundant calculations on every render."
      },
      {
        id: "C",
        text: "Runs an asynchronous network fetch after the component mounts to the screen.",
        isCorrect: false,
        explanation: "Asynchronous side effects belong inside `useEffect`, not `useMemo`."
      },
      {
        id: "D",
        text: "Forces the component to re-render in the background on every millisecond tick.",
        isCorrect: false,
        explanation: "`useMemo` is an optimization to avoid work, not to trigger extra re-renders."
      }
    ],
    correctAnswer: "B",
    explanation: "useMemo is used to cache and memorize the result of calculations. Pass the creating function and an array of dependencies. useMemo will recalculate the memoized value only when the value of any of the dependencies has changed. This optimization helps to avoid costly calculations with each render. With the first parameter, the function accepts a callback in which calculations are performed, and with the second an array of dependencies, the function will re-perform calculations only when at least one of the dependencies is changed. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useMemo used for and how does it work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useMemo used for and how does it work?.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "performance-what-is-usecallback-used-for-and-how-does-it-work",
    title: "What is useCallback used for and how does it work?",
    prompt: "What is useCallback used for and how does it work?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "const callbackValue = useCallback(() => computeFunc(paramA, paramB), [paramA, paramB]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Automatically binds the function to the `window` global execution context.",
        isCorrect: false,
        explanation: "`useCallback` preserves standard JavaScript lexical scoping closures."
      },
      {
        id: "B",
        text: "Returns a memoized version of a callback function that only changes if one of the dependencies has changed, providing referential stability for memoized children.",
        isCorrect: true,
        explanation: "Correct. `useCallback(fn, deps)` prevents creating a new function reference on every render, allowing `React.memo` child components to skip re-renders."
      },
      {
        id: "C",
        text: "Executes the callback function 10 times in parallel on Web Worker threads.",
        isCorrect: false,
        explanation: "`useCallback` does not execute the function; it merely returns a stable function reference."
      },
      {
        id: "D",
        text: "Converts synchronous functions into async promises that resolve automatically.",
        isCorrect: false,
        explanation: "`useCallback` preserves the exact signature and synchronous nature of the passed function."
      }
    ],
    correctAnswer: "B",
    explanation: "The useCallback hook will return a memoized version of the callback, which changes only if the values of one of the dependencies change. This is useful when passing callbacks to optimized child components that rely on link equality to prevent unnecessary renderings. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useCallback used for and how does it work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useCallback used for and how does it work?.",
    hints: [
      "useCallback only helps if the child actually skips work because of it. On its own it is overhead."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useCallback"
  },
  {
    id: "performance-what-is-the-difference-between-usememo-and-usecallback",
    title: "What is the difference between useMemo and useCallback?",
    prompt: "What is the difference between useMemo and useCallback?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useMemo` is for class components; `useCallback` is for functional components.",
        isCorrect: false,
        explanation: "Both are React Hooks and only function inside functional components or custom hooks."
      },
      {
        id: "B",
        text: "`useMemo` supports async functions, while `useCallback` only supports synchronous functions.",
        isCorrect: false,
        explanation: "Neither hook should receive async functions as calculation factories during render."
      },
      {
        id: "C",
        text: "`useCallback` runs after DOM paint, while `useMemo` runs before DOM paint.",
        isCorrect: false,
        explanation: "Both execute synchronously during the component's render phase."
      },
      {
        id: "D",
        text: "`useMemo` calls its function and caches the returned result value; `useCallback` caches the function instance itself without calling it.",
        isCorrect: true,
        explanation: "Correct. `useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)`."
      }
    ],
    correctAnswer: "D",
    explanation: "useMemo is used to memoize the result of a computation, while useCallback is used to memoize a function itself. useMemo caches the computed value and returns it on subsequent renders if the dependencies haven't changed. useCallback caches the function itself and returns the same instance unless the dependencies have changed.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between useMemo and useCallback?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between useMemo and useCallback?.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "performance-what-is-usecontext-used-for-and-how-does-it-work",
    title: "What is useContext used for and how does it work?",
    prompt: "What is useContext used for and how does it work?",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate"
    ],
    codeSnippet: "const App = () => {\n  const theme = useContext(ThemeContext);\n\n  return (\n    <div style={{ color: theme.palette.primary.main }}>\n      Some div\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Caches context values in `sessionStorage` automatically.",
        isCorrect: false,
        explanation: "Context values exist in React component memory and are not serialized to browser storage."
      },
      {
        id: "B",
        text: "Allows child components to mutate the parent's context value without using a state setter.",
        isCorrect: false,
        explanation: "Context values are read-only to consumers unless the provider explicitly passes a state updater function in the value object."
      },
      {
        id: "C",
        text: "Creates a new context provider and mounts it directly into the DOM body.",
        isCorrect: false,
        explanation: "`useContext` consumes existing context; providers are declared in JSX via `<MyContext.Provider value={...}>`."
      },
      {
        id: "D",
        text: "Accepts a context object and returns the current context value from the nearest matching `<Context.Provider>` ancestor, re-rendering when the value changes.",
        isCorrect: true,
        explanation: "Correct. `useContext(MyContext)` reads and subscribes to context changes from the nearest provider above in the tree."
      }
    ],
    correctAnswer: "D",
    explanation: "In a typical React application, data is passed from top to bottom (from parent to child component) using props. However, such a method of use may be too cumbersome for some types of props (for example, the selected language, UI theme), which must be passed to many components in the application. The context provides a way to share such data between components without having to explicitly pass the props through each level of the tree. The component calling useContext will always be re-rendered when the context value changes. If re-rendering a component is costly, you can optimize it using memoization. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useContext used for and how does it work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useContext used for and how does it work?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "performance-what-is-reactmemo",
    title: "What is React.memo()?",
    prompt: "What is React.memo()?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { memo } from 'react';\n\nconst MemoComponent = memo(MemoComponent = (props) => {\n  // ...\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A higher-order component that wraps a component and skips re-rendering if its new props are shallowly equal to its previous props.",
        isCorrect: true,
        explanation: "Correct. `React.memo` memoizes component rendering based on shallow prop comparison, preventing unnecessary re-renders when parent components update."
      },
      {
        id: "B",
        text: "A hook that stores calculated math values in browser memory.",
        isCorrect: false,
        explanation: "`useMemo` is the hook for values; `React.memo` is the higher-order component for wrapping whole components."
      },
      {
        id: "C",
        text: "A method that forces a component to re-render even if its props did not change.",
        isCorrect: false,
        explanation: "`React.memo` skips re-renders when props are unchanged; it does not force them."
      },
      {
        id: "D",
        text: "A function that compiles React code into native mobile iOS binaries.",
        isCorrect: false,
        explanation: "`React.memo` is a web and React Native render memoization wrapper."
      }
    ],
    correctAnswer: "A",
    explanation: "React.memo() is a higher, order component. If your component always renders the same thing with non-changing props, you can wrap it in a React.memo() call to improve performance in some cases, thereby memorizing the result. This means that React will use the result of the last render, avoiding re-rendering. React.memo() only affects changes to the props. If a functional component is wrapped in React.memo and uses useState, useReducer, or useContext, it will be re-rendered when the state or context changes. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React.memo()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React.memo()?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-what-are-common-react-performance-optimization-techniqu",
    title: "What are common React performance optimization techniques?",
    prompt: "What are common React performance optimization techniques?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Wrapping every single integer and string in the entire codebase with `useMemo`.",
        isCorrect: false,
        explanation: "Indiscriminate memoization adds memory and dependency comparison overhead that can degrade performance."
      },
      {
        id: "B",
        text: "Directly modifying real DOM nodes using `document.getElementById` to bypass React reconciliation.",
        isCorrect: false,
        explanation: "Manual DOM manipulation breaks React's declarative model and causes state desynchronization."
      },
      {
        id: "C",
        text: "Running all component renders inside synchronous while loops on the main thread.",
        isCorrect: false,
        explanation: "Synchronous loops block the browser event loop and freeze user interaction."
      },
      {
        id: "D",
        text: "Key techniques include memoization (`React.memo`, `useMemo`, `useCallback`), code splitting via `React.lazy`/`<Suspense>`, list virtualization (`react-window`), and state colocation.",
        isCorrect: true,
        explanation: "Correct. Optimizing React involves reducing redundant re-renders, shrinking initial JS bundles, windowing large DOM lists, and keeping state close to consumers."
      }
    ],
    correctAnswer: "D",
    explanation: "React Modern Patterns & Performance",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are common React performance optimization techniques?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are common React performance optimization techniques?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-the-virtual-dom-how-does-react-use-the-virtual",
    title: "What is the virtual DOM? How does react use the virtual DOM to render the UI?",
    prompt: "What is the virtual DOM? How does react use the virtual DOM to render the UI?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An in-memory representation of UI elements that React compares (diffs) against the previous tree to compute minimal batch updates to the real DOM.",
        isCorrect: true,
        explanation: "Correct. React maintains an in-memory Virtual DOM tree, performs reconciliation diffing upon state changes, and applies only necessary mutations to the real browser DOM."
      },
      {
        id: "B",
        text: "A native browser feature that replaces the HTML parser with WebAssembly.",
        isCorrect: false,
        explanation: "Virtual DOM is implemented in pure JavaScript userland code by React, not built into browser engines."
      },
      {
        id: "C",
        text: "A permanent snapshot of the DOM stored in local browser cookies.",
        isCorrect: false,
        explanation: "Virtual DOM lives ephemerally in JavaScript runtime RAM."
      },
      {
        id: "D",
        text: "A secondary browser monitor display used for debugging React component trees.",
        isCorrect: false,
        explanation: "Virtual DOM is a software data structure in JavaScript memory, not a hardware display monitor."
      }
    ],
    correctAnswer: "A",
    explanation: "As stated by the react team, virtual DOM is a concept where a virtual representation of the real DOM is kept inside the memory and is synced with the real DOM by a library such as ReactDOM. Why was virtual DOM introduced? DOM manipulation is an integral part of any web application, but DOM manipulation is quite slow when compared to other operations in JavaScript. The efficiency of the application gets affected when several DOM manipulations are being done. Most JavaScript frameworks update the entire DOM even when a small part of the DOM changes. For example, consider a list that is being rendered inside the DOM. If one of the items in the list changes, the entire list gets rendered again instead of just rendering the item that was changed/updated. This is called inefficient updating. To address the problem of inefficient updating, the react team introduced the concept of virtual DOM. How does it work? For every DOM object, there is a corresponding virtual DOM object(copy), which has the same properties. The main difference between the real DOM object and the virtual DOM object is that any changes in the virtual DOM object will not reflect on the screen directly. Consider a virtual DOM object as a blueprint of the real DOM object. Whenever a JSX element gets rendered, every virtual DOM object gets updated. **Note- One may think updating every virtual DOM object might be inefficient, but that, s not the case. Updating the virtual DOM is much faster than updating the real DOM since we are just updating the blueprint of the real DOM. React uses two virtual DOMs to render the user interface. One of them is used to store the current state of the objects and the other to store the previous state of the objects. Whenever the virtual DOM gets updated, react compares the two virtual DOMs and gets to know about which virtual DOM objects were updated. After knowing which objects were updated, react renders only those objects inside the real DOM instead of rendering the complete real DOM. This way, with the use of virtual DOM, react solves the problem of inefficient updating.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the virtual DOM? How does react use the virtual DOM to render the UI?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the virtual DOM? How does react use the virtual DOM to render the UI?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-explain-react-state-and-props",
    title: "Explain React state and props.",
    prompt: "Explain React state and props., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "class Car extends React.Component{\nconstructor(props){\n  super(props);\n  this.state = {\n    brand: \"BMW\",\n    color: \"black\"\n  }\n}\n}\n\nclass Car extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = {\n    brand: \"BMW\",\n    color: \"Black\"\n  };\n}\nchangeColor() {\n  this.setState(prevState => {\n    return { color: \"Red\" };\n  });\n}\nrender() {\n  return (\n    <div>\n      <button onClick={() => this.changeColor()}>Change Color</button>\n      <p>{this.state.color}</p>\n    </div>\n  );\n}\n}\n\n<Car brand=\"Mercedes\"/>\n\nclass Car extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = {\n    brand: this.props.brand,\n    color: \"Black\"\n  };\n}\n}\n\nfunction Car(props) {\nlet [brand, setBrand] = useState(props.brand);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props can be mutated directly by child components via assignment `props.val = 2`.",
        isCorrect: false,
        explanation: "Props are strictly read-only; mutating props directly causes bugs and breaks React's unidirectional flow."
      },
      {
        id: "B",
        text: "State is shared automatically across all unconnected components without providers.",
        isCorrect: false,
        explanation: "State is private to its component instance unless lifted up or stored in a shared context/global store."
      },
      {
        id: "C",
        text: "Props are only used for CSS styling, while state stores database queries.",
        isCorrect: false,
        explanation: "Props pass any JavaScript data types, callbacks, and React elements; state holds any dynamic component data."
      },
      {
        id: "D",
        text: "Props are read-only configuration passed from parent to child; State is mutable data managed locally within a component that triggers re-renders on change.",
        isCorrect: true,
        explanation: "Correct. Props flow downwards and cannot be mutated by the receiving component; state is internal and private to the component where it is declared."
      }
    ],
    correctAnswer: "D",
    explanation: "Props State Immutable Owned by its component Has better performance Locally scoped Can be passed to child components Writeable/Mutable has setState() method to modify properties Changes to state can be asynchronous can only be passed as props React StateEvery component in react has a built-in state object, which contains all the property values that belong to that component.In other words, the state object controls the behaviour of a component. Any change in the property values of the state object leads to the re-rendering of the component. Note- State object is not available in functional components but, we can use React Hooks to add state to a functional component. How to declare a state object? Example: How to use and update the state object? As one can see in the code above, we can use the state by calling this.state.propertyName and we can change the state object property using setState method. React Props Every React component accepts a single object argument called props (which stands for: properties: ). These props can be passed to a component using HTML attributes and the component accepts these props as an argument. Using props, we can pass data from one component to another. Passing props to a component: While rendering a component, we can pass the props as an HTML attribute: The component receives the props: In Class component: In Functional component: Note- Props are read-only. They cannot be manipulated or changed inside a component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain React state and props.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain React state and props.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-explain-about-types-of-side-effects-in-react-component",
    title: "Explain about types of side effects in React component.",
    prompt: "Explain about types of side effects in React component., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Client effects that run in JavaScript and server effects that run in HTML comments.",
        isCorrect: false,
        explanation: "Side effects are JavaScript operations interacting with outside APIs, browser DOM, or network."
      },
      {
        id: "B",
        text: "Positive side effects that improve SEO and negative side effects that crash the server.",
        isCorrect: false,
        explanation: "Side effects in React refer to interactions with external systems (DOM, network, timers), categorized by whether they require memory/event cleanup."
      },
      {
        id: "C",
        text: "Synchronous side effects in `render` and asynchronous side effects in CSS.",
        isCorrect: false,
        explanation: "Side effects are prohibited inside the pure render phase and belong in `useEffect`."
      },
      {
        id: "D",
        text: "Effects without cleanup (e.g. logging, document title updates, simple data fetches) and effects with cleanup (e.g. event subscriptions, timers, socket connections) that return a cleanup function.",
        isCorrect: true,
        explanation: "Correct. React categorizes side effects into those that need resource cleanup on unmount/re-render (subscriptions/timers) and those that run once without residual cleanup."
      }
    ],
    correctAnswer: "D",
    explanation: "There are two types of side effects in React component. They are: Effects without Cleanup: This side effect will be used in useEffect which does not restrict the browser from screen update. It also improves the responsiveness of an application. A few common examples are network requests, Logging, manual DOM mutations, etc. Effects with Cleanup: Some of the Hook effects will require the cleanup after updating of DOM is done. For example, if you want to set up an external data source subscription, it requires cleaning up the memory else there might be a problem of memory leak. It is a known fact that React will carry out the cleanup of memory when the unmounting of components happens. But the effects will run for each render() method rather than for any specific method. Thus we can say that, before execution of the effects succeeding time the React will also cleanup effects from the preceding render. Get Access to 250+ Guides with Scaler Mobile App!Experience free learning content on the Scaler Mobile AppVideo CoursesExclusive EventsInterview GuidesFree Lectures4.5Rating100K+DownloadsPlay StoreDownload AppYour PDF Guide has been downloaded!Get Access to 250+ Guides with Scaler Mobile App!Experience free learning content on the Scaler Mobile AppVideo CoursesExclusive EventsInterview GuidesFree Lectures4.5Rating100K+DownloadsPlay StoreDownload App",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain about types of side effects in React component.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain about types of side effects in React component.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-the-use-of-useeffect-react-hooks",
    title: "What is the use of useEffect React Hooks?",
    prompt: "What is the use of useEffect React Hooks?",
    level: "junior",
    type: "output",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "import { useEffect } from 'react';\nfunction WelcomeGreetings({ name }) {\n const msg = `Hi, ${name}!`;     // Calculates output\n useEffect(() => {\n   document.title = `Welcome to you ${name}`;    // Side-effect!\n }, [name]);\n return <div>{msg}</div>;         // Calculates output\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To perform side effects in functional components (such as data fetching, subscriptions, timers, or DOM updates) after the render is committed to the screen.",
        isCorrect: true,
        explanation: "Correct. `useEffect` lets functional components handle side effects asynchronously after paint, with dependency tracking and optional cleanup callbacks."
      },
      {
        id: "B",
        text: "To execute blocking synchronous database queries before page HTML loads.",
        isCorrect: false,
        explanation: "`useEffect` runs on the client after render and does not block initial HTML delivery."
      },
      {
        id: "C",
        text: "To create global CSS stylesheets dynamically inside the GPU buffer.",
        isCorrect: false,
        explanation: "`useEffect` is for JavaScript side effects, not GPU shader/CSS generation."
      },
      {
        id: "D",
        text: "To replace `useState` for storing temporary form input values synchronously.",
        isCorrect: false,
        explanation: "`useState` stores synchronous state; `useEffect` runs deferred side effects after rendering."
      }
    ],
    correctAnswer: "A",
    explanation: "The useEffect React Hook is used for performing the side effects in functional components. With the help of useEffect, you will inform React that your component requires something to be done after rendering the component or after a state change. The function you have passed(can be referred to as, effect, ) will be remembered by React and call afterwards the performance of DOM updates is over. Using this, we can perform various calculations such as data fetching, setting up document title, manipulating DOM directly, etc, that don, t target the output value. The useEffect hook will run by default after the first render and also after each update of the component. React will guarantee that the DOM will be updated by the time when the effect has run by it. The useEffect React Hook will accept 2 arguments: useEffect(callback,[dependencies]); Where the first argument callback represents the function having the logic of side-effect and it will be immediately executed after changes were being pushed to DOM. The second argument dependencies represent an optional array of dependencies. The useEffect() will execute the callback only if there is a change in dependencies in between renderings. Example: The above code will update the document title which is considered to be a side-effect as it will not calculate the component output directly. That is why updating of document title has been placed in a callback and provided to useEffect(). Consider you don, t want to execute document title update each time on rendering of WelcomeGreetings component and you want it to be executed only when the name prop changes then you need to supply name as a dependency to useEffect(callback, [name]).",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use of useEffect React Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use of useEffect React Hooks?.",
    hints: [
      "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect"
  },
  {
    id: "performance-how-to-prevent-re-renders-in-react",
    title: "How to prevent re-renders in React?",
    prompt: "How to prevent re-renders in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "class Parent extends React.Component {\nstate = { messageDisplayed: false };\ncomponentDidMount() {\n  this.setState({ messageDisplayed: true });\n}\nrender() {\n  console.log(\"Parent is getting rendered\");\n  return (\n    <div className=\"App\">\n      <Message />\n    </div>\n  );\n}\n}\nclass Message extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = { message: \"Hello, this is vivek\" };\n}  \nrender() {\n  console.log(\"Message is getting rendered\");\n  return (\n    <div>\n      <p>{this.state.message}</p>\n    </div>\n  );\n}\n}\n\nclass Message extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = { message: \"Hello, this is vivek\" };\n}\nshouldComponentUpdate() {\n  console.log(\"Does not get rendered\");\n  return false;\n}\nrender() {\n  console.log(\"Message is getting rendered\");\n  return (\n    <div>\n      <p>{this.state.message}</p>\n    </div>\n  );\n}\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Disable browser JavaScript execution entirely.",
        isCorrect: false,
        explanation: "Disabling JavaScript prevents all client interactivity."
      },
      {
        id: "B",
        text: "Wrap the entire application in a single giant monolithic component that never splits.",
        isCorrect: false,
        explanation: "Monolithic components re-render completely whenever any tiny internal state changes."
      },
      {
        id: "C",
        text: "Use `React.memo` to memoize components, stabilize props with `useMemo`/`useCallback`, colocate state close to consumers, and optimize context splitting.",
        isCorrect: true,
        explanation: "Correct. Preventing unnecessary re-renders involves shallow component memoization, referential prop stability, and avoiding hoisting state unnecessarily high."
      },
      {
        id: "D",
        text: "Mutate state directly without calling `setState` or dispatching actions.",
        isCorrect: false,
        explanation: "Direct state mutation causes stale UI bugs and violates React's reactive rendering model."
      }
    ],
    correctAnswer: "C",
    explanation: "Reason for re-renders in React: Re-rendering of a component and its child components occur when props or the state of the component has been changed. Re-rendering components that are not updated, affects the performance of an application. How to prevent re-rendering: Consider the following components: The Parent component is the parent component and the Message is the child component. Any change in the parent component will lead to re-rendering of the child component as well. To prevent the re-rendering of child components, we use the shouldComponentUpdate( ) method: **Note- Use shouldComponentUpdate( ) method only when you are sure that it, s a static component. As one can see in the code above, we have returned false from the shouldComponentUpdate( ) method, which prevents the child component from re-rendering.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to prevent re-renders in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to prevent re-renders in React?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-name-a-few-techniques-to-optimize-react-app-performance",
    title: "Name a few techniques to optimize React app performance.",
    prompt: "Name a few techniques to optimize React app performance., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Store all application state in a single synchronous global loop.",
        isCorrect: false,
        explanation: "Synchronous loops on the main thread freeze the browser and destroy performance."
      },
      {
        id: "B",
        text: "Disable all browser caching and reload the entire bundle on every user click.",
        isCorrect: false,
        explanation: "Disabling caching degrades load performance and increases network overhead."
      },
      {
        id: "C",
        text: "Render 100,000 DOM nodes simultaneously on initial load without pagination or virtualization.",
        isCorrect: false,
        explanation: "Rendering massive DOM trees exhausts memory and causes severe layout thrashing."
      },
      {
        id: "D",
        text: "Use `useMemo`/`useCallback` for expensive computations/callbacks, `React.memo` for pure components, list virtualization for large datasets, and `React.lazy` for code splitting.",
        isCorrect: true,
        explanation: "Correct. Effective React optimization targets re-render reduction, computation caching, DOM node virtualization, and bundle size minimization."
      }
    ],
    correctAnswer: "D",
    explanation: "There are many ways through which one can optimize the performance of a React app, let, s have a look at some of them: Using useMemo( ) - It is a React hook that is used for caching CPU-Expensive functions. Sometimes in a React app, a CPU-Expensive function gets called repeatedly due to re-renders of a component, which can lead to slow rendering.useMemo( ) hook can be used to cache such functions. By using useMemo( ), the CPU-Expensive function gets called only when it is needed. Using React.PureComponent - It is a base component class that checks the state and props of a component to know whether the component should be updated. Instead of using the simple React.Component, we can use React.PureComponent to reduce the re-renders of a component unnecessarily. Maintaining State Colocation - This is a process of moving the state as close to where you need it as possible. Sometimes in React app, we have a lot of unnecessary states inside the parent component which makes the code less readable and harder to maintain. Not to forget, having many states inside a single component leads to unnecessary re-renders for the component. It is better to shift states which are less valuable to the parent component, to a separate component. Lazy Loading - It is a technique used to reduce the load time of a React app. Lazy loading helps reduce the risk of web app performances to a minimum.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Name a few techniques to optimize React app performance.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Name a few techniques to optimize React app performance.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-does-the-performance-of-using-hooks-will-differ-in",
    title: "How does the performance of using Hooks will differ in comparison with the classes?",
    prompt: "How does the performance of using Hooks will differ in comparison with the classes?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks are 100x slower than classes because functions must be recreated on every millisecond.",
        isCorrect: false,
        explanation: "Function creation in modern V8 engines is extremely fast; hooks provide comparable or better real-world performance."
      },
      {
        id: "B",
        text: "Hooks avoid class instance creation overhead, minimize HOC nesting wrapper hell, and enable fine-grained custom hook composition for optimized bundle sizes and execution.",
        isCorrect: true,
        explanation: "Correct. Hooks avoid creating class instance objects, reduce wrapper depth compared to HOCs/render props, and minify better than class methods."
      },
      {
        id: "C",
        text: "There is no difference because the compiler converts all hooks into class components at build time.",
        isCorrect: false,
        explanation: "React maintains separate fiber architectures for functional components and class components."
      },
      {
        id: "D",
        text: "Classes have lower memory usage because all instances share a single mutable global variable.",
        isCorrect: false,
        explanation: "Class instances each carry their own `this` instance binding and method references, creating higher memory allocations."
      }
    ],
    correctAnswer: "B",
    explanation: "React Hooks will avoid a lot of overheads such as the instance creation, binding of events, etc., that are present with classes. Hooks in React will result in smaller component trees since they will be avoiding the nesting that exists in HOCs (Higher Order Components) and will render props which result in less amount of work to be done by React.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does the performance of using Hooks will differ in comparison with the classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does the performance of using Hooks will differ in comparison with the classes?.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "performance-what-is-server-side-rendering-ssr-how-does-it-differ-fr",
    title: "What is server-side rendering (SSR)? How does it differ from client-side rendering?",
    prompt: "What is server-side rendering (SSR)? How does it differ from client-side rendering?",
    level: "junior",
    type: "output",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "SSR runs exclusively inside a client-side Web Worker without any backend server.",
        isCorrect: false,
        explanation: "SSR executes on backend Node.js/edge servers to render HTML before sending it to the client."
      },
      {
        id: "B",
        text: "SSR generates full HTML on the server per request so users and search engines see content immediately, followed by client hydration; CSR downloads an empty HTML shell and renders UI in browser JS.",
        isCorrect: true,
        explanation: "Correct. SSR enhances First Contentful Paint and SEO by delivering pre-rendered HTML from the server, which the client hydrates into an interactive React app."
      },
      {
        id: "C",
        text: "SSR cannot attach click event listeners or support user interactivity.",
        isCorrect: false,
        explanation: "After initial HTML display, React hydrates the DOM on the client to attach event handlers and enable full interactivity."
      },
      {
        id: "D",
        text: "CSR produces faster initial HTML load times on slow 2G mobile networks than SSR.",
        isCorrect: false,
        explanation: "CSR requires downloading and executing large JS bundles before showing UI, making it slower on slow networks."
      }
    ],
    correctAnswer: "B",
    explanation: "With server-side rendering, i.e, SSR, you don, t have to entirely build the UI in the browser; instead of that, it helps by generating the HTML on the server for each request and sending it to the browser. After the HTML is delivered, the browser displays content immediately, and React then hydrates the page to make it interactive. You can be asked the difference between Client-side-rendering and server-side rendering, so here are some points that you can keep in mind: Server-side rendering Client-side Rendering The initial render is done on the server as HTML before reaching the browser. The initial render is done on the browser using JS. You can see the content immediately on first load. CSR is a bit slower, the screen is blank, or it shows a loading process till JS executes. The server prepares the HTML, so the browser only needs to display it initially. The browser is responsible for creating and updating the DOM. The first render is faster because the content is already prepared. The first render might take time or feel slower on slow devices/networks. It is easy for a search engine to index content since it is present in the HTML. Search engines may come across difficulties here. (if JS is not executed properly) Requires a hydration step - because everything is rendered on a client. No hydration required. Part of the rendering work is done on the server to help reduce the client, s initial workload. Most of the application logic is sent to the client as JavaScript. To quickly understand the advantages of SSR: It has a faster initial load time, Better SEO And improved perceived performance Now, here are some things you need to look out for, It has a higher server load, complex infrastructure, and hydration mismatch issues, sometimes even a slight delay before full interactivity. You can also be asked questions like, \" What is hydration? In the interviews, so here, s how you can answer - Hydration is the process by which React attaches event listeners and restores component state on top of the server-rendered HTML. It converts static HTML into a fully interactive React app Must match the server-rendered output to avoid errors You should also note some modern approaches made by React:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is server-side rendering (SSR)? How does it differ from client-side rendering?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is server-side rendering (SSR)? How does it differ from client-side rendering?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "performance-context-api---this-is-used-when-the-state-has-to-be-sha",
    title: "Context API - This is used when the state has to be shared with multiple components, and it helps in avoiding prop drilling,g but please keep in mind that it can cause all consumers to re-render on updates.",
    prompt: "Context API - This is used when the state has to be shared with multiple components, and it helps in avoiding prop drilling,g but please keep in mind that it can cause all consumers to re-render on updates., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Context API requires installing 10 external npm dependencies before use.",
        isCorrect: false,
        explanation: "Context API is built directly into React core (`createContext`, `useContext`)."
      },
      {
        id: "B",
        text: "The Context API eliminates prop drilling for shared data, but all consuming components re-render when the context value changes unless split or optimized with memoized providers.",
        isCorrect: true,
        explanation: "Correct. Context provides clean tree-wide data access, but requires careful context splitting to prevent re-rendering unaffected consumers when individual fields update."
      },
      {
        id: "C",
        text: "Context API prevents all child components from ever re-rendering under any circumstances.",
        isCorrect: false,
        explanation: "Consuming components re-render whenever the value provided by the context changes referentially."
      },
      {
        id: "D",
        text: "Context values can only be read by class components using `this.contextTypes`.",
        isCorrect: false,
        explanation: "Functional components read context cleanly using the `useContext` hook."
      }
    ],
    correctAnswer: "B",
    explanation: "2. Redux - When the state becomes more complex and interdependent throughout the application, external libraries like Redux are used. It provides a centralized store, predictable updates, and middleware support, but it comes with additional boilerplate. When you look into modern alternatives, Zustand and Jotai provide simpler APIs and more efficient updates, which are usually suitable for mid-sized applications. Here are some distinctions that you can note: Client state & Server state: Client state can be managed with local state, Context, or Redux. Server state is better handled by tools like React Query, which manage caching and synchronization. When NOT to use Redux: Redux is unnecessary for small or moderately complex applications, or when most of the state is server state. So, here, s what you should do: Start with local state, then move to Context for shared state, and then use external libraries only when complexity or performance demands it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Context API - This is used when the state has to be shared with multiple components, and it helps in avoiding prop drilling,g but please keep in mind that it can cause all consumers to re-render on updates.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Context API - This is used when the state has to be shared with multiple components, and it helps in avoiding prop drilling,g but please keep in mind that it can cause all consumers to re-render on updates.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "performance-what-are-common-react-performance-optimization-techniqu-2",
    title: "What are common React performance optimization techniques? (practical guide)",
    prompt: "What are common React performance optimization techniques? (practical guide)",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Delete all React components and rewrite the entire app in raw vanilla HTML files.",
        isCorrect: false,
        explanation: "Rewriting SPAs in vanilla HTML eliminates component modularity, state reactivity, and ecosystem capabilities."
      },
      {
        id: "B",
        text: "Apply `useMemo` to every single function and arithmetic addition in the app before profiling.",
        isCorrect: false,
        explanation: "Premature memoization without profiling adds overhead and clutters code without measurable benefit."
      },
      {
        id: "C",
        text: "Profile first with React DevTools Profiler, then apply `React.memo`, `useMemo`, `useCallback`, state colocation, code splitting, and windowing to verified bottlenecks.",
        isCorrect: true,
        explanation: "Correct. Performance optimization should be measurement-driven: identify slow renders with profilers before applying memoization and architectural refactoring."
      },
      {
        id: "D",
        text: "Run all React rendering calculations inside `eval()` statements.",
        isCorrect: false,
        explanation: "`eval()` disables JavaScript engine optimizations, degrades performance, and introduces security vulnerabilities."
      }
    ],
    correctAnswer: "C",
    explanation: "When you are optimizing performance in React, your primary concern is to always reduce unnecessary re-renders and avoid expensive work. These optimizations should be applied only after identifying actual bottlenecks. Here are some practical ways that you can use to tackle it:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are common React performance optimization techniques? (practical guide).",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are common React performance optimization techniques? (practical guide).",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-prevent-unnecessary-re-renders---reactmemo",
    title: "Prevent unnecessary re-renders - React.memo",
    prompt: "Prevent unnecessary re-renders - React.memo, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`React.memo` forces a component to re-render 60 times per second.",
        isCorrect: false,
        explanation: "`React.memo` skips re-renders; it never forces high-frequency rendering."
      },
      {
        id: "B",
        text: "`React.memo` wraps a component to skip re-rendering when incoming props are shallowly equal to previous props, especially effective when passed stable callbacks/objects.",
        isCorrect: true,
        explanation: "Correct. `React.memo` is a higher-order component that performs shallow prop comparisons to skip redundant render cycles."
      },
      {
        id: "C",
        text: "`React.memo` performs deep recursive comparisons of nested JSON objects by default.",
        isCorrect: false,
        explanation: "`React.memo` uses shallow equality (`Object.is`) by default unless a custom comparison function is provided."
      },
      {
        id: "D",
        text: "`React.memo` is a hook that replaces `useState` inside functional components.",
        isCorrect: false,
        explanation: "`React.memo` is an HOC for component memoization, not a state storage hook."
      }
    ],
    correctAnswer: "B",
    explanation: "React.memo is used to memoize a component so it only re-renders when its props change. This is especially helpful for child components that end up receiving the same props because of the parent updates. This can be particularly effective when you combine it with stable props.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Prevent unnecessary re-renders - React.memo.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Prevent unnecessary re-renders - React.memo.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-stabilize-props---usecallback-usememo",
    title: "Stabilize props - useCallback, useMemo",
    prompt: "Stabilize props - useCallback, useMemo, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useCallback` preserves function references and `useMemo` preserves object/array references across renders, preventing `React.memo` children from breaking shallow equality.",
        isCorrect: true,
        explanation: "Correct. Because inline functions/objects create new references on every render, `useCallback` and `useMemo` maintain referential stability so memoized children can skip re-rendering."
      },
      {
        id: "B",
        text: "Both hooks permanently cache values in `localStorage` across page reloads.",
        isCorrect: false,
        explanation: "Memoization operates strictly in JavaScript memory during the component's lifecycle."
      },
      {
        id: "C",
        text: "`useCallback` executes functions on background threads while `useMemo` runs them on the GPU.",
        isCorrect: false,
        explanation: "Both hooks execute synchronously in JavaScript on the main thread during the render phase."
      },
      {
        id: "D",
        text: "`useMemo` speeds up network HTTP request download speeds.",
        isCorrect: false,
        explanation: "`useMemo` memoizes in-memory computation results, having no effect on network latency."
      }
    ],
    correctAnswer: "A",
    explanation: "useCallback is used to memoize functions so that new function references are not created on every render, especially when passing callbacks to memoized children. useMemo is used to cache the result of expensive computations so they are only recalculated when dependencies change. It should only be used when the computation is actually costly.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Stabilize props - useCallback, useMemo.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Stabilize props - useCallback, useMemo.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "performance-reduce-initial-load---code-splitting",
    title: "Reduce initial load - Code Splitting",
    prompt: "Reduce initial load - Code Splitting, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Disallow dynamic imports and force synchronous script loading in HTML head.",
        isCorrect: false,
        explanation: "Synchronous `<script>` tags block HTML parsing and degrade initial load performance."
      },
      {
        id: "B",
        text: "Bundle all application images, fonts, and npm libraries into a single 50MB `main.js` file.",
        isCorrect: false,
        explanation: "Shipping a massive single bundle slows down initial page loading and parsing."
      },
      {
        id: "C",
        text: "Split code by compiling every individual JSX element into a separate WebAssembly file.",
        isCorrect: false,
        explanation: "Code splitting operates at the module/route boundary, not per JSX tag."
      },
      {
        id: "D",
        text: "Split large bundles into dynamic chunks using dynamic `import()`, `React.lazy()`, and `<Suspense>`, downloading code only when the route or component is requested.",
        isCorrect: true,
        explanation: "Correct. Code splitting reduces initial JS bundle size and First Contentful Paint by loading non-critical components on demand."
      }
    ],
    correctAnswer: "D",
    explanation: "Using React.lazy and Suspense, components can be loaded only when you need them instead of bundling everything upfront. This can basically help you with reducing the initial bundle size and improving load time, especially in large applications.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Reduce initial load - Code Splitting.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Reduce initial load - Code Splitting.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-optimize-large-lists---virtualization",
    title: "Optimize large lists - Virtualization",
    prompt: "Optimize large lists - Virtualization, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Convert the list into a static non-scrollable JPEG image screenshot.",
        isCorrect: false,
        explanation: "An image eliminates text selection, searchability, accessibility, and interactive controls."
      },
      {
        id: "B",
        text: "Render only the small subset of list items currently visible in the scroll viewport (plus a buffer), recycling DOM nodes to keep memory usage and scrolling smooth.",
        isCorrect: true,
        explanation: "Correct. List virtualization (e.g. `react-window`, `react-virtualized`) renders 20-30 DOM elements instead of thousands, maintaining 60fps scrolling."
      },
      {
        id: "C",
        text: "Render all 50,000 DOM elements upfront and hide off-screen items with `opacity: 0`.",
        isCorrect: false,
        explanation: "Rendering 50,000 DOM nodes still exhausts memory and freezes layout engines even with `opacity: 0`."
      },
      {
        id: "D",
        text: "Fetch the entire list from the server on every 1px scroll event tick.",
        isCorrect: false,
        explanation: "Flooding the network on every scroll tick causes severe lag and exceeds API rate limits."
      }
    ],
    correctAnswer: "B",
    explanation: "For long lists, libraries like react-window render only the visible items instead of the entire dataset. This significantly reduces DOM nodes and improves rendering performance. Note - How to approach optimization! You need to understand that optimization should not be done prematurely. The correct approach is to use the React DevTools Profiler to identify which components are re-rendering frequently and consuming time, and then apply these techniques selectively. Now, you are good to go! React Modern Patterns & Performance",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Optimize large lists - Virtualization.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Optimize large lists - Virtualization.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "performance-what-is-reactmemo-how-is-it-different-from-usememo-and",
    title: "What is React.memo? How is it different from useMemo and useCallback?",
    prompt: "What is React.memo? How is it different from useMemo and useCallback?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "<Child user={{ name: \"Kamala\" }} />\n\nconst user = useMemo(() => ({ name: \"Kamala\" }), []);\n\nconst handleClick = useCallback(() => {\n  console.log(\"clicked\");\n}, []);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`React.memo` runs on the server; `useMemo` runs in the browser; `useCallback` runs in Web Workers.",
        isCorrect: false,
        explanation: "All three operate in standard JavaScript runtime memory during React rendering."
      },
      {
        id: "B",
        text: "`useMemo` and `useCallback` only work in class components.",
        isCorrect: false,
        explanation: "Hooks only work inside functional components or custom hooks."
      },
      {
        id: "C",
        text: "`React.memo` is an HOC that memoizes a whole component based on props; `useMemo` memoizes computed values inside a component; `useCallback` memoizes function definitions.",
        isCorrect: true,
        explanation: "Correct. `React.memo` operates externally on component props, while `useMemo` and `useCallback` operate internally within component bodies to stabilize values and callbacks."
      },
      {
        id: "D",
        text: "`React.memo` is deprecated and replaced entirely by `useMemo` for all components.",
        isCorrect: false,
        explanation: "`React.memo` remains the standard HOC for functional component prop memoization."
      }
    ],
    correctAnswer: "C",
    explanation: "Remember: React.memo works from outside, i.e, the props, and useMemo/useCallback work inside the component. You know how in React, whenever a component re-renders, all of its child components also re-render by default. And sometimes, this entire step becomes unnecessary. To prevent it from happening, we use the above three: React.memo, useMemo, & useCallback. But how are they different? Let me explain! React.memo It is an HOC (higher-order component) that is used to optimize performance and prevent a component from re-rendering if its props haven, t changed. In this case, React checks to see if the props are the same as before, If yes, it skips render If no, then re-render This comes in use a lot when a component ends up receiving the same data again and again. (becomes quite inconvenient!) But you should be careful, Even if the data looks the same, React may still think it changed. For example: Here, a new object is created every time, so React thinks props have changed, and then a re-render happens. Now, to prevent this from happening, we use: useMemo & useCallback a. useMemo stores/memorizes a value, so it doesn, t get recreated on every render. Eg: Now the same object is reused, and React.memo can work properly. b. useCallback is similar, but for functions. Eg: Without this, a new function is created every render, which can also break React.memo. You might be asked as a follow-up if a component wrapped in React.memo still re-renders, then what, s the problem. You can answer this by listing errors, such as if Parent passes inline objects/functions, or the component consumes context.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React.memo? How is it different from useMemo and useCallback?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React.memo? How is it different from useMemo and useCallback?.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "performance-what-is-the-consequence-of-using-array-indices-as-keys",
    title: "What is the consequence of using array indices as keys in React?",
    prompt: "What is the consequence of using array indices as keys in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The browser will immediately throw a fatal JavaScript syntax error and halt execution.",
        isCorrect: false,
        explanation: "Using index as key is valid JavaScript/React syntax and produces only a warning in some lint rules, not a syntax error."
      },
      {
        id: "B",
        text: "It forces all network requests to run synchronously on the main thread.",
        isCorrect: false,
        explanation: "Reconciliation keys operate purely in React's rendering pipeline."
      },
      {
        id: "C",
        text: "Reordering, inserting, or deleting items can cause component state to attach to the wrong items, trigger unnecessary re-renders, and cause UI glitches in inputs.",
        isCorrect: true,
        explanation: "Correct. When array indices shift during insertions/deletions, React mistakenly pairs existing DOM nodes and component states with new items."
      },
      {
        id: "D",
        text: "It permanently disables the browser's ability to render CSS animations.",
        isCorrect: false,
        explanation: "Index keys do not disable browser CSS engines."
      }
    ],
    correctAnswer: "C",
    explanation: "Using array indices as keys can lead to performance issues and unexpected behavior, especially when reordering or deleting items. React relies on keys to identify elements uniquely, and using indices can cause components to be re-rendered unnecessarily or display incorrect data. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the consequence of using array indices as keys in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the consequence of using array indices as keys in React?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "performance-what-is-reconciliation",
    title: "What is reconciliation?",
    prompt: "What is reconciliation?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The process of authenticating user passwords against an OAuth database.",
        isCorrect: false,
        explanation: "User authentication is identity verification, unrelated to React Virtual DOM reconciliation."
      },
      {
        id: "B",
        text: "The algorithmic process by which React diffs the previous and new Virtual DOM trees to determine the minimal set of real DOM mutations needed to synchronize the UI.",
        isCorrect: true,
        explanation: "Correct. Reconciliation compares virtual representations to apply surgical, batched updates to the actual browser DOM."
      },
      {
        id: "C",
        text: "The compilation step where TypeScript files are converted into JavaScript.",
        isCorrect: false,
        explanation: "Compilation is handled by TypeScript/Babel, whereas reconciliation is React's runtime diffing engine."
      },
      {
        id: "D",
        text: "A database replication protocol that resolves merge conflicts across distributed SQL nodes.",
        isCorrect: false,
        explanation: "Reconciliation in React is client-side Virtual DOM tree diffing."
      }
    ],
    correctAnswer: "B",
    explanation: "Reconciliation is the process by which React updates the DOM to match the virtual DOM efficiently. It involves comparing the new virtual DOM tree with the previous one and determining the minimum number of changes required to update the actual DOM. This process ensures optimal performance by avoiding unnecessary re-renders. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is reconciliation?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is reconciliation?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "performance-what-is-the-difference-between-shadow-dom-and-virtual-d",
    title: "What is the difference between Shadow DOM and Virtual DOM?",
    prompt: "What is the difference between Shadow DOM and Virtual DOM?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Shadow DOM is deprecated and replaced by Virtual DOM in HTML6.",
        isCorrect: false,
        explanation: "Shadow DOM is an active, standard browser Web Components specification."
      },
      {
        id: "B",
        text: "Both are exact duplicates of each other running in parallel Web Workers.",
        isCorrect: false,
        explanation: "They serve completely different purposes (encapsulation vs diffing optimization) and implementations."
      },
      {
        id: "C",
        text: "Shadow DOM is a browser standard providing encapsulated DOM and scoped CSS for Web Components; Virtual DOM is React's in-memory JS tree used to optimize rendering diffs.",
        isCorrect: true,
        explanation: "Correct. Shadow DOM provides native style/DOM encapsulation; Virtual DOM is a JavaScript architecture pattern for efficient UI updates."
      },
      {
        id: "D",
        text: "Shadow DOM is used only in React; Virtual DOM is a native standard in all web browsers.",
        isCorrect: false,
        explanation: "The reverse is true: Shadow DOM is a W3C browser standard; Virtual DOM is a React library concept."
      }
    ],
    correctAnswer: "C",
    explanation: "The Shadow DOM is a web standard that encapsulates a part of the DOM, isolating it from the rest of the document. It's used for creating reusable, self-contained components without affecting the global styles or scripts. The Virtual DOM is an in-memory representation of the actual DOM used to optimize rendering. It compares the current and previous states of the UI, updating only the necessary parts of the DOM, which improves performance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Shadow DOM and Virtual DOM?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Shadow DOM and Virtual DOM?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-what-are-pure-components",
    title: "What are Pure Components?",
    prompt: "What are Pure Components?",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate"
    ],
    codeSnippet: "const PureFunctionalExample = React.memo(function ({ value }) {  return <div>{value}</div>;});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that are written in pure WebAssembly without any JavaScript code.",
        isCorrect: false,
        explanation: "Pure components are standard JavaScript React components using shallow equality checks."
      },
      {
        id: "B",
        text: "Components that contain zero props, zero state, and render an empty string.",
        isCorrect: false,
        explanation: "Pure components accept props and manage state; purity refers to shallow memoization of rendering."
      },
      {
        id: "C",
        text: "Components that perform deep recursive comparisons of nested JSON structures.",
        isCorrect: false,
        explanation: "Pure components perform shallow reference equality checks (`Object.is`), not deep recursive comparisons."
      },
      {
        id: "D",
        text: "Components that only re-render when their props or state change, relying on shallow equality comparisons (`React.PureComponent` for classes, `React.memo` for functions).",
        isCorrect: true,
        explanation: "Correct. Pure components skip rendering if shallow comparisons show that props and state have not changed, preventing redundant render cycles."
      }
    ],
    correctAnswer: "D",
    explanation: "Pure Components in React are components that only re-render when their props or state change. They use shallow comparison to check if the props or state have changed, preventing unnecessary re-renders and improving performance. Class components can extend React.PureComponent to become pure Functional components can use React.memo for the same effect With the React Compiler, manual memoization with React.memo, useMemo, and useCallback is rarely needed; the compiler inserts equivalent memoization automatically.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Pure Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Pure Components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-the-usecallback-hook-in-react-and-when-should-i",
    title: "What is the useCallback hook in React and when should it be used?",
    prompt: "What is the useCallback hook in React and when should it be used?",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeSnippet: "const memoizedCallback = useCallback(() => {  doSomething(a, b);}, [a, b]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Caches function output in `localStorage` across page reloads.",
        isCorrect: false,
        explanation: "`useCallback` operates in JavaScript memory during the component's active session."
      },
      {
        id: "B",
        text: "Memoizes a callback function instance between renders, returning the same reference unless dependencies change; useful when passing callbacks to `React.memo` children.",
        isCorrect: true,
        explanation: "Correct. `useCallback` provides referential stability for functions, preventing memoized child components from unnecessarily re-rendering due to new function references."
      },
      {
        id: "C",
        text: "Executes the callback function 50 times in parallel on Web Worker threads.",
        isCorrect: false,
        explanation: "`useCallback` does not execute the function; it only caches its reference."
      },
      {
        id: "D",
        text: "Converts synchronous functions into async promises that resolve automatically.",
        isCorrect: false,
        explanation: "`useCallback` preserves the exact signature and behavior of the passed function."
      }
    ],
    correctAnswer: "B",
    explanation: "The useCallback hook memoizes functions to prevent their recreation on every render. This is especially beneficial when passing callbacks to optimized child components that depend on reference equality to avoid unnecessary renders. Use it when a function is passed as a prop to a memoized child component. With the React Compiler enabled, you rarely need useCallback manually; the compiler inserts equivalent memoization automatically. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useCallback hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useCallback hook in React and when should it be used?.",
    hints: [
      "useCallback only helps if the child actually skips work because of it. On its own it is overhead."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useCallback"
  },
  {
    id: "performance-what-is-the-usememo-hook-in-react-and-when-should-it-be",
    title: "What is the useMemo hook in React and when should it be used?",
    prompt: "What is the useMemo hook in React and when should it be used?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "hooks"
    ],
    codeSnippet: "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Runs an asynchronous HTTP fetch after the component mounts to the screen.",
        isCorrect: false,
        explanation: "Asynchronous side effects belong inside `useEffect`, not `useMemo`."
      },
      {
        id: "B",
        text: "Memoizes the calculated result of an expensive calculation, recalculating only when dependencies change referentially, avoiding redundant work on every render.",
        isCorrect: true,
        explanation: "Correct. `useMemo(() => computeExpensiveValue(a, b), [a, b])` caches the return value to prevent costly recalculations during unrelated component updates."
      },
      {
        id: "C",
        text: "Forces the component to re-render in the background on every millisecond tick.",
        isCorrect: false,
        explanation: "`useMemo` is an optimization to avoid work, not to trigger extra re-renders."
      },
      {
        id: "D",
        text: "Caches data permanently in the user's browser disk cache across browser restarts.",
        isCorrect: false,
        explanation: "`useMemo` is an in-memory cache during the component's lifecycle."
      }
    ],
    correctAnswer: "B",
    explanation: "The useMemo hook memoizes costly calculations, recomputing them only when dependencies change. This enhances performance by avoiding unnecessary recalculations. It should be used for computationally intensive functions that don't need to run on every render. With the React Compiler enabled, you rarely need useMemo manually; the compiler memoizes derived values automatically. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useMemo hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useMemo hook in React and when should it be used?.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "performance-can-you-explain-how-to-create-and-use-custom-hooks-in-r",
    title: "Can you explain how to create and use custom hooks in React?",
    prompt: "Can you explain how to create and use custom hooks in React?",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeSnippet: "function useForm(initialState) {  const [formData, setFormData] = useState(initialState);  const handleChange = (e) =>    setFormData({ ...formData, [e.target.name]: e.target.value });  return [formData, handleChange];}\n\nfunction MyForm() {  const [formData, handleChange] = useForm({ name: '', email: '' });  return <input name=\"name\" value={formData.name} onChange={handleChange} />;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Register a custom HTML Web Component tag using `customElements.define()`.",
        isCorrect: false,
        explanation: "Custom hooks are React logic abstractions, distinct from browser Custom Elements."
      },
      {
        id: "B",
        text: "Declare a global variable on `window` prefixed with `use`.",
        isCorrect: false,
        explanation: "Custom hooks are encapsulated functions that follow React's hook rules, not global variables."
      },
      {
        id: "C",
        text: "Create a JavaScript function starting with `use` that calls built-in hooks (`useState`, `useEffect`, etc.) and returns state/handlers, then call it from components.",
        isCorrect: true,
        explanation: "Correct. Custom hooks let you extract and reuse stateful logic across multiple components while maintaining completely isolated state per component instance."
      },
      {
        id: "D",
        text: "Create an ES6 class extending `React.CustomHook` and instantiate it with `new`.",
        isCorrect: false,
        explanation: "Custom hooks are plain functions, not ES6 classes, and are called directly, never with `new`."
      }
    ],
    correctAnswer: "C",
    explanation: "To create and use custom hooks in React: Create a function that starts with use and uses built-in hooks like useState or useEffect Return the values or functions you want to share. Example: Use the Hook: Custom hooks let you reuse logic across components, keeping your code clean. Advanced concepts Mastering React's advanced concepts like Suspense, forwardRef(), and context demonstrates that you can handle performance optimization, code splitting, and complex component patterns. In interviews, this shows you're prepared to build scalable, maintainable applications beyond just basic component logic.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can you explain how to create and use custom hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can you explain how to create and use custom hooks in React?.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "react-what-is-react-suspense",
    title: "What is React Suspense?",
    prompt: "What is React Suspense?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "performance",
    tags: [
      "react",
      "performance",
      "junior"
    ],
    codeSnippet: "const LazyComponent = React.lazy(() => import('./LazyComponent'));\nfunction MyComponent() {  return (    <React.Suspense fallback={<div>Loading...</div>}>      <LazyComponent />    </React.Suspense>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A feature that freezes the browser event loop for 10 seconds.",
        isCorrect: false,
        explanation: "Suspense handles asynchronous loading without blocking the main browser thread."
      },
      {
        id: "B",
        text: "An API used exclusively to pause CSS animations on hover.",
        isCorrect: false,
        explanation: "Suspense manages component loading states, not CSS animations."
      },
      {
        id: "C",
        text: "A method that suspends user accounts when authentication fails.",
        isCorrect: false,
        explanation: "Suspense is a UI loading boundary primitive, not an account security manager."
      },
      {
        id: "D",
        text: "A component boundary (`<Suspense fallback={<Spinner />}>`) that lets children wait for asynchronous code (lazy loading) or data to resolve before displaying UI.",
        isCorrect: true,
        explanation: "Correct. Suspense declaratively orchestrates loading states for dynamic imports, async data fetching (via `use`), and streaming server-side rendering."
      }
    ],
    correctAnswer: "D",
    explanation: "React Suspense allows handling asynchronous operations more elegantly within components. It provides fallback content while waiting for resources like data or code to load. You can use it alongside React.lazy() for code splitting. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Suspense?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Suspense?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-what-is-code-splitting-in-a-react-application",
    title: "What is code splitting in a React application?",
    prompt: "What is code splitting in a React application?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "// Using React.lazy and Suspenseconst LazyComponent = React.lazy(() => import('./LazyComponent'));\nfunction App() {  return (    <React.Suspense fallback={<div>Loading...</div>}>      <LazyComponent />    </React.Suspense>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Splitting large JavaScript bundles into smaller chunks loaded on demand via dynamic `import()` and `React.lazy()`, reducing initial download size and load times.",
        isCorrect: true,
        explanation: "Correct. Code splitting defers downloading non-critical routes and heavy components until they are actually needed, speeding up First Contentful Paint."
      },
      {
        id: "B",
        text: "Compressing image assets into ZIP files before uploading to the server.",
        isCorrect: false,
        explanation: "Code splitting is a JavaScript bundler technique, not an image compression format."
      },
      {
        id: "C",
        text: "Splitting a monolithic backend server into multiple Docker microservices.",
        isCorrect: false,
        explanation: "In React frontend context, code splitting refers to client bundle chunking."
      },
      {
        id: "D",
        text: "Dividing a single CSS stylesheet into separate lines of text at build time.",
        isCorrect: false,
        explanation: "Code splitting divides JavaScript code modules into asynchronous bundle files."
      }
    ],
    correctAnswer: "A",
    explanation: "Code splitting enhances performance by dividing code into smaller chunks loaded on demand, thereby reducing initial load times. This can be achieved through dynamic import() statements or using React's React.lazy and Suspense. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is code splitting in a React application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is code splitting in a React application?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-how-would-one-optimize-the-performance-of-react-context",
    title: "How would one optimize the performance of React contexts to reduce rerenders?",
    prompt: "How would one optimize the performance of React contexts to reduce rerenders?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "rendering"
    ],
    codeSnippet: "const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Wrap every single HTML primitive tag in its own independent Context Provider.",
        isCorrect: false,
        explanation: "Creating hundreds of granular providers adds massive component tree nesting and memory overhead."
      },
      {
        id: "B",
        text: "Store mutable objects in context and mutate properties directly without calling state setters.",
        isCorrect: false,
        explanation: "Direct mutation without new object references prevents React from detecting changes and updating consumers reliably."
      },
      {
        id: "C",
        text: "Memoize the provider value with `useMemo`, split contexts into separate providers for state and dispatch (or distinct domains), and keep state close to consumers.",
        isCorrect: true,
        explanation: "Correct. Context re-renders all consumers when its value reference changes; splitting contexts and memoizing value objects prevents unnecessary consumer re-renders."
      },
      {
        id: "D",
        text: "Context performance cannot be optimized; Redux must always be used instead.",
        isCorrect: false,
        explanation: "Context can be highly performant when properly split and combined with memoized providers."
      }
    ],
    correctAnswer: "C",
    explanation: "Optimizing context performance involves memoizing context values with useMemo, splitting contexts for isolated state changes, and employing selectors to rerender only necessary components. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How would one optimize the performance of React contexts to reduce rerenders?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How would one optimize the performance of React contexts to reduce rerenders?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-what-are-some-pitfalls-of-using-context-in-react",
    title: "What are some pitfalls of using context in React?",
    prompt: "What are some pitfalls of using context in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Context cannot be consumed inside functional components.",
        isCorrect: false,
        explanation: "The `useContext` hook makes consuming context in functional components trivial."
      },
      {
        id: "B",
        text: "All consuming components re-render whenever the context value changes (even if they only need a subset of the value), and monolithic contexts harm component reusability.",
        isCorrect: true,
        explanation: "Correct. Context lacks built-in selector subscriptions; any change to the provided value forces all consuming components to re-render unless split or optimized."
      },
      {
        id: "C",
        text: "Context causes immediate memory leaks by preventing browser garbage collection.",
        isCorrect: false,
        explanation: "Context values are garbage collected normally when components unmount."
      },
      {
        id: "D",
        text: "Context can only store boolean values and rejects objects and arrays.",
        isCorrect: false,
        explanation: "Context stores any JavaScript data type, including complex objects, functions, and arrays."
      }
    ],
    correctAnswer: "B",
    explanation: "Context in React can lead to performance issues if not handled carefully, causing unnecessary re-renders of components that consume the context, even if only part of the context changes. Overusing context for state management can also make the code harder to maintain and understand. It's best to use context sparingly and consider other state management solutions like Redux or Zustand for more complex scenarios. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are some pitfalls of using context in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are some pitfalls of using context in React?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "performance-explain-what-happens-when-setstate-is-called-in-react",
    title: "Explain what happens when setState is called in React?",
    prompt: "Explain what happens when setState is called in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function Counter() {  const [count, setCount] = React.useState(0);\n  const increment = () => {    setCount(count + 1); // Calls setState to update state  };\n  return <button onClick={increment}>Count: {count}</button>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React deletes the component instance and forces the user to log in again.",
        isCorrect: false,
        explanation: "State updates simply schedule component re-renders with the updated state."
      },
      {
        id: "B",
        text: "React mutates the state variable synchronously on the exact same line of execution.",
        isCorrect: false,
        explanation: "State updates are scheduled and batched asynchronously; the variable in the current render closure remains unchanged."
      },
      {
        id: "C",
        text: "React enqueues the state update, batches updates within the event loop tick, schedules a re-render of the component and its children, diffs the VDOM, and commits minimal DOM changes.",
        isCorrect: true,
        explanation: "Correct. Calling `setState` (or a hook setter) schedules a re-render; React batches concurrent updates and reconciles the virtual DOM to update the real DOM efficiently."
      },
      {
        id: "D",
        text: "The browser triggers a full page reload from the web server.",
        isCorrect: false,
        explanation: "React updates the DOM in-place without page reloads."
      }
    ],
    correctAnswer: "C",
    explanation: "When setState is called in React: State update: It updates the component's state, triggering a re-render of the component Batching: React may batch multiple setState calls into a single update for performance optimization Re-render: React re-renders the component (and its child components if needed) with the new state Asynchronous: State updates may be asynchronous, meaning React doesn't immediately apply the state change; it schedules it for later to optimize performance Example: In this example, calling setState (via setCount) triggers a re-render with the updated count.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain what happens when setState is called in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain what happens when setState is called in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-describe-lazy-loading-in-react",
    title: "Describe lazy loading in React",
    prompt: "Describe lazy loading in React, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React, { Suspense, lazy } from 'react';\nconst LazyComponent = lazy(() => import('./LazyComponent'));\nfunction App() {  return (    <Suspense fallback={<div>Loading...</div>}>      <LazyComponent />    </Suspense>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Deferring the loading of component code bundles until they are actually rendered on screen using `React.lazy()` and `<Suspense>`, speeding up initial page load.",
        isCorrect: true,
        explanation: "Correct. Lazy loading splits code into on-demand chunks, allowing the initial page bundle to remain small and fast."
      },
      {
        id: "B",
        text: "A compiler feature that translates React components into PHP scripts on demand.",
        isCorrect: false,
        explanation: "Lazy loading uses dynamic `import()` to fetch client JavaScript chunks asynchronously."
      },
      {
        id: "C",
        text: "Delaying the rendering of components by 10 seconds to reduce CPU temperature.",
        isCorrect: false,
        explanation: "Lazy loading optimizes bundle delivery, not an artificial thermal throttle."
      },
      {
        id: "D",
        text: "Loading all images and components synchronously before parsing the HTML head.",
        isCorrect: false,
        explanation: "Synchronous upfront loading is the opposite of lazy loading."
      }
    ],
    correctAnswer: "A",
    explanation: "Lazy loading in React is a technique where components are loaded only when they are needed, rather than at the initial page load. This helps reduce the initial load time and improve performance by splitting the code into smaller chunks. Example: In this example, LazyComponent is loaded only when it's rendered, and while loading, a fallback UI (Loading.) is displayed.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Describe lazy loading in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Describe lazy loading in React.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-what-are-concurrent-features-in-react-and-how-do-they-i",
    title: "What are concurrent features in React, and how do they improve rendering performance?",
    prompt: "What are concurrent features in React, and how do they improve rendering performance?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A global switch that executes all React code in parallel C++ threads on the GPU.",
        isCorrect: false,
        explanation: "Concurrent features are JavaScript scheduling mechanisms within React's fiber engine, not C++ GPU threads."
      },
      {
        id: "B",
        text: "A mode that disables all state updates to prevent re-renders completely.",
        isCorrect: false,
        explanation: "Concurrent features manage how updates are prioritized and rendered, not disable them."
      },
      {
        id: "C",
        text: "A feature that automatically converts client components into SQL database tables.",
        isCorrect: false,
        explanation: "Concurrent features optimize client rendering responsiveness."
      },
      {
        id: "D",
        text: "Features introduced in React 18 (`useTransition`, `useDeferredValue`, Suspense) that allow React to pause, interrupt, and prioritize rendering work to keep the UI responsive during heavy updates.",
        isCorrect: true,
        explanation: "Correct. Concurrent rendering allows urgent user interactions (typing, clicking) to interrupt non-urgent renders (large list filtering), preventing UI freezes."
      }
    ],
    correctAnswer: "D",
    explanation: "Concurrent features were introduced in React 18 (the experimental \"Concurrent Mode\" branding from React 17 is no longer used). They let React pause, interrupt, and resume rendering work instead of running it as a single blocking pass. This keeps the UI responsive: urgent updates like typing or clicks can preempt slower work like rendering a large list or filtering search results. The features are opt-in via specific APIs (useTransition, useDeferredValue, and <Suspense> for data fetching), not a global mode switch.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are concurrent features in React, and how do they improve rendering performance?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are concurrent features in React, and how do they improve rendering performance?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "performance-how-would-you-handle-long-running-tasks-or-expensive-co",
    title: "How would you handle long-running tasks or expensive computations in React applications without blocking the UI?",
    prompt: "How would you handle long-running tasks or expensive computations in React applications without blocking the UI?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeSnippet: "const [data, setData] = useState(null);\nuseEffect(() => {  setTimeout(() => {    const result = computeExpensiveData();    setData(result);  }, 0);}, []);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Disable JavaScript execution in the browser.",
        isCorrect: false,
        explanation: "Disabling JavaScript prevents the application from functioning."
      },
      {
        id: "B",
        text: "Execute the expensive calculation in an infinite synchronous while loop on the main thread.",
        isCorrect: false,
        explanation: "A synchronous while loop blocks the event loop and locks up the browser completely."
      },
      {
        id: "C",
        text: "Wrap the calculation in 50 nested `useState` hooks.",
        isCorrect: false,
        explanation: "Hooks manage state; they do not offload heavy CPU calculations from the main thread."
      },
      {
        id: "D",
        text: "Offload heavy calculations to Web Workers, chunk tasks with `scheduler` / `requestIdleCallback`, use transitions (`useTransition`), or memoize with `useMemo`.",
        isCorrect: true,
        explanation: "Correct. Keeping the main thread responsive during heavy calculations requires offloading to Web Workers, yielding time slices, or marking updates as non-urgent transitions."
      }
    ],
    correctAnswer: "D",
    explanation: "To avoid blocking the UI, use Web Workers, setTimeout, or requestIdleCallback for offloading heavy computations. Alternatively, break tasks into smaller parts and use React's Suspense or useMemo to only recompute when necessary. Example using setTimeout for deferring computation:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How would you handle long-running tasks or expensive computations in React applications without blocking the UI?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How would you handle long-running tasks or expensive computations in React applications without blocking the UI?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-explain-static-generation-of-react-applications",
    title: "Explain static generation of React applications",
    prompt: "Explain static generation of React applications, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Generating HTML dynamically on the server for every single incoming HTTP request.",
        isCorrect: false,
        explanation: "Generating on each request is Server-Side Rendering (SSR), not Static Site Generation (SSG)."
      },
      {
        id: "B",
        text: "Rendering empty HTML shells that require client JavaScript to fetch all content.",
        isCorrect: false,
        explanation: "Rendering empty shells is Client-Side Rendering (CSR)."
      },
      {
        id: "C",
        text: "Pre-rendering HTML pages at build time so they can be cached globally on CDNs, providing instant page loads, reduced server load, and optimal SEO.",
        isCorrect: true,
        explanation: "Correct. Static Site Generation (SSG) compiles pages into static HTML/CSS at build time, allowing CDN caching and lightning-fast delivery."
      },
      {
        id: "D",
        text: "Generating static PDF documents from React components.",
        isCorrect: false,
        explanation: "SSG produces static HTML/CSS web pages for browser consumption."
      }
    ],
    correctAnswer: "C",
    explanation: "Static generation pre-renders HTML at build time instead of runtime; this approach enhances performance by delivering static content quickly while improving SEO outcomes. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain static generation of React applications.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain static generation of React applications.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-some-common-pitfalls-when-doing-data-fetching",
    title: "What are some common pitfalls when doing data fetching in React?",
    prompt: "What are some common pitfalls when doing data fetching in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Using TypeScript interfaces to type API response data.",
        isCorrect: false,
        explanation: "Typing API responses with TypeScript is a best practice, not a pitfall."
      },
      {
        id: "B",
        text: "Caching API responses with appropriate TTL expiration policies.",
        isCorrect: false,
        explanation: "Response caching is a core performance optimization."
      },
      {
        id: "C",
        text: "Neglecting loading and error states, creating network waterfalls, missing effect cleanups (race conditions), and triggering infinite fetch loops from missing/unstable dependencies.",
        isCorrect: true,
        explanation: "Correct. Common pitfalls include race conditions from uncancelled fetches, unhandled error states, missing loading indicators, and stale closure dependency bugs."
      },
      {
        id: "D",
        text: "Handling network errors with user-friendly retry buttons.",
        isCorrect: false,
        explanation: "Providing retry mechanisms is an excellent UX practice."
      }
    ],
    correctAnswer: "C",
    explanation: "Common pitfalls in data fetching with React include failing to handle loading and error states, neglecting to clean up subscriptions which can cause memory leaks, and improperly using lifecycle methods or hooks. Always ensure proper handling of these states, clean up after components, and utilize useEffect for side effects in functional components. Find in-depth explanations and track study progress here -> React Router Understanding React Router is important in front end interviews because most real-world applications need client-side routing to handle navigation, dynamic URLs, and nested layouts. Proficiency with routing shows you can structure applications effectively and provide a seamless user experience.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are some common pitfalls when doing data fetching in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are some common pitfalls when doing data fetching in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-the-router-components-of-react-router-v6",
    title: "What are the <Router> components of React Router v6?",
    prompt: "What are the <Router> components of React Router v6?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There is only a single monolithic `<AppRouter>` component in React Router v6.",
        isCorrect: false,
        explanation: "React Router provides multiple specialized router components for different environments."
      },
      {
        id: "B",
        text: "`<CanvasRouter>` for WebGL games and `<VRRouter>` for virtual reality headsets.",
        isCorrect: false,
        explanation: "These are not router components in React Router."
      },
      {
        id: "C",
        text: "`<BrowserRouter>` for HTML5 history web apps, `<HashRouter>` for hash-based static hosting, `<MemoryRouter>` for tests/React Native, and `<StaticRouter>` for server-side rendering.",
        isCorrect: true,
        explanation: "Correct. React Router provides specialized router wrappers tailored to browser, hash, in-memory, and server rendering environments."
      },
      {
        id: "D",
        text: "`<SqlRouter>` for PostgreSQL databases and `<RedisRouter>` for cache servers.",
        isCorrect: false,
        explanation: "React Router is a frontend web routing library, unrelated to backend database routing."
      }
    ],
    correctAnswer: "C",
    explanation: "In React Router v6, the key <Router> components are: <BrowserRouter>: Uses the HTML5 history API to keep the UI in sync with the URL. It's commonly used for web applications. <HashRouter>: Uses URL hash fragments (#) to manage routing, making it suitable for static file hosting or legacy browsers that don't support the HTML5 history API. <MemoryRouter>: Keeps the URL in memory (no address bar changes), useful for non-browser environments like tests or embedded apps. <StaticRouter>: Used for server-side rendering (SSR), where routing is handled without a browser, typically in Node.js environments. Each of these routers serves different use cases but provides the same routing functionality within a React app.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the <Router> components of React Router v6?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the <Router> components of React Router v6?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "performance-what-is-the-react-compiler",
    title: "What is the React Compiler?",
    prompt: "What is the React Compiler?",
    level: "intermediate",
    type: "output",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A runtime linter that throws JavaScript alert boxes in production.",
        isCorrect: false,
        explanation: "The React Compiler runs statically during the build step."
      },
      {
        id: "B",
        text: "An opt-in build-time compiler (React Forget) that analyzes component code and automatically inserts fine-grained memoization, eliminating the need for manual `useMemo`/`useCallback`/`React.memo`.",
        isCorrect: true,
        explanation: "Correct. The React Compiler understands JavaScript semantics and the Rules of React to auto-memoize values and components, optimizing re-renders automatically at build time."
      },
      {
        id: "C",
        text: "A hardware compiler that prints physical silicon chips from React source code.",
        isCorrect: false,
        explanation: "The React Compiler is a Babel/SWC build-time software plugin."
      },
      {
        id: "D",
        text: "A tool that converts React applications into Angular frameworks.",
        isCorrect: false,
        explanation: "The React Compiler optimizes React component memoization, unrelated to Angular."
      }
    ],
    correctAnswer: "B",
    explanation: "The React Compiler is an opt-in build-time tool that analyzes your components and automatically inserts memoization equivalent to useMemo, useCallback, and React.memo where it's safe. It removes the need for manual memoization in most cases. It enforces the Rules of React strictly: if your code violates them (e.g., mutating props, calling hooks conditionally), the compiler skips that component instead of producing incorrect output.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the React Compiler?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the React Compiler?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-explain-the-building-blocks-of-react",
    title: "Explain the Building Blocks of React",
    prompt: "Explain the Building Blocks of React, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "SQL tables, Redis caches, Apache web servers, and Docker containers.",
        isCorrect: false,
        explanation: "These are backend infrastructure components, not React UI library building blocks."
      },
      {
        id: "B",
        text: "CPU registers, motherboard buses, RAM slots, and disk drivers.",
        isCorrect: false,
        explanation: "These are physical hardware components, not React software concepts."
      },
      {
        id: "C",
        text: "Components (reusable UI units), JSX (declarative syntax), Props (input data), State (internal mutable data), Context (shared tree state), and Virtual DOM (diffing engine).",
        isCorrect: true,
        explanation: "Correct. These foundational building blocks define React's component-driven, declarative architecture."
      },
      {
        id: "D",
        text: "Flash animations, Java Applets, ActiveX plugins, and Silverlight modules.",
        isCorrect: false,
        explanation: "These are obsolete browser plugins unrelated to React."
      }
    ],
    correctAnswer: "C",
    explanation: "React, s main parts: Components: Reusable UI units that return JSX. JSX: JavaScript syntax extension that looks like HTML. Props and State: Props pass data in; state stores local, changeable data. Context: Share data across many components without prop drilling. Virtual DOM: An in-memory copy of the DOM used to compute minimal updates.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Building Blocks of React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Building Blocks of React.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-virtual-dom-in-react",
    title: "What is Virtual DOM in React?",
    prompt: "What is Virtual DOM in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A permanent snapshot of the DOM stored in local browser cookies.",
        isCorrect: false,
        explanation: "Virtual DOM lives ephemerally in JavaScript runtime RAM."
      },
      {
        id: "B",
        text: "A lightweight in-memory JavaScript representation of the real DOM that React diffs during reconciliation to compute and batch minimal real DOM updates.",
        isCorrect: true,
        explanation: "Correct. The Virtual DOM allows React to calculate UI changes in memory before touching the slower browser DOM."
      },
      {
        id: "C",
        text: "A browser API built into Chrome and Firefox that replaces the HTML parser with WebGL.",
        isCorrect: false,
        explanation: "Virtual DOM is a React JavaScript library abstraction, not a native browser WebGL parser."
      },
      {
        id: "D",
        text: "An isolated Shadow DOM container used strictly for CSS style encapsulation.",
        isCorrect: false,
        explanation: "Shadow DOM is a Web Component standard, distinct from React's Virtual DOM."
      }
    ],
    correctAnswer: "B",
    explanation: "The Virtual DOM is an in-memory representation of the real DOM. React builds a new virtual tree on updates, diffs it against the previous tree, and applies the minimal set of real DOM changes. That diffing and batching make updates faster.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Virtual DOM in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Virtual DOM in React?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-differentiate-between-real-dom-and-virtual-dom",
    title: "Differentiate Between Real DOM and Virtual DOM?",
    prompt: "Differentiate Between Real DOM and Virtual DOM?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Real DOM is the browser's live node tree where direct mutations cause costly reflows/repaints; Virtual DOM is a fast in-memory JS tree where React batches diffs before touching real DOM.",
        isCorrect: true,
        explanation: "Correct. Virtual DOM diffing minimizes expensive browser layout thrashing and repaints by computing the minimal required real DOM mutations."
      },
      {
        id: "B",
        text: "Real DOM only exists on mobile phones, while Virtual DOM exists on desktop computers.",
        isCorrect: false,
        explanation: "Both concepts apply across all web browser environments."
      },
      {
        id: "C",
        text: "Real DOM runs in JavaScript memory; Virtual DOM is rendered directly by browser C++ engines.",
        isCorrect: false,
        explanation: "The reverse is true: Real DOM is the browser's C++ document object model; Virtual DOM is React's JS tree."
      },
      {
        id: "D",
        text: "Real DOM updates are always 1000x faster than Virtual DOM calculations.",
        isCorrect: false,
        explanation: "Direct real DOM mutations often cause layout thrashing and slow down complex UI updates."
      }
    ],
    correctAnswer: "A",
    explanation: "Real DOM: Actual browser DOM tree Slower for many updates Direct updates can re-render large parts of the UI Virtual DOM: Lightweight copy kept in memory Faster because React computes minimal changes Batches and applies only necessary updates to the real DOM",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Differentiate Between Real DOM and Virtual DOM?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Differentiate Between Real DOM and Virtual DOM?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-what-is-thissetstate-function-in-react",
    title: "What is this.setState Function in React?",
    prompt: "What is this.setState Function in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A function that converts class components into functional components automatically.",
        isCorrect: false,
        explanation: "`this.setState` is standard class component state management."
      },
      {
        id: "B",
        text: "A method that clears all browser cookies and local storage.",
        isCorrect: false,
        explanation: "`this.setState` updates component state in memory."
      },
      {
        id: "C",
        text: "A method that mutates state variables synchronously on the exact same line.",
        isCorrect: false,
        explanation: "`this.setState` is asynchronous and scheduled by React's batching engine."
      },
      {
        id: "D",
        text: "The class component method that enqueues state updates, shallowly merges changes into `this.state`, and triggers re-rendering of the component subtree.",
        isCorrect: true,
        explanation: "Correct. `this.setState(partialStateOrUpdater, callback)` updates class component state asynchronously and schedules reconciliation."
      }
    ],
    correctAnswer: "D",
    explanation: "this.setState updates the component state and triggers re-rendering. You can update only parts of the state and call setState multiple times; React batches updates for performance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is this.setState Function in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is this.setState Function in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-to-optimize-a-react-code",
    title: "How to Optimize a React code?",
    prompt: "How to Optimize a React code?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Disable browser JavaScript execution entirely.",
        isCorrect: false,
        explanation: "Disabling JavaScript prevents client interactivity."
      },
      {
        id: "B",
        text: "Wrap every single HTML primitive tag in an independent Redux store.",
        isCorrect: false,
        explanation: "Over-connecting atoms to global stores creates massive memory overhead and reduces performance."
      },
      {
        id: "C",
        text: "Mutate state directly without calling `setState` or dispatching actions.",
        isCorrect: false,
        explanation: "Direct state mutation causes stale UI bugs and violates React's reactive rendering model."
      },
      {
        id: "D",
        text: "Use `React.memo` / `useMemo` / `useCallback` for expensive renders/computations, code-split with `React.lazy`/`<Suspense>`, virtualize long lists, and colocate state.",
        isCorrect: true,
        explanation: "Correct. Key optimization strategies include reducing redundant re-renders, shrinking initial bundles, windowing large DOM lists, and keeping state close to consumers."
      }
    ],
    correctAnswer: "D",
    explanation: "Optimize by: Binding functions in constructors where needed. Avoid inline props or handlers that change on each render. Using React.Fragment to avoid extra DOM nodes. Lazy loading components to reduce initial bundle size.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Optimize a React code?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Optimize a React code?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-can-you-optimize-react-performance",
    title: "How Can You Optimize React Performance?",
    prompt: "How Can You Optimize React Performance?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Wrap every single integer variable in its own global Redux store.",
        isCorrect: false,
        explanation: "Over-connecting fine-grained primitives to global stores creates massive memory overhead."
      },
      {
        id: "B",
        text: "Mutate state directly without calling `setState` or dispatching actions.",
        isCorrect: false,
        explanation: "Direct state mutation causes stale UI bugs and breaks React's reactive rendering model."
      },
      {
        id: "C",
        text: "Apply `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders, code-split with `React.lazy`/`<Suspense>`, virtualize large lists, and colocate state.",
        isCorrect: true,
        explanation: "Correct. Comprehensive optimization involves memoizing expensive computations, deferring bundle chunks, windowing large DOM lists, and keeping state close to consumers."
      },
      {
        id: "D",
        text: "Disable browser JavaScript execution entirely.",
        isCorrect: false,
        explanation: "Disabling JavaScript prevents client interactivity."
      }
    ],
    correctAnswer: "C",
    explanation: "Use React.memo to skip re-renders, React.lazy and Suspense for code splitting, useMemo and useCallback to memoize values and functions, and avoid unnecessary state updates.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Can You Optimize React Performance?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Can You Optimize React Performance?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-lazy-loading-in-react",
    title: "What is Lazy Loading in React?",
    prompt: "What is Lazy Loading in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A compiler feature that translates React components into PHP scripts on demand.",
        isCorrect: false,
        explanation: "Lazy loading uses dynamic `import()` to fetch client JavaScript chunks asynchronously."
      },
      {
        id: "B",
        text: "Delaying component state updates by 10 seconds to save CPU battery.",
        isCorrect: false,
        explanation: "Lazy loading optimizes bundle delivery, not an artificial state delay."
      },
      {
        id: "C",
        text: "A performance optimization technique that defers loading component code bundles until they are rendered on screen using `React.lazy()` and `<Suspense>`.",
        isCorrect: true,
        explanation: "Correct. Lazy loading splits code into on-demand chunks, reducing initial bundle download size and improving page load times."
      },
      {
        id: "D",
        text: "Loading all application assets synchronously in `<head>` before page render.",
        isCorrect: false,
        explanation: "Synchronous upfront loading is the exact opposite of lazy loading."
      }
    ],
    correctAnswer: "C",
    explanation: "Lazy loading delays loading a component until it is required. React.lazy and Suspense let you split code and reduce initial bundle size, improving load performance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Lazy Loading in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Lazy Loading in React?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-what-is-memoization-in-react",
    title: "What is Memoization in React?",
    prompt: "What is Memoization in React?",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Forcing components to re-render 60 times per second.",
        isCorrect: false,
        explanation: "Memoization skips redundant work; it does not force extra re-renders."
      },
      {
        id: "B",
        text: "Deleting unused variables from JavaScript runtime memory automatically.",
        isCorrect: false,
        explanation: "Garbage collection handles memory deallocation; memoization caches calculation results."
      },
      {
        id: "C",
        text: "Storing user passwords permanently in unencrypted browser cookies.",
        isCorrect: false,
        explanation: "Memoization is an in-memory computation optimization, unrelated to cookie storage."
      },
      {
        id: "D",
        text: "Caching the result of expensive calculations (`useMemo`), function references (`useCallback`), or component render outputs (`React.memo`) to avoid redundant work.",
        isCorrect: true,
        explanation: "Correct. Memoization stores calculation results and component outputs, returning cached values when inputs remain unchanged."
      }
    ],
    correctAnswer: "D",
    explanation: "Memoization stores the result of expensive computations and returns the cached result when inputs stay the same. React tools: React.memo for functional component memoization. useMemo to memoize computed values.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Memoization in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Memoization in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-usestate-explained-local-state-inside-functional-compon",
    title: "useState explained: Local State Inside Functional Components",
    prompt: "useState explained: Local State Inside Functional Components, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useState` stores all data in global browser `localStorage` automatically.",
        isCorrect: false,
        explanation: "`useState` manages in-memory component state during the active session."
      },
      {
        id: "B",
        text: "`useState` can only store primitive numbers and booleans, rejecting objects.",
        isCorrect: false,
        explanation: "`useState` supports all JavaScript data types (objects, arrays, functions, primitives)."
      },
      {
        id: "C",
        text: "`useState` provides local mutable state in functional components; updates are scheduled asynchronously, state is immutable, and updater callbacks `setVal(p => p+1)` handle dependent updates.",
        isCorrect: true,
        explanation: "Correct. `useState` is the core state hook; using updater functions avoids stale closure issues during batched updates."
      },
      {
        id: "D",
        text: "`useState` mutates state variables synchronously on the exact same line.",
        isCorrect: false,
        explanation: "State updates are scheduled and batched; the variable in the current render closure remains unchanged."
      }
    ],
    correctAnswer: "C",
    explanation: "useState is a built-in React Hook that gives functional components local state. Call it at the top level of a component. It returns a pair: the current value and a setter function you call to update that value. The setter triggers a re-render of the component. Example: const [count, setCount] = useState(0);function increment() { setCount(prev => prev + 1);} Notes and practical tips: Always treat the state as immutable. Use the setter with a new value or an updater function that receives the previous state. Use separate state variables for unrelated pieces of data to keep updates focused and predictable. Calling the setter is asynchronous. If you need the previous value, use the updater form: setCount(c => c + 1). Keep heavy computed values outside the state. UseMemo or compute on render when cheap.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useState explained: Local State Inside Functional Components.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useState explained: Local State Inside Functional Components.",
    hints: [
      "State is a snapshot. Setting it schedules a render, it does not change the variable you already read, so two updates from the same value collapse into one."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState"
  },
  {
    id: "performance-keys-in-lists-why-unique-ids-matter-and-how-to-use-them",
    title: "Keys in Lists: Why Unique IDs Matter and How to Use Them",
    prompt: "Keys in Lists: Why Unique IDs Matter and How to Use Them, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Keys must be regenerated with `Math.random()` on every single render pass.",
        isCorrect: false,
        explanation: "Random keys force React to destroy and recreate all DOM nodes on every render, destroying performance."
      },
      {
        id: "B",
        text: "Keys must be globally unique across all websites on the internet.",
        isCorrect: false,
        explanation: "Keys only need to be unique among sibling elements in the rendered array."
      },
      {
        id: "C",
        text: "Keys give list elements stable identities across renders; using unique IDs from data prevents UI bugs and state mixing during reorders, whereas array indices cause state mismatch bugs.",
        isCorrect: true,
        explanation: "Correct. Unique, stable keys allow React to match previous and next elements accurately, preserving input focus and component state during reorders and deletions."
      },
      {
        id: "D",
        text: "Keys are required to encrypt list item data against XSS vulnerabilities.",
        isCorrect: false,
        explanation: "`key` is a reconciliation diffing hint, not a cryptographic security key."
      }
    ],
    correctAnswer: "C",
    explanation: "Keys are a special prop React uses to identify list items across renders. They let React match previous and next elements so it can update only what changed. Best practices: Use stable, unique IDs from your data, not array indexes, when items can be reordered or inserted. Keys must be unique among siblings only. Avoid using random values or timestamps as keys; that forces unmount and remount, and kills performance. Use keys to optimize dynamic lists and preserve component state within list items.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Keys in Lists: Why Unique IDs Matter and How to Use Them.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Keys in Lists: Why Unique IDs Matter and How to Use Them.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "performance-controlled-vs-uncontrolled-components-forms-and-when-to",
    title: "Controlled vs Uncontrolled Components: Forms and When to Pick Which",
    prompt: "Controlled vs Uncontrolled Components: Forms and When to Pick Which, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Controlled components can only be used on mobile devices; uncontrolled components on desktop.",
        isCorrect: false,
        explanation: "Both form patterns apply across all web and mobile platforms."
      },
      {
        id: "B",
        text: "Controlled components cannot be cleared upon form submission.",
        isCorrect: false,
        explanation: "Controlled inputs are cleared simply by resetting state (e.g. `setValue('')`)."
      },
      {
        id: "C",
        text: "Controlled components store input value in React state via `value`/`onChange` (ideal for validation and dynamic fields); Uncontrolled use DOM state via `ref`/`defaultValue` (simpler, file inputs).",
        isCorrect: true,
        explanation: "Correct. Controlled components provide complete programmatic control over input state, while uncontrolled inputs leverage native DOM state with minimal re-render overhead."
      },
      {
        id: "D",
        text: "Uncontrolled components cause 10x more re-renders than controlled components.",
        isCorrect: false,
        explanation: "Uncontrolled components avoid re-rendering on keystrokes because state lives in the DOM."
      }
    ],
    correctAnswer: "C",
    explanation: "Controlled components keep form input values in React state and update via onChange. Uncontrolled components let the browser manage input state and use refs to read values when needed. Controlled example: <input value={value} onChange={e => setValue(e.target.value)} /> Uncontrolled example: const ref = useRef();<input defaultValue=\"hi\" ref={ref} />on submit read ref.current.value When to use each: Use controlled inputs for validation, conditional disabling, complex interdependent fields, dynamic inputs, and when you need to enforce format. Use uncontrolled when integrating with non-React code, for simple forms where you only need a value on submit, or for file inputs where controlled handling is awkward.Performance and gotchas Controlled inputs cause re-renders on every change. If you have many inputs and observe performance issues, batch updates, or use uncontrolled components selectively. Use defaultValue for uncontrolled inputs and value for controlled ones. For dynamic lists of inputs, controlled components scale better for validation and aggregated state handling. Tooling: For complex forms, prefer form libraries such as React Hook Form or Formik. They manage performance, validation, and nested fields while allowing either controlled or uncontrolled patterns.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Controlled vs Uncontrolled Components: Forms and When to Pick Which.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Controlled vs Uncontrolled Components: Forms and When to Pick Which.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "performance-styling-react-components-options-and-trade-offs",
    title: "Styling React Components: Options and Trade-Offs",
    prompt: "Styling React Components: Options and Trade-Offs, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Inline styles support all CSS features including `@keyframes` animations and `:hover` pseudoclasses.",
        isCorrect: false,
        explanation: "Inline styles do not support pseudo-classes (`:hover`), pseudo-elements, or media queries."
      },
      {
        id: "B",
        text: "React components can only be styled by editing browser C++ source code directly.",
        isCorrect: false,
        explanation: "Styles are applied using standard CSS, CSS Modules, Tailwind, or CSS-in-JS."
      },
      {
        id: "C",
        text: "React prohibits using external CSS stylesheets in production.",
        isCorrect: false,
        explanation: "External CSS stylesheets and bundled CSS modules are standard in React."
      },
      {
        id: "D",
        text: "Global CSS (simple, risking specificity collisions), CSS Modules (scoped class names, zero runtime JS), Tailwind (utility-first, tiny bundle), and CSS-in-JS (dynamic props, runtime cost).",
        isCorrect: true,
        explanation: "Correct. Each styling paradigm balances tradeoffs: CSS Modules and Tailwind offer zero runtime overhead, while CSS-in-JS offers dynamic prop interpolation with slight runtime parsing cost."
      }
    ],
    correctAnswer: "D",
    explanation: "Header: CSS strategies for React projects and when to use them: Global CSS files: simple and familiar. Good for static styles. Inline styles: scoped to an element, but lack pseudo-selectors and media queries. CSS Modules: local scope and predictable class names. CSS in JS libraries: styled components and emotion let styles react to props and scope automatically. Choose based on team conventions, performance needs, and how dynamic your styles must be.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Styling React Components: Options and Trade-Offs.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Styling React Components: Options and Trade-Offs.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-re-render-on-resize-responsive-reactivity-without-waste",
    title: "Re-render on Resize, Responsive Reactivity Without Waste",
    prompt: "Re-render on Resize, Responsive Reactivity Without Waste, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Create a `useWindowSize` hook that listens to `window.resize`, throttles/debounces updates (e.g. via `requestAnimationFrame`), and removes the listener on cleanup.",
        isCorrect: true,
        explanation: "Correct. Throttling resize listeners and removing them on unmount prevents layout thrashing, excessive re-renders, and memory leaks."
      },
      {
        id: "B",
        text: "Poll `window.innerWidth` in a synchronous while loop on the main thread.",
        isCorrect: false,
        explanation: "A synchronous while loop blocks the main thread and freezes the browser."
      },
      {
        id: "C",
        text: "Resize events cannot be handled in React.",
        isCorrect: false,
        explanation: "Subscribing to window resize inside `useEffect` is a standard, performant pattern."
      },
      {
        id: "D",
        text: "Call `window.location.reload()` on every resize event tick.",
        isCorrect: false,
        explanation: "Reloading the page on resize causes terrible user experience and resets all application state."
      }
    ],
    correctAnswer: "A",
    explanation: "Create a reusable hook that listens to window resize, throttles updates, and cleans up on unmount. Debounce with requestAnimationFrame or a small throttle to avoid many renders. Example hook: import { useState, useEffect } from 'react';function useWindowSize() { const [size, setSize] = useState({ w: 0, h: 0 }); useEffect(() => { function onResize() { setSize({ w: window.innerWidth, h: window.innerHeight }); } onResize(); let raf = null; function handler() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(onResize); } window.addEventListener('resize', handler); return () => { window.removeEventListener('resize', handler); if (raf) cancelAnimationFrame(raf); }; }, []); return size;} Notes: Guard for SSR where window is undefined. Throttle or debounce to reduce rerenders on continuous resize.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Re-render on Resize, Responsive Reactivity Without Waste.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Re-render on Resize, Responsive Reactivity Without Waste.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-can-hooks-replace-redux-when-to-use-local-reducers-vs-a",
    title: "Can Hooks Replace Redux, When to Use Local Reducers vs. a Full Store",
    prompt: "Can Hooks Replace Redux, When to Use Local Reducers vs. a Full Store, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks immediately delete Redux from the npm registry upon installation.",
        isCorrect: false,
        explanation: "Hooks and Redux coexist; React-Redux uses hooks like `useSelector` and `useDispatch`."
      },
      {
        id: "B",
        text: "`useReducer` + `useContext` handles simple-to-medium shared state; Redux Toolkit is preferred for complex apps needing middleware, time-travel devtools, or selector re-render optimizations.",
        isCorrect: true,
        explanation: "Correct. Hooks manage component and subtree state cleanly, but large applications benefit from Redux Toolkit's selector memoization, devtools, and middleware ecosystem."
      },
      {
        id: "C",
        text: "Context API is 100x faster than Redux under high-frequency updates without selectors.",
        isCorrect: false,
        explanation: "Unoptimized Context re-renders all consumers on any change, whereas Redux selectors prevent unnecessary consumer re-renders."
      },
      {
        id: "D",
        text: "`useState` cannot store objects or arrays, making Redux mandatory for all state.",
        isCorrect: false,
        explanation: "`useState` stores any JavaScript data structure effortlessly."
      }
    ],
    correctAnswer: "B",
    explanation: "Hooks enable local reducer patterns (useReducer) and shared state via Context. For small to medium apps, useReducer + Context or libraries like Zustand can be simpler than Redux. Tradeoffs: Use hooks + context when the state is localized or only a few components consume it. Use Redux (or RTK) when you need time travel, complex middleware, predictable devtools, or a large normalized state with many consumers. For performance-sensitive apps, normalize state and use selectors (reselect) to avoid prop churn. Hybrid approaches: Keep UI state in hooks and complex domain state in Redux. Use Redux Toolkit to reduce boilerplate if choosing Redux.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can Hooks Replace Redux, When to Use Local Reducers vs. a Full Store.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can Hooks Replace Redux, When to Use Local Reducers vs. a Full Store.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "performance-performance-optimization-techniques-practical-checklist",
    title: "Performance Optimization Techniques, Practical Checklist",
    prompt: "Performance Optimization Techniques, Practical Checklist, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Run all React rendering calculations inside `eval()` statements.",
        isCorrect: false,
        explanation: "`eval()` disables JavaScript engine optimizations, degrades performance, and introduces security vulnerabilities."
      },
      {
        id: "B",
        text: "Profile first with React DevTools Profiler, memoize heavy computations (`useMemo`), stabilize callbacks (`useCallback`), wrap pure components (`React.memo`), virtualize long lists, and split bundles.",
        isCorrect: true,
        explanation: "Correct. Data-driven performance optimization focuses on eliminating verified bottlenecks using memoization, virtualization, code splitting, and state colocation."
      },
      {
        id: "C",
        text: "Delete all React components and rewrite the entire app in raw vanilla HTML files.",
        isCorrect: false,
        explanation: "Rewriting SPAs in vanilla HTML eliminates component modularity, state reactivity, and ecosystem capabilities."
      },
      {
        id: "D",
        text: "Apply `useMemo` to every single function and arithmetic addition in the app before profiling.",
        isCorrect: false,
        explanation: "Premature memoization without profiling adds overhead and clutters code without measurable benefit."
      }
    ],
    correctAnswer: "B",
    explanation: "Memoize heavy computations with useMemo. Memoize handlers with useCallback to avoid child re-renders. Wrap pure components with React.memo or use PureComponent. Window large lists with react-window or react-virtualized. Lazy load routes and components with React.lazy and Suspense. Split bundles with dynamic imports and analyze bundles with source-map-explorer. Avoid unnecessary object/array allocations in render. Debounce user input and expensive updates. Use web workers for CPU work and server, side rendering for initial load.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Performance Optimization Techniques, Practical Checklist.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Performance Optimization Techniques, Practical Checklist.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "performance-styling-react-components-options-and-when-to-pick-them",
    title: "Styling React Components, Options and When to Pick Them",
    prompt: "Styling React Components, Options and When to Pick Them, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "closures",
    tags: [
      "performance",
      "closures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React components can only be styled using native browser Flash animations.",
        isCorrect: false,
        explanation: "Adobe Flash is obsolete; React uses modern web CSS standards."
      },
      {
        id: "B",
        text: "React requires all styles to be written in SQL database tables.",
        isCorrect: false,
        explanation: "Styles are declared using CSS, CSS Modules, Tailwind, or CSS-in-JS."
      },
      {
        id: "C",
        text: "Styling can only be done using raw inline strings with `document.write`.",
        isCorrect: false,
        explanation: "`document.write` breaks React virtual DOM mounting and is prohibited in modern web development."
      },
      {
        id: "D",
        text: "Choose CSS Modules or Tailwind for zero-runtime performance-critical apps; choose CSS-in-JS (styled-components) when dynamic runtime props-driven theming is required.",
        isCorrect: true,
        explanation: "Correct. Static and zero-runtime CSS strategies maximize page load performance, while CSS-in-JS offers rich JavaScript-driven style manipulation."
      }
    ],
    correctAnswer: "D",
    explanation: "Common choices: CSS files and modules: predictable, caches well, CSS module scoping. CSS-in-JS: styled-components, emotion, dynamic styles and theming. Utility frameworks: Tailwind for rapid layout and low runtime CSS. Inline styles for simple dynamic rules or critical styling. Classnames library for conditional classes. Selection guide: Choose CSS modules or plain CSS for performance-critical sites. Use CSS-in-JS when you need JS-driven theming or component-scoped styles. Keep class naming predictable and document style decisions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Styling React Components, Options and When to Pick Them.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Styling React Components, Options and When to Pick Them.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-preventing-unnecessary-re-renders-patterns-and-examples",
    title: "Preventing Unnecessary Re-renders, Patterns and Examples",
    prompt: "Preventing Unnecessary Re-renders, Patterns and Examples, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Disable all component rendering completely across the application.",
        isCorrect: false,
        explanation: "The goal is preventing redundant re-renders while rendering active UI updates smoothly."
      },
      {
        id: "B",
        text: "Mutate state variables directly without calling setter functions.",
        isCorrect: false,
        explanation: "Direct state mutation causes stale UI bugs and violates React's reactive rendering model."
      },
      {
        id: "C",
        text: "Wrap pure components in `React.memo`, stabilize object/function prop references with `useMemo`/`useCallback`, colocate state close to consumers, and pass children as composition slots.",
        isCorrect: true,
        explanation: "Correct. Preventing unnecessary re-renders involves maintaining referential stability for props passed to memoized children and keeping state localized."
      },
      {
        id: "D",
        text: "Pass newly created inline object literals `options={{ a: 1 }}` to memoized children on every render.",
        isCorrect: false,
        explanation: "Inline objects create new references on every render, breaking `React.memo` shallow equality checks."
      }
    ],
    correctAnswer: "C",
    explanation: "Tools: shouldComponentUpdate in classes or React.PureComponent. React.memo for function components. useMemo and useCallback to stabilize references. Keep state local where possible and split components so only the necessary bits update. Example: const Message = React.memo(function Message({ text }) { return <p>{text}</p>;}); Avoid passing fresh objects: return <Child options={{ a: 1 }} />; // creates new object each render Instead: const opts = useMemo(() => ({ a: 1 }), []);return <Child options={opts} />;",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Preventing Unnecessary Re-renders, Patterns and Examples.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Preventing Unnecessary Re-renders, Patterns and Examples.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-how-to-bind-methods-or-event-handlers-in-jsx-callbacks",
    title: "How to bind methods or event handlers in JSX callbacks?",
    prompt: "How to bind methods or event handlers in JSX callbacks?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class Component extends React.Component {\n  constructor(props) {\n    super(props);\n    this.handleClick = this.handleClick.bind(this);\n  }\n\n  handleClick() {\n    // ...\n  }\n}\n\nhandleClick = () => {\n  console.log('this is:', this);\n};\n\n<button onClick={this.handleClick}>{'Click me'}</button>\n\n<button onClick={(event) => this.handleClick(event)}>{'Click me'}</button>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Event handlers can only be bound using external jQuery plugins.",
        isCorrect: false,
        explanation: "Method binding uses standard JavaScript `bind` or ES class field arrow functions."
      },
      {
        id: "B",
        text: "Bind in the class constructor (`this.handleClick = this.handleClick.bind(this)`), use class field arrow functions (`handleClick = () => ...`), or inline arrow functions.",
        isCorrect: true,
        explanation: "Correct. Class field arrow functions and constructor binding are preferred because inline arrow functions allocate a new callback reference on every render pass."
      },
      {
        id: "C",
        text: "Methods are automatically bound to window in strict mode without any syntax.",
        isCorrect: false,
        explanation: "In JavaScript classes, methods are unbound by default and lose their `this` context when passed as callbacks."
      },
      {
        id: "D",
        text: "Wrap every method in `eval()` inside the render function body.",
        isCorrect: false,
        explanation: "`eval()` is insecure, slow, and completely inappropriate for method binding."
      }
    ],
    correctAnswer: "B",
    explanation: "There are 3 possible ways to achieve this: Binding in Constructor: In JavaScript classes, the methods are not bound by default. The same thing applies for React event handlers defined as class methods. Normally we bind them in constructor. Public class fields syntax: If you don't like to use bind approach then public class fields syntax can be used to correctly bind callbacks. Arrow functions in callbacks: You can use arrow functions directly in the callbacks. Note: If the callback is passed as prop to child components, those components might do an extra re-rendering. In those cases, it is preferred to go with .bind() or public class fields syntax approach considering performance.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to bind methods or event handlers in JSX callbacks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to bind methods or event handlers in JSX callbacks?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-is-key-prop-and-what-is-the-benefit-of-using-it-in",
    title: "What is \"key\" prop and what is the benefit of using it in arrays of elements?",
    prompt: "What is \"key\" prop and what is the benefit of using it in arrays of elements?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);\n\nconst todoItems = todos.map((todo, index) => <li key={index}>{todo.text}</li>);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A unique string/number prop assigned to array items that gives them a stable identity, allowing React's diffing algorithm to match elements across renders during additions, deletions, and reorders.",
        isCorrect: true,
        explanation: "Correct. Keys allow React to reconcile list elements efficiently without unnecessarily destroying and recreating real DOM nodes or losing local component state."
      },
      {
        id: "B",
        text: "A CSS property that sets the background color of alternating list items.",
        isCorrect: false,
        explanation: "Keys do not style elements; styling is handled via CSS classes."
      },
      {
        id: "C",
        text: "A database primary key that must be unique across all websites globally.",
        isCorrect: false,
        explanation: "Keys only need to be unique among sibling items within the same mapped array."
      },
      {
        id: "D",
        text: "An encryption key used to hash list data before sending to an analytics server.",
        isCorrect: false,
        explanation: "`key` is a diffing hint for the Virtual DOM, not a cryptographic hash."
      }
    ],
    correctAnswer: "A",
    explanation: "A key is a special string attribute you should include when creating arrays of elements. Key prop helps React identify which items have changed, are added, or are removed. Most often we use ID from our data as key: When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort: Note: Using indexes for keys is not recommended if the order of items may change. This can negatively impact performance and may cause issues with component state. If you extract list item as separate component then apply keys on list component instead of li tag. There will be a warning message in the console if the key prop is not present on list items.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is \"key\" prop and what is the benefit of using it in arrays of elements?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is \"key\" prop and what is the benefit of using it in arrays of elements?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "performance-why-are-string-refs-legacy",
    title: "Why are String Refs legacy?",
    prompt: "Why are String Refs legacy?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyComponent extends Component {\n  renderRow = (index) => {\n    // This won't work. Ref will get attached to DataTable rather than MyComponent:\n    return <input ref={'input-' + index} />;\n\n    // This would work though! Callback refs are awesome.\n    return <input ref={(input) => (this['input-' + index] = input)} />;\n  };\n\n  render() {\n    return <DataTable data={this.props.data} renderRow={this.renderRow} />;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because string refs trigger automatic full-page reloads on every keystroke.",
        isCorrect: false,
        explanation: "String refs were an imperatively managed reference API with architectural defects."
      },
      {
        id: "B",
        text: "Because string refs only work on Internet Explorer 6.",
        isCorrect: false,
        explanation: "String refs were part of early React versions across all browsers before being deprecated."
      },
      {
        id: "C",
        text: "Because strings take up too much disk space in the browser's hard drive.",
        isCorrect: false,
        explanation: "The issue was architectural statefulness and inability to compose or type-check, not disk space."
      },
      {
        id: "D",
        text: "They force React to keep track of the currently executing component (making React stateful), don't compose across libraries, fail static analysis (Flow/TS), and are removed in modern React.",
        isCorrect: true,
        explanation: "Correct. String refs (`ref='textInput'`) had severe architectural flaws: they broke modularity, complicated bundling, and couldn't be statically typed. Callback refs and `useRef` replaced them."
      }
    ],
    correctAnswer: "D",
    explanation: "If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like ref={'textInput'}, and the DOM node is accessed as this.refs.textInput. We advise against it because string refs have below issues, and are considered legacy. String refs were removed in React v16. They force React to keep track of currently executing component. This is problematic because it makes react module stateful, and thus causes weird errors when react module is duplicated in the bundle. They are not composable, if a library puts a ref on the passed child, the user can't put another ref on it. Callback refs are perfectly composable. They don't work with static analysis like Flow. Flow can't guess the magic that framework does to make the string ref appear on this.refs, as well as its type (which could be different). Callback refs are friendlier to static analysis. It doesn't work as most people would expect with the \"render callback\" pattern (e.g. ): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why are String Refs legacy?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why are String Refs legacy?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "performance-is-lazy-function-supports-named-exports",
    title: "Is lazy function supports named exports?",
    prompt: "Is lazy function supports named exports?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "// MoreComponents.js\nexport const SomeComponent = /* ... */;\nexport const UnusedComponent = /* ... */;\n\n// IntermediateComponent.js\nexport { SomeComponent as default } from './MoreComponents.js';\n\nimport React, { lazy } from 'react';\nconst SomeComponent = lazy(() => import('./IntermediateComponent.js'));",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Named exports can never be code-split in modern JavaScript.",
        isCorrect: false,
        explanation: "Named exports can be code-split by mapping the resolved promise to `{ default: module.NamedComponent }`."
      },
      {
        id: "B",
        text: "No, `React.lazy()` currently only supports default exports; to lazy-load named exports, create an intermediate module that re-exports the component as `default`.",
        isCorrect: true,
        explanation: "Correct. `React.lazy(() => import('./MyModule').then(module => ({ default: module.NamedComponent })))` allows wrapping named exports."
      },
      {
        id: "C",
        text: "`React.lazy()` only supports CommonJS `require()` syntax.",
        isCorrect: false,
        explanation: "`React.lazy()` requires dynamic ES module `import()`."
      },
      {
        id: "D",
        text: "Yes, `React.lazy()` natively accepts named exports via `lazy(() => import('./Module', { name: 'MyComp' }))`.",
        isCorrect: false,
        explanation: "`React.lazy` expects a Promise that resolves to a module object with a `default` property."
      }
    ],
    correctAnswer: "B",
    explanation: "No, currently React.lazy function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don, t pull unused components. Let's take a component file which exports multiple named components, and reexport MoreComponents.js components in an intermediate file IntermediateComponent.js Now you can import the module using lazy function as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is lazy function supports named exports?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is lazy function supports named exports?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-why-fragments-are-better-than-container-divs",
    title: "Why fragments are better than container divs?",
    prompt: "Why fragments are better than container divs?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "They reduce DOM tree depth (saving memory and diffing time), prevent breaking CSS flexbox/grid/table layouts, and keep browser DevTools DOM inspection clean.",
        isCorrect: true,
        explanation: "Correct. Extra `<div>` wrappers can corrupt CSS parent-child layout relationships (e.g. `display: contents` or `<tr>/<td>`), which Fragments avoid completely."
      },
      {
        id: "B",
        text: "They permanently disable all CSS stylesheets on child elements.",
        isCorrect: false,
        explanation: "Fragments render children with their normal CSS styles intact."
      },
      {
        id: "C",
        text: "They automatically translate text into 50 spoken languages.",
        isCorrect: false,
        explanation: "Fragments are structural JSX grouping wrappers, unrelated to translation."
      },
      {
        id: "D",
        text: "They execute 1000x faster by compiling directly into C++ binaries.",
        isCorrect: false,
        explanation: "Fragments avoid creating DOM nodes; their performance benefit comes from fewer DOM allocations and cleaner layouts."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the list of reasons, Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees. Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout. The DOM Inspector is less cluttered.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why fragments are better than container divs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why fragments are better than container divs?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "performance-how-to-apply-validation-on-props-in-react",
    title: "How to apply validation on props in React?",
    prompt: "How to apply validation on props in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React from 'react';\nimport PropTypes from 'prop-types';\n\nclass User extends React.Component {\n  static propTypes = {\n    name: PropTypes.string.isRequired,\n    age: PropTypes.number.isRequired,\n  };\n\n  render() {\n    return (\n      <>\n        <h1>{`Welcome, ${this.props.name}`}</h1>\n        <h2>{`Age, ${this.props.age}`}</h2>\n      </>\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Write manual `typeof` validation checks at the top of every component render body.",
        isCorrect: false,
        explanation: "Manual runtime checks add boilerplate and runtime overhead compared to TypeScript or PropTypes."
      },
      {
        id: "B",
        text: "Validate props by encrypting them with AES-256 before passing.",
        isCorrect: false,
        explanation: "Prop validation checks data types and shapes, not cryptographic encryption."
      },
      {
        id: "C",
        text: "Use TypeScript interfaces/types (`type Props = { name: string }`) for compile-time validation, or the `prop-types` library for runtime validation warnings in development.",
        isCorrect: true,
        explanation: "Correct. Static typing with TypeScript is the modern standard, while `prop-types` validates props dynamically at runtime during development."
      },
      {
        id: "D",
        text: "Props cannot be validated in React under any circumstances.",
        isCorrect: false,
        explanation: "React supports robust prop validation via TypeScript and PropTypes."
      }
    ],
    correctAnswer: "C",
    explanation: "When the application is running in development mode, React will automatically check all props that we set on components to make sure they have correct type. If the type is incorrect, React will generate warning messages in the console. It's disabled in production mode due to performance impact. The mandatory props are defined with isRequired. The set of predefined prop types: PropTypes.number PropTypes.string PropTypes.array PropTypes.object PropTypes.func PropTypes.node PropTypes.element PropTypes.bool PropTypes.symbol PropTypes.any We can define propTypes for User component as below: Note: In React v15.5 PropTypes were moved from React.PropTypes to prop-types library.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to apply validation on props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to apply validation on props in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-the-advantages-of-react",
    title: "What are the advantages of React?",
    prompt: "What are the advantages of React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Eliminates the need for writing HTML, CSS, or JavaScript.",
        isCorrect: false,
        explanation: "React builds on standard web technologies (HTML via JSX, CSS, and JS/TS)."
      },
      {
        id: "B",
        text: "Includes built-in ORM database drivers and full-stack PostgreSQL clustering.",
        isCorrect: false,
        explanation: "React is a focused UI view library, not a database or server clustering platform."
      },
      {
        id: "C",
        text: "Guarantees that web pages load in 0.001 milliseconds over any network connection.",
        isCorrect: false,
        explanation: "React optimizes client rendering, but network speed depends on server and bandwidth infrastructure."
      },
      {
        id: "D",
        text: "Component reusability, efficient Virtual DOM diffing, unidirectional predictable data flow, strong ecosystem/community, and flexible integration with SSR/frameworks.",
        isCorrect: true,
        explanation: "Correct. React's modularity, declarative rendering model, and rich ecosystem have made it the industry standard UI library."
      }
    ],
    correctAnswer: "D",
    explanation: "Below are the list of main advantages of React, Increases the application's performance with Virtual DOM. JSX makes code easy to read and write. It renders both on client and server side (SSR). Easy to integrate with frameworks (Angular, Backbone) since it is only a view library. Easy to write unit and integration tests with tools such as Jest.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-do-you-memoize-a-component",
    title: "How do you memoize a component?",
    prompt: "How do you memoize a component?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "import moize from 'moize';\nimport Component from './components/Component'; // this module exports a non-memoized component\n\nconst MemoizedFoo = moize.react(Component);\n\nconst Consumer = () => {\n  <div>\n    {'I will memoize the following entry:'}\n    <MemoizedFoo />\n  </div>;\n};\n\nconst MemoComponent = React.memo(function MemoComponent(props) {\n  /* render using props */\n});\nOR;\nexport default React.memo(MyFunctionComponent);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Wrap the component in an infinite synchronous `while` loop.",
        isCorrect: false,
        explanation: "A synchronous while loop freezes the browser completely."
      },
      {
        id: "B",
        text: "Save the component source code in browser `localStorage` on every frame.",
        isCorrect: false,
        explanation: "`React.memo` operates in JavaScript memory during runtime rendering."
      },
      {
        id: "C",
        text: "Memoization requires converting the entire codebase into C++.",
        isCorrect: false,
        explanation: "`React.memo` is a standard built-in React API in JavaScript."
      },
      {
        id: "D",
        text: "Wrap a functional component in `React.memo(MyComponent, arePropsEqual?)`, which performs a shallow comparison of incoming props to skip rendering if props haven't changed.",
        isCorrect: true,
        explanation: "Correct. `React.memo` is a higher-order component that memoizes functional components, preventing unnecessary re-renders when parent components update with identical child props."
      }
    ],
    correctAnswer: "D",
    explanation: "There are memoize libraries available which can be used on function components. For example moize library can memoize the component in another component. Update: Since React v16.6.0, we have a React.memo. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you memoize a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you memoize a component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-why-we-need-to-pass-a-function-to-setstate",
    title: "Why we need to pass a function to setState()?",
    prompt: "Why we need to pass a function to setState()?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "async-await",
    tags: [
      "performance",
      "async-await",
      "junior"
    ],
    codeSnippet: "// assuming this.state.count === 0\nthis.setState({ count: this.state.count + 1 });\nthis.setState({ count: this.state.count + 1 });\nthis.setState({ count: this.state.count + 1 });\n// this.state.count === 1, not 3\n\nthis.setState((prevState, props) => ({\n  count: prevState.count + props.increment,\n}));\n// this.state.count === 3 as expected",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because passing an object causes an immediate fatal syntax crash in all browsers.",
        isCorrect: false,
        explanation: "Passing an object is valid syntax, but causes stale state bugs during batched updates."
      },
      {
        id: "B",
        text: "Passing functions to `setState` was deprecated in React 18.",
        isCorrect: false,
        explanation: "Functional updater callbacks remain the recommended pattern for dependent state updates."
      },
      {
        id: "C",
        text: "Because `setState` is asynchronous and batched; passing a function `(prevState, props) => newState` ensures access to the latest queued state during sequential updates.",
        isCorrect: true,
        explanation: "Correct. Passing an object during multiple consecutive `setState` calls can overwrite values based on stale state, whereas updater functions receive guaranteed pending state."
      },
      {
        id: "D",
        text: "Because functions run on the GPU while objects run on the CPU.",
        isCorrect: false,
        explanation: "All state calculations execute in the JavaScript runtime engine on the CPU."
      }
    ],
    correctAnswer: "C",
    explanation: "The reason behind for this is that setState() is an asynchronous operation. React batches state changes for performance reasons, so the state may not change immediately after setState() is called. That means you should not rely on the current state when calling setState(), since you can't be sure what that state will be. The solution is to pass a function to setState(), with the previous state as an argument. By doing this you can avoid issues with the user getting the old state value on access due to the asynchronous nature of setState(). Let's say the initial count value is zero. After three consecutive increment operations, the value is going to be incremented only by one. If we pass a function to setState(), the count gets incremented correctly. (OR)",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why we need to pass a function to setState()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why we need to pass a function to setState()?.",
    hints: [
      "await does not block the thread, but it does block the next line."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
  },
  {
    id: "performance-why-function-is-preferred-over-object-for-setstate",
    title: "Why function is preferred over object for setState()?",
    prompt: "Why function is preferred over object for setState()?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "async-await",
    tags: [
      "performance",
      "async-await",
      "junior"
    ],
    codeSnippet: "// Wrong\nthis.setState({\n  counter: this.state.counter + this.props.increment,\n});\n\n// Correct\nthis.setState((prevState, props) => ({\n  counter: prevState.counter + props.increment,\n}));",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because `this.props` and `this.state` may be updated asynchronously; the updater function receives `prevState` and `props` at the exact time the update is applied.",
        isCorrect: true,
        explanation: "Correct. The function argument receives guaranteed latest state and props during batched reconciliations, avoiding race conditions in dependent state calculations."
      },
      {
        id: "B",
        text: "Because functions use zero bytes of memory compared to objects.",
        isCorrect: false,
        explanation: "Both allocate small amounts of memory; the advantage is synchronization correctness."
      },
      {
        id: "C",
        text: "Because React prohibits passing objects to `setState`.",
        isCorrect: false,
        explanation: "Passing objects is permitted for static updates; functions are preferred when next state depends on current state."
      },
      {
        id: "D",
        text: "Because objects cannot store numbers in JavaScript.",
        isCorrect: false,
        explanation: "Objects store all data types; the issue is stale closure values during batching."
      }
    ],
    correctAnswer: "A",
    explanation: "React may batch multiple setState() calls into a single update for performance. Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state. This counter example will fail to update as expected: The preferred approach is to call setState() with function rather than object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why function is preferred over object for setState()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why function is preferred over object for setState()?.",
    hints: [
      "await does not block the thread, but it does block the next line."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
  },
  {
    id: "performance-what-are-react-mixins",
    title: "What are React Mixins?",
    prompt: "What are React Mixins?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const PureRenderMixin = require('react-addons-pure-render-mixin');\n\nconst Button = React.createClass({\n  mixins: [PureRenderMixin],\n  // ...\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The newest state management hook introduced in React 19.",
        isCorrect: false,
        explanation: "Mixins were deprecated years ago and are not supported in ES6 classes or Hooks."
      },
      {
        id: "B",
        text: "A database replication tool used for mixing SQL and NoSQL tables.",
        isCorrect: false,
        explanation: "Mixins were JavaScript component composition utilities in legacy React."
      },
      {
        id: "C",
        text: "A legacy pattern from `React.createClass` for sharing code between components; deprecated and discouraged because they introduced implicit dependencies, name collisions, and complexity.",
        isCorrect: true,
        explanation: "Correct. Mixins caused maintainability nightmares in early React; Facebook officially declared mixins harmful, replacing them with HOCs, render props, and ultimately Hooks."
      },
      {
        id: "D",
        text: "A CSS processor used to mix multiple RGB colors into gradients.",
        isCorrect: false,
        explanation: "In React, Mixins were a legacy code-sharing pattern for class components."
      }
    ],
    correctAnswer: "C",
    explanation: "Mixins are a way to totally separate components to have a common functionality. Mixins should not be used and can be replaced with higher-order components or decorators. One of the most commonly used mixins is PureRenderMixin. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Mixins?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Mixins?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-react-router-is-different-from-history-library",
    title: "How React Router is different from history library?",
    prompt: "How React Router is different from history library?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The `history` library manages browser navigation session history; React Router is a declarative framework built on top of `history` providing route matching, params, and UI rendering.",
        isCorrect: true,
        explanation: "Correct. React Router leverages the underlying `history` library to manage navigation stacks while adding JSX route components, layout nesting, and navigation hooks."
      },
      {
        id: "B",
        text: "They are competing libraries developed by rival organizations.",
        isCorrect: false,
        explanation: "`history` is the foundational dependency built by the React Router team."
      },
      {
        id: "C",
        text: "The `history` library renders HTML to the DOM; React Router does not.",
        isCorrect: false,
        explanation: "`history` is a headless navigation utility; React Router renders UI elements."
      },
      {
        id: "D",
        text: "React Router only works on mobile phones.",
        isCorrect: false,
        explanation: "Both operate across all JavaScript web platforms."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router is a wrapper around the history library which handles interaction with the browser's window.history with its browser and hash histories. It also provides memory history which is useful for environments that don't have global history, such as mobile app development (React Native) and unit testing with Node.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How React Router is different from history library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How React Router is different from history library?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "performance-what-are-the-router-components-of-react-router-v4",
    title: "What are the <Router> components of React Router v4?",
    prompt: "What are the <Router> components of React Router v4?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`<CanvasRouter>`, `<AudioRouter>`, and `<GpuRouter>`.",
        isCorrect: false,
        explanation: "These are not router components in React Router."
      },
      {
        id: "B",
        text: "`<PostgresRouter>` and `<RedisRouter>`.",
        isCorrect: false,
        explanation: "React Router is a frontend web navigation library, not a database router."
      },
      {
        id: "C",
        text: "`<BrowserRouter>` (HTML5 history for web), `<HashRouter>` (hash URLs for static hosting), and `<MemoryRouter>` (in-memory routing for tests and React Native).",
        isCorrect: true,
        explanation: "Correct. React Router provides specialized router containers that manage browser history, URL hashes, or in-memory navigation stacks."
      },
      {
        id: "D",
        text: "There is only one single `<AppRouter>` component.",
        isCorrect: false,
        explanation: "React Router provides multiple specialized router wrappers."
      }
    ],
    correctAnswer: "C",
    explanation: "React Router v4 provides below 3 <Router> components: <BrowserRouter> <HashRouter> <MemoryRouter> The above components will create browser, hash, and memory history instances. React Router v4 makes the properties and methods of the history instance associated with your router available through the context in the router object.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the <Router> components of React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the <Router> components of React Router v4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "system_design-what-is-reselect-and-how-it-works",
    title: "What is reselect and how it works?",
    prompt: "What is reselect and how it works?",
    level: "intermediate",
    type: "output",
    category: "system_design",
    subject: "performance",
    tags: [
      "system_design",
      "performance",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A CSS processor that styles select dropdown elements.",
        isCorrect: false,
        explanation: "Reselect is a JavaScript state selector memoization library, not CSS."
      },
      {
        id: "B",
        text: "A memoized selector library that caches past inputs/outputs, recomputing derived state only when input selector references change, preventing costly recalculations and re-renders.",
        isCorrect: true,
        explanation: "Correct. `createSelector` creates memoized selectors that skip expensive computations (like filtering/sorting large arrays) if state inputs haven't changed."
      },
      {
        id: "C",
        text: "A database engine for executing SQL queries in browser memory.",
        isCorrect: false,
        explanation: "Reselect memoizes JavaScript function calculations on Redux state."
      },
      {
        id: "D",
        text: "A compiler that converts React into Angular.",
        isCorrect: false,
        explanation: "Reselect is a state management utility."
      }
    ],
    correctAnswer: "B",
    explanation: "Reselect is a selector library (for Redux) which uses memoization concept. It was originally written to compute derived data from Redux-like applications state, but it can't be tied to any architecture or library. Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the the same inputs are provided twice in a row, Reselect returns the cached output. It's memoization and cache are fully customizable.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is reselect and how it works?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is reselect and how it works?.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "performance-what-is-react-memo-function",
    title: "What is React memo function?",
    prompt: "What is React memo function?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const MyComponent = React.memo(function MyComponent(props) {\n  /* only rerenders if props change */\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A function that memorizes the user's credit card number.",
        isCorrect: false,
        explanation: "`React.memo` memoizes component rendering based on props equality, unrelated to payment data."
      },
      {
        id: "B",
        text: "A hook that replaces `useState` and `useEffect` entirely.",
        isCorrect: false,
        explanation: "`React.memo` is an HOC for performance optimization, not a state hook."
      },
      {
        id: "C",
        text: "A Higher-Order Component (`React.memo`) for functional components that memoizes rendered output, skipping re-renders if incoming props are shallowly equal to previous props.",
        isCorrect: true,
        explanation: "Correct. `React.memo` is the functional equivalent of `React.PureComponent`, optimizing performance by preventing unnecessary render cycles when props haven't changed."
      },
      {
        id: "D",
        text: "A tool that compresses image files in the browser.",
        isCorrect: false,
        explanation: "`React.memo` prevents redundant component rendering."
      }
    ],
    correctAnswer: "C",
    explanation: "Class components can be restricted from rendering when their input props are the same using PureComponent or shouldComponentUpdate. Now you can do the same with function components by wrapping them in React.memo.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React memo function?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React memo function?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "performance-what-is-react-lazy-function",
    title: "What is React lazy function?",
    prompt: "What is React lazy function?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <OtherComponent />\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A tool for converting React components into Python scripts.",
        isCorrect: false,
        explanation: "`React.lazy` manages JavaScript module code-splitting."
      },
      {
        id: "B",
        text: "A function (`React.lazy(() => import('./Component'))`) that dynamically loads a component bundle via code-splitting, rendering it asynchronously inside a `<Suspense>` boundary.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` enables on-demand chunk loading, reducing initial bundle size and accelerating initial page load performance."
      },
      {
        id: "C",
        text: "A function that deliberately delays rendering by 10 seconds to save CPU battery.",
        isCorrect: false,
        explanation: "`React.lazy` code-splits and loads modules on demand as needed, not artificial delays."
      },
      {
        id: "D",
        text: "A deprecated function removed in React 16.",
        isCorrect: false,
        explanation: "`React.lazy` is an active core feature in modern React."
      }
    ],
    correctAnswer: "B",
    explanation: "The React.lazy function lets you render an dynamic import as a regular component. It will automatically load the bundle containing the OtherComponent when the component gets rendered. This must return a Promise which resolves to a module with a default export containing a React component. Note: React.lazy and Suspense is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React lazy function?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React lazy function?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-how-to-prevent-unnecessary-updates-using-setstate",
    title: "How to prevent unnecessary updates using setState?",
    prompt: "How to prevent unnecessary updates using setState?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "getUserProfile = (user) => {\n  const latestAddress = user.address;\n  this.setState((state) => {\n    if (state.address === latestAddress) {\n      return null;\n    } else {\n      return { title: latestAddress };\n    }\n  });\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State updates cannot be prevented once `setState` is called.",
        isCorrect: false,
        explanation: "Returning `null` or passing identical values bails out of re-rendering cleanly."
      },
      {
        id: "B",
        text: "Return `null` in functional state updaters `setState(state => state.value === next ? null : { value: next })` or avoid calling setter when value is identical (React auto-bails out on `Object.is` equality).",
        isCorrect: true,
        explanation: "Correct. In class components, returning `null` from a `setState` updater skips re-rendering; in functional hooks, `useState` automatically bails out if the new state is identical to current state via `Object.is`."
      },
      {
        id: "C",
        text: "Throw an uncaught error inside the state updater function.",
        isCorrect: false,
        explanation: "Throwing errors unmounts the component tree and crashes the UI."
      },
      {
        id: "D",
        text: "Call `window.stop()` inside the updater.",
        isCorrect: false,
        explanation: "`window.stop()` halts browser document loading, breaking the page."
      }
    ],
    correctAnswer: "B",
    explanation: "You can compare current value of the state with an existing state value and decide whether to rerender the page or not. If the values are same then you need to return null to stop re-rendering otherwise return the latest state value. For example, the user profile information is conditionally rendered as follows,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to prevent unnecessary updates using setState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to prevent unnecessary updates using setState?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "performance-what-is-code-splitting",
    title: "What is code-splitting?",
    prompt: "What is code-splitting?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "const moduleA = 'Hello';\n\nexport { moduleA };\n\nimport React, { Component } from 'react';\n\nclass App extends Component {\n  handleClick = () => {\n    import('./moduleA')\n      .then(({ moduleA }) => {\n        // Use moduleA\n      })\n      .catch((err) => {\n        // Handle failure\n      });\n  };\n\n  render() {\n    return (\n      <div>\n        <button onClick={this.handleClick}>Load</button>\n      </div>\n    );\n  }\n}\n\nexport default App;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A bundling technique (via dynamic `import()`, `React.lazy`, or bundler splits) that splits code into separate bundles loaded on demand, reducing initial page load time.",
        isCorrect: true,
        explanation: "Correct. Code-splitting loads only the JavaScript necessary for the current view or interaction, preventing users from having to download the entire application upfront."
      },
      {
        id: "B",
        text: "Splitting code between JavaScript and Python on the backend.",
        isCorrect: false,
        explanation: "Code-splitting generates asynchronous client bundle chunks."
      },
      {
        id: "C",
        text: "Deleting half of your JavaScript functions to make the bundle smaller.",
        isCorrect: false,
        explanation: "Code-splitting preserves all features while deferring when code is downloaded."
      },
      {
        id: "D",
        text: "A method of physically dividing source code files across multiple USB drives.",
        isCorrect: false,
        explanation: "Code-splitting is a software bundling optimization performed by Webpack/Vite/Rollup."
      }
    ],
    correctAnswer: "A",
    explanation: "Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature. For example, in the below code snippets, it will make moduleA.js and all its unique dependencies as a separate chunk that only loads after the user clicks the 'Load' button. moduleA.js App.js: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is code-splitting?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is code-splitting?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "performance-what-are-the-limitations-with-hocs",
    title: "What are the limitations with HOCs?",
    prompt: "What are the limitations with HOCs?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "render() {\n  // A new version of EnhancedComponent is created on every render\n  // EnhancedComponent1 !== EnhancedComponent2\n  const EnhancedComponent = enhance(MyComponent);\n  // That causes the entire subtree to unmount/remount each time!\n  return <EnhancedComponent />;\n}\n\n// Define a static method\nWrappedComponent.staticMethod = function () {\n  /*...*/\n};\n// Now apply a HOC\nconst EnhancedComponent = enhance(WrappedComponent);\n\n// The enhanced component has no static method\ntypeof EnhancedComponent.staticMethod === 'undefined'; // true\n\nfunction enhance(WrappedComponent) {\n  class Enhance extends React.Component {\n    /*...*/\n  }\n  // Must know exactly which method(s) to copy :(\n  Enhance.staticMethod = WrappedComponent.staticMethod;\n  return Enhance;\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "HOCs only work on Internet Explorer 8.",
        isCorrect: false,
        explanation: "HOCs are a universal React component composition pattern."
      },
      {
        id: "B",
        text: "HOCs can only be written in Python and cannot run in web browsers.",
        isCorrect: false,
        explanation: "HOCs are standard JavaScript functions that take a component and return a new component."
      },
      {
        id: "C",
        text: "Caveats include: must not define HOCs inside `render()` (causes remounting/state loss), static methods are not copied automatically, and refs must be forwarded via `React.forwardRef`.",
        isCorrect: true,
        explanation: "Correct. Creating HOCs inside render destroys component state on every update, static class methods are lost unless copied manually, and `ref` requires explicit forwarding."
      },
      {
        id: "D",
        text: "HOCs prevent components from using CSS styles.",
        isCorrect: false,
        explanation: "HOCs do not restrict CSS styling in any way."
      }
    ],
    correctAnswer: "C",
    explanation: "Higher-order components come with a few caveats apart from its benefits. Below are the few listed in an order, Don, t use HOCs inside the render method: It is not recommended to apply a HOC to a component within the render method of a component. The above code impact performance by remounting a component that causes the state of that component and all of its children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created only once. Static methods must be copied over: When you apply a HOC to a component the new component does not have any of the static methods of the original component You can overcome this by copying the methods onto the container before returning it, Refs aren, t passed through: For HOCs you need to pass through all props to the wrapped component but this does not work for refs. This is because ref is not really a prop similar to key. In this case you need to use the React.forwardRef API: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the limitations with HOCs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the limitations with HOCs?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "performance-is-it-good-to-use-arrow-functions-in-render-methods",
    title: "Is it good to use arrow functions in render methods?",
    prompt: "Is it good to use arrow functions in render methods?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "class Foo extends Component {\n  handleClick() {\n    console.log('Click happened');\n  }\n  render() {\n    return <button onClick={() => this.handleClick()}>Click Me</button>;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Arrow functions are strictly forbidden in JSX.",
        isCorrect: false,
        explanation: "Arrow functions are valid JSX syntax and commonly used."
      },
      {
        id: "B",
        text: "Arrow functions in render run on the GPU while regular functions run on the CPU.",
        isCorrect: false,
        explanation: "All JavaScript functions execute in the JS engine on the CPU."
      },
      {
        id: "C",
        text: "Arrow functions in render immediately cause a fatal JavaScript crash.",
        isCorrect: false,
        explanation: "Arrow functions work correctly, with minor potential performance trade-offs in memoized subtrees."
      },
      {
        id: "D",
        text: "Inline arrow functions `<button onClick={() => ...}>` create a new function reference on every render; fine for simple cases, but can cause unnecessary re-renders in memoized child components (`React.memo`).",
        isCorrect: true,
        explanation: "Correct. While convenient for passing arguments, inline callbacks break shallow prop equality comparisons in `React.memo` / `PureComponent`, where `useCallback` is preferred."
      }
    ],
    correctAnswer: "D",
    explanation: "Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it. Note: Using an arrow function in render method creates a new function each time the component renders, which may have performance implications: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it good to use arrow functions in render methods?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it good to use arrow functions in render methods?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-loadable-components",
    title: "What are loadable components?",
    prompt: "What are loadable components?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import loadable from '@loadable/component';\n\nconst OtherComponent = loadable(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <OtherComponent />\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that only render on smartphones.",
        isCorrect: false,
        explanation: "Loadable components is a universal code-splitting library for React."
      },
      {
        id: "B",
        text: "A popular third-party library (`@loadable/component`) used for dynamic imports and code-splitting with full Server-Side Rendering (SSR) support before React 18 Suspense SSR.",
        isCorrect: true,
        explanation: "Correct. `@loadable/component` was the standard solution for SSR code-splitting, managing chunk manifest extraction and preloading on Node.js servers."
      },
      {
        id: "C",
        text: "Components that automatically download all images from the internet.",
        isCorrect: false,
        explanation: "Loadable components handles JavaScript module chunk splitting."
      },
      {
        id: "D",
        text: "A hardware testing kit for measuring electrical current.",
        isCorrect: false,
        explanation: "Loadable components is an npm software package."
      }
    ],
    correctAnswer: "B",
    explanation: "If you want to do code-splitting in a server rendered app, it is recommend to use Loadable Components because React.lazy and Suspense is not yet available for server-side rendering. Loadable lets you render a dynamic import as a regular component. Lets take an example, Now OtherComponent will be loaded in a separated bundle: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are loadable components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are loadable components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-how-do-you-solve-performance-corner-cases-while-using-c",
    title: "How do you solve performance corner cases while using context?",
    prompt: "How do you solve performance corner cases while using context?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class App extends React.Component {\n  render() {\n    return (\n      <Provider value={{ something: 'something' }}>\n        <Toolbar />\n      </Provider>\n    );\n  }\n}\n\nclass App extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      value: { something: 'something' },\n    };\n  }\n\n  render() {\n    return (\n      <Provider value={this.state.value}>\n        <Toolbar />\n      </Provider>\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Disable all context consumers across the entire project.",
        isCorrect: false,
        explanation: "Disabling consumers breaks feature functionality; memoizing the value object optimizes performance."
      },
      {
        id: "B",
        text: "Store all context values in `localStorage` and poll with `setInterval`.",
        isCorrect: false,
        explanation: "Polling `localStorage` is slow, unreactive, and causes performance degradation."
      },
      {
        id: "C",
        text: "Memoize the context value object with `useMemo(() => ({ a, b }), [a, b])` or lift state up, preventing new object references from triggering unintentional consumer re-renders on every parent render.",
        isCorrect: true,
        explanation: "Correct. Passing inline objects `<Provider value={{ a, b }}>` creates a new object reference on every render; wrapping the value in `useMemo` preserves reference identity and skips consumer updates."
      },
      {
        id: "D",
        text: "Convert the application into static HTML files without JavaScript.",
        isCorrect: false,
        explanation: "Using `useMemo` for Provider values resolves reference identity re-render gotchas cleanly."
      }
    ],
    correctAnswer: "C",
    explanation: "The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider, s parent re-renders. For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value. This can be solved by lifting up the value to parent state,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you solve performance corner cases while using context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you solve performance corner cases while using context?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "performance-what-is-the-difference-between-real-dom-and-virtual-dom",
    title: "What is the difference between Real DOM and Virtual DOM?",
    prompt: "What is the difference between Real DOM and Virtual DOM?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Real DOM is the browser's live node tree where direct mutations trigger layout reflows/repaints; Virtual DOM is a lightweight in-memory JavaScript representation diffed to batch minimal real DOM updates.",
        isCorrect: true,
        explanation: "Correct. The Virtual DOM decouples UI updates from immediate browser DOM thrashing, batching and computing minimal diffs to keep rendering fast and predictable."
      },
      {
        id: "B",
        text: "Real DOM runs in JavaScript; Virtual DOM is a physical hardware circuit.",
        isCorrect: false,
        explanation: "Real DOM is the browser's C++ representation; Virtual DOM is a JavaScript object tree."
      },
      {
        id: "C",
        text: "There is no difference; they are exact synonyms.",
        isCorrect: false,
        explanation: "Virtual DOM is an in-memory abstraction over the browser's real DOM."
      },
      {
        id: "D",
        text: "Real DOM updates 1000x faster than Virtual DOM.",
        isCorrect: false,
        explanation: "Real DOM mutations are expensive due to browser layout reflows; Virtual DOM batches changes to minimize overhead."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the main differences between Real DOM and Virtual DOM, Real DOM Virtual DOM Updates are slow Updates are fast DOM manipulation is very expensive. DOM manipulation is very easy You can update HTML directly. You Can, t directly update HTML It causes too much of memory wastage There is no memory wastage Creates a new DOM if element updates It updates the JSX if element update: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Real DOM and Virtual DOM?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Real DOM and Virtual DOM?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "performance-how-to-add-bootstrap-to-a-react-application",
    title: "How to add Bootstrap to a react application?",
    prompt: "How to add Bootstrap to a react application?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "npm install bootstrap",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Rewrite the entire Bootstrap CSS file in raw assembly language.",
        isCorrect: false,
        explanation: "Bootstrap is installed via npm or CDN link and imported as standard CSS."
      },
      {
        id: "B",
        text: "Install `bootstrap` (importing CSS `import 'bootstrap/dist/css/bootstrap.min.css'`), use React-specific component libraries like `react-bootstrap` / `reactstrap`, or include CDN links in `index.html`.",
        isCorrect: true,
        explanation: "Correct. `react-bootstrap` replaces Bootstrap's jQuery scripts with native React components while using standard Bootstrap CSS stylesheets."
      },
      {
        id: "C",
        text: "Bootstrap can only be used on WordPress websites.",
        isCorrect: false,
        explanation: "Bootstrap works in any web application."
      },
      {
        id: "D",
        text: "Bootstrap is strictly incompatible with React.",
        isCorrect: false,
        explanation: "`react-bootstrap` and Bootstrap CSS are widely used in React projects."
      }
    ],
    correctAnswer: "B",
    explanation: "Bootstrap can be added to your React app in a three possible ways, Using the Bootstrap CDN: This is the easiest way to add bootstrap. Add both bootstrap CSS and JS resources in a head tag. Bootstrap as Dependency: If you are using a build tool or a module bundler such as Webpack, then this is the preferred option for adding Bootstrap to your React application React Bootstrap Package: In this case, you can add Bootstrap to our React app is by using a package that has rebuilt Bootstrap components to work particularly as React components. Below packages are popular in this category, react-bootstrap reactstrap: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to add Bootstrap to a react application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to add Bootstrap to a react application?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-the-differences-between-redux-and-mobx",
    title: "What are the differences between Redux and MobX?",
    prompt: "What are the differences between Redux and MobX?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "state-management",
    tags: [
      "performance",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux uses a single immutable state tree with explicit pure reducers and action dispatching; MobX uses multiple mutable observable stores with automatic dependency tracking and implicit updates.",
        isCorrect: true,
        explanation: "Correct. Redux emphasizes strict immutability, predictability, and explicit actions; MobX emphasizes minimal boilerplate, mutability, and reactive observables."
      },
      {
        id: "B",
        text: "There is no difference; MobX is an alias for Redux.",
        isCorrect: false,
        explanation: "They represent fundamentally different state paradigms (immutable/functional vs observable/reactive)."
      },
      {
        id: "C",
        text: "Redux only works on desktop; MobX only works on mobile.",
        isCorrect: false,
        explanation: "Both work across all JavaScript environments and UI frameworks."
      },
      {
        id: "D",
        text: "Redux is for Python; MobX is for Java.",
        isCorrect: false,
        explanation: "Both are JavaScript/TypeScript libraries for frontend state management."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the main differences between Redux and MobX, Topic Redux MobX Definition It is a javascript library for managing the application state It is a library for reactively managing the state of your applications Programming It is mainly written in ES6 It is written in JavaScript(ES5) Data Store There is only one large store exist for data storage There is more than one store for storage Usage Mainly used for large and complex applications Used for simple applications Performance Need to be improved Provides better performance How it stores Uses JS Object to store Uses observable to store the data: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between Redux and MobX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between Redux and MobX?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "performance-what-are-the-benefits-of-new-jsx-transform",
    title: "What are the benefits of new JSX transform?",
    prompt: "What are the benefits of new JSX transform?",
    level: "junior",
    type: "output",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Runs JavaScript code directly on quantum computers.",
        isCorrect: false,
        explanation: "The transform compiles JSX to standard JavaScript runtime calls."
      },
      {
        id: "B",
        text: "Automatically translates text into 100 foreign languages.",
        isCorrect: false,
        explanation: "The JSX transform is a compiler optimization for transpiling JSX to JavaScript."
      },
      {
        id: "C",
        text: "Using JSX without `import React from 'react'` in scope, compiling to optimized runtime imports (`react/jsx-runtime`), slightly reducing bundle size, and enabling future React compiler optimizations.",
        isCorrect: true,
        explanation: "Correct. Introduced in React 17, the new JSX transform automatically imports internal JSX runtime functions, eliminating manual `import React from 'react'` requirements."
      },
      {
        id: "D",
        text: "Disables all CSS stylesheets in the application.",
        isCorrect: false,
        explanation: "The transform affects only JSX-to-JS compilation."
      }
    ],
    correctAnswer: "C",
    explanation: "There are three major benefits of new JSX transform, It is possible to use JSX without importing React packages The compiled output might improve the bundle size in a small amount The future improvements provides the flexibility to reduce the number of concepts to learn React.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of new JSX transform?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of new JSX transform?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-how-do-you-design-a-frontend-caching-strategy-with-serv",
    title: "How do you design a frontend caching strategy with Service Workers?",
    prompt: "How do you design a frontend caching strategy with Service Workers?",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "performance",
    tags: [
      "system_design",
      "performance",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Cache credit card payment checkout endpoints in Cache-First storage indefinitely.",
        isCorrect: false,
        explanation: "Transactional and authentication endpoints must never be cached; they require Network-Only."
      },
      {
        id: "B",
        text: "Disable the browser cache entirely and download all JS bundles anew on every subresource request.",
        isCorrect: false,
        explanation: "Disabling caching ruins page load performance and spikes network costs."
      },
      {
        id: "C",
        text: "Apply Cache-First for hashed static assets (JS/CSS/fonts), Stale-While-Revalidate for images/read-only data, and Network-First for dynamic API responses.",
        isCorrect: true,
        explanation: "Correct. Service Worker strategies (e.g. via Workbox) route requests according to asset mutability: Cache-First for immutable hashes, Network-First for critical dynamic data."
      },
      {
        id: "D",
        text: "Store Service Worker scripts themselves with a 1-year immutable `Cache-Control` header.",
        isCorrect: false,
        explanation: "Caching the service worker script file itself prevents users from receiving app updates."
      }
    ],
    correctAnswer: "C",
    explanation: "Service Workers sit between the browser and network, enabling offline support and advanced caching. Service Worker caching strategies: Cache First, serve from cache, fall back to network (static assets) Network First, try network, fall back to cache (API data) Stale While Revalidate, serve cache immediately, update in background Network Only, always fetch from network (auth, payments) Cache Only, serve from cache only (offline fallbacks) What to cache: App shell, HTML, CSS, JS bundles (Cache First, long TTL) Images, Cache First with expiry API responses, Stale While Revalidate for listings DO NOT cache, auth tokens, payment flows, real-time data Workbox (Google's SW library): Built-in strategies Background sync for offline form submissions Used by create-react-app and Vite 1 // Workbox in vite.config.ts (VitePWA plugin) 2 import { VitePWA } from 'vite-plugin-pwa' 3 export default { plugins: [ VitePWA ( { 4 strategies: 'generateSW', 5 workbox: { 6 // Cache First: static assets, serve instantly 7 runtimeCaching: [ { 8 urlPattern: / \\\\. (?: js | css | woff2 ) $ /, 9 handler: 'CacheFirst', 10 options: { 11 cacheName: 'static-assets', 12 expiration: { maxAgeSeconds: 30 * 24 * 3600 } // 30 days 13 } 14 }, { 15 // Stale While Revalidate: images 16 urlPattern: / \\\\. (?: png | jpg | webp | svg ) $ /, 17 handler: 'StaleWhileRevalidate', 18 options: { cacheName: 'images', expiration: { maxEntries: 100 } } 19 }, { 20 // Network First: API responses 21 urlPattern: / ^ \\\\ / api \\\\ //, 22 handler: 'NetworkFirst', 23 options: { cacheName: 'api-cache', networkTimeoutSeconds: 3 } 24 } ] 25 } 26 } ) ] } 27",
    interviewLine: "Service Workers sit between the browser and network, enabling offline support and advanced caching.",
    misconception: "Service Worker caching strategies: Cache First, serve from cache, fall back to network (static assets) Network First, try network, fall back to cache (API data) Stale While Revalidate, serve cache immediately, update in back",
    hints: [
      "Ask who owns the cache, when it is invalidated, and what the user sees while it is stale."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/caching"
  },
  {
    id: "react-optimization-techniques-when-they-help",
    title: "When memoization actually helps",
    prompt: "Which use of memoization is genuinely worthwhile?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "performance",
    tags: [
      "react",
      "useMemo",
      "memo",
      "performance",
      "optimization"
    ],
    codeSnippet: "const filtered = useMemo(\n  () => hugeList.filter((x) => x.active),\n  [hugeList],\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "useCallback on every function, so children never see a new reference",
        isCorrect: false,
        explanation: "Only helps if the child is memoised and actually re-renders measurably. Otherwise it is overhead plus noise."
      },
      {
        id: "B",
        text: "Wrapping every component in React.memo as a matter of course",
        isCorrect: false,
        explanation: "Each memo adds a props comparison on every render. Applied blindly it costs more than it saves."
      },
      {
        id: "C",
        text: "useMemo around an expensive computation whose inputs rarely change",
        isCorrect: true,
        explanation: "Correct. Real work, stable inputs, that is where the cache pays for itself."
      },
      {
        id: "D",
        text: "useMemo around a simple arithmetic expression to avoid recomputing it",
        isCorrect: false,
        explanation: "Reading the cache costs more than the arithmetic. This is strictly slower."
      }
    ],
    correctAnswer: "C",
    explanation: "Memoization trades memory and comparison cost for skipped work, so it only wins when the skipped work is genuinely expensive and the inputs are genuinely stable. useMemo around a real computation over a large list qualifies. Wrapping trivial expressions does not, the bookkeeping costs more than recomputing. React.memo and useCallback only pay off together, on a component that would otherwise re-render often with unchanged props. Measure first; most render cost turns out to be somewhere else.",
    interviewLine: "Memoization isn't free, you're trading comparison cost for computation cost. It only wins when the computation is the expensive half.",
    misconception: "Treating useMemo and React.memo as free speedups to apply everywhere.",
    hints: [
      "What does the memoization itself cost on every render?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 3,
    bestPracticeRef: "https://web.dev/articles/vitals"
  }
];
