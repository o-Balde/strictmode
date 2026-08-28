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
        text: "useState: Used for managing state in functional components.",
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
        text: "Virtual DOM is a concept in React where a lightweight, virtual representation of the actual DOM (Document Object Model) is created and stored in memory.",
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
        text: "Often, useEffect create resources that need to be cleaned up or reset before the component leaves the screen, such as a subscription or a timer identifier.",
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
        text: "Redux is a simpler and more opinionated state management library that follows a strict unidirectional data flow and promotes immutability.",
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
        text: "useMemo is used to cache and memorize the result of calculations.",
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
        text: "The useCallback hook will return a memoized version of the callback, which changes only if the values of one of the dependencies change.",
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
        text: "useMemo is used to memoize the result of a computation, while useCallback is used to memoize a function itself.",
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
        text: "In a typical React application, data is passed from top to bottom (from parent to child component) using props.",
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
        text: "What is React.memo()?: Core React and frontend architecture principle.",
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
        text: "React Modern Patterns & Performance",
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
        text: "As stated by the react team, virtual DOM is a concept where a virtual representation of the real DOM is kept inside the memory and is synced with the real DOM by a library such as ReactDOM.",
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
        text: "Props State Immutable Owned by its component Has better performance Locally scoped Can be passed to child components Writeable/Mutable has setState() method to modify properties Changes to state can be asynchronous can only be passed as props React StateEvery component in react has a built-in state object, which contains all the property values that belong to that component.",
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
        text: "There are two types of side effects in React component.",
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
        text: "The useEffect React Hook is used for performing the side effects in functional components.",
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
        text: "Reason for re-renders in React: Re-rendering of a component and its child components occur when props or the state of the component has been changed.",
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
        text: "There are many ways through which one can optimize the performance of a React app, let, s have a look at some of them: Using useMemo( ) - It is a React hook that is used for caching CPU-Expensive functions.",
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
        text: "React Hooks will avoid a lot of overheads such as the instance creation, binding of events, etc.",
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
        text: "With server-side rendering, i.",
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
        text: "Context API - This is used when the state has to be shared with multiple components, and it helps in avoiding prop drilling,g but please keep in mind that it can cause all consumers to re-render on updates.: Core React and frontend architecture principle.",
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
        text: "When you are optimizing performance in React, your primary concern is to always reduce unnecessary re-renders and avoid expensive work.",
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
        text: "Prevent unnecessary re-renders - React.memo: Core React and frontend architecture principle.",
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
        text: "useCallback is used to memoize functions so that new function references are not created on every render, especially when passing callbacks to memoized children.",
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
        text: "Reduce initial load - Code Splitting: Core React and frontend architecture principle.",
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
        text: "For long lists, libraries like react-window render only the visible items instead of the entire dataset.",
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
        text: "Remember: React.",
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
        text: "Using array indices as keys can lead to performance issues and unexpected behavior, especially when reordering or deleting items.",
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
        text: "Reconciliation is the process by which React updates the DOM to match the virtual DOM efficiently.",
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
        text: "The Shadow DOM is a web standard that encapsulates a part of the DOM, isolating it from the rest of the document.",
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
        text: "Pure Components in React are components that only re-render when their props or state change.",
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
        text: "The useCallback hook memoizes functions to prevent their recreation on every render.",
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
        text: "The useMemo hook memoizes costly calculations, recomputing them only when dependencies change.",
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
        text: "To create and use custom hooks in React: Create a function that starts with use and uses built-in hooks like useState or useEffect Return the values or functions you want to share.",
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
        text: "React Suspense allows handling asynchronous operations more elegantly within components.",
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
        text: "Code splitting enhances performance by dividing code into smaller chunks loaded on demand, thereby reducing initial load times.",
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
        text: "Optimizing context performance involves memoizing context values with useMemo, splitting contexts for isolated state changes, and employing selectors to rerender only necessary components.",
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
        text: "Context in React can lead to performance issues if not handled carefully, causing unnecessary re-renders of components that consume the context, even if only part of the context changes.",
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
        text: "When setState is called in React: State update: It updates the component's state, triggering a re-render of the component Batching: React may batch multiple setState calls into a single update for performance optimization Re-render: React re-renders the component (and its child components if needed) with the new state Asynchronous: State updates may be asynchronous, meaning React doesn't immediately apply the state change; it schedules it for later to optimize performance Example: In this example, calling setState (via setCount) triggers a re-render with the updated count.",
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
        text: "Lazy loading in React is a technique where components are loaded only when they are needed, rather than at the initial page load.",
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
        text: "Concurrent features were introduced in React 18 (the experimental \"Concurrent Mode\" branding from React 17 is no longer used).",
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
        text: "To avoid blocking the UI, use Web Workers, setTimeout, or requestIdleCallback for offloading heavy computations.",
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
        text: "Static generation pre-renders HTML at build time instead of runtime; this approach enhances performance by delivering static content quickly while improving SEO outcomes.",
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
        text: "Common pitfalls in data fetching with React include failing to handle loading and error states, neglecting to clean up subscriptions which can cause memory leaks, and improperly using lifecycle methods or hooks.",
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
        text: "In React Router v6, the key <Router> components are: <BrowserRouter>: Uses the HTML5 history API to keep the UI in sync with the URL.",
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
        text: "The React Compiler is an opt-in build-time tool that analyzes your components and automatically inserts memoization equivalent to useMemo, useCallback, and React.",
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
        text: "React, s main parts: Components: Reusable UI units that return JSX.",
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
        text: "The Virtual DOM is an in-memory representation of the real DOM.",
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
        text: "Real DOM: Actual browser DOM tree Slower for many updates Direct updates can re-render large parts o",
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
        text: "What is this.setState Function in React?: Core React and frontend architecture principle.",
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
        text: "Optimize by: Binding functions in constructors where needed.",
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
        text: "How Can You Optimize React Performance?: Core React and frontend architecture principle.",
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
        text: "Lazy loading delays loading a component until it is required.",
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
        text: "Memoization stores the result of expensive computations and returns the cached result when inputs stay the same.",
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
        text: "useState is a built-in React Hook that gives functional components local state.",
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
        text: "Keys are a special prop React uses to identify list items across renders.",
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
        text: "Controlled components keep form input values in React state and update via onChange.",
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
        text: "Header: CSS strategies for React projects and when to use them: Global CSS files: simple and familiar.",
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
        text: "Create a reusable hook that listens to window resize, throttles updates, and cleans up on unmount.",
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
        text: "Hooks enable local reducer patterns (useReducer) and shared state via Context.",
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
        text: "Memoize heavy computations with useMemo.",
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
        text: "Common choices: CSS files and modules: predictable, caches well, CSS module scoping.",
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
        text: "Tools: shouldComponentUpdate in classes or React.",
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
        text: "There are 3 possible ways to achieve this: Binding in Constructor: In JavaScript classes, the methods are not bound by default.",
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
        text: "A key is a special string attribute you should include when creating arrays of elements.",
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
        text: "If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like ref={'textInput'}, and the DOM node is accessed as this.",
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
        text: "No, currently React.",
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
        text: "Below are the list of reasons, Fragments are a bit faster and use less memory by not creating an extra DOM node.",
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
        text: "When the application is running in development mode, React will automatically check all props that we set on components to make sure they have correct type.",
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
        text: "Below are the list of main advantages of React, Increases the application's performance with Virtual DOM.",
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
        text: "There are memoize libraries available which can be used on function components.",
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
        text: "The reason behind for this is that setState() is an asynchronous operation.",
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
        text: "React may batch multiple setState() calls into a single update for performance.",
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
        text: "Mixins are a way to totally separate components to have a common functionality.",
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
        text: "React Router is a wrapper around the history library which handles interaction with the browser's window.",
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
        text: "React Router v4 provides below 3 <Router> components: <BrowserRouter> <HashRouter> <MemoryRouter> The above components will create browser, hash, and memory history instances.",
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
        text: "Reselect is a selector library (for Redux) which uses memoization concept.",
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
        text: "Class components can be restricted from rendering when their input props are the same using PureComponent or shouldComponentUpdate.",
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
        text: "What is React lazy function?: Core React and frontend architecture principle.",
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
        text: "You can compare current value of the state with an existing state value and decide whether to rerender the page or not.",
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
        text: "Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime.",
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
        text: "Higher-order components come with a few caveats apart from its benefits.",
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
        text: "Yes, You can use.",
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
        text: "If you want to do code-splitting in a server rendered app, it is recommend to use Loadable Components because React.",
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
        text: "The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider, s parent re-renders.",
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
        text: "Below are the main differences between Real DOM and Virtual DOM, Real DOM Virtual DOM Updates are slow Updates are fast DOM manipulation is very expensive.",
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
        text: "Bootstrap can be added to your React app in a three possible ways, Using the Bootstrap CDN: This is the easiest way to add bootstrap.",
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
        text: "Below are the main differences between Redux and MobX, Topic Redux MobX Definition It is a javascrip",
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
        text: "There are three major benefits of new JSX transform, It is possible to use JSX without importing React packages The compiled output might improve the bundle size in a small amount The future improvements provides the flexibility to reduce the number of concepts to learn React.",
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
        text: "28 // Manual SW: offline fallback page 29 self.",
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
    id: "performance-explain",
    title: "Explain",
    prompt: "Explain, explain the behavior and mechanism.",
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
        text: "the difference between UNION and UNION ALL.",
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
    explanation: "the difference between UNION and UNION ALL. Feature Duplicates UNION Removes duplicates UNION ALL Keeps all rows, including duplicates Performance Slower (because of sorting\\ Faster (no de - duplication\\ Use case When you want distinct rows When duplicates are meaningful Example: SELECT city FROM customers UNION SELECT city FROM vendors; Returns a unique list of cities. SELECT city FROM customers",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
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
