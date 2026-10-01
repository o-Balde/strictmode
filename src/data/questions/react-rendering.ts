import { QuizQuestion } from '../types';

export const REACT_RENDERING_QUESTIONS: QuizQuestion[] = [
{
  "id": "react-how-to-render-an-array-of-elements",
  "title": "How to render an array of elements?",
  "prompt": "How to render an array of elements?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "const languages = [\n  \"JavaScript\",\n  \"TypeScript\",\n  \"Python\",\n];\n\nfunction App() {\n  return (\n    <div>\n      <ul>{languages.map((language) => <li>{language}</li>)}</ul>\n    </div>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Join the items into one string with `Array.prototype.join('')` and pass it as a `text` prop to a `<div>`.",
      "isCorrect": false,
      "explanation": "Tempting if you think React renders strings the way `innerHTML` does, but a joined string collapses the list into one text node and loses every element identity React needs to reconcile."
    },
    {
      "id": "B",
      "text": "Iterate with `Array.prototype.map()` and return a JSX element per item, giving each a unique, stable `key`.",
      "isCorrect": true,
      "explanation": "Correct. `map` transforms each datum into an element, and the `key` lets React track that element's identity across re-renders so it can move DOM nodes instead of rebuilding them."
    },
    {
      "id": "C",
      "text": "Write a `for` loop directly between the JSX tags without returning an array.",
      "isCorrect": false,
      "explanation": "Tempting because loops feel natural for iteration, but the braces in JSX hold an expression, and a `for` statement produces no value, so nothing renders."
    },
    {
      "id": "D",
      "text": "Call `document.createElement('li')` imperatively inside the parent's JSX.",
      "isCorrect": false,
      "explanation": "Tempting if you reach for the DOM API you already know, but imperative node creation bypasses the virtual DOM, so React never sees those nodes and reconciliation breaks."
    }
  ],
  "correctAnswer": "B",
  "explanation": "You turn data into UI by calling `Array.prototype.map()` on the array and returning one React element per item. `map` produces an array of elements, and JSX accepts an array in a `{...}` expression, so React renders each child in order.\n\nIn real code you also pass a `key` to every element React generates from the array. The key is a stable identity React uses during reconciliation to match elements between renders; without it React warns and falls back to index-based matching, which corrupts state when items are inserted, removed, or reordered.\n\nThe nuance an interviewer probes: the key belongs on the outermost element returned by the callback, not on a child inside it, and it must come from the data (a database id), not the array index when the list can change.",
  "interviewLine": "I map the data to elements and give each a stable `key` from the record's id, so React can reconcile the list by identity rather than by position.",
  "misconception": "Thinking React needs a special loop construct for lists, when any expression that evaluates to an array of elements works, and the only extra requirement is a stable `key`.",
  "hints": [
    "The braces inside JSX hold a JavaScript expression, so ask what value it must evaluate to.",
    "What does React use to tell one rendered list item from another between renders?",
    "An array index looks unique, but what happens to it when you delete the first item?"
  ],
  "source": "44-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the key comes from the record's id, so reordering the array never confuses React.",
    "language": "tsx",
    "code": "const users = [\n  { id: 7, name: \"Ada\" },\n  { id: 12, name: \"Linus\" },\n];\n\nfunction UserList() {\n  return (\n    <ul>\n      {users.map((user) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}"
  }
},
{
  "id": "react-what-is-jsx",
  "title": "What is JSX?",
  "prompt": "What is JSX?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const someElement = React.createElement(\n  'h3',\n  {className: 'title__value'},\n  'Some Title Value'\n);\n\nconst someElement = (\n  <h3 className='title__value'>Some Title Value</h3>\n);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A syntax extension for JavaScript that resembles HTML and compiles to `React.createElement` or `_jsx` runtime calls.",
      "isCorrect": true,
      "explanation": "Correct. The build step transpiles each element into a function call that returns a React element object, so JSX is sugar over ordinary JavaScript."
    },
    {
      "id": "B",
      "text": "A separate language that browsers run directly with no build or compile step.",
      "isCorrect": false,
      "explanation": "Tempting because JSX reads like markup the browser understands, but no engine parses JSX; a tool must transpile it to JavaScript first."
    },
    {
      "id": "C",
      "text": "A CSS preprocessor like Sass that compiles stylesheets into CSS Modules.",
      "isCorrect": false,
      "explanation": "Tempting if you conflate every build-time transform, but JSX describes element trees, not stylesheet rules, and emits JavaScript rather than CSS."
    },
    {
      "id": "D",
      "text": "A query syntax like GraphQL for reading rows from a database.",
      "isCorrect": false,
      "explanation": "Tempting because both are declarative, but JSX produces UI elements for JavaScript, not a data-fetching query language."
    }
  ],
  "correctAnswer": "A",
  "explanation": "JSX is a syntax extension for JavaScript that looks like HTML but is not a template language. A compiler such as Babel or SWC rewrites each tag into a function call: `React.createElement(type, props, ...children)` with the classic transform, or `_jsx(type, props)` from `react/jsx-runtime` with the automatic transform used today.\n\nBecause JSX compiles to plain function calls, it is just JavaScript. Anything in braces is an expression evaluated at runtime, the result is a React element object, and the browser never sees JSX itself.\n\nThe detail an interviewer looks for: JSX is not HTML. Attributes use the DOM property names (`className`, `htmlFor`), and a lowercase tag becomes a string type while a capitalized tag resolves to a component reference in scope.",
  "interviewLine": "I describe JSX as sugar for `React.createElement` or the `_jsx` runtime call; it compiles to plain JavaScript that returns element objects, so the browser never sees a tag.",
  "misconception": "Believing the browser executes JSX natively, when a compiler must first rewrite every tag into `React.createElement` or `_jsx` calls.",
  "hints": [
    "Look at what tooling runs between your source and the browser.",
    "What JavaScript value does a single `<div />` turn into after the build?",
    "If the browser ran it directly, why would you need Babel or SWC at all?"
  ],
  "source": "44-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the two forms are identical after compilation; the second is what the browser actually runs.",
    "language": "tsx",
    "code": "const jsx = <h3 className=\"title\">Hello</h3>;\n\n// After the automatic transform the compiler emits:\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nconst compiled = _jsx(\"h3\", { className: \"title\", children: \"Hello\" });"
  }
},
{
  "id": "react-how-to-render-an-element-conditionally",
  "title": "How to render an element conditionally?",
  "prompt": "How to render an element conditionally?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "return (\n  <div>\n    {isVisible && <span>I'm visible!</span>}\n  </div>\n);\n\nreturn (\n  <div>\n    {isOnline ? <span>I'm online!</span>: <span>I'm offline</span>}\n  </div>\n);\n\nif (isOnline) {\n  element = <span>I'm online!</span>;\n} else {\n  element = <span>I'm offline</span>;\n}\n\nreturn (\n  <div>\n    {element}\n  </div>\n);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Add `v-if` and `v-else` attributes to the JSX tags.",
      "isCorrect": false,
      "explanation": "Tempting if you come from Vue, but `v-if` is a Vue directive that React never parses; JSX has no directive attributes."
    },
    {
      "id": "B",
      "text": "Use JavaScript control flow: a ternary, logical `&&`, or an early `if`/`return`.",
      "isCorrect": true,
      "explanation": "Correct. JSX is JavaScript, so ordinary expressions and statements decide what gets returned and therefore what renders."
    },
    {
      "id": "C",
      "text": "Call `document.write()` inside the return block to inject elements.",
      "isCorrect": false,
      "explanation": "Tempting as a quick imperative hack, but `document.write()` writes to the raw document stream and corrupts React's managed DOM."
    },
    {
      "id": "D",
      "text": "Wrap the elements in `<ng-container *ngIf='condition'>` tags.",
      "isCorrect": false,
      "explanation": "Tempting if you know Angular, but `*ngIf` is an Angular structural directive with no meaning in React JSX."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Conditional rendering in React is just JavaScript. Inside JSX braces you use a ternary (`cond ? <A /> : <B />`) or short-circuit with `&&` (`cond && <A />`); outside the return you can assign to a variable with `if`/`else` and render that variable. React treats `false`, `null`, and `undefined` as nothing to render.\n\nThe common bug is `count && <List />`: when `count` is `0`, the `&&` returns `0`, and React renders the number `0` instead of nothing. Guard with a real boolean (`count > 0 && ...`) to avoid printing stray zeros.\n\nAt a senior level the choice signals intent: `&&` for render-or-nothing, a ternary for render-this-or-that, and an extracted variable or early return when the branches are large enough that inline logic hurts readability.",
  "interviewLine": "There is no directive; I lean on JavaScript itself, a ternary or `&&` inline and an early return for larger branches, and I guard `&&` against falsy numbers so I never render a stray `0`.",
  "misconception": "Expecting a dedicated conditional directive, when React relies on plain JavaScript expressions and statements to decide what to return.",
  "hints": [
    "Remember that the braces in JSX evaluate ordinary JavaScript.",
    "What does `0 && <X />` evaluate to, and what will React do with that value?",
    "React skips `null` and `false`, but a number is not falsy to the renderer."
  ],
  "source": "44-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the `> 0` guard, so an empty cart renders nothing instead of a literal `0`.",
    "language": "tsx",
    "code": "function Cart({ items }: { items: string[] }) {\n  return (\n    <div>\n      {items.length > 0 ? (\n        <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>\n      ) : (\n        <p>Your cart is empty</p>\n      )}\n    </div>\n  );\n}"
  }
},
{
  "id": "react-what-is-react-fragment",
  "title": "What is React Fragment?",
  "prompt": "What is React Fragment?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<>\n  <OneChild />\n  <AnotherChild />\n</>\n// or\n<React.Fragment>\n  <OneChild />\n  <AnotherChild />\n</React.Fragment>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A chunk of data stored inside the browser's IndexedDB.",
      "isCorrect": false,
      "explanation": "Tempting because \"fragment\" sounds like a stored piece, but a Fragment is a render-time grouping wrapper, not persisted data."
    },
    {
      "id": "B",
      "text": "A micro-frontend bundle loaded over a CDN connection.",
      "isCorrect": false,
      "explanation": "Tempting if you associate \"fragment\" with code splitting, but a Fragment is a component primitive with no bundling or network role."
    },
    {
      "id": "C",
      "text": "A component that groups children without adding an extra wrapper node to the DOM.",
      "isCorrect": true,
      "explanation": "Correct. A Fragment satisfies the single-root rule while rendering only its children, leaving the DOM free of a redundant container."
    },
    {
      "id": "D",
      "text": "A broken piece of a component left behind after an unhandled exception.",
      "isCorrect": false,
      "explanation": "Tempting if you read \"fragment\" as damage, but it is an intentional grouping tool, unrelated to error handling."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A Fragment lets a component return multiple children without wrapping them in an extra DOM node. You write `<>...</>` for the shorthand or `<React.Fragment>...</React.Fragment>` when you need to pass a `key`, as in a mapped list of grouped elements.\n\nThis matters because a component must return a single parent, and reaching for a wrapper `<div>` injects a node that can break CSS layouts that depend on direct parent-child relationships, such as flexbox, grid, or `<table>` structure.\n\nThe nuance: the shorthand `<>` cannot take any props, so when you render a list of fragments you must use the explicit `<React.Fragment key={...}>` form, because a key is the one prop a Fragment accepts.",
  "interviewLine": "A Fragment groups siblings to satisfy the single-root rule without emitting a DOM node, so I keep layouts like tables and flex rows clean, and I use the explicit form when I need a `key`.",
  "misconception": "Treating a wrapper `<div>` as free, when it adds a real DOM node that can break flex, grid, and table layouts a Fragment would leave intact.",
  "hints": [
    "A component may return only one root; ask how to return several siblings anyway.",
    "What does the extra `<div>` do to a `<table>` row or a flex container?",
    "The `<>` shorthand accepts no props, so what form do you need inside a `.map()`?"
  ],
  "source": "44-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the Fragment keeps the `<tr>` as a direct child of the table body, which a wrapper div would break.",
    "language": "tsx",
    "code": "function Row({ cells }: { cells: string[] }) {\n  return (\n    <>\n      {cells.map((c, i) => (\n        <td key={i}>{c}</td>\n      ))}\n    </>\n  );\n}"
  }
},
{
  "id": "react-why-do-we-need-keys-in-lists-when-using-map",
  "title": "Why do we need keys in lists when using map()?",
  "prompt": "Why do we need keys in lists when using map()?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const languages = [\n  {\n    id: 1,\n    lang: \"JavaScript\",\n  },\n  {\n    id: 2,\n    lang: \"TypeScript\",\n  },\n  {\n    id: 3,\n    lang: \"Python\",\n  },\n];\n\nconst App = () => {\n  return (\n    <div>\n      <ul>{languages.map((language) => (\n        <li key={`${language.id}_${language.lang}`}>{language.lang}</li>\n      ))}\n      </ul>\n    </div>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "They generate unique primary keys on the backend database automatically.",
      "isCorrect": false,
      "explanation": "Tempting because \"key\" overlaps with database terms, but React keys live entirely on the client and touch no backend."
    },
    {
      "id": "B",
      "text": "They encrypt each list item's data to defend against cross-site scripting.",
      "isCorrect": false,
      "explanation": "Tempting if you associate keys with security tokens, but keys are plain reconciliation hints with no cryptographic role."
    },
    {
      "id": "C",
      "text": "They tell the browser which stylesheet to apply to each row.",
      "isCorrect": false,
      "explanation": "Tempting because both target rows, but styling comes from `className` and CSS; a key never influences styles."
    },
    {
      "id": "D",
      "text": "They give list elements stable identities so React tracks inserts, deletes, and reorders without recreating DOM nodes.",
      "isCorrect": true,
      "explanation": "Correct. The key is the identity React matches between renders, letting it reuse and move nodes instead of tearing them down."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Keys give each list element a stable identity across renders. During reconciliation React compares the previous element tree with the next one; keys tell it which items are the same, which were added, and which were removed, so it can move or patch existing DOM nodes instead of destroying and rebuilding them.\n\nWithout stable keys React falls back to matching by position. If you use the array index as a key and then insert or reorder items, the index-to-item mapping shifts, and React reuses the wrong DOM node, carrying stale state like input values or focus into the wrong row.\n\nThe senior nuance: keys only need to be unique among siblings, not globally, and they should come from the data's own identity, never from the index when the list can change order or length.",
  "interviewLine": "I treat keys as the identity map React uses during reconciliation; with stable keys from the data it moves nodes on reorder, but with index keys it reuses the wrong node and leaks state into the wrong row.",
  "misconception": "Thinking a key is just a warning silencer, when it is the identity React uses to decide which DOM node and state belong to which item after a change.",
  "hints": [
    "Think about what React does when the same list renders a second time.",
    "If you delete the first item, how does an index-based key map to the remaining rows?",
    "The warning is the symptom; the real cost shows up as stale input values after a reorder."
  ],
  "source": "44-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice the stable `todo.id` key, so toggling and reordering never move a checkbox's state onto the wrong item.",
    "language": "tsx",
    "code": "function TodoList({ todos }: { todos: { id: string; label: string }[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <li key={todo.id}>\n          <input type=\"checkbox\" /> {todo.label}\n        </li>\n      ))}\n    </ul>\n  );\n}"
  }
},
{
  "id": "react-what-is-react",
  "title": "What is React?",
  "prompt": "What is React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A full-stack MVC framework with built-in ORM models and auth controllers.",
      "isCorrect": false,
      "explanation": "Tempting if you compare it to Rails or Django, but React only owns the view layer and ships no ORM, router, or auth."
    },
    {
      "id": "B",
      "text": "An open-source JavaScript library for building UIs with declarative components and reconciliation.",
      "isCorrect": true,
      "explanation": "Correct. React's job is the view: you declare components and it reconciles the element tree against the DOM."
    },
    {
      "id": "C",
      "text": "A native desktop window manager written in C++.",
      "isCorrect": false,
      "explanation": "Tempting if \"renders UI\" suggests an OS layer, but React is a JavaScript library running in a JS engine, not a window manager."
    },
    {
      "id": "D",
      "text": "A proprietary database engine built for Oracle Cloud.",
      "isCorrect": false,
      "explanation": "Tempting as a distractor, but React is open-source and renders interfaces; it stores and queries nothing."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React is an open-source JavaScript library for building user interfaces. You describe the UI declaratively as a tree of components, and React computes the resulting element tree and keeps the DOM in sync with your state.\n\nIt is a library, not a framework: it owns the view layer and reconciliation, and leaves routing, data fetching, and build setup to other tools or to meta-frameworks like Next.js that wrap it. Its model is components plus one-way data flow, with a reconciler that diffs element trees and applies the minimal DOM updates.\n\nThe nuance an interviewer listens for: React 19 renders on the server through Server Components and streaming as well as in the browser, so calling it \"just a client-side view library\" undersells it.",
  "interviewLine": "React is a declarative view library: I describe UI as components and it reconciles the tree to the DOM, and in React 19 that includes server rendering through Server Components, not just the browser.",
  "misconception": "Calling React a full framework, when it is a view-layer library that delegates routing, data, and builds to other tools or meta-frameworks.",
  "hints": [
    "Separate what React itself ships from what you reach for a router or build tool to add.",
    "Does React decide your URLs, your data layer, or only your view?",
    "A framework dictates the whole app shape; which parts does React leave to you?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice React only maps state to view; where the data comes from is left to you.",
    "language": "tsx",
    "code": "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>;\n}"
  }
},
{
  "id": "react-what-are-keys-in-react",
  "title": "What are keys in React?",
  "prompt": "What are keys in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const ids = [1,2,3,4,5];\nconst listElements = ids.map((id)=>{\nreturn(\n<li key={id.toString()}>\n  {id}\n</li>\n)\n})",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Unique string or number attributes on list items that help React identify adds, removes, and reorders during reconciliation.",
      "isCorrect": true,
      "explanation": "Correct. The key is the identity React matches between renders so it can reuse the right DOM node for each item."
    },
    {
      "id": "B",
      "text": "Global CSS selectors generated per list item so each row can receive its own scoped color theme and spacing.",
      "isCorrect": false,
      "explanation": "Tempting because both target rows, but theming comes from `className` and CSS; a key is a reconciliation hint React consumes internally and never styles anything."
    },
    {
      "id": "C",
      "text": "Cryptographic tokens attached to each item so React can decrypt the HTTPS payload that delivered the list to a client component.",
      "isCorrect": false,
      "explanation": "Tempting if \"key\" reads as a cipher key, but React keys do no cryptography, never touch the network, and have nothing to do with transport security."
    },
    {
      "id": "D",
      "text": "Database primary keys that React validates to be globally unique across every table and request in the application.",
      "isCorrect": false,
      "explanation": "Tempting because of the shared term, but React keys only need to be unique among sibling elements in one list, not globally, and React validates nothing against a database."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Keys are string or number attributes you attach to the elements produced by a list render. They are React's identity hint: during reconciliation React uses them to decide which items were added, removed, or reordered between the previous and next render.\n\nWith stable keys React can reuse and move the matching DOM nodes rather than recreating them, which preserves per-item state such as input text, focus, and animation progress. Keys are consumed by React and never appear as DOM attributes or reach the component as a prop.\n\nThe nuance: keys only need to be unique among siblings in the same list, and they should be derived from the data's identity. Using the array index works only when the list is static and never reorders.",
  "interviewLine": "I think of a key as the per-item identity React reconciles against; it lives only inside React, needs to be unique just among siblings, and should come from the data rather than the index.",
  "misconception": "Assuming a key must be globally unique or that it reaches the child as a prop, when it only needs sibling uniqueness and is consumed by React itself.",
  "hints": [
    "Ask who reads the key and whether the child component ever sees it.",
    "How wide does uniqueness really need to reach, the whole app or just the siblings?",
    "An index satisfies uniqueness today but breaks the moment the list reorders."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice `key` never arrives as a prop; reading `props.key` here would be undefined.",
    "language": "tsx",
    "code": "function Item({ label }: { label: string }) {\n  return <li>{label}</li>;\n}\n\nfunction List({ items }: { items: { id: number; label: string }[] }) {\n  return <ul>{items.map((i) => <Item key={i.id} label={i.label} />)}</ul>;\n}"
  }
},
{
  "id": "react-what-are-the-differences-between-controlled-and-uncontr",
  "title": "What are the differences between controlled and uncontrolled components?",
  "prompt": "What are the differences between controlled and uncontrolled components?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "function FormValidation(props) {\nlet [inputValue, setInputValue] = useState(\"\");\nlet updateInput = e => {\n  setInputValue(e.target.value);\n};\nreturn (\n  <div>\n    <form>\n      <input type=\"text\" value={inputValue} onChange={updateInput} />\n    </form>\n  </div>\n);\n}\n\nfunction FormValidation(props) {\nlet inputValue = React.createRef();\nlet handleSubmit = e => {\n  alert(`Input value: ${inputValue.current.value}`);\n  e.preventDefault();\n};\nreturn (\n  <div>\n    <form onSubmit={handleSubmit}>\n      <input type=\"text\" ref={inputValue} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  </div>\n);\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Controlled inputs run only in mobile browsers, while uncontrolled inputs are required for desktop React applications.",
      "isCorrect": false,
      "explanation": "Tempting as a vague platform claim, but the controlled/uncontrolled split is about where the value lives, and both work identically on every device."
    },
    {
      "id": "B",
      "text": "Uncontrolled inputs cannot participate in an HTML `<form>` submission because React never tracks their current value.",
      "isCorrect": false,
      "explanation": "Tempting if you assume React must own the value to submit it, but uncontrolled fields submit normally; the browser reads their DOM value regardless of React."
    },
    {
      "id": "C",
      "text": "Controlled inputs block the user from typing entirely, while uncontrolled inputs are the only ones that accept keyboard input.",
      "isCorrect": false,
      "explanation": "Tempting if you have seen a frozen input, but that happens only when `value` is set without an `onChange`; a correctly wired controlled input accepts typing."
    },
    {
      "id": "D",
      "text": "Controlled inputs hold their value in React state via `value` and `onChange`; uncontrolled inputs keep their value in the DOM, read via `ref`.",
      "isCorrect": true,
      "explanation": "Correct. The distinction is ownership of the value: React state for controlled, the DOM node for uncontrolled."
    }
  ],
  "correctAnswer": "D",
  "explanation": "A controlled input stores its value in React state and drives the field through `value` and `onChange`: React is the single source of truth, and every keystroke flows through a state update. An uncontrolled input keeps its own value inside the DOM, and you read it only when needed through a `ref`.\n\nControlled inputs let you validate, format, or conditionally disable on every keystroke because the value lives in your component. Uncontrolled inputs are lighter and closer to plain HTML, useful for simple forms or when integrating non-React code, but you give up continuous access to the value.\n\nThe nuance: an input flips from uncontrolled to controlled, and React warns, if you pass `value={undefined}` initially and then a defined value. Pair `value` with `onChange`, or use `defaultValue` for the deliberately uncontrolled case.",
  "interviewLine": "The difference is who owns the value: controlled inputs live in React state through `value` and `onChange`, uncontrolled inputs keep it in the DOM and I read it with a `ref` when I need it.",
  "misconception": "Thinking a controlled input freezes typing, when the field only freezes if you set `value` without an `onChange` to write the new value back to state.",
  "hints": [
    "Ask where the current value of the field actually lives.",
    "If you set `value` but forget `onChange`, what can the user no longer do?",
    "A `ref` reads the DOM once; state reflects every keystroke, which do you need?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
  "example": {
    "caption": "Notice `value` and `onChange` together keep React the single source of truth for the field.",
    "language": "tsx",
    "code": "import { useState } from \"react\";\n\nfunction NameField() {\n  const [name, setName] = useState(\"\");\n  return (\n    <input\n      value={name}\n      onChange={(e) => setName(e.target.value.toUpperCase())}\n    />\n  );\n}"
  }
},
{
  "id": "react-what-are-error-boundaries",
  "title": "What are error boundaries?",
  "prompt": "What are error boundaries?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "class CounterComponent extends React.Component{\nconstructor(props){\n  super(props);\n  this.state = {\n    counterValue: 0\n  }\n  this.incrementCounter = this.incrementCounter.bind(this);\n}\nincrementCounter(){\n  this.setState(prevState => counterValue = prevState+1);\n}\nrender(){\n  if(this.state.counter === 2){\n    throw new Error('Crashed');\n  }\n  return(\n    <div>\n      <button onClick={this.incrementCounter}>Increment Value</button>\n      <p>Value of counter: {this.state.counterValue}</p>\n    </div>\n  )\n}\n}\n\nclass ErrorBoundary extends React.Component {\nconstructor(props) {\n  super(props);\n  this.state = { hasError: false };\n}\nstatic getDerivedStateFromError(error) {     \n  return { hasError: true }; \n}\n componentDidCatch(error, errorInfo) {       \n  logErrorToMyService(error, errorInfo); \n}\nrender() {\n  if (this.state.hasError) {     \n    return <h4>Something went wrong</h4>     \n  }\n  return this.props.children;\n}\n}\n\n<ErrorBoundary>\n <CounterComponent/>\n</ErrorBoundary>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A TypeScript feature that validates component props against a JSON schema and reports mismatches at compile time.",
      "isCorrect": false,
      "explanation": "Tempting if \"boundary\" suggests a type guard, but error boundaries are a runtime React mechanism that catches thrown exceptions, unrelated to the type system."
    },
    {
      "id": "B",
      "text": "A special HTML `<form>` attribute that validates field input and shows a fallback message when validation fails.",
      "isCorrect": false,
      "explanation": "Tempting because forms surface errors too, but boundaries catch exceptions thrown during rendering, not invalid form field values."
    },
    {
      "id": "C",
      "text": "Backend middleware that intercepts 404 Not Found responses and renders a fallback page before the request returns.",
      "isCorrect": false,
      "explanation": "Tempting if you think of server error handling, but a boundary runs inside the React render tree, not on the server's request-routing layer."
    },
    {
      "id": "D",
      "text": "Class components implementing `getDerivedStateFromError` and/or `componentDidCatch` to catch render errors in their subtree and show a fallback.",
      "isCorrect": true,
      "explanation": "Correct. Those lifecycle methods let the boundary intercept errors below it and swap in a fallback instead of unmounting the app."
    }
  ],
  "correctAnswer": "D",
  "explanation": "An error boundary is a class component that implements `static getDerivedStateFromError` and/or `componentDidCatch`. It catches JavaScript errors thrown during rendering, in lifecycle methods, and in constructors of the components below it, then renders a fallback UI instead of letting the whole tree unmount.\n\n`getDerivedStateFromError` runs during the render phase to compute the fallback state, so it must be pure; `componentDidCatch` runs in the commit phase and is where you log the error to a service. There is no hook equivalent yet, which is why boundaries remain class components.\n\nThe nuance an interviewer probes: boundaries do not catch errors in event handlers, asynchronous callbacks, server-side rendering, or errors thrown by the boundary itself. Those you handle with ordinary `try`/`catch`.",
  "interviewLine": "An error boundary is a class with `getDerivedStateFromError` and `componentDidCatch` that catches render-phase errors in its subtree; it does not catch event-handler or async errors, so I still wrap those in `try`/`catch`.",
  "misconception": "Expecting an error boundary to catch everything, when it ignores errors in event handlers, async code, and SSR, which still need `try`/`catch`.",
  "hints": [
    "Look at which lifecycle methods the component must implement.",
    "During which phase does each method run, and which one is allowed side effects?",
    "If the error throws inside an `onClick`, will the boundary ever see it?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice `getDerivedStateFromError` is pure and sets fallback state, while logging belongs in `componentDidCatch`.",
    "language": "tsx",
    "code": "class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {\n  state = { failed: false };\n  static getDerivedStateFromError() {\n    return { failed: true };\n  }\n  componentDidCatch(error: Error) {\n    reportToService(error);\n  }\n  render() {\n    return this.state.failed ? <h4>Something went wrong</h4> : this.props.children;\n  }\n}"
  }
},
{
  "id": "react-how-to-create-a-switching-component-for-displaying-diff",
  "title": "How to create a switching component for displaying different pages?",
  "prompt": "How to create a switching component for displaying different pages?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import HomePage from './HomePage'\nimport AboutPage from './AboutPage'\nimport FacilitiesPage from './FacilitiesPage'\nimport ContactPage from './ContactPage'\nimport HelpPage from './HelpPage'\nconst PAGES = {\n home: HomePage,\n about: AboutPage,\n facilitiess: FacilitiesPage,\n contact: ContactPage\n help: HelpPage\n}\nconst Page = (props) => {\n const Handler = PAGES[props.page] || HelpPage\n return <Handler {...props} />\n}\n// The PAGES object keys can be used in the prop types for catching errors during dev-time.\nPage.propTypes = {\n page: PropTypes.oneOf(Object.keys(PAGES)).isRequired\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Use `eval()` to run strings of JSX fetched from external URLs.",
      "isCorrect": false,
      "explanation": "Tempting as a dynamic trick, but `eval` runs no JSX (it is uncompiled), opens an injection hole, and is never needed when components are values."
    },
    {
      "id": "B",
      "text": "Map identifiers to components in an object and render the resolved one as `<Component {...props} />`.",
      "isCorrect": true,
      "explanation": "Correct. Components are values, so a lookup table plus a capitalized variable lets you pick and render one dynamically."
    },
    {
      "id": "C",
      "text": "Nest dozens of `if`/`else` branches that set `document.body.innerHTML` directly.",
      "isCorrect": false,
      "explanation": "Tempting as a brute-force switch, but writing `innerHTML` bypasses React's DOM and the branch pile does not scale."
    },
    {
      "id": "D",
      "text": "Create a separate `index.html` per page and reload the browser on each switch.",
      "isCorrect": false,
      "explanation": "Tempting if you think in multi-page sites, but a full reload throws away the SPA state the component switch is meant to preserve."
    }
  ],
  "correctAnswer": "B",
  "explanation": "The clean pattern is a lookup map from a page identifier to its component, then rendering the resolved component dynamically. You store `const PAGES = { home: Home, about: About }`, read `const Handler = PAGES[props.page]`, and return `<Handler {...props} />`.\n\nThis works because components are just values in JavaScript: you can hold them in an object and assign one to a capitalized variable so JSX treats it as a component type. Adding a page means adding one entry, not another branch, and you can supply a fallback with `PAGES[props.page] || NotFound`.\n\nThe nuance: the variable must start with a capital letter (`Handler`, not `handler`), because JSX renders a lowercase name as a literal DOM tag string rather than resolving it to the component in scope.",
  "interviewLine": "I keep a map of key to component and render the resolved value as `<Handler {...props} />`; because components are just values, adding a page is one map entry, and I assign it to a capitalized variable so JSX treats it as a component.",
  "misconception": "Reaching for a chain of conditionals, when components are first-class values you can store in a map and render by key with no branching.",
  "hints": [
    "Remember a component is an ordinary JavaScript value you can store anywhere.",
    "What has to be true about a variable's name for JSX to render it as a component?",
    "The branching version grows with every page; the map version grows by one line."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice `Active` is capitalized so JSX resolves it to the mapped component rather than a literal tag.",
    "language": "tsx",
    "code": "const TABS = { profile: Profile, billing: Billing } as const;\n\nfunction TabView({ tab }: { tab: keyof typeof TABS }) {\n  const Active = TABS[tab] ?? Profile;\n  return <Active />;\n}"
  }
},
{
  "id": "react-how-to-re-render-the-view-when-the-browser-is-resized",
  "title": "How to re-render the view when the browser is resized?",
  "prompt": "How to re-render the view when the browser is resized?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "class WindowSizeDimensions extends React.Component {\n constructor(props){\n   super(props);\n   this.updateDimension = this.updateDimension.bind(this);\n }\n  \n componentWillMount() {\n   this.updateDimension()\n }\n componentDidMount() {\n   window.addEventListener('resize', this.updateDimension)\n }\n componentWillUnmount() {\n   window.removeEventListener('resize', this.updateDimension)\n }\n updateDimension() {\n   this.setState({width: window.innerWidth, height: window.innerHeight})\n }\n render() {\n   return <span>{this.state.width} x {this.state.height}</span>\n }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Call `window.location.reload()` on every resize tick.",
      "isCorrect": false,
      "explanation": "Tempting if \"re-render\" reads as \"reload,\" but reloading destroys all app state and never updates the view in place."
    },
    {
      "id": "B",
      "text": "Poll `window.innerWidth` in a synchronous `while` loop on the main thread.",
      "isCorrect": false,
      "explanation": "Tempting as a way to \"watch\" the size, but a busy loop blocks the main thread and freezes the whole page."
    },
    {
      "id": "C",
      "text": "Add a `resize` listener in an effect that writes `innerWidth`/`innerHeight` to state, and remove it in cleanup.",
      "isCorrect": true,
      "explanation": "Correct. The state update drives the re-render, and the cleanup prevents leaked listeners and duplicate registration."
    },
    {
      "id": "D",
      "text": "Rely only on CSS `@media` queries to update JavaScript state variables.",
      "isCorrect": false,
      "explanation": "Tempting because media queries react to size, but they style elements and never write to JavaScript state or re-render a component."
    }
  ],
  "correctAnswer": "C",
  "explanation": "You subscribe to the window's `resize` event and store the dimensions in state. In a function component that means an effect that calls `window.addEventListener('resize', handler)` on mount, writes `window.innerWidth`/`innerHeight` to state in the handler, and returns a cleanup that removes the listener. A state update is what triggers the re-render.\n\nThe cleanup is the part candidates forget. Without removing the listener on unmount you leak handlers and update state on an unmounted component, and in Strict Mode's double-invoke you register the listener twice. Returning the removal from the effect fixes both.\n\nThe nuance: resize fires rapidly, so a production version debounces or throttles the handler, and reads layout from a `ResizeObserver` when you care about an element's box rather than the whole window.",
  "interviewLine": "I add a `resize` listener in an effect that pushes `innerWidth` and `innerHeight` into state, and I return the removal as cleanup so the listener does not leak or double-register under Strict Mode.",
  "misconception": "Forgetting that only a state update re-renders, and that the resize listener must be removed in cleanup or it leaks and double-registers under Strict Mode.",
  "hints": [
    "Ask what the one thing is that actually causes React to re-render.",
    "Where does the listener get removed, and why does that matter under Strict Mode?",
    "The event can fire dozens of times a second, so what do you do to the handler in production?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/memo",
  "example": {
    "caption": "Notice the effect returns the listener removal, so the subscription is cleaned up on unmount.",
    "language": "tsx",
    "code": "import { useEffect, useState } from \"react\";\n\nfunction useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  useEffect(() => {\n    const onResize = () => setWidth(window.innerWidth);\n    window.addEventListener(\"resize\", onResize);\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return width;\n}"
  }
},
{
  "id": "react-what-are-the-different-ways-to-style-a-react-component",
  "title": "What are the different ways to style a React component?",
  "prompt": "What are the different ways to style a React component?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 style={{ color: \"Yellow\" }}>This is a heading</h3>\n       <p style={{ fontSize: \"32px\" }}>This is a paragraph</p>\n     </div>\n   );\n }\n}\n\nclass RandomComponent extends React.Component {\n paragraphStyles = {\n   color: \"Red\",\n   fontSize: \"32px\"\n };\n\n headingStyles = {\n   color: \"blue\",\n   fontSize: \"48px\"\n };\n\n render() {\n   return (\n     <div>\n       <h3 style={this.headingStyles}>This is a heading</h3>\n       <p style={this.paragraphStyles}>This is a paragraph</p>\n     </div>\n   );\n }\n}\n\nimport './RandomComponent.css';\n\nclass RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 className=\"heading\">This is a heading</h3>\n       <p className=\"paragraph\">This is a paragraph</p>\n     </div>\n   );\n }\n}\n\n.paragraph{\n color:\"red\";\n border:1px solid black;\n}\n\nimport styles from  './styles.module.css';\n\nclass RandomComponent extends React.Component {\n render() {\n   return (\n     <div>\n       <h3 className=\"heading\">This is a heading</h3>\n       <p className={styles.paragraph} >This is a paragraph</p>\n     </div>\n   );\n }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Components can only be styled with native browser Flash animations.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible-sounding legacy claim, but Flash is dead and irrelevant; React styling uses CSS and JavaScript objects."
    },
    {
      "id": "B",
      "text": "Inline style objects, CSS files, CSS Modules, CSS-in-JS, and utility CSS like Tailwind.",
      "isCorrect": true,
      "explanation": "Correct. React is unopinionated about styling and works with all of these approaches, each with its own trade-offs."
    },
    {
      "id": "C",
      "text": "Styles can only be applied by editing the browser's C++ source.",
      "isCorrect": false,
      "explanation": "Tempting as a distractor, but styling happens in CSS and JavaScript at the application layer, never in the engine's source."
    },
    {
      "id": "D",
      "text": "React forbids any external CSS files in production.",
      "isCorrect": false,
      "explanation": "Tempting if you overgeneralize bundling, but imported CSS and CSS Modules are standard production practice in React apps."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React does not prescribe one styling approach; it accepts several. Inline styles take a JavaScript object on the `style` prop with camelCased properties. Plain CSS or Sass files import global class names used through `className`. CSS Modules scope class names locally by importing a `styles` object. CSS-in-JS libraries like styled-components or Emotion generate styles from JavaScript, and utility-first CSS like Tailwind composes prebuilt classes.\n\nIn practice the choice is a trade-off. Inline styles are dynamic but cannot express pseudo-classes or media queries; CSS Modules give scoping with zero runtime; CSS-in-JS co-locates dynamic styling at a runtime cost; Tailwind trades verbose markup for a tiny, cacheable stylesheet.\n\nThe nuance: the `style` prop takes an object, not a string, and keys are camelCased (`fontSize`, not `font-size`), because it maps to the DOM element's style properties.",
  "interviewLine": "React is unopinionated: I can use inline style objects, CSS Modules for scoped class names, CSS-in-JS, or Tailwind, and I pick by trade-off, remembering the `style` prop takes a camelCased object, not a string.",
  "misconception": "Passing the `style` prop a CSS string, when it takes a JavaScript object with camelCased property names.",
  "hints": [
    "List how many distinct ways you have actually applied styles in a React app.",
    "What type does the `style` prop expect, and how are its keys spelled?",
    "One approach cannot express `:hover` or media queries; which, and why?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the imported `styles` object scopes the class name locally, unlike a global stylesheet.",
    "language": "tsx",
    "code": "import styles from \"./Card.module.css\";\n\nexport function Card({ title }: { title: string }) {\n  return (\n    <div className={styles.card} style={{ paddingTop: 8 }}>\n      <h3>{title}</h3>\n    </div>\n  );\n}"
  }
},
{
  "id": "react-how-to-pass-data-between-react-components",
  "title": "How to pass data between react components?",
  "prompt": "How to pass data between react components?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import ChildComponent from \"./Child\";\n   function ParentComponent(props) {\n    let [counter, setCounter] = useState(0);\n   \n    let increment = () => setCounter(++counter);\n   \n    return (\n      <div>\n        <button onClick={increment}>Increment Counter</button>\n        <ChildComponent counterValue={counter} />\n      </div>\n    );\n   }\n\nfunction ChildComponent(props) {\nreturn (\n  <div>\n    <p>Value of counter: {props.counterValue}</p>\n  </div>\n);\n}\n\nfunction ParentComponent(props) {\nlet [counter, setCounter] = useState(0);\nlet callback = valueFromChild => setCounter(valueFromChild);\nreturn (\n  <div>\n    <p>Value of counter: {counter}</p>\n    <ChildComponent callbackFunc={callback} counterValue={counter} />\n  </div>\n);\n}\n\nfunction ChildComponent(props) {\nlet childCounterValue = props.counterValue;\nreturn (\n  <div>\n    <button onClick={() => props.callbackFunc(++childCounterValue)}>\n      Increment Counter\n    </button>\n  </div>\n);\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Components cannot communicate with each other at all.",
      "isCorrect": false,
      "explanation": "Tempting if you overstate component isolation, but React has well-defined channels: props down, callbacks up, context across."
    },
    {
      "id": "B",
      "text": "Send the data through HTTP POST requests to localhost on every click.",
      "isCorrect": false,
      "explanation": "Tempting if you think all data moves over the network, but in-app state passes directly through props and callbacks, not HTTP."
    },
    {
      "id": "C",
      "text": "Have the parent directly modify the child's private variables.",
      "isCorrect": false,
      "explanation": "Tempting as a shortcut, but it breaks one-way flow and encapsulation; the child owns its state and the parent passes props in."
    },
    {
      "id": "D",
      "text": "Props for parent to child, callbacks for child to parent, and Context or a store for distant components.",
      "isCorrect": true,
      "explanation": "Correct. These are React's channels for data flow, all respecting the one-way principle that state lives in an owner and flows down."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Data flows in a specific set of directions. Parent to child is props. Child to parent is a callback the parent passes down and the child invokes with the new value. Between distant components that do not share a close ancestor, you lift state up to a common parent, use the Context API, or reach for an external store like Zustand or Redux.\n\nThe guiding principle is one-way data flow: state lives in one owner and travels downward as props, while changes travel back up through functions. A child never mutates a parent's state directly; it asks the parent to update by calling the callback.\n\nThe nuance an interviewer probes: Context is for avoiding prop drilling of relatively stable values, not a general state manager; every consumer re-renders when the context value changes, so you split or memoize contexts to keep updates cheap.",
  "interviewLine": "I pass props down and callbacks up, keeping one-way data flow, and when two distant components need the same state I lift it up or put it in Context or a store rather than threading props through every level.",
  "misconception": "Treating component communication as ad hoc, when React enforces one-way flow: props down, callbacks up, and Context or a store for distant pairs.",
  "hints": [
    "Trace which direction data moves for each relationship: down, up, or sideways.",
    "If a child must change the parent's state, what does the parent hand it?",
    "Context solves prop drilling, but what happens to every consumer when its value changes?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the child never owns the count; it calls the callback and the parent updates state.",
    "language": "tsx",
    "code": "function Parent() {\n  const [count, setCount] = useState(0);\n  return <Child value={count} onIncrement={() => setCount((c) => c + 1)} />;\n}\n\nfunction Child({ value, onIncrement }: { value: number; onIncrement: () => void }) {\n  return <button onClick={onIncrement}>Count: {value}</button>;\n}"
  }
},
{
  "id": "react-what-are-higher-order-components",
  "title": "What are Higher Order Components?",
  "prompt": "What are Higher Order Components?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "// \"GlobalDataSource\" is some global data source\nclass ArticlesList extends React.Component {\n constructor(props) {\n   super(props);\n   this.handleChange = this.handleChange.bind(this);\n   this.state = {\n     articles: GlobalDataSource.getArticles(),\n   };\n }\n componentDidMount() {\n   // Listens to the changes added\n   GlobalDataSource.addChangeListener(this.handleChange);\n }\n componentWillUnmount() {\n   // Listens to the changes removed\n   GlobalDataSource.removeChangeListener(this.handleChange);\n }\n handleChange() {\n   // States gets Update whenver data source changes\n   this.setState({\n     articles: GlobalDataSource.getArticles(),\n   });\n }\n render() {\n   return (\n     <div>\n       {this.state.articles.map((article) => (\n         <ArticleData article={article} key={article.id} />\n       ))}\n     </div>\n   );\n }\n}\n\n// \"GlobalDataSource\" is some global data source\nclass UsersList extends React.Component {\n constructor(props) {\n   super(props);\n   this.handleChange = this.handleChange.bind(this);\n   this.state = {\n     users: GlobalDataSource.getUsers(),\n   };\n }\n componentDidMount() {\n   // Listens to the changes added\n   GlobalDataSource.addChangeListener(this.handleChange);\n }\n componentWillUnmount() {\n   // Listens to the changes removed\n   GlobalDataSource.removeChangeListener(this.handleChange);\n }\n handleChange() {\n   // States gets Update whenver data source changes\n   this.setState({\n     users: GlobalDataSource.getUsers(),\n   });\n }\n render() {\n   return (\n     <div>\n       {this.state.users.map((user) => (\n         <UserData user={user} key={user.id} />\n       ))}\n     </div>\n   );\n }\n}\n\n// Higher Order Component which takes a component\n// as input and returns another component\n// \"GlobalDataSource\" is some global data source\nfunction HOC(WrappedComponent, selectData) {\n return class extends React.Component {\n   constructor(props) {\n     super(props);\n     this.handleChange = this.handleChange.bind(this);\n     this.state = {\n       data: selectData(GlobalDataSource, props),\n     };\n   }\n   componentDidMount() {\n     // Listens to the changes added\n     GlobalDataSource.addChangeListener(this.handleChange);\n   }\n   componentWillUnmount() {\n     // Listens to the changes removed\n     GlobalDataSource.removeChangeListener(this.handleChange);\n   }\n   handleChange() {\n     this.setState({\n       data: selectData(GlobalDataSource, this.props),\n     });\n   }\n   render() {\n     // Rendering the wrapped component with the latest data data\n     return <WrappedComponent data={this.state.data} {...this.props} />;\n   }\n };\n}\n\nconst ArticlesListWithHOC = HOC(ArticlesList, (GlobalDataSource) => GlobalDataSource.getArticles());\nconst UsersListWithHOC = HOC(UsersList, (GlobalDataSource) => GlobalDataSource.getUsers());",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Components that raise the CPU clock frequency to render large trees faster.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding distractor, but components are UI descriptions in JavaScript and have no access to hardware clocks."
    },
    {
      "id": "B",
      "text": "Functions that take a component and return a new enhanced one, enabling reusable cross-cutting logic and injected props.",
      "isCorrect": true,
      "explanation": "Correct. A HOC is a component-to-component function that wraps the original to share behavior without duplicating it."
    },
    {
      "id": "C",
      "text": "Components that run only on server hardware and never hydrate on the client.",
      "isCorrect": false,
      "explanation": "Tempting if you confuse HOCs with Server Components, but a HOC is a wrapping pattern unrelated to where rendering happens."
    },
    {
      "id": "D",
      "text": "Components that must always be rendered at the very top of the DOM tree.",
      "isCorrect": false,
      "explanation": "Tempting if \"higher\" reads as \"higher in the tree,\" but the name refers to higher-order functions, not DOM position."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A higher-order component is a function that takes a component and returns a new component wrapping it. It is a composition pattern for reusing cross-cutting logic, subscribing to a data source, injecting props, or adding behavior, without copying that logic into every component.\n\nThe returned component renders the wrapped one with extra props, as in `return <Wrapped data={this.state.data} {...this.props} />`. This keeps the enhancement separate from the component's own concerns, so one `withData` HOC can serve many list components.\n\nThe nuance: HOCs predate hooks and still appear in older code, but a custom hook now expresses most of the same reuse without the wrapper component, the extra tree depth, or the ref-forwarding and static-method hoisting gotchas HOCs carry.",
  "interviewLine": "A HOC is a function from component to component that layers in shared logic; it is the pre-hooks reuse pattern, and today I would usually reach for a custom hook instead to avoid the extra wrapper and ref gotchas.",
  "misconception": "Reading \"higher order\" as a position in the DOM tree, when it borrows the functional-programming sense: a function that takes and returns a component.",
  "hints": [
    "The term comes from functional programming, not from the DOM.",
    "What does the function receive as input and what does it hand back?",
    "Ask what modern feature now covers most of the same reuse without a wrapper component."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the HOC adds the `loading` prop by wrapping, leaving the inner component unaware of the source.",
    "language": "tsx",
    "code": "function withLoading<P>(Wrapped: React.ComponentType<P>) {\n  return function WithLoading(props: P & { isLoading: boolean }) {\n    if (props.isLoading) return <p>Loading...</p>;\n    return <Wrapped {...props} />;\n  };\n}"
  }
},
{
  "id": "react-what-are-the-different-phases-of-the-component-lifecycl",
  "title": "What are the different phases of the component lifecycle?",
  "prompt": "What are the different phases of the component lifecycle?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Connecting to the server, Authenticating the session, and Disconnecting when the view closes.",
      "isCorrect": false,
      "explanation": "Tempting if you picture a network session, but these are not React phases; a component's life is about DOM presence, not connections."
    },
    {
      "id": "B",
      "text": "Mounting (insertion into the DOM), Updating (re-render on prop or state change), and Unmounting (removal from the DOM).",
      "isCorrect": true,
      "explanation": "Correct. These three phases describe a component's entire life, from first render through updates to teardown."
    },
    {
      "id": "C",
      "text": "Parsing the source, Transpiling it to JavaScript, and Garbage Collecting unused objects at runtime.",
      "isCorrect": false,
      "explanation": "Tempting because these are real processes, but they belong to the build and the JS engine, not to a component's runtime lifecycle."
    },
    {
      "id": "D",
      "text": "Compiling the bundle, Minifying the output, and Deploying it to the production host.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible pipeline, but those are build and release steps, not phases a mounted component moves through."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A component passes through three phases. Mounting is its first insertion into the DOM. Updating is every re-render triggered by a change in props or state. Unmounting is its removal from the DOM. Each phase has associated work: setup on mount, reconciliation on update, cleanup on unmount.\n\nIn function components these phases map to effects rather than named class methods: an effect with an empty dependency array runs on mount, effects with dependencies run on the relevant updates, and the function an effect returns runs on unmount and before each re-run.\n\nThe nuance an interviewer probes: in React 19 Strict Mode mounts a component, unmounts it, and mounts it again in development to surface missing cleanup, so treating mount as a one-time event that never repeats hides real bugs.",
  "interviewLine": "A component mounts, updates, then unmounts; in function components I express those with effects and their cleanup, and I write cleanup carefully because Strict Mode double-mounts in development to catch leaks.",
  "misconception": "Treating mounting as a guaranteed one-time event, when Strict Mode in development mounts, unmounts, and remounts to expose effects that forget to clean up.",
  "hints": [
    "Think about a component's life from first appearance to removal.",
    "How does each phase map to a `useEffect` and its returned cleanup function?",
    "In development, is a single mount really guaranteed to run only once?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice the empty dependency array ties the subscription to mount and the return to unmount.",
    "language": "tsx",
    "code": "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id); // runs on unmount\n}, []);"
  }
},
{
  "id": "react-what-is-react-router",
  "title": "What is React Router?",
  "prompt": "What is React Router?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A hardware router device that connects computers to a local area network.",
      "isCorrect": false,
      "explanation": "Tempting because of the shared word \"router,\" but this is a JavaScript library for in-app navigation, not networking hardware."
    },
    {
      "id": "B",
      "text": "A build tool that bundles CSS files into a single production stylesheet.",
      "isCorrect": false,
      "explanation": "Tempting if you lump it with the toolchain, but React Router runs at runtime to map URLs to views; it bundles nothing."
    },
    {
      "id": "C",
      "text": "A server-side database driver that queries PostgreSQL tables over TCP.",
      "isCorrect": false,
      "explanation": "Tempting as a backend-flavored distractor, but React Router lives in the browser and touches the URL, not a database."
    },
    {
      "id": "D",
      "text": "A routing library that maps URLs to views for client-side navigation without full page reloads.",
      "isCorrect": true,
      "explanation": "Correct. It intercepts navigation and renders the matching component, keeping the UI synchronized with the browser URL."
    }
  ],
  "correctAnswer": "D",
  "explanation": "React Router is the standard client-side routing library for React single-page apps. It maps URL paths to components and swaps the rendered view when the URL changes, intercepting navigation so the browser never does a full-page reload.\n\nIt keeps the UI in sync with the address bar in both directions: clicking a link updates the URL and the view through the History API, and the back and forward buttons restore the matching view. This preserves app state across navigations that a hard reload would discard.\n\nThe nuance: in a Next.js App Router project you do not add React Router; the framework provides file-system routing and its own navigation primitives, so mixing the two is a mistake rather than a complement.",
  "interviewLine": "React Router maps URLs to components for client-side navigation without a full reload, keeping the view and the address bar in sync; in a Next.js App Router app I use the framework's routing rather than adding it.",
  "misconception": "Assuming every React app needs React Router, when meta-frameworks like Next.js App Router supply their own file-based routing instead.",
  "hints": [
    "Ask what changes in the app when the user clicks a link, the URL or the whole page.",
    "What does the library do to avoid a full browser reload on navigation?",
    "Does a Next.js App Router project actually need a separate routing library?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice the Next.js App Router replaces this with file-based routes and its own Link, not React Router.",
    "language": "tsx",
    "code": "import { Routes, Route, Link } from \"react-router-dom\";\n\nfunction App() {\n  return (\n    <>\n      <Link to=\"/about\">About</Link>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </>\n  );\n}"
  }
},
{
  "id": "react-different-trees-are-produced-because-of-different-eleme",
  "title": "Different trees are produced because of different elements",
  "prompt": "Different trees are produced because of different elements, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<div />  <section />",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "When root element types differ, React tears down the whole old subtree, unmounts its components, and builds a new DOM tree from scratch.",
      "isCorrect": true,
      "explanation": "Correct. A different type signals a different subtree, so React discards the old nodes and state and remounts fresh."
    },
    {
      "id": "B",
      "text": "React merges the properties of both tags into a single hybrid HTML element.",
      "isCorrect": false,
      "explanation": "Tempting if you expect a smart diff, but React never blends two tag types; a type change means full replacement."
    },
    {
      "id": "C",
      "text": "React throws a fatal compile error when two different tags appear in adjacent renders.",
      "isCorrect": false,
      "explanation": "Tempting if you assume strictness, but changing a type between renders is normal and simply triggers a remount, not an error."
    },
    {
      "id": "D",
      "text": "React keeps the child state and just renames the HTML tag in place.",
      "isCorrect": false,
      "explanation": "Tempting as an optimization you might wish for, but a type change discards state; only same-type elements have attributes patched in place."
    }
  ],
  "correctAnswer": "A",
  "explanation": "During reconciliation React compares the element at each position between the old and new tree. When the element type differs, say a `<div>` becomes a `<section>`, React assumes the subtree is fundamentally different: it unmounts the entire old subtree, discards its DOM nodes and component state, and builds the new subtree from scratch.\n\nThe consequence in real code is lost state. If you conditionally render `<ClassA>` in one branch and `<ClassB>` in another at the same slot, switching branches destroys the first and mounts the second fresh, so any internal state, focus, or scroll position is gone.\n\nThe nuance an interviewer probes: this type-based teardown is also how a changing `key` on the same element type forces a remount, which you can use deliberately to reset a component's state.",
  "interviewLine": "I know a different element type at the same position tells React the subtree is new, so it tears down the old tree and its state and remounts; the same mechanism lets me use a changed `key` to deliberately reset a component.",
  "misconception": "Expecting React to preserve state across a change in element type, when a different type at the same position causes a full unmount and remount.",
  "hints": [
    "Think about what React decides when the type at a slot changes between renders.",
    "What happens to the old subtree's DOM nodes and state when the type no longer matches?",
    "This is also why changing a `key` resets a component, not just swapping tags."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice switching the wrapper type remounts the input, wiping whatever the user had typed.",
    "language": "tsx",
    "code": "function Panel({ compact }: { compact: boolean }) {\n  const field = <input defaultValue=\"draft\" />;\n  // compact ? <section> : <div> — different type remounts the input, losing its value\n  return compact ? <section>{field}</section> : <div>{field}</div>;\n}"
  }
},
{
  "id": "react-elements-of-the-same-type-are-compared-attribute-wise",
  "title": "Elements of the same type are compared attribute-wise",
  "prompt": "Elements of the same type are compared attribute-wise, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "For a matching element type, React keeps the DOM node and updates only the attributes, styles, or props that changed.",
      "isCorrect": true,
      "explanation": "Correct. Same type means React patches the existing node in place, mutating just the differences."
    },
    {
      "id": "B",
      "text": "React reloads the whole browser window whenever a CSS class name changes.",
      "isCorrect": false,
      "explanation": "Tempting if you overstate the cost of updates, but a class change is a one-attribute patch on the existing node, not a reload."
    },
    {
      "id": "C",
      "text": "Attributes cannot be updated after an element has mounted.",
      "isCorrect": false,
      "explanation": "Tempting if you think elements are frozen, but updating attributes on a stable node is exactly what same-type reconciliation does."
    },
    {
      "id": "D",
      "text": "React always destroys and recreates the DOM node whenever any attribute changes.",
      "isCorrect": false,
      "explanation": "Tempting if you confuse it with a type change, but destroy-and-recreate happens on a type mismatch, not on an attribute change."
    }
  ],
  "correctAnswer": "A",
  "explanation": "When React finds the same element type at the same position across renders, it keeps the existing DOM node and the component instance. It then compares props and attributes and mutates only what changed, updating a `className` here or a `value` there, rather than recreating the node.\n\nThis is the core efficiency of reconciliation: most updates are small attribute patches on stable nodes, so DOM mutation stays minimal and focus, scroll, and uncontrolled input values survive the update.\n\nThe nuance: same-type patching preserves component state too, which is usually what you want, but it is why two different items that happen to render the same type can accidentally share state when they occupy the same keyed slot, the reason stable keys matter in lists.",
  "interviewLine": "I explain that same type at the same position means React reuses the node and patches only the changed attributes, which is why focus and scroll survive updates and why I keep keys stable so items do not share a slot.",
  "misconception": "Believing any change recreates the DOM node, when a matching type lets React keep the node and patch only the differing attributes.",
  "hints": [
    "Ask what React does when the type matches but the props differ.",
    "Does updating one attribute cost a new node or just a mutation of the old one?",
    "Contrast this with what happens when the element type itself changes."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice only the `className` is patched on the same `<button>` node; its focus and position are untouched.",
    "language": "tsx",
    "code": "function Toggle({ active }: { active: boolean }) {\n  // Same <button> type across renders: React updates only className, keeping the node.\n  return <button className={active ? \"on\" : \"off\"}>Toggle</button>;\n}"
  }
},
{
  "id": "react-what-is-forwardref-and-when-do-you-need-it",
  "title": "What is forwardRef, and when do you need it?",
  "prompt": "What is forwardRef, and when do you need it?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": ".focus()\n\n.scrollIntoView()\n\nconst Input = React.forwardRef((props, ref) => {\n  return <input ref={ref} {...props} />;\n});\n\nconst inputRef = useRef();\n<Input ref={inputRef} />\n\ninputRef.current.focus();",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A method that forwards HTTP network requests to a proxy server.",
      "isCorrect": false,
      "explanation": "Tempting because \"forward\" suggests networking, but `forwardRef` passes a React `ref` through a component, with no network involvement."
    },
    {
      "id": "B",
      "text": "A utility that lets a component receive a `ref` from its parent and pass it to an inner DOM node or child.",
      "isCorrect": true,
      "explanation": "Correct. It threads the parent's `ref` down to the element the component wants to expose, enabling focus or measurement."
    },
    {
      "id": "C",
      "text": "A compiler flag that forwards TypeScript errors to the browser console.",
      "isCorrect": false,
      "explanation": "Tempting as a tooling-sounding option, but `forwardRef` is a runtime React API, not a compiler flag."
    },
    {
      "id": "D",
      "text": "A tool that navigates the user forward to the next page in browser history.",
      "isCorrect": false,
      "explanation": "Tempting if \"forward\" evokes history navigation, but this concerns refs, not the History API."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`forwardRef` lets a component accept a `ref` from its parent and pass it through to an inner DOM node or child. Normally `ref` is not part of props, so a parent cannot reach a custom component's underlying element; `forwardRef` wires that `ref` down to where it is attached, such as an `<input>`.\n\nYou need it when the parent must call imperative DOM methods on the child, focusing a field with `inputRef.current.focus()`, scrolling an element into view, or measuring its size, while the child remains a reusable component.\n\nThe nuance: in React 19 a function component can receive `ref` as a regular prop, so `forwardRef` is no longer required for new code, though you will still read it across the ecosystem and in libraries targeting older versions.",
  "interviewLine": "I use `forwardRef` to pass a parent's `ref` through to an inner node so the parent can focus or measure it; in React 19 a function component can just take `ref` as a prop, so my new code often does not need it.",
  "misconception": "Thinking a `ref` on a custom component reaches its DOM node automatically, when a function component must forward it explicitly (or, in React 19, accept it as a prop).",
  "hints": [
    "Ask whether `ref` arrives in a child component the way regular props do.",
    "When would a parent legitimately need to reach into a child's DOM node?",
    "Check what changed about `ref` handling in React 19 before assuming you must wrap."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useRef",
  "example": {
    "caption": "Notice React 19 lets the component take `ref` as an ordinary prop, no `forwardRef` wrapper needed.",
    "language": "tsx",
    "code": "function TextField({ ref, ...props }: React.ComponentProps<\"input\"> & { ref?: React.Ref<HTMLInputElement> }) {\n  return <input ref={ref} {...props} />;\n}\n\n// parent:\n// const inputRef = useRef<HTMLInputElement>(null);\n// <TextField ref={inputRef} />; inputRef.current?.focus();"
  }
},
{
  "id": "react-minimize-re-render-scope---state-colocation",
  "title": "Minimize re-render scope - State Colocation",
  "prompt": "Minimize re-render scope - State Colocation, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Colocation stores all state on a backend database and synchronizes it by polling the server.",
      "isCorrect": false,
      "explanation": "Tempting if \"colocation\" sounds like data-center placement, but here it means where state lives in the component tree, not on a server."
    },
    {
      "id": "B",
      "text": "Keep state in the lowest component that uses it, so parents and sibling subtrees do not re-render on local changes.",
      "isCorrect": true,
      "explanation": "Correct. Narrowing where state lives narrows what re-renders, since React re-renders a stateful component and its descendants."
    },
    {
      "id": "C",
      "text": "Move all state into the root `<App>` so every component re-renders together on each keystroke.",
      "isCorrect": false,
      "explanation": "Tempting as a simple mental model, but centralizing state is the opposite of colocation and causes the broad re-renders it prevents."
    },
    {
      "id": "D",
      "text": "Store state only in the browser URL hash, never in React components.",
      "isCorrect": false,
      "explanation": "Tempting because the URL does hold some state, but colocation is about placing component state near its consumer, not avoiding components."
    }
  ],
  "correctAnswer": "B",
  "explanation": "State colocation means declaring state in the lowest component that actually uses it, instead of hoisting everything to a top-level component. React re-renders a component and its descendants when its state changes, so where state lives determines how much of the tree re-renders.\n\nIf a search input's state sits in `<App>`, every keystroke re-renders the whole app. Move that state into the small `<SearchBox>` that reads it, and a keystroke re-renders only that box and its children, leaving siblings untouched.\n\nThe nuance: colocation is the first and cheapest performance tool, reached for before `memo` or `useMemo`. You only lift state up when two components genuinely need to share it, and even then you lift it to the nearest common parent, not the root.",
  "interviewLine": "I colocate state in the lowest component that uses it so a change re-renders the smallest subtree; I only lift it to a common parent when two components truly share it, and I reach for this before `memo`.",
  "misconception": "Defaulting to top-level state for convenience, when lifting state higher than necessary forces large subtrees to re-render on every local change.",
  "hints": [
    "Recall which part of the tree re-renders when a component's state changes.",
    "If a search box's state lives in `<App>`, what re-renders on every keystroke?",
    "Before you reach for `memo`, ask whether the state is simply sitting too high."
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/memo",
  "example": {
    "caption": "Notice the query lives inside SearchBox, so typing re-renders only it, not the whole page.",
    "language": "tsx",
    "code": "function Page() {\n  return (\n    <>\n      <ExpensiveSidebar />\n      <SearchBox />\n    </>\n  );\n}\n\nfunction SearchBox() {\n  const [query, setQuery] = useState(\"\");\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}"
  }
},
{
  "id": "react-what-is-reactfragment-and-why-is-it-useful",
  "title": "What is React.Fragment and why is it useful?",
  "prompt": "What is React.Fragment and why is it useful?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "return (\n  <>\n    <h1>Hello</h1>\n    <p>World</p>\n  </>\n);\n\n<h1>Hello</h1>\n<p>World</p>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A tool that automatically fragments large database tables across multiple drives.",
      "isCorrect": false,
      "explanation": "Tempting because \"fragment\" suggests partitioning, but `React.Fragment` is a render-time grouping wrapper, not a storage mechanism."
    },
    {
      "id": "B",
      "text": "A special script tag that injects Google Analytics tracking pixels.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible-sounding utility, but a Fragment groups elements in the render tree and has nothing to do with analytics."
    },
    {
      "id": "C",
      "text": "A component (`<React.Fragment>` or `<>...</>`) that groups siblings without adding an extra wrapper node to the DOM.",
      "isCorrect": true,
      "explanation": "Correct. It satisfies the single-root rule while rendering only its children, keeping the DOM free of redundant containers."
    },
    {
      "id": "D",
      "text": "A component that renders broken error messages when the app crashes.",
      "isCorrect": false,
      "explanation": "Tempting if you confuse it with an error boundary, but a Fragment is a grouping tool unrelated to error handling."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`React.Fragment`, written longhand or as the `<>...</>` shorthand, groups several sibling elements so a component can return them under a single root without wrapping them in a real DOM node.\n\nIt is useful because an extra `<div>` is not free: it adds a node that can break layouts relying on direct parent-child relationships, such as flexbox, CSS grid, and the strict child structure of `<table>`, `<ul>`, and `<dl>`. A Fragment satisfies React's single-root rule while leaving the DOM output clean.\n\nThe nuance: the `<>` shorthand accepts no props, so when you render a list of grouped siblings you must switch to `<React.Fragment key={id}>`, since `key` is the one prop a Fragment takes.",
  "interviewLine": "`React.Fragment` groups siblings under one root without emitting a DOM node, which keeps table rows and flex layouts clean; I switch to the explicit form when I need a `key` in a list.",
  "misconception": "Assuming a wrapper `<div>` is harmless, when it inserts a DOM node that can break grid, flex, and table layouts a Fragment leaves intact.",
  "hints": [
    "Recall the rule about how many roots a component may return.",
    "What does an added `<div>` do inside a `<table>` or a flex row?",
    "The `<>` form takes no props, so what do you use when the group needs a key?"
  ],
  "source": "interviewbit-70",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the Fragment keeps both `<dt>` and `<dd>` as direct children of the definition list.",
    "language": "tsx",
    "code": "function Term({ term, def }: { term: string; def: string }) {\n  return (\n    <>\n      <dt>{term}</dt>\n      <dd>{def}</dd>\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-is-jsx-and-how-does-it-work",
  "title": "What is JSX and how does it work?",
  "prompt": "What is JSX and how does it work?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A query language for reading data from IndexedDB inside client components.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored distractor, but JSX describes element trees for the UI, not database queries."
    },
    {
      "id": "B",
      "text": "A binary format that compresses HTML before it is sent over the network.",
      "isCorrect": false,
      "explanation": "Tempting if you associate build steps with compression, but JSX is source syntax compiled to JavaScript, not a wire format."
    },
    {
      "id": "C",
      "text": "A JavaScript syntax extension resembling HTML that compilers transpile into `React.createElement` or `_jsx` calls.",
      "isCorrect": true,
      "explanation": "Correct. The build step rewrites each tag into a function call that returns a React element object."
    },
    {
      "id": "D",
      "text": "A separate language that browser rendering engines execute directly without compilation.",
      "isCorrect": false,
      "explanation": "Tempting because JSX reads like markup, but no engine runs it; a compiler must turn it into JavaScript first."
    }
  ],
  "correctAnswer": "C",
  "explanation": "JSX is a syntax extension for JavaScript that looks like HTML. It is not understood by any browser; a compiler such as Babel or SWC transpiles each tag into a function call, either the classic `React.createElement(type, props, ...children)` or the automatic `_jsx(type, props)` imported from `react/jsx-runtime`.\n\nBecause it compiles to ordinary function calls, JSX is just JavaScript with a friendlier shape. Each call returns a plain React element object, and expressions inside braces are evaluated at runtime like any other code.\n\nThe nuance: attribute names follow the DOM property conventions (`className`, `htmlFor`), and a capitalized tag resolves to a component in scope while a lowercase tag compiles to a string type for a host element.",
  "interviewLine": "I point out that JSX compiles to `React.createElement` or the `_jsx` runtime call, so it is plain JavaScript that returns element objects; the browser only ever runs the compiled output.",
  "misconception": "Believing the browser interprets JSX directly, when a build step must first compile every tag into `createElement` or `_jsx` calls.",
  "hints": [
    "Ask what sits between your `.tsx` source and the code the browser runs.",
    "What JavaScript value does a single tag become after compilation?",
    "If browsers ran JSX directly, why would SWC or Babel be in the pipeline?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the braces hold a runtime expression; the compiler leaves it as a normal function argument.",
    "language": "tsx",
    "code": "const name = \"Ada\";\nconst el = <p className=\"greeting\">Hello {name}</p>;\n// compiles to roughly:\n// _jsx(\"p\", { className: \"greeting\", children: [\"Hello \", name] });"
  }
},
{
  "id": "react-explain-the-concept-of-the-virtual-dom-in-react",
  "title": "Explain the concept of the Virtual DOM in React.",
  "prompt": "Explain the concept of the Virtual DOM in React., explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A Chrome API that replaces the HTML DOM with a WebGL canvas for rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding claim, but the virtual DOM is a JavaScript data structure React maintains, not a browser rendering API."
    },
    {
      "id": "B",
      "text": "A lightweight in-memory representation of the real DOM that React diffs to compute minimal updates.",
      "isCorrect": true,
      "explanation": "Correct. React compares the new virtual tree with the old one and applies only the differences to the real DOM."
    },
    {
      "id": "C",
      "text": "An isolated Shadow DOM container used only for CSS style encapsulation.",
      "isCorrect": false,
      "explanation": "Tempting because the names rhyme, but the Shadow DOM is a browser scoping feature; the virtual DOM is React's internal diffing model."
    },
    {
      "id": "D",
      "text": "A permanent DOM snapshot stored in browser cookies across sessions.",
      "isCorrect": false,
      "explanation": "Tempting if you think of persistence, but the virtual DOM lives in memory for the current render and is never stored in cookies."
    }
  ],
  "correctAnswer": "B",
  "explanation": "The virtual DOM is a lightweight in-memory tree of plain JavaScript objects that mirror the elements you render. When state changes, React builds a new virtual tree, diffs it against the previous one, and computes the minimal set of real DOM mutations needed to match.\n\nThis matters because direct DOM manipulation is expensive and error-prone. By batching and minimizing updates, React lets you write declarative code, describing what the UI should look like, while it handles the imperative patching efficiently under the hood.\n\nThe nuance an interviewer probes: the virtual DOM is a technique, not magic. It is not always faster than a hand-tuned imperative update, and modern React also leans on keys, memoization, and the Fiber reconciler's ability to interrupt and prioritize work rather than diffing alone.",
  "interviewLine": "I describe the virtual DOM as an in-memory element tree React diffs against the previous one to apply the minimal real-DOM mutations, which lets me write declarative UI while React handles efficient patching.",
  "misconception": "Confusing the virtual DOM with the Shadow DOM, or assuming diffing is automatically faster than every imperative update.",
  "hints": [
    "Ask where this tree lives and what it is made of.",
    "What does React do with the old tree when state produces a new one?",
    "Do not confuse it with the browser's Shadow DOM, which solves a different problem."
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/preserving-and-resetting-state",
  "example": {
    "caption": "Notice a React element is just a plain object; the virtual DOM is a tree of these.",
    "language": "typescript",
    "code": "const vnode = {\n  type: \"li\",\n  props: { className: \"item\", children: \"Hello\" },\n};\n// React builds a tree of objects like this, diffs it against the last one,\n// then mutates only the real DOM nodes that actually changed."
  }
},
{
  "id": "react-what-is-the-difference-between-react-node-react-element",
  "title": "What is the difference Between React Node, React Element, and React Component?",
  "prompt": "What is the difference Between React Node, React Element, and React Component?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "There is no difference; the three terms are exact synonyms.",
      "isCorrect": false,
      "explanation": "Tempting if the words blur together, but they name distinct things: a describing object, a producing function, and the renderable superset."
    },
    {
      "id": "B",
      "text": "React Elements are mutable class instances; React Components are immutable JSON files.",
      "isCorrect": false,
      "explanation": "Tempting because it uses real words, but it inverts the facts: elements are immutable objects and components are functions or classes, not JSON files."
    },
    {
      "id": "C",
      "text": "An element is an immutable `{ type, props }` object; a component is a function or class returning elements; a node is anything renderable.",
      "isCorrect": true,
      "explanation": "Correct. Element, component, and node describe the description, the producer, and the renderable superset respectively."
    },
    {
      "id": "D",
      "text": "A node is a Node.js process; an element is an HTML tag; a component is a CSS stylesheet.",
      "isCorrect": false,
      "explanation": "Tempting as a mix of familiar terms, but it conflates unrelated concepts; none of these map to React's definitions."
    }
  ],
  "correctAnswer": "C",
  "explanation": "These three terms sit at different levels. A React element is an immutable plain object of the shape `{ type, props }` that describes what you want on screen. A React component is the function or class that returns elements. A React node is the broadest term: anything React can render, which includes elements, strings, numbers, fragments, arrays, and `null`.\n\nThe practical payoff is typing. A prop that accepts arbitrary renderable content should be typed `React.ReactNode`, while a prop that must be a single element is `React.ReactElement`, and a prop that is a component to instantiate is `React.ComponentType`.\n\nThe nuance: an element is not the rendered DOM and not the component; calling a component produces elements, and React turns those elements into DOM. Mixing up element and component is the usual source of \"object is not a function\" style errors.",
  "interviewLine": "I separate the three: a component is the function; calling it yields immutable `{ type, props }` elements; and a node is the renderable superset, which is why I type a flexible children prop `ReactNode` and a single-element prop `ReactElement`.",
  "misconception": "Treating element, component, and node as interchangeable, when an element is a description object, a component produces elements, and a node is anything renderable.",
  "hints": [
    "Line the three up by level: which one produces, which one describes, which one is broadest?",
    "What type would you give a prop that accepts text, numbers, or elements alike?",
    "Calling a component gives you an element, not DOM; keep those two apart."
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice `ReactNode` admits text and numbers, while `ReactElement` would reject the bare string.",
    "language": "tsx",
    "code": "function Badge({ children }: { children: React.ReactNode }) {\n  return <span className=\"badge\">{children}</span>;\n}\n\n<Badge>42</Badge>;        // number node\n<Badge>Online</Badge>;    // string node\n<Badge><b>New</b></Badge>; // element node"
  }
},
{
  "id": "react-what-are-react-fragments-used-for",
  "title": "What are React Fragments used for?",
  "prompt": "What are React Fragments used for?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "return (  <>    <ChildComponent1 />    <ChildComponent2 />  </>);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "To fragment relational database tables across multiple SQL clusters.",
      "isCorrect": false,
      "explanation": "Tempting because \"fragment\" suggests sharding, but React Fragments group render-tree siblings, not database rows."
    },
    {
      "id": "B",
      "text": "To group children without adding wrapper nodes to the DOM, preserving layout and semantic markup.",
      "isCorrect": true,
      "explanation": "Correct. Fragments meet the single-root rule while leaving the DOM free of redundant containers."
    },
    {
      "id": "C",
      "text": "To split large JavaScript files into asynchronous download chunks.",
      "isCorrect": false,
      "explanation": "Tempting if you think of code splitting, but that is `lazy`/`import()`; a Fragment is a render-tree grouping tool."
    },
    {
      "id": "D",
      "text": "To catch and isolate rendering errors like an error boundary.",
      "isCorrect": false,
      "explanation": "Tempting if you conflate the two, but a Fragment groups elements and has no error-handling behavior."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React Fragments group a set of sibling elements under a single parent in the component tree without rendering any wrapper node in the real DOM. You write them as `<>...</>` or `<React.Fragment>...</React.Fragment>`.\n\nTheir purpose is to satisfy React's rule that a component return one root while keeping the DOM output clean. An extra `<div>` would add a node that can break semantic markup and layout systems, flexbox, grid, and the required child structure of tables and lists, that depend on direct parent-child relationships.\n\nThe nuance: when you render many grouped siblings in a loop, the shorthand will not do because it accepts no props; you need `<React.Fragment key={id}>` so React can still reconcile the list by identity.",
  "interviewLine": "Fragments group siblings under one root without adding a DOM node, which keeps semantic and flex or grid layouts intact; in a loop I use the keyed `React.Fragment` form.",
  "misconception": "Thinking any grouping needs a visible container, when a Fragment groups siblings while emitting zero DOM nodes.",
  "hints": [
    "Recall why a component sometimes cannot return two top-level elements directly.",
    "What is the cost of wrapping those elements in a `<div>`?",
    "What form of Fragment do you need when grouping items inside a `.map()`?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the keyed Fragment groups two cells per row without an illegal wrapper inside the table.",
    "language": "tsx",
    "code": "function Rows({ pairs }: { pairs: [string, string][] }) {\n  return (\n    <tbody>\n      {pairs.map(([k, v]) => (\n        <React.Fragment key={k}>\n          <tr><th>{k}</th><td>{v}</td></tr>\n        </React.Fragment>\n      ))}\n    </tbody>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-createelement-and-clonee",
  "title": "What is the difference between createElement and cloneElement?",
  "prompt": "What is the difference between createElement and cloneElement?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "React.createElement('div', { className: 'container' }, 'Hello World');\n\nconst element = <button className=\"btn\">Click Me</button>;const clonedElement = React.cloneElement(element, { className: 'btn-primary' });",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "`createElement` builds a new element from type, props, and children; `cloneElement` copies an existing element, merging new props over the originals.",
      "isCorrect": true,
      "explanation": "Correct. One constructs fresh; the other derives a copy with props shallow-merged onto an existing element."
    },
    {
      "id": "B",
      "text": "`createElement` works only in the browser, while `cloneElement` is restricted to server-side rendering code paths.",
      "isCorrect": false,
      "explanation": "Tempting as a tidy split, but both run anywhere React runs; the difference is construction versus cloning, not environment."
    },
    {
      "id": "C",
      "text": "`cloneElement` makes a deep copy of the operating system clipboard contents before a render pass begins.",
      "isCorrect": false,
      "explanation": "Tempting because \"clone\" suggests copying, but it clones a React element's props, with no connection to the OS clipboard."
    },
    {
      "id": "D",
      "text": "`createElement` was permanently removed in React 16 and replaced entirely by the JSX runtime.",
      "isCorrect": false,
      "explanation": "Tempting if you half-remember a deprecation, but `createElement` is still the core API that classic JSX compiles to today."
    }
  ],
  "correctAnswer": "A",
  "explanation": "`React.createElement(type, props, ...children)` builds a brand-new element from scratch; it is what JSX compiles to. `React.cloneElement(element, props, ...children)` takes an existing element and returns a copy with its props shallow-merged with the new ones, so you can add or override props on an element you received.\n\n`cloneElement` is useful when a component wraps `props.children` and needs to inject props into them, a layout that adds a `className`, or a form that wires `onChange` into each field, without the children knowing in advance.\n\nThe nuance: `cloneElement` merges props shallowly, so a new `style` object replaces the old one rather than deep-merging, and it is a somewhat advanced API; the render-prop or context patterns are often clearer for passing data into children.",
  "interviewLine": "`createElement` constructs a fresh element and is what JSX compiles to; `cloneElement` copies an existing one with new props shallow-merged, which I use to inject props into `children` I did not author.",
  "misconception": "Expecting `cloneElement` to deep-merge props, when it merges shallowly, so a new object prop like `style` fully replaces the original.",
  "hints": [
    "Ask whether each function starts from nothing or from an element you already have.",
    "When you receive `props.children`, how would you add a prop to them?",
    "The merge is shallow, so what happens to a `style` object you pass in?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice cloneElement injects an onClick into each child without the children declaring it.",
    "language": "tsx",
    "code": "function RadioGroup({ children, onSelect }: { children: React.ReactElement[]; onSelect: (v: string) => void }) {\n  return (\n    <div role=\"radiogroup\">\n      {children.map((child) =>\n        React.cloneElement(child, { onClick: () => onSelect(child.props.value) }),\n      )}\n    </div>\n  );\n}"
  }
},
{
  "id": "react-what-does-re-rendering-mean-in-react",
  "title": "What does re-rendering mean in React?",
  "prompt": "What does re-rendering mean in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A full reload of the entire browser page, discarding the DOM, memory, and the network cache.",
      "isCorrect": false,
      "explanation": "Tempting if \"render again\" sounds like a reload, but a re-render runs component functions in place and never reloads the page."
    },
    {
      "id": "B",
      "text": "React calling a component again on a state or prop change, producing a new virtual tree it reconciles against the DOM.",
      "isCorrect": true,
      "explanation": "Correct. A re-render recomputes the element tree and patches only the differences into the real DOM."
    },
    {
      "id": "C",
      "text": "Clearing all user authentication cookies and session storage from the browser between views.",
      "isCorrect": false,
      "explanation": "Tempting as an unrelated \"reset\" idea, but re-rendering only recomputes UI; it never touches cookies or auth."
    },
    {
      "id": "D",
      "text": "Compiling TypeScript source files into JavaScript on disk before the application starts.",
      "isCorrect": false,
      "explanation": "Tempting if you blur build and runtime, but compilation happens before the app runs; re-rendering is a runtime UI recomputation."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Re-rendering is React calling a component's function again to produce a fresh description of its UI. It is triggered when the component's state changes, when its parent re-renders, or when a context it consumes updates. React builds a new virtual tree, diffs it against the previous one, and applies only the real DOM changes that differ.\n\nThe key point is that a re-render is not a DOM rebuild. Most re-renders compute a new element tree in JavaScript and result in few or zero DOM mutations, because reconciliation patches only what actually changed.\n\nThe nuance an interviewer probes: a parent re-render re-renders all children by default even if their props are identical, which is why `React.memo`, stable callbacks, and state colocation exist to keep that cascade in check.",
  "interviewLine": "I define re-rendering as React invoking the component again to produce a new element tree it reconciles against the DOM; it is cheap by itself, and the cost is the cascade into children, which I control with memoization and colocation.",
  "misconception": "Equating a re-render with a DOM rebuild, when it recomputes the element tree in JavaScript and usually produces only small, targeted DOM patches.",
  "hints": [
    "Ask what React actually does when state changes, call code or touch the DOM first?",
    "Does a re-render guarantee any DOM nodes change at all?",
    "When a parent re-renders, what happens to its children by default?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/memo",
  "example": {
    "caption": "Notice clicking re-renders Parent and therefore Child, even though Child's props never change.",
    "language": "tsx",
    "code": "function Parent() {\n  const [n, setN] = useState(0);\n  return (\n    <>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Child label=\"static\" />\n    </>\n  );\n}\n\nfunction Child({ label }: { label: string }) {\n  return <span>{label}</span>; // re-renders with Parent unless wrapped in React.memo\n}"
  }
},
{
  "id": "react-what-is-forwardref-in-react-used-for",
  "title": "What is forwardRef() in React used for?",
  "prompt": "What is forwardRef() in React used for?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "// Pre-React 19import React, { forwardRef } from 'react';\nconst MyComponent = forwardRef((props, ref) => <input ref={ref} {...props} />);\n\nfunction MyComponent({ ref...props }) {  return <input ref={ref} {...props} />;}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A tool that forwards HTTP network packets to a proxy server before they reach the origin.",
      "isCorrect": false,
      "explanation": "Tempting because \"forward\" suggests networking, but `forwardRef` passes a React `ref` through a component, not packets."
    },
    {
      "id": "B",
      "text": "A compiler directive that enables multi-threaded WebAssembly compilation of the component bundle.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level-sounding option, but `forwardRef` is a runtime React API, unrelated to WebAssembly or compilation."
    },
    {
      "id": "C",
      "text": "Pre-React 19 it passed a `ref` through a component to a DOM node; in React 19 `ref` is a plain prop, deprecating `forwardRef`.",
      "isCorrect": true,
      "explanation": "Correct. It threaded the parent's `ref` to an inner element, a role React 19 now fills with `ref` as a normal prop."
    },
    {
      "id": "D",
      "text": "A method that redirects the browser history forward to the next page the user visited.",
      "isCorrect": false,
      "explanation": "Tempting if \"forward\" evokes history navigation, but this is about refs, not the History API."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`forwardRef()` wraps a component so it can receive a `ref` from its parent and attach it to an inner DOM node. Before React 19, `ref` was not passed through props, so a parent could not reach a custom component's underlying element without this wrapper.\n\nThe typical use is imperative access to a DOM node the component owns: focusing an input, scrolling an element into view, or measuring its size, while keeping the component reusable and encapsulated.\n\nThe nuance: React 19 makes `ref` an ordinary prop on function components, which deprecates `forwardRef` for new code. The snippet shows both shapes; prefer the plain-prop form going forward, but recognize the wrapper in existing codebases and libraries.",
  "interviewLine": "`forwardRef` let a parent's `ref` reach a child's DOM node before React 19; now `ref` is just a prop on function components, so I use the wrapper only when reading older code or libraries.",
  "misconception": "Assuming `forwardRef` is still mandatory, when React 19 lets a function component accept `ref` as a regular prop.",
  "hints": [
    "Ask whether `ref` historically arrived with the rest of a component's props.",
    "What does a parent want to do with the child's node, focus it, measure it?",
    "Check what React 19 changed about `ref` before assuming the wrapper is required."
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useRef",
  "example": {
    "caption": "Notice the React 19 form takes `ref` as a prop; the old `forwardRef` wrapper is no longer needed.",
    "language": "tsx",
    "code": "function SearchInput({ ref }: { ref?: React.Ref<HTMLInputElement> }) {\n  return <input ref={ref} type=\"search\" />;\n}\n\n// const box = useRef<HTMLInputElement>(null);\n// <SearchInput ref={box} />; box.current?.focus();"
  }
},
{
  "id": "react-explain-what-react-hydration-is",
  "title": "Explain what React hydration is?",
  "prompt": "Explain what React hydration is?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Downloading images and fonts in the background after the page has finished loading its markup.",
      "isCorrect": false,
      "explanation": "Tempting because it also happens post-load, but asset prefetching is unrelated; hydration attaches React to existing HTML."
    },
    {
      "id": "B",
      "text": "Compressing HTML with Gzip or Brotli on the server before it is sent to the browser over HTTP.",
      "isCorrect": false,
      "explanation": "Tempting as a server-side step, but compression is a transport concern; hydration is a client-side React process."
    },
    {
      "id": "C",
      "text": "Converting client-side React components into static JSON database schemas at build time.",
      "isCorrect": false,
      "explanation": "Tempting as a transformation-sounding option, but hydration produces interactivity, not database schemas."
    },
    {
      "id": "D",
      "text": "The client process where React adopts server-rendered HTML, rebuilds state, and attaches event listeners to make it interactive.",
      "isCorrect": true,
      "explanation": "Correct. React reuses the existing DOM, reconstructs the tree, and wires up handlers so the static markup becomes live."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Hydration is the client-side step that turns server-rendered HTML into a live React app. The server sends fully formed markup for fast first paint; then React runs on the client, walks that existing DOM, reconstructs the component tree and state, and attaches event listeners instead of recreating the nodes.\n\nThis gives you the best of both worlds: visible content immediately, then interactivity once the JavaScript loads. React reuses the server DOM rather than rebuilding it, which is why hydration is cheaper than a fresh client render.\n\nThe nuance an interviewer probes: the server and client must produce the same initial markup, or React reports a hydration mismatch. Non-deterministic values like `Date.now()`, `Math.random()`, or `window` access during render are the classic cause.",
  "interviewLine": "I describe hydration as React adopting server-rendered HTML on the client, rebuilding the tree and attaching listeners rather than recreating nodes; it fails with a mismatch if the server and client render different markup.",
  "misconception": "Thinking hydration re-renders everything from scratch, when React adopts the existing server DOM and only attaches behavior, which breaks if the two markups disagree.",
  "hints": [
    "Ask what the browser already has in the DOM before React's JavaScript runs.",
    "What does React attach to that existing markup rather than rebuild?",
    "What goes wrong if the server HTML and the first client render disagree?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/rendering",
  "example": {
    "caption": "Notice reading a non-deterministic value during render causes a hydration mismatch; defer it to an effect.",
    "language": "tsx",
    "code": "function Clock() {\n  const [now, setNow] = useState<string | null>(null);\n  useEffect(() => setNow(new Date().toLocaleTimeString()), []);\n  // Rendering new Date() directly would differ between server and client.\n  return <time>{now ?? \"--:--\"}</time>;\n}"
  }
},
{
  "id": "react-what-are-react-portals-used-for",
  "title": "What are React Portals used for?",
  "prompt": "What are React Portals used for?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Rendering children into a different DOM node outside the parent's hierarchy while preserving React context and event bubbling.",
      "isCorrect": true,
      "explanation": "Correct. The children leave the parent's DOM subtree but stay in the React tree, so context and bubbling follow the React hierarchy."
    },
    {
      "id": "B",
      "text": "Loading third-party websites inside full-screen VR headsets.",
      "isCorrect": false,
      "explanation": "Tempting as a futuristic distractor, but portals move DOM nodes within one document; they have nothing to do with VR."
    },
    {
      "id": "C",
      "text": "Creating encrypted peer-to-peer network tunnels between browser windows.",
      "isCorrect": false,
      "explanation": "Tempting because \"portal\" sounds like a tunnel, but a React portal is a rendering target, not a network connection."
    },
    {
      "id": "D",
      "text": "Transferring React component state directly into a backend PostgreSQL database.",
      "isCorrect": false,
      "explanation": "Tempting as a persistence-sounding option, but portals relocate rendered DOM, not state, and never touch a database."
    }
  ],
  "correctAnswer": "A",
  "explanation": "A portal renders a component's children into a different DOM node, outside the parent's DOM subtree, while keeping them in the same React tree. You create one with `createPortal(children, container)`, pointing at a node elsewhere in the document, often a `<div>` at the end of `<body>`.\n\nThis solves the escape-the-clip problem: modals, tooltips, and dropdowns need to break out of ancestors with `overflow: hidden`, `transform`, or a low `z-index` stacking context. A portal places their DOM at the top level so they render above everything.\n\nThe nuance that trips candidates: because the portal stays in the React tree, context still flows and events still bubble through the React hierarchy, not the DOM hierarchy. A click inside a portaled modal bubbles to the React parent that rendered it, even though the DOM node lives elsewhere.",
  "interviewLine": "I reach for a portal to render children into a DOM node outside the parent subtree, which escapes `overflow` and stacking contexts for modals, while context and event bubbling still follow the React tree, not the DOM.",
  "misconception": "Expecting events from a portaled node to bubble through the DOM, when they bubble through the React tree to the component that rendered the portal.",
  "hints": [
    "Ask where a modal needs to live in the DOM to escape a clipping ancestor.",
    "Does a portal change where the component sits in the React tree too?",
    "Through which hierarchy does a click inside the portal bubble, DOM or React?"
  ],
  "source": "100-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react-dom.dev/reference/react-dom/createPortal",
  "example": {
    "caption": "Notice the modal's DOM lands in document.body, but onClose still fires via React tree bubbling.",
    "language": "tsx",
    "code": "import { createPortal } from \"react-dom\";\n\nfunction Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {\n  return createPortal(\n    <div className=\"overlay\" onClick={onClose}>{children}</div>,\n    document.body,\n  );\n}"
  }
},
{
  "id": "react-what-is-react-strict-mode-and-what-are-its-benefits",
  "title": "What is React strict mode and what are its benefits?",
  "prompt": "What is React strict mode and what are its benefits?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<React.StrictMode>  <App /></React.StrictMode>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A TypeScript compiler rule that forbids the use of `any` types across the codebase.",
      "isCorrect": false,
      "explanation": "Tempting because \"strict\" overlaps with TypeScript's strict mode, but `React.StrictMode` is a runtime dev wrapper, not a compiler flag."
    },
    {
      "id": "B",
      "text": "A production optimization flag that disables error throwing to keep the site from crashing.",
      "isCorrect": false,
      "explanation": "Tempting if \"strict\" sounds protective, but Strict Mode is development-only and adds checks; it never suppresses errors in production."
    },
    {
      "id": "C",
      "text": "A development-only tool that double-invokes renders and effects to catch impure side effects and warns on deprecated APIs.",
      "isCorrect": true,
      "explanation": "Correct. It runs certain functions twice in development to expose impurity and missing cleanup, and flags legacy APIs."
    },
    {
      "id": "D",
      "text": "A security sandbox that blocks all external HTTP network requests from the app.",
      "isCorrect": false,
      "explanation": "Tempting as a safety-flavored option, but Strict Mode does no network sandboxing; it is a correctness aid for development."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`<React.StrictMode>` is a development-only wrapper that surfaces latent bugs early. It double-invokes component render functions, effect setups, and state updater functions, intentionally running them twice so that impure logic or missing effect cleanup reveals itself. It also warns about deprecated and unsafe legacy APIs.\n\nThe benefit is that bugs you would otherwise hit only under future features like concurrent rendering, an effect that forgets to unsubscribe, a render that mutates external state, show up immediately in development.\n\nThe nuance an interviewer probes: Strict Mode changes nothing in production builds; the double-invocation is stripped out. So \"my effect runs twice\" in development is the tool working as designed, telling you the cleanup must be idempotent, not a bug to suppress.",
  "interviewLine": "I treat Strict Mode as a development-only wrapper that double-invokes renders and effects to flush out impurity and missing cleanup; it is stripped from production, so I read the double run as the tool doing its job, not a defect.",
  "misconception": "Treating the development double-invocation as a bug, when it is intentional and only runs in development to expose impure renders and missing cleanup.",
  "hints": [
    "Ask whether this wrapper does anything at all in a production build.",
    "Why would React deliberately run your effect setup and cleanup twice?",
    "If an effect misbehaves on the second run, what does that say about its cleanup?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
  "example": {
    "caption": "Notice the cleanup makes the effect idempotent, so Strict Mode's double-invoke leaves no duplicate listener.",
    "language": "tsx",
    "code": "function Subscriber() {\n  useEffect(() => {\n    const handler = () => {};\n    window.addEventListener(\"online\", handler);\n    return () => window.removeEventListener(\"online\", handler);\n  }, []);\n  return null;\n}"
  }
},
{
  "id": "react-how-do-you-decide-between-using-react-state-context-and",
  "title": "How do you decide between using React state, context, and external state managers?",
  "prompt": "How do you decide between using React state, context, and external state managers?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Local state for isolated UI, Context for low-frequency app-wide data, a store for complex global client state, and a query cache for server data.",
      "isCorrect": true,
      "explanation": "Correct. Each tool fits a different data shape and update frequency, and server data belongs in a cache rather than client state."
    },
    {
      "id": "B",
      "text": "Store every transient text input value and hover flag in one global Redux store shared across the whole app.",
      "isCorrect": false,
      "explanation": "Tempting if you like one source of truth, but putting transient UI state in a global store adds boilerplate and broad re-renders for no benefit."
    },
    {
      "id": "C",
      "text": "Never use local component state; require that all state live in external global stores regardless of scope.",
      "isCorrect": false,
      "explanation": "Tempting as a tidy rule, but local state is the right default for component-owned data; globalizing everything hurts clarity and performance."
    },
    {
      "id": "D",
      "text": "Use plain Context without selectors to broadcast high-frequency 60fps real-time data streams to consumers.",
      "isCorrect": false,
      "explanation": "Tempting because Context shares data widely, but every consumer re-renders on each change, so 60fps streams need a store with selectors instead."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Match the tool to the shape and lifetime of the data. Local `useState` holds state owned by one component or its small subtree, form inputs, toggles, hover flags. Context carries app-wide, low-frequency values like theme, locale, or the current user, where prop drilling would be painful. External stores like Zustand or Redux handle complex global client state with cross-cutting updates. And server data belongs in a cache like React Query or SWR, not in client state at all.\n\nThe practical consequence is avoiding two failure modes: a giant global store holding transient UI state that should be local, and Context used for fast-changing data that re-renders every consumer on each update.\n\nThe nuance: the first question is whether the state is server data; if it is, a query cache handles fetching, caching, and invalidation better than any client state tool, and you avoid duplicating the server as the source of truth.",
  "interviewLine": "I first ask if the data is server state, which belongs in a query cache; otherwise local `useState` for component UI, Context for low-frequency app-wide values, and a store with selectors for complex or high-frequency global state.",
  "misconception": "Reaching for one state tool for everything, when the right choice depends on whether data is local UI, app-wide, complex global, or server-owned.",
  "hints": [
    "Start by asking whether the data originates on the server or in the client.",
    "What happens to every Context consumer when the context value changes?",
    "Does transient UI like a hover flag really need to be global?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useContext",
  "example": {
    "caption": "Notice server data lives in a query cache while the open/closed toggle stays local.",
    "language": "tsx",
    "code": "function Profile({ id }: { id: string }) {\n  const { data } = useQuery({ queryKey: [\"user\", id], queryFn: () => fetchUser(id) });\n  const [expanded, setExpanded] = useState(false); // local UI state\n  return (\n    <button onClick={() => setExpanded((e) => !e)}>{data?.name}</button>\n  );\n}"
  }
},
{
  "id": "react-how-does-react-handle-concurrent-rendering-with-multipl",
  "title": "How does React handle concurrent rendering with multiple updates and prioritize them?",
  "prompt": "How does React handle concurrent rendering with multiple updates and prioritize them?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "React drops all non-urgent updates completely and never renders them.",
      "isCorrect": false,
      "explanation": "Tempting if you equate \"low priority\" with \"discarded,\" but non-urgent work still renders; it is just interruptible and deferred."
    },
    {
      "id": "B",
      "text": "React sends all state updates to a remote server to be ordered by an external queue.",
      "isCorrect": false,
      "explanation": "Tempting as a distributed-sounding model, but scheduling is entirely in-browser; no server orders React's updates."
    },
    {
      "id": "C",
      "text": "React's scheduler renders urgent updates synchronously while non-urgent transitions can be interrupted and resumed.",
      "isCorrect": true,
      "explanation": "Correct. Priorities let clicks and typing stay responsive while heavy transition work yields and continues later."
    },
    {
      "id": "D",
      "text": "React processes every update strictly first-in-first-out with synchronous blocking execution.",
      "isCorrect": false,
      "explanation": "Tempting as the pre-concurrent model, but that is exactly what concurrency replaces; strict blocking FIFO is what caused jank."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Concurrent React assigns priority to updates and lets high-priority work interrupt low-priority work. Urgent updates, typing in a field, clicking a button, are rendered right away so the UI stays responsive. Updates you mark as non-urgent with `startTransition` or derive with `useDeferredValue` can be rendered in the background, paused, and resumed as more important work arrives.\n\nThe payoff is that an expensive re-render, filtering a huge list as the user types, no longer blocks the keystroke. React keeps the input responsive and renders the heavy result when it can, discarding stale in-progress work if newer input supersedes it.\n\nThe nuance an interviewer probes: transitions do not make rendering faster; they make it interruptible and reprioritized. The expensive work still happens, but it yields to urgent updates instead of freezing the main thread.",
  "interviewLine": "I lean on React's scheduler: it prioritizes urgent updates like typing and lets transitions I mark with `startTransition` or `useDeferredValue` be interrupted and resumed, so a heavy render yields to the keystroke instead of blocking it.",
  "misconception": "Believing transitions make rendering faster, when they make it interruptible and reprioritized so urgent updates never wait behind heavy ones.",
  "hints": [
    "Ask what React does when a cheap urgent update arrives during an expensive one.",
    "Does marking work as a transition speed it up, or change when it runs?",
    "What happens to in-progress transition work when newer input arrives?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice the keystroke updates the input urgently while the heavy list filter runs as an interruptible transition.",
    "language": "tsx",
    "code": "function Search({ all }: { all: string[] }) {\n  const [text, setText] = useState(\"\");\n  const deferred = useDeferredValue(text);\n  const results = all.filter((s) => s.includes(deferred)); // heavy, deferred\n  return <input value={text} onChange={(e) => setText(e.target.value)} />;\n}"
  }
},
{
  "id": "react-explain-server-side-rendering-of-react-applications-and",
  "title": "Explain server-side rendering of React applications and its benefits",
  "prompt": "Explain server-side rendering of React applications and its benefits, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Executing all client-side mouse clicks on the backend server over satellite links.",
      "isCorrect": false,
      "explanation": "Tempting as a server-flavored distractor, but SSR renders HTML on the server; it does not run the user's clicks remotely."
    },
    {
      "id": "B",
      "text": "Rendering components to HTML on the server per request for fast first paint and SEO, then hydrating on the client.",
      "isCorrect": true,
      "explanation": "Correct. The server emits ready HTML for speed and crawlers, and the client hydrates it into an interactive app."
    },
    {
      "id": "C",
      "text": "Compiling React components into WebAssembly shaders on the server.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level-sounding option, but SSR produces HTML strings, not WebAssembly or shaders."
    },
    {
      "id": "D",
      "text": "Pre-rendering HTML once at build time that never changes per request.",
      "isCorrect": false,
      "explanation": "Tempting because it is adjacent, but that describes static generation; SSR renders fresh HTML on each request."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Server-side rendering runs your React components on the server for each request and sends fully formed HTML to the browser. The user sees content on first paint without waiting for the JavaScript bundle to download and execute, which improves perceived performance and gives crawlers real markup for SEO.\n\nAfter the HTML arrives, the client loads React and hydrates it, adopting the existing DOM and attaching event listeners to make it interactive. So SSR is HTML-first for speed and crawlability, then interactivity layered on.\n\nThe nuance an interviewer probes: SSR renders per request, which differs from static generation that renders once at build time. Per-request rendering suits personalized or frequently changing data but costs server work on every hit, so you balance it against static or cached rendering.",
  "interviewLine": "SSR renders components to HTML on the server for each request, giving fast first paint and real markup for SEO, then the client hydrates it; I weigh it against static rendering since per-request SSR costs server work on every hit.",
  "misconception": "Conflating SSR with static generation, when SSR renders per request while static generation renders once at build time.",
  "hints": [
    "Ask what the browser receives before any JavaScript has executed.",
    "What client-side step turns that static HTML into an interactive app?",
    "How does rendering per request differ from rendering once at build time?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice renderToString produces HTML the server sends, which the client later hydrates.",
    "language": "tsx",
    "code": "import { renderToString } from \"react-dom/server\";\n\nfunction handleRequest() {\n  const html = renderToString(<App />);\n  return `<!doctype html><div id=\"root\">${html}</div><script src=\"/client.js\"></script>`;\n}"
  }
},
{
  "id": "react-how-do-you-handle-nested-routes-and-route-parameters-in",
  "title": "How do you handle nested routes and route parameters in React Router?",
  "prompt": "How do you handle nested routes and route parameters in React Router?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import {  BrowserRouter,  Routes,  Route,  Outlet,  useParams,} from 'react-router-dom';\nfunction UserProfile() {  const { userId } = useParams();  return <h2>User ID: {userId}</h2>;}\nfunction App() {  return (    <BrowserRouter>      <Routes>        <Route path=\"user/:userId\" element={<Outlet />}>          <Route path=\"profile\" element={<UserProfile />} />        </Route>      </Routes>    </BrowserRouter>  );}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Manually hide and show child components with `display: none` based on the current path.",
      "isCorrect": false,
      "explanation": "Tempting as a hand-rolled approach, but it renders every child always and discards the router's matching; nesting plus Outlet is the real mechanism."
    },
    {
      "id": "B",
      "text": "Nested routes are not supported in React Router.",
      "isCorrect": false,
      "explanation": "Tempting if you have only used flat routes, but nesting is a core feature, expressed with child routes and an Outlet."
    },
    {
      "id": "C",
      "text": "Nest `<Route>` definitions inside parent routes and render an `<Outlet />` where matching child routes should appear.",
      "isCorrect": true,
      "explanation": "Correct. The parent lays out shared UI and marks the slot with Outlet, while params come from `useParams`."
    },
    {
      "id": "D",
      "text": "Render dozens of nested `<iframe>` tags inside each other to show nested pages.",
      "isCorrect": false,
      "explanation": "Tempting as a brute-force isolation idea, but iframes are heavy, isolated documents; nesting is handled in-app with routes and Outlet."
    }
  ],
  "correctAnswer": "C",
  "explanation": "In React Router you express nesting by placing child `<Route>` elements inside a parent `<Route>`, and you render an `<Outlet />` in the parent's layout where the matched child should appear. The parent provides shared chrome, a sidebar or header, and the Outlet is the slot the active child fills.\n\nRoute parameters are declared with a colon segment like `path=\"user/:userId\"` and read inside the component with the `useParams` hook. This keeps the URL as the source of truth: the matched params drive what the component shows.\n\nThe nuance: forgetting the `<Outlet />` is the classic bug, the child route matches but renders nothing because the parent never designates where it goes. In Next.js App Router the equivalent is nested folders and the `children` prop of a layout, not Outlet.",
  "interviewLine": "I nest child `<Route>` elements under a parent and render an `<Outlet />` in the parent layout for the matched child, reading dynamic segments like `:userId` with `useParams`.",
  "misconception": "Expecting a nested child route to render on its own, when the parent must include an `<Outlet />` to mark where the child mounts.",
  "hints": [
    "Ask what tells the parent layout where to place the matched child.",
    "How is a dynamic segment like a user id declared in the path and then read?",
    "If the child matches but shows nothing, what did the parent forget to render?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice the layout renders <Outlet /> for the active child, and useParams reads the dynamic id.",
    "language": "tsx",
    "code": "function UsersLayout() {\n  return (\n    <section>\n      <h1>Users</h1>\n      <Outlet />\n    </section>\n  );\n}\n\nfunction User() {\n  const { userId } = useParams();\n  return <p>User {userId}</p>;\n}"
  }
},
{
  "id": "react-how-do-you-handle-404-errors-or-page-not-found-in-react",
  "title": "How do you handle 404 errors or page not found in React Router?",
  "prompt": "How do you handle 404 errors or page not found in React Router?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { Routes, Route } from 'react-router-dom';\nfunction NotFound() {  return <h1>404 - Page Not Found</h1>;}\nfunction App() {  return (    <Routes>      <Route path=\"/\" element={<Home />} />      <Route path=\"/about\" element={<About />} />      <Route path=\"*\" element={<NotFound />} />    </Routes>  );}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Define a catch-all `<Route path='*' element={<NotFound />} />` last in the list to render a 404 component when nothing else matches.",
      "isCorrect": true,
      "explanation": "Correct. The trailing wildcard claims any unmatched URL, rendering your custom not-found view."
    },
    {
      "id": "B",
      "text": "React Router automatically shuts down the web server when an unknown URL is requested.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic failure mode, but routing is client-side and never stops a server; an unmatched route just needs a fallback."
    },
    {
      "id": "C",
      "text": "Redirect all users to an external site like Google whenever a 404 occurs.",
      "isCorrect": false,
      "explanation": "Tempting as a crude fallback, but sending users off-site is poor UX; a catch-all route renders an in-app 404 instead."
    },
    {
      "id": "D",
      "text": "Throw a fatal unhandled JavaScript exception in the root component.",
      "isCorrect": false,
      "explanation": "Tempting if you think an error signals \"not found,\" but crashing the app is not 404 handling; a wildcard route renders a graceful page."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React Router matches routes in order and renders the first that matches. To handle unknown URLs you add a catch-all route with `path=\"*\"` as the last entry in `<Routes>`; the `*` matches anything no earlier route claimed, so it renders your custom `NotFound` component.\n\nPlacement matters: because the wildcard matches everything, putting it before real routes would shadow them. Keeping it last lets specific paths win and only unmatched URLs fall through to the 404.\n\nThe nuance: this is a client-side 404 that renders a page; it does not set an HTTP 404 status, since the server already returned the SPA shell. For a real status code you need server-side routing or a framework like Next.js, whose `not-found.tsx` can respond with the correct status.",
  "interviewLine": "I add a trailing `path='*'` route rendering a NotFound component so any unmatched URL falls through to it; it is a client-side page, not an HTTP 404, so for a real status I rely on server routing.",
  "misconception": "Assuming a client-side catch-all route also sends an HTTP 404 status, when it only renders a page; the real status needs server-side routing.",
  "hints": [
    "Ask in what order React Router tries to match routes.",
    "Which path pattern matches any URL no other route claimed, and where must it sit?",
    "Does rendering a 404 page also change the HTTP response status?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice the wildcard sits last so specific routes match first and only leftovers hit NotFound.",
    "language": "tsx",
    "code": "<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/docs/:slug\" element={<Doc />} />\n  <Route path=\"*\" element={<NotFound />} />\n</Routes>"
  }
},
{
  "id": "react-how-do-you-pass-props-to-a-route-component-in-react-rou",
  "title": "How do you pass props to a route component in React Router?",
  "prompt": "How do you pass props to a route component in React Router?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { Routes, Route } from 'react-router-dom';\nfunction MyComponent({ propValue }) {  return <div>Prop Value: {propValue}</div>;}\nfunction App() {  return (    <Routes>      <Route path=\"/my-route\" element={<MyComponent propValue=\"Hello\" />} />    </Routes>  );}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Props cannot be passed to route components in React Router v6.",
      "isCorrect": false,
      "explanation": "Tempting if you recall the v5 API change, but v6 lets you pass props directly on the JSX given to `element`."
    },
    {
      "id": "B",
      "text": "Pass props directly on the component inside the `element` JSX, e.g. `element={<MyComponent propValue='hello' />}`.",
      "isCorrect": true,
      "explanation": "Correct. `element` takes a JSX element, so you set props on it exactly as you would anywhere else."
    },
    {
      "id": "C",
      "text": "Inject props into `window.__PROPS__` on every route change and read them globally.",
      "isCorrect": false,
      "explanation": "Tempting as a global shortcut, but polluting `window` is fragile and unnecessary when `element` accepts props directly."
    },
    {
      "id": "D",
      "text": "Define the props as global environment variables in a `.env` file.",
      "isCorrect": false,
      "explanation": "Tempting if you conflate config with props, but `.env` holds build-time constants, not per-route component props."
    }
  ],
  "correctAnswer": "B",
  "explanation": "In React Router v6 the `element` prop takes a JSX element, not a component type, so you pass props by writing them directly on that element: `element={<MyComponent propValue=\"hello\" />}`. The router renders exactly the element you supplied, props and all.\n\nThis differs from the older v5 `component`/`render` API, where you passed a component reference and the router injected route props. In v6 you are in full control of the JSX, which also means route data like params comes from hooks (`useParams`, `useSearchParams`) rather than injected props.\n\nThe nuance: because `element` holds a concrete JSX element, static props are set once at definition. For values that vary with the URL, read them inside the component with the router hooks instead of trying to thread them through `element`.",
  "interviewLine": "In v6 the `element` prop is a JSX element, so I pass props right on it; for anything that varies with the URL I read it inside the component with `useParams` or `useSearchParams` rather than injecting it.",
  "misconception": "Thinking v6 injects route props automatically, when `element` takes plain JSX and URL-derived data comes from hooks like `useParams`.",
  "hints": [
    "Ask what type the v6 `element` prop actually expects.",
    "If `element` already holds a JSX element, where do its props go?",
    "For values that change with the URL, which hooks read them inside the component?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice static props sit on the element, while the URL-driven id is read with a hook inside.",
    "language": "tsx",
    "code": "<Routes>\n  <Route path=\"/banner\" element={<Banner tone=\"warning\" />} />\n  <Route path=\"/post/:id\" element={<Post />} />\n</Routes>;\n\nfunction Post() {\n  const { id } = useParams();\n  return <article>Post {id}</article>;\n}"
  }
},
{
  "id": "react-what-is-react-testing-library-and-how-is-it-used-for-te",
  "title": "What is React Testing Library and how is it used for testing React components?",
  "prompt": "What is React Testing Library and how is it used for testing React components?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A load-testing tool that fires 1,000,000 requests per second at backend servers.",
      "isCorrect": false,
      "explanation": "Tempting as a testing-adjacent option, but RTL tests component DOM output, not backend throughput under load."
    },
    {
      "id": "B",
      "text": "A testing utility that encourages testing components from the user's perspective by querying accessible DOM roles, text, and labels rather than implementation details.",
      "isCorrect": true,
      "explanation": "Correct. RTL tests from the user's perspective, asserting on rendered output instead of internal state."
    },
    {
      "id": "C",
      "text": "A visual CSS design tool for drawing Figma wireframes.",
      "isCorrect": false,
      "explanation": "Tempting as a frontend tool, but RTL is a test library; it draws nothing and designs no UI."
    },
    {
      "id": "D",
      "text": "A library that tests internal private component state variables directly (`wrapper.state()`).",
      "isCorrect": false,
      "explanation": "Tempting if you recall Enzyme, but RTL deliberately omits state inspection to steer tests toward user-visible behavior."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React Testing Library (RTL) is a utility for testing components the way a user experiences them. Instead of reaching into internal state or instance methods, you render the component and query the resulting DOM by accessible role, label, or visible text, then assert on what the user would see.\n\nThe guiding philosophy is that tests should resemble how software is used: query a button by its role and name, click it, and assert the resulting text appears. This keeps tests resilient to refactors, renaming a state variable or restructuring internals does not break a test that only cares about rendered output.\n\nThe nuance an interviewer probes: RTL deliberately offers no API to read component state (`wrapper.state()`), unlike the older Enzyme approach. Tests that assert on implementation details are exactly what RTL steers you away from, because they break on refactor without catching real regressions.",
  "interviewLine": "I use React Testing Library to test components as a user would, querying by accessible role, label, and text rather than internal state, which keeps my tests resilient to refactors that do not change behavior.",
  "misconception": "Expecting RTL to let you assert on component state, when it intentionally exposes only user-facing queries to keep tests refactor-proof.",
  "hints": [
    "Ask whether the library lets you read a component's internal state at all.",
    "What does querying by role and visible text buy you when internals get refactored?",
    "Contrast it with the older style that asserted on `wrapper.state()`."
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the test queries by accessible role and visible text, never touching component internals.",
    "language": "tsx",
    "code": "import { render, screen } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\n\ntest(\"shows a greeting after click\", async () => {\n  render(<Greeter />);\n  await userEvent.click(screen.getByRole(\"button\", { name: /greet/i }));\n  expect(screen.getByText(\"Hello!\")).toBeInTheDocument();\n});"
  }
},
{
  "id": "react-how-do-you-test-react-components-using-react-testing-li",
  "title": "How do you test React components using React Testing Library?",
  "prompt": "How do you test React components using React Testing Library?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { render, screen, fireEvent } from '@testing-library/react';import MyComponent from './MyComponent';\ntest('renders component', () => {  render(<MyComponent />);  const button = screen.getByRole('button');  fireEvent.click(button);  expect(screen.getByText('Clicked!')).toBeInTheDocument();});",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Render the component with `render(<MyComponent />)`, simulate user interactions with `userEvent` (or `fireEvent`), and assert on DOM output with `expect(screen.getByRole(...)).toBeInTheDocument()`.",
      "isCorrect": true,
      "explanation": "Correct. Render, interact as a user, then assert on visible output is the RTL cycle."
    },
    {
      "id": "B",
      "text": "Modify the production source code to return hardcoded test strings.",
      "isCorrect": false,
      "explanation": "Tempting as a quick pass, but changing production code to satisfy a test defeats the purpose and tests nothing real."
    },
    {
      "id": "C",
      "text": "Take a screenshot of the computer monitor with a physical camera.",
      "isCorrect": false,
      "explanation": "Tempting as a literal \"see the output\" idea, but RTL asserts on the test DOM programmatically, not with a camera."
    },
    {
      "id": "D",
      "text": "Inspect the component's internal `this.state` directly using private reflection.",
      "isCorrect": false,
      "explanation": "Tempting if you come from state-based testing, but RTL avoids internals and asserts on rendered output instead."
    }
  ],
  "correctAnswer": "A",
  "explanation": "The RTL workflow has three steps. Render the component with `render(<MyComponent />)`, which mounts it into a test DOM. Simulate user interaction with `userEvent` (preferred for realistic event sequences) or `fireEvent`. Then assert on the resulting DOM with queries like `screen.getByRole` or `screen.getByText` and matchers like `toBeInTheDocument`.\n\nThe discipline is to assert on what the user observes, not how the component stores it. You click the button a user would click and check the text that appears, so the test documents behavior rather than internals.\n\nThe nuance an interviewer probes: `userEvent` is async and dispatches a full sequence of events (pointer down, focus, click) that mirrors a real user, while `fireEvent` fires a single synthetic event. For interactions that depend on focus or key sequences, `userEvent` catches bugs `fireEvent` misses.",
  "interviewLine": "I render the component, drive it with `userEvent` to mimic real interaction, and assert on the DOM via `screen` queries; I prefer `userEvent` over `fireEvent` because it dispatches the full realistic event sequence.",
  "misconception": "Testing a component by its internal state, when RTL has you render, interact as a user, and assert on the DOM the user actually sees.",
  "hints": [
    "Recall the three-step shape: render, interact, assert.",
    "Which part of the component does the final assertion look at, internals or output?",
    "Why might `userEvent` catch a focus-related bug that `fireEvent` misses?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the assertion checks visible text after a realistic userEvent click, not internal state.",
    "language": "tsx",
    "code": "import { render, screen } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\n\ntest(\"increments on click\", async () => {\n  render(<Counter />);\n  await userEvent.click(screen.getByRole(\"button\"));\n  expect(screen.getByText(\"Count: 1\")).toBeInTheDocument();\n});"
  }
},
{
  "id": "react-what-is-shallow-renderer-in-react-testing",
  "title": "What is Shallow Renderer in React testing?",
  "prompt": "What is Shallow Renderer in React testing?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "// Enzyme-style example (historical)import { shallow } from 'enzyme';const wrapper = shallow(<Button label=\"Click Me\" />);expect(wrapper.text()).toBe('Click Me');",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A compiler that compresses React components into SVG graphics.",
      "isCorrect": false,
      "explanation": "Tempting as a build-tool-sounding option, but shallow rendering is a test technique, not a compiler, and produces no SVG."
    },
    {
      "id": "B",
      "text": "A legacy testing approach (used by Enzyme) that rendered components only one level deep without rendering child components, now discouraged in favor of RTL's full DOM rendering.",
      "isCorrect": true,
      "explanation": "Correct. It stubbed out children to isolate the component, a style RTL replaced with full rendering and user-facing assertions."
    },
    {
      "id": "C",
      "text": "A rendering engine that only renders components with CSS opacity set to 0.5.",
      "isCorrect": false,
      "explanation": "Tempting because \"shallow\" sounds visual, but it refers to render depth in tests, not opacity."
    },
    {
      "id": "D",
      "text": "A hardware graphics renderer used for 2D mobile gaming.",
      "isCorrect": false,
      "explanation": "Tempting as a graphics-flavored distractor, but shallow rendering is about component test depth, not hardware rendering."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A shallow renderer renders a component exactly one level deep: it runs the target component but leaves its child components as unexpanded placeholders rather than rendering them. The historical Enzyme `shallow` API popularized this to isolate a component from its children.\n\nThe intent was unit isolation, test one component without the behavior of everything it renders. In practice this coupled tests to implementation structure and let bugs in the real rendered output slip through, since children never actually rendered.\n\nThe nuance an interviewer probes: shallow rendering is now discouraged. React Testing Library favors rendering the full tree and asserting on accessible output, which tests behavior as the user sees it and survives internal refactors that shallow tests would break on.",
  "interviewLine": "Shallow rendering renders a component one level deep with children left as placeholders; Enzyme used it for isolation, but it couples tests to structure, so I prefer RTL's full-tree, behavior-focused rendering.",
  "misconception": "Thinking shallow rendering tests real output, when it stubs out children, so the actual rendered result and child behavior are never exercised.",
  "hints": [
    "Ask how many levels of the component tree actually render.",
    "If children never render, what class of bug can a shallow test miss?",
    "Why does the modern recommendation lean toward rendering the whole tree?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice RTL renders children for real, so this catches a broken Child that a shallow test would stub away.",
    "language": "tsx",
    "code": "import { render, screen } from \"@testing-library/react\";\n\nfunction Parent() {\n  return <Child />;\n}\nfunction Child() {\n  return <span>Loaded</span>;\n}\n\ntest(\"renders child output\", () => {\n  render(<Parent />);\n  expect(screen.getByText(\"Loaded\")).toBeInTheDocument();\n});"
  }
},
{
  "id": "react-what-is-snapshot-testing-in-react",
  "title": "What is Snapshot Testing in React?",
  "prompt": "What is Snapshot Testing in React?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import React from 'react';import renderer from 'react-test-renderer';import MyComponent from './MyComponent';\ntest('renders correctly', () => {  const tree = renderer.create(<MyComponent />).toJSON();  expect(tree).toMatchSnapshot();});",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A testing technique that captures the rendered output of a component and saves it to a `.snap` file, failing future test runs if the output changes unexpectedly.",
      "isCorrect": true,
      "explanation": "Correct. It records serialized output once and compares against it later, catching unintended UI changes."
    },
    {
      "id": "B",
      "text": "Taking a physical photograph of the user using the computer webcam.",
      "isCorrect": false,
      "explanation": "Tempting because \"snapshot\" evokes a photo, but it captures serialized render output, not a camera image."
    },
    {
      "id": "C",
      "text": "Creating a full system backup of the operating system hard drive.",
      "isCorrect": false,
      "explanation": "Tempting if \"snapshot\" suggests disk imaging, but this snapshot is a small serialized component output, not a backup."
    },
    {
      "id": "D",
      "text": "A performance tool that measures frame rate speed in FPS.",
      "isCorrect": false,
      "explanation": "Tempting as a metrics-sounding option, but snapshot testing checks output equality, not rendering speed."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Snapshot testing captures a serialized form of a component's rendered output and writes it to a `.snap` file on the first run. On later runs the test re-renders and compares against the stored snapshot; any difference fails the test, flagging that the output changed.\n\nThe value is catching unintended UI changes cheaply, you do not hand-write assertions for every node. The cost is that snapshots are only as meaningful as your review of them: a developer who blindly runs `--updateSnapshot` on every failure turns the safety net into noise.\n\nThe nuance an interviewer probes: large, auto-updated snapshots are an anti-pattern. Prefer small, focused snapshots or explicit assertions on specific output, so a failure points to a real regression rather than an opaque diff of hundreds of lines.",
  "interviewLine": "I treat snapshot testing as serializing rendered output to a `.snap` file that fails when it changes; I keep it as cheap regression coverage only when snapshots stay small and I review them rather than blindly updating.",
  "misconception": "Treating a passing snapshot as proof of correctness, when it only proves the output has not changed since someone last accepted it.",
  "hints": [
    "Ask what gets written to disk on the very first test run.",
    "What exactly does a later run compare against, and when does it fail?",
    "What goes wrong if a developer updates every failing snapshot without reading the diff?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice a focused inline snapshot keeps the diff reviewable, unlike a giant generated .snap file.",
    "language": "tsx",
    "code": "import { render } from \"@testing-library/react\";\n\ntest(\"badge markup\", () => {\n  const { container } = render(<Badge count={3} />);\n  expect(container.firstChild).toMatchInlineSnapshot(\n    `<span class=\"badge\">3</span>`,\n  );\n});"
  }
},
{
  "id": "react-how-do-you-test-react-components-that-use-context",
  "title": "How do you test React components that use context?",
  "prompt": "How do you test React components that use context?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { render } from '@testing-library/react';import { MyContextProvider } from './MyContextProvider';import MyComponent from './MyComponent';\ntest('renders correctly with context', () => {  const { getByText } = render(    <MyContextProvider value=\"test value\">      <MyComponent />    </MyContextProvider>,  );  expect(getByText('test value')).toBeInTheDocument();});",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Disable context checking in React core using special compiler flags before the test runs.",
      "isCorrect": false,
      "explanation": "Tempting as a configuration shortcut, but there is no such flag; you supply a provider so the consumer resolves a value."
    },
    {
      "id": "B",
      "text": "Components that use context cannot be tested in automated test runners at all.",
      "isCorrect": false,
      "explanation": "Tempting if you have hit a default-value surprise, but they test fine; you just wrap them in the matching provider."
    },
    {
      "id": "C",
      "text": "Mutate a global `window.context` object directly in the test file before rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a global hack, but React context does not read from `window`; the provider is what supplies the value."
    },
    {
      "id": "D",
      "text": "Wrap the component in the matching `<MyContext.Provider value={testValue}>` inside the test's `render()` call.",
      "isCorrect": true,
      "explanation": "Correct. Supplying the provider gives the consumer a controlled value and tests the real context wiring."
    }
  ],
  "correctAnswer": "D",
  "explanation": "A component that reads context needs a matching provider in the test, or its `useContext` call returns the context's default value. You wrap the component under test in the real `<MyContext.Provider value={testValue}>` inside the `render()` call, so the component resolves the value you control.\n\nThis mirrors how the component runs in the app and keeps the test honest: you exercise the real provider-consumer wiring rather than faking it. A common refactor is a custom `renderWithProviders` helper that wraps every tested component in the needed providers.\n\nThe nuance: prefer the actual provider over mocking `useContext`. Mocking the hook bypasses the context machinery and can hide real integration bugs, whereas supplying a provider value tests the component exactly as it behaves in production.",
  "interviewLine": "I wrap the component in its real `<Context.Provider value={testValue}>` inside `render`, often via a `renderWithProviders` helper, so I test the actual context wiring rather than mocking `useContext`.",
  "misconception": "Forgetting that a context consumer rendered without a provider falls back to the default value, which is why the provider must wrap it in the test.",
  "hints": [
    "Ask what value a consumer reads when no provider is present.",
    "What single wrapper lets you control that value in a test?",
    "Why prefer the real provider over mocking the `useContext` hook?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useContext",
  "example": {
    "caption": "Notice a reusable helper wraps every tested component in the provider, keeping tests concise.",
    "language": "tsx",
    "code": "function renderWithTheme(ui: React.ReactElement, theme = \"dark\") {\n  return render(<ThemeContext.Provider value={theme}>{ui}</ThemeContext.Provider>);\n}\n\ntest(\"uses provided theme\", () => {\n  renderWithTheme(<ThemedButton />, \"light\");\n  expect(screen.getByRole(\"button\")).toHaveClass(\"light\");\n});"
  }
},
{
  "id": "react-how-do-you-test-react-components-that-use-redux",
  "title": "How do you test React components that use Redux?",
  "prompt": "How do you test React components that use Redux?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { render } from '@testing-library/react';import configureStore from 'redux-mock-store';import { Provider } from 'react-redux';import MyComponent from './MyComponent';\nconst mockStore = configureStore([]);\ntest('renders correctly with Redux state', () => {  const store = mockStore({ counter: 0 });  const { getByText } = render(    <Provider store={store}>      <MyComponent />    </Provider>,  );  expect(getByText('Counter: 0')).toBeInTheDocument();});",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Replace Redux reducers with direct `document.write` DOM insertions during the test.",
      "isCorrect": false,
      "explanation": "Tempting as a crude bypass, but `document.write` corrupts the DOM and does nothing to supply Redux state; you need a Provider."
    },
    {
      "id": "B",
      "text": "Disable all Redux actions during test runs so no state changes occur.",
      "isCorrect": false,
      "explanation": "Tempting if you want determinism, but disabling actions prevents testing behavior; you seed a store and let actions flow."
    },
    {
      "id": "C",
      "text": "Redux-connected components can only be tested manually in a production build.",
      "isCorrect": false,
      "explanation": "Tempting if wiring feels hard, but they test automatically once wrapped in a `<Provider>` with a test store."
    },
    {
      "id": "D",
      "text": "Wrap the component in a Redux `<Provider store={testStore}>` with an initial test state, or use a configured mock store.",
      "isCorrect": true,
      "explanation": "Correct. Supplying a store through the Provider gives the connected component the state it reads from."
    }
  ],
  "correctAnswer": "D",
  "explanation": "A Redux-connected component needs a store available through the React-Redux `<Provider>`. In a test you wrap the component in `<Provider store={testStore}>`, where the store is created with a known initial state (via your real reducer or a configured mock store), so the component renders against the state you control.\n\nThis exercises the real connection: selectors run, `useSelector` reads the test state, and dispatched actions flow through the store. Seeding the initial state lets you assert on exactly the UI a given state produces.\n\nThe nuance an interviewer probes: prefer a real store built from your actual reducers over a mock store when you also want to assert on state after dispatch, since a mock store records actions but does not run reducers, so the state never updates in response to them.",
  "interviewLine": "I wrap the component in `<Provider store={testStore}>` with a seeded initial state so selectors run against known data; I prefer a real reducer-backed store over a mock store when I also assert on state after dispatch.",
  "misconception": "Expecting a connected component to work in a test without a store, when `useSelector` needs a `<Provider>` to read from.",
  "hints": [
    "Ask what React-Redux wrapper a connected component expects above it.",
    "How do you control the state the component reads during the test?",
    "Does a mock store actually run your reducers when an action is dispatched?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice a real store built from the app reducer lets assertions reflect state after a dispatch.",
    "language": "tsx",
    "code": "import { configureStore } from \"@reduxjs/toolkit\";\nimport { Provider } from \"react-redux\";\n\nfunction renderWithStore(ui: React.ReactElement, preloadedState: RootState) {\n  const store = configureStore({ reducer, preloadedState });\n  return render(<Provider store={store}>{ui}</Provider>);\n}"
  }
},
{
  "id": "react-what-are-the-key-differences-between-shallow-rendering",
  "title": "What are the key differences between shallow rendering and full DOM rendering in React tests?",
  "prompt": "What are the key differences between shallow rendering and full DOM rendering in React tests?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Shallow rendering only works on mobile phones; full DOM rendering only works on desktop.",
      "isCorrect": false,
      "explanation": "Tempting as a platform-shaped distractor, but both run in the same test environment; the difference is render depth, not device."
    },
    {
      "id": "B",
      "text": "Shallow rendering executes a thousand times faster than any other JavaScript code.",
      "isCorrect": false,
      "explanation": "Tempting because it is lighter, but \"1000x faster than any code\" is nonsense; the real difference is scope, not raw speed."
    },
    {
      "id": "C",
      "text": "Shallow rendering renders only the target component without its children; full DOM rendering mounts the whole tree and uses real DOM nodes.",
      "isCorrect": true,
      "explanation": "Correct. One isolates a single component as a unit; the other integrates the full tree against the DOM."
    },
    {
      "id": "D",
      "text": "Full DOM rendering requires a physical robot to click the computer mouse.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd literalization, but full rendering simulates events in software; no hardware is involved."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Shallow rendering renders only the target component and leaves its children as placeholders, so it isolates one component as a strict unit. Full DOM rendering mounts the entire tree, children included, into a real (or jsdom) DOM, so the component is exercised together with everything it renders, an integration test.\n\nThe trade-off is isolation versus realism. Shallow tests do not break when a child changes, but they also never notice if the child breaks or if the composition is wrong. Full rendering catches integration bugs and tests what the user actually sees, at the cost of pulling in child behavior.\n\nThe nuance an interviewer probes: the industry moved toward full DOM rendering with React Testing Library precisely because shallow rendering tested implementation structure rather than behavior, making tests brittle to refactors while missing real regressions.",
  "interviewLine": "I distinguish them: shallow rendering tests one component with children stubbed as a unit, while full DOM rendering mounts the whole tree for integration; I favor full rendering because it tests behavior rather than brittle internal structure.",
  "misconception": "Assuming the two differ mainly in speed, when the real distinction is scope: shallow isolates one component, full rendering integrates the whole tree.",
  "hints": [
    "Ask which approach actually renders the component's children.",
    "Which one tests the composition the user experiences, and which only the shell?",
    "Why does testing internal structure make a test brittle under refactor?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice full rendering lets you assert on child output and composition, which a shallow render would hide.",
    "language": "tsx",
    "code": "import { render, screen } from \"@testing-library/react\";\n\nfunction Page() {\n  return (\n    <main>\n      <Header title=\"Home\" />\n    </main>\n  );\n}\n\ntest(\"renders the header title\", () => {\n  render(<Page />);\n  expect(screen.getByRole(\"heading\", { name: \"Home\" })).toBeInTheDocument();\n});"
  }
},
{
  "id": "react-what-does-useoptimistic-do",
  "title": "What does useOptimistic do?",
  "prompt": "What does useOptimistic do?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "import { useOptimistic } from 'react';\nfunction MessageList({ messages, sendMessage }) {  const [optimisticMessages, addOptimistic] = useOptimistic(    messages,    (state, newMessage) => [...state, { text: newMessage, sending: true }],  );\n  async function handleSend(formData) {    const text = formData.get('text');    addOptimistic(text);    await sendMessage(text);  }\n  return (    <>      {optimisticMessages.map((m, i) => (        <p key={i} style={{ opacity: m.sending ? 0.5: 1 }}>          {m.text}        </p>      ))}      <form action={handleSend}>        <input name=\"text\" />      </form>    </>  );}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Runs a machine-learning model in the browser to predict what the user will type next.",
      "isCorrect": false,
      "explanation": "Tempting because \"optimistic\" sounds predictive, but it shows a provisional UI during an action, not an ML prediction."
    },
    {
      "id": "B",
      "text": "Disables error handling and assumes network calls can never fail.",
      "isCorrect": false,
      "explanation": "Tempting if \"optimistic\" implies ignoring failure, but the hook reverts on completion; you still handle errors explicitly."
    },
    {
      "id": "C",
      "text": "Shows an optimistic UI state immediately while an async action is in flight, reverting to the true server state when it settles.",
      "isCorrect": true,
      "explanation": "Correct. It renders a provisional value during the pending action and reconciles to the real state afterward."
    },
    {
      "id": "D",
      "text": "Permanently saves optimistic guesses to the database without waiting for server confirmation.",
      "isCorrect": false,
      "explanation": "Tempting if you confuse UI with persistence, but the optimistic value is temporary client-side; it never writes to a database."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`useOptimistic` lets you show a provisional UI state the instant a user acts, before an async action confirms it. You pass the real state and a reducer that derives an optimistic version; calling the updater applies that optimistic change immediately, and when the action settles React reconciles back to the true state.\n\nThe payoff is responsiveness: a sent message appears right away marked as sending, and once the server confirms, the real list, now including the saved message, takes over. If the action fails or the real state simply updates, the optimistic value is discarded automatically.\n\nThe nuance an interviewer probes: the optimistic state is ephemeral, not a commit. It exists only during the pending action and is always superseded by the actual source state, so you still handle the failure case by surfacing an error when the real update does not include the optimistic item.",
  "interviewLine": "`useOptimistic` renders a provisional state the moment a user acts and reconciles back to the real state when the async action settles, so I still surface an error if the confirmed state does not include the optimistic item.",
  "misconception": "Treating the optimistic value as committed state, when it is a temporary overlay that React always replaces with the real source state once the action settles.",
  "hints": [
    "Ask when the provisional value is shown and what eventually replaces it.",
    "Is the optimistic state ever persisted, or only displayed during the pending action?",
    "If the action fails, who is responsible for showing the error?"
  ],
  "source": "100-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the optimistic like shows instantly, then the real count from the server supersedes it.",
    "language": "tsx",
    "code": "function LikeButton({ likes, like }: { likes: number; like: () => Promise<void> }) {\n  const [optimistic, addOptimistic] = useOptimistic(likes, (n) => n + 1);\n  return (\n    <button onClick={async () => { addOptimistic(null); await like(); }}>\n      {optimistic} likes\n    </button>\n  );\n}"
  }
},
{
  "id": "react-whats-the-difference-between-usetransition-and-usedefer",
  "title": "What's the difference between useTransition and useDeferredValue?",
  "prompt": "What's the difference between useTransition and useDeferredValue?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "// useTransition: control at the dispatch siteconst [isPending, startTransition] = useTransition();startTransition(() => setQuery(input));\n// useDeferredValue: control at the read siteconst deferredQuery = useDeferredValue(query);return <ExpensiveResults query={deferredQuery} />;",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "`useTransition` converts all function components into class components.",
      "isCorrect": false,
      "explanation": "Tempting as a vague \"big change\" claim, but neither hook changes component type; they only reprioritize updates."
    },
    {
      "id": "B",
      "text": "`useTransition` marks a state update non-urgent at the dispatch site; `useDeferredValue` defers an existing value at the read site.",
      "isCorrect": true,
      "explanation": "Correct. One wraps the setter you control; the other lags a value you consume."
    },
    {
      "id": "C",
      "text": "`useDeferredValue` deletes the value entirely when the network is slow.",
      "isCorrect": false,
      "explanation": "Tempting if \"deferred\" sounds like discarding, but it keeps a slightly stale copy; it never deletes the value."
    },
    {
      "id": "D",
      "text": "`useTransition` runs only on the server; `useDeferredValue` runs only on mobile phones.",
      "isCorrect": false,
      "explanation": "Tempting as a platform split, but both are client hooks that run anywhere React renders."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Both mark work as non-urgent so React can keep the UI responsive, but they attach at different points. `useTransition` gives you `startTransition` to wrap the state update at the dispatch site; you decide, when you set state, that this update is low priority, and you also get an `isPending` flag. `useDeferredValue` wraps an existing value at the read site; you take a value you already have and tell React a lagged copy is fine for an expensive render.\n\nIn practice you choose by where you have control. If you own the setter, `useTransition` lets you demote that specific update and show pending UI. If you only receive a value, as a prop you cannot control, `useDeferredValue` defers consuming it without touching how it was set.\n\nThe nuance an interviewer probes: `useTransition` cannot wrap updates you do not dispatch, and `useDeferredValue` gives no pending flag of its own; you detect lag by comparing the deferred value against the current one.",
  "interviewLine": "I reach for `useTransition` when I own the setter and want to demote that update with an `isPending` flag, and `useDeferredValue` when I only receive a value and want a lagged copy for an expensive render.",
  "misconception": "Thinking the two are interchangeable, when `useTransition` demotes an update you dispatch and `useDeferredValue` lags a value you only read.",
  "hints": [
    "Ask whether you control the state update or only receive a value.",
    "Which hook gives you an `isPending` flag, and which does not?",
    "Can `useTransition` demote an update you never dispatch yourself?"
  ],
  "source": "100-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice useDeferredValue lags a value you only receive as a prop, where useTransition could not reach the setter.",
    "language": "tsx",
    "code": "function Results({ query }: { query: string }) {\n  const deferred = useDeferredValue(query);\n  const stale = deferred !== query;\n  return <ul style={{ opacity: stale ? 0.6 : 1 }}>{search(deferred)}</ul>;\n}"
  }
},
{
  "id": "react-how-to-create-an-event-in-react",
  "title": "How to Create an Event in React?",
  "prompt": "How to Create an Event in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Pass a handler function to a camelCase JSX prop like `<button onClick={handleClick}>`, receiving a normalized `SyntheticEvent`.",
      "isCorrect": true,
      "explanation": "Correct. React wires the handler through its synthetic event system and hands your function a cross-browser event object."
    },
    {
      "id": "B",
      "text": "Use lowercase HTML attributes with inline string code, like `<button onclick='handleClick()'>`.",
      "isCorrect": false,
      "explanation": "Tempting if you write it like HTML, but JSX uses camelCase props and function references, not lowercase string-attribute handlers."
    },
    {
      "id": "C",
      "text": "Call `document.addEventListener` imperatively inside the component's returned JSX body.",
      "isCorrect": false,
      "explanation": "Tempting if you reach for the DOM API, but manual listeners bypass React's delegation and leak without cleanup; use the JSX prop."
    },
    {
      "id": "D",
      "text": "Events cannot be handled in React without installing a jQuery plugin.",
      "isCorrect": false,
      "explanation": "Tempting as a legacy assumption, but React has built-in synthetic events; jQuery is neither needed nor appropriate."
    }
  ],
  "correctAnswer": "A",
  "explanation": "You handle events in React by passing a function to a camelCased event prop in JSX, such as `onClick={handleClick}` or `onChange={handleChange}`. React attaches a single delegated listener at the root and dispatches a `SyntheticEvent`, a cross-browser wrapper over the native event, to your handler.\n\nTwo details follow from this. You pass the function itself, not a call: `onClick={handleClick}`, not `onClick={handleClick()}`, which would invoke it during render. And the prop is camelCase (`onClick`), unlike the lowercase HTML attribute, because JSX maps to React's synthetic event system, not raw HTML attributes.\n\nThe nuance an interviewer probes: the SyntheticEvent gives consistent behavior across browsers and supports `preventDefault` and `stopPropagation` like the native event; since React 17 these are regular DOM events under the hood, but you still interact with them through the synthetic wrapper.",
  "interviewLine": "I pass a function reference to a camelCased prop like `onClick`, and React delivers a cross-browser `SyntheticEvent`; I never call the handler in the prop, since that would run it during render.",
  "misconception": "Writing lowercase HTML-style handlers or calling the function in the prop, when React uses camelCase props that take a function reference and deliver a SyntheticEvent.",
  "hints": [
    "Compare the casing of the JSX prop with the HTML attribute you may know.",
    "What is the difference between `onClick={fn}` and `onClick={fn()}`?",
    "What object does React hand your handler, and why is it not the raw native event by default?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice preventDefault works on the SyntheticEvent exactly as it would on a native event.",
    "language": "tsx",
    "code": "function SearchForm() {\n  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    console.log(\"submitted\");\n  }\n  return <form onSubmit={handleSubmit}><button>Go</button></form>;\n}"
  }
},
{
  "id": "react-explain-the-creation-of-a-list-in-react",
  "title": "Explain the creation of a List in React?",
  "prompt": "Explain the creation of a List in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Concatenate all strings with `join(',')` and pass them to an `alert()` box.",
      "isCorrect": false,
      "explanation": "Tempting as a quick display hack, but `alert` is a modal popup, not rendering; a list is built by mapping data to elements."
    },
    {
      "id": "B",
      "text": "Use a `for` loop statement directly inside the return JSX tag block.",
      "isCorrect": false,
      "explanation": "Tempting because loops iterate, but JSX braces hold an expression; a `for` statement produces no value, so nothing renders."
    },
    {
      "id": "C",
      "text": "Transform the array into JSX elements with `Array.prototype.map()` and give each a unique, stable `key`.",
      "isCorrect": true,
      "explanation": "Correct. `map` yields an array of elements JSX renders in order, and the key preserves identity across renders."
    },
    {
      "id": "D",
      "text": "Render list elements by writing raw SQL queries inside the component body.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored distractor, but SQL runs on a database, not in a component; lists come from mapping an in-memory array."
    }
  ],
  "correctAnswer": "C",
  "explanation": "You create a list by transforming a data array into an array of elements with `Array.prototype.map()`, returning one JSX element per item, and giving each a unique, stable `key`. JSX renders an array of elements in order, so the mapped result becomes the list.\n\nThe `key` is the part beginners omit. It gives each element a stable identity so React can match items between renders and move DOM nodes on insertion, deletion, or reorder instead of recreating them. Keys should come from the data (an id), not the array index when the list can change.\n\nThe nuance an interviewer probes: `map` must return the element from its callback, a common bug is using `{}` with no `return`, which yields `undefined` and renders nothing, so prefer the implicit-return arrow form or remember the explicit `return`.",
  "interviewLine": "I map the data array to elements, returning one per item with a stable `key` from its id, because JSX renders an array of elements and the key lets React reconcile the list by identity.",
  "misconception": "Expecting a loop statement to produce list elements inline, when JSX needs an expression, which `map` provides, plus a stable key per item.",
  "hints": [
    "Ask what kind of value the braces inside JSX must evaluate to.",
    "What does each element need so React can track it across renders?",
    "If your `map` callback uses braces, did you remember to `return`?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the implicit-return arrow avoids the missing-return bug, and the key comes from the data.",
    "language": "tsx",
    "code": "function Menu({ dishes }: { dishes: { id: number; name: string }[] }) {\n  return (\n    <ul>\n      {dishes.map((dish) => (\n        <li key={dish.id}>{dish.name}</li>\n      ))}\n    </ul>\n  );\n}"
  }
},
{
  "id": "react-what-is-a-key-in-react",
  "title": "What is a Key in React?",
  "prompt": "What is a Key in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A password hash used to encrypt API responses before they are stored in the browser's local storage.",
      "isCorrect": false,
      "explanation": "Tempting because \"key\" suggests cryptography, but a React key is a reconciliation identity hint with no security role."
    },
    {
      "id": "B",
      "text": "A database primary key that React validates to be unique across every website and table on the internet.",
      "isCorrect": false,
      "explanation": "Tempting due to the shared term, but React keys only need sibling uniqueness within one list, not global uniqueness."
    },
    {
      "id": "C",
      "text": "A string or number attribute on list elements giving them stable identity across renders so React optimizes inserts, deletes, and reorders.",
      "isCorrect": true,
      "explanation": "Correct. The key is the identity React matches between renders to reuse the right node for each item."
    },
    {
      "id": "D",
      "text": "A CSS selector used to apply alternating zebra-striping background colors to the rows of a table.",
      "isCorrect": false,
      "explanation": "Tempting because both touch rows, but styling is CSS; a key is a reconciliation hint React consumes internally."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A key is a special string or number attribute you put on the elements produced by a list render. It gives each element a stable identity so React, during reconciliation, can tell which items were added, removed, or reordered between renders.\n\nWith good keys React reuses and moves the matching DOM nodes rather than recreating them, which preserves per-item state like input values and focus. The key is consumed by React itself; it is not passed to the component as a prop and never appears in the DOM.\n\nThe nuance an interviewer probes: keys only need to be unique among siblings in the same list, and they should come from the data's identity. The array index works only for static lists; using it on a list that can reorder leads to state landing on the wrong row.",
  "interviewLine": "I treat a key as the per-item identity React uses in reconciliation; it is unique only among siblings, comes from the data rather than the index, and is consumed by React, so the child never sees it as a prop.",
  "misconception": "Believing a key must be globally unique or reaches the child as a prop, when it only needs sibling uniqueness and is consumed by React itself.",
  "hints": [
    "Ask who reads the key, React or the child component.",
    "How wide must the uniqueness reach, globally or just within the list?",
    "An index is unique today, but what breaks when the list reorders?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice the key uses the item's id; reordering the array keeps each row's state attached to its data.",
    "language": "tsx",
    "code": "function Tabs({ tabs }: { tabs: { id: string; label: string }[] }) {\n  return (\n    <nav>\n      {tabs.map((tab) => (\n        <button key={tab.id}>{tab.label}</button>\n      ))}\n    </nav>\n  );\n}"
  }
},
{
  "id": "react-explain-the-use-of-the-render-method-in-react",
  "title": "Explain the Use of the Render Method in React?",
  "prompt": "Explain the Use of the Render Method in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A method used exclusively to compile TypeScript into WebAssembly before the app starts.",
      "isCorrect": false,
      "explanation": "Tempting as a build-sounding option, but `render` runs at runtime to return UI; it compiles nothing."
    },
    {
      "id": "B",
      "text": "A method that executes synchronous SQL queries against the backend database.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored distractor, but `render` must stay pure and side-effect-free; data fetching belongs elsewhere."
    },
    {
      "id": "C",
      "text": "In class components, a pure method that reads `this.props` and `this.state` and returns JSX describing the UI.",
      "isCorrect": true,
      "explanation": "Correct. `render` is the required, side-effect-free method that maps props and state to the element tree."
    },
    {
      "id": "D",
      "text": "A function that deletes the browser cache and clears cookies on every call.",
      "isCorrect": false,
      "explanation": "Tempting as an unrelated \"reset\" idea, but `render` only returns UI; it performs no such side effects."
    }
  ],
  "correctAnswer": "C",
  "explanation": "In a class component, `render()` is the one required method. It is a pure function of `this.props` and `this.state`: it reads them and returns a description of the UI, JSX, a string, a number, a fragment, an array, or `null`, without causing side effects.\n\nPurity matters because React may call `render` at any time and expects the same inputs to yield the same output. Mutating state, making network requests, or touching the DOM inside `render` breaks that contract and causes bugs; such work belongs in lifecycle methods like `componentDidMount` or in effects.\n\nThe nuance an interviewer probes: function components have no `render` method; the component function itself plays that role, and the same purity rule applies. React 19 and modern code favor function components, so `render()` is mainly something you recognize in legacy class code and error boundaries.",
  "interviewLine": "I describe `render` as a class component's required, pure method that maps `this.props` and `this.state` to an element tree; I keep side effects in lifecycle methods, and in function components the function body plays the same role.",
  "misconception": "Putting side effects like fetching or DOM mutation inside `render`, when it must be pure and side effects belong in lifecycle methods or effects.",
  "hints": [
    "Ask what inputs `render` is allowed to read and what it must return.",
    "Why must it be free of side effects given React can call it anytime?",
    "Where does the equivalent logic live in a function component?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice render stays pure; the side-effecting subscription lives in componentDidMount, not render.",
    "language": "tsx",
    "code": "class Clock extends React.Component<{}, { time: string }> {\n  state = { time: new Date().toLocaleTimeString() };\n  componentDidMount() {\n    setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000);\n  }\n  render() {\n    return <time>{this.state.time}</time>;\n  }\n}"
  }
},
{
  "id": "react-what-is-state-in-react",
  "title": "What is State in React?",
  "prompt": "What is State in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A compiler setting that toggles TypeScript's strict type-checking mode.",
      "isCorrect": false,
      "explanation": "Tempting because of the shared word \"state,\" but React state is runtime component data, not a compiler flag."
    },
    {
      "id": "B",
      "text": "A static configuration object passed down from parent components and never changed.",
      "isCorrect": false,
      "explanation": "Tempting but it describes props: passed-in and read-only. State is owned locally and changes over time."
    },
    {
      "id": "C",
      "text": "Internal data a component owns that holds information influencing its render and triggers a re-render when updated.",
      "isCorrect": true,
      "explanation": "Correct. State is component-local, drives rendering, and updating it schedules a re-render."
    },
    {
      "id": "D",
      "text": "A global browser cookie that persists permanently across computer reboots.",
      "isCorrect": false,
      "explanation": "Tempting if you conflate persistence with state, but React state is in-memory and resets on reload; cookies are separate."
    }
  ],
  "correctAnswer": "C",
  "explanation": "State is data a component owns and can change over time, and whose changes trigger a re-render. Unlike props, which are passed in from a parent and read-only, state is local to the component that declares it and is updated through a setter (`useState`'s setter, or `this.setState` in a class).\n\nThe defining behavior is reactivity: updating state schedules a re-render so the UI reflects the new value. This is how React keeps the view in sync with data without manual DOM manipulation.\n\nThe nuance an interviewer probes: state updates are asynchronous and must be done immutably, you replace state via the setter rather than mutating the existing object, and reading state right after setting it still shows the old value because the new one applies on the next render. Describing state as \"mutable\" is loose; the setter produces a new state, it does not mutate the old one in place.",
  "interviewLine": "State is a component's own data that drives rendering: updating it through the setter schedules a re-render, and I treat updates as asynchronous and immutable rather than reading the value back immediately.",
  "misconception": "Expecting state updates to be synchronous and in-place, when the setter schedules a re-render and produces a new state rather than mutating the old one.",
  "hints": [
    "Contrast who owns and can change state versus props.",
    "What happens to the component when its state changes?",
    "If you call the setter and read the value on the next line, which value do you see?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the functional updater avoids stale reads when the next value depends on the previous one.",
    "language": "tsx",
    "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      Count: {count}\n    </button>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-role-of-shouldcomponentupdate-in-react",
  "title": "What is the Role of shouldComponentUpdate() in React?",
  "prompt": "What is the Role of shouldComponentUpdate() in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A hook used in function components to fetch data from REST APIs on mount.",
      "isCorrect": false,
      "explanation": "Tempting as a React-sounding option, but `shouldComponentUpdate` is a class lifecycle method about re-rendering, not a data-fetching hook."
    },
    {
      "id": "B",
      "text": "A function that deletes old state variables from memory permanently to free resources.",
      "isCorrect": false,
      "explanation": "Tempting if \"should update\" sounds like cleanup, but it only decides whether to render; it never deletes state."
    },
    {
      "id": "C",
      "text": "A method that forces the browser to shut down when an error occurs during rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic-sounding option, but it returns a boolean to gate rendering; it has nothing to do with errors or shutdown."
    },
    {
      "id": "D",
      "text": "A class lifecycle method returning a boolean that tells React whether to re-render on new props or state (`false` skips it).",
      "isCorrect": true,
      "explanation": "Correct. It gates the update: returning `false` skips the render and DOM work for that change."
    }
  ],
  "correctAnswer": "D",
  "explanation": "`shouldComponentUpdate(nextProps, nextState)` is a class component lifecycle method that returns a boolean telling React whether to proceed with a re-render. Returning `false` skips the render and the DOM update for that change; the default implementation always returns `true`.\n\nIts purpose is performance: when a component receives new props or state that would not change its output, you can short-circuit the render to avoid wasted reconciliation work. `React.PureComponent` implements it with a shallow prop and state comparison so you do not write it by hand.\n\nThe nuance an interviewer probes: it is a sharp tool. A hand-written comparison that misses a changed prop causes stale UI, and in function components the equivalent is `React.memo` with an optional comparator, not a lifecycle method. Overusing it adds comparison cost that can outweigh the render it saves.",
  "interviewLine": "`shouldComponentUpdate` returns a boolean that gates a class component's re-render, which `PureComponent` automates with a shallow compare; in function components `React.memo` plays the same role, and I use it carefully to avoid stale UI.",
  "misconception": "Treating `shouldComponentUpdate` as a free optimization, when a flawed comparison causes stale UI and the comparison cost can exceed the render it avoids.",
  "hints": [
    "Ask what the method's return value controls.",
    "What does returning `false` save, and what does it risk if your comparison is wrong?",
    "What is the function-component equivalent of this optimization?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice React.memo is the function-component counterpart, skipping re-render when props are shallowly equal.",
    "language": "tsx",
    "code": "const Row = React.memo(function Row({ label }: { label: string }) {\n  return <li>{label}</li>;\n});\n// Row re-renders only when `label` changes, like shouldComponentUpdate returning false otherwise."
  }
},
{
  "id": "react-what-are-pure-components-in-react",
  "title": "What are Pure Components in React?",
  "prompt": "What are Pure Components in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Components that render zero HTML tags and return `null` indefinitely without ever producing output.",
      "isCorrect": false,
      "explanation": "Tempting if \"pure\" sounds like \"empty,\" but a pure component renders normally; it just skips re-rendering when inputs are unchanged."
    },
    {
      "id": "B",
      "text": "Components written in pure assembly language without any JavaScript involved at runtime.",
      "isCorrect": false,
      "explanation": "Tempting as a literal reading of \"pure,\" but React components are JavaScript; purity here means skipping unnecessary renders."
    },
    {
      "id": "C",
      "text": "Components that perform a deep recursive comparison of every nested property in their JSON props.",
      "isCorrect": false,
      "explanation": "Tempting but wrong on the key detail: the comparison is shallow, not deep, which is why new nested references still trigger renders."
    },
    {
      "id": "D",
      "text": "Components that shallowly compare props and state and skip re-rendering when nothing changed (`PureComponent` / `React.memo`).",
      "isCorrect": true,
      "explanation": "Correct. They short-circuit a re-render via a shallow equality check on props and state."
    }
  ],
  "correctAnswer": "D",
  "explanation": "A pure component skips re-rendering when its props and state have not changed. `React.PureComponent` implements `shouldComponentUpdate` with a shallow comparison of props and state; `React.memo` does the same for function components. If the shallow compare finds nothing changed, React reuses the previous render.\n\nThis helps when a parent re-renders often but a child's inputs rarely change, you avoid reconciling a subtree that would produce identical output.\n\nThe nuance an interviewer probes: the comparison is shallow, so a new object or array reference, even with identical contents, counts as a change, and an inline function or object prop defeats the optimization every render. That is why pure components pair with stable references from `useMemo` and `useCallback`.",
  "interviewLine": "A pure component skips re-rendering when a shallow compare of props and state finds no change, via `PureComponent` or `React.memo`; because it is shallow, I stabilize object and function props with `useMemo` and `useCallback`.",
  "misconception": "Assuming a pure component deep-compares props, when the check is shallow, so new object or array references, or inline props, still cause a re-render.",
  "hints": [
    "Ask what kind of comparison decides whether the component re-renders.",
    "Is that comparison deep or shallow, and what does that imply for object props?",
    "Why would an inline arrow function prop quietly defeat the optimization?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the inline object prop breaks memoization; a stable reference from useMemo would preserve it.",
    "language": "tsx",
    "code": "const Card = React.memo(function Card({ style }: { style: object }) {\n  return <div style={style}>Card</div>;\n});\n\n// <Card style={{ padding: 8 }} /> re-renders every time: new object each render.\n// const style = useMemo(() => ({ padding: 8 }), []); // keeps it stable"
  }
},
{
  "id": "react-what-is-the-significance-of-setstate-in-react",
  "title": "What is the significance of setState() in React?",
  "prompt": "What is the significance of setState() in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Deletes the component from the DOM permanently so it can never render again.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic-sounding effect, but `setState` schedules a re-render; it never removes the component."
    },
    {
      "id": "B",
      "text": "Reloads the entire browser page from the web server to reflect the new state.",
      "isCorrect": false,
      "explanation": "Tempting if you equate updates with reloads, but `setState` re-renders in place without any page reload."
    },
    {
      "id": "C",
      "text": "Schedules a state update, batches changes for performance, and triggers reconciliation to re-render and update the DOM.",
      "isCorrect": true,
      "explanation": "Correct. It queues the change, lets React batch and reconcile, then patches the DOM with the result."
    },
    {
      "id": "D",
      "text": "Mutates state synchronously in place on the very same line of code it is called.",
      "isCorrect": false,
      "explanation": "Tempting because the call looks immediate, but updates are asynchronous and batched; the new value lands on the next render."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`setState` is how a class component requests a state change. It does not mutate state immediately; it schedules an update, merges the change into the existing state, and tells React to reconcile and re-render. React batches multiple `setState` calls in the same event into one render for performance.\n\nBecause it is asynchronous and batched, reading `this.state` right after calling `setState` still shows the old value. When the next value depends on the previous one, you pass an updater function (`prevState => ...`) so React applies it against the latest queued state rather than a stale snapshot.\n\nThe nuance an interviewer probes: class `setState` shallow-merges the object you pass, unlike the `useState` setter which replaces the value entirely. Relying on the object identity after `setState` or expecting a synchronous read is the classic source of off-by-one state bugs.",
  "interviewLine": "`setState` schedules a batched, asynchronous state update that triggers reconciliation, so I use the updater form when the next value depends on the previous one rather than reading `this.state` right after.",
  "misconception": "Expecting `setState` to update `this.state` synchronously, when it schedules a batched update and the new value is only visible on the next render.",
  "hints": [
    "Ask whether `this.state` reflects the change on the line right after the call.",
    "Why does React batch multiple `setState` calls in one event?",
    "When the next value depends on the current one, what should you pass instead of an object?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the updater form reads the latest queued state, so two increments in one handler both count.",
    "language": "tsx",
    "code": "class Counter extends React.Component<{}, { n: number }> {\n  state = { n: 0 };\n  bump = () => {\n    this.setState((prev) => ({ n: prev.n + 1 }));\n    this.setState((prev) => ({ n: prev.n + 1 })); // reads the queued value, lands on 2\n  };\n  render() {\n    return <button onClick={this.bump}>{this.state.n}</button>;\n  }\n}"
  }
},
{
  "id": "react-what-is-conditional-rendering-in-react",
  "title": "What is Conditional Rendering in React?",
  "prompt": "What is Conditional Rendering in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Spawning background Web Workers only when a specific button is clicked by the user.",
      "isCorrect": false,
      "explanation": "Tempting as a conditional-sounding action, but Web Workers run off-main-thread code; conditional rendering chooses what JSX to show."
    },
    {
      "id": "B",
      "text": "Injecting CSS media queries into the document head at runtime based on screen size.",
      "isCorrect": false,
      "explanation": "Tempting because media queries are conditional too, but they style responsively; conditional rendering decides which elements render."
    },
    {
      "id": "C",
      "text": "Toggling DOM visibility strictly with `v-if` directive attributes on elements.",
      "isCorrect": false,
      "explanation": "Tempting if you know Vue, but `v-if` is a Vue directive; React uses plain JavaScript expressions, not template directives."
    },
    {
      "id": "D",
      "text": "Rendering different JSX based on JavaScript conditions using ternaries, logical `&&`, or `if`/`return` guards.",
      "isCorrect": true,
      "explanation": "Correct. React relies on ordinary JavaScript control flow to decide what gets returned and therefore rendered."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Conditional rendering is choosing what to render based on JavaScript conditions. Because JSX is just JavaScript, you use ordinary expressions: a ternary (`cond ? <A /> : <B />`) to pick between two outputs, logical `&&` (`cond && <A />`) to render or nothing, or an `if`/early `return` to branch before the JSX.\n\nThis keeps rendering declarative: the component describes what the UI should be for the current state, and React reconciles the result. There is no special directive; the condition lives in the same language as the rest of your logic.\n\nThe nuance an interviewer probes: `&&` with a numeric left side renders the number when it is `0`, so `count && <List />` prints a stray `0`. Guard with a boolean (`count > 0 && ...`), and remember React skips `null`, `undefined`, and `false` but not `0`.",
  "interviewLine": "Conditional rendering is just JavaScript choosing the JSX to return, ternary or `&&` inline and an early return for larger branches, and I guard `&&` against numeric values so I never render a stray `0`.",
  "misconception": "Looking for a dedicated conditional directive, when React uses plain JavaScript, and expecting `&&` to hide a `0`, which it actually renders.",
  "hints": [
    "Recall that the braces in JSX evaluate ordinary JavaScript.",
    "Which values does React treat as rendering nothing, and is `0` one of them?",
    "What goes wrong with `items.length && <List />` when the list is empty?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the Boolean coercion prevents a stray 0 from rendering when the array is empty.",
    "language": "tsx",
    "code": "function Inbox({ unread }: { unread: number }) {\n  return (\n    <header>\n      Inbox\n      {unread > 0 && <span className=\"badge\">{unread}</span>}\n    </header>\n  );\n}"
  }
},
{
  "id": "react-explain-the-components-of-a-react-router",
  "title": "Explain the components of a React-Router",
  "prompt": "Explain the components of a React-Router, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`<CanvasRouter>`, `<AudioRouter>`, `<VideoRouter>`, and `<GpuRouter>` for media routing.",
      "isCorrect": false,
      "explanation": "Tempting as official-sounding names, but these do not exist; React Router's parts are BrowserRouter, Routes, Route, and Link."
    },
    {
      "id": "B",
      "text": "`<BrowserRouter>` (routing context), `<Routes>` (groups definitions), `<Route>` (path to element), and `<Link>`/`<NavLink>` (navigation).",
      "isCorrect": true,
      "explanation": "Correct. These compose the router: context at the top, a matcher, path-to-element mappings, and navigation links."
    },
    {
      "id": "C",
      "text": "`<SqlRouter>`, `<MongoRouter>`, `<RedisRouter>`, and `<KafkaRouter>` for data routing.",
      "isCorrect": false,
      "explanation": "Tempting as a backend-flavored distractor, but these are invented; React Router routes URLs to views, not data stores."
    },
    {
      "id": "D",
      "text": "There is only a single monolithic `<App>` component and no other routing primitives.",
      "isCorrect": false,
      "explanation": "Tempting as an oversimplification, but React Router is explicitly composed of several primitives working together."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React Router is built from a few composable pieces. `<BrowserRouter>` sits at the top and provides routing context backed by the History API. `<Routes>` groups route definitions and renders the best match. Each `<Route>` maps a path to the element to render. `<Link>` and `<NavLink>` perform client-side navigation without a full reload, with `NavLink` adding active-state styling.\n\nTogether they keep the URL and the rendered view in sync: a `<Link>` updates the URL through the router, `<Routes>` picks the matching `<Route>`, and the element renders, all without the browser fetching a new document.\n\nThe nuance an interviewer probes: these are React Router primitives, not framework-agnostic. In Next.js App Router you do not use `<BrowserRouter>` or `<Routes>`; routing comes from the file system and navigation from the framework's own `<Link>`.",
  "interviewLine": "React Router composes `<BrowserRouter>` for context, `<Routes>` and `<Route>` for matching paths to elements, and `<Link>`/`<NavLink>` for client navigation; in Next.js App Router I use file-based routes and the framework's own Link instead.",
  "misconception": "Assuming these primitives are universal, when they are React Router specific and have no place in a Next.js App Router project.",
  "hints": [
    "Ask which component provides routing context at the top of the tree.",
    "Which piece matches a URL to an element, and which triggers navigation?",
    "Would any of these appear in a Next.js App Router project?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice BrowserRouter wraps the app, Routes matches, and Link navigates without a reload.",
    "language": "tsx",
    "code": "import { BrowserRouter, Routes, Route, Link } from \"react-router-dom\";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Link to=\"/about\">About</Link>\n      <Routes>\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
  }
},
{
  "id": "react-explain-the-lifecycle-methods-of-components",
  "title": "Explain the Lifecycle Methods of Components",
  "prompt": "Explain the Lifecycle Methods of Components, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Backend database triggers that execute automatically on SQL server tables.",
      "isCorrect": false,
      "explanation": "Tempting as a lifecycle-sounding analogy, but these methods run in the React component tree, not on a database."
    },
    {
      "id": "B",
      "text": "Network packet filters used to configure firewall rules on the host.",
      "isCorrect": false,
      "explanation": "Tempting as a systems distractor, but lifecycle methods are about a component's render phases, not networking."
    },
    {
      "id": "C",
      "text": "Methods invoked across a component's life: Mounting (creation/insertion), Updating (prop/state changes), and Unmounting (removal).",
      "isCorrect": true,
      "explanation": "Correct. They mark the mount, update, and unmount stages where setup, response, and cleanup happen."
    },
    {
      "id": "D",
      "text": "Methods that only execute when the user physically shuts down their computer.",
      "isCorrect": false,
      "explanation": "Tempting as a literal \"end of life\" reading, but unmount runs when the component leaves the tree, not on shutdown."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Lifecycle methods are the hooks a class component exposes at each stage of its life. Mounting runs `constructor`, `render`, and `componentDidMount`. Updating runs `render` again plus `componentDidUpdate` when props or state change. Unmounting runs `componentWillUnmount` for cleanup. Each is a specific point where you can run setup, respond to changes, or tear down.\n\nThe practical mapping is setup on mount (subscribe, fetch), react to updates, clean up on unmount (unsubscribe, cancel). Skipping cleanup leaks subscriptions and timers.\n\nThe nuance an interviewer probes: function components replace these methods with `useEffect`, where the effect body is mount/update work and its returned function is unmount/pre-update cleanup. Several older methods (`componentWillMount`, `componentWillReceiveProps`) are deprecated as unsafe, so citing them as current practice is a red flag.",
  "interviewLine": "Lifecycle methods mark mount, update, and unmount in class components, which is where I subscribe, respond to changes, and clean up; in function components a single `useEffect` with its cleanup covers the same stages.",
  "misconception": "Citing deprecated methods like `componentWillMount` as current, when modern React uses `useEffect` in function components for the same mount, update, and cleanup work.",
  "hints": [
    "Group the methods by the three phases a component passes through.",
    "Which phase is where you clean up subscriptions, and what happens if you skip it?",
    "How does `useEffect` map onto mount, update, and unmount?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice one useEffect with cleanup replaces componentDidMount plus componentWillUnmount.",
    "language": "tsx",
    "code": "function Timer() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setN((v) => v + 1), 1000);\n    return () => clearInterval(id); // unmount cleanup\n  }, []);\n  return <span>{n}</span>;\n}"
  }
},
{
  "id": "react-explain-the-methods-used-in-mounting-phase-of-component",
  "title": "Explain the Methods Used in Mounting Phase of Components",
  "prompt": "Explain the Methods Used in Mounting Phase of Components, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`componentWillUnmount()` and `componentDidCatch()` run during mounting.",
      "isCorrect": false,
      "explanation": "Tempting because they are real methods, but `componentWillUnmount` runs on unmount and `componentDidCatch` on errors, not at mount."
    },
    {
      "id": "B",
      "text": "`deleteComponent()` and `purgeMemory()` run to prepare the component.",
      "isCorrect": false,
      "explanation": "Tempting as cleanup-sounding names, but these methods do not exist in React's lifecycle."
    },
    {
      "id": "C",
      "text": "`constructor()`, `getDerivedStateFromProps()`, `render()`, then `componentDidMount()`.",
      "isCorrect": true,
      "explanation": "Correct. These run in order during mounting, with side effects deferred to `componentDidMount`."
    },
    {
      "id": "D",
      "text": "`shouldComponentUpdate()` and `componentDidUpdate()` run during mounting.",
      "isCorrect": false,
      "explanation": "Tempting because they are update-phase methods, but they fire on updates, not during the initial mount."
    }
  ],
  "correctAnswer": "C",
  "explanation": "The mounting phase of a class component runs, in order: `constructor` (initialize state and bind methods), `getDerivedStateFromProps` (a static method to sync state from props, rarely needed), `render` (return the JSX), and `componentDidMount` (run side effects now that the DOM exists).\n\nThe ordering matters. `render` must stay pure and cannot touch the DOM or start requests; `componentDidMount` is the first point where the real DOM is present, so that is where you fetch data, start subscriptions, or measure nodes.\n\nThe nuance an interviewer probes: `getDerivedStateFromProps` is static, so it has no `this` and cannot cause side effects, and it is a frequent misuse, most \"sync prop to state\" needs are better solved by deriving during render or lifting state. In function components, the mount side-effect work goes in a `useEffect` with an empty dependency array.",
  "interviewLine": "Mounting runs `constructor`, `getDerivedStateFromProps`, `render`, then `componentDidMount`, and I keep side effects out of `render`, putting fetches and subscriptions in `componentDidMount` or a mount `useEffect`.",
  "misconception": "Mixing update- or unmount-phase methods into mounting, or doing side effects in `render` instead of `componentDidMount`.",
  "hints": [
    "List the mount methods in the order React calls them.",
    "Which one is the first place the real DOM exists, so side effects belong there?",
    "Which listed methods actually belong to the update or unmount phase?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the empty-array useEffect is the function-component equivalent of componentDidMount.",
    "language": "tsx",
    "code": "function Profile({ id }: { id: string }) {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => {\n    fetchUser(id).then(setUser); // mount side effect\n  }, []);\n  return <span>{user?.name ?? \"Loading\"}</span>;\n}"
  }
},
{
  "id": "react-what-are-react-fragments",
  "title": "What are React Fragments?",
  "prompt": "What are React Fragments?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Database shards stored inside the browser's IndexedDB for offline access.",
      "isCorrect": false,
      "explanation": "Tempting because \"fragment\" suggests partitioned data, but Fragments group render-tree siblings, not stored shards."
    },
    {
      "id": "B",
      "text": "A built-in component (`<React.Fragment>` or `<>...</>`) that groups siblings without adding a wrapper node to the DOM.",
      "isCorrect": true,
      "explanation": "Correct. It meets the single-root rule while rendering only its children, leaving the DOM free of extra containers."
    },
    {
      "id": "C",
      "text": "Micro-frontend bundles loaded dynamically from a CDN at runtime on demand.",
      "isCorrect": false,
      "explanation": "Tempting if you think of code splitting, but that is `lazy`/`import()`; a Fragment is a render-tree grouping primitive."
    },
    {
      "id": "D",
      "text": "Broken components left behind after an uncaught JavaScript error crashes a render.",
      "isCorrect": false,
      "explanation": "Tempting if you read \"fragment\" as damage, but it is an intentional grouping tool, unrelated to crashes."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React Fragments are a built-in component that groups multiple sibling elements under a single parent in the component tree without rendering any wrapper node in the DOM. You write them as `<React.Fragment>...</React.Fragment>` or the shorthand `<>...</>`.\n\nThey exist because a component must return one root, and wrapping siblings in a `<div>` just to satisfy that rule adds a DOM node that can break semantic markup and layout systems like flexbox, grid, and table structure.\n\nThe nuance an interviewer probes: the shorthand accepts no props, so a list of grouped siblings needs the explicit `<React.Fragment key={id}>` form, since `key` is the only prop a Fragment takes.",
  "interviewLine": "React Fragments group siblings under one root without adding a DOM node, keeping semantic and flex or grid layouts intact; I use the keyed `React.Fragment` form inside a list.",
  "misconception": "Thinking you must wrap grouped siblings in a visible element, when a Fragment groups them while emitting no DOM node.",
  "hints": [
    "Recall the rule limiting how many roots a component may return.",
    "What is the downside of satisfying that rule with a `<div>`?",
    "Which Fragment form do you need when the group sits inside a `.map()`?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the Fragment lets the component return two headings without an enclosing div.",
    "language": "tsx",
    "code": "function Heading() {\n  return (\n    <>\n      <h1>Title</h1>\n      <h2>Subtitle</h2>\n    </>\n  );\n}"
  }
},
{
  "id": "react-how-to-use-styles-in-reactjs",
  "title": "How to Use Styles in ReactJS?",
  "prompt": "How to Use Styles in ReactJS?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Styles can only be applied by editing the browser's underlying C++ source code.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but styling happens in CSS and JavaScript at the app layer, never in the engine's source."
    },
    {
      "id": "B",
      "text": "CSS Modules, global stylesheets, inline style objects, utility CSS like Tailwind, or CSS-in-JS like styled-components.",
      "isCorrect": true,
      "explanation": "Correct. React is unopinionated and supports all of these, each with its own scoping and runtime trade-offs."
    },
    {
      "id": "C",
      "text": "React components can only be styled using legacy Adobe Flash animation files.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible-sounding legacy claim, but Flash is dead; React styling uses CSS and JavaScript objects."
    },
    {
      "id": "D",
      "text": "React strictly prohibits the use of any external CSS files in a production build.",
      "isCorrect": false,
      "explanation": "Tempting if you overgeneralize bundling, but imported CSS and CSS Modules are standard production practice."
    }
  ],
  "correctAnswer": "B",
  "explanation": "React accepts several styling approaches rather than mandating one. CSS Modules import a `styles` object and scope class names locally. Global CSS stylesheets apply classes through `className`. Inline styles take a JavaScript object on the `style` prop with camelCased keys. Utility CSS like Tailwind composes prebuilt classes, and CSS-in-JS libraries like styled-components generate styles from JavaScript.\n\nEach has trade-offs: CSS Modules give scoping with no runtime cost, inline styles are dynamic but cannot express pseudo-classes or media queries, Tailwind trades verbose markup for a tiny cacheable stylesheet, and CSS-in-JS co-locates dynamic styles at a runtime price.\n\nThe nuance an interviewer probes: the `style` prop takes an object, not a string, and keys are camelCased (`backgroundColor`, not `background-color`), because it maps to the element's DOM style properties.",
  "interviewLine": "React supports CSS Modules, global stylesheets, inline style objects, Tailwind, and CSS-in-JS; I pick by trade-off and remember the `style` prop takes a camelCased object, not a string.",
  "misconception": "Passing a CSS string to the `style` prop, when it expects a JavaScript object with camelCased property names.",
  "hints": [
    "Count the distinct ways you have styled a React component in practice.",
    "What type and key casing does the `style` prop expect?",
    "Which approach cannot express `:hover` or a media query, and why?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the inline style uses a camelCased object while the scoped class comes from a CSS Module.",
    "language": "tsx",
    "code": "import styles from \"./Alert.module.css\";\n\nfunction Alert({ urgent }: { urgent: boolean }) {\n  return (\n    <div className={styles.alert} style={{ borderColor: urgent ? \"red\" : \"gray\" }}>\n      Heads up\n    </div>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-strict-mode-in-react",
  "title": "What is the Strict Mode in React?",
  "prompt": "What is the Strict Mode in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A TypeScript compiler rule that forbids the use of `any` types throughout the codebase.",
      "isCorrect": false,
      "explanation": "Tempting because \"strict\" overlaps with TypeScript, but `React.StrictMode` is a runtime dev wrapper, not a compiler rule."
    },
    {
      "id": "B",
      "text": "A development-only helper that double-invokes renders and effects to catch impure side effects and warns on deprecated APIs.",
      "isCorrect": true,
      "explanation": "Correct. It runs certain functions twice in development to expose impurity and missing cleanup, and flags legacy APIs."
    },
    {
      "id": "C",
      "text": "A security sandbox that blocks every external HTTP network request made by the application.",
      "isCorrect": false,
      "explanation": "Tempting as a safety-flavored option, but Strict Mode does no network sandboxing; it is a correctness aid."
    },
    {
      "id": "D",
      "text": "A production optimization flag that disables all error throwing to keep the site from crashing.",
      "isCorrect": false,
      "explanation": "Tempting if \"strict\" sounds protective, but it is development-only and adds checks; it never suppresses errors in production."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`<React.StrictMode>` is a development-only wrapper that surfaces latent bugs. It double-invokes component renders, effect setups, and state updaters, running them twice so impure logic or missing effect cleanup becomes obvious, and it warns about deprecated and unsafe legacy APIs.\n\nThe benefit is catching problems early that would otherwise appear only under concurrent features: an effect that forgets to unsubscribe, or a render that mutates shared state. Seeing it break twice in development is the signal.\n\nThe nuance an interviewer probes: Strict Mode does nothing in production builds; the double-invocation is stripped. So \"my effect runs twice in dev\" is the tool working, telling you cleanup must be idempotent, not a bug to suppress by removing Strict Mode.",
  "interviewLine": "I treat Strict Mode as a dev-only wrapper that double-invokes renders and effects to flush out impurity and missing cleanup, and warns on legacy APIs; it is stripped from production, so I read the double run as the tool doing its job.",
  "misconception": "Treating the development double-invocation as a defect, when it is intentional, dev-only, and designed to expose impure renders and missing cleanup.",
  "hints": [
    "Ask whether this wrapper has any effect in a production build.",
    "Why would React deliberately run effect setup and cleanup twice in development?",
    "If an effect misbehaves on the second run, what does that reveal about its cleanup?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
  "example": {
    "caption": "Notice StrictMode wraps the tree only to add dev checks; it renders nothing of its own.",
    "language": "tsx",
    "code": "import { StrictMode } from \"react\";\nimport { createRoot } from \"react-dom/client\";\n\ncreateRoot(document.getElementById(\"root\")!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);"
  }
},
{
  "id": "react-how-does-react-handle-concurrency",
  "title": "How does React Handle Concurrency?",
  "prompt": "How does React Handle Concurrency?",
  "level": "senior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "senior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "React executes all component rendering on background GPU threads written in C++.",
      "isCorrect": false,
      "explanation": "Tempting because \"concurrency\" suggests threads, but React renders on the single main thread; concurrency here means interruptible scheduling."
    },
    {
      "id": "B",
      "text": "React's scheduler breaks rendering into interruptible slices, prioritizing urgent updates over non-urgent transitions.",
      "isCorrect": true,
      "explanation": "Correct. It yields between slices so urgent work preempts heavy transition work on the same thread."
    },
    {
      "id": "C",
      "text": "React sends all state updates to a remote server queue to be processed sequentially.",
      "isCorrect": false,
      "explanation": "Tempting as a distributed model, but scheduling is in-browser; no server orders React's updates."
    },
    {
      "id": "D",
      "text": "React drops all non-urgent updates completely and never renders them at all.",
      "isCorrect": false,
      "explanation": "Tempting if you equate low priority with discarded, but non-urgent work still renders; it is just interruptible and deferred."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Concurrent React makes rendering interruptible. The scheduler splits work into units it can pause and resume, so a high-priority update, typing or a click, can interrupt a long-running low-priority render and run first, then the interrupted work continues.\n\nYou mark work as low priority with `startTransition` or defer a value with `useDeferredValue`. React keeps the urgent interaction responsive while the heavy transition renders in the background, and if newer urgent input arrives, it can throw away stale in-progress work.\n\nThe nuance an interviewer probes: this is cooperative scheduling on the single main thread, not multithreading. React yields back to the browser between slices; it does not render on worker or GPU threads, and transitions reprioritize work rather than making it inherently faster.",
  "interviewLine": "I explain that React's scheduler slices rendering into interruptible units on the main thread, so urgent updates preempt transitions I mark with `startTransition` or `useDeferredValue`; it is cooperative scheduling, not multithreading.",
  "misconception": "Picturing concurrency as multithreaded rendering, when it is cooperative, interruptible scheduling on the single main thread.",
  "hints": [
    "Ask whether React actually renders on more than one thread.",
    "What lets an urgent click interrupt a long low-priority render?",
    "Does a transition make the work faster, or just reprioritized?"
  ],
  "source": "150-react",
  "estimatedMinutes": 4,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice startTransition marks the heavy update low-priority so the input stays responsive while it renders.",
    "language": "tsx",
    "code": "function Filter({ all }: { all: string[] }) {\n  const [input, setInput] = useState(\"\");\n  const [list, setList] = useState(all);\n  const [isPending, startTransition] = useTransition();\n  function onChange(e: React.ChangeEvent<HTMLInputElement>) {\n    setInput(e.target.value);\n    startTransition(() => setList(all.filter((s) => s.includes(e.target.value))));\n  }\n  return <input value={input} onChange={onChange} />;\n}"
  }
},
{
  "id": "react-how-does-react-handle-server-side-rendering-ssr",
  "title": "How does React Handle Server-Side Rendering (SSR)?",
  "prompt": "How does React Handle Server-Side Rendering (SSR)?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Renders components to HTML on the server per request (`renderToString`/`renderToPipeableStream`), sends it for fast FCP/SEO, then hydrates on the client.",
      "isCorrect": true,
      "explanation": "Correct. The server emits ready HTML for speed and crawlers, and the client hydrates it into an interactive app."
    },
    {
      "id": "B",
      "text": "Compiles React components into WebAssembly shaders on the server before responding to each browser request.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level-sounding option, but SSR produces HTML strings or streams, not WebAssembly or shaders."
    },
    {
      "id": "C",
      "text": "Pre-renders every page's HTML only once at build time, after which it never changes on a per-request basis.",
      "isCorrect": false,
      "explanation": "Tempting because it is adjacent, but that describes static generation; SSR renders fresh HTML on each request."
    },
    {
      "id": "D",
      "text": "Executes all client-side mouse clicks and keystrokes on the backend server over a satellite connection.",
      "isCorrect": false,
      "explanation": "Tempting as a server-flavored distractor, but SSR renders HTML; it does not run user interactions remotely."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React renders components to HTML on the server using APIs like `renderToString` or the streaming `renderToPipeableStream`. For each request it produces markup the browser can paint immediately, which improves First Contentful Paint and gives crawlers real content. The client then loads React and hydrates that HTML, attaching event listeners to make it interactive.\n\nStreaming matters at scale: `renderToPipeableStream` sends HTML in chunks as it is ready, so the browser starts rendering before the whole tree finishes, and Suspense boundaries let slower parts stream in later.\n\nThe nuance an interviewer probes: SSR renders per request, distinct from static generation that renders once at build time. Per-request rendering suits personalized or fresh data but costs server work on every hit, so you balance it against static or cached strategies.",
  "interviewLine": "React renders to HTML on the server per request with `renderToString` or streaming `renderToPipeableStream`, giving fast first paint and SEO, then the client hydrates it; I weigh per-request cost against static rendering.",
  "misconception": "Conflating SSR with static generation, when SSR renders per request while static generation renders once at build time.",
  "hints": [
    "Ask what the server produces and sends before the client's JavaScript runs.",
    "What does streaming add over rendering the whole tree at once?",
    "How does rendering per request differ from building the HTML once?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/rendering",
  "example": {
    "caption": "Notice streaming sends HTML in chunks, so the browser paints before the full tree is ready.",
    "language": "tsx",
    "code": "import { renderToPipeableStream } from \"react-dom/server\";\n\nfunction handle(res: NodeResponse) {\n  const { pipe } = renderToPipeableStream(<App />, {\n    onShellReady() {\n      res.setHeader(\"content-type\", \"text/html\");\n      pipe(res);\n    },\n  });\n}"
  }
},
{
  "id": "react-what-are-forms-in-react",
  "title": "What are Forms in React?",
  "prompt": "What are Forms in React?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Cryptographic signature certificates issued by web servers for secure requests.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but forms are input collections for user data, not certificates."
    },
    {
      "id": "B",
      "text": "Input collections managed as controlled components (`value`/`onChange`) or uncontrolled components (`ref`/`defaultValue`).",
      "isCorrect": true,
      "explanation": "Correct. The defining choice is whether React state or the DOM owns each input's value."
    },
    {
      "id": "C",
      "text": "Database tables created and queried inside the browser's IndexedDB storage.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored option, but forms gather user input in the UI; they are not database tables."
    },
    {
      "id": "D",
      "text": "Static, non-interactive image screenshots of printed paper documents.",
      "isCorrect": false,
      "explanation": "Tempting if \"form\" evokes paperwork, but React forms are interactive input controls, not images."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Forms in React are collections of input controls, and the central decision is how each input's value is managed. A controlled input stores its value in React state and updates through `value` and `onChange`, making React the source of truth. An uncontrolled input keeps its value in the DOM and exposes it through a `ref` and `defaultValue`.\n\nControlled inputs enable per-keystroke validation, formatting, and conditional disabling because the value lives in your component. Uncontrolled inputs are lighter and closer to plain HTML, and they are handy for simple forms or integrating non-React code.\n\nThe nuance an interviewer probes: React 19 adds form actions, a `<form action={fn}>` can receive the submitted `FormData` and run server or client actions, and hooks like `useFormStatus` and `useActionState` streamline pending and result handling, reducing the manual wiring older controlled forms required.",
  "interviewLine": "I treat React forms as input collections that are either controlled, with the value in state via `value`/`onChange`, or uncontrolled, with the value in the DOM via `ref`; in React 19 I layer form actions and hooks like `useActionState` on top.",
  "misconception": "Thinking React forms are a single mechanism, when each input is either controlled (state-owned) or uncontrolled (DOM-owned), and React 19 adds form actions on top.",
  "hints": [
    "Ask where each input's current value actually lives.",
    "What does controlling the value in state let you do on every keystroke?",
    "What did React 19 add to simplify form submission handling?"
  ],
  "source": "150-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the React 19 form action receives FormData directly, replacing manual onSubmit wiring.",
    "language": "tsx",
    "code": "function Signup() {\n  async function register(formData: FormData) {\n    await createUser(formData.get(\"email\") as string);\n  }\n  return (\n    <form action={register}>\n      <input name=\"email\" type=\"email\" />\n      <button>Join</button>\n    </form>\n  );\n}"
  }
},
{
  "id": "react-error-boundaries-catching-render-time-failures-and-repo",
  "title": "Error Boundaries: Catching Render-Time Failures and Reporting",
  "prompt": "Error Boundaries: Catching Render-Time Failures and Reporting, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Error boundaries automatically catch async errors inside `setTimeout` and event handlers as well as render errors.",
      "isCorrect": false,
      "explanation": "Tempting if you expect them to catch everything, but they only catch render, lifecycle, and constructor errors; async and handler errors need `try`/`catch`."
    },
    {
      "id": "B",
      "text": "Error boundaries are function components built with a `useErrorBoundary` hook from React core.",
      "isCorrect": false,
      "explanation": "Tempting as a modern-sounding API, but no such core hook exists; boundaries are class components, or a library wrapper."
    },
    {
      "id": "C",
      "text": "Class components using `getDerivedStateFromError` (fallback UI) and `componentDidCatch` (logging) that catch render and lifecycle errors in child subtrees.",
      "isCorrect": true,
      "explanation": "Correct. Those lifecycle methods let the boundary intercept subtree errors and swap in a fallback instead of crashing the app."
    },
    {
      "id": "D",
      "text": "Error boundaries prevent TypeScript syntax errors in your code at compile time before the app runs.",
      "isCorrect": false,
      "explanation": "Tempting if \"error\" blurs with the type system, but boundaries are a runtime mechanism; compile-time errors are the compiler's job."
    }
  ],
  "correctAnswer": "C",
  "explanation": "An error boundary is a class component that implements `static getDerivedStateFromError` to render fallback UI and `componentDidCatch` to log the error. It catches JavaScript errors thrown during rendering, in lifecycle methods, and in constructors of the components in its subtree, keeping one broken widget from unmounting the whole app.\n\n`getDerivedStateFromError` runs in the render phase and must be pure, it only computes fallback state; `componentDidCatch` runs in the commit phase and is where you report to a service like Sentry.\n\nThe nuance an interviewer probes: boundaries do not catch errors in event handlers, async callbacks, SSR, or in the boundary itself. There is still no hook form, so you either write the class or use a library like `react-error-boundary` for a friendlier API.",
  "interviewLine": "An error boundary is a class with `getDerivedStateFromError` and `componentDidCatch` that catches render-phase errors in its subtree and shows a fallback; event-handler and async errors fall outside it, so I still wrap those in `try`/`catch`.",
  "misconception": "Expecting a boundary to catch handler and async errors, when it only intercepts errors thrown during render, lifecycle, and construction.",
  "hints": [
    "Ask which two lifecycle methods a boundary must implement and when each runs.",
    "If an error throws inside an `onClick` or a `setTimeout`, will the boundary see it?",
    "Is there a built-in hook form, or must it still be a class?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice logging happens in componentDidCatch while getDerivedStateFromError only sets fallback state.",
    "language": "tsx",
    "code": "class RouteBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {\n  state = { error: null as Error | null };\n  static getDerivedStateFromError(error: Error) {\n    return { error };\n  }\n  componentDidCatch(error: Error, info: React.ErrorInfo) {\n    reportToSentry(error, info);\n  }\n  render() {\n    return this.state.error ? <Fallback /> : this.props.children;\n  }\n}"
  }
},
{
  "id": "react-keys-revisited-more-examples-and-anti-patterns",
  "title": "Keys Revisited: More Examples and Anti-Patterns",
  "prompt": "Keys Revisited: More Examples and Anti-Patterns, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Keys must be regenerated as random `Math.random()` values on every single render for uniqueness.",
      "isCorrect": false,
      "explanation": "Tempting because random values are unique, but a new key each render never matches the last, forcing React to remount every item."
    },
    {
      "id": "B",
      "text": "Keys control the visual typography and styling of the list's bullet points.",
      "isCorrect": false,
      "explanation": "Tempting because both concern lists, but styling is CSS; a key is a reconciliation identity React consumes internally."
    },
    {
      "id": "C",
      "text": "Keys are required only for server-side database indexing of the rendered rows.",
      "isCorrect": false,
      "explanation": "Tempting due to the shared term, but keys are a client-side React concern with no connection to a database index."
    },
    {
      "id": "D",
      "text": "Keys give elements stable identity; anti-patterns include index keys on dynamic lists and random keys that force continuous remounts.",
      "isCorrect": true,
      "explanation": "Correct. Stable data-derived keys preserve identity, while indices on reordering lists and per-render random keys corrupt it."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Keys give list elements a stable identity so React can match them across renders and reuse DOM nodes on insertion, deletion, and reorder. Good keys come from the data's own identity, a database id, and stay the same for the same logical item over time.\n\nTwo anti-patterns break this. Using the array index as a key on a list that reorders or has items inserted makes React map stale state to the wrong row. Generating a fresh `Math.random()` key every render is worse: the key never matches the previous render, so React remounts every item on each render, destroying state and killing performance.\n\nThe nuance an interviewer probes: the index is acceptable only when the list is static, never reordered, filtered, or inserted into. The moment order can change, index keys produce subtle state-bleed bugs that are hard to trace.",
  "interviewLine": "I key lists by stable data identity; array indices are fine only for static lists, and a fresh `Math.random()` key each render is the worst case because it remounts every item.",
  "misconception": "Reaching for `Math.random()` or the array index as a key, when random keys remount everything and index keys bleed state across a reordering list.",
  "hints": [
    "Ask what a key must stay the same across for React to reuse a node.",
    "What happens on the next render if the key was `Math.random()` this render?",
    "When is an index key actually safe, and when does it bleed state?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice the random key changes every render, so React remounts the input and loses its value each time.",
    "language": "tsx",
    "code": "function Bad({ items }: { items: string[] }) {\n  // Anti-pattern: key differs every render, remounting each row and wiping input state.\n  return <>{items.map((it) => <input key={Math.random()} defaultValue={it} />)}</>;\n}"
  }
},
{
  "id": "react-why-jsx-needs-transpilation-and-build-tools",
  "title": "Why JSX Needs Transpilation and Build Tools",
  "prompt": "Why JSX Needs Transpilation and Build Tools, explain the behavior and mechanism.",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "JSX is a syntactic extension not natively understood by browser JavaScript engines; build tools (Babel, SWC) transpile JSX into standard `React.createElement` or `_jsx` calls.",
      "isCorrect": true,
      "explanation": "Correct. The engine runs only JavaScript, so a compiler must rewrite JSX tags into function calls first."
    },
    {
      "id": "B",
      "text": "Browsers natively parse JSX if saved with a `.jsx` extension.",
      "isCorrect": false,
      "explanation": "Tempting because the extension looks meaningful, but it is only a tooling hint; no engine parses JSX regardless of extension."
    },
    {
      "id": "C",
      "text": "Transpilation encrypts source code to prevent users from viewing HTML in DevTools.",
      "isCorrect": false,
      "explanation": "Tempting if you conflate build steps with obfuscation, but transpilation translates syntax; it does not encrypt or hide output."
    },
    {
      "id": "D",
      "text": "JSX is a binary machine code format that browsers execute in GPU hardware.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level distractor, but JSX is source text compiled to JavaScript, not machine code or a GPU format."
    }
  ],
  "correctAnswer": "A",
  "explanation": "JSX is a syntactic extension that no browser JavaScript engine understands. Before the code can run, a build tool, Babel or SWC, transpiles each tag into a standard function call: the classic `React.createElement(type, props, ...children)` or the automatic `_jsx(type, props)` from `react/jsx-runtime`.\n\nSo build tools are not optional for JSX. They convert the HTML-like syntax into ordinary JavaScript the engine can execute, and in modern setups they also handle TypeScript stripping, bundling, and the automatic JSX runtime import so you no longer need `React` in scope.\n\nThe nuance an interviewer probes: a `.jsx` extension does nothing at runtime; it is only a hint to tooling. The transpilation step is what matters, which is why you can also write React with no JSX at all by calling `React.createElement` directly.",
  "interviewLine": "I note that browsers understand only JavaScript, so Babel or SWC transpiles JSX into `React.createElement` or `_jsx` calls; the file extension is irrelevant, and I could skip JSX entirely by writing those calls myself.",
  "misconception": "Thinking a `.jsx` extension lets browsers run JSX, when the engine understands only JavaScript and a transpiler must convert the tags first.",
  "hints": [
    "Ask what the JavaScript engine can and cannot parse on its own.",
    "Does renaming a file to `.jsx` change what the browser can execute?",
    "What do the tags actually become after the build step?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the same UI written without JSX needs no transpilation of tags, only the createElement calls.",
    "language": "tsx",
    "code": "// JSX source:\nconst a = <button className=\"go\">Go</button>;\n// Transpiles to plain JavaScript the engine can run:\nconst b = React.createElement(\"button\", { className: \"go\" }, \"Go\");"
  }
},
{
  "id": "react-strictmode-why-run-extra-checks-in-development",
  "title": "StrictMode: Why Run Extra Checks in Development",
  "prompt": "StrictMode: Why Run Extra Checks in Development, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "StrictMode is a TypeScript compiler setting that forbids the use of `any` types in the project.",
      "isCorrect": false,
      "explanation": "Tempting because \"strict\" overlaps with TypeScript, but this is a runtime React dev wrapper, not a compiler setting."
    },
    {
      "id": "B",
      "text": "StrictMode encrypts JSX elements with AES-256 while they are held in memory during rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but Strict Mode runs diagnostic checks; it performs no encryption."
    },
    {
      "id": "C",
      "text": "StrictMode disables all error logging in production builds to speed up initial page loads.",
      "isCorrect": false,
      "explanation": "Tempting if \"strict\" sounds like trimming, but it is development-only and adds checks; it changes nothing in production."
    },
    {
      "id": "D",
      "text": "StrictMode runs in development to surface impure renders and missing cleanups by double-invoking renders and effects, warning on deprecated APIs.",
      "isCorrect": true,
      "explanation": "Correct. The intentional double run exposes impurity and incomplete cleanup before concurrent features would."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Strict Mode runs extra checks in development to catch bugs that would otherwise surface only under concurrent rendering. It intentionally double-invokes component render functions, effect setups, and state updaters, so impure logic or an effect that forgets to clean up reveals itself immediately, and it warns about deprecated and unsafe APIs.\n\nThe reason it only runs in development is that these are diagnostic checks, not behavior. React strips the double-invocation from production builds, so there is no runtime cost to users.\n\nThe nuance an interviewer probes: the double render and double effect are the point, not a bug. If your effect misbehaves on the second run, your cleanup is incomplete; the correct response is to make the effect idempotent, not to delete Strict Mode.",
  "interviewLine": "Strict Mode double-invokes renders and effects in development to expose impurity and missing cleanup before concurrent features would, and it is stripped from production, so I fix the effect rather than remove the wrapper.",
  "misconception": "Reading the development double-invocation as a bug to silence, when it is a deliberate diagnostic that reveals impure renders and missing effect cleanup.",
  "hints": [
    "Ask what Strict Mode does in a production build versus development.",
    "Why does running an effect's setup and cleanup twice expose real bugs?",
    "If the second run breaks, is the fix to remove Strict Mode or to fix cleanup?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
  "example": {
    "caption": "Notice the symmetric cleanup makes the effect survive Strict Mode's double-invoke with no duplicate subscription.",
    "language": "tsx",
    "code": "function Presence({ channel }: { channel: Channel }) {\n  useEffect(() => {\n    channel.subscribe();\n    return () => channel.unsubscribe(); // idempotent under double-invoke\n  }, [channel]);\n  return null;\n}"
  }
},
{
  "id": "react-graceful-error-handling-practical-approaches-for-robust",
  "title": "Graceful Error Handling: Practical Approaches for Robust Apps",
  "prompt": "Graceful Error Handling: Practical Approaches for Robust Apps, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Combine error boundaries at route and widget level with `try`/`catch` in handlers and inline error states for API queries.",
      "isCorrect": true,
      "explanation": "Correct. Layering boundaries, `try`/`catch`, and query error state covers render, handler, and fetch failures respectively."
    },
    {
      "id": "B",
      "text": "Force a full operating-system reboot whenever any component encounters a runtime error.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic reset, but rebooting the OS is absurd for a UI error; you contain it with a fallback instead."
    },
    {
      "id": "C",
      "text": "Silence every error completely, with no logging and no fallback UI shown to anyone.",
      "isCorrect": false,
      "explanation": "Tempting as a way to hide crashes, but swallowing errors hides real failures from both users and your monitoring."
    },
    {
      "id": "D",
      "text": "Display the raw JavaScript stack trace directly to end users in a blocking `alert()` modal.",
      "isCorrect": false,
      "explanation": "Tempting as \"transparent,\" but raw stack traces confuse users and leak internals; show a friendly fallback and log the detail."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Robust error handling layers several mechanisms because no single one catches everything. Error boundaries wrap routes and risky widgets to render a fallback and report render-phase crashes to a service like Sentry. `try`/`catch` handles errors inside event handlers and async callbacks, which boundaries never see. And data fetching surfaces errors as inline UI state, an error view next to the component rather than a crash.\n\nThe payoff is containment: a failure in one widget shows a local fallback instead of blanking the page, and users see a meaningful message rather than a white screen or a raw stack trace.\n\nThe nuance an interviewer probes: match the tool to where the error originates. Boundaries for render, `try`/`catch` for handlers and promises, and query-level error state for fetches; mixing these up leaves whole categories of errors uncaught.",
  "interviewLine": "I layer error boundaries around routes and widgets for render crashes, `try`/`catch` for handlers and async code, and inline error states for data fetches, so a single failure shows a local fallback instead of blanking the page.",
  "misconception": "Relying on one mechanism for all errors, when render crashes, handler errors, and fetch failures each need a different tool.",
  "hints": [
    "Ask which errors a boundary can and cannot catch.",
    "What handles an error thrown inside an `onClick` or an awaited promise?",
    "How should a failed data fetch appear to the user, as a crash or a view?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the handler uses try/catch for an error a boundary would never catch.",
    "language": "tsx",
    "code": "function SaveButton({ save }: { save: () => Promise<void> }) {\n  const [error, setError] = useState<string | null>(null);\n  async function onClick() {\n    try {\n      await save();\n    } catch (e) {\n      setError(\"Could not save. Try again.\");\n    }\n  }\n  return <>{error && <p role=\"alert\">{error}</p>}<button onClick={onClick}>Save</button></>;\n}"
  }
},
{
  "id": "react-conditional-rendering-patterns-that-scale-and-stay-read",
  "title": "Conditional Rendering, Patterns That Scale and Stay Readable",
  "prompt": "Conditional Rendering, Patterns That Scale and Stay Readable, explain the behavior and mechanism.",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Wrap every conditional element in a permanent `display: none` CSS rule and toggle it with classes.",
      "isCorrect": false,
      "explanation": "Tempting as a CSS-only approach, but it keeps all elements mounted and their state alive; conditional rendering actually omits them from the tree."
    },
    {
      "id": "B",
      "text": "Conditional rendering is prohibited in React and must be avoided entirely.",
      "isCorrect": false,
      "explanation": "Tempting if you misremember a rule, but conditional rendering is a core, encouraged pattern built on plain JavaScript."
    },
    {
      "id": "C",
      "text": "Use ten levels of deeply nested ternary operators inside a single JSX expression for all branching.",
      "isCorrect": false,
      "explanation": "Tempting because ternaries are inline, but deep nesting is exactly the anti-pattern that destroys readability."
    },
    {
      "id": "D",
      "text": "Early `if`/`return` guards for full sections, ternaries for simple inline choices, lookup maps for multi-status states, and avoid deep nesting.",
      "isCorrect": true,
      "explanation": "Correct. Matching the construct to the branch shape keeps the logic flat and readable."
    }
  ],
  "correctAnswer": "D",
  "explanation": "As conditions multiply, the pattern should match the shape of the branch. An early `if`/`return` guard reads cleanest for whole-section branches, loading or error states that short-circuit the rest of the component. A ternary is fine for a single inline either-or. For a value with several discrete states, an object lookup map (`{ idle: ..., loading: ..., error: ... }[status]`) stays flat and extensible.\n\nThe goal is readability: a reader should see the branch structure at a glance. Deeply nested ternaries hide the logic, so once you reach a second level of nesting, switch to guards or a lookup.\n\nThe nuance an interviewer probes: these are style choices, not different mechanisms, it is all JavaScript, but the choice affects maintainability. A status-to-element map also removes the risk of forgetting a case that a chain of ternaries invites.",
  "interviewLine": "I use early returns for whole-section branches, ternaries for simple inline choices, and a status-to-element lookup map for multi-state values, avoiding nested ternaries so the branch structure stays obvious.",
  "misconception": "Forcing every condition into one construct, when guards, ternaries, and lookup maps each suit a different branch shape and deep ternary nesting hurts readability.",
  "hints": [
    "Ask what shape each branch has: a whole section, a simple either-or, or many states.",
    "At what point does nesting ternaries start hiding the logic?",
    "How does a status-to-element map prevent forgetting a case?"
  ],
  "source": "150-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the lookup map keeps multi-state rendering flat where nested ternaries would obscure it.",
    "language": "tsx",
    "code": "function Status({ status }: { status: \"idle\" | \"loading\" | \"error\" | \"done\" }) {\n  const views = {\n    idle: <p>Ready</p>,\n    loading: <Spinner />,\n    error: <p role=\"alert\">Failed</p>,\n    done: <p>Complete</p>,\n  };\n  return views[status];\n}"
  }
},
{
  "id": "react-what-are-the-major-features-of-react",
  "title": "What are the major features of React?",
  "prompt": "What are the major features of React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Virtual DOM diffing, unidirectional data flow, component-based composition, JSX syntax, and server-side rendering support.",
      "isCorrect": true,
      "explanation": "Correct. These are React's core features, and together they define its declarative, composable model."
    },
    {
      "id": "B",
      "text": "Built-in two-way binding on all inputs, an integrated SQLite engine, and automatic runtime CSS minification.",
      "isCorrect": false,
      "explanation": "Tempting as a feature-rich list, but React has none of these; it is a view library with one-way data flow and no bundled database."
    },
    {
      "id": "C",
      "text": "Mandatory monolithic MVC controller classes with automatic active-record ORM mapping to a database.",
      "isCorrect": false,
      "explanation": "Tempting if you expect a full framework, but React imposes no MVC or ORM; it owns only the view layer."
    },
    {
      "id": "D",
      "text": "Direct GPU register manipulation that bypasses the browser's rendering engine entirely.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding claim, but React renders through the DOM; it never touches GPU registers directly."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React's defining features form a coherent model. A virtual DOM lets it diff element trees and apply minimal updates. Unidirectional data flow means state travels down as props and changes flow back up, which makes behavior predictable. Component-based composition builds UIs from small reusable pieces. JSX gives a declarative, HTML-like syntax that compiles to function calls. And it supports server-side rendering for fast first paint and SEO.\n\nTogether these let you describe what the UI should be for a given state and let React handle the imperative DOM work efficiently.\n\nThe nuance an interviewer probes: React is deliberately a view library, not a framework. It has no built-in two-way binding, no bundled database, and no mandatory architecture; those come from the surrounding ecosystem, which is a feature of its minimal, composable design, not a gap.",
  "interviewLine": "I list React's core features as a virtual DOM, one-way data flow, component composition, JSX, and SSR; I stress it is deliberately a view library, so two-way binding and data layers come from the ecosystem, not React itself.",
  "misconception": "Expecting React to ship framework features like two-way binding or a database, when it is a minimal view library and the rest comes from the ecosystem.",
  "hints": [
    "List what React itself provides versus what you add from the ecosystem.",
    "Does React include two-way binding or a database out of the box?",
    "Why is being a view library rather than a framework a design choice, not a gap?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice one-way flow: state lives in the parent and travels down as a prop, with changes flowing back via a callback.",
    "language": "tsx",
    "code": "function Toggle() {\n  const [on, setOn] = useState(false);\n  return <Switch on={on} onToggle={() => setOn((v) => !v)} />;\n}\n\nfunction Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {\n  return <button onClick={onToggle}>{on ? \"On\" : \"Off\"}</button>;\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-element-and-component",
  "title": "What is the difference between Element and Component?",
  "prompt": "What is the difference between Element and Component?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const element = React.createElement('div', { id: 'login-btn' }, 'Login');\n\n{\n  type: 'div',\n  props: {\n    children: 'Login',\n    id: 'login-btn'\n  }\n}\n\n<div id=\"login-btn\">Login</div>\n\nconst Button = ({ onLogin }) => (\n  <div id={'login-btn'} onClick={onLogin}>\n    Login\n  </div>\n);\n\nconst Button = ({ onLogin }) =>\n  React.createElement('div', { id: 'login-btn', onClick: onLogin }, 'Login');",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "An Element is an immutable plain JS object describing a DOM node (`{ type, props }`); a Component is a function or class that accepts props and returns an element tree.",
      "isCorrect": true,
      "explanation": "Correct. The element describes; the component produces elements when rendered."
    },
    {
      "id": "B",
      "text": "Components are immutable objects; Elements are ES6 classes containing lifecycle methods.",
      "isCorrect": false,
      "explanation": "Tempting because it uses real terms, but it inverts them: elements are the immutable objects and components are the functions or classes."
    },
    {
      "id": "C",
      "text": "There is no technical difference; Element and Component are exact synonyms in React.",
      "isCorrect": false,
      "explanation": "Tempting if the words blur together, but they are distinct: one is a description object, the other is a producer of descriptions."
    },
    {
      "id": "D",
      "text": "An Element is a live HTML DOM node in the browser; a Component is a static CSS stylesheet in memory.",
      "isCorrect": false,
      "explanation": "Tempting as a concrete-sounding split, but an element is a JavaScript description, not a DOM node, and a component is not CSS."
    }
  ],
  "correctAnswer": "A",
  "explanation": "An element and a component sit at different levels. An element is an immutable plain object of the shape `{ type, props }` that describes one node in the UI, it is what JSX and `React.createElement` produce. A component is the function or class that accepts props and returns an element tree; calling or rendering a component yields elements.\n\nThe practical consequence is that elements are cheap, immutable descriptions you create constantly, while components are the reusable logic. You render a component (`<Button />`), and React invokes it to get the elements it describes.\n\nThe nuance an interviewer probes: an element is not the DOM node and not the component. Confusing them produces errors like rendering `Button` (the function) where an element `<Button />` is expected, or treating an element as if you could mutate it, when elements are frozen descriptions.",
  "interviewLine": "I draw the line as: an element is an immutable `{ type, props }` description, what JSX produces, while a component is the function or class that returns elements when React renders it; the element is neither the component nor the DOM node.",
  "misconception": "Treating element and component as the same thing, when an element is an immutable description object and a component is the function or class that returns elements.",
  "hints": [
    "Ask which one you can call and which one is just data.",
    "What does `React.createElement` return, a component or an element?",
    "Why can't you mutate an element after creating it?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice calling the component is wrong; you pass the element <Hello /> and let React invoke it.",
    "language": "tsx",
    "code": "function Hello({ name }: { name: string }) {\n  return <h1>Hello {name}</h1>; // component returns an element\n}\n\nconst element = <Hello name=\"Ada\" />; // an immutable { type: Hello, props: { name } } object\nconst root = <main>{element}</main>;"
  }
},
{
  "id": "react-how-to-create-components-in-react",
  "title": "How to create components in React?",
  "prompt": "How to create components in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "function Greeting({ message }) {\n  return <h1>{`Hello, ${message}`}</h1>;\n}\n\nclass Greeting extends React.Component {\n  render() {\n    return <h1>{`Hello, ${this.props.message}`}</h1>;\n  }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "By registering XML tags in a browser window registry via `window.registerComponent()`.",
      "isCorrect": false,
      "explanation": "Tempting as an official-sounding API, but no such registry exists; components are just functions or classes."
    },
    {
      "id": "B",
      "text": "As function components (functions receiving props and returning JSX) or class components (classes extending `React.Component` with `render()`).",
      "isCorrect": true,
      "explanation": "Correct. Those are the two definitions, both rendered as a capitalized JSX tag."
    },
    {
      "id": "C",
      "text": "By creating `.component` binary files compiled directly by the browser's operating-system kernel.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level distractor, but components are JavaScript, not binaries run by a kernel."
    },
    {
      "id": "D",
      "text": "Exclusively by writing raw SQL schema definitions inside a Node.js process.",
      "isCorrect": false,
      "explanation": "Tempting as a backend-flavored option, but SQL defines data; a React component is a function or class returning UI."
    }
  ],
  "correctAnswer": "B",
  "explanation": "There are two ways to define a React component. A function component is a plain JavaScript function that receives a `props` object and returns JSX. A class component extends `React.Component` and returns JSX from a `render()` method. Both appear in JSX the same way, as a capitalized tag.\n\nFunction components are the modern default: with hooks they handle state and side effects without the boilerplate of classes, and React's newest features target them. Class components remain for legacy code and are still required for error boundaries, which have no hook equivalent.\n\nThe nuance an interviewer probes: the component name must be capitalized, because JSX treats a lowercase tag as a literal DOM element and only resolves a capitalized name to a component in scope.",
  "interviewLine": "I define components as plain functions returning JSX, or as classes extending `React.Component` for legacy and error-boundary cases; either way the name must be capitalized so JSX treats it as a component.",
  "misconception": "Forgetting that a component name must be capitalized, since JSX renders a lowercase tag as a DOM element rather than resolving it to your component.",
  "hints": [
    "Name the two component definitions React supports.",
    "Why must a component's name start with a capital letter in JSX?",
    "Which style is the modern default, and what still forces a class?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice both definitions render the same; the function form is the modern default.",
    "language": "tsx",
    "code": "function Greeting({ message }: { message: string }) {\n  return <h1>Hello, {message}</h1>;\n}\n\nclass GreetingClass extends React.Component<{ message: string }> {\n  render() {\n    return <h1>Hello, {this.props.message}</h1>;\n  }\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-state-and-props",
  "title": "What is the difference between state and props?",
  "prompt": "What is the difference between state and props?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Props are stored on the server database; state is stored in browser cookies.",
      "isCorrect": false,
      "explanation": "Tempting as a storage-flavored split, but both live in memory during render; neither is a database or a cookie."
    },
    {
      "id": "B",
      "text": "Props are external, read-only parameters passed down from parent components; State is internal, mutable data owned and managed within the component.",
      "isCorrect": true,
      "explanation": "Correct. The distinction is ownership: parent-supplied and read-only for props, component-owned and updatable for state."
    },
    {
      "id": "C",
      "text": "Props only accept numbers; state only accepts strings.",
      "isCorrect": false,
      "explanation": "Tempting as a precise-sounding rule, but both hold any value; the difference is ownership, not data type."
    },
    {
      "id": "D",
      "text": "Props can be mutated directly by child components; state is immutable everywhere.",
      "isCorrect": false,
      "explanation": "Tempting because it mentions mutability, but it inverts the facts: props are read-only to the child and state is updated through the setter."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Props and state differ in ownership and mutability. Props are inputs passed into a component from its parent; they are read-only from the receiver's view, the component cannot change its own props. State is data the component owns and manages internally, and updating it through the setter triggers a re-render.\n\nThe practical rule follows from this: if a value is controlled by a parent, it is a prop; if it is owned and changed by the component itself, it is state. The same data is often state in the owner and a prop in a child it is passed to.\n\nThe nuance an interviewer probes: both are immutable in the sense that you never mutate them in place, you replace state via the setter and you never write to props at all. Describing state as freely mutable is loose; the update must go through the setter to trigger a render.",
  "interviewLine": "I describe props as read-only inputs a parent passes in and state as data the component owns and updates through its setter to trigger a render, so the same value is state in the owner and a prop in the child it flows to.",
  "misconception": "Thinking a component can change its own props, when props are read-only inputs from the parent and only state is owned and updated locally.",
  "hints": [
    "Ask who owns the value and who is allowed to change it.",
    "Can a component write to its own props?",
    "What makes the same piece of data state in one component and a prop in another?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice count is state in Parent but arrives as a read-only prop in Display.",
    "language": "tsx",
    "code": "function Parent() {\n  const [count, setCount] = useState(0); // state here\n  return <Display value={count} />;\n}\n\nfunction Display({ value }: { value: number }) {\n  // value is a read-only prop; Display cannot change it\n  return <span>{value}</span>;\n}"
  }
},
{
  "id": "react-why-should-we-not-update-the-state-directly",
  "title": "Why should we not update the state directly?",
  "prompt": "Why should we not update the state directly?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "//Wrong\nthis.state.message = 'Hello world';\n\n//Correct\nthis.setState({ message: 'Hello World' });",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Direct mutation does not trigger a re-render, breaks shallow-comparison optimizations, and leaves the UI inconsistent.",
      "isCorrect": true,
      "explanation": "Correct. Mutating in place skips the setter, so React never reconciles and reference-based checks miss the change."
    },
    {
      "id": "B",
      "text": "Direct mutation permanently deletes the component instance from memory.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic consequence, but mutating state does not destroy the component; it just fails to trigger a render."
    },
    {
      "id": "C",
      "text": "Direct mutation automatically converts all numeric state values into strings.",
      "isCorrect": false,
      "explanation": "Tempting as a type-coercion claim, but assignment does not change types; the real problem is the missing re-render."
    },
    {
      "id": "D",
      "text": "Direct mutation immediately throws a fatal JavaScript syntax error in every browser.",
      "isCorrect": false,
      "explanation": "Tempting if you expect React to forbid it loudly, but it is valid JavaScript that silently fails to update the UI."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Assigning to state directly, `this.state.message = 'Hello'`, mutates the object in place but never tells React anything changed, so no re-render is scheduled and the UI goes stale. You must go through `setState` (or the `useState` setter) so React knows to reconcile.\n\nDirect mutation also breaks optimizations built on reference equality. `PureComponent`, `React.memo`, and dependency comparisons check whether the state object changed by identity; mutating in place keeps the same reference, so these checks conclude nothing changed and skip updates that should happen.\n\nThe nuance an interviewer probes: this is why immutable updates matter, you create a new object or array (spread, map) rather than editing the existing one. Mutating nested state is the subtle version of the same bug: the top-level reference is unchanged, so memoized children never see the update.",
  "interviewLine": "I never assign to state directly because that skips the setter, so React never reconciles, and keeping the same object reference also defeats `memo` and `PureComponent`; I always produce a new value immutably.",
  "misconception": "Assuming assigning to state updates the UI, when only the setter schedules a re-render, and in-place mutation also defeats reference-based memoization.",
  "hints": [
    "Ask what the setter does that a direct assignment does not.",
    "How do `memo` and `PureComponent` decide something changed, and what does in-place mutation do to that?",
    "Why is mutating a nested field the same bug in disguise?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the immutable update creates a new array, so memoized children actually see the change.",
    "language": "tsx",
    "code": "function List() {\n  const [items, setItems] = useState<string[]>([]);\n  // Wrong: items.push(\"x\"); setItems(items); // same reference, memo skips it\n  const add = (x: string) => setItems((prev) => [...prev, x]); // new array\n  return <button onClick={() => add(\"x\")}>Add</button>;\n}"
  }
},
{
  "id": "react-what-is-the-purpose-of-callback-function-as-an-argument",
  "title": "What is the purpose of callback function as an argument of setState()?",
  "prompt": "What is the purpose of callback function as an argument of setState()?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "setState({ name: 'John' }, () => console.log('The name has updated and component re-rendered'));",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "To cancel the state update automatically if the calculation takes longer than 10 milliseconds.",
      "isCorrect": false,
      "explanation": "Tempting as a timeout-sounding feature, but the callback does not cancel anything; it runs after the update commits."
    },
    {
      "id": "B",
      "text": "To convert the updated state object into an encrypted JSON file on disk.",
      "isCorrect": false,
      "explanation": "Tempting as a persistence option, but the callback is a post-update hook; it performs no serialization or encryption."
    },
    {
      "id": "C",
      "text": "In class `setState(updater, callback)`, the callback runs after the state update is applied and the component has re-rendered.",
      "isCorrect": true,
      "explanation": "Correct. It is the reliable point to read the committed state or the updated DOM."
    },
    {
      "id": "D",
      "text": "To validate the user's authentication tokens against a remote backend server.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but the callback is about update timing, not authentication."
    }
  ],
  "correctAnswer": "C",
  "explanation": "In class components, `setState(updater, callback)` takes an optional second argument that React runs after the state update has been applied and the component has re-rendered and committed to the DOM. It is the reliable place to read the new state or measure the updated DOM, since reading right after `setState` would see the old value.\n\nYou use it when some work must happen after the render reflects the change, logging the committed value, focusing a newly shown element, or triggering a dependent request that needs the fresh state.\n\nThe nuance an interviewer probes: this callback is class-only. In function components there is no second argument to the `useState` setter; you achieve the same timing with a `useEffect` that depends on the state value, which runs after the commit.",
  "interviewLine": "The second argument to class `setState` runs after the update is applied and committed, which is where I read the new state or updated DOM; in function components a `useEffect` on that state value does the same.",
  "misconception": "Reading `this.state` right after `setState` to get the new value, when the state callback (or a `useEffect`) is what runs after the update commits.",
  "hints": [
    "Ask when exactly the callback fires relative to the re-render.",
    "Why is reading `this.state` on the next line unreliable?",
    "What is the function-component equivalent of this post-update timing?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice useEffect keyed to the state value is the function-component stand-in for the setState callback.",
    "language": "tsx",
    "code": "function Panel() {\n  const [open, setOpen] = useState(false);\n  useEffect(() => {\n    if (open) focusFirstField(); // runs after the open=true commit\n  }, [open]);\n  return <button onClick={() => setOpen(true)}>Open</button>;\n}"
  }
},
{
  "id": "react-what-are-inline-conditional-expressions",
  "title": "What are inline conditional expressions?",
  "prompt": "What are inline conditional expressions?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<h1>Hello!</h1>;\n{\n  messages.length > 0 && !isLogin ? (\n    <h2>You have {messages.length} unread messages.</h2>\n  ): (\n    <h2>You don't have unread messages.</h2>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A method for compiling conditional C++ code into WebAssembly before the page loads.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level distractor, but inline conditionals are JavaScript expressions inside JSX, unrelated to C++ or WebAssembly."
    },
    {
      "id": "B",
      "text": "Using a ternary (`cond ? <A /> : <B />`) or logical `&&` (`cond && <El />`) directly inside JSX braces to render conditionally.",
      "isCorrect": true,
      "explanation": "Correct. These expressions evaluate inside the braces and resolve to an element or nothing."
    },
    {
      "id": "C",
      "text": "Executing CSS `@media` queries inside JavaScript strings at runtime.",
      "isCorrect": false,
      "explanation": "Tempting because media queries are conditional, but they style responsively; inline conditionals choose which JSX renders."
    },
    {
      "id": "D",
      "text": "Writing raw SQL `WHERE` clauses inside HTML tag attributes to filter content.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored option, but SQL runs on a database; inline conditionals are JavaScript expressions in JSX."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Inline conditional expressions render content directly inside JSX braces using JavaScript expressions. The two common forms are the ternary (`condition ? <A /> : <B />`) to choose between two outputs, and logical `&&` (`condition && <Element />`) to render something or nothing. They are inline because they sit right where the element goes, no separate statement needed.\n\nThey work because JSX braces evaluate any expression, and a ternary or `&&` is an expression that resolves to an element, `null`, or `false`, which React renders accordingly.\n\nThe nuance an interviewer probes: `&&` with a numeric left operand renders the number when it is `0`, so `count && <Badge />` prints a stray `0`. Guard with a boolean (`count > 0 && ...`), because React skips `null`, `undefined`, and `false`, but not `0`.",
  "interviewLine": "Inline conditionals are ternaries or `&&` inside JSX braces that resolve to an element or nothing; I guard `&&` against numeric values so an empty count does not render a stray `0`.",
  "misconception": "Expecting `&&` to always hide its left side, when a numeric `0` on the left renders as a literal `0` instead of nothing.",
  "hints": [
    "Recall that JSX braces evaluate any JavaScript expression.",
    "Which values does React render as nothing, and is `0` among them?",
    "What does `messages.length && <X />` print when there are no messages?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the ternary picks between two messages while the && guard uses a boolean, not a bare number.",
    "language": "tsx",
    "code": "function Notice({ count, loggedIn }: { count: number; loggedIn: boolean }) {\n  return (\n    <div>\n      {loggedIn ? <span>Welcome back</span> : <span>Please sign in</span>}\n      {count > 0 && <span>{count} new</span>}\n    </div>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-use-of-refs",
  "title": "What is the use of refs?",
  "prompt": "What is the use of refs?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "To trigger an immediate synchronous re-render of all parent components in the tree.",
      "isCorrect": false,
      "explanation": "Tempting if you confuse refs with state, but updating a ref deliberately does not re-render anything."
    },
    {
      "id": "B",
      "text": "To encrypt a component's props before they are transmitted over an HTTPS connection.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but refs hold DOM nodes or mutable values; they perform no encryption."
    },
    {
      "id": "C",
      "text": "To replace `useState` for every dynamic form input whose value updates the screen.",
      "isCorrect": false,
      "explanation": "Tempting because refs can hold input values, but values shown on screen belong in state; a ref change never re-renders."
    },
    {
      "id": "D",
      "text": "To reference a rendered DOM node (focus, selection, media, measurement) or store a mutable value that persists without re-rendering.",
      "isCorrect": true,
      "explanation": "Correct. Refs are for imperative DOM access and for persistent mutable values the UI does not depend on."
    }
  ],
  "correctAnswer": "D",
  "explanation": "A ref gives you an escape hatch out of React's declarative model. Its two uses are holding a reference to a rendered DOM node, so you can imperatively focus an input, select text, play media, or measure layout, and storing a mutable value that persists across renders without triggering one, like a timer id or a previous value.\n\nThe defining property is that writing to `ref.current` does not cause a re-render. That is what makes refs right for values the UI does not depend on, and wrong for anything that should appear on screen, which belongs in state.\n\nThe nuance an interviewer probes: because mutating a ref skips rendering, reading `ref.current` during render is unreliable, you set and read it in event handlers and effects, after the DOM exists. Reaching for a ref to avoid a re-render of display data is the classic misuse.",
  "interviewLine": "I use a ref for imperative DOM access like focusing an input, or to persist a mutable value across renders without causing one; anything the UI displays goes in state instead, since a ref change never re-renders.",
  "misconception": "Using a ref to hold data that drives the UI, when writing to a ref never re-renders, so anything shown on screen must be state.",
  "hints": [
    "Ask what writing to `ref.current` does, and does not, trigger.",
    "Which belongs in a ref and which in state: a timer id or a visible counter?",
    "Why is reading `ref.current` during render unreliable?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useRef",
  "example": {
    "caption": "Notice the ref both measures the node and persists a value, neither of which triggers a re-render.",
    "language": "tsx",
    "code": "function Field() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  useEffect(() => {\n    inputRef.current?.focus(); // imperative DOM access after mount\n  }, []);\n  return <input ref={inputRef} />;\n}"
  }
},
{
  "id": "react-how-virtual-dom-works",
  "title": "How Virtual DOM works?",
  "prompt": "How Virtual DOM works?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "React renders a new virtual tree in memory, diffs it against the previous tree heuristically, and batches minimal real DOM mutations.",
      "isCorrect": true,
      "explanation": "Correct. The in-memory diff computes the smallest DOM change set and applies it in one batch."
    },
    {
      "id": "B",
      "text": "It writes binary machine instructions directly to the graphics card for rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding claim, but the virtual DOM is JavaScript objects diffed in memory, not GPU instructions."
    },
    {
      "id": "C",
      "text": "It performs an exhaustive O(n^3) comparison of the entire tree on every animation frame.",
      "isCorrect": false,
      "explanation": "Tempting because tree diffing is theoretically O(n^3), but React's heuristics avoid that, running closer to O(n)."
    },
    {
      "id": "D",
      "text": "It compares HTML files stored on the web server over a WebSocket connection.",
      "isCorrect": false,
      "explanation": "Tempting as a networking distractor, but diffing happens client-side in memory, not against server files."
    }
  ],
  "correctAnswer": "A",
  "explanation": "When state changes, React renders a new virtual tree, plain JavaScript objects, entirely in memory. It then runs a heuristic diffing algorithm comparing that tree to the previous one, decides the smallest set of real DOM mutations, and batches them into one update to the actual document.\n\nThe diffing is heuristic, not exhaustive, which is what keeps it fast. A general tree diff is O(n^3); React assumes elements of different types produce different trees and uses keys to match list children, collapsing the problem to roughly O(n).\n\nThe nuance an interviewer probes: the virtual DOM's value is batching and minimizing real DOM writes, not raw speed in every case. Those two heuristics, type-based teardown and keyed list matching, are also why a changed element type remounts a subtree and why unstable keys ruin list performance.",
  "interviewLine": "I explain that React builds a new virtual tree, heuristically diffs it against the last, and batches the minimal real DOM mutations; the type-based and keyed heuristics keep it near O(n), which is why I keep keys stable.",
  "misconception": "Imagining React diffs the whole tree exhaustively, when heuristics, same-type assumption and keyed lists, reduce it to roughly linear work.",
  "hints": [
    "Ask what React compares, and where that comparison runs.",
    "Why is the diff heuristic rather than an exhaustive tree comparison?",
    "How do those heuristics connect to keys and to remounting on type change?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/preserving-and-resetting-state",
  "example": {
    "caption": "Notice only the changed text node is patched; the surrounding structure is reused, not rebuilt.",
    "language": "tsx",
    "code": "function Counter() {\n  const [n, setN] = useState(0);\n  // On click React diffs the new tree against the old and patches only the {n} text node.\n  return <p onClick={() => setN(n + 1)}>Count: {n}</p>;\n}"
  }
},
{
  "id": "react-what-is-the-main-goal-of-react-fiber",
  "title": "What is the main goal of React Fiber?",
  "prompt": "What is the main goal of React Fiber?",
  "level": "senior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "senior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "To enable incremental rendering by splitting reconciliation into chunks React can pause, abort, resume, and prioritize.",
      "isCorrect": true,
      "explanation": "Correct. Fiber makes rendering interruptible and prioritizable, the basis for concurrent features."
    },
    {
      "id": "B",
      "text": "To build a high-speed fiber-optic network cable for internet service providers.",
      "isCorrect": false,
      "explanation": "Tempting because of the shared word \"fiber,\" but React Fiber is a reconciler architecture, not physical cabling."
    },
    {
      "id": "C",
      "text": "To replace JavaScript with C++ as the language running in all web browsers.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding claim, but Fiber is JavaScript; it changes how React schedules work, not the browser's language."
    },
    {
      "id": "D",
      "text": "To automatically convert a component's CSS styles into SVG vector images.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent distractor, but Fiber concerns reconciliation scheduling, not style conversion."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React Fiber is the reconciler architecture introduced in React 16 whose goal is incremental, interruptible rendering. It represents work as a linked list of fiber nodes that React can process in small units, so it can pause rendering, yield to the browser, abort stale work, resume later, and assign priorities.\n\nThis is the foundation that makes concurrent features possible. Because reconciliation is no longer a single synchronous recursion, an urgent update like typing can interrupt a long low-priority render, keeping the UI responsive and animations smooth.\n\nThe nuance an interviewer probes: Fiber is the mechanism, not the feature. `startTransition`, `useDeferredValue`, Suspense, and streaming SSR all build on Fiber's ability to split and prioritize work; without it the pre-16 stack reconciler blocked the main thread until a render finished.",
  "interviewLine": "I describe React Fiber as the reconciler that splits rendering into interruptible, prioritizable units, which is what lets urgent updates preempt heavy ones and makes concurrent features like transitions and Suspense possible.",
  "misconception": "Thinking Fiber is a user-facing feature, when it is the interruptible reconciler architecture that concurrent features are built on top of.",
  "hints": [
    "Ask what Fiber lets React do that the old synchronous reconciler could not.",
    "Why does splitting work into units enable prioritizing urgent updates?",
    "Is Fiber something you call directly, or the foundation under features you call?"
  ],
  "source": "300-react",
  "estimatedMinutes": 4,
  "bestPracticeRef": "https://react.dev/learn/preserving-and-resetting-state",
  "example": {
    "caption": "Notice useTransition relies on Fiber's interruptible rendering to keep the input responsive.",
    "language": "tsx",
    "code": "function Search() {\n  const [, startTransition] = useTransition();\n  const [results, setResults] = useState<string[]>([]);\n  // Fiber lets this low-priority render pause so typing stays responsive.\n  const run = (q: string) => startTransition(() => setResults(expensiveSearch(q)));\n  return <input onChange={(e) => run(e.target.value)} />;\n}"
  }
},
{
  "id": "react-what-are-controlled-components",
  "title": "What are controlled components?",
  "prompt": "What are controlled components?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "handleChange(event) {\nthis.setState({value: event.target.value.toUpperCase()})\n}",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Components that execute exclusively inside backend Docker containers on the server.",
      "isCorrect": false,
      "explanation": "Tempting as an infrastructure distractor, but controlled refers to who owns the input's value, not where code runs."
    },
    {
      "id": "B",
      "text": "Components whose inputs cannot be edited by the user's keystrokes at all.",
      "isCorrect": false,
      "explanation": "Tempting if you have seen a frozen field, but that happens only when `value` lacks an `onChange`; a correct controlled input accepts typing."
    },
    {
      "id": "C",
      "text": "Components where the input value comes from React state via `value` and changes through `onChange`, making React the source of truth.",
      "isCorrect": true,
      "explanation": "Correct. State drives the value and the handler writes it back, so React fully owns the field."
    },
    {
      "id": "D",
      "text": "Components that require Redux to be installed before they can render anything.",
      "isCorrect": false,
      "explanation": "Tempting as a state-management link, but controlled inputs use any React state; Redux is unrelated."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A controlled component is a form input whose value is owned by React state. You set the field's `value` from state and update that state in an `onChange` handler, so every keystroke flows through React, making it the single source of truth for the field.\n\nThis gives you control at each keystroke: you can validate, transform (uppercasing in the example), format, or conditionally disable, because the displayed value is whatever your state says. The input cannot drift from your model.\n\nThe nuance an interviewer probes: a controlled input needs both `value` and `onChange`. Setting `value` without `onChange` freezes the field, since React keeps overwriting the user's input with the unchanged state, which is the real reason behind the \"my input won't type\" bug, not that controlled inputs block typing.",
  "interviewLine": "A controlled component holds its input value in React state, driving `value` and updating it in `onChange`, so React is the source of truth; I always pair the two, since `value` without `onChange` is what freezes the field.",
  "misconception": "Believing controlled inputs block typing, when the field only freezes if you set `value` without an `onChange` to write the keystroke back to state.",
  "hints": [
    "Ask where the field's current value lives and what writes it back.",
    "What happens if you set `value` but omit the `onChange` handler?",
    "Why does controlling the value let you validate or transform each keystroke?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
  "example": {
    "caption": "Notice the onChange writes every keystroke back to state, so the uppercase transform always sticks.",
    "language": "tsx",
    "code": "function CodeField() {\n  const [code, setCode] = useState(\"\");\n  return (\n    <input\n      value={code}\n      onChange={(e) => setCode(e.target.value.toUpperCase())}\n    />\n  );\n}"
  }
},
{
  "id": "react-what-are-the-different-phases-of-component-lifecycle",
  "title": "What are the different phases of component lifecycle?",
  "prompt": "What are the different phases of component lifecycle?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Connecting, Authenticating, and Disconnecting phases over a session.",
      "isCorrect": false,
      "explanation": "Tempting if you picture a network session, but these are not React phases; the lifecycle is about DOM presence."
    },
    {
      "id": "B",
      "text": "Mounting, Updating, and Unmounting, with the work split into render, pre-commit, and commit phases.",
      "isCorrect": true,
      "explanation": "Correct. The three stages map onto an interruptible render phase and a synchronous commit phase."
    },
    {
      "id": "C",
      "text": "Compilation, Minification, and Deployment phases of the build pipeline.",
      "isCorrect": false,
      "explanation": "Tempting as a real pipeline, but those are build steps, not runtime phases a component passes through."
    },
    {
      "id": "D",
      "text": "Lexical parsing, Bytecode interpretation, and Garbage collection phases.",
      "isCorrect": false,
      "explanation": "Tempting because these are real engine processes, but they belong to the JS runtime, not the component lifecycle."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A component's lifecycle has three high-level phases, mounting (inserted into the DOM), updating (re-rendering on prop or state changes), and unmounting (removed from the DOM). React internally splits the work of mounting and updating into a render phase and a commit phase.\n\nThe render phase computes the new tree and must be pure and interruptible, React may run it, pause it, or discard it. The commit phase applies the changes to the DOM and runs side effects like `componentDidMount` or layout effects; it is synchronous and not interruptible.\n\nThe nuance an interviewer probes: because the render phase can run multiple times or be thrown away under concurrent rendering, side effects must never live there, they belong in the commit phase (lifecycle methods, `useEffect`). Treating render as a safe place for subscriptions or mutations is the classic concurrency bug.",
  "interviewLine": "I frame it as: a component mounts, updates, and unmounts, and React splits that into an interruptible, pure render phase and a synchronous commit phase, which is why I put side effects in commit, via `useEffect` or lifecycle methods, never in render.",
  "misconception": "Putting side effects in the render phase, when it is pure and interruptible, side effects belong in the synchronous commit phase.",
  "hints": [
    "Separate the three high-level stages from the render and commit split inside them.",
    "Which phase is interruptible and must stay pure, and which applies the DOM changes?",
    "Why is the render phase the wrong place for a subscription under concurrent rendering?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice the subscription lives in the commit-phase effect, never in the render body which may run repeatedly.",
    "language": "tsx",
    "code": "function Online() {\n  const [online, setOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setOnline(true);\n    window.addEventListener(\"online\", on);\n    return () => window.removeEventListener(\"online\", on);\n  }, []);\n  return <span>{online ? \"online\" : \"offline\"}</span>;\n}"
  }
},
{
  "id": "react-how-to-set-state-with-a-dynamic-key-name",
  "title": "How to set state with a dynamic key name?",
  "prompt": "How to set state with a dynamic key name?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "handleInputChange(event) {\nthis.setState({ [event.target.id]: event.target.value })\n}",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Pass a string of raw JavaScript code to `eval()` inside `setState()` to build the key.",
      "isCorrect": false,
      "explanation": "Tempting as a dynamic trick, but `eval` is unsafe and unnecessary; computed property names set a dynamic key directly."
    },
    {
      "id": "B",
      "text": "Dynamic key names are not supported in JavaScript or React objects.",
      "isCorrect": false,
      "explanation": "Tempting if you have not used them, but ES6 computed property names make dynamic keys a built-in language feature."
    },
    {
      "id": "C",
      "text": "Use an ES6 computed property name: `setState({ [event.target.name]: event.target.value })`.",
      "isCorrect": true,
      "explanation": "Correct. The bracketed expression evaluates to the property name, setting state under a runtime-chosen key."
    },
    {
      "id": "D",
      "text": "Mutate `this.state[key] = value` directly without ever calling `setState`.",
      "isCorrect": false,
      "explanation": "Tempting as a direct route, but mutating state skips the re-render; you need the setter with a computed key."
    }
  ],
  "correctAnswer": "C",
  "explanation": "You set state under a key computed at runtime using an ES6 computed property name: wrap the key expression in square brackets inside the object literal, `setState({ [event.target.name]: event.target.value })`. The expression in brackets is evaluated and its result becomes the property name.\n\nThis is the standard way to handle many inputs with one handler: each input carries a `name`, and the handler writes to the matching state key without a separate function per field. In function components the same idea applies: `setForm(prev => ({ ...prev, [name]: value }))`.\n\nThe nuance an interviewer probes: computed property names are a plain JavaScript feature, not React magic, and in function state you must spread the previous object (`...prev`) because the setter replaces state rather than merging it the way class `setState` does.",
  "interviewLine": "I use an ES6 computed property name like `setState({ [name]: value })` to write a runtime-chosen key with one handler; in function components I spread `...prev` first since the setter replaces rather than merges.",
  "misconception": "Thinking dynamic keys need a special API, when they are plain ES6 computed property names, and in function state you must spread the previous object.",
  "hints": [
    "Recall how JavaScript object literals let you compute a key.",
    "What do the square brackets around the key do inside the object?",
    "In function state, why must you spread the previous object before the dynamic key?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice one handler updates any field by name, spreading prev because the function setter replaces state.",
    "language": "tsx",
    "code": "function Form() {\n  const [form, setForm] = useState({ email: \"\", name: \"\" });\n  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>\n    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));\n  return <input name=\"email\" value={form.email} onChange={onChange} />;\n}"
  }
},
{
  "id": "react-what-would-be-the-common-mistake-of-function-being-call",
  "title": "What would be the common mistake of function being called every time the component renders?",
  "prompt": "What would be the common mistake of function being called every time the component renders?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "render() {\n// Wrong: handleClick is called instead of passed as a reference!\nreturn <button onClick={this.handleClick()}>{'Click Me'}</button>\n}\n\nrender() {\n// Correct: handleClick is passed as a reference!\nreturn <button onClick={this.handleClick}>{'Click Me'}</button>\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Invoking the function immediately in JSX, `onClick={handleClick()}`, instead of passing the reference `onClick={handleClick}`.",
      "isCorrect": true,
      "explanation": "Correct. The parentheses call it during render; the handler receives the return value, and state updates can loop infinitely."
    },
    {
      "id": "B",
      "text": "Using `useCallback` to memoize the function reference between renders.",
      "isCorrect": false,
      "explanation": "Tempting as a performance concern, but memoizing a handler is good practice, not the mistake of calling it during render."
    },
    {
      "id": "C",
      "text": "Naming the function `handleClick` instead of a more descriptive `onButtonClick`.",
      "isCorrect": false,
      "explanation": "Tempting as a style nitpick, but naming does not affect behavior; the bug is the parentheses that invoke it."
    },
    {
      "id": "D",
      "text": "Passing an arrow function wrapper, `onClick={() => handleClick()}`.",
      "isCorrect": false,
      "explanation": "Tempting because it also has parentheses, but the arrow defers the call to click time, which is the correct fix, not the bug."
    }
  ],
  "correctAnswer": "A",
  "explanation": "The mistake is calling the handler in JSX instead of passing it: `onClick={handleClick()}` invokes `handleClick` during render and assigns its return value as the handler, while `onClick={handleClick}` passes the function itself to be called on click.\n\nBecause `handleClick()` runs on every render, if it calls `setState` you get an infinite render loop: render calls it, it updates state, state triggers a render, which calls it again. Even without state it fires at the wrong time, on render rather than on the user's action.\n\nThe nuance an interviewer probes: when you need to pass arguments, the fix is an arrow wrapper, `onClick={() => handleClick(id)}`, which defers the call to click time. The parentheses themselves are the tell: a bare reference versus an immediate invocation.",
  "interviewLine": "Writing `onClick={handleClick()}` calls the function during render and can loop infinitely if it sets state; I pass the reference `onClick={handleClick}`, or an arrow `() => handleClick(id)` when I need arguments.",
  "misconception": "Not seeing that `handleClick()` runs during render, when only `handleClick` (or an arrow wrapper) defers the call to the actual event.",
  "hints": [
    "Look closely at the parentheses after the handler name in the prop.",
    "When does `handleClick()` actually run, on render or on click?",
    "If you need to pass an argument, what wrapper defers the call correctly?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the arrow defers the call so handleRemove runs on click, not during render.",
    "language": "tsx",
    "code": "function Item({ id, handleRemove }: { id: string; handleRemove: (id: string) => void }) {\n  // Wrong: onClick={handleRemove(id)} runs during render.\n  return <button onClick={() => handleRemove(id)}>Remove</button>;\n}"
  }
},
{
  "id": "react-why-react-uses-classname-over-class-attribute",
  "title": "Why React uses className over class attribute?",
  "prompt": "Why React uses className over class attribute?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "render() {\nreturn <span className={'menu navigation-menu'}>{'Menu'}</span>\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because `class` is a reserved keyword in JavaScript, and JSX transpiles into standard JavaScript objects and calls.",
      "isCorrect": true,
      "explanation": "Correct. The props object is JavaScript, so the reserved word `class` is avoided in favor of the DOM property name `className`."
    },
    {
      "id": "B",
      "text": "Because `className` is processed by the GPU while `class` is processed by the CPU.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-sounding claim, but there is no such hardware split; the reason is the JavaScript keyword clash."
    },
    {
      "id": "C",
      "text": "Because `className` encrypts the CSS class names for browser security.",
      "isCorrect": false,
      "explanation": "Tempting as a security distractor, but `className` does no encryption; it simply avoids a reserved word."
    },
    {
      "id": "D",
      "text": "Because the HTML5 specification banned the `class` attribute in 2015.",
      "isCorrect": false,
      "explanation": "Tempting as a spec-sounding claim, but `class` remains a valid HTML attribute; the issue is only JavaScript's keyword."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React uses `className` because JSX compiles to JavaScript, and `class` is a reserved word in JavaScript. The props object a JSX tag produces is a real object literal, so using `class` as a key would collide with the language keyword; `className` sidesteps that, mirroring the DOM property `element.className`.\n\nThis is part of a consistent rule: JSX attribute names follow the DOM's JavaScript property names, not HTML attribute names. That is why you also write `htmlFor` instead of `for`, which is likewise reserved.\n\nThe nuance an interviewer probes: it is about the JavaScript target, not about HTML. The browser's HTML attribute is still `class`; React maps `className` onto it. So the reason is the compilation target and the DOM property API, not any change to HTML or a browser security measure.",
  "interviewLine": "I point out that JSX compiles to JavaScript object literals, and `class` is a reserved word there, so React uses the DOM property name `className`, just as it uses `htmlFor` for the reserved `for`.",
  "misconception": "Thinking `className` is an HTML change, when the real reason is that JSX compiles to JavaScript where `class` is a reserved keyword.",
  "hints": [
    "Ask what JSX actually compiles into and what rules that language has.",
    "What other JSX attribute is renamed for the same reason as `className`?",
    "Is the browser's HTML attribute itself still `class`?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice both className and htmlFor avoid reserved JavaScript words, mapping to DOM property names.",
    "language": "tsx",
    "code": "function Field() {\n  return (\n    <div className=\"field\">\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" />\n    </div>\n  );\n}"
  }
},
{
  "id": "react-what-are-fragments",
  "title": "What are fragments?",
  "prompt": "What are fragments?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "render() {\nreturn (\n  <React.Fragment>\n    <ChildA />\n    <ChildB />\n    <ChildC />\n  </React.Fragment>\n)\n}\n\nrender() {\nreturn (\n  <>\n    <ChildA />\n    <ChildB />\n    <ChildC />\n  </>\n)\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Broken components that crashed during rendering and were left in the tree.",
      "isCorrect": false,
      "explanation": "Tempting if you read \"fragment\" as damage, but it is a deliberate grouping tool, unrelated to crashes."
    },
    {
      "id": "B",
      "text": "A built-in component (`<React.Fragment>` or `<>...</>`) that groups siblings without rendering an extra wrapper node.",
      "isCorrect": true,
      "explanation": "Correct. It meets the single-root rule while rendering only its children, leaving no extra DOM node."
    },
    {
      "id": "C",
      "text": "Database records split across multiple disk partitions for scaling.",
      "isCorrect": false,
      "explanation": "Tempting because \"fragment\" suggests sharding, but Fragments group render-tree siblings, not stored data."
    },
    {
      "id": "D",
      "text": "Code bundles split into asynchronous chunks by Webpack at build time.",
      "isCorrect": false,
      "explanation": "Tempting if you think of code splitting, but that is bundler work; a Fragment is a render-tree grouping primitive."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Fragments are a built-in React component that groups several sibling elements under one parent in the component tree without rendering any wrapper node to the DOM. You write them as `<React.Fragment>...</React.Fragment>` or the shorthand `<>...</>`.\n\nThey satisfy React's single-root rule while keeping the DOM clean. Wrapping siblings in a `<div>` just to return them adds a node that can break flexbox, grid, and the required child structure of tables and lists.\n\nThe nuance an interviewer probes: the `<>` shorthand takes no props, so a list of grouped siblings needs the explicit `<React.Fragment key={id}>` form, since `key` is the only prop a Fragment accepts.",
  "interviewLine": "Fragments group siblings under one root without adding a DOM node, which keeps table and flex layouts intact; inside a list I use the keyed `React.Fragment` form.",
  "misconception": "Assuming grouped siblings need a visible wrapper, when a Fragment groups them while emitting no DOM node.",
  "hints": [
    "Recall the rule about how many roots a component may return.",
    "What is the cost of satisfying that rule with a `<div>`?",
    "Which Fragment form carries a `key` for use inside a `.map()`?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the Fragment returns three children with no enclosing DOM node.",
    "language": "tsx",
    "code": "function Trio() {\n  return (\n    <>\n      <ChildA />\n      <ChildB />\n      <ChildC />\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-are-portals-in-react",
  "title": "What are portals in React?",
  "prompt": "What are portals in React?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "ReactDOM.createPortal(child, container);",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`createPortal(child, domNode)` renders children into a different DOM subtree while preserving React event bubbling and context.",
      "isCorrect": true,
      "explanation": "Correct. The DOM moves out of the parent subtree, but the child stays in the React tree, so context and bubbling follow it."
    },
    {
      "id": "B",
      "text": "A deprecated API that was introduced and then entirely removed from React back in version 16.",
      "isCorrect": false,
      "explanation": "Tempting if you misremember a deprecation, but portals were introduced in React 16 and remain current."
    },
    {
      "id": "C",
      "text": "Encrypted peer-to-peer network tunnels established between two separate open browser tabs.",
      "isCorrect": false,
      "explanation": "Tempting because \"portal\" sounds like a tunnel, but it is a rendering target within one document, not a network link."
    },
    {
      "id": "D",
      "text": "A method that compiles React components into WebGL shaders for direct GPU rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent distractor, but portals relocate DOM nodes; they do not compile shaders."
    }
  ],
  "correctAnswer": "A",
  "explanation": "A portal renders a component's children into a DOM node outside its parent's subtree while keeping them in the same React tree. You call `createPortal(child, container)` with a target node, often a `<div>` appended to `<body>`, and the child's DOM is placed there instead of inline.\n\nPortals solve the clipping and stacking problem: modals, tooltips, and dropdowns must escape ancestors with `overflow: hidden`, `transform`, or a constraining `z-index`, so they render at the document top level.\n\nThe nuance an interviewer probes: because the portal stays in the React tree, context still flows and events still bubble through the React hierarchy, not the DOM one. A click inside a portaled modal bubbles to the React parent that rendered it, even though its DOM node lives elsewhere, which surprises people expecting DOM-based bubbling.",
  "interviewLine": "I use a portal via `createPortal` to render children into a DOM node outside the parent subtree to escape overflow and stacking, while context and event bubbling still follow the React tree, not the DOM.",
  "misconception": "Expecting a portaled node's events to bubble through the DOM, when they bubble through the React tree to the component that rendered the portal.",
  "hints": [
    "Ask where a modal's DOM must live to escape a clipping ancestor.",
    "Does the portal move the component in the React tree as well?",
    "Through which hierarchy does a click inside the portal bubble?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react-dom.dev/reference/react-dom/createPortal",
  "example": {
    "caption": "Notice the tooltip's DOM lands in document.body, yet it still reads context from its React parent.",
    "language": "tsx",
    "code": "import { createPortal } from \"react-dom\";\n\nfunction Tooltip({ children }: { children: React.ReactNode }) {\n  return createPortal(<div className=\"tooltip\">{children}</div>, document.body);\n}"
  }
},
{
  "id": "react-what-is-the-use-of-react-dom-package",
  "title": "What is the use of react-dom package?",
  "prompt": "What is the use of react-dom package?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A compiler that converts CSS files into WebAssembly binaries during the build.",
      "isCorrect": false,
      "explanation": "Tempting as a tooling distractor, but `react-dom` renders React trees to the browser DOM; it compiles nothing."
    },
    {
      "id": "B",
      "text": "A database connector for querying PostgreSQL and MongoDB from components.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored option, but `react-dom` is a renderer, not a database client."
    },
    {
      "id": "C",
      "text": "Provides DOM rendering entry points (`createRoot`, `hydrateRoot`, `createPortal`) connecting React's element tree to the browser DOM.",
      "isCorrect": true,
      "explanation": "Correct. It is the browser renderer; the platform-agnostic `react` core defines components and hooks."
    },
    {
      "id": "D",
      "text": "A styling library that replaces Tailwind and CSS Modules for component styles.",
      "isCorrect": false,
      "explanation": "Tempting as a frontend-adjacent option, but `react-dom` renders to the DOM; it does no styling."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`react-dom` is the renderer that connects React's platform-agnostic element tree to the browser DOM. The core `react` package knows nothing about the DOM; it defines components, elements, and hooks. `react-dom` supplies the browser-specific entry points: `createRoot` to mount an app, `hydrateRoot` to attach to server-rendered HTML, and `createPortal` to render into another DOM node.\n\nThis separation is why React can target other hosts: React Native uses a different renderer, `react-dom/server` renders to HTML strings, and the shared `react` core stays the same.\n\nThe nuance an interviewer probes: the split explains why `createRoot` and `createPortal` live in `react-dom`, not `react`. Importing DOM entry points from `react` is a common mistake that follows from not understanding that `react` is the renderer-independent core.",
  "interviewLine": "I describe `react-dom` as the browser renderer that bridges React's platform-agnostic tree to the DOM via `createRoot`, `hydrateRoot`, and `createPortal`; the `react` core knows nothing about the DOM, which is how React also targets Native.",
  "misconception": "Treating `react` and `react-dom` as one package, when `react` is the renderer-agnostic core and `react-dom` is the browser-specific renderer.",
  "hints": [
    "Ask which package knows about the DOM and which only about components.",
    "Where do `createRoot` and `createPortal` actually come from?",
    "Why does this split let React also run on React Native?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice createRoot comes from react-dom/client, not react, because it is DOM-specific.",
    "language": "tsx",
    "code": "import { createRoot } from \"react-dom/client\";\nimport App from \"./App\";\n\nconst root = createRoot(document.getElementById(\"root\")!);\nroot.render(<App />);"
  }
},
{
  "id": "react-what-is-the-purpose-of-render-method-of-react-dom",
  "title": "What is the purpose of render method of react-dom?",
  "prompt": "What is the purpose of render method of react-dom?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "ReactDOM.render(element, container[, callback])",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "To compile the project's TypeScript source files into JavaScript on disk before the server begins serving them.",
      "isCorrect": false,
      "explanation": "Tempting as a build-sounding option, but `render` mounts an element tree at runtime; it compiles nothing."
    },
    {
      "id": "B",
      "text": "To send an HTTP POST request carrying the component's data to a remote backend server on mount.",
      "isCorrect": false,
      "explanation": "Tempting as a networking distractor, but `render` mounts UI into the DOM; it makes no network request."
    },
    {
      "id": "C",
      "text": "Legacy `ReactDOM.render(element, container)` mounted a tree into a DOM container; React 18+ replaces it with `createRoot(container).render(element)`.",
      "isCorrect": true,
      "explanation": "Correct. It was the old mount entry point, now superseded by the concurrent-capable `createRoot`."
    },
    {
      "id": "D",
      "text": "To delete the browser's cache and clear all of the user's stored cookies on every single call.",
      "isCorrect": false,
      "explanation": "Tempting as an unrelated \"reset\" idea, but `render` mounts React into the DOM; it touches no cache or cookies."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`ReactDOM.render(element, container)` was the legacy entry point that mounted a React element tree into a DOM container. In React 18 it was superseded by `ReactDOM.createRoot(container).render(element)`, which creates a root that opts the app into concurrent features.\n\nThe difference is not cosmetic: `createRoot` enables automatic batching across async boundaries, transitions, and the concurrent renderer, while the legacy `render` used the old synchronous path. Calling the old API in React 18 logs a deprecation warning and runs in legacy mode.\n\nThe nuance an interviewer probes: this is a version boundary. Citing `ReactDOM.render` as current practice signals outdated knowledge; modern code uses `createRoot` (or a framework like Next.js that manages the root for you).",
  "interviewLine": "I note that `ReactDOM.render` was the legacy mount API; React 18 replaced it with `createRoot(container).render(...)`, which opts into concurrent rendering and automatic batching, so I use `createRoot` in modern code.",
  "misconception": "Citing `ReactDOM.render` as current, when React 18+ replaced it with `createRoot` to enable concurrent features and automatic batching.",
  "hints": [
    "Ask what version boundary separates `render` from its replacement.",
    "What does `createRoot` enable that the legacy `render` path did not?",
    "What happens if you still call the old API in React 18?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the modern createRoot call replaces the deprecated ReactDOM.render entirely.",
    "language": "tsx",
    "code": "import { createRoot } from \"react-dom/client\";\n\n// Legacy (React <18): ReactDOM.render(<App />, container);\nconst root = createRoot(document.getElementById(\"root\")!);\nroot.render(<App />);"
  }
},
{
  "id": "react-what-is-reactdomserver",
  "title": "What is ReactDOMServer?",
  "prompt": "What is ReactDOMServer?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "// using Express\nimport { renderToString } from 'react-dom/server';\nimport MyPage from './MyPage';\n\napp.get('/', (req, res) => {\n  res.write('<!DOCTYPE html><html><head><title>My Page</title></head><body>');\n  res.write('<div id=\"content\">');\n  res.write(renderToString(<MyPage />));\n  res.write('</div></body></html>');\n  res.end();\n});",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A physical hardware server blade manufactured by Meta for its data centers.",
      "isCorrect": false,
      "explanation": "Tempting because of \"server,\" but `react-dom/server` is a JavaScript package that renders components to HTML, not hardware."
    },
    {
      "id": "B",
      "text": "A database engine that stores React component state on disk between requests.",
      "isCorrect": false,
      "explanation": "Tempting as a persistence option, but it renders components to HTML strings or streams; it stores nothing."
    },
    {
      "id": "C",
      "text": "A web server that replaces Apache and Nginx for serving the application.",
      "isCorrect": false,
      "explanation": "Tempting as an infrastructure distractor, but it is a rendering library you call from a server, not an HTTP server itself."
    },
    {
      "id": "D",
      "text": "A package providing `renderToString`, `renderToPipeableStream`, and `renderToStaticMarkup` to render components to HTML on the server.",
      "isCorrect": true,
      "explanation": "Correct. It is the server renderer that turns React trees into HTML strings or streams for SSR."
    }
  ],
  "correctAnswer": "D",
  "explanation": "`react-dom/server` is the companion package that renders React components to HTML on the server rather than mounting them in a browser. It exposes `renderToString` for a synchronous HTML string, `renderToPipeableStream` for streaming HTML in Node, and `renderToStaticMarkup` for HTML without the extra attributes React needs for hydration.\n\nThis is the server half of SSR: the server produces markup for fast first paint and SEO, sends it to the browser, and the client later hydrates it. Streaming lets the browser start rendering before the whole tree finishes.\n\nThe nuance an interviewer probes: `renderToStaticMarkup` is for content that will never hydrate, static emails or pages, because it omits the hydration metadata; using it where you need interactivity breaks client hydration. Choosing the right method matters.",
  "interviewLine": "I reach for `react-dom/server` to render components to HTML on the server with `renderToString`, streaming `renderToPipeableStream`, or hydration-free `renderToStaticMarkup`; it is the server half of SSR that the client later hydrates.",
  "misconception": "Thinking server rendering uses the same API as the browser, when it is a separate `react-dom/server` package with string and streaming methods, each for a different use.",
  "hints": [
    "Ask which package renders to HTML rather than mounting into a live DOM.",
    "What does the streaming method add over the plain string method?",
    "When would you choose `renderToStaticMarkup`, and what does it leave out?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice renderToString produces HTML the server writes into the response for the client to hydrate.",
    "language": "tsx",
    "code": "import { renderToString } from \"react-dom/server\";\n\napp.get(\"/\", (req, res) => {\n  const html = renderToString(<MyPage />);\n  res.send(`<div id=\"content\">${html}</div>`);\n});"
  }
},
{
  "id": "react-how-to-use-innerhtml-in-react",
  "title": "How to use innerHTML in React?",
  "prompt": "How to use innerHTML in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "function createMarkup() {\n  return { __html: 'First &middot; Second' };\n}\n\nfunction MyComponent() {\n  return <div dangerouslySetInnerHTML={createMarkup()} />;\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "`innerHTML` is completely forbidden and cannot be used in React under any circumstances.",
      "isCorrect": false,
      "explanation": "Tempting given the warnings, but React does allow it through `dangerouslySetInnerHTML`; it just makes the risk explicit."
    },
    {
      "id": "B",
      "text": "Assign `element.innerHTML = html` directly inside the component's render function.",
      "isCorrect": false,
      "explanation": "Tempting if you reach for the DOM API, but that bypasses React's DOM management; use the `dangerouslySetInnerHTML` prop instead."
    },
    {
      "id": "C",
      "text": "Use `dangerouslySetInnerHTML={{ __html: sanitizedHtml }}`, sanitizing the HTML (e.g. with DOMPurify) to prevent XSS.",
      "isCorrect": true,
      "explanation": "Correct. The prop renders raw HTML, and sanitizing first is what keeps it from becoming an XSS hole."
    },
    {
      "id": "D",
      "text": "Pass the raw HTML string directly into JSX curly braces, like `{'<div>Hello</div>'}`.",
      "isCorrect": false,
      "explanation": "Tempting as the obvious attempt, but JSX escapes strings to text for safety, so the markup renders literally, not as HTML."
    }
  ],
  "correctAnswer": "C",
  "explanation": "React does not let you set `innerHTML` with a plain string, because that would be an easy XSS vector. Instead it offers `dangerouslySetInnerHTML={{ __html: html }}`, whose deliberately alarming name signals the risk. React renders the given HTML string as raw markup inside the element.\n\nThe critical rule is sanitization: any HTML that could contain user input must be cleaned, with a library like DOMPurify, before you pass it, or an attacker can inject `<script>` or event-handler attributes. Setting trusted, static markup is fine; setting unsanitized user content is a vulnerability.\n\nThe nuance an interviewer probes: putting a raw HTML string into normal JSX braces (`{'<b>hi</b>'}`) does not render markup, React escapes it to text, which is the safe default. `dangerouslySetInnerHTML` is the explicit opt-out of that protection, and the name is a warning to sanitize.",
  "interviewLine": "React escapes string children by default, so to inject raw HTML I use `dangerouslySetInnerHTML={{ __html }}`, and I always sanitize with something like DOMPurify first because the name is a literal warning about XSS.",
  "misconception": "Expecting a raw HTML string in JSX braces to render as markup, when React escapes it to text, and raw HTML requires the explicit, sanitized `dangerouslySetInnerHTML`.",
  "hints": [
    "Ask what React does to a plain string you put in JSX braces.",
    "Why is the prop's name deliberately alarming?",
    "What must you run user-provided HTML through before rendering it?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the HTML is sanitized before it reaches the prop, closing the XSS hole.",
    "language": "tsx",
    "code": "import DOMPurify from \"dompurify\";\n\nfunction RichText({ html }: { html: string }) {\n  const clean = DOMPurify.sanitize(html);\n  return <div dangerouslySetInnerHTML={{ __html: clean }} />;\n}"
  }
},
{
  "id": "react-how-to-use-styles-in-react",
  "title": "How to use styles in React?",
  "prompt": "How to use styles in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const divStyle = {\n  color: 'blue',\n  backgroundImage: 'url(' + imgUrl + ')',\n};\n\nfunction HelloWorldComponent() {\n  return <div style={divStyle}>Hello World!</div>;\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Pass a JavaScript object with camelCased CSS properties to the `style` prop, or use CSS Modules, Tailwind, or CSS-in-JS.",
      "isCorrect": true,
      "explanation": "Correct. The `style` prop takes a camelCased object, and other approaches cover scoping and pseudo-classes it cannot."
    },
    {
      "id": "B",
      "text": "React components do not support any form of visual styling and must stay unstyled.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but React supports multiple styling approaches; it is unopinionated, not styleless."
    },
    {
      "id": "C",
      "text": "Pass a semicolon-delimited CSS string, like `style='color: blue; font-size: 16px'`, as in HTML.",
      "isCorrect": false,
      "explanation": "Tempting if you write it like HTML, but the JSX `style` prop expects an object, not a CSS string."
    },
    {
      "id": "D",
      "text": "Styles can only be applied by editing the browser's underlying C++ source code.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but styling happens in CSS and JavaScript at the app layer, never in engine source."
    }
  ],
  "correctAnswer": "A",
  "explanation": "The inline approach passes a JavaScript object to the `style` prop, with CSS properties camelCased: `style={{ color: 'blue', fontSize: '16px' }}`. React maps that object onto the element's `style` DOM property. Beyond inline, you can use CSS Modules for scoped class names, Tailwind utility classes, or a CSS-in-JS library.\n\nInline styles are convenient for dynamic, computed values (a color from props, a background from a URL) but they cannot express pseudo-classes like `:hover` or media queries, so they are not a full replacement for stylesheets.\n\nThe nuance an interviewer probes: the `style` prop takes an object, not a CSS string, and keys are camelCased (`backgroundImage`, not `background-image`). Passing a semicolon-delimited string, the HTML `style` attribute form, does not work in JSX.",
  "interviewLine": "Inline styles take a camelCased object on the `style` prop, which is great for dynamic values but cannot do `:hover` or media queries, so I reach for CSS Modules or Tailwind when I need those.",
  "misconception": "Passing a CSS string to the `style` prop, when it expects a camelCased JavaScript object and cannot express pseudo-classes or media queries.",
  "hints": [
    "Ask what type and key casing the `style` prop expects.",
    "Why can't an inline style express a `:hover` rule or a media query?",
    "Does the semicolon-delimited HTML style string work in JSX?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the dynamic background uses an inline object, while hover styling would need a class instead.",
    "language": "tsx",
    "code": "function Avatar({ url }: { url: string }) {\n  const style = { backgroundImage: `url(${url})`, borderRadius: \"50%\" };\n  return <div style={style} />;\n}"
  }
},
{
  "id": "react-how-events-are-different-in-react",
  "title": "How events are different in React?",
  "prompt": "How events are different in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "React uses camelCase names, passes function handlers, delegates events to the root, and wraps native events in `SyntheticEvent`.",
      "isCorrect": true,
      "explanation": "Correct. These four differences define React's event system versus raw HTML event attributes."
    },
    {
      "id": "B",
      "text": "There is no difference; React simply uses the raw HTML event attributes like `onclick`.",
      "isCorrect": false,
      "explanation": "Tempting if the props look similar, but React uses camelCase, function references, delegation, and synthetic events, none of which raw HTML attributes do."
    },
    {
      "id": "C",
      "text": "React events execute on a backend Node.js server rather than in the browser.",
      "isCorrect": false,
      "explanation": "Tempting as a server-flavored distractor, but React events fire in the browser where the user interacts."
    },
    {
      "id": "D",
      "text": "React events only fire for physical keyboard input and ignore mouse clicks entirely.",
      "isCorrect": false,
      "explanation": "Tempting as an oddly specific claim, but React handles the full range of DOM events, including clicks."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React events differ from raw DOM events in a few consistent ways. Handlers are named in camelCase (`onClick`, not `onclick`), you pass a function reference rather than a string of code, React delegates listeners to the root rather than attaching one per node, and it hands your handler a `SyntheticEvent`, a cross-browser wrapper over the native event.\n\nThe synthetic layer gives consistent behavior across browsers and a uniform API (`preventDefault`, `stopPropagation`). Root delegation means React attaches few actual DOM listeners regardless of how many `onClick` props you write, which is efficient.\n\nThe nuance an interviewer probes: since React 17 the delegation root is the app container, not `document`, which matters when embedding multiple React roots or integrating with non-React code. And the synthetic event is a real browser event under the hood, not a reimplementation.",
  "interviewLine": "I note that React events use camelCase props and function references, delegate to a single root listener, and wrap the native event in a cross-browser `SyntheticEvent`, which is still a real DOM event underneath.",
  "misconception": "Assuming React events are just HTML attributes, when they are camelCased, take function references, use root delegation, and deliver a SyntheticEvent.",
  "hints": [
    "Compare the handler prop's casing and value type with raw HTML attributes.",
    "How many actual DOM listeners does React attach for many `onClick` props?",
    "What object does your handler receive, and why is it not the raw native event by default?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the handler is a camelCased prop receiving a typed SyntheticEvent, not an inline string.",
    "language": "tsx",
    "code": "function Link() {\n  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {\n    e.preventDefault();\n  }\n  return <a href=\"/x\" onClick={onClick}>Go</a>;\n}"
  }
},
{
  "id": "react-what-will-happen-if-you-use-setstate-in-constructor",
  "title": "What will happen if you use setState() in constructor?",
  "prompt": "What will happen if you use setState() in constructor?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "It triggers a warning and causes needless work; initial state should be set with `this.state = { ... }` in the constructor instead.",
      "isCorrect": true,
      "explanation": "Correct. The component is not mounted yet, so you assign `this.state` directly rather than calling the setter."
    },
    {
      "id": "B",
      "text": "It encrypts the component's entire state object using the SHA-256 hashing algorithm before it mounts.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but `setState` schedules updates; it performs no hashing or encryption."
    },
    {
      "id": "C",
      "text": "The computer's operating system will immediately crash and force a full reboot of the machine.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic consequence, but the result is only a React warning, not an OS crash."
    },
    {
      "id": "D",
      "text": "It permanently converts the class component into a functional component for the rest of the session.",
      "isCorrect": false,
      "explanation": "Tempting as a transformation claim, but calling `setState` cannot change a component's kind; the mistake is just mis-timing."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Calling `setState` in the constructor is wrong because the component is not yet mounted. React warns, and `setState` there is pointless, there is no previous render to reconcile against. The correct way to set initial state in a class is to assign `this.state = { ... }` directly in the constructor.\n\nThe reason is timing: `setState` schedules an update to a mounted component, but during construction the instance is still being built. Assigning `this.state` sets the starting value synchronously without scheduling anything.\n\nThe nuance an interviewer probes: this maps to function components too, you pass the initial value to `useState(initial)` rather than calling the setter during the first render. Calling the setter unconditionally in the render body causes an update loop, the hook-era version of the same mistake.",
  "interviewLine": "In the constructor the component is not mounted, so `setState` just warns; I set initial state with `this.state = {...}`, which mirrors passing the initial value to `useState` rather than calling the setter during the first render.",
  "misconception": "Using `setState` to seed initial state, when the constructor should assign `this.state` directly since the component is not yet mounted.",
  "hints": [
    "Ask whether the component is mounted while its constructor runs.",
    "What is the direct way to seed initial state in a class?",
    "What is the function-component equivalent of this mistake?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice initial state is assigned directly; the useState version passes the value, never calling the setter at init.",
    "language": "tsx",
    "code": "class Counter extends React.Component<{}, { n: number }> {\n  constructor(props: {}) {\n    super(props);\n    this.state = { n: 0 }; // not this.setState\n  }\n  render() {\n    return <span>{this.state.n}</span>;\n  }\n}"
  }
},
{
  "id": "react-what-is-the-impact-of-indexes-as-keys",
  "title": "What is the impact of indexes as keys?",
  "prompt": "What is the impact of indexes as keys?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "{\n  todos.map((todo, index) => <Todo {...todo} key={index} />);\n}\n\n{\n  todos.map((todo) => <Todo {...todo} key={todo.id} />);\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "It throws an immediate fatal syntax error that halts JavaScript execution on render.",
      "isCorrect": false,
      "explanation": "Tempting if you expect React to reject it, but index keys are valid; the problem is a silent state-mismatch bug."
    },
    {
      "id": "B",
      "text": "It causes all of the app's HTTP network requests to run synchronously.",
      "isCorrect": false,
      "explanation": "Tempting as a vague side effect, but keys are a client reconciliation concern with no bearing on network requests."
    },
    {
      "id": "C",
      "text": "It permanently disables the browser's CSS animation engine for the page.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent claim, but keys do not touch CSS; they affect how React matches list elements."
    },
    {
      "id": "D",
      "text": "On reorder, insertion, or deletion, index keys attach component state to the wrong items and cause needless re-renders.",
      "isCorrect": true,
      "explanation": "Correct. The shifting index-to-item mapping makes React reuse the wrong node and its state for a changed item."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Using the array index as a key is safe only for a static list. When items are reordered, inserted at the front, or deleted, the index-to-item mapping shifts: the element that was index 0 is now a different item, but React, matching by key, reuses the previous DOM node and its state for the new item.\n\nThe visible result is state attaching to the wrong row, a checkbox stays checked next to a different item, an input keeps text that belonged to a deleted entry, and React also does extra DOM work it could have avoided with stable identities.\n\nThe nuance an interviewer probes: the fix is a key derived from the data (`todo.id`), which stays bound to the logical item regardless of position. Index keys are not a syntax error; they are a silent correctness bug that only appears once the list changes order or length.",
  "interviewLine": "Index keys are fine for static lists, but on reorder, insertion, or deletion they shift the index-to-item mapping, so React reuses the wrong node and state bleeds onto the wrong row; I key by the data's id instead.",
  "misconception": "Thinking index keys are harmless because nothing errors, when they silently bind state to the wrong row once the list reorders or shrinks.",
  "hints": [
    "Ask what the index of an item is after you delete the item before it.",
    "What does React reuse when the key matches but the underlying item changed?",
    "Why does the bug stay hidden until the list reorders or shrinks?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice keying by id keeps each row's state attached to its data even after prepending a new item.",
    "language": "tsx",
    "code": "function Todos({ todos }: { todos: { id: string; text: string }[] }) {\n  // Prepending a todo with index keys would move checkbox state onto the wrong row.\n  return <>{todos.map((t) => <Todo key={t.id} {...t} />)}</>;\n}"
  }
},
{
  "id": "react-is-it-good-to-use-setstate-in-componentwillmount-method",
  "title": "Is it good to use setState() in componentWillMount() method?",
  "prompt": "Is it good to use setState() in componentWillMount() method?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "componentDidMount() {\naxios.get(`api/todos`)\n  .then((result) => {\n    this.setState({\n      messages: [...result.data]\n    })\n  })\n}",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "No, `componentWillMount` is deprecated (UNSAFE); initial state belongs in the constructor and fetches in `componentDidMount`/`useEffect`.",
      "isCorrect": true,
      "explanation": "Correct. It is unsafe under async rendering, so setup moves to the constructor and the mount-time effect."
    },
    {
      "id": "B",
      "text": "Yes, it is the single recommended place to perform asynchronous database operations and data fetches.",
      "isCorrect": false,
      "explanation": "Tempting if you think earlier is better, but it is deprecated; async work belongs in `componentDidMount` or `useEffect`."
    },
    {
      "id": "C",
      "text": "`componentWillMount` is the newest lifecycle hook that React added to the API in version 19.",
      "isCorrect": false,
      "explanation": "Tempting as a modern-sounding claim, but it is a deprecated class method, not a hook, and certainly not new."
    },
    {
      "id": "D",
      "text": "Calling `setState` inside `componentWillMount` immediately shuts down the running web server.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic distractor, but it only triggers a warning and bad behavior, not a server shutdown."
    }
  ],
  "correctAnswer": "A",
  "explanation": "No. `componentWillMount` is deprecated and flagged UNSAFE because it runs before the first render and is unreliable under async rendering, where the render phase can be started and discarded. Setting state or starting fetches there leads to subtle bugs and wasted work.\n\nThe correct split is: initial state goes in the constructor (or `useState`), and side effects like data fetching go in `componentDidMount` (or a `useEffect`), which runs once after the DOM is committed. The example fetching in `componentDidMount` and calling `setState` with the result is the right pattern.\n\nThe nuance an interviewer probes: fetching in `componentWillMount` does not make data available \"earlier\", the request is async and resolves after render anyway, so it buys nothing while risking double execution under concurrent rendering. Citing it as a place for setup signals outdated knowledge.",
  "interviewLine": "`componentWillMount` is deprecated and unsafe under async rendering, so I seed state in the constructor and run fetches in `componentDidMount` or a `useEffect`; fetching earlier buys nothing since the request resolves after render regardless.",
  "misconception": "Believing `componentWillMount` fetches data earlier, when the request is async and resolves after render anyway, and the method is deprecated as unsafe.",
  "hints": [
    "Ask why a pre-render lifecycle method is risky under async rendering.",
    "Where should initial state and where should side effects actually go?",
    "Does fetching before render make the data arrive any sooner?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice the fetch runs in a mount effect and sets state when it resolves, the modern equivalent of componentDidMount.",
    "language": "tsx",
    "code": "function Todos() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  useEffect(() => {\n    fetch(\"/api/todos\").then((r) => r.json()).then(setTodos);\n  }, []);\n  return <ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>;\n}"
  }
},
{
  "id": "react-what-will-happen-if-you-use-props-in-initial-state",
  "title": "What will happen if you use props in initial state?",
  "prompt": "What will happen if you use props in initial state?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      records: [],\n      inputValue: this.props.inputValue,\n    };\n  }\n\n  render() {\n    return <div>{this.state.inputValue}</div>;\n  }\n}\n\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      record: [],\n    };\n  }\n\n  render() {\n    return <div>{this.props.inputValue}</div>;\n  }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "The component throws a fatal JavaScript syntax error and refuses to mount at all.",
      "isCorrect": false,
      "explanation": "Tempting if you expect React to forbid it, but it is valid code; the problem is stale state, not a syntax error."
    },
    {
      "id": "B",
      "text": "React automatically deletes the prop from the parent component after copying it.",
      "isCorrect": false,
      "explanation": "Tempting as a side-effect claim, but copying a prop into state leaves the parent's prop untouched."
    },
    {
      "id": "C",
      "text": "State is initialized only once at mount, so later prop changes do not update it, causing stale-data bugs.",
      "isCorrect": true,
      "explanation": "Correct. The constructor runs once, so the copied value never tracks subsequent prop updates."
    },
    {
      "id": "D",
      "text": "The component is automatically converted into an uncontrolled component by React.",
      "isCorrect": false,
      "explanation": "Tempting as a transformation claim, but copying a prop into state does not change the component's controlled nature."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Copying a prop into initial state (`this.state = { inputValue: props.inputValue }`) captures only the value at mount. The constructor runs once, so if the parent later passes a new `inputValue`, state keeps the stale original, and the UI shows outdated data. This is the classic \"props in initial state\" anti-pattern.\n\nThe fix is to not duplicate the source of truth. If the value is really owned by the parent, read `this.props.inputValue` directly in render, as the second example does, so it always reflects the latest prop. Only copy a prop into state when you deliberately want a one-time seed that then diverges from the prop.\n\nThe nuance an interviewer probes: in function components the same trap is `useState(props.value)`, which also only seeds once. If you need state that resets when a prop changes, you either derive it during render or reset via a `key`, not by re-reading the prop into state.",
  "interviewLine": "Copying a prop into initial state seeds it once, so later prop changes leave the state stale; if the parent owns the value I read the prop directly in render rather than duplicating the source of truth.",
  "misconception": "Expecting state seeded from a prop to track that prop, when the constructor runs once and the copied value goes stale on later prop changes.",
  "hints": [
    "Ask how many times the constructor runs over the component's life.",
    "If the parent sends a new prop value, does the copied state update?",
    "When is copying a prop into state actually the right choice?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice reading the prop directly in render keeps it current, where copying it into state would go stale.",
    "language": "tsx",
    "code": "function Label({ text }: { text: string }) {\n  // Correct: read the prop directly so it always reflects the latest value.\n  // Wrong: const [value] = useState(text); // frozen at mount\n  return <span>{text}</span>;\n}"
  }
},
{
  "id": "react-how-do-you-conditionally-render-components",
  "title": "How do you conditionally render components?",
  "prompt": "How do you conditionally render components?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "const MyComponent = ({ name, address }) => (\n  <div>\n    <h2>{name}</h2>\n    {address && <p>{address}</p>}\n  </div>\n);\n\nconst MyComponent = ({ name, address }) => (\n  <div>\n    <h2>{name}</h2>\n    {address ? <p>{address}</p>: <p>{'Address is not available'}</p>}\n  </div>\n);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Conditional rendering is prohibited in React applications and must be avoided.",
      "isCorrect": false,
      "explanation": "Tempting if you misremember a rule, but conditional rendering is a core, encouraged pattern built on plain JavaScript."
    },
    {
      "id": "B",
      "text": "Modify `document.styleSheets` rules dynamically inside a `while` loop to show or hide elements.",
      "isCorrect": false,
      "explanation": "Tempting as an imperative hack, but editing stylesheets is not rendering; you choose JSX with JavaScript conditions."
    },
    {
      "id": "C",
      "text": "Wrap components in `v-if` or `ng-if` template directive attributes on the tags.",
      "isCorrect": false,
      "explanation": "Tempting if you know Vue or Angular, but those directives are not React; React uses JavaScript expressions."
    },
    {
      "id": "D",
      "text": "Use ternaries, logical `&&`, early `if`/`return` guards, or switch/lookup tables in JavaScript.",
      "isCorrect": true,
      "explanation": "Correct. React relies on ordinary JavaScript control flow to decide what to return and render."
    }
  ],
  "correctAnswer": "D",
  "explanation": "You render conditionally with ordinary JavaScript inside JSX: a ternary (`cond ? <A /> : <B />`) for either-or, logical `&&` (`cond && <A />`) for render-or-nothing, or an early `if`/`return` guard, or a lookup table, for larger branches. JSX braces evaluate the expression and render the result.\n\nThe choice depends on the branch: `&&` when there is nothing to render in the else case, a ternary for two inline alternatives, and a guard or map when the branches grow. React renders `null`, `false`, and `undefined` as nothing.\n\nThe nuance an interviewer probes: `&&` with a numeric left operand renders the number `0`, so `count && <X />` prints a stray zero. Guard with a boolean (`count > 0 && ...`), because unlike `null` and `false`, `0` is a value React renders.",
  "interviewLine": "I render conditionally with plain JavaScript, ternary or `&&` inline, early returns or a lookup for bigger branches, and I guard `&&` against numbers so an empty count never renders a stray `0`.",
  "misconception": "Looking for a template directive, when React uses plain JavaScript, and forgetting that `&&` renders a numeric `0`.",
  "hints": [
    "Recall that JSX braces evaluate ordinary JavaScript expressions.",
    "Which values does React skip rendering, and is `0` one of them?",
    "When the else case is nothing, which operator fits best?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the ternary supplies a fallback while the guard would need `> 0` to avoid rendering a bare count.",
    "language": "tsx",
    "code": "function Profile({ name, bio }: { name: string; bio?: string }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      {bio ? <p>{bio}</p> : <p>No bio provided</p>}\n    </div>\n  );\n}"
  }
},
{
  "id": "react-why-we-need-to-be-careful-when-spreading-props-on-dom-e",
  "title": "Why we need to be careful when spreading props on DOM elements?",
  "prompt": "Why we need to be careful when spreading props on DOM elements?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const ComponentA = () => <ComponentB isDisplay={true} className={'componentStyle'} />;\n\nconst ComponentB = ({ isDisplay...domProps }) => <div {...domProps}>{'ComponentB'}</div>;",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Spreading props deletes files from the computer's operating system.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic distractor, but spreading props only forwards object properties to an element; it touches no files."
    },
    {
      "id": "B",
      "text": "Spreading props automatically converts all numeric values into booleans.",
      "isCorrect": false,
      "explanation": "Tempting as a coercion claim, but the spread copies values unchanged; the real risk is forwarding unknown attributes."
    },
    {
      "id": "C",
      "text": "Spreading arbitrary props onto a DOM element can forward non-standard attributes, triggering React warnings and invalid HTML.",
      "isCorrect": true,
      "explanation": "Correct. Custom props leak onto the native element, which React flags and which can produce invalid markup."
    },
    {
      "id": "D",
      "text": "The spread operator `...` is illegal JavaScript syntax and crashes the build.",
      "isCorrect": false,
      "explanation": "Tempting if you doubt the syntax, but the spread is valid JavaScript; the issue is which props it forwards, not legality."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Spreading all received props onto a native DOM element (`<div {...props} />`) can forward attributes the element does not understand. Custom props meant for your component, a boolean flag, a handler by a non-standard name, get passed through to the DOM, where React warns about unknown attributes and the browser may render invalid HTML.\n\nThe safe pattern is to destructure out your component's own props and spread only the rest: `const { isDisplay, ...domProps } = props; return <div {...domProps} />`, exactly as the example does. That way only genuine DOM attributes reach the element.\n\nThe nuance an interviewer probes: React is lenient with some unknown attributes (it passes `data-*` and `aria-*` through) but warns on others and silently drops boolean-ish custom props, which can also leak internal prop names into the DOM. Being deliberate about what you spread prevents both the warnings and accidental attribute leakage.",
  "interviewLine": "Spreading all props onto a native element forwards component-only props as unknown DOM attributes, which React warns about and can produce invalid HTML, so I destructure my own props out and spread only the remaining DOM props.",
  "misconception": "Spreading every prop onto a DOM node, when component-specific props leak as invalid attributes; destructure them out and spread only the DOM rest.",
  "hints": [
    "Ask what happens to a custom prop when it lands on a real `<div>`.",
    "How do you separate your component's props from genuine DOM attributes?",
    "Which prefixes does React pass through, and which does it warn on?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice isDisplay is pulled out so only valid DOM attributes are spread onto the div.",
    "language": "tsx",
    "code": "function Box({ isDisplay, ...domProps }: { isDisplay: boolean } & React.HTMLAttributes<HTMLDivElement>) {\n  if (!isDisplay) return null;\n  return <div {...domProps}>Box</div>; // isDisplay never reaches the DOM\n}"
  }
},
{
  "id": "react-how-you-implement-server-side-rendering-or-ssr",
  "title": "How you implement Server Side Rendering or SSR?",
  "prompt": "How you implement Server Side Rendering or SSR?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "import ReactDOMServer from 'react-dom/server';\nimport App from './App';\n\nReactDOMServer.renderToString(<App />);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Execute client mouse clicks on backend server hardware via WebSockets.",
      "isCorrect": false,
      "explanation": "Tempting as a server-flavored distractor, but SSR renders HTML on the server; it does not run user clicks remotely."
    },
    {
      "id": "B",
      "text": "Compile React components into raw MP4 video streams.",
      "isCorrect": false,
      "explanation": "Tempting as a streaming-adjacent option, but SSR streams HTML, not video; it produces markup, not MP4."
    },
    {
      "id": "C",
      "text": "SSR is impossible in React because React only runs in web browsers.",
      "isCorrect": false,
      "explanation": "Tempting if you think of React as client-only, but `react-dom/server` renders components to HTML on a server."
    },
    {
      "id": "D",
      "text": "Use frameworks like Next.js/Remix or build a custom Node.js server using `renderToString` / `renderToPipeableStream` from `react-dom/server`, followed by client hydration with `hydrateRoot`.",
      "isCorrect": true,
      "explanation": "Correct. Render to HTML on the server, then hydrate on the client, either via a framework or by wiring the server APIs yourself."
    }
  ],
  "correctAnswer": "D",
  "explanation": "You implement SSR either by reaching for a framework or by wiring it yourself. The practical answer is a meta-framework, Next.js or Remix, that handles server rendering, routing, data loading, and hydration. The low-level answer is a Node server that calls `renderToString` or the streaming `renderToPipeableStream` from `react-dom/server` to produce HTML, serves it, and lets the client finish with `hydrateRoot`.\n\nEither way the shape is the same: render to HTML on the server for fast first paint and SEO, then hydrate on the client to attach interactivity to the existing markup.\n\nThe nuance an interviewer probes: hand-rolling SSR is a lot of undifferentiated work, matching server and client markup, handling data, streaming, code splitting, which is why frameworks are the default recommendation. Knowing the underlying `react-dom/server` APIs shows you understand what the framework does for you.",
  "interviewLine": "In practice I use Next.js or Remix for SSR; under the hood it renders to HTML with `renderToString` or streaming `renderToPipeableStream` and hydrates on the client with `hydrateRoot`, which is the work the framework handles for me.",
  "misconception": "Thinking React cannot render on the server, when `react-dom/server` renders to HTML and frameworks like Next.js build full SSR on top.",
  "hints": [
    "Ask what the server produces and what the client does with it afterward.",
    "Which `react-dom/server` APIs render components to HTML?",
    "Why is a framework the usual recommendation over hand-rolling SSR?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/rendering",
  "example": {
    "caption": "Notice the server renders HTML and the client calls hydrateRoot to attach interactivity to it.",
    "language": "tsx",
    "code": "// server\nimport { renderToString } from \"react-dom/server\";\nconst html = renderToString(<App />);\n\n// client\nimport { hydrateRoot } from \"react-dom/client\";\nhydrateRoot(document.getElementById(\"root\")!, <App />);"
  }
},
{
  "id": "react-what-is-the-lifecycle-methods-order-in-mounting",
  "title": "What is the lifecycle methods order in mounting?",
  "prompt": "What is the lifecycle methods order in mounting?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`getSnapshotBeforeUpdate()` -> `constructor()` -> `render()`.",
      "isCorrect": false,
      "explanation": "Tempting because it lists real methods, but `getSnapshotBeforeUpdate` is an update-phase method and never runs during mount."
    },
    {
      "id": "B",
      "text": "`render()` -> `componentDidUpdate()` -> `shouldComponentUpdate()`.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible sequence, but these are update-phase methods and the order is wrong for mounting."
    },
    {
      "id": "C",
      "text": "`componentDidMount()` -> `render()` -> `constructor()` -> `componentWillUnmount()`.",
      "isCorrect": false,
      "explanation": "Tempting because it uses mount methods, but the order is reversed and mixes in unmount; the constructor runs first."
    },
    {
      "id": "D",
      "text": "`constructor()` -> `getDerivedStateFromProps()` -> `render()` -> `componentDidMount()`.",
      "isCorrect": true,
      "explanation": "Correct. This is the mounting order, with side effects deferred to `componentDidMount` after the DOM exists."
    }
  ],
  "correctAnswer": "D",
  "explanation": "During mounting a class component runs its lifecycle methods in a fixed order: `constructor` first (initialize state), then the static `getDerivedStateFromProps` (rarely used, to sync state from props), then `render` (produce the element tree), and finally `componentDidMount` (run side effects once the DOM exists).\n\nThe ordering reflects the render-then-commit model. Everything up to and including `render` is the render phase and must be pure; `componentDidMount` is in the commit phase, the first point the real DOM is present, so that is where fetches, subscriptions, and measurements go.\n\nThe nuance an interviewer probes: the distractors mix in update- and unmount-phase methods (`shouldComponentUpdate`, `getSnapshotBeforeUpdate`, `componentDidUpdate`, `componentWillUnmount`), which never run during the initial mount. Knowing which phase each method belongs to is the point.",
  "interviewLine": "I recall mounting runs `constructor`, `getDerivedStateFromProps`, `render`, then `componentDidMount`; everything through `render` is the pure render phase, and I wait for `componentDidMount` for side effects once the DOM is committed.",
  "misconception": "Mixing update- or unmount-phase methods into the mounting sequence, when mount is only constructor, getDerivedStateFromProps, render, then componentDidMount.",
  "hints": [
    "Ask which method runs first and which runs only after the DOM exists.",
    "Which listed methods actually belong to the update or unmount phase?",
    "Where does the render phase end and the commit phase begin?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice the mount effect fires after render, mirroring componentDidMount at the end of the mounting order.",
    "language": "tsx",
    "code": "function Chart() {\n  const ref = useRef<HTMLDivElement>(null);\n  useEffect(() => {\n    drawChart(ref.current!); // runs after render, like componentDidMount\n  }, []);\n  return <div ref={ref} />;\n}"
  }
},
{
  "id": "react-what-is-the-purpose-of-getderivedstatefromprops-lifecyc",
  "title": "What is the purpose of getDerivedStateFromProps() lifecycle method?",
  "prompt": "What is the purpose of getDerivedStateFromProps() lifecycle method?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class MyComponent extends React.Component {\n  static getDerivedStateFromProps(props, state) {\n    // ...\n  }\n}",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A hook used in functional components to replace `useState` for all state.",
      "isCorrect": false,
      "explanation": "Tempting as a modern-sounding option, but it is a static class lifecycle method, not a hook, and does not replace `useState`."
    },
    {
      "id": "B",
      "text": "A static method run before `render` on mount and updates that returns an object to update state from props, or `null`.",
      "isCorrect": true,
      "explanation": "Correct. It computes derived state from props each render, with no instance access and no side effects."
    },
    {
      "id": "C",
      "text": "A method that executes asynchronous HTTP fetches on every keystroke the user makes.",
      "isCorrect": false,
      "explanation": "Tempting as a data-fetching option, but it must be pure and side-effect-free; fetches belong in `componentDidMount` or effects."
    },
    {
      "id": "D",
      "text": "A method used exclusively to mutate DOM elements directly during rendering.",
      "isCorrect": false,
      "explanation": "Tempting as an imperative option, but it only returns derived state; DOM mutation happens in the commit phase."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`static getDerivedStateFromProps(props, state)` runs before every `render`, on both mount and updates, and returns an object to merge into state, or `null` to change nothing. It exists for the rare case where state must be computed from props, for example resetting a value when a specific prop changes.\n\nBecause it is static, it has no `this`, cannot access the instance, and cannot cause side effects, it only computes derived state. That constraint is deliberate: it keeps the method pure and safe under the render phase.\n\nThe nuance an interviewer probes: it is widely overused. Most \"sync prop to state\" needs are better met by computing the value during render or lifting state up; copying props into state here recreates the stale-state anti-pattern. It is a last resort for genuinely derived state, not a general prop-to-state bridge.",
  "interviewLine": "I describe `getDerivedStateFromProps` as a static, side-effect-free method that runs before every render and returns state derived from props or `null`; I treat it as a last resort, since I handle most prop-to-state needs by computing during render.",
  "misconception": "Reaching for `getDerivedStateFromProps` to copy props into state, when most cases are better served by deriving during render; it is a pure, static last resort.",
  "hints": [
    "Ask why the method is static and what that forbids it from doing.",
    "When does it run relative to `render`, and how often?",
    "Why is copying props into state here usually the wrong instinct?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice the function-component equivalent derives the value during render instead of storing it.",
    "language": "tsx",
    "code": "function PriceTag({ cents }: { cents: number }) {\n  const dollars = (cents / 100).toFixed(2); // derived during render, no stored state\n  return <span>${dollars}</span>;\n}"
  }
},
{
  "id": "react-what-is-the-recommended-ordering-of-methods-in-componen",
  "title": "What is the recommended ordering of methods in component class?",
  "prompt": "What is the recommended ordering of methods in component class?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Sort all methods alphabetically from A to Z regardless of their type or role.",
      "isCorrect": false,
      "explanation": "Tempting as a simple rule, but alphabetical order scatters related methods; the convention groups by role and lifecycle."
    },
    {
      "id": "B",
      "text": "Order the methods randomly, changing the arrangement on every commit.",
      "isCorrect": false,
      "explanation": "Tempting as a non-answer, but random ordering defeats the readability the convention exists to provide."
    },
    {
      "id": "C",
      "text": "Static methods -> `constructor` -> lifecycle (mount to unmount) -> handlers/helpers -> getters -> `render`.",
      "isCorrect": true,
      "explanation": "Correct. This conventional order groups methods by role and life order, with `render` last for readability."
    },
    {
      "id": "D",
      "text": "Put `render` at the very top of the class, followed by the `constructor` at the bottom.",
      "isCorrect": false,
      "explanation": "Tempting as a \"most important first\" idea, but convention places `render` last so setup and handlers precede the markup."
    }
  ],
  "correctAnswer": "C",
  "explanation": "The conventional ordering of methods in a class component reads top to bottom in roughly the order they run and matter: static methods first, then the `constructor`, then lifecycle methods in life order (mount through unmount), then custom event handlers and helpers, then getters, and `render` last.\n\nThe point is readability and consistency: a reader can scan to a predictable place for each kind of method, and `render` at the bottom means you see setup and handlers before the markup that uses them. Linters like the Airbnb config enforce this with `react/sort-comp`.\n\nThe nuance an interviewer probes: this is a convention, not a correctness requirement, the code works in any order, but a consistent order lowers cognitive load across a codebase, which is why teams encode it in lint rules. It is also largely moot in function components, where there are no lifecycle methods to order.",
  "interviewLine": "I follow the convention of static methods, constructor, lifecycle methods in life order, handlers and helpers, getters, then `render` last; I treat it as a readability aid enforced by lint rules, not a correctness rule, and mostly moot in function components.",
  "misconception": "Treating method order as mandatory, when it is a readability convention (enforced by lint rules) and irrelevant to whether the code runs.",
  "hints": [
    "Ask whether the ordering affects behavior or only readability.",
    "Why place `render` at the bottom rather than the top?",
    "Which tool typically enforces this ordering in a codebase?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the handler sits above render, which comes last, matching the recommended ordering.",
    "language": "tsx",
    "code": "class Toggle extends React.Component<{}, { on: boolean }> {\n  state = { on: false };\n  handleToggle = () => this.setState((s) => ({ on: !s.on }));\n  render() {\n    return <button onClick={this.handleToggle}>{this.state.on ? \"On\" : \"Off\"}</button>;\n  }\n}"
  }
},
{
  "id": "react-what-is-a-switching-component",
  "title": "What is a switching component?",
  "prompt": "What is a switching component?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import HomePage from './HomePage';\nimport AboutPage from './AboutPage';\nimport ServicesPage from './ServicesPage';\nimport ContactPage from './ContactPage';\n\nconst PAGES = {\n  home: HomePage,\n  about: AboutPage,\n  services: ServicesPage,\n  contact: ContactPage,\n};\n\nconst Page = (props) => {\n  const Handler = PAGES[props.page] || ContactPage;\n\n  return <Handler {...props} />;\n};\n\n// The keys of the PAGES object can be used in the prop types to catch dev-time errors.\nPage.propTypes = {\n  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,\n};",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A physical hardware network switch mounted in a server rack.",
      "isCorrect": false,
      "explanation": "Tempting because of the word \"switch,\" but a switching component is a React pattern, not networking hardware."
    },
    {
      "id": "B",
      "text": "A component that renders one of several components based on a prop, usually via an object lookup map (`PAGES[page]`).",
      "isCorrect": true,
      "explanation": "Correct. It maps a key to a component and renders the resolved one, so adding a case is a single map entry."
    },
    {
      "id": "C",
      "text": "A component that rapidly toggles the physical monitor's power on and off.",
      "isCorrect": false,
      "explanation": "Tempting as a literal reading of \"switch,\" but it selects which component to render, not hardware power."
    },
    {
      "id": "D",
      "text": "A compiler plugin that swaps TypeScript for JavaScript during the build.",
      "isCorrect": false,
      "explanation": "Tempting as a tooling distractor, but a switching component is runtime UI selection, not a build plugin."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A switching component renders one of several components based on a prop, typically implemented with an object lookup map. You store a dictionary of key-to-component (`PAGES = { home: Home, about: About }`), resolve the active one (`const Handler = PAGES[props.page] || Fallback`), and render it as `<Handler {...props} />`.\n\nThis works because components are first-class values you can hold in an object and assign to a capitalized variable. Adding a case is one map entry, not another branch, and the `|| Fallback` gives a default for unknown keys.\n\nThe nuance an interviewer probes: the resolved variable must be capitalized (`Handler`), because JSX renders a lowercase name as a literal DOM tag string instead of resolving it to the component in scope. That capitalization rule is the subtle requirement that makes the pattern work.",
  "interviewLine": "A switching component picks one of several components by a prop, which I implement as a key-to-component lookup map rendered via a capitalized variable, so JSX treats it as a component and adding a case is one map entry.",
  "misconception": "Reaching for a chain of conditionals, when a lookup map of key-to-component renders the right one with a single capitalized variable.",
  "hints": [
    "Ask how you can store components themselves in a data structure.",
    "What must be true of the resolved variable's name for JSX to render it as a component?",
    "How does the map approach scale compared with stacked conditionals?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice Active is capitalized so JSX resolves it to the mapped component, with a fallback for unknown keys.",
    "language": "tsx",
    "code": "const VIEWS = { list: ListView, grid: GridView } as const;\n\nfunction Switcher({ view }: { view: keyof typeof VIEWS }) {\n  const Active = VIEWS[view] ?? ListView;\n  return <Active />;\n}"
  }
},
{
  "id": "react-what-is-strict-mode-in-react",
  "title": "What is strict mode in React?",
  "prompt": "What is strict mode in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import React from 'react';\n\nfunction ExampleApplication() {\n  return (\n    <div>\n      <Header />\n      <React.StrictMode>\n        <div>\n          <ComponentOne />\n          <ComponentTwo />\n        </div>\n      </React.StrictMode>\n      <Footer />\n    </div>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A security firewall that encrypts all of the app's JSX DOM nodes while they sit in the browser.",
      "isCorrect": false,
      "explanation": "Tempting as a safety-flavored distractor, but Strict Mode runs diagnostic checks in development; it encrypts nothing."
    },
    {
      "id": "B",
      "text": "A TypeScript compiler setting that disallows using JavaScript anywhere outside of WebAssembly modules.",
      "isCorrect": false,
      "explanation": "Tempting because \"strict\" overlaps with TypeScript, but this is a runtime React dev wrapper, not a compiler setting."
    },
    {
      "id": "C",
      "text": "A development-only tool that double-invokes renders and effects to catch impurities, flagging legacy APIs and unsafe lifecycles.",
      "isCorrect": true,
      "explanation": "Correct. The intentional double run exposes impurity and missing cleanup, and it warns about outdated APIs."
    },
    {
      "id": "D",
      "text": "A production optimization flag that disables all error throwing to prevent the website from crashing.",
      "isCorrect": false,
      "explanation": "Tempting if \"strict\" sounds protective, but it is development-only and adds checks; it changes nothing in production."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`<React.StrictMode>` is a development-only wrapper that surfaces latent problems. It double-invokes component renders, effect setups, and state updaters so impure logic and missing cleanup reveal themselves, warns on deprecated and unsafe legacy lifecycles, and flags other legacy APIs. You can wrap the whole tree or just a subtree, as the snippet does.\n\nThe benefit is catching bugs that would otherwise appear only under concurrent rendering: an effect that forgets to unsubscribe, or a render with side effects.\n\nThe nuance an interviewer probes: it does nothing in production, the double-invocation is stripped, so seeing an effect run twice in development is the tool working, signaling that cleanup must be idempotent, not a reason to remove Strict Mode.",
  "interviewLine": "`React.StrictMode` double-invokes renders and effects in development to surface impurity and missing cleanup, and warns on legacy APIs; it is stripped from production, so I fix the effect rather than remove the wrapper.",
  "misconception": "Reading the development double-invocation as a bug, when it is a deliberate, dev-only diagnostic that exposes impure renders and missing cleanup.",
  "hints": [
    "Ask whether this wrapper has any effect in a production build.",
    "Why would React run an effect's setup and cleanup twice in development?",
    "If the second run misbehaves, what does that reveal about the cleanup?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/StrictMode",
  "example": {
    "caption": "Notice you can wrap just a subtree in StrictMode, applying its dev checks only there.",
    "language": "tsx",
    "code": "function App() {\n  return (\n    <>\n      <Header />\n      <React.StrictMode>\n        <Experimental />\n      </React.StrictMode>\n    </>\n  );\n}"
  }
},
{
  "id": "react-why-should-component-names-start-with-capital-letter",
  "title": "Why should component names start with capital letter?",
  "prompt": "Why should component names start with capital letter?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class SomeComponent extends Component {\n  // Code goes here\n}\n\nclass myComponent extends Component {\n  render() {\n    return <div />;\n  }\n}\n\nexport default myComponent;\n\nimport MyComponent from './MyComponent';",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because lowercase component names cause corruption of the backend database records.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic distractor, but naming is a client-side JSX concern with no connection to a database."
    },
    {
      "id": "B",
      "text": "JSX casing distinguishes user components (PascalCase, a reference) from built-in HTML/SVG tags (lowercase, a string).",
      "isCorrect": true,
      "explanation": "Correct. Case tells the transform whether to emit a string tag or a reference to your component."
    },
    {
      "id": "C",
      "text": "Because uppercase letters are parsed roughly ten times faster by JavaScript engines at runtime.",
      "isCorrect": false,
      "explanation": "Tempting as a performance claim, but letter case has no bearing on parsing speed; it is a compile-time distinction."
    },
    {
      "id": "D",
      "text": "Because the HTML5 specification requires every element tag to be written in uppercase.",
      "isCorrect": false,
      "explanation": "Tempting as a spec-sounding claim, but HTML tags are lowercase; the rule is JSX's, not HTML's."
    }
  ],
  "correctAnswer": "B",
  "explanation": "JSX uses the first letter's case to decide how to compile a tag. A lowercase name compiles to a string type, `<div>` becomes `React.createElement('div', ...)`, treating it as a built-in HTML or SVG element. A capitalized name compiles to a reference, `<MyComponent>` becomes `React.createElement(MyComponent, ...)`, resolving to the component in scope.\n\nSo a component named `myComponent` renders as the literal unknown tag `<mycomponent>` instead of invoking your component, which silently produces wrong output rather than an error.\n\nThe nuance an interviewer probes: this is purely about the JSX transform's naming rule, not about HTML or performance. The same reason explains why you can bypass it by assigning a component to a capitalized local variable before rendering it, which the switching-component pattern relies on.",
  "interviewLine": "JSX uses case to compile tags: lowercase becomes a string host element and PascalCase becomes a reference to my component, so a lowercase name renders as an unknown literal tag instead of invoking the component.",
  "misconception": "Thinking capitalization is a style preference, when JSX compiles a lowercase tag to a string element and only a capitalized name to your component.",
  "hints": [
    "Ask what a lowercase tag versus a capitalized tag compiles into.",
    "What actually renders if you name a component `myWidget` and use `<myWidget />`?",
    "Why does assigning a component to a capitalized variable make it render?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the lowercase usage emits a literal <box> tag, while the capitalized one invokes the component.",
    "language": "tsx",
    "code": "function Box() {\n  return <div className=\"box\" />;\n}\n\n// <Box /> -> React.createElement(Box) (your component)\n// <box /> -> React.createElement(\"box\") (unknown HTML tag, not your component)"
  }
},
{
  "id": "react-are-custom-dom-attributes-supported-in-react-v16",
  "title": "Are custom DOM attributes supported in React v16?",
  "prompt": "Are custom DOM attributes supported in React v16?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<div mycustomattribute={'something'} />\n\n<div />\n\n<div mycustomattribute=\"something\" />",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Yes, React 16+ passes custom and unknown DOM attributes straight through to the real DOM elements.",
      "isCorrect": true,
      "explanation": "Correct. The pre-16 attribute whitelist was removed, so unrecognized attributes now reach the DOM node."
    },
    {
      "id": "B",
      "text": "Custom attributes only work when the component is rendered on a backend Node.js server.",
      "isCorrect": false,
      "explanation": "Tempting as a server-flavored distractor, but attribute pass-through is a client DOM behavior, independent of SSR."
    },
    {
      "id": "C",
      "text": "Custom attributes are supported only if their names are written in uppercase Roman numerals.",
      "isCorrect": false,
      "explanation": "Tempting as an oddly specific rule, but no such constraint exists; standard custom attribute names pass through."
    },
    {
      "id": "D",
      "text": "No, React 16 completely bans all custom attributes and throws syntax errors when it sees them.",
      "isCorrect": false,
      "explanation": "Tempting if you recall the pre-16 behavior, but 16 did the opposite: it started passing custom attributes through."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Yes. Since React 16, unknown attributes you put on a host element are passed straight through to the real DOM node. Before 16, React maintained a whitelist and silently dropped attributes it did not recognize, so a custom attribute never reached the DOM.\n\nThe practical effect is that `<div mycustomattribute=\"something\" />` now renders with that attribute present in the DOM. This is convenient for data-style attributes and integrations with non-React libraries that read custom attributes.\n\nThe nuance an interviewer probes: pass-through does not mean anything goes. React still expects DOM-valid attribute values and will warn about some mismatches, and for your own component props you should still avoid spreading internal props onto DOM nodes. The change removed the whitelist, it did not remove the need to pass valid attributes.",
  "interviewLine": "Since React 16 unknown attributes pass straight through to the DOM, where earlier versions dropped them off a whitelist; the values still need to be DOM-valid, and I avoid leaking internal component props onto host nodes.",
  "misconception": "Believing React still drops unknown attributes, when React 16 removed the whitelist and now forwards them to the DOM.",
  "hints": [
    "Ask what React did with an unrecognized attribute before version 16.",
    "What changed in 16 about the attribute whitelist?",
    "Does pass-through mean every value is safe, or must it still be DOM-valid?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the data attribute passes through to the DOM where a non-React library can read it.",
    "language": "tsx",
    "code": "function Widget() {\n  // Since React 16 this attribute appears on the rendered DOM node.\n  return <div data-widget-id=\"42\" mycustomattr=\"on\" />;\n}"
  }
},
{
  "id": "react-can-you-force-a-component-to-re-render-without-calling",
  "title": "Can you force a component to re-render without calling setState?",
  "prompt": "Can you force a component to re-render without calling setState?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "component.forceUpdate(callback);",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Yes, via `component.forceUpdate(callback)` in class components, though it is discouraged since render should depend only on props and state.",
      "isCorrect": true,
      "explanation": "Correct. `forceUpdate` re-renders without state, but needing it usually signals data that should live in state."
    },
    {
      "id": "B",
      "text": "No, React makes it mathematically impossible to re-render a component without calling `setState`.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but `forceUpdate` exists for exactly this; it is discouraged, not impossible."
    },
    {
      "id": "C",
      "text": "Yes, by calling `window.location.reload()` on every animation frame to refresh the view.",
      "isCorrect": false,
      "explanation": "Tempting if you equate re-render with reload, but reloading destroys all state; `forceUpdate` re-renders in place."
    },
    {
      "id": "D",
      "text": "Yes, by deleting the component's prototype object in JavaScript at runtime.",
      "isCorrect": false,
      "explanation": "Tempting as a hack, but mutating the prototype breaks the component rather than re-rendering it; use `forceUpdate` if you must."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Yes, a class component can call `this.forceUpdate(callback)` to re-render without a state change. It skips `shouldComponentUpdate` and re-runs `render`, then invokes the optional callback after the update commits.\n\nIt is strongly discouraged, though. Needing `forceUpdate` usually means render depends on something outside `props` and `state`, a mutated object, an external variable, which violates React's model that output is a pure function of props and state. The right fix is to move that data into state so changes flow normally.\n\nThe nuance an interviewer probes: function components have no `forceUpdate`. The hook-era equivalent is a throwaway state setter (`const [, forceRender] = useReducer(x => x + 1, 0)`), but reaching for it signals the same design smell, data that should be state is living somewhere React cannot see.",
  "interviewLine": "A class can call `this.forceUpdate()` to re-render without state, but I avoid it: needing it signals render depends on something React can't see, which belongs in state so updates flow normally.",
  "misconception": "Reaching for `forceUpdate` as a normal tool, when needing it usually means render depends on data outside props and state that should be moved into state.",
  "hints": [
    "Ask what `forceUpdate` skips and what it still runs.",
    "Why does needing it usually point to a design problem?",
    "What is the function-component equivalent, and does using it feel better?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/memo",
  "example": {
    "caption": "Notice moving the counter into state removes any need to force a render.",
    "language": "tsx",
    "code": "// Instead of forceUpdate, keep the changing value in state:\nfunction Ticker() {\n  const [tick, setTick] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setTick((t) => t + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <span>{tick}</span>;\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-react-and-reactdom",
  "title": "What is the difference between React and ReactDOM?",
  "prompt": "What is the difference between React and ReactDOM?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`react-dom` was deprecated and replaced by jQuery in React 18 for DOM manipulation.",
      "isCorrect": false,
      "explanation": "Tempting as a version-change claim, but `react-dom` is current and essential; React never adopted jQuery."
    },
    {
      "id": "B",
      "text": "`react` is the core for components, elements, and hooks; `react-dom` provides browser DOM rendering like `createRoot` and `hydrateRoot`.",
      "isCorrect": true,
      "explanation": "Correct. The core is platform-agnostic; the DOM renderer is the browser-specific package."
    },
    {
      "id": "C",
      "text": "`react` is for backend Node.js servers while `react-dom` is a library for frontend CSS styles.",
      "isCorrect": false,
      "explanation": "Tempting as a split, but both are frontend libraries; `react` is the core and `react-dom` the DOM renderer, neither is a CSS tool."
    },
    {
      "id": "D",
      "text": "There is no difference; the two are exact duplicates of the same published package.",
      "isCorrect": false,
      "explanation": "Tempting if you always import both, but they are distinct: a platform-agnostic core and a browser renderer."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`react` is the core, renderer-agnostic library: it defines how to create components, elements, and hooks, and contains the reconciliation model, but knows nothing about the browser. `react-dom` is the browser renderer that connects that model to the DOM, providing `createRoot`, `hydrateRoot`, and `createPortal`.\n\nThis split is why the same `react` core powers other targets: React Native uses its own renderer, and `react-dom/server` renders to HTML strings. The host-specific code lives in the renderer package, not the core.\n\nThe nuance an interviewer probes: it explains why DOM entry points live in `react-dom`, not `react`. Importing `createRoot` from `react` is a common mistake that comes from not grasping that `react` is deliberately platform-independent.",
  "interviewLine": "I split them as: `react` is the platform-agnostic core, components, elements, hooks, and reconciliation, while `react-dom` is the browser renderer with `createRoot` and `hydrateRoot`; the split is why the same core also drives React Native.",
  "misconception": "Treating `react` and `react-dom` as interchangeable, when `react` is the renderer-agnostic core and `react-dom` is the browser-specific renderer.",
  "hints": [
    "Ask which package knows about the DOM and which only about components.",
    "Where do `createRoot` and `createPortal` actually come from?",
    "How does this split let the same core target React Native?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice hooks come from react while the DOM mount comes from react-dom/client.",
    "language": "tsx",
    "code": "import { useState } from \"react\"; // core\nimport { createRoot } from \"react-dom/client\"; // DOM renderer\n\nfunction App() {\n  const [n] = useState(0);\n  return <span>{n}</span>;\n}\ncreateRoot(document.getElementById(\"root\")!).render(<App />);"
  }
},
{
  "id": "react-why-reactdom-is-separated-from-react",
  "title": "Why ReactDOM is separated from React?",
  "prompt": "Why ReactDOM is separated from React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Because ReactDOM runs exclusively compiled to WebAssembly rather than JavaScript.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level claim, but ReactDOM is JavaScript; the separation is about decoupling the core from the host."
    },
    {
      "id": "B",
      "text": "Because npm historically enforced a strict file-size limit of 10KB per published package.",
      "isCorrect": false,
      "explanation": "Tempting as a packaging reason, but no such limit drove the split; it is an architectural decoupling."
    },
    {
      "id": "C",
      "text": "To decouple React's core and reconciliation from host dependencies, so the same core targets Web, Native, Canvas, and 3D.",
      "isCorrect": true,
      "explanation": "Correct. A platform-agnostic core plus swappable renderers is what enables multiple targets."
    },
    {
      "id": "D",
      "text": "Because web browsers banned the literal word 'React' from appearing inside script tags.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but no such ban exists; the separation is a deliberate architecture decision."
    }
  ],
  "correctAnswer": "C",
  "explanation": "ReactDOM is a separate package to decouple React's core, components, elements, hooks, and the reconciliation model, from any specific host environment. The core describes what the UI should be; a renderer decides how to realize it on a particular target.\n\nThat separation is what lets the same `react` core drive many renderers: `react-dom` for the browser, React Native for mobile, React Three Fiber for WebGL, and others. Each renderer implements the host-specific operations (create a node, update it, insert it) while sharing the reconciler.\n\nThe nuance an interviewer probes: this is an architectural choice, not a packaging accident. It is why learning React's component model transfers across platforms, and why host-specific APIs like `createRoot` or Native's primitives live in the renderer, never in the core.",
  "interviewLine": "I explain ReactDOM is separate so React's core stays host-agnostic: the core owns components and reconciliation, and swappable renderers, DOM, Native, WebGL, realize it on each target, which is why the component model transfers across platforms.",
  "misconception": "Thinking the split is a packaging quirk, when it is an architecture that keeps the core host-agnostic so many renderers can share it.",
  "hints": [
    "Ask what the core must not depend on for multiple targets to work.",
    "Which renderers besides the DOM share the same React core?",
    "Where do host-specific operations live, in the core or the renderer?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the component logic is identical; only the renderer import changes between web and native.",
    "language": "tsx",
    "code": "// Web: import { createRoot } from \"react-dom/client\";\n// Native: import { AppRegistry } from \"react-native\";\nfunction Hello() {\n  const [name] = useState(\"world\"); // same react core either way\n  return <Text>Hello {name}</Text>;\n}"
  }
},
{
  "id": "react-how-to-use-react-label-element",
  "title": "How to use React label element?",
  "prompt": "How to use React label element?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<label for={'user'}>{'User'}</label>\n<input type={'text'} id={'user'} />\n\n<label htmlFor={'user'}>{'User'}</label>\n<input type={'text'} id={'user'} />",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Labels are not supported in React, so all field text must be placed in `<span>` tags instead.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but `<label>` works fine in React; you just use `htmlFor` for the association."
    },
    {
      "id": "B",
      "text": "Use `htmlFor` instead of `for` (`<label htmlFor='username'>`), because `for` is a reserved keyword in JavaScript.",
      "isCorrect": true,
      "explanation": "Correct. JSX renames the reserved `for` to `htmlFor`, which maps to the DOM `htmlFor` property."
    },
    {
      "id": "C",
      "text": "Use `for` with double quotes, as in `<label for='username'>`, exactly as in plain HTML.",
      "isCorrect": false,
      "explanation": "Tempting if you copy HTML directly, but `for` is reserved in JavaScript, so JSX requires `htmlFor`."
    },
    {
      "id": "D",
      "text": "Labels must be wrapped inside custom `<form-label>` elements for React to recognize them.",
      "isCorrect": false,
      "explanation": "Tempting as an official-sounding rule, but there is no such element; a standard `<label htmlFor>` is correct."
    }
  ],
  "correctAnswer": "B",
  "explanation": "In JSX you associate a `<label>` with an input using `htmlFor` rather than the HTML `for` attribute: `<label htmlFor=\"user\">`. The reason is that `for` is a reserved keyword in JavaScript, and since JSX compiles to JavaScript object literals, React renames it to `htmlFor`, which maps to the DOM property `label.htmlFor`.\n\nThe association matters for accessibility: a correctly linked label lets screen readers announce the field and lets users click the label to focus the input. The value of `htmlFor` must match the input's `id`.\n\nThe nuance an interviewer probes: this mirrors `className` for the reserved `class`. Both are JSX renaming the attribute to avoid a JavaScript keyword, not an HTML change, the rendered DOM still has a `for` attribute.",
  "interviewLine": "In JSX I link a label with `htmlFor` because `for` is a reserved JavaScript keyword, just as `className` stands in for `class`; the value must match the input's `id` for accessibility.",
  "misconception": "Copying the HTML `for` attribute into JSX, when `for` is a reserved JavaScript word so React uses `htmlFor`.",
  "hints": [
    "Ask why `for` cannot be used as a JSX attribute name.",
    "Which other JSX attribute is renamed for the same reason?",
    "What must `htmlFor` match on the input for the association to work?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice htmlFor matches the input id, so clicking the label focuses the field and screen readers announce it.",
    "language": "tsx",
    "code": "function EmailField() {\n  return (\n    <>\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" type=\"email\" />\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-setstate-and-replacestat",
  "title": "What is the difference between setState() and replaceState() methods?",
  "prompt": "What is the difference between setState() and replaceState() methods?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`setState` deletes all of the browser's stored cookies while `replaceState` carefully preserves them.",
      "isCorrect": false,
      "explanation": "Tempting as a side-effect claim, but neither touches cookies; the difference is merge versus full replacement of state."
    },
    {
      "id": "B",
      "text": "`setState` shallowly merges the given keys into existing state; legacy `replaceState` overwrote state with only the new keys.",
      "isCorrect": true,
      "explanation": "Correct. Merge versus replace is the distinction, and `replaceState` is a legacy API no longer on `React.Component`."
    },
    {
      "id": "C",
      "text": "`setState` is fully synchronous while `replaceState` is the asynchronous version of the same call.",
      "isCorrect": false,
      "explanation": "Tempting as a timing split, but both were asynchronous; the real difference is whether they merge or replace."
    },
    {
      "id": "D",
      "text": "`replaceState` is the standard state-updating hook introduced in React 19.",
      "isCorrect": false,
      "explanation": "Tempting as a modern-sounding claim, but `replaceState` is a removed legacy method, not a current hook."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`setState` shallowly merges the keys you pass into the existing state object, so other keys are preserved. The legacy `replaceState` overwrote the entire state object with only the keys you provided, dropping anything you omitted.\n\nIn modern React this distinction is mostly historical: `replaceState` was part of the old `createReactClass` API and does not exist on `React.Component`. You rarely need replace semantics, and when you do, you construct the full object and pass it to `setState`.\n\nThe nuance an interviewer probes: the `useState` setter does not merge at all, it replaces the value entirely. That is why you spread the previous object (`setForm(prev => ({ ...prev, field }))`) to emulate the merge that class `setState` gave you for free. Confusing merge versus replace semantics is a common source of lost state fields.",
  "interviewLine": "Class `setState` shallow-merges the keys you pass, while the legacy `replaceState` overwrote the whole object; the modern `useState` setter replaces entirely, so I spread `...prev` to keep the other fields.",
  "misconception": "Assuming all state setters merge, when class `setState` merges but the `useState` setter replaces, which is why you spread the previous object.",
  "hints": [
    "Ask what happens to keys you do not include in each call.",
    "Does the `useState` setter merge like class `setState`, or replace?",
    "What do you do to preserve other fields with the function-component setter?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice spreading prev reproduces the merge that class setState did automatically.",
    "language": "tsx",
    "code": "function Profile() {\n  const [user, setUser] = useState({ name: \"Ada\", age: 36 });\n  // Replace semantics by default: spread to keep `age`.\n  const rename = (name: string) => setUser((prev) => ({ ...prev, name }));\n  return <button onClick={() => rename(\"Grace\")}>{user.name}</button>;\n}"
  }
},
{
  "id": "react-is-it-possible-to-use-react-without-rendering-html",
  "title": "Is it possible to use React without rendering HTML?",
  "prompt": "Is it possible to use React without rendering HTML?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "render() {\n  return false\n}\n\nrender() {\n  return null\n}\n\nrender() {\n  return []\n}\n\nrender() {\n  return <React.Fragment></React.Fragment>\n}\n\nrender() {\n  return <></>\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Only if the computer is fully disconnected from the internet during rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a condition, but network state is irrelevant; components can render nothing or target non-DOM renderers regardless."
    },
    {
      "id": "B",
      "text": "Only when the application happens to be written in the Python language.",
      "isCorrect": false,
      "explanation": "Tempting as a distractor, but React is JavaScript; the language is irrelevant to whether a component renders HTML."
    },
    {
      "id": "C",
      "text": "Yes, components can return `null`, `false`, strings, numbers, or empty fragments, or target non-DOM renderers like React Native.",
      "isCorrect": true,
      "explanation": "Correct. Rendering nothing is valid, and React's core also drives renderers that output no HTML at all."
    },
    {
      "id": "D",
      "text": "No, every component must return at least one HTML `<div>` or React will crash.",
      "isCorrect": false,
      "explanation": "Tempting if you think HTML is required, but returning `null` is perfectly valid and renders nothing."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Yes. A component is not required to render visible markup. From `render` (or a function component's return) you can return `null`, `false`, a string, a number, an array, or an empty fragment, React treats `null`, `false`, and `undefined` as rendering nothing, which is how you conditionally render nothing.\n\nBeyond that, React itself is renderer-agnostic. The `react` core produces an element tree that any renderer can realize: `react-dom` targets HTML, but React Native targets native mobile views and React Three Fiber targets WebGL, so React drives UIs that are not HTML at all.\n\nThe nuance an interviewer probes: returning nothing is normal and intentional, not an error, and returning a string or number renders a text node. The deeper point is that \"React equals HTML\" is wrong; HTML is just the browser renderer's output, not React's definition.",
  "interviewLine": "I point out a component can return `null`, `false`, a string, or a fragment to render nothing or just text, and React's core is renderer-agnostic, so it drives React Native and WebGL too, not only HTML.",
  "misconception": "Equating React with HTML, when a component can render nothing and the core also targets non-DOM renderers like React Native and WebGL.",
  "hints": [
    "Ask which return values React renders as nothing at all.",
    "Does React's core actually require the DOM, or is HTML just one renderer's output?",
    "Name a React target that produces no HTML."
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice returning null renders nothing, a valid way to conditionally omit a component.",
    "language": "tsx",
    "code": "function Banner({ show, text }: { show: boolean; text: string }) {\n  if (!show) return null; // renders nothing, not an error\n  return <aside>{text}</aside>;\n}"
  }
},
{
  "id": "react-how-to-focus-an-input-element-on-page-load",
  "title": "How to focus an input element on page load?",
  "prompt": "How to focus an input element on page load?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class App extends React.Component {\n  componentDidMount() {\n    this.nameInput.focus();\n  }\n\n  render() {\n    return (\n      <div>\n        <input defaultValue={\"Won't focus\"} />\n        <input ref={(input) => (this.nameInput = input)} defaultValue={'Will focus'} />\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<App />, document.getElementById('app'));",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Focusing input elements is prohibited in React and must be handled by the browser alone.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but React fully supports programmatic focus via a ref in a mount effect."
    },
    {
      "id": "B",
      "text": "Create a ref, attach it to the input, and call `inputRef.current?.focus()` in a mount effect, or use the `autoFocus` prop.",
      "isCorrect": true,
      "explanation": "Correct. A ref plus a mount-time effect focuses the node once it exists, and `autoFocus` covers the simple case."
    },
    {
      "id": "C",
      "text": "Write an infinite synchronous `while` loop that calls `.focus()` on the element repeatedly.",
      "isCorrect": false,
      "explanation": "Tempting as a brute-force approach, but a busy loop freezes the thread; focus once in a mount effect instead."
    },
    {
      "id": "D",
      "text": "Call `document.getElementById('input').focus()` synchronously inside the component's render body.",
      "isCorrect": false,
      "explanation": "Tempting as the vanilla-JS way, but the node may not exist during render; use a ref in an effect after mount."
    }
  ],
  "correctAnswer": "B",
  "explanation": "To focus an input on mount you need a reference to the real DOM node and a mount-time hook to call `.focus()`. In a function component: create a ref with `useRef(null)`, attach it with `<input ref={inputRef} />`, and call `inputRef.current?.focus()` inside a `useEffect(() => {...}, [])`. For the simple case you can use the built-in `autoFocus` prop.\n\nThe timing is the key: focusing must happen after the element is in the DOM, which is why it goes in a mount effect (or `componentDidMount` in a class), not in the render body where the node does not exist yet.\n\nThe nuance an interviewer probes: don't call `.focus()` during render, the ref is `null` there, and avoid `document.getElementById` in React when a ref expresses the intent declaratively. `autoFocus` is fine for one field, but overusing it or focusing on every render harms accessibility.",
  "interviewLine": "I attach a `useRef` to the input and call `inputRef.current?.focus()` in a mount `useEffect`, so it runs after the node exists; for a single field the `autoFocus` prop is the simpler option.",
  "misconception": "Trying to focus during render, when the DOM node does not exist yet, focus belongs in a mount effect via a ref.",
  "hints": [
    "Ask when the input's DOM node actually exists relative to render.",
    "Which hook runs after mount, making it the right place to focus?",
    "Why prefer a ref over `document.getElementById` here?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the focus call lives in a mount effect, after the ref points at a real node.",
    "language": "tsx",
    "code": "function SearchBox() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n  return <input ref={inputRef} placeholder=\"Search\" />;\n}"
  }
},
{
  "id": "react-how-to-programmatically-trigger-click-event-in-react",
  "title": "How to programmatically trigger click event in React?",
  "prompt": "How to programmatically trigger click event in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<input ref={(input) => (this.inputElement = input)} />\n\nthis.inputElement.click();",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Programmatic clicks are impossible to perform in JavaScript on any DOM element.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but DOM elements expose a native `.click()` method you can call via a ref."
    },
    {
      "id": "B",
      "text": "Simulate a physical mouse click by programmatically shaking the user's laptop hardware.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd literalization, but you dispatch the click in software by calling the node's `.click()`."
    },
    {
      "id": "C",
      "text": "Mutate `document.cookie` with the click's timestamp to record that a click occurred.",
      "isCorrect": false,
      "explanation": "Tempting as a tracking-flavored distractor, but writing a cookie does not trigger a click; call `.click()` on the node."
    },
    {
      "id": "D",
      "text": "Get the DOM element via a `ref` (`inputRef.current`) and call its native `.click()` method.",
      "isCorrect": true,
      "explanation": "Correct. The ref exposes the real node, whose `.click()` fires its handlers, including any delegated React `onClick`."
    }
  ],
  "correctAnswer": "D",
  "explanation": "To trigger a click programmatically you reach the underlying DOM node through a ref and call its native `.click()` method: attach `ref={inputRef}`, then invoke `inputRef.current.click()`. React has no synthetic API for dispatching a click, you use the DOM node's own method.\n\nThe common real use is a hidden file input: style a custom button, and on its click call the hidden `<input type=\"file\">`'s `.click()` to open the file picker, since you cannot style the native input nicely.\n\nThe nuance an interviewer probes: this is deliberately imperative, so it belongs in an event handler or effect, where `ref.current` is populated, not during render where it is `null`. And a native `.click()` fires the element's real click handlers, including any React `onClick` you attached, since those are delegated from real DOM events.",
  "interviewLine": "I get the DOM node through a `ref` and call its native `.click()`, typically to open a hidden file input from a styled button; I do it in a handler or effect since `ref.current` is null during render.",
  "misconception": "Expecting a React API to dispatch clicks, when you call the DOM node's native `.click()` through a ref, in a handler or effect.",
  "hints": [
    "Ask what exposes the real DOM node so you can call its methods.",
    "Which native method on the element dispatches a click?",
    "Why must you call it from a handler or effect rather than during render?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the visible button triggers the hidden file input's native click to open the picker.",
    "language": "tsx",
    "code": "function Upload() {\n  const fileRef = useRef<HTMLInputElement>(null);\n  return (\n    <>\n      <input ref={fileRef} type=\"file\" hidden />\n      <button onClick={() => fileRef.current?.click()}>Choose file</button>\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-are-the-popular-packages-for-animation",
  "title": "What are the popular packages for animation?",
  "prompt": "What are the popular packages for animation?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "concurrency",
  "tags": [
    "react",
    "concurrency",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Framer Motion, React Spring, React Transition Group, and GSAP are the common animation libraries.",
      "isCorrect": true,
      "explanation": "Correct. These are the widely used React animation libraries, each suited to different kinds of motion."
    },
    {
      "id": "B",
      "text": "Webpack and Babel are the standard packages used for animating React components.",
      "isCorrect": false,
      "explanation": "Tempting because they are popular tools, but they are a bundler and a compiler, not animation libraries."
    },
    {
      "id": "C",
      "text": "Adobe Flash Player and Microsoft Silverlight are the recommended React animation plugins.",
      "isCorrect": false,
      "explanation": "Tempting as legacy media tech, but both are discontinued browser plugins, unrelated to React animation."
    },
    {
      "id": "D",
      "text": "PostgreSQL and Redis are the libraries most teams reach for to animate components.",
      "isCorrect": false,
      "explanation": "Tempting as real tools, but these are databases; they have nothing to do with UI animation."
    }
  ],
  "correctAnswer": "A",
  "explanation": "The common animation libraries in the React ecosystem are Framer Motion (now Motion), a declarative API for component animations and gestures; React Spring, a physics-based spring model; React Transition Group, low-level enter/exit lifecycle hooks for mount and unmount transitions; and GSAP, a powerful imperative timeline library used for complex sequences.\n\nThe choice depends on the need. Declarative component animation and layout transitions fit Framer Motion; natural spring physics fit React Spring; coordinating mount and unmount of lists fits Transition Group; and intricate scripted timelines fit GSAP.\n\nThe nuance an interviewer probes: CSS transitions and animations handle many cases with zero JavaScript, and React's `useTransition` is about render prioritization, not visual animation, so pick a library only when CSS cannot express the motion you need.",
  "interviewLine": "For React animation I reach for Framer Motion, React Spring, React Transition Group, or GSAP depending on the motion, and I use CSS transitions when they suffice, since `useTransition` prioritizes rendering, not animation.",
  "misconception": "Confusing React's `useTransition` or build tools with animation libraries, when visual motion comes from CSS or libraries like Framer Motion.",
  "hints": [
    "Separate genuine animation libraries from bundlers and compilers.",
    "Which approach needs no JavaScript at all for simple motion?",
    "Does React's `useTransition` animate anything, or schedule rendering?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice Framer Motion animates declaratively through props rather than imperative DOM calls.",
    "language": "tsx",
    "code": "import { motion } from \"framer-motion\";\n\nfunction FadeIn({ children }: { children: React.ReactNode }) {\n  return (\n    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>\n      {children}\n    </motion.div>\n  );\n}"
  }
},
{
  "id": "react-what-are-the-popular-react-specific-linters",
  "title": "What are the popular React-specific linters?",
  "prompt": "What are the popular React-specific linters?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Grammarly and Microsoft Word Spell Check are the standard React linters teams configure.",
      "isCorrect": false,
      "explanation": "Tempting because they check text, but they proofread prose; React linting is ESLint with React plugins."
    },
    {
      "id": "B",
      "text": "PostgreSQL query analyzers are what developers use to lint their React components.",
      "isCorrect": false,
      "explanation": "Tempting as a real tool category, but query analyzers inspect SQL, not React or JSX code."
    },
    {
      "id": "C",
      "text": "ESLint with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y` (or Biome / Oxlint).",
      "isCorrect": true,
      "explanation": "Correct. These plugins enforce JSX, hooks, and accessibility rules; Biome and Oxlint are newer alternatives."
    },
    {
      "id": "D",
      "text": "The Chrome DevTools Network panel is the primary linter for React applications.",
      "isCorrect": false,
      "explanation": "Tempting as a dev tool, but the Network panel inspects requests at runtime; it lints no code."
    }
  ],
  "correctAnswer": "C",
  "explanation": "React linting centers on ESLint with React-aware plugins: `eslint-plugin-react` for JSX and component rules, `eslint-plugin-react-hooks` for the Rules of Hooks and exhaustive effect dependencies, and `eslint-plugin-jsx-a11y` for accessibility checks on JSX. Newer all-in-one tools like Biome and Oxlint cover similar ground with faster, Rust-based engines.\n\nThese matter because many React bugs are rule violations a linter catches statically: calling a hook conditionally, missing an effect dependency, or an inaccessible element. The hooks plugin in particular prevents a whole class of subtle bugs before runtime.\n\nThe nuance an interviewer probes: `eslint-plugin-react-hooks` is the one that enforces hooks correctness, and its exhaustive-deps rule is the practical workhorse. Disabling that rule to silence a warning, rather than fixing the dependency, is a common mistake that reintroduces stale-closure bugs.",
  "interviewLine": "React linting is ESLint with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y`, or newer tools like Biome and Oxlint; the hooks plugin's exhaustive-deps rule is the one I rely on most to catch stale-closure bugs.",
  "misconception": "Thinking generic text or runtime tools lint React, when it is ESLint with React, hooks, and a11y plugins (or Biome/Oxlint).",
  "hints": [
    "Ask which tool actually analyzes JavaScript and JSX for rule violations.",
    "Which plugin enforces the Rules of Hooks and effect dependencies?",
    "What goes wrong when you disable exhaustive-deps instead of fixing it?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the exhaustive-deps rule flags the missing dependency that would cause a stale closure.",
    "language": "tsx",
    "code": "function Greeter({ name }: { name: string }) {\n  useEffect(() => {\n    console.log(name); // react-hooks/exhaustive-deps wants `name` in the array\n  }, []); // lint warns: missing dependency 'name'\n  return <span>{name}</span>;\n}"
  }
},
{
  "id": "react-what-are-render-props",
  "title": "What are render props?",
  "prompt": "What are render props?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "<DataProvider render={(data) => <h1>{`Hello ${data.target}`}</h1>} />",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A built-in React hook that forces DOM elements to re-render on demand.",
      "isCorrect": false,
      "explanation": "Tempting as a React-sounding option, but a render prop is a pattern passing a function as a prop, not a hook."
    },
    {
      "id": "B",
      "text": "A pattern where a prop is a function used to share state and tell the component what to render.",
      "isCorrect": true,
      "explanation": "Correct. The component calls the function with its data, letting the consumer decide the rendered output."
    },
    {
      "id": "C",
      "text": "A compiler flag that enables rendering 3D graphics through WebGL in the browser.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent distractor, but a render prop is a composition pattern, not a graphics flag."
    },
    {
      "id": "D",
      "text": "A method for compiling a component's CSS styles into WebAssembly modules.",
      "isCorrect": false,
      "explanation": "Tempting as a build-sounding option, but render props concern passing render logic, not compiling styles."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A render prop is a prop whose value is a function that returns JSX. Instead of rendering fixed children, a component calls `props.render(data)` and renders whatever that function returns, so the consumer decides the output while the component supplies the data or behavior.\n\nIt is a reuse pattern for sharing cross-cutting logic, a mouse tracker, a data fetcher, without dictating the UI. The provider owns the state; the render prop injects it into caller-controlled markup, as in `<DataProvider render={data => <UI data={data} />} />`.\n\nThe nuance an interviewer probes: `children` can be a function too (`<Provider>{data => ...}</Provider>`), the prop need not be literally named `render`. And since hooks arrived, a custom hook usually expresses the same reuse more cleanly, so render props mostly appear in older code or libraries whose API predates hooks.",
  "interviewLine": "A render prop passes a function that returns JSX, so the component shares its data or behavior while the caller controls the output; today I usually reach for a custom hook, which expresses the same reuse without the extra nesting.",
  "misconception": "Thinking the prop must be named `render`, when any function prop, including `children`, works, and a custom hook now usually replaces the pattern.",
  "hints": [
    "Ask what the value of the prop is in this pattern.",
    "Who decides the markup, the provider or the consumer?",
    "What modern feature now covers most of what render props did?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the component supplies the width and the caller's function decides how to render it.",
    "language": "tsx",
    "code": "function WindowWidth({ children }: { children: (w: number) => React.ReactNode }) {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const on = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", on);\n    return () => window.removeEventListener(\"resize\", on);\n  }, []);\n  return <>{children(w)}</>;\n}"
  }
},
{
  "id": "react-how-do-you-programmatically-navigate-using-react-router",
  "title": "How do you programmatically navigate using React Router v4?",
  "prompt": "How do you programmatically navigate using React Router v4?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { withRouter } from 'react-router-dom'; // this also works with 'react-router-native'\n\n   const Button = withRouter(({ history }) => (\n     <button\n       type=\"button\"\n       onClick={() => {\n         history.push('/new-location');\n       }}\n     >\n       {'Click Me!'}\n     </button>\n   ));\n\nimport { Route } from 'react-router-dom';\n\n   const Button = () => (\n     <Route\n       render={({ history }) => (\n         <button\n           type=\"button\"\n           onClick={() => {\n             history.push('/new-location');\n           }}\n         >\n           {'Click Me!'}\n         </button>\n       )}\n     />\n   );\n\nconst Button = (props, context) => (\n     <button\n       type=\"button\"\n       onClick={() => {\n         context.history.push('/new-location');\n       }}\n     >\n       {'Click Me!'}\n     </button>\n   );\n\n   Button.contextTypes = {\n     history: React.PropTypes.shape({\n       push: React.PropTypes.func.isRequired,\n     }),\n   };",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Programmatic navigation is not supported in React Router and must be done through plain links only.",
      "isCorrect": false,
      "explanation": "Tempting if you only use `<Link>`, but React Router provides imperative navigation via `useNavigate` or `history.push`."
    },
    {
      "id": "B",
      "text": "In v6+ use the `useNavigate()` hook (`navigate('/path')`); in legacy v4/v5 use `history.push()` via `withRouter` or `useHistory`.",
      "isCorrect": true,
      "explanation": "Correct. The modern API is `useNavigate`; older versions pushed onto the `history` object."
    },
    {
      "id": "C",
      "text": "Assign `window.location.href = '/path'` inside every event handler that needs to navigate.",
      "isCorrect": false,
      "explanation": "Tempting as a vanilla approach, but setting `location` forces a full reload and loses app state; use the router's navigate."
    },
    {
      "id": "D",
      "text": "Call `React.navigate('/path')` directly from the core React package.",
      "isCorrect": false,
      "explanation": "Tempting as a plausible API, but navigation lives in the router, not the `react` core; there is no `React.navigate`."
    }
  ],
  "correctAnswer": "B",
  "explanation": "In React Router v6 you navigate imperatively with the `useNavigate` hook: `const navigate = useNavigate()` then `navigate('/path')`. In the legacy v4/v5 API you used the `history` object, obtained via `withRouter`, a `<Route>` render prop, or later `useHistory`, and called `history.push('/path')`.\n\nYou use this when navigation is triggered by logic rather than a link click, after a successful form submit, a login redirect, or a timeout. For plain in-app links you still prefer `<Link>` so the markup stays declarative and accessible.\n\nThe nuance an interviewer probes: avoid `window.location.href`, which forces a full page reload and discards app state; the router's `navigate` performs a client-side transition. And in Next.js App Router the equivalent is `useRouter().push` from `next/navigation`, not React Router.",
  "interviewLine": "In React Router v6 I navigate imperatively with `useNavigate`, after a form submit or login, reserving `<Link>` for declarative links; I avoid `window.location`, which reloads and loses state, and in Next.js I use `useRouter().push`.",
  "misconception": "Reaching for `window.location` to navigate, when it forces a full reload; the router's `useNavigate` does a client-side transition.",
  "hints": [
    "Ask which hook v6 provides for imperative navigation.",
    "Why avoid `window.location.href` for an in-app route change?",
    "When is a `<Link>` preferable to calling navigate yourself?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice navigate runs after the async action, a client-side transition that keeps app state.",
    "language": "tsx",
    "code": "import { useNavigate } from \"react-router-dom\";\n\nfunction LoginForm({ login }: { login: () => Promise<void> }) {\n  const navigate = useNavigate();\n  async function onSubmit() {\n    await login();\n    navigate(\"/dashboard\");\n  }\n  return <button onClick={onSubmit}>Sign in</button>;\n}"
  }
},
{
  "id": "react-why-you-get-router-may-have-only-one-child-element-warn",
  "title": "Why you get \"Router may have only one child element\" warning?",
  "prompt": "Why you get \"Router may have only one child element\" warning?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { Switch, Router, Route } from 'react-router';\n\n<Router>\n  <Switch>\n    <Route {/* ... */} />\n    <Route {/* ... */} />\n  </Switch>\n</Router>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because routers are physically incapable of rendering more than one pixel to the screen at a time.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd literalization, but the warning is about the single child element rule, not pixels."
    },
    {
      "id": "B",
      "text": "Because React allows only a single HTML element to exist in the entire application.",
      "isCorrect": false,
      "explanation": "Tempting as an overgeneralized rule, but React apps have many elements; the constraint was specific to the old `<Router>` child."
    },
    {
      "id": "C",
      "text": "Older `<Router>` required a single child (like `<Switch>` or a `<div>`); v6 `<Routes>` wraps multiple `<Route>` children directly.",
      "isCorrect": true,
      "explanation": "Correct. The warning is a version-specific single-child rule that `<Routes>` later removed."
    },
    {
      "id": "D",
      "text": "Because you forgot to install a required Google Chrome browser extension for routing.",
      "isCorrect": false,
      "explanation": "Tempting as a setup distractor, but no extension is involved; the warning is about the router's child element."
    }
  ],
  "correctAnswer": "C",
  "explanation": "This warning comes from older React Router (v3/v4), where `<Router>` accepted exactly one child element. You satisfied it by wrapping your routes in a single element, a `<Switch>` or a `<div>`, so the router had one child to render.\n\nIt reflects the single-root rule: the router component expected one node, and giving it multiple sibling `<Route>` elements directly broke that expectation.\n\nThe nuance an interviewer probes: this is version-specific and obsolete. React Router v6 replaced `<Switch>` with `<Routes>`, which is explicitly designed to hold multiple `<Route>` children and pick the best match, so the warning no longer applies. Citing `<Switch>` as current practice signals outdated knowledge.",
  "interviewLine": "I recognize that warning from older React Router, where `<Router>` took a single child so I wrapped routes in `<Switch>`; v6 replaced it with `<Routes>`, which holds multiple `<Route>` children directly, so it no longer applies.",
  "misconception": "Thinking the single-child rule still applies, when React Router v6's `<Routes>` is built to hold multiple `<Route>` children directly.",
  "hints": [
    "Ask how many children the old `<Router>` component accepted.",
    "What single wrapper satisfied that rule in older versions?",
    "What did v6 introduce that makes the warning obsolete?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://nextjs.org/docs/app/building-your-application/routing",
  "example": {
    "caption": "Notice v6 Routes holds the Route children directly, with no single-child wrapper needed.",
    "language": "tsx",
    "code": "import { Routes, Route } from \"react-router-dom\";\n\nfunction App() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n      <Route path=\"/about\" element={<About />} />\n    </Routes>\n  );\n}"
  }
},
{
  "id": "react-how-to-use-formattedmessage-as-placeholder-using-react",
  "title": "How to use <FormattedMessage> as placeholder using React Intl?",
  "prompt": "How to use <FormattedMessage> as placeholder using React Intl?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import React from 'react';\nimport { injectIntl, intlShape } from 'react-intl';\n\nconst MyComponent = ({ intl }) => {\n  const placeholder = intl.formatMessage({ id: 'messageId' });\n  return <input placeholder={placeholder} />;\n};\n\nMyComponent.propTypes = {\n  intl: intlShape.isRequired,\n};\n\nexport default injectIntl(MyComponent);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because `<FormattedMessage>` returns elements, use `intl.formatMessage({ id })` from `useIntl()` for string attributes like `placeholder`.",
      "isCorrect": true,
      "explanation": "Correct. Attributes need a string, so the imperative `formatMessage` is used instead of the component there."
    },
    {
      "id": "B",
      "text": "Hardcode all of the input placeholders in English only and skip localization for them.",
      "isCorrect": false,
      "explanation": "Tempting as a shortcut, but it abandons localization; `formatMessage` localizes the string for the attribute."
    },
    {
      "id": "C",
      "text": "Placeholders simply cannot be localized at all when using the `react-intl` library.",
      "isCorrect": false,
      "explanation": "Tempting if the component seems to be the only API, but `formatMessage` localizes strings for exactly this case."
    },
    {
      "id": "D",
      "text": "Pass the component directly, as in `placeholder={<FormattedMessage id='...' />}`.",
      "isCorrect": false,
      "explanation": "Tempting as the obvious attempt, but `placeholder` needs a string; passing an element renders incorrectly."
    }
  ],
  "correctAnswer": "A",
  "explanation": "`<FormattedMessage>` renders React elements, not a plain string, so you cannot pass it to a string-only attribute like `placeholder`, `title`, or `aria-label`. For those you call `intl.formatMessage({ id: '...' })`, which returns a string, getting `intl` from the `useIntl()` hook (or the older `injectIntl` HOC).\n\nThe distinction is element versus string: use the component where React children are expected, and the imperative `formatMessage` where a string value is required.\n\nThe nuance an interviewer probes: this is the same element-versus-string issue that appears whenever you need localized text in an attribute. Passing `<FormattedMessage />` into `placeholder` renders `[object Object]` or breaks, which is why the imperative API exists for attribute values.",
  "interviewLine": "`<FormattedMessage>` renders elements, so for string attributes like `placeholder` I call `intl.formatMessage({ id })` from `useIntl()`, since the attribute needs a string, not a React element.",
  "misconception": "Trying to put `<FormattedMessage>` into a string attribute, when attributes need a string from `intl.formatMessage`, not a React element.",
  "hints": [
    "Ask what `<FormattedMessage>` returns, a string or React elements.",
    "What type does an attribute like `placeholder` require?",
    "Which imperative API gives you the localized string instead?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice useIntl().formatMessage returns a string suitable for the placeholder attribute.",
    "language": "tsx",
    "code": "import { useIntl } from \"react-intl\";\n\nfunction SearchBox() {\n  const intl = useIntl();\n  const placeholder = intl.formatMessage({ id: \"search.placeholder\" });\n  return <input placeholder={placeholder} />;\n}"
  }
},
{
  "id": "react-what-is-testrenderer-package-in-react",
  "title": "What is TestRenderer package in React?",
  "prompt": "What is TestRenderer package in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "import TestRenderer from 'react-test-renderer';\n\nconst Link = ({ page, children }) => <a href={page}>{children}</a>;\n\nconst testRenderer = TestRenderer.create(\n  <Link page={'https://www.facebook.com/'}>{'Facebook'}</Link>,\n);\n\nconsole.log(testRenderer.toJSON());\n// {\n//   type: 'a',\n//   props: { href: 'https://www.facebook.com/' },\n//   children: [ 'Facebook' ]\n// }",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A backend PostgreSQL database query compiler used in Node.js services.",
      "isCorrect": false,
      "explanation": "Tempting as a tooling distractor, but `react-test-renderer` renders components to objects, not SQL."
    },
    {
      "id": "B",
      "text": "A package that rendered components to plain JS objects without a DOM for snapshot testing (deprecated in React 19 for RTL).",
      "isCorrect": true,
      "explanation": "Correct. It produced a serializable object tree for snapshots, now superseded by React Testing Library."
    },
    {
      "id": "C",
      "text": "A 3D video game graphics engine built specifically for React applications.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent option, but it is a test renderer producing JS objects, not a game engine."
    },
    {
      "id": "D",
      "text": "A production CSS minifier plugin that integrates with Webpack builds.",
      "isCorrect": false,
      "explanation": "Tempting as a build tool, but it is a testing package; it minifies nothing."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`react-test-renderer` rendered a React component tree to plain JavaScript objects, no browser or DOM required, so you could inspect or snapshot the output as data. `TestRenderer.create(<Link />).toJSON()` returns a `{ type, props, children }` object representing the rendered tree.\n\nIt was mainly used for snapshot testing and for environments without a DOM. Because it produced a serializable object tree, it paired naturally with Jest snapshots.\n\nThe nuance an interviewer probes: it is deprecated in React 19, and the ecosystem moved to React Testing Library, which renders into a real (jsdom) DOM and tests from the user's perspective. Citing `react-test-renderer` as the current way to test React signals outdated practice.",
  "interviewLine": "`react-test-renderer` rendered components to plain JS objects without a DOM for snapshot testing; it is deprecated in React 19, so I use React Testing Library, which renders into a real DOM and tests from the user's view.",
  "misconception": "Treating `react-test-renderer` as the current testing tool, when it is deprecated in React 19 and RTL's DOM-based testing is preferred.",
  "hints": [
    "Ask what the package produced instead of real DOM nodes.",
    "What was its main use, and which tool replaced it?",
    "Why does the ecosystem prefer DOM-based testing now?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice RTL renders into a real DOM and queries accessible output, the modern replacement.",
    "language": "tsx",
    "code": "import { render, screen } from \"@testing-library/react\";\n\ntest(\"renders a link\", () => {\n  render(<Link page=\"/home\">Home</Link>);\n  expect(screen.getByRole(\"link\", { name: \"Home\" })).toHaveAttribute(\"href\", \"/home\");\n});"
  }
},
{
  "id": "react-how-to-dispatch-an-action-on-load",
  "title": "How to dispatch an action on load?",
  "prompt": "How to dispatch an action on load?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class App extends Component {\n  componentDidMount() {\n    this.props.fetchData();\n  }\n\n  render() {\n    return this.props.isLoaded ? <div>{'Loaded'}</div>: <div>{'Not Loaded'}</div>;\n  }\n}\n\nconst mapStateToProps = (state) => ({\n  isLoaded: state.isLoaded,\n});\n\nconst mapDispatchToProps = { fetchData };\n\nexport default connect(mapStateToProps, mapDispatchToProps)(App);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Dispatch the action directly inside the component's render function body on each render.",
      "isCorrect": false,
      "explanation": "Tempting as the obvious spot, but dispatching during render fires on every render and can cause an update loop."
    },
    {
      "id": "B",
      "text": "Actions cannot be dispatched on a component's initial load; they require a user click first.",
      "isCorrect": false,
      "explanation": "Tempting if you only dispatch from handlers, but a mount effect dispatches on load without any interaction."
    },
    {
      "id": "C",
      "text": "Dispatch the action by writing the payload to `document.cookie` when the component appears.",
      "isCorrect": false,
      "explanation": "Tempting as a persistence hack, but a cookie write is not a dispatch; you call `dispatch` in a mount effect."
    },
    {
      "id": "D",
      "text": "Dispatch inside `useEffect(() => { dispatch(fetchData()); }, [])` (or `componentDidMount` in a class).",
      "isCorrect": true,
      "explanation": "Correct. A mount effect dispatches once after the component is in the DOM."
    }
  ],
  "correctAnswer": "D",
  "explanation": "To dispatch an action when a component first loads, you call it from a mount-time hook. In a function component that is `useEffect(() => { dispatch(fetchData()); }, [])`, whose empty dependency array runs the effect once after mount. In a class component the equivalent is `componentDidMount`.\n\nThe effect timing matters: dispatching after mount means the component is in the DOM and the state update from the action re-renders it cleanly. Doing it in the render body would dispatch on every render and can loop.\n\nThe nuance an interviewer probes: an empty dependency array runs once, but under Strict Mode in development the effect runs twice, so the fetch must be safe to repeat (idempotent or abortable). Modern data layers like React Query handle this fetching and caching for you, reducing the need to dispatch load actions manually.",
  "interviewLine": "I dispatch load actions in a mount `useEffect` with an empty dependency array (or `componentDidMount`), keeping the fetch idempotent for Strict Mode's double run; often a data layer like React Query removes the need entirely.",
  "misconception": "Dispatching during render, when load actions belong in a mount effect that runs once (and must be safe under Strict Mode's double-invoke).",
  "hints": [
    "Ask which hook runs once after the component mounts.",
    "What goes wrong if you dispatch directly in the render body?",
    "Why must the fetch be safe to run twice in development?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the empty-array effect dispatches once on mount, after the component is in the DOM.",
    "language": "tsx",
    "code": "function Dashboard() {\n  const dispatch = useDispatch();\n  useEffect(() => {\n    dispatch(fetchData());\n  }, [dispatch]);\n  return <Panel />;\n}"
  }
},
{
  "id": "react-how-to-reset-state-in-redux",
  "title": "How to reset state in Redux?",
  "prompt": "How to reset state in Redux?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const appReducer = combineReducers({\n  /* your app's top-level reducers */\n});\n\nconst rootReducer = (state, action) => {\n  if (action.type === 'USER_LOGOUT') {\n    state = undefined;\n  }\n\n  return appReducer(state, action);\n};\n\nconst appReducer = combineReducers({\n  /* your app's top-level reducers */\n});\n\nconst rootReducer = (state, action) => {\n  if (action.type === 'USER_LOGOUT') {\n    Object.keys(state).forEach((key) => {\n      storage.removeItem(`persist:${key}`);\n    });\n\n    state = undefined;\n  }\n\n  return appReducer(state, action);\n};",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Delete the Redux package from `node_modules` at runtime to clear the store.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic reset, but removing a package at runtime is impossible and would crash; you reset via the root reducer."
    },
    {
      "id": "B",
      "text": "In the root reducer, handle a reset action by setting `state = undefined` so slice reducers re-initialize to defaults.",
      "isCorrect": true,
      "explanation": "Correct. Passing `undefined` makes each reducer return its initial state, resetting the whole store."
    },
    {
      "id": "C",
      "text": "Restart the user's physical computer to clear the in-memory Redux state.",
      "isCorrect": false,
      "explanation": "Tempting as a literal reset, but a reboot is absurd; the store resets by dispatching a reset action to the root reducer."
    },
    {
      "id": "D",
      "text": "Mutate `store.state = null` directly in application code to wipe the state.",
      "isCorrect": false,
      "explanation": "Tempting as a direct route, but you never mutate the store; you dispatch an action the root reducer handles."
    }
  ],
  "correctAnswer": "B",
  "explanation": "You reset the entire Redux store by handling a reset action in the root reducer. When it sees the action (say `USER_LOGOUT` or `RESET_APP`), it sets `state = undefined` before delegating to the combined slice reducers; because reducers return their initial state when called with `undefined`, every slice re-initializes to its default.\n\nThis is cleaner than resetting each slice individually: one action, handled once at the root, resets everything consistently, which is ideal for logout.\n\nThe nuance an interviewer probes: this works because of how `combineReducers` and reducer defaults interact, passing `undefined` state triggers each reducer's default parameter. If you persist state (redux-persist), you also clear the persisted storage in the same handler, or the old state rehydrates on reload.",
  "interviewLine": "I reset Redux in the root reducer: on a reset action I set `state = undefined` before delegating, so every slice reducer returns its initial state, and I clear persisted storage in the same handler if I use redux-persist.",
  "misconception": "Trying to reset the store by mutating it directly, when the root reducer sets state to `undefined` so each slice reducer returns its initial state.",
  "hints": [
    "Ask what a reducer returns when called with `undefined` state.",
    "Where is the one place to handle the reset so every slice resets together?",
    "What else must you clear if the state is persisted?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice setting state to undefined before delegating makes each slice fall back to its initial state.",
    "language": "typescript",
    "code": "const appReducer = combineReducers({ user: userReducer, cart: cartReducer });\n\nconst rootReducer = (state: RootState | undefined, action: AnyAction) => {\n  if (action.type === \"RESET_APP\") state = undefined;\n  return appReducer(state, action);\n};"
  }
},
{
  "id": "react-what-is-the-difference-between-component-and-container",
  "title": "What is the difference between component and container in React Redux?",
  "prompt": "What is the difference between component and container in React Redux?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Presentational components run on the client while containers run inside Docker on the server.",
      "isCorrect": false,
      "explanation": "Tempting as an infrastructure split, but the distinction is about data-wiring versus UI, not where code runs."
    },
    {
      "id": "B",
      "text": "Presentational components render UI from props and emit callbacks; containers connect to the store and pass state down.",
      "isCorrect": true,
      "explanation": "Correct. One concerns appearance via props; the other wires up the Redux store and feeds data to children."
    },
    {
      "id": "C",
      "text": "Components are written in CSS while containers are written in SQL.",
      "isCorrect": false,
      "explanation": "Tempting as a language split, but both are React components; the difference is responsibility, not language."
    },
    {
      "id": "D",
      "text": "There is no difference between the two; they are exact duplicates of each other.",
      "isCorrect": false,
      "explanation": "Tempting if the terms blur, but they play distinct roles: presentational UI versus store-connected data wiring."
    }
  ],
  "correctAnswer": "B",
  "explanation": "The presentational-versus-container split separates how things look from how they work. A presentational component focuses on UI: it receives data through props, renders markup, and emits events via callbacks, with no knowledge of Redux. A container connects to the store, selects state and binds dispatch (with `connect` or hooks), and passes that data down to presentational children.\n\nThe benefit is reusability and testability: presentational components are pure and easy to test in isolation, while containers isolate the store coupling in one place.\n\nThe nuance an interviewer probes: the pattern predates hooks and is now less rigid, with `useSelector` and `useDispatch`, a component can read the store directly, so the hard container/presentational boundary has softened. The underlying principle, separating data-wiring from presentation, still holds even when you no longer create explicit container components.",
  "interviewLine": "I separate presentational components, which take data via props and emit callbacks, from containers, which connect to the Redux store and feed state down; hooks like `useSelector` have softened the hard boundary, but I still separate data-wiring from presentation.",
  "misconception": "Treating the split as mandatory structure, when it is a separation of concerns, now softened by hooks that let any component read the store.",
  "hints": [
    "Ask which one knows about the Redux store and which only about props.",
    "What does separating them buy you for testing and reuse?",
    "How did `useSelector` and `useDispatch` change this pattern?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the presentational component is store-unaware; the container wires selectors and dispatch to it.",
    "language": "tsx",
    "code": "function TodoListView({ todos, onToggle }: { todos: Todo[]; onToggle: (id: string) => void }) {\n  return <ul>{todos.map((t) => <li key={t.id} onClick={() => onToggle(t.id)}>{t.text}</li>)}</ul>;\n}\n\nfunction TodoListContainer() {\n  const todos = useSelector((s: RootState) => s.todos);\n  const dispatch = useDispatch();\n  return <TodoListView todos={todos} onToggle={(id) => dispatch(toggle(id))} />;\n}"
  }
},
{
  "id": "react-how-to-structure-redux-top-level-directories",
  "title": "How to structure Redux top level directories?",
  "prompt": "How to structure Redux top level directories?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Redux forbids using any directories and requires the entire store to live in a single root file.",
      "isCorrect": false,
      "explanation": "Tempting as a strict rule, but Redux imposes no such constraint; feature folders are the recommended structure."
    },
    {
      "id": "B",
      "text": "Put all 10,000 of the application's functions into a single `.env` configuration file.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but `.env` holds environment variables, not application code or reducers."
    },
    {
      "id": "C",
      "text": "Feature-based 'Ducks' folders (a slice with reducers, actions, selectors together), or Rails-style type folders.",
      "isCorrect": true,
      "explanation": "Correct. Feature colocation is the modern recommendation, with type folders as the older alternative."
    },
    {
      "id": "D",
      "text": "Structure the directories strictly by each file's creation timestamp.",
      "isCorrect": false,
      "explanation": "Tempting as a non-answer, but timestamp ordering ignores feature cohesion that good structure is built around."
    }
  ],
  "correctAnswer": "C",
  "explanation": "The modern recommendation is feature-based structure, often called the Ducks or slice pattern: group everything for a feature in one folder, `features/todos/todosSlice.ts` holding that feature's reducer, actions, and selectors together. The older alternative is type-based folders (`actions/`, `reducers/`, `selectors/`), which splits one feature across many directories.\n\nFeature folders keep related code together, so changing a feature touches one place, and they scale better than type folders where a single change ripples across directories. Redux Toolkit's `createSlice` encourages this by colocating reducers and actions.\n\nThe nuance an interviewer probes: the official Redux style guide now favors feature-based organization over type-based, precisely because colocation reduces the cross-directory churn that type folders cause as an app grows. Citing the old `actions/reducers` layout as best practice signals dated knowledge.",
  "interviewLine": "I organize Redux by feature, a slice folder holding its reducer, actions, and selectors together, which the official style guide now favors over type-based `actions/reducers` folders because colocation reduces cross-directory churn as the app grows.",
  "misconception": "Defaulting to type-based `actions/reducers/` folders, when the modern Redux style guide favors feature-based slices that colocate related code.",
  "hints": [
    "Ask whether related feature code lives together or split across type folders.",
    "Which layout does changing one feature touch the fewest places in?",
    "What does Redux Toolkit's `createSlice` encourage?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://redux.js.org/style-guide/",
  "example": {
    "caption": "Notice createSlice colocates the reducer and generated actions in one feature file.",
    "language": "typescript",
    "code": "// features/todos/todosSlice.ts\nimport { createSlice } from \"@reduxjs/toolkit\";\n\nconst todosSlice = createSlice({\n  name: \"todos\",\n  initialState: [] as Todo[],\n  reducers: {\n    added: (state, action) => { state.push(action.payload); },\n  },\n});\nexport const { added } = todosSlice.actions;"
  }
},
{
  "id": "react-how-to-use-polymer-in-react",
  "title": "How to use Polymer in React?",
  "prompt": "How to use Polymer in React?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<link rel=\"import\" href=\"../../bower_components/polymer/polymer.html\" />;\n   Polymer({\n     is: 'calender-element',\n     ready: function () {\n       this.textContent = 'I am a calender';\n     },\n   });\n\n<link rel=\"import\" href=\"./src/polymer-components/calender-element.html\" />\n\nimport React from 'react';\n\n   class MyComponent extends React.Component {\n     render() {\n       return <calender-element />;\n     }\n   }\n\n   export default MyComponent;",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "React completely crashes whenever any custom element appears anywhere in the tree.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but React renders custom elements fine; it treats a hyphenated tag as a host element."
    },
    {
      "id": "B",
      "text": "Polymer custom elements can only run when executed inside a Web Worker thread.",
      "isCorrect": false,
      "explanation": "Tempting as a constraint, but custom elements run on the main thread in the DOM, not in a worker."
    },
    {
      "id": "C",
      "text": "Polymer elements must first be converted into PHP scripts before React can render them.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but Polymer elements are Web Components; no PHP conversion is involved."
    },
    {
      "id": "D",
      "text": "Import the custom element's script and render its custom HTML tag in JSX, passing primitive attributes.",
      "isCorrect": true,
      "explanation": "Correct. React renders the registered custom tag like a host element, forwarding primitive attributes."
    }
  ],
  "correctAnswer": "D",
  "explanation": "Polymer elements are Web Components, custom elements registered with the browser, so you use them in React by importing their definition script and rendering the custom tag in JSX: `<calendar-element />`. React renders the tag, and the browser's custom-element machinery takes over.\n\nThis works for primitive attributes (strings, numbers) that map cleanly to HTML attributes. React treats a hyphenated lowercase tag as a host element, so it passes attributes through to the real DOM node.\n\nThe nuance an interviewer probes: the historical friction is that React (before 19) set JavaScript properties as attributes and did not add listeners for custom DOM events, so passing objects or wiring custom events to a Web Component needed a ref and imperative code. React 19 improved custom-element support by setting properties and handling custom events more directly, closing much of that gap.",
  "interviewLine": "I use a Polymer element by importing its definition and rendering the custom tag in JSX with primitive attributes; for object props or custom events I historically used a ref imperatively, which React 19 improved by handling properties and custom events directly.",
  "misconception": "Expecting React to seamlessly pass objects and custom events to a Web Component, when historically that needed a ref and imperative wiring (eased in React 19).",
  "hints": [
    "Ask what kind of thing a Polymer element is in the browser.",
    "How does React treat a hyphenated lowercase tag in JSX?",
    "What was historically awkward about passing objects or custom events to it?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the custom tag renders like a host element; a ref handles anything beyond primitive attributes.",
    "language": "tsx",
    "code": "import \"./calendar-element.js\"; // registers <calendar-element>\n\nfunction Scheduler() {\n  return <calendar-element locale=\"en\" />;\n}"
  }
},
{
  "id": "react-give-an-example-of-styled-components",
  "title": "Give an example of Styled Components?",
  "prompt": "Give an example of Styled Components?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import React from 'react';\nimport styled from 'styled-components';\n\n// Create a <Title> component that renders an <h1> which is centered, red and sized at 1.5em\nconst Title = styled.h1`\n  font-size: 1.5em;\n  text-align: center;\n  color: palevioletred;\n`;\n\n// Create a <Wrapper> component that renders a <section> with some padding and a papayawhip background\nconst Wrapper = styled.section`\n  padding: 4em;\n  background: papayawhip;\n`;\n\n<Wrapper>\n  <Title>{'Lets start first styled component!'}</Title>\n</Wrapper>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "`const Title = styled.h1`font-size: 1.5em; color: palevioletred;`;` rendered as `<Title>Hello</Title>`.",
      "isCorrect": true,
      "explanation": "Correct. A tagged template defines a styled component that you render like any other, with scoped CSS injected."
    },
    {
      "id": "B",
      "text": "`const Title = new CPlusPlusComponent();` instantiated at render time.",
      "isCorrect": false,
      "explanation": "Tempting as a construction-sounding option, but styled-components uses tagged templates in JavaScript, not C++ classes."
    },
    {
      "id": "C",
      "text": "`const Title = document.getElementById('title');` referenced inside the render method.",
      "isCorrect": false,
      "explanation": "Tempting as DOM access, but styled-components creates a component from CSS, not a reference to an existing node."
    },
    {
      "id": "D",
      "text": "`const Title = '<h1 style=\"font-size: 1.5em\">Hello</h1>';` rendered through `eval()`.",
      "isCorrect": false,
      "explanation": "Tempting as a string approach, but styled-components returns a component, not an HTML string run through `eval`."
    }
  ],
  "correctAnswer": "A",
  "explanation": "styled-components is a CSS-in-JS library. You create a styled React component with a tagged template literal: `const Title = styled.h1\\`font-size: 1.5em; color: palevioletred;\\``. `Title` is a real component you render as `<Title>Hello</Title>`, and the library injects the generated, uniquely-scoped CSS into the document.\n\nThe appeal is colocation and dynamic styling: styles live next to the component, scoping is automatic (no class-name collisions), and you can interpolate props into the CSS (`color: ${p => p.active ? 'red' : 'gray'}`).\n\nThe nuance an interviewer probes: it is a runtime library, the styles are generated as the component renders, which has a cost compared to zero-runtime approaches like CSS Modules or compile-time CSS-in-JS. The tagged-template syntax is real CSS, not a JavaScript object, unlike the inline `style` prop.",
  "interviewLine": "styled-components uses a tagged template of real CSS to create a scoped component you render directly, with props interpolated into the styles; it is a runtime library, so I weigh its cost against zero-runtime options like CSS Modules.",
  "misconception": "Thinking styled-components takes a JavaScript style object like the inline `style` prop, when it uses a tagged template of real CSS and generates a scoped component.",
  "hints": [
    "Ask what `styled.h1` returns, a component or a string.",
    "What syntax holds the CSS, a tagged template or a JS object?",
    "When does the styling cost occur, at build time or at render time?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice props flow into the CSS, giving dynamic styling the inline style prop cannot express cleanly.",
    "language": "tsx",
    "code": "import styled from \"styled-components\";\n\nconst Button = styled.button<{ primary?: boolean }>`\n  padding: 8px 16px;\n  background: ${(p) => (p.primary ? \"palevioletred\" : \"white\")};\n`;\n\nfunction Actions() {\n  return <Button primary>Save</Button>;\n}"
  }
},
{
  "id": "react-why-are-inline-ref-callbacks-or-functions-not-recommend",
  "title": "Why are inline ref callbacks or functions not recommended?",
  "prompt": "Why are inline ref callbacks or functions not recommended?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class UserForm extends Component {\n  handleSubmit = () => {\n    console.log('Input Value is: ', this.input.value);\n  };\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <input type=\"text\" ref={(input) => (this.input = input)} /> // Access DOM input in handle\n        submit\n        <button type=\"submit\">Submit</button>\n      </form>\n    );\n  }\n}\n\nclass UserForm extends Component {\n  handleSubmit = () => {\n    console.log('Input Value is: ', this.input.value);\n  };\n\n  setSearchInput = (input) => {\n    this.input = input;\n  };\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <input type=\"text\" ref={this.setSearchInput} /> // Access DOM input in handle submit\n        <button type=\"submit\">Submit</button>\n      </form>\n    );\n  }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because inline ref callbacks delete the DOM node from the browser document on each render.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic effect, but the node is not deleted; the callback is just detached and reattached each render."
    },
    {
      "id": "B",
      "text": "Because inline arrow functions are illegal under the ECMAScript language specification.",
      "isCorrect": false,
      "explanation": "Tempting as a syntax claim, but inline functions are valid JavaScript; the issue is a new identity each render."
    },
    {
      "id": "C",
      "text": "An inline ref callback is a new function each render, so React calls it twice per update: `null` to detach, then the node.",
      "isCorrect": true,
      "explanation": "Correct. The changing identity forces React to detach and reattach, invoking the callback twice on updates."
    },
    {
      "id": "D",
      "text": "Because inline callbacks cause the computer to run out of disk storage space over time.",
      "isCorrect": false,
      "explanation": "Tempting as a resource distractor, but the behavior is extra callback invocations, not disk exhaustion."
    }
  ],
  "correctAnswer": "C",
  "explanation": "An inline ref callback like `ref={el => this.input = el}` creates a brand-new function on every render. Because the ref callback identity changed, React detaches the old one, calling it with `null`, then attaches the new one with the DOM node, on every update. So the callback runs twice per update instead of only when the node actually mounts or unmounts.\n\nUsually this double-invocation is harmless, but if the callback does meaningful work (logging, setup, measurement) it fires more often than intended. The fix is to pass a stable function reference, a bound method or a `useCallback`-memoized callback, so React only calls it on real attach/detach.\n\nThe nuance an interviewer probes: this is about reference stability, not correctness, the ref still works. With the `useRef` object form (`ref={inputRef}`) the issue disappears entirely, which is why the object ref is preferred over callback refs unless you specifically need the attach/detach hook.",
  "interviewLine": "An inline ref callback is a fresh function each render, so React detaches it with `null` then reattaches with the node on every update; I pass a stable function or use the `useRef` object form, which avoids the double call entirely.",
  "misconception": "Thinking an inline ref callback is called only on mount, when its new identity each render makes React detach and reattach, calling it twice per update.",
  "hints": [
    "Ask what changes about the callback's identity between renders.",
    "What does React do when the ref callback it holds is a different function?",
    "Which ref form sidesteps the problem completely?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useRef",
  "example": {
    "caption": "Notice the useRef object form attaches once, avoiding the detach-reattach of an inline callback.",
    "language": "tsx",
    "code": "function UserForm() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  const onSubmit = () => console.log(inputRef.current?.value);\n  return (\n    <form onSubmit={onSubmit}>\n      <input ref={inputRef} /> {/* stable, not an inline callback */}\n    </form>\n  );\n}"
  }
},
{
  "id": "react-what-is-render-hijacking-in-react",
  "title": "What is render hijacking in react?",
  "prompt": "What is render hijacking in react?",
  "level": "junior",
  "type": "output",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "An advanced HOC pattern (often via Inheritance Inversion) where a wrapper component intercepts, modifies, or conditionally alters the rendered output tree of another component.",
      "isCorrect": true,
      "explanation": "Correct. The HOC stands between the component and its output, reading or modifying the element tree it produces."
    },
    {
      "id": "B",
      "text": "A cybersecurity attack where hackers steal the website's CSS.",
      "isCorrect": false,
      "explanation": "Tempting because \"hijacking\" sounds malicious, but render hijacking is a React composition pattern, not an attack."
    },
    {
      "id": "C",
      "text": "A browser bug that prevents pages from rendering.",
      "isCorrect": false,
      "explanation": "Tempting if \"hijacking\" implies breakage, but it is a deliberate HOC technique, not a browser defect."
    },
    {
      "id": "D",
      "text": "A method for compiling React into WebAssembly binaries.",
      "isCorrect": false,
      "explanation": "Tempting as a build-sounding option, but render hijacking manipulates rendered output, not compilation."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Render hijacking is an advanced higher-order-component technique where a wrapper intercepts and alters what the wrapped component renders. The classic mechanism is Inheritance Inversion: the HOC returns a class that extends the wrapped component, so it can call `super.render()` and then read, modify, filter, or conditionally replace the resulting element tree before returning it.\n\nBecause the HOC has access to the rendered output, it can inject props into children, wrap the tree, or short-circuit rendering (showing a loader while data loads). It \"hijacks\" the render in the sense of standing between the component and its output.\n\nThe nuance an interviewer probes: Inheritance Inversion is powerful but fragile, it depends on the wrapped component's internal structure and breaks encapsulation, so it is rarely the right tool. Composition, hooks, and render props achieve most of the same goals more safely, which is why render hijacking is more of a conceptual pattern than everyday practice.",
  "interviewLine": "Render hijacking is an HOC technique, usually Inheritance Inversion, where the wrapper extends the component and alters the tree from `super.render()`; it is powerful but fragile, so I prefer composition and hooks for the same goals.",
  "misconception": "Reading \"hijacking\" as an attack, when it is an advanced HOC pattern that intercepts and modifies a component's rendered output.",
  "hints": [
    "Ask what the wrapper gains access to by extending the wrapped component.",
    "What can it then do to the rendered element tree?",
    "Why is this fragile compared with composition or hooks?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the HOC reads super.render() output and can conditionally replace it, the essence of render hijacking.",
    "language": "tsx",
    "code": "function withGuard<P>(Wrapped: new (p: P) => React.Component) {\n  return class extends Wrapped {\n    render() {\n      if ((this.props as { ready?: boolean }).ready === false) return <p>Loading…</p>;\n      return super.render();\n    }\n  };\n}"
  }
},
{
  "id": "react-what-are-hoc-factory-implementations",
  "title": "What are HOC factory implementations?",
  "prompt": "What are HOC factory implementations?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "function ppHOC(WrappedComponent) {\n  return class PP extends React.Component {\n    render() {\n      return <WrappedComponent {...this.props} />;\n    }\n  };\n}\n\nfunction iiHOC(WrappedComponent) {\n  return class Enhancer extends WrappedComponent {\n    render() {\n      return super.render();\n    }\n  };\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "The Factory Pattern and Abstract Factory Pattern used for creating HTML button elements.",
      "isCorrect": false,
      "explanation": "Tempting because \"factory\" matches, but these are generic OOP patterns, not the HOC implementation styles."
    },
    {
      "id": "B",
      "text": "Database query factories designed for building and executing SQL database queries.",
      "isCorrect": false,
      "explanation": "Tempting as a factory-flavored distractor, but HOC implementations concern components, not SQL queries."
    },
    {
      "id": "C",
      "text": "Client-side factories paired with server-side Docker container factories for deployment.",
      "isCorrect": false,
      "explanation": "Tempting as an infrastructure option, but HOC factory styles are a rendering pattern, unrelated to Docker."
    },
    {
      "id": "D",
      "text": "Props Proxy (the HOC wraps the component and manipulates props) and Inheritance Inversion (the HOC extends it to intercept render/lifecycle).",
      "isCorrect": true,
      "explanation": "Correct. These are the two HOC implementation styles: wrapping from outside versus extending the component."
    }
  ],
  "correctAnswer": "D",
  "explanation": "There are two classic ways to implement a higher-order component. Props Proxy wraps the target: the HOC renders `<WrappedComponent {...props} />` and can add, remove, or transform props and wrap the output. Inheritance Inversion returns a class that extends the wrapped component, so it can call `super.render()` and intercept its lifecycle and rendered tree.\n\nProps Proxy is the common, safe form, it composes from the outside and never depends on the wrapped component's internals. Inheritance Inversion is more powerful (it enables render hijacking) but fragile, since it couples to the subclass's structure.\n\nThe nuance an interviewer probes: both predate hooks, and Props Proxy covers nearly all real needs while Inheritance Inversion is rarely justified. Today a custom hook replaces most HOCs entirely, so recognizing these two shapes matters more for reading older code than for writing new code.",
  "interviewLine": "HOCs come in two shapes: Props Proxy, which wraps the component and manipulates props, and Inheritance Inversion, which extends it to intercept render and lifecycle; Props Proxy covers almost everything, and today I usually reach for a custom hook instead.",
  "misconception": "Confusing HOC factory styles with generic OOP factory patterns, when they are Props Proxy and Inheritance Inversion for wrapping components.",
  "hints": [
    "Ask whether the HOC wraps the component from outside or extends it.",
    "Which style enables render hijacking, and why is it fragile?",
    "What modern feature now replaces most HOCs?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the Props Proxy style composes from outside, adding a prop without touching the wrapped component's internals.",
    "language": "tsx",
    "code": "function withUser<P>(Wrapped: React.ComponentType<P & { user: User }>) {\n  return function WithUser(props: P) {\n    const user = useCurrentUser();\n    return <Wrapped {...props} user={user} />;\n  };\n}"
  }
},
{
  "id": "react-how-do-you-render-array-strings-and-numbers-in-react-16",
  "title": "How do you render Array, Strings and Numbers in React 16 Version?",
  "prompt": "How do you render Array, Strings and Numbers in React 16 Version?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "const ReactJSDevs = () => {\n  return [<li key=\"1\">John</li>, <li key=\"2\">Jackie</li>, <li key=\"3\">Jordan</li>];\n};\n\nconst JSDevs = () => {\n  return (\n    <ul>\n      <li>Brad</li>\n      <li>Brodge</li>\n      <ReactJSDevs />\n      <li>Brandon</li>\n    </ul>\n  );\n};\n\nrender() {\nreturn 'Welcome to ReactJS questions';\n}\n// Number\nrender() {\nreturn 2018;\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Arrays can only be rendered by React if they contain exactly one single item.",
      "isCorrect": false,
      "explanation": "Tempting as a constraint, but React renders arrays of any length; each element just needs a `key`."
    },
    {
      "id": "B",
      "text": "Components can return arrays of elements, plain strings, or numbers directly from render without a wrapper `<div>`.",
      "isCorrect": true,
      "explanation": "Correct. React 16 allows array, string, and number returns, rendering text values as text nodes."
    },
    {
      "id": "C",
      "text": "Strings and numbers must be converted into Base64 image data before React can render them.",
      "isCorrect": false,
      "explanation": "Tempting as a transformation claim, but React renders strings and numbers directly as text nodes."
    },
    {
      "id": "D",
      "text": "Render methods are only permitted to return HTML `<canvas>` elements and nothing else.",
      "isCorrect": false,
      "explanation": "Tempting as an oddly specific rule, but render can return elements, arrays, strings, numbers, booleans, or null."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Since React 16 a component can return more than a single element wrapped in a parent. It may return an array of elements (each needing a `key`), a plain string, or a number, directly from render, with no enclosing `<div>`. React renders strings and numbers as text nodes.\n\nThis removed a long-standing papercut: before 16 you had to wrap siblings in a wrapper element, which Fragments and bare-array returns made unnecessary. The example shows a component returning an array of `<li>` and others returning a string or a number.\n\nThe nuance an interviewer probes: when returning an array of elements you still need `key` on each item, just as in a mapped list, because they are siblings React must reconcile by identity. Returning a string or number is fine, but a boolean or `null` renders nothing.",
  "interviewLine": "I note that since React 16 a component can return an array of elements, a string, or a number straight from render with no wrapper; I still give arrays a `key` per item since they are siblings React reconciles by identity.",
  "misconception": "Thinking a component must return a single wrapped element, when React 16+ allows arrays, strings, and numbers directly (arrays still need keys).",
  "hints": [
    "Ask what React 16 relaxed about a component's return value.",
    "When you return an array of elements, what does each still need?",
    "How are a returned string or number rendered?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the component returns a bare array of elements, each with a key, and no wrapping div.",
    "language": "tsx",
    "code": "function Names() {\n  return [\n    <li key=\"1\">John</li>,\n    <li key=\"2\">Jackie</li>,\n    <li key=\"3\">Jordan</li>,\n  ];\n}"
  }
},
{
  "id": "react-in-which-scenarios-error-boundaries-do-not-catch-errors",
  "title": "In which scenarios error boundaries do not catch errors?",
  "prompt": "In which scenarios error boundaries do not catch errors?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Event handlers, asynchronous callbacks (`setTimeout`, promises), SSR, and errors thrown inside the boundary itself.",
      "isCorrect": true,
      "explanation": "Correct. These run outside the subtree's render, so the boundary never sees them."
    },
    {
      "id": "B",
      "text": "Inside a descendant component's `render()` method during the render phase.",
      "isCorrect": false,
      "explanation": "Tempting as a guess, but render-phase errors are exactly what boundaries do catch, not a gap."
    },
    {
      "id": "C",
      "text": "Nowhere; error boundaries catch 100% of all errors across the entire operating system.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but boundaries are scoped to subtree rendering and miss handler, async, and SSR errors."
    },
    {
      "id": "D",
      "text": "Inside a child component's lifecycle methods like `componentDidMount`.",
      "isCorrect": false,
      "explanation": "Tempting as a guess, but lifecycle-method errors in descendants are caught by boundaries, not excluded."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Error boundaries catch errors thrown during rendering, in lifecycle methods, and in the constructors of their descendants. They do not catch errors in four cases: event handlers, asynchronous code (`setTimeout`, promises, `fetch` callbacks), server-side rendering, and errors thrown inside the boundary component itself.\n\nThe reason is scope: a boundary wraps the render of its subtree, so it only sees errors that happen as part of rendering that subtree. An `onClick` runs outside render; an async callback runs after render finished; SSR has a different error model; and a boundary cannot catch its own throw.\n\nThe nuance an interviewer probes: for the uncovered cases you use ordinary `try`/`catch` and local error state. Expecting a boundary to be a global catch-all is the classic mistake, these four gaps are exactly where candidates assume coverage they do not have.",
  "interviewLine": "Error boundaries miss event handlers, async callbacks, SSR, and their own errors, because those run outside the subtree's render; for those I use `try`/`catch` and local error state instead.",
  "misconception": "Treating an error boundary as a global catch-all, when it only catches render, lifecycle, and constructor errors in its subtree.",
  "hints": [
    "Ask what phase a boundary actually wraps.",
    "Does an `onClick` or an awaited promise run during that phase?",
    "What do you use for the errors a boundary cannot catch?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice the async error escapes the boundary, so try/catch inside the handler is required.",
    "language": "tsx",
    "code": "function Save({ save }: { save: () => Promise<void> }) {\n  async function onClick() {\n    try {\n      await save(); // a boundary would not catch this rejection\n    } catch (e) {\n      reportError(e);\n    }\n  }\n  return <button onClick={onClick}>Save</button>;\n}"
  }
},
{
  "id": "react-why-do-not-you-need-error-boundaries-for-event-handlers",
  "title": "Why do not you need error boundaries for event handlers?",
  "prompt": "Why do not you need error boundaries for event handlers?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { error: null };\n  }\n\n  handleClick = () => {\n    try {\n      // Do something that could throw\n    } catch (error) {\n      this.setState({ error });\n    }\n  };\n\n  render() {\n    if (this.state.error) {\n      return <h1>Caught an error.</h1>;\n    }\n    return <div onClick={this.handleClick}>Click Me</div>;\n  }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because event handlers do not run during render, so their errors cannot corrupt the UI; use `try/catch` instead.",
      "isCorrect": true,
      "explanation": "Correct. Handlers fire after render, so the element tree is not at risk, and ordinary `try`/`catch` suffices."
    },
    {
      "id": "B",
      "text": "Because event handlers always run compiled to WebAssembly rather than JavaScript.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level claim, but handlers are JavaScript; the real reason is they run outside the render phase."
    },
    {
      "id": "C",
      "text": "Because React automatically detects and fixes all bugs inside event handlers for you.",
      "isCorrect": false,
      "explanation": "Tempting as a magic claim, but React fixes nothing; you catch handler errors yourself with `try`/`catch`."
    },
    {
      "id": "D",
      "text": "Because event handlers are mathematically incapable of ever throwing an error.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but handlers can certainly throw; the point is the throw does not corrupt rendering."
    }
  ],
  "correctAnswer": "A",
  "explanation": "Error boundaries exist to keep a thrown error from leaving the UI in a corrupted state mid-render. Event handlers do not run during the render phase, they fire in response to user interaction after rendering is done, so an error in a handler cannot corrupt the element tree React is building.\n\nBecause the rendered UI is not at risk, you handle handler errors the ordinary JavaScript way: wrap the risky code in `try`/`catch` and, if you want to show an error, set local state. The example catches in `handleClick` and renders a fallback from state.\n\nThe nuance an interviewer probes: this is the complement of why boundaries catch render errors, it is about when the code runs. Reaching for a boundary around an event handler reflects not understanding that boundaries are render-phase tools; `try`/`catch` is both sufficient and the only thing that works there.",
  "interviewLine": "Event handlers run after render, not during it, so an error there cannot corrupt the element tree; that is outside an error boundary's scope, so I handle it with `try`/`catch` and local error state.",
  "misconception": "Wanting a boundary around event handlers, when handlers run outside render so their errors can't corrupt the UI and `try`/`catch` is the right tool.",
  "hints": [
    "Ask when an event handler runs relative to the render phase.",
    "If the handler throws, is the rendered UI actually at risk?",
    "What ordinary JavaScript construct handles the error instead?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice the handler catches its own error and surfaces it through state, no boundary involved.",
    "language": "tsx",
    "code": "function Buy({ purchase }: { purchase: () => void }) {\n  const [error, setError] = useState<string | null>(null);\n  function onClick() {\n    try {\n      purchase();\n    } catch {\n      setError(\"Purchase failed\");\n    }\n  }\n  return <>{error && <p role=\"alert\">{error}</p>}<button onClick={onClick}>Buy</button></>;\n}"
  }
},
{
  "id": "react-what-is-the-difference-between-try-catch-block-and-erro",
  "title": "What is the difference between try catch block and error boundaries?",
  "prompt": "What is the difference between try catch block and error boundaries?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "try {\n  showButton();\n} catch (error) {\n  // ...\n}\n\n<ErrorBoundary>\n  <MyComponent />\n</ErrorBoundary>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "`try/catch` was removed from the JavaScript language back in the year 2020.",
      "isCorrect": false,
      "explanation": "Tempting as a version-change claim, but `try`/`catch` is core JavaScript and was never removed."
    },
    {
      "id": "B",
      "text": "There is no difference between them; the two are exact synonyms for the same mechanism.",
      "isCorrect": false,
      "explanation": "Tempting if both \"handle errors,\" but they catch disjoint cases: imperative code versus subtree rendering."
    },
    {
      "id": "C",
      "text": "`try/catch` handles imperative code (handlers, async); error boundaries are React components catching errors in the descendant render tree.",
      "isCorrect": true,
      "explanation": "Correct. One catches in your call stack, the other catches render-phase errors in a subtree."
    },
    {
      "id": "D",
      "text": "`try/catch` runs on the server while error boundaries run exclusively on the GPU.",
      "isCorrect": false,
      "explanation": "Tempting as a split, but both run wherever the app runs; the difference is imperative versus render-phase scope."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`try`/`catch` is JavaScript's imperative error handling: it catches errors in the code it wraps, which is right for event handlers, async tasks, and any logic that runs outside rendering. An error boundary is a declarative React component that catches errors thrown during the rendering of its descendant tree and shows a fallback.\n\nThey cover disjoint territory. `try`/`catch` cannot catch an error thrown while React renders a child, that happens inside React's machinery, not your call stack. A boundary cannot catch an error in an `onClick`, because that runs outside render.\n\nThe nuance an interviewer probes: you use both together in a robust app. A boundary around a route for render crashes, and `try`/`catch` inside handlers and effects for imperative failures. Treating one as a substitute for the other leaves a category of errors uncaught.",
  "interviewLine": "`try`/`catch` catches errors in imperative code I run, handlers and async, while an error boundary declaratively catches errors thrown while React renders its subtree; I use both since neither covers the other's cases.",
  "misconception": "Thinking one can replace the other, when `try`/`catch` catches imperative errors and boundaries catch render-phase errors, each blind to the other's domain.",
  "hints": [
    "Ask which errors live in your own call stack and which happen inside React's render.",
    "Can `try`/`catch` catch an error thrown while a child component renders?",
    "Why would a robust app use both rather than one?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice the boundary guards render while try/catch guards the handler; they cover different errors.",
    "language": "tsx",
    "code": "function Screen() {\n  return (\n    <ErrorBoundary fallback={<p>Render failed</p>}>\n      <Widget onAction={() => {\n        try { doRiskyThing(); } catch (e) { report(e); }\n      }} />\n    </ErrorBoundary>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-behavior-of-uncaught-errors-in-react-16",
  "title": "What is the behavior of uncaught errors in react 16?",
  "prompt": "What is the behavior of uncaught errors in react 16?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "React converts the entire page into a downloadable PDF document when an error occurs.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but React unmounts the tree; it generates no PDF."
    },
    {
      "id": "B",
      "text": "React silently ignores the uncaught error and continues running the app without any issue.",
      "isCorrect": false,
      "explanation": "Tempting if you expect resilience, but React 16 does the opposite: it unmounts the tree to avoid a corrupted UI."
    },
    {
      "id": "C",
      "text": "Uncaught render errors unmount the entire component tree to avoid leaving a corrupted or insecure UI.",
      "isCorrect": true,
      "explanation": "Correct. React tears the tree down rather than risk a partially-rendered, broken state."
    },
    {
      "id": "D",
      "text": "React automatically restarts the user's operating system to recover from the error.",
      "isCorrect": false,
      "explanation": "Tempting as a dramatic distractor, but the consequence is an unmounted tree, not an OS restart."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Since React 16, an error thrown during rendering that no error boundary catches unmounts the entire React component tree. React deliberately tears down the whole UI rather than leave a partially-rendered, potentially corrupted or insecure state on screen.\n\nThe reasoning is safety: a half-rendered tree after an error can show stale data, broken interactions, or expose information in a way that is worse than showing nothing. A blank screen is a clearer failure than a subtly broken one.\n\nThe nuance an interviewer probes: this behavior is exactly why error boundaries matter. Without one, any uncaught render error blanks the app; with a boundary, the error is contained to a subtree and a fallback shows instead. The all-or-nothing default is the motivation for placing boundaries around routes and risky widgets.",
  "interviewLine": "Since React 16 an uncaught render error unmounts the entire tree rather than leave a corrupted UI, which is exactly why I wrap routes and risky widgets in error boundaries to contain the failure to a subtree.",
  "misconception": "Assuming React quietly recovers from an uncaught render error, when it unmounts the whole tree, which is why boundaries exist to contain failures.",
  "hints": [
    "Ask what React does to the UI when no boundary catches a render error.",
    "Why prefer a blank screen over a partially rendered one?",
    "How does this default motivate using error boundaries?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the boundary contains the failure so an uncaught error blanks only this subtree, not the whole app.",
    "language": "tsx",
    "code": "function App() {\n  return (\n    <>\n      <Nav />\n      <ErrorBoundary fallback={<p>Something went wrong</p>}>\n        <RiskyDashboard />\n      </ErrorBoundary>\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-required-method-to-be-defined-for-a-class-c",
  "title": "What is the required method to be defined for a class component?",
  "prompt": "What is the required method to be defined for a class component?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`componentDidMount()` is the single required method every class component must implement.",
      "isCorrect": false,
      "explanation": "Tempting because it is common, but `componentDidMount` is optional; only `render` is required."
    },
    {
      "id": "B",
      "text": "`render()` is the only required method; the constructor and all lifecycle methods are optional.",
      "isCorrect": true,
      "explanation": "Correct. A class component needs only `render` to produce its element tree."
    },
    {
      "id": "C",
      "text": "`constructor()` is mandatory and must be defined for every single class component.",
      "isCorrect": false,
      "explanation": "Tempting because many classes have one, but the constructor is optional; you add it only to init state or bind methods."
    },
    {
      "id": "D",
      "text": "Every class component is required to define at least ten distinct methods.",
      "isCorrect": false,
      "explanation": "Tempting as an arbitrary rule, but there is no minimum; a single `render` method is a complete component."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A `React.Component` subclass must define exactly one method: `render()`. It is the only required member, everything else (`constructor`, lifecycle methods like `componentDidMount`, state) is optional and added only when needed.\n\nThe reason is that `render` is what produces the element tree; React has nothing to display without it. A class with just `render` is a perfectly valid component.\n\nThe nuance an interviewer probes: `render` must be pure, no side effects, no state mutation, and return a valid node (element, array, string, number, boolean, or `null`). Thinking the constructor is mandatory is a common misconception; you only write a constructor when you need to initialize state or bind methods, and class-field syntax often removes even that need.",
  "interviewLine": "The only required method in a `React.Component` is `render`, which must be pure and return a valid node; the constructor and lifecycle methods are optional, added only when I need to initialize state or run side effects.",
  "misconception": "Believing the constructor or lifecycle methods are required, when `render` is the only mandatory method of a class component.",
  "hints": [
    "Ask what React needs at minimum to display a class component.",
    "Is the constructor actually required, or only when initializing state?",
    "What constraints apply to the one required method?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Component",
  "example": {
    "caption": "Notice this complete component defines only render, with no constructor or lifecycle methods.",
    "language": "tsx",
    "code": "class Hello extends React.Component<{ name: string }> {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}"
  }
},
{
  "id": "react-what-are-the-possible-return-types-of-render-method",
  "title": "What are the possible return types of render method?",
  "prompt": "What are the possible return types of render method?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "SQL table schema definitions returned from the render method.",
      "isCorrect": false,
      "explanation": "Tempting as a data-flavored distractor, but render returns renderable nodes, not database schemas."
    },
    {
      "id": "B",
      "text": "React elements, arrays and fragments, portals, strings and numbers, booleans, or `null`.",
      "isCorrect": true,
      "explanation": "Correct. These are the valid render return types, with booleans and `null` rendering nothing."
    },
    {
      "id": "C",
      "text": "Only HTML `<div>` elements; returning anything else throws a syntax error.",
      "isCorrect": false,
      "explanation": "Tempting as a strict rule, but render accepts many node types, not just a `<div>`."
    },
    {
      "id": "D",
      "text": "Raw binary machine code along with C++ pointers to memory addresses.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level distractor, but render returns JavaScript renderable values, not machine code."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A render method (or a function component's return) can produce several node types: React elements (JSX), arrays of elements and fragments, portals, strings and numbers (rendered as text nodes), booleans, and `null`. Booleans and `null` render nothing, which is how you conditionally render nothing.\n\nThis breadth means a component need not return a single wrapped element. You can return a fragment to group siblings, a bare array for a list, a portal to render elsewhere, or a string for pure text.\n\nThe nuance an interviewer probes: `undefined` is not a valid return, forgetting an explicit `return` in a block-bodied function yields `undefined` and React errors, whereas `null` is the correct way to render nothing. The distinction between \"renders nothing\" (`null`, `false`) and \"invalid\" (`undefined`) trips people up.",
  "interviewLine": "I list that render can return elements, arrays, fragments, portals, strings, numbers, booleans, or `null`; booleans and `null` render nothing, but I watch for `undefined`, usually a forgotten `return`, which is invalid and errors.",
  "misconception": "Thinking render must return a single element, when it can return arrays, fragments, portals, strings, numbers, booleans, or null, but never undefined.",
  "hints": [
    "List the kinds of values React will accept from render.",
    "Which of them render as nothing on screen?",
    "What happens if a block-bodied function forgets its `return`?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice returning null renders nothing, while a forgotten return would yield invalid undefined.",
    "language": "tsx",
    "code": "function Maybe({ show, text }: { show: boolean; text: string }) {\n  if (!show) return null; // valid: renders nothing\n  return text; // valid: a string renders as a text node\n}"
  }
},
{
  "id": "react-what-is-the-methods-order-when-component-re-rendered",
  "title": "What is the methods order when component re-rendered?",
  "prompt": "What is the methods order when component re-rendered?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`render` -> `componentWillUnmount` -> `getSnapshotBeforeUpdate`.",
      "isCorrect": false,
      "explanation": "Tempting because it lists real methods, but `componentWillUnmount` is unmount-phase and the order is wrong."
    },
    {
      "id": "B",
      "text": "`getSnapshotBeforeUpdate` -> `render` -> `shouldComponentUpdate`.",
      "isCorrect": false,
      "explanation": "Tempting as a near-miss, but `shouldComponentUpdate` runs before `render`, and the snapshot runs after it."
    },
    {
      "id": "C",
      "text": "`getDerivedStateFromProps` -> `shouldComponentUpdate` -> `render` -> `getSnapshotBeforeUpdate` -> `componentDidUpdate`.",
      "isCorrect": true,
      "explanation": "Correct. This is the update order, with the gate before render and commit-phase methods after."
    },
    {
      "id": "D",
      "text": "`componentDidUpdate` -> `render` -> `shouldComponentUpdate` -> `constructor`.",
      "isCorrect": false,
      "explanation": "Tempting as a shuffle of real methods, but the order is reversed and the constructor only runs on mount."
    }
  ],
  "correctAnswer": "C",
  "explanation": "On an update, a class component runs its lifecycle methods in this order: `static getDerivedStateFromProps`, then `shouldComponentUpdate` (which can bail out), then `render`, then `getSnapshotBeforeUpdate` (to capture pre-commit DOM info), and finally `componentDidUpdate` after the DOM is committed.\n\nThe sequence mirrors the render-then-commit model. Everything up to and including `render` is the render phase and must be pure; `getSnapshotBeforeUpdate` and `componentDidUpdate` run around and after commit, where you can read the real DOM or run side effects.\n\nThe nuance an interviewer probes: `shouldComponentUpdate` returning `false` short-circuits the rest, no `render`, no `componentDidUpdate`, which is the optimization `PureComponent` and `React.memo` automate. And `getSnapshotBeforeUpdate` is the rarely-used hook for capturing scroll position or size before React mutates the DOM, feeding its return value to `componentDidUpdate`.",
  "interviewLine": "I recall that on update it goes `getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, then `componentDidUpdate`; the gate before render can skip the rest, which is what `PureComponent` and `memo` automate.",
  "misconception": "Getting the update order wrong, especially placing `shouldComponentUpdate` after `render`, when it runs before and can skip the rest.",
  "hints": [
    "Ask which method can bail out before `render` runs.",
    "Which methods run after the DOM is committed?",
    "What does `getSnapshotBeforeUpdate` capture, and where does its value go?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/memo",
  "example": {
    "caption": "Notice React.memo is the function-component stand-in for the shouldComponentUpdate gate in this sequence.",
    "language": "tsx",
    "code": "const Row = React.memo(function Row({ text }: { text: string }) {\n  // Re-renders only when `text` changes, like shouldComponentUpdate returning false otherwise.\n  return <li>{text}</li>;\n});"
  }
},
{
  "id": "react-what-are-the-methods-invoked-during-error-handling",
  "title": "What are the methods invoked during error handling?",
  "prompt": "What are the methods invoked during error handling?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`onError()` and `onCrash()` are the lifecycle methods React calls on an error.",
      "isCorrect": false,
      "explanation": "Tempting as plausible names, but these do not exist; the real methods are `getDerivedStateFromError` and `componentDidCatch`."
    },
    {
      "id": "B",
      "text": "`componentWillCatch()` and `componentDidThrow()` handle errors in a boundary.",
      "isCorrect": false,
      "explanation": "Tempting because they sound right, but neither exists; the correct pair is `getDerivedStateFromError` and `componentDidCatch`."
    },
    {
      "id": "C",
      "text": "`getDerivedStateFromError(error)` (set fallback state) and `componentDidCatch(error, info)` (log the error).",
      "isCorrect": true,
      "explanation": "Correct. The static method computes fallback state in render; `componentDidCatch` logs during commit."
    },
    {
      "id": "D",
      "text": "`tryRender()` and `catchRender()` wrap the component's rendering.",
      "isCorrect": false,
      "explanation": "Tempting as intuitive names, but these are invented; React uses `getDerivedStateFromError` and `componentDidCatch`."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Two lifecycle methods handle errors in a boundary: `static getDerivedStateFromError(error)` and `componentDidCatch(error, info)`. The static one runs during the render phase to compute fallback state (so it must be pure); `componentDidCatch` runs during commit and is where you log the error and its component stack to a service.\n\nTogether they let a boundary catch a thrown error from its subtree, switch to a fallback UI via state, and report the failure. Implementing both gives you fallback rendering plus telemetry.\n\nThe nuance an interviewer probes: the names are specific, not `componentWillCatch`, `onError`, or `tryRender`, and the split matters. `getDerivedStateFromError` cannot log (it is pure and render-phase); `componentDidCatch` can, because it runs in commit. Mixing their responsibilities, logging in the static method, is a common mistake.",
  "interviewLine": "I use a boundary's `static getDerivedStateFromError` to set fallback state during render and `componentDidCatch` to log the error and component stack during commit; I keep logging in the latter because the static method must stay pure.",
  "misconception": "Guessing invented method names or logging in the static method, when the pair is `getDerivedStateFromError` (pure, fallback state) and `componentDidCatch` (commit, logging).",
  "hints": [
    "Name the two methods and which phase each runs in.",
    "Which one is allowed to perform logging, and why?",
    "What goes wrong if you try to log inside the static method?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice fallback state is set in the pure static method while logging happens in componentDidCatch.",
    "language": "tsx",
    "code": "class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {\n  state = { failed: false };\n  static getDerivedStateFromError() {\n    return { failed: true };\n  }\n  componentDidCatch(error: Error, info: React.ErrorInfo) {\n    logError(error, info.componentStack);\n  }\n  render() {\n    return this.state.failed ? <p>Error</p> : this.props.children;\n  }\n}"
  }
},
{
  "id": "react-what-are-keyed-fragments",
  "title": "What are Keyed Fragments?",
  "prompt": "What are Keyed Fragments?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "function Glossary(props) {\n  return (\n    <dl>\n      {props.items.map((item) => (\n        // Without the `key`, React will fire a key warning\n        <React.Fragment key={item.id}>\n          <dt>{item.term}</dt>\n          <dd>{item.description}</dd>\n        </React.Fragment>\n      ))}\n    </dl>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Fragments that automatically encrypt their child DOM elements before rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but a keyed fragment just groups siblings with an identity; it encrypts nothing."
    },
    {
      "id": "B",
      "text": "Fragments that can only be rendered inside SVG `<path>` elements.",
      "isCorrect": false,
      "explanation": "Tempting as an oddly specific rule, but keyed fragments work anywhere; they are about keyed grouping, not SVG."
    },
    {
      "id": "C",
      "text": "Explicit `<React.Fragment key={id}>` elements used when mapping collections, since the `<>...</>` shorthand takes no `key`.",
      "isCorrect": true,
      "explanation": "Correct. The longhand is required precisely because the shorthand cannot carry a `key`."
    },
    {
      "id": "D",
      "text": "A legacy syntax for fragments that was deprecated and removed in React 16.",
      "isCorrect": false,
      "explanation": "Tempting as a version claim, but keyed fragments are current; React 16 introduced fragments, not deprecated them."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A keyed fragment is the explicit `<React.Fragment key={id}>...</React.Fragment>` form used when you map a collection to groups of sibling elements. You need the longhand because the `<>...</>` shorthand accepts no props, and `key` is the one prop a Fragment takes.\n\nThe use case is rendering several elements per item without a wrapper node, a glossary where each item is a `<dt>` plus a `<dd>`. The fragment groups them, and the `key` gives React the per-item identity it needs to reconcile the list, avoiding the missing-key warning.\n\nThe nuance an interviewer probes: the key goes on the `React.Fragment`, not on the inner elements, because the fragment is the item in the mapped array. Trying to add `key` to the `<>` shorthand is the specific thing that forces the longhand here.",
  "interviewLine": "A keyed fragment is `<React.Fragment key={id}>`, used when mapping a collection to grouped siblings; I need the longhand because the `<>` shorthand takes no props, and the key belongs on the fragment since it is the mapped item.",
  "misconception": "Trying to put a `key` on the `<>` shorthand, when only the explicit `<React.Fragment key={...}>` form accepts a key.",
  "hints": [
    "Ask why the `<>` shorthand cannot be used inside this particular map.",
    "Which element in the mapped output carries the `key`?",
    "What is the one prop a Fragment is allowed to accept?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice the key sits on React.Fragment, the item in the map, not on the inner dt or dd.",
    "language": "tsx",
    "code": "function Glossary({ items }: { items: { id: string; term: string; def: string }[] }) {\n  return (\n    <dl>\n      {items.map((item) => (\n        <React.Fragment key={item.id}>\n          <dt>{item.term}</dt>\n          <dd>{item.def}</dd>\n        </React.Fragment>\n      ))}\n    </dl>\n  );\n}"
  }
},
{
  "id": "react-how-jsx-prevents-injection-attacks",
  "title": "How JSX prevents Injection Attacks?",
  "prompt": "How JSX prevents Injection Attacks?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const name = response.potentiallyMaliciousInput;\nconst element = <h1>{name}</h1>;",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "React DOM escapes all strings embedded in JSX before rendering, turning raw HTML into harmless text entities to prevent XSS.",
      "isCorrect": true,
      "explanation": "Correct. Escaped values render as text, so injected markup cannot execute as HTML."
    },
    {
      "id": "B",
      "text": "JSX does not prevent injection attacks and allows raw HTML execution everywhere by default.",
      "isCorrect": false,
      "explanation": "Tempting as a cynical take, but the default is the opposite: JSX escapes embedded strings to block injection."
    },
    {
      "id": "C",
      "text": "By running all of the application's JavaScript on remote isolated blockchain servers.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but the protection is client-side escaping, with no blockchain involved."
    },
    {
      "id": "D",
      "text": "By encrypting all of the JSX source files with military-grade 4096-bit RSA keys.",
      "isCorrect": false,
      "explanation": "Tempting as a security claim, but JSX escaping is about rendering text safely, not encrypting files."
    }
  ],
  "correctAnswer": "A",
  "explanation": "React DOM escapes any string you embed in JSX before inserting it into the DOM. A value like `{name}` is rendered as text, not parsed as HTML, so markup inside it becomes harmless escaped entities (`<script>` shows as literal text). This closes the common XSS vector where user input would otherwise be interpreted as HTML.\n\nThe practical effect is safe-by-default output: untrusted data in `{...}` can never execute as a script tag or inject an element, because React treats it as a text node.\n\nThe nuance an interviewer probes: the escaping protects values in JSX children and attributes, but it is bypassed the moment you use `dangerouslySetInnerHTML`, which inserts raw HTML. That is why that prop requires sanitization, the automatic escaping only covers the normal path, not the deliberate opt-out.",
  "interviewLine": "I rely on React DOM escaping strings embedded in JSX so they render as text, not HTML, which blocks XSS by default; the one exception is `dangerouslySetInnerHTML`, which opts out of that escaping, so I sanitize it.",
  "misconception": "Assuming all JSX is always safe, when the automatic escaping is bypassed by `dangerouslySetInnerHTML`, which still needs sanitization.",
  "hints": [
    "Ask what React does to a string value you put inside `{...}`.",
    "Does injected `<script>` text execute, or render as literal characters?",
    "Which API bypasses this protection, and what must you then do?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the malicious string renders as visible text, not an executed script tag.",
    "language": "tsx",
    "code": "const userInput = \"<img src=x onerror=alert(1)>\";\n// Rendered as text: the markup is escaped, not executed.\nfunction Comment() {\n  return <p>{userInput}</p>;\n}"
  }
},
{
  "id": "react-how-do-you-update-rendered-elements",
  "title": "How do you update rendered elements?",
  "prompt": "How do you update rendered elements?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "function tick() {\n  const element = (\n    <div>\n      <h1>Hello, world!</h1>\n      <h2>It is {new Date().toLocaleTimeString()}.</h2>\n    </div>\n  );\n  ReactDOM.render(element, document.getElementById('root'));\n}\n\nsetInterval(tick, 1000);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "By mutating `document.body.innerHTML` directly with string concatenation on each change.",
      "isCorrect": false,
      "explanation": "Tempting as a direct route, but writing `innerHTML` bypasses reconciliation and desyncs React's virtual tree."
    },
    {
      "id": "B",
      "text": "By triggering state updates or new props, so React diffs the virtual tree and updates only the changed DOM nodes.",
      "isCorrect": true,
      "explanation": "Correct. State or props drive a re-render, and reconciliation patches just the differences."
    },
    {
      "id": "C",
      "text": "Rendered elements can never be updated at all once they have been mounted.",
      "isCorrect": false,
      "explanation": "Tempting if elements seem immutable, but the UI updates via re-renders; the element objects are replaced, not mutated."
    },
    {
      "id": "D",
      "text": "By restarting the Node.js development server on every animation frame.",
      "isCorrect": false,
      "explanation": "Tempting as a brute-force refresh, but restarting the server does not update the UI; state changes do."
    }
  ],
  "correctAnswer": "B",
  "explanation": "You update what is on screen by triggering a state change (the `useState` setter or `setState`) or passing new props, not by touching the DOM. React responds by re-rendering the component, diffing the new virtual tree against the previous one, and mutating only the real DOM nodes that actually changed.\n\nThe declarative model is the point: you describe the UI for the current data and let React compute the minimal DOM update. The old `ReactDOM.render` in a `setInterval` loop (as in the legacy snippet) re-rendered the whole tree each tick, but modern code lets state drive updates through a persistent root.\n\nThe nuance an interviewer probes: direct DOM mutation (`innerHTML`) bypasses React's reconciliation and leaves its virtual tree out of sync, causing bugs on the next render. The right lever is always state or props, which keep React's model and the DOM consistent.",
  "interviewLine": "I update the UI by changing state or passing new props, which triggers a re-render and lets React reconcile and patch only the changed DOM nodes; mutating the DOM directly desyncs React's virtual tree.",
  "misconception": "Reaching for direct DOM mutation to update the UI, when state or props drive re-renders and reconciliation applies the minimal change.",
  "hints": [
    "Ask what lever actually causes React to update the DOM.",
    "What does React do between the new render and the real DOM?",
    "Why is writing `innerHTML` yourself a problem for React?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice state drives the update; React patches only the changed text node, no manual DOM work.",
    "language": "tsx",
    "code": "function Clock() {\n  const [time, setTime] = useState(new Date().toLocaleTimeString());\n  useEffect(() => {\n    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <h2>It is {time}</h2>;\n}"
  }
},
{
  "id": "react-how-to-prevent-component-from-rendering",
  "title": "How to prevent component from rendering?",
  "prompt": "How to prevent component from rendering?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "function Greeting(props) {\n  if (!props.loggedIn) {\n    return null;\n  }\n\n  return <div className=\"greeting\">welcome, {props.name}</div>;\n}\n\nclass User extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {loggedIn: false, name: 'John'};\n  }\n\n  render() {\n  return (\n      <div>\n        //Prevent component render if it is not loggedIn\n        <Greeting loggedIn={this.state.loggedIn} />\n        <UserDetails name={this.state.name}>\n      </div>\n  );\n  }",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Return `null` from the component based on a condition (e.g. `if (!isLoggedIn) return null;`).",
      "isCorrect": true,
      "explanation": "Correct. React renders nothing for a `null` return while still mounting the component."
    },
    {
      "id": "B",
      "text": "Throw an uncaught `TypeError` inside the component body to stop it rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a way to halt, but throwing crashes the subtree (or hits a boundary); returning `null` is the clean way."
    },
    {
      "id": "C",
      "text": "Call `window.close()` inside the component to prevent it from appearing.",
      "isCorrect": false,
      "explanation": "Tempting as a drastic option, but `window.close` tries to close the tab; it does not control rendering."
    },
    {
      "id": "D",
      "text": "Set `style={{ display: 'none' }}` on the element to unmount the component.",
      "isCorrect": false,
      "explanation": "Tempting because it hides the element, but `display: none` keeps the DOM node mounted; it does not unmount anything."
    }
  ],
  "correctAnswer": "A",
  "explanation": "To render nothing, return `null` from the component based on a condition. React treats `null` (and `false`) as \"render nothing,\" so `if (!props.loggedIn) return null;` cleanly omits the component's output while still mounting the component itself.\n\nThis is the idiomatic way to conditionally hide output: the component runs, decides it has nothing to show, and returns `null`. The parent does not need to know; the component owns the decision.\n\nThe nuance an interviewer probes: returning `null` still mounts the component and runs its hooks, so effects and state persist, it suppresses the output, not the component. If you want to actually unmount and reset state, you conditionally render the component in the parent instead. And `display: none` is different again: it keeps the DOM node, just hidden.",
  "interviewLine": "I prevent output by returning `null` from the component on a condition, which renders nothing while still mounting it and running its hooks; to actually unmount and reset state I conditionally render it from the parent instead.",
  "misconception": "Confusing returning `null` with unmounting, when `null` suppresses output but still mounts the component and runs its hooks.",
  "hints": [
    "Ask what React does when a component returns `null`.",
    "Does returning `null` unmount the component or just hide its output?",
    "How is this different from `display: none` on an element?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice returning null renders nothing while the component still mounts and its hooks still run.",
    "language": "tsx",
    "code": "function Greeting({ loggedIn, name }: { loggedIn: boolean; name: string }) {\n  if (!loggedIn) return null; // renders nothing, but still mounts\n  return <div className=\"greeting\">Welcome, {name}</div>;\n}"
  }
},
{
  "id": "react-what-are-the-conditions-to-safely-use-the-index-as-a-ke",
  "title": "What are the conditions to safely use the index as a key?",
  "prompt": "What are the conditions to safely use the index as a key?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "The index is a valid key only when the array holds more than one million items at once.",
      "isCorrect": false,
      "explanation": "Tempting as a specific-sounding rule, but item count is irrelevant; safety depends on the list's identity being stable."
    },
    {
      "id": "B",
      "text": "The index is always completely safe to use as a key for every list in all circumstances.",
      "isCorrect": false,
      "explanation": "Tempting as a simplification, but index keys bleed state the moment a list reorders, inserts, or filters."
    },
    {
      "id": "C",
      "text": "Index keys are permitted only when the application runs in the Internet Explorer browser.",
      "isCorrect": false,
      "explanation": "Tempting as an oddly specific constraint, but browser choice has nothing to do with key safety."
    },
    {
      "id": "D",
      "text": "The list is static (never reordered, filtered, or inserted), items lack unique IDs, and the list is never paginated or sorted.",
      "isCorrect": true,
      "explanation": "Correct. Only when position can never change does an index stay bound to the same item."
    }
  ],
  "correctAnswer": "D",
  "explanation": "The array index is a safe key only when the list is effectively frozen in identity. Three conditions must all hold: the list and its items are static, never reordered, filtered, or inserted into; the items have no stable unique id to use instead; and the list is never paginated or sorted. If any fails, index keys bleed state onto the wrong items.\n\nThe reasoning is that a key must stay bound to the same logical item across renders. An index satisfies that only when position never changes, so the item at index 0 is always the same item.\n\nThe nuance an interviewer probes: these conditions are rarely all true in real apps, so index keys are a last resort, not a default. The moment requirements add sorting, filtering, or inserts, you must switch to a data-derived key, which is why interviewers treat casual index-key use as a red flag.",
  "interviewLine": "An index key is safe only when the list is static, the items have no unique id, and it is never sorted or paginated; because that is rarely all true, I treat index keys as a last resort and prefer a data-derived id.",
  "misconception": "Treating index keys as a reasonable default, when they are safe only for fully static lists and bleed state as soon as order can change.",
  "hints": [
    "Ask what a key must stay bound to across renders.",
    "Which operations on a list break the index-to-item mapping?",
    "Why is \"the items have no unique id\" part of the condition?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice a frozen constant list meets all conditions, so an index key is acceptable here.",
    "language": "tsx",
    "code": "const WEEKDAYS = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"] as const;\n\nfunction Week() {\n  // Static, never reordered, no ids: index key is safe.\n  return <>{WEEKDAYS.map((day, i) => <span key={i}>{day}</span>)}</>;\n}"
  }
},
{
  "id": "react-is-it-keys-should-be-globally-unique",
  "title": "Do keys in React lists need to be globally unique?",
  "prompt": "Do keys in React lists need to be globally unique?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "function Book(props) {\n  const index = (\n    <ul>\n      {props.pages.map((page) => (\n        <li key={page.id}>{page.title}</li>\n      ))}\n    </ul>\n  );\n  const content = props.pages.map((page) => (\n    <div key={page.id}>\n      <h3>{page.title}</h3>\n      <p>{page.content}</p>\n      <p>{page.pageNumber}</p>\n    </div>\n  ));\n  return (\n    <div>\n      {index}\n      <hr />\n      {content}\n    </div>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Keys must be encrypted with a hashing algorithm before being passed to JSX.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but keys are plain reconciliation hints; no encryption is involved."
    },
    {
      "id": "B",
      "text": "Keys must be sequential integers that always start counting from zero.",
      "isCorrect": false,
      "explanation": "Tempting because indices do that, but keys can be any stable unique value among siblings, not a required sequence."
    },
    {
      "id": "C",
      "text": "Yes, every key must be a globally unique UUID across all websites in the entire world.",
      "isCorrect": false,
      "explanation": "Tempting due to the \"unique\" wording, but keys only need sibling uniqueness within one list, never global uniqueness."
    },
    {
      "id": "D",
      "text": "No, keys only need to be unique among immediate siblings; different lists can reuse the same key values.",
      "isCorrect": true,
      "explanation": "Correct. React matches keys per sibling set, so uniqueness is scoped to one array."
    }
  ],
  "correctAnswer": "D",
  "explanation": "No. A key only needs to be unique among its immediate siblings within the same array. Two different lists, or two different `.map()` calls, can reuse the same key values without any conflict, because React matches keys per sibling set during reconciliation, not globally.\n\nThe example renders the same pages twice, once as an index list, once as full content, each using `page.id`, and that is fine: the two arrays are separate sibling sets. React never compares a key in one list against a key in another.\n\nThe nuance an interviewer probes: this is why a database id makes a perfect key even though it is not a global UUID, local sibling uniqueness is all React requires. Over-engineering keys into globally unique strings is unnecessary; under-doing it, duplicate keys within one list, is the real bug, triggering warnings and mismatched reconciliation.",
  "interviewLine": "I keep keys unique only among immediate siblings in one array, so two separate lists can reuse the same values; I use a local database id as the key, no global UUID required.",
  "misconception": "Thinking keys must be globally unique, when uniqueness is required only among siblings, so a local database id is a perfect key.",
  "hints": [
    "Ask what scope React actually checks a key's uniqueness within.",
    "Can two different `.map()` calls use the same id values?",
    "Why does this make a plain database id a sufficient key?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice both lists reuse page.id with no conflict, since they are separate sibling sets.",
    "language": "tsx",
    "code": "function Book({ pages }: { pages: { id: string; title: string }[] }) {\n  return (\n    <>\n      <ul>{pages.map((p) => <li key={p.id}>{p.title}</li>)}</ul>\n      <div>{pages.map((p) => <section key={p.id}>{p.title}</section>)}</div>\n    </>\n  );\n}"
  }
},
{
  "id": "react-what-are-the-advantages-of-formik-over-redux-form-libra",
  "title": "What are the advantages of formik over redux form library?",
  "prompt": "What are the advantages of formik over redux form library?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Formik completely eliminates the need for any user input in a form.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd claim, but Formik manages input; it does not remove the user's need to type."
    },
    {
      "id": "B",
      "text": "Redux Form consistently ran about a hundred times faster than Formik in benchmarks.",
      "isCorrect": false,
      "explanation": "Tempting as a performance claim, but Redux Form's per-keystroke store churn is slower; Formik avoids that overhead."
    },
    {
      "id": "C",
      "text": "Keeps form state local (avoiding Redux store churn per keystroke), smaller bundle, and a simpler API with no store setup.",
      "isCorrect": true,
      "explanation": "Correct. Local transient state and no Redux wiring are Formik's advantages over Redux Form."
    },
    {
      "id": "D",
      "text": "Formik compiles form definitions directly into native C++ binaries for speed.",
      "isCorrect": false,
      "explanation": "Tempting as a low-level distractor, but Formik is JavaScript managing local state; it compiles no binaries."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Formik keeps form state local to the form component, whereas Redux Form stored every field in the global Redux store and dispatched an action on each keystroke. That store churn, actions and reducer runs per character, is wasteful for transient UI state that no other part of the app needs.\n\nFormik's advantages follow from that choice: no Redux setup, a smaller bundle, and a simpler API focused on form concerns (values, validation, touched, submission). Form state lives where it is used and is discarded when the form unmounts.\n\nThe nuance an interviewer probes: this reflects a general principle, transient UI state should be local, not global. Redux Form's design put high-frequency state in a global store, which is exactly the anti-pattern state colocation avoids. Both libraries are now largely superseded by React Hook Form and native form handling, but the reasoning still applies.",
  "interviewLine": "I choose Formik because it keeps transient form state local instead of dispatching to a global Redux store on every keystroke, which means less churn, a smaller bundle, and no store setup, an application of the state-colocation principle.",
  "misconception": "Assuming all form state belongs in a global store, when transient form state should be local, which is Formik's advantage over Redux Form.",
  "hints": [
    "Ask where each library stores the form's per-keystroke state.",
    "Why is dispatching to a global store on every character wasteful?",
    "What general principle about transient state does this illustrate?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
  "example": {
    "caption": "Notice the form state lives in the component and is gone on unmount, no global store involved.",
    "language": "tsx",
    "code": "function ContactForm() {\n  const [values, setValues] = useState({ email: \"\" });\n  // Local, transient state: no Redux action per keystroke.\n  return (\n    <input\n      value={values.email}\n      onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}\n    />\n  );\n}"
  }
},
{
  "id": "react-what-is-suspense-component",
  "title": "What is suspense component?",
  "prompt": "What is suspense component?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "const OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <OtherComponent />\n      </Suspense>\n    </div>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A component that temporarily suspends the user's internet connection to save bandwidth.",
      "isCorrect": false,
      "explanation": "Tempting as a literal reading of \"suspense,\" but it suspends rendering of a subtree, not the network."
    },
    {
      "id": "B",
      "text": "A component (`<Suspense fallback={...}>`) that lets children wait for lazy chunks or async data before rendering, showing a fallback.",
      "isCorrect": true,
      "explanation": "Correct. It renders the fallback until the suspending child's work resolves."
    },
    {
      "id": "C",
      "text": "A security firewall component that blocks suspicious IP addresses from the app.",
      "isCorrect": false,
      "explanation": "Tempting as a security-flavored distractor, but Suspense coordinates loading states, not network security."
    },
    {
      "id": "D",
      "text": "A deprecated API that was removed from React back in version 17.",
      "isCorrect": false,
      "explanation": "Tempting as a version claim, but Suspense is current and increasingly central, not removed."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`<Suspense>` is a built-in component that lets part of the tree wait for something before rendering, showing a `fallback` in the meantime. It catches a suspending child, one created with `React.lazy` for code splitting, or a component reading async data via `use()`, and renders the fallback until that work resolves.\n\nThe benefit is declarative loading UI: you wrap the slow part and specify what to show while it loads, instead of threading loading booleans through props.\n\nThe nuance an interviewer probes: Suspense coordinates with concurrent features and streaming SSR, a boundary can stream in once its content is ready, and nested boundaries let different regions resolve independently. In React 19 the `use()` hook makes Suspense the idiomatic way to render async data, not just lazy components.",
  "interviewLine": "I use `<Suspense>` to render a fallback while a child waits, for a lazy chunk or async data read with `use()`, giving declarative loading UI that also powers streaming SSR and independent nested boundaries.",
  "misconception": "Thinking Suspense is only for `React.lazy`, when it also renders async data via `use()` and coordinates with streaming SSR.",
  "hints": [
    "Ask what Suspense shows while its child is not ready.",
    "What two kinds of waiting can trigger a Suspense boundary?",
    "How do nested boundaries let regions resolve independently?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Suspense",
  "example": {
    "caption": "Notice the fallback shows until the lazily-imported chunk resolves, then the component renders.",
    "language": "tsx",
    "code": "const Chart = React.lazy(() => import(\"./Chart\"));\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<p>Loading chart…</p>}>\n      <Chart />\n    </Suspense>\n  );\n}"
  }
},
{
  "id": "react-what-is-route-based-code-splitting",
  "title": "What is route based code splitting?",
  "prompt": "What is route based code splitting?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\nimport React, { Suspense, lazy } from 'react';\n\nconst Home = lazy(() => import('./routes/Home'));\nconst About = lazy(() => import('./routes/About'));\n\nconst App = () => (\n  <Router>\n    <Suspense fallback={<div>Loading...</div>}>\n      <Switch>\n        <Route exact path=\"/\" component={Home} />\n        <Route path=\"/about\" component={About} />\n      </Switch>\n    </Suspense>\n  </Router>\n);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Splitting the application's JavaScript execution across multiple physical CPU processor cores.",
      "isCorrect": false,
      "explanation": "Tempting because \"splitting\" overlaps, but code splitting is about bundle chunks, not multi-core execution."
    },
    {
      "id": "B",
      "text": "Splitting bundles by route with `lazy(() => import())`, loading each chunk only on navigation, wrapped in `<Suspense>`.",
      "isCorrect": true,
      "explanation": "Correct. Each route becomes a lazily-loaded chunk, fetched on demand with a Suspense fallback."
    },
    {
      "id": "C",
      "text": "Creating a separate domain name for every single HTML button in the app.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but code splitting divides bundles, not domains."
    },
    {
      "id": "D",
      "text": "Route splitting is prohibited in single-page applications and only works on multi-page sites.",
      "isCorrect": false,
      "explanation": "Tempting if you think SPAs load everything, but route splitting is a core SPA optimization, not forbidden."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Route-based code splitting loads each route's JavaScript only when the user navigates to it. You define routes with `React.lazy(() => import('./routes/Home'))` so each becomes its own bundle chunk, and wrap the routes in `<Suspense>` to show a fallback while a chunk downloads.\n\nThe payoff is a smaller initial bundle: the user downloads only the code for the first route, and other routes arrive on demand. This improves initial load time, which matters most on large apps with many pages.\n\nThe nuance an interviewer probes: the split point is the dynamic `import()`, which the bundler turns into a separate chunk; `React.lazy` just makes a component out of that promise, and `Suspense` provides the loading UI. In Next.js App Router, route-level splitting is automatic per route segment, so you rarely wire `lazy` manually.",
  "interviewLine": "I do route-based code splitting with `lazy(() => import())` so each route is its own chunk loaded on navigation, wrapped in `<Suspense>` for the loading UI, which shrinks the initial bundle; Next.js does this per route segment automatically.",
  "misconception": "Confusing code splitting with multi-core execution, when it is about dividing the bundle so each route's chunk loads on demand.",
  "hints": [
    "Ask what the dynamic `import()` does to the bundle.",
    "What provides the loading UI while a route's chunk downloads?",
    "Does a framework like Next.js require you to wire this manually?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/Suspense",
  "example": {
    "caption": "Notice each route is a dynamic import, so its chunk downloads only when navigated to.",
    "language": "tsx",
    "code": "const Home = lazy(() => import(\"./routes/Home\"));\nconst About = lazy(() => import(\"./routes/About\"));\n\n<Suspense fallback={<p>Loading…</p>}>\n  <Routes>\n    <Route path=\"/\" element={<Home />} />\n    <Route path=\"/about\" element={<About />} />\n  </Routes>\n</Suspense>"
  }
},
{
  "id": "react-how-do-you-use-contexttype",
  "title": "How do you use contextType?",
  "prompt": "How do you use contextType?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class MyClass extends React.Component {\n     componentDidMount() {\n       let value = this.context;\n       /* perform a side-effect at mount using the value of MyContext */\n     }\n     componentDidUpdate() {\n       let value = this.context;\n       /* ... */\n     }\n     componentWillUnmount() {\n       let value = this.context;\n       /* ... */\n     }\n     render() {\n       let value = this.context;\n       /* render something based on the value of MyContext */\n     }\n   }\n   MyClass.contextType = MyContext;\n\nclass MyClass extends React.Component {\n     static contextType = MyContext;\n     render() {\n       let value = this.context;\n       /* render something based on the value */\n     }\n   }",
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "`contextType` can only be declared and used inside CSS stylesheet files.",
      "isCorrect": false,
      "explanation": "Tempting as a distractor, but `contextType` is a class component static, unrelated to CSS."
    },
    {
      "id": "B",
      "text": "Assign `static contextType = MyContext` to read the nearest context value via `this.context` in lifecycles and render.",
      "isCorrect": true,
      "explanation": "Correct. It exposes a single context's value as `this.context` throughout the class."
    },
    {
      "id": "C",
      "text": "`contextType` was removed from React back in version 15 and no longer exists.",
      "isCorrect": false,
      "explanation": "Tempting as a version claim, but `contextType` is a valid class API; `useContext` is just the function-component counterpart."
    },
    {
      "id": "D",
      "text": "`contextType` is an HTML attribute you set on an element, like `<div contextType='theme'>`.",
      "isCorrect": false,
      "explanation": "Tempting as a markup option, but it is a static class property, not a DOM attribute."
    }
  ],
  "correctAnswer": "B",
  "explanation": "`contextType` lets a class component consume a single context without a `<Context.Consumer>` wrapper. You set `static contextType = MyContext` (or `MyClass.contextType = MyContext`), and React makes the nearest context value available as `this.context` throughout the component, in lifecycle methods and `render`.\n\nThe benefit over a Consumer is ergonomics: you read `this.context` directly instead of nesting a render-prop. It is the class-component equivalent of the `useContext` hook.\n\nThe nuance an interviewer probes: `contextType` supports exactly one context per class, if a class needs several, you fall back to multiple Consumer wrappers. Function components avoid the whole limitation by calling `useContext` once per context, which is the modern approach; `contextType` mainly appears in class code.",
  "interviewLine": "I use `static contextType = MyContext` to expose a single context's value as `this.context` across a class component's lifecycles and render; it is the class equivalent of `useContext`, limited to one context per class.",
  "misconception": "Thinking `contextType` can consume several contexts, when it supports exactly one per class, unlike multiple `useContext` calls.",
  "hints": [
    "Ask how a class reads a context value without a Consumer wrapper.",
    "How many contexts can `contextType` consume at once?",
    "What is the function-component equivalent, and does it share the limit?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/render-and-commit",
  "example": {
    "caption": "Notice useContext is the function-component equivalent, with no one-context-per-component limit.",
    "language": "tsx",
    "code": "const ThemeContext = React.createContext(\"light\");\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext); // class equivalent: static contextType\n  return <button className={theme}>Click</button>;\n}"
  }
},
{
  "id": "react-what-is-the-purpose-of-forward-ref-in-hocs",
  "title": "What is the purpose of forward ref in HOCs?",
  "prompt": "What is the purpose of forward ref in HOCs?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "```javascript\nfunction logProps(Component) {\n  class LogProps extends React.Component {\n    componentDidUpdate(prevProps) {\n      console.log('old props:', prevProps);\n      console.log('new props:', this.props);\n    }\n\n    render() {\n      const {forwardedRef...rest} = this.props;\n\n      // Assign the custom prop \"forwardedRef\" as a ref\n      return <Component ref={forwardedRef} {...rest} />;\n    }\n  }\n\n  return React.forwardRef((props, ref) => {\n    return <LogProps {...props} forwardedRef={ref} />;\n  });\n}\n```\n\n```javascript\nclass FancyButton extends React.Component {\n  focus() {\n    // ...\n  }\n\n  // ...\n}\nexport default logProps(FancyButton);\n```\n\n```javascript\nimport FancyButton from './FancyButton';\n\nconst ref = React.createRef();\nref.current.focus();\n<FancyButton\n  label=\"Click Me\"\n  handleClick={handleClick}\n  ref={ref}\n/>;\n```",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "To convert the higher-order component into an equivalent Python script during the build step.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but `forwardRef` threads a `ref` through the HOC; it compiles nothing to Python."
    },
    {
      "id": "B",
      "text": "To delete the incoming `ref` from memory as soon as the HOC wrapper component mounts.",
      "isCorrect": false,
      "explanation": "Tempting as a cleanup-sounding claim, but it forwards the ref to the inner component, not deletes it."
    },
    {
      "id": "C",
      "text": "To forward incoming HTTP network packets through the HOC on to a configured proxy server.",
      "isCorrect": false,
      "explanation": "Tempting because \"forward\" suggests networking, but it forwards a React `ref`, not network packets."
    },
    {
      "id": "D",
      "text": "Because `ref` is not a standard prop and attaches to the wrapper by default, `forwardRef` forwards it to the inner wrapped component.",
      "isCorrect": true,
      "explanation": "Correct. It routes the caller's `ref` past the HOC wrapper to the component they actually want to reference."
    }
  ],
  "correctAnswer": "D",
  "explanation": "`ref` is not a normal prop, so when you wrap a component in a HOC, a `ref` the caller passes attaches to the HOC's wrapper instance, not the inner component the caller actually wants to reach. `React.forwardRef` fixes this: the HOC forwards the incoming `ref` through to the wrapped component (often by passing it down as a differently-named prop like `forwardedRef` and attaching it there).\n\nWithout forwarding, calling `ref.current.focus()` on a wrapped `FancyButton` would hit the wrapper, which has no `focus` method, instead of the real button.\n\nThe nuance an interviewer probes: this is the HOC-specific case of ref forwarding, and it is exactly the kind of boilerplate that made HOCs awkward. In React 19, `ref` is a regular prop, so a function-component HOC can thread it without `forwardRef`, and custom hooks sidestep the problem entirely by not adding a wrapper component.",
  "interviewLine": "I know a `ref` passed to a HOC-wrapped component hits the wrapper, not the inner component, so I use `forwardRef` to thread it through; in React 19 `ref` is a plain prop, so this boilerplate mostly disappears.",
  "misconception": "Expecting a `ref` on a HOC-wrapped component to reach the inner component automatically, when it attaches to the wrapper unless the HOC forwards it.",
  "hints": [
    "Ask where a `ref` lands when the component is wrapped by a HOC.",
    "What would `ref.current.focus()` hit without forwarding?",
    "How does React 19 change the need for this in a HOC?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useRef",
  "example": {
    "caption": "Notice the HOC forwards the ref through a renamed prop so it reaches the inner component, not the wrapper.",
    "language": "tsx",
    "code": "function logProps<P>(Inner: React.ComponentType<P>) {\n  const Wrapper = ({ forwardedRef, ...rest }: P & { forwardedRef: React.Ref<unknown> }) => (\n    <Inner ref={forwardedRef} {...(rest as P)} />\n  );\n  return React.forwardRef<unknown, P>((props, ref) => <Wrapper {...props} forwardedRef={ref} />);\n}"
  }
},
{
  "id": "react-is-it-possible-to-use-react-without-jsx",
  "title": "Is it possible to use react without JSX?",
  "prompt": "Is it possible to use react without JSX?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "class Greeting extends React.Component {\n  render() {\n    return <div>Hello {this.props.message}</div>;\n  }\n}\n\nReactDOM.render(<Greeting message=\"World\" />, document.getElementById('root'));\n\nclass Greeting extends React.Component {\n  render() {\n    return React.createElement('div', null, `Hello ${this.props.message}`);\n  }\n}\n\nReactDOM.render(\n  React.createElement(Greeting, { message: 'World' }, null),\n  document.getElementById('root'),\n);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "React works without JSX only if the website is hosted on a local intranet.",
      "isCorrect": false,
      "explanation": "Tempting as a condition, but hosting is irrelevant; `React.createElement` works anywhere JavaScript runs."
    },
    {
      "id": "B",
      "text": "Using React without JSX causes an immediate fatal syntax error at startup.",
      "isCorrect": false,
      "explanation": "Tempting if you assume JSX is required, but plain `createElement` calls are valid JavaScript that run fine."
    },
    {
      "id": "C",
      "text": "Yes, JSX is syntactic sugar; you can write `React.createElement(type, props, ...children)` with no build step.",
      "isCorrect": true,
      "explanation": "Correct. JSX compiles to `createElement`, so writing those calls directly needs no transpilation."
    },
    {
      "id": "D",
      "text": "No, browsers natively compile JSX and require JSX syntax to load React at all.",
      "isCorrect": false,
      "explanation": "Tempting as a reversal, but browsers do not understand JSX; React itself needs no JSX, only `createElement`."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Yes. JSX is syntactic sugar over `React.createElement`, so you can write React entirely in plain JavaScript by calling `React.createElement(type, props, ...children)` directly. No JSX means no transpilation step is needed, because the code is already valid JavaScript.\n\nThe example shows the two forms side by side: `<Greeting message=\"World\" />` and `React.createElement(Greeting, { message: 'World' }, null)` produce the same element. JSX just makes the nested-element structure far more readable.\n\nThe nuance an interviewer probes: understanding this clarifies what JSX is, a compile-time convenience, not a runtime requirement. It also explains the automatic JSX runtime: newer transforms emit `_jsx` calls and auto-import them, which is why modern JSX files no longer need `React` in scope even though a call is still generated.",
  "interviewLine": "JSX is just sugar for `React.createElement`, so I can write React in plain JavaScript with no transpilation; knowing this clarifies that JSX is a compile-time convenience, not a runtime requirement.",
  "misconception": "Believing JSX is required to use React, when it is sugar over `React.createElement`, which you can call directly with no build step.",
  "hints": [
    "Ask what JSX compiles into under the hood.",
    "If you write those calls yourself, do you still need a build step?",
    "How does this explain the automatic JSX runtime import?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the createElement form is plain JavaScript, equivalent to the JSX and needing no transpilation.",
    "language": "tsx",
    "code": "function Greeting({ message }: { message: string }) {\n  // Equivalent to: <div>Hello {message}</div>\n  return React.createElement(\"div\", null, `Hello ${message}`);\n}"
  }
},
{
  "id": "react-is-it-prop-must-be-named-as-render-for-render-props",
  "title": "Does the prop name have to be 'render' in the Render Props pattern?",
  "prompt": "Does the prop name have to be 'render' in the Render Props pattern?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "<Mouse\n  children={(mouse) => (\n    <p>\n      The mouse position is {mouse.x}, {mouse.y}\n    </p>\n  )}\n/>\n\n<Mouse>\n  {(mouse) => (\n    <p>\n      The mouse position is {mouse.x}, {mouse.y}\n    </p>\n  )}\n</Mouse>\n\nMouse.propTypes = {\n  children: PropTypes.func.isRequired,\n};",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Yes, naming the prop anything other than `render` throws a React fatal error at runtime.",
      "isCorrect": false,
      "explanation": "Tempting as a strict rule, but the name is a convention; any function prop used to render qualifies."
    },
    {
      "id": "B",
      "text": "Render props must always be named `callback` rather than `render`.",
      "isCorrect": false,
      "explanation": "Tempting as a specific rule, but there is no required name; `render`, `children`, or custom names all work."
    },
    {
      "id": "C",
      "text": "Render props can only be used on class components, never on function components.",
      "isCorrect": false,
      "explanation": "Tempting as a constraint, but render props work on both; the pattern is about passing a function, not the component type."
    },
    {
      "id": "D",
      "text": "No, any prop whose value is a function the component uses to decide what to render is a render prop (often `render` or `children`).",
      "isCorrect": true,
      "explanation": "Correct. The pattern is defined by behavior, so the prop name, including `children`, is free."
    }
  ],
  "correctAnswer": "D",
  "explanation": "No. The render prop pattern is defined by behavior, not a name: any prop whose value is a function the component calls to decide what to render is a render prop. It is commonly named `render`, but `children` as a function is just as valid, and so are domain names like `renderHeader`.\n\nThe example shows both `children={fn}` and the `children` passed between tags; both are render props. What matters is that the component invokes the function with its data and renders the result.\n\nThe nuance an interviewer probes: using `children` as a function is often the cleanest form because it reads naturally in JSX (`<Mouse>{m => ...}</Mouse>`). The name is a convention, not a requirement, which is why the misconception that it must be `render` is wrong, and why hooks, which drop the pattern entirely, now cover most cases.",
  "interviewLine": "I define the render prop pattern by passing a function the component calls to render, so the name is free, `render`, `children`, or a custom name; I find the `children`-as-function form often reads cleanest in JSX.",
  "misconception": "Assuming the prop must literally be named `render`, when any function prop, including `children`, that controls rendering is a render prop.",
  "hints": [
    "Ask what actually makes something a render prop, the name or the behavior.",
    "Can `children` be a function and still count?",
    "Why is `children` as a function often the cleanest form?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice children is the function here, a render prop despite not being named render.",
    "language": "tsx",
    "code": "function Mouse({ children }: { children: (p: { x: number; y: number }) => React.ReactNode }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>{children(pos)}</div>;\n}"
  }
},
{
  "id": "react-what-are-the-problems-of-using-render-props-with-pure-c",
  "title": "What are the problems of using render props with pure components?",
  "prompt": "What are the problems of using render props with pure components?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Render props cause `PureComponent` to crash with a syntax error at compile time.",
      "isCorrect": false,
      "explanation": "Tempting as a failure claim, but there is no crash; the optimization is silently defeated, not broken."
    },
    {
      "id": "B",
      "text": "Pure components delete the render prop function from memory after one use.",
      "isCorrect": false,
      "explanation": "Tempting as a cleanup-sounding claim, but nothing is deleted; a new function is created each render instead."
    },
    {
      "id": "C",
      "text": "An inline render-prop function is a new reference each render, failing shallow comparison and defeating `PureComponent`/`memo`.",
      "isCorrect": true,
      "explanation": "Correct. The changing function identity makes the shallow prop check always detect a change."
    },
    {
      "id": "D",
      "text": "Render props simply cannot be passed to any component at all.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but render props are passed routinely; the issue is only reference stability with memoized children."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A pure component (`PureComponent` or `React.memo`) skips re-rendering when its props are shallowly equal. But if you define the render prop as an inline function inside render, a new function reference is created every pass, so the shallow prop comparison always sees a change and the optimization never kicks in.\n\nSo the inline render prop silently defeats the memoization you added. The pure component re-renders every time its parent does, exactly what you were trying to avoid.\n\nThe nuance an interviewer probes: the fix is a stable reference, define the render function as an instance method or memoize it with `useCallback`, so its identity is constant across renders. This is the same reference-stability issue that affects any function or object prop passed to a memoized child, render props just make it easy to introduce accidentally.",
  "interviewLine": "An inline render-prop function creates a new reference every render, so a memoized child's shallow prop check always sees a change and re-renders anyway; I stabilize it with an instance method or `useCallback`.",
  "misconception": "Thinking a pure component still skips renders with an inline render prop, when the new function reference each render defeats the shallow comparison.",
  "hints": [
    "Ask what changes about an inline function's identity between renders.",
    "What does a pure component's shallow comparison conclude about that prop?",
    "How do you give the render function a stable reference?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice useCallback stabilizes the render function so the memoized child can actually skip re-renders.",
    "language": "tsx",
    "code": "const Memoized = React.memo(DataView);\n\nfunction Parent({ data }: { data: Data }) {\n  // Stable reference: without useCallback, Memoized re-renders every time.\n  const render = useCallback((d: Data) => <Row d={d} />, []);\n  return <Memoized render={render} data={data} />;\n}"
  }
},
{
  "id": "react-how-do-you-create-hoc-using-render-props",
  "title": "How do you create HOC using render props?",
  "prompt": "How do you create HOC using render props?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "function withMouse(Component) {\n  return class extends React.Component {\n    render() {\n      return <Mouse render={(mouse) => <Component {...this.props} mouse={mouse} />} />;\n    }\n  };\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Write an HOC that renders the render-prop component and passes its data into the wrapped component as a prop.",
      "isCorrect": true,
      "explanation": "Correct. The HOC wraps the render-prop component and injects its data as a prop to the inner component."
    },
    {
      "id": "B",
      "text": "By calling `eval()` on the render prop passed as a string of code.",
      "isCorrect": false,
      "explanation": "Tempting as a dynamic trick, but render props are functions, not strings; `eval` is neither needed nor safe."
    },
    {
      "id": "C",
      "text": "Render props cannot be used inside higher-order components at all.",
      "isCorrect": false,
      "explanation": "Tempting as a constraint, but the two patterns compose freely; a HOC can wrap a render-prop component."
    },
    {
      "id": "D",
      "text": "By mutating `React.Component.prototype` to inject the render-prop data globally.",
      "isCorrect": false,
      "explanation": "Tempting as a hack, but mutating the prototype is unsafe and unnecessary; you compose with a wrapper function."
    }
  ],
  "correctAnswer": "A",
  "explanation": "You can build a higher-order component on top of a render-prop component by writing a function that takes a component and returns a new one, which renders the render-prop component and feeds its data into the wrapped component. The pattern is `const withMouse = Comp => props => <Mouse render={m => <Comp {...props} mouse={m} />} />`.\n\nThis adapts the flexible render-prop API into the HOC shape some codebases prefer: the data (`mouse`) arrives as an injected prop rather than through a function. It shows the two patterns are interconvertible, a render prop can wrap into a HOC, and vice versa.\n\nThe nuance an interviewer probes: this interconversion is mostly historical trivia now, since a custom hook (`useMouse()`) expresses the same shared logic more directly than either a render prop or a HOC. Recognizing the transformation matters for reading older code, not for designing new APIs.",
  "interviewLine": "I build the HOC as a function that renders the render-prop component and feeds its data into the wrapped one as a prop, showing the two patterns are interconvertible; today a custom hook replaces both more cleanly.",
  "misconception": "Thinking render props and HOCs are incompatible, when a HOC can wrap a render-prop component and inject its data as a prop.",
  "hints": [
    "Ask how the HOC turns the render-prop's data into an injected prop.",
    "Does the render-prop component live inside or outside the returned component?",
    "What modern feature makes this interconversion mostly moot?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the HOC renders Mouse and injects its data as the `mouse` prop on the wrapped component.",
    "language": "tsx",
    "code": "function withMouse<P>(Comp: React.ComponentType<P & { mouse: Point }>) {\n  return (props: P) => (\n    <Mouse render={(mouse) => <Comp {...props} mouse={mouse} />} />\n  );\n}"
  }
},
{
  "id": "react-what-is-windowing-technique",
  "title": "What is windowing technique?",
  "prompt": "What is windowing technique?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Installing the Microsoft Windows operating system on the application's web server.",
      "isCorrect": false,
      "explanation": "Tempting because of the word \"Windows,\" but windowing is a list-rendering optimization, not an OS install."
    },
    {
      "id": "B",
      "text": "Opening five hundred browser popup windows at the same time to display content.",
      "isCorrect": false,
      "explanation": "Tempting as a literal reading, but windowing renders a visible slice of a list, not browser popups."
    },
    {
      "id": "C",
      "text": "A virtualization technique (react-window, TanStack Virtual) that renders only the visible items, cutting DOM nodes and memory.",
      "isCorrect": true,
      "explanation": "Correct. It mounts just the viewport slice of a long list, drastically reducing DOM and memory cost."
    },
    {
      "id": "D",
      "text": "A technique that only works on desktop monitors that have physical window panes.",
      "isCorrect": false,
      "explanation": "Tempting as a literalization, but the \"window\" is the visible slice of a list, not a physical window."
    }
  ],
  "correctAnswer": "C",
  "explanation": "Windowing (list virtualization) renders only the items currently visible in the viewport, plus a small buffer, instead of mounting every item in a long list. Libraries like react-window or TanStack Virtual compute which slice is visible from the scroll position and render just that window, recycling as the user scrolls.\n\nThe payoff is dramatic for large lists: a 10,000-row table mounts maybe 20 DOM nodes instead of 10,000, slashing memory, mount time, and reconciliation cost. The user sees a normal scrollable list; the off-screen rows simply do not exist in the DOM.\n\nThe nuance an interviewer probes: windowing trades DOM nodes for scroll bookkeeping, so it shines only when the list is genuinely large, for a few dozen rows the overhead is not worth it. It also complicates features like in-page search (Ctrl-F misses unmounted rows) and requires known or measured item sizes.",
  "interviewLine": "Windowing renders only the viewport slice of a long list with a library like react-window, so a huge list mounts a handful of nodes instead of thousands; I reserve it for large lists since it complicates search and needs item sizes.",
  "misconception": "Thinking windowing applies to every list, when its scroll-bookkeeping overhead only pays off for genuinely large lists.",
  "hints": [
    "Ask how many of a 10,000-row list's items are actually in the DOM with windowing.",
    "What does it trade DOM nodes for?",
    "When is the overhead not worth it, and what does it complicate?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://web.dev/articles/virtualize-long-lists-react-window",
  "example": {
    "caption": "Notice only the visible rows render; react-window computes the window from scroll position.",
    "language": "tsx",
    "code": "import { FixedSizeList } from \"react-window\";\n\nfunction BigList({ rows }: { rows: string[] }) {\n  return (\n    <FixedSizeList height={400} width={300} itemCount={rows.length} itemSize={35}>\n      {({ index, style }) => <div style={style}>{rows[index]}</div>}\n    </FixedSizeList>\n  );\n}"
  }
},
{
  "id": "react-how-do-you-print-falsy-values-in-jsx",
  "title": "How do you print falsy values in JSX?",
  "prompt": "How do you print falsy values in JSX?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeSnippet": "<div>My JavaScript variable is {String(myVariable)}.</div>",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Wrap the values inside HTML comments, like `<!-- {myVar} -->`, to force them to display.",
      "isCorrect": false,
      "explanation": "Tempting as a markup trick, but HTML comments do not render content; you stringify the value instead."
    },
    {
      "id": "B",
      "text": "Because `false`, `null`, `undefined`, and `true` render nothing, convert them to strings: `{String(myVar)}` or `{myVar?.toString()}`.",
      "isCorrect": true,
      "explanation": "Correct. Explicit string conversion makes an otherwise-skipped falsy value visible."
    },
    {
      "id": "C",
      "text": "Pass the values inside an infinite `while` loop to keep re-rendering them.",
      "isCorrect": false,
      "explanation": "Tempting as a brute-force idea, but a loop freezes the thread and does not make a falsy value render; stringify it."
    },
    {
      "id": "D",
      "text": "Falsy values simply cannot be converted to strings anywhere in JavaScript.",
      "isCorrect": false,
      "explanation": "Tempting as a limitation, but `String(false)` is `\"false\"`; conversion works fine and is the solution."
    }
  ],
  "correctAnswer": "B",
  "explanation": "JSX renders `false`, `null`, `undefined`, and `true` as nothing, so if you want to display a falsy value you must convert it to a string explicitly: `{String(myVar)}`, `{myVar + ''}`, or `{myVar?.toString()}`. The number `0` and the empty string are exceptions, `0` renders as the character `0` and `''` renders as nothing visible.\n\nThis follows from React skipping booleans and nullish values so that `cond && <X />` can render nothing cleanly. The cost is that a literal `false` or `null` you actually want to show never appears unless stringified.\n\nThe nuance an interviewer probes: `{String(x)}` is the safe, intention-revealing way, whereas `{x && ...}` is where the classic `0` bug hides. Knowing which values render and which vanish, and that `0` is the sneaky one, is the real point.",
  "interviewLine": "React renders `false`, `null`, `undefined`, and `true` as nothing, so to show a falsy value I stringify it with `{String(x)}`; the sneaky case is `0`, which does render, and is the source of the classic `&&` bug.",
  "misconception": "Expecting a falsy value like `false` or `null` to show in JSX, when React renders those as nothing unless you stringify them.",
  "hints": [
    "Ask which values React renders as nothing in JSX.",
    "Is `0` among the values that vanish, or does it render?",
    "What explicit conversion makes a falsy value visible?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice String(active) shows \"false\", where a bare {active} would render nothing.",
    "language": "tsx",
    "code": "function Flag({ active }: { active: boolean }) {\n  return (\n    <p>\n      Active: {String(active)}\n    </p>\n  ); // bare {active} would render nothing when false\n}"
  }
},
{
  "id": "react-how-do-you-set-default-value-for-uncontrolled-component",
  "title": "How do you set default value for uncontrolled component?",
  "prompt": "How do you set default value for uncontrolled component?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "intermediate"
  ],
  "codeSnippet": "render() {\n  return (\n    <form onSubmit={this.handleSubmit}>\n      <label>\n        User Name:\n        <input\n          defaultValue=\"John\"\n          type=\"text\"\n          ref={this.input} />\n      </label>\n      <input type=\"submit\" value=\"Submit\" />\n    </form>\n  );\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Uncontrolled inputs cannot be given any initial default value at all.",
      "isCorrect": false,
      "explanation": "Tempting as an absolute, but `defaultValue` and `defaultChecked` exist precisely to seed uncontrolled inputs."
    },
    {
      "id": "B",
      "text": "Use `defaultValue` for text/number/select/textarea or `defaultChecked` for checkbox/radio, leaving later typing uncontrolled.",
      "isCorrect": true,
      "explanation": "Correct. These seed the initial DOM value once without React controlling subsequent input."
    },
    {
      "id": "C",
      "text": "Mutate `input.value` directly inside the constructor to set the starting value.",
      "isCorrect": false,
      "explanation": "Tempting as a direct route, but imperative mutation at construction is wrong; `defaultValue` is the declarative seed."
    },
    {
      "id": "D",
      "text": "Use `value='initial'` without an `onChange` handler to set the default.",
      "isCorrect": false,
      "explanation": "Tempting as a near-miss, but `value` without `onChange` makes a frozen controlled input, not an uncontrolled default."
    }
  ],
  "correctAnswer": "B",
  "explanation": "For an uncontrolled input, you set its starting value with `defaultValue` (for text, number, select, and textarea) or `defaultChecked` (for checkbox and radio). These seed the DOM's initial value without React controlling it afterward, so subsequent typing is managed by the browser, and you read the final value through a ref.\n\nThe distinction from a controlled input is that `defaultValue` sets the value only once at mount; `value` would make React own it on every render. Using `defaultValue` keeps the field uncontrolled, which is the intent.\n\nThe nuance an interviewer probes: do not use `value` without `onChange` to set an initial value, that creates a controlled input that freezes, because React keeps overwriting the user's keystrokes with the fixed value. `defaultValue` is specifically the uncontrolled seed, and mixing it with `value` on the same input triggers a React warning.",
  "interviewLine": "I seed an uncontrolled input with `defaultValue` (or `defaultChecked` for checkboxes), which sets the initial DOM value once and leaves later typing uncontrolled; using `value` without `onChange` would freeze the field instead.",
  "misconception": "Using `value` to set an uncontrolled input's initial value, when `value` without `onChange` freezes the field; `defaultValue` is the correct uncontrolled seed.",
  "hints": [
    "Ask which attribute seeds an uncontrolled input versus which one controls it.",
    "What happens if you set `value` without an `onChange`?",
    "Which attribute does a checkbox or radio use for its default?"
  ],
  "source": "300-react",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react-dom/components/input",
  "example": {
    "caption": "Notice defaultValue seeds the field once; the final value is read from the ref, not React state.",
    "language": "tsx",
    "code": "function NameForm() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  const onSubmit = () => console.log(inputRef.current?.value);\n  return (\n    <form onSubmit={onSubmit}>\n      <input ref={inputRef} defaultValue=\"John\" />\n    </form>\n  );\n}"
  }
},
{
  "id": "react-what-is-the-purpose-of-rendertonodestream-method",
  "title": "What is the purpose of renderToNodeStream method?",
  "prompt": "What is the purpose of renderToNodeStream method?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "A method that compiles React JSX directly into playable MP4 video files.",
      "isCorrect": false,
      "explanation": "Tempting as a streaming-flavored distractor, but it streams HTML, not video; it produces no MP4."
    },
    {
      "id": "B",
      "text": "A client-side method that plays audio streams through the browser's speakers.",
      "isCorrect": false,
      "explanation": "Tempting because of \"stream,\" but it is a server method rendering HTML, not an audio API."
    },
    {
      "id": "C",
      "text": "A Node server method that rendered React to a readable stream for faster TTFB; deprecated in React 18 for `renderToPipeableStream`.",
      "isCorrect": true,
      "explanation": "Correct. It was the original streaming SSR API, now superseded by the Suspense-aware pipeable stream."
    },
    {
      "id": "D",
      "text": "A tool that renders 3D video game graphics through WebGL on the server.",
      "isCorrect": false,
      "explanation": "Tempting as a rendering-adjacent option, but it streams HTML for SSR, not WebGL graphics."
    }
  ],
  "correctAnswer": "C",
  "explanation": "`renderToNodeStream` was a `react-dom/server` method that rendered a React tree to a Node readable stream instead of a single string. Streaming lets the server send HTML to the browser as it is produced, improving time-to-first-byte for large pages compared to building the whole string before responding.\n\nIt was the first streaming SSR API, but it is deprecated in React 18 in favor of `renderToPipeableStream`, which supports Suspense on the server, selective hydration, and error handling that the older method lacked.\n\nThe nuance an interviewer probes: citing `renderToNodeStream` as the current streaming API signals outdated knowledge. The modern choice is `renderToPipeableStream` (Node) or `renderToReadableStream` (Web/Edge), both built to work with Suspense boundaries, which is the whole point of streaming SSR today.",
  "interviewLine": "I recall `renderToNodeStream` streamed server-rendered HTML to a Node stream for faster TTFB, but it is deprecated in React 18, so I use `renderToPipeableStream`, which supports Suspense and selective hydration.",
  "misconception": "Citing `renderToNodeStream` as the current streaming API, when React 18 replaced it with the Suspense-aware `renderToPipeableStream`.",
  "hints": [
    "Ask what streaming HTML buys over building the full string first.",
    "Which modern method replaced it, and what does the replacement add?",
    "Why does Suspense support matter for streaming SSR?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the modern pipeable stream replaces renderToNodeStream and works with Suspense.",
    "language": "tsx",
    "code": "import { renderToPipeableStream } from \"react-dom/server\";\n\nfunction handle(res: NodeResponse) {\n  const { pipe } = renderToPipeableStream(<App />, {\n    onShellReady() { pipe(res); },\n  });\n}"
  }
},
{
  "id": "react-what-is-concurrent-rendering",
  "title": "What is Concurrent Rendering?",
  "prompt": "What is Concurrent Rendering?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior",
    "rendering"
  ],
  "codeSnippet": "// 1. Part of an app by wrapping with ConcurrentMode\n<React.unstable_ConcurrentMode>\n  <Something />\n</React.unstable_ConcurrentMode>;\n\n// 2. Whole app using createRoot\nReactDOM.unstable_createRoot(domNode).render(<App />);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Running the React application's code on fifty physical computers at the same time.",
      "isCorrect": false,
      "explanation": "Tempting because \"concurrent\" suggests parallel machines, but it is interruptible scheduling on one thread, not distribution."
    },
    {
      "id": "B",
      "text": "A React 18+ capability where rendering is interruptible, pausing low-priority work to keep the UI responsive to urgent input.",
      "isCorrect": true,
      "explanation": "Correct. React yields between units so urgent updates preempt heavy, low-priority renders."
    },
    {
      "id": "C",
      "text": "Rendering 3D virtual-reality models directly to the GPU for performance.",
      "isCorrect": false,
      "explanation": "Tempting as a performance-flavored distractor, but concurrency is about scheduling renders, not GPU graphics."
    },
    {
      "id": "D",
      "text": "A feature that disables all user interaction while the component tree is rendering.",
      "isCorrect": false,
      "explanation": "Tempting as a reversal, but concurrency keeps interaction responsive during rendering; it does not block it."
    }
  ],
  "correctAnswer": "B",
  "explanation": "Concurrent rendering is a React 18+ capability where rendering is interruptible. React can start rendering, pause to let a higher-priority update run, then resume or discard the paused work, so an expensive low-priority render (a background data transition) never blocks urgent interactions like typing or clicking.\n\nYou opt in through the concurrent root (`createRoot`) and use features like `startTransition` and `useDeferredValue` to mark work as low priority. The UI stays responsive because React yields between units of work.\n\nThe nuance an interviewer probes: the snippet's `unstable_ConcurrentMode` and `unstable_createRoot` are old experimental APIs; the stable form is `createRoot`, and concurrency is now a set of features rather than a global \"mode.\" It is cooperative scheduling on the main thread, not multithreading, and transitions reprioritize work rather than making it faster.",
  "interviewLine": "I describe concurrent rendering, in React 18+ via `createRoot`, as making rendering interruptible so low-priority work I mark with `startTransition` or `useDeferredValue` yields to urgent input; it is cooperative scheduling, not multithreading.",
  "misconception": "Picturing concurrent rendering as multithreading or parallel machines, when it is cooperative, interruptible scheduling on the single main thread.",
  "hints": [
    "Ask whether React renders on more than one thread here.",
    "What lets an urgent click interrupt an in-progress low-priority render?",
    "Are the snippet's `unstable_` APIs the current way to enable it?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice createRoot opts into concurrency; startTransition then marks heavy work interruptible.",
    "language": "tsx",
    "code": "import { createRoot } from \"react-dom/client\";\n\ncreateRoot(document.getElementById(\"root\")!).render(<App />);\n// Inside App, startTransition(() => setResults(filter(input))) stays interruptible."
  }
},
{
  "id": "react-what-is-the-difference-between-async-mode-and-concurren",
  "title": "What is the difference between async mode and concurrent mode?",
  "prompt": "What is the difference between async mode and concurrent mode?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "rendering-keys",
    "junior"
  ],
  "codeLanguage": "typescript",
  "options": [
    {
      "id": "A",
      "text": "Async Mode runs inside Node.js while Concurrent Mode runs inside a PostgreSQL database.",
      "isCorrect": false,
      "explanation": "Tempting as a split, but both name the same client-side rendering architecture; neither runs in a database."
    },
    {
      "id": "B",
      "text": "Concurrent Mode was deleted from React and replaced entirely by jQuery.",
      "isCorrect": false,
      "explanation": "Tempting as a version claim, but concurrency is current and central; React never adopted jQuery."
    },
    {
      "id": "C",
      "text": "Async mode only functions on Sundays and is disabled the rest of the week.",
      "isCorrect": false,
      "explanation": "Tempting as an absurd distractor, but there is no such schedule; the two terms name one architecture."
    },
    {
      "id": "D",
      "text": "They are the same architecture: 'Async Mode' was the early name, later renamed 'Concurrent Mode / Features' to stress priority scheduling.",
      "isCorrect": true,
      "explanation": "Correct. The rename reflected clearer messaging, not a different system."
    }
  ],
  "correctAnswer": "D",
  "explanation": "They are the same underlying architecture under two names. \"Async Mode\" was the early experimental working name for React's interruptible rendering; the team renamed it to \"Concurrent Mode,\" and then to \"Concurrent Features,\" to emphasize cooperative multitasking and priority scheduling rather than merely being asynchronous.\n\nSo there is no behavioral difference to contrast, the rename reflected clearer messaging about what the architecture does: let React pause, resume, and prioritize rendering work.\n\nThe nuance an interviewer probes: the terminology also shifted from a single opt-in \"Mode\" to a set of \"Features\" (`startTransition`, `useDeferredValue`, Suspense) you adopt piecemeal in React 18. Treating async mode and concurrent mode as two distinct systems is the mistake; it is one lineage with evolving names.",
  "interviewLine": "I explain Async Mode was just the early name for what became Concurrent Mode and then Concurrent Features, the same interruptible, priority-scheduled rendering, so there is no behavioral difference to contrast, only evolving terminology.",
  "misconception": "Treating async mode and concurrent mode as two distinct systems, when they are one architecture renamed over time.",
  "hints": [
    "Ask whether the two names describe different behavior or the same thing.",
    "Why did the team move from 'Mode' to 'Features'?",
    "What does the 'concurrent' naming emphasize over 'async'?"
  ],
  "source": "300-react",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/reference/react/useTransition",
  "example": {
    "caption": "Notice today you adopt concurrency as individual features, not a single global mode.",
    "language": "typescript",
    "code": "// No global \"mode\" flag; you opt into concurrent features one at a time:\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => {\n  setQuery(nextQuery);\n});\nconst deferred = useDeferredValue(value);"
  }
},
{
  "id": "react-virtual-dom-vs-real-and-shadow-dom",
  "title": "Virtual DOM, real DOM and Shadow DOM are three different things",
  "prompt": "How does React's Virtual DOM differ from the real DOM and from the Shadow DOM?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "virtual-dom",
    "shadow-dom",
    "reconciliation"
  ],
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "The Shadow DOM is the tree React diffs on each update, and the Virtual DOM is the browser's internal live render tree",
      "isCorrect": false,
      "explanation": "Tempting because it swaps the terms confidently, but it inverts them: React diffs the Virtual DOM, and the real DOM is the browser's tree."
    },
    {
      "id": "B",
      "text": "The Virtual DOM is an in-memory description of the UI that React diffs before touching the real DOM; the Shadow DOM is an unrelated browser feature for encapsulating a component's markup and styles",
      "isCorrect": true,
      "explanation": "Correct. One is React's diffing abstraction; the other is a browser scoping primitive for Web Components."
    },
    {
      "id": "C",
      "text": "The Virtual DOM and the Shadow DOM are the same underlying mechanism, simply named differently by React and by the browser vendors",
      "isCorrect": false,
      "explanation": "Tempting because the names rhyme, but they are distinct: a diffing abstraction versus a style/markup encapsulation boundary."
    },
    {
      "id": "D",
      "text": "The Virtual DOM is a faster drop-in reimplementation of the real DOM that React renders its output to directly",
      "isCorrect": false,
      "explanation": "Tempting as a simplification, but the Virtual DOM is a description React diffs; it still updates the one real DOM."
    }
  ],
  "correctAnswer": "B",
  "explanation": "The Virtual DOM is React's in-memory tree of plain objects describing the UI; React diffs a new virtual tree against the previous one and applies the minimal changes to the real DOM, the actual browser document the user sees. The Shadow DOM is an unrelated browser feature that encapsulates a custom element's internal markup and styles so they do not leak into or clash with the surrounding page.\n\nSo three distinct things: the Virtual DOM (React's diffing abstraction), the real DOM (the browser's live tree), and the Shadow DOM (a scoping boundary for Web Components).\n\nThe nuance an interviewer probes: the names rhyme, which breeds confusion, but the Virtual DOM and Shadow DOM solve completely different problems and are not alternatives to each other. React diffs the Virtual DOM to update the real DOM; the Shadow DOM is a browser primitive React does not use for its own rendering.",
  "interviewLine": "I describe the Virtual DOM as React's in-memory tree it diffs to update the real browser DOM, while the Shadow DOM is an unrelated browser feature that encapsulates a Web Component's markup and styles; I stress they are not alternatives.",
  "misconception": "Conflating the Virtual DOM with the Shadow DOM because the names rhyme, when they solve entirely different problems.",
  "hints": [
    "Ask which tree React actually diffs and which one the user sees.",
    "What problem does the Shadow DOM solve, and does React use it to render?",
    "Why does the rhyming name cause the confusion?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/preserving-and-resetting-state",
  "example": {
    "caption": "Notice the Shadow DOM is a browser API for style encapsulation, separate from React's Virtual DOM.",
    "language": "tsx",
    "code": "// Shadow DOM: a browser feature, not React's Virtual DOM.\nconst host = document.createElement(\"div\");\nconst shadow = host.attachShadow({ mode: \"open\" });\nshadow.innerHTML = `<style>p { color: red }</style><p>Scoped</p>`;"
  }
},
{
  "id": "react-class-vs-function-components-today",
  "title": "Which component type to reach for in new code",
  "prompt": "React has class components and function components. Which should new code use, and why?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "components",
    "hooks",
    "function-components"
  ],
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Class components, because function components re-render noticeably more often than classes.",
      "isCorrect": false,
      "explanation": "Tempting as a performance claim, but re-render behavior is driven by state and props, not component type; both behave the same."
    },
    {
      "id": "B",
      "text": "Class components, because only they are capable of holding component state.",
      "isCorrect": false,
      "explanation": "Tempting as the pre-hooks truth, but `useState` gives function components state; this is outdated."
    },
    {
      "id": "C",
      "text": "Function components, because hooks gave them state and effects and they are the default for new code.",
      "isCorrect": true,
      "explanation": "Correct. Hooks closed the capability gap, making function components the modern default."
    },
    {
      "id": "D",
      "text": "Function components for presentation only; anything stateful must still be written as a class.",
      "isCorrect": false,
      "explanation": "Tempting as a partial truth, but hooks let function components hold state and effects, so stateful logic belongs in them too."
    }
  ],
  "correctAnswer": "C",
  "explanation": "New code should use function components. Before hooks, class components were required for state and lifecycle, but hooks (`useState`, `useEffect`, and the rest) gave function components the same capabilities with less ceremony, so they are now the default and the target of React's newest features.\n\nFunction components are not merely for presentation: `useState` gives them state and `useEffect` gives them side effects, so the old \"functions are stateless\" distinction no longer holds.\n\nThe nuance an interviewer probes: class components are not deprecated and still work, and error boundaries still require a class (no hook equivalent yet). But those are the exception; choosing a class for ordinary new work signals unfamiliarity with hooks, and the claim that function components re-render more or can't hold state is simply outdated.",
  "interviewLine": "I write new code as function components: hooks gave them state and effects, so I default to them and get React's newest features; classes still work and I only reach for them for error boundaries.",
  "misconception": "Believing function components are stateless or presentation-only, when hooks gave them full state and effect capabilities.",
  "hints": [
    "Ask what hooks added to function components.",
    "Is the old \"functions are stateless\" distinction still true?",
    "What is the one case that still requires a class component?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the function component holds state and runs an effect, no class needed.",
    "language": "tsx",
    "code": "function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setSeconds((s) => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <span>{seconds}s</span>;\n}"
  }
},
{
  "id": "react-keys-outside-lists-force-remount",
  "title": "Keys work outside lists too, and that is how you force a remount",
  "prompt": "Keys are usually seen on list items. What happens if you put a changing key on a single element?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "keys",
    "reconciliation",
    "remount"
  ],
  "codeSnippet": "const Profile = ({ userId }: { userId: string }) => {\n  // changing userId throws away all internal state\n  return <ProfileForm key={userId} userId={userId} />;\n};",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "React warns in development and falls back to positional matching for the element.",
      "isCorrect": false,
      "explanation": "Tempting if you associate key warnings with lists, but a changing key on a single element remounts it, with no warning."
    },
    {
      "id": "B",
      "text": "React treats it as a different element and remounts it, discarding its internal state.",
      "isCorrect": true,
      "explanation": "Correct. A new key means a new identity, so React unmounts the old instance and mounts a fresh one."
    },
    {
      "id": "C",
      "text": "React reuses the same instance but forcibly re-runs every one of its effects.",
      "isCorrect": false,
      "explanation": "Tempting as a partial effect, but a changed key remounts the instance entirely, not merely re-runs effects on the same one."
    },
    {
      "id": "D",
      "text": "Nothing happens, because keys are ignored entirely outside of a list.",
      "isCorrect": false,
      "explanation": "Tempting as a simplification, but keys are identities everywhere; a changing one on a single element forces a remount."
    }
  ],
  "correctAnswer": "B",
  "explanation": "A `key` is not list-only; it is an identity for any element. When you put a changing `key` on a single element, React sees a different identity on the next render, so instead of updating the existing instance it unmounts the old one and mounts a fresh one, discarding all internal state, resetting form fields, effects, and refs.\n\nThe example uses `key={userId}` on `<ProfileForm>` so that navigating to a new user throws away the previous form's state, exactly the desired reset. It is the idiomatic way to force a clean remount from the parent.\n\nThe nuance an interviewer probes: this is the same type-and-key reconciliation rule that governs lists, applied deliberately to one element. It is cleaner than manually resetting every piece of state in an effect, and it is the recommended pattern for \"reset this component when X changes.\" Overusing it, keying on a value that changes constantly, remounts too aggressively.",
  "interviewLine": "A `key` is an identity for any element, so changing it on a single component remounts it and discards its state; I use `key={id}` to deliberately reset a form when the id changes, cleaner than resetting each field by hand.",
  "misconception": "Thinking keys only matter inside lists, when a changing key on any element forces a full remount, which you can use to reset state.",
  "hints": [
    "Ask what React does when an element's key differs from the previous render.",
    "Is a key meaningful only inside a `.map()`, or on any element?",
    "How does this give you a one-line way to reset a component's state?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  "example": {
    "caption": "Notice changing the key remounts ProfileForm, resetting its internal state for the new user.",
    "language": "tsx",
    "code": "function Profile({ userId }: { userId: string }) {\n  // A new userId changes the key, remounting the form with fresh state.\n  return <ProfileForm key={userId} userId={userId} />;\n}"
  }
},
{
  "id": "react-why-jsx-needs-transpiling",
  "title": "What JSX actually compiles to",
  "prompt": "Why does JSX have to be transpiled before a browser can run it?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "jsx",
    "babel",
    "transpilation"
  ],
  "codeSnippet": "const Greeting = () => <h1 className=\"greeting\">Hello</h1>;\n\n// becomes, roughly:\nconst Greeting = () =>\n  jsx(\"h1\", { className: \"greeting\", children: \"Hello\" });",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "Because browsers can parse JSX but do so too slowly to use in production.",
      "isCorrect": false,
      "explanation": "Tempting as a performance reason, but browsers cannot parse JSX at all; speed is not the issue."
    },
    {
      "id": "B",
      "text": "Because JSX must be converted into HTML strings before it can be rendered.",
      "isCorrect": false,
      "explanation": "Tempting because JSX looks like HTML, but it compiles to function calls returning element objects, not HTML strings."
    },
    {
      "id": "C",
      "text": "Because transpiling is how React escapes interpolated values to prevent XSS.",
      "isCorrect": false,
      "explanation": "Tempting since XSS escaping is real, but that happens at render time in React DOM, not during transpilation."
    },
    {
      "id": "D",
      "text": "Because JSX is not valid JavaScript syntax, so a compiler rewrites it into plain function calls.",
      "isCorrect": true,
      "explanation": "Correct. The engine cannot parse JSX, so it must be translated to callable JavaScript first."
    }
  ],
  "correctAnswer": "D",
  "explanation": "JSX is not valid JavaScript, no engine can parse a `<h1>` tag, so a compiler must rewrite it into plain function calls before the browser runs it. `<h1 className=\"greeting\">Hello</h1>` becomes a call like `jsx(\"h1\", { className: \"greeting\", children: \"Hello\" })`, which is ordinary JavaScript that returns an element object.\n\nSo transpiling is a syntax translation, not an optimization or a security step. It exists purely because the HTML-like syntax has to become callable JavaScript.\n\nThe nuance an interviewer probes: the distractors each name a real React concept attached to the wrong cause. Browsers do not parse JSX at all (not just slowly); JSX becomes function calls, not HTML strings; and XSS escaping happens at render time in React DOM, not during transpilation. The single correct reason is that JSX is not valid JS syntax.",
  "interviewLine": "I point out JSX is not valid JavaScript, so a compiler rewrites each tag into plain function calls like `jsx(\"h1\", {...})`; it is purely a syntax translation, not an optimization or an escaping step.",
  "misconception": "Attributing transpiling to speed, HTML conversion, or XSS, when the sole reason is that JSX is not valid JavaScript the engine can parse.",
  "hints": [
    "Ask whether the JavaScript engine can parse a JSX tag at all.",
    "Does JSX compile to HTML strings or to function calls?",
    "Where does React's XSS escaping actually happen, build time or render time?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the tag becomes a function call returning an element object, which is runnable JavaScript.",
    "language": "tsx",
    "code": "const Greeting = () => <h1 className=\"greeting\">Hello</h1>;\n\n// transpiles to roughly:\nconst GreetingCompiled = () =>\n  jsx(\"h1\", {\n    className: \"greeting\",\n    children: \"Hello\",\n  });"
  }
},
{
  "id": "react-styling-approaches-tradeoffs",
  "title": "Choosing a styling approach in React",
  "prompt": "Which statement about styling React components is accurate?",
  "level": "junior",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "styling",
    "css-modules",
    "inline-styles"
  ],
  "codeSnippet": "<div style={{ backgroundColor: \"blue\", color: \"white\" }} />",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A plain imported `.css` file is automatically scoped to just the component that imports it.",
      "isCorrect": false,
      "explanation": "Tempting if you assume importing scopes it, but a plain stylesheet is global; only CSS Modules scope per file."
    },
    {
      "id": "B",
      "text": "Inline styles perform best because they avoid any stylesheet parsing cost.",
      "isCorrect": false,
      "explanation": "Tempting as a performance claim, but inline styles skip caching and reapply per render; they are not automatically faster."
    },
    {
      "id": "C",
      "text": "Inline style objects support the full range of CSS, including pseudo-classes and media queries.",
      "isCorrect": false,
      "explanation": "Tempting if you expect parity, but the `style` prop maps to the element's style property, which has no `:hover` or `@media`."
    },
    {
      "id": "D",
      "text": "CSS Modules scope class names per file, avoiding the global collisions a plain stylesheet risks.",
      "isCorrect": true,
      "explanation": "Correct. CSS Modules localize class names, so same-named classes in different files do not clash."
    }
  ],
  "correctAnswer": "D",
  "explanation": "CSS Modules scope class names per file: importing `styles` from a `.module.css` file gives you locally-unique class names, so two files can both define `.button` without colliding. A plain imported `.css` file, by contrast, is global, its rules apply app-wide and can clash.\n\nThat scoping is the key accurate statement among the options. The distractors each state a common myth: a plain stylesheet is not auto-scoped, inline styles are not automatically faster (and skip stylesheet caching), and inline style objects cannot express pseudo-classes or media queries.\n\nThe nuance an interviewer probes: the inline `style` prop maps to the element's `style` property, which has no concept of `:hover` or `@media`, so those require a stylesheet, CSS Modules, or a CSS-in-JS library. Knowing each approach's real trade-off, scoping, caching, dynamic capability, is the point, not picking a single \"best.\"",
  "interviewLine": "I use CSS Modules to scope class names per file so same-named classes do not collide, unlike a global plain stylesheet; I note inline styles are not inherently faster and cannot express `:hover` or media queries, which is the real trade-off.",
  "misconception": "Assuming imported CSS is auto-scoped or that inline styles are fastest and fully capable, when only CSS Modules scope per file and inline styles lack pseudo-classes.",
  "hints": [
    "Ask whether importing a plain `.css` file scopes its rules or keeps them global.",
    "Can an inline style object express `:hover` or a media query?",
    "Which approach gives per-file scoping without a runtime cost?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react.dev/learn/passing-props-to-a-component",
  "example": {
    "caption": "Notice the imported styles object yields a locally-scoped class name, unlike a global stylesheet.",
    "language": "tsx",
    "code": "import styles from \"./Button.module.css\";\n\nfunction Button() {\n  // styles.primary is a unique, file-scoped class, no global collision\n  return <button className={styles.primary}>Save</button>;\n}"
  }
},
{
  "id": "react-error-boundaries-what-they-catch",
  "title": "What an error boundary can and cannot catch",
  "prompt": "You wrap a subtree in an error boundary. Which failure does it NOT catch?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "error-boundaries",
    "error-handling"
  ],
  "codeSnippet": "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    log(error, info);\n  }\n  render() {\n    return this.state.hasError ? <Fallback />: this.props.children;\n  }\n}",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "A rejected promise in an async click handler.",
      "isCorrect": true,
      "explanation": "Correct. The handler runs after render and the rejection is async, so it falls outside the boundary's scope."
    },
    {
      "id": "B",
      "text": "An error thrown from a child component's constructor.",
      "isCorrect": false,
      "explanation": "Tempting as a guess, but constructor errors are part of mounting the subtree, which boundaries do catch."
    },
    {
      "id": "C",
      "text": "An error thrown while rendering a child component.",
      "isCorrect": false,
      "explanation": "Tempting as a guess, but render-phase errors are exactly what boundaries are designed to catch."
    },
    {
      "id": "D",
      "text": "An error thrown inside a child's `useEffect` during commit.",
      "isCorrect": false,
      "explanation": "Tempting as an edge case, but effect errors during commit are part of the render path and are caught by the boundary."
    }
  ],
  "correctAnswer": "A",
  "explanation": "An error boundary catches errors thrown synchronously during the rendering of its subtree, plus errors in descendant lifecycle methods and constructors. All three listed render-path cases, a child's constructor, a child's render, and a child's `useEffect` during commit, are inside what the boundary wraps.\n\nThe one it does not catch is the rejected promise in an async click handler. The handler runs after rendering, outside the render path, and the rejection is asynchronous, so it never reaches the boundary.\n\nThe nuance an interviewer probes: the dividing line is \"part of rendering the subtree\" versus \"runs outside render.\" Event handlers and async callbacks are outside, which is why they need `try`/`catch` and local error state. Candidates often assume a boundary is a universal safety net; naming the async-handler case as the gap shows you understand the boundary's actual scope.",
  "interviewLine": "I know an error boundary catches render, lifecycle, and constructor errors in its subtree, but not a rejected promise in an async handler, since that runs after render and asynchronously; I handle those with `try`/`catch` instead.",
  "misconception": "Treating a boundary as a universal catch-all, when it misses event-handler and async errors that run outside the render path.",
  "hints": [
    "Ask which of the options runs outside the render path.",
    "Is an async click handler part of rendering the subtree?",
    "What do you use for the errors the boundary cannot catch?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 3,
  "bestPracticeRef": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  "example": {
    "caption": "Notice the async rejection escapes the boundary, so the handler must catch it itself.",
    "language": "tsx",
    "code": "function Buy({ purchase }: { purchase: () => Promise<void> }) {\n  async function onClick() {\n    try {\n      await purchase(); // a boundary would not catch this rejection\n    } catch (e) {\n      report(e);\n    }\n  }\n  return <button onClick={onClick}>Buy</button>;\n}"
  }
},
{
  "id": "react-portals-dom-vs-react-tree",
  "title": "What a portal does and does not move",
  "prompt": "A modal is rendered through createPortal into a node outside its parent. Where do its click events propagate?",
  "level": "intermediate",
  "type": "concept",
  "category": "react",
  "subject": "rendering-keys",
  "tags": [
    "react",
    "portals",
    "events",
    "dom"
  ],
  "codeSnippet": "const Modal = ({ children }: { children: React.ReactNode }) =>\n  createPortal(children, document.getElementById(\"portal-root\")!);",
  "codeLanguage": "tsx",
  "options": [
    {
      "id": "A",
      "text": "To both the DOM tree and the React tree simultaneously, so handlers fire twice.",
      "isCorrect": false,
      "explanation": "Tempting as a \"covers everything\" guess, but events propagate once, up the React tree, not twice."
    },
    {
      "id": "B",
      "text": "Up the DOM tree from the portal's host node, bypassing the React parent entirely.",
      "isCorrect": false,
      "explanation": "Tempting if you reason from DOM position, but portals keep events on the React tree, not the DOM host's ancestry."
    },
    {
      "id": "C",
      "text": "Up the React tree to the component that rendered the portal, despite the DOM position.",
      "isCorrect": true,
      "explanation": "Correct. The child stays in the React tree, so events bubble to the React parent regardless of where the DOM node lives."
    },
    {
      "id": "D",
      "text": "Nowhere; events inside a portal do not propagate to any parent at all.",
      "isCorrect": false,
      "explanation": "Tempting if you assume isolation, but portaled events do propagate, up the React tree to the portal's renderer."
    }
  ],
  "correctAnswer": "C",
  "explanation": "A portal moves only the DOM position of its children; it does not move them in the React tree. So events from a portaled node propagate up the React tree to the component that rendered the portal, even though the node physically lives elsewhere in the document (here, under `portal-root`).\n\nThat is the defining, often-surprising property: a click inside a portaled modal bubbles to the React ancestor that called `createPortal`, not up the DOM from the portal's host node. Context flows the same way, through the React tree.\n\nThe nuance an interviewer probes: this is exactly why a modal rendered in a portal can still be wrapped by its logical parent's handlers and providers. The distractors reflect common wrong mental models, DOM-based bubbling from the host node, double propagation, or both, whereas the truth is React-tree propagation decoupled from DOM position.",
  "interviewLine": "I remember a portal moves only the DOM position; the child stays in the React tree, so events bubble up to the component that rendered the portal, not up the DOM from the host node, and context flows the same way.",
  "misconception": "Expecting portaled events to bubble through the DOM from the host node, when they bubble up the React tree to the component that rendered the portal.",
  "hints": [
    "Ask which tree the portaled child still belongs to.",
    "Does a click bubble up the DOM from the host node, or up the React tree?",
    "Why does this let the logical parent's handlers still catch the event?"
  ],
  "source": "react-17-2025",
  "estimatedMinutes": 2,
  "bestPracticeRef": "https://react-dom.dev/reference/react-dom/createPortal",
  "example": {
    "caption": "Notice onClose on the React parent still fires, though the modal's DOM lives under portal-root.",
    "language": "tsx",
    "code": "function Page({ onClose }: { onClose: () => void }) {\n  return (\n    <div onClick={onClose}>\n      {createPortal(<div>Modal</div>, document.getElementById(\"portal-root\")!)}\n    </div>\n  );\n}"
  }
}
];
