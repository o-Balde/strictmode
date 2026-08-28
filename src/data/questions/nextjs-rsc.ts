import { QuizQuestion } from '../types';

export const NEXTJS_RSC_QUESTIONS: QuizQuestion[] = [
  {
    id: "nextjs-what-is-ssr-server-side-rendering",
    title: "What is SSR (Server-Side Rendering)?",
    prompt: "What is SSR (Server-Side Rendering)?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "junior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Server-Side Rendering (SSR) is a technique used to render pages on the server and send the fully rendered page to the client for display.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Server-Side Rendering (SSR) is a technique used to render pages on the server and send the fully rendered page to the client for display. It allows the server to generate the complete HTML markup of a web page, including its dynamic content, and send it to the client as a response to a request. In a traditional client-side rendering approach, the client receives a minimal HTML page and then makes additional requests to the server for data and resources, which are used to render the page on the client-side. This can lead to slower initial page loading times and negatively impact search engine optimization (SEO) since search engine crawlers have difficulty indexing JavaScript-driven content. With SSR, the server takes care of rendering the web page by executing the necessary JavaScript code to produce the final HTML. This means that the client receives the fully rendered page from the server, reducing the need for additional resource requests. SSR improves initial page load times and allows search engines to easily index the content, resulting in better SEO. SSR is commonly used in frameworks and libraries like Next.js for React and Nuxt.js for Vue.js to enable server-side rendering capabilities. These frameworks handle the server-side rendering logic for you, making it easier to implement SSR.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is SSR (Server-Side Rendering)?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is SSR (Server-Side Rendering)?.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "nextjs-what-are-the-main-functions-of-nextjs-that-you-know",
    title: "What are the main functions of Next.js that you know?",
    prompt: "What are the main functions of Next.js that you know?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "export async function getStaticProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n\n  return {\n    props: {\n      data\n    }\n  };\n}\n\nexport async function getServerSideProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n\n  return {\n    props: {\n      data\n    }\n  };\n}\n\nexport async function getStaticPaths() {\n  const res = await fetch('https://api.example.com/posts');\n  const posts = await res.json();\n\n  const paths = posts.map((post) => ({\n    params: { id: post.id }\n  }));\n\n  return {\n    paths,\n    fallback: false\n  };\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getStaticProps: This method is used to fetch data at build time and pre-render a page as static HTML.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "getStaticProps: This method is used to fetch data at build time and pre-render a page as static HTML. It ensures that the data is available at build time and does not change on subsequent requests. getServerSideProps: This method is used to fetch data on each request and pre-render the page on the server. It can be used when you need to fetch data that might change frequently or is user-specific. getStaticPaths: This method is used in dynamic routes to specify a list of paths that should be pre-rendered at build time. It is commonly used to fetch data for dynamic routes with parameters. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the main functions of Next.js that you know?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the main functions of Next.js that you know?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "nextjs-react-server-components-rsc-run-only-on-the-server-and",
    title: "React Server Components (RSC) run only on the server and are never sent to the client as JavaScript. They practically help in reducing bundle size and improving performance.",
    prompt: "React Server Components (RSC) run only on the server and are never sent to the client as JavaScript. They practically help in reducing bundle size and improving performance., explain the behavior and mechanism.",
    level: "intermediate",
    type: "output",
    category: "nextjs",
    subject: "server-components",
    tags: [
      "nextjs",
      "server-components",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "With this, it can fetch data directly on the server and send only the required UI output to the client.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "With this, it can fetch data directly on the server and send only the required UI output to the client.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of React Server Components (RSC) run only on the server and are never sent to the client as JavaScript. They practically help in reducing bundle size and improving performance.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of React Server Components (RSC) run only on the server and are never sent to the client as JavaScript. They practically help in reducing bundle size and improving performance.",
    hints: [
      "A Server Component runs only on the server and ships no JavaScript. It cannot hold state or use hooks."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components"
  },
  {
    id: "nextjs-what-are-react-suspense-and-reactlazy-how-do-they-enabl",
    title: "What are React Suspense and React.lazy? How do they enable code splitting?",
    prompt: "What are React Suspense and React.lazy? How do they enable code splitting?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "import Profile from \"./Profile\";\n\nconst Profile = React.lazy(() => import(\"./Profile\"));\n\n<Suspense fallback={<p>Loading...</p>}>\n  <Profile />\n</Suspense>",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "In React, all components are bundled together and loaded at once.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "In React, all components are bundled together and loaded at once. This can slow down the initial load, especially if the app is large. To avoid this from happening, React has an in-built feature that loads components only when they are needed, and this is called code splitting. Both React Suspense and React.lazy are used together to implement this code-splitting. So if you are importing a component like this: You can try writing: So that your component doesn, t load immediately, and that it would only download when React tries to render it. But there, s something you need to watch out for: While the component is loading, React needs to show something on the screen. And you can use, Suspense, for that: So what happens is: React tries to render <Profile /> It sees that the component is still loading Rendering is paused for that part The fallback (Loading.) is shown Once the file loads, React renders the actual component You can use this at different levels: for entire pages like routes or for smaller parts of the UI You can also wrap multiple components in one Suspense, or create separate ones if you want different loading states. You should note that in newer React versions, Suspense is also used for things like data fetching and server components.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Suspense and React.lazy? How do they enable code splitting?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Suspense and React.lazy? How do they enable code splitting?.",
    hints: [
      "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense"
  },
  {
    id: "nextjs-when-should-you-use-a-class-component-over-a-function-c",
    title: "When should you use a class component over a function component?",
    prompt: "When should you use a class component over a function component?",
    level: "intermediate",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Default to function components.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Default to function components. Class components are legacy: new APIs like Suspense data fetching, the use hook, Actions, Server Components, and the React Compiler are designed for function components only. The one remaining reason to write a class today is implementing an error boundary, which still requires static getDerivedStateFromError / componentDidCatch.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of When should you use a class component over a function component?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of When should you use a class component over a function component?.",
    hints: [
      "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component"
  },
  {
    id: "nextjs-what-is-the-testrenderer-package-in-react",
    title: "What is the TestRenderer package in React?",
    prompt: "What is the TestRenderer package in React?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "junior",
      "rendering"
    ],
    codeSnippet: "import TestRenderer from 'react-test-renderer';import MyComponent from './MyComponent';\nconst renderer = TestRenderer.create(<MyComponent />);const tree = renderer.toJSON();expect(tree).toMatchSnapshot();\n\nimport { render } from '@testing-library/react';const { container } = render(<MyComponent />);expect(container).toMatchSnapshot();",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "react-test-renderer was a utility for rendering React components to a plain JS object tree (rather than the DOM), useful for snapshot testing without a browser environment.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "react-test-renderer was a utility for rendering React components to a plain JS object tree (rather than the DOM), useful for snapshot testing without a browser environment. react-test-renderer is deprecated as of React 19, and the React team recommends migrating off it. For component tests, use React Testing Library with a DOM environment (jsdom for Jest, or built-in for Vitest). For snapshot tests, serialize the DOM produced by RTL's render: React 19 and modern React React 19 added Actions and form integrations, the use hook, stable Server Components, and the React Compiler. These are common interview topics in 2026.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the TestRenderer package in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the TestRenderer package in React?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "nextjs-whats-new-in-react-19",
    title: "What's new in React 19?",
    prompt: "What's new in React 19?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React 19 adds: Actions: functions that wrap async work and produce pending/error/data state via new hooks.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "React 19 adds: Actions: functions that wrap async work and produce pending/error/data state via new hooks. The use hook: reads promises and context during render. Stable React Server Components and Server Actions. Native support for <form action={fn}>. ref as a regular prop on function components (no more forwardRef). Hoisting of <title>, <meta>, and stylesheets out of JSX. The React Compiler: an opt-in build-time optimizer that auto-memoizes. Together, these move data mutations and async UI state into React itself, instead of leaving them as patterns each app reinvents.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What's new in React 19?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What's new in React 19?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "nextjs-what-are-react-server-components",
    title: "What are React Server Components?",
    prompt: "What are React Server Components?",
    level: "junior",
    type: "output",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Server Components render on the server and stream their output to the client.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Server Components render on the server and stream their output to the client. They never ship JavaScript to the browser, can await data directly (no useEffect round-trip), and can access server-only resources like the database or filesystem. They cannot use hooks like useState or useEffect, attach event handlers, or use browser-only APIs; those still belong in Client Components (files marked 'use client').",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are React Server Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are React Server Components?.",
    hints: [
      "A Server Component runs only on the server and ships no JavaScript. It cannot hold state or use hooks."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components"
  },
  {
    id: "nextjs-whats-the-difference-between-server-components-and-clie",
    title: "What's the difference between Server Components and Client Components?",
    prompt: "What's the difference between Server Components and Client Components?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Server Component Client Component Where it runs Server (build or request time) Browser (after hydration) JS shipped None Yes State / effects Not allowed Allowed Event handlers Not allowed Allowed Can await data directly Yes No (use use or fetch in effect) Can import the other Yes (renders Client Components) No (cannot import Server Components, only receive them as props/children) Server Components are typically the outer shell that fetches data; Client Components are the interactive leaves marked with 'use client'.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Server Component Client Component Where it runs Server (build or request time) Browser (after hydration) JS shipped None Yes State / effects Not allowed Allowed Event handlers Not allowed Allowed Can await data directly Yes No (use use or fetch in effect) Can import the other Yes (renders Client Components) No (cannot import Server Components, only receive them as props/children) Server Components are typically the outer shell that fetches data; Client Components are the interactive leaves marked with 'use client'.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What's the difference between Server Components and Client Components?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What's the difference between Server Components and Client Components?.",
    hints: [
      "A Server Component runs only on the server and ships no JavaScript. It cannot hold state or use hooks."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components"
  },
  {
    id: "nextjs-what-is-nextjs-and-major-features-of-it",
    title: "What is NextJS and major features of it?",
    prompt: "What is NextJS and major features of it?",
    level: "junior",
    type: "concept",
    category: "nextjs",
    subject: "rendering-keys",
    tags: [
      "nextjs",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "What is NextJS and major features of it?: Core React and frontend architecture principle.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Next.js is a popular and lightweight framework for static and server, rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS, Server-rendered by default Automatic code splitting for faster page loads Simple client-side routing (page based) Webpack-based dev environment which supports (HMR) Able to implement with Express or any other Node.js HTTP server Customizable with your own Babel and Webpack configurations: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is NextJS and major features of it?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is NextJS and major features of it?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "nextjs-how-do-you-design-a-virtualized-list-for-rendering-1000",
    title: "How do you design a virtualized list for rendering 100,000 rows?",
    prompt: "How do you design a virtualized list for rendering 100,000 rows?",
    level: "senior",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "24 width: '100%', 25 height: virtualRow.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Virtualisation renders only visible items in the DOM, not all 100,000. This keeps memory low and scrolling smooth regardless of list size. Why naively rendering 100K items fails: 100K DOM nodes = 2-3GB memory usage Scroll jank, browser can't paint 100K nodes at 60fps Initial render: 5-10 seconds How virtualization works: Calculate which items are visible in the viewport Render only those items (20-50 items typically) Create top/bottom padding spacers for scroll position As user scrolls, swap out items in and out of DOM Libraries: TanStack Virtual, most modern, headless react-window, lightweight, production-ready react-virtuoso, variable height, complex use cases When to use: Lists > 500 items, always virtualize Infinite scroll feeds (Twitter, Instagram) Data tables with thousands of rows 1 import { useVirtualizer } from '@tanstack/react-virtual' 2 3 const VirtualList = ( { items } ) = > { 4 const parentRef = useRef ( null ) 5 6 const virtualizer = useVirtualizer ( { 7 count: items. length, // total item count (100,000!) 8 getScrollElement: ( ) = > parentRef. current, 9 estimateSize: ( ) = > 72, // estimated row height in px 10 overscan: 5, // render 5 extra above/below viewport 11 } ) 12 13 return ( 14 // Scroll container 15 < div ref = { parentRef } style = { { height: '600px', overflow: 'auto' } } > 16 { / * Total height spacer, makes scrollbar accurate * / } 17 < div style = { { height: virtualizer. getTotalSize ( ), position: 'relative' } } > 18 { virtualizer. getVirtualItems ( ). map ( virtualRow = > ( 19 < div 20 key = { virtualRow. key } 21 style = { { 22 position: 'absolute', 23 top: virtualRow. start, // pixel offset from top",
    interviewLine: "Virtualisation renders only visible items in the DOM, not all 100,000.",
    misconception: "This keeps memory low and scrolling smooth regardless of list size.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "nextjs-what-are-core-web-vitals-and-how-do-you-improve-them-n",
    title: "What are Core Web Vitals and how do you improve them?",
    prompt: "What are Core Web Vitals and how do you improve them?",
    level: "senior",
    type: "concept",
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
        text: "21 import { onLCP, onINP, onCLS } from 'web-vitals' 22 onLCP ( metric = > analytics.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Core Web Vitals are Google's standardised performance metrics that directly affect SEO rankings. The 3 Core Web Vitals (2024): LCP, Largest Contentful Paint: time to render largest element Good: < 2.5s Needs work: < 4s Poor: > 4s INP, Interaction to Next Paint: responsiveness to user input Good: < 200ms Needs work: < 500ms Poor: > 500ms CLS, Cumulative Layout Shift: visual stability (no jumps) Good: < 0.1 Needs work: < 0.25 Poor: > 0.25 How to improve LCP: Preload hero image with <link rel=preload> Use next/image or optimised formats (WebP/AVIF) Eliminate render-blocking scripts Use CDN for static assets How to improve INP: Break long tasks with setTimeout or scheduler.yield() Use Web Workers for heavy computation Reduce JavaScript execution time How to improve CLS: Always set width/height on images Reserve space for ads and embeds Avoid inserting DOM above existing content 1 // LCP: preload hero image (biggest win for LCP) 2 < link rel = 'preload' as = 'image' href = '/hero.webp' / > 3 4 // CLS: always set dimensions on images 5 < img src = '/product.webp' width = { 800 } height = { 600 } alt = 'Product' / > 6 // Or use aspect-ratio CSS to reserve space 7 // .img-container { aspect-ratio: 4/3; } 8 9 // INP: break up long tasks with yield 10 async function processLargeDataset ( items ) { 11 const CHUNK = 50 12 for ( let i = 0; i < items. length; i + = CHUNK ) { 13 const chunk = items. slice ( i, i + CHUNK ) 14 processChunk ( chunk ) 15 // Yield to browser every 50 items 16 await new Promise ( r = > setTimeout ( r, 0 ) ) 17 } 18 } 19 20 // Measure CWV in code",
    interviewLine: "Core Web Vitals are Google's standardised performance metrics that directly affect SEO rankings.",
    misconception: "The 3 Core Web Vitals (2024): LCP, Largest Contentful Paint: time to render largest element Good: < 2.5s Needs work: < 4s Poor: > 4s INP, Interaction to Next Paint: responsiveness to user input Good: < 200ms Needs work: < 500ms Po",
    hints: [
      "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "nextjs-what-is-the-difference-between-csr-ssr-ssg-and-isr-n-an",
    title: "What is the difference between CSR, SSR, SSG, and ISR?",
    prompt: "What is the difference between CSR, SSR, SSG, and ISR?",
    level: "senior",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "senior",
      "rendering"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "21 async function BlogPost ( { params } ) { 22 const post = await api.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "Rendering strategy determines when and where HTML is generated. Each has different performance, SEO, and infrastructure implications. CSR, Client-Side Rendering: Server sends empty HTML + JS bundle Browser downloads JS, executes, renders UI Good for: dashboards, admin panels, apps behind auth Bad for: SEO (empty HTML), slow FCP SSR, Server-Side Rendering: Server renders full HTML on each request User sees content immediately (fast FCP) Good for: dynamic pages with user-specific data, SEO Bad for: server load, TTFB can be high SSG, Static Site Generation: HTML generated at build time Served from CDN, fastest possible Good for: blogs, marketing pages, documentation Bad for: dynamic user-specific content ISR, Incremental Static Regeneration (Next.js): SSG pages regenerated in background after stale Best of SSG (speed) + SSR (freshness) Good for: product pages, news articles 1 // CSR: useEffect fetches after browser render 2 const Dashboard = ( ) = > { 3 const { data } = useQuery ( { queryKey: [ 'dashboard' ], queryFn: api. getDashboard } ) 4 return < DashboardView data = { data } / > 5 } 6 7 // SSR: Next.js App Router, Server Component 8 // app/products/page.tsx 9 async function ProductsPage ( ) { 10 // Runs on server, no useEffect, no loading state 11 const products = await db. product. findMany ( { where: { active: true } } ) 12 return < ProductList products = { products } / > 13 } 14 15 // SSG: Next.js static generation (generated at build) 16 // app/blog/[slug]/page.tsx 17 export async function generateStaticParams ( ) { 18 const posts = await api. getAllPosts ( ) 19 return posts. map ( post = > ( { slug: post. slug } ) ) 20 }",
    interviewLine: "Rendering strategy determines when and where HTML is generated.",
    misconception: "Each has different performance, SEO, and infrastructure implications.",
    hints: [
      "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering"
  },
  {
    id: "nextjs-how-do-you-design-a-data-table-with-sorting-filtering-a",
    title: "How do you design a data table with sorting, filtering, and pagination?",
    prompt: "How do you design a data table with sorting, filtering, and pagination?",
    level: "senior",
    type: "concept",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "25 < table > 26 < thead > 27 { table.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "A production data table handles thousands of rows, complex filters, and must remain performant. TanStack Table (react-table) is the standard: Headless, you own the HTML/CSS, library owns the logic Server-side: sorting/filtering/pagination sent to API Client-side: all data in memory, sort/filter/page locally Server-side vs client-side: Client-side: < 500 rows, simple filtering Server-side: > 500 rows, complex filtering, API-driven Key features to implement: Column sort (asc/desc toggle, multi-sort) Filter per column (text, select, date range, number range) Pagination with page size selector Column resize and reorder Row selection with bulk actions Exportable (CSV, Excel) URL state for table config: Encode sort, filters, page in URL params Shareable, bookmarkable table state 1 import { useReactTable, getCoreRowModel, getSortedRowModel, 2 getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table' 3 4 const DataTable = ( { columns, data } ) = > { 5 const [ sorting, setSorting ] = useState ( [ ] ) 6 const [ filtering, setFiltering ] = useState ( [ ] ) 7 const [ pagination, setPagination ] = useState ( { pageIndex: 0, pageSize: 20 } ) 8 9 const table = useReactTable ( { 10 data, 11 columns, 12 state: { sorting, columnFilters: filtering, pagination }, 13 onSortingChange: setSorting, 14 onColumnFiltersChange: setFiltering, 15 onPaginationChange: setPagination, 16 getCoreRowModel: getCoreRowModel ( ), 17 getSortedRowModel: getSortedRowModel ( ), 18 getFilteredRowModel: getFilteredRowModel ( ), 19 getPaginationRowModel: getPaginationRowModel ( ), 20 manualPagination: false, // true = server-side 21 } ) 22 23 return ( 24 < div >",
    interviewLine: "A production data table handles thousands of rows, complex filters, and must remain performant.",
    misconception: "TanStack Table (react-table) is the standard: Headless, you own the HTML/CSS, library owns the logic Server-side: sorting/filtering/pagination sent to API Client-side: all data in memory, sort/filter/page locally Server-side vs client",
    hints: [
      "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
  }
];
