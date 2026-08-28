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
        text: "To render an array of elements, you can use the map() method to iterate over the array and return a new array of React elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "By default, the following syntax is used to create elements in react.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "You can use any conditional operators, including ternary.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Returning multiple elements from a component is a common practice in React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The keys help React determine which elements have been changed, added, or removed.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React is a front-end and open-source JavaScript library which is useful in developing user interfaces specifically for applications with a single page.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A key is a special string attribute that needs to be included when using lists of elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Controlled and uncontrolled components are just different approaches to handling input from elements in react.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Introduced in version 16 of React, Error boundaries provide a way for us to catch errors that occur in the render phase.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A switching component refers to a component that will render one of the multiple components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "It is possible to listen to the resize event in componentDidMount() and then update the width and height dimensions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "There are many different ways through which one can style a React component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Parent Component to Child Component (using props) With the help of props, we can send data from a parent to a child component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Simply put, Higher-Order Component(HOC) is a function that takes in a component and returns a new component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "There are four different phases in the lifecycle of React component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React Router refers to the standard library used for routing in React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If the root elements have different types, React: unmounts the old component tree, destroys associated DOM nodes, mounts a new tree.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "If element types are the same, React updates only the changed attributes, and then recursively compa",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "This one is simple! You can use forwardRef to pass a ref from the parent component through the child component to a DOM element or another component inside it.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "State should be kept as close as possible to where it is used.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React's Fragment helps in grouping multiple elements together by being careful not to add an extra element to the DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "JSX, short for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The virtual DOM is a simplified version of the actual DOM used by React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A React Node refers to any unit that can be rendered in React, such as an element, string, number, or null.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React Fragments allow you to group multiple elements without adding extra nodes to the DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The difference between createElement and cloneElement in React is as follows: createElement: Used to create a new React element.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "In React, re-rendering refers to the process of updating the user interface (UI) in response to changes in the component's state or props.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Before React 19, function components didn't accept ref as a regular prop, so forwardRef() was used to pass a ref through to a child DOM element.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Hydration involves attaching event listeners and making server-rendered HTML interactive on the client side.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React Portals allow rendering children into a DOM node outside the parent component's hierarchy.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "React Strict Mode is a development feature in React that activates extra checks and warnings to help identify potential issues in your app.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Choosing between React state, context, and external state managers depends on your application's complexity.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "React's scheduler assigns priority to updates based on how they're triggered.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Server-side rendering (SSR) involves rendering components on the server before sending fully rendered HTML to clients, improving initial load times and SEO through efficient hydration processes.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Nested routes allow you to create hierarchies of components, and useParams helps access dynamic route parameters.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "To handle 404 errors or page not found in React Router, create a catch-all route at the end of your route configuration that renders a custom 404 component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "In React Router v6, you can pass props to a route component using the element prop in the <Route> component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React Testing Library is a testing utility for React that helps test components in a way that resembles how users interact with the application.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "To test React components using React Testing Library, you can: Render the component using render.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Shallow rendering renders a component one level deep: its children are not rendered, only referenced as React elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Snapshot Testing in React is a testing technique that captures the rendered output of a component and saves it as a snapshot.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "To test React components that use context, you can wrap the component in a context provider with the desired context values for testing.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "To test React components that use Redux, you can use the redux-mock-store library to create a mock store with the desired state for testing.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Shallow Rendering: Renders only the component being tested, without rendering its child components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "useOptimistic renders an optimistic version of state immediately while an action is in flight, then automatically reverts to the real state when the action settles.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Both mark updates as non-urgent so React can keep the UI responsive.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Attach event handlers like onClick or onChange to JSX elements and define the handler function.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Explain the creation of a List in React?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A key is a special attribute used on list elements so React can track which items change, get added, or are removed.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "In class components, render() returns the JSX to display.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "State is an object that holds data affecting how a component renders and behaves.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "shouldComponentUpdate(nextProps, nextState) returns true or false to tell React whether to re-render the component when props or state change.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "What are Pure Components in React?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "setState() schedules an update to a component, s state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Conditional rendering displays different components depending on conditions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Main parts: BrowserRouter (Router): Wraps the app and enables routing.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A component passes through: Initialization: Constructor sets initial props and state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Mounting methods include: componentWillMount(): invoked before mounting (legacy and not recommended).",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "What are React Fragments?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "CSS Modules scope styles locally.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "What is the Strict Mode in React?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React, s concurrency features let React split rendering work, pause it, and prioritize urgent updates.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Server-side rendering runs React on the server to produce HTML that the client can display immediately.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Forms in React are elements like input, select, and textarea.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Error boundaries are class components that implement static getDerivedStateFromError and componentDidCatch to catch errors during render, lifecycle, or constructors of child components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Keys improve reconciliation by giving elements stable identities.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "JSX looks like HTML inside JavaScript, but browsers only understand plain JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "StrictMode is a development-only wrapper that runs additional checks, such as double-inverting certain functions to find impure renders and missing effect cleanups.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Wrap risky components with error boundaries to catch render time errors and display fallback UI.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Common techniques: if/return early: ideal for guarding large sections.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The major features of React are: It uses VirtualDOM instead of RealDOM considering that RealDOM manipulations are expensive.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "An Element is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "There are two possible ways to create a component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Both props and state are plain JavaScript objects.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If you try to update state directly then it won't re-render the component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "The callback function is invoked when setState finished and the component gets rendered.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You can use either if statements or ternary expressions which are available from JS to conditionally render expressions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The ref is used to return a reference to the element.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The Virtual DOM works in three simple steps.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "A component that controls the input elements within the forms on subsequent user input is called Controlled Component, i.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The component lifecycle has three distinct lifecycle phases: Mounting: The component is ready to mount in the browser DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with computed property names.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You need to make sure that function is not being called while passing the function as a parameter.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "class is a keyword in JavaScript, and JSX is an extension of JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "It's common pattern in React which is used for a component to return multiple elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Portal is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "The react-dom package provides DOM-specific methods that can be used at the top level of your app.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "This method is used to render a React element into the DOM in the supplied container and return a reference to the component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The ReactDOMServer object enables you to render components to static markup (typically used on node server).",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The dangerouslySetInnerHTML attribute is React's replacement for using innerHTML in the browser DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Handling events in React elements has some syntactic differences: React event handlers are named using camelCase, rather than lowercase.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "When you use setState(), then apart from assigning to the object state React also re-renders the component and all its children.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Keys should be stable, predictable, and unique so that React can keep track of elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Yes, it is safe to use setState() inside componentWillMount() method.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "If the props on the component are changed without the component being refreshed, the new prop value will never be displayed because the constructor function will never update the current state of the component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "In some cases you want to render different components depending on some state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "When we spread props we run into the risk of adding unknown HTML attributes, which is a bad practice.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React is already equipped to handle rendering on Node servers.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The lifecycle methods are called in the following order when an instance of a component is being created and inserted into the DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The new static getDerivedStateFromProps() lifecycle method is invoked after a component is instantiated as well as before it is re-rendered.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Recommended ordering of methods from mounting to render stage: static methods constructor() getChild",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "A switching component is a component that renders one of many components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "What is strict mode in React?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as unrecognized tag.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Are custom DOM attributes supported in React v16?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "By default, when your component's state or props change, your component will re-render.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "The react package contains React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The React team worked on extracting all DOM-related features into a separate library called ReactDOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If you try to render a <label> element bound to a text input using the standard for attribute, then it produces HTML missing that attribute and prints a warning to the console.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "When you use setState() the current and previous states are merged.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "It is possible with latest version (>=16.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You can do it by creating ref for input element and using it in componentDidMount():: ",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You could use the ref prop to acquire a reference to the underlying HTMLInputElement object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the HTMLElement.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React Transition Group and React Motion are popular animation packages in React ecosystem.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "ESLint is a popular JavaScript linter.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Render Props is a simple technique for sharing code between components using a prop whose value is a function.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "There are three different ways to achieve programmatic routing/navigation within components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You have to wrap your Route's in a <Switch> block because <Switch> is unique in that it renders a route exclusively.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The <Formatted.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You can dispatch an action in componentDidMount() method and in render() method you can verify the data.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You need to write a root reducer in your application which delegate handling the action to the reducer generated by combineReducers().",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Component is a class or function component that describes the presentational part of your application.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Most of the applications has several top-level directories as below: Components: Used for dumb components unaware of Redux.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You need to follow below steps to use Polymer in React, Create a Polymer element: Create the Polymer component HTML tag by importing it in a HTML document, e.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Lets create <Title> and <Wrapper> components with specific styles for each.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The concept of render hijacking is the ability to control what a component will output from another component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "There are two main ways of implementing HOCs in React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Arrays: Unlike older releases, you don't need to make sure render method return a single element in React16.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Below are the cases in which error boundaries doesn't work, Inside Event handlers Asynchronous code",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Error boundaries do not catch errors inside event handlers.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The render() method is the only required method in a class component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Below are the list of following types used and return from render method, React elements: Elements that instruct React to render a DOM node.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "An update can be caused by changes to props or state.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The Fragments declared with the explicit syntax may have keys.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "React DOM escapes any values embedded in JSX before rendering them.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "You can update UI(represented by rendered element) by passing the newly created element to ReactDOM's render method.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You can prevent component from rendering by returning null based on specific condition.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "There are three conditions to make sure, it is safe use the index as a key.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
    title: "Is it keys should be globally unique?",
    prompt: "Is it keys should be globally unique?",
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
        text: "Keys used within arrays should be unique among their siblings but they don, t need to be globally unique.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Below are the main reasons to recommend formik over redux form library, The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you, re waiting for it to load using a loading indicator.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "One of the best place to do code splitting is with routes.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "ContextType is used to consume the context object.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Refs will not get passed through because ref is not a prop.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Yes, JSX is not mandatory for using React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
    title: "Is it prop must be named as render for render props?",
    prompt: "Is it prop must be named as render for render props?",
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
        text: "Even though the pattern named render props, you don, t have to use a prop named render to use this pattern.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "If you create a function inside a render method, it negates the purpose of pure component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "You can implement most higher-order components (HOC) using a regular component with a render prop.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
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
        text: "Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The falsy values such as false, null, undefined, and true are valid children but they don't render anything.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "In React, the value attribute on form elements will override the value in the DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The ReactDOMServer method is used to generate HTML on the server and send the markup down on the initial request for faster page loads.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
        text: "Both refers the same thing.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
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
