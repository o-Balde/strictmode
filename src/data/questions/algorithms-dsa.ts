import { QuizQuestion } from '../types';

export const ALGORITHMS_DSA_QUESTIONS: QuizQuestion[] = [
  {
    id: "algorithms-what-are-the-peculiarities-of-using-usestate",
    title: "What are the peculiarities of using useState?",
    prompt: "What are the peculiarities of using useState?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeSnippet: "const [value, setValue] = useState('Some state');",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "useState returns a state value and a function to update it.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "useState returns a state value and a function to update it. During the initial rendering, the returned state matches the value passed as the first argument. The setState function is used to update the state. It takes a new state value as a parameter and queues a re-render of the component. The setState function can also accept a callback function as a parameter, which takes the previous state value as a parameter. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the peculiarities of using useState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the peculiarities of using useState?.",
    hints: [
      "Consider the core principles and trade-offs of What are the peculiarities of using useState?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-react-reconciliation",
    title: "What is React Reconciliation?",
    prompt: "What is React Reconciliation?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Reconciliation is a React algorithm used to distinguish one tree of elements from another to determine the parts that will need to be replaced.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Reconciliation is a React algorithm used to distinguish one tree of elements from another to determine the parts that will need to be replaced. Reconciliation is the algorithm behind what we used to call Virtual DOM. The definition sounds something like this: when you render a React application, the element tree that describes the application is generated in reserved memory. This tree is then included in the rendering environment - for example, a browser application, it is translated into a set of DOM operations. When the application state is updated, a new tree is generated. The new tree is compared with the previous one in order to calculate and enable exactly the operations that are needed to redraw the updated application. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Reconciliation?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Reconciliation?.",
    hints: [
      "Consider the core principles and trade-offs of What is React Reconciliation?."
    ],
    source: "44-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-reconciliation-how-does-reacts-diffing-algorith",
    title: "What is reconciliation? How does React's diffing algorithm work?",
    prompt: "What is reconciliation? How does React's diffing algorithm work?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "So this concept is not very difficult once you read its rules and uses! What you should do here is get familiar with the concept right now, have a read, and then, in the end, I\ufffd\ufffd\ufffdll mention a short answer-like paragraph that you can use during your interview.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "So this concept is not very difficult once you read its rules and uses! What you should do here is get familiar with the concept right now, have a read, and then, in the end, I\ufffd\ufffd\ufffdll mention a short answer-like paragraph that you can use during your interview. So to understand Reconciliation: Reconciliation is the internal algo process React uses to compare the previous Virtual DOM tree with the newly generated Virtual DOM tree after a state or prop changes. Here\ufffd\ufffd\ufffds what happens to make it work: React re-renders the component to produce a new Virtual DOM tree It compares this tree with the previous Virtual DOM tree It computes a set of changes called mutations It applies only those changes to the real DOM And so, this process is used to avoid unnecessary DOM operations, which end up being expensive. Coming to React\ufffd\ufffd\ufffds Diffing Algorithm - React\ufffd\ufffd\ufffds Diffing Algorithm is a part of the reconciliation process, where its primary goal is to minimize DOM updates. Now it is important to understand how this takes place, so please look into this carefully: The expensive but optimal component is (O(n3 ) ) React uses a tree-diffing algorithm to minimize DOM Hence, it uses a heuristic O(n) algorithm instead of specific assumptions What it essentially does is compare root elements, then if they differ, the entire subtree is replaced, and if they match, then its attributes and the recursion on children are compared. There are some rules of diffing that you really need to keep in mind:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is reconciliation? How does React's diffing algorithm work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is reconciliation? How does React's diffing algorithm work?.",
    hints: [
      "Consider the core principles and trade-offs of What is reconciliation? How does React's diffing algorithm work?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-keys-are-used-to-match-children-in-lists",
    title: "Keys are used to match children in lists",
    prompt: "Keys are used to match children in lists \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "items.map(item => <li key={item.id}>{item.name}</li>)",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "When reconciling lists, React uses the key prop to identify which items have stayed the same, moved, or have been added or removed For eg: There is a reason why these keys are critical: They provide a stable identity across renders Prevent incorrect reuse of DOM nodes Preserve component state Without stable keys, React falls back to index-based matching What you must also note is that Reordering can lead to state being assigned to the wrong component, unnecessary re-renders, and even UI inconsistencies.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When reconciling lists, React uses the key prop to identify which items have stayed the same, moved, or have been added or removed For eg: There is a reason why these keys are critical: They provide a stable identity across renders Prevent incorrect reuse of DOM nodes Preserve component state Without stable keys, React falls back to index-based matching What you must also note is that Reordering can lead to state being assigned to the wrong component, unnecessary re-renders, and even UI inconsistencies. You must be wondering why the complexity is O(n) instead of O(n\ufffd\ufffd) - A full tree comparison would require checking every node against every other node, which then results in O(n\ufffd\ufffd) complexity. React reduces this to O(n) using two assumptions: Different element types produce different subtrees - Because of this, there is no need to deeply compare and replace directly Keys uniquely identify elements in lists - Enables efficient matching of children without exhaustive comparison These heuristics make React perform reconciliation in linear time relative to the number of elements. Now this was all you needed to know about reconciliation, Here\ufffd\ufffd\ufffds a short answer that you can prepare if the interviewer isn\ufffd\ufffd\ufffdt expecting anything detailed: Reconciliation is the process by which React compares the previous and new Virtual DOM trees to compute the minimal DOM updates. It uses a heuristic O(n) diffing algorithm based on two assumptions: elements of different types produce different trees, and keys provide a stable identity for list elements. Now you are good to go!",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Keys are used to match children in lists.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Keys are used to match children in lists.",
    hints: [
      "Consider the core principles and trade-offs of Keys are used to match children in lists."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-are-react-portals-and-when-would-you-use-them",
    title: "What are React Portals, and when would you use them?",
    prompt: "What are React Portals, and when would you use them?",
    level: "intermediate",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "intermediate"
    ],
    codeSnippet: "ReactDOM.createPortal(child, container)\n\n<div id=\"modal-root\"></div>\n\nReactDOM.createPortal(<Modal />, document.getElementById(\"modal-root\"));",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "When you work with React, you might have noticed how a component renders inside its parent in the DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When you work with React, you might have noticed how a component renders inside its parent in the DOM. But even so, there are times when you don\ufffd\ufffd\ufffdt necessarily want that. For example, think of a modal. Even if the modal component is written deep inside your component tree, you usually want it to appear at the top of the page, and not stuck inside some parent container. And to mitigate this very problem, Portals are used. So, you don't have to render from your usual place, and run something like: This practically commands to render the component elsewhere in the DOM. Now, here\ufffd\ufffd\ufffds how you can set it up: First write, Then, from anywhere in your React app, you can render into it like this: Even when it\ufffd\ufffd\ufffds done, you need to keep this in mind that even though the modal is rendered outside the parent in the DOM, it still showcases like a normal React child. Which means that it still receives props, it still has access to context, and event handling still works. In fact, event bubbling can take place here. If you click inside a modal rendered via a portal, the event still bubbles up to the parent component in the React tree, and not based on the DOM structure. Now, coming to when to use these Portals, You can say that mostly when UI needs to \ufffd\ufffd\ufffdbreak out\ufffd\ufffd\ufffd of layout restrictions like overflow: hidden, z-index stacking issues. That\ufffd\ufffd\ufffds why they\ufffd\ufffd\ufffdre commonly used for modals, tooltips, dropdowns, and toast notifications.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Portals, and when would you use them?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Portals, and when would you use them?.",
    hints: [
      "Consider the core principles and trade-offs of What are React Portals, and when would you use them?."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3
  },
  {
    id: "algorithms-how-does-virtual-dom-in-react-work-what-are-its-benefit",
    title: "How does virtual DOM in React work? What are its benefits and downsides?",
    prompt: "How does virtual DOM in React work? What are its benefits and downsides?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The virtual DOM in React is an in-memory representation of the real DOM.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The virtual DOM in React is an in-memory representation of the real DOM. When state or props change, React creates a new virtual DOM tree, compares it to the previous one using a diffing algorithm, and efficiently updates only the parts of the real DOM that changed. Benefits: It improves performance by reducing costly direct DOM manipulations and makes UI updates declarative and predictable. Downsides: There's some overhead from diffing and extra memory usage, and in very dynamic UIs, it may not always outperform manual optimizations. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does virtual DOM in React work? What are its benefits and downsides?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does virtual DOM in React work? What are its benefits and downsides?.",
    hints: [
      "Consider the core principles and trade-offs of How does virtual DOM in React work? What are its benefits and downsides?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-react-fiber",
    title: "What is React Fiber?",
    prompt: "What is React Fiber?",
    level: "senior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React Fiber is a complete rewrite of the React core algorithm, designed to improve performance and enable new features like async rendering, error boundaries, and incremental rendering.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Fiber is a complete rewrite of the React core algorithm, designed to improve performance and enable new features like async rendering, error boundaries, and incremental rendering. It breaks down the rendering process into smaller chunks, allowing React to pause, abort, or prioritize updates as needed. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Fiber?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Fiber?.",
    hints: [
      "Consider the core principles and trade-offs of What is React Fiber?."
    ],
    source: "100-react",
    estimatedMinutes: 4
  },
  {
    id: "algorithms-what-is-the-purpose-of-the-push-and-replace-methods-of",
    title: "What is the purpose of the push and replace methods of history?",
    prompt: "What is the purpose of the push and replace methods of history?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The push and replace methods of the history library are used to manage the browser's history stack and control navigation.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The push and replace methods of the history library are used to manage the browser's history stack and control navigation. push: Adds a new entry to the history stack, which means the user can navigate back to it using the browser's back button. Example: history.push('/new-page') replace: Replaces the current entry in the history stack with a new one, meaning the user cannot go back to the previous page using the back button. Example: history.replace('/new-page')",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of the push and replace methods of history?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of the push and replace methods of history?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of the push and replace methods of history?."
    ],
    source: "100-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-virtual-dom-how-react-batches-updates-and-minimizes-dom",
    title: "Virtual DOM: How React Batches Updates and Minimizes DOM Work",
    prompt: "Virtual DOM: How React Batches Updates and Minimizes DOM Work \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Virtual DOM is an in-memory representation of UI elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Virtual DOM is an in-memory representation of UI elements. React updates the virtual DOM first, diffs it against the previous version, then applies the minimal set of fundamental DOM changes. This reduces costly DOM operations. How it helps: React compares virtual DOM trees and calculates the least work to update the real DOM. Keys help the diffing algorithm identify moved or removed items. React also batches state updates inside events for efficiency.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Virtual DOM: How React Batches Updates and Minimizes DOM Work.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Virtual DOM: How React Batches Updates and Minimizes DOM Work.",
    hints: [
      "Consider the core principles and trade-offs of Virtual DOM: How React Batches Updates and Minimizes DOM Work."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-types-of-side-effects-in-components-and-how-to-manage-c",
    title: "Types of Side Effects in Components and How to Manage Cleanup",
    prompt: "Types of Side Effects in Components and How to Manage Cleanup \u2014 explain the behavior and mechanism.",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Side effects include network requests, subscriptions, manual DOM mutations, timers, and logging.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Side effects include network requests, subscriptions, manual DOM mutations, timers, and logging. Some effects need cleanup to avoid leaks or duplicate work.Two categories: Effects without cleanup: simple requests, logging, and non-persistent actions. Effects with cleanup: subscriptions, timers, and manually attached event listeners. Return a cleanup function from useEffect to remove subscriptions or clear timers. Example: useEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id);}, []); Rules: Keep effect dependencies precise to avoid unnecessary re-runs. Clean up resources to prevent memory leaks and duplicate listeners.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Types of Side Effects in Components and How to Manage Cleanup.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Types of Side Effects in Components and How to Manage Cleanup.",
    hints: [
      "Consider the core principles and trade-offs of Types of Side Effects in Components and How to Manage Cleanup."
    ],
    source: "150-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-cra-and-its-benefits",
    title: "What is CRA and its benefits?",
    prompt: "What is CRA and its benefits?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "performance",
    tags: [
      "algorithms",
      "performance",
      "junior"
    ],
    codeSnippet: "# Installation\n$ npm install -g create-react-app\n\n# Create new project\n$ create-react-app todo-app\n$ cd todo-app\n\n# Build, test and run\n$ npm run build\n$ npm run test\n$ npm start",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The create-react-app CLI tool allows you to quickly create & run React applications with no configuration step.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The create-react-app CLI tool allows you to quickly create & run React applications with no configuration step. Let's create Todo App using CRA: It includes everything we need to build a React app: React, JSX, ES6, and Flow syntax support. Language extras beyond ES6 like the object spread operator. Autoprefixed CSS, so you don\ufffd\ufffd\ufffdt need -webkit- or other prefixes. A fast interactive unit test runner with built-in support for coverage reporting. A live development server that warns about common mistakes. A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is CRA and its benefits?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is CRA and its benefits?.",
    hints: [
      "Consider the core principles and trade-offs of What is CRA and its benefits?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-are-the-lifecycle-methods-going-to-be-deprecated-i",
    title: "What are the lifecycle methods going to be deprecated in React v16?",
    prompt: "What are the lifecycle methods going to be deprecated in React v16?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering. componentWillMount() componentWillReceiveProps() componentWillUpdate() Starting with React v16.3 these methods are aliased with UNSAFE_ prefix, and the unprefixed version will be removed in React v17. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the lifecycle methods going to be deprecated in React v16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the lifecycle methods going to be deprecated in React v16?.",
    hints: [
      "Consider the core principles and trade-offs of What are the lifecycle methods going to be deprecated in React v16?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-how-to-combine-multiple-inline-style-objects",
    title: "How to combine multiple inline style objects?",
    prompt: "How to combine multiple inline style objects?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-structures",
    tags: [
      "react",
      "data-structures",
      "junior"
    ],
    codeSnippet: "<button style={{ ...styles.panel.button, ...styles.panel.submitButton }}>{'Submit'}</button>\n\n<button style={[styles.panel.button, styles.panel.submitButton]}>{'Submit'}</button>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You can use spread operator in regular React: If you're using React Native then you can use the arra",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use spread operator in regular React: If you're using React Native then you can use the array notation: \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to combine multiple inline style objects?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to combine multiple inline style objects?.",
    hints: [
      "Consider the core principles and trade-offs of How to combine multiple inline style objects?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-how-to-update-a-component-every-second",
    title: "How to update a component every second?",
    prompt: "How to update a component every second?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "performance",
    tags: [
      "algorithms",
      "performance",
      "junior"
    ],
    codeSnippet: "componentDidMount() {\n  this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000)\n}\n\ncomponentWillUnmount() {\n  clearInterval(this.interval)\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "You need to use setInterval() to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "You need to use setInterval() to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to update a component every second?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to update a component every second?.",
    hints: [
      "Consider the core principles and trade-offs of How to update a component every second?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-how-do-you-apply-vendor-prefixes-to-inline-styles-in-re",
    title: "How do you apply vendor prefixes to inline styles in React?",
    prompt: "How do you apply vendor prefixes to inline styles in React?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeSnippet: "<div\n  style={{\n    transform: 'rotate(90deg)',\n    WebkitTransform: 'rotate(90deg)', // note the capital 'W' here\n    msTransform: 'rotate(90deg)', // 'ms' is the only lowercase vendor prefix\n  }}\n/>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React does not apply vendor prefixes automatically.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React does not apply vendor prefixes automatically. You need to add vendor prefixes manually. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you apply vendor prefixes to inline styles in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you apply vendor prefixes to inline styles in React?.",
    hints: [
      "Consider the core principles and trade-offs of How do you apply vendor prefixes to inline styles in React?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-why-is-a-component-constructor-called-only-once",
    title: "Why is a component constructor called only once?",
    prompt: "Why is a component constructor called only once?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React's reconciliation algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it's the same component as before, so reuses the previous instance rather than creating a new one.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React's reconciliation algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it's the same component as before, so reuses the previous instance rather than creating a new one. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is a component constructor called only once?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is a component constructor called only once?.",
    hints: [
      "Consider the core principles and trade-offs of Why is a component constructor called only once?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "react-what-is-the-purpose-of-push-and-replace-methods-of-hist",
    title: "What is the purpose of push() and replace() methods of history?",
    prompt: "What is the purpose of push() and replace() methods of history?",
    level: "junior",
    type: "concept",
    category: "react",
    subject: "data-structures",
    tags: [
      "react",
      "data-structures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A history instance has two methods for navigation purpose.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A history instance has two methods for navigation purpose. push() replace() If you think of the history as an array of visited locations, push() will add a new location to the array and replace() will replace the current location in the array with the new one. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of push() and replace() methods of history?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of push() and replace() methods of history?.",
    hints: [
      "Consider the core principles and trade-offs of What is the purpose of push() and replace() methods of history?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-how-relay-is-different-from-redux",
    title: "How Relay is different from Redux?",
    prompt: "How Relay is different from Redux?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "state-management",
    tags: [
      "algorithms",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Relay is similar to Redux in that they both use a single store.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via GraphQL queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Relay is different from Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Relay is different from Redux?.",
    hints: [
      "Consider the core principles and trade-offs of How Relay is different from Redux?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-can-you-describe-about-componentdidcatch-lifecycle-meth",
    title: "Can you describe about componentDidCatch lifecycle method signature?",
    prompt: "Can you describe about componentDidCatch lifecycle method signature?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "componentDidCatch(error, info);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The componentDidCatch lifecycle method is invoked after an error has been thrown by a descendant component.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The componentDidCatch lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters, error: - The error object which was thrown info: - An object with a componentStack key contains the information about which component threw the error. The method structure would be as follows \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can you describe about componentDidCatch lifecycle method signature?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can you describe about componentDidCatch lifecycle method signature?.",
    hints: [
      "Consider the core principles and trade-offs of Can you describe about componentDidCatch lifecycle method signature?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-diffing-algorithm",
    title: "What is diffing algorithm?",
    prompt: "What is diffing algorithm?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n3) where n is the number of elements in the tree. In this case, for displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions: Two elements of different types will produce different trees. The developer can hint at which child elements may be stable across different renders with a key prop. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is diffing algorithm?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is diffing algorithm?.",
    hints: [
      "Consider the core principles and trade-offs of What is diffing algorithm?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-are-the-rules-covered-by-diffing-algorithm",
    title: "What are the rules covered by diffing algorithm?",
    prompt: "What are the rules covered by diffing algorithm?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<div className=\"show\" title=\"ReactJS\" />\n\n<div className=\"hide\" title=\"ReactJS\" />\n\n<ul>\n  <li>first</li>\n  <li>second</li>\n</ul>\n\n<ul>\n  <li>first</li>\n  <li>second</li>\n  <li>third</li>\n</ul>\n\n<ul>\n  <li key=\"2015\">Duke</li>\n  <li key=\"2016\">Villanova</li>\n</ul>\n\n<ul>\n  <li key=\"2014\">Connecticut</li>\n  <li key=\"2015\">Duke</li>\n  <li key=\"2016\">Villanova</li>\n</ul>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "When diffing two trees, React first compares the two root elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm, Elements Of Different Types: Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements to , or from to of different types lead a full rebuild. DOM Elements Of The Same Type: When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute, Component Elements Of The Same Type: When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result. Recursing On Children: when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there\ufffd\ufffd\ufffds a difference. For example, when adding an element at the end of the children, converting between these two trees works well. Handling keys: React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient, \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules covered by diffing algorithm?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules covered by diffing algorithm?.",
    hints: [
      "Consider the core principles and trade-offs of What are the rules covered by diffing algorithm?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-what-is-the-typical-use-case-of-portals",
    title: "What is the typical use case of portals?",
    prompt: "What is the typical use case of portals?",
    level: "intermediate",
    type: "concept",
    category: "algorithms",
    subject: "state-management",
    tags: [
      "algorithms",
      "state-management",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React portals are very useful when a parent component has overflow: hidden or has properties that affect the stacking context(z-index,position,opacity etc styles) and you need to visually \ufffd\ufffd\ufffdbreak out\ufffd\ufffd\ufffd of its container.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React portals are very useful when a parent component has overflow: hidden or has properties that affect the stacking context(z-index,position,opacity etc styles) and you need to visually \ufffd\ufffd\ufffdbreak out\ufffd\ufffd\ufffd of its container. For example, dialogs, global message notifications, hovercards, and tooltips. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the typical use case of portals?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the typical use case of portals?.",
    hints: [
      "Consider the core principles and trade-offs of What is the typical use case of portals?."
    ],
    source: "300-react",
    estimatedMinutes: 3
  },
  {
    id: "algorithms-what-is-your-favorite-react-stack",
    title: "What is your favorite React stack?",
    prompt: "What is your favorite React stack?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "async-await",
    tags: [
      "algorithms",
      "async-await",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code. It mainly uses Redux and redux-saga for state management and asynchronous side-effects, react-router for routing purpose, styled-components for styling react components, axios for invoking REST api, and other supported stack such as webpack, reselect, ESNext, Babel. You can clone the project https://github.com/react-boilerplate/react-boilerplate and start working on any new react project. \ufffd\ufffd\ufffd Back to Top",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is your favorite React stack?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is your favorite React stack?.",
    hints: [
      "Consider the core principles and trade-offs of What is your favorite React stack?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-how-does-new-jsx-transform-different-from-old-transform",
    title: "How does new JSX transform different from old transform?",
    prompt: "How does new JSX transform different from old transform?",
    level: "junior",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React from 'react';\n\nfunction App() {\n  return <h1>Good morning!!</h1>;\n}\n\nimport React from 'react';\n\nfunction App() {\n  return React.createElement('h1', null, 'Good morning!!');\n}\n\nfunction App() {\n  return <h1>Good morning!!</h1>;\n}\n\nimport { jsx as _jsx } from 'react/jsx-runtime';\n\nfunction App() {\n  return _jsx('h1', { children: 'Good morning!!' });\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The new JSX transform doesn\ufffd\ufffd\ufffdt require React to be in scope.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The new JSX transform doesn\ufffd\ufffd\ufffdt require React to be in scope. i.e, You don't need to import React package for simple scenarios. Let's take an example to look at the main differences between the old and the new transform, Old Transform: Now JSX transform convert the above code into regular JavaScript as below, New Transform: The new JSX transform doesn't require any React imports Under the hood JSX transform compiles to below code Note: You still need to import React to use Hooks. DEV Community Dropdown menu What's a billboard? Manage preferences Report billboard Build Apps with Google AI Studio \ufffd\ufffd\ufffd\ufffd This track will guide you through Google AI Studio's new \"Build apps with Gemini\" feature, where you can turn a simple text prompt into a fully functional, deployed web application in minutes. Read more \ufffd\ufffd\ufffd Read More Top comments (50) Subscribe Personal Trusted User Create template Templates let you quickly answer FAQs or store snippets for re-use. Submit Preview Dismiss Collapse Expand Jon Deavers Jon Deavers Jon Deavers Follow Jon graduated from the Trilogy full-stack web development boot camp at University of Richmond. He loves building applications on the MERN stack and JAM stack Location Richmond, VA Education Full-Stack Web Development Boot Camp - University of Richmond Joined Sep 6, 2020 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide Wow, what a resource. Thanks so much for putting this together. Perfect for interview prep and as a quick reference. Great job Mikhail! Like comment: Like comment: 7 likes Like Comment button Reply Collapse Expand Utsho Sadhak Joy Utsho Sadhak Joy Utsho Sadhak Joy Follow Love to code and solving problems in leetcode. Email utsho233@gmail.com Location Khulna, Bangladesh Joined Apr 29, 2021 \ufffd\ufffd\ufffd Jul 24 '21 Dropdown menu Hide github.com/sudheerj/reactjs-interv... Like comment: Like comment: 4 likes Like Comment button Reply Collapse Expand Michael Sakhniuk Michael Sakhniuk Michael Sakhniuk Follow Senior Software Engineer at Miro Location Yerevan, Armenia Education Engineer Work Frontend Engineer at Miro Joined Nov 22, 2019 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide Thank you very much, Jon. I appreciate that \ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Ben Halpern Ben Halpern Ben Halpern Follow A Canadian software developer who thinks he\ufffd\ufffd\ufffds funny. Email ben@forem.com Location NY Education Mount Allison University Pronouns He/him Work Co-founder at Forem Joined Dec 26, 2015 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide Holy cow! Like comment: Like comment: 4 likes Like Comment button Reply Collapse Expand Divyesh Parmar Divyesh Parmar Divyesh Parmar Follow Exploring the software world with my ukulele :D Location Bhavnagar, Gujarat, India Education B.Tech ICT Work Software Engineer at Postman Inc Joined Apr 5, 2018 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 4 likes Like Comment button Reply Collapse Expand Matt Heslington Matt Heslington Matt Heslington Follow Location Bali, Indonesia Joined Dec 26, 2019 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide Wow. That's a tremendous post Mikhail. Go treat yourself, you deserve it Like comment: Like comment: 3 likes Like Comment button Reply Collapse Expand Alex Booker Alex Booker Alex Booker Follow Location London, United Kingdom Education None Pronouns he/him Work Content creator who codes @ Clerk | Host of the Scrimba Podcast Joined Nov 8, 2017 \ufffd\ufffd\ufffd Jan 9 '21 Dropdown menu Hide Omg, you made my 3,000+ word post on React interview questions (with answers) look short \ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 2 likes Like Comment button Reply Collapse Expand Michael Sakhniuk Michael Sakhniuk Michael Sakhniuk Follow Senior Software Engineer at Miro Location Yerevan, Armenia Education Engineer Work Frontend Engineer at Miro Joined Nov 22, 2019 \ufffd\ufffd\ufffd Jan 9 '21 Dropdown menu Hide Our articles hugest longreads \ufffd\ufffd\ufffd\ufffd That\ufffd\ufffd\ufffds why I\ufffd\ufffd\ufffdve decided to create project with questions. Here it is: iq.js.org/ If you want, you can add your questions there too Like comment: Like comment: 2 likes Like Comment button Reply Collapse Expand Alex Booker Alex Booker Alex Booker Follow Location London, United Kingdom Education None Pronouns he/him Work Content creator who codes @ Clerk | Host of the Scrimba Podcast Joined Nov 8, 2017 \ufffd\ufffd\ufffd Jan 9 '21 Dropdown menu Hide Great idea \ufffd\ufffd\ufffd\ufffd You're more than welcome to copy my questions and answers but please can you add a link to and credit me over at scrimba.com/articles/react-intervi... Like comment: Like comment: 2 likes Like Comment button Reply Collapse Expand Utsho Sadhak Joy Utsho Sadhak Joy Utsho Sadhak Joy Follow Love to code and solving problems in leetcode. Email utsho233@gmail.com Location Khulna, Bangladesh Joined Apr 29, 2021 \ufffd\ufffd\ufffd Jul 24 '21 Dropdown menu Hide github.com/sudheerj/reactjs-interv... Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Alex Booker Alex Booker Alex Booker Follow Location London, United Kingdom Education None Pronouns he/him Work Content creator who codes @ Clerk | Host of the Scrimba Podcast Joined Nov 8, 2017 \ufffd\ufffd\ufffd Jul 26 '21 Dropdown menu Hide What is this? Like comment: Like comment: 1 like Like Thread Thread Utsho Sadhak Joy Utsho Sadhak Joy Utsho Sadhak Joy Follow Love to code and solving problems in leetcode. Email utsho233@gmail.com Location Khulna, Bangladesh Joined Apr 29, 2021 \ufffd\ufffd\ufffd Jul 26 '21 Dropdown menu Hide This is react question. i first found this question from github. Their explanation is better. you can read from there. . . . Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand certifieddev0101 certifieddev0101 certifieddev0101 Follow I am a Full Stack Developer with 8+ years of professional front-end & back-end development experience using React and Node.js Recently, I took part in the development of LMS(Learning Management System Email noru0916@gmail.com Work Midas Tech Joined Jul 11, 2023 \ufffd\ufffd\ufffd Jul 28 '23 Dropdown menu Hide This article is very useful. Actually I have rich experience with react. So I am very interesting for your article. Personally I am freelancer. Now I am looing for a new job. So I think you can help me. I hope you are doing well. I will never disappoint you. \ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Vangari Bhanu Prakash Vangari Bhanu Prakash Vangari Bhanu Prakash Follow Eat ; Sleep ; Code ; Repeat;; Location Hyderabad, IN Work Web Designer / Web Developer at Quadato Joined Nov 17, 2020 \ufffd\ufffd\ufffd Jan 6 '21 Dropdown menu Hide Mindblowing! super useful\ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 3 likes Like Comment button Reply Collapse Expand lycha0206 lycha0206 lycha0206 Follow Joined Feb 23, 2023 \ufffd\ufffd\ufffd Sep 18 '23 \ufffd\ufffd\ufffd Edited on Sep 18 \ufffd\ufffd\ufffd Edited Dropdown menu Hide My God, I suppose this is how people \"pass the interview\", and join the company and don't know what they are doing, and then of course, appearing as defensive as possible when they feel they are fake and cannot be \"revealed\". Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand dMarina dMarina dMarina Follow Location Cluj-Napoca, Romania Work Software Developer Joined Apr 13, 2020 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide That is very useful. Thanks Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Michael Sakhniuk Michael Sakhniuk Michael Sakhniuk Follow Senior Software Engineer at Miro Location Yerevan, Armenia Education Engineer Work Frontend Engineer at Miro Joined Nov 22, 2019 \ufffd\ufffd\ufffd Jan 5 '21 Dropdown menu Hide Thank you, Marina! Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Af Af Af Follow A very enthusiastic software developer Joined Jun 20, 2022 \ufffd\ufffd\ufffd Oct 16 '22 Dropdown menu Hide test Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand MirAli Mobasheri MirAli Mobasheri MirAli Mobasheri Follow A web & mobile front-end developer. Programming enthusiast. And in pursuit of ideas. Location Tehran, Iran Work Front-end developer at Teanab Parto Shargh Joined Oct 14, 2020 \ufffd\ufffd\ufffd Jan 8 '21 Dropdown menu Hide That's a great job, Mikhail. A very useful resource. Thanks a lot! \ufffd\ufffd\ufffd\ufffd Like comment: Like comment: 2 likes Like Comment button Reply View full discussion (50 comments) Some comments may only be visible to logged-in visitors. Sign in to view all comments. Code of Conduct \ufffd\ufffd\ufffd Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink. Hide child comments as well Confirm For further actions, you may consider blocking this person and/or reporting abuse The DEV Team Promoted Dropdown menu What's a billboard? Manage preferences Report billboard",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does new JSX transform different from old transform?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does new JSX transform different from old transform?.",
    hints: [
      "Consider the core principles and trade-offs of How does new JSX transform different from old transform?."
    ],
    source: "300-react",
    estimatedMinutes: 2
  },
  {
    id: "algorithms-product-of-array-except-self",
    title: "Product of Array Except Self",
    prompt: "Product of Array Except Self \u2014 explain the behavior and mechanism.",
    level: "intermediate",
    type: "output",
    category: "algorithms",
    subject: "rendering-keys",
    tags: [
      "algorithms",
      "rendering-keys",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Problem: Return array where each element is product of all other elements (no division\\.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Return array where each element is product of all other elements (no division\\. Example: Approach: Prefix and suffix products in two passes. def product_except_self(nums\\: n = len(nums\\ res = [1]*n prefix = 1 for i in range(n\\ res[i] = prefix prefix *= nums[i] suffix = 1 for i in range(n - 1, - 1, - 1\\: res[i] *= suffix suffix *= nums[i] return res print(product_except_self([1,2,3,4]\\\\ # [24,12,8,6] Complexity: O(n\\ O(1\\ extra (output not counted\\ HashMap + Sliding Window",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Product of Array Except Self.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Product of Array Except Self.",
    hints: [
      "Consider the core principles and trade-offs of Product of Array Except Self."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3
  },
  {
    id: "algorithms-minimum-window-substring",
    title: "Minimum Window Substring",
    prompt: "Minimum Window Substring \u2014 explain the behavior and mechanism.",
    level: "intermediate",
    type: "concept",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Problem: Length of the longest substring without repeating characters.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Length of the longest substring without repeating characters. Example: Approach: Sliding window with hashmap of last index. Def length_of_longest_substring(s\\: last = {} start = 0 best = 0 for i, ch in enumerate(s\\: if ch in last and last[ch] >= start: start = last[ch] + 1 last[ch] = i best = max(best, i - start + 1\\ return best print(length_of_longest_substring(\"abcabcbb\"\\ # 3 Explanation: Complexity: O(n\\ Tip: Use start to shrink window when duplicates found.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Minimum Window Substring.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Minimum Window Substring.",
    hints: [
      "Consider the core principles and trade-offs of Minimum Window Substring."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3
  }
];
