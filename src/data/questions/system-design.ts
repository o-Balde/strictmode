import { QuizQuestion } from '../types';

export const SYSTEM_DESIGN_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-is-the-difference-between-controlled-and-uncontrol",
    title: "What is the difference between controlled and uncontrolled components?",
    prompt: "What is the difference between controlled and uncontrolled components?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeSnippet: "import { useState } from 'react'; \n\nfunction App() { \n  const [value, setValue] = useState(''); \n\n  return ( \n    <div> \n      <h3>Controlled Component</h3> \n      <input name=\"name\" value={name} onChange={(e) => setValue(e.target.value)} />\n      <button onClick={() => console.log(value)}>Get Value</button> \n    </div> \n  ); \n}\n\nimport { useRef } from 'react'; \n\nfunction App() { \n  const inputRef = useRef(null); \n\n  return ( \n    <div className=\"App\"> \n      <h3>Uncontrolled Component</h3> \n      <input type=\"text\" name=\"name\" ref={inputRef} /> \n      <button onClick={() => console.log(inputRef.current.value)}>Get Value</button> \n    </div> \n  ); \n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The difference between controlled and uncontrolled components lies in how they manage and update their state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The difference between controlled and uncontrolled components lies in how they manage and update their state. Controlled components are components where the state is controlled by React. The component receives its current value and updates it through props. It also triggers a callback function when the value changes. This means that the component doesn't store its own internal state. Instead, the parent component manages and passes the value down to the controlled component. Uncontrolled components, on the other hand, manage their own state internally using refs or other methods. They store and update their state independently, without relying on props or callbacks. The parent component has less control over the state of uncontrolled components. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between controlled and uncontrolled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between controlled and uncontrolled components?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between controlled and uncontrolled components?."
    ],
    source: "44-react",
    estimatedMinutes: 3
  },
  {
    id: "react-what-are-props-in-react",
    title: "What are props in React?",
    prompt: "What are props in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "// Parent component\nconst Parent = () => {\n  const data = \"Hello, World!\";\n\n  return (\n    <div>\n      <Child data={data} />\n    </div>\n  );\n};\n\n// Child component\nconst Child = ({ data }) => {\n  return <div>{data}</div>;\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props are data that is passed to the component from the parent.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Props are data that is passed to the component from the parent. Props are read-only and cannot be changed. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are props in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are props in React?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-a-state-manager-and-which-ones-have-you-worked",
    title: "What is a state manager and which ones have you worked with or know?",
    prompt: "What is a state manager and which ones have you worked with or know?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State manager is a tool or library that helps manage the state of an application.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "State manager is a tool or library that helps manage the state of an application. It provides a centralized store or container for storing and managing data that can be accessed and updated by different components in the application. A state manager solves several problems. Firstly, it is a good practice to separate data and the logic related to it from components. Secondly, when using local state and passing it between components, the code can become convoluted due to the potential for deep nesting of components. By having a global store, we can access and modify data from any component. Alongside React Context, Redux or MobX are commonly used as state management libraries. Learn more Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a state manager and which ones have you worked with or know?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a state manager and which ones have you worked with or know?.",
    hints: [
      "Consider the core principles and trade-offs of What is a state manager and which ones have you worked with or know?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-in-which-cases-can-you-use-local-state-and-when-should",
    title: "In which cases can you use local state and when should you use global state?",
    prompt: "In which cases can you use local state and when should you use global state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Local state is recommended to be used in cases where it is only used within one component and there are no plans to pass it to other components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Local state is recommended to be used in cases where it is only used within one component and there are no plans to pass it to other components. Local state is also used in a component representing an individual item in a list. However, if component decomposition involves nested components with data being passed down the hierarchy, it is better to use global state.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of In which cases can you use local state and when should you use global state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of In which cases can you use local state and when should you use global state?.",
    hints: [
      "Consider the core principles and trade-offs of In which cases can you use local state and when should you use global state?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-which-pattern-does-redux-implement",
    title: "Which pattern does Redux implement?",
    prompt: "Which pattern does Redux implement?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux implements the Flux pattern, which is a predictable state management pattern for applications.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux implements the Flux pattern, which is a predictable state management pattern for applications. It helps in managing the state of an application by introducing a unidirectional data flow and a centralized store for the application's state. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Which pattern does Redux implement?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Which pattern does Redux implement?.",
    hints: [
      "Consider the core principles and trade-offs of Which pattern does Redux implement?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-access-a-variable-in-mobx-state",
    title: "How to access a variable in Mobx state?",
    prompt: "How to access a variable in Mobx state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "import { observable, computed } from 'mobx';\n\nclass MyStore {\n  @observable myVariable = 'Hello Mobx';\n\n  @computed get capitalizedVariable() {\n    return this.myVariable.toUpperCase();\n  }\n}\n\nconst store = new MyStore();\nconsole.log(store.capitalizedVariable); // Output: HELLO MOBX\n\nstore.myVariable = 'Hi Mobx';\nconsole.log(store.capitalizedVariable); // Output: HI MOBX",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You can access a variable in the state by using the observable decorator to define the variable as observable.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can access a variable in the state by using the observable decorator to define the variable as observable. Here's an example: In this example, the myVariable is defined as an observable using the observable decorator. You can then access the variable using store.myVariable. Any changes made to myVariable will automatically trigger updates in dependent components or reactions. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access a variable in Mobx state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access a variable in Mobx state?.",
    hints: [
      "Consider the core principles and trade-offs of How to access a variable in Mobx state?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-props-drilling",
    title: "What is props drilling?",
    prompt: "What is props drilling?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "// Parent component\nconst Parent = () => {\n  const data = \"Hello, World!\";\n\n  return (\n    <div>\n      <ChildA data={data} />\n    </div>\n  );\n};\n\n// Intermediate ChildA component\nconst ChildA = ({ data }) => {\n  return (\n    <div>\n      <ChildB data={data} />\n    </div>\n  );\n};\n\n// Leaf ChildB component\nconst ChildB = ({ data }) => {\n  return <div>{data}</div>;\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props drilling refers to the process of passing props through multiple levels of nested components, even if some intermediate components do not directly use those props.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Props drilling refers to the process of passing props through multiple levels of nested components, even if some intermediate components do not directly use those props. This can lead to a complex and cumbersome code structure. In this example, the data prop is passed from the Parent component to ChildA, and then from ChildA to ChildB even though ChildA doesn't directly use the prop. This can become problematic when there are many levels of nesting or when the data needs to be accessed by components further down the component tree. It can make the code harder to maintain and understand. Props drilling can be mitigated by using other patterns like context or state management libraries like Redux or MobX. These approaches allow data to be accessed by components without the need for passing props through every intermediate component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is props drilling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is props drilling?.",
    hints: [
      "Consider the core principles and trade-offs of What is props drilling?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-are-the-benefits-of-using-ssr",
    title: "What are the benefits of using SSR?",
    prompt: "What are the benefits of using SSR?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Improved initial loading times: SSR allows the server to send a fully rendered HTML page to the client, reducing the amount of processing required on the client-side.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Improved initial loading times: SSR allows the server to send a fully rendered HTML page to the client, reducing the amount of processing required on the client-side. This improves the initial loading times, as the user sees a complete page more quickly. SEO-friendly: Search engines can efficiently crawl and index the content of SSR pages because the fully rendered HTML is available in the initial response. This improves search engine visibility and helps with better search rankings. Accessibility: SSR ensures that the content is accessible to users who have JavaScript disabled or use assistive technologies. By generating HTML on the server, SSR provides a reliable and accessible user experience for all users. Performance in low-bandwidth environments: SSR reduces the amount of data needed to be downloaded by the client, making it beneficial for users in low-bandwidth or high-latency environments. This is particularly important for mobile users or users with slower internet connections. While SSR offers these benefits, it's important to note that it may introduce more server load and maintenance complexity compared to client-side rendering methods. Careful consideration should be given to factors such as caching, scalability, and server-side rendering performance optimizations.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of using SSR?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of using SSR?.",
    hints: [
      "Consider the core principles and trade-offs of What are the benefits of using SSR?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-explain-conditional-rendering-in-react",
    title: "Explain conditional rendering in React.",
    prompt: "Explain conditional rendering in React. \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Architecture & Advanced Concepts",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Architecture & Advanced Concepts",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain conditional rendering in React..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain conditional rendering in React..",
    hints: [
      "Consider the core principles and trade-offs of Explain conditional rendering in React.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-are-the-advantages-of-using-react",
    title: "What are the advantages of using React?",
    prompt: "What are the advantages of using React?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "MVC is generally abbreviated as Model View Controller.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "MVC is generally abbreviated as Model View Controller. Use of Virtual DOM to improve efficiency: React uses virtual DOM to render the view. As the name suggests, virtual DOM is a virtual representation of the real DOM. Each time the data changes in a react app, a new virtual DOM gets created. Creating a virtual DOM is much faster than rendering the UI inside the browser. Therefore, with the use of virtual DOM, the efficiency of the app improves. Gentle learning curve: React has a gentle learning curve when compared to frameworks like Angular. Anyone with little knowledge of javascript can start building web applications using React. SEO friendly: React allows developers to develop engaging user interfaces that can be easily navigated in various search engines. It also allows server-side rendering, which boosts the SEO of an app. Reusable components: React uses component-based architecture for developing applications. Components are independent and reusable bits of code. These components can be shared across various applications having similar functionality. The re-use of components increases the pace of development. Huge ecosystem of libraries to choose from: React provides you with the freedom to choose the tools, libraries, and architecture for developing an application based on your requirement.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of using React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of using React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the advantages of using React?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-pass-data-between-sibling-components-using-react",
    title: "How to pass data between sibling components using React router?",
    prompt: "How to pass data between sibling components using React router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "import React, { Component } from \ufffd\ufffd\ufffdreact\ufffd\ufffd\ufffd;\nclass AppDemo extends Component {\nrender() {\n  return (\n    <Router>\n      <div className=\"AppDemo\">\n      <ul>\n        <li>\n          <NavLink to=\"/\"  activeStyle={{ color:'blue' }}>Home</NavLink>\n        </li>\n        <li>\n          <NavLink to=\"/about\"  activeStyle={{ color:'blue' }}>About\n </NavLink>\n        </li>\n </ul>\n             <Route path=\"/about/:aboutId\" component={AboutPage} />\n             <Route path=\"/about\" component={AboutPage} />\n             <Route path=\"/\" component={HomePage} />\n      </div>\n    </Router>\n  );\n}\n}\nexport default AppDemo;\n\nexport default function HomePage(props) {\n const handleClick = (data) => {\n  props.history.push('/about/' + data);\n }\nreturn (\n  <div>\n    <button onClick={() => handleClick('DemoButton')}>To About</button>\n  </div>\n)\n}\n\nexport default function AboutPage(props) {\nif(!props.match.params.aboutId) {\n    return <div>No Data Yet</div>\n}\nreturn (\n  <div>\n    {`Data obtained from HomePage is ${props.match.params.aboutId}`}\n  </div>\n)\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Passing data between sibling components of React is possible using React Router with the help of history.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Passing data between sibling components of React is possible using React Router with the help of history.push and match.params. In the code given below, we have a Parent component AppDemo.js and have two Child Components HomePage and AboutPage. Everything is kept inside a Router by using React-router Route. It is also having a route for /about/{params} where we will pass the data. The HomePage is a functional component with a button. On button click, we are using props.history.push(\ufffd\ufffd\ufffd/about/\ufffd\ufffd\ufffd + data) to programmatically navigate into /about/data. Also, the functional component AboutPage will obtain the data passed by props.match.params.aboutId. After button click in the HomePage the page will look like below:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass data between sibling components using React router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass data between sibling components using React router?.",
    hints: [
      "Consider the core principles and trade-offs of How to pass data between sibling components using React router?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-is-react-and-what-are-its-main-features",
    title: "What is React, and what are its main features?",
    prompt: "What is React, and what are its main features?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React is a JavaScript library developed by Facebook for creating user interfaces, particularly in single-page applications.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React is a JavaScript library developed by Facebook for creating user interfaces, particularly in single-page applications. It enables the use of reusable components that manage their own state. Key advantages include a component-driven architecture, optimized updates through the virtual DOM, a declarative approach for better readability, and robust community backing. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React, and what are its main features?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React, and what are its main features?.",
    hints: [
      "Consider the core principles and trade-offs of What is React, and what are its main features?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-props-in-react-how-are-they-different-from-sta",
    title: "What are props in React? How are they different from state?",
    prompt: "What are props in React? How are they different from state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props (short for properties) are inputs to React components that allow you to pass data from a parent component to a child component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Props (short for properties) are inputs to React components that allow you to pass data from a parent component to a child component. They are immutable and are used to configure a component. In contrast, state is internal to a component and can change over time, typically due to user interactions or other events. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are props in React? How are they different from state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are props in React? How are they different from state?.",
    hints: [
      "Consider the core principles and trade-offs of What are props in React? How are they different from state?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-controlled-and-uncontrol-2",
    title: "What is the difference between Controlled and Uncontrolled React components?",
    prompt: "What is the difference between Controlled and Uncontrolled React components?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeSnippet: "function ControlledInput() {  const [value, setValue] = React.useState('');  return (    <input      type=\"text\"      value={value}      onChange={(e) => setValue(e.target.value)}    />  );}\n\nfunction UncontrolledInput() {  const inputRef = React.useRef();  return <input type=\"text\" ref={inputRef} />;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "In controlled components, form data is managed through the component's state, making it the definitive source of truth.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "In controlled components, form data is managed through the component's state, making it the definitive source of truth. Input value changes are handled by event handlers. In uncontrolled components, the form state is managed internally and accessed via refs. Controlled components provide more control and are easier to test, while uncontrolled components are simpler for basic use cases. Example of a controlled component: Example of an uncontrolled component: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Controlled and Uncontrolled React components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Controlled and Uncontrolled React components?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between Controlled and Uncontrolled React components?."
    ],
    source: "100-react",
    estimatedMinutes: 3
  },
  {
    id: "react-how-would-you-lift-the-state-up-in-a-react-application",
    title: "How would you lift the state up in a React application, and why is it necessary?",
    prompt: "How would you lift the state up in a React application, and why is it necessary?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "// Lifting state upconst Parent = () => {  const [counter, setCounter] = useState(0);\n  return (    <div>      <Child1 counter={counter} />      <Child2 setCounter={setCounter} />    </div>  );};\nconst Child1 = ({ counter }) => <h1>{counter}</h1>;const Child2 = ({ setCounter }) => (  <button onClick={() => setCounter((prev) => prev + 1)}>Increment</button>);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Lifting state up in React involves moving the state from child components to their nearest common ancestor.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Lifting state up in React involves moving the state from child components to their nearest common ancestor. This pattern is used to share state between components that don't have a direct parent-child relationship. By lifting state up, you can avoid prop drilling and simplify the management of shared data. In this example, the state is managed in the Parent component, and both child components access it via props.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How would you lift the state up in a React application, and why is it necessary?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How would you lift the state up in a React application, and why is it necessary?.",
    hints: [
      "Consider the core principles and trade-offs of How would you lift the state up in a React application, and why is it necessary?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-one-way-data-flow-of-react",
    title: "Explain one-way data flow of React",
    prompt: "Explain one-way data flow of React \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "function Parent() {  const [count, setCount] = React.useState(0);  return <Child count={count} increment={() => setCount(count + 1)} />;}\nfunction Child({ count, increment }) {  return <button onClick={increment}>Count: {count}</button>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "In React, one-way data flow means data moves from parent to child components through props.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "In React, one-way data flow means data moves from parent to child components through props. Parent to child: The parent passes data to the child State updates: To change data, the child calls a function passed down by the parent Example: This ensures data flows in one direction, making the app more predictable. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain one-way data flow of React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain one-way data flow of React.",
    hints: [
      "Consider the core principles and trade-offs of Explain one-way data flow of React."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-prop-drilling",
    title: "Explain prop drilling",
    prompt: "Explain prop drilling \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "function Grandparent() {  const data = 'Hello from Grandparent';  return <Parent data={data} />;}\nfunction Parent({ data }) {  return <Child data={data} />;}\nfunction Child({ data }) {  return <p>{data}</p>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Prop drilling is when you pass data from a parent component to a deeply nested child component through props, even if intermediate components don't use it.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Prop drilling is when you pass data from a parent component to a deeply nested child component through props, even if intermediate components don't use it. Example: In this example, data is passed through multiple components, even though only the Child component uses it. Prop drilling is acceptable for small applications where the component hierarchy is shallow. When global state is needed to be accessed in deeper levels of the app, using context and/or external state managers might be better.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain prop drilling.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain prop drilling.",
    hints: [
      "Consider the core principles and trade-offs of Explain prop drilling."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-jest-and-how-is-it-used-for-testing-react-appli",
    title: "What is Jest and how is it used for testing React applications?",
    prompt: "What is Jest and how is it used for testing React applications?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Jest is a JavaScript testing framework that provides a test runner, assertion library, and mocking support.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Jest is a JavaScript testing framework that provides a test runner, assertion library, and mocking support. It's commonly used for testing React applications due to its simplicity and integration with tools like React Testing Library.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Jest and how is it used for testing React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Jest and how is it used for testing React applications?.",
    hints: [
      "Consider the core principles and trade-offs of What is Jest and how is it used for testing React applications?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-do-you-mock-api-calls-in-react-component-tests",
    title: "How do you mock API calls in React component tests?",
    prompt: "How do you mock API calls in React component tests?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-fetching",
    tags: [
      "react",
      "data-fetching",
      "junior"
    ],
    codeSnippet: "import { render, screen } from '@testing-library/react';\njest.mock('./api', () => ({  fetchData: jest.fn(() => Promise.resolve('mocked data')),}));\nimport MyComponent from './MyComponent';\ntest('fetches data and renders it', async () => {  render(<MyComponent />);  expect(screen.getByText('Loading...')).toBeInTheDocument();  expect(await screen.findByText('mocked data')).toBeInTheDocument();});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To mock API calls in React component tests, you can use Jest's jest.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "To mock API calls in React component tests, you can use Jest's jest.mock to mock the API module and return mock data. This allows you to simulate API responses without making actual network requests. Example: In this example, the fetchData function from the api module is mocked to return 'mocked data' for testing purposes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you mock API calls in React component tests?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you mock API calls in React component tests?.",
    hints: [
      "Consider the core principles and trade-offs of How do you mock API calls in React component tests?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-explain-the-mvc-architecture",
    title: "Explain the MVC Architecture",
    prompt: "Explain the MVC Architecture \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Model-View-Controller splits an app into three parts: Model holds data and business rules View rende",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Model-View-Controller splits an app into three parts: Model holds data and business rules View renders the UI Controller handles input and updates the model or view",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the MVC Architecture.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the MVC Architecture.",
    hints: [
      "Consider the core principles and trade-offs of Explain the MVC Architecture."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-explain-the-difference-between-react-and-angular",
    title: "Explain the Difference Between React and Angular",
    prompt: "Explain the Difference Between React and Angular \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React: A JavaScript library focused on UI Uses Virtual DOM and one-way data flow Simpler core and ve",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React: A JavaScript library focused on UI Uses Virtual DOM and one-way data flow Simpler core and very modular Angular: A full framework Uses real DOM and two-way data binding Provides an opinionated architecture and more built-in features",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Difference Between React and Angular.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Difference Between React and Angular.",
    hints: [
      "Consider the core principles and trade-offs of Explain the Difference Between React and Angular."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-props-in-react",
    title: "Explain Props in React?",
    prompt: "Explain Props in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props are objects passed from parent to child components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Props are objects passed from parent to child components. Access them with this.props in class components, or as function arguments in functional components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Props in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain Props in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-use-of-dangerouslysetinnerhtml-in-react",
    title: "What is the Use of dangerouslySetInnerHTML in React?",
    prompt: "What is the Use of dangerouslySetInnerHTML in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "dangerouslySetInnerHTML lets you set raw HTML inside a component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "dangerouslySetInnerHTML lets you set raw HTML inside a component. It bypasses React\ufffd\ufffd\ufffds escaping, so use it only for trusted content because it can expose the app to XSS attacks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Use of dangerouslySetInnerHTML in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Use of dangerouslySetInnerHTML in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the Use of dangerouslySetInnerHTML in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-controlled-components-in-react",
    title: "What are Controlled Components in React?",
    prompt: "What are Controlled Components in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Controlled components use React state as the single source of truth for form inputs.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Controlled components use React state as the single source of truth for form inputs. Input values come from the state and are updated via onChange handlers.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Controlled Components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Controlled Components in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are Controlled Components in React?."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "react-what-is-react-redux",
    title: "What is React-Redux?",
    prompt: "What is React-Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React-Redux connects Redux state management to React components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React-Redux connects Redux state management to React components. It simplifies sharing state across many components without passing props down many levels.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React-Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React-Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is React-Redux?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-the-core-components-of-react-redux",
    title: "Explain the Core Components of React-Redux?",
    prompt: "Explain the Core Components of React-Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Core Redux concepts: Store: Holds the entire app state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Core Redux concepts: Store: Holds the entire app state. Actions: Plain objects describing state changes. Action creators: Functions that return actions. Reducers: Pure functions that update state based on actions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Core Components of React-Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Core Components of React-Redux?.",
    hints: [
      "Consider the core principles and trade-offs of Explain the Core Components of React-Redux?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-can-we-combine-multiple-reducers-in-react",
    title: "How Can We Combine Multiple Reducers in React?",
    prompt: "How Can We Combine Multiple Reducers in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Use combineReducers to merge reducers into one root reducer.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Use combineReducers to merge reducers into one root reducer. Example: import { combineReducers } from \"redux\";const rootReducer = combineReducers({ books: BooksReducer, activeBook: ActiveBook});",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Can We Combine Multiple Reducers in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Can We Combine Multiple Reducers in React?.",
    hints: [
      "Consider the core principles and trade-offs of How Can We Combine Multiple Reducers in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-explain-cors-in-react",
    title: "Explain CORS in React?",
    prompt: "Explain CORS in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-fetching",
    tags: [
      "react",
      "data-fetching",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Cross-Origin Resource Sharing allows the browser to request resources from a different domain.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Cross-Origin Resource Sharing allows the browser to request resources from a different domain. When frontend and backend run on different domains, configure the server and use libraries like axios or fetch on the client to handle cross-origin requests.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain CORS in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain CORS in React?.",
    hints: [
      "Consider the core principles and trade-offs of Explain CORS in React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-is-flux-architecture-in-redux",
    title: "What is Flux Architecture in Redux?",
    prompt: "What is Flux Architecture in Redux?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "state-management",
    tags: [
      "system_design",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Flux is a pattern with unidirectional data flow: actions dispatch to a store, the store updates state, and the view reacts.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Flux is a pattern with unidirectional data flow: actions dispatch to a store, the store updates state, and the view reacts. Redux follows this approach to make the state predictable and traceable.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Flux Architecture in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Flux Architecture in Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is Flux Architecture in Redux?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-redux-and-how-does-it-work-with-react",
    title: "What is Redux, and How Does It Work with React?",
    prompt: "What is Redux, and How Does It Work with React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux stores global state in a single store and updates it via actions processed by reducers.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux stores global state in a single store and updates it via actions processed by reducers. React-Redux connects that store to React components so they can read state and dispatch actions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux, and How Does It Work with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux, and How Does It Work with React?.",
    hints: [
      "Consider the core principles and trade-offs of What is Redux, and How Does It Work with React?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "react-sibling-data-passing-with-react-router-url-params-locat",
    title: "Sibling Data Passing with React Router \ufffd\ufffd\ufffd URL Params, Location State, or Shared Store",
    prompt: "Sibling Data Passing with React Router \ufffd\ufffd\ufffd URL Params, Location State, or Shared Store \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You can send data between sibling routes with URL params, query strings, or history state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can send data between sibling routes with URL params, query strings, or history state. For short, navigational data, use match.params or location.state. For complex shared state, use Context or a global store. URL param: props.history.push(/about/${id}); Location state: history.push('/about', { item }); Receiving side: const location = useLocation();const item = location.state?.item; When to choose what: URL params: good for bookmarking and deep linking. location.state: transient, not bookmarked, avoids polluting URL. Context or Redux: use for larger or persistent shared state across many routes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Sibling Data Passing with React Router \ufffd\ufffd\ufffd URL Params, Location State, or Shared Store.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Sibling Data Passing with React Router \ufffd\ufffd\ufffd URL Params, Location State, or Shared Store.",
    hints: [
      "Consider the core principles and trade-offs of Sibling Data Passing with React Router \ufffd\ufffd\ufffd URL Params, Location State, or Shared Store."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-strict-mode-development-checks-that-catch-risky-pattern",
    title: "Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns",
    prompt: "Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React.StrictMode runs extra checks in development: double invokes certain functions to reveal unsafe side effects, warns about deprecated lifecycle use, flags legacy string refs and findDOMNode usage, and highlights legacy context. Wrap parts of your app to get these diagnostics. Usage: ReactDOM.render( <React.StrictMode> <App /> </React.StrictMode>, root); Practical notes: StrictMode only affects development and can surface cleanup issues early. Expect effects to run twice in development under StrictMode; use idempotent effects and proper cleanup. Related Reading Cybersecurity Interview Questions Leetcode Alternatives System Design Interview Preparation Ansible Interview Questions LockedIn Selenium Interview Questions And Answers Git Interview Questions jQuery Interview Questions NodeJS Interview Questions ML Interview Questions Front End Developer Interview Questions DevOps Interview Questions And Answers Leetcode Roadmap Engineering Levels ASP.NET MVC Interview Questions Deep Learning Interview Questions Nail Coding Interviews with Interview Coder's Undetectable Coding Assistant \ufffd\ufffd\ufffd Get Your Dream Job Today Grinding LeetCode for months to pass one tech interview? There's a smarter way. Interview Coder is your AI-powered, undetectable coding assistant for coding interviews, completely undetectable and invisible to screen sharing. While your classmates stress over thousands of practice problems, you'll have an AI assistant that solves coding challenges in real-time during your actual interviews. Used by 87,000+ developers landing offers at FAANG, Big Tech, and top startups. Stop letting LeetCode anxiety kill your confidence. Join the thousands who've already taken the shortcut to their dream job. Download Interview Coder and turn your following coding interview into a guaranteed win. Related Reading Coding Interview Tools Jira Interview Questions Coding Interview Platforms Questions To Ask Interviewer Software Engineer Java Selenium Interview Questions Python Basic Interview Questions Best Job Boards For Software Engineers Leetcode Cheat Sheet Software Engineer Interview Prep Technical Interview Cheat Sheet Common C# Interview Questions RPA Interview Questions Angular 6 Interview Questions Common Algorithms For Interviews Download and try InterviewCoder for free today Get Started NowRelated Blogs Explore Our Similar Blogs View All blogs14 min",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns.",
    hints: [
      "Consider the core principles and trade-offs of Strict Mode \ufffd\ufffd\ufffd Development Checks That Catch Risky Patterns."
    ],
    source: "150-react",
    estimatedMinutes: 4
  },
  {
    id: "react-what-are-uncontrolled-components",
    title: "What are uncontrolled components?",
    prompt: "What are uncontrolled components?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeSnippet: "class UserProfile extends React.Component {\n  constructor(props) {\n    super(props);\n    this.handleSubmit = this.handleSubmit.bind(this);\n    this.input = React.createRef();\n  }\n\n  handleSubmit(event) {\n    alert('A name was submitted: ' + this.input.current.value);\n    event.preventDefault();\n  }\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <label>\n          {'Name:'}\n          <input type=\"text\" ref={this.input} />\n        </label>\n        <input type=\"submit\" value=\"Submit\" />\n      </form>\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The Uncontrolled Components are the ones that store their own state internally, and you query the DOM using a ref to find its current value when you need it.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The Uncontrolled Components are the ones that store their own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML. In the below UserProfile component, the name input is accessed using ref. In most cases, it's recommend to use controlled components to implement forms. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are uncontrolled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are uncontrolled components?.",
    hints: [
      "Consider the core principles and trade-offs of What are uncontrolled components?."
    ],
    source: "300-react",
    estimatedMinutes: 3
  },
  {
    id: "react-what-is-lifting-state-up-in-react",
    title: "What is Lifting State Up in React?",
    prompt: "What is Lifting State Up in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When several components need to share the same changing data then it is recommended to lift the shared state up to their closest common ancestor.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When several components need to share the same changing data then it is recommended to lift the shared state up to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Lifting State Up in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Lifting State Up in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is Lifting State Up in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-create-props-proxy-for-hoc-component",
    title: "How to create props proxy for HOC component?",
    prompt: "How to create props proxy for HOC component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "function HOC(WrappedComponent) {\n  return class Test extends Component {\n    render() {\n      const newProps = {\n        title: 'New Header',\n        footer: false,\n        showFeatureX: false,\n        showFeatureY: true,\n      };\n\n      return <WrappedComponent {...this.props} {...newProps} />;\n    }\n  };\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You can add/edit props passed to the component using props proxy pattern like this: \ufffd\ufffd\ufffd Back to Top",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can add/edit props passed to the component using props proxy pattern like this: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create props proxy for HOC component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create props proxy for HOC component?.",
    hints: [
      "Consider the core principles and trade-offs of How to create props proxy for HOC component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-context",
    title: "What is context?",
    prompt: "What is context?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const { Provider, Consumer } = React.createContext(defaultValue);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Context provides a way to pass data through the component tree without having to pass props down manually at every level.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. For example, authenticated user, locale preference, UI theme need to be accessed in the application by many components. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is context?.",
    hints: [
      "Consider the core principles and trade-offs of What is context?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-children-prop",
    title: "What is children prop?",
    prompt: "What is children prop?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "const MyDiv = React.createClass({\n  render: function () {\n    return <div>{this.props.children}</div>;\n  },\n});\n\nReactDOM.render(\n  <MyDiv>\n    <span>{'Hello'}</span>\n    <span>{'World'}</span>\n  </MyDiv>,\n  node,\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Children is a prop (this.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Children is a prop (this.props.children) that allow you to pass components as data to other components, just like any other prop you use. Component tree put between component's opening and closing tag will be passed to that component as children prop. There are a number of methods available in the React API to work with this prop. These include React.Children.map, React.Children.forEach, React.Children.count, React.Children.only, React.Children.toArray. A simple usage of children prop looks as below, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is children prop?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is children prop?.",
    hints: [
      "Consider the core principles and trade-offs of What is children prop?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-purpose-of-using-super-constructor-with-pro",
    title: "What is the purpose of using super constructor with props argument?",
    prompt: "What is the purpose of using super constructor with props argument?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    console.log(this.props); // prints { name: 'John', age: 42 }\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super();\n\n    console.log(this.props); // prints undefined\n\n    // but props parameter is still available\n    console.log(props); // prints { name: 'John', age: 42 }\n  }\n\n  render() {\n    // no difference outside constructor\n    console.log(this.props); // prints { name: 'John', age: 42 }\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A child class constructor cannot make use of this reference until super() method has been called.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A child class constructor cannot make use of this reference until super() method has been called. The same applies for ES6 sub-classes as well. The main reason of passing props parameter to super() call is to access this.props in your child constructors. Passing props: Not passing props: The above code snippets reveals that this.props is different only within the constructor. It would be the same outside the constructor. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of using super constructor with props argument?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of using super constructor with props argument?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of using super constructor with props argument?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-error-boundaries-in-react-v16",
    title: "What are error boundaries in React v16?",
    prompt: "What are error boundaries in React v16?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeSnippet: "class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  componentDidCatch(error, info) {\n    // You can also log the error to an error reporting service\n    logErrorToMyService(error, info);\n  }\n\n  static getDerivedStateFromError(error) {\n    // Update state so the next render will show the fallback UI.\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      // You can render any custom fallback UI\n      return <h1>{'Something went wrong.'}</h1>;\n    }\n    return this.props.children;\n  }\n}\n\n<ErrorBoundary>\n  <MyWidget />\n</ErrorBoundary>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. A class component becomes an error boundary if it defines a new lifecycle method called componentDidCatch(error, info) or static getDerivedStateFromError(): After that use it as a regular component: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are error boundaries in React v16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are error boundaries in React v16?.",
    hints: [
      "Consider the core principles and trade-offs of What are error boundaries in React v16?."
    ],
    source: "300-react",
    estimatedMinutes: 3
  },
  {
    id: "react-what-is-the-purpose-of-getsnapshotbeforeupdate-lifecycl",
    title: "What is the purpose of getSnapshotBeforeUpdate() lifecycle method?",
    prompt: "What is the purpose of getSnapshotBeforeUpdate() lifecycle method?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  getSnapshotBeforeUpdate(prevProps, prevState) {\n    // ...\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The new getSnapshotBeforeUpdate() lifecycle method is called right before DOM updates.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The new getSnapshotBeforeUpdate() lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to componentDidUpdate(). This lifecycle method along with componentDidUpdate() covers all the use cases of componentWillUpdate(). \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of getSnapshotBeforeUpdate() lifecycle method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of getSnapshotBeforeUpdate() lifecycle method?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of getSnapshotBeforeUpdate() lifecycle method?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-why-is-ismounted-an-anti-pattern-and-what-is-the-proper",
    title: "Why is isMounted() an anti-pattern and what is the proper solution?",
    prompt: "Why is isMounted() an anti-pattern and what is the proper solution?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "if (this.isMounted()) {\nthis.setState({...})\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The primary use case for isMounted() is to avoid calling setState() after a component has been unmounted, because it will emit a warning.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The primary use case for isMounted() is to avoid calling setState() after a component has been unmounted, because it will emit a warning. Checking isMounted() before calling setState() does eliminate the warning, but it also defeats the purpose of the warning. Using isMounted() is a code smell because the only reason you would check is because you think you might be holding a reference after the component has unmounted. An optimal solution would be to find places where setState() might be called after a component has unmounted, and fix them. Such situations most commonly occur due to callbacks, when a component is waiting for some data and gets unmounted before the data arrives. Ideally, any callbacks should be canceled in componentWillUnmount(), prior to unmounting. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is isMounted() an anti-pattern and what is the proper solution?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is isMounted() an anti-pattern and what is the proper solution?.",
    hints: [
      "Consider the core principles and trade-offs of Why is isMounted() an anti-pattern and what is the proper solution?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-constructor-and-getiniti",
    title: "What is the difference between constructor and getInitialState?",
    prompt: "What is the difference between constructor and getInitialState?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      /* initial state */\n    };\n  }\n}\n\nconst MyComponent = React.createClass({\n  getInitialState() {\n    return {\n      /* initial state */\n    };\n  },\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You should initialize state in the constructor when using ES6 classes, and getInitialState() method when using React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You should initialize state in the constructor when using ES6 classes, and getInitialState() method when using React.createClass(). Using ES6 classes: Using React.createClass(): Note: React.createClass() is deprecated and removed in React v16. Use plain JavaScript classes instead. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between constructor and getInitialState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between constructor and getInitialState?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between constructor and getInitialState?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-super-and-superprops-in",
    title: "What is the difference between super() and super(props) in React using ES6 classes?",
    prompt: "What is the difference between super() and super(props) in React using ES6 classes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    console.log(this.props); // { name: 'John', ... }\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super();\n    console.log(this.props); // undefined\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When you want to access this.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When you want to access this.props in constructor() then you should pass props to super() method. Using super(props): Using super(): Outside constructor() both will display same value for this.props. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between super() and super(props) in React using ES6 classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between super() and super(props) in React using ES6 classes?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between super() and super(props) in React using ES6 classes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-listen-to-state-changes",
    title: "How to listen to state changes?",
    prompt: "How to listen to state changes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "componentDidUpdate(object prevProps, object prevState)",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The componentDidUpdate lifecycle method will be called when state changes.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The componentDidUpdate lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed. Note: The previous releases of ReactJS also uses componentWillUpdate(object nextProps, object nextState) for state changes. It has been deprecated in latest releases. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to listen to state changes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to listen to state changes?.",
    hints: [
      "Consider the core principles and trade-offs of How to listen to state changes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-possible-ways-of-updating-objects-in-state",
    title: "What are the possible ways of updating objects in state?",
    prompt: "What are the possible ways of updating objects in state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const user = Object.assign({}, this.state.user, { age: 42 });\n this.setState({ user });\n\nconst user = { ...this.state.user, age: 42 };\n this.setState({ user });\n\nthis.setState((prevState) => ({\n     user: {\n       ...prevState.user,\n       age: 42,\n     },\n   }));",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Calling setState() with an object to merge with state: Using Object.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Calling setState() with an object to merge with state: Using Object.assign() to create a copy of the object: Using spread operator: Calling setState() with a function: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the possible ways of updating objects in state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the possible ways of updating objects in state?.",
    hints: [
      "Consider the core principles and trade-offs of What are the possible ways of updating objects in state?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-make-ajax-call-and-in-which-component-lifecycle",
    title: "How to make AJAX call and in which component lifecycle methods should I make an AJAX call?",
    prompt: "How to make AJAX call and in which component lifecycle methods should I make an AJAX call?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      employees: [],\n      error: null,\n    };\n  }\n\n  componentDidMount() {\n    fetch('https://api.example.com/items')\n      .then((res) => res.json())\n      .then(\n        (result) => {\n          this.setState({\n            employees: result.employees,\n          });\n        },\n        (error) => {\n          this.setState({ error });\n        },\n      );\n  }\n\n  render() {\n    const { error, employees } = this.state;\n    if (error) {\n      return <div>Error: {error.message}</div>;\n    } else {\n      return (\n        <ul>\n          {employees.map((employee) => (\n            <li key={employee.name}>\n              {employee.name}-{employee.experience}\n            </li>\n          ))}\n        </ul>\n      );\n    }\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in fetch.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in fetch. You should fetch data in the componentDidMount() lifecycle method. This is so you can use setState() to update your component when the data is retrieved. For example, the employees list fetched from API and set local state: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to make AJAX call and in which component lifecycle methods should I make an AJAX call?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to make AJAX call and in which component lifecycle methods should I make an AJAX call?.",
    hints: [
      "Consider the core principles and trade-offs of How to make AJAX call and in which component lifecycle methods should I make an AJAX call?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-get-query-parameters-in-react-router-v4",
    title: "How to get query parameters in React Router v4?",
    prompt: "How to get query parameters in React Router v4?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-fetching",
    tags: [
      "react",
      "data-fetching",
      "junior"
    ],
    codeSnippet: "const queryString = require('query-string');\nconst parsed = queryString.parse(props.location.search);\n\nconst params = new URLSearchParams(props.location.search);\nconst foo = params.get('name');",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library. You can also use URLSearchParams if you want something native: You should use a polyfill for IE11. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get query parameters in React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get query parameters in React Router v4?.",
    hints: [
      "Consider the core principles and trade-offs of How to get query parameters in React Router v4?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-pass-params-to-historypush-method-in-react-route",
    title: "How to pass params to history.push method in React Router v4?",
    prompt: "How to pass params to history.push method in React Router v4?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-fetching",
    tags: [
      "react",
      "data-fetching",
      "junior"
    ],
    codeSnippet: "this.props.history.push({\n  pathname: '/template',\n  search: '?name=sudheer',\n  state: { detail: response.data },\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "While navigating you can pass props to the history object: The search property is used to pass query params in push() method.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "While navigating you can pass props to the history object: The search property is used to pass query params in push() method. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass params to history.push method in React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass params to history.push method in React Router v4?.",
    hints: [
      "Consider the core principles and trade-offs of How to pass params to history.push method in React Router v4?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-is-flux",
    title: "What is flux?",
    prompt: "What is flux?",
    level: "junior",
    type: "output",
    category: "system_design",
    subject: "system-architecture",
    tags: [
      "system_design",
      "system-architecture",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Flux is an application design paradigm used as a replacement for the more traditional MVC pattern.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Flux is an application design paradigm used as a replacement for the more traditional MVC pattern. It is not a framework or a library but a new kind of architecture that complements React and the concept of Unidirectional Data Flow. Facebook uses this pattern internally when working with React. The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is flux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is flux?.",
    hints: [
      "Consider the core principles and trade-offs of What is flux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-redux",
    title: "What is Redux?",
    prompt: "What is Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux is a predictable state container for JavaScript apps based on the Flux design pattern.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with React, or with any other view library. It is tiny (about 2kB) and has no dependencies. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-mapstatetoprops-and-mapd",
    title: "What is the difference between mapStateToProps() and mapDispatchToProps()?",
    prompt: "What is the difference between mapStateToProps() and mapDispatchToProps()?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const mapStateToProps = (state) => {\n  return {\n    todos: getVisibleTodos(state.todos, state.visibilityFilter),\n  };\n};\n\nconst mapDispatchToProps = (dispatch) => {\n  return {\n    onTodoClick: (id) => {\n      dispatch(toggleTodo(id));\n    },\n  };\n};\n\nconst mapDispatchToProps = {\n  onTodoClick,\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "mapStateToProps() is a utility which helps your component get updated state (which is updated by some other components): mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state): Recommend always using the \ufffd\ufffd\ufffdobject shorthand\ufffd\ufffd\ufffd form for the mapDispatchToProps Redux wrap it in another function that looks like (\ufffd\ufffd\ufffdargs) => dispatch(onTodoClick(\ufffd\ufffd\ufffdargs)), and pass that wrapper function as a prop to your component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "mapStateToProps() is a utility which helps your component get updated state (which is updated by some other components): mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state): Recommend always using the \ufffd\ufffd\ufffdobject shorthand\ufffd\ufffd\ufffd form for the mapDispatchToProps Redux wrap it in another function that looks like (\ufffd\ufffd\ufffdargs) => dispatch(onTodoClick(\ufffd\ufffd\ufffdargs)), and pass that wrapper function as a prop to your component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between mapStateToProps() and mapDispatchToProps()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between mapStateToProps() and mapDispatchToProps()?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between mapStateToProps() and mapDispatchToProps()?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-can-i-dispatch-an-action-in-reducer",
    title: "Can I dispatch an action in reducer?",
    prompt: "Can I dispatch an action in reducer?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Dispatching an action within a reducer is an anti-pattern.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Dispatching an action within a reducer is an anti-pattern. Your reducer should be without side effects, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I dispatch an action in reducer?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I dispatch an action in reducer?.",
    hints: [
      "Consider the core principles and trade-offs of Can I dispatch an action in reducer?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-access-redux-store-outside-a-component",
    title: "How to access Redux store outside a component?",
    prompt: "How to access Redux store outside a component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "store = createStore(myReducer);\n\nexport default store;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You just need to export the store from the module where it created with createStore().",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You just need to export the store from the module where it created with createStore(). Also, it shouldn't pollute the global window object. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access Redux store outside a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access Redux store outside a component?.",
    hints: [
      "Consider the core principles and trade-offs of How to access Redux store outside a component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-are-there-any-similarities-between-redux-and-rxjs",
    title: "Are there any similarities between Redux and RxJS?",
    prompt: "Are there any similarities between Redux and RxJS?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "async-await",
    tags: [
      "system_design",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "These libraries are very different for very different purposes, but there are some vague similarities.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "These libraries are very different for very different purposes, but there are some vague similarities. Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Are there any similarities between Redux and RxJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Are there any similarities between Redux and RxJS?.",
    hints: [
      "Consider the core principles and trade-offs of Are there any similarities between Redux and RxJS?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-use-connect-from-react-redux",
    title: "How to use connect() from React Redux?",
    prompt: "How to use connect() from React Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "import React from 'react';\n   import { connect } from 'react-redux';\n\n   class App extends React.Component {\n     render() {\n       return <div>{this.props.containerData}</div>;\n     }\n   }\n\n   function mapStateToProps(state) {\n     return { containerData: state.data };\n   }\n\n   export default connect(mapStateToProps)(App);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You need to follow two steps to use your store in your container: Use mapStateToProps(): It maps the state variables from your store to the props that you specify.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You need to follow two steps to use your store in your container: Use mapStateToProps(): It maps the state variables from your store to the props that you specify. Connect the above props to your container: The object returned by the mapStateToProps function is connected to the container. You can import connect() from react-redux. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use connect() from React Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use connect() from React Redux?.",
    hints: [
      "Consider the core principles and trade-offs of How to use connect() from React Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-whats-the-purpose-of-at-symbol-in-the-redux-connect-dec",
    title: "Whats the purpose of at symbol in the Redux connect decorator?",
    prompt: "Whats the purpose of at symbol in the Redux connect decorator?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "import React from 'react';\n  import * as actionCreators from './actionCreators';\n  import { bindActionCreators } from 'redux';\n  import { connect } from 'react-redux';\n\n  function mapStateToProps(state) {\n    return { todos: state.todos };\n  }\n\n  function mapDispatchToProps(dispatch) {\n    return { actions: bindActionCreators(actionCreators, dispatch) };\n  }\n\n  class MyApp extends React.Component {\n    // ...define your main app here\n  }\n\n  export default connect(mapStateToProps, mapDispatchToProps)(MyApp);\n\nimport React from 'react';\n  import * as actionCreators from './actionCreators';\n  import { bindActionCreators } from 'redux';\n  import { connect } from 'react-redux';\n\n  function mapStateToProps(state) {\n    return { todos: state.todos };\n  }\n\n  function mapDispatchToProps(dispatch) {\n    return { actions: bindActionCreators(actionCreators, dispatch) };\n  }\n\n  @connect(mapStateToProps, mapDispatchToProps)\n  export default class MyApp extends React.Component {\n    // ...define your main app here\n  }",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The @ symbol is in fact a JavaScript expression used to signify decorators.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The @ symbol is in fact a JavaScript expression used to signify decorators. Decorators make it possible to annotate and modify classes and properties at design time. Let's take an example setting up Redux without and with a decorator. Without decorator: With decorator: The above examples are almost similar except the usage of decorator. The decorator syntax isn't built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Whats the purpose of at symbol in the Redux connect decorator?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Whats the purpose of at symbol in the Redux connect decorator?.",
    hints: [
      "Consider the core principles and trade-offs of Whats the purpose of at symbol in the Redux connect decorator?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-react-context-and-react",
    title: "What is the difference between React context and React Redux?",
    prompt: "What is the difference between React context and React Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You can use Context in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use Context in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for. Whereas Redux is much more powerful and provides a large number of features that the Context API doesn't provide. Also, React Redux uses context internally but it doesn't expose this fact in the public API. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React context and React Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React context and React Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between React context and React Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-why-are-redux-state-functions-called-reducers",
    title: "Why are Redux state functions called reducers?",
    prompt: "Why are Redux state functions called reducers?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reducers always return the accumulation of the state (based on all previous and current actions).",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could reduce a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why are Redux state functions called reducers?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why are Redux state functions called reducers?.",
    hints: [
      "Consider the core principles and trade-offs of Why are Redux state functions called reducers?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-should-i-keep-all-components-state-in-redux-store",
    title: "Should I keep all component's state in Redux store?",
    prompt: "Should I keep all component's state in Redux store?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Keep your data in the Redux store, and the UI related state internally in the component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Keep your data in the Redux store, and the UI related state internally in the component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Should I keep all component's state in Redux store?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Should I keep all component's state in Redux store?.",
    hints: [
      "Consider the core principles and trade-offs of Should I keep all component's state in Redux store?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-use-of-the-ownprops-parameter-in-mapstateto",
    title: "What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?",
    prompt: "What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "import ConnectedComponent from './containers/ConnectedComponent';\n\n<ConnectedComponent user={'john'} />;\n\n{\n  user: 'john';\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "If the ownProps parameter is specified, React Redux will pass the props that were passed to the component into your connect functions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "If the ownProps parameter is specified, React Redux will pass the props that were passed to the component into your connect functions. So, if you use a connected component: The ownProps inside your mapStateToProps() and mapDispatchToProps() functions will be an object: You can use this object to decide what to return from those functions. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?.",
    hints: [
      "Consider the core principles and trade-offs of What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-mental-model-of-redux-saga",
    title: "What is the mental model of redux-saga?",
    prompt: "What is the mental model of redux-saga?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Saga is like a separate thread in your application, that's solely responsible for side effects.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Saga is like a separate thread in your application, that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the mental model of redux-saga?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the mental model of redux-saga?.",
    hints: [
      "Consider the core principles and trade-offs of What is the mental model of redux-saga?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-redux-thunk",
    title: "What is Redux Thunk?",
    prompt: "What is Redux Thunk?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux Thunk middleware allows you to write action creators that return a function instead of an action.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch() and getState() as parameters. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux Thunk?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux Thunk?.",
    hints: [
      "Consider the core principles and trade-offs of What is Redux Thunk?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-redux-devtools",
    title: "What is Redux DevTools?",
    prompt: "What is Redux DevTools?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux DevTools is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux DevTools is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don't want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux DevTools?.",
    hints: [
      "Consider the core principles and trade-offs of What is Redux DevTools?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-redux-selectors-and-why-to-use-them",
    title: "What are Redux selectors and why to use them?",
    prompt: "What are Redux selectors and why to use them?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const getUserData = (state) => state.user.data;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Selectors are functions that take Redux state as an argument and return some data to pass to the component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Selectors are functions that take Redux state as an argument and return some data to pass to the component. For example, to get user details from the state: These selectors have two main benefits, The selector can compute derived data, allowing Redux to store the minimal possible state The selector is not recomputed unless one of its arguments changes \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Redux selectors and why to use them?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Redux selectors and why to use them?.",
    hints: [
      "Consider the core principles and trade-offs of What are Redux selectors and why to use them?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-redux-form",
    title: "What is Redux Form?",
    prompt: "What is Redux Form?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux Form works with React and Redux to enable a form in React to use Redux to store all of its state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux Form works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux Form?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux Form?.",
    hints: [
      "Consider the core principles and trade-offs of What is Redux Form?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-add-multiple-middlewares-to-redux",
    title: "How to add multiple middlewares to Redux?",
    prompt: "How to add multiple middlewares to Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "import { createStore, applyMiddleware } from 'redux';\nconst createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You can use applyMiddleware().",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use applyMiddleware(). For example, you can add redux-thunk and logger passing them as arguments to applyMiddleware(): \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to add multiple middlewares to Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to add multiple middlewares to Redux?.",
    hints: [
      "Consider the core principles and trade-offs of How to add multiple middlewares to Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-set-initial-state-in-redux",
    title: "How to set initial state in Redux?",
    prompt: "How to set initial state in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const rootReducer = combineReducers({\n  todos: todos,\n  visibilityFilter: visibilityFilter,\n});\n\nconst initialState = {\n  todos: [{ id: 123, name: 'example', completed: false }],\n};\n\nconst store = createStore(rootReducer, initialState);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You need to pass initial state as second argument to createStore: \ufffd\ufffd\ufffd Back to Top",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You need to pass initial state as second argument to createStore: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to set initial state in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to set initial state in Redux?.",
    hints: [
      "Consider the core principles and trade-offs of How to set initial state in Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-use-font-awesome-icons-in-react",
    title: "How to use Font Awesome icons in React?",
    prompt: "How to use Font Awesome icons in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "$ npm install --save font-awesome\n\nimport 'font-awesome/css/font-awesome.min.css';\n\nrender() {\n     return <div><i className={'fa fa-spinner'} /></div>\n   }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The below steps followed to include Font Awesome in React: Install font-awesome: Import font-awesome in your index.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The below steps followed to include Font Awesome in React: Install font-awesome: Import font-awesome in your index.js file: Add Font Awesome classes in className: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use Font Awesome icons in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use Font Awesome icons in React?.",
    hints: [
      "Consider the core principles and trade-offs of How to use Font Awesome icons in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-react-dev-tools",
    title: "What is React Dev Tools?",
    prompt: "What is React Dev Tools?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Developer Tools let you inspect the component hierarchy, including component props and state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Developer Tools let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native). The official extensions available for different browsers or environments. Chrome extension Firefox extension Standalone app (Safari, React Native, etc) \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Dev Tools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Dev Tools?.",
    hints: [
      "Consider the core principles and trade-offs of What is React Dev Tools?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-main-features-of-reselect-library",
    title: "What are the main features of Reselect library?",
    prompt: "What are the main features of Reselect library?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Let's see the main features of Reselect library, Selectors can compute derived data, allowing Redux to store the minimal possible state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Let's see the main features of Reselect library, Selectors can compute derived data, allowing Redux to store the minimal possible state. Selectors are efficient. A selector is not recomputed unless one of its arguments changes. Selectors are composable. They can be used as input to other selectors.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main features of Reselect library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main features of Reselect library?.",
    hints: [
      "Consider the core principles and trade-offs of What are the main features of Reselect library?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-does-the-statics-object-work-with-es6-classes-in-react",
    title: "Does the statics object work with ES6 classes in React?",
    prompt: "Does the statics object work with ES6 classes in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "someComponent = React.createClass({\n  statics: {\n    someMethod: function () {\n      // ..\n    },\n  },\n});\n\nclass Component extends React.Component {\n  static propTypes = {\n    // ...\n  };\n\n  static someMethod() {\n    // ...\n  }\n}\n\nclass Component extends React.Component {\n  ....\n}\n\nComponent.propTypes = {...}\nComponent.someMethod = function(){....}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "No, statics only works with React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "No, statics only works with React.createClass(): But you can write statics inside ES6+ classes as below, or writing them outside class as below, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does the statics object work with ES6 classes in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does the statics object work with ES6 classes in React?.",
    hints: [
      "Consider the core principles and trade-offs of Does the statics object work with ES6 classes in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-can-redux-only-be-used-with-react",
    title: "Can Redux only be used with React?",
    prompt: "Can Redux only be used with React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux can be used as a data store for any UI layer.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can Redux only be used with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can Redux only be used with React?.",
    hints: [
      "Consider the core principles and trade-offs of Can Redux only be used with React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-do-you-need-to-have-a-particular-build-tool-to-use-redu",
    title: "Do you need to have a particular build tool to use Redux?",
    prompt: "Do you need to have a particular build tool to use Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do you need to have a particular build tool to use Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do you need to have a particular build tool to use Redux?.",
    hints: [
      "Consider the core principles and trade-offs of Do you need to have a particular build tool to use Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-redux-form-initialvalues-get-updated-from-state",
    title: "How Redux Form initialValues get updated from state?",
    prompt: "How Redux Form initialValues get updated from state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const InitializeFromStateForm = reduxForm({\n  form: 'initializeFromState',\n  enableReinitialize: true,\n})(UserEdit);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You need to add enableReinitialize : true setting.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You need to add enableReinitialize : true setting. If your initialValues prop gets updated, your form will update too. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Redux Form initialValues get updated from state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Redux Form initialValues get updated from state?.",
    hints: [
      "Consider the core principles and trade-offs of How Redux Form initialValues get updated from state?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-is-the-purpose-of-registerserviceworker-in-react",
    title: "What is the purpose of registerServiceWorker in React?",
    prompt: "What is the purpose of registerServiceWorker in React?",
    level: "junior",
    type: "concept",
    category: "system_design",
    subject: "data-fetching",
    tags: [
      "system_design",
      "data-fetching",
      "junior"
    ],
    codeSnippet: "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\nimport registerServiceWorker from './registerServiceWorker';\n\nReactDOM.render(<App />, document.getElementById('root'));\nregisterServiceWorker();",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React creates a service worker for you without any configuration by default.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that's what you should know about service worker's for now. It's all about adding offline capabilities to your site. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of registerServiceWorker in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of registerServiceWorker in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of registerServiceWorker in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-use-class-field-declarations-syntax-in-react-cla",
    title: "How to use class field declarations syntax in React classes?",
    prompt: "How to use class field declarations syntax in React classes?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "class Counter extends Component {\n  state = { value: 0 };\n\n  handleIncrement = () => {\n    this.setState((prevState) => ({\n      value: prevState.value + 1,\n    }));\n  };\n\n  handleDecrement = () => {\n    this.setState((prevState) => ({\n      value: prevState.value - 1,\n    }));\n  };\n\n  render() {\n    return (\n      <div>\n        {this.state.value}\n\n        <button onClick={this.handleIncrement}>+</button>\n        <button onClick={this.handleDecrement}>-</button>\n      </div>\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React Class Components can be made much more concise using the class field declarations.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Class Components can be made much more concise using the class field declarations. You can initialize local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them. Let's take a counter example to demonstrate class field declarations for state without using constructor and methods without binding, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use class field declarations syntax in React classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use class field declarations syntax in React classes?.",
    hints: [
      "Consider the core principles and trade-offs of How to use class field declarations syntax in React classes?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-differences-between-flux-and-redux",
    title: "What are the differences between Flux and Redux?",
    prompt: "What are the differences between Flux and Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Below are the major differences between Flux and Redux Flux Redux State is mutable State is immutabl",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the major differences between Flux and Redux Flux Redux State is mutable State is immutable The Store contains both state and change logic The Store and change logic are separate There are multiple stores exist There is only one store exist All the stores are disconnected and flat Single store with hierarchical reducers It has a singleton dispatcher There is no concept of dispatcher React components subscribe to the store Container components uses connect function \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between Flux and Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between Flux and Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What are the differences between Flux and Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-main-purpose-of-constructor",
    title: "What is the main purpose of constructor?",
    prompt: "What is the main purpose of constructor?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "constructor(props) {\n  super(props);\n  // Don't call this.setState() here!\n  this.state = { counter: 0 };\n  this.handleClick = this.handleClick.bind(this);\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The constructor is mainly used for two purposes, To initialize local state by assigning object to this.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The constructor is mainly used for two purposes, To initialize local state by assigning object to this.state For binding event handler methods to the instance For example, the below code covers both the above cases, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the main purpose of constructor?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the main purpose of constructor?.",
    hints: [
      "Consider the core principles and trade-offs of What is the main purpose of constructor?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-is-it-mandatory-to-define-constructor-for-react-compone",
    title: "Is it mandatory to define constructor for React component?",
    prompt: "Is it mandatory to define constructor for React component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "No, it is not mandatory.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "No, it is not mandatory. i.e, If you don\ufffd\ufffd\ufffdt initialize state and you don\ufffd\ufffd\ufffdt bind methods, you don\ufffd\ufffd\ufffdt need to implement a constructor for your React component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it mandatory to define constructor for React component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it mandatory to define constructor for React component?.",
    hints: [
      "Consider the core principles and trade-offs of Is it mandatory to define constructor for React component?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-why-should-not-call-setstate-in-componentwillunmount",
    title: "Why should not call setState in componentWillUnmount?",
    prompt: "Why should not call setState in componentWillUnmount?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You should not call setState() in componentWillUnmount() because once a component instance is unmounted, it will never be mounted again.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You should not call setState() in componentWillUnmount() because once a component instance is unmounted, it will never be mounted again. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why should not call setState in componentWillUnmount?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why should not call setState in componentWillUnmount?.",
    hints: [
      "Consider the core principles and trade-offs of Why should not call setState in componentWillUnmount?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-purpose-of-getderivedstatefromerror",
    title: "What is the purpose of getDerivedStateFromError?",
    prompt: "What is the purpose of getDerivedStateFromError?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeSnippet: "static getDerivedStateFromError(error)\n\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    // Update state so the next render will show the fallback UI.\n    return { hasError: true };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      // You can render any custom fallback UI\n      return <h1>Something went wrong.</h1>;\n    }\n\n    return this.props.children;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "This lifecycle method is invoked after an error has been thrown by a descendant component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state. The signature of the lifecycle method is as follows, Let us take error boundary use case with the above lifecycle method for demonistration purpose, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of getDerivedStateFromError?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of getDerivedStateFromError?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of getDerivedStateFromError?."
    ],
    source: "300-react",
    estimatedMinutes: 3
  },
  {
    id: "react-what-is-the-purpose-of-unmountcomponentatnode-method",
    title: "What is the purpose of unmountComponentAtNode method?",
    prompt: "What is the purpose of unmountComponentAtNode method?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "ReactDOM.unmountComponentAtNode(container);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount. The method signature would be as follows, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of unmountComponentAtNode method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of unmountComponentAtNode method?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of unmountComponentAtNode method?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-benefit-of-strict-mode",
    title: "What is the benefit of strict mode?",
    prompt: "What is the benefit of strict mode?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The will be helpful in the below cases Identifying components with unsafe lifecycle methods.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The will be helpful in the below cases Identifying components with unsafe lifecycle methods. Warning about legacy string ref API usage. Detecting unexpected side effects. Detecting legacy context API. Warning about deprecated findDOMNode usage \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the benefit of strict mode?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the benefit of strict mode?.",
    hints: [
      "Consider the core principles and trade-offs of What is the benefit of strict mode?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-do-you-say-that-state-updates-are-merged",
    title: "How do you say that state updates are merged?",
    prompt: "How do you say that state updates are merged?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "constructor(props) {\n    super(props);\n    this.state = {\n      posts: [],\n      comments: []\n    };\n  }\n\ncomponentDidMount() {\n    fetchPosts().then(response => {\n      this.setState({\n        posts: response.posts\n      });\n    });\n\n    fetchComments().then(response => {\n      this.setState({\n        comments: response.comments\n      });\n    });\n  }",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When you call setState() in the component, React merges the object you provide into the current state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When you call setState() in the component, React merges the object you provide into the current state. For example, let us take a facebook user with posts and comments details as state variables, Now you can update them independently with separate setState() calls as below, As mentioned in the above code snippets, this.setState({comments}) updates only comments variable without modifying or replacing posts variable. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you say that state updates are merged?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you say that state updates are merged?.",
    hints: [
      "Consider the core principles and trade-offs of How do you say that state updates are merged?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-do-you-pass-arguments-to-an-event-handler",
    title: "How do you pass arguments to an event handler?",
    prompt: "How do you pass arguments to an event handler?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "<button onClick={(e) => this.updateUser(userId, e)}>Update User details</button>\n<button onClick={this.updateUser.bind(this, userId)}>Update User details</button>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "During iterations or loops, it is common to pass an extra parameter to an event handler.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method. Let us take an example of user details updated in a grid, In both the approaches, the synthetic argument e is passed as a second argument. You need to pass it explicitly for arrow functions and it forwarded automatically for bind method. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you pass arguments to an event handler?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you pass arguments to an event handler?.",
    hints: [
      "Consider the core principles and trade-offs of How do you pass arguments to an event handler?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-popular-choice-for-form-handling",
    title: "What is the popular choice for form handling?",
    prompt: "What is the popular choice for form handling?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Formik is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Formik is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission. In detail, You can categorize them as follows, Getting values in and out of form state Validation and error messages Handling form submission It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the popular choice for form handling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the popular choice for form handling?.",
    hints: [
      "Consider the core principles and trade-offs of What is the popular choice for form handling?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-give-an-example-on-how-to-use-context",
    title: "Give an example on How to use context?",
    prompt: "Give an example on How to use context?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "//Lets create a context with a default theme value \"luna\"\nconst ThemeContext = React.createContext('luna');\n// Create App component where it uses provider to pass theme value in the tree\nclass App extends React.Component {\n  render() {\n    return (\n      <ThemeContext.Provider value=\"nova\">\n        <Toolbar />\n      </ThemeContext.Provider>\n    );\n  }\n}\n// A middle component where you don't need to pass theme prop anymore\nfunction Toolbar(props) {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n// Lets read theme value in the button component to use\nclass ThemedButton extends React.Component {\n  static contextType = ThemeContext;\n  render() {\n    return <Button theme={this.context} />;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Context is designed to share data that can be considered global for a tree of React components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Context is designed to share data that can be considered global for a tree of React components. For example, in the code below lets manually thread through a \ufffd\ufffd\ufffdtheme\ufffd\ufffd\ufffd prop in order to style the Button component. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Give an example on How to use context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Give an example on How to use context?.",
    hints: [
      "Consider the core principles and trade-offs of Give an example on How to use context?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-purpose-of-default-value-in-context",
    title: "What is the purpose of default value in context?",
    prompt: "What is the purpose of default value in context?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "const MyContext = React.createContext(defaultValue);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them. Below code snippet provides default theme value as Luna. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of default value in context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of default value in context?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of default value in context?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-a-consumer",
    title: "What is a consumer?",
    prompt: "What is a consumer?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "<MyContext.Consumer>\n  {value => /* render something based on the context value */}\n</MyContext.Consumer>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A Consumer is a React component that subscribes to context changes.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. Lets take a simple example, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a consumer?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a consumer?.",
    hints: [
      "Consider the core principles and trade-offs of What is a consumer?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-create-react-class-components-without-es6",
    title: "How to create react class components without ES6?",
    prompt: "How to create react class components without ES6?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "var Greeting = createReactClass({\n  getDefaultProps: function () {\n    return {\n      name: 'Jhohn',\n    };\n  },\n  getInitialState: function () {\n    return { message: this.props.message };\n  },\n  handleClick: function () {\n    console.log(this.state.message);\n  },\n  render: function () {\n    return <h1>Hello, {this.props.name}</h1>;\n  },\n});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "If you don\ufffd\ufffd\ufffdt use ES6 then you may need to use the create-react-class module instead.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "If you don\ufffd\ufffd\ufffdt use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state. Note: If you use createReactClass then auto binding is available for all methods. i.e, You don't need to use .bind(this) with in constructor for event handlers. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create react class components without ES6?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create react class components without ES6?.",
    hints: [
      "Consider the core principles and trade-offs of How to create react class components without ES6?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-formik",
    title: "What is formik?",
    prompt: "What is formik?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Formik is a small react form library that helps you with the three major problems, Getting values in",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Formik is a small react form library that helps you with the three major problems, Getting values in and out of form state Validation and error messages Handling form submission \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is formik?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is formik?.",
    hints: [
      "Consider the core principles and trade-offs of What is formik?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-mobx",
    title: "What is MobX?",
    prompt: "What is MobX?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "npm install mobx --save\nnpm install mobx-react --save",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP).",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For reactJs application, you need to install below packages, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is MobX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is MobX?.",
    hints: [
      "Consider the core principles and trade-offs of What is MobX?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-should-i-learn-es6-before-learning-reactjs",
    title: "Should I learn ES6 before learning ReactJS?",
    prompt: "Should I learn ES6 before learning ReactJS?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeSnippet: "// in es 5\n   var someData = this.props.someData;\n   var dispatch = this.props.dispatch;\n\n   // in es6\n   const { someData, dispatch } = this.props;\n\n// in es 5\n   <SomeComponent someData={this.props.someData} dispatch={this.props.dispatch} />\n\n   // in es6\n   <SomeComponent {...this.props} />\n\n// es 5\n   var users = usersList.map(function (user) {\n     return <li>{user.name}</li>;\n   });\n   // es 6\n   const users = usersList.map((user) => <li>{user.name}</li>);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "No, you don\ufffd\ufffd\ufffdt have to learn es2015/es6 to learn react.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "No, you don\ufffd\ufffd\ufffdt have to learn es2015/es6 to learn react. But you may find many resources or React ecosystem uses ES6 extensively. Let's see some of the frequently used ES6 features, Destructuring: To get props and use them in a component Spread operator: Helps in passing props down into a component Arrow functions: Makes compact syntax \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Should I learn ES6 before learning ReactJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Should I learn ES6 before learning ReactJS?.",
    hints: [
      "Consider the core principles and trade-offs of Should I learn ES6 before learning ReactJS?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-imperative-and-declarati",
    title: "What is the difference between Imperative and Declarative in React?",
    prompt: "What is the difference between Imperative and Declarative in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeSnippet: "if (user.likes()) {\n  if (hasBlue()) {\n    removeBlue();\n    addGrey();\n  } else {\n    removeGrey();\n    addBlue();\n  }\n}\n\nif (this.state.liked) {\n  return <blueLike />;\n} else {\n  return <greyLike />;\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Imagine a simple UI component, such as a \"Like\" button.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Imagine a simple UI component, such as a \"Like\" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue. The imperative way of doing this would be: Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario. In contrast, the declarative approach would be: Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a sepecific state, and is therefore much simpler to understand. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Imperative and Declarative in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Imperative and Declarative in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between Imperative and Declarative in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "system_design-what-is-frontend-system-design-how-is-it-different-from",
    title: "What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42",
    prompt: "What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Detailed explanation of What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Detailed explanation of What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42 in React, TypeScript, and modern frontend application development.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42.",
    hints: [
      "Consider the core principles and trade-offs of What is Frontend System Design? How is it different from backend system design? n   Answer Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture \\(Atomic Design, Micro-frontends\\) State management \\(local, server, global, URL state\\) Data fetching and caching \\(React Query, SWR, GraphQL\\) Performance \\(code splitting, lazy loading, virtualization\\) Real-time \\(WebSockets, SSE, polling\\) Accessibility \\(ARIA, keyboard navigation, screen readers\\) Security \\(XSS, CSRF, Content Security Policy\\) Rendering strategies \\(CSR, SSR, SSG, ISR\\) RADIO Framework for FE interviews: Requirements  \\256  Architecture  \\256  Data model  \\256  Interface  \\256  Optimizations  1 // RADIO Framework applied to 'Design a News Feed':  2 // R \\227 Requirements:  3 //   Functional: show posts, like, comment, infinite scroll  4 //   Non-functional: < 2s FCP, offline support, accessible  5 //  6 // A \\227 Architecture:  7 //   Component tree: Feed > PostCard > Actions > Comments  8 //   State: Server state \\(React Query\\), UI state \\(useState\\)  9 // 10 // D \\227 Data Model: 11 //   Post: { id, author, content, media, likes, createdAt } 12 // 13 // I \\227 Interface \\(API design\\): 14 //   GET /api/feed?cursor=xxx&limit=20 15 // 16 // O \\227 Optimizations: 17 //   Virtual scroll, image lazy load, skeleton screens 18 //   Optimistic updates, stale-while-revalidate caching n  Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface \\(API\\), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 2/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-approach-component-architecture-in-a-large-s",
    title: "How do you approach component architecture in a large-scale application? n   Answer Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design \\(most used pattern\\): Atoms \\227 smallest units: Button, Input, Icon, Label Molecules \\227 composed atoms: SearchBar \\(Input + Button\\) Organisms \\227 complex sections: Header, ProductCard, DataTable Templates \\227 page layouts with placeholder content Pages \\227 templates with real data Key principles: Single Responsibility \\227 each component does one thing Composition over inheritance \\227 build complex from simple Dumb/Smart separation \\227 UI components vs container components Colocation \\227 keep related code \\(styles, tests, stories\\) together Folder structure for scale: /components/ui \\227 reusable design system components /components/features \\227 feature-specific components /hooks \\227 custom hooks \\(data fetching, business logic\\) /pages or /routes \\227 page-level components /lib \\227 utilities, API clients, formatters  1 // Atomic Design implementation  2  3 // ATOM: Button  4 const   Button   =   \\( {   variant ,   size ,   onClick ,   children   } \\)   = >   \\(  5     < button   className = { `btn btn-${variant} btn-${size}` }   onClick = { onClick } >  6         { children }  7     < / button >  8 \\)  9 10 // MOLECULE: SearchBar = Input + Button 11 const   SearchBar   =   \\( {   onSearch   } \\)   = >   { 12     const   [ query ,   setQuery ]   =   useState \\( '' \\) 13     return   \\( 14         < div   className = 'search-bar' > 15             < Input   value = { query }   onChange = { e   = >   setQuery \\( e . target . value \\) }   / > 16             < Button   onClick = { \\( \\)   = >   onSearch \\( query \\) } > Search < / Button > 17         < / div > 18     \\) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const   ProductCard   =   \\( {   product   } \\)   = >   \\( 23     < div   className = 'product-card' > 24         < img   src = { product . image }   alt = { product . name }   loading = 'lazy'   / > 25         < h3 > { product . name } < / h3 > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 3/42",
    prompt: "How do you approach component architecture in a large-scale application? n   Answer Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design \\(most used pattern\\): Atoms \\227 smallest units: Button, Input, Icon, Label Molecules \\227 composed atoms: SearchBar \\(Input + Button\\) Organisms \\227 complex sections: Header, ProductCard, DataTable Templates \\227 page layouts with placeholder content Pages \\227 templates with real data Key principles: Single Responsibility \\227 each component does one thing Composition over inheritance \\227 build complex from simple Dumb/Smart separation \\227 UI components vs container components Colocation \\227 keep related code \\(styles, tests, stories\\) together Folder structure for scale: /components/ui \\227 reusable design system components /components/features \\227 feature-specific components /hooks \\227 custom hooks \\(data fetching, business logic\\) /pages or /routes \\227 page-level components /lib \\227 utilities, API clients, formatters  1 // Atomic Design implementation  2  3 // ATOM: Button  4 const   Button   =   \\( {   variant ,   size ,   onClick ,   children   } \\)   = >   \\(  5     < button   className = { `btn btn-${variant} btn-${size}` }   onClick = { onClick } >  6         { children }  7     < / button >  8 \\)  9 10 // MOLECULE: SearchBar = Input + Button 11 const   SearchBar   =   \\( {   onSearch   } \\)   = >   { 12     const   [ query ,   setQuery ]   =   useState \\( '' \\) 13     return   \\( 14         < div   className = 'search-bar' > 15             < Input   value = { query }   onChange = { e   = >   setQuery \\( e . target . value \\) }   / > 16             < Button   onClick = { \\( \\)   = >   onSearch \\( query \\) } > Search < / Button > 17         < / div > 18     \\) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const   ProductCard   =   \\( {   product   } \\)   = >   \\( 23     < div   className = 'product-card' > 24         < img   src = { product . image }   alt = { product . name }   loading = 'lazy'   / > 25         < h3 > { product . name } < / h3 > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 3/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "26 < Price amount = { product.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "26 < Price amount = { product . price } currency = 'INR' / > 27 < Button variant = 'primary' onClick = { ( ) = > addToCart ( product . id ) } > 28 Add to Cart 29 < / Button > 30 < / div > 31 ) 32 33 // Smart (Container) vs Dumb (Presentational) 34 // Smart: fetches data, manages state 35 const ProductListContainer = ( ) = > { 36 const { data } = useProducts ( ) // data fetching here 37 return < ProductList products = { data } / > 38 } 39 // Dumb: pure UI, receives props 40 const ProductList = ( { products } ) = > ( 41 < div > { products . map ( p = > < ProductCard key = { p . id } product = { p } / > ) } < / div > 42 ) n Interview Tip: Keep UI components pure (no data fetching, no business logic) \\227 they receive props and render UI. Data fetching and state management live in hooks or container components. This separation makes components reusable, testable, and easy to refactor. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 3/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you approach component architecture in a large-scale application? n   Answer Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design \\(most used pattern\\): Atoms \\227 smallest units: Button, Input, Icon, Label Molecules \\227 composed atoms: SearchBar \\(Input + Button\\) Organisms \\227 complex sections: Header, ProductCard, DataTable Templates \\227 page layouts with placeholder content Pages \\227 templates with real data Key principles: Single Responsibility \\227 each component does one thing Composition over inheritance \\227 build complex from simple Dumb/Smart separation \\227 UI components vs container components Colocation \\227 keep related code \\(styles, tests, stories\\) together Folder structure for scale: /components/ui \\227 reusable design system components /components/features \\227 feature-specific components /hooks \\227 custom hooks \\(data fetching, business logic\\) /pages or /routes \\227 page-level components /lib \\227 utilities, API clients, formatters  1 // Atomic Design implementation  2  3 // ATOM: Button  4 const   Button   =   \\( {   variant ,   size ,   onClick ,   children   } \\)   = >   \\(  5     < button   className = { `btn btn-${variant} btn-${size}` }   onClick = { onClick } >  6         { children }  7     < / button >  8 \\)  9 10 // MOLECULE: SearchBar = Input + Button 11 const   SearchBar   =   \\( {   onSearch   } \\)   = >   { 12     const   [ query ,   setQuery ]   =   useState \\( '' \\) 13     return   \\( 14         < div   className = 'search-bar' > 15             < Input   value = { query }   onChange = { e   = >   setQuery \\( e . target . value \\) }   / > 16             < Button   onClick = { \\( \\)   = >   onSearch \\( query \\) } > Search < / Button > 17         < / div > 18     \\) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const   ProductCard   =   \\( {   product   } \\)   = >   \\( 23     < div   className = 'product-card' > 24         < img   src = { product . image }   alt = { product . name }   loading = 'lazy'   / > 25         < h3 > { product . name } < / h3 > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 3/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you approach component architecture in a large-scale application? n   Answer Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design \\(most used pattern\\): Atoms \\227 smallest units: Button, Input, Icon, Label Molecules \\227 composed atoms: SearchBar \\(Input + Button\\) Organisms \\227 complex sections: Header, ProductCard, DataTable Templates \\227 page layouts with placeholder content Pages \\227 templates with real data Key principles: Single Responsibility \\227 each component does one thing Composition over inheritance \\227 build complex from simple Dumb/Smart separation \\227 UI components vs container components Colocation \\227 keep related code \\(styles, tests, stories\\) together Folder structure for scale: /components/ui \\227 reusable design system components /components/features \\227 feature-specific components /hooks \\227 custom hooks \\(data fetching, business logic\\) /pages or /routes \\227 page-level components /lib \\227 utilities, API clients, formatters  1 // Atomic Design implementation  2  3 // ATOM: Button  4 const   Button   =   \\( {   variant ,   size ,   onClick ,   children   } \\)   = >   \\(  5     < button   className = { `btn btn-${variant} btn-${size}` }   onClick = { onClick } >  6         { children }  7     < / button >  8 \\)  9 10 // MOLECULE: SearchBar = Input + Button 11 const   SearchBar   =   \\( {   onSearch   } \\)   = >   { 12     const   [ query ,   setQuery ]   =   useState \\( '' \\) 13     return   \\( 14         < div   className = 'search-bar' > 15             < Input   value = { query }   onChange = { e   = >   setQuery \\( e . target . value \\) }   / > 16             < Button   onClick = { \\( \\)   = >   onSearch \\( query \\) } > Search < / Button > 17         < / div > 18     \\) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const   ProductCard   =   \\( {   product   } \\)   = >   \\( 23     < div   className = 'product-card' > 24         < img   src = { product . image }   alt = { product . name }   loading = 'lazy'   / > 25         < h3 > { product . name } < / h3 > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 3/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you approach component architecture in a large-scale application? n   Answer Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design \\(most used pattern\\): Atoms \\227 smallest units: Button, Input, Icon, Label Molecules \\227 composed atoms: SearchBar \\(Input + Button\\) Organisms \\227 complex sections: Header, ProductCard, DataTable Templates \\227 page layouts with placeholder content Pages \\227 templates with real data Key principles: Single Responsibility \\227 each component does one thing Composition over inheritance \\227 build complex from simple Dumb/Smart separation \\227 UI components vs container components Colocation \\227 keep related code \\(styles, tests, stories\\) together Folder structure for scale: /components/ui \\227 reusable design system components /components/features \\227 feature-specific components /hooks \\227 custom hooks \\(data fetching, business logic\\) /pages or /routes \\227 page-level components /lib \\227 utilities, API clients, formatters  1 // Atomic Design implementation  2  3 // ATOM: Button  4 const   Button   =   \\( {   variant ,   size ,   onClick ,   children   } \\)   = >   \\(  5     < button   className = { `btn btn-${variant} btn-${size}` }   onClick = { onClick } >  6         { children }  7     < / button >  8 \\)  9 10 // MOLECULE: SearchBar = Input + Button 11 const   SearchBar   =   \\( {   onSearch   } \\)   = >   { 12     const   [ query ,   setQuery ]   =   useState \\( '' \\) 13     return   \\( 14         < div   className = 'search-bar' > 15             < Input   value = { query }   onChange = { e   = >   setQuery \\( e . target . value \\) }   / > 16             < Button   onClick = { \\( \\)   = >   onSearch \\( query \\) } > Search < / Button > 17         < / div > 18     \\) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const   ProductCard   =   \\( {   product   } \\)   = >   \\( 23     < div   className = 'product-card' > 24         < img   src = { product . image }   alt = { product . name }   loading = 'lazy'   / > 25         < h3 > { product . name } < / h3 > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 3/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-scalable-data-fetching-and-caching",
    title: "How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42",
    prompt: "How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "26 old . map ( p = > p . id = = = postId ? { . . . p , likes : p . likes + 1 } : p ) 27 ) 28 return { prev } // snapshot for rollback 29 } , 30 onError : ( err , postId , ctx ) = > { 31 queryClient . setQueryData ( [ 'posts' ] , ctx . prev ) // rollback! 32 } , 33 onSettled : ( ) = > { 34 queryClient . invalidateQueries ( { queryKey : [ 'posts' ] } ) // sync 35 } 36 } ) n Interview Tip: Set staleTime strategically per data type. User profile = Infinity (changes rarely). Stock prices = 0 (always fresh). News feed = 30 seconds. Product catalog = 5 minutes. Wrong staleTime = either too many API calls or stale data shown to users. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 5/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a scalable data fetching and caching layer? n   Answer A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate \\(SWR\\) \\227 show cached, fetch in background Cache-first \\227 show cache immediately, update if stale Network-first \\227 always fetch fresh, fall back to cache Cache-only \\227 offline-first apps React Query cache config: staleTime \\227 how long data is considered fresh \\(no refetch\\) gcTime \\227 how long to keep unused data in memory refetchOnWindowFocus \\227 refetch when user tabs back refetchInterval \\227 polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively  1 // React Query with all cache strategies  2 const   queryClient   =   new   QueryClient \\( {  3     defaultOptions :   {  4         queries :   {  5             staleTime :   60   *   1000 ,       // 1 min \\227 global default  6             gcTime :   5   *   60   *   1000 ,     // 5 min in memory  7             retry :   1 ,                               // retry once on fail  8             refetchOnWindowFocus :   true ,  9         } 10     } 11 } \\) 12 13 // Stale time per query type 14 useQuery \\( {   queryKey :   [ 'user' ] ,   staleTime :   Infinity   } \\)           // never refetch 15 useQuery \\( {   queryKey :   [ 'prices' ] ,   staleTime :   0   } \\)                     // always fresh 16 useQuery \\( {   queryKey :   [ 'feed' ] ,   staleTime :   30   *   1000   } \\)         // 30 sec 17 18 // Optimistic update: like button 19 const   likeMutation   =   useMutation \\( { 20     mutationFn :   \\( postId \\)   = >   api . likePost \\( postId \\) , 21     onMutate :   async   \\( postId \\)   = >   { 22         await   queryClient . cancelQueries \\( {   queryKey :   [ 'posts' ]   } \\) 23         const   prev   =   queryClient . getQueryData \\( [ 'posts' ] \\) 24         // Update cache immediately \\(optimistic\\) 25         queryClient . setQueryData \\( [ 'posts' ] ,   old   = > Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 5/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-an-autocomplete-typeahead-search-component-n-ans",
    title: "Design an autocomplete / typeahead search component. n   Answer Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce \\227 wait 300ms before API call \\(avoid call per keystroke\\) Minimum query length \\227 don't search for empty or 1 char Client-side cache \\227 same query = no duplicate API call Keyboard navigation \\227 arrow keys, Enter to select, Escape to close Accessibility \\227 ARIA combobox pattern, screen reader announcements Loading state \\227 show spinner while fetching Error state \\227 show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string \\(avoid re-fetching same query\\) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete  1 const   useDebounce   =   \\( value ,   delay   =   300 \\)   = >   {  2     const   [ debounced ,   setDebounced ]   =   useState \\( value \\)  3     useEffect \\( \\( \\)   = >   {  4         const   timer   =   setTimeout \\( \\( \\)   = >   setDebounced \\( value \\) ,   delay \\)  5         return   \\( \\)   = >   clearTimeout \\( timer \\)     // cancel on new keystroke  6     } ,   [ value ,   delay ] \\)  7     return   debounced  8 }  9 10 const   Autocomplete   =   \\( {   onSelect   } \\)   = >   { 11     const   [ query ,   setQuery ]   =   useState \\( '' \\) 12     const   [ activeIdx ,   setActiveIdx ]   =   useState \\( - 1 \\) 13     const   debouncedQuery   =   useDebounce \\( query ,   300 \\) 14 15     // React Query: deduplicates, caches, aborts stale 16     const   {   data :   results   =   [ ] ,   isLoading   }   =   useQuery \\( { 17         queryKey :   [ 'search' ,   debouncedQuery ] , 18         queryFn :   \\( \\)   = >   api . search \\( debouncedQuery \\) , 19         enabled :   debouncedQuery . length   > =   2 ,     // min 2 chars 20         staleTime :   60_000 ,     // cache 1 min 21     } \\) 22 23     const   handleKeyDown   =   \\( e \\)   = >   { 24         if   \\( e . key   = = =   'ArrowDown' \\)   setActiveIdx \\( i   = >   Math . min \\( i + 1 ,   results . length - 1 \\) \\) 25         if   \\( e . key   = = =   'ArrowUp' \\)       setActiveIdx \\( i   = >   Math . max \\( i - 1 ,   - 1 \\) \\) 26         if   \\( e . key   = = =   'Enter'   & &   activeIdx   > =   0 \\)   onSelect \\( results [ activeIdx ] \\) 27         if   \\( e . key   = = =   'Escape' \\)   setQuery \\( '' \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 8/42",
    prompt: "Design an autocomplete / typeahead search component. n   Answer Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce \\227 wait 300ms before API call \\(avoid call per keystroke\\) Minimum query length \\227 don't search for empty or 1 char Client-side cache \\227 same query = no duplicate API call Keyboard navigation \\227 arrow keys, Enter to select, Escape to close Accessibility \\227 ARIA combobox pattern, screen reader announcements Loading state \\227 show spinner while fetching Error state \\227 show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string \\(avoid re-fetching same query\\) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete  1 const   useDebounce   =   \\( value ,   delay   =   300 \\)   = >   {  2     const   [ debounced ,   setDebounced ]   =   useState \\( value \\)  3     useEffect \\( \\( \\)   = >   {  4         const   timer   =   setTimeout \\( \\( \\)   = >   setDebounced \\( value \\) ,   delay \\)  5         return   \\( \\)   = >   clearTimeout \\( timer \\)     // cancel on new keystroke  6     } ,   [ value ,   delay ] \\)  7     return   debounced  8 }  9 10 const   Autocomplete   =   \\( {   onSelect   } \\)   = >   { 11     const   [ query ,   setQuery ]   =   useState \\( '' \\) 12     const   [ activeIdx ,   setActiveIdx ]   =   useState \\( - 1 \\) 13     const   debouncedQuery   =   useDebounce \\( query ,   300 \\) 14 15     // React Query: deduplicates, caches, aborts stale 16     const   {   data :   results   =   [ ] ,   isLoading   }   =   useQuery \\( { 17         queryKey :   [ 'search' ,   debouncedQuery ] , 18         queryFn :   \\( \\)   = >   api . search \\( debouncedQuery \\) , 19         enabled :   debouncedQuery . length   > =   2 ,     // min 2 chars 20         staleTime :   60_000 ,     // cache 1 min 21     } \\) 22 23     const   handleKeyDown   =   \\( e \\)   = >   { 24         if   \\( e . key   = = =   'ArrowDown' \\)   setActiveIdx \\( i   = >   Math . min \\( i + 1 ,   results . length - 1 \\) \\) 25         if   \\( e . key   = = =   'ArrowUp' \\)       setActiveIdx \\( i   = >   Math . max \\( i - 1 ,   - 1 \\) \\) 26         if   \\( e . key   = = =   'Enter'   & &   activeIdx   > =   0 \\)   onSelect \\( results [ activeIdx ] \\) 27         if   \\( e . key   = = =   'Escape' \\)   setQuery \\( '' \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 8/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "28 } 29 30 return ( 31 < div role = 'combobox' aria - expanded = { results.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "28 } 29 30 return ( 31 < div role = 'combobox' aria - expanded = { results . length > 0 } 32 aria - haspopup = 'listbox' > 33 < input value = { query } onChange = { e = > setQuery ( e . target . value ) } 34 onKeyDown = { handleKeyDown } aria - autocomplete = 'list' 35 aria - activedescendant = { activeIdx > = 0 ? `opt-${activeIdx}` : undefined } 36 / > 37 { isLoading & & < Spinner / > } 38 < ul role = 'listbox' > 39 { results . map ( ( r , i ) = > ( 40 < li key = { r . id } id = { `opt-${i}` } role = 'option' 41 aria - selected = { i = = = activeIdx } 42 onClick = { ( ) = > onSelect ( r ) } > { r . label } < / li > 43 ) ) } 44 < / ul > 45 < / div > 46 ) 47 } n Interview Tip: Always implement the ARIA combobox pattern for autocomplete. Without it, screen reader users hear nothing when results appear. The pattern: role=combobox on the input, role=listbox on the dropdown, aria-expanded to announce open/close, and aria-activedescendant pointing to the focused option. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 8/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design an autocomplete / typeahead search component. n   Answer Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce \\227 wait 300ms before API call \\(avoid call per keystroke\\) Minimum query length \\227 don't search for empty or 1 char Client-side cache \\227 same query = no duplicate API call Keyboard navigation \\227 arrow keys, Enter to select, Escape to close Accessibility \\227 ARIA combobox pattern, screen reader announcements Loading state \\227 show spinner while fetching Error state \\227 show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string \\(avoid re-fetching same query\\) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete  1 const   useDebounce   =   \\( value ,   delay   =   300 \\)   = >   {  2     const   [ debounced ,   setDebounced ]   =   useState \\( value \\)  3     useEffect \\( \\( \\)   = >   {  4         const   timer   =   setTimeout \\( \\( \\)   = >   setDebounced \\( value \\) ,   delay \\)  5         return   \\( \\)   = >   clearTimeout \\( timer \\)     // cancel on new keystroke  6     } ,   [ value ,   delay ] \\)  7     return   debounced  8 }  9 10 const   Autocomplete   =   \\( {   onSelect   } \\)   = >   { 11     const   [ query ,   setQuery ]   =   useState \\( '' \\) 12     const   [ activeIdx ,   setActiveIdx ]   =   useState \\( - 1 \\) 13     const   debouncedQuery   =   useDebounce \\( query ,   300 \\) 14 15     // React Query: deduplicates, caches, aborts stale 16     const   {   data :   results   =   [ ] ,   isLoading   }   =   useQuery \\( { 17         queryKey :   [ 'search' ,   debouncedQuery ] , 18         queryFn :   \\( \\)   = >   api . search \\( debouncedQuery \\) , 19         enabled :   debouncedQuery . length   > =   2 ,     // min 2 chars 20         staleTime :   60_000 ,     // cache 1 min 21     } \\) 22 23     const   handleKeyDown   =   \\( e \\)   = >   { 24         if   \\( e . key   = = =   'ArrowDown' \\)   setActiveIdx \\( i   = >   Math . min \\( i + 1 ,   results . length - 1 \\) \\) 25         if   \\( e . key   = = =   'ArrowUp' \\)       setActiveIdx \\( i   = >   Math . max \\( i - 1 ,   - 1 \\) \\) 26         if   \\( e . key   = = =   'Enter'   & &   activeIdx   > =   0 \\)   onSelect \\( results [ activeIdx ] \\) 27         if   \\( e . key   = = =   'Escape' \\)   setQuery \\( '' \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 8/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design an autocomplete / typeahead search component. n   Answer Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce \\227 wait 300ms before API call \\(avoid call per keystroke\\) Minimum query length \\227 don't search for empty or 1 char Client-side cache \\227 same query = no duplicate API call Keyboard navigation \\227 arrow keys, Enter to select, Escape to close Accessibility \\227 ARIA combobox pattern, screen reader announcements Loading state \\227 show spinner while fetching Error state \\227 show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string \\(avoid re-fetching same query\\) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete  1 const   useDebounce   =   \\( value ,   delay   =   300 \\)   = >   {  2     const   [ debounced ,   setDebounced ]   =   useState \\( value \\)  3     useEffect \\( \\( \\)   = >   {  4         const   timer   =   setTimeout \\( \\( \\)   = >   setDebounced \\( value \\) ,   delay \\)  5         return   \\( \\)   = >   clearTimeout \\( timer \\)     // cancel on new keystroke  6     } ,   [ value ,   delay ] \\)  7     return   debounced  8 }  9 10 const   Autocomplete   =   \\( {   onSelect   } \\)   = >   { 11     const   [ query ,   setQuery ]   =   useState \\( '' \\) 12     const   [ activeIdx ,   setActiveIdx ]   =   useState \\( - 1 \\) 13     const   debouncedQuery   =   useDebounce \\( query ,   300 \\) 14 15     // React Query: deduplicates, caches, aborts stale 16     const   {   data :   results   =   [ ] ,   isLoading   }   =   useQuery \\( { 17         queryKey :   [ 'search' ,   debouncedQuery ] , 18         queryFn :   \\( \\)   = >   api . search \\( debouncedQuery \\) , 19         enabled :   debouncedQuery . length   > =   2 ,     // min 2 chars 20         staleTime :   60_000 ,     // cache 1 min 21     } \\) 22 23     const   handleKeyDown   =   \\( e \\)   = >   { 24         if   \\( e . key   = = =   'ArrowDown' \\)   setActiveIdx \\( i   = >   Math . min \\( i + 1 ,   results . length - 1 \\) \\) 25         if   \\( e . key   = = =   'ArrowUp' \\)       setActiveIdx \\( i   = >   Math . max \\( i - 1 ,   - 1 \\) \\) 26         if   \\( e . key   = = =   'Enter'   & &   activeIdx   > =   0 \\)   onSelect \\( results [ activeIdx ] \\) 27         if   \\( e . key   = = =   'Escape' \\)   setQuery \\( '' \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 8/42.",
    hints: [
      "Consider the core principles and trade-offs of Design an autocomplete / typeahead search component. n   Answer Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce \\227 wait 300ms before API call \\(avoid call per keystroke\\) Minimum query length \\227 don't search for empty or 1 char Client-side cache \\227 same query = no duplicate API call Keyboard navigation \\227 arrow keys, Enter to select, Escape to close Accessibility \\227 ARIA combobox pattern, screen reader announcements Loading state \\227 show spinner while fetching Error state \\227 show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string \\(avoid re-fetching same query\\) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete  1 const   useDebounce   =   \\( value ,   delay   =   300 \\)   = >   {  2     const   [ debounced ,   setDebounced ]   =   useState \\( value \\)  3     useEffect \\( \\( \\)   = >   {  4         const   timer   =   setTimeout \\( \\( \\)   = >   setDebounced \\( value \\) ,   delay \\)  5         return   \\( \\)   = >   clearTimeout \\( timer \\)     // cancel on new keystroke  6     } ,   [ value ,   delay ] \\)  7     return   debounced  8 }  9 10 const   Autocomplete   =   \\( {   onSelect   } \\)   = >   { 11     const   [ query ,   setQuery ]   =   useState \\( '' \\) 12     const   [ activeIdx ,   setActiveIdx ]   =   useState \\( - 1 \\) 13     const   debouncedQuery   =   useDebounce \\( query ,   300 \\) 14 15     // React Query: deduplicates, caches, aborts stale 16     const   {   data :   results   =   [ ] ,   isLoading   }   =   useQuery \\( { 17         queryKey :   [ 'search' ,   debouncedQuery ] , 18         queryFn :   \\( \\)   = >   api . search \\( debouncedQuery \\) , 19         enabled :   debouncedQuery . length   > =   2 ,     // min 2 chars 20         staleTime :   60_000 ,     // cache 1 min 21     } \\) 22 23     const   handleKeyDown   =   \\( e \\)   = >   { 24         if   \\( e . key   = = =   'ArrowDown' \\)   setActiveIdx \\( i   = >   Math . min \\( i + 1 ,   results . length - 1 \\) \\) 25         if   \\( e . key   = = =   'ArrowUp' \\)       setActiveIdx \\( i   = >   Math . max \\( i - 1 ,   - 1 \\) \\) 26         if   \\( e . key   = = =   'Enter'   & &   activeIdx   > =   0 \\)   onSelect \\( results [ activeIdx ] \\) 27         if   \\( e . key   = = =   'Escape' \\)   setQuery \\( '' \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 8/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-real-time-notification-system-on-th",
    title: "How do you design a real-time notification system on the frontend? n   Answer Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets \\227 bidirectional, full-duplex, best for chat/collaborative Server-Sent Events \\(SSE\\) \\227 one-way server \\256 client, simpler, auto-reconnect Long Polling \\227 repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications \\(one-way\\)  \\256  SSE \\(simpler, HTTP/2 multiplexed, auto-reconnect\\) Chat, collaborative editing  \\256  WebSockets \\(bidirectional\\) Low frequency updates  \\256  Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center \\(React Query cache\\) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect  1 // SSE \\(Server-Sent Events\\) \\227 best for notifications  2 const   useNotifications   =   \\( \\)   = >   {  3     const   [ notifications ,   setNotifications ]   =   useState \\( [ ] \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     useEffect \\( \\( \\)   = >   {  7         const   es   =   new   EventSource \\( '/api/notifications/stream' ,   {  8             withCredentials :   true ,  9         } \\) 10 11         es . addEventListener \\( 'notification' ,   \\( e \\)   = >   { 12             const   notification   =   JSON . parse \\( e . data \\) 13             // Add to local state 14             setNotifications \\( prev   = >   [ notification ,   . . . prev ] \\) 15             // Invalidate React Query cache to sync notification center 16             queryClient . invalidateQueries \\( {   queryKey :   [ 'notifications' ]   } \\) 17             // Show toast 18             toast \\( notification . message \\) 19         } \\) 20 21         es . onerror   =   \\( \\)   = >   { 22             es . close \\( \\) 23             // Auto-reconnect after 5 seconds Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 9/42",
    prompt: "How do you design a real-time notification system on the frontend? n   Answer Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets \\227 bidirectional, full-duplex, best for chat/collaborative Server-Sent Events \\(SSE\\) \\227 one-way server \\256 client, simpler, auto-reconnect Long Polling \\227 repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications \\(one-way\\)  \\256  SSE \\(simpler, HTTP/2 multiplexed, auto-reconnect\\) Chat, collaborative editing  \\256  WebSockets \\(bidirectional\\) Low frequency updates  \\256  Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center \\(React Query cache\\) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect  1 // SSE \\(Server-Sent Events\\) \\227 best for notifications  2 const   useNotifications   =   \\( \\)   = >   {  3     const   [ notifications ,   setNotifications ]   =   useState \\( [ ] \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     useEffect \\( \\( \\)   = >   {  7         const   es   =   new   EventSource \\( '/api/notifications/stream' ,   {  8             withCredentials :   true ,  9         } \\) 10 11         es . addEventListener \\( 'notification' ,   \\( e \\)   = >   { 12             const   notification   =   JSON . parse \\( e . data \\) 13             // Add to local state 14             setNotifications \\( prev   = >   [ notification ,   . . . prev ] \\) 15             // Invalidate React Query cache to sync notification center 16             queryClient . invalidateQueries \\( {   queryKey :   [ 'notifications' ]   } \\) 17             // Show toast 18             toast \\( notification . message \\) 19         } \\) 20 21         es . onerror   =   \\( \\)   = >   { 22             es . close \\( \\) 23             // Auto-reconnect after 5 seconds Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 9/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "24 setTimeout ( ( ) = > reconnect ( ) , 5000 ) 25 } 26 27 return ( ) = > es.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "24 setTimeout ( ( ) = > reconnect ( ) , 5000 ) 25 } 26 27 return ( ) = > es . close ( ) // cleanup on unmount 28 } , [ ] ) 29 30 return { notifications } 31 } 32 33 // Notification bell with unread badge 34 const NotificationBell = ( ) = > { 35 const { data : unread = 0 } = useQuery ( { 36 queryKey : [ 'notifications' , 'unread' ] , 37 queryFn : api . getUnreadCount , 38 refetchInterval : 30_000 // fallback polling 39 } ) 40 return ( 41 < button aria - label = { `${unread} unread notifications` } > 42 < BellIcon / > 43 { unread > 0 & & < Badge > { unread > 99 ? '99+' : unread } < / Badge > } 44 < / button > 45 ) 46 } n Interview Tip: Use SSE over WebSockets for notifications \\227 SSE is simpler, works over HTTP/2 (multiplexed automatically), auto-reconnects natively, and doesn't require a special server setup. WebSockets shine for truly bidirectional communication like chat or collaborative editing. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 9/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a real-time notification system on the frontend? n   Answer Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets \\227 bidirectional, full-duplex, best for chat/collaborative Server-Sent Events \\(SSE\\) \\227 one-way server \\256 client, simpler, auto-reconnect Long Polling \\227 repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications \\(one-way\\)  \\256  SSE \\(simpler, HTTP/2 multiplexed, auto-reconnect\\) Chat, collaborative editing  \\256  WebSockets \\(bidirectional\\) Low frequency updates  \\256  Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center \\(React Query cache\\) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect  1 // SSE \\(Server-Sent Events\\) \\227 best for notifications  2 const   useNotifications   =   \\( \\)   = >   {  3     const   [ notifications ,   setNotifications ]   =   useState \\( [ ] \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     useEffect \\( \\( \\)   = >   {  7         const   es   =   new   EventSource \\( '/api/notifications/stream' ,   {  8             withCredentials :   true ,  9         } \\) 10 11         es . addEventListener \\( 'notification' ,   \\( e \\)   = >   { 12             const   notification   =   JSON . parse \\( e . data \\) 13             // Add to local state 14             setNotifications \\( prev   = >   [ notification ,   . . . prev ] \\) 15             // Invalidate React Query cache to sync notification center 16             queryClient . invalidateQueries \\( {   queryKey :   [ 'notifications' ]   } \\) 17             // Show toast 18             toast \\( notification . message \\) 19         } \\) 20 21         es . onerror   =   \\( \\)   = >   { 22             es . close \\( \\) 23             // Auto-reconnect after 5 seconds Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 9/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a real-time notification system on the frontend? n   Answer Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets \\227 bidirectional, full-duplex, best for chat/collaborative Server-Sent Events \\(SSE\\) \\227 one-way server \\256 client, simpler, auto-reconnect Long Polling \\227 repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications \\(one-way\\)  \\256  SSE \\(simpler, HTTP/2 multiplexed, auto-reconnect\\) Chat, collaborative editing  \\256  WebSockets \\(bidirectional\\) Low frequency updates  \\256  Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center \\(React Query cache\\) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect  1 // SSE \\(Server-Sent Events\\) \\227 best for notifications  2 const   useNotifications   =   \\( \\)   = >   {  3     const   [ notifications ,   setNotifications ]   =   useState \\( [ ] \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     useEffect \\( \\( \\)   = >   {  7         const   es   =   new   EventSource \\( '/api/notifications/stream' ,   {  8             withCredentials :   true ,  9         } \\) 10 11         es . addEventListener \\( 'notification' ,   \\( e \\)   = >   { 12             const   notification   =   JSON . parse \\( e . data \\) 13             // Add to local state 14             setNotifications \\( prev   = >   [ notification ,   . . . prev ] \\) 15             // Invalidate React Query cache to sync notification center 16             queryClient . invalidateQueries \\( {   queryKey :   [ 'notifications' ]   } \\) 17             // Show toast 18             toast \\( notification . message \\) 19         } \\) 20 21         es . onerror   =   \\( \\)   = >   { 22             es . close \\( \\) 23             // Auto-reconnect after 5 seconds Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 9/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a real-time notification system on the frontend? n   Answer Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets \\227 bidirectional, full-duplex, best for chat/collaborative Server-Sent Events \\(SSE\\) \\227 one-way server \\256 client, simpler, auto-reconnect Long Polling \\227 repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications \\(one-way\\)  \\256  SSE \\(simpler, HTTP/2 multiplexed, auto-reconnect\\) Chat, collaborative editing  \\256  WebSockets \\(bidirectional\\) Low frequency updates  \\256  Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center \\(React Query cache\\) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect  1 // SSE \\(Server-Sent Events\\) \\227 best for notifications  2 const   useNotifications   =   \\( \\)   = >   {  3     const   [ notifications ,   setNotifications ]   =   useState \\( [ ] \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     useEffect \\( \\( \\)   = >   {  7         const   es   =   new   EventSource \\( '/api/notifications/stream' ,   {  8             withCredentials :   true ,  9         } \\) 10 11         es . addEventListener \\( 'notification' ,   \\( e \\)   = >   { 12             const   notification   =   JSON . parse \\( e . data \\) 13             // Add to local state 14             setNotifications \\( prev   = >   [ notification ,   . . . prev ] \\) 15             // Invalidate React Query cache to sync notification center 16             queryClient . invalidateQueries \\( {   queryKey :   [ 'notifications' ]   } \\) 17             // Show toast 18             toast \\( notification . message \\) 19         } \\) 20 21         es . onerror   =   \\( \\)   = >   { 22             es . close \\( \\) 23             // Auto-reconnect after 5 seconds Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 9/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-handle-file-uploads-in-a-frontend-system-at",
    title: "How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42",
    prompt: "How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 if ( e . lengthComputable ) 28 setProgress ( Math . round ( ( e . loaded / e . total ) * 100 ) ) 29 } ) 30 31 xhr . onload = ( ) = > xhr . status = = = 200 ? resolve ( ) : reject ( ) 32 xhr . onerror = reject 33 xhr . send ( file ) 34 } ) 35 36 // Step 3: notify server of successful upload 37 await api . confirmUpload ( { key , originalName : file . name } ) 38 setStatus ( 'done' ) 39 return key 40 } 41 42 return { upload , progress , status } 43 } 44 45 // Preview before upload 46 const ImagePreview = ( { file } ) = > { 47 const [ src , setSrc ] = useState ( null ) 48 useEffect ( ( ) = > { 49 const reader = new FileReader ( ) 50 reader . onload = e = > setSrc ( e . target . result ) 51 reader . readAsDataURL ( file ) 52 } , [ file ] ) 53 return src ? < img src = { src } alt = 'preview' / > : null 54 } n Interview Tip: Never upload files through your Node.js server if you can avoid it. Presigned S3 URLs let the browser upload directly to S3, bypassing your server entirely. This means no memory pressure on your server, no bandwidth costs, and uploads as fast as S3 can accept. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 10/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you handle file uploads in a frontend system at scale? n   Answer File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser  \\256  server \\227 simple but limits to server memory Presigned URL \\(S3\\) \\227 browser uploads directly to S3, server not involved Chunked upload \\227 split large file into chunks, upload in parallel Resumable upload \\227 resume interrupted uploads from where they stopped Presigned URL flow \\(best for production\\): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL \\(15 min expiry\\) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar \\(track bytes uploaded\\) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload \\(FileReader API\\)  1 // Presigned URL upload with progress tracking  2 const   useFileUpload   =   \\( \\)   = >   {  3     const   [ progress ,   setProgress ]   =   useState \\( 0 \\)  4     const   [ status ,   setStatus ]       =   useState \\( 'idle' \\)   // uploading|done|error  5  6     const   upload   =   async   \\( file \\)   = >   {  7         // Validate before upload  8         if   \\( file . size   >   10   *   1024   *   1024 \\)   throw   new   Error \\( 'Max 10MB' \\)  9         if   \\( ! [ 'image/jpeg' , 'image/png' , 'image/webp' ] . includes \\( file . type \\) \\) 10             throw   new   Error \\( 'Only JPEG/PNG/WebP allowed' \\) 11 12         setStatus \\( 'uploading' \\) 13 14         // Step 1: get presigned URL from our server 15         const   {   presignedUrl ,   key   }   =   await   api . getPresignedUrl \\( { 16             filename :   file . name , 17             contentType :   file . type 18         } \\) 19 20         // Step 2: upload directly to S3 with progress tracking 21         await   new   Promise \\( \\( resolve ,   reject \\)   = >   { 22             const   xhr   =   new   XMLHttpRequest \\( \\) 23             xhr . open \\( 'PUT' ,   presignedUrl \\) 24             xhr . setRequestHeader \\( 'Content-Type' ,   file . type \\) 25 26             xhr . upload . addEventListener \\( 'progress' ,   \\( e \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 10/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-explain-react-rendering-optimisation-227-memo-usememo-u",
    title: "Explain React rendering optimisation \\227 memo, useMemo, useCallback. n   Answer React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes \\(useState, useReducer\\) Parent re-renders \\(unless component is memoized\\) Context value changes Optimization tools: React.memo \\227 memoize a component \\(skip re-render if props unchanged\\) useMemo \\227 memoize an expensive calculated value useCallback \\227 memoize a function reference \\(stable reference\\) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize \\227 profile first, optimize second When to use each: React.memo \\227 child component receives same props but parent re-renders often useCallback \\227 function passed as prop to memoized child useMemo \\227 expensive calculation \\(filtering, sorting 1000+ items\\)  1 // Problem: Parent re-renders, ALL children re-render unnecessarily  2 const   ExpensiveChild   =   React . memo \\( \\( {   items ,   onSelect   } \\)   = >   {  3     // Only re-renders when items or onSelect reference changes  4     return   < List   items = { items }   onSelect = { onSelect }   / >  5 } \\)  6  7 const   Parent   =   \\( \\)   = >   {  8     const   [ count ,   setCount ]   =   useState \\( 0 \\)  9     const   [ items ,   setItems ]     =   useState \\( bigList \\) 10 11     //  n  New function every render \\227 memo is useless! 12     // const handleSelect = \\(id\\) => console.log\\(id\\) 13 14     //  n  Stable function reference \\227 memo works! 15     const   handleSelect   =   useCallback \\( \\( id \\)   = >   { 16         console . log \\( 'selected' ,   id \\) 17     } ,   [ ] \\)     // no deps \\227 never recreated 18 19     //  n  Recalculates on every render 20     // const filtered = items.filter\\(i => i.active\\) 21 22     //  n  Only recalculates when items changes 23     const   filtered   =   useMemo \\( 24         \\( \\)   = >   items . filter \\( i   = >   i . active \\) . sort \\( \\( a , b \\)   = >   b . score   -   a . score \\) , Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 13/42",
    prompt: "Explain React rendering optimisation \\227 memo, useMemo, useCallback. n   Answer React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes \\(useState, useReducer\\) Parent re-renders \\(unless component is memoized\\) Context value changes Optimization tools: React.memo \\227 memoize a component \\(skip re-render if props unchanged\\) useMemo \\227 memoize an expensive calculated value useCallback \\227 memoize a function reference \\(stable reference\\) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize \\227 profile first, optimize second When to use each: React.memo \\227 child component receives same props but parent re-renders often useCallback \\227 function passed as prop to memoized child useMemo \\227 expensive calculation \\(filtering, sorting 1000+ items\\)  1 // Problem: Parent re-renders, ALL children re-render unnecessarily  2 const   ExpensiveChild   =   React . memo \\( \\( {   items ,   onSelect   } \\)   = >   {  3     // Only re-renders when items or onSelect reference changes  4     return   < List   items = { items }   onSelect = { onSelect }   / >  5 } \\)  6  7 const   Parent   =   \\( \\)   = >   {  8     const   [ count ,   setCount ]   =   useState \\( 0 \\)  9     const   [ items ,   setItems ]     =   useState \\( bigList \\) 10 11     //  n  New function every render \\227 memo is useless! 12     // const handleSelect = \\(id\\) => console.log\\(id\\) 13 14     //  n  Stable function reference \\227 memo works! 15     const   handleSelect   =   useCallback \\( \\( id \\)   = >   { 16         console . log \\( 'selected' ,   id \\) 17     } ,   [ ] \\)     // no deps \\227 never recreated 18 19     //  n  Recalculates on every render 20     // const filtered = items.filter\\(i => i.active\\) 21 22     //  n  Only recalculates when items changes 23     const   filtered   =   useMemo \\( 24         \\( \\)   = >   items . filter \\( i   = >   i . active \\) . sort \\( \\( a , b \\)   = >   b . score   -   a . score \\) , Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 13/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "25 [ items ] 26 ) 27 28 return ( 29 < > 30 < button onClick = { ( ) = > setCount ( c = > c + 1 ) } > Count : { count } < / button > 31 < ExpensiveChild items = { filtered } onSelect = { handleSelect } / > 32 < / > 33 ) 34 } 35 36 // React DevTools Profiler: see what's re-rendering 37 // Enable 'Highlight updates when components render' 38 // Identify components re-rendering unnecessarily n Interview Tip: Only optimize when you have a measurable problem.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "25 [ items ] 26 ) 27 28 return ( 29 < > 30 < button onClick = { ( ) = > setCount ( c = > c + 1 ) } > Count : { count } < / button > 31 < ExpensiveChild items = { filtered } onSelect = { handleSelect } / > 32 < / > 33 ) 34 } 35 36 // React DevTools Profiler: see what's re-rendering 37 // Enable 'Highlight updates when components render' 38 // Identify components re-rendering unnecessarily n Interview Tip: Only optimize when you have a measurable problem. Premature optimization adds complexity. Use React DevTools Profiler to identify components re-rendering unnecessarily, then apply memo/useCallback/useMemo. Over-memoizing can actually slow your app down due to cache comparison overhead. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 13/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain React rendering optimisation \\227 memo, useMemo, useCallback. n   Answer React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes \\(useState, useReducer\\) Parent re-renders \\(unless component is memoized\\) Context value changes Optimization tools: React.memo \\227 memoize a component \\(skip re-render if props unchanged\\) useMemo \\227 memoize an expensive calculated value useCallback \\227 memoize a function reference \\(stable reference\\) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize \\227 profile first, optimize second When to use each: React.memo \\227 child component receives same props but parent re-renders often useCallback \\227 function passed as prop to memoized child useMemo \\227 expensive calculation \\(filtering, sorting 1000+ items\\)  1 // Problem: Parent re-renders, ALL children re-render unnecessarily  2 const   ExpensiveChild   =   React . memo \\( \\( {   items ,   onSelect   } \\)   = >   {  3     // Only re-renders when items or onSelect reference changes  4     return   < List   items = { items }   onSelect = { onSelect }   / >  5 } \\)  6  7 const   Parent   =   \\( \\)   = >   {  8     const   [ count ,   setCount ]   =   useState \\( 0 \\)  9     const   [ items ,   setItems ]     =   useState \\( bigList \\) 10 11     //  n  New function every render \\227 memo is useless! 12     // const handleSelect = \\(id\\) => console.log\\(id\\) 13 14     //  n  Stable function reference \\227 memo works! 15     const   handleSelect   =   useCallback \\( \\( id \\)   = >   { 16         console . log \\( 'selected' ,   id \\) 17     } ,   [ ] \\)     // no deps \\227 never recreated 18 19     //  n  Recalculates on every render 20     // const filtered = items.filter\\(i => i.active\\) 21 22     //  n  Only recalculates when items changes 23     const   filtered   =   useMemo \\( 24         \\( \\)   = >   items . filter \\( i   = >   i . active \\) . sort \\( \\( a , b \\)   = >   b . score   -   a . score \\) , Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 13/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain React rendering optimisation \\227 memo, useMemo, useCallback. n   Answer React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes \\(useState, useReducer\\) Parent re-renders \\(unless component is memoized\\) Context value changes Optimization tools: React.memo \\227 memoize a component \\(skip re-render if props unchanged\\) useMemo \\227 memoize an expensive calculated value useCallback \\227 memoize a function reference \\(stable reference\\) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize \\227 profile first, optimize second When to use each: React.memo \\227 child component receives same props but parent re-renders often useCallback \\227 function passed as prop to memoized child useMemo \\227 expensive calculation \\(filtering, sorting 1000+ items\\)  1 // Problem: Parent re-renders, ALL children re-render unnecessarily  2 const   ExpensiveChild   =   React . memo \\( \\( {   items ,   onSelect   } \\)   = >   {  3     // Only re-renders when items or onSelect reference changes  4     return   < List   items = { items }   onSelect = { onSelect }   / >  5 } \\)  6  7 const   Parent   =   \\( \\)   = >   {  8     const   [ count ,   setCount ]   =   useState \\( 0 \\)  9     const   [ items ,   setItems ]     =   useState \\( bigList \\) 10 11     //  n  New function every render \\227 memo is useless! 12     // const handleSelect = \\(id\\) => console.log\\(id\\) 13 14     //  n  Stable function reference \\227 memo works! 15     const   handleSelect   =   useCallback \\( \\( id \\)   = >   { 16         console . log \\( 'selected' ,   id \\) 17     } ,   [ ] \\)     // no deps \\227 never recreated 18 19     //  n  Recalculates on every render 20     // const filtered = items.filter\\(i => i.active\\) 21 22     //  n  Only recalculates when items changes 23     const   filtered   =   useMemo \\( 24         \\( \\)   = >   items . filter \\( i   = >   i . active \\) . sort \\( \\( a , b \\)   = >   b . score   -   a . score \\) , Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 13/42.",
    hints: [
      "Consider the core principles and trade-offs of Explain React rendering optimisation \\227 memo, useMemo, useCallback. n   Answer React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes \\(useState, useReducer\\) Parent re-renders \\(unless component is memoized\\) Context value changes Optimization tools: React.memo \\227 memoize a component \\(skip re-render if props unchanged\\) useMemo \\227 memoize an expensive calculated value useCallback \\227 memoize a function reference \\(stable reference\\) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize \\227 profile first, optimize second When to use each: React.memo \\227 child component receives same props but parent re-renders often useCallback \\227 function passed as prop to memoized child useMemo \\227 expensive calculation \\(filtering, sorting 1000+ items\\)  1 // Problem: Parent re-renders, ALL children re-render unnecessarily  2 const   ExpensiveChild   =   React . memo \\( \\( {   items ,   onSelect   } \\)   = >   {  3     // Only re-renders when items or onSelect reference changes  4     return   < List   items = { items }   onSelect = { onSelect }   / >  5 } \\)  6  7 const   Parent   =   \\( \\)   = >   {  8     const   [ count ,   setCount ]   =   useState \\( 0 \\)  9     const   [ items ,   setItems ]     =   useState \\( bigList \\) 10 11     //  n  New function every render \\227 memo is useless! 12     // const handleSelect = \\(id\\) => console.log\\(id\\) 13 14     //  n  Stable function reference \\227 memo works! 15     const   handleSelect   =   useCallback \\( \\( id \\)   = >   { 16         console . log \\( 'selected' ,   id \\) 17     } ,   [ ] \\)     // no deps \\227 never recreated 18 19     //  n  Recalculates on every render 20     // const filtered = items.filter\\(i => i.active\\) 21 22     //  n  Only recalculates when items changes 23     const   filtered   =   useMemo \\( 24         \\( \\)   = >   items . filter \\( i   = >   i . active \\) . sort \\( \\( a , b \\)   = >   b . score   -   a . score \\) , Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 13/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-handle-authentication-and-authorization-on-t",
    title: "How do you handle authentication and authorization on the frontend? n   Answer Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage \\227 accessible by JS, vulnerable to XSS \\227 AVOID for tokens sessionStorage \\227 same as localStorage, clears on tab close \\227 AVOID HttpOnly cookies \\227 not accessible by JS, XSS-safe \\227 RECOMMENDED Memory \\(useState\\) \\227 most secure but lost on refresh \\227 for short sessions Token strategy \\(production\\): Access token \\227 short-lived \\(15 min\\), in memory or HttpOnly cookie Refresh token \\227 long-lived \\(7 days\\), HttpOnly cookie only Server sets HttpOnly cookies \\227 JS cannot read them Route protection: Protected routes \\227 redirect to login if no auth Role-based \\227 check user.role before rendering admin sections Optimistic \\227 show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed  1 // Auth context with HttpOnly cookie approach  2 const   AuthContext   =   createContext \\( null \\)  3  4 const   AuthProvider   =   \\( {   children   } \\)   = >   {  5     const   [ user ,   setUser ]   =   useState \\( null \\)  6     const   [ loading ,   setLoading ]   =   useState \\( true \\)  7  8     // Validate session on app load  9     useEffect \\( \\( \\)   = >   { 10         api . get \\( '/auth/me' \\)     // server reads HttpOnly cookie 11             . then \\( res   = >   setUser \\( res . data \\) \\) 12             . catch \\( \\( \\)   = >   setUser \\( null \\) \\) 13             . finally \\( \\( \\)   = >   setLoading \\( false \\) \\) 14     } ,   [ ] \\) 15 16     const   login   =   async   \\( email ,   password \\)   = >   { 17         const   res   =   await   api . post \\( '/auth/login' ,   {   email ,   password   } \\) 18         // Server sets HttpOnly cookie \\227 JS never sees the token! 19         setUser \\( res . data . user \\) 20     } 21 22     const   logout   =   async   \\( \\)   = >   { 23         await   api . post \\( '/auth/logout' \\)     // server clears cookie 24         setUser \\( null \\) 25     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 16/42",
    prompt: "How do you handle authentication and authorization on the frontend? n   Answer Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage \\227 accessible by JS, vulnerable to XSS \\227 AVOID for tokens sessionStorage \\227 same as localStorage, clears on tab close \\227 AVOID HttpOnly cookies \\227 not accessible by JS, XSS-safe \\227 RECOMMENDED Memory \\(useState\\) \\227 most secure but lost on refresh \\227 for short sessions Token strategy \\(production\\): Access token \\227 short-lived \\(15 min\\), in memory or HttpOnly cookie Refresh token \\227 long-lived \\(7 days\\), HttpOnly cookie only Server sets HttpOnly cookies \\227 JS cannot read them Route protection: Protected routes \\227 redirect to login if no auth Role-based \\227 check user.role before rendering admin sections Optimistic \\227 show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed  1 // Auth context with HttpOnly cookie approach  2 const   AuthContext   =   createContext \\( null \\)  3  4 const   AuthProvider   =   \\( {   children   } \\)   = >   {  5     const   [ user ,   setUser ]   =   useState \\( null \\)  6     const   [ loading ,   setLoading ]   =   useState \\( true \\)  7  8     // Validate session on app load  9     useEffect \\( \\( \\)   = >   { 10         api . get \\( '/auth/me' \\)     // server reads HttpOnly cookie 11             . then \\( res   = >   setUser \\( res . data \\) \\) 12             . catch \\( \\( \\)   = >   setUser \\( null \\) \\) 13             . finally \\( \\( \\)   = >   setLoading \\( false \\) \\) 14     } ,   [ ] \\) 15 16     const   login   =   async   \\( email ,   password \\)   = >   { 17         const   res   =   await   api . post \\( '/auth/login' ,   {   email ,   password   } \\) 18         // Server sets HttpOnly cookie \\227 JS never sees the token! 19         setUser \\( res . data . user \\) 20     } 21 22     const   logout   =   async   \\( \\)   = >   { 23         await   api . post \\( '/auth/logout' \\)     // server clears cookie 24         setUser \\( null \\) 25     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 16/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "26 27 return ( 28 < AuthContext.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "26 27 return ( 28 < AuthContext . Provider value = { { user , loading , login , logout } } > 29 { ! loading & & children } 30 < / AuthContext . Provider > 31 ) 32 } 33 34 // Protected route 35 const ProtectedRoute = ( { children , requiredRole } ) = > { 36 const { user } = useAuth ( ) 37 if ( ! user ) return < Navigate to = '/login' replace / > 38 if ( requiredRole & & user . role ! = = requiredRole ) 39 return < Navigate to = '/forbidden' replace / > 40 return children 41 } n Interview Tip: Never store JWT tokens in localStorage. XSS attacks can steal them with a single line of JavaScript. Use HttpOnly cookies \\227 they are inaccessible to JavaScript by design. The server sets them, reads them, and invalidates them. Your frontend never sees the token. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 16/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle authentication and authorization on the frontend? n   Answer Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage \\227 accessible by JS, vulnerable to XSS \\227 AVOID for tokens sessionStorage \\227 same as localStorage, clears on tab close \\227 AVOID HttpOnly cookies \\227 not accessible by JS, XSS-safe \\227 RECOMMENDED Memory \\(useState\\) \\227 most secure but lost on refresh \\227 for short sessions Token strategy \\(production\\): Access token \\227 short-lived \\(15 min\\), in memory or HttpOnly cookie Refresh token \\227 long-lived \\(7 days\\), HttpOnly cookie only Server sets HttpOnly cookies \\227 JS cannot read them Route protection: Protected routes \\227 redirect to login if no auth Role-based \\227 check user.role before rendering admin sections Optimistic \\227 show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed  1 // Auth context with HttpOnly cookie approach  2 const   AuthContext   =   createContext \\( null \\)  3  4 const   AuthProvider   =   \\( {   children   } \\)   = >   {  5     const   [ user ,   setUser ]   =   useState \\( null \\)  6     const   [ loading ,   setLoading ]   =   useState \\( true \\)  7  8     // Validate session on app load  9     useEffect \\( \\( \\)   = >   { 10         api . get \\( '/auth/me' \\)     // server reads HttpOnly cookie 11             . then \\( res   = >   setUser \\( res . data \\) \\) 12             . catch \\( \\( \\)   = >   setUser \\( null \\) \\) 13             . finally \\( \\( \\)   = >   setLoading \\( false \\) \\) 14     } ,   [ ] \\) 15 16     const   login   =   async   \\( email ,   password \\)   = >   { 17         const   res   =   await   api . post \\( '/auth/login' ,   {   email ,   password   } \\) 18         // Server sets HttpOnly cookie \\227 JS never sees the token! 19         setUser \\( res . data . user \\) 20     } 21 22     const   logout   =   async   \\( \\)   = >   { 23         await   api . post \\( '/auth/logout' \\)     // server clears cookie 24         setUser \\( null \\) 25     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 16/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle authentication and authorization on the frontend? n   Answer Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage \\227 accessible by JS, vulnerable to XSS \\227 AVOID for tokens sessionStorage \\227 same as localStorage, clears on tab close \\227 AVOID HttpOnly cookies \\227 not accessible by JS, XSS-safe \\227 RECOMMENDED Memory \\(useState\\) \\227 most secure but lost on refresh \\227 for short sessions Token strategy \\(production\\): Access token \\227 short-lived \\(15 min\\), in memory or HttpOnly cookie Refresh token \\227 long-lived \\(7 days\\), HttpOnly cookie only Server sets HttpOnly cookies \\227 JS cannot read them Route protection: Protected routes \\227 redirect to login if no auth Role-based \\227 check user.role before rendering admin sections Optimistic \\227 show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed  1 // Auth context with HttpOnly cookie approach  2 const   AuthContext   =   createContext \\( null \\)  3  4 const   AuthProvider   =   \\( {   children   } \\)   = >   {  5     const   [ user ,   setUser ]   =   useState \\( null \\)  6     const   [ loading ,   setLoading ]   =   useState \\( true \\)  7  8     // Validate session on app load  9     useEffect \\( \\( \\)   = >   { 10         api . get \\( '/auth/me' \\)     // server reads HttpOnly cookie 11             . then \\( res   = >   setUser \\( res . data \\) \\) 12             . catch \\( \\( \\)   = >   setUser \\( null \\) \\) 13             . finally \\( \\( \\)   = >   setLoading \\( false \\) \\) 14     } ,   [ ] \\) 15 16     const   login   =   async   \\( email ,   password \\)   = >   { 17         const   res   =   await   api . post \\( '/auth/login' ,   {   email ,   password   } \\) 18         // Server sets HttpOnly cookie \\227 JS never sees the token! 19         setUser \\( res . data . user \\) 20     } 21 22     const   logout   =   async   \\( \\)   = >   { 23         await   api . post \\( '/auth/logout' \\)     // server clears cookie 24         setUser \\( null \\) 25     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 16/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you handle authentication and authorization on the frontend? n   Answer Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage \\227 accessible by JS, vulnerable to XSS \\227 AVOID for tokens sessionStorage \\227 same as localStorage, clears on tab close \\227 AVOID HttpOnly cookies \\227 not accessible by JS, XSS-safe \\227 RECOMMENDED Memory \\(useState\\) \\227 most secure but lost on refresh \\227 for short sessions Token strategy \\(production\\): Access token \\227 short-lived \\(15 min\\), in memory or HttpOnly cookie Refresh token \\227 long-lived \\(7 days\\), HttpOnly cookie only Server sets HttpOnly cookies \\227 JS cannot read them Route protection: Protected routes \\227 redirect to login if no auth Role-based \\227 check user.role before rendering admin sections Optimistic \\227 show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed  1 // Auth context with HttpOnly cookie approach  2 const   AuthContext   =   createContext \\( null \\)  3  4 const   AuthProvider   =   \\( {   children   } \\)   = >   {  5     const   [ user ,   setUser ]   =   useState \\( null \\)  6     const   [ loading ,   setLoading ]   =   useState \\( true \\)  7  8     // Validate session on app load  9     useEffect \\( \\( \\)   = >   { 10         api . get \\( '/auth/me' \\)     // server reads HttpOnly cookie 11             . then \\( res   = >   setUser \\( res . data \\) \\) 12             . catch \\( \\( \\)   = >   setUser \\( null \\) \\) 13             . finally \\( \\( \\)   = >   setLoading \\( false \\) \\) 14     } ,   [ ] \\) 15 16     const   login   =   async   \\( email ,   password \\)   = >   { 17         const   res   =   await   api . post \\( '/auth/login' ,   {   email ,   password   } \\) 18         // Server sets HttpOnly cookie \\227 JS never sees the token! 19         setUser \\( res . data . user \\) 20     } 21 22     const   logout   =   async   \\( \\)   = >   { 23         await   api . post \\( '/auth/logout' \\)     // server clears cookie 24         setUser \\( null \\) 25     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 16/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-an-accessible-component-library-n-ans",
    title: "How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42",
    prompt: "How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "26 modal . addEventListener ( 'keydown' , trap ) 27 return ( ) = > modal . removeEventListener ( 'keydown' , trap ) 28 } , [ isOpen , onClose ] ) 29 30 if ( ! isOpen ) return null 31 return ( 32 < div role = 'dialog' aria - modal = 'true' aria - labelledby = 'modal-title' 33 ref = { modalRef } 34 style = { { position : 'fixed' , inset : 0 , background : 'rgba(0,0,0,0.5)' } } > 35 < div style = { { background : 'white' , padding : '24px' , borderRadius : '8px' } } > 36 < h2 id = 'modal-title' > { title } < / h2 > 37 { children } 38 < button onClick = { onClose } > Close < / button > 39 < / div > 40 < / div > 41 ) 42 } 43 44 // Automated a11y testing 45 import { axe , toHaveNoViolations } from 'jest-axe' 46 expect . extend ( toHaveNoViolations ) 47 test ( 'Modal has no a11y violations' , async ( ) = > { 48 const { container } = render ( < Modal isOpen title = 'Test' > Content < / Modal > ) 49 expect ( await axe ( container ) ) . toHaveNoViolations ( ) 50 } ) n Interview Tip: Run axe-core automated checks in your CI pipeline. It catches 30-40% of accessibility issues automatically. The remaining 60-70% require manual testing with a keyboard (Tab, Enter, Space, arrow keys) and a screen reader. Automated + manual is the only way to fully verify accessibility. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 18/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design an accessible component library? n   Answer Accessibility ensures your app is usable by people with disabilities \\227 and it is also required by law in many countries. WCAG 2.1 Level AA \\227 what you must meet: 1.1 \\227 Text alternatives for images \\(alt text\\) 1.4 \\227 4.5:1 colour contrast ratio for text 2.1 \\227 All functionality available via keyboard 2.4 \\227 Focus visible \\227 users can see what is focused 4.1 \\227 Name, role, value \\227 ARIA attributes correct Key ARIA patterns for components: Button \\227 native <button> \\(not <div onClick>\\) Modal \\227 role=dialog, aria-modal, focus trap Dropdown \\227 role=listbox/combobox pattern Tabs \\227 role=tablist, role=tab, role=tabpanel Accordion \\227 button with aria-expanded Testing tools: axe-core / @axe-core/react \\227 automated a11y checks NVDA/VoiceOver \\227 screen reader manual testing Keyboard-only navigation test  1 // Accessible Modal with focus trap  2 const   Modal   =   \\( {   isOpen ,   onClose ,   title ,   children   } \\)   = >   {  3     const   modalRef   =   useRef \\( null \\)  4  5     // Focus trap and Escape key  6     useEffect \\( \\( \\)   = >   {  7         if   \\( ! isOpen \\)   return  8         const   modal   =   modalRef . current  9         const   focusable   =   modal . querySelectorAll \\( 10             'button, [href], input, select, textarea, [tabindex]:not\\([tabindex=\"-1\"]\\)' 11         \\) 12         const   first   =   focusable [ 0 ] 13         const   last     =   focusable [ focusable . length   -   1 ] 14         first ? . focus \\( \\) 15 16         const   trap   =   \\( e \\)   = >   { 17             if   \\( e . key   = = =   'Tab' \\)   { 18                 if   \\( e . shiftKey   & &   document . activeElement   = = =   first \\)   { 19                     e . preventDefault \\( \\) ;   last . focus \\( \\) 20                 }   else   if   \\( ! e . shiftKey   & &   document . activeElement   = = =   last \\)   { 21                     e . preventDefault \\( \\) ;   first . focus \\( \\) 22                 } 23             } 24             if   \\( e . key   = = =   'Escape' \\)   onClose \\( \\) 25         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 18/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-micro-frontend-architecture-n-answe",
    title: "How do you design a micro-frontend architecture? n   Answer Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams \\(50+ developers\\) cannot work on one frontend codebase Independent deployments \\227 team A ships without waiting for team B Technology independence \\227 one team uses React, another Vue Isolated failures \\227 one micro-frontend crashes, others still work Implementation approaches: Module Federation \\(Webpack 5\\) \\227 share code at runtime between apps iframes \\227 complete isolation but poor UX Web Components \\227 framework-agnostic custom elements Single-SPA \\227 meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends \\(use CustomEvents or shared store\\) Consistent design system \\(shared component library or design tokens\\) Performance \\227 avoid loading same React version twice When NOT to use micro-frontends: Small teams \\(< 10 developers\\) \\227 overhead outweighs benefits  1 // Module Federation \\(Webpack 5\\) \\227 share components at runtime  2  3 // Host app webpack.config.js  4 new   ModuleFederationPlugin \\( {  5     name :   'host' ,  6     remotes :   {  7         // Load from remote app at runtime \\227 different deploy!  8         checkout :   'checkout@https://checkout.myapp.com/remoteEntry.js' ,  9         catalog :     'catalog@https://catalog.myapp.com/remoteEntry.js' , 10     } , 11     shared :   { 12         react :   {   singleton :   true ,   requiredVersion :   '^18'   } , 13         'react-dom' :   {   singleton :   true   } , 14     } 15 } \\) 16 17 // Remote \\(checkout\\) webpack.config.js 18 new   ModuleFederationPlugin \\( { 19     name :   'checkout' , 20     filename :   'remoteEntry.js' , 21     exposes :   { 22         './CheckoutFlow' :   './src/CheckoutFlow' ,     // expose this component 23     } , 24     shared :   {   react :   {   singleton :   true   }   } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 19/42",
    prompt: "How do you design a micro-frontend architecture? n   Answer Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams \\(50+ developers\\) cannot work on one frontend codebase Independent deployments \\227 team A ships without waiting for team B Technology independence \\227 one team uses React, another Vue Isolated failures \\227 one micro-frontend crashes, others still work Implementation approaches: Module Federation \\(Webpack 5\\) \\227 share code at runtime between apps iframes \\227 complete isolation but poor UX Web Components \\227 framework-agnostic custom elements Single-SPA \\227 meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends \\(use CustomEvents or shared store\\) Consistent design system \\(shared component library or design tokens\\) Performance \\227 avoid loading same React version twice When NOT to use micro-frontends: Small teams \\(< 10 developers\\) \\227 overhead outweighs benefits  1 // Module Federation \\(Webpack 5\\) \\227 share components at runtime  2  3 // Host app webpack.config.js  4 new   ModuleFederationPlugin \\( {  5     name :   'host' ,  6     remotes :   {  7         // Load from remote app at runtime \\227 different deploy!  8         checkout :   'checkout@https://checkout.myapp.com/remoteEntry.js' ,  9         catalog :     'catalog@https://catalog.myapp.com/remoteEntry.js' , 10     } , 11     shared :   { 12         react :   {   singleton :   true ,   requiredVersion :   '^18'   } , 13         'react-dom' :   {   singleton :   true   } , 14     } 15 } \\) 16 17 // Remote \\(checkout\\) webpack.config.js 18 new   ModuleFederationPlugin \\( { 19     name :   'checkout' , 20     filename :   'remoteEntry.js' , 21     exposes :   { 22         './CheckoutFlow' :   './src/CheckoutFlow' ,     // expose this component 23     } , 24     shared :   {   react :   {   singleton :   true   }   } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 19/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "25 } ) 26 27 // Host app: lazy load remote component 28 const CheckoutFlow = lazy ( ( ) = > import ( 'checkout/CheckoutFlow' ) ) 29 30 // Communication between micro-frontends via CustomEvents 31 // Emitter (catalog MFE): 32 window.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "25 } ) 26 27 // Host app: lazy load remote component 28 const CheckoutFlow = lazy ( ( ) = > import ( 'checkout/CheckoutFlow' ) ) 29 30 // Communication between micro-frontends via CustomEvents 31 // Emitter (catalog MFE): 32 window . dispatchEvent ( new CustomEvent ( 'cart:add' , { 33 detail : { productId : '123' , qty : 1 } 34 } ) ) 35 36 // Listener (cart MFE): 37 window . addEventListener ( 'cart:add' , ( e ) = > { 38 cartStore . addItem ( e . detail ) 39 } ) n Interview Tip: Only use micro-frontends when you have multiple teams working on the same frontend and deployment coordination is causing delays. The added complexity (shared state, design consistency, build tooling) is significant. For most apps, a well-structured monorepo with shared packages is the right choice. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 19/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a micro-frontend architecture? n   Answer Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams \\(50+ developers\\) cannot work on one frontend codebase Independent deployments \\227 team A ships without waiting for team B Technology independence \\227 one team uses React, another Vue Isolated failures \\227 one micro-frontend crashes, others still work Implementation approaches: Module Federation \\(Webpack 5\\) \\227 share code at runtime between apps iframes \\227 complete isolation but poor UX Web Components \\227 framework-agnostic custom elements Single-SPA \\227 meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends \\(use CustomEvents or shared store\\) Consistent design system \\(shared component library or design tokens\\) Performance \\227 avoid loading same React version twice When NOT to use micro-frontends: Small teams \\(< 10 developers\\) \\227 overhead outweighs benefits  1 // Module Federation \\(Webpack 5\\) \\227 share components at runtime  2  3 // Host app webpack.config.js  4 new   ModuleFederationPlugin \\( {  5     name :   'host' ,  6     remotes :   {  7         // Load from remote app at runtime \\227 different deploy!  8         checkout :   'checkout@https://checkout.myapp.com/remoteEntry.js' ,  9         catalog :     'catalog@https://catalog.myapp.com/remoteEntry.js' , 10     } , 11     shared :   { 12         react :   {   singleton :   true ,   requiredVersion :   '^18'   } , 13         'react-dom' :   {   singleton :   true   } , 14     } 15 } \\) 16 17 // Remote \\(checkout\\) webpack.config.js 18 new   ModuleFederationPlugin \\( { 19     name :   'checkout' , 20     filename :   'remoteEntry.js' , 21     exposes :   { 22         './CheckoutFlow' :   './src/CheckoutFlow' ,     // expose this component 23     } , 24     shared :   {   react :   {   singleton :   true   }   } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 19/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a micro-frontend architecture? n   Answer Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams \\(50+ developers\\) cannot work on one frontend codebase Independent deployments \\227 team A ships without waiting for team B Technology independence \\227 one team uses React, another Vue Isolated failures \\227 one micro-frontend crashes, others still work Implementation approaches: Module Federation \\(Webpack 5\\) \\227 share code at runtime between apps iframes \\227 complete isolation but poor UX Web Components \\227 framework-agnostic custom elements Single-SPA \\227 meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends \\(use CustomEvents or shared store\\) Consistent design system \\(shared component library or design tokens\\) Performance \\227 avoid loading same React version twice When NOT to use micro-frontends: Small teams \\(< 10 developers\\) \\227 overhead outweighs benefits  1 // Module Federation \\(Webpack 5\\) \\227 share components at runtime  2  3 // Host app webpack.config.js  4 new   ModuleFederationPlugin \\( {  5     name :   'host' ,  6     remotes :   {  7         // Load from remote app at runtime \\227 different deploy!  8         checkout :   'checkout@https://checkout.myapp.com/remoteEntry.js' ,  9         catalog :     'catalog@https://catalog.myapp.com/remoteEntry.js' , 10     } , 11     shared :   { 12         react :   {   singleton :   true ,   requiredVersion :   '^18'   } , 13         'react-dom' :   {   singleton :   true   } , 14     } 15 } \\) 16 17 // Remote \\(checkout\\) webpack.config.js 18 new   ModuleFederationPlugin \\( { 19     name :   'checkout' , 20     filename :   'remoteEntry.js' , 21     exposes :   { 22         './CheckoutFlow' :   './src/CheckoutFlow' ,     // expose this component 23     } , 24     shared :   {   react :   {   singleton :   true   }   } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 19/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a micro-frontend architecture? n   Answer Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams \\(50+ developers\\) cannot work on one frontend codebase Independent deployments \\227 team A ships without waiting for team B Technology independence \\227 one team uses React, another Vue Isolated failures \\227 one micro-frontend crashes, others still work Implementation approaches: Module Federation \\(Webpack 5\\) \\227 share code at runtime between apps iframes \\227 complete isolation but poor UX Web Components \\227 framework-agnostic custom elements Single-SPA \\227 meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends \\(use CustomEvents or shared store\\) Consistent design system \\(shared component library or design tokens\\) Performance \\227 avoid loading same React version twice When NOT to use micro-frontends: Small teams \\(< 10 developers\\) \\227 overhead outweighs benefits  1 // Module Federation \\(Webpack 5\\) \\227 share components at runtime  2  3 // Host app webpack.config.js  4 new   ModuleFederationPlugin \\( {  5     name :   'host' ,  6     remotes :   {  7         // Load from remote app at runtime \\227 different deploy!  8         checkout :   'checkout@https://checkout.myapp.com/remoteEntry.js' ,  9         catalog :     'catalog@https://catalog.myapp.com/remoteEntry.js' , 10     } , 11     shared :   { 12         react :   {   singleton :   true ,   requiredVersion :   '^18'   } , 13         'react-dom' :   {   singleton :   true   } , 14     } 15 } \\) 16 17 // Remote \\(checkout\\) webpack.config.js 18 new   ModuleFederationPlugin \\( { 19     name :   'checkout' , 20     filename :   'remoteEntry.js' , 21     exposes :   { 22         './CheckoutFlow' :   './src/CheckoutFlow' ,     // expose this component 23     } , 24     shared :   {   react :   {   singleton :   true   }   } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 19/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-handle-internationalisation-i18n-and-localis",
    title: "How do you handle internationalisation \\(i18n\\) and localisation \\(l10n\\) at scale? n   Answer i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings \\227 externalized text, keyed by ID Pluralisation \\227 '1 item', '2 items' \\227 different in every language Date/time formats \\227 DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats \\227 1,000.00 \\(US\\) vs 1.000,00 \\(Germany/India\\) Currency \\227 $ 1,000 vs Rs. 1,000 vs \\2001.000 RTL languages \\227 Arabic, Hebrew require layout mirror Text expansion \\227 German translations are 30% longer than English React i18n libraries: react-i18next \\227 most popular, feature-rich react-intl \\(FormatJS\\) \\227 based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale \\(code split!\\) ICU message format for pluralisation and variables  1 // react-i18next setup  2 import   i18n   from   'i18next'  3 import   {   initReactI18next   }   from   'react-i18next'  4 import   LanguageDetector   from   'i18next-browser-languagedetector'  5  6 i18n . use \\( LanguageDetector \\) . use \\( initReactI18next \\) . init \\( {  7     fallbackLng :   'en' ,  8     interpolation :   {   escapeValue :   false   } ,  9     backend :   {   loadPath :   '/locales/{{lng}}.json'   }     // load only needed lang 10 } \\) 11 12 // locales/en.json 13 // { 14 //   'cart.items': '{{count}} item', 15 //   'cart.items_plural': '{{count}} items', 16 //   'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const   Cart   =   \\( {   itemCount   } \\)   = >   { 21     const   {   t   }   =   useTranslation \\( \\) 22     return   \\( 23         < div > 24             < h2 > { t \\( 'welcome' ,   {   name :   'Kaushal'   } \\) } < / h2 > 25             < p > { t \\( 'cart.items' ,   {   count :   itemCount   } \\) } < / p > 26         < / div > 27     \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 20/42",
    prompt: "How do you handle internationalisation \\(i18n\\) and localisation \\(l10n\\) at scale? n   Answer i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings \\227 externalized text, keyed by ID Pluralisation \\227 '1 item', '2 items' \\227 different in every language Date/time formats \\227 DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats \\227 1,000.00 \\(US\\) vs 1.000,00 \\(Germany/India\\) Currency \\227 $ 1,000 vs Rs. 1,000 vs \\2001.000 RTL languages \\227 Arabic, Hebrew require layout mirror Text expansion \\227 German translations are 30% longer than English React i18n libraries: react-i18next \\227 most popular, feature-rich react-intl \\(FormatJS\\) \\227 based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale \\(code split!\\) ICU message format for pluralisation and variables  1 // react-i18next setup  2 import   i18n   from   'i18next'  3 import   {   initReactI18next   }   from   'react-i18next'  4 import   LanguageDetector   from   'i18next-browser-languagedetector'  5  6 i18n . use \\( LanguageDetector \\) . use \\( initReactI18next \\) . init \\( {  7     fallbackLng :   'en' ,  8     interpolation :   {   escapeValue :   false   } ,  9     backend :   {   loadPath :   '/locales/{{lng}}.json'   }     // load only needed lang 10 } \\) 11 12 // locales/en.json 13 // { 14 //   'cart.items': '{{count}} item', 15 //   'cart.items_plural': '{{count}} items', 16 //   'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const   Cart   =   \\( {   itemCount   } \\)   = >   { 21     const   {   t   }   =   useTranslation \\( \\) 22     return   \\( 23         < div > 24             < h2 > { t \\( 'welcome' ,   {   name :   'Kaushal'   } \\) } < / h2 > 25             < p > { t \\( 'cart.items' ,   {   count :   itemCount   } \\) } < / p > 26         < / div > 27     \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 20/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "28 } 29 30 // Built-in browser APIs for l10n 31 const formatCurrency = ( amount , locale = 'en-IN' , currency = 'INR' ) = > 32 new Intl.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "28 } 29 30 // Built-in browser APIs for l10n 31 const formatCurrency = ( amount , locale = 'en-IN' , currency = 'INR' ) = > 32 new Intl . NumberFormat ( locale , { 33 style : 'currency' , currency , minimumFractionDigits : 0 34 } ) . format ( amount ) 35 // formatCurrency(79999) => ' n 79,999' 36 37 const formatDate = ( date , locale = 'en-IN' ) = > 38 new Intl . DateTimeFormat ( locale , { 39 day : '2-digit' , month : 'short' , year : 'numeric' 40 } ) . format ( new Date ( date ) ) 41 42 // RTL support 43 document . dir = locale = = = 'ar' | | locale = = = 'he' ? 'rtl' : 'ltr' n Interview Tip: Always use Intl.NumberFormat for currency and Intl.DateTimeFormat for dates \\227 never hardcode formatting. These browser APIs handle all locale-specific formatting automatically. This is also more performant than moment.js or date-fns for display formatting. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 20/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle internationalisation \\(i18n\\) and localisation \\(l10n\\) at scale? n   Answer i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings \\227 externalized text, keyed by ID Pluralisation \\227 '1 item', '2 items' \\227 different in every language Date/time formats \\227 DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats \\227 1,000.00 \\(US\\) vs 1.000,00 \\(Germany/India\\) Currency \\227 $ 1,000 vs Rs. 1,000 vs \\2001.000 RTL languages \\227 Arabic, Hebrew require layout mirror Text expansion \\227 German translations are 30% longer than English React i18n libraries: react-i18next \\227 most popular, feature-rich react-intl \\(FormatJS\\) \\227 based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale \\(code split!\\) ICU message format for pluralisation and variables  1 // react-i18next setup  2 import   i18n   from   'i18next'  3 import   {   initReactI18next   }   from   'react-i18next'  4 import   LanguageDetector   from   'i18next-browser-languagedetector'  5  6 i18n . use \\( LanguageDetector \\) . use \\( initReactI18next \\) . init \\( {  7     fallbackLng :   'en' ,  8     interpolation :   {   escapeValue :   false   } ,  9     backend :   {   loadPath :   '/locales/{{lng}}.json'   }     // load only needed lang 10 } \\) 11 12 // locales/en.json 13 // { 14 //   'cart.items': '{{count}} item', 15 //   'cart.items_plural': '{{count}} items', 16 //   'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const   Cart   =   \\( {   itemCount   } \\)   = >   { 21     const   {   t   }   =   useTranslation \\( \\) 22     return   \\( 23         < div > 24             < h2 > { t \\( 'welcome' ,   {   name :   'Kaushal'   } \\) } < / h2 > 25             < p > { t \\( 'cart.items' ,   {   count :   itemCount   } \\) } < / p > 26         < / div > 27     \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 20/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle internationalisation \\(i18n\\) and localisation \\(l10n\\) at scale? n   Answer i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings \\227 externalized text, keyed by ID Pluralisation \\227 '1 item', '2 items' \\227 different in every language Date/time formats \\227 DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats \\227 1,000.00 \\(US\\) vs 1.000,00 \\(Germany/India\\) Currency \\227 $ 1,000 vs Rs. 1,000 vs \\2001.000 RTL languages \\227 Arabic, Hebrew require layout mirror Text expansion \\227 German translations are 30% longer than English React i18n libraries: react-i18next \\227 most popular, feature-rich react-intl \\(FormatJS\\) \\227 based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale \\(code split!\\) ICU message format for pluralisation and variables  1 // react-i18next setup  2 import   i18n   from   'i18next'  3 import   {   initReactI18next   }   from   'react-i18next'  4 import   LanguageDetector   from   'i18next-browser-languagedetector'  5  6 i18n . use \\( LanguageDetector \\) . use \\( initReactI18next \\) . init \\( {  7     fallbackLng :   'en' ,  8     interpolation :   {   escapeValue :   false   } ,  9     backend :   {   loadPath :   '/locales/{{lng}}.json'   }     // load only needed lang 10 } \\) 11 12 // locales/en.json 13 // { 14 //   'cart.items': '{{count}} item', 15 //   'cart.items_plural': '{{count}} items', 16 //   'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const   Cart   =   \\( {   itemCount   } \\)   = >   { 21     const   {   t   }   =   useTranslation \\( \\) 22     return   \\( 23         < div > 24             < h2 > { t \\( 'welcome' ,   {   name :   'Kaushal'   } \\) } < / h2 > 25             < p > { t \\( 'cart.items' ,   {   count :   itemCount   } \\) } < / p > 26         < / div > 27     \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 20/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you handle internationalisation \\(i18n\\) and localisation \\(l10n\\) at scale? n   Answer i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings \\227 externalized text, keyed by ID Pluralisation \\227 '1 item', '2 items' \\227 different in every language Date/time formats \\227 DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats \\227 1,000.00 \\(US\\) vs 1.000,00 \\(Germany/India\\) Currency \\227 $ 1,000 vs Rs. 1,000 vs \\2001.000 RTL languages \\227 Arabic, Hebrew require layout mirror Text expansion \\227 German translations are 30% longer than English React i18n libraries: react-i18next \\227 most popular, feature-rich react-intl \\(FormatJS\\) \\227 based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale \\(code split!\\) ICU message format for pluralisation and variables  1 // react-i18next setup  2 import   i18n   from   'i18next'  3 import   {   initReactI18next   }   from   'react-i18next'  4 import   LanguageDetector   from   'i18next-browser-languagedetector'  5  6 i18n . use \\( LanguageDetector \\) . use \\( initReactI18next \\) . init \\( {  7     fallbackLng :   'en' ,  8     interpolation :   {   escapeValue :   false   } ,  9     backend :   {   loadPath :   '/locales/{{lng}}.json'   }     // load only needed lang 10 } \\) 11 12 // locales/en.json 13 // { 14 //   'cart.items': '{{count}} item', 15 //   'cart.items_plural': '{{count}} items', 16 //   'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const   Cart   =   \\( {   itemCount   } \\)   = >   { 21     const   {   t   }   =   useTranslation \\( \\) 22     return   \\( 23         < div > 24             < h2 > { t \\( 'welcome' ,   {   name :   'Kaushal'   } \\) } < / h2 > 25             < p > { t \\( 'cart.items' ,   {   count :   itemCount   } \\) } < / p > 26         < / div > 27     \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 20/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-design-system-from-scratch-n-answer",
    title: "How do you design a Design System from scratch? n   Answer A Design System is a shared language between design and engineering \\227 consistent components, tokens, and patterns used across all products. Design System layers: Design tokens \\227 primitive values \\(colours, spacing, typography, shadows\\) Core/Base components \\227 Button, Input, Modal, Card \\(unstyled or minimal\\) Composite components \\227 DataTable, DatePicker, RichTextEditor Documentation \\227 Storybook, usage guidelines, do's and don'ts Design tokens: Color: --color-brand-500, --color-text-primary Spacing: --space-1 \\(4px\\), --space-2 \\(8px\\), --space-4 \\(16px\\) Typography: --font-size-sm, --font-weight-bold Shadows: --shadow-sm, --shadow-lg Component API design principles: Composable \\227 build complex from simple Accessible by default \\227 ARIA built-in Customizable \\227 accept className or style for override Well-documented \\227 Storybook stories for every variant  1 // Design tokens \\(CSS custom properties\\)  2 : root   {  3     / *   Colors   * /  4     - - color - brand - 50 :     # EFF6FF ;  5     - - color - brand - 500 :   # 3B82F6 ;  6     - - color - brand - 900 :   # 1E3A8A ;  7     - - color - text - primary :       # 1F2937 ;  8     - - color - text - secondary :   # 6B7280 ;  9     / *   Spacing   \\( 4px   base   grid \\)   * / 10     - - space - 1 :   4px ;     - - space - 2 :   8px ; 11     - - space - 4 :   16px ;   - - space - 8 :   32px ; 12     / *   Typography   * / 13     - - font - size - sm :   14px ;     - - font - size - base :   16px ; 14     - - font - weight - bold :   600 ; 15 } 16 17 // Button component with variants 18 const   Button   =   \\( { 19     variant   =   'primary' , 20     size   =   'md' , 21     disabled   =   false , 22     loading   =   false , 23     leftIcon , 24     children , 25     onClick , 26     . . . props Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 21/42",
    prompt: "How do you design a Design System from scratch? n   Answer A Design System is a shared language between design and engineering \\227 consistent components, tokens, and patterns used across all products. Design System layers: Design tokens \\227 primitive values \\(colours, spacing, typography, shadows\\) Core/Base components \\227 Button, Input, Modal, Card \\(unstyled or minimal\\) Composite components \\227 DataTable, DatePicker, RichTextEditor Documentation \\227 Storybook, usage guidelines, do's and don'ts Design tokens: Color: --color-brand-500, --color-text-primary Spacing: --space-1 \\(4px\\), --space-2 \\(8px\\), --space-4 \\(16px\\) Typography: --font-size-sm, --font-weight-bold Shadows: --shadow-sm, --shadow-lg Component API design principles: Composable \\227 build complex from simple Accessible by default \\227 ARIA built-in Customizable \\227 accept className or style for override Well-documented \\227 Storybook stories for every variant  1 // Design tokens \\(CSS custom properties\\)  2 : root   {  3     / *   Colors   * /  4     - - color - brand - 50 :     # EFF6FF ;  5     - - color - brand - 500 :   # 3B82F6 ;  6     - - color - brand - 900 :   # 1E3A8A ;  7     - - color - text - primary :       # 1F2937 ;  8     - - color - text - secondary :   # 6B7280 ;  9     / *   Spacing   \\( 4px   base   grid \\)   * / 10     - - space - 1 :   4px ;     - - space - 2 :   8px ; 11     - - space - 4 :   16px ;   - - space - 8 :   32px ; 12     / *   Typography   * / 13     - - font - size - sm :   14px ;     - - font - size - base :   16px ; 14     - - font - weight - bold :   600 ; 15 } 16 17 // Button component with variants 18 const   Button   =   \\( { 19     variant   =   'primary' , 20     size   =   'md' , 21     disabled   =   false , 22     loading   =   false , 23     leftIcon , 24     children , 25     onClick , 26     . . . props Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 21/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "system-architecture",
    tags: [
      "system_design",
      "system-architecture",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 } ) = > ( 28 < button 29 disabled = { disabled | | loading } 30 aria - disabled = { disabled | | loading } 31 aria - busy = { loading } 32 className = { cn ( 'btn' , `btn--${variant}` , `btn--${size}` ) } 33 onClick = { onClick } 34 {.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 } ) = > ( 28 < button 29 disabled = { disabled | | loading } 30 aria - disabled = { disabled | | loading } 31 aria - busy = { loading } 32 className = { cn ( 'btn' , `btn--${variant}` , `btn--${size}` ) } 33 onClick = { onClick } 34 { . . . props } 35 > 36 { loading ? < Spinner size = 'sm' / > : leftIcon } 37 < span > { children } < / span > 38 < / button > 39 ) 40 41 // Storybook story 42 export const Primary = { 43 args : { variant : 'primary' , children : 'Click me' } 44 } 45 export const Loading = { 46 args : { loading : true , children : 'Saving...' } 47 } n Interview Tip: Design tokens are the foundation. Define your token scale before building any components. If tokens are named semantically (--color-text-primary instead of --blue-500), you can swap entire themes (dark mode, brand refresh) by changing token values without touching component code. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 21/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a Design System from scratch? n   Answer A Design System is a shared language between design and engineering \\227 consistent components, tokens, and patterns used across all products. Design System layers: Design tokens \\227 primitive values \\(colours, spacing, typography, shadows\\) Core/Base components \\227 Button, Input, Modal, Card \\(unstyled or minimal\\) Composite components \\227 DataTable, DatePicker, RichTextEditor Documentation \\227 Storybook, usage guidelines, do's and don'ts Design tokens: Color: --color-brand-500, --color-text-primary Spacing: --space-1 \\(4px\\), --space-2 \\(8px\\), --space-4 \\(16px\\) Typography: --font-size-sm, --font-weight-bold Shadows: --shadow-sm, --shadow-lg Component API design principles: Composable \\227 build complex from simple Accessible by default \\227 ARIA built-in Customizable \\227 accept className or style for override Well-documented \\227 Storybook stories for every variant  1 // Design tokens \\(CSS custom properties\\)  2 : root   {  3     / *   Colors   * /  4     - - color - brand - 50 :     # EFF6FF ;  5     - - color - brand - 500 :   # 3B82F6 ;  6     - - color - brand - 900 :   # 1E3A8A ;  7     - - color - text - primary :       # 1F2937 ;  8     - - color - text - secondary :   # 6B7280 ;  9     / *   Spacing   \\( 4px   base   grid \\)   * / 10     - - space - 1 :   4px ;     - - space - 2 :   8px ; 11     - - space - 4 :   16px ;   - - space - 8 :   32px ; 12     / *   Typography   * / 13     - - font - size - sm :   14px ;     - - font - size - base :   16px ; 14     - - font - weight - bold :   600 ; 15 } 16 17 // Button component with variants 18 const   Button   =   \\( { 19     variant   =   'primary' , 20     size   =   'md' , 21     disabled   =   false , 22     loading   =   false , 23     leftIcon , 24     children , 25     onClick , 26     . . . props Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 21/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a Design System from scratch? n   Answer A Design System is a shared language between design and engineering \\227 consistent components, tokens, and patterns used across all products. Design System layers: Design tokens \\227 primitive values \\(colours, spacing, typography, shadows\\) Core/Base components \\227 Button, Input, Modal, Card \\(unstyled or minimal\\) Composite components \\227 DataTable, DatePicker, RichTextEditor Documentation \\227 Storybook, usage guidelines, do's and don'ts Design tokens: Color: --color-brand-500, --color-text-primary Spacing: --space-1 \\(4px\\), --space-2 \\(8px\\), --space-4 \\(16px\\) Typography: --font-size-sm, --font-weight-bold Shadows: --shadow-sm, --shadow-lg Component API design principles: Composable \\227 build complex from simple Accessible by default \\227 ARIA built-in Customizable \\227 accept className or style for override Well-documented \\227 Storybook stories for every variant  1 // Design tokens \\(CSS custom properties\\)  2 : root   {  3     / *   Colors   * /  4     - - color - brand - 50 :     # EFF6FF ;  5     - - color - brand - 500 :   # 3B82F6 ;  6     - - color - brand - 900 :   # 1E3A8A ;  7     - - color - text - primary :       # 1F2937 ;  8     - - color - text - secondary :   # 6B7280 ;  9     / *   Spacing   \\( 4px   base   grid \\)   * / 10     - - space - 1 :   4px ;     - - space - 2 :   8px ; 11     - - space - 4 :   16px ;   - - space - 8 :   32px ; 12     / *   Typography   * / 13     - - font - size - sm :   14px ;     - - font - size - base :   16px ; 14     - - font - weight - bold :   600 ; 15 } 16 17 // Button component with variants 18 const   Button   =   \\( { 19     variant   =   'primary' , 20     size   =   'md' , 21     disabled   =   false , 22     loading   =   false , 23     leftIcon , 24     children , 25     onClick , 26     . . . props Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 21/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a Design System from scratch? n   Answer A Design System is a shared language between design and engineering \\227 consistent components, tokens, and patterns used across all products. Design System layers: Design tokens \\227 primitive values \\(colours, spacing, typography, shadows\\) Core/Base components \\227 Button, Input, Modal, Card \\(unstyled or minimal\\) Composite components \\227 DataTable, DatePicker, RichTextEditor Documentation \\227 Storybook, usage guidelines, do's and don'ts Design tokens: Color: --color-brand-500, --color-text-primary Spacing: --space-1 \\(4px\\), --space-2 \\(8px\\), --space-4 \\(16px\\) Typography: --font-size-sm, --font-weight-bold Shadows: --shadow-sm, --shadow-lg Component API design principles: Composable \\227 build complex from simple Accessible by default \\227 ARIA built-in Customizable \\227 accept className or style for override Well-documented \\227 Storybook stories for every variant  1 // Design tokens \\(CSS custom properties\\)  2 : root   {  3     / *   Colors   * /  4     - - color - brand - 50 :     # EFF6FF ;  5     - - color - brand - 500 :   # 3B82F6 ;  6     - - color - brand - 900 :   # 1E3A8A ;  7     - - color - text - primary :       # 1F2937 ;  8     - - color - text - secondary :   # 6B7280 ;  9     / *   Spacing   \\( 4px   base   grid \\)   * / 10     - - space - 1 :   4px ;     - - space - 2 :   8px ; 11     - - space - 4 :   16px ;   - - space - 8 :   32px ; 12     / *   Typography   * / 13     - - font - size - sm :   14px ;     - - font - size - base :   16px ; 14     - - font - weight - bold :   600 ; 15 } 16 17 // Button component with variants 18 const   Button   =   \\( { 19     variant   =   'primary' , 20     size   =   'md' , 21     disabled   =   false , 22     loading   =   false , 23     leftIcon , 24     children , 25     onClick , 26     . . . props Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 21/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-rich-text-editor-n-answer-rich-text",
    title: "How do you design a rich text editor? n   Answer Rich text editors are one of the most complex frontend components to build correctly. Libraries \\(always use a library\\): TipTap \\227 most modern, headless, extensible \\(recommended\\) Lexical \\(Meta\\) \\227 most performant, built for React Slate.js \\227 highly customizable, low-level Quill \\227 simpler use cases Architecture decisions: Store format \\227 HTML \\(easy display\\) vs JSON \\(portable, safer\\) Collaboration \\227 real-time co-editing requires CRDT \\(Y.js\\) Image upload \\227 handle file upload, store URL in editor Sanitization \\227 sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts \\(Ctrl+B, Ctrl+I\\) Mentions \\(@user\\) with autocomplete Image embedding with upload Link editing with preview  1 import   {   useEditor ,   EditorContent ,   BubbleMenu   }   from   '@tiptap/react'  2 import   StarterKit   from   '@tiptap/starter-kit'  3 import   Image   from   '@tiptap/extension-image'  4 import   Link   from   '@tiptap/extension-link'  5 import   Mention   from   '@tiptap/extension-mention'  6  7 const   RichEditor   =   \\( {   initialContent ,   onSave   } \\)   = >   {  8     const   editor   =   useEditor \\( {  9         extensions :   [ 10             StarterKit , 11             Image . configure \\( {   inline :   false   } \\) , 12             Link . configure \\( {   openOnClick :   false   } \\) , 13             Mention . configure \\( { 14                 suggestion :   { 15                     items :   \\( {   query   } \\)   = >   searchUsers \\( query \\) , 16                 } 17             } \\) 18         ] , 19         content :   initialContent , 20         onUpdate :   \\( {   editor   } \\)   = >   { 21             // Autosave as JSON \\(not HTML \\227 safer, portable\\) 22             debouncedSave \\( editor . getJSON \\( \\) \\) 23         } 24     } \\) 25 26     const   insertImage   =   async   \\( file \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 24/42",
    prompt: "How do you design a rich text editor? n   Answer Rich text editors are one of the most complex frontend components to build correctly. Libraries \\(always use a library\\): TipTap \\227 most modern, headless, extensible \\(recommended\\) Lexical \\(Meta\\) \\227 most performant, built for React Slate.js \\227 highly customizable, low-level Quill \\227 simpler use cases Architecture decisions: Store format \\227 HTML \\(easy display\\) vs JSON \\(portable, safer\\) Collaboration \\227 real-time co-editing requires CRDT \\(Y.js\\) Image upload \\227 handle file upload, store URL in editor Sanitization \\227 sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts \\(Ctrl+B, Ctrl+I\\) Mentions \\(@user\\) with autocomplete Image embedding with upload Link editing with preview  1 import   {   useEditor ,   EditorContent ,   BubbleMenu   }   from   '@tiptap/react'  2 import   StarterKit   from   '@tiptap/starter-kit'  3 import   Image   from   '@tiptap/extension-image'  4 import   Link   from   '@tiptap/extension-link'  5 import   Mention   from   '@tiptap/extension-mention'  6  7 const   RichEditor   =   \\( {   initialContent ,   onSave   } \\)   = >   {  8     const   editor   =   useEditor \\( {  9         extensions :   [ 10             StarterKit , 11             Image . configure \\( {   inline :   false   } \\) , 12             Link . configure \\( {   openOnClick :   false   } \\) , 13             Mention . configure \\( { 14                 suggestion :   { 15                     items :   \\( {   query   } \\)   = >   searchUsers \\( query \\) , 16                 } 17             } \\) 18         ] , 19         content :   initialContent , 20         onUpdate :   \\( {   editor   } \\)   = >   { 21             // Autosave as JSON \\(not HTML \\227 safer, portable\\) 22             debouncedSave \\( editor . getJSON \\( \\) \\) 23         } 24     } \\) 25 26     const   insertImage   =   async   \\( file \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 24/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 const url = await uploadFile ( file ) // S3 presigned upload 28 editor.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 const url = await uploadFile ( file ) // S3 presigned upload 28 editor . chain ( ) . focus ( ) . setImage ( { src : url } ) . run ( ) 29 } 30 31 return ( 32 < div className = 'editor' > 33 < Toolbar editor = { editor } onImageUpload = { insertImage } / > 34 { / * Bubble menu appears on text selection * / } 35 < BubbleMenu editor = { editor } > 36 < button onClick = { ( ) = > editor . chain ( ) . focus ( ) . toggleBold ( ) . run ( ) } > B < / button > 37 < button onClick = { ( ) = > editor . chain ( ) . focus ( ) . toggleItalic ( ) . run ( ) } > I < / button > 38 < / BubbleMenu > 39 < EditorContent editor = { editor } / > 40 < / div > 41 ) 42 } n Interview Tip: Store rich text as JSON (TipTap's format) rather than HTML. JSON is portable, safe from XSS by default, and version-controllable. When displaying, render JSON to HTML on the server with sanitization. This also enables real-time collaboration with Y.js CRDT merge of JSON documents. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 24/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a rich text editor? n   Answer Rich text editors are one of the most complex frontend components to build correctly. Libraries \\(always use a library\\): TipTap \\227 most modern, headless, extensible \\(recommended\\) Lexical \\(Meta\\) \\227 most performant, built for React Slate.js \\227 highly customizable, low-level Quill \\227 simpler use cases Architecture decisions: Store format \\227 HTML \\(easy display\\) vs JSON \\(portable, safer\\) Collaboration \\227 real-time co-editing requires CRDT \\(Y.js\\) Image upload \\227 handle file upload, store URL in editor Sanitization \\227 sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts \\(Ctrl+B, Ctrl+I\\) Mentions \\(@user\\) with autocomplete Image embedding with upload Link editing with preview  1 import   {   useEditor ,   EditorContent ,   BubbleMenu   }   from   '@tiptap/react'  2 import   StarterKit   from   '@tiptap/starter-kit'  3 import   Image   from   '@tiptap/extension-image'  4 import   Link   from   '@tiptap/extension-link'  5 import   Mention   from   '@tiptap/extension-mention'  6  7 const   RichEditor   =   \\( {   initialContent ,   onSave   } \\)   = >   {  8     const   editor   =   useEditor \\( {  9         extensions :   [ 10             StarterKit , 11             Image . configure \\( {   inline :   false   } \\) , 12             Link . configure \\( {   openOnClick :   false   } \\) , 13             Mention . configure \\( { 14                 suggestion :   { 15                     items :   \\( {   query   } \\)   = >   searchUsers \\( query \\) , 16                 } 17             } \\) 18         ] , 19         content :   initialContent , 20         onUpdate :   \\( {   editor   } \\)   = >   { 21             // Autosave as JSON \\(not HTML \\227 safer, portable\\) 22             debouncedSave \\( editor . getJSON \\( \\) \\) 23         } 24     } \\) 25 26     const   insertImage   =   async   \\( file \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 24/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a rich text editor? n   Answer Rich text editors are one of the most complex frontend components to build correctly. Libraries \\(always use a library\\): TipTap \\227 most modern, headless, extensible \\(recommended\\) Lexical \\(Meta\\) \\227 most performant, built for React Slate.js \\227 highly customizable, low-level Quill \\227 simpler use cases Architecture decisions: Store format \\227 HTML \\(easy display\\) vs JSON \\(portable, safer\\) Collaboration \\227 real-time co-editing requires CRDT \\(Y.js\\) Image upload \\227 handle file upload, store URL in editor Sanitization \\227 sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts \\(Ctrl+B, Ctrl+I\\) Mentions \\(@user\\) with autocomplete Image embedding with upload Link editing with preview  1 import   {   useEditor ,   EditorContent ,   BubbleMenu   }   from   '@tiptap/react'  2 import   StarterKit   from   '@tiptap/starter-kit'  3 import   Image   from   '@tiptap/extension-image'  4 import   Link   from   '@tiptap/extension-link'  5 import   Mention   from   '@tiptap/extension-mention'  6  7 const   RichEditor   =   \\( {   initialContent ,   onSave   } \\)   = >   {  8     const   editor   =   useEditor \\( {  9         extensions :   [ 10             StarterKit , 11             Image . configure \\( {   inline :   false   } \\) , 12             Link . configure \\( {   openOnClick :   false   } \\) , 13             Mention . configure \\( { 14                 suggestion :   { 15                     items :   \\( {   query   } \\)   = >   searchUsers \\( query \\) , 16                 } 17             } \\) 18         ] , 19         content :   initialContent , 20         onUpdate :   \\( {   editor   } \\)   = >   { 21             // Autosave as JSON \\(not HTML \\227 safer, portable\\) 22             debouncedSave \\( editor . getJSON \\( \\) \\) 23         } 24     } \\) 25 26     const   insertImage   =   async   \\( file \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 24/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a rich text editor? n   Answer Rich text editors are one of the most complex frontend components to build correctly. Libraries \\(always use a library\\): TipTap \\227 most modern, headless, extensible \\(recommended\\) Lexical \\(Meta\\) \\227 most performant, built for React Slate.js \\227 highly customizable, low-level Quill \\227 simpler use cases Architecture decisions: Store format \\227 HTML \\(easy display\\) vs JSON \\(portable, safer\\) Collaboration \\227 real-time co-editing requires CRDT \\(Y.js\\) Image upload \\227 handle file upload, store URL in editor Sanitization \\227 sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts \\(Ctrl+B, Ctrl+I\\) Mentions \\(@user\\) with autocomplete Image embedding with upload Link editing with preview  1 import   {   useEditor ,   EditorContent ,   BubbleMenu   }   from   '@tiptap/react'  2 import   StarterKit   from   '@tiptap/starter-kit'  3 import   Image   from   '@tiptap/extension-image'  4 import   Link   from   '@tiptap/extension-link'  5 import   Mention   from   '@tiptap/extension-mention'  6  7 const   RichEditor   =   \\( {   initialContent ,   onSave   } \\)   = >   {  8     const   editor   =   useEditor \\( {  9         extensions :   [ 10             StarterKit , 11             Image . configure \\( {   inline :   false   } \\) , 12             Link . configure \\( {   openOnClick :   false   } \\) , 13             Mention . configure \\( { 14                 suggestion :   { 15                     items :   \\( {   query   } \\)   = >   searchUsers \\( query \\) , 16                 } 17             } \\) 18         ] , 19         content :   initialContent , 20         onUpdate :   \\( {   editor   } \\)   = >   { 21             // Autosave as JSON \\(not HTML \\227 safer, portable\\) 22             debouncedSave \\( editor . getJSON \\( \\) \\) 23         } 24     } \\) 25 26     const   insertImage   =   async   \\( file \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 24/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-data-visualisation-system-n-answer",
    title: "How do you design a data visualisation system? n   Answer Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts \\227 React-first, simple API, good for dashboards Victory \\227 React-first, composable, accessible D3.js \\227 most powerful, low-level, steep learning curve Chart.js \\227 canvas-based, very fast for large datasets Observable Plot \\227 modern D3 alternative Key design decisions: SVG vs Canvas \\227 SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive \\227 charts must resize with container \\(use ResizeObserver\\) Color \\227 accessible color scales \\(colorblind-safe palettes\\) Animation \\227 smooth transitions between data updates Tooltips \\227 show value on hover with ARIA Performance for large datasets: > 1K data points \\227 use Canvas \\(Chart.js or D3 canvas\\) Data aggregation on server \\227 don't send 100K rows to client Zoom and pan \\227 load more data on zoom  1 // Recharts: responsive dashboard chart  2 import   {   ResponsiveContainer ,   AreaChart ,   Area ,  3                   XAxis ,   YAxis ,   CartesianGrid ,   Tooltip ,   Legend   }   from   'recharts'  4  5 const   RevenueChart   =   \\( {   data   } \\)   = >   \\(  6     < ResponsiveContainer   width = '100%'   height = { 300 } >  7         < AreaChart   data = { data }   margin = { {   top :   10 ,   right :   30 ,   bottom :   0 ,   left :   0   } } >  8             < defs >  9                 < linearGradient   id = 'revenueGradient'   x1 = '0'   y1 = '0'   x2 = '0'   y2 = '1' > 10                     < stop   offset = '5%'   stopColor = '#3B82F6'   stopOpacity = { 0 . 8 }   / > 11                     < stop   offset = '95%'   stopColor = '#3B82F6'   stopOpacity = { 0 }   / > 12                 < / linearGradient > 13             < / defs > 14             < CartesianGrid   strokeDasharray = '3 3'   stroke = '#374151'   / > 15             < XAxis   dataKey = 'date'   tick = { {   fill :   '#9CA3AF'   } }   / > 16             < YAxis   tickFormatter = { v   = >   `Rs.${\\(v/1000\\).toFixed\\(0\\)}K` }   tick = { {   fill :   '#9CA3AF'   } }   / > 17             < Tooltip 18                 formatter = { \\( v \\)   = >   [ `Rs. ${v.toLocaleString\\('en-IN'\\)}` ,   'Revenue' ] } 19                 contentStyle = { {   background :   '#1F2937' ,   border :   'none' ,   borderRadius :   8   } } 20             / > 21             < Area   type = 'monotone'   dataKey = 'revenue' 22                         stroke = '#3B82F6'   fill = 'url\\(#revenueGradient\\)'   strokeWidth = { 2 }   / > 23         < / AreaChart > 24     < / ResponsiveContainer > 25 \\) 26 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 30/42",
    prompt: "How do you design a data visualisation system? n   Answer Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts \\227 React-first, simple API, good for dashboards Victory \\227 React-first, composable, accessible D3.js \\227 most powerful, low-level, steep learning curve Chart.js \\227 canvas-based, very fast for large datasets Observable Plot \\227 modern D3 alternative Key design decisions: SVG vs Canvas \\227 SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive \\227 charts must resize with container \\(use ResizeObserver\\) Color \\227 accessible color scales \\(colorblind-safe palettes\\) Animation \\227 smooth transitions between data updates Tooltips \\227 show value on hover with ARIA Performance for large datasets: > 1K data points \\227 use Canvas \\(Chart.js or D3 canvas\\) Data aggregation on server \\227 don't send 100K rows to client Zoom and pan \\227 load more data on zoom  1 // Recharts: responsive dashboard chart  2 import   {   ResponsiveContainer ,   AreaChart ,   Area ,  3                   XAxis ,   YAxis ,   CartesianGrid ,   Tooltip ,   Legend   }   from   'recharts'  4  5 const   RevenueChart   =   \\( {   data   } \\)   = >   \\(  6     < ResponsiveContainer   width = '100%'   height = { 300 } >  7         < AreaChart   data = { data }   margin = { {   top :   10 ,   right :   30 ,   bottom :   0 ,   left :   0   } } >  8             < defs >  9                 < linearGradient   id = 'revenueGradient'   x1 = '0'   y1 = '0'   x2 = '0'   y2 = '1' > 10                     < stop   offset = '5%'   stopColor = '#3B82F6'   stopOpacity = { 0 . 8 }   / > 11                     < stop   offset = '95%'   stopColor = '#3B82F6'   stopOpacity = { 0 }   / > 12                 < / linearGradient > 13             < / defs > 14             < CartesianGrid   strokeDasharray = '3 3'   stroke = '#374151'   / > 15             < XAxis   dataKey = 'date'   tick = { {   fill :   '#9CA3AF'   } }   / > 16             < YAxis   tickFormatter = { v   = >   `Rs.${\\(v/1000\\).toFixed\\(0\\)}K` }   tick = { {   fill :   '#9CA3AF'   } }   / > 17             < Tooltip 18                 formatter = { \\( v \\)   = >   [ `Rs. ${v.toLocaleString\\('en-IN'\\)}` ,   'Revenue' ] } 19                 contentStyle = { {   background :   '#1F2937' ,   border :   'none' ,   borderRadius :   8   } } 20             / > 21             < Area   type = 'monotone'   dataKey = 'revenue' 22                         stroke = '#3B82F6'   fill = 'url\\(#revenueGradient\\)'   strokeWidth = { 2 }   / > 23         < / AreaChart > 24     < / ResponsiveContainer > 25 \\) 26 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 30/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 // D3 for custom visualizations 28 const useD3 = ( renderFn , deps ) = > { 29 const ref = useRef ( null ) 30 useEffect ( ( ) = > { 31 if ( ref.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 // D3 for custom visualizations 28 const useD3 = ( renderFn , deps ) = > { 29 const ref = useRef ( null ) 30 useEffect ( ( ) = > { 31 if ( ref . current ) renderFn ( d3 . select ( ref . current ) ) 32 return ( ) = > d3 . select ( ref . current ) . selectAll ( '*' ) . remove ( ) 33 } , deps ) 34 return ref 35 } n Interview Tip: Use ResponsiveContainer in Recharts (or its equivalent in other libs) \\227 never hardcode chart dimensions. Charts must resize when the browser window changes or when sidebars expand/collapse. Use ResizeObserver if building with D3 to detect container size changes. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 30/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a data visualisation system? n   Answer Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts \\227 React-first, simple API, good for dashboards Victory \\227 React-first, composable, accessible D3.js \\227 most powerful, low-level, steep learning curve Chart.js \\227 canvas-based, very fast for large datasets Observable Plot \\227 modern D3 alternative Key design decisions: SVG vs Canvas \\227 SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive \\227 charts must resize with container \\(use ResizeObserver\\) Color \\227 accessible color scales \\(colorblind-safe palettes\\) Animation \\227 smooth transitions between data updates Tooltips \\227 show value on hover with ARIA Performance for large datasets: > 1K data points \\227 use Canvas \\(Chart.js or D3 canvas\\) Data aggregation on server \\227 don't send 100K rows to client Zoom and pan \\227 load more data on zoom  1 // Recharts: responsive dashboard chart  2 import   {   ResponsiveContainer ,   AreaChart ,   Area ,  3                   XAxis ,   YAxis ,   CartesianGrid ,   Tooltip ,   Legend   }   from   'recharts'  4  5 const   RevenueChart   =   \\( {   data   } \\)   = >   \\(  6     < ResponsiveContainer   width = '100%'   height = { 300 } >  7         < AreaChart   data = { data }   margin = { {   top :   10 ,   right :   30 ,   bottom :   0 ,   left :   0   } } >  8             < defs >  9                 < linearGradient   id = 'revenueGradient'   x1 = '0'   y1 = '0'   x2 = '0'   y2 = '1' > 10                     < stop   offset = '5%'   stopColor = '#3B82F6'   stopOpacity = { 0 . 8 }   / > 11                     < stop   offset = '95%'   stopColor = '#3B82F6'   stopOpacity = { 0 }   / > 12                 < / linearGradient > 13             < / defs > 14             < CartesianGrid   strokeDasharray = '3 3'   stroke = '#374151'   / > 15             < XAxis   dataKey = 'date'   tick = { {   fill :   '#9CA3AF'   } }   / > 16             < YAxis   tickFormatter = { v   = >   `Rs.${\\(v/1000\\).toFixed\\(0\\)}K` }   tick = { {   fill :   '#9CA3AF'   } }   / > 17             < Tooltip 18                 formatter = { \\( v \\)   = >   [ `Rs. ${v.toLocaleString\\('en-IN'\\)}` ,   'Revenue' ] } 19                 contentStyle = { {   background :   '#1F2937' ,   border :   'none' ,   borderRadius :   8   } } 20             / > 21             < Area   type = 'monotone'   dataKey = 'revenue' 22                         stroke = '#3B82F6'   fill = 'url\\(#revenueGradient\\)'   strokeWidth = { 2 }   / > 23         < / AreaChart > 24     < / ResponsiveContainer > 25 \\) 26 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 30/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a data visualisation system? n   Answer Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts \\227 React-first, simple API, good for dashboards Victory \\227 React-first, composable, accessible D3.js \\227 most powerful, low-level, steep learning curve Chart.js \\227 canvas-based, very fast for large datasets Observable Plot \\227 modern D3 alternative Key design decisions: SVG vs Canvas \\227 SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive \\227 charts must resize with container \\(use ResizeObserver\\) Color \\227 accessible color scales \\(colorblind-safe palettes\\) Animation \\227 smooth transitions between data updates Tooltips \\227 show value on hover with ARIA Performance for large datasets: > 1K data points \\227 use Canvas \\(Chart.js or D3 canvas\\) Data aggregation on server \\227 don't send 100K rows to client Zoom and pan \\227 load more data on zoom  1 // Recharts: responsive dashboard chart  2 import   {   ResponsiveContainer ,   AreaChart ,   Area ,  3                   XAxis ,   YAxis ,   CartesianGrid ,   Tooltip ,   Legend   }   from   'recharts'  4  5 const   RevenueChart   =   \\( {   data   } \\)   = >   \\(  6     < ResponsiveContainer   width = '100%'   height = { 300 } >  7         < AreaChart   data = { data }   margin = { {   top :   10 ,   right :   30 ,   bottom :   0 ,   left :   0   } } >  8             < defs >  9                 < linearGradient   id = 'revenueGradient'   x1 = '0'   y1 = '0'   x2 = '0'   y2 = '1' > 10                     < stop   offset = '5%'   stopColor = '#3B82F6'   stopOpacity = { 0 . 8 }   / > 11                     < stop   offset = '95%'   stopColor = '#3B82F6'   stopOpacity = { 0 }   / > 12                 < / linearGradient > 13             < / defs > 14             < CartesianGrid   strokeDasharray = '3 3'   stroke = '#374151'   / > 15             < XAxis   dataKey = 'date'   tick = { {   fill :   '#9CA3AF'   } }   / > 16             < YAxis   tickFormatter = { v   = >   `Rs.${\\(v/1000\\).toFixed\\(0\\)}K` }   tick = { {   fill :   '#9CA3AF'   } }   / > 17             < Tooltip 18                 formatter = { \\( v \\)   = >   [ `Rs. ${v.toLocaleString\\('en-IN'\\)}` ,   'Revenue' ] } 19                 contentStyle = { {   background :   '#1F2937' ,   border :   'none' ,   borderRadius :   8   } } 20             / > 21             < Area   type = 'monotone'   dataKey = 'revenue' 22                         stroke = '#3B82F6'   fill = 'url\\(#revenueGradient\\)'   strokeWidth = { 2 }   / > 23         < / AreaChart > 24     < / ResponsiveContainer > 25 \\) 26 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 30/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a data visualisation system? n   Answer Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts \\227 React-first, simple API, good for dashboards Victory \\227 React-first, composable, accessible D3.js \\227 most powerful, low-level, steep learning curve Chart.js \\227 canvas-based, very fast for large datasets Observable Plot \\227 modern D3 alternative Key design decisions: SVG vs Canvas \\227 SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive \\227 charts must resize with container \\(use ResizeObserver\\) Color \\227 accessible color scales \\(colorblind-safe palettes\\) Animation \\227 smooth transitions between data updates Tooltips \\227 show value on hover with ARIA Performance for large datasets: > 1K data points \\227 use Canvas \\(Chart.js or D3 canvas\\) Data aggregation on server \\227 don't send 100K rows to client Zoom and pan \\227 load more data on zoom  1 // Recharts: responsive dashboard chart  2 import   {   ResponsiveContainer ,   AreaChart ,   Area ,  3                   XAxis ,   YAxis ,   CartesianGrid ,   Tooltip ,   Legend   }   from   'recharts'  4  5 const   RevenueChart   =   \\( {   data   } \\)   = >   \\(  6     < ResponsiveContainer   width = '100%'   height = { 300 } >  7         < AreaChart   data = { data }   margin = { {   top :   10 ,   right :   30 ,   bottom :   0 ,   left :   0   } } >  8             < defs >  9                 < linearGradient   id = 'revenueGradient'   x1 = '0'   y1 = '0'   x2 = '0'   y2 = '1' > 10                     < stop   offset = '5%'   stopColor = '#3B82F6'   stopOpacity = { 0 . 8 }   / > 11                     < stop   offset = '95%'   stopColor = '#3B82F6'   stopOpacity = { 0 }   / > 12                 < / linearGradient > 13             < / defs > 14             < CartesianGrid   strokeDasharray = '3 3'   stroke = '#374151'   / > 15             < XAxis   dataKey = 'date'   tick = { {   fill :   '#9CA3AF'   } }   / > 16             < YAxis   tickFormatter = { v   = >   `Rs.${\\(v/1000\\).toFixed\\(0\\)}K` }   tick = { {   fill :   '#9CA3AF'   } }   / > 17             < Tooltip 18                 formatter = { \\( v \\)   = >   [ `Rs. ${v.toLocaleString\\('en-IN'\\)}` ,   'Revenue' ] } 19                 contentStyle = { {   background :   '#1F2937' ,   border :   'none' ,   borderRadius :   8   } } 20             / > 21             < Area   type = 'monotone'   dataKey = 'revenue' 22                         stroke = '#3B82F6'   fill = 'url\\(#revenueGradient\\)'   strokeWidth = { 2 }   / > 23         < / AreaChart > 24     < / ResponsiveContainer > 25 \\) 26 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 30/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-youtube-video-streaming-frontend-n-answer-requ",
    title: "Design a YouTube / video streaming frontend. n   Answer Requirements: Video player with adaptive bitrate streaming \\(HLS/DASH\\) Recommendations feed with thumbnails Search with autocomplete Comments \\(threaded\\), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization \\(100s of videos\\) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail \\227 preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth  1 // HLS video player  2 import   Hls   from   'hls.js'  3  4 const   VideoPlayer   =   \\( {   src ,   poster   } \\)   = >   {  5     const   videoRef   =   useRef \\( null \\)  6  7     useEffect \\( \\( \\)   = >   {  8         const   video   =   videoRef . current  9         if   \\( ! video \\)   return 10 11         if   \\( Hls . isSupported \\( \\) \\)   { 12             const   hls   =   new   Hls \\( { 13                 startLevel :   - 1 ,               // auto quality selection 14                 maxBufferLength :   30 ,     // buffer 30 seconds ahead 15                 enableWorker :   true ,       // offload to Web Worker 16             } \\) 17             hls . loadSource \\( src \\)         // .m3u8 playlist 18             hls . attachMedia \\( video \\) 19             return   \\( \\)   = >   hls . destroy \\( \\) 20         }   else   if   \\( video . canPlayType \\( 'application/vnd.apple.mpegurl' \\) \\)   { 21             video . src   =   src     // Safari native HLS 22         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 31/42",
    prompt: "Design a YouTube / video streaming frontend. n   Answer Requirements: Video player with adaptive bitrate streaming \\(HLS/DASH\\) Recommendations feed with thumbnails Search with autocomplete Comments \\(threaded\\), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization \\(100s of videos\\) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail \\227 preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth  1 // HLS video player  2 import   Hls   from   'hls.js'  3  4 const   VideoPlayer   =   \\( {   src ,   poster   } \\)   = >   {  5     const   videoRef   =   useRef \\( null \\)  6  7     useEffect \\( \\( \\)   = >   {  8         const   video   =   videoRef . current  9         if   \\( ! video \\)   return 10 11         if   \\( Hls . isSupported \\( \\) \\)   { 12             const   hls   =   new   Hls \\( { 13                 startLevel :   - 1 ,               // auto quality selection 14                 maxBufferLength :   30 ,     // buffer 30 seconds ahead 15                 enableWorker :   true ,       // offload to Web Worker 16             } \\) 17             hls . loadSource \\( src \\)         // .m3u8 playlist 18             hls . attachMedia \\( video \\) 19             return   \\( \\)   = >   hls . destroy \\( \\) 20         }   else   if   \\( video . canPlayType \\( 'application/vnd.apple.mpegurl' \\) \\)   { 21             video . src   =   src     // Safari native HLS 22         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 31/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "23 } , [ src ] ) 24 25 return < video ref = { videoRef } poster = { poster } controls playsInline / > 26 } 27 28 // Thumbnail lazy loading grid 29 const VideoGrid = ( { videos } ) = > ( 30 < div className = 'video-grid' > 31 { videos.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "23 } , [ src ] ) 24 25 return < video ref = { videoRef } poster = { poster } controls playsInline / > 26 } 27 28 // Thumbnail lazy loading grid 29 const VideoGrid = ( { videos } ) = > ( 30 < div className = 'video-grid' > 31 { videos . map ( ( v , i ) = > ( 32 < div key = { v . id } className = 'video-card' > 33 < img 34 src = { v . thumbnail } 35 loading = { i < 6 ? 'eager' : 'lazy' } // above-fold: eager 36 alt = { v . title } 37 width = { 320 } height = { 180 } // prevents CLS 38 / > 39 < h3 > { v . title } < / h3 > 40 < p > { formatViews ( v . views ) } views < / p > 41 < / div > 42 ) ) } 43 < / div > 44 ) n Interview Tip: Set loading='eager' on the first 6-8 thumbnails and loading='lazy' on the rest. Lazy loading the first thumbnails actually hurts LCP \\227 the browser skips prefetching them. Eager loading above-fold thumbnails is one of the fastest LCP improvements for video listing pages. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 31/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a YouTube / video streaming frontend. n   Answer Requirements: Video player with adaptive bitrate streaming \\(HLS/DASH\\) Recommendations feed with thumbnails Search with autocomplete Comments \\(threaded\\), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization \\(100s of videos\\) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail \\227 preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth  1 // HLS video player  2 import   Hls   from   'hls.js'  3  4 const   VideoPlayer   =   \\( {   src ,   poster   } \\)   = >   {  5     const   videoRef   =   useRef \\( null \\)  6  7     useEffect \\( \\( \\)   = >   {  8         const   video   =   videoRef . current  9         if   \\( ! video \\)   return 10 11         if   \\( Hls . isSupported \\( \\) \\)   { 12             const   hls   =   new   Hls \\( { 13                 startLevel :   - 1 ,               // auto quality selection 14                 maxBufferLength :   30 ,     // buffer 30 seconds ahead 15                 enableWorker :   true ,       // offload to Web Worker 16             } \\) 17             hls . loadSource \\( src \\)         // .m3u8 playlist 18             hls . attachMedia \\( video \\) 19             return   \\( \\)   = >   hls . destroy \\( \\) 20         }   else   if   \\( video . canPlayType \\( 'application/vnd.apple.mpegurl' \\) \\)   { 21             video . src   =   src     // Safari native HLS 22         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 31/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a YouTube / video streaming frontend. n   Answer Requirements: Video player with adaptive bitrate streaming \\(HLS/DASH\\) Recommendations feed with thumbnails Search with autocomplete Comments \\(threaded\\), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization \\(100s of videos\\) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail \\227 preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth  1 // HLS video player  2 import   Hls   from   'hls.js'  3  4 const   VideoPlayer   =   \\( {   src ,   poster   } \\)   = >   {  5     const   videoRef   =   useRef \\( null \\)  6  7     useEffect \\( \\( \\)   = >   {  8         const   video   =   videoRef . current  9         if   \\( ! video \\)   return 10 11         if   \\( Hls . isSupported \\( \\) \\)   { 12             const   hls   =   new   Hls \\( { 13                 startLevel :   - 1 ,               // auto quality selection 14                 maxBufferLength :   30 ,     // buffer 30 seconds ahead 15                 enableWorker :   true ,       // offload to Web Worker 16             } \\) 17             hls . loadSource \\( src \\)         // .m3u8 playlist 18             hls . attachMedia \\( video \\) 19             return   \\( \\)   = >   hls . destroy \\( \\) 20         }   else   if   \\( video . canPlayType \\( 'application/vnd.apple.mpegurl' \\) \\)   { 21             video . src   =   src     // Safari native HLS 22         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 31/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a YouTube / video streaming frontend. n   Answer Requirements: Video player with adaptive bitrate streaming \\(HLS/DASH\\) Recommendations feed with thumbnails Search with autocomplete Comments \\(threaded\\), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization \\(100s of videos\\) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail \\227 preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth  1 // HLS video player  2 import   Hls   from   'hls.js'  3  4 const   VideoPlayer   =   \\( {   src ,   poster   } \\)   = >   {  5     const   videoRef   =   useRef \\( null \\)  6  7     useEffect \\( \\( \\)   = >   {  8         const   video   =   videoRef . current  9         if   \\( ! video \\)   return 10 11         if   \\( Hls . isSupported \\( \\) \\)   { 12             const   hls   =   new   Hls \\( { 13                 startLevel :   - 1 ,               // auto quality selection 14                 maxBufferLength :   30 ,     // buffer 30 seconds ahead 15                 enableWorker :   true ,       // offload to Web Worker 16             } \\) 17             hls . loadSource \\( src \\)         // .m3u8 playlist 18             hls . attachMedia \\( video \\) 19             return   \\( \\)   = >   hls . destroy \\( \\) 20         }   else   if   \\( video . canPlayType \\( 'application/vnd.apple.mpegurl' \\) \\)   { 21             video . src   =   src     // Safari native HLS 22         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 31/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-twitter-x-feed-frontend-n-answer-requirements",
    title: "Design a Twitter / X feed frontend. n   Answer Requirements: Infinite scrolling timeline \\(newest first\\) Tweet composer with character counter, image/video upload Real-time new tweets notification \\('10 new tweets'\\) Likes, retweets, replies \\(all optimistic\\) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list \\(10K tweets in memory \\227 must virtualize!\\) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern \\(Twitter's actual pattern\\): Don't auto-scroll to new tweets \\(distracting\\) Show 'X new tweets' banner at top User clicks to load \\227 preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support  1 // Tweet feed with real-time new tweet notification  2 const   Feed   =   \\( \\)   = >   {  3     const   [ pendingCount ,   setPendingCount ]   =   useState \\( 0 \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     // SSE: listen for new tweets  7     useEffect \\( \\( \\)   = >   {  8         const   es   =   new   EventSource \\( '/api/feed/stream' \\)  9         es . addEventListener \\( 'new_tweet' ,   \\( e \\)   = >   { 10             // Don't auto-insert \\227 show notification instead 11             setPendingCount \\( c   = >   c   +   1 \\) 12             // Stage tweet in query cache for instant load on click 13             const   tweet   =   JSON . parse \\( e . data \\) 14             queryClient . setQueryData \\( [ 'feed' ] ,   old   = >   \\( { 15                 . . . old , 16                 pending :   [ . . . \\( old ? . pending   | |   [ ] \\) ,   tweet ] 17             } \\) \\) 18         } \\) 19         return   \\( \\)   = >   es . close \\( \\) 20     } ,   [ ] \\) 21 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 32/42",
    prompt: "Design a Twitter / X feed frontend. n   Answer Requirements: Infinite scrolling timeline \\(newest first\\) Tweet composer with character counter, image/video upload Real-time new tweets notification \\('10 new tweets'\\) Likes, retweets, replies \\(all optimistic\\) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list \\(10K tweets in memory \\227 must virtualize!\\) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern \\(Twitter's actual pattern\\): Don't auto-scroll to new tweets \\(distracting\\) Show 'X new tweets' banner at top User clicks to load \\227 preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support  1 // Tweet feed with real-time new tweet notification  2 const   Feed   =   \\( \\)   = >   {  3     const   [ pendingCount ,   setPendingCount ]   =   useState \\( 0 \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     // SSE: listen for new tweets  7     useEffect \\( \\( \\)   = >   {  8         const   es   =   new   EventSource \\( '/api/feed/stream' \\)  9         es . addEventListener \\( 'new_tweet' ,   \\( e \\)   = >   { 10             // Don't auto-insert \\227 show notification instead 11             setPendingCount \\( c   = >   c   +   1 \\) 12             // Stage tweet in query cache for instant load on click 13             const   tweet   =   JSON . parse \\( e . data \\) 14             queryClient . setQueryData \\( [ 'feed' ] ,   old   = >   \\( { 15                 . . . old , 16                 pending :   [ . . . \\( old ? . pending   | |   [ ] \\) ,   tweet ] 17             } \\) \\) 18         } \\) 19         return   \\( \\)   = >   es . close \\( \\) 20     } ,   [ ] \\) 21 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 32/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "22 const loadNewTweets = ( ) = > { 23 queryClient.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "22 const loadNewTweets = ( ) = > { 23 queryClient . setQueryData ( [ 'feed' ] , old = > ( { 24 pages : [ { tweets : old . pending , nextCursor : old . pages [ 0 ] . nextCursor } , . . . old . pages ] , 25 pending : [ ] 26 } ) ) 27 setPendingCount ( 0 ) 28 window . scrollTo ( { top : 0 , behavior : 'smooth' } ) 29 } 30 31 return ( 32 < div > 33 { pendingCount > 0 & & ( 34 < button className = 'new-tweets-banner' onClick = { loadNewTweets } > 35 { pendingCount } new tweet { pendingCount > 1 ? 's' : '' } 36 < / button > 37 ) } 38 < VirtualTweetList / > 39 < / div > 40 ) 41 } 42 43 // Character counter 44 const TweetComposer = ( ) = > { 45 const [ text , setText ] = useState ( '' ) 46 const remaining = 280 - text . length 47 return ( 48 < div > 49 < textarea value = { text } onChange = { e = > setText ( e . target . value ) } maxLength = { 280 } / > 50 < span style = { { color : remaining < 20 ? 'red' : 'gray' } } > { remaining } < / span > 51 < button disabled = { text . length = = = 0 | | remaining < 0 } > Tweet < / button > 52 < / div > 53 ) 54 } n Interview Tip: The 'X new tweets' banner pattern is genius UX. Auto-scrolling users to new content while they're reading is disorienting. Instead, let users decide when to see new content. Stage the tweets in the query cache so when they click, the new tweets appear instantly from cache. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 32/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a Twitter / X feed frontend. n   Answer Requirements: Infinite scrolling timeline \\(newest first\\) Tweet composer with character counter, image/video upload Real-time new tweets notification \\('10 new tweets'\\) Likes, retweets, replies \\(all optimistic\\) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list \\(10K tweets in memory \\227 must virtualize!\\) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern \\(Twitter's actual pattern\\): Don't auto-scroll to new tweets \\(distracting\\) Show 'X new tweets' banner at top User clicks to load \\227 preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support  1 // Tweet feed with real-time new tweet notification  2 const   Feed   =   \\( \\)   = >   {  3     const   [ pendingCount ,   setPendingCount ]   =   useState \\( 0 \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     // SSE: listen for new tweets  7     useEffect \\( \\( \\)   = >   {  8         const   es   =   new   EventSource \\( '/api/feed/stream' \\)  9         es . addEventListener \\( 'new_tweet' ,   \\( e \\)   = >   { 10             // Don't auto-insert \\227 show notification instead 11             setPendingCount \\( c   = >   c   +   1 \\) 12             // Stage tweet in query cache for instant load on click 13             const   tweet   =   JSON . parse \\( e . data \\) 14             queryClient . setQueryData \\( [ 'feed' ] ,   old   = >   \\( { 15                 . . . old , 16                 pending :   [ . . . \\( old ? . pending   | |   [ ] \\) ,   tweet ] 17             } \\) \\) 18         } \\) 19         return   \\( \\)   = >   es . close \\( \\) 20     } ,   [ ] \\) 21 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 32/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a Twitter / X feed frontend. n   Answer Requirements: Infinite scrolling timeline \\(newest first\\) Tweet composer with character counter, image/video upload Real-time new tweets notification \\('10 new tweets'\\) Likes, retweets, replies \\(all optimistic\\) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list \\(10K tweets in memory \\227 must virtualize!\\) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern \\(Twitter's actual pattern\\): Don't auto-scroll to new tweets \\(distracting\\) Show 'X new tweets' banner at top User clicks to load \\227 preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support  1 // Tweet feed with real-time new tweet notification  2 const   Feed   =   \\( \\)   = >   {  3     const   [ pendingCount ,   setPendingCount ]   =   useState \\( 0 \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     // SSE: listen for new tweets  7     useEffect \\( \\( \\)   = >   {  8         const   es   =   new   EventSource \\( '/api/feed/stream' \\)  9         es . addEventListener \\( 'new_tweet' ,   \\( e \\)   = >   { 10             // Don't auto-insert \\227 show notification instead 11             setPendingCount \\( c   = >   c   +   1 \\) 12             // Stage tweet in query cache for instant load on click 13             const   tweet   =   JSON . parse \\( e . data \\) 14             queryClient . setQueryData \\( [ 'feed' ] ,   old   = >   \\( { 15                 . . . old , 16                 pending :   [ . . . \\( old ? . pending   | |   [ ] \\) ,   tweet ] 17             } \\) \\) 18         } \\) 19         return   \\( \\)   = >   es . close \\( \\) 20     } ,   [ ] \\) 21 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 32/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a Twitter / X feed frontend. n   Answer Requirements: Infinite scrolling timeline \\(newest first\\) Tweet composer with character counter, image/video upload Real-time new tweets notification \\('10 new tweets'\\) Likes, retweets, replies \\(all optimistic\\) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list \\(10K tweets in memory \\227 must virtualize!\\) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern \\(Twitter's actual pattern\\): Don't auto-scroll to new tweets \\(distracting\\) Show 'X new tweets' banner at top User clicks to load \\227 preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support  1 // Tweet feed with real-time new tweet notification  2 const   Feed   =   \\( \\)   = >   {  3     const   [ pendingCount ,   setPendingCount ]   =   useState \\( 0 \\)  4     const   queryClient   =   useQueryClient \\( \\)  5  6     // SSE: listen for new tweets  7     useEffect \\( \\( \\)   = >   {  8         const   es   =   new   EventSource \\( '/api/feed/stream' \\)  9         es . addEventListener \\( 'new_tweet' ,   \\( e \\)   = >   { 10             // Don't auto-insert \\227 show notification instead 11             setPendingCount \\( c   = >   c   +   1 \\) 12             // Stage tweet in query cache for instant load on click 13             const   tweet   =   JSON . parse \\( e . data \\) 14             queryClient . setQueryData \\( [ 'feed' ] ,   old   = >   \\( { 15                 . . . old , 16                 pending :   [ . . . \\( old ? . pending   | |   [ ] \\) ,   tweet ] 17             } \\) \\) 18         } \\) 19         return   \\( \\)   = >   es . close \\( \\) 20     } ,   [ ] \\) 21 Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 32/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-an-e-commerce-product-page-with-add-to-cart-n-an",
    title: "Design an e-commerce product page with add-to-cart. n   Answer Requirements: Product images gallery \\(zoom, multiple images, video\\) Variants selector \\(size, colour\\) \\227 SKU availability Add to cart with quantity selector Reviews and ratings \\(paginated, sortable\\) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image \\227 preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart \\(immediate feedback\\) Structured data \\(SEO\\): JSON-LD for Product schema \\227 price, availability, ratings Google shows price and ratings in search results  1 // Product page architecture  2 const   ProductPage   =   async   \\( {   params   } \\)   = >   {  3     // SSR: product data for SEO + fast initial paint  4     const   product   =   await   db . product . findUnique \\( {  5         where :   {   slug :   params . slug   } ,  6         include :   {   variants :   true ,   images :   true   }  7     } \\)  8  9     return   \\( 10         < > 11             { / *   Structured   data   for   Google   rich   results   * / } 12             < script   type = 'application/ld+json' > { JSON . stringify \\( { 13                 '@context' :   'https://schema.org' , 14                 '@type' :   'Product' , 15                 name :   product . name , 16                 offers :   {   '@type' :   'Offer' ,   price :   product . price ,   availability :   'InStock'   } , 17                 aggregateRating :   {   ratingValue :   product . rating ,   reviewCount :   product . reviewCount   } 18             } \\) } < / script > 19             < ProductView   product = { product }   / > 20         < / > 21     \\) 22 } 23 24 // Client component: interactive parts Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 33/42",
    prompt: "Design an e-commerce product page with add-to-cart. n   Answer Requirements: Product images gallery \\(zoom, multiple images, video\\) Variants selector \\(size, colour\\) \\227 SKU availability Add to cart with quantity selector Reviews and ratings \\(paginated, sortable\\) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image \\227 preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart \\(immediate feedback\\) Structured data \\(SEO\\): JSON-LD for Product schema \\227 price, availability, ratings Google shows price and ratings in search results  1 // Product page architecture  2 const   ProductPage   =   async   \\( {   params   } \\)   = >   {  3     // SSR: product data for SEO + fast initial paint  4     const   product   =   await   db . product . findUnique \\( {  5         where :   {   slug :   params . slug   } ,  6         include :   {   variants :   true ,   images :   true   }  7     } \\)  8  9     return   \\( 10         < > 11             { / *   Structured   data   for   Google   rich   results   * / } 12             < script   type = 'application/ld+json' > { JSON . stringify \\( { 13                 '@context' :   'https://schema.org' , 14                 '@type' :   'Product' , 15                 name :   product . name , 16                 offers :   {   '@type' :   'Offer' ,   price :   product . price ,   availability :   'InStock'   } , 17                 aggregateRating :   {   ratingValue :   product . rating ,   reviewCount :   product . reviewCount   } 18             } \\) } < / script > 19             < ProductView   product = { product }   / > 20         < / > 21     \\) 22 } 23 24 // Client component: interactive parts Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 33/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "25 const ProductView = ( { product } ) = > { 26 const [ selectedVariant , setSelectedVariant ] = useState ( product.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "25 const ProductView = ( { product } ) = > { 26 const [ selectedVariant , setSelectedVariant ] = useState ( product . variants [ 0 ] ) 27 const { addItem } = useCartStore ( ) 28 29 return ( 30 < div > 31 < ImageGallery images = { product . images } / > 32 < h1 > { product . name } < / h1 > 33 < Price amount = { selectedVariant . price } / > 34 < VariantSelector 35 variants = { product . variants } 36 selected = { selectedVariant } 37 onChange = { setSelectedVariant } 38 / > 39 < AddToCartButton 40 disabled = { selectedVariant . stock = = = 0 } 41 onClick = { ( ) = > addItem ( selectedVariant ) } 42 / > 43 { selectedVariant . stock > 0 & & selectedVariant . stock < 5 & & ( 44 < p className = 'urgency' > Only { selectedVariant . stock } left ! < / p > 45 ) } 46 { / * Lazy load reviews below fold * / } 47 < Suspense fallback = { < ReviewSkeleton / > } > 48 < Reviews productId = { product . id } / > 49 < / Suspense > 50 < / div > 51 ) 52 } n Interview Tip: Add JSON-LD structured data on product pages. Google shows price, availability, and ratings directly in search results (rich snippets). This increases click-through rate by 20-30% with zero code complexity. It is one of the highest-ROI SEO improvements for e-commerce. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 33/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design an e-commerce product page with add-to-cart. n   Answer Requirements: Product images gallery \\(zoom, multiple images, video\\) Variants selector \\(size, colour\\) \\227 SKU availability Add to cart with quantity selector Reviews and ratings \\(paginated, sortable\\) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image \\227 preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart \\(immediate feedback\\) Structured data \\(SEO\\): JSON-LD for Product schema \\227 price, availability, ratings Google shows price and ratings in search results  1 // Product page architecture  2 const   ProductPage   =   async   \\( {   params   } \\)   = >   {  3     // SSR: product data for SEO + fast initial paint  4     const   product   =   await   db . product . findUnique \\( {  5         where :   {   slug :   params . slug   } ,  6         include :   {   variants :   true ,   images :   true   }  7     } \\)  8  9     return   \\( 10         < > 11             { / *   Structured   data   for   Google   rich   results   * / } 12             < script   type = 'application/ld+json' > { JSON . stringify \\( { 13                 '@context' :   'https://schema.org' , 14                 '@type' :   'Product' , 15                 name :   product . name , 16                 offers :   {   '@type' :   'Offer' ,   price :   product . price ,   availability :   'InStock'   } , 17                 aggregateRating :   {   ratingValue :   product . rating ,   reviewCount :   product . reviewCount   } 18             } \\) } < / script > 19             < ProductView   product = { product }   / > 20         < / > 21     \\) 22 } 23 24 // Client component: interactive parts Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 33/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design an e-commerce product page with add-to-cart. n   Answer Requirements: Product images gallery \\(zoom, multiple images, video\\) Variants selector \\(size, colour\\) \\227 SKU availability Add to cart with quantity selector Reviews and ratings \\(paginated, sortable\\) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image \\227 preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart \\(immediate feedback\\) Structured data \\(SEO\\): JSON-LD for Product schema \\227 price, availability, ratings Google shows price and ratings in search results  1 // Product page architecture  2 const   ProductPage   =   async   \\( {   params   } \\)   = >   {  3     // SSR: product data for SEO + fast initial paint  4     const   product   =   await   db . product . findUnique \\( {  5         where :   {   slug :   params . slug   } ,  6         include :   {   variants :   true ,   images :   true   }  7     } \\)  8  9     return   \\( 10         < > 11             { / *   Structured   data   for   Google   rich   results   * / } 12             < script   type = 'application/ld+json' > { JSON . stringify \\( { 13                 '@context' :   'https://schema.org' , 14                 '@type' :   'Product' , 15                 name :   product . name , 16                 offers :   {   '@type' :   'Offer' ,   price :   product . price ,   availability :   'InStock'   } , 17                 aggregateRating :   {   ratingValue :   product . rating ,   reviewCount :   product . reviewCount   } 18             } \\) } < / script > 19             < ProductView   product = { product }   / > 20         < / > 21     \\) 22 } 23 24 // Client component: interactive parts Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 33/42.",
    hints: [
      "Consider the core principles and trade-offs of Design an e-commerce product page with add-to-cart. n   Answer Requirements: Product images gallery \\(zoom, multiple images, video\\) Variants selector \\(size, colour\\) \\227 SKU availability Add to cart with quantity selector Reviews and ratings \\(paginated, sortable\\) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image \\227 preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart \\(immediate feedback\\) Structured data \\(SEO\\): JSON-LD for Product schema \\227 price, availability, ratings Google shows price and ratings in search results  1 // Product page architecture  2 const   ProductPage   =   async   \\( {   params   } \\)   = >   {  3     // SSR: product data for SEO + fast initial paint  4     const   product   =   await   db . product . findUnique \\( {  5         where :   {   slug :   params . slug   } ,  6         include :   {   variants :   true ,   images :   true   }  7     } \\)  8  9     return   \\( 10         < > 11             { / *   Structured   data   for   Google   rich   results   * / } 12             < script   type = 'application/ld+json' > { JSON . stringify \\( { 13                 '@context' :   'https://schema.org' , 14                 '@type' :   'Product' , 15                 name :   product . name , 16                 offers :   {   '@type' :   'Offer' ,   price :   product . price ,   availability :   'InStock'   } , 17                 aggregateRating :   {   ratingValue :   product . rating ,   reviewCount :   product . reviewCount   } 18             } \\) } < / script > 19             < ProductView   product = { product }   / > 20         < / > 21     \\) 22 } 23 24 // Client component: interactive parts Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 33/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-google-docs-style-collaborative-document-edito",
    title: "Design a Google Docs-style collaborative document editor. n   Answer Requirements: Real-time collaborative editing \\(multiple users simultaneously\\) Cursor presence \\(see where others are\\) Rich text formatting Offline support \\(edit offline, sync when reconnected\\) Version history Comments and suggestions Technical approach: Y.js CRDT \\227 conflict-free data structure for collaborative editing TipTap editor \\227 integrates with Y.js out of the box WebSocket provider \\227 y-websocket for real-time sync IndexedDB \\227 offline persistence via y-indexeddb CRDT vs OT \\(Operational Transformation\\): OT \\(Google's approach\\) \\227 complex, requires central server for conflict resolution CRDT \\(Y.js\\) \\227 math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools  1 import   *   as   Y   from   'yjs'  2 import   {   WebsocketProvider   }   from   'y-websocket'  3 import   {   IndexeddbPersistence   }   from   'y-indexeddb'  4 import   {   useEditor ,   EditorContent   }   from   '@tiptap/react'  5 import   Collaboration   from   '@tiptap/extension-collaboration'  6 import   CollaborationCursor   from   '@tiptap/extension-collaboration-cursor'  7  8 const   CollabEditor   =   \\( {   docId ,   user   } \\)   = >   {  9     const   ydoc   =   useMemo \\( \\( \\)   = >   new   Y . Doc \\( \\) ,   [ ] \\) 10 11     // WebSocket sync: real-time collaboration 12     const   wsProvider   =   useMemo \\( \\( \\)   = >   new   WebsocketProvider \\( 13         'wss://api.myapp.com' , 14         docId , 15         ydoc 16     \\) ,   [ docId ,   ydoc ] \\) 17 18     // IndexedDB: offline persistence 19     useMemo \\( \\( \\)   = >   new   IndexeddbPersistence \\( docId ,   ydoc \\) ,   [ docId ,   ydoc ] \\) 20 21     const   editor   =   useEditor \\( { 22         extensions :   [ 23             Collaboration . configure \\( {   document :   ydoc   } \\) , 24             CollaborationCursor . configure \\( { 25                 provider :   wsProvider , 26                 user :   {   name :   user . name ,   color :   user . color   } 27             } \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 34/42",
    prompt: "Design a Google Docs-style collaborative document editor. n   Answer Requirements: Real-time collaborative editing \\(multiple users simultaneously\\) Cursor presence \\(see where others are\\) Rich text formatting Offline support \\(edit offline, sync when reconnected\\) Version history Comments and suggestions Technical approach: Y.js CRDT \\227 conflict-free data structure for collaborative editing TipTap editor \\227 integrates with Y.js out of the box WebSocket provider \\227 y-websocket for real-time sync IndexedDB \\227 offline persistence via y-indexeddb CRDT vs OT \\(Operational Transformation\\): OT \\(Google's approach\\) \\227 complex, requires central server for conflict resolution CRDT \\(Y.js\\) \\227 math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools  1 import   *   as   Y   from   'yjs'  2 import   {   WebsocketProvider   }   from   'y-websocket'  3 import   {   IndexeddbPersistence   }   from   'y-indexeddb'  4 import   {   useEditor ,   EditorContent   }   from   '@tiptap/react'  5 import   Collaboration   from   '@tiptap/extension-collaboration'  6 import   CollaborationCursor   from   '@tiptap/extension-collaboration-cursor'  7  8 const   CollabEditor   =   \\( {   docId ,   user   } \\)   = >   {  9     const   ydoc   =   useMemo \\( \\( \\)   = >   new   Y . Doc \\( \\) ,   [ ] \\) 10 11     // WebSocket sync: real-time collaboration 12     const   wsProvider   =   useMemo \\( \\( \\)   = >   new   WebsocketProvider \\( 13         'wss://api.myapp.com' , 14         docId , 15         ydoc 16     \\) ,   [ docId ,   ydoc ] \\) 17 18     // IndexedDB: offline persistence 19     useMemo \\( \\( \\)   = >   new   IndexeddbPersistence \\( docId ,   ydoc \\) ,   [ docId ,   ydoc ] \\) 20 21     const   editor   =   useEditor \\( { 22         extensions :   [ 23             Collaboration . configure \\( {   document :   ydoc   } \\) , 24             CollaborationCursor . configure \\( { 25                 provider :   wsProvider , 26                 user :   {   name :   user . name ,   color :   user . color   } 27             } \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 34/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "28 ] 29 } ) 30 31 // Awareness: who is online 32 const [ awareness , setAwareness ] = useState ( [ ] ) 33 useEffect ( ( ) = > { 34 const updateAwareness = ( ) = > { 35 setAwareness ( Array.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "28 ] 29 } ) 30 31 // Awareness: who is online 32 const [ awareness , setAwareness ] = useState ( [ ] ) 33 useEffect ( ( ) = > { 34 const updateAwareness = ( ) = > { 35 setAwareness ( Array . from ( wsProvider . awareness . getStates ( ) . values ( ) ) ) 36 } 37 wsProvider . awareness . on ( 'change' , updateAwareness ) 38 return ( ) = > wsProvider . awareness . off ( 'change' , updateAwareness ) 39 } , [ wsProvider ] ) 40 41 return ( 42 < div > 43 < Presence users = { awareness } / > 44 < EditorContent editor = { editor } / > 45 < / div > 46 ) 47 } n Interview Tip: Y.js with IndexedDB persistence gives you offline-first collaboration for free. Users can edit documents offline, and when they reconnect, Y.js CRDTs automatically merge all offline changes with what others edited online \\227 no conflicts, no data loss. This is what makes Notion and Linear feel so robust. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 34/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a Google Docs-style collaborative document editor. n   Answer Requirements: Real-time collaborative editing \\(multiple users simultaneously\\) Cursor presence \\(see where others are\\) Rich text formatting Offline support \\(edit offline, sync when reconnected\\) Version history Comments and suggestions Technical approach: Y.js CRDT \\227 conflict-free data structure for collaborative editing TipTap editor \\227 integrates with Y.js out of the box WebSocket provider \\227 y-websocket for real-time sync IndexedDB \\227 offline persistence via y-indexeddb CRDT vs OT \\(Operational Transformation\\): OT \\(Google's approach\\) \\227 complex, requires central server for conflict resolution CRDT \\(Y.js\\) \\227 math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools  1 import   *   as   Y   from   'yjs'  2 import   {   WebsocketProvider   }   from   'y-websocket'  3 import   {   IndexeddbPersistence   }   from   'y-indexeddb'  4 import   {   useEditor ,   EditorContent   }   from   '@tiptap/react'  5 import   Collaboration   from   '@tiptap/extension-collaboration'  6 import   CollaborationCursor   from   '@tiptap/extension-collaboration-cursor'  7  8 const   CollabEditor   =   \\( {   docId ,   user   } \\)   = >   {  9     const   ydoc   =   useMemo \\( \\( \\)   = >   new   Y . Doc \\( \\) ,   [ ] \\) 10 11     // WebSocket sync: real-time collaboration 12     const   wsProvider   =   useMemo \\( \\( \\)   = >   new   WebsocketProvider \\( 13         'wss://api.myapp.com' , 14         docId , 15         ydoc 16     \\) ,   [ docId ,   ydoc ] \\) 17 18     // IndexedDB: offline persistence 19     useMemo \\( \\( \\)   = >   new   IndexeddbPersistence \\( docId ,   ydoc \\) ,   [ docId ,   ydoc ] \\) 20 21     const   editor   =   useEditor \\( { 22         extensions :   [ 23             Collaboration . configure \\( {   document :   ydoc   } \\) , 24             CollaborationCursor . configure \\( { 25                 provider :   wsProvider , 26                 user :   {   name :   user . name ,   color :   user . color   } 27             } \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 34/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a Google Docs-style collaborative document editor. n   Answer Requirements: Real-time collaborative editing \\(multiple users simultaneously\\) Cursor presence \\(see where others are\\) Rich text formatting Offline support \\(edit offline, sync when reconnected\\) Version history Comments and suggestions Technical approach: Y.js CRDT \\227 conflict-free data structure for collaborative editing TipTap editor \\227 integrates with Y.js out of the box WebSocket provider \\227 y-websocket for real-time sync IndexedDB \\227 offline persistence via y-indexeddb CRDT vs OT \\(Operational Transformation\\): OT \\(Google's approach\\) \\227 complex, requires central server for conflict resolution CRDT \\(Y.js\\) \\227 math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools  1 import   *   as   Y   from   'yjs'  2 import   {   WebsocketProvider   }   from   'y-websocket'  3 import   {   IndexeddbPersistence   }   from   'y-indexeddb'  4 import   {   useEditor ,   EditorContent   }   from   '@tiptap/react'  5 import   Collaboration   from   '@tiptap/extension-collaboration'  6 import   CollaborationCursor   from   '@tiptap/extension-collaboration-cursor'  7  8 const   CollabEditor   =   \\( {   docId ,   user   } \\)   = >   {  9     const   ydoc   =   useMemo \\( \\( \\)   = >   new   Y . Doc \\( \\) ,   [ ] \\) 10 11     // WebSocket sync: real-time collaboration 12     const   wsProvider   =   useMemo \\( \\( \\)   = >   new   WebsocketProvider \\( 13         'wss://api.myapp.com' , 14         docId , 15         ydoc 16     \\) ,   [ docId ,   ydoc ] \\) 17 18     // IndexedDB: offline persistence 19     useMemo \\( \\( \\)   = >   new   IndexeddbPersistence \\( docId ,   ydoc \\) ,   [ docId ,   ydoc ] \\) 20 21     const   editor   =   useEditor \\( { 22         extensions :   [ 23             Collaboration . configure \\( {   document :   ydoc   } \\) , 24             CollaborationCursor . configure \\( { 25                 provider :   wsProvider , 26                 user :   {   name :   user . name ,   color :   user . color   } 27             } \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 34/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a Google Docs-style collaborative document editor. n   Answer Requirements: Real-time collaborative editing \\(multiple users simultaneously\\) Cursor presence \\(see where others are\\) Rich text formatting Offline support \\(edit offline, sync when reconnected\\) Version history Comments and suggestions Technical approach: Y.js CRDT \\227 conflict-free data structure for collaborative editing TipTap editor \\227 integrates with Y.js out of the box WebSocket provider \\227 y-websocket for real-time sync IndexedDB \\227 offline persistence via y-indexeddb CRDT vs OT \\(Operational Transformation\\): OT \\(Google's approach\\) \\227 complex, requires central server for conflict resolution CRDT \\(Y.js\\) \\227 math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools  1 import   *   as   Y   from   'yjs'  2 import   {   WebsocketProvider   }   from   'y-websocket'  3 import   {   IndexeddbPersistence   }   from   'y-indexeddb'  4 import   {   useEditor ,   EditorContent   }   from   '@tiptap/react'  5 import   Collaboration   from   '@tiptap/extension-collaboration'  6 import   CollaborationCursor   from   '@tiptap/extension-collaboration-cursor'  7  8 const   CollabEditor   =   \\( {   docId ,   user   } \\)   = >   {  9     const   ydoc   =   useMemo \\( \\( \\)   = >   new   Y . Doc \\( \\) ,   [ ] \\) 10 11     // WebSocket sync: real-time collaboration 12     const   wsProvider   =   useMemo \\( \\( \\)   = >   new   WebsocketProvider \\( 13         'wss://api.myapp.com' , 14         docId , 15         ydoc 16     \\) ,   [ docId ,   ydoc ] \\) 17 18     // IndexedDB: offline persistence 19     useMemo \\( \\( \\)   = >   new   IndexeddbPersistence \\( docId ,   ydoc \\) ,   [ docId ,   ydoc ] \\) 20 21     const   editor   =   useEditor \\( { 22         extensions :   [ 23             Collaboration . configure \\( {   document :   ydoc   } \\) , 24             CollaborationCursor . configure \\( { 25                 provider :   wsProvider , 26                 user :   {   name :   user . name ,   color :   user . color   } 27             } \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 34/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-dashboard-with-charts-filters-and-real-time-up",
    title: "Design a Dashboard with charts, filters, and real-time updates. n   Answer Requirements: KPI cards \\(revenue, users, conversions\\) Time-series charts with date range filter Real-time updates \\(revenue updates every few seconds\\) Responsive layout \\(grid rearranges on mobile\\) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state \\(shareable dashboard state\\) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side \\227 don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget  1 // Dashboard with URL-synced filters  2 const   Dashboard   =   \\( \\)   = >   {  3     const   [ params ,   setParams ]   =   useSearchParams \\( \\)  4     const   dateRange   =   {  5         from :   params . get \\( 'from' \\)   | |   subDays \\( new   Date \\( \\) ,   30 \\) . toISOString \\( \\) ,  6         to :       params . get \\( 'to' \\)       | |   new   Date \\( \\) . toISOString \\( \\)  7     }  8  9     // React Query with auto-refetch for real-time feel 10     const   {   data :   kpis   }   =   useQuery \\( { 11         queryKey :   [ 'dashboard' ,   'kpis' ,   dateRange ] , 12         queryFn :   \\( \\)   = >   api . getKPIs \\( dateRange \\) , 13         refetchInterval :   30_000 ,     // refresh every 30 seconds 14     } \\) 15 16     const   {   data :   chartData   }   =   useQuery \\( { 17         queryKey :   [ 'dashboard' ,   'revenue' ,   dateRange ] , 18         queryFn :   \\( \\)   = >   api . getRevenueChart \\( dateRange \\) , 19         staleTime :   5   *   60_000 ,     // 5 min \\227 chart data can be stale 20     } \\) 21 22     return   \\( 23         < div   className = 'dashboard' > 24             < DateRangePicker 25                 value = { dateRange } 26                 onChange = { \\( {   from ,   to   } \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 35/42",
    prompt: "Design a Dashboard with charts, filters, and real-time updates. n   Answer Requirements: KPI cards \\(revenue, users, conversions\\) Time-series charts with date range filter Real-time updates \\(revenue updates every few seconds\\) Responsive layout \\(grid rearranges on mobile\\) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state \\(shareable dashboard state\\) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side \\227 don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget  1 // Dashboard with URL-synced filters  2 const   Dashboard   =   \\( \\)   = >   {  3     const   [ params ,   setParams ]   =   useSearchParams \\( \\)  4     const   dateRange   =   {  5         from :   params . get \\( 'from' \\)   | |   subDays \\( new   Date \\( \\) ,   30 \\) . toISOString \\( \\) ,  6         to :       params . get \\( 'to' \\)       | |   new   Date \\( \\) . toISOString \\( \\)  7     }  8  9     // React Query with auto-refetch for real-time feel 10     const   {   data :   kpis   }   =   useQuery \\( { 11         queryKey :   [ 'dashboard' ,   'kpis' ,   dateRange ] , 12         queryFn :   \\( \\)   = >   api . getKPIs \\( dateRange \\) , 13         refetchInterval :   30_000 ,     // refresh every 30 seconds 14     } \\) 15 16     const   {   data :   chartData   }   =   useQuery \\( { 17         queryKey :   [ 'dashboard' ,   'revenue' ,   dateRange ] , 18         queryFn :   \\( \\)   = >   api . getRevenueChart \\( dateRange \\) , 19         staleTime :   5   *   60_000 ,     // 5 min \\227 chart data can be stale 20     } \\) 21 22     return   \\( 23         < div   className = 'dashboard' > 24             < DateRangePicker 25                 value = { dateRange } 26                 onChange = { \\( {   from ,   to   } \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 35/42 \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 setParams ( p = > { p.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 setParams ( p = > { p . set ( 'from' , from ) ; p . set ( 'to' , to ) ; return p } ) 28 } } 29 / > 30 31 { / * KPI cards grid * / } 32 < div className = 'kpi-grid' > 33 < Suspense fallback = { < KPISkeleton / > } > 34 < KPICard title = 'Revenue' value = { kpis ? . revenue } trend = { kpis ? . revenueTrend } / > 35 < KPICard title = 'Users' value = { kpis ? . users } trend = { kpis ? . usersTrend } / > 36 < / Suspense > 37 < / div > 38 39 { / * Revenue chart * / } 40 < RevenueChart data = { chartData } / > 41 < / div > 42 ) 43 } 44 45 // Export to PDF 46 const exportDashboard = async ( ) = > { 47 const { jsPDF } = await import ( 'jspdf' ) // lazy loaded 48 const { html2canvas } = await import ( 'html2canvas' ) 49 const canvas = await html2canvas ( document . getElementById ( 'dashboard' ) ) 50 const pdf = new jsPDF ( { orientation : 'landscape' } ) 51 pdf . addImage ( canvas . toDataURL ( ) , 'PNG' , 0 , 0 , 297 , 210 ) 52 pdf . save ( 'dashboard.pdf' ) 53 } n Interview Tip: Lazy load the PDF export libraries (jsPDF, html2canvas). They are large (500KB+) and only needed when user clicks Export. With lazy loading, they are only downloaded on demand. This keeps your initial bundle small for the 99% of users who never export. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 35/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a Dashboard with charts, filters, and real-time updates. n   Answer Requirements: KPI cards \\(revenue, users, conversions\\) Time-series charts with date range filter Real-time updates \\(revenue updates every few seconds\\) Responsive layout \\(grid rearranges on mobile\\) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state \\(shareable dashboard state\\) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side \\227 don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget  1 // Dashboard with URL-synced filters  2 const   Dashboard   =   \\( \\)   = >   {  3     const   [ params ,   setParams ]   =   useSearchParams \\( \\)  4     const   dateRange   =   {  5         from :   params . get \\( 'from' \\)   | |   subDays \\( new   Date \\( \\) ,   30 \\) . toISOString \\( \\) ,  6         to :       params . get \\( 'to' \\)       | |   new   Date \\( \\) . toISOString \\( \\)  7     }  8  9     // React Query with auto-refetch for real-time feel 10     const   {   data :   kpis   }   =   useQuery \\( { 11         queryKey :   [ 'dashboard' ,   'kpis' ,   dateRange ] , 12         queryFn :   \\( \\)   = >   api . getKPIs \\( dateRange \\) , 13         refetchInterval :   30_000 ,     // refresh every 30 seconds 14     } \\) 15 16     const   {   data :   chartData   }   =   useQuery \\( { 17         queryKey :   [ 'dashboard' ,   'revenue' ,   dateRange ] , 18         queryFn :   \\( \\)   = >   api . getRevenueChart \\( dateRange \\) , 19         staleTime :   5   *   60_000 ,     // 5 min \\227 chart data can be stale 20     } \\) 21 22     return   \\( 23         < div   className = 'dashboard' > 24             < DateRangePicker 25                 value = { dateRange } 26                 onChange = { \\( {   from ,   to   } \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 35/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a Dashboard with charts, filters, and real-time updates. n   Answer Requirements: KPI cards \\(revenue, users, conversions\\) Time-series charts with date range filter Real-time updates \\(revenue updates every few seconds\\) Responsive layout \\(grid rearranges on mobile\\) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state \\(shareable dashboard state\\) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side \\227 don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget  1 // Dashboard with URL-synced filters  2 const   Dashboard   =   \\( \\)   = >   {  3     const   [ params ,   setParams ]   =   useSearchParams \\( \\)  4     const   dateRange   =   {  5         from :   params . get \\( 'from' \\)   | |   subDays \\( new   Date \\( \\) ,   30 \\) . toISOString \\( \\) ,  6         to :       params . get \\( 'to' \\)       | |   new   Date \\( \\) . toISOString \\( \\)  7     }  8  9     // React Query with auto-refetch for real-time feel 10     const   {   data :   kpis   }   =   useQuery \\( { 11         queryKey :   [ 'dashboard' ,   'kpis' ,   dateRange ] , 12         queryFn :   \\( \\)   = >   api . getKPIs \\( dateRange \\) , 13         refetchInterval :   30_000 ,     // refresh every 30 seconds 14     } \\) 15 16     const   {   data :   chartData   }   =   useQuery \\( { 17         queryKey :   [ 'dashboard' ,   'revenue' ,   dateRange ] , 18         queryFn :   \\( \\)   = >   api . getRevenueChart \\( dateRange \\) , 19         staleTime :   5   *   60_000 ,     // 5 min \\227 chart data can be stale 20     } \\) 21 22     return   \\( 23         < div   className = 'dashboard' > 24             < DateRangePicker 25                 value = { dateRange } 26                 onChange = { \\( {   from ,   to   } \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 35/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a Dashboard with charts, filters, and real-time updates. n   Answer Requirements: KPI cards \\(revenue, users, conversions\\) Time-series charts with date range filter Real-time updates \\(revenue updates every few seconds\\) Responsive layout \\(grid rearranges on mobile\\) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state \\(shareable dashboard state\\) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side \\227 don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget  1 // Dashboard with URL-synced filters  2 const   Dashboard   =   \\( \\)   = >   {  3     const   [ params ,   setParams ]   =   useSearchParams \\( \\)  4     const   dateRange   =   {  5         from :   params . get \\( 'from' \\)   | |   subDays \\( new   Date \\( \\) ,   30 \\) . toISOString \\( \\) ,  6         to :       params . get \\( 'to' \\)       | |   new   Date \\( \\) . toISOString \\( \\)  7     }  8  9     // React Query with auto-refetch for real-time feel 10     const   {   data :   kpis   }   =   useQuery \\( { 11         queryKey :   [ 'dashboard' ,   'kpis' ,   dateRange ] , 12         queryFn :   \\( \\)   = >   api . getKPIs \\( dateRange \\) , 13         refetchInterval :   30_000 ,     // refresh every 30 seconds 14     } \\) 15 16     const   {   data :   chartData   }   =   useQuery \\( { 17         queryKey :   [ 'dashboard' ,   'revenue' ,   dateRange ] , 18         queryFn :   \\( \\)   = >   api . getRevenueChart \\( dateRange \\) , 19         staleTime :   5   *   60_000 ,     // 5 min \\227 chart data can be stale 20     } \\) 21 22     return   \\( 23         < div   className = 'dashboard' > 24             < DateRangePicker 25                 value = { dateRange } 26                 onChange = { \\( {   from ,   to   } \\)   = >   { Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 35/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-chat-application-like-whatsapp-n-answer-requir",
    title: "Design a chat application like WhatsApp. n   Answer Requirements: Real-time messaging \\(delivered instantly\\) Message status: sent, delivered, read \\(ticks\\) Offline support \\227 send queued when reconnected End-to-end encryption \\(display-only\\) Media sharing \\(images, files, voice messages\\) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage \\(offline support\\) Message queue for offline sends Virtual list for chat history \\(thousands of messages\\) Message delivery flow: 1. User sends message  \\256  stored locally \\(pending\\) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK  \\256  update to delivered 5. Recipient opens  \\256  server notifies sent  \\256  update to read  1 // Chat message store with offline support  2 const   useChatMessages   =   \\( chatId \\)   = >   {  3     const   [ messages ,   setMessages ]   =   useState \\( [ ] \\)  4     const   {   send ,   connected   }   =   useWebSocket \\( `wss://api/chat/${chatId}` \\)  5  6     const   sendMessage   =   useCallback \\( \\( text \\)   = >   {  7         const   msg   =   {  8             id :   crypto . randomUUID \\( \\) ,  9             chatId , 10             text , 11             sentAt :   new   Date \\( \\) . toISOString \\( \\) , 12             status :   connected   ?   'sending'   :   'queued' , 13         } 14         // Optimistic: show immediately 15         setMessages \\( m   = >   [ . . . m ,   msg ] \\) 16         // Store in IndexedDB for offline persistence 17         db . messages . put \\( msg \\) 18 19         if   \\( connected \\)   { 20             send \\( 'message' ,   msg \\) 21         }   else   { 22             // Queue for later 23             messageQueue . push \\( msg \\) 24         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 36/42",
    prompt: "Design a chat application like WhatsApp. n   Answer Requirements: Real-time messaging \\(delivered instantly\\) Message status: sent, delivered, read \\(ticks\\) Offline support \\227 send queued when reconnected End-to-end encryption \\(display-only\\) Media sharing \\(images, files, voice messages\\) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage \\(offline support\\) Message queue for offline sends Virtual list for chat history \\(thousands of messages\\) Message delivery flow: 1. User sends message  \\256  stored locally \\(pending\\) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK  \\256  update to delivered 5. Recipient opens  \\256  server notifies sent  \\256  update to read  1 // Chat message store with offline support  2 const   useChatMessages   =   \\( chatId \\)   = >   {  3     const   [ messages ,   setMessages ]   =   useState \\( [ ] \\)  4     const   {   send ,   connected   }   =   useWebSocket \\( `wss://api/chat/${chatId}` \\)  5  6     const   sendMessage   =   useCallback \\( \\( text \\)   = >   {  7         const   msg   =   {  8             id :   crypto . randomUUID \\( \\) ,  9             chatId , 10             text , 11             sentAt :   new   Date \\( \\) . toISOString \\( \\) , 12             status :   connected   ?   'sending'   :   'queued' , 13         } 14         // Optimistic: show immediately 15         setMessages \\( m   = >   [ . . . m ,   msg ] \\) 16         // Store in IndexedDB for offline persistence 17         db . messages . put \\( msg \\) 18 19         if   \\( connected \\)   { 20             send \\( 'message' ,   msg \\) 21         }   else   { 22             // Queue for later 23             messageQueue . push \\( msg \\) 24         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 36/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "25 } , [ connected , send , chatId ] ) 26 27 // Flush queue on reconnect 28 useEffect ( ( ) = > { 29 if ( connected & & messageQueue.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "25 } , [ connected , send , chatId ] ) 26 27 // Flush queue on reconnect 28 useEffect ( ( ) = > { 29 if ( connected & & messageQueue . length > 0 ) { 30 messageQueue . forEach ( msg = > send ( 'message' , msg ) ) 31 messageQueue . length = 0 32 } 33 } , [ connected ] ) 34 35 return { messages , sendMessage } 36 } 37 38 // Message status display 39 const MessageStatus = ( { status } ) = > ( { 40 sending : < ClockIcon / > , 41 sent : < SingleTickIcon / > , 42 delivered : < DoubleTickIcon / > , 43 read : < DoubleTickIcon color = 'blue' / > , 44 } [ status ] ) 45 46 // Auto-scroll to latest message 47 const bottomRef = useRef ( null ) 48 useEffect ( ( ) = > { 49 bottomRef . current ? . scrollIntoView ( { behavior : 'smooth' } ) 50 } , [ messages . length ] ) n Interview Tip: Queue messages offline with IndexedDB and flush the queue on reconnect. This is what WhatsApp does \\227 messages you send without internet are queued locally and delivered the moment you reconnect. Users never lose messages even in poor connectivity. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 36/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a chat application like WhatsApp. n   Answer Requirements: Real-time messaging \\(delivered instantly\\) Message status: sent, delivered, read \\(ticks\\) Offline support \\227 send queued when reconnected End-to-end encryption \\(display-only\\) Media sharing \\(images, files, voice messages\\) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage \\(offline support\\) Message queue for offline sends Virtual list for chat history \\(thousands of messages\\) Message delivery flow: 1. User sends message  \\256  stored locally \\(pending\\) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK  \\256  update to delivered 5. Recipient opens  \\256  server notifies sent  \\256  update to read  1 // Chat message store with offline support  2 const   useChatMessages   =   \\( chatId \\)   = >   {  3     const   [ messages ,   setMessages ]   =   useState \\( [ ] \\)  4     const   {   send ,   connected   }   =   useWebSocket \\( `wss://api/chat/${chatId}` \\)  5  6     const   sendMessage   =   useCallback \\( \\( text \\)   = >   {  7         const   msg   =   {  8             id :   crypto . randomUUID \\( \\) ,  9             chatId , 10             text , 11             sentAt :   new   Date \\( \\) . toISOString \\( \\) , 12             status :   connected   ?   'sending'   :   'queued' , 13         } 14         // Optimistic: show immediately 15         setMessages \\( m   = >   [ . . . m ,   msg ] \\) 16         // Store in IndexedDB for offline persistence 17         db . messages . put \\( msg \\) 18 19         if   \\( connected \\)   { 20             send \\( 'message' ,   msg \\) 21         }   else   { 22             // Queue for later 23             messageQueue . push \\( msg \\) 24         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 36/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a chat application like WhatsApp. n   Answer Requirements: Real-time messaging \\(delivered instantly\\) Message status: sent, delivered, read \\(ticks\\) Offline support \\227 send queued when reconnected End-to-end encryption \\(display-only\\) Media sharing \\(images, files, voice messages\\) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage \\(offline support\\) Message queue for offline sends Virtual list for chat history \\(thousands of messages\\) Message delivery flow: 1. User sends message  \\256  stored locally \\(pending\\) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK  \\256  update to delivered 5. Recipient opens  \\256  server notifies sent  \\256  update to read  1 // Chat message store with offline support  2 const   useChatMessages   =   \\( chatId \\)   = >   {  3     const   [ messages ,   setMessages ]   =   useState \\( [ ] \\)  4     const   {   send ,   connected   }   =   useWebSocket \\( `wss://api/chat/${chatId}` \\)  5  6     const   sendMessage   =   useCallback \\( \\( text \\)   = >   {  7         const   msg   =   {  8             id :   crypto . randomUUID \\( \\) ,  9             chatId , 10             text , 11             sentAt :   new   Date \\( \\) . toISOString \\( \\) , 12             status :   connected   ?   'sending'   :   'queued' , 13         } 14         // Optimistic: show immediately 15         setMessages \\( m   = >   [ . . . m ,   msg ] \\) 16         // Store in IndexedDB for offline persistence 17         db . messages . put \\( msg \\) 18 19         if   \\( connected \\)   { 20             send \\( 'message' ,   msg \\) 21         }   else   { 22             // Queue for later 23             messageQueue . push \\( msg \\) 24         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 36/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a chat application like WhatsApp. n   Answer Requirements: Real-time messaging \\(delivered instantly\\) Message status: sent, delivered, read \\(ticks\\) Offline support \\227 send queued when reconnected End-to-end encryption \\(display-only\\) Media sharing \\(images, files, voice messages\\) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage \\(offline support\\) Message queue for offline sends Virtual list for chat history \\(thousands of messages\\) Message delivery flow: 1. User sends message  \\256  stored locally \\(pending\\) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK  \\256  update to delivered 5. Recipient opens  \\256  server notifies sent  \\256  update to read  1 // Chat message store with offline support  2 const   useChatMessages   =   \\( chatId \\)   = >   {  3     const   [ messages ,   setMessages ]   =   useState \\( [ ] \\)  4     const   {   send ,   connected   }   =   useWebSocket \\( `wss://api/chat/${chatId}` \\)  5  6     const   sendMessage   =   useCallback \\( \\( text \\)   = >   {  7         const   msg   =   {  8             id :   crypto . randomUUID \\( \\) ,  9             chatId , 10             text , 11             sentAt :   new   Date \\( \\) . toISOString \\( \\) , 12             status :   connected   ?   'sending'   :   'queued' , 13         } 14         // Optimistic: show immediately 15         setMessages \\( m   = >   [ . . . m ,   msg ] \\) 16         // Store in IndexedDB for offline persistence 17         db . messages . put \\( msg \\) 18 19         if   \\( connected \\)   { 20             send \\( 'message' ,   msg \\) 21         }   else   { 22             // Queue for later 23             messageQueue . push \\( msg \\) 24         } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 36/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-design-a-netflix-style-video-streaming-frontend-n-answe",
    title: "Design a Netflix-style video streaming frontend. n   Answer Requirements: Content discovery \\(browse, search, categories\\) Video playback with adaptive streaming \\(HLS/DASH\\) Continue watching \\(resume from last position\\) Hover preview \\(autoplay short clip on hover\\) Profiles \\(multiple users per account\\) Download for offline \\(PWA or native app only\\) Performance priorities: Content grid: virtualized rows \\(each row is lazy-loaded\\) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate \\(auto quality switch\\) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load  1 // Continue watching progress persistence  2 const   useVideoProgress   =   \\( videoId \\)   = >   {  3     const   saveProgress   =   useMutation \\( {  4         mutationFn :   \\( {   position   } \\)   = >   api . saveProgress \\( {   videoId ,   position   } \\) ,  5     } \\)  6  7     // Save position every 10 seconds  8     const   handleTimeUpdate   =   useCallback \\(  9         debounce \\( \\( currentTime \\)   = >   { 10             saveProgress . mutate \\( {   position :   currentTime   } \\) 11         } ,   10_000 \\) , 12         [ videoId ] 13     \\) 14 15     // Restore position on load 16     const   {   data :   savedProgress   }   =   useQuery \\( { 17         queryKey :   [ 'progress' ,   videoId ] , 18         queryFn :   \\( \\)   = >   api . getProgress \\( videoId \\) , 19     } \\) 20 21     return   {   handleTimeUpdate ,   startPosition :   savedProgress ? . position   ? ?   0   } 22 } 23 24 // Hover preview with delay 25 const   ContentCard   =   \\( {   content   } \\)   = >   { 26     const   [ showPreview ,   setShowPreview ]   =   useState \\( false \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 37/42",
    prompt: "Design a Netflix-style video streaming frontend. n   Answer Requirements: Content discovery \\(browse, search, categories\\) Video playback with adaptive streaming \\(HLS/DASH\\) Continue watching \\(resume from last position\\) Hover preview \\(autoplay short clip on hover\\) Profiles \\(multiple users per account\\) Download for offline \\(PWA or native app only\\) Performance priorities: Content grid: virtualized rows \\(each row is lazy-loaded\\) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate \\(auto quality switch\\) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load  1 // Continue watching progress persistence  2 const   useVideoProgress   =   \\( videoId \\)   = >   {  3     const   saveProgress   =   useMutation \\( {  4         mutationFn :   \\( {   position   } \\)   = >   api . saveProgress \\( {   videoId ,   position   } \\) ,  5     } \\)  6  7     // Save position every 10 seconds  8     const   handleTimeUpdate   =   useCallback \\(  9         debounce \\( \\( currentTime \\)   = >   { 10             saveProgress . mutate \\( {   position :   currentTime   } \\) 11         } ,   10_000 \\) , 12         [ videoId ] 13     \\) 14 15     // Restore position on load 16     const   {   data :   savedProgress   }   =   useQuery \\( { 17         queryKey :   [ 'progress' ,   videoId ] , 18         queryFn :   \\( \\)   = >   api . getProgress \\( videoId \\) , 19     } \\) 20 21     return   {   handleTimeUpdate ,   startPosition :   savedProgress ? . position   ? ?   0   } 22 } 23 24 // Hover preview with delay 25 const   ContentCard   =   \\( {   content   } \\)   = >   { 26     const   [ showPreview ,   setShowPreview ]   =   useState \\( false \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 37/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 const timer = useRef ( null ) 28 29 const handleMouseEnter = ( ) = > { 30 timer.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "27 const timer = useRef ( null ) 28 29 const handleMouseEnter = ( ) = > { 30 timer . current = setTimeout ( ( ) = > setShowPreview ( true ) , 500 ) 31 } 32 const handleMouseLeave = ( ) = > { 33 clearTimeout ( timer . current ) 34 setShowPreview ( false ) 35 } 36 37 return ( 38 < div onMouseEnter = { handleMouseEnter } onMouseLeave = { handleMouseLeave } > 39 < img src = { content . thumbnail } alt = { content . title } loading = 'lazy' / > 40 { showPreview & & ( 41 < video 42 src = { content . previewUrl } 43 autoPlay muted loop 44 style = { { position : 'absolute' , inset : 0 } } 45 / > 46 ) } 47 < / div > 48 ) 49 } n Interview Tip: Save video progress every 10 seconds using a debounced function, not on every timeupdate event. timeupdate fires 4 times per second \\227 calling the API every 250ms would be 14,000 API calls per hour of viewing. Debounce to every 10 seconds = 360 calls per hour. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 37/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Design a Netflix-style video streaming frontend. n   Answer Requirements: Content discovery \\(browse, search, categories\\) Video playback with adaptive streaming \\(HLS/DASH\\) Continue watching \\(resume from last position\\) Hover preview \\(autoplay short clip on hover\\) Profiles \\(multiple users per account\\) Download for offline \\(PWA or native app only\\) Performance priorities: Content grid: virtualized rows \\(each row is lazy-loaded\\) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate \\(auto quality switch\\) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load  1 // Continue watching progress persistence  2 const   useVideoProgress   =   \\( videoId \\)   = >   {  3     const   saveProgress   =   useMutation \\( {  4         mutationFn :   \\( {   position   } \\)   = >   api . saveProgress \\( {   videoId ,   position   } \\) ,  5     } \\)  6  7     // Save position every 10 seconds  8     const   handleTimeUpdate   =   useCallback \\(  9         debounce \\( \\( currentTime \\)   = >   { 10             saveProgress . mutate \\( {   position :   currentTime   } \\) 11         } ,   10_000 \\) , 12         [ videoId ] 13     \\) 14 15     // Restore position on load 16     const   {   data :   savedProgress   }   =   useQuery \\( { 17         queryKey :   [ 'progress' ,   videoId ] , 18         queryFn :   \\( \\)   = >   api . getProgress \\( videoId \\) , 19     } \\) 20 21     return   {   handleTimeUpdate ,   startPosition :   savedProgress ? . position   ? ?   0   } 22 } 23 24 // Hover preview with delay 25 const   ContentCard   =   \\( {   content   } \\)   = >   { 26     const   [ showPreview ,   setShowPreview ]   =   useState \\( false \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 37/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Design a Netflix-style video streaming frontend. n   Answer Requirements: Content discovery \\(browse, search, categories\\) Video playback with adaptive streaming \\(HLS/DASH\\) Continue watching \\(resume from last position\\) Hover preview \\(autoplay short clip on hover\\) Profiles \\(multiple users per account\\) Download for offline \\(PWA or native app only\\) Performance priorities: Content grid: virtualized rows \\(each row is lazy-loaded\\) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate \\(auto quality switch\\) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load  1 // Continue watching progress persistence  2 const   useVideoProgress   =   \\( videoId \\)   = >   {  3     const   saveProgress   =   useMutation \\( {  4         mutationFn :   \\( {   position   } \\)   = >   api . saveProgress \\( {   videoId ,   position   } \\) ,  5     } \\)  6  7     // Save position every 10 seconds  8     const   handleTimeUpdate   =   useCallback \\(  9         debounce \\( \\( currentTime \\)   = >   { 10             saveProgress . mutate \\( {   position :   currentTime   } \\) 11         } ,   10_000 \\) , 12         [ videoId ] 13     \\) 14 15     // Restore position on load 16     const   {   data :   savedProgress   }   =   useQuery \\( { 17         queryKey :   [ 'progress' ,   videoId ] , 18         queryFn :   \\( \\)   = >   api . getProgress \\( videoId \\) , 19     } \\) 20 21     return   {   handleTimeUpdate ,   startPosition :   savedProgress ? . position   ? ?   0   } 22 } 23 24 // Hover preview with delay 25 const   ContentCard   =   \\( {   content   } \\)   = >   { 26     const   [ showPreview ,   setShowPreview ]   =   useState \\( false \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 37/42.",
    hints: [
      "Consider the core principles and trade-offs of Design a Netflix-style video streaming frontend. n   Answer Requirements: Content discovery \\(browse, search, categories\\) Video playback with adaptive streaming \\(HLS/DASH\\) Continue watching \\(resume from last position\\) Hover preview \\(autoplay short clip on hover\\) Profiles \\(multiple users per account\\) Download for offline \\(PWA or native app only\\) Performance priorities: Content grid: virtualized rows \\(each row is lazy-loaded\\) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate \\(auto quality switch\\) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load  1 // Continue watching progress persistence  2 const   useVideoProgress   =   \\( videoId \\)   = >   {  3     const   saveProgress   =   useMutation \\( {  4         mutationFn :   \\( {   position   } \\)   = >   api . saveProgress \\( {   videoId ,   position   } \\) ,  5     } \\)  6  7     // Save position every 10 seconds  8     const   handleTimeUpdate   =   useCallback \\(  9         debounce \\( \\( currentTime \\)   = >   { 10             saveProgress . mutate \\( {   position :   currentTime   } \\) 11         } ,   10_000 \\) , 12         [ videoId ] 13     \\) 14 15     // Restore position on load 16     const   {   data :   savedProgress   }   =   useQuery \\( { 17         queryKey :   [ 'progress' ,   videoId ] , 18         queryFn :   \\( \\)   = >   api . getProgress \\( videoId \\) , 19     } \\) 20 21     return   {   handleTimeUpdate ,   startPosition :   savedProgress ? . position   ? ?   0   } 22 } 23 24 // Hover preview with delay 25 const   ContentCard   =   \\( {   content   } \\)   = >   { 26     const   [ showPreview ,   setShowPreview ]   =   useState \\( false \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 37/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-handle-error-states-and-loading-states-in-a",
    title: "How do you handle error states and loading states in a large app? n   Answer Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens \\227 placeholder shapes matching content \\(best UX\\) Spinners \\227 for small areas or button loading Progress bars \\227 for uploads, long operations Shimmer animations \\227 animate skeleton for better perceived speed Error state types: Empty states \\227 no data \\(search with 0 results, empty cart\\) Network errors \\227 API failed, show retry Validation errors \\227 inline at form fields Boundary errors \\227 crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success  1 // Suspense + ErrorBoundary wrapper  2 const   AsyncBoundary   =   \\( {   children ,   fallback ,   errorFallback   } \\)   = >   \\(  3     < ErrorBoundary   fallback = { errorFallback   ? ?   < DefaultError   / > } >  4         < Suspense   fallback = { fallback   ? ?   < DefaultSkeleton   / > } >  5             { children }  6         < / Suspense >  7     < / ErrorBoundary >  8 \\)  9 10 // Usage: every async section wrapped 11 < AsyncBoundary   fallback = { < ProductGridSkeleton   / > } > 12     < ProductGrid   / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const   ProductCardSkeleton   =   \\( \\)   = >   \\( 17     < div   className = 'skeleton-card'   aria - busy = 'true'   aria - label = 'Loading product' > 18         < div   className = 'skeleton-img'   / >           { / *   animate   shimmer   * / } 19         < div   className = 'skeleton-line w-3/4'   / > 20         < div   className = 'skeleton-line w-1/2'   / > 21         < div   className = 'skeleton-btn'   / > 22     < / div > 23 \\) 24 25 // Empty state component Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 38/42",
    prompt: "How do you handle error states and loading states in a large app? n   Answer Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens \\227 placeholder shapes matching content \\(best UX\\) Spinners \\227 for small areas or button loading Progress bars \\227 for uploads, long operations Shimmer animations \\227 animate skeleton for better perceived speed Error state types: Empty states \\227 no data \\(search with 0 results, empty cart\\) Network errors \\227 API failed, show retry Validation errors \\227 inline at form fields Boundary errors \\227 crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success  1 // Suspense + ErrorBoundary wrapper  2 const   AsyncBoundary   =   \\( {   children ,   fallback ,   errorFallback   } \\)   = >   \\(  3     < ErrorBoundary   fallback = { errorFallback   ? ?   < DefaultError   / > } >  4         < Suspense   fallback = { fallback   ? ?   < DefaultSkeleton   / > } >  5             { children }  6         < / Suspense >  7     < / ErrorBoundary >  8 \\)  9 10 // Usage: every async section wrapped 11 < AsyncBoundary   fallback = { < ProductGridSkeleton   / > } > 12     < ProductGrid   / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const   ProductCardSkeleton   =   \\( \\)   = >   \\( 17     < div   className = 'skeleton-card'   aria - busy = 'true'   aria - label = 'Loading product' > 18         < div   className = 'skeleton-img'   / >           { / *   animate   shimmer   * / } 19         < div   className = 'skeleton-line w-3/4'   / > 20         < div   className = 'skeleton-line w-1/2'   / > 21         < div   className = 'skeleton-btn'   / > 22     < / div > 23 \\) 24 25 // Empty state component Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 38/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "26 const EmptyState = ( { icon , title , description , action } ) = > ( 27 < div className = 'empty-state' role = 'status' > 28 { icon } 29 < h3 > { title } < / h3 > 30 < p > { description } < / p > 31 { action & & < Button onClick = { action.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "26 const EmptyState = ( { icon , title , description , action } ) = > ( 27 < div className = 'empty-state' role = 'status' > 28 { icon } 29 < h3 > { title } < / h3 > 30 < p > { description } < / p > 31 { action & & < Button onClick = { action . onClick } > { action . label } < / Button > } 32 < / div > 33 ) 34 35 // Error with retry 36 const ErrorWithRetry = ( { onRetry , message } ) = > ( 37 < div role = 'alert' > 38 < p > { message ? ? 'Something went wrong. Please try again.' } < / p > 39 { onRetry & & < Button onClick = { onRetry } > Try again < / Button > } 40 < / div > 41 ) n Interview Tip: Every UI state needs design \\227 not just the success state. Design your empty states, error states, and loading skeletons in Figma before coding. Empty states are high-value UX moments (they can guide users to take action). Never show a blank white area when data is missing. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 38/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle error states and loading states in a large app? n   Answer Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens \\227 placeholder shapes matching content \\(best UX\\) Spinners \\227 for small areas or button loading Progress bars \\227 for uploads, long operations Shimmer animations \\227 animate skeleton for better perceived speed Error state types: Empty states \\227 no data \\(search with 0 results, empty cart\\) Network errors \\227 API failed, show retry Validation errors \\227 inline at form fields Boundary errors \\227 crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success  1 // Suspense + ErrorBoundary wrapper  2 const   AsyncBoundary   =   \\( {   children ,   fallback ,   errorFallback   } \\)   = >   \\(  3     < ErrorBoundary   fallback = { errorFallback   ? ?   < DefaultError   / > } >  4         < Suspense   fallback = { fallback   ? ?   < DefaultSkeleton   / > } >  5             { children }  6         < / Suspense >  7     < / ErrorBoundary >  8 \\)  9 10 // Usage: every async section wrapped 11 < AsyncBoundary   fallback = { < ProductGridSkeleton   / > } > 12     < ProductGrid   / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const   ProductCardSkeleton   =   \\( \\)   = >   \\( 17     < div   className = 'skeleton-card'   aria - busy = 'true'   aria - label = 'Loading product' > 18         < div   className = 'skeleton-img'   / >           { / *   animate   shimmer   * / } 19         < div   className = 'skeleton-line w-3/4'   / > 20         < div   className = 'skeleton-line w-1/2'   / > 21         < div   className = 'skeleton-btn'   / > 22     < / div > 23 \\) 24 25 // Empty state component Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 38/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle error states and loading states in a large app? n   Answer Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens \\227 placeholder shapes matching content \\(best UX\\) Spinners \\227 for small areas or button loading Progress bars \\227 for uploads, long operations Shimmer animations \\227 animate skeleton for better perceived speed Error state types: Empty states \\227 no data \\(search with 0 results, empty cart\\) Network errors \\227 API failed, show retry Validation errors \\227 inline at form fields Boundary errors \\227 crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success  1 // Suspense + ErrorBoundary wrapper  2 const   AsyncBoundary   =   \\( {   children ,   fallback ,   errorFallback   } \\)   = >   \\(  3     < ErrorBoundary   fallback = { errorFallback   ? ?   < DefaultError   / > } >  4         < Suspense   fallback = { fallback   ? ?   < DefaultSkeleton   / > } >  5             { children }  6         < / Suspense >  7     < / ErrorBoundary >  8 \\)  9 10 // Usage: every async section wrapped 11 < AsyncBoundary   fallback = { < ProductGridSkeleton   / > } > 12     < ProductGrid   / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const   ProductCardSkeleton   =   \\( \\)   = >   \\( 17     < div   className = 'skeleton-card'   aria - busy = 'true'   aria - label = 'Loading product' > 18         < div   className = 'skeleton-img'   / >           { / *   animate   shimmer   * / } 19         < div   className = 'skeleton-line w-3/4'   / > 20         < div   className = 'skeleton-line w-1/2'   / > 21         < div   className = 'skeleton-btn'   / > 22     < / div > 23 \\) 24 25 // Empty state component Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 38/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you handle error states and loading states in a large app? n   Answer Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens \\227 placeholder shapes matching content \\(best UX\\) Spinners \\227 for small areas or button loading Progress bars \\227 for uploads, long operations Shimmer animations \\227 animate skeleton for better perceived speed Error state types: Empty states \\227 no data \\(search with 0 results, empty cart\\) Network errors \\227 API failed, show retry Validation errors \\227 inline at form fields Boundary errors \\227 crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success  1 // Suspense + ErrorBoundary wrapper  2 const   AsyncBoundary   =   \\( {   children ,   fallback ,   errorFallback   } \\)   = >   \\(  3     < ErrorBoundary   fallback = { errorFallback   ? ?   < DefaultError   / > } >  4         < Suspense   fallback = { fallback   ? ?   < DefaultSkeleton   / > } >  5             { children }  6         < / Suspense >  7     < / ErrorBoundary >  8 \\)  9 10 // Usage: every async section wrapped 11 < AsyncBoundary   fallback = { < ProductGridSkeleton   / > } > 12     < ProductGrid   / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const   ProductCardSkeleton   =   \\( \\)   = >   \\( 17     < div   className = 'skeleton-card'   aria - busy = 'true'   aria - label = 'Loading product' > 18         < div   className = 'skeleton-img'   / >           { / *   animate   shimmer   * / } 19         < div   className = 'skeleton-line w-3/4'   / > 20         < div   className = 'skeleton-line w-1/2'   / > 21         < div   className = 'skeleton-btn'   / > 22     < / div > 23 \\) 24 25 // Empty state component Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 38/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-design-a-search-system-with-faceted-filterin",
    title: "How do you design a search system with faceted filtering? n   Answer Faceted search \\(Amazon/Flipkart style\\) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state \\227 share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params \\(shareable!\\) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar  1 import   algoliasearch   from   'algoliasearch'  2 import   {   InstantSearch ,   SearchBox ,   RefinementList ,  3                   Hits ,   Pagination ,   RangeInput   }   from   'react-instantsearch'  4  5 const   searchClient   =   algoliasearch \\( APP_ID ,   SEARCH_KEY \\)  6  7 const   SearchPage   =   \\( \\)   = >   \\(  8     < InstantSearch  9         searchClient = { searchClient } 10         indexName = 'products' 11         routing     // sync with URL automatically! 12     > 13         < div   className = 'search-layout' > 14             < aside   className = 'filters' > 15                 < RefinementList   attribute = 'category'   / > 16                 < RangeInput   attribute = 'price'   / > 17                 < RefinementList   attribute = 'brand'   searchable   / > 18                 < RefinementList   attribute = 'rating'   / > 19             < / aside > 20 21             < main > 22                 < SearchBox   placeholder = 'Search products...'   / > 23                 < Hits   hitComponent = { ProductCard }   / > 24                 < Pagination   / > 25             < / main > 26         < / div > 27     < / InstantSearch > 28 \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 39/42",
    prompt: "How do you design a search system with faceted filtering? n   Answer Faceted search \\(Amazon/Flipkart style\\) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state \\227 share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params \\(shareable!\\) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar  1 import   algoliasearch   from   'algoliasearch'  2 import   {   InstantSearch ,   SearchBox ,   RefinementList ,  3                   Hits ,   Pagination ,   RangeInput   }   from   'react-instantsearch'  4  5 const   searchClient   =   algoliasearch \\( APP_ID ,   SEARCH_KEY \\)  6  7 const   SearchPage   =   \\( \\)   = >   \\(  8     < InstantSearch  9         searchClient = { searchClient } 10         indexName = 'products' 11         routing     // sync with URL automatically! 12     > 13         < div   className = 'search-layout' > 14             < aside   className = 'filters' > 15                 < RefinementList   attribute = 'category'   / > 16                 < RangeInput   attribute = 'price'   / > 17                 < RefinementList   attribute = 'brand'   searchable   / > 18                 < RefinementList   attribute = 'rating'   / > 19             < / aside > 20 21             < main > 22                 < SearchBox   placeholder = 'Search products...'   / > 23                 < Hits   hitComponent = { ProductCard }   / > 24                 < Pagination   / > 25             < / main > 26         < / div > 27     < / InstantSearch > 28 \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 39/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "29 30 // DIY search with React Query 31 const useSearch = ( query , filters ) = > { 32 const debouncedQuery = useDebounce ( query , 300 ) 33 return useQuery ( { 34 queryKey : [ 'search' , debouncedQuery , filters ] , 35 queryFn : ( ) = > api.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "29 30 // DIY search with React Query 31 const useSearch = ( query , filters ) = > { 32 const debouncedQuery = useDebounce ( query , 300 ) 33 return useQuery ( { 34 queryKey : [ 'search' , debouncedQuery , filters ] , 35 queryFn : ( ) = > api . search ( { q : debouncedQuery , . . . filters } ) , 36 enabled : debouncedQuery . length > = 2 , 37 staleTime : 30_000 , // cache search results 30 sec 38 placeholderData : keepPreviousData , // no flash on filter change 39 } ) 40 } n Interview Tip: Use keepPreviousData (React Query v5) when filters change. Without it, results flash to a loading skeleton every time a filter is applied. With keepPreviousData, the previous results stay visible while new results load \\227 the filter application feels instant. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 39/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you design a search system with faceted filtering? n   Answer Faceted search \\(Amazon/Flipkart style\\) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state \\227 share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params \\(shareable!\\) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar  1 import   algoliasearch   from   'algoliasearch'  2 import   {   InstantSearch ,   SearchBox ,   RefinementList ,  3                   Hits ,   Pagination ,   RangeInput   }   from   'react-instantsearch'  4  5 const   searchClient   =   algoliasearch \\( APP_ID ,   SEARCH_KEY \\)  6  7 const   SearchPage   =   \\( \\)   = >   \\(  8     < InstantSearch  9         searchClient = { searchClient } 10         indexName = 'products' 11         routing     // sync with URL automatically! 12     > 13         < div   className = 'search-layout' > 14             < aside   className = 'filters' > 15                 < RefinementList   attribute = 'category'   / > 16                 < RangeInput   attribute = 'price'   / > 17                 < RefinementList   attribute = 'brand'   searchable   / > 18                 < RefinementList   attribute = 'rating'   / > 19             < / aside > 20 21             < main > 22                 < SearchBox   placeholder = 'Search products...'   / > 23                 < Hits   hitComponent = { ProductCard }   / > 24                 < Pagination   / > 25             < / main > 26         < / div > 27     < / InstantSearch > 28 \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 39/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you design a search system with faceted filtering? n   Answer Faceted search \\(Amazon/Flipkart style\\) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state \\227 share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params \\(shareable!\\) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar  1 import   algoliasearch   from   'algoliasearch'  2 import   {   InstantSearch ,   SearchBox ,   RefinementList ,  3                   Hits ,   Pagination ,   RangeInput   }   from   'react-instantsearch'  4  5 const   searchClient   =   algoliasearch \\( APP_ID ,   SEARCH_KEY \\)  6  7 const   SearchPage   =   \\( \\)   = >   \\(  8     < InstantSearch  9         searchClient = { searchClient } 10         indexName = 'products' 11         routing     // sync with URL automatically! 12     > 13         < div   className = 'search-layout' > 14             < aside   className = 'filters' > 15                 < RefinementList   attribute = 'category'   / > 16                 < RangeInput   attribute = 'price'   / > 17                 < RefinementList   attribute = 'brand'   searchable   / > 18                 < RefinementList   attribute = 'rating'   / > 19             < / aside > 20 21             < main > 22                 < SearchBox   placeholder = 'Search products...'   / > 23                 < Hits   hitComponent = { ProductCard }   / > 24                 < Pagination   / > 25             < / main > 26         < / div > 27     < / InstantSearch > 28 \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 39/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you design a search system with faceted filtering? n   Answer Faceted search \\(Amazon/Flipkart style\\) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state \\227 share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params \\(shareable!\\) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar  1 import   algoliasearch   from   'algoliasearch'  2 import   {   InstantSearch ,   SearchBox ,   RefinementList ,  3                   Hits ,   Pagination ,   RangeInput   }   from   'react-instantsearch'  4  5 const   searchClient   =   algoliasearch \\( APP_ID ,   SEARCH_KEY \\)  6  7 const   SearchPage   =   \\( \\)   = >   \\(  8     < InstantSearch  9         searchClient = { searchClient } 10         indexName = 'products' 11         routing     // sync with URL automatically! 12     > 13         < div   className = 'search-layout' > 14             < aside   className = 'filters' > 15                 < RefinementList   attribute = 'category'   / > 16                 < RangeInput   attribute = 'price'   / > 17                 < RefinementList   attribute = 'brand'   searchable   / > 18                 < RefinementList   attribute = 'rating'   / > 19             < / aside > 20 21             < main > 22                 < SearchBox   placeholder = 'Search products...'   / > 23                 < Hits   hitComponent = { ProductCard }   / > 24                 < Pagination   / > 25             < / main > 26         < / div > 27     < / InstantSearch > 28 \\) Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 39/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "system_design-how-do-you-approach-frontend-performance-auditing-n-ans",
    title: "How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42",
    prompt: "How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "25 // 1. Start profiling 26 // 2. Interact with the page 27 // 3. Stop profiling 28 // 4. Look for components with high self-time 29 30 // Long task detection 31 const observer = new PerformanceObserver ( ( list ) = > { 32 list . getEntries ( ) . forEach ( entry = > { 33 if ( entry . duration > 50 ) { // > 50ms = long task (hurts INP) 34 console . warn ( 'Long task:' , entry . duration , entry ) 35 } 36 } ) 37 } ) 38 observer . observe ( { entryTypes : [ 'longtask' ] } ) n Interview Tip: Start every performance audit with Lighthouse in incognito mode on the deployed production URL \\227 not localhost. Localhost removes network latency and compression, giving artificially high scores. Always test on a realistic device (Chrome DevTools > Device Toolbar > Mid-tier mobile). Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 41/42 Frontend System Design \\227 Done! n All 50 Q&A with real React code, patterns & production tips n SAVE \\227 your FE System Design interview bible nn REPOST \\227 help your dev network n COMMENT 'FSD' \\227 get full PDF n FOLLOW Kaushal Singh \\227 daily prep Kaushal Singh Full-Stack Dev | MERN + React Native | Kanmotech Pvt. Ltd. 1M+ Impressions | Frontend \\177 React \\177 System Design Comment FSD for full PDF | Follow for more! Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 42/42",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you approach frontend performance auditing? n   Answer A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse \\227 overall score, CWV, opportunities WebPageTest \\227 real-device testing, waterfall view Chrome DevTools Performance tab \\227 frame-by-frame analysis React DevTools Profiler \\227 component render times Bundle Analyzer \\(vite-bundle-visualizer\\) \\227 what is in your bundle? Audit process \\(in order\\): 1. Lighthouse audit on production \\(incognito mode\\) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks \\(>50ms\\) \\227 break them up 5. Bundle analysis \\227 find large dependencies to code-split Common wins \\(90th percentile\\): Add preload for LCP image \\227 +0.5-1s LCP Code split routes \\227 -40-60% initial bundle Image optimization \\(WebP + srcset\\) \\227 -30-50% image bytes Remove unused CSS \\227 trim Tailwind properly defer/async for non-critical scripts  1 // Bundle analysis: vite-bundle-visualizer  2 // npx vite-bundle-visualizer  3 // Shows treemap of all modules and their sizes  4  5 // Find and eliminate large imports:  6 // moment.js: 300KB  \\256  replace with date-fns \\(tree-shakeable\\)  7 // lodash: 70KB  \\256  use lodash-es with tree shaking  8 // import { debounce } from 'lodash-es'  // only imports debounce  9 10 // Measure real user performance 11 import   {   onCLS ,   onINP ,   onLCP ,   onFCP ,   onTTFB   }   from   'web-vitals' 12 const   reportToAnalytics   =   \\( metric \\)   = >   { 13     gtag \\( 'event' ,   metric . name ,   { 14         value :   Math . round \\( metric . name   = = =   'CLS'   ?   metric . value   *   1000   :   metric . value \\) , 15         event_category :   'Web Vitals' , 16         non_interaction :   true 17     } \\) 18 } 19 onCLS \\( reportToAnalytics \\) 20 onINP \\( reportToAnalytics \\) 21 onLCP \\( reportToAnalytics \\) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler: Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 41/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  }
];
