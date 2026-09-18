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
        text: "The value returned by useState is always a fresh object reference on every render, even if the setter is never called.",
        isCorrect: false,
        explanation: "Tempting because React re-renders often, but the hook returns the same stored reference across renders until you actually call the setter with a new value. Only the setter's argument creates a new reference; the existing one persists."
      },
      {
        id: "B",
        text: "An expression like useState(expensiveCalc()) is automatically memoised and evaluated only once, without needing a lazy initializer.",
        isCorrect: false,
        explanation: "The expression is re-evaluated on every render; React simply ignores the result after the first. To skip the call entirely you must pass a thunk: useState(() => expensiveCalc())."
      },
      {
        id: "C",
        text: "State updates are batched, and the updater form setVal(prev => prev + 1) guarantees each call reads the latest queued value rather than a stale closure.",
        isCorrect: true,
        explanation: "Correct. React batches multiple setter calls into one render pass, and the updater form lets each function receive the value produced by the previous updater in the queue, eliminating stale-closure bugs."
      },
      {
        id: "D",
        text: "Calling the setter mutates the state variable in the current render scope, so reading it on the very next line already reflects the new value.",
        isCorrect: false,
        explanation: "The state variable in the current closure is immutable for that render; the setter only queues a re-render. The new value is visible starting on the next render, not the next line."
      }
    ],
    correctAnswer: "C",
    explanation: "useState returns a two-element tuple: a value and a setter function. The value you see inside a render is fixed for that render \u2014 calling the setter does not reassign the local variable. React schedules a re-render, and since React 18 multiple updates within the same event are batched into a single re-render by default. On that next render the hook hands back the new value.\n\nBecause updates are batched, multiple setVal calls inside the same event handler or effect commit in one render. If you write setVal(val + 1) twice, both closures captured the same stale val, so the second call overwrites the first and the net change is +1, not +2. The updater form setVal(prev => prev + 1) sidesteps this: React feeds each updater the value produced by the previous updater in the queue, so chained increments always accumulate correctly.\n\nA nuance interviewers probe: the initial-value expression is evaluated on every render \u2014 React simply discards the result after the first. So useState(computeExpensive()) calls computeExpensive on every render. Wrapping it in a thunk, useState(() => computeExpensive()), makes React invoke the factory only once, on initial mount.",
    interviewLine: "useState gives me a snapshot value for the current render and a setter that queues a re-render; when I need to chain updates I switch to the functional updater form so each one reads the previous queued value instead of the stale closure.",
    misconception: "The state variable behaves like a normal mutable local: calling the setter immediately reassigns it, so the very next line of code already sees the new value.",
    hints: [
      "Think about what happens to the local variable `value` after you call `setValue` on the same render \u2014 does it change before the next line executes?",
      "Now imagine two setValue calls in the same event handler. What did each closure capture, and which one actually wins?",
      "The updater-function form exists specifically to solve that problem. Ask yourself what argument React passes into it and when."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice how the two stale-closure increments collapse to +1, while the updater form correctly accumulates to +2.",
      language: "tsx",
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n\n  function handleClickStale() {\n    setCount(count + 1); // both closures see the same `count`\n    setCount(count + 1); // overwrites \u2192 net change is +1\n  }\n\n  function handleClickUpd() {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1); // each gets the previous result \u2192 +2\n  }\n\n  return (\n    <div>\n      <span>{count}</span>{\" \"}\n      <button onClick={handleClickStale}>stale</button>{\" \"}\n      <button onClick={handleClickUpd}>updater</button>\n    </div>\n  );\n}"
    }
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
        text: "The commit phase in which React writes the computed mutations to the real browser DOM.",
        isCorrect: false,
        explanation: "This conflates reconciliation with the commit phase. Reconciliation is the render-phase diffing algorithm that produces the work list; the commit phase is a separate step that actually applies those mutations to the DOM."
      },
      {
        id: "B",
        text: "A full recursive deep-compare of every prop and child between old and new renders to find the absolute minimal set of DOM changes.",
        isCorrect: false,
        explanation: "This describes an exhaustive O(n\u00b3) tree diff, which is exactly what React avoids. In practice it uses type and key heuristics to stay at O(n), trading a theoretically optimal diff for a predictable, fast one."
      },
      {
        id: "C",
        text: "The process of reading the live DOM tree and comparing it against the new element tree to identify which nodes need updating.",
        isCorrect: false,
        explanation: "This is tempting because the end result is DOM changes, but React never reads the DOM during reconciliation. It compares the previous render's element tree to the new element tree; the DOM is only touched in the commit phase."
      },
      {
        id: "D",
        text: "The algorithm React uses to diff the previous element tree against the new one, applying type and key heuristics to compute the needed DOM operations.",
        isCorrect: true,
        explanation: "Correct. Reconciliation compares two in-memory element trees using type and key heuristics to produce an O(n) work list of DOM operations, which the commit phase then applies to the real DOM."
      }
    ],
    correctAnswer: "D",
    explanation: "Reconciliation is the algorithm React runs during the render phase to compare the element tree produced by the previous render with the new element tree produced by the current render. It operates entirely on in-memory element objects; it never reads the live DOM. Its output is a work list of DOM operations (insert, update, delete) that the subsequent commit phase applies to the browser.\n\nReact keeps this efficient with two heuristics. First, elements of different types (e.g. `<div>` vs `<span>`) are treated as structurally unrelated, so React tears down the old subtree and builds the new one from scratch. Second, among siblings in a list, the `key` prop tells React which child corresponds to which, avoiding the O(n\u00b3) cost of a full tree diff and keeping reconciliation at O(n) in the number of nodes.\n\nIn production code this matters because a missing or unstable key in a `.map()` forces React to fall back to index-based matching, which can cause stale component state to \"leak\" into the wrong list item after a reorder or removal. Interviewers often probe whether you understand that reconciliation compares two element trees, not the DOM, and that the virtual DOM is simply the data structure it operates on.",
    interviewLine: "Reconciliation is the render-phase algorithm that diffs the previous element tree against the new one using type and key heuristics to produce a work list of DOM operations; the actual DOM mutations happen later in the commit phase.",
    misconception: "Reconciliation reads the current DOM and compares it to the new element tree, or that it performs an exhaustive deep-diff of every prop. In reality, React compares the previous render's element tree to the new one using type and key heuristics, and only touches the DOM in the separate commit phase.",
    hints: [
      "Think about what React compares to what. It is not the DOM versus the new tree\u2014what are the two things actually being diffed?",
      "React avoids a full O(n\u00b3) tree diff by relying on two key heuristics. Can you name both of them?",
      "Reconciliation produces a list of operations, and a separate phase then applies them to the real DOM. Which phase is reconciliation, and which is the other?"
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "The `key` prop is the signal reconciliation uses to match a child in the new tree to its counterpart in the previous tree, preventing a full subtree remount on reorder.",
      language: "tsx",
      code: "function TodoList({ todos }: { todos: { id: number; text: string }[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        // Stable key \u2192 reconciliation matches by identity, not index.\n        // Remove it and a reorder remounts every <li>.\n        <li key={todo.id}>\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "Reconciliation is React's process of comparing the previous and current virtual DOM trees using two heuristic assumptions\u2014element type identity and list keys\u2014to compute the minimal set of DOM mutations in O(n) time.",
        isCorrect: true,
        explanation: "Correct. React's two assumptions (type mismatch replaces the subtree; same-level-only comparison) reduce a general O(n\u00b3) tree-diff to O(n), and keys let it match list items across renders instead of by position."
      },
      {
        id: "B",
        text: "React performs an exhaustive cross-level structural diff on every render, matching each node in the new tree against every node in the old tree to find the globally optimal set of DOM operations.",
        isCorrect: false,
        explanation: "The word \"diffing\" evokes an exhaustive comparison, but React explicitly avoids cross-level matching. A type mismatch at any level replaces the entire subtree without further comparison, and siblings are only compared at the same tree depth."
      },
      {
        id: "C",
        text: "Reconciliation works by diffing the virtual DOM directly against the live DOM tree, walking the document to determine which existing nodes to mutate, insert, or remove.",
        isCorrect: false,
        explanation: "It's easy to picture the virtual DOM as a shadow of the real DOM, but React compares two virtual trees (previous render output vs current render output). The real DOM is only touched in the commit phase, after the mutation list is computed."
      },
      {
        id: "D",
        text: "The algorithm uses a general minimum-edit-script tree-diffing approach with O(n\u00b3) worst-case complexity, guaranteeing the fewest possible DOM operations per render.",
        isCorrect: false,
        explanation: "A general minimum-edit-script diff is the theoretically optimal algorithm, and O(n\u00b3) tree-diffing is a real CS result. React deliberately sacrifices global optimality for linear time using its two heuristic assumptions; the mutations are good-enough, not provably minimal."
      }
    ],
    correctAnswer: "A",
    explanation: "Reconciliation is the phase of React's rendering pipeline where it decides what changed between two renders. After a component re-renders and produces a new virtual DOM tree, React compares it against the tree from the previous render to compute a minimal list of mutations (inserts, removes, attribute updates) that are applied to the real DOM in the commit phase.\n\nThe comparison is not a general tree-diff (the classic minimum-edit-script problem is O(n\u00b3)). React makes two assumptions to keep the walk O(n): (1) two elements of different types produce different subtrees, so a type mismatch replaces the whole subtree without further comparison; (2) two elements of the same type at different tree levels are unrelated, so React only compares siblings at the same level. For lists, the `key` prop tells React which items are the same across renders, enabling it to detect moves, additions, and removals without re-creating every child.\n\nIn practice this means stable keys on list items prevent unnecessary unmount/remount (and the loss of local state or focus), while a missing or duplicated key forces React to fall back to index-based matching, which can cause state to stick to the wrong row. Interviewers often probe this edge case: what happens when you remove the first item from a keyed list versus an unkeyed one, and why an `<input>` inside a reordered row loses focus or shows stale text without a stable key.",
    interviewLine: "Reconciliation compares two virtual trees using two assumptions\u2014type identity and same-level-only comparison\u2014to stay O(n) instead of O(n\u00b3). Keys are the mechanism that lets React match list items across renders so it can move DOM nodes rather than tear them down and rebuild.",
    misconception: "Treating \"diffing\" as an exhaustive structural comparison (either against the real DOM or across all tree levels) rather than a same-level, type-gated walk guided by keys.",
    hints: [
      "Think about what React compares against what. One side is not the real DOM.",
      "The algorithm avoids a general tree-diff by making two specific assumptions about element types and tree levels. What are they?",
      "For lists, one prop lets React match items across renders instead of matching by array position. What breaks if you omit it from a reorderable list?"
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "Notice how a stable `key` lets React move the existing `<li>` nodes to their new positions, preserving each item's identity, while index-based matching would patch each slot in place and detach the input from the item the user was editing.",
      language: "tsx",
      code: "function TodoList({ todos }: { todos: Todo[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <li key={todo.id} className={todo.done ? \"done\" : \"\"}>\n          <input defaultValue={todo.text} />\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Reorder: [A, B, C] \u2192 [C, A, B]\n// With keys: React moves the existing <li> nodes to their\n//   new positions; each <input> stays with its item.\n// Without keys (index-based): React patches each <li> in\n//   place, so the <input> that had focus now shows a\n//   different item's text \u2014 identity was tied to array\n//   position, not the item."
    }
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
        explanation: "The belief that keys control visual styling is a misconception. CSS properties like `list-style` and `list-style-type` handle bullet point formatting, while keys manage component identity for reconciliation."
      },
      {
        id: "B",
        text: "Keys are required only for server-side database indexing.",
        isCorrect: false,
        explanation: "This reflects confusion between React's client-side reconciliation needs and backend data models. Keys are essential in JSX for client-side Virtual DOM diffing, not for database operations."
      },
      {
        id: "C",
        text: "Keys give list children stable identities across renders, allowing React to match items during reorders, insertions, or deletions to preserve component state and avoid DOM thrashing.",
        isCorrect: true,
        explanation: "Correct. Keys provide stable identity for reconciliation, enabling React to efficiently determine which elements have changed, moved, or been added/removed while preserving component state."
      },
      {
        id: "D",
        text: "Keys must be regenerated as random `Math.random()` numbers on every render.",
        isCorrect: false,
        explanation: "This is a common trap that misunderstands React's reconciliation algorithm. Using random keys causes all DOM nodes to be destroyed and re-created on every render, negating the performance benefits of keys."
      }
    ],
    correctAnswer: "C",
    explanation: "Keys enable React's reconciliation algorithm to efficiently track which list items have changed, been added, or removed. When a list re-renders, React uses keys to match previous and new elements, ensuring that component state is preserved and DOM nodes are reused where possible. Without stable keys, React falls back to index-based matching, causing incorrect state assignment during reordering and unnecessary re-creation of DOM elements.\n\nIn real code, this directly impacts performance and correctness. For example, if you reorder a list of user components with numeric indices as keys, the component state may be incorrectly moved to the wrong element. This can lead to bugs where input fields lose their values or animations behave unexpectedly.\n\nA subtle edge case involves using non-unique keys. If multiple items in a list share the same key, React might incorrectly optimize and reuse the wrong DOM nodes, leading to hard-to-debug UI inconsistencies. Keys must be unique among siblings but do not need to be globally unique.",
    interviewLine: "In React's reconciliation process, keys provide stable identities that allow efficient diffing between old and new lists, preventing incorrect state assignment and unnecessary DOM thrashing during reorders or updates.",
    misconception: "Confusing keys with CSS styling properties or assuming keys are only relevant for server-side operations rather than client-side reconciliation.",
    hints: [
      "Think about what happens to component state when you reorder a list with indices as keys versus stable IDs.",
      "Consider how React tracks changes in lists and what would happen if all elements had the same key value.",
      "Reflect on how keys are used in reconciliation vs. how they're used in CSS styling or database indexing."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice how using index as key causes incorrect state preservation during reordering",
      language: "tsx",
      code: "function TodoList() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: 'Learn React' },\n    { id: 2, text: 'Build app' }\n  ]);\n\n  const moveFirstToLast = () => {\n    setTodos(prev => [\n      prev[1], // 'Build app'\n      prev[0]  // 'Learn React'\n    ]);\n  };\n\n  return (\n    <div>\n      {todos.map((todo, index) => (\n        <input key={index} value={todo.text} />\n      ))}\n      <button onClick={moveFirstToLast}>Move First to Last</button>\n    </div>\n  );\n}"
    }
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
