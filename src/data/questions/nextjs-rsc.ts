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
        text: "Generating static HTML files once at build time that remain identical for every request.",
        isCorrect: false,
        explanation: "Tempting because the server does produce HTML, but the timing is wrong. Build-time generation is SSG; the output is a static file served from a CDN, not rendered per request."
      },
      {
        id: "B",
        text: "Rendering React components entirely in the browser using client-side JavaScript after the page loads.",
        isCorrect: false,
        explanation: "This describes CSR, the opposite of SSR. In CSR the server sends a nearly empty HTML shell and all rendering happens in the browser, which is exactly the problem SSR solves."
      },
      {
        id: "C",
        text: "Rendering React components into full HTML on the server for each request and sending that markup to the client for hydration.",
        isCorrect: true,
        explanation: "Correct. The server runs the component tree per request, returns complete HTML, and the client hydrates it to make the page interactive."
      },
      {
        id: "D",
        text: "Compiling TypeScript source into WebAssembly modules on the server and shipping those binaries to the browser.",
        isCorrect: false,
        explanation: "TypeScript compilation and WebAssembly are build-tooling concerns unrelated to rendering. SSR is about producing HTML from a component tree, not transpiling to a different binary format."
      }
    ],
    correctAnswer: "C",
    explanation: "SSR means the server executes your React component tree and produces a complete HTML document on every incoming request. The browser receives that finished markup, paints the page immediately, and then React hydrates the DOM to attach event listeners. The key word is every: the HTML is generated fresh per request, not cached from a build step.\n\nIn practice this removes the blank-screen period a pure client-side app suffers. Without SSR the browser downloads a JS bundle, fetches data, and only then renders the first pixel. With SSR the first meaningful paint arrives in the initial HTML response, and search-engine crawlers see real text content without executing JavaScript.\n\nThe trade-off is time-to-first-byte: the server must run your render code before it can send a single byte, so slow data fetches inside the component directly delay the response. That is why teams pair SSR with SSG for pages whose content is identical for every visitor, reserving per-request rendering for pages that genuinely depend on the caller.",
    interviewLine: "SSR runs the component tree on the server for each request and ships the finished HTML to the browser, so the first paint doesn't wait for a JS bundle or a data fetch. The cost is that TTFB now includes your render time, which is why you'd reach for SSG when the output is the same for every visitor.",
    misconception: "SSR and SSG both produce HTML on the server, so it is easy to collapse them into one idea. The distinguishing question is when: SSR renders per request, SSG renders once at build time and serves the frozen file thereafter.",
    hints: [
      "Ask yourself when the HTML is produced: at build time or at request time.",
      "The defining verb is per-request rendering on the server, followed by hydration in the browser.",
      "If the output is identical for every visitor and produced once, that is SSG, not SSR."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering",
    example: {
      caption: "A Next.js App Router server component that reads a per-request header, producing different HTML for different callers.",
      language: "jsx",
      code: "// app/dashboard/page.jsx\nimport { headers } from \"next/headers\";\n\nexport default async function DashboardPage() {\n  const h = await headers();\n  const user = h.get(\"x-user-id\") ?? \"guest\";\n  return (\n    <main>\n      <h1>Welcome, {user}</h1>\n      <p>This HTML was generated on the server for this specific request.</p>\n    </main>\n  );\n}"
    }
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
        text: "Server-Side Rendering (SSR), Static Site Generation (SSG), App Router with React Server Components, file-system routing, API routes, and automated image and font optimization.",
        isCorrect: true,
        explanation: "Correct. Next.js is a React framework that bundles those rendering strategies, a file-based router, and production asset pipelines into one tool, so a junior developer can ship a full-stack page without wiring up Express, a static generator, and an image CDN separately."
      },
      {
        id: "B",
        text: "A code editor similar to VS Code that provides syntax highlighting, autocomplete, and live preview for writing HTML files.",
        isCorrect: false,
        explanation: "Tempting only if you conflate \"Next.js\" with a development tool. Next.js runs on the server and in the browser; it produces web pages, it does not edit source code."
      },
      {
        id: "C",
        text: "A relational database engine that replaces PostgreSQL and MySQL, providing SQL queries, connection pooling, and transaction management.",
        isCorrect: false,
        explanation: "This mistakes the framework for the data layer it talks to. Next.js calls `fetch` to reach a database through an API; it stores no rows and exposes no SQL interface."
      },
      {
        id: "D",
        text: "A desktop operating system kernel built on Linux that manages processes, memory allocation, and hardware device drivers.",
        isCorrect: false,
        explanation: "Next.js is a Node.js or edge-runtime application that runs inside an existing OS. It has no kernel, no process scheduler, and no system-call surface."
      }
    ],
    correctAnswer: "A",
    explanation: "A is correct. Next.js is a React framework whose core job is to let you declare how each page is rendered \u2014 server-side per request, statically at build time, or as a React Server Component in the App Router \u2014 and to map file paths inside `app/` or `pages/` to routes. It also ships built-in image and font optimization, plus API routes, so you do not wire up a CDN, a font service, and a separate server framework.\n\nIn practice a single project directory gives you routing, data fetching, and caching. The code above uses Pages Router functions (`getStaticProps`, `getServerSideProps`, `getStaticPaths`) to fetch data at build time or per request; the App Router equivalent is an `async` Server Component that calls `fetch` directly and returns JSX. The capabilities are the same; the syntax moved into the component itself.\n\nAn interviewer may follow up on the trade-off: SSG is fastest at request time but the data is frozen at build or revalidation time, while SSR is always fresh but costs a server round-trip per request. Choosing between them, and knowing when to add `revalidate` for incremental static regeneration, is the first architectural decision in a Next.js project.",
    interviewLine: "Next.js gives me file-system routing, server-side and static rendering, React Server Components in the App Router, and built-in image and font optimization, so I do not have to assemble those from separate libraries. The first decision I make on a new page is whether it should be static, server-rendered, or a client component.",
    misconception: "Treating Next.js as a generic web platform or tool rather than a React-specific framework whose differentiator is choosing a rendering strategy per page and getting routing and asset optimization for free.",
    hints: [
      "Look at what the code does: it fetches data and returns props so a page can render. Ask what Next.js provides that plain `createRoot` in `index.html` does not.",
      "The correct answer lists rendering modes and built-in features of a React framework, not a separate product category like an editor, a database, or an OS.",
      "If you picture a file tree where `app/blog/[id]/page.tsx` maps to a URL, that is the file-system routing Next.js adds on top of React."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "In the App Router, the same SSG capability is an async Server Component that awaits `fetch`; `revalidate` turns it into incremental static regeneration.",
      language: "tsx",
      code: "// app/blog/[id]/page.tsx\ninterface Post {\n  id: string;\n  title: string;\n}\n\nasync function getPost(id: string): Promise<Post> {\n  const res = await fetch(`https://api.example.com/posts/${id}`, {\n    next: { revalidate: 3600 },\n  });\n  return res.json();\n}\n\nexport default async function PostPage({\n  params,\n}: {\n  params: Promise<{ id: string }>;\n}) {\n  const { id } = await params;\n  const post = await getPost(id);\n  return (\n    <article>\n      <h1>{post.title}</h1>\n    </article>\n  );\n}"
    }
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
        text: "RSCs require client browsers to download full Node.js runtimes into WebAssembly.",
        isCorrect: false,
        explanation: "Tempting if you imagine the server environment being replicated inside the browser, but no runtime is shipped. The server renders the component and sends only the serialized output; the browser never executes RSC code."
      },
      {
        id: "B",
        text: "RSCs execute exclusively on the server, have direct database/filesystem access, emit zero client JavaScript bundle overhead, and stream rendered UI to the client.",
        isCorrect: true,
        explanation: "Correct. The component code stays on the server, its rendered tree is serialized and streamed to the client, and the client bundle contains no RSC JavaScript."
      },
      {
        id: "C",
        text: "RSCs can use `useState` and `useEffect` to handle client button click events directly.",
        isCorrect: false,
        explanation: "Tempting if you think of every component as inherently interactive, but RSCs have no client-side lifecycle. `useState` and `useEffect` are client-only hooks; interactive behavior requires a Client Component marked with `'use client'`."
      },
      {
        id: "D",
        text: "RSCs are only compatible with PHP and Apache web servers.",
        isCorrect: false,
        explanation: "RSCs are a React rendering mode that runs on Node.js or Edge runtimes within frameworks like Next.js. They have no dependency on PHP or Apache."
      }
    ],
    correctAnswer: "B",
    explanation: "React Server Components execute entirely on the server during the render phase. Their JavaScript is never included in the client bundle; instead, React serializes the rendered output (a tree of elements and props) and sends that to the browser. A component that queries a Postgres database or reads a config file from the filesystem therefore contributes zero kilobytes to the client's download.\n\nIn a Next.js App Router project, every file under `app/` is a Server Component by default. You can import a Prisma client, call `fs.promises.readFile`, or fetch from an internal service, and none of that code reaches the browser. The client receives only the serialized tree it needs to hydrate interactive parts.\n\nThe boundary is the `'use client'` directive. Once you mark a component as a Client Component, that component and its children are bundled and shipped as JavaScript. You can pass serializable data (strings, numbers, arrays, plain objects) from a Server Component into a Client Component as props, but you cannot pass functions, class instances, or Node.js-specific objects across that boundary.",
    interviewLine: "Server Components render on the server and serialize their output to the client, so I can import a database driver or read the filesystem without adding a single byte to the browser bundle.",
    misconception: "Treating a Server Component like a serverless function whose source still gets bundled for the browser, rather than a rendering mode where the code simply never leaves the server and only the serialized output crosses the wire.",
    hints: [
      "Where does the component's JavaScript actually live at runtime \u2014 on the server, in the browser, or both?",
      "If a component imports a Postgres client, does that module appear in the browser's bundle?",
      "The `'use client'` directive is the line that separates server-only code from code that ships to the browser."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
    example: {
      caption: "The database call and the `getInvoices` module live only on the server; the client receives `rows` as plain serializable data.",
      language: "tsx",
      code: "// app/invoices/page.tsx \u2014 Server Component (no 'use client')\nimport { getInvoices } from \"@/lib/db\";\nimport InvoiceTable from \"./InvoiceTable\";\n\nexport default async function InvoicesPage() {\n  const invoices = await getInvoices({ status: \"unpaid\" });\n  return <InvoiceTable rows={invoices} />;\n}"
    }
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
        text: "Defers the `import()` call until the component enters the render tree, and `<Suspense fallback={...}>` pauses that subtree to show a placeholder while the promise is pending.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` defers the `import()` call until the component enters the render tree, and Suspense is the boundary that pauses that subtree and renders the `fallback` prop while the promise is pending."
      },
      {
        id: "B",
        text: "`React.lazy` can only import CSS stylesheets, not JavaScript components.",
        isCorrect: false,
        explanation: "Tempting if you associate \"lazy loading\" with CSS `@import` or a style tag, but `React.lazy` accepts any module the bundler can split \u2014 the canonical use is a React component module loaded via `import()`."
      },
      {
        id: "C",
        text: "`<Suspense>` catches JavaScript runtime errors like an Error Boundary.",
        isCorrect: false,
        explanation: "Tempting because both wrap a child tree, but Suspense pauses rendering while a promise is pending; it never inspects thrown exceptions. Error Boundaries (`componentDidCatch`, or the new `error` prop) are the mechanism for catching runtime errors."
      },
      {
        id: "D",
        text: "`React.lazy` introduces a fixed artificial delay to reduce battery consumption.",
        isCorrect: false,
        explanation: "Tempting if you imagine \"lazy\" as a throttle or timer, but `React.lazy` simply wraps a dynamic `import()`; the only delay is the real network round-trip for the chunk, which is typically a few hundred milliseconds."
      }
    ],
    correctAnswer: "A",
    explanation: "React.lazy takes a function that returns a dynamic `import()` promise and returns a component. When that component first enters the render tree, React triggers the network fetch for the corresponding JavaScript chunk. `<Suspense fallback={...}>` is the boundary that catches the \"chunk not yet loaded\" state: it pauses rendering of the subtree and shows the `fallback` element instead.\n\nWithout this pattern, every component in the bundle ships with the initial HTML response. With `React.lazy` plus `Suspense`, the browser only downloads the chunk when the user navigates to or scrolls to that part of the UI. In a Next.js App Router project you see the same idea through `next/dynamic`, which wraps `React.lazy` and adds options like `loading` and `ssr`.\n\nIn React 19, `<Suspense>` also suspends on async data \u2014 for example, an `await` inside a Server Component \u2014 not just on lazy chunks. You can nest multiple Suspense boundaries to get independent fallbacks per section, and the fallback is not a separate render pass: React re-renders the subtree once the underlying promise resolves.",
    interviewLine: "React.lazy wraps a dynamic `import()` so the chunk fetches on first render, and Suspense is the boundary that pauses that subtree and shows the `fallback` prop until the promise settles \u2014 it is a rendering pause, not an error catch.",
    misconception: "Suspense is often confused with an Error Boundary because both wrap a subtree, but Suspense pauses rendering while a promise is still pending, whereas an Error Boundary reacts to a value that was actually thrown.",
    hints: [
      "Look at what `React.lazy` actually wraps: it is a `import()` expression, not a static `import` statement.",
      "Ask what React does when a component's chunk has not arrived yet \u2014 it suspends the subtree and renders the `fallback` prop instead.",
      "Suspense pauses rendering; it does not catch thrown exceptions. Error Boundaries handle that."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "Two independent Suspense boundaries let each lazy chunk show its own fallback without blocking the other.",
      language: "tsx",
      code: "\"use client\";\nimport { Suspense, lazy } from \"react\";\n\nconst Dashboard = lazy(() => import(\"./Dashboard\"));\nconst Settings = lazy(() => import(\"./Settings\"));\n\nexport default function App() {\n  return (\n    <div className=\"app\">\n      <Suspense fallback={<p>Loading dashboard\u2026</p>}>\n        <Dashboard />\n      </Suspense>\n      <Suspense fallback={<p>Loading settings\u2026</p>}>\n        <Settings />\n      </Suspense>\n    </div>\n  );\n}"
    }
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
        text: "When building reusable UI primitives like buttons and inputs.",
        isCorrect: false,
        explanation: "Tempting if you equate reusability with class inheritance, but a button or input is stateless or uses a single `useState`, and a function component handles both with zero boilerplate. No class-specific feature is needed for presentational primitives."
      },
      {
        id: "B",
        text: "When managing asynchronous HTTP fetch requests and loading states.",
        isCorrect: false,
        explanation: "Tempting if you remember `componentDidMount` + `setState` as the old fetch pattern, but `useEffect`, custom hooks, Server Components, and the `use` hook all handle async data in function components without a class."
      },
      {
        id: "C",
        text: "When a component requires more than five separate state variables.",
        isCorrect: false,
        explanation: "Tempting if you assume `this.state` scales better than individual `useState` calls, but `useState` and `useReducer` have no call-count limit; the number of state variables is irrelevant to the component type."
      },
      {
        id: "D",
        text: "When implementing an Error Boundary with `getDerivedStateFromError` and `componentDidCatch`.",
        isCorrect: true,
        explanation: "Correct. Error boundaries are the sole feature in React 19 that still requires a class component, because catching render-time errors from children is a class-lifecycle mechanism with no hook equivalent."
      }
    ],
    correctAnswer: "D",
    explanation: "The answer is D. Function components are the default for all new React code, and every class-component capability has a hook equivalent except one: error boundaries. An error boundary must use `static getDerivedStateFromError` to update state during the render phase and `componentDidCatch` to run side effects after the error is caught. No hook in React 19 intercepts errors thrown during the rendering of child components.\n\nIn practice this means a class component for a button, a form, or a data-fetching view adds constructor boilerplate, `this` binding, and forfeits Server Components, the `use` hook, Actions, and the React Compiler. The error boundary is the one place where the class is not legacy but the only available mechanism: the error must be caught on the parent's render path, which is a class-lifecycle concern with no hook analogue.\n\nAn interviewer will probe whether you can replace the boundary with a hook. You cannot. `componentDidCatch` fires specifically when a descendant throws during render, not on unmount, and `getDerivedStateFromError` runs during the render phase itself, before the child unmounts. A `try/catch` around `{children}` in a function component does not work because the error propagates to the nearest boundary before the function component's render completes.",
    interviewLine: "I default to function components for everything. The one exception is an error boundary, where I need `static getDerivedStateFromError` and `componentDidCatch` because there is no hook that intercepts render-time errors from a child component.",
    misconception: "Class components are more scalable or more powerful than function components, so complex or async code should default to a class. In reality every class capability maps to a hook except error boundaries, so the class is strictly the less expressive option everywhere else.",
    hints: [
      "List every class lifecycle method and ask whether a hook replaces it; the one that does not is your answer.",
      "Which React feature has no hook equivalent and still requires a class component in React 19?",
      "The answer is not about state count, async fetching, or reusability; it is about a specific error-handling mechanism tied to the render phase."
    ],
    source: "100-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "Notice that `getDerivedStateFromError` updates state during render and `componentDidCatch` fires after the error is caught; neither has a hook equivalent in React 19.",
      language: "tsx",
      code: "import { Component, type ReactNode } from \"react\";\n\ninterface Props {\n  children: ReactNode;\n  fallback: ReactNode;\n}\n\ninterface State {\n  hasError: boolean;\n  error: Error | null;\n}\n\nexport class ErrorBoundary extends Component<Props, State> {\n  state: State = { hasError: false, error: null };\n\n  static getDerivedStateFromError(error: Error): State {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error: Error, info: { componentStack: string }) {\n    console.error(\"Boundary caught:\", error, info.componentStack);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <div>{this.props.fallback}</div>;\n    }\n    return this.props.children;\n  }\n}"
    }
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
        text: "A package that renders React components to an HTML canvas element so you can visually verify pixel layout in tests without spinning up a full browser environment.",
        isCorrect: false,
        explanation: "Tempting if you read \"renderer\" as a graphics pipeline. `react-test-renderer` produced a plain JS object tree for assertions; it never touched a canvas, WebGL context, or pixel buffer."
      },
      {
        id: "B",
        text: "A server-side rendering helper that serializes the component tree into static HTML strings for initial page delivery, eliminating the need for client-side hydration.",
        isCorrect: false,
        explanation: "Tempting because both involve rendering without a browser. `react-test-renderer` ran in a test runner, returned a `{ type, props, children }` object, and had no connection to SSR, `renderToString`, or HTTP responses."
      },
      {
        id: "C",
        text: "`react-test-renderer` was a package that rendered React components to plain JavaScript objects without a DOM; it is deprecated in React 19 in favor of React Testing Library.",
        isCorrect: true,
        explanation: "Correct. It rendered components to a `{ type, props, children }` object tree with no DOM involvement, and React 19 deprecates it in favour of React Testing Library with a jsdom or browser environment."
      },
      {
        id: "D",
        text: "A Jest-specific plugin that monkey-patches `ReactDOM.render` to intercept every render call and log the vDOM diff into a JSON file for debugging.",
        isCorrect: false,
        explanation: "Tempting if you associate \"test\" with Jest plugins and \"renderer\" with render interception. It was a standalone React package that produced a serializable object tree; it never patched `ReactDOM` or logged diffs."
      }
    ],
    correctAnswer: "C",
    explanation: "`react-test-renderer` was a package that rendered a React element tree into a plain JavaScript object structure, bypassing the DOM entirely. You called `TestRenderer.create(<MyComponent />)` and obtained a tree of `{ type, props, children }` nodes via `renderer.toJSON()`, which you could pass straight to Jest's `toMatchSnapshot`. No `document`, no `window`, no layout \u2014 just the component's output as data.\n\nThe package was deprecated in React 19. The React team recommends React Testing Library with a DOM environment (jsdom in Jest, or the built-in environment in Vitest) and snapshotting the serialized HTML instead. This exercises the same DOM APIs your users hit, so the snapshot reflects what actually renders on screen rather than an internal representation.\n\nThe practical diff in a test file is small \u2014 swap `TestRenderer.create` for `render` and `renderer.toJSON()` for `container` \u2014 but the mental model shifts from asserting on an internal object tree to asserting on the DOM the user sees. If a codebase still imports `react-test-renderer`, treat it as a migration task rather than a stable dependency.",
    interviewLine: "I'd use React Testing Library with jsdom for component tests \u2014 `react-test-renderer` was deprecated in React 19, and its object-tree snapshots skip the DOM APIs that users actually interact with.",
    misconception: "The learner treats `react-test-renderer` as an actively maintained first-party package and assumes snapshot-testing via a JS object tree is still the recommended approach in modern React, when React 19 has deprecated it in favour of DOM-based testing with React Testing Library.",
    hints: [
      "Look at what `renderer.toJSON()` returns versus what Testing Library's `render()` returns into `container`.",
      "Ask yourself: does the output land in `document.body`, or is it just a plain object sitting in memory?",
      "Check whether the React 19 release notes list the package as active or deprecated."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "This is the modern replacement: render into jsdom and assert on the real DOM instead of inspecting a JS object tree.",
      language: "jsx",
      code: "import { render, screen } from '@testing-library/react';\nimport { Counter } from './Counter';\n\ntest('renders initial count', () => {\n  render(<Counter initial={42} />);\n  expect(screen.getByRole('button').textContent).toBe('42');\n});"
    }
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
        text: "A complete rewrite of React's rendering engine that removes the Virtual DOM and requires manual DOM manipulation.",
        isCorrect: false,
        explanation: "React 19 keeps its declarative, reconciling architecture and extends it with new APIs like Actions and the React Compiler. It does not remove the Virtual DOM or require manual DOM manipulation."
      },
      {
        id: "B",
        text: "Actions for async mutations, the `use` hook, stable React Server Components, native `<form action>` support, `ref` as a prop on function components, and the React Compiler.",
        isCorrect: true,
        explanation: "Correct. React 19 adds built-in async mutation handling through Actions, native form integration via `<form action>`, promise and context reading with `use`, direct `ref` props without `forwardRef`, stable Server Components, and the React Compiler for automatic memoization."
      },
      {
        id: "C",
        text: "A breaking release that removes all existing hooks and requires rewriting components in class-based syntax.",
        isCorrect: false,
        explanation: "React 19 is an additive release that layers new features on top of the existing hook and component model. It does not remove existing hooks or mandate class components; functional components and hooks remain the primary way to build React apps."
      },
      {
        id: "D",
        text: "A new language runtime that replaces JavaScript with a different programming language in the browser.",
        isCorrect: false,
        explanation: "React is a JavaScript and TypeScript library that compiles to JavaScript; no React version changes the host language of the browser or Node.js. React 19 does not introduce a new programming language."
      }
    ],
    correctAnswer: "B",
    explanation: "React 19 is an additive release. Its headline features are Actions (`useActionState`, `useFormStatus`, `useOptimistic`) for managing async mutations, the `use` hook for reading promises and context synchronously during render, stable React Server Components, native `<form action={fn}>` support, `ref` as a regular prop on function components, and the React Compiler for automatic memoization.\n\nIn practice this means a form submission no longer needs a hand-rolled `isLoading` flag and `try/catch` around `setState`; you pass an async function to `<form action>` and read pending or error state from `useActionState`. Components stop calling `forwardRef` because `ref` is just another prop. The Compiler removes the need for manual `useMemo` and `useCallback` in most cases.\n\nOne nuance an interviewer will probe: the React Compiler is opt-in and works at build time, not runtime; `use` only works inside render, not in effects or event handlers; and Actions are designed for mutations, not for replacing data-fetching patterns like `use` with a promise or a server component boundary.",
    interviewLine: "React 19 is additive: it adds Actions for async mutations, the `use` hook for reading promises during render, stable Server Components, native `<form action>` with functions, `ref` as a plain prop, and the React Compiler for automatic memoization. The core rendering model and every existing hook are unchanged.",
    misconception: "React 19 is a breaking rewrite that changes the rendering model or removes existing APIs, rather than an additive release that layers async state management, server components, and build-time tooling on top of the existing hook and component model.",
    hints: [
      "Think about what problem each feature solves: async form handling, reading async data in render, server-side rendering, ref forwarding, and performance.",
      "Which of these are additive new APIs versus breaking removals of existing ones?",
      "React 19 does not change the host language, remove functional components, or require a different DOM library."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "`useActionState` gives you pending and message state for free, so the form no longer needs a separate `isLoading` flag or a `try/catch` around `setState`.",
      language: "tsx",
      code: "\"use client\";\n\nimport { useActionState } from \"react\";\n\nasync function submitForm(prev: string, formData: FormData) {\n  const email = formData.get(\"email\") as string;\n  await fetch(\"/api/subscribe\", {\n    method: \"POST\",\n    body: JSON.stringify({ email }),\n  });\n  return \"Subscribed!\";\n}\n\nexport function Subscribe() {\n  const [message, formAction, pending] = useActionState(submitForm, \"\");\n\n  return (\n    <form action={formAction}>\n      <input name=\"email\" type=\"email\" required />\n      <button disabled={pending}>\n        {pending ? \"Sending\u2026\" : \"Subscribe\"}\n      </button>\n      {message && <p>{message}</p>}\n    </form>\n  );\n}"
    }
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
        text: "Components that can use `useState` and `useEffect` to handle client button click events directly.",
        isCorrect: false,
        explanation: "Tempting if you conflate a Server Component with a regular React component that happens to be rendered on the server first. In reality, any component that calls `useState`, `useEffect`, or attaches event handlers must be a Client Component marked with `'use client'`; the Server Component body has no client-side execution at all."
      },
      {
        id: "B",
        text: "Components that are only compatible with PHP and Apache web servers.",
        isCorrect: false,
        explanation: "This reads like a server-side rendering framework from the 2010s. React Server Components run on Node.js or Edge runtimes inside the JavaScript ecosystem; they have no dependency on PHP, Apache, or any non-JavaScript web server stack."
      },
      {
        id: "C",
        text: "Components that execute strictly on the server, have direct access to backend resources (DB/files), ship zero JavaScript to the client bundle, and stream rendered UI to the browser.",
        isCorrect: true,
        explanation: "Correct. A Server Component's entire lifecycle happens server-side: it runs, serializes its output, and the client receives a tree it can display immediately. Because no component code ships, the bundle stays lean and backend resources are reachable without a network hop."
      },
      {
        id: "D",
        text: "Components that require the user to download a full Node.js runtime into browser WebAssembly.",
        isCorrect: false,
        explanation: "This imagines the server code running inside the browser, which is the opposite of the design. The server executes the component and sends a serialized payload; the browser never downloads or runs a Node.js runtime, WebAssembly or otherwise."
      }
    ],
    correctAnswer: "C",
    explanation: "Server Components render entirely on the server. Their output is serialized into a React Server Component payload, a compact tree of component types, props, and text nodes that the browser receives. No JavaScript for the Server Component itself is included in the client bundle.\n\nIn practice this means you can `await` a database call, read a file, or query an internal API directly in the component body, with no `useEffect` round-trip and no loading state for the initial render. The trade-off is that a Server Component cannot call `useState`, `useEffect`, or `useRef`, attach `onClick` handlers, or touch `window` and `document`.\n\nThe boundary is the `'use client'` directive. A Server Component imports a Client Component and passes it serializable props; the client hydrates only that subtree. Everything above the boundary ships as pre-rendered markup plus the serialized tree, keeping the bundle small for non-interactive content.",
    interviewLine: "A Server Component runs to completion on the server, so I can `await` a database query in the component body and pass the result as a prop to a Client Component; the client never receives that component's JavaScript, only the serialized tree and the hydrated interactive subtree.",
    misconception: "Treating Server Components as a rename of traditional SSR: in SSR the server sends HTML and the client hydrates every component, whereas a Server Component is never hydrated at all, its output is a static serialized tree that only Client Component children hydrate around.",
    hints: [
      "The defining constraint is where the component's code executes, not where the HTML is generated.",
      "Ask yourself: does the browser ever receive and run the component's function body, or only a serialized description of its output?",
      "The `'use client'` directive is the only boundary that matters; everything without it stays on the server."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
    example: {
      caption: "The `await` runs on the server; only the serializable `data` prop crosses to the client where `RevenueChart` hydrates.",
      language: "tsx",
      code: "// app/dashboard/page.tsx  (Server Component by default)\nimport { getRevenue } from \"@/lib/db\";\nimport { RevenueChart } from \"./revenue-chart\";\n\nexport default async function DashboardPage() {\n  const revenue = await getRevenue(\"2025\");\n  return (\n    <main>\n      <h1>Dashboard</h1>\n      <p>{revenue.total} USD this year</p>\n      <RevenueChart data={revenue.monthly} />\n    </main>\n  );\n}"
    }
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
        text: "Client Components cannot receive props from Server Components.",
        isCorrect: false,
        explanation: "Tempting if you picture the `'use client'` boundary as a wall that blocks data flow. In reality, Server Components pass serializable props and JSX children to Client Components every render; that is the primary way data crosses the boundary."
      },
      {
        id: "B",
        text: "Server Components cannot import Client Components under any circumstances.",
        isCorrect: false,
        explanation: "This inverts the import rule. Server Components import and render Client Components freely; the `'use client'` directive simply marks where the client boundary begins. What is forbidden is the reverse: a Client Component importing a Server Component by name."
      },
      {
        id: "C",
        text: "There is no difference; all components execute on both server and client equally.",
        isCorrect: false,
        explanation: "This treats Server and Client Components as the same code running in two places. They are different compilation targets: one produces a serialized RSC payload with zero shipped JavaScript, the other produces a JS bundle that hydrates. The capabilities (`useState`, event handlers, `await` top-level) diverge accordingly."
      },
      {
        id: "D",
        text: "Server Components run only on the server and can directly await data, shipping 0KB JS; Client Components (`'use client'`) run on client and SSR, handling interactivity, state, and browser APIs.",
        isCorrect: true,
        explanation: "Correct. This captures the two compilation targets, the zero-JS guarantee for Server Components, and the interactivity and state ownership that Client Components provide."
      }
    ],
    correctAnswer: "D",
    explanation: "Server Components are a compilation target in Next.js App Router that executes only on the server. The compiler serializes their rendered output into an RSC payload (a wire format, not JavaScript) and sends that to the browser. No JavaScript bundle for a Server Component ever reaches the client, which is why they can call `await` on a database or API directly and pass the result down as a prop. Client Components, marked with the `'use client'` directive, are compiled into a JavaScript bundle that hydrates in the browser, giving them access to `useState`, `useEffect`, event handlers, and browser APIs.\n\nIn practice this means a page like `app/dashboard/page.tsx` can be a Server Component that fetches revenue data and hands it to a `<RevenueChart>` Client Component. The chart component owns its hover state and click handlers, while the server component's `await getRevenue()` call never appears in the client bundle. The server component's code is gone after rendering; only the serialized tree and the client component's JS survive.\n\nThe import boundary is one-directional: a Server Component can import and render a Client Component, but a Client Component cannot import a Server Component directly. It can only receive Server Components as props or children. Also, Client Components still execute on the server during SSR to produce the initial HTML; `'use client'` marks the hydration boundary, not a ban on server-side execution.",
    interviewLine: "Server Components are a compilation target that produces a serialized RSC payload with zero JavaScript shipped, so I can `await` a database call directly and pass the result as a prop to a `'use client'` component that owns the interactive state and event handlers.",
    misconception: "Treating Server and Client Components as the same component that \"runs in two places\" rather than two distinct compilation targets with different capabilities and a strictly one-way import boundary (Server \u2192 Client allowed, Client \u2192 Server not).",
    hints: [
      "Look at what the compiler emits: does the component's code end up in a JavaScript bundle sent to the browser, or in a serialized payload with no executable code?",
      "Ask which capabilities each side gets: can it call `useState`, register an `onClick`, or `await` a top-level promise?",
      "The import boundary is one-directional. Which direction is it, and what is the alternative for the blocked direction?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
    example: {
      caption: "Notice the `await` in the Server Component and the `useState` in the Client Component \u2014 each lives where it is allowed, and the data crosses the boundary as a plain prop.",
      language: "tsx",
      code: "// app/dashboard/page.tsx \u2014 Server Component\nimport { getRevenue } from \"@/lib/db\";\nimport { RevenueChart } from \"./revenue-chart\";\n\nexport default async function DashboardPage() {\n  const revenue = await getRevenue(\"2024\");\n  return <RevenueChart data={revenue} />;\n}\n\n// app/dashboard/revenue-chart.tsx \u2014 Client Component\n\"use client\";\nimport { useState } from \"react\";\n\nexport function RevenueChart({ data }: { data: number[] }) {\n  const [hovered, setHovered] = useState<number | null>(null);\n  return (\n    <div>\n      {data.map((v, i) => (\n        <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ opacity: hovered === i ? 1 : 0.6 }}>\n          {v}\n        </div>\n      ))}\n    </div>\n  );\n}"
    }
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
        text: "A CSS stylesheet compiler that replaces utility frameworks like Bootstrap in production builds.",
        isCorrect: false,
        explanation: "Tempting if you conflate styling tooling with the application framework, but Next.js does not compile or emit CSS; it ships React apps with rendering strategies, routing, and build tooling."
      },
      {
        id: "B",
        text: "A React framework adding SSR, SSG, Server Components, route-based code splitting, and API handlers.",
        isCorrect: true,
        explanation: "Correct. Next.js is a React framework that layers SSR, SSG, Server Components, route-based code splitting, and API handlers on top of the React you already write."
      },
      {
        id: "C",
        text: "A desktop operating system with a built-in web view, package manager, and hardware abstraction.",
        isCorrect: false,
        explanation: "This treats a web application framework as an operating system. Next.js runs in a browser and on Node.js; it has no kernel, no system calls, and no hardware abstraction layer."
      },
      {
        id: "D",
        text: "A relational database engine with a SQL dialect, connection pooling, and query optimization.",
        isCorrect: false,
        explanation: "This mistakes an API route handler for a database engine. Next.js can call a database through your code, but it does not store, index, or query rows itself."
      }
    ],
    correctAnswer: "B",
    explanation: "Next.js is a React framework. It extends React with a rendering pipeline, file-based routing, and build tooling so a production app does not require assembling those pieces by hand.\n\nIn practice, you create a folder per route and Next.js decides how to render it. SSG bakes HTML at build time, SSR renders on each request, and the App Router adds React Server Components that execute only on the server. Route-based code splitting, image optimization via `next/image`, and API route handlers all come from the framework layer, not from React itself.\n\nThe nuance an interviewer probes: Next.js does not replace React. You still write components, hooks, and state as in any React app. The framework sits above the component tree and decides where and when it renders, what gets split into chunks, and what runs on the server versus the client.",
    interviewLine: "Next.js is a React framework, not a replacement for React. It adds a rendering pipeline\u2014SSR, SSG, Server Components\u2014plus file-based routing and route-level code splitting, so I write components the same way and let the framework decide where and when they execute.",
    misconception: "Treating Next.js as a standalone technology rather than a layer on top of React, which makes it easy to confuse it with a CSS tool, an OS, or a database because the word \"framework\" is vague and the tool touches many layers.",
    hints: [
      "Ask yourself: does this tool render HTML in a browser or on a server, or does it do something entirely different like compile styles or manage hardware?",
      "Next.js sits on top of React. Which of these options is a framework that extends an existing UI library rather than replacing it?",
      "A CSS compiler, an operating system, and a database all operate at a different system layer than a web application framework."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Two files, two features: the framework turns a folder into a rendered page and a route handler into an HTTP endpoint without extra configuration.",
      language: "tsx",
      code: "// app/dashboard/page.tsx\nexport default function DashboardPage() {\n  return <h1>Dashboard</h1>;\n}\n\n// app/api/health/route.ts\nimport { NextResponse } from \"next/server\";\n\nexport async function GET() {\n  return NextResponse.json({ status: \"ok\" });\n}"
    }
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
        text: "Rasterize the full 100,000-row list into a single server-rendered SVG image and scroll the image inside a fixed-height container.",
        isCorrect: false,
        explanation: "Tempting if you want zero client-side work, but a flat image has no DOM nodes to select, focus, or screen-read, so text search, keyboard navigation, per-row actions, and accessibility all disappear."
      },
      {
        id: "B",
        text: "Mount all 100,000 DOM nodes on first render, then toggle `display: none` on rows outside the visible viewport as the user scrolls.",
        isCorrect: false,
        explanation: "Tempting because `display: none` removes a node from paint, but the browser still allocates, stores, and reconciles all 100,000 nodes in the DOM tree, so memory stays in the gigabytes and layout recalculation remains O(n) on every scroll frame."
      },
      {
        id: "C",
        text: "Compute the visible index range from scroll offset and viewport height, render only those rows positioned absolutely within a full-height spacer, and swap the mounted set on scroll.",
        isCorrect: true,
        explanation: "Correct. Windowing keeps the live DOM at a few dozen nodes regardless of list size, so memory, layout, and paint cost stay constant while the spacer div preserves the correct scrollbar height."
      },
      {
        id: "D",
        text: "Fire an async fetch for each newly visible row on every scroll event, appending the response as a new DOM node without any windowing.",
        isCorrect: false,
        explanation: "Tempting if you conflate lazy-loading with virtualization, but without a fixed window the DOM grows monotonically, every scroll tick hammers the network, and the main thread stalls on repeated fetch-and-append cycles."
      }
    ],
    correctAnswer: "C",
    explanation: "The correct approach is windowing: track scroll offset and viewport height, compute the visible index range (typically 20\u201350 rows at 72 px each inside a 600 px container), render only those rows positioned absolutely within a container whose height equals `totalItems \u00d7 rowHeight`, and swap the mounted set as the user scrolls. The browser's layout, paint, and garbage-collection work scales with the ~40 live nodes, not 100,000.\n\nWithout this, 100,000 DOM nodes consume hundreds of megabytes of heap, the initial render blocks the main thread for several seconds, and every scroll frame forces layout recalculation across the full tree. With windowing the DOM stays at a few dozen nodes whether the list holds 10,000 or 10,000,000 rows, so memory and frame time are constant.\nThe nuance an interviewer probes next is variable row height. Fixed-height math breaks the moment rows differ, so libraries like TanStack Virtual pair `estimateSize` with a `measureElement` pass, and react-virtuoso adds a dynamic sizing engine. You also need an overscan margin (a few extra rows above and below the viewport) to prevent blank flashes during fast scrolls, and a decision about whether to recycle keyed nodes or unmount and remount \u2014 recycling wins when rows carry internal state such as a focused input.",
    interviewLine: "I'd use a windowing approach: compute the visible index range from scroll offset and viewport height, mount only those rows with absolute positioning inside a container sized to `totalItems \u00d7 rowHeight`, add a small overscan buffer, and swap the mounted set on scroll so the live DOM stays at a few dozen nodes no matter how large the list is.",
    misconception: "Hiding off-screen rows with `display: none` is equivalent to not rendering them, because the browser only paints visible nodes. In reality the browser still allocates, stores, and reconciles every node in the DOM tree, so memory and layout cost scale with total node count, not visible count.",
    hints: [
      "Count the DOM nodes the browser must allocate, lay out, and paint \u2014 not just the ones the user can see.",
      "What is the browser actually doing with 100,000 nodes versus 40 nodes: memory allocation, reconciliation, layout, paint \u2014 which of those does `display: none` actually skip?",
      "Hiding a node removes it from paint but not from the DOM tree, so the allocation and reconciliation cost remain."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the math isolates the visible range and the two spacers preserve total scroll height without mounting the full list.",
      language: "typescript",
      code: "function useWindow(\n  scrollTop: number,\n  viewportH: number,\n  rowH: number,\n  total: number,\n  overscan = 3\n) {\n  const first = Math.max(0, Math.floor(scrollTop / rowH) - overscan);\n  const last  = Math.min(total, Math.ceil((scrollTop + viewportH) / rowH) + overscan);\n  return {\n    first,\n    last,\n    topPad:    first * rowH,\n    bottomPad: (total - last) * rowH,\n  };\n}"
    }
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
        text: "Set all CSS animations to run indefinitely at 240 fps using infinite `requestAnimationFrame` recursion.",
        isCorrect: false,
        explanation: "Tempting if you conflate perceived smoothness with real performance, but an unbounded `requestAnimationFrame` loop keeps the main thread busy every frame, inflating long-task duration and wrecking INP while adding zero user value."
      },
      {
        id: "B",
        text: "Remove all image `width` and `height` attributes to let the browser guess layout dimensions dynamically.",
        isCorrect: false,
        explanation: "Tempting if you assume the browser infers intrinsic size on its own, but without explicit dimensions the element collapses to zero height until the file decodes, producing a large layout shift that CLS records as a single bad score."
      },
      {
        id: "C",
        text: "Optimize LCP (<2.5 s) with preloading and CDNs, INP (<200 ms) by breaking long main-thread tasks, and CLS (<0.1) by reserving explicit image dimensions.",
        isCorrect: true,
        explanation: "Correct. These are the three field metrics with their good thresholds, and each improvement strategy targets the specific bottleneck the metric measures."
      },
      {
        id: "D",
        text: "Bundle all npm dependencies into a single uncompressed 20 MB script tag in `<head>`.",
        isCorrect: false,
        explanation: "Tempting if you equate fewer HTTP requests with faster loads, but a 20 MB synchronous script in `<head>` blocks HTML parsing, delays first paint, and pushes LCP well past the 2.5 s good threshold."
      }
    ],
    correctAnswer: "C",
    explanation: "Core Web Vitals are three field metrics Google uses as a ranking signal: LCP measures when the largest visible element paints (good under 2.5 s), INP measures the longest gap between a user interaction and the next visual response (good under 200 ms), and CLS accumulates every unexpected layout shift (good under 0.1). INP replaced First Input Delay in March 2024.\n\nIn a Next.js App Router project the most common wins are concrete: use `next/image` with explicit `width` and `height` so the browser reserves space before the file arrives (CLS), preload the hero asset with `<link rel=\"preload\" as=\"image\">` so it enters the critical path early (LCP), and chunk heavy work with `scheduler.yield()` or `requestIdleCallback` so no single task exceeds 50 ms on the main thread (INP).\n\nThe nuance an interviewer probes: LCP is measured on the largest element only, so a hero video poster counts but a small sidebar image does not; CLS is a score, not a count, so one 0.15 shift is worse than ten 0.01 shifts; and INP reports the worst interaction in the session, so a single 300 ms long task can sink the metric even if 99% of interactions are instant.",
    interviewLine: "I treat LCP, INP, and CLS as the three user-facing signals: I preload the hero asset and route static files through a CDN for LCP, I break long tasks with `scheduler.yield()` for INP, and I always set explicit `width` and `height` on images for CLS.",
    misconception: "Treating Core Web Vitals as lab benchmarks you can game with configuration rather than field metrics that measure what real users actually experience on their own devices and networks.",
    hints: [
      "Identify the three metrics by the user moment they capture: first meaningful paint, interaction responsiveness, and layout stability.",
      "For each metric ask what single code-level change moves the number: preload for LCP, task chunking for INP, reserved dimensions for CLS.",
      "The correct answer names all three metrics with their good thresholds and pairs each with a concrete, non-contradictory fix."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice how `priority` and explicit dimensions handle LCP and CLS in one component, while `scheduler.yield()` keeps the click handler under the 50 ms long-task threshold for INP.",
      language: "tsx",
      code: "import Image from \"next/image\";\n\nexport default function ProductPage({ product }: { product: { name: string; img: string } }) {\n  const reorder = async () => {\n    const rows = Array.from({ length: 10_000 }, (_, i) => i);\n    let total = 0;\n    for (let i = 0; i < rows.length; i += 500) {\n      const chunk = rows.slice(i, i + 500);\n      total += chunk.reduce((s, n) => s + n, 0);\n      await scheduler.yield();\n    }\n    console.log(\"Reorder complete:\", total);\n  };\n\n  return (\n    <main>\n      <Image src={product.img} alt={product.name} width={800} height={600} priority />\n      <h1>{product.name}</h1>\n      <button onClick={reorder}>Reorder</button>\n    </main>\n  );\n}"
    }
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
        text: "CSR renders in browser JS; SSR renders HTML on each request; SSG renders at build time; ISR regenerates static pages in the background on demand.",
        isCorrect: true,
        explanation: "Correct. Each strategy is defined by when HTML is produced: client-side JS execution, per-request server render, build-time pre-render, and background revalidation of a previously static file respectively."
      },
      {
        id: "B",
        text: "SSG and SSR are identical because both execute on the client device inside a background Web Worker.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'server' with 'any non-interactive process,' but SSG runs once on the CI build machine and SSR runs on the request-serving server; neither involves a Web Worker, and they differ in whether the HTML is pre-computed or computed per request."
      },
      {
        id: "C",
        text: "ISR requires rebuilding the entire website from scratch whenever a single page content changes.",
        isCorrect: false,
        explanation: "This treats ISR like a full rebuild pipeline, but the 'I' stands for incremental: only the stale page's HTML is regenerated in the background while the old file continues to be served to incoming requests."
      },
      {
        id: "D",
        text: "CSR is the recommended strategy for high-performance public e-commerce SEO landing pages.",
        isCorrect: false,
        explanation: "This inverts the trade-off: CSR delivers an empty HTML shell to crawlers and delays First Contentful Paint until JavaScript executes, which is the opposite of what an SEO-sensitive public page needs."
      }
    ],
    correctAnswer: "A",
    explanation: "The four strategies differ in when and where HTML is produced. CSR ships an empty shell plus a JS bundle; the browser executes JavaScript before any content appears. SSR renders the page on the server for every request, so the first HTML response already contains content. SSG pre-renders HTML at build time and serves the file from a CDN. ISR keeps that static file but revalidates after a configured interval, serving the stale copy immediately while regenerating in the background.\n\nIn Next.js App Router this maps to concrete syntax: an async Server Component with an `await` is SSR; adding `generateStaticParams` makes it SSG; exporting a `revalidate` number turns it into ISR. A `useEffect` + `fetch` in a Client Component is CSR. Mixing them on one page is standard\u2014the server component provides initial HTML, a client component hydrates and fetches user-specific data after.\n\nThe nuance an interviewer probes next: ISR uses stale-while-revalidate, so two users hitting the same URL within the revalidation window may briefly see different content. In App Router, `revalidate` applies per route segment, not per component, so a value on a layout revalidates every page beneath it.",
    interviewLine: "I pick the strategy based on when the data changes and who needs the HTML: SSG for content that ships with the build, ISR when it refreshes on a schedule, SSR when it depends on the request, and CSR only for client-only interactivity that does not need to be in the initial HTML.",
    misconception: "Treating the four strategies as a single axis of 'server vs client' when they actually differ along two independent dimensions: when the HTML is computed (build time, request time, or a later scheduled pass) and where it is computed (browser, request-serving server, or build machine).",
    hints: [
      "Ask yourself: when is the HTML string actually produced\u2014before the user connects, during their request, or after their browser has already loaded the page?",
      "In Next.js App Router, `generateStaticParams` plus a `revalidate` export is the minimal ISR setup; without `revalidate` it is plain SSG.",
      "A Web Worker runs in the browser's thread pool, not on a server, so any option placing rendering there is describing the wrong execution environment."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/rendering",
    example: {
      caption: "Notice that `revalidate` is a route-level export, not a per-component prop, and that the page still renders synchronously with `await`\u2014the background regeneration is invisible to the user.",
      language: "tsx",
      code: "// app/products/[id]/page.tsx\n// ISR: serves stale HTML immediately, regenerates in background after 60 s\nexport const revalidate = 60;\n\nexport default async function ProductPage({\n  params,\n}: {\n  params: Promise<{ id: string }>;\n}) {\n  const { id } = await params;\n  const product = await db.product.findUnique({ where: { id } });\n\n  if (!product) return notFound();\n\n  return <ProductDetail product={product} />;\n}"
    }
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
        text: "Store column visibility and sorting state in global immutable Redux stores that cannot be parameterized.",
        isCorrect: false,
        explanation: "Table state is best modeled as URL query params or local component state so multiple tables can coexist."
      },
      {
        id: "B",
        text: "Force all sorting and filtering to occur strictly on the backend with full page reloads for every column click.",
        isCorrect: false,
        explanation: "Full page reloads for simple sorting destroy SPA responsiveness; client or async AJAX updates are standard."
      },
      {
        id: "C",
        text: "Use a headless table hook (e.g. TanStack Table) to manage column models, sorting, filtering, and pagination state, combining with virtualization for large datasets.",
        isCorrect: true,
        explanation: "Correct. Headless table libraries manage data transformations, multi-column sorting, faceted filtering, and pagination while giving 100% control over UI rendering."
      },
      {
        id: "D",
        text: "Render 50,000 raw table `<tr>` rows directly in the DOM and sort them using synchronous `Array.prototype.sort` in render.",
        isCorrect: false,
        explanation: "Rendering 50,000 table rows freezes the browser DOM; sorting inside render recalculates on every state update."
      }
    ],
    correctAnswer: "C",
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
