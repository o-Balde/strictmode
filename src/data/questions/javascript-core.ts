import { QuizQuestion } from '../types';

export const JAVASCRIPT_CORE_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-how-to-handle-asynchronous-actions-in-redux-thunk",
    title: "How to handle asynchronous actions in Redux Thunk?",
    prompt: "How to handle asynchronous actions in Redux Thunk?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "export const addUser = ({ firstName, lastName }) => {\n  return dispatch => {\n    dispatch(addUserStart());\n  }\n\n  axios.post('https://jsonplaceholder.typicode.com/users', {\n    firstName,\n    lastName,\n    completed: false\n  })\n  .then(res => {\n    dispatch(addUserSuccess(res.data));\n  })\n  .catch(error => {\n    dispatch(addUserError(error.message));\n  })\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Return a function from the action creator; Redux Thunk middleware detects it, invokes it with `dispatch` and `getState`, and you dispatch plain action objects from within that function.",
        isCorrect: true,
        explanation: "Correct. Redux Thunk's entire contract is: if the dispatched action is a function, call it with `dispatch` and `getState`. That is what gives you a place to run async code and dispatch multiple plain actions as the flow progresses."
      },
      {
        id: "B",
        text: "Make the action creator `async`, await the API call, and return the resolved data as the action payload so reducers can consume it.",
        isCorrect: false,
        explanation: "Tempting because \"async action creator\" sounds natural, but Redux Thunk intercepts functions, not Promises. An `async` action creator returns a Promise; without a separate Promise-unwrapping middleware, that Promise is passed straight to reducers, which expect plain objects and will break."
      },
      {
        id: "C",
        text: "Dispatch a plain object whose `payload` is the unresolved Promise; Redux's internal `__IS_PROMISE__` check will await it before calling reducers.",
        isCorrect: false,
        explanation: "This confuses Redux with the older `redux-promise` middleware. Core Redux has no built-in Promise handling and no `__IS_PROMISE__` flag; reducers are synchronous pure functions and will receive the raw Promise object as-is."
      },
      {
        id: "D",
        text: "Move the `axios` call before the `return` so it fires immediately in the action creator, then dispatch the resolved value from inside the thunk.",
        isCorrect: false,
        explanation: "Seems like a one-line fix, but it fails twice: the fetch fires the moment the action creator is called (before `dispatch` is ever invoked), and `dispatch` is not in scope at the outer function level, so you cannot dispatch the result from there."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux Thunk is a middleware that intercepts dispatched actions. If the action is a function rather than a plain object, the middleware calls that function, passing `dispatch` and `getState` as arguments. Inside the returned function you can perform any asynchronous work\u2014fetch calls, timers, WebSocket subscriptions\u2014and dispatch plain action objects at each stage (start, success, error). Without this middleware, `dispatch` only accepts plain objects and reducers only see synchronous values, so multi-step async flows are impossible to express.\n\nIn the snippet, the `axios` call sits after the `return` statement in the outer action creator, making it unreachable, and `dispatch` is not in scope there. The fix is to move the entire async flow inside the returned thunk function so it runs when the middleware invokes it, not when the action creator is called.\n\nA nuance interviewers probe: the thunk function does not have to be declared `async`. You can use `.then()/.catch()` chains or `async/await` inside it; what matters is that the action creator returns a function, not a Promise. You may also return a Promise from the thunk so the calling component can `await dispatch(fetchUser(id))`, but Redux itself ignores the return value.",
    interviewLine: "Redux Thunk middleware checks whether the dispatched action is a function; if so, it calls that function with `dispatch` and `getState`, which is what lets me run a `fetch` and then dispatch `START`, `SUCCESS`, or `ERROR` actions in sequence. The action creator itself stays synchronous\u2014it just returns that thunk function.",
    misconception: "Treating the action creator's return value as the unit of async work\u2014i.e., assuming an `async` function or a returned Promise is sufficient\u2014instead of recognizing that Thunk's contract is specifically about intercepting a returned function and giving it access to `dispatch` and `getState`.",
    hints: [
      "Think about what `dispatch` actually accepts out of the box versus what a middleware can extend it to accept.",
      "In the snippet, notice where `dispatch` is in scope and where the `axios` call sits relative to the `return` statement.",
      "The middleware's job is to detect a specific type of action and call it with extra arguments\u2014what type, and what arguments?"
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "The thunk function is where async logic lives; `dispatch` is only available inside it.",
      language: "tsx",
      code: "import { useDispatch } from 'react-redux';\n\nconst fetchUser = (id: string) => {\n  return (dispatch: (a: object) => void) => {\n    dispatch({ type: 'USER_FETCH_START' });\n    fetch(`/api/users/${id}`)\n      .then((res) => res.json())\n      .then((user) => dispatch({ type: 'USER_FETCH_OK', payload: user }))\n      .catch((err) => dispatch({ type: 'USER_FETCH_ERR', payload: err.message }));\n  };\n};\n\nfunction UserCard({ id }: { id: string }) {\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch(fetchUser(id))}>Load</button>;\n}"
    }
  },
  {
    id: "react-explain-strict-mode-in-react",
    title: "Explain Strict Mode in React.",
    prompt: "Explain Strict Mode in React., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "function App() {\n return (\n   <React.StrictMode>\n     <div classname=\"App\">\n       <Header/>\n       <div>\n         Page Content\n       </div>\n       <Footer/>\n     </div>\n   </React.StrictMode>\n );\n}\n\nimport React from \"react\";\nimport ReactDOM from \"react-dom\";\nimport App from \"./App\";\nconst rootElement = document.getElementById(\"root\");\nReactDOM.render(\n<React.StrictMode>\n  <App />\n</React.StrictMode>,\nrootElement\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A production-only optimization mode that disables error logging to improve runtime performance.",
        isCorrect: false,
        explanation: "Tempting if you associate \"strict\" with a hardened production build, but StrictMode is the opposite: it is active only in development and deliberately adds warnings and extra work rather than removing them."
      },
      {
        id: "B",
        text: "A build-time compiler setting that restricts JavaScript execution to WebAssembly modules.",
        isCorrect: false,
        explanation: "Mixes up a React runtime component with a bundler or language-level constraint. StrictMode is a JSX element you render; it has no relationship to WebAssembly or to how your code is compiled."
      },
      {
        id: "C",
        text: "A browser security layer that encrypts rendered DOM nodes to prevent client-side tampering.",
        isCorrect: false,
        explanation: "Confuses a developer diagnostic tool with a CSP or encryption mechanism. StrictMode reads and warns about your component code in development; it never touches the rendered DOM or any network traffic."
      },
      {
        id: "D",
        text: "A development-only wrapper that double-invokes renders and effects to expose impure code and warns on deprecated APIs.",
        isCorrect: true,
        explanation: "Correct. StrictMode is a dev-only wrapper whose double-invocation of renders, updaters, and effects exposes impure code, and whose deprecation warnings flag legacy lifecycle methods, `findDOMNode`, and the old context API."
      }
    ],
    correctAnswer: "D",
    explanation: "`<React.StrictMode>` is a development-only wrapper component. In React 18 and later it double-invokes render functions, state updaters, and effects (mount, unmount, remount) to surface impure code, and it emits console warnings when you use legacy lifecycle methods, `findDOMNode`, or the old context API. It is a runtime wrapper you place around your tree; it is not a compiler flag, a build step, or a production feature.\n\nIn real code this means an effect that subscribes to an event or starts a timer without returning a cleanup will visibly break under double-mount: two subscriptions are created, the first is never torn down, and the console shows the duplicate call. Wrapping your app in StrictMode during development catches exactly that class of bug before it ships to users.\n\nThe nuance an interviewer will probe: StrictMode has zero effect in a production bundle. The extra invocations and warnings are stripped at build time, so a component that \"works fine\" in production can still be impure, and you will only see the problem when you run the dev server. It is a diagnostic aid, not a correctness guarantee.",
    interviewLine: "I describe StrictMode as a dev-only wrapper that double-invokes render and effects to surface impure code, and I note it carries no runtime cost in production because the extra calls are stripped at build time.",
    misconception: "Treating StrictMode as a production safeguard or a build-time compiler setting, when in fact it is a development-only runtime wrapper whose double-invocation and warnings are entirely stripped from the production bundle.",
    hints: [
      "Look at what StrictMode does differently in a development build versus a production build.",
      "Ask which functions React calls twice and why that would expose a missing cleanup or a mutation in render.",
      "It is not a security layer, a compiler flag, or a production optimization."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode",
    example: {
      caption: "In development, StrictMode mounts the effect, immediately unmounts it, then mounts it again, so the console logs twice and the interval is created, destroyed, and recreated.",
      language: "tsx",
      code: "import { useEffect, useState } from \"react\";\n\nfunction Timer() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log(\"effect ran, count =\", count);\n    const id = setInterval(() => setCount((c) => c + 1), 1000);\n    return () => clearInterval(id);\n  }, [count]);\n\n  return <span>{count}</span>;\n}\n\nexport default function App() {\n  return (\n    <React.StrictMode>\n      <Timer />\n    </React.StrictMode>\n  );\n}"
    }
  },
  {
    id: "react-what-are-error-boundaries-in-react-for",
    title: "What are error boundaries in React for?",
    prompt: "What are error boundaries in React for?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Server-side middleware that intercepts HTTP 500 responses on Next.js API routes and returns a structured JSON error payload to the browser client.",
        isCorrect: false,
        explanation: "Tempting if you equate any error handling with HTTP status codes, but error boundaries live entirely in the browser's React tree and never see a request/response cycle. They have no access to the network layer or Express-style middleware."
      },
      {
        id: "B",
        text: "Class components that implement `getDerivedStateFromError` and `componentDidCatch` to catch render, lifecycle, and constructor errors in children and show fallback UI.",
        isCorrect: true,
        explanation: "Correct. Those two methods are the only API React exposes for error boundaries, and the scope is precisely the synchronous render path of the child subtree."
      },
      {
        id: "C",
        text: "Static-analysis linters that flag TypeScript syntax and type errors in source files before the production bundle is ever executed in the browser.",
        isCorrect: false,
        explanation: "Tempting if you read \"error\" as a compile-time concern, but error boundaries are runtime components that exist only after the bundle has loaded and React is rendering. They do nothing at build or lint time."
      },
      {
        id: "D",
        text: "`try/catch` wrappers that automatically intercept asynchronous errors in event handlers, `setTimeout` callbacks, and unhandled `Promise` rejections.",
        isCorrect: false,
        explanation: "Tempting because a `try/catch` does catch synchronous throws, but React explicitly excludes event-handler and async code from the boundary's scope. Those callbacks run outside the render commit, so a boundary never sees the throw."
      }
    ],
    correctAnswer: "B",
    explanation: "Error boundaries are class components that intercept JavaScript errors thrown during rendering, in lifecycle methods, and in constructors of any child in their subtree. They use `static getDerivedStateFromError(error)` to update their own state and `componentDidCatch(error, errorInfo)` to log the failure, then return fallback UI from `render` in place of the broken tree.\n\nIn a real app you wrap a route or a feature panel in an error boundary. When a child throws on render, React unwinds to the nearest boundary, calls those two methods, and the boundary's `render` returns a message or a retry button instead of leaving a blank white screen.\n\nThey do not catch errors in event handlers, `setTimeout` callbacks, or `Promise` rejections; those still need their own `try/catch` or `.catch()`. And because the two required methods are class-only, there is no hook-based error boundary in React 19.",
    interviewLine: "I describe error boundaries as class components that hook into the render commit via `getDerivedStateFromError` and `componentDidCatch`; they catch synchronous throws from child rendering, lifecycle, and constructors, but I remember they deliberately do not intercept event-handler or async errors, which still need their own `try/catch`.",
    misconception: "Error boundaries are a universal try/catch around your component tree, so any throw anywhere\u2014event handler, timer, promise\u2014gets caught. In reality they only intercept errors thrown synchronously during the render pass of the child subtree.",
    hints: [
      "Think about which phase of React's lifecycle the boundary methods are called in\u2014render commit or user interaction.",
      "Ask yourself: does a `setTimeout` callback or an `onClick` handler run inside the same call stack as `render`?",
      "Event handlers and async callbacks execute outside the render pass, so a boundary never sees those throws."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    example: {
      caption: "Notice that the boundary rescues the render throw in `Widget`; an error inside an `onClick` handler in that same tree would not be caught by the boundary.",
      language: "tsx",
      code: "import { Component, type ReactNode } from \"react\";\n\nclass Boundary extends Component<{ children: ReactNode }, { hasError: boolean }> {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(error: Error) { console.error(error); }\n  render() {\n    if (this.state.hasError) return <p>Something went wrong.</p>;\n    return this.props.children;\n  }\n}\n\nfunction Widget() {\n  const items = null as unknown as number[];\n  return <ul>{items.map((n) => <li key={n}>{n}</li>)}</ul>;\n}\n\nexport default function App() {\n  return (\n    <Boundary>\n      <Widget />\n    </Boundary>\n  );\n}"
    }
  },
  {
    id: "react-discuss-synthetic-events-in-react",
    title: "Discuss synthetic events in React",
    prompt: "Discuss synthetic events in React, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "function MyComponent() {  const handleClick = (event) => {    event.preventDefault();    console.log('Button clicked');  };\n  return <button onClick={handleClick}>Click me</button>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Events dispatched on isolated Web Worker threads, completely outside the main-thread DOM.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"synthetic\" with \"off the main thread,\" but synthetic events are created on the main thread from the browser's native DOM event; Web Workers have no DOM and cannot receive click or input events."
      },
      {
        id: "B",
        text: "Simulated events that only exist in Jest or Testing Library runs and never fire in a real browser.",
        isCorrect: false,
        explanation: "Tempting because testing libraries do dispatch synthetic events, but in production React's runtime creates the same `SyntheticEvent` wrapper for every real user interaction; the mechanism is identical in both environments."
      },
      {
        id: "C",
        text: "A legacy event system fully removed in React 18, replaced by direct native listener attachment.",
        isCorrect: false,
        explanation: "Tempting if you heard that React 17 changed where listeners attach and assumed the wrapper itself was retired, but React 19 still wraps every native event in a `SyntheticEvent` before calling your handler."
      },
      {
        id: "D",
        text: "Cross-browser wrappers around native DOM events that normalize properties and methods, with listeners delegated to the React root container since React 17.",
        isCorrect: true,
        explanation: "Correct. `SyntheticEvent` normalizes browser-specific differences, and since React 17 the delegation point moved from `document` to the element passed to `createRoot()`, so nested React trees each manage their own event flow."
      }
    ],
    correctAnswer: "D",
    explanation: "React wraps every native DOM event in a `SyntheticEvent` object before handing it to your handler. The wrapper normalizes properties that differ across browsers (for example, `target` versus the old `srcElement`) and exposes a consistent set of methods like `preventDefault()` and `stopPropagation()`. Since React 17, React attaches a single set of listeners to the root container you pass to `createRoot()`, and events bubble up through the React tree from there instead of being attached to `document`.\n\nIn practice this means your handler code is identical whether the user clicks on a Chrome desktop, a Safari iPad, or a Firefox phone. It also means the event object you receive is a stable, synchronous wrapper: because event pooling was removed in React 17, you can safely read `event.target` inside a `setTimeout` or pass the event to a utility function without calling `event.persist()`.\n\nThe nuance an interviewer will probe: the synthetic event is not the native event. `event.nativeEvent` gives you the original `DOMEvent`, so you can still reach browser-specific properties the wrapper does not expose. The wrapper also means React controls the order in which `onClick` and `onFocus` fire relative to each other, independent of the native event's `bubbles` flag.",
    interviewLine: "React wraps the native DOM event in a SyntheticEvent object so I get the same `target`, `preventDefault`, and `stopPropagation` API regardless of browser, and since React 17 the delegation listeners live on the root container I pass to createRoot rather than on document.",
    misconception: "Treating \"synthetic\" as \"fake or simulated\" rather than \"a wrapper around a real native event,\" which leads candidates to think React bypasses the browser's event system entirely.",
    hints: [
      "React does not create events from scratch; it intercepts a native DOM event and hands you a wrapper. Ask what that wrapper normalizes and where the listener actually lives.",
      "Since React 17 the delegation point is not `document` \u2014 it is the element you pass to `createRoot()`. What does that mean for two separate React trees on the same page?",
      "The word \"synthetic\" does not mean \"fake.\" The underlying native event still exists; you can reach it via `event.nativeEvent`."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object",
    example: {
      caption: "Notice that `event.nativeEvent` is a real DOM `Event`, while the outer object is React's normalized wrapper, and the root container is where React attaches its delegated listeners.",
      language: "tsx",
      code: "import { createRoot } from \"react-dom/client\";\n\nfunction App() {\n  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {\n    console.log(e.target.value);           // normalized by SyntheticEvent\n    console.log(e.nativeEvent instanceof Event); // true \u2013 the real DOM event\n  };\n\n  return <input type=\"text\" onChange={handleInput} />;\n}\n\nconst container = document.getElementById(\"root\")!;\ncreateRoot(container).render(<App />); // listeners delegate from this node"
    }
  },
  {
    id: "react-how-do-you-test-asynchronous-code-in-react-components",
    title: "How do you test asynchronous code in React components?",
    prompt: "How do you test asynchronous code in React components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "import { render, screen, waitFor } from '@testing-library/react';import MyComponent from './MyComponent';\ntest('fetches data and renders it', async () => {  render(<MyComponent />);  await waitFor(() => {    expect(screen.getByText('Data loaded')).toBeInTheDocument();  });});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use a synchronous `while (true)` loop to block the JavaScript thread until the network promise resolves.",
        isCorrect: false,
        explanation: "Tempting if you think \"waiting\" means occupying the thread, but a `while (true)` loop never yields, so no microtasks, no promise continuations, and no DOM mutations can run. The test hangs forever and the event loop is starved."
      },
      {
        id: "B",
        text: "Insert a fixed `await new Promise(r => setTimeout(r, 10000))` before each assertion to give the fetch time to finish.",
        isCorrect: false,
        explanation: "Tempting because it looks like \"waiting,\" but a fixed delay is either too short under load (flaky failure) or too long (slow suite), and it never actually checks that the expected value appeared. `waitFor` and `findBy*` poll until the condition is met, so the test passes as soon as the data lands."
      },
      {
        id: "C",
        text: "React's asynchronous rendering model makes it impossible to write deterministic tests for fetched data.",
        isCorrect: false,
        explanation: "Tempting if you conflate React's internal scheduling with testability, but React Testing Library ships `waitFor`, `findByRole`, `findByText`, and related helpers specifically so you can assert on async state changes. The async nature is a timing problem, not a solvability problem."
      },
      {
        id: "D",
        text: "Make the test function `async` and use `waitFor()` or `findBy*` queries to poll the DOM until the expected text or element appears.",
        isCorrect: true,
        explanation: "Correct. `waitFor` retries the callback at short intervals until the assertions pass or the timeout elapses, and `findBy*` queries do the same internally, so the test handles any fetch duration without hardcoding a delay."
      }
    ],
    correctAnswer: "D",
    explanation: "The correct approach is to make the test function `async` and use React Testing Library's `waitFor` callback or `findBy*` queries. `waitFor` polls the DOM at short intervals (default 50 ms) until the assertions inside its callback pass or a timeout (default 1000 ms) is reached. `findBy*` queries do the same thing internally: they wrap the matching `getBy*` query in a `waitFor` call, so `screen.findByText('Loaded')` is shorthand for waiting until that text node exists.\n\nWithout this, calling `screen.getByText('Data loaded')` right after `render` throws immediately, because the component's `useEffect` has not yet resolved the fetch and the DOM still shows the loading state. The polling approach removes the need to know when the network call finishes; the test simply retries the assertion until the value appears.\n\nOne edge case interviewers probe: if you switch to `jest.useFakeTimers()`, the real-time polling inside `waitFor` stops working, and you must advance the fake clock (for example `jest.advanceTimersByTime(2000)`) before the assertion can pass. With real timers, no extra step is needed.",
    interviewLine: "I make the test function `async`, then use `waitFor` or a `findBy*` query so the assertion polls the DOM until the fetch resolves and the element appears, which means I never have to guess how long the request takes.",
    misconception: "Because JavaScript is single-threaded, the only way to \"wait\" for a promise is to occupy the thread with a loop or a fixed sleep, rather than yielding with `await` and letting a polling utility re-check the DOM.",
    hints: [
      "Look at how the test function is declared and what it awaits after `render`.",
      "After `render`, the DOM still shows the loading state; what mechanism lets the assertion retry until the fetched value appears?",
      "You do not need to know the exact time the fetch resolves; the utility handles the waiting for you."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `findByText` replaces the `waitFor` + `getByText` pair with a single call that both waits and queries.",
      language: "tsx",
      code: "import { render, screen } from '@testing-library/react';\nimport { useEffect, useState } from 'react';\n\nfunction PriceTag() {\n  const [price, setPrice] = useState('Loading\u2026');\n  useEffect(() => {\n    fetch('/api/price')\n      .then((res) => res.json())\n      .then((data) => setPrice(`$${data.value}`));\n  }, []);\n  return <span>{price}</span>;\n}\n\ntest('shows the fetched price', async () => {\n  render(<PriceTag />);\n  expect(await screen.findByText('$42')).toBeInTheDocument();\n});"
    }
  },
  {
    id: "react-what-are-actions-in-react-19",
    title: "What are Actions in React 19?",
    prompt: "What are Actions in React 19?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "import { useActionState } from 'react';\nasync function updateName(prevState, formData) {  const name = formData.get('name');  const error = await saveName(name);  if (error) return { error };  return { name };}\nfunction NameForm() {  const [state, dispatchAction, isPending] = useActionState(updateName, {    name: '',  });  return (    <form action={dispatchAction}>      <input name=\"name\" defaultValue={state.name} />      <button disabled={isPending}>Save</button>      {state.error && <p>{state.error}</p>}    </form>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Redux action creators: plain objects carrying a `type` string, dispatched synchronously through a store.",
        isCorrect: false,
        explanation: "Tempting if you have used Redux, where an \"action\" is a plain object with a `type` field dispatched through a store. React 19's Actions are async functions passed to React's own APIs; they have no required `type` field and no store."
      },
      {
        id: "B",
        text: "Keyboard shortcuts that trigger operating-system commands when a key combination is pressed.",
        isCorrect: false,
        explanation: "This confuses the English word \"action\" with OS-level keyboard bindings. React 19 Actions have nothing to do with the keyboard or the operating system; they are async functions that mutate React state or server data."
      },
      {
        id: "C",
        text: "Async functions React runs inside a transition, so it tracks pending state, errors, and optimistic updates.",
        isCorrect: true,
        explanation: "Correct. React 19 defines an Action as an async function it runs within a transition, giving you `isPending`, automatic error capture, and interruptible state updates without manual flag management."
      },
      {
        id: "D",
        text: "Native browser mouse-click event listeners attached directly to `<button>` DOM elements.",
        isCorrect: false,
        explanation: "This mistakes the user gesture that triggers the work for the work itself. A click handler may call an Action, but the Action is the async function React executes in a transition, not the DOM event listener."
      }
    ],
    correctAnswer: "C",
    explanation: "An Action in React 19 is an async function you hand to a React API that executes it inside a transition. The three entry points are `useActionState`, `startTransition`, and the `action` prop on a `<form>`. In every case React runs the function, waits for the returned promise to settle, and then commits the resulting state update within that transition, so the UI stays responsive while the network or I/O is in flight.\n\nIn practice this replaces the manual `setLoading(true)` / `try { await \u2026 } catch { setError(\u2026) } finally { setLoading(false) }` block. The `isPending` value from `useActionState` or `useTransition` is derived by React from the transition itself, and an error thrown inside the action is caught by the nearest error boundary rather than crashing the render synchronously.\n\nThe nuance an interviewer will probe: the function still must be `async` (or return a promise) for React to track it. If you pass a plain synchronous function to `useActionState`, there is no pending window and no transition to track, so the API degrades to a one-shot state setter. Also, calling the same function outside any React API (for example, directly in a `useEffect` without wrapping it in `startTransition`) loses the automatic pending and error tracking.",
    interviewLine: "In React 19 an Action is an async function I pass to `useActionState`, `startTransition`, or a form's `action` prop. React runs it in a transition, so `isPending` is derived automatically, errors are caught by the boundary, and I never toggle a loading flag by hand.",
    misconception: "Treating \"Action\" as a generic English noun (a user action, a DOM event, a Redux dispatch) instead of React 19's specific convention: an async function that React schedules inside a transition and tracks for you.",
    hints: [
      "Look at what `useActionState` and the `<form action>` prop expect you to pass them: a function, not an event name or an object.",
      "While that function is awaiting, what does React expose to the component, and what happens to a thrown error?",
      "The word \"action\" here is a React 19 API convention, not a DOM event type or a Redux pattern."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how `useActionState` provides `isPending` automatically, eliminating the need for manual loading flags.",
      language: "tsx",
      code: "import { useActionState } from 'react';\n\nasync function saveProfile(prevState, formData) {\n  const name = formData.get('name');\n  const res = await fetch('/api/profile', {\n    method: 'POST',\n    body: JSON.stringify({ name }),\n  });\n  if (!res.ok) return { error: 'Save failed' };\n  return { name };\n}\n\nfunction ProfileForm() {\n  const [state, formAction, isPending] = useActionState(saveProfile, { name: '' });\n\n  return (\n    <form action={formAction}>\n      <input name=\"name\" defaultValue={state.name} />\n      <button disabled={isPending}>{isPending ? 'Saving\u2026' : 'Save'}</button>\n      {state.error && <p>{state.error}</p>}\n    </form>\n  );\n}"
    }
  },
  {
    id: "react-explain-styled-components-in-react",
    title: "Explain Styled Components in React?",
    prompt: "Explain Styled Components in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "closures",
    tags: [
      "react",
      "closures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A desktop-only library for styling Windows native applications.",
        isCorrect: false,
        explanation: "Tempting if you associate \"styled components\" with desktop GUI toolkits like WPF or WinUI, but styled-components targets the web DOM and React rendering; it has no Windows-only mode."
      },
      {
        id: "B",
        text: "A CSS-in-JS library using tagged template literals to scope CSS to React components.",
        isCorrect: true,
        explanation: "Correct. Styled-components is a runtime CSS-in-JS library: you write CSS inside a tagged template literal, it returns a scoped React component, and it injects a unique class name and `<style>` tag into the DOM at render time."
      },
      {
        id: "C",
        text: "A compiler that converts CSS files into SQL database tables.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"compiles\" with any code transformation and then reach for a database metaphor, but styled-components does not read `.css` files, does not emit SQL, and has no build-time compilation step."
      },
      {
        id: "D",
        text: "A deprecated library that is incompatible with modern React.",
        isCorrect: false,
        explanation: "Tempting if you assume all CSS-in-JS packages were sunset after the CSS Modules and Tailwind wave, but styled-components is actively maintained, receives React 19 support, and is built specifically for React."
      }
    ],
    correctAnswer: "B",
    explanation: "Styled-components is a CSS-in-JS library for React. You write CSS syntax inside a tagged template literal (a backtick string passed to a function), and the library returns a new React component. `styled.button` wraps the native `<button>` element, so `const Button = styled.button` gives you a component that renders a button with your styles already applied.\n\nIn real code this means you define the style once, pass props to drive dynamic values, and the library generates a hash-based class name at render time. Because the class name is unique per style definition, two components that happen to use the same CSS do not collide, and you never maintain a separate `.css` file or worry about specificity wars between global stylesheets.\n\nThe CSS lives in a plain string, so the TypeScript compiler and your linter do not type-check property names or values inside the template literal. A typo like `bordr` will compile fine and simply be ignored by the browser. Also, the class name and the `<style>` tag are injected into the document at runtime, not at build time, so a static analysis tool like a CSS bundler will never see those rules.",
    interviewLine: "I describe styled-components as a runtime CSS-in-JS library: I write CSS inside a tagged template literal, and at render time it generates a hash-based class name and injects a style tag into the document head, so every component gets its own scoped rules without a separate stylesheet or specificity conflicts.",
    misconception: "Treating styled-components as a build-time preprocessor or compiler rather than a runtime library that generates class names and injects `<style>` tags into the live DOM during React rendering.",
    hints: [
      "Think about what a tagged template literal in JavaScript actually returns when you call it as a function.",
      "Ask yourself: does this tool run in Node at build time, or in the browser during React rendering?",
      "It is not a file-to-file transpiler; the output is a React component you import and place in JSX."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the `$active` prop is read inside the template literal to switch a value at render time, and how the component is used in JSX just like a native element.",
      language: "tsx",
      code: "import styled from \"styled-components\";\n\nconst Card = styled.div<{ $active: boolean }>`\n  border: 2px solid ${($p) => ($p.$active ? \"blue\" : \"gray\")};\n  padding: 16px;\n  border-radius: 8px;\n`;\n\nexport function Dashboard() {\n  return (\n    <Card $active={true}>\n      Active card\n    </Card>\n  );\n}"
    }
  },
  {
    id: "react-what-is-axios-and-how-to-use-it-in-react",
    title: "What is Axios, and How to Use it in React?",
    prompt: "What is Axios, and How to Use it in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A database engine that stores documents on disk.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"data\" with \"network transport,\" but Axios never reads or writes local storage; it sends and receives HTTP messages over a socket."
      },
      {
        id: "B",
        text: "A built-in React component for rendering forms.",
        isCorrect: false,
        explanation: "Confuses a utility library with a UI primitive. Axios has no JSX, no props, and no place in the component tree; you call its methods from event handlers or effects."
      },
      {
        id: "C",
        text: "A visual library that creates 3D WebGL scenes.",
        isCorrect: false,
        explanation: "Mixes up Axios with Three.js or similar. Axios deals exclusively with HTTP verbs, headers, and response bodies; it never touches a canvas or GPU context."
      },
      {
        id: "D",
        text: "A Promise-based HTTP client for API calls.",
        isCorrect: true,
        explanation: "Correct. Axios returns a Promise from every request method, auto-parses JSON bodies, exposes interceptor hooks for cross-cutting concerns, and rejects on non-2xx status codes, making it a drop-in fit for React data-fetching patterns."
      }
    ],
    correctAnswer: "D",
    explanation: "Axios is a Promise-based HTTP client library you import and call imperatively. It wraps the browser's `XMLHttpRequest` (or Node.js `http`) behind a clean API: `axios.get(url)`, `axios.post(url, body)`, and so on. When the server replies with a JSON body, Axios deserializes it for you, so `res.data` is already a plain object rather than a string you must parse yourself.\n\nIn React you typically call Axios inside a `useEffect` or a custom hook. Because every method returns a Promise, you can `await` the call in an `async` function or chain `.then()` and `.catch()`. Non-2xx status codes reject the Promise, so a 404 or 500 lands in your `catch` block instead of silently resolving with an error body.\n\nA practical detail interviewers probe next: Axios interceptors let you attach an `Authorization` header or handle 401 redirects globally, so individual call sites stay clean. The library is environment-agnostic; the same `axios.get` works in a browser tab and in a Next.js server component or route handler.",
    interviewLine: "Axios is a Promise-based HTTP client I import and call inside a `useEffect` or a custom hook; it auto-parses JSON responses and rejects on non-2xx status codes, so I just `await` the call and handle failures in a `catch` block.",
    misconception: "Treating Axios as part of React itself\u2014a component, a hook, or a built-in API\u2014rather than a standalone third-party HTTP client you install with npm and call imperatively from inside your components.",
    hints: [
      "Think about what Axios does at the network layer, not inside the component tree.",
      "Does it render UI, persist data to disk, or send HTTP requests over a socket?",
      "It is not part of React's core API; you install it separately with npm and import it by name."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `res.data` is already a parsed object; Axios deserialized the JSON body before the Promise resolved, so no manual `JSON.parse` is needed.",
      language: "tsx",
      code: "import { useEffect, useState } from \"react\";\nimport axios from \"axios\";\n\ninterface User {\n  id: number;\n  name: string;\n}\n\nexport function UserList() {\n  const [user, setUser] = useState<User | null>(null);\n\n  useEffect(() => {\n    axios.get<User>(\"/api/users/1\").then((res) => {\n      setUser(res.data);\n    });\n  }, []);\n\n  return <div>{user?.name}</div>;\n}"
    }
  },
  {
    id: "javascript-explain-hooks-common-ones-and-how-to-use-them-correctly",
    title: "Explain Hooks: Common Ones and How to Use Them Correctly",
    prompt: "Explain Hooks: Common Ones and How to Use Them Correctly, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "hooks",
    tags: [
      "javascript",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Common hooks: `useState` (state), `useEffect` (side effects), `useRef` (DOM/mutable refs), `useMemo` (cached values), `useCallback` (cached functions), and `useContext` (context read).",
        isCorrect: true,
        explanation: "Correct. These six hooks cover the vast majority of day-to-day component logic: local state, side effects with cleanup, mutable references that survive re-renders, memoized derived values, stable function references, and shared context data."
      },
      {
        id: "B",
        text: "Common hooks only work in Node.js server scripts and will throw a runtime error when rendered in any browser.",
        isCorrect: false,
        explanation: "Tempting if you conflate server-side rendering with server-only execution. Hooks run wherever React renders: in the browser, in a Node.js SSR pass, and in edge runtimes. There is no Node-only restriction on hook usage."
      },
      {
        id: "C",
        text: "Hooks replace all HTML tags in the component's output with equivalent SVG graphics during the render pass.",
        isCorrect: false,
        explanation: "The underlying belief is that hooks change what the component outputs. They do not. Hooks manage internal state and logic; JSX still produces the same HTML or SVG elements the developer writes in the return statement."
      },
      {
        id: "D",
        text: "Hooks must always be called inside `if` conditions and `for` loops so they execute exactly once per component mount.",
        isCorrect: false,
        explanation: "The opposite of the actual rule. The Rules of Hooks require calling hooks unconditionally at the top level of the component or custom hook. Conditional or looped calls shift the call order React uses to match stored state, breaking the invariant."
      }
    ],
    correctAnswer: "A",
    explanation: "The correct answer lists the six hooks a junior developer will reach for in almost every component. `useState` stores a value that changes the UI, `useEffect` runs code outside the render pass (and returns a cleanup), `useRef` gives a mutable object that persists across re-renders without causing one, `useMemo` caches an expensive derived value, `useCallback` caches a function reference so a child wrapped in `React.memo` can skip re-rendering, and `useContext` reads a shared value without prop drilling.\n\nIn practice the most common mistakes are calling `useMemo` or `useCallback` without a measurable re-render problem (adding overhead for no gain) and forgetting the dependency array in `useEffect`, which either re-runs the effect every render or goes stale. Keep dependencies explicit and minimal, and prefer `useRef` for mutable values you need to carry forward without triggering a render.\n\nThe deeper rule an interviewer probes next is the Rules of Hooks themselves: React matches each hook's stored state by its position in the call order. Calling a hook inside an `if` or a `for` loop changes that order between renders, and React can no longer tell which state belongs to which hook, so it throws or silently corrupts state.",
    interviewLine: "I think of hooks as functions that run in the same order every render, so I keep them at the top level and pick the right one for the job: `useState` for values that change the UI, `useEffect` for syncing with external systems, `useRef` for mutable data I do not want to trigger a re-render on.",
    misconception: "Hooks are a one-time setup that runs once when the component mounts, rather than functions that re-execute on every render in a fixed order that React relies on to match stored state to the correct hook.",
    hints: [
      "Hooks are called in a fixed order on every render. Ask yourself what each one stores or does between renders.",
      "Which hook gives you a value that changes the UI, which one lets you run code outside the render pass, and which one gives you a stable mutable reference?",
      "The Rules of Hooks forbid conditional or looped calls because React matches stored state by call position."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how `useRef` holds the interval id across renders without triggering one, while `useEffect` sets it up once and cleans it up on unmount.",
      language: "tsx",
      code: "import { useState, useRef, useEffect } from \"react\";\n\nfunction Timer() {\n  const [elapsed, setElapsed] = useState(0);\n  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);\n\n  useEffect(() => {\n    intervalRef.current = setInterval(() => {\n      setElapsed((s) => s + 1);\n    }, 1000);\n    return () => {\n      if (intervalRef.current !== null) clearInterval(intervalRef.current);\n    };\n  }, []);\n\n  return <span>{elapsed}s</span>;\n}\n\nexport default Timer;"
    }
  },
  {
    id: "javascript-hooks-vs-classes-performance-tradeoffs-and-common-pitfa",
    title: "Hooks vs Classes Performance, Tradeoffs and Common Pitfalls",
    prompt: "Hooks vs Classes Performance, Tradeoffs and Common Pitfalls, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "hooks",
    tags: [
      "javascript",
      "hooks",
      "junior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Functions are static primitives that the browser engine cannot garbage collect once defined.",
        isCorrect: false,
        explanation: "Tempting if you think of functions as special language primitives, but in JavaScript a function is an object. Once no reference points to it \u2014 no variable, no closure, no event listener \u2014 the garbage collector reclaims it exactly like any other allocation."
      },
      {
        id: "B",
        text: "Hooks avoid class-instance allocation and `this` binding, but need `useCallback`/`useMemo` so inline closures do not break memoized children.",
        isCorrect: true,
        explanation: "Correct. A function component is a plain call with no `new` or `this` binding, so it avoids the per-instance allocation a class component pays. The tradeoff is that every render produces fresh closure objects for inline handlers, and those unstable references defeat `React.memo` unless you stabilize them with `useCallback` or `useMemo`."
      },
      {
        id: "C",
        text: "Hooks and classes have identical performance profiles because they compile to the same bytecode.",
        isCorrect: false,
        explanation: "Too absolute. Allocation patterns, tree depth, closure identity, and whether a component re-renders all change measurable frame time and memory. The paradigms differ in where those costs land, not in whether they exist."
      },
      {
        id: "D",
        text: "Classes are always faster because V8 compiles them directly to native C++ code.",
        isCorrect: false,
        explanation: "V8 JIT-compiles both class methods and standalone functions to the same machine-code tier; there is no special C++ path for classes. The \"100x\" figure has no basis in V8 benchmarks, and in practice function components often have lower per-render allocation because they skip the instance and `this` lookup."
      }
    ],
    correctAnswer: "B",
    explanation: "Function components skip the class instance entirely: no `new` call, no prototype-chain lookup per method, no `this` binding. Hooks like `useState` or `useEffect` are plain function calls that read from a per-fiber hook list. The cost that replaces the class allocation is closure creation \u2014 every render builds new function objects for inline handlers and any expression that captures local variables. Those new references break referential equality, so a `React.memo` child sees a \"new\" prop and re-renders even though its logical input is unchanged.\n\nIn practice this means the classic bug: a parent with `useState` passes `onClick={() => doThing()}` to a memoized child. The parent re-renders on every keystroke, so does the child, and the memo is dead weight. Wrapping the handler in `useCallback` (or hoisting it out when it needs no captured state) gives the child a stable reference and lets `React.memo` skip the render.\n\nThe nuance an interviewer will probe: `useCallback` and `useMemo` are not free. They add a dependency-array comparison on every render and can mask a missing re-render if a dependency is forgotten. React may also discard cached values at any time, so they are an optimization hint, not a guarantee. Profile with the React DevTools Profiler before adding memoization; memoizing a component that re-renders rarely is seldom worth the extra bookkeeping.",
    interviewLine: "Function components skip the class instance and `this` binding, but every render still allocates new closures for inline handlers. I use `useCallback` when those references cross into a `React.memo` child so the memo actually skips the render, and I profile before adding more memoization because the dependency check itself has a cost.",
    misconception: "Because function components skip class-instance allocation, they are \"free\" to render. In reality the cost simply moves: every render still allocates new closures for inline handlers, and those unstable references can force children to re-render, negating the savings.",
    hints: [
      "What does a class component allocate on mount that a function component does not?",
      "What does a function component allocate on every render that a class component does not, and what happens when that allocation is passed as a prop to a memoized child?",
      "The tradeoff is not raw speed \u2014 it is where the allocation cost moves in the render tree."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how the inline arrow function gives `Row` a new reference every render, defeating `React.memo`; wrapping it in `useCallback` with a stable dependency fixes that.",
      language: "tsx",
      code: "import { memo, useCallback, useState } from \"react\";\n\nconst Row = memo(({ onEdit }: { onEdit: () => void }) => {\n  console.log(\"Row rendered\");\n  return <button onClick={onEdit}>Edit</button>;\n});\n\nexport function Table() {\n  const [label, setLabel] = useState(\"Draft\");\n\n  // New function object every render \u2192 Row re-renders every time\n  const handleEdit = useCallback(() => setLabel(\"Editing\"), []);\n\n  return (\n    <div>\n      <span>{label}</span>\n      <Row onEdit={handleEdit} />\n    </div>\n  );\n}"
    }
  },
  {
    id: "javascript-hooks-compared-to-classes-practical-differences",
    title: "Hooks Compared to Classes, Practical Differences",
    prompt: "Hooks Compared to Classes, Practical Differences, explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "javascript",
    subject: "hooks",
    tags: [
      "javascript",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Classes provide built-in access to `this` for state, while Hooks require manual binding of `this` in every callback.",
        isCorrect: false,
        explanation: "Incorrect. Classes require `this` binding, whereas Hooks eliminate the need for `this` entirely by using closures and function calls."
      },
      {
        id: "B",
        text: "Hooks are limited to functional components, while class components can use `useState` and `useEffect` for state management.",
        isCorrect: false,
        explanation: "Incorrect. Hooks can only be called inside function components or other hooks; they cannot be used inside class components."
      },
      {
        id: "C",
        text: "Hooks use functions and avoid `this` binding, organize related logic together in custom hooks, and reduce wrapper component depth compared to class HOCs/render props.",
        isCorrect: true,
        explanation: "Correct. Hooks eliminate `this` binding, let you group related state and effects in one function, and replace HOC or render-prop wrappers with a direct function call, flattening the component tree."
      },
      {
        id: "D",
        text: "Classes are mandatory for all components in React 19, as Hooks are only supported in experimental builds.",
        isCorrect: false,
        explanation: "Incorrect. React 19 supports both class and function components, but Hooks are the standard and recommended approach for new components."
      }
    ],
    correctAnswer: "C",
    explanation: "Correct. Hooks are plain functions called during render, so there is no `this` to bind and no instance to allocate. State lives in a per-hook slot that React manages internally, and the closure over the returned setter is how you update it. Reuse is a function that calls hooks internally \u2014 `useAuth`, `usePagination` \u2014 which replaces `withAuth` HOCs and render-prop wrappers without adding a layer to the component tree.\n\nIn a class, `setTimeout(() => this.setState({ n: this.state.n + 1 }), 1000)` requires an arrow function or `.bind(this)` to keep `this` pointing at the component. The functional equivalent, `setTimeout(() => setN(n => n + 1), 1000)`, has no binding concern because `setN` is a stable closure. When three features each need their own HOC, the class approach nests three wrappers; the hook approach calls three hooks in the same component.\n\nThe trade-off is that hook state is captured in a closure, so a long-lived callback can read a stale value. The functional updater form (`setN(prev => prev + 1)`) or a `useRef` for mutable values avoids that. You also cannot call hooks conditionally \u2014 the call order must be identical on every render \u2014 whereas a class could skip a lifecycle method by simply not defining it.",
    interviewLine: "I prefer hooks because they let me group related state and effects in one function without `this` binding, and when I need to reuse logic I extract a custom hook instead of wrapping the component in another HOC layer.",
    misconception: "Assuming hooks are syntactic sugar over classes, so the mental model stays \"component = object with state and lifecycle methods.\" In reality hooks are a different execution model: a sequence of function calls whose internal slots React tracks by call position, not by instance identity.",
    hints: [
      "Look at what a class component needs that a function component does not: `this`, `.bind`, and a wrapper component for each reusable behavior.",
      "Ask yourself: when I extract logic into a function that calls `useState` and `useEffect`, do I still need a wrapper component around the target?",
      "Neither model is tied to a specific language or to server versus client rendering; the difference is structural, not environmental."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "The hook groups state and the interval in one function; the consuming component just calls it \u2014 no `withCountdown` HOC wrapping `Timer`.",
      language: "tsx",
      code: "function useCountdown(seconds: number) {\n  const [remaining, setRemaining] = useState(seconds);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setRemaining(prev => (prev > 0 ? prev - 1 : 0));\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return remaining;\n}\n\nfunction Timer() {\n  const remaining = useCountdown(10);\n  return <span>{remaining}s left</span>;\n}"
    }
  },
  {
    id: "javascript-how-to-create-refs",
    title: "How to create refs?",
    prompt: "How to create refs?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "rendering-keys",
    tags: [
      "javascript",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.myRef = React.createRef();\n  }\n  render() {\n    return <div ref={this.myRef} />;\n  }\n}\n\nclass SearchBar extends Component {\n  constructor(props) {\n    super(props);\n    this.txtSearch = null;\n    this.state = { term: '' };\n    this.setInputSearchRef = (e) => {\n      this.txtSearch = e;\n    };\n  }\n  onInputChange(event) {\n    this.setState({ term: this.txtSearch.value });\n  }\n  render() {\n    return (\n      <input\n        value={this.state.term}\n        onChange={this.onInputChange.bind(this)}\n        ref={this.setInputSearchRef}\n      />\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "By assigning a string identifier like `ref='myInput'` on the element, the way React 15 allowed.",
        isCorrect: false,
        explanation: "String refs were deprecated in React 16.3 and removed in React 17. In modern React the `ref` prop expects a ref object or a callback function; passing a plain string produces a warning and the ref is never populated."
      },
      {
        id: "B",
        text: "With `useRef(null)` in function components, `React.createRef()` in class components, or a callback ref like `ref={el => this.node = el}`.",
        isCorrect: true,
        explanation: "Correct. `useRef` returns a stable object across renders, `createRef` does the same in a class, and callback refs give you an explicit mount/unmount lifecycle hook \u2014 all three are the supported ways to create and attach a ref."
      },
      {
        id: "C",
        text: "By calling `document.getElementById` or `querySelector` inside the render function to grab the node.",
        isCorrect: false,
        explanation: "Tempting if you think of refs as a shortcut to DOM queries, but `getElementById` bypasses React's reconciliation, breaks in server-side rendering, and does not update when the element is removed and re-mounted, so it cannot serve as a stable reference."
      },
      {
        id: "D",
        text: "They are created automatically by React for every rendered HTML tag and cannot be customized or removed.",
        isCorrect: false,
        explanation: "Every element you render has a DOM node, but React does not attach a ref to it unless you explicitly pass one. Without a `ref` prop the node is unreachable from JavaScript except through event targets or `querySelector`."
      }
    ],
    correctAnswer: "B",
    explanation: "Refs are objects you create yourself and attach to a DOM element or component instance via the `ref` prop. In function components, `useRef(null)` returns a stable object whose `current` property starts as `null` and is set to the DOM node after the first commit. In class components, `React.createRef()` returns the same kind of object, which you assign to an instance property in the constructor. A third form, the callback ref (`ref={el => { this.node = el }}`), runs a function on mount with the element and on unmount with `null`.\n\nThe practical consequence is that `ref.current` is a mutable pointer, not state. Reading it inside an event handler or `useEffect` gives you the live DOM node; reading it during the render phase of a function component is unreliable because the node from the previous commit may not match what you are about to produce. This is why you never assign to `ref.current` to trigger a re-render \u2014 it will not re-render.\n\nAn interviewer will probe whether you know that neither `useRef` nor `createRef` triggers a re-render when `current` changes, and that callback refs are the only form that gives you an explicit unmount hook (the `null` call). That distinction matters when you need to clean up a third-party library attached to a DOM node.",
    interviewLine: "A ref is an object I create with `useRef` or `createRef` and attach via the `ref` prop; its `current` property holds the DOM node after commit, and mutating it never triggers a re-render, which is exactly what I want when I need to call an imperative API like `focus()` or store a third-party instance.",
    misconception: "Thinking of a ref as something React hands you automatically, or as a state variable that triggers a re-render when it changes. A ref is a mutable container you create, attach, and read imperatively; mutating `current` never schedules a render.",
    hints: [
      "Look at what the `ref` prop actually accepts: a ref object or a function, not a string.",
      "Ask yourself: what does `useRef(null)` return, and when is its `current` property set to the DOM node?",
      "String refs and `getElementById` both predate the modern API; neither is a ref creation mechanism today."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice that `useRef` returns a stable object and the DOM node only appears in `current` after the first commit, which is why `focus()` lives in an effect, not in the render body.",
      language: "tsx",
      code: "import { useRef, useEffect } from \"react\";\n\nfunction AutoFocusInput() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n\n  return <input ref={inputRef} placeholder=\"Type here\" />;\n}"
    }
  },
  {
    id: "javascript-what-is-the-recommended-approach-of-removing-an-array-e",
    title: "What is the recommended approach of removing an array element in React state?",
    prompt: "What is the recommended approach of removing an array element in React state?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "rendering-keys",
    tags: [
      "javascript",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "removeItem(index) {\n  this.setState({\n    data: this.state.data.filter((item, i) => i !== index)\n  })\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Assign `array[index] = undefined` to blank out the slot without changing the array length.",
        isCorrect: false,
        explanation: "Tempting if you think React inspects each element, but it only compares the array reference. The array is the same object, its length is unchanged, and the slot now holds `undefined`, so the UI renders an empty gap rather than a shorter list."
      },
      {
        id: "B",
        text: "Remove the element with the `delete` keyword on the array index.",
        isCorrect: false,
        explanation: "The `delete` operator creates a sparse hole at that index without changing the array length or producing a new reference. React still sees the same array object, skips the re-render, and a subsequent `map` call skips the hole silently, leaving the rendered list inconsistent with the data."
      },
      {
        id: "C",
        text: "Call `array.splice(index, 1)` directly on the state array in place.",
        isCorrect: false,
        explanation: "The most common trap: `splice` does remove the element and adjust the length, so the data looks right. But it mutates the array React already holds, so the reference is unchanged, `Object.is` returns true, and React bails out of the re-render. The list appears frozen until an unrelated update forces a render."
      },
      {
        id: "D",
        text: "Use `filter` or `slice` plus spread to return a new array reference to the state setter.",
        isCorrect: true,
        explanation: "Correct. `filter` returns a fresh array containing every element except the one at the target index, so the reference differs from the previous state. React's `Object.is` check fails, a re-render is scheduled, and the UI reflects the shorter list."
      }
    ],
    correctAnswer: "D",
    explanation: "The correct approach is to produce a new array reference. React decides whether to re-render by comparing the previous state value to the next one with `Object.is`, which is a reference check for arrays. `filter` (or two `slice` calls joined by spread) builds a brand-new array that excludes the target index, so the reference differs and React schedules a re-render.\n\nIf you mutate the existing array in place \u2014 with `splice`, direct index assignment, or `delete` \u2014 the reference React holds in its internal state slot never changes. On the next render pass, React sees the same object, bails out, and the UI keeps showing the item you meant to remove. The list looks frozen until some unrelated state update forces a full re-render.\n\nThe `filter` approach copies every element, so it is O(n) in the array length. For very large lists you can use two `slice` calls joined by spread to avoid copying the removed slot, but the allocation cost is still O(n). The invariant that matters in every case is the same: the value you pass to the state setter must not be the reference React already stores.",
    interviewLine: "I always produce a new array reference when removing an item \u2014 `filter` or two `slice` calls with spread \u2014 because React compares state by reference, and mutating the existing array in place means `Object.is` returns true and the re-render is skipped.",
    misconception: "I changed the array's contents, so React will notice. In reality React compares the array reference with `Object.is`, not the elements inside it, so any in-place mutation is invisible to the render loop.",
    hints: [
      "React decides whether to re-render by comparing the old and new state value with `Object.is` \u2014 what does that mean for arrays?",
      "For each option, ask: does the operation return a new array object, or does it modify the one React already stores?",
      "`splice` changes the contents and the length, so it looks like it should work \u2014 but does the reference change?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "Notice that `splice` mutates the array in place, so `setItems(items)` hands back the same reference React already holds and the component never re-renders.",
      language: "tsx",
      code: "function TodoList() {\n  const [items, setItems] = useState([\"buy milk\", \"walk dog\", \"code\"]);\n\n  function removeAt(i: number) {\n    items.splice(i, 1);\n    setItems(items);\n  }\n\n  return (\n    <ul>\n      {items.map((item, i) => (\n        <li key={i}>\n          {item}{\" \"}\n          <button onClick={() => removeAt(i)}>remove</button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
  },
  {
    id: "react-is-it-possible-to-use-asyncawait-in-plain-react",
    title: "Is it possible to use async/await in plain React?",
    prompt: "Is it possible to use async/await in plain React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Yes, in event handlers, in `useEffect` via an inner async function, and natively in React 19 Server Components.",
        isCorrect: true,
        explanation: "Correct. `async/await` is standard ES2017+ JavaScript. In Client Components you use it in event handlers directly and in `useEffect` through an inner async function; in React 19 Server Components the component function itself may be `async` and the server renderer awaits it before streaming the RSC payload."
      },
      {
        id: "B",
        text: "`async` functions can be passed directly as the top-level `useEffect` callback argument.",
        isCorrect: false,
        explanation: "Tempting if you think of `useEffect` as just \"a function that runs after mount.\" But React reads the callback's return value synchronously to decide whether a cleanup exists; an `async` function returns a `Promise`, which is not a function, so React cannot use it as cleanup, and TypeScript rejects the type mismatch."
      },
      {
        id: "C",
        text: "No, `async/await` is strictly forbidden in React and causes build failures.",
        isCorrect: false,
        explanation: "This treats `async/await` as a framework-level restriction. It is a language feature of ECMAScript, not a React API, so React neither forbids it nor needs a special build step to support it."
      },
      {
        id: "D",
        text: "`async/await` only works in Python, not JavaScript.",
        isCorrect: false,
        explanation: "Confuses a Python feature with a JavaScript one. `async/await` was standardised in ECMAScript 2017 and is supported in every modern browser and Node.js runtime without any polyfill or transpiler."
      }
    ],
    correctAnswer: "A",
    explanation: "Yes. `async/await` is a standard ECMAScript 2017 feature, so any JavaScript environment that supports it \u2014 every modern browser and Node.js \u2014 runs it without a transpiler. In a React Client Component you use it inside event handlers (`const handleClick = async () => { ... }`) and inside `useEffect` by defining an `async` function in the synchronous effect callback and calling it immediately. In React 19 Server Components the component itself may be `async`; the server renderer awaits it and serialises the result into the RSC payload before the client sees it.\n\nThe one constraint that trips people up is `useEffect`'s return contract. React reads the callback's return value synchronously: a function becomes the cleanup, `undefined` means none. An `async` function always returns a `Promise`, so `useEffect(async () => { ... }, [])` hands React a `Promise` where it expects a cleanup or `void`, and TypeScript flags it. The fix is a one-line wrapper: `useEffect(() => { const run = async () => { ... }; run(); }, [])`.\n\nIn Server Components the distinction disappears because the renderer controls the await. You write `async function Dashboard() { const posts = await db.posts.findMany(); return <PostList posts={posts} /> }` and React resolves the Promise on the server, so the client receives a resolved element. In Client Components you still need the inner-function pattern for effects.",
    interviewLine: "I use `async/await` in event handlers and in an inner function inside `useEffect` because the effect callback must return a synchronous cleanup or `undefined`, not a `Promise`. In Server Components the component itself can be `async` because the server renderer awaits it before serialising the tree.",
    misconception: "Treating `useEffect` as a generic \"run this callback\" hook and forgetting that React inspects its synchronous return value to determine cleanup, so an `async` keyword on the callback itself breaks the contract even though `await` inside the body is fine.",
    hints: [
      "Think about what `useEffect` does with the value its callback returns, and what an `async` function always returns.",
      "An `async` function returns a `Promise`; ask whether React's effect contract can accept a `Promise` as its return value.",
      "The restriction is on the callback's return type, not on using `await` anywhere inside React component code."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the inner `load` function inside `useEffect` versus the top-level `async` handler on the button \u2014 both use `await`, but only the effect needs the wrapper.",
      language: "tsx",
      code: "\"use client\";\nimport { useEffect, useState } from \"react\";\n\nfunction UserCard({ id }: { id: number }) {\n  const [name, setName] = useState<string | null>(null);\n  useEffect(() => {\n    async function load() {\n      const res = await fetch(`/api/users/${id}`);\n      setName((await res.json()).name);\n    }\n    load();\n  }, [id]);\n\n  const handleRefresh = async () => {\n    const res = await fetch(`/api/users/${id}`, { cache: \"no-store\" });\n    setName((await res.json()).name);\n  };\n\n  return (\n    <div>\n      <p>{name ?? \"Loading\u2026\"}</p>\n      <button onClick={handleRefresh}>Refresh</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-what-are-the-advantages-of-jest-over-jasmine",
    title: "What are the advantages of Jest over Jasmine?",
    prompt: "What are the advantages of Jest over Jasmine?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "const sum = (a, b) => a + b;\n\nexport default sum;\n\nimport sum from './sum';\n\ntest('adds 1 + 2 to equal 3', () => {\n  expect(sum(1, 2)).toBe(3);\n});\n\n{\n  \"scripts\": {\n    \"test\": \"jest\"\n  }\n}\n\n$ yarn test\nPASS ./sum.test.js\n adds 1 + 2 to equal 3 (2ms)",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Jest compiles JavaScript code directly into native iOS Swift binaries.",
        isCorrect: false,
        explanation: "Tempting if you conflate a test runner with a build tool, but Jest executes JavaScript in Node.js worker processes; it has no code-generation step and no connection to Xcode or Swift."
      },
      {
        id: "B",
        text: "Zero config discovery, built-in mocking, jsdom, snapshots, and parallel workers.",
        isCorrect: true,
        explanation: "Correct. Jest layers these infrastructure features on top of a Jasmine-compatible assertion API, so a project gets a working test harness the moment you run `npx jest` with no config file."
      },
      {
        id: "C",
        text: "Jest eliminates the need for writing unit tests.",
        isCorrect: false,
        explanation: "Tempting if you read \"zero configuration\" as \"zero effort,\" but Jest still requires you to author test files with explicit assertions; it only removes the setup ceremony around them."
      },
      {
        id: "D",
        text: "Jest only runs on hardware supercomputers.",
        isCorrect: false,
        explanation: "No basis in reality; Jest is a Node.js package that runs on any machine with a compatible Node runtime, including a laptop or a CI container with 2 GB of RAM."
      }
    ],
    correctAnswer: "B",
    explanation: "Jest was originally built as a superset of Jasmine's assertion API, so existing Jasmine tests port over with minimal changes. On top of that compatibility layer, Jest ships infrastructure that requires separate packages in the Jasmine ecosystem: automatic test discovery for files matching `*.test.js` or `*.spec.js`, module mocking via `jest.mock()`, a built-in jsdom environment for DOM-dependent tests, and snapshot assertions with `toMatchSnapshot()`.\n\nIn a new project this means you install Jest, write a `.test.ts` file, and run `npx jest` with zero configuration. Jest also splits your test files across worker processes, so a suite of two hundred files finishes in a fraction of the time a single-threaded runner would need.\n\nThe nuance an interviewer will probe: parallel execution means test order across files is not guaranteed, and shared mutable state between tests in the same file can produce flaky results. The jsdom environment is also an approximation, not a real browser, so tests that depend on layout, network timing, or GPU compositing will behave differently in Jest than in Chrome.",
    interviewLine: "I'd note Jest started as a Jasmine-compatible runner, so the assertion API is nearly the same. What it adds is the infrastructure layer: test discovery, module mocking, a jsdom environment, snapshots, and worker-based parallelism. That is why I can go from zero config to a running suite without wiring up a separate test harness.",
    misconception: "Treating Jest and Jasmine as different testing paradigms when Jest is actually a Jasmine-compatible runner with added infrastructure: the assertion syntax is nearly identical, and the real differentiators are discovery, mocking, jsdom, snapshots, and parallel workers.",
    hints: [
      "Think about what you must set up before running a test in Jasmine versus what Jest does for you by default.",
      "Which features require a separate npm package in the Jasmine ecosystem but come built-in with Jest?",
      "Jest's assertion API is nearly a copy of Jasmine's \u2014 the differences are in the runner infrastructure, not the syntax."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://testing-library.com/docs/queries/about/#priority",
    example: {
      caption: "No config file, no test registration, no runner script \u2014 Jest discovers `*.test.ts` files and runs them the moment you type `npx jest`.",
      language: "typescript",
      code: "// utils/format.ts\nexport const formatPrice = (cents: number) =>\n  `$${(cents / 100).toFixed(2)}`;\n\n// utils/format.test.ts  \u2190 Jest finds this file automatically\nimport { formatPrice } from './format';\n\ntest('formats 1299 cents as $12.99', () => {\n  expect(formatPrice(1299)).toBe('$12.99');\n});\n\ntest('formats 50 cents as $0.50', () => {\n  expect(formatPrice(50)).toBe('$0.50');\n});\n\n// No jest.config.js, no jasmine.json, no karma.conf.js needed."
    }
  },
  {
    id: "react-how-to-make-ajax-request-in-redux",
    title: "How to make AJAX request in Redux?",
    prompt: "How to make AJAX request in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "export function fetchAccount(id) {\n  return (dispatch) => {\n    dispatch(setLoadingAccountState()); // Show a loading spinner\n    fetch(`/account/${id}`, (response) => {\n      dispatch(doneFetchingAccount()); // Hide loading spinner\n      if (response.status === 200) {\n        dispatch(setAccount(response.json)); // Use a normal function to set the received state\n      } else {\n        dispatch(someError);\n      }\n    });\n  };\n}\n\nfunction setAccount(data) {\n  return { type: 'SET_Account', data: data };\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Use middleware such as redux-thunk, Redux Toolkit `createAsyncThunk`, or Redux Saga to run the HTTP call outside the reducer.",
        isCorrect: true,
        explanation: "Correct. Middleware like redux-thunk or `createAsyncThunk` lets you run the `fetch` outside the reducer, then dispatch a plain action with the payload so the reducer can update state synchronously and purely."
      },
      {
        id: "B",
        text: "Write raw SQL queries inside the Redux action type string.",
        isCorrect: false,
        explanation: "Tempting if you confuse an action type with an action payload or think the string can carry executable instructions. Action types are simple string identifiers like `'ACCOUNT/FETCHED'`; they carry no logic and have no relationship to SQL or database queries."
      },
      {
        id: "C",
        text: "Call `fetch` directly inside the reducer function body so the state updates as the response arrives.",
        isCorrect: false,
        explanation: "Tempting if you treat the reducer as just \"the function that handles the action.\" Reducers must be pure and synchronous; calling `fetch` inside one makes the result non-deterministic, breaks the `reducer(state, action) \u2192 newState` contract, and makes the reducer impossible to unit-test without mocking the network."
      },
      {
        id: "D",
        text: "AJAX requests are prohibited in Redux applications.",
        isCorrect: false,
        explanation: "Tempting if you have only seen reducers and assume Redux is strictly synchronous. Redux was designed with async in mind from the start; the official ecosystem (redux-thunk, RTK Query, Redux Saga) exists specifically to bridge async I/O into the store."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux reducers are pure, synchronous functions: they receive an action and return new state, with no side effects and no async work. You cannot call `fetch`, `setTimeout`, or any I/O inside a reducer. Middleware such as redux-thunk, Redux Toolkit `createAsyncThunk`, or Redux Saga intercepts an action creator that returns a function, runs the network call there, and then dispatches a plain action object with the payload so the reducer can update state synchronously.\n\nIn real code this means you dispatch a thunk (or the auto-generated pending/fulfilled/rejected actions from `createAsyncThunk`), the middleware executes the `fetch`, and on resolution it dispatches a success action with the JSON body. The reducer reads `action.payload` and sets it into state. The reducer stays testable in isolation because it never touches the network.\n\nIn modern Redux Toolkit, `createAsyncThunk` wraps the thunk pattern and generates three actions (`pending`, `fulfilled`, `rejected`) automatically, and RTK Query adds caching, request deduplication, and cache invalidation on top. Redux Saga uses generator functions for complex multi-step flows. All three approaches enforce the same rule: the reducer performs zero I/O.",
    interviewLine: "Redux reducers are pure and synchronous, so I handle the fetch in a thunk or `createAsyncThunk`, then dispatch a plain action with the payload so the reducer can update state without any side effects.",
    misconception: "Reducers are \"the place where all logic lives,\" so async work should happen there too. In reality, reducers are pure state transformers; all I/O and side effects live outside them in middleware or action creators.",
    hints: [
      "Look at what a reducer is allowed to do: receive an action, return new state, synchronously, with no side effects.",
      "Ask whether `fetch` can be called inside a function that must be pure and return a value immediately.",
      "The standard pattern is to dispatch a function (or use a helper that wraps one), run the fetch there, then dispatch a plain object action with the result."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice how `createAsyncThunk` keeps the `fetch` outside the reducer and the reducer only reads `action.payload` to set state.",
      language: "typescript",
      code: "import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';\n\nconst fetchAccount = createAsyncThunk(\n  'account/fetch',\n  async (id: string) => {\n    const res = await fetch(`/account/${id}`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return res.json();\n  },\n);\n\nconst accountSlice = createSlice({\n  name: 'account',\n  initialState: { data: null, loading: false, error: null },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchAccount.pending, (s) => { s.loading = true; s.error = null; })\n      .addCase(fetchAccount.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })\n      .addCase(fetchAccount.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });\n  },\n});"
    }
  },
  {
    id: "react-what-is-redux-saga",
    title: "What is redux-saga?",
    prompt: "What is redux-saga?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "$ npm install, save redux-saga",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A native mobile rendering engine that compiles React components to platform views, replacing React Native's JavaScript bridge.",
        isCorrect: false,
        explanation: "Tempting if you associate the word 'saga' with a narrative flow or a native framework, but redux-saga has no relationship to rendering, mobile platforms, or React Native. It runs in the browser or Node.js alongside a Redux store and never touches the view layer."
      },
      {
        id: "B",
        text: "A CSS-in-JS compiler that processes utility classes at build time and injects a scoped stylesheet at runtime.",
        isCorrect: false,
        explanation: "Tempting if you confuse 'saga' with a build tool like Sass or PostCSS, but redux-saga produces no CSS and has no knowledge of stylesheets. It operates on dispatched Redux actions in the middleware chain."
      },
      {
        id: "C",
        text: "A Redux middleware library that uses ES6 Generators (`function*` / `yield`) to make asynchronous side effects (data fetching, caching) testable, composable, and manageable.",
        isCorrect: true,
        explanation: "Correct. redux-saga is a Redux middleware that runs side-effect logic inside generator functions, yielding effect creators such as `call`, `put`, and `takeEvery` so that async flows stay linear, unit-testable, and composable."
      },
      {
        id: "D",
        text: "A SQL query-builder for Node.js that chains method calls into parameterised statements for PostgreSQL or MySQL drivers.",
        isCorrect: false,
        explanation: "Tempting if you think any Node.js library that 'builds' something is a data-access tool, but redux-saga never touches a database. It intercepts Redux actions in the middleware chain and dispatches new actions back to the store."
      }
    ],
    correctAnswer: "C",
    explanation: "redux-saga is a Redux middleware that intercepts dispatched actions and runs side-effect logic inside ES6 generator functions. You write a saga as a `function*` and `yield` declarative effect creators like `call(fetchUser, id)` or `put({ type: 'USER_LOADED' })`. The middleware executes each yielded effect in sequence, so the saga reads like a linear script even though it is performing asynchronous work.\n\nThe practical payoff is testability and composition. Because a saga is a generator that yields plain objects, a unit test can call `saga.next()`, assert the first yielded effect, feed a fake result via `saga.next(fakeValue)`, and assert the next one. No network, no timers, no mocking of `setTimeout`. You can also compose sagas: one `takeEvery`-listens for an action and `fork`s a child saga that `takeLatest`-guards another.\n\nIt is a middleware, not a replacement for Redux or the store. The store still holds state and dispatches actions; redux-saga sits in the middleware chain between `dispatch` and the reducers, reacting to actions and dispatching new ones back. Remove it and the rest of the app still works; it adds an async coordination layer on top of the existing dispatch cycle.",
    interviewLine: "redux-saga is a Redux middleware that runs side-effect logic inside generator functions; I `yield` effect creators like `call` and `put`, so the saga reads linearly while the middleware handles the actual async execution, and I unit-test it by stepping through the generator with `.next()` and asserting each yielded effect object.",
    misconception: "Treating redux-saga as a standalone async utility (a Promise wrapper or a fetch helper) rather than a Redux middleware that only works by intercepting dispatched actions in the store's middleware chain and dispatching new actions back.",
    hints: [
      "Think about where in the Redux pipeline a library that 'manages side effects' would sit relative to `dispatch` and the reducers.",
      "What language feature lets a function pause mid-execution, hand a value to a runner, and resume later with a result fed back in?",
      "It is not a standalone async utility; it plugs into the store's middleware chain and only reacts to actions that pass through `dispatch`."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice how each `yield` pauses the generator and hands control to the middleware, which runs the effect and feeds the result back on the next `.next()` call.",
      language: "typescript",
      code: "import { takeEvery, call, put } from 'redux-saga/effects';\n\nfunction* fetchUser(id: number) {\n  const response = yield call(fetch, `/api/users/${id}`);\n  const user = yield call(response.json);\n  yield put({ type: 'USER_LOADED', payload: user });\n}\n\nexport function* watchFetchUser() {\n  yield takeEvery('FETCH_USER_REQUEST', fetchUser);\n}"
    }
  },
  {
    id: "react-what-are-the-differences-between-call-and-put-in-redux",
    title: "What are the differences between call() and put() in redux-saga?",
    prompt: "What are the differences between call() and put() in redux-saga?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeSnippet: "function* fetchUserSaga(action) {\n  // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.\n  // Instructing middleware to call promise, it resolved value will be assigned to `userData` variable\n  const userData = yield call(api.fetchUser, action.userId);\n\n  // Instructing middleware to dispatch corresponding action.\n  yield put({\n    type: 'FETCH_USER_SUCCESS',\n    userData,\n  });\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`call` yields a function to invoke; `put` yields an action to dispatch.",
        isCorrect: true,
        explanation: "Correct. `call` produces an effect whose target is a function invocation (typically Promise-returning), and `put` produces an effect whose target is an action dispatch. The saga middleware reads each description and performs the actual call or dispatch."
      },
      {
        id: "B",
        text: "`call` runs synchronously; `put` is mobile-only.",
        isCorrect: false,
        explanation: "Tempting if you equate \"not a Promise\" with \"synchronous,\" but `call` exists precisely to wrap async calls inside a generator so the middleware can await them. `put` dispatches Redux actions in any environment; it has no platform restriction."
      },
      {
        id: "C",
        text: "`call` deletes data; `put` creates tables.",
        isCorrect: false,
        explanation: "Neither function touches a database. `call` invokes whatever function you pass in, and `put` dispatches whatever action object you pass in. Their scope is limited to the saga middleware's effect-handling pipeline."
      },
      {
        id: "D",
        text: "They are identical aliases with no difference.",
        isCorrect: false,
        explanation: "They have different internal symbols, different middleware handlers, and different return semantics. `call` resolves to a value the generator can use; `put` returns the action object (or, with `put.resolve`, the result of a thunk). They are not interchangeable."
      }
    ],
    correctAnswer: "A",
    explanation: "`call` and `put` are effect-creator functions in redux-saga. Each one returns a plain object (an effect description) that the saga middleware intercepts when you `yield` it. `call(fn, ...args)` describes the intent \"invoke this function and hand back the resolved value.\" `put(action)` describes the intent \"dispatch this action to the Redux store.\" Neither function performs the work itself.\n\nIn the example, `yield call(api.fetchUser, action.userId)` pauses the generator. The middleware calls `api.fetchUser`, awaits the Promise, then resumes the generator with the resolved value bound to `userData`. The following `yield put({ type: 'FETCH_USER_SUCCESS', userData })` tells the middleware to call `store.dispatch` with that action, so reducers can update state. The generator never calls the API or dispatches directly; it only describes what should happen.\n\nBecause both effects are plain objects, you can unit-test a saga by asserting on the yielded descriptions without mocking the network or the store. That declarative shape is the core design choice that separates redux-saga from calling `api.fetchUser` and `store.dispatch` inline.",
    interviewLine: "I'd explain that both are effect creators returning plain objects the saga middleware intercepts: `call` tells the middleware to invoke a function and hand back the resolved value, while `put` tells it to dispatch an action. The generator never calls the function or dispatches directly; it only describes the intent.",
    misconception: "Treating `call` and `put` as direct function calls or dispatches rather than declarative effect descriptions that the saga middleware interprets and executes on the generator's behalf.",
    hints: [
      "Look at what each function returns: a plain object, not a Promise or a dispatched action.",
      "Ask what the saga middleware does when it sees each yielded effect object.",
      "The key distinction is the target: one invokes a function, the other dispatches an action."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice that `call` yields a value the generator can use, while each `put` simply describes an action for the middleware to dispatch.",
      language: "typescript",
      code: "import { call, put } from 'redux-saga/effects';\n\nfunction* handleFormSubmit(payload: { email: string }) {\n  const result = yield call(api.subscribe, payload.email);\n  yield put({ type: 'SUBSCRIBE_SUCCESS', id: result.id });\n  yield put({ type: 'SHOW_TOAST', message: 'Subscribed!' });\n}"
    }
  },
  {
    id: "react-what-are-the-differences-between-redux-saga-and-redux-t",
    title: "What are the differences between redux-saga and redux-thunk?",
    prompt: "What are the differences between redux-saga and redux-thunk?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Saga does not support asynchronous operations; it only handles synchronous state transitions in the store.",
        isCorrect: false,
        explanation: "Tempting if you confuse Saga with a synchronous state selector, but Saga's entire purpose is coordinating async workflows: `call` awaits a function, `take` waits for an action, and `race` resolves on the first settled effect."
      },
      {
        id: "B",
        text: "Thunk is deprecated and forbidden in modern JavaScript; you must use native top-level async/await instead.",
        isCorrect: false,
        explanation: "Tempting if you conflate \"older library\" with \"removed from the language,\" but Thunk is a Redux middleware pattern, not a language feature. Redux Toolkit still ships `createAsyncThunk` as its default async helper."
      },
      {
        id: "C",
        text: "Thunk uses Promises in a dispatched function; Saga uses generators yielding effect objects for built-in cancellation and debouncing.",
        isCorrect: true,
        explanation: "Correct. Thunk wraps side effects in a plain function using Promises; Saga structures the same work as a generator that yields effect descriptors the middleware interprets, making cancellation, debouncing, and step-by-step testing declarative."
      },
      {
        id: "D",
        text: "Thunk runs on the client; Saga runs exclusively on backend servers and cannot be used in a browser tab.",
        isCorrect: false,
        explanation: "Tempting if you associate \"saga\" with server-side orchestration frameworks, but both are Redux middleware packages that intercept dispatched actions wherever your store lives, typically in a browser tab."
      }
    ],
    correctAnswer: "C",
    explanation: "Thunk middleware lets you dispatch a function that receives `dispatch` and `getState`; inside that function you write ordinary `async/await` or Promise chains to fetch data and dispatch follow-up actions. Redux Saga middleware instead receives a Generator function. The generator yields effect descriptors such as `call`, `put`, `takeLatest`, and `race`; the middleware interprets each yielded object and feeds the result back into the generator via `next`.\n\nIn practice this means cancellation and debouncing are structural in Saga: `takeLatest` cancels the previous task automatically when a new action arrives, and `delay` gives you a debounce window for free. With Thunk you must track a boolean flag or an `AbortController` yourself, and coordinating a race between two dispatched thunks requires manual bookkeeping.\n\nBoth are client-side Redux middleware and can coexist in the same store. For a single fetch-then-dispatch flow, Thunk (or Redux Toolkit's `createAsyncThunk`) is the lighter choice. Saga earns its complexity when a workflow spans multiple steps, needs to react to several action types, or must be unit-tested by stepping through a generator without touching the network.",
    interviewLine: "Thunk gives me a function with `dispatch` and `getState` where I write Promises directly; Saga gives me a generator that yields effect objects like `takeLatest` and `race`, which the middleware interprets, so cancellation and debouncing are declarative rather than something I wire up by hand.",
    misconception: "Treating one of the two libraries as a server-side tool or a different architectural layer, when in fact both are client-side Redux middleware that intercept dispatched actions before they reach reducers.",
    hints: [
      "Think about what each middleware receives when you dispatch: a plain function or a generator function.",
      "Ask how each one handles \"cancel the previous request if a new one arrives\" \u2014 one needs a flag, the other has a built-in effect.",
      "Neither library is a server framework; both are Redux middleware that run wherever your store lives."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice the generator yielding `call` and `put` as data objects rather than executing them directly \u2014 the middleware reads each yield and decides what to do.",
      language: "typescript",
      code: "import { call, put, takeLatest } from 'redux-saga/effects';\n\nfunction* fetchUserSaga(action: { payload: string }) {\n  try {\n    const res = yield call(fetch, `/api/users/${action.payload}`);\n    const user = yield call([res, 'json']);\n    yield put({ type: 'USER_LOADED', payload: user });\n  } catch (err) {\n    yield put({ type: 'USER_ERROR', payload: err });\n  }\n}\n\nexport default function* rootSaga() {\n  yield takeLatest('FETCH_USER', fetchUserSaga);\n}"
    }
  },
  {
    id: "react-what-are-the-main-features-of-redux-form",
    title: "What are the main features of Redux Form?",
    prompt: "What are the main features of Redux Form?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Managing local component state with `useState` to avoid prop drilling, without requiring a global store.",
        isCorrect: false,
        explanation: "Tempting if you think Redux Form is just a wrapper around `useState`, but it specifically requires a Redux store to centralize state, allowing any component to read or dispatch against it."
      },
      {
        id: "B",
        text: "Rendering form inputs directly and handling their DOM events, removing the need for React components.",
        isCorrect: false,
        explanation: "Tempting if you confuse a form library with a UI framework, but Redux Form does not render inputs; it tracks the state of inputs that you render in your React components."
      },
      {
        id: "C",
        text: "Synchronizing form data with a backend database automatically whenever a field value changes.",
        isCorrect: false,
        explanation: "Tempting if you think of forms as data pipelines, but Redux Form is a client-side state manager; it does not perform network requests or database writes on its own."
      },
      {
        id: "D",
        text: "Centralizing field values, validation, and status flags in the Redux store, with support for formatting and async validation.",
        isCorrect: true,
        explanation: "Correct. Redux Form moves form state (values, `dirty`, `submitting`, etc.) into the Redux store, enabling global access, validation, and formatting without prop drilling."
      }
    ],
    correctAnswer: "D",
    explanation: "Redux Form (now `@redux-form`) puts every piece of form state into the Redux store: each field's value, whether it has been touched or visited, whether it is `dirty` or `pristine`, and whether a submission is currently in flight. Because that state lives in the store rather than in individual component `useState` calls, any component can read or dispatch against it without prop drilling.\n\nIn practice this means you can reset a form by dispatching `RESET`, sync a draft across tabs via `redux-persist`, and run synchronous or asynchronous validation (for example, checking a username against an API) with the result written back into the same store slice. Formatting and parsing functions let you display a value one way (a formatted date) while storing another (an ISO string) without losing data on round-trip.\n\nRedux Form is a client-side state-management layer, not a rendering library, a backend service, or a security tool. It does not create DOM elements, talk to a database, or submit a form on its own; it tracks the state of those operations so your components and middleware can react to them.",
    interviewLine: "Redux Form lives entirely in the Redux store: every field value, validation result, and lifecycle flag like `dirty` or `submitting` is a slice of state I can dispatch against, read in any component, or persist, without prop drilling or DOM inspection.",
    misconception: "Thinking of Redux Form as a full-stack form engine that renders inputs, talks to a database, and handles transport, when it is actually a client-side state-tracking layer that sits between your components and the Redux store.",
    hints: [
      "Think about where a controlled input's value lives in a typical React app versus where Redux Form puts it.",
      "What state does a form need beyond just the values\u2014validation results, submission status, whether a field has been edited?",
      "Redux Form is a state-management library, not a rendering or networking layer; rule out options that describe server-side or hardware behaviour."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input",
    example: {
      caption: "Notice that every field's value, dirty flag, and submission status is a plain object path in the store, readable from any component.",
      language: "typescript",
      code: "import { reducer as formReducer } from \"@redux-form\";\n\ninterface RootState {\n  form: ReturnType<typeof formReducer>;\n}\n\n// After a user types \"Ada\" into a field named \"name\":\n// store.getState().form.myForm.values.name    === \"Ada\"\n// store.getState().form.myForm.dirty.name     === true\n// store.getState().form.myForm.pristine       === false\n// store.getState().form.myForm.touched.name   === true\n// store.getState().form.myForm.submitting     === false\n\n// A second component can read the same value with no prop drilling:\n// const name = useSelector((s: RootState) => s.form.myForm.values.name);"
    }
  },
  {
    id: "react-what-are-typical-middleware-choices-for-handling-asynch",
    title: "What are typical middleware choices for handling asynchronous calls in Redux?",
    prompt: "What are typical middleware choices for handling asynchronous calls in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "async-await",
    tags: [
      "react",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "PostgreSQL, MongoDB, and Redis (database engines for persisting data).",
        isCorrect: false,
        explanation: "Tempting if you conflate \"async data handling\" with \"where the data lives,\" but these are database engines with no knowledge of a Redux store, its dispatch pipeline, or its action format."
      },
      {
        id: "B",
        text: "Redux Thunk (Toolkit's default), Redux Saga (generators), Redux Observable (RxJS), and RTK Query (fetching + caching).",
        isCorrect: true,
        explanation: "Correct. Each of these plugs into the Redux dispatch pipeline at runtime, intercepting actions to perform asynchronous side effects and then dispatching resolved actions back to the reducers."
      },
      {
        id: "C",
        text: "Webpack, Babel, and ESLint (build-time bundling, transpilation, and linting).",
        isCorrect: false,
        explanation: "Tempting if you equate \"tooling in the React stack\" with \"Redux middleware,\" but these operate at build time or in the linter; none of them attach to a store's dispatch chain at runtime."
      },
      {
        id: "D",
        text: "React DOM, React Native, and React Three Fiber (rendering targets for React apps).",
        isCorrect: false,
        explanation: "Tempting if you think of any library in the React ecosystem as interchangeable, but these are rendering targets and renderers; they know nothing about Redux actions, reducers, or the middleware signature."
      }
    ],
    correctAnswer: "B",
    explanation: "Redux middleware wraps the dispatch pipeline: it intercepts an action before it reaches the reducer. For asynchronous work the middleware delays the final dispatch, performs a side effect such as a network call, then dispatches a follow-up action. Redux Thunk is the simplest form \u2014 the \"action\" is a function that receives `dispatch` and `getState`, and Redux Toolkit ships it by default. Redux Saga replaces the callback with a generator that yields effect descriptors for cancellation and branching. Redux Observable pipes action streams through RxJS operators. RTK Query builds on the same pattern and adds caching, deduplication, and invalidation so you skip hand-written Thunk code for standard REST endpoints.\n\nWithout a middleware layer a reducer must stay synchronous and pure, so it cannot call `fetch` or `setTimeout`. The middleware intercepts the dispatched function or generator, performs the async work, then dispatches a plain action back through the normal pipeline. This keeps every reducer testable in isolation and the store deterministic.\n\nRTK Query covers most CRUD and polling use-cases out of the box, but complex orchestration \u2014 cancelling in-flight requests, retry with backoff, conditional dispatch based on another slice \u2014 still points to a hand-written Thunk or a Saga. Older libraries like `redux-promise` are effectively deprecated; `createAsyncThunk` supersedes them.",
    interviewLine: "Redux middleware wraps dispatch, so for async work I reach for Redux Thunk since Redux Toolkit ships it by default, or Redux Saga when the flow needs cancellation and branching. For standard REST caching I use RTK Query because it handles the middleware plumbing, deduplication, and cache invalidation for me.",
    misconception: "Treating any library that can make an HTTP request as a valid \"Redux middleware,\" or confusing build-time and rendering-layer tools with runtime extensions that hook into the store's dispatch pipeline.",
    hints: [
      "Redux middleware sits between `dispatch` and the reducer \u2014 think about what that position lets you do with a function instead of a plain action object.",
      "Which of these libraries extend a Redux store at runtime versus running at build time or operating on a completely different layer like databases or rendering targets?",
      "The correct answer lists tools that all plug into the store's dispatch chain; the wrong ones operate on databases, build pipelines, or rendering targets."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "`createAsyncThunk` wraps the fetch call in a Thunk-style function, so the store's dispatch pipeline handles the async work without the reducer ever calling `fetch` directly.",
      language: "typescript",
      code: "import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';\n\nexport const fetchUser = createAsyncThunk(\n  'users/fetchById',\n  async (id: number) => {\n    const res = await fetch(`/api/users/${id}`);\n    const data = await res.json();\n    return data;\n  }\n);\n\nconst userSlice = createSlice({\n  name: 'user',\n  initialState: { data: null, status: 'idle' },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchUser.pending, (s) => { s.status = 'loading'; })\n      .addCase(fetchUser.fulfilled, (s, a) => { s.data = a.payload; s.status = 'done'; })\n      .addCase(fetchUser.rejected, (s) => { s.status = 'error'; });\n  },\n});\n\nexport default userSlice.reducer;"
    }
  },
  {
    id: "javascript-stale-closure-primitive-capture",
    title: "Closures capture variables, not the expressions that filled them",
    prompt: "What does log() print after increment() has run twice?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "closures",
    tags: [
      "javascript",
      "closures",
      "lexical-scope",
      "senior"
    ],
    codeSnippet: "function createIncrement() {\n  let count = 0;\n  const message = `Count is ${count}`;\n\n  function increment() {\n    count++;\n  }\n\n  function log() {\n    console.log(message);\n  }\n\n  return { increment, log };\n}\n\nconst { increment, log } = createIncrement();\nincrement();\nincrement();\nlog();",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Count is 2",
        isCorrect: false,
        explanation: "Tempting if you assume the template literal is re-evaluated each time `log()` runs. It is not; `message` holds a finished string assigned once, and `const` prevents reassignment, so the value never updates."
      },
      {
        id: "B",
        text: "Count is 1",
        isCorrect: false,
        explanation: "This would be the output if exactly one `increment()` had run before `log()`, but even then `message` would still print \"Count is 0\" because the string was frozen at the first assignment, before any increment."
      },
      {
        id: "C",
        text: "undefined",
        isCorrect: false,
        explanation: "Tempting if you suspect `message` is in the temporal dead zone or somehow uninitialized, but the `const` assignment executes during `createIncrement()` before any inner function is ever called, so `message` is a fully constructed string by the time `log()` runs."
      },
      {
        id: "D",
        text: "Count is 0",
        isCorrect: true,
        explanation: "Correct. The template literal is evaluated once at the point of assignment, when `count` is 0, and the resulting string is stored in `message` permanently; no later call re-runs that expression."
      }
    ],
    correctAnswer: "D",
    explanation: "D is correct. When `createIncrement()` runs, the template literal `Count is ${count}` is evaluated immediately, producing the string \"Count is 0\", and that finished string is stored in `message`. The inner functions close over the binding `message`, which now holds a primitive string. Calling `increment()` twice mutates `count` to 2, but `message` is a `const` holding an already-computed value \u2014 it has no reference back to `count`.\n\nIn real code this bites when someone writes a label or tooltip string once and expects it to stay in sync with a counter. The fix is to build the string at call time: `console.log(`Count is ${count}`)`. Then each invocation re-reads the shared binding and reflects the current value.\n\nThe nuance an interviewer probes: if `message` were an object, say `{ text: `Count is ${count}` }`, the closure would capture the object reference, and mutating `message.text` from `increment` would be visible in `log`. The distinction is not closure versus no closure \u2014 both cases close over a binding \u2014 but whether that binding holds an immutable primitive or a mutable reference.",
    interviewLine: "I remind myself that closures capture bindings, not expressions. Here `message` is a `const` string computed once at creation time, so no matter how many times `increment()` mutates `count`, `log()` will always print the original snapshot.",
    misconception: "Believing that a closure re-runs the expression that originally produced a variable's value. The closure captures the binding, and if that binding holds a primitive string, the value is fixed for the lifetime of the closure.",
    hints: [
      "When does the template literal actually execute \u2014 at the `const` assignment or inside `log()`?",
      "After `increment()` runs twice, does `message` still point to the same string it was assigned at creation?",
      "The trap is assuming `message` is a live view of `count`; it is a finished primitive, not a reference to the counter."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
    example: {
      caption: "Notice how `snapshot` is frozen at creation while `live.label` tracks the current value because it is reassigned on every `bump()` call.",
      language: "javascript",
      code: "function createCounter() {\n  let n = 0;\n  const snapshot = `n is ${n}`;\n  const live = { label: \"\" };\n\n  function bump() {\n    n++;\n    live.label = `n is ${n}`;\n  }\n\n  function show() {\n    console.log(snapshot, live.label);\n  }\n\n  return { bump, show };\n}\n\nconst { bump, show } = createCounter();\nbump();\nbump();\nshow(); // n is 0  n is 2"
    }
  },
  {
    id: "javascript-this-binding-three-ways",
    title: "Three call sites, three different values of this",
    prompt: "What does user.greet() log?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "closures",
    tags: [
      "javascript",
      "this",
      "arrow-functions",
      "binding",
      "senior"
    ],
    codeSnippet: "const user = {\n  name: \"Alex\",\n  greet() {\n    console.log(`Hello, ${this.name}!`);\n\n    const innerNormal = function () {\n      console.log(`Normal: ${this.name}`);\n    };\n    const innerArrow = () => {\n      console.log(`Arrow: ${this.name}`);\n    };\n\n    innerNormal();\n    innerArrow();\n  },\n};\n\nuser.greet();",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Hello, Alex!\nNormal: Alex\nArrow: Alex",
        isCorrect: false,
        explanation: "Tempting if you assume a nested regular function inherits the enclosing method's `this`. It does not: `innerNormal()` is called bare, so it gets its own `this` from the call site (`globalThis` in non-strict Node.js), not from `greet`."
      },
      {
        id: "B",
        text: "Hello, Alex!\nNormal: undefined\nArrow: Alex",
        isCorrect: true,
        explanation: "Correct. The method call binds `this` to `user`; the bare call to a regular function loses that binding and reads `undefined` off `globalThis`; the arrow function lexically inherits `greet`'s `this`, which is still `user`."
      },
      {
        id: "C",
        text: "Hello, Alex!\nNormal: undefined\nArrow: undefined",
        isCorrect: false,
        explanation: "This misreads the arrow function as if it also loses `this` on a bare call. Arrow functions have no own `this`; they always use the `this` of the scope in which they are defined, which here is `greet` and therefore `user`."
      },
      {
        id: "D",
        text: "Hello, undefined!\nNormal: undefined\nArrow: undefined",
        isCorrect: false,
        explanation: "This treats `greet` as if it were called bare. But `user.greet()` is a method call with `user` as the receiver, so `this` inside `greet` is `user` and `this.name` is `\"Alex\"`."
      }
    ],
    correctAnswer: "B",
    explanation: "`user.greet()` is a method call, so `this` inside `greet` is `user`, and the first line prints \"Hello, Alex!\". `innerNormal` is a regular function; called bare as `innerNormal()` with no receiver, it does not inherit `greet`'s `this`. In a non-strict Node.js script a bare call sets `this` to `globalThis`, and `globalThis.name` is `undefined`, so the second line prints \"Normal: undefined\". `innerArrow` is an arrow function, which has no own `this` binding; it lexically captures `greet`'s `this` (i.e. `user`), so the third line prints \"Arrow: Alex\".\n\nThis is the mechanism behind the \"Cannot read properties of undefined\" errors that appear the moment you lift a method's body into a standalone helper and call it bare. The helper's `this` no longer points to the object. The two standard fixes are to make the helper an arrow function so it inherits `this` from the enclosing scope, or to restore the receiver explicitly with `fn.call(this)` or `fn.bind(this)`.\n\nIn strict mode \u2014 every ES module, or any script with `\"use strict\"` \u2014 a bare function call sets `this` to `undefined` rather than `globalThis`. Reading `.name` off `undefined` throws a `TypeError`, so execution stops at the second `console.log` and you never see the \"Arrow: Alex\" line. The output in option B assumes a non-strict script in a Node.js-like runtime where `globalThis.name` is simply `undefined`.",
    interviewLine: "I'd explain that regular functions resolve `this` at call time from the receiver on the left of the dot, so a bare call loses the binding. Arrow functions skip that step entirely and close over the `this` of the scope where they were defined, which is why they survive callbacks and nested invocations without `.bind`.",
    misconception: "A regular function nested inside a method inherits that method's `this`. It does not: only arrow functions capture `this` lexically from their enclosing scope; a regular function always resolves `this` from its own call site.",
    hints: [
      "For each of the three console.log calls, ask: what is the receiver on the left side of the dot at the moment of the call, or is there no receiver at all?",
      "A regular function gets this from its own call site; an arrow function gets it from the scope where it was written. Which one is which here?",
      "innerArrow() is also a bare call, but arrow functions ignore the call-site receiver entirely \u2014 they read the this already fixed by their enclosing scope, which here is greet."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    example: {
      caption: "Same regular-vs-arrow `this` split, but the callback is a `setTimeout` handler \u2014 the pattern that breaks most often in real code.",
      language: "javascript",
      code: "const counter = {\n  count: 0,\n  increment() {\n    this.count++;\n    setTimeout(function () {\n      console.log(this.count); // undefined (non-strict Node) / TypeError (strict)\n    }, 10);\n    setTimeout(() => {\n      console.log(this.count); // 1\n    }, 10);\n  },\n};\ncounter.increment();"
    }
  },
  {
    id: "javascript-prototype-read-vs-write",
    title: "Why += creates an own property but .push() does not",
    prompt: "What do the four logs print?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "design-patterns",
    tags: [
      "javascript",
      "prototypes",
      "mutation",
      "object-create",
      "senior"
    ],
    codeSnippet: "const grandparent = { heritage: [\"gold\", \"land\"], coins: 100 };\nconst parent = Object.create(grandparent);\nconst child = Object.create(parent);\n\nchild.coins += 50;\nchild.heritage.push(\"debts\");\n\nconsole.log(grandparent.coins);\nconsole.log(grandparent.heritage);\nconsole.log(child.coins);\nconsole.log(child.heritage);",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "100\n[\"gold\", \"land\", \"debts\"]\n150\n[\"gold\", \"land\", \"debts\"]",
        isCorrect: true,
        explanation: "Correct. The `+=` operator performs an assignment that creates an own property on `child`, while `.push()` mutates the single shared array without any assignment, so `grandparent` sees the new element but keeps its original `coins` value."
      },
      {
        id: "B",
        text: "100\n[\"gold\", \"land\"]\n100\n[\"gold\", \"land\"]",
        isCorrect: false,
        explanation: "Tempting if you treat both `+=` and `.push()` as mutations that stay local to `child`. But `child.coins += 50` does write 150 onto `child`, and `.push()` does mutate the shared array in place, so both `child.coins` and `grandparent.heritage` change from their originals."
      },
      {
        id: "C",
        text: "150\n[\"gold\", \"land\", \"debts\"]\n150\n[\"gold\", \"land\", \"debts\"]",
        isCorrect: false,
        explanation: "Tempting if you think `+=` writes through the prototype chain to the object that originally defined the property. It does not: the assignment target is always the receiver, so `grandparent.coins` stays 100 and only `child` gains the 150."
      },
      {
        id: "D",
        text: "100\n[\"gold\", \"land\"]\n150\n[\"gold\", \"land\", \"debts\"]",
        isCorrect: false,
        explanation: "Tempting if you expect `child.heritage` to be a copy created at lookup time. It is not: the prototype chain returns the same array reference, so `.push()` is visible from `grandparent` as well, making its log `100` but its heritage `3` elements."
      }
    ],
    correctAnswer: "A",
    explanation: "`child.coins += 50` is a read-then-write: the engine reads `coins` up the prototype chain to get 100, adds 50, then writes 150 as a new own property on `child`. `child.heritage.push(\"debts\")` is a read-then-mutate: it reads the array reference from `grandparent` and calls `.push()` on that same object. No assignment to `heritage` ever happens, so all three objects still point to the one array.\n\nThe practical split: `coins` is now shadowed. `child` has its own `coins` (150), `grandparent` keeps 100, and `parent` has none of its own. `heritage` is the opposite \u2014 one array, three lookups, all see `[\"gold\", \"land\", \"debts\"]`. If you wanted `child` to have an independent array, you would assign a copy: `child.heritage = [...child.heritage, \"debts\"]`, which is a write that creates an own property.\n\nThe nuance an interviewer probes: `+=` is syntactic sugar for `child.coins = child.coins + 50`, and the assignment target is always the receiver, never the object that originally defined the property. A bare method call like `.push()` has no assignment step at all, so it cannot create an own property. The prototype chain is a lookup mechanism, not a cloning mechanism.",
    interviewLine: "I'd frame it as reads walking the chain but writes stopping at the receiver \u2014 `+=` assigns a new own property on `child`, while `.push()` mutates the shared array that `grandparent` also references.",
    misconception: "Reading a property through the prototype chain feels like getting a copy, but you get the same reference. A method call on that reference mutates the original, while `+=` is the one operation that actually assigns a new value to the receiver.",
    hints: [
      "Which of the two statements \u2014 `child.coins += 50` and `child.heritage.push(\"debts\")` \u2014 actually performs an assignment to a property on `child`?",
      "Think about what `+=` expands to: the right-hand side is evaluated first, then the result is written back to the receiver.",
      "A `.push()` call never rebinds the `heritage` property; it mutates the array object that the property already references."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    example: {
      caption: "The spread assignment on `items` is the fix the question's code is missing: it rebinds the property instead of mutating the shared array.",
      language: "javascript",
      code: "const base = { items: [\"a\", \"b\"], count: 2 };\nconst derived = Object.create(base);\n\nderived.count += 1;\nderived.items = [...derived.items, \"c\"];\n\nconsole.log(base.count);    // 2\nconsole.log(base.items);    // [\"a\", \"b\"]\nconsole.log(derived.count); // 3\nconsole.log(derived.items); // [\"a\", \"b\", \"c\"]"
    }
  },
  {
    id: "javascript-event-loop-macrotask-microtask-order",
    title: "Ordering the call stack, microtasks and macrotasks",
    prompt: "In what order do the numbers print?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "event-loop",
    tags: [
      "javascript",
      "event-loop",
      "microtasks",
      "settimeout",
      "senior"
    ],
    codeSnippet: "console.log(\"1\");\n\nsetTimeout(() => {\n  console.log(\"2\");\n  Promise.resolve().then(() => console.log(\"3\"));\n}, 0);\n\nnew Promise((resolve) => {\n  console.log(\"4\");\n  resolve();\n}).then(() => {\n  console.log(\"5\");\n  setTimeout(() => console.log(\"6\"), 0);\n});\n\nconsole.log(\"7\");",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "1 4 5 7 2 3 6",
        isCorrect: false,
        explanation: "Tempting if you read `resolve()` as triggering the `.then` callback on the spot, but the callback is a microtask and cannot preempt the still-synchronous `console.log(\"7\")` that follows it in the script."
      },
      {
        id: "B",
        text: "1 4 7 5 2 3 6",
        isCorrect: true,
        explanation: "Correct. Synchronous code runs to completion (1, 4, 7), then the microtask queue drains (5), then macrotasks fire in scheduling order with their own microtasks draining in between (2, 3, 6)."
      },
      {
        id: "C",
        text: "1 4 7 2 3 5 6",
        isCorrect: false,
        explanation: "This places the first `setTimeout` ahead of the `.then` callback, which would only happen if macrotasks and microtasks shared a single FIFO queue. The event loop always empties the microtask queue before dispatching the next macrotask."
      },
      {
        id: "D",
        text: "1 2 3 4 5 6 7",
        isCorrect: false,
        explanation: "This reads the script as a flat sequence where `setTimeout(fn, 0)` means \"run on the next tick.\" In reality the timer is a macrotask and cannot fire until the entire synchronous script and all pending microtasks have completed."
      }
    ],
    correctAnswer: "B",
    explanation: "The synchronous pass runs top to bottom: `console.log(\"1\")`, the `setTimeout` enqueues a macrotask, the Promise executor body runs inline (printing \"4\" and calling `resolve()`), the `.then` callback is queued as a microtask, and `console.log(\"7\")` finishes the synchronous phase. Output so far: 1, 4, 7.\n\nThe call stack is now empty, so the event loop drains the microtask queue before dispatching any macrotask. The `.then` callback prints \"5\" and calls `setTimeout`, which enqueues a second macrotask behind the first. The microtask queue is empty again, so the loop moves to macrotasks in scheduling order: the first timer prints \"2\" and queues `Promise.resolve().then(...)` as a new microtask. That microtask drains before the next macrotask fires, printing \"3\". Finally the second timer prints \"6\".\n\nThe invariant an interviewer will probe next: the microtask queue drains completely between every pair of macrotasks, not one callback at a time. If the `.then` body in step 5 had chained another `.then`, that second callback would also run before the first `setTimeout` fires. Only the boundary between macrotasks re-enters the microtask-check loop.",
    interviewLine: "I'd point out that the microtask queue drains completely between every pair of macrotasks, so a `.then` callback always runs before the next timer fires, even if that timer was scheduled earlier in the script.",
    misconception: "Treating `setTimeout(fn, 0)` as \"run next.\" It is a macrotask and always yields to every pending microtask already in the queue, regardless of when it was scheduled.",
    hints: [
      "The Promise executor body runs synchronously; only the `.then` callback is deferred to the microtask queue.",
      "After the synchronous pass ends, list what is in the microtask queue versus the macrotask queue, and ask which the loop drains first.",
      "`setTimeout(fn, 0)` does not mean \"run immediately\"; it enqueues a macrotask that waits for all pending microtasks to finish."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    example: {
      caption: "Notice that `queueMicrotask` callbacks added during a microtask's execution (E) still drain before any macrotask fires, and the timer's own microtask (C) runs before the script ends.",
      language: "javascript",
      code: "console.log(\"A\");\nsetTimeout(() => {\n  console.log(\"B\");\n  queueMicrotask(() => console.log(\"C\"));\n}, 0);\nqueueMicrotask(() => {\n  console.log(\"D\");\n  queueMicrotask(() => console.log(\"E\"));\n});\nconsole.log(\"F\");\n// Output: A, F, D, E, B, C"
    }
  },
  {
    id: "javascript-await-vs-then-scheduling",
    title: "Where await resumes relative to a .then chain",
    prompt: "In what order do the logs appear?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "async-await",
      "microtasks",
      "promises",
      "senior"
    ],
    codeSnippet: "async function asyncFunc() {\n  console.log(\"2\");\n  await Promise.resolve();\n  console.log(\"3\");\n}\n\nconsole.log(\"1\");\nasyncFunc();\n\nPromise.resolve()\n  .then(() => console.log(\"4\"))\n  .then(() => console.log(\"5\"));\n\nconsole.log(\"6\");",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "1 2 6 3 4 5",
        isCorrect: true,
        explanation: "Correct. The async body runs synchronously to the first await, enqueuing the 3-continuation as a microtask before the .then chain is set up, so 3 precedes 4 in the queue."
      },
      {
        id: "B",
        text: "1 2 3 6 4 5",
        isCorrect: false,
        explanation: "Tempting if you model await as a synchronous pause on a resolved promise, but code after await never executes in the current tick; it is always deferred to the microtask queue, so 6 (synchronous) must print before 3."
      },
      {
        id: "C",
        text: "1 6 2 3 4 5",
        isCorrect: false,
        explanation: "This treats calling an async function like scheduling a callback, but the body runs immediately and synchronously up to the first await, so 2 prints before 6."
      },
      {
        id: "D",
        text: "1 2 6 4 3 5",
        isCorrect: false,
        explanation: "This assumes the .then callback registered on the following line has priority over the await continuation, but the continuation was enqueued first (during the asyncFunc() call), so it drains first."
      }
    ],
    correctAnswer: "A",
    explanation: "The output is 1 2 6 3 4 5. Calling asyncFunc() executes its body synchronously up to the first await, so 2 prints right after 1. At await Promise.resolve(), the continuation (printing 3) is enqueued as a microtask and the function suspends. Control returns to the caller, where .then(() => console.log(\"4\")) enqueues its handler behind that continuation. Then 6 prints, ending the synchronous pass. The microtask queue now holds [3-continuation, 4-handler] and drains in that order. The second .then was registered on the promise returned by the first .then, which is still pending, so its handler is only enqueued after 4 runs, giving 5 last.\n\nIn a real codebase this ordering bites when you mix await and .then in the same module. A helper that does await Promise.resolve() to yield to the microtask queue will always run before a .then callback registered after the call, even though the .then appears later in source. Reordering those two lines changes the output, which is a common source of flaky test assertions.\n\nOne nuance an interviewer will probe: in older V8 (pre-2019) await on an already-resolved promise inserted an extra microtask tick, behaving like .then().then(). Modern engines collapsed that to a single tick, so await Promise.resolve() is now equivalent to one .then. Code that relied on the double-tick behaviour breaks on current runtimes.",
    interviewLine: "I'd trace it as: the async body runs synchronously until the first await, which enqueues the continuation as a microtask. That microtask was enqueued before the .then on the next line, so it drains first; the second .then is only reachable after the first handler resolves its promise.",
    misconception: "Await on a resolved promise does not resume in the current synchronous pass; it enqueues a microtask whose position is determined by when it was enqueued, not by the source order of the .then that follows.",
    hints: [
      "Trace which statements execute in the synchronous pass before the microtask queue is consulted.",
      "When does the await continuation get enqueued relative to the first .then callback?",
      "The second .then is registered on a promise that is still pending, so its handler cannot be queued yet."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
    example: {
      caption: "Two async functions called back-to-back: both bodies run synchronously in order, then their continuations drain in the same order.",
      language: "javascript",
      code: "async function step(label) {\n  console.log(`start ${label}`);\n  await Promise.resolve();\n  console.log(`end ${label}`);\n}\n\nstep(\"A\");\nstep(\"B\");\nconsole.log(\"done\");\n// start A\n// start B\n// done\n// end A\n// end B"
    }
  },
  {
    id: "javascript-promise-all-fail-fast",
    title: "What Promise.all does when one input rejects",
    prompt: "One of the three requests rejects. What happens?",
    level: "intermediate",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "promise-all",
      "async"
    ],
    codeSnippet: "const results = await Promise.all([\n  fetch(\"/a\"),\n  fetch(\"/b\"), // rejects\n  fetch(\"/c\"),\n]);",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "The returned promise rejects immediately with that error, and the other results are lost",
        isCorrect: true,
        explanation: "Correct. Promise.all is fail-fast: the first rejection settles the aggregate with that reason, and the values from the inputs that did fulfil are unreachable from the rejection."
      },
      {
        id: "B",
        text: "The array comes back with undefined in the failed position",
        isCorrect: false,
        explanation: "Tempting if you model Promise.all as filling an array slot by slot, but the aggregate never fulfils with a partial array \u2014 it rejects outright, so there is no array to index into."
      },
      {
        id: "C",
        text: "The other two requests are cancelled",
        isCorrect: false,
        explanation: "Promises have no built-in cancellation mechanism. Rejecting the aggregate does not send a signal back to the other fetch calls; they complete in the background exactly as if you had never wrapped them."
      },
      {
        id: "D",
        text: "It waits for all three, then rejects with an array of errors",
        isCorrect: false,
        explanation: "That describes a wait-for-all-then-report pattern closer to Promise.allSettled (array of per-input results) or Promise.any (throws AggregateError when every input rejects). Promise.all rejects on the first failure, not after the last one settles."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.all is fail-fast: the moment any input promise rejects, the aggregate rejects with that same reason. It does not wait for the remaining inputs and it does not build a partial array. In the snippet, the /b rejection settles the await immediately and control jumps to the nearest catch.\n\nThe practical consequence is that the two successful responses are unreachable from the catch block. They are not stashed anywhere you can retrieve them. Meanwhile the underlying fetch calls are already in flight and will complete in the background \u2014 their side effects (network traffic, server processing, connection slots) all still happen. If either of those later rejects and nothing else is listening, you get an unhandled promise rejection.\n\nThe contrast that matters in interviews: Promise.allSettled waits for every input and returns an array of { status, value } / { status, reason } objects, so you can inspect each result individually. Promise.all is the all-or-nothing gate; Promise.allSettled is the \"I need every outcome\" variant.",
    interviewLine: "I describe Promise.all as fail-fast and all-or-nothing: the first rejection settles the aggregate immediately, the successful values are unreachable, and the other promises keep running in the background because there is no cancellation mechanism.",
    misconception: "You get a partial array with undefined or null in the failed slot. In reality the aggregate rejects outright \u2014 there is no array to inspect, so the successful values are simply gone.",
    hints: [
      "Check the spec wording: does the aggregate settle on the first rejection or the last one?",
      "The other two fetch calls are already in flight \u2014 does rejecting the aggregate send any signal back to them?",
      "If the aggregate rejects, is there any array object you can destructure to recover the successful values?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "The two slow promises still resolve after the catch runs \u2014 their values are unreachable, and if either had rejected instead you would see an unhandled rejection.",
      language: "javascript",
      code: "const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));\nconst p2 = new Promise((_, reject) => setTimeout(() => reject(new Error(\"boom\")), 50));\nconst p3 = new Promise((resolve) => setTimeout(() => resolve(3), 200));\n\ntry {\n  await Promise.all([p1, p2, p3]);\n} catch (e) {\n  console.log(e.message); // \"boom\"\n  // p1 and p3 still resolve in the background;\n  // their values are unreachable from here.\n}"
    }
  },
  {
    id: "javascript-promise-allsettled-result-shape",
    title: "The shape Promise.allSettled returns",
    prompt: "What does results look like when the second promise rejects?",
    level: "intermediate",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "allSettled",
      "async"
    ],
    codeSnippet: "const results = await Promise.allSettled([\n  Promise.resolve(1),\n  Promise.reject(new Error(\"boom\")),\n]);",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "[{ status: \"fulfilled\", value: 1 }, { status: \"rejected\", reason: Error }]",
        isCorrect: true,
        explanation: "Correct. Every input produces a descriptor object with a `status` discriminator and either `value` or `reason`, in the same order as the input array."
      },
      {
        id: "B",
        text: "[1], because the rejected entry is simply omitted from the array",
        isCorrect: false,
        explanation: "Tempting if you picture rejected entries as \"dropped\" like a failed HTTP request being skipped, but the array always has exactly one entry per input; nothing is filtered out."
      },
      {
        id: "C",
        text: "[1, new Error(\"boom\")], with the error as a bare value in the array",
        isCorrect: false,
        explanation: "Tempting if you picture the resolved value and the error sitting side by side in a flat array, but each result is wrapped in a descriptor object that carries a `status` field telling you which property to read."
      },
      {
        id: "D",
        text: "It rejects with Error(\"boom\"), short-circuiting just like Promise.all",
        isCorrect: false,
        explanation: "Tempting if you habitually reach for `Promise.all` and assume the `Settled` suffix only changes timing, but `allSettled` by design never rejects; it converts rejections into inspectable data."
      }
    ],
    correctAnswer: "A",
    explanation: "`Promise.allSettled` resolves (never rejects) once every input has settled, returning one descriptor per input in the original order. A fulfilled entry is `{ status: \"fulfilled\", value: <the resolved value> }`; a rejected entry is `{ status: \"rejected\", reason: <the rejection value> }`. Here the first entry carries `value: 1` and the second carries `reason: Error(\"boom\")`.\n\nIn practice this means you cannot index into bare values. You must check `entry.status` before reading `entry.value` or `entry.reason`, because a rejected entry has no `value` property at all. A common pattern is `results.filter(r => r.status === \"rejected\").map(r => r.reason)` to collect failures separately from successes.\n\nThe array length always equals the input length, and order is preserved regardless of which promise settles first. Unlike `Promise.all`, a single rejection does not short-circuit the remaining promises; every input is awaited to completion before the result is produced.",
    interviewLine: "I use `allSettled` when partial failure is a legitimate outcome, like fanning out to three microservices and reporting which ones timed out. It always resolves, and each entry tells me via `status` whether I should read `value` or `reason`.",
    misconception: "Treating the result like `Promise.all`'s output \u2014 a flat array of bare values \u2014 and indexing directly into `results[1]` expecting the error object rather than a `{ status, reason }` wrapper.",
    hints: [
      "Look at what `Promise.allSettled` returns versus what `Promise.all` returns \u2014 one wraps each result, the other does not.",
      "Each entry has a `status` field; ask yourself what the two possible statuses are and what data accompanies each.",
      "The array length equals the input length; no entries are skipped or filtered."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "Notice how every entry is inspected via `status` before accessing `value` or `reason`, and the output arrays always reflect the full input length.",
      language: "javascript",
      code: "async function fetchAll(urls) {\n  const results = await Promise.allSettled(\n    urls.map((url) => fetch(url).then((r) => r.json()))\n  );\n  const ok = results\n    .filter((r) => r.status === \"fulfilled\")\n    .map((r) => r.value);\n  const failed = results\n    .map((r, i) =>\n      r.status === \"rejected\" ? { url: urls[i], error: r.reason } : null\n    )\n    .filter(Boolean);\n  return { ok, failed };\n}"
    }
  },
  {
    id: "javascript-promise-all-vs-allsettled-choice",
    title: "Choosing between Promise.all and Promise.allSettled",
    prompt: "A dashboard loads three independent widgets. One endpoint is flaky. Which combinator, and why?",
    level: "senior",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "promise-all",
      "allSettled",
      "design"
    ],
    codeSnippet: "const [a, b, c] = await Promise.allSettled([loadA(), loadB(), loadC()]);\n\nrender({\n  a: a.status === \"fulfilled\" ? a.value: null,\n  b: b.status === \"fulfilled\" ? b.value: null,\n  c: c.status === \"fulfilled\" ? c.value: null,\n});",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Promise.allSettled, so one flaky widget cannot blank the two that loaded fine",
        isCorrect: true,
        explanation: "Correct. The widgets are independent, so partial success is a legitimate renderable state. `Promise.allSettled` preserves every fulfilled value and exposes each rejection individually, letting you render what you have and retry what you do not."
      },
      {
        id: "B",
        text: "Promise.race, to return as soon as the fastest widget resolves",
        isCorrect: false,
        explanation: "Tempting if you think the bottleneck is the slowest widget, but `Promise.race` resolves with whichever single promise settles first and discards the rest. You need all three results to render three widgets, not one."
      },
      {
        id: "C",
        text: "Promise.all, because it is faster when everything succeeds",
        isCorrect: false,
        explanation: "The speed argument does not hold: both combinators start all three fetches concurrently the instant the array is built. `Promise.all` merely surfaces a rejection sooner; it does not save network work or CPU. And in this scenario, surfacing a rejection sooner is exactly what you do not want."
      },
      {
        id: "D",
        text: "Promise.all, so the whole dashboard fails atomically",
        isCorrect: false,
        explanation: "Atomic failure is the right call when the results are interdependent \u2014 three columns of a single SQL join, for example. Independent widgets are the opposite case: two loaded widgets are still useful, so you want to keep them, not discard them."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.allSettled resolves with an array of result objects \u2014 one per input \u2014 each carrying a `status` of `\"fulfilled\"` or `\"rejected\"`. Promise.all, by contrast, rejects the moment any single input rejects, and the fulfilled values you already hold are discarded. For three independent widgets where one endpoint is flaky, allSettled is the combinator that keeps the two good responses available to render.\n\nThe practical difference shows up in the render path. With `Promise.all`, a single 500 from the inventory endpoint throws before you ever touch the revenue or traffic data, and the user sees a blank dashboard or a generic error. With `Promise.allSettled`, you inspect each slot, render the fulfilled widgets, and show a per-widget retry button for the failed one.\n\nNeither combinator cancels in-flight work: all three fetches are already dispatched the moment you build the array. The only distinction is when the combined promise settles. `Promise.all` can settle early on the first rejection; `Promise.allSettled` always waits for the slowest input. If the three results are interdependent \u2014 three parts of a single transaction \u2014 `Promise.all` is the right choice because a partial result is meaningless and failing fast is the honest signal.",
    interviewLine: "I'd use `Promise.allSettled` here because the widgets are independent; a partial result is still a useful screen. `Promise.all` is for when a partial result is meaningless, like the three legs of a single transaction. The choice is about the semantics of the data, not about speed.",
    misconception: "Treating `Promise.all` as the default for any batch of async calls, so one flaky dependency turns a partially-loaded dashboard into a blank page.",
    hints: [
      "Ask whether two of three widgets loaded is a useful screen or a failure.",
      "What does `Promise.all` do to the fulfilled values when one input rejects?",
      "Both combinators start all fetches concurrently; the difference is when the combined promise settles and what it resolves with."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "When the three results are interdependent, `Promise.all` is the right combinator because a partial transfer is worse than no transfer.",
      language: "javascript",
      code: "async function executeTransfer(from, to, amount) {\n  const [debit, credit, audit] = await Promise.all([\n    ledger.debit(from, amount),\n    ledger.credit(to, amount),\n    audit.log({ from, to, amount }),\n  ]);\n  // If any leg rejects, the transfer must not be considered applied.\n  return { debit, credit, audit };\n}"
    }
  },
  {
    id: "javascript-promise-race-vs-any",
    title: "Promise.race versus Promise.any",
    prompt: "The first promise to settle rejects, and a later one fulfils. How do race and any differ?",
    level: "senior",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "race",
      "any",
      "async"
    ],
    codeSnippet: "const fast = Promise.reject(new Error(\"fast failure\"));\nconst slow = new Promise((r) => setTimeout(() => r(\"ok\"), 100));\n\nawait Promise.race([fast, slow]); // ?\nawait Promise.any([fast, slow]);  // ?",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Both reject with the fast failure, since the first settlement decides the outcome for either method",
        isCorrect: false,
        explanation: "Tempting if you model `any` as another first-settlement method, but `any` only rejects when every input rejects; here `slow` fulfils, so it resolves with \"ok\"."
      },
      {
        id: "B",
        text: "Both fulfil with \"ok\", because a fulfilment from any input overrides an earlier rejection",
        isCorrect: false,
        explanation: "Tempting if you expect both methods to be success-seeking, but `race` adopts the first settlement regardless of its type; a rejection settles it immediately and the later fulfilment is ignored."
      },
      {
        id: "C",
        text: "race fulfils with \"ok\"; any rejects with an AggregateError containing the fast failure",
        isCorrect: false,
        explanation: "This inverts both contracts: `race` does not skip rejections, and `any` does not reject when at least one input fulfils."
      },
      {
        id: "D",
        text: "race rejects with the fast failure; any discards the rejection and fulfils with \"ok\"",
        isCorrect: true,
        explanation: "Correct. `race` adopts the first settlement verbatim (here a rejection); `any` waits for the first fulfilment and discards intervening rejections."
      }
    ],
    correctAnswer: "D",
    explanation: "`Promise.race` settles the moment any input settles, adopting that outcome verbatim \u2014 a rejection or a fulfilment. Here `fast` rejects in the microtask queue before `slow`'s 100 ms timer fires, so `race` rejects with that `Error`. `Promise.any` has a different contract: it fulfils on the first fulfilment and discards every rejection it sees along the way. Because `slow` eventually fulfils with `\"ok\"`, `any` resolves to that value.\n\nIn practice this means `race` is the tool for timeouts \u2014 you create a timer that rejects and race it against the real request, so the rejection wins if the request is too slow. `any` is the tool for redundant sources: you fire the same query at several mirrors and take whichever answer arrives first, even if two of them error.\n\nThe edge case an interviewer will probe: if every input to `any` rejects, it rejects with an `AggregateError` whose `errors` array holds all the reasons in input order. `race` has no such aggregation \u2014 it simply adopts the first settlement, whatever it is. Also note that `any` with an empty iterable rejects with an `AggregateError` containing zero elements, whereas `race` with an empty iterable never settles.",
    interviewLine: "`race` settles on the first settlement of any kind, which is why I reach for it on timeouts \u2014 the timer's rejection wins if the request is slow. `any` settles only on the first fulfilment and discards rejections, so I use it when querying redundant sources and want whichever answer arrives first.",
    misconception: "Assuming `any` is just `race` with rejections filtered from the result, when in fact a rejection is not a settlement event for `any` at all \u2014 it simply does not count toward the outcome.",
    hints: [
      "Which of the two methods treats a rejection as a terminal settlement event?",
      "Ask yourself whether the method's contract says \"first to settle\" or \"first to fulfil\".",
      "If `any` does reject, what must be true about every input, and what does the rejection object carry?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "Notice that the timer's rejection is the intended settlement; `race` is the right tool here because we want that rejection to win if the fetch is slow.",
      language: "javascript",
      code: "function withTimeout(promise, ms) {\n  const timer = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error(\"timed out\")), ms)\n  );\n  return Promise.race([promise, timer]);\n}\n\nconst data = await withTimeout(fetch(\"/api/users\"), 3000);"
    }
  },
  {
    id: "javascript-promise-resolve-semantics",
    title: "What Promise.resolve actually does",
    prompt: "Which statement about Promise.resolve is correct?",
    level: "intermediate",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "promise-resolve",
      "thenable"
    ],
    codeSnippet: "const p = Promise.resolve(42);\nPromise.resolve(p) === p;           // true, passed through\n\nconst thenable = { then: (res) => res(\"hi\") };\nawait Promise.resolve(thenable);   // \"hi\": adopted",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "It is syntactically equivalent to `new Promise(res => res(value))` and behaves identically in every case",
        isCorrect: false,
        explanation: "Tempting if you read `Promise.resolve` as sugar over the constructor form, but `new Promise(res => res(p))` always allocates a new promise and never returns the argument by identity, so the two differ the moment the input is already a native promise."
      },
      {
        id: "B",
        text: "It always creates a new promise object, wrapping whatever argument is passed, including other promises",
        isCorrect: false,
        explanation: "Sounds right if you picture a wrapper, but the spec's first check is whether the argument is already a native promise, and when that passes the function returns the same reference with no allocation at all."
      },
      {
        id: "C",
        text: "It returns the argument unchanged if it is already a promise, adopts a thenable, and otherwise wraps the value",
        isCorrect: true,
        explanation: "Correct. The three-branch logic is what makes it the safe normaliser: identity pass-through for native promises, thenable adoption for interop, and a fulfilled wrapper for plain values."
      },
      {
        id: "D",
        text: "Because the resulting promise is already settled, any `.then` callback fires synchronously in the same tick",
        isCorrect: false,
        explanation: "Tempting because \"already resolved\" sounds like \"immediately available\", but a settled promise still queues its callbacks as microtasks; the value is not readable until the current synchronous execution finishes and the microtask queue drains."
      }
    ],
    correctAnswer: "C",
    explanation: "Promise.resolve is a three-branch normaliser. If the argument is a native promise it returns that exact object, so `Promise.resolve(p) === p`. If the argument is a thenable, any object with a callable `then` property, it creates a new promise and calls that `then` to track the thenable's eventual state. Otherwise it wraps the plain value in an already-fulfilled promise.\n\nThis is why `Promise.resolve` is the idiomatic way to accept a parameter typed as `T | Promise<T>`: the caller passes a bare value or a promise and the callee gets a promise either way, with no extra allocation on the common path. It also makes `Promise.resolve().then(fn)` the standard microtask-queue idiom, since the empty promise is already fulfilled but `fn` still defers to the microtask queue.\nThe nuance an interviewer probes: `new Promise(res => res(value))` always allocates and never passes a native promise through by identity, so it is not a drop-in replacement. The thenable branch also means a non-promise object with a `then` method will be adopted, which is the interop path with Bluebird or older Q promises.",
    interviewLine: "I use `Promise.resolve` to normalise a `T | Promise<T>` parameter because it passes native promises through by identity, adopts thenables for interop, and wraps plain values, without ever forcing an extra allocation on the common path.",
    misconception: "Treating an already-fulfilled promise as if its `.then` callback runs in the same synchronous turn; settled and synchronous are different things, and the microtask queue always gets a turn before the next macrotask.",
    hints: [
      "Check what `Promise.resolve` returns when the argument is already a native promise \u2014 is it the same reference?",
      "Now think about what happens with an object that merely has a `then` method but is not a `Promise` instance.",
      "Rule out the \"synchronous\" reading: a fulfilled promise still defers `.then` callbacks to the microtask queue."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "The identity check is the practical difference: `Promise.resolve` preserves the reference while the `new Promise` form always allocates.",
      language: "javascript",
      code: "function settle(value) {\n  const p = Promise.resolve(value);\n  p.then((v) => console.log(\"done:\", v));\n  return p;\n}\n\nconst native = Promise.resolve(99);\nconsole.log(settle(native) === native); // true \u2014 identity preserved\n\nconst wrapped = new Promise((res) => res(native));\nconsole.log(wrapped === native);        // false \u2014 new allocation"
    }
  },
  {
    id: "javascript-sequential-await-serialises-work",
    title: "Why three awaits in a row are slower than one Promise.all",
    prompt: "The three requests are independent. What does this code cost, and why?",
    level: "intermediate",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "async-await",
      "promise-all",
      "performance"
    ],
    codeSnippet: "// each request takes ~100ms\nconst a = await getA();\nconst b = await getB();\nconst c = await getC();\n// vs\nconst [x, y, z] = await Promise.all([getA(), getB(), getC()]);",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Both take about 300 ms; Promise.all only tidies the syntax and adds no concurrency",
        isCorrect: false,
        explanation: "Tempting if you picture Promise.all as a convenience wrapper that still calls the functions one by one, but it receives an array of already-started promises, so all three requests are in flight from the moment the array is built."
      },
      {
        id: "B",
        text: "Both take about 100 ms; await is non-blocking, so the three requests already overlap",
        isCorrect: false,
        explanation: "await does not block the event loop, but it does suspend the current function, so getB() is never called until getA() settles. Non-blocking means the thread is free for other tasks; it does not mean the next line runs before the current promise resolves."
      },
      {
        id: "C",
        text: "The first takes about 300 ms because each request starts only after the previous resolves; the second takes about 100 ms",
        isCorrect: true,
        explanation: "Correct. Sequential await makes each call wait for the previous one to settle before it is even invoked, turning three independent 100 ms requests into a 300 ms waterfall. Promise.all receives already-started promises, so all three are in flight and the total is bounded by the slowest."
      },
      {
        id: "D",
        text: "The first is faster because it avoids the combinator overhead of Promise.all",
        isCorrect: false,
        explanation: "The bookkeeping cost of Promise.all is a few microseconds of promise wiring, negligible against three network round-trips. The real cost in the sequential version is 200 ms of idle waiting while the thread sits between resolves."
      }
    ],
    correctAnswer: "C",
    explanation: "await suspends the current async function until the promise it wraps settles. In the sequential snippet that means getB() is not even called until getA() resolves, and getC() waits for getB(). Three independent 100 ms requests become a 300 ms waterfall. In the Promise.all snippet the array literal calls getA(), getB(), and getC() before any await, so all three requests are in flight at the same time and the total is bounded by the slowest one, roughly 100 ms.\n\nIn a real dashboard that fetches a user, their orders, and their notifications, the sequential version delivers the first payload at 100 ms, the second at 200 ms, and the third at 300 ms. The parallel version delivers all three at about 100 ms, cutting perceived load time by two-thirds.\n\nThe distinction only matters when the calls are genuinely independent. If getB needs a.id, the waterfall is the correct shape and you cannot start getB before getA resolves. Also note that Promise.all rejects as soon as any one promise rejects; if you need every result even on partial failure, reach for Promise.allSettled instead.",
    interviewLine: "I'd note that await doesn't block the thread, but it does suspend the current function, so the next call simply isn't made until the previous promise settles. For independent requests that turns a 100 ms parallel fetch into a 300 ms waterfall, and my fix is to invoke all three before awaiting any of them.",
    misconception: "Believing that because await is non-blocking with respect to the event loop, sequential awaits are already concurrent. Non-blocking means the thread can service other tasks; it does not mean the next line of the current function runs before the awaited promise settles.",
    hints: [
      "In the first snippet, is getB() called before getA() resolves, or after?",
      "await suspends the current function, not the thread. What does that mean for the line that calls the next request?",
      "Promise.all receives promises that are already in flight; the sequential version does not."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "In the first function none of the three calls begin until the previous one resolves; in the second, all three are in flight before the single await.",
      language: "javascript",
      code: "async function loadSettings(userId) {\n  // ~600 ms total: each call waits for the previous\n  const profile = await fetchProfile(userId);\n  const prefs   = await fetchPreferences(userId);\n  const badges  = await fetchBadges(userId);\n  return { profile, prefs, badges };\n}\n\nasync function loadSettingsFast(userId) {\n  // ~200 ms total: all three start together\n  const [profile, prefs, badges] = await Promise.all([\n    fetchProfile(userId),\n    fetchPreferences(userId),\n    fetchBadges(userId),\n  ]);\n  return { profile, prefs, badges };\n}"
    }
  },
  {
    id: "javascript-promise-all-unhandled-rejection",
    title: "Why Promise.all can leave an unhandled rejection behind",
    prompt: "Two of the inputs reject. The catch reports the first. What about the second?",
    level: "senior",
    type: "concept",
    category: "javascript",
    subject: "async-await",
    tags: [
      "javascript",
      "promises",
      "error-handling",
      "unhandled-rejection"
    ],
    codeSnippet: "try {\n  await Promise.all([failFast(), failLater(), ok()]);\n} catch (e) {\n  report(e); // only the first rejection\n}",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "Promise.all attaches a handler to every input, so the second rejection is observed and silently discarded",
        isCorrect: true,
        explanation: "Correct. all calls a then-style handler on each input at call time, so the rejection is handled in the engine's sense; the aggregate is already settled, so the value is dropped with no event and no second catch entry."
      },
      {
        id: "B",
        text: "It always fires an unhandledrejection event because no user code ever catches it",
        isCorrect: false,
        explanation: "Tempting if you equate \"not reported to my catch\" with \"unhandled,\" but the engine's criterion is whether a handler was attached, not whether your code saw the value. Promise.all attached one, so the rejection is handled."
      },
      {
        id: "C",
        text: "Promise.all cancels the remaining inputs, so the second rejection never occurs",
        isCorrect: false,
        explanation: "Tempting if you think of abort controllers or generator cleanup, but Promise.all has no cancellation mechanism. failLater still runs to completion and rejects; the rejection is simply absorbed by the already-settled aggregate."
      },
      {
        id: "D",
        text: "It is delivered to the same catch block a moment later, on the next microtask",
        isCorrect: false,
        explanation: "Tempting if you model the catch as a queue, but a try/catch around an await fires exactly once, on the first rejection. The second rejection's handler runs but has no delivery path back into your code."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.all iterates its inputs and attaches a rejection handler to each one the moment the array is passed in. When failFast rejects, the aggregate settles immediately. When failLater rejects a tick later, its handler still fires \u2014 the rejection is observed in the engine's tracking sense \u2014 but the aggregate is already settled, so the value is discarded. No unhandledrejection event fires.\n\nIn production this means your error tracker, your unhandledrejection listener, and your catch block all see exactly one failure. The second one is gone. You cannot distinguish \"one input failed\" from \"two inputs failed\" from inside the catch. If you need every reason, use Promise.allSettled and iterate the results array for status: 'rejected' entries.\n\nThe genuine unhandled-rejection hazard is the inverse shape: a promise that rejects before any handler is attached, such as const p = failLater(); sitting unawaited across a setTimeout. There, no handler exists at all, so the engine has no choice but to fire unhandledrejection.",
    interviewLine: "Promise.all attaches rejection handlers to every input at call time, so a second rejection after the aggregate settles is handled but discarded \u2014 no unhandledrejection, no second catch entry. If I need every failure, I switch to allSettled and inspect each reason.",
    misconception: "If the error never reached my catch block, it must have fired unhandledrejection. In the engine's model, \"handled\" means a handler was attached, not that your code actually received the value.",
    hints: [
      "Did anything subscribe to the second promise before it rejected?",
      "What does the engine's rejection-tracking algorithm consider \"handled,\" versus what your catch block actually receives?",
      "A settled promise cannot settle again, so the second rejection has a handler but no destination."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    example: {
      caption: "allSettled is the escape hatch: every rejection lands in the results array instead of being silently dropped.",
      language: "javascript",
      code: "const results = await Promise.allSettled([failFast(), failLater(), ok()]);\n\nfor (const r of results) {\n  if (r.status === 'rejected') {\n    report(r.reason);\n  }\n}\n// Both failures are now visible; ok() is in the array too."
    }
  }
];
