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
        explanation: "Correct. These are the primary built-in hooks React ships, each mapped to a distinct concern: state, side effects, context, mutable references, and referential-stable memoization."
      },
      {
        id: "B",
        text: "Hooks run exclusively on background server worker threads during compilation and emit plain HTML strings.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with a build step or an SSR pipeline. Hooks execute in the same JavaScript runtime as your component code (browser thread, or Node during SSR) and participate in React's render and commit phases; they do not run on separate worker threads and do not produce HTML strings."
      },
      {
        id: "C",
        text: "Built-in hooks can be called conditionally inside if statements and for loops without restrictions.",
        isCorrect: false,
        explanation: "Tempting if you treat hooks as ordinary function calls. The Rules of Hooks require unconditional top-level calls because React matches each hook to its fiber slot by call order; a conditional or looped call shifts every subsequent index and corrupts state."
      },
      {
        id: "D",
        text: "Hooks are class inheritance decorators that must only be declared inside ES6 class constructor methods.",
        isCorrect: false,
        explanation: "Tempting if you pattern-match the word 'hook' to a TypeScript decorator or a class-component lifecycle. Hooks are plain functions called inside function components or other hooks; they have no relationship to class inheritance, decorators, or constructors."
      }
    ],
    correctAnswer: "A",
    explanation: "React ships a fixed set of built-in hooks \u2014 useState, useReducer, useEffect, useLayoutEffect, useContext, useRef, useMemo, useCallback \u2014 that you call at the top level of a function component or another hook. Each one opts the component into a specific React feature: local state, side effects, context subscription, a mutable reference that survives re-renders, or referential-stable memoization.\n\nEvery hook call registers a slot on the component's fiber node, keyed by its position in the call sequence. That ordering is why the Rules of Hooks forbid conditional or looped calls: skip one hook on a render and every hook after it shifts its index, reading another hook's state or effect.\n\nAn interviewer will often follow up with custom hooks. A custom hook is just a function whose name starts with `use` that calls one or more built-in hooks; it inherits the same top-level, unconditional rule. The hooks are not tied to a particular component type the way class lifecycles were \u2014 they work in any function component regardless of where it sits in the tree.",
    interviewLine: "I think of hooks as order-indexed slots on the fiber node: useState, useEffect, useContext, useRef, useMemo, useCallback \u2014 each one registers a slot by its position in the call sequence, which is exactly why the Rules of Hooks forbid conditional or looped calls.",
    misconception: "Treating hooks as a one-to-one rename of class lifecycle methods (constructor \u2192 useState, componentDidMount \u2192 useEffect) and missing that they are order-indexed function calls with no class binding and a strict top-level-only rule.",
    hints: [
      "Think about what problem each hook solves: state, side effects, context, refs, memoization.",
      "Ask yourself what all built-in hooks share about where and how they must be called.",
      "The answer is not about a single hook but about the category of built-in functions React ships for function components."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how useState, useRef, useCallback, and useEffect each occupy a fixed slot by call order, and how the cleanup returned from useEffect closes over the stable `clear` reference.",
      language: "tsx",
      code: "import { useState, useEffect, useRef, useCallback } from \"react\";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);\n  const clear = useCallback(() => {\n    if (intervalRef.current !== null) {\n      clearInterval(intervalRef.current);\n      intervalRef.current = null;\n    }\n  }, []);\n  useEffect(() => {\n    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);\n    return clear;\n  }, [clear]);\n  return (\n    <div>\n      <span>{seconds}s</span>\n      <button onClick={clear}>Stop</button>\n    </div>\n  );\n}"
    }
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
        explanation: "Correct. The Virtual DOM is a tree of plain objects (`type`, `props`, `children`) that React builds in memory and diffs against the previous render to compute the minimal set of real DOM mutations to apply."
      },
      {
        id: "B",
        text: "A native browser API built into Chrome and Firefox that replaces the standard HTML DOM with a WebGL canvas.",
        isCorrect: false,
        explanation: "Tempting if \"virtual\" sounds like a browser-level rendering layer, but React implements this entirely in userland JavaScript; no browser exposes a Virtual DOM API or a WebGL-based DOM replacement."
      },
      {
        id: "C",
        text: "An isolated shadow DOM container used exclusively for sandboxing third-party advertising iframes.",
        isCorrect: false,
        explanation: "Shadow DOM is a Web Components standard for scoped styling and DOM encapsulation; it has no connection to React's reconciliation process or to ad-iframe sandboxing."
      },
      {
        id: "D",
        text: "A compile-time binary bytecode format that transpiles JSX into WebAssembly instructions.",
        isCorrect: false,
        explanation: "JSX compiles to `React.createElement` calls that return plain objects at runtime; there is no bytecode step, no WebAssembly output, and the \"virtual\" tree is built during render, not at compile time."
      }
    ],
    correctAnswer: "A",
    explanation: "The Virtual DOM is a tree of plain JavaScript objects \u2014 each with a `type`, `props`, and `children` \u2014 that React builds in memory on every render. It is not a real DOM node and the browser never sees it. During reconciliation, React diffs the new tree against the previous one to identify exactly which nodes changed, then translates those differences into the smallest set of real DOM mutations.\n\nIn practice this means a single `setState` call that changes one prop on a deeply nested component results in one `setAttribute` call on the real element, rather than React tearing down and rebuilding the entire subtree. The browser avoids unnecessary layout, paint, and reflow work because untouched nodes are simply skipped.\n\nOne nuance worth naming: the Virtual DOM is a heuristic working copy, not a guarantee of minimal DOM writes. React's reconciliation relies on heuristics like the `key` prop and the assumption that sibling order is stable; if you violate those assumptions, React may issue more DOM operations than a hand-written diff would. The Virtual DOM also does not replace the DOM \u2014 it is a description React uses to decide what to do to the DOM.",
    interviewLine: "I describe the Virtual DOM as just a tree of plain objects \u2014 type, props, children \u2014 that React keeps in memory, and during reconciliation it diffs the new tree against the previous one so it only issues the handful of `setAttribute` or `appendChild` calls the browser actually needs.",
    misconception: "Conflating \"virtual\" with a browser-native rendering technology or with Shadow DOM, rather than recognizing it as a userland data structure React uses as a working copy for diffing before touching the real DOM.",
    hints: [
      "Think about what React actually stores between renders: real DOM nodes, or something else the browser never sees?",
      "What does React do with that stored representation before it touches the real DOM?",
      "The word \"virtual\" here means \"a description in memory,\" not a browser API or a compiled artifact."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "Notice that a Virtual DOM node is just a plain object; the diff between two renders is a comparison of those objects, not of real DOM nodes.",
      language: "javascript",
      code: "// What a \"virtual DOM node\" actually is: a plain object\nconst title = {\n  type: \"h1\",\n  props: { className: \"title\" },\n  children: [\"Hello\"],\n};\n\n// After a state update, React builds a new tree and diffs:\nconst titleUpdated = {\n  type: \"h1\",\n  props: { className: \"title active\" },\n  children: [\"Hello\"],\n};\n\n// Diff result: only props.className changed\n// \u2192 React issues one setAttribute on the real <h1> element"
    }
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
        text: "Define a componentWillUnmount closure inside the functional component body.",
        isCorrect: false,
        explanation: "Tempting if you treat class lifecycle names as a vocabulary you can port into functions. But componentWillUnmount is a method React calls on the class instance; there is no hook or registration point that lets you define a function by that name inside a component body."
      },
      {
        id: "B",
        text: "Return a cleanup function from a useEffect with an empty dependency array [] (or before subsequent effect executions).",
        isCorrect: true,
        explanation: "Correct. React invokes the function returned by useEffect both when the component unmounts and before the effect re-runs, making it the single place to tear down subscriptions, timers, or listeners."
      },
      {
        id: "C",
        text: "Attach a window.onbeforeunload listener in the root render function.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'the component disappears' with 'the page unloads.' But onbeforeunload fires for browser-level navigation or tab close, not for React re-rendering a component out of the tree within the same page."
      },
      {
        id: "D",
        text: "Check this.isMounted === false inside a setTimeout loop on every render.",
        isCorrect: false,
        explanation: "Tempting if you remember isMounted from pre-16 React docs. But that method was removed, and functional components have no this at all, so the check is both unavailable and syntactically impossible."
      }
    ],
    correctAnswer: "B",
    explanation: "The cleanup function returned from a useEffect is the standard way to observe unmounting in a functional component. When React removes the component from the tree, it calls that cleanup before detaching the DOM. In the code sample, SomeAPI.undoFunction is that cleanup: it unsubscribes the handler so the API does not keep a reference to a callback that belongs to a dead component.\n\nIn practice this prevents two bugs. First, a leaked subscription or interval keeps firing after the component is gone, calling setState on an unmounted component. Second, if the effect has dependencies and re-runs, React calls the previous cleanup before setting up the new effect, so you never accumulate duplicate subscriptions.\n\nNote the timing: the cleanup runs before unmount completes and before the next effect execution, not after. And it closes over the variables of the render in which it was created, so if you reference a prop or state value inside the cleanup, you see the value from that specific render, not the latest one.",
    interviewLine: "I return a cleanup function from useEffect; React calls it right before the component unmounts and also before the effect re-runs, so I tear down subscriptions and timers in one place without polling or checking a flag.",
    misconception: "Treating class-component lifecycle method names as a 1:1 vocabulary that maps onto hooks, when the cleanup-return pattern is a different mechanism with its own timing: it fires before unmount and before every re-execution, not at a named lifecycle point.",
    hints: [
      "Look at what the useEffect callback returns in the code sample.",
      "Ask what React does with that returned value, and at which two moments it calls it.",
      "The answer is a value you return from an effect, not a method name you define inside the component body."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The clearInterval in the cleanup stops the timer when the component unmounts, preventing a setState call on a component that is no longer in the tree.",
      language: "typescript",
      code: "function useCountdown(seconds: number) {\n  const [remaining, setRemaining] = useState(seconds);\n\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));\n    }, 1000);\n\n    return () => clearInterval(timer);\n  }, []);\n\n  return remaining;\n}"
    }
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
        text: "Redux persists its state tree to a backend Redis server on every dispatch, while MobX keeps its observables entirely in client memory.",
        isCorrect: false,
        explanation: "Tempting if you conflate state management with data persistence, but both Redux and MobX are in-memory, client-side libraries. Neither ships state to a database; any server sync is an extra layer you add yourself."
      },
      {
        id: "B",
        text: "Redux can only be consumed from functional components via hooks, whereas MobX can only be wired into class components through decorators.",
        isCorrect: false,
        explanation: "This inverts the actual history. Redux originally paired with `connect` for class components but now uses `useSelector` and `useDispatch` hooks in function components. MobX started with the `observer` higher-order component for classes and now also supports `useObserver` and `useLocalObservable` hooks."
      },
      {
        id: "C",
        text: "Redux uses a single immutable state tree with explicit pure reducers; MobX uses mutable observable objects with granular dependency tracking.",
        isCorrect: true,
        explanation: "Correct. The architectural split is exactly this: Redux enforces a unidirectional flow through immutable snapshots, while MobX lets you mutate observable properties and relies on its internal tracker to update only the components that read the changed property."
      },
      {
        id: "D",
        text: "MobX requires far more boilerplate than Redux, since each observable field needs its own action type, action creator, and selector.",
        isCorrect: false,
        explanation: "This is the inverse of the common experience. A MobX store is typically a class with `observable` fields and `action` methods, while a Redux setup requires separate action types, action creators, a reducer, a store configuration, and selector functions for the same feature."
      }
    ],
    correctAnswer: "C",
    explanation: "Redux keeps all application state in one plain object tree. Every update flows through a named action into a pure reducer function that returns a brand-new object without mutating the previous one. MobX wraps state in observable objects; you mutate properties directly, and a proxy-based tracking system records which component read which property during its last render.\n\nIn practice this means a Redux component re-renders whenever the slice of state it selects gets a new reference, even if the value it actually displayed did not change. A MobX component re-renders only when the specific observable property it read is written to, so a cart list that reads `items.length` does not re-render when one item's `qty` changes.\n\nThe trade-off an interviewer will probe: Redux's explicit flow makes time-travel debugging and middleware (logging, persistence) straightforward because every transition is a pure function of the previous state. MobX's mutability is simpler to write but harder to audit, because any code path holding a reference to the observable can change it, and there is no single log of who changed what.",
    interviewLine: "I think of it as the update contract. Redux forces every change through a pure function that returns a new reference, so I can time-travel and log every transition. MobX lets me mutate an observable property in place, and its proxy tracker re-renders only the components that actually read that property, which is less boilerplate but harder to audit in a large codebase.",
    misconception: "The difference is framed as a question of where state lives (browser vs server) or which component type you can use, when the real split is the update mechanism: explicit immutable transitions through named reducers versus direct mutation with automatic reactive tracking.",
    hints: [
      "Ask yourself what happens the instant a user clicks a button: does the state change through a named function that returns a new object, or does a property get assigned in place?",
      "Which library needs you to declare the dependency graph yourself with selectors and action types, versus tracking it automatically at read time?",
      "Neither library is tied to a specific component type or a server; the split is about the update mechanism, not the hosting environment."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice how Redux builds a new array on every update while MobX mutates the item in place and lets its tracker decide which components to re-render.",
      language: "typescript",
      code: "// Redux: pure reducer returns a new reference\ntype Cart = { items: { id: string; qty: number }[] };\n\nfunction cartReducer(state: Cart, action: { type: string; id?: string }): Cart {\n  if (action.type === \"increment\") {\n    return {\n      items: state.items.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i)),\n    };\n  }\n  return state;\n}\n\n// MobX: mutable observable, tracker handles re-render\nimport { observable, action } from \"mobx\";\n\nclass CartStore {\n  items = observable.array([{ id: \"a\", qty: 1 }, { id: \"b\", qty: 2 }], { deep: true });\n  increment = action((id: string) => {\n    const item = this.items.find((i) => i.id === id)!;\n    item.qty += 1; // direct mutation; only readers of .qty re-render\n  });\n}"
    }
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
        explanation: "Tempting if you picture memoisation as a browser-level cache, but `useMemo` writes nothing to any storage API. The value lives in React's internal fiber node for the lifetime of that component instance and is gone when the component unmounts."
      },
      {
        id: "B",
        text: "Caches the result of an expensive calculation between renders, recalculating only when specified dependencies change referentially.",
        isCorrect: true,
        explanation: "Correct. React compares the dependency array with `Object.is` on every render; if nothing changed it returns the stored value, otherwise it re-runs the callback and stores the new result."
      },
      {
        id: "C",
        text: "Runs an asynchronous network fetch after the component mounts to the screen.",
        isCorrect: false,
        explanation: "Tempting because data-fetching is a common reason to memoise a value, but `useMemo` runs synchronously during the render phase and cannot return a `Promise`. Asynchronous work belongs in `useEffect` or React 19's `use` function."
      },
      {
        id: "D",
        text: "Forces the component to re-render in the background on every millisecond tick.",
        isCorrect: false,
        explanation: "Tempting if you conflate memoisation with a timer or subscription, but `useMemo` is a read-only short-circuit: it never calls `setState`, never schedules a render, and never fires on a clock."
      }
    ],
    correctAnswer: "B",
    explanation: "`useMemo` returns the cached value of a callback that React stores on the component's fiber. On each render, React compares the dependency array you pass with the one from the previous render using `Object.is`. If every element is the same reference, it skips the callback and hands back the stored result. If any element differs, it calls the callback, stores the new return value, and hands that to you.\n\nIn practice this means a derived value like a filtered list, a formatted date, or a computed object is produced once per input change instead of once per render. A parent that re-renders for an unrelated state update no longer forces the child to redo that work, and a child wrapped in `React.memo` can skip its own re-render because the prop reference is stable.\n\nThe comparison is shallow: a new object or array literal in the dependency array triggers recalculation every render, which silently defeats the memo. The callback must also be pure; React may call it twice in Strict Mode and in concurrent renders, so side effects inside it are undefined behaviour. And `useMemo` is a hint, not a guarantee \u2014 for trivial computations the bookkeeping cost can exceed the savings.",
    interviewLine: "I use `useMemo` to skip recomputing a derived value during render when its inputs are referentially unchanged; React compares the dependency array with `Object.is` and returns the cached result from the fiber if nothing shifted, so the callback runs only on genuine input change.",
    misconception: "Treating `useMemo` as a persistent store or a scheduling mechanism, when it is actually a per-render short-circuit that lives on the fiber and only short-circuits when references are identical.",
    hints: [
      "Look at the two arguments: a callback that returns a value, and an array of dependencies.",
      "Ask what React does on the second render when every dependency is the same reference as before.",
      "It is a synchronous, render-phase optimisation; it never schedules work, touches the network, or writes to any storage API."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo",
    example: {
      caption: "Notice that `filtered` is only recomputed when the `items` array or the `query` string actually changes, so a parent re-render for unrelated state does not re-run the filter loop.",
      language: "tsx",
      code: "function FilteredList({ items, query }: { items: Item[]; query: string }) {\n  const filtered = useMemo(\n    () => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),\n    [items, query]\n  );\n\n  return (\n    <ul>\n      {filtered.map((item) => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Binds the callback's `this` to the component instance so it can be passed as a standalone event handler.",
        isCorrect: false,
        explanation: "Tempting if you picture useCallback as a wrapper around `.bind()`, but it never touches `this`, the component instance, or any binding mechanism. The returned function uses the same lexical scoping as the arrow function you passed in."
      },
      {
        id: "B",
        text: "Returns a stable function reference that only changes when a dependency changes, so memoized children can skip re-renders.",
        isCorrect: true,
        explanation: "Correct. useCallback compares the dependency array with the previous render using Object.is and returns the cached function reference when nothing changed, so a React.memo child sees an identical prop and skips its re-render."
      },
      {
        id: "C",
        text: "Invokes the callback during render and caches the result, so subsequent renders skip the computation entirely.",
        isCorrect: false,
        explanation: "This confuses useCallback with useMemo. useCallback never calls the function it receives; it only decides whether to return a new function object or the cached one. The callback is invoked later by whoever calls it, not during render."
      },
      {
        id: "D",
        text: "Wraps the callback in a microtask queue so it fires after the current render has committed to the DOM.",
        isCorrect: false,
        explanation: "This mixes up useCallback with useEffect. useCallback returns a function reference synchronously during render; it does not schedule, queue, or delay any execution. The callback fires only when the caller invokes it."
      }
    ],
    correctAnswer: "B",
    explanation: "useCallback(fn, deps) stores the function and its dependency array between renders. On the next render it compares each dependency with the previous value using Object.is. If every value is the same, it returns the previously created function object; if any value differs, it creates and returns a new one. The result is a function reference that stays the same object across renders as long as its inputs do not change.\n\nWithout useCallback, a plain arrow function defined in the component body gets a new identity on every render. If you pass that function as a prop to a child wrapped in React.memo, the shallow prop comparison sees a new reference and re-renders the child even though nothing else changed. useCallback breaks that chain by handing the child the same object it already holds.\n\nThe nuance: useCallback adds a per-render comparison cost, so it is pure overhead when the child is cheap or when the callback is not passed to a memoized consumer. Also, the closure still captures the variables from the render in which it was created; memoization controls the reference, not the captured values.",
    interviewLine: "I use useCallback to memoize the function reference across renders via a dependency array, so a child wrapped in React.memo sees an identical prop and skips its re-render instead of doing a shallow comparison that would fail on a new reference.",
    misconception: "Thinking useCallback changes what the function does or when it runs, when in reality it only controls whether the function's reference is the same object across renders.",
    hints: [
      "Compare what useCallback returns on render N versus render N+1 when the dependencies are unchanged, and contrast that with a plain arrow function in the component body.",
      "Ask whether the consumer of that function actually relies on referential equality, such as React.memo or a context value.",
      "useCallback does not alter the function's behaviour or execution timing; it only decides whether to hand back the same object or a new one."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useCallback",
    example: {
      caption: "Notice that ExpensiveList logs only on mount, not on every parent re-render, because handleSelect keeps the same reference across renders.",
      language: "tsx",
      code: "\"use client\";\n\nimport { memo, useCallback, useState } from \"react\";\n\nconst items = [\"alpha\", \"beta\", \"gamma\"];\n\nconst ExpensiveList = memo(({ items, onSelect }: { items: string[]; onSelect: (id: string) => void }) => {\n  console.log(\"ExpensiveList rendered\");\n  return <ul>{items.map((i) => <li key={i} onClick={() => onSelect(i)}>{i}</li>)}</ul>;\n});\n\nexport function Parent() {\n  const [count, setCount] = useState(0);\n  const handleSelect = useCallback((id: string) => console.log(\"selected\", id), []);\n\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>\n      <ExpensiveList items={items} onSelect={handleSelect} />\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you associate hooks with the function-component era, but both are React Hooks and can only be called inside function components or custom hooks. Neither has any special relationship to class components."
      },
      {
        id: "B",
        text: "`useMemo` supports async functions, while `useCallback` only supports synchronous functions.",
        isCorrect: false,
        explanation: "Tempting if you read \"memoize\" as \"wait for the value to settle,\" but the factory in `useMemo` must return a value synchronously; passing an `async` function would cache a `Promise`, not the resolved data. `useCallback` has the same synchronous contract because it never invokes the function at all."
      },
      {
        id: "C",
        text: "`useCallback` runs after DOM paint, while `useMemo` runs before DOM paint.",
        isCorrect: false,
        explanation: "Tempting if you conflate hooks with `useEffect`, which does run after paint. Both `useMemo` and `useCallback` execute synchronously during the render phase, before any DOM mutations occur."
      },
      {
        id: "D",
        text: "`useMemo` calls its function and caches the returned result value; `useCallback` caches the function instance itself without calling it.",
        isCorrect: true,
        explanation: "Correct. `useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)`: the memoized value is the function, not its return value."
      }
    ],
    correctAnswer: "D",
    explanation: "`useMemo(fn, deps)` calls `fn` during render and caches the value it returns. On the next render, if every entry in `deps` is referentially equal to the previous render's entry, React skips the call and hands you the stored result. `useCallback(fn, deps)` never calls `fn`; it caches the function reference itself and returns that same reference until `deps` change.\n\nIn practice this means `useCallback` exists to give a child component a stable prop identity so `React.memo` can skip a re-render, while `useMemo` exists to avoid re-running an expensive computation (a `filter` over a large list, a `new Map(...)` build) on every render. Swapping them does not work: wrapping a handler in `useMemo` would call the handler and cache its return value, not the handler.\n\nThe two are formally linked: `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. A nuance interviewers probe is that neither hook is a performance guarantee. React may discard a cached value at any time (for example on concurrent re-renders), so you must not write logic that depends on the factory running exactly once per dependency change.",
    interviewLine: "I'd say `useMemo` invokes the factory and caches the returned value while `useCallback` never calls the function, it just returns a stable reference \u2014 in fact `useCallback(fn, deps)` is exactly `useMemo(() => fn, deps)` under the hood.",
    misconception: "Treating `useCallback` as `useMemo` that also executes the function, rather than recognizing that the two differ in what they cache: a computed value versus a function reference.",
    hints: [
      "Look at what each hook returns to the component body when dependencies are unchanged.",
      "Ask whether the hook invokes the function you pass in or hands the function back to you.",
      "Neither hook is tied to paint timing or component type; both run synchronously during render."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo",
    example: {
      caption: "Notice that `useCallback` stabilizes the handler reference for the memoized child, while `useMemo` avoids re-filtering the list on every render.",
      language: "tsx",
      code: "import { memo, useCallback, useMemo } from \"react\";\n\nconst Row = memo(({ name, onEdit }: { name: string; onEdit: (n: string) => void }) => {\n  return <button onClick={() => onEdit(name)}>{name}</button>;\n});\n\nexport function UserList({ users }: { users: { name: string; active: boolean }[] }) {\n  const activeNames = useMemo(\n    () => users.filter((u) => u.active).map((u) => u.name),\n    [users]\n  );\n\n  const handleEdit = useCallback(\n    (name: string) => console.log(\"edit\", name),\n    []\n  );\n\n  return activeNames.map((name) => <Row key={name} name={name} onEdit={handleEdit} />);\n}"
    }
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
        text: "Caches context values in `sessionStorage` automatically so they survive a page reload.",
        isCorrect: false,
        explanation: "Tempting if you picture context as a small persistence layer, but context values live entirely in React's in-memory component tree. Nothing is serialized to `sessionStorage`, `localStorage`, or any other browser API; unmounting the provider discards the value."
      },
      {
        id: "B",
        text: "Lets a child component mutate the parent's context value in place, without calling a state setter.",
        isCorrect: false,
        explanation: "Tempting if you think of context as a shared mutable store, but the value a consumer reads is a plain reference. Mutating its properties does not notify React, does not trigger a re-render, and does not propagate to other consumers. The only way to change what consumers see is for the provider to pass a new `value` prop."
      },
      {
        id: "C",
        text: "Creates a new `<Context.Provider>` and mounts it directly into the document body.",
        isCorrect: false,
        explanation: "Tempting if you conflate consuming with providing, or assume hooks reach into the DOM. `useContext` is a pure read-and-subscribe call; it never creates a provider, never touches `document.body`, and has no effect outside the component that calls it."
      },
      {
        id: "D",
        text: "Reads the value from the nearest `<Context.Provider>` ancestor, re-rendering the component on reference change.",
        isCorrect: true,
        explanation: "Correct. `useContext` is a consumer: it reads the value from the closest provider above and subscribes the calling component to future changes to that value, triggering a re-render on each change."
      }
    ],
    correctAnswer: "D",
    explanation: "`useContext` takes a context object (the one returned by `createContext`) and returns the value currently supplied by the nearest `<Context.Provider>` ancestor in the tree. The calling component also subscribes to that provider, so React schedules a re-render of the consumer whenever the provider's `value` prop changes reference.\n\nIn practice this means every component that calls `useContext(ThemeContext)` re-renders the moment any ancestor provider passes a new object. If the provider builds the value inline\u2014`value={{ palette: getPalette() }}`\u2014a new reference is created on every parent render, and all consumers re-render even when the contents are identical. Memoizing the value or lifting it into `useState` keeps the reference stable and limits re-renders to the moments you actually change the data.\n\nOne edge an interviewer will probe: if no `<Context.Provider>` sits above the consumer, `useContext` simply returns the default value you passed to `createContext`. There is no error, no `null`, no fallback hook\u2014just the initial value, which is why teams typically set a sensible default rather than relying on a provider always being present.",
    interviewLine: "`useContext` is a consumer-only hook: it reads the value from the nearest provider ancestor and subscribes the component to re-render whenever that provider's `value` reference changes, so I keep the value stable with `useState` or memoization to avoid cascading re-renders.",
    misconception: "Treating context as a global mutable store or a persistence mechanism, rather than a read-only subscription channel that only updates when the provider passes a new reference to `value`.",
    hints: [
      "Look at what the argument to `useContext` is and what the function returns in the snippet.",
      "Ask whether the hook creates a provider or reads from one, and what triggers the consumer to re-render.",
      "No storage API, no DOM insertion, no mutation\u2014this is a read-and-subscribe call inside React's component tree."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice how `ProfileCard` reads the inner provider's value while `Sidebar` reads the outer one, demonstrating the nearest-provider rule.",
      language: "tsx",
      code: "const UserContext = createContext<{ name: string }>({ name: \"guest\" });\n\nconst Dashboard = () => (\n  <UserContext.Provider value={{ name: \"alice\" }}>\n    <Sidebar />\n    <UserContext.Provider value={{ name: \"bob\" }}>\n      <ProfileCard />\n    </UserContext.Provider>\n  </UserContext.Provider>\n);\n\nconst Sidebar = () => {\n  const user = useContext(UserContext);\n  return <nav>Welcome, {user.name}</nav>; // \"alice\"\n};\n\nconst ProfileCard = () => {\n  const user = useContext(UserContext);\n  return <span>{user.name}</span>; // \"bob\"\n};"
    }
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
        explanation: "Correct. React.memo returns a wrapper component that performs a shallow (Object.is per key) comparison of new and old props before deciding whether to call the original component function."
      },
      {
        id: "B",
        text: "A hook you call inside a component to cache an expensive computed value so it is not recalculated on every render.",
        isCorrect: false,
        explanation: "Tempting if you read 'memo' as a caching hook, but React.memo is not a hook and is not called inside a component. It wraps a component definition and returns a new component; it stores no computed value. The hook for caching a computed value is useMemo."
      },
      {
        id: "C",
        text: "A method you invoke to force a component to re-render on every parent update even if its props did not change.",
        isCorrect: false,
        explanation: "This inverts what memo does. The wrapper exists to prevent a re-render when props are unchanged; it has no mechanism to force one. If you need to force a re-render, you change internal state or pass a new prop reference from the parent."
      },
      {
        id: "D",
        text: "A build-time function that compiles a component's JSX into a static native mobile binary for iOS or Android.",
        isCorrect: false,
        explanation: "React.memo has no relation to native compilation or mobile tooling. It is a rendering-phase optimization that runs in the browser or Node.js and simply gates whether a component function is called."
      }
    ],
    correctAnswer: "A",
    explanation: "React.memo is a higher-order component. You pass a function component to it and it returns a new component that wraps the original. During reconciliation, the wrapper compares the new props object to the previous one using shallow equality (Object.is on each key). If every prop is identical, React skips calling the component function and reuses the last rendered output.\n\nThis matters when a parent re-renders often. Without memo, every child in the tree re-renders on each parent update. Wrap a child in memo and, as long as its props keep the same references, the child stays out of the render cycle. The parent still runs; only the child's function is skipped.\n\nTwo limits to keep in mind. The comparison is shallow, so a prop that is an object or array will trigger a re-render if its reference changes, even if its contents are the same. And memo does not freeze the component: changes to its own state (useState, useReducer) or to a context it consumes (useContext) still cause a re-render.",
    interviewLine: "I describe React.memo as a higher-order component that takes a component and returns a wrapper doing a shallow Object.is comparison on each prop key; if every prop is identical the component function is skipped and the previous output is reused.",
    misconception: "Candidates see the word 'memo' and assume it is a hook like useMemo that caches a computed value, rather than a wrapper applied outside a component definition that gates the entire render call.",
    hints: [
      "Look at what you pass into memo and what it returns: is it a hook called inside a component, or a wrapper applied outside one?",
      "The comparison it performs is shallow, Object.is on each prop key. What does that imply for props that are objects or arrays?",
      "It does not freeze the component: internal state changes and context updates still trigger a re-render."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Clicking the button re-renders App, but neither ListItem logs because their string props keep the same references.",
      language: "tsx",
      code: "import { memo, useState } from 'react';\n\nconst ListItem = memo(function ListItem({ label }: { label: string }) {\n  console.log('rendering', label);\n  return <li>{label}</li>;\n});\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>\n        count: {count}\n      </button>\n      <ul>\n        <ListItem label=\"alpha\" />\n        <ListItem label=\"beta\" />\n      </ul>\n    </div>\n  );\n}"
    }
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
        text: "Wrapping every primitive value in the codebase with `useMemo` to guarantee no re-render ever touches it.",
        isCorrect: false,
        explanation: "Tempting if you treat `useMemo` as a free cache. In practice it allocates a cache slot, stores a reference, and re-runs its dependency comparison on every render; for a number or string that bookkeeping costs more than simply re-reading the variable."
      },
      {
        id: "B",
        text: "Reaching into the live DOM with `document.getElementById` and mutating `textContent` directly to skip reconciliation.",
        isCorrect: false,
        explanation: "Tempting if you assume React's reconciliation is the bottleneck. But React tracks the virtual tree; a manual `textContent` write is invisible to it, so the next render overwrites your change or leaves the virtual tree and the real DOM out of sync."
      },
      {
        id: "C",
        text: "Batching all component renders into a single synchronous `while` loop so the browser paints once at the end.",
        isCorrect: false,
        explanation: "Tempting if you think one paint at the end is cheaper than many. A `while` loop on the main thread blocks input, `requestAnimationFrame`, and layout for its entire duration; the user sees a frozen page with no way to interact."
      },
      {
        id: "D",
        text: "Combining `React.memo` and `useMemo` for redundant renders, `React.lazy` for bundle size, list virtualization for long DOM lists, and keeping state in the component that reads it.",
        isCorrect: true,
        explanation: "Correct. Each technique addresses a different bottleneck: redundant re-renders, initial bundle size, DOM node count, and unnecessary state propagation, so they compose rather than compete."
      }
    ],
    correctAnswer: "D",
    explanation: "These techniques target four distinct bottlenecks in a React app. `React.memo`, `useMemo`, and `useCallback` reduce redundant re-renders and recomputations. `React.lazy` with `<Suspense>` splits the initial JavaScript bundle so the browser downloads and parses less code before first paint. List virtualization (for example `react-window`) replaces rendering 10,000 DOM nodes with only the roughly 20 visible rows. State colocation keeps a value in the component that reads it, so a change re-renders one subtree instead of an ancestor and everything below.\n\nIn practice the biggest wins come from not doing work at all. A `useMemo` around an expensive `filter` or `reduce` means that computation runs only when its dependencies change, not on every parent render. `React.memo` on a list row means typing in a search box re-renders the input and the list container but skips every row whose props are unchanged. Code splitting turns a 400 KB dashboard bundle into a 60 KB shell plus on-demand chunks.\n\nThe nuance an interviewer will probe next: memoization has a cost. `React.memo` does a shallow prop comparison every render, and `useMemo` re-checks its dependency array. Wrapping a cheap expression or a primitive adds overhead with no savings. The right question is whether the computation or re-render is expensive enough to justify the bookkeeping.",
    interviewLine: "I identify which bottleneck I am actually hitting first. If it is redundant re-renders I reach for `React.memo` or `useMemo`; if it is bundle size I split with `React.lazy`; if it is a 50,000-row table I virtualize. Each tool has its own overhead, so I only add it where the cost of not doing so is higher.",
    misconception: "Treating React performance as one problem with one fix\u2014usually 'add `useMemo` everywhere'\u2014instead of recognizing that re-render cost, bundle size, DOM node count, and state scope are separate bottlenecks that need separate tools.",
    hints: [
      "List the things that actually make a React page slow: redundant re-renders, initial bundle size, DOM node count, and how far a state change propagates.",
      "Ask whether each candidate answer removes real work or just adds bookkeeping on top of work that was already cheap.",
      "`useMemo` and `React.memo` both perform a comparison on every render; if the thing you are memoizing is cheaper than that comparison, you have made things slower."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Typing in the input re-renders `SearchList`, but `React.memo` lets each `Row` skip re-rendering because its `id` and `label` props are shallow-equal to the previous render.",
      language: "tsx",
      code: "import { memo, useState } from \"react\";\n\nconst Row = memo(function Row({ id, label }: { id: number; label: string }) {\n  return <li>{id}: {label}</li>;\n});\n\nexport function SearchList() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <ul>\n        {Array.from({ length: 50 }, (_, i) => (\n          <Row key={i} id={i} label={`Item ${i}`} />\n        ))}\n      </ul>\n    </>\n  );\n}"
    }
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
        text: "An in-memory JavaScript object tree that React diffs against the previous render's tree to compute the minimal set of batched mutations applied to the real DOM.",
        isCorrect: true,
        explanation: "Correct. React builds a new in-memory object tree from JSX on each render, diffs it against the previous fiber tree via reconciliation, and applies only the changed nodes as batched DOM mutations."
      },
      {
        id: "B",
        text: "A browser-engine feature exposed through the Web Components API that lets JavaScript bypass the HTML parser entirely.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'virtual' with a hardware or browser-level abstraction, but the virtual DOM is pure userland JavaScript maintained by React or any library that implements reconciliation. No browser-engine API or WebAssembly layer is involved."
      },
      {
        id: "C",
        text: "A serialized snapshot of the component tree persisted in `localStorage` so the browser can restore it on the next navigation.",
        isCorrect: false,
        explanation: "Tempting if you conflate in-memory state with persisted state, but the virtual DOM lives only for the duration of a render cycle on the JavaScript heap. Nothing is written to `localStorage`, cookies, or any other storage; the objects are garbage-collected after the commit phase."
      },
      {
        id: "D",
        text: "A headless rendering surface that React mounts on a secondary display or offscreen canvas for devtools inspection.",
        isCorrect: false,
        explanation: "Tempting if you read 'virtual display' as a literal second screen, but the virtual DOM is a data structure in JavaScript memory with no relationship to physical monitors, offscreen canvases, or devtools rendering surfaces."
      }
    ],
    correctAnswer: "A",
    explanation: "The virtual DOM is a plain JavaScript object tree that mirrors the structure, types, and props of the real DOM. On every render, React builds this new in-memory tree from JSX, then runs reconciliation: it walks the previous fiber tree and the new tree in parallel, comparing node types, `key` values, and props to identify which subtrees actually changed.\n\nThe result is a list of minimal mutations\u2014attribute updates, insertions, removals\u2014batched into a single commit phase. Without this step, a state change in one component would force the browser to re-parse and re-layout the entire subtree, which is expensive because layout and paint are synchronous and block the main thread.\n\nReact does not keep two full copies of the tree in memory. It retains the previous fiber tree (each node carries `memoizedState`, `child`, and `sibling` links) and builds the new tree incrementally, reusing unchanged subtrees. The `key` prop matters here: it lets reconciliation match list items by identity rather than index, so reordering a list updates the right nodes instead of shuffling text into the wrong `<li>`.",
    interviewLine: "I describe the virtual DOM as just a plain object tree React builds from JSX on every render. Reconciliation walks the previous and new fiber trees in parallel, and only the nodes that actually changed produce DOM mutations in the commit phase\u2014so a single state update in one list item does not re-layout the whole page.",
    misconception: "The virtual DOM is often imagined as a second full copy of the DOM sitting in memory, or as a browser-level optimization. In reality it is a plain JS object tree that React builds and discards each render, and the 'diff' is a comparison between the previous fiber tree and the new one, not a comparison of two complete DOM snapshots.",
    hints: [
      "Between `setState` and the browser painting pixels, React builds a JS object tree, compares it to the last one, and writes only the differences to the real DOM.",
      "Ask yourself: does React keep two full copies of the DOM, or does it walk one fiber tree and build the next incrementally?",
      "The virtual DOM is not a browser API, a storage mechanism, or a display surface\u2014it is userland JavaScript that React (or another library) manages."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "Only the `<span>` text differs between renders; React's diff skips the `<p>` wrapper and the `<button>` entirely, so the browser performs a single text-node update.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>\n        Count: <span>{count}</span>\n      </p>\n      <button onClick={() => setCount((c) => c + 1)}>\n        +1\n      </button>\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you treat props as an ordinary mutable object, but React treats them as read-only inputs. The parent re-renders and overwrites any local assignment, and the dev-mode console warns that you modified props. The intended direction is always parent-to-child."
      },
      {
        id: "B",
        text: "State is shared automatically across all unconnected components without providers.",
        isCorrect: false,
        explanation: "This confuses component-local state with a global store. Each component instance owns its own state; a sibling or grandchild sees nothing unless the parent passes the value down as a prop, a context provider supplies it, or an external store is used."
      },
      {
        id: "C",
        text: "Props are only used for CSS styling, while state stores database queries.",
        isCorrect: false,
        explanation: "This invents a rigid role split that does not exist. Props carry any JavaScript value \u2014 strings, objects, functions, React elements \u2014 and state holds whatever dynamic data the component needs to track, from a counter to a fetched list."
      },
      {
        id: "D",
        text: "Props are read-only inputs passed top-down; state is local mutable data that triggers a re-render on change.",
        isCorrect: true,
        explanation: "Correct. Props are the parent's inputs to the child and the child never reassigns them; state is the component's own memory, updated via `setState` or a `useState` setter, and the update schedules a re-render of that component."
      }
    ],
    correctAnswer: "D",
    explanation: "Props are the parent's way of configuring a child component. They arrive as a single read-only object, flow strictly top-down, and the receiving component must treat them as inputs it never reassigns. State, by contrast, is created inside the component (via `this.state` in a class or `useState` in a function), is mutable through its setter, and a change to it tells React to re-render that component so the output reflects the new value.\n\nIn practice this split prevents a whole class of bugs. If a child tries to write `props.count = 0`, the assignment is invisible to the parent, the next parent render silently overwrites it, and React's dev-mode warning flags the mutation. If a developer assumes state is automatically visible to a sibling, the sibling keeps rendering its stale value until the parent lifts the state up or a context provider supplies it.\n\nOne nuance an interviewer will probe: `props` are a plain JavaScript object, so the language does not freeze them. The read-only guarantee is a React convention enforced by reconciliation and tooling, not by `Object.freeze`. Likewise, the `useState` setter is referentially stable across renders, so you can safely pass it to callbacks or effects without re-subscribing.",
    interviewLine: "Props are the parent's configuration for a child \u2014 the child reads them and never reassigns them. State is the component's own memory; when I call the `useState` setter or `setState`, React schedules a re-render so the DOM reflects the new value.",
    misconception: "Treating props and state as interchangeable data bags and missing the ownership boundary: props belong to the parent and flow down read-only, while state belongs to the component and is the only thing that can change its own output in place.",
    hints: [
      "Ask who owns the value and who is allowed to change it.",
      "What happens to the component's rendered output when each one changes?",
      "Props arrive from outside the component; state is created and updated from inside it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `label` and `count` arrive as read-only props from the parent, while `dismissed` is local state the component controls to change its own output.",
      language: "tsx",
      code: "function Badge({ label, count }: { label: string; count: number }) {\n  const [dismissed, setDismissed] = useState(false);\n\n  if (dismissed) return null;\n\n  return (\n    <span>\n      {label}: {count} \n      <button onClick={() => setDismissed(true)}>\u00d7</button>\n    </span>\n  );\n}"
    }
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
        text: "Client-side effects in JavaScript and server-side effects in HTML comments.",
        isCorrect: false,
        explanation: "This splits effects by execution environment and treats HTML comments as a side-effect mechanism. Side effects in React are JavaScript operations\u2014DOM mutations, network calls, subscriptions\u2014that run in the browser after render; HTML comments are inert markup and cannot execute code or subscribe to anything."
      },
      {
        id: "B",
        text: "Positive side effects that improve SEO and negative side effects that crash the server.",
        isCorrect: false,
        explanation: "This frames side effects as a quality judgment (good vs bad) and ties them to SEO or server crashes. A side effect is any interaction with an external system\u2014DOM, network, timers\u2014and whether it helps or hurts is orthogonal to its type; the classification that matters is whether it needs cleanup."
      },
      {
        id: "C",
        text: "Synchronous side effects in `render` and asynchronous side effects in CSS.",
        isCorrect: false,
        explanation: "This places side effects inside the render phase and in CSS. React's render must stay pure; side effects live in `useEffect` or `useLayoutEffect`. CSS is a styling layer, not a place where JavaScript side effects execute."
      },
      {
        id: "D",
        text: "Effects that return a cleanup function versus effects that do not.",
        isCorrect: true,
        explanation: "Correct. The defining question is whether the setup function returns a cleanup function. Effects that subscribe to an external source must return a teardown so React can call it on unmount or before the next setup; effects that merely write a value (a log, a title) leave no handle and need no cleanup."
      }
    ],
    correctAnswer: "D",
    explanation: "The practical split is whether the effect must tear down an external resource. In `useEffect`, the setup function optionally returns a cleanup function. If it does, React stores that function and calls it before the next setup run (when dependencies change) and on unmount. If it returns nothing, the effect is fire-and-forget: the browser is not blocked, no subscription lingers, and React simply moves on.\n\nIn real code this distinction decides whether you leak. A `document.title` update or a `console.log` leaves no handle behind, so no cleanup is needed. A `window.addEventListener`, a `setInterval`, or a WebSocket connection does leave a handle; without the cleanup function, that listener keeps firing or the socket stays open after the component is gone.\n\nThe nuance an interviewer probes next is timing: cleanup does not only fire on unmount. Every time the dependency array changes, React calls the previous cleanup before running the new setup. In concurrent rendering (React 18 and later), an effect can be interrupted and its cleanup run even if the component stays mounted, so the cleanup must be idempotent and fully reversible.",
    interviewLine: "I split side effects by whether the setup function returns a cleanup. A `document.title` write is fire-and-forget; a WebSocket or `setInterval` must return a teardown so React can call it before the next setup and on unmount. I keep the cleanup fully reversible because concurrent rendering can interrupt an effect mid-flight.",
    misconception: "Thinking cleanup only runs on unmount, so a subscription is safe as long as the component does not unmount. In practice, cleanup fires before every re-setup when dependencies change, so omitting it causes duplicate listeners or intervals on every render cycle.",
    hints: [
      "Look at what `useEffect`'s callback can return and what React does with that return value.",
      "Ask: does the effect create a handle to an external resource that outlives the current render?",
      "The distinction is not about sync vs async or client vs server; it is about whether a teardown function is returned."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the title update returns nothing while the EventSource effect returns a function that removes the listener and closes the socket.",
      language: "tsx",
      code: "import { useEffect } from \"react\";\n\nfunction Dashboard({ userId }: { userId: string }) {\n  // Fire-and-forget: no cleanup needed\n  useEffect(() => {\n    document.title = `Dashboard \u2013 ${userId}`;\n  }, [userId]);\n\n  // Subscription: must return cleanup\n  useEffect(() => {\n    const source = new EventSource(`/api/events/${userId}`);\n    const handler = (e: MessageEvent) => console.log(e.data);\n    source.addEventListener(\"message\", handler);\n    return () => {\n      source.removeEventListener(\"message\", handler);\n      source.close();\n    };\n  }, [userId]);\n\n  return <div>Live feed for {userId}</div>;\n}"
    }
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
        explanation: "Correct. useEffect is the dedicated hook for synchronising a component with systems outside React's render tree, and it runs after the DOM has been updated and painted."
      },
      {
        id: "B",
        text: "To execute blocking synchronous database queries before page HTML loads.",
        isCorrect: false,
        explanation: "Tempting if you picture an \"effect\" as pre-load setup work. useEffect runs client-side after the component has rendered; it never blocks HTML delivery, never runs before the page loads, and cannot issue synchronous database calls."
      },
      {
        id: "C",
        text: "To create global CSS stylesheets dynamically inside the GPU buffer.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word \"effect\" with GPU compositing. useEffect executes plain JavaScript on the main thread; it has no role in CSS generation or GPU buffer management."
      },
      {
        id: "D",
        text: "To replace `useState` for storing temporary form input values synchronously.",
        isCorrect: false,
        explanation: "Tempting if you think any hook can hold a value. `useState` is the state container that React reads and writes synchronously during render; `useEffect` is for actions that reach outside React, not for storing form input."
      }
    ],
    correctAnswer: "A",
    explanation: "useEffect lets a functional component run a side effect after React has committed the DOM update and the browser has painted. During render, React calls your component function to compute the UI; the callback you pass to useEffect is not executed there. React stores it and invokes it after paint, so any DOM mutation, network call, or subscription you set up inside it happens once the screen is up to date.\n\nIn the example, `document.title = ...` is a side effect: it mutates a property on the global `document` object, which lives outside React's virtual DOM. If you wrote that assignment directly in the render body, it would run on every render, during server-side rendering, and during React's reconciliation passes, all of which would be wrong. Wrapping it in `useEffect` with `[name]` as the dependency means it fires only after mount and after `name` actually changes.\n\nThe nuance an interviewer will probe: `useEffect` is asynchronous relative to paint, so the user may briefly see stale DOM state. If you need the side effect to apply before the browser paints, use `useLayoutEffect` instead. Also, the cleanup function you return from the effect runs before the next effect invocation and on unmount, which is how you avoid duplicate subscriptions or leaked timers.",
    interviewLine: "I use useEffect to synchronise my component with external systems like the DOM, an API, or a subscription, and I always pass a dependency array so it only re-runs when the relevant value changes, plus a cleanup function to tear down whatever it set up.",
    misconception: "Treating useEffect as a general-purpose \"run arbitrary code\" hook or a state container, rather than a mechanism specifically for synchronising with systems outside React (DOM, network, timers) after the render commit.",
    hints: [
      "Look at what the callback does: it writes to `document.title`, which lives outside React's render tree.",
      "Ask yourself: can this line of code run during render without causing a problem? If it mutates something external, it belongs in an effect.",
      "The dependency array `[name]` means the effect re-runs only when `name` changes, not on every render."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useEffect",
    example: {
      caption: "Notice the cleanup function returned from the effect: it clears the interval so a stale timer does not keep firing after the component unmounts or the effect re-runs.",
      language: "jsx",
      code: "import { useEffect, useState } from 'react';\n\nfunction LiveClock() {\n  const [time, setTime] = useState('');\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setTime(new Date().toLocaleTimeString());\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <span>{time}</span>;\n}"
    }
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
        explanation: "Tempting if you equate 're-render' with 'browser repaint,' but React's rendering model lives inside JavaScript. Disabling it stops the application from running at all, not just from re-rendering."
      },
      {
        id: "B",
        text: "Wrap the entire application in a single giant monolithic component that never splits.",
        isCorrect: false,
        explanation: "Appeals to the idea that fewer components means fewer re-renders, but a single component re-renders its entire subtree whenever any one piece of its state changes, so you lose the ability to skip work in parts that did not change."
      },
      {
        id: "C",
        text: "Stabilize component inputs so React's shallow comparison can skip re-renders",
        isCorrect: true,
        explanation: "Correct. This describes the core mechanism: keeping prop references stable (via memo, useCallback, or state collocation) lets React skip rendering components whose inputs have not changed."
      },
      {
        id: "D",
        text: "Mutate state directly without calling `setState` or dispatching actions.",
        isCorrect: false,
        explanation: "Skipping setState does stop the re-render, but the component will keep showing stale values on every subsequent render because React never learns the data changed, breaking the reactive contract the rest of the tree depends on."
      }
    ],
    correctAnswer: "C",
    explanation: "React.memo wraps a function component and tells React to skip its re-render when a shallow comparison of the new props matches the previous ones. For class components the equivalent is shouldComponentUpdate. The key word is shallow: React compares each prop with ===, so two objects with identical contents but different references are treated as changed.\n\nIn practice this means a parent that re-renders will still cause its memoized child to re-render unless every prop it passes keeps the same reference. That is why useMemo and useCallback exist: they let you compute an array, object, or function once and hand the same reference to the child on every render. Without them, React.memo becomes a no-op the moment the parent passes an inline object, array, or arrow function.\n\nThe broader strategy an interviewer will probe is state placement and context splitting. If a component reads state that lives three levels up, it re-renders every time that state changes even if the value it displays did not. Colocating state next to the component that uses it, and splitting a large context into smaller ones, reduces the set of components React must re-render in the first place, so memoization has fewer unnecessary renders to skip.",
    interviewLine: "React.memo does a shallow prop comparison to let React skip rendering a component, but it only works when the parent passes referentially stable props, so I pair it with useMemo and useCallback, and I keep state as low in the tree as possible so fewer components re-render in the first place.",
    misconception: "Treating 'prevent re-renders' as a global switch to stop React from rendering, rather than a per-component optimization where React skips a specific component because its inputs are referentially unchanged.",
    hints: [
      "Think about what causes a child component to re-render when its parent re-renders.",
      "A memoized component still re-renders if any prop changes reference; ask yourself what keeps props stable across renders.",
      "Preventing re-renders is not about stopping rendering globally; it is about making React skip specific components whose inputs are unchanged."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Clicking the button changes count and re-renders App, but Sidebar skips its render because items and handleSelect keep the same reference across renders.",
      language: "tsx",
      code: "import { memo, useCallback, useMemo, useState } from \"react\";\n\nconst Sidebar = memo(function Sidebar({ items, onSelect }: { items: string[]; onSelect: (id: string) => void }) {\n  console.log(\"Sidebar rendered\");\n  return <ul>{items.map((item) => <li key={item} onClick={() => onSelect(item)}>{item}</li>)}</ul>;\n});\n\nexport function App() {\n  const [query, setQuery] = useState(\"\");\n  const [count, setCount] = useState(0);\n  const items = useMemo(() => [\"alpha\", \"beta\", \"gamma\"].filter((i) => i.includes(query)), [query]);\n  const handleSelect = useCallback((id: string) => console.log(\"picked\", id), []);\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>\n      <Sidebar items={items} onSelect={handleSelect} />\n    </div>\n  );\n}"
    }
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
        text: "Store all application state in a single synchronous global loop, forcing every subscribed component to re-render on each tick to guarantee a consistent snapshot.",
        isCorrect: false,
        explanation: "Tempting if you equate \"one source of truth\" with performance, but a single synchronous loop that forces every component to re-render on each tick is the opposite of React's model: it discards the per-component render boundary that makes memoization and selective updates possible."
      },
      {
        id: "B",
        text: "Disable all browser caching and CDN edge caches so every user interaction triggers a full bundle re-fetch from the origin, ensuring always-fresh code.",
        isCorrect: false,
        explanation: "Appeals to the intuition that fresh data is always safer, but disabling caching turns every navigation into a full network round-trip, adding hundreds of milliseconds of latency and defeating the entire purpose of bundling and code-splitting."
      },
      {
        id: "C",
        text: "Render all 100,000 list items in the DOM simultaneously on initial load, forgoing pagination or virtualization to guarantee zero layout shift.",
        isCorrect: false,
        explanation: "Sounds like a completeness argument, but 100,000 live DOM nodes exhaust memory, force the browser into multi-second layout and paint passes, and make scrolling janky; virtualization solves the same perceived-completeness goal with a constant DOM size."
      },
      {
        id: "D",
        text: "Use `useMemo` and `useCallback` to cache expensive computations and callbacks, `React.memo` for pure components, list virtualization for large datasets, and `React.lazy` for code splitting.",
        isCorrect: true,
        explanation: "Correct. Each technique addresses a distinct bottleneck: CPU work per render, unnecessary child re-renders, DOM node count, and initial bundle size."
      }
    ],
    correctAnswer: "D",
    explanation: "Each technique in the answer targets a different cost. `useMemo` caches a computed value so it recalculates only when its dependency array changes; `useCallback` does the same for a function reference, which matters when that callback is passed as a prop. `React.memo` adds a shallow prop comparison so React skips re-rendering a component when its props are unchanged. List virtualization keeps only the visible slice of a large list in the DOM. `React.lazy` with `Suspense` splits the bundle so a route's code loads on demand rather than blocking initial paint.\n\nIn a 50,000-row table with a search box, virtualization means each keystroke re-renders roughly 20 rows instead of 50,000, and `useMemo` stops the `filter` + `sort` from re-running on unrelated parent state changes. Without these, every keystroke triggers a full re-render of every row and the browser burns its frame budget on layout and paint instead of responding to input.\n\nThe nuance: `useMemo` is not free. React compares the dependency array and allocates the cached value on every render, so memoizing a trivial expression adds cost without benefit. `React.memo` only helps when props are referentially stable; if a parent passes a fresh object literal each render, the shallow compare fails and the child re-renders anyway, making the wrapper pure overhead.",
    interviewLine: "I separate the bottleneck first: if it is CPU I memoize the computation with `useMemo` or stabilize the callback with `useCallback`; if it is DOM I virtualize the list; if it is initial load I code-split with `React.lazy`. Each technique removes a specific cost rather than adding a blanket rule.",
    misconception: "Performance optimization is a single lever (memoize everything, or make the DOM bigger, or kill caching) rather than a set of targeted tools, each addressing a different cost: CPU, DOM, or network.",
    hints: [
      "Identify where the cost actually lives: CPU work per render, DOM node count, or bytes downloaded before first paint.",
      "Which React APIs let you skip a re-render, cache a computation, render fewer DOM nodes, or defer loading a chunk?",
      "The correct answer names one technique for each of those four costs; the wrong options each describe doing the opposite of what helps."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useMemo` scopes the filter to only re-run when `rows` or `query` change, `React.memo` skips re-rendering each `Row` when its props are unchanged, and the slice stands in for a virtualization library that keeps DOM nodes constant regardless of list length.",
      language: "tsx",
      code: "import { memo, useMemo } from \"react\";\n\ntype Row = { id: number; name: string; score: number };\n\nconst Row = memo(function Row({ name, score }: Row) {\n  return <tr><td>{name}</td><td>{score}</td></tr>;\n});\n\nexport function Leaderboard({ rows, query }: { rows: Row[]; query: string }) {\n  const filtered = useMemo(\n    () => rows.filter(r => r.name.toLowerCase().includes(query.toLowerCase())),\n    [rows, query]\n  );\n  // In production, react-window or react-virtuoso renders ~20 rows here\n  // regardless of whether `filtered` has 10 or 100,000 entries.\n  return (\n    <table>\n      <tbody>\n        {filtered.slice(0, 20).map(r => <Row key={r.id} {...r} />)}\n      </tbody>\n    </table>\n  );\n}"
    }
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
        explanation: "The \"every millisecond\" framing is the tell. V8 creates a function in a few nanoseconds, and hooks are called once per render, not on a timer. No benchmark in React's own test suite shows hooks losing to classes on raw execution speed."
      },
      {
        id: "B",
        text: "Hooks avoid class instance creation overhead, minimize HOC nesting wrapper hell, and enable fine-grained custom hook composition for optimized bundle sizes and execution.",
        isCorrect: true,
        explanation: "Correct. Hooks skip the `new` allocation and `this` binding that class components require, eliminate the extra render passes that HOC wrappers add to the fiber tree, and minify more aggressively than named class methods on a prototype."
      },
      {
        id: "C",
        text: "There is no difference because the compiler converts all hooks into class components at build time.",
        isCorrect: false,
        explanation: "Tempting if you equate Babel transpilation with a full rewrite, but React's reconciler maintains two distinct mount paths: `mountClassComponent` and `mountIndeterminateComponent`. No build step rewrites one into the other."
      },
      {
        id: "D",
        text: "Classes have lower memory usage because all instances share a single mutable global variable.",
        isCorrect: false,
        explanation: "Each class component instance allocates its own object with individual method references and its own `state`. There is no shared global; if there were, mutating state in one instance would corrupt every other instance on the page."
      }
    ],
    correctAnswer: "B",
    explanation: "B is correct. A class component requires the runtime to call `new`, allocate an object, bind every method to `this`, and store state on that instance. A function component with hooks is just a function call: React invokes it, reads the hook slots from the fiber, and moves on. No object allocation, no `this` binding.\n\nThe second part matters in a real codebase. Wrapping a component in three HOCs adds three extra nodes to the fiber tree, each with its own render pass and reconciliation. Replacing those wrappers with custom hooks (`useAuth`, `useTheme`, `useRouter`) keeps the tree flat: the logic runs inside the one component that needs it, and the extracted functions minify to single characters because they are standalone, not named properties on a prototype.\n\nThe per-component delta is small. The difference compounds when a screen nests five HOCs or a class hierarchy of four levels. The bigger structural win is composition: you can call `useAuth()` in any component without wrapping it, pass its return value into another hook's arguments, or branch on it in a render expression. An HOC forces a fixed parent-child relationship in the tree and passes data down through props, which makes reordering or combining wrappers awkward.",
    interviewLine: "I'd note that hooks are plain function calls, so there is no `new` allocation or `this` binding per component, and extracting logic into a custom hook does not add a wrapper node to the tree the way an HOC does. The per-component delta is tiny, but it compounds across a deep HOC stack, and I find the minification win measurable in final bundle size.",
    misconception: "The assumption that hooks are slower because they are \"just functions\" flips the cost model: the extra allocation, `this` binding, and HOC wrapper nodes belong to the class side, not the hook side.",
    hints: [
      "What does React actually allocate in memory when it mounts a class component versus a function component?",
      "How many extra render passes does an HOC add to the fiber tree compared to calling a custom hook inside the component?",
      "The \"100x slower\" and \"compiler converts\" claims are easy to eliminate; focus on what the runtime does differently for each component type."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice that the HOC inserts `AuthWrapper` as an extra node in the tree, while `useAuth` is just a function call inside `Dashboard` with no additional render pass.",
      language: "tsx",
      code: "function withAuth(Component: React.ComponentType) {\n  return function AuthWrapper(props: object) {\n    const user = useAuth();\n    return <Component {...props} user={user} />;\n  };\n}\n\nfunction useAuth() {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => {\n    fetch(\"/api/me\").then((r) => r.json()).then(setUser);\n  }, []);\n  return user;\n}\n\nfunction Dashboard() {\n  const user = useAuth(); // no wrapper node in the tree\n  return <div>{user?.name ?? \"Loading\u2026\"}</div>;\n}"
    }
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
        explanation: "Tempting if you conflate 'server' with 'any background thread,' but a Web Worker still runs inside the browser's process. SSR requires a backend runtime (Node.js, an Edge runtime, or similar) that executes your components and returns an HTML document over HTTP."
      },
      {
        id: "B",
        text: "SSR generates full HTML on the server per request so users and search engines see content immediately, followed by client hydration; CSR downloads an empty HTML shell and renders UI in browser JS.",
        isCorrect: true,
        explanation: "Correct. The server serialises the component tree into HTML, the browser paints it before any script executes, and hydration then makes it interactive; CSR defers all DOM construction to client-side JavaScript."
      },
      {
        id: "C",
        text: "SSR cannot attach click event listeners or support user interactivity.",
        isCorrect: false,
        explanation: "Tempting if you equate 'server-rendered' with 'server-managed forever.' The server only produces the initial HTML; once the browser hydrates, all event listeners and state updates run on the client exactly as they would in a CSR app."
      },
      {
        id: "D",
        text: "CSR produces faster initial HTML load times on slow 2G mobile networks than SSR.",
        isCorrect: false,
        explanation: "Tempting if you assume 'less server work' means 'faster for the user,' but CSR forces the browser to download and execute the full JS bundle before rendering a single element, which is precisely the worst-case scenario on a slow connection."
      }
    ],
    correctAnswer: "B",
    explanation: "SSR (server-side rendering) means the server runs your React components and serialises the result into a complete HTML document for each incoming request. The browser receives that document, paints the content immediately, and only then does React hydrate the DOM: it attaches event listeners, restores component state, and makes the page interactive. The user never sees a blank screen waiting for JavaScript.\n\nCSR (client-side rendering) inverts this. The server sends a minimal HTML shell \u2014 typically just a <div id=\"root\"> tag and <script> tags pointing to your JS bundles. The browser must download, parse, and execute that JavaScript before it can build a single DOM node. On a slow 2G connection or a low-end phone, the user stares at an empty page for seconds.\n\nThe trade-off an interviewer will probe: SSR shifts per-request work onto the server (higher CPU, more infra cost) but buys faster First Contentful Paint and gives search-engine crawlers readable HTML without executing JS. Hydration is the bridge \u2014 if the server-rendered markup and the client's first render disagree, React logs a hydration mismatch error in development and recovers by re-rendering on the client, so both sides must produce identical HTML.",
    interviewLine: "SSR serialises my component tree to HTML on the server per request, so the browser paints content before any JavaScript runs; hydration then attaches listeners and state on the client. CSR does the opposite: it ships an empty shell and the user waits for the JS bundle to execute before seeing anything.",
    misconception: "Thinking that because the server renders the HTML, it also keeps managing the page's interactivity, so the client never needs to execute JavaScript or attach event listeners.",
    hints: [
      "Think about what the browser receives over the wire before any JavaScript executes.",
      "Which approach lets the browser paint visible content without first downloading and running a JS bundle?",
      "The server-rendered HTML is static until hydration; the client still owns all interactivity after that point."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering",
    example: {
      caption: "The server serialises this tree to HTML and ships it; the browser paints it before JavaScript loads, then hydration wires up the onClick handler.",
      language: "tsx",
      code: "// app/page.tsx \u2014 Next.js App Router\nexport default function Page() {\n  return (\n    <main>\n      <h1>StrictMode</h1>\n      <p>Visible in the initial HTML response, before any script runs.</p>\n      <button onClick={() => alert(\"hydrated\")}>Click me</button>\n    </main>\n  );\n}"
    }
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
        explanation: "Tempting only if you confuse React's built-in APIs with third-party state libraries. `createContext` and `useContext` ship in the `react` package itself; no extra install is needed."
      },
      {
        id: "B",
        text: "Context eliminates prop drilling, but every consumer re-renders when the value changes unless you split or memoize.",
        isCorrect: true,
        explanation: "Correct. `useContext` subscribes a component to a context; when the Provider's value changes referentially, React re-renders every subscriber in the same commit, so splitting contexts and memoizing values is how you keep the blast radius small."
      },
      {
        id: "C",
        text: "Context API prevents all child components from ever re-rendering under any circumstances.",
        isCorrect: false,
        explanation: "This inverts what Context actually does. It is a data-passing mechanism, not a rendering gate; consuming components re-render more, not less, when the value they subscribe to changes."
      },
      {
        id: "D",
        text: "Context values can only be read by class components using `this.contextTypes`.",
        isCorrect: false,
        explanation: "Mixes up the legacy `childContextTypes`/`contextTypes` pattern with the current API. Functional components read context with `useContext`, and class components use the static `contextType` property; neither is restricted to the other."
      }
    ],
    correctAnswer: "B",
    explanation: "Context lets a component read a value from the nearest Provider above it without threading props through every intermediate level. The mechanism is direct: a component calls `useContext(SomeContext)`, and from that point it is subscribed to that context. When the Provider re-renders with a new value, React compares old and new with `Object.is`; if they differ, every subscribed consumer re-renders in the same commit.\n\nIn real code this makes a single context object that bundles many fields a wide blast radius. Updating one field of a shared settings object re-renders every component that reads that context, even ones that only care about a different field. The fix is to split the context into smaller slices and wrap each value in `useMemo` so the reference only changes when the relevant data actually changes.\n\nThe nuance an interviewer will probe next: `React.memo` on a consumer does not stop the re-render if that component itself calls `useContext`, because the context subscription bypasses the memo comparison. You must either split the context, move the `useContext` call into a child that receives the value as a prop, or avoid subscribing in the memoized component entirely.",
    interviewLine: "Context removes the need to thread props through intermediate components, but the trade-off is that every component calling `useContext` re-renders whenever the provided value changes referentially, so I split contexts into small slices and wrap each value in `useMemo` to keep the re-render scope tight.",
    misconception: "Context is treated as a one-way performance win that removes prop drilling with no cost. In reality it trades threading verbosity for a re-rendering obligation: every component that subscribes re-renders whenever the provided value's reference changes.",
    hints: [
      "What happens to a component that calls `useContext` when the Provider above it re-renders with a new value reference?",
      "React compares old and new context values with `Object.is`; if they differ, every subscribed consumer re-renders in the same commit.",
      "Context is a data-passing mechanism, not a rendering gate; it does not prevent re-renders anywhere in the tree."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Both Header and Footer re-render on every toggle because each subscribes to the same context value, even though they display it independently.",
      language: "tsx",
      code: "import { createContext, useContext, useState } from \"react\";\n\nconst ThemeContext = createContext(\"light\");\n\nfunction Header() {\n  const theme = useContext(ThemeContext);\n  console.log(\"Header re-rendered\");\n  return <div>{theme}</div>;\n}\nfunction Footer() {\n  const theme = useContext(ThemeContext);\n  console.log(\"Footer re-rendered\");\n  return <div>{theme}</div>;\n}\nexport default function App() {\n  const [theme, setTheme] = useState(\"light\");\n  return (\n    <ThemeContext.Provider value={theme}>\n      <Header />\n      <Footer />\n      <button onClick={() => setTheme(\"dark\")}>Toggle</button>\n    </ThemeContext.Provider>\n  );\n}"
    }
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
        text: "Delete every React component and rewrite the whole app in static vanilla HTML files, hand-wiring each interaction with manual `document` calls.",
        isCorrect: false,
        explanation: "Tempting if you blame React itself for slowness, but removing the framework loses declarative rendering, state management, and the component model. You would rebuild every interaction in manual DOM manipulation, and the performance problem would simply reappear as uncontrolled reflows and lost state."
      },
      {
        id: "B",
        text: "Apply `useMemo` to every function and arithmetic expression across the app before profiling, assuming more caching always means faster renders.",
        isCorrect: false,
        explanation: "Tempting if you equate memoization with speed, but `useMemo` allocates a new reference and runs a dependency comparison on every render. Sprinkling it across hundreds of trivial expressions adds measurable overhead and makes the code harder to read without fixing any actual bottleneck."
      },
      {
        id: "C",
        text: "Profile first with React DevTools Profiler, then apply `React.memo`, `useMemo`, `useCallback`, state colocation, code splitting, and windowing to verified bottlenecks.",
        isCorrect: true,
        explanation: "Correct. Measurement-driven optimization means the profiler identifies which components render, how long they take, and why, so you target the specific expensive work rather than guessing where to add memoization."
      },
      {
        id: "D",
        text: "Run every React rendering calculation inside `eval()` statements, assuming dynamic code execution is faster than statically evaluated expressions.",
        isCorrect: false,
        explanation: "Tempting if you think dynamic code execution is faster than static evaluation, but `eval()` prevents the JavaScript engine from optimizing the surrounding scope, breaks source-map accuracy, and opens a code-injection vector. No modern React pattern requires it."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct approach is to profile first, then optimize. React DevTools Profiler records which components render, how long each takes, and why they re-render. You apply `React.memo`, `useMemo`, `useCallback`, state colocation, code splitting, and windowing only to the specific bottlenecks the profiler identifies, not to every component by default.\n\nIn practice this means a list of 500 rows where each row is a simple `<div>` does not need `React.memo` on every row component. But a list of 500 rows where each row contains a chart that recomputes SVG paths on every parent state change does. The profiler tells you which case you are in, so you add `useMemo` around the path calculation and `React.memo` around the row, and leave the rest alone.\n\nThe nuance an interviewer probes next: `useMemo` and `useCallback` are not free. They allocate a new reference and compare dependencies with `Object.is` on every render. On a component that renders 60 times per second, that comparison cost can exceed the cost of the recomputation you are trying to avoid. Profile, confirm the bottleneck, then memoize.",
    interviewLine: "I start with the React DevTools Profiler to see which components render and why, then I apply `React.memo`, `useMemo`, or `useCallback` only where the flame graph shows a real cost, because memoization itself has a per-render comparison overhead.",
    misconception: "The default assumption that React re-renders are inherently expensive and that wrapping every computation in `useMemo` or `useCallback` will make the app faster, without ever measuring which renders actually cost time.",
    hints: [
      "Think about the order of operations: what must you know before you can decide which optimization to apply?",
      "Each memoization hook allocates a reference and compares dependencies on every render. Does that cost make sense if the computation it guards is a single addition?",
      "A tool that records which components render, how long each takes, and why they re-render would tell you where to focus."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The `useMemo` guards a filter over 10,000 rows that would otherwise re-run on every keystroke; the `<li>` elements inside are plain and do not need their own memo.",
      language: "tsx",
      code: "import { useMemo, useState } from \"react\";\n\ntype Row = { id: number; label: string; score: number };\n\nfunction Scoreboard({ rows, query }: { rows: Row[]; query: string }) {\n  const filtered = useMemo(\n    () => rows.filter((r) => r.label.toLowerCase().includes(query)),\n    [rows, query]\n  );\n\n  return (\n    <ul>\n      {filtered.map((r) => (\n        <li key={r.id}>\n          {r.label}: {r.score}\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "`React.memo` forces the wrapped component to re-render 60 times per second, synchronised to the browser's animation frame cadence.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"memo\" with an animation loop or requestAnimationFrame, but memo does the opposite: it prevents re-renders. There is no timer, no frame-rate coupling, and no forced cadence anywhere in the implementation."
      },
      {
        id: "B",
        text: "`React.memo` wraps a component to skip re-rendering when incoming props are shallowly equal to previous props, which only works if the parent passes stable references.",
        isCorrect: true,
        explanation: "Correct. React.memo is a higher-order component that performs a shallow Object.is comparison of each prop key; if all values are referentially identical it skips the render, which only pays off when the parent supplies stable references."
      },
      {
        id: "C",
        text: "`React.memo` performs a deep recursive comparison of every nested JSON object in props by default, like `lodash.isEqual`, before deciding to re-render.",
        isCorrect: false,
        explanation: "Tempting if you expect a structural diff like lodash isEqual, but the default comparison is Object.is per top-level key. A nested object with identical contents still produces a new reference each render, so the shallow check fails and the component re-renders. You can pass a custom comparator as the second argument, but that is opt-in, not the default."
      },
      {
        id: "D",
        text: "`React.memo` is a hook you call inside a functional component body to replace `useState` and persist a value across re-renders.",
        isCorrect: false,
        explanation: "Tempting because the name sounds like `useMemo` (which is a hook), but React.memo is a plain function you call outside the component body. It returns a new component; it stores no state and cannot be called conditionally or inside render."
      }
    ],
    correctAnswer: "B",
    explanation: "React.memo is a higher-order component. You wrap a function component with it, and on every render React compares the new props object to the previous one using shallow equality: Object.is on each top-level key. If every value is referentially identical, React skips calling the component function and reuses the last rendered output.\n\nIn a typical list or form, a parent re-renders on every keystroke or state tick. Without memo, every child in that subtree re-renders even when its own props are unchanged. With memo, children whose props truly did not change are skipped, cutting down the number of function calls and DOM diffs.\n\nThe catch an interviewer probes next: shallow means reference equality for objects and functions. If the parent writes `onClick={() => handleClick()}` or `style={{ color: \"red\" }}` inline, a new reference is created each render, Object.is fails, and memo re-renders anyway. That is why the option says \"especially effective when passed stable callbacks/objects\" \u2014 you need useCallback, useMemo, or a hoisted constant for the skip to actually happen.",
    interviewLine: "React.memo does a shallow Object.is comparison of each prop key; if every value is referentially identical to the previous render, React skips calling the component function. That is why I pair it with useCallback or useMemo so the references actually stay stable across renders.",
    misconception: "React.memo is assumed to do a deep or structural comparison of props, so any object with the same contents will \"match.\" In reality the default is Object.is per top-level key, meaning a new object or function reference on every render defeats the memo entirely.",
    hints: [
      "What does React do with a child component when its parent re-renders but the child's props are unchanged?",
      "The comparison is shallow \u2014 what does that mean for a prop whose value is an object or a function literal?",
      "If the parent creates a new inline arrow function or object on every render, does the memo comparison still pass?"
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "The `static` row skips its render on every count change because its props are referentially identical; the `count` row re-renders because `value` is a new number.",
      language: "tsx",
      code: "import { memo, useCallback, useState } from \"react\";\n\nconst Row = memo(function Row({ label, value }: { label: string; value: number }) {\n  console.log(\"Row rendered\");\n  return <li>{label}: {value}</li>;\n});\n\nexport function App() {\n  const [count, setCount] = useState(0);\n  const increment = useCallback(() => setCount(c => c + 1), []);\n\n  return (\n    <div>\n      <button onClick={increment}>+1</button>\n      <ul>\n        <Row label=\"count\" value={count} />\n        <Row label=\"static\" value={42} />\n      </ul>\n    </div>\n  );\n}"
    }
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
        explanation: "Correct. `useCallback` and `useMemo` each return the same reference when their dependency array is unchanged, which is exactly the referential stability that `React.memo`'s `Object.is` shallow comparison needs to skip a child's re-render."
      },
      {
        id: "B",
        text: "Both hooks permanently cache their computed values in `localStorage` so that a page reload restores the previous result without re-running the factory function.",
        isCorrect: false,
        explanation: "Tempting if you equate the word \"cache\" with browser storage. Both hooks store their value in a React-internal ref that lives and dies with the component instance; nothing is written to `localStorage`, `sessionStorage`, or any other persistent store."
      },
      {
        id: "C",
        text: "`useCallback` offloads function execution to a Web Worker thread while `useMemo` delegates computation to the GPU compute pipeline for parallel processing.",
        isCorrect: false,
        explanation: "Tempting if you hear \"use\" and picture Web Workers or hardware acceleration. Both hooks run their factory functions synchronously on the main thread during the render phase; there is no threading or GPU involvement."
      },
      {
        id: "D",
        text: "`useMemo` intercepts the network layer and reuses cached HTTP responses so that repeated renders skip the request entirely and download nothing over the wire.",
        isCorrect: false,
        explanation: "Tempting if you associate \"memo\" with \"speed up.\" `useMemo` avoids re-running a JavaScript computation in memory; it has no influence on the network stack, DNS resolution, or HTTP transfer time."
      }
    ],
    correctAnswer: "A",
    explanation: "`useCallback(fn, deps)` returns the same function reference on every render as long as `deps` is unchanged; `useMemo(fn, deps)` does the same for an object or array. `React.memo` decides whether to re-render a child by running `Object.is` on each prop. A new reference fails that check, so the child re-renders even if the prop's contents are identical.\n\nWithout memoization, writing `onClick={() => save()}` inline creates a brand-new function on every parent render. A `React.memo`-wrapped child sees that as a prop change and re-renders, undoing the very optimization `React.memo` was meant to provide. Wrapping the callback in `useCallback` (or the object in `useMemo`) keeps the reference stable, so the shallow comparison passes and the child skips its render.\n\nThe dependency array is the real lever. If a dependency is itself an unstable value\u2014say an object literal passed inline\u2014the memo returns a new reference anyway and you gain nothing. And `useMemo` is not a free performance win: React must store the previous value and compare dependencies on every render, so for a trivial computation the overhead can exceed the cost of recomputing.",
    interviewLine: "I use `useCallback` and `useMemo` to keep a prop's reference stable across renders so that `React.memo`'s shallow `Object.is` check can skip the child's re-render; the critical detail is that every entry in the dependency array must itself be referentially stable, otherwise the memo is defeated and you pay the comparison cost for nothing.",
    misconception: "Treating `useCallback` and `useMemo` as general performance accelerators rather than as referential-stability tools whose sole job is to keep a value's identity the same so a shallow comparison (like `React.memo`'s `Object.is` check) can short-circuit a re-render.",
    hints: [
      "Think about what `React.memo` actually compares when deciding whether a child needs to re-render.",
      "What does an inline arrow function or object literal produce on every render, and how does that interact with a shallow equality check?",
      "The hooks do not make computation faster by themselves; they make a reference stay the same, which is a different question."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo",
    example: {
      caption: "Notice that `handleEdit` keeps the same reference across renders, so `Row`'s `memo` wrapper sees no prop change and skips re-rendering even though the parent's `count` changed.",
      language: "tsx",
      code: "import { memo, useCallback, useState } from \"react\";\n\nconst Row = memo(({ label, onEdit }: { label: string; onEdit: () => void }) => {\n  console.log(\"Row rendered\");\n  return <button onClick={onEdit}>{label}</button>;\n});\n\nexport default function List() {\n  const [count, setCount] = useState(0);\n  const handleEdit = useCallback(() => console.log(\"edit\"), []);\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>tick</button>\n      <Row label=\"Item\" onEdit={handleEdit} />\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you equate fewer network requests with faster loads, but synchronous `<script>` tags in `<head>` block HTML parsing, delay First Contentful Paint, and defeat the entire purpose of splitting code into smaller, on-demand chunks."
      },
      {
        id: "B",
        text: "Bundle all application images, fonts, and npm libraries into a single 50 MB `main.js` file.",
        isCorrect: false,
        explanation: "A single monolithic bundle forces the browser to download, parse, and execute every byte before any component can mount, which is exactly the problem code splitting is designed to solve. Images and fonts also belong in separate asset files with their own cache policies, not inside a JavaScript bundle."
      },
      {
        id: "C",
        text: "Split code by compiling every individual JSX element into a separate WebAssembly file.",
        isCorrect: false,
        explanation: "Code splitting operates at module and route boundaries, not at the granularity of individual JSX tags, and WebAssembly is a separate compilation target unrelated to standard JavaScript bundling. Splitting per element would create thousands of tiny requests and destroy cache efficiency."
      },
      {
        id: "D",
        text: "Use dynamic `import()`, `React.lazy()`, and `<Suspense>` to split bundles and load code on demand.",
        isCorrect: true,
        explanation: "Correct. Dynamic `import()` produces a separate chunk file at build time; `React.lazy` defers evaluation until render; and `<Suspense>` shows a fallback while the chunk is in flight, so the initial payload contains only what is needed for first paint."
      }
    ],
    correctAnswer: "D",
    explanation: "D is correct. A dynamic `import()` call tells the bundler (Turbopack, Vite, Webpack) to emit that module as a separate chunk file instead of inlining it into the main bundle. `React.lazy` wraps that dynamic import so the component is not evaluated until it is actually rendered. `<Suspense>` catches the pending state and renders a fallback until the chunk finishes downloading and the module evaluates.\n\nIn a Next.js App Router project, each route under `app/` already gets its own chunk automatically. The real win from `React.lazy` comes inside a route: a 300 KB chart library or a 50 KB rich-text editor no longer ships in the initial JavaScript payload. The browser downloads fewer kilobytes before first paint, so First Contentful Paint and Time to Interactive improve, especially on mobile networks.\n\nTwo nuances an interviewer will probe. First, `React.lazy` requires the module to have a default export; a named-only export will throw at runtime. Second, the chunk still must download before the component renders, so on a slow connection the `<Suspense>` fallback is visible for longer. Preloading the chunk with a `link rel=\"modulepreload\"` or triggering the `import()` on hover can hide that delay.",
    interviewLine: "I rely on dynamic `import()` with `React.lazy` to keep heavy components out of the initial bundle, and I pair it with `<Suspense>` so the user sees a fallback instead of a blank screen while the chunk is downloading.",
    misconception: "Code splitting is a manual, all-or-nothing decision you make once for the whole app, rather than a per-module or per-route mechanism the bundler applies automatically at each dynamic `import()` boundary.",
    hints: [
      "Think about what the bundler does differently when it sees `import()` versus a static `import` at the top of a file.",
      "What happens to the JavaScript payload the browser must download and parse before the first component can mount?",
      "Code splitting works at module and route boundaries, not at the level of individual JSX tags or elements."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Notice how `React.lazy` defers the `HeavyChart` module until the component actually renders, while `<Suspense>` keeps the rest of the dashboard interactive in the meantime.",
      language: "tsx",
      code: "\"use client\";\n\nimport { lazy, Suspense } from \"react\";\n\nconst HeavyChart = lazy(() => import(\"./HeavyChart\"));\n\nexport function Dashboard() {\n  return (\n    <main>\n      <h1>Analytics</h1>\n      <Suspense fallback={<p>Loading chart\u2026</p>}>\n        <HeavyChart />\n      </Suspense>\n    </main>\n  );\n}"
    }
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
        text: "Convert the list into a static, non-scrollable JPEG image.",
        isCorrect: false,
        explanation: "Tempting if you read 'reduce rendering cost' as 'render nothing at all,' but a flat image destroys text selection, keyboard navigation, screen-reader access, and every interactive control inside the list."
      },
      {
        id: "B",
        text: "Render only the items currently visible in the scroll viewport plus a small buffer, reusing DOM nodes as the user scrolls.",
        isCorrect: true,
        explanation: "Correct. This is list virtualization: the DOM holds a fixed number of nodes (often 20 to 30) regardless of dataset size, and those nodes are repositioned and repopulated on each scroll update, keeping memory and paint cost constant."
      },
      {
        id: "C",
        text: "Render all 50,000 DOM elements upfront and hide off-screen items with `opacity: 0`.",
        isCorrect: false,
        explanation: "Tempting because `opacity: 0` looks like 'not visible,' but the browser still computes layout, paints, and stores every node in the render tree and memory. You get none of the savings that come from removing nodes from the DOM."
      },
      {
        id: "D",
        text: "Fetch the full list from the server on every 1 px scroll event.",
        isCorrect: false,
        explanation: "Confuses virtualization with data fetching. The dataset is already in memory; the bottleneck is DOM node count, not network round-trips. Firing a request per scroll tick would also flood the connection and exceed rate limits."
      }
    ],
    correctAnswer: "B",
    explanation: "Virtualization keeps the DOM to a fixed, small number of nodes no matter how large the dataset is. A library like react-window or @tanstack/virtual reads the scroll offset and the item height, calculates which indices fall inside the viewport plus an overscan buffer of a few items above and below, and renders only those. As the user scrolls, the same DOM nodes are repositioned and their content swapped out, so the node count stays constant.\n\nWithout virtualization, a list of 50,000 items means 50,000 elements in the DOM tree. The browser must lay out, paint, and hold every one of them in memory, which makes scrolling janky and can crash mobile browsers. With virtualization you might render 20 to 30 nodes at any moment, keeping layout and paint work trivial and scrolling at 60 fps.\n\nTwo practical caveats: virtualization assumes you can compute an item's position from its index, so variable-height items need measurement or estimation, and it solves the DOM-node bottleneck specifically. If the real cost is expensive per-item computation or a slow network call, virtualizing the list will not help. Profile with React DevTools Profiler before reaching for a virtualization library.",
    interviewLine: "I'd cap the DOM at a fixed node count, say 20 to 30, by computing which indices are in the viewport from the scroll offset and item height, then reusing those nodes as the user scrolls, so memory and paint cost stay constant whether the list has a hundred or a hundred-thousand items.",
    misconception: "Thinking the bottleneck of a long list is data loading or CSS visibility, when the real cost is the number of DOM nodes the browser must lay out, paint, and keep in memory.",
    hints: [
      "What does the browser have to do for each DOM node during layout and paint, even if it is off-screen?",
      "If you render only 20 of 50,000 items, what two numbers let you decide which 20?",
      "Hiding an element with CSS still leaves it in the layout tree and in memory."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice how only a slice of the array is mapped into JSX, and a single spacer div reserves the full scroll height so the scrollbar stays accurate.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction VirtualList({ items, itemHeight = 48 }) {\n  const [scrollTop, setScrollTop] = useState(0);\n  const viewport = 400;\n  const overscan = 3;\n  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);\n  const end = Math.min(items.length, Math.ceil((scrollTop + viewport) / itemHeight) + overscan);\n  const visible = items.slice(start, end);\n  return (\n    <div\n      style={{ height: viewport, overflow: \"auto\" }}\n      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}\n    >\n      <div style={{ height: items.length * itemHeight, position: \"relative\" }}>\n        {visible.map((item, i) => (\n          <div key={start + i} style={{ position: \"absolute\", top: (start + i) * itemHeight, height: itemHeight }}>\n            {item}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}"
    }
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
        text: "React.memo executes on the server during rendering, useMemo executes in the browser main thread, and useCallback offloads its function to a Web Worker.",
        isCorrect: false,
        explanation: "Tempting if you conflate memoization with a specific runtime environment, but all three operate in the same JavaScript runtime during React's render cycle. There is no server, browser, or Worker split among them."
      },
      {
        id: "B",
        text: "useMemo and useCallback can only be called inside class components, while React.memo is reserved exclusively for functional components.",
        isCorrect: false,
        explanation: "This reverses the actual constraint: hooks can only be called inside functional components or custom hooks. Class components have no hook support at all."
      },
      {
        id: "C",
        text: "React.memo is an HOC that memoizes a whole component based on props; useMemo memoizes computed values inside a component; useCallback memoizes function definitions.",
        isCorrect: true,
        explanation: "Correct. React.memo wraps a component and skips its render when props are shallowly equal; useMemo and useCallback stabilize values and function references within a component body."
      },
      {
        id: "D",
        text: "React.memo is deprecated in React 19 and the compiler now replaces every usage of it with an equivalent useMemo call automatically.",
        isCorrect: false,
        explanation: "Tempting if you hear 'memo' and assume one API subsumes the others, but React.memo is still the documented way to memoize a component. useMemo cannot replace it because it has no access to the component's prop comparison."
      }
    ],
    correctAnswer: "C",
    explanation: "`React.memo` is a higher-order component: you wrap a component with it, and React shallow-compares the new props against the previous props before deciding whether to re-render. `useMemo` and `useCallback` are hooks that live inside a component body. `useMemo` caches a computed value so it is not recalculated on every render; `useCallback` caches a function reference so the same identity is passed to children on every render.\n\nThe code in the question shows why they work together. Without `useMemo`, the object `{ name: \"Kamala\" }` is a new reference every render, so `React.memo` sees changed props and re-renders the child. Without `useCallback`, `handleClick` is a new function every render, with the same effect. Stabilising the value or the callback lets `React.memo`'s shallow comparison actually succeed.\n\nAn interviewer will probe the limits: a component that calls `useContext` re-renders whenever that context changes even if its own props are identical, and `React.memo` cannot stop that. The shallow comparison itself also has a cost, so wrapping every child in `React.memo` can slow rendering down rather than speed it up.",
    interviewLine: "I describe React.memo as a wrapper that shallow-compares props and skips the render if they are unchanged, while useMemo and useCallback are hooks inside the component that keep a value or function reference stable across renders \u2014 which is what makes React.memo's comparison actually succeed.",
    misconception: "Treating all three as interchangeable caching tools that do the same thing at different levels. In reality, React.memo operates at the component boundary (compare props, skip or run render), while useMemo and useCallback operate at the value level inside a render and have no say over whether the component re-renders.",
    hints: [
      "Ask yourself where each tool lives: outside the component boundary or inside its body.",
      "What does React.memo compare, and what does it skip when the comparison passes?",
      "All three run in the same JavaScript runtime; none are tied to a specific environment."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo",
    example: {
      caption: "Notice how the first Row re-renders every time Parent renders because the inline object is a new reference, while the second Row is skipped because useMemo keeps the same object identity.",
      language: "tsx",
      code: "import { memo, useMemo } from \"react\";\n\nconst Row = memo(({ label }: { label: { text: string } }) => {\n  console.log(\"Row rendered\");\n  return <span>{label.text}</span>;\n});\n\nfunction Parent() {\n  const stable = useMemo(() => ({ text: \"Hello\" }), []);\n  return (\n    <div>\n      <Row label={{ text: \"Hello\" }} />  {/* new ref each render \u2014 memo fails */}\n      <Row label={stable} />              {/* same ref \u2014 memo succeeds */}\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you confuse a lint warning with a runtime error, but `key={index}` is perfectly valid syntax. React reconciles it without complaint; at most an ESLint rule like `react/no-array-index-key` flags it."
      },
      {
        id: "B",
        text: "It forces all network requests to run synchronously on the main thread.",
        isCorrect: false,
        explanation: "Keys live entirely inside React's reconciliation algorithm. They tell the diff which child maps to which, but they have no influence on the event loop, the network stack, or fetch scheduling."
      },
      {
        id: "C",
        text: "State and DOM nodes can attach to the wrong items when the list is reordered, inserted into, or deleted from.",
        isCorrect: true,
        explanation: "Correct. Because the key is the position, not the item, React reuses the DOM node at that index and carries its state\u2014input values, local state, focus\u2014onto whatever data now occupies that slot."
      },
      {
        id: "D",
        text: "It permanently disables the browser's ability to render CSS animations.",
        isCorrect: false,
        explanation: "Keys are a React-internal bookkeeping value. They never reach the browser's rendering or CSS engines, so animation, transitions, and compositing are unaffected."
      }
    ],
    correctAnswer: "C",
    explanation: "React uses keys to match elements between renders during reconciliation. When the key is the array index, an element's identity is tied to its position in the array rather than to the data it represents. After a reorder, insert, or delete, the same index now points to a different item, so React pairs the existing DOM node and its component state with whatever data now sits at that position.\n\nIn practice this means an input that held the text \"hello\" at index 2 will display \"hello\" even after the list is reordered and index 2 now holds a different record. Local state in child components, in-flight timers, and focus all follow the DOM node, not the data, so they attach to the wrong item.\n\nIf the list is truly static\u2014never reordered, never has items inserted or removed\u2014index keys are harmless because positions never shift. The bug is entirely structural: it appears the moment the array changes shape.",
    interviewLine: "I avoid index keys whenever the list can change shape. A key is an identity claim, so if the index shifts after an insert or reorder, React reuses the DOM node at that position and its state\u2014input values, local state\u2014ends up attached to the wrong record.",
    misconception: "Keys are a performance hint that React can safely ignore. In reality a key is an identity claim: React uses it to decide which DOM node and component state belong to which piece of data, so a wrong key produces wrong state, not just a slower render.",
    hints: [
      "A key tells React which element is which across renders. What happens to that identity when the array is reordered?",
      "After you delete the item at index 0, which DOM node does React think \"belongs\" to the item that shifted into index 0?",
      "The problem is not a syntax or performance issue; it is a state-identity mismatch that only appears when the array changes shape."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    example: {
      caption: "Type a note in Bob's row, remove Alice, and that text now shows in Carol's row because React kept the DOM node at each index and only swapped the label prop.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Row({ label }: { label: string }) {\n  const [note, setNote] = useState(\"\");\n  return (\n    <div>\n      <b>{label}:</b>{\" \"}\n      <input value={note} onChange={(e) => setNote(e.target.value)} />\n    </div>\n  );\n}\nexport function List() {\n  const [items, setItems] = useState([\"Alice\", \"Bob\", \"Carol\"]);\n  const removeFirst = () => setItems((p) => p.slice(1));\n  const addFirst = () => setItems((p) => [`New ${p.length}`, ...p]);\n  return (\n    <div>\n      <button onClick={removeFirst}>Remove first</button>\n      <button onClick={addFirst}>Add to top</button>\n      {items.map((name, i) => (\n        <Row key={i} label={name} />\n      ))}\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting only if you see \"reconciliation\" and think of matching credentials in a security context, but OAuth token exchange and password verification live in the auth layer and have no role in React's render pipeline."
      },
      {
        id: "B",
        text: "The structural diff React runs between the old and new element trees to decide which DOM nodes to patch, insert, or remove.",
        isCorrect: true,
        explanation: "Correct. Reconciliation is the structural diff React runs between two element trees to compute the smallest set of DOM operations, avoiding a full page rebuild on every render."
      },
      {
        id: "C",
        text: "The compilation step where TypeScript files are converted into JavaScript.",
        isCorrect: false,
        explanation: "Transpilation by TypeScript or Babel happens at build time; reconciliation runs at runtime in the browser, after the component has already executed and returned its element tree."
      },
      {
        id: "D",
        text: "A database replication protocol that resolves merge conflicts across distributed SQL nodes.",
        isCorrect: false,
        explanation: "Database reconciliation (conflict resolution in logical replication or CRDTs) is a data-infrastructure concern; React's reconciliation is a UI-update strategy with no database involved."
      }
    ],
    correctAnswer: "B",
    explanation: "Reconciliation is React's runtime algorithm that compares the previous element tree with the new one produced by a render function. For each node it checks the type and key; if either changed, it unmounts the old subtree and mounts a fresh one. If the type and key match, it updates the props in place. The result is a minimal list of insert, remove, and attribute-change operations applied to the real DOM.\n\nWithout reconciliation, every state change would tear down and rebuild the entire page. Because React only touches the nodes that actually changed, incrementing a counter in one component does not re-create its siblings or their DOM nodes. This is why `key` matters in list rendering: it tells reconciliation which item is which when the array reorders.\n\nThe comparison is structural, not a deep value equality check. Two elements with the same type and key but different prop objects are still the same node to reconciliation; React simply patches the changed props. This is why `React.memo` helps: without it, reconciliation still visits the child on every parent render even when its props are referentially equal.",
    interviewLine: "I describe reconciliation as React's runtime structural diff: it walks the old and new element trees in parallel, uses type and key to decide whether a node is the same, and emits only the DOM mutations needed\u2014so a single state change never rebuilds the whole page.",
    misconception: "Treating reconciliation as a one-time build step or a generic \"compare two objects\" utility, rather than React's specific runtime algorithm that runs on every render to decide which DOM nodes to keep, patch, or replace.",
    hints: [
      "Think about what happens between the moment a component returns a new tree of elements and the moment the browser actually paints pixels.",
      "The algorithm compares two trees node-by-node using structural identity (type and key), not deep value equality.",
      "It is not a build-time step and not a general-purpose diffing library; it is specific to React's render pipeline in the browser."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    example: {
      caption: "Notice how changing the key forces reconciliation to treat the Counter as a brand-new node (state resets), while a plain state update lets it patch the existing DOM in place.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>\n        Count: {count}\n      </button>\n      <p>Rendered at {new Date().toLocaleTimeString()}</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  const [id, setId] = useState(1);\n  return (\n    <div>\n      <Counter key={id} />\n      <button onClick={() => setId(id + 1)}>\n        Reset (change key)\n      </button>\n    </div>\n  );\n}"
    }
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
        text: "Shadow DOM was deprecated in a later HTML revision and the Virtual DOM is the official browser standard that replaced it for component encapsulation.",
        isCorrect: false,
        explanation: "Tempting if you associate Shadow DOM with early-2010s experiments, but it is an active W3C specification underpinned by the Web Components Level 1 spec, and no \"HTML6\" standard exists that removed it."
      },
      {
        id: "B",
        text: "Shadow DOM and the Virtual DOM are exact duplicates of the same tree, each running in its own parallel Web Worker to keep rendering off the main thread.",
        isCorrect: false,
        explanation: "This conflates two unrelated mechanisms and adds Web Workers, which neither technology requires. Shadow DOM is a browser rendering-engine feature; the Virtual DOM is a JavaScript data structure maintained by a framework."
      },
      {
        id: "C",
        text: "Shadow DOM is a browser standard for encapsulated DOM and scoped CSS; the Virtual DOM is an in-memory JS tree used to optimize rendering diffs.",
        isCorrect: true,
        explanation: "Correct. Shadow DOM is defined by the W3C Web Components spec and gives native encapsulation; the Virtual DOM is a JavaScript in-memory tree that React (and similar frameworks) diff to compute minimal DOM updates."
      },
      {
        id: "D",
        text: "Shadow DOM is a React-only abstraction, whereas the Virtual DOM is a native browser standard that every modern engine implements directly.",
        isCorrect: false,
        explanation: "This reverses the relationship. Shadow DOM is the native browser standard available in every modern browser; the Virtual DOM is a library-level pattern that React, Vue, and others implement in JavaScript."
      }
    ],
    correctAnswer: "C",
    explanation: "Shadow DOM is a W3C specification (part of Web Components) that attaches a separate, hidden DOM tree to a host element. Its markup and `<style>` rules are isolated from the document, so page-level CSS cannot reach in and the component's CSS cannot leak out. The Virtual DOM is a JavaScript pattern, popularised by React, where the framework keeps an in-memory tree of UI state, diffs it against the previous tree, and issues only the minimal set of real DOM mutations.\n\nIn practice these solve two different jobs. Shadow DOM gives you encapsulation: a `<style>` tag inside the shadow root is invisible to the rest of the page. The Virtual DOM gives you efficient re-rendering: React never calls `appendChild` or `setAttribute` during render; it builds an object tree, compares it to the last one, and batches the small number of real DOM calls needed.\n\nThey are not alternatives and they can coexist. A Web Component can render its internal UI with a virtual-DOM framework, and a React app can mount into a shadow root. The word \"DOM\" in both names refers to the same underlying tree, but each technology touches it for a completely different reason.",
    interviewLine: "I distinguish Shadow DOM as a browser-level encapsulation boundary defined by the Web Components spec from the Virtual DOM, which is an in-memory JavaScript tree that React diffs to compute the minimum set of real DOM mutations. I point out they solve different problems and can even be layered on top of each other.",
    misconception: "Because both names contain the word \"DOM,\" learners assume they are two versions of the same feature, when in fact one is a browser-level encapsulation boundary and the other is a JavaScript rendering-optimisation pattern that never touches the real DOM during its diff phase.",
    hints: [
      "One of the two lives inside the browser's rendering engine; the other lives in a JavaScript library's heap.",
      "Ask yourself: which one gives you scoped CSS for free, and which one gives you efficient re-rendering between state changes?",
      "They are not competitors; a Web Component can internally render its UI with a virtual-DOM framework."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "Notice the `<style>` block inside the shadow root: the page's global CSS cannot override it, and this rule cannot leak out to affect sibling elements.",
      language: "typescript",
      code: "class Greeting extends HTMLElement {\n  connectedCallback() {\n    const root = this.attachShadow({ mode: \"open\" });\n    root.innerHTML = `\n      <style>\n        .name { color: hotpink; font-weight: bold; }\n      </style>\n      <p class=\"name\">Hi, ${this.getAttribute(\"name\") ?? \"world\"}!</p>\n    `;\n  }\n}\ncustomElements.define(\"greeting\", Greeting);\n// In the page: <greeting name=\"Ada\"></greeting>\n// A global rule like p { color: blue; } has no effect inside the shadow root."
    }
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
        explanation: "Tempting if you read \"pure\" as a language or runtime guarantee, but React purity is an optimisation flag on a normal JavaScript component; it has nothing to do with the execution substrate."
      },
      {
        id: "B",
        text: "Components that contain zero props, zero state, and render an empty string.",
        isCorrect: false,
        explanation: "Confuses \"pure\" with \"empty.\" A pure component accepts props, manages state, and returns real markup; the word refers to the render-skip optimisation, not to the absence of data."
      },
      {
        id: "C",
        text: "Components that perform deep recursive comparisons of nested JSON structures.",
        isCorrect: false,
        explanation: "The opposite of what happens. React deliberately avoids deep comparison because it is expensive on large trees; `Object.is` on each top-level key is the entire check."
      },
      {
        id: "D",
        text: "Components that skip re-rendering when props or state are shallowly equal, using `React.PureComponent` or `React.memo`.",
        isCorrect: true,
        explanation: "Correct. `Object.is` on each top-level prop (and state, for `PureComponent`) gates whether the render function is called at all, saving the cost of a full re-render when nothing visible changed."
      }
    ],
    correctAnswer: "D",
    explanation: "A Pure Component is one where React skips calling render when a shallow comparison shows its inputs are unchanged. For class components, extending `React.PureComponent` makes React compare `this.props` and `this.state` key-by-key with `Object.is` before invoking `render`. For function components, wrapping with `React.memo` applies the same shallow check to props. If every top-level key passes, the child's render is skipped entirely and the previous output is reused.\n\nIn real code this matters when a parent re-renders frequently\u2014say a counter button above a long list. If the parent passes a stable reference (a module-level array, a memoised value), the pure child skips work. If the parent creates a new object or array literal on every render, the shallow check fails and the child re-renders anyway, negating the optimisation. This is the interaction that makes `useMemo` and `useCallback` useful alongside `React.memo`.\n\nThe nuance an interviewer will probe: the check is strictly top-level. If a prop is an object whose internal fields mutated but whose reference stayed the same, a pure component will NOT re-render. Conversely, if the reference changed but the contents are identical, it WILL re-render. React 19's React Compiler inserts equivalent memoisation automatically, so manual `React.memo` is increasingly a performance escape hatch rather than a default.",
    interviewLine: "I describe a pure component as one where React compares each top-level prop (and state) with `Object.is` and skips the render call entirely if nothing changed, so the cost is a single pass over keys rather than a full re-render or a deep structural diff.",
    misconception: "The word \"pure\" suggests a deep, exhaustive structural comparison or a special runtime, when it actually means a cheap, top-level `Object.is` check that decides whether `render` is invoked.",
    hints: [
      "Look at what React does between receiving new props and actually calling your render function.",
      "The comparison is shallow: `Object.is` on each top-level key, not a recursive structural diff of nested objects.",
      "\"Pure\" here does not mean \"empty\" or \"written in a different language\"; it refers to the render-skip optimisation gate."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The child component skips re-rendering because the `items` prop reference remains identical across parent renders, even though the parent state changes.",
      language: "tsx",
      code: "import { memo, useState } from \"react\";\n\nconst ExpensiveList = memo(function ExpensiveList({ items }: { items: string[] }) {\n  console.log(\"ExpensiveList rendered\");\n  return <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>;\n});\n\nexport default function Parent() {\n  const [count, setCount] = useState(0);\n  const items = [\"alpha\", \"beta\", \"gamma\"];\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>\n        count: {count}\n      </button>\n      <ExpensiveList items={items} />\n    </div>\n  );\n}"
    }
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
        text: "Caches the return value of the callback so that repeated calls with the same arguments skip re-execution",
        isCorrect: false,
        explanation: "Tempting if you read \"memoize\" as \"cache the result,\" but useCallback stores the function reference, not its output. Caching a computed value across renders is what useMemo does."
      },
      {
        id: "B",
        text: "Memoizes a callback function instance between renders, returning the same reference unless dependencies change; useful when passing callbacks to React.memo children",
        isCorrect: true,
        explanation: "Correct. useCallback retains the prior function reference in internal state and reuses it as long as the dependency array is unchanged, giving referential stability that lets memoized children skip re-rendering."
      },
      {
        id: "C",
        text: "Guarantees the callback body executes exactly once for the component's lifetime, regardless of how many times the parent re-renders",
        isCorrect: false,
        explanation: "Tempting if you read \"memoize\" as \"run once,\" but useCallback still hands you a callable function whose body runs every time the caller invokes it; the hook only stabilises the reference, not the execution count."
      },
      {
        id: "D",
        text: "Captures the initial render's values permanently, so the callback never needs a dependency array to stay correct",
        isCorrect: false,
        explanation: "Tempting if you picture useCallback as freezing a closure, but the dependency array exists precisely to rebuild the closure when those values change; omitting it locks in stale values from the first render."
      }
    ],
    correctAnswer: "B",
    explanation: "useCallback stores a function reference in internal state and returns that same reference on every render as long as the dependency array has not changed. It does not cache the function's output or control when the body executes; it only guarantees referential identity.\n\nIn practice this matters when you pass a callback into a child wrapped in React.memo. An inline arrow function like `() => doThing(a, b)` is a new object every render, so the memo's shallow prop comparison sees a changed value and re-renders the child. Wrapping that logic in `useCallback(fn, [a, b])` means the child receives the same reference across renders where `a` and `b` are unchanged, and the memo holds.\n\nTwo edge cases an interviewer will probe: if you list a dependency that changes every render (an object literal, a `Date.now()` call), the memoization is defeated and you pay the hook's overhead for no benefit. And with the React Compiler in React 19, the compiler can insert equivalent memoization automatically, so manual `useCallback` is increasingly a fallback rather than a default.",
    interviewLine: "useCallback gives me a stable function reference across renders as long as its deps haven't changed, so a React.memo child that receives it as a prop can skip re-rendering; without it, the inline arrow is a new reference every render and the memo is defeated.",
    misconception: "Reading \"memoize\" as \"cache the result\" and conflating useCallback with useMemo, when in fact useCallback caches the function's identity (its reference) and says nothing about the values the function returns.",
    hints: [
      "Ask yourself: what does useCallback store internally \u2014 the function's return value, or the function reference itself?",
      "Think about what React.memo compares when deciding whether to skip a re-render.",
      "If every value in the dependency array is primitive and unchanged, does the caller receive a new function object or the same one?"
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/useCallback",
    example: {
      caption: "Clicking \"tick\" re-renders Table but not Row, because `handleEdit` keeps the same reference; an inline `() => handleEdit(1)` prop would break that.",
      language: "tsx",
      code: "import { memo, useCallback, useState } from \"react\";\n\nconst Row = memo(function Row({ onEdit }: { onEdit: (id: number) => void }) {\n  console.log(\"Row rendered\");\n  return <button onClick={() => onEdit(1)}>Edit</button>;\n});\n\nexport function Table() {\n  const [count, setCount] = useState(0);\n  const handleEdit = useCallback((id: number) => {\n    console.log(\"editing\", id);\n  }, []);\n\n  return (\n    <>\n      <p>{count}</p>\n      <button onClick={() => setCount((c) => c + 1)}>tick</button>\n      <Row onEdit={handleEdit} />\n    </>\n  );\n}"
    }
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
        explanation: "Tempting if you associate hooks with post-mount work, but `useMemo` runs synchronously during render to produce a value. Asynchronous side effects like fetching belong in `useEffect` or a data-fetching layer such as `fetch` in a Server Component."
      },
      {
        id: "B",
        text: "Caches a computed value and re-runs the factory only when a dependency changes referentially.",
        isCorrect: true,
        explanation: "Correct. `useMemo` caches the factory's return value and skips the call on subsequent renders as long as every dependency passes the `Object.is` check, so an unrelated state update does not trigger the computation again."
      },
      {
        id: "C",
        text: "Forces the component to re-render in the background on every millisecond tick.",
        isCorrect: false,
        explanation: "Confuses a memo with a timer. `useMemo` does not schedule any work; it either reuses a previously computed value or runs the factory once during the current render. There is no interval, no background thread, and no forced re-render."
      },
      {
        id: "D",
        text: "Caches data permanently in the user's browser disk cache across browser restarts.",
        isCorrect: false,
        explanation: "Mixes up an in-memory JavaScript variable with browser storage. The cached value lives in a closure-scoped variable for the lifetime of the component instance; it is gone on unmount and never touches `localStorage`, `IndexedDB`, or the HTTP cache."
      }
    ],
    correctAnswer: "B",
    explanation: "`useMemo(() => computeExpensiveValue(a, b), [a, b])` stores the return value of the factory function in a local variable. On the next render, React compares each dependency with `Object.is`; if none changed, it returns the stored value without calling the factory again.\n\nWithout the hook, every parent re-render that passes the same props would re-run `computeExpensiveValue`. A large array sort, a deep object transform, or a regex parse would repeat for no reason. The memo turns that repeated work into a single `Object.is` check per dependency.\n\nTwo caveats an interviewer will probe. First, the comparison is referential: passing a new array or object literal as a dependency every render defeats the memo. Second, `useMemo` is a performance hint, not a correctness guarantee; React may discard the cached value under memory pressure. With the React Compiler, most manual `useMemo` calls become unnecessary because the compiler memoizes derived values automatically.",
    interviewLine: "`useMemo` caches the return value of a factory function between renders; it re-runs only when a dependency fails the `Object.is` check, so I reach for it when a derived value is expensive to compute and the inputs are referentially stable across renders.",
    misconception: "Treating `useMemo` as a side-effect hook or a persistent store: it is a render-phase value computation that skips re-running a function, not something that fetches, schedules, or writes to disk.",
    hints: [
      "Look at the two arguments to `useMemo`: a function and an array of values. What does the function return, and what does the array control?",
      "Ask yourself: on the next render where `a` and `b` have the same references, does the factory run again or is the old value reused?",
      "It is not a side-effect hook, not a timer, and not a browser storage API. It runs synchronously during render and only produces a value."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useMemo",
    example: {
      caption: "Notice how the filter runs only when the `orders` array or the `status` string changes, not on every unrelated state update in the parent.",
      language: "tsx",
      code: "function OrderList({ orders, status }: { orders: Order[]; status: string }) {\n  const filtered = useMemo(\n    () => orders.filter((o) => o.status === status),\n    [orders, status]\n  );\n\n  return (\n    <ul>\n      {filtered.map((o) => (\n        <li key={o.id}>{o.id}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        explanation: "Tempting if you conflate the word \"custom\" in \"custom hook\" with the browser's Custom Elements API, but `customElements.define()` registers a class on a DOM tag. A React hook is a function call inside a component render; it has no DOM registration step and no tag."
      },
      {
        id: "B",
        text: "Declare a global variable on `window` prefixed with `use`.",
        isCorrect: false,
        explanation: "This treats a hook as a module-scope singleton, but each call to a custom hook inside a component creates (or reuses) state bound to that specific component instance. Storing the hook on `window` would share one state object across every component, violating React's per-instance state model."
      },
      {
        id: "C",
        text: "Write a function starting with `use` that calls built-in hooks and returns state/handlers for components to use.",
        isCorrect: true,
        explanation: "Correct. A custom hook is a plain function that obeys the Rules of Hooks by starting with `use`, calling built-in hooks internally, and returning whatever values the consuming component needs. Each call site gets its own state because the built-in hooks inside are tracked per component instance."
      },
      {
        id: "D",
        text: "Create an ES6 class extending `React.CustomHook` and instantiate it with `new`.",
        isCorrect: false,
        explanation: "There is no `React.CustomHook` class. Hooks are plain functions whose state is tracked by call order during render; they are not classes you instantiate, and no `new`-based registration step exists in React."
      }
    ],
    correctAnswer: "C",
    explanation: "A custom hook is a plain JavaScript function whose name starts with `use`. It calls built-in hooks such as `useState` or `useEffect` and returns the state values or handler functions the caller needs. The `use` prefix is not optional decoration: React's linter and the Rules of Hooks treat any function matching that pattern as a hook, which means it must be called unconditionally at the top level of a component or another hook.\n\nIn the example, `useForm` wraps `useState` and a `handleChange` closure. Every component that calls `useForm` gets its own independent `formData` because `useState` is invoked inside the hook and React tracks hook state per component instance. The hook adds no extra render pass and no extra node to the component tree; it is simply a function call that lets you extract and share stateful logic without duplicating the `useState` boilerplate.\n\nThe constraint an interviewer will probe: you cannot call a custom hook conditionally, inside a loop, or inside a nested callback, because React identifies hooks by their position in the call sequence. A custom hook may also call other custom hooks, letting you compose small hooks into larger ones while each still obeys the same ordering rules.",
    interviewLine: "I describe a custom hook as just a function whose name starts with `use`; it calls built-in hooks internally and returns state or handlers, so each component that calls it gets its own isolated state. The `use` prefix is what lets React's linter enforce the Rules of Hooks at every call site.",
    misconception: "A custom hook is a special React primitive (a class, a registered component, or a browser API) rather than a plain function that happens to call other hooks and must follow the Rules of Hooks by name and call position.",
    hints: [
      "Look at `useForm` in the code: what is it syntactically, and what does it call internally?",
      "React enforces a naming convention and a call-order rule on any function that invokes hooks \u2014 what are those two constraints?",
      "It is not a class, not a DOM registration, and not a global; it is a function call that reuses hook state per component instance."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice how `useLocalStorage` composes `useState` with a side effect and returns a tuple, and how `ThemeToggle` consumes it exactly like a built-in hook.",
      language: "tsx",
      code: "function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored !== null ? (JSON.parse(stored) as T) : initial;\n  });\n\n  const set = (v: T) => {\n    setValue(v);\n    localStorage.setItem(key, JSON.stringify(v));\n  };\n\n  return [value, set];\n}\n\nfunction ThemeToggle() {\n  const [theme, setTheme] = useLocalStorage(\"theme\", \"light\");\n  return (\n    <button onClick={() => setTheme(theme === \"light\" ? \"dark\" : \"light\")}>\n      {theme}\n    </button>\n  );\n}"
    }
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
        text: "A mechanism that blocks the browser event loop for a fixed duration while a resource loads.",
        isCorrect: false,
        explanation: "Tempting if you read \"suspend\" as \"freeze the thread,\" but Suspense never blocks the event loop. It is a render-phase swap: the boundary renders a fallback and the main thread stays free to handle input and paint."
      },
      {
        id: "B",
        text: "A utility that pauses CSS animations and transitions while a component is in a loading state.",
        isCorrect: false,
        explanation: "The word \"suspense\" sounds like a CSS `animation-play-state` toggle, but Suspense has no interaction with the CSS animation or transition systems. It only decides which React subtree to render."
      },
      {
        id: "C",
        text: "A security hook that suspends a user session when an authentication check fails.",
        isCorrect: false,
        explanation: "The English meaning of \"suspend\" (to halt an account) makes this read plausibly, but React Suspense has no relationship to authentication, sessions, or any security workflow. It is purely a rendering boundary for async work."
      },
      {
        id: "D",
        text: "A component boundary that renders a fallback while children wait for async code or data to resolve.",
        isCorrect: true,
        explanation: "Correct. Suspense is a boundary component: when a descendant suspends by throwing a Promise, the boundary renders its `fallback` prop, and once the Promise settles React re-renders the subtree with real content."
      }
    ],
    correctAnswer: "D",
    explanation: "React Suspense is a component boundary. When a child or descendant throws a Promise during the render phase, the nearest Suspense boundary catches it and renders its `fallback` prop in place of the subtree. Once that Promise resolves, React re-renders the same subtree with the real content.\n\nIn practice this removes the manual `useState` + `useEffect` loading dance for every async operation. You wrap the component that needs data or a dynamic import in a boundary, declare the fallback once, and the loading UI stays colocated with the component it protects. It works with `React.lazy` for code-splitting and with any data-fetching pattern that suspends by throwing a Promise.\n\nThe word \"suspend\" is a render-phase concept, not a thread-blocking one. The browser event loop is never frozen. Multiple boundaries can nest, each showing its own fallback independently, and in React 19 the `use` hook lets you read a Promise directly inside a component without a separate hook.",
    interviewLine: "I describe Suspense as a component boundary, not a hook. When a child throws a Promise during render, the nearest boundary renders its `fallback` prop, and once that Promise resolves React re-renders the subtree with the resolved content \u2014 the event loop is never blocked.",
    misconception: "Reading \"suspend\" as a thread-blocking or execution-pausing operation, when in reality it is a render-phase signal: a child throws a Promise, the boundary swaps in a fallback, and the browser thread is never held up.",
    hints: [
      "Look at how the code wraps `LazyComponent` in a boundary that has a `fallback` prop and a child.",
      "What does a component do during the render phase to tell React \"I am not ready yet\"?",
      "The word \"suspend\" here describes a render-phase swap, not a blocking wait on the main thread."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Nested boundaries each show their own fallback independently, so the shell can appear before the slower chart resolves.",
      language: "tsx",
      code: "import { lazy, Suspense } from \"react\";\n\nconst Header = lazy(() => import(\"./Header\"));\nconst Chart = lazy(() => import(\"./Chart\"));\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<div>Loading shell\u2026</div>}>\n      <Header />\n      <Suspense fallback={<div>Loading chart\u2026</div>}>\n        <Chart />\n      </Suspense>\n    </Suspense>\n  );\n}"
    }
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
        text: "Splitting JavaScript bundles into smaller chunks loaded on demand via dynamic `import()` and `React.lazy()`, reducing initial download size.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` wraps a dynamic `import()` promise, and the bundler emits a separate chunk file that the browser fetches only when the component first renders."
      },
      {
        id: "B",
        text: "Compressing image assets into ZIP archives before deploying them to the server.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'splitting' with file operations, but code splitting is a bundler-level JavaScript strategy; image compression is a separate asset-optimization concern handled by tools like `sharp` or `next/image`."
      },
      {
        id: "C",
        text: "Decomposing a monolithic backend into multiple Docker microservices for independent scaling.",
        isCorrect: false,
        explanation: "Backend service decomposition is an architecture decision, not a frontend bundling technique. In a React context the term always refers to how the client-side JavaScript is chunked."
      },
      {
        id: "D",
        text: "Breaking a single CSS file into individual line-level rules at build time to improve parsing.",
        isCorrect: false,
        explanation: "CSS is not chunked into line-level fragments. The bundler may emit a separate CSS file per chunk, but the unit of splitting is the JavaScript module, not individual rules."
      }
    ],
    correctAnswer: "A",
    explanation: "Code splitting divides a single large JavaScript bundle into smaller chunks that the browser downloads only when they are needed. In React you trigger a split with a dynamic `import()` call, and `React.lazy` wraps that promise so the component can be rendered declaratively. `Suspense` provides the fallback UI while the chunk is still being fetched and evaluated.\n\nWithout splitting, a user on a slow connection downloads the entire application bundle before seeing any interactive UI. With splitting, the initial payload contains only the code for the current route or view, and additional chunks load lazily when the user navigates or a deferred component mounts. This directly reduces Time to Interactive.\n\nThe split is decided at build time by the bundler (webpack, Vite, or Turbopack in Next.js). `React.lazy` is a thin wrapper around the promise returned by `import()`; it does not perform the split itself. If the network request for a chunk fails, the promise rejects and the component never resolves, so an error boundary is required to catch the failure and render a fallback.",
    interviewLine: "Code splitting is a bundler-level optimization: I use dynamic `import()` to declare a boundary, the bundler emits a separate chunk file, and `React.lazy` plus `Suspense` handle the async loading and fallback rendering on the client.",
    misconception: "Thinking 'code splitting' is a generic term for breaking up any file (images, CSS, server code) rather than specifically the bundler emitting separate JavaScript chunk files that the browser loads asynchronously.",
    hints: [
      "Look at what argument `React.lazy` expects \u2014 it is a function that returns a promise.",
      "What does `import('./LazyComponent')` produce at build time, and when does the browser actually fetch that file?",
      "The term refers to how the client-side JavaScript is chunked by the bundler, not to image, CSS, or server-side concerns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Notice that `next/dynamic` wraps the same `import()` promise and adds a `loading` fallback, making the chunk boundary explicit without a separate `Suspense` wrapper.",
      language: "tsx",
      code: "import dynamic from 'next/dynamic';\n\nconst HeavyChart = dynamic(() => import('./HeavyChart'), {\n  loading: () => <p>Rendering chart\u2026</p>,\n  ssr: false,\n});\n\nexport default function Dashboard() {\n  return (\n    <section>\n      <h1>Revenue</h1>\n      <HeavyChart data={[42, 58, 71]} />\n    </section>\n  );\n}"
    }
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
        text: "Wrap every HTML primitive tag in its own independent Context Provider to isolate re-renders at the element level.",
        isCorrect: false,
        explanation: "Tempting if you equate more providers with more isolation, but wrapping every tag in a provider adds deep nesting and, if they all consume the same value, you still get the same reference-change cascade. The number of providers is not the variable that controls how many consumers re-render; the value's identity is."
      },
      {
        id: "B",
        text: "Store mutable objects in context and mutate their properties directly to avoid creating new references that trigger consumer updates.",
        isCorrect: false,
        explanation: "Tempting if you read \"avoid new references\" as the goal, but React's reconciliation detects updates by comparing references. Mutating in place means consumers never see a change, so the UI goes stale \u2014 that is a correctness bug, not a performance win."
      },
      {
        id: "C",
        text: "Memoize the provider value with `useMemo`, split contexts into separate providers for state and dispatch, and keep providers as close to consumers as possible.",
        isCorrect: true,
        explanation: "Correct. `useMemo` keeps the value's reference stable when the underlying data has not changed, and splitting state from dispatch means a state update only invalidates state consumers, not the (typically larger) set of components that merely call a stable dispatch function."
      },
      {
        id: "D",
        text: "Context performance is fixed by the API design; the only reliable way to avoid the re-render cost is to replace it with Redux.",
        isCorrect: false,
        explanation: "Tempting if you have heard \"context is slow\" in blog posts, but the re-render behaviour is a direct consequence of the reference-identity API, and the standard mitigations (memoize the value, split the context) are well-established and keep context fully viable."
      }
    ],
    correctAnswer: "C",
    explanation: "When a context value's reference changes, every component that called `useContext` for that context re-renders, regardless of whether the data it actually reads changed. The fix has two parts: wrap the value in `useMemo` so the reference stays stable across renders where the underlying data did not change, and split the context into separate providers (for example, one for state, one for a dispatch function) so that a state update only invalidates state consumers.\n\nIn practice, without this split a single `setCount` call in a shared context forces every consumer in the subtree to re-render, including components that only call `dispatch`. Once `dispatch` lives in its own context with a `useMemo`-stabilized value, those components keep the same reference and skip re-rendering entirely.\n\n`useMemo` does not prevent re-renders when its dependencies actually change; it only prevents a new object reference from being created when they do not. And a consumer still re-renders if its parent re-renders for an unrelated reason \u2014 memoizing the context value only controls the re-renders triggered by that specific context's value changing.",
    interviewLine: "I stabilize the context value with `useMemo` so its reference only changes when the data actually changes, and I split state and dispatch into separate contexts so that a state update does not invalidate consumers that only need the stable dispatch function.",
    misconception: "The re-render cost of context comes from the number of providers in the tree, so the fix is to add more granular providers around individual elements rather than stabilizing the value's reference and reducing how many consumers subscribe to a context whose value is about to change.",
    hints: [
      "Look at the value object passed to the Provider: is a new object literal created on every render, even when nothing changed?",
      "If the dispatch function never changes, why does it share a context value with the state that does change?",
      "The goal is not fewer providers in general; it is fewer consumers subscribed to a context whose reference is about to change."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Notice that `dispatchValue` is memoized with an empty dependency array, so its reference never changes and dispatch-only consumers never re-render when `count` updates.",
      language: "tsx",
      code: "const StateContext = createContext<{ count: number }>({ count: 0 });\nconst DispatchContext = createContext<{ increment: () => void }>({\n  increment: () => {},\n});\n\nfunction CounterProvider({ children }: { children: React.ReactNode }) {\n  const [count, setCount] = useState(0);\n\n  const stateValue = useMemo(() => ({ count }), [count]);\n  const dispatchValue = useMemo(\n    () => ({ increment: () => setCount((c) => c + 1) }),\n    []\n  );\n\n  return (\n    <StateContext.Provider value={stateValue}>\n      <DispatchContext.Provider value={dispatchValue}>\n        {children}\n      </DispatchContext.Provider>\n    </StateContext.Provider>\n  );\n}"
    }
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
        text: "Context cannot be consumed inside functional components; it requires a class component with `getChildContext`.",
        isCorrect: false,
        explanation: "Tempting if you still picture context as the class-era `this.context` pattern, but `useContext` was designed specifically for function components and has been the primary consumption API since React 16.8."
      },
      {
        id: "B",
        text: "Every consumer re-renders when the context value changes, even if it only reads one field, and monolithic contexts reduce reusability.",
        isCorrect: true,
        explanation: "Correct. React has no per-field subscription in context: a reference change on the Provider re-renders every consumer in that commit, and a single large context couples unrelated components together."
      },
      {
        id: "C",
        text: "Context causes immediate memory leaks because the Provider holds a permanent strong reference that blocks garbage collection.",
        isCorrect: false,
        explanation: "Tempting if you model the Provider-to-consumer link as a permanent strong reference, but React detaches the subscription when a consumer unmounts, and the value object is collected like any other unreachable reference."
      },
      {
        id: "D",
        text: "Context can only store primitive boolean values and throws a runtime error when you pass an object or array.",
        isCorrect: false,
        explanation: "Tempting if you conflate context with a form-field type constraint, but `React.createContext` accepts any JavaScript value \u2014 objects, arrays, functions, nested structures \u2014 with no runtime type check."
      }
    ],
    correctAnswer: "B",
    explanation: "React compares the old and new `value` on the Provider with `Object.is`. When they differ, every component that calls `useContext` for that context re-renders in the same commit, even if that component only reads one field. There is no built-in selector API: context is a broadcast, not a per-field subscription.\n\nIn practice this means a monolithic context object becomes a coupling point. If `user`, `cart`, and `theme` live in one context, updating `cart` re-renders the header that only reads `user`. Splitting into separate contexts limits the blast radius. It also hurts reusability: a component that depends on a large, app-specific context is harder to drop into a different project or test in isolation.\n\nWrapping the value in `useMemo` prevents spurious re-renders when the provider re-renders but the data has not actually changed. That does not solve the fundamental problem, though \u2014 any real change still reaches every consumer. For apps with many independent state slices, libraries like Zustand or Redux add selector subscriptions so only the components that read the changed slice re-render.",
    interviewLine: "Context is a broadcast channel, not a selector-based store. Every consumer re-renders when the provided value's reference changes, so I split contexts by domain and wrap the value in `useMemo` to keep the re-render blast radius small.",
    misconception: "Context behaves like a reactive store where each consumer subscribes only to the fields it reads, so changing one field re-renders only the components that use that field. It does not: the subscription is all-or-nothing per context, keyed on the value's reference.",
    hints: [
      "Think about what happens on the consumer side when the Provider re-renders with a new `value` object \u2014 does React check which fields each consumer actually reads?",
      "The subscription model is all-or-nothing per context: one reference change reaches every `useContext` call for that context.",
      "The issue is not that context is broken but that the granularity is the whole value, not individual properties."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Clicking the button changes `fontSize`, creating a new `value` object, so `Header` re-renders even though it only reads `theme`.",
      language: "tsx",
      code: "const ThemeContext = React.createContext({ theme: \"light\", fontSize: 14 });\n\nfunction Header() {\n  const { theme } = React.useContext(ThemeContext);\n  return <div style={{ color: theme }}>{theme}</div>;\n}\nfunction Body() {\n  const { fontSize } = React.useContext(ThemeContext);\n  return <p style={{ fontSize }}>{fontSize}px</p>;\n}\nfunction App() {\n  const [fontSize, setFontSize] = React.useState(14);\n  const value = { theme: \"light\", fontSize };\n  return (\n    <ThemeContext.Provider value={value}>\n      <Header />\n      <Body />\n      <button onClick={() => setFontSize((f) => f + 1)}>+1</button>\n    </ThemeContext.Provider>\n  );\n}"
    }
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
        text: "React tears down the component instance and forces a full remount, re-running all initialization code from scratch.",
        isCorrect: false,
        explanation: "A state update is an additive change to the component's data; it never destroys or remounts the component. The instance persists across renders and simply re-runs its function body with the new state."
      },
      {
        id: "B",
        text: "React mutates the `count` variable synchronously so that the next line of code already sees the new value.",
        isCorrect: false,
        explanation: "Tempting if you read `setCount(count + 1)` as a plain assignment, but `count` is a `const` captured in this render's closure. React queues the update and only produces a new `count` when it calls the component function again on the next render."
      },
      {
        id: "C",
        text: "React enqueues the update, batches it with other pending updates, re-renders the component, and patches the DOM.",
        isCorrect: true,
        explanation: "Correct. The setter records the update in the hook's queue, React batches it with any other pending updates, then re-renders the component and reconciles the tree to patch the real DOM minimally."
      },
      {
        id: "D",
        text: "The browser discards the current document and requests a fresh page from the server.",
        isCorrect: false,
        explanation: "React is a client-side rendering library that patches the existing DOM in place. A full page reload would destroy all in-memory state and is never triggered by a state update."
      }
    ],
    correctAnswer: "C",
    explanation: "When `setCount(count + 1)` runs, React does not reassign the local variable `count`. It records the new value in the internal queue attached to that `useState` call, then marks the component as needing a re-render. The `count` binding in the current render's closure still holds the old number for the rest of that synchronous execution.\n\nIn practice this means two `setCount` calls in the same handler produce one re-render, not two: React batches the updates, re-runs `Counter` once with the final queued value, and the button text updates a single time. If you `console.log(count)` immediately after the setter, you see the pre-update value, not the new one.\n\nThe nuance an interviewer will probe: batching is per event-loop tick, not per component. Updates scheduled from different components in the same tick are coalesced into one render pass. In React 18 and later, this batching extends to updates inside promises and `setTimeout`, so the older 'one update, one render' intuition no longer holds.",
    interviewLine: "I'd point out that calling `setCount` doesn't mutate `count` in the current render; it enqueues an update that React batches with any other pending updates, then re-runs the component function with the new state and patches only the changed DOM nodes.",
    misconception: "Reading `setCount(count + 1)` as a synchronous assignment that immediately changes the value of `count` in the current scope, rather than an enqueue operation whose effect is only visible on the next render.",
    hints: [
      "What does `count` hold if you `console.log(count)` on the very next line after calling `setCount`?",
      "React doesn't reassign the local variable \u2014 think about what 'schedules a re-render' means for the component function and its closure.",
      "The update is recorded in a queue, not applied; the variable in the current render is a snapshot that stays fixed until the function runs again."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Both setters queue their updates; the `console.log` still prints the old values because neither reassignment has happened yet.",
      language: "tsx",
      code: "function Batch() {\n  const [a, setA] = React.useState(0);\n  const [b, setB] = React.useState(0);\n\n  const double = () => {\n    setA(a + 1);\n    setB(b + 1);\n    console.log(a, b); // 0, 0 \u2014 both updates are queued, not applied\n  };\n\n  return <p>{a} / {b}</p>;\n}"
    }
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
        explanation: "Correct. `React.lazy` wraps a dynamic `import()` so the browser fetches the chunk only on first mount, and `<Suspense>` shows a fallback during that in-flight request, keeping the initial bundle small."
      },
      {
        id: "B",
        text: "A server-side technique where the API endpoint returns serialized component markup only after the client requests it, keeping the initial HTML payload small.",
        isCorrect: false,
        explanation: "This sounds like streaming SSR or partial hydration, where the server sends HTML fragments on demand. `React.lazy` is purely a client-side mechanism: it wraps a dynamic `import()` so the browser fetches a JS chunk on first render; no server round-trip is involved in the fetch itself."
      },
      {
        id: "C",
        text: "A rendering optimization where React skips painting components that are outside the viewport and resumes rendering them once they scroll into view, reducing layout thrashing.",
        isCorrect: false,
        explanation: "This describes list virtualization or `IntersectionObserver`-based rendering, not lazy loading. `React.lazy` defers the network fetch of a JavaScript chunk; it does not control whether React paints a component that is already loaded in memory."
      },
      {
        id: "D",
        text: "A build-time code-splitting strategy where the bundler marks unused exports as side-effect-free and tree-shakes them from the final bundle without any runtime involvement.",
        isCorrect: false,
        explanation: "This is tree-shaking, a static-analysis step in the bundler that removes dead code. `React.lazy` is a runtime mechanism: the chunk is split at build time but the actual fetch is triggered at runtime when the component first mounts, not eliminated at build time."
      }
    ],
    correctAnswer: "A",
    explanation: "`React.lazy()` wraps a dynamic `import()` expression and returns a component whose first render triggers the browser to fetch that JS chunk. `<Suspense>` sits above it in the tree; while the import promise is still pending, React renders the `fallback` prop instead of the child. Once the chunk resolves, the component mounts normally and the fallback disappears.\n\nIn practice this means the initial bundle the browser downloads, parses, and executes before first paint is smaller. A dashboard with twelve tabs, for example, ships only the tab that is visible; the other eleven chunks are fetched on demand and cached by the browser, so switching tabs a second time is instant.\n\nTwo details interviewers probe. First, the dynamic import must resolve to a module with a `default` export; a named-only export throws at render time. Second, if the lazy component sits inside a conditional that is never true, the chunk is never fetched at all\u2014`lazy` defers the network request, not just the render.",
    interviewLine: "I use `React.lazy` to wrap a dynamic `import()` so the browser fetches that component's chunk only on first mount, and I pair it with `<Suspense>` to show a fallback while the request is in flight, which keeps the initial bundle small and first paint fast.",
    misconception: "Learners often picture lazy loading as a timer that delays an already-downloaded component from painting, when in reality it defers the network fetch of the component's JavaScript chunk until the component first mounts.",
    hints: [
      "Look at what `React.lazy` wraps: it is a function returning a promise from a dynamic `import()`.",
      "Ask what the browser does differently when the chunk is fetched on first render versus being included in the initial HTML.",
      "The `fallback` in `<Suspense>` is not a delay; it is shown only while the network request for the chunk is still pending."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "The `Dashboard` chunk is fetched only when `showDashboard` becomes true; before that, the network request never fires.",
      language: "tsx",
      code: "import { lazy, Suspense } from \"react\";\n\nconst Dashboard = lazy(() => import(\"./Dashboard\"));\n\nexport function Sidebar({\n  showDashboard,\n}: {\n  showDashboard: boolean;\n}) {\n  return showDashboard ? (\n    <Suspense fallback={<span>Loading dashboard\u2026</span>}>\n      <Dashboard />\n    </Suspense>\n  ) : (\n    <p>Click a nav item to load a panel.</p>\n  );\n}"
    }
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
        text: "A single global switch that moves all React rendering onto parallel C++ worker threads and the GPU to render components in true parallel.",
        isCorrect: false,
        explanation: "Tempting if you equate \"concurrent\" with \"parallel hardware threads,\" but React's scheduler runs entirely on the main JavaScript thread. There is no C++ worker pool, no GPU offloading, and no global toggle \u2014 the APIs are per-update."
      },
      {
        id: "B",
        text: "A mode that suppresses every state update and discards queued setState calls so that no re-render can ever occur while it is active.",
        isCorrect: false,
        explanation: "Tempting if you read \"concurrent\" as an access-control lock, but concurrent features change when and how React schedules renders; they never discard a state update. Every `setState` still triggers a render \u2014 the difference is whether that render can be interrupted."
      },
      {
        id: "C",
        text: "A feature that serialises client component trees into SQL tables so the server can persist and restore interactive UI state between requests.",
        isCorrect: false,
        explanation: "No React API maps component trees to database tables. \"Client components\" is a Next.js App Router label for components that execute in the browser; it has no relation to SQL or data storage."
      },
      {
        id: "D",
        text: "React 18 features (`useTransition`, `useDeferredValue`, Suspense) that let React pause, interrupt, and prioritize rendering to keep the UI responsive during heavy updates.",
        isCorrect: true,
        explanation: "Correct. `useTransition` and `useDeferredValue` mark specific updates as non-urgent, and `Suspense` handles data boundaries; together they let the scheduler interleave urgent and deferred work on the same thread."
      }
    ],
    correctAnswer: "D",
    explanation: "Concurrent features \u2014 `useTransition`, `useDeferredValue`, and `Suspense` \u2014 let React's fiber renderer pause, interrupt, and resume a render pass instead of committing it in one blocking block. When you mark an update as non-urgent with `useTransition` or delay a value with `useDeferredValue`, the scheduler can drop that work, handle an urgent update (a keystroke, a click), then resume the deferred work before the browser paints.\n\nIn practice this means a 300 ms re-render of a 10 000-row table no longer freezes the search input. Without concurrent features, that render is one synchronous task on the main thread; with them, React yields between fiber nodes so the input's event handler still fires within the frame budget.\n\nThe nuance an interviewer will probe: these are opt-in APIs, not a global mode. React still runs on a single JavaScript thread \u2014 \"concurrent\" means interruptible, not parallel. `useTransition` marks one specific update as low-priority; `useDeferredValue` defers one specific state value. If you never call either, rendering behaves exactly as it did before React 18.",
    interviewLine: "Concurrent features don't add threads; they make the single render pass interruptible. I wrap a heavy list re-render in `useTransition` so a keystroke in the filter input still gets processed in the same frame while the table catches up a beat later.",
    misconception: "Thinking \"concurrent\" means \"parallel threads.\" In React it means \"interruptible on the same thread\" \u2014 the scheduler yields between fiber nodes so higher-priority work can interleave, but everything still runs in one JavaScript call stack.",
    hints: [
      "Think about what happens on the main thread when React renders a 10 000-row table while the user is typing in a filter box.",
      "The key word is \"interruptible,\" not \"parallel\" \u2014 ask what the scheduler can do between individual fiber nodes.",
      "These are opt-in APIs you call per-update, not a global flag that changes React's threading model."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition",
    example: {
      caption: "Notice that the input reads `filter` (updated immediately) while the expensive list reads `deferredFilter` (updated a frame or two later), so typing never blocks on the filter computation.",
      language: "tsx",
      code: "import { useState, useDeferredValue } from \"react\";\n\nfunction Feed({ items }: { items: Item[] }) {\n  const [filter, setFilter] = useState(\"\");\n  const deferredFilter = useDeferredValue(filter);\n\n  return (\n    <div>\n      <input\n        value={filter}\n        onChange={e => setFilter(e.target.value)}\n        placeholder=\"Type to filter\u2026\"\n      />\n      <List data={items.filter(i => i.label.includes(deferredFilter))} />\n    </div>\n  );\n}"
    }
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
        text: "Use `setTimeout` to defer the calculation until after the initial render completes.",
        isCorrect: false,
        explanation: "This is a common misconception. `setTimeout` only delays the execution; once the timer fires, the expensive function still runs synchronously on the main thread, blocking the UI for its entire duration."
      },
      {
        id: "B",
        text: "Break the work into small chunks and schedule them with `requestIdleCallback` or the `scheduler` package.",
        isCorrect: false,
        explanation: "This is a valid approach for main-thread work, but it only yields control between chunks. It does not move the work off the main thread, so long individual chunks can still cause jank, and it is less robust than offloading to a Web Worker for truly heavy tasks."
      },
      {
        id: "C",
        text: "Wrap the state update in `useTransition` to mark it as non-urgent so React can prioritize input events.",
        isCorrect: false,
        explanation: "`useTransition` helps React interrupt a long render to handle urgent updates, but it does not make the underlying computation faster or move it off the main thread. The heavy work still blocks the thread during the transition render."
      },
      {
        id: "D",
        text: "Offload heavy calculations to Web Workers, chunk tasks with `scheduler`, or use `useTransition` and `useMemo`.",
        isCorrect: true,
        explanation: "Correct. This covers the primary strategies: moving work off the main thread (Web Workers), yielding time slices (scheduler), and managing React's rendering priority and re-computation (useTransition, useMemo)."
      }
    ],
    correctAnswer: "D",
    explanation: "The browser's main thread is single-threaded: it handles rendering, input events, and timers in one queue. Any synchronous function that runs longer than roughly 50 ms freezes all of them. The fix is to either move the work to a different thread or yield control back to the main thread between small chunks.\n\nIn practice, a Web Worker runs JavaScript on a separate thread, so the UI thread stays free to paint and respond to input. `requestIdleCallback` and the `scheduler` package let you schedule small slices of work between frames instead of one long block. `useTransition` tells React to treat a state update as non-urgent, so it can interrupt the render to handle an urgent tap or keystroke. `useMemo` skips re-running an expensive derivation when its inputs have not changed.\n\nThe nuance an interviewer will probe: `useTransition` does not make the computation itself faster or move it off the main thread\u2014it only changes React's scheduling priority so the UI can respond while the transition is still computing. `useMemo` is a hint, not a guarantee; React may discard the cached value under memory pressure. A Web Worker avoids the main-thread block entirely but adds serialization cost every time you pass data across the thread boundary.",
    interviewLine: "I'd move CPU-bound work to a Web Worker so the main thread stays free, or break it into chunks with `requestIdleCallback` if it needs to stay on the main thread. For the React side, I'd wrap the state update in `useTransition` so the UI can respond to urgent events while the transition computes, and I'd cache the expensive derivation with `useMemo` so it only re-runs when its inputs change.",
    misconception: "Calling `setTimeout(fn, 0)` is often treated as \"not blocking the UI,\" but it only postpones the block; `fn` still runs synchronously on the main thread and freezes rendering, input, and timers for its entire duration.",
    hints: [
      "The browser's main thread handles rendering, input, and timers in one queue\u2014what happens when a function occupies that thread for several seconds?",
      "Ask yourself: does the solution actually move work off the main thread, or does it only delay the block?",
      "`setTimeout(fn, 0)` still runs `fn` synchronously on the main thread; it just postpones the freeze."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useMemo` avoids re-filtering on every render and `useTransition` keeps the input responsive while the list updates.",
      language: "tsx",
      code: "import { useMemo, useTransition, useState } from \"react\";\n\nfunction FilteredList({ items }: { items: Item[] }) {\n  const [isPending, startTransition] = useTransition();\n  const [query, setQuery] = useState(\"\");\n\n  const filtered = useMemo(\n    () => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),\n    [items, query]\n  );\n\n  const handleChange = (value: string) => {\n    startTransition(() => setQuery(value));\n  };\n\n  return (\n    <>\n      <input value={query} onChange={(e) => handleChange(e.target.value)} />\n      {isPending && <span>Updating\u2026</span>}\n      <ul>{filtered.map((i) => <li key={i.id}>{i.name}</li>)}</ul>\n    </>\n  );\n}"
    }
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
        explanation: "This describes Server-Side Rendering (SSR), where a server executes React and streams a fresh HTML response per request. The distinction is timing: SSR runs at request time and still needs a live server in the path, while SSG runs once at build time and produces files that outlive the build."
      },
      {
        id: "B",
        text: "Rendering empty HTML shells that require client JavaScript to fetch all content.",
        isCorrect: false,
        explanation: "This describes Client-Side Rendering (CSR), where the server sends a bare `<div id=\"root\">` and the browser downloads a JS bundle that builds the UI. SSG does the opposite: the HTML arrives already populated, and JavaScript is only needed for interactivity."
      },
      {
        id: "C",
        text: "Rendering HTML at build time so CDNs serve it with no server load, fast loads, and full markup for SEO.",
        isCorrect: true,
        explanation: "Correct. The build step renders components to complete HTML files, which are then distributed as static assets through a CDN. No server computation is required at request time, so delivery is fast, scalable, and crawler-friendly."
      },
      {
        id: "D",
        text: "Generating static PDF documents from React components.",
        isCorrect: false,
        explanation: "This conflates the word 'static' with a non-HTML output format. SSG produces `.html`, `.css`, and `.js` files for browser consumption; it has no relationship to PDF generation."
      }
    ],
    correctAnswer: "C",
    explanation: "Static generation (SSG) renders each page to complete HTML during the build step. The framework executes your React components, runs any data-fetching functions (for example `generateStaticParams` and `generateMetadata` in the App Router), and writes the resulting markup to disk as plain `.html` files. No server is needed to serve the result; the output is a folder of static assets.\n\nBecause the files are static, a CDN can cache them at every edge location. A request from Tokyo and a request from S\u00e3o Paulo hit the same pre-built bytes with no round-trip to an origin server, which is what gives SSG its near-zero server load and very low time-to-first-byte. Search crawlers also receive fully rendered HTML immediately, so there is no dependency on JavaScript execution for indexing.\n\nThe trade-off an interviewer will probe: the HTML is frozen at the moment of the build. If the underlying data changes, the page stays stale until a new build or an incremental regeneration (ISR via `revalidate`) runs. Pure SSG is ideal for content that changes infrequently\u2014marketing pages, documentation, blog archives\u2014rather than for dashboards that need live data.",
    interviewLine: "I explain SSG as the framework rendering each route to a complete HTML file during `next build`. Those files are static assets, so a CDN can serve them from the edge with no origin round-trip. The cost I flag is that the content is frozen until I rebuild or trigger an ISR revalidation.",
    misconception: "Confusing SSG with SSR because both involve the server producing HTML. The distinction is timing: SSG runs once at build time and writes files to disk; SSR runs on every request and streams a fresh response, so it still needs a live server in the request path.",
    hints: [
      "Think about when the HTML is produced: at deploy time or at request time?",
      "If the origin server goes down, can the page still load? Which approach answers yes?",
      "The word 'static' refers to the output being a fixed file on disk, not to where the rendering executes."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `generateStaticParams` runs at build time, so Next.js writes one `.html` file per slug into the output directory\u2014no server is involved when a visitor requests `/blog/hello-world`.",
      language: "tsx",
      code: "// app/blog/[slug]/page.tsx\nimport { notFound } from \"next/navigation\";\n\ntype Post = { slug: string; title: string; body: string };\n\nconst posts: Post[] = [\n  { slug: \"hello-world\", title: \"Hello World\", body: \"First post.\" },\n  { slug: \"static-gen\", title: \"Static Generation\", body: \"Built once, served everywhere.\" },\n];\n\nexport function generateStaticParams() {\n  return posts.map((p) => ({ slug: p.slug }));\n}\n\nexport default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {\n  const { slug } = await params;\n  const post = posts.find((p) => p.slug === slug);\n  if (!post) notFound();\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <p>{post.body}</p>\n    </article>\n  );\n}"
    }
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
        text: "Using TypeScript interfaces to type API response data, so field names and shapes are checked at compile time rather than discovered at runtime.",
        isCorrect: false,
        explanation: "Tempting if you equate any extra step in the data-fetching pipeline with a risk, but typing the response is a best practice: it catches a renamed field or a missing property before the code ever ships, and it has no runtime cost."
      },
      {
        id: "B",
        text: "Caching API responses with appropriate TTL expiration policies to avoid redundant network round-trips on repeated navigation.",
        isCorrect: false,
        explanation: "This reads like a pitfall only if you assume caching always serves stale data, but a TTL-bounded cache is a standard performance optimization that reduces latency and bandwidth without changing correctness."
      },
      {
        id: "C",
        text: "Neglecting loading and error states, creating network waterfalls, missing effect cleanups that cause race conditions, and triggering infinite fetch loops from missing or unstable dependencies.",
        isCorrect: true,
        explanation: "Correct. Each item is a concrete failure mode: unhandled states leave the UI blank, sequential fetches multiply latency, an uncancelled request can overwrite newer data, and an unstable dependency re-triggers the effect every render."
      },
      {
        id: "D",
        text: "Handling network errors with user-friendly retry buttons and clear error messages so the user can recover without a full page reload.",
        isCorrect: false,
        explanation: "This is a good-practice option dressed as a pitfall; giving the user a visible way to retry a failed request is standard UX, not a source of bugs."
      }
    ],
    correctAnswer: "C",
    explanation: "The four pitfalls named here are the ones that actually break apps in production. Neglecting loading and error states means the UI renders nothing (or stale data) until the promise resolves, and shows a blank screen or crashes when it rejects. Network waterfalls happen when a component fetches a list, then fetches details for each item sequentially, multiplying perceived latency. Missing effect cleanup lets a response from a previous render overwrite the one for the current render. Unstable dependencies, such as a new object or array literal in the `useEffect` array, re-run the effect on every render and create an infinite fetch loop.\n\nIn practice the race condition is the most dangerous: the user navigates from `/users/1` to `/users/2`, the first response arrives second, and the screen shows user 1's data under user 2's URL. The infinite loop is the most confusing: the network tab fills with identical requests, the CPU spikes, and the cause is a `{}` or `[]` sitting in the dependency array.\n\nAn interviewer will follow up on the cleanup mechanism. The standard fix is an `AbortController` created inside the effect and aborted in the return function, or a boolean flag set to `true` in cleanup so the `.then` callback checks it before calling `setState`. Both prevent a stale response from touching state after the component has moved on.",
    interviewLine: "The ones I watch for first are race conditions from a missing `useEffect` cleanup, infinite loops from an object literal in the dependency array, and forgetting to render a loading or error branch so the UI just sits blank while the promise is pending.",
    misconception: "The question asks what goes wrong, but three of the four options describe things you should do. The trap is treating any mention of data-fetching mechanics as a potential failure instead of separating the practice itself from the way it is implemented.",
    hints: [
      "Look at what happens between the moment `fetch` is called and the moment the response resolves, especially if the component unmounts or re-renders in between.",
      "Ask what happens when the dependency array contains a new object or array reference on every render, and what the cleanup function is supposed to prevent.",
      "Three of the four options describe things you should do; the pitfall is the one that lists things you fail to do."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the AbortController created inside the effect and aborted in the cleanup: without it, a slow response for a previous id can overwrite the data for the current id.",
      language: "tsx",
      code: "function UserPanel({ id }: { id: number }) {\n  const [user, setUser] = useState<User | null>(null);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n\n    fetch(`/api/users/${id}`, { signal: controller.signal })\n      .then((res) => res.json())\n      .then(setUser)\n      .catch((err) => {\n        if (err.name !== \"AbortError\") setError(err);\n      });\n\n    return () => controller.abort();\n  }, [id]);\n\n  if (error) return <p>{error.message}</p>;\n  if (!user) return <p>Loading\u2026</p>;\n  return <h2>{user.name}</h2>;\n}"
    }
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
        text: "React Router v6 exports a single monolithic `<AppRouter>` component that handles all routing.",
        isCorrect: false,
        explanation: "Tempting if you picture a router as one big component, but React Router has been split into environment-specific wrappers since v4. There is no `<AppRouter>` in the package; the four named routers are the public API."
      },
      {
        id: "B",
        text: "`<CanvasRouter>` for WebGL game canvases and `<VRRouter>` for virtual reality headset displays.",
        isCorrect: false,
        explanation: "These names do not exist in React Router or any of its dependencies. React Router is a web-routing library; it has no integration with WebGL contexts or VR display APIs, and no component targets those rendering surfaces."
      },
      {
        id: "C",
        text: "`<BrowserRouter>` (HTML5 history), `<HashRouter>` (hash-based), `<MemoryRouter>` (tests/React Native), `<StaticRouter>` (SSR).",
        isCorrect: true,
        explanation: "Correct. These are the four `<Router>` components exported by React Router v6, each wrapping a different history implementation while exposing the same hook API to the component tree."
      },
      {
        id: "D",
        text: "`<SqlRouter>` for PostgreSQL database routing and `<RedisRouter>` for Redis cache server routing.",
        isCorrect: false,
        explanation: "React Router handles client-side and server-side URL-to-component mapping; it has no connection to database engines or key-value stores. These names do not appear anywhere in the React Router source or documentation."
      }
    ],
    correctAnswer: "C",
    explanation: "React Router v6 ships four `<Router>` components: `<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, and `<StaticRouter>`. They all inject the same router context; only the history object underneath changes. `<BrowserRouter>` reads and writes the URL through the HTML5 History API (`pushState`, `popstate`). `<HashRouter>` scopes the path to the `#` fragment, so the server always sees the root URL. `<MemoryRouter>` keeps its history stack in a plain JS array with no DOM interaction, which is why it works in Jest or React Native. `<StaticRouter>` takes a fixed `location` and ignores `navigate()`, making it safe for one server-side render pass.\n\nIn practice the choice is mechanical: a normal SPA gets `<BrowserRouter>`; a static-CDN deploy that cannot rewrite URLs gets `<HashRouter>`; a test or widget gets `<MemoryRouter>`; a Node SSR script gets `<StaticRouter>`. Mixing them up is a bug: `<StaticRouter>` around a client SPA freezes navigation.\n\nThe nuance an interviewer probes next is that these are thin wrappers, not different engines. Each calls the same `matchRoutes` logic from `@remix-run/router`; the component only picks which history to pass in. Swapping routers never changes which routes match \u2014 only where the URL lives and whether navigation mutates the address bar.",
    interviewLine: "React Router v6 gives you four `<Router>` wrappers \u2014 `<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>` \u2014 and they all expose the same `useNavigate` and `useLocation` hooks; the only difference is the history object they inject, so I pick the one that matches where the URL actually lives in my environment.",
    misconception: "Treating the router as a single opaque component rather than a thin wrapper whose only job is to pick a history implementation (browser, hash, memory, or static) and inject it into context, so the rest of the routing code stays identical.",
    hints: [
      "Think about where the URL string lives in each environment: the address bar, a hash fragment, a plain JS array, or nowhere at all.",
      "All four routers call the same `matchRoutes` logic; the only variable is which `createBrowserHistory`, `createHashHistory`, or `createMemoryHistory` they pass in.",
      "None of the four target databases, game engines, or VR headsets; React Router is a web URL-routing library."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "`<MemoryRouter>` is the natural choice in a Jest test because it needs no real browser history; `initialEntries` sets the starting path so the route table resolves exactly as it would in a browser.",
      language: "tsx",
      code: "import { MemoryRouter, Routes, Route } from \"react-router\";\nimport { render, screen } from \"@testing-library/react\";\nimport { App } from \"./App\";\n\ntest(\"renders the dashboard at /dashboard\", () => {\n  render(\n    <MemoryRouter initialEntries={[\"/dashboard\"]}>\n      <App />\n    </MemoryRouter>,\n  );\n\n  expect(screen.getByText(\"Dashboard\")).toBeInTheDocument();\n});"
    }
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
        explanation: "Tempting if you picture a tool that watches your app at runtime, but the React Compiler is a build-time Babel or SWC plugin that transforms source before bundling; it never executes in the browser and never calls `alert`."
      },
      {
        id: "B",
        text: "An opt-in build-time compiler (React Forget) that analyzes component code and automatically inserts fine-grained memoization, eliminating the need for manual `useMemo`/`useCallback`/`React.memo`.",
        isCorrect: true,
        explanation: "Correct. It is a build-time code transformation (Babel or SWC plugin) that tracks data flow and inserts memoization where it can prove a value is stable, removing the need for manual `useMemo`, `useCallback`, and `React.memo` in most cases."
      },
      {
        id: "C",
        text: "A hardware compiler that prints physical silicon chips from React source code.",
        isCorrect: false,
        explanation: "This conflates a software build plugin with a chip-fabrication tool. The React Compiler is a JavaScript transformation that runs on your CI or dev machine as part of the bundling step; no hardware is involved."
      },
      {
        id: "D",
        text: "A tool that converts React applications into Angular frameworks.",
        isCorrect: false,
        explanation: "This mistakes an optimization pass for a framework migration. The React Compiler keeps your code as React; it only rewrites component internals to add memoization, leaving the framework, routing, and ecosystem untouched."
      }
    ],
    correctAnswer: "B",
    explanation: "The React Compiler (also called React Forget) is an opt-in build-time compiler that reads your component source, tracks data flow, and inserts memoization equivalent to `useMemo`, `useCallback`, and `React.memo` wherever it can prove a value is stable across renders. It runs as a Babel or SWC plugin during the build step, so the transformation happens before any JavaScript reaches the browser.\n\nIn practice this means you stop hand-rolling memoization wrappers. You write a plain derivation like `const total = items.reduce(...)` and a plain callback like `const handleClick = () => setCount(c => c + 1)`, and the compiler wraps them in the right memoized form automatically. The re-render cost you used to manage by sprinkling `useMemo` and `React.memo` is now handled for you, and you remove the boilerplate.\n\nThe compiler is deliberately conservative. If a component violates the Rules of React\u2014conditional hook calls, mutating props, reading a ref during render\u2014it skips that component entirely rather than emitting an incorrect transformation. You opt in per project or per file, and the rest of your codebase is untouched. It is a static code transformation, not a runtime engine, not a profiler, and not a replacement for React itself.",
    interviewLine: "React Compiler is a build-time Babel or SWC plugin that reads component source, tracks which values are stable across renders, and inserts memoization for me\u2014so I write plain derivations and callbacks, and it bails out of any component that violates the Rules of React rather than emitting a wrong transform.",
    misconception: "Treating the React Compiler as a runtime performance engine or a profiler that observes re-renders, when in fact it is a static build-time transformation that rewrites component source before any code ships to the browser.",
    hints: [
      "Think about where in the pipeline it operates: does it execute in the browser at runtime, or does it transform source before bundling?",
      "Ask what it actually does to your component code: does it add memoization calls around derivations and callbacks, or does it swap out the framework?",
      "It ships as a Babel or SWC plugin, which pins it to the build step and rules out runtime, hardware, or framework-conversion readings."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "With the compiler enabled you write the plain derivation and callback; the transformation inserts the memoization you would otherwise add by hand.",
      language: "tsx",
      code: "function SearchResults({ query }: { query: string }) {\n  const words = query\n    .split(\" \")\n    .map((w) => w.toUpperCase())\n    .filter((w) => w.length > 2);\n\n  const handleSelect = (index: number) => {\n    console.log(\"selected\", index, words[index]);\n  };\n\n  return (\n    <ul>\n      {words.map((word, i) => (\n        <li key={i} onClick={() => handleSelect(i)}>\n          {word}\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "SQL tables for data, Redis caches for sessions, Apache web servers for routing, and Docker containers for deployment of the component tree.",
        isCorrect: false,
        explanation: "Tempting if you equate a web application's full architecture with its hosting stack, but React is a client-side rendering library; none of these are React concepts or appear in a component file."
      },
      {
        id: "B",
        text: "CPU registers for state, motherboard buses for data flow, RAM slots for props, and disk drivers for persistence, mapped onto component internals.",
        isCorrect: false,
        explanation: "Tempting if you read 'building blocks' as physical hardware, but React runs inside a browser or Node.js process and has no direct access to registers, buses, or memory slots."
      },
      {
        id: "C",
        text: "Components (reusable UI units), JSX (declarative syntax), Props (input data), State (internal mutable data), Context (shared tree state), and Virtual DOM (diffing engine).",
        isCorrect: true,
        explanation: "Correct. These six pieces cover the unit of composition, the syntax it returns, the two data flows, the cross-cutting channel, and the reconciliation strategy that ties them together."
      },
      {
        id: "D",
        text: "Flash animations for motion, Java Applets for logic, ActiveX plugins for interactivity, and Silverlight modules for media, composed into a page.",
        isCorrect: false,
        explanation: "Tempting if you associate early-2000s web interactivity with React, but React was created in 2013 specifically to replace plugin-based UI approaches; none of these technologies are part of React."
      }
    ],
    correctAnswer: "C",
    explanation: "React's architecture rests on a small set of composable pieces. A Component is a plain function that returns JSX, a syntax extension that describes the UI declaratively. Props are the read-only inputs a parent passes down; state is mutable data the component owns and updates through its setter. Context lets a value skip intermediate levels of the tree without threading it through every prop. The Virtual DOM is React's in-memory tree that the reconciler diffs against the previous render to compute the smallest set of real DOM mutations.\n\nIn practice this means you never call `document.createElement` or `appendChild`. You describe what the UI should look like for a given props/state combination, and React's scheduler decides which nodes to create, update, or remove. A component that receives a new prop and re-renders does not touch the DOM directly; it produces a new virtual tree, and the diff step applies the patch.\n\nOne nuance an interviewer will probe: the Virtual DOM is not a performance guarantee. It is a reconciliation strategy. For a large list, React still walks every node in the diff; `React.memo`, stable `key` values, and splitting state to limit re-render scope are what actually control cost.",
    interviewLine: "I describe React's core loop as: a component function returns a virtual tree from JSX, the reconciler diffs it against the previous tree, and applies minimal DOM patches. Props are the read-only contract from the parent, state is the component's own mutable data, and context is the escape hatch for data that would otherwise require prop drilling through every level.",
    misconception: "Treating React as a server-side framework or a static HTML templating engine rather than a client-side library whose components are live functions managed by a reconciler that diffs virtual trees and patches the real DOM.",
    hints: [
      "Think about what a React component actually is at runtime: a function call that returns a description of UI, not a DOM node or a server process.",
      "Ask yourself which option describes data flow and rendering strategy versus infrastructure, hardware, or dead browser plugins.",
      "React was built to replace the plugin-and-template era; the correct answer names concepts you would see in a single `function` component file."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `step` and `label` arrive as props, `count` is internal state, and the return value is a JSX description React reconciles rather than a direct DOM mutation.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\ntype CounterProps = {\n  step: number;\n  label: string;\n};\n\nfunction Counter({ step, label }: CounterProps) {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h2>{label}</h2>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount((c) => c + step)}>\n        Add {step}\n      </button>\n    </div>\n  );\n}"
    }
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
        text: "A permanent snapshot of the DOM persisted in browser cookies so the page can restore its previous state.",
        isCorrect: false,
        explanation: "Tempting if you read \"virtual\" as \"a saved copy,\" but the virtual tree lives only in JavaScript heap memory for the duration of a render cycle and is discarded after commit; nothing is written to cookies, localStorage, or any other storage."
      },
      {
        id: "B",
        text: "A lightweight in-memory JavaScript representation of the real DOM that React diffs during reconciliation to compute and batch minimal real DOM updates.",
        isCorrect: true,
        explanation: "Correct. React builds a tree of plain objects on each render, compares it to the previous tree, and issues only the necessary DOM mutations, which is the core mechanism behind efficient updates."
      },
      {
        id: "C",
        text: "A browser-level API in Chrome and Firefox that replaces the HTML parser with a WebGL-based rendering pipeline.",
        isCorrect: false,
        explanation: "Tempting if you associate \"virtual\" with a new rendering technology, but the Virtual DOM is an abstraction inside React's JavaScript code; no browser vendor ships a WebGL DOM parser, and the HTML parser is unchanged."
      },
      {
        id: "D",
        text: "An isolated Shadow DOM container that React uses to encapsulate CSS styles away from the rest of the page.",
        isCorrect: false,
        explanation: "Tempting because both involve the idea of a \"hidden\" DOM layer, but Shadow DOM is a Web Components standard for style scoping; React's Virtual DOM is a data structure for diffing and has no relationship to CSS encapsulation."
      }
    ],
    correctAnswer: "B",
    explanation: "The Virtual DOM is a tree of plain JavaScript objects \u2014 each carrying a `type`, `props`, and `children` \u2014 that describes the UI without touching the browser. On every render, React builds a fresh virtual tree, then reconciliation walks both the previous and new trees to identify exactly which nodes changed.\n\nIn practice this means React never replaces a subtree's `innerHTML` on a state update. Instead it calls targeted operations such as `node.textContent = \"42\"` or `node.setAttribute(\"class\", \"active\")` on only the elements that differ, leaving the rest of the DOM untouched. That targeted mutation is what keeps updates cheap relative to a full re-render.\n\nOne nuance an interviewer may probe: the virtual tree is ephemeral. It exists only long enough to be diffed and committed, then is eligible for garbage collection. It is not a second persistent DOM, and it is not a browser feature \u2014 it is a strategy inside React's JavaScript runtime. React 19's concurrent scheduling (transitions, Suspense) layers on top of this same reconciliation step without changing what a virtual node is.",
    interviewLine: "I treat the Virtual DOM as a tree of plain JS objects that React rebuilds each render; reconciliation diffs the old and new trees in memory, then applies only the changed attributes, text, or child nodes to the real DOM, so I avoid full page re-renders.",
    misconception: "Thinking the Virtual DOM is a second, persistent DOM tree maintained by the browser or a CSS-scoping mechanism like Shadow DOM, rather than an ephemeral in-memory object tree that React rebuilds and discards on every render.",
    hints: [
      "Think about what `React.createElement` actually returns \u2014 is it a DOM node or something else?",
      "What does React do with that object before it ever calls a method on `document`?",
      "The word \"virtual\" here means \"in-memory and ephemeral,\" not \"a second browser feature\" or \"a CSS scoping container.\""
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "A React element is a plain object in memory; no DOM node exists until React commits it.",
      language: "typescript",
      code: "const el = React.createElement(\"span\", { id: \"label\" }, \"Count: 3\");\n\nconsole.log(el.type);            // \"span\"\nconsole.log(el.props.id);        // \"label\"\nconsole.log(el.props.children);  // \"Count: 3\"\n\n// It is a plain object, not a DOM node:\nconsole.log(el instanceof Element); // false"
    }
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
        explanation: "Correct. The Real DOM is the browser's live node tree where each mutation can trigger reflow and repaint; the Virtual DOM is a JS object tree in memory that React diffs and batches before committing minimal changes to the real DOM."
      },
      {
        id: "B",
        text: "Real DOM is the browser's native rendering tree bound to the device's operating system, while Virtual DOM is a desktop-only rendering pipeline that mobile browsers do not implement.",
        isCorrect: false,
        explanation: "This treats Virtual DOM as a browser feature tied to a platform, but it is simply a JavaScript object tree that any browser can run; there is no device-specific DOM implementation."
      },
      {
        id: "C",
        text: "Real DOM is a JavaScript object tree stored in the page's heap, while Virtual DOM is the browser's native C++ rendering engine that directly paints pixels to the screen.",
        isCorrect: false,
        explanation: "This reverses the two. The Real DOM lives inside the browser's C++ engine and is the only tree the user can see; the Virtual DOM is a JavaScript object tree that React maintains in the page's JS heap."
      },
      {
        id: "D",
        text: "Real DOM mutations are always at least 1000x faster than any Virtual DOM diffing pass, which is why React's reconciliation strategy is strictly slower for every update.",
        isCorrect: false,
        explanation: "The \"1000x\" figure is fabricated and \"always\" makes it absolute. In practice, direct DOM mutations are typically slower for bulk updates because each can trigger a reflow, while Virtual DOM diffing is a pure JS object comparison that avoids most of those layout passes."
      }
    ],
    correctAnswer: "A",
    explanation: "The Real DOM is the browser's live tree of elements, attributes, and text nodes, managed by the browser's C++ engine. Every direct mutation\u2014setting `innerHTML`, appending a node, changing a style\u2014can force a synchronous reflow (layout recalculation) and repaint (pixel redraw). The Virtual DOM is a plain JavaScript object tree that React keeps in memory. React diffs the new virtual tree against the previous one, then applies only the minimal set of real DOM mutations in a single batch.\n\nIn practice, hand-mutating 500 list items with `appendChild` in a loop can trigger a reflow after each call. React computes the diff in JS (cheap object comparison) and issues a small number of targeted DOM writes, so the browser reflows once.\n\nThe Virtual DOM is not a universal speedup. For a single `textContent` change, the overhead of building and diffing the virtual tree can exceed the cost of one direct assignment. React's benefit scales with the number of simultaneous changes and the depth of the component tree.",
    interviewLine: "I describe the Real DOM as the browser's live tree where each mutation can trigger reflow and repaint, and the Virtual DOM as just a JS object tree React keeps in memory. React diffs the two virtual trees, then batches the minimal set of real DOM writes so the browser only reflows once.",
    misconception: "Thinking the Virtual DOM is a separate rendering engine or a browser feature, when it is simply a JavaScript object tree that React uses as a staging area before committing changes to the real DOM.",
    hints: [
      "Ask yourself what the browser actually renders versus what React keeps in a JS variable.",
      "What happens to layout when you call `appendChild` 500 times in a loop versus when React commits 10 targeted mutations at once?",
      "Neither DOM is tied to a platform or a specific engine; both exist in every browser."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "Notice how the manual loop issues 500 DOM writes (each a potential reflow) while React's render produces one batched commit.",
      language: "tsx",
      code: "// Hand-mutating: each appendChild can trigger a reflow\nconst list = document.getElementById(\"list\");\nfor (let i = 0; i < 500; i++) {\n  const li = document.createElement(\"li\");\n  li.textContent = `Item ${i}`;\n  list.appendChild(li); // browser may reflow after each call\n}\n\n// React: builds virtual nodes, diffs, commits in one batch\nfunction ItemList({ items }: { items: string[] }) {\n  return (\n    <ul>\n      {items.map((text, i) => (\n        <li key={i}>{text}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        explanation: "Tempting if you conflate state management with component architecture, but `setState` has no role in converting or migrating component types; it only manages the state object of an already-existing class component."
      },
      {
        id: "B",
        text: "A method that clears all browser cookies and local storage.",
        isCorrect: false,
        explanation: "This describes a browser storage API, not a React method. `this.setState` operates entirely on the in-memory `this.state` object of a class component and has no access to cookies or `localStorage`."
      },
      {
        id: "C",
        text: "A method that mutates state variables synchronously on the exact same line.",
        isCorrect: false,
        explanation: "Tempting because `this.setState({ count: 1 })` looks like a plain assignment, but the value is not written to `this.state` on that line. React enqueues the update and applies the merge during the next render, so reading `this.state` immediately after the call still returns the old value."
      },
      {
        id: "D",
        text: "A class component method that enqueues updates, shallow-merges them into `this.state`, and triggers a re-render.",
        isCorrect: true,
        explanation: "Correct. `this.setState(partial, callback)` enqueues the partial, React shallow-merges it into `this.state`, and schedules reconciliation of the component subtree."
      }
    ],
    correctAnswer: "D",
    explanation: "`this.setState` is a method available on class components. It accepts a partial state object or an updater function, enqueues that update in React's internal queue, and after the queue is processed, shallowly merges the partial into `this.state` before scheduling a re-render of the component subtree.\n\nIn practice this means you can call `this.setState({ count: this.state.count + 1 })` and then, on the very next line, `this.state.count` still holds the old value. React applies the merge and re-renders later within the same batch. Multiple `setState` calls inside one event handler collapse into a single re-render.\n\nThe merge is shallow: passing `{ user: { name: \"Ada\" } }` replaces the entire `user` object rather than merging `name` into an existing one. The optional second argument, a callback, runs after React has committed the update and the component has re-rendered, which is the reliable place to read the new `this.state`.",
    interviewLine: "I'd explain that `this.setState` enqueues a partial update, React shallow-merges it into `this.state` during the next render, and schedules a re-render of the component subtree \u2014 so `this.state` on the line after the call still holds the old value.",
    misconception: "Treating `this.setState` like a synchronous assignment: calling it and then reading `this.state` on the next line, expecting the new value to already be there.",
    hints: [
      "Look at what `this.state` holds on the line immediately after a `this.setState` call.",
      "Ask whether the merge is applied before or after the current function finishes executing.",
      "The update is enqueued, not written in place; React resolves the queue during the next render."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The `console.log` on the line after `setState` still prints the old value because the merge happens during the next render, not on the calling line.",
      language: "tsx",
      code: "class Counter extends React.Component {\n  state = { count: 0, label: \"zero\" };\n\n  increment = () => {\n    this.setState(\n      (prev) => ({ count: prev.count + 1 }),\n      () => console.log(this.state.count)\n    );\n    console.log(this.state.count); // still 0\n  };\n\n  render() {\n    return <button onClick={this.increment}>{this.state.label}</button>;\n  }\n}"
    }
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
        text: "Disable browser JavaScript execution entirely so the page skips all render and reconciliation overhead and paints only static markup.",
        isCorrect: false,
        explanation: "Tempting if you equate \"less code running\" with \"faster,\" but a React application is JavaScript; turning it off removes the app entirely, not its overhead."
      },
      {
        id: "B",
        text: "Wrap every component in its own dedicated Redux store so that no parent re-render can ever cascade down into its children.",
        isCorrect: false,
        explanation: "Plausible if you think more isolation always helps, but each store subscription adds a listener and a selector call per render, and primitive elements like `<div>` have no state to isolate in the first place."
      },
      {
        id: "C",
        text: "Mutate state objects in place to skip the `setState` call and avoid triggering a re-render.",
        isCorrect: false,
        explanation: "Appeals to the idea that fewer state updates mean fewer renders, but React diffs against the previous render output; if you mutate the object directly, React never sees a new reference, so the UI stays stale and dependent components never update."
      },
      {
        id: "D",
        text: "Use `React.memo` / `useMemo` / `useCallback` for expensive renders/computations, code-split with `React.lazy`/`<Suspense>`, virtualize long lists, and colocate state.",
        isCorrect: true,
        explanation: "Correct. Each tool targets a distinct, measurable cost: render frequency, bundle size, DOM node count, and state-propagation scope, so you fix the specific bottleneck rather than applying one blunt lever."
      }
    ],
    correctAnswer: "D",
    explanation: "React re-renders a component whenever its parent re-renders or its own state changes, even if the output would be identical. The strategies in D target three separate costs: render frequency (`React.memo`, `useMemo`, `useCallback`), initial bundle size (`React.lazy` with `<Suspense>`), and DOM node count (virtualization). Colocating state near the component that reads it limits how many components see a given change.\n\nWithout these tools, typing in a search input re-renders every row in a 10,000-item list, the browser downloads and parses the JS for every route before the first paint, and the DOM holds 10,000 `<li>` elements even though only 20 are visible. Each of those is a measurable, fixable cost that a single targeted tool addresses.\n\nThe trade-off is real: `React.memo` adds a shallow-compare on every render, `useMemo` and `useCallback` add identity bookkeeping, and `React.lazy` defers work until the component is actually needed. Profile with React DevTools Profiler first, then apply the specific tool that addresses the measured bottleneck rather than wrapping everything by default.",
    interviewLine: "I profile with React DevTools first, then apply the specific tool for the bottleneck I measured: `React.memo` to skip a child re-render when its props are referentially equal, `useMemo` to cache a derivation that would otherwise run on every parent render, `React.lazy` to defer a route's chunk until it is actually navigated to, and a virtualization library to keep a 50,000-row list at roughly 20 DOM nodes.",
    misconception: "Optimization is treated as a single global switch (disable JS, add stores everywhere, skip state updates) instead of a set of targeted tools, each addressing a different measurable cost like render frequency, bundle size, or DOM node count.",
    hints: [
      "Think about what actually costs time in a React app: re-rendering a component tree, parsing a large initial JS bundle, or creating thousands of DOM nodes that are off-screen.",
      "Which tool targets which cost? `React.memo` and `useMemo` reduce render frequency, `React.lazy` reduces bundle size, virtualization reduces DOM node count, and state colocation reduces the blast radius of a single update.",
      "The right answer names multiple targeted tools for different bottlenecks rather than one global on/off switch."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useMemo` caches the filtered array so it only recomputes when `rows` or `filter` actually change, and `memo` lets each `ExpensiveRow` skip re-rendering when its `row` prop is referentially identical.",
      language: "tsx",
      code: "import { memo, useMemo } from \"react\";\n\ninterface Row {\n  id: number;\n  label: string;\n}\n\nconst ExpensiveRow = memo(function ExpensiveRow({ row }: { row: Row }) {\n  return <div data-testid={`row-${row.id}`}>{row.label}</div>;\n});\n\nexport function DataTable({ rows, filter }: { rows: Row[]; filter: string }) {\n  const visible = useMemo(\n    () => rows.filter((r) => r.label.toLowerCase().includes(filter.toLowerCase())),\n    [rows, filter]\n  );\n\n  return (\n    <ul>\n      {visible.map((row) => (\n        <ExpensiveRow key={row.id} row={row} />\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Wrap every single integer and string variable in its own global Redux store so each primitive value is tracked independently across the app.",
        isCorrect: false,
        explanation: "Tempting if you equate \"more state management\" with \"more control,\" but a Redux store per primitive means thousands of subscriptions, a new `useSelector` per variable, and a global dispatch round-trip for what a local `useState` handles in one line. It also forces every subscriber to re-render on any unrelated store change, which is the opposite of the isolation you want."
      },
      {
        id: "B",
        text: "Mutate state objects directly in place without calling `setState` or dispatching an action, so React skips the re-render that an update would schedule.",
        isCorrect: false,
        explanation: "Tempting because it looks like a normal variable assignment, but React schedules a re-render only when `setState` (or a reducer dispatch) signals that a value changed. Mutating the object in place leaves the reference identical, so React's diffing sees no change and the UI stays stale."
      },
      {
        id: "C",
        text: "Use `React.memo` and `useMemo` to skip redundant renders and computations, load code with `React.lazy`, and virtualize large lists.",
        isCorrect: true,
        explanation: "Correct. Each technique targets a different source of wasted work: redundant renders, redundant computations, upfront bundle size, DOM node count, and render scope. Together they cover the main axes a junior should name."
      },
      {
        id: "D",
        text: "Disable browser JavaScript execution entirely so the framework never runs its render loop or reconciliation on the client.",
        isCorrect: false,
        explanation: "Tempting only if you treat the framework as the problem rather than the tool, but a React app is JavaScript; turning it off removes interactivity, routing, and rendering altogether. Performance work is about doing less of the right work, not removing the runtime."
      }
    ],
    correctAnswer: "C",
    explanation: "React re-renders a component whenever its state changes or a parent re-renders and passes new props. `React.memo` shallow-compares props and skips the child's render if nothing changed. `useMemo` caches an expensive computation so it only re-runs when its dependency array changes. `useCallback` caches a function reference so children wrapped in `React.memo` don't see a \"new\" prop each render. `React.lazy` with `<Suspense>` defers loading a component's chunk until it mounts. Virtualization (for example `react-window`) renders only the rows visible in the viewport. Colocating state re-renders only that subtree rather than a distant ancestor.\n\nWithout these techniques, a single state change in a top-level component cascades re-renders through every child, even those whose props are identical. For a table with ten thousand rows, diffing all of them on every keystroke causes layout thrash and dropped frames on a phone.\n\nThe trade-off an interviewer will probe: every `useMemo` and `useCallback` adds its own comparison cost on each render. If the wrapped computation is a simple arithmetic expression, memoizing it is slower than computing it inline. `React.memo` also runs a shallow `Object.is` check per prop, so if a parent always passes a freshly created object, the memo adds overhead without saving a render. Profile first, memoize second.",
    interviewLine: "I profile with React DevTools first to find which components actually re-render on a state change, then I add `React.memo` or `useMemo` only where the render cost is measurable, and I keep state as local as possible so an update re-renders the smallest subtree.",
    misconception: "Performance optimization means adding more infrastructure\u2014more stores, more wrappers, more middleware\u2014rather than reducing the number of components that re-render and the amount of DOM the browser must lay out.",
    hints: [
      "Think about what triggers a React component to re-render: a state change or a new prop reference from a parent.",
      "Which React APIs let you skip a child's render, cache a computed value, or defer loading a chunk of code until it is mounted?",
      "The goal is reducing unnecessary work in the render path, not adding another global layer between the component and its data."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `memo` on `Row` skips re-renders when the parent's `unrelated` counter changes, and `useMemo` caches the sort so it does not re-run on every render of `List`.",
      language: "tsx",
      code: "import { memo, useMemo, useState } from \"react\";\n\nconst Row = memo(({ value }: { value: number }) => <li>{value}</li>);\n\nfunction List({ items }: { items: number[] }) {\n  const [unrelated, setUnrelated] = useState(0);\n  const sorted = useMemo(() => [...items].sort((a, b) => a - b), [items]);\n  return (\n    <div>\n      <button onClick={() => setUnrelated((n) => n + 1)}>unrelated: {unrelated}</button>\n      <ul>{sorted.map((v, i) => <Row key={i} value={v} />)}</ul>\n    </div>\n  );\n}\n\nexport default function App() {\n  const [items, setItems] = useState<number[]>([3, 1, 2]);\n  return <List items={items} />;\n}"
    }
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
        text: "A build-time transform that compiles React components into PHP scripts fetched on demand.",
        isCorrect: false,
        explanation: "Tempting if you picture \"lazy\" as a build-time transform, but React runs in the browser and lazy loading uses a runtime dynamic `import()` to fetch a JavaScript chunk, not a compiler emitting PHP."
      },
      {
        id: "B",
        text: "Delaying component state updates by a fixed timeout to reduce CPU load during render.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"deferring\" with \"delaying state,\" but lazy loading controls when a JavaScript file is downloaded over the network; it has no effect on when `setState` takes effect or on CPU scheduling."
      },
      {
        id: "C",
        text: "Defers fetching a component's JavaScript chunk until it first renders, using `React.lazy()` and `<Suspense>`.",
        isCorrect: true,
        explanation: "Correct. `React.lazy()` wraps a dynamic `import()` so the component's code chunk is fetched only when the component first renders, and `<Suspense>` shows a fallback until the promise resolves, keeping the initial bundle small."
      },
      {
        id: "D",
        text: "Eagerly loading all application assets synchronously in `<head>` before the page first paints.",
        isCorrect: false,
        explanation: "Tempting if you think of \"loading\" as a single upfront event, but lazy loading is the opposite strategy: it splits the bundle into chunks and fetches each one on demand rather than pulling everything synchronously before the page paints."
      }
    ],
    correctAnswer: "C",
    explanation: "Lazy loading in React means the JavaScript code for a component is not downloaded with the initial bundle. `React.lazy()` wraps a dynamic `import()` call and returns a component; when that component first enters the render tree, React triggers the import, fetches the chunk, and renders it. `<Suspense>` wraps the lazy component and displays a fallback while the promise is pending.\n\nIn practice this shrinks the initial payload. A user who lands on a marketing page never downloads the analytics dashboard code, so first paint and time-to-interactive improve. The trade-off is a brief fallback flash the first time the user navigates to a lazy route.\n\nTwo details an interviewer will probe: `React.lazy` only accepts a default export, and the fetch is triggered by first render, not by a scroll position or a timer. If the component unmounts before the chunk arrives, the import still completes in the background but the result is discarded.",
    interviewLine: "I use `React.lazy()` to wrap a dynamic `import()`, so the component's code chunk is not downloaded until that component first renders. `<Suspense>` handles the in-flight window by showing a fallback, which keeps my initial bundle small without blocking the rest of the page.",
    misconception: "Treating lazy loading as a timing mechanism for state updates or renders, when it is actually about deferring the network fetch of a JavaScript chunk until the component first enters the render tree.",
    hints: [
      "Look at what `React.lazy()` actually wraps: a function that returns a promise from `import()`.",
      "Ask what triggers the fetch \u2014 a timer, a scroll position, or the component entering the render tree?",
      "It is not about delaying state or render timing; it is about when the JavaScript file hits the network."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "The Dashboard chunk is only fetched when `<Dashboard />` first appears in the render tree, not when the module is referenced at the top of the file.",
      language: "tsx",
      code: "import { lazy, Suspense } from \"react\";\n\nconst Dashboard = lazy(() => import(\"./Dashboard\"));\n\nexport function App() {\n  return (\n    <main>\n      <h1>Home</h1>\n      <Suspense fallback={<p>Loading dashboard\u2026</p>}>\n        <Dashboard />\n      </Suspense>\n    </main>\n  );\n}"
    }
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
        text: "Forcing a component to re-render 60 times per second so its cached output always reflects the newest frame of application state.",
        isCorrect: false,
        explanation: "The exact opposite of what memoization does. Memoization exists to skip work that would otherwise repeat; it never schedules, throttles, or forces renders."
      },
      {
        id: "B",
        text: "Automatically deleting unused variables from JavaScript runtime memory once no component references them anymore, like a manual garbage collector.",
        isCorrect: false,
        explanation: "This describes garbage collection, which reclaims unreachable objects. Memoization does the inverse: it deliberately keeps a computed value alive in a closure so you can reuse it instead of recomputing."
      },
      {
        id: "C",
        text: "Storing user passwords and session tokens permanently in unencrypted browser cookies so they survive a page reload without a server call.",
        isCorrect: false,
        explanation: "Memoization is an in-memory, per-render optimization scoped to a component or hook. It has no relationship to persistent browser storage, cookies, or credential handling."
      },
      {
        id: "D",
        text: "Caching the result of expensive calculations (`useMemo`), function references (`useCallback`), or component render outputs (`React.memo`) to avoid redundant work.",
        isCorrect: true,
        explanation: "Correct. All three APIs share the same principle: if the inputs have not changed since the last render, return the cached result instead of doing the work again."
      }
    ],
    correctAnswer: "D",
    explanation: "Memoization in React means caching a result so that when the same inputs are encountered again, you return the cached value instead of recomputing. React provides three tools for this: `useMemo` caches a computed value, `useCallback` caches a function reference (it is `useMemo` applied to a function without invoking it), and `React.memo` caches a component's render output and skips re-rendering when props are referentially equal.\n\nIn practice this matters when a parent re-renders frequently \u2014 say, on every keystroke in a search input \u2014 and a child component or a derived array is expensive to produce. Without memoization that work repeats on every parent render even though nothing the child depends on changed. With `React.memo` or `useMemo`, subsequent renders with identical inputs are skipped.\n\nThe nuance an interviewer will probe: memoization is not free. React must compare dependencies or props on every render, and `React.memo` adds a shallow-compare cost. If the computation is trivial or the component re-renders rarely, the overhead of the check outweighs the savings. Memoization is a targeted trade-off, not a blanket optimization you apply everywhere.",
    interviewLine: "Memoization is caching a result keyed on its inputs so repeated work is skipped. In React that maps to `useMemo` for derived values, `useCallback` for stable function references, and `React.memo` for skipping a child render when props are unchanged. I'd always flag that it is a trade-off \u2014 the dependency comparison is paid every render, so it only helps when the computation is genuinely expensive relative to that check.",
    misconception: "Treating memoization as a general \"make React faster\" switch. In reality `useMemo` does not prevent the parent from re-rendering; it only skips the recomputation inside that render. `React.memo` is the one that can skip a child's render entirely. Conflating the two leads to adding `useMemo` where `React.memo` is needed, or vice versa.",
    hints: [
      "Think about what happens when a parent component re-renders but a child's props have not actually changed.",
      "Ask yourself: what does React do with the result of an expensive calculation if the inputs are identical to the previous render?",
      "The word \"memo\" comes from memory \u2014 it is about remembering a result, not about scheduling renders or managing heap allocation."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "`React.memo` skips the child's render because `ITEMS` is a module-level constant with a stable reference, even though `App` re-renders on every click.",
      language: "tsx",
      code: "import { memo, useState } from \"react\";\n\nconst ExpensiveList = memo(function ExpensiveList({ items }: { items: string[] }) {\n  console.log(\"ExpensiveList rendered\");\n  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;\n});\n\nconst ITEMS = [\"alpha\", \"beta\", \"gamma\"];\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>\n        Count: {count}\n      </button>\n      <ExpensiveList items={ITEMS} />\n    </div>\n  );\n}"
    }
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
        text: "useState persists all of a component's data to the browser's localStorage automatically, so the values survive a full page reload without extra code.",
        isCorrect: false,
        explanation: "Tempting if you conflate React state with browser storage, but useState keeps values in memory for the lifetime of the component. Nothing touches localStorage unless you explicitly call it yourself."
      },
      {
        id: "B",
        text: "useState only accepts primitive numbers and booleans; passing an object or array throws a type error.",
        isCorrect: false,
        explanation: "Tempting if you picture state as a single scalar, but useState is generic over any JavaScript value. Objects, arrays, Maps, and functions all work; you just replace the reference rather than mutating in place."
      },
      {
        id: "C",
        text: "useState gives local, per-component state where the setter schedules a re-render instead of mutating the current variable, and updater callbacks read the latest queued value.",
        isCorrect: true,
        explanation: "Correct. useState returns a snapshot value and a setter that queues a re-render; the updater form guarantees each step sees the previous step's result, which is the mechanism that prevents lost updates in batched or rapid sequences."
      },
      {
        id: "D",
        text: "useState reassigns the state variable synchronously on the same line, so the next statement in the handler already sees the new value.",
        isCorrect: false,
        explanation: "Tempting because you expect setCount(5) to make count equal 5 immediately, but the variable in the current render closure is a fixed snapshot. The new value only appears on the next render, so any code that reads count in the same handler still sees the old one."
      }
    ],
    correctAnswer: "C",
    explanation: "useState is a built-in hook that gives a functional component a piece of local state. You call it once at the top level and it returns a pair: the current value and a setter function. The setter does not mutate the variable in the current render; it records a new value and schedules a re-render.\n\nThis matters when you update state based on the previous value. If you write setCount(count + 1) twice in the same event handler, both calls read the same `count` from the closure, so you only get +1. The updater form setCount(p => p + 1) receives the latest queued value at the time React processes it, so two calls correctly produce +2.\n\n\"State is immutable\" here means you never do count += 1 or push into an array stored in state. You always hand the setter a brand-new value. The component's displayed data can change across renders, but the variable in any single render is a fixed snapshot you cannot reassign.",
    interviewLine: "useState gives me a per-render snapshot and a setter that queues a re-render; I never read the updated value in the same handler, so for dependent updates I use the functional updater form to chain correctly.",
    misconception: "Calling the setter immediately changes the variable you already read in the current render, so consecutive updates each see the previous update's result.",
    hints: [
      "Look at what happens to the variable `count` in the current render after you call `setCount`.",
      "Ask: does the setter mutate the variable in the closure, or does it record a value for a future render?",
      "Two consecutive setCount(count + 1) calls read the same snapshot; the updater form is the fix."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useState",
    example: {
      caption: "Notice how both direct calls read the same `count` snapshot, while the updater form chains correctly.",
      language: "tsx",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n\n  function incrementTwice() {\n    setCount(count + 1);\n    setCount(count + 1); // still count + 1, not count + 2\n  }\n\n  function incrementTwiceSafe() {\n    setCount(p => p + 1);\n    setCount(p => p + 1); // correctly accumulates to +2\n  }\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={incrementTwice}>+1 (buggy)</button>\n      <button onClick={incrementTwiceSafe}>+2 (correct)</button>\n    </div>\n  );\n}"
    }
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
        text: "Keys must be regenerated with `Math.random()` on every render pass to guarantee uniqueness.",
        isCorrect: false,
        explanation: "Tempting if you equate \"unique\" with \"fresh each time,\" but a new random key on every render tells React that every item is a brand-new element, so it unmounts and remounts every row, resetting all local state and destroying any in-flight animation."
      },
      {
        id: "B",
        text: "Keys must be globally unique across all websites on the internet to prevent collisions.",
        isCorrect: false,
        explanation: "This reads \"unique\" as a universal constraint, but React only compares keys among the children of a single parent array. The same key string can appear in two completely different lists with no conflict."
      },
      {
        id: "C",
        text: "Keys give list elements stable identities across renders; unique IDs from data prevent state mixing during reorders, unlike array indices.",
        isCorrect: true,
        explanation: "Correct. A stable key is React's identity token: it lets reconciliation match the right old element to the right new one, so component state, DOM mutations, and event listeners travel with the correct item even when the array is reordered or filtered."
      },
      {
        id: "D",
        text: "Keys are required to encrypt list item data against XSS vulnerabilities in the rendered output.",
        isCorrect: false,
        explanation: "This conflates the word \"key\" with a cryptographic key. React's `key` is purely a reconciliation hint; it never touches data encoding, sanitisation, or any security boundary."
      }
    ],
    correctAnswer: "C",
    explanation: "Keys are an attribute React reads during reconciliation to match children between renders. When React diffs a list, it compares each child's key in the new array against the keys in the previous array. A matching key means React reuses the existing DOM node and component instance; a key that disappeared means React unmounts it; a new key means React mounts a fresh instance.\n\nIn practice, if you key by array index and the user reorders the list, React thinks the item at position 0 is still the same item. Any local state \u2014 an input's draft text, a scroll offset, an animation frame \u2014 stays welded to the wrong row. Keying by a stable `id` from your data lets React move the DOM node and its state to the new position correctly.\n\nTwo nuances an interviewer may probe: keys only need to be unique among siblings in the same array, so the same string can appear as a key in two unrelated lists. And React strips the `key` prop before it reaches your component, so `props.key` inside a list item is always `undefined`.",
    interviewLine: "I key list items by a stable `id` from my data rather than the array index, because during reconciliation React uses the key to match old and new children; if I index and then reorder, React reuses the wrong component instance and its local state \u2014 an input draft, a scroll position \u2014 ends up on the wrong row.",
    misconception: "Keys are treated as a performance optimisation that lets React \"skip re-rendering unchanged items,\" when they are actually an identity mechanism: they decide which DOM node and component instance corresponds to which data item, and getting that mapping wrong causes state to attach to the wrong row.",
    hints: [
      "What does React do with a child whose key appears in the new array but not the old one, and vice versa?",
      "If a component inside a list item holds local state like an input value, what happens to that state when React unmounts and remounts the item?",
      "The uniqueness requirement for keys has a narrower scope than \"every key in the app must be different.\""
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    example: {
      caption: "Index-as-key causes the draft text to follow the position rather than the data, so reordering the array swaps in-progress edits between rows.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Row({ text }: { text: string }) {\n  const [draft, setDraft] = useState(text);\n  return (\n    <input value={draft} onChange={(e) => setDraft(e.target.value)} />\n  );\n}\n\nfunction Editor({ items }: { items: string[] }) {\n  // Bug: index as key \u2014 reordering swaps drafts between rows\n  return items.map((text, i) => <Row key={i} text={text} />);\n}\n\nexport default Editor;"
    }
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
        text: "Controlled components are restricted to mobile browsers; uncontrolled components are restricted to desktop browsers.",
        isCorrect: false,
        explanation: "Tempting if you conflate the word 'controlled' with some platform-specific input mode, but `value`/`onChange` and `ref`/`defaultValue` behave identically in every browser and on every platform. React's input model has no platform gate."
      },
      {
        id: "B",
        text: "Controlled components cannot be cleared after form submission because React locks the `value` prop.",
        isCorrect: false,
        explanation: "Tempting if you imagine `value` as a one-time assignment, but `value` is just a prop that re-renders with whatever state you pass. Calling `setValue('')` on submit resets the field exactly like an uncontrolled `form.reset()`."
      },
      {
        id: "C",
        text: "Controlled components store the input value in React state via `value` and `onChange`; uncontrolled components leave the value in the DOM and read it via `ref` or `defaultValue`.",
        isCorrect: true,
        explanation: "Correct. This captures the two mechanisms accurately: React state as source of truth versus browser-managed DOM state, and the practical scenarios where each pattern is the better fit."
      },
      {
        id: "D",
        text: "Uncontrolled components cause roughly ten times more re-renders than controlled components because the browser fires extra events.",
        isCorrect: false,
        explanation: "Tempting if you assume the browser's event loop adds overhead, but it is the opposite: an uncontrolled input triggers zero React re-renders per keystroke, while a controlled one calls `setState` and re-renders on every change. The '10x' figure has no basis in React's rendering model."
      }
    ],
    correctAnswer: "C",
    explanation: "A controlled component keeps the input's value in React state. You bind `value` to a state variable and write back in `onChange`, so React is the single source of truth for what the user typed. An uncontrolled component does the opposite: the browser owns the value, you set an initial value with `defaultValue` (or leave it empty), and you read the current value from a `ref` at submit time.\n\nThe practical difference is re-render cost. Every keystroke in a controlled input calls `setState`, schedules a re-render, and re-runs the render function. An uncontrolled input produces zero re-renders per keystroke because no React state changes. In a form with ten text fields, that is the difference between ten re-renders per character and none.\n\nControlled inputs shine when you need per-keystroke validation, conditional field disabling, or interdependent fields. Uncontrolled inputs are the natural fit for `<input type=\"file\">` (whose `value` is read-only in the DOM) and for handing a `FormData` object to a non-React library. Libraries like React Hook Form default to uncontrolled inputs with `ref` registration to keep re-render counts low while still supporting async validation.",
    interviewLine: "Controlled inputs make React state the source of truth, so every keystroke triggers a re-render but I get per-keystroke validation and dynamic field logic for free. Uncontrolled inputs skip that re-render cost because the browser owns the value, and I read it from a `ref` at submit time, which is the right call for file inputs and high-field-count forms.",
    misconception: "Thinking of `value` as a one-time DOM attribute rather than a prop React re-evaluates on every render, which leads to believing controlled inputs are 'locked' or that uncontrolled inputs somehow generate more work.",
    hints: [
      "Which component owns the input's value: React state or the browser's DOM?",
      "Follow what happens on each keystroke in both patterns \u2014 does `setState` get called, or does the DOM just update itself?",
      "The platform and re-render-count claims in the other options contradict how `value`, `onChange`, and `ref` actually work in any browser."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input",
    example: {
      caption: "Typing in the `input` calls `setName` and re-renders the component, while typing in the `textarea` only updates the DOM and produces no re-render until submit.",
      language: "tsx",
      code: "import { useRef, useState } from \"react\";\n\nexport function ProfileForm() {\n  const [name, setName] = useState(\"\");\n  const bioRef = useRef<HTMLTextAreaElement>(null);\n\n  function handleSubmit(e: React.FormEvent) {\n    e.preventDefault();\n    console.log({ name, bio: bioRef.current?.value ?? \"\" });\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <textarea ref={bioRef} defaultValue=\"\" rows={3} />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
    }
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
        text: "Inline styles can handle `@keyframes` and `:hover` just like a stylesheet.",
        isCorrect: false,
        explanation: "Incorrect. The `style` prop only accepts a flat object of CSS properties for a single element. It cannot define pseudo-classes, keyframes, or media queries, which require a stylesheet context."
      },
      {
        id: "B",
        text: "Styling React requires modifying the browser's C++ source code directly.",
        isCorrect: false,
        explanation: "Incorrect. React renders standard HTML into the DOM. Styling is applied via CSS files, Modules, or utility classes; browser source code is never involved."
      },
      {
        id: "C",
        text: "React forbids external CSS stylesheets in production environments.",
        isCorrect: false,
        explanation: "Incorrect. There is no such restriction. Next.js bundles global and module CSS files, and external `<link>` tags work identically in development and production."
      },
      {
        id: "D",
        text: "Global CSS, CSS Modules, Tailwind, and CSS-in-JS each trade off scoping, bundle size, and runtime cost differently.",
        isCorrect: true,
        explanation: "Correct. Each paradigm sits at a different point on the build-time-versus-runtime axis, with distinct trade-offs in scoping, bundle size, prop reactivity, and injection cost."
      }
    ],
    correctAnswer: "D",
    explanation: "D names the four styling paradigms in a React project and each one's core trade-off. Global CSS is the simplest option but has no scoping, so class names collide across components. CSS Modules hash class names at build time, giving uniqueness with zero runtime JavaScript. Tailwind generates a small set of utility classes during a PostCSS build step. CSS-in-JS libraries inject `<style>` tags at render time so styles can read props.\n\nThe choice changes what you can express. A `:hover` rule or a media query needs a stylesheet context, so an inline `style` prop cannot cover them. A CSS Module file compiles `.title` into a hashed name like `title_3a7f2c`, preventing another component's `.title` from leaking in. Tailwind's purge step removes unused utilities, keeping shipped CSS small. CSS-in-JS can write `background: ${props.color}` but pays a small cost of generating and injecting a style tag per render.\n\nIn Next.js App Router, any file ending in `.module.css` is scoped automatically, and `app/globals.css` is injected into every page. CSS-in-JS libraries require a `\"use client\"` directive because they call `useId` and mutate the DOM during render. An interviewer will probe whether you see scoping as a build-time concern (Modules, Tailwind) versus a runtime concern (CSS-in-JS), and that the cost model follows from that split.",
    interviewLine: "I pick the approach based on what the component needs: CSS Modules for scoped static styles with zero runtime cost, Tailwind when the team prefers utility classes and we want a lean bundle, and CSS-in-JS only when styles genuinely depend on props and I accept the small per-render injection cost.",
    misconception: "Treating all four approaches as interchangeable and assuming the \"most modern\" one (CSS-in-JS) is automatically the right choice, when the real distinction is whether the styling logic must exist at build time or at runtime, and what CSS constructs each context can express.",
    hints: [
      "Look at where each approach does its work: at build time or at render time.",
      "Ask which CSS constructs each approach can express: pseudo-classes, media queries, prop-driven values.",
      "The trap is assuming one approach dominates; each covers a different subset of the problem and they often coexist in one project."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `:hover` lives in the CSS Module (a stylesheet context) while the dynamic color goes through the inline `style` prop, showing the two concerns split naturally.",
      language: "tsx",
      code: "import styles from \"./button.module.css\";\n\ninterface ButtonProps {\n  accent: string;\n  label: string;\n}\n\nexport function Button({ accent, label }: ButtonProps) {\n  return (\n    <button className={styles.primary} style={{ background: accent }}>\n      {label}\n    </button>\n  );\n}"
    }
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
        text: "Subscribe to `window.resize` in `useEffect`, batch updates via `requestAnimationFrame`, and remove the listener on cleanup.",
        isCorrect: true,
        explanation: "Correct. Subscribing in `useEffect`, throttling with `requestAnimationFrame`, and cleaning up is the standard pattern for reacting to viewport changes without excessive re-renders or leaked listeners."
      },
      {
        id: "B",
        text: "Poll `window.innerWidth` in a synchronous `while` loop on the main thread, blocking all rendering until the value changes.",
        isCorrect: false,
        explanation: "Tempting if you think of it as 'just checking a value,' but a tight `while` loop blocks the main thread entirely: no React render, no paint, and no user input can run until the loop exits, which it never will if the size has not changed."
      },
      {
        id: "C",
        text: "Resize events cannot be handled in React because they are not part of the component lifecycle or props system.",
        isCorrect: false,
        explanation: "This assumes React only reacts to its own state and props, but `useEffect` exists precisely to subscribe to external browser events like `resize`, `scroll`, or `focus`. The event fires outside React, and the effect bridges it into a `setState` call."
      },
      {
        id: "D",
        text: "Call `window.location.reload()` inside the resize handler so the full page re-renders at the new viewport size.",
        isCorrect: false,
        explanation: "A full page load does pick up the new dimensions, but it destroys every piece of client state, re-fetches all data, and fires on every resize tick during a drag, making the page unusable."
      }
    ],
    correctAnswer: "A",
    explanation: "The correct approach is to subscribe to `window.resize` inside `useEffect`, throttle the handler with `requestAnimationFrame` so you call `setState` at most once per animation frame, and remove the listener in the effect's cleanup function. The browser fires `resize` as a discrete event whenever the viewport dimensions change, so you never need to poll.\n\nWithout the throttle, dragging a window edge fires the event dozens of times per second and each call to `setState` schedules a re-render. Collapsing them into one update per frame with `requestAnimationFrame` keeps the render count proportional to what the user actually sees. Without the cleanup, the listener keeps firing after the component unmounts, holding a reference to the component closure and leaking memory.\n\nIn server-side rendering or a test environment, `window` is undefined, so the hook must initialize state to a safe default and guard the listener registration. Also, every component that calls the hook re-renders on each size change, so scope the call to the component that actually reads the value rather than hoisting it to a top-level provider.",
    interviewLine: "I subscribe to `window.resize` in a `useEffect`, throttle the handler with `requestAnimationFrame` so I only call `setState` once per frame, and remove the listener in cleanup. That gives me one re-render per visible frame change instead of dozens per second, and no leaked listeners after unmount.",
    misconception: "React has no built-in 'responsive' API, so candidates either reach for polling or assume the framework cannot observe viewport changes at all, when in fact `useEffect` is the standard bridge to any browser event.",
    hints: [
      "How does a React component subscribe to a browser event that fires outside the render tree?",
      "If `resize` fires 60 times per second during a drag, what does each `setState` call cost, and how do you reduce the count?",
      "You do not need to poll a value or reload the page; the browser already emits a discrete event when the size changes."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Notice that `matchMedia` delegates the threshold comparison to the browser, so the hook only re-renders when the breakpoint is actually crossed, not on every pixel of resize.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\nfunction useMediaQuery(query: string): boolean {\n  const [matches, setMatches] = useState(false);\n\n  useEffect(() => {\n    const mql = window.matchMedia(query);\n    setMatches(mql.matches);\n    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);\n    mql.addEventListener(\"change\", onChange);\n    return () => mql.removeEventListener(\"change\", onChange);\n  }, [query]);\n\n  return matches;\n}\n\nfunction Header() {\n  const isMobile = useMediaQuery(\"(max-width: 600px)\");\n  return <nav className={isMobile ? \"nav-mobile\" : \"nav-desktop\"} />;\n}"
    }
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
        text: "Installing a React hook automatically uninstalls Redux from the project, since the two cannot coexist in the same `node_modules` tree.",
        isCorrect: false,
        explanation: "Tempting if you read \"replace\" as a destructive action, but installing a React hook has no effect on other packages in `node_modules` or the registry; `react-redux` simply exposes `useSelector` and `useDispatch` as hooks that read from an existing store."
      },
      {
        id: "B",
        text: "Use `useReducer` with `useContext` for simple shared state; switch to Redux Toolkit when you need middleware, time-travel, or selector-based re-render control.",
        isCorrect: true,
        explanation: "Correct. `useReducer` + `useContext` covers state shared by a handful of components with no middleware or devtools requirements, while Redux Toolkit adds a middleware pipeline, time-travel, and `useSelector` memoization that become necessary as consumer count and async complexity grow."
      },
      {
        id: "C",
        text: "The Context API is always at least 100x faster than Redux because it has fewer abstraction layers and ships no extra runtime code.",
        isCorrect: false,
        explanation: "Tempting if you assume fewer layers means fewer re-renders, but without selectors every Context consumer re-renders on any state change, whereas Redux's `useSelector` with a narrow selector prevents that; the \"100\u00d7\" figure has no basis in either library's implementation."
      },
      {
        id: "D",
        text: "`useState` can only hold primitive values, so any object or array state must be moved into a Redux store to be managed correctly.",
        isCorrect: false,
        explanation: "Tempting if you conflate reference identity with a type restriction, but `useState` accepts any JavaScript value including objects and arrays; the real limitation is that replacing a reference triggers re-renders, which `useReducer` and selectors help manage, not a ban on non-primitive types."
      }
    ],
    correctAnswer: "B",
    explanation: "`useReducer` pairs a reducer function with a `dispatch` call, keeping state transitions in one place. Wrap the pair in `useContext` and any component in the subtree can read or update the state without prop drilling. For a cart, a theme toggle, or a three-to-five component feature, that is the full solution. Redux Toolkit layers a global store on top of the same reducer pattern, then adds a middleware pipeline (thunk, RTK Query), time-travel in the browser devtools, and `useSelector`, which memoizes re-renders so only components reading a changed slice update.\n\nThe practical difference shows up in re-render cost. Without selectors, every Context consumer re-renders on every state change. A form with twenty inputs inside one Context provider re-renders all twenty on each keystroke. Redux's `useSelector` with a narrow selector, such as `state.cart.items.length`, skips re-renders for components that only read a different slice.\n\nThe decision boundary is not the size of the state object but the combination of consumer count, async or middleware needs, and whether you want time-travel debugging. A small slice with complex data-fetching logic is a legitimate reason to use RTK Query, while a large object shared by two components is not.",
    interviewLine: "I reach for `useReducer` with `useContext` when three or four components share state and I need no middleware; the moment I want time-travel, an async thunk, or `useSelector` to stop every consumer re-rendering on each update, I move that slice into Redux Toolkit.",
    misconception: "The deciding factor is the size of the state object, when it is actually the combination of consumer count, middleware needs, and re-render isolation that determines whether a local reducer is sufficient or a global store earns its complexity.",
    hints: [
      "Ask how many components actually read or write the state, and whether any of them need to skip re-renders when an unrelated part of the state changes.",
      "What happens to every consumer of a Context value the moment one field of that value updates?",
      "The limitation is not the type of data you can store in a hook, but how many components re-render when that data changes."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice how every component calling `useCart` re-renders on any cart change, which is fine for a few consumers but becomes the reason to reach for Redux selectors at scale.",
      language: "tsx",
      code: "import { createContext, useContext, useReducer } from \"react\";\n\ntype Cart = { items: string[] };\ntype Action = { type: \"ADD\"; item: string } | { type: \"CLEAR\" };\n\nfunction cartReducer(state: Cart, action: Action): Cart {\n  switch (action.type) {\n    case \"ADD\":\n      return { items: [...state.items, action.item] };\n    case \"CLEAR\":\n      return { items: [] };\n  }\n}\n\nconst CartCtx = createContext<{ state: Cart; dispatch: React.Dispatch<Action> } | null>(null);\n\nexport function CartProvider({ children }: { children: React.ReactNode }) {\n  const [state, dispatch] = useReducer(cartReducer, { items: [] });\n  return <CartCtx.Provider value={{ state, dispatch }}>{children}</CartCtx.Provider>;\n}\nexport function useCart() {\n  const ctx = useContext(CartCtx);\n  if (!ctx) throw new Error(\"useCart must be inside CartProvider\");\n  return ctx;\n}"
    }
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
        text: "Run all React rendering calculations inside `eval()` statements to skip the virtual DOM and reduce per-frame overhead.",
        isCorrect: false,
        explanation: "Tempting if you conflate dynamic code with fast code, but `eval()` disables the JIT compiler's inlining and optimization passes, introduces a security surface, and React's reconciler never calls into `eval` for component rendering."
      },
      {
        id: "B",
        text: "Profile with React DevTools Profiler, memoize heavy computations (`useMemo`), stabilize callbacks (`useCallback`), wrap pure components (`React.memo`), virtualize long lists, and split bundles.",
        isCorrect: true,
        explanation: "Correct. Each step targets a verified bottleneck: the profiler identifies wasted renders, memoization and stable references eliminate them, virtualization caps DOM nodes, and code splitting shrinks the initial payload."
      },
      {
        id: "C",
        text: "Delete all React components and rewrite the entire app in raw vanilla HTML files to eliminate framework overhead entirely.",
        isCorrect: false,
        explanation: "Appeals if you blame the framework for slowness, but vanilla HTML has no reconciliation, no state-driven re-rendering, and no component boundary to scope updates to, so you lose the very mechanism that makes targeted optimization possible."
      },
      {
        id: "D",
        text: "Apply `useMemo` to every single function and arithmetic addition in the app before profiling to guarantee maximum cache hits.",
        isCorrect: false,
        explanation: "Tempting as a set-and-forget strategy, but `useMemo` stores the previous value and runs a dependency comparison on every render; for a simple `a + b` that bookkeeping costs more than the addition itself, and the blanket approach hides the real bottleneck you would have found in the profiler."
      }
    ],
    correctAnswer: "B",
    explanation: "The correct approach starts with measurement. React DevTools Profiler shows which components re-render, how long each render takes, and which updates are unnecessary. You identify the actual bottleneck before reaching for a fix.\n\nEach technique in the checklist addresses a specific, verified problem. `useMemo` caches an expensive computation so it only re-runs when its dependencies change. `useCallback` gives a child a stable function reference so `React.memo` can skip its re-render. Virtualization (react-window) renders only the visible rows of a 10,000-item list. Code splitting via `React.lazy` and dynamic `import()` keeps the initial bundle small.\n\nThe nuance: memoization has its own cost. `useMemo` stores the previous value and runs a shallow comparison on every render. For a simple addition or a small string concat, that overhead exceeds the computation you saved. An interviewer will ask when NOT to memoize, and the honest answer is when the computation is cheap and the reference stability is not needed by a memoized child.",
    interviewLine: "I open the Profiler, find which components re-render and why, then apply the narrowest fix: `useMemo` for the expensive computation, `useCallback` plus `React.memo` for the child that re-renders for nothing, virtualization if the list is long, and a dynamic import if the chunk is too large. I do not memoize a one-line addition.",
    misconception: "Performance optimization is a fixed checklist to apply uniformly to every component, rather than a measurement-driven process where each tool solves a specific, verified problem.",
    hints: [
      "The first word in the correct approach is a verb you would run in Chrome DevTools, not a React hook.",
      "Ask whether each optimization in the list addresses a different kind of bottleneck: render cost, DOM size, or network payload.",
      "A technique that adds per-render bookkeeping is counterproductive when the thing it wraps is cheaper than the bookkeeping itself."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice that `useMemo` wraps only the sort, `useCallback` exists only because `Row` is wrapped in `memo`, and the rest of the code is left alone.",
      language: "tsx",
      code: "import { useMemo, useCallback, memo } from \"react\";\n\nfunction ExpensiveTable({ rows }: { rows: number[] }) {\n  const sorted = useMemo(() => [...rows].sort((a, b) => b - a), [rows]);\n  const onRowClick = useCallback((id: number) => console.log(\"row\", id), []);\n  return (\n    <tbody>\n      {sorted.slice(0, 50).map((v, i) => (\n        <Row key={i} value={v} onClick={onRowClick} />\n      ))}\n    </tbody>\n  );\n}\n\nconst Row = memo(function Row({\n  value,\n  onClick,\n}: {\n  value: number;\n  onClick: (id: number) => void;\n}) {\n  return <tr onClick={() => onClick(value)}>{value}</tr>;\n});"
    }
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
        text: "React components can only be styled through native browser Flash animations loaded as a plugin alongside the component tree.",
        isCorrect: false,
        explanation: "Adobe Flash was discontinued in 2020 and never integrated with React or the DOM. Styling in React works through CSS (modules, utility classes, or CSS-in-JS) applied via the `className` or `style` attribute, not through a plugin-based animation runtime."
      },
      {
        id: "B",
        text: "React requires every style rule to be written as rows in a SQL database table and queried at render time to produce the CSS.",
        isCorrect: false,
        explanation: "SQL is a query language for relational databases; it has no mechanism to emit visual properties to a browser. React styles are declared in CSS files, CSS Modules, utility-class frameworks, or CSS-in-JS libraries, all of which produce CSS that the browser's rendering engine consumes."
      },
      {
        id: "C",
        text: "Styling can only be applied by concatenating raw inline strings and writing them into the page with `document.write` on each render.",
        isCorrect: false,
        explanation: "`document.write` overwrites the entire document stream and is incompatible with React's virtual-DOM reconciliation. React sets styles through the `className` prop (which maps to the `class` attribute) or the `style` prop (which maps to `element.style`), both of which are safe, declarative, and diffable."
      },
      {
        id: "D",
        text: "Choose CSS Modules or Tailwind for zero-runtime performance-critical apps; choose CSS-in-JS (styled-components) when dynamic runtime props-driven theming is required.",
        isCorrect: true,
        explanation: "Correct. CSS Modules and Tailwind produce a static stylesheet at build time with no runtime JS cost, while CSS-in-JS trades that bundle-size savings for the ability to compute style values from arbitrary props at render time."
      }
    ],
    correctAnswer: "D",
    explanation: "D is correct because CSS Modules and Tailwind compile to a static .css file at build time, adding zero JavaScript to the bundle. styled-components and Emotion, by contrast, execute JavaScript at render to compute style strings and inject them into a <style> tag, which is what lets a component read an arbitrary prop and produce a unique color, radius, or spacing value.\n\nIn a Next.js App Router project, a dashboard of 200 components with fixed layouts ships less JS and paints faster when every style lives in a CSS Module or a Tailwind utility class. The moment a design system passes a theme object through context and every component computes its palette from that object, you need the runtime JS that CSS-in-JS provides, because no static file can enumerate every prop combination.\n\nThe tradeoff an interviewer will probe: CSS-in-JS adds a runtime dependency, can cause a flash of unstyled content if the script loads late, and in Next.js App Router requires the library to be wrapped in a client component. CSS Modules are supported natively by both React and Next.js with no extra package, and Tailwind's JIT compiler emits only the utilities you actually use, keeping the CSS file small.",
    interviewLine: "I default to CSS Modules or Tailwind because they compile to a static stylesheet with zero runtime JS. I reach for styled-components only when a component's styles depend on arbitrary prop values\u2014like a theme object from context\u2014that I can't enumerate as distinct class names at build time.",
    misconception: "Assuming React needs a single universal styling mechanism, or that runtime JavaScript is always required to make styles appear. In practice most production apps ship static CSS (modules or utility classes) and reach for CSS-in-JS only when a component's computed styles depend on prop values that cannot be enumerated at build time.",
    hints: [
      "Ask whether the style value is fixed at build time or computed from a prop at render time.",
      "CSS Modules and Tailwind emit a .css file the browser caches; CSS-in-JS executes JS on every render to build a style string.",
      "Flash, SQL, and `document.write` are not styling mechanisms in any modern React application."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the only runtime work is selecting a class name; the actual CSS lives in a static file the browser parses and caches independently of JavaScript.",
      language: "tsx",
      code: "import styles from \"./Button.module.css\";\n\ninterface ButtonProps {\n  tone: \"primary\" | \"danger\" | \"ghost\";\n  children: React.ReactNode;\n}\n\nexport function Button({ tone, children }: ButtonProps) {\n  return (\n    <button className={styles[tone]} type=\"button\">\n      {children}\n    </button>\n  );\n}"
    }
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
        text: "Disable rendering for the entire component tree to eliminate all work.",
        isCorrect: false,
        explanation: "Tempting if you equate 'fewer renders' with 'zero renders', but a React application must render to paint pixels, manage effects, and respond to events. Disabling rendering entirely produces a blank screen and breaks every interaction."
      },
      {
        id: "B",
        text: "Mutate state variables directly instead of calling setter functions.",
        isCorrect: false,
        explanation: "Tempting if you read setState as an expensive operation you want to skip, but React schedules a re-render precisely because a setter was called. Mutating a variable directly leaves the UI showing the old value, and concurrent features such as transitions and Suspense rely on the setter to know what changed."
      },
      {
        id: "C",
        text: "Memoize pure components, stabilize prop references, and colocate state.",
        isCorrect: true,
        explanation: "Correct. React.memo's shallow prop comparison only skips a render when every reference is identical, so useMemo and useCallback keep those references stable; colocating state limits the re-render to the smallest subtree; and children-as-slots avoids passing a new data object through the wrapper."
      },
      {
        id: "D",
        text: "Pass inline object literals to memoized children to ensure fresh data.",
        isCorrect: false,
        explanation: "Tempting because the values look identical each render, but React.memo compares references with ===, not deep value equality. A new object literal is a new reference every render, so the shallow check fails and the child re-renders, defeating the memo entirely."
      }
    ],
    correctAnswer: "C",
    explanation: "React.memo wraps a function component and, before rendering, performs a shallow equality check on its props. If every prop reference is identical to the previous render, the component skips its render pass. That check only succeeds when references are stable: a new object literal or arrow function created inline in the parent is a different reference each time, so the memo bails out and the child re-renders anyway. useMemo and useCallback freeze those references to a single allocation. Colocating state means the component that calls the setter is the one that re-renders.\n\nIn a real dashboard, a parent that holds a search query re-renders on every keystroke. Without memo and stable props, every chart, table row, and badge in that subtree re-renders and re-lays out. With the patterns above, only the input and the filter logic re-execute; the expensive chart sees the same data reference and bails out.\n\nThe nuance an interviewer probes next: React.memo adds a comparison cost on every render of the parent. For a trivially cheap component, the comparison itself may cost more than the saved work. Also, useMemo is not a cache; it is a guard that recomputes only when its dependency array changes, and an empty array means the value is computed once for the component's lifetime.",
    interviewLine: "I wrap leaf components in React.memo and make sure every object or function prop I pass them has a stable reference via useMemo or useCallback. I also keep state as close to the component that reads it as possible, so a keystroke in one input does not re-render the whole page.",
    misconception: "React.memo compares prop values deeply, so passing a new object with the same contents is harmless. In reality it is a shallow reference check: `{ a: 1 } !== { a: 1 }`, and the child re-renders every time.",
    hints: [
      "Look at what React.memo actually compares when it decides whether to skip a child's render.",
      "If a parent re-renders and passes `{ a: 1 }` inline as a prop, does that reference survive to the next render?",
      "The goal is not zero renders; it is making each re-render touch the smallest possible subtree."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "Typing in the input re-renders FilteredList, but each Row receives the same string prop, so React.memo skips every Row's render.",
      language: "tsx",
      code: "import { memo, useState } from \"react\";\n\nconst Row = memo(function Row({ name }: { name: string }) {\n  console.log(`Row \"${name}\" rendered`);\n  return <li>{name}</li>;\n});\n\nconst NAMES = [\"Alpha\", \"Beta\", \"Gamma\"];\n\nfunction FilteredList() {\n  const [query, setQuery] = useState(\"\");\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder=\"filter\" />\n      <ul>\n        {NAMES.map((name) => (\n          <Row key={name} name={name} />\n        ))}\n      </ul>\n    </div>\n  );\n}"
    }
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
        explanation: "Tempting if you associate event handling with jQuery's `.on()` or `.bind()`, but React handlers are plain JavaScript functions. `Function.prototype.bind`, arrow functions, and lexical scoping are all standard language features that require no library."
      },
      {
        id: "B",
        text: "Use `.bind(this)` in the constructor, a class-field arrow function, or an inline arrow in JSX.",
        isCorrect: true,
        explanation: "Correct. These are the three idiomatic ways to preserve `this` in a class-component handler: constructor `.bind()`, class-field arrow, and inline arrow in JSX."
      },
      {
        id: "C",
        text: "Methods are automatically bound to window in strict mode without any syntax.",
        isCorrect: false,
        explanation: "Tempting if you recall that unbound methods in sloppy mode default `this` to `globalThis`, but that is the opposite of binding. In strict mode (which React code uses), `this` is `undefined`, and no automatic binding occurs."
      },
      {
        id: "D",
        text: "Wrap every method in `eval()` inside the render function body.",
        isCorrect: false,
        explanation: "`eval()` executes a string as code; it has no role in establishing `this` for a method call. It also bypasses the module system, breaks bundlers, and is a security risk."
      }
    ],
    correctAnswer: "B",
    explanation: "Class methods are not bound by default. When you pass `this.handleClick` directly as an `onClick` prop, the method is invoked with `this` set to `undefined` (strict mode) or `globalThis` (sloppy mode), so the handler throws or reads the wrong state. The three standard fixes are: call `.bind(this)` in the constructor, declare the handler as a class-field arrow function (`handleClick = () => { ... }`), or wrap the call in an inline arrow inside JSX (`onClick={(e) => this.handleClick(e)}`).\n\nThe trade-off is reference stability. Constructor `.bind()` and a class-field arrow each create the function once, at construction time. An inline arrow creates a brand-new function on every render pass. If that handler is passed to a child wrapped in `React.memo` or a `PureComponent`, the new reference defeats the shallow comparison and forces an extra re-render.\n\nIn practice most new code uses function components with hooks, where `useCallback` plays the role of a stable reference. The binding question still shows up in legacy class components and in interviews that expect you to name all three patterns and the one performance caveat.",
    interviewLine: "In a class component I bind the handler once \u2014 either with `.bind(this)` in the constructor or a class-field arrow \u2014 so the reference is stable across renders. If I inline the arrow in JSX, I know it allocates a new function every render, which can break a `React.memo` child.",
    misconception: "Passing a class method as a callback does not preserve `this`; in strict mode it is `undefined`, not the component instance, and no JSX syntax changes that.",
    hints: [
      "Look at what `this` is when the method is actually invoked, not when it is declared.",
      "Ask whether the function reference is created once at construction or on every render pass.",
      "None of the three patterns in the code require a library; they are plain JavaScript scoping rules."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "The first `Child` receives a stable reference while the second gets a new arrow on every render, defeating `memo`.",
      language: "tsx",
      code: "import React, { memo } from 'react';\n\nclass Parent extends React.Component<{ label: string }> {\n  state = { count: 0 };\n\n  handleIncrement = () => {\n    this.setState((s) => ({ count: s.count + 1 }));\n  };\n\n  render() {\n    return (\n      <div>\n        <Child onClick={this.handleIncrement} />\n        <Child onClick={() => this.handleIncrement()} />\n        <span>{this.state.count}</span>\n      </div>\n    );\n  }\n}\n\nconst Child = memo(({ onClick }: { onClick: () => void }) => (\n  <button onClick={onClick}>+1</button>\n));"
    }
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
        text: "A stable identity token for array items that lets React match elements across renders, preserving state when lists reorder.",
        isCorrect: true,
        explanation: "Correct. The key is the token React's diffing algorithm compares between successive renders to decide which DOM nodes and component instances to keep, move, or discard."
      },
      {
        id: "B",
        text: "A CSS property that React applies to give alternating list items a different background color.",
        isCorrect: false,
        explanation: "Tempting if you associate \"key\" with a styling rule, but `key` is never passed to the DOM or consumed by a stylesheet. Styling is handled entirely through `className`, inline `style`, or CSS-in-JS."
      },
      {
        id: "C",
        text: "A database primary key that must be globally unique across all websites.",
        isCorrect: false,
        explanation: "Tempting because the word \"key\" evokes a relational-database concept, but React's key is a local reconciliation hint. It only needs to be unique among the siblings in the same array and has no relationship to any database."
      },
      {
        id: "D",
        text: "An encryption key React uses to hash list data before sending it to an analytics server.",
        isCorrect: false,
        explanation: "Tempting if you hear \"key\" and think of cryptography, but `key` is never transmitted, hashed, or used for security. It is a plain string or number that stays in the virtual DOM tree purely to guide diffing."
      }
    ],
    correctAnswer: "A",
    explanation: "`key` is a prop you set on each element in a mapped array so React can identify which item is which across renders. During reconciliation, React compares the keys in the previous render's list with the keys in the next list. A matching key means \"same item, possibly moved\"; a missing key means \"removed\"; a new key means \"added.\" This lets React reuse existing DOM nodes and component instances instead of tearing everything down and rebuilding it.\n\nIn practice this matters when a list reorders or an item is deleted in the middle. If you use `index` as the key and delete the first item, every remaining item's key shifts by one. React sees every key as changed, re-runs mount logic for every row, discards local `useState` values, resets focused inputs, and triggers unnecessary layout work.\n\nKeys only need to be unique among siblings in the same array; they do not need to be globally unique. If you extract a row into a `TodoRow` component, the key still goes on `<TodoRow key={todo.id}>` in the parent's map, not inside the component itself. Using `index` as a key is acceptable only when the list is purely append-only and never reorders or mutates in place.",
    interviewLine: "I describe a key as React's identity token for list reconciliation. It tells the diffing algorithm which element is which between two renders, so DOM nodes and local component state follow the data rather than the position, which is why I use a stable ID over an index whenever the list can reorder.",
    misconception: "Treating `key` as a data attribute, a CSS hook, or a database identifier rather than a reconciliation identity token, or assuming that using the array index is equivalent to using a stable ID because both produce unique values within a single render.",
    hints: [
      "Think about what React must decide when a five-item list becomes four items because one was deleted in the middle.",
      "What does React compare between the previous render's array and the next one to decide whether to keep, move, or remove each element?",
      "The answer is not about styling, data persistence, or security \u2014 it is about matching elements across two consecutive renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    example: {
      caption: "Notice that the key sits on `TodoRow` in the parent's map, not inside the component, and that `expanded` is local state React would reset if the key changed or went missing.",
      language: "tsx",
      code: "function TodoRow({ todo }: { todo: Todo }) {\n  const [expanded, setExpanded] = useState(false);\n  return (\n    <li>\n      <button onClick={() => setExpanded(!expanded)}>\n        {todo.text} ({expanded ? \"\u2212\" : \"+\"})\n      </button>\n      {expanded && <p>{todo.notes}</p>}\n    </li>\n  );\n}\n\nfunction TodoList({ todos }: { todos: Todo[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <TodoRow key={todo.id} todo={todo} />\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Because string refs trigger automatic full-page reloads on every keystroke, making the browser completely unresponsive.",
        isCorrect: false,
        explanation: "This is a complete fabrication. String refs are a way to access DOM nodes, not a mechanism for reloading the page. They have nothing to do with input events or page navigation."
      },
      {
        id: "B",
        text: "Because string refs only work on Internet Explorer 6 and were never supported in any other browser engine.",
        isCorrect: false,
        explanation: "String refs were a feature of React's core library, not a browser-specific API. They worked in all browsers that supported React, and their removal was due to architectural flaws, not browser compatibility."
      },
      {
        id: "C",
        text: "Because strings take up too much disk space in the browser's hard drive, degrading page load performance.",
        isCorrect: false,
        explanation: "The size of a string literal is negligible and irrelevant to the decision to deprecate string refs. The issue was about state management, composition, and type safety, not memory usage."
      },
      {
        id: "D",
        text: "They force React to track the currently executing component (making React stateful), don't compose across libraries, fail static analysis, and are removed in modern React.",
        isCorrect: true,
        explanation: "Correct. String refs required React to maintain a global registry, which made the library stateful and broke modularity. They also prevented multiple refs from attaching to the same element and were invisible to static analysis tools, leading to their removal in React 16."
      }
    ],
    correctAnswer: "D",
    explanation: "String refs are legacy because they force React to maintain a global registry mapping ref strings to DOM nodes, which makes the library stateful. This design breaks modularity because it relies on implicit global state rather than explicit data flow. It also prevents proper composition, as two components cannot easily attach different refs to the same element without overwriting each other's registry entries.\n\nIn practice, this means string refs cannot be used in function components, cannot be combined with other refs, and are invisible to static analysis tools like TypeScript. Because of these limitations, React removed string refs in version 16. Modern alternatives like callback refs and `useRef` solve these issues by keeping the reference local to the component and allowing multiple refs to attach to the same element without conflict.\n\nAn interviewer might probe why `useRef` is preferred over callback refs for most use cases. The answer is that `useRef` provides a stable object reference across renders, making it easier to manage in function components, while callback refs are useful when you need to perform side effects when the DOM node is attached or detached.",
    interviewLine: "The core issue is that string refs force React to maintain a global registry keyed by the executing component, which makes the library inherently stateful and breaks composition. That's why I reach for callback refs or `useRef` instead \u2014 they keep the reference local to the component.",
    misconception: "The idea that string refs are just a minor syntactic preference, rather than a design that forces React to maintain global state, which breaks modularity and composition.",
    hints: [
      "Look at how string refs are accessed via `this.refs` and compare it to how `useRef` works.",
      "Ask yourself: does string ref access require React to keep a global map of refs, and what does that imply about modularity?",
      "Consider how two different components might try to attach refs to the same element using string refs."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef",
    example: {
      caption: "This shows how `useRef` keeps the reference local to the component, avoiding the global state problem of string refs.",
      language: "tsx",
      code: "function MyComponent() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  const focusInput = () => {\n    inputRef.current?.focus();\n  };\n\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={focusInput}>Focus</button>\n    </div>\n  );\n}"
    }
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
        text: "Named exports can never be code-split in modern JavaScript, so `React.lazy` must reject them.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"code-split\" with \"use `React.lazy` directly,\" but a named export is just a key on the resolved module object. You can split it by mapping the Promise to `{ default: module.NamedComponent }` before handing it to `React.lazy`; the bundler still emits a separate chunk."
      },
      {
        id: "B",
        text: "No, `React.lazy()` reads only the `default` property; wrap a named export in a re-export module to give it that shape.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` reads `module.default` off the resolved namespace, so a file with only named exports has no key it can find. Re-exporting as `default` in a thin intermediate module (or mapping with `.then`) gives it the shape it expects while keeping tree-shaking intact."
      },
      {
        id: "C",
        text: "`React.lazy()` only supports CommonJS `require()` syntax and will throw on dynamic `import()`.",
        isCorrect: false,
        explanation: "Tempting if you associate lazy loading with webpack's `require.ensure`, but `React.lazy` always takes a function returning a Promise, and the idiomatic source is the dynamic `import()` expression, which is standard ES module syntax."
      },
      {
        id: "D",
        text: "Yes, `React.lazy()` natively accepts named exports via `lazy(() => import('./Module', { name: 'MyComp' }))`.",
        isCorrect: false,
        explanation: "Tempting because bundlers like webpack support magic comments to name chunks, but that is a comment annotation on the import expression, not a second runtime argument, and it does not change which export key `React.lazy` reads. The React API has no `name` parameter."
      }
    ],
    correctAnswer: "B",
    explanation: "`React.lazy()` calls the function you pass it and expects the resulting Promise to resolve to a module namespace object. It then reads exactly one property from that object: `default`. A file that uses only named exports (`export const SomeComponent = \u2026`) produces a namespace with no `default` key, so `React.lazy` finds nothing to render and throws at runtime.\n\nIn a real codebase this bites when a barrel file exports five components and you want to lazy-load just one. The fix shown in the question is a one-line intermediate module: `export { SomeComponent as default } from './MoreComponents.js'`. The bundler still tree-shakes the other four exports because they are never referenced through the lazy chunk, and `React.lazy` sees the `default` key it expects.\n\nAn equivalent inline workaround is `lazy(() => import('./MoreComponents.js').then(m => ({ default: m.SomeComponent })))`. It does the same reshape without a separate file, but in a long component list the intermediate module is easier to scan. The API contract has not changed across React 18 and 19; there is no `named` option or second argument to `lazy` that would alter which property it reads.",
    interviewLine: "`React.lazy` reads the `default` property off the resolved module namespace, so for a named export I either add a one-line re-export-as-default module or map the Promise with `.then(m => ({ default: m.MyComp }))` before passing it to `lazy`.",
    misconception: "Treating `React.lazy` as if it receives the component value directly, when it actually receives a module namespace object and reads only the `default` property from it.",
    hints: [
      "Look at what `React.lazy` does with the resolved Promise \u2014 which single property does it read from the module object?",
      "A dynamic `import()` of a file with only named exports produces a namespace with no `default` key; think about what `React.lazy` would find.",
      "The fix is not a new option on `lazy` or a different import syntax; it is reshaping the resolved object so the key `React.lazy` expects is present."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Notice how `.then` reshapes the namespace so the named export lands on `default`, the only key `React.lazy` inspects.",
      language: "tsx",
      code: "import React, { lazy, Suspense } from 'react';\n\nconst Dashboard = lazy(() =>\n  import('./components/Dashboard.js').then((mod) => ({\n    default: mod.Dashboard,\n  }))\n);\n\nexport default function App() {\n  return (\n    <Suspense fallback={<p>Loading\u2026</p>}>\n      <Dashboard />\n    </Suspense>\n  );\n}"
    }
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
        text: "They reduce DOM tree depth, prevent breaking CSS flexbox/grid/table parent-child layout rules, and keep the DevTools DOM tree clean.",
        isCorrect: true,
        explanation: "Correct. A fragment emits no DOM node, so it avoids the extra element that would add a level of depth, become the sole flex or grid item, or invalidate table row structure."
      },
      {
        id: "B",
        text: "They permanently disable every CSS stylesheet and inherited style on their child elements, forcing you to re-declare styles inline.",
        isCorrect: false,
        explanation: "Tempting if you read \"no wrapper element\" as \"no styling context,\" but fragments pass through every inherited and applied style to their children unchanged; the children are styled exactly as if the fragment were not there."
      },
      {
        id: "C",
        text: "They automatically translate the text content of their children into 50 spoken languages at render time using a built-in i18n engine.",
        isCorrect: false,
        explanation: "Fragments are a structural grouping mechanism in JSX; they have no relationship to text processing, i18n libraries, or language translation."
      },
      {
        id: "D",
        text: "They execute roughly 1000x faster than a `<div>` because the compiler emits their children directly as a native C++ binary.",
        isCorrect: false,
        explanation: "React renders to the DOM through JavaScript in the browser; there is no C++ compilation step. The small performance benefit of a fragment comes from one fewer DOM node to allocate and diff, not from a different runtime."
      }
    ],
    correctAnswer: "A",
    explanation: "A fragment (`<>...</>` or `<React.Fragment>`) groups JSX children without emitting a DOM node. A container `<div>` adds a real element to the document tree, increasing its depth by one level for every wrapper you introduce.\n\nThe practical cost of that extra node is layout. CSS Flexbox and Grid compute flex items and grid areas from the direct children of the container. Inserting a `<div>` between the container and its intended children turns that div into the single flex or grid item, collapsing the children inside it. Table markup is even stricter: the HTML spec expects `<td>` as a direct child of `<tr>`, so a wrapper div is invalid and breaks the row structure.\n\nThe performance difference\u2014saving one DOM allocation and one diff step per fragment\u2014is real but small unless you are rendering thousands of deeply nested rows. The reason fragments matter in day-to-day code is layout correctness and keeping the DevTools Elements panel readable, not raw speed.",
    interviewLine: "I reach for a fragment when I need to group children without introducing a DOM node that would become the sole flex item, break a grid track, or add a level of depth to the Elements panel.",
    misconception: "Treating a fragment as just a shorthand for `<div>` and therefore assuming the two are interchangeable, when in fact the extra element changes which nodes Flexbox, Grid, and the table parser see as direct children.",
    hints: [
      "Compare what actually lands in the DOM when you wrap children in a `<div>` versus a fragment.",
      "Ask which CSS layout models read the direct children of a container and what happens when an extra element sits in between.",
      "The performance saving is minor; the layout and readability benefits are the practical reason."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Without the fragment, the two badges would need a wrapper element that becomes the single flex item, collapsing them into one block.",
      language: "tsx",
      code: "function UserCard({ user, isAdmin }: { user: User; isAdmin: boolean }) {\n  return (\n    <div style={{ display: \"flex\", alignItems: \"center\", gap: 8 }}>\n      <Avatar src={user.avatar} />\n      <span>{user.name}</span>\n      {isAdmin && (\n        <>\n          <Badge label=\"Admin\" />\n          <Badge label=\"Owner\" />\n        </>\n      )}\n    </div>\n  );\n}"
    }
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
        text: "Write manual `typeof` checks at the top of every render body to verify each prop before using it.",
        isCorrect: false,
        explanation: "Tempting if you want visible, explicit checks, but you are reimplementing what `prop-types` and TypeScript already do, adding a runtime branch to every render and duplicating the type definition in a second, untyped location."
      },
      {
        id: "B",
        text: "Encrypt prop values with AES-256 before passing them so the component can verify their integrity.",
        isCorrect: false,
        explanation: "Confuses validation (checking a value's type or shape) with encryption (making a value unreadable to other parties). Neither TypeScript nor `prop-types` involves cryptography."
      },
      {
        id: "C",
        text: "Use TypeScript interfaces or types for compile-time checking, or the `prop-types` package for development-only runtime warnings.",
        isCorrect: true,
        explanation: "Correct. TypeScript enforces prop types at compile time and `prop-types` prints development-only console warnings at runtime, together covering both developer and integration errors."
      },
      {
        id: "D",
        text: "Props are immutable data and React provides no mechanism to validate them.",
        isCorrect: false,
        explanation: "React has shipped prop validation since version 0.14 (originally as `React.PropTypes`, later extracted to the `prop-types` package), and TypeScript adds a compile-time layer on top. Immutability of props does not preclude type-checking them."
      }
    ],
    correctAnswer: "C",
    explanation: "The two standard mechanisms are TypeScript and the `prop-types` package. TypeScript checks prop types at compile time: if you pass a `number` where a `string` is expected, `tsc` reports an error before the code ever runs. The `prop-types` library adds a second layer: at runtime, during development only, React inspects the props actually passed to a component and prints a console warning if a type or required flag is violated.\n\nIn practice this means TypeScript catches developer mistakes\u2014a typo, a wrong literal\u2014at build time, while `prop-types` catches mistakes TypeScript cannot see, such as a JSON payload from an API that is typed as `any` or `unknown` and is passed into a component expecting a `string`.\n\nOne nuance an interviewer may probe: both mechanisms are zero-cost in production. TypeScript types are erased during compilation, and React strips `propTypes` checks from the production bundle, so neither adds a runtime branch to shipped code.",
    interviewLine: "I use TypeScript interfaces for compile-time prop checking, and I add `prop-types` on components that receive data from an untyped source like an API response, so I get a development-time warning instead of a silent `undefined` in production.",
    misconception: "Prop validation is something React performs automatically for every component out of the box, rather than something you opt into by declaring types or a `propTypes` object.",
    hints: [
      "Think about when the error surfaces: before the code runs, or while it is running in development.",
      "Ask whether the check is erased at build time or stripped from the production bundle.",
      "The answer is not a manual `if` statement or a cryptographic operation; it is a type system or a dedicated validation library."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "TypeScript catches a wrong type at build time; `prop-types` catches a wrong value at runtime in development, so the two layers complement each other.",
      language: "tsx",
      code: "import React from 'react';\nimport PropTypes from 'prop-types';\n\ntype BadgeProps = {\n  label: string;\n  count: number;\n};\n\nfunction Badge({ label, count }: BadgeProps) {\n  return (\n    <span className=\"badge\">\n      {label} ({count})\n    </span>\n  );\n}\n\nBadge.propTypes = {\n  label: PropTypes.string.isRequired,\n  count: PropTypes.number.isRequired,\n};\n\nexport default Badge;"
    }
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
        explanation: "Tempting if you conflate JSX with a replacement for the web platform, but JSX compiles to JavaScript, styles are still plain CSS (or a CSS-in-JS layer you add), and the output is still HTML in the DOM. React builds on those technologies; it does not replace them."
      },
      {
        id: "B",
        text: "Includes built-in ORM database drivers and full-stack PostgreSQL clustering.",
        isCorrect: false,
        explanation: "Tempting if you picture React as a full-stack framework, but it is a UI view library with no knowledge of SQL, connection pools, or database topology. Data access is handled by separate tools (Prisma, Drizzle, React Query) that you wire in yourself."
      },
      {
        id: "C",
        text: "Guarantees that web pages load in 0.001 milliseconds over any network connection.",
        isCorrect: false,
        explanation: "Tempting if you equate \"fast rendering\" with \"fast loading,\" but React optimises how the browser updates the DOM after the initial paint. Time-to-first-byte and transfer size depend on your server, CDN, and the user's connection, none of which React controls."
      },
      {
        id: "D",
        text: "Component reusability, Virtual DOM diffing, unidirectional data flow, and strong ecosystem support.",
        isCorrect: true,
        explanation: "Correct. These are the concrete, verifiable architectural choices that distinguish React: a composable component model, a diffing-based renderer that minimises DOM writes, a one-way data flow that makes state changes traceable, and a large ecosystem (Next.js, React Query, Redux, testing tools) that covers the gaps a view library leaves."
      }
    ],
    correctAnswer: "D",
    explanation: "React's advantages come from three architectural decisions: a component model, a Virtual DOM rendering strategy, and unidirectional data flow. Components are self-contained units of markup, logic, and style that you write once and compose anywhere. When state or props change, React renders a new virtual tree, diffs it against the previous one, and applies only the minimal DOM mutations, so you avoid hand-managing `innerHTML` or `document.querySelector` calls.\n\nIn real code this means a `Button` component you build for a login form is the same one in a settings modal and a toolbar. Data flows predictably: the parent owns the state, passes a value as a prop, and the child calls a callback prop to request a change. No hidden two-way binding, no global store mutation from a leaf component.\n\nThe trade-off an interviewer will probe: Virtual DOM diffing still costs CPU on every render, so in hot paths you reach for `React.memo`, `useMemo`, or `useCallback` to skip work. And because React is a view library, you still need routing, data-fetching, and styling solutions (Next.js, React Query, a CSS approach) to ship a full application.",
    interviewLine: "React's core advantage is that it gives you a component model with unidirectional data flow and a Virtual DOM diffing pass, so I write a component once, compose it anywhere, and only the changed DOM nodes get touched on re-render. Everything else\u2014routing, data fetching, styling\u2014I layer on top with the ecosystem.",
    misconception: "Treating React as a full-stack runtime that replaces HTML, CSS, JavaScript, the network, and the database, rather than a UI-layer library whose value comes from its component model, rendering strategy, and data-flow conventions.",
    hints: [
      "React is a view library sitting on top of HTML, CSS, and JavaScript; it does not replace any of those layers.",
      "Ask what architectural choices React makes: how it structures UI, how it decides what to update in the DOM, and how data moves between components.",
      "The options that promise to eliminate a whole technology or guarantee a network speed are describing a runtime, not a UI library."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "One `Button` component used in two places; the parent owns the state and passes a callback down, so data flows in a single direction.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\ntype ButtonProps = { label: string; variant: \"primary\" | \"secondary\"; onClick: () => void };\n\nfunction Button({ label, variant, onClick }: ButtonProps) {\n  return (\n    <button className={`btn btn--${variant}`} onClick={onClick}>\n      {label}\n    </button>\n  );\n}\nexport function Toolbar() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className=\"toolbar\">\n      <Button label=\"Save\" variant=\"primary\" onClick={() => console.log(\"saved\")} />\n      <Button\n        label={`Retry (${count})`}\n        variant=\"secondary\"\n        onClick={() => setCount((c) => c + 1)}\n      />\n    </div>\n  );\n}"
    }
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
        text: "Wrap the component in an infinite synchronous `while` loop until it has rendered once.",
        isCorrect: false,
        explanation: "Tempting if you equate \"memoize\" with \"keep trying until the result is cached,\" but a synchronous infinite loop blocks the main thread and prevents React from rendering anything at all. Memoization skips work; it does not retry work."
      },
      {
        id: "B",
        text: "Serialize the component's rendered output to `localStorage` on every animation frame.",
        isCorrect: false,
        explanation: "This confuses runtime memoization with persistence. `localStorage` is a synchronous, string-based storage API that React never reads during rendering, and writing to it every frame would stall the main thread far more than the re-render you are trying to avoid."
      },
      {
        id: "C",
        text: "Rewrite the component in C++ so the compiler can cache its output at the instruction level.",
        isCorrect: false,
        explanation: "Memoization is a JavaScript-level pattern. `React.memo` is a pure-JavaScript higher-order component shipped in the `react` package; no transpilation, native code, or language change is involved."
      },
      {
        id: "D",
        text: "Wrap the component in `React.memo`, which uses a shallow prop comparison to skip re-renders when inputs are unchanged.",
        isCorrect: true,
        explanation: "Correct. `React.memo` is a higher-order component that wraps a function component and skips the re-render when a shallow `Object.is` comparison of all props finds no changes, with an optional custom comparator as the second argument."
      }
    ],
    correctAnswer: "D",
    explanation: "The idiomatic way is `React.memo(MyComponent)`. It returns a new component whose render function React will skip when a shallow `Object.is` comparison of every prop against the previous render's props finds them all equal. The optional second argument, `areEqual(prevProps, nextProps)`, lets you replace that shallow check with your own logic.\n\nIn a real tree, this means a child that receives only primitive props, or the same object and array references, does not re-render when the parent's state changes. You avoid calling the child's function, running its hooks, and reconciling its subtree, which is the work you actually want to skip.\n\nThe nuance an interviewer will probe next: the default comparison is shallow. If a prop is an object or array, a new reference with identical contents still triggers a re-render. A custom `areEqual` function runs on every parent render where the memoized child is a candidate, so it must be cheap; a deep-equal check inside it defeats the purpose.",
    interviewLine: "I wrap the function component in `React.memo`, which returns a new component type that React skips re-rendering when a shallow `Object.is` comparison of all props returns equal. If the default shallow check is not enough, I pass a custom `areEqual` function as the second argument, keeping it cheap because it runs on every parent render.",
    misconception: "Memoization is treated as \"store the rendered HTML somewhere and read it back\" rather than \"compare props with `Object.is` and skip the function call if nothing changed.\" The mechanism is a per-prop reference check at render time, not a cache lookup.",
    hints: [
      "Think about what React does when a parent re-renders and a child receives the same props: what mechanism lets React skip calling the child's function entirely?",
      "The comparison is shallow, using `Object.is` on each prop. Ask yourself what happens when a prop is a new array with the same numbers.",
      "It is not a caching library or a storage API; it is a wrapper that returns a new component type React can compare against the previous one."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `items` is a new array reference on every render, so `React.memo` cannot skip `ExpensiveList` even though the values are identical.",
      language: "tsx",
      code: "import { useState, memo } from 'react';\n\nconst ExpensiveList = memo(function ExpensiveList({ items }: { items: number[] }) {\n  console.log('ExpensiveList rendered');\n  return <ul>{items.map((n) => <li key={n}>{n}</li>)}</ul>;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  // New array reference every render \u2192 ExpensiveList re-renders\n  const items = [1, 2, 3, 4, 5];\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>\n      <ExpensiveList items={items} />\n    </div>\n  );\n}"
    }
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
        text: "Because the object form evaluates immediately, so React skips batching to ensure the state is written synchronously.",
        isCorrect: false,
        explanation: "This confuses evaluation timing with batching mechanics. React does not skip batching for object literals; it queues them just like functional updaters. The difference is that the object's value is fixed at call time, whereas the updater is resolved at apply time."
      },
      {
        id: "B",
        text: "Because the functional form is required for concurrent rendering, while the object form is legacy and ignored in React 18.",
        isCorrect: false,
        explanation: "This misinterprets React 18's concurrency model. Both forms are fully supported and batched in React 18 and 19. The object form is not ignored; it is simply evaluated eagerly, which can lead to stale reads in sequential updates."
      },
      {
        id: "C",
        text: "Because `setState` is asynchronous and batched; passing a function `(prevState, props) => newState` ensures access to the latest queued state during sequential updates.",
        isCorrect: true,
        explanation: "Correct. Each functional updater receives the state produced by the previous updater in the queue, so sequential increments accumulate correctly instead of all reading the same stale `this.state`."
      },
      {
        id: "D",
        text: "Because the object form triggers a re-render immediately, while the functional form waits for the next event loop tick.",
        isCorrect: false,
        explanation: "This inverts the actual timing. Both forms defer the state write until the next render; neither triggers an immediate synchronous re-render. The functional form is safer because it defers the calculation of the new value until render time, not because it defers the render itself."
      }
    ],
    correctAnswer: "C",
    explanation: "C is correct. `setState` is asynchronous and batched: React queues the update and applies it before the next render, not immediately after the call. When you pass an object, the expression `this.state.count + 1` is evaluated at call time, reading whatever `this.state` holds in that moment. When you pass a function, React stores the updater in a queue and feeds the result of each one into the next, so every step sees the value produced by the previous step.\n\nIn the code, all three object-based calls read `this.state.count` as 0 because no re-render has happened yet. Each one sets `count` to 1, and after batching the final state is 1, not 3. The functional form avoids this: the first updater receives `{ count: 0 }`, the second receives `{ count: 1 }`, the third receives `{ count: 2 }`, and the final state is 3.\n\nThis matters most inside event handlers, lifecycle methods, or any code path that fires more than one update before the next render. React 18's automatic batching widened the window in which stale reads occur, making the functional form the safer default whenever the next update depends on the previous one.",
    interviewLine: "I'd explain that `setState` batches updates and defers the state write until the next render, so reading `this.state` in a subsequent call still gives me the old value; by passing an updater function, React feeds each result into the next updater and the increments accumulate correctly.",
    misconception: "Assuming that `this.state` is refreshed synchronously after each `setState` call, so the next call in the same tick reads the already-updated value.",
    hints: [
      "What value does `this.state.count` hold at the exact moment the second and third `setState` calls execute?",
      "Does React apply each state update and re-render before the next line of your handler runs, or does it queue them?",
      "The issue is not syntax or deprecation; it is about which snapshot of state the expression captures at call time."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
    example: {
      caption: "The same stale-read problem in a function component: three `setCount(count + 1)` calls all capture `count` as 0, while the functional form accumulates correctly.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  function staleIncrement() {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(count + 1);\n    // all three read count as 0 \u2192 final value is 1\n  }\n  function functionalIncrement() {\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n    // each updater receives the previous result \u2192 final value is 3\n  }\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={staleIncrement}>+1 (stale)</button>\n      <button onClick={functionalIncrement}>+3 (functional)</button>\n    </div>\n  );\n}"
    }
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
        text: "Because `this.state` may be stale when the handler runs; the updater receives the state React holds at the moment it applies that update.",
        isCorrect: true,
        explanation: "Correct. The updater receives the state and props at the moment React applies that specific update, so each queued call computes from the latest base value rather than a stale snapshot captured when the handler ran."
      },
      {
        id: "B",
        text: "Because function closures are allocated on the call stack and cost zero heap bytes, whereas objects always require heap allocation.",
        isCorrect: false,
        explanation: "Tempting if you frame the issue as a performance optimisation, but both forms allocate a tiny closure or object; the real problem is reading a stale `this.state` during batching, not memory cost."
      },
      {
        id: "C",
        text: "Because the TypeScript definitions for `setState` only accept a function updater, so passing a plain object is a compile-time error.",
        isCorrect: false,
        explanation: "Tempting if you conflate the type definitions with a runtime restriction, but `setState` accepts both objects and functions at runtime; the object form is valid, just unsafe when the next value depends on the current one."
      },
      {
        id: "D",
        text: "Because JavaScript objects can only hold string-keyed values and coerce numeric properties to strings, losing precision.",
        isCorrect: false,
        explanation: "Tempting if you misread the question as a type-system limitation, but JavaScript objects hold numbers, strings, and any other value; the problem is timing of the read, not what the object can contain."
      }
    ],
    correctAnswer: "A",
    explanation: "When you pass an object to `setState`, the values you read from `this.state` and `this.props` are whatever they hold at the moment you write the call. React batches multiple `setState` calls in the same event handler, so `this.state` still reflects the pre-batch value. The updater-function form receives `prevState` \u2014 the state React will actually apply \u2014 and the current `props`, so each queued update computes from the correct base.\n\nIn the code above, calling `setState({ counter: this.state.counter + this.props.increment })` twice in one handler means both calls read the same `this.state.counter`, and the second increment is silently lost. The updater form chains: the second call receives the state produced by the first, so the total is correct.\n\nIf your next state does not depend on the current state \u2014 for example, `setState({ loading: true })` \u2014 the object form is perfectly fine and arguably clearer. The function form earns its place specifically when the computation reads `this.state` or `this.props` to derive the new value.",
    interviewLine: "I use the updater form whenever the next state depends on the current one, because React batches `setState` calls and `this.state` in the handler still reflects the pre-batch value, whereas the updater receives the state at the moment React applies each update in the queue.",
    misconception: "The learner assumes `this.state` is always the latest value at any point inside an event handler, so they do not see how reading it in the object form could return a stale value when multiple updates are queued.",
    hints: [
      "What does `this.state.counter` equal on the second `setState` call if both run in the same event handler?",
      "The updater's first argument is not \"the state when you wrote the code\" \u2014 it is the state when React applies this specific update in the queue.",
      "The object form is fine for static values; the problem only appears when you read `this.state` to compute the next value."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
    example: {
      caption: "Two sequential increments in one handler: the object form loses the second increment because both calls read the same stale `this.state.items`, while the updater form chains correctly.",
      language: "tsx",
      code: "class Cart extends React.Component<{}, { items: number }> {\n  state = { items: 0 };\n\n  addTwo = () => {\n    // Both calls read this.state.items as 0\n    this.setState({ items: this.state.items + 1 });\n    this.setState({ items: this.state.items + 1 });\n    // items ends up as 1, not 2\n  };\n\n  addTwoCorrect = () => {\n    this.setState((prev) => ({ items: prev.items + 1 }));\n    this.setState((prev) => ({ items: prev.items + 1 }));\n    // items ends up as 2\n  };\n\n  render() {\n    return (\n      <button onClick={this.addTwoCorrect}>\n        Cart: {this.state.items}\n      </button>\n    );\n  }\n}"
    }
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
        text: "The newest state-management hook introduced in React 19, used to merge several pieces of local state into one shared object.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'mixin' with a modern React API, but mixins predate ES6 classes and Hooks; they were removed from the recommended API long before React 19."
      },
      {
        id: "B",
        text: "A database replication tool for mixing SQL and NoSQL tables into a single query layer that React components can read from directly.",
        isCorrect: false,
        explanation: "The word 'mix' suggests data blending, but React mixins had nothing to do with databases; they merged JavaScript methods and lifecycle hooks into a component object."
      },
      {
        id: "C",
        text: "A deprecated `React.createClass` pattern for sharing methods and lifecycle hooks between components, discouraged due to implicit dependencies and name collisions.",
        isCorrect: true,
        explanation: "Correct. Mixins merged external methods and lifecycle hooks into a `React.createClass` component, creating implicit dependencies and name collisions that led React to deprecate them in favour of HOCs, render props, and Hooks."
      },
      {
        id: "D",
        text: "A CSS preprocessor feature that mixes multiple RGB color channels into gradients applied to a component's rendered output.",
        isCorrect: false,
        explanation: "Confusing a component-composition pattern with a styling tool; mixins operated on JavaScript methods and lifecycle hooks, not CSS values or color channels."
      }
    ],
    correctAnswer: "C",
    explanation: "Mixins were a code-sharing mechanism in `React.createClass`, the pre-ES6 way of defining React components. You listed objects in the `mixins` array, and React merged each object's methods and lifecycle hooks directly into your component. In the example, `PureRenderMixin` injects a `shouldComponentUpdate` that does a shallow comparison of props and state to skip re-renders.\n\nThe pattern was deprecated because it made component behavior implicit: a component silently gained methods and lifecycle hooks from every mixin it listed, and two mixins could collide on the same method name. Reading a single component's source did not tell you what it actually did.\n\nReact replaced mixins with higher-order components, render props, and eventually Hooks. `PureRenderMixin` specifically became `React.PureComponent` for class components and `React.memo` for function components.",
    interviewLine: "I'd explain that mixins were a `React.createClass` pattern where you listed objects in a `mixins` array and React merged their methods and lifecycle hooks into the component. It was deprecated because dependencies became implicit and names could collide, and I now use `React.memo` and Hooks for those cases.",
    misconception: "Mixins sound like a current React feature or a general JavaScript concept, but they are a specific, deprecated mechanism from the `React.createClass` era that has no role in modern component code.",
    hints: [
      "Look at the `mixins` array and `React.createClass` in the code\u2014those two signals place this firmly in legacy React.",
      "Ask what happens when you list an object in `mixins`: which methods and lifecycle hooks does it add to the component?",
      "It is not a CSS, database, or Hook concept; it is a component-composition pattern that React has explicitly deprecated."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "`React.memo` is the modern replacement for `PureRenderMixin`, doing the same shallow props comparison without a mixin.",
      language: "tsx",
      code: "import { memo } from \"react\";\n\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\n\nconst Button = memo(function Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n});\n\nexport default Button;"
    }
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
        text: "The `history` library wraps `window.history` for programmatic navigation; React Router builds on that layer to add route matching, param extraction, and component rendering.",
        isCorrect: true,
        explanation: "Correct. The `history` library wraps `window.history` and gives you a programmatic push/replace/back API. React Router consumes those navigation events and adds the declarative layer: matching a URL pattern to a component, extracting params, and rendering the result."
      },
      {
        id: "B",
        text: "They are competing libraries from rival organizations that solve the same routing problem in incompatible, non-interoperable ways.",
        isCorrect: false,
        explanation: "Tempting if you picture two products in the same category. The `history` package was actually created by the React Router team (Michael Jackson and Ryan Florence) specifically as a low-level dependency for React Router, not as a competitor."
      },
      {
        id: "C",
        text: "The `history` library renders HTML directly to the DOM; React Router only tracks navigation state without producing any visual output.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"routing\" with \"rendering.\" The `history` library never touches the DOM; it only manipulates the URL and fires events. React Router is the one that renders `<Route>` components into the DOM."
      },
      {
        id: "D",
        text: "React Router is designed exclusively for mobile phone browsers and cannot run in desktop or server-side JavaScript environments.",
        isCorrect: false,
        explanation: "This is a non-sequitur with no basis in either library's API. Both the `history` package and React Router run in any JavaScript environment: desktop browsers, mobile browsers, Node with memory history, and test runners."
      }
    ],
    correctAnswer: "A",
    explanation: "The `history` library is a thin wrapper around `window.history`. It exposes a programmatic API \u2014 `push`, `replace`, `back`, `forward` \u2014 and fires a callback when the URL changes. It never renders a component or decides what to show. React Router sits on top of that layer: it listens for navigation events, matches the current path against declarative `<Route>` elements, extracts URL params, and renders the matched component tree.\n\nIn practice this means that if you only import `history` and call `push(\"/users/42\")`, the browser URL updates and your listener fires, but nothing on screen changes. You would have to parse the path yourself, look up which component belongs to that path, and re-render manually. React Router collapses all of that into `<Route path=\"/users/:id\" element={<UserPage />} />`, where `:id` is available via a hook and the component swaps automatically.\n\nIn React Router v6 the `history` npm package is no longer a direct dependency, but the conceptual split is unchanged: a low-level navigation primitive versus a declarative routing framework. An interviewer may follow up by asking you to build a two-page router without any library, which is exactly the `history`-plus-`switch`-statement exercise.",
    interviewLine: "The `history` library gives me a programmatic handle on `window.history` \u2014 push, replace, back, forward \u2014 but it never renders anything. React Router consumes those navigation events and adds the declarative layer: matching a URL pattern to a component, extracting params, and composing nested layouts.",
    misconception: "Treating the `history` library and React Router as interchangeable alternatives rather than layers \u2014 the history library is the engine that moves the URL, React Router is the gearbox that decides which component to show for that URL.",
    hints: [
      "Ask what each library does when you call `push(\"/about\")`. One changes the URL and fires an event; the other also decides which component to render.",
      "Think in layers: which one talks to `window.history` directly, and which one talks to React components?",
      "Neither library is limited to one platform; both can run in a browser, in Node with memory history, or in a test environment."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "This shows the `history` API in isolation: you get URL changes and a listener, but no component rendering and no param extraction.",
      language: "typescript",
      code: "import { createBrowserHistory } from \"history\";\n\nconst history = createBrowserHistory();\n\nhistory.listen((location) => {\n  console.log(\"navigated to\", location.pathname);\n});\n\nhistory.push(\"/dashboard\");\nhistory.replace(\"/dashboard?tab=1\");\nhistory.back();"
    }
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
        text: "`<CanvasRouter>` (WebGL rendering), `<AudioRouter>` (Web Audio graphs), and `<GpuRouter>` (compute shaders).",
        isCorrect: false,
        explanation: "These names do not appear anywhere in the React Router package. The trap is pattern-matching \"router\" to hardware or rendering contexts (GPU, canvas, audio) rather than to URL navigation."
      },
      {
        id: "B",
        text: "`<PostgresRouter>` (for connection pooling) and `<RedisRouter>` (for pub/sub channels).",
        isCorrect: false,
        explanation: "Tempting if you conflate \"router\" with connection-pool routing in database clients like `pg` or `ioredis`. React Router is a client-side navigation library; it has no knowledge of a database."
      },
      {
        id: "C",
        text: "`<BrowserRouter>` (HTML5 History API), `<HashRouter>` (hash-based URLs), and `<MemoryRouter>` (in-memory history for tests, React Native).",
        isCorrect: true,
        explanation: "Correct. These three wrappers each supply a different `history` object to the router context, and together they cover every environment React Router supports."
      },
      {
        id: "D",
        text: "A single `<AppRouter>` component that handles all routing and history internally.",
        isCorrect: false,
        explanation: "No such component exists in React Router v4. The library deliberately splits into three wrappers because the source of the URL history (History API, hash, in-memory array) is a real architectural difference, not a configuration flag."
      }
    ],
    correctAnswer: "C",
    explanation: "React Router v4 exposes three top-level `<Router>` components, each wrapping a different `history` object that tracks the current URL and a stack of past entries. `<BrowserRouter>` uses the HTML5 History API (`pushState`, `replaceState`, and the `popstate` event) to produce clean URLs like `/about`. `<HashRouter>` stores the route in the fragment identifier (`#/about`), so the browser never sends a path change to the server. `<MemoryRouter>` keeps the entire history stack in a plain JavaScript array, with no URL at all.\n\nYou pick the wrapper based on your hosting environment. `<BrowserRouter>` gives the best user-facing URLs but requires a server rewrite rule so that a hard refresh on `/about` returns the app shell instead of a 404. `<HashRouter>` works on any static file server with zero configuration because the hash is never part of the request path. `<MemoryRouter>` is the default in Jest and React Native, where there is no `window.history` to drive.\n\nThe three wrappers are interchangeable at the API level: both `<Route>` and `<Link>` read the same context, so switching from `<BrowserRouter>` to `<HashRouter>` is a one-line change. In React Router v6 the same three history backends still exist, now also available as `createBrowserRouter`, `createHashRouter`, and `createMemoryRouter` for the data-router API.",
    interviewLine: "I'd name React Router v4's three top-level router components \u2014 BrowserRouter, HashRouter, and MemoryRouter \u2014 and explain the choice between them is really about where the history stack lives: the HTML5 History API, the URL hash, or a plain in-memory array.",
    misconception: "Treating \"router\" as a single monolithic component when the three wrappers differ in a concrete way: where the URL history stack physically lives (History API, `#` fragment, or a JS array).",
    hints: [
      "Each `<Router>` component wraps a `history` object. Ask yourself: what are the three places a URL history can live in a browser or test environment?",
      "The HTML5 History API, the `#` fragment, and a plain JavaScript array \u2014 which component uses which?",
      "None of these wrappers are related to hardware, databases, or a single monolithic API."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Notice that `MemoryRouter` accepts `initialEntries` to seed the in-memory history, so the test never touches `window.history`.",
      language: "tsx",
      code: "import { MemoryRouter, Switch, Route } from \"react-router-dom\";\nimport { render, screen } from \"@testing-library/react\";\n\nfunction App() {\n  return (\n    <Switch>\n      <Route path=\"/\" exact render={() => <h1>Home</h1>} />\n      <Route path=\"/about\" render={() => <h1>About</h1>} />\n    </Switch>\n  );\n}\n\ntest(\"renders the about page\", () => {\n  render(\n    <MemoryRouter initialEntries={[\"/about\"]}>\n      <App />\n    </MemoryRouter>\n  );\n  expect(screen.getByText(\"About\")).toBeInTheDocument();\n});"
    }
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
        explanation: "Tempting if you parse the name as a prefix on the HTML `select` element. Reselect operates on JavaScript values in memory and has no relationship to CSS or DOM styling."
      },
      {
        id: "B",
        text: "A memoized selector library that caches past inputs/outputs, recomputing derived state only when input selector references change, preventing costly recalculations and re-renders.",
        isCorrect: true,
        explanation: "Correct. `createSelector` wraps input selectors and a result function in a cache keyed by referential equality of the inputs, so the expensive result function runs only when an input reference actually changes."
      },
      {
        id: "C",
        text: "A database engine for executing SQL queries in browser memory.",
        isCorrect: false,
        explanation: "Tempting if you associate the word \"select\" with SQL `SELECT`. Reselect never touches a database or parses query strings; it memoizes pure JavaScript functions over in-memory state."
      },
      {
        id: "D",
        text: "A compiler that converts React into Angular.",
        isCorrect: false,
        explanation: "Tempting if you mistake a small runtime utility for a build-time transpiler. Reselect is a few-kilobyte library you import into existing code; it does not transform or replace any framework."
      }
    ],
    correctAnswer: "B",
    explanation: "Reselect is a memoization library for selectors, most commonly paired with Redux. Its core function, `createSelector`, takes one or more input selectors and a result function, and returns a new selector that caches its computation.\n\nOn each invocation the returned selector calls every input selector to get its current value, then compares those values by reference (`===`) against the values stored from the previous call. If every input is referentially identical, it returns the cached output and skips the result function. If any input reference changed, it runs the result function, stores the new inputs and output, and returns the fresh result.\n\nIn practice this means a selector that filters and sorts a ten-thousand-item array runs only when the array reference actually changes, not on every component re-render. Multiple components can share the same memoized selector without triggering redundant work. The nuance an interviewer probes: memoization is only as good as the input selectors it wraps. If an input selector returns a new object or array on every call, the downstream selector sees a changed reference and recomputes every time, silently defeating the cache.",
    interviewLine: "I'd explain that Reselect's `createSelector` compares input selector outputs by reference on each call; if they are all identical to the previous call it returns the cached result, otherwise it runs the result function and updates the cache. The key gotcha I watch for is an input selector returning a fresh object every time, which invalidates the downstream cache on every render.",
    misconception: "Assuming that once a memoized selector runs, its result is cached forever. In reality the cache is invalidated the instant any input selector returns a new reference, so a poorly composed input selector (one that builds a fresh array or object each call) silently defeats the memoization on every render.",
    hints: [
      "Think about what `createSelector` returns and what it compares on each invocation.",
      "The comparison is referential (`===`), not deep \u2014 ask what happens when an input selector returns a new array every time.",
      "The library is framework-agnostic; it memoizes any pure function, not just Redux state."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice that `state2` reuses the same `items` array reference and the same `search` string, so the second call is a cache hit and `a === b` is true.",
      language: "typescript",
      code: "import { createSelector } from \"@reduxjs/toolkit\";\n\ninterface State {\n  items: { id: number; name: string }[];\n  search: string;\n}\n\nconst selectItems = (state: State) => state.items;\nconst selectSearch = (state: State) => state.search;\n\nconst selectFiltered = createSelector(\n  [selectItems, selectSearch],\n  (items, search) =>\n    items.filter((item) =>\n      item.name.toLowerCase().includes(search.toLowerCase())\n    )\n);\n\nconst items = [{ id: 1, name: \"apple\" }, { id: 2, name: \"banana\" }];\nconst state1 = { items, search: \"ap\" };\nconst state2 = { items, search: \"ap\" }; // same items ref, same string\n\nconst a = selectFiltered(state1); // filter runs, output cached\nconst b = selectFiltered(state2); // same refs \u2192 cache hit, filter skipped\nconsole.log(a === b); // true"
    }
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
        text: "A function that memorizes the user's credit card number and persists it across page sessions.",
        isCorrect: false,
        explanation: "Tempting if you read \"memo\" as a verb meaning \"to remember data,\" but React.memo has nothing to do with storing user information; it controls whether a component re-renders by comparing props."
      },
      {
        id: "B",
        text: "A hook that replaces `useState` and `useEffect` by caching all state in one internal store.",
        isCorrect: false,
        explanation: "Tempting if you see the word \"memo\" and think of a state container, but React.memo is not called with `use`, does not live inside the component body, and manages no state; it is a wrapper applied outside the component definition."
      },
      {
        id: "C",
        text: "A higher-order component that memoizes a function component's output, skipping re-renders when props are shallowly unchanged.",
        isCorrect: true,
        explanation: "Correct. React.memo wraps a function component and performs a shallow prop comparison; when props are unchanged it reuses the prior render output instead of calling the component again."
      },
      {
        id: "D",
        text: "A utility that compresses image files in the browser to reduce the total network payload.",
        isCorrect: false,
        explanation: "Tempting if you associate \"memo\" with file memory or caching, but React.memo operates on component render cycles, not on binary assets or network payloads."
      }
    ],
    correctAnswer: "C",
    explanation: "React.memo is a higher-order component: you pass it a function component and it returns a new component that wraps the original. On every render, the wrapper runs a shallow comparison (Object.is on each prop key) between the incoming props and the props from the previous render. If every value is the same reference or the same primitive, it reuses the previous output and skips calling your component function.\n\nIn practice this matters when a parent re-renders frequently. Without memo, every child re-renders on every parent render, even if its props did not change. Wrapping a leaf component in React.memo means that child only re-renders when one of its props actually changes reference, which cuts down wasted work in large trees.\n\nThe comparison is shallow: a new object or array literal passed as a prop is a new reference, so memo will still trigger a re-render. If you need deeper logic, pass a second argument to React.memo\u2014a custom comparison function that returns true when you want to skip the re-render.",
    interviewLine: "React.memo is a higher-order component that wraps a function component and does a shallow prop comparison before deciding whether to re-render, so I apply it to leaf components whose props are stable references to avoid wasted renders when a parent updates.",
    misconception: "Thinking React.memo is a hook you call inside a component body to \"remember\" a value, rather than a wrapper that sits outside the component definition and controls whether the component is called at all.",
    hints: [
      "Look at where React.memo sits relative to the component definition in the code snippet.",
      "Ask what the wrapper does when the parent re-renders but passes the exact same prop references.",
      "It is not invoked with `use` and does not appear inside the component body."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo",
    example: {
      caption: "The stable `theme` reference means Config skips its render on every button click, while the inline object version would re-render every time.",
      language: "tsx",
      code: "import { memo, useState } from \"react\";\n\nconst Config = memo(function Config({ theme }: { theme: { color: string } }) {\n  console.log(\"Config rendered\");\n  return <div style={{ color: theme.color }} />;\n});\n\nconst theme = { color: \"tomato\" }; // stable reference\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount((c) => c + 1)}>\n        Count: {count}\n      </button>\n      <Config theme={theme} />\n    </div>\n  );\n}"
    }
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
        text: "A utility that transpiles React component source into equivalent Python scripts for backend use.",
        isCorrect: false,
        explanation: "`React.lazy` has nothing to do with language transpilation; it is a React API that wraps a dynamic `import()` so the component's JavaScript is loaded as a separate chunk on demand."
      },
      {
        id: "B",
        text: "A function that wraps a dynamic `import()` to load a component as a separate chunk, rendering it asynchronously within a `<Suspense>` boundary.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` wraps a dynamic `import()` so the component code lives in a separate chunk fetched on demand, and React suspends the render inside a `<Suspense>` boundary until the module resolves."
      },
      {
        id: "C",
        text: "A function that introduces a fixed 10-second delay before rendering to save CPU and battery.",
        isCorrect: false,
        explanation: "Tempting if you read \"lazy\" as \"slow,\" but `React.lazy` changes when the JavaScript is downloaded, not when it executes. There is no fixed delay; the component renders as soon as its chunk has been fetched and parsed."
      },
      {
        id: "D",
        text: "A function that was deprecated in React 16 and has since been removed from the API.",
        isCorrect: false,
        explanation: "`React.lazy` was introduced in React 16.6 and remains a stable, actively maintained part of the React API. It is not deprecated and not scheduled for removal."
      }
    ],
    correctAnswer: "B",
    explanation: "`React.lazy` takes a function that returns a Promise resolving to a module with a default export. That default export is the component. By wrapping a dynamic `import()` call, React places the component's code in a separate chunk that the browser fetches only when the component is actually rendered, rather than shipping it in the initial bundle.\n\nIn practice this means you pair `React.lazy` with a `<Suspense>` boundary. While the Promise is pending, React suspends that subtree and shows the `fallback` prop instead. Once the chunk arrives and the module resolves, React re-renders the subtree with the real component. Without a `<Suspense>` ancestor the render throws, so the pairing is required, not optional.\n\nOne constraint worth knowing: the Promise must resolve to a module object whose `default` property is a React component, not the component itself. Also, `React.lazy` does not perform server-side rendering; in a Next.js App Router project you would reach for `next/dynamic` or server components to get the same code-splitting benefit with SSR support.",
    interviewLine: "I use `React.lazy` to wrap a dynamic import so the component's code lives in a separate chunk; React suspends the render and shows the Suspense fallback until the Promise resolves, which is why I always pair it with a `<Suspense>` boundary.",
    misconception: "Reading \"lazy\" as a timing or throttling mechanism (like `setTimeout`) rather than a code-splitting mechanism that controls when the browser downloads the component's JavaScript chunk.",
    hints: [
      "Look at what the argument to `React.lazy` returns \u2014 it is not a component, it is a function that returns a Promise.",
      "Ask what the browser must do before it can render the component, and what React displays in the meantime.",
      "This is not about adding a delay; it is about where the JavaScript lives and when the network fetches it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Notice how the `fallback` prop handles the pending state while the chunk is still in flight.",
      language: "tsx",
      code: "import { lazy, Suspense } from 'react';\n\nconst Dashboard = lazy(() => import('./Dashboard'));\n\nexport default function App() {\n  return (\n    <Suspense fallback={<p>Loading dashboard\u2026</p>}>\n      <Dashboard />\n    </Suspense>\n  );\n}"
    }
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
        text: "Once `setState` is called, the re-render is guaranteed and cannot be cancelled from within the updater.",
        isCorrect: false,
        explanation: "Tempting if you treat `setState` as an unconditional re-render trigger, but the functional updater form exists precisely so you can inspect the current state and return `null` to skip the render for that update."
      },
      {
        id: "B",
        text: "Return `null` from the `setState` updater when the value is unchanged, or rely on `useState`'s built-in `Object.is` bailout.",
        isCorrect: true,
        explanation: "Correct. In class components a `null` return from the updater tells React to skip the re-render; in function components `useState` performs the `Object.is` comparison internally and bails out automatically, so you never need the explicit `null` branch."
      },
      {
        id: "C",
        text: "Throw an uncaught error inside the state updater function to abort the pending update before it commits.",
        isCorrect: false,
        explanation: "This would propagate out of the render phase, unmount the component tree, and surface an error boundary or a white screen. It does not cancel a single update; it destroys the component."
      },
      {
        id: "D",
        text: "Call `window.stop()` inside the updater to halt the browser's rendering pipeline mid-flight.",
        isCorrect: false,
        explanation: "`window.stop()` halts the browser from loading remaining resources (images, stylesheets) on the current document. It has no interaction with React's scheduling queue or the virtual DOM, so it neither prevents a re-render nor affects state."
      }
    ],
    correctAnswer: "B",
    explanation: "The correct approach is to return `null` from the `setState` updater when the new value equals the current one. React treats a `null` return as a signal to skip the re-render for that particular update. In functional components the mechanism is built in: `useState` compares the new value to the current state with `Object.is` and bails out of scheduling a re-render if they are identical.\n\nWithout this guard, every call to `getUserProfile` triggers a full re-render and a diff of the component tree even when the address never changed. Children that are not memoised re-render, `useEffect` callbacks keyed on the state fire, and layout work happens for no visible change. Returning `null` (or passing an identical value to `setState`) eliminates that wasted cycle.\n\nOne nuance an interviewer will probe: the `null` bailout only applies to that one `setState` call. If another state update is batched in the same event handler, React still re-renders. And in function components you never write the `null` check yourself\u2014the bailout is automatic, so the equivalent code is simply `setAddress(user.address)` inside an effect.",
    interviewLine: "In a class component I return `null` from the `setState` updater when the value is unchanged, which tells React to skip the re-render for that update; in a function component I just pass the new value to the `useState` setter and rely on the built-in `Object.is` bailout, so I never write the comparison myself.",
    misconception: "`setState` is treated as an unconditional re-render trigger, so the only way to avoid an extra render is to skip the call entirely, rather than knowing the updater can return `null` to tell React to skip that specific update.",
    hints: [
      "Look at what the functional updater returns when the value has not changed.",
      "What does React do when a `setState` updater returns `null` versus a partial state object?",
      "In function components the comparison is automatic\u2014what does `useState` check before it schedules a re-render?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "In a function component you do not write the `null` guard; `useState` bails out on its own when the reference is unchanged.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\ninterface User {\n  id: string;\n  address: string;\n}\n\nfunction UserProfile({ user }: { user: User }) {\n  const [address, setAddress] = useState(user.address);\n\n  useEffect(() => {\n    // Object.is bailout: if user.address === address, React skips the re-render\n    setAddress(user.address);\n  }, [user.address]);\n\n  return <p>{address}</p>;\n}"
    }
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
        text: "Splitting the app into separate chunks loaded on demand to reduce initial page load time.",
        isCorrect: true,
        explanation: "Correct. The bundler produces separate chunk files at build time, and a runtime trigger (dynamic `import()`, `React.lazy`, route-level split) tells the browser to fetch a specific chunk only when that code path is reached, so the initial download is smaller."
      },
      {
        id: "B",
        text: "Distributing application logic between JavaScript and Python runtimes on the backend.",
        isCorrect: false,
        explanation: "Tempting if you read \"splitting\" as distributing work across languages or runtimes, but code-splitting is purely a client-side bundling concern; no backend language or server-side execution model is involved."
      },
      {
        id: "C",
        text: "Deleting unused JavaScript functions from the source to make the final bundle smaller.",
        isCorrect: false,
        explanation: "Tempting if you equate a smaller initial payload with less code overall, but nothing is removed from the build output \u2014 every function still ships, just in a different chunk file that the browser downloads later."
      },
      {
        id: "D",
        text: "Physically dividing source code files across multiple USB drives for storage.",
        isCorrect: false,
        explanation: "Tempting if \"splitting\" sounds like a physical operation, but the division happens in the build output (separate `.js` files served from a CDN or web server), not in hardware or storage media."
      }
    ],
    correctAnswer: "A",
    explanation: "Code-splitting is a build-time bundling technique. The bundler (Webpack, Vite, Rollup) carves your application into multiple chunk files instead of one monolithic bundle. The trigger that tells the browser to fetch a specific chunk at runtime is a dynamic `import()` call, `React.lazy()`, or a framework-level route split.\n\nIn the code, the top-level `import` statements pull `React` and `Component` into the main bundle. But `moduleA` is only referenced inside a dynamic `import('./moduleA')` that fires on click. The bundler extracts `moduleA` and its unique dependencies into a separate chunk file. The browser downloads that file only when the promise resolves, so the initial HTML and main bundle are smaller and the user can interact with the page sooner.\n\nNothing is deleted from the build output; the chunk still exists on disk or on a CDN. After the first fetch the browser caches it, so subsequent clicks are instant. `React.lazy` wraps this same mechanism for components, pairing it with `<Suspense>` so a fallback renders while the chunk is still in flight.",
    interviewLine: "I describe code-splitting as a bundler-level optimization: the build tool carves the app into chunk files, and a dynamic `import()` or `React.lazy` triggers the browser to fetch a specific chunk only when that code path is actually reached, so my initial payload stays small while every feature still ships.",
    misconception: "Thinking code-splitting removes code from the bundle rather than deferring when a subset of it is downloaded by the browser.",
    hints: [
      "Look at the difference between the static `import` at the top of the file and the dynamic `import('./moduleA')` inside the click handler.",
      "Ask yourself: does the bundler put `moduleA` in the same output file as `App`, or in a separate file the browser fetches later?",
      "The key distinction is timing of download, not whether the code exists in the build output."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "React.lazy wraps the same dynamic-import mechanism for components, and Suspense renders a fallback while the chunk is still in flight.",
      language: "jsx",
      code: "import { lazy, Suspense } from 'react';\n\nconst Dashboard = lazy(() => import('./Dashboard'));\n\nexport default function App() {\n  return (\n    <Suspense fallback={<p>Loading dashboard\u2026</p>}>\n      <Dashboard />\n    </Suspense>\n  );\n}"
    }
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
        text: "HOCs only work in Internet Explorer 8 and earlier, because they rely on a legacy prototype feature that modern browser engines removed years ago.",
        isCorrect: false,
        explanation: "Tempting if you associate HOCs with legacy patterns, but HOCs are a pure JavaScript/React pattern that works in any environment that supports React, including all modern browsers and Node.js."
      },
      {
        id: "B",
        text: "HOCs can only be authored in Python on a build server and cannot run inside a web browser, so they require a server round-trip per wrap.",
        isCorrect: false,
        explanation: "Tempting if you confuse HOCs with a language-specific feature, but HOCs are implemented in JavaScript or TypeScript and run in any JavaScript runtime, including web browsers and Node.js."
      },
      {
        id: "C",
        text: "Caveats include: must not define HOCs inside `render()` (causes remounting/state loss), static methods are not copied automatically, and refs must be forwarded via `React.forwardRef`.",
        isCorrect: true,
        explanation: "Correct. Each clause names a real constraint: unstable identity from in-render creation, missing statics on the wrapper, and `ref` not being a spreadable prop for class components."
      },
      {
        id: "D",
        text: "HOCs prevent the components they wrap from receiving any CSS styles, because the wrapper element strips `className` and `style` before rendering.",
        isCorrect: false,
        explanation: "Tempting if you imagine the wrapper blocking style injection, but the wrapper renders the wrapped component normally, so CSS applied to the inner element or via class names works exactly as before."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct answer names three real constraints of the HOC pattern. Defining a HOC inside `render()` creates a new component type on every render, so React sees a different `type` in the element and unmounts and remounts the entire subtree, discarding all local state and firing every `useEffect` cleanup. Static methods live on the original component's constructor and are not inherited by the wrapper, so `EnhancedComponent.staticMethod` is `undefined` unless you copy it manually. `ref` is not a regular prop for class components, so spreading `{...props}` does not forward it; you need `React.forwardRef` to pass it through explicitly.\n\nIn practice the remount bug is the one that bites hardest: a counter, a form, or any `useEffect` cleanup fires on every parent update and the user sees values reset to their initial state. The fix is to hoist the HOC call to module scope so the enhanced component is created once and its identity stays stable across renders.\n\nAn interviewer may probe whether `forwardRef` is still required in React 19, where `ref` is a regular prop on function components. The API still works and is still needed when the wrapped component is a class, but for function components you can now pass `ref` through `props` directly without the wrapper.",
    interviewLine: "I name the three real gotchas as identity, statics, and refs: I define the HOC at module scope so the type is stable, copy any static methods onto the wrapper explicitly, and use `forwardRef` (or pass `ref` as a prop in React 19 function components) so the ref reaches the inner element.",
    misconception: "The enhanced component is a brand-new type on every render, so React must always unmount and remount the wrapped subtree, regardless of where the HOC call lives in the module.",
    hints: [
      "Look at where the HOC is called in the code sample and ask what `type` React sees on the next render.",
      "Ask whether the enhanced component's identity is stable between renders, and whether `ref` behaves like a regular prop when you spread `{...props}`.",
      "The remount problem is about component identity changing, not about the HOC's own logic being slow."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice the HOC is defined at module scope, `ref` is passed explicitly through `forwardRef`, and `displayName` is set so DevTools shows a readable name.",
      language: "tsx",
      code: "import { forwardRef } from \"react\";\n\nfunction withAnalytics(Wrapped: React.ComponentType<any>) {\n  const Enhanced = forwardRef((props: any, ref: React.Ref) => (\n    <Wrapped ref={ref} {...props} />\n  ));\n  Enhanced.displayName = `withAnalytics(${Wrapped.displayName ?? Wrapped.name})`;\n  return Enhanced;\n}\n\nconst Card = (props: any, ref: React.Ref) => (\n  <div ref={ref} className=\"card\" {...props} />\n);\n\nconst TrackedCard = withAnalytics(Card);"
    }
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
        text: "Arrow functions are strictly forbidden inside JSX and the compiler rejects any `onClick={() => ...}` expression as a syntax error.",
        isCorrect: false,
        explanation: "JSX accepts any valid JavaScript expression inside curly braces, including arrow functions. There is no syntax rule that excludes them."
      },
      {
        id: "B",
        text: "Arrow functions defined in render are dispatched to the GPU for execution, while regular named functions run on the CPU as usual.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'render' (DOM painting, which can involve the GPU) with function execution. All JavaScript, arrow or not, runs in the JavaScript engine on the CPU."
      },
      {
        id: "C",
        text: "Defining an arrow function inside render immediately throws a fatal, unrecoverable JavaScript error that crashes the whole component tree.",
        isCorrect: false,
        explanation: "Tempting if you think inline definitions are a special case the engine rejects. They are ordinary function expressions and execute without error; the only cost is a new object allocation each render."
      },
      {
        id: "D",
        text: "Creates a new function reference on every render; harmless for simple cases, but can cause unnecessary re-renders in memoized child components (`React.memo`).",
        isCorrect: true,
        explanation: "Correct. The allocation is harmless for a plain DOM node, but when the function is passed as a prop to a `React.memo` child, the new reference fails the shallow equality check and forces an avoidable re-render."
      }
    ],
    correctAnswer: "D",
    explanation: "The answer is D. Every time React calls `render()`, the expression `() => this.handleClick()` is evaluated and produces a brand-new function object. The code is identical, but the reference in memory is different. For a plain DOM element like `<button>`, that is harmless \u2014 the browser just needs a function to invoke on click.\n\nThe problem appears when you pass that inline function as a prop to a child wrapped in `React.memo` (a helper that skips re-rendering when props are shallowly equal). `React.memo` compares each prop with `Object.is`; a new function reference fails that check, so the child re-renders even though nothing meaningful changed. Defining the handler once \u2014 as a class-property arrow function or with `useCallback` in a function component \u2014 keeps the reference stable and lets the memoized child skip its render.\n\nFor a junior-level component with a few buttons, the extra allocation is negligible and the inline form is the most readable. The cost only becomes visible when a memoized subtree re-renders hundreds of times per second, such as in a virtualized list or an animation loop.",
    interviewLine: "I'd define the handler once so the reference is stable across renders; the inline form works fine for a plain button, but if I'm passing it into a `React.memo` child, the new reference every render defeats the memoization and causes extra re-renders.",
    misconception: "The inline arrow function is treated as a syntax or runtime error, or as something that changes what the function does, when the only real effect is that its reference is a different object each render.",
    hints: [
      "Look at what `() => this.handleClick()` evaluates to each time `render()` runs.",
      "Does the reference change between two consecutive renders? What does `React.memo` use to decide whether to skip?",
      "The function still works correctly on click \u2014 the issue is not correctness but whether a memoized child can skip its render."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useCallback` keeps the `onEdit` reference stable, so `React.memo` can skip re-rendering `Row` when the parent updates for unrelated reasons.",
      language: "tsx",
      code: "import { memo, useCallback } from 'react';\n\nconst Row = memo(({ onEdit }: { onEdit: () => void }) => (\n  <button onClick={onEdit}>Edit</button>\n));\n\nfunction Table({ items }: { items: string[] }) {\n  const handleEdit = useCallback(() => console.log('edit'), []);\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>\n          <Row onEdit={handleEdit} />\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Components that only render on smartphones or in mobile viewports.",
        isCorrect: false,
        explanation: "Tempting if you associate \"loadable\" with responsive or mobile-first loading, but the term names a specific npm package, not a viewport or device condition. No part of `@loadable/component` checks screen size or user-agent."
      },
      {
        id: "B",
        text: "A third-party library (`@loadable/component`) for code-splitting with SSR support, popular before React 18 `Suspense` SSR.",
        isCorrect: true,
        explanation: "Correct. `@loadable/component` wraps `import()` in a component API, lets the bundler split the module into its own chunk, and handles SSR by collecting loaded chunk names into a manifest the server injects as preload links."
      },
      {
        id: "C",
        text: "Components that automatically download and render all images from the internet.",
        isCorrect: false,
        explanation: "Tempting if you read \"loadable\" as a generic asset-fetching mechanism, but the library deals exclusively with JavaScript module chunks produced by the bundler, not image files or network requests for media."
      },
      {
        id: "D",
        text: "A hardware testing kit for measuring electrical current in a circuit.",
        isCorrect: false,
        explanation: "Tempting if you equate \"load\" with electrical load, but `@loadable/component` is a software package in the npm registry; it has no relationship to hardware, current measurement, or physical testing equipment."
      }
    ],
    correctAnswer: "B",
    explanation: "`@loadable/component` is a third-party npm package that wraps a dynamic `import()` call inside a component API, so the bundler emits a separate JavaScript chunk for the imported module. It became the standard tool for code-splitting in server-rendered React apps because, before React 18, `React.lazy` could not be used on the server: it relied on a `Promise`-based loading model that is incompatible with synchronous SSR.\n\nIn practice, when you write `loadable(() => import('./OtherComponent'))`, the bundler splits `OtherComponent` into its own file. On the server, the library records which chunks were loaded during the render pass and writes them into a manifest. The HTML response then includes `<link rel=\"preload\">` tags for those chunks, so the browser fetches them before client-side hydration begins.\n\nReact 18 stabilized `Suspense` for SSR, and `React.lazy` now works in that context. For new projects on React 18 or later, the built-in pair is the default choice. `@loadable/component` still exists and adds features like explicit preloading and a granular SSR manifest, which is why you still see it in existing codebases.",
    interviewLine: "I'd describe it as the `@loadable/component` package: it wraps a dynamic `import()` in a component API so the bundler emits a separate chunk, and it handles SSR by collecting the loaded chunk names into a manifest the server injects as preload links before hydration.",
    misconception: "Treating \"loadable\" as a React built-in API or a CSS/media-query concept rather than the specific name of an npm package (`@loadable/component`) that wraps `import()` for SSR-aware code-splitting.",
    hints: [
      "Look at the import statement at the top of the file \u2014 what package name is actually being imported?",
      "What does the `loadable()` call wrap, and what does that tell the bundler to do with the imported module?",
      "The word \"loadable\" here is a package name in npm, not a React hook, a CSS property, or a device condition."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "This is the built-in React 18+ equivalent: `React.lazy` plus `Suspense` achieves the same code-splitting without a third-party package.",
      language: "tsx",
      code: "import { lazy, Suspense } from 'react';\n\nconst OtherComponent = lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <Suspense fallback={<p>Loading\u2026</p>}>\n        <OtherComponent />\n      </Suspense>\n    </div>\n  );\n}"
    }
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
        text: "Disable all context consumers across the entire project so nothing re-renders.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'stop re-rendering' with 'remove the consumer,' but deleting the consumer removes the feature entirely. The problem is an unnecessary re-render, not the existence of a consumer."
      },
      {
        id: "B",
        text: "Store all context values in `localStorage` and poll them with `setInterval` to detect changes.",
        isCorrect: false,
        explanation: "Tempting if you picture a pub/sub channel, but `localStorage` has no subscription mechanism and polling adds latency, blocks the main thread, and still requires a re-render to push the value into React state. It replaces a reference-identity problem with a worse one."
      },
      {
        id: "C",
        text: "Stabilize the context value reference with `useMemo` or by lifting it into state, so `Object.is` sees no change and consumers skip re-renders.",
        isCorrect: true,
        explanation: "Correct. `useMemo` returns the same object reference as long as its dependencies are unchanged, so `Object.is` on the Provider's `value` prop sees no change and React skips the consumer update."
      },
      {
        id: "D",
        text: "Convert the application into static HTML files served without any JavaScript runtime.",
        isCorrect: false,
        explanation: "Tempting if you read 'performance problem' as 'JavaScript is the problem,' but removing the runtime eliminates interactivity, state, and the ability to update the UI at all. It is not a fix for a re-rendering issue."
      }
    ],
    correctAnswer: "C",
    explanation: "React Context decides whether a consumer re-renders by comparing the `value` prop with `Object.is`. An inline object literal like `value={{ something: 'something' }}` creates a brand-new reference on every render of the Provider, so every consumer re-renders even though the data is identical. Wrapping the value in `useMemo(() => ({ a, b }), [a, b])` or lifting the object into parent state keeps the reference stable across renders, so consumers only re-render when the dependencies actually change.\n\nIn a real component tree this matters when the Provider's parent re-renders for an unrelated reason. A `Toolbar` that reads the context will re-render, re-run its effects, and potentially re-render its children, all because a sibling updated a piece of state. Memoizing the value breaks that cascade: the consumer sees the same reference and React skips the update.\n\nThe nuance an interviewer will probe: `useMemo` is a hint, not a guarantee. React may discard the memo if it needs to, and if the dependencies genuinely change the consumer should re-render. The goal is not to prevent all re-renders but to stop re-renders caused by reference churn on unchanged data.",
    interviewLine: "Context uses `Object.is` on the `value` prop to decide whether a consumer re-renders, so an inline object literal in the Provider guarantees a new reference every render. I memoize the value with `useMemo` keyed on the actual data, or I lift the object into state, so the reference stays stable and consumers only update when the data truly changes.",
    misconception: "Context re-renders consumers when the content of the value object changes, so an inline literal is fine because the fields are the same. In reality React uses reference equality (`Object.is`), so a new object literal on every render is always a change, even if every field is identical.",
    hints: [
      "Look at the `value` prop on the Provider and ask what React compares to decide if a consumer should re-render.",
      "React uses `Object.is` on the value, so a new object literal is always a 'change' even if every field is identical.",
      "The fix is about stabilizing the reference, not about removing consumers or changing the storage layer."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice that `theme` keeps the same reference across renders of `Layout`, so `Header` does not re-render when `count` changes.",
      language: "tsx",
      code: "import { createContext, useContext, useMemo, useState } from \"react\";\n\nconst ThemeContext = createContext<{ bg: string; fg: string }>();\n\nfunction Layout() {\n  const [count, setCount] = useState(0);\n  const theme = useMemo(() => ({ bg: \"#111\", fg: \"#eee\" }), []);\n\n  return (\n    <ThemeContext.Provider value={theme}>\n      <Header />\n      <button onClick={() => setCount((c) => c + 1)}>\n        Clicked {count} times\n      </button>\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Header() {\n  const { bg, fg } = useContext(ThemeContext);\n  return <header style={{ background: bg, color: fg }}>App</header>;\n}"
    }
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
        text: "Real DOM is the browser's live node tree where direct mutations trigger reflows; Virtual DOM is an in-memory JS representation diffed to batch minimal real DOM updates.",
        isCorrect: true,
        explanation: "Correct. The Real DOM lives in the browser's C++ engine and each mutation can force a synchronous reflow; the Virtual DOM is a JavaScript object tree that React diffs against the previous render to compute the minimal set of real DOM writes, batching them into one commit."
      },
      {
        id: "B",
        text: "Real DOM is a plain JavaScript object graph in the heap, while Virtual DOM is a hardware-accelerated rendering layer that paints pixels directly.",
        isCorrect: false,
        explanation: "Tempting if the word 'virtual' suggests a separate physical layer, but no such circuit exists. The Virtual DOM is a plain JavaScript object graph in the heap; the Real DOM lives in the browser's C++ rendering engine. Neither is hardware."
      },
      {
        id: "C",
        text: "They are identical; 'Real DOM' and 'Virtual DOM' are two interchangeable names for the exact same browser node tree with no difference in behavior.",
        isCorrect: false,
        explanation: "Tempting if you treat every React abstraction as just another name for the DOM, but they differ in location (JS heap vs browser engine), representation (plain objects vs typed node objects), and mutation cost (cheap object property set vs potential synchronous layout)."
      },
      {
        id: "D",
        text: "Real DOM updates are always faster than any Virtual DOM diff because they bypass the JavaScript engine entirely and write straight to the screen.",
        isCorrect: false,
        explanation: "Tempting if you assume the real DOM is the fast path because it is the actual rendering surface, but individual DOM mutations are expensive precisely because they can force synchronous layout. The Virtual DOM exists to reduce the number of such mutations, not because the real DOM is slow by design."
      }
    ],
    correctAnswer: "A",
    explanation: "The Real DOM is the browser's live node tree, implemented in C++ inside the rendering engine. Every mutation you apply to it\u2014changing a text node, inserting an element, toggling a style\u2014can force the browser to recalculate layout and repaint. The Virtual DOM is a plain JavaScript object tree that React builds in memory during render. React diffs the new tree against the previous one, computes the smallest set of attribute and node changes, and applies only those to the real DOM in a single commit.\n\nIn practice this means fifty `appendChild` calls in a loop can trigger up to fifty reflows, while the same fifty items rendered as children of one React component produce one commit. The browser batches style and layout work within a frame, but it cannot batch across separate JavaScript tasks; the Virtual DOM lets you collapse many logical updates into one task.\n\nThe Virtual DOM is not a faster rendering engine. For a single text change, writing `node.textContent = 'x'` is cheaper than running a full React render cycle. The trade-off favours the Virtual DOM when updates are numerous, interdependent, or conditional, because computing the correct mutation set by hand becomes error-prone.",
    interviewLine: "I describe the real DOM as the browser's live node tree where each mutation can trigger a synchronous reflow, and the virtual DOM as a JavaScript object tree that React diffs against the previous render to compute the minimal set of real DOM writes, batching them into a single commit phase.",
    misconception: "The Virtual DOM is a separate rendering engine or hardware layer, rather than a JavaScript-side bookkeeping structure whose sole job is to compute the minimal set of real-DOM mutations before they are applied.",
    hints: [
      "Ask yourself where each structure lives: one in the browser's C++ engine, one in the JavaScript heap.",
      "What happens after a single `element.style.width = '100px'` call versus after React finishes a render pass?",
      "The Virtual DOM is not a faster rendering engine; it is a coordination layer that reduces the number of real DOM writes."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state",
    example: {
      caption: "Notice how the loop issues 50 separate DOM mutations (each a potential reflow) while the React component produces one commit for the same 50 items.",
      language: "tsx",
      code: "// Direct DOM: every appendChild can trigger layout\nconst list = document.getElementById(\"list\");\nfor (let i = 0; i < 50; i++) {\n  const li = document.createElement(\"li\");\n  li.textContent = `Item ${i}`;\n  list.appendChild(li); // 50 potential reflows\n}\n\n// React: 50 children in one render, one commit\nfunction ItemList() {\n  return (\n    <ul id=\"list\">\n      {Array.from({ length: 50 }, (_, i) => (\n        <li key={i}>Item {i}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Rewrite the entire Bootstrap CSS file in raw assembly language first, because React requires a compiled low-level styling layer before import.",
        isCorrect: false,
        explanation: "Tempting only if you imagine React requires a new 'language layer' for styling, but Bootstrap is plain CSS; you import the compiled file, you do not transpile or rewrite it into another language."
      },
      {
        id: "B",
        text: "Install the `bootstrap` package and import its CSS file, or use a React wrapper library like `react-bootstrap` that handles the styling integration.",
        isCorrect: true,
        explanation: "Correct. Bootstrap is a CSS framework, so you make its stylesheet reach the browser via an npm import, a React wrapper library, or a CDN link, and your components then use the same `class` attributes as any other HTML."
      },
      {
        id: "C",
        text: "Bootstrap can only be used on WordPress-powered websites, so a React app must first be embedded inside a WordPress theme to load it.",
        isCorrect: false,
        explanation: "Tempting if your only exposure to Bootstrap was a WordPress theme, but it is a standalone CSS and JS framework with no dependency on any CMS, server, or hosting platform."
      },
      {
        id: "D",
        text: "Bootstrap is strictly incompatible with React because its class-based styling cannot coexist with React's component rendering model.",
        isCorrect: false,
        explanation: "Tempting if you equate React with a closed styling ecosystem, but React components render to the same DOM nodes that CSS selectors target, so Bootstrap classes and React markup compose without conflict."
      }
    ],
    correctAnswer: "B",
    explanation: "Bootstrap is a CSS framework, so adding it to a React app means making its stylesheet available to your components. The standard path is `npm install bootstrap` followed by `import 'bootstrap/dist/css/bootstrap.min.css'` in a module that runs before your UI renders. A React component library like `react-bootstrap` wraps each Bootstrap element (Button, Modal, Form) in a component but still depends on those same CSS classes underneath. A CDN link in `index.html` is a third option that skips the bundler entirely.\n\nThe npm-plus-import route is the default for Vite or Create React App projects because the bundler handles minification and cache-busting for you. Importing the full `bootstrap.min.css` ships the entire stylesheet (~230 kB minified) with every route, which is the main reason some teams prefer `react-bootstrap` or a utility framework to avoid loading styles they never use.\n\nIn a Next.js App Router project the import is commonly placed in `app/layout.tsx` so the stylesheet loads once for the entire route tree rather than being referenced independently by each page.",
    interviewLine: "I install the `bootstrap` package, import the compiled CSS in a top-level module, and use `className` strings directly in my JSX. If I need React-managed modals or dropdowns instead of Bootstrap's jQuery-based JS, I swap in `react-bootstrap` components, which render the same CSS classes but let me control open and close state with React hooks.",
    misconception: "Thinking Bootstrap is a React-specific library or that React requires its own proprietary styling pipeline, when in fact Bootstrap is plain CSS applied to standard HTML and works with any framework that renders DOM elements.",
    hints: [
      "Bootstrap ships as a CSS file and an optional JS bundle\u2014what does 'adding' a CSS framework actually require of your build pipeline?",
      "Ask whether your React components render into the same DOM that CSS selectors target, or whether a separate styling pipeline is needed.",
      "You do not need a new language, a CMS, or a compatibility shim; you need the stylesheet to reach the browser and the class names to appear in your markup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the component is plain JSX with `className` strings\u2014no special React API is needed to consume Bootstrap's styles.",
      language: "tsx",
      code: "import 'bootstrap/dist/css/bootstrap.min.css';\n\nfunction SearchBar() {\n  return (\n    <div className=\"input-group mb-3\">\n      <input\n        type=\"text\"\n        className=\"form-control\"\n        placeholder=\"Search\u2026\"\n      />\n      <button className=\"btn btn-primary\" type=\"submit\">\n        Search\n      </button>\n    </div>\n  );\n}\n\nexport default SearchBar;"
    }
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
        text: "Redux centralizes state in one store updated by pure reducers, while MobX uses distributed observable objects with automatic dependency tracking.",
        isCorrect: true,
        explanation: "Correct. Redux enforces a single source of truth modified only via explicit actions and reducers, whereas MobX allows multiple mutable stores that components subscribe to automatically."
      },
      {
        id: "B",
        text: "Redux is a drop-in replacement for MobX, and they share the same store architecture and update mechanisms.",
        isCorrect: false,
        explanation: "Tempting if you view both simply as 'state managers', but they have fundamentally different APIs, update models (explicit actions vs. implicit mutations), and mental models for wiring components to state."
      },
      {
        id: "C",
        text: "Redux requires a single global store for all state, whereas MobX only supports local component state.",
        isCorrect: false,
        explanation: "This confuses scope with architecture. While Redux typically uses one root store, MobX is designed specifically for creating multiple, granular observable stores that can be shared across components or the whole app."
      },
      {
        id: "D",
        text: "Redux uses automatic dependency tracking to re-render components, while MobX requires manual subscription to state changes.",
        isCorrect: false,
        explanation: "This reverses the core mechanism. MobX uses automatic dependency tracking (reactivity) so components update when they read an observable, whereas Redux requires explicit subscription via hooks like `useSelector` or `connect`."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux centralizes all application state in a single store and changes it only through pure reducer functions triggered by dispatched actions, enforcing immutability so every update produces a new object. MobX distributes state across any number of observable objects, lets you mutate them directly, and uses a reactive graph: a component that reads an observable automatically subscribes and re-renders when that value changes.\n\nIn practice this means a Redux component must explicitly select the slice it needs with `useSelector`, and every state transition is traceable through the action log. A MobX component just reads `store.user.name` and the library handles subscription, which cuts boilerplate but scatters the update path across many stores.\n\nAn interviewer may follow up on debugging: Redux's explicit action-to-reducer pipeline makes time-travel and replay natural, while MobX's scattered mutations make deterministic replay harder because you must wrap every write in an `action` to get a similar audit trail.",
    interviewLine: "Redux gives me one store, pure reducers, and a dispatch pipeline I can log and replay; MobX gives me many observable objects that components subscribe to automatically, so updates are implicit and there is no central action log to inspect.",
    misconception: "Treating Redux and MobX as interchangeable drop-in replacements rather than two different update models \u2014 one explicit and centralized around actions, the other implicit and distributed across observable objects.",
    hints: [
      "Think about how a component learns that state changed: does it ask, or does the library tell it?",
      "In Redux, what function must you write to describe every state transition? In MobX, what does the library track for you automatically?",
      "One library requires you to name every action explicitly; the other requires you to name nothing \u2014 which is which?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice that `add` mutates `items` directly and no component needs a dispatch call \u2014 MobX's reactive graph handles the re-render automatically.",
      language: "typescript",
      code: "import { makeAutoObservable } from \"mobx\";\n\nclass CartStore {\n  items: string[] = [];\n\n  constructor() {\n    makeAutoObservable(this);\n  }\n\n  add(product: string) {\n    this.items.push(product);\n  }\n}\n\nexport const cart = new CartStore();"
    }
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
        explanation: "The transform is a compilation step that rewrites JSX syntax into plain JavaScript function calls; it has no connection to hardware architecture or quantum computing."
      },
      {
        id: "B",
        text: "Automatically translates text into 100 foreign languages.",
        isCorrect: false,
        explanation: "The JSX transform changes how JSX is transpiled to JavaScript; it does not touch string content, i18n pipelines, or any translation logic."
      },
      {
        id: "C",
        text: "Using JSX without `import React from 'react'` in scope, compiling to optimized runtime imports (`react/jsx-runtime`), slightly reducing bundle size, and enabling future React compiler optimizations.",
        isCorrect: true,
        explanation: "Correct. The transform compiles JSX to `jsx`/`jsxs` calls from `react/jsx-runtime`, removes the need for `React` in scope, lets the bundler tree-shake more aggressively, and gives the React Compiler a cleaner surface to optimise."
      },
      {
        id: "D",
        text: "Disables all CSS stylesheets in the application.",
        isCorrect: false,
        explanation: "The transform only affects how JSX syntax is compiled to JavaScript function calls; it has no interaction with CSS, style sheets, or rendering of visual styles."
      }
    ],
    correctAnswer: "C",
    explanation: "The new JSX transform, introduced in React 17, compiles JSX into calls to `jsx` and `jsxs` from `react/jsx-runtime` (or `react/jsx-dev-runtime` in development) instead of `React.createElement`. Because the compiler injects the `react/jsx-runtime` import automatically, you no longer need `import React from 'react'` in scope in every file that contains JSX.\n\nIn a real codebase this means you can delete the `React` default import from hundreds of files, keep only the named imports you actually use (`useState`, `useEffect`, etc.), and let the bundler tree-shake the runtime. The bundle-size saving is small per file but compounds across a large app, and the dev runtime gives you component names in error overlays without any extra setup.\n\nThe deeper benefit is forward-looking: because JSX compilation is decoupled from the `React` namespace, the React Compiler (formerly React Forget) can analyse and auto-memoise components without requiring `React.memo` or `useMemo` at every call site. The old `React.createElement` coupling made that kind of whole-program optimisation much harder to reason about.",
    interviewLine: "The new JSX transform compiles JSX to `jsx` and `jsxs` calls from `react/jsx-runtime` instead of `React.createElement`, so I drop the `React` default import, the bundle is marginally smaller, and the React Compiler gets a cleaner surface for automatic memoisation.",
    misconception: "Treating the new JSX transform as a runtime or rendering change, when it is purely a compilation-time rewrite of how JSX maps to function calls, leaving the rendered output and runtime behaviour identical.",
    hints: [
      "Think about what `React.createElement` used to be and what replaced it in the compiled output.",
      "What import does the compiler now inject automatically, and what does that let you remove from every source file?",
      "The transform is a compilation concern, not a runtime, i18n, or styling one."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Only `useState` is imported from `react`; the JSX itself is compiled to `react/jsx-runtime` calls by the transform, so no `React` default import is needed.",
      language: "tsx",
      code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;"
    }
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
        text: "Cache credit-card and payment-confirmation endpoints in a Cache-First bucket with no expiration.",
        isCorrect: false,
        explanation: "Tempting if you treat every successful response as cacheable, but payment and auth endpoints are per-transaction by design; a stale 201 or a cached token means double-charges or leaked sessions. These routes need Network-Only or at minimum Network-First with a very short timeout."
      },
      {
        id: "B",
        text: "Skip the Service Worker cache layer and let every JS, CSS, and font request hit the network on each page load.",
        isCorrect: false,
        explanation: "Tempting as a way to avoid cache-staleness bugs, but it forfeits offline support, multiplies bandwidth cost on every navigation, and makes first-paint depend on full bundle download every time. The browser HTTP cache still helps, but you lose the ability to pre-cache, background-update, or serve from a different origin."
      },
      {
        id: "C",
        text: "Route hashed static assets through Cache-First, images and read-only data through Stale-While-Revalidate, and dynamic API calls through Network-First.",
        isCorrect: true,
        explanation: "Correct. Each handler's staleness window matches the data: immutable hashes never change so cache is always fresh, images tolerate a brief stale window for instant paint, and per-request API data must come from the server first."
      },
      {
        id: "D",
        text: "Serve the Service Worker script with `Cache-Control: public, max-age=31536000, immutable` so it loads once and stays put.",
        isCorrect: false,
        explanation: "Tempting if you think of the SW script as just another static asset, but it is the browser's update channel: the browser revalidates that URL on every navigation to detect a new worker. A one-year immutable header means the browser never revalidates, so users are stuck on the old routing rules and cache version indefinitely."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct strategy maps each request class to the handler whose staleness semantics match that data's mutability. Hashed filenames like `main.3a7f2c.js` are content-addressed: the URL never resolves to different bytes, so Cache-First is safe and removes the network round-trip entirely. Images and read-only listings are mutable but tolerable to serve a moment stale, so Stale-While-Revalidate returns the cached copy instantly and refreshes it in the background. Dynamic API responses change per request, so Network-First hits the server first and falls back to cache only on failure.\n\nIn practice this means a returning user loads the app shell from cache in under 50 ms, sees the last-known product listing while the fresh one fetches, and always gets a current cart or auth state. A single \"cache everything\" or \"bypass everything\" policy breaks one of those three guarantees.\n\nThe edge an interviewer probes next: the Service Worker script itself is the update channel. It must be served with `Cache-Control: no-cache` or a short `max-age` so the browser revalidates on each navigation. Pin it with a long immutable TTL and users are frozen on the old worker, never receiving new routing rules or cache-version bumps.",
    interviewLine: "I route by mutability: content-hashed assets go Cache-First because the URL never changes, read-only data goes Stale-While-Revalidate so the user gets an instant response while the background refresh lands, and anything that changes per request\u2014cart, auth, live feeds\u2014goes Network-First with a short timeout before falling back to cache.",
    misconception: "One cache handler applied uniformly to every request is simpler and \"good enough\"; the real design question is matching each URL class to the handler whose staleness semantics fit that data's mutability.",
    hints: [
      "Look at what makes each asset type safe to serve stale: does the URL change when the content changes?",
      "For each class, ask whether a stale response is acceptable and for how long before it becomes a bug.",
      "The Service Worker script is the update channel itself\u2014caching it immutably would freeze every future change."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/caching",
    example: {
      caption: "Notice the three distinct fallback paths: static assets fall through to network, API calls fall through to cache, and images serve stale immediately while refreshing in the background.",
      language: "typescript",
      code: "const STATIC = /^\\/static\\/[a-z0-9]+\\.[a-f0-9]{8}\\.(js|css|woff2)$/;\nconst IMAGES = /\\.(png|webp|avif|svg)$/;\nconst API = /^\\/api\\/(v\\d+\\/)?(cart|checkout|auth)\\//;\nself.addEventListener('fetch', (event) => {\n  const url = new URL(event.request.url);\n  if (STATIC.test(url.pathname)) {\n    event.respondWith(\n      caches.match(event.request).then((hit) => hit ?? fetch(event.request))\n    );\n  } else if (API.test(url.pathname)) {\n    event.respondWith(\n      fetch(event.request).catch(() => caches.match(event.request))\n    );\n  } else if (IMAGES.test(url.pathname)) {\n    event.respondWith(\n      caches.match(event.request).then((hit) => {\n        const refresh = fetch(event.request).then((res) => {\n          caches.open('images').then((c) => c.put(event.request, res.clone()));\n          return res;\n        }).catch(() => hit);\n        return hit ?? refresh;\n      })\n    );\n  }\n});"
    }
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
        text: "useCallback on every function passed as a prop, so children never see a new reference",
        isCorrect: false,
        explanation: "Tempting if you assume a new function reference is always the problem. In practice `useCallback` only saves a re-render when the child is wrapped in `React.memo` and that child would otherwise re-render on every parent update. Applied to every prop, it adds a dependency comparison per function per render and obscures intent for zero measurable gain."
      },
      {
        id: "B",
        text: "Wrapping every component in React.memo as a matter of course",
        isCorrect: false,
        explanation: "Each `React.memo` adds a shallow prop comparison on every render of that component. For a cheap component \u2014 a few text nodes, a small layout \u2014 the comparison costs more than the render it is trying to skip. The memo only pays off when the component is expensive to render and its props are genuinely stable across re-renders."
      },
      {
        id: "C",
        text: "useMemo around an expensive computation whose inputs rarely change",
        isCorrect: true,
        explanation: "Correct. The filter over `hugeList` is O(n) and genuinely costly; because `hugeList` only changes when new data arrives, the dependency array matches on most renders and the cached array is returned. The comparison cost is amortised across many skipped passes over the list."
      },
      {
        id: "D",
        text: "useMemo around a simple arithmetic expression to avoid recomputing it",
        isCorrect: false,
        explanation: "Tempting if you treat every re-evaluation as waste. But the memo machinery \u2014 comparing the dependency array, reading the cache slot, returning the stored value \u2014 involves more work than adding or multiplying two numbers. The expression is strictly slower with the memo than without it."
      }
    ],
    correctAnswer: "C",
    explanation: "Memoization is a trade: on every render React shallow-compares the dependency array and, if it matches, returns a cached value instead of re-running the function. That bookkeeping is cheap but not free. It only wins when the skipped work is genuinely expensive relative to the comparison \u2014 a filter or sort over a large array qualifies, a two-number addition does not.\n\nIn real code this shows up as a search box filtering a 50 000-item list. If the list only changes when a fetch resolves, the `useMemo` hit rate is high and you save a full pass over the array on every keystroke. If instead the list is rebuilt from state that updates on every interaction, the dependency never matches, you pay the comparison cost every render, and you gain nothing.\n\nThe \"inputs rarely change\" clause in option C is the part candidates skip. A memo over an expensive computation whose dependency changes every render is strictly worse than no memo, because you now pay both the comparison and the recomputation. `useMemo` is also a hint, not a guarantee: React may discard the cached value without notice, so you should never rely on it for correctness.",
    interviewLine: "I only reach for useMemo or React.memo when I can point to a computation that is genuinely expensive and whose inputs change infrequently \u2014 otherwise the dependency comparison and cache lookup cost more than just re-running the expression.",
    misconception: "Memoization is a free speedup to apply liberally, when in reality it is a trade-off that only wins if the saved computation is expensive relative to the per-render comparison cost and the inputs are stable enough to hit the cache.",
    hints: [
      "What does the memoization itself cost on every render, even when it hits?",
      "Compare that overhead to the work you are skipping: is the skipped work actually expensive, or is it a single arithmetic step?",
      "The winning case needs both halves: an expensive computation AND inputs that rarely change. One without the other does not pay for the bookkeeping."
    ],
    source: "react-17-2025",
    estimatedMinutes: 3,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "The sort is O(n log n) and its input only changes on fetch, while the filter's input (`query`) changes every keystroke, so a memo would recompute on every render anyway.",
      language: "tsx",
      code: "const { items, query } = useStore();\n\n// O(n log n) over 10k items \u2014 worth memoising; `items` only changes on fetch\nconst sorted = useMemo(\n  () => [...items].sort((a, b) => b.score - a.score),\n  [items],\n);\n\n// O(n) over the full list, but `query` changes every keystroke \u2014 memo would never hit\nconst visible = sorted.filter((item) =>\n  item.name.toLowerCase().includes(query.toLowerCase()),\n);"
    }
  }
];
