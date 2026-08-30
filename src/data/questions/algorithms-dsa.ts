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
        text: "useState can only store primitive strings and booleans, rejecting objects and arrays.",
        isCorrect: false,
        explanation: "useState supports all JavaScript data types, including objects, arrays, and functions."
      },
      {
        id: "B",
        text: "Initial state expressions like useState(expensiveCalculation()) will automatically only compute once by default.",
        isCorrect: false,
        explanation: "Function calls in useState(fn()) run on every render unless passed as a lazy initializer function useState(() => fn())."
      },
      {
        id: "C",
        text: "State updates are asynchronous/batched, and passing an updater function setVal(prev => prev + 1) ensures access to the latest state value.",
        isCorrect: true,
        explanation: "Correct. React batches state updates; using updater callbacks avoids stale state closure issues when multiple updates occur."
      },
      {
        id: "D",
        text: "Calling setState mutates the existing state variable in place synchronously on the same line.",
        isCorrect: false,
        explanation: "State in React is immutable; calling setState schedules a re-render with a new value rather than mutating the current variable in place."
      }
    ],
    correctAnswer: "C",
    explanation: "useState returns a state value and a function to update it. During the initial rendering, the returned state matches the value passed as the first argument. The setState function is used to update the state. It takes a new state value as a parameter and queues a re-render of the component. The setState function can also accept a callback function as a parameter, which takes the previous state value as a parameter. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the peculiarities of using useState?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the peculiarities of using useState?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
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
        text: "A database synchronization protocol for resolving SQL replication conflicts.",
        isCorrect: false,
        explanation: "Reconciliation in React is client-side Virtual DOM tree diffing."
      },
      {
        id: "B",
        text: "The process of verifying user credentials against an OAuth authentication server.",
        isCorrect: false,
        explanation: "OAuth authentication is user identity verification, unrelated to React's virtual DOM reconciliation."
      },
      {
        id: "C",
        text: "The compilation step where TypeScript files are converted into JavaScript files.",
        isCorrect: false,
        explanation: "Compilation is handled by TypeScript/Babel, whereas reconciliation is React's runtime diffing process."
      },
      {
        id: "D",
        text: "The algorithm React uses to diff the previous and new Virtual DOM trees and determine the minimal set of real DOM operations needed.",
        isCorrect: true,
        explanation: "Correct. Reconciliation uses heuristics (element type comparison, stable keys) to compute efficient DOM updates in O(n) time."
      }
    ],
    correctAnswer: "D",
    explanation: "Reconciliation is a React algorithm used to distinguish one tree of elements from another to determine the parts that will need to be replaced. Reconciliation is the algorithm behind what we used to call Virtual DOM. The definition sounds something like this: when you render a React application, the element tree that describes the application is generated in reserved memory. This tree is then included in the rendering environment - for example, a browser application, it is translated into a set of DOM operations. When the application state is updated, a new tree is generated. The new tree is compared with the previous one in order to calculate and enable exactly the operations that are needed to redraw the updated application. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Reconciliation?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Reconciliation?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "Reconciliation is React's process of comparing Virtual DOM trees using a heuristic O(n) diffing algorithm based on element types and list keys to compute minimal DOM updates.",
        isCorrect: true,
        explanation: "Correct. Reconciliation achieves O(n) complexity by assuming different element types produce different trees and using keys for stable list identity matching."
      },
      {
        id: "B",
        text: "A sorting algorithm that orders database rows alphabetically in O(n log n) time.",
        isCorrect: false,
        explanation: "Reconciliation is React's Virtual DOM tree diffing process, not a database row sort."
      },
      {
        id: "C",
        text: "An exhaustive O(n^3) graph matching algorithm that compares every node against all other nodes.",
        isCorrect: false,
        explanation: "A general tree diff is O(n^3); React uses heuristic assumptions to achieve linear O(n) performance."
      },
      {
        id: "D",
        text: "A security authentication protocol for encrypting user passwords in transit.",
        isCorrect: false,
        explanation: "Reconciliation manages Virtual DOM rendering, not user authentication."
      }
    ],
    correctAnswer: "A",
    explanation: "So this concept is not very difficult once you read its rules and uses! What you should do here is get familiar with the concept right now, have a read, and then, in the end, I, ll mention a short answer-like paragraph that you can use during your interview. So to understand Reconciliation: Reconciliation is the internal algo process React uses to compare the previous Virtual DOM tree with the newly generated Virtual DOM tree after a state or prop changes. Here, s what happens to make it work: React re-renders the component to produce a new Virtual DOM tree It compares this tree with the previous Virtual DOM tree It computes a set of changes called mutations It applies only those changes to the real DOM And so, this process is used to avoid unnecessary DOM operations, which end up being expensive. Coming to React, s Diffing Algorithm - React, s Diffing Algorithm is a part of the reconciliation process, where its primary goal is to minimize DOM updates. Now it is important to understand how this takes place, so please look into this carefully: The expensive but optimal component is (O(n3 ) ) React uses a tree-diffing algorithm to minimize DOM Hence, it uses a heuristic O(n) algorithm instead of specific assumptions What it essentially does is compare root elements, then if they differ, the entire subtree is replaced, and if they match, then its attributes and the recursion on children are compared. There are some rules of diffing that you really need to keep in mind:",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is reconciliation? How does React's diffing algorithm work?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is reconciliation? How does React's diffing algorithm work?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-keys-are-used-to-match-children-in-lists",
    title: "Keys are used to match children in lists",
    prompt: "Keys are used to match children in lists, explain the behavior and mechanism.",
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
        text: "Keys are used to format the visual typography of list bullet points.",
        isCorrect: false,
        explanation: "CSS `list-style` formats bullet points; keys manage Virtual DOM reconciliation identity."
      },
      {
        id: "B",
        text: "Keys are required only for server-side database indexing.",
        isCorrect: false,
        explanation: "Keys are client-side JSX attributes essential for Virtual DOM list diffing."
      },
      {
        id: "C",
        text: "Keys give list children stable identities across renders, allowing React to match items during reorders, insertions, or deletions to preserve component state and avoid DOM thrashing.",
        isCorrect: true,
        explanation: "Correct. Keys ensure efficient list reconciliation; without stable keys (or with array indices), reordering causes state bugs and unnecessary DOM recreation."
      },
      {
        id: "D",
        text: "Keys must be regenerated as random `Math.random()` numbers on every render.",
        isCorrect: false,
        explanation: "Using random keys on every render destroys and recreates DOM nodes unnecessarily on every update."
      }
    ],
    correctAnswer: "C",
    explanation: "When reconciling lists, React uses the key prop to identify which items have stayed the same, moved, or have been added or removed For eg: There is a reason why these keys are critical: They provide a stable identity across renders Prevent incorrect reuse of DOM nodes Preserve component state Without stable keys, React falls back to index-based matching What you must also note is that Reordering can lead to state being assigned to the wrong component, unnecessary re-renders, and even UI inconsistencies. You must be wondering why the complexity is O(n) instead of O(n, ) - A full tree comparison would require checking every node against every other node, which then results in O(n, ) complexity. React reduces this to O(n) using two assumptions: Different element types produce different subtrees - Because of this, there is no need to deeply compare and replace directly Keys uniquely identify elements in lists - Enables efficient matching of children without exhaustive comparison These heuristics make React perform reconciliation in linear time relative to the number of elements. Now this was all you needed to know about reconciliation, Here, s a short answer that you can prepare if the interviewer isn, t expecting anything detailed: Reconciliation is the process by which React compares the previous and new Virtual DOM trees to compute the minimal DOM updates. It uses a heuristic O(n) diffing algorithm based on two assumptions: elements of different types produce different trees, and keys provide a stable identity for list elements. Now you are good to go!",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Keys are used to match children in lists.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Keys are used to match children in lists.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "Portals create encrypted VPN network tunnels between browser tabs.",
        isCorrect: false,
        explanation: "React Portals control DOM subtree render locations, not network VPN tunnels."
      },
      {
        id: "B",
        text: "Portals are only supported in Node.js server terminal applications.",
        isCorrect: false,
        explanation: "Portals are client-side `react-dom` rendering utilities for browser DOM trees."
      },
      {
        id: "C",
        text: "Portals permanently delete the child component from memory when clicked.",
        isCorrect: false,
        explanation: "Portals render active, interactive React components into alternate DOM nodes."
      },
      {
        id: "D",
        text: "`ReactDOM.createPortal(child, domNode)` renders children into a different DOM container outside the parent hierarchy while preserving React tree context and event bubbling.",
        isCorrect: true,
        explanation: "Correct. Portals are ideal for modals, tooltips, and dropdowns that need to break out of parent `overflow: hidden` or `z-index` stacking contexts while retaining React event propagation."
      }
    ],
    correctAnswer: "D",
    explanation: "When you work with React, you might have noticed how a component renders inside its parent in the DOM. But even so, there are times when you don, t necessarily want that. For example, think of a modal. Even if the modal component is written deep inside your component tree, you usually want it to appear at the top of the page, and not stuck inside some parent container. And to mitigate this very problem, Portals are used. So, you don't have to render from your usual place, and run something like: This practically commands to render the component elsewhere in the DOM. Now, here, s how you can set it up: First write, Then, from anywhere in your React app, you can render into it like this: Even when it, s done, you need to keep this in mind that even though the modal is rendered outside the parent in the DOM, it still showcases like a normal React child. Which means that it still receives props, it still has access to context, and event handling still works. In fact, event bubbling can take place here. If you click inside a modal rendered via a portal, the event still bubbles up to the parent component in the React tree, and not based on the DOM structure. Now, coming to when to use these Portals, You can say that mostly when UI needs to, break out, of layout restrictions like overflow: hidden, z-index stacking issues. That, s why they, re commonly used for modals, tooltips, dropdowns, and toast notifications.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Portals, and when would you use them?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Portals, and when would you use them?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "React performs an exhaustive O(n^3) tree comparison on every frame to calculate mathematical minimums.",
        isCorrect: false,
        explanation: "An exhaustive tree comparison is O(n^3) and too slow; React uses heuristic assumptions to achieve linear O(n) performance."
      },
      {
        id: "B",
        text: "The Virtual DOM directly manipulates GPU registers to bypass the browser DOM tree entirely.",
        isCorrect: false,
        explanation: "React still renders to the browser DOM via ReactDOM."
      },
      {
        id: "C",
        text: "Virtual DOM completely eliminates all JavaScript garbage collection overhead.",
        isCorrect: false,
        explanation: "Creating VDOM objects allocates JavaScript memory that requires normal garbage collection."
      },
      {
        id: "D",
        text: "On state change, React creates a new VDOM tree, runs a heuristic O(n) diffing algorithm against the previous tree, and batches minimal mutations to the real DOM.",
        isCorrect: true,
        explanation: "Correct. VDOM provides declarative programming and minimizes expensive direct DOM manipulations, though it carries some memory and diffing overhead."
      }
    ],
    correctAnswer: "D",
    explanation: "The virtual DOM in React is an in-memory representation of the real DOM. When state or props change, React creates a new virtual DOM tree, compares it to the previous one using a diffing algorithm, and efficiently updates only the parts of the real DOM that changed. Benefits: It improves performance by reducing costly direct DOM manipulations and makes UI updates declarative and predictable. Downsides: There's some overhead from diffing and extra memory usage, and in very dynamic UIs, it may not always outperform manual optimizations. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does virtual DOM in React work? What are its benefits and downsides?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does virtual DOM in React work? What are its benefits and downsides?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "A native mobile operating system that runs React apps without a JavaScript engine.",
        isCorrect: false,
        explanation: "Fiber is the internal architecture of the React JavaScript library."
      },
      {
        id: "B",
        text: "A hardware accelerator card installed on web servers to render React pages.",
        isCorrect: false,
        explanation: "Fiber is a software data structure and scheduling algorithm in JavaScript."
      },
      {
        id: "C",
        text: "React's internal reconciliation architecture that represents the component tree as a linked list of fibers, enabling incremental rendering, interruptible work, and priority scheduling.",
        isCorrect: true,
        explanation: "Correct. Fiber rewrote React's stack reconciler into a linked list structure, allowing React to yield execution to the browser, prioritize urgent user input, and pause non-urgent rendering."
      },
      {
        id: "D",
        text: "A CSS stylesheet preprocessor developed by Meta to replace Sass and Less.",
        isCorrect: false,
        explanation: "Fiber is React's core internal JavaScript reconciliation engine, not a CSS tool."
      }
    ],
    correctAnswer: "C",
    explanation: "React Fiber is a complete rewrite of the React core algorithm, designed to improve performance and enable new features like async rendering, error boundaries, and incremental rendering. It breaks down the rendering process into smaller chunks, allowing React to pause, abort, or prioritize updates as needed. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is React Fiber?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is React Fiber?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "100-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "`push` clears all browser cookies; `replace` preserves them.",
        isCorrect: false,
        explanation: "History navigation methods do not alter browser cookies."
      },
      {
        id: "B",
        text: "`push` adds a new entry onto the history stack (user can navigate back with the back button); `replace` overwrites the current history entry (back button returns to the entry before).",
        isCorrect: true,
        explanation: "Correct. `push` appends a new URL to history, while `replace` substitutes the active URL, ideal for redirects or login screens where users shouldn't navigate back."
      },
      {
        id: "C",
        text: "`replace` deletes the entire browser history database permanently.",
        isCorrect: false,
        explanation: "`replace` only overwrites the current active history entry."
      },
      {
        id: "D",
        text: "`push` executes on the client; `replace` executes on the server.",
        isCorrect: false,
        explanation: "Both methods operate on the client browser history stack."
      }
    ],
    correctAnswer: "B",
    explanation: "The push and replace methods of the history library are used to manage the browser's history stack and control navigation. push: Adds a new entry to the history stack, which means the user can navigate back to it using the browser's back button. Example: history.push('/new-page') replace: Replaces the current entry in the history stack with a new one, meaning the user cannot go back to the previous page using the back button. Example: history.replace('/new-page')",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of the push and replace methods of history?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of the push and replace methods of history?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "algorithms-virtual-dom-how-react-batches-updates-and-minimizes-dom",
    title: "Virtual DOM: How React Batches Updates and Minimizes DOM Work",
    prompt: "Virtual DOM: How React Batches Updates and Minimizes DOM Work, explain the behavior and mechanism.",
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
        text: "The Virtual DOM completely replaces the need for browser rendering engines.",
        isCorrect: false,
        explanation: "React applies minimal calculated changes to the browser's real DOM via ReactDOM."
      },
      {
        id: "B",
        text: "React directly modifies real DOM nodes synchronously on every individual keystroke.",
        isCorrect: false,
        explanation: "React batches updates and reconciles via the Virtual DOM to prevent layout thrashing."
      },
      {
        id: "C",
        text: "React batches state updates within the event loop, creates a new in-memory VDOM, diffs it against the old VDOM, and applies minimal batched mutations to the real DOM.",
        isCorrect: true,
        explanation: "Correct. Virtual DOM diffing combined with automatic state batching minimizes expensive DOM reflows and repaints, ensuring high-performance UI updates."
      },
      {
        id: "D",
        text: "React writes all updates to disk before rendering them to the screen.",
        isCorrect: false,
        explanation: "Virtual DOM operations execute entirely in RAM."
      }
    ],
    correctAnswer: "C",
    explanation: "Virtual DOM is an in-memory representation of UI elements. React updates the virtual DOM first, diffs it against the previous version, then applies the minimal set of fundamental DOM changes. This reduces costly DOM operations. How it helps: React compares virtual DOM trees and calculates the least work to update the real DOM. Keys help the diffing algorithm identify moved or removed items. React also batches state updates inside events for efficiency.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Virtual DOM: How React Batches Updates and Minimizes DOM Work.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Virtual DOM: How React Batches Updates and Minimizes DOM Work.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "algorithms-types-of-side-effects-in-components-and-how-to-manage-c",
    title: "Types of Side Effects in Components and How to Manage Cleanup",
    prompt: "Types of Side Effects in Components and How to Manage Cleanup, explain the behavior and mechanism.",
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
        text: "Side effects only exist in class components and cannot be run in functional components.",
        isCorrect: false,
        explanation: "Functional components manage side effects cleanly using the `useEffect` hook."
      },
      {
        id: "B",
        text: "Side effects include network requests, subscriptions, DOM mutations, and timers; manage cleanup by returning a cleanup function from `useEffect` to avoid memory leaks.",
        isCorrect: true,
        explanation: "Correct. Returning a cleanup function from `useEffect` ensures that timers, event listeners, and subscriptions are cancelled before re-running or unmounting."
      },
      {
        id: "C",
        text: "Cleanup functions are automatically executed by the browser GPU hardware.",
        isCorrect: false,
        explanation: "React invokes effect cleanup functions during unmounting and before subsequent effect runs."
      },
      {
        id: "D",
        text: "Side effects must always be placed directly inside the component render function body.",
        isCorrect: false,
        explanation: "Placing side effects in the render body causes duplicate executions, infinite loops, and breaks React lifecycle rules."
      }
    ],
    correctAnswer: "B",
    explanation: "Side effects include network requests, subscriptions, manual DOM mutations, timers, and logging. Some effects need cleanup to avoid leaks or duplicate work.Two categories: Effects without cleanup: simple requests, logging, and non-persistent actions. Effects with cleanup: subscriptions, timers, and manually attached event listeners. Return a cleanup function from useEffect to remove subscriptions or clear timers. Example: useEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id);}, []); Rules: Keep effect dependencies precise to avoid unnecessary re-runs. Clean up resources to prevent memory leaks and duplicate listeners.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Types of Side Effects in Components and How to Manage Cleanup.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Types of Side Effects in Components and How to Manage Cleanup.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
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
        text: "Create React App (CRA) was an official CLI tool for scaffolding single-page React apps with zero configuration; it is now deprecated in favor of Vite, Next.js, and Remix.",
        isCorrect: true,
        explanation: "Correct. CRA simplified initial React setup for years with preconfigured Webpack and Babel, but is now unmaintained, with Vite and full-stack frameworks taking its place."
      },
      {
        id: "B",
        text: "A native mobile operating system built for smartwatches.",
        isCorrect: false,
        explanation: "CRA was an npm build scaffolding tool for web applications."
      },
      {
        id: "C",
        text: "A CSS stylesheet compiler that replaces Tailwind.",
        isCorrect: false,
        explanation: "CRA bundled Webpack, Babel, and ESLint for React development."
      },
      {
        id: "D",
        text: "A database management system for running real-time SQL queries.",
        isCorrect: false,
        explanation: "CRA was a client-side project scaffolding tool, not a database."
      }
    ],
    correctAnswer: "A",
    explanation: "The create-react-app CLI tool allows you to quickly create & run React applications with no configuration step. Let's create Todo App using CRA: It includes everything we need to build a React app: React, JSX, ES6, and Flow syntax support. Language extras beyond ES6 like the object spread operator. Autoprefixed CSS, so you don, t need -webkit- or other prefixes. A fast interactive unit test runner with built-in support for coverage reporting. A live development server that warns about common mistakes. A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is CRA and its benefits?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is CRA and its benefits?.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
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
        text: "`shouldComponentUpdate()` and `componentDidCatch()`.",
        isCorrect: false,
        explanation: "These methods remain fully supported in class components."
      },
      {
        id: "B",
        text: "`componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate` (aliased with `UNSAFE_` in React 16.3 and removed from modern React due to async rendering hazards).",
        isCorrect: true,
        explanation: "Correct. These legacy lifecycles frequently caused race conditions and memory leaks during async reconciliation, replaced by `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`, and Hooks."
      },
      {
        id: "C",
        text: "`componentDidMount` and `componentWillUnmount`.",
        isCorrect: false,
        explanation: "`componentDidMount` and `componentWillUnmount` remain core stable lifecycle methods in class components."
      },
      {
        id: "D",
        text: "`render()` and `constructor()`.",
        isCorrect: false,
        explanation: "`render` and `constructor` are fundamental class component methods."
      }
    ],
    correctAnswer: "B",
    explanation: "The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering. componentWillMount() componentWillReceiveProps() componentWillUpdate() Starting with React v16.3 these methods are aliased with UNSAFE_ prefix, and the unprefixed version will be removed in React v17.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the lifecycle methods going to be deprecated in React v16?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the lifecycle methods going to be deprecated in React v16?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
    codeSnippet: "<button style={{ ...styles.panel.button...styles.panel.submitButton }}>{'Submit'}</button>\n\n<button style={[styles.panel.button, styles.panel.submitButton]}>{'Submit'}</button>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Use the object spread operator `style={{ ...styles.base, ...styles.active }}` in React web, or array syntax `style={[styles.base, styles.active]}` in React Native.",
        isCorrect: true,
        explanation: "Correct. In web React, object spreading merges multiple style objects together into a single style object passed to the `style` prop."
      },
      {
        id: "B",
        text: "Concatenate style objects as strings `style={styles.a + styles.b}`.",
        isCorrect: false,
        explanation: "Concatenating objects with `+` results in `\"[object Object][object Object]\"` which breaks styling."
      },
      {
        id: "C",
        text: "Pass multiple `style` props `<div style={styleA} style={styleB} />`.",
        isCorrect: false,
        explanation: "Duplicate JSX props overwrite preceding props; object spreading merges them cleanly."
      },
      {
        id: "D",
        text: "Inline styles cannot be combined in React.",
        isCorrect: false,
        explanation: "Object spreading `...` allows combining multiple style objects seamlessly."
      }
    ],
    correctAnswer: "A",
    explanation: "You can use spread operator in regular React: If you're using React Native then you can use the array notation:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to combine multiple inline style objects?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to combine multiple inline style objects?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
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
        text: "Update timers cannot be cleared in React.",
        isCorrect: false,
        explanation: "Returning cleanup functions from `useEffect` ensures clean timer disposal."
      },
      {
        id: "B",
        text: "Write a synchronous `while(true)` loop inside the component render body.",
        isCorrect: false,
        explanation: "Synchronous loops freeze the browser UI and block the entire JavaScript execution thread."
      },
      {
        id: "C",
        text: "Call `window.location.reload()` every 1000ms.",
        isCorrect: false,
        explanation: "Full page reloads cause flashing screens and destroy user experience."
      },
      {
        id: "D",
        text: "Set up `setInterval(() => setTime(Date.now()), 1000)` inside `useEffect`, and return a cleanup function `() => clearInterval(id)` to clear the timer on unmount.",
        isCorrect: true,
        explanation: "Correct. Running `setInterval` inside `useEffect` with proper `clearInterval` cleanup prevents memory leaks, dangling timers, and state updates on unmounted components."
      }
    ],
    correctAnswer: "D",
    explanation: "You need to use setInterval() to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to update a component every second?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to update a component every second?.",
    hints: [
      "Measure before optimising. Ask what the user actually waits for."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
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
        text: "Write raw CSS strings with `-webkit-` inside JSX quotes.",
        isCorrect: false,
        explanation: "React `style` prop requires JavaScript objects with camelCase keys, not raw CSS strings."
      },
      {
        id: "B",
        text: "React automatically downloads vendor prefixes from Google servers on every keystroke.",
        isCorrect: false,
        explanation: "Inline styles require manual camelCase prefixing or CSS build tools with Autoprefixer."
      },
      {
        id: "C",
        text: "Vendor prefixes are illegal in web browsers.",
        isCorrect: false,
        explanation: "Vendor prefixes are standard browser engine extensions."
      },
      {
        id: "D",
        text: "Capitalize vendor prefixes in inline style objects (e.g. `WebkitTransform: '...'`, `MozTransform: '...'`), with `ms` remaining lowercase (`msTransform: '...'`).",
        isCorrect: true,
        explanation: "Correct. React does not auto-prefix inline style objects; vendor prefixes must follow JavaScript camelCase conventions (capitalized `Webkit`/`Moz`, lowercase `ms`)."
      }
    ],
    correctAnswer: "D",
    explanation: "React does not apply vendor prefixes automatically. You need to add vendor prefixes manually.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How do you apply vendor prefixes to inline styles in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How do you apply vendor prefixes to inline styles in React?.",
    hints: [
      "A regular function resolves this at call time from its receiver. An arrow captures it at definition time."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
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
        text: "Because JavaScript engines delete class constructors after first execution.",
        isCorrect: false,
        explanation: "Constructors remain on the class; React simply retains the existing instance during updates."
      },
      {
        id: "B",
        text: "React's reconciliation engine preserves component instances across re-renders when the component maintains the same type and position in the tree, reusing the instance instead of re-instantiating.",
        isCorrect: true,
        explanation: "Correct. Re-renders execute the `render()` method, but the component instance and its constructor/mount state remain alive unless unmounted or keyed differently."
      },
      {
        id: "C",
        text: "Constructors actually run on every single frame 60 times per second.",
        isCorrect: false,
        explanation: "Constructors run only once upon initial component instance creation."
      },
      {
        id: "D",
        text: "Because constructors can only run on January 1st.",
        isCorrect: false,
        explanation: "Constructor lifecycle execution is controlled by React's reconciliation tree matching."
      }
    ],
    correctAnswer: "B",
    explanation: "React's reconciliation algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it's the same component as before, so reuses the previous instance rather than creating a new one.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why is a component constructor called only once?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why is a component constructor called only once?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "`replace()` deletes all previous browser history permanently.",
        isCorrect: false,
        explanation: "`replace()` only substitutes the current active location entry."
      },
      {
        id: "B",
        text: "`push()` deletes cookies; `replace()` clears local storage.",
        isCorrect: false,
        explanation: "History methods manipulate the browser navigation stack, not storage."
      },
      {
        id: "C",
        text: "`push()` executes on the server; `replace()` executes in the browser.",
        isCorrect: false,
        explanation: "Both operate in client-side browser navigation history."
      },
      {
        id: "D",
        text: "`push()` pushes a new entry onto the history stack (user can navigate back); `replace()` replaces the current entry (back button returns to the previous page).",
        isCorrect: true,
        explanation: "Correct. `push` records a new navigation step, while `replace` overwrites the active location, ideal for redirects and login flows."
      }
    ],
    correctAnswer: "D",
    explanation: "A history instance has two methods for navigation purpose. push() replace() If you think of the history as an array of visited locations, push() will add a new location to the array and replace() will replace the current location in the array with the new one.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of push() and replace() methods of history?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of push() and replace() methods of history?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
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
        text: "Relay compiles React code into WebAssembly.",
        isCorrect: false,
        explanation: "Relay is a data-fetching framework for React and GraphQL."
      },
      {
        id: "B",
        text: "Relay is a GraphQL client that collocates data requirements with components via fragments, managing server caching automatically; Redux is a general-purpose local/global state container.",
        isCorrect: true,
        explanation: "Correct. Relay focuses on declaratively fetching, caching, and normalizing GraphQL server data, whereas Redux manages arbitrary application-wide client/server state."
      },
      {
        id: "C",
        text: "Relay only works with REST APIs; Redux only works with GraphQL.",
        isCorrect: false,
        explanation: "Relay is built specifically for GraphQL, whereas Redux is protocol-agnostic."
      },
      {
        id: "D",
        text: "There are no differences; Relay is a rename of Redux.",
        isCorrect: false,
        explanation: "Relay (by Meta) and Redux (by Dan Abramov) are distinct architectures."
      }
    ],
    correctAnswer: "B",
    explanation: "Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via GraphQL queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How Relay is different from Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How Relay is different from Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "A hook called on every mouse click.",
        isCorrect: false,
        explanation: "It is an Error Boundary lifecycle method triggered only on child component errors."
      },
      {
        id: "B",
        text: "A method that catches network disconnects and reconnects the Wi-Fi.",
        isCorrect: false,
        explanation: "`componentDidCatch` catches JavaScript runtime errors in React rendering."
      },
      {
        id: "C",
        text: "A method that catches syntax errors during Webpack compilation.",
        isCorrect: false,
        explanation: "`componentDidCatch` runs in the browser runtime when child components throw during rendering."
      },
      {
        id: "D",
        text: "`componentDidCatch(error, info)` is called after an error is thrown in a descendant; it receives the thrown error and an `info` object containing the `componentStack` trace, ideal for error logging.",
        isCorrect: true,
        explanation: "Correct. `componentDidCatch` runs during the commit phase, making it the appropriate place to log errors and component stack traces to reporting services like Sentry."
      }
    ],
    correctAnswer: "D",
    explanation: "The componentDidCatch lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters, error: - The error object which was thrown info: - An object with a componentStack key contains the information about which component threw the error. The method structure would be as follows: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Can you describe about componentDidCatch lifecycle method signature?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Can you describe about componentDidCatch lifecycle method signature?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
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
        text: "An algorithm that sorts numbers in ascending order.",
        isCorrect: false,
        explanation: "The diffing algorithm compares Virtual DOM trees to minimize DOM updates."
      },
      {
        id: "B",
        text: "React's heuristic O(n) reconciliation algorithm that compares two virtual trees based on element types and `key` props to generate the minimum set of DOM mutations.",
        isCorrect: true,
        explanation: "Correct. Generic tree comparison algorithms have O(n^3) complexity; React's heuristic algorithm assumes different types produce different trees and keys identify stable siblings, achieving O(n) performance."
      },
      {
        id: "C",
        text: "A compression algorithm that compresses JPEG images.",
        isCorrect: false,
        explanation: "Diffing reconciles virtual element trees in React's rendering pipeline."
      },
      {
        id: "D",
        text: "A cryptographic hashing algorithm for blockchain transactions.",
        isCorrect: false,
        explanation: "Diffing is React's internal tree reconciliation heuristic."
      }
    ],
    correctAnswer: "B",
    explanation: "React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n3) where n is the number of elements in the tree. In this case, for displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions: Two elements of different types will produce different trees. The developer can hint at which child elements may be stable across different renders with a key prop.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is diffing algorithm?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is diffing algorithm?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
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
        text: "1) Diffing only runs once per year; 2) Diffing requires Python 2.7.",
        isCorrect: false,
        explanation: "Diffing runs on every state/prop update in the browser JavaScript engine."
      },
      {
        id: "B",
        text: "1) All elements are deleted on every render; 2) Keys are ignored; 3) Attributes cannot be changed.",
        isCorrect: false,
        explanation: "These contradict React's reconciliation rules."
      },
      {
        id: "C",
        text: "1) Different element types tear down and rebuild subtree; 2) Same DOM types update only changed attributes; 3) Same component types preserve instance/state; 4) Children diffing uses `key` props.",
        isCorrect: true,
        explanation: "Correct. These four core rules allow React to efficiently reconcile virtual trees and perform minimal real DOM operations in O(n) time."
      },
      {
        id: "D",
        text: "There are no rules; React regenerates the entire HTML document on every frame.",
        isCorrect: false,
        explanation: "React uses heuristic rules to avoid full-page rebuilds."
      }
    ],
    correctAnswer: "C",
    explanation: "When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm, Elements Of Different Types: Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements to, or from to of different types lead a full rebuild. DOM Elements Of The Same Type: When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute, Component Elements Of The Same Type: When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result. Recursing On Children: when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there, s a difference. For example, when adding an element at the end of the children, converting between these two trees works well. Handling keys: React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the rules covered by diffing algorithm?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the rules covered by diffing algorithm?.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
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
        text: "Compiling TypeScript into Python bytecode.",
        isCorrect: false,
        explanation: "Portals are a DOM rendering feature of `react-dom`."
      },
      {
        id: "B",
        text: "Modals, dialogs, tooltips, hovercards, and toast notifications that need to break out of parent containers with `overflow: hidden`, `z-index`, or stacking context constraints.",
        isCorrect: true,
        explanation: "Correct. `createPortal` renders children into a separate DOM container (like `document.body`) while preserving React component hierarchy, events, and context."
      },
      {
        id: "C",
        text: "Transferring large SQL database backups over WebSockets.",
        isCorrect: false,
        explanation: "Portals render React UI elements into alternate DOM nodes."
      },
      {
        id: "D",
        text: "Encrypting passwords before sending to an API.",
        isCorrect: false,
        explanation: "Portals manage DOM element mounting targets."
      }
    ],
    correctAnswer: "B",
    explanation: "React portals are very useful when a parent component has overflow: hidden or has properties that affect the stacking context(z-index,position,opacity etc styles) and you need to visually, break out, of its container. For example, dialogs, global message notifications, hovercards, and tooltips.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the typical use case of portals?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the typical use case of portals?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
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
        text: "Old transform was written in Python; New transform is written in C++.",
        isCorrect: false,
        explanation: "Both are compiler plugins implemented in Babel, SWC, and TypeScript."
      },
      {
        id: "B",
        text: "Old transform compiled `<h1 />` to `React.createElement('h1')` (requiring `React` in scope); New transform imports `_jsx` from `react/jsx-runtime` (`_jsx('h1', { ... })`) automatically without needing `React` in scope.",
        isCorrect: true,
        explanation: "Correct. The new transform delegates element creation to dedicated compiler runtime helpers (`react/jsx-runtime`), decoupling JSX from the global `React` object namespace."
      },
      {
        id: "C",
        text: "There is no difference; they output identical byte code.",
        isCorrect: false,
        explanation: "The new transform outputs direct calls to `_jsx` from `react/jsx-runtime` rather than `React.createElement`."
      },
      {
        id: "D",
        text: "Old transform only ran on Internet Explorer 6.",
        isCorrect: false,
        explanation: "The old transform was the standard JSX transpilation mechanism for all browsers prior to React 17."
      }
    ],
    correctAnswer: "B",
    explanation: "The new JSX transform automatically imports the special JSX runtime functions from the compiler package (e.g. react/jsx-runtime) instead of converting JSX tags into React.createElement calls. Consequently, 'import React from 'react'' is no longer required in scope solely for writing JSX, slightly reducing bundle size and improving compilation performance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does new JSX transform different from old transform?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does new JSX transform different from old transform?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  }
];
