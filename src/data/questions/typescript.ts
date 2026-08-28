import { QuizQuestion } from '../types';

export const TYPESCRIPT_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-is-a-reducer-in-redux-and-what-parameters-does-it",
    title: "What is a reducer in Redux and what parameters does it take?",
    prompt: "What is a reducer in Redux and what parameters does it take?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "export default function appReducer(state = initialState, action) {\n  // The reducer normally looks at the action type field to decide what happens\n  switch (action.type) {\n    // Do something here based on the different types of actions\n    default:\n      // If this reducer doesn't recognize the action type, or doesn't\n      // care about this specific action, return the existing state unchanged\n      return state\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A reducer is a pure function that takes the state and action as parameters.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A reducer is a pure function that takes the state and action as parameters. Inside the reducer, we track the type of the received action and, depending on it, we modify the state and return a new state object. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is a reducer in Redux and what parameters does it take?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is a reducer in Redux and what parameters does it take?.",
    hints: [
      "Consider the core principles and trade-offs of What is a reducer in Redux and what parameters does it take?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-an-action-and-how-can-you-change-the-state-in-r",
    title: "What is an action and how can you change the state in Redux?",
    prompt: "What is an action and how can you change the state in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "{\n  type: \"SOME_TYPE\"\n}\n\n{\n  type: \"SOME_TYPE\",\n  payload: \"Any payload\",\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Action is a simple JavaScript object that must have a field with a type.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Action is a simple JavaScript object that must have a field with a type. You can also optionally add some data as payload. In order to change the state, it is necessary to call the dispatch function, to which we pass action Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is an action and how can you change the state in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is an action and how can you change the state in Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is an action and how can you change the state in Redux?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-peculiarities-of-working-with-mobx",
    title: "What are the peculiarities of working with Mobx?",
    prompt: "What are the peculiarities of working with Mobx?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Mobx provides decorators like observable and computed to define observable state and reactive functions.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Mobx provides decorators like observable and computed to define observable state and reactive functions. Actions decorated with action are used to modify the state, ensuring that all changes are tracked. Mobx also offers automatic dependency tracking, different types of reactions, fine-grained control over reactivity, and seamless integration with React through the mobx-react package. Overall, Mobx simplifies state management by automating the update process based on changes in observable state.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the peculiarities of working with Mobx?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the peculiarities of working with Mobx?.",
    hints: [
      "Consider the core principles and trade-offs of What are the peculiarities of working with Mobx?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-public-api",
    title: "What is Public API?",
    prompt: "What is Public API?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "// index.js\n\nexport function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nexport function calculateSum(a, b) {\n  return a + b;\n}\n\n// main.js\n\nimport { greet, calculateSum } from './index.js';\n\nconsole.log(greet('John')); // Hello, John!\nconsole.log(calculateSum(5, 3)); // 8",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "In the context of index files, a Public API typically refers to the interface or functions that are exposed and accessible to external modules or components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "In the context of index files, a Public API typically refers to the interface or functions that are exposed and accessible to external modules or components. Here's a code example of an index file representing a Public API: In this example, the index.js file acts as a Public API where the functions greet() and calculateSum() are exported and can be accessed from other modules by importing them. Other modules can import and use these functions as part of their implementation: By exporting specific functions from the index file, we are defining the Public API of the module, allowing other modules to use those functions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Public API?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Public API?.",
    hints: [
      "Consider the core principles and trade-offs of What is Public API?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-what-is-the-role-of-proptypes-in-react",
    title: "What is the role of PropTypes in React?",
    prompt: "What is the role of PropTypes in React?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "import PropTypes from 'prop-types';\nfunction MyComponent({ name, age }) {  return (    <div>      {name} is {age} years old    </div>  );}\nMyComponent.propTypes = {  name: PropTypes.string.isRequired,  age: PropTypes.number.isRequired,};",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "PropTypes was React's runtime prop type-checker.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "PropTypes was React's runtime prop type-checker. You declared expected types, and React would warn in the console when a mismatch occurred in development. PropTypes is deprecated as of React 19 and no longer ships from the react package. Use TypeScript instead; it catches the same mismatches at compile time and integrates with editor tooling.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the role of PropTypes in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the role of PropTypes in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the role of PropTypes in React?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-what-are-the-recommended-ways-for-type-checking-of-reac",
    title: "What are the recommended ways for type checking of React component props?",
    prompt: "What are the recommended ways for type checking of React component props?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "type MyComponentProps = {  name: string;  age: number;};\nfunction MyComponent({ name, age }: MyComponentProps) {  return (    <div>      {name} is {age} years old    </div>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use TypeScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Use TypeScript. It catches prop mismatches at compile time, integrates with editor tooling (autocomplete, refactors, jump-to-definition), and is the default in most React project templates. The older alternative was PropTypes, a runtime checker that warned in dev mode when prop types didn't match. It is deprecated as of React 19 and no longer ships from the react package. If you're maintaining a codebase that still uses prop-types, migrate to TypeScript.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the recommended ways for type checking of React component props?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the recommended ways for type checking of React component props?.",
    hints: [
      "Consider the core principles and trade-offs of What are the recommended ways for type checking of React component props?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-how-react-router-is-different-from-the-history-library",
    title: "How React Router is different from the history library?",
    prompt: "How React Router is different from the history library?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "rendering-keys",
    tags: [
      "typescript",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Router is a routing library for React that provides a declarative API for defining routes and handling navigation.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router is a routing library for React that provides a declarative API for defining routes and handling navigation. It manages components and URLs. History library is a lower-level utility that only manages browser history (e.g., pushing and popping history entries). It doesn't handle UI rendering or routing, making it more generic and not React-specific. React Router uses the history library internally but adds additional features like routing and component management.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How React Router is different from the history library?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How React Router is different from the history library?.",
    hints: [
      "Consider the core principles and trade-offs of How React Router is different from the history library?."
    ],
    source: "100-react",
    estimatedMinutes: 3
  },
  {
    id: "system_design-how-does-the-new-form-action-prop-work-in-react-19",
    title: "How does the new form action prop work in React 19?",
    prompt: "How does the new form action prop work in React 19?",
    level: "senior",
    type: "concept",
    category: "system_design",
    subject: "types",
    tags: [
      "system_design",
      "types",
      "senior"
    ],
    codeSnippet: "import { useFormStatus } from 'react-dom';\nfunction SubmitButton() {  const { pending } = useFormStatus();  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;}\nfunction ProfileForm() {  async function save(formData) {    await updateProfile(Object.fromEntries(formData));  }  return (    <form action={save}>      <input name=\"name\" />      <SubmitButton />    </form>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React 19 lets you pass a function directly to <form action> (and <button formAction>).",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React 19 lets you pass a function directly to <form action> (and <button formAction>). React calls the function with a FormData argument when the form is submitted, runs it inside a transition, and resets uncontrolled inputs on success. Combine it with useActionState or useFormStatus for pending state and error handling without manual onSubmit plumbing. Conclusion These 100+ questions should give you a good idea on what to expect in React interviews. If you're looking for more in-depth React interview preparation materials, check out these: React Interview Playbook Practice React coding interview questions Practice React quiz interview questions You can also explore the Top ReactJS Interview Questions repo - a collection of 50 commonly asked questions compiled from real interview experiences. Related articles 30 Basic to Advanced React Interview Questions with SolutionsJul 1, 2025Tags+ 1 more30 React interview questions and solutions, covering basic to advanced topics. Ideal for developers preparing for their next job interview in 2025 Footer Subscribe to our newsletterEmailNotify me Practice Get started JavaScript functions User interface coding System design Quiz Guides Front End Interview Playbook Front End System Design Playbook React Interview Playbook Behavioral Interview Playbook Study Plans 1 Week Plan 1 Month Plan 3 Months Plan Company Pricing Promotions Roadmap About Team Contact us Become an affiliate Careers Blog Medium DEV Community",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does the new form action prop work in React 19?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does the new form action prop work in React 19?.",
    hints: [
      "Consider the core principles and trade-offs of How does the new form action prop work in React 19?."
    ],
    source: "100-react",
    estimatedMinutes: 4
  },
  {
    id: "react-what-is-react-material-ui",
    title: "What is React-Material UI?",
    prompt: "What is React-Material UI?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Material UI is an open-source UI component library for React that implements Material Design.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Material UI is an open-source UI component library for React that implements Material Design. It provides styled, accessible components and speeds up building consistent interfaces.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React-Material UI?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React-Material UI?.",
    hints: [
      "Consider the core principles and trade-offs of What is React-Material UI?."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-what-is-reconciliation-in-react",
    title: "What is Reconciliation in React?",
    prompt: "What is Reconciliation in React?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "rendering-keys",
    tags: [
      "typescript",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reconciliation is React\ufffd\ufffd\ufffds process for updating the DOM when state or props change.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Reconciliation is React\ufffd\ufffd\ufffds process for updating the DOM when state or props change. React diffs the old and new Virtual DOM trees, computes the minimal updates, and applies them to the real DOM. The Fiber algorithm lets React pause and prioritize parts of this work so complex apps remain responsive. Related Reading Vibe Coding Leetcode Blind 75 C# Interview Questions Leetcode 75 Jenkins Interview Questions Leetcode Patterns Java Interview Questions And Answers Kubernetes Interview Questions AWS Interview Questions Angular Interview Questions SQL Server Interview Questions AngularJS Interview Questions Vibe Coding Leetcode Blind 75 C# Interview Questions Jenkins Interview Questions React Interview Questions Leetcode Patterns Java Interview Questions And Answers Kubernetes Interview Questions AWS Interview Questions Angular Interview Questions SQL Server Interview Questions AngularJS Interview Questions TypeScript Interview Questions Azure Interview Questions 20 More React Interview Questions and Answers For Freshers",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Reconciliation in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Reconciliation in React?.",
    hints: [
      "Consider the core principles and trade-offs of What is Reconciliation in React?."
    ],
    source: "150-react",
    estimatedMinutes: 4
  },
  {
    id: "typescript-props-data-in-one-way-flow",
    title: "Props: Data In, One-Way Flow",
    prompt: "Props: Data In, One-Way Flow \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Props are read-only inputs passed from parent to child.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Props are read-only inputs passed from parent to child. They let you parameterize components and compose UI. A child must not modify its props directly. Pass callbacks if a child needs to request changes to the parent state. Example: <Profile name=\"Ava\" onChange={newName => setName(newName)} />Tips: Use prop types or TypeScript to document and validate prop shapes. Prefer passing minimal necessary data and callbacks to avoid excessive prop drilling.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Props: Data In, One-Way Flow.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Props: Data In, One-Way Flow.",
    hints: [
      "Consider the core principles and trade-offs of Props: Data In, One-Way Flow."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-build-a-page-switcher-mapping-props-to-components-clean",
    title: "Build a Page Switcher \ufffd\ufffd\ufffd Mapping Props to Components Cleanly",
    prompt: "Build a Page Switcher \ufffd\ufffd\ufffd Mapping Props to Components Cleanly \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Implement a switcher via a mapping object, dynamic import for code splitting, and type checks for safety.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Implement a switcher via a mapping object, dynamic import for code splitting, and type checks for safety. Use lazy and Suspense if pages are large. Basic pattern: const PAGES = { home: Home, about: About, contact: Contact };function Page({ page, ...props }) { const Comp = PAGES[page] || NotFound; return <Comp {...props} />;} Code-split version: const Home = React.lazy(() => import('./Home'));return ( <Suspense fallback={<Spinner />}> <Page page={page} /> </Suspense>); Best practices: Validate page prop with PropTypes or TypeScript union types. Favor route-driven switching (react-router) for navigable pages. Keep the page registry centralized for analytics and permissions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Build a Page Switcher \ufffd\ufffd\ufffd Mapping Props to Components Cleanly.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Build a Page Switcher \ufffd\ufffd\ufffd Mapping Props to Components Cleanly.",
    hints: [
      "Consider the core principles and trade-offs of Build a Page Switcher \ufffd\ufffd\ufffd Mapping Props to Components Cleanly."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-static-typing-with-hooks-typescript-patterns-and-exampl",
    title: "Static Typing with Hooks \ufffd\ufffd\ufffd TypeScript Patterns and Examples",
    prompt: "Static Typing with Hooks \ufffd\ufffd\ufffd TypeScript Patterns and Examples \u2014 explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "hooks",
    tags: [
      "typescript",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks work well with TypeScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Hooks work well with TypeScript. Type component props, state generics, dispatch signatures, and refs. Examples: const [count, setCount] = useState<number>(0);type Action = { type: 'inc' } | { type: 'dec' };const [state, dispatch] = useReducer((s: number, a: Action) => ..., 0); Typing refs: const inputRef = useRef<HTMLInputElement | null>(null);",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Static Typing with Hooks \ufffd\ufffd\ufffd TypeScript Patterns and Examples.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Static Typing with Hooks \ufffd\ufffd\ufffd TypeScript Patterns and Examples.",
    hints: [
      "Consider the core principles and trade-offs of Static Typing with Hooks \ufffd\ufffd\ufffd TypeScript Patterns and Examples."
    ],
    source: "150-react",
    estimatedMinutes: 3
  },
  {
    id: "typescript-what-are-the-recommended-ways-for-static-type-checking",
    title: "What are the recommended ways for static type checking?",
    prompt: "What are the recommended ways for static type checking?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Normally we use PropTypes library (React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Normally we use PropTypes library (React.PropTypes moved to a prop-types package since React v15.5) for type checking in the React applications. For large code bases, it is recommended to use static type checkers such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the recommended ways for static type checking?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the recommended ways for static type checking?.",
    hints: [
      "Consider the core principles and trade-offs of What are the recommended ways for static type checking?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "performance-how-to-enable-production-mode-in-react",
    title: "How to enable production mode in React?",
    prompt: "How to enable production mode in React?",
    level: "junior",
    type: "concept",
    category: "performance",
    subject: "types",
    tags: [
      "performance",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You should use Webpack's DefinePlugin method to set NODE_ENV to production, by which it strip out things like propType validation and extra warnings.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You should use Webpack's DefinePlugin method to set NODE_ENV to production, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify's dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to enable production mode in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to enable production mode in React?.",
    hints: [
      "Consider the core principles and trade-offs of How to enable production mode in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-pointer-events-supported-in-react",
    title: "What are the Pointer Events supported in React?",
    prompt: "What are the Pointer Events supported in React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Pointer Events provide a unified way of handling all input events.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Pointer Events provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don't correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the Pointer Events specification. The following event types are now available in React DOM: onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the Pointer Events supported in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the Pointer Events supported in React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the Pointer Events supported in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "javascript-how-to-loop-inside-jsx",
    title: "How to loop inside JSX?",
    prompt: "How to loop inside JSX?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "types",
      "junior"
    ],
    codeSnippet: "<tbody>\n  {items.map((item) => (\n    <SomeComponent key={item.id} name={item.name} />\n  ))}\n</tbody>\n\n<tbody>\nfor (let i = 0; i < items.length; i++) {\n  <SomeComponent key={items[i].id} name={items[i].name} />\n}\n</tbody>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You can simply use Array.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can simply use Array.prototype.map with ES6 arrow function syntax. For example, the items array of objects is mapped into an array of components: But you can't iterate using for loop: This is because JSX tags are transpiled into function calls, and you can't use statements inside expressions. This may change thanks to do expressions which are stage 1 proposal. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to loop inside JSX?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to loop inside JSX?.",
    hints: [
      "Consider the core principles and trade-offs of How to loop inside JSX?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-react-proptype-array-with-shape",
    title: "What is React proptype array with shape?",
    prompt: "What is React proptype array with shape?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "ReactComponent.propTypes = {\n  arrayWithShape: React.PropTypes.arrayOf(\n    React.PropTypes.shape({\n      color: React.PropTypes.string.isRequired,\n      fontSize: React.PropTypes.number.isRequired,\n    }),\n  ).isRequired,\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "If you want to pass an array of objects to a component with a particular shape then use React.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "If you want to pass an array of objects to a component with a particular shape then use React.PropTypes.shape() as an argument to React.PropTypes.arrayOf(). \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React proptype array with shape?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React proptype array with shape?.",
    hints: [
      "Consider the core principles and trade-offs of What is React proptype array with shape?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "javascript-what-are-the-approaches-to-include-polyfills-in-your-cr",
    title: "What are the approaches to include polyfills in your create-react-app?",
    prompt: "What are the approaches to include polyfills in your create-react-app?",
    level: "junior",
    type: "concept",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "types",
      "junior"
    ],
    codeSnippet: "import 'core-js/fn/array/find';\n   import 'core-js/fn/array/includes';\n   import 'core-js/fn/number/is-nan';\n\n<script src=\"https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes\"></script>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "There are approaches to include polyfills in create-react-app, Manual import from core-js: Create a file called (something like) polyfills.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "There are approaches to include polyfills in create-react-app, Manual import from core-js: Create a file called (something like) polyfills.js and import it into root index.js file. Run npm install core-js or yarn add core-js and import your specific required features. Using Polyfill service: Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to index.html: In the above script we had to explicitly request the Array.prototype.includes feature as it is not included in the default feature set. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the approaches to include polyfills in your create-react-app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the approaches to include polyfills in your create-react-app?.",
    hints: [
      "Consider the core principles and trade-offs of What are the approaches to include polyfills in your create-react-app?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-common-folder-structures-for-react",
    title: "What are the common folder structures for React?",
    prompt: "What are the common folder structures for React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "common/\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Avatar.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Avatar.css\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd APIUtils.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd APIUtils.test.js\n   feed/\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd index.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Feed.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Feed.css\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd FeedStory.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd FeedStory.test.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd FeedAPI.js\n   profile/\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd index.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Profile.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileHeader.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileHeader.css\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileAPI.js\n\napi/\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd APIUtils.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd APIUtils.test.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileAPI.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd UserAPI.js\n   components/\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Avatar.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Avatar.css\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Feed.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Feed.css\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd FeedStory.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd FeedStory.test.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Profile.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileHeader.js\n   \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ProfileHeader.css",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There are two common practices for React project file structure.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "There are two common practices for React project file structure. Grouping by features or routes: One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route. Grouping by file type: Another popular way to structure projects is to group similar files together. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the common folder structures for React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the common folder structures for React?.",
    hints: [
      "Consider the core principles and trade-offs of What are the common folder structures for React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-are-the-downsides-of-redux-compared-to-flux",
    title: "What are the downsides of Redux compared to Flux?",
    prompt: "What are the downsides of Redux compared to Flux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Instead of saying downsides we can say that there are few compromises of using Redux over Flux.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Instead of saying downsides we can say that there are few compromises of using Redux over Flux. Those are as follows: You will need to learn to avoid mutations: Flux is un-opinionated about mutating data, but Redux doesn't like mutations and many packages complementary to Redux assume you never mutate the state. You can enforce this with dev-only packages like redux-immutable-state-invariant, Immutable.js, or instructing your team to write non-mutating code. You're going to have to carefully pick your packages: While Flux explicitly doesn't try to solve problems such as undo/redo, persistence, or forms, Redux has extension points such as middleware and store enhancers, and it has spawned a rich ecosystem. There is no nice Flow integration yet: Flux currently lets you do very impressive static type checks which Redux doesn't support yet. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the downsides of Redux compared to Flux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the downsides of Redux compared to Flux?.",
    hints: [
      "Consider the core principles and trade-offs of What are the downsides of Redux compared to Flux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-an-action-in-redux",
    title: "What is an action in Redux?",
    prompt: "What is an action in Redux?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "{\n  type: ADD_TODO,\n  text: 'Add todo item'\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Actions are plain JavaScript objects or payloads of information that send data from your application to your store.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Actions are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed. For example, let's take an action which represents adding a new todo item: \ufffd\ufffd\ufffd Back to Top React Native \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is an action in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is an action in Redux?.",
    hints: [
      "Consider the core principles and trade-offs of What is an action in Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-difference-between-react-native-and-react",
    title: "What is the difference between React Native and React?",
    prompt: "What is the difference between React Native and React?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications. React Native is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React Native and React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React Native and React?.",
    hints: [
      "Consider the core principles and trade-offs of What is the difference between React Native and React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-flow",
    title: "What is Flow?",
    prompt: "What is Flow?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Flow is a static type checker designed to find type errors in JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Flow is a static type checker designed to find type errors in JavaScript. Flow types can express much more fine-grained distinctions than traditional type systems. For example, Flow helps you catch errors involving null, unlike most type systems. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Flow?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Flow?.",
    hints: [
      "Consider the core principles and trade-offs of What is Flow?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-how-to-use-typescript-in-create-react-app-application",
    title: "How to use TypeScript in create-react-app application?",
    prompt: "How to use TypeScript in create-react-app application?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeSnippet: "npx create-react-app my-app --typescript\n\n# or\n\nyarn create react-app my-app --typescript\n\nmy-app/\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd .gitignore\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd images.d.ts\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd node_modules/\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd public/\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd src/\n\ufffd\ufffd\ufffd  \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd ...\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd package.json\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd tsconfig.json\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd tsconfig.prod.json\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd tsconfig.test.json\n\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd tslint.json",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Starting from react-scripts@2.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Starting from react-scripts@2.1.0 or higher, there is a built-in support for typescript. i.e, create-react-app now supports typescript natively. You can just pass --typescript option as below But for lower versions of react scripts, just supply --scripts-version option as react-scripts-ts while you create a new project. react-scripts-ts is a set of adjustments to take the standard create-react-app project pipeline and bring TypeScript into the mix. Now the project layout should look like the following: Miscellaneous \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to use TypeScript in create-react-app application?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to use TypeScript in create-react-app application?.",
    hints: [
      "Consider the core principles and trade-offs of How to use TypeScript in create-react-app application?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-react-proptypes-allow-different-types-for-one-prop",
    title: "How React PropTypes allow different types for one prop?",
    prompt: "How React PropTypes allow different types for one prop?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "Component.PropTypes = {\n  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You can use oneOfType() method of PropTypes.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use oneOfType() method of PropTypes. For example, the height property can be defined with either string or number type as below: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How React PropTypes allow different types for one prop?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How React PropTypes allow different types for one prop?.",
    hints: [
      "Consider the core principles and trade-offs of How React PropTypes allow different types for one prop?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-what-is-the-proper-placement-for-error-boundaries",
    title: "What is the proper placement for error boundaries?",
    prompt: "What is the proper placement for error boundaries?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The granularity of error boundaries usage is up to the developer based on project needs.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The granularity of error boundaries usage is up to the developer based on project needs. You can follow either of these approaches, You can wrap top-level route components to display a generic error message for the entire application. You can also wrap individual components in an error boundary to protect them from crashing the rest of the application. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the proper placement for error boundaries?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the proper placement for error boundaries?.",
    hints: [
      "Consider the core principles and trade-offs of What is the proper placement for error boundaries?."
    ],
    source: "300-react",
    estimatedMinutes: 3
  },
  {
    id: "react-why-do-you-need-additional-care-for-component-libraries",
    title: "Why do you need additional care for component libraries while using forward refs?",
    prompt: "Why do you need additional care for component libraries while using forward refs?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why do you need additional care for component libraries while using forward refs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why do you need additional care for component libraries while using forward refs?.",
    hints: [
      "Consider the core principles and trade-offs of Why do you need additional care for component libraries while using forward refs?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-what-are-the-features-of-create-react-app",
    title: "What are the features of create react app?",
    prompt: "What are the features of create react app?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Below are the list of some of the features provided by create react app.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Below are the list of some of the features provided by create react app. React, JSX, ES6, Typescript and Flow syntax support. Autoprefixed CSS CSS Reset/Normalize A live development server A fast interactive unit test runner with built-in support for coverage reporting A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the features of create react app?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the features of create react app?.",
    hints: [
      "Consider the core principles and trade-offs of What are the features of create react app?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "typescript-how-do-you-build-a-form-library-with-validation-from-sc",
    title: "How do you build a form library with validation from scratch? n   Answer Forms are complex: validation, error display, async validation, nested fields, arrays, submission. Form libraries to know: React Hook Form \\227 most performant \\(uncontrolled\\), small bundle Formik \\227 popular, controlled inputs Zod \\227 schema validation, TypeScript-first Form architecture: Validation schema \\227 define rules once \\(Zod\\) Reusable form fields \\227 abstract Input, Select, Checkbox Error messages \\227 show at field level, summary at top Async validation \\227 check email uniqueness on server Dynamic fields \\227 add/remove array items React Hook Form performance: Uncontrolled inputs \\227 no re-render on every keystroke Re-renders only on submit or validation 10x fewer renders than Formik for large forms  1 import   {   useForm ,   useFieldArray   }   from   'react-hook-form'  2 import   {   zodResolver   }   from   '@hookform/resolvers/zod'  3 import   {   z   }   from   'zod'  4  5 // Zod schema \\227 single source of truth for validation  6 const   schema   =   z . object \\( {  7     name :     z . string \\( \\) . min \\( 2 ,   'Name must be at least 2 characters' \\) ,  8     email :   z . string \\( \\) . email \\( 'Invalid email' \\) ,  9     age :       z . number \\( \\) . min \\( 18 ,   'Must be 18+' \\) . max \\( 120 \\) , 10     skills :   z . array \\( z . string \\( \\) \\) . min \\( 1 ,   'Add at least one skill' \\) , 11     password :   z . string \\( \\) . min \\( 8 \\) , 12     confirm :   z . string \\( \\) 13 } \\) . refine \\( d   = >   d . password   = = =   d . confirm ,   { 14     message :   'Passwords do not match' , 15     path :   [ 'confirm' ] 16 } \\) 17 18 const   RegisterForm   =   \\( \\)   = >   { 19     const   {   register ,   control ,   handleSubmit ,   formState :   {   errors ,   isSubmitting   }   }   = 20         useForm \\( {   resolver :   zodResolver \\( schema \\)   } \\) 21 22     // Dynamic skills array 23     const   {   fields ,   append ,   remove   }   =   useFieldArray \\( {   control ,   name :   'skills'   } \\) 24 25     const   onSubmit   =   async   \\( data \\)   = >   { 26         await   api . register \\( data \\)     // isSubmitting = true during this 27         navigate \\( '/dashboard' \\) 28     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 27/42",
    prompt: "How do you build a form library with validation from scratch? n   Answer Forms are complex: validation, error display, async validation, nested fields, arrays, submission. Form libraries to know: React Hook Form \\227 most performant \\(uncontrolled\\), small bundle Formik \\227 popular, controlled inputs Zod \\227 schema validation, TypeScript-first Form architecture: Validation schema \\227 define rules once \\(Zod\\) Reusable form fields \\227 abstract Input, Select, Checkbox Error messages \\227 show at field level, summary at top Async validation \\227 check email uniqueness on server Dynamic fields \\227 add/remove array items React Hook Form performance: Uncontrolled inputs \\227 no re-render on every keystroke Re-renders only on submit or validation 10x fewer renders than Formik for large forms  1 import   {   useForm ,   useFieldArray   }   from   'react-hook-form'  2 import   {   zodResolver   }   from   '@hookform/resolvers/zod'  3 import   {   z   }   from   'zod'  4  5 // Zod schema \\227 single source of truth for validation  6 const   schema   =   z . object \\( {  7     name :     z . string \\( \\) . min \\( 2 ,   'Name must be at least 2 characters' \\) ,  8     email :   z . string \\( \\) . email \\( 'Invalid email' \\) ,  9     age :       z . number \\( \\) . min \\( 18 ,   'Must be 18+' \\) . max \\( 120 \\) , 10     skills :   z . array \\( z . string \\( \\) \\) . min \\( 1 ,   'Add at least one skill' \\) , 11     password :   z . string \\( \\) . min \\( 8 \\) , 12     confirm :   z . string \\( \\) 13 } \\) . refine \\( d   = >   d . password   = = =   d . confirm ,   { 14     message :   'Passwords do not match' , 15     path :   [ 'confirm' ] 16 } \\) 17 18 const   RegisterForm   =   \\( \\)   = >   { 19     const   {   register ,   control ,   handleSubmit ,   formState :   {   errors ,   isSubmitting   }   }   = 20         useForm \\( {   resolver :   zodResolver \\( schema \\)   } \\) 21 22     // Dynamic skills array 23     const   {   fields ,   append ,   remove   }   =   useFieldArray \\( {   control ,   name :   'skills'   } \\) 24 25     const   onSubmit   =   async   \\( data \\)   = >   { 26         await   api . register \\( data \\)     // isSubmitting = true during this 27         navigate \\( '/dashboard' \\) 28     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 27/42",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "hooks",
    tags: [
      "typescript",
      "hooks",
      "senior",
      "hooks",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "29 30 return ( 31 < form onSubmit = { handleSubmit ( onSubmit ) } > 32 < Input label = 'Name' {.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "29 30 return ( 31 < form onSubmit = { handleSubmit ( onSubmit ) } > 32 < Input label = 'Name' { . . . register ( 'name' ) } error = { errors . name ? . message } / > 33 < Input label = 'Email' type = 'email' { . . . register ( 'email' ) } error = { errors . email ? . message } / > 34 { / * Dynamic skill fields * / } 35 { fields . map ( ( f , i ) = > ( 36 < div key = { f . id } > 37 < Input { . . . register ( `skills.${i}` ) } / > 38 < button type = 'button' onClick = { ( ) = > remove ( i ) } > Remove < / button > 39 < / div > 40 ) ) } 41 < button type = 'button' onClick = { ( ) = > append ( '' ) } > + Add Skill < / button > 42 < button type = 'submit' disabled = { isSubmitting } > 43 { isSubmitting ? 'Saving...' : 'Register' } 44 < / button > 45 < / form > 46 ) 47 } n Interview Tip: React Hook Form with Zod is the best combination in 2025. Zod schema defines your TypeScript types AND validation rules \\227 one source of truth. React Hook Form's uncontrolled approach means no re-renders on keystroke, making complex forms with 50+ fields perfectly smooth. Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn Frontend System Design | Comment 'FSD' for full PDF | Save \\267 Share \\267 Repost 27/42 nn FE Design",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you build a form library with validation from scratch? n   Answer Forms are complex: validation, error display, async validation, nested fields, arrays, submission. Form libraries to know: React Hook Form \\227 most performant \\(uncontrolled\\), small bundle Formik \\227 popular, controlled inputs Zod \\227 schema validation, TypeScript-first Form architecture: Validation schema \\227 define rules once \\(Zod\\) Reusable form fields \\227 abstract Input, Select, Checkbox Error messages \\227 show at field level, summary at top Async validation \\227 check email uniqueness on server Dynamic fields \\227 add/remove array items React Hook Form performance: Uncontrolled inputs \\227 no re-render on every keystroke Re-renders only on submit or validation 10x fewer renders than Formik for large forms  1 import   {   useForm ,   useFieldArray   }   from   'react-hook-form'  2 import   {   zodResolver   }   from   '@hookform/resolvers/zod'  3 import   {   z   }   from   'zod'  4  5 // Zod schema \\227 single source of truth for validation  6 const   schema   =   z . object \\( {  7     name :     z . string \\( \\) . min \\( 2 ,   'Name must be at least 2 characters' \\) ,  8     email :   z . string \\( \\) . email \\( 'Invalid email' \\) ,  9     age :       z . number \\( \\) . min \\( 18 ,   'Must be 18+' \\) . max \\( 120 \\) , 10     skills :   z . array \\( z . string \\( \\) \\) . min \\( 1 ,   'Add at least one skill' \\) , 11     password :   z . string \\( \\) . min \\( 8 \\) , 12     confirm :   z . string \\( \\) 13 } \\) . refine \\( d   = >   d . password   = = =   d . confirm ,   { 14     message :   'Passwords do not match' , 15     path :   [ 'confirm' ] 16 } \\) 17 18 const   RegisterForm   =   \\( \\)   = >   { 19     const   {   register ,   control ,   handleSubmit ,   formState :   {   errors ,   isSubmitting   }   }   = 20         useForm \\( {   resolver :   zodResolver \\( schema \\)   } \\) 21 22     // Dynamic skills array 23     const   {   fields ,   append ,   remove   }   =   useFieldArray \\( {   control ,   name :   'skills'   } \\) 24 25     const   onSubmit   =   async   \\( data \\)   = >   { 26         await   api . register \\( data \\)     // isSubmitting = true during this 27         navigate \\( '/dashboard' \\) 28     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 27/42.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you build a form library with validation from scratch? n   Answer Forms are complex: validation, error display, async validation, nested fields, arrays, submission. Form libraries to know: React Hook Form \\227 most performant \\(uncontrolled\\), small bundle Formik \\227 popular, controlled inputs Zod \\227 schema validation, TypeScript-first Form architecture: Validation schema \\227 define rules once \\(Zod\\) Reusable form fields \\227 abstract Input, Select, Checkbox Error messages \\227 show at field level, summary at top Async validation \\227 check email uniqueness on server Dynamic fields \\227 add/remove array items React Hook Form performance: Uncontrolled inputs \\227 no re-render on every keystroke Re-renders only on submit or validation 10x fewer renders than Formik for large forms  1 import   {   useForm ,   useFieldArray   }   from   'react-hook-form'  2 import   {   zodResolver   }   from   '@hookform/resolvers/zod'  3 import   {   z   }   from   'zod'  4  5 // Zod schema \\227 single source of truth for validation  6 const   schema   =   z . object \\( {  7     name :     z . string \\( \\) . min \\( 2 ,   'Name must be at least 2 characters' \\) ,  8     email :   z . string \\( \\) . email \\( 'Invalid email' \\) ,  9     age :       z . number \\( \\) . min \\( 18 ,   'Must be 18+' \\) . max \\( 120 \\) , 10     skills :   z . array \\( z . string \\( \\) \\) . min \\( 1 ,   'Add at least one skill' \\) , 11     password :   z . string \\( \\) . min \\( 8 \\) , 12     confirm :   z . string \\( \\) 13 } \\) . refine \\( d   = >   d . password   = = =   d . confirm ,   { 14     message :   'Passwords do not match' , 15     path :   [ 'confirm' ] 16 } \\) 17 18 const   RegisterForm   =   \\( \\)   = >   { 19     const   {   register ,   control ,   handleSubmit ,   formState :   {   errors ,   isSubmitting   }   }   = 20         useForm \\( {   resolver :   zodResolver \\( schema \\)   } \\) 21 22     // Dynamic skills array 23     const   {   fields ,   append ,   remove   }   =   useFieldArray \\( {   control ,   name :   'skills'   } \\) 24 25     const   onSubmit   =   async   \\( data \\)   = >   { 26         await   api . register \\( data \\)     // isSubmitting = true during this 27         navigate \\( '/dashboard' \\) 28     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 27/42.",
    hints: [
      "Consider the core principles and trade-offs of How do you build a form library with validation from scratch? n   Answer Forms are complex: validation, error display, async validation, nested fields, arrays, submission. Form libraries to know: React Hook Form \\227 most performant \\(uncontrolled\\), small bundle Formik \\227 popular, controlled inputs Zod \\227 schema validation, TypeScript-first Form architecture: Validation schema \\227 define rules once \\(Zod\\) Reusable form fields \\227 abstract Input, Select, Checkbox Error messages \\227 show at field level, summary at top Async validation \\227 check email uniqueness on server Dynamic fields \\227 add/remove array items React Hook Form performance: Uncontrolled inputs \\227 no re-render on every keystroke Re-renders only on submit or validation 10x fewer renders than Formik for large forms  1 import   {   useForm ,   useFieldArray   }   from   'react-hook-form'  2 import   {   zodResolver   }   from   '@hookform/resolvers/zod'  3 import   {   z   }   from   'zod'  4  5 // Zod schema \\227 single source of truth for validation  6 const   schema   =   z . object \\( {  7     name :     z . string \\( \\) . min \\( 2 ,   'Name must be at least 2 characters' \\) ,  8     email :   z . string \\( \\) . email \\( 'Invalid email' \\) ,  9     age :       z . number \\( \\) . min \\( 18 ,   'Must be 18+' \\) . max \\( 120 \\) , 10     skills :   z . array \\( z . string \\( \\) \\) . min \\( 1 ,   'Add at least one skill' \\) , 11     password :   z . string \\( \\) . min \\( 8 \\) , 12     confirm :   z . string \\( \\) 13 } \\) . refine \\( d   = >   d . password   = = =   d . confirm ,   { 14     message :   'Passwords do not match' , 15     path :   [ 'confirm' ] 16 } \\) 17 18 const   RegisterForm   =   \\( \\)   = >   { 19     const   {   register ,   control ,   handleSubmit ,   formState :   {   errors ,   isSubmitting   }   }   = 20         useForm \\( {   resolver :   zodResolver \\( schema \\)   } \\) 21 22     // Dynamic skills array 23     const   {   fields ,   append ,   remove   }   =   useFieldArray \\( {   control ,   name :   'skills'   } \\) 24 25     const   onSubmit   =   async   \\( data \\)   = >   { 26         await   api . register \\( data \\)     // isSubmitting = true during this 27         navigate \\( '/dashboard' \\) 28     } Kaushal Singh Follow for Frontend \\267 System Design \\267 Interview Prep nn  Frontend System Design  |  Comment 'FSD' for full PDF  |  Save \\267 Share \\267 Repost 27/42."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4
  },
  {
    id: "typescript-ambient-declaration-global-constant",
    title: "Declaring a global constant that survives being included twice",
    prompt: "You need a globally accessible constant in a .d.ts-style setup where the same file may be processed more than once. Which declaration is correct?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "declarations",
      "ambient",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "export const API_VERSION: string = '1.0';",
        isCorrect: false,
        explanation: "export creates a module-scoped binding. It is not global \u2014 consumers must import it."
      },
      {
        id: "B",
        text: "globalThis.API_VERSION = '1.0';",
        isCorrect: false,
        explanation: "This is a runtime assignment only. It gives you no compile-time type, no declaration merging, and no checking."
      },
      {
        id: "C",
        text: "declare const API_VERSION: string;",
        isCorrect: true,
        explanation: "Correct. An ambient declaration asserts the symbol exists at runtime without emitting any JavaScript, so processing the file twice cannot produce a duplicate definition."
      },
      {
        id: "D",
        text: "const API_VERSION: string = '1.0';",
        isCorrect: false,
        explanation: "A plain const emits code. If the file is concatenated or included twice you get a redeclaration error."
      }
    ],
    correctAnswer: "C",
    explanation: "declare const introduces an ambient declaration: it tells the compiler a symbol exists at runtime without emitting any JavaScript for it. That is what makes it safe when the same file is processed more than once, as with legacy --outFile builds or script concatenation. A plain const emits code and can collide; export const is module-scoped rather than global; assigning to globalThis is a runtime-only trick with no type safety.",
    interviewLine: "declare says 'this exists, trust me' \u2014 it types a symbol without emitting it, which is exactly what a global constant in a declaration file needs.",
    misconception: "Assuming declare and const are interchangeable. declare emits nothing; const emits a binding, and a binding declared twice is an error.",
    hints: [
      "Which of these produces no JavaScript output at all?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-as-const-literal-widening",
    title: "What as const does to inferred literal types",
    prompt: "What is the inferred type of config?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "as-const",
      "literal-types",
      "senior"
    ],
    codeSnippet: "const config = { apiUrl: 'https://api.example.com', timeout: 5000 } as const;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "{ apiUrl: string; timeout: number }",
        isCorrect: false,
        explanation: "That is the type you get WITHOUT as const \u2014 TypeScript widens the literals to their base types."
      },
      {
        id: "B",
        text: "{ readonly apiUrl: 'https://api.example.com'; readonly timeout: 5000 }",
        isCorrect: true,
        explanation: "Correct. as const narrows each value to its literal type and marks every property readonly."
      },
      {
        id: "C",
        text: "{ readonly apiUrl: string; readonly timeout: number }",
        isCorrect: false,
        explanation: "as const does add readonly, but it also prevents the literal widening \u2014 the values keep their exact types."
      },
      {
        id: "D",
        text: "Readonly<Record<string, string | number>>",
        isCorrect: false,
        explanation: "as const preserves the exact keys and exact literal values; it does not collapse them into an index signature."
      }
    ],
    correctAnswer: "B",
    explanation: "as const does two things at once: it stops literal widening, so 'https://api.example.com' stays that exact string literal type rather than widening to string, and it marks every property readonly. Without it TypeScript infers { apiUrl: string; timeout: number }. The narrow literal types are what make exhaustive checks and discriminated unions work off a plain object.",
    interviewLine: "as const freezes both the value and the type \u2014 readonly properties and literal types instead of widened ones.",
    misconception: "Thinking as const only adds readonly. The bigger effect is that it stops literal widening.",
    hints: [
      "It changes two things about every property: mutability and how precise the type is."
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-type-predicate-vs-boolean",
    title: "Why a boolean return type does not narrow",
    prompt: "Both functions have identical runtime behaviour. Why does only isString2 narrow value inside the if?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "type-guards",
      "narrowing",
      "senior"
    ],
    codeSnippet: "function isString1(val: unknown): boolean {\n  return typeof val === 'string';\n}\n\nfunction isString2(val: unknown): val is string {\n  return typeof val === 'string';\n}\n\nfunction process(value: string | number) {\n  if (isString1(value)) {\n    value.toUpperCase(); // error\n  }\n  if (isString2(value)) {\n    value.toUpperCase(); // ok\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "isString2 is generic, so the compiler can infer the argument type",
        isCorrect: false,
        explanation: "Neither function is generic. The difference is entirely in the declared return type."
      },
      {
        id: "B",
        text: "isString2 runs at compile time while isString1 runs at runtime",
        isCorrect: false,
        explanation: "Both run only at runtime. Type predicates are erased in the emitted JavaScript."
      },
      {
        id: "C",
        text: "val is string is a type predicate: it tells the compiler what a true return means about the argument",
        isCorrect: true,
        explanation: "Correct. boolean only says 'a boolean came back'. val is string says 'if this is true, val is a string', which control flow analysis can act on."
      },
      {
        id: "D",
        text: "isString1 needs an explicit return type annotation to narrow",
        isCorrect: false,
        explanation: "It has one \u2014 boolean. That is precisely the annotation that throws the information away."
      }
    ],
    correctAnswer: "C",
    explanation: "A predicate return type (val is string) carries information the compiler can use; a plain boolean does not. When isString1 returns true, all TypeScript knows is that some boolean was true \u2014 it cannot connect that to the argument, so value stays string | number. isString2 declares the connection explicitly, so inside the if branch control flow analysis narrows value to string.",
    interviewLine: "boolean loses the information; a type predicate keeps it. The runtime behaviour is identical \u2014 only the compiler can tell the difference.",
    misconception: "Believing the compiler can infer a type guard from the function body. It will not; you must declare the predicate.",
    hints: [
      "What does the compiler actually learn from a function that returns boolean?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-infer-conditional-unwrap",
    title: "How infer captures a type inside a conditional type",
    prompt: "What does UnpackPromise<T> resolve to for each of these two inputs?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "conditional-types",
      "infer",
      "generics",
      "senior"
    ],
    codeSnippet: "type UnpackPromise<T> = T extends Promise<infer U> ? U : T;\n\ntype A = UnpackPromise<Promise<string>>;\ntype B = UnpackPromise<number>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A = Promise<string>, B = number",
        isCorrect: false,
        explanation: "The whole point of infer U is to extract the inner type, not to return the Promise itself."
      },
      {
        id: "B",
        text: "A = string, B = never",
        isCorrect: false,
        explanation: "The false branch is T, not never. B falls through to the original type."
      },
      {
        id: "C",
        text: "A = unknown, B = unknown",
        isCorrect: false,
        explanation: "infer produces a concrete inferred type, not unknown."
      },
      {
        id: "D",
        text: "A = string, B = number",
        isCorrect: true,
        explanation: "Correct. T matches Promise<string> so U is captured as string; number does not match, so the false branch returns T unchanged."
      }
    ],
    correctAnswer: "D",
    explanation: "infer introduces a type variable that TypeScript solves for while checking the extends clause. T extends Promise<infer U> asks 'is T some Promise, and if so what is it a Promise of?' \u2014 binding that answer to U. For Promise<string>, U becomes string and the true branch returns it. For number the check fails and the false branch returns T unchanged. infer is only legal inside the extends clause of a conditional type.",
    interviewLine: "infer is pattern matching for types \u2014 it destructures a type the way you'd destructure a value.",
    misconception: "Trying to use infer outside a conditional type's extends clause; it is only valid there.",
    hints: [
      "What happens on the branch where the extends check fails?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 3
  },
  {
    id: "typescript-never-return-unreachable",
    title: "The return type of a function that always throws",
    prompt: "What return type does TypeScript infer for fail, and what does that buy you at the call site?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "never",
      "control-flow",
      "senior"
    ],
    codeSnippet: "function fail(message: string) {\n  throw new Error(message);\n}\n\nfunction pick(value: string | null) {\n  if (value === null) fail('missing');\n  return value.toUpperCase();\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "never \u2014 so the compiler treats code after the call as unreachable",
        isCorrect: true,
        explanation: "Correct. never means this function does not return, which lets control flow analysis narrow value to string after the guard."
      },
      {
        id: "B",
        text: "void \u2014 the function returns nothing useful",
        isCorrect: false,
        explanation: "void would mean the function can return undefined normally. This one never returns at all, and void would leave the code after the call reachable."
      },
      {
        id: "C",
        text: "unknown \u2014 the compiler cannot tell",
        isCorrect: false,
        explanation: "The compiler can tell precisely: there is no reachable return path."
      },
      {
        id: "D",
        text: "Error \u2014 it is inferred from the thrown value",
        isCorrect: false,
        explanation: "The thrown value's type is unrelated to the return type; throwing is not returning."
      }
    ],
    correctAnswer: "A",
    explanation: "Because fail unconditionally throws and has no reachable return statement, TypeScript infers never. That is the type of a value that cannot exist, and it drives control flow analysis: the compiler treats anything following a never-returning call as unreachable. In pick, that means the null case has already exited, so value is narrowed to string. void would be wrong \u2014 it says the function returns, just without a useful value.",
    interviewLine: "never is the type of 'this never comes back' \u2014 it's what makes assertion helpers and exhaustiveness checks work.",
    misconception: "Reaching for void when you mean never. void returns; never does not.",
    hints: [
      "Is there any path through this function that reaches a return?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-isolated-modules-constraint",
    title: "What --isolatedModules actually enforces",
    prompt: "What constraint does the --isolatedModules compiler option place on each file?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "tsconfig",
      "modules",
      "build",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Every module must be imported at most once across the program",
        isCorrect: false,
        explanation: "It says nothing about how often a module is imported."
      },
      {
        id: "B",
        text: "Circular imports between modules become compile errors",
        isCorrect: false,
        explanation: "Circular imports are unaffected by this flag."
      },
      {
        id: "C",
        text: "Each file is compiled into a separate output bundle",
        isCorrect: false,
        explanation: "It constrains what you may write; it does not change bundling or output layout."
      },
      {
        id: "D",
        text: "Every file must be independently transpilable, without cross-file type information",
        isCorrect: true,
        explanation: "Correct. It is a compatibility guarantee for single-file transpilers such as Babel, SWC and esbuild."
      }
    ],
    correctAnswer: "D",
    explanation: "--isolatedModules guarantees each file can be transpiled on its own, with no knowledge of any other file. That matters because Babel, SWC and esbuild transpile file-by-file and never build a full TypeScript program. It is why re-exporting a type needs export type { T }, why const enum is disallowed, and why every file must actually be a module. Next.js and Vite set it for exactly this reason.",
    interviewLine: "isolatedModules is a promise to single-file transpilers: nothing in this file needs cross-file type information to compile.",
    misconception: "Reading it as a bundling or module-resolution flag. It constrains the syntax you may write, not how output is produced.",
    hints: [
      "Which tools compile one file at a time without type-checking the whole program?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-mapped-type-key-remapping",
    title: "Renaming keys with an as clause in a mapped type",
    prompt: "What is PersonGetters?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "mapped-types",
      "template-literal-types",
      "senior"
    ],
    codeSnippet: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ninterface Person {\n  name: string;\n  age: number;\n}\n\ntype PersonGetters = Getters<Person>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "{ getName: () => string; getAge: () => number }",
        isCorrect: true,
        explanation: "Correct. The as clause remaps each key through a template literal type, and each value becomes a function returning the original property type."
      },
      {
        id: "B",
        text: "{ getName: string; getAge: number }",
        isCorrect: false,
        explanation: "The value type is () => T[K], a function returning the property type, not the property type itself."
      },
      {
        id: "C",
        text: "{ get: (key: keyof Person) => string | number }",
        isCorrect: false,
        explanation: "A mapped type produces one member per key, not a single lookup method."
      },
      {
        id: "D",
        text: "{ name: () => string; age: () => number }",
        isCorrect: false,
        explanation: "That is what you get without the as clause \u2014 the keys would keep their original names."
      }
    ],
    correctAnswer: "A",
    explanation: "Key remapping (TypeScript 4.1+) lets a mapped type rewrite each key via an as clause. Here `get${Capitalize<string & K>}` turns name into getName and age into getAge \u2014 string & K is needed because keyof T can include number and symbol, and template literal types need a string. The value type () => T[K] makes each member a getter returning the original property type.",
    interviewLine: "The as clause in a mapped type renames keys; combine it with template literal types and you can generate whole APIs from a shape.",
    misconception: "Forgetting string & K and hitting an error because keyof T is not assignable to string.",
    hints: [
      "Read the as clause as 'and call this key ... instead'."
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 3
  },
  {
    id: "typescript-template-literal-union-distribution",
    title: "How a template literal type distributes over a union",
    prompt: "What is the parameter type of event?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "template-literal-types",
      "unions",
      "senior"
    ],
    codeSnippet: "type EventType = 'click' | 'focus' | 'blur';\ntype Handler = (event: `on${Capitalize<EventType>}`) => void;\n\nconst handler: Handler = (event) => {\n  console.log(event);\n};",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "'onclick' | 'onfocus' | 'onblur'",
        isCorrect: false,
        explanation: "Capitalize uppercases the first character of each member, so the c, f and b are capitalised."
      },
      {
        id: "B",
        text: "'onClick' | 'onFocus' | 'onBlur'",
        isCorrect: true,
        explanation: "Correct. The template distributes over each union member and Capitalize uppercases the first letter."
      },
      {
        id: "C",
        text: "`on${string}`",
        isCorrect: false,
        explanation: "The union members are known, so the result is a concrete union rather than an open pattern."
      },
      {
        id: "D",
        text: "string",
        isCorrect: false,
        explanation: "Template literal types produce specific string literal types, not the widened string."
      }
    ],
    correctAnswer: "B",
    explanation: "A template literal type distributes over any union it interpolates: each member of EventType is substituted in turn, producing a union of the results. Capitalize is one of TypeScript's built-in intrinsic string types, so 'click' becomes 'Click' and the whole thing becomes 'onClick'. The result is a closed union of three exact string literals, which is what lets the compiler autocomplete and reject typos.",
    interviewLine: "Template literal types distribute over unions \u2014 one input union of three gives you an output union of three.",
    misconception: "Expecting a single widened string. The union is preserved through the template.",
    hints: [
      "What happens to each member of the union separately?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-recursive-deep-readonly",
    title: "Why a deep-readonly type needs a conditional check",
    prompt: "In DeepReadonly, why is the T[K] extends object check necessary?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "recursive-types",
      "mapped-types",
      "senior"
    ],
    codeSnippet: "type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\n\ninterface Config {\n  api: { url: string; timeout: number };\n  features: string[];\n}\n\ntype ReadonlyConfig = DeepReadonly<Config>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It prevents infinite recursion on any input",
        isCorrect: false,
        explanation: "It stops recursion at primitives, but a genuinely cyclic type can still recurse \u2014 TypeScript has its own depth limiter for that."
      },
      {
        id: "B",
        text: "It excludes arrays from being made readonly",
        isCorrect: false,
        explanation: "Arrays are objects, so they take the recursive branch and are made deeply readonly too."
      },
      {
        id: "C",
        text: "It is required syntax for any recursive type alias",
        isCorrect: false,
        explanation: "Recursive type aliases do not require a conditional; this one needs it for correctness, not syntax."
      },
      {
        id: "D",
        text: "It stops the recursion at primitives, which have no properties to map over",
        isCorrect: true,
        explanation: "Correct. Without it the type would try to recurse into string and number, which is meaningless and produces a useless mapped type."
      }
    ],
    correctAnswer: "D",
    explanation: "A mapped type applied to a primitive is not useful \u2014 mapping over keyof string gives you string's method names, not the value. The conditional check makes recursion stop at the leaves: object-shaped properties recurse, primitives are returned as-is. Arrays take the recursive branch because arrays are objects, which is usually what you want.",
    interviewLine: "Recursive mapped types need a base case just like recursive functions \u2014 the conditional is that base case.",
    misconception: "Assuming the conditional is about cycle-breaking. It is about not recursing into primitives.",
    hints: [
      "What would DeepReadonly<string> mean?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 3
  },
  {
    id: "typescript-interface-declaration-merging",
    title: "Declaration merging, and why type aliases cannot do it",
    prompt: "Why does redeclaring Box compile while redeclaring Container is an error?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "declaration-merging",
      "senior"
    ],
    codeSnippet: "interface Box { width: number }\ninterface Box { height: number }\nconst box: Box = { width: 10, height: 20 }; // ok\n\ntype Container = { volume: number };\ntype Container = { weight: number }; // error",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Interfaces merge their declarations into one; a type alias binds a name exactly once",
        isCorrect: true,
        explanation: "Correct. Declaration merging is a feature of interfaces specifically, which is what makes them extensible from other files."
      },
      {
        id: "B",
        text: "Type aliases can only describe primitives and unions",
        isCorrect: false,
        explanation: "Type aliases describe object shapes perfectly well \u2014 they simply cannot be declared twice."
      },
      {
        id: "C",
        text: "Box compiles only because both declarations are in the same file",
        isCorrect: false,
        explanation: "Merging works across files too, which is exactly how ambient library augmentation works."
      },
      {
        id: "D",
        text: "Interfaces are hoisted while type aliases are not",
        isCorrect: false,
        explanation: "Both are erased at runtime and both are usable before their declaration. Hoisting is not the difference."
      }
    ],
    correctAnswer: "A",
    explanation: "Interfaces support declaration merging: multiple declarations of the same interface name combine into one, with properties unioned and identically-named methods becoming overloads. A type alias binds a name to exactly one type, so a second declaration is a redefinition error. Merging is why you augment third-party types by re-declaring their interface, and a good reason to prefer interface for public shapes you expect others to extend.",
    interviewLine: "Interfaces are open \u2014 anyone can reopen and extend them. Type aliases are closed. That's the practical difference, not the syntax.",
    misconception: "Treating interface and type as pure synonyms. Only interfaces merge, which matters for library augmentation.",
    hints: [
      "How would you add a property to a type declared in someone else's package?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-variance-annotations-in-out",
    title: "What the in and out variance annotations declare",
    prompt: "What do the in and out modifiers on these type parameters mean?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "variance",
      "generics",
      "senior"
    ],
    codeSnippet: "interface Producer<out T> {\n  get(): T;\n}\n\ninterface Consumer<in T> {\n  set(value: T): void;\n}\n\ninterface Processor<in out T> {\n  process(value: T): T;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "They declare variance explicitly: out is covariant, in is contravariant, in out is invariant",
        isCorrect: true,
        explanation: "Correct. They state the subtyping relationship the compiler would otherwise infer structurally."
      },
      {
        id: "B",
        text: "They make the type parameter optional at the use site",
        isCorrect: false,
        explanation: "Optionality of type arguments comes from defaults such as <T = string>, not from variance annotations."
      },
      {
        id: "C",
        text: "They mark parameters as input-only or output-only for the runtime",
        isCorrect: false,
        explanation: "They are erased at compile time and have no runtime meaning whatsoever."
      },
      {
        id: "D",
        text: "They restrict T to primitive types in the in case and object types in the out case",
        isCorrect: false,
        explanation: "They say nothing about what T may be \u2014 only about how the generic type relates under assignment."
      }
    ],
    correctAnswer: "A",
    explanation: "Variance annotations (TypeScript 4.7+) declare how a generic type's assignability follows its type argument. out T is covariant: T appears only in output positions, so Producer<Dog> is assignable to Producer<Animal>. in T is contravariant: T appears only in input positions, so Consumer<Animal> is assignable to Consumer<Dog>. in out is invariant \u2014 neither direction is safe. TypeScript normally infers this structurally; annotating it makes the intent explicit, catches mistakes at the declaration, and speeds up checking of large generic types.",
    interviewLine: "out means you only ever get T out, so widening is safe; in means you only ever put T in, so narrowing is safe.",
    misconception: "Assuming variance annotations change what T can be. They only describe assignability between instantiations.",
    hints: [
      "If you only ever read a T out of something, is it safe to treat it as producing a supertype?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 3
  },
  {
    id: "typescript-overload-implementation-signature",
    title: "What an implementation signature must satisfy",
    prompt: "A function has two overloads: (a: string) and (a: string, ...rest: number[]). What must be true of the implementation signature?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "overloads",
      "functions",
      "senior"
    ],
    codeSnippet: "function format(a: string): string;\nfunction format(a: string, ...rest: number[]): string;\nfunction format(a: string, ...rest: number[]): string {\n  return rest.length ? `${a}:${rest.join(',')}` : a;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It must be callable by every overload, so the rest parameter has to accept being empty",
        isCorrect: true,
        explanation: "Correct. The first overload passes no rest arguments, so rest must be satisfiable as an empty array."
      },
      {
        id: "B",
        text: "It must exactly match one of the declared overloads",
        isCorrect: false,
        explanation: "It must be compatible with all of them, which usually means it is broader than any single one."
      },
      {
        id: "C",
        text: "It becomes part of the public API alongside the overloads",
        isCorrect: false,
        explanation: "The implementation signature is not callable from outside \u2014 only the overload signatures are visible."
      },
      {
        id: "D",
        text: "Rest parameters are not permitted in an implementation signature",
        isCorrect: false,
        explanation: "They are permitted and common; a rest parameter is the usual way to absorb differing arities."
      }
    ],
    correctAnswer: "A",
    explanation: "Overload signatures define the public API; the implementation signature is invisible to callers and only has to be compatible with all of them. A rest parameter naturally satisfies this because it accepts zero or more arguments \u2014 calls matching the first overload simply bind rest to []. This is also why an implementation signature is usually wider than any individual overload, and why widening it does not widen what callers may actually pass.",
    interviewLine: "Overload signatures are the API; the implementation signature is plumbing that has to satisfy all of them and is never callable itself.",
    misconception: "Expecting callers to be able to use the implementation signature. Only the declared overloads are visible.",
    hints: [
      "What does rest bind to when the caller passes only one argument?"
    ],
    source: "tricky-typescript-12",
    estimatedMinutes: 2
  },
  {
    id: "typescript-superset-static-typing-basics",
    title: "What TypeScript adds on top of JavaScript",
    prompt: "Which statement best describes TypeScript's relationship to JavaScript?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "fundamentals",
      "tooling"
    ],
    codeSnippet: "function add(a: number, b: number): number {\n  return a + b;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A linter that reports type problems without changing the output",
        isCorrect: false,
        explanation: "It is a compiler with its own syntax \u2014 enums, interfaces, generics \u2014 not a linting layer over JavaScript."
      },
      {
        id: "B",
        text: "A superset that adds optional static types, all of which are erased before the code runs",
        isCorrect: true,
        explanation: "Correct. Every valid JavaScript file is valid TypeScript, and the types exist only at compile time."
      },
      {
        id: "C",
        text: "A separate language that compiles to JavaScript but shares no syntax with it",
        isCorrect: false,
        explanation: "It is a strict superset \u2014 plain JavaScript is already valid TypeScript."
      },
      {
        id: "D",
        text: "A runtime that enforces types while the program executes",
        isCorrect: false,
        explanation: "There is no runtime type checking. Annotations are stripped by the compiler."
      }
    ],
    correctAnswer: "B",
    explanation: "TypeScript is a superset: valid JavaScript is already valid TypeScript, and you opt into typing gradually. Everything the type system knows is discarded by the compiler, so the emitted JavaScript has no annotations and no runtime cost \u2014 and equally no runtime protection. A value that arrives from an API as the wrong shape will not be caught unless you validate it yourself.",
    interviewLine: "Types are compile-time only. They're erased before the code runs, so they catch your mistakes, not your users' data.",
    misconception: "Expecting TypeScript to validate data at runtime. A type assertion on an API response checks nothing.",
    hints: [
      "What is left in the emitted JavaScript after compilation?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2
  },
  {
    id: "typescript-interfaces-describe-shape",
    title: "What an interface is for",
    prompt: "What does an interface do in TypeScript?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "contracts"
    ],
    codeSnippet: "interface Person {\n  firstName: string;\n  lastName: string;\n  greet(): void;\n}\n\nclass Employee implements Person {\n  constructor(\n    public firstName: string,\n    public lastName: string,\n  ) {}\n  greet() {\n    console.log(`Hi, ${this.firstName}`);\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It generates a runtime class with default implementations",
        isCorrect: false,
        explanation: "Interfaces emit nothing at all. There is no runtime artifact."
      },
      {
        id: "B",
        text: "It describes the shape a value must have, and is erased at compile time",
        isCorrect: true,
        explanation: "Correct. It is a compile-time contract \u2014 properties, their types, and method signatures."
      },
      {
        id: "C",
        text: "It creates a new value that can be instantiated with new",
        isCorrect: false,
        explanation: "You cannot instantiate an interface; only classes produce values."
      },
      {
        id: "D",
        text: "It validates objects against the declared shape when they are created",
        isCorrect: false,
        explanation: "No validation happens at runtime. Checking is entirely static."
      }
    ],
    correctAnswer: "B",
    explanation: "An interface declares the shape a value must have \u2014 which properties exist, what types they hold, what methods they expose \u2014 and emits nothing. A class can declare implements Person to have the compiler verify it satisfies the contract, but any object with the right shape also satisfies it, because TypeScript is structurally typed rather than nominally typed. Interfaces also merge across declarations, which is what makes them the right choice for shapes other code may extend.",
    interviewLine: "An interface is a compile-time contract, not a runtime object. Structural typing means anything with the right shape satisfies it.",
    misconception: "Thinking a value must explicitly implement an interface to be assignable to it. Structural typing says otherwise.",
    hints: [
      "What does an interface compile down to?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2
  },
  {
    id: "typescript-generics-preserve-type-relationship",
    title: "What a generic buys you over any",
    prompt: "Why is identity<T>(value: T): T better than identity(value: any): any?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "any",
      "type-safety"
    ],
    codeSnippet: "function identity<T>(value: T): T {\n  return value;\n}\n\nconst n = identity(42);      // number\nconst s = identity(\"hello\"); // string",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The generic version runs faster because it avoids runtime type checks",
        isCorrect: false,
        explanation: "Neither performs runtime checks; both compile to the same JavaScript."
      },
      {
        id: "B",
        text: "any is not allowed as a return type in strict mode",
        isCorrect: false,
        explanation: "any is permitted everywhere. strict does not forbid it."
      },
      {
        id: "C",
        text: "The generic restricts the function to a single type across the whole program",
        isCorrect: false,
        explanation: "T is resolved per call site, so different calls can use different types."
      },
      {
        id: "D",
        text: "The generic preserves the relationship between argument and return type; any discards it",
        isCorrect: true,
        explanation: "Correct. T links input to output, so the caller keeps the concrete type instead of falling back to any."
      }
    ],
    correctAnswer: "D",
    explanation: "any switches off the type system: identity(42) returns any, and from there you can call .toUpperCase() on a number with no complaint. A type parameter instead captures whatever the caller passed and threads it through to the return type, so identity(42) is number and identity('hello') is string. Generics keep information flowing; any throws it away.",
    interviewLine: "A generic relates types to each other; any just gives up. Reach for a type parameter whenever output depends on input.",
    misconception: "Treating any as a lightweight generic. It is the absence of typing, not a flexible form of it.",
    hints: [
      "What type does the caller get back in each version?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2
  },
  {
    id: "typescript-decorators-what-they-modify",
    title: "What a decorator can attach to",
    prompt: "What is a decorator in TypeScript?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "decorators",
      "metadata"
    ],
    codeSnippet: "function log(target: unknown, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function (...args: unknown[]) {\n    console.log(`calling ${key}`);\n    return original.apply(this, args);\n  };\n}\n\nclass Service {\n  @log\n  fetch() {}\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A macro expanded inline at each call site",
        isCorrect: false,
        explanation: "It runs once at definition, not at each call, and it is an ordinary function rather than a macro."
      },
      {
        id: "B",
        text: "A shorthand for declaration merging on classes",
        isCorrect: false,
        explanation: "Decorators and declaration merging are unrelated features."
      },
      {
        id: "C",
        text: "A type-level annotation that the compiler erases like any other type",
        isCorrect: false,
        explanation: "Decorators emit real runtime code \u2014 they are not erased."
      },
      {
        id: "D",
        text: "A function that wraps or annotates a class, method, accessor, property or parameter at definition time",
        isCorrect: true,
        explanation: "Correct. It runs when the definition is evaluated and can replace or annotate what it decorates."
      }
    ],
    correctAnswer: "D",
    explanation: "A decorator is a function applied to a declaration when that declaration is evaluated. It receives the target and can wrap, replace or annotate it \u2014 the classic example replaces a method's implementation with one that logs and delegates. Unlike types, decorators emit real runtime code. Angular and NestJS are built on them, and after years as an experimental flag they are now a standardised JavaScript feature.",
    interviewLine: "Decorators run at definition time and emit real code \u2014 unlike everything else in TypeScript's syntax, they are not erased.",
    misconception: "Assuming decorators are compile-time only like type annotations. They produce runtime behaviour.",
    hints: [
      "Is there anything left in the emitted JavaScript?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 3
  },
  {
    id: "typescript-async-await-over-promises",
    title: "What async/await changes about a promise",
    prompt: "How does async/await relate to promises?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "async-await",
    tags: [
      "typescript",
      "async-await",
      "promises"
    ],
    codeSnippet: "async function loadUser(id: string): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It makes asynchronous calls run synchronously, blocking the thread",
        isCorrect: false,
        explanation: "Nothing blocks. await yields control and resumes later in a microtask."
      },
      {
        id: "B",
        text: "It is syntax over promises: an async function returns one, and await unwraps one",
        isCorrect: true,
        explanation: "Correct. Same machinery, and it lets try/catch handle rejections."
      },
      {
        id: "C",
        text: "It only works with promises created by fetch",
        isCorrect: false,
        explanation: "await works on any thenable, whatever produced it."
      },
      {
        id: "D",
        text: "It replaces promises with a different concurrency primitive",
        isCorrect: false,
        explanation: "It is built directly on promises \u2014 an async function returns one."
      }
    ],
    correctAnswer: "B",
    explanation: "An async function always returns a promise, and await suspends the function until the awaited promise settles \u2014 yielding to the event loop rather than blocking. The practical win is control flow: sequential code reads top to bottom instead of nesting in .then chains, and ordinary try/catch handles rejection. The cost is that awaiting in sequence serialises work that could have run concurrently, which is what Promise.all is for.",
    interviewLine: "await doesn't block, it yields. Sequential awaits serialise independent work \u2014 reach for Promise.all when the calls don't depend on each other.",
    misconception: "Assuming await blocks the thread. It suspends one function while everything else keeps running.",
    hints: [
      "What does an async function return, always?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2
  },
  {
    id: "typescript-modules-encapsulation",
    title: "What makes a file a module",
    prompt: "In TypeScript, what determines whether a file is a module rather than a global script?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "modules",
      "scope"
    ],
    codeSnippet: "// utils.ts \u2014 a module: it has an export\nexport function toSlug(s: string) {\n  return s.toLowerCase().replace(/\\s+/g, \"-\");\n}\n\n// globals.ts \u2014 a script: no import or export anywhere\nconst VERSION = \"1.0\";",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The .ts extension \u2014 every TypeScript file is a module",
        isCorrect: false,
        explanation: "A .ts file with no import or export is a global script."
      },
      {
        id: "B",
        text: "The presence of at least one top-level import or export",
        isCorrect: true,
        explanation: "Correct. That is the rule; without one, declarations land in the global scope and can collide."
      },
      {
        id: "C",
        text: "Being listed in the include array of tsconfig.json",
        isCorrect: false,
        explanation: "That controls which files are compiled, not whether they are modules."
      },
      {
        id: "D",
        text: "Setting module in tsconfig.json",
        isCorrect: false,
        explanation: "That selects the output module format for files that are already modules."
      }
    ],
    correctAnswer: "B",
    explanation: "A file becomes a module the moment it has a top-level import or export. Until then its declarations live in the global scope, which is how two files can collide on the same const name. That is also why an otherwise empty declaration file sometimes needs export {} to force module status. --isolatedModules makes this explicit by requiring every file to be a module.",
    interviewLine: "One top-level import or export is the whole rule. Without it you're writing globals, whether you meant to or not.",
    misconception: "Assuming every .ts file is automatically scoped. Without an import or export it shares the global scope.",
    hints: [
      "Why would you ever write a bare `export {}` in a file?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2
  },
  {
    id: "javascript-coercion-precedence-trap",
    title: "Unary operators, array coercion and left-to-right +",
    prompt: "What does this log?",
    level: "senior",
    type: "output",
    category: "javascript",
    subject: "types",
    tags: [
      "javascript",
      "coercion",
      "operators",
      "precedence",
      "senior"
    ],
    codeSnippet: "console.log(+\"5\" + [1] + !\"0\");",
    codeLanguage: "javascript",
    options: [
      {
        id: "A",
        text: "\"51false\"",
        isCorrect: true,
        explanation: "Correct. Unary operators run first, then binary + evaluates left to right, coercing to string as soon as one side is a string."
      },
      {
        id: "B",
        text: "6",
        isCorrect: false,
        explanation: "Only the first operand becomes a number. [1] coerces to the string \"1\", which turns the whole expression into string concatenation."
      },
      {
        id: "C",
        text: "\"5,1false\"",
        isCorrect: false,
        explanation: "A single-element array stringifies to \"1\" with no comma; commas only appear for multiple elements."
      },
      {
        id: "D",
        text: "NaN",
        isCorrect: false,
        explanation: "No arithmetic on a non-numeric value happens \u2014 the expression becomes string concatenation before that could occur."
      }
    ],
    correctAnswer: "A",
    explanation: "Unary operators bind tighter than binary +, so +\"5\" becomes the number 5 and !\"0\" becomes false \u2014 \"0\" is a non-empty string and therefore truthy. That leaves 5 + [1] + false. Binary + is left-associative: 5 + [1] converts the array to a primitive, which for [1] is the string \"1\", so string concatenation wins and gives \"51\". Then \"51\" + false gives \"51false\".",
    interviewLine: "Binary + is the only arithmetic operator that also concatenates \u2014 one string operand anywhere and the whole chain turns into text.",
    misconception: "Thinking !\"0\" is true. The string \"0\" is truthy; only the empty string is falsy.",
    hints: [
      "Evaluate the two unary operators first, then go left to right."
    ],
    source: "advanced-javascript-6",
    estimatedMinutes: 2
  },
  {
    id: "typescript-interface-vs-type-alias-capabilities",
    title: "Interface or type alias: which can do what",
    prompt: "Which capability belongs to interfaces but NOT to type aliases?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "interfaces",
      "type-aliases",
      "declaration-merging"
    ],
    codeSnippet: "interface User { name: string }\ninterface User { age: number }   // merges\n\ntype Point = { x: number };\n// type Point = { y: number };   // error: duplicate identifier",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Being used as the type of a function parameter",
        isCorrect: false,
        explanation: "Both can annotate a parameter."
      },
      {
        id: "B",
        text: "Being extended to build a wider shape",
        isCorrect: false,
        explanation: "Interfaces use extends and type aliases use &, but both compose."
      },
      {
        id: "C",
        text: "Describing the shape of an object",
        isCorrect: false,
        explanation: "Both do this equally well; a type alias for an object literal is entirely idiomatic."
      },
      {
        id: "D",
        text: "Being reopened and merged by a later declaration of the same name",
        isCorrect: true,
        explanation: "Correct. Declaration merging is unique to interfaces, and it is what makes global and module augmentation possible."
      }
    ],
    correctAnswer: "D",
    explanation: "The practical difference is openness. An interface can be declared more than once and the compiler merges the declarations, which is how you add a property to Window or augment a third-party module's types. A type alias binds a name exactly once \u2014 a second declaration is a duplicate identifier error. Everything else is largely symmetrical: both describe object shapes, both annotate parameters, both compose. Type aliases win where interfaces cannot go at all: unions, tuples, primitives and conditional types.",
    interviewLine: "Interfaces are open, type aliases are closed. If someone else needs to extend it from another file, it has to be an interface.",
    misconception: "Treating the two as pure synonyms. They differ precisely where extensibility matters.",
    hints: [
      "What happens if you declare the same name twice with each?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-extends-vs-intersection-conflict",
    title: "extends and & behave differently on a conflict",
    prompt: "Both compose two shapes with a clashing member. What is the difference?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "intersection",
      "extends",
      "interfaces"
    ],
    codeSnippet: "interface A { id: string }\ninterface B extends A { id: number }      // (1)\n\ntype C = { id: string } & { id: number }; // (2)",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "(1) errors immediately; (2) is accepted but id becomes never, so it is unusable",
        isCorrect: true,
        explanation: "Correct. extends checks compatibility eagerly; & silently intersects the members instead."
      },
      {
        id: "B",
        text: "(1) is accepted and B.id narrows to number; (2) errors",
        isCorrect: false,
        explanation: "extends will not let a subtype change a member to an incompatible type."
      },
      {
        id: "C",
        text: "Both are accepted and the last declaration wins",
        isCorrect: false,
        explanation: "Neither uses last-wins semantics."
      },
      {
        id: "D",
        text: "Both are errors \u2014 a member cannot be redeclared with a different type",
        isCorrect: false,
        explanation: "Only the interface form errors. The intersection is accepted at the declaration."
      }
    ],
    correctAnswer: "A",
    explanation: "extends is checked at the point of declaration: an interface that extends another must remain assignable to it, so redeclaring id as an incompatible type is an error you see immediately. An intersection performs no such check \u2014 it intersects each member, and string & number has no inhabitants, so id becomes never. The type is accepted and the failure surfaces much later, wherever someone tries to assign to it. That earlier feedback is a real argument for extends when you are modelling inheritance.",
    interviewLine: "extends fails at the declaration; & fails at the usage, with a never you have to go looking for.",
    misconception: "Assuming & and extends are interchangeable. They differ exactly when members conflict.",
    hints: [
      "What is the type string & number?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-union-requires-type-alias",
    title: "What only a type alias can express",
    prompt: "You need Status to be exactly 'idle' | 'loading' | 'done'. Which declaration works?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "unions",
      "type-aliases",
      "interfaces"
    ],
    codeSnippet: "type Status = 'idle' | 'loading' | 'done';",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "type Status = 'idle' | 'loading' | 'done'",
        isCorrect: true,
        explanation: "Correct. A union is not an object shape, so only a type alias can name it."
      },
      {
        id: "B",
        text: "interface Status { value: 'idle' | 'loading' | 'done' }",
        isCorrect: false,
        explanation: "That declares an object with a property, not the union itself."
      },
      {
        id: "C",
        text: "interface Status extends 'idle' | 'loading' | 'done' {}",
        isCorrect: false,
        explanation: "An interface can only extend an object type or a statically known shape, not a union of literals."
      },
      {
        id: "D",
        text: "Either \u2014 interfaces and type aliases both express unions",
        isCorrect: false,
        explanation: "Interfaces describe object shapes only. Unions, tuples and primitives need an alias."
      }
    ],
    correctAnswer: "A",
    explanation: "An interface describes the shape of an object: a set of members. A union is not a shape \u2014 it is a choice between types \u2014 so there is nothing for an interface to declare. Type aliases have no such restriction: they name any type at all, including unions, tuples, primitives, conditional types and mapped types. This is the counterweight to declaration merging, and in practice it decides most real choices between the two.",
    interviewLine: "Interfaces describe object shapes; aliases name any type. A union isn't a shape, so it has to be an alias.",
    misconception: "Reaching for an interface by default and then wrapping the union in a pointless property.",
    hints: [
      "Is a union a set of members, or a choice between types?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-module-augmentation-third-party",
    title: "Adding a property to a third-party type",
    prompt: "A library exports interface Config. You need to add a custom field to it from your own code. How?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "declaration-merging",
      "module-augmentation",
      "interfaces"
    ],
    codeSnippet: "declare module \"some-lib\" {\n  interface Config {\n    myFeatureFlag?: boolean;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reopen the interface inside declare module for that package, so the declarations merge",
        isCorrect: true,
        explanation: "Correct. Module augmentation is exactly this: declaration merging targeted at another package's types."
      },
      {
        id: "B",
        text: "Fork the package's .d.ts file and edit it in place",
        isCorrect: false,
        explanation: "It works until the next upgrade silently reverts it. Augmentation is the supported route."
      },
      {
        id: "C",
        text: "Cast every usage to any at the call sites that need the field",
        isCorrect: false,
        explanation: "That disables checking at each site instead of extending the type once."
      },
      {
        id: "D",
        text: "Declare a type alias with the same name in your own file",
        isCorrect: false,
        explanation: "A type alias cannot merge \u2014 a duplicate name is an error, and it would not affect the library's type anyway."
      }
    ],
    correctAnswer: "A",
    explanation: "Module augmentation reopens a declaration inside another package's module and merges into it. Because interfaces merge and type aliases do not, this only works if the library declared the shape as an interface \u2014 a real argument for exporting public shapes as interfaces in library code. The same mechanism extends global types: declare global { interface Window { myApp: App } }. Note that augmenting a module requires your file to be a module itself, so it needs at least one import or export.",
    interviewLine: "Augmentation is declaration merging pointed at somebody else's package \u2014 which is exactly why library authors should export interfaces, not aliases.",
    misconception: "Trying to augment with a type alias, or editing node_modules and losing it on the next install.",
    hints: [
      "Which of the two declaration forms can be reopened?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-access-modifiers-visibility",
    title: "public, private and protected",
    prompt: "Which statement about TypeScript's access modifiers is correct?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "access-modifiers"
    ],
    codeSnippet: "class Base {\n  public id = 1;      // everywhere\n  protected kind = \"b\"; // this class and subclasses\n  private secret = 42;  // this class only\n}\n\nclass Derived extends Base {\n  read() {\n    return this.kind;   // ok\n    // return this.secret; // error\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "protected members are visible to subclasses; private members are not",
        isCorrect: true,
        explanation: "Correct. That is the entire distinction between them."
      },
      {
        id: "B",
        text: "private members are visible to subclasses but not to outside callers",
        isCorrect: false,
        explanation: "That describes protected. private is limited to the declaring class."
      },
      {
        id: "C",
        text: "Members are private unless marked otherwise",
        isCorrect: false,
        explanation: "The default is public."
      },
      {
        id: "D",
        text: "protected members are accessible from any code in the same module",
        isCorrect: false,
        explanation: "Visibility follows the class hierarchy, not the file or module."
      }
    ],
    correctAnswer: "A",
    explanation: "public is the default and imposes no restriction. protected narrows access to the declaring class and anything that extends it, which is what lets a base class expose internals to its subclasses without exposing them to consumers. private narrows further, to the declaring class alone \u2014 even a subclass cannot see it. All three are compile-time only and are erased from the emitted JavaScript, so none of them prevents access at runtime.",
    interviewLine: "protected is for your subclasses, private is for you alone \u2014 and both are erased, so neither stops anyone at runtime.",
    misconception: "Expecting a subclass to reach a private member. Only protected crosses the inheritance boundary.",
    hints: [
      "Which one is about the inheritance chain rather than the class itself?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-private-keyword-vs-hash-private",
    title: "private versus #private",
    prompt: "What is the practical difference between private balance and #balance?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "private-fields"
    ],
    codeSnippet: "class A {\n  private balance = 0;\n}\nclass B {\n  #balance = 0;\n}\n\nconsole.log((new A() as any).balance); // 0  \u2014 erased, still there\nconsole.log((new B() as any).balance); // undefined \u2014 genuinely hidden",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "#balance is a TypeScript feature that compiles down to private",
        isCorrect: false,
        explanation: "# private fields are standard ECMAScript, not a TypeScript invention."
      },
      {
        id: "B",
        text: "private works on methods while # works only on fields",
        isCorrect: false,
        explanation: "Both apply to fields and methods."
      },
      {
        id: "C",
        text: "They are identical; # is only newer syntax for the same thing",
        isCorrect: false,
        explanation: "They enforce at different times \u2014 one at compile time, the other at runtime."
      },
      {
        id: "D",
        text: "private is a compile-time check that is erased; #balance is enforced by the runtime",
        isCorrect: true,
        explanation: "Correct. A cast to any defeats private; nothing defeats a # field."
      }
    ],
    correctAnswer: "D",
    explanation: "private is part of the type system and vanishes with the types, so the property is still an ordinary property at runtime \u2014 a cast to any or a bracket access reaches it, and it shows up in JSON.stringify and Object.keys. A # field is real ECMAScript private state: the name is not a property key at all, access from outside is a syntax error, and it stays out of serialisation. Use private when you want the compiler to guide callers; use # when the boundary genuinely has to hold.",
    interviewLine: "private is advice to the compiler; # is enforced by the engine. If untrusted code runs in your process, only one of them is real.",
    misconception: "Assuming TypeScript's private survives compilation. It is erased along with every other annotation.",
    hints: [
      "What is left in the emitted JavaScript for each?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-parameter-properties-shorthand",
    title: "Parameter properties",
    prompt: "What does the modifier on a constructor parameter do?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "constructor",
      "parameter-properties"
    ],
    codeSnippet: "class Point {\n  constructor(\n    public readonly x: number,\n    public readonly y: number,\n  ) {}\n}\n\n// equivalent to declaring both fields and assigning them in the body",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It marks the parameter optional at the call site",
        isCorrect: false,
        explanation: "Optionality comes from ? or a default value, not from an access modifier."
      },
      {
        id: "B",
        text: "It makes the parameter available to subclasses only",
        isCorrect: false,
        explanation: "Visibility follows whichever modifier you wrote; the promotion itself is the feature."
      },
      {
        id: "C",
        text: "It has no runtime effect and is purely documentation",
        isCorrect: false,
        explanation: "It emits a real assignment in the constructor."
      },
      {
        id: "D",
        text: "It declares a field and assigns the argument to it automatically",
        isCorrect: true,
        explanation: "Correct. An access modifier or readonly on a constructor parameter promotes it to a property."
      }
    ],
    correctAnswer: "D",
    explanation: "Adding public, private, protected or readonly to a constructor parameter tells TypeScript to declare a field of the same name and assign the argument to it, replacing the usual declare-then-assign boilerplate. It is one of the few TypeScript features that emits code rather than being erased. Worth knowing the caveat: a parameter with no modifier stays an ordinary parameter, so mixing the two forms in one constructor is a common source of confusion.",
    interviewLine: "A modifier on a constructor parameter promotes it to a field. It's one of the rare bits of TypeScript syntax that actually emits code.",
    misconception: "Expecting every constructor parameter to become a property. Only the ones carrying a modifier do.",
    hints: [
      "Compare it with writing the field declaration and the this.x = x line yourself."
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-implements-vs-extends",
    title: "implements versus extends",
    prompt: "What is the difference between a class that implements an interface and one that extends a base class?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "interfaces",
      "inheritance"
    ],
    codeSnippet: "interface Serializable { serialize(): string }\n\nclass Base { protected id = 0 }\n\nclass Doc extends Base implements Serializable {\n  serialize() { return String(this.id); }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "extends is erased at compile time while implements emits a prototype link",
        isCorrect: false,
        explanation: "This inverts it: extends emits the prototype chain, implements is erased."
      },
      {
        id: "B",
        text: "implements copies the interface's members into the class",
        isCorrect: false,
        explanation: "It inherits nothing. The class must supply every member itself."
      },
      {
        id: "C",
        text: "implements is a compile-time conformance check that inherits no implementation; extends inherits real members",
        isCorrect: true,
        explanation: "Correct \u2014 which is also why a class may implement many interfaces but extend only one class."
      },
      {
        id: "D",
        text: "They are interchangeable; implements is preferred stylistically",
        isCorrect: false,
        explanation: "They do different jobs. Only extends brings behaviour."
      }
    ],
    correctAnswer: "C",
    explanation: "implements asks the compiler to verify that a class satisfies a contract; it brings nothing with it, so every member has to be written out, and it disappears entirely from the emitted JavaScript. extends creates a real prototype chain and inherits implementations, which is why a class can implement any number of interfaces but extend exactly one class. Because TypeScript is structurally typed, a class that happens to have the right shape is assignable to the interface anyway \u2014 implements just makes the intent explicit and moves the error to the class rather than the call site.",
    interviewLine: "implements is a checked promise; extends is actual inheritance. Structural typing means you don't need the promise \u2014 but you want the error where the class is, not where it's used.",
    misconception: "Expecting implements to provide members. It only verifies that you wrote them.",
    hints: [
      "Which one is still present in the compiled JavaScript?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-abstract-class-vs-interface",
    title: "Abstract class or interface",
    prompt: "When should you reach for an abstract class rather than an interface?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "abstract",
      "interfaces",
      "design"
    ],
    codeSnippet: "abstract class Repository<T> {\n  abstract find(id: string): Promise<T | null>;\n\n  // shared implementation subclasses inherit\n  async findOrFail(id: string): Promise<T> {\n    const found = await this.find(id);\n    if (!found) throw new Error(`not found: ${id}`);\n    return found;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "When the contract must be satisfied by more than one class",
        isCorrect: false,
        explanation: "Interfaces handle that fine, and without consuming the single extends slot."
      },
      {
        id: "B",
        text: "When you want the contract checked at compile time",
        isCorrect: false,
        explanation: "Both are checked at compile time."
      },
      {
        id: "C",
        text: "When the type includes optional members",
        isCorrect: false,
        explanation: "Both express optional members with ?."
      },
      {
        id: "D",
        text: "When you need shared implementation alongside the contract",
        isCorrect: true,
        explanation: "Correct. An abstract class can ship working methods; an interface cannot ship any."
      }
    ],
    correctAnswer: "D",
    explanation: "Both declare a contract, but only an abstract class can also provide implementation \u2014 concrete methods, constructor logic, protected state \u2014 while leaving some members abstract for subclasses to fill in. The cost is the single extends slot and a real runtime artifact. The rule of thumb: if you have behaviour to share, use an abstract class; if you only have a shape to describe, use an interface, which is free at runtime and can be implemented alongside anything else.",
    interviewLine: "Interface when you have a shape; abstract class when you also have behaviour worth inheriting \u2014 and remember it spends the one extends slot.",
    misconception: "Reaching for an abstract class purely to declare a contract, and paying the inheritance cost for nothing.",
    hints: [
      "Which of the two can contain a method with a body?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-generic-constraint-extends",
    title: "Constraining a type parameter",
    prompt: "Why does the unconstrained version fail to compile?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "constraints",
      "keyof"
    ],
    codeSnippet: "function longest1<T>(a: T, b: T) {\n  return a.length >= b.length ? a : b; // error: no 'length' on T\n}\n\nfunction longest2<T extends { length: number }>(a: T, b: T) {\n  return a.length >= b.length ? a : b; // ok\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Generic functions cannot access properties of their parameters at all",
        isCorrect: false,
        explanation: "They can, once the constraint guarantees the property exists."
      },
      {
        id: "B",
        text: "T must be constrained to a class for property access to work",
        isCorrect: false,
        explanation: "Any constraint that guarantees the member is enough \u2014 an object literal type works."
      },
      {
        id: "C",
        text: "The two parameters must have different type parameters",
        isCorrect: false,
        explanation: "Sharing T is correct here and is not the cause of the error."
      },
      {
        id: "D",
        text: "An unconstrained T could be anything, so the compiler cannot assume it has length",
        isCorrect: true,
        explanation: "Correct. extends narrows what T may be, which is what unlocks the member access."
      }
    ],
    correctAnswer: "D",
    explanation: "An unconstrained type parameter stands for absolutely any type, so the compiler can only allow operations valid on every type \u2014 and .length is not one of them. extends { length: number } narrows the set of acceptable types and, in exchange, lets you use that member inside the body. This is the fundamental trade of generics: the more you constrain, the more you can do. The constraint also improves the call site, rejecting a number argument at the caller rather than deep inside the function.",
    interviewLine: "A constraint is a two-way deal: you narrow what callers may pass, and in return the compiler lets you use what you've guaranteed.",
    misconception: "Reading extends as inheritance. On a type parameter it means 'is assignable to'.",
    hints: [
      "What can you safely do to a value whose type could be anything at all?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-keyof-generic-property-lookup",
    title: "Typing a property getter with keyof",
    prompt: "What is the return type of getProperty(user, 'age')?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "keyof",
      "indexed-access"
    ],
    codeSnippet: "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: \"Ada\", age: 36 };\nconst a = getProperty(user, \"age\");",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "unknown, because T is generic",
        isCorrect: false,
        explanation: "T is inferred from the argument as the concrete object type."
      },
      {
        id: "B",
        text: "string | number \u2014 the union of the object's value types",
        isCorrect: false,
        explanation: "The indexed access type T[K] resolves to the specific member, not the union of all of them."
      },
      {
        id: "C",
        text: "number, because K is inferred as the literal 'age' and T['age'] is number",
        isCorrect: true,
        explanation: "Correct. K is inferred as a literal key, so the lookup resolves exactly."
      },
      {
        id: "D",
        text: "any, because the key is only known at runtime",
        isCorrect: false,
        explanation: "The key is a string literal, so it is known statically."
      }
    ],
    correctAnswer: "C",
    explanation: "Two inferences make this work. T is inferred from obj as { name: string; age: number }, and K is inferred from the literal argument as 'age' rather than widening to string \u2014 because K is constrained to keyof T, which is a union of literal types. T[K] is then an indexed access type resolving to number. The same signature also rejects getProperty(user, 'email') at compile time, since 'email' is not in keyof T.",
    interviewLine: "keyof plus an indexed access type turns a runtime lookup into a compile-time one \u2014 the return type follows the key you actually passed.",
    misconception: "Expecting the union of all property types. The literal key resolves to exactly one.",
    hints: [
      "What does K infer as when the argument is a string literal constrained to keyof T?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-generic-default-type-parameter",
    title: "Default type parameters",
    prompt: "What does the = Record<string, unknown> do here?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "defaults"
    ],
    codeSnippet: "interface ApiResponse<T = Record<string, unknown>> {\n  data: T;\n  status: number;\n}\n\nconst a: ApiResponse = { data: {}, status: 200 };\nconst b: ApiResponse<User[]> = { data: users, status: 200 };",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It supplies the type argument when the caller omits one",
        isCorrect: true,
        explanation: "Correct \u2014 the same idea as a default parameter value, at the type level."
      },
      {
        id: "B",
        text: "It makes T optional at runtime",
        isCorrect: false,
        explanation: "Type parameters have no runtime existence at all."
      },
      {
        id: "C",
        text: "It forces T to be inferred rather than written explicitly",
        isCorrect: false,
        explanation: "Explicit type arguments remain available, as ApiResponse<User[]> shows."
      },
      {
        id: "D",
        text: "It constrains T so only Record<string, unknown> may be passed",
        isCorrect: false,
        explanation: "That is what extends does. = supplies a fallback and constrains nothing."
      }
    ],
    correctAnswer: "A",
    explanation: "A default type argument lets a generic be used without type arguments, which keeps common cases terse while leaving the parameter available when you need it. It is orthogonal to a constraint, and the two combine: <T extends object = Record<string, unknown>> both restricts what may be passed and supplies a fallback. As with value parameters, defaults must come after any non-defaulted parameters.",
    interviewLine: "extends restricts what T may be; = says what T is when nobody specifies. They're independent and often used together.",
    misconception: "Confusing = with extends. One is a fallback, the other a restriction.",
    hints: [
      "What is the analogous feature for ordinary function parameters?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-deep-readonly-builtin-objects",
    title: "Where a naive DeepReadonly breaks down",
    prompt: "DeepReadonly<T> recurses whenever a property extends object. What does that do to a Date or a Map?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "recursive-types",
      "mapped-types",
      "built-ins"
    ],
    codeSnippet: "type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\n\ninterface State {\n  updatedAt: Date;\n  index: Map<string, number>;\n}\n\ntype Frozen = DeepReadonly<State>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The compiler errors, because a mapped type cannot be applied to a built-in",
        isCorrect: false,
        explanation: "It compiles happily. The problem is what it produces."
      },
      {
        id: "B",
        text: "They are mapped over as plain objects, producing a readonly bag of their method signatures rather than a usable Date or Map",
        isCorrect: true,
        explanation: "Correct. You get something shaped like the methods, and the mutating ones are still there \u2014 readonly on a method property prevents reassigning it, not calling it."
      },
      {
        id: "C",
        text: "They become never, since their internal state is not enumerable",
        isCorrect: false,
        explanation: "They do not become never; they become a mapped shape over their public members."
      },
      {
        id: "D",
        text: "They are left untouched, because built-in types are excluded automatically",
        isCorrect: false,
        explanation: "There is no exclusion. Date and Map both satisfy extends object."
      }
    ],
    correctAnswer: "B",
    explanation: "Date and Map both satisfy extends object, so the recursion maps over their members. What comes back is a readonly object with the same method signatures \u2014 not a Date you can pass to anything expecting one, and no protection at all, because readonly stops you reassigning index.set, not calling it. A production-grade version has to special-case built-ins, typically by short-circuiting on known types before the object check and treating readonly collections as ReadonlyMap or ReadonlySet. Deep recursion also runs into the compiler's instantiation depth limit on large types.",
    interviewLine: "extends object catches Date, Map and RegExp too \u2014 you get a readonly bag of method signatures, which is type-safety theatre rather than immutability.",
    misconception: "Believing a one-line DeepReadonly is production-ready. It is correct only for plain data.",
    hints: [
      "Does readonly on a property that holds a method prevent calling that method?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-unknown-vs-any-boundary",
    title: "unknown versus any at a data boundary",
    prompt: "An API response arrives untyped. Why is unknown the better annotation?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "unknown",
      "any",
      "type-safety",
      "narrowing"
    ],
    codeSnippet: "const a: any = await res.json();\na.user.name.toUpperCase();     // compiles. may explode at runtime.\n\nconst b: unknown = await res.json();\n// b.user;                     // error until you prove the shape\nif (isUser(b)) b.name.toUpperCase();",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "unknown is faster because it skips runtime checks",
        isCorrect: false,
        explanation: "Neither performs runtime checks; both are erased."
      },
      {
        id: "B",
        text: "unknown forces you to narrow before using the value; any silently disables checking and spreads",
        isCorrect: true,
        explanation: "Correct. any leaks outward through every expression it touches."
      },
      {
        id: "C",
        text: "unknown allows every operation that any allows, with better error messages",
        isCorrect: false,
        explanation: "unknown allows almost no operations until narrowed. That is the point."
      },
      {
        id: "D",
        text: "any is disallowed under strict, so unknown is the only option",
        isCorrect: false,
        explanation: "strict does not forbid any."
      }
    ],
    correctAnswer: "B",
    explanation: "any switches the type system off for a value and for everything derived from it \u2014 read a property off an any and the result is any too, so a single annotation at the boundary can hollow out an entire module. unknown accepts anything on the way in but permits almost nothing on the way out until you narrow it with a type guard, a typeof check or a schema validator. That makes it the right type for anything crossing a trust boundary: fetch responses, JSON.parse, postMessage payloads, third-party callbacks.",
    interviewLine: "any is an opt-out that spreads; unknown is an opt-in that stops. At a trust boundary you want the one that forces a check.",
    misconception: "Treating any as 'unknown but more convenient'. It is the absence of typing, and it is contagious.",
    hints: [
      "What is the type of x.foo when x is any?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-satisfies-operator",
    title: "What satisfies does that an annotation does not",
    prompt: "Why use satisfies here instead of a type annotation?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "satisfies",
      "inference",
      "literal-types"
    ],
    codeSnippet: "type Routes = Record<string, { path: string; auth: boolean }>;\n\nconst routes = {\n  home: { path: \"/\", auth: false },\n  admin: { path: \"/admin\", auth: true },\n} satisfies Routes;\n\nroutes.home.path;   // ok \u2014 key is known\n// routes.missing;  // error \u2014 not a key\n\nconst annotated: Routes = { /* \u2026same\u2026 */ };\nannotated.anything; // no error \u2014 widened to the index signature",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "satisfies is a shorthand for as, without the unsoundness",
        isCorrect: false,
        explanation: "as reinterprets a type; satisfies checks one and changes nothing about the inferred type."
      },
      {
        id: "B",
        text: "satisfies makes the object readonly, like as const",
        isCorrect: false,
        explanation: "It does not affect mutability. Combining it with as const is common precisely because they do different jobs."
      },
      {
        id: "C",
        text: "satisfies checks the value against the type but keeps the narrower inferred type",
        isCorrect: true,
        explanation: "Correct. You get the constraint checked without losing the specific keys and literal values."
      },
      {
        id: "D",
        text: "satisfies performs the check at runtime rather than compile time",
        isCorrect: false,
        explanation: "It is erased like every other type-level construct."
      }
    ],
    correctAnswer: "C",
    explanation: "An annotation widens the value to the annotated type: once routes is Routes, the compiler only knows it is a string-keyed record, so the specific keys are gone and typos on lookup go unnoticed. satisfies checks the value against the type and then throws the type away, leaving the narrow inferred type in place \u2014 so the keys stay known and the literal values stay literal, while still failing if a route is missing auth. It is the tool for 'conform to this contract but remember exactly what I wrote'.",
    interviewLine: "An annotation replaces the inferred type; satisfies validates against it and keeps what you wrote.",
    misconception: "Thinking satisfies is just a safer as. as reinterprets, satisfies verifies.",
    hints: [
      "After annotating with Record<string, \u2026>, does the compiler still know which keys exist?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-discriminated-union-exhaustive-never",
    title: "Exhaustiveness checking with never",
    prompt: "A new variant is added to the union but not to the switch. What does the never assignment do?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "discriminated-unions",
      "never",
      "exhaustiveness"
    ],
    codeSnippet: "type Shape =\n  | { kind: \"circle\"; r: number }\n  | { kind: \"square\"; size: number };\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case \"circle\": return Math.PI * s.r ** 2;\n    case \"square\": return s.size ** 2;\n    default: {\n      const exhaustive: never = s;\n      return exhaustive;\n    }\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Nothing \u2014 the default branch is unreachable and is stripped",
        isCorrect: false,
        explanation: "It is reachable as far as the compiler is concerned the moment a variant is unhandled."
      },
      {
        id: "B",
        text: "It throws at runtime when an unknown shape arrives",
        isCorrect: false,
        explanation: "It is a compile-time device; nothing is thrown, and the annotation is erased."
      },
      {
        id: "C",
        text: "It fails to compile, because the unhandled variant is no longer assignable to never",
        isCorrect: true,
        explanation: "Correct. Adding a variant turns a silent omission into a build error at every switch."
      },
      {
        id: "D",
        text: "It widens s to unknown inside the default branch",
        isCorrect: false,
        explanation: "Narrowing works the other way: handled cases are removed from the union."
      }
    ],
    correctAnswer: "C",
    explanation: "Inside the switch, each handled case is removed from the union, so by the default branch s has narrowed to never \u2014 the type with no values \u2014 and assigning never to never is fine. Add a third variant and the default branch now narrows to that variant instead, which is not assignable to never, so the build fails. That turns 'I forgot to handle a case' from a runtime surprise into a compile error at every exhaustive switch in the codebase, which is the main practical reason to use discriminated unions over loose objects.",
    interviewLine: "The never assignment is a tripwire: add a variant and every switch that forgot it stops compiling.",
    misconception: "Thinking the default branch is dead code. It is the assertion that keeps the union honest.",
    hints: [
      "What has s narrowed to once every case has been handled?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-structural-typing-duck",
    title: "Structural typing",
    prompt: "Point was never mentioned when Named was declared. Does the assignment compile?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "structural-typing",
      "assignability"
    ],
    codeSnippet: "interface Named { name: string }\n\nclass Person {\n  constructor(public name: string, public age: number) {}\n}\n\nconst n: Named = new Person(\"Ada\", 36);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Only if Named is declared as a type alias rather than an interface",
        isCorrect: false,
        explanation: "Interfaces and aliases behave identically for assignability."
      },
      {
        id: "B",
        text: "No \u2014 Person must declare implements Named",
        isCorrect: false,
        explanation: "That would be required under nominal typing. TypeScript is structural."
      },
      {
        id: "C",
        text: "Yes \u2014 Person has a compatible name, and extra members are allowed on a non-literal value",
        isCorrect: true,
        explanation: "Correct. Compatibility is decided by shape, not by declared relationships."
      },
      {
        id: "D",
        text: "No \u2014 the extra age property makes it incompatible",
        isCorrect: false,
        explanation: "Extra properties are fine here; excess property checks only apply to fresh object literals."
      }
    ],
    correctAnswer: "C",
    explanation: "TypeScript compares types by structure, not by name: anything with a string name is assignable to Named, whether or not it ever heard of it. This is why implements is a convenience rather than a requirement, and why types from different libraries interoperate without adapters. Two caveats: a fresh object literal gets an excess property check, which rejects unexpected members; and private members make a class nominal in practice, since two classes with identically-named privates are still not assignable to each other.",
    interviewLine: "TypeScript checks shape, not lineage. If it has the members, it's assignable \u2014 declared relationships are documentation.",
    misconception: "Assuming a class must implement an interface to satisfy it. Structural typing says otherwise.",
    hints: [
      "Does TypeScript care what the type is called, or what it contains?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-excess-property-check-literals",
    title: "Why the literal errors but the variable does not",
    prompt: "The same object is rejected in one form and accepted in the other. Why?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "excess-property-check",
      "assignability",
      "literals"
    ],
    codeSnippet: "interface Options { width: number }\n\n// const a: Options = { width: 10, height: 5 }; // error: 'height' does not exist\n\nconst raw = { width: 10, height: 5 };\nconst b: Options = raw; // ok",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "raw is inferred as Options, so height is discarded",
        isCorrect: false,
        explanation: "raw is inferred as { width: number; height: number }; nothing is discarded."
      },
      {
        id: "B",
        text: "Object literals get an excess property check; a variable is only checked for structural compatibility",
        isCorrect: true,
        explanation: "Correct. The literal check is a deliberate extra guard against typos, and it applies only to fresh literals."
      },
      {
        id: "C",
        text: "The error is a bug that a type assertion works around",
        isCorrect: false,
        explanation: "It is intentional behaviour, not a bug."
      },
      {
        id: "D",
        text: "Interfaces reject extra properties while type aliases accept them",
        isCorrect: false,
        explanation: "Both behave identically. The difference is literal versus variable, not interface versus alias."
      }
    ],
    correctAnswer: "B",
    explanation: "Structurally, { width: number; height: number } is assignable to Options \u2014 it has everything required. But TypeScript adds an excess property check for fresh object literals assigned directly to a typed target, because an unexpected member there is almost always a typo or a misremembered option name. Assign through a variable and the freshness is gone, so only ordinary structural compatibility applies. The right fix is usually to correct the property name, not to widen the target or reach for as.",
    interviewLine: "Excess property checks only fire on fresh literals \u2014 it's a typo catcher, deliberately sitting on top of structural assignability.",
    misconception: "Concluding the type system is inconsistent. The extra check exists exactly where typos happen.",
    hints: [
      "What is different about a value written inline versus one that arrived in a variable?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-utility-types-pick-omit-partial",
    title: "Choosing between Partial, Pick, Omit and Required",
    prompt: "You need a type with every property of User optional. Which utility?",
    level: "junior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "utility-types",
      "partial",
      "pick",
      "omit"
    ],
    codeSnippet: "interface User { id: string; name: string; email: string }\n\ntype Draft = Partial<User>;              // all optional\ntype Public = Omit<User, \"email\">;       // drop a key\ntype Creds = Pick<User, \"id\" | \"email\">; // keep only these\ntype Full = Required<Draft>;             // all required again",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Omit<User, never>",
        isCorrect: false,
        explanation: "Omit removes keys. Removing none leaves the original type."
      },
      {
        id: "B",
        text: "Readonly<User>",
        isCorrect: false,
        explanation: "Readonly changes mutability, not optionality."
      },
      {
        id: "C",
        text: "Pick<User, keyof User>",
        isCorrect: false,
        explanation: "That reproduces User unchanged \u2014 Pick selects keys, it does not change optionality."
      },
      {
        id: "D",
        text: "Partial<User>",
        isCorrect: true,
        explanation: "Correct. Partial maps every property to optional; Required is its inverse."
      }
    ],
    correctAnswer: "D",
    explanation: "These four cover most day-to-day shape manipulation and are all one-line mapped types in lib.d.ts. Partial<T> makes every property optional and Required<T> reverses it; Readonly<T> is the mutability equivalent. Pick<T, K> keeps a subset of keys while Omit<T, K> drops one \u2014 Omit is the more maintainable of the pair for a public shape, since a newly added field is included by default rather than silently missing. Deriving these from one source interface is what keeps a create-DTO and an update-DTO from drifting apart.",
    interviewLine: "Derive your DTOs from one interface with Pick, Omit and Partial. Hand-maintained parallel shapes drift; derived ones can't.",
    misconception: "Confusing Pick and Omit with Partial. The first two select keys; Partial changes optionality.",
    hints: [
      "Which of these touches optionality rather than the set of keys?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 2
  },
  {
    id: "typescript-returntype-parameters-awaited",
    title: "Deriving types from a function you already have",
    prompt: "getUser returns Promise<User>. What is Result?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "utility-types",
      "ReturnType",
      "Awaited",
      "infer"
    ],
    codeSnippet: "async function getUser(id: string, full: boolean) {\n  return { id, name: \"Ada\" };\n}\n\ntype Args = Parameters<typeof getUser>;          // [string, boolean]\ntype Raw = ReturnType<typeof getUser>;           // Promise<{ id: string; name: string }>\ntype Result = Awaited<ReturnType<typeof getUser>>;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "[string, boolean], the parameter tuple",
        isCorrect: false,
        explanation: "That is Parameters, not ReturnType."
      },
      {
        id: "B",
        text: "Promise<{ id: string; name: string }>",
        isCorrect: false,
        explanation: "That is ReturnType alone. Awaited is what unwraps the promise."
      },
      {
        id: "C",
        text: "{ id: string; name: string }",
        isCorrect: true,
        explanation: "Correct. Awaited<T> recursively unwraps promises, so the resolved value type comes out."
      },
      {
        id: "D",
        text: "unknown, because the return type is inferred rather than annotated",
        isCorrect: false,
        explanation: "An inferred return type is a real type and ReturnType reads it fine."
      }
    ],
    correctAnswer: "C",
    explanation: "typeof getUser lifts the function value into the type world; ReturnType<F> then extracts its return type with a conditional type and infer, and Parameters<F> extracts the argument tuple. Awaited<T> unwraps a promise \u2014 recursively, so a nested Promise<Promise<T>> still resolves to T, and a non-promise passes through unchanged. Composing them means the derived types follow the implementation automatically instead of being restated and left to rot.",
    interviewLine: "typeof lifts a value into the type world; ReturnType, Parameters and Awaited read it from there. Derive rather than restate.",
    misconception: "Forgetting the Awaited step and ending up with a Promise where the resolved value was wanted.",
    hints: [
      "An async function's return type is always what?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-record-vs-index-signature",
    title: "Record versus an index signature",
    prompt: "What is the practical difference between these two declarations?",
    level: "intermediate",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "record",
      "index-signature",
      "mapped-types"
    ],
    codeSnippet: "type A = { [key: string]: number };\ntype B = Record<string, number>;      // identical to A\n\ntype Role = \"admin\" | \"guest\";\ntype C = Record<Role, number>;        // { admin: number; guest: number }\n// type D = { [key: Role]: number };  // not expressible this way",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Record can key on a finite union to produce exactly those keys; an index signature cannot",
        isCorrect: true,
        explanation: "Correct. Over string they are equivalent, but Record<Role, \u2026> gives a closed, required set of keys."
      },
      {
        id: "B",
        text: "Record allows any value type while an index signature only allows primitives",
        isCorrect: false,
        explanation: "Both accept any value type."
      },
      {
        id: "C",
        text: "Record is checked at runtime, an index signature is not",
        isCorrect: false,
        explanation: "Neither exists at runtime."
      },
      {
        id: "D",
        text: "An index signature makes properties optional; Record makes them required",
        isCorrect: false,
        explanation: "An index signature says nothing about which keys exist; Record over a union requires all of them."
      }
    ],
    correctAnswer: "A",
    explanation: "Over an open key type they are the same thing \u2014 Record<string, V> is defined as a mapped type that produces exactly { [k: string]: V }. The difference appears with a finite key union: Record<Role, number> produces two named, required properties, so forgetting one is an error and adding a member to Role breaks every incomplete record. An index signature can never do that, because it describes an open set of keys rather than a specific one. Note that reading through an open index signature is unchecked unless noUncheckedIndexedAccess is on.",
    interviewLine: "Record over a union gives you a closed, required key set \u2014 which is what turns adding an enum member into a compile error instead of a bug.",
    misconception: "Treating Record<string, V> as safer than an index signature. They are the same; the win comes from a finite key type.",
    hints: [
      "What happens if you pass a union of literals as the key type?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-promise-all-tuple-inference",
    title: "How TypeScript types the result of Promise.all",
    prompt: "What is the type of the destructured results?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "promises",
      "tuples",
      "inference",
      "awaited"
    ],
    codeSnippet: "declare function getUser(): Promise<User>;\ndeclare function getPosts(): Promise<Post[]>;\ndeclare function getCount(): Promise<number>;\n\nconst [user, posts, count] = await Promise.all([\n  getUser(),\n  getPosts(),\n  getCount(),\n]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "All three are unknown until asserted",
        isCorrect: false,
        explanation: "Nothing is lost; the types flow through."
      },
      {
        id: "B",
        text: "All three are Promise-wrapped and need a further await",
        isCorrect: false,
        explanation: "A single await unwraps the aggregate; the elements are already resolved values."
      },
      {
        id: "C",
        text: "All three are (User | Post[] | number), so each needs narrowing",
        isCorrect: false,
        explanation: "That is what you would get from an array type. The overload preserves the tuple positions."
      },
      {
        id: "D",
        text: "user: User, posts: Post[], count: number \u2014 the tuple positions are preserved",
        isCorrect: true,
        explanation: "Correct. Promise.all is overloaded for tuples, and Awaited unwraps each element type."
      }
    ],
    correctAnswer: "D",
    explanation: "Promise.all is declared with an overload taking a readonly tuple, so passing an array literal of three differently-typed promises preserves the arity and the position of each. The signature maps Awaited over each element, so Promise<User> becomes User in slot 0 and so on. This is why destructuring is fully typed with no assertions \u2014 and also why passing a pre-built array typed Promise<A | B>[] loses it, collapsing to (A | B)[]. Keep the literal inline, or use as const, to keep the tuple.",
    interviewLine: "Promise.all keeps the tuple when you pass the array literal inline. Hoist it into a variable first and the positions collapse into a union.",
    misconception: "Expecting a union and narrowing each result. The tuple overload already resolved them positionally.",
    hints: [
      "What is the difference between a tuple type and an array type here?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  },
  {
    id: "typescript-type-only-imports-isolated-modules",
    title: "Why import type exists",
    prompt: "Under isolatedModules, why must a re-exported type use export type?",
    level: "senior",
    type: "concept",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "import-type",
      "isolatedModules",
      "transpilation"
    ],
    codeSnippet: "import type { User } from \"./models\";       // erased entirely\nimport { createUser } from \"./models\";      // real import\n\nexport type { User };                        // required under isolatedModules\n// export { User };                          // error: it is a type",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A single-file transpiler cannot tell a type from a value, so the syntax has to say which it is",
        isCorrect: true,
        explanation: "Correct. Babel and SWC never build a full program, so they cannot look up whether User is a type."
      },
      {
        id: "B",
        text: "Types must be re-exported separately so the bundler can tree-shake them",
        isCorrect: false,
        explanation: "Types have no runtime representation to shake out."
      },
      {
        id: "C",
        text: "It prevents circular imports between modules",
        isCorrect: false,
        explanation: "Type-only imports do help with cycles, but that is not what the flag requires."
      },
      {
        id: "D",
        text: "It is a style rule enforced by ESLint rather than the compiler",
        isCorrect: false,
        explanation: "Under isolatedModules the compiler itself enforces it."
      }
    ],
    correctAnswer: "A",
    explanation: "tsc knows whether an imported name is a type or a value because it type-checks the whole program. Babel, SWC and esbuild transpile one file at a time and have no such view \u2014 faced with export { User }, they cannot know whether to emit a real re-export or erase it, and emitting one for a type produces an import of something that does not exist at runtime. import type and export type make the intent explicit in the syntax. The same constraint is why const enum is disallowed: inlining its values requires cross-file type information no single-file transpiler has.",
    interviewLine: "A single-file transpiler can't look up whether a name is a type. import type puts the answer in the syntax instead of the type checker.",
    misconception: "Reading import type as a performance hint. It is a correctness requirement for file-at-a-time transpilers.",
    hints: [
      "What does a transpiler that never sees ./models know about User?"
    ],
    source: "typescript-masterclass",
    estimatedMinutes: 3
  }
];
