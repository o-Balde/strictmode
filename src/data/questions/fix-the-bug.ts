import { QuizQuestion } from '../types';

export const FIX_THE_BUG_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-are-linters",
    title: "What are linters?",
    prompt: "What are linters?",
    level: "junior",
    type: "fix",
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
        text: "Transpilers that convert modern JavaScript and TypeScript syntax (optional chaining, modules) into ES5-compatible output for older browsers.",
        isCorrect: false,
        explanation: "That describes Babel or the TypeScript compiler's emit step. A linter reads and reports; it never produces a transformed output file."
      },
      {
        id: "B",
        text: "Runtime profilers that instrument production bundles to track React render cycles, memory leaks, and network latency.",
        isCorrect: false,
        explanation: "That describes React DevTools, Sentry, or Chrome's Performance panel\u2014tools that observe code *while it runs*. A linter works on the source text before any execution."
      },
      {
        id: "C",
        text: "Static analysis tools (like ESLint) that inspect source code without executing it to flag syntax issues, anti-patterns, style violations, and Rules of Hooks mistakes.",
        isCorrect: true,
        explanation: "Correct. Linters parse code into an AST and check it against rules without running it, catching problems like missing `useEffect` dependencies or unused variables at edit time and in CI."
      },
      {
        id: "D",
        text: "Code formatters (like Prettier) that automatically rewrite and re-indent source files to enforce a consistent visual style.",
        isCorrect: false,
        explanation: "Prettier does rewrite files, but it only changes formatting\u2014whitespace, quotes, line breaks. A linter *reports* findings (warnings, errors) and leaves the code unchanged unless you explicitly run `--fix`."
      }
    ],
    correctAnswer: "C",
    explanation: "Linters are static analysis tools that parse your source code into an Abstract Syntax Tree (AST) and walk it against a configurable set of rules. They never execute the code. ESLint, for example, flags an unused variable, a missing dependency in `useEffect`, or a `return` before an `await` in an `async` function\u2014all before the code ever reaches a browser.\n\nIn a real team, this matters because a linter wired into your editor and CI pipeline turns subjective style debates into objective, machine-enforced rules. A junior developer's `console.log` left in a PR or a forgotten `key` prop gets caught at commit time instead of in a code review three days later.\n\nThe nuance interviewers probe: a linter reports problems; it does not fix them. Prettier is a formatter that rewrites code, and `tsc` is a type checker that validates types. All three are static-analysis tools, but they answer different questions. ESLint asks \"is this pattern dangerous or inconsistent?\", Prettier asks \"does this look the same as the rest of the file?\", and `tsc` asks \"do these types line up?\" Confusing them leads to misconfigured pipelines\u2014expecting ESLint to reformat indentation, or expecting Prettier to catch a missing `useEffect` dependency.",
    interviewLine: "A linter like ESLint parses the source into an AST and checks it against rules without ever executing the code, so it catches a missing `useEffect` dependency or an unused variable at edit time and in CI, well before the code runs in a browser.",
    misconception: "Treating a linter as a code transformer\u2014something that rewrites, transpiles, or formats your file\u2014rather than a diagnostic tool that only reports findings against a rule set.",
    hints: [
      "Think about what happens between you saving a file and the browser executing it. Does a linter run the code, or does it only read the source text?",
      "ESLint, Prettier, and `tsc` are all static tools, but they do different jobs. A linter's job is to report findings, not to rewrite or transpile the file.",
      "The defining word is \"without executing.\" The tool inspects structure and patterns in the AST and emits warnings or errors pointing at specific lines."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "ESLint with the `react-hooks` plugin flags the missing `userId` dependency before the component ever renders.",
      language: "tsx",
      code: "function UserProfile({ userId }: { userId: string }) {\n  const [name, setName] = useState(\"\");\n\n  useEffect(() => {\n    fetch(`/api/users/${userId}`)\n      .then((r) => r.json())\n      .then((u) => setName(u.name));\n  }, []); // \u26a0\ufe0f 'userId' is missing from the dependency array\n\n  return <h1>{name}</h1>;\n}"
    }
  },
  {
    id: "system_design-what-architectural-solutions-for-react-do-you-know",
    title: "What architectural solutions for React do you know?",
    prompt: "What architectural solutions for React do you know?",
    level: "junior",
    type: "fix",
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
        text: "Applying the classic MVC pattern where a single Controller class mediates all data flow between a shared Model and every View component.",
        isCorrect: false,
        explanation: "Tempting if you come from Java or PHP, where MVC is the default. In React, components are simultaneously view and controller; the unidirectional data flow (props down, events up) and composition replace the mediator, and a central Controller becomes a god-object that forces the entire tree to re-render on every change."
      },
      {
        id: "B",
        text: "Centralizing every piece of state\u2014server data, form fields, UI toggles\u2014into one global Redux store with a single root reducer.",
        isCorrect: false,
        explanation: "This was the dominant 2017\u20132019 prescription and still lingers in legacy codebases. The problem is that unrelated features re-render when any slice changes, server-data lifecycles (caching, retries, deduplication) are hand-rolled, and the single store becomes a merge-conflict magnet. Modern stacks split server state (TanStack Query) from UI state (Zustand, Jotai) to keep those concerns independent."
      },
      {
        id: "C",
        text: "Layered file architectures (Feature-Sliced Design, Atomic Design), explicit state boundaries (TanStack Query for server state, Zustand for global UI state), and a hybrid Server/Client Component rendering strategy.",
        isCorrect: true,
        explanation: "Correct. These three axes\u2014file organization, state ownership, and rendering mode\u2014are orthogonal decisions that together keep a large React codebase navigable, performant, and team-scalable."
      },
      {
        id: "D",
        text: "Wrapping the entire application in a single top-level higher-order component that injects all shared context, theme, and data-fetching logic into every descendant.",
        isCorrect: false,
        explanation: "HOCs were popular in the 2018\u20132020 era, but a single all-encompassing HOC creates deep nesting, obscures which props come from where, and forces every consumer to re-render when any injected value changes. Composition, narrow React context providers, and custom hooks achieve the same sharing with clearer boundaries."
      }
    ],
    correctAnswer: "C",
    explanation: "Modern React architecture is a stack of orthogonal decisions, not a single pattern. At the file-structure level, methodologies like Feature-Sliced Design (FSD) slice the codebase into layers (app, processes, pages, modules, entities, shared) so imports only flow downward, while Atomic Design decomposes UI into atoms \u2192 molecules \u2192 organisms. At the state level, the key insight is separating server state (fetched data with caching, invalidation, retries\u2014handled by TanStack Query) from client/UI state (theme, modals, form drafts\u2014handled by Zustand, Jotai, or local useState). Mixing both into one global store was the dominant 2018 pattern but creates unnecessary re-renders and couples unrelated features. At the rendering level, Next.js App Router lets Server Components fetch and stream data without shipping that code to the client, while Client Components handle interactivity; the boundary is marked by the 'use client' directive.\n\nIn real code this means a team of ten can own separate FSD slices without merge conflicts, a server-state change in one feature does not re-render an unrelated modal, and initial HTML is sent before any client bundle executes.\n\nA nuance interviewers probe: what happens when a Server Component needs to pass an event handler to a Client Component child? You cannot pass a function across that boundary, so the handler must be defined inside the Client Component, receiving data as serializable props from the parent.",
    interviewLine: "I treat architecture as three orthogonal axes: how I slice the file tree (FSD layers or Atomic Design), where each piece of state lives (server state in TanStack Query, UI state in Zustand, local state in useState), and which components render on the server versus the client in Next.js App Router. Keeping those decisions independent means a team can restructure one axis without touching the others.",
    misconception: "Believing React architecture is one monolithic pattern (like MVC or 'one big Redux store') rather than a set of independent, orthogonal decisions about file structure, state ownership, and rendering strategy.",
    hints: [
      "Think about what you'd tell a new team lead: how do you organize files, where does state live, and where does rendering happen?",
      "The three axes are independent. A file-structure methodology does not dictate your state library, and your rendering strategy does not dictate your folder layout.",
      "Look for an answer that names at least one concrete approach per axis\u2014organization, state, and rendering\u2014rather than a single monolithic pattern."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice three separate state mechanisms\u2014TanStack Query for server data, Zustand for feature-level UI state, and local useState for component-private state\u2014each with its own lifecycle and invalidation strategy.",
      language: "tsx",
      code: "import { useQuery } from \"@tanstack/react-query\";\nimport { useCartStore } from \"../../entities/cart/model/store\";\n\n// Server state: cached, auto-retried, deduplicated\nfunction useProducts() {\n  return useQuery({\n    queryKey: [\"products\"],\n    queryFn: fetchProducts,\n  });\n}\n\n// Feature-level UI state: shared across cart components\nconst useCartItems = () => useCartStore((s) => s.items);\n\n// Component-private state: only this button cares\nfunction CartButton() {\n  const [open, setOpen] = useState(false);\n  const { data: products } = useProducts();\n  const items = useCartItems();\n\n  return (\n    <button onClick={() => setOpen(!open)}>\n      {items.length} / {products?.length ?? 0}\n    </button>\n  );\n}"
    }
  },
  {
    id: "nextjs-what-is-feature-sliced-design",
    title: "What is Feature-Sliced Design?",
    prompt: "What is Feature-Sliced Design?",
    level: "intermediate",
    type: "fix",
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
        text: "A React component library that ships pre-built, themeable UI primitives with built-in accessibility and design tokens.",
        isCorrect: false,
        explanation: "The word \"Design\" makes this tempting, but FSD ships no components, no theme provider, and no npm package. It is a convention you enforce through folder structure and import rules, not a runtime you consume."
      },
      {
        id: "B",
        text: "An architectural methodology that organizes frontend code into layers (App, Pages, Widgets, Features, Entities, Shared) with strictly unidirectional dependencies flowing downward.",
        isCorrect: true,
        explanation: "Correct. FSD is purely a structural convention: a fixed layer hierarchy plus a one-directional import rule that keeps features decoupled and the codebase navigable at team scale."
      },
      {
        id: "C",
        text: "A Next.js build plugin that splits the JavaScript bundle by feature route to reduce initial page-load transfer size.",
        isCorrect: false,
        explanation: "\"Sliced\" evokes code-splitting, but FSD has no build step, no webpack or Turbopack config, and no effect on chunk boundaries. It constrains where code lives in the source tree, not how the bundler parcels it."
      },
      {
        id: "D",
        text: "A state-management pattern in which each feature owns a co-located slice of reducers, actions, and selectors.",
        isCorrect: false,
        explanation: "This borrows the Redux Toolkit \"slice\" vocabulary, but FSD says nothing about state management. You can adopt FSD with Context, Zustand, or no client state at all; the methodology is only about import direction, not data flow."
      }
    ],
    correctAnswer: "B",
    explanation: "Feature-Sliced Design (FSD) is a code-organization methodology, not a library or build tool. It prescribes a fixed set of vertical slices (App, Pages, Widgets, Features, Entities, Shared; FSD 2 inserts Processes between App and Pages) and a single rule that governs imports: a layer may only depend on layers strictly below it in the hierarchy. There is no runtime, no API to call, and no package to install.\n\nIn a real Next.js App Router project this maps concretely: your `app/` directory is the App layer, route-specific compositions live in Pages, reusable composite UI blocks (a product card, a checkout summary) sit in Widgets, user-interaction logic (an add-to-cart flow, a search filter) lives in Features, domain models (Product, User) are Entities, and truly generic utilities, design tokens, and base primitives belong in Shared. Because dependencies flow one direction, a Feature can never import from another Feature, and an Entity can never reach into a Widget.\n\nWhy it matters in practice: with five or more engineers in the same repo, the layer rule eliminates ownership debates, keeps bundle boundaries predictable, and makes it safe to delete an entire feature folder without hunting for cross-imports. The nuance interviewers probe: Shared itself is split into sub-slices (ui, lib, api, config), and a Widget may import from Shared/ui but not from Shared/api if the architecture forbids it, so the rule is hierarchical within a layer, not just binary between layers.",
    interviewLine: "FSD is a convention, not a dependency. You enforce it through the folder hierarchy and a lint rule that forbids any layer from importing a layer above it, so a Feature can never reach into another Feature and an Entity stays ignorant of how it gets rendered.",
    misconception: "Treating FSD as a runtime library or build tool you install and configure, rather than a folder-structure convention enforced by import rules, which leads candidates to look for an npm package or a bundler flag that does not exist.",
    hints: [
      "The word \"Design\" here refers to code architecture, not visual design. Think about what problem it solves when ten engineers share one frontend repo.",
      "It defines a fixed set of layers and a single import rule: you may only reach into layers below you. No runtime, no package, no build step.",
      "Picture a Next.js project: your route files are one layer, your reusable product-card component is another, and your `formatPrice` utility is yet another. FSD names those layers and forbids upward imports."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how `cart` (Feature) imports from `product` (Entity) and `shared/ui`, but `product` never imports back into `cart`.",
      language: "tsx",
      code: "import { ProductCard } from \"../../widgets/product-card\";\nimport { useCartStore } from \"../../entities/cart\";\nimport { Button } from \"../../shared/ui\";\n\nexport function AddToCart() {\n  const { addItem } = useCartStore();\n\n  return (\n    <div className=\"feature-add-to-cart\">\n      <ProductCard id=\"sku-42\" />\n      <Button onClick={() => addItem(\"sku-42\", 1)}>\n        Add to cart\n      </Button>\n    </div>\n  );\n}\n\n// Folder layout this file assumes:\n// src/\n//   app/            \u2190 App layer\n//   pages/          \u2190 Pages layer\n//   widgets/product-card/   \u2190 Widget\n//   features/add-to-cart/   \u2190 Feature (this file)\n//   entities/cart/          \u2190 Entity\n//   shared/ui/              \u2190 Shared sub-slice"
    }
  },
  {
    id: "algorithms-how-to-perform-automatic-redirect-after-login",
    title: "How to perform automatic redirect after login?",
    prompt: "How to perform automatic redirect after login?",
    level: "junior",
    type: "fix",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React, { Component } from 'react'\nimport { Redirect } from 'react-router'\nexport default class LoginDemoComponent extends Component {\n render() {\n   if (this.state.isLoggedIn === true) {\n     return <Redirect to=\"/your/redirect/page\" />\n   } else {\n     return <div>{'Please complete login'}</div>\n   }\n }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Call `window.stop()` inside a `useEffect` after login to abort the current page load and let the browser follow the redirect.",
        isCorrect: false,
        explanation: "Tempting because 'stop' sounds like it could interrupt the current page and hand control to a new URL, but window.stop() only halts pending resource loads (images, scripts). It performs no navigation and does not change the current URL."
      },
      {
        id: "B",
        text: "Unmount the React root with `ReactDOM.unmountComponentAtNode` and rely on the browser's default behaviour to navigate to the target URL.",
        isCorrect: false,
        explanation: "This looks plausible if you imagine the browser 'falling back' to a server redirect once React is gone, but unmounting simply detaches the tree and removes event listeners. No URL change occurs; the page is left in a broken, inert state."
      },
      {
        id: "C",
        text: "Assign the target path to `document.title` and wait for the browser's default navigation to pick it up.",
        isCorrect: false,
        explanation: "Confuses a display property with a navigation API. document.title only updates the text in the browser tab; it has no effect on the address bar, the history stack, or any request to the server."
      },
      {
        id: "D",
        text: "Use React Router v6's `<Navigate to='/dashboard' replace />` component or the `useNavigate()` hook once the authentication state is confirmed.",
        isCorrect: true,
        explanation: "Correct. <Navigate> is the v6 replacement for the removed <Redirect> component and is designed for render-time navigation, while useNavigate() gives you an imperative navigate() function for event-handler redirects. Both are the idiomatic, supported APIs in React Router v6."
      }
    ],
    correctAnswer: "D",
    explanation: "The snippet uses React Router v5's <Redirect> component, which was removed in v6. In the current v6 API you either render <Navigate to=\"/dashboard\" replace /> when a piece of state (like isLoggedIn) flips, or you call the useNavigate() hook inside an event handler such as a form submit. Both are first-class, but they live in different parts of the render cycle: <Navigate> is a declarative side-effect of rendering, while navigate() is an imperative call you make from user interaction.\n\nIn real login flows the imperative path is more common. After the auth request resolves you call navigate('/dashboard', { replace: true }). The replace flag overwrites the login URL in the history stack, so pressing the browser back button skips straight to whatever page came before the login form instead of returning to it with a cleared session.\n\nA nuance interviewers probe: calling navigate() directly inside the render body (outside of <Navigate>) triggers a React warning and can loop because you are mutating history during render. <Navigate> is safe in that position because React Router batches the navigation as a post-render effect. Also, if you are on Next.js App Router the equivalent is redirect() from next/navigation or router.replace() from usePathname/useRouter \u2014 React Router is not in the picture at all.",
    interviewLine: "In React Router v6 I'd render <Navigate to='/dashboard' replace /> if the redirect is a pure function of auth state, or call useNavigate() inside the submit handler with { replace: true } so the login URL never lingers in the history stack.",
    misconception: "The v5 <Redirect> component is still the right tool for render-time navigation, and calling navigate() directly inside a render body is safe because React batches state updates.",
    hints: [
      "The snippet references a component that was removed in React Router v6. What is the v6 equivalent for a render-time redirect?",
      "You have two idiomatic paths: a component you render when state changes, or a hook you call inside an event handler. Which one fits a form-submit flow?",
      "Whichever approach you pick, pass a replace option so the user's back button skips the login page entirely."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice the `replace: true` option \u2014 it overwrites the login URL in the history stack so the back button skips it.",
      language: "tsx",
      code: "import { useState } from 'react'\nimport { useNavigate } from 'react-router'\n\nfunction LoginForm() {\n  const navigate = useNavigate()\n  const [error, setError] = useState('')\n\n  async function handleSubmit(e: React.FormEvent) {\n    e.preventDefault()\n    try {\n      await auth.login()          // your auth call\n      navigate('/dashboard', { replace: true })\n    } catch {\n      setError('Invalid credentials')\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"email\" type=\"email\" required />\n      <input name=\"password\" type=\"password\" required />\n      {error && <p role=\"alert\">{error}</p>}\n      <button type=\"submit\">Sign in</button>\n    </form>\n  )\n}"
    }
  },
  {
    id: "performance-built-in-hooks-the-built-in-hooks-are-divided-into-2-pa",
    title: "Built-in Hooks: The built-in Hooks are divided into 2 parts as given below:",
    prompt: "Built-in Hooks: The built-in Hooks are divided into 2 parts as given below:, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "State hooks (`useState`, `useReducer`) and lifecycle hooks (`useEffect`, `useLayoutEffect`), since the Rules of Hooks draw the line between state management and side-effect scheduling.",
        isCorrect: false,
        explanation: "This grouping is functionally intuitive, but it is not the React docs' official split. It also omits `useContext`, `useMemo`, `useCallback`, and `useRef`, which the docs place in their two named groups."
      },
      {
        id: "B",
        text: "Basic Hooks (`useState`, `useEffect`, `useContext`) and Additional Hooks (`useReducer`, `useCallback`, `useMemo`, `useRef`, `useLayoutEffect`, `useImperativeHandle`).",
        isCorrect: true,
        explanation: "Correct. The React documentation's two section headings are literally \"Basic Hooks\" and \"Additional Hooks,\" and the hook-to-group assignments match the option exactly."
      },
      {
        id: "C",
        text: "Synchronous hooks that execute during render (`useState`, `useMemo`, `useCallback`) and asynchronous hooks that run after paint (`useEffect`, `useLayoutEffect`, `useRef`).",
        isCorrect: false,
        explanation: "Tempting because effects are deferred, but `useRef` is fully synchronous and `useLayoutEffect` runs synchronously before paint. The docs never split hooks by timing; the official grouping is pedagogical (Basic vs Additional), not based on when the hook's logic executes."
      },
      {
        id: "D",
        text: "Core hooks exported from the `react` package and DOM hooks exported from `react-dom`, since the latter handles browser-specific behavior.",
        isCorrect: false,
        explanation: "A plausible package-boundary guess, but every built-in hook listed in the docs is exported from `react`; `react-dom` does not re-export a separate hook set. The \"Basic / Additional\" split is a documentation convention, not a module boundary."
      }
    ],
    correctAnswer: "B",
    explanation: "The React documentation organizes its built-in hooks into two named sections: Basic Hooks and Additional Hooks. Basic Hooks\u2014`useState`, `useEffect`, and `useContext`\u2014cover the three capabilities every functional component fundamentally needs: local state, side-effect synchronization, and cross-tree data access. Additional Hooks\u2014`useReducer`, `useCallback`, `useMemo`, `useImperativeHandle`, `useDebugValue`, `useRef`, and `useLayoutEffect`\u2014build on those foundations to handle complex state transitions, memoization, and imperative DOM or ref interactions.\n\nThis split is pedagogical, not a runtime distinction. React does not treat the two groups differently internally; every hook, regardless of group, must obey the same Rules of Hooks (top-level, unconditional calls, same order every render). The grouping helps developers learn incrementally: master the three basics before reaching for `useMemo` or `useReducer`.\n\nInterviewers often probe whether you understand that the boundary is arbitrary. For instance, `useRef` is labelled \"Additional\" yet is as fundamental as `useState` for many components, and `useLayoutEffect` is \"Additional\" yet is the synchronous counterpart to the \"Basic\" `useEffect`. In React 19, newer hooks like `useActionState` and `useFormStatus` sit outside both historical groups entirely, reinforcing that the split is a documentation convention rather than a language feature.",
    interviewLine: "The React docs split built-in hooks into Basic Hooks\u2014useState, useEffect, useContext\u2014and Additional Hooks like useReducer, useCallback, and useMemo; the split is a learning-order convention, not a runtime distinction, since every hook follows the same Rules of Hooks regardless of group.",
    misconception: "Candidates often assume the hook groups reflect a runtime or execution-order distinction (synchronous vs asynchronous, state vs effects) rather than recognizing that the split is purely a pedagogical convention in the docs with no effect on how React schedules or validates hook calls.",
    hints: [
      "Think about the section headings on the official React hooks documentation page. There are exactly two group names, and one of them contains only three hooks.",
      "The smaller group covers local state, side effects, and cross-tree data. The larger group adds reducer-based state, memoization of values and callbacks, and imperative ref APIs.",
      "The two group names are \"Basic Hooks\" and \"Additional Hooks.\" Check which specific hooks the docs place under each heading."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Basic Hooks (useState, useEffect, useContext) drive core state and side effects, while Additional Hooks (useMemo, useCallback, useRef) optimise re-renders and expose imperative handles.",
      language: "tsx",
      code: "import { useState, useEffect, useContext, useMemo, useCallback, useRef } from \"react\";\nimport { ThemeContext } from \"./ThemeContext\";\n\nfunction SearchBar() {\n  const [query, setQuery] = useState(\"\");\n  const { theme } = useContext(ThemeContext); // Basic\n  const inputRef = useRef<HTMLInputElement>(null); // Additional\n  const results = useMemo(() => filterDatabase(query), [query]); // Additional\n  const onClear = useCallback(() => { setQuery(\"\"); inputRef.current?.focus(); }, []); // Additional\n  useEffect(() => { document.title = query ? `${query} \u2013 Results` : \"Search\"; }, [query]); // Basic\n\n  return (\n    <input\n      ref={inputRef}\n      value={query}\n      onChange={(e) => setQuery(e.target.value)}\n      className={theme === \"dark\" ? \"dark\" : \"light\"}\n    />\n  );\n}"
    }
  },
  {
    id: "performance-what-is-the-context-api-when-should-you-use-it-instead",
    title: "What is the Context API? When should you use it instead of prop drilling?",
    prompt: "What is the Context API? When should you use it instead of prop drilling?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Context should be used to replace all local `useState` calls in every component.",
        isCorrect: false,
        explanation: "Tempting because Context feels like a more 'global' and therefore 'better' way to hold state. In reality, local `useState` is the cheapest option: it re-renders only the component that owns it. Replacing it with Context adds a subscription relationship where every consumer re-renders on value change, and it couples unrelated components to a shared provider for no benefit."
      },
      {
        id: "B",
        text: "Use Context for relatively stable, app-wide data (current user, theme, locale) that many components across the tree need to read, avoiding prop drilling through intermediate containers.",
        isCorrect: true,
        explanation: "Correct. These values change infrequently but are read widely, which is exactly the shape Context handles well without imposing a re-render storm on every keystroke."
      },
      {
        id: "C",
        text: "Context is the preferred pattern for sharing state between any two components regardless of tree depth, making prop drilling obsolete in all cases.",
        isCorrect: false,
        explanation: "The belief that Context is always superior to props ignores cost: for one or two levels of depth, props are simpler and carry no extra re-render overhead. Context adds a subscription relationship that re-renders consumers on value change, which is unnecessary for shallow passes."
      },
      {
        id: "D",
        text: "Use Context to broadcast high-frequency keystroke updates from a large form to every input component.",
        isCorrect: false,
        explanation: "Every keystroke changes the context value's reference, forcing all consumers to re-render 60+ times per second. That is a classic performance anti-pattern; such state belongs in local `useState` or a reducer near the inputs."
      }
    ],
    correctAnswer: "B",
    explanation: "The Context API lets you pass data through the component tree without threading props through every intermediate level. You create a context with `React.createContext()`, wrap a subtree in a `<Provider value={...}>`, and any descendant reads it via `useContext()`. This is ideal for relatively stable, cross-cutting values like the authenticated user, theme, or locale that many components at different depths need.\n\nThe critical constraint: whenever the context value's reference changes, every component that calls `useContext()` for that context re-renders, regardless of whether it actually uses the changed field. That is why high-frequency updates (keystrokes, drag positions, animation frames) are poor Context candidates \u2014 you would re-render the entire consumer tree on every tick.\n\nIn practice, keep frequently changing state local with `useState` or in a reducer close to where it is used. If you must share it broadly, split the context into a stable read context and a volatile dispatch context (the classic Redux-style split), or reach for a dedicated state library that can batch and memoize updates.",
    interviewLine: "I reach for Context when a value like the current user or theme is needed by many components at different depths and changes infrequently. Because every consumer re-renders when the value reference changes, I keep high-frequency state local or split the context into a stable read object and a separate dispatch function with a stable reference.",
    misconception: "Context is a universal drop-in replacement for prop drilling \u2014 if two components share data, Context is always the right tool. The real distinction is update frequency: Context re-renders every consumer on value change, so it suits stable, widely-read data, not high-churn state.",
    hints: [
      "Think about what happens to every component that calls `useContext()` the moment the value reference changes.",
      "The key trade-off is re-render cost: Context is great for values that change rarely but are read widely, not for values that change on every keystroke.",
      "Ask yourself: would I want every consumer to re-render 60 times per second? If not, that state probably belongs closer to where it is used."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext",
    example: {
      caption: "Notice how the dispatch function lives in a separate context with a stable reference, so components that only read the theme do not re-render when someone calls setTheme.",
      language: "tsx",
      code: "const ThemeCtx = createContext<{ theme: string }>({ theme: \"light\" });\nconst DispatchCtx = createContext<(t: string) => void>(() => {});\n\nfunction ThemeProvider({ children }: { children: React.ReactNode }) {\n  const [theme, setTheme] = useState(\"light\");\n  const dispatch = useCallback((t: string) => setTheme(t), []);\n\n  return (\n    <ThemeCtx.Provider value={{ theme }}>\n      <DispatchCtx.Provider value={dispatch}>\n        {children}\n      </DispatchCtx.Provider>\n    </ThemeCtx.Provider>\n  );\n}"
    }
  },
  {
    id: "performance-what-is-the-purpose-of-the-key-prop-in-react",
    title: "What is the purpose of the key prop in React?",
    prompt: "What is the purpose of the key prop in React?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "{  items.map((item) => <ListItem key={item.id} value={item.value} />);}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Provides a stable identity for array elements so React's reconciliation algorithm can match previous and next virtual nodes, preserving component state and DOM nodes across reorders, insertions, and deletions.",
        isCorrect: true,
        explanation: "Correct. Keys are consumed by React's diffing step to pair old and new virtual nodes; a matching key means the fiber (and its DOM node, state, and effects) is reused, while a changed or missing key triggers unmount and remount."
      },
      {
        id: "B",
        text: "Acts as a memoization signal: if the key value is identical between renders, React skips re-rendering that component and reuses its previous output.",
        isCorrect: false,
        explanation: "This conflates keys with React.memo or shouldComponentUpdate. Keys only decide whether React reuses or remounts a fiber; they never suppress a re-render triggered by the parent. A component with an unchanged key still re-renders every time its parent renders."
      },
      {
        id: "C",
        text: "Generates a unique `id` attribute on each rendered DOM element so that CSS selectors, `document.getElementById`, and accessibility tools can target individual list items.",
        isCorrect: false,
        explanation: "Keys are internal to React's reconciliation and are stripped from the element before it reaches the DOM. They never appear as an `id` attribute or any other HTML attribute; React treats them as a bookkeeping hint, not a rendering output."
      },
      {
        id: "D",
        text: "Is forwarded to the child component as a regular prop (readable via `props.key`) and used to deduplicate entries so no two list items share the same rendered value.",
        isCorrect: false,
        explanation: "React explicitly removes `key` (along with `ref`) from the props object before the component renders, so `props.key` is always `undefined`. Keys also do not deduplicate; they identify existing items so the reconciler can match them."
      }
    ],
    correctAnswer: "A",
    explanation: "In React, the key prop is a stable identifier consumed by the reconciliation algorithm during diffing. When React compares the previous and next virtual trees, it uses keys to match elements across renders: a key that persists means React reuses the existing fiber (DOM node, state, effects); a new key means mount a fresh fiber; a missing key means unmount.\n\nThis matters in real code because without keys, or with unstable keys such as array indices, reordering a list makes React update components in place rather than moving them. Local state, refs, and focus can then attach to the wrong item. For example, swapping two rows of text inputs by index without keys causes the typed values and caret positions to jump to the wrong row.\n\nA nuance interviewers probe: changing a key is not a prop update. It forces a full unmount-and-remount cycle, so state resets, effects re-run, and the old DOM node is destroyed. Developers sometimes exploit this deliberately (e.g., resetting a form by changing its key), but it is a far heavier operation than a normal re-render.",
    interviewLine: "Keys give the reconciler a stable handle to match virtual nodes across renders, so it can move existing DOM nodes and preserve component state instead of tearing them down. If I change a key, though, that's a full unmount-and-remount \u2014 state resets, effects re-run \u2014 which is a much heavier operation than a prop update.",
    misconception: "Keys work like React.memo \u2014 a stable key means React will skip re-rendering that component. In reality, keys only affect whether React reuses or remounts a fiber during reconciliation; they never suppress a re-render triggered by the parent.",
    hints: [
      "Think about what happens when you reorder a list. Without an identifier, how would React know which existing DOM node belongs to which item?",
      "Keys are consumed by React's diffing algorithm before the component ever renders. They are not available inside the component's props object.",
      "Changing a key is equivalent to deleting the old element and inserting a brand-new one. State, refs, and effects all reset."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    example: {
      caption: "Because each Row is keyed by a stable id, swapping the order moves the existing DOM nodes (and their input state) instead of re-mounting them; without keys the draft text would jump to the wrong row.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Row() {\n  const [draft, setDraft] = useState(\"\");\n  return <input value={draft} onChange={(e) => setDraft(e.target.value)} />;\n}\n\nfunction List() {\n  const [rows, setRows] = useState([\n    { id: \"a\", label: \"First\" },\n    { id: \"b\", label: \"Second\" },\n  ]);\n\n  const swap = () => setRows((r) => [r[1], r[0]]);\n\n  return (\n    <>\n      <button onClick={swap}>Swap</button>\n      {rows.map((row) => (\n        <Row key={row.id} />\n      ))}\n    </>\n  );\n}"
    }
  },
  {
    id: "react-why-does-react-recommend-against-mutating-state",
    title: "Why does React recommend against mutating state?",
    prompt: "Why does React recommend against mutating state?",
    level: "junior",
    type: "fix",
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
        text: "React performs a deep structural comparison of state on every render, so mutating an object in place forces an expensive recursive diff that degrades performance.",
        isCorrect: false,
        explanation: "The belief that React \"checks\" state deeply makes this tempting. In reality React uses Object.is (reference equality) on the fiber node, not a deep structural compare, so mutation doesn't cost you a diff \u2014 it simply makes the reference unchanged and React skips the render entirely."
      },
      {
        id: "B",
        text: "Mutating state directly bypasses React's reference-equality check (Object.is), so React sees the same object and skips re-rendering, which also breaks concurrent render replay and devtools time-travel.",
        isCorrect: true,
        explanation: "Correct. React gates re-rendering on Object.is(prev, next); an in-place mutation keeps the reference identical, so the check passes and no render is scheduled. Concurrent replay and time-travel both assume state is a pure snapshot, which mutation violates."
      },
      {
        id: "C",
        text: "Mutating state breaks React's one-way data-flow contract, causing child components to receive stale props because the parent's state object is no longer treated as a new value.",
        isCorrect: false,
        explanation: "One-way data flow is a real React principle, which makes this sound right. The actual failure point is not prop staleness or data-flow direction; it is the fiber-node reference comparison that decides whether to re-render at all, and mutation never changes that reference."
      },
      {
        id: "D",
        text: "JavaScript's garbage collector cannot reclaim objects that have been mutated after creation, so repeated state mutations cause progressive memory leaks in long-lived SPAs.",
        isCorrect: false,
        explanation: "People associate immutability with GC efficiency, which makes this plausible. V8's GC has no special rule about mutated objects; they are collected normally once unreachable. The real cost of mutation is a skipped re-render, not a leak."
      }
    ],
    correctAnswer: "B",
    explanation: "When you call setState, React stores the returned value in the fiber node. During the next render pass it compares the previous and current state with Object.is \u2014 a reference-equality check. If you mutate an object in place and return that same reference, Object.is(prev, next) is true, so React bails out of re-rendering that component and its subtree. The UI silently goes stale.\n\nThis matters beyond the obvious missing re-render. Concurrent React (18+) can interrupt and replay a render. A replay must produce the same output as the original pass, which only holds if state is immutable. If you mutated the object, the second pass sees a different object than the first, violating the pure-rendering assumption and producing tearing or inconsistent UI.\n\nOne nuance interviewers probe: the problem is specific to reference types. Primitives like numbers and strings are always \"new\" when you assign them, so you cannot accidentally mutate them. The trap appears with objects and arrays \u2014 especially in functional updates like setItems(prev => { prev.push(x); return prev; }), where the returned reference is identical to the previous one and Object.is short-circuits the update.",
    interviewLine: "React compares state with Object.is at the fiber node, so if I mutate an object in place the reference never changes, React bails out of re-rendering, and in concurrent mode a replayed render sees a different object than the first pass.",
    misconception: "React does a deep structural comparison of state on every render, so mutating an object is just a style preference rather than a correctness issue that silently prevents re-rendering.",
    hints: [
      "Think about what React actually compares when deciding whether to re-render a component after a state update. Is it a deep check or something simpler?",
      "If you push an item into an array and return the same array reference from your updater, what does Object.is(prev, next) evaluate to?",
      "Beyond the missing re-render, consider what happens when React 18 interrupts a render and replays it \u2014 does the object look the same on the second pass?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that setItems returns the same array reference it received, so Object.is(prev, prev) is true and React skips the re-render entirely.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction TodoList() {\n  const [items, setItems] = useState<string[]>([\"write docs\"]);\n\n  function addItem(val: string) {\n    setItems((prev) => {\n      prev.push(val);   // mutates in place\n      return prev;       // same reference \u2192 Object.is true \u2192 no re-render\n    });\n  }\n\n  return (\n    <div>\n      <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>\n      <button onClick={() => addItem(\"ship it\")}>Add</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-what-is-the-flux-pattern",
    title: "What is the Flux pattern?",
    prompt: "What is the Flux pattern?",
    level: "junior",
    type: "fix",
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
        text: "A state-management library that bundles a single global reducer tree and a middleware pipeline, replacing all local component state with one `useSelector` subscription.",
        isCorrect: false,
        explanation: "This describes Redux, a specific library. Flux is a pattern that predates Redux and does not mandate a single reducer tree, middleware, or any particular npm package; you can implement Flux-style flow with plain classes, Zustand, or even `useReducer` plus context."
      },
      {
        id: "B",
        text: "A publish/subscribe event system where any component can emit events directly to any other component with no central coordinator required.",
        isCorrect: false,
        explanation: "This is a generic pub/sub bus. Flux specifically requires a central Dispatcher as the single entry point for every Action; without that bottleneck you lose the ability to log, validate, or order mutations, which is the whole reason the pattern exists."
      },
      {
        id: "C",
        text: "An architectural pattern featuring strict unidirectional data flow: Actions are dispatched through a central Dispatcher to Stores, which update Views.",
        isCorrect: true,
        explanation: "Correct. Flux defines four roles (View, Action, Dispatcher, Store) and a one-way cycle between them; the central Dispatcher is what distinguishes it from ad-hoc pub/sub and makes the data flow auditable."
      },
      {
        id: "D",
        text: "A reactive data-fetching layer that caches API responses in memory and automatically re-renders subscribed components when a cache entry is invalidated.",
        isCorrect: false,
        explanation: "This describes React Query or SWR. Flux governs how application state changes propagate through your components; it says nothing about HTTP caching, refetching, or network-level invalidation."
      }
    ],
    correctAnswer: "C",
    explanation: "Flux is an architectural pattern (not a library) that enforces strict unidirectional data flow through four roles: Views emit Actions, a central Dispatcher routes those Actions to Stores, Stores update their internal state and notify Views, and Views re-render. The Dispatcher is the key structural element: every Action passes through it, so you can log, validate, or reorder mutations in one place instead of hunting through a web of component-to-component callbacks.\n\nIn practice this matters because bidirectional bindings (the old MVC default) make it nearly impossible to trace why a value changed. With Flux, any state change is reproducible from the Action log, which is why the pattern became the default mental model for React state management and why Redux, Zustand, and Jotai all inherit its one-way principle even when they drop the literal Dispatcher.\n\nA nuance interviewers probe: Flux is a pattern, not a package. Redux implements unidirectional flow without a separate Dispatcher (the store dispatches to its own reducers), so calling Redux \"Flux\" is imprecise. Conversely, a hand-rolled pub/sub where components subscribe directly to each other is not Flux, because it lacks the central coordination point that makes the flow auditable.",
    interviewLine: "Flux is a pattern, not a package. The key structural piece is the central Dispatcher: every Action funnels through it before reaching a Store, which is what lets you log, validate, and reorder mutations in one place. Redux and Zustand inherit the one-way principle but drop the literal Dispatcher, so I'd call them Flux-inspired rather than Flux itself.",
    misconception: "Flux is often treated as if it were a specific library (usually Redux) rather than a pattern, so candidates describe Redux's reducer-tree architecture as \"Flux\" and cannot explain what the Dispatcher actually does or why it is architecturally distinct from a store that dispatches to its own reducers.",
    hints: [
      "Think about what makes a data flow auditable: is there a single choke-point every mutation passes through before state changes?",
      "The pattern has four named roles. Can you name the one that sits between the Action and the Store and acts as the sole routing point?",
      "It is a pattern, not a library. Redux, Zustand, and even a hand-rolled class-based store can all implement it. What structural requirement do they all share?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure",
    example: {
      caption: "Notice the Dispatcher is the only object that calls into the Store; Views never mutate state directly.",
      language: "typescript",
      code: "type Action = { type: \"INCR\" } | { type: \"DECR\" };\n\nclass CounterStore {\n  private count = 0;\n  private listeners = new Set<() => void>();\n\n  handleAction(action: Action) {\n    if (action.type === \"INCR\") this.count++;\n    if (action.type === \"DECR\") this.count--;\n    this.listeners.forEach((fn) => fn());\n  }\n\n  getCount() { return this.count; }\n  subscribe(fn: () => void) { this.listeners.add(fn); }\n}\n\nconst counterStore = new CounterStore();\n\nconst dispatcher = {\n  dispatch(action: Action) {\n    counterStore.handleAction(action); // single choke-point\n  },\n};"
    }
  },
  {
    id: "react-how-to-format-date-using-react-intl",
    title: "How to format date using react-intl?",
    prompt: "How to format date using react-intl?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { FormattedDate } from 'react-intl';\nfunction DateComponent() {  return (    <FormattedDate      value={new Date()}      year=\"numeric\"      month=\"long\"      day=\"2-digit\"    />  );}\n\nimport { useIntl } from 'react-intl';\nfunction DateComponent() {  const intl = useIntl();  const formattedDate = intl.formatDate(new Date(), {    year: 'numeric',    month: 'long',    day: '2-digit',  });  return <div>{formattedDate}</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Set the locale per component with a `locale` prop: `<FormattedDate value={date} locale='fr-FR' year='numeric' month='long' />`.",
        isCorrect: false,
        explanation: "This is tempting because many i18n libraries (i18next, react-i18next) let you pass a locale per component, but react-intl does not expose a `locale` prop on `FormattedDate`. The locale is read exclusively from the <IntlProvider> context, so there is no per-instance override."
      },
      {
        id: "B",
        text: "Pass the locale as the first argument: `intl.formatDate('fr-FR', date, { year: 'numeric', month: 'long', day: '2-digit' })`.",
        isCorrect: false,
        explanation: "The signature is `formatDate(value, options?)`\u2014the first argument is the date to format, not a locale code. The locale is inherited from the <IntlProvider> context, so inserting it as a positional argument shifts every subsequent parameter and the call throws or formats the wrong value."
      },
      {
        id: "C",
        text: "Store the formatted string in component state and update it in a `useEffect` whenever `intl.locale` changes.",
        isCorrect: false,
        explanation: "This over-engineers the problem. Both <FormattedDate /> and `intl.formatDate()` re-execute on every render, so when the provider's locale changes the component re-renders and the new string appears immediately. Caching the result in state introduces a one-frame gap of stale output and an unnecessary dependency array."
      },
      {
        id: "D",
        text: "Use `<FormattedDate value={date} year='numeric' month='long' day='2-digit' />` or call `intl.formatDate(date, { year: 'numeric', month: 'long', day: '2-digit' })` from `useIntl()`.",
        isCorrect: true,
        explanation: "Correct. Both APIs read the locale from the <IntlProvider> context and delegate to `Intl.DateTimeFormat`, giving you locale-aware output with automatic re-rendering when the locale changes."
      }
    ],
    correctAnswer: "D",
    explanation: "react-intl exposes two equivalent APIs for date formatting. The declarative route is the <FormattedDate /> component, which takes a `value` prop (a `Date`, a timestamp number, or a parseable string) plus `Intl.DateTimeFormat` option props like `year`, `month`, and `day`. The imperative route is the `useIntl()` hook, whose `formatDate(value, options)` method returns a locale-aware string you can interpolate anywhere in your render tree. Both read the active locale from the nearest <IntlProvider> via React context and delegate to the native `Intl.DateTimeFormat` under the hood, so you never pass a locale string yourself.\n\nIn real applications this matters because the provider can swap locale at runtime (e.g., a language switcher) and every formatted date re-renders automatically\u2014no prop-drilling, no stale strings cached in local state. You also get consistent formatting rules across the app without repeating locale logic in each component.\n\nAn edge case interviewers probe: for non-English locales you must import the locale data as a side-effect before the provider mounts, e.g. `import 'react-intl/locale-data/fr'`. Skip that import and the formatter silently falls back to English. Also note that `value` accepts a `Date` object, a millisecond timestamp, or an ISO string\u2014passing a raw `Date` is the most predictable because it preserves the local timezone, whereas `toISOString()` would shift the output to UTC.",
    interviewLine: "I set the locale once on <IntlProvider> and then use either the <FormattedDate /> component or `useIntl().formatDate()` in hooks\u2014both read the locale from context and call `Intl.DateTimeFormat` under the hood, so a language switch re-renders every date without me passing a locale string around.",
    misconception: "Treating the locale as a per-component prop or a function argument, when react-intl resolves it once from the <IntlProvider> context and every formatter inherits it automatically.",
    hints: [
      "Think about where the locale string lives in react-intl. You set it once at the top of your tree; every formatter inherits it. Which React primitive carries that value down?",
      "There are two APIs: a JSX component you drop into your render tree, and a hook that returns a `formatDate` function. Both accept the same `Intl.DateTimeFormat` option keys (`year`, `month`, `day`) and neither takes a locale argument.",
      "The `value` prop / first argument is your date (a `Date` object, a timestamp, or a parseable string). The remaining props / second argument are the format options. The locale is implicit."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the locale is set once on IntlProvider; neither FormattedDate nor useIntl receives a locale argument, and the locale-data import is a side-effect with no named binding.",
      language: "tsx",
      code: "import 'react-intl/locale-data/fr';\nimport { IntlProvider, FormattedDate, useIntl } from 'react-intl';\n\nfunction Today() {\n  const { formatDate } = useIntl();\n  return (\n    <div>\n      {/* Component API */}\n      <FormattedDate value={new Date()} year=\"numeric\" month=\"long\" day=\"2-digit\" />\n      {/* Imperative API */}\n      <p>{formatDate(new Date(), { year: 'numeric', month: 'long', day: '2-digit' })}</p>\n    </div>\n  );\n}\n\nexport function App() {\n  return (\n    <IntlProvider locale=\"fr-FR\">\n      <Today />\n    </IntlProvider>\n  );\n}"
    }
  },
  {
    id: "performance-what-are-the-benefits-of-using-react-redux",
    title: "What are the Benefits of Using React-Redux?",
    prompt: "What are the Benefits of Using React-Redux?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It automatically memoizes every component render, making React.memo and useMemo unnecessary across the app.",
        isCorrect: false,
        explanation: "Tempting because useSelector does gate re-renders, but only when the selected slice's reference is unchanged. Components whose selected slice changes still re-render, and expensive computations inside render still need useMemo; Redux never wraps your render function in a memo."
      },
      {
        id: "B",
        text: "It replaces all useState calls, since every piece of component state should live in the global store for consistency.",
        isCorrect: false,
        explanation: "Pushing ephemeral UI state (input focus, animation frames, modal visibility) into Redux adds a dispatch/reduce round-trip and couples unrelated components. The React docs and Redux team both recommend keeping local, short-lived state in useState."
      },
      {
        id: "C",
        text: "It eliminates prop drilling by automatically injecting the entire store into every component's props.",
        isCorrect: false,
        explanation: "You must explicitly select slices via useSelector or the connect HOC; the store is never auto-spread into props. Injecting the whole store would cause every component to re-render on any single state change, which is the opposite of the optimization Redux provides."
      },
      {
        id: "D",
        text: "A single predictable store with time-travel debugging, a middleware pipeline for side effects, and selector-based re-render control via useSelector reference equality.",
        isCorrect: true,
        explanation: "Correct. These three pillars \u2014 explicit action/reducer transitions with DevTools time-travel, composable middleware for async and data-fetching, and Object.is-gated re-renders through useSelector \u2014 are the concrete, measurable benefits over ad-hoc state prop-drilling or Context for shared domain state."
      }
    ],
    correctAnswer: "D",
    explanation: "The core benefit of React-Redux is a single, centralized store where every state transition is an explicit, named action processed by a pure reducer. Redux DevTools records each dispatch, so you can time-travel through state changes during development \u2014 something you cannot replicate with scattered useState hooks across a component tree.\n\nThe middleware pipeline (redux-thunk for async flows, RTK Query for data-fetching, redux-persist for hydration) gives you a composable layer between dispatch and reducer. Side effects stay out of components and become unit-testable without rendering.\n\nThe performance angle is selector-based: useSelector subscribes a component to a specific slice and re-renders it only when that slice's reference changes (Object.is check). This contrasts with Context, where any consumer re-renders whenever the provider value changes. The nuance interviewers probe: if your selector returns a fresh object or array on every call, Object.is fails and the component re-renders on every unrelated dispatch. You must return stable references or memoize with reselect.\n\nIn practice you still use useState for ephemeral UI state (input focus, modal open/close). Redux excels at shared, long-lived domain state where predictability and cross-component coordination matter.",
    interviewLine: "I reach for Redux when state is shared across many components and I need a single auditable history of changes. useSelector gives me per-slice subscription with an Object.is gate, so a component only re-renders when its slice actually changes \u2014 but I have to return stable references from my selectors or memoize with reselect, otherwise the gate is useless.",
    misconception: "Treating useSelector like a universal memo: assuming that subscribing to the store automatically prevents all re-renders, when in reality it only skips the re-render if the selected reference is identical to the previous one, and a selector that returns a new object each call defeats the check entirely.",
    hints: [
      "Think about what happens when five unrelated components all read from the same Context provider \u2014 now contrast that with a store where each component selects only its own slice.",
      "useSelector performs an Object.is comparison between the previous and next selected value. What happens if your selector returns a brand-new object literal on every call?",
      "Name the three concrete mechanisms Redux adds over plain useState: the action/reducer pipeline, the middleware layer, and the per-slice subscription model."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the buggy selector returns a new array every render, defeating the Object.is gate, while the fixed version returns a stable reference from the store.",
      language: "typescript",
      code: "import { useSelector, useDispatch } from 'react-redux';\nimport { selectVisibleTodos, addTodo } from './selectors';\n\n// \u274c Buggy: creates a new array each call \u2192 Object.is fails \u2192 re-renders on every dispatch\nfunction TodoList() {\n  const todos = useSelector((s) => s.todos.filter((t) => t.visible));\n  return <ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>;\n}\n\n// \u2705 Fixed: selector lives in the module, returns a stable reference\n//    (or is memoized with reselect) so Object.is can short-circuit\nfunction TodoList() {\n  const todos = useSelector(selectVisibleTodos);\n  const dispatch = useDispatch();\n  return (\n    <ul>\n      {todos.map((t) => <li key={t.id}>{t.text}</li>)}\n      <button onClick={() => dispatch(addTodo('new'))}>Add</button>\n    </ul>\n  );\n}"
    }
  },
  {
    id: "algorithms-explain-why-and-how-to-update-state-of-components-using",
    title: "Explain Why and How to Update State of Components Using Callback?",
    prompt: "Explain Why and How to Update State of Components Using Callback?",
    level: "junior",
    type: "fix",
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
        text: "Because updater callbacks are dispatched to a Web Worker so they can compute the next state off the main thread during batched updates.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'functional update' with 'off-thread computation.' In reality the updater runs synchronously on the same JS thread inside React's reconciliation loop; no Worker or GPU is involved."
      },
      {
        id: "B",
        text: "Use the updater form `setCount(prev => prev + 1)` so each queued update receives the state produced by the previous entry in the queue rather than the stale closure value from the current render.",
        isCorrect: true,
        explanation: "Correct. React queues updater functions and applies them sequentially, feeding each one the output of the prior update, which guarantees the next state is computed from the most recent value even when multiple setters fire before a re-render."
      },
      {
        id: "C",
        text: "Because updater callbacks force React to flush the update queue and commit a render synchronously before the next setState call is scheduled.",
        isCorrect: false,
        explanation: "This confuses the updater's role with a render barrier. Updater functions do not trigger an immediate commit; React still batches and defers rendering. Their job is purely to compute the next state value from the previous one inside the queue."
      },
      {
        id: "D",
        text: "Because updater callbacks are a class-component idiom; with hooks the closure always captures the latest state since React re-renders between every setter call.",
        isCorrect: false,
        explanation: "A common mix-up: hooks do not re-render between consecutive setter calls in the same handler. The `count` in a closure is frozen at render time, so three `setCount(count + 1)` calls all add to the same base value unless you use the updater form."
      }
    ],
    correctAnswer: "B",
    explanation: "When you call a state setter with a plain value, React stores that value in an internal update queue. If you call the setter three times before the next render, all three calls capture the same render-time variable from the closure. React 18 and later batch updates automatically in event handlers, promises, and timeouts, so this stale-closure pattern is easy to hit in production code.\n\nThe updater form `setCount(prev => prev + 1)` solves this by queuing a function instead of a value. React processes the queue sequentially: it calls your function with the state produced by the previous entry, so each update builds on the last one regardless of how many are batched together.\n\nA nuance interviewers probe: in StrictMode during development, React may invoke your updater twice to surface impurity. The function must be pure\u2014no logging, no external mutation\u2014because React discards one of the two results. Also, the `prev` you receive is the state at the point in the queue where your updater sits, not necessarily the most recent committed render if concurrent features are in play.",
    interviewLine: "The updater form exists because React batches multiple setter calls before a single re-render, so a closure over the render-time state is stale; by passing a function I let React feed me the output of the previous queued update, keeping the chain correct no matter how many updates are batched.",
    misconception: "Candidates often assume that because `count` is a `const` in the component body, it always reflects the 'current' state at the moment a setter is called, not realising it is frozen at the last committed render and goes stale the instant a second setter is queued in the same batch.",
    hints: [
      "Imagine calling `setCount(count + 1)` three times inside one click handler. What value does each call actually read from the closure?",
      "React queues updates and processes them before the next render. What does the setter receive if you hand it a function instead of a value?",
      "Think about what `prev` represents: it is not 'the latest committed render' but the state at your position in the update queue after all prior entries have been applied."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure",
    example: {
      caption: "Notice how the 'stale' button adds 1 (not 3) because all three calls read the same render-time `count`, while the updater button correctly reaches 3.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  function addThreeStale() {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(count + 1);\n  }\n\n  function addThreeUpdater() {\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n  }\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={addThreeStale}>+3 (stale closure)</button>\n      <button onClick={addThreeUpdater}>+3 (updater)</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "react-rules-of-hooks-how-to-avoid-subtle-bugs",
    title: "Rules of Hooks: How to Avoid Subtle Bugs",
    prompt: "Rules of Hooks: How to Avoid Subtle Bugs, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Call hooks inside an `if` block when the guarding prop is guaranteed stable after mount, because React matches hook state by the hook's function identity rather than by call position.",
        isCorrect: false,
        explanation: "React does not match hooks by function identity; it matches them by their ordinal position in the fiber's linked list. A prop that is \"guaranteed stable\" today can change with a refactor or a new code path, and even a truly constant condition still means the hook is absent from the list on renders where the branch is not taken, shifting every later hook."
      },
      {
        id: "B",
        text: "Invoke hooks inside `useEffect` callbacks or event handlers, since React defers hook registration until the commit phase and associates state by the hook's name in the call stack.",
        isCorrect: false,
        explanation: "Hooks must execute during the render phase so React can build and update the fiber's hook list before commit. Calling them inside an effect or handler means they run after the list is already finalised, so React has no slot to place them in. Association is by position, not by name."
      },
      {
        id: "C",
        text: "Call hooks only at the top level of a function component or custom hook (never inside loops, conditions, or nested functions), and only from those two kinds of functions.",
        isCorrect: true,
        explanation: "Correct. Top-level, unconditional calls guarantee that the fiber's hook linked list has the same length and order on every render, so React can pair each slot with the right state, effect, or ref. Restricting calls to function components and custom hooks ensures a fiber node exists to attach that list to."
      },
      {
        id: "D",
        text: "Wrap each conditionally-needed hook in its own custom hook so the outer component always calls a fixed set, because the custom-hook boundary resets the internal hook list and isolates ordering.",
        isCorrect: false,
        explanation: "A custom hook is just a function that must itself obey the same two rules: its own hook calls must be unconditional and top-level. Wrapping a conditional `useState` in a custom hook does not remove the condition\u2014it merely moves the violation one level down, where the linter still flags it and the fiber list still shifts."
      }
    ],
    correctAnswer: "C",
    explanation: "React stores each hook's state in a linked list attached to the component's fiber node, indexed purely by call order. On the first render, the first `useState` becomes slot 0, the next `useEffect` becomes slot 1, and so on. Every subsequent render walks that same list in the same order to rehydrate each hook. If a conditional branch lets you skip a hook on render 2 but call it on render 3, every hook after the skipped one shifts by one slot, and React silently wires the wrong state, effect, or ref to the wrong variable.\n\nThis is why the two rules are non-negotiable: top-level only, and only from function components or custom hooks. \"Top-level\" means the call is a direct statement in the component body or in another hook's body\u2014no `if`, no `for`, no `.map`, no nested arrow function. The second rule prevents calling hooks from class components, plain utility functions, or Node.js modules, none of which produce a fiber node to attach the list to.\n\nA common interview follow-up: \"What happens if I move a `useRef` behind a feature flag?\" The answer is that every hook declared after that `useRef` receives the state that belonged to the next hook in the list, producing data corruption with no thrown error\u2014extremely hard to debug. The `eslint-plugin-react-hooks` rule (v5+) catches most of these, but understanding the fiber-list mechanism is what separates a candidate who memorises the rule from one who can reason about edge cases.",
    interviewLine: "React keeps a linked list of hook slots on each fiber and walks it in call order on every render, so the two rules\u2014top-level only and only from function components or custom hooks\u2014exist to guarantee that list is the same shape every time. If you break either rule, you don't get an error; you get the wrong state wired to the wrong variable, which is why the linter rule is so strict.",
    misconception: "Candidates often think React identifies a hook by the variable name it is assigned to or by the hook function's reference, so a conditional call \"still works\" as long as the same variable name appears. In reality the association is purely positional in a per-fiber linked list, so any skipped or reordered call silently misaligns every hook that follows it.",
    hints: [
      "Think about what React needs to do between render 1 and render 2 to find the state for `useState` call #3. What does it use as the key?",
      "If the key is purely the ordinal position in a list, what happens to every hook declared after the one you conditionally skipped?",
      "Now apply that to the second rule: what must be true about the calling context for a fiber node (and therefore a hook list) to exist at all?"
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "Notice that the fix calls every hook unconditionally and guards the *rendered output*, not the hook invocation.",
      language: "tsx",
      code: "type Audit = { id: string; msg: string };\n\n// \u274c Bug: useState is absent when isAdmin is false on first render,\n//    then present later \u2014 every hook after it shifts by one slot.\nfunction Dashboard({ isAdmin, user }: { isAdmin: boolean; user: string }) {\n  const [tab, setTab] = useState(\"overview\");\n  if (isAdmin) {\n    const [log, setLog] = useState<Audit[]>([]); // conditional hook!\n  }\n  const timer = useRef<ReturnType<typeof setInterval> | null>(null);\n  return <div>{tab}</div>;\n}\n\n// \u2705 Fix: every hook is called unconditionally; guard the output instead.\nfunction Dashboard({ isAdmin, user }: { isAdmin: boolean; user: string }) {\n  const [tab, setTab] = useState(\"overview\");\n  const [log, setLog] = useState<Audit[]>([]);\n  const timer = useRef<ReturnType<typeof setInterval> | null>(null);\n  if (!isAdmin) return <Overview user={user} />;\n  return <AuditPanel log={log} setLog={setLog} />;\n}"
    }
  },
  {
    id: "performance-hook-types-and-patterns-built-in-and-custom-hooks-that",
    title: "Hook Types and Patterns, Built-In and Custom Hooks That Matter",
    prompt: "Hook Types and Patterns, Built-In and Custom Hooks That Matter, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Hooks are grouped by execution phase: render-phase (useState, useMemo, useCallback, useContext), layout-phase (useLayoutEffect, useImperativeHandle), and passive-phase (useEffect, useRef).",
        isCorrect: false,
        explanation: "Tempting because hooks do execute in distinct phases, but useRef is initialised during render, not in the passive phase, and React's official documentation groups hooks by the problem they solve, not by when they fire."
      },
      {
        id: "B",
        text: "Built-in hooks are tiered by complexity: core (useState, useEffect), intermediate (useReducer, useContext, useRef), and advanced (useMemo, useCallback, useLayoutEffect, useImperativeHandle).",
        isCorrect: false,
        explanation: "A learning progression is intuitive, but React does not define a tier system, and the placement is arbitrary\u2014useMemo and useCallback are often reached before useReducer in day-to-day work, and useLayoutEffect is a niche sibling of useEffect, not a higher tier."
      },
      {
        id: "C",
        text: "Built-ins include State (useState, useReducer), Effects (useEffect, useLayoutEffect), Context (useContext), Refs (useRef, useImperativeHandle), and Performance (useMemo, useCallback).",
        isCorrect: true,
        explanation: "Correct. This matches the functional grouping React uses in its documentation, and it is the lens through which custom hooks compose primitives to encapsulate domain-specific logic."
      },
      {
        id: "D",
        text: "Hooks split into stateful (useState, useReducer, useRef) and stateless (useEffect, useMemo, useCallback, useContext), with custom hooks forming a third, composable category.",
        isCorrect: false,
        explanation: "The dichotomy sounds clean, but useEffect maintains subscription state and useMemo caches a computed value, so both are stateful; and custom hooks are not a parallel category\u2014they are plain functions that call built-ins, so they inherit the same slot-tracking mechanism."
      }
    ],
    correctAnswer: "C",
    explanation: "React organizes its built-in hooks by the problem they solve: state management (useState, useReducer), side effects (useEffect, useLayoutEffect), context consumption (useContext), mutable references (useRef, useImperativeHandle), and derived-value memoization (useMemo, useCallback). This functional grouping is what makes the API learnable\u2014you pick a hook because of what it does, not because of a type or tier system.\n\nCustom hooks are not a separate mechanism. They are ordinary functions that call built-in hooks internally, and React tracks them by their position in the call sequence, not by name. That is why the Rules of Hooks require unconditional, top-level calls: React's internal linked list of hook slots is built by call order, and skipping a call (e.g., inside an if) shifts every subsequent slot and corrupts state.\n\nIn real code this means a hook like useFetch can encapsulate useState, useEffect, and cleanup logic, and every component that calls it gets its own independent set of hook slots. The edge case interviewers probe: a custom hook that conditionally calls useState will break not just itself but every hook after it in the same component, because the slot map is shared per component instance.",
    interviewLine: "React matches hooks to their state slots by call order, not by name, which is why a conditional hook call corrupts every subsequent slot in that component. Custom hooks are just functions composing built-ins, so they inherit the exact same ordering constraint.",
    misconception: "Hooks are looked up by name at runtime, so calling the same hook in different branches or in a different order across renders is harmless as long as you pass the same arguments.",
    hints: [
      "Think about what React does internally when a component renders: it walks a linked list of hook slots. What determines the position of each slot?",
      "A custom hook like useFetch doesn't register a new mechanism with React. It calls useState and useEffect inside a plain function. What does that imply about how React tracks them?",
      "The official grouping is by the problem each hook solves\u2014state, effects, context, refs, memoization\u2014not by execution phase, complexity tier, or mutability."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning",
    example: {
      caption: "usePrevious composes useRef and useEffect; React tracks both slots by their position in the call order, not by the hook's name.",
      language: "tsx",
      code: "function usePrevious<T>(value: T): T | undefined {\n  const ref = useRef<T | undefined>(undefined);\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const prev = usePrevious(count);\n  return <p>{count} (was {prev ?? '\u2014'})</p>;\n}"
    }
  },
  {
    id: "react-what-are-the-core-principles-of-redux",
    title: "What are the core principles of Redux?",
    prompt: "What are the core principles of Redux?",
    level: "junior",
    type: "fix",
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
        text: "1) Centralized middleware pipeline; 2) Synchronous data fetching inside reducers; 3) Per-component state caching",
        isCorrect: false,
        explanation: "This confuses Redux with a data-fetching or caching architecture. Middleware is an extension point, not a core principle, and reducers must be pure\u2014synchronous fetching or per-component caches violate the read-only and purity rules."
      },
      {
        id: "B",
        text: "1) Single source of truth; 2) State may be mutated in-place for performance; 3) Reducers are optional when middleware handles updates",
        isCorrect: false,
        explanation: "Getting one principle right makes the option tempting, but in-place mutation breaks the read-only guarantee and makes replay impossible. Reducers are not optional; they are the only sanctioned path from action to next state."
      },
      {
        id: "C",
        text: "1) Two-way data binding; 2) State is mutated in-place for efficiency; 3) Each component owns its own independent store",
        isCorrect: false,
        explanation: "This describes a MobX or Angular-style reactive model. Redux deliberately rejects two-way binding and per-component stores in favour of one store, unidirectional flow, and immutable updates."
      },
      {
        id: "D",
        text: "1) Single source of truth (one store); 2) State is read-only (changed only by dispatching actions); 3) Changes are made with pure functions (reducers)",
        isCorrect: true,
        explanation: "Correct. These three principles are what make state transitions deterministic: one place to look, one way to trigger a change, and a pure function that maps (state, action) \u2192 next state."
      }
    ],
    correctAnswer: "D",
    explanation: "Redux's three principles work together to make every state transition deterministic and inspectable. Single source of truth means the entire application state lives in one object tree inside a single store, so you never chase data across scattered component variables. State is read-only: the only way to change it is to dispatch an action, which means views, network callbacks, and timers can never silently mutate the tree behind your back. Reducers are pure functions that take (previousState, action) and return the next state; because they have no side effects and no hidden dependencies, the same action always produces the same transition, which is what makes time-travel debugging and action-log replay work.\n\nIn real code this matters most when a bug is hard to reproduce. Because every transition is described by an action object and a pure reducer, you can log the action stream, replay it against a known initial state, and watch the exact moment the tree diverges. The nuance interviewers probe: \"pure\" does not mean the reducer cannot call other pure helpers, but it does mean it must not mutate the input object, must not call Date.now() or Math.random(), and must not dispatch another action from inside the reducer.\n\nA common practical extension is that Redux Toolkit's createSlice wraps these principles so you write `draft.count += 1` (an Immer copy-on-write mutation) while the store still receives an immutable new object\u2014preserving the read-only guarantee without boilerplate.",
    interviewLine: "Redux guarantees determinism through three rules: one store as the single source of truth, state that can only change via dispatched actions, and reducers that are pure functions of (state, action). That purity is exactly what lets you replay an action log and reproduce any prior state.",
    misconception: "Treating the three principles as optional style guidelines rather than the mechanism that makes transitions deterministic\u2014especially believing reducers may safely call Date.now(), mutate the input object, or dispatch further actions from inside the reducer body.",
    hints: [
      "Think about what happens when two components both need the same user object\u2014where does Redux say that data should live?",
      "If a fetch callback finishes, is it allowed to write `state.user = response.data` directly, or must it go through a different channel?",
      "A reducer receives (previousState, action). If it calls Math.random() or mutates previousState in place, which of the three principles is it breaking?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice the reducer returns a new object instead of mutating state.count, and it never calls Math.random() or Date.now()\u2014that purity is what makes action replay deterministic.",
      language: "typescript",
      code: "type State = { count: number };\ntype Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };\n\nfunction counterReducer(state: State, action: Action): State {\n  switch (action.type) {\n    case 'INCREMENT':\n      return { count: state.count + 1 }; // new object, input untouched\n    case 'DECREMENT':\n      return { count: state.count - 1 };\n    default:\n      return state;\n  }\n}\n\n// Violation (not allowed in a reducer):\n// state.count += 1;  // mutates input\n// return { count: Date.now() }; // impure"
    }
  },
  {
    id: "performance-what-is-the-proper-way-to-access-redux-store",
    title: "What is the proper way to access Redux store?",
    prompt: "What is the proper way to access Redux store?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "import { connect } from 'react-redux';\nimport { setVisibilityFilter } from '../actions';\nimport Link from '../components/Link';\n\nconst mapStateToProps = (state, ownProps) => ({\n  active: ownProps.filter === state.visibilityFilter,\n});\n\nconst mapDispatchToProps = (dispatch, ownProps) => ({\n  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),\n});\n\nconst FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);\n\nexport default FilterLink;\n\nclass MyComponent {\n  someMethod() {\n    doSomethingWith(this.context.store);\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Inside a `useEffect`, call `store.subscribe` and invoke `setState` manually each time the listener fires, then read `store.getState()` in render.",
        isCorrect: false,
        explanation: "This mirrors what `useSelector` already does internally, but you must manage the unsubscribe cleanup yourself, risk stale closures over `setState`, and you lose the automatic reference-equality gate\u2014so you re-render on every dispatch even when your slice is unchanged."
      },
      {
        id: "B",
        text: "Call `store.getState()` directly in the render body and trust React's reconciliation to pick up the change on the next render cycle.",
        isCorrect: false,
        explanation: "React only re-renders a component when its own props or state change; it has no visibility into external store mutations. Without a subscription, the component simply never re-renders after the store updates, so the UI goes stale."
      },
      {
        id: "C",
        text: "Pass the full store object as a prop from the top-level `<Provider>` down through every intermediate component that needs it.",
        isCorrect: false,
        explanation: "This is prop-drilling the entire global state through unrelated wrappers, which forces every intermediate component to accept and forward an opaque prop, breaks encapsulation, and defeats the reason a global store exists in the first place."
      },
      {
        id: "D",
        text: "Use React-Redux hooks (`useSelector` with a granular selector and `useDispatch`) in function components, or `connect()` in class components, instead of reading the store directly.",
        isCorrect: true,
        explanation: "Correct. `useSelector` subscribes the component to the store and gates re-renders behind a reference-equality check on your selector's output, while `useDispatch` gives you a stable dispatch handle\u2014both are the supported, performant bridge between Redux and React's rendering model."
      }
    ],
    correctAnswer: "D",
    explanation: "The idiomatic way to read and write Redux state from a component is through React-Redux's bridge: `useSelector` for reading and `useDispatch` for writing in function components, or `connect()` for class components. Under the hood, `useSelector` calls `store.subscribe` once, then on every `dispatch` it re-runs your selector and compares the result to the previous one with reference equality (`===`). Only when the reference changes does it trigger a re-render, so a component that selects `state.cart.items.length` stays put even when `state.user` updates.\n\nReading `store.getState()` directly inside a render body gives you a one-shot snapshot but creates no subscription. React has no way to know the store changed, so the component will not re-render until some unrelated prop or state forces a render. You would have to hand-roll `useEffect` + `store.subscribe` + `setState`, which is exactly what `useSelector` already does with correct cleanup and memoisation.\n\nA nuance interviewers probe: `useSelector`'s default equality is reference. If your selector returns a fresh object or array on every call (e.g. `(s) => s.items.filter(i => i.active)`), the component re-renders on every dispatch regardless of whether the filtered result changed. Fix it with a memoised selector from `reselect` or by selecting a primitive slice and deriving locally.",
    interviewLine: "I use `useSelector` with a narrow selector so the component subscribes to only the slice it cares about; `useSelector` internally calls `store.subscribe` and gates re-renders on a reference-equality check of the selector's output, so I avoid both the stale-read problem of calling `getState()` in render and the over-render problem of selecting the whole state.",
    misconception: "Treating `store.getState()` as a transparent data read that React will automatically react to, when in fact React only re-renders in response to its own state or prop changes and has no awareness of external store mutations.",
    hints: [
      "Think about what makes a component re-render in React: it must be subscribed to the source of change. Which React-Redux API creates that subscription for you?",
      "`useSelector` re-runs your selector on every dispatch and compares the result with `===`. What goes wrong if your selector returns a new array or object each time?",
      "The code snippet shows a class component reaching into `this.context.store`. What is the function-component equivalent that gives you both a reactive read and a dispatch handle without touching context directly?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice the selector returns a primitive (a number), so the default reference-equality check is trivially stable and the badge re-renders only when the count actually changes.",
      language: "tsx",
      code: "import { useSelector, useDispatch } from 'react-redux';\nimport type { RootState } from '../store';\nimport { addItem } from '../actions';\n\nfunction CartBadge() {\n  // Granular selector: stable primitive \u2192 no spurious re-renders\n  const count = useSelector((s: RootState) => s.cart.items.length);\n  const dispatch = useDispatch();\n\n  return (\n    <button onClick={() => dispatch(addItem('widget'))}>\n      Cart ({count})\n    </button>\n  );\n}"
    }
  },
  {
    id: "react-what-is-the-purpose-of-the-constants-in-redux",
    title: "What is the purpose of the constants in Redux?",
    prompt: "What is the purpose of the constants in Redux?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "export const ADD_TODO = 'ADD_TODO';\nexport const DELETE_TODO = 'DELETE_TODO';\nexport const EDIT_TODO = 'EDIT_TODO';\nexport const COMPLETE_TODO = 'COMPLETE_TODO';\nexport const COMPLETE_ALL = 'COMPLETE_ALL';\nexport const CLEAR_COMPLETED = 'CLEAR_COMPLETED';\n\nimport { ADD_TODO } from './actionTypes';\n\n   export function addTodo(text) {\n     return { type: ADD_TODO, text };\n   }\n\nimport { ADD_TODO } from './actionTypes';\n\n   export default (state = [], action) => {\n     switch (action.type) {\n       case ADD_TODO:\n         return [\n           ...state,\n           {\n             text: action.text,\n             completed: false,\n           },\n         ];\n       default:\n         return state;\n     }\n   };",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Defining action types as string constants (`export const ADD_TODO = 'todos/add'`) prevents typo bugs, enables IDE autocomplete and refactoring, and centralizes action definitions in one importable file.",
        isCorrect: true,
        explanation: "Correct. A shared constant gives every action creator and reducer the identical string value, so a typo becomes a compile-time or IDE error instead of a silent fall-through to the reducer's `default` branch, and renaming the action is a single-file change the tooling propagates."
      },
      {
        id: "B",
        text: "They are required by the Redux store \u2014 dispatching an action whose `type` is a raw string instead of a constant throws a TypeError at runtime.",
        isCorrect: false,
        explanation: "Tempting because the Redux docs historically show constants, but the store only checks that `action.type` is a non-empty string. `dispatch({ type: 'todos/add' })` and `dispatch({ type: ADD_TODO })` are byte-for-byte identical at runtime; no validation enforces the constant."
      },
      {
        id: "C",
        text: "They let the bundler tree-shake unused reducers by statically resolving which action types each reducer handles in its switch statement.",
        isCorrect: false,
        explanation: "Tree-shaking operates on the module import/export graph, not on string values inside function bodies. A reducer module is included if it is imported, regardless of which constants appear in its `switch`; the constant does not participate in dead-code elimination."
      },
      {
        id: "D",
        text: "They are the mechanism that lets TypeScript narrow `action.type` in each `case` branch of a reducer's discriminated-union switch.",
        isCorrect: false,
        explanation: "Narrowing comes from the literal type you annotate on the action's `type` property (e.g. `type: 'todos/add'` in a union), not from the exported `const`. You could write `case 'todos/add':` with no constant and still get full narrowing as long as the action type is a discriminated union."
      }
    ],
    correctAnswer: "A",
    explanation: "Redux action types are plain strings at runtime. The constant `export const ADD_TODO = 'todos/add'` is indistinguishable from the literal `'todos/add'` once the module is evaluated. The value of introducing a named constant is entirely at the source-code level: it creates a single source of truth that every action creator and reducer imports from the same file.\n\nThis matters in practice because a typo like `'ADDD_TODO'` compiles and runs without error \u2014 the reducer simply falls through to `default` and returns the previous state, so the bug is silent until someone notices the UI never updates. With a shared constant, a misspelled import is a compile-time error (or at minimum an IDE red squiggle), and renaming the action type is a one-line change the IDE propagates everywhere.\n\nA nuance interviewers probe: Redux itself does not require constants. `store.dispatch({ type: 'todos/add' })` works identically. The convention is a team-level discipline for safety and discoverability, not a framework enforcement. In TypeScript, the narrowing you get in a reducer's switch statement comes from annotating the action as a discriminated union with literal types, not from the constant export itself.",
    interviewLine: "I use action-type constants as a single source of truth so a typo is a compile error instead of a silent fall-through to the reducer's default branch, and so renaming an action is a one-file change the IDE propagates across every action creator and reducer.",
    misconception: "Candidates often believe Redux validates action types at dispatch time, treating constants as a framework requirement rather than a developer convention whose only effect is at the source-code and tooling level.",
    hints: [
      "Think about what happens at runtime: is a `const` holding a string actually different from the string literal it contains?",
      "Now think about the development experience: what breaks if you hand-type 'ADDD_TODO' in two separate files with no shared import?",
      "The benefit lives entirely in the source-code and tooling layer \u2014 the Redux store itself never inspects whether you passed a constant or a raw literal."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice that `typeof ADD_TODO` yields the literal type `'todos/add'`, so a misspelled string in the type annotation is a compile error rather than a silent `default` fall-through.",
      language: "typescript",
      code: "export const ADD_TODO = 'todos/add' as const;\n\nexport interface AddTodoAction {\n  type: typeof ADD_TODO;\n  text: string;\n}\n\nexport const addTodo = (text: string): AddTodoAction => ({\n  type: ADD_TODO,\n  text,\n});\n\nexport function todoReducer(\n  state: string[] = [],\n  action: AddTodoAction,\n): string[] {\n  switch (action.type) {\n    case ADD_TODO:\n      return [...state, action.text];\n    default:\n      return state;\n  }\n}"
    }
  },
  {
    id: "react-what-are-the-features-of-redux-devtools",
    title: "What are the features of Redux DevTools?",
    prompt: "What are the features of Redux DevTools?",
    level: "junior",
    type: "fix",
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
        text: "It acts as a React rendering profiler, highlighting which components re-rendered and why, similar to the React DevTools browser extension.",
        isCorrect: false,
        explanation: "This confuses Redux DevTools with the React DevTools extension. Redux DevTools wraps the store's dispatch to log actions and state snapshots; it has no visibility into the React reconciliation cycle or component props."
      },
      {
        id: "B",
        text: "It runs automated test suites against your reducers and reports pass/fail results, replacing Jest or Vitest for state-logic assertions.",
        isCorrect: false,
        explanation: "Redux DevTools is an interactive debugging UI, not a test runner. It records and replays actions for a human to inspect, but it never executes assertions or produces a test report."
      },
      {
        id: "C",
        text: "It intercepts outgoing network requests in the browser, letting you mock API responses and inspect payloads without a separate proxy like MSW.",
        isCorrect: false,
        explanation: "Redux DevTools operates entirely on the in-memory store and its dispatch pipeline. It has no access to the fetch or XMLHttpRequest layer, so it cannot intercept, mock, or modify network traffic."
      },
      {
        id: "D",
        text: "It inspects every action payload, shows a structural diff of state changes, lets you jump back in time and replay actions, and persists the debug session across page reloads via persistState().",
        isCorrect: true,
        explanation: "Correct. These are the core capabilities: action logging with payloads, state-tree diffing, time-travel scrubbing with replay, and the persistState() enhancer for surviving reloads."
      }
    ],
    correctAnswer: "D",
    explanation: "Redux DevTools works as a store enhancer (or via the devTools option in configureStore). It wraps dispatch to record every action and captures a snapshot of state after each one. The UI\u2014typically a separate browser window or extension\u2014lets you scroll through those snapshots, read the action payload, and see a structural diff of what changed in state between two points.\n\nTime-travel is the headline feature: you scrub to a prior state, then replay the subsequent actions to watch the state evolve again. If a reducer throws, DevTools pinpoints which action triggered it and surfaces the error. The persistState() enhancer keeps the session alive across a page reload, which is invaluable when a bug only appears after several interactions.\n\nOne nuance interviewers probe: time-travel does not mutate the store's history. It dispatches a special restore action that tells the store to adopt a prior snapshot. If you edit a reducer while paused in time-travel, the remaining queued actions are re-evaluated against your new code, so a fix is visible immediately without a full reload.",
    interviewLine: "Redux DevTools is a store enhancer that wraps dispatch, records every action plus a state snapshot after each one, and gives me a time-travel UI where I can scrub back, replay actions, and see exactly which action caused a reducer to throw.",
    misconception: "Treating Redux DevTools as a component-level profiler or a network inspector rather than a store-level history debugger that wraps dispatch and snapshots state after every action.",
    hints: [
      "Think about what Redux DevTools hooks into: it's not a component-level tool. What does it wrap in the store's dispatch cycle?",
      "It records a state snapshot after every dispatched action. What can you do with a chronological sequence of those snapshots?",
      "Beyond inspection, it supports jumping to a prior snapshot and re-running the actions after it. There's also an enhancer that survives a full page reload."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/",
    example: {
      caption: "Notice how devTools and persistState are applied at the store level, not inside any component.",
      language: "typescript",
      code: "import { configureStore } from '@reduxjs/toolkit';\nimport { persistState } from 'redux-devtools';\nimport counterReducer from './counterSlice';\n\nconst store = configureStore({\n  reducer: { counter: counterReducer },\n  devTools: true,\n  enhancers: (g) => g(persistState()),\n});\n\n// Dispatch a few actions, then open the DevTools window:\nstore.dispatch({ type: 'counter/increment' });\nstore.dispatch({ type: 'counter/increment' });\n// In DevTools: scrub back to the state before both increments,\n// then hit Replay to watch them re-apply one by one."
    }
  },
  {
    id: "react-how-to-debug-your-react-native",
    title: "How to debug your React Native?",
    prompt: "How to debug your React Native?",
    level: "junior",
    type: "fix",
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
        text: "React Native's JS runtime is opaque to web-based tools, so you must debug exclusively through Xcode's LLDB or Android Studio's GDB.",
        isCorrect: false,
        explanation: "This conflates native debugging with JS debugging. The JS runtime (Hermes or JSC) speaks the Chrome DevTools Protocol over Metro's WebSocket, so Chrome DevTools or the React Native DevTools extension attach directly. Xcode and Android Studio are only needed for stepping through native Obj-C or Kotlin code."
      },
      {
        id: "B",
        text: "You must rebuild with a `--debug-js` Metro flag and connect a physical device over USB; simulators don't expose the JS debugging protocol.",
        isCorrect: false,
        explanation: "No such `--debug-js` flag exists in Metro. The CDP endpoint is served identically whether the app runs in a simulator, an emulator, or on a physical device. Simulators fully support JS debugging and are in fact the fastest way to iterate."
      },
      {
        id: "C",
        text: "Hermes bytecode is a closed format that can't be introspected, so you must switch back to JSC and add `enableDevMenu` to `Info.plist` to get any debugging.",
        isCorrect: false,
        explanation: "Hermes fully supports the Chrome DevTools Protocol and ships with source-map support in debug builds. The developer menu is gated by the `__DEV__` compile-time flag, not by an Info.plist key, and there is no need to abandon Hermes to debug."
      },
      {
        id: "D",
        text: "Open the in-app developer menu (Cmd+D in the iOS simulator, Cmd+M in the Android emulator, or triple-tap the app) and select \"Debug JS\" to connect Chrome DevTools or the React Native DevTools extension to the running JS runtime.",
        isCorrect: true,
        explanation: "Correct. The developer menu is the standard entry point; \"Debug JS\" triggers the CDP WebSocket handshake with Metro, and the browser-based debugger then inspects the live component tree, state, and call stack."
      }
    ],
    correctAnswer: "D",
    explanation: "Metro, the React Native dev server, exposes a Chrome DevTools Protocol (CDP) endpoint over WebSocket. The in-app developer menu\u2014opened with Cmd+D in the iOS Simulator, Cmd+M in the Android emulator, or a triple-tap on the app surface\u2014is the gateway to that endpoint. Selecting \"Debug JS\" tells the JS runtime (JSC or Hermes) to attach to the WebSocket, after which Chrome DevTools or the React Native DevTools browser extension takes over: breakpoints, component tree, performance timeline, and the network tab all work just like a web page.\n\nIn practice this means you debug the JavaScript layer of a React Native app the same way you'd debug a web app. Xcode and Android Studio are only needed when you must step through native Objective-C or Kotlin code; for the React/JS side, the browser-based debugger is sufficient and far faster to set up.\n\nA nuance interviewers probe: in a release (production) build the developer menu is compiled out because __DEV__ is false, and Hermes strips source maps by default. If a candidate says \"just press Cmd+D\" without acknowledging that this only works in a debug build, they haven't thought about the release debugging path, which requires a separate dev-signed build or a remote debugging session.",
    interviewLine: "I hit Cmd+D in the simulator, pick Debug JS, and step through components right in Chrome DevTools\u2014Metro's WebSocket bridge handles the CDP connection to Hermes, so the workflow is identical to debugging a web app, and I only reach for Xcode when I need to inspect the native bridge layer.",
    misconception: "Candidates treat the developer menu and its keyboard shortcuts as universal across all build types, assuming Cmd+D works in a production IPA exactly as it does in the simulator, without recognising that __DEV__ gates the entire menu out of release binaries.",
    hints: [
      "The dev server (Metro) serves more than just bundles\u2014it also exposes a debugging protocol. What in-app UI element gives you access to developer actions without leaving the app?",
      "The shortcut is a two-key Cmd combo with a single letter, not F12. It's the software equivalent of the old \"shake to debug\" gesture, and the letter differs between iOS and Android.",
      "The menu is called the \"developer menu\" or \"in-app developer menu.\" On the iOS simulator it's Cmd+D; on the Android emulator it's Cmd+M. From that menu you choose \"Debug JS\" to attach Chrome DevTools."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "When you select \"Debug JS\" from the developer menu, Chrome DevTools connects to this component tree via Metro's WebSocket and lets you inspect the `count` state, set a breakpoint inside the effect, and watch re-renders live.",
      language: "tsx",
      code: "import React from \"react\";\nimport { View, Text, Button } from \"react-native\";\n\nexport function Counter() {\n  const [count, setCount] = React.useState(0);\n\n  React.useEffect(() => {\n    // Set a breakpoint here in Chrome DevTools\n    console.log(\"effect fired, count =\", count);\n  }, [count]);\n\n  return (\n    <View>\n      <Text>Count: {count}</Text>\n      <Button title=\"Increment\" onPress={() => setCount((c) => c + 1)} />\n    </View>\n  );\n}"
    }
  },
  {
    id: "typescript-what-is-the-difference-between-flow-and-proptypes",
    title: "What is the difference between Flow and PropTypes?",
    prompt: "What is the difference between Flow and PropTypes?",
    level: "junior",
    type: "fix",
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
        text: "Both perform runtime validation, but Flow checks the entire codebase while PropTypes only checks component props.",
        isCorrect: false,
        explanation: "This conflates 'checking' with 'runtime checking.' Flow never produces any executable code; its analysis happens entirely in the compiler and is gone before the browser ever sees the output. Only PropTypes has a runtime component."
      },
      {
        id: "B",
        text: "PropTypes validates props in both development and production builds, while Flow annotations are stripped from the bundle after compilation.",
        isCorrect: false,
        explanation: "It is true that Flow annotations are erased, but PropTypes is also stripped in production. React's minified production build skips the `propTypes` validation calls entirely, so neither tool adds runtime cost in a production bundle."
      },
      {
        id: "C",
        text: "Flow and TypeScript perform static compile-time type checking across the entire codebase with no runtime cost; PropTypes validates component props at runtime, but only in development builds.",
        isCorrect: true,
        explanation: "Correct. Static checkers build a whole-project type graph before execution and erase their annotations; PropTypes is a set of validator functions React invokes during render, and only in development mode."
      },
      {
        id: "D",
        text: "PropTypes can validate function return types and internal state, while Flow is limited to checking prop types passed to components.",
        isCorrect: false,
        explanation: "This reverses the scope. PropTypes is strictly limited to the props object handed to a component; it has no visibility into function bodies, state, or return values. Flow and TypeScript can reason about every expression in the codebase."
      }
    ],
    correctAnswer: "C",
    explanation: "Flow and TypeScript are static type checkers. They analyze your source code before it ever executes, building a type graph across the entire project and reporting errors at compile time. The annotations are erased during transpilation (Babel, esbuild, tsc), so the JavaScript that ships to the browser contains no type information at all.\n\nPropTypes works on a completely different axis. You assign validator functions to a component's `propTypes` static property, and React calls those validators during rendering to confirm the props you received match the declared shape. Crucially, this only happens in development builds. React's production bundle skips the validation entirely, so there is zero runtime cost in production.\n\nThe scope difference matters in practice. PropTypes can only validate the props passed to a single component. It cannot reason about function return types, internal state, cross-file invariants, or generic constraints. A static checker sees the whole codebase and catches the moment a string is passed where a number is expected, even three modules away.\n\nOne nuance interviewers probe: in React 19, `propTypes` still works but the team treats it as legacy. The recommended path for type safety is TypeScript or Flow. PropTypes validators are also shallow\u2014they check 'is this a string' or 'is this an array' but cannot express conditional types, mapped types, or complex generic signatures.",
    interviewLine: "PropTypes is a development-time safety net that checks the props handed to a single component; Flow or TypeScript is a whole-program static analysis pass that catches type mismatches before a single line of JavaScript executes, and the annotations are erased from the bundle entirely.",
    misconception: "Treating PropTypes as a miniature type system and Flow/TypeScript as just a 'bigger PropTypes,' rather than recognizing they operate on fundamentally different axes\u2014whole-program static analysis versus shallow runtime prop validation.",
    hints: [
      "Ask yourself: when does each tool actually execute its checks\u2014before the browser runs any code, or while the browser is rendering?",
      "Think about what happens to the type annotations during transpilation. Does any of that information survive into the shipped JavaScript?",
      "PropTypes validators are functions React calls during render. Flow never produces any runtime code at all. That distinction defines the entire difference."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "The TypeScript version catches a wrong prop type at compile time with zero runtime cost; the PropTypes version only surfaces an error in the browser console during development.",
      language: "tsx",
      code: "// TypeScript: static, erased at compile time\ninterface UserCardProps {\n  name: string;\n  age: number;\n}\n\nfunction UserCard({ name, age }: UserCardProps) {\n  return <div>{name} is {age}</div>;\n}\n\n// Equivalent with PropTypes: runtime, dev-only\nimport PropTypes from 'prop-types';\n\nfunction UserCard(props) {\n  return <div>{props.name} is {props.age}</div>;\n}\n\nUserCard.propTypes = {\n  name: PropTypes.string.isRequired,\n  age: PropTypes.number.isRequired,\n};"
    }
  },
  {
    id: "react-what-is-the-difference-between-react-and-angular",
    title: "What is the difference between React and Angular?",
    prompt: "What is the difference between React and Angular?",
    level: "junior",
    type: "fix",
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
        text: "React is a full-stack framework that bundles routing, state management, and an HTTP client by default, while Angular is a lightweight rendering library comparable to Preact or Solid.",
        isCorrect: false,
        explanation: "This reverses the relationship. React's large ecosystem (Next.js, Remix, Zustand) can make it *feel* like a framework, but the `react` package itself ships only the view layer. Angular, by contrast, bundles routing, DI, and HTTP into its core distribution."
      },
      {
        id: "B",
        text: "Both React and Angular are full MVC frameworks with identical architectural philosophies; the only meaningful difference is that React uses JSX while Angular uses HTML templates for markup.",
        isCorrect: false,
        explanation: "Tempting because the component model looks similar, but React explicitly does not prescribe routing, DI, or a forms system. Calling both \"identical MVC frameworks\" erases the architectural commitment that defines Angular."
      },
      {
        id: "C",
        text: "React's virtual DOM gives it a fundamental performance advantage over Angular, which patches the real DOM directly on every change-detection cycle.",
        isCorrect: false,
        explanation: "A widespread performance myth. Angular 2+ also renders through a virtual DOM; its change-detection strategy (zone.js patching plus the CDK) differs from React's scheduler-based reconciliation, but neither patches the real DOM directly on every update."
      },
      {
        id: "D",
        text: "React is a focused UI view library using JSX and unidirectional data flow; Angular is a comprehensive MVC framework with built-in routing, HTTP client, dependency injection, and two-way binding.",
        isCorrect: true,
        explanation: "Correct. React scopes itself to the view layer and leaves routing, state, and data-fetching to the ecosystem, while Angular ships those concerns as first-party modules with a prescribed architecture."
      }
    ],
    correctAnswer: "D",
    explanation: "React is a library for the view layer. It gives you a component model, a reconciliation algorithm (virtual-DOM diffing), and JSX as a syntax for describing UI. It deliberately does not ship routing, a DI container, an HTTP client, or a forms system. You compose those from the ecosystem: react-router, Zustand or Redux, fetch or TanStack Query, react-hook-form.\n\nAngular is a framework. Out of the box it provides @angular/router, @angular/common/http, a built-in dependency-injection container, reactive and template-driven forms (ngModel for two-way binding), and a standalone-component architecture. The architectural intent is convention-over-configuration: the framework tells you how the app is structured.\n\nIn practice the line is blurry. Next.js and Remix build full application frameworks on top of React, and Angular's individual packages can be consumed in isolation. But the default developer experience and the level of opinionation differ fundamentally. Interviewers probe this to see whether you understand that \"library vs framework\" is about what is bundled and prescribed, not about which one produces faster code.",
    interviewLine: "React is a view-layer library: it gives me the component model and reconciliation, and I choose my own routing, state, and data-fetching. Angular is a framework that prescribes those layers through @angular/router, its DI container, and @angular/common/http, so a fresh `ng new` project already has a full architecture wired up.",
    misconception: "Conflating React's large third-party ecosystem with the React library itself, leading candidates to describe React as a \"framework\" and Angular as \"just a library\"\u2014the exact opposite of their architectural intent.",
    hints: [
      "Think about what ships in a default `npm install react` versus an `ng new` project. Does the core package include a router? An HTTP client? A DI container?",
      "One of these is explicitly a library (a tool you compose into an app), the other is a framework (a system that composes your app for you). Which is which?",
      "React's own README describes itself as a \"library for building user interfaces.\" Angular's docs call it a \"platform and framework.\" That single word is the whole answer."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Every import above (react-router-dom, @tanstack/react-query) is a third-party package; the `react` package itself provides none of them.",
      language: "tsx",
      code: "import { BrowserRouter, Routes, Route } from \"react-router-dom\"; // external\nimport { useQuery } from \"@tanstack/react-query\";                 // external\nimport { Home } from \"./Home\";\nimport { About } from \"./About\";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    }
  },
  {
    id: "react-do-i-need-to-keep-all-my-state-into-redux-should-i-ever",
    title: "Do I need to keep all my state into Redux? Should I ever use react internal state?",
    prompt: "Do I need to keep all my state into Redux? Should I ever use react internal state?",
    level: "intermediate",
    type: "fix",
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
        text: "Redux is the single source of truth, so every piece of mutable data\u2014including a dropdown's open/closed flag\u2014should live in the store to keep the app fully serializable and time-travel-debuggable.",
        isCorrect: false,
        explanation: "The 'single source of truth' phrasing in Redux docs tempts people into a purist reading. In practice, serializability and devtools only matter for state you actually want to inspect or replay; a transient `isExpanded` boolean gains nothing from a dispatch cycle and a selector that no other component will ever call."
      },
      {
        id: "B",
        text: "No\u2014use Redux for shared domain data and cached server responses, but keep transient, component-local UI state like focus, hover, or a form draft in `useState`.",
        isCorrect: true,
        explanation: "Correct. This matches the ownership model: global, cross-cutting, or server-derived state lives in a store; ephemeral, single-component state lives in `useState`, avoiding the dispatch-and-subscribe overhead for values no other part of the tree reads."
      },
      {
        id: "C",
        text: "Once a Redux store exists, `useState` becomes redundant; React's internal state is a legacy pattern that should be phased out as the store matures.",
        isCorrect: false,
        explanation: "Early Redux documentation framed component state as a stopgap, which led to the belief that the store must eventually absorb everything. React's state API is a first-class, zero-dependency primitive; Redux is an optional library layered on top, not a replacement for it."
      },
      {
        id: "D",
        text: "The deciding factor is update frequency: state that changes more than once per second must go in Redux so React can batch the updates, while rarely-changed values can stay in `useState`.",
        isCorrect: false,
        explanation: "This inverts the real trade-off. High-frequency values (drag position, scroll offset) are exactly what you want to keep out of a global store to avoid notifying every subscriber on each tick; Redux batching does not make high-frequency dispatch cheaper than a local `setState`."
      }
    ],
    correctAnswer: "B",
    explanation: "The decision is ownership and scope, not dogma. `useState` gives you a private, component-scoped value that vanishes on unmount\u2014perfect for a dropdown's open flag, a focused input, or a local form draft. Redux (or Zustand, Jotai, etc.) gives you a shared, subscribable store with devtools, time-travel, and selectors that span the tree. Pushing an `isHovered` boolean into a global store adds a dispatch cycle, a subscription check on every subscriber, and a selector that will never be reused\u2014pure overhead for zero benefit.\n\nIn practice the split is: server-fetched domain data, cross-feature shared state (auth token, cart), and anything that must survive a component unmount or be inspected in devtools belongs in a global store. Ephemeral UI state, animation progress, and single-component logic stays in `useState` or a `useRef`. The moment two unrelated features both need the same value, that is your signal to promote it.\n\nInterviewers probe the gray zone: a multi-step form where three sibling components each hold a field. That is not truly global, but it is not one component's state either. The answer is usually a local context or a feature-level store, not the root Redux store. React 19's `useOptimistic` and `useTransition` also reduce the need to hand-roll pending-state in a global store.",
    interviewLine: "I treat Redux as the shared domain layer\u2014auth, cart, cached API responses\u2014while `useState` handles anything only one component cares about, like a dropdown toggle or a local form draft. The moment two unrelated features both read the same value, I promote it to the store.",
    misconception: "React's internal state is a stopgap that Redux is meant to replace, so any application with a store should minimize or eliminate `useState` in favour of the store.",
    hints: [
      "Ask yourself: does any other component in the tree need to read or react to this value? If the answer is no, where does React itself suggest you keep it?",
      "Think about the cost of a global store: every dispatch notifies all subscribers and every selector re-runs. Is that overhead justified for a boolean that controls one dropdown?",
      "The real axis is ownership and lifetime, not a binary 'global vs local' rule. Does the value need to survive unmount, be inspected in devtools, or be shared across features?"
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that `expanded` is a private UI concern while `cartCount` crosses component boundaries\u2014each lives where its scope demands.",
      language: "tsx",
      code: "function ProductCard({ product }: { product: Product }) {\n  const [expanded, setExpanded] = useState(false); // local, ephemeral\n  const cartCount = useAppSelector((s) => s.cart.items.length); // shared\n\n  return (\n    <div>\n      <h3>{product.name}</h3>\n      <button onClick={() => setExpanded(!expanded)}>\n        {expanded ? \"Less\" : \"More\"}\n      </button>\n      <p>{cartCount} items in cart</p>\n    </div>\n  );\n}"
    }
  },
  {
    id: "algorithms-what-is-the-benefit-of-component-stack-trace-from-error",
    title: "What is the benefit of component stack trace from error boundary?",
    prompt: "What is the benefit of component stack trace from error boundary?",
    level: "intermediate",
    type: "fix",
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
        text: "It captures a serialisable snapshot of every component's props and state at the moment of the crash, so you can replay the render in devtools.",
        isCorrect: false,
        explanation: "Tempting because \"stack trace\" sounds like a full state dump, but the component stack is purely structural: component names, file paths, and line numbers. It never serialises props or state, and there is no replay mechanism attached to it."
      },
      {
        id: "B",
        text: "It is emitted by `componentDidCatch`, so you must call `console.error` inside that lifecycle method for it to appear in the console.",
        isCorrect: false,
        explanation: "This confuses your side-effect hook with React's own diagnostic. React logs the component stack internally in development regardless of what you write in `componentDidCatch`; that method is only for forwarding the error to an external service."
      },
      {
        id: "C",
        text: "It lists the React component ancestry (names, file paths, and line numbers) down to the throwing component, letting you locate the fault faster than correlating raw JS call frames.",
        isCorrect: true,
        explanation: "Correct. The component stack is React's structural diagnostic that maps the error back to your component tree, showing exactly which component threw and where in your source, which is far more actionable than a JS call stack full of `react-dom` internals."
      },
      {
        id: "D",
        text: "It supersedes the browser's native stack trace, so the console shows only the React component tree and no underlying JavaScript frames.",
        isCorrect: false,
        explanation: "In development both traces appear side by side: the JS call stack AND the component stack. React does not suppress or replace the native stack; the component stack is supplementary context layered on top of it."
      }
    ],
    correctAnswer: "C",
    explanation: "When a render error propagates up to an error boundary, React (in development) logs two traces to the console: the standard JavaScript call stack and a React component stack. The component stack lists the component ancestry \u2014 for example `App > Dashboard > UserList > BrokenRow` \u2014 with file paths and line numbers when source maps are available. This is structural information about your component tree, not a dump of props or state.\n\nThe practical benefit is speed of diagnosis. A raw JS stack trace for a render error often points into `react-dom` internals or anonymous minified frames, while the component stack names the exact component you wrote that threw. You can jump straight to `BrokenRow.tsx:12` in your editor instead of correlating opaque call frames.\n\nA nuance interviewers probe: the component stack is emitted by React's internal error handling, not by your `getDerivedStateFromError` or `componentDidCatch` methods. Those methods are for your fallback UI and side-effect logging (forwarding to Sentry, etc.). The component stack also does not include runtime prop or state values \u2014 it is purely the component hierarchy with source locations.",
    interviewLine: "The component stack is React's own diagnostic \u2014 it lists the component ancestry with file and line info, so I jump straight to the throwing component in my editor instead of decoding a raw JS call stack that's full of react-dom internals.",
    misconception: "The component stack is a props-and-state snapshot you generate inside `componentDidCatch`, when in fact it is React's own structural diagnostic (component names plus file locations) logged automatically in development, independent of any code you write in your error-boundary methods.",
    hints: [
      "Think about what React logs to the console in development when an error hits a boundary \u2014 there are actually two traces. What does the React-specific one show that the JS one doesn't?",
      "It's structural, not a state dump. It names components and their source locations, and React generates it internally \u2014 your `componentDidCatch` code isn't responsible for it.",
      "You get both traces in the console: the JS call stack AND the component hierarchy. The component stack is the one that tells you which of your own components threw."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that `componentDidCatch` is for side effects (forwarding to a service); the component stack you see in the console is React's own output, not something this method produces.",
      language: "tsx",
      code: "import { Component, type ReactNode } from \"react\";\n\ninterface Props { children: ReactNode }\ninterface State { hasError: boolean }\n\nclass ErrorBoundary extends Component<Props, State> {\n  state: State = { hasError: false };\n\n  static getDerivedStateFromError(): State {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error: Error) {\n    // React already logged the component stack to the console.\n    // Here we forward it to an external service.\n    console.warn(\"Forwarding:\", error.message);\n  }\n\n  render() {\n    if (this.state.hasError) return <p>Something went wrong.</p>;\n    return this.props.children;\n  }\n}"
    }
  },
  {
    id: "typescript-what-is-the-purpose-of-displayname-class-property",
    title: "What is the purpose of displayName class property?",
    prompt: "What is the purpose of displayName class property?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "senior"
    ],
    codeSnippet: "function withSubscription(WrappedComponent) {\n  class WithSubscription extends React.Component {\n    /* ... */\n  }\n  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;\n  return WithSubscription;\n}\nfunction getDisplayName(WrappedComponent) {\n  return WrappedComponent.displayName || WrappedComponent.name || 'Component';\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "A string property read by React DevTools, error messages, and debugging tools to label components in the tree; especially important for naming HOC-wrapped components so you see `WithSubscription(UserList)` instead of an anonymous `ForwardRef`.",
        isCorrect: true,
        explanation: "Correct. `displayName` is a human-readable debug label consumed by DevTools and error output; it plays no role in rendering or reconciliation. For HOCs it lets you compose a meaningful name that includes the wrapped component."
      },
      {
        id: "B",
        text: "The identifier React's reconciler uses to match parent and child elements in the fiber tree during reconciliation, ensuring correct state preservation across re-renders.",
        isCorrect: false,
        explanation: "This conflates a debug label with structural identity. React matches elements by their type reference (the function or class object itself), not by any string property. Changing `displayName` between renders has no effect on reconciliation or state."
      },
      {
        id: "C",
        text: "A TypeScript compile-time annotation that helps the type system resolve generic type parameters when inferring the return type of a higher-order component.",
        isCorrect: false,
        explanation: "`displayName` is a runtime string property read by DevTools; it is invisible to the TypeScript compiler. Generic inference in HOCs is driven entirely by type signatures and constraint parameters, not by any runtime metadata."
      },
      {
        id: "D",
        text: "A property that overrides the built-in `Function.name`, so both `Component.name` and `Component.displayName` return the same string after assignment.",
        isCorrect: false,
        explanation: "`displayName` and `name` are independent properties. Assigning one does not mutate the other; the snippet itself reads `WrappedComponent.displayName || WrappedComponent.name` as two separate fallbacks, confirming they hold different values."
      }
    ],
    correctAnswer: "A",
    explanation: "The `displayName` is a plain string property that React reads at runtime purely for debugging. It appears in the React DevTools component tree, in error messages thrown by `React.createElement` and error boundaries, and in the component labels shown in stack traces. It has zero effect on rendering, reconciliation, or any other runtime behaviour \u2014 React matches elements in the fiber tree by their type reference (the function or class identity), not by any string label.\n\nIn simple cases React infers a name from the declaration via `Function.name`, so `function UserList() {}` already shows as \"UserList\" in DevTools. The real need arises with HOCs and `React.forwardRef`: the wrapper's own name (or the generic \"ForwardRef\") replaces the wrapped component's name in the tree. Setting `WithSubscription.displayName = \\`WithSubscription(${getDisplayName(WrappedComponent)})\\`` produces a readable label like `WithSubscription(UserList)` so you can still identify what is wrapped.\n\nAn edge case interviewers probe: `displayName` and `name` are independent properties \u2014 setting one does not change the other. Also, for `React.forwardRef` components you must assign `displayName` to the object returned by `forwardRef(...)`, not to the render function inside it, or DevTools will show a bare \"ForwardRef\" with no useful context.",
    interviewLine: "displayName is purely a debug label \u2014 the reconciler matches elements by their type reference, not by name. I set it explicitly on HOC wrappers and forwardRef components so DevTools shows WithSubscription(UserList) instead of a bare ForwardRef, and I keep in mind it's independent from Function.name.",
    misconception: "Treating `displayName` as a structural identifier that React uses internally for reconciliation or state matching, rather than recognising it as a purely human-readable debug label that has no effect on runtime behaviour.",
    hints: [
      "Think about where you actually *see* component names while developing \u2014 DevTools tree, error messages, stack traces. What string property do those tools read?",
      "It has zero effect on rendering or reconciliation. React matches elements by their type reference (the function or class identity), not by any string label on the component.",
      "In the snippet the HOC sets it to a template string that includes the wrapped component's name. Why would you need to do this manually when React already infers names from function declarations?"
    ],
    source: "300-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    example: {
      caption: "Notice that `displayName` is assigned to the object returned by `forwardRef`, and the fallback chain reads both `displayName` and `name` as independent properties.",
      language: "tsx",
      code: "function withLoading<T extends React.ComponentType<Props>>(\n  Wrapped: T,\n) {\n  const WithLoading = React.forwardRef<HTMLDivElement, Props>(\n    (props, ref) => {\n      const [ready, setReady] = React.useState(false);\n      React.useEffect(() => {\n        // simulate async init\n        setReady(true);\n      }, []);\n      if (!ready) return <div ref={ref}>Loading\u2026</div>;\n      return <div ref={ref}><Wrapped {...props} /></div>;\n    },\n  );\n  WithLoading.displayName = `WithLoading(${\n    Wrapped.displayName ?? Wrapped.name ?? \"Component\"\n  })`;\n  return WithLoading;\n}"
    }
  },
  {
    id: "react-how-to-debug-forwardrefs-in-devtools",
    title: "How to debug forwardRefs in DevTools?",
    prompt: "How to debug forwardRefs in DevTools?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const WrappedComponent = React.forwardRef((props, ref) => {\n  return <LogProps {...props} forwardedRef={ref} />;\n});\n\nconst WrappedComponent = React.forwardRef(function myFunction(props, ref) {\n  return <LogProps {...props} forwardedRef={ref} />;\n});\n\nfunction logProps(Component) {\n  class LogProps extends React.Component {\n    // ...\n  }\n\n  function forwardRef(props, ref) {\n    return <LogProps {...props} forwardedRef={ref} />;\n  }\n\n  // Give this component a more helpful display name in DevTools.\n  // e.g. \"ForwardRef(logProps(MyComponent))\"\n  const name = Component.displayName || Component.name;\n  forwardRef.displayName = `logProps(${name})`;\n\n  return React.forwardRef(forwardRef);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "Wrap the forwardRef component in `React.memo` so DevTools can resolve the ref target and display the wrapped component's name.",
        isCorrect: false,
        explanation: "Tempting because `memo` is a common wrapper, but `React.memo` is a re-render optimisation; it has no effect on how DevTools labels a node or resolves ref targets."
      },
      {
        id: "B",
        text: "Pass the ref as a regular prop (e.g. `innerRef`) instead of the second parameter, since DevTools cannot read the special `ref` parameter of forwardRef.",
        isCorrect: false,
        explanation: "This confuses a naming problem with a data-access problem. DevTools reads and displays the ref target without issue; the only gap is the label text shown for the forwardRef node itself."
      },
      {
        id: "C",
        text: "ForwardRefs cannot be inspected in React DevTools because the render function is not a real component.",
        isCorrect: false,
        explanation: "DevTools renders and lets you expand forwardRef nodes, inspect their props, and follow the ref target. The limitation is only the default label text, not the ability to inspect the node."
      },
      {
        id: "D",
        text: "Name the render function passed to `React.forwardRef` or set `forwardRefComponent.displayName` so DevTools shows a meaningful label instead of the generic `ForwardRef`.",
        isCorrect: true,
        explanation: "Correct. DevTools reads the render function's name or the `displayName` property to build the label; without either, every wrapper appears as an indistinguishable `ForwardRef`."
      }
    ],
    correctAnswer: "D",
    explanation: "React.forwardRef creates a special component type that DevTools recognises in the component tree. To label the node, DevTools first checks the name of the render function you passed in, then falls back to the `displayName` property, and finally shows the generic string `ForwardRef`. So `React.forwardRef(function Button(props, ref) { \u2026 })` displays as `ForwardRef(Button)`, while an anonymous arrow function displays as just `ForwardRef`.\n\nThis matters in real codebases because forwardRef is the standard way to expose a DOM node or an imperative handle through a wrapper. Design-system HOCs, form libraries, and animation wrappers all produce forwardRef components. Without a meaningful name, your DevTools tree becomes a wall of identical `ForwardRef` labels and you cannot tell which wrapper wraps which child.\n\nOne nuance interviewers probe: `displayName` overrides the function name. If you name the inner function `Button` but also set `MyForward.displayName = 'MyButton'`, DevTools shows `MyButton`, not `ForwardRef(Button)`. The property always wins, which is useful when you want a brand name independent of how the function was declared.",
    interviewLine: "In DevTools a forwardRef node shows as the bare word `ForwardRef` unless you name the render function or set `displayName` on the forwardRef object; `displayName` always takes precedence over the function name, which is how I label every HOC in our design system.",
    misconception: "The label shown in DevTools is controlled by the component's runtime identity or by wrapping it in `React.memo`, rather than by the function name or `displayName` property stored on the forwardRef object.",
    hints: [
      "Think about what DevTools needs to render a text label for each node in the component tree. What property does React store on the component object for this purpose?",
      "React.forwardRef takes a render function as its argument. If that function has a `name`, DevTools picks it up automatically. What alternative property can you assign to the resulting component to override the label?",
      "You can either give the inner function a name (e.g. `function Button(props, ref) { \u2026 }`) or set `forwardRefComponent.displayName`. The `displayName` property always wins over the function name."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice how `displayName` overrides the inner function name, giving the wrapper a stable label in DevTools regardless of how the function is declared.",
      language: "tsx",
      code: "function withTooltip(Component: React.ComponentType) {\n  function Render(props: any, ref: React.Ref) {\n    return <div ref={ref}><Component {...props} /></div>;\n  }\n\n  const Wrapped = React.forwardRef(Render);\n  // \"Tooltip(MyButton)\" appears in DevTools, not \"ForwardRef(Render)\"\n  Wrapped.displayName = `Tooltip(${Component.displayName ?? Component.name}`;)\n  return Wrapped;\n}\n\n// Usage\nconst TooltipButton = withTooltip(Button);"
    }
  },
  {
    id: "react-what-is-the-purpose-of-eslint-plugin-for-hooks",
    title: "What is the purpose of eslint plugin for hooks?",
    prompt: "What is the purpose of eslint plugin for hooks?",
    level: "intermediate",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It pre-compiles hook calls into a linked list at build time so React's dispatcher can skip re-running unchanged hooks on subsequent renders.",
        isCorrect: false,
        explanation: "This confuses a dev-time linter with React's runtime hook dispatcher. The plugin never touches the bundle or the render loop; it only inspects source text and reports diagnostics."
      },
      {
        id: "B",
        text: "It statically enforces the Rules of Hooks (top-level calls only, no conditionals or loops) and flags missing dependencies in `useEffect`, `useCallback`, and `useMemo` dependency arrays.",
        isCorrect: true,
        explanation: "Correct. Both `rules-of-hooks` and `exhaustive-deps` are AST-level checks that run in your editor or CI, catching hook-order violations and stale-closure risks before any code executes."
      },
      {
        id: "C",
        text: "It guarantees that every `useEffect` cleanup function executes before the next render commits, preventing memory leaks in long-lived components.",
        isCorrect: false,
        explanation: "Cleanup scheduling is React's runtime job, not a linter's. The plugin can only *warn* you that a dependency is missing; it has no say in when or whether React calls your cleanup function."
      },
      {
        id: "D",
        text: "It tree-shakes unused hook imports from the final bundle so that components only ship the hooks actually invoked during their render pass.",
        isCorrect: false,
        explanation: "Tree-shaking is a bundler concern (esbuild, Rollup, webpack). eslint-plugin-react-hooks produces diagnostics and optional auto-fixes; it never rewrites or removes imports from the output bundle."
      }
    ],
    correctAnswer: "B",
    explanation: "The plugin ships two core rules. `rules-of-hooks` checks that hook calls appear only at the top level of a function component or custom hook, and not inside conditionals, loops, or nested callbacks. `exhaustive-deps` inspects the dependency arrays of `useEffect`, `useCallback`, and `useMemo` and warns when a reactive value is read inside the callback but missing from the array.\n\nBoth rules are purely static: the plugin parses your source with an AST and never executes your component. That means it catches the class of bugs that are hardest to reproduce at runtime\u2014stale closures from a forgotten dependency, or a hook that silently gets skipped on a conditional render\u2014before the code ever ships. In a real codebase this is the difference between a subtle state desync surfacing in a production incident and a yellow squiggle in your IDE at 10 AM.\n\nOne nuance interviewers probe: the plugin assumes any function whose name starts with `use` followed by a capital letter is a hook. If you name a plain utility `useId`, the linter will enforce hook rules on it; conversely a misnamed hook won't be checked at all. The naming convention is the contract the linter relies on.",
    interviewLine: "eslint-plugin-react-hooks is a static AST analysis tool, not a runtime mechanism. It enforces the Rules of Hooks\u2014top-level calls only, no conditionals\u2014and checks dependency-array completeness for useEffect, useCallback, and useMemo, catching stale-closure and hook-order bugs before they ever execute.",
    misconception: "The plugin is a runtime guard that React invokes during rendering to verify hook order, rather than a dev-time static-analysis tool that parses your source AST and reports diagnostics.",
    hints: [
      "Think about *when* the check happens: does it run when your component renders, or when you save the file in your editor?",
      "The plugin exposes two named rules. One governs where hooks may be called; the other governs what you must list in a dependency array.",
      "It never executes your component. It walks the AST and flags patterns that would break React's internal hook-order invariant."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Both rules fire here: a conditional hook call and a missing dependency in the effect array.",
      language: "tsx",
      code: "function Counter({ step }: { step: number }) {\n  const [count, setCount] = useState(0);\n\n  // rules-of-hooks: hook inside a conditional\n  if (step > 1) {\n    const [extra, setExtra] = useState(0);\n  }\n\n  // exhaustive-deps: `step` is read but not listed\n  useEffect(() => {\n    setCount((c) => c + step);\n  }, []);\n\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      {count}\n    </button>\n  );\n}"
    }
  },
  {
    id: "typescript-what-are-the-benefits-of-using-typescript-with-reactjs",
    title: "What are the benefits of using typescript with reactjs?",
    prompt: "What are the benefits of using typescript with reactjs?",
    level: "junior",
    type: "fix",
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
        text: "TypeScript adds runtime prop validation that rejects invalid values in production builds, similar to PropTypes.",
        isCorrect: false,
        explanation: "This conflates compile-time type checking with runtime validation. Type annotations are erased before the code ships, so no prop check exists at runtime. PropTypes (or a schema library like Zod) is what actually inspects values during render."
      },
      {
        id: "B",
        text: "TypeScript reduces production bundle size by tree-shaking unused imports and stripping type annotations during compilation.",
        isCorrect: false,
        explanation: "Tree-shaking is performed by the bundler (esbuild, Rollup, webpack), not by `tsc`. TypeScript does strip type annotations, but that saves only a few bytes of metadata; it is not a meaningful bundle-size strategy."
      },
      {
        id: "C",
        text: "Compile-time type safety for props, state, and hooks; IDE autocompletion and safe refactoring; self-documenting component APIs; and catching errors before they reach runtime.",
        isCorrect: true,
        explanation: "Correct. These are the concrete, day-to-day benefits: the compiler enforces prop contracts, the IDE navigates the type graph for you, and errors surface in the editor rather than as `undefined` crashes in the browser."
      },
      {
        id: "D",
        text: "TypeScript lets React skip re-renders for components whose prop types are structurally unchanged between renders.",
        isCorrect: false,
        explanation: "Types have no runtime presence, so React cannot inspect them. Re-render decisions are based on reference or value equality of the actual props object, not on the type annotations that were stripped at compile time."
      }
    ],
    correctAnswer: "C",
    explanation: "TypeScript types are erased at compile time. `tsc` or a transpiler like esbuild strips every annotation before JavaScript ships, so there is zero runtime cost and zero runtime validation. What you gain is a static analysis pass: the compiler verifies that props match their declared interface, that state is used with the right shape, and that hook return values are consumed correctly\u2014all before the code ever runs.\n\nIn a real codebase the props interface is a living contract. Rename a prop in one file and every consumer still passing the old name gets an error immediately. IDE autocompletion and safe refactoring (rename, extract, inline) work because the type graph is explicit. A missing `key`, a `useState<string>` value used as a number, or a forgotten optional prop surfaces in the editor instead of as a `TypeError` in production.\n\nThe nuance interviewers probe: TypeScript does not validate data crossing a runtime boundary. An API response or a `localStorage` value is still untyped at runtime unless you narrow it. Teams pair TypeScript with a runtime schema library (Zod, Valibot) for untrusted input, then let the inferred type flow into components. Static types handle developer ergonomics; runtime checks handle data integrity.",
    interviewLine: "TypeScript types are stripped at compile time, so they give me static guarantees\u2014prop contracts, safe refactoring, early error detection\u2014but I still need runtime validation like Zod for any data that crosses a trust boundary, because the types simply aren't in the shipped bundle.",
    misconception: "Because TypeScript is a superset of JavaScript, many developers assume its types persist at runtime and guard against bad data. They do not\u2014every annotation is erased before the code executes, leaving no runtime guard for API responses, form inputs, or deserialized state.",
    hints: [
      "Think about what happens to type annotations between `tsc` and the browser. Are they present at runtime?",
      "If types are erased, what does the compiler actually do with them before stripping? What do you gain from that checking pass?",
      "Beyond catching type errors, what developer-experience features does a type-aware IDE unlock\u2014and where do types explicitly NOT help?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "Notice how the compiler catches the missing required prop and the invalid literal before any code runs.",
      language: "tsx",
      code: "interface UserCardProps {\n  name: string;\n  role: \"admin\" | \"editor\" | \"viewer\";\n  avatarUrl?: string;\n}\n\nfunction UserCard({ name, role, avatarUrl }: UserCardProps) {\n  return (\n    <div>\n      {avatarUrl && <img src={avatarUrl} alt={name} />}\n      <h3>{name}</h3>\n      <span>{role}</span>\n    </div>\n  );\n}\n\n// \u2705 Compiler error: missing required prop `name`\n// <UserCard role=\"admin\" />\n\n// \u2705 Compiler error: \"superuser\" is not a valid literal\n// <UserCard name=\"Ada\" role=\"superuser\" />"
    }
  },
  {
    id: "system_design-explain-state-management-strategies-in-a-large-frontend",
    title: "Explain state management strategies in a large frontend application",
    prompt: "Explain state management strategies in a large frontend application",
    level: "senior",
    type: "fix",
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
        text: "Persist all authentication tokens and large nested JSON payloads in URL query parameters so any tab can read them without a store.",
        isCorrect: false,
        explanation: "Tempting because URLs are 'shareable state,' but tokens in the query string leak into browser history, server access logs, and `Referer` headers, and payloads beyond roughly 8 KB are truncated or rejected by browsers. This conflates shareability with a storage mechanism and introduces a security vulnerability that no client-side library can fix."
      },
      {
        id: "B",
        text: "Partition state by category\u2014local UI state via `useState`, server cache via React Query or SWR, cross-cutting client state via Zustand or Redux Toolkit, and shareable filters via `useSearchParams`\u2014keeping each value as close to its consumer as possible.",
        isCorrect: true,
        explanation: "Correct. Each state category has a different lifetime, update frequency, and sharing requirement, so matching it to the right primitive avoids unnecessary re-renders, keeps server data in a cache that handles staleness, and preserves URL-driven state for shareability."
      },
      {
        id: "C",
        text: "Drive a real-time stock ticker that updates every 200 ms through a single React Context provider so every subscribed component stays in sync.",
        isCorrect: false,
        explanation: "Sounds reasonable because Context is the built-in 'global state' API, but a Context value change re-renders every consuming component on every tick. At 5 updates per second across dozens of consumers this dominates the main thread; you would need `useSyncExternalStore` or a selector-based store (Zustand, Jotai) to subscribe at the granularity of a single price."
      },
      {
        id: "D",
        text: "Put every value\u2014input drafts, hover flags, modal booleans, and API responses\u2014into one Redux Toolkit slice so the devtools show a single source of truth.",
        isCorrect: false,
        explanation: "The 'one big store' habit comes from early Redux tutorials, but it forces every component to go through `connect`/`useSelector` for values that never leave the local subtree, inflates the action-reducer boilerplate, and makes server data management (refetch, dedup, caching) your responsibility instead of delegating it to a purpose-built query library."
      }
    ],
    correctAnswer: "B",
    explanation: "State in a frontend app falls into distinct categories by lifetime, scope, and update frequency: ephemeral UI state (a modal open/closed, a text input), server cache (API responses with loading and error metadata), shared client state (auth session, cart, theme), and URL state (filters, page number). Each category has a tool that matches its semantics. `useState` and `useReducer` own local state; React Query or SWR own server cache with built-in deduplication, stale-while-revalidate, and background refetch; Zustand, Jotai, or Redux Toolkit own cross-cutting client state with selective subscriptions; `useSearchParams` owns anything that must be shareable, bookmarkable, or survive a back/forward navigation.\n\nPlacing state as close to its consumer as possible is the operating principle. A modal's `isOpen` flag belongs in the component that renders the modal, not in a global store. The moment you lift a value into Context or a global slice, every consumer re-renders on change, and you lose the ability to reason about who owns the value. In a large app this distinction is what keeps bundle size, re-render cost, and cognitive load manageable.\n\nAn edge interviewers probe: the boundary between local and global state is about ownership, not component depth. If three sibling components need the same toggle and a parent can pass it via props, it is still local to that parent's subtree. The moment the value must survive a route change, be shared across unrelated feature trees, or be serialised into the URL, it graduates to a different tier. Another nuance: server state and client state that *derive* from server state (e.g., a computed cart total) are different concerns\u2014React Query caches the raw entities, while a client store holds the selection and derived values.",
    interviewLine: "I split state into four buckets\u2014local UI, server cache, shared client, and URL\u2014because each has a different ownership model and update cadence; a modal flag stays in `useState`, API entities live in React Query's cache with `staleTime`, the cart and auth session go in a small Zustand store with selectors, and filters live in `useSearchParams` so they survive a refresh and are shareable.",
    misconception: "There is one correct state library and every value in the app should live in it, so the design question is 'which library?' rather than 'what category does this value belong to and what are its sharing, lifetime, and update-frequency requirements?'",
    hints: [
      "Think about what happens when a value changes: does only one component care, do several unrelated feature trees need it, or must it survive a page reload and be pasteable into a chat message? Each answer points to a different tool.",
      "Ask yourself who *owns* the value. If the parent can pass it via props and the child never needs it after unmount, it is local. If two unrelated routes both read and write it, it is global. If it encodes the current view, it belongs in the URL.",
      "The biggest performance win in a large app is not choosing the fanciest store; it is keeping a 60 fps animation value out of a Context provider so that 200 unrelated components do not re-render on every frame."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the modal flag is local, the product list is server state, the cart is a small global store, and the filter lives in the URL.",
      language: "tsx",
      code: "import { useState, useSearchParams } from \"react\";\nimport { useQuery } from \"@tanstack/react-query\";\nimport { useCart } from \"@/stores/cart\"; // Zustand\n\nexport function ProductPage() {\n  const [modalOpen, setModalOpen] = useState(false); // local UI state\n  const [params, setParams] = useSearchParams(); // URL state\n  const category = params.get(\"category\") ?? \"all\";\n  const { items, add } = useCart(); // global client state\n\n  const { data: products } = useQuery({ // server cache\n    queryKey: [\"products\", category],\n    queryFn: () => fetchProducts(category),\n    staleTime: 5 * 60_000,\n  });\n\n  return (\n    <div>\n      {products?.map((p) => (\n        <button key={p.id} onClick={() => add(p)}>\n          {p.name}\n        </button>\n      ))}\n      <button onClick={() => setModalOpen(true)}>Cart ({items.length})</button>\n    </div>\n  );\n}"
    }
  },
  {
    id: "system_design-how-do-you-design-a-drag-and-drop-interface-n-answer-dr",
    title: "How do you design a drag-and-drop interface?",
    prompt: "How do you design a drag-and-drop interface?",
    level: "senior",
    type: "fix",
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
        text: "Use the native HTML5 Drag and Drop API exclusively, relying on `dragstart`/`dragover`/`drop` events with no touch-event fallback.",
        isCorrect: false,
        explanation: "Tempting because it avoids a dependency, but iOS Safari and most Android browsers never fire HTML5 DnD events on touch input, and ghost-image styling is inconsistent across engines. You end up writing a parallel pointer-events path anyway, at which point you have reinvented a sensor layer with fewer guarantees."
      },
      {
        id: "B",
        text: "Attach a document-level `mousemove` listener and call `setState` with new `top`/`left` pixel coordinates on every tick to reposition the element.",
        isCorrect: false,
        explanation: "Feels natural in React, but a full component-tree re-render at 60\u2013120 Hz causes measurable jank on boards with hundreds of items. It also provides no keyboard path, no collision logic, no touch support, and no ARIA announcements\u2014each of which a real product needs."
      },
      {
        id: "C",
        text: "Implement pointer-based dragging only and skip keyboard interaction, reasoning that the vast majority of users drag with a mouse or finger.",
        isCorrect: false,
        explanation: "Plausible in a 'ship it fast' context, but WCAG 2.1 SC 2.5.7 (Pointer and Keyboard) requires a keyboard-equivalent for every pointer interaction. Skipping it fails accessibility audits and excludes users with motor impairments or who rely on switch devices."
      },
      {
        id: "D",
        text: "Adopt an accessible drag-and-drop library such as `@dnd-kit/core`, configure pointer and keyboard sensors, choose a collision strategy, and commit order changes with `arrayMove` after drop.",
        isCorrect: true,
        explanation: "Correct. This gives you input abstraction (pointer + keyboard), pluggable collision detection, ARIA live-region announcements, and a clean commit point where you reorder state and sync to the server\u2014while the library handles 60 fps transforms and touch compatibility under the hood."
      }
    ],
    correctAnswer: "D",
    explanation: "Building drag-and-drop from scratch means reimplementing pointer capture, collision geometry, touch-versus-mouse differentiation, and ARIA live-region announcements. In production that is weeks of edge-case work (ghost elements, scroll containers, nested droppables) that a maintained library already solves.\n\n@dnd-kit/core separates concerns into DndContext (global drag state), useDraggable / useDroppable (per-item hooks), and SortableContext (ordered-list logic). Sensors abstract input: PointerSensor covers mouse and touch, KeyboardSensor handles Space-to-lift and arrow-to-move. The collision-detection strategy (closestCenter, rectIntersection, pointerWithin) lets you tune which droppable wins when multiple overlap.\n\nWhy it matters in real code: a kanban board with 200 cards across five columns will jank if you call setState on every mousemove. @dnd-kit mutates CSS transforms on the dragged node directly and only commits a React state change on drop, keeping the render loop at 60 fps. Screen-reader users receive 'Dragging. Use arrow keys to move.' announcements automatically.\n\nEdge case interviewers probe: when the drag target sits inside a scrollable container, the collision strategy must account for the scroll offset\u2014rectIntersection handles this where a naive centre-distance check does not. For cross-column moves you wrap multiple SortableContexts in a single DndContext and call arrayMove per column on drop.",
    interviewLine: "I'd use @dnd-kit because it separates the sensor layer (pointer vs. keyboard) from the collision strategy and from the state commit, so I get touch support, ARIA live-region announcements, and 60 fps dragging without setState-per-frame; my code only handles the onDragEnd business logic\u2014reorder the array and fire the API call.",
    misconception: "Drag-and-drop is 'just track pointer position and move a div.' In reality it is a small state machine with input abstraction, spatial collision, accessibility announcements, and a discrete commit step\u2014each easy to get subtly wrong without a purpose-built library.",
    hints: [
      "Think about what a drag-and-drop system must handle beyond moving pixels: multiple input modalities, spatial overlap resolution, screen-reader feedback, and the moment you commit state.",
      "A well-designed DnD library separates the sensor layer (pointer, keyboard) from the collision-detection strategy and from the final array mutation. Which option reflects that three-way separation?",
      "The right answer names a maintained library, explicit pointer and keyboard sensors, a pluggable collision algorithm, and a single commit point where you call arrayMove\u2014your code only owns the drop logic."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how the sensor, collision, and commit concerns are each one line of configuration, while per-item rendering stays declarative.",
      language: "tsx",
      code: "import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'\nimport { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable'\nimport { CSS } from '@dnd-kit/utilities'\n\nfunction Card({ id, title }: { id: string; title: string }) {\n  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })\n  return (\n    <li ref={setNodeRef}\n        style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}\n        {...attributes} {...listeners}>\n      {title}\n    </li>\n  )\n}\n\nfunction Board({ items }: { items: { id: string; title: string }[] }) {\n  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))\n  const [order, setOrder] = items\n  // onDragEnd: setOrder(prev => arrayMove(prev, oldIndex, newIndex))\n  return (\n    <DndContext sensors={sensors} collisionDetection={closestCenter}>\n      <SortableContext items={order.map(i => i.id)}>\n        <ul>{order.map(item => <Card key={item.id} {...item} />)}</ul>\n      </SortableContext>\n    </DndContext>\n  )\n}"
    }
  },
  {
    id: "typescript-fix-class-property-missing-this",
    title: "Fix the bug: a class property read without this",
    prompt: "This class does not compile. What is wrong?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "this",
      "fix"
    ],
    codeSnippet: "class Circle {\n  private radius: number;\n\n  constructor(radius) {\n    this.radius = radius;\n  }\n\n  calculateArea() {\n    return Math.PI * radius * radius;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "private members are inaccessible even to the declaring class's own methods",
        isCorrect: false,
        explanation: "This confuses the access modifier's purpose. private in TypeScript means \"visible only within the declaring class,\" which is exactly where calculateArea lives, so reading the property here is fully permitted."
      },
      {
        id: "B",
        text: "Math.PI must be explicitly imported from a numeric library before use",
        isCorrect: false,
        explanation: "Math is a built-in global object available in every execution context; no import or module specifier is needed. This trap lures candidates who conflate it with polyfilled or package-provided utilities."
      },
      {
        id: "C",
        text: "A constructor parameter and a class property may not share the same name",
        isCorrect: false,
        explanation: "Shadowing a property with a same-named parameter is legal and idiomatic (this.radius = radius). The parameter is a local binding; the property is an instance member\u2014they coexist without conflict."
      },
      {
        id: "D",
        text: "calculateArea references radius as a bare identifier with no binding in scope",
        isCorrect: true,
        explanation: "Correct. The constructor parameter radius is scoped to the constructor body only; inside calculateArea the bare name resolves to nothing, so the compiler reports Cannot find name. The fix is this.radius."
      }
    ],
    correctAnswer: "D",
    explanation: "Inside a method, a class property is not a variable in the method's lexical scope. It is a member of the instance, and the only way to reach it is through the instance reference this. When the compiler sees the bare identifier radius in calculateArea, it walks the scope chain\u2014method parameters, enclosing function scopes, module scope, globals\u2014and finds no binding with that name, so it emits a Cannot find name error.\n\nThis distinction matters because it is the single most common source of \"works in the constructor, breaks in the getter\" bugs in class-based code. The constructor parameter radius is a real local binding, so this.radius = radius is perfectly legal there; that scope ends at the closing brace of the constructor and does not leak into sibling methods.\n\nA nuance interviewers probe: the constructor parameter in the snippet also lacks a type annotation, so under noImplicitAny it is an implicit any. Annotating it as constructor(radius: number) removes a second, quieter compile error and makes the contract explicit.",
    interviewLine: "Class properties live on the instance, not in the method's lexical scope, so inside calculateArea the bare radius is an unresolved identifier\u2014I need this.radius to actually reach the value stored on the object.",
    misconception: "Treating class properties like closure variables that are ambient in every method body, rather than instance members that require an explicit this reference to be reached.",
    hints: [
      "Inside calculateArea, walk the scope chain the compiler uses to resolve the identifier radius: parameters, enclosing functions, module scope, globals. Is a binding there?",
      "The constructor parameter radius is a real local, but its scope ends at the constructor's closing brace. Does that scope extend into sibling methods like calculateArea?",
      "The fix is a single token: prefix the property access with the instance reference that every method receives implicitly."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    example: {
      caption: "Notice how the bare identifier works as a parameter in the constructor but is unresolvable in label()\u2014the fix is the this prefix.",
      language: "typescript",
      code: "class Timer {\n  private seconds: number;\n\n  constructor(seconds: number) {\n    // seconds is a parameter here, so it is in scope\n    this.seconds = seconds;\n  }\n\n  // BUG: no binding named seconds in this scope\n  // label() {\n  //   return `${seconds}s elapsed`;\n  // }\n\n  // FIX: reach the instance member explicitly\n  label(): string {\n    return `${this.seconds}s elapsed`;\n  }\n}"
    }
  },
  {
    id: "typescript-fix-filter-truthy-vs-even",
    title: "Fix the bug: a filter that keeps the wrong half",
    prompt: "This is meant to keep the even numbers, but logs [1, 3, 5]. Why?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "filter",
      "truthiness",
      "fix"
    ],
    codeSnippet: "const numbers: number[] = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter((num) => num % 2);\nconsole.log(evenNumbers);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "filter's callback must be annotated to return boolean; without it the predicate is treated as always-true",
        isCorrect: false,
        explanation: "filter's predicate type is (value: T, index: number, array: T[]) => unknown, so any return type is accepted and no annotation is required. The bug is purely a truthiness mismatch, not a missing type hint."
      },
      {
        id: "B",
        text: "num % 2 evaluates to 1 for odd numbers, and 1 is truthy, so filter keeps the odds and drops the evens",
        isCorrect: true,
        explanation: "Correct. The modulo yields 0 (falsy) for evens and 1 (truthy) for odds; filter retains whichever side is truthy, which here is the wrong half. The fix is num % 2 === 0."
      },
      {
        id: "C",
        text: "The % operator coerces its result to a string, and non-empty strings like \"0\" and \"1\" are always truthy",
        isCorrect: false,
        explanation: "% returns a number, not a string, so there is no string-coercion step. Even if the result were the string \"0\", it would still be truthy, which contradicts the observed output of only three elements."
      },
      {
        id: "D",
        text: "filter mutates the source array in place, so removing even-indexed elements shifts the remaining indices and changes which values are tested",
        isCorrect: false,
        explanation: "filter is non-mutating; it builds and returns a brand-new array while leaving the original untouched. The indices passed to the callback always refer to the original array, so no shifting occurs."
      }
    ],
    correctAnswer: "B",
    explanation: "`num % 2` produces 0 for even integers and 1 for odd ones. Array.prototype.filter does not require the callback to return a strict boolean; it tests the return value for truthiness. Because 0 is falsy and 1 is truthy, every even number is dropped and every odd number is kept \u2014 the exact opposite of the intent.\n\nThis is a silent logic bug: no type error, no runtime exception. TypeScript's filter signature types the predicate as (value: T, index: number, array: T[]) => unknown, so returning a bare number is perfectly legal and the compiler stays quiet. In a real codebase the wrong half of the data flows downstream and the mistake only surfaces in an integration test or a user report.\n\nA nuance interviewers probe: for negative integers, JavaScript's % can return -1 (for example -3 % 2 === -1), which is also truthy, so the same trap applies in either direction. The robust fix is always an explicit comparison \u2014 num % 2 === 0 \u2014 which returns a real boolean and makes the intent unmistakable to both the reader and the type system.",
    interviewLine: "filter tests the callback's return value for truthiness, not strict equality to true, so a bare modulo like num % 2 keeps the 1s (odds) and drops the 0s (evens); the fix is an explicit comparison, num % 2 === 0, which returns a real boolean.",
    misconception: "Reading num % 2 as a shorthand for \"is even.\" It is the remainder of the division, and the remainder for an even number is 0 \u2014 the one value that is falsy \u2014 so the predicate is inverted relative to the intent.",
    hints: [
      "Evaluate 3 % 2 and 4 % 2 by hand. What numeric values do you get?",
      "filter keeps elements whose predicate is truthy. Of those two numbers, which one is truthy?",
      "You need the predicate to be truthy for the numbers you want to keep. A strict equality check against 0 flips the truthiness to match your intent."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "Notice how the explicit === 0 comparison makes the intent readable and immune to the truthiness trap, even when the array contains negative values.",
      language: "typescript",
      code: "function splitByParity(nums: number[]): { evens: number[]; odds: number[] } {\n  const evens = nums.filter((n) => n % 2 === 0);\n  const odds  = nums.filter((n) => n % 2 !== 0);\n  return { evens, odds };\n}\n\nsplitByParity([-4, -3, 0, 1, 2, 7]);\n// \u2192 { evens: [-4, 0, 2], odds: [-3, 1, 7] }\n\n// The trap version would keep -3 and 7 (because -3 % 2 is -1, truthy)\n// and drop -4, 0, 2 (because their remainder is 0, falsy)."
    }
  },
  {
    id: "typescript-fix-union-assignment-outside-type",
    title: "Fix the bug: assigning outside a union",
    prompt: "Which line fails to compile, and why?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "union-types",
      "assignability",
      "fix"
    ],
    codeSnippet: "let data: string | number;\ndata = \"Hello\";\ndata = 42;\ndata = true;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "data = true \u2014 boolean is not a constituent of string | number",
        isCorrect: true,
        explanation: "Correct. An explicitly annotated union is a closed set; the compiler rejects any value whose type is not one of the declared members, and `boolean` is absent from `string | number`."
      },
      {
        id: "B",
        text: "None of them \u2014 TypeScript widens an explicit union to include newly assigned types",
        isCorrect: false,
        explanation: "Confuses type widening (which applies to inferred literals like `let x = \"hi\"` becoming `string`) with explicit annotations. A declared union is fixed; it never grows to accommodate a later assignment."
      },
      {
        id: "C",
        text: "data = 42 \u2014 a union variable can only hold the type of its first assignment",
        isCorrect: false,
        explanation: "Mixes up union semantics with a single-slot variable. A union permits *any* of its declared members at any point; `number` is explicitly listed, so `42` is perfectly valid."
      },
      {
        id: "D",
        text: "data = \"Hello\" \u2014 assigning to a union requires a type assertion like `data as string`",
        isCorrect: false,
        explanation: "Confuses reading (narrowing) with writing. You never need an assertion to assign a value whose type is already a member of the union; assertions are a workaround for the compiler, not a requirement."
      }
    ],
    correctAnswer: "A",
    explanation: "An explicit type annotation like `string | number` is a closed contract: the variable may hold a `string` or a `number`, and nothing else. When the compiler sees `data = true`, it checks `boolean` against the declared union, finds no match, and emits TS2322 (Type 'boolean' is not assignable to type 'string | number').\n\nThis matters because unions are how you model \"one of these shapes\" in real code\u2014API responses, config objects, event payloads. If the type silently widened on every assignment, a single stray `true` would poison the variable's type for the rest of the scope, and every later `if (typeof data === \"number\")` branch would still have to defend against `boolean`.\n\nThe nuance interviewers probe: widening does exist, but only for *inferred* types. `let x = \"hi\"` infers `string` (widened from the literal `\"hi\"`), and `let y = 1` infers `number`. Neither is a union, and neither grows to include `boolean` on a later assignment. An explicit annotation is always the final word.",
    interviewLine: "A union annotation is a closed set\u2014`string | number` means exactly those two types for the life of the variable. If you need `boolean` too, you widen the declaration, not the runtime value.",
    misconception: "Treating an explicitly annotated union as a mutable set that expands on assignment, conflating it with the widening behaviour TypeScript applies to inferred literal types.",
    hints: [
      "List the types the annotation actually names, then check each assigned value against that list.",
      "Ask yourself: does TypeScript ever *add* a type to an explicitly written annotation just because you assigned a new value?",
      "Contrast `let data: string | number` with `let x = \"hi\"`\u2014which of those two is subject to widening, and how?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    example: {
      caption: "Notice how the explicit union rejects `true`, while the inferred variable simply has a different (single) type\u2014neither one \"grows.\"",
      language: "typescript",
      code: "let explicit: string | number = \"hi\";\nexplicit = 99;       // ok\n// explicit = true;  // TS2322\n\nlet inferred = \"hi\";  // type is string (widened from \"hi\")\ninferred = 99;       // TS2322 as well\n// inferred = true;  // TS2322"
    }
  },
  {
    id: "typescript-fix-factorial-loop-multiplies-by-zero",
    title: "Fix the bug: a factorial that always returns 0",
    prompt: "factorial(5) returns 0. What is wrong with the loop?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "loops",
      "off-by-one",
      "fix"
    ],
    codeSnippet: "function factorial(n: number): number {\n  let result = 1;\n  for (let i = n; i >= 0; i, ) {\n    result = result * i;\n  }\n  return result;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "n is not validated as a non-negative integer, so the loop can misbehave",
        isCorrect: false,
        explanation: "A real robustness gap, but for n = 5 the input is perfectly valid. The zero result is caused entirely by the loop's termination condition, not by missing guards."
      },
      {
        id: "B",
        text: "The condition i >= 0 lets the loop reach 0, so the running product is multiplied by zero",
        isCorrect: true,
        explanation: "Correct. The `i = 0` iteration executes `result * 0`, which is 0 no matter what the product was before. Changing the condition to `i > 0` stops the loop at 1 and preserves the accumulated value."
      },
      {
        id: "C",
        text: "result should be initialised to 0 instead of 1",
        isCorrect: false,
        explanation: "This inverts the bug. Starting a multiplicative accumulator at 0 makes every product 0 from the first iteration. The multiplicative identity is 1, so `result = 1` is already correct."
      },
      {
        id: "D",
        text: "The loop counts downward from n, but factorial must be computed upward from 1",
        isCorrect: false,
        explanation: "Multiplication is commutative, so 5\u00b74\u00b73\u00b72\u00b71 equals 1\u00b72\u00b73\u00b74\u00b75. The direction of the loop has no effect on the product; the bug is purely the off-by-one in the termination test."
      }
    ],
    correctAnswer: "B",
    explanation: "The loop condition is `i >= 0`, so the body executes one extra time when `i` equals 0. On that final pass the statement `result = result * i` becomes `result * 0`, which is always 0 regardless of how much work the earlier iterations did. For `n = 5` the product correctly reaches 120 at `i = 1`, then the `i = 0` iteration wipes it out.\n\nThe fix is a single-character change: `i > 0`. Now the last iteration multiplies by 1 (a no-op for a product) and the loop exits before touching 0. This also handles the `n = 0` edge case correctly: the loop body never runs, `result` stays at its initial value of 1, and `factorial(0)` returns 1 as the math demands.\n\nA nuance interviewers probe: why is 0 harmless in an additive loop but fatal in a multiplicative one? Adding 0 is the identity for `+`, but multiplying by 0 is the absorbing element for `*`. The identity for multiplication is 1, which is why `result` is initialised to 1 and why the loop must stop before `i` reaches 0. Conflating the two identities is the root of both this bug and the tempting-but-wrong option to start `result` at 0.\n\nInput validation (rejecting negatives or non-integers) is a separate, legitimate concern, but it is not what makes `factorial(5)` return 0.",
    interviewLine: "The loop condition `i >= 0` admits one extra iteration where `i` is 0, and multiplying any running product by 0 collapses it. I change the guard to `i > 0` so the last multiplication is by 1, which is the multiplicative identity and a no-op.",
    misconception: "Confusing the additive identity (0) with the multiplicative identity (1), leading a candidate to suspect the initial value of the accumulator rather than the loop bound that lets i reach 0.",
    hints: [
      "Trace the loop for n = 5 and write down every value of i the body actually sees. What is the last one?",
      "Whatever `result` is before that last iteration, what does `result * 0` evaluate to?",
      "The fix is a single-character change to the comparison operator in the loop condition."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "Notice how the same `>= 0` bound is harmless in the sum loop (adding 0 is a no-op) but fatal in the product loop (multiplying by 0 destroys the value).",
      language: "typescript",
      code: "function factorial(n: number): number {\n  if (n < 0) throw new RangeError(\"n must be >= 0\");\n  let result = 1;\n  for (let i = n; i > 0; i--) {\n    result *= i;\n  }\n  return result; // factorial(0) \u2192 1, loop never runs\n}\n\nfunction sumTo(n: number): number {\n  let total = 0;\n  for (let i = n; i >= 0; i--) {\n    total += i; // adding 0 is harmless\n  }\n  return total;\n}"
    }
  },
  {
    id: "typescript-fix-any-return-type-loses-information",
    title: "Fix the weakness: a function that knows more than it declares",
    prompt: "This function works correctly at runtime. What should be improved about its types?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "any",
      "return-types",
      "fix"
    ],
    codeSnippet: "function keepNumbers(miscData: any[]): any[] {\n  const numbers: any[] = [];\n  for (let value of miscData) {\n    value = parseFloat(value);\n    if (!isNaN(value)) {\n      numbers.push(value);\n    }\n  }\n  return numbers;\n}\n\nconst onlyNumbers = keepNumbers([1, 2, \"hello\", 4.56, \"78\", null]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The return type should be number[] \u2014 the body guarantees it, but declaring any[] hands callers unchecked any values",
        isCorrect: true,
        explanation: "Correct. Every element that survives the isNaN check is a number, so number[] is the honest signature. Keeping any[] erases that guarantee for every downstream consumer."
      },
      {
        id: "B",
        text: "parseFloat should be replaced with Number, because parseFloat returns a string representation of the parsed value",
        isCorrect: false,
        explanation: "parseFloat already returns a number (or NaN); it never returns a string. The confusion is with String() or with the input it accepts. Swapping it for Number would change edge-case behaviour (e.g. Number('') is 0, parseFloat('') is NaN) but is not a type fix."
      },
      {
        id: "C",
        text: "for...of cannot iterate an array whose element type is any, so the loop itself is the type error to fix",
        isCorrect: false,
        explanation: "for...of calls the iterable protocol and works on any array regardless of element type. any elements are perfectly iterable; the loop is not the problem."
      },
      {
        id: "D",
        text: "Change the parameter to unknown[] and the body compiles unchanged, since unknown is assignable to the string parameter of parseFloat",
        isCorrect: false,
        explanation: "unknown is not assignable to string, so parseFloat(value) would be a type error the moment the parameter is unknown[]. You would need a typeof guard or a cast, meaning the body does not stay unchanged. Even with that fix, the return type would still be any[], leaving the real gap in place."
      }
    ],
    correctAnswer: "A",
    explanation: "The body does real work: it parses every element, rejects NaN, and only pushes finite numbers into the result array. Yet the declared return type is any[], so every caller receives any-typed elements and can call .charAt() or index into them with zero compiler feedback. The guarantee the body just earned is thrown away at the signature.\n\nDeclaring the return as number[] restores that contract at the call site. Callers can pass the result into arithmetic, feed it to functions typed (n: number) => void, and get a compile error if they try to treat an element as a string. The input type (any[] vs unknown[]) is a secondary concern; the return type is where the function's promise lives.\n\nA nuance interviewers probe: tightening the input to unknown[] is a further improvement because it forces the body to justify its parsing \u2014 you cannot call parseFloat on unknown without a guard \u2014 but it does not fix the caller-side hole if the return type stays any[]. The return type is where the contract is actually broken.",
    interviewLine: "The body filters out NaN and only pushes numbers, so the return type should be number[]. Leaving it as any[] means every caller loses checking on the result, which is the exact contract the function just worked to establish.",
    misconception: "Treating any as a neutral \"I'll sort it out later\" annotation rather than a type eraser that silently propagates to every downstream consumer and disables checking on their code.",
    hints: [
      "Trace what the function actually puts into the result array \u2014 what type is every element that survives the isNaN check?",
      "Now look at what the declared return type tells a caller. What can a caller do with an any-typed element that they should not be allowed to do?",
      "The input type is also loose, but which declaration is responsible for the guarantee the body just earned?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "The filter narrows to numbers at runtime, but the any[] return type lets the caller treat an element as a string without a compile error.",
      language: "typescript",
      code: "function extractIds(rows: any[]): any[] {\n  return rows\n    .map((r) => r.id)\n    .filter((v) => typeof v === \"number\");\n}\n\nconst ids = extractIds([{ id: 1 }, { id: \"x\" }, { id: 2 }]);\nids.sort((a, b) => a - b);     // fine\nids[0].toUpperCase();          // compiles \u2014 should be an error"
    }
  },
  {
    id: "typescript-fix-class-fields-not-declared",
    title: "Fix the bug: assigning to properties a class never declared",
    prompt: "This class does not compile. What is missing?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "properties",
      "fix"
    ],
    codeSnippet: "class Car {\n  constructor(make: string, model: string, year: number) {\n    this.make = make;\n    this.model = model;\n    this.year = year;\n  }\n\n  getInfo(): string {\n    return `${this.make} ${this.model} (${this.year})`;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The fields are never declared on the class, so `this.make` and the others are not part of the instance type",
        isCorrect: true,
        explanation: "Correct. TypeScript resolves `this.make` against the class's declared members; because no field (or parameter property) introduces `make`, the property simply does not exist on the type and the assignment is an error."
      },
      {
        id: "B",
        text: "Disabling `strictPropertyInitialization` lets TypeScript infer the fields from the constructor assignments",
        isCorrect: false,
        explanation: "That flag only relaxes the \"declared but uninitialized\" check on fields that already exist on the type. It does not synthesize new properties, so the code still fails with the property-missing error."
      },
      {
        id: "C",
        text: "The constructor needs the `public` modifier so that assigned values become instance properties",
        isCorrect: false,
        explanation: "Constructor visibility is unrelated to property creation. Parameter properties put `public` on the *parameter*, not on the constructor keyword, and the issue here is the absence of any declaration at all."
      },
      {
        id: "D",
        text: "TypeScript skips the missing-field error when `noImplicitAny` is turned off",
        isCorrect: false,
        explanation: "`noImplicitAny` governs whether untyped function parameters and variables default to `any`; it has no bearing on whether a class property exists on the instance type."
      }
    ],
    correctAnswer: "A",
    explanation: "TypeScript builds an instance's type from the class's declared fields, not from what the constructor happens to assign. When the compiler sees `this.make = make`, it looks up `make` on the class type, finds no declaration, and reports an error. This is deliberate: the type system needs a static, inspectable surface for properties rather than inferring shape from runtime assignments.\n\nThe fix is to declare the fields above the constructor (`make: string; model: string; year: number;`) or to collapse declaration and assignment into one step with parameter properties: `constructor(public make: string, public model: string, public year: number) {}`. Both produce identical emitted JavaScript; parameter properties are syntactic sugar for the declare-then-assign pattern.\n\nA nuance interviewers probe: `strictPropertyInitialization` is a related but separate flag. It suppresses the \"property has no initializer\" error on fields that are declared but not assigned in the constructor. It does not create properties that were never declared, so turning it off would not fix this code. In plain JavaScript, `this.make = make` simply creates the property at runtime with no type-level bookkeeping, which is why the habit carries over from JS.",
    interviewLine: "The instance type comes from declared fields or parameter properties, never from constructor assignments alone. I'd add `public` to each constructor parameter to collapse the declaration and the assignment into one line.",
    misconception: "Carrying over the JavaScript habit where `this.x = x` in a constructor both creates and types the property, assuming TypeScript will infer the field from the assignment.",
    hints: [
      "Read the class body as the compiler does: what members does it actually see declared before the constructor runs?",
      "In TypeScript, `this.x = value` is a *use* of a property, not a *creation* of one. What step is missing before that use?",
      "There are two idiomatic fixes: an explicit field declaration above the constructor, or a one-line parameter-property shorthand."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking",
    example: {
      caption: "Compare the three shapes: the broken version, explicit fields, and parameter properties all produce the same runtime object.",
      language: "typescript",
      code: "class User {\n  name: string;\n  age: number;\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet(): string {\n    return `Hi, I'm ${this.name} (${this.age})`;\n  }\n}\n\n// Equivalent, using parameter properties:\nclass User {\n  constructor(public name: string, public age: number) {}\n  greet(): string {\n    return `Hi, I'm ${this.name} (${this.age})`;\n  }\n}"
    }
  },
  {
    id: "typescript-fix-class-members-separated-by-commas",
    title: "Fix the bug: commas between class members",
    prompt: "This class fails to parse. What is the syntax error?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "syntax",
      "fix"
    ],
    codeSnippet: "class Person {\n  name: string,\n  age: number,\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Class members are delimited by semicolons or newlines, not commas",
        isCorrect: true,
        explanation: "Correct. The ECMAScript class-body grammar only recognises `;` or a line terminator between members; a comma is a syntax error, not a valid separator."
      },
      {
        id: "B",
        text: "Property declarations require an explicit access modifier like `public`",
        isCorrect: false,
        explanation: "Tempting if you are used to codebases that enforce explicit modifiers, but TypeScript defaults class members to `public`; omitting the modifier is perfectly valid."
      },
      {
        id: "C",
        text: "The constructor must appear before any property declarations",
        isCorrect: false,
        explanation: "This mirrors the ordering rules in some other languages, but TypeScript and JavaScript allow class members in any order; the constructor can come first, last, or in the middle."
      },
      {
        id: "D",
        text: "Properties must be given an initialiser at the declaration site",
        isCorrect: false,
        explanation: "Under `strictPropertyInitialization` the compiler only requires that the property is assigned somewhere before the constructor returns; assigning `this.name = name` in the constructor satisfies the check without an inline initialiser."
      }
    ],
    correctAnswer: "A",
    explanation: "A class body follows the JavaScript `class` grammar, in which members are delimited by semicolons or line terminators (ASI). A comma after a property declaration is not a recognised separator in that grammar; the parser encounters it where a `;`, a newline, or a closing brace is expected and emits a syntax error. The comma is not silently ignored or coerced\u2014it is a hard parse failure.\n\nThis trips up a lot of TypeScript developers because the type-system grammar is more permissive. In an interface or a type literal you may write `name: string, age: number` or `name: string; age: number`; both are valid. The class body, however, inherits its member-separation rules from ECMAScript, where only `;` and newlines are allowed. Carrying the comma habit from type definitions into a class is the single most common reason this error appears in code review.\n\nA nuance interviewers like to probe: the semicolon itself is optional in a class body thanks to ASI, so `name: string` on one line followed by `age: number` on the next is perfectly legal. What is *not* legal is inserting a comma in that gap. The fix is to delete the commas (or replace them with semicolons); no other change to the class is required.",
    interviewLine: "Class bodies inherit their member-separation rules from the ECMAScript class grammar\u2014semicolons or line terminators\u2014whereas interfaces and type literals in the TypeScript type system also accept commas; mixing those two grammars is where the parse error comes from.",
    misconception: "Treating a class body like a type literal, where commas and semicolons are interchangeable member separators, when in fact the class body follows ECMAScript class grammar that only permits semicolons or newlines.",
    hints: [
      "Commas are valid separators in object literals, type literals, and interfaces. Is a class body in that list?",
      "Replace each comma with a semicolon (or just a newline) and see if the error disappears\u2014nothing else needs to change.",
      "The class-body grammar comes from the ECMAScript specification, not from TypeScript's type-system grammar, so its separator rules are narrower."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    example: {
      caption: "The same member list is legal in an interface but a syntax error in a class body.",
      language: "typescript",
      code: "interface Person {\n  name: string,\n  age: number\n}\n\nclass Person {\n  name: string,   // syntax error: comma is not a valid member separator\n  age: number     // fine \u2014 newline acts as the separator\n\n  constructor(name: string, age: number) {\n    this.name = name\n    this.age = age\n  }\n}"
    }
  },
  {
    id: "typescript-fix-sum-array-off-by-one",
    title: "Fix the bug: a sum that returns NaN",
    prompt: "sumArray([1, 2, 3]) returns NaN. Why?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "arrays",
      "off-by-one",
      "fix"
    ],
    codeSnippet: "function sumArray(arr: number[]): number {\n  let sum = 0;\n  for (let i = 1; i <= arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Initialising sum to arr[0] instead of 0 would include the missing first element",
        isCorrect: false,
        explanation: "This addresses the skipped index but leaves the loop still reading arr[arr.length] on its last iteration, so the sum would still end up NaN. The root cause is the loop bounds, not the seed value."
      },
      {
        id: "B",
        text: "The loop starts at i = 1 and ends at i = arr.length, so it skips arr[0] and reads undefined at the last index",
        isCorrect: true,
        explanation: "Correct. Both the start index and the <= comparison are off by one; the final read of arr[arr.length] returns undefined, and any += involving undefined produces NaN."
      },
      {
        id: "C",
        text: "Out-of-range reads on a number[] array are coerced to the string 'undefined', so += concatenates instead of adding",
        isCorrect: false,
        explanation: "The temptation is to blame type coercion, but arr[i] past the end returns the value undefined, not a string. The result is NaN from arithmetic on undefined, not a concatenated string."
      },
      {
        id: "D",
        text: "TypeScript's strict mode disallows += on number[] elements, so the accumulator silently resets to 0 each iteration",
        isCorrect: false,
        explanation: "+= is perfectly valid for accumulating numbers in a typed loop; strict mode does not restrict the operator. The bug is purely in the loop bounds, not in how the accumulation is written."
      }
    ],
    correctAnswer: "B",
    explanation: "Two off-by-one errors compound in a single loop. Starting at i = 1 skips arr[0], and the condition i <= arr.length means the final iteration reads arr[arr.length], which is undefined. In JavaScript, any arithmetic operation involving undefined yields NaN (5 + undefined === NaN), so the running total collapses on the last iteration and the function returns NaN instead of a number.\n\nThis is a classic gap between TypeScript's static types and runtime reality. The signature arr: number[] tells the compiler that arr[i] is a number for every i, because an index signature carries no bound information. Unless noUncheckedIndexedAccess is enabled, the compiler will not flag arr[3] on a three-element array, so the bug sails through type-checking and only surfaces at runtime.\n\nA subtle edge case interviewers probe: if the input array is empty the loop body never executes and the function returns 0, which looks correct. The NaN only appears for non-empty arrays, so a test suite that includes an empty-array case can pass while real data exposes the defect. The fix is simply for (let i = 0; i < arr.length; i++).",
    interviewLine: "The loop has two off-by-one errors: it starts at index 1, skipping the first element, and the <= means the final iteration reads arr[length], which is undefined. Since any arithmetic with undefined produces NaN, the whole sum collapses rather than just being slightly off.",
    misconception: "Because arr is typed number[], every access arr[i] is assumed to be a number at runtime, but TypeScript's index signature encodes no bound, so out-of-range reads silently return undefined.",
    hints: [
      "Trace the loop for a 3-element array: which indices does i actually take, and what does the last iteration read?",
      "What value does JavaScript return when you index one past the last element of an array, and what does 5 + that value evaluate to?",
      "Check both the starting value of i and the comparison operator in the for-loop condition against the valid index range."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "Notice how the buggy loop reads arr[3] (undefined) on its last pass, turning the sum into NaN, while the fixed loop stays within 0..length-1.",
      language: "typescript",
      code: "const arr = [1, 2, 3];\n\n// Buggy: i runs 1, 2, 3 \u2192 arr[3] is undefined\nlet sum = 0;\nfor (let i = 1; i <= arr.length; i++) sum += arr[i];\nconsole.log(sum); // NaN\n\n// Fixed: i runs 0, 1, 2\nsum = 0;\nfor (let i = 0; i < arr.length; i++) sum += arr[i];\nconsole.log(sum); // 6"
    }
  },
  {
    id: "typescript-spread-object-typed-parameters",
    title: "Spreading a value typed as object",
    prompt: "Does this compile, and what is the weakness in its typing?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "spread",
      "object-type",
      "generics",
      "fix"
    ],
    codeSnippet: "function mergeObjects(obj1: object, obj2: object): object {\n  return { ...obj1...obj2 };\n}\n\nconst merged = mergeObjects({ name: \"John\" }, { age: 30 });",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It compiles and merged is correctly typed as { name: string; age: number }",
        isCorrect: false,
        explanation: "The tempting belief is that TypeScript infers the return type from the implementation body. It does not: the explicit `object` annotation is the contract the caller sees, and it erases the concrete shape entirely."
      },
      {
        id: "B",
        text: "It fails to compile because `object` is not a valid spread source",
        isCorrect: false,
        explanation: "This conflates `object` with `null`/`undefined`. The spread operator accepts any non-nullish type, and `object` (any non-primitive) is squarely in that set. The code type-checks fine."
      },
      {
        id: "C",
        text: "It compiles, but the `object` return type erases both shapes so `merged` has no accessible properties",
        isCorrect: true,
        explanation: "Correct. `object` is the most abstract non-primitive type; it permits spreading but exposes zero property names, so the caller cannot read `merged.name` or `merged.age` without a cast."
      },
      {
        id: "D",
        text: "It compiles, but `object` carries an implicit index signature, so `merged` is typed as `Record<string, unknown>`",
        isCorrect: false,
        explanation: "This confuses `object` with `{ [key: string]: unknown }`. `object` has no index signature and no known members at all; you cannot bracket-access it either. It is strictly weaker than an index-signature type."
      }
    ],
    correctAnswer: "C",
    explanation: "The code compiles without error. In TypeScript, `object` means 'any non-primitive value' (plain objects, arrays, functions, class instances), and the spread operator is valid on any such value. So `{ ...obj1, ...obj2 }` is a perfectly legal expression and the function body type-checks.\n\nThe weakness is at the type boundary. The return annotation `object` discards everything the compiler could have inferred about the shape. At the call site, `merged` is typed as `object`, which carries no property names, no index signature, and no known members. Writing `merged.name` or `merged.age` is a compile error, even though the values are present at runtime.\n\nThe standard fix is to make the function generic: `function mergeObjects<A extends object, B extends object>(a: A, b: B): A & B`. Now the caller's concrete types flow through and `merged.name` is visible. A subtlety interviewers probe: if `A` and `B` both declare the same property with incompatible types, `A & B` produces `never` for that property, whereas the actual spread result uses `B`'s type (last spread wins). In that edge case, letting the compiler infer the spread type or using a mapped-type return is more precise than a bare intersection.",
    interviewLine: "`object` is the type-level 'any non-primitive' \u2014 it's a valid spread source but carries no shape information. If the caller needs to see properties after the call, the signature has to be generic so the concrete types flow through the boundary.",
    misconception: "Treating `object` as if it were an index-signature type like `Record<string, unknown>` or as a type that blocks spreading. In reality `object` is the most abstract non-primitive: it is a legal spread source but exposes zero properties to the caller.",
    hints: [
      "Ask yourself: does the `object` type list any property names, or does it merely say 'not a primitive'?",
      "The spread expression itself is fine. The issue is what the return annotation does to the shape at the call site. Try writing `merged.name` and see what the compiler reports.",
      "You need the caller's concrete types to survive the function boundary. What TypeScript feature lets a function accept and return type parameters constrained to non-primitives?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    example: {
      caption: "Notice how the same spread body produces an unusable type without generics and a fully-typed result with them.",
      language: "typescript",
      code: "function merge(a: object, b: object): object {\n  return { ...a, ...b };\n}\nconst m1 = merge({ name: \"Ada\" }, { age: 36 });\n// m1.name \u2192 error: Property 'name' does not exist on type 'object'\n\nfunction merge2<A extends object, B extends object>(a: A, b: B): A & B {\n  return { ...a, ...b };\n}\nconst m2 = merge2({ name: \"Ada\" }, { age: 36 });\n// m2.name \u2192 \"Ada\" \u2713\n// m2.age  \u2192 36   \u2713"
    }
  },
  {
    id: "typescript-generic-class-dictionary-correct",
    title: "Reading a generic class that is already correct",
    prompt: "What, if anything, is wrong with this generic Dictionary?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "index-signature",
      "fix"
    ],
    codeSnippet: "class Dictionary<T> {\n  private data: { [key: string]: T } = {};\n\n  setValue(key: string, value: T): void {\n    this.data[key] = value;\n  }\n\n  getValue(key: string): T | undefined {\n    return this.data[key];\n  }\n}\n\nconst myDict = new Dictionary<number>();\nmyDict.setValue(\"one\", 1);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getValue should return T, not T | undefined, because the stored value is always T",
        isCorrect: false,
        explanation: "Tempting if you treat the type parameter as a guarantee, but a key that was never set yields `undefined` at runtime. Returning bare `T` would let the compiler accept the code while silently hiding the missing-key case from every caller."
      },
      {
        id: "B",
        text: "A private field cannot carry an index signature; it must be public or readonly",
        isCorrect: false,
        explanation: "Visibility modifiers and index signatures are orthogonal. `private data: { [key: string]: T }` compiles without error; `private` only restricts access from outside the class and says nothing about the shape of the type."
      },
      {
        id: "C",
        text: "Nothing is wrong; the class is correctly typed, and T | undefined honestly reflects a missing key",
        isCorrect: true,
        explanation: "Correct. The index signature, the unconstrained type parameter, the private visibility, and the `T | undefined` return type are all valid and together model a string-keyed store whose lookups can miss."
      },
      {
        id: "D",
        text: "T must be constrained (e.g. T extends string | number) to be used as an index signature value type",
        isCorrect: false,
        explanation: "An unconstrained type parameter is perfectly legal as the value type in `{ [key: string]: T }`. Constraints are needed when you must *call* or *index into* T, not when T simply appears as a value type in a record."
      }
    ],
    correctAnswer: "C",
    explanation: "This Dictionary is correctly typed. The index signature `{ [key: string]: T }` is a perfectly valid type for a generic field: the key type is fixed to string, and the value type is threaded through the type parameter. No constraint like `T extends ...` is required for a type parameter to appear as an index signature's value type, and the `private` visibility modifier is independent of whether the field carries an index signature.\n\nThe most important detail is `getValue` returning `T | undefined`. At runtime, reading a key that was never set genuinely produces `undefined`, so the return type must acknowledge that. Declaring it as bare `T` would be a lie the type system would silently accept (since `T` is assignable to `T | undefined`), but it would push the undefined-handling burden onto every caller.\n\nA nuance interviewers probe: with `noUncheckedIndexedAccess: true`, the compiler itself widens `this.data[key]` to `T | undefined`, making the explicit annotation redundant but still correct. Without that flag (the default), the expression has type `T`, yet the function's declared return type `T | undefined` is still the honest contract because the runtime value can be `undefined`.",
    interviewLine: "I'd keep `T | undefined` on the getter because a missing key really does yield `undefined` at runtime, and the type should force the caller to narrow rather than paper over the gap.",
    misconception: "Seeing `T | undefined` in a 'find the bug' prompt and assuming it is defensive over-annotation that should be 'fixed' to bare `T`, when in fact it is the only honest signature for a lookup that can miss.",
    hints: [
      "What does `this.data[key]` evaluate to at runtime when the key was never set?",
      "Does TypeScript require a type parameter to be constrained before it can appear as an index signature's value type?",
      "If the code compiles cleanly and the return type is a supertype of the expression's type, is there actually a type error to fix?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    example: {
      caption: "Notice that Map.get already returns T | undefined natively, so the explicit annotation is redundant there but still the honest contract.",
      language: "typescript",
      code: "class Store<T> {\n  private map = new Map<string, T>();\n\n  get(key: string): T | undefined {\n    return this.map.get(key); // Map.get already yields T | undefined\n  }\n\n  set(key: string, value: T): void {\n    this.map.set(key, value);\n  }\n}\n\nconst s = new Store<string>();\ns.set(\"a\", \"hello\");\nconst v = s.get(\"missing\"); // T | undefined \u2014 must narrow before use\nif (v !== undefined) {\n  console.log(v.length); // safe\n}"
    }
  },
  {
    id: "typescript-numeric-enum-comparison-correct",
    title: "Reading a numeric enum that is already correct",
    prompt: "Is there a logical error in this enum and the function that uses it?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "enums",
      "fix"
    ],
    codeSnippet: "enum DaysOfTheWeek {\n  Sunday,\n  Monday,\n  Tuesday,\n  Wednesday,\n  Thursday,\n  Friday,\n  Saturday,\n}\n\nfunction getWorkingDay(day: DaysOfTheWeek): string {\n  if (day === DaysOfTheWeek.Saturday || day === DaysOfTheWeek.Sunday) {\n    return \"Weekend\";\n  }\n  return \"Weekday\";\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The if-chain is not exhaustive; TypeScript requires a switch with a `never` default to verify all seven members are covered",
        isCorrect: false,
        explanation: "Exhaustiveness checking via a `never` default is a useful pattern for discriminated unions, but it is not a language requirement. The function returns a string on every path, so the if/else is logically complete without a switch."
      },
      {
        id: "B",
        text: "Sunday is 0, which is falsy, so `day === DaysOfTheWeek.Sunday` evaluates to false at runtime",
        isCorrect: false,
        explanation: "This confuses === with a truthiness test like `if (day)`. Strict equality compares two numeric values directly; 0 === 0 is true. Falsiness only matters when a value is coerced to a boolean."
      },
      {
        id: "C",
        text: "The code is correct: members auto-number from 0 to 6, and === compares those numbers exactly without any truthiness step",
        isCorrect: true,
        explanation: "Correct. Numeric enums emit real JS numbers starting at 0, and === is a strict numeric comparison, so every branch behaves as written."
      },
      {
        id: "D",
        text: "Numeric enum members have no runtime value until explicitly initialized, so both comparisons silently fail",
        isCorrect: false,
        explanation: "This treats auto-numbering as a compile-time-only convenience. In the emitted JavaScript, the members are plain numbers (0, 1, \u2026 6); explicit initializers are optional, not required for the values to exist at runtime."
      }
    ],
    correctAnswer: "C",
    explanation: "The code is logically correct. A plain numeric enum auto-numbers its members from 0, so Sunday is 0 through Saturday is 6. The === operator performs strict numeric equality, not a truthiness test, so `0 === 0` is simply true. The if/else covers every path and returns a string in all cases; no exhaustiveness switch is required for the function to be correct.\n\nThe nuance interviewers probe is at the type-system boundary, not inside the function. Numeric enums are not nominal: because every member is a `number`, TypeScript allows any `number` to be passed where the enum type is expected. Calling `getWorkingDay(99)` compiles and returns \"Weekday\" with no warning, even though 99 is not a member. A string enum, or a union of string literals, is nominal and rejects unknown values at compile time.\n\nIf you need runtime validation on a numeric enum, a guard like `Object.values(DaysOfTheWeek).includes(day as DaysOfTheWeek)` or migrating to a string-literal union is the standard fix. The snippet as written has no logical error; the caveat is about what the type system lets through, not about the control flow.",
    interviewLine: "Numeric enums auto-number from zero and compare exactly under ===, but they're not nominal\u2014any number is assignable to the type\u2014so I'd reach for a string-literal union when I need the compiler to reject unknown values.",
    misconception: "Treating === as if it coerces its operands to booleans, so a member whose value is 0 (falsy) would \"fail\" the comparison. Strict equality is a numeric comparison, not a truthiness check.",
    hints: [
      "Think about what === actually does versus a truthiness check like `if (day)`.",
      "The comparisons use === against a specific member value. Does the fact that one member is 0 change how strict equality behaves?",
      "The control flow is sound. The only real concern is a type-system boundary issue, not a logic bug inside the function."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/enums.html",
    example: {
      caption: "Notice that 99 passes the type check for the numeric enum, while the string enum rejects \"unknown\" at compile time.",
      language: "typescript",
      code: "enum Status { Active, Inactive, Banned }\n\nfunction label(s: Status): string {\n  return s === Status.Banned ? \"Banned\" : \"OK\";\n}\n\nlabel(99); // compiles \u2014 numeric enums are not nominal\n\nenum SStatus {\n  Active = \"active\",\n  Inactive = \"inactive\",\n  Banned = \"banned\",\n}\n\nfunction slabel(s: SStatus): string {\n  return s === SStatus.Banned ? \"Banned\" : \"OK\";\n}\n\nslabel(\"unknown\"); // compile error: not assignable to SStatus"
    }
  },
  {
    id: "typescript-private-field-encapsulation-correct",
    title: "Reading an encapsulated class that is already correct",
    prompt: "Does this BankAccount contain a logical error?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "fix"
    ],
    codeSnippet: "class BankAccount {\n  private balance: number;\n\n  constructor(initialBalance: number) {\n    this.balance = initialBalance;\n  }\n\n  deposit(amount: number): void {\n    this.balance += amount;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getBalance() should return a defensive copy to prevent external mutation of balance",
        isCorrect: false,
        explanation: "Defensive copying matters when the field is a mutable reference type like an array or object. balance is a number, a primitive copied by value on every read, so there is no reference to protect."
      },
      {
        id: "B",
        text: "private is erased in the emitted JS, so the field is publicly writable and the class is broken",
        isCorrect: false,
        explanation: "True that private is compile-time only, but that is a design trade-off, not a logical error. The code is still correct as written; #balance would add a runtime guarantee if you need one, but its absence is not a bug."
      },
      {
        id: "C",
        text: "balance has no definite assignment at the declaration site, violating strictPropertyInitialization",
        isCorrect: false,
        explanation: "strictPropertyInitialization is satisfied by assignment anywhere in the constructor, not only at the declaration. this.balance = initialBalance in the constructor is sufficient; no initialiser is required."
      },
      {
        id: "D",
        text: "Nothing is wrong; the field is encapsulated, initialised in the constructor, and both methods are correctly typed",
        isCorrect: true,
        explanation: "Correct. A primitive cannot leak a mutable reference, constructor assignment satisfies definite-assignment checks, and the method signatures accurately describe their behaviour. Adding input validation or #balance are policy choices, not bug fixes."
      }
    ],
    correctAnswer: "D",
    explanation: "balance is a number, a primitive. Returning it from getBalance copies the value; there is no reference the caller could mutate. This is the key distinction from returning a private array or object, where a defensive copy would be necessary to prevent external mutation.\n\nTypeScript's private keyword is erased in the emitted JavaScript, so the property is technically accessible at runtime. That is a deliberate trade-off, not a bug: the compiler enforces encapsulation at the type level, and switching to #balance would add a runtime guarantee if the threat model requires it. Neither requirement is violated by the code as written.\n\nThe constructor assigns balance, which satisfies strictPropertyInitialization, and both methods carry accurate return and parameter types. The only real improvement is a policy choice, such as rejecting a non-positive deposit amount, but that is a business rule, not a correctness fix.",
    interviewLine: "TypeScript's private is a compile-time contract erased from the output, while #private is a runtime invariant enforced by the engine. I pick one or the other based on whether I trust only my codebase or also third-party tooling at runtime.",
    misconception: "Treating every private field as if it were a mutable reference, so returning it always demands a defensive copy. Primitives like number are copied by value on read; only object and array fields need a copy to shield the caller.",
    hints: [
      "Ask yourself: is balance a value type or a reference type, and what does returning it actually hand to the caller?",
      "Now check the other two common suspects: does the constructor satisfy strictPropertyInitialization, and does private being erased make the code *incorrect* rather than merely less strict?",
      "If none of those are bugs, the class is fine as written and any further changes are policy choices, not correctness fixes."
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
    example: {
      caption: "The array field genuinely leaks a mutable reference, unlike the number in the question's BankAccount.",
      language: "typescript",
      code: "class Cart {\n  private items: string[] = [];\n\n  addItem(item: string): void {\n    this.items.push(item);\n  }\n\n  // Leaks: caller can splice, push, or reassign elements\n  getItems(): string[] {\n    return this.items;\n  }\n\n  // Safe: caller receives an independent copy\n  getItemsSafe(): string[] {\n    return [...this.items];\n  }\n}"
    }
  }
];
