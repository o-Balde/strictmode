import { QuizQuestion } from '../types';

export const LIVE_CODING_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-how-does-react-router-work-and-how-do-you-implement-dyn",
    title: "How does React Router work, and how do you implement dynamic routing?",
    prompt: "How does React Router work, and how do you implement dynamic routing?",
    level: "junior",
    type: "live_code",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';\nfunction UserPage() {  const { id } = useParams(); // Access dynamic parameter  return <h1>User ID: {id}</h1>;}\nexport default function App() {  return (    <BrowserRouter>      <Routes>        <Route path=\"/user/:id\" element={<UserPage />} /> {/* Dynamic path */}      </Routes>    </BrowserRouter>  );}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "React Router maps URL paths to components, enabling navigation in single-page apps.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router maps URL paths to components, enabling navigation in single-page apps. Dynamic routing allows you to use URL parameters to render components based on dynamic values. Key features: Dynamic Segments: :id captures dynamic data from the URL. useParams Hook: Accesses these dynamic values for rendering.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How does React Router work, and how do you implement dynamic routing?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How does React Router work, and how do you implement dynamic routing?.",
    hints: [
      "Routing maps a URL to a component. Ask what the URL owns, and what the component owns."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing"
  },
  {
    id: "react-how-would-you-implement-route-guards-or-private-routes",
    title: "How would you implement route guards or private routes in React?",
    prompt: "How would you implement route guards or private routes in React?",
    level: "junior",
    type: "live_code",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import { Navigate } from 'react-router-dom';\nfunction PrivateRoute({ children }) {  return isAuthenticated ? children: <Navigate to=\"/login\" />;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "To implement private routes, create a component that checks if the user is authenticated before rendering the desired route.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "To implement private routes, create a component that checks if the user is authenticated before rendering the desired route. Example: PrivateRoute: Checks authentication and either renders the children (protected routes) or redirects to the login page. <Navigate>: Replaces the deprecated <Redirect> for redirecting in React Router v6+.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How would you implement route guards or private routes in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How would you implement route guards or private routes in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-write-a-comment-in-react",
    title: "How to Write a Comment in React?",
    prompt: "How to Write a Comment in React?",
    level: "junior",
    type: "live_code",
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
        text: "In JavaScript and JSX: Single line: // This is a single-line comment Multi-line: /* This is a multi-",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "In JavaScript and JSX: Single line: // This is a single-line comment Multi-line: /* This is a multi-line comment */",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to Write a Comment in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to Write a Comment in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-write-a-program-to-create-a-counter-with-increment-and",
    title: "Write a Program to Create a Counter with Increment and Decrement",
    prompt: "Write a Program to Create a Counter with Increment and Decrement, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
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
        text: "Example component using useState:import React, { useState } from \"react\";const App = () => { const [",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Example component using useState:import React, { useState } from \"react\";const App = () => { const [counter, setCounter] = useState(0); const handleClick1 = () => setCounter(counter + 1); const handleClick2 = () => setCounter(counter - 1); return ( <div> <div>{counter}</div> <div className=\"buttons\"> <button onClick={handleClick1}>Increment</button> <button onClick={handleClick2}>Decrement</button> </div> </div> );};export default App;",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Write a Program to Create a Counter with Increment and Decrement.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Write a Program to Create a Counter with Increment and Decrement.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-jsx-what-it-is-and-why-we-write-it",
    title: "JSX: What It Is and Why We Write It",
    prompt: "JSX: What It Is and Why We Write It, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
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
        text: "JSX lets you write HTML-like syntax inside JavaScript.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "JSX lets you write HTML-like syntax inside JavaScript. It is syntactic sugar for React.createElement calls. Browsers do not understand JSX directly, so build tools transpile it to plain JavaScript. Example: const el = <div><p>Hello</p></div>;transpiles roughly toReact.createElement('div', null, React.createElement('p', null, 'Hello')); Notes: JSX can embed expressions with {}. Use className instead of class and htmlFor instead of for. You can write React without JSX, but JSX stays more concise and readable for component markup.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of JSX: What It Is and Why We Write It.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of JSX: What It Is and Why We Write It.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-write-comments-in-react",
    title: "How to write comments in React?",
    prompt: "How to write comments in React?",
    level: "junior",
    type: "live_code",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "<div>\n  {/* Single-line comments(In vanilla JavaScript, the single-line comments are represented by double slash(//)) */}\n  {`Welcome ${user}, let's play React`}\n</div>\n\n<div>\n  {/* Multi-line comments for more than\n  one line */}\n  {`Welcome ${user}, let's play React`}\n</div>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces. Single-line comments: Multi-line comments:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to write comments in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to write comments in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-how-to-implement-default-or-notfound-page",
    title: "How to implement default or NotFound page?",
    prompt: "How to implement default or NotFound page?",
    level: "junior",
    type: "live_code",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "<Switch>\n  <Route exact path=\"/\" component={Home} />\n  <Route path=\"/user\" component={User} />\n  <Route component={NotFound} />\n</Switch>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "A <Switch> renders the first child <Route> that matches.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches. So you just need to simply drop path attribute as below: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to implement default or NotFound page?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to implement default or NotFound page?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-are-the-different-ways-to-write-mapdispatchtoprops",
    title: "What are the different ways to write mapDispatchToProps()?",
    prompt: "What are the different ways to write mapDispatchToProps()?",
    level: "junior",
    type: "live_code",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "const mapDispatchToProps = (dispatch) => ({\n  action: () => dispatch(action()),\n});\n\nconst mapDispatchToProps = (dispatch) => ({\n  action: bindActionCreators(action, dispatch),\n});\n\nconst mapDispatchToProps = { action };",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There are a few ways of binding action creators to dispatch() in mapDispatchToProps().",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "There are a few ways of binding action creators to dispatch() in mapDispatchToProps(). Below are the possible options: The third option is just a shorthand for the first one.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the different ways to write mapDispatchToProps()?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the different ways to write mapDispatchToProps()?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "react-do-i-need-to-rewrite-all-my-class-components-with-hooks",
    title: "Do I need to rewrite all my class components with hooks?",
    prompt: "Do I need to rewrite all my class components with hooks?",
    level: "junior",
    type: "live_code",
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
        text: "Do I need to rewrite all my class components with hooks?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do I need to rewrite all my class components with hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do I need to rewrite all my class components with hooks?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "system_design-how-do-you-implement-code-splitting-and-lazy-loading-in",
    title: "How do you implement code splitting and lazy loading in a React app?",
    prompt: "How do you implement code splitting and lazy loading in a React app?",
    level: "senior",
    type: "live_code",
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
        text: "24 const HeavyChart = lazy ( ( ) = > import ( '.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Code splitting breaks your bundle into smaller chunks loaded on demand. This reduces initial load time and only downloads code the user needs. Why code splitting matters: Default: all JS in one bundle, user downloads everything on first load With splitting: user downloads only what they need for current page Result: 50-80% reduction in initial bundle size for large apps Three levels of code splitting: Route-level, split by page (most impactful, easiest) Component-level, split heavy components (charts, editors, modals) Library-level, split third-party libraries (moment, lodash) React tools: React.lazy() + Suspense, built-in dynamic imports loadable-components, SSR-compatible alternative Vite/webpack, automatic chunk splitting What to lazy load: Heavy chart libraries (Recharts, D3, Chart.js) Rich text editors (TipTap, Quill, Monaco) Below-the-fold components Admin/settings pages 1 // Route-level code splitting (most important!) 2 import { lazy, Suspense } from 'react' 3 import { Routes, Route } from 'react-router-dom' 4 5 // Lazy import: NOT downloaded until user navigates here 6 const Dashboard = lazy ( ( ) = > import ( './pages/Dashboard' ) ) 7 const Analytics = lazy ( ( ) = > import ( './pages/Analytics' ) ) 8 const Settings = lazy ( ( ) = > import ( './pages/Settings' ) ) 9 10 function App ( ) { 11 return ( 12 < Suspense fallback = { < PageSkeleton / > } > 13 < Routes > 14 < Route path = '/' element = { < Home / > } / > // eager 15 < Route path = '/dashboard' element = { < Dashboard / > } / > // lazy 16 < Route path = '/analytics' element = { < Analytics / > } / > // lazy 17 < Route path = '/settings' element = { < Settings / > } / > // lazy 18 < / Routes > 19 < / Suspense > 20 ) 21 } 22 23 // Component-level: heavy chart only when needed",
    interviewLine: "Code splitting breaks your bundle into smaller chunks loaded on demand.",
    misconception: "This reduces initial load time and only downloads code the user needs.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "system_design-how-do-you-implement-infinite-scroll-with-cursor-based",
    title: "How do you implement infinite scroll with cursor-based pagination?",
    prompt: "How do you implement infinite scroll with cursor-based pagination?",
    level: "senior",
    type: "live_code",
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
        text: "30 { threshold: 0.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Infinite scroll loads the next page of data as user approaches the bottom of the list. Cursor-based pagination is more reliable than offset-based for real-time data. Cursor vs Offset pagination: Offset: page=2&limit=20, simple but breaks if items added mid-scroll Cursor: cursor=last_item_id&limit=20, stable, consistent, scalable Cursor is the industry standard for feeds (Twitter, Instagram, TikTok) Intersection Observer (no scroll event needed): Attach observer to a sentinel element at list bottom Fires when sentinel enters viewport Much more performant than scroll event listeners UX requirements: Skeleton loaders while fetching next page End-of-list message when no more data Scroll position preserved on back navigation (React Query handles this!) 1 // Infinite scroll with React Query + Intersection Observer 2 const useFeed = ( ) = > { 3 return useInfiniteQuery ( { 4 queryKey: [ 'feed' ], 5 queryFn: ( { pageParam } ) = > 6 api. getFeed ( { cursor: pageParam, limit: 20 } ), 7 initialPageParam: null, 8 getNextPageParam: ( lastPage ) = > 9 lastPage. nextCursor? ? undefined, // undefined = no more pages 10 } ) 11 } 12 13 const Feed = ( ) = > { 14 const { 15 data, 16 fetchNextPage, 17 hasNextPage, 18 isFetchingNextPage 19 } = useFeed ( ) 20 21 // Sentinel ref, observe this element 22 const sentinelRef = useRef ( null ) 23 24 useEffect ( ( ) = > { 25 const observer = new IntersectionObserver ( 26 ( [ entry ] ) = > { 27 if ( entry. isIntersecting & & hasNextPage & &! isFetchingNextPage ) 28 fetchNextPage ( ) 29 }",
    interviewLine: "Infinite scroll loads the next page of data as user approaches the bottom of the list.",
    misconception: "Cursor-based pagination is more reliable than offset-based for real-time data.",
    hints: [
      "Rendering only the visible rows keeps the DOM small. The cost moves to measurement and scroll bookkeeping."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/virtualize-long-lists-react-window"
  },
  {
    id: "system_design-how-do-you-implement-performance-monitoring-and-error-t",
    title: "How do you implement performance monitoring and error tracking in a frontend app?",
    prompt: "How do you implement performance monitoring and error tracking in a frontend app?",
    level: "senior",
    type: "live_code",
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
        text: "25 return < ErrorFallback onReset = { ( ) = > this.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Production monitoring catches issues users experience that you never see in dev. What to monitor: JavaScript errors, unhandled exceptions and promise rejections Performance metrics, Core Web Vitals, API response times User interactions, clicks, form submissions, navigation timing Network requests, failed API calls, slow endpoints Error tracking stack: Sentry, industry standard, captures errors with stack traces, replays LogRocket, session replay + errors Datadog RUM, enterprise option Performance monitoring: Lighthouse CI, automated perf testing in CI pipeline web-vitals library, report CWV from real users Google Analytics 4, user behaviour Error boundary, catch React render errors: Wraps component tree Shows fallback UI instead of blank white screen Reports error to Sentry 1 // Sentry setup 2 import * as Sentry from '@sentry/react' 3 Sentry. init ( { 4 dsn: process. env. REACT_APP_SENTRY_DSN, 5 environment: process. env. NODE_ENV, 6 tracesSampleRate: 0. 1, // 10% of transactions 7 replaysSessionSampleRate: 0. 01, // 1% session replay 8 integrations: [ Sentry. browserTracingIntegration ( ) ], 9 } ) 10 11 // Error Boundary: catch render errors 12 class ErrorBoundary extends React. Component { 13 state = { hasError: false, error: null } 14 15 static getDerivedStateFromError ( error ) { 16 return { hasError: true, error } 17 } 18 19 componentDidCatch ( error, info ) { 20 Sentry. captureException ( error, { extra: info } ) 21 } 22 23 render ( ) { 24 if ( this. state. hasError )",
    interviewLine: "Production monitoring catches issues users experience that you never see in dev.",
    misconception: "What to monitor: JavaScript errors, unhandled exceptions and promise rejections Performance metrics, Core Web Vitals, API response times User interactions, clicks, form submissions, navigation timing Network requests: failed",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "nextjs-how-do-you-implement-frontend-security-227-xss-csrf-csp",
    title: "How do you implement frontend security, XSS, CSRF, CSP?",
    prompt: "How do you implement frontend security, XSS, CSRF, CSP?",
    level: "senior",
    type: "live_code",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Frontend security prevents attackers from stealing data, hijacking sessions, and injecting malicious code.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Frontend security prevents attackers from stealing data, hijacking sessions, and injecting malicious code. XSS (Cross-Site Scripting): Attacker injects malicious JS into your page React escapes HTML by default, dangerouslySetInnerHTML is dangerous! Sanitize user input before rendering as HTML (DOMPurify) HttpOnly cookies prevent token theft via XSS CSRF (Cross-Site Request Forgery): Attacker tricks user's browser into making authenticated requests Prevention: SameSite=Strict cookies + CSRF tokens for mutations Content Security Policy (CSP): HTTP header that tells browser which sources are allowed Blocks inline scripts, eval(), external scripts Most powerful XSS defence Other frontend security essentials: HTTPS everywhere, HTTP Strict Transport Security header Subresource Integrity, verify CDN scripts not tampered Referrer Policy, don't leak URL in referrer header 1 // XSS: dangerous pattern vs safe pattern 2 // NEVER do this with user content: 3 // <div dangerouslySetInnerHTML={{ __html: userBio }} /> 4 5 // SAFE: sanitize with DOMPurify first 6 import DOMPurify from 'dompurify' 7 const SafeHtml = ( { html } ) = > ( 8 < div dangerouslySetInnerHTML = { { 9 __html: DOMPurify. sanitize ( html, { ALLOWED_TAGS: [ 'b', 'i', 'a', 'p' ] } ) 10 } } / > 11 ) 12 13 // CSP header (set in server response or Next.js headers) 14 // Content-Security-Policy: 15 // default-src 'self'; only same origin 16 // script-src 'self' cdn.myapp.com; allow CDN scripts 17 // style-src 'self' 'nonce-abc123'; allow nonce-tagged styles 18 // img-src 'self' data: https:; allow images from HTTPS 19 // frame-ancestors 'none'; prevent clickjacking 20 21 // Next.js: CSP via headers in next.config.js 22 const csp = [ 23 `default-src 'self'`, 24 `script-src 'self' 'nonce-${nonce}'`, 25 `style-src 'self' 'unsafe-inline'`",
    interviewLine: "Frontend security prevents attackers from stealing data, hijacking sessions, and injecting malicious code.",
    misconception: "XSS (Cross-Site Scripting): Attacker injects malicious JS into your page React escapes HTML by default, dangerouslySetInnerHTML is dangerous!",
    hints: [
      "Never trust input at a boundary. Ask what is escaped, where, and by whom."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/Security"
  },
  {
    id: "system_design-how-do-you-implement-optimistic-ui-updates-n-answer-opt",
    title: "How do you implement optimistic UI updates?",
    prompt: "How do you implement optimistic UI updates?",
    level: "senior",
    type: "live_code",
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
        text: "27 } 28 } ) 29 } 30 31 // Pattern 2: Manual optimistic update 32 const [ localLiked, setLocalLiked ] = useState ( post.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Optimistic updates update the UI immediately before server confirmation, making the app feel instantaneous even with slow networks. How optimistic updates work: User performs action (like, comment, delete) UI updates immediately (don't wait for server) API call made in background If API succeeds, nothing to do, UI already correct If API fails, rollback UI to previous state, show error Where to use: Like / upvote / reactions, user expects instant feedback Mark as read, should feel instant Delete items, remove immediately, undo if server fails Follow/unfollow, button should toggle instantly Where NOT to use: Payments, never fake success for financial transactions Complex mutations with side effects you can't predict When rollback UX would be confusing 1 // Pattern 1: React Query optimistic update (recommended) 2 const useToggleLike = ( ) = > { 3 const queryClient = useQueryClient ( ) 4 return useMutation ( { 5 mutationFn: ( postId ) = > api. toggleLike ( postId ), 6 onMutate: async ( postId ) = > { 7 // Cancel any outgoing refetches 8 await queryClient. cancelQueries ( { queryKey: [ 'posts' ] } ) 9 // Snapshot for rollback 10 const prevPosts = queryClient. getQueryData ( [ 'posts' ] ) 11 // Optimistic update, toggle like immediately 12 queryClient. setQueryData ( [ 'posts' ], old = > old. map ( p = > 13 p. id = = = postId 14? {.. p, liked! p. liked, likeCount: p. likeCount + ( p. liked? - 1: 1 ) } 15: p 16 ) ) 17 return { prevPosts } // pass snapshot to onError 18 }, 19 onError: ( err, postId, context ) = > { 20 // Rollback to snapshot 21 queryClient. setQueryData ( [ 'posts' ], context. prevPosts ) 22 toast. error ( 'Failed to like post. Please try again.' ) 23 }, 24 onSettled: ( ) = > { 25 // Always sync with server when done 26 queryClient. invalidateQueries ( { queryKey: [ 'posts' ] } )",
    interviewLine: "Optimistic updates update the UI immediately before server confirmation, making the app feel instantaneous even with slow networks.",
    misconception: "How optimistic updates work: User performs action (like, comment, delete) UI updates immediately (don't wait for server) API call made in background If API succeeds, nothing to do, UI already correct If API fails, rollback UI to previous st",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "system_design-how-do-you-implement-websockets-for-real-time-collabora",
    title: "How do you implement WebSockets for real-time collaboration?",
    prompt: "How do you implement WebSockets for real-time collaboration?",
    level: "senior",
    type: "live_code",
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
        text: "28 }, [ connect ] ) 29 30 const send = useCallback ( ( type, payload ) = > { 31 if ( ws ?.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Real-time collaboration (Google Docs-style) is the most complex frontend problem. Multiple users editing the same document simultaneously requires conflict resolution. Approaches by complexity: Polling, simplest, high latency, not true real-time WebSockets, low latency, bidirectional, complex server setup CRDT (Y.js), conflict-free data structures, Google Docs-level collaboration WebSocket design: Establish connection on component mount Handle reconnection with exponential backoff Message protocol, JSON with type field for routing Presence, who else is viewing/editing Cursor positions, real-time cursor sharing Y.js for collaborative editing: Conflict-Free Replicated Data Types Offline support, sync when reconnected Works with TipTap, CodeMirror, ProseMirror 1 // Custom WebSocket hook with reconnection 2 const useWebSocket = ( url ) = > { 3 const [ ws, setWs ] = useState ( null ) 4 const [ connected, setConnected ] = useState ( false ) 5 const reconnectDelay = useRef ( 1000 ) 6 7 const connect = useCallback ( ( ) = > { 8 const socket = new WebSocket ( url ) 9 10 socket. onopen = ( ) = > { 11 setConnected ( true ) 12 reconnectDelay. current = 1000 // reset backoff 13 } 14 socket. onclose = ( ) = > { 15 setConnected ( false ) 16 // Exponential backoff reconnect 17 setTimeout ( connect, reconnectDelay. current ) 18 reconnectDelay. current = Math. min ( reconnectDelay. current * 2, 30000 ) 19 } 20 socket. onerror = ( err ) = > console. error ( 'WS error', err ) 21 setWs ( socket ) 22 return socket 23 }, [ url ] ) 24 25 useEffect ( ( ) = > { 26 const socket = connect ( ) 27 return ( ) = > socket. close ( )",
    interviewLine: "Real-time collaboration (Google Docs-style) is the most complex frontend problem.",
    misconception: "Multiple users editing the same document simultaneously requires conflict resolution.",
    hints: [
      "Ask whether updates flow one way or both, and what happens when the connection drops."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
  },
  {
    id: "system_design-how-do-you-implement-a-frontend-feature-flagging-system",
    title: "How do you implement a frontend feature flagging system?",
    prompt: "How do you implement a frontend feature flagging system?",
    level: "senior",
    type: "live_code",
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
        text: "Feature flags let you deploy code without enabling features, do gradual rollouts, and kill switches for emergencies, all without redeploying.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Feature flags let you deploy code without enabling features, do gradual rollouts, and kill switches for emergencies, all without redeploying. Feature flag use cases: Dark launch, deploy code with flag OFF, enable gradually A/B testing, 50% users see variant A, 50% see variant B Beta testing, enable only for internal users or beta list Kill switch, instantly disable broken feature without deploy Percentage rollout, enable for 5% 25% 100% of users Implementation options: Managed: LaunchDarkly, Flagsmith, Unleash (recommended for teams) DIY: API endpoint + context, simple and effective Architecture: Fetch flags on app load (or with user session) Cache flags, don't block render waiting for flags Fall back to default (off) if flag fetch fails Re-fetch on navigation for fresh flags 1 // DIY feature flag implementation 2 const FeatureFlagContext = createContext ( { } ) 3 4 const FeatureFlagProvider = ( { children } ) = > { 5 const { user } = useAuth ( ) 6 const { data: flags = { } } = useQuery ( { 7 queryKey: [ 'flags', user?. id ], 8 queryFn: ( ) = > api. getFeatureFlags ( { userId: user?. id } ), 9 staleTime: 5 * 60 * 1000, // 5 min cache 10 placeholderData: { }, // don't block render 11 } ) 12 return ( 13 < FeatureFlagContext. Provider value = { flags } > 14 { children } 15 < / FeatureFlagContext. Provider > 16 ) 17 } 18 19 const useFlag = ( flagName, defaultValue = false ) = > { 20 const flags = useContext ( FeatureFlagContext ) 21 return flags [ flagName ]? ? defaultValue 22 } 23 24 // Usage, conditional render 25 const Checkout = ( ) = > { 26 const newCheckoutEnabled = useFlag ( 'new-checkout-v2' ) 27 return newCheckoutEnabled? < NewCheckout / >: < OldCheckout / >",
    interviewLine: "Feature flags let you deploy code without enabling features, do gradual rollouts, and kill switches for emergencies, all without redeploying.",
    misconception: "Feature flag use cases: Dark launch, deploy code with flag OFF, enable gradually A/B testing, 50% users see variant A, 50% see variant B Beta testing, enable only for internal users or beta list Kill switch, instantly disabl",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "system_design-what-are-common-frontend-system-design-mistakes-and-how",
    title: "What are common Frontend System Design mistakes and how to avoid them?",
    prompt: "What are common Frontend System Design mistakes and how to avoid them?",
    level: "senior",
    type: "live_code",
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
        text: "23 ) 24 25 // Mistake 5: CLS from missing image dimensions 26 // n Layout shifts as image loads 27 // <img src='/product.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Understanding common mistakes shows interviewers you have production experience. Mistake 1: Putting everything in Redux Use React Query for server state. Redux only for true global client state. Mistake 2: No code splitting Single 3MB bundle = 10s load time on mobile. Split routes minimum. Mistake 3: Infinite re-renders Object/array literals as props bypass React.memo. Use useMemo/useCallback. Mistake 4: Not handling all UI states Every async operation has: loading, error, empty, success. Design all four. Mistake 5: Hardcoding dimensions Images without width/height cause CLS. Charts without ResponsiveContainer break. Mistake 6: Tokens in localStorage XSS can steal any localStorage value. Use HttpOnly cookies for auth tokens. Mistake 7: No virtualization for long lists 100K DOM nodes crash browsers. Virtualize any list over 500 items. Mistake 8: Prop drilling instead of composition Passing props 6 levels deep is a smell. Lift state or use Context/Zustand. 1 // Mistake 1: Redux for server state 2 // n Old way 3 dispatch ( fetchProducts ( ) ) // action, reducer, selector, so much code! 4 // n React Query 5 const { data } = useQuery ( { queryKey: [ 'products' ], queryFn: api. getProducts } ) 6 7 // Mistake 3: Object prop breaking memo 8 // n New object every render, memo never skips 9 const Child = React. memo ( ( { config } ) = > < div > { config. title } < / div > ) 10 const Parent = ( ) = > < Child config = { { title: 'Hello' } } / > // new object! 11 // n Either use useMemo or pass primitives 12 const Parent = ( ) = > { 13 const config = useMemo ( ( ) = > ( { title: 'Hello' } ), [ ] ) 14 return < Child config = { config } / > 15 } 16 17 // Mistake 7: No virtualization 18 // n 100K DOM nodes 19 const BadList = ( { items } ) = > items. map ( i = > < Row key = { i. id } {.. i } / > ) 20 // n Virtual list, only renders ~20 items 21 const GoodList = ( { items } ) = > ( 22 < VirtualList items = { items } renderItem = { ( item ) = > < Row {.. item } / > } / >",
    interviewLine: "Understanding common mistakes shows interviewers you have production experience.",
    misconception: "Mistake 1: Putting everything in Redux Use React Query for server state.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "algorithms-rotate-array-right-by-k-in",
    title: "Rotate array right by k (in",
    prompt: "Rotate array right by k (in, explain the behavior and mechanism.",
    level: "intermediate",
    type: "live_code",
    category: "algorithms",
    subject: "data-structures",
    tags: [
      "algorithms",
      "data-structures",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "- place\\ Problem: Given an array nums and integer k, rotate the array to the right by k steps in - place.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "- place\\ Problem: Given an array nums and integer k, rotate the array to the right by k steps in - place. Example: def rotate(nums, k\\ n = len(nums\\ k %= n def rev(i, j\\ while i < j: nums[i], nums[j] = nums[j], nums[i] i += 1; j - = 1 rev(0, n - 1\\ rev(0, k - 1\\ rev(k, n - 1\\ # Example arr = [1,2,3,4,5,6,7] rotate(arr, 3\\ print(arr\\ # [5,6,7,1,2,3,4] Explanation: Reverse whole array, reverse first k, reverse rest. Complexity: O(n\\time, O(1\\ extra space Tip: Handles large k with k %= n.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Rotate array right by k (in.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Rotate array right by k (in.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-merge-overlapping-intervals",
    title: "Merge overlapping intervals",
    prompt: "Merge overlapping intervals, explain the behavior and mechanism.",
    level: "intermediate",
    type: "live_code",
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
        text: "Merge overlapping intervals: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: ". Given intervals [[s,e].], merge overlapping intervals. Example: def merge_intervals(intervals\\: if not intervals: return [] intervals.sort(key=lambda x: x[0]\\ merged = [intervals[0]] for s,e in intervals[1:]: last_s, last_e = merged[ - 1] if s <= last_e: merged[ - 1][1] = max(last_e, e\\ else: merged.append([s,e]\\ return merged print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]\\ # [[1,6],[8,10],[15,18]]; Explaination: Sort by start; iterate merging when overlap. Complexity: O(n log n\\due to sort.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Merge overlapping intervals.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Merge overlapping intervals.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "algorithms-majority-element-boyer",
    title: "Majority Element (Boyer",
    prompt: "Majority Element (Boyer, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
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
        text: "Moore Voting Algorithm\\ Problem: Given an array of size n, find the element that appears more than n/2 times.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Moore Voting Algorithm\\ Problem: Given an array of size n, find the element that appears more than n/2 times. Assume such an element always exists. Example: Input: [3,2,3] 3 Input: [2,2,1,1,1,2,2] 2 Approach: Use Boyer Moore Voting Algorithm: keep a candidate and a count. Traverse the array: o If count = 0, pick current as candidate. o If current = candidate, increment count; else decrement count. The candidate at the end is the majority element. def majority_element(nums\\ count, candidate = 0, None for num in nums: if count == 0: candidate = num count += (1 if num == candidate else - 1\\ return candidate print(majority_element([3,2,3]\\\\ # 3 print(majority_element([2,2,1,1,1,2,2]\\\\ # 2",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Majority Element (Boyer.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Majority Element (Boyer.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "algorithms-longest-common-prefix",
    title: "Longest Common Prefix",
    prompt: "Longest Common Prefix, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
    category: "algorithms",
    subject: "data-structures",
    tags: [
      "algorithms",
      "data-structures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Problem: Find the longest common prefix string amongst an array of strings.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Find the longest common prefix string amongst an array of strings. \\ def longest_common_prefix(strs\\ if not strs: return \"\" prefix = list(strs[0]\\ for s in strs[1:]: i = 0 while i < len(prefix\\and i < len(s\\and prefix[i] == s[i]: i += 1 prefix = prefix[:i] if not prefix: return \"\" return \"\".join(prefix\\ print(longest_common_prefix([\"flower\",\"flow\",\"flight\"]\\\\ Approach: Vertical scanning or binary search; here vertical scan with two pointers char - by - char. Complexity: O(S\\ where S is total chars.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Longest Common Prefix.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Longest Common Prefix.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-longest",
    title: "Longest",
    prompt: "Longest, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
    category: "algorithms",
    subject: "data-structures",
    tags: [
      "algorithms",
      "data-structures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Increasing Subsequence (LIS\\.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Increasing Subsequence (LIS\\. Problem: Given nums, return length of LIS. import bisect def length_of_lis(nums\\ tails = [] # tails[i] = smallest tail of all increasing subseqs of length i+1 for x in nums: pos = bisect.bisect_left(tails, x\\ if pos == len(tails\\ tails.append(x\\ else: tails[pos] = x return len(tails\\ print(length_of_lis([10,9,2,5,3,7, 101,18]\\\\ # 4 Explanation: Example: Approach: Patience sorting (tails array + binary search\\. Complexity: O(n log n\\. Tip: Good to implement in interviews and explain intuition.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Longest.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Longest.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-two-sum",
    title: "Two Sum",
    prompt: "Two Sum, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
    category: "algorithms",
    subject: "data-structures",
    tags: [
      "algorithms",
      "data-structures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Problem: Given nums and target, return indices of the two numbers adding to target.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Given nums and target, return indices of the two numbers adding to target. Example: Approach: iterating.A window function performs calculations across a set of table rows related to the current row without collapsing rows like GROUP BY. def two_sum(nums, target\\ seen = {} for i, x in enumerate(nums\\ want = target - x if want in seen: return [seen[want], i] seen[x] = i return [] print(two_sum([2,7,11,15], 9\\ # [0,1] Complexity: O(n\\time, O(n\\space.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Two Sum.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Two Sum.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-subarray-sum-equals-k-count",
    title: "Subarray Sum Equals K (count\\",
    prompt: "Subarray Sum Equals K (count\\, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
    category: "algorithms",
    subject: "data-structures",
    tags: [
      "algorithms",
      "data-structures",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Problem: Count subarrays with sum == k.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Count subarrays with sum == k. Example: Approach: Prefix sums + hashmap counting occurrences. from collections import defaultdict def subarray_sum(nums, k\\ cnt = defaultdict(int\\ cnt[0] = 1 cur = 0 res = 0 for x in nums: cur += x res += cnt[cur - k] cnt[cur] += 1 return res print(subarray_sum([1,1,1], 2\\ # 2",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Subarray Sum Equals K (count\\.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Subarray Sum Equals K (count\\.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    prompt: "Longest Substring Without Repeating Characters, explain the behavior and mechanism.",
    level: "intermediate",
    type: "live_code",
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
    explanation: "Problem: Length of the longest substring without repeating characters. Approach: Sliding window with hashmap of last index. def length_of_longest_substring(s\\ last = {} start = 0 best = 0 for i, ch in enumerate(s\\ if ch in last and last[ch] >= start: start = last[ch] + 1 last[ch] = i best = max(best, i - start + 1\\ return best print(length_of_longest_substring(\"abcabcbb\"\\\\ # 3 CASE WHEN salary >= 100000 THEN 'High' WHEN salary >= 50000 THEN 'Medium' ELSE 'Low' END AS salary_category FROM employees; Explanation: Complexity: O(n\\ Tip: Use start to shrink window when duplicates found.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Longest Substring Without Repeating Characters.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Longest Substring Without Repeating Characters.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "algorithms-minimum-window-substrin",
    title: "Minimum Window Substrin",
    prompt: "Minimum Window Substrin, explain the behavior and mechanism.",
    level: "intermediate",
    type: "live_code",
    category: "algorithms",
    subject: "data-fetching",
    tags: [
      "algorithms",
      "data-fetching",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "g Problem: Given strings s and t, find minimum window in s containing all chars of t.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "g Problem: Given strings s and t, find minimum window in s containing all chars of t. Return \"\" if none. Example: s Approach: Sliding window + counts of required chars; expand then contract.A CTE (Common Table Expression\\is a temporary, named result set that you can reference within a SQL query. It improves readability and simplifies complex subqueries or recursive logic. Syntax: from collections import Counter def min_window(s, t\\ need = Counter(t\\ missing = len(t\\ left = 0 best = (0, float('inf'\\ for right, ch in enumerate(s\\: if need[ch] > 0: missing - = 1 need[ch] - = 1",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Minimum Window Substrin.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Minimum Window Substrin.",
    hints: [
      "Ask who owns the cache, when it is invalidated, and what the user sees while it is stale."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/caching"
  },
  {
    id: "algorithms-longest-subarray-with-at-most-k-distinct",
    title: "Longest Subarray with At Most K Distinct",
    prompt: "Longest Subarray with At Most K Distinct, explain the behavior and mechanism.",
    level: "intermediate",
    type: "live_code",
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
        text: "Problem: Given array (or string\\ find longest subarray with at most k distinct elements.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Given array (or string\\ find longest subarray with at most k distinct elements. Example: Approach: Sliding window + hashmap counting distinct in window. from collections import defaultdict def longest_at_most_k_distinct(nums, k\\ cnt = defaultdict(int\\ left = 0 distinct = 0 best = 0 for right, x in enumerate(nums\\ if cnt[x] == 0: distinct += 1 cnt[x] += 1 while distinct > k: cnt[nums[left]] - = 1 if cnt[nums [left]] == 0: distinct - = 1 left += 1 best = max(best, right - left + 1\\ return best print(longest_at_most_k_distinct([1,2,1,2,3], 2\\\\ # 4 Explanation: Complexity: O(n\\ Graph Traversa l",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Longest Subarray with At Most K Distinct.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Longest Subarray with At Most K Distinct.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "dsa-interview",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "algorithms-shortest-path-in-unweighted-graph-bfs-returning-path",
    title: "Shortest Path in Unweighted Graph (BFS returning path\\",
    prompt: "Shortest Path in Unweighted Graph (BFS returning path\\, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
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
        text: "Problem: Given adjacency list, source s and target t, return shortest path nodes (or [] if none\\.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Problem: Given adjacency list, source s and target t, return shortest path nodes (or [] if none\\. Example: Approach: BFS with parent pointers; reconstruct path. from collections import deque def bfs_shortest_path(adj, s, t\\ q = deque([s]\\ parent = {s: None} while q: u = q.popleft(\\ if u == t: break for v in adj.get(u, []\\: if v not in parent: parent[v] = u q.append(v\\ if t not in parent: return [] path = [] cur = t while cur is not None: path.append(cur\\ cur = parent[cur] return path[: - 1] # Example adjacency adj = {1:[ 2,3], 2:[4], 3:[], 4:[]} print(bfs_shortest_path(adj, 1, 4\\\\ # [1,2,4] Complexity: O(V+E\\. Tip: Use BFS for unweighted shortest path problems.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Shortest Path in Unweighted Graph (BFS returning path\\.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Shortest Path in Unweighted Graph (BFS returning path\\.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "algorithms-detect-cycle-in-directed-graph",
    title: "Detect Cycle in Directed Graph (",
    prompt: "Detect Cycle in Directed Graph (, explain the behavior and mechanism.",
    level: "senior",
    type: "live_code",
    category: "algorithms",
    subject: "state-management",
    tags: [
      "algorithms",
      "state-management",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "DFS\\ Problem: Detect if a directed graph has a cycle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "DFS\\ Problem: Detect if a directed graph has a cycle. Approach: DFS with 3 - color marking (0=unvisited,1=visiting,2=visited\\. def has_cycle_directed(adj\\ nstates = {} def dfs(u\\: if nstates.get(u,0\\== 1: return True if nstates.get(u,0\\== 2: return False nstates[u] = 1 for v in adj.get(u, []\\: if dfs(v\\: return True nstates[u] = 2 return False for node in adj: if nstates.get(node,0\\== 0: if dfs(node\\: return True return False print(has_cycle_directed({1:[2], 2:[3], 3:[1]}\\\\ Explanation: Complexity: O(V+E\\. WHERE t.customer_id IS NULL ensures the",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Detect Cycle in Directed Graph (.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Detect Cycle in Directed Graph (.",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "dsa-interview",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  },
  {
    id: "react-number-of-connected-components-union",
    title: "Number of Connected Components (Union",
    prompt: "Number of Connected Components (Union, explain the behavior and mechanism.",
    level: "junior",
    type: "live_code",
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
        text: "- Find \\ Problem: Given n nodes and edge list, count connected components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "- Find \\ Problem: Given n nodes and edge list, count connected components. Approach: Union - Find (disjoint set union\\ Using IS NULL / IS NOT NULL: SELECT * FROM employees WHERE manager_id IS NULL; class DSU: def __init__(self, n\\: self.par = list(range(n\\ self.rank = [0]*n def find(self, a\\ while self.par[a] != a: self.par[a] = self.par[self.par[a]] a = self.par[a] return a def union(self, a, b\\: ra, rb = self.find(a\\ self.find(b\\ if ra == rb: return False if self.rank[ra] < self.rank[rb]: ra, rb = rb, ra self.par[rb] = ra if self.rank[ra] == self.rank[rb]: self.rank[ra] += 1 return True def count_components(n, edges\\ dsu = DSU(n\\ for a, b in edges: dsu.union(a, b\\ roots = set(dsu.find(i\\ for i in range(n\\ return len(roots\\ print(count_components(5, [(0,1(1,2(3,4\\\\ # 2 Tip: Explain path compression + union by rank.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Number of Connected Components (Union.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Number of Connected Components (Union.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "dsa-interview",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  }
];
