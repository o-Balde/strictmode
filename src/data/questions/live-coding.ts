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
        text: "It matches browser URL paths to `<Route>` components; dynamic routes use path parameters (e.g. `path='/user/:id'`) which components access via the `useParams()` hook.",
        isCorrect: true,
        explanation: "Correct. React Router parses URL segments against route definitions, exposing dynamic segment values through `useParams()`."
      },
      {
        id: "B",
        text: "It makes an HTTP request to an Apache server for every URL change to fetch a new HTML file.",
        isCorrect: false,
        explanation: "React Router performs client-side routing in memory without requesting new HTML documents from the server."
      },
      {
        id: "C",
        text: "Dynamic parameters must be parsed manually by splitting `document.URL` in a while loop.",
        isCorrect: false,
        explanation: "React Router provides the built-in `useParams()` hook to read parameters declaratively."
      },
      {
        id: "D",
        text: "Dynamic routes can only accept boolean true/false values.",
        isCorrect: false,
        explanation: "Dynamic route parameters capture any string segment from the URL path."
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
        text: "Delete the user's hard drive if they visit an unauthorized route.",
        isCorrect: false,
        explanation: "Route guards simply redirect unauthorized users to login or 403 pages."
      },
      {
        id: "B",
        text: "Disable all CSS stylesheets on protected routes.",
        isCorrect: false,
        explanation: "Route guarding is an authentication and routing check, unrelated to disabling CSS."
      },
      {
        id: "C",
        text: "Create a wrapper component (`<ProtectedRoute>`) that checks auth state; if authenticated, render `<Outlet />` (or `children`), otherwise render `<Navigate to='/login' replace />`.",
        isCorrect: true,
        explanation: "Correct. Protected route guards evaluate authentication/role conditions, conditionally rendering child route content or redirecting unauthorized users."
      },
      {
        id: "D",
        text: "Store user passwords in unencrypted URL hash fragments.",
        isCorrect: false,
        explanation: "Exposing passwords in URLs is a severe security vulnerability."
      }
    ],
    correctAnswer: "C",
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
        text: "Prefixing every line with `@comment` in JSX.",
        isCorrect: false,
        explanation: "`@comment` is not valid JavaScript or JSX comment syntax."
      },
      {
        id: "B",
        text: "Inside JSX: `{/* This is a comment */}`; In standard component JavaScript: `// single line` or `/* multi line */`.",
        isCorrect: true,
        explanation: "Correct. In JSX expressions, comments must be wrapped in curly braces `{/* ... */}` so the JSX compiler parses them as JavaScript comments."
      },
      {
        id: "C",
        text: "Comments are forbidden in React source files and cause build failures.",
        isCorrect: false,
        explanation: "Comments are fully supported using standard JS syntax outside JSX and `{/* */}` inside JSX."
      },
      {
        id: "D",
        text: "Using HTML comments `<!-- comment -->` directly inside JSX tag blocks.",
        isCorrect: false,
        explanation: "HTML comments `<!-- -->` are invalid syntax inside JSX and cause compiler errors."
      }
    ],
    correctAnswer: "B",
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
        text: "Declare `const [count, setCount] = useState(0)` and render buttons `<button onClick={() => setCount(c => c + 1)}>Increment</button>` and `<button onClick={() => setCount(c => c - 1)}>Decrement</button>`.",
        isCorrect: true,
        explanation: "Correct. Using `useState` with updater functions provides a clean, predictable counter implementation in a functional component."
      },
      {
        id: "B",
        text: "Call `document.write(count++)` inside the button `onClick` handler.",
        isCorrect: false,
        explanation: "`document.write` destroys the DOM document and breaks React reconciliation."
      },
      {
        id: "C",
        text: "Counters cannot be created in React without installing external Redux libraries.",
        isCorrect: false,
        explanation: "`useState` handles counter state natively and simply in React."
      },
      {
        id: "D",
        text: "Declare `let count = 0` and mutate `count++` inside button click handlers without React state.",
        isCorrect: false,
        explanation: "Mutating local variables directly does not trigger React component re-renders, leaving the UI unchanged."
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
        text: "A database query syntax similar to GraphQL.",
        isCorrect: false,
        explanation: "JSX is a UI markup syntax extension for JavaScript."
      },
      {
        id: "B",
        text: "A syntactic sugar for `React.createElement` that allows writing HTML-like markup inside JavaScript, making component structure declarative, readable, and expressive.",
        isCorrect: true,
        explanation: "Correct. JSX provides an intuitive template syntax that compiles down to standard JavaScript function calls creating React element objects."
      },
      {
        id: "C",
        text: "A CSS stylesheet preprocessor similar to Sass and Less.",
        isCorrect: false,
        explanation: "JSX describes UI component structure, not CSS stylesheet styling rules."
      },
      {
        id: "D",
        text: "A new programming language that runs natively in web browsers without compilation.",
        isCorrect: false,
        explanation: "Browsers cannot run JSX directly; build tools (Babel, SWC) must compile it to JavaScript."
      }
    ],
    correctAnswer: "B",
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
        text: "Using HTML comments `<!-- comment -->` directly inside JSX tags.",
        isCorrect: false,
        explanation: "HTML comments `<!-- -->` cause syntax errors in JSX."
      },
      {
        id: "B",
        text: "Comments are forbidden in React and cause build errors.",
        isCorrect: false,
        explanation: "Comments are fully supported using standard JS syntax and `{/* */}` in JSX."
      },
      {
        id: "C",
        text: "Prefixing comment lines with `@comment` in JSX.",
        isCorrect: false,
        explanation: "`@comment` is not valid JavaScript or JSX comment syntax."
      },
      {
        id: "D",
        text: "Inside JSX: `{/* Multi-line comment */}`; In standard component JavaScript: `// single line` or `/* multi line */`.",
        isCorrect: true,
        explanation: "Correct. In JSX expressions, comments must be wrapped in curly braces `{/* ... */}` so the JSX parser treats them as JavaScript comments."
      }
    ],
    correctAnswer: "D",
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
        text: "React Router shuts down the web server when a route is not found.",
        isCorrect: false,
        explanation: "Client-side routing matches unknown routes against the wildcard route configuration."
      },
      {
        id: "B",
        text: "In React Router v6, define `<Route path='*' element={<NotFound />} />` at the end of `<Routes>`; in v4/v5, place a pathless `<Route component={NotFound} />` at the bottom of `<Switch>`.",
        isCorrect: true,
        explanation: "Correct. A wildcard `path='*'` (or pathless route in `<Switch>`) acts as a fallback that matches any unmatched URL path, rendering the 404 Not Found component."
      },
      {
        id: "C",
        text: "Throw a fatal uncaught JavaScript exception in the root component.",
        isCorrect: false,
        explanation: "Unhandled exceptions crash the app; rendering a 404 fallback component provides clean UX."
      },
      {
        id: "D",
        text: "Redirect all unmatched URLs to Google.com.",
        isCorrect: false,
        explanation: "Redirecting outside the app breaks user navigation; an in-app 404 page is standard."
      }
    ],
    correctAnswer: "B",
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
        text: "Writing raw SQL INSERT statements inside the component props.",
        isCorrect: false,
        explanation: "Redux action creators are JavaScript functions, not SQL queries."
      },
      {
        id: "B",
        text: "Using `eval()` to execute strings of action code.",
        isCorrect: false,
        explanation: "`eval()` is dangerous, slow, and completely inappropriate for action dispatching."
      },
      {
        id: "C",
        text: "`mapDispatchToProps` only accepts integer numbers.",
        isCorrect: false,
        explanation: "`mapDispatchToProps` is either a function returning an object or an object of action creators."
      },
      {
        id: "D",
        text: "Object shorthand `{ addTodo, deleteTodo }` (recommended), function form `(dispatch) => ({ addTodo: () => dispatch(addTodo()) })`, or using `bindActionCreators`.",
        isCorrect: true,
        explanation: "Correct. The object shorthand is the cleanest and most common syntax, where React-Redux automatically wraps action creator functions in `dispatch` calls."
      }
    ],
    correctAnswer: "D",
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
        text: "No, React maintainers committed to backwards compatibility; class components and hooks coexist in the same codebase without needing to rewrite existing working class components.",
        isCorrect: true,
        explanation: "Correct. The React team recommends using Hooks for all new code while leaving existing class components untouched unless refactoring for other reasons."
      },
      {
        id: "B",
        text: "Yes, failing to rewrite classes results in automatic project deletion.",
        isCorrect: false,
        explanation: "React provides full backwards compatibility for class components."
      },
      {
        id: "C",
        text: "Yes, all class components stopped working completely in React 17.",
        isCorrect: false,
        explanation: "Class components continue to be supported in modern React."
      },
      {
        id: "D",
        text: "Hooks and classes cannot exist in the same application.",
        isCorrect: false,
        explanation: "Hooks and class components coexist and interoperate seamlessly."
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
        text: "Manually inject `<script>` tags synchronously in `render()` whenever a user clicks a button.",
        isCorrect: false,
        explanation: "Synchronous script tag injection in render violates React's pure declarative model and causes script blocking."
      },
      {
        id: "B",
        text: "Split code by wrapping every individual JSX HTML tag in a separate Web Worker.",
        isCorrect: false,
        explanation: "DOM elements cannot run in Web Workers; Web Workers do not have access to the DOM or React component tree."
      },
      {
        id: "C",
        text: "Use dynamic `import()` via `React.lazy()` paired with `<Suspense>` boundaries at route and heavy-component levels.",
        isCorrect: true,
        explanation: "Correct. Route-based and component-based dynamic imports allow splitting large JS bundles into on-demand chunks with fallback UI."
      },
      {
        id: "D",
        text: "Disable build-time bundler tree-shaking so all modules load immediately in `index.html`.",
        isCorrect: false,
        explanation: "Disabling tree-shaking inflates the initial bundle size rather than splitting it."
      }
    ],
    correctAnswer: "C",
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
        text: "Clear all existing items from the DOM whenever the user scrolls down, showing only the latest 10 items.",
        isCorrect: false,
        explanation: "Discarding earlier items prevents scrolling back up and destroys standard infinite scroll behavior."
      },
      {
        id: "B",
        text: "Listen to window `scroll` events without throttling, calculate `scrollTop === scrollHeight`, and use `offset=page*20`.",
        isCorrect: false,
        explanation: "Unthrottled scroll listeners cause layout thrashing, and offset pagination produces duplicate items if new rows are added at the top."
      },
      {
        id: "C",
        text: "Re-render the entire list from index 0 on every page append by making sequential requests for all previous pages.",
        isCorrect: false,
        explanation: "Fetching all historical pages repeatedly multiplies network bandwidth quadratically (N^2 requests)."
      },
      {
        id: "D",
        text: "Observe a bottom sentinel element using `IntersectionObserver`, fetch the next page using an opaque `cursor`, and append items into state without re-fetching old pages.",
        isCorrect: true,
        explanation: "Correct. IntersectionObserver avoids expensive scroll listeners, and cursor pagination prevents duplicate/skipped items when new data is inserted concurrently."
      }
    ],
    correctAnswer: "D",
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
        text: "Display raw JavaScript runtime stack traces directly to end users in modal dialogs.",
        isCorrect: false,
        explanation: "Exposing raw stack traces to end users is a severe security vulnerability and terrible UX."
      },
      {
        id: "B",
        text: "Disable all `try/catch` blocks and error boundaries so uncaught exceptions silently crash the tab.",
        isCorrect: false,
        explanation: "Without error boundaries, render errors result in a blank white screen with no diagnostics."
      },
      {
        id: "C",
        text: "Send an HTTP POST error log on every single user mouse movement across the screen.",
        isCorrect: false,
        explanation: "Logging mouse coordinates on every event floods the network and client thread with telemetry spam."
      },
      {
        id: "D",
        text: "Wrap component subtrees in Error Boundaries with Sentry/Datadog reporting, track real-user Core Web Vitals via `web-vitals`, and sample session replays.",
        isCorrect: true,
        explanation: "Correct. Production telemetry combines Error Boundaries for uncaught render exceptions, Real User Monitoring (RUM) for Web Vitals, and sampled error logging."
      }
    ],
    correctAnswer: "D",
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
        text: "Store sensitive secrets and private API master keys in public frontend `.env` variables prefixed with `NEXT_PUBLIC_`.",
        isCorrect: false,
        explanation: "`NEXT_PUBLIC_` env vars are embedded into the client JS bundle and exposed to all website visitors."
      },
      {
        id: "B",
        text: "Sanitize untrusted HTML (e.g. DOMPurify) before injection, configure strict Content Security Policy (CSP) headers, and use `SameSite` cookies against CSRF.",
        isCorrect: true,
        explanation: "Correct. Robust frontend security combines output sanitization, strict CSP headers to block unauthorized scripts, and SameSite cookies/anti-CSRF tokens."
      },
      {
        id: "C",
        text: "Use `dangerouslySetInnerHTML` directly on raw user comment input strings without sanitization.",
        isCorrect: false,
        explanation: "Rendering unsanitized user HTML is the textbook definition of a Cross-Site Scripting (XSS) vulnerability."
      },
      {
        id: "D",
        text: "Disable Content Security Policy headers to allow third-party scripts to execute `eval()` freely.",
        isCorrect: false,
        explanation: "Disabling CSP strips the browser's strongest defense against injected script execution."
      }
    ],
    correctAnswer: "B",
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
        text: "Store optimistic state permanently in `localStorage` without validating against the server's authoritative response.",
        isCorrect: false,
        explanation: "Authoritative server responses must reconcile with optimistic client state to maintain data integrity."
      },
      {
        id: "B",
        text: "Block user input with a full-screen loading spinner for 3 seconds before reflecting any button click.",
        isCorrect: false,
        explanation: "Blocking spinners negate the benefit of optimistic updates and introduce artificial friction."
      },
      {
        id: "C",
        text: "Update the UI state immediately and silently ignore any network error or server rejection without informing the user.",
        isCorrect: false,
        explanation: "Failing to handle rejection leads to permanent desynchronization between client UI and actual server data."
      },
      {
        id: "D",
        text: "Update local UI/cache state immediately before network response, save snapshot of previous state, and automatically roll back if the server mutation rejects.",
        isCorrect: true,
        explanation: "Correct. Optimistic updates provide instant perceived responsiveness by applying changes immediately and rolling back to cached snapshot on error."
      }
    ],
    correctAnswer: "D",
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
        text: "Send raw full-document replacement strings over HTTP polling every 50ms without conflict resolution.",
        isCorrect: false,
        explanation: "Overwriting documents over HTTP polling causes race conditions and clobbers concurrent edits made by other users."
      },
      {
        id: "B",
        text: "Assume WebSockets never disconnect and omit reconnection or offline buffering logic.",
        isCorrect: false,
        explanation: "Mobile networks and proxies frequently drop connections; auto-reconnect and message queues are mandatory."
      },
      {
        id: "C",
        text: "Process all real-time peer messages synchronously in the main thread with blocking while loops.",
        isCorrect: false,
        explanation: "Blocking the main thread freezes UI animations and user input."
      },
      {
        id: "D",
        text: "Maintain a persistent WebSocket connection, implement heartbeat ping/pong with exponential backoff reconnect, and resolve conflicts via CRDTs (e.g. Yjs) or Operational Transformation.",
        isCorrect: true,
        explanation: "Correct. Collaborative real-time systems combine WebSockets with conflict resolution algorithms (CRDTs/OT) and connection resilience (heartbeats/reconnect queues)."
      }
    ],
    correctAnswer: "D",
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
        text: "Hardcode feature flags as boolean constants directly inside component source code and redeploy for every change.",
        isCorrect: false,
        explanation: "Hardcoded constants require a full code build and deployment cycle to toggle, eliminating the benefit of dynamic feature flags."
      },
      {
        id: "B",
        text: "Bootstrap flags at app launch via provider, evaluate flags in memory with custom hooks/components, support user targeting, and clean up stale flag code.",
        isCorrect: true,
        explanation: "Correct. Feature flag systems (LaunchDarkly, Statsig, GrowthBook) evaluate cached flag rules in memory, enabling gradual rollouts and instant kill switches without deployments."
      },
      {
        id: "C",
        text: "Leave old experimental feature flag branches in the codebase permanently across multiple years.",
        isCorrect: false,
        explanation: "Failing to clean up stale feature flags causes technical debt, dead code accumulation, and combinatorial testing bugs."
      },
      {
        id: "D",
        text: "Fetch flag evaluations synchronously from a remote API inside every component render function.",
        isCorrect: false,
        explanation: "Synchronous network calls in render block the React rendering pipeline and introduce massive latency."
      }
    ],
    correctAnswer: "B",
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
        text: "The only mistake is not using Redux for every single integer variable in the application.",
        isCorrect: false,
        explanation: "Overusing Redux for local variables is an anti-pattern; state should live close to where it is used."
      },
      {
        id: "B",
        text: "Optimizing performance before writing any functional code is the primary recommended approach.",
        isCorrect: false,
        explanation: "Premature optimization without profiling wastes effort; architectural modularity and correctness come first."
      },
      {
        id: "C",
        text: "Common mistakes include jumping into code before clarifying requirements, neglecting accessibility, over-engineering global state, and ignoring network caching/performance.",
        isCorrect: true,
        explanation: "Correct. Systematic frontend design requires structured communication (e.g. RADIO framework), understanding scale bottlenecks, and balancing state/caching tradeoffs."
      },
      {
        id: "D",
        text: "Frontend system design questions only test memorizing CSS property syntax.",
        isCorrect: false,
        explanation: "Frontend system design evaluates architectural thinking, data modeling, API contracts, performance, security, and scalability."
      }
    ],
    correctAnswer: "C",
    explanation: "Understanding common mistakes shows interviewers you have production experience. Mistake 1: Putting everything in Redux Use React Query for server state. Redux only for true global client state. Mistake 2: No code splitting Single 3MB bundle = 10s load time on mobile. Split routes minimum. Mistake 3: Infinite re-renders Object/array literals as props bypass React.memo. Use useMemo/useCallback. Mistake 4: Not handling all UI states Every async operation has: loading, error, empty, success. Design all four. Mistake 5: Hardcoding dimensions Images without width/height cause CLS. Charts without ResponsiveContainer break. Mistake 6: Tokens in localStorage XSS can steal any localStorage value. Use HttpOnly cookies for auth tokens. Mistake 7: No virtualization for long lists 100K DOM nodes crash browsers. Virtualize any list over 500 items. Mistake 8: Prop drilling instead of composition Passing props 6 levels deep is a smell. Lift state or use Context/Zustand. 1 // Mistake 1: Redux for server state 2 // n Old way 3 dispatch ( fetchProducts ( ) ) // action, reducer, selector, so much code! 4 // n React Query 5 const { data } = useQuery ( { queryKey: [ 'products' ], queryFn: api. getProducts } ) 6 7 // Mistake 3: Object prop breaking memo 8 // n New object every render, memo never skips 9 const Child = React. memo ( ( { config } ) = > < div > { config. title } < / div > ) 10 const Parent = ( ) = > < Child config = { { title: 'Hello' } } / > // new object! 11 // n Either use useMemo or pass primitives 12 const Parent = ( ) = > { 13 const config = useMemo ( ( ) = > ( { title: 'Hello' } ), [ ] ) 14 return < Child config = { config } / > 15 } 16 17 // Mistake 7: No virtualization 18 // n 100K DOM nodes 19 const BadList = ( { items } ) = > items. map ( i = > < Row key = { i. id } {.. i } / > ) 20 // n Virtual list, only renders ~20 items 21 const GoodList = ( { items } ) = > ( 22 < VirtualList items = { items } renderItem = { ( item ) = > < Row {.. item } / > } / >",
    interviewLine: "Understanding common mistakes shows interviewers you have production experience.",
    misconception: "Mistake 1: Putting everything in Redux Use React Query for server state.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  }
];
