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
        text: "Controlled components cannot be modified by user keystrokes; uncontrolled components accept user input.",
        isCorrect: false,
        explanation: "Both accept user input; controlled components update state via onChange handlers on every keystroke."
      },
      {
        id: "B",
        text: "Controlled components are only used in Next.js Server Components; uncontrolled components are Client Components.",
        isCorrect: false,
        explanation: "The controlled vs uncontrolled pattern is a fundamental client-side React form design concept, independent of Next.js."
      },
      {
        id: "C",
        text: "Controlled components require Redux or MobX; uncontrolled components use local useState.",
        isCorrect: false,
        explanation: "Controlled components simply bind to any React state (like useState), not necessarily external global stores."
      },
      {
        id: "D",
        text: "Controlled components have their value driven by React state via value and onChange, while uncontrolled components let the DOM manage state via ref.",
        isCorrect: true,
        explanation: "Correct. Controlled components treat React state as the single source of truth; uncontrolled inputs maintain internal DOM value accessed via refs."
      }
    ],
    correctAnswer: "D",
    explanation: "The difference between controlled and uncontrolled components lies in how they manage and update their state. Controlled components are components where the state is controlled by React. The component receives its current value and updates it through props. It also triggers a callback function when the value changes. This means that the component doesn't store its own internal state. Instead, the parent component manages and passes the value down to the controlled component. Uncontrolled components, on the other hand, manage their own state internally using refs or other methods. They store and update their state independently, without relying on props or callbacks. The parent component has less control over the state of uncontrolled components. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between controlled and uncontrolled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between controlled and uncontrolled components?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Mutable internal variables that a child component can directly modify and write back to its parent.",
        isCorrect: false,
        explanation: "Props are strictly read-only in the child; modifying props.foo = 1 violates React's unidirectional data flow."
      },
      {
        id: "B",
        text: "Immutable inputs passed from a parent component to a child component to customize its rendering and behavior.",
        isCorrect: true,
        explanation: "Correct. Props (short for properties) are read-only inputs passed down the component hierarchy, preserving unidirectional data flow."
      },
      {
        id: "C",
        text: "Global browser cookies automatically synchronized across all open browser tabs.",
        isCorrect: false,
        explanation: "Props are in-memory React component parameters passed through JSX attributes, unrelated to browser cookies."
      },
      {
        id: "D",
        text: "Private component state variables initialized with the useProps hook.",
        isCorrect: false,
        explanation: "There is no useProps hook; props are received directly as arguments to functional components."
      }
    ],
    correctAnswer: "B",
    explanation: "Props are data that is passed to the component from the parent. Props are read-only and cannot be changed. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are props in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A centralized store architecture (e.g. Redux, Zustand, MobX) that decouples shared state from UI component hierarchies and avoids deep prop drilling.",
        isCorrect: true,
        explanation: "Correct. State management libraries provide global stores, action dispatching, and selective subscriptions across distant components."
      },
      {
        id: "B",
        text: "A native hardware driver that manages computer RAM allocation for browser processes.",
        isCorrect: false,
        explanation: "State managers are JavaScript application-level libraries operating in userland code."
      },
      {
        id: "C",
        text: "A browser extension that imperatively rewrites CSS style rules in the DOM at runtime.",
        isCorrect: false,
        explanation: "State managers handle application data and business logic, not CSS stylesheets."
      },
      {
        id: "D",
        text: "A database migration tool used strictly on SQL servers to alter table schemas.",
        isCorrect: false,
        explanation: "State managers manage in-memory client state in web applications, not relational database schema migrations."
      }
    ],
    correctAnswer: "A",
    explanation: "State manager is a tool or library that helps manage the state of an application. It provides a centralized store or container for storing and managing data that can be accessed and updated by different components in the application. A state manager solves several problems. Firstly, it is a good practice to separate data and the logic related to it from components. Secondly, when using local state and passing it between components, the code can become convoluted due to the potential for deep nesting of components. By having a global store, we can access and modify data from any component. Alongside React Context, Redux or MobX are commonly used as state management libraries. Learn more Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a state manager and which ones have you worked with or know?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a state manager and which ones have you worked with or know?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Always hoist all state to the root <App> component and pass everything down via props to every child.",
        isCorrect: false,
        explanation: "Lifting all state to the root causes severe prop drilling and forces the entire app to re-render on trivial updates."
      },
      {
        id: "B",
        text: "Store all temporary text input keystrokes in global Redux, and store user authentication tokens in local component state.",
        isCorrect: false,
        explanation: "Storing ephemeral keystrokes globally causes unnecessary re-renders, while auth tokens need global availability across routes."
      },
      {
        id: "C",
        text: "Local state is deprecated in React 19 in favor of mandatory global SQLite client databases.",
        isCorrect: false,
        explanation: "Local state (useState, useReducer) remains the foundational primitive of React component architecture."
      },
      {
        id: "D",
        text: "Use local state for ephemeral UI state encapsulated in a single component (form inputs, toggles); use global state for data shared across multiple distant branches (auth, cart).",
        isCorrect: true,
        explanation: "Correct. Colocating state locally keeps components reusable and performant; lifting to global stores is reserved for truly cross-cutting shared data."
      }
    ],
    correctAnswer: "D",
    explanation: "Local state is recommended to be used in cases where it is only used within one component and there are no plans to pass it to other components. Local state is also used in a component representing an individual item in a list. However, if component decomposition involves nested components with data being passed down the hierarchy, it is better to use global state.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of In which cases can you use local state and when should you use global state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of In which cases can you use local state and when should you use global state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "The Singleton Factory pattern that compiles JSX into native WebGL shaders.",
        isCorrect: false,
        explanation: "Redux is a state management architecture, not a graphics rendering pipeline."
      },
      {
        id: "B",
        text: "The Active Record pattern where state objects save themselves directly to SQL databases.",
        isCorrect: false,
        explanation: "Active Record is an ORM database pattern, distinct from Redux's in-memory state tree."
      },
      {
        id: "C",
        text: "The Model-View-Controller (MVC) pattern with bidirectional two-way data binding.",
        isCorrect: false,
        explanation: "Redux rejects bidirectional MVC data binding in favor of strict unidirectional data flow."
      },
      {
        id: "D",
        text: "The Flux architecture pattern, characterized by unidirectional data flow, a single store, action dispatching, and pure reducers.",
        isCorrect: true,
        explanation: "Correct. Redux is a predictable state container based on the Flux architecture and functional programming concepts."
      }
    ],
    correctAnswer: "D",
    explanation: "Redux implements the Flux pattern, which is a predictable state management pattern for applications. It helps in managing the state of an application by introducing a unidirectional data flow and a centralized store for the application's state. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Which pattern does Redux implement?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Which pattern does Redux implement?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Wrap the component in `observer` and read the property directly from the observable store object (e.g. `store.myVariable`).",
        isCorrect: true,
        explanation: "Correct. In MobX, components wrapped with `observer` read observable properties directly via standard JavaScript dot-notation property access."
      },
      {
        id: "B",
        text: "Inject the variable into `window.localStorage` and read it synchronously via JSON parsing.",
        isCorrect: false,
        explanation: "MobX reads from in-memory observable store instances directly."
      },
      {
        id: "C",
        text: "Execute `store.selectVariableAsync('myVariable')` inside a `useEffect` on every render.",
        isCorrect: false,
        explanation: "MobX observable property reads are synchronous and direct, requiring no async selection methods."
      },
      {
        id: "D",
        text: "Dispatch an action `dispatch({ type: 'GET_VARIABLE' })` and wait for a callback.",
        isCorrect: false,
        explanation: "Getting data in MobX does not require dispatching actions; actions are for mutating state under strict mode."
      }
    ],
    correctAnswer: "A",
    explanation: "You can access a variable in the state by using the observable decorator to define the variable as observable. Here's an example: In this example, the myVariable is defined as an observable using the observable decorator. You can then access the variable using store.myVariable. Any changes made to myVariable will automatically trigger updates in dependent components or reactions. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access a variable in Mobx state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access a variable in Mobx state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "The process of passing props through intermediate components that do not need the data themselves, solely to deliver it to deeply nested children.",
        isCorrect: true,
        explanation: "Correct. Prop drilling occurs when intermediate layers act as mere conduits; it can be mitigated using Context, composition (children), or global state."
      },
      {
        id: "B",
        text: "A method for validating prop types at runtime using ESLint plugins.",
        isCorrect: false,
        explanation: "Prop validation is handled by PropTypes or TypeScript, not prop drilling."
      },
      {
        id: "C",
        text: "A performance optimization technique that preloads images into browser memory.",
        isCorrect: false,
        explanation: "Prop drilling is an architectural friction/anti-pattern, not an image preloading optimization."
      },
      {
        id: "D",
        text: "The automatic generation of TypeScript interfaces from backend database schemas.",
        isCorrect: false,
        explanation: "Prop drilling refers to React component prop propagation, not TypeScript schema generation."
      }
    ],
    correctAnswer: "A",
    explanation: "Props drilling refers to the process of passing props through multiple levels of nested components, even if some intermediate components do not directly use those props. This can lead to a complex and cumbersome code structure. In this example, the data prop is passed from the Parent component to ChildA, and then from ChildA to ChildB even though ChildA doesn't directly use the prop. This can become problematic when there are many levels of nesting or when the data needs to be accessed by components further down the component tree. It can make the code harder to maintain and understand. Props drilling can be mitigated by using other patterns like context or state management libraries like Redux or MobX. These approaches allow data to be accessed by components without the need for passing props through every intermediate component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is props drilling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is props drilling?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Faster First Contentful Paint (FCP), enhanced Search Engine Optimization (SEO) with indexable HTML, and better performance on low-power devices.",
        isCorrect: true,
        explanation: "Correct. SSR delivers ready-to-view HTML immediately, enabling search engines and users to see content without waiting for large JS bundles to execute."
      },
      {
        id: "B",
        text: "Completely eliminates the need for any client-side JavaScript or browser interaction.",
        isCorrect: false,
        explanation: "SSR still requires client JavaScript for hydration to make event handlers and state interactive."
      },
      {
        id: "C",
        text: "Reduces backend server CPU usage to zero because all rendering is offloaded to the user's GPU.",
        isCorrect: false,
        explanation: "SSR increases server CPU load because HTML must be dynamically rendered on the server for each request."
      },
      {
        id: "D",
        text: "Allows React components to run in browsers that have JavaScript completely disabled with full interactivity.",
        isCorrect: false,
        explanation: "While static HTML can be read without JS, rich client interactivity (onClick, state) requires JavaScript."
      }
    ],
    correctAnswer: "A",
    explanation: "Improved initial loading times: SSR allows the server to send a fully rendered HTML page to the client, reducing the amount of processing required on the client-side. This improves the initial loading times, as the user sees a complete page more quickly. SEO-friendly: Search engines can efficiently crawl and index the content of SSR pages because the fully rendered HTML is available in the initial response. This improves search engine visibility and helps with better search rankings. Accessibility: SSR ensures that the content is accessible to users who have JavaScript disabled or use assistive technologies. By generating HTML on the server, SSR provides a reliable and accessible user experience for all users. Performance in low-bandwidth environments: SSR reduces the amount of data needed to be downloaded by the client, making it beneficial for users in low-bandwidth or high-latency environments. This is particularly important for mobile users or users with slower internet connections. While SSR offers these benefits, it's important to note that it may introduce more server load and maintenance complexity compared to client-side rendering methods. Careful consideration should be given to factors such as caching, scalability, and server-side rendering performance optimizations.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of using SSR?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of using SSR?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "system_design-explain-conditional-rendering-in-react",
    title: "Explain conditional rendering in React.",
    prompt: "Explain conditional rendering in React., explain the behavior and mechanism.",
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
        text: "Conditionally injecting CSS `@media` query stylesheets into the HTML document head at runtime.",
        isCorrect: false,
        explanation: "Media queries handle responsive CSS design, whereas conditional rendering controls which React component tree elements are mounted/rendered."
      },
      {
        id: "B",
        text: "Rendering different JSX elements or components based on JavaScript expressions, such as ternary operators (`condition ? <A /> : <B />`), logical `&&`, or `if/return` statements.",
        isCorrect: true,
        explanation: "Correct. Conditional rendering in React works the same way conditions work in JavaScript\u2014using control flow operators to determine what JSX to return."
      },
      {
        id: "C",
        text: "Toggling DOM elements strictly with `v-if` directive attributes.",
        isCorrect: false,
        explanation: "`v-if` is Vue.js syntax; React uses standard JavaScript expressions for conditional rendering."
      },
      {
        id: "D",
        text: "Spawning background Web Workers only when a user clicks a button.",
        isCorrect: false,
        explanation: "Web Workers manage multi-threading, not React component conditional rendering."
      }
    ],
    correctAnswer: "B",
    explanation: "React Architecture & Advanced Concepts",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain conditional rendering in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain conditional rendering in React.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "It completely replaces backend databases and web servers with client-side code.",
        isCorrect: false,
        explanation: "React is a frontend UI library; web applications still require backend services for persistent storage and business logic."
      },
      {
        id: "B",
        text: "It compiles JavaScript directly into binary machine code that executes in the GPU without a browser.",
        isCorrect: false,
        explanation: "React executes in JavaScript engines (V8, JavaScriptCore) within browsers or runtimes like Node.js."
      },
      {
        id: "C",
        text: "It guarantees 0ms latency for all external HTTP network requests.",
        isCorrect: false,
        explanation: "React cannot alter physical network transmission speeds or eliminate network latency."
      },
      {
        id: "D",
        text: "Reusable component-based architecture, efficient Virtual DOM diffing, rich open-source ecosystem, predictable unidirectional data flow, and versatile cross-platform support (React Native, SSR).",
        isCorrect: true,
        explanation: "Correct. React's major benefits are modular component reusability, virtual DOM diffing, unidirectional data flow, and strong ecosystem support."
      }
    ],
    correctAnswer: "D",
    explanation: "MVC is generally abbreviated as Model View Controller. Use of Virtual DOM to improve efficiency: React uses virtual DOM to render the view. As the name suggests, virtual DOM is a virtual representation of the real DOM. Each time the data changes in a react app, a new virtual DOM gets created. Creating a virtual DOM is much faster than rendering the UI inside the browser. Therefore, with the use of virtual DOM, the efficiency of the app improves. Gentle learning curve: React has a gentle learning curve when compared to frameworks like Angular. Anyone with little knowledge of javascript can start building web applications using React. SEO friendly: React allows developers to develop engaging user interfaces that can be easily navigated in various search engines. It also allows server-side rendering, which boosts the SEO of an app. Reusable components: React uses component-based architecture for developing applications. Components are independent and reusable bits of code. These components can be shared across various applications having similar functionality. The re-use of components increases the pace of development. Huge ecosystem of libraries to choose from: React provides you with the freedom to choose the tools, libraries, and architecture for developing an application based on your requirement.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of using React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of using React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
    codeSnippet: "import React, { Component } from react;\nclass AppDemo extends Component {\nrender() {\n  return (\n    <Router>\n      <div className=\"AppDemo\">\n      <ul>\n        <li>\n          <NavLink to=\"/\"  activeStyle={{ color:'blue' }}>Home</NavLink>\n        </li>\n        <li>\n          <NavLink to=\"/about\"  activeStyle={{ color:'blue' }}>About\n </NavLink>\n        </li>\n </ul>\n             <Route path=\"/about/:aboutId\" component={AboutPage} />\n             <Route path=\"/about\" component={AboutPage} />\n             <Route path=\"/\" component={HomePage} />\n      </div>\n    </Router>\n  );\n}\n}\nexport default AppDemo;\n\nexport default function HomePage(props) {\n const handleClick = (data) => {\n  props.history.push('/about/' + data);\n }\nreturn (\n  <div>\n    <button onClick={() => handleClick('DemoButton')}>To About</button>\n  </div>\n)\n}\n\nexport default function AboutPage(props) {\nif(!props.match.params.aboutId) {\n    return <div>No Data Yet</div>\n}\nreturn (\n  <div>\n    {`Data obtained from HomePage is ${props.match.params.aboutId}`}\n  </div>\n)\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Send data between siblings using local Bluetooth peer connections.",
        isCorrect: false,
        explanation: "Routing and in-memory state management handle data sharing in web apps, not Bluetooth."
      },
      {
        id: "B",
        text: "Directly access the sibling's private state using `siblingComponent.state`.",
        isCorrect: false,
        explanation: "Components cannot access or read private state from sibling components directly."
      },
      {
        id: "C",
        text: "Navigate with route parameters (`history.push('/route/' + data)`) or query parameters, which the sibling route component reads from `params`.",
        isCorrect: true,
        explanation: "Correct. React Router allows sibling components mapped to distinct routes to share data via URL params, search params, or router state."
      },
      {
        id: "D",
        text: "Mutate global `window.data` properties without subscription or state updates.",
        isCorrect: false,
        explanation: "Global window mutations are non-reactive and do not trigger component re-renders."
      }
    ],
    correctAnswer: "C",
    explanation: "Passing data between sibling components of React is possible using React Router with the help of history.push and match.params. In the code given below, we have a Parent component AppDemo.js and have two Child Components HomePage and AboutPage. Everything is kept inside a Router by using React-router Route. It is also having a route for /about/{params} where we will pass the data. The HomePage is a functional component with a button. On button click, we are using props.history.push(, /about/, + data) to programmatically navigate into /about/data. Also, the functional component AboutPage will obtain the data passed by props.match.params.aboutId. After button click in the HomePage the page will look like below:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass data between sibling components using React router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass data between sibling components using React router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
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
        text: "A browser extension that imperatively injects jQuery plugins into web pages.",
        isCorrect: false,
        explanation: "React is a declarative UI library, not a browser extension or jQuery wrapper."
      },
      {
        id: "B",
        text: "A declarative, component-based JavaScript library for building user interfaces, featuring a Virtual DOM, unidirectional data flow, and JSX syntax.",
        isCorrect: true,
        explanation: "Correct. React simplifies UI development through composable components, efficient diffing via the Virtual DOM, and unidirectional data flow."
      },
      {
        id: "C",
        text: "A full-stack MVC framework with built-in ORM, PostgreSQL database drivers, and server clustering tools.",
        isCorrect: false,
        explanation: "React is a frontend UI view library, not a monolithic backend MVC framework."
      },
      {
        id: "D",
        text: "A compiler that converts CSS files into WebAssembly graphics pipelines.",
        isCorrect: false,
        explanation: "React manages UI components and state reconciliation in JavaScript/TypeScript."
      }
    ],
    correctAnswer: "B",
    explanation: "React is a JavaScript library developed by Facebook for creating user interfaces, particularly in single-page applications. It enables the use of reusable components that manage their own state. Key advantages include a component-driven architecture, optimized updates through the virtual DOM, a declarative approach for better readability, and robust community backing. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React, and what are its main features?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React, and what are its main features?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Props only accept string values, while state only accepts numbers.",
        isCorrect: false,
        explanation: "Both accept any JavaScript data type (objects, arrays, functions, primitives)."
      },
      {
        id: "B",
        text: "Props are external, read-only parameters passed down from parents to configure a child; State is internal, mutable data managed within the component that triggers re-renders on change.",
        isCorrect: true,
        explanation: "Correct. Props flow downwards and are immutable to the child; state is private and controlled locally by the component."
      },
      {
        id: "C",
        text: "Props are stored on the backend server, while state exists only in the browser.",
        isCorrect: false,
        explanation: "Both props and state exist in client JavaScript memory during rendering."
      },
      {
        id: "D",
        text: "Props can be mutated directly by child components; state is strictly read-only and immutable everywhere.",
        isCorrect: false,
        explanation: "Child components must treat props as read-only; state is updated via setter functions (`setState`)."
      }
    ],
    correctAnswer: "B",
    explanation: "Props (short for properties) are inputs to React components that allow you to pass data from a parent component to a child component. They are immutable and are used to configure a component. In contrast, state is internal to a component and can change over time, typically due to user interactions or other events. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are props in React? How are they different from state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are props in React? How are they different from state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Controlled components are only used in backend Node.js scripts.",
        isCorrect: false,
        explanation: "Both controlled and uncontrolled form inputs are frontend browser UI patterns."
      },
      {
        id: "B",
        text: "Controlled components cannot validate user input; uncontrolled components validate automatically.",
        isCorrect: false,
        explanation: "Controlled components make real-time input validation straightforward because value changes flow through state setters."
      },
      {
        id: "C",
        text: "Uncontrolled components cannot be cleared or reset upon form submission.",
        isCorrect: false,
        explanation: "Uncontrolled inputs can be reset using standard HTML form reset or by updating `ref.current.value`."
      },
      {
        id: "D",
        text: "In controlled components, input data is driven by React state via `value` and `onChange`; in uncontrolled components, the DOM maintains input state, accessed via `ref`.",
        isCorrect: true,
        explanation: "Correct. Controlled components make React state the single source of truth for form values; uncontrolled components rely on native DOM state."
      }
    ],
    correctAnswer: "D",
    explanation: "In controlled components, form data is managed through the component's state, making it the definitive source of truth. Input value changes are handled by event handlers. In uncontrolled components, the form state is managed internally and accessed via refs. Controlled components provide more control and are easier to test, while uncontrolled components are simpler for basic use cases. Example of a controlled component: Example of an uncontrolled component: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Controlled and Uncontrolled React components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Controlled and Uncontrolled React components?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Move the shared state to the closest common parent component and pass the state value and updater callback down to children via props.",
        isCorrect: true,
        explanation: "Correct. Lifting state up establishes a single source of truth in the common ancestor when multiple sibling components need to reflect or modify the same data."
      },
      {
        id: "B",
        text: "Convert both children into class components that inherit from a shared base class.",
        isCorrect: false,
        explanation: "React favors composition and props over class inheritance for sharing state."
      },
      {
        id: "C",
        text: "Store the state directly on the global `window` object and force full page reloads.",
        isCorrect: false,
        explanation: "Mutating `window` bypasses React's declarative reactivity and full reloads ruin user experience."
      },
      {
        id: "D",
        text: "Duplicate the state in both child components and synchronize them using `setInterval` polling.",
        isCorrect: false,
        explanation: "Polling between duplicated states causes race conditions, inconsistent state, and performance degradation."
      }
    ],
    correctAnswer: "A",
    explanation: "Lifting state up in React involves moving the state from child components to their nearest common ancestor. This pattern is used to share state between components that don't have a direct parent-child relationship. By lifting state up, you can avoid prop drilling and simplify the management of shared data. In this example, the state is managed in the Parent component, and both child components access it via props.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How would you lift the state up in a React application, and why is it necessary?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How would you lift the state up in a React application, and why is it necessary?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-one-way-data-flow-of-react",
    title: "Explain one-way data flow of React",
    prompt: "Explain one-way data flow of React, explain the behavior and mechanism.",
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
        text: "Data flows bidirectionally with automatic two-way binding between child DOM inputs and parent state.",
        isCorrect: false,
        explanation: "React rejects automatic bidirectional data binding in favor of explicit unidirectional data flow."
      },
      {
        id: "B",
        text: "Data flows only upwards from children to parents, with parents receiving state via inheritance.",
        isCorrect: false,
        explanation: "Data flows downwards from parent to child via props."
      },
      {
        id: "C",
        text: "Data flows strictly downwards from parent to child via props; children trigger state updates by calling callback functions passed down from parents.",
        isCorrect: true,
        explanation: "Correct. Unidirectional data flow ensures that state has a clear owner and changes occur predictably through explicit events and props."
      },
      {
        id: "D",
        text: "Data flows exclusively through global cookies synchronized across browser tabs.",
        isCorrect: false,
        explanation: "Data flows through the component hierarchy via props and callbacks in memory."
      }
    ],
    correctAnswer: "C",
    explanation: "In React, one-way data flow means data moves from parent to child components through props. Parent to child: The parent passes data to the child State updates: To change data, the child calls a function passed down by the parent Example: This ensures data flows in one direction, making the app more predictable. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain one-way data flow of React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain one-way data flow of React.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-prop-drilling",
    title: "Explain prop drilling",
    prompt: "Explain prop drilling, explain the behavior and mechanism.",
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
        text: "Passing props through multiple intermediate layers of components that do not use the data themselves, solely to deliver it to a deeply nested descendant.",
        isCorrect: true,
        explanation: "Correct. Prop drilling creates maintenance overhead and tightly couples intermediate components; mitigated using Context, composition (children), or state stores."
      },
      {
        id: "B",
        text: "The automatic conversion of React props into SQL database columns.",
        isCorrect: false,
        explanation: "Prop drilling refers to React component tree hierarchy prop forwarding."
      },
      {
        id: "C",
        text: "A method for styling components with CSS grid drilling selectors.",
        isCorrect: false,
        explanation: "Prop drilling describes prop passing in component hierarchies, unrelated to CSS selectors."
      },
      {
        id: "D",
        text: "A tool that automatically parses and validates prop types at compile time.",
        isCorrect: false,
        explanation: "Prop drilling is an architectural design friction, not a validation tool."
      }
    ],
    correctAnswer: "A",
    explanation: "Prop drilling is when you pass data from a parent component to a deeply nested child component through props, even if intermediate components don't use it. Example: In this example, data is passed through multiple components, even though only the Child component uses it. Prop drilling is acceptable for small applications where the component hierarchy is shallow. When global state is needed to be accessed in deeper levels of the app, using context and/or external state managers might be better.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain prop drilling.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain prop drilling.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
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
        text: "A browser extension that styles buttons with funny fonts.",
        isCorrect: false,
        explanation: "Jest is an automated test framework, not a CSS styling extension."
      },
      {
        id: "B",
        text: "A database ORM that replaces Prisma and TypeORM.",
        isCorrect: false,
        explanation: "Jest is a test runner, not a database ORM."
      },
      {
        id: "C",
        text: "A JavaScript test runner and assertion library that provides test suites (`describe`/`test`), assertions (`expect`), mocking (`jest.fn`/`jest.mock`), and code coverage.",
        isCorrect: true,
        explanation: "Correct. Jest is a comprehensive test framework widely used for executing unit and integration tests in Node.js and simulated browser environments (jsdom)."
      },
      {
        id: "D",
        text: "A compiler that converts React JSX into HTML email templates.",
        isCorrect: false,
        explanation: "Jest executes and asserts on test specifications."
      }
    ],
    correctAnswer: "C",
    explanation: "Jest is a JavaScript testing framework that provides a test runner, assertion library, and mocking support. It's commonly used for testing React applications due to its simplicity and integration with tools like React Testing Library.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Jest and how is it used for testing React applications?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Jest and how is it used for testing React applications?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Use Mock Service Worker (MSW) to intercept network requests at the network layer, or mock API modules/functions with `jest.mock()` / `vi.mock()` / `jest.fn()`.",
        isCorrect: true,
        explanation: "Correct. Mocking at the module or network layer (MSW) allows simulating API success and error responses without hitting real backend endpoints."
      },
      {
        id: "B",
        text: "Disable all network adapters on the development computer.",
        isCorrect: false,
        explanation: "Module mocking and MSW intercept requests in memory without disabling hardware adapters."
      },
      {
        id: "C",
        text: "Create a fake secondary internet service provider (ISP) on the local machine.",
        isCorrect: false,
        explanation: "Software mocking intercepts JavaScript module calls or HTTP requests in userland."
      },
      {
        id: "D",
        text: "Let tests make real mutating POST requests to production databases during test runs.",
        isCorrect: false,
        explanation: "Hitting real production databases during tests corrupts data and causes slow, fragile tests."
      }
    ],
    correctAnswer: "A",
    explanation: "To mock API calls in React component tests, you can use Jest's jest.mock to mock the API module and return mock data. This allows you to simulate API responses without making actual network requests. Example: In this example, the fetchData function from the api module is mocked to return 'mocked data' for testing purposes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you mock API calls in React component tests?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you mock API calls in React component tests?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-explain-the-mvc-architecture",
    title: "Explain the MVC Architecture",
    prompt: "Explain the MVC Architecture, explain the behavior and mechanism.",
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
        text: "A compiler pipeline that translates Python code into React JSX.",
        isCorrect: false,
        explanation: "MVC is a software design pattern, unrelated to Python-to-JSX compilation."
      },
      {
        id: "B",
        text: "An architectural pattern separating concerns into Model (data/business rules), View (UI representation), and Controller (handles user input to update model/view).",
        isCorrect: true,
        explanation: "Correct. Model-View-Controller (MVC) isolates data management, user presentation, and input processing into distinct responsibilities."
      },
      {
        id: "C",
        text: "A design pattern where all database queries, CSS styles, and event handlers are placed in a single file.",
        isCorrect: false,
        explanation: "MVC explicitly separates concerns rather than bundling everything into one file."
      },
      {
        id: "D",
        text: "A network protocol for transferring encrypted video files over WebSockets.",
        isCorrect: false,
        explanation: "MVC is a software architecture pattern, not a network video protocol."
      }
    ],
    correctAnswer: "B",
    explanation: "Model-View-Controller splits an app into three parts: Model holds data and business rules View renders the UI Controller handles input and updates the model or view",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the MVC Architecture.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the MVC Architecture.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "system_design-explain-the-difference-between-react-and-angular",
    title: "Explain the Difference Between React and Angular",
    prompt: "Explain the Difference Between React and Angular, explain the behavior and mechanism.",
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
        text: "React requires writing Java code; Angular requires writing Python code.",
        isCorrect: false,
        explanation: "React uses JavaScript/TypeScript; Angular uses TypeScript."
      },
      {
        id: "B",
        text: "React is a flexible UI library using a Virtual DOM, JSX, and unidirectional data flow; Angular is a full-fledged MVC framework using real DOM, TypeScript templates, and two-way binding.",
        isCorrect: true,
        explanation: "Correct. React provides the view layer and lets developers choose companion tools, while Angular is an opinionated, batteries-included framework."
      },
      {
        id: "C",
        text: "React is only for backend servers; Angular is only for mobile phones.",
        isCorrect: false,
        explanation: "Both are primary frontend web development technologies."
      },
      {
        id: "D",
        text: "There is no difference; React and Angular are exact copies of each other.",
        isCorrect: false,
        explanation: "They have fundamentally different architectures, paradigms, and ecosystem philosophies."
      }
    ],
    correctAnswer: "B",
    explanation: "React: A JavaScript library focused on UI Uses Virtual DOM and one-way data flow Simpler core and very modular Angular: A full framework Uses real DOM and two-way data binding Provides an opinionated architecture and more built-in features",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Difference Between React and Angular.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Difference Between React and Angular.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Read-only properties passed from parent to child components that configure the child's appearance and behavior, maintaining unidirectional data flow.",
        isCorrect: true,
        explanation: "Correct. Props are immutable inputs that allow parent components to parameterize and compose child UI elements cleanly."
      },
      {
        id: "B",
        text: "Mutable variables that a child can freely modify to update its parent's state directly.",
        isCorrect: false,
        explanation: "Props are strictly read-only in children; parents pass updater callbacks if children need to request changes."
      },
      {
        id: "C",
        text: "Server environment variables defined in `.env.local`.",
        isCorrect: false,
        explanation: "Props are runtime JavaScript component arguments, distinct from environment variables."
      },
      {
        id: "D",
        text: "Private component variables created using the `useProps` hook.",
        isCorrect: false,
        explanation: "Props are passed as arguments to function components, not created via a `useProps` hook."
      }
    ],
    correctAnswer: "A",
    explanation: "Props are objects passed from parent to child components. Access them with this.props in class components, or as function arguments in functional components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Props in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Props in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A performance optimization that speeds up CSS animation rendering by 200%.",
        isCorrect: false,
        explanation: "`dangerouslySetInnerHTML` injects raw HTML strings into the DOM."
      },
      {
        id: "B",
        text: "React's replacement for `innerHTML` to render raw HTML strings directly into a component; named 'dangerously' because unsanitized input exposes the app to XSS vulnerabilities.",
        isCorrect: true,
        explanation: "Correct. `dangerouslySetInnerHTML={{ __html: sanitizedHtml }}` lets you inject raw HTML, requiring thorough sanitization (e.g. DOMPurify) to prevent Cross-Site Scripting."
      },
      {
        id: "C",
        text: "A compiler flag that enables dangerous TypeScript compiler features.",
        isCorrect: false,
        explanation: "`dangerouslySetInnerHTML` is a standard JSX prop for raw HTML injection."
      },
      {
        id: "D",
        text: "A method that automatically deletes the client's hard drive if an error occurs.",
        isCorrect: false,
        explanation: "The name emphasizes XSS security risks, not local filesystem operations."
      }
    ],
    correctAnswer: "B",
    explanation: "dangerouslySetInnerHTML lets you set raw HTML inside a component. It bypasses React, s escaping, so use it only for trusted content because it can expose the app to XSS attacks.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Use of dangerouslySetInnerHTML in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Use of dangerouslySetInnerHTML in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Components that cannot be edited or modified by user typing.",
        isCorrect: false,
        explanation: "Controlled components accept typing, which updates state via `onChange` handlers on every character."
      },
      {
        id: "B",
        text: "Components that require Redux or MobX to function.",
        isCorrect: false,
        explanation: "Controlled components can bind to simple `useState` local state."
      },
      {
        id: "C",
        text: "Components that run exclusively on backend servers.",
        isCorrect: false,
        explanation: "Controlled components are standard client-side React form inputs."
      },
      {
        id: "D",
        text: "Form elements whose values are controlled and driven by React state via `value` and updated via `onChange` handlers, making React the single source of truth.",
        isCorrect: true,
        explanation: "Correct. Controlled components bind input values directly to React state, allowing immediate validation, formatting, and conditional handling."
      }
    ],
    correctAnswer: "D",
    explanation: "Controlled components use React state as the single source of truth for form inputs. Input values come from the state and are updated via onChange handlers.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Controlled Components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Controlled Components in React?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "A compiler that translates React JSX into HTML email templates.",
        isCorrect: false,
        explanation: "React-Redux manages application state, not email compilation."
      },
      {
        id: "B",
        text: "The official React UI bindings library for Redux, providing `<Provider>` and hooks (`useSelector`, `useDispatch`) to connect components to a Redux store.",
        isCorrect: true,
        explanation: "Correct. `react-redux` lets components subscribe to Redux store state and dispatch actions efficiently with optimized re-render selectors."
      },
      {
        id: "C",
        text: "A CSS stylesheet framework for styling buttons.",
        isCorrect: false,
        explanation: "React-Redux is a JavaScript state management binding library."
      },
      {
        id: "D",
        text: "A database management system that replaces PostgreSQL.",
        isCorrect: false,
        explanation: "React-Redux is a frontend state binding library, not a database."
      }
    ],
    correctAnswer: "B",
    explanation: "React-Redux connects Redux state management to React components. It simplifies sharing state across many components without passing props down many levels.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React-Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React-Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "HTML, CSS, WebGL, and SVG.",
        isCorrect: false,
        explanation: "These are browser rendering technologies."
      },
      {
        id: "B",
        text: "Store (single state tree), Actions (objects with `type` and payload), Reducers (pure functions computing next state), and Dispatch (triggers state updates).",
        isCorrect: true,
        explanation: "Correct. These core building blocks establish Redux's predictable unidirectional state container architecture."
      },
      {
        id: "C",
        text: "Headers, Footers, Sidebars, and Modals.",
        isCorrect: false,
        explanation: "These are UI layout components, not Redux architecture concepts."
      },
      {
        id: "D",
        text: "Client, Server, Database, and Router.",
        isCorrect: false,
        explanation: "These are full-stack system architecture layers, not Redux state primitives."
      }
    ],
    correctAnswer: "B",
    explanation: "Core Redux concepts: Store: Holds the entire app state. Actions: Plain objects describing state changes. Action creators: Functions that return actions. Reducers: Pure functions that update state based on actions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Core Components of React-Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Core Components of React-Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Multiple reducers cannot be combined in Redux.",
        isCorrect: false,
        explanation: "`combineReducers` is the standard mechanism for combining reducers."
      },
      {
        id: "B",
        text: "Use Redux's `combineReducers({ users: usersReducer, posts: postsReducer })` helper function to merge slice reducers into a single root reducer.",
        isCorrect: true,
        explanation: "Correct. `combineReducers` delegates state slices to corresponding reducer functions, assembling them into a single state tree object."
      },
      {
        id: "C",
        text: "Write a `while` loop that calls all reducers sequentially inside `render()`.",
        isCorrect: false,
        explanation: "Reducers are pure functions called by the Redux store on action dispatch, never in `render()`."
      },
      {
        id: "D",
        text: "Concatenate reducer files as plain text strings in a build script.",
        isCorrect: false,
        explanation: "Reducers are JavaScript functions composed at runtime using `combineReducers` or Redux Toolkit's `configureStore`."
      }
    ],
    correctAnswer: "B",
    explanation: "Use combineReducers to merge reducers into one root reducer. Example: import { combineReducers } from \"redux\";const rootReducer = combineReducers({ books: BooksReducer, activeBook: ActiveBook});",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Can We Combine Multiple Reducers in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Can We Combine Multiple Reducers in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A database query syntax for PostgreSQL tables.",
        isCorrect: false,
        explanation: "CORS governs browser HTTP cross-origin requests, not database queries."
      },
      {
        id: "B",
        text: "CORS is a browser security mechanism that restricts cross-origin HTTP requests; React frontend apps resolve CORS by configuring server headers (`Access-Control-Allow-Origin`) or dev server proxies.",
        isCorrect: true,
        explanation: "Correct. CORS is enforced by browsers when frontend origins differ from backend API origins; resolved by proper server headers or development proxy configuration."
      },
      {
        id: "C",
        text: "A React hook used exclusively for styling CSS flexbox layouts.",
        isCorrect: false,
        explanation: "CORS is a browser security networking standard, not a React CSS hook."
      },
      {
        id: "D",
        text: "A compiler error that occurs when a JSX tag is not closed properly.",
        isCorrect: false,
        explanation: "CORS is a network security policy enforced by browsers."
      }
    ],
    correctAnswer: "B",
    explanation: "Cross-Origin Resource Sharing allows the browser to request resources from a different domain. When frontend and backend run on different domains, configure the server and use libraries like axios or fetch on the client to handle cross-origin requests.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain CORS in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain CORS in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A compiler that translates React code into C++ binaries.",
        isCorrect: false,
        explanation: "Flux is an architectural design pattern for state management."
      },
      {
        id: "B",
        text: "A unidirectional data flow pattern where Views dispatch Actions through a central Dispatcher/Store to pure Reducers that compute new State, making state changes predictable.",
        isCorrect: true,
        explanation: "Correct. Flux/Redux enforces strict one-way flow (Action -> Reducer -> Store -> View), preventing the tangled mutations of bidirectional data binding."
      },
      {
        id: "C",
        text: "A bidirectional MVC architecture with two-way data binding on all inputs.",
        isCorrect: false,
        explanation: "Flux explicitly replaced bidirectional MVC data binding with strict unidirectional data flow."
      },
      {
        id: "D",
        text: "A database replication architecture that shards tables across SQL nodes.",
        isCorrect: false,
        explanation: "Flux is a client-side frontend application state architecture."
      }
    ],
    correctAnswer: "B",
    explanation: "Flux is a pattern with unidirectional data flow: actions dispatch to a store, the store updates state, and the view reacts. Redux follows this approach to make the state predictable and traceable.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Flux Architecture in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Flux Architecture in Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "A native hardware driver that manages computer RAM allocation for browser processes.",
        isCorrect: false,
        explanation: "Redux is a JavaScript library operating in userland code."
      },
      {
        id: "B",
        text: "A browser extension that imperatively rewrites CSS style rules in the DOM at runtime.",
        isCorrect: false,
        explanation: "Redux manages application data and state logic, not CSS stylesheets."
      },
      {
        id: "C",
        text: "A standalone predictable state container holding application state in a single store, connected to React via `react-redux` (`<Provider>`, `useSelector`, `useDispatch`).",
        isCorrect: true,
        explanation: "Correct. Redux manages state immutably through dispatched actions and pure reducers, while React-Redux connects component trees to the store."
      },
      {
        id: "D",
        text: "A database migration tool used strictly on SQL servers to alter table schemas.",
        isCorrect: false,
        explanation: "Redux manages in-memory client state in web applications."
      }
    ],
    correctAnswer: "C",
    explanation: "Redux stores global state in a single store and updates it via actions processed by reducers. React-Redux connects that store to React components so they can read state and dispatch actions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux, and How Does It Work with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux, and How Does It Work with React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-sibling-data-passing-with-react-router-url-params-locat",
    title: "Sibling Data Passing with React Router, URL Params, Location State, or Shared Store",
    prompt: "Sibling Data Passing with React Router, URL Params, Location State, or Shared Store, explain the behavior and mechanism.",
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
        text: "Mutate global `window.data` properties without state setters.",
        isCorrect: false,
        explanation: "Global window mutations are non-reactive and do not trigger component re-renders."
      },
      {
        id: "B",
        text: "Sibling routes cannot share data under any circumstances.",
        isCorrect: false,
        explanation: "Routing parameters and shared state stores provide clean data sharing between sibling routes."
      },
      {
        id: "C",
        text: "Directly read the sibling component's private state using `sibling.state`.",
        isCorrect: false,
        explanation: "Components cannot access private state from sibling components directly."
      },
      {
        id: "D",
        text: "Share data between sibling routes via URL path parameters (`/users/:id`), query search params (`?filter=active`), `location.state`, or a shared Context/store.",
        isCorrect: true,
        explanation: "Correct. URL parameters support bookmarkable/shareable state, `location.state` handles transient route data, and Context/stores manage shared app state."
      }
    ],
    correctAnswer: "D",
    explanation: "You can send data between sibling routes with URL params, query strings, or history state. For short, navigational data, use match.params or location.state. For complex shared state, use Context or a global store. URL param: props.history.push(/about/${id}); Location state: history.push('/about', { item }); Receiving side: const location = useLocation();const item = location.state?.item; When to choose what: URL params: good for bookmarking and deep linking. location.state: transient, not bookmarked, avoids polluting URL. Context or Redux: use for larger or persistent shared state across many routes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Sibling Data Passing with React Router, URL Params, Location State, or Shared Store.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Sibling Data Passing with React Router, URL Params, Location State, or Shared Store.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "system_design-strict-mode-development-checks-that-catch-risky-pattern",
    title: "Strict Mode, Development Checks That Catch Risky Patterns",
    prompt: "Strict Mode, Development Checks That Catch Risky Patterns, explain the behavior and mechanism.",
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
        text: "A security firewall that encrypts all JSX DOM nodes in the browser.",
        isCorrect: false,
        explanation: "StrictMode is a developer diagnostic tool, not an encryption firewall."
      },
      {
        id: "B",
        text: "`<React.StrictMode>` runs extra development-only checks: intentionally double-mounting components to detect missing effect cleanup, warning on deprecated lifecycles, legacy string refs, and `findDOMNode`.",
        isCorrect: true,
        explanation: "Correct. StrictMode helps developers identify impure rendering side effects and missing cleanups early in development, preparing code for concurrent React features."
      },
      {
        id: "C",
        text: "A production optimization flag that disables all error throwing to prevent website crashes.",
        isCorrect: false,
        explanation: "StrictMode is active only in development and intentionally surfaces warnings rather than suppressing them."
      },
      {
        id: "D",
        text: "A compiler setting that disallows using JavaScript outside of WebAssembly.",
        isCorrect: false,
        explanation: "StrictMode is a standard React runtime component."
      }
    ],
    correctAnswer: "B",
    explanation: "React.StrictMode runs extra checks in development: double invokes certain functions to reveal unsafe side effects, warns about deprecated lifecycle use, flags legacy string refs and findDOMNode usage, and highlights legacy context. Wrap parts of your app to get these diagnostics. Usage: ReactDOM.render( <React.StrictMode> <App /> </React.StrictMode>, root); Practical notes: StrictMode only affects development and can surface cleanup issues early. Expect effects to run twice in development under StrictMode; use idempotent effects and proper cleanup. Related Reading Cybersecurity Interview Questions Leetcode Alternatives System Design Interview Preparation Ansible Interview Questions LockedIn Selenium Interview Questions And Answers Git Interview Questions jQuery Interview Questions NodeJS Interview Questions ML Interview Questions Front End Developer Interview Questions DevOps Interview Questions And Answers Leetcode Roadmap Engineering Levels ASP.NET MVC Interview Questions Deep Learning Interview Questions Nail Coding Interviews with Interview Coder's Undetectable Coding Assistant, Get Your Dream Job Today Grinding LeetCode for months to pass one tech interview? There's a smarter way. Interview Coder is your AI-powered, undetectable coding assistant for coding interviews, completely undetectable and invisible to screen sharing. While your classmates stress over thousands of practice problems, you'll have an AI assistant that solves coding challenges in real-time during your actual interviews. Used by 87,000+ developers landing offers at FAANG, Big Tech, and top startups. Stop letting LeetCode anxiety kill your confidence. Join the thousands who've already taken the shortcut to their dream job. Download Interview Coder and turn your following coding interview into a guaranteed win. Related Reading Coding Interview Tools Jira Interview Questions Coding Interview Platforms Questions To Ask Interviewer Software Engineer Java Selenium Interview Questions Python Basic Interview Questions Best Job Boards For Software Engineers Leetcode Cheat Sheet Software Engineer Interview Prep Technical Interview Cheat Sheet Common C# Interview Questions RPA Interview Questions Angular 6 Interview Questions Common Algorithms For Interviews Download and try InterviewCoder for free today Get Started NowRelated Blogs Explore Our Similar Blogs View All blogs14 min",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Strict Mode, Development Checks That Catch Risky Patterns.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Strict Mode, Development Checks That Catch Risky Patterns.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "150-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
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
        text: "Components where form input state is managed directly by the browser DOM, and values are pulled on demand (e.g. on submit) using a `ref` or `defaultValue`.",
        isCorrect: true,
        explanation: "Correct. Uncontrolled components rely on native DOM state, reducing re-renders and simplifying integration with non-React libraries or file inputs."
      },
      {
        id: "B",
        text: "Components that cause fatal memory leaks in the browser.",
        isCorrect: false,
        explanation: "Uncontrolled components are standard HTML-like form controls in React."
      },
      {
        id: "C",
        text: "Components that are forbidden from using the `ref` attribute.",
        isCorrect: false,
        explanation: "Uncontrolled components frequently use `ref` to read input values upon form submission."
      },
      {
        id: "D",
        text: "Components that randomly change their state without user input.",
        isCorrect: false,
        explanation: "Uncontrolled refers to the DOM managing the input's internal value rather than React state."
      }
    ],
    correctAnswer: "A",
    explanation: "The Uncontrolled Components are the ones that store their own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML. In the below UserProfile component, the name input is accessed using ref. In most cases, it's recommend to use controlled components to implement forms.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are uncontrolled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are uncontrolled components?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Converting all child components into class components with multiple inheritance.",
        isCorrect: false,
        explanation: "React emphasizes composition and prop passing rather than class inheritance."
      },
      {
        id: "B",
        text: "Duplicating state across sibling components and synchronizing them with `setInterval`.",
        isCorrect: false,
        explanation: "Polling creates race conditions, performance issues, and out-of-sync bugs."
      },
      {
        id: "C",
        text: "Moving shared state to the closest common ancestor of the components that need it, passing the state and update callbacks down via props.",
        isCorrect: true,
        explanation: "Correct. Lifting state up establishes a single source of truth when multiple sibling components must reflect or modify the same data."
      },
      {
        id: "D",
        text: "Storing all state on the global `window` object.",
        isCorrect: false,
        explanation: "Global window mutation is unreactive and breaks React component encapsulation."
      }
    ],
    correctAnswer: "C",
    explanation: "When several components need to share the same changing data then it is recommended to lift the shared state up to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Lifting State Up in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Lifting State Up in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Mutate `window.__GLOBAL_PROPS__` before rendering the wrapped component.",
        isCorrect: false,
        explanation: "Global window mutation is fragile and violates component encapsulation."
      },
      {
        id: "B",
        text: "In the HOC render method, intercept incoming `this.props`, merge or manipulate additional props, and pass the combined props to `<WrappedComponent {...this.props} {...extraProps} />`.",
        isCorrect: true,
        explanation: "Correct. Props Proxy is a fundamental HOC pattern where the container intercepts and extends the props passed down to the wrapped component."
      },
      {
        id: "C",
        text: "Props cannot be modified or extended in Higher-Order Components.",
        isCorrect: false,
        explanation: "Extending and injecting props is the primary purpose of the Props Proxy pattern."
      },
      {
        id: "D",
        text: "Delete the `props` property from the JavaScript prototype.",
        isCorrect: false,
        explanation: "Mutating prototypes causes severe runtime bugs and breaks React internals."
      }
    ],
    correctAnswer: "B",
    explanation: "You can add/edit props passed to the component using props proxy pattern like this:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create props proxy for HOC component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create props proxy for HOC component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A database connection string stored in browser cookies.",
        isCorrect: false,
        explanation: "Context is an in-memory React component tree feature, not a database connection."
      },
      {
        id: "B",
        text: "A React feature (`createContext`, `useContext`, `<Provider>`) that allows passing data through the component tree without having to pass props down manually at every level.",
        isCorrect: true,
        explanation: "Correct. Context provides ambient data access for app-wide settings like themes, authenticated users, and localization preferences."
      },
      {
        id: "C",
        text: "A compiler plugin that translates JSX into TypeScript definitions.",
        isCorrect: false,
        explanation: "Context is a runtime React API."
      },
      {
        id: "D",
        text: "A browser API that measures CPU and memory performance.",
        isCorrect: false,
        explanation: "Context manages component data flow in React."
      }
    ],
    correctAnswer: "B",
    explanation: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. For example, authenticated user, locale preference, UI theme need to be accessed in the application by many components.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is context?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
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
        text: "A TypeScript type that only allows integer numbers.",
        isCorrect: false,
        explanation: "`children` can be any valid `ReactNode` (elements, strings, numbers, fragments, null)."
      },
      {
        id: "B",
        text: "An array of database records fetched from a backend API.",
        isCorrect: false,
        explanation: "`props.children` represents nested JSX nodes, not database records."
      },
      {
        id: "C",
        text: "A list of child processes spawned in the Node.js operating system.",
        isCorrect: false,
        explanation: "`children` in React refers to nested UI markup."
      },
      {
        id: "D",
        text: "A special prop (`props.children`) containing whatever elements, components, or text are placed between the opening and closing tags of a JSX component.",
        isCorrect: true,
        explanation: "Correct. `children` enables generic component composition and layout wrapping (e.g. `<Card><p>Content</p></Card>`), allowing components to accept arbitrary nested content."
      }
    ],
    correctAnswer: "D",
    explanation: "Children is a prop (this.props.children) that allow you to pass components as data to other components, just like any other prop you use. Component tree put between component's opening and closing tag will be passed to that component as children prop. There are a number of methods available in the React API to work with this prop. These include React.Children.map, React.Children.forEach, React.Children.count, React.Children.only, React.Children.toArray. A simple usage of children prop looks as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is children prop?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is children prop?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Calling `super(props)` in a class constructor initializes the base `React.Component` and allows accessing `this.props` within the constructor body.",
        isCorrect: true,
        explanation: "Correct. In ES6 subclasses, `this` cannot be accessed before calling `super()`; passing `props` to `super(props)` binds `this.props` during constructor execution."
      },
      {
        id: "B",
        text: "To enable multi-threading on the GPU for that component.",
        isCorrect: false,
        explanation: "`super(props)` simply initializes base class properties in JavaScript."
      },
      {
        id: "C",
        text: "To prevent the component from ever being unmounted from the DOM.",
        isCorrect: false,
        explanation: "`super(props)` has nothing to do with preventing unmounts."
      },
      {
        id: "D",
        text: "To connect the component to an external PostgreSQL database.",
        isCorrect: false,
        explanation: "`super(props)` is standard ES6 class inheritance setup in JavaScript."
      }
    ],
    correctAnswer: "A",
    explanation: "A child class constructor cannot make use of this reference until super() method has been called. The same applies for ES6 sub-classes as well. The main reason of passing props parameter to super() call is to access this.props in your child constructors. Passing props: Not passing props: The above code snippets reveals that this.props is different only within the constructor. It would be the same outside the constructor.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of using super constructor with props argument?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of using super constructor with props argument?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Backend Node.js middleware for logging HTTP 500 status codes.",
        isCorrect: false,
        explanation: "Error boundaries are client-side React UI components."
      },
      {
        id: "B",
        text: "Try/catch blocks that automatically catch asynchronous errors in `setTimeout` and event handlers.",
        isCorrect: false,
        explanation: "Error boundaries do NOT catch errors in event handlers or async timers; standard `try/catch` is used there."
      },
      {
        id: "C",
        text: "Class components that implement `static getDerivedStateFromError` and/or `componentDidCatch` to catch JavaScript errors in their child component tree and display a fallback UI.",
        isCorrect: true,
        explanation: "Correct. Error boundaries prevent unhandled exceptions in UI subtrees from unmounting the entire application, allowing graceful degradation."
      },
      {
        id: "D",
        text: "A built-in hook `useErrorBoundary()` introduced in React 16.",
        isCorrect: false,
        explanation: "Error boundaries currently still require class components implementing lifecycle methods."
      }
    ],
    correctAnswer: "C",
    explanation: "Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. A class component becomes an error boundary if it defines a new lifecycle method called componentDidCatch(error, info) or static getDerivedStateFromError(): After that use it as a regular component:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are error boundaries in React v16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are error boundaries in React v16?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
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
        text: "Invoked right before DOM mutations are committed, allowing the component to capture information from the DOM (e.g. scroll position) and pass it to `componentDidUpdate`.",
        isCorrect: true,
        explanation: "Correct. `getSnapshotBeforeUpdate(prevProps, prevState)` runs before the real DOM updates, passing its return value as the third argument to `componentDidUpdate`."
      },
      {
        id: "B",
        text: "Saves a backup of the component's state to disk storage.",
        isCorrect: false,
        explanation: "It passes ephemeral DOM metrics to `componentDidUpdate`."
      },
      {
        id: "C",
        text: "Cancels the render pass if state has not changed.",
        isCorrect: false,
        explanation: "`shouldComponentUpdate` determines whether to skip rendering, not `getSnapshotBeforeUpdate`."
      },
      {
        id: "D",
        text: "Takes a screenshot photograph of the user's face with the webcam.",
        isCorrect: false,
        explanation: "It captures DOM measurements (like scroll coordinates) in JavaScript, not webcam photos."
      }
    ],
    correctAnswer: "A",
    explanation: "The new getSnapshotBeforeUpdate() lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to componentDidUpdate(). This lifecycle method along with componentDidUpdate() covers all the use cases of componentWillUpdate().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of getSnapshotBeforeUpdate() lifecycle method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of getSnapshotBeforeUpdate() lifecycle method?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "`isMounted()` only works on backend Node.js servers.",
        isCorrect: false,
        explanation: "`isMounted()` was a client-side component method in early React."
      },
      {
        id: "B",
        text: "`isMounted()` causes the browser to delete all cookies.",
        isCorrect: false,
        explanation: "The issue is lingering async memory leaks, not cookie deletion."
      },
      {
        id: "C",
        text: "`isMounted()` is the recommended best practice for all async state updates in modern React.",
        isCorrect: false,
        explanation: "`isMounted()` is an official anti-pattern and was removed from React."
      },
      {
        id: "D",
        text: "`isMounted()` masked memory leaks instead of fixing them; the proper solution is cancelling async callbacks, aborting fetch requests (`AbortController`), or clearing timers on unmount.",
        isCorrect: true,
        explanation: "Correct. Checking `isMounted()` avoids the unmounted setState warning, but leaves subscriptions and memory leaks alive; proper cleanup in `componentWillUnmount`/`useEffect` is the real solution."
      }
    ],
    correctAnswer: "D",
    explanation: "The primary use case for isMounted() is to avoid calling setState() after a component has been unmounted, because it will emit a warning. Checking isMounted() before calling setState() does eliminate the warning, but it also defeats the purpose of the warning. Using isMounted() is a code smell because the only reason you would check is because you think you might be holding a reference after the component has unmounted. An optimal solution would be to find places where setState() might be called after a component has unmounted, and fix them. Such situations most commonly occur due to callbacks, when a component is waiting for some data and gets unmounted before the data arrives. Ideally, any callbacks should be canceled in componentWillUnmount(), prior to unmounting.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is isMounted() an anti-pattern and what is the proper solution?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is isMounted() an anti-pattern and what is the proper solution?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "`constructor` can only return boolean values, while `getInitialState` returns objects.",
        isCorrect: false,
        explanation: "Constructors instantiate classes; `getInitialState` returned the initial state object."
      },
      {
        id: "B",
        text: "Initialize state in `constructor(props)` when using ES6 classes (`this.state = ...`); `getInitialState()` was used with legacy `React.createClass` (deprecated).",
        isCorrect: true,
        explanation: "Correct. ES6 classes initialize state directly on the instance within `constructor()`, whereas `getInitialState()` was a lifecycle hook in the legacy `React.createClass` API."
      },
      {
        id: "C",
        text: "`constructor` runs on the server; `getInitialState` runs on the client.",
        isCorrect: false,
        explanation: "Both run during initial component instantiation."
      },
      {
        id: "D",
        text: "`getInitialState` is the standard Hook used in modern React 19.",
        isCorrect: false,
        explanation: "`getInitialState` was removed in React 16; modern functional components use `useState`."
      }
    ],
    correctAnswer: "B",
    explanation: "You should initialize state in the constructor when using ES6 classes, and getInitialState() method when using React.createClass(). Using ES6 classes: Using React.createClass(): Note: React.createClass() is deprecated and removed in React v16. Use plain JavaScript classes instead.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between constructor and getInitialState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between constructor and getInitialState?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    console.log(this.props); // { name: 'John'... }\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super();\n    console.log(this.props); // undefined\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`super(props)` is required for functional components with Hooks.",
        isCorrect: false,
        explanation: "Functional components do not have classes or constructors, so `super` does not apply."
      },
      {
        id: "B",
        text: "`super()` connects to PostgreSQL; `super(props)` connects to MongoDB.",
        isCorrect: false,
        explanation: "`super` is standard ES6 JavaScript class inheritance syntax."
      },
      {
        id: "C",
        text: "Passing `super(props)` allows accessing `this.props` inside the class constructor; calling `super()` leaves `this.props` undefined inside constructor (though available in render).",
        isCorrect: true,
        explanation: "Correct. In ES6 subclasses, `this` is initialized by `super()`; passing `props` allows React to assign `this.props` before the constructor body executes."
      },
      {
        id: "D",
        text: "Calling `super()` without props permanently disables all component rendering.",
        isCorrect: false,
        explanation: "`this.props` is assigned by React right after constructor execution anyway, so render still receives props."
      }
    ],
    correctAnswer: "C",
    explanation: "When you want to access this.props in constructor() then you should pass props to super() method. Using super(props): Using super(): Outside constructor() both will display same value for this.props.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between super() and super(props) in React using ES6 classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between super() and super(props) in React using ES6 classes?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "Attach a DOM `mutationObserver` to the browser `<body>` tag.",
        isCorrect: false,
        explanation: "State changes are internal JavaScript updates listened to via hooks or lifecycle methods, not DOM mutation observers."
      },
      {
        id: "B",
        text: "Poll `this.state` inside a synchronous `while(true)` loop on the main thread.",
        isCorrect: false,
        explanation: "Synchronous loops block the browser and prevent state updates from ever rendering."
      },
      {
        id: "C",
        text: "In functional components, use `useEffect(() => { ... }, [stateVar])`; in class components, use `componentDidUpdate(prevProps, prevState)` to compare previous and current state.",
        isCorrect: true,
        explanation: "Correct. `useEffect` with dependency arrays is the declarative way to react to state changes in modern React, replacing `componentDidUpdate` comparisons."
      },
      {
        id: "D",
        text: "State changes cannot be observed or reacted to in React.",
        isCorrect: false,
        explanation: "`useEffect` and `componentDidUpdate` provide direct state change observation."
      }
    ],
    correctAnswer: "C",
    explanation: "The componentDidUpdate lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed. Note: The previous releases of ReactJS also uses componentWillUpdate(object nextProps, object nextState) for state changes. It has been deprecated in latest releases.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to listen to state changes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to listen to state changes?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Convert the object into an XML string and parse it with regex.",
        isCorrect: false,
        explanation: "Standard JavaScript object spreading `...prev` handles object state updates cleanly."
      },
      {
        id: "B",
        text: "Delete the object from memory and force the user to refresh the page.",
        isCorrect: false,
        explanation: "State is updated smoothly in-memory using immutable spread operators."
      },
      {
        id: "C",
        text: "Use object spread `setState(prev => ({ ...prev, age: 42 }))`, `Object.assign({}, prev, { age: 42 })`, or immutable update libraries like Immer (`produce`).",
        isCorrect: true,
        explanation: "Correct. State objects must be updated immutably by creating a new object reference with updated fields, preserving unmodified properties."
      },
      {
        id: "D",
        text: "Directly mutate `state.user.age = 42` without calling `setState` or creating a new object.",
        isCorrect: false,
        explanation: "Direct mutation violates React immutability, breaking shallow comparisons and reactive re-renders."
      }
    ],
    correctAnswer: "C",
    explanation: "Calling setState() with an object to merge with state: Using Object.assign() to create a copy of the object: Using spread operator: Calling setState() with a function:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the possible ways of updating objects in state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the possible ways of updating objects in state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "HTTP requests are not allowed in React applications.",
        isCorrect: false,
        explanation: "Data fetching inside `useEffect` or dedicated libraries (React Query/SWR) is standard."
      },
      {
        id: "B",
        text: "Make network requests inside `useEffect` in functional components (or `componentDidMount` in class components), using `fetch`, `axios`, or TanStack Query.",
        isCorrect: true,
        explanation: "Correct. Initiating data fetching in mount effects ensures the component is attached to the DOM and state setters can update UI cleanly upon response."
      },
      {
        id: "C",
        text: "Execute synchronous HTTP requests directly inside the component render function body.",
        isCorrect: false,
        explanation: "Fetching in render causes infinite request loops and blocks UI rendering."
      },
      {
        id: "D",
        text: "Make requests inside the `constructor` before mounting.",
        isCorrect: false,
        explanation: "Constructors should not execute async side effects as responses can arrive before mount or during aborted renders."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in fetch. You should fetch data in the componentDidMount() lifecycle method. This is so you can use setState() to update your component when the data is retrieved. For example, the employees list fetched from API and set local state:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to make AJAX call and in which component lifecycle methods should I make an AJAX call?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to make AJAX call and in which component lifecycle methods should I make an AJAX call?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "Parse query parameters from `document.cookie`.",
        isCorrect: false,
        explanation: "Cookies and URL query strings are completely separate browser mechanisms."
      },
      {
        id: "B",
        text: "Use native `new URLSearchParams(props.location.search)` or parse with libraries like `query-string` (in v6+, use the `useSearchParams()` hook).",
        isCorrect: true,
        explanation: "Correct. In v4/v5, `props.location.search` provided the raw query string to parse via `URLSearchParams` or `query-string`; v6 provides `useSearchParams()`."
      },
      {
        id: "C",
        text: "Split `window.navigator.userAgent` by question marks.",
        isCorrect: false,
        explanation: "`userAgent` contains browser device information, not URL query strings."
      },
      {
        id: "D",
        text: "Query parameters can only be read on backend web servers.",
        isCorrect: false,
        explanation: "`URLSearchParams` and router hooks read query strings directly on the client."
      }
    ],
    correctAnswer: "B",
    explanation: "The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library. You can also use URLSearchParams if you want something native: You should use a polyfill for IE11.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to get query parameters in React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to get query parameters in React Router v4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
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
        text: "Parameters cannot be passed during programmatic navigation.",
        isCorrect: false,
        explanation: "History state and search query parameters are fully supported during programmatic navigation."
      },
      {
        id: "B",
        text: "Pass a location descriptor object: `history.push({ pathname: '/target', search: '?key=value', state: { data } })` (or `navigate('/target', { state: { data } })` in v6).",
        isCorrect: true,
        explanation: "Correct. Location descriptors and navigation options allow passing path strings, query search parameters, and transient route state objects simultaneously."
      },
      {
        id: "C",
        text: "Write parameters to `document.title`.",
        isCorrect: false,
        explanation: "`document.title` sets the browser tab title, not router history parameters."
      },
      {
        id: "D",
        text: "Encode all objects into binary Base64 strings inside the domain hostname.",
        isCorrect: false,
        explanation: "State objects are passed in memory via history state without mangling domain names."
      }
    ],
    correctAnswer: "B",
    explanation: "While navigating you can pass props to the history object: The search property is used to pass query params in push() method.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass params to history.push method in React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass params to history.push method in React Router v4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
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
        text: "A full-stack MVC framework with built-in PostgreSQL database drivers.",
        isCorrect: false,
        explanation: "Flux is an architectural pattern for unidirectional client state flow, not a full-stack database framework."
      },
      {
        id: "B",
        text: "A CSS stylesheet preprocessor similar to Sass.",
        isCorrect: false,
        explanation: "Flux governs application data flow, not CSS styles."
      },
      {
        id: "C",
        text: "An architectural design pattern created by Facebook that enforces strict unidirectional data flow: Actions -> Dispatcher -> Stores -> Views, making state changes predictable.",
        isCorrect: true,
        explanation: "Correct. Flux resolved the tangled cascading updates of bidirectional MVC by requiring all state mutations to flow through a central dispatcher to stores."
      },
      {
        id: "D",
        text: "A hardware graphics accelerator card.",
        isCorrect: false,
        explanation: "Flux is a software architecture paradigm."
      }
    ],
    correctAnswer: "C",
    explanation: "Flux is an application design paradigm used as a replacement for the more traditional MVC pattern. It is not a framework or a library but a new kind of architecture that complements React and the concept of Unidirectional Data Flow. Facebook uses this pattern internally when working with React. The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is flux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is flux?.",
    hints: [
      "Start from the constraint: how much data, how often it changes, and who reads it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
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
        text: "A browser extension that converts HTML into PDF files.",
        isCorrect: false,
        explanation: "Redux is a JavaScript state management library."
      },
      {
        id: "B",
        text: "A predictable state container for JavaScript apps based on Flux principles, maintaining the entire application state in a single immutable store updated via pure reducers.",
        isCorrect: true,
        explanation: "Correct. Redux simplifies state management by centralizing state in a single store, enforcing immutability, and requiring pure functions (reducers) for all state transitions."
      },
      {
        id: "C",
        text: "A database management system that replaces MongoDB.",
        isCorrect: false,
        explanation: "Redux manages client-side in-memory application state, not disk databases."
      },
      {
        id: "D",
        text: "A styling library that generates responsive CSS classes.",
        isCorrect: false,
        explanation: "Redux manages data and state transitions."
      }
    ],
    correctAnswer: "B",
    explanation: "Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used together with React, or with any other view library. It is tiny (about 2kB) and has no dependencies.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "`mapStateToProps` writes data to the database; `mapDispatchToProps` reads data from the server.",
        isCorrect: false,
        explanation: "Both are client-side store mapping utilities in `react-redux`."
      },
      {
        id: "B",
        text: "There is no difference; they are interchangeable aliases.",
        isCorrect: false,
        explanation: "They serve distinct purposes: reading state vs dispatching actions."
      },
      {
        id: "C",
        text: "`mapStateToProps` extracts and subscribes to state data from the Redux store as component props; `mapDispatchToProps` binds action creators to `dispatch` so the component can trigger updates.",
        isCorrect: true,
        explanation: "Correct. `mapStateToProps(state)` reads from the store; `mapDispatchToProps(dispatch)` provides action-dispatching callback props."
      },
      {
        id: "D",
        text: "`mapStateToProps` is only for mobile apps; `mapDispatchToProps` is only for desktop.",
        isCorrect: false,
        explanation: "Both are used across all React platforms with React-Redux."
      }
    ],
    correctAnswer: "C",
    explanation: "mapStateToProps() is a utility which helps your component get updated state (which is updated by some other components): mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state): Recommend always using the, object shorthand, form for the mapDispatchToProps Redux wrap it in another function that looks like (, args) => dispatch(onTodoClick(, args)), and pass that wrapper function as a prop to your component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between mapStateToProps() and mapDispatchToProps()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between mapStateToProps() and mapDispatchToProps()?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Reducers do not accept actions under any circumstances.",
        isCorrect: false,
        explanation: "Reducers receive dispatched actions as parameters from the store, but must not dispatch new actions."
      },
      {
        id: "B",
        text: "Yes, dispatching actions inside reducers is the recommended way to handle async data.",
        isCorrect: false,
        explanation: "Async logic belongs in middleware (Redux Thunk/Saga/RTK Query), never in pure reducers."
      },
      {
        id: "C",
        text: "No, dispatching an action within a reducer is an anti-pattern; reducers must be pure synchronous functions `(state, action) => newState` with zero side effects.",
        isCorrect: true,
        explanation: "Correct. Reducers must remain pure and free of side effects; dispatching actions inside a reducer causes cascading loops and breaks predictable state transitions."
      },
      {
        id: "D",
        text: "Yes, but only if the action is dispatched using `setInterval`.",
        isCorrect: false,
        explanation: "Timers and async triggers inside reducers violate reducer purity."
      }
    ],
    correctAnswer: "C",
    explanation: "Dispatching an action within a reducer is an anti-pattern. Your reducer should be without side effects, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can I dispatch an action in reducer?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can I dispatch an action in reducer?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Export the configured `store` instance from the file where it is created and import it directly (`import store from './store'; store.getState(); store.dispatch(...)`).",
        isCorrect: true,
        explanation: "Correct. Exporting the singleton `store` module allows non-component files (API clients, utilities) to inspect state or dispatch actions directly."
      },
      {
        id: "B",
        text: "The Redux store cannot be accessed outside React components.",
        isCorrect: false,
        explanation: "The Redux store is a standalone JavaScript object and can be used anywhere in JavaScript."
      },
      {
        id: "C",
        text: "Mutate `window.__SECRET_STORE__` on every keystroke.",
        isCorrect: false,
        explanation: "Exporting the store instance from its module is cleaner, modular, and type-safe."
      },
      {
        id: "D",
        text: "Store the password in `document.cookie` and poll it every second.",
        isCorrect: false,
        explanation: "Polling cookies is unrelated to accessing Redux store instances."
      }
    ],
    correctAnswer: "A",
    explanation: "You just need to export the store from the module where it created with createStore(). Also, it shouldn't pollute the global window object.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to access Redux store outside a component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to access Redux store outside a component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Redux is a database; RxJS is a CSS styling tool.",
        isCorrect: false,
        explanation: "Redux manages state; RxJS manages reactive event streams in JavaScript."
      },
      {
        id: "B",
        text: "They are identical libraries maintained by the exact same author.",
        isCorrect: false,
        explanation: "They are distinct libraries with different architectures, scopes, and maintainers."
      },
      {
        id: "C",
        text: "Both embrace reactive patterns (Redux store observes actions and updates; RxJS uses Observables for asynchronous streams), but Redux is an architectural state container while RxJS is a generic reactive stream library.",
        isCorrect: true,
        explanation: "Correct. Redux models state as a reactive accumulator over time (`reduce`), while RxJS provides composable observable stream primitives for async events."
      },
      {
        id: "D",
        text: "There are no similarities of any kind.",
        isCorrect: false,
        explanation: "Both share underlying reactive and functional programming concepts."
      }
    ],
    correctAnswer: "C",
    explanation: "These libraries are very different for very different purposes, but there are some vague similarities. Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Are there any similarities between Redux and RxJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Are there any similarities between Redux and RxJS?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Call `connect()` inside an infinite `while` loop.",
        isCorrect: false,
        explanation: "Infinite loops freeze the browser UI."
      },
      {
        id: "B",
        text: "`connect()` is used to connect physical HDMI cables to the monitor.",
        isCorrect: false,
        explanation: "`connect` is a React-Redux JavaScript function binding stores to components."
      },
      {
        id: "C",
        text: "`connect()` deletes the component from the DOM.",
        isCorrect: false,
        explanation: "`connect()` returns an enhanced wrapper component connected to the store."
      },
      {
        id: "D",
        text: "Wrap the component with `connect(mapStateToProps, mapDispatchToProps)(MyComponent)` to inject Redux state and action dispatchers as component props.",
        isCorrect: true,
        explanation: "Correct. `connect()` is a higher-order component that subscribes the wrapped component to Redux store updates with memoized prop selectors."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to follow two steps to use your store in your container: Use mapStateToProps(): It maps the state variables from your store to the props that you specify. Connect the above props to your container: The object returned by the mapStateToProps function is connected to the container. You can import connect() from react-redux.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use connect() from React Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use connect() from React Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "`@` is a CSS selector for styling button borders.",
        isCorrect: false,
        explanation: "`@` in JavaScript class files indicates decorator syntax."
      },
      {
        id: "B",
        text: "`@` encrypts the Redux store with AES-256.",
        isCorrect: false,
        explanation: "Decorators are syntactic wrappers around classes and methods in JavaScript."
      },
      {
        id: "C",
        text: "`@` signifies experimental ES class decorator syntax (`@connect(mapState, mapDispatch) class MyComp ...`), an alternative to calling `connect(...)(MyComp)` on class components.",
        isCorrect: true,
        explanation: "Correct. Decorators were an ES stage-2 proposal enabling concise class annotation, though modern functional React uses hooks (`useSelector`, `useDispatch`) instead."
      },
      {
        id: "D",
        text: "`@` connects the component to Twitter / X social media feeds.",
        isCorrect: false,
        explanation: "The `@` symbol is JavaScript decorator syntax, unrelated to social media."
      }
    ],
    correctAnswer: "C",
    explanation: "The @ symbol is in fact a JavaScript expression used to signify decorators. Decorators make it possible to annotate and modify classes and properties at design time. Let's take an example setting up Redux without and with a decorator. Without decorator: With decorator: The above examples are almost similar except the usage of decorator. The decorator syntax isn't built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Whats the purpose of at symbol in the Redux connect decorator?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Whats the purpose of at symbol in the Redux connect decorator?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Context only works in Python; React Redux only works in Java.",
        isCorrect: false,
        explanation: "Both are JavaScript libraries for React web applications."
      },
      {
        id: "B",
        text: "Context is a lightweight built-in tool for low-frequency global data (themes/auth); React-Redux provides a full state architecture with middleware, devtools, and granular selector optimizations.",
        isCorrect: true,
        explanation: "Correct. Context re-renders all consumers on value changes; Redux uses fine-grained subscriptions (`useSelector`) to prevent unnecessary component re-renders."
      },
      {
        id: "C",
        text: "Context was removed from React in version 18.",
        isCorrect: false,
        explanation: "Context remains an essential, active built-in feature of React."
      },
      {
        id: "D",
        text: "React Redux cannot store objects or arrays.",
        isCorrect: false,
        explanation: "Redux stores any serializable JavaScript data structure."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use Context in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for. Whereas Redux is much more powerful and provides a large number of features that the Context API doesn't provide. Also, React Redux uses context internally but it doesn't expose this fact in the public API.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React context and React Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React context and React Redux?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
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
        text: "Because they reduce CPU temperature by throttling execution.",
        isCorrect: false,
        explanation: "The name is based on functional programming `reduce` semantics."
      },
      {
        id: "B",
        text: "Because they match the signature of `Array.prototype.reduce((accumulator, current) => result)`, accumulating actions over time to produce the next state object.",
        isCorrect: true,
        explanation: "Correct. A Redux reducer `(previousState, action) => nextState` reduces a sequence of dispatched actions into a single accumulated application state."
      },
      {
        id: "C",
        text: "Because they reduce the size of the JavaScript bundle on disk.",
        isCorrect: false,
        explanation: "The name derives from the functional `reduce` accumulator concept, not file minification."
      },
      {
        id: "D",
        text: "Because they reduce the number of HTML tags rendered on screen.",
        isCorrect: false,
        explanation: "Reducers compute state; JSX rendering determines HTML output."
      }
    ],
    correctAnswer: "B",
    explanation: "Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could reduce a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why are Redux state functions called reducers?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why are Redux state functions called reducers?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "No state should ever be stored in Redux under any circumstances.",
        isCorrect: false,
        explanation: "Shared domain state that spans multiple features benefits significantly from Redux centralization."
      },
      {
        id: "B",
        text: "No, keep global/shared domain data in Redux, but keep transient local UI state (form inputs, dropdown toggles, hover states) in local component state (`useState`).",
        isCorrect: true,
        explanation: "Correct. Over-centralizing ephemeral UI state in Redux adds unnecessary boilerplate and degrades performance; balance local and global state according to data scope."
      },
      {
        id: "C",
        text: "Yes, every single mouse coordinate and text character must be stored in Redux.",
        isCorrect: false,
        explanation: "Storing ephemeral UI state in Redux causes unnecessary global re-renders and excessive boilerplate."
      },
      {
        id: "D",
        text: "React components are forbidden from using local `useState` when Redux is installed.",
        isCorrect: false,
        explanation: "`useState` and Redux coexist and complement each other in modern applications."
      }
    ],
    correctAnswer: "B",
    explanation: "Keep your data in the Redux store, and the UI related state internally in the component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Should I keep all component's state in Redux store?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Should I keep all component's state in Redux store?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "`ownProps` is only available in Python scripts.",
        isCorrect: false,
        explanation: "`ownProps` is an optional second parameter in `mapStateToProps` and `mapDispatchToProps`."
      },
      {
        id: "B",
        text: "`ownProps` contains the props passed directly to the connected component, allowing selectors in `mapStateToProps` / `mapDispatchToProps` to derive state based on parent-provided props (e.g. `state.todos[ownProps.id]`).",
        isCorrect: true,
        explanation: "Correct. `ownProps` enables component-specific state selection based on incoming props, such as finding an entity matching `ownProps.id`."
      },
      {
        id: "C",
        text: "`ownProps` encrypts all props before sending to the browser DOM.",
        isCorrect: false,
        explanation: "`ownProps` is a plain JavaScript object representing component props."
      },
      {
        id: "D",
        text: "`ownProps` deletes the component's private state from memory.",
        isCorrect: false,
        explanation: "`ownProps` provides read access to the component's incoming props inside connect functions."
      }
    ],
    correctAnswer: "B",
    explanation: "If the ownProps parameter is specified, React Redux will pass the props that were passed to the component into your connect functions. So, if you use a connected component: The ownProps inside your mapStateToProps() and mapDispatchToProps() functions will be an object: You can use this object to decide what to return from those functions.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use of the ownProps parameter in mapStateToProps() and mapDispatchToProps()?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "A saga is a synchronous compiler that converts JSX into PHP files.",
        isCorrect: false,
        explanation: "Sagas execute asynchronous JavaScript generators in the browser runtime."
      },
      {
        id: "B",
        text: "A saga is like a separate background thread in the app dedicated to side effects, started/paused/cancelled via standard Redux actions with full access to state and dispatch.",
        isCorrect: true,
        explanation: "Correct. Sagas run like background processes listening for dispatched actions, coordinating complex async workflows, and dispatching resulting actions back to the store."
      },
      {
        id: "C",
        text: "A saga is a physical router that routes internet cables.",
        isCorrect: false,
        explanation: "Sagas manage in-memory asynchronous action streams in Redux."
      },
      {
        id: "D",
        text: "A saga is a hardware chip on the user's graphics card.",
        isCorrect: false,
        explanation: "Redux-Saga is a pure JavaScript middleware library."
      }
    ],
    correctAnswer: "B",
    explanation: "Saga is like a separate thread in your application, that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the mental model of redux-saga?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the mental model of redux-saga?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "A middleware that allows action creators to return a function `(dispatch, getState) => ...` instead of a plain action object, enabling delayed or conditional dispatching.",
        isCorrect: true,
        explanation: "Correct. Redux Thunk intercepts functions passed to `dispatch()`, executes them with `dispatch` and `getState`, making asynchronous calls simple and direct."
      },
      {
        id: "B",
        text: "A database engine for persisting state in SQLite.",
        isCorrect: false,
        explanation: "Thunks execute client-side JavaScript functions with store access."
      },
      {
        id: "C",
        text: "A compiler plugin that translates React into Java bytecode.",
        isCorrect: false,
        explanation: "Redux Thunk is a lightweight Redux middleware for asynchronous action creators."
      },
      {
        id: "D",
        text: "A tool for rendering 3D animations in HTML5 Canvas.",
        isCorrect: false,
        explanation: "Redux Thunk manages async logic in Redux, not Canvas animations."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch() and getState() as parameters.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux Thunk?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux Thunk?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "A hardware device that connects to your computer via USB.",
        isCorrect: false,
        explanation: "DevTools is a software browser extension and npm package."
      },
      {
        id: "B",
        text: "A compiler that converts Redux into CSS classes.",
        isCorrect: false,
        explanation: "DevTools inspects runtime state and action history."
      },
      {
        id: "C",
        text: "A development tool/browser extension providing live-editing, time-travel debugging, action inspection, state diffing, and state persistence across page reloads.",
        isCorrect: true,
        explanation: "Correct. Redux DevTools records dispatched actions and state transitions, allowing developers to step backward/forward in time and replay actions."
      },
      {
        id: "D",
        text: "A paid cloud hosting service for React websites.",
        isCorrect: false,
        explanation: "Redux DevTools is a free open-source debugging tool and browser extension."
      }
    ],
    correctAnswer: "C",
    explanation: "Redux DevTools is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don't want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux DevTools?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Functions that mutate the store directly without actions.",
        isCorrect: false,
        explanation: "Selectors are read-only pure getter functions."
      },
      {
        id: "B",
        text: "Database query locks that prevent simultaneous writes.",
        isCorrect: false,
        explanation: "Selectors are pure client JavaScript functions."
      },
      {
        id: "C",
        text: "CSS selectors used to color HTML `<button>` elements.",
        isCorrect: false,
        explanation: "Redux selectors are JavaScript functions that read and compute state slices, not CSS rules."
      },
      {
        id: "D",
        text: "Functions `(state) => data` that encapsulate state structure, compute derived data, and (when memoized via Reselect) prevent unnecessary re-computations and component re-renders.",
        isCorrect: true,
        explanation: "Correct. Selectors decouple components from the internal shape of the Redux store and optimize performance through memoized computations."
      }
    ],
    correctAnswer: "D",
    explanation: "Selectors are functions that take Redux state as an argument and return some data to pass to the component. For example, to get user details from the state: These selectors have two main benefits, The selector can compute derived data, allowing Redux to store the minimal possible state The selector is not recomputed unless one of its arguments changes: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Redux selectors and why to use them?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Redux selectors and why to use them?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "A legacy library that tracked every form input keystroke and validation state inside the global Redux store; now superseded by React Hook Form and Formik.",
        isCorrect: true,
        explanation: "Correct. Redux Form connected inputs to Redux state on every keystroke, which caused performance bottlenecks on large forms; modern apps use React Hook Form for local/uncontrolled performance."
      },
      {
        id: "B",
        text: "A backend PHP form handler script.",
        isCorrect: false,
        explanation: "Redux Form was a client-side React form state management package."
      },
      {
        id: "C",
        text: "A styling framework for form buttons.",
        isCorrect: false,
        explanation: "Redux Form managed form state, validation, and submission."
      },
      {
        id: "D",
        text: "A built-in HTML5 tag `<redux-form>` standardized by W3C.",
        isCorrect: false,
        explanation: "Redux Form was an npm package, not a native HTML5 tag."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux Form works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Redux Form?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Redux Form?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Multiple middlewares cannot be used in a single Redux store.",
        isCorrect: false,
        explanation: "Redux explicitly supports chaining multiple middlewares via `applyMiddleware`."
      },
      {
        id: "B",
        text: "Pass them as comma-separated arguments to `applyMiddleware(middleware1, middleware2, ...)` when creating the store (or pass an array in Redux Toolkit's `configureStore`).",
        isCorrect: true,
        explanation: "Correct. `applyMiddleware` composes multiple middleware functions (e.g. `thunk`, `logger`) into a unified store enhancer chain."
      },
      {
        id: "C",
        text: "Store middleware functions in `document.cookie`.",
        isCorrect: false,
        explanation: "Middleware functions are passed to `applyMiddleware` in JavaScript code."
      },
      {
        id: "D",
        text: "Wrap each middleware inside a synchronous `while` loop.",
        isCorrect: false,
        explanation: "Synchronous loops block JavaScript execution completely."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use applyMiddleware(). For example, you can add redux-thunk and logger passing them as arguments to applyMiddleware():: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to add multiple middlewares to Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to add multiple middlewares to Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Initial state can only be loaded by restarting the web server.",
        isCorrect: false,
        explanation: "Initial state is passed synchronously to reducers or store initializers."
      },
      {
        id: "B",
        text: "Assign `window.__STATE__ = initialData` before importing React.",
        isCorrect: false,
        explanation: "Global variable assignment is unreactive and violates Redux store encapsulation."
      },
      {
        id: "C",
        text: "Redux forbids having an initial state; state must start as `undefined`.",
        isCorrect: false,
        explanation: "Redux requires reducers to return non-undefined initial state upon initialization."
      },
      {
        id: "D",
        text: "Provide default parameter values in slice reducers (`(state = initialState, action) => ...`) and/or pass a `preloadedState` object as the second argument to `createStore` / `configureStore`.",
        isCorrect: true,
        explanation: "Correct. Individual reducers define default state for their slice, while `preloadedState` in store creation allows hydrating state from SSR or localStorage."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to pass initial state as second argument to createStore:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to set initial state in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to set initial state in Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
    codeSnippet: "$ npm install, save font-awesome\n\nimport 'font-awesome/css/font-awesome.min.css';\n\nrender() {\n     return <div><i className={'fa fa-spinner'} /></div>\n   }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Copy binary `.exe` files into the `public/` directory.",
        isCorrect: false,
        explanation: "Icons are rendered as SVG elements or icon fonts in web browsers."
      },
      {
        id: "B",
        text: "Embed raw Photoshop PSD files directly into JSX tags.",
        isCorrect: false,
        explanation: "Icons are imported as SVG components or vector font classes."
      },
      {
        id: "C",
        text: "Install `@fortawesome/react-fontawesome` and icon packages (e.g. `@fortawesome/free-solid-svg-icons`), then render `<FontAwesomeIcon icon={faCoffee} />`.",
        isCorrect: true,
        explanation: "Correct. The official React FontAwesome component renders scalable SVG icons with full prop customization (size, color, spin, transform)."
      },
      {
        id: "D",
        text: "Font Awesome icons cannot be used in React.",
        isCorrect: false,
        explanation: "Font Awesome provides official React components for seamless SVG icon usage."
      }
    ],
    correctAnswer: "C",
    explanation: "The below steps followed to include Font Awesome in React: Install font-awesome: Import font-awesome in your index.js file: Add Font Awesome classes in className:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use Font Awesome icons in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use Font Awesome icons in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "A compiler that replaces Node.js.",
        isCorrect: false,
        explanation: "React DevTools connects to React applications to inspect UI trees."
      },
      {
        id: "B",
        text: "An official browser extension and standalone tool that lets developers inspect the live React component tree, view and edit props/state, inspect hooks, and record render profiling.",
        isCorrect: true,
        explanation: "Correct. React DevTools provides Components and Profiler panels to inspect component hierarchies, trace why components re-rendered, and measure render durations."
      },
      {
        id: "C",
        text: "A code obfuscator for hiding source code from users.",
        isCorrect: false,
        explanation: "DevTools assists debugging during development."
      },
      {
        id: "D",
        text: "A cloud server for hosting production databases.",
        isCorrect: false,
        explanation: "React DevTools is a client-side inspection tool for developers."
      }
    ],
    correctAnswer: "B",
    explanation: "React Developer Tools let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native). The official extensions available for different browsers or environments. Chrome extension Firefox extension Standalone app (Safari, React Native, etc): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Dev Tools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Dev Tools?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Automatic database backup to Amazon S3 on every state update.",
        isCorrect: false,
        explanation: "Reselect is a client-side JavaScript memoization library."
      },
      {
        id: "B",
        text: "Memoized computations (recalculates only when inputs change), composability (selectors can be inputs to other selectors), and clean separation of derived data from stored state.",
        isCorrect: true,
        explanation: "Correct. Reselect enables efficient derived state computations while preventing unnecessary re-renders in connected components."
      },
      {
        id: "C",
        text: "Compiling JavaScript into C++ machine code.",
        isCorrect: false,
        explanation: "Reselect operates purely within standard JavaScript memory."
      },
      {
        id: "D",
        text: "Generating 3D virtual reality models from state objects.",
        isCorrect: false,
        explanation: "Reselect computes and memoizes state slices."
      }
    ],
    correctAnswer: "B",
    explanation: "Let's see the main features of Reselect library, Selectors can compute derived data, allowing Redux to store the minimal possible state. Selectors are efficient. A selector is not recomputed unless one of its arguments changes. Selectors are composable. They can be used as input to other selectors.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main features of Reselect library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main features of Reselect library?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Yes, ES6 classes require the `statics` object inside the constructor.",
        isCorrect: false,
        explanation: "ES6 classes use the `static` keyword directly on class properties or methods."
      },
      {
        id: "B",
        text: "Statics only work when running in Node.js, not browsers.",
        isCorrect: false,
        explanation: "Static class methods and properties work universally in all modern JavaScript runtimes."
      },
      {
        id: "C",
        text: "Static methods are completely banned in ES6 classes.",
        isCorrect: false,
        explanation: "Static methods and fields are fully standardized in modern ECMAScript/JavaScript."
      },
      {
        id: "D",
        text: "No, the `statics` configuration object only worked in legacy `React.createClass`; in ES6 classes, use the `static` keyword inside the class body (`static propTypes = ...`) or assign outside (`MyComponent.customMethod = ...`).",
        isCorrect: true,
        explanation: "Correct. ES6 classes use the native `static` class field/method syntax rather than the legacy `statics: { ... }` configuration object."
      }
    ],
    correctAnswer: "D",
    explanation: "No, statics only works with React.createClass(): But you can write statics inside ES6+ classes as below, or writing them outside class as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Does the statics object work with ES6 classes in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Does the statics object work with ES6 classes in React?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "Yes, Redux is hardcoded to only run inside React DOM renderers.",
        isCorrect: false,
        explanation: "Redux is a standalone JavaScript library with bindings for multiple frameworks."
      },
      {
        id: "B",
        text: "Redux can only be used with Python Django applications.",
        isCorrect: false,
        explanation: "Redux is a JavaScript library."
      },
      {
        id: "C",
        text: "No, Redux is a standalone, UI-agnostic state container that can be used with any UI layer (Angular, Vue, Svelte, vanilla JavaScript) or backend Node.js apps.",
        isCorrect: true,
        explanation: "Correct. Redux core has zero dependencies on React; `react-redux` is the separate official binding library that connects Redux stores to React component trees."
      },
      {
        id: "D",
        text: "Redux only works inside Chrome browser extensions.",
        isCorrect: false,
        explanation: "Redux runs in all JavaScript environments."
      }
    ],
    correctAnswer: "C",
    explanation: "Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can Redux only be used with React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can Redux only be used with React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Yes, Redux strictly requires Create React App and fails on all other tools.",
        isCorrect: false,
        explanation: "Redux is build-tool agnostic and runs everywhere JavaScript runs."
      },
      {
        id: "B",
        text: "Redux requires compiling with Microsoft Visual Studio C++ compiler.",
        isCorrect: false,
        explanation: "Redux is pure JavaScript."
      },
      {
        id: "C",
        text: "Redux can only be run inside a Docker container.",
        isCorrect: false,
        explanation: "Redux runs in any browser or Node.js environment directly."
      },
      {
        id: "D",
        text: "No, Redux works with any bundler (Vite, Webpack, Rollup, esbuild) and also provides a UMD build that can be loaded directly via a `<script>` tag without any build tool.",
        isCorrect: true,
        explanation: "Correct. Redux is distributed in ESM, CJS, and UMD formats, allowing usage in modern bundlers or directly in browser script tags without build tooling."
      }
    ],
    correctAnswer: "D",
    explanation: "Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do you need to have a particular build tool to use Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do you need to have a particular build tool to use Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "Mutate `window.__INITIAL_VALUES__` directly in the DOM.",
        isCorrect: false,
        explanation: "Global window mutation is unreactive and violates component encapsulation."
      },
      {
        id: "B",
        text: "Force a full-page browser refresh whenever state changes.",
        isCorrect: false,
        explanation: "Full page refreshes destroy single-page application state."
      },
      {
        id: "C",
        text: "Initial values cannot be updated after component mounting.",
        isCorrect: false,
        explanation: "`enableReinitialize: true` enables dynamic re-initialization of form fields."
      },
      {
        id: "D",
        text: "Set the configuration option `enableReinitialize: true` in the `reduxForm({ form: '...', enableReinitialize: true })` wrapper.",
        isCorrect: true,
        explanation: "Correct. By default, Redux Form initialized values only once on mount; `enableReinitialize: true` allowed updating form fields whenever `initialValues` prop changed."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to add enableReinitialize: true setting. If your initialValues prop gets updated, your form will update too.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Redux Form initialValues get updated from state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Redux Form initialValues get updated from state?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "To connect the web page to the user's printer.",
        isCorrect: false,
        explanation: "Service Workers manage network caching, not hardware printing."
      },
      {
        id: "B",
        text: "To automatically send user passwords to marketing servers.",
        isCorrect: false,
        explanation: "Service Workers are standard browser web workers for network caching."
      },
      {
        id: "C",
        text: "To run background cryptocurrency mining in the user's browser.",
        isCorrect: false,
        explanation: "Service Workers provide caching, offline capabilities, and push notifications for PWAs."
      },
      {
        id: "D",
        text: "To register a Service Worker that caches static assets (HTML/JS/CSS), enabling offline Progressive Web App (PWA) capabilities and faster subsequent page loads from local cache.",
        isCorrect: true,
        explanation: "Correct. Service Workers intercept network requests to serve cached assets offline, providing resilience on flaky mobile networks and near-instant load times."
      }
    ],
    correctAnswer: "D",
    explanation: "React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that's what you should know about service worker's for now. It's all about adding offline capabilities to your site.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of registerServiceWorker in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of registerServiceWorker in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Prefix every method with `function*` and yield on every line.",
        isCorrect: false,
        explanation: "Generators are used for iterator control flow, not standard event handlers."
      },
      {
        id: "B",
        text: "Class fields are illegal in JavaScript and cause browser crashes.",
        isCorrect: false,
        explanation: "Class fields are a standardized feature of ECMAScript (ES2022)."
      },
      {
        id: "C",
        text: "Declare state as a class property (`state = { count: 0 };`) and methods as arrow functions (`handleClick = () => ...`) to eliminate constructor boilerplate and manual `.bind(this)`.",
        isCorrect: true,
        explanation: "Correct. Class fields initialize instance properties cleanly, and arrow function properties automatically bind `this` to the component instance."
      },
      {
        id: "D",
        text: "Store all methods in the global `window` object.",
        isCorrect: false,
        explanation: "Class fields attach methods cleanly to the class instance."
      }
    ],
    correctAnswer: "C",
    explanation: "React Class Components can be made much more concise using the class field declarations. You can initialize local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them. Let's take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use class field declarations syntax in React classes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use class field declarations syntax in React classes?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "There are no differences; Flux and Redux are identical libraries.",
        isCorrect: false,
        explanation: "Redux introduced single-store architecture, immutability, and pure reducers over Flux."
      },
      {
        id: "B",
        text: "Flux is for mobile; Redux is for desktop.",
        isCorrect: false,
        explanation: "Both are architectural patterns for web and mobile state management."
      },
      {
        id: "C",
        text: "Flux uses multiple stores with a singleton Dispatcher and mutable state; Redux uses a single store with no separate dispatcher, immutable state, and pure reducer functions.",
        isCorrect: true,
        explanation: "Correct. Redux simplified Flux by consolidating state into a single immutable tree and replacing individual dispatchers with pure reducer composition."
      },
      {
        id: "D",
        text: "Flux runs on Node.js; Redux runs in MySQL.",
        isCorrect: false,
        explanation: "Both are client-side JavaScript architectural paradigms."
      }
    ],
    correctAnswer: "C",
    explanation: "Below are the major differences between Flux and Redux Flux Redux State is mutable State is immutable The Store contains both state and change logic The Store and change logic are separate There are multiple stores exist There is only one store exist All the stores are disconnected and flat Single store with hierarchical reducers It has a singleton dispatcher There is no concept of dispatcher React components subscribe to the store Container components uses connect function: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between Flux and Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between Flux and Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
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
        text: "To register service workers for offline caching.",
        isCorrect: false,
        explanation: "Constructors initialize the class instance in memory."
      },
      {
        id: "B",
        text: "To render HTML markup to the browser DOM.",
        isCorrect: false,
        explanation: "Rendering is handled by the `render()` method, not the constructor."
      },
      {
        id: "C",
        text: "To initialize local component state (`this.state = { ... }`) and bind event handler methods to the component instance (`this.handleClick = this.handleClick.bind(this)`).",
        isCorrect: true,
        explanation: "Correct. In class components, the constructor sets up initial state without calling `setState` and binds methods before rendering."
      },
      {
        id: "D",
        text: "To fetch data from backend servers with synchronous HTTP requests.",
        isCorrect: false,
        explanation: "Constructors should not execute side effects or network requests."
      }
    ],
    correctAnswer: "C",
    explanation: "The constructor is mainly used for two purposes, To initialize local state by assigning object to this.state For binding event handler methods to the instance For example, the below code covers both the above cases,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the main purpose of constructor?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the main purpose of constructor?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Yes, omitting a constructor throws a fatal JavaScript syntax error.",
        isCorrect: false,
        explanation: "Constructors are completely optional in ES6 classes and React components."
      },
      {
        id: "B",
        text: "Constructors are required for functional components.",
        isCorrect: false,
        explanation: "Functional components do not have classes or constructors."
      },
      {
        id: "C",
        text: "No, if you don't initialize state or bind methods (or if you use class fields `state = { ... }`), you do not need to implement a constructor.",
        isCorrect: true,
        explanation: "Correct. Default constructors in JavaScript subclasses call `super(...args)` automatically, making explicit constructor declarations optional."
      },
      {
        id: "D",
        text: "Yes, but only if the component has fewer than 5 lines of code.",
        isCorrect: false,
        explanation: "Constructors are optional regardless of component size."
      }
    ],
    correctAnswer: "C",
    explanation: "No, it is not mandatory. i.e, If you don, t initialize state and you don, t bind methods, you don, t need to implement a constructor for your React component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it mandatory to define constructor for React component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it mandatory to define constructor for React component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Because the component is being unmounted and destroyed; it will never re-render, so setting state is meaningless and triggers a React warning.",
        isCorrect: true,
        explanation: "Correct. Once unmounting begins, the component instance is discarded from the DOM tree, making state updates futile."
      },
      {
        id: "B",
        text: "Because `componentWillUnmount` only runs in Node.js.",
        isCorrect: false,
        explanation: "`componentWillUnmount` runs in the browser when a class component is removed from the DOM."
      },
      {
        id: "C",
        text: "Because it causes the user's monitor to turn off.",
        isCorrect: false,
        explanation: "It simply causes a wasted state update and logs a React console warning."
      },
      {
        id: "D",
        text: "Calling `setState` in unmount deletes the database on the server.",
        isCorrect: false,
        explanation: "It is an in-memory lifecycle warning about updating unmounted components."
      }
    ],
    correctAnswer: "A",
    explanation: "You should not call setState() in componentWillUnmount() because once a component instance is unmounted, it will never be mounted again.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why should not call setState in componentWillUnmount?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why should not call setState in componentWillUnmount?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "A tool for downloading error log files to the user's desktop.",
        isCorrect: false,
        explanation: "It updates component state to render fallback UI in React."
      },
      {
        id: "B",
        text: "A hook used in functional components to catch click events.",
        isCorrect: false,
        explanation: "It is a static class lifecycle method for Error Boundaries."
      },
      {
        id: "C",
        text: "A static lifecycle method in error boundaries invoked during the render phase after an error is thrown, returning a state update object (`{ hasError: true }`) to render a fallback UI on the next pass.",
        isCorrect: true,
        explanation: "Correct. `static getDerivedStateFromError(error)` runs synchronously during rendering to switch the component state so the fallback UI renders immediately without crashing."
      },
      {
        id: "D",
        text: "A method that automatically fixes syntax errors in child components.",
        isCorrect: false,
        explanation: "It catches thrown runtime errors to update state and display a fallback UI."
      }
    ],
    correctAnswer: "C",
    explanation: "This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state. The signature of the lifecycle method is as follows, Let us take error boundary use case with the above lifecycle method for demonistration purpose,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of getDerivedStateFromError?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of getDerivedStateFromError?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "A tool for compiling JSX into Python scripts.",
        isCorrect: false,
        explanation: "`unmountComponentAtNode` manages client DOM component unmounting."
      },
      {
        id: "B",
        text: "A method that deletes the browser hard drive.",
        isCorrect: false,
        explanation: "It cleanly unmounts a React component tree from a DOM container element."
      },
      {
        id: "C",
        text: "A legacy ReactDOM method (`ReactDOM.unmountComponentAtNode(container)`) that unmounted a React component from a DOM container, cleaned up its state and handlers; replaced in React 18+ by `root.unmount()`.",
        isCorrect: true,
        explanation: "Correct. `unmountComponentAtNode` was the legacy unmounting API paired with `ReactDOM.render()`, superseded by `root.unmount()` on `createRoot` instances."
      },
      {
        id: "D",
        text: "A method that restarts the user's Wi-Fi router.",
        isCorrect: false,
        explanation: "It is a DOM cleanup function in `react-dom`."
      }
    ],
    correctAnswer: "C",
    explanation: "This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount. The method signature would be as follows,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of unmountComponentAtNode method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of unmountComponentAtNode method?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Encrypts client-side cookies with AES-256.",
        isCorrect: false,
        explanation: "StrictMode has no role in cryptographic security or cookie encryption."
      },
      {
        id: "B",
        text: "Identifies components with unsafe lifecycles, flags legacy string refs and `findDOMNode`, detects unexpected side effects via double-invoking, and warns about deprecated context APIs.",
        isCorrect: true,
        explanation: "Correct. `<React.StrictMode>` highlights potential concurrency hazards and deprecated API usages in development to prepare code for modern React features."
      },
      {
        id: "C",
        text: "Increases production server download bandwidth by 400%.",
        isCorrect: false,
        explanation: "StrictMode is a development-only verification tool with no production runtime impact."
      },
      {
        id: "D",
        text: "Enforces TypeScript typing on plain JavaScript files without a compiler.",
        isCorrect: false,
        explanation: "StrictMode is a React component runtime check, not a static type checker."
      }
    ],
    correctAnswer: "B",
    explanation: "The will be helpful in the below cases Identifying components with unsafe lifecycle methods. Warning about legacy string ref API usage. Detecting unexpected side effects. Detecting legacy context API. Warning about deprecated findDOMNode usage: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the benefit of strict mode?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the benefit of strict mode?.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
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
        text: "In class components, calling `this.setState({ comments })` shallowly merges the provided object keys into the existing `this.state` without overwriting other state properties (e.g. `posts`).",
        isCorrect: true,
        explanation: "Correct. Class `setState` performs a shallow merge of keys; in contrast, functional `useState` setters replace state completely, requiring manual spreading `setObj(prev => ({ ...prev, ...updates }))`."
      },
      {
        id: "B",
        text: "State updates replace all other keys with `null` automatically in class components.",
        isCorrect: false,
        explanation: "Class `setState` preserves unmentioned keys through shallow merging."
      },
      {
        id: "C",
        text: "State updates cannot be merged under any circumstances.",
        isCorrect: false,
        explanation: "Shallow merging is the default behavior of class component `setState`."
      },
      {
        id: "D",
        text: "State updates are merged by uploading them to an external Git repository.",
        isCorrect: false,
        explanation: "Merging refers to shallow JavaScript object property merging in memory."
      }
    ],
    correctAnswer: "A",
    explanation: "When you call setState() in the component, React merges the object you provide into the current state. For example, let us take a facebook user with posts and comments details as state variables, Now you can update them independently with separate setState() calls as below, As mentioned in the above code snippets, this.setState({comments}) updates only comments variable without modifying or replacing posts variable.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you say that state updates are merged?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you say that state updates are merged?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
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
        text: "Invoke the function directly in JSX `<button onClick={this.deleteUser(id)}>` without a wrapper.",
        isCorrect: false,
        explanation: "Direct invocation executes the function immediately during render instead of waiting for a click."
      },
      {
        id: "B",
        text: "Store all arguments in global `window.currentArgument`.",
        isCorrect: false,
        explanation: "Global variables introduce race conditions and break component encapsulation."
      },
      {
        id: "C",
        text: "Arguments cannot be passed to event handlers in React.",
        isCorrect: false,
        explanation: "Passing parameters via arrow functions or `.bind()` is standard practice."
      },
      {
        id: "D",
        text: "Use an inline arrow function `<button onClick={(e) => this.deleteUser(id, e)}>` or bind arguments `<button onClick={this.deleteUser.bind(this, id)}>`.",
        isCorrect: true,
        explanation: "Correct. Both arrow functions and `.bind()` pass custom arguments alongside the synthetic event object `e` to the target handler function."
      }
    ],
    correctAnswer: "D",
    explanation: "During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method. Let us take an example of user details updated in a grid, In both the approaches, the synthetic argument e is passed as a second argument. You need to pass it explicitly for arrow functions and it forwarded automatically for bind method.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you pass arguments to an event handler?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you pass arguments to an event handler?.",
    hints: [
      "Start from the constraint: how much data, how often it changes, and who reads it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
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
        text: "Writing custom assembly language drivers for the keyboard.",
        isCorrect: false,
        explanation: "Form handling in React uses JavaScript form management libraries."
      },
      {
        id: "B",
        text: "Forms cannot be created in React applications.",
        isCorrect: false,
        explanation: "React Hook Form, Formik, and TanStack Form are popular, battle-tested solutions."
      },
      {
        id: "C",
        text: "Submitting forms via HTML `<blink>` tags.",
        isCorrect: false,
        explanation: "`<blink>` is an obsolete styling tag, not a form handling mechanism."
      },
      {
        id: "D",
        text: "React Hook Form (modern standard for performance/uncontrolled inputs) and Formik / TanStack Form, paired with schema validators like Zod or Yup.",
        isCorrect: true,
        explanation: "Correct. React Hook Form minimizes re-renders by isolating input subscriptions, while Zod/Yup provide type-safe schema validation."
      }
    ],
    correctAnswer: "D",
    explanation: "Formik is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission. In detail, You can categorize them as follows, Getting values in and out of form state Validation and error messages Handling form submission It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the popular choice for form handling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the popular choice for form handling?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
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
        text: "Assign `window.theme = 'dark'` inside render.",
        isCorrect: false,
        explanation: "Mutating global window variables is unreactive and violates component encapsulation."
      },
      {
        id: "B",
        text: "Context can only be used by compiling code in C++.",
        isCorrect: false,
        explanation: "React Context is a built-in React JavaScript API."
      },
      {
        id: "C",
        text: "Write context values to a file on the local hard drive.",
        isCorrect: false,
        explanation: "Context operates in JavaScript memory during runtime rendering."
      },
      {
        id: "D",
        text: "Create context `const ThemeContext = createContext('light')`, provide it `<ThemeContext.Provider value='dark'>`, and consume it with `const theme = useContext(ThemeContext)`.",
        isCorrect: true,
        explanation: "Correct. This is the standard three-step pattern for creating, providing, and consuming React Context across the component tree without prop drilling."
      }
    ],
    correctAnswer: "D",
    explanation: "Context is designed to share data that can be considered global for a tree of React components. For example, in the code below lets manually thread through a, theme, prop in order to style the Button component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Give an example on How to use context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Give an example on How to use context?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
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
        text: "The default value passed to `createContext(defaultValue)` is used as a fallback ONLY when a consuming component has no matching `<Provider>` above it in the tree.",
        isCorrect: true,
        explanation: "Correct. Consuming components look upward for the nearest Provider; if none exists, `useContext` returns the `defaultValue` passed to `createContext` (useful for isolated unit testing)."
      },
      {
        id: "B",
        text: "It sets the background color of the browser window.",
        isCorrect: false,
        explanation: "`defaultValue` provides a fallback data value for context consumers."
      },
      {
        id: "C",
        text: "It encrypts the context with AES-256.",
        isCorrect: false,
        explanation: "`defaultValue` is simply an initial fallback value in JavaScript memory."
      },
      {
        id: "D",
        text: "It is the value that overrides all Provider values in production.",
        isCorrect: false,
        explanation: "Provider `value` always takes precedence over `defaultValue` when a Provider is present."
      }
    ],
    correctAnswer: "A",
    explanation: "The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them. Below code snippet provides default theme value as Luna.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of default value in context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of default value in context?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
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
        text: "A database client that downloads all records at once.",
        isCorrect: false,
        explanation: "`Consumer` is a React JSX component subscribing to in-memory context."
      },
      {
        id: "B",
        text: "A person who buys products on an e-commerce website.",
        isCorrect: false,
        explanation: "In React, `<Context.Consumer>` is a component API for reading context values."
      },
      {
        id: "C",
        text: "A compiler that minifies CSS files.",
        isCorrect: false,
        explanation: "`Consumer` renders children using a function that receives current context values."
      },
      {
        id: "D",
        text: "A React component (`<MyContext.Consumer>{value => <UI data={value} />}</MyContext.Consumer>`) that subscribes to context changes using the render prop pattern.",
        isCorrect: true,
        explanation: "Correct. `<Context.Consumer>` was the original way to consume context in JSX, superseded in functional components by the cleaner `useContext()` hook."
      }
    ],
    correctAnswer: "D",
    explanation: "A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. Lets take a simple example,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a consumer?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a consumer?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Non-ES6 components are created using Microsoft Excel macros.",
        isCorrect: false,
        explanation: "`create-react-class` provided the legacy factory function in JavaScript."
      },
      {
        id: "B",
        text: "Create components using PHP `class` statements.",
        isCorrect: false,
        explanation: "React components must be written in JavaScript/TypeScript."
      },
      {
        id: "C",
        text: "Use the standalone `create-react-class` package (`var MyComp = createReactClass({ getInitialState: function() { ... }, render: function() { ... } })`).",
        isCorrect: true,
        explanation: "Correct. `create-react-class` was extracted from React core to allow creating components with auto-bound methods and `getInitialState` in pre-ES6 JavaScript environments."
      },
      {
        id: "D",
        text: "Write raw binary bytecode into the browser console.",
        isCorrect: false,
        explanation: "Non-ES6 components used the `create-react-class` npm package."
      }
    ],
    correctAnswer: "C",
    explanation: "If you don, t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state. Note: If you use createReactClass then auto binding is available for all methods. i.e, You don't need to use .bind(this) with in constructor for event handlers.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create react class components without ES6?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create react class components without ES6?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
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
        text: "A database management tool that replaces PostgreSQL.",
        isCorrect: false,
        explanation: "Formik is a client-side React form library."
      },
      {
        id: "B",
        text: "A hardware keyboard tester.",
        isCorrect: false,
        explanation: "Formik is a JavaScript npm package for React forms."
      },
      {
        id: "C",
        text: "An open-source form library for React that manages form state values, synchronous/asynchronous validation (with Yup/Zod), error messages, and form submissions with minimal boilerplate.",
        isCorrect: true,
        explanation: "Correct. Formik simplified React form handling by replacing complex manual state wiring with declarative form containers and field components."
      },
      {
        id: "D",
        text: "A CSS stylesheet preprocessor similar to Sass.",
        isCorrect: false,
        explanation: "Formik manages form state and validation logic, not CSS compilation."
      }
    ],
    correctAnswer: "C",
    explanation: "Formik is a small react form library that helps you with the three major problems, Getting values in and out of form state Validation and error messages Handling form submission: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is formik?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is formik?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
    codeSnippet: "npm install mobx, save\nnpm install mobx-react: save",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A state management library based on Transparent Functional Reactive Programming (TFRP) using observable state, computed values, and actions to auto-track and re-render components on mutation.",
        isCorrect: true,
        explanation: "Correct. MobX allows mutable state while automatically tracking dependencies and re-rendering only the components that read modified observable properties."
      },
      {
        id: "B",
        text: "A mobile smartphone operating system.",
        isCorrect: false,
        explanation: "MobX is a JavaScript reactive state management library."
      },
      {
        id: "C",
        text: "A CSS styling framework that replaces Tailwind.",
        isCorrect: false,
        explanation: "MobX manages application state reactively."
      },
      {
        id: "D",
        text: "A database engine for storing files on magnetic tape.",
        isCorrect: false,
        explanation: "MobX is an in-memory reactive state container for JavaScript apps."
      }
    ],
    correctAnswer: "A",
    explanation: "MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For reactJs application, you need to install below packages,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is MobX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is MobX?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Declarative programming was banned in 2015.",
        isCorrect: false,
        explanation: "Declarative UI is the foundational paradigm of modern frontend development (React, Vue, SwiftUI, Flutter)."
      },
      {
        id: "B",
        text: "Imperative code describes step-by-step *how* to mutate the DOM (`element.classList.add('active')`); Declarative code describes *what* the UI should look like for a given state (`<button className={isActive ? 'active' : ''}>`).",
        isCorrect: true,
        explanation: "Correct. React's declarative paradigm allows developers to focus on UI states while React handles the underlying imperative DOM mutations automatically."
      },
      {
        id: "C",
        text: "Imperative runs in the browser; Declarative runs in the GPU.",
        isCorrect: false,
        explanation: "Both execute in JavaScript; declarative programming abstracts away manual DOM mutations."
      },
      {
        id: "D",
        text: "There is no difference; they are exact duplicates.",
        isCorrect: false,
        explanation: "Imperative focuses on mutation steps; declarative focuses on describing state-to-UI mappings."
      }
    ],
    correctAnswer: "B",
    explanation: "Imagine a simple UI component, such as a \"Like\" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue. The imperative way of doing this would be: Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario. In contrast, the declarative approach would be: Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a sepecific state, and is therefore much simpler to understand.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Imperative and Declarative in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Imperative and Declarative in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-what-is-frontend-system-design-how-is-it-different-from",
    title: "What is Frontend System Design? How is it different from backend system design?",
    prompt: "What is Frontend System Design? How is it different from backend system design?",
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
        text: "Frontend System Design is limited strictly to graphic design, CSS animations, and visual styling mockups.",
        isCorrect: false,
        explanation: "Frontend system design is software architecture (data flow, state, network caching, performance), not visual mockup design."
      },
      {
        id: "B",
        text: "Frontend System Design is exclusively about database schema normalization and API gateway routing algorithms.",
        isCorrect: false,
        explanation: "Database schema design and API gateways are core backend distributed system concerns, not frontend UI architecture."
      },
      {
        id: "C",
        text: "Frontend System Design focuses on designing scalable UI architectures, managing component lifecycles, state boundaries, asset pipelines, and client performance.",
        isCorrect: true,
        explanation: "Correct. Frontend system design centers on client-side architecture: state hierarchies, rendering tradeoffs, bundle optimization, network caching, and accessibility."
      },
      {
        id: "D",
        text: "Frontend System Design is only relevant when building native mobile apps in Swift or Kotlin.",
        isCorrect: false,
        explanation: "Frontend system design applies across all web platforms, SPAs, SSR architectures, and multi-platform client applications."
      }
    ],
    correctAnswer: "C",
    explanation: "Frontend System Design focuses on designing scalable, performant, and maintainable UI systems. It covers component architecture, state management, rendering strategies, caching, and real-time. Frontend vs Backend System Design: Backend: servers, databases, APIs, distributed systems, microservices Frontend: component hierarchy, state management, bundle size, rendering, UX Frontend System Design covers: Component architecture (Atomic Design, Micro-frontends) State management (local, server, global, URL state) Data fetching and caching (React Query, SWR, GraphQL) Performance (code splitting, lazy loading, virtualization) Real-time (WebSockets, SSE, polling) Accessibility (ARIA, keyboard navigation, screen readers) Security (XSS, CSRF, Content Security Policy) Rendering strategies (CSR, SSR, SSG, ISR) RADIO Framework for FE interviews: Requirements Architecture Data model Interface Optimizations 1 // RADIO Framework applied to 'Design a News Feed': 2 // R, Requirements: 3 // Functional: show posts, like, comment, infinite scroll 4 // Non-functional: < 2s FCP, offline support, accessible 5 // 6 // A, Architecture: 7 // Component tree: Feed > PostCard > Actions > Comments 8 // State: Server state (React Query), UI state (useState) 9 // 10 // D, Data Model: 11 // Post: { id, author, content, media, likes, createdAt } 12 // 13 // I, Interface (API design): 14 // GET /api/feed?cursor=xxx&limit=20 15 // 16 // O, Optimizations: 17 // Virtual scroll, image lazy load, skeleton screens 18 // Optimistic updates, stale-while-revalidate caching n Interview Tip: Use the RADIO framework in every interview answer: Requirements, Architecture, Data model, Interface (API), Optimizations. Interviewers want to see structured thinking, not just code knowledge. Walk through each step out loud",
    interviewLine: "Frontend System Design focuses on designing scalable, performant, and maintainable UI systems.",
    misconception: "It covers component architecture, state management, rendering strategies, caching, and real-time.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-how-do-you-approach-component-architecture-in-a-large-s",
    title: "How do you approach component architecture in a large-scale application?",
    prompt: "How do you approach component architecture in a large-scale application?",
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
        text: "Hardcode all styles and business logic inside single monolithic page files to avoid import overhead.",
        isCorrect: false,
        explanation: "Monolithic files prevent reusability, testing, and team parallelization."
      },
      {
        id: "B",
        text: "Structure components via hierarchical composition (e.g. Atomic Design), enforce single responsibility, separate UI from container logic, and colocate related assets.",
        isCorrect: true,
        explanation: "Correct. Scalable component architecture leverages clear separation between presentation and state, atomic/layered composition, and colocation."
      },
      {
        id: "C",
        text: "Wrap every single UI element in its own global Redux connected container with full network dispatching logic.",
        isCorrect: false,
        explanation: "Over-connecting atoms to global state creates massive coupling and destroys component reusability and performance."
      },
      {
        id: "D",
        text: "Place all components in a single flat directory with global inheritance from a master BaseComponent class.",
        isCorrect: false,
        explanation: "React favors composition over inheritance; monolithic class hierarchies and flat directories become unmaintainable."
      }
    ],
    correctAnswer: "B",
    explanation: "Component architecture defines how UI is organized, composed, and reused across a large app. Atomic Design (most used pattern): Atoms, smallest units: Button, Input, Icon, Label Molecules, composed atoms: SearchBar (Input + Button) Organisms, complex sections: Header, ProductCard, DataTable Templates, page layouts with placeholder content Pages, templates with real data Key principles: Single Responsibility, each component does one thing Composition over inheritance, build complex from simple Dumb/Smart separation, UI components vs container components Colocation, keep related code (styles, tests, stories) together Folder structure for scale: /components/ui, reusable design system components /components/features, feature-specific components /hooks, custom hooks (data fetching, business logic) /pages or /routes, page-level components /lib, utilities, API clients, formatters 1 // Atomic Design implementation 2 3 // ATOM: Button 4 const Button = ( { variant, size, onClick, children } ) = > ( 5 < button className = { `btn btn-${variant} btn-${size}` } onClick = { onClick } > 6 { children } 7 < / button > 8 ) 9 10 // MOLECULE: SearchBar = Input + Button 11 const SearchBar = ( { onSearch } ) = > { 12 const [ query, setQuery ] = useState ( '' ) 13 return ( 14 < div className = 'search-bar' > 15 < Input value = { query } onChange = { e = > setQuery ( e. target. value ) } / > 16 < Button onClick = { ( ) = > onSearch ( query ) } > Search < / Button > 17 < / div > 18 ) 19 } 20 21 // ORGANISM: ProductCard = Image + Title + Price + Button 22 const ProductCard = ( { product } ) = > ( 23 < div className = 'product-card' > 24 < img src = { product. image } alt = { product. name } loading = 'lazy' / > 25 < h3 > { product. name } < / h3 >",
    interviewLine: "Component architecture defines how UI is organized, composed, and reused across a large app.",
    misconception: "Atomic Design (most used pattern): Atoms, smallest units: Button, Input, Icon, Label Molecules, composed atoms: SearchBar (Input + Button) Organisms, complex sections: Header, ProductCard, DataTable Templates, page layou",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-how-do-you-design-a-scalable-data-fetching-and-caching",
    title: "How do you design a scalable data fetching and caching layer?",
    prompt: "How do you design a scalable data fetching and caching layer?",
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
        text: "Disable all caching and force a hard page reload on every single user mutation.",
        isCorrect: false,
        explanation: "Hard reloads ruin perceived performance and negate SPA responsiveness."
      },
      {
        id: "B",
        text: "Implement stale-while-revalidate caching, request deduplication, optimistic updates with error rollback, and explicit stale/garbage-collection time controls.",
        isCorrect: true,
        explanation: "Correct. Libraries like TanStack Query or SWR provide request deduplication, background revalidation, and cache invalidation strategies."
      },
      {
        id: "C",
        text: "Execute a raw `fetch` call inside every component's render body without `useEffect` or caching abstractions.",
        isCorrect: false,
        explanation: "Fetching directly in the render body creates infinite network loops and blocks React's reconciliation phase."
      },
      {
        id: "D",
        text: "Cache all API responses permanently in `localStorage` without TTL or invalidation mechanisms.",
        isCorrect: false,
        explanation: "Uncontrolled permanent caching yields stale data, memory leaks, and quota exceeded errors on `localStorage`."
      }
    ],
    correctAnswer: "B",
    explanation: "A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully. Caching strategies: Stale-While-Revalidate (SWR), show cached, fetch in background Cache-first, show cache immediately, update if stale Network-first, always fetch fresh, fall back to cache Cache-only, offline-first apps React Query cache config: staleTime, how long data is considered fresh (no refetch) gcTime, how long to keep unused data in memory refetchOnWindowFocus, refetch when user tabs back refetchInterval, polling interval for real-time-ish data Request deduplication: React Query deduplicates: 10 components using same query = 1 API call Optimistic updates: Update UI immediately on mutation Roll back on error Improves perceived performance massively 1 // React Query with all cache strategies 2 const queryClient = new QueryClient ( { 3 defaultOptions: { 4 queries: { 5 staleTime: 60 * 1000, // 1 min, global default 6 gcTime: 5 * 60 * 1000, // 5 min in memory 7 retry: 1, // retry once on fail 8 refetchOnWindowFocus: true, 9 } 10 } 11 } ) 12 13 // Stale time per query type 14 useQuery ( { queryKey: [ 'user' ], staleTime: Infinity } ) // never refetch 15 useQuery ( { queryKey: [ 'prices' ], staleTime: 0 } ) // always fresh 16 useQuery ( { queryKey: [ 'feed' ], staleTime: 30 * 1000 } ) // 30 sec 17 18 // Optimistic update: like button 19 const likeMutation = useMutation ( { 20 mutationFn: ( postId ) = > api. likePost ( postId ), 21 onMutate: async ( postId ) = > { 22 await queryClient. cancelQueries ( { queryKey: [ 'posts' ] } ) 23 const prev = queryClient. getQueryData ( [ 'posts' ] ) 24 // Update cache immediately (optimistic) 25 queryClient. setQueryData ( [ 'posts' ], old = >",
    interviewLine: "A good caching layer prevents unnecessary API calls, keeps UI fast, and handles stale data gracefully.",
    misconception: "Caching strategies: Stale-While-Revalidate (SWR), show cached, fetch in background Cache-first, show cache immediately, update if stale Network-first, always fetch fresh, fall back to cache Cache-only, offline-first apps R",
    hints: [
      "Ask who owns the cache, when it is invalidated, and what the user sees while it is stale."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/caching"
  },
  {
    id: "system_design-design-an-autocomplete-typeahead-search-component-n-ans",
    title: "Design an autocomplete / typeahead search component",
    prompt: "Design an autocomplete / typeahead search component",
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
        text: "Download the entire backend database to `sessionStorage` on page mount and perform regex scans on the client.",
        isCorrect: false,
        explanation: "Downloading full backend datasets to the client is insecure, breaches privacy, and crashes browser memory for large datasets."
      },
      {
        id: "B",
        text: "Debounce input events (~300ms), cancel stale in-flight requests (AbortController), cache previous query results, and provide WAI-ARIA combobox accessibility.",
        isCorrect: true,
        explanation: "Correct. High-performance autocomplete requires debouncing, request aborts, client caching, keyboard navigation (Arrow/Enter), and ARIA combobox semantics."
      },
      {
        id: "C",
        text: "Use native browser `alert()` dialogs to display search suggestions to the user.",
        isCorrect: false,
        explanation: "Modal alert dialogs block thread execution and provide terrible UI/UX."
      },
      {
        id: "D",
        text: "Trigger an immediate blocking network fetch on every single `keydown` event without throttling or caching.",
        isCorrect: false,
        explanation: "Fetching on every keystroke causes race conditions, network waterfall congestion, and out-of-order response bugs."
      }
    ],
    correctAnswer: "B",
    explanation: "Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility. Key design decisions: Debounce, wait 300ms before API call (avoid call per keystroke) Minimum query length, don't search for empty or 1 char Client-side cache, same query = no duplicate API call Keyboard navigation, arrow keys, Enter to select, Escape to close Accessibility, ARIA combobox pattern, screen reader announcements Loading state, show spinner while fetching Error state, show error, allow retry Performance tricks: Abort previous request when new character typed Cache results per query string (avoid re-fetching same query) Virtualise dropdown if results > 50 ARIA requirements: role=combobox on input, role=listbox on dropdown aria-expanded, aria-activedescendant, aria-autocomplete 1 const useDebounce = ( value, delay = 300 ) = > { 2 const [ debounced, setDebounced ] = useState ( value ) 3 useEffect ( ( ) = > { 4 const timer = setTimeout ( ( ) = > setDebounced ( value ), delay ) 5 return ( ) = > clearTimeout ( timer ) // cancel on new keystroke 6 }, [ value, delay ] ) 7 return debounced 8 } 9 10 const Autocomplete = ( { onSelect } ) = > { 11 const [ query, setQuery ] = useState ( '' ) 12 const [ activeIdx, setActiveIdx ] = useState ( - 1 ) 13 const debouncedQuery = useDebounce ( query, 300 ) 14 15 // React Query: deduplicates, caches, aborts stale 16 const { data: results = [ ], isLoading } = useQuery ( { 17 queryKey: [ 'search', debouncedQuery ], 18 queryFn: ( ) = > api. search ( debouncedQuery ), 19 enabled: debouncedQuery. length > = 2, // min 2 chars 20 staleTime: 60_000, // cache 1 min 21 } ) 22 23 const handleKeyDown = ( e ) = > { 24 if ( e. key = = = 'ArrowDown' ) setActiveIdx ( i = > Math. min ( i + 1, results. length - 1 ) ) 25 if ( e. key = = = 'ArrowUp' ) setActiveIdx ( i = > Math. max ( i - 1, - 1 ) ) 26 if ( e. key = = = 'Enter' & & activeIdx > = 0 ) onSelect ( results [ activeIdx ] ) 27 if ( e. key = = = 'Escape' ) setQuery ( '' )",
    interviewLine: "Autocomplete needs fast UI response, debounced API calls, keyboard navigation, and accessibility.",
    misconception: "Key design decisions: Debounce, wait 300ms before API call (avoid call per keystroke) Minimum query length, don't search for empty or 1 char Client-side cache, same query = no duplicate API call Keyboard navigation: arrow",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-how-do-you-design-a-real-time-notification-system-on-th",
    title: "How do you design a real-time notification system on the frontend?",
    prompt: "How do you design a real-time notification system on the frontend?",
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
        text: "Poll the backend API every 10 milliseconds using a synchronous `while(true)` loop on the main thread.",
        isCorrect: false,
        explanation: "A synchronous while loop blocks the browser event loop completely, freezing the UI and causing browser crash warnings."
      },
      {
        id: "B",
        text: "Store incoming notifications strictly in volatile DOM element attributes without any React state or storage.",
        isCorrect: false,
        explanation: "DOM attribute storage is non-reactive, difficult to query, and wiped out on component re-renders."
      },
      {
        id: "C",
        text: "Send push notifications through client-to-client peer-to-peer WebRTC without any backend signaling or auth server.",
        isCorrect: false,
        explanation: "WebRTC still requires signaling and backend authentication, and is unnecessary overkill for standard push notifications."
      },
      {
        id: "D",
        text: "Use Server-Sent Events (SSE) or WebSockets with auto-reconnection, optimistic toast display, unread badge counters, and background cache invalidation.",
        isCorrect: true,
        explanation: "Correct. One-way push notifications thrive on SSE or WebSockets with automatic reconnection, offline message queues, and cache synchronization."
      }
    ],
    correctAnswer: "D",
    explanation: "Real-time notifications require a persistent connection between client and server. The right transport depends on your use case and scale requirements. Transport options comparison: WebSockets, bidirectional, full-duplex, best for chat/collaborative Server-Sent Events (SSE), one-way server client, simpler, auto-reconnect Long Polling, repeated HTTP requests, works everywhere, higher latency Which to use when: Notifications (one-way) SSE (simpler, HTTP/2 multiplexed, auto-reconnect) Chat, collaborative editing WebSockets (bidirectional) Low frequency updates Polling every 30 seconds Notification system design: Connect SSE/WS on app load Show toast on notification received Badge count in nav with unread count Mark as read on open Persist in notification center (React Query cache) Offline handling: Queue notifications while offline Fetch missed notifications on reconnect 1 // SSE (Server-Sent Events), best for notifications 2 const useNotifications = ( ) = > { 3 const [ notifications, setNotifications ] = useState ( [ ] ) 4 const queryClient = useQueryClient ( ) 5 6 useEffect ( ( ) = > { 7 const es = new EventSource ( '/api/notifications/stream', { 8 withCredentials: true, 9 } ) 10 11 es. addEventListener ( 'notification', ( e ) = > { 12 const notification = JSON. parse ( e. data ) 13 // Add to local state 14 setNotifications ( prev = > [ notification. . prev ] ) 15 // Invalidate React Query cache to sync notification center 16 queryClient. invalidateQueries ( { queryKey: [ 'notifications' ] } ) 17 // Show toast 18 toast ( notification. message ) 19 } ) 20 21 es. onerror = ( ) = > { 22 es. close ( ) 23 // Auto-reconnect after 5 seconds",
    interviewLine: "Real-time notifications require a persistent connection between client and server.",
    misconception: "The right transport depends on your use case and scale requirements.",
    hints: [
      "Ask whether updates flow one way or both, and what happens when the connection drops."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
  },
  {
    id: "system_design-how-do-you-handle-file-uploads-in-a-frontend-system-at",
    title: "How do you handle file uploads in a frontend system at scale?",
    prompt: "How do you handle file uploads in a frontend system at scale?",
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
        text: "Base64-encode large multi-gigabyte video files and send them inside a single JSON REST query string.",
        isCorrect: false,
        explanation: "Base64 increases payload size by ~33% and large query strings exceed HTTP URL length limits and exhaust memory."
      },
      {
        id: "B",
        text: "Upload files by writing them directly to the client machine's root operating system filesystem via browser JS.",
        isCorrect: false,
        explanation: "Browsers run in a sandboxed security environment and cannot arbitrarily write to the host filesystem."
      },
      {
        id: "C",
        text: "Request a short-lived S3/Cloud presigned URL from the backend, upload directly from the browser with `XMLHttpRequest`/`fetch` progress tracking, and validate size/MIME types.",
        isCorrect: true,
        explanation: "Correct. Presigned direct-to-cloud uploads bypass web application servers, reduce backend memory load, and allow granular upload progress tracking."
      },
      {
        id: "D",
        text: "Block all UI interaction with a modal spinner and disallow cancellation or background chunking.",
        isCorrect: false,
        explanation: "Good UX requires non-blocking uploads, cancellation tokens, background processing, and chunked retries."
      }
    ],
    correctAnswer: "C",
    explanation: "File upload design needs to handle large files, progress tracking, retries, and validation. Upload approaches: Direct browser server, simple but limits to server memory Presigned URL (S3), browser uploads directly to S3, server not involved Chunked upload, split large file into chunks, upload in parallel Resumable upload, resume interrupted uploads from where they stopped Presigned URL flow (best for production): 1. Frontend requests presigned URL from your server 2. Server generates S3 presigned URL (15 min expiry) 3. Frontend uploads file directly to S3 using that URL 4. Frontend tells server the S3 key when done Key UX requirements: Progress bar (track bytes uploaded) Cancel upload button File type and size validation before upload starts Retry on failure Preview before upload (FileReader API) 1 // Presigned URL upload with progress tracking 2 const useFileUpload = ( ) = > { 3 const [ progress, setProgress ] = useState ( 0 ) 4 const [ status, setStatus ] = useState ( 'idle' ) // uploading|done|error 5 6 const upload = async ( file ) = > { 7 // Validate before upload 8 if ( file. size > 10 * 1024 * 1024 ) throw new Error ( 'Max 10MB' ) 9 if (! [ 'image/jpeg', 'image/png', 'image/webp' ]. includes ( file. type ) ) 10 throw new Error ( 'Only JPEG/PNG/WebP allowed' ) 11 12 setStatus ( 'uploading' ) 13 14 // Step 1: get presigned URL from our server 15 const { presignedUrl, key } = await api. getPresignedUrl ( { 16 filename: file. name, 17 contentType: file. type 18 } ) 19 20 // Step 2: upload directly to S3 with progress tracking 21 await new Promise ( ( resolve, reject ) = > { 22 const xhr = new XMLHttpRequest ( ) 23 xhr. open ( 'PUT', presignedUrl ) 24 xhr. setRequestHeader ( 'Content-Type', file. type ) 25 26 xhr. upload. addEventListener ( 'progress', ( e ) = > {",
    interviewLine: "File upload design needs to handle large files, progress tracking, retries, and validation.",
    misconception: "Upload approaches: Direct browser server, simple but limits to server memory Presigned URL (S3), browser uploads directly to S3, server not involved Chunked upload, split large file into chunks, upload in parallel Resumab",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-explain-react-rendering-optimisation-227-memo-usememo-u",
    title: "Explain React rendering optimisation, memo, useMemo, useCallback",
    prompt: "Explain React rendering optimisation, memo, useMemo, useCallback",
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
        text: "Use `useCallback` to make asynchronous HTTP network requests run faster on the network wire.",
        isCorrect: false,
        explanation: "`useCallback` only memoizes function references in JavaScript memory; it has zero impact on network latency."
      },
      {
        id: "B",
        text: "Replace React's virtual DOM reconciliation with direct imperative `document.getElementById` mutations in event handlers.",
        isCorrect: false,
        explanation: "Bypassing React state with manual DOM mutations breaks declarative state synchronization and causes hard-to-trace UI bugs."
      },
      {
        id: "C",
        text: "Use `React.memo` to skip re-renders when props are shallow-equal, `useCallback` for stable function references, and `useMemo` for expensive computations.",
        isCorrect: true,
        explanation: "Correct. `React.memo` prevents child re-renders if props don't change, while `useCallback` and `useMemo` provide referential stability for dependencies."
      },
      {
        id: "D",
        text: "Wrap every single JSX primitive (`<div>`, `<span>`) and inline constant in `useMemo` throughout the entire codebase.",
        isCorrect: false,
        explanation: "Indiscriminate memoization adds memory overhead and dependency array checks that exceed the cost of simple primitive renders."
      }
    ],
    correctAnswer: "C",
    explanation: "React re-renders a component whenever its state or props change. The goal is to avoid unnecessary re-renders that waste CPU time. When React re-renders: State changes (useState, useReducer) Parent re-renders (unless component is memoized) Context value changes Optimization tools: React.memo, memoize a component (skip re-render if props unchanged) useMemo, memoize an expensive calculated value useCallback, memoize a function reference (stable reference) The rules: memo is useless if you pass new object/array/function props each render useMemo and useCallback only help if dependency array is stable Don't over-optimize, profile first, optimize second When to use each: React.memo, child component receives same props but parent re-renders often useCallback, function passed as prop to memoized child useMemo, expensive calculation (filtering, sorting 1000+ items) 1 // Problem: Parent re-renders, ALL children re-render unnecessarily 2 const ExpensiveChild = React. memo ( ( { items, onSelect } ) = > { 3 // Only re-renders when items or onSelect reference changes 4 return < List items = { items } onSelect = { onSelect } / > 5 } ) 6 7 const Parent = ( ) = > { 8 const [ count, setCount ] = useState ( 0 ) 9 const [ items, setItems ] = useState ( bigList ) 10 11 // n New function every render, memo is useless! 12 // const handleSelect = (id) => console.log(id) 13 14 // n Stable function reference, memo works! 15 const handleSelect = useCallback ( ( id ) = > { 16 console. log ( 'selected', id ) 17 }, [ ] ) // no deps, never recreated 18 19 // n Recalculates on every render 20 // const filtered = items.filter(i => i.active) 21 22 // n Only recalculates when items changes 23 const filtered = useMemo ( 24 ( ) = > items. filter ( i = > i. active ). sort ( ( a, b ) = > b. score - a. score )",
    interviewLine: "React re-renders a component whenever its state or props change.",
    misconception: "The goal is to avoid unnecessary re-renders that waste CPU time.",
    hints: [
      "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/useMemo"
  },
  {
    id: "system_design-how-do-you-handle-authentication-and-authorization-on-t",
    title: "How do you handle authentication and authorization on the frontend?",
    prompt: "How do you handle authentication and authorization on the frontend?",
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
        text: "Encode user admin permissions in unencrypted public URL hash fragments (`#role=admin`).",
        isCorrect: false,
        explanation: "URL fragments can be modified arbitrarily by users and provide zero security."
      },
      {
        id: "B",
        text: "Store tokens in `HttpOnly`, `Secure`, `SameSite` cookies (or short-lived memory access tokens with refresh rotation), and enforce route guards and RBAC checks.",
        isCorrect: true,
        explanation: "Correct. `HttpOnly` cookies mitigate XSS token theft, while role-based route guards provide clean navigation gating on the client."
      },
      {
        id: "C",
        text: "Save the user's plaintext password in `localStorage` and transmit it on every API call header.",
        isCorrect: false,
        explanation: "Storing plaintext passwords in `localStorage` exposes credentials to any malicious script (XSS) and violates basic security standards."
      },
      {
        id: "D",
        text: "Rely purely on client-side route guards without verifying JWT permissions on backend endpoints.",
        isCorrect: false,
        explanation: "Client-side checks are cosmetic; backend API endpoints must always enforce authentication and authorization."
      }
    ],
    correctAnswer: "B",
    explanation: "Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access. Token storage comparison: localStorage, accessible by JS, vulnerable to XSS, AVOID for tokens sessionStorage, same as localStorage, clears on tab close, AVOID HttpOnly cookies, not accessible by JS, XSS-safe, RECOMMENDED Memory (useState), most secure but lost on refresh, for short sessions Token strategy (production): Access token, short-lived (15 min), in memory or HttpOnly cookie Refresh token, long-lived (7 days), HttpOnly cookie only Server sets HttpOnly cookies, JS cannot read them Route protection: Protected routes, redirect to login if no auth Role-based, check user.role before rendering admin sections Optimistic, show UI if token exists, validate async CSRF protection: SameSite=Strict on cookies prevents CSRF for most cases For same-site cookies: no CSRF token needed 1 // Auth context with HttpOnly cookie approach 2 const AuthContext = createContext ( null ) 3 4 const AuthProvider = ( { children } ) = > { 5 const [ user, setUser ] = useState ( null ) 6 const [ loading, setLoading ] = useState ( true ) 7 8 // Validate session on app load 9 useEffect ( ( ) = > { 10 api. get ( '/auth/me' ) // server reads HttpOnly cookie 11. then ( res = > setUser ( res. data ) ) 12. catch ( ( ) = > setUser ( null ) ) 13. finally ( ( ) = > setLoading ( false ) ) 14 }, [ ] ) 15 16 const login = async ( email, password ) = > { 17 const res = await api. post ( '/auth/login', { email, password } ) 18 // Server sets HttpOnly cookie, JS never sees the token! 19 setUser ( res. data. user ) 20 } 21 22 const logout = async ( ) = > { 23 await api. post ( '/auth/logout' ) // server clears cookie 24 setUser ( null ) 25 }",
    interviewLine: "Frontend auth must be secure against XSS, CSRF, token theft, and unauthorized route access.",
    misconception: "Token storage comparison: localStorage, accessible by JS, vulnerable to XSS, AVOID for tokens sessionStorage, same as localStorage, clears on tab close, AVOID HttpOnly cookies, not accessible by JS, XSS-safe: RECOMME",
    hints: [
      "Never trust input at a boundary. Ask what is escaped, where, and by whom."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/Security"
  },
  {
    id: "system_design-how-do-you-design-an-accessible-component-library-n-ans",
    title: "How do you design an accessible component library?",
    prompt: "How do you design an accessible component library?",
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
        text: "Hardcode all icon buttons without `aria-label` or visually hidden accessible text.",
        isCorrect: false,
        explanation: "Icon-only buttons without accessible labels are announced as unlabelled buttons by screen readers."
      },
      {
        id: "B",
        text: "Replace all native `<button>` and `<input>` tags with clickable `<div>` elements without `tabIndex` or keyboard handlers.",
        isCorrect: false,
        explanation: "Non-semantic `div` tags lack keyboard accessibility, focus states, and screen reader roles."
      },
      {
        id: "C",
        text: "Set `outline: none` globally across all `:focus` CSS states without providing custom focus rings.",
        isCorrect: false,
        explanation: "Removing focus indicators makes keyboard navigation impossible for users who rely on visual focus tracking."
      },
      {
        id: "D",
        text: "Adhere to WAI-ARIA authoring practices, maintain keyboard focus management/trapping, ensure 4.5:1 color contrast, and test with screen readers (NVDA/VoiceOver).",
        isCorrect: true,
        explanation: "Correct. Accessible libraries provide semantic HTML, correct ARIA roles/states, visible focus outlines, focus trapping for modals, and automated axe-core linting."
      }
    ],
    correctAnswer: "D",
    explanation: "Accessibility ensures your app is usable by people with disabilities, and it is also required by law in many countries. WCAG 2.1 Level AA, what you must meet: 1.1, Text alternatives for images (alt text) 1.4, 4.5:1 colour contrast ratio for text 2.1, All functionality available via keyboard 2.4, Focus visible, users can see what is focused 4.1, Name, role, value, ARIA attributes correct Key ARIA patterns for components: Button, native <button> (not <div onClick>) Modal, role=dialog, aria-modal, focus trap Dropdown, role=listbox/combobox pattern Tabs, role=tablist, role=tab, role=tabpanel Accordion, button with aria-expanded Testing tools: axe-core / @axe-core/react, automated a11y checks NVDA/VoiceOver, screen reader manual testing Keyboard-only navigation test 1 // Accessible Modal with focus trap 2 const Modal = ( { isOpen, onClose, title, children } ) = > { 3 const modalRef = useRef ( null ) 4 5 // Focus trap and Escape key 6 useEffect ( ( ) = > { 7 if (! isOpen ) return 8 const modal = modalRef. current 9 const focusable = modal. querySelectorAll ( 10 'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])' 11 ) 12 const first = focusable [ 0 ] 13 const last = focusable [ focusable. length - 1 ] 14 first?. focus ( ) 15 16 const trap = ( e ) = > { 17 if ( e. key = = = 'Tab' ) { 18 if ( e. shiftKey & & document. activeElement = = = first ) { 19 e. preventDefault ( ); last. focus ( ) 20 } else if (! e. shiftKey & & document. activeElement = = = last ) { 21 e. preventDefault ( ); first. focus ( ) 22 } 23 } 24 if ( e. key = = = 'Escape' ) onClose ( ) 25 }",
    interviewLine: "Accessibility ensures your app is usable by people with disabilities, and it is also required by law in many countries.",
    misconception: "WCAG 2.1 Level AA, what you must meet: 1.1, Text alternatives for images (alt text) 1.4, 4.5:1 colour contrast ratio for text 2.1, All functionality available via keyboard 2.4, Focus visible, users can see what is",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-how-do-you-design-a-micro-frontend-architecture-n-answe",
    title: "How do you design a micro-frontend architecture?",
    prompt: "How do you design a micro-frontend architecture?",
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
        text: "Load five different duplicate major versions of React simultaneously inside the same DOM tree without singleton configuration.",
        isCorrect: false,
        explanation: "Loading multiple React runtimes bloats bundle size and breaks React context and hook lifecycles across boundaries."
      },
      {
        id: "B",
        text: "Require all engineering teams to deploy their changes simultaneously in a single synchronized release branch.",
        isCorrect: false,
        explanation: "Synchronized monolithic releases defeat the core purpose of micro-frontends, which is independent deployability."
      },
      {
        id: "C",
        text: "Leverage Webpack 5 Module Federation to dynamically load remote apps at runtime, share singleton dependencies (React), and isolate domain boundaries.",
        isCorrect: true,
        explanation: "Correct. Module Federation enables independent deployments, runtime sub-app loading, and shared dependency management without monolithic builds."
      },
      {
        id: "D",
        text: "Embed 50 separate nested `<iframe>` tags that communicate exclusively through polling `localStorage`.",
        isCorrect: false,
        explanation: "Nested iframes have severe performance, accessibility, responsive sizing, and state synchronization issues."
      }
    ],
    correctAnswer: "C",
    explanation: "Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team. Why micro-frontends: Large teams (50+ developers) cannot work on one frontend codebase Independent deployments, team A ships without waiting for team B Technology independence, one team uses React, another Vue Isolated failures, one micro-frontend crashes, others still work Implementation approaches: Module Federation (Webpack 5), share code at runtime between apps iframes, complete isolation but poor UX Web Components, framework-agnostic custom elements Single-SPA, meta-framework, mounts different SPAs on routes Challenges: Shared state between micro-frontends (use CustomEvents or shared store) Consistent design system (shared component library or design tokens) Performance, avoid loading same React version twice When NOT to use micro-frontends: Small teams (< 10 developers), overhead outweighs benefits 1 // Module Federation (Webpack 5), share components at runtime 2 3 // Host app webpack.config.js 4 new ModuleFederationPlugin ( { 5 name: 'host', 6 remotes: { 7 // Load from remote app at runtime, different deploy! 8 checkout: 'checkout@https://checkout.myapp.com/remoteEntry.js', 9 catalog: 'catalog@https://catalog.myapp.com/remoteEntry.js', 10 }, 11 shared: { 12 react: { singleton: true, requiredVersion: '^18' }, 13 'react-dom': { singleton: true }, 14 } 15 } ) 16 17 // Remote (checkout) webpack.config.js 18 new ModuleFederationPlugin ( { 19 name: 'checkout', 20 filename: 'remoteEntry.js', 21 exposes: { 22 './CheckoutFlow': './src/CheckoutFlow', // expose this component 23 }, 24 shared: { react: { singleton: true } }",
    interviewLine: "Micro-frontends split a large frontend monolith into independently deployable pieces, each owned by a different team.",
    misconception: "Why micro-frontends: Large teams (50+ developers) cannot work on one frontend codebase Independent deployments, team A ships without waiting for team B Technology independence, one team uses React, another Vue Isolated failures, one micro-f",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "system_design-how-do-you-handle-internationalisation-i18n-and-localis",
    title: "How do you handle internationalisation (i18n) and localisation (l10n) at scale?",
    prompt: "How do you handle internationalisation (i18n) and localisation (l10n) at scale?",
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
        text: "Hardcode text strings in components and use Google Translate DOM widget injection on client load.",
        isCorrect: false,
        explanation: "Client-side page translation widgets cause layout flickering, break React virtual DOM reconciliation, and produce inaccurate translations."
      },
      {
        id: "B",
        text: "Store all language translations for all 50 global languages inside a single monolithic synchronous `main.js` bundle.",
        isCorrect: false,
        explanation: "Shipping all languages to all users inflates bundle size with unused translation data."
      },
      {
        id: "C",
        text: "Format all currencies and dates with manual string splitting and hardcoded '$' symbols.",
        isCorrect: false,
        explanation: "Currency and date formats vary significantly by locale; using native `Intl.NumberFormat` and `Intl.DateTimeFormat` is essential."
      },
      {
        id: "D",
        text: "Extract strings into structured translation dictionaries (e.g. `react-i18next`), split locale bundles on demand, use `Intl` for dates/currencies, and support RTL layouts.",
        isCorrect: true,
        explanation: "Correct. Enterprise i18n/l10n requires ICU message formatting for pluralization, lazy-loaded locale JSONs, native `Intl` formatting, and bidirectional CSS (RTL/LTR)."
      }
    ],
    correctAnswer: "D",
    explanation: "i18n makes your app available in multiple languages. l10n adapts content for specific regions. i18n concerns: Translation strings, externalized text, keyed by ID Pluralisation, '1 item', '2 items', different in every language Date/time formats, DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD Number formats, 1,000.00 (US) vs 1.000,00 (Germany/India) Currency, $ 1,000 vs Rs. 1,000 vs 1.000 RTL languages, Arabic, Hebrew require layout mirror Text expansion, German translations are 30% longer than English React i18n libraries: react-i18next, most popular, feature-rich react-intl (FormatJS), based on ICU message format Architecture: Translation files in /locales/en.json, /locales/hi.json Load only needed locale (code split!) ICU message format for pluralisation and variables 1 // react-i18next setup 2 import i18n from 'i18next' 3 import { initReactI18next } from 'react-i18next' 4 import LanguageDetector from 'i18next-browser-languagedetector' 5 6 i18n. use ( LanguageDetector ). use ( initReactI18next ). init ( { 7 fallbackLng: 'en', 8 interpolation: { escapeValue: false }, 9 backend: { loadPath: '/locales/{{lng}}.json' } // load only needed lang 10 } ) 11 12 // locales/en.json 13 // { 14 // 'cart.items': '{{count}} item', 15 // 'cart.items_plural': '{{count}} items', 16 // 'welcome': 'Welcome, {{name}}!' 17 // } 18 19 // Component usage 20 const Cart = ( { itemCount } ) = > { 21 const { t } = useTranslation ( ) 22 return ( 23 < div > 24 < h2 > { t ( 'welcome', { name: 'Kaushal' } ) } < / h2 > 25 < p > { t ( 'cart.items', { count: itemCount } ) } < / p > 26 < / div > 27 )",
    interviewLine: "i18n makes your app available in multiple languages.",
    misconception: "l10n adapts content for specific regions.",
    hints: [
      "Locale changes number, date and plural rules, not just strings. Never build a sentence by concatenating fragments."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
  },
  {
    id: "system_design-how-do-you-design-a-design-system-from-scratch-n-answer",
    title: "How do you design a Design System from scratch?",
    prompt: "How do you design a Design System from scratch?",
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
        text: "Hardcode hex color codes and arbitrary pixel margins inside every component's inline styles.",
        isCorrect: false,
        explanation: "Hardcoded values prevent centralized theming (dark mode) and violate visual design consistency."
      },
      {
        id: "B",
        text: "Copy random CSS snippets from StackOverflow into global component stylesheets without tokens or consistency.",
        isCorrect: false,
        explanation: "Ad-hoc CSS snippets lead to inconsistent styling, specificity wars, and unmaintainable UI code."
      },
      {
        id: "C",
        text: "Establish design tokens (colors, spacing, typography) as CSS variables, build composable accessible primitive components, and document variants in Storybook.",
        isCorrect: true,
        explanation: "Correct. A design system scales through layered architecture: semantic design tokens, headless/styled primitives, composite components, and interactive documentation."
      },
      {
        id: "D",
        text: "Create 50 different variations of a Button component named `ButtonPrimaryBlue`, `ButtonPrimaryGreen`, etc.",
        isCorrect: false,
        explanation: "Design systems favor composable props (e.g. `variant='primary' | 'secondary'`, `color='brand'`) over discrete duplicated components."
      }
    ],
    correctAnswer: "C",
    explanation: "A Design System is a shared language between design and engineering, consistent components, tokens, and patterns used across all products. Design System layers: Design tokens, primitive values (colours, spacing, typography, shadows) Core/Base components, Button, Input, Modal, Card (unstyled or minimal) Composite components, DataTable, DatePicker, RichTextEditor Documentation, Storybook, usage guidelines, do's and don'ts Design tokens: Color:, color-brand-500, color-text-primary Spacing:, space-1 (4px), space-2 (8px), space-4 (16px) Typography:, font-size-sm, font-weight-bold Shadows:, shadow-sm, shadow-lg Component API design principles: Composable, build complex from simple Accessible by default, ARIA built-in Customizable, accept className or style for override Well-documented, Storybook stories for every variant 1 // Design tokens (CSS custom properties) 2: root { 3 / * Colors * / 4 - - color - brand - 50: # EFF6FF; 5 - - color - brand - 500: # 3B82F6; 6 - - color - brand - 900: # 1E3A8A; 7 - - color - text - primary: # 1F2937; 8 - - color - text - secondary: # 6B7280; 9 / * Spacing ( 4px base grid ) * / 10 - - space - 1: 4px; - - space - 2: 8px; 11 - - space - 4: 16px; - - space - 8: 32px; 12 / * Typography * / 13 - - font - size - sm: 14px; - - font - size - base: 16px; 14 - - font - weight - bold: 600; 15 } 16 17 // Button component with variants 18 const Button = ( { 19 variant = 'primary', 20 size = 'md', 21 disabled = false, 22 loading = false, 23 leftIcon, 24 children, 25 onClick, 26.. props",
    interviewLine: "A Design System is a shared language between design and engineering, consistent components, tokens, and patterns used across all products.",
    misconception: "Design System layers: Design tokens, primitive values (colours, spacing, typography, shadows) Core/Base components, Button, Input, Modal, Card (unstyled or minimal) Composite components, DataTable, DatePicker, RichTextEditor Documentation, ",
    hints: [
      "Start from the constraint: how much data, how often it changes, and who reads it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "system_design-how-do-you-design-a-rich-text-editor-n-answer-rich-text",
    title: "How do you design a rich text editor?",
    prompt: "How do you design a rich text editor?",
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
        text: "Re-render the entire editor component tree from scratch on every single keystroke without virtual selection state.",
        isCorrect: false,
        explanation: "Full component re-renders on every keystroke cause caret jumping, IME composition bugs, and typing lag."
      },
      {
        id: "B",
        text: "Adopt a headless schema-driven editor engine (e.g. TipTap, Lexical, Slate), store structured JSON document state, and sanitize exported HTML.",
        isCorrect: true,
        explanation: "Correct. Production rich-text editors rely on structured document tree models (ProseMirror/TipTap, Lexical) rather than unreliable `contenteditable` execCommands."
      },
      {
        id: "C",
        text: "Store raw unsanitized user HTML directly in the database without XSS validation or AST parsing.",
        isCorrect: false,
        explanation: "Unsanitized HTML storage creates critical XSS attack vectors."
      },
      {
        id: "D",
        text: "Use raw `<div contenteditable>` and rely entirely on `document.execCommand` for all formatting actions.",
        isCorrect: false,
        explanation: "`document.execCommand` is deprecated, produces inconsistent cross-browser HTML, and is notorious for formatting bugs."
      }
    ],
    correctAnswer: "B",
    explanation: "Rich text editors are one of the most complex frontend components to build correctly. Libraries (always use a library): TipTap, most modern, headless, extensible (recommended) Lexical (Meta), most performant, built for React Slate.js, highly customizable, low-level Quill, simpler use cases Architecture decisions: Store format, HTML (easy display) vs JSON (portable, safer) Collaboration, real-time co-editing requires CRDT (Y.js) Image upload, handle file upload, store URL in editor Sanitization, sanitize HTML before storing to prevent XSS Key features to design: Toolbar with formatting options Keyboard shortcuts (Ctrl+B, Ctrl+I) Mentions (@user) with autocomplete Image embedding with upload Link editing with preview 1 import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react' 2 import StarterKit from '@tiptap/starter-kit' 3 import Image from '@tiptap/extension-image' 4 import Link from '@tiptap/extension-link' 5 import Mention from '@tiptap/extension-mention' 6 7 const RichEditor = ( { initialContent, onSave } ) = > { 8 const editor = useEditor ( { 9 extensions: [ 10 StarterKit, 11 Image. configure ( { inline: false } ), 12 Link. configure ( { openOnClick: false } ), 13 Mention. configure ( { 14 suggestion: { 15 items: ( { query } ) = > searchUsers ( query ), 16 } 17 } ) 18 ], 19 content: initialContent, 20 onUpdate: ( { editor } ) = > { 21 // Autosave as JSON (not HTML, safer, portable) 22 debouncedSave ( editor. getJSON ( ) ) 23 } 24 } ) 25 26 const insertImage = async ( file ) = > {",
    interviewLine: "Rich text editors are one of the most complex frontend components to build correctly.",
    misconception: "Libraries (always use a library): TipTap, most modern, headless, extensible (recommended) Lexical (Meta), most performant, built for React Slate.js, highly customizable, low-level Quill, simpler use cases Architecture decisions: Store forma",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "system_design-how-do-you-design-a-data-visualisation-system-n-answer",
    title: "How do you design a data visualisation system?",
    prompt: "How do you design a data visualisation system?",
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
        text: "Render 500,000 interactive SVG DOM elements simultaneously and attach React `onClick` listeners to each.",
        isCorrect: false,
        explanation: "500,000 SVG DOM elements overwhelm browser layout engines and crash tab memory; Canvas or WebGL must be used."
      },
      {
        id: "B",
        text: "Disable responsive resizing and render charts with fixed immutable pixel dimensions on all screen sizes.",
        isCorrect: false,
        explanation: "Modern data visualization requires responsive sizing via `ResizeObserver` and responsive viewBox configurations."
      },
      {
        id: "C",
        text: "Recompute heavy statistical regressions synchronously on the main thread on every mouse hover tick.",
        isCorrect: false,
        explanation: "Heavy calculations on the main thread drop frame rates; heavy math should be memoized or computed in Web Workers."
      },
      {
        id: "D",
        text: "Choose SVG for interactive low-element charts and Canvas/WebGL for 10k+ data points, debouncing resize observers and offloading data processing to Web Workers.",
        isCorrect: true,
        explanation: "Correct. Scalable data viz selects the rendering engine by scale: SVG for crisp DOM/accessibility with <1000 nodes, Canvas/WebGL for high-density time-series."
      }
    ],
    correctAnswer: "D",
    explanation: "Data visualizations need to handle large datasets, be accessible, responsive, and performant. Libraries comparison: Recharts, React-first, simple API, good for dashboards Victory, React-first, composable, accessible D3.js, most powerful, low-level, steep learning curve Chart.js, canvas-based, very fast for large datasets Observable Plot, modern D3 alternative Key design decisions: SVG vs Canvas, SVG: accessible, scalable. Canvas: 10x faster for 10K+ points Responsive, charts must resize with container (use ResizeObserver) Color, accessible color scales (colorblind-safe palettes) Animation, smooth transitions between data updates Tooltips, show value on hover with ARIA Performance for large datasets: > 1K data points, use Canvas (Chart.js or D3 canvas) Data aggregation on server, don't send 100K rows to client Zoom and pan, load more data on zoom 1 // Recharts: responsive dashboard chart 2 import { ResponsiveContainer, AreaChart, Area, 3 XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts' 4 5 const RevenueChart = ( { data } ) = > ( 6 < ResponsiveContainer width = '100%' height = { 300 } > 7 < AreaChart data = { data } margin = { { top: 10, right: 30, bottom: 0, left: 0 } } > 8 < defs > 9 < linearGradient id = 'revenueGradient' x1 = '0' y1 = '0' x2 = '0' y2 = '1' > 10 < stop offset = '5%' stopColor = '#3B82F6' stopOpacity = { 0. 8 } / > 11 < stop offset = '95%' stopColor = '#3B82F6' stopOpacity = { 0 } / > 12 < / linearGradient > 13 < / defs > 14 < CartesianGrid strokeDasharray = '3 3' stroke = '#374151' / > 15 < XAxis dataKey = 'date' tick = { { fill: '#9CA3AF' } } / > 16 < YAxis tickFormatter = { v = > `Rs.${(v/1000).toFixed(0)}K` } tick = { { fill: '#9CA3AF' } } / > 17 < Tooltip 18 formatter = { ( v ) = > [ `Rs. ${v.toLocaleString('en-IN')}`, 'Revenue' ] } 19 contentStyle = { { background: '#1F2937', border: 'none', borderRadius: 8 } } 20 / > 21 < Area type = 'monotone' dataKey = 'revenue' 22 stroke = '#3B82F6' fill = 'url(#revenueGradient)' strokeWidth = { 2 } / > 23 < / AreaChart > 24 < / ResponsiveContainer > 25 ) 26",
    interviewLine: "Data visualizations need to handle large datasets, be accessible, responsive, and performant.",
    misconception: "Libraries comparison: Recharts, React-first, simple API, good for dashboards Victory, React-first, composable, accessible D3.js, most powerful, low-level, steep learning curve Chart.js, canvas-based, very fast for large datasets Observable ",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-a-youtube-video-streaming-frontend-n-answer-requ",
    title: "Design a YouTube / video streaming frontend",
    prompt: "Design a YouTube / video streaming frontend",
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
        text: "Run video decoding computations manually in JavaScript using `eval()` scripts.",
        isCorrect: false,
        explanation: "Video decoding is handled by browser hardware-accelerated video decoders and MSE, not software eval scripts."
      },
      {
        id: "B",
        text: "Download full 4K 10GB MP4 video files completely into browser memory before starting playback.",
        isCorrect: false,
        explanation: "Full-file downloads cause massive startup latency and fail on bandwidth-constrained or memory-limited devices."
      },
      {
        id: "C",
        text: "Integrate adaptive bitrate streaming (HLS/DASH via `hls.js`), buffer management, custom accessible video controls, theater/fullscreen states, and quality selectors.",
        isCorrect: true,
        explanation: "Correct. Video streaming platforms manage video chunks via Media Source Extensions (MSE) with adaptive bitrate switching and custom keyboard-accessible player controls."
      },
      {
        id: "D",
        text: "Rely entirely on browser default video controls without custom overlay controls, analytics, or keyboard shortcuts.",
        isCorrect: false,
        explanation: "Production video platforms require custom branded controls, keyboard accessibility (J/K/L, space, arrows), and telemetry."
      }
    ],
    correctAnswer: "C",
    explanation: "Requirements: Video player with adaptive bitrate streaming (HLS/DASH) Recommendations feed with thumbnails Search with autocomplete Comments (threaded), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or native HTML5 <video> + HLS.js Thumbnails: lazy loaded, WebP format Feed: infinite scroll + virtualization (100s of videos) Real-time: view count, live chat via WebSockets/SSE Performance critical path: LCP = video thumbnail, preload above-the-fold thumbnails Lazy load thumbnails below fold Start loading video metadata before user clicks Buffer next 30 seconds of video Adaptive bitrate streaming: HLS segments at 360p, 720p, 1080p, 4K Player switches quality based on bandwidth 1 // HLS video player 2 import Hls from 'hls.js' 3 4 const VideoPlayer = ( { src, poster } ) = > { 5 const videoRef = useRef ( null ) 6 7 useEffect ( ( ) = > { 8 const video = videoRef. current 9 if (! video ) return 10 11 if ( Hls. isSupported ( ) ) { 12 const hls = new Hls ( { 13 startLevel: - 1, // auto quality selection 14 maxBufferLength: 30, // buffer 30 seconds ahead 15 enableWorker: true, // offload to Web Worker 16 } ) 17 hls. loadSource ( src ) // .m3u8 playlist 18 hls. attachMedia ( video ) 19 return ( ) = > hls. destroy ( ) 20 } else if ( video. canPlayType ( 'application/vnd.apple.mpegurl' ) ) { 21 video. src = src // Safari native HLS 22 }",
    interviewLine: "Requirements: Video player with adaptive bitrate streaming (HLS/DASH) Recommendations feed with thumbnails Search with autocomplete Comments (threaded), likes, subscriptions Chapters, timestamps, captions Architecture: Player: Video.js or n",
    misconception: "video ) return 10 11 if ( Hls.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-a-twitter-x-feed-frontend-n-answer-requirements",
    title: "Design a Twitter / X feed frontend",
    prompt: "Design a Twitter / X feed frontend",
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
        text: "Render all loaded tweets continuously in the DOM tree without virtualization as the user scrolls for hours.",
        isCorrect: false,
        explanation: "Unbounded DOM growth over long sessions consumes hundreds of megabytes of RAM and introduces severe scroll lag."
      },
      {
        id: "B",
        text: "Refetch the entire timeline from page 1 on every like or retweet interaction.",
        isCorrect: false,
        explanation: "Refetching the whole feed resets scroll position and creates excessive network overhead."
      },
      {
        id: "C",
        text: "Disable image placeholders and let images pop into view causing sudden layout shifts.",
        isCorrect: false,
        explanation: "Missing aspect-ratio placeholders causes severe Cumulative Layout Shift (CLS) as media loads."
      },
      {
        id: "D",
        text: "Combine virtualized infinite scrolling with windowed DOM nodes, optimistic mutation updates (likes/retweets), cursor-based pagination, and media lazy loading.",
        isCorrect: true,
        explanation: "Correct. Feed architectures rely on DOM virtualization, optimistic mutations with rollback, cursor pagination, and responsive media placeholders to maintain 60fps scrolling."
      }
    ],
    correctAnswer: "D",
    explanation: "Requirements: Infinite scrolling timeline (newest first) Tweet composer with character counter, image/video upload Real-time new tweets notification ('10 new tweets') Likes, retweets, replies (all optimistic) Trending topics sidebar User profile with follower/following counts Architecture decisions: Virtualized list (10K tweets in memory, must virtualize!) Real-time: SSE for new tweet notifications Tweet state: local cache in React Query Media: images on CDN with responsive srcset New tweets UX pattern (Twitter's actual pattern): Don't auto-scroll to new tweets (distracting) Show 'X new tweets' banner at top User clicks to load, preserves scroll position Tweet composer optimizations: Debounce character count calculation Preview images before upload Paste image from clipboard support 1 // Tweet feed with real-time new tweet notification 2 const Feed = ( ) = > { 3 const [ pendingCount, setPendingCount ] = useState ( 0 ) 4 const queryClient = useQueryClient ( ) 5 6 // SSE: listen for new tweets 7 useEffect ( ( ) = > { 8 const es = new EventSource ( '/api/feed/stream' ) 9 es. addEventListener ( 'new_tweet', ( e ) = > { 10 // Don't auto-insert, show notification instead 11 setPendingCount ( c = > c + 1 ) 12 // Stage tweet in query cache for instant load on click 13 const tweet = JSON. parse ( e. data ) 14 queryClient. setQueryData ( [ 'feed' ], old = > ( { 15.. old, 16 pending: [.. ( old?. pending | | [ ] ), tweet ] 17 } ) ) 18 } ) 19 return ( ) = > es. close ( ) 20 }, [ ] ) 21",
    interviewLine: "Requirements: Infinite scrolling timeline (newest first) Tweet composer with character counter, image/video upload Real-time new tweets notification ('10 new tweets') Likes, retweets, replies (all optimistic) Trending topics sidebar User pr",
    misconception: "addEventListener ( 'new_tweet', ( e ) = > { 10 // Don't auto-insert, show notification instead 11 setPendingCount ( c = > c + 1 ) 12 // Stage tweet in query cache for instant load on click 13 const tweet = JSON.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-an-e-commerce-product-page-with-add-to-cart-n-an",
    title: "Design an e-commerce product page with add-to-cart",
    prompt: "Design an e-commerce product page with add-to-cart",
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
        text: "Use pure client-side rendering (CSR) without metadata, allowing search engines to index empty white pages.",
        isCorrect: false,
        explanation: "E-commerce relies heavily on organic search traffic; SSR or SSG with structured schema markup is vital for SEO rankings."
      },
      {
        id: "B",
        text: "Coordinate variant/SKU selection state with URL sync, image gallery carousel with zoom, optimistic cart mutations, and server-side rendering (SSR/SSG) for SEO.",
        isCorrect: true,
        explanation: "Correct. E-commerce product detail pages require fast SSR for SEO, URL-synced variant matrices (size/color), image zoom previewing, and optimistic cart updates."
      },
      {
        id: "C",
        text: "Force a full page reload and navigate the user away to a blank page whenever they click 'Add to Cart'.",
        isCorrect: false,
        explanation: "Full page reloads disrupt shopping flow; drawer sidebars or optimistic toast confirmations provide superior UX."
      },
      {
        id: "D",
        text: "Download all 20 high-resolution 4000px product photos immediately on initial page load.",
        isCorrect: false,
        explanation: "Unoptimized images delay First Contentful Paint; lazy loading and responsive `srcset` formats are required."
      }
    ],
    correctAnswer: "B",
    explanation: "Requirements: Product images gallery (zoom, multiple images, video) Variants selector (size, colour), SKU availability Add to cart with quantity selector Reviews and ratings (paginated, sortable) Related products carousel Sticky add-to-cart button on mobile Performance priorities: LCP = product hero image, preload it! Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart (immediate feedback) Structured data (SEO): JSON-LD for Product schema, price, availability, ratings Google shows price and ratings in search results 1 // Product page architecture 2 const ProductPage = async ( { params } ) = > { 3 // SSR: product data for SEO + fast initial paint 4 const product = await db. product. findUnique ( { 5 where: { slug: params. slug }, 6 include: { variants: true, images: true } 7 } ) 8 9 return ( 10 < > 11 { / * Structured data for Google rich results * / } 12 < script type = 'application/ld+json' > { JSON. stringify ( { 13 '@context': 'https://schema.org', 14 '@type': 'Product', 15 name: product. name, 16 offers: { '@type': 'Offer', price: product. price, availability: 'InStock' }, 17 aggregateRating: { ratingValue: product. rating, reviewCount: product. reviewCount } 18 } ) } < / script > 19 < ProductView product = { product } / > 20 < / > 21 ) 22 } 23 24 // Client component: interactive parts",
    interviewLine: "Requirements: Product images gallery (zoom, multiple images, video) Variants selector (size, colour), SKU availability Add to cart with quantity selector Reviews and ratings (paginated, sortable) Related products carousel Sticky add-to-cart",
    misconception: "Image gallery: show thumbnail strip, lazy load full images Reviews: load below the fold, paginated Inventory management UX: Disable out-of-stock variants visually Show 'Only 3 left!' for low stock Optimistic add-to-cart (immediate feedback)",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-a-google-docs-style-collaborative-document-edito",
    title: "Design a Google Docs-style collaborative document editor",
    prompt: "Design a Google Docs-style collaborative document editor",
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
        text: "Implement a CRDT (Yjs) or Operational Transformation (OT) data model over WebSockets, with remote presence awareness (multi-user carets), offline edits, and undo/redo stacks.",
        isCorrect: true,
        explanation: "Correct. Real-time collaborative editors require conflict resolution algorithms (CRDTs/OT), remote cursor presence, and local change reconciliation."
      },
      {
        id: "B",
        text: "Send the entire raw text string across HTTP POST on every keystroke and overwrite the server copy.",
        isCorrect: false,
        explanation: "Full-document overwrites cause race conditions, destroy concurrent edits, and fail completely in multi-user collaboration."
      },
      {
        id: "C",
        text: "Lock the entire document so only one person in the world can type at any given time.",
        isCorrect: false,
        explanation: "Pessimistic locking turns a collaborative editor into a single-user sequential workflow."
      },
      {
        id: "D",
        text: "Store document history exclusively in local browser cookies.",
        isCorrect: false,
        explanation: "Cookies have a 4KB limit and cannot store document contents or version history."
      }
    ],
    correctAnswer: "A",
    explanation: "Requirements: Real-time collaborative editing (multiple users simultaneously) Cursor presence (see where others are) Rich text formatting Offline support (edit offline, sync when reconnected) Version history Comments and suggestions Technical approach: Y.js CRDT, conflict-free data structure for collaborative editing TipTap editor, integrates with Y.js out of the box WebSocket provider, y-websocket for real-time sync IndexedDB, offline persistence via y-indexeddb CRDT vs OT (Operational Transformation): OT (Google's approach), complex, requires central server for conflict resolution CRDT (Y.js), math guarantees eventual consistency, no central coordinator Y.js is now preferred by most new collaborative tools 1 import * as Y from 'yjs' 2 import { WebsocketProvider } from 'y-websocket' 3 import { IndexeddbPersistence } from 'y-indexeddb' 4 import { useEditor, EditorContent } from '@tiptap/react' 5 import Collaboration from '@tiptap/extension-collaboration' 6 import CollaborationCursor from '@tiptap/extension-collaboration-cursor' 7 8 const CollabEditor = ( { docId, user } ) = > { 9 const ydoc = useMemo ( ( ) = > new Y. Doc ( ), [ ] ) 10 11 // WebSocket sync: real-time collaboration 12 const wsProvider = useMemo ( ( ) = > new WebsocketProvider ( 13 'wss://api.myapp.com', 14 docId, 15 ydoc 16 ), [ docId, ydoc ] ) 17 18 // IndexedDB: offline persistence 19 useMemo ( ( ) = > new IndexeddbPersistence ( docId, ydoc ), [ docId, ydoc ] ) 20 21 const editor = useEditor ( { 22 extensions: [ 23 Collaboration. configure ( { document: ydoc } ), 24 CollaborationCursor. configure ( { 25 provider: wsProvider, 26 user: { name: user. name, color: user. color } 27 } )",
    interviewLine: "Requirements: Real-time collaborative editing (multiple users simultaneously) Cursor presence (see where others are) Rich text formatting Offline support (edit offline, sync when reconnected) Version history Comments and suggestions T",
    misconception: "Doc ( ), [ ] ) 10 11 // WebSocket sync: real-time collaboration 12 const wsProvider = useMemo ( ( ) = > new WebsocketProvider ( 13 'wss://api.myapp.com', 14 docId, 15 ydoc 16 ), [ docId, ydoc ] ) 17 18 // IndexedDB: offline pe",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-a-dashboard-with-charts-filters-and-real-time-up",
    title: "Design a Dashboard with charts, filters, and real-time updates",
    prompt: "Design a Dashboard with charts, filters, and real-time updates",
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
        text: "Trigger a single massive monolithic API request that must complete before any dashboard widget or card can render.",
        isCorrect: false,
        explanation: "Monolithic API calls block all widgets on the slowest endpoint; independent widget queries load progressively."
      },
      {
        id: "B",
        text: "Synchronize date/filter controls with URL search params, decouple widget data fetching with independent React Query hooks, and throttle real-time chart updates.",
        isCorrect: true,
        explanation: "Correct. Robust dashboards isolate widget fetching so slow queries don't block fast cards, sync filters to shareable URLs, and throttle incoming socket streams."
      },
      {
        id: "C",
        text: "Re-render all chart canvases 100 times per second regardless of whether data has changed.",
        isCorrect: false,
        explanation: "Unnecessary canvas redraws overload GPU/CPU and drain user battery."
      },
      {
        id: "D",
        text: "Prevent users from bookmarking or sharing dashboard views by disallowing URL filter parameters.",
        isCorrect: false,
        explanation: "URL state persistence is a fundamental requirement for operational dashboards and collaborative triage."
      }
    ],
    correctAnswer: "B",
    explanation: "Requirements: KPI cards (revenue, users, conversions) Time-series charts with date range filter Real-time updates (revenue updates every few seconds) Responsive layout (grid rearranges on mobile) Export to PDF/CSV Drill-down capability Architecture: Grid layout: CSS Grid, responsive breakpoints Charts: Recharts with responsive containers Real-time: polling every 30s or SSE for high-frequency Date filter: URL state (shareable dashboard state) Export: html2canvas + jsPDF or server-side PDF generation Performance: Aggregate data server-side, don't send raw 1M rows Cache chart data in React Query with smart staleTime Skeleton screens for every widget 1 // Dashboard with URL-synced filters 2 const Dashboard = ( ) = > { 3 const [ params, setParams ] = useSearchParams ( ) 4 const dateRange = { 5 from: params. get ( 'from' ) | | subDays ( new Date ( ), 30 ). toISOString ( ), 6 to: params. get ( 'to' ) | | new Date ( ). toISOString ( ) 7 } 8 9 // React Query with auto-refetch for real-time feel 10 const { data: kpis } = useQuery ( { 11 queryKey: [ 'dashboard', 'kpis', dateRange ], 12 queryFn: ( ) = > api. getKPIs ( dateRange ), 13 refetchInterval: 30_000, // refresh every 30 seconds 14 } ) 15 16 const { data: chartData } = useQuery ( { 17 queryKey: [ 'dashboard', 'revenue', dateRange ], 18 queryFn: ( ) = > api. getRevenueChart ( dateRange ), 19 staleTime: 5 * 60_000, // 5 min, chart data can be stale 20 } ) 21 22 return ( 23 < div className = 'dashboard' > 24 < DateRangePicker 25 value = { dateRange } 26 onChange = { ( { from, to } ) = > {",
    interviewLine: "Requirements: KPI cards (revenue, users, conversions) Time-series charts with date range filter Real-time updates (revenue updates every few seconds) Responsive layout (grid rearranges on mobile) Export to PDF/CSV Drill-down capabilit",
    misconception: "get ( 'from' ) | | subDays ( new Date ( ), 30 ).",
    hints: [
      "Ask whether updates flow one way or both, and what happens when the connection drops."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
  },
  {
    id: "system_design-design-a-chat-application-like-whatsapp-n-answer-requir",
    title: "Design a chat application like WhatsApp",
    prompt: "Design a chat application like WhatsApp",
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
        text: "Poll an HTTP endpoint every 5 seconds without WebSocket or push notification fallback.",
        isCorrect: false,
        explanation: "Polling introduces unacceptable message delays (latency up to 5s) and creates massive server overhead."
      },
      {
        id: "B",
        text: "Store all chat history strictly in React component memory state, clearing all messages on page refresh.",
        isCorrect: false,
        explanation: "Chat apps require persistent storage (IndexedDB / SQLite / Cache) so conversations survive reloads and offline sessions."
      },
      {
        id: "C",
        text: "Render 10,000 chat message bubbles directly into the DOM tree without virtualization.",
        isCorrect: false,
        explanation: "Unvirtualized chat histories cause severe scrolling jank and high DOM memory usage."
      },
      {
        id: "D",
        text: "Use WebSockets for bidirectional messaging, IndexedDB for local offline message persistence, virtualized message lists, and optimistic delivery/read receipts.",
        isCorrect: true,
        explanation: "Correct. Chat systems combine WebSockets for low-latency delivery, IndexedDB for offline-first chat history, virtualization for long conversations, and status ticks."
      }
    ],
    correctAnswer: "D",
    explanation: "Requirements: Real-time messaging (delivered instantly) Message status: sent, delivered, read (ticks) Offline support, send queued when reconnected End-to-end encryption (display-only) Media sharing (images, files, voice messages) Group chats Push notifications Architecture: WebSockets for real-time messaging IndexedDB for local message storage (offline support) Message queue for offline sends Virtual list for chat history (thousands of messages) Message delivery flow: 1. User sends message stored locally (pending) 2. Sent to server via WebSocket 3. Server stores and delivers to recipient 4. Server sends ACK update to delivered 5. Recipient opens server notifies sent update to read 1 // Chat message store with offline support 2 const useChatMessages = ( chatId ) = > { 3 const [ messages, setMessages ] = useState ( [ ] ) 4 const { send, connected } = useWebSocket ( `wss://api/chat/${chatId}` ) 5 6 const sendMessage = useCallback ( ( text ) = > { 7 const msg = { 8 id: crypto. randomUUID ( ), 9 chatId, 10 text, 11 sentAt: new Date ( ). toISOString ( ), 12 status: connected? 'sending': 'queued', 13 } 14 // Optimistic: show immediately 15 setMessages ( m = > [.. m, msg ] ) 16 // Store in IndexedDB for offline persistence 17 db. messages. put ( msg ) 18 19 if ( connected ) { 20 send ( 'message', msg ) 21 } else { 22 // Queue for later 23 messageQueue. push ( msg ) 24 }",
    interviewLine: "Requirements: Real-time messaging (delivered instantly) Message status: sent, delivered, read (ticks) Offline support, send queued when reconnected End-to-end encryption (display-only) Media sharing (images, files, voice messages) Group cha",
    misconception: "User sends message stored locally (pending) 2.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-design-a-netflix-style-video-streaming-frontend-n-answe",
    title: "Design a Netflix-style video streaming frontend",
    prompt: "Design a Netflix-style video streaming frontend",
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
        text: "Store video progress timestamps only in browser memory and reset to 0 on every page refresh.",
        isCorrect: false,
        explanation: "Playback timestamps must be persisted to local storage and synced to the backend so users can resume seamlessly."
      },
      {
        id: "B",
        text: "Implement adaptive bitrate streaming (HLS/DASH), debounced hover video preview timers, virtualized horizontal content carousels, and resume-playback timestamp sync.",
        isCorrect: true,
        explanation: "Correct. Streaming interfaces manage video chunking via MSE, debounce hover preview trailers to prevent network churn, and sync resume progress."
      },
      {
        id: "C",
        text: "Re-render the entire carousel row whenever a single card is hovered.",
        isCorrect: false,
        explanation: "Hover animations should be isolated to individual cards or CSS transforms to prevent row-wide re-rendering."
      },
      {
        id: "D",
        text: "Autoplay full unmuted 4K video streams for every item in all carousels simultaneously on page load.",
        isCorrect: false,
        explanation: "Playing dozens of video streams at once crashes the browser and exhausts user network bandwidth."
      }
    ],
    correctAnswer: "B",
    explanation: "Requirements: Content discovery (browse, search, categories) Video playback with adaptive streaming (HLS/DASH) Continue watching (resume from last position) Hover preview (autoplay short clip on hover) Profiles (multiple users per account) Download for offline (PWA or native app only) Performance priorities: Content grid: virtualized rows (each row is lazy-loaded) Thumbnails: WebP, responsive srcset Hover preview: delay 500ms, prefetch on hover Hero banner: critical image, preload Playback architecture: HLS: adaptive bitrate (auto quality switch) DRM: Widevine/PlayReady for protected content Progress sync: save position every 10 seconds to server Resume: fetch last position on load 1 // Continue watching progress persistence 2 const useVideoProgress = ( videoId ) = > { 3 const saveProgress = useMutation ( { 4 mutationFn: ( { position } ) = > api. saveProgress ( { videoId, position } ), 5 } ) 6 7 // Save position every 10 seconds 8 const handleTimeUpdate = useCallback ( 9 debounce ( ( currentTime ) = > { 10 saveProgress. mutate ( { position: currentTime } ) 11 }, 10_000 ), 12 [ videoId ] 13 ) 14 15 // Restore position on load 16 const { data: savedProgress } = useQuery ( { 17 queryKey: [ 'progress', videoId ], 18 queryFn: ( ) = > api. getProgress ( videoId ), 19 } ) 20 21 return { handleTimeUpdate, startPosition: savedProgress?. position? ? 0 } 22 } 23 24 // Hover preview with delay 25 const ContentCard = ( { content } ) = > { 26 const [ showPreview, setShowPreview ] = useState ( false )",
    interviewLine: "Requirements: Content discovery (browse, search, categories) Video playback with adaptive streaming (HLS/DASH) Continue watching (resume from last position) Hover preview (autoplay short clip on hover) Profiles (multiple users per account) ",
    misconception: "saveProgress ( { videoId, position } ), 5 } ) 6 7 // Save position every 10 seconds 8 const handleTimeUpdate = useCallback ( 9 debounce ( ( currentTime ) = > { 10 saveProgress.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-how-do-you-handle-error-states-and-loading-states-in-a",
    title: "How do you handle error states and loading states in a large app?",
    prompt: "How do you handle error states and loading states in a large app?",
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
        text: "Replace the entire website with a blank white screen whenever any subresource fails to load.",
        isCorrect: false,
        explanation: "Blank white screens represent catastrophic failure; localized error boundaries isolate component crashes."
      },
      {
        id: "B",
        text: "Display raw unformatted backend HTTP 500 JSON error objects directly to end users.",
        isCorrect: false,
        explanation: "Raw server exceptions confuse users and leak internal system implementation details."
      },
      {
        id: "C",
        text: "Show a generic alert modal that cannot be dismissed on any network timeout.",
        isCorrect: false,
        explanation: "Non-dismissible blocking alerts ruin UX; inline retry buttons allow users to recover smoothly."
      },
      {
        id: "D",
        text: "Provide granular UI states (skeleton screens, empty states, inline error retry triggers), and wrap fault-tolerant component zones in separate Error Boundaries.",
        isCorrect: true,
        explanation: "Correct. Resilient applications isolate failures so one broken widget doesn't crash the entire screen, using skeletons for perceived speed and actionable error states."
      }
    ],
    correctAnswer: "D",
    explanation: "Consistent loading and error handling is what separates amateur from professional UIs. Loading state types: Skeleton screens, placeholder shapes matching content (best UX) Spinners, for small areas or button loading Progress bars, for uploads, long operations Shimmer animations, animate skeleton for better perceived speed Error state types: Empty states, no data (search with 0 results, empty cart) Network errors, API failed, show retry Validation errors, inline at form fields Boundary errors, crash with helpful message, log to Sentry React Suspense + Error Boundary pattern: Suspense wraps async data-fetching components ErrorBoundary catches render errors Use both together at route and component levels Key principle: EVERY possible state must have a UI: loading, error, empty, success 1 // Suspense + ErrorBoundary wrapper 2 const AsyncBoundary = ( { children, fallback, errorFallback } ) = > ( 3 < ErrorBoundary fallback = { errorFallback? ? < DefaultError / > } > 4 < Suspense fallback = { fallback? ? < DefaultSkeleton / > } > 5 { children } 6 < / Suspense > 7 < / ErrorBoundary > 8 ) 9 10 // Usage: every async section wrapped 11 < AsyncBoundary fallback = { < ProductGridSkeleton / > } > 12 < ProductGrid / > 13 < / AsyncBoundary > 14 15 // Skeleton component 16 const ProductCardSkeleton = ( ) = > ( 17 < div className = 'skeleton-card' aria - busy = 'true' aria - label = 'Loading product' > 18 < div className = 'skeleton-img' / > { / * animate shimmer * / } 19 < div className = 'skeleton-line w-3/4' / > 20 < div className = 'skeleton-line w-1/2' / > 21 < div className = 'skeleton-btn' / > 22 < / div > 23 ) 24 25 // Empty state component",
    interviewLine: "Consistent loading and error handling is what separates amateur from professional UIs.",
    misconception: "Loading state types: Skeleton screens, placeholder shapes matching content (best UX) Spinners, for small areas or button loading Progress bars, for uploads, long operations Shimmer animations, animate skeleton for better p",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "system_design-how-do-you-design-a-search-system-with-faceted-filterin",
    title: "How do you design a search system with faceted filtering?",
    prompt: "How do you design a search system with faceted filtering?",
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
        text: "Clear all selected filters whenever a user changes the sort dropdown order.",
        isCorrect: false,
        explanation: "Sorting should preserve active facet filters rather than resetting user search criteria."
      },
      {
        id: "B",
        text: "Hardcode all filter options and disallow multiple concurrent facet selections.",
        isCorrect: false,
        explanation: "Faceted search requires multi-select dimensions (e.g. brand, price range, rating, category)."
      },
      {
        id: "C",
        text: "Execute full-table client-side linear scans across millions of unindexed products in JavaScript.",
        isCorrect: false,
        explanation: "Searching millions of items client-side exhausts memory; search indexing and faceted aggregation belong on search engines (Elastic/Meili/Algolia)."
      },
      {
        id: "D",
        text: "Serialize filter state into URL parameters, debounce text queries, display facet counts with optimistic updates, and fetch results asynchronously with abort controllers.",
        isCorrect: true,
        explanation: "Correct. Faceted search relies on shareable URL serialization, debounced input, cancelable API requests, and faceted count aggregations."
      }
    ],
    correctAnswer: "D",
    explanation: "Faceted search (Amazon/Flipkart style) allows users to filter by multiple attributes simultaneously. Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state, share filtered search results Architecture: Search backend: Algolia, Elasticsearch, or Typesense Frontend state: filters in URL params (shareable!) Debounce text input: 300ms to avoid search per keystroke Instant search: show results as user types Algolia React InstantSearch: Built-in debouncing, highlighting, facets, pagination Most production search UIs use Algolia or similar 1 import algoliasearch from 'algoliasearch' 2 import { InstantSearch, SearchBox, RefinementList, 3 Hits, Pagination, RangeInput } from 'react-instantsearch' 4 5 const searchClient = algoliasearch ( APP_ID, SEARCH_KEY ) 6 7 const SearchPage = ( ) = > ( 8 < InstantSearch 9 searchClient = { searchClient } 10 indexName = 'products' 11 routing // sync with URL automatically! 12 > 13 < div className = 'search-layout' > 14 < aside className = 'filters' > 15 < RefinementList attribute = 'category' / > 16 < RangeInput attribute = 'price' / > 17 < RefinementList attribute = 'brand' searchable / > 18 < RefinementList attribute = 'rating' / > 19 < / aside > 20 21 < main > 22 < SearchBox placeholder = 'Search products.' / > 23 < Hits hitComponent = { ProductCard } / > 24 < Pagination / > 25 < / main > 26 < / div > 27 < / InstantSearch > 28 )",
    interviewLine: "Faceted search (Amazon/Flipkart style) allows users to filter by multiple attributes simultaneously.",
    misconception: "Requirements: Full-text search with relevance ranking Facets: category, price range, rating, brand, availability Filters update results in real-time without page reload Filter counts show how many results each value has URL state: share",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "system_design-how-do-you-approach-frontend-performance-auditing-n-ans",
    title: "How do you approach frontend performance auditing?",
    prompt: "How do you approach frontend performance auditing?",
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
        text: "Assume all performance issues are caused by network bandwidth rather than main-thread JavaScript execution.",
        isCorrect: false,
        explanation: "Heavy JS execution, layout thrashing, and unoptimized re-renders frequently degrade user experience even on fast fiber connections."
      },
      {
        id: "B",
        text: "Audit systematically using Chrome DevTools Performance profiler, analyze bundle chunks with source-map-explorer, measure Core Web Vitals (RUM/Lighthouse), and eliminate layout thrashing.",
        isCorrect: true,
        explanation: "Correct. Performance auditing combines synthetic lab benchmarks (Lighthouse, flame charts) with real user monitoring (CWV) and bundle composition analysis."
      },
      {
        id: "C",
        text: "Guess performance bottlenecks by looking at source code without running profiler tools or collecting metrics.",
        isCorrect: false,
        explanation: "Intuition is notoriously inaccurate for performance bottlenecks; profiling and data-driven metrics are essential."
      },
      {
        id: "D",
        text: "Disable all compression (Gzip/Brotli) and minify flags to make debugging easier in production.",
        isCorrect: false,
        explanation: "Unminified, uncompressed assets multiply payload size by 4-5x, crippling load times for users."
      }
    ],
    correctAnswer: "B",
    explanation: "A systematic approach to performance auditing finds the biggest wins quickly. Performance auditing toolkit: Lighthouse, overall score, CWV, opportunities WebPageTest, real-device testing, waterfall view Chrome DevTools Performance tab, frame-by-frame analysis React DevTools Profiler, component render times Bundle Analyzer (vite-bundle-visualizer), what is in your bundle? Audit process (in order): 1. Lighthouse audit on production (incognito mode) 2. Identify lowest-scoring CWV metric 3. DevTools > Performance > Record page load 4. Find long tasks (>50ms), break them up 5. Bundle analysis, find large dependencies to code-split Common wins (90th percentile): Add preload for LCP image, +0.5-1s LCP Code split routes, -40-60% initial bundle Image optimization (WebP + srcset), -30-50% image bytes Remove unused CSS, trim Tailwind properly defer/async for non-critical scripts 1 // Bundle analysis: vite-bundle-visualizer 2 // npx vite-bundle-visualizer 3 // Shows treemap of all modules and their sizes 4 5 // Find and eliminate large imports: 6 // moment.js: 300KB replace with date-fns (tree-shakeable) 7 // lodash: 70KB use lodash-es with tree shaking 8 // import { debounce } from 'lodash-es' // only imports debounce 9 10 // Measure real user performance 11 import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals' 12 const reportToAnalytics = ( metric ) = > { 13 gtag ( 'event', metric. name, { 14 value: Math. round ( metric. name = = = 'CLS'? metric. value * 1000: metric. value ), 15 event_category: 'Web Vitals', 16 non_interaction: true 17 } ) 18 } 19 onCLS ( reportToAnalytics ) 20 onINP ( reportToAnalytics ) 21 onLCP ( reportToAnalytics ) 22 23 // Find component render bottlenecks 24 // React DevTools Profiler",
    interviewLine: "A systematic approach to performance auditing finds the biggest wins quickly.",
    misconception: "Performance auditing toolkit: Lighthouse, overall score, CWV, opportunities WebPageTest, real-device testing, waterfall view Chrome DevTools Performance tab, frame-by-frame analysis React DevTools Profiler, component render",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals"
  }
];
