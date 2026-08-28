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
        text: "The main difference between class-based and functional components is how they are defined and the syntax they use.",
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
    explanation: "The main difference between class-based and functional components is how they are defined and the syntax they use. Class-based components are defined as ES6 classes and extend the React.Component class. They use the render method to return the JSX (JavaScript XML) that defines the component's output. Class components have access to component lifecycle methods and state management through this.state and this.setState(). Functional components, on the other hand, are defined as simple JavaScript functions. They take in props as arguments and return JSX directly. Functional components do not have access to lifecycle methods or state. However, with the introduction of React Hooks in React 16.8, functional components can now manage state and use other features such as context and effects. In general, functional components are considered simpler and easier to read and test. It is recommended to use functional components whenever possible, unless there is a specific need for class-based components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between class-based and functional React components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between class-based and functional React components?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between class-based and functional React components?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "Lifecycle methods are a way to hook into the different stages of a component's life cycle, allowing you to execute specific code at specific times.",
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
    explanation: "Lifecycle methods are a way to hook into the different stages of a component's life cycle, allowing you to execute specific code at specific times. Here is the list of the major lifecycle methods: constructor: This is the first method called when a component is created. It is used for initializing state and binding event handlers. In functional components, you would use the useState hook for similar purposes. render: This method is responsible for rendering JSX markup and returns the content to be displayed on the screen. componentDidMount: This method is called immediately after the component is rendered in the DOM. It is commonly used for initialization tasks, such as API calls or setting up event listeners. componentDidUpdate: This method is invoked when the component's props or state change. It allows you to perform side effects, update the component based on the changes, or trigger additional API calls. componentWillUnmount: This method is called right before the component is removed from the DOM. It is used to clean up any resources that were set up in componentDidMount, such as removing event listeners or canceling timers. Some lifecycle methods, like componentWillMount, componentWillReceiveProps, and componentWillUpdate, have been deprecated or replaced with alternative methods or hooks. As for \"this,\" it refers to the current instance of a class component. It allows you to access properties and methods within the component. In functional components, \"this\" is not used as functions are not bound to a specific instance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the lifecycle methods of a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the lifecycle methods of a component?.",
    hints: [
      "Consider the core principles and trade-offs of What are the lifecycle methods of a component?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "The useEffect hook allows you to perform side effects in a functional component.",
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
    explanation: "The useEffect hook allows you to perform side effects in a functional component. Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a functional component known as the React rendering phase. This can lead to confusing errors and inconsistencies in the user interface. Instead, it is recommended to use useEffect. The function passed to useEffect will be executed after the render is committed to the screen, or if you pass an array of dependencies as the second parameter, the function will be called every time one of the dependencies changes. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the peculiarities of using useEffect?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the peculiarities of using useEffect?.",
    hints: [
      "Consider the core principles and trade-offs of What are the peculiarities of using useEffect?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "Mobx implements the Observer pattern, also known as the Publish-Subscribe pattern.",
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
    explanation: "Mobx implements the Observer pattern, also known as the Publish-Subscribe pattern. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Which pattern does Mobx implement?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Which pattern does Mobx implement?.",
    hints: [
      "Consider the core principles and trade-offs of Which pattern does Mobx implement?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "React Context is a feature that provides a way to pass data through the component tree without manually passing props at every level.",
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
    explanation: "React Context is a feature that provides a way to pass data through the component tree without manually passing props at every level. It allows you to create a global state that can be accessed by any component within the tree, regardless of its position. Context is useful when you need to share data between multiple components that are not directly connected through props. The React Context API consists of three main parts: createContext: This function is used to create a new context object. Context.Provider: This component is used to provide the value to the context. It wraps the components that need access to the value. Context.Consumer or useContext hook: This component or hook is used to consume the value from the context. It can be used within any component within the context's provider. By using React Context, you can avoid prop drilling (passing props through multiple levels of components) and easily manage state at a higher level, making your code more organized and efficient. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Context?.",
    hints: [
      "Consider the core principles and trade-offs of What is React Context?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "useRef returns a modifiable ref object, a property.",
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
    explanation: "useRef returns a modifiable ref object, a property. The current of which is initialized by the passed argument. The returned object will persist for the entire lifetime of the component and will not change from render to render. The usual use case is to access the descendant in an imperative style. I.e. using ref, we can explicitly refer to the DOM element. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useRef used for and how does it work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useRef used for and how does it work?.",
    hints: [
      "Consider the core principles and trade-offs of What is useRef used for and how does it work?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "To do this, you need to use the useEffect hook and pass the field of the object as a dependency array.",
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
    explanation: "To do this, you need to use the useEffect hook and pass the field of the object as a dependency array.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to track changes in a field of an object in a functional component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to track changes in a field of an object in a functional component?.",
    hints: [
      "Consider the core principles and trade-offs of How to track changes in a field of an object in a functional component?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "Refs are created using React.",
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
    explanation: "Refs are created using React.createRef() or the useRef() hook and attached to React elements through the ref attribute. By accessing the created reference, we can gain access to the DOM element using ref.current.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access a DOM element?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access a DOM element?.",
    hints: [
      "Consider the core principles and trade-offs of How to access a DOM element?."
    ],
    source: "44-react",
    estimatedMinutes: 2
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
        text: "Custom hook is a function that allows you to reuse logic between different components.",
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
    explanation: "Custom hook is a function that allows you to reuse logic between different components. It is a way to encapsulate reusable logic so that it can be easily shared and reused across multiple components. Custom hooks are functions that typically start with the word *use * and can call other hooks if needed. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a custom hook?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a custom hook?.",
    hints: [
      "Consider the core principles and trade-offs of What is a custom hook?."
    ],
    source: "44-react",
    estimatedMinutes: 3
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
        text: "Start the hook name with \"use\".",
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
    explanation: "Start the hook name with \"use\". Use existing hooks if needed. Don't call hooks conditionally. Extract reusable logic into the custom hook. Custom hooks must be pure functions. Custom hooks can return values or other hooks. Name the custom hook descriptively. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules for creating a custom hook?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules for creating a custom hook?.",
    hints: [
      "Consider the core principles and trade-offs of What are the rules for creating a custom hook?."
    ],
    source: "44-react",
    estimatedMinutes: 3
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
        text: "React Interview Questions for Experienced",
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
    explanation: "React Interview Questions for Experienced",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Custom Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Custom Hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are Custom Hooks?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3
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
        text: "React MCQ Questions Powered by Certificate included About the Speaker What will you Learn? I wish to receive further updates and confirmation via whatsapp Register Now Introduction to React React is an efficient, flexible, and open-source JavaScript framework library that allows developers to the creation of simple, fast, and scalable web applications.",
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
    explanation: "React MCQ Questions Powered by Certificate included About the Speaker What will you Learn? I wish to receive further updates and confirmation via whatsapp Register Now Introduction to React React is an efficient, flexible, and open-source JavaScript framework library that allows developers to the creation of simple, fast, and scalable web applications. Jordan Walke, a software engineer who was working for Facebook created React. It was first deployed on the news feed of Facebook in 2011 and on Instagram in 2012. Developers from the Javascript background can easily develop web applications with the help of React. React Hooks will allow you to use the state and other features of React in which requires a class to be written by you. In simple words, we can say that, React Hooks are the functions that will connect React state with the lifecycle features from the function components. React Hooks is among the features that are implemented latest in the version React 16.8. Scope of React: The selection of the right technology for application or web development is becoming more challenging. React has been considered to be the fastest-growing Javascript framework among all. The tools of Javascript are firming their roots slowly and steadily in the marketplace and the React certification demand is exponentially increasing. React is a clear win for front-end developers as it has a quick learning curve, clean abstraction, and reusable components. Currently, there is no end in sight for React as it keeps evolving. Play React Interview Questions for Freshers",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between useEffect and useLayoutEffect?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between useEffect and useLayoutEffect?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between useEffect and useLayoutEffect?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "The few limitations of React are as given below: React is not a full-blown framework as it is only a library.",
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
    explanation: "The few limitations of React are as given below: React is not a full-blown framework as it is only a library. The components of React are numerous and will take time to fully grasp the benefits of all. It might be difficult for beginner programmers to understand React. Coding might become complex as it will make use of inline templating and JSX. You can download a PDF version of React Interview Questions. Click here to download.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the limitations of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the limitations of React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the limitations of React?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "The useState() is a built-in React Hook that allows you for having state variables in functional components.",
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
    explanation: "The useState() is a built-in React Hook that allows you for having state variables in functional components. It should be used when the DOM has something that is dynamically manipulating/controlling. In the below-given example code, The useState(0) will return a tuple where the count is the first parameter that represents the counter\ufffd\ufffd\ufffds current state and the second parameter setCounter method will allow us to update the state of the counter. We can make use of setCounter() method for updating the state of count anywhere. In this example, we are using setCounter() inside the setCount function where various other things can also be done. The idea with the usage of hooks is that we will be able to keep our code more functional and avoid class-based components if they are not required.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useState() in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useState() in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is useState() in React?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
    codeSnippet: "function card(props){\n   return(\n      <div className=\"main-container\">\n        <h2>Title of the card</h2>\n      </div>\n    )\n   }\n   const card = (props) =>{\n    return(\n      <div className=\"main-container\">\n        <h2>Title of the card</h2>\n      </div>\n    )\n   }\n\nclass Card extends React.Component{\n  constructor(props){\n     super(props);\n   }\n    render(){\n      return(\n        <div className=\"main-container\">\n          <h2>Title of the card</h2>\n        </div>\n      )\n    }\n   }\n\n<Student Info name=\"Vivek\" rollNumber=\"23\" />\n\nfunction StudentInfo(props){\n   return(\n     <div className=\"main\">\n       <h2>{props.name}</h2>\n       <h4>{props.rollNumber}</h4>\n     </div>\n   )\n }\n\nclass StudentInfo extends React.Component{\n   constructor(props){\n     super(props);\n    }\n    render(){\n      return(\n        <div className=\"main\">\n          <h2>{this.props.name}</h2>\n          <h4>{this.props.rollNumber}</h4>\u00a0\n        </div>\n      )\n    }\n   }\n\nfunction ClassRoom(props){\n   let [studentsCount,setStudentsCount] = useState(0);\n    const addStudent = () => {\n      setStudentsCount(++studentsCount);\n   }\n    return(\n      <div>\n        <p>Number of students in class room: {studentsCount}</p>\n        <button onClick={addStudent}>Add Student</button>\n      </div>\n    )\n   }\n\nclass ClassRoom extends React.Component{\n        constructor(props){\n            super(props);\n            this.state = {studentsCount : 0};\n            \n            this.addStudent = this.addStudent.bind(this);\n         }\n            \n            addStudent(){\n            this.setState((prevState)=>{\n               return {studentsCount: prevState.studentsCount++}\n            });\n         }\n            \n            render(){\n             return(\n               <div>\n                 <p>Number of students in class room: {this.state.studentsCount}</p>\n                 <button onClick={this.addStudent}>Add Student</button>\n               </div>\n             )\n           }\n         }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Before the introduction of Hooks in React, functional components were called stateless components and were behind class components on a feature basis.",
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
    explanation: "Before the introduction of Hooks in React, functional components were called stateless components and were behind class components on a feature basis. After the introduction of Hooks, functional components are equivalent to class components. Although functional components are the new trend, the react team insists on keeping class components in React. Therefore, it is important to know how these components differ. On the following basis let\ufffd\ufffd\ufffds compare functional and class components: Declaration Functional components are nothing but JavaScript functions and therefore can be declared using an arrow function or the function keyword: Class components, on the other hand, are declared using the ES6 class: Handling props Let\ufffd\ufffd\ufffds render the following component with props and analyse how functional and class components handle props: In functional components, the handling of props is pretty straightforward. Any prop provided as an argument to a functional component can be directly used inside HTML elements: In the case of class components, props are handled in a different way: As we can see in the code above, this keyword is used in the case of class components. Handling state Functional components use React hooks to handle state. It uses the useState hook to set the state of a variable inside the component: Since useState hook returns an array of two items, the first item contains the current state, and the second item is a function used to update the state. In the code above, using array destructuring we have set the variable name to studentsCount with a current value of \ufffd\ufffd\ufffd0\ufffd\ufffd\ufffd and setStudentsCount is the function that is used to update the state. For reading the state, we can see from the code above, the variable name can be directly used to read the current state of the variable. We cannot use React Hooks inside class components, therefore state handling is done very differently in a class component: Let\ufffd\ufffd\ufffds take the same above example and convert it into a class component: In the code above, we see we are using this.state to add the variable studentsCount and setting the value to \ufffd\ufffd\ufffd0\ufffd\ufffd\ufffd. For reading the state, we are using this.state.studentsCount. For updating the state, we need to first bind the addStudent function to this. Only then, we will be able to use the setState function which is used to update the state. Advance your career with Mock Assessments Refine your coding skills with Mock Assessments Real-world coding challenges for top company interviews Real-world coding challenges for top companies Real-Life Problems Detailed reports Attempt Now",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between functional and class components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between functional and class components?.",
    hints: [
      "Consider the core principles and trade-offs of What are the differences between functional and class components?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "Sometimes while developing React applications, there is a need to pass data from a component that is higher in the hierarchy to a component that is deeply nested.",
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
    explanation: "Sometimes while developing React applications, there is a need to pass data from a component that is higher in the hierarchy to a component that is deeply nested. To pass data between such components, we pass props from a source component and keep passing the prop to the next component in the hierarchy till we reach the deeply nested component. The disadvantage of using prop drilling is that the components that should otherwise be not aware of the data have access to the data.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is prop drilling in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is prop drilling in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is prop drilling in React?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "React Hooks are the built-in functions that permit developers for using the state and lifecycle methods within React components.",
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
    explanation: "React Hooks are the built-in functions that permit developers for using the state and lifecycle methods within React components. These are newly added features made available in React 16.8 version. Each lifecycle of a component is having 3 phases which include mount, unmount, and update. Along with that, components have properties and states. Hooks will allow using these methods by developers for improving the reuse of code with higher flexibility navigating the component tree. Using Hook, all features of React can be used without writing class components. For example, before React version 16.8, it required a class component for managing the state of a component. But now using the useState hook, we can keep the state in a functional component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What is React Hooks?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-react-hooks",
    title: "Explain React Hooks.",
    prompt: "Explain React Hooks. \u2014 explain the behavior and mechanism.",
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
        text: "What are Hooks? Hooks are functions that let us \ufffd\ufffd\ufffdhook into\ufffd\ufffd\ufffd React state and lifecycle features from a functional component.",
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
    explanation: "What are Hooks? Hooks are functions that let us \ufffd\ufffd\ufffdhook into\ufffd\ufffd\ufffd React state and lifecycle features from a functional component. React Hooks cannot be used in class components. They let us write components without class. Why were Hooks introduced in React? React hooks were introduced in the 16.8 version of React. Previously, functional components were called stateless components. Only class components were used for state management and lifecycle methods. The need to change a functional component to a class component, whenever state management or lifecycle methods were to be used, led to the development of Hooks. Example of a hook: useState hook: In functional components, the useState hook lets us define a state for a component: The state variable \ufffd\ufffd\ufffdname\ufffd\ufffd\ufffd can be directly used inside the HTML.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain React Hooks..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain React Hooks..",
    hints: [
      "Consider the core principles and trade-offs of Explain React Hooks.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "There are 2 rules which must be followed while you code with Hooks: React Hooks must be called only at the top level.",
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
    explanation: "There are 2 rules which must be followed while you code with Hooks: React Hooks must be called only at the top level. It is not allowed to call them inside the nested functions, loops, or conditions. It is allowed to call the Hooks only from the React Function Components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules that must be followed while using React Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules that must be followed while using React Hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are the rules that must be followed while using React Hooks?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "Earlier, refs were only limited to class components but now it can also be accessible in function components through the useRef Hook in React.",
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
    explanation: "Earlier, refs were only limited to class components but now it can also be accessible in function components through the useRef Hook in React. The refs are used for: Managing focus, media playback, or text selection. Integrating with DOM libraries by third-party. Triggering the imperative animations.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do React Hooks make use of refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do React Hooks make use of refs?.",
    hints: [
      "Consider the core principles and trade-offs of Why do React Hooks make use of refs?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "Static typing refers to the process of code check during the time of compilation for ensuring all variables will be statically typed.",
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
    explanation: "Static typing refers to the process of code check during the time of compilation for ensuring all variables will be statically typed. React Hooks are functions that are designed to make sure about all attributes must be statically typed. For enforcing stricter static typing within our code, we can make use of the React API with custom Hooks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does React Hook work with static typing?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does React Hook work with static typing?.",
    hints: [
      "Consider the core principles and trade-offs of Does React Hook work with static typing?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3
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
        text: "React lifecycle hooks will have the methods that will be automatically called at different phases in the component lifecycle and thus it provides good control over what happens at the invoked point.",
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
    explanation: "React lifecycle hooks will have the methods that will be automatically called at different phases in the component lifecycle and thus it provides good control over what happens at the invoked point. It provides the power to effectively control and manipulate what goes on throughout the component lifecycle. For example, if you are developing the YouTube application, then the application will make use of a network for buffering the videos and it consumes the power of the battery (assume only these two). After playing the video if the user switches to any other application, then you should make sure that the resources like network and battery are being used most efficiently. You can stop or pause the video buffering which in turn stops the battery and network usage when the user switches to another application after video play. So we can say that the developer will be able to produce a quality application with the help of lifecycle methods and it also helps developers to make sure to plan what and how to do it at different points of birth, growth, or death of user interfaces. The various lifecycle methods are: constructor(): This method will be called when the component is initiated before anything has been done. It helps to set up the initial state and initial values. getDerivedStateFromProps(): This method will be called just before element(s) rendering in the DOM. It helps to set up the state object depending on the initial props. The getDerivedStateFromProps() method will have a state as an argument and it returns an object that made changes to the state. This will be the first method to be called on an updating of a component. render(): This method will output or re-render the HTML to the DOM with new changes. The render() method is an essential method and will be called always while the remaining methods are optional and will be called only if they are defined. componentDidMount(): This method will be called after the rendering of the component. Using this method, you can run statements that need the component to be already kept in the DOM. shouldComponentUpdate(): The Boolean value will be returned by this method which will specify whether React should proceed further with the rendering or not. The default value for this method will be True. getSnapshotBeforeUpdate(): This method will provide access for the props as well as for the state before the update. It is possible to check the previously present value before the update, even after the update. componentDidUpdate(): This method will be called after the component has been updated in the DOM. componentWillUnmount(): This method will be called when the component removal from the DOM is about to happen.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the lifecycle methods of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the lifecycle methods of React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the lifecycle methods of React?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-how-to-create-a-simple-react-hooks-example-prog",
    title: "Explain how to create a simple React Hooks example program.",
    prompt: "Explain how to create a simple React Hooks example program. \u2014 explain the behavior and mechanism.",
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
    codeSnippet: "npx create-react-app react-items-with-hooks\n\nimport React from 'react';\nexport function SearchItem() {\n return (\n   <div>\n     <div className=\"search-input\">\n       <input type=\"text\" placeholder=\"SearchItem\"/>\n     </div>\n     <h1 className=\"h1\">Search Results</h1>\n     <div className=\"items\">\n       <table>\n         <thead>\n           <tr>\n             <th className=\"itemname-col\">Item Name</th>\n             <th className=\"price-col\">Price</th>\n             <th className=\"quantity-col\">Quantity</th>\n           </tr>\n         </thead>\n         <tbody></tbody>\n       </table>\n     </div>\n   </div>\n );\n}\n\nimport { SearchItem } from './SearchItem';\n\n<div className=\"App\">\n <header>\n   Items with Hooks\n </header>\n <SearchItem/>\n</div>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "I will assume that you are having some coding knowledge about JavaScript and have installed Node on your system for creating a below given React Hook program.",
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
    explanation: "I will assume that you are having some coding knowledge about JavaScript and have installed Node on your system for creating a below given React Hook program. An installation of Node comes along with the command-line tools: npm and npx, where npm is useful to install the packages into a project and npx is useful in running commands of Node from the command line. The npx looks in the current project folder for checking whether a command has been installed there. When the command is not available on your computer, the npx will look in the npmjs.com repository, then the latest version of the command script will be loaded and will run without locally installing it. This feature is useful in creating a skeleton React application within a few key presses. Open the Terminal inside the folder of your choice, and run the following command: Here, the create-react-app is an app initializer created by Facebook, to help with the easy and quick creation of React application, providing options to customize it while creating the application? The above command will create a new folder named react-items-with-hooks and it will be initialized with a basic React application. Now, you will be able to open the project in your favourite IDE. You can see an src folder inside the project along with the main application component App.js. This file is having a single function App() which will return an element and it will make use of an extended JavaScript syntax(JSX) for defining the component. JSX will permit you for writing HTML-style template syntax directly into the JavaScript file. This mixture of JavaScript and HTML will be converted by React toolchain into pure JavaScript that will render the HTML element. It is possible to define your own React components by writing a function that will return a JSX element. You can try this by creating a new file src/SearchItem.jsand put the following code into it. This is all about how you can create a component. It will only display the empty table and doesn\ufffd\ufffd\ufffdt do anything. But you will be able to use the Search component in the application. Open the file src/App.js and add the import statement given below to the top of the file. Now, from the logo.svg, import will be removed and then contents of returned value in the function App() will be replaced with the following code: You can notice that the element <SearchItem/> has been used just similar to an HTML element. The JSX syntax will enable for including the components in this approach directly within the JavaScript code. Your application can be tested by running the below-given command in your terminal. npm start This command will compile your application and open your default browser into http://localhost:4000. This command can be kept on running when code development is in progress to make sure that the application is up-to-date, and also this browser page will be reloaded each time you modify and save the code. This application will work finely, but it doesn\ufffd\ufffd\ufffdt look nice as it doesn\ufffd\ufffd\ufffdt react to any input from the user. You can make it more interactive by adding a state with React Hooks, adding authentication, etc.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain how to create a simple React Hooks example program..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain how to create a simple React Hooks example program..",
    hints: [
      "Consider the core principles and trade-offs of Explain how to create a simple React Hooks example program.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-about-types-of-hooks-in-react",
    title: "Explain about types of Hooks in React.",
    prompt: "Explain about types of Hooks in React. \u2014 explain the behavior and mechanism.",
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
        text: "There are two types of Hooks in React.",
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
    explanation: "There are two types of Hooks in React. They are:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain about types of Hooks in React..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain about types of Hooks in React..",
    hints: [
      "Consider the core principles and trade-offs of Explain about types of Hooks in React.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-differentiate-react-hooks-vs-classes",
    title: "Differentiate React Hooks vs Classes.",
    prompt: "Differentiate React Hooks vs Classes. \u2014 explain the behavior and mechanism.",
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
        text: "React Hooks Classes It is used in functional components of React.",
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
    explanation: "React Hooks Classes It is used in functional components of React. It is used in class-based components of React. It will not require a declaration of any kind of constructor. It is necessary to declare the constructor inside the class component. It does not require the use of this keyword in state declaration or modification. Keyword this will be used in state declaration (this.state) and in modification (this.setState()). It is easier to use because of the useState functionality. No specific function is available for helping us to access the state and its corresponding setState variable. React Hooks can be helpful in implementing Redux and context API. Because of the long setup of state declarations, class states are generally not preferred.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Differentiate React Hooks vs Classes..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Differentiate React Hooks vs Classes..",
    hints: [
      "Consider the core principles and trade-offs of Differentiate React Hooks vs Classes.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "Our goal is for Hooks to cover all the functionalities for classes at its earliest.",
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
    explanation: "Our goal is for Hooks to cover all the functionalities for classes at its earliest. There are no Hook equivalents for the following methods that are not introduced in Hooks yet: getSnapshotBeforeUpdate() getDerivedStateFromError() componentDidCatch() Since it is an early time for Hooks, few third-party libraries may not be compatible with Hooks at present, but they will be added soon.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do Hooks cover all the functionalities provided by the classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do Hooks cover all the functionalities provided by the classes?.",
    hints: [
      "Consider the core principles and trade-offs of Do Hooks cover all the functionalities provided by the classes?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "The React Hook cannot be considered as a replacement for Redux (It is an open-source, JavaScript library useful in managing the application state) when it comes to the management of the global application state tree in large complex applications, even though the React will provide a useReducer hook that manages state transitions similar to Redux.",
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
    explanation: "The React Hook cannot be considered as a replacement for Redux (It is an open-source, JavaScript library useful in managing the application state) when it comes to the management of the global application state tree in large complex applications, even though the React will provide a useReducer hook that manages state transitions similar to Redux. Redux is very useful at a lower level of component hierarchy to handle the pieces of a state which are dependent on each other, instead of a declaration of multiple useState hooks. In commercial web applications which is larger, the complexity will be high, so using only React Hook may not be sufficient. Few developers will try to tackle the challenge with the help of React Hooks and others will combine React Hooks with the Redux.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can React Hook replaces Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can React Hook replaces Redux?.",
    hints: [
      "Consider the core principles and trade-offs of Can React Hook replaces Redux?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "So, this question is more targeted towards ways that YOU would take to manage the global state.",
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
    explanation: "So, this question is more targeted towards ways that YOU would take to manage the global state. So while I write the answer down, it\ufffd\ufffd\ufffds best that you personalize it with examples that seem fit to you. Managing global state in React really depends on its scope and complexity. Most of the time, you can use \ufffd\ufffd\ufffduseState\ufffd\ufffd\ufffd or \ufffd\ufffd\ufffduseReducer\ufffd\ufffd\ufffd, which may work well for component-specific data. But there are many circumstances under which different features can be used,",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you manage global state? Compare Context, Redux, and modern alternatives..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you manage global state? Compare Context, Redux, and modern alternatives..",
    hints: [
      "Consider the core principles and trade-offs of How do you manage global state? Compare Context, Redux, and modern alternatives.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "useReducer and useState are React hooks that manage state within functional components.",
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
    explanation: "useReducer and useState are React hooks that manage state within functional components. Here, useRender is used for more complex state logic, and useState carries out simpler values. Here\ufffd\ufffd\ufffds how they work: With useState, you directly update values with Now you already know what change you want, so you update it immediately. The approach becomes a little different when it comes to useReducer. You will describe what happened, and a separate function then decides how to update the state. For example: Here: state - holds the current value dispatch - used to send actions reducer - a function that updates the state Looking at the reducer function, Here, the reducer receives the current \ufffd\ufffd\ufffdstate\ufffd\ufffd\ufffd and an \ufffd\ufffd\ufffdaction\ufffd\ufffd\ufffd, then it checks what kind of action it is (action.type), and based on that, it returns a new state. At first, this feels like extra steps compared to useState. But it becomes useful when state is more complex. For example, in a form with multiple fields, instead of writing many useState calls, you can handle all updates in one reducer function. This keeps all the logic in one place instead of spreading it across different handlers.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is useReducer, and when would you use it over useState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is useReducer, and when would you use it over useState?.",
    hints: [
      "Consider the core principles and trade-offs of What is useReducer, and when would you use it over useState?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-useeffect-runs-after-the-browser-has-painted-the-update",
    title: "useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background.",
    prompt: "useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background. \u2014 explain the behavior and mechanism.",
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
        text: "This is why it\ufffd\ufffd\ufffds non-blocking and used for things like API calls, subscriptions, and logging.",
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
    explanation: "This is why it\ufffd\ufffd\ufffds non-blocking and used for things like API calls, subscriptions, and logging. Here,",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background..",
    hints: [
      "Consider the core principles and trade-offs of useEffect runs after the browser has painted the update. So the user already sees the UI change, and then your effect runs in the background.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
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
        text: "Class components are ES6 classes that extend React.",
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
    explanation: "Class components are ES6 classes that extend React.Component and rely on lifecycle methods (componentDidMount, componentDidUpdate, etc.) and this.state. Function components are plain functions that take props as input and return JSX, and use hooks (useState, useEffect, useRef, etc.) for state and side effects. Since hooks landed in React 16.8, function components are the default for new code; class components are kept for backward compatibility and are no longer the recommended pattern.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React's class components and functional components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React's class components and functional components?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between React's class components and functional components?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Stateless components in React are components that do not manage or hold any internal state.",
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
    explanation: "Stateless components in React are components that do not manage or hold any internal state. They simply receive data via props and render UI based on that data. These components are often functional components and are used for presentational purposes. Key points: Do not use this.state Render UI based on props Focused on displaying information, not managing behavior Stateless components are simpler, easier to test, and often more reusable. With the introduction of hooks, React components are mostly written using functions and can contain state via the useState hook.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are stateless components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are stateless components?.",
    hints: [
      "Consider the core principles and trade-offs of What are stateless components?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Stateful components in React are components that manage and hold their own internal state.",
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
    explanation: "Stateful components in React are components that manage and hold their own internal state. They can modify their state in response to user interactions or other events and re-render themselves when the state changes. Key points: Use this.state (in class components) or useState (in functional components) Can update state using event handlers or lifecycle methods Handle logic and data management Stateful components are essential for handling dynamic and interactive UIs.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are stateful components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are stateful components?.",
    hints: [
      "Consider the core principles and trade-offs of What are stateful components?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Hooks enable the use of state and other React features in functional components, replacing the need for class components.",
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
    explanation: "Hooks enable the use of state and other React features in functional components, replacing the need for class components. They streamline code by reducing the reliance on lifecycle methods, enhance readability, and facilitate the reuse of stateful logic across components. Popular hooks like useState and useEffect are used for managing state and side effects. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of using hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of using hooks in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the benefits of using hooks in React?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "React hooks should be called at the top level of a function, not inside loops, conditions, or nested functions.",
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
    explanation: "React hooks should be called at the top level of a function, not inside loops, conditions, or nested functions. They must only be used within React function components or custom hooks. These guidelines ensure proper state management and lifecycle behavior. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules of React hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules of React hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are the rules of React hooks?."
    ],
    source: "100-react",
    estimatedMinutes: 3
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
        text: "useEffect and useLayoutEffect both handle side effects in React functional components but differ in when they run: useEffect runs asynchronously after the DOM has rendered, making it suitable for tasks like data fetching or subscriptions.",
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
    explanation: "useEffect and useLayoutEffect both handle side effects in React functional components but differ in when they run: useEffect runs asynchronously after the DOM has rendered, making it suitable for tasks like data fetching or subscriptions. useLayoutEffect runs synchronously after DOM updates but before the browser paints, ideal for tasks like measuring DOM elements or aligning the UI with the DOM. Example: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between useEffect and useLayoutEffect in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between useEffect and useLayoutEffect in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between useEffect and useLayoutEffect in React?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "The dependency array of useEffect controls when the effect re-runs: If it's empty, the effect runs only once after the initial render.",
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
    explanation: "The dependency array of useEffect controls when the effect re-runs: If it's empty, the effect runs only once after the initial render. If it contains variables, the effect re-runs whenever any of those variables change. If omitted, the effect runs after every render. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does the dependency array of useEffect affect?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does the dependency array of useEffect affect?.",
    hints: [
      "Consider the core principles and trade-offs of What does the dependency array of useEffect affect?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "The useRef hook creates a mutable object that persists through renders, allowing direct access to DOM elements, storing mutable values without causing re-renders, and maintaining references to values.",
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
    explanation: "The useRef hook creates a mutable object that persists through renders, allowing direct access to DOM elements, storing mutable values without causing re-renders, and maintaining references to values. For instance, useRef can be utilized to focus on an input element: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useRef hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useRef hook in React and when should it be used?.",
    hints: [
      "Consider the core principles and trade-offs of What is the useRef hook in React and when should it be used?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "This applies to class components, which are no longer the recommended pattern.",
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
    explanation: "This applies to class components, which are no longer the recommended pattern. The function-component equivalent (the updater form of useState) is shown at the end. The callback (updater) form of setState() ensures state updates are based on the most current state and props. This matters when the new state depends on the previous state, because React may batch multiple updates and the this.state you'd read directly could be stale. The function-component equivalent uses the updater form of useState: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of callback function argument format of setState() in React class components and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of callback function argument format of setState() in React class components and when should it be used?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of callback function argument format of setState() in React class components and when should it be used?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "The useReducer hook manages complex state logic in functional components, serving as an alternative to useState.",
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
    explanation: "The useReducer hook manages complex state logic in functional components, serving as an alternative to useState. It's ideal when state has multiple fields (and there are constraints around how they should be mutated), or when the next state relies on the previous one. The useReducer hook accepts a reducer function + an initial state. The reducer function is passed the current state and action and returns a new state. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useReducer hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useReducer hook in React and when should it be used?.",
    hints: [
      "Consider the core principles and trade-offs of What is the useReducer hook in React and when should it be used?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "The useId hook generates unique IDs for elements within a component, which is crucial for accessibility by dynamically creating ids that can be used for linking form inputs and labels.",
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
    explanation: "The useId hook generates unique IDs for elements within a component, which is crucial for accessibility by dynamically creating ids that can be used for linking form inputs and labels. It guarantees unique IDs across the application even if the component renders multiple times. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the useId hook in React and when should it be used?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the useId hook in React and when should it be used?.",
    hints: [
      "Consider the core principles and trade-offs of What is the useId hook in React and when should it be used?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "React anti-patterns are practices that can lead to inefficient or hard-to-maintain code.",
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
    explanation: "React anti-patterns are practices that can lead to inefficient or hard-to-maintain code. Common examples include: Directly mutating state instead of using the state setter Using useEffect to derive state from props (compute it during render instead) Putting data into state that you can compute from other state or props Not using keys in lists, or using the array index as a key for reorderable lists Effects with missing or stale dependencies Deeply nested state; prefer flat shapes with useReducer or a state library Reading or writing refs during render (do it in effects or event handlers) Using useState for values that don't drive rendering (use useRef instead) Calling hooks conditionally or inside loops (breaks the Rules of Hooks) The older class-component anti-patterns (using componentWillMount for data fetching or relying on componentWillReceiveProps) refer to APIs that were renamed to UNSAFE_* and no longer apply to function-component code. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are some React anti-patterns?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are some React anti-patterns?.",
    hints: [
      "Consider the core principles and trade-offs of What are some React anti-patterns?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-the-react-component-lifecycle-methods-in-class",
    title: "Explain the React component lifecycle methods in class components.",
    prompt: "Explain the React component lifecycle methods in class components. \u2014 explain the behavior and mechanism.",
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
        text: "Class lifecycle methods only apply to class components, which are no longer the recommended pattern.",
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
    explanation: "Class lifecycle methods only apply to class components, which are no longer the recommended pattern. The function-component equivalents (using useEffect) are shown at the end. React class components have lifecycle methods for different phases: Mounting: constructor: Initializes state or binds methods componentDidMount: Runs after the component mounts, useful for API calls or subscriptions Updating: shouldComponentUpdate: Determines if the component should re-render componentDidUpdate: Runs after updates, useful for side effects Unmounting: componentWillUnmount: Cleans up (e.g., removing event listeners). In function components, all of the above are expressed with useEffect:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the React component lifecycle methods in class components..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the React component lifecycle methods in class components..",
    hints: [
      "Consider the core principles and trade-offs of Explain the React component lifecycle methods in class components.."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Higher-order components (HOCs) are functions that take a component and return a new one with added props or behavior, facilitating logic reuse across components.",
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
    explanation: "Higher-order components (HOCs) are functions that take a component and return a new one with added props or behavior, facilitating logic reuse across components. HOCs were the dominant pattern for cross-cutting logic (auth, data fetching, theming) before hooks. Custom hooks cover almost all of those use cases now without the wrapper-component nesting. HOCs still appear in older codebases and some libraries (e.g., connect from react-redux), but new code should prefer a custom hook. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are higher-order components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are higher-order components in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are higher-order components in React?."
    ],
    source: "100-react",
    estimatedMinutes: 3
  },
  {
    id: "react-explain-the-presentational-vs-container-component-patte",
    title: "Explain the presentational vs container component pattern in React",
    prompt: "Explain the presentational vs container component pattern in React \u2014 explain the behavior and mechanism.",
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
        text: "The presentational vs container pattern split components into two roles: presentational components handled rendering (markup, styling) and received data via props, while container components handled state, data fetching, and behavior, then passed data down.",
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
    explanation: "The presentational vs container pattern split components into two roles: presentational components handled rendering (markup, styling) and received data via props, while container components handled state, data fetching, and behavior, then passed data down. This pattern was popular before hooks; its original author (Dan Abramov) has since said it's no longer worth following as a hard rule. With hooks, the same separation is usually expressed by extracting a custom hook (e.g., useUsers()) rather than a wrapper component. New code typically blends the two roles into a single component plus a custom hook. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the presentational vs container component pattern in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the presentational vs container component pattern in React.",
    hints: [
      "Consider the core principles and trade-offs of Explain the presentational vs container component pattern in React."
    ],
    source: "100-react",
    estimatedMinutes: 3
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
    codeSnippet: "function DataFetcher({ url, render }) {  const [data, setData] = useState(null);  useEffect(() => {    fetch(url)      .then((res) => res.json())      .then(setData);  }, [url]);  return render(data);}\n// Usage<DataFetcher  url=\"/api/data\"  render={(data) => <div>{data ? data.name : 'Loading...'}</div>}/>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Render props in React allow code sharing between components through a prop that is a function.",
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
    explanation: "Render props in React allow code sharing between components through a prop that is a function. This function returns a React element, enabling data to be passed to child components. Like HOCs, render props were a pre-hooks solution for sharing stateful logic. Most of those use cases are now solved with a custom hook (const data = useFetch(url)), which composes more naturally and avoids the render-prop pyramid. Render props are still useful in narrow cases where the consumer needs to control what to render based on parent-managed state (e.g., headless component libraries). Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are render props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are render props in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are render props in React?."
    ],
    source: "100-react",
    estimatedMinutes: 3
  },
  {
    id: "react-explain-the-composition-pattern-in-react",
    title: "Explain the composition pattern in React.",
    prompt: "Explain the composition pattern in React. \u2014 explain the behavior and mechanism.",
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
        text: "The composition pattern in React involves building components by combining smaller, reusable ones instead of using inheritance.",
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
    explanation: "The composition pattern in React involves building components by combining smaller, reusable ones instead of using inheritance. This encourages creating complex UIs by passing components as children or props. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the composition pattern in React..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the composition pattern in React..",
    hints: [
      "Consider the core principles and trade-offs of Explain the composition pattern in React.."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "To re-render the view on browser resize, use the useEffect hook to listen for the resize event and update state.",
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
    explanation: "To re-render the view on browser resize, use the useEffect hook to listen for the resize event and update state. Example: This updates the state and re-renders the component whenever the window is resized.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you re-render the view when the browser is resized?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you re-render the view when the browser is resized?.",
    hints: [
      "Consider the core principles and trade-offs of How do you re-render the view when the browser is resized?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
    codeSnippet: "import React, { useState, useEffect } from 'react';\nconst FetchAndDisplayData = () => {  const [info, updateInfo] = useState(null);  const [isLoading, toggleLoading] = useState(true);\n  useEffect(() => {    const retrieveData = async () => {      try {        const res = await fetch('https://api.example.com/data');        const data = await res.json();        updateInfo(data);      } catch (err) {        console.error('Error fetching data:', err);      } finally {        toggleLoading(false);      }    };\n    retrieveData();  }, []);\n  return (    <div>      {isLoading ? (        <p>Fetching data, please wait...</p>      ) : (        <pre>{JSON.stringify(info, null, 2)}</pre>      )}    </div>  );};\nexport default FetchAndDisplayData;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Asynchronous data loading uses useEffect alongside useState hooks; fetching data inside useEffect updates state with fetched results ensuring re-renders occur with new data.",
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
    explanation: "Asynchronous data loading uses useEffect alongside useState hooks; fetching data inside useEffect updates state with fetched results ensuring re-renders occur with new data. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle asynchronous data loading in React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle asynchronous data loading in React applications?.",
    hints: [
      "Consider the core principles and trade-offs of How do you handle asynchronous data loading in React applications?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "React Router is a popular routing library for React applications that enables navigation between different components based on the URL.",
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
    explanation: "React Router is a popular routing library for React applications that enables navigation between different components based on the URL. It provides declarative routing, allowing you to define routes and their corresponding components in a straightforward manner.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a React Router?.",
    hints: [
      "Consider the core principles and trade-offs of What is a React Router?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "BrowserRouter: Uses the HTML5 History API to manage navigation, enabling clean URLs without the hash (#).",
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
    explanation: "BrowserRouter: Uses the HTML5 History API to manage navigation, enabling clean URLs without the hash (#). It requires server-side configuration to handle routes correctly, especially for deep linking. HashRouter: Uses the hash (#) portion of the URL to simulate navigation. It doesn't require server-side configuration, as the hash is never sent to the server. This makes it suitable for environments where server-side routing isn't possible (e.g., static hosting).",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between BrowserRouter and HashRouter?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between BrowserRouter and HashRouter?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between BrowserRouter and HashRouter?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "In React Router v6, you can navigate programmatically by using the useNavigate hook.",
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
    explanation: "In React Router v6, you can navigate programmatically by using the useNavigate hook. First, import useNavigate from react-router-dom and call it to get the navigate function. Then, you can use navigate('/new-page') to navigate to a different route. For example: In React Router v5, the useHistory hook provides access to the history object, which you can use to push a new route. For example, history.push('/new-page') will navigate to the specified route. For example: Both methods allow you to navigate programmatically in React Router.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you navigate programmatically in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you navigate programmatically in React Router?.",
    hints: [
      "Consider the core principles and trade-offs of How do you navigate programmatically in React Router?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
    codeSnippet: "import { useLocation } from 'react-router-dom';\nfunction NavBar() {  const location = useLocation();  return (    <nav>      <ul>        <li className={location.pathname === '/home' ? 'active' : ''}>Home</li>        <li className={location.pathname === '/about' ? 'active' : ''}>          About        </li>      </ul>    </nav>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use the useLocation hook to get the current route, and conditionally apply styles for the active state.",
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
    explanation: "Use the useLocation hook to get the current route, and conditionally apply styles for the active state. Example:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you manage the active route state in a multi-page React application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you manage the active route state in a multi-page React application?.",
    hints: [
      "Consider the core principles and trade-offs of How do you manage the active route state in a multi-page React application?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "In React Router v6, you can use the useSearchParams hook to access query parameters from the URL.",
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
    explanation: "In React Router v6, you can use the useSearchParams hook to access query parameters from the URL. Example: This hook allows you to retrieve and manipulate query parameters in React Router v6.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get query parameters in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get query parameters in React Router?.",
    hints: [
      "Consider the core principles and trade-offs of How to get query parameters in React Router?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "To perform an automatic redirect after login in React Router, use the useNavigate hook to navigate to the desired route after successful authentication.",
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
    explanation: "To perform an automatic redirect after login in React Router, use the useNavigate hook to navigate to the desired route after successful authentication. Example: In this example, the handleLogin function navigates to the /dashboard route after successful login.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you perform an automatic redirect after login in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you perform an automatic redirect after login in React Router?.",
    hints: [
      "Consider the core principles and trade-offs of How do you perform an automatic redirect after login in React Router?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Localization typically involves libraries like react-i18next or react-intl.",
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
    explanation: "Localization typically involves libraries like react-i18next or react-intl. Set up translation files for different languages and configure the library within your app using provided hooks or components. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you localize React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you localize React applications?.",
    hints: [
      "Consider the core principles and trade-offs of How do you localize React applications?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "react-intl is a library that provides internationalization (i18n) support for React applications.",
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
    explanation: "react-intl is a library that provides internationalization (i18n) support for React applications. It helps in formatting numbers, dates, strings, and handling translation/localization. It integrates with the Intl API in JavaScript to provide locale-specific data and translation management.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is react-intl?.",
    hints: [
      "Consider the core principles and trade-offs of What is react-intl?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Formatted text: Helps in formatting messages and strings with placeholders.",
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
    explanation: "Formatted text: Helps in formatting messages and strings with placeholders. Number formatting: Allows for formatting numbers, currencies, and percentages according to the locale. Date and time formatting: Helps in formatting dates and times in various formats based on the locale. Plural and gender support: Provides plural and gender-aware string formatting.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main features of react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main features of react-intl?.",
    hints: [
      "Consider the core principles and trade-offs of What are the main features of react-intl?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Component-based formatting: Using React components like <FormattedMessage />, <FormattedNumber />, <FormattedDate />, etc.",
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
    explanation: "Component-based formatting: Using React components like <FormattedMessage />, <FormattedNumber />, <FormattedDate />, etc., to format content. Hook-based formatting: Using hooks like useIntl for formatting messages, numbers, or dates imperatively within components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the two ways of formatting in react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the two ways of formatting in react-intl?.",
    hints: [
      "Consider the core principles and trade-offs of What are the two ways of formatting in react-intl?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "You can use the FormattedMessage component to handle placeholders within strings.",
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
    explanation: "You can use the FormattedMessage component to handle placeholders within strings. Placeholders are replaced dynamically with variables in the translated string. Here, {name} is a placeholder, and John will replace it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use FormattedMessage as a placeholder using react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use FormattedMessage as a placeholder using react-intl?.",
    hints: [
      "Consider the core principles and trade-offs of How to use FormattedMessage as a placeholder using react-intl?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "You can access the current locale using the useIntl hook or the IntlProvider's locale prop.",
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
    explanation: "You can access the current locale using the useIntl hook or the IntlProvider's locale prop. Using useIntl: Using IntlProvider: Here, locale=\"en\" defines the current locale.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access the current locale with React Intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access the current locale with React Intl?.",
    hints: [
      "Consider the core principles and trade-offs of How to access the current locale with React Intl?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Testing React applications can be done using Jest and React Testing Library.",
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
    explanation: "Testing React applications can be done using Jest and React Testing Library. Jest serves as the testing framework while React Testing Library provides utilities for testing components similarly to user interactions. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React applications?.",
    hints: [
      "Consider the core principles and trade-offs of How do you test React applications?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Render the hook inside a test using renderHook from @testing-library/react, then call act to drive any state updates.",
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
    explanation: "Render the hook inside a test using renderHook from @testing-library/react, then call act to drive any state updates. Older sources import renderHook from @testing-library/react-hooks. That package was deprecated and merged into @testing-library/react in v13; use the import shown above.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React hooks in functional components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React hooks in functional components?.",
    hints: [
      "Consider the core principles and trade-offs of How do you test React hooks in functional components?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "Same approach as above: render the hook with renderHook and assert on result.",
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
    explanation: "Same approach as above: render the hook with renderHook and assert on result.current. For hooks that depend on context (e.g., a router or theme provider), pass a wrapper option.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test custom hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test custom hooks in React?.",
    hints: [
      "Consider the core principles and trade-offs of How do you test custom hooks in React?."
    ],
    source: "100-react",
    estimatedMinutes: 3
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
        text: "useActionState takes an action function and an initial state, and returns [state, dispatchAction, isPending].",
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
    explanation: "useActionState takes an action function and an initial state, and returns [state, dispatchAction, isPending]. Calling dispatchAction (usually by passing it to <form action>) runs the action, marks isPending true, and replaces the state with the action's return value when it resolves. One hook covers what you'd otherwise write as three separate useState calls for data, loading, and error.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does the useActionState hook do?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does the useActionState hook do?.",
    hints: [
      "Consider the core principles and trade-offs of What does the useActionState hook do?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "use reads the value of a Promise or Context during render.",
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
    explanation: "use reads the value of a Promise or Context during render. When given a Promise, it suspends the component until the promise resolves (handled by the nearest <Suspense> boundary) and then returns the resolved value. Unlike useEffect, use can be called conditionally and inside loops, and the resolved data is available synchronously after suspension, so there's no loading state to thread through the tree.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use hook and how is it different from useEffect + fetch?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use hook and how is it different from useEffect + fetch?.",
    hints: [
      "Consider the core principles and trade-offs of What is the use hook and how is it different from useEffect + fetch?."
    ],
    source: "100-react",
    estimatedMinutes: 2
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
        text: "ReactJS is a JavaScript library for building the view layer of web apps using reusable components.",
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
    explanation: "ReactJS is a JavaScript library for building the view layer of web apps using reusable components. It shines for single-page applications because components, the Virtual DOM, and efficient re-rendering let the UI update without full page reloads. JSX is commonly used to write React components. Key features include the Virtual DOM, component-based design, Hooks to use state and effects in functions, server-side rendering for faster initial loads and SEO, and routing via libraries such as React Router.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is ReactJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is ReactJS?.",
    hints: [
      "Consider the core principles and trade-offs of What is ReactJS?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "The latest stable React release is v19.",
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
    explanation: "The latest stable React release is v19.1.0, published March 28, 2025. It builds on the major changes introduced in v19.0.0 from December 5, 2024.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What Is the Latest Version of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What Is the Latest Version of React?.",
    hints: [
      "Consider the core principles and trade-offs of What Is the Latest Version of React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-props-and-state-in-react-with-differences",
    title: "Explain Props and State in React with Differences",
    prompt: "Explain Props and State in React with Differences \u2014 explain the behavior and mechanism.",
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
        text: "Props pass data into a component from its parent and are read-only.",
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
    explanation: "Props pass data into a component from its parent and are read-only. State lives inside a component and can change over time. Quick differences: Props: Passed from parent, immutable, used in both function and class components. State: Local to component, mutable via setState or useState, mostly managed inside the component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Props and State in React with Differences.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Props and State in React with Differences.",
    hints: [
      "Consider the core principles and trade-offs of Explain Props and State in React with Differences."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "A component is a reusable piece of UI.",
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
    explanation: "A component is a reusable piece of UI. Two main types: Functional components: Plain functions that return JSX; with Hooks they can hold state and use lifecycle-like effects. Class components: ES6 classes that extend React.Component; they use this.state and lifecycle methods. Hooks have reduced the need for classes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Components and Their Type in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Components and Their Type in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are Components and Their Type in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Browsers cannot run JSX directly.",
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
    explanation: "Browsers cannot run JSX directly. A transpiler such as Babel converts JSX into plain JavaScript before the code runs in the browser.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Do Browsers Read JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Do Browsers Read JSX?.",
    hints: [
      "Consider the core principles and trade-offs of How Do Browsers Read JSX?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-the-steps-to-create-a-react-application-and-pri",
    title: "Explain the Steps to Create a React Application and Print Hello World",
    prompt: "Explain the Steps to Create a React Application and Print Hello World \u2014 explain the behavior and mechanism.",
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
        text: "Install Node, then create an app with Vite:npm create vite@latestcd <Application_Name>Example App component:import React from \"react\";import \".",
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
    explanation: "Install Node, then create an app with Vite:npm create vite@latestcd <Application_Name>Example App component:import React from \"react\";import \"./App.css\";function App() { return <div className=\"App\">Hello World !</div>;}export default App;Run the app with:npm start",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Steps to Create a React Application and Print Hello World.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Steps to Create a React Application and Print Hello World.",
    hints: [
      "Consider the core principles and trade-offs of Explain the Steps to Create a React Application and Print Hello World."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "A higher-order component is a function that takes a component and returns a new enhanced component.",
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
    explanation: "A higher-order component is a function that takes a component and returns a new enhanced component. HOCs let you share common functionality without repeating code.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Higher-Order Component in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Higher-Order Component in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is Higher-Order Component in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Functional Components: Simple JS functions taking props Use Hooks for state and effects No render method Class Components: Extend React.",
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
    explanation: "Functional Components: Simple JS functions taking props Use Hooks for state and effects No render method Class Components: Extend React.Component and must implement render() Use this.state and lifecycle methods Require constructor when initializing state",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Difference Between Functional and Class Component in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Difference Between Functional and Class Component in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain the Difference Between Functional and Class Component in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "React uses one-way data flow: data travels from parent to child via props.",
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
    explanation: "React uses one-way data flow: data travels from parent to child via props. Children do not directly modify parent props, which makes behavior easier to reason about.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain One Way Data Binding in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain One Way Data Binding in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain One Way Data Binding in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Context API lets you provide a value at a high level and consume it in nested components without passing props through each level.",
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
    explanation: "Context API lets you provide a value at a high level and consume it in nested components without passing props through each level. Use a Provider to set the value and useContext or Consumer to read it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Context API in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Context API in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is Context API in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "React routing runs in the browser for single-page apps and avoids full-page reloads.",
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
    explanation: "React routing runs in the browser for single-page apps and avoids full-page reloads. Conventional routing usually requests new HTML from the server for each navigation and triggers full page reloads.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Is React Routing Different from Conventional Routing?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Is React Routing Different from Conventional Routing?.",
    hints: [
      "Consider the core principles and trade-offs of How Is React Routing Different from Conventional Routing?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Refs let you access DOM nodes or component instances directly when needed, for example to manage focus or play a video.",
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
    explanation: "Refs let you access DOM nodes or component instances directly when needed, for example to manage focus or play a video. Use this.myRef.current in class components or useRef in functions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Use of Ref in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Use of Ref in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the Use of Ref in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Hooks let function components use state, refs, context, and lifecycle-like behavior.",
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
    explanation: "Hooks let function components use state, refs, context, and lifecycle-like behavior. They include built-in hooks such as useState, useEffect, useRef, and let you create custom hooks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Hooks in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are Hooks in React?."
    ],
    source: "150-react",
    estimatedMinutes: 3
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
        text: "useState declares state inside a function component:const [state, setState] = useState(initialState);state holds the current value; setState updates it and triggers re-render.",
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
    explanation: "useState declares state inside a function component:const [state, setState] = useState(initialState);state holds the current value; setState updates it and triggers re-render.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the useState Hook in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the useState Hook in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain the useState Hook in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "useEffect(function, dependencies) runs side effects like data fetching or subscriptions.",
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
    explanation: "useEffect(function, dependencies) runs side effects like data fetching or subscriptions. The dependencies array controls when the effect re-runs. It replaces lifecycle patterns like componentDidUpdate and componentWillUnmount in many cases.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the useEffect Hook in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the useEffect Hook in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain the useEffect Hook in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "React Developer Tools is a browser extension that adds an inspector for React components.",
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
    explanation: "React Developer Tools is a browser extension that adds an inspector for React components. You can browse the component tree and inspect props, state, and hooks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a React Developer Tool?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a React Developer Tool?.",
    hints: [
      "Consider the core principles and trade-offs of What is a React Developer Tool?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Prop drilling happens when you pass props through intermediate components that do not need the data, just to reach a deeply nested one.",
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
    explanation: "Prop drilling happens when you pass props through intermediate components that do not need the data, just to reach a deeply nested one. It creates cluttered code and makes maintenance harder.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Prop Drilling and Its Disadvantages?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Prop Drilling and Its Disadvantages?.",
    hints: [
      "Consider the core principles and trade-offs of What is Prop Drilling and Its Disadvantages?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Custom hooks are functions starting with use that call built-in hooks.",
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
    explanation: "Custom hooks are functions starting with use that call built-in hooks. They encapsulate reusable logic so you can share behavior across components without repeating code.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is CustomHooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is CustomHooks in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is CustomHooks in React?."
    ],
    source: "150-react",
    estimatedMinutes: 3
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
        text: "useRef Hook used in function components Keeps the same ref across re-renders Returns a mutable object.",
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
    explanation: "useRef Hook used in function components Keeps the same ref across re-renders Returns a mutable object. createRef: Function often used in class components Creates a new ref each render if used in functions Typical usage in class component constructors Examples: const myRef = useRef(); const myRef = React.createRef();",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Difference Between useRef and createRef in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Difference Between useRef and createRef in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the Difference Between useRef and createRef in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "Custom hooks are user-defined functions that call built-in hooks to encapsulate and reuse stateful logic across components.",
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
    explanation: "Custom hooks are user-defined functions that call built-in hooks to encapsulate and reuse stateful logic across components. Name them starting with use.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Custom Hooks in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Custom Hooks in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are Custom Hooks in React?."
    ],
    source: "150-react",
    estimatedMinutes: 3
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
        text: "Steps: Create a state with useState for each input Bind input value to state Update state in onChange handlers Handle submission in onSubmit and prevent default behavior Example: import React, { useState } from 'react';function MyForm() { const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState(''); const handleSubmit = (e) => { e.",
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
    explanation: "Steps: Create a state with useState for each input Bind input value to state Update state in onChange handlers Handle submission in onSubmit and prevent default behavior Example: import React, { useState } from 'react';function MyForm() { const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState(''); const handleSubmit = (e) => { e.preventDefault(); console.log('Form submitted:', { name, email, message }); }; return ( <form onSubmit={handleSubmit}> <div> <label>Name:</label> <input type=\"text\" value={name} onChange={e => setName(e.target.value)} /> </div> <div> <label>Email:</label> <input type=\"email\" value={email} onChange={e => setEmail(e.target.value)} /> </div> <div> <label>Message:</label> <textarea value={message} onChange={e => setMessage(e.target.value)} /> </div> <button type=\"submit\">Submit</button> </form> );}export default MyForm;",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Create Forms in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Create Forms in React?.",
    hints: [
      "Consider the core principles and trade-offs of How to Create Forms in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "React: Library for building web UIs using HTML, CSS, and JavaScript React Native: Framework for buil",
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
    explanation: "React: Library for building web UIs using HTML, CSS, and JavaScript React Native: Framework for building native mobile apps using React principles and native UI components like View and Text",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How is React Different from React Native?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How is React Different from React Native?.",
    hints: [
      "Consider the core principles and trade-offs of How is React Different from React Native?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-state-versus-props-who-owns-what-and-where-to-lift-stat",
    title: "State Versus Props: Who Owns What and Where to Lift State",
    prompt: "State Versus Props: Who Owns What and Where to Lift State \u2014 explain the behavior and mechanism.",
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
        text: "Props are inputs from parent components and are read-only.",
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
    explanation: "Props are inputs from parent components and are read-only. State is owned by the component that defines it and is mutable via setState or Hook setters. When to lift the state up: If two sibling components need the same piece of data, move that state to their closest common parent and pass it down as props. Keep the state as local as possible. Lift it only when multiple components must share it. Patterns: For derived values, compute them during render instead of duplicating state. For many related form fields, keep a single object state or use a form library. Use callbacks passed through props to allow children to request updates.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of State Versus Props: Who Owns What and Where to Lift State.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of State Versus Props: Who Owns What and Where to Lift State.",
    hints: [
      "Consider the core principles and trade-offs of State Versus Props: Who Owns What and Where to Lift State."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-prop-drilling-why-it-happens-and-how-to-avoid-it",
    title: "Prop Drilling: Why It Happens and How to Avoid It",
    prompt: "Prop Drilling: Why It Happens and How to Avoid It \u2014 explain the behavior and mechanism.",
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
        text: "Prop drilling is passing props down through intermediate components that do not use them, just to reach a deeply nested child.",
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
    explanation: "Prop drilling is passing props down through intermediate components that do not use them, just to reach a deeply nested child. It creates tight coupling and noisy component signatures. Alternatives: Lift state to a common ancestor and pass only what is needed. Use Context for app-wide or cross-subtree data like theme or auth. Use composition patterns or custom hooks to expose behavior without deep prop chains. Practical rule: Use Context when many components across the tree need the same value and prop passing becomes repetitive.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Prop Drilling: Why It Happens and How to Avoid It.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Prop Drilling: Why It Happens and How to Avoid It.",
    hints: [
      "Consider the core principles and trade-offs of Prop Drilling: Why It Happens and How to Avoid It."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-react-hooks-overview-moving-state-and-lifecycle-into-fu",
    title: "React Hooks Overview: Moving State and Lifecycle Into Functions",
    prompt: "React Hooks Overview: Moving State and Lifecycle Into Functions \u2014 explain the behavior and mechanism.",
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
        text: "Hooks are functions like useState and useEffect that let you manage state and side effects in functional components.",
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
    explanation: "Hooks are functions like useState and useEffect that let you manage state and side effects in functional components. They let you reuse logic via custom hooks and reduce the need for class components. Key points: Hooks must be called at the top level of a function component or inside custom hooks. They let you compose behavior across components without changing component hierarchy.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of React Hooks Overview: Moving State and Lifecycle Into Functions.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of React Hooks Overview: Moving State and Lifecycle Into Functions.",
    hints: [
      "Consider the core principles and trade-offs of React Hooks Overview: Moving State and Lifecycle Into Functions."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-useeffect-explained-running-effects-and-dependency-cont",
    title: "useEffect explained: Running Effects and Dependency Control",
    prompt: "useEffect explained: Running Effects and Dependency Control \u2014 explain the behavior and mechanism.",
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
        text: "useEffect runs after render for side effects like data fetching or document updates.",
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
    explanation: "useEffect runs after render for side effects like data fetching or document updates. It accepts a function and an optional dependencies array. If you pass dependencies, React runs the effect only when any dependency changes. If you return a function from the effect, React runs that as cleanup before the next effect or unmount. Example: useEffect(() => { fetchData(); return () => cancelFetch();}, [userId]); Best practices: Keep effects focused on a single job. Avoid recreating functions inside dependencies unless needed. Use abort controllers for fetches to cancel stale requests.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useEffect explained: Running Effects and Dependency Control.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useEffect explained: Running Effects and Dependency Control.",
    hints: [
      "Consider the core principles and trade-offs of useEffect explained: Running Effects and Dependency Control."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-useref-and-refs-in-hooks-when-to-use-them",
    title: "useRef and refs in Hooks: When to Use Them",
    prompt: "useRef and refs in Hooks: When to Use Them \u2014 explain the behavior and mechanism.",
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
        text: "useRef returns a mutable ref object that survives renders.",
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
    explanation: "useRef returns a mutable ref object that survives renders. Use it to access DOM nodes, store timers, or keep mutable values without triggering re-renders. Examples: Managing focus: inputRef.current.focus() Storing previous props: prevRef.current = currentValue Integrating non-React libraries that require DOM elements",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useRef and refs in Hooks: When to Use Them.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useRef and refs in Hooks: When to Use Them.",
    hints: [
      "Consider the core principles and trade-offs of useRef and refs in Hooks: When to Use Them."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-custom-hooks-reusable-logic-with-a-simple-rule",
    title: "Custom Hooks: Reusable Logic With a Simple Rule",
    prompt: "Custom Hooks: Reusable Logic With a Simple Rule \u2014 explain the behavior and mechanism.",
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
        text: "Custom Hooks are functions whose names start with use and that call other Hooks.",
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
    explanation: "Custom Hooks are functions whose names start with use and that call other Hooks. They package reusable behavior like data fetching, form state, or subscriptions and return values or callbacks to the component. Example: function useFetch(url) { const [data, setData] = useState(null); useEffect(() => { fetch(url).then(r => r.json()).then(setData); }, [url]); return data;} Rules: Follow Hook rules when writing custom hooks. Do not use them inside class components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Custom Hooks: Reusable Logic With a Simple Rule.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Custom Hooks: Reusable Logic With a Simple Rule.",
    hints: [
      "Consider the core principles and trade-offs of Custom Hooks: Reusable Logic With a Simple Rule."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-smooth-postlogin-redirect-automatic-navigation-after-au",
    title: "Smooth Post\ufffd\ufffd\ufffdLogin Redirect \ufffd\ufffd\ufffd Automatic Navigation After Authentication",
    prompt: "Smooth Post\ufffd\ufffd\ufffdLogin Redirect \ufffd\ufffd\ufffd Automatic Navigation After Authentication \u2014 explain the behavior and mechanism.",
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
        text: "Render a redirect from your router when authentication completes, or navigate programmatically.",
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
    explanation: "Render a redirect from your router when authentication completes, or navigate programmatically. In react\ufffd\ufffd\ufffdrouter v5 you can use <Redirect>, and in v6 use the useNavigate hook. Preserve the intended destination in state to return users to where they started, and validate any returnTo value to avoid open redirect attacks. Example v5 (conditional render): class Login extends React.Component { state = { loggedIn: false }; render() { if (this.state.loggedIn) { return <Redirect to=\"/dashboard\" />; } return <form>{/* login form */}</form>; }} Example v6 (programmatic): import { useNavigate, useLocation } from 'react-router-dom';function Login() { const navigate = useNavigate(); const location = useLocation(); const from = (location.state && location.state.from) || '/'; async function onSuccess() { // set token etc navigate(from, { replace: true }); // replace prevents back to login } return <form onSubmit={submit}>...</form>;} Best practices: Use replace for the final redirect to avoid leaving login in history. Store the intended path in location.state or a safe cookie. Validate returnTo against an allowlist to prevent open redirects. For SSR, perform redirect on the server by returning a 302 or by hydrating to the right route.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Smooth Post\ufffd\ufffd\ufffdLogin Redirect \ufffd\ufffd\ufffd Automatic Navigation After Authentication.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Smooth Post\ufffd\ufffd\ufffdLogin Redirect \ufffd\ufffd\ufffd Automatic Navigation After Authentication.",
    hints: [
      "Consider the core principles and trade-offs of Smooth Post\ufffd\ufffd\ufffdLogin Redirect \ufffd\ufffd\ufffd Automatic Navigation After Authentication."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-simple-react-hooks-example-state-effect-and-a-controlle",
    title: "Simple React Hooks Example \ufffd\ufffd\ufffd State, Effect, and a Controlled Input",
    prompt: "Simple React Hooks Example \ufffd\ufffd\ufffd State, Effect, and a Controlled Input \u2014 explain the behavior and mechanism.",
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
        text: "A compact, interview\ufffd\ufffd\ufffdfriendly example shows useState and useEffect and demonstrates lifecycle equivalence.",
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
    explanation: "A compact, interview\ufffd\ufffd\ufffdfriendly example shows useState and useEffect and demonstrates lifecycle equivalence. Example: import { useState, useEffect } from 'react';function SearchList({ items }) { const [query, setQuery] = useState(''); const [results, setResults] = useState(items); useEffect(() => { setResults(items.filter(i => i.name.includes(query))); }, [query, items]); return ( <div> <input value={query} onChange={e => setQuery(e.target.value)} /> <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul> </div> );} Tips for interviews: Explain how useEffect combines mount/update/unmount logic. Show how to extract behavior into custom hooks for reuse.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Simple React Hooks Example \ufffd\ufffd\ufffd State, Effect, and a Controlled Input.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Simple React Hooks Example \ufffd\ufffd\ufffd State, Effect, and a Controlled Input.",
    hints: [
      "Consider the core principles and trade-offs of Simple React Hooks Example \ufffd\ufffd\ufffd State, Effect, and a Controlled Input."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-react-router-essentials-modern-routing-and-hooks",
    title: "React Router Essentials \ufffd\ufffd\ufffd Modern Routing and Hooks",
    prompt: "React Router Essentials \ufffd\ufffd\ufffd Modern Routing and Hooks \u2014 explain the behavior and mechanism.",
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
        text: "React Router provides client routing with sync to URL.",
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
    explanation: "React Router provides client routing with sync to URL. v6 simplified route structure and introduced hooks like useNavigate, useParams, useLocation, and useRoutes for nested routing. Key points: Use nested routes to match component hierarchy. Prefer hooks over HOCs; they return simple primitives for navigation and params. For SSR, render routes on the server and handle redirects by checking matched routes during render. Example: import { Routes, Route } from 'react-router-dom';<Routes> <Route path=\"/\" element={<Home/>}/> <Route path=\"users/:id\" element={<User/>}/></Routes>",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of React Router Essentials \ufffd\ufffd\ufffd Modern Routing and Hooks.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of React Router Essentials \ufffd\ufffd\ufffd Modern Routing and Hooks.",
    hints: [
      "Consider the core principles and trade-offs of React Router Essentials \ufffd\ufffd\ufffd Modern Routing and Hooks."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-do-hooks-cover-class-functionality-mapping-and-exceptio",
    title: "Do Hooks Cover Class Functionality \ufffd\ufffd\ufffd Mapping and Exceptions",
    prompt: "Do Hooks Cover Class Functionality \ufffd\ufffd\ufffd Mapping and Exceptions \u2014 explain the behavior and mechanism.",
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
        text: "Hooks cover mount/update/unmount flows via useEffect and support state via useState and useReducer.",
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
    explanation: "Hooks cover mount/update/unmount flows via useEffect and support state via useState and useReducer. Some class features remain class-only today: Limitations: Error boundaries still require class components (componentDidCatch) until APIs expand. Certain lifecycle control patterns map awkwardly but usually have hook equivalents. Pattern guidance: Use useEffect cleanup for unmount logic. Combine hooks or create custom hooks to model complex lifecycle sequences.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do Hooks Cover Class Functionality \ufffd\ufffd\ufffd Mapping and Exceptions.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do Hooks Cover Class Functionality \ufffd\ufffd\ufffd Mapping and Exceptions.",
    hints: [
      "Consider the core principles and trade-offs of Do Hooks Cover Class Functionality \ufffd\ufffd\ufffd Mapping and Exceptions."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-lifecycle-methods-class-methods-and-hook-equivalents",
    title: "Lifecycle Methods \ufffd\ufffd\ufffd Class Methods and Hook Equivalents",
    prompt: "Lifecycle Methods \ufffd\ufffd\ufffd Class Methods and Hook Equivalents \u2014 explain the behavior and mechanism.",
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
        text: "Class methods: constructor getDerivedStateFromProps render componentDidMount shouldComponentUpdate getSnapshotBeforeUpdate componentDidUpdate componentWillUnmount Hook mappings: Mount/update/unmount: useEffect Synchronous DOM reads: useLayoutEffect.",
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
    explanation: "Class methods: constructor getDerivedStateFromProps render componentDidMount shouldComponentUpdate getSnapshotBeforeUpdate componentDidUpdate componentWillUnmount Hook mappings: Mount/update/unmount: useEffect Synchronous DOM reads: useLayoutEffect. Avoid getSnapshotBeforeUpdate by capturing values in refs before update.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Lifecycle Methods \ufffd\ufffd\ufffd Class Methods and Hook Equivalents.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Lifecycle Methods \ufffd\ufffd\ufffd Class Methods and Hook Equivalents.",
    hints: [
      "Consider the core principles and trade-offs of Lifecycle Methods \ufffd\ufffd\ufffd Class Methods and Hook Equivalents."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-component-lifecycle-phases-initialization-to-unmount",
    title: "Component Lifecycle Phases \ufffd\ufffd\ufffd Initialization to Unmount",
    prompt: "Component Lifecycle Phases \ufffd\ufffd\ufffd Initialization to Unmount \u2014 explain the behavior and mechanism.",
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
        text: "Phases: Initialization: set initial state and props.",
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
    explanation: "Phases: Initialization: set initial state and props. Mounting: component enters DOM; use componentDidMount or useEffect with empty deps. Updating: triggered by props or state changes; use componentDidUpdate or useEffect with deps. Unmounting: cleanup subscriptions with componentWillUnmount or effect return.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Component Lifecycle Phases \ufffd\ufffd\ufffd Initialization to Unmount.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Component Lifecycle Phases \ufffd\ufffd\ufffd Initialization to Unmount.",
    hints: [
      "Consider the core principles and trade-offs of Component Lifecycle Phases \ufffd\ufffd\ufffd Initialization to Unmount."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-higherorder-components-when-and-how-to-abstract-behavio",
    title: "Higher\ufffd\ufffd\ufffdOrder Components \ufffd\ufffd\ufffd When and How to Abstract Behavior",
    prompt: "Higher\ufffd\ufffd\ufffdOrder Components \ufffd\ufffd\ufffd When and How to Abstract Behavior \u2014 explain the behavior and mechanism.",
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
        text: "HOC = function that takes a component and returns a new component.",
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
    explanation: "HOC = function that takes a component and returns a new component. Use HOCs to share behavior like subscriptions, data sources, or feature toggles. Example HOC: function withData(Wrapped, select) { return class extends React.Component { state = { data: select(DataSource) }; componentDidMount() { DataSource.subscribe(this.update); } componentWillUnmount() { DataSource.unsubscribe(this.update); } update = () => this.setState({ data: select(DataSource) }); render() { return <Wrapped {...this.props} data={this.state.data} />; } };} Pitfalls and alternatives: HOCs can obscure props and refs; use forwardRef where needed. Consider hooks and composition as simpler alternatives for new code. Preserve displayName and static methods when wrapping.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Higher\ufffd\ufffd\ufffdOrder Components \ufffd\ufffd\ufffd When and How to Abstract Behavior.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Higher\ufffd\ufffd\ufffdOrder Components \ufffd\ufffd\ufffd When and How to Abstract Behavior.",
    hints: [
      "Consider the core principles and trade-offs of Higher\ufffd\ufffd\ufffdOrder Components \ufffd\ufffd\ufffd When and How to Abstract Behavior."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-passing-data-between-components-patterns-from-props-to",
    title: "Passing Data Between Components \ufffd\ufffd\ufffd Patterns From Props to Context",
    prompt: "Passing Data Between Components \ufffd\ufffd\ufffd Patterns From Props to Context \u2014 explain the behavior and mechanism.",
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
        text: "Parent to child: props.",
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
    explanation: "Parent to child: props. Child to parent: callbacks passed via props. Siblings: lift state to common parent, use Context, or route state. Global: Redux, Zustand, or Context for broadly shared state. Example child-to-parent: function Parent() { const [value, setValue] = useState(0); return <Child onChange={setValue} value={value} />;}function Child({ value, onChange }) { return <button onClick={() => onChange(value + 1)}>Inc</button>;}",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Passing Data Between Components \ufffd\ufffd\ufffd Patterns From Props to Context.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Passing Data Between Components \ufffd\ufffd\ufffd Patterns From Props to Context.",
    hints: [
      "Consider the core principles and trade-offs of Passing Data Between Components \ufffd\ufffd\ufffd Patterns From Props to Context."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-ace-an-ai-company-interview-2026-guide",
    title: "How to Ace an AI Company Interview (2026 Guide)",
    prompt: "How to Ace an AI Company Interview (2026 Guide) \u2014 explain the behavior and mechanism.",
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
        text: "The shared frontier-lab interview loop for software engineers in 2026: work trials, mission rounds, a cross-lab table, and a 4-week prep plan.",
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
    explanation: "The shared frontier-lab interview loop for software engineers in 2026: work trials, mission rounds, a cross-lab table, and a 4-week prep plan. June 12, 2026Take the Next Step",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Ace an AI Company Interview (2026 Guide).",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Ace an AI Company Interview (2026 Guide).",
    hints: [
      "Consider the core principles and trade-offs of How to Ace an AI Company Interview (2026 Guide)."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-ready-to-pass-any-swe-interviews-with-100-undetectable",
    title: "Ready to Pass Any SWE Interviews with 100% Undetectable AI?",
    prompt: "Ready to Pass Any SWE Interviews with 100% Undetectable AI?",
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
        text: "Step into your next interview with AI support designed to stay completely undetectable.",
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
    explanation: "Step into your next interview with AI support designed to stay completely undetectable. Get for WindowsGet for MacInterview Coder Interview Coder is a desktop app designed to help job seekers ace technical interviews by providing real-time assistance with coding questions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Ready to Pass Any SWE Interviews with 100% Undetectable AI?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Ready to Pass Any SWE Interviews with 100% Undetectable AI?.",
    hints: [
      "Consider the core principles and trade-offs of Ready to Pass Any SWE Interviews with 100% Undetectable AI?."
    ],
    source: "150-react",
    estimatedMinutes: 2
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
        text: "If the component needs state or lifecycle methods then use class component otherwise use function component.",
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
    explanation: "If the component needs state or lifecycle methods then use class component otherwise use function component. However, from React 16.8 with the addition of Hooks, you could use state , lifecycle methods and other features that were only available in class component right in your function component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When to use a Class Component over a Function Component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When to use a Class Component over a Function Component?.",
    hints: [
      "Consider the core principles and trade-offs of When to use a Class Component over a Function Component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Below are some of the main differences between HTML and React event handling, In HTML, the event name should be in lowercase: Whereas in React it follows camelCase convention: In HTML, you can return false to prevent default behavior: Whereas in React you must call preventDefault() explicitly: In HTML, you need to invoke the function by appending () Whereas in react you should not append () with the function name.",
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
    explanation: "Below are some of the main differences between HTML and React event handling, In HTML, the event name should be in lowercase: Whereas in React it follows camelCase convention: In HTML, you can return false to prevent default behavior: Whereas in React you must call preventDefault() explicitly: In HTML, you need to invoke the function by appending () Whereas in react you should not append () with the function name. (refer \"activateLasers\" function in the first point for example) \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between HTML and React event handling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between HTML and React event handling?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between HTML and React event handling?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can use an arrow function to wrap around an event handler and pass parameters: This is an equivalent to calling.",
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
    explanation: "You can use an arrow function to wrap around an event handler and pass parameters: This is an equivalent to calling .bind: Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass a parameter to an event handler or callback?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass a parameter to an event handler or callback?.",
    hints: [
      "Consider the core principles and trade-offs of How to pass a parameter to an event handler or callback?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "SyntheticEvent is a cross-browser wrapper around the browser's native event.",
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
    explanation: "SyntheticEvent is a cross-browser wrapper around the browser's native event. It's API is same as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are synthetic events in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are synthetic events in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are synthetic events in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.",
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
    explanation: "Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are forward refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are forward refs?.",
    hints: [
      "Consider the core principles and trade-offs of What are forward refs?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "It is preferred to use callback refs over findDOMNode() API.",
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
    explanation: "It is preferred to use callback refs over findDOMNode() API. Because findDOMNode() prevents certain improvements in React in the future. The legacy approach of using findDOMNode: The recommended approach is: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Which is preferred option with in callback refs and findDOMNode()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Which is preferred option with in callback refs and findDOMNode()?.",
    hints: [
      "Consider the core principles and trade-offs of Which is preferred option with in callback refs and findDOMNode()?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React v15 provided very basic support for error boundaries using unstable_handleError method.",
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
    explanation: "React v15 provided very basic support for error boundaries using unstable_handleError method. It has been renamed to componentDidCatch in React v16. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How error boundaries handled in React v15?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How error boundaries handled in React v15?.",
    hints: [
      "Consider the core principles and trade-offs of How error boundaries handled in React v15?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can decorate your class components, which is the same as passing the component into a function.",
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
    explanation: "You can decorate your class components, which is the same as passing the component into a function. Decorators are flexible and readable way of modifying component functionality. Note: Decorators are a feature that didn't make it into ES7, but are currently a stage 2 proposal. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How you use decorators in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How you use decorators in React?.",
    hints: [
      "Consider the core principles and trade-offs of How you use decorators in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.",
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
    explanation: "Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do Hooks replace render props and higher order components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do Hooks replace render props and higher order components?.",
    hints: [
      "Consider the core principles and trade-offs of Do Hooks replace render props and higher order components?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "It is recommended to name the component by reference instead of using displayName.",
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
    explanation: "It is recommended to name the component by reference instead of using displayName. Using displayName for naming component: The recommended approach: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the recommended way for naming components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the recommended way for naming components?.",
    hints: [
      "Consider the core principles and trade-offs of What is the recommended way for naming components?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "The component names should start with a uppercase letter but there are few exceptions on this convention.",
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
    explanation: "The component names should start with a uppercase letter but there are few exceptions on this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names. For example the below tag can be compiled to a valid component, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the exceptions on React component naming?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the exceptions on React component naming?.",
    hints: [
      "Consider the core principles and trade-offs of What are the exceptions on React component naming?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React (or JSX) doesn't support variable interpolation inside an attribute value.",
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
    explanation: "React (or JSX) doesn't support variable interpolation inside an attribute value. The below representation won't work: But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works: Using template strings will also work: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you access props in attribute quotes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you access props in attribute quotes?.",
    hints: [
      "Consider the core principles and trade-offs of How do you access props in attribute quotes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
    codeSnippet: "<div className=\"btn-panel {this.props.visible ? 'show' : 'hidden'}\">\n\n<div className={'btn-panel ' + (this.props.visible ? 'show' : 'hidden')}>\n\n<div className={`btn-panel ${this.props.visible ? 'show' : 'hidden'}`}>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You shouldn't use curly braces inside quotes because it is going to be evaluated as a string.",
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
    explanation: "You shouldn't use curly braces inside quotes because it is going to be evaluated as a string. Instead you need to move curly braces outside (don't forget to include spaces between class names): Template strings will also work: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to conditionally apply class attributes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to conditionally apply class attributes?.",
    hints: [
      "Consider the core principles and trade-offs of How to conditionally apply class attributes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "We can use <pre> tag so that the formatting of the JSON.",
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
    explanation: "We can use <pre> tag so that the formatting of the JSON.stringify() is retained: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pretty print JSON with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pretty print JSON with React?.",
    hints: [
      "Consider the core principles and trade-offs of How to pretty print JSON with React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "The React philosophy is that props should be immutable and top-down.",
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
    explanation: "The React philosophy is that props should be immutable and top-down. This means that a parent can send any prop values to a child, but the child can't modify received props. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why you can't update props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why you can't update props in React?.",
    hints: [
      "Consider the core principles and trade-offs of Why you can't update props in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can use React.",
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
    explanation: "You can use React.version to get the version. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How can we find the version of React at runtime in the browser?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How can we find the version of React at runtime in the browser?.",
    hints: [
      "Consider the core principles and trade-offs of How can we find the version of React at runtime in the browser?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You just need to use HTTPS=true configuration.",
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
    explanation: "You just need to use HTTPS=true configuration. You can edit your package.json scripts section: or just run set HTTPS=true && npm start \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use https instead of http in create-react-app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use https instead of http in create-react-app?.",
    hints: [
      "Consider the core principles and trade-offs of How to use https instead of http in create-react-app?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Create a file called.",
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
    explanation: "Create a file called .env in the project root and write the import path: After that restart the development server. Now you should be able to import anything inside src/app without relative paths. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to avoid using relative path imports in create-react-app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to avoid using relative path imports in create-react-app?.",
    hints: [
      "Consider the core principles and trade-offs of How to avoid using relative path imports in create-react-app?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Add a listener on the history object to record each page view: \ufffd\ufffd\ufffd Back to Top",
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
    explanation: "Add a listener on the history object to record each page view: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to add Google Analytics for React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to add Google Analytics for React Router?.",
    hints: [
      "Consider the core principles and trade-offs of How to add Google Analytics for React Router?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You should use default for exporting the components With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.",
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
    explanation: "You should use default for exporting the components With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to import and export components using React and ES6?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to import and export components using React and ES6?.",
    hints: [
      "Consider the core principles and trade-offs of How to import and export components using React and ES6?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can use ES7 static field to define constant.",
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
    explanation: "You can use ES7 static field to define constant. Static fields are part of the Class Fields stage 3 proposal. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to define constants in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to define constants in React?.",
    hints: [
      "Consider the core principles and trade-offs of How to define constants in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "It is recommended to avoid hard coding style values in components.",
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
    explanation: "It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules. For example, these styles could be extracted into a separate component: And then imported individually in other components: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the benefit of styles modules?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the benefit of styles modules?.",
    hints: [
      "Consider the core principles and trade-offs of What is the benefit of styles modules?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Below are the list of steps to get history object on React Router v4, Create a module that exports a history object and import this module across the project.",
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
    explanation: "Below are the list of steps to get history object on React Router v4, Create a module that exports a history object and import this module across the project. For example, create history.js file: You should use the <Router> component instead of built-in routers. Imported the above history.js inside index.js file: You can also use push method of history object similar to built-in history object: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get history on React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get history on React Router v4?.",
    hints: [
      "Consider the core principles and trade-offs of How to get history on React Router v4?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can get the current locale in any component of your application using injectIntl(): \ufffd\ufffd\ufffd Back to",
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
    explanation: "You can get the current locale in any component of your application using injectIntl(): \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access current locale with React Intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access current locale with React Intl?.",
    hints: [
      "Consider the core principles and trade-offs of How to access current locale with React Intl?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "ReactTestUtils are provided in the with-addons package and allow you to perform actions against a simulated DOM for the purpose of unit testing.",
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
    explanation: "ReactTestUtils are provided in the with-addons package and allow you to perform actions against a simulated DOM for the purpose of unit testing. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of ReactTestUtils package?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of ReactTestUtils package?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of ReactTestUtils package?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Jest is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a jsdom environment.",
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
    explanation: "Jest is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a jsdom environment. It's often used for testing components. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Jest?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Jest?.",
    hints: [
      "Consider the core principles and trade-offs of What is Jest?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "DOM manipulation is very expensive which causes applications to behave slow and inefficient.",
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
    explanation: "DOM manipulation is very expensive which causes applications to behave slow and inefficient. Due to circular dependencies, a complicated model was created around models and views. Lot of data changes happens for collaborative applications(like Google Docs). No way to do undo (travel back in time) easily without adding so much extra code. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the drawbacks of MVW pattern?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the drawbacks of MVW pattern?.",
    hints: [
      "Consider the core principles and trade-offs of What are the drawbacks of MVW pattern?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React Native can be tested only in mobile simulators like iOS and Android.",
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
    explanation: "React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to test React Native apps?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to test React Native apps?.",
    hints: [
      "Consider the core principles and trade-offs of How to test React Native apps?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can use console.",
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
    explanation: "You can use console.log, console.warn, etc. As of React Native v0.29 you can simply run the following to see logs in the console: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to do logging in React Native?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to do logging in React Native?.",
    hints: [
      "Consider the core principles and trade-offs of How to do logging in React Native?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "If you opened a local HTML file in your browser (file://.",
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
    explanation: "If you opened a local HTML file in your browser (file://...) then you must first open Chrome Extensions and check Allow access to file URLs. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is DevTools not loading in Chrome for local files?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is DevTools not loading in Chrome for local files?.",
    hints: [
      "Consider the core principles and trade-offs of Why is DevTools not loading in Chrome for local files?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React has the following advantages over Vue.",
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
    explanation: "React has the following advantages over Vue.js: Gives more flexibility in large apps developing. Easier to test. Suitable for mobile apps creating. More information and solutions available. Note: The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of React over Vue.js?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of React over Vue.js?.",
    hints: [
      "Consider the core principles and trade-offs of What are the advantages of React over Vue.js?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "When the page loads, React DevTools sets a global named __REACT_DEVTOOLS_GLOBAL_HOOK__, then React communicates with that hook during initialization.",
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
    explanation: "When the page loads, React DevTools sets a global named __REACT_DEVTOOLS_GLOBAL_HOOK__, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won't show up the tab. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why React tab is not showing up in DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why React tab is not showing up in DevTools?.",
    hints: [
      "Consider the core principles and trade-offs of Why React tab is not showing up in DevTools?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "styled-components is a JavaScript library for styling React applications.",
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
    explanation: "styled-components is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Styled Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Styled Components?.",
    hints: [
      "Consider the core principles and trade-offs of What are Styled Components?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.",
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
    explanation: "Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Relay?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Relay?.",
    hints: [
      "Consider the core principles and trade-offs of What is Relay?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Let's take calculations and different amounts of a shipment order with the simplified usage of Resel",
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
    explanation: "Let's take calculations and different amounts of a shipment order with the simplified usage of Reselect: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Give an example of Reselect usage?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Give an example of Reselect usage?.",
    hints: [
      "Consider the core principles and trade-offs of Give an example of Reselect usage?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can import SVG directly as component instead of loading it as a file.",
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
    explanation: "You can import SVG directly as component instead of loading it as a file. This feature is available with react-scripts@2.0.0 and higher. Note: Don't forget about the curly braces in the import. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I import an SVG file as react component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I import an SVG file as react component?.",
    hints: [
      "Consider the core principles and trade-offs of Can I import an SVG file as react component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You should be passing the numbers via curly braces({}) where as strings in quotes \ufffd\ufffd\ufffd Back to Top",
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
    explanation: "You should be passing the numbers via curly braces({}) where as strings in quotes \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass numbers to React component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass numbers to React component?.",
    hints: [
      "Consider the core principles and trade-offs of How to pass numbers to React component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Hooks is a new feature(React 16.",
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
    explanation: "Hooks is a new feature(React 16.8) that lets you use state and other React features without writing a class. Let's see an example of useState hook example, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are hooks?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You need to follow two rules in order to use hooks, Call Hooks only at the top level of your react functions.",
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
    explanation: "You need to follow two rules in order to use hooks, Call Hooks only at the top level of your react functions. i.e, You shouldn\ufffd\ufffd\ufffdt call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple useState and useEffect calls. Call Hooks from React Functions only. i.e, You shouldn\ufffd\ufffd\ufffdt call Hooks from regular JavaScript functions. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules needs to follow for hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules needs to follow for hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are the rules needs to follow for hooks?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React team released an ESLint plugin called eslint-plugin-react-hooks that enforces these two rules.",
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
    explanation: "React team released an ESLint plugin called eslint-plugin-react-hooks that enforces these two rules. You can add this plugin to your project using the below command, And apply the below config in your ESLint config file, Note: This plugin is intended to use in Create React App by default. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to ensure hooks followed the rules in your project?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to ensure hooks followed the rules in your project?.",
    hints: [
      "Consider the core principles and trade-offs of How to ensure hooks followed the rules in your project?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Below are the main benefits of React Router V4 module, In React Router v4(version 4), the API is completely about components.",
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
    explanation: "Below are the main benefits of React Router V4 module, In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(<BrowserRouter>) which wraps specific child router components(<Route>). You don't need to manually set history. The router module will take care history by wrapping routes with <BrowserRouter> component. The application size is reduced by adding only the specific router module(Web, core, or native) \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of React Router V4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of React Router V4?.",
    hints: [
      "Consider the core principles and trade-offs of What are the benefits of React Router V4?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
    codeSnippet: "class MyButton extends React.Component {\n  // ...\n}\n\nMyButton.defaultProps = {\n  color: 'red',\n};\n\nrender() {\n  return <MyButton /> ; // props.color will be set to red\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The defaultProps are defined as a property on the component class to set the default props for the class.",
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
    explanation: "The defaultProps are defined as a property on the component class to set the default props for the class. This is used for undefined props, but not for null props. For example, let us create color default prop for the button component, If props.color is not provided then it will set the default value to 'red'. i.e, Whenever you try to access the color prop it uses default value Note: If you provide null value then it remains null value. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are default props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are default props?.",
    hints: [
      "Consider the core principles and trade-offs of What are default props?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10.",
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
    explanation: "React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use es5-shim and es5-sham polyfill then it even support old browsers that doesn't support ES5 methods. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the browser support for react applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the browser support for react applications?.",
    hints: [
      "Consider the core principles and trade-offs of What is the browser support for react applications?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "As of React 16, both standard or custom DOM attributes are fully supported.",
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
    explanation: "As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs. Let us take few props with respect to standard HTML attributes, These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does React support all HTML attributes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does React support all HTML attributes?.",
    hints: [
      "Consider the core principles and trade-offs of Does React support all HTML attributes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "If you pass no value for a prop, it defaults to true.",
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
    explanation: "If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML. For example, below expressions are equivalent, Note: It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, {name} which is short for {name: name}) \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When component props defaults to true?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When component props defaults to true?.",
    hints: [
      "Consider the core principles and trade-offs of When component props defaults to true?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "You can pass event handlers and other functions as props to child components.",
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
    explanation: "You can pass event handlers and other functions as props to child components. It can be used in child component as below, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you pass an event handler to a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you pass an event handler to a component?.",
    hints: [
      "Consider the core principles and trade-offs of How do you pass an event handler to a component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "If you use an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed.",
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
    explanation: "If you use an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways, Throttling: Changes based on a time based frequency. For example, it can be used using _.throttle lodash function Debouncing: Publish changes after a period of inactivity. For example, it can be used using _.debounce lodash function RequestAnimationFrame throttling: Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to prevent a function from being called multiple times?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to prevent a function from being called multiple times?.",
    hints: [
      "Consider the core principles and trade-offs of How to prevent a function from being called multiple times?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "When you declare a component as a function or a class, it must never modify its own props.",
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
    explanation: "When you declare a component as a function or a class, it must never modify its own props. Let us take a below capital function, The above function is called \ufffd\ufffd\ufffdpure\ufffd\ufffd\ufffd because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying \"All React components must act like pure functions with respect to their props.\" \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you say that props are read only?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you say that props are read only?.",
    hints: [
      "Consider the core principles and trade-offs of How do you say that props are read only?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "In React, it is recommend using composition instead of inheritance to reuse code between components.",
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
    explanation: "In React, it is recommend using composition instead of inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component\ufffd\ufffd\ufffds look and behavior in an explicit and safe way. Whereas, If you want to reuse non-UI functionality between components, it is suggested to extracting it into a separate JavaScript module. Later components import it and use that function, object, or a class, without extending it. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do you not required to use inheritance?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do you not required to use inheritance?.",
    hints: [
      "Consider the core principles and trade-offs of Why do you not required to use inheritance?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Yes, you can use web components in a react application.",
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
    explanation: "Yes, you can use web components in a react application. Even though many developers won't use this combination, it may require especially if you are using third-party UI components that are written using Web Components. For example, let us use Vaadin date picker web component as below, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I use web components in react application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I use web components in react application?.",
    hints: [
      "Consider the core principles and trade-offs of Can I use web components in react application?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "The dynamic import() syntax is a ECMAScript proposal not currently part of the language standard.",
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
    explanation: "The dynamic import() syntax is a ECMAScript proposal not currently part of the language standard. It is expected to be accepted in the near future. You can achieve code-splitting into your app using dynamic import. Let's take an example of addition, Normal Import Dynamic Import \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is dynamic import?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is dynamic import?.",
    hints: [
      "Consider the core principles and trade-offs of What is dynamic import?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-is-it-ref-argument-available-for-all-functions-or-class",
    title: "Is it ref argument available for all functions or class components?",
    prompt: "Is it ref argument available for all functions or class components?",
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
        text: "Regular function or class components don\ufffd\ufffd\ufffdt receive the ref argument, and ref is not available in props either.",
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
    explanation: "Regular function or class components don\ufffd\ufffd\ufffdt receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it ref argument available for all functions or class components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it ref argument available for all functions or class components?.",
    hints: [
      "Consider the core principles and trade-offs of Is it ref argument available for all functions or class components?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "There are few use cases to go for refs, Managing focus, text selection, or media playback.",
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
    explanation: "There are few use cases to go for refs, Managing focus, text selection, or media playback. Triggering imperative animations. Integrating with third-party DOM libraries. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When do you need to use refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When do you need to use refs?.",
    hints: [
      "Consider the core principles and trade-offs of When do you need to use refs?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-can-you-list-down-top-websites-or-applications-using-re",
    title: "Can you list down top websites or applications using react as front end framework?",
    prompt: "Can you list down top websites or applications using react as front end framework?",
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
        text: "Below are the top 10 websites using React as their front-end framework, Facebook Uber Instagram What",
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
    explanation: "Below are the top 10 websites using React as their front-end framework, Facebook Uber Instagram WhatsApp Khan Academy Airbnb Dropbox Flipboard Netflix PayPal \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can you list down top websites or applications using react as front end framework?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can you list down top websites or applications using react as front end framework?.",
    hints: [
      "Consider the core principles and trade-offs of Can you list down top websites or applications using react as front end framework?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate *.",
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
    explanation: "React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate *.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it recommended to use CSS In JS technique in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it recommended to use CSS In JS technique in React?.",
    hints: [
      "Consider the core principles and trade-offs of Is it recommended to use CSS In JS technique in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "The effect hook called useEffect is used to fetch the data with axios from the API and to set the data in the local state of the component with the state hook\ufffd\ufffd\ufffds update function.",
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
    explanation: "The effect hook called useEffect is used to fetch the data with axios from the API and to set the data in the local state of the component with the state hook\ufffd\ufffd\ufffds update function. Let's take an example in which it fetches list of react articles from the API Remember we provided an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component. i.e, It fetches only for component mount. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to fetch data with React Hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to fetch data with React Hooks?.",
    hints: [
      "Consider the core principles and trade-offs of How to fetch data with React Hooks?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-is-hooks-cover-all-use-cases-for-classes",
    title: "Is Hooks cover all use cases for classes?",
    prompt: "Is Hooks cover all use cases for classes?",
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
        text: "Hooks doesn't cover all use cases of classes but there is a plan to add them soon.",
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
    explanation: "Hooks doesn't cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon getSnapshotBeforeUpdate and componentDidCatch lifecycles yet. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is Hooks cover all use cases for classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is Hooks cover all use cases for classes?.",
    hints: [
      "Consider the core principles and trade-offs of Is Hooks cover all use cases for classes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React includes a stable implementation of React Hooks in 16.",
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
    explanation: "React includes a stable implementation of React Hooks in 16.8 release for below packages React DOM React DOM Server React Test Renderer React Shallow Renderer \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the stable release for hooks support?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the stable release for hooks support?.",
    hints: [
      "Consider the core principles and trade-offs of What is the stable release for hooks support?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "When we declare a state variable with useState, it returns a pair \ufffd\ufffd\ufffd an array with two items.",
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
    explanation: "When we declare a state variable with useState, it returns a pair \ufffd\ufffd\ufffd an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead. For example, the array index access would look as follows: Whereas with array destructuring the variables can be accessed as follows: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do we use array destructuring (square brackets notation) in useState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do we use array destructuring (square brackets notation) in useState?.",
    hints: [
      "Consider the core principles and trade-offs of Why do we use array destructuring (square brackets notation) in useState?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Hooks got the ideas from several different sources.",
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
    explanation: "Hooks got the ideas from several different sources. Below are some of them, Previous experiments with functional APIs in the react-future repository Community experiments with render prop APIs such as Reactions Component State variables and state cells in DisplayScript. Subscriptions in Rx. Reducer components in ReasonReact. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the sources used for introducing hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the sources used for introducing hooks?.",
    hints: [
      "Consider the core principles and trade-offs of What are the sources used for introducing hooks?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Web Components often expose an imperative API to implement its functions.",
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
    explanation: "Web Components often expose an imperative API to implement its functions. You will need to use a ref to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you access imperative API of web components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you access imperative API of web components?.",
    hints: [
      "Consider the core principles and trade-offs of How do you access imperative API of web components?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "No, browsers can't understand JSX code.",
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
    explanation: "No, browsers can't understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do browsers understand JSX code?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do browsers understand JSX code?.",
    hints: [
      "Consider the core principles and trade-offs of Do browsers understand JSX code?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.",
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
    explanation: "React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Describe about data flow in react?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Describe about data flow in react?.",
    hints: [
      "Consider the core principles and trade-offs of Describe about data flow in react?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "The react-scripts package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring.",
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
    explanation: "The react-scripts package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The react-scripts start command sets up the development environment and starts a server, as well as hot module reloading. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is react scripts?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is react scripts?.",
    hints: [
      "Consider the core principles and trade-offs of What is react scripts?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "Yes, you can use javascript: URLs but it will log a warning in the console.",
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
    explanation: "Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like <a href> and create a security hole. Remember that the future versions will throw an error for javascript URLs. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I use javascript urls in react16.9?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I use javascript urls in react16.9?.",
    hints: [
      "Consider the core principles and trade-offs of Can I use javascript urls in react16.9?."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.",
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
    explanation: "When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed. App.js But while using Context API, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as loadUser action will be triggered on each re-render. index.js App.js loadUser \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you make sure that user remains authenticated on page refresh while using Context API State Management?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you make sure that user remains authenticated on page refresh while using Context API State Management?.",
    hints: [
      "Consider the core principles and trade-offs of How do you make sure that user remains authenticated on page refresh while using Context API State Management?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-we-slashed-an-ai-agents-latency-by-80-in-60-minutes",
    title: "How we slashed an AI Agent's latency by 80% in 60 minutes",
    prompt: "How we slashed an AI Agent's latency by 80% in 60 minutes \u2014 explain the behavior and mechanism.",
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
        text: "Building an AI agent is fun.",
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
    explanation: "Building an AI agent is fun. Fixing its production latency when it's juggling live data, RAG, and text-to-speech? Not so fun. Read more \ufffd\ufffd\ufffd Michael Sakhniuk Follow Senior Software Engineer at Miro Location Yerevan, Armenia Education Engineer Work Frontend Engineer at Miro Joined Nov 22, 2019 More from Michael Sakhniuk Why you should avoid using arrow functions to define class methods Website Accessibility: What You Need to Know JS Math cheatsheet The DEV Team Promoted Dropdown menu What's a billboard? Manage preferences Report billboard Hacktoberfest 2026: AI belongs to everyone We have some news we're excited to share today: Major League Hacking (MLH) and DEV are partnering with DigitalOcean to run Hacktoberfest 2026. This October, we\ufffd\ufffd\ufffdll host over 300 in-person events (\ufffd\ufffd\ufffdFests\ufffd\ufffd\ufffd) plus a global online event, all about building with open source and open-weight AI. Read more \ufffd\ufffd\ufffd \ufffd\ufffd\ufffd\ufffd Kindness is contagious Dropdown menu What's a billboard? Manage preferences Report billboard Dive into this thoughtful piece, beloved in the supportive DEV Community. Coders of every background are invited to share and elevate our collective know-how. A sincere \"thank you\" can brighten someone's day\ufffd\ufffd\ufffdleave your appreciation below! On DEV, sharing knowledge smooths our journey and tightens our community bonds. Enjoyed this? A quick thank you to the author is hugely appreciated. Okay DEV Community \ufffd\ufffd\ufffd A space to discuss and keep up software development and manage your software career Home DEV Challenges DEV++ Videos DEV Education Tracks DEV Help Advertise on DEV Organization Accounts DEV Showcase About Contact Free Postgres Database DEV Shop MLH Code of Conduct Privacy Policy Terms of Use Built on Forem \ufffd\ufffd\ufffd the open source software that powers DEV and other inclusive communities. Made with love and Ruby on Rails. DEV Community \ufffd\ufffd 2016 - 2026. We're a place where coders share, stay up-to-date and grow their careers.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How we slashed an AI Agent's latency by 80% in 60 minutes.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How we slashed an AI Agent's latency by 80% in 60 minutes.",
    hints: [
      "Consider the core principles and trade-offs of How we slashed an AI Agent's latency by 80% in 60 minutes."
    ],
    source: "300-react",
    estimatedMinutes: 2
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
        text: "useEffect(fn, []) \u2014 the empty array means updates only",
        isCorrect: false,
        explanation: "An empty array is the opposite: it runs once on mount and never again."
      },
      {
        id: "B",
        text: "useEffect(fn, [count]) \u2014 it fires only when count changes",
        isCorrect: false,
        explanation: "It also fires once after the initial mount, which componentDidUpdate does not."
      },
      {
        id: "C",
        text: "useEffect(fn) with no dependency array",
        isCorrect: false,
        explanation: "That runs after every render, including the first \u2014 closer to componentDidUpdate plus componentDidMount plus more."
      },
      {
        id: "D",
        text: "There is no exact equivalent; you need a ref to skip the first run",
        isCorrect: true,
        explanation: "Correct. Every effect runs after the initial mount, so 'updates only' requires tracking that yourself."
      }
    ],
    correctAnswer: "D",
    explanation: "useEffect(fn, []) maps cleanly onto componentDidMount, and its cleanup function onto componentWillUnmount. componentDidUpdate has no exact equivalent, because every effect also runs after the initial mount \u2014 useEffect(fn, [count]) fires on mount and on each change. Skipping the first run means holding a ref and checking it. That friction is deliberate: effects are meant to synchronise with external systems based on current values, not to re-enact lifecycle hooks.",
    interviewLine: "Effects synchronise, they don't sequence. There's no 'on update only' because an effect doesn't care whether this is the first render.",
    misconception: "Assuming a dependency array means 'only when this changes'. It means 'after every render where this changed' \u2014 and the mount always counts.",
    hints: [
      "Does an effect with dependencies skip the very first render?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 3
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
        explanation: "ref.current is freely mutable \u2014 that is the point."
      },
      {
        id: "B",
        text: "Refs persist across renders but changing one does not trigger a re-render",
        isCorrect: true,
        explanation: "Correct. That is the whole distinction \u2014 same persistence, no subscription."
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
    explanation: "Both useRef and useState survive re-renders. The difference is that React subscribes to state: setting it schedules a render. A ref is a plain mutable box \u2014 writing ref.current changes the value immediately and React never notices. That makes refs right for values the UI does not display: a DOM node to focus, a timer id to clear, the previous value of a prop. It also makes them wrong for anything the render output depends on, because nothing will re-render to show the change.",
    interviewLine: "Both survive renders; only state causes one. If the UI needs to react to it, it's state \u2014 otherwise it's a ref.",
    misconception: "Reaching for a ref to avoid re-renders on a value the UI actually displays, then wondering why the screen is stale.",
    hints: [
      "Both persist. What does React do differently when each one changes?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2
  }
];
