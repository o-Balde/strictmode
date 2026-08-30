import { QuizQuestion } from '../types';

export const REACT_RENDERING_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-how-to-render-an-array-of-elements",
    title: "How to render an array of elements?",
    prompt: "How to render an array of elements?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "const languages = [\n  \"JavaScript\",\n  \"TypeScript\",\n  \"Python\",\n];\n\nfunction App() {\n  return (\n    <div>\n      <ul>{languages.map((language) => <li>{language}</li>)}</ul>\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Concatenate all objects into a single string using Array.prototype.join('') and pass it to <div text={...}>.",
        isCorrect: false,
        explanation: "Strings do not render interactive component hierarchies; React expects an array of React elements."
      },
      {
        id: "B",
        text: "Iterate over the array using Array.prototype.map() and return JSX elements, assigning a unique and stable key prop to each item.",
        isCorrect: true,
        explanation: "Correct. map() transforms each data item into a React element, with unique keys allowing React to track element identity across re-renders."
      },
      {
        id: "C",
        text: "Use a for loop directly inside JSX tags without returning an array.",
        isCorrect: false,
        explanation: "JSX expressions must evaluate to values (arrays, strings, elements); raw for statements are not valid inline JSX expressions."
      },
      {
        id: "D",
        text: "Render the array by calling document.createElement('li') imperatively inside the parent JSX.",
        isCorrect: false,
        explanation: "Imperative DOM calls bypass React's declarative rendering model and break reconciliation."
      }
    ],
    correctAnswer: "B",
    explanation: "To render an array of elements, you can use the map() method to iterate over the array and return a new array of React elements. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to render an array of elements?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to render an array of elements?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-jsx",
    title: "What is JSX?",
    prompt: "What is JSX?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const someElement = React.createElement(\n  'h3',\n  {className: 'title__value'},\n  'Some Title Value'\n);\n\nconst someElement = (\n  <h3 className='title__value'>Some Title Value</h3>\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A syntax extension for JavaScript that looks like HTML/XML and compiles down to `React.createElement` or JSX runtime `_jsx` function calls.",
        isCorrect: true,
        explanation: "Correct. JSX provides an expressive HTML-like syntax for declaring UI elements that compilers transpile into standard JavaScript function calls."
      },
      {
        id: "B",
        text: "A new programming language that runs directly in web browsers without any build or compilation step.",
        isCorrect: false,
        explanation: "Browsers do not natively understand JSX; it must be compiled into standard JavaScript by tools like Babel, SWC, or ESBuild."
      },
      {
        id: "C",
        text: "A CSS preprocessor similar to Sass that compiles stylesheets into CSS modules.",
        isCorrect: false,
        explanation: "JSX describes UI component structure, not CSS stylesheet styling rules."
      },
      {
        id: "D",
        text: "A database query syntax similar to GraphQL for querying PostgreSQL tables.",
        isCorrect: false,
        explanation: "JSX is a UI template syntax for JavaScript, not a database query language."
      }
    ],
    correctAnswer: "A",
    explanation: "By default, the following syntax is used to create elements in react. But we are used to seeing it like this This is exactly what the markup is called jsx. This is a kind of language extension that simplifies the perception of code and development Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is JSX?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-render-an-element-conditionally",
    title: "How to render an element conditionally?",
    prompt: "How to render an element conditionally?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "return (\n  <div>\n    {isVisible && <span>I'm visible!</span>}\n  </div>\n);\n\nreturn (\n  <div>\n    {isOnline ? <span>I'm online!</span>: <span>I'm offline</span>}\n  </div>\n);\n\nif (isOnline) {\n  element = <span>I'm online!</span>;\n} else {\n  element = <span>I'm offline</span>;\n}\n\nreturn (\n  <div>\n    {element}\n  </div>\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use the `v-if` and `v-else` HTML attributes on JSX tags.",
        isCorrect: false,
        explanation: "`v-if` is Vue.js template syntax, not valid React JSX."
      },
      {
        id: "B",
        text: "Use JavaScript operators like ternary (`condition ? <A /> : <B />`), logical AND (`condition && <A />`), or early `if/return` statements.",
        isCorrect: true,
        explanation: "Correct. Conditional rendering in React uses standard JavaScript control flow constructs (ternaries, short-circuit `&&`, `if` statements)."
      },
      {
        id: "C",
        text: "Call `document.write()` inside the JSX return block to conditionally inject elements.",
        isCorrect: false,
        explanation: "`document.write()` breaks React virtual DOM rendering and is prohibited in modern web development."
      },
      {
        id: "D",
        text: "Wrap elements in `<ng-container *ngIf='condition'>` tags.",
        isCorrect: false,
        explanation: "`*ngIf` is Angular template syntax, not React JSX."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use any conditional operators, including ternary. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to render an element conditionally?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to render an element conditionally?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-react-fragment",
    title: "What is React Fragment?",
    prompt: "What is React Fragment?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<>\n  <OneChild />\n  <AnotherChild />\n</>\n// or\n<React.Fragment>\n  <OneChild />\n  <AnotherChild />\n</React.Fragment>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A special database chunk stored inside IndexedDB.",
        isCorrect: false,
        explanation: "Fragments exist only in React virtual DOM element hierarchies."
      },
      {
        id: "B",
        text: "A micro-frontend bundle that is loaded over a CDN network connection.",
        isCorrect: false,
        explanation: "Fragments are standard React JSX elements used for DOM grouping."
      },
      {
        id: "C",
        text: "A component that lets you group a list of children without adding extra, redundant wrapper nodes (like `<div>`) to the DOM.",
        isCorrect: true,
        explanation: "Correct. `<React.Fragment>` (or shorthand `<>...</>`) allows returning multiple adjacent JSX elements without wrapping them in extra DOM tags."
      },
      {
        id: "D",
        text: "A broken piece of a component that crashed due to an unhandled exception.",
        isCorrect: false,
        explanation: "Fragment is a structural grouping utility in JSX, not a crashed error state."
      }
    ],
    correctAnswer: "C",
    explanation: "Returning multiple elements from a component is a common practice in React. Fragments allow you to form a list of child elements without creating unnecessary nodes in the DOM. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Fragment?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Fragment?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-do-we-need-keys-in-lists-when-using-map",
    title: "Why do we need keys in lists when using map()?",
    prompt: "Why do we need keys in lists when using map()?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const languages = [\n  {\n    id: 1,\n    lang: \"JavaScript\",\n  },\n  {\n    id: 2,\n    lang: \"TypeScript\",\n  },\n  {\n    id: 3,\n    lang: \"Python\",\n  },\n];\n\nconst App = () => {\n  return (\n    <div>\n      <ul>{languages.map((language) => (\n        <li key={`${language.id}_${language.lang}`}>{language.lang}</li>\n      ))}\n      </ul>\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Keys generate unique database primary keys on the backend server automatically.",
        isCorrect: false,
        explanation: "Keys are client-side JSX attributes used solely during Virtual DOM diffing."
      },
      {
        id: "B",
        text: "Keys are required to encrypt list item data against cross-site scripting attacks.",
        isCorrect: false,
        explanation: "`key` is a diffing hint for React's reconciliation engine, not an encryption parameter."
      },
      {
        id: "C",
        text: "Keys tell the browser which CSS stylesheet file to apply to each row.",
        isCorrect: false,
        explanation: "CSS classes (`className`) style elements; keys manage React virtual DOM identity."
      },
      {
        id: "D",
        text: "Keys give list elements stable identities so React can track insertions, deletions, and reorders without unnecessarily recreating DOM nodes.",
        isCorrect: true,
        explanation: "Correct. Keys allow React's reconciliation algorithm to match previous and next children efficiently, preserving internal state and DOM focus."
      }
    ],
    correctAnswer: "D",
    explanation: "The keys help React determine which elements have been changed, added, or removed. They must be specified so that React can match array elements over time. The best way to choose a key is to use a string that will clearly distinguish the list item from its neighbors. Most often, you will use the IDs from your data as keys. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do we need keys in lists when using map()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do we need keys in lists when using map()?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-what-is-react",
    title: "What is React?",
    prompt: "What is React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A full-stack MVC backend framework that includes built-in ORM database models and authentication controllers.",
        isCorrect: false,
        explanation: "React is a frontend view library, not a monolithic full-stack MVC backend framework."
      },
      {
        id: "B",
        text: "An open-source JavaScript library for building user interfaces based on declarative, component-driven architecture and a Virtual DOM reconciliation engine.",
        isCorrect: true,
        explanation: "Correct. React is a declarative, efficient, and flexible JavaScript library for building user interfaces using composable components."
      },
      {
        id: "C",
        text: "A native desktop operating system window manager written in C++.",
        isCorrect: false,
        explanation: "React is a web/mobile UI JavaScript library, not an OS window manager."
      },
      {
        id: "D",
        text: "A closed-source proprietary database engine developed for Oracle Cloud.",
        isCorrect: false,
        explanation: "React is open-source under the MIT license and created for UI development."
      }
    ],
    correctAnswer: "B",
    explanation: "React is a front-end and open-source JavaScript library which is useful in developing user interfaces specifically for applications with a single page. It is helpful in building complex and reusable user interface(UI) components of mobile and web applications as it follows the component-based approach. The important features of React are: It supports server-side rendering. It will make use of the virtual DOM rather than real DOM (Data Object Model) as RealDOM manipulations are expensive. It follows unidirectional data binding or data flow. It uses reusable or composable UI components for developing the view. Create a free personalised study plan Create a FREE custom study plan Get into your dream companies with expert guidance Get into your dream companies with expert. Real-Life Problems Prep for Target Roles Custom Plan Duration Flexible Plans Create My Plan",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-keys-in-react",
    title: "What are keys in React?",
    prompt: "What are keys in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const ids = [1,2,3,4,5];\nconst listElements = ids.map((id)=>{\nreturn(\n<li key={id.toString()}>\n  {id}\n</li>\n)\n})",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Unique string/number attributes passed to list items that help React identify which items were added, removed, or reordered during reconciliation.",
        isCorrect: true,
        explanation: "Correct. Keys provide stable identity across renders, allowing React's diffing algorithm to preserve element state and minimize DOM mutations."
      },
      {
        id: "B",
        text: "Global CSS selectors used to apply color themes to table rows.",
        isCorrect: false,
        explanation: "Keys do not style elements; styling is handled via CSS classes and styles."
      },
      {
        id: "C",
        text: "Secret cryptographic tokens used to decrypt HTTPS network payloads in client components.",
        isCorrect: false,
        explanation: "React `key` props are internal Virtual DOM diffing identifiers, not cryptographic keys."
      },
      {
        id: "D",
        text: "Database primary keys that must be globally unique across the entire World Wide Web.",
        isCorrect: false,
        explanation: "Keys only need to be unique among sibling elements in the rendered array, not globally unique."
      }
    ],
    correctAnswer: "A",
    explanation: "A key is a special string attribute that needs to be included when using lists of elements. Example of a list using key - Importance of keys - Keys help react identify which elements were added, changed or removed. Keys should be given to array elements for providing a unique identity for each element. Without keys, React does not understand the order or uniqueness of each element. With keys, React has an idea of which particular element was deleted, edited, and added. Keys are generally used for displaying a list of data coming from an API. ***Note- Keys used within arrays should be unique among siblings. They need not be globally unique. Learn via our Video Courses",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are keys in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are keys in React?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-what-are-the-differences-between-controlled-and-uncontr",
    title: "What are the differences between controlled and uncontrolled components?",
    prompt: "What are the differences between controlled and uncontrolled components?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "function FormValidation(props) {\nlet [inputValue, setInputValue] = useState(\"\");\nlet updateInput = e => {\n  setInputValue(e.target.value);\n};\nreturn (\n  <div>\n    <form>\n      <input type=\"text\" value={inputValue} onChange={updateInput} />\n    </form>\n  </div>\n);\n}\n\nfunction FormValidation(props) {\nlet inputValue = React.createRef();\nlet handleSubmit = e => {\n  alert(`Input value: ${inputValue.current.value}`);\n  e.preventDefault();\n};\nreturn (\n  <div>\n    <form onSubmit={handleSubmit}>\n      <input type=\"text\" ref={inputValue} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  </div>\n);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Controlled inputs are only supported in mobile web browsers.",
        isCorrect: false,
        explanation: "Controlled and uncontrolled patterns apply across all web and mobile platforms."
      },
      {
        id: "B",
        text: "Uncontrolled inputs cannot be submitted in HTML forms.",
        isCorrect: false,
        explanation: "Uncontrolled inputs submit naturally in standard HTML form submissions and can be read via `ref`."
      },
      {
        id: "C",
        text: "Controlled inputs do not allow user typing; uncontrolled inputs accept typing.",
        isCorrect: false,
        explanation: "Both accept user input; controlled components update state handlers on each keystroke to reflect changes."
      },
      {
        id: "D",
        text: "Controlled inputs have their value stored in and updated by React state via `value` and `onChange`; uncontrolled inputs maintain their own internal state in the DOM accessed via `ref`.",
        isCorrect: true,
        explanation: "Correct. In controlled inputs, React state is the single source of truth; uncontrolled inputs rely on the native DOM node state."
      }
    ],
    correctAnswer: "D",
    explanation: "Controlled and uncontrolled components are just different approaches to handling input from elements in react. Feature Uncontrolled Controlled Name attrs One-time value retrieval (e.g. on submit),, Validating on submit,, Field-level Validation,, Conditionally disabling submit button,, Enforcing input format,, several inputs for one piece of data,, dynamic inputs,, Controlled component: In a controlled component, the value of the input element is controlled by React. We store the state of the input element inside the code, and by using event-based callbacks, any changes made to the input element will be reflected in the code as well. When a user enters data inside the input element of a controlled component, onChange function gets triggered and inside the code, we check whether the value entered is valid or invalid. If the value is valid, we change the state and re-render the input element with the new value. Example of a controlled component: As one can see in the code above, the value of the input element is determined by the state of the inputValue variable. Any changes made to the input element is handled by the updateInput function. Uncontrolled component: In an uncontrolled component, the value of the input element is handled by the DOM itself. Input elements inside uncontrolled components work just like normal HTML input form elements. The state of the input element is handled by the DOM. Whenever the value of the input element is changed, event-based callbacks are not called. Basically, react does not perform any action when there are changes made to the input element. Whenever use enters data inside the input field, the updated data is shown directly. To access the value of the input element, we can use ref. Example of an uncontrolled component: As one can see in the code above, we are not using onChange function to govern the changes made to the input element. Instead, we are using ref to access the value of the input element.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the differences between controlled and uncontrolled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the differences between controlled and uncontrolled components?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-what-are-error-boundaries",
    title: "What are error boundaries?",
    prompt: "What are error boundaries?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "class CounterComponent extends React.Component{\nconstructor(props){\n  super(props);\n  this.state = {\n    counterValue: 0\n  }\n  this.incrementCounter = this.incrementCounter.bind(this);\n}\nincrementCounter(){\n  this.setState(prevState => counterValue = prevState+1);\n}\nrender(){\n  if(this.state.counter === 2){\n    throw new Error('Crashed');\n  }\n  return(\n    <div>\n      <button onClick={this.incrementCounter}>Increment Value</button>\n      <p>Value of counter: {this.state.counterValue}</p>\n    </div>\n  )\n}\n}\n\nclass ErrorBoundary extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = { hasError: false };\n}\nstatic getDerivedStateFromError(error) {     \n  return { hasError: true };\u00a0\n}\n componentDidCatch(error, errorInfo) {       \n  logErrorToMyService(error, errorInfo);\u00a0\n}\nrender() {\n  if (this.state.hasError) {     \n    return <h4>Something went wrong</h4>     \n  }\n  return this.props.children;\n}\n}\n\n<ErrorBoundary>\n <CounterComponent/>\n</ErrorBoundary>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A TypeScript syntax feature that validates JSON schemas at compile time.",
        isCorrect: false,
        explanation: "Error boundaries operate at runtime during React reconciliation and rendering."
      },
      {
        id: "B",
        text: "A special type of HTML `<form>` validation attribute.",
        isCorrect: false,
        explanation: "Error boundaries are React components for error handling, not form validation."
      },
      {
        id: "C",
        text: "Middleware that catches 404 Not Found network errors on the backend server.",
        isCorrect: false,
        explanation: "Error boundaries catch client-side React rendering exceptions in the UI tree, not backend HTTP errors."
      },
      {
        id: "D",
        text: "Class components implementing `static getDerivedStateFromError` and/or `componentDidCatch` to catch JavaScript errors in their child component tree and display a fallback UI.",
        isCorrect: true,
        explanation: "Correct. Error boundaries prevent the entire application from crashing to a blank white screen when an uncaught runtime error occurs during rendering."
      }
    ],
    correctAnswer: "D",
    explanation: "Introduced in version 16 of React, Error boundaries provide a way for us to catch errors that occur in the render phase. What is an error boundary? Any component which uses one of the following lifecycle methods is considered an error boundary.In what places can an error boundary detect an error? Render phase Inside a lifecycle method Inside the constructor Without using error boundaries: In the code above, when the counterValue equals 2, we throw an error inside the render method. When we are not using the error boundary, instead of seeing an error, we see a blank page. Since any error inside the render method leads to unmounting of the component. To display an error that occurs inside the render method, we use error boundaries. With error boundaries: As mentioned above, error boundary is a component using one or both of the following methods: static getDerivedStateFromError and componentDidCatch. Let, s create an error boundary to handle errors in the render phase: In the code above, getDerivedStateFromError function renders the fallback UI interface when the render method has an error. componentDidCatch logs the error information to an error tracking service. Now with the error boundary, we can render the CounterComponent in the following way:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are error boundaries?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are error boundaries?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-how-to-create-a-switching-component-for-displaying-diff",
    title: "How to create a switching component for displaying different pages?",
    prompt: "How to create a switching component for displaying different pages?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import HomePage from './HomePage'\nimport AboutPage from './AboutPage'\nimport FacilitiesPage from './FacilitiesPage'\nimport ContactPage from './ContactPage'\nimport HelpPage from './HelpPage'\nconst PAGES = {\n home: HomePage,\n about: AboutPage,\n facilitiess: FacilitiesPage,\n contact: ContactPage\n help: HelpPage\n}\nconst Page = (props) => {\n const Handler = PAGES[props.page] || HelpPage\n return <Handler {...props} />\n}\n// The PAGES object keys can be used in the prop types for catching errors during dev-time.\nPage.propTypes = {\n page: PropTypes.oneOf(Object.keys(PAGES)).isRequired\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use `eval()` to execute strings of JSX code fetched from external URLs.",
        isCorrect: false,
        explanation: "`eval()` is insecure, slow, and completely inappropriate for React component switching."
      },
      {
        id: "B",
        text: "Map page/component identifiers in an object dictionary `const PAGES = { home: Home, about: About }` and render dynamically `<Component {...props} />`.",
        isCorrect: true,
        explanation: "Correct. A switching component maps a prop key to component definitions, rendering the selected component dynamically with fallback handling."
      },
      {
        id: "C",
        text: "Hardcode 50 nested `if/else` statements modifying `document.body.innerHTML` directly.",
        isCorrect: false,
        explanation: "Directly modifying `innerHTML` breaks React virtual DOM mounting and lifecycle tracking."
      },
      {
        id: "D",
        text: "Create 50 separate `index.html` files and reload the browser page on every switch.",
        isCorrect: false,
        explanation: "Full page reloads negate single-page application benefits and reset client state."
      }
    ],
    correctAnswer: "B",
    explanation: "A switching component refers to a component that will render one of the multiple components. We should use an object for mapping prop values to components. A below-given example will show you how to display different pages based on page prop using switching component:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create a switching component for displaying different pages?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create a switching component for displaying different pages?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-re-render-the-view-when-the-browser-is-resized",
    title: "How to re-render the view when the browser is resized?",
    prompt: "How to re-render the view when the browser is resized?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "class WindowSizeDimensions extends React.Component {\n constructor(props){\n   super(props);\n   this.updateDimension = this.updateDimension.bind(this);\n }\n  \n componentWillMount() {\n   this.updateDimension()\n }\n componentDidMount() {\n   window.addEventListener('resize', this.updateDimension)\n }\n componentWillUnmount() {\n   window.removeEventListener('resize', this.updateDimension)\n }\n updateDimension() {\n   this.setState({width: window.innerWidth, height: window.innerHeight})\n }\n render() {\n   return <span>{this.state.width} x {this.state.height}</span>\n }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Call `window.location.reload()` on every resize event tick.",
        isCorrect: false,
        explanation: "Reloading the page on every resize creates a jarring user experience and resets app state."
      },
      {
        id: "B",
        text: "Poll `window.innerWidth` in a synchronous while loop on the main thread.",
        isCorrect: false,
        explanation: "A synchronous while loop blocks the main thread and causes the browser tab to freeze."
      },
      {
        id: "C",
        text: "Add a `resize` event listener in `useEffect` (or `componentDidMount`) that updates state with `window.innerWidth/innerHeight`, removing the listener in cleanup.",
        isCorrect: true,
        explanation: "Correct. Subscribing to window resize and updating component state triggers a re-render with the new viewport dimensions, with cleanup preventing leaks."
      },
      {
        id: "D",
        text: "Rely strictly on CSS `@media` queries to update JavaScript state variables.",
        isCorrect: false,
        explanation: "CSS media queries adapt stylesheet rules, but cannot update JavaScript component state variables directly."
      }
    ],
    correctAnswer: "C",
    explanation: "It is possible to listen to the resize event in componentDidMount() and then update the width and height dimensions. It requires the removal of the event listener in the componentWillUnmount() method. Using the below-given code, we can render the view when the browser is resized.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to re-render the view when the browser is resized?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to re-render the view when the browser is resized?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-what-are-the-different-ways-to-style-a-react-component",
    title: "What are the different ways to style a React component?",
    prompt: "What are the different ways to style a React component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 style={{ color: \"Yellow\" }}>This is a heading</h3>\n       <p style={{ fontSize: \"32px\" }}>This is a paragraph</p>\n     </div>\n   );\n }\n}\n\nclass RandomComponent extends React.Component {\n paragraphStyles = {\n   color: \"Red\",\n   fontSize: \"32px\"\n };\n\n headingStyles = {\n   color: \"blue\",\n   fontSize: \"48px\"\n };\n\n render() {\n   return (\n     <div>\n       <h3 style={this.headingStyles}>This is a heading</h3>\n       <p style={this.paragraphStyles}>This is a paragraph</p>\n     </div>\n   );\n }\n}\n\nimport './RandomComponent.css';\n\nclass RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 className=\"heading\">This is a heading</h3>\n       <p className=\"paragraph\">This is a paragraph</p>\n     </div>\n   );\n }\n}\n\n.paragraph{\n color:\"red\";\n border:1px solid black;\n}\n\nimport styles from  './styles.module.css';\n\nclass RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 className=\"heading\">This is a heading</h3>\n       <p className={styles.paragraph} >This is a paragraph</p>\n     </div>\n   );\n }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React components can only be styled using native browser Flash animations.",
        isCorrect: false,
        explanation: "Adobe Flash is obsolete and unrelated to React component styling."
      },
      {
        id: "B",
        text: "Inline styles (JS objects), CSS stylesheets, CSS Modules (scoped class names), CSS-in-JS libraries (styled-components/Emotion), and utility-first CSS (Tailwind).",
        isCorrect: true,
        explanation: "Correct. React supports multiple styling paradigms ranging from scoped CSS modules and Tailwind utility classes to dynamic CSS-in-JS and inline styles."
      },
      {
        id: "C",
        text: "Styles can only be applied by editing browser C++ source code directly.",
        isCorrect: false,
        explanation: "Styles are declared using standard CSS, CSS modules, inline styles, or CSS-in-JS."
      },
      {
        id: "D",
        text: "React disallows using any external CSS files in production.",
        isCorrect: false,
        explanation: "External CSS stylesheets and bundled CSS modules are standard in React applications."
      }
    ],
    correctAnswer: "B",
    explanation: "There are many different ways through which one can style a React component. Some of the ways are: Inline Styling: We can directly style an element using inline style attributes. Make sure the value of style is a JavaScript object: Using JavaScript object: We can create a separate JavaScript object and set the desired style properties. This object can be used as the value of the inline style attribute. CSS Stylesheet: We can create a separate CSS file and write all the styles for the component inside that file. This file needs to be imported inside the component file. CSS Modules: We can create a separate CSS module and import this module inside our component. Create a file with.module.css, extension, styles.module.css: We can import this file inside the component and use it:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the different ways to style a React component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the different ways to style a React component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-pass-data-between-react-components",
    title: "How to pass data between react components?",
    prompt: "How to pass data between react components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import ChildComponent from \"./Child\";\n   function ParentComponent(props) {\n    let [counter, setCounter] = useState(0);\n   \n    let increment = () => setCounter(++counter);\n   \n    return (\n      <div>\n        <button onClick={increment}>Increment Counter</button>\n        <ChildComponent counterValue={counter} />\n      </div>\n    );\n   }\n\nfunction ChildComponent(props) {\nreturn (\n  <div>\n    <p>Value of counter: {props.counterValue}</p>\n  </div>\n);\n}\n\nfunction ParentComponent(props) {\nlet [counter, setCounter] = useState(0);\nlet callback = valueFromChild => setCounter(valueFromChild);\nreturn (\n  <div>\n    <p>Value of counter: {counter}</p>\n    <ChildComponent callbackFunc={callback} counterValue={counter} />\n  </div>\n);\n}\n\nfunction ChildComponent(props) {\nlet childCounterValue = props.counterValue;\nreturn (\n  <div>\n    <button onClick={() => props.callbackFunc(++childCounterValue)}>\n      Increment Counter\n    </button>\n  </div>\n);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components cannot communicate with each other under any circumstances.",
        isCorrect: false,
        explanation: "Inter-component communication via props and callbacks is the core foundation of React architecture."
      },
      {
        id: "B",
        text: "Sending data through HTTP POST requests to localhost on every click.",
        isCorrect: false,
        explanation: "In-memory props, callbacks, and Context handle component communication efficiently without localhost HTTP requests."
      },
      {
        id: "C",
        text: "Directly modifying child component private variables from the parent.",
        isCorrect: false,
        explanation: "Direct variable mutation violates component encapsulation and does not trigger re-renders."
      },
      {
        id: "D",
        text: "Parent to child via props; Child to parent via callback functions; Across distant components via Context API or state management stores (Zustand/Redux).",
        isCorrect: true,
        explanation: "Correct. React uses unidirectional data flow: props down, callbacks/events up, and Context/stores for cross-cutting shared state."
      }
    ],
    correctAnswer: "D",
    explanation: "Parent Component to Child Component (using props) With the help of props, we can send data from a parent to a child component. How do we do this? Consider the following Parent Component: As one can see in the code above, we are rendering the child component inside the parent component, by providing a prop called counterValue. The value of the counter is being passed from the parent to the child component. We can use the data passed by the parent component in the following way: We use the props.counterValue to display the data passed on by the parent component. Child Component to Parent Component (using callbacks) This one is a bit tricky. We follow the steps below: Create a callback in the parent component which takes in the data needed as a parameter. Pass this callback as a prop to the child component. Send data from the child component using the callback. We are considering the same example above but in this case, we are going to pass the updated counterValue from child to parent. Step1 and Step2: Create a callback in the parent component, pass this callback as a prop. As one can see in the code above, we created a function called callback which takes in the data received from the child component as a parameter. Next, we passed the function callback as a prop to the child component. Step3: Pass data from the child to the parent component. In the code above, we have used the props.counterValue and set it to a variable called childCounterValue. Next, on button click, we pass the incremented childCounterValue to the props.callbackFunc. This way, we can pass data from the child to the parent component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to pass data between react components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to pass data between react components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-higher-order-components",
    title: "What are Higher Order Components?",
    prompt: "What are Higher Order Components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "// \"GlobalDataSource\" is some global data source\nclass ArticlesList extends React.Component {\n constructor(props) {\n   super(props);\n   this.handleChange = this.handleChange.bind(this);\n   this.state = {\n     articles: GlobalDataSource.getArticles(),\n   };\n }\n componentDidMount() {\n   // Listens to the changes added\n   GlobalDataSource.addChangeListener(this.handleChange);\n }\n componentWillUnmount() {\n   // Listens to the changes removed\n   GlobalDataSource.removeChangeListener(this.handleChange);\n }\n handleChange() {\n   // States gets Update whenver data source changes\n   this.setState({\n     articles: GlobalDataSource.getArticles(),\n   });\n }\n render() {\n   return (\n     <div>\n       {this.state.articles.map((article) => (\n         <ArticleData article={article} key={article.id} />\n       ))}\n     </div>\n   );\n }\n}\n\n// \"GlobalDataSource\" is some global data source\nclass UsersList extends React.Component {\n constructor(props) {\n   super(props);\n   this.handleChange = this.handleChange.bind(this);\n   this.state = {\n     users: GlobalDataSource.getUsers(),\n   };\n }\n componentDidMount() {\n   // Listens to the changes added\n   GlobalDataSource.addChangeListener(this.handleChange);\n }\n componentWillUnmount() {\n   // Listens to the changes removed\n   GlobalDataSource.removeChangeListener(this.handleChange);\n }\n handleChange() {\n   // States gets Update whenver data source changes\n   this.setState({\n     users: GlobalDataSource.getUsers(),\n   });\n }\n render() {\n   return (\n     <div>\n       {this.state.users.map((user) => (\n         <UserData user={user} key={user.id} />\n       ))}\n     </div>\n   );\n }\n}\n\n// Higher Order Component which takes a component\n// as input and returns another component\n// \"GlobalDataSource\" is some global data source\nfunction HOC(WrappedComponent, selectData) {\n return class extends React.Component {\n   constructor(props) {\n     super(props);\n     this.handleChange = this.handleChange.bind(this);\n     this.state = {\n       data: selectData(GlobalDataSource, props),\n     };\n   }\n   componentDidMount() {\n     // Listens to the changes added\n     GlobalDataSource.addChangeListener(this.handleChange);\n   }\n   componentWillUnmount() {\n     // Listens to the changes removed\n     GlobalDataSource.removeChangeListener(this.handleChange);\n   }\n   handleChange() {\n     this.setState({\n       data: selectData(GlobalDataSource, this.props),\n     });\n   }\n   render() {\n     // Rendering the wrapped component with the latest data data\n     return <WrappedComponent data={this.state.data} {...this.props} />;\n   }\n };\n}\n\nconst ArticlesListWithHOC = HOC(ArticlesList, (GlobalDataSource) => GlobalDataSource.getArticles());\nconst UsersListWithHOC = HOC(UsersList, (GlobalDataSource) => GlobalDataSource.getUsers());",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Components that automatically increase the computer's CPU clock frequency.",
        isCorrect: false,
        explanation: "HOCs are JavaScript functions, having no control over hardware CPU clocking."
      },
      {
        id: "B",
        text: "Functions that take a component as an argument and return a new enhanced component, enabling cross-cutting logic and prop reuse.",
        isCorrect: true,
        explanation: "Correct. Higher-Order Components (HOCs) are a pattern for reusing component logic (e.g. `withAuth(ProfilePage)`) via component composition."
      },
      {
        id: "C",
        text: "Components that run exclusively on server hardware without client hydration.",
        isCorrect: false,
        explanation: "HOCs operate on standard React components in both client and server environments."
      },
      {
        id: "D",
        text: "Components that must always be rendered at the absolute top level of the HTML DOM tree.",
        isCorrect: false,
        explanation: "HOC is a functional abstraction pattern, not a DOM element position rule."
      }
    ],
    correctAnswer: "B",
    explanation: "Simply put, Higher-Order Component(HOC) is a function that takes in a component and returns a new component. When do we need a Higher Order Component? While developing React applications, we might develop components that are quite similar to each other with minute differences. In most cases, developing similar components might not be an issue but, while developing larger applications we need to keep our code DRY, therefore, we want an abstraction that allows us to define this logic in a single place and share it across components. HOC allows us to create that abstraction. Example of a HOC: Consider the following components having similar functionality. The following component displays the list of articles: The following component displays the list of users: Notice the above components, both have similar functionality but, they are calling different methods to an API endpoint. Let, s create a Higher Order Component to create an abstraction: We know HOC is a function that takes in a component and returns a component. In the code above, we have created a function called HOC which returns a component and performs functionality that can be shared across both the ArticlesList component and UsersList Component. The second parameter in the HOC function is the function that calls the method on the API endpoint. We have reduced the duplicated code of the componentDidUpdate and componentDidMount functions. Using the concept of Higher-Order Components, we can now render the ArticlesList and UsersList components in the following way: Remember, we are not trying to change the functionality of each component, we are trying to share a single functionality across multiple components using HOC.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Higher Order Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Higher Order Components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-different-phases-of-the-component-lifecycl",
    title: "What are the different phases of the component lifecycle?",
    prompt: "What are the different phases of the component lifecycle?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Connecting, Authenticating, and Disconnecting.",
        isCorrect: false,
        explanation: "These are network socket connection phases, not React component lifecycles."
      },
      {
        id: "B",
        text: "Mounting (inserting into DOM), Updating (re-rendering on prop/state changes), and Unmounting (removing from DOM).",
        isCorrect: true,
        explanation: "Correct. The three primary lifecycle phases in React are Mounting (birth), Updating (growth/changes), and Unmounting (death/cleanup)."
      },
      {
        id: "C",
        text: "Parsing, Transpiling, and Garbage Collecting.",
        isCorrect: false,
        explanation: "These are JavaScript engine execution steps, distinct from React's component lifecycle phases."
      },
      {
        id: "D",
        text: "Compiling, Minifying, and Deploying.",
        isCorrect: false,
        explanation: "These are build/deployment stages, not runtime React component lifecycle phases."
      }
    ],
    correctAnswer: "B",
    explanation: "There are four different phases in the lifecycle of React component. They are: Initialization: During this phase, React component will prepare by setting up the default props and initial state for the upcoming tough journey. Mounting: Mounting refers to putting the elements into the browser DOM. Since React uses VirtualDOM, the entire browser DOM which has been currently rendered would not be refreshed. This phase includes the lifecycle methods componentWillMount and componentDidMount. Updating: In this phase, a component will be updated when there is a change in the state or props of a component. This phase will have lifecycle methods like componentWillUpdate, shouldComponentUpdate, render, and componentDidUpdate. Unmounting: In this last phase of the component lifecycle, the component will be removed from the DOM or will be unmounted from the browser DOM. This phase will have the lifecycle method named componentWillUnmount.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the different phases of the component lifecycle?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the different phases of the component lifecycle?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-is-react-router",
    title: "What is React Router?",
    prompt: "What is React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A hardware router device used to connect computers to local area networks.",
        isCorrect: false,
        explanation: "React Router is a JavaScript client routing library, not a physical hardware router."
      },
      {
        id: "B",
        text: "A build tool that bundles CSS files into production stylesheets.",
        isCorrect: false,
        explanation: "React Router manages application navigation, not CSS bundling."
      },
      {
        id: "C",
        text: "A server database driver used to query PostgreSQL tables over TCP.",
        isCorrect: false,
        explanation: "React Router handles URL routing in web applications, not database connections."
      },
      {
        id: "D",
        text: "A standard routing library for React that enables client-side navigation between views without full page reloads, keeping the UI in sync with the browser URL.",
        isCorrect: true,
        explanation: "Correct. React Router provides declarative routing components (`<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`) and hooks (`useNavigate`, `useParams`)."
      }
    ],
    correctAnswer: "D",
    explanation: "React Router refers to the standard library used for routing in React. It permits us for building a single-page web application in React with navigation without even refreshing the page when the user navigates. It also allows to change the browser URL and will keep the user interface in sync with the URL. React Router will make use of the component structure for calling the components, using which appropriate information can be shown. Since React is a component-based framework, it, s not necessary to include and use this package. Any other compatible routing library would also work with React. The major components of React Router are given below: BrowserRouter: It is a router implementation that will make use of the HTML5 history API (pushState, popstate, and event replaceState) for keeping your UI to be in sync with the URL. It is the parent component useful in storing all other components. Routes: It is a newer component that has been introduced in the React v6 and an upgrade of the component. Route: It is considered to be a conditionally shown component and some UI will be rendered by this whenever there is a match between its path and the current URL. Link: It is useful in creating links to various routes and implementing navigation all over the application. It works similarly to the anchor tag in HTML.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-different-trees-are-produced-because-of-different-eleme",
    title: "Different trees are produced because of different elements",
    prompt: "Different trees are produced because of different elements, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<div />  <section />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "When root element types differ (e.g. `<div>` to `<section>`), React tears down the entire old subtree, unmounting components and building a new DOM tree from scratch.",
        isCorrect: true,
        explanation: "Correct. In React's diffing algorithm, changing an element's type causes React to destroy the existing tree and mount a fresh subtree without attempting to reconcile children."
      },
      {
        id: "B",
        text: "React merges the properties of both tags into a single hybrid HTML element.",
        isCorrect: false,
        explanation: "HTML elements cannot be merged into hybrid tags; the old tag is removed and the new tag is created."
      },
      {
        id: "C",
        text: "React throws a fatal compiler error if two different tags appear in adjacent renders.",
        isCorrect: false,
        explanation: "Changing element types is a valid and common rendering pattern in React."
      },
      {
        id: "D",
        text: "React preserves the child component state and simply renames the HTML tag name in place.",
        isCorrect: false,
        explanation: "Different element types trigger a full unmount of the old tree, destroying all child component state."
      }
    ],
    correctAnswer: "A",
    explanation: "If the root elements have different types, React: unmounts the old component tree, destroys associated DOM nodes, mounts a new tree. Example: This triggers a full rebuild of that subtree.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Different trees are produced because of different elements.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Different trees are produced because of different elements.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-elements-of-the-same-type-are-compared-attribute-wise",
    title: "Elements of the same type are compared attribute-wise",
    prompt: "Elements of the same type are compared attribute-wise, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When comparing two elements of the same type, React keeps the underlying DOM node and only updates the specific attributes, styles, or props that changed.",
        isCorrect: true,
        explanation: "Correct. For matching element types, React mutates only modified attributes (e.g. changing `className` or `title`) and then recursively diffs children."
      },
      {
        id: "B",
        text: "React reloads the entire browser window if a CSS class name changes.",
        isCorrect: false,
        explanation: "React updates DOM element attributes surgically without page reloads."
      },
      {
        id: "C",
        text: "Attributes cannot be updated dynamically after an element mounts.",
        isCorrect: false,
        explanation: "Attributes update dynamically in response to state and prop changes across renders."
      },
      {
        id: "D",
        text: "React always destroys the DOM node and recreates it from scratch whenever any attribute changes.",
        isCorrect: false,
        explanation: "React reuses existing DOM nodes for identical element types to maximize performance."
      }
    ],
    correctAnswer: "A",
    explanation: "If element types are the same, React updates only the changed attributes, and then recursively compares child elements",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Elements of the same type are compared attribute-wise.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Elements of the same type are compared attribute-wise.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-forwardref-and-when-do-you-need-it",
    title: "What is forwardRef, and when do you need it?",
    prompt: "What is forwardRef, and when do you need it?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: ".focus()\n\n.scrollIntoView()\n\nconst Input = React.forwardRef((props, ref) => {\n  return <input ref={ref} {...props} />;\n});\n\nconst inputRef = useRef();\n<Input ref={inputRef} />\n\ninputRef.current.focus();",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A method used to forward HTTP network requests to a proxy server.",
        isCorrect: false,
        explanation: "`forwardRef` manages React DOM references, not HTTP proxy forwarding."
      },
      {
        id: "B",
        text: "A React utility that lets a component receive a `ref` from its parent and pass it down to an underlying DOM node or child component (e.g. for focus/measurement).",
        isCorrect: true,
        explanation: "Correct. `React.forwardRef((props, ref) => ...)` enables parent components to obtain direct references to nested DOM nodes through custom component boundaries."
      },
      {
        id: "C",
        text: "A compiler flag that forwards TypeScript errors to the browser console.",
        isCorrect: false,
        explanation: "`forwardRef` is a runtime React API for component ref propagation."
      },
      {
        id: "D",
        text: "A tool that redirects users forward to the next page in browser history.",
        isCorrect: false,
        explanation: "History navigation is handled by `history.forward()` or React Router, not `forwardRef`."
      }
    ],
    correctAnswer: "B",
    explanation: "This one is simple! You can use forwardRef to pass a ref from the parent component through the child component to a DOM element or another component inside it. You need it particularly because, by default, function components do not accept ref, as ref is not a regular prop, and it is handled separately by React. forwardRef is needed because it enables access to a child component, s DOM node, it helps in imperative actions like, and measuring layout. So, when you don, t use forwardRef, the parent won, t be able to directly interact with the child, s internal DOM elements, and hence it may hinder when required to reuse. This is how forwardRef works - React.forwardRef wraps a functional component and provides ref as a second argument. This is the pattern: Here, s how you can use it: Now the parent can directly call: Some common use cases are - integrating DOM libraries, focus management, triggering animations, measuring DOM elements, etc.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is forwardRef, and when do you need it?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is forwardRef, and when do you need it?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-minimize-re-render-scope---state-colocation",
    title: "Minimize re-render scope - State Colocation",
    prompt: "Minimize re-render scope - State Colocation, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Colocation means storing all state on an external backend database server via synchronous polling.",
        isCorrect: false,
        explanation: "State colocation is a client-side component architecture principle about where to declare React state."
      },
      {
        id: "B",
        text: "Move state as close as possible to the components that actually consume it, preventing parent components and sibling subtrees from re-rendering on local changes.",
        isCorrect: true,
        explanation: "Correct. State colocation keeps component hierarchies decoupled and confines re-renders strictly to the relevant subtree."
      },
      {
        id: "C",
        text: "Move all state into the root `<App>` component so every component re-renders together on every keystroke.",
        isCorrect: false,
        explanation: "Lifting all state to the root causes widespread unnecessary re-renders and severe prop drilling."
      },
      {
        id: "D",
        text: "Store state only in the browser URL hash fragment without React components.",
        isCorrect: false,
        explanation: "Complex component state cannot and should not be stored entirely in URL hash fragments."
      }
    ],
    correctAnswer: "B",
    explanation: "State should be kept as close as possible to where it is used. Lifting state too high causes more components to re-render unnecessarily. Also, colocating state limits updates to only the relevant parts of the UI.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Minimize re-render scope - State Colocation.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Minimize re-render scope - State Colocation.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-what-is-reactfragment-and-why-is-it-useful",
    title: "What is React.Fragment and why is it useful?",
    prompt: "What is React.Fragment and why is it useful?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "return (\n  <>\n    <h1>Hello</h1>\n    <p>World</p>\n  </>\n);\n\n<h1>Hello</h1>\n<p>World</p>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A tool that automatically fragments large database tables across multiple hard drives.",
        isCorrect: false,
        explanation: "Fragments are JSX grouping elements, not database sharding tools."
      },
      {
        id: "B",
        text: "A special script tag used to inject Google Analytics tracking pixels.",
        isCorrect: false,
        explanation: "Fragments are pure React JSX element grouping wrappers."
      },
      {
        id: "C",
        text: "A component (`<React.Fragment>` or `<>...</>`) that groups multiple sibling elements without introducing an unnecessary wrapper node (like `<div>`) to the real DOM.",
        isCorrect: true,
        explanation: "Correct. Fragments prevent DOM clutter, preserve semantic table/list markup, and avoid breaking CSS flexbox/grid layout structures."
      },
      {
        id: "D",
        text: "A component that only renders broken error messages when a crash occurs.",
        isCorrect: false,
        explanation: "Fragment is a structural grouping utility, not an error display component."
      }
    ],
    correctAnswer: "C",
    explanation: "React's Fragment helps in grouping multiple elements together by being careful not to add an extra element to the DOM. Just like you know in React, every component MUST return a single parent element, and a fragment just acts like that parent, except it doesn, t actually show up in the final HTML. I, ll explain this to you with an example! If you write: React will group these elements together using Fragment, but in the browser, it will render as: This shows that the Fragment is only used by React internally; it does not create an HTML element like a <div>. Why do we use Fragment? Because sometimes using <div> might cause some problems like breaking layouts on flexbox or grid, or creating invalid HTML (yes, this happens!) You can use it in these 2 ways: <React.Fragment>. </React.Fragment> <>. </> - (short syntax) One thing you need to keep in mind is that only React.Fragment supports props like key, which comes in hand when rendering lists.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React.Fragment and why is it useful?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React.Fragment and why is it useful?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-jsx-and-how-does-it-work",
    title: "What is JSX and how does it work?",
    prompt: "What is JSX and how does it work?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A database query language for querying IndexedDB in client components.",
        isCorrect: false,
        explanation: "JSX defines UI element structure, not database queries."
      },
      {
        id: "B",
        text: "A binary format for compressing HTML files before network transmission.",
        isCorrect: false,
        explanation: "JSX is human-readable source code syntax, not a binary compression format."
      },
      {
        id: "C",
        text: "A syntax extension for JavaScript resembling HTML that compilers (Babel/SWC) transpile into `React.createElement` or JSX runtime `_jsx` calls.",
        isCorrect: true,
        explanation: "Correct. JSX provides an expressive markup syntax that compilers translate into standard JavaScript function calls returning React elements."
      },
      {
        id: "D",
        text: "A separate programming language executed directly by browser rendering engines without compilation.",
        isCorrect: false,
        explanation: "Browsers cannot execute JSX directly; it must be compiled into JavaScript."
      }
    ],
    correctAnswer: "C",
    explanation: "JSX, short for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes building React components easier. JSX gets converted into JavaScript function calls, often by Babel. For instance, <div>Hello, world!</div> is transformed into React.createElement('div', null, 'Hello, world!'). Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is JSX and how does it work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is JSX and how does it work?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-concept-of-the-virtual-dom-in-react",
    title: "Explain the concept of the Virtual DOM in React.",
    prompt: "Explain the concept of the Virtual DOM in React., explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A browser API built into Chrome that replaces the standard HTML DOM with a WebGL canvas.",
        isCorrect: false,
        explanation: "Virtual DOM is a React library abstraction in JavaScript, not a native browser WebGL canvas API."
      },
      {
        id: "B",
        text: "A lightweight in-memory JavaScript representation of the real DOM that React diffs to compute minimal DOM updates during reconciliation.",
        isCorrect: true,
        explanation: "Correct. The Virtual DOM allows React to calculate UI differences in memory before batching updates to the actual browser DOM."
      },
      {
        id: "C",
        text: "An isolated Shadow DOM container used strictly for CSS style encapsulation.",
        isCorrect: false,
        explanation: "Shadow DOM is a Web Component standard, distinct from React's in-memory Virtual DOM."
      },
      {
        id: "D",
        text: "A permanent snapshot of the DOM saved in browser cookies across sessions.",
        isCorrect: false,
        explanation: "Virtual DOM exists ephemerally in JavaScript runtime RAM."
      }
    ],
    correctAnswer: "B",
    explanation: "The virtual DOM is a simplified version of the actual DOM used by React. It allows for efficient UI updates by comparing the virtual DOM to the real DOM and making only the necessary changes through a process known as reconciliation. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the concept of the Virtual DOM in React.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the concept of the Virtual DOM in React.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "react-what-is-the-difference-between-react-node-react-element",
    title: "What is the difference Between React Node, React Element, and React Component?",
    prompt: "What is the difference Between React Node, React Element, and React Component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There is no difference; all three terms are exact synonyms in React.",
        isCorrect: false,
        explanation: "They represent distinct concepts: element (object descriptor), component (function/class), and node (renderable type union)."
      },
      {
        id: "B",
        text: "React Elements are mutable class instances; React Components are immutable JSON files.",
        isCorrect: false,
        explanation: "React Elements are plain immutable JavaScript objects created by `createElement` or JSX."
      },
      {
        id: "C",
        text: "A React Element is an immutable object `{ type, props }`; a React Component is a function/class returning elements; a React Node is any renderable unit (element, string, number, fragment, null).",
        isCorrect: true,
        explanation: "Correct. React Element is the descriptor object, Component is the blueprint/function, and ReactNode is the union type of everything React can render."
      },
      {
        id: "D",
        text: "React Node is a server-side Node.js runtime process; React Element is an HTML tag; React Component is a CSS stylesheet.",
        isCorrect: false,
        explanation: "`ReactNode` is a TypeScript type in `@types/react`, not the Node.js backend server runtime."
      }
    ],
    correctAnswer: "C",
    explanation: "A React Node refers to any unit that can be rendered in React, such as an element, string, number, or null. A React Element is an immutable object that defines what should be rendered, typically created using JSX or React.createElement. A React Component is either a function or class that returns React Elements, enabling the creation of reusable UI components. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference Between React Node, React Element, and React Component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference Between React Node, React Element, and React Component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-react-fragments-used-for",
    title: "What are React Fragments used for?",
    prompt: "What are React Fragments used for?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "return (  <>    <ChildComponent1 />    <ChildComponent2 />  </>);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To fragment relational database tables across multiple SQL clusters.",
        isCorrect: false,
        explanation: "Fragments are JSX grouping wrappers, unrelated to database partitioning."
      },
      {
        id: "B",
        text: "To group a list of children without adding extra wrapper nodes (like `<div>`) to the real DOM, preserving layout structure and semantic markup.",
        isCorrect: true,
        explanation: "Correct. `<React.Fragment>` (or `<>...</>`) lets components return multiple adjacent elements without polluting the DOM hierarchy."
      },
      {
        id: "C",
        text: "To split large JavaScript files into multiple asynchronous download chunks.",
        isCorrect: false,
        explanation: "File chunking is handled by code splitting and bundlers, not JSX Fragments."
      },
      {
        id: "D",
        text: "To catch and isolate rendering errors like an Error Boundary.",
        isCorrect: false,
        explanation: "Error Boundaries catch errors; Fragments only group JSX elements."
      }
    ],
    correctAnswer: "B",
    explanation: "React Fragments allow you to group multiple elements without adding extra nodes to the DOM. They are particularly useful when you need to return multiple elements from a component but don't want to wrap them in a container element. You can utilize shorthand syntax <>.</> or React.Fragment. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Fragments used for?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Fragments used for?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-createelement-and-clonee",
    title: "What is the difference between createElement and cloneElement?",
    prompt: "What is the difference between createElement and cloneElement?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "React.createElement('div', { className: 'container' }, 'Hello World');\n\nconst element = <button className=\"btn\">Click Me</button>;const clonedElement = React.cloneElement(element, { className: 'btn-primary' });",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`createElement` creates a new React element descriptor from type, props, and children; `cloneElement` clones an existing element, merging new props with original props.",
        isCorrect: true,
        explanation: "Correct. `createElement(type, props, ...children)` constructs a new element; `cloneElement(element, newProps, ...newChildren)` copies and extends an existing element."
      },
      {
        id: "B",
        text: "`createElement` is used only in browsers; `cloneElement` is used only on servers.",
        isCorrect: false,
        explanation: "Both functions operate in both client and server JavaScript environments."
      },
      {
        id: "C",
        text: "`cloneElement` creates a deep clone of the user's operating system clipboard.",
        isCorrect: false,
        explanation: "`cloneElement` clones React element objects in memory, unrelated to the OS clipboard."
      },
      {
        id: "D",
        text: "`createElement` was permanently removed in React 16.",
        isCorrect: false,
        explanation: "`createElement` remains a foundational API in React."
      }
    ],
    correctAnswer: "A",
    explanation: "The difference between createElement and cloneElement in React is as follows: createElement: Used to create a new React element. It takes the type of the element (e.g., 'div', a React component), props, and children, and returns a new React element. Commonly used internally by JSX or when dynamically creating elements. Example: cloneElement: Used to clone an existing React element and optionally modify its props. It allows you to clone a React element and pass new props or override the existing ones, keeping the original element's children and state. Useful when you want to manipulate an element without recreating it. Example:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between createElement and cloneElement?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between createElement and cloneElement?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-does-re-rendering-mean-in-react",
    title: "What does re-rendering mean in React?",
    prompt: "What does re-rendering mean in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A full reload of the entire browser page and network cache.",
        isCorrect: false,
        explanation: "Re-rendering happens in-memory within the SPA without reloading the browser tab."
      },
      {
        id: "B",
        text: "The process where React calls a component function again in response to state/prop changes, generates a new Virtual DOM tree, and reconciles differences to update the real DOM.",
        isCorrect: true,
        explanation: "Correct. Re-rendering executes the component to produce new JSX, diffs it against the previous VDOM, and applies necessary updates to the browser DOM."
      },
      {
        id: "C",
        text: "Clearing all user authentication cookies from browser storage.",
        isCorrect: false,
        explanation: "Re-rendering does not delete user cookies."
      },
      {
        id: "D",
        text: "Compiling TypeScript source files into JavaScript on disk.",
        isCorrect: false,
        explanation: "Compilation happens at build time; re-rendering is a runtime React lifecycle process."
      }
    ],
    correctAnswer: "B",
    explanation: "In React, re-rendering refers to the process of updating the user interface (UI) in response to changes in the component's state or props. When the state or props of a component change, React re-renders the component to reflect the updated data in the UI. This involves: Recalculating the JSX returned by the component Comparing the new JSX with the previous one (using the Virtual DOM) Updating the real DOM with only the differences (efficient rendering) Re-rendering ensures that the UI stays in sync with the component's state and props Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does re-rendering mean in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does re-rendering mean in React?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-what-is-forwardref-in-react-used-for",
    title: "What is forwardRef() in React used for?",
    prompt: "What is forwardRef() in React used for?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "// Pre-React 19import React, { forwardRef } from 'react';\nconst MyComponent = forwardRef((props, ref) => <input ref={ref} {...props} />);\n\nfunction MyComponent({ ref...props }) {  return <input ref={ref} {...props} />;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A tool used to forward HTTP network packets to a proxy server.",
        isCorrect: false,
        explanation: "`forwardRef` manages React DOM references, not network packets."
      },
      {
        id: "B",
        text: "A compiler directive that enables multi-threaded WebAssembly compilation.",
        isCorrect: false,
        explanation: "`forwardRef` is a component ref-passing wrapper API in React."
      },
      {
        id: "C",
        text: "In pre-React 19, `forwardRef` passed a `ref` through a custom component to an underlying DOM node; in React 19, `ref` is a standard prop on function components, deprecating `forwardRef`.",
        isCorrect: true,
        explanation: "Correct. `forwardRef` was required before React 19 to pass refs to child DOM elements; React 19 makes `ref` a regular prop that can be destructured directly."
      },
      {
        id: "D",
        text: "A method that redirects browser history forward to the next visited page.",
        isCorrect: false,
        explanation: "History navigation is handled by `history.forward()` or router hooks, not `forwardRef`."
      }
    ],
    correctAnswer: "C",
    explanation: "Before React 19, function components didn't accept ref as a regular prop, so forwardRef() was used to pass a ref through to a child DOM element. In React 19, ref is a regular prop on function components and forwardRef is deprecated. Destructure it from props: Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is forwardRef() in React used for?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is forwardRef() in React used for?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-explain-what-react-hydration-is",
    title: "Explain what React hydration is?",
    prompt: "Explain what React hydration is?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Downloading images and fonts in the background after page load.",
        isCorrect: false,
        explanation: "Asset preloading is browser resource loading, distinct from React's event/DOM hydration."
      },
      {
        id: "B",
        text: "Compressing HTML files using Gzip or Brotli before sending over HTTP.",
        isCorrect: false,
        explanation: "Compression is a web server network optimization, not React hydration."
      },
      {
        id: "C",
        text: "Converting client-side React components into static JSON database schemas.",
        isCorrect: false,
        explanation: "Hydration activates server-rendered HTML into an interactive client React app."
      },
      {
        id: "D",
        text: "The client-side process where React scans server-rendered HTML, initializes component state, and attaches event listeners to make the static markup interactive.",
        isCorrect: true,
        explanation: "Correct. Hydration bridges static server HTML and client-side JavaScript, attaching event handlers to the existing DOM without destroying and recreating it."
      }
    ],
    correctAnswer: "D",
    explanation: "Hydration involves attaching event listeners and making server-rendered HTML interactive on the client side. After server-side rendering, React initializes dynamic behavior by attaching event handlers. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain what React hydration is?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain what React hydration is?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "react-what-are-react-portals-used-for",
    title: "What are React Portals used for?",
    prompt: "What are React Portals used for?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Rendering children into a different DOM node outside the parent component's DOM hierarchy while preserving React context and event bubbling.",
        isCorrect: true,
        explanation: "Correct. `ReactDOM.createPortal(child, container)` allows modals, tooltips, and dialogs to break out of parent `overflow: hidden` and `z-index` stacking contexts."
      },
      {
        id: "B",
        text: "Loading third-party websites inside full-screen VR headsets.",
        isCorrect: false,
        explanation: "Portals are standard React DOM rendering utilities."
      },
      {
        id: "C",
        text: "Creating encrypted peer-to-peer network tunnels between two browser windows.",
        isCorrect: false,
        explanation: "Portals manage DOM element rendering locations, not networking tunnels."
      },
      {
        id: "D",
        text: "Transferring React component state directly into a backend PostgreSQL database.",
        isCorrect: false,
        explanation: "Portals operate entirely in the client-side DOM."
      }
    ],
    correctAnswer: "A",
    explanation: "React Portals allow rendering children into a DOM node outside the parent component's hierarchy. This is useful for modals or tooltips that need to escape parent overflow or z-index constraints. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Portals used for?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Portals used for?.",
    hints: [
      "A portal moves where a node is inserted in the DOM. Context and event bubbling still follow the React tree."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react-dom.dev/reference/react-dom/createPortal"
  },
  {
    id: "react-what-is-react-strict-mode-and-what-are-its-benefits",
    title: "What is React strict mode and what are its benefits?",
    prompt: "What is React strict mode and what are its benefits?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<React.StrictMode>  <App /></React.StrictMode>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A TypeScript compiler rule that disallows the use of `any` types.",
        isCorrect: false,
        explanation: "React.StrictMode is a React runtime component, distinct from TypeScript's compiler options."
      },
      {
        id: "B",
        text: "A production optimization flag that disables all error throwing to prevent website crashes.",
        isCorrect: false,
        explanation: "StrictMode is active only in development and intentionally surfaces errors rather than suppressing them."
      },
      {
        id: "C",
        text: "A development-only tool (`<React.StrictMode>`) that highlights potential bugs, double-invoking renders/effects to catch impure side effects and warning on deprecated APIs.",
        isCorrect: true,
        explanation: "Correct. StrictMode runs additional checks in development (double mounting, legacy string ref checks) without impacting production build performance."
      },
      {
        id: "D",
        text: "A security sandbox that blocks all external HTTP network requests.",
        isCorrect: false,
        explanation: "StrictMode does not block network requests; it checks component lifecycle purity."
      }
    ],
    correctAnswer: "C",
    explanation: "React Strict Mode is a development feature in React that activates extra checks and warnings to help identify potential issues in your app. Detects unsafe lifecycles: Warns about deprecated lifecycle methods Identifies side effects: Highlights components with side effects in render methods Warns about unexpected state changes: Catches unexpected state mutations Enforces best practices: Flags potential problems, encouraging modern practices Wrapping components in <React.StrictMode> activates these development checks without affecting production builds.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React strict mode and what are its benefits?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React strict mode and what are its benefits?.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
  },
  {
    id: "react-how-do-you-decide-between-using-react-state-context-and",
    title: "How do you decide between using React state, context, and external state managers?",
    prompt: "How do you decide between using React state, context, and external state managers?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Use local state (`useState`) for isolated component UI, Context for low-frequency app-wide data (themes/auth), Zustand/Redux for complex global client state, and React Query/SWR for server cache.",
        isCorrect: true,
        explanation: "Correct. Effective architecture aligns state scope to appropriate tools: local state for component UI, Context for stable globals, external stores for complex client logic, and dedicated cache libraries for server state."
      },
      {
        id: "B",
        text: "Store all temporary text input values and hover flags in a single global Redux store.",
        isCorrect: false,
        explanation: "Globalizing ephemeral UI state adds boilerplate and causes unnecessary re-renders across the tree."
      },
      {
        id: "C",
        text: "Never use local state; all state must reside in external global stores.",
        isCorrect: false,
        explanation: "Local component state is the primary and most efficient building block of React applications."
      },
      {
        id: "D",
        text: "Use React Context without selectors for high-frequency 60fps real-time data streams.",
        isCorrect: false,
        explanation: "Frequent Context updates re-render all consumers, causing frame drops under high-frequency updates."
      }
    ],
    correctAnswer: "A",
    explanation: "Choosing between React state, context, and external state managers depends on your application's complexity. Use React state for local component state, context for global state shared across multiple components, and external managers like Redux or MobX for complex state management requiring advanced features like optimizing re-renders. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you decide between using React state, context, and external state managers?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you decide between using React state, context, and external state managers?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-how-does-react-handle-concurrent-rendering-with-multipl",
    title: "How does React handle concurrent rendering with multiple updates and prioritize them?",
    prompt: "How does React handle concurrent rendering with multiple updates and prioritize them?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React drops all non-urgent updates completely and never renders them.",
        isCorrect: false,
        explanation: "React interrupts non-urgent renders to handle urgent input, then resumes or recalculates the non-urgent work."
      },
      {
        id: "B",
        text: "React sends all state updates to a remote server to be ordered by an external queue.",
        isCorrect: false,
        explanation: "Scheduling and priority lanes are managed in-memory on the client by React's scheduler."
      },
      {
        id: "C",
        text: "React's scheduler prioritizes urgent updates (clicks, typing) to render synchronously, while non-urgent transitions (`startTransition`, `useDeferredValue`) can be interrupted and resumed.",
        isCorrect: true,
        explanation: "Correct. React's scheduler assigns lane-based priorities to updates, allowing urgent user interactions to preempt slower non-urgent renders without freezing the UI."
      },
      {
        id: "D",
        text: "React processes all updates strictly in first-in-first-out order with synchronous blocking execution.",
        isCorrect: false,
        explanation: "Concurrent rendering explicitly allows higher-priority updates to interrupt and jump ahead of lower-priority work."
      }
    ],
    correctAnswer: "C",
    explanation: "React's scheduler assigns priority to updates based on how they're triggered. Updates from direct user interaction (click, input, focus) are treated as urgent and rendered synchronously. Updates wrapped in startTransition or read through useDeferredValue are non-urgent: React can interrupt them to handle a more urgent update, then resume. That's what allows a heavy filter or list render to coexist with typing into a search box without blocking it.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does React handle concurrent rendering with multiple updates and prioritize them?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does React handle concurrent rendering with multiple updates and prioritize them?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-explain-server-side-rendering-of-react-applications-and",
    title: "Explain server-side rendering of React applications and its benefits",
    prompt: "Explain server-side rendering of React applications and its benefits, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Executing all client-side mouse clicks on the backend server over satellite links.",
        isCorrect: false,
        explanation: "User interactions occur on the client in the browser after hydration."
      },
      {
        id: "B",
        text: "Rendering React components into HTML on the server per request, delivering immediate content for fast First Contentful Paint and SEO, followed by client hydration.",
        isCorrect: true,
        explanation: "Correct. SSR generates complete HTML on the server, allowing search engines and users to see content before JavaScript bundles download and hydrate."
      },
      {
        id: "C",
        text: "Compiling React components into WebAssembly shaders on the server.",
        isCorrect: false,
        explanation: "SSR generates standard HTML markup from React components."
      },
      {
        id: "D",
        text: "Pre-rendering HTML only once at build time that never changes per request.",
        isCorrect: false,
        explanation: "Pre-rendering at build time is Static Site Generation (SSG), whereas SSR renders per request dynamically."
      }
    ],
    correctAnswer: "B",
    explanation: "Server-side rendering (SSR) involves rendering components on the server before sending fully rendered HTML to clients, improving initial load times and SEO through efficient hydration processes. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain server-side rendering of React applications and its benefits.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain server-side rendering of React applications and its benefits.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-handle-nested-routes-and-route-parameters-in",
    title: "How do you handle nested routes and route parameters in React Router?",
    prompt: "How do you handle nested routes and route parameters in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import {  BrowserRouter,  Routes,  Route,  Outlet,  useParams,} from 'react-router-dom';\nfunction UserProfile() {  const { userId } = useParams();  return <h2>User ID: {userId}</h2>;}\nfunction App() {  return (    <BrowserRouter>      <Routes>        <Route path=\"user/:userId\" element={<Outlet />}>          <Route path=\"profile\" element={<UserProfile />} />        </Route>      </Routes>    </BrowserRouter>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Manually hide and show child components using `display: none` CSS styles.",
        isCorrect: false,
        explanation: "Nested routing dynamically mounts and unmounts matched components based on the URL path."
      },
      {
        id: "B",
        text: "Nested routes are not supported in React Router.",
        isCorrect: false,
        explanation: "Nested routes with `<Outlet />` are a core feature of React Router."
      },
      {
        id: "C",
        text: "Nest `<Route>` definitions inside parent routes and render an `<Outlet />` in the parent layout component where matching child routes should appear.",
        isCorrect: true,
        explanation: "Correct. In React Router v6+, `<Outlet />` serves as a placeholder in parent layout components to render matched nested child routes, while `useParams` reads parameters."
      },
      {
        id: "D",
        text: "Render 50 nested `<iframe>` tags inside each other to display nested pages.",
        isCorrect: false,
        explanation: "Iframes introduce severe performance, accessibility, and state synchronization issues."
      }
    ],
    correctAnswer: "C",
    explanation: "Nested routes allow you to create hierarchies of components, and useParams helps access dynamic route parameters. Key techniques: <Outlet>: Renders child routes within a parent layout useParams: Retrieves route parameters for dynamic routing",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle nested routes and route parameters in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle nested routes and route parameters in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-do-you-handle-404-errors-or-page-not-found-in-react",
    title: "How do you handle 404 errors or page not found in React Router?",
    prompt: "How do you handle 404 errors or page not found in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { Routes, Route } from 'react-router-dom';\nfunction NotFound() {  return <h1>404 - Page Not Found</h1>;}\nfunction App() {  return (    <Routes>      <Route path=\"/\" element={<Home />} />      <Route path=\"/about\" element={<About />} />      <Route path=\"*\" element={<NotFound />} />    </Routes>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Define a catch-all route `<Route path='*' element={<NotFound />} />` at the end of the `<Routes>` list to render a custom 404 component when no other routes match.",
        isCorrect: true,
        explanation: "Correct. The wildcard `path='*'` acts as a fallback route that matches any URL path not handled by preceding route definitions."
      },
      {
        id: "B",
        text: "React Router automatically shuts down the web server on unknown URLs.",
        isCorrect: false,
        explanation: "React Router is client-side and matches unknown routes against wildcard route configurations."
      },
      {
        id: "C",
        text: "Redirect all users to Google.com whenever a 404 occurs.",
        isCorrect: false,
        explanation: "Navigating away from the app breaks user experience; rendering an in-app 404 view is standard."
      },
      {
        id: "D",
        text: "Throw a fatal unhandled JavaScript exception in the root component.",
        isCorrect: false,
        explanation: "Unhandled exceptions crash the application; custom 404 components provide clean fallback UI."
      }
    ],
    correctAnswer: "A",
    explanation: "To handle 404 errors or page not found in React Router, create a catch-all route at the end of your route configuration that renders a custom 404 component. Example: In this example, the NotFound component is rendered when no other routes match the URL, indicating a 404 error.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you handle 404 errors or page not found in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you handle 404 errors or page not found in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-do-you-pass-props-to-a-route-component-in-react-rou",
    title: "How do you pass props to a route component in React Router?",
    prompt: "How do you pass props to a route component in React Router?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { Routes, Route } from 'react-router-dom';\nfunction MyComponent({ propValue }) {  return <div>Prop Value: {propValue}</div>;}\nfunction App() {  return (    <Routes>      <Route path=\"/my-route\" element={<MyComponent propValue=\"Hello\" />} />    </Routes>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Props cannot be passed to route components in React Router v6.",
        isCorrect: false,
        explanation: "Passing props directly to JSX elements in `<Route element={<Component ... />} />` is standard in v6."
      },
      {
        id: "B",
        text: "Pass props directly to the component inside the `element` JSX prop of `<Route path='/my-route' element={<MyComponent propValue='hello' />} />`.",
        isCorrect: true,
        explanation: "Correct. In React Router v6+, routes accept element instances in the `element` prop, making prop passing as natural as standard JSX composition."
      },
      {
        id: "C",
        text: "Inject props directly into `window.__PROPS__` on every route change.",
        isCorrect: false,
        explanation: "Global window mutation is unreactive and violates component encapsulation."
      },
      {
        id: "D",
        text: "Define props as global environment variables in `.env`.",
        isCorrect: false,
        explanation: "Component props are passed in JSX, not global environment configuration files."
      }
    ],
    correctAnswer: "B",
    explanation: "In React Router v6, you can pass props to a route component using the element prop in the <Route> component. Example: In this example, the propValue prop is passed to the MyComponent component when rendering the /my-route route. React Internationalization Understanding internationalization (i18n) in React is important in front end interviews because many products serve global audiences and must support multiple languages and locales. Showing you can implement i18n demonstrates attention to accessibility, user experience, and readiness to build applications for diverse users.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you pass props to a route component in React Router?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you pass props to a route component in React Router?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-what-is-react-testing-library-and-how-is-it-used-for-te",
    title: "What is React Testing Library and how is it used for testing React components?",
    prompt: "What is React Testing Library and how is it used for testing React components?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A load-testing tool that fires 1,000,000 requests per second at backend servers.",
        isCorrect: false,
        explanation: "RTL is a component unit/integration test utility, not a backend load-testing tool."
      },
      {
        id: "B",
        text: "A testing utility that encourages testing components from the user's perspective by querying accessible DOM roles, text, and labels rather than implementation details.",
        isCorrect: true,
        explanation: "Correct. React Testing Library (RTL) renders components into a simulated DOM and asserts on accessible outputs (`getByRole`, `getByText`), making tests resilient to refactors."
      },
      {
        id: "C",
        text: "A visual CSS design tool for drawing Figma wireframes.",
        isCorrect: false,
        explanation: "RTL is an automated testing library for React components."
      },
      {
        id: "D",
        text: "A library that tests internal private component state variables directly (`wrapper.state()`).",
        isCorrect: false,
        explanation: "RTL intentionally avoids testing internal state or implementation details, focusing on user-visible outputs."
      }
    ],
    correctAnswer: "B",
    explanation: "React Testing Library is a testing utility for React that helps test components in a way that resembles how users interact with the application. It provides functions to render components, interact with them, and assert on the rendered output.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Testing Library and how is it used for testing React components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Testing Library and how is it used for testing React components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-test-react-components-using-react-testing-li",
    title: "How do you test React components using React Testing Library?",
    prompt: "How do you test React components using React Testing Library?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { render, screen, fireEvent } from '@testing-library/react';import MyComponent from './MyComponent';\ntest('renders component', () => {  render(<MyComponent />);  const button = screen.getByRole('button');  fireEvent.click(button);  expect(screen.getByText('Clicked!')).toBeInTheDocument();});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Render the component with `render(<MyComponent />)`, simulate user interactions with `userEvent` (or `fireEvent`), and assert on DOM output with `expect(screen.getByRole(...)).toBeInTheDocument()`.",
        isCorrect: true,
        explanation: "Correct. Standard RTL tests follow the Arrange-Act-Assert pattern: render UI, simulate events via userEvent, and assert on accessible screen queries."
      },
      {
        id: "B",
        text: "Modify the production source code to return hardcoded test strings.",
        isCorrect: false,
        explanation: "Tests render components with test props and mock dependencies without modifying production source code."
      },
      {
        id: "C",
        text: "Take a screenshot of the computer monitor with a physical camera.",
        isCorrect: false,
        explanation: "Automated testing uses programmatic DOM assertions and queries."
      },
      {
        id: "D",
        text: "Inspect the component's internal `this.state` directly using private reflection.",
        isCorrect: false,
        explanation: "RTL avoids testing internal state and asserts on rendered DOM output."
      }
    ],
    correctAnswer: "A",
    explanation: "To test React components using React Testing Library, you can: Render the component using render. Interact with the component (e.g., clicking buttons, entering text). Assert on the rendered output using queries like getByText, queryByRole, etc. Example: In this example, the test renders MyComponent, clicks a button, and asserts that the text 'Clicked!' is present.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React components using React Testing Library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React components using React Testing Library?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-shallow-renderer-in-react-testing",
    title: "What is Shallow Renderer in React testing?",
    prompt: "What is Shallow Renderer in React testing?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "// Enzyme-style example (historical)import { shallow } from 'enzyme';const wrapper = shallow(<Button label=\"Click Me\" />);expect(wrapper.text()).toBe('Click Me');",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A compiler that compresses React components into SVG graphics.",
        isCorrect: false,
        explanation: "Shallow rendering is a testing abstraction, not an SVG compiler."
      },
      {
        id: "B",
        text: "A legacy testing approach (used by Enzyme) that rendered components only one level deep without rendering child components, now discouraged in favor of RTL's full DOM rendering.",
        isCorrect: true,
        explanation: "Correct. Shallow rendering isolated components by stubbing children, but led to brittle tests that missed integration bugs; modern testing favors React Testing Library."
      },
      {
        id: "C",
        text: "A rendering engine that only renders components with CSS opacity set to 0.5.",
        isCorrect: false,
        explanation: "Shallow rendering refers to tree render depth, not visual CSS transparency."
      },
      {
        id: "D",
        text: "A hardware graphics renderer used for 2D mobile gaming.",
        isCorrect: false,
        explanation: "Shallow rendering was a historical React testing utility."
      }
    ],
    correctAnswer: "B",
    explanation: "Shallow rendering renders a component one level deep: its children are not rendered, only referenced as React elements. The intent was to isolate the component under test from its children. The two implementations were react-test-renderer/shallow (a low-level API) and Enzyme's shallow() (a popular wrapper around it). Don't use shallow rendering in new code. Enzyme is unmaintained and has no official React 17+ adapter. The React docs recommend React Testing Library, which renders components the way users see them and asserts on accessible output, so tests don't break on internal refactors. Use RTL's render with screen.getByRole / getByText instead.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Shallow Renderer in React testing?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Shallow Renderer in React testing?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-snapshot-testing-in-react",
    title: "What is Snapshot Testing in React?",
    prompt: "What is Snapshot Testing in React?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React from 'react';import renderer from 'react-test-renderer';import MyComponent from './MyComponent';\ntest('renders correctly', () => {  const tree = renderer.create(<MyComponent />).toJSON();  expect(tree).toMatchSnapshot();});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A testing technique that captures the rendered output of a component and saves it to a `.snap` file, failing future test runs if the output changes unexpectedly.",
        isCorrect: true,
        explanation: "Correct. Snapshot tests serialize component DOM/JSON output to detect unintended UI regressions, prompting developers to review and accept changes when updates occur."
      },
      {
        id: "B",
        text: "Taking a physical photograph of the user using the computer webcam.",
        isCorrect: false,
        explanation: "Snapshot testing captures serialized HTML/JSON text strings, not webcam photos."
      },
      {
        id: "C",
        text: "Creating a full system backup of the operating system hard drive.",
        isCorrect: false,
        explanation: "Snapshot tests save small text snapshots of rendered component markup."
      },
      {
        id: "D",
        text: "A performance tool that measures frame rate speed in FPS.",
        isCorrect: false,
        explanation: "Snapshot testing verifies markup consistency, not runtime frame rates."
      }
    ],
    correctAnswer: "A",
    explanation: "Snapshot Testing in React is a testing technique that captures the rendered output of a component and saves it as a snapshot. Subsequent test runs compare the current output with the saved snapshot to detect any unexpected changes. If the output differs from the snapshot, the test fails, indicating that the component's output has changed. Here's an example of using Snapshot Testing with Jest: In this example, the renderer.create function renders the MyComponent and converts it to a JSON tree. The toMatchSnapshot function saves the snapshot of the component's output. Subsequent test runs compare the current output with the saved snapshot, ensuring the component's output remains consistent.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Snapshot Testing in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Snapshot Testing in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-test-react-components-that-use-context",
    title: "How do you test React components that use context?",
    prompt: "How do you test React components that use context?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { render } from '@testing-library/react';import { MyContextProvider } from './MyContextProvider';import MyComponent from './MyComponent';\ntest('renders correctly with context', () => {  const { getByText } = render(    <MyContextProvider value=\"test value\">      <MyComponent />    </MyContextProvider>,  );  expect(getByText('test value')).toBeInTheDocument();});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Disable Context checking in React core using compiler flags.",
        isCorrect: false,
        explanation: "Wrapping components with real or mock providers is the correct way to test Context consumers."
      },
      {
        id: "B",
        text: "Components using Context cannot be tested in automated test runners.",
        isCorrect: false,
        explanation: "Context-consuming components test cleanly when wrapped in `<Context.Provider>`."
      },
      {
        id: "C",
        text: "Mutate global `window.context` directly in the test file.",
        isCorrect: false,
        explanation: "React Context operates through component tree providers, not global `window` variables."
      },
      {
        id: "D",
        text: "Wrap the component under test in the corresponding `<MyContext.Provider value={testValue}>` inside the test `render()` call (or use a custom test render helper).",
        isCorrect: true,
        explanation: "Correct. Providing mock context values via the context provider in the test wrapper allows testing how components react to various context states."
      }
    ],
    correctAnswer: "D",
    explanation: "To test React components that use context, you can wrap the component in a context provider with the desired context values for testing. This allows you to simulate the context values and test the component's behavior based on those values. Example: In this example, the MyComponent is wrapped in a MyContextProvider with a specific context value for testing. The test verifies that the component renders correctly with the provided context value.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React components that use context?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React components that use context?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "react-how-do-you-test-react-components-that-use-redux",
    title: "How do you test React components that use Redux?",
    prompt: "How do you test React components that use Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { render } from '@testing-library/react';import configureStore from 'redux-mock-store';import { Provider } from 'react-redux';import MyComponent from './MyComponent';\nconst mockStore = configureStore([]);\ntest('renders correctly with Redux state', () => {  const store = mockStore({ counter: 0 });  const { getByText } = render(    <Provider store={store}>      <MyComponent />    </Provider>,  );  expect(getByText('Counter: 0')).toBeInTheDocument();});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Replace Redux reducers with direct `document.write` DOM insertions.",
        isCorrect: false,
        explanation: "Redux tests evaluate state transitions and component reactions through the standard Redux Provider."
      },
      {
        id: "B",
        text: "Disable all Redux actions during test runs.",
        isCorrect: false,
        explanation: "Tests dispatch actions to verify that component state and UI update accurately."
      },
      {
        id: "C",
        text: "Redux-connected components can only be tested manually in production.",
        isCorrect: false,
        explanation: "Automated testing with Redux Provider wrappers is standard practice."
      },
      {
        id: "D",
        text: "Wrap the component in a Redux `<Provider store={testStore}>` configured with an initial test state, or use a configured mock store.",
        isCorrect: true,
        explanation: "Correct. Wrapping components in a real or mock Redux `<Provider>` supplies the required store context, allowing testing of action dispatching and state rendering."
      }
    ],
    correctAnswer: "D",
    explanation: "To test React components that use Redux, you can use the redux-mock-store library to create a mock store with the desired state for testing. This allows you to simulate the Redux store and test the component's behavior based on the state. Example: In this example, the MyComponent is wrapped in a Provider with a mock Redux store containing the initial state { counter: 0 } for testing. The test verifies that the component renders correctly with the provided Redux state.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you test React components that use Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you test React components that use Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-key-differences-between-shallow-rendering",
    title: "What are the key differences between shallow rendering and full DOM rendering in React tests?",
    prompt: "What are the key differences between shallow rendering and full DOM rendering in React tests?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Shallow rendering only works on mobile phones; full DOM rendering only works on desktop.",
        isCorrect: false,
        explanation: "Both are test rendering methodologies operating in JavaScript test environments."
      },
      {
        id: "B",
        text: "Shallow rendering executes 1000x faster than any other JavaScript code.",
        isCorrect: false,
        explanation: "Shallow rendering avoids child mounting but does not alter fundamental JavaScript execution speeds."
      },
      {
        id: "C",
        text: "Shallow rendering renders only the target component without its children (isolated unit test); Full DOM rendering mounts the complete component tree and interacts with real DOM nodes (integration test).",
        isCorrect: true,
        explanation: "Correct. Shallow rendering tests components in isolation without child components, whereas full DOM rendering (RTL) tests components and their integrated child behaviors as users experience them."
      },
      {
        id: "D",
        text: "Full DOM rendering requires a physical robot to click the computer mouse.",
        isCorrect: false,
        explanation: "Full DOM rendering executes in simulated DOM environments (like jsdom) in automated test runners."
      }
    ],
    correctAnswer: "C",
    explanation: "Shallow Rendering: Renders only the component being tested, without rendering its child components. Useful for isolated unit testing. Full DOM Rendering: Mounts the entire component tree, including children, providing a complete DOM structure. Ideal for integration tests.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the key differences between shallow rendering and full DOM rendering in React tests?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the key differences between shallow rendering and full DOM rendering in React tests?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-what-does-useoptimistic-do",
    title: "What does useOptimistic do?",
    prompt: "What does useOptimistic do?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "import { useOptimistic } from 'react';\nfunction MessageList({ messages, sendMessage }) {  const [optimisticMessages, addOptimistic] = useOptimistic(    messages,    (state, newMessage) => [...state, { text: newMessage, sending: true }],  );\n  async function handleSend(formData) {    const text = formData.get('text');    addOptimistic(text);    await sendMessage(text);  }\n  return (    <>      {optimisticMessages.map((m, i) => (        <p key={i} style={{ opacity: m.sending ? 0.5: 1 }}>          {m.text}        </p>      ))}      <form action={handleSend}>        <input name=\"text\" />      </form>    </>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Runs a machine learning model in the browser to predict user thoughts.",
        isCorrect: false,
        explanation: "`useOptimistic` applies deterministic state updater functions during in-flight actions."
      },
      {
        id: "B",
        text: "Disables all error handling and assumes network calls never fail.",
        isCorrect: false,
        explanation: "`useOptimistic` automatically rolls back if the underlying action fails."
      },
      {
        id: "C",
        text: "Displays an optimistic UI state immediately while an async action is in flight, automatically reverting to the true server state when the action completes or fails.",
        isCorrect: true,
        explanation: "Correct. `useOptimistic` enhances perceived responsiveness by immediately applying anticipated changes (e.g. sending a message, liking a post) while network requests execute in the background."
      },
      {
        id: "D",
        text: "Permanently saves optimistic guesses to the database without waiting for server confirmation.",
        isCorrect: false,
        explanation: "`useOptimistic` manages temporary client UI state; authoritative updates come from the server response."
      }
    ],
    correctAnswer: "C",
    explanation: "useOptimistic renders an optimistic version of state immediately while an action is in flight, then automatically reverts to the real state when the action settles. Useful for chat messages, likes, list reordering, or anywhere the network round-trip would feel laggy.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What does useOptimistic do?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What does useOptimistic do?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-whats-the-difference-between-usetransition-and-usedefer",
    title: "What's the difference between useTransition and useDeferredValue?",
    prompt: "What's the difference between useTransition and useDeferredValue?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "// useTransition: control at the dispatch siteconst [isPending, startTransition] = useTransition();startTransition(() => setQuery(input));\n// useDeferredValue: control at the read siteconst deferredQuery = useDeferredValue(query);return <ExpensiveResults query={deferredQuery} />;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`useTransition` converts all components into class components.",
        isCorrect: false,
        explanation: "Both hooks are functional primitives in modern React."
      },
      {
        id: "B",
        text: "`useTransition` provides `startTransition` to mark a state update as non-urgent at the dispatch site; `useDeferredValue` wraps an existing value to defer it at the consumer/read site.",
        isCorrect: true,
        explanation: "Correct. Use `useTransition` when you control the state setter call site; use `useDeferredValue` when receiving a value through props or hooks that updates too frequently."
      },
      {
        id: "C",
        text: "`useDeferredValue` deletes the value if the network is slow.",
        isCorrect: false,
        explanation: "`useDeferredValue` provides a deferred copy of the value while urgent renders complete."
      },
      {
        id: "D",
        text: "`useTransition` runs on the server; `useDeferredValue` runs only on mobile phones.",
        isCorrect: false,
        explanation: "Both are client React Hooks for concurrent UI scheduling."
      }
    ],
    correctAnswer: "B",
    explanation: "Both mark updates as non-urgent so React can keep the UI responsive. The difference is where you put the control: useTransition wraps the state setter at the call site. You decide when a particular update should be a transition (e.g., a search submit). useDeferredValue wraps a value at the consumer. It hands you a lagging copy of the value that updates after urgent renders, useful when the data source isn't under your control (e.g., a value coming through props).",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What's the difference between useTransition and useDeferredValue?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What's the difference between useTransition and useDeferredValue?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-how-to-create-an-event-in-react",
    title: "How to Create an Event in React?",
    prompt: "How to Create an Event in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Pass an event handler function to a camelCase JSX prop (e.g. `<button onClick={handleClick}>`), receiving a normalized `SyntheticEvent` object.",
        isCorrect: true,
        explanation: "Correct. React uses camelCase event props and passes a synthetic event wrapper to callback functions."
      },
      {
        id: "B",
        text: "Use lowercase HTML attributes with inline string code `<button onclick='handleClick()'>`.",
        isCorrect: false,
        explanation: "React uses camelCase event props (`onClick`) and function references, not raw string evaluation."
      },
      {
        id: "C",
        text: "Call `document.addEventListener` imperatively inside the component return JSX body.",
        isCorrect: false,
        explanation: "Declarative JSX event props are standard in React; manual listeners in render cause bugs."
      },
      {
        id: "D",
        text: "Events cannot be handled in React without installing jQuery plugins.",
        isCorrect: false,
        explanation: "React provides comprehensive built-in event handling via JSX props."
      }
    ],
    correctAnswer: "A",
    explanation: "Attach event handlers like onClick or onChange to JSX elements and define the handler function. Example: function Component() { const doSomething = (e) => { e.preventDefault(); // response to the event }; return <button onClick={doSomething}>Click</button>;}",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Create an Event in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Create an Event in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-creation-of-a-list-in-react",
    title: "Explain the creation of a List in React?",
    prompt: "Explain the creation of a List in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Concatenate all strings with `join(',')` and pass them to an `alert()` box.",
        isCorrect: false,
        explanation: "Lists render UI components to the DOM, not alert boxes."
      },
      {
        id: "B",
        text: "Use a `for` loop statement directly inside the return JSX tag block.",
        isCorrect: false,
        explanation: "`for` statements are not valid inline JSX expressions; `map()` is used to produce element arrays."
      },
      {
        id: "C",
        text: "Transform an array of items into JSX elements using `Array.prototype.map()` and assign a unique, stable `key` prop to each item element.",
        isCorrect: true,
        explanation: "Correct. `array.map()` returns an array of React elements, with `key` props enabling efficient Virtual DOM list diffing."
      },
      {
        id: "D",
        text: "Render list elements by writing raw SQL queries inside the component body.",
        isCorrect: false,
        explanation: "Lists are created by iterating over JavaScript arrays in JSX."
      }
    ],
    correctAnswer: "C",
    explanation: "Use Array.map to transform values into elements and give each item a unique key. Example: import React from \"react\";import ReactDOM from \"react-dom/client\";const numbers = [1, 2, 3, 4, 5];const updatedNums = numbers.map(number => <li key={number}>{number}</li>);const root = ReactDOM.createRoot(document.getElementById(\"root\"));root.render(<ul>{updatedNums}</ul>);",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the creation of a List in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the creation of a List in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-a-key-in-react",
    title: "What is a Key in React?",
    prompt: "What is a Key in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A password hash used to encrypt API responses in browser storage.",
        isCorrect: false,
        explanation: "React `key` is a Virtual DOM diffing hint, not a security password."
      },
      {
        id: "B",
        text: "A database primary key that must be unique across all websites on the internet.",
        isCorrect: false,
        explanation: "Keys only need to be unique among sibling elements in the rendered array."
      },
      {
        id: "C",
        text: "A special string/number attribute passed to list elements that gives them a stable identity across renders, allowing React to optimize insertions, deletions, and reorders.",
        isCorrect: true,
        explanation: "Correct. Keys allow React's diffing algorithm to preserve element state and minimize real DOM mutations during dynamic list updates."
      },
      {
        id: "D",
        text: "A CSS selector used to apply zebra-striping colors to tables.",
        isCorrect: false,
        explanation: "Keys do not apply CSS styling; styling is handled via CSS classes."
      }
    ],
    correctAnswer: "C",
    explanation: "A key is a special attribute used on list elements so React can track which items change, get added, or are removed. Use stable, unique values as keys.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a Key in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a Key in React?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-explain-the-use-of-the-render-method-in-react",
    title: "Explain the Use of the Render Method in React?",
    prompt: "Explain the Use of the Render Method in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A method used exclusively to compile TypeScript into WebAssembly.",
        isCorrect: false,
        explanation: "`render()` is a runtime lifecycle method returning React elements."
      },
      {
        id: "B",
        text: "A method that executes synchronous SQL queries against the backend database.",
        isCorrect: false,
        explanation: "`render()` computes virtual UI markup in JavaScript; it must never execute side effects or network requests."
      },
      {
        id: "C",
        text: "In class components, the `render()` method is a pure function that examines `this.props` and `this.state` and returns JSX describing what should appear on screen.",
        isCorrect: true,
        explanation: "Correct. The `render()` method must be pure (no side effects) and returns the React elements that represent the component's UI."
      },
      {
        id: "D",
        text: "A function that deletes the browser cache and clears cookies on every call.",
        isCorrect: false,
        explanation: "`render()` returns JSX elements and has no effect on browser cookies."
      }
    ],
    correctAnswer: "C",
    explanation: "In class components, render() returns the JSX to display. React calls render to convert component state and props into virtual nodes that become real DOM.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Use of the Render Method in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Use of the Render Method in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-state-in-react",
    title: "What is State in React?",
    prompt: "What is State in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A compiler setting that toggles TypeScript strict mode.",
        isCorrect: false,
        explanation: "State is a runtime React component concept."
      },
      {
        id: "B",
        text: "A static configuration object passed down from parent components.",
        isCorrect: false,
        explanation: "Configuration passed from parents is called `props`; state is managed internally."
      },
      {
        id: "C",
        text: "An internal, mutable data object managed within a component that holds information influencing rendering and behavior, triggering re-renders when updated.",
        isCorrect: true,
        explanation: "Correct. State represents the dynamic memory of a component across user interactions and lifecycle events."
      },
      {
        id: "D",
        text: "A global browser cookie that persists permanently across computer reboots.",
        isCorrect: false,
        explanation: "Component state is in-memory and resets when the component unmounts unless persisted."
      }
    ],
    correctAnswer: "C",
    explanation: "State is an object that holds data affecting how a component renders and behaves. Updating state causes React to re-render the component.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is State in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is State in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-role-of-shouldcomponentupdate-in-react",
    title: "What is the Role of shouldComponentUpdate() in React?",
    prompt: "What is the Role of shouldComponentUpdate() in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A hook used in functional components to fetch data from REST APIs.",
        isCorrect: false,
        explanation: "`shouldComponentUpdate` is a class lifecycle method; functional components use `React.memo`."
      },
      {
        id: "B",
        text: "A function that deletes old state variables from memory permanently.",
        isCorrect: false,
        explanation: "`shouldComponentUpdate` decides whether to execute the render phase."
      },
      {
        id: "C",
        text: "A method that forces the browser to shut down if an error occurs.",
        isCorrect: false,
        explanation: "`shouldComponentUpdate` optimizes re-renders; it does not shut down browsers."
      },
      {
        id: "D",
        text: "A class component lifecycle method that returns a boolean to tell React whether to re-render the component when new props or state are received (returning `false` skips render).",
        isCorrect: true,
        explanation: "Correct. `shouldComponentUpdate(nextProps, nextState)` allows class components to avoid unnecessary re-renders by performing custom equality checks."
      }
    ],
    correctAnswer: "D",
    explanation: "shouldComponentUpdate(nextProps, nextState) returns true or false to tell React whether to re-render the component when props or state change. Returning false skips the update and saves work.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Role of shouldComponentUpdate() in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Role of shouldComponentUpdate() in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-pure-components-in-react",
    title: "What are Pure Components in React?",
    prompt: "What are Pure Components in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Components that render zero HTML tags and return `null` indefinitely.",
        isCorrect: false,
        explanation: "Pure components render standard UI; purity refers to memoized shallow comparison."
      },
      {
        id: "B",
        text: "Components written in pure assembly language without any JavaScript.",
        isCorrect: false,
        explanation: "Pure components are standard JavaScript React components with shallow equality checks."
      },
      {
        id: "C",
        text: "Components that perform deep recursive comparisons of nested JSON objects.",
        isCorrect: false,
        explanation: "Pure components perform shallow comparisons (`Object.is`), not deep traversals."
      },
      {
        id: "D",
        text: "Components that perform a shallow comparison of props and state before rendering, skipping re-renders if no changes are detected (`React.PureComponent` / `React.memo`).",
        isCorrect: true,
        explanation: "Correct. Pure components optimize rendering performance by avoiding redundant render passes when props and state remain referentially identical."
      }
    ],
    correctAnswer: "D",
    explanation: "React.PureComponent implements a shallow prop and state comparison to avoid unnecessary re-renders. Use it when shallow checks are sufficient to detect changes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Pure Components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Pure Components in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-significance-of-setstate-in-react",
    title: "What is the significance of setState() in React?",
    prompt: "What is the significance of setState() in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Deletes the component from the DOM permanently.",
        isCorrect: false,
        explanation: "`setState` updates data and schedules re-renders; unmounting is handled by parent conditions."
      },
      {
        id: "B",
        text: "Reloads the entire browser page from the web server.",
        isCorrect: false,
        explanation: "React updates the DOM in-place without page reloads."
      },
      {
        id: "C",
        text: "Schedules an update to component state, batches changes for performance, and triggers React's reconciliation engine to re-render the component and update the DOM.",
        isCorrect: true,
        explanation: "Correct. Calling `setState` (or a hook setter) notifies React that state has changed, scheduling a re-render to synchronize the UI."
      },
      {
        id: "D",
        text: "Mutates state synchronously in place on the same line of code.",
        isCorrect: false,
        explanation: "State updates are asynchronous and scheduled; direct synchronous mutation is not how `setState` works."
      }
    ],
    correctAnswer: "C",
    explanation: "setState() schedules an update to a component, s state. After state changes, React re-renders the component and its children to reflect the new data.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the significance of setState() in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the significance of setState() in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-conditional-rendering-in-react",
    title: "What is Conditional Rendering in React?",
    prompt: "What is Conditional Rendering in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Spawning background Web Workers only when a button is clicked.",
        isCorrect: false,
        explanation: "Conditional rendering controls component JSX output, not Web Worker threads."
      },
      {
        id: "B",
        text: "Injecting CSS media queries into the document head at runtime.",
        isCorrect: false,
        explanation: "Media queries handle responsive CSS design, while conditional rendering mounts/renders distinct component branches."
      },
      {
        id: "C",
        text: "Toggling DOM visibility strictly with `v-if` directive attributes.",
        isCorrect: false,
        explanation: "`v-if` is Vue.js template syntax; React uses standard JavaScript expressions."
      },
      {
        id: "D",
        text: "Rendering different JSX elements or components based on JavaScript conditions using ternary operators (`condition ? <A /> : <B />`), logical `&&`, or `if/return` guards.",
        isCorrect: true,
        explanation: "Correct. Conditional rendering leverages standard JavaScript control flow to dynamically display different UI elements depending on application state."
      }
    ],
    correctAnswer: "D",
    explanation: "Conditional rendering displays different components depending on conditions. For example:{isLoggedIn == false? <DisplayLoggedOut />: <DisplayLoggedIn />}",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Conditional Rendering in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Conditional Rendering in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-explain-the-components-of-a-react-router",
    title: "Explain the components of a React-Router",
    prompt: "Explain the components of a React-Router, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`<CanvasRouter>`, `<AudioRouter>`, `<VideoRouter>`, and `<GpuRouter>`.",
        isCorrect: false,
        explanation: "These are not router components in React Router."
      },
      {
        id: "B",
        text: "`<BrowserRouter>` (provides routing context via History API), `<Routes>` (groups route definitions), `<Route>` (maps path to element), and `<Link>`/`<NavLink>` (client navigation).",
        isCorrect: true,
        explanation: "Correct. These core components coordinate declarative client-side routing, URL matching, and navigation without full page reloads."
      },
      {
        id: "C",
        text: "`<SqlRouter>`, `<MongoRouter>`, `<RedisRouter>`, and `<KafkaRouter>`.",
        isCorrect: false,
        explanation: "React Router is a frontend web navigation library, not a backend database router."
      },
      {
        id: "D",
        text: "There is only a single monolithic `<App>` component in React Router.",
        isCorrect: false,
        explanation: "React Router provides multiple composable components for route definition and navigation."
      }
    ],
    correctAnswer: "B",
    explanation: "Main parts: BrowserRouter (Router): Wraps the app and enables routing. Switch: Renders only the first matching Route (in older versions). Route: Renders a component when the path matches. Link: Navigates without a full page reload.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the components of a React-Router.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the components of a React-Router.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-explain-the-lifecycle-methods-of-components",
    title: "Explain the Lifecycle Methods of Components",
    prompt: "Explain the Lifecycle Methods of Components, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Backend database triggers that execute on SQL server tables.",
        isCorrect: false,
        explanation: "Lifecycle methods are client/SSR React component APIs."
      },
      {
        id: "B",
        text: "Network packet filters used to configure firewall rules.",
        isCorrect: false,
        explanation: "Lifecycle methods manage component rendering and side effects."
      },
      {
        id: "C",
        text: "The series of methods invoked during a component's life: Mounting (creation/insertion into DOM), Updating (prop/state changes), and Unmounting (removal from DOM).",
        isCorrect: true,
        explanation: "Correct. Lifecycle methods allow executing setup, update reactions, and cleanup logic at defined stages of a component's existence."
      },
      {
        id: "D",
        text: "Methods that only execute when the user shuts down their computer.",
        isCorrect: false,
        explanation: "Lifecycle methods execute during the component's runtime life inside the browser."
      }
    ],
    correctAnswer: "C",
    explanation: "A component passes through: Initialization: Constructor sets initial props and state. Mounting: Component is added to the DOM and rendered. Updating: State or props change and component re-renders. Unmounting: Component is removed from the DOM.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Lifecycle Methods of Components.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Lifecycle Methods of Components.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-explain-the-methods-used-in-mounting-phase-of-component",
    title: "Explain the Methods Used in Mounting Phase of Components",
    prompt: "Explain the Methods Used in Mounting Phase of Components, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`componentWillUnmount()` and `componentDidCatch()`.",
        isCorrect: false,
        explanation: "`componentWillUnmount` is during the unmounting phase; `componentDidCatch` handles errors."
      },
      {
        id: "B",
        text: "`deleteComponent()` and `purgeMemory()`.",
        isCorrect: false,
        explanation: "These are not standard React lifecycle methods."
      },
      {
        id: "C",
        text: "In class components: `constructor()` (init state), `getDerivedStateFromProps()` (sync props to state), `render()` (return JSX), and `componentDidMount()` (side effects/DOM setup).",
        isCorrect: true,
        explanation: "Correct. The mounting phase initializes the component, renders its initial JSX, and executes `componentDidMount` after insertion into the real DOM."
      },
      {
        id: "D",
        text: "`shouldComponentUpdate()` and `componentDidUpdate()`.",
        isCorrect: false,
        explanation: "These are updating phase methods that run when props or state change after mount."
      }
    ],
    correctAnswer: "C",
    explanation: "Mounting methods include: componentWillMount(): invoked before mounting (legacy and not recommended). componentDidMount(): invoked after the component mounts and the initial render completes.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain the Methods Used in Mounting Phase of Components.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain the Methods Used in Mounting Phase of Components.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-react-fragments",
    title: "What are React Fragments?",
    prompt: "What are React Fragments?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Database shards stored inside browser IndexedDB storage.",
        isCorrect: false,
        explanation: "Fragments exist only in React virtual element hierarchies."
      },
      {
        id: "B",
        text: "A built-in component (`<React.Fragment>` or shorthand `<>...</>`) that groups multiple sibling elements without introducing an unnecessary wrapper node to the DOM.",
        isCorrect: true,
        explanation: "Correct. Fragments prevent DOM bloat and preserve table/flexbox/grid layout structures by grouping elements virtually in JSX."
      },
      {
        id: "C",
        text: "Micro-frontend bundles loaded dynamically from a CDN.",
        isCorrect: false,
        explanation: "Fragments are standard React JSX grouping elements."
      },
      {
        id: "D",
        text: "Broken components that crashed due to an uncaught JavaScript error.",
        isCorrect: false,
        explanation: "Fragment is a structural JSX grouping utility, not a crashed error state."
      }
    ],
    correctAnswer: "B",
    explanation: "React.Fragment or <> </> wraps multiple elements without adding an extra div to the DOM.Example: <React.Fragment> <h2>Child-1</h2> <p>Child-2</p></React.Fragment>",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Fragments?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Fragments?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-use-styles-in-reactjs",
    title: "How to Use Styles in ReactJS?",
    prompt: "How to Use Styles in ReactJS?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Styles can only be applied by editing browser C++ source code.",
        isCorrect: false,
        explanation: "Styles are applied using standard CSS, CSS Modules, Tailwind, or CSS-in-JS."
      },
      {
        id: "B",
        text: "CSS Modules (`styles.myClass`), global CSS stylesheets, inline style objects (`style={{ color: 'red' }}`), utility CSS (Tailwind), or CSS-in-JS (styled-components).",
        isCorrect: true,
        explanation: "Correct. React supports multiple styling approaches: scoped CSS modules, inline JS style objects, CSS-in-JS libraries, and utility class frameworks."
      },
      {
        id: "C",
        text: "React components can only be styled using Adobe Flash animations.",
        isCorrect: false,
        explanation: "Adobe Flash is obsolete; React uses modern web CSS standards."
      },
      {
        id: "D",
        text: "React prohibits using external CSS files in production.",
        isCorrect: false,
        explanation: "External CSS files and bundled CSS modules are standard in React."
      }
    ],
    correctAnswer: "B",
    explanation: "CSS Modules scope styles locally. Name the file App.module.css and import it:import styles from './App.module.css';Then use styles.className on elements.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Use Styles in ReactJS?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Use Styles in ReactJS?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-the-strict-mode-in-react",
    title: "What is the Strict Mode in React?",
    prompt: "What is the Strict Mode in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A TypeScript compiler rule that disallows the use of `any` types.",
        isCorrect: false,
        explanation: "React.StrictMode is a React runtime component, distinct from TypeScript's compiler options."
      },
      {
        id: "B",
        text: "A development-only helper component (`<React.StrictMode>`) that highlights potential problems, double-invoking renders/effects to catch impure side effects and warning on deprecated APIs.",
        isCorrect: true,
        explanation: "Correct. StrictMode runs additional checks in development (double mounting, legacy string ref checks) without impacting production build performance."
      },
      {
        id: "C",
        text: "A security sandbox that blocks all external HTTP network requests.",
        isCorrect: false,
        explanation: "StrictMode does not block network requests; it checks component lifecycle purity."
      },
      {
        id: "D",
        text: "A production optimization flag that disables all error throwing to prevent website crashes.",
        isCorrect: false,
        explanation: "StrictMode is active only in development and intentionally surfaces warnings rather than suppressing them."
      }
    ],
    correctAnswer: "B",
    explanation: "React.StrictMode is a development tool that highlights potential problems. Wrap the app or parts of it with <React.StrictMode> to enable extra checks without affecting production behavior. Example: import React from \"react\";import ReactDOM from \"react-dom\";const App = () => <div><h1>Hello, World!</h1></div>;ReactDOM.render( <React.StrictMode> <App /> </React.StrictMode>, document.getElementById(\"root\"));",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Strict Mode in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Strict Mode in React?.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
  },
  {
    id: "react-how-does-react-handle-concurrency",
    title: "How does React Handle Concurrency?",
    prompt: "How does React Handle Concurrency?",
    level: "senior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React executes all component rendering on background GPU threads using C++.",
        isCorrect: false,
        explanation: "Concurrent features are JavaScript scheduling mechanisms within React's fiber engine."
      },
      {
        id: "B",
        text: "React's scheduler breaks rendering into interruptible time slices, prioritizing urgent updates (typing/clicks) over non-urgent transitions (`startTransition`, `useDeferredValue`).",
        isCorrect: true,
        explanation: "Correct. Concurrent rendering allows React to pause long-running render passes to handle urgent user input immediately, keeping the UI responsive."
      },
      {
        id: "C",
        text: "React sends all state updates to a remote server queue to be processed sequentially.",
        isCorrect: false,
        explanation: "Scheduling and priority lanes are managed in-memory on the client by React's scheduler."
      },
      {
        id: "D",
        text: "React drops all non-urgent updates completely and never renders them.",
        isCorrect: false,
        explanation: "React interrupts non-urgent renders to handle urgent input, then resumes or recalculates the non-urgent work."
      }
    ],
    correctAnswer: "B",
    explanation: "React, s concurrency features let React split rendering work, pause it, and prioritize urgent updates. This helps apps stay responsive under heavy work by scheduling lower-priority tasks later.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does React Handle Concurrency?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does React Handle Concurrency?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "150-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-how-does-react-handle-server-side-rendering-ssr",
    title: "How does React Handle Server-Side Rendering (SSR)?",
    prompt: "How does React Handle Server-Side Rendering (SSR)?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Renders components to HTML on the server (`renderToString` / `renderToPipeableStream`) per request, sends it to the browser for fast FCP/SEO, and hydrates it on the client.",
        isCorrect: true,
        explanation: "Correct. SSR delivers pre-rendered HTML from the server, followed by client hydration to attach event listeners and activate interactive state."
      },
      {
        id: "B",
        text: "Compiles React components into WebAssembly shaders on the server.",
        isCorrect: false,
        explanation: "SSR generates standard HTML markup from React components."
      },
      {
        id: "C",
        text: "Pre-renders HTML only once at build time that never changes per request.",
        isCorrect: false,
        explanation: "Pre-rendering at build time is Static Site Generation (SSG), whereas SSR renders per request dynamically."
      },
      {
        id: "D",
        text: "Executes all client mouse clicks on the backend server over satellite connections.",
        isCorrect: false,
        explanation: "User interactions occur on the client in the browser after hydration."
      }
    ],
    correctAnswer: "A",
    explanation: "Server-side rendering runs React on the server to produce HTML that the client can display immediately. That approach speeds the first paint and improves SEO since crawlers see fully rendered HTML.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does React Handle Server-Side Rendering (SSR)?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does React Handle Server-Side Rendering (SSR)?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "react-what-are-forms-in-react",
    title: "What are Forms in React?",
    prompt: "What are Forms in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Cryptographic signature certificates issued by web servers.",
        isCorrect: false,
        explanation: "Forms are UI input interfaces in web applications."
      },
      {
        id: "B",
        text: "Interactive input collections managed as either controlled components (state-driven via `value`/`onChange`) or uncontrolled components (DOM-driven via `ref`/`defaultValue`).",
        isCorrect: true,
        explanation: "Correct. Forms collect user input; React supports controlled forms for real-time validation and uncontrolled forms for simpler DOM-native access."
      },
      {
        id: "C",
        text: "Database tables created inside browser IndexedDB storage.",
        isCorrect: false,
        explanation: "Forms represent UI input elements, distinct from database storage."
      },
      {
        id: "D",
        text: "Static non-interactive image screenshots of paper documents.",
        isCorrect: false,
        explanation: "Forms in React are interactive HTML form controls (`<input>`, `<textarea>`, `<select>`)."
      }
    ],
    correctAnswer: "B",
    explanation: "Forms in React are elements like input, select, and textarea. You can use controlled components, where React state holds input values, or uncontrolled components, which use refs to read values.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Forms in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Forms in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-error-boundaries-catching-render-time-failures-and-repo",
    title: "Error Boundaries: Catching Render-Time Failures and Reporting",
    prompt: "Error Boundaries: Catching Render-Time Failures and Reporting, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Error boundaries automatically catch async errors in `setTimeout` and event handlers.",
        isCorrect: false,
        explanation: "Error boundaries do NOT catch errors in event handlers or async timers; standard `try/catch` is used there."
      },
      {
        id: "B",
        text: "Error boundaries are functional components using the `useErrorBoundary` hook.",
        isCorrect: false,
        explanation: "Error boundaries currently still require class components implementing lifecycle methods."
      },
      {
        id: "C",
        text: "Error boundaries are class components using `static getDerivedStateFromError` (render fallback UI) and `componentDidCatch` (log errors), catching render/lifecycle errors in child subtrees.",
        isCorrect: true,
        explanation: "Correct. Error boundaries isolate failures to specific subtrees, preventing the entire application from crashing to a blank screen."
      },
      {
        id: "D",
        text: "Error boundaries prevent syntax errors in TypeScript code at compile time.",
        isCorrect: false,
        explanation: "Error boundaries operate at runtime during component rendering."
      }
    ],
    correctAnswer: "C",
    explanation: "Error boundaries are class components that implement static getDerivedStateFromError and componentDidCatch to catch errors during render, lifecycle, or constructors of child components. They let you show a fallback UI instead of unmounting the entire app. Example: class ErrorBoundary extends React.Component { constructor(props) { super(props); this.state = { hasError: false }; } static getDerivedStateFromError() { return { hasError: true }; } componentDidCatch(error, info) { logError(error, info); } render() { if (this.state.hasError) return <div>Something went wrong</div>; return this.props.children; }} Limitations and best practices: Error boundaries do not catch errors inside event handlers, async callbacks, server-side code or errors thrown in the boundary itself. Place boundaries around risky parts such as third-party widgets, routes, or heavy components. Provide a mechanism to reset the boundary state after an error, for example a try again button that changes a key prop or updates state.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Error Boundaries: Catching Render-Time Failures and Reporting.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Error Boundaries: Catching Render-Time Failures and Reporting.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-keys-revisited-more-examples-and-anti-patterns",
    title: "Keys Revisited: More Examples and Anti-Patterns",
    prompt: "Keys Revisited: More Examples and Anti-Patterns, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Keys must be regenerated as random `Math.random()` numbers on every render.",
        isCorrect: false,
        explanation: "Random keys destroy and recreate DOM nodes unnecessarily on every render, ruining performance and resetting focus."
      },
      {
        id: "B",
        text: "Keys format the visual typography of list bullet points.",
        isCorrect: false,
        explanation: "CSS styles bullet points; keys manage Virtual DOM reconciliation identity."
      },
      {
        id: "C",
        text: "Keys are required only for server-side database indexing.",
        isCorrect: false,
        explanation: "Keys are client-side JSX attributes essential for Virtual DOM list diffing."
      },
      {
        id: "D",
        text: "Keys give list elements stable identities; anti-patterns include using array indices for dynamic lists or generating random keys on each render (forcing continuous remounts).",
        isCorrect: true,
        explanation: "Correct. Stable IDs from data ensure correct DOM reuse; changing keys intentionally (e.g. `<Form key={userId} />`) can be used to reset component state on ID changes."
      }
    ],
    correctAnswer: "D",
    explanation: "Keys improve reconciliation by giving elements stable identities. Use keys to preserve component instances across reorder. Avoid these anti-patterns: Using an array index as a key when the list order changes. Generate new keys every render. Using keys to force remounts unless you purposely need fresh component state. When forcing remount is valid: Remounting can be useful to reset a component when an ID changes, for example, <Form key={userId} />, which creates a fresh form instance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Keys Revisited: More Examples and Anti-Patterns.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Keys Revisited: More Examples and Anti-Patterns.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-why-jsx-needs-transpilation-and-build-tools",
    title: "Why JSX Needs Transpilation and Build Tools",
    prompt: "Why JSX Needs Transpilation and Build Tools, explain the behavior and mechanism.",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "JSX is a syntactic extension not natively understood by browser JavaScript engines; build tools (Babel, SWC) transpile JSX into standard `React.createElement` or `_jsx` calls.",
        isCorrect: true,
        explanation: "Correct. Transpilation compiles JSX into valid ECMAScript that any browser can execute without runtime errors."
      },
      {
        id: "B",
        text: "Browsers natively parse JSX if saved with a `.jsx` extension.",
        isCorrect: false,
        explanation: "Browsers cannot parse JSX regardless of file extension without compilation."
      },
      {
        id: "C",
        text: "Transpilation encrypts source code to prevent users from viewing HTML in DevTools.",
        isCorrect: false,
        explanation: "Transpilation transforms syntax for browser compatibility, not DRM encryption."
      },
      {
        id: "D",
        text: "JSX is a binary machine code format that browsers execute in GPU hardware.",
        isCorrect: false,
        explanation: "JSX is plain source code syntax, not binary machine code."
      }
    ],
    correctAnswer: "A",
    explanation: "JSX looks like HTML inside JavaScript, but browsers only understand plain JavaScript. Tools such as Babel convert JSX into React.createElement calls so the browser can execute it. Build tools also enable modern syntax and optimize output.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why JSX Needs Transpilation and Build Tools.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why JSX Needs Transpilation and Build Tools.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-strictmode-why-run-extra-checks-in-development",
    title: "StrictMode: Why Run Extra Checks in Development",
    prompt: "StrictMode: Why Run Extra Checks in Development, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "StrictMode is a TypeScript compiler setting that forbids `any` types.",
        isCorrect: false,
        explanation: "React.StrictMode is a runtime React component, distinct from TypeScript compiler flags."
      },
      {
        id: "B",
        text: "StrictMode encrypts JSX elements with AES-256 in memory.",
        isCorrect: false,
        explanation: "StrictMode is a developer diagnostic tool, not an encryption firewall."
      },
      {
        id: "C",
        text: "StrictMode disables all error logging in production to speed up page loads.",
        isCorrect: false,
        explanation: "StrictMode is active only in development and intentionally surfaces warnings rather than suppressing them."
      },
      {
        id: "D",
        text: "StrictMode runs in development to surface impure renders and missing effect cleanups by intentionally double-invoking renders and effects, warning on deprecated APIs.",
        isCorrect: true,
        explanation: "Correct. Double mounting in development ensures that effects have proper cleanup routines and components are resilient to remounting (e.g. for fast refresh and concurrent features)."
      }
    ],
    correctAnswer: "D",
    explanation: "StrictMode is a development-only wrapper that runs additional checks, such as double-inverting certain functions to find impure renders and missing effect cleanups. Enable it at the app root or per subtree to surface issues while developing.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of StrictMode: Why Run Extra Checks in Development.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of StrictMode: Why Run Extra Checks in Development.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
  },
  {
    id: "react-graceful-error-handling-practical-approaches-for-robust",
    title: "Graceful Error Handling: Practical Approaches for Robust Apps",
    prompt: "Graceful Error Handling: Practical Approaches for Robust Apps, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Combine Error Boundaries at route/widget levels (rendering fallback UI and logging to Sentry) with `try/catch` in event handlers and inline error states for API queries.",
        isCorrect: true,
        explanation: "Correct. Layered error handling isolates component failures so a single broken widget doesn't crash the entire page, providing retry buttons and error telemetry."
      },
      {
        id: "B",
        text: "Force a full operating system reboot whenever a component encounters an error.",
        isCorrect: false,
        explanation: "Error boundaries catch errors gracefully and display actionable fallback interfaces."
      },
      {
        id: "C",
        text: "Silence all errors completely without logging or fallback UI.",
        isCorrect: false,
        explanation: "Silencing errors leaves users with unresponsive broken interfaces and hides bugs from developers."
      },
      {
        id: "D",
        text: "Display raw JavaScript runtime stack traces directly to end users in blocking alert modals.",
        isCorrect: false,
        explanation: "Raw stack traces confuse users and expose internal system implementation details."
      }
    ],
    correctAnswer: "A",
    explanation: "Wrap risky components with error boundaries to catch render time errors and display fallback UI. For production-grade error handling: Log errors to a tracking service in componentDidCatch. Provide a recovery path, such as a retry button that resets boundary state or a navigation option to another route. Combine error boundaries with route-level boundaries in router setups to keep failures isolated to single pages. 20 React Interview Questions for the Experienced",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Graceful Error Handling: Practical Approaches for Robust Apps.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Graceful Error Handling: Practical Approaches for Robust Apps.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-conditional-rendering-patterns-that-scale-and-stay-read",
    title: "Conditional Rendering, Patterns That Scale and Stay Readable",
    prompt: "Conditional Rendering, Patterns That Scale and Stay Readable, explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Wrap all conditional elements in `display: none` CSS rules permanently.",
        isCorrect: false,
        explanation: "Rendering hidden DOM elements wastes memory and keeps unneeded component lifecycles active."
      },
      {
        id: "B",
        text: "Conditional rendering is prohibited in React.",
        isCorrect: false,
        explanation: "Conditional rendering using JavaScript control flow is fundamental to React UI development."
      },
      {
        id: "C",
        text: "Use 10 levels of deeply nested ternary operators inside a single JSX expression.",
        isCorrect: false,
        explanation: "Deeply nested ternaries are notoriously unreadable, error-prone, and hard to maintain."
      },
      {
        id: "D",
        text: "Use early `if/return` guards for full-section branches, ternaries for simple inline choices, object lookup maps for multi-status states, and avoid deeply nested ternaries.",
        isCorrect: true,
        explanation: "Correct. Clean conditional rendering uses early returns for guards/empty states, concise ternaries for binary toggles, and dictionary lookups for complex multi-state views."
      }
    ],
    correctAnswer: "D",
    explanation: "Common techniques: if/return early: ideal for guarding large sections. ternary: concise for inline choices. && short circuit: show-only-if truthy cases. component guards: wrap logic in small components (e.g., <AuthGuard>). switch or map for many cases: map a status to a component. Example using guard: if (!user) return <LoginPrompt />;return <Dashboard />; Avoid: Deeply nested ternaries. Use small components to keep the render readable.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Conditional Rendering, Patterns That Scale and Stay Readable.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Conditional Rendering, Patterns That Scale and Stay Readable.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-major-features-of-react",
    title: "What are the major features of React?",
    prompt: "What are the major features of React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Virtual DOM for efficient diffing, unidirectional data flow, component-based composable UI, JSX syntax, and support for Server-Side Rendering (SSR).",
        isCorrect: true,
        explanation: "Correct. React's core strengths include its Virtual DOM reconciliation, declarative component hierarchy, unidirectional flow, and isomorphic SSR capabilities."
      },
      {
        id: "B",
        text: "Built-in two-way data binding on all DOM inputs, integrated SQLite database engine, and automatic CSS minification at runtime.",
        isCorrect: false,
        explanation: "React uses one-way data flow rather than automatic two-way binding, and does not include database engines or runtime CSS minification."
      },
      {
        id: "C",
        text: "Mandatory monolithic MVC controller classes with automatic active-record ORM mapping.",
        isCorrect: false,
        explanation: "React is a focused UI library based on components and functions, not an active-record MVC framework."
      },
      {
        id: "D",
        text: "Direct hardware GPU register manipulation that bypasses the browser rendering engine entirely.",
        isCorrect: false,
        explanation: "React reconciles elements in JavaScript and commits updates to the browser DOM via ReactDOM."
      }
    ],
    correctAnswer: "A",
    explanation: "The major features of React are: It uses VirtualDOM instead of RealDOM considering that RealDOM manipulations are expensive. Supports server-side rendering. Follows Unidirectional data flow or data binding. Uses reusable/composable UI components to develop the view.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the major features of React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the major features of React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-element-and-component",
    title: "What is the difference between Element and Component?",
    prompt: "What is the difference between Element and Component?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const element = React.createElement('div', { id: 'login-btn' }, 'Login');\n\n{\n  type: 'div',\n  props: {\n    children: 'Login',\n    id: 'login-btn'\n  }\n}\n\n<div id=\"login-btn\">Login</div>\n\nconst Button = ({ onLogin }) => (\n  <div id={'login-btn'} onClick={onLogin}>\n    Login\n  </div>\n);\n\nconst Button = ({ onLogin }) =>\n  React.createElement('div', { id: 'login-btn', onClick: onLogin }, 'Login');",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "An Element is an immutable plain JS object describing a DOM node (`{ type, props }`); a Component is a function or class that accepts props and returns an element tree.",
        isCorrect: true,
        explanation: "Correct. React elements are lightweight virtual descriptors created by `createElement` or JSX; components are the reusable blueprints/functions that create them."
      },
      {
        id: "B",
        text: "Components are immutable objects; Elements are ES6 classes containing lifecycle methods.",
        isCorrect: false,
        explanation: "Elements are the immutable descriptor objects; components are the functions/classes containing render logic."
      },
      {
        id: "C",
        text: "There is no technical difference; Element and Component are exact synonyms in React.",
        isCorrect: false,
        explanation: "Elements are object descriptions of UI; components are the functions/classes that generate elements."
      },
      {
        id: "D",
        text: "An Element is a live HTML DOM node in the browser; a Component is a static CSS stylesheet in memory.",
        isCorrect: false,
        explanation: "React elements are plain in-memory JavaScript objects, not native browser DOM nodes."
      }
    ],
    correctAnswer: "A",
    explanation: "An Element is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components. Elements can contain other Elements in their props. Creating a React element is cheap. Once an element is created, it is never mutated. The object representation of React Element would be as follows: The above React.createElement() function returns an object: And finally it renders to the DOM using ReactDOM.render(): Whereas a component can be declared in several different ways. It can be a class with a render() method. Alternatively, in simple cases, it can be defined as a function. In either case, it takes props as an input, and returns a JSX tree as the output: Then JSX gets transpiled to a React.createElement() function tree:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Element and Component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Element and Component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-create-components-in-react",
    title: "How to create components in React?",
    prompt: "How to create components in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function Greeting({ message }) {\n  return <h1>{`Hello, ${message}`}</h1>;\n}\n\nclass Greeting extends React.Component {\n  render() {\n    return <h1>{`Hello, ${this.props.message}`}</h1>;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "By registering XML tags in the browser window registry using `window.registerComponent()`.",
        isCorrect: false,
        explanation: "React components are declared in application JavaScript/TypeScript code."
      },
      {
        id: "B",
        text: "As Function Components (plain JS functions receiving props and returning JSX) or Class Components (ES6 classes extending `React.Component` with a `render()` method).",
        isCorrect: true,
        explanation: "Correct. Function components (with Hooks) are the modern standard, while class components are supported for legacy codebases and Error Boundaries."
      },
      {
        id: "C",
        text: "By creating `.component` binary files compiled directly by the browser operating system kernel.",
        isCorrect: false,
        explanation: "Components are standard JavaScript/TypeScript functions or classes."
      },
      {
        id: "D",
        text: "Exclusively by writing raw SQL schema definitions in Node.js.",
        isCorrect: false,
        explanation: "Components are frontend UI elements, unrelated to SQL schemas."
      }
    ],
    correctAnswer: "B",
    explanation: "There are two possible ways to create a component. Function Components: This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as first parameter and return React elements: Class Components: You can also use ES6 class to define a component. The above function component can be written as:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to create components in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to create components in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-state-and-props",
    title: "What is the difference between state and props?",
    prompt: "What is the difference between state and props?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props are stored on the server database; state is stored in browser cookies.",
        isCorrect: false,
        explanation: "Both props and state live in client JavaScript memory during rendering."
      },
      {
        id: "B",
        text: "Props are external, read-only parameters passed down from parent components; State is internal, mutable data owned and managed within the component.",
        isCorrect: true,
        explanation: "Correct. Props flow downwards to configure children; state is local and triggers re-renders when updated via setter functions."
      },
      {
        id: "C",
        text: "Props only accept numbers; state only accepts strings.",
        isCorrect: false,
        explanation: "Both accept any JavaScript data type."
      },
      {
        id: "D",
        text: "Props can be mutated directly by child components; state is immutable everywhere.",
        isCorrect: false,
        explanation: "Props must be treated as read-only by child components; state is updated via `setState`/hook setters."
      }
    ],
    correctAnswer: "B",
    explanation: "Both props and state are plain JavaScript objects. While both of them hold information that influences the output of render, they are different in their functionality with respect to component. Props get passed to the component similar to function parameters whereas state is managed within the component similar to variables declared within a function.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between state and props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between state and props?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-should-we-not-update-the-state-directly",
    title: "Why should we not update the state directly?",
    prompt: "Why should we not update the state directly?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "//Wrong\nthis.state.message = 'Hello world';\n\n//Correct\nthis.setState({ message: 'Hello World' });",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Direct mutation (`this.state.x = y`) does not trigger a re-render, breaks shallow comparison optimizations, and leads to inconsistent UI state.",
        isCorrect: true,
        explanation: "Correct. React relies on state setter calls (`setState` or `useState` setters) to schedule re-renders and detect state transitions cleanly."
      },
      {
        id: "B",
        text: "Direct mutation permanently deletes the component instance from memory.",
        isCorrect: false,
        explanation: "Direct mutation leaves the component alive but out-of-sync with its rendered UI."
      },
      {
        id: "C",
        text: "Direct mutation automatically converts all state numbers into strings.",
        isCorrect: false,
        explanation: "The issue is lack of reactive re-rendering and broken reconciliation, not type conversion."
      },
      {
        id: "D",
        text: "Direct mutation immediately causes a fatal JavaScript syntax error in all browsers.",
        isCorrect: false,
        explanation: "JavaScript allows property assignment; React specifically requires setter functions for reactive re-renders."
      }
    ],
    correctAnswer: "A",
    explanation: "If you try to update state directly then it won't re-render the component. Instead use setState() method. It schedules an update to a component's state object. When state changes, the component responds by re-rendering. Note: You can directly assign to the state object either in constructor or using latest javascript's class field declaration syntax.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why should we not update the state directly?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why should we not update the state directly?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-purpose-of-callback-function-as-an-argument",
    title: "What is the purpose of callback function as an argument of setState()?",
    prompt: "What is the purpose of callback function as an argument of setState()?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'));",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To cancel the state update if the calculation takes longer than 10ms.",
        isCorrect: false,
        explanation: "The callback is a post-render completion hook, not a cancellation timeout."
      },
      {
        id: "B",
        text: "To convert the updated state object into an encrypted JSON file.",
        isCorrect: false,
        explanation: "The callback simply executes custom logic after the re-render is finished."
      },
      {
        id: "C",
        text: "In class `setState(updater, callback)`, the callback executes after the state update has been applied and the component has re-rendered.",
        isCorrect: true,
        explanation: "Correct. Because `setState` is asynchronous, the second callback parameter provides a notification hook once the DOM update is committed (in functional components, `useEffect` is preferred)."
      },
      {
        id: "D",
        text: "To validate user authentication tokens on remote backend servers.",
        isCorrect: false,
        explanation: "The `setState` callback runs locally in the browser after the component re-renders."
      }
    ],
    correctAnswer: "C",
    explanation: "The callback function is invoked when setState finished and the component gets rendered. Since setState() is asynchronous the callback function is used for any post action. Note: It is recommended to use lifecycle method rather than this callback function.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of callback function as an argument of setState()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of callback function as an argument of setState()?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-are-inline-conditional-expressions",
    title: "What are inline conditional expressions?",
    prompt: "What are inline conditional expressions?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<h1>Hello!</h1>;\n{\n  messages.length > 0 && !isLogin ? (\n    <h2>You have {messages.length} unread messages.</h2>\n  ): (\n    <h2>You don't have unread messages.</h2>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A method for compiling conditional C++ code into WebAssembly.",
        isCorrect: false,
        explanation: "Inline conditionals are standard JavaScript expressions inside JSX."
      },
      {
        id: "B",
        text: "Using JavaScript ternary operators (`condition ? <A /> : <B />`) or logical AND (`condition && <Element />`) directly inside JSX curly braces to render content conditionally.",
        isCorrect: true,
        explanation: "Correct. Inline expressions allow concise conditional rendering directly within JSX templates using standard JavaScript operators."
      },
      {
        id: "C",
        text: "Executing CSS `@media` queries inside JavaScript strings.",
        isCorrect: false,
        explanation: "Inline conditionals are JavaScript logical operators evaluated during render."
      },
      {
        id: "D",
        text: "Writing raw SQL `WHERE` clauses inside HTML tag attributes.",
        isCorrect: false,
        explanation: "JSX evaluates JavaScript expressions, not SQL query clauses."
      }
    ],
    correctAnswer: "B",
    explanation: "You can use either if statements or ternary expressions which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator &&.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are inline conditional expressions?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are inline conditional expressions?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-the-use-of-refs",
    title: "What is the use of refs?",
    prompt: "What is the use of refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To trigger immediate synchronous re-renders of all parent components.",
        isCorrect: false,
        explanation: "Mutating a ref intentionally does not trigger a re-render."
      },
      {
        id: "B",
        text: "To encrypt component props before transmitting over HTTPS.",
        isCorrect: false,
        explanation: "Refs are in-memory JavaScript reference objects, not encryption mechanisms."
      },
      {
        id: "C",
        text: "To replace `useState` for all dynamic form inputs that update the screen.",
        isCorrect: false,
        explanation: "If changes need to be reflected visually on screen, `useState` is required."
      },
      {
        id: "D",
        text: "To hold a direct reference to a rendered DOM node (for focus, text selection, media playback, measurements) or to store a mutable value that persists without triggering re-renders.",
        isCorrect: true,
        explanation: "Correct. Refs provide an escape hatch for direct DOM manipulation and non-rendering instance state in functional and class components."
      }
    ],
    correctAnswer: "D",
    explanation: "The ref is used to return a reference to the element. They should be avoided in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use of refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use of refs?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-how-virtual-dom-works",
    title: "How Virtual DOM works?",
    prompt: "How Virtual DOM works?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "On state change, React renders a new virtual tree in memory, runs a heuristic diffing algorithm against the previous virtual tree, and batches minimal real DOM mutations.",
        isCorrect: true,
        explanation: "Correct. Virtual DOM diffing calculates the minimal delta needed to synchronize the real browser DOM, preventing expensive full-tree layout reflows."
      },
      {
        id: "B",
        text: "It directly writes binary machine instructions to the graphics card.",
        isCorrect: false,
        explanation: "The Virtual DOM is a JavaScript object abstraction that updates the browser DOM via ReactDOM."
      },
      {
        id: "C",
        text: "It performs an exhaustive O(n^3) tree comparison on every frame.",
        isCorrect: false,
        explanation: "React uses a heuristic O(n) diffing algorithm based on element types and keys."
      },
      {
        id: "D",
        text: "It compares HTML files stored on the web server over WebSockets.",
        isCorrect: false,
        explanation: "Virtual DOM diffing occurs locally in browser JavaScript memory."
      }
    ],
    correctAnswer: "A",
    explanation: "The Virtual DOM works in three simple steps. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation. Then the difference between the previous DOM representation and the new one is calculated. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Virtual DOM works?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Virtual DOM works?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "react-what-is-the-main-goal-of-react-fiber",
    title: "What is the main goal of React Fiber?",
    prompt: "What is the main goal of React Fiber?",
    level: "senior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To enable incremental rendering by breaking reconciliation work into chunks, allowing React to pause, abort, resume, and prioritize work for smooth animations and responsiveness.",
        isCorrect: true,
        explanation: "Correct. Fiber rewrote React's stack reconciler into a linked list structure, making rendering interruptible and paving the way for Concurrent React features."
      },
      {
        id: "B",
        text: "To build a high-speed fiber-optic network cable for internet service providers.",
        isCorrect: false,
        explanation: "React Fiber is a software reconciliation engine, not physical telecommunications hardware."
      },
      {
        id: "C",
        text: "To replace JavaScript with C++ across all web browsers.",
        isCorrect: false,
        explanation: "Fiber is an internal JavaScript architecture within the React library."
      },
      {
        id: "D",
        text: "To automatically convert CSS styles into SVG vector images.",
        isCorrect: false,
        explanation: "Fiber manages component reconciliation scheduling, not CSS vectorization."
      }
    ],
    correctAnswer: "A",
    explanation: "The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the main goal of React Fiber?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the main goal of React Fiber?.",
    hints: [
      "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM."
    ],
    source: "300-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "react-what-are-controlled-components",
    title: "What are controlled components?",
    prompt: "What are controlled components?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "handleChange(event) {\nthis.setState({value: event.target.value.toUpperCase()})\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Components that execute exclusively on backend Docker containers.",
        isCorrect: false,
        explanation: "Controlled components are standard browser form input elements."
      },
      {
        id: "B",
        text: "Components that cannot be edited by user keystrokes.",
        isCorrect: false,
        explanation: "Controlled components accept typing, which updates state via `onChange` handlers on every keystroke."
      },
      {
        id: "C",
        text: "Components where form input values are driven by React state (via `value`) and modified through explicit event handlers (via `onChange`), making React the single source of truth.",
        isCorrect: true,
        explanation: "Correct. Controlled components synchronize DOM input values with React state on every change, enabling immediate validation and formatting."
      },
      {
        id: "D",
        text: "Components that require Redux to render.",
        isCorrect: false,
        explanation: "Controlled components work with standard `useState` local component state."
      }
    ],
    correctAnswer: "C",
    explanation: "A component that controls the input elements within the forms on subsequent user input is called Controlled Component, i.e, every state mutation will have an associated handler function. For example, to write all the names in uppercase letters, we use handleChange as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are controlled components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are controlled components?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-what-are-the-different-phases-of-component-lifecycle",
    title: "What are the different phases of component lifecycle?",
    prompt: "What are the different phases of component lifecycle?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Connecting, Authenticating, and Disconnecting phases.",
        isCorrect: false,
        explanation: "These describe network socket lifecycles, not React components."
      },
      {
        id: "B",
        text: "Mounting (creation/insertion into DOM), Updating (re-rendering on prop/state changes), and Unmounting (removal from DOM), divided into Render, Pre-commit, and Commit phases.",
        isCorrect: true,
        explanation: "Correct. React's lifecycle separates the pure, interruptible Render phase from the synchronous DOM-mutating Commit phase across Mount, Update, and Unmount."
      },
      {
        id: "C",
        text: "Compilation, Minification, and Deployment phases.",
        isCorrect: false,
        explanation: "These are build steps, not runtime React component lifecycle phases."
      },
      {
        id: "D",
        text: "Lexical parsing, Bytecode interpretation, and Garbage collection.",
        isCorrect: false,
        explanation: "These are JavaScript engine phases, distinct from React's component lifecycle."
      }
    ],
    correctAnswer: "B",
    explanation: "The component lifecycle has three distinct lifecycle phases: Mounting: The component is ready to mount in the browser DOM. This phase covers initialization from constructor(), getDerivedStateFromProps(), render(), and componentDidMount() lifecycle methods. Updating: In this phase, the component get updated in two ways, sending the new props and updating the state either from setState() or forceUpdate(). This phase covers getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods. Unmounting: In this last phase, the component is not needed and get unmounted from the browser DOM. This phase includes componentWillUnmount() lifecycle method. It's worth mentioning that React internally has a concept of phases when applying changes to the DOM. They are separated as follows Render The component will render without any side-effects. This applies for Pure components and in this phase, React can pause, abort, or restart the render. Pre-commit Before the component actually applies the changes to the DOM, there is a moment that allows React to read from the DOM through the getSnapshotBeforeUpdate(). Commit React works with the DOM and executes the final lifecycles respectively componentDidMount() for mounting, componentDidUpdate() for updating, and componentWillUnmount() for unmounting. React 16.3+ Phases (or an interactive version) Before React 16.3: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the different phases of component lifecycle?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the different phases of component lifecycle?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-how-to-set-state-with-a-dynamic-key-name",
    title: "How to set state with a dynamic key name?",
    prompt: "How to set state with a dynamic key name?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "handleInputChange(event) {\nthis.setState({ [event.target.id]: event.target.value })\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Pass a string containing raw JavaScript code to `eval()` inside `setState()`.",
        isCorrect: false,
        explanation: "`eval()` is dangerous, slow, and unnecessary when computed property names are standard ES6."
      },
      {
        id: "B",
        text: "Dynamic key names are not supported in JavaScript or React.",
        isCorrect: false,
        explanation: "ES6 computed property syntax `[expression]: value` fully supports dynamic keys."
      },
      {
        id: "C",
        text: "Use ES6 computed property names inside the state object: `this.setState({ [event.target.name]: event.target.value })`.",
        isCorrect: true,
        explanation: "Correct. Square bracket syntax `[key]: value` dynamically computes the object property key from a variable or event target property."
      },
      {
        id: "D",
        text: "Directly mutate `this.state[key] = value` without calling `setState`.",
        isCorrect: false,
        explanation: "Direct mutation does not trigger reactive component re-renders."
      }
    ],
    correctAnswer: "C",
    explanation: "If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with computed property names.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to set state with a dynamic key name?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to set state with a dynamic key name?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-what-would-be-the-common-mistake-of-function-being-call",
    title: "What would be the common mistake of function being called every time the component renders?",
    prompt: "What would be the common mistake of function being called every time the component renders?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "render() {\n// Wrong: handleClick is called instead of passed as a reference!\nreturn <button onClick={this.handleClick()}>{'Click Me'}</button>\n}\n\nrender() {\n// Correct: handleClick is passed as a reference!\nreturn <button onClick={this.handleClick}>{'Click Me'}</button>\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Invoking the function immediately in JSX `<button onClick={handleClick()}>` instead of passing the function reference `<button onClick={handleClick}>`.",
        isCorrect: true,
        explanation: "Correct. Appending parentheses `()` executes the function during render, potentially causing infinite loops if the function updates state."
      },
      {
        id: "B",
        text: "Using `useCallback` to memoize the function reference.",
        isCorrect: false,
        explanation: "`useCallback` caches the function reference; it does not invoke it prematurely."
      },
      {
        id: "C",
        text: "Naming the function `handleClick` instead of `onButtonClick`.",
        isCorrect: false,
        explanation: "Function names are arbitrary identifiers and do not cause premature invocation."
      },
      {
        id: "D",
        text: "Passing an arrow function `<button onClick={() => handleClick()}>`.",
        isCorrect: false,
        explanation: "Inline arrow functions pass a callback reference that executes only upon the click event."
      }
    ],
    correctAnswer: "A",
    explanation: "You need to make sure that function is not being called while passing the function as a parameter. Instead, pass the function itself without parenthesis:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What would be the common mistake of function being called every time the component renders?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What would be the common mistake of function being called every time the component renders?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-react-uses-classname-over-class-attribute",
    title: "Why React uses className over class attribute?",
    prompt: "Why React uses className over class attribute?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "render() {\nreturn <span className={'menu navigation-menu'}>{'Menu'}</span>\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because `class` is a reserved keyword in JavaScript, and JSX transpiles directly into standard JavaScript objects and function calls.",
        isCorrect: true,
        explanation: "Correct. To avoid syntax conflicts in JavaScript, React adopted `className` (matching the DOM `element.className` property) instead of the HTML `class` attribute."
      },
      {
        id: "B",
        text: "Because `className` is processed by the GPU while `class` is processed by the CPU.",
        isCorrect: false,
        explanation: "It is purely a JavaScript language keyword avoidance convention."
      },
      {
        id: "C",
        text: "Because `className` encrypts the CSS classes for browser security.",
        isCorrect: false,
        explanation: "`className` is a plain string attribute, unrelated to encryption."
      },
      {
        id: "D",
        text: "Because the HTML5 specification banned the `class` attribute in 2015.",
        isCorrect: false,
        explanation: "HTML5 standardizes the `class` attribute; JSX uses `className` due to JavaScript language syntax."
      }
    ],
    correctAnswer: "A",
    explanation: "class is a keyword in JavaScript, and JSX is an extension of JavaScript. That's the principal reason why React uses className instead of class. Pass a string as the className prop.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why React uses className over class attribute?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why React uses className over class attribute?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-fragments",
    title: "What are fragments?",
    prompt: "What are fragments?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "render() {\nreturn (\n  <React.Fragment>\n    <ChildA />\n    <ChildB />\n    <ChildC />\n  </React.Fragment>\n)\n}\n\nrender() {\nreturn (\n  <>\n    <ChildA />\n    <ChildB />\n    <ChildC />\n  </>\n)\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Broken components that crashed during rendering.",
        isCorrect: false,
        explanation: "Fragments are standard grouping utilities, not crashed error states."
      },
      {
        id: "B",
        text: "A built-in React component (`<React.Fragment>` or shorthand `<>...</>`) that groups multiple sibling elements without rendering an extra wrapper node into the DOM.",
        isCorrect: true,
        explanation: "Correct. Fragments prevent DOM bloat and preserve table/flexbox/grid layout structures by grouping elements virtually in JSX."
      },
      {
        id: "C",
        text: "Database records split across multiple disk partitions.",
        isCorrect: false,
        explanation: "Fragments exist only in React virtual element trees."
      },
      {
        id: "D",
        text: "Code bundles split into asynchronous chunks by Webpack.",
        isCorrect: false,
        explanation: "Fragments are JSX element grouping wrappers."
      }
    ],
    correctAnswer: "B",
    explanation: "It's common pattern in React which is used for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM. There is also a shorter syntax, but it's not supported in many tools:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are fragments?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are fragments?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-are-portals-in-react",
    title: "What are portals in React?",
    prompt: "What are portals in React?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "ReactDOM.createPortal(child, container);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A mechanism (`ReactDOM.createPortal(child, domNode)`) to render children into a different DOM subtree outside the parent component while preserving React event bubbling and context.",
        isCorrect: true,
        explanation: "Correct. Portals allow modals, dialogs, and tooltips to render directly into `document.body` or an overlay container without being clipped by parent `overflow: hidden` or `z-index` rules."
      },
      {
        id: "B",
        text: "A deprecated API removed in React 16.",
        isCorrect: false,
        explanation: "Portals remain a standard and actively used ReactDOM feature."
      },
      {
        id: "C",
        text: "Encrypted network tunnels between two browser tabs.",
        isCorrect: false,
        explanation: "Portals manage DOM element rendering targets, not network tunnels."
      },
      {
        id: "D",
        text: "A method that compiles React components into WebGL shaders.",
        isCorrect: false,
        explanation: "Portals render React elements to arbitrary real DOM nodes."
      }
    ],
    correctAnswer: "A",
    explanation: "Portal is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. The first argument is any render-able React child, such as an element, string, or fragment. The second argument is a DOM element.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are portals in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are portals in React?.",
    hints: [
      "A portal moves where a node is inserted in the DOM. Context and event bubbling still follow the React tree."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react-dom.dev/reference/react-dom/createPortal"
  },
  {
    id: "react-what-is-the-use-of-react-dom-package",
    title: "What is the use of react-dom package?",
    prompt: "What is the use of react-dom package?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A compiler that converts CSS files into WebAssembly binaries.",
        isCorrect: false,
        explanation: "`react-dom` mounts and reconciles React element trees in web browsers."
      },
      {
        id: "B",
        text: "A database connector for querying PostgreSQL and MongoDB.",
        isCorrect: false,
        explanation: "`react-dom` interacts with the browser DOM, not backend databases."
      },
      {
        id: "C",
        text: "Provides DOM-specific rendering entry points (`createRoot`, `hydrateRoot`, `createPortal`) that connect React's platform-agnostic virtual element tree to the browser DOM.",
        isCorrect: true,
        explanation: "Correct. `react` contains the core component/hook APIs, while `react-dom` handles rendering and updating real HTML DOM elements in the browser."
      },
      {
        id: "D",
        text: "A styling library that replaces Tailwind and CSS Modules.",
        isCorrect: false,
        explanation: "`react-dom` is React's DOM renderer, not a CSS styling framework."
      }
    ],
    correctAnswer: "C",
    explanation: "The react-dom package provides DOM-specific methods that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are: render() hydrate() unmountComponentAtNode() findDOMNode() createPortal(): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the use of react-dom package?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the use of react-dom package?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-purpose-of-render-method-of-react-dom",
    title: "What is the purpose of render method of react-dom?",
    prompt: "What is the purpose of render method of react-dom?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "ReactDOM.render(element, container[, callback])",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "To compile TypeScript files into JavaScript on disk.",
        isCorrect: false,
        explanation: "`render` mounts React element trees into real browser DOM containers."
      },
      {
        id: "B",
        text: "To send an HTTP POST request to a remote server.",
        isCorrect: false,
        explanation: "`render` is a client DOM mounting function."
      },
      {
        id: "C",
        text: "In legacy React (<18), `ReactDOM.render(element, container)` mounted a React element tree into a target DOM container; superseded in React 18+ by `ReactDOM.createRoot(container).render(element)`.",
        isCorrect: true,
        explanation: "Correct. `ReactDOM.render` was the legacy mounting API, replaced by `createRoot` to support React 18 Concurrent features."
      },
      {
        id: "D",
        text: "To delete the browser cache and clear user cookies.",
        isCorrect: false,
        explanation: "`render` has no effect on browser cookies."
      }
    ],
    correctAnswer: "C",
    explanation: "This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes. If the optional callback is provided, it will be executed after the component is rendered or updated.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of render method of react-dom?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of render method of react-dom?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-reactdomserver",
    title: "What is ReactDOMServer?",
    prompt: "What is ReactDOMServer?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "// using Express\nimport { renderToString } from 'react-dom/server';\nimport MyPage from './MyPage';\n\napp.get('/', (req, res) => {\n  res.write('<!DOCTYPE html><html><head><title>My Page</title></head><body>');\n  res.write('<div id=\"content\">');\n  res.write(renderToString(<MyPage />));\n  res.write('</div></body></html>');\n  res.end();\n});",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A physical hardware server blade manufactured by Meta for data centers.",
        isCorrect: false,
        explanation: "`react-dom/server` is an npm software package, not physical server hardware."
      },
      {
        id: "B",
        text: "A database engine for storing React component state on disk.",
        isCorrect: false,
        explanation: "`react-dom/server` renders component markup to HTML strings/streams."
      },
      {
        id: "C",
        text: "A web server that replaces Apache and Nginx.",
        isCorrect: false,
        explanation: "`react-dom/server` renders React component trees to HTML within Node.js/Edge web servers."
      },
      {
        id: "D",
        text: "A companion package providing methods (`renderToString`, `renderToPipeableStream`, `renderToStaticMarkup`) to render React components into static HTML strings or streams on Node.js/Edge servers.",
        isCorrect: true,
        explanation: "Correct. `react-dom/server` enables Server-Side Rendering (SSR) and static generation, delivering pre-rendered HTML for fast First Contentful Paint and SEO."
      }
    ],
    correctAnswer: "D",
    explanation: "The ReactDOMServer object enables you to render components to static markup (typically used on node server). This object is mainly used for server-side rendering (SSR). The following methods can be used in both the server and browser environments: renderToString() renderToStaticMarkup() For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call renderToString to render your root component to a string, which you then send as response.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is ReactDOMServer?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is ReactDOMServer?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-how-to-use-innerhtml-in-react",
    title: "How to use innerHTML in React?",
    prompt: "How to use innerHTML in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function createMarkup() {\n  return { __html: 'First &middot; Second' };\n}\n\nfunction MyComponent() {\n  return <div dangerouslySetInnerHTML={createMarkup()} />;\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "InnerHTML is completely forbidden and cannot be used in React.",
        isCorrect: false,
        explanation: "`dangerouslySetInnerHTML` is supported when raw HTML rendering is necessary."
      },
      {
        id: "B",
        text: "Assign `element.innerHTML = html` directly inside the component render function.",
        isCorrect: false,
        explanation: "Directly mutating the DOM inside render causes synchronization bugs and breaks React reconciliation."
      },
      {
        id: "C",
        text: "Use the `dangerouslySetInnerHTML={{ __html: sanitizedHtml }}` prop on a JSX element, ensuring all HTML strings are sanitized (e.g. with DOMPurify) to prevent XSS attacks.",
        isCorrect: true,
        explanation: "Correct. React uses `dangerouslySetInnerHTML` to explicitly remind developers of Cross-Site Scripting (XSS) risks when injecting raw HTML."
      },
      {
        id: "D",
        text: "Pass raw HTML strings directly into JSX curly braces `{ '<div>Hello</div>' }`.",
        isCorrect: false,
        explanation: "React automatically escapes strings inside `{}` to prevent XSS, rendering raw tags as plain text."
      }
    ],
    correctAnswer: "C",
    explanation: "The dangerouslySetInnerHTML attribute is React's replacement for using innerHTML in the browser DOM. Just like innerHTML, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a __html object as key and HTML text as value. In this example MyComponent uses dangerouslySetInnerHTML attribute for setting HTML markup:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use innerHTML in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use innerHTML in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-use-styles-in-react",
    title: "How to use styles in React?",
    prompt: "How to use styles in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const divStyle = {\n  color: 'blue',\n  backgroundImage: 'url(' + imgUrl + ')',\n};\n\nfunction HelloWorldComponent() {\n  return <div style={divStyle}>Hello World!</div>;\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Pass a JavaScript object with camelCased CSS property names to the `style` prop (`style={{ color: 'blue', fontSize: '16px' }}`), or use CSS Modules / Tailwind / CSS-in-JS.",
        isCorrect: true,
        explanation: "Correct. The `style` prop expects a JavaScript object with camelCased keys (e.g. `backgroundColor`), preventing string parsing overhead and XSS risks."
      },
      {
        id: "B",
        text: "React components do not support any visual styling.",
        isCorrect: false,
        explanation: "React supports inline style objects, CSS Modules, Tailwind, and CSS-in-JS libraries."
      },
      {
        id: "C",
        text: "Pass a semicolon-delimited CSS string `<div style='color: blue; font-size: 16px'>`.",
        isCorrect: false,
        explanation: "Passing CSS strings to the `style` prop throws a React warning/error; React expects an object."
      },
      {
        id: "D",
        text: "Styles can only be applied by editing browser C++ source code.",
        isCorrect: false,
        explanation: "Styles are applied using standard CSS objects, classes, or utility frameworks."
      }
    ],
    correctAnswer: "A",
    explanation: "The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes. Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. node.style.backgroundImage).: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use styles in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use styles in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-events-are-different-in-react",
    title: "How events are different in React?",
    prompt: "How events are different in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React uses camelCase event naming (`onClick`), passes function handlers instead of strings, delegates events to the root container, and wraps native events in `SyntheticEvent`.",
        isCorrect: true,
        explanation: "Correct. React normalizes browser event quirks, attaches listeners at the root level, and passes cross-browser synthetic event objects to handlers."
      },
      {
        id: "B",
        text: "There is no difference; React uses raw HTML event attributes.",
        isCorrect: false,
        explanation: "React differs syntactically (camelCase, function references) and architecturally (delegation, SyntheticEvents)."
      },
      {
        id: "C",
        text: "React events execute on backend Node.js servers instead of in the browser.",
        isCorrect: false,
        explanation: "React events handle user interactions locally in the browser runtime."
      },
      {
        id: "D",
        text: "React events only fire when using a physical keyboard, ignoring mouse clicks.",
        isCorrect: false,
        explanation: "React handles click, change, keydown, touch, pointer, and all standard web events."
      }
    ],
    correctAnswer: "A",
    explanation: "Handling events in React elements has some syntactic differences: React event handlers are named using camelCase, rather than lowercase. With JSX you pass a function as the event handler, rather than a string.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How events are different in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How events are different in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-will-happen-if-you-use-setstate-in-constructor",
    title: "What will happen if you use setState() in constructor?",
    prompt: "What will happen if you use setState() in constructor?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It triggers a warning/error ('Can only update a mounted or mounting component') and causes unnecessary re-renders; `this.state = { ... }` should be used for initialization instead.",
        isCorrect: true,
        explanation: "Correct. In class constructors, state must be initialized by direct assignment `this.state = { ... }`; calling `setState()` before mounting is invalid."
      },
      {
        id: "B",
        text: "It encrypts the component's state using SHA-256.",
        isCorrect: false,
        explanation: "Constructors should assign `this.state` directly to define initial state."
      },
      {
        id: "C",
        text: "The computer's operating system will immediately crash.",
        isCorrect: false,
        explanation: "Calling `setState` in a constructor logs a React runtime warning/error, not an OS crash."
      },
      {
        id: "D",
        text: "It permanently converts the class component into a functional component.",
        isCorrect: false,
        explanation: "Calling `setState` in a constructor is a misuse of the state API."
      }
    ],
    correctAnswer: "A",
    explanation: "When you use setState(), then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: Can only update a mounted or mounting component. So we need to use this.state to initialize variables inside constructor.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What will happen if you use setState() in constructor?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What will happen if you use setState() in constructor?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-the-impact-of-indexes-as-keys",
    title: "What is the impact of indexes as keys?",
    prompt: "What is the impact of indexes as keys?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "{\n  todos.map((todo, index) => <Todo {...todo} key={index} />);\n}\n\n{\n  todos.map((todo) => <Todo {...todo} key={todo.id} />);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "It throws an immediate fatal syntax error that halts JavaScript execution.",
        isCorrect: false,
        explanation: "Using index as key is valid JavaScript/React syntax and produces only a linter warning, not a syntax error."
      },
      {
        id: "B",
        text: "It causes all HTTP network requests to run synchronously.",
        isCorrect: false,
        explanation: "Reconciliation keys operate purely in React's in-memory rendering pipeline."
      },
      {
        id: "C",
        text: "It permanently disables the browser's CSS animation engine.",
        isCorrect: false,
        explanation: "Index keys cause reconciliation issues, not browser-wide CSS engine failures."
      },
      {
        id: "D",
        text: "If list items are reordered, inserted at the beginning, or deleted, index keys cause component state to attach to the wrong items and trigger unnecessary DOM re-renders.",
        isCorrect: true,
        explanation: "Correct. Because indices change when items are inserted or reordered, React cannot distinguish which item moved, leading to UI glitches in inputs and broken animations."
      }
    ],
    correctAnswer: "D",
    explanation: "Keys should be stable, predictable, and unique so that React can keep track of elements. In the below code snippet each element's key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do. If you use element data for unique key, assuming todo.id is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the impact of indexes as keys?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the impact of indexes as keys?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-is-it-good-to-use-setstate-in-componentwillmount-method",
    title: "Is it good to use setState() in componentWillMount() method?",
    prompt: "Is it good to use setState() in componentWillMount() method?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "componentDidMount() {\naxios.get(`api/todos`)\n  .then((result) => {\n    this.setState({\n      messages: [...result.data]\n    })\n  })\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "No, `componentWillMount` is deprecated (UNSAFE) and can cause bugs with async rendering; initial state belongs in the constructor/`useState`, and async fetches belong in `componentDidMount`/`useEffect`.",
        isCorrect: true,
        explanation: "Correct. `componentWillMount` was deprecated in React 16.3 because it can be called multiple times before render in concurrent mode; initialization belongs in constructors or mount effects."
      },
      {
        id: "B",
        text: "Yes, it is the only recommended place to perform async database operations.",
        isCorrect: false,
        explanation: "Async calls in `componentWillMount` trigger duplicate requests in concurrent mode and are strongly discouraged."
      },
      {
        id: "C",
        text: "`componentWillMount` is the newest hook added in React 19.",
        isCorrect: false,
        explanation: "`componentWillMount` is a legacy class lifecycle method, deprecated in React 16.3."
      },
      {
        id: "D",
        text: "Calling `setState` in `componentWillMount` shuts down the web server.",
        isCorrect: false,
        explanation: "It simply sets state synchronously before the first render, but is deprecated due to async rendering hazards."
      }
    ],
    correctAnswer: "A",
    explanation: "Yes, it is safe to use setState() inside componentWillMount() method. But at the same it is recommended to avoid async initialization in componentWillMount() lifecycle method. componentWillMount() is invoked immediately before mounting occurs. It is called before render(), therefore setting state in this method will not trigger a re-render. Avoid introducing any side-effects or subscriptions in this method. We need to make sure async calls for component initialization happened in componentDidMount() instead of componentWillMount().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it good to use setState() in componentWillMount() method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it good to use setState() in componentWillMount() method?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-will-happen-if-you-use-props-in-initial-state",
    title: "What will happen if you use props in initial state?",
    prompt: "What will happen if you use props in initial state?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      records: [],\n      inputValue: this.props.inputValue,\n    };\n  }\n\n  render() {\n    return <div>{this.state.inputValue}</div>;\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      record: [],\n    };\n  }\n\n  render() {\n    return <div>{this.props.inputValue}</div>;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The component will throw a fatal JavaScript syntax error and refuse to mount.",
        isCorrect: false,
        explanation: "Initializing state from props is valid syntax, but creates subtle synchronization anti-patterns."
      },
      {
        id: "B",
        text: "React automatically deletes the prop from the parent component.",
        isCorrect: false,
        explanation: "Props are immutable in the child and remain untouched in the parent."
      },
      {
        id: "C",
        text: "The state is only initialized once when the component mounts; if parent props subsequently change, the component's state will NOT update automatically, leading to stale data bugs.",
        isCorrect: true,
        explanation: "Correct. Copying props into initial state creates two sources of truth; subsequent prop updates are ignored unless manually synchronized, so deriving values during render is preferred."
      },
      {
        id: "D",
        text: "The component is automatically converted into an uncontrolled component.",
        isCorrect: false,
        explanation: "The component remains standard, but holds disconnected stale state."
      }
    ],
    correctAnswer: "C",
    explanation: "If the props on the component are changed without the component being refreshed, the new prop value will never be displayed because the constructor function will never update the current state of the component. The initialization of state from props only runs when the component is first created. The below component won't display the updated input value: Using props inside render method will update the value:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What will happen if you use props in initial state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What will happen if you use props in initial state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-conditionally-render-components",
    title: "How do you conditionally render components?",
    prompt: "How do you conditionally render components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "const MyComponent = ({ name, address }) => (\n  <div>\n    <h2>{name}</h2>\n    {address && <p>{address}</p>}\n  </div>\n);\n\nconst MyComponent = ({ name, address }) => (\n  <div>\n    <h2>{name}</h2>\n    {address ? <p>{address}</p>: <p>{'Address is not available'}</p>}\n  </div>\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Conditional rendering is prohibited in React applications.",
        isCorrect: false,
        explanation: "Conditional rendering is a core architectural pattern in React."
      },
      {
        id: "B",
        text: "Modify `document.styleSheets` rules dynamically in a `while` loop.",
        isCorrect: false,
        explanation: "React conditional rendering mounts/unmounts element trees rather than hacking stylesheet rules."
      },
      {
        id: "C",
        text: "Wrap components in `v-if` or `ng-if` template directive attributes.",
        isCorrect: false,
        explanation: "`v-if` (Vue) and `ng-if` (Angular) are framework-specific template directives; React uses standard JavaScript expressions."
      },
      {
        id: "D",
        text: "Use ternary operators (`condition ? <A /> : <B />`), logical AND (`condition && <A />`), early `if/return` guards, or switch/lookup tables in JavaScript.",
        isCorrect: true,
        explanation: "Correct. Standard JavaScript control flow and expressions allow declarative, clean conditional rendering in React."
      }
    ],
    correctAnswer: "D",
    explanation: "In some cases you want to render different components depending on some state. JSX does not render false or undefined, so you can use conditional short-circuiting to render a given part of your component only if a certain condition is true. If you need an if-else condition then use ternary operator.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you conditionally render components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you conditionally render components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-we-need-to-be-careful-when-spreading-props-on-dom-e",
    title: "Why we need to be careful when spreading props on DOM elements?",
    prompt: "Why we need to be careful when spreading props on DOM elements?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const ComponentA = () => <ComponentB isDisplay={true} className={'componentStyle'} />;\n\nconst ComponentB = ({ isDisplay...domProps }) => <div {...domProps}>{'ComponentB'}</div>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Spreading props deletes the computer's operating system files.",
        isCorrect: false,
        explanation: "Spreading props passes JavaScript object properties, unrelated to OS files."
      },
      {
        id: "B",
        text: "Spreading props automatically converts all numbers into booleans.",
        isCorrect: false,
        explanation: "Object spreading preserves exact property values and types."
      },
      {
        id: "C",
        text: "Spreading arbitrary props (`<div {...props} />`) can forward non-standard custom attributes to native HTML DOM elements, triggering React console warnings and risking invalid HTML.",
        isCorrect: true,
        explanation: "Correct. Spreading unknown props onto native DOM tags can inject invalid HTML attributes or accidentally override internal attributes like `className` or `id`."
      },
      {
        id: "D",
        text: "The spread operator `...` is illegal syntax in JavaScript and causes build crashes.",
        isCorrect: false,
        explanation: "The spread operator is standard ES6 syntax, but requires careful prop filtering when applied to DOM elements."
      }
    ],
    correctAnswer: "C",
    explanation: "When we spread props we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with .rest operator, so it will add only required props. For example,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why we need to be careful when spreading props on DOM elements?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why we need to be careful when spreading props on DOM elements?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-you-implement-server-side-rendering-or-ssr",
    title: "How you implement Server Side Rendering or SSR?",
    prompt: "How you implement Server Side Rendering or SSR?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "import ReactDOMServer from 'react-dom/server';\nimport App from './App';\n\nReactDOMServer.renderToString(<App />);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Execute client mouse clicks on backend server hardware via WebSockets.",
        isCorrect: false,
        explanation: "SSR renders static HTML for initial load; user interactions execute on the client in the browser."
      },
      {
        id: "B",
        text: "Compile React components into raw MP4 video streams.",
        isCorrect: false,
        explanation: "SSR generates standard HTML markup and JSON state payloads."
      },
      {
        id: "C",
        text: "SSR is impossible in React because React only runs in web browsers.",
        isCorrect: false,
        explanation: "React has supported server-side rendering since its earliest releases via `react-dom/server`."
      },
      {
        id: "D",
        text: "Use frameworks like Next.js/Remix or build a custom Node.js server using `renderToString` / `renderToPipeableStream` from `react-dom/server`, followed by client hydration with `hydrateRoot`.",
        isCorrect: true,
        explanation: "Correct. Server-Side Rendering renders the initial HTML on the server and hydrates it in the browser, providing instant First Contentful Paint and optimal SEO."
      }
    ],
    correctAnswer: "D",
    explanation: "React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side. This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How you implement Server Side Rendering or SSR?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How you implement Server Side Rendering or SSR?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "react-what-is-the-lifecycle-methods-order-in-mounting",
    title: "What is the lifecycle methods order in mounting?",
    prompt: "What is the lifecycle methods order in mounting?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`getSnapshotBeforeUpdate()` -> `constructor()` -> `render()`.",
        isCorrect: false,
        explanation: "`getSnapshotBeforeUpdate` runs immediately before DOM mutations during updates."
      },
      {
        id: "B",
        text: "`render()` -> `componentDidUpdate()` -> `shouldComponentUpdate()`.",
        isCorrect: false,
        explanation: "`componentDidUpdate` and `shouldComponentUpdate` run during the update phase, not initial mounting."
      },
      {
        id: "C",
        text: "`componentDidMount()` -> `render()` -> `constructor()` -> `componentWillUnmount()`.",
        isCorrect: false,
        explanation: "`constructor` must run first to instantiate the class before rendering or mounting."
      },
      {
        id: "D",
        text: "`constructor()` -> `static getDerivedStateFromProps()` -> `render()` -> `componentDidMount()`.",
        isCorrect: true,
        explanation: "Correct. During class mounting, React constructs the instance, syncs state from props, calculates virtual JSX in render, commits to DOM, and invokes `componentDidMount`."
      }
    ],
    correctAnswer: "D",
    explanation: "The lifecycle methods are called in the following order when an instance of a component is being created and inserted into the DOM. constructor() static getDerivedStateFromProps() render() componentDidMount(): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the lifecycle methods order in mounting?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the lifecycle methods order in mounting?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-is-the-purpose-of-getderivedstatefromprops-lifecyc",
    title: "What is the purpose of getDerivedStateFromProps() lifecycle method?",
    prompt: "What is the purpose of getDerivedStateFromProps() lifecycle method?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  static getDerivedStateFromProps(props, state) {\n    // ...\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A hook used in functional components to replace `useState`.",
        isCorrect: false,
        explanation: "It is a static class lifecycle method; functional components derive values during render."
      },
      {
        id: "B",
        text: "A static class lifecycle method invoked before `render()` on both mount and updates that returns an object to update state based on prop changes, or `null` to update nothing.",
        isCorrect: true,
        explanation: "Correct. It replaced `componentWillReceiveProps` as a pure static method without access to `this`, designed for rare cases where state depends directly on changing props over time."
      },
      {
        id: "C",
        text: "A method that executes asynchronous HTTP fetches on every keystroke.",
        isCorrect: false,
        explanation: "`getDerivedStateFromProps` must remain a pure synchronous function without side effects."
      },
      {
        id: "D",
        text: "A method used exclusively to mutate DOM elements directly.",
        isCorrect: false,
        explanation: "It returns a state update object and cannot access or mutate DOM nodes."
      }
    ],
    correctAnswer: "B",
    explanation: "The new static getDerivedStateFromProps() lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or null to indicate that the new props do not require any state updates. This lifecycle method along with componentDidUpdate() covers all the use cases of componentWillReceiveProps().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of getDerivedStateFromProps() lifecycle method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of getDerivedStateFromProps() lifecycle method?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-is-the-recommended-ordering-of-methods-in-componen",
    title: "What is the recommended ordering of methods in component class?",
    prompt: "What is the recommended ordering of methods in component class?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Sort all methods alphabetically from A to Z regardless of type.",
        isCorrect: false,
        explanation: "Alphabetical ordering scatters related lifecycle phases arbitrarily across the file."
      },
      {
        id: "B",
        text: "Order methods randomly on every commit.",
        isCorrect: false,
        explanation: "Consistent method ordering is essential for codebase readability."
      },
      {
        id: "C",
        text: "Static methods -> `constructor()` -> lifecycle methods (mount to unmount) -> custom handlers/helpers -> getter methods -> `render()`.",
        isCorrect: true,
        explanation: "Correct. Organizing class methods chronologically from initialization through lifecycles, event handlers, and ending with `render()` maximizes readability and maintainability."
      },
      {
        id: "D",
        text: "Put `render()` at the very top, followed by `constructor()` at the bottom.",
        isCorrect: false,
        explanation: "Convention places `constructor` at the top and `render` as the final method."
      }
    ],
    correctAnswer: "C",
    explanation: "Recommended ordering of methods from mounting to render stage: static methods constructor() getChildContext() componentWillMount() componentDidMount() componentWillReceiveProps() shouldComponentUpdate() componentWillUpdate() componentDidUpdate() componentWillUnmount() click handlers or event handlers like onClickSubmit() or onChangeDescription() getter methods for render like getSelectReason() or getFooterContent() optional render methods like renderNavigation() or renderProfilePicture() render(): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the recommended ordering of methods in component class?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the recommended ordering of methods in component class?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-a-switching-component",
    title: "What is a switching component?",
    prompt: "What is a switching component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import HomePage from './HomePage';\nimport AboutPage from './AboutPage';\nimport ServicesPage from './ServicesPage';\nimport ContactPage from './ContactPage';\n\nconst PAGES = {\n  home: HomePage,\n  about: AboutPage,\n  services: ServicesPage,\n  contact: ContactPage,\n};\n\nconst Page = (props) => {\n  const Handler = PAGES[props.page] || ContactPage;\n\n  return <Handler {...props} />;\n};\n\n// The keys of the PAGES object can be used in the prop types to catch dev-time errors.\nPage.propTypes = {\n  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A physical hardware network switch used in server racks.",
        isCorrect: false,
        explanation: "In React, a switching component is a UI design pattern for dynamic component dispatch."
      },
      {
        id: "B",
        text: "A component that dynamically renders one of several components based on a prop value, commonly implemented using an object dictionary lookup map (`PAGES[page]`).",
        isCorrect: true,
        explanation: "Correct. A switching component maps prop keys to component types (e.g. `const PAGES = { home: Home, about: About }`), rendering the matched component dynamically."
      },
      {
        id: "C",
        text: "A component that rapidly switches the monitor power on and off.",
        isCorrect: false,
        explanation: "It switches which child component renders based on props."
      },
      {
        id: "D",
        text: "A compiler plugin that swaps TypeScript for JavaScript.",
        isCorrect: false,
        explanation: "A switching component is standard application-level JSX logic."
      }
    ],
    correctAnswer: "B",
    explanation: "A switching component is a component that renders one of many components. We need to use object to map prop values to components. For example, a switching component to display different pages based on page prop:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a switching component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a switching component?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-strict-mode-in-react",
    title: "What is strict mode in React?",
    prompt: "What is strict mode in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React from 'react';\n\nfunction ExampleApplication() {\n  return (\n    <div>\n      <Header />\n      <React.StrictMode>\n        <div>\n          <ComponentOne />\n          <ComponentTwo />\n        </div>\n      </React.StrictMode>\n      <Footer />\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A security firewall that encrypts all JSX DOM nodes in the browser.",
        isCorrect: false,
        explanation: "StrictMode is a developer diagnostic tool, not an encryption firewall."
      },
      {
        id: "B",
        text: "A TypeScript compiler setting that disallows using JavaScript outside of WebAssembly.",
        isCorrect: false,
        explanation: "StrictMode is a standard React runtime component."
      },
      {
        id: "C",
        text: "`<React.StrictMode>` is a development-only tool that checks for side-effect impurities by double-invoking renders/effects, flagging legacy APIs, and warning about unsafe lifecycles.",
        isCorrect: true,
        explanation: "Correct. StrictMode renders no extra DOM elements and helps developers prepare code for concurrent features by enforcing pure component lifecycles."
      },
      {
        id: "D",
        text: "A production optimization flag that disables all error throwing.",
        isCorrect: false,
        explanation: "StrictMode is active only in development and intentionally surfaces warnings."
      }
    ],
    correctAnswer: "C",
    explanation: "React.StrictMode is a useful component for highlighting potential problems in an application. Just like <Fragment>, <StrictMode> does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for development mode only. In the example above, the strict mode checks apply to <ComponentOne> and <ComponentTwo> components only.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is strict mode in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is strict mode in React?.",
    hints: [
      "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/StrictMode"
  },
  {
    id: "react-why-should-component-names-start-with-capital-letter",
    title: "Why should component names start with capital letter?",
    prompt: "Why should component names start with capital letter?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class SomeComponent extends Component {\n  // Code goes here\n}\n\nclass myComponent extends Component {\n  render() {\n    return <div />;\n  }\n}\n\nexport default myComponent;\n\nimport MyComponent from './MyComponent';",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because lowercase component names cause database corruption.",
        isCorrect: false,
        explanation: "The distinction is purely JSX compiler tag resolution."
      },
      {
        id: "B",
        text: "JSX uses casing to differentiate user-defined React components (PascalCase -> `React.createElement(MyComponent)`) from built-in HTML/SVG tags (lowercase -> `'div'`).",
        isCorrect: true,
        explanation: "Correct. Compilers treat lowercase tags as HTML string literals (`'div'`, `'span'`) and capitalized tags as component variable identifiers in scope."
      },
      {
        id: "C",
        text: "Because uppercase letters compile 10x faster in JavaScript engines.",
        isCorrect: false,
        explanation: "Identifier casing has no impact on JavaScript compilation speeds."
      },
      {
        id: "D",
        text: "Because the HTML5 specification requires all tags to be uppercase.",
        isCorrect: false,
        explanation: "HTML5 standardizes lowercase tags; JSX uses capitalization to distinguish custom components from built-in tags."
      }
    ],
    correctAnswer: "B",
    explanation: "If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter. You can define component class which name starts with lowercase letter, but when it's imported it should have capital letter. Here lowercase is fine: While when imported in another file it should start with capital letter:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why should component names start with capital letter?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why should component names start with capital letter?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-are-custom-dom-attributes-supported-in-react-v16",
    title: "Are custom DOM attributes supported in React v16?",
    prompt: "Are custom DOM attributes supported in React v16?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<div mycustomattribute={'something'} />\n\n<div />\n\n<div mycustomattribute=\"something\" />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Yes, React 16+ passes all custom and unknown DOM attributes directly to the real DOM elements (previously React ignored unrecognized attributes).",
        isCorrect: true,
        explanation: "Correct. React 16 relaxed attribute whitelisting, allowing custom HTML attributes, new browser APIs, and third-party library attributes to render directly to the DOM."
      },
      {
        id: "B",
        text: "Custom attributes only work on backend Node.js servers.",
        isCorrect: false,
        explanation: "Custom attributes render directly into client browser HTML elements."
      },
      {
        id: "C",
        text: "Custom attributes are only supported if written in uppercase Roman numerals.",
        isCorrect: false,
        explanation: "Standard string attributes are supported directly in JSX."
      },
      {
        id: "D",
        text: "No, React 16 completely bans all custom attributes and throws syntax errors.",
        isCorrect: false,
        explanation: "React 16 added full support for passing custom attributes to the DOM."
      }
    ],
    correctAnswer: "A",
    explanation: "Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn't recognize, React would just skip it. For example, let's take a look at the below attribute: Would render an empty div to the DOM with React v15: In React v16 any unknown attributes will end up in the DOM: This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Are custom DOM attributes supported in React v16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Are custom DOM attributes supported in React v16?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-can-you-force-a-component-to-re-render-without-calling",
    title: "Can you force a component to re-render without calling setState?",
    prompt: "Can you force a component to re-render without calling setState?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "component.forceUpdate(callback);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Yes, by calling `component.forceUpdate(callback)` in class components, though it is strongly discouraged as render should purely depend on `this.props` and `this.state`.",
        isCorrect: true,
        explanation: "Correct. `forceUpdate()` bypasses `shouldComponentUpdate` to force a re-render; it is considered an anti-pattern because components should be driven by props and state."
      },
      {
        id: "B",
        text: "No, React makes it mathematically impossible to re-render without `setState`.",
        isCorrect: false,
        explanation: "`forceUpdate()` exists as an escape hatch for class components, though it should generally be avoided."
      },
      {
        id: "C",
        text: "Yes, by assigning `window.location.reload()` on every frame.",
        isCorrect: false,
        explanation: "Reloading the entire browser tab is not a component-level re-render."
      },
      {
        id: "D",
        text: "Yes, by deleting the component's prototype in JavaScript.",
        isCorrect: false,
        explanation: "Mutating prototypes causes runtime crashes rather than controlled re-renders."
      }
    ],
    correctAnswer: "A",
    explanation: "By default, when your component's state or props change, your component will re-render. If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate(). It is recommended to avoid all uses of forceUpdate() and only read from this.props and this.state in render().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can you force a component to re-render without calling setState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can you force a component to re-render without calling setState?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-what-is-the-difference-between-react-and-reactdom",
    title: "What is the difference between React and ReactDOM?",
    prompt: "What is the difference between React and ReactDOM?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`react-dom` was deprecated and replaced by jQuery in React 18.",
        isCorrect: false,
        explanation: "`react-dom` is the foundational DOM renderer for all web React applications."
      },
      {
        id: "B",
        text: "`react` is the core library for creating components, elements, and hooks; `react-dom` provides browser-specific DOM rendering and reconciliation methods (`createRoot`, `hydrateRoot`).",
        isCorrect: true,
        explanation: "Correct. Splitting the packages decoupled React's component model from the web DOM, enabling other renderers like React Native, React Three Fiber, and React PDF."
      },
      {
        id: "C",
        text: "`react` is for backend Node.js servers; `react-dom` is for frontend CSS styles.",
        isCorrect: false,
        explanation: "Both are frontend libraries: `react` defines components; `react-dom` renders them into the browser DOM."
      },
      {
        id: "D",
        text: "There is no difference; they are exact duplicates of the same package.",
        isCorrect: false,
        explanation: "They are separate npm packages separating component definitions from DOM operations."
      }
    ],
    correctAnswer: "B",
    explanation: "The react package contains React.createElement(), React.Component, React.Children, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The react-dom package contains ReactDOM.render(), and in react-dom/server we have server-side rendering support with ReactDOMServer.renderToString() and ReactDOMServer.renderToStaticMarkup().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React and ReactDOM?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React and ReactDOM?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-reactdom-is-separated-from-react",
    title: "Why ReactDOM is separated from React?",
    prompt: "Why ReactDOM is separated from React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Because ReactDOM runs exclusively in WebAssembly.",
        isCorrect: false,
        explanation: "ReactDOM is written in standard JavaScript/TypeScript."
      },
      {
        id: "B",
        text: "Because npm had a file size limit of 10KB per package.",
        isCorrect: false,
        explanation: "The separation was an architectural decision for multi-platform rendering, not an npm size limit."
      },
      {
        id: "C",
        text: "To decouple React's core component and virtual reconciliation model from browser DOM dependencies, allowing the same core to target Web, Mobile (React Native), Canvas, and 3D.",
        isCorrect: true,
        explanation: "Correct. Splitting `react` and `react-dom` in React v0.14 enabled multi-platform rendering while sharing universal component logic and hooks."
      },
      {
        id: "D",
        text: "Because web browsers banned the word 'React' from script tags.",
        isCorrect: false,
        explanation: "Browser script tags execute any valid JavaScript; package splitting was architectural."
      }
    ],
    correctAnswer: "C",
    explanation: "The React team worked on extracting all DOM-related features into a separate library called ReactDOM. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, react-native, react-art, react-canvas, and react-three, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM. To build more environments that React can render to, React team planned to split the main React package into two: react and react-dom. This paves the way to writing components that can be shared between the web version of React and React Native.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why ReactDOM is separated from React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why ReactDOM is separated from React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-use-react-label-element",
    title: "How to use React label element?",
    prompt: "How to use React label element?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<label for={'user'}>{'User'}</label>\n<input type={'text'} id={'user'} />\n\n<label htmlFor={'user'}>{'User'}</label>\n<input type={'text'} id={'user'} />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Labels are not supported in React; all text must be in `<span>` tags.",
        isCorrect: false,
        explanation: "`<label>` is fully supported and essential for web accessibility."
      },
      {
        id: "B",
        text: "Use `htmlFor` instead of `for` (`<label htmlFor='username'>`) because `for` is a reserved keyword in JavaScript/JSX.",
        isCorrect: true,
        explanation: "Correct. Since JSX compiles to JavaScript, `htmlFor` is used to bind labels to input `id` attributes without colliding with JavaScript's `for` loop keyword."
      },
      {
        id: "C",
        text: "Use `for` with double quotes `<label for='username'>`.",
        isCorrect: false,
        explanation: "Using `for` in React generates a console warning and fails to set the DOM attribute reliably; `htmlFor` is standard."
      },
      {
        id: "D",
        text: "Labels must be wrapped inside `<form-label>` custom elements.",
        isCorrect: false,
        explanation: "Standard HTML `<label>` tags with `htmlFor` are used in React."
      }
    ],
    correctAnswer: "B",
    explanation: "If you try to render a <label> element bound to a text input using the standard for attribute, then it produces HTML missing that attribute and prints a warning to the console. Since for is a reserved keyword in JavaScript, use htmlFor instead.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use React label element?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use React label element?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-setstate-and-replacestat",
    title: "What is the difference between setState() and replaceState() methods?",
    prompt: "What is the difference between setState() and replaceState() methods?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`setState` deletes all browser cookies; `replaceState` preserves them.",
        isCorrect: false,
        explanation: "Neither method affects browser cookies."
      },
      {
        id: "B",
        text: "`setState()` shallowly merges updated keys into existing state; the legacy `replaceState()` completely overwrote the state object with only the new keys provided.",
        isCorrect: true,
        explanation: "Correct. `setState` preserves unmentioned state properties, whereas `replaceState` (legacy/deprecated) replaced the entire state structure."
      },
      {
        id: "C",
        text: "`setState` is synchronous; `replaceState` is asynchronous.",
        isCorrect: false,
        explanation: "Both state updater methods operate asynchronously through React's update queue."
      },
      {
        id: "D",
        text: "`replaceState` is the standard hook in React 19.",
        isCorrect: false,
        explanation: "`replaceState` was deprecated long ago; modern React uses `useState` / `useReducer`."
      }
    ],
    correctAnswer: "B",
    explanation: "When you use setState() the current and previous states are merged. replaceState() throws out the current state, and replaces it with only what you provide. Usually setState() is used unless you really need to remove all previous keys for some reason. You can also set state to false/null in setState() instead of using replaceState().: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between setState() and replaceState() methods?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between setState() and replaceState() methods?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-is-it-possible-to-use-react-without-rendering-html",
    title: "Is it possible to use React without rendering HTML?",
    prompt: "Is it possible to use React without rendering HTML?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "render() {\n  return false\n}\n\nrender() {\n  return null\n}\n\nrender() {\n  return []\n}\n\nrender() {\n  return <React.Fragment></React.Fragment>\n}\n\nrender() {\n  return <></>\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Only if the computer is disconnected from the internet.",
        isCorrect: false,
        explanation: "React rendering logic is independent of network connectivity."
      },
      {
        id: "B",
        text: "Only when writing code in Python.",
        isCorrect: false,
        explanation: "React is a JavaScript/TypeScript library."
      },
      {
        id: "C",
        text: "Yes, components can return `null`, `false`, strings, numbers, or empty fragments (`<>`), or target non-DOM renderers (React Native for mobile, React Three Fiber for WebGL).",
        isCorrect: true,
        explanation: "Correct. Returning `null` or `false` renders nothing to the DOM, and alternative React renderers target non-HTML environments."
      },
      {
        id: "D",
        text: "No, every component must return at least one HTML `<div>` tag or React crashes.",
        isCorrect: false,
        explanation: "Returning `null`, text, or fragments without HTML tags is completely valid in React."
      }
    ],
    correctAnswer: "C",
    explanation: "It is possible with latest version (>=16.2). Below are the possible options: Returning undefined won't work.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it possible to use React without rendering HTML?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it possible to use React without rendering HTML?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-focus-an-input-element-on-page-load",
    title: "How to focus an input element on page load?",
    prompt: "How to focus an input element on page load?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class App extends React.Component {\n  componentDidMount() {\n    this.nameInput.focus();\n  }\n\n  render() {\n    return (\n      <div>\n        <input defaultValue={\"Won't focus\"} />\n        <input ref={(input) => (this.nameInput = input)} defaultValue={'Will focus'} />\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, document.getElementById('app'));",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Focusing input elements is prohibited in React.",
        isCorrect: false,
        explanation: "Managing focus with `useRef` and `useEffect` is a standard, accessible React pattern."
      },
      {
        id: "B",
        text: "Create a ref (`const inputRef = useRef(null)`), attach it to the input `<input ref={inputRef} />`, and call `inputRef.current?.focus()` inside a mount effect `useEffect(() => { ... }, [])` or use the `autoFocus` prop.",
        isCorrect: true,
        explanation: "Correct. Accessing the DOM element via a ref in `useEffect` (or using the `autoFocus` attribute) focuses the input after the component has mounted."
      },
      {
        id: "C",
        text: "Write an infinite synchronous `while` loop that calls `.focus()` repeatedly.",
        isCorrect: false,
        explanation: "Synchronous loops freeze the browser event loop completely."
      },
      {
        id: "D",
        text: "Call `document.getElementById('input').focus()` synchronously in the component render body.",
        isCorrect: false,
        explanation: "The DOM element is not yet mounted during render execution, so querying the DOM in render fails or returns null."
      }
    ],
    correctAnswer: "B",
    explanation: "You can do it by creating ref for input element and using it in componentDidMount():: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to focus an input element on page load?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to focus an input element on page load?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-how-to-programmatically-trigger-click-event-in-react",
    title: "How to programmatically trigger click event in React?",
    prompt: "How to programmatically trigger click event in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<input ref={(input) => (this.inputElement = input)} />\n\nthis.inputElement.click();",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Programmatic clicks are impossible in JavaScript.",
        isCorrect: false,
        explanation: "The native DOM `HTMLElement.prototype.click()` API is fully accessible through React refs."
      },
      {
        id: "B",
        text: "Simulate a physical mouse click by shaking the user's laptop.",
        isCorrect: false,
        explanation: "DOM methods like `element.click()` dispatch simulated user click events programmatically in software."
      },
      {
        id: "C",
        text: "Mutate `document.cookie` with a click timestamp.",
        isCorrect: false,
        explanation: "Cookies have no mechanism to trigger DOM click events."
      },
      {
        id: "D",
        text: "Acquire a reference to the underlying DOM element via a `ref` (`inputRef.current`), and invoke its native `.click()` method (`inputRef.current.click()`).",
        isCorrect: true,
        explanation: "Correct. Programmatic click triggers (e.g. clicking a hidden file input from a custom button) use `ref.current.click()` to dispatch the native DOM click event."
      }
    ],
    correctAnswer: "D",
    explanation: "You could use the ref prop to acquire a reference to the underlying HTMLInputElement object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the HTMLElement.click method. This can be done in two steps: Create ref in render method: Apply click event in your event handler:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to programmatically trigger click event in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to programmatically trigger click event in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-popular-packages-for-animation",
    title: "What are the popular packages for animation?",
    prompt: "What are the popular packages for animation?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "concurrency",
    tags: [
      "react",
      "concurrency",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Framer Motion, React Spring, React Transition Group, and GSAP.",
        isCorrect: true,
        explanation: "Correct. Framer Motion and React Spring provide physics-based declarative animations, while React Transition Group manages entering/exiting DOM transitions."
      },
      {
        id: "B",
        text: "Webpack and Babel.",
        isCorrect: false,
        explanation: "These are build compilers and bundlers, not animation libraries."
      },
      {
        id: "C",
        text: "Adobe Flash Player and Microsoft Silverlight.",
        isCorrect: false,
        explanation: "Flash and Silverlight are obsolete legacy browser plugins."
      },
      {
        id: "D",
        text: "PostgreSQL and Redis.",
        isCorrect: false,
        explanation: "These are backend database systems, not UI animation libraries."
      }
    ],
    correctAnswer: "A",
    explanation: "React Transition Group and React Motion are popular animation packages in React ecosystem.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the popular packages for animation?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the popular packages for animation?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive while a non-urgent one lags."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-what-are-the-popular-react-specific-linters",
    title: "What are the popular React-specific linters?",
    prompt: "What are the popular React-specific linters?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Grammarly and Microsoft Word Spell Check.",
        isCorrect: false,
        explanation: "These are prose text spell checkers, not JavaScript code linters."
      },
      {
        id: "B",
        text: "PostgreSQL query analyzers.",
        isCorrect: false,
        explanation: "ESLint analyzes JavaScript/TypeScript source code statically."
      },
      {
        id: "C",
        text: "ESLint configured with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y` (or modern Biome / Oxlint).",
        isCorrect: true,
        explanation: "Correct. ESLint with official React plugins enforces code quality, catches Rules of Hooks violations, and ensures accessibility standards."
      },
      {
        id: "D",
        text: "Chrome DevTools Network panel.",
        isCorrect: false,
        explanation: "Linters perform static analysis on source code files at edit/build time."
      }
    ],
    correctAnswer: "C",
    explanation: "ESLint is a popular JavaScript linter. There are plugins available that analyse specific code styles. One of the most common for React is an npm package called eslint-plugin-react. By default, it will check a number of best practices, with rules checking things from keys in iterators to a complete set of prop types. Another popular plugin is eslint-plugin-jsx-a11y, which will help fix common issues with accessibility. As JSX offers slightly different syntax to regular HTML, issues with alt text and tabindex, for example, will not be picked up by regular plugins.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the popular React-specific linters?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the popular React-specific linters?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-render-props",
    title: "What are render props?",
    prompt: "What are render props?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "<DataProvider render={(data) => <h1>{`Hello ${data.target}`}</h1>} />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A built-in hook that forces DOM elements to re-render.",
        isCorrect: false,
        explanation: "Render props is a component composition pattern, not a built-in hook."
      },
      {
        id: "B",
        text: "A component pattern where a prop whose value is a function is used to share dynamic state and tell the component what to render (`<DataProvider render={data => <UI data={data} />} />`).",
        isCorrect: true,
        explanation: "Correct. Render props allowed components to encapsulate reusable stateful behavior and delegate visual rendering to consuming components via function callbacks."
      },
      {
        id: "C",
        text: "A compiler flag that renders 3D graphics in WebGL.",
        isCorrect: false,
        explanation: "Render props share stateful component logic via function callbacks."
      },
      {
        id: "D",
        text: "A method for compiling CSS styles into WebAssembly.",
        isCorrect: false,
        explanation: "Render props is a standard React pattern for logic reuse."
      }
    ],
    correctAnswer: "B",
    explanation: "Render Props is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element. Libraries such as React Router and DownShift are using this pattern. React Router: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are render props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are render props?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-programmatically-navigate-using-react-router",
    title: "How do you programmatically navigate using React Router v4?",
    prompt: "How do you programmatically navigate using React Router v4?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { withRouter } from 'react-router-dom'; // this also works with 'react-router-native'\n\n   const Button = withRouter(({ history }) => (\n     <button\n       type=\"button\"\n       onClick={() => {\n         history.push('/new-location');\n       }}\n     >\n       {'Click Me!'}\n     </button>\n   ));\n\nimport { Route } from 'react-router-dom';\n\n   const Button = () => (\n     <Route\n       render={({ history }) => (\n         <button\n           type=\"button\"\n           onClick={() => {\n             history.push('/new-location');\n           }}\n         >\n           {'Click Me!'}\n         </button>\n       )}\n     />\n   );\n\nconst Button = (props, context) => (\n     <button\n       type=\"button\"\n       onClick={() => {\n         context.history.push('/new-location');\n       }}\n     >\n       {'Click Me!'}\n     </button>\n   );\n\n   Button.contextTypes = {\n     history: React.PropTypes.shape({\n       push: React.PropTypes.func.isRequired,\n     }),\n   };",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Programmatic navigation is not supported in React Router.",
        isCorrect: false,
        explanation: "Programmatic navigation via `useNavigate` is a fundamental React Router feature."
      },
      {
        id: "B",
        text: "In v6+, use the `useNavigate()` hook (`const navigate = useNavigate(); navigate('/path')`); in legacy v4/v5, use `history.push()` via `withRouter` or `useHistory`.",
        isCorrect: true,
        explanation: "Correct. `useNavigate` is the modern standard hook in React Router v6+, replacing legacy `withRouter` HOCs and `history.push` calls."
      },
      {
        id: "C",
        text: "Assign `window.location.href = '/path'` in every event handler.",
        isCorrect: false,
        explanation: "Assigning `location.href` triggers a full-page browser reload, losing SPA client state."
      },
      {
        id: "D",
        text: "Call `React.navigate('/path')` from the core React package.",
        isCorrect: false,
        explanation: "Navigation is handled by React Router, not React core."
      }
    ],
    correctAnswer: "B",
    explanation: "There are three different ways to achieve programmatic routing/navigation within components. Using the withRouter() higher-order function: The withRouter() higher-order function will inject the history object as a prop of the component. This object provides push() and replace() methods to avoid the usage of context. Using <Route> component and render props pattern: The <Route> component passes the same props as withRouter(), so you will be able to access the history methods through the history prop. Using context: This option is not recommended and treated as unstable API.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you programmatically navigate using React Router v4?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you programmatically navigate using React Router v4?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-why-you-get-router-may-have-only-one-child-element-warn",
    title: "Why you get \"Router may have only one child element\" warning?",
    prompt: "Why you get \"Router may have only one child element\" warning?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { Switch, Router, Route } from 'react-router';\n\n<Router>\n  <Switch>\n    <Route {/* ... */} />\n    <Route {/* ... */} />\n  </Switch>\n</Router>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because routers cannot render more than one pixel to the screen.",
        isCorrect: false,
        explanation: "The warning related to React element child hierarchy constraints."
      },
      {
        id: "B",
        text: "Because React only allows a single HTML element in the entire application.",
        isCorrect: false,
        explanation: "React applications render complex trees with thousands of elements."
      },
      {
        id: "C",
        text: "In older React Router versions, `<Router>` required a single child element (e.g. `<Switch>` or a `<div>`); in modern React Router v6+, `<Routes>` wraps multiple `<Route>` children directly.",
        isCorrect: true,
        explanation: "Correct. Earlier React Router versions enforced a single root child in router containers, resolved by wrapping routes in `<Switch>` or a layout element."
      },
      {
        id: "D",
        text: "Because you forgot to install the Google Chrome browser extension.",
        isCorrect: false,
        explanation: "It was a library component child constraint in legacy React Router versions."
      }
    ],
    correctAnswer: "C",
    explanation: "You have to wrap your Route's in a <Switch> block because <Switch> is unique in that it renders a route exclusively. At first you need to add Switch to your imports: Then define the routes within <Switch> block:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why you get \"Router may have only one child element\" warning?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why you get \"Router may have only one child element\" warning?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-to-use-formattedmessage-as-placeholder-using-react",
    title: "How to use <FormattedMessage> as placeholder using React Intl?",
    prompt: "How to use <FormattedMessage> as placeholder using React Intl?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React from 'react';\nimport { injectIntl, intlShape } from 'react-intl';\n\nconst MyComponent = ({ intl }) => {\n  const placeholder = intl.formatMessage({ id: 'messageId' });\n  return <input placeholder={placeholder} />;\n};\n\nMyComponent.propTypes = {\n  intl: intlShape.isRequired,\n};\n\nexport default injectIntl(MyComponent);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because `<FormattedMessage>` returns React elements (not plain strings), use `intl.formatMessage({ id: '...' })` from `useIntl()` (or `injectIntl`) for string attributes like `placeholder`.",
        isCorrect: true,
        explanation: "Correct. HTML attributes like `placeholder`, `alt`, and `title` expect plain strings; calling `intl.formatMessage()` imperatively returns formatted strings directly."
      },
      {
        id: "B",
        text: "Hardcode all input placeholders in English only.",
        isCorrect: false,
        explanation: "Using `intl.formatMessage()` ensures placeholders are localized properly across languages."
      },
      {
        id: "C",
        text: "Placeholders cannot be localized in `react-intl`.",
        isCorrect: false,
        explanation: "`useIntl().formatMessage()` was designed specifically for translating attribute strings."
      },
      {
        id: "D",
        text: "Pass the `<FormattedMessage />` component directly to `placeholder={<FormattedMessage id='...' />}`.",
        isCorrect: false,
        explanation: "HTML `placeholder` attributes only accept plain string values, not React element objects."
      }
    ],
    correctAnswer: "A",
    explanation: "The <Formatted. /> components from react-intl return elements, not plain text, so they can't be used for placeholders, alt text, etc. In that case, you should use lower level API formatMessage(). You can inject the intl object into your component using injectIntl() higher-order component and then format the message using formatMessage() available on that object.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use <FormattedMessage> as placeholder using React Intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use <FormattedMessage> as placeholder using React Intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-testrenderer-package-in-react",
    title: "What is TestRenderer package in React?",
    prompt: "What is TestRenderer package in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "import TestRenderer from 'react-test-renderer';\n\nconst Link = ({ page, children }) => <a href={page}>{children}</a>;\n\nconst testRenderer = TestRenderer.create(\n  <Link page={'https://www.facebook.com/'}>{'Facebook'}</Link>,\n);\n\nconsole.log(testRenderer.toJSON());\n// {\n//   type: 'a',\n//   props: { href: 'https://www.facebook.com/' },\n//   children: [ 'Facebook' ]\n// }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A backend PostgreSQL database query compiler.",
        isCorrect: false,
        explanation: "`react-test-renderer` evaluated React component trees in testing."
      },
      {
        id: "B",
        text: "`react-test-renderer` was a package that rendered React components to plain JavaScript objects without a DOM, used for snapshot testing (deprecated in React 19 in favor of RTL).",
        isCorrect: true,
        explanation: "Correct. `react-test-renderer` allowed inspecting rendered trees without browser DOM environments, now superseded by React Testing Library with jsdom."
      },
      {
        id: "C",
        text: "A 3D video game graphics engine for React.",
        isCorrect: false,
        explanation: "`react-test-renderer` was a unit test rendering utility, not a 3D game engine."
      },
      {
        id: "D",
        text: "A production CSS minifier plugin for Webpack.",
        isCorrect: false,
        explanation: "`react-test-renderer` was a testing package."
      }
    ],
    correctAnswer: "B",
    explanation: "This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or jsdom.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is TestRenderer package in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is TestRenderer package in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-dispatch-an-action-on-load",
    title: "How to dispatch an action on load?",
    prompt: "How to dispatch an action on load?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class App extends Component {\n  componentDidMount() {\n    this.props.fetchData();\n  }\n\n  render() {\n    return this.props.isLoaded ? <div>{'Loaded'}</div>: <div>{'Not Loaded'}</div>;\n  }\n}\n\nconst mapStateToProps = (state) => ({\n  isLoaded: state.isLoaded,\n});\n\nconst mapDispatchToProps = { fetchData };\n\nexport default connect(mapStateToProps, mapDispatchToProps)(App);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Dispatch the action directly in the component render function body.",
        isCorrect: false,
        explanation: "Dispatching in render triggers infinite re-rendering loops."
      },
      {
        id: "B",
        text: "Actions cannot be dispatched on initial component load.",
        isCorrect: false,
        explanation: "Dispatching initial fetch actions in `useEffect` on mount is standard practice."
      },
      {
        id: "C",
        text: "Dispatch the action by writing to `document.cookie`.",
        isCorrect: false,
        explanation: "Actions are dispatched via Redux's `dispatch()` function in JavaScript memory."
      },
      {
        id: "D",
        text: "Dispatch the action inside `useEffect(() => { dispatch(fetchData()); }, [])` in functional components (or `componentDidMount()` in class components).",
        isCorrect: true,
        explanation: "Correct. Mount effects fire once after initial rendering, making them the standard place to dispatch initial data-loading actions."
      }
    ],
    correctAnswer: "D",
    explanation: "You can dispatch an action in componentDidMount() method and in render() method you can verify the data.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to dispatch an action on load?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to dispatch an action on load?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-how-to-reset-state-in-redux",
    title: "How to reset state in Redux?",
    prompt: "How to reset state in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const appReducer = combineReducers({\n  /* your app's top-level reducers */\n});\n\nconst rootReducer = (state, action) => {\n  if (action.type === 'USER_LOGOUT') {\n    state = undefined;\n  }\n\n  return appReducer(state, action);\n};\n\nconst appReducer = combineReducers({\n  /* your app's top-level reducers */\n});\n\nconst rootReducer = (state, action) => {\n  if (action.type === 'USER_LOGOUT') {\n    Object.keys(state).forEach((key) => {\n      storage.removeItem(`persist:${key}`);\n    });\n\n    state = undefined;\n  }\n\n  return appReducer(state, action);\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Delete the Redux package from `node_modules` at runtime.",
        isCorrect: false,
        explanation: "Resetting state is handled cleanly within reducer logic by returning default initial state."
      },
      {
        id: "B",
        text: "In the root reducer, check for a reset action (`if (action.type === 'RESET_APP') state = undefined;`) and delegate to slice reducers, which re-initialize to their default initial states.",
        isCorrect: true,
        explanation: "Correct. Because reducers return their initial default state when passed `undefined`, resetting the root state to `undefined` on a reset/logout action restores initial state across all slices."
      },
      {
        id: "C",
        text: "Restart the user's computer to reset Redux state.",
        isCorrect: false,
        explanation: "Dispatching a reset action restores initial in-memory state instantly."
      },
      {
        id: "D",
        text: "Mutate `store.state = null` directly in application code.",
        isCorrect: false,
        explanation: "Direct store state reassignment is forbidden; Redux state transitions must flow through reducers."
      }
    ],
    correctAnswer: "B",
    explanation: "You need to write a root reducer in your application which delegate handling the action to the reducer generated by combineReducers(). For example, let us take rootReducer() to return the initial state after USER_LOGOUT action. As we know, reducers are supposed to return the initial state when they are called with undefined as the first argument, no matter the action. In case of using redux-persist, you may also need to clean your storage. redux-persist keeps a copy of your state in a storage engine. First, you need to import the appropriate storage engine and then, to parse the state before setting it to undefined and clean each storage state key.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to reset state in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to reset state in Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-difference-between-component-and-container",
    title: "What is the difference between component and container in React Redux?",
    prompt: "What is the difference between component and container in React Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Components run on the client; Containers run in Docker on the server.",
        isCorrect: false,
        explanation: "In React-Redux, 'container' refers to a connected React component wrapper, not a Docker container."
      },
      {
        id: "B",
        text: "Presentational components focus on UI appearance, receive data via props, and emit callbacks; Containers connect to the Redux store, fetch data, and pass state down to presentational children.",
        isCorrect: true,
        explanation: "Correct. This pattern separated UI presentation from state/data management, though modern React often collocates UI with custom hooks or `useSelector` directly."
      },
      {
        id: "C",
        text: "Components are written in CSS; Containers are written in SQL.",
        isCorrect: false,
        explanation: "Both are standard JavaScript/TypeScript React components."
      },
      {
        id: "D",
        text: "There is no difference; they are exact duplicates.",
        isCorrect: false,
        explanation: "They represent the architectural separation of presentational and stateful concerns."
      }
    ],
    correctAnswer: "B",
    explanation: "Component is a class or function component that describes the presentational part of your application. Container is an informal term for a component that is connected to a Redux store. Containers subscribe to Redux state updates and dispatch actions, and they usually don't render DOM elements; they delegate rendering to presentational child components.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between component and container in React Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between component and container in React Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-structure-redux-top-level-directories",
    title: "How to structure Redux top level directories?",
    prompt: "How to structure Redux top level directories?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux forbids using directories and requires a single file in the root.",
        isCorrect: false,
        explanation: "Structuring code by feature slices is the official best practice."
      },
      {
        id: "B",
        text: "Put all 10,000 application functions in a single `.env` file.",
        isCorrect: false,
        explanation: "Environment files store configuration variables, not application code."
      },
      {
        id: "C",
        text: "Feature-based / 'Redux Ducks' pattern (`features/todos/todosSlice.ts` containing reducers, actions, and selectors together), or Rails-style type folders (`actions/`, `reducers/`, `selectors/`).",
        isCorrect: true,
        explanation: "Correct. Modern Redux Toolkit strongly recommends the 'feature folder' / slice structure, placing related reducers and actions in a single slice file per domain feature."
      },
      {
        id: "D",
        text: "Structure directories by file creation timestamp.",
        isCorrect: false,
        explanation: "Directories are organized by domain feature or technical role for maintainability."
      }
    ],
    correctAnswer: "C",
    explanation: "Most of the applications has several top-level directories as below: Components: Used for dumb components unaware of Redux. Containers: Used for smart components connected to Redux. Actions: Used for all action creators, where file names correspond to part of the app. Reducers: Used for all reducers, where files name correspond to state key. Store: Used for store initialization. This structure works well for small and medium size apps.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to structure Redux top level directories?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to structure Redux top level directories?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-how-to-use-polymer-in-react",
    title: "How to use Polymer in React?",
    prompt: "How to use Polymer in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<link rel=\"import\" href=\"../../bower_components/polymer/polymer.html\" />;\n   Polymer({\n     is: 'calender-element',\n     ready: function () {\n       this.textContent = 'I am a calender';\n     },\n   });\n\n<link rel=\"import\" href=\"./src/polymer-components/calender-element.html\" />\n\nimport React from 'react';\n\n   class MyComponent extends React.Component {\n     render() {\n       return <calender-element />;\n     }\n   }\n\n   export default MyComponent;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React completely crashes if any custom element is present.",
        isCorrect: false,
        explanation: "React natively supports rendering custom HTML elements."
      },
      {
        id: "B",
        text: "Polymer elements can only run inside Web Workers.",
        isCorrect: false,
        explanation: "Custom elements mount directly into the browser DOM tree."
      },
      {
        id: "C",
        text: "Polymer elements must be converted to PHP scripts before rendering.",
        isCorrect: false,
        explanation: "Polymer produces standard browser Custom Elements rendered directly in HTML/JSX."
      },
      {
        id: "D",
        text: "Import the Polymer Web Component custom element script, and render the custom HTML tag (e.g. `<calendar-element />`) in JSX, passing primitive attributes.",
        isCorrect: true,
        explanation: "Correct. Custom Elements / Web Components can be rendered directly in JSX as native custom tags, though complex object props may require attaching refs in React 18 (simplified in React 19)."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to follow below steps to use Polymer in React, Create a Polymer element: Create the Polymer component HTML tag by importing it in a HTML document, e.g. import it in the index.html of your React application: Use that element in the JSX file:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use Polymer in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use Polymer in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-give-an-example-of-styled-components",
    title: "Give an example of Styled Components?",
    prompt: "Give an example of Styled Components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import React from 'react';\nimport styled from 'styled-components';\n\n// Create a <Title> component that renders an <h1> which is centered, red and sized at 1.5em\nconst Title = styled.h1`\n  font-size: 1.5em;\n  text-align: center;\n  color: palevioletred;\n`;\n\n// Create a <Wrapper> component that renders a <section> with some padding and a papayawhip background\nconst Wrapper = styled.section`\n  padding: 4em;\n  background: papayawhip;\n`;\n\n<Wrapper>\n  <Title>{'Lets start first styled component!'}</Title>\n</Wrapper>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`const Title = styled.h1`font-size: 1.5em; color: palevioletred;`;` rendered directly as `<Title>Hello</Title>` in JSX.",
        isCorrect: true,
        explanation: "Correct. `styled.<tag>` creates a React component with automatically scoped styles generated from the template string."
      },
      {
        id: "B",
        text: "`const Title = new CPlusPlusComponent();`.",
        isCorrect: false,
        explanation: "Styled components are standard JavaScript React components."
      },
      {
        id: "C",
        text: "`const Title = document.getElementById('title');` inside render.",
        isCorrect: false,
        explanation: "Direct DOM selection violates React's component model; styled-components returns declarative components."
      },
      {
        id: "D",
        text: "`const Title = '<h1 style=\"font-size: 1.5em\">Hello</h1>';` rendered with `eval()`.",
        isCorrect: false,
        explanation: "`styled-components` creates typed React component primitives, not raw HTML strings."
      }
    ],
    correctAnswer: "A",
    explanation: "Lets create <Title> and <Wrapper> components with specific styles for each. These two variables, Title and Wrapper, are now components that you can render just like any other react component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Give an example of Styled Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Give an example of Styled Components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-why-are-inline-ref-callbacks-or-functions-not-recommend",
    title: "Why are inline ref callbacks or functions not recommended?",
    prompt: "Why are inline ref callbacks or functions not recommended?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class UserForm extends Component {\n  handleSubmit = () => {\n    console.log('Input Value is: ', this.input.value);\n  };\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <input type=\"text\" ref={(input) => (this.input = input)} /> // Access DOM input in handle\n        submit\n        <button type=\"submit\">Submit</button>\n      </form>\n    );\n  }\n}\n\nclass UserForm extends Component {\n  handleSubmit = () => {\n    console.log('Input Value is: ', this.input.value);\n  };\n\n  setSearchInput = (input) => {\n    this.input = input;\n  };\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <input type=\"text\" ref={this.setSearchInput} /> // Access DOM input in handle submit\n        <button type=\"submit\">Submit</button>\n      </form>\n    );\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because inline callbacks delete the DOM node from the browser document.",
        isCorrect: false,
        explanation: "The callback merely receives `null` and then the element; it does not delete DOM nodes."
      },
      {
        id: "B",
        text: "Because inline functions are illegal in ECMAScript specifications.",
        isCorrect: false,
        explanation: "Inline functions are standard JavaScript syntax, but cause ref resetting during re-renders."
      },
      {
        id: "C",
        text: "Inline ref callbacks `ref={el => this.input = el}` create a new function instance on every render, causing React to call the callback twice during updates: first with `null` to detach, then with the DOM node.",
        isCorrect: true,
        explanation: "Correct. Defining ref callbacks as bound methods (or using `useRef`/`createRef`) provides a stable reference that avoids the double invocation on update."
      },
      {
        id: "D",
        text: "Because inline callbacks cause the computer to run out of disk storage.",
        isCorrect: false,
        explanation: "The issue is double-invocation on re-renders, not disk storage."
      }
    ],
    correctAnswer: "C",
    explanation: "If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function Note: In React v16.3,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why are inline ref callbacks or functions not recommended?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why are inline ref callbacks or functions not recommended?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-what-is-render-hijacking-in-react",
    title: "What is render hijacking in react?",
    prompt: "What is render hijacking in react?",
    level: "junior",
    type: "output",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "An advanced HOC pattern (often via Inheritance Inversion) where a wrapper component intercepts, modifies, or conditionally alters the rendered output tree of another component.",
        isCorrect: true,
        explanation: "Correct. By extending a component or wrapping its render output, an HOC can manipulate child element trees, inject props, or wrap elements conditionally."
      },
      {
        id: "B",
        text: "A cybersecurity attack where hackers steal the website's CSS.",
        isCorrect: false,
        explanation: "In React terminology, 'render hijacking' is a component composition design pattern, not a malicious hack."
      },
      {
        id: "C",
        text: "A browser bug that prevents pages from rendering.",
        isCorrect: false,
        explanation: "It is an intentional architectural pattern for modifying render outputs via HOCs."
      },
      {
        id: "D",
        text: "A method for compiling React into WebAssembly binaries.",
        isCorrect: false,
        explanation: "Render hijacking operates in React's component tree layer."
      }
    ],
    correctAnswer: "A",
    explanation: "The concept of render hijacking is the ability to control what a component will output from another component. It actually means that you decorate your component by wrapping it into a Higher-Order component. By wrapping you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enables hijacking, but by using HOC you make your component behave in different way.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is render hijacking in react?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is render hijacking in react?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-hoc-factory-implementations",
    title: "What are HOC factory implementations?",
    prompt: "What are HOC factory implementations?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function ppHOC(WrappedComponent) {\n  return class PP extends React.Component {\n    render() {\n      return <WrappedComponent {...this.props} />;\n    }\n  };\n}\n\nfunction iiHOC(WrappedComponent) {\n  return class Enhancer extends WrappedComponent {\n    render() {\n      return super.render();\n    }\n  };\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Factory Pattern and Abstract Factory Pattern for creating HTML buttons.",
        isCorrect: false,
        explanation: "HOC factories specifically manipulate React component definitions via Props Proxy or Inheritance Inversion."
      },
      {
        id: "B",
        text: "Database query factories for SQL databases.",
        isCorrect: false,
        explanation: "HOC factories operate on component classes and props."
      },
      {
        id: "C",
        text: "Client-side factories and Server-side Docker factories.",
        isCorrect: false,
        explanation: "HOC factories are JavaScript functions operating on React components."
      },
      {
        id: "D",
        text: "Props Proxy (the HOC wraps the target component and passes manipulated props) and Inheritance Inversion (the HOC class extends the wrapped component class to intercept its lifecycle/render).",
        isCorrect: true,
        explanation: "Correct. Props Proxy and Inheritance Inversion are the two classic implementation mechanisms for Higher-Order Components in React."
      }
    ],
    correctAnswer: "D",
    explanation: "There are two main ways of implementing HOCs in React. Props Proxy (PP) and Inheritance Inversion (II). But they follow different approaches for manipulating the WrappedComponent. Props Proxy In this approach, the render method of the HOC returns a React Element of the type of the WrappedComponent. We also pass through the props that the HOC receives, hence the name Props Proxy. Inheritance Inversion In this approach, the returned HOC class (Enhancer) extends the WrappedComponent. It is called Inheritance Inversion because instead of the WrappedComponent extending some Enhancer class, it is passively extended by the Enhancer. In this way the relationship between them seems inverse.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are HOC factory implementations?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are HOC factory implementations?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-how-do-you-render-array-strings-and-numbers-in-react-16",
    title: "How do you render Array, Strings and Numbers in React 16 Version?",
    prompt: "How do you render Array, Strings and Numbers in React 16 Version?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "const ReactJSDevs = () => {\n  return [<li key=\"1\">John</li>, <li key=\"2\">Jackie</li>, <li key=\"3\">Jordan</li>];\n};\n\nconst JSDevs = () => {\n  return (\n    <ul>\n      <li>Brad</li>\n      <li>Brodge</li>\n      <ReactJSDevs />\n      <li>Brandon</li>\n    </ul>\n  );\n};\n\nrender() {\nreturn 'Welcome to ReactJS questions';\n}\n// Number\nrender() {\nreturn 2018;\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Arrays can only be rendered if they contain exactly one item.",
        isCorrect: false,
        explanation: "Arrays of any length can be returned as long as each element has a unique `key`."
      },
      {
        id: "B",
        text: "Components can return arrays of elements (`[<li key='1'>A</li>, <li key='2'>B</li>]`), plain strings (`return 'Hello'`), or numbers directly from the render function without a wrapper `<div>`.",
        isCorrect: true,
        explanation: "Correct. React 16 expanded render return types to include arrays of elements (with keys), strings, numbers, portals, booleans, and fragments."
      },
      {
        id: "C",
        text: "Strings and numbers must be converted to binary Base64 images before rendering.",
        isCorrect: false,
        explanation: "React renders strings and numbers directly as DOM text nodes."
      },
      {
        id: "D",
        text: "Render methods are only allowed to return HTML `<canvas>` elements.",
        isCorrect: false,
        explanation: "Render methods support elements, arrays, strings, numbers, fragments, and null."
      }
    ],
    correctAnswer: "B",
    explanation: "Arrays: Unlike older releases, you don't need to make sure render method return a single element in React16. You are able to return multiple sibling elements without a wrapping element by returning an array. For example, let us take the below list of developers, You can also merge this array of items in another array component. Strings and Numbers: You can also return string and number type from the render method.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you render Array, Strings and Numbers in React 16 Version?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you render Array, Strings and Numbers in React 16 Version?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-in-which-scenarios-error-boundaries-do-not-catch-errors",
    title: "In which scenarios error boundaries do not catch errors?",
    prompt: "In which scenarios error boundaries do not catch errors?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Event handlers (e.g. `onClick`), asynchronous callbacks (`setTimeout`, Promises), Server-Side Rendering (SSR), and errors thrown inside the error boundary component itself.",
        isCorrect: true,
        explanation: "Correct. Error boundaries only catch errors during rendering, lifecycle methods, and constructors of descendant components. Async/event errors require standard `try/catch`."
      },
      {
        id: "B",
        text: "Inside component `render()` methods.",
        isCorrect: false,
        explanation: "Errors in `render()` are specifically caught by error boundaries."
      },
      {
        id: "C",
        text: "Error boundaries catch 100% of all errors everywhere in the entire operating system.",
        isCorrect: false,
        explanation: "Error boundaries do not catch async, event handler, SSR, or self-thrown errors."
      },
      {
        id: "D",
        text: "Inside child component lifecycle methods.",
        isCorrect: false,
        explanation: "Errors in child lifecycles are caught by error boundaries."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the cases in which error boundaries doesn't work, Inside Event handlers Asynchronous code using setTimeout or requestAnimationFrame callbacks During Server side rendering When errors thrown in the error boundary code itself: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of In which scenarios error boundaries do not catch errors?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of In which scenarios error boundaries do not catch errors?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-why-do-not-you-need-error-boundaries-for-event-handlers",
    title: "Why do not you need error boundaries for event handlers?",
    prompt: "Why do not you need error boundaries for event handlers?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { error: null };\n  }\n\n  handleClick = () => {\n    try {\n      // Do something that could throw\n    } catch (error) {\n      this.setState({ error });\n    }\n  };\n\n  render() {\n    if (this.state.error) {\n      return <h1>Caught an error.</h1>;\n    }\n    return <div onClick={this.handleClick}>Click Me</div>;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because event handlers do not run during the render phase; an error in an event handler does not corrupt or break the rendered React UI, so standard `try/catch` is used instead.",
        isCorrect: true,
        explanation: "Correct. React knows how to keep displaying the UI even if a click handler throws; standard `try/catch` inside the handler handles event errors cleanly."
      },
      {
        id: "B",
        text: "Because event handlers run in WebAssembly.",
        isCorrect: false,
        explanation: "Event handlers run in standard JavaScript."
      },
      {
        id: "C",
        text: "Because React automatically fixes all bugs in event handlers.",
        isCorrect: false,
        explanation: "Developers use `try/catch` inside event handlers to catch runtime issues."
      },
      {
        id: "D",
        text: "Because event handlers are mathematically incapable of throwing errors.",
        isCorrect: false,
        explanation: "Event handlers can throw errors, but they don't break the rendering pipeline."
      }
    ],
    correctAnswer: "A",
    explanation: "Error boundaries do not catch errors inside event handlers. Event handlers don't happened or invoked during rendering time unlike render method or lifecycle methods. So React knows how to recover these kind of errors in event handlers. If still you need to catch an error inside event handler, use the regular JavaScript try / catch statement as below The above code is catching the error using vanilla javascript try/catch block instead of error boundaries.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do not you need error boundaries for event handlers?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do not you need error boundaries for event handlers?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-what-is-the-difference-between-try-catch-block-and-erro",
    title: "What is the difference between try catch block and error boundaries?",
    prompt: "What is the difference between try catch block and error boundaries?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "try {\n  showButton();\n} catch (error) {\n  // ...\n}\n\n<ErrorBoundary>\n  <MyComponent />\n</ErrorBoundary>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "`try/catch` was deleted from JavaScript in 2020.",
        isCorrect: false,
        explanation: "`try/catch` is a foundational JavaScript language construct."
      },
      {
        id: "B",
        text: "There is no difference; they are exact synonyms.",
        isCorrect: false,
        explanation: "Imperative code uses `try/catch`; declarative component rendering uses Error Boundaries."
      },
      {
        id: "C",
        text: "`try/catch` works for imperative code (event handlers, async tasks); Error Boundaries are declarative React components that catch errors in the descendant UI render tree.",
        isCorrect: true,
        explanation: "Correct. `try/catch` cannot catch errors thrown during declarative JSX rendering in child components; Error Boundaries catch declarative render tree failures gracefully."
      },
      {
        id: "D",
        text: "`try/catch` runs on the server; Error Boundaries run on the GPU.",
        isCorrect: false,
        explanation: "Both run in JavaScript on the client."
      }
    ],
    correctAnswer: "C",
    explanation: "Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen. For example, the try catch block used for below imperative code Whereas error boundaries wrap declarative code as below, So if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between try catch block and error boundaries?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between try catch block and error boundaries?.",
    hints: [
      "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-what-is-the-behavior-of-uncaught-errors-in-react-16",
    title: "What is the behavior of uncaught errors in react 16?",
    prompt: "What is the behavior of uncaught errors in react 16?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React converts the page into a PDF document.",
        isCorrect: false,
        explanation: "Uncaught rendering errors unmount the component tree."
      },
      {
        id: "B",
        text: "React silently ignores the error and continues running without issues.",
        isCorrect: false,
        explanation: "React 16 unmounts the tree to avoid corrupt UI states."
      },
      {
        id: "C",
        text: "Uncaught errors unmount the entire React component tree to prevent leaving corrupted, broken, or insecure UI states in the DOM.",
        isCorrect: true,
        explanation: "Correct. The React team decided an unmounted/blank UI is preferable to displaying misleading or broken UI (e.g. wrong financial balances or broken checkout buttons)."
      },
      {
        id: "D",
        text: "React automatically restarts the user's operating system.",
        isCorrect: false,
        explanation: "The browser unmounts the React root, not an OS restart."
      }
    ],
    correctAnswer: "C",
    explanation: "In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree. The reason behind this decision is that it is worse to leave corrupted UI in place than to completely remove it. For example, it is worse for a payments app to display a wrong amount than to render nothing.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the behavior of uncaught errors in react 16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the behavior of uncaught errors in react 16?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-required-method-to-be-defined-for-a-class-c",
    title: "What is the required method to be defined for a class component?",
    prompt: "What is the required method to be defined for a class component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`componentDidMount()` is the only required method.",
        isCorrect: false,
        explanation: "`componentDidMount` is optional; `render()` is mandatory."
      },
      {
        id: "B",
        text: "`render()` is the only required method in a `React.Component` class; all lifecycle methods and constructors are optional.",
        isCorrect: true,
        explanation: "Correct. A class component must implement a `render()` method that returns JSX elements, null, or fragments; other methods are optional."
      },
      {
        id: "C",
        text: "`constructor()` is mandatory for every class component.",
        isCorrect: false,
        explanation: "Constructors are optional if state initialization or binding is not needed."
      },
      {
        id: "D",
        text: "Every class component must define at least 10 methods.",
        isCorrect: false,
        explanation: "Only `render()` is strictly required."
      }
    ],
    correctAnswer: "B",
    explanation: "The render() method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the required method to be defined for a class component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the required method to be defined for a class component?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "react-what-are-the-possible-return-types-of-render-method",
    title: "What are the possible return types of render method?",
    prompt: "What are the possible return types of render method?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "SQL table schemas.",
        isCorrect: false,
        explanation: "Render returns UI nodes for the React reconciliation tree."
      },
      {
        id: "B",
        text: "React elements (JSX), Arrays/Fragments, Portals, Strings and Numbers (text nodes), Booleans, or `null` (renders nothing).",
        isCorrect: true,
        explanation: "Correct. Modern React supports rich return types from render methods and functional components."
      },
      {
        id: "C",
        text: "Only HTML `<div>` elements; returning anything else throws a syntax error.",
        isCorrect: false,
        explanation: "React components can return text, numbers, fragments, arrays, portals, or null."
      },
      {
        id: "D",
        text: "Raw binary machine code and C++ pointers.",
        isCorrect: false,
        explanation: "Render methods return virtual descriptors (ReactNode)."
      }
    ],
    correctAnswer: "B",
    explanation: "Below are the list of following types used and return from render method, React elements: Elements that instruct React to render a DOM node. It includes html elements such as <div/> and user defined elements. Arrays and fragments: Return multiple elements to render as Arrays and Fragments to wrap multiple elements Portals: Render children into a different DOM subtree. String and numbers: Render both Strings and Numbers as text nodes in the DOM Booleans or null: Doesn't render anything but these types are used to conditionally render content.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the possible return types of render method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the possible return types of render method?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-methods-order-when-component-re-rendered",
    title: "What is the methods order when component re-rendered?",
    prompt: "What is the methods order when component re-rendered?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`render` -> `componentWillUnmount` -> `getSnapshotBeforeUpdate`.",
        isCorrect: false,
        explanation: "`componentWillUnmount` runs only during destruction, not regular re-renders."
      },
      {
        id: "B",
        text: "`getSnapshotBeforeUpdate` -> `render` -> `shouldComponentUpdate`.",
        isCorrect: false,
        explanation: "`shouldComponentUpdate` and `render` execute before `getSnapshotBeforeUpdate`."
      },
      {
        id: "C",
        text: "`static getDerivedStateFromProps` -> `shouldComponentUpdate` -> `render` -> `getSnapshotBeforeUpdate` -> `componentDidUpdate`.",
        isCorrect: true,
        explanation: "Correct. This is the exact chronological sequence of class lifecycle methods executed during an update pass in React."
      },
      {
        id: "D",
        text: "`componentDidUpdate` -> `render` -> `shouldComponentUpdate` -> `constructor`.",
        isCorrect: false,
        explanation: "`render` runs before `componentDidUpdate`, and `constructor` only runs on mount."
      }
    ],
    correctAnswer: "C",
    explanation: "An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered. static getDerivedStateFromProps() shouldComponentUpdate() render() getSnapshotBeforeUpdate() componentDidUpdate(): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the methods order when component re-rendered?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the methods order when component re-rendered?.",
    hints: [
      "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/memo"
  },
  {
    id: "react-what-are-the-methods-invoked-during-error-handling",
    title: "What are the methods invoked during error handling?",
    prompt: "What are the methods invoked during error handling?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`onError` and `onCrash`.",
        isCorrect: false,
        explanation: "React lifecycle error methods are `static getDerivedStateFromError` and `componentDidCatch`."
      },
      {
        id: "B",
        text: "`componentWillCatch` and `componentDidThrow`.",
        isCorrect: false,
        explanation: "These are not real React lifecycle methods."
      },
      {
        id: "C",
        text: "`static getDerivedStateFromError(error)` (to update state and render fallback UI) and `componentDidCatch(error, info)` (to log error telemetry).",
        isCorrect: true,
        explanation: "Correct. These two lifecycle methods make a class component an Error Boundary: `getDerivedStateFromError` updates state during render, and `componentDidCatch` logs side effects."
      },
      {
        id: "D",
        text: "`tryRender` and `catchRender`.",
        isCorrect: false,
        explanation: "React uses `getDerivedStateFromError` and `componentDidCatch`."
      }
    ],
    correctAnswer: "C",
    explanation: "Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component. static getDerivedStateFromError() componentDidCatch(): ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the methods invoked during error handling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the methods invoked during error handling?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-are-keyed-fragments",
    title: "What are Keyed Fragments?",
    prompt: "What are Keyed Fragments?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function Glossary(props) {\n  return (\n    <dl>\n      {props.items.map((item) => (\n        // Without the `key`, React will fire a key warning\n        <React.Fragment key={item.id}>\n          <dt>{item.term}</dt>\n          <dd>{item.description}</dd>\n        </React.Fragment>\n      ))}\n    </dl>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Fragments that automatically encrypt child DOM elements.",
        isCorrect: false,
        explanation: "Keyed fragments provide list reconciliation identities for React's diffing algorithm."
      },
      {
        id: "B",
        text: "Fragments that can only be rendered inside SVG `<path>` elements.",
        isCorrect: false,
        explanation: "Fragments can wrap any JSX elements anywhere in the tree."
      },
      {
        id: "C",
        text: "Explicit `<React.Fragment key={item.id}>...</React.Fragment>` elements used when mapping collections to fragments, since the `<>...</>` shorthand syntax does not support the `key` attribute.",
        isCorrect: true,
        explanation: "Correct. When mapping an array of items to Fragment wrappers (e.g. `<dt>/<dd>` pairs), the explicit `<React.Fragment key={...}>` syntax is required to pass a key."
      },
      {
        id: "D",
        text: "A legacy syntax that was deprecated in React 16.",
        isCorrect: false,
        explanation: "Keyed `<React.Fragment>` is the standard way to assign keys to grouped sibling lists."
      }
    ],
    correctAnswer: "C",
    explanation: "The Fragments declared with the explicit syntax may have keys. The general use case is mapping a collection to an array of fragments as below, Note: key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are Keyed Fragments?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are Keyed Fragments?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-how-jsx-prevents-injection-attacks",
    title: "How JSX prevents Injection Attacks?",
    prompt: "How JSX prevents Injection Attacks?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const name = response.potentiallyMaliciousInput;\nconst element = <h1>{name}</h1>;",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React DOM automatically escapes all strings embedded in JSX before rendering them to the DOM, converting raw HTML tags into harmless text entities to prevent Cross-Site Scripting (XSS).",
        isCorrect: true,
        explanation: "Correct. By default, expressions inside `{}` are treated as plain text strings, making it impossible to inject executable `<script>` tags unless `dangerouslySetInnerHTML` is explicitly used."
      },
      {
        id: "B",
        text: "JSX does not prevent injection attacks and allows raw HTML execution everywhere.",
        isCorrect: false,
        explanation: "React's built-in string escaping is a foundational security defense against XSS."
      },
      {
        id: "C",
        text: "By running all JavaScript code on remote isolated blockchain servers.",
        isCorrect: false,
        explanation: "React renders locally in the client browser DOM."
      },
      {
        id: "D",
        text: "By encrypting all JSX files with military-grade 4096-bit RSA keys.",
        isCorrect: false,
        explanation: "React prevents XSS through automated string escaping during DOM rendering, not file encryption."
      }
    ],
    correctAnswer: "A",
    explanation: "React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that, s not explicitly written in your application. Everything is converted to a string before being rendered. For example, you can embed user input as below, This way you can prevent XSS(Cross-site-scripting) attacks in the application.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How JSX prevents Injection Attacks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How JSX prevents Injection Attacks?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-update-rendered-elements",
    title: "How do you update rendered elements?",
    prompt: "How do you update rendered elements?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "function tick() {\n  const element = (\n    <div>\n      <h1>Hello, world!</h1>\n      <h2>It is {new Date().toLocaleTimeString()}.</h2>\n    </div>\n  );\n  ReactDOM.render(element, document.getElementById('root'));\n}\n\nsetInterval(tick, 1000);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "By mutating `document.body.innerHTML` directly with string concatenation.",
        isCorrect: false,
        explanation: "Directly modifying `innerHTML` breaks React reconciliation and loses component state."
      },
      {
        id: "B",
        text: "By triggering state updates (`setState` / `useState` setter) or passing new props, prompting React's reconciler to diff the virtual tree and update only the modified real DOM nodes.",
        isCorrect: true,
        explanation: "Correct. React's declarative model updates the UI reactively when state or props change, diffing Virtual DOM nodes to apply minimal real DOM changes."
      },
      {
        id: "C",
        text: "Rendered elements can never be updated once mounted.",
        isCorrect: false,
        explanation: "Elements update dynamically whenever component state or parent props change."
      },
      {
        id: "D",
        text: "By restarting the Node.js development server on every frame.",
        isCorrect: false,
        explanation: "Client UI updates are handled in-memory in the browser runtime."
      }
    ],
    correctAnswer: "B",
    explanation: "You can update UI(represented by rendered element) by passing the newly created element to ReactDOM's render method. For example, lets take a ticking clock example, where it updates the time by calling render method multiple times,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you update rendered elements?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you update rendered elements?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-prevent-component-from-rendering",
    title: "How to prevent component from rendering?",
    prompt: "How to prevent component from rendering?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "function Greeting(props) {\n  if (!props.loggedIn) {\n    return null;\n  }\n\n  return <div className=\"greeting\">welcome, {props.name}</div>;\n}\n\nclass User extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {loggedIn: false, name: 'John'};\n  }\n\n  render() {\n  return (\n      <div>\n        //Prevent component render if it is not loggedIn\n        <Greeting loggedIn={this.state.loggedIn} />\n        <UserDetails name={this.state.name}>\n      </div>\n  );\n  }",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Return `null` from the component's render function (or JSX body) based on a condition (e.g. `if (!isLoggedIn) return null;`).",
        isCorrect: true,
        explanation: "Correct. Returning `null` instructs React to render nothing to the DOM for that component without affecting its lifecycle methods."
      },
      {
        id: "B",
        text: "Throw an uncaught `TypeError` inside the component body.",
        isCorrect: false,
        explanation: "Throwing uncaught errors triggers Error Boundaries and crashes the component subtree."
      },
      {
        id: "C",
        text: "Call `window.close()` inside the component.",
        isCorrect: false,
        explanation: "`window.close()` attempts to close the browser tab."
      },
      {
        id: "D",
        text: "Set `style={{ display: 'none' }}` to unmount the component.",
        isCorrect: false,
        explanation: "`display: none` hides the element visually with CSS, but the component remains fully rendered and mounted in the DOM."
      }
    ],
    correctAnswer: "A",
    explanation: "You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component. In the above example, the greeting component skips its rendering section by applying condition and returning null value.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to prevent component from rendering?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to prevent component from rendering?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-conditions-to-safely-use-the-index-as-a-ke",
    title: "What are the conditions to safely use the index as a key?",
    prompt: "What are the conditions to safely use the index as a key?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Index can be used as a key only when the array contains more than 1,000,000 items.",
        isCorrect: false,
        explanation: "List size is irrelevant; stability and absence of reordering are the safety requirements."
      },
      {
        id: "B",
        text: "Index is always 100% safe for all lists under all circumstances.",
        isCorrect: false,
        explanation: "Using index on dynamic or reordered lists causes severe state bugs in inputs and animations."
      },
      {
        id: "C",
        text: "Index keys can only be used on Internet Explorer.",
        isCorrect: false,
        explanation: "Key behavior is universal across all browsers in React."
      },
      {
        id: "D",
        text: "1) The list and items are static (never reordered, filtered, or inserted); 2) Items have no unique IDs; 3) The list is never paginated or sorted.",
        isCorrect: true,
        explanation: "Correct. Using array index as key is only safe when the list is strictly static and never undergoes reordering, insertion, deletion, or filtering."
      }
    ],
    correctAnswer: "D",
    explanation: "There are three conditions to make sure, it is safe use the index as a key. The list and items are static, they are not computed and do not change The items in the list have no ids The list is never reordered or filtered.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the conditions to safely use the index as a key?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the conditions to safely use the index as a key?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-is-it-keys-should-be-globally-unique",
    title: "Do keys in React lists need to be globally unique?",
    prompt: "Do keys in React lists need to be globally unique?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "function Book(props) {\n  const index = (\n    <ul>\n      {props.pages.map((page) => (\n        <li key={page.id}>{page.title}</li>\n      ))}\n    </ul>\n  );\n  const content = props.pages.map((page) => (\n    <div key={page.id}>\n      <h3>{page.title}</h3>\n      <p>{page.content}</p>\n      <p>{page.pageNumber}</p>\n    </div>\n  ));\n  return (\n    <div>\n      {index}\n      <hr />\n      {content}\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Keys must be encrypted before passing to JSX.",
        isCorrect: false,
        explanation: "Keys are standard JavaScript strings or numbers."
      },
      {
        id: "B",
        text: "Keys must be sequential integers starting from 0.",
        isCorrect: false,
        explanation: "Keys can be arbitrary unique strings or numbers (e.g. database IDs, slug names)."
      },
      {
        id: "C",
        text: "Yes, every key must be a globally unique UUID across all websites in the world.",
        isCorrect: false,
        explanation: "Keys are scoped locally to sibling elements in the parent array."
      },
      {
        id: "D",
        text: "No, keys only need to be unique among their immediate sibling elements within the same array; different arrays or lists can reuse the same key values.",
        isCorrect: true,
        explanation: "Correct. React's reconciler evaluates keys only within sibling collections in the same mapped array, not globally across the entire page."
      }
    ],
    correctAnswer: "D",
    explanation: "Keys used within arrays should be unique among their siblings but they don, t need to be globally unique. i.e, You can use the same keys with two different arrays. For example, the below book component uses two arrays with different arrays,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it keys should be globally unique?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it keys should be globally unique?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-what-are-the-advantages-of-formik-over-redux-form-libra",
    title: "What are the advantages of formik over redux form library?",
    prompt: "What are the advantages of formik over redux form library?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Formik completely eliminates the need for user input.",
        isCorrect: false,
        explanation: "Formik manages state and validation for user inputs."
      },
      {
        id: "B",
        text: "Redux Form ran 100x faster than Formik.",
        isCorrect: false,
        explanation: "Formik was designed specifically to eliminate Redux Form's keystroke latency overhead."
      },
      {
        id: "C",
        text: "Keeps transient form state local (avoiding global Redux reducer churn on every keystroke), smaller bundle footprint, and simpler API without Redux store setup.",
        isCorrect: true,
        explanation: "Correct. Redux-Form fired top-level Redux actions on every character typed, causing significant performance lag on complex forms; Formik keeps form state local and performant."
      },
      {
        id: "D",
        text: "Formik compiles forms directly into native C++ binaries.",
        isCorrect: false,
        explanation: "Formik is a JavaScript React form management library."
      }
    ],
    correctAnswer: "C",
    explanation: "Below are the main reasons to recommend formik over redux form library, The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the advantages of formik over redux form library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the advantages of formik over redux form library?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-what-is-suspense-component",
    title: "What is suspense component?",
    prompt: "What is suspense component?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <OtherComponent />\n      </Suspense>\n    </div>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A component that suspends the user's internet connection.",
        isCorrect: false,
        explanation: "Suspense displays fallback UI while async component data or bundles load."
      },
      {
        id: "B",
        text: "A built-in React component (`<Suspense fallback={<Spinner />}>`) that lets components wait for something (lazy code chunks, async data with `use()`) before rendering, displaying a fallback UI.",
        isCorrect: true,
        explanation: "Correct. Suspense coordinates loading states declaratively across component subtrees, showing fallback UI while async operations (code-splitting or data fetching) resolve."
      },
      {
        id: "C",
        text: "A security firewall that blocks suspicious IP addresses.",
        isCorrect: false,
        explanation: "Suspense manages UI loading states in React."
      },
      {
        id: "D",
        text: "A deprecated API removed in React 17.",
        isCorrect: false,
        explanation: "Suspense is a core feature of modern React 18+ and React 19."
      }
    ],
    correctAnswer: "B",
    explanation: "If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you, re waiting for it to load using a loading indicator. This can be done using Suspense component. For example, the below code uses suspense component, As mentioned in the above code, Suspense is wrapped above the lazy component.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is suspense component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is suspense component?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "react-what-is-route-based-code-splitting",
    title: "What is route based code splitting?",
    prompt: "What is route based code splitting?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\nimport React, { Suspense, lazy } from 'react';\n\nconst Home = lazy(() => import('./routes/Home'));\nconst About = lazy(() => import('./routes/About'));\n\nconst App = () => (\n  <Router>\n    <Suspense fallback={<div>Loading...</div>}>\n      <Switch>\n        <Route exact path=\"/\" component={Home} />\n        <Route path=\"/about\" component={About} />\n      </Switch>\n    </Suspense>\n  </Router>\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Splitting JavaScript code across multiple CPU processor cores.",
        isCorrect: false,
        explanation: "Route splitting creates asynchronous JavaScript bundle chunks loaded via HTTP."
      },
      {
        id: "B",
        text: "Splitting bundles by route (`lazy(() => import('./routes/Home'))`), loading code chunks only when the user navigates to that specific route, wrapped in `<Suspense>`.",
        isCorrect: true,
        explanation: "Correct. Route-based code-splitting is the most effective code-splitting strategy because users only download code for the pages they actually visit."
      },
      {
        id: "C",
        text: "Creating a separate domain name for every single HTML button.",
        isCorrect: false,
        explanation: "Route-based splitting chunks code by URL page routes within a single SPA application."
      },
      {
        id: "D",
        text: "Route splitting is prohibited in single-page applications.",
        isCorrect: false,
        explanation: "Route-based code-splitting is the industry standard for optimizing web app performance."
      }
    ],
    correctAnswer: "B",
    explanation: "One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won't be disturbed. Let us take an example of route based website using libraries like React Router with React.lazy, In the above code, the code splitting will happen at each route level.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is route based code splitting?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is route based code splitting?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "react-how-do-you-use-contexttype",
    title: "How do you use contextType?",
    prompt: "How do you use contextType?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class MyClass extends React.Component {\n     componentDidMount() {\n       let value = this.context;\n       /* perform a side-effect at mount using the value of MyContext */\n     }\n     componentDidUpdate() {\n       let value = this.context;\n       /* ... */\n     }\n     componentWillUnmount() {\n       let value = this.context;\n       /* ... */\n     }\n     render() {\n       let value = this.context;\n       /* render something based on the value of MyContext */\n     }\n   }\n   MyClass.contextType = MyContext;\n\nclass MyClass extends React.Component {\n     static contextType = MyContext;\n     render() {\n       let value = this.context;\n       /* render something based on the value */\n     }\n   }",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`contextType` can only be used inside CSS stylesheets.",
        isCorrect: false,
        explanation: "`contextType` is a React class component API."
      },
      {
        id: "B",
        text: "In class components, assign `MyClass.contextType = MyContext` (or `static contextType = MyContext`) to access the nearest context value via `this.context` across all lifecycles and `render()`.",
        isCorrect: true,
        explanation: "Correct. `contextType` simplified single-context consumption in class components, though functional components use `useContext(MyContext)`."
      },
      {
        id: "C",
        text: "`contextType` was deleted in React 15.",
        isCorrect: false,
        explanation: "`contextType` was introduced in React 16.6 for class components."
      },
      {
        id: "D",
        text: "`contextType` is an HTML attribute `<div contextType='theme'>`.",
        isCorrect: false,
        explanation: "`contextType` is a static class property in JavaScript, not an HTML attribute."
      }
    ],
    correctAnswer: "B",
    explanation: "ContextType is used to consume the context object. The contextType property can be used in two ways, contextType as property of class: The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function. Lets assign contextType property on MyClass as below, Static field You can use a static class field to initialize your contextType using public class field syntax.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you use contextType?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you use contextType?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-the-purpose-of-forward-ref-in-hocs",
    title: "What is the purpose of forward ref in HOCs?",
    prompt: "What is the purpose of forward ref in HOCs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "```javascript\nfunction logProps(Component) {\n  class LogProps extends React.Component {\n    componentDidUpdate(prevProps) {\n      console.log('old props:', prevProps);\n      console.log('new props:', this.props);\n    }\n\n    render() {\n      const {forwardedRef...rest} = this.props;\n\n      // Assign the custom prop \"forwardedRef\" as a ref\n      return <Component ref={forwardedRef} {...rest} />;\n    }\n  }\n\n  return React.forwardRef((props, ref) => {\n    return <LogProps {...props} forwardedRef={ref} />;\n  });\n}\n```\n\n```javascript\nclass FancyButton extends React.Component {\n  focus() {\n    // ...\n  }\n\n  // ...\n}\nexport default logProps(FancyButton);\n```\n\n```javascript\nimport FancyButton from './FancyButton';\n\nconst ref = React.createRef();\nref.current.focus();\n<FancyButton\n  label=\"Click Me\"\n  handleClick={handleClick}\n  ref={ref}\n/>;\n```",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To convert the HOC into a Python script.",
        isCorrect: false,
        explanation: "`forwardRef` is a React API for DOM and component reference passing."
      },
      {
        id: "B",
        text: "To delete the ref from memory when the HOC mounts.",
        isCorrect: false,
        explanation: "`forwardRef` passes the ref cleanly to the inner target component."
      },
      {
        id: "C",
        text: "To forward HTTP network packets to a proxy server.",
        isCorrect: false,
        explanation: "Ref forwarding passes React DOM references down component trees."
      },
      {
        id: "D",
        text: "Because `ref` is not a standard prop and attaches to the HOC wrapper instance by default, `React.forwardRef` explicitly intercepts and forwards the `ref` to the inner wrapped component.",
        isCorrect: true,
        explanation: "Correct. Without `forwardRef`, attaching a `ref` to an HOC-wrapped component gives a reference to the HOC container rather than the underlying DOM node or wrapped component."
      }
    ],
    correctAnswer: "D",
    explanation: "Refs will not get passed through because ref is not a prop. It handled differently by React just like key. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API. The below HOC logs all props, Let's use this HOC to log all props that get passed to our, fancy button, component, Now lets create a ref and pass it to FancyButton component. In this case, you can set focus to button element.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of forward ref in HOCs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of forward ref in HOCs?.",
    hints: [
      "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useRef"
  },
  {
    id: "react-is-it-possible-to-use-react-without-jsx",
    title: "Is it possible to use react without JSX?",
    prompt: "Is it possible to use react without JSX?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "class Greeting extends React.Component {\n  render() {\n    return <div>Hello {this.props.message}</div>;\n  }\n}\n\nReactDOM.render(<Greeting message=\"World\" />, document.getElementById('root'));\n\nclass Greeting extends React.Component {\n  render() {\n    return React.createElement('div', null, `Hello ${this.props.message}`);\n  }\n}\n\nReactDOM.render(\n  React.createElement(Greeting, { message: 'World' }, null),\n  document.getElementById('root'),\n);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Only if the website is hosted on a local intranet.",
        isCorrect: false,
        explanation: "React without JSX works in any browser environment with zero build tools."
      },
      {
        id: "B",
        text: "Using React without JSX causes an immediate fatal syntax error.",
        isCorrect: false,
        explanation: "`React.createElement` is standard plain JavaScript."
      },
      {
        id: "C",
        text: "Yes, JSX is purely syntactic sugar; you can write plain JavaScript using `React.createElement(type, props, ...children)` without any build or transpilation step.",
        isCorrect: true,
        explanation: "Correct. Every JSX tag compiles into a `React.createElement()` call (or JSX runtime `_jsx()`), so React can be used with raw `React.createElement()` in vanilla JS without build tools."
      },
      {
        id: "D",
        text: "No, browsers natively compile JSX and require JSX syntax to load React.",
        isCorrect: false,
        explanation: "Browsers do NOT understand JSX natively; JSX is transpiled to `React.createElement` or runtime calls."
      }
    ],
    correctAnswer: "C",
    explanation: "Yes, JSX is not mandatory for using React. Actually it is convenient when you don, t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling React.createElement(component, props.children). For example, let us take a greeting example with JSX, You can write the same code without JSX as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it possible to use react without JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it possible to use react without JSX?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-is-it-prop-must-be-named-as-render-for-render-props",
    title: "Does the prop name have to be 'render' in the Render Props pattern?",
    prompt: "Does the prop name have to be 'render' in the Render Props pattern?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "<Mouse\n  children={(mouse) => (\n    <p>\n      The mouse position is {mouse.x}, {mouse.y}\n    </p>\n  )}\n/>\n\n<Mouse>\n  {(mouse) => (\n    <p>\n      The mouse position is {mouse.x}, {mouse.y}\n    </p>\n  )}\n</Mouse>\n\nMouse.propTypes = {\n  children: PropTypes.func.isRequired,\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Yes, naming the prop anything other than `render` throws a React fatal error.",
        isCorrect: false,
        explanation: "React allows any prop name (e.g. `renderItem`, `children`, `renderFooter`)."
      },
      {
        id: "B",
        text: "Render props must always be named `callback`.",
        isCorrect: false,
        explanation: "Any prop name can be used to pass a render function."
      },
      {
        id: "C",
        text: "Render props can only be used on class components.",
        isCorrect: false,
        explanation: "Render props work equally well on functional and class components."
      },
      {
        id: "D",
        text: "No, any prop whose value is a function used by the component to know what to render is a render prop (commonly named `render`, `children`, or custom names like `renderHeader`).",
        isCorrect: true,
        explanation: "Correct. The term 'render prop' refers to the functional composition pattern, not the specific identifier name `render` (e.g. `children` as a function is a classic render prop)."
      }
    ],
    correctAnswer: "D",
    explanation: "Even though the pattern named render props, you don, t have to use a prop named render to use this pattern. i.e, Any prop that is a function that a component uses to know what to render is technically a, render prop. Lets take an example with the children prop for render props, Actually children prop doesn, t need to be named in the list of, attributes, in JSX element. Instead, you can keep it directly inside element, While using this above technique(without any name), explicitly state that children should be a function in your propTypes.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Is it prop must be named as render for render props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Is it prop must be named as render for render props?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-are-the-problems-of-using-render-props-with-pure-c",
    title: "What are the problems of using render props with pure components?",
    prompt: "What are the problems of using render props with pure components?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Render props cause `PureComponent` to crash with a syntax error.",
        isCorrect: false,
        explanation: "It does not crash; it simply negates the memoization optimization by failing shallow comparison."
      },
      {
        id: "B",
        text: "Pure components delete the render prop from memory.",
        isCorrect: false,
        explanation: "The issue is broken shallow prop equality due to new function references."
      },
      {
        id: "C",
        text: "Defining inline functions for render props inside `render()` creates a new function reference on every pass, failing shallow prop comparisons and defeating `PureComponent` / `React.memo`.",
        isCorrect: true,
        explanation: "Correct. Because inline arrow functions generate a new reference every render, `PureComponent`'s shallow equality check sees a changed prop and re-renders every time (solved by defining the handler as an instance method or `useCallback`)."
      },
      {
        id: "D",
        text: "Render props cannot be passed to any component.",
        isCorrect: false,
        explanation: "Render props are fully supported across all component types."
      }
    ],
    correctAnswer: "C",
    explanation: "If you create a function inside a render method, it negates the purpose of pure component. Because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop. You can solve this issue by defining the render function as instance method.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the problems of using render props with pure components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the problems of using render props with pure components?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-create-hoc-using-render-props",
    title: "How do you create HOC using render props?",
    prompt: "How do you create HOC using render props?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "function withMouse(Component) {\n  return class extends React.Component {\n    render() {\n      return <Mouse render={(mouse) => <Component {...this.props} mouse={mouse} />} />;\n    }\n  };\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Write an HOC function that returns a component rendering the render-prop component and passing its data into the wrapped component: `const withMouse = Comp => props => <Mouse render={m => <Comp {...props} mouse={m} />} />`.",
        isCorrect: true,
        explanation: "Correct. Render-prop components can easily be converted into HOCs by wrapping them in a higher-order function, demonstrating the versatility of the pattern."
      },
      {
        id: "B",
        text: "By calling `eval()` on the render prop string.",
        isCorrect: false,
        explanation: "`eval()` is unsafe and completely unnecessary."
      },
      {
        id: "C",
        text: "Render props cannot be used inside HOCs.",
        isCorrect: false,
        explanation: "Wrapping render-prop components inside HOCs is a standard pattern."
      },
      {
        id: "D",
        text: "By mutating `React.Component.prototype`.",
        isCorrect: false,
        explanation: "Mutating prototypes causes severe bugs and violates component encapsulation."
      }
    ],
    correctAnswer: "A",
    explanation: "You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a withMouse HOC instead of a component, you could easily create one using a regular with a render prop. This way render props gives the flexibility of using either pattern.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you create HOC using render props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you create HOC using render props?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-windowing-technique",
    title: "What is windowing technique?",
    prompt: "What is windowing technique?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Installing Microsoft Windows on a web server.",
        isCorrect: false,
        explanation: "Windowing is a frontend UI rendering optimization."
      },
      {
        id: "B",
        text: "Opening 500 browser popup windows at the same time.",
        isCorrect: false,
        explanation: "Windowing refers to virtualizing list rendering within a scroll viewport."
      },
      {
        id: "C",
        text: "A performance optimization technique (virtualized lists via `react-window` / TanStack Virtual) that only renders the visible subset of items in the viewport, dramatically reducing DOM nodes and memory.",
        isCorrect: true,
        explanation: "Correct. Windowing/virtualization allows rendering lists with tens of thousands of items smoothly by recycling a small pool of DOM elements matching the visible scroll window."
      },
      {
        id: "D",
        text: "A technique that only works on desktop monitors with physical windows.",
        isCorrect: false,
        explanation: "Virtual windowing works on mobile, tablet, and desktop browsers."
      }
    ],
    correctAnswer: "C",
    explanation: "Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created. If your application renders long lists of data then this technique is recommended. Both react-window and react-virtualized are popular windowing libraries which provides several reusable components for displaying lists, grids, and tabular data.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is windowing technique?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is windowing technique?.",
    hints: [
      "Rendering only the visible rows keeps the DOM small. The cost moves to measurement and scroll bookkeeping."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/virtualize-long-lists-react-window"
  },
  {
    id: "react-how-do-you-print-falsy-values-in-jsx",
    title: "How do you print falsy values in JSX?",
    prompt: "How do you print falsy values in JSX?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<div>My JavaScript variable is {String(myVariable)}.</div>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Wrap them in HTML comments `<!-- {myVar} -->`.",
        isCorrect: false,
        explanation: "HTML comments do not render text on screen in JSX."
      },
      {
        id: "B",
        text: "Because `false`, `null`, `undefined`, and `true` render nothing in JSX, convert them explicitly to strings: `{String(myVar)}`, `{myVar + ''}`, or `{myVar?.toString()}`.",
        isCorrect: true,
        explanation: "Correct. React intentionally ignores booleans, null, and undefined so conditionals like `{show && <Modal />}` work cleanly; to display them as text, convert them to strings."
      },
      {
        id: "C",
        text: "Pass them inside an infinite `while` loop.",
        isCorrect: false,
        explanation: "Infinite loops freeze the browser UI."
      },
      {
        id: "D",
        text: "Falsy values cannot be converted to strings in JavaScript.",
        isCorrect: false,
        explanation: "`String(val)` easily converts any falsy value into displayable text (`'false'`, `'null'`)."
      }
    ],
    correctAnswer: "B",
    explanation: "The falsy values such as false, null, undefined, and true are valid children but they don't render anything. If you still want to display them then you need to convert it to string. Let's take an example on how to convert to a string,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you print falsy values in JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you print falsy values in JSX?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-do-you-set-default-value-for-uncontrolled-component",
    title: "How do you set default value for uncontrolled component?",
    prompt: "How do you set default value for uncontrolled component?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "render() {\n  return (\n    <form onSubmit={this.handleSubmit}>\n      <label>\n        User Name:\n        <input\n          defaultValue=\"John\"\n          type=\"text\"\n          ref={this.input} />\n      </label>\n      <input type=\"submit\" value=\"Submit\" />\n    </form>\n  );\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Uncontrolled inputs cannot have initial default values.",
        isCorrect: false,
        explanation: "`defaultValue` and `defaultChecked` are specifically designed for uncontrolled inputs."
      },
      {
        id: "B",
        text: "Use the `defaultValue` attribute for text/number/select/textarea inputs, or `defaultChecked` for checkbox/radio inputs (leaving subsequent user typing uncontrolled by React state).",
        isCorrect: true,
        explanation: "Correct. `defaultValue` / `defaultChecked` sets the initial DOM value on mount while letting the native DOM manage subsequent user edits without React `value` overrides."
      },
      {
        id: "C",
        text: "Mutate `input.value` directly in the constructor.",
        isCorrect: false,
        explanation: "`defaultValue` is the declarative React attribute for uncontrolled initial values."
      },
      {
        id: "D",
        text: "Use `value='initial'` without an `onChange` handler.",
        isCorrect: false,
        explanation: "Providing `value` without `onChange` creates a read-only input in React."
      }
    ],
    correctAnswer: "B",
    explanation: "In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a defaultValue attribute instead of value. The same applies for select and textArea inputs. But you need to use defaultChecked for checkbox and radio inputs.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you set default value for uncontrolled component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you set default value for uncontrolled component?.",
    hints: [
      "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react-dom/components/input"
  },
  {
    id: "react-what-is-the-purpose-of-rendertonodestream-method",
    title: "What is the purpose of renderToNodeStream method?",
    prompt: "What is the purpose of renderToNodeStream method?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A method that compiles React JSX into MP4 video files.",
        isCorrect: false,
        explanation: "`renderToNodeStream` streams HTML strings from Node.js servers."
      },
      {
        id: "B",
        text: "A client-side method for playing audio streams through browser speakers.",
        isCorrect: false,
        explanation: "`renderToNodeStream` is an SSR HTML streaming method on Node.js servers."
      },
      {
        id: "C",
        text: "A Node.js server method in `react-dom/server` that rendered React trees to a readable stream for faster TTFB; deprecated in React 18 in favor of `renderToPipeableStream`.",
        isCorrect: true,
        explanation: "Correct. Streaming HTML reduces Time to First Byte (TTFB) by sending HTML chunks as they are generated, modernized in React 18 as `renderToPipeableStream` with Suspense support."
      },
      {
        id: "D",
        text: "A tool for rendering 3D video game graphics in WebGL.",
        isCorrect: false,
        explanation: "`renderToNodeStream` generated HTML markup streams."
      }
    ],
    correctAnswer: "C",
    explanation: "The ReactDOMServer method is used to generate HTML on the server and send the markup down on the initial request for faster page loads. It also helps search engines to crawl your pages easily for SEO purposes. Note: Remember this method is not available in the browser but only server.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of renderToNodeStream method?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of renderToNodeStream method?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-concurrent-rendering",
    title: "What is Concurrent Rendering?",
    prompt: "What is Concurrent Rendering?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeSnippet: "// 1. Part of an app by wrapping with ConcurrentMode\n<React.unstable_ConcurrentMode>\n  <Something />\n</React.unstable_ConcurrentMode>;\n\n// 2. Whole app using createRoot\nReactDOM.unstable_createRoot(domNode).render(<App />);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Running React code on 50 physical computers simultaneously.",
        isCorrect: false,
        explanation: "Concurrent rendering is a software scheduling model in React's JavaScript reconciler."
      },
      {
        id: "B",
        text: "A core capability in React 18+ where rendering is interruptible, allowing React to pause low-priority rendering (e.g. background data transitions) to keep the main UI responsive to urgent user input (typing, clicks).",
        isCorrect: true,
        explanation: "Correct. Concurrent React breaks the synchronous render model, allowing the reconciler to yield to high-priority browser events and prepare UI updates in the background."
      },
      {
        id: "C",
        text: "Rendering 3D virtual reality models directly to the GPU.",
        isCorrect: false,
        explanation: "Concurrent rendering manages JavaScript render work priority in the browser UI thread."
      },
      {
        id: "D",
        text: "A feature that disables all user interactions during rendering.",
        isCorrect: false,
        explanation: "Concurrent rendering specifically ensures user interactions are never blocked during renders."
      }
    ],
    correctAnswer: "B",
    explanation: "The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there's something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Concurrent Rendering?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Concurrent Rendering?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-what-is-the-difference-between-async-mode-and-concurren",
    title: "What is the difference between async mode and concurrent mode?",
    prompt: "What is the difference between async mode and concurrent mode?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Async Mode runs in Node.js; Concurrent Mode runs in PostgreSQL.",
        isCorrect: false,
        explanation: "Both are names for React's internal client reconciliation scheduling engine."
      },
      {
        id: "B",
        text: "Concurrent Mode was deleted and replaced by jQuery.",
        isCorrect: false,
        explanation: "Concurrent rendering is the foundational architecture of React 18 and React 19."
      },
      {
        id: "C",
        text: "Async mode only works on Sundays.",
        isCorrect: false,
        explanation: "The name was updated to clarify architectural priority-based rendering."
      },
      {
        id: "D",
        text: "They refer to the same underlying architecture: 'Async Mode' was the early experimental working name, later renamed to 'Concurrent Mode / Concurrent Features' to highlight cooperative multitasking and priority scheduling.",
        isCorrect: true,
        explanation: "Correct. The React team rebranded Async Mode to Concurrent React to better convey its core mechanism: multi-priority interruptible rendering rather than simple asynchronous execution."
      }
    ],
    correctAnswer: "D",
    explanation: "Both refers the same thing. Previously concurrent Mode being referred to as \"Async Mode\" by React team. The name has been changed to highlight React, s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between async mode and concurrent mode?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between async mode and concurrent mode?.",
    hints: [
      "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useTransition"
  },
  {
    id: "react-virtual-dom-vs-real-and-shadow-dom",
    title: "Virtual DOM, real DOM and Shadow DOM are three different things",
    prompt: "How does React's Virtual DOM differ from the real DOM and from the Shadow DOM?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "virtual-dom",
      "shadow-dom",
      "reconciliation"
    ],
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The Shadow DOM is what React diffs, and the Virtual DOM is the browser's internal render tree",
        isCorrect: false,
        explanation: "This inverts both. React diffs its own Virtual DOM; the browser's internal structures are not the Shadow DOM."
      },
      {
        id: "B",
        text: "The Virtual DOM is an in-memory description of the UI that React diffs before touching the real DOM; the Shadow DOM is an unrelated browser feature for encapsulating a component's markup and styles",
        isCorrect: true,
        explanation: "Correct. One is a React implementation detail, the other is a native browser API, they only sound alike."
      },
      {
        id: "C",
        text: "The Virtual DOM and the Shadow DOM are the same mechanism, named differently by React and by browser vendors",
        isCorrect: false,
        explanation: "They are unrelated. The Shadow DOM is a Web Components API that React does not use for rendering."
      },
      {
        id: "D",
        text: "The Virtual DOM is a faster reimplementation of the real DOM that React renders to directly",
        isCorrect: false,
        explanation: "React never renders to the Virtual DOM as an output target, it eventually commits to the real DOM."
      }
    ],
    correctAnswer: "B",
    explanation: "The Virtual DOM is a plain-object description of what the UI should look like, kept in memory. React builds a new one on each render, diffs it against the previous one, and applies only the differences to the real DOM, batching the expensive part. The Shadow DOM is something else entirely: a native browser API that gives an element its own encapsulated subtree and scoped styles, used by Web Components. React does not use it to render.",
    interviewLine: "The Virtual DOM is React's diffing strategy; the Shadow DOM is the browser's encapsulation strategy. Same word, unrelated ideas.",
    misconception: "Assuming Virtual DOM and Shadow DOM are two names for the same thing because both contrast with 'the real DOM'.",
    hints: [
      "One of the three is a browser standard that has nothing to do with React."
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/preserving-and-resetting-state"
  },
  {
    id: "react-class-vs-function-components-today",
    title: "Which component type to reach for in new code",
    prompt: "React has class components and function components. Which should new code use, and why?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "components",
      "hooks",
      "function-components"
    ],
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Class components, because function components re-render more often",
        isCorrect: false,
        explanation: "Both re-render on the same triggers. Component type has no bearing on render frequency."
      },
      {
        id: "B",
        text: "Class components, because only they can hold state",
        isCorrect: false,
        explanation: "Function components have held state since hooks arrived in React 16.8."
      },
      {
        id: "C",
        text: "Function components, because hooks gave them state and effects and they are now the default for new code",
        isCorrect: true,
        explanation: "Correct. Classes still work and are not deprecated, but everything new, including Server Components, is built around functions."
      },
      {
        id: "D",
        text: "Function components for presentation only; anything stateful must still be a class",
        isCorrect: false,
        explanation: "That was true before hooks. It has not been true since React 16.8."
      }
    ],
    correctAnswer: "C",
    explanation: "Before hooks, function components were limited to presentation and anything stateful had to be a class. Hooks removed that split: useState, useEffect and the rest give function components the full feature set, with less ceremony and no this binding. Class components are not deprecated and still hold one unique capability, error boundaries need componentDidCatch or getDerivedStateFromError, but new code should default to functions.",
    interviewLine: "Hooks collapsed the class/function split. The only thing still requiring a class is an error boundary.",
    misconception: "Believing function components are still 'presentational only'. That distinction ended with hooks.",
    hints: [
      "Is there anything a class can still do that a function cannot?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-keys-outside-lists-force-remount",
    title: "Keys work outside lists too, and that is how you force a remount",
    prompt: "Keys are usually seen on list items. What happens if you put a changing key on a single element?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "keys",
      "reconciliation",
      "remount"
    ],
    codeSnippet: "const Profile = ({ userId }: { userId: string }) => {\n  // changing userId throws away all internal state\n  return <ProfileForm key={userId} userId={userId} />;\n};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React warns in development and falls back to positional matching",
        isCorrect: false,
        explanation: "There is no warning; a key on a single element is entirely valid."
      },
      {
        id: "B",
        text: "React treats it as a different element and remounts it, discarding its state",
        isCorrect: true,
        explanation: "Correct. A changed key means a different identity, so the old instance unmounts and a fresh one mounts with reset state."
      },
      {
        id: "C",
        text: "React reuses the instance but re-runs every effect",
        isCorrect: false,
        explanation: "It does not reuse the instance at all, the component unmounts and a new one mounts."
      },
      {
        id: "D",
        text: "Nothing, keys are ignored outside of a list",
        isCorrect: false,
        explanation: "Keys are part of reconciliation for every element, not just list children."
      }
    ],
    correctAnswer: "B",
    explanation: "Keys tell React which element a node corresponds to between renders. In a list that prevents index-based mismatching, but the mechanism is general: change an element's key and React concludes it is a different element, so it unmounts the old instance, losing all its state, and mounts a new one. That makes a changing key the idiomatic way to reset a form or a component when its subject changes, rather than syncing state in an effect.",
    interviewLine: "A key is an identity claim. Change the identity and React remounts, which is the cleanest way to reset state on a prop change.",
    misconception: "Thinking keys only matter inside .map(). They control reconciliation identity everywhere.",
    hints: [
      "What does React do when it decides an element is not the same element as last time?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-why-jsx-needs-transpiling",
    title: "What JSX actually compiles to",
    prompt: "Why does JSX have to be transpiled before a browser can run it?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "jsx",
      "babel",
      "transpilation"
    ],
    codeSnippet: "const Greeting = () => <h1 className=\"greeting\">Hello</h1>;\n\n// becomes, roughly:\nconst Greeting = () =>\n  jsx(\"h1\", { className: \"greeting\", children: \"Hello\" });",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Because browsers can parse JSX but do so too slowly for production",
        isCorrect: false,
        explanation: "No browser parses JSX at all, it is a syntax error in every JavaScript engine."
      },
      {
        id: "B",
        text: "Because JSX must be converted into HTML strings before rendering",
        isCorrect: false,
        explanation: "It compiles into function calls returning objects, not HTML strings. React builds DOM nodes from those objects."
      },
      {
        id: "C",
        text: "Because transpiling is how React escapes interpolated values against XSS",
        isCorrect: false,
        explanation: "Escaping happens at render time in React, not during transpilation."
      },
      {
        id: "D",
        text: "Because JSX is not valid JavaScript syntax, a compiler rewrites it into plain function calls",
        isCorrect: true,
        explanation: "Correct. No engine parses JSX; Babel, SWC or TypeScript rewrite each element into a function call that returns a plain object."
      }
    ],
    correctAnswer: "D",
    explanation: "JSX is a syntax extension, not JavaScript. No engine can parse <h1>Hello</h1>, so a compiler rewrites every element into a function call, createElement under the classic transform, jsx under the modern automatic runtime. Those calls return plain objects describing the UI, which is exactly the Virtual DOM React then diffs. This is also why JSX expressions are just values: you can store them in variables and return them from functions.",
    interviewLine: "JSX is sugar over function calls that return objects. The compiler is what turns markup-shaped syntax into those calls.",
    misconception: "Thinking JSX compiles to HTML. It compiles to function calls that produce JavaScript objects.",
    hints: [
      "What would a JavaScript engine do if you handed it an angle bracket in expression position?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-styling-approaches-tradeoffs",
    title: "Choosing a styling approach in React",
    prompt: "Which statement about styling React components is accurate?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "styling",
      "css-modules",
      "inline-styles"
    ],
    codeSnippet: "<div style={{ backgroundColor: \"blue\", color: \"white\" }} />",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A plain imported .css file is automatically scoped to the importing component",
        isCorrect: false,
        explanation: "A plain stylesheet is global no matter where it is imported; only Modules scope it."
      },
      {
        id: "B",
        text: "Inline styles perform best because they avoid stylesheet parsing",
        isCorrect: false,
        explanation: "Inline style objects are recreated every render and cannot be cached or reused by the browser like a stylesheet."
      },
      {
        id: "C",
        text: "Inline style objects support the full range of CSS, including pseudo-classes and media queries",
        isCorrect: false,
        explanation: "Inline styles cannot express :hover, :before or media queries, those need a real stylesheet."
      },
      {
        id: "D",
        text: "CSS Modules scope class names per file, avoiding the global collisions a plain stylesheet risks",
        isCorrect: true,
        explanation: "Correct. The build step rewrites each class to a unique name, giving you real CSS with local scope."
      }
    ],
    correctAnswer: "D",
    explanation: "Plain CSS files give you every CSS feature but are global, so class names can collide across a codebase. CSS Modules keep real CSS while the build step rewrites each class name to something unique per file, which gets you scoping for free. Inline style objects are genuinely scoped to one element but cannot express pseudo-classes, pseudo-elements or media queries, and a new object each render is not something the browser can cache.",
    interviewLine: "Inline styles scope but can't do :hover or media queries; CSS Modules give you real CSS with local scope. Pick per constraint, not per fashion.",
    misconception: "Assuming importing a .css file into a component scopes it to that component. It does not.",
    hints: [
      "Which approach cannot express a hover state?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-error-boundaries-what-they-catch",
    title: "What an error boundary can and cannot catch",
    prompt: "You wrap a subtree in an error boundary. Which failure does it NOT catch?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "error-boundaries",
      "error-handling"
    ],
    codeSnippet: "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    log(error, info);\n  }\n  render() {\n    return this.state.hasError ? <Fallback />: this.props.children;\n  }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A rejected promise in an async click handler",
        isCorrect: true,
        explanation: "Correct. Event handlers run outside the render/commit phases, so their errors escape the boundary, catch them yourself."
      },
      {
        id: "B",
        text: "An error thrown from a child's constructor",
        isCorrect: false,
        explanation: "Constructor errors happen during rendering and are caught."
      },
      {
        id: "C",
        text: "An error thrown while rendering a child component",
        isCorrect: false,
        explanation: "Render-phase errors are exactly what error boundaries exist to catch."
      },
      {
        id: "D",
        text: "An error thrown inside a child's useEffect during commit",
        isCorrect: false,
        explanation: "Errors thrown from lifecycle and effect code in the subtree are caught."
      }
    ],
    correctAnswer: "A",
    explanation: "Without a boundary, an error during rendering unmounts the whole tree, React would rather show nothing than something wrong. An error boundary catches errors thrown while rendering, in lifecycle methods, and in constructors anywhere below it, and swaps in a fallback. It does not catch errors in event handlers, in asynchronous code such as setTimeout or a rejected promise, or in the boundary's own render, those are outside the render/commit path and need ordinary try/catch. Error boundaries still require a class, or a wrapper like react-error-boundary.",
    interviewLine: "Error boundaries catch the render path, not the interaction path. A failing click handler needs its own try/catch.",
    misconception: "Expecting a boundary to catch everything inside it. Event handlers and async callbacks are not covered.",
    hints: [
      "Which of these runs outside the render and commit phases?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    id: "react-portals-dom-vs-react-tree",
    title: "What a portal does and does not move",
    prompt: "A modal is rendered through createPortal into a node outside its parent. Where do its click events propagate?",
    level: "intermediate",
    type: "concept",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "portals",
      "events",
      "dom"
    ],
    codeSnippet: "const Modal = ({ children }: { children: React.ReactNode }) =>\n  createPortal(children, document.getElementById(\"portal-root\")!);",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To both trees simultaneously, so handlers fire twice",
        isCorrect: false,
        explanation: "Handlers fire once, following the React tree."
      },
      {
        id: "B",
        text: "Up the DOM tree from the portal's host node, bypassing the React parent",
        isCorrect: false,
        explanation: "React events follow the React tree, not the DOM position of the host node."
      },
      {
        id: "C",
        text: "Up the React tree to the component that rendered the portal, despite the DOM position",
        isCorrect: true,
        explanation: "Correct. A portal relocates the DOM node only; context and event bubbling still follow the React tree."
      },
      {
        id: "D",
        text: "Nowhere, portals stop event propagation entirely",
        isCorrect: false,
        explanation: "Events propagate normally; the portal changes where the node lives, not whether events bubble."
      }
    ],
    correctAnswer: "C",
    explanation: "createPortal changes where a subtree is inserted in the DOM, useful for modals and tooltips that must escape a parent's overflow or stacking context, but it does not move the component in the React tree. Context still flows down from the rendering parent, and events still bubble up to it, which is what makes a portalled modal feel like a normal child despite living elsewhere in the document. Only the physical DOM position changes.",
    interviewLine: "A portal moves the node, not the component. Context and events still follow the React tree.",
    misconception: "Expecting a portalled child to lose context or bubble to its DOM host. Both follow the React tree.",
    hints: [
      "Does the portal change the component hierarchy, or only the DOM placement?"
    ],
    source: "react-17-2025",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react-dom.dev/reference/react-dom/createPortal"
  }
];
