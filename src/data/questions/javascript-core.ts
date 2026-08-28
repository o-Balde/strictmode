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
        text: "To use Redux Thunk, you need to import it as middleware.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "To use Redux Thunk, you need to import it as middleware. Action creators should return not just an object but a function that takes dispatch as a parameter. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to handle asynchronous actions in Redux Thunk?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to handle asynchronous actions in Redux Thunk?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "StrictMode is a tool added in version 16.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "StrictMode is a tool added in version 16.3 of React to highlight potential problems in an application. It performs additional checks on the application. To enable StrictMode, <React.StrictMode> tags need to be added inside the application: StrictMode currently helps with the following issues: Identifying components with unsafe lifecycle methods: Certain lifecycle methods are unsafe to use in asynchronous react applications. With the use of third-party libraries, it becomes difficult to ensure that certain lifecycle methods are not used. StrictMode helps in providing us with a warning if any of the class components use an unsafe lifecycle method. Warning about the usage of legacy string API: If one is using an older version of React, callback ref is the recommended way to manage refs instead of using the string refs. StrictMode gives a warning if we are using string refs to manage refs. Warning about the usage of findDOMNode: Previously, findDOMNode( ) method was used to search the tree of a DOM node. This method is deprecated in React. Hence, the StrictMode gives us a warning about the usage of this method. Warning about the usage of legacy context API (because the API is error-prone).",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Strict Mode in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Strict Mode in React.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
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
        text: "Error boundaries catch JavaScript errors in their child components, log them, and display fallback UI instead of crashing the application.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Error boundaries catch JavaScript errors in their child components, log them, and display fallback UI instead of crashing the application. They utilize componentDidCatch and static getDerivedStateFromError methods but do not catch errors in event handlers or asynchronous code. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are error boundaries in React for?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are error boundaries in React for?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
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
        text: "Synthetic events in React are a wrapper around native DOM events that ensure consistent behavior across browsers.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Synthetic events in React are a wrapper around native DOM events that ensure consistent behavior across browsers. They normalize the way events are handled, providing a unified API for React applications. These events are wrapped in the SyntheticEvent object and expose the usual methods like preventDefault() and stopPropagation(). Since React 17, the root event listener is attached to the React root container (not document), which makes nested React trees work correctly together. Example: Older sources mention event pooling, where React reused the event object after the handler ran, which made the event unusable in async code. Event pooling was removed in React 17, so you can read or pass the event object asynchronously without calling event.persist().",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Discuss synthetic events in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Discuss synthetic events in React.",
    hints: [
      "React wraps native events in a synthetic event with one consistent API, delegated from the root."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/common#react-event-object"
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
        text: "To test asynchronous code in React components, you can use async/await with waitFor from React Testing Library to handle asynchronous operations like data fetching or API calls.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "To test asynchronous code in React components, you can use async/await with waitFor from React Testing Library to handle asynchronous operations like data fetching or API calls. Example: In this example, the test waits for the data to be loaded before asserting that the text 'Data loaded' is present.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test asynchronous code in React components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test asynchronous code in React components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "By convention, an Action is an async function passed to a React API that runs it inside a transition: useActionState, startTransition (from useTransition), or a <form action={.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "By convention, an Action is an async function passed to a React API that runs it inside a transition: useActionState, startTransition (from useTransition), or a <form action={.}> prop. React tracks pending state, surfaces errors, and applies updates inside a transition so the UI stays responsive. This removes the usual boilerplate of toggling a loading flag, wrapping in try/catch, and managing error and data state separately.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Actions in React 19?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Actions in React 19?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Styled-components lets you write component-scoped CSS inside JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Styled-components lets you write component-scoped CSS inside JavaScript. Install:npm i styled-components Example: import styled from 'styled-components';const Button = styled.div width: 100px; cursor: pointer; text-decoration: none;export default Button;",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Styled Components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Styled Components in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Axios is a popular library for making HTTP requests and handling CRUD operations.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Axios is a popular library for making HTTP requests and handling CRUD operations. It supports Promises and works well in React for API calls. Install with:npm i axios",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Axios, and How to Use it in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Axios, and How to Use it in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "useState: local state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "useState: local state. useEffect: side effects and cleanup. useRef: mutable refs that persist across renders for DOM nodes or mutable variables. useMemo: memoize expensive calculations. useCallback: memoize function references to avoid unnecessary child re-renders. Practical tips: Keep effect dependencies explicit and minimal to avoid stale closures. Prefer useRef for mutable values you need to persist without triggering renders.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Hooks: Common Ones and How to Use Them Correctly.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Hooks: Common Ones and How to Use Them Correctly.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
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
        text: "Hooks remove instance allocation and binding overhead present in classes and enable flatter component composition.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks remove instance allocation and binding overhead present in classes and enable flatter component composition. But closures create different performance considerations.Performance notes: Hooks let you avoid wrapper components like some HOCs, reducing tree depth. Beware creating new functions/objects inline; they break referential equality and trigger child updates unless memoized. Profile with React DevTools profiler and Chrome to identify hotspots. Optimization tactics: Use React.memo, useCallback, and useMemo judiciously. Prefer immutable updates to make shallow comparisons effective.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Hooks vs Classes Performance, Tradeoffs and Common Pitfalls.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Hooks vs Classes Performance, Tradeoffs and Common Pitfalls.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
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
        text: "Syntax: hooks use functions; classes use class syntax and this.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Syntax: hooks use functions; classes use class syntax and this. State setup: useState and useReducer vs this.state and setState. Lifecycle: useEffect vs lifecycle methods. Reuse: custom hooks replace many HOC and render-prop patterns. Instances: functions avoid instance creation but can introduce closure traps.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Hooks Compared to Classes, Practical Differences.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Hooks Compared to Classes, Practical Differences.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-does-hirevue-detect-ai-cheating-what-gets-flagged-2026",
    title: "Does HireVue Detect AI Cheating? What Gets Flagged (2026)",
    prompt: "Does HireVue Detect AI Cheating? What Gets Flagged (2026)",
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
        text: "HireVue's async video interviews don't record your screen.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "HireVue's async video interviews don't record your screen. The real signals are response-similarity scoring and browser tab logging. Here's exactly what, June 18, 202617 min AI Interview Tools With Real Proof They Work (2026) Most AI interview tools claim they're undetectable and get you hired. Only one shows face-shown video of real interviews and verified offer letters. June 12, 202621 min",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does HireVue Detect AI Cheating? What Gets Flagged (2026).",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does HireVue Detect AI Cheating? What Gets Flagged (2026).",
    hints: [
      "await does not block the thread, but it does block the next line."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
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
        text: "There are two approaches This is a recently added approach.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "There are two approaches This is a recently added approach. Refs are created using React.createRef() method and attached to React elements via the ref attribute. In order to use refs throughout the component, just assign the ref to the instance property within constructor. You can also use ref callbacks approach regardless of React version. For example, the search bar component's input element accessed as follows, You can also use refs in function components using closures. Note: You can also use inline ref callbacks even though it is not a recommended approach: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create refs?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "The better approach is to use Array.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The better approach is to use Array.prototype.filter() method. For example, let's create a removeItem() method for updating the state.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the recommended approach of removing an array element in React state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the recommended approach of removing an array element in React state?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
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
        text: "If you want to use async/await in React, you will need Babel and transform-async-to-generator plugin.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "If you want to use async/await in React, you will need Babel and transform-async-to-generator plugin. React Native ships with Babel and a set of transforms.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it possible to use async/await in plain React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it possible to use async/await in plain React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "There are couple of advantages compared to Jasmine: Automatically finds tests to execute in your source code.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "There are couple of advantages compared to Jasmine: Automatically finds tests to execute in your source code. Automatically mocks dependencies when running your tests. Allows you to test asynchronous code synchronously. Runs your tests with a fake DOM implementation (via jsdom) so that your tests can be run on the command line. Runs tests in parallel processes so that they finish sooner., Give a simple example of Jest test case Let's write a test for a function that adds two numbers in sum.js file: Create a file named sum.test.js which contains actual test: And then add the following section to your package.json: Finally, run yarn test or npm test and Jest will print a result: React Redux: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of Jest over Jasmine?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of Jest over Jasmine?.",
    hints: [
      "Test what the user does, not how the component stores it. Query by role, assert on output."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://testing-library.com/docs/queries/about/#priority"
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
        text: "You can use redux-thunk middleware which allows you to define async actions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use redux-thunk middleware which allows you to define async actions. Let's take an example of fetching specific account as an AJAX call using fetch API:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to make AJAX request in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to make AJAX request in Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "redux-saga is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "redux-saga is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better. It is available in NPM:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is redux-saga?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is redux-saga?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Both call() and put() are effect creator functions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Both call() and put() are effect creator functions. call() function is used to create effect description, which instructs middleware to call the promise. put() function creates an effect, which instructs middleware to dispatch an action to the store. Let's take example of how these effects work for fetching particular user data.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between call() and put() in redux-saga?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between call() and put() in redux-saga?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Both Redux Thunk and Redux Saga take care of dealing with side effects.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Both Redux Thunk and Redux Saga take care of dealing with side effects. In most of the scenarios, Thunk uses Promises to deal with them, whereas Saga uses Generators. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between redux-saga and redux-thunk?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between redux-saga and redux-thunk?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Some of the main features of Redux Form are: Field values persistence via Redux store.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Some of the main features of Redux Form are: Field values persistence via Redux store. Validation (sync/async) and submission. Formatting, parsing and normalization of field values.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main features of Redux Form?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main features of Redux Form?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Some of the popular middleware choices for handling asynchronous calls in Redux eco system are Redux Thunk, Redux Promise, Redux Saga.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Some of the popular middleware choices for handling asynchronous calls in Redux eco system are Redux Thunk, Redux Promise, Redux Saga.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are typical middleware choices for handling asynchronous calls in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are typical middleware choices for handling asynchronous calls in Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        explanation: "That would require message to be re-evaluated when log() runs. A const string is computed once."
      },
      {
        id: "B",
        text: "Count is 1",
        isCorrect: false,
        explanation: "count did reach 2, but message never re-reads it at all."
      },
      {
        id: "C",
        text: "undefined",
        isCorrect: false,
        explanation: "message is assigned before either inner function is ever called, so it is a real string."
      },
      {
        id: "D",
        text: "Count is 0",
        isCorrect: true,
        explanation: "Correct. The template literal was evaluated once, at assignment. message holds the finished string and never re-runs."
      }
    ],
    correctAnswer: "D",
    explanation: "Both inner functions close over the same lexical environment, so they genuinely share count, increment() really does take it from 0 to 2. But message is a const string whose template literal was evaluated once, at the moment of assignment, when count was still 0. Closing over a variable does not make the expression that produced its value re-run. To see the current count, log would have to read count itself and build the string at call time.",
    interviewLine: "Closures capture variables, not expressions. If the variable holds a primitive computed once, you're looking at a snapshot forever.",
    misconception: "Believing a closure re-evaluates the expression it closed over. It closes over the binding, and that binding already holds a finished value.",
    hints: [
      "When exactly does the template literal run, at assignment or at call?"
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures"
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
        explanation: "innerNormal is called with no receiver, so it does not inherit greet's this."
      },
      {
        id: "B",
        text: "Hello, Alex!\nNormal: undefined\nArrow: Alex",
        isCorrect: true,
        explanation: "Correct. Method call binds this to user; a bare function call has no receiver; the arrow captures greet's this lexically."
      },
      {
        id: "C",
        text: "Hello, Alex!\nNormal: undefined\nArrow: undefined",
        isCorrect: false,
        explanation: "The arrow function has no this of its own, it uses greet's, which is user."
      },
      {
        id: "D",
        text: "Hello, undefined!\nNormal: undefined\nArrow: undefined",
        isCorrect: false,
        explanation: "greet is invoked as user.greet(), so its this is user."
      }
    ],
    correctAnswer: "B",
    explanation: "Regular functions resolve this at call time from how they were called. user.greet() has a receiver, so this is user. innerNormal() is called bare, no receiver, so this is undefined in strict mode (modules are always strict), and reading .name off it throws or yields undefined depending on the surrounding mode. Arrow functions have no this binding at all; innerArrow closes over greet's this lexically, so it still sees user.",
    interviewLine: "Regular functions bind this at call time; arrows capture it at definition time. Losing a receiver loses the binding.",
    misconception: "Expecting a nested regular function to inherit the enclosing method's this. It does not, only arrows do.",
    hints: [
      "Look at how each function is *called*, not where it is written."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
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
        explanation: "Correct. The write to coins creates an own property on child; the push mutates the single shared array reached through the prototype chain."
      },
      {
        id: "B",
        text: "100\n[\"gold\", \"land\"]\n100\n[\"gold\", \"land\"]",
        isCorrect: false,
        explanation: "child.coins += 50 does write 150 onto child."
      },
      {
        id: "C",
        text: "150\n[\"gold\", \"land\", \"debts\"]\n150\n[\"gold\", \"land\", \"debts\"]",
        isCorrect: false,
        explanation: "grandparent.coins is never written to, the assignment lands on child."
      },
      {
        id: "D",
        text: "100\n[\"gold\", \"land\"]\n150\n[\"gold\", \"land\", \"debts\"]",
        isCorrect: false,
        explanation: "child.heritage is not a copy; it is the same array object, so the push is visible from grandparent too."
      }
    ],
    correctAnswer: "A",
    explanation: "Reads walk the prototype chain; writes always land on the object that received the assignment. child.coins += 50 reads 100 from grandparent, adds 50, then writes 150 as a new own property on child, grandparent keeps 100. child.heritage.push('debts') never assigns to heritage at all: it reads the array reference from grandparent and mutates that one shared array, so every object in the chain sees the new element. To get an independent array you must assign a copy: child.heritage = [.child.heritage, 'debts'].",
    interviewLine: "Reads go up the prototype chain; writes stop at the object you wrote to. Mutating a value you read is not a write.",
    misconception: "Assuming reading a property through the prototype chain gives you your own copy of it. You get the same reference.",
    hints: [
      "Which of these two lines actually performs an assignment?"
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
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
        explanation: "console.log(\"7\") is synchronous, so it runs before any microtask."
      },
      {
        id: "B",
        text: "1 4 7 5 2 3 6",
        isCorrect: true,
        explanation: "Correct. Synchronous code first, then the microtask queue drains completely, then macrotasks in the order they were scheduled."
      },
      {
        id: "C",
        text: "1 4 7 2 3 5 6",
        isCorrect: false,
        explanation: "The .then callback is a microtask and runs before any setTimeout, which is a macrotask."
      },
      {
        id: "D",
        text: "1 2 3 4 5 6 7",
        isCorrect: false,
        explanation: "Nothing asynchronous can run before the synchronous script finishes."
      }
    ],
    correctAnswer: "B",
    explanation: "The synchronous pass prints 1, then 4 (the Promise executor runs immediately), then 7. Only when the stack empties does the microtask queue drain: the .then prints 5 and schedules another setTimeout. Then macrotasks run in scheduling order, the first timer prints 2 and queues a microtask, which drains before the next macrotask, giving 3. Finally the timer scheduled from inside the microtask prints 6.",
    interviewLine: "The whole microtask queue drains between every pair of macrotasks, not one microtask, all of them.",
    misconception: "Treating setTimeout(fn, 0) as 'run next'. It is a macrotask and always yields to every pending microtask.",
    hints: [
      "A Promise executor body is synchronous; only .then callbacks are deferred."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
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
        explanation: "Correct. An async function body runs synchronously up to the first await; the continuation is queued as a microtask ahead of the later .then."
      },
      {
        id: "B",
        text: "1 2 3 6 4 5",
        isCorrect: false,
        explanation: "Code after await never runs synchronously, it always resumes in a microtask."
      },
      {
        id: "C",
        text: "1 6 2 3 4 5",
        isCorrect: false,
        explanation: "Calling an async function runs its body immediately until the first await, so 2 prints before 6."
      },
      {
        id: "D",
        text: "1 2 6 4 3 5",
        isCorrect: false,
        explanation: "The await continuation was queued before the first .then callback, so 3 comes first."
      }
    ],
    correctAnswer: "A",
    explanation: "Calling asyncFunc() runs its body synchronously until the first await, so 1 and 2 print in order. The await on an already-resolved promise queues the continuation as a microtask, and it is queued before the .then chain is registered on the following line. Then 6 prints, ending the synchronous pass. The microtask queue drains in order: 3 (the await continuation), then 4, and only once that handler returns is the second .then queued, giving 5.",
    interviewLine: "await is a microtask boundary, the body runs synchronously up to it, and everything after resumes in queue order.",
    misconception: "Assuming a .then registered earlier in the source always runs before an await continuation. What matters is the order the callbacks were queued.",
    hints: [
      "Which continuation reaches the microtask queue first?"
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
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
        explanation: "Correct. Promise.all is fail-fast: one rejection settles the whole thing, and the successful values are unreachable."
      },
      {
        id: "B",
        text: "The array comes back with undefined in the failed position",
        isCorrect: false,
        explanation: "There is no partial array, the aggregate promise rejects instead of fulfilling."
      },
      {
        id: "C",
        text: "The other two requests are cancelled",
        isCorrect: false,
        explanation: "They keep running to completion. Promises have no cancellation."
      },
      {
        id: "D",
        text: "It waits for all three, then rejects with an array of errors",
        isCorrect: false,
        explanation: "That is closer to Promise.any's AggregateError. all rejects with the first error, as soon as it happens."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.all fulfils with an array of values only if every input fulfils; the first rejection rejects the aggregate immediately with that reason. Two consequences catch people out. The successful results are simply gone, there is no way to reach them from the rejected promise. And the other operations are not cancelled: they run to completion in the background, so any side effects still happen and a later rejection among them can surface as an unhandled rejection.",
    interviewLine: "all is fail-fast and all-or-nothing. It doesn't cancel the others, it just stops caring about them.",
    misconception: "Expecting a partial array on failure. You get a rejection, not partial results.",
    hints: [
      "Is there any way to reach the two successful values afterwards?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        explanation: "Correct. Every entry is a descriptor, and you branch on status."
      },
      {
        id: "B",
        text: "[1], rejected entries are omitted",
        isCorrect: false,
        explanation: "Nothing is omitted; the array always has one entry per input, in order."
      },
      {
        id: "C",
        text: "[1, Error]",
        isCorrect: false,
        explanation: "The values are wrapped in descriptor objects rather than returned bare."
      },
      {
        id: "D",
        text: "It rejects with the error, like Promise.all",
        isCorrect: false,
        explanation: "allSettled never rejects because an input rejected."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.allSettled waits for every input to settle and always fulfils, with one descriptor per input in the original order. A fulfilled entry carries status: 'fulfilled' and value; a rejected entry carries status: 'rejected' and reason. Because it never rejects, it also means none of the inputs produce an unhandled rejection. That makes it the right tool when partial success is acceptable, fanning out to several independent services, or a batch where you want to report which items failed.",
    interviewLine: "allSettled always fulfils and hands you a descriptor per input. Use it when partial success is a real outcome, not a failure.",
    misconception: "Expecting bare values. Every entry is wrapped, so you must branch on status before reading value.",
    hints: [
      "How would you tell success from failure if the values came back bare?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        explanation: "Correct. The results are independent, so partial success is a legitimate outcome worth rendering."
      },
      {
        id: "B",
        text: "Promise.race, to return as soon as the fastest widget resolves",
        isCorrect: false,
        explanation: "race gives you one result and discards the rest, wrong shape for rendering three widgets."
      },
      {
        id: "C",
        text: "Promise.all, because it is faster when everything succeeds",
        isCorrect: false,
        explanation: "Both await the same concurrent work. all is not faster; it just gives up earlier."
      },
      {
        id: "D",
        text: "Promise.all, so the whole dashboard fails atomically",
        isCorrect: false,
        explanation: "Atomic failure is right when the results are interdependent. Independent widgets are the opposite case."
      }
    ],
    correctAnswer: "A",
    explanation: "The choice follows from whether the results are interdependent. If you need all three to proceed, say three parts of a single transaction, Promise.all is right, because a partial result is meaningless and failing fast is the honest outcome. If the results are independent, as with dashboard widgets, all throws away two perfectly good responses because a third failed. allSettled preserves them and lets each widget render its own error state. The performance is identical either way; both start all the work concurrently.",
    interviewLine: "all when a partial result is meaningless; allSettled when it isn't. It's a question about your data, not about speed.",
    misconception: "Reaching for Promise.all reflexively and turning one flaky dependency into a blank page.",
    hints: [
      "Is a dashboard with two of three widgets loaded a useful screen, or a failure?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        text: "Both reject with the fast failure",
        isCorrect: false,
        explanation: "any only rejects if every input rejects."
      },
      {
        id: "B",
        text: "Both fulfil with \"ok\"",
        isCorrect: false,
        explanation: "race does not skip rejections, the first settlement wins whatever it is."
      },
      {
        id: "C",
        text: "race fulfils with \"ok\"; any rejects with an AggregateError",
        isCorrect: false,
        explanation: "This inverts both behaviours."
      },
      {
        id: "D",
        text: "race rejects with the fast failure; any ignores it and fulfils with \"ok\"",
        isCorrect: true,
        explanation: "Correct. race settles on the first to settle either way; any waits for the first to fulfil."
      }
    ],
    correctAnswer: "D",
    explanation: "race settles as soon as any input settles, adopting that outcome whether it fulfilled or rejected, which is what makes it right for timeouts, where you deliberately want the timer's rejection to win. any is success-seeking: it ignores rejections and fulfils with the first value to arrive, rejecting only if every input rejects, and then with an AggregateError carrying all the reasons. Reach for race to bound how long you wait, and for any to take whichever redundant source answers first.",
    interviewLine: "race takes the first settlement; any takes the first success. That's why race is the timeout tool and any is the redundancy tool.",
    misconception: "Expecting race to skip a rejection and wait for a value. It adopts whatever settles first.",
    hints: [
      "Which of the two can reject before every input has settled?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        text: "It is identical to new Promise(res => res(value)) in every case",
        isCorrect: false,
        explanation: "That form always allocates and does not pass an existing promise through."
      },
      {
        id: "B",
        text: "It always allocates a new promise wrapping its argument",
        isCorrect: false,
        explanation: "Given a native promise it returns that same promise unchanged."
      },
      {
        id: "C",
        text: "It returns the argument unchanged if it is already a promise, adopts a thenable, and otherwise wraps the value",
        isCorrect: true,
        explanation: "Correct, which is what makes it the safe way to normalise a value of unknown promise-ness."
      },
      {
        id: "D",
        text: "It resolves the promise synchronously, so the value is available immediately",
        isCorrect: false,
        explanation: "The promise is already settled, but its callbacks still run in a microtask."
      }
    ],
    correctAnswer: "C",
    explanation: "Promise.resolve normalises. Hand it a native promise and you get that exact promise back, no wrapping, no extra tick. Hand it a thenable, any object with a then method, and it adopts its eventual state, which is how interop with older promise libraries works. Hand it a plain value and you get an already-fulfilled promise. That is why it is the idiomatic way to accept 'a value or a promise of one', and why Promise.resolve().then(fn) is a common way to queue a microtask. Being settled does not make it synchronous, the callback still waits for the microtask queue.",
    interviewLine: "Promise.resolve normalises rather than wraps, same promise back if it already was one, adopted if it's a thenable.",
    misconception: "Assuming an already-resolved promise runs its .then synchronously. Settled still means a microtask.",
    hints: [
      "What does it return when the argument is already a native promise?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        text: "Both take about 300ms; Promise.all only tidies the syntax",
        isCorrect: false,
        explanation: "Promise.all starts all three immediately, so they overlap."
      },
      {
        id: "B",
        text: "Both take about 100ms; await does not block other work",
        isCorrect: false,
        explanation: "await does not block the thread, but it does delay the next line, getB is not even started until getA resolves."
      },
      {
        id: "C",
        text: "The first takes about 300ms because each request starts only after the previous resolves; the second takes about 100ms",
        isCorrect: true,
        explanation: "Correct. Sequential awaits serialise independent work into a waterfall."
      },
      {
        id: "D",
        text: "The first is faster because it avoids the overhead of Promise.all",
        isCorrect: false,
        explanation: "The combinator overhead is negligible against three network round-trips."
      }
    ],
    correctAnswer: "C",
    explanation: "await suspends the function until its promise settles, so the next line, including the call that starts the next request, does not run until then. Three independent requests become a 300ms waterfall. Promise.all takes an array whose elements are already-started promises, so all three are in flight before anything is awaited and the total is roughly the slowest one. The distinction only matters when the calls are genuinely independent; if getB needs getA's id, the waterfall is the correct shape.",
    interviewLine: "await doesn't block the thread, but it does block the next line, which is enough to turn independent calls into a waterfall.",
    misconception: "Believing that because await is non-blocking, sequential awaits are already concurrent.",
    hints: [
      "When exactly does getB() get called in the first version?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
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
        text: "Promise.all attaches a handler to every input, so it is observed and silently discarded",
        isCorrect: true,
        explanation: "Correct. all subscribes to all of them, so the later rejection is handled, not reported, but not unhandled either."
      },
      {
        id: "B",
        text: "It always surfaces as an unhandledrejection event",
        isCorrect: false,
        explanation: "It does not: Promise.all already attached a handler to that promise."
      },
      {
        id: "C",
        text: "It cancels the remaining work, so the second rejection never occurs",
        isCorrect: false,
        explanation: "Nothing is cancelled and the second rejection does occur, it is just absorbed."
      },
      {
        id: "D",
        text: "It is delivered to the same catch block a moment later",
        isCorrect: false,
        explanation: "A try/catch fires once. The second rejection has nowhere to go."
      }
    ],
    correctAnswer: "A",
    explanation: "Promise.all subscribes to every input as it is passed in, so each has a handler attached from the start. When a second input rejects after the aggregate has already settled, that rejection is observed and dropped on the floor, no unhandledrejection event, and no way for your catch to see it. The failure is invisible rather than noisy, which is worse for diagnosis. If you need every failure, allSettled and inspect each reason. The genuine unhandled-rejection hazard is the opposite shape: creating promises first and awaiting them later, so one rejects before anything is listening.",
    interviewLine: "all attaches handlers to every input, so later rejections are swallowed rather than reported. If you need every error, that's allSettled.",
    misconception: "Assuming a rejection nobody reported must have triggered an unhandledrejection. Being handled and being reported are different things.",
    hints: [
      "Did anything subscribe to the second promise?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  }
];
