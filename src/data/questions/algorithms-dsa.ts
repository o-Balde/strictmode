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
        text: "Portals re-parent the component in the React fiber tree, so it loses access to Context providers that were above its original position.",
        isCorrect: false,
        explanation: "Tempting because a different DOM location feels like a different tree, but `createPortal` only changes where the DOM nodes are committed. The component's fiber node stays at the same spot in the parent's child list, so every Context value above it remains reachable."
      },
      {
        id: "B",
        text: "Portals create a separate React root, so the portal content re-renders on its own schedule independent of the parent component.",
        isCorrect: false,
        explanation: "People associate \"different DOM container\" with \"different reconciler root,\" but `createPortal` does not call `createRoot` or start a new reconciler. The portal child re-renders in the same commit phase as its React parent, exactly like any other child."
      },
      {
        id: "C",
        text: "Portals can only target a direct child of `document.body`; passing any other DOM node throws a runtime error.",
        isCorrect: false,
        explanation: "The restriction feels plausible because most examples target `body`, but the second argument accepts any `Element` or `DocumentFragment`. In practice you often use a dedicated `<div id=\"modal-root\">` or even a section header, and React simply appends the rendered nodes there."
      },
      {
        id: "D",
        text: "`ReactDOM.createPortal(child, domNode)` commits the child's DOM output into a different container while the component stays in its original React tree, preserving Context, hooks, and event bubbling through the parent.",
        isCorrect: true,
        explanation: "Correct. The portal changes only the DOM commit target. The component retains its position in the fiber tree, so Context, state, and event propagation all behave as if the element were rendered in place."
      }
    ],
    correctAnswer: "D",
    explanation: "ReactDOM.createPortal(child, container) tells the React renderer to commit the child's DOM output into `container`, a node that lives outside the parent's DOM subtree. Crucially, the component itself stays in its original position in the React fiber tree: it keeps its hooks, state, and access to every Context provider above it. Only the DOM placement changes.\n\nThis matters in production code because CSS layout is hierarchical. A modal rendered inside a card with `overflow: hidden` or a `position: relative` ancestor gets clipped or trapped in a low stacking context. A portal lets you drop the rendered markup into `document.body` (or a dedicated `<div id=\"modal-root\">`) so it sits at the top of the stacking order while the component still receives props and context as if it were a normal child.\n\nThe nuance interviewers probe: event bubbling follows the React tree, not the DOM tree. A click inside a portal-targeted modal bubbles up to the modal's React parent (the component that called `createPortal`), not to the DOM parent of the target node. That is why a `onClick` handler on the wrapping component still fires even though the DOM elements are siblings of the target container, not descendants.",
    interviewLine: "A portal only changes the DOM commit target; the component's fiber node stays in the same parent's child list, so Context flows normally and events bubble through the React tree rather than the DOM tree. That is exactly what lets a modal escape an `overflow: hidden` ancestor without losing access to its provider.",
    misconception: "Because the rendered markup appears in a different part of the DOM, the component is treated as if it moved to a new React root or lost its ancestry, so Context and event handlers stop working.",
    hints: [
      "Think about what `createPortal` actually changes: the DOM node where output is committed, versus the component's position in the fiber tree.",
      "Ask yourself whether Context providers above the calling component can still reach a portal child, and whether a `click` event inside the portal bubbles to the React parent or the DOM parent of the target node.",
      "The key invariant is that only the DOM placement changes. Everything that lives in the React tree\u2014hooks, state, Context, event handlers\u2014stays put."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice that `Tooltip` is declared inside `Button`'s component tree, yet its DOM output lands in `#tooltip-layer`; the `onClick` on `Button` still fires because bubbling follows the React tree.",
      language: "tsx",
      code: "import { createPortal } from \"react-dom\";\n\nfunction Tooltip({ text }: { text: string }) {\n  return (\n    <div className=\"tooltip\" role=\"tooltip\">\n      {text}\n    </div>\n  );\n}\n\nfunction Button({ label }: { label: string }) {\n  const layer = document.getElementById(\"tooltip-layer\");\n  if (!layer) return null;\n\n  return (\n    <button onClick={() => console.log(\"button clicked\")}>\n      {label}\n      {createPortal(<Tooltip text={label} />, layer)}\n    </button>\n  );\n}\n\n// index.html must include:\n// <div id=\"tooltip-layer\"></div>"
    }
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
        text: "React performs a full O(n^3) pairwise tree comparison on every render to guarantee the mathematically minimal set of DOM mutations.",
        isCorrect: false,
        explanation: "This is tempting because a 'perfect' diff would indeed compare every node to every other node, but React deliberately avoids that cost. Its type-and-key heuristics reduce the work to roughly O(n), trading a tiny number of suboptimal updates (e.g., replacing a subtree instead of patching it) for a large speed win."
      },
      {
        id: "B",
        text: "The virtual DOM layer writes mutations directly to the browser's compositor thread, skipping style recalculation and layout entirely.",
        isCorrect: false,
        explanation: "This sounds like a clever optimisation, but React still calls real DOM APIs (appendChild, setAttribute, etc.) through ReactDOM. The browser's normal style \u2192 layout \u2192 paint pipeline still runs after the commit; React only reduces how many DOM nodes are touched, not which phases the browser must execute."
      },
      {
        id: "C",
        text: "Because the diff happens in JavaScript memory, React avoids the browser's garbage collector and never causes frame drops from object allocation.",
        isCorrect: false,
        explanation: "Every render allocates a tree of plain element objects on the JS heap, and the V8 garbage collector still reclaims them on its normal cycle. Under heavy re-render loads, GC pauses can still contribute to jank; the virtual DOM reduces DOM work, not JS allocation cost."
      },
      {
        id: "D",
        text: "On state change, React builds a new tree of element objects, diffs it against the previous tree using type-and-key heuristics to stay near O(n), and commits the smallest possible batch of real-DOM mutations.",
        isCorrect: true,
        explanation: "Correct. React's reconciliation relies on structural assumptions (same type \u2192 update, different type \u2192 replace, keys \u2192 list identity) to keep diffing linear, then batches the resulting DOM writes so the browser's style/layout/paint pipeline runs once per commit."
      }
    ],
    correctAnswer: "D",
    explanation: "When state or props change, React's render phase produces a fresh tree of React Elements \u2014 plain JavaScript objects describing the UI. During reconciliation, React compares this new tree against the previous one using three heuristics: elements of different types at the same position are unmounted and rebuilt; elements of the same type get their props diffed and updated in place; and child lists are matched by their key prop so items can be reordered or removed without full re-creation.\n\nThese assumptions let React skip the O(n^3) all-pairs comparison a na\u00efve tree diff would require, landing at roughly O(n) where n is the number of nodes. The commit phase then applies only the minimal set of DOM mutations (setAttribute, insertBefore, textContent changes) in a single batch, so the browser's style recalculation, layout, and paint happen once instead of once per mutation.\n\nThe trade-off is real: every render allocates new element objects that the garbage collector must eventually reclaim, and the diff itself has a CPU cost. In highly dynamic UIs \u2014 a 10,000-row virtualized table where most rows change every frame \u2014 a framework that mutates the DOM imperatively can outperform React's diff-and-commit cycle.\n\nAn edge case interviewers probe: using the array index as a key. If you reorder a list, index keys tell React that the item at position 0 changed to the item at position 1 rather than that the same item moved, so React updates props in place instead of moving the DOM node, which can leave stale internal state in child components.",
    interviewLine: "React makes three structural assumptions \u2014 same type means update in place, different type means replace, and keys identify list identity \u2014 which keeps reconciliation near linear time instead of the cubic cost of a full tree diff, so the commit phase touches only the DOM nodes that actually changed.",
    misconception: "React exhaustively compares every node in the new tree to every node in the old tree to find the absolute minimum number of DOM writes, so the only cost after rendering is the DOM mutations themselves.",
    hints: [
      "Think about what React produces during the render phase before anything touches the real DOM. What is that intermediate structure, and what is it made of?",
      "React avoids comparing every node to every other node. What three structural assumptions let it skip the O(n^3) work and stay near O(n)?",
      "After the diff is done, how many times does the browser's layout engine run for a single state update? What does that tell you about how mutations are applied?"
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Using a stable `todo.id` as the key lets React match items across renders by identity, so reordering moves DOM nodes instead of resetting their internal state.",
      language: "tsx",
      code: "function TodoList({ todos }: { todos: Todo[] }) {\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <li key={todo.id}>\n          <input type=\"checkbox\" checked={todo.done} />\n          <span>{todo.label}</span>\n          <button onClick={() => toggle(todo.id)}>\u2715</button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "The virtual-DOM data structure that replaced the old React element tree, storing component instances and props in a flat array for faster diffing.",
        isCorrect: false,
        explanation: "Tempting because people conflate Fiber with the virtual DOM, but React elements (the vDOM) still exist unchanged. Fiber is the *reconciliation algorithm* that walks and diffs those elements, not the elements themselves."
      },
      {
        id: "B",
        text: "A Web Worker\u2013based concurrent rendering engine that offloads component updates to background threads to avoid blocking the main thread.",
        isCorrect: false,
        explanation: "The word \"concurrent\" in React's branding makes this feel right, but React 18/19 concurrent features use cooperative scheduling *on* the main thread. Fiber never spawns Workers; it simply yields between small units of work."
      },
      {
        id: "C",
        text: "React's internal reconciliation architecture that represents the component tree as a linked list of fiber nodes, enabling React to pause, resume, and prioritize rendering work within a single thread.",
        isCorrect: true,
        explanation: "Correct. Fiber replaced the old recursive Stack Reconciler with a linked-list structure (child/sibling/return pointers) so the work loop can be interrupted, resumed, and interleaved with higher-priority updates\u2014all without leaving the main thread."
      },
      {
        id: "D",
        text: "The separate `scheduler` package that manages the requestAnimationFrame loop and assigns time-slicing priorities to React updates.",
        isCorrect: false,
        explanation: "The `scheduler` package is a small utility library that Fiber's work loop *uses* to schedule chunks, but it is not Fiber itself. Fiber is the reconciliation algorithm inside React core; the scheduler is just its timing helper."
      }
    ],
    correctAnswer: "C",
    explanation: "React Fiber is the rewrite of React's core reconciliation algorithm, shipped in React 16. The old \"Stack Reconciler\" walked the component tree with a single recursive call that ran to completion on the main thread\u2014if the tree was deep, the browser could not paint or respond to input until it finished. Fiber replaces that recursion with a linked list of fiber nodes, each carrying `child`, `sibling`, and `return` (parent) pointers, so the work loop can yield control back to the browser between small units of work.\n\nThis is the mechanism behind every concurrent feature: `useTransition`, `useDeferredValue`, Suspense, and automatic batching all depend on Fiber's ability to pause non-urgent rendering, resume it later, and interleave urgent updates (keyboard input, pointer events) in between. The work stays single-threaded; React cooperatively yields via `MessageChannel` postMessage or `requestIdleCallback`, but each chunk is small enough that the main thread remains responsive.\n\nAn interviewer will often follow up with: \"If Fiber is a linked list, why do we still call it a component tree?\" The fiber structure *represents* the tree through its pointers but is stored flat for O(1) traversal and interruption. Each fiber also holds an `alternate` pointer that links the current and work-in-progress trees, which is how React diffs without cloning the entire tree on every update.",
    interviewLine: "Fiber is React's reconciliation engine rewritten as a linked list of work units with child, sibling, and return pointers, so the render loop can yield to the browser between chunks\u2014that's what makes useTransition, Suspense, and priority scheduling possible without ever leaving the main thread.",
    misconception: "Fiber is the virtual DOM itself or a separate Web Worker thread, rather than the reconciliation *algorithm* that operates on the element tree cooperatively within the main thread.",
    hints: [
      "Think about what happens between React calling your component and the browser painting. What structure does React walk, and what changed in React 16 about how that walk works?",
      "The old reconciler was one recursive function that could not be interrupted. Fiber replaced that recursion with explicit pointers. What three pointers does each fiber node carry, and why does that matter for interruptibility?",
      "It is not the vDOM, not a Worker, and not the scheduler package. It is the algorithm that connects them, stored as a linked list so work can be paused, resumed, and re-prioritized."
    ],
    source: "100-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "useTransition relies on Fiber's interruptible work loop: the expensive list render is scheduled as low-priority work that can be paused mid-way if a keystroke arrives.",
      language: "tsx",
      code: "import { useTransition, useState } from \"react\";\n\nfunction FilteredList({ items }: { items: string[] }) {\n  const [filter, setFilter] = useState(\"\");\n  const [isPending, startTransition] = useTransition();\n\n  const visible = items.filter((i) => i.includes(filter));\n\n  return (\n    <div>\n      <input\n        value={filter}\n        onChange={(e) =>\n          startTransition(() => setFilter(e.target.value))\n        }\n        aria-busy={isPending}\n      />\n      <ul>\n        {visible.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
    }
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
        text: "`push` clears all cookies for the current origin; `replace` leaves cookies untouched.",
        isCorrect: false,
        explanation: "Tempting if you conflate history management with storage management, but History API methods never read or write cookies. They only mutate the in-memory session history stack."
      },
      {
        id: "B",
        text: "`push` appends a new entry to the session history stack (Back returns to the previous entry); `replace` overwrites the current entry in place (Back skips to the entry before it).",
        isCorrect: true,
        explanation: "Correct. `pushState` grows the stack by one; `replaceState` keeps the stack length constant by substituting the active entry, which is exactly why redirects and post-auth navigation use it."
      },
      {
        id: "C",
        text: "`replace` removes the current entry from the stack entirely, so the Back button has no effect at all.",
        isCorrect: false,
        explanation: "The word \"removes\" is the trap: `replaceState` does not delete the slot, it overwrites the data in it. The stack still has the same number of entries, and Back still works\u2014it just lands on the entry that was before the one you replaced."
      },
      {
        id: "D",
        text: "`push` is a client-side History API call; `replace` is a server-side redirect issued by the framework.",
        isCorrect: false,
        explanation: "Both are synchronous, client-side methods on the `window.history` object. A server-side redirect is an entirely different mechanism (HTTP 301/302) and has nothing to do with `replaceState`."
      }
    ],
    correctAnswer: "B",
    explanation: "The browser History API exposes two methods that mutate the session history stack without triggering a page load. `history.pushState(state, title, url)` appends a new entry to the stack, so the user can press Back to return to the previous URL. `history.replaceState(state, title, url)` overwrites the current entry in place; the stack length stays the same, and Back now jumps to whatever entry sat before the one you replaced.\n\nIn a single-page app this distinction controls back-button UX. A typical login flow calls `replaceState` after authentication so the user pressing Back lands on the page before the login form, not on a stale, unauthenticated URL. A wizard that advances through steps calls `pushState` for each step so Back walks through them in reverse.\n\nTwo nuances interviewers probe: first, neither method fires a `popstate` event by itself\u2014that event only dispatches when the user actually navigates via Back, Forward, or a programmatic `history.go` call. Second, both methods require the target URL to be same-origin; passing a cross-origin URL throws a `SecurityError` rather than silently failing.",
    interviewLine: "`pushState` grows the session history stack so the user can step back through each URL, while `replaceState` swaps the current entry in place without changing the stack length\u2014that's why we use it after a login redirect so Back doesn't return to an unauthenticated form.",
    misconception: "Candidates often treat `replaceState` as \"deleting\" the current history entry rather than overwriting it, which leads them to believe Back stops working after a replace\u2014when in fact Back still functions, it just targets the previous entry in the unchanged-length stack.",
    hints: [
      "Think about what happens to `history.length` after each call: one method increments it, the other does not.",
      "Neither method causes a page load. Ask yourself which one you'd pick when you want the user's Back button to skip over the page they just left.",
      "Both are synchronous, same-origin-only methods on `window.history`. The difference is purely whether the new URL is added as a new slot or written into the existing slot."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that `replaceState` keeps `history.length` unchanged while `pushState` increments it, and neither triggers a navigation or a `popstate` event on its own.",
      language: "typescript",
      code: "function advanceStep(step: number) {\n  // Adds a new entry \u2013 Back walks through steps in reverse\n  window.history.pushState({ step }, \"\", `/checkout/${step}`);\n}\n\nfunction finishOrder(orderId: string) {\n  // Overwrites the current entry \u2013 Back skips to the page\n  // before checkout, not to a stale /checkout/3 URL\n  window.history.replaceState({ orderId }, \"\", `/orders/${orderId}`);\n  // history.length is the same as before the call\n}"
    }
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
        text: "React diffs the new element tree against the browser's live DOM to figure out which nodes changed, then patches only those nodes.",
        isCorrect: false,
        explanation: "This sounds reasonable because both trees represent the same UI, but React reconciles the new element tree against the previous element tree (stored in the fiber), never against the live DOM. The real DOM is only touched during the commit phase, after the diff is already computed."
      },
      {
        id: "B",
        text: "React queues each setState call, re-renders the component once per call, and flushes a separate batch of DOM mutations after every individual update.",
        isCorrect: false,
        explanation: "This is tempting if you think of setState as a fire-and-forget mutation, but automatic batching coalesces all updates in the same task into a single re-render and a single commit. The component renders once with the final state, not once per call."
      },
      {
        id: "C",
        text: "React batches state updates, re-renders to build a new element tree, reconciles it against the previous tree for the minimal diff, and commits those DOM mutations in one pass.",
        isCorrect: true,
        explanation: "Correct. This captures the full pipeline: batching collapses multiple updates into one render, reconciliation computes the minimal change set by comparing against the prior fiber tree, and the commit phase applies those mutations to the real DOM synchronously."
      },
      {
        id: "D",
        text: "React schedules all DOM mutations on the next requestAnimationFrame tick, using the Virtual DOM as a frame-level buffer between the render and the browser's paint.",
        isCorrect: false,
        explanation: "This confuses React's commit phase with the browser's own rendering pipeline. React applies DOM mutations synchronously within the current task; it does not defer them to rAF. The browser handles style, layout, paint, and compositing after JavaScript yields, but that is the browser's job, not React's."
      }
    ],
    correctAnswer: "C",
    explanation: "The Virtual DOM (more precisely, React's element tree) is a lightweight in-memory representation of the UI, built from plain objects during the render phase. When state changes, React re-renders the affected components, producing a new tree of element objects. It then reconciles this new tree against the previous one stored in the fiber structure, computing the minimal set of changes. In the commit phase, those changes are applied as real DOM mutations\u2014attribute updates, node insertions, removals\u2014in a single synchronous pass.\n\nWhy it matters in real code: without this mechanism, every state change would force the browser to reflow and repaint large subtrees. Automatic batching (the default since React 18's createRoot) means multiple setState calls in the same event, promise, or timeout collapse into one render and one commit, eliminating redundant work.\n\nEdge case interviewers probe: reconciliation is not a full tree diff. React uses keys on list items to match elements across renders; without stable keys it falls back to index-based matching, which can cause unnecessary re-renders or state loss when items are reordered. Also, the commit phase is synchronous and uninterruptible\u2014concurrent features can pause the render phase but never the commit.",
    interviewLine: "React batches state updates, re-renders to build a new element tree, reconciles it against the previous fiber tree to compute the minimal diff, and then commits those mutations to the real DOM in one synchronous pass\u2014so the browser only ever sees the final result, never intermediate states.",
    misconception: "React diffs its new element tree against the browser's live DOM, or that each setState call triggers its own independent re-render and separate DOM flush.",
    hints: [
      "Think of the full pipeline: what happens between a setState call and the browser actually painting a new pixel? Name each phase.",
      "React doesn't compare against the live DOM. What does it compare the new tree against, and in which phase does the real DOM finally get touched?",
      "Batching means multiple updates become one render. The render produces element objects; reconciliation computes a diff against the previous tree; the commit phase is where the browser's DOM is mutated\u2014all in a single synchronous pass."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Three setState calls in one handler produce a single re-render, not three\u2014batching in action.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const [label, setLabel] = useState(\"idle\");\n\n  function handleClick() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n    setLabel(\"updated\");\n    // All three updates are batched: the component\n    // renders ONCE with count = 2, label = \"updated\".\n  }\n\n  return (\n    <button onClick={handleClick}>\n      {label}: {count}\n    </button>\n  );\n}\n\nexport default Counter;"
    }
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
        text: "Side effects only exist in class components via lifecycle methods and cannot be expressed in functional components.",
        isCorrect: false,
        explanation: "Tempting if you learned React through class lifecycles, but `useEffect` (and `useLayoutEffect`) were introduced precisely so functional components can run and clean up side effects with the same guarantees as `componentDidMount` / `componentWillUnmount`."
      },
      {
        id: "B",
        text: "Side effects include network requests, subscriptions, DOM mutations, and timers; you manage cleanup by returning a cleanup function from `useEffect` so resources are released before the next run or on unmount.",
        isCorrect: true,
        explanation: "Correct. `useEffect` runs after paint, and the function you return is invoked by React both before the next effect execution (dependency change) and on unmount, guaranteeing that subscriptions, timers, and listeners are torn down rather than leaking."
      },
      {
        id: "C",
        text: "The browser's garbage collector automatically calls your cleanup logic when a component unmounts, so an explicit cleanup function is optional.",
        isCorrect: false,
        explanation: "A common belief, but GC reclaims unreachable memory; it does not invoke your user-defined teardown. A `setInterval` callback, an open `WebSocket`, or a `window` event listener each hold a live reference that keeps the closure reachable, so the connection or timer persists until you explicitly close, clear, or remove it."
      },
      {
        id: "D",
        text: "Side effects should be called directly in the component's render body so they execute once per render and stay in sync with props.",
        isCorrect: false,
        explanation: "Calling `fetch`, `setInterval`, or `addEventListener` in the render body means they fire on every render (twice under Strict Mode), you get no cleanup hook, and you cannot cancel the previous run\u2014leading to duplicate requests, stacked timers, and stale-closure bugs."
      }
    ],
    correctAnswer: "B",
    explanation: "In React, a side effect is any operation that reaches outside the component's render cycle: fetching data, subscribing to a WebSocket or event emitter, starting a `setInterval` timer, or directly mutating the DOM. Because React may call your render function multiple times, re-render, or unmount and remount the component, these operations must be isolated in `useEffect` so they run after the DOM is committed and can be torn down cleanly.\n\nThe cleanup mechanism works in two situations: before the next effect execution (when dependencies change) and when the component unmounts. You return a function from `useEffect`, and React calls it in both cases. A subscription should be closed in cleanup so you don't accumulate duplicate listeners, and a timer should be cleared so it doesn't keep firing after the component is gone.\n\nAn edge case interviewers probe: in React 18+ Strict Mode, effects are intentionally invoked twice in development (mount \u2192 cleanup \u2192 mount) to surface missing or incorrect cleanup logic. If your cleanup is correct the double-run is harmless; if it is absent you will see duplicate subscriptions or timers in the console, which is exactly the bug the pattern is designed to prevent.",
    interviewLine: "I isolate every external interaction\u2014subscriptions, timers, fetches\u2014inside `useEffect` and return a cleanup function that closes the socket, clears the interval, or aborts the request. React calls that cleanup before re-running the effect on a dependency change and again on unmount, so I never leak listeners or keep timers alive past the component's lifetime.",
    misconception: "Assuming the browser's garbage collector will close WebSockets, clear intervals, and detach event listeners once a component unmounts, making an explicit cleanup return unnecessary.",
    hints: [
      "Think about what happens if you call `setInterval` directly in the render body. What stops that timer when the component unmounts?",
      "React provides a hook that runs code after the DOM is committed, and that hook can return a function. What is that function called, and in how many distinct moments does React invoke it?",
      "The cleanup runs before the next effect fires (dependency change) and on unmount. The key detail is that you explicitly `return` it from the effect body\u2014React does not discover it for you."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice the `return () => ws.close()` inside the effect: React calls it before re-subscribing when `channelId` changes and again on unmount, so no stale socket is left open.",
      language: "tsx",
      code: "function LiveFeed({ channelId }: { channelId: string }) {\n  const [messages, setMessages] = useState<string[]>([]);\n\n  useEffect(() => {\n    const ws = new WebSocket(`wss://api.example.com/feed/${channelId}`);\n    ws.onmessage = (e) => setMessages((prev) => [...prev, e.data]);\n\n    return () => {\n      ws.close();\n    };\n  }, [channelId]);\n\n  return (\n    <ul>\n      {messages.map((m, i) => (\n        <li key={i}>{m}</li>\n      ))}\n    </ul>\n  );\n}"
    }
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
        text: "A zero-config CLI scaffold that bundled Webpack, Babel, and ESLint for single-page React apps; it was deprecated in 2021 and is now superseded by Vite, Next.js, and other meta-frameworks.",
        isCorrect: true,
        explanation: "Correct. CRA generated a hidden Webpack + Babel + ESLint setup so developers could skip build configuration entirely, and the React team archived the repo in 2021 as the ecosystem moved to Vite and meta-frameworks."
      },
      {
        id: "B",
        text: "A React component library shipping pre-built UI primitives (Button, Modal, Form); it was deprecated because React 19 removed the class-component API it relied on.",
        isCorrect: false,
        explanation: "This confuses a scaffolding tool with a UI kit. CRA never exported components, and React 19 still fully supports class components, so the stated deprecation reason is factually wrong on both counts."
      },
      {
        id: "C",
        text: "A production JavaScript bundler that replaced Webpack across the ecosystem; it was deprecated when Rollup became the default bundler mandated by the ES2024 specification.",
        isCorrect: false,
        explanation: "CRA configured Webpack but was not itself a bundler, and ES2024 is a language specification that does not mandate any bundler. Rollup gained popularity but was never a spec-level requirement."
      },
      {
        id: "D",
        text: "A server-side rendering framework maintained by the React team; it was deprecated when Next.js was open-sourced in 2016 and absorbed its routing API.",
        isCorrect: false,
        explanation: "CRA produced purely client-side bundles with no SSR capability, and the timeline is inverted: CRA launched in 2017, after Next.js appeared. CRA also never implemented a routing API to be absorbed."
      }
    ],
    correctAnswer: "A",
    explanation: "Create React App was a CLI released by the React team in 2017 that scaffolded a single-page React application with zero configuration. Under the hood it wired together Webpack for bundling, Babel for transpiling JSX and modern JavaScript, ESLint for linting, and a dev server with hot module replacement. A developer ran `npx create-react-app my-app` and immediately had a working project with no visible build config.\n\nThe team archived the create-react-app repository in 2021, ending maintenance. The ecosystem shifted toward Vite (a fast dev server and build tool usable standalone or via `create-vite`) and meta-frameworks like Next.js (App Router, server components, file-based routing) and Remix (now folded into React Router v7). These alternatives expose the build pipeline, support server-side rendering, and let teams swap bundlers without fighting a hidden config layer.\n\nA nuance interviewers probe: CRA was a configuration generator, not a bundler. It produced a `webpack.config.js`, a Babel preset, and the right `package.json` scripts, then delegated all actual bundling to Webpack. Calling CRA \"a bundler\" or \"a framework\" misidentifies its role in the toolchain.",
    interviewLine: "CRA was really a config generator: it wrote out a Webpack config, a Babel preset, and the right npm scripts, then handed the actual bundling to Webpack. That indirection made upgrades painful and is exactly why the community moved to Vite and meta-frameworks where the pipeline is explicit.",
    misconception: "Treating CRA as a bundler or a framework rather than a configuration generator that delegated all build work to Webpack and Babel behind a `react-scripts` wrapper.",
    hints: [
      "Think about what `react-scripts start` actually does under the hood versus what a bundler does directly.",
      "CRA never rendered a single component or handled a server request\u2014its job ended once the project files were generated.",
      "Consider what changed in the React tooling landscape around 2020\u20132021 that made a hidden-Webpack wrapper less attractive."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Every CRA project pinned `react-scripts` as a dependency; the `eject` script exposed the hidden Webpack config but permanently locked you out of future `react-scripts` upgrades.",
      language: "json",
      code: "{\n  \"name\": \"todo-app\",\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test\",\n    \"eject\": \"react-scripts eject\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\",\n    \"react-scripts\": \"5.0.1\"\n  }\n}"
    }
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
        text: "`componentDidUpdate()` and `shouldComponentUpdate()`.",
        isCorrect: false,
        explanation: "These are stable, fully supported class-component methods. `componentDidUpdate` runs after a commit and `shouldComponentUpdate` is an opt-in bail-out for skipping re-renders; neither made unsafe assumptions about render timing, so they were never deprecated."
      },
      {
        id: "B",
        text: "`componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate`.",
        isCorrect: true,
        explanation: "Correct. These three ran synchronously before a render and assumed it would complete exactly once. Concurrent rendering broke that assumption, so React 16.3 renamed them with the `UNSAFE_` prefix and pointed developers toward `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`, and Hooks."
      },
      {
        id: "C",
        text: "`componentWillUnmount()` and `componentDidMount()`.",
        isCorrect: false,
        explanation: "The \"Will\" in `componentWillUnmount` is tempting, but it runs during the commit phase after the DOM has already been removed\u2014it never assumed a render was about to happen. `componentDidMount` runs after the first commit. Both remain fully supported in React 19."
      },
      {
        id: "D",
        text: "`getDerivedStateFromProps()` and `getSnapshotBeforeUpdate()`.",
        isCorrect: false,
        explanation: "These are the *replacement* methods introduced alongside the deprecation. A candidate who equates \"newer and less familiar\" with \"deprecated\" might pick them, but they are the recommended, stable way to derive state from props or read DOM before an update."
      }
    ],
    correctAnswer: "B",
    explanation: "The three `componentWill*` methods assumed rendering would complete synchronously and exactly once. `componentWillMount` ran before the first `render`, `componentWillReceiveProps` ran before a re-render triggered by new props, and `componentWillUpdate` ran before a re-render triggered by state or prop changes. With concurrent and async rendering (introduced in React 16, fully shipped in React 18), React can interrupt, pause, or restart a render, so a component can receive `componentWillMount` and then be discarded before it ever mounts, or receive `componentWillReceiveProps` multiple times for the same prop update.\n\nIn React 16.3 the three methods were renamed with an `UNSAFE_` prefix and the original unprefixed names were removed. The recommended replacements are `static getDerivedStateFromProps` for deriving state from props, `getSnapshotBeforeUpdate` for reading DOM values before a commit, and Hooks such as `useEffect` and `useReducer` for imperative side-effects and state logic.\n\nA nuance interviewers probe: these methods were not hard-removed from the runtime in React 19. The `UNSAFE_`-prefixed versions still execute if you call them, but React logs a warning and the team signals they may be removed in a future major release. They are deprecated by convention and warning, not by a compile-time error, which is why legacy codebases can still build.",
    interviewLine: "The three `componentWill*` methods assumed a synchronous, single-pass render. Once React introduced concurrent rendering, that assumption broke\u2014React could interrupt or restart a render, so a component might get `willMount` and then be discarded. That's why 16.3 renamed them with `UNSAFE_` and pointed us toward `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`, and Hooks.",
    misconception: "The 'Will' prefix in a lifecycle name means it is deprecated. In reality, `componentWillUnmount` contains 'Will' but is a stable, fully supported method, while the three deprecated ones all ran *before* a render and made unsafe timing assumptions under async rendering.",
    hints: [
      "Think about which lifecycle methods ran *before* a render rather than after it committed. Those are the ones whose timing assumptions break under async rendering.",
      "The deprecation targeted methods that made a promise about what was 'about to happen' next in the render pipeline. Which three used that 'about to' language?",
      "React 16.3 introduced an `UNSAFE_` prefix. The three affected methods all start with `componentWill`\u2014but not `componentWillUnmount`, which runs during commit, not before render."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice how the `UNSAFE_componentWillReceiveProps` logic maps to a `useEffect` keyed on `step`, and the state update becomes a plain `useState` setter\u2014no assumption that a render is 'about to' happen.",
      language: "tsx",
      code: "import { useState, useEffect } from \"react\";\n\n// Legacy (deprecated) \u2013 still compiles but warns\nclass Counter extends React.Component<\n  { step: number },\n  { count: number }\n> {\n  state = { count: 0 };\n  UNSAFE_componentWillReceiveProps(next: { step: number }) {\n    if (next.step !== this.props.step) {\n      this.setState({ count: 0 });\n    }\n  }\n  render() {\n    return (\n      <button onClick={() => this.setState({ count: this.state.count + 1 })}>\n        {this.state.count}\n      </button>\n    );\n  }\n}\n\n// Modern replacement \u2013 no unsafe timing assumptions\nfunction Counter({ step }: { step: number }) {\n  const [count, setCount] = useState(0);\n  useEffect(() => { setCount(0); }, [step]);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}"
    }
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
        text: "Use object spread in React web (`style={{ ...base, ...override }}`) or array syntax in React Native (`style={[base, override]}`).",
        isCorrect: true,
        explanation: "Correct. React web's `style` prop is a single `CSSProperties` object, so spreading merges multiple objects immutably; React Native's `style` prop natively accepts an array and the native engine merges it left-to-right."
      },
      {
        id: "B",
        text: "Use array syntax in both React web and React Native: `style={[styles.base, styles.active]}`.",
        isCorrect: false,
        explanation: "This is the most common cross-platform mistake. Array syntax works in React Native, but React web's `style` prop expects a plain object; passing an array is silently ignored (or produces a console warning) and the element renders unstyled."
      },
      {
        id: "C",
        text: "Mutate the first object in place with `Object.assign(styles.base, styles.active)` and pass the result.",
        isCorrect: false,
        explanation: "Object.assign does produce the merged output, but it mutates the first argument. If `styles.base` is a shared module-level constant, every call permanently bakes the variant into it, corrupting every other component that reuses that base style."
      },
      {
        id: "D",
        text: "Pass both as separate props on the same element: `<button style={styles.base} style={styles.active}>`.",
        isCorrect: false,
        explanation: "JSX does not allow duplicate attribute names on the same element. The compiler keeps only the last `style` prop, so `styles.base` is silently discarded and the element renders with only `styles.active`."
      }
    ],
    correctAnswer: "A",
    explanation: "In React for the web, the `style` prop expects a single `CSSProperties` object. When you have a base style and a variant or conditional override, you merge them with the object spread operator: `style={{ ...base, ...override }}`. Later keys win, so the override replaces any conflicting property from the base, and no new intermediate objects are created beyond the one literal.\n\nIn React Native the `style` prop has a different type: `StyleProp<ViewStyle>`, which accepts an array of style objects. The native style engine merges the array left-to-right, so `style={[base, override]}` produces the same visual result as spreading, but without allocating a merged object on every render in the JS bridge.\n\nThis matters in real code because you will almost always layer a component's base styles with conditional or variant styles. Spreading is immutable and composable; mutating a shared source object with `Object.assign` or direct assignment introduces shared-state bugs the moment two components reference the same style constant.\n\nOne nuance interviewers probe: spread order. Writing `{ ...override, ...base }` silently reverts your override back to the base value. And a `null` value in a spread (e.g. `...(active ? variant : null)`) is a safe no-op, while an empty object `{}` would not reset any property\u2014so the two look similar but behave differently when a key is intentionally set to `null` to clear an inherited value.",
    interviewLine: "In React web I spread the objects into one literal so the prop stays a single CSSProperties object; in React Native I pass an array because the native style engine merges it for free. Either way later keys override earlier ones, so I always put the base first and the variant last.",
    misconception: "Treating the `style` prop as platform-agnostic: the same array-of-objects syntax that works in React Native is silently dropped by React web, where `style` must be a single merged object.",
    hints: [
      "Think about what type the `style` prop actually accepts in React for the web versus React Native. They are different.",
      "In React web you need a single object. Which operator lets you take two objects and produce a third without mutating either?",
      "Spread order matters: the object that appears later in the spread wins for any conflicting key. Put the base first, the override second."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "Notice how the conditional spread with `null` safely no-ops when `active` is false, and how the merged object is created fresh each render without mutating the shared constants.",
      language: "tsx",
      code: "const base: React.CSSProperties = { padding: 12, borderRadius: 8 };\nconst active: React.CSSProperties = { padding: 16, background: '#f0f0f0' };\n\nfunction Card({ isActive }: { isActive: boolean }) {\n  const style: React.CSSProperties = {\n    ...base,\n    ...(isActive ? active : null),\n  };\n  return <div style={style}>Card content</div>;\n}"
    }
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
        text: "React's unmount lifecycle automatically clears any pending `setInterval` callbacks, so returning a cleanup function is redundant.",
        isCorrect: false,
        explanation: "Tempting if you assume React tracks every side-effect for you, but React only cleans up what you explicitly return from `useEffect` (or `componentWillUnmount`). A bare `setInterval` handle is invisible to the reconciler and will keep firing after unmount."
      },
      {
        id: "B",
        text: "Spin a synchronous `while (true)` loop in the render body that calls `setState` to force continuous re-renders.",
        isCorrect: false,
        explanation: "This conflates \"I want the component to keep updating\" with \"I'll block the thread until it does.\" A synchronous infinite loop in the render path freezes the main thread, prevents paint, and in practice crashes the tab before React can ever schedule a re-render."
      },
      {
        id: "C",
        text: "Schedule `window.location.reload()` on a `setInterval` so the browser fetches fresh data every second.",
        isCorrect: false,
        explanation: "This treats \"I need updated data\" as \"I need a full page teardown.\" A reload discards all component state, re-fetches every asset, flashes the UI, and resets scroll position\u2014none of which a one-second tick requires."
      },
      {
        id: "D",
        text: "Create a `setInterval` in `useEffect` that calls `setTime(Date.now())` every 1000 ms, and return a cleanup that calls `clearInterval` on unmount.",
        isCorrect: true,
        explanation: "Correct. The setup and teardown live in the same `useEffect`, so the timer is created after mount and destroyed on unmount or dependency change. The returned cleanup also makes the pattern safe under Strict Mode's double-invocation in development."
      }
    ],
    correctAnswer: "D",
    explanation: "The pattern: start the interval inside `useEffect` after the component has mounted, capture the ID that `setInterval` returns, and return a cleanup function that calls `clearInterval`. Because `useEffect` runs its setup after paint and runs the returned cleanup on unmount (or before a re-run when dependencies change), the timer's lifetime is scoped to the component's lifetime.\n\nIn production code this matters for two reasons. First, an uncleared interval keeps invoking `setState` on a component that is no longer in the tree; the callback still holds a closure over that component's scope, so the old closure and its references are never garbage-collected. Second, in development React 18 and 19 Strict Mode deliberately mounts, unmounts, and remounts every component. Without the cleanup return you end up with two live intervals both calling `setTime`, doubling the update rate and making timing bugs hard to reproduce.\n\nA nuance interviewers probe: the interval callback closes over the variables that existed when the effect ran. If the handler needs the latest prop or state value, you either add that value to the dependency array (tearing down and recreating the interval on every change) or read it through a ref / functional `setState` to avoid a stale closure.",
    interviewLine: "I start the interval inside `useEffect` and return a cleanup that calls `clearInterval`, so the timer's lifetime is scoped to the component's mount. In Strict Mode the double mount\u2013unmount\u2013mount cycle in dev actually validates that the cleanup path runs correctly.",
    misconception: "Timers started inside a component are automatically cleaned up when the component unmounts, so an explicit `clearInterval` is unnecessary.",
    hints: [
      "Think about where in the component lifecycle you can safely start a side-effect without blocking the render pass.",
      "The setup and the teardown should live in the same place. What does `useEffect` let you return?",
      "Store the numeric ID that `setInterval` returns, then pass it to `clearInterval` inside the function you return from the effect."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals",
    example: {
      caption: "Notice how the cleanup return is the only thing that ties the timer's lifetime to the component's lifetime.",
      language: "tsx",
      code: "function useClock() {\n  const [now, setNow] = useState(() => Date.now());\n\n  useEffect(() => {\n    const id = setInterval(() => setNow(Date.now()), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return now;\n}\n\nfunction Header() {\n  const now = useClock();\n  return <time>{new Date(now).toLocaleTimeString()}</time>;\n}"
    }
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
        text: "Use kebab-case CSS names as object keys, e.g. `{'webkit-transform': 'rotate(90deg)'}`.",
        isCorrect: false,
        explanation: "This reads like valid CSS, but the `style` prop is a JS object whose keys map to DOM `style` properties. A key of `'webkit-transform'` would call `element.style['webkit-transform']`, which is not a recognized property; you need the camelCase form `WebkitTransform`."
      },
      {
        id: "B",
        text: "React's style prop auto-applies all vendor prefixes, so writing just `transform: 'rotate(90deg)'` targets every engine.",
        isCorrect: false,
        explanation: "This sounds right because Autoprefixer handles prefixes in CSS files, but Autoprefixer is a PostCSS plugin that runs at build time on `.css` sources. React's inline `style` object is a runtime JS value assigned directly to `element.style`; no prefixing pass ever touches it."
      },
      {
        id: "C",
        text: "Pass a `vendorPrefixes` array prop on the element, e.g. `<div vendorPrefixes={['webkit','ms']} style={{ transform: '\u2026' }} />`.",
        isCorrect: false,
        explanation: "No such prop exists in React's API. The element receives standard HTML attributes plus `style` as an object; there is no declarative list that tells React which prefixes to expand at render time."
      },
      {
        id: "D",
        text: "Capitalize vendor prefixes in style objects (`WebkitTransform`, `MozTransform`), keeping `ms` lowercase (`msTransform`).",
        isCorrect: true,
        explanation: "Correct. React assigns each key directly to `element.style[key]`, so the key must match the DOM property name exactly: `WebkitTransform`, `MozTransform`, `msTransform`. The `ms` prefix stays lowercase because it is not a proper noun in the JS/DOM convention."
      }
    ],
    correctAnswer: "D",
    explanation: "React's `style` prop expects a plain JavaScript object whose keys are assigned directly to the DOM `style` property at render time (`element.style[key] = value`). When a CSS property requires a vendor prefix, you include the prefixed variant as a separate key using the same camelCase rule: capitalize the vendor token (`Webkit`, `Moz`) and keep it lowercase only for Microsoft (`ms`). So `-webkit-transform` becomes `WebkitTransform` and `-ms-transform` becomes `msTransform`. React does not run Autoprefixer over inline style objects; it simply sets each key on the live DOM node.\n\nIn practice this matters when you still support older Safari or legacy Edge builds that read only the prefixed property. Because the `style` object is a runtime JavaScript value, no PostCSS or Autoprefixer pass ever sees it\u2014those tools only transform `.css` source files at build time. If you need many prefixed properties, a small helper or a CSS-in-JS library that emits real stylesheets is usually cleaner than hand-writing every prefixed key.\n\nA nuance interviewers probe: the `ms` prefix stays lowercase while `Webkit` and `Moz` are capitalized. This mirrors the DOM `CSSStyleDeclaration` property names, not an arbitrary React convention, so the same casing works if you ever fall back to `el.style.msTransform = '\u2026'` imperatively.",
    interviewLine: "Inline style objects in React are plain JS values assigned directly to `element.style` at render time, so I hand-write each prefixed variant in camelCase\u2014`WebkitTransform`, `MozTransform`, `msTransform`\u2014because Autoprefixer only processes CSS source files, not runtime objects.",
    misconception: "Assuming Autoprefixer or the browser will auto-prefix inline style objects the same way it handles `.css` files, so a single unprefixed property name is enough for all engines.",
    hints: [
      "Think about what React does with the `style` object at render time: it assigns each key to a DOM `style` property. There is no CSS parser or build step in between.",
      "The rule is the same camelCase conversion as any other CSS property, but the vendor token's capitalization matters. Check how `Webkit` differs from `ms` in the DOM API.",
      "Autoprefixer transforms `.css` files at build time. An inline `style={{ }}` object is a runtime JavaScript value\u2014no build tool ever sees it, so you must spell out each prefixed key yourself."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    example: {
      caption: "Notice that `WebkitAnimation` is a separate object key alongside the standard `animation`; both are set on the same DOM node at render time.",
      language: "tsx",
      code: "function Spinner() {\n  const style: React.CSSProperties = {\n    display: 'inline-block',\n    width: 24,\n    height: 24,\n    border: '3px solid #ccc',\n    borderTopColor: 'transparent',\n    borderRadius: '50%',\n    animation: 'spin 0.8s linear infinite',\n    // Older Safari (< 9) and legacy Edge read only the prefixed key:\n    WebkitAnimation: 'spin 0.8s linear infinite',\n  };\n  return <div style={style} aria-label=\"Loading\" />;\n}"
    }
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
        text: "Because `React.createElement` is only invoked during the initial mount, so the `new Component(props)` call inside it never fires again on subsequent renders.",
        isCorrect: false,
        explanation: "This conflates element creation with instance construction. `createElement` is called on every render (it is what JSX compiles to), but it merely returns a plain descriptor object `{ type, props, key }`; it never calls the constructor. The instance persists because the fiber node persists, not because `createElement` is skipped."
      },
      {
        id: "B",
        text: "React's reconciliation preserves the component instance across renders when the element type and position in the tree remain the same, so it calls `render()` again without re-invoking the constructor.",
        isCorrect: true,
        explanation: "Correct. Reconciliation matches the new element to the existing fiber by type and position (or key). Because the fiber already holds a live instance in `stateNode`, React simply calls `render()` to get the next tree and commits the diff\u2014no `new` is performed."
      },
      {
        id: "C",
        text: "Because React's scheduler memoizes component instantiation per render pass, caching the `new` expression result so that identical props skip re-construction.",
        isCorrect: false,
        explanation: "There is no memoization layer around construction. The instance survives because the fiber node is long-lived and already carries the `stateNode`; it is not a cache that React consults to decide whether to skip `new`. Props identity is irrelevant to whether the constructor runs."
      },
      {
        id: "D",
        text: "Because Babel's class transformation injects a `__reactMounted` guard flag that short-circuits the constructor body on subsequent calls.",
        isCorrect: false,
        explanation: "Babel (or TypeScript) transpiles class syntax to ES5 prototypes but adds no React-specific guard. The decision to skip the constructor lives entirely in React's reconciler, which simply reuses the existing fiber and never calls `new` a second time for the same mount."
      }
    ],
    correctAnswer: "B",
    explanation: "React's reconciliation algorithm compares the new element tree against the previous one. When a component's type and position (or key) are unchanged, React reuses the existing fiber node and its attached instance (fiber.stateNode). It calls render() to produce the next output, but it never re-invokes the constructor because the instance already exists in memory.\n\nThis matters in practice: any expensive work you put in the constructor (building a lookup table, parsing a large config) runs exactly once per mount, not once per render. If you need to react to prop changes, you reach for getDerivedStateFromProps or componentDidUpdate instead of relying on the constructor.\n\nThe nuance interviewers probe is what forces a re-construction. Changing the key prop, swapping the component type at that position, or conditionally removing and re-adding the component all cause React to unmount the old fiber (firing componentWillUnmount) and mount a fresh one, calling the constructor again. A simple prop or state update does not.",
    interviewLine: "The constructor runs once per mount because reconciliation matches the element type and position to the existing fiber, which already holds the instance in `stateNode`; re-renders just call `render()` on that same object. You only see the constructor fire again if you change the key, swap the type, or unmount and remount the component.",
    misconception: "Learners assume that every render is a full re-creation of the component (constructor \u2192 render \u2192 commit), so they expect side-effects in the constructor to re-run on every state or prop change. In reality, the constructor is a mount-only hook; re-renders only re-execute `render()` on the already-lived instance.",
    hints: [
      "Think about what React actually calls between two renders of the same component. Is it `new`, or is it a method on the existing object?",
      "What data structure does React keep for each component across renders, and what does it store there that lets it skip construction?",
      "Now ask: what single prop change would force React to throw away that stored instance and build a brand-new one?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Clicking the inner button logs only \"render\"; clicking \"remount\" changes the key, so you see \"constructor\" followed by \"render\"\u2014proving the constructor is a mount-only event.",
      language: "tsx",
      code: "class Counter extends React.Component {\n  state = { n: 0 };\n\n  constructor(_props: object) {\n    super(_props);\n    console.log(\"constructor\");\n  }\n\n  render() {\n    console.log(\"render\");\n    return (\n      <button onClick={() => this.setState({ n: this.state.n + 1 })}>\n        {this.state.n}\n      </button>\n    );\n  }\n}\n\nfunction App() {\n  const [key, setKey] = React.useState(1);\n  return (\n    <>\n      <Counter key={key} />\n      <button onClick={() => setKey((k) => k + 1)}>remount</button>\n    </>\n  );\n}"
    }
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
        text: "`replace()` removes the current entry and the one immediately before it, so the Back button skips two pages.",
        isCorrect: false,
        explanation: "Tempting because \"replace\" sounds destructive, but it only overwrites the topmost entry in place. The entry beneath it is untouched, so Back lands on that single prior page."
      },
      {
        id: "B",
        text: "`push()` performs a full document navigation while `replace()` performs a same-document soft navigation.",
        isCorrect: false,
        explanation: "Conflates history mutation with actual loading. Both methods are same-document; neither fires a navigation event or reloads the document. The difference is purely whether a new stack entry is created."
      },
      {
        id: "C",
        text: "`push()` and `replace()` both append a new entry; `replace()` additionally dispatches a `popstate` event.",
        isCorrect: false,
        explanation: "Mixes up the mutation methods with the navigation event. Neither pushState nor replaceState fires popstate\u2014that event is reserved for the user pressing Back or Forward. And replace does not append; it overwrites."
      },
      {
        id: "D",
        text: "`push()` adds a new entry to the session history stack so Back returns to the prior page; `replace()` overwrites the current entry so Back returns to the page before it.",
        isCorrect: true,
        explanation: "Correct. pushState grows the stack (history.length +1) and creates a revisitable step; replaceState mutates the top entry in place (history.length unchanged) so the intermediate URL is invisible to Back."
      }
    ],
    correctAnswer: "D",
    explanation: "pushState and replaceState are the two mutation methods on the History API. They let JavaScript change the URL and attach a state object without triggering a full document load. pushState appends a new entry to the top of the session history stack, so history.length increments and the Back button returns the user to the entry that was previously on top. replaceState overwrites the URL and state of the current (topmost) entry in place; history.length stays the same, and Back goes to the entry beneath the one just rewritten.\n\nIn real applications this distinction drives routing decisions. React Router, Next.js, and most SPA routers call replace for redirects\u2014after a successful login, when a 404 handler bounces to /not-found, or when normalizing a trailing slash\u2014so the user's Back button skips the intermediate URL. push is reserved for genuine navigation steps the user should be able to revisit.\n\nA nuance interviewers probe: the state parameter is a single JSON-serializable object per entry, readable only via history.state while that entry is current. It is not a key-value store and does not persist across a full reload unless you serialize it into the URL or storage yourself.",
    interviewLine: "I use pushState for normal navigation so every step is revisitable, and replaceState for redirects and route corrections so the user's Back button skips the intermediate URL. Neither triggers a page load, and replaceState keeps history.length the same while pushState increments it.",
    misconception: "Thinking that replace() deletes the current entry from the stack (shrinking it) rather than overwriting the URL and state of the existing entry in place. The stack length is unchanged; only the top entry's data is modified.",
    hints: [
      "Think of the session history as an array of visited URLs. Which operation appends a new element to the end, and which one rewrites the last element in place?",
      "After calling replaceState, what does the Back button do? Does it skip the replaced URL, or does it go to the entry that was second-from-top?",
      "Check history.length: does it change after each call? That tells you whether a new entry was created or the existing one was mutated."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "Notice how router.replace is used after login so the user's Back button skips the /login?token=\u2026 URL and goes straight to the pre-login page.",
      language: "tsx",
      code: "\"use client\";\nimport { useRouter } from \"next/navigation\";\nimport { useEffect } from \"react\";\n\nfunction LoginRedirect({ token }: { token: string }) {\n  const router = useRouter();\n\n  useEffect(() => {\n    // replace: Back won't land on /login?token=\u2026\n    router.replace(\"/dashboard\");\n  }, [router, token]);\n\n  return <p>Redirecting\u2026</p>;\n}"
    }
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
        text: "Relay is a Redux middleware that layers GraphQL fetching on top of the existing Redux store and dispatch/reducer cycle.",
        isCorrect: false,
        explanation: "This is tempting because teams sometimes run both libraries in the same codebase, and \"middleware\" is a word strongly associated with Redux. In reality Relay ships its own normalized store, its own fragment-subscription mechanism, and its own optimistic-update pipeline; it never dispatches Redux actions or reads a Redux reducer."
      },
      {
        id: "B",
        text: "Relay is a GraphQL data layer that colocates fetch requirements in component fragments and automatically normalizes and caches server data; Redux is a protocol-agnostic client-side state container driven by actions and reducers.",
        isCorrect: true,
        explanation: "Correct. Relay's unit of work is a fragment that declares fields, and its store is a normalized object cache keyed by GraphQL IDs. Redux's unit of work is an action flowing through reducers, and it carries no opinion about the wire protocol or caching strategy."
      },
      {
        id: "C",
        text: "Both are general-purpose state containers; the only meaningful difference is that Relay is React-specific while Redux works with any UI framework.",
        isCorrect: false,
        explanation: "Redux's core is indeed framework-agnostic, which makes this feel right. But Relay is not a general-purpose container\u2014you cannot store an arbitrary boolean or form draft in it. Its store is purpose-built for normalized GraphQL objects, and its API surface (fragments, subscriptions, optimistic responses) has no analogue for non-GraphQL client state."
      },
      {
        id: "D",
        text: "Relay replaces all local state management because it handles UI state, forms, and server data in one normalized store; Redux is limited to caching GraphQL responses.",
        isCorrect: false,
        explanation: "This inverts both roles. Relay does not manage UI or form state\u2014there is no action/reducer concept to express `sidebarOpen`. And Redux is protocol-agnostic; it is commonly used with REST, websockets, and local-only state, not restricted to GraphQL."
      }
    ],
    correctAnswer: "B",
    explanation: "Relay and Redux solve fundamentally different problems. Relay is a GraphQL data layer: you declare which fields a component needs using fragments, and Relay handles fetching, normalizing (storing each object once by its ID), caching, and invalidation automatically. You never write a cache-invalidation function or a fetch thunk; the fragment IS the query, and Relay's store is a normalized object cache driven by fragment subscriptions.\n\nRedux is a general-purpose state container. You model any slice of application state\u2014UI flags, form drafts, server data, websocket messages\u2014behind actions and reducers. It knows nothing about HTTP, GraphQL, or caching; you wire those concerns in via thunks, RTK Query, or custom middleware. Its store is an action log, not a relational object cache.\n\nIn practice you often see both in the same app: Relay owns the server-data cache, Redux owns everything else. The edge case interviewers probe: can you say why you'd still reach for Redux when Relay is already caching server data? The answer is arbitrary client state, cross-cutting UI logic, and non-GraphQL data sources\u2014none of which Relay's fragment-based model is designed to express.",
    interviewLine: "Relay owns the server-data cache through fragment subscriptions and automatic normalization by GraphQL ID, so I reach for Redux for everything else\u2014UI flags, form drafts, non-GraphQL sources\u2014because Redux is protocol-agnostic and action-driven.",
    misconception: "Treating Relay as a GraphQL-flavoured Redux store, so the action/reducer mental model transfers directly; in practice Relay's store is a normalized object cache driven by fragment subscriptions, with no action log, no reducer, and no way to store arbitrary client state.",
    hints: [
      "Ask what each library is tied to at the protocol level. Which one is hard-wired to a specific wire format, and which one is deliberately format-agnostic?",
      "Relay's unit of data requirement is a fragment attached to a component; Redux's unit is an action dispatched into a reducer. Which of those two mechanisms implies automatic fetching, normalization, and cache invalidation?",
      "If you need to store a boolean `isSidebarOpen` or a form draft, which library's API is designed for that? If you need to fetch a GraphQL query and cache the result by object ID so a second component reuses it without re-fetching, which one does that for you?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure",
    example: {
      caption: "Notice how Relay's fragment declares the data need right next to the component (and Relay handles fetching, caching, and normalization), while the Redux slice models arbitrary client state with no awareness of any network protocol.",
      language: "tsx",
      code: "import { graphql, useFragment } from \"react-relay\";\nimport { createSlice, PayloadAction } from \"@reduxjs/toolkit\";\n\n// Relay: data requirement colocated with the component\nconst PostCardFragment = graphql`\n  fragment PostCard_Post on Post {\n    title\n    author { name }\n  }\n`;\n\nfunction PostCard(props: { post: { \" $fragmentRefs\": typeof PostCardFragment } }) {\n  const post = useFragment(PostCard_Post, props.post);\n  return <article>{post.title} \u2014 {post.author.name}</article>;\n}\n\n// Redux: arbitrary client state, protocol-agnostic\nconst uiSlice = createSlice({\n  name: \"ui\",\n  initialState: { sidebarOpen: true, theme: \"dark\" },\n  reducers: {\n    toggleSidebar: (s) => { s.sidebarOpen = !s.sidebarOpen; },\n    setTheme: (s, a: PayloadAction<string>) => { s.theme = a.payload; },\n  },\n});"
    }
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
        text: "A static method called during the render phase that receives the throwing component's instance, letting you inspect its state and suppress the fallback.",
        isCorrect: false,
        explanation: "Tempting because `getDerivedStateFromError` is static and runs before the fallback, but `componentDidCatch` is an instance method, fires during commit (after the fallback is already rendered), and its second argument is an info object, not the component instance."
      },
      {
        id: "B",
        text: "An instance method that receives the thrown error and an array of component instances in the stack, so you can call cleanup on the throwing component.",
        isCorrect: false,
        explanation: "The belief that `errorInfo` exposes live component references is understandable, but `componentStack` is a plain string for display and logging; you cannot invoke methods on the throwing component from the boundary."
      },
      {
        id: "C",
        text: "A method invoked for any unhandled error in the subtree, including those from event handlers, useEffect callbacks, and unhandled Promise rejections.",
        isCorrect: false,
        explanation: "The scope feels broad because the boundary wraps the whole subtree, but React only routes synchronous throws from rendering, lifecycle methods, and constructors through `componentDidCatch`; event-handler and async errors must be handled with try/catch or `.catch()`."
      },
      {
        id: "D",
        text: "`componentDidCatch(error, errorInfo)` is called during the commit phase after a descendant throws in the render path; `errorInfo.componentStack` is a string of the component hierarchy, useful for logging.",
        isCorrect: true,
        explanation: "Correct. It is an instance method invoked post-commit, receives the thrown `Error` and an `errorInfo` object with a `componentStack` string, making it the standard place to report to Sentry or Datadog."
      }
    ],
    correctAnswer: "D",
    explanation: "`componentDidCatch(error, errorInfo)` is an instance method you define on a class component to make it an error boundary. It fires during the commit phase, after React has already rendered the boundary's fallback UI, when a descendant throws synchronously during rendering, in a lifecycle method, or in a constructor. The first argument is the `Error` object that was thrown; the second is an `errorInfo` object whose `componentStack` property is a human-readable string of the component hierarchy at the throw site.\n\nIn production this is your hook into error telemetry. Because it runs after the fallback is committed, you can safely call `Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })` without risking re-entrant rendering. The string stack (e.g. `\"in Button (at Button.tsx:12)\\n in Page (at index.tsx:5)\"`) is far easier to triage than a bare `Error.stack`.\n\nA nuance interviewers probe: `componentDidCatch` does not catch errors in event handlers, `useEffect` callbacks, `setTimeout`, or Promise rejections\u2014only synchronous throws in the render path and class lifecycle methods. Also, `componentStack` is a string, not an array of component instances, so you cannot call methods on the throwing component from inside the boundary.",
    interviewLine: "`componentDidCatch` is called during the commit phase after the fallback is rendered, so I use it to log the error and the `componentStack` string to Sentry. I keep in mind it only catches synchronous throws in the render path and class lifecycle methods, not event handlers or effects.",
    misconception: "Candidates often assume componentDidCatch fires before the fallback renders and that the second argument is the throwing component's instance (or an array of them), when in reality it runs during commit after the fallback is already painted and the second argument is an opaque info object whose componentStack is a plain string.",
    hints: [
      "Think about where in the commit lifecycle this method fires relative to the fallback render, and whether it is a static or instance method.",
      "The second parameter is not a component instance. What does the `errorInfo` object actually contain, and what type is `componentStack`?",
      "Remember that errors in `useEffect`, event handlers, and async callbacks are outside the boundary's scope\u2014only synchronous throws in the render path are caught."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit",
    example: {
      caption: "Notice that componentDidCatch receives a string stack trace, not component instances, and is the only place in the boundary where you can safely perform side-effects like logging.",
      language: "tsx",
      code: "import { Component, type ReactNode } from \"react\";\n\nclass ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {\n  state = { hasError: false };\n\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {\n    // errorInfo.componentStack is a string, e.g.:\n    // \"in Button (at Button.tsx:12)\\n in Page (at index.tsx:5)\"\n    console.error(error, errorInfo.componentStack);\n  }\n\n  render() {\n    if (this.state.hasError) return <p>Something went wrong.</p>;\n    return this.props.children;\n  }\n}"
    }
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
        text: "A generic minimum-edit-distance tree algorithm with O(n\u00b3) complexity that computes the exact smallest set of insertions, deletions, and moves between two DOM trees.",
        isCorrect: false,
        explanation: "The theoretical problem is indeed O(n\u00b3), which makes this tempting, but React explicitly avoids that cost. React's reconciliation is a heuristic O(n) pass, not an optimal tree-diff; it trades a few extra DOM writes for a linear-time guarantee."
      },
      {
        id: "B",
        text: "React's O(n) reconciliation heuristic that compares two virtual trees using element type and `key` props to compute the set of DOM mutations for the next render.",
        isCorrect: true,
        explanation: "Correct. React's two heuristics \u2014 different types produce different subtrees, and keys identify stable children \u2014 reduce reconciliation from O(n\u00b3) to O(n), which is what keeps large lists interactive."
      },
      {
        id: "C",
        text: "A mechanism that reads the live browser DOM, compares it pixel-by-pixel with the previous frame, and patches only the changed regions.",
        isCorrect: false,
        explanation: "The word \"diff\" evokes visual comparison, but React never inspects the live DOM or performs pixel comparisons to compute updates. Reconciliation operates entirely on the in-memory virtual tree; the DOM is only touched when applying the resulting mutations."
      },
      {
        id: "D",
        text: "A serialization step that converts the component tree to a JSON string, hashes it against the previous render, and re-renders only when the hash changes.",
        isCorrect: false,
        explanation: "Hashing two snapshots sounds like a clean way to detect changes, and it is a common caching pattern, but React never serializes the tree to a string. Reconciliation walks the object graph directly, comparing element types and keys in a single pass."
      }
    ],
    correctAnswer: "B",
    explanation: "React's reconciliation (often called \"diffing\") is the pass that compares the previous virtual tree with the next one to decide which DOM nodes to create, update, or remove. A generic minimum-edit-distance tree diff runs in O(n\u00b3); for a 1,000-element tree that is roughly a billion operations, far too slow for interactive UIs.\n\nReact sidesteps that cost with two heuristics. First, elements of different types are treated as producing entirely different subtrees, so React can discard the old subtree and build a new one without comparing children. Second, the `key` prop tells React which children are stable across renders, letting it match them in O(1) instead of scanning the whole list. The net result is a single O(n) pass over the tree.\n\nThe trade-off: because the algorithm is a heuristic, it does not always produce the absolute minimum number of DOM writes \u2014 it produces a good-enough set that is cheap to compute. Interviewers often probe this nuance: when you reorder a keyed list, React moves the existing DOM nodes rather than tearing them down and rebuilding, which is exactly what the key heuristic is designed to enable. Without keys, React falls back to index-based matching and will unmount/remount nodes on reorder, losing state and focus.",
    interviewLine: "React's reconciliation is an O(n) heuristic, not an optimal tree-diff. It relies on two assumptions \u2014 different element types produce different subtrees, and keys identify stable children across renders \u2014 to avoid the O(n\u00b3) cost of a generic minimum-edit-distance algorithm.",
    misconception: "The most common wrong model is that React performs a full O(n\u00b3) tree-diff every render. In reality, the two heuristics (type boundary and key) reduce the work to a single O(n) pass, and the algorithm intentionally sacrifices optimality for speed.",
    hints: [
      "Think about what React actually compares: the real DOM, a serialized string, or an in-memory tree? And what is the time complexity of a naive full tree-diff?",
      "React makes two specific assumptions to cut the cost from O(n\u00b3) to O(n). One involves element type; the other involves a prop you set on list items.",
      "The algorithm does not guarantee the minimum number of DOM writes. It guarantees a fast pass. What are the two heuristics that make that possible, and what happens when you omit them on a reordered list?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "With keys, React moves three <li> nodes; without keys it would unmount all three and remount three, losing any per-item state.",
      language: "tsx",
      code: "function Playlist({ tracks }: { tracks: Track[] }) {\n  return (\n    <ul>\n      {tracks.map((t) => (\n        <li key={t.id}>{t.name}</li>\n      ))}\n    </ul>\n  );\n}\n\n// [A, B, C] \u2192 [C, A, B]\n// keyed:   3 moves (DOM nodes preserved)\n// unkeyed: 3 unmounts + 3 mounts (state lost)"
    }
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
        text: "1) Different element types are reconciled by copying attributes between the old and new node; 2) Same DOM types always destroy and recreate the DOM element; 3) Same component types re-mount with fresh state; 4) Children are matched purely by array index; keys are ignored.",
        isCorrect: false,
        explanation: "This inverts every rule: React never patches across a type boundary, never recreates a same-type node, and keys override index-based matching. The belief behind it is that React is 'just innerHTML with extra steps.'"
      },
      {
        id: "B",
        text: "1) Different element types trigger a full page reload; 2) Same DOM types create a new node and remove the old one; 3) Same component types discard state and re-run the constructor; 4) Keys must be unique across the entire application, not just among siblings.",
        isCorrect: false,
        explanation: "A type change causes an unmount/mount, not a page reload; same-type DOM nodes are patched in place; component state survives prop updates; and key uniqueness is scoped to the sibling list, not global."
      },
      {
        id: "C",
        text: "1) Different element types cause React to unmount the old subtree and mount a new one; 2) Same DOM types keep the existing node and patch only changed attributes; 3) Same component types reuse the instance, updating its props; 4) Children are matched by key when present, falling back to index.",
        isCorrect: true,
        explanation: "Correct. These four heuristics let React skip entire subtrees, patch in place, preserve state, and reorder lists efficiently, keeping reconciliation at O(n)."
      },
      {
        id: "D",
        text: "1) React diffs the real DOM directly with no virtual tree; 2) Keys are a styling hint that affects className assignment; 3) Component state lives on the DOM node as a data attribute; 4) The diffing algorithm runs only once at initial mount.",
        isCorrect: false,
        explanation: "React maintains a virtual tree and diffs that, not the live DOM; keys are identity markers for reconciliation, not style hooks; state lives in React's internal fiber, not on DOM nodes; and reconciliation runs on every update, not just mount."
      }
    ],
    correctAnswer: "C",
    explanation: "When React reconciles two renders, it compares the new virtual tree against the previous one using heuristics that keep the walk at O(n) rather than a full O(n\u00b2) tree comparison.\n\nRule 1 \u2013 different types: if the element type changes (e.g. <div> \u2192 <span>, or <List> \u2192 <Table>), React unmounts the entire old subtree and mounts a new one from scratch. No state survives that boundary.\n\nRule 2 \u2013 same DOM type: when both elements are the same host tag, React keeps the existing DOM node and patches only the attributes that changed (className, style, event handlers). No node is destroyed or recreated.\n\nRule 3 \u2013 same component type: React reuses the same component instance, updates its props, and calls render again. State from useState, useReducer, or class fields persists across the update.\n\nRule 4 \u2013 children with keys: when iterating over a list of children, React matches them by key if keys are provided, otherwise by positional index. Keys let React move, insert, or remove items without destroying and recreating siblings.\n\nAn edge case interviewers probe: keys only need to be unique among siblings in the same array, not globally. Also, changing a key is treated as a type change \u2013 the old subtree is unmounted and a new one mounted, which resets all state inside it.",
    interviewLine: "React's reconciliation is O(n) because it short-circuits on type mismatches, patches attributes in place for same-type host nodes, reuses component instances across prop updates, and relies on keys to match list children by identity rather than position.",
    misconception: "Keys are a globally unique identifier that must be distinct across every list in the app, and React uses them to store or track component state across unrelated parent components.",
    hints: [
      "Think about the very first check React performs when comparing two elements: what single comparison lets it skip an entire subtree without looking inside?",
      "Now imagine a <ul> whose <li> items are reordered. What does React consult to decide which node to keep, which to move, and which to remove?",
      "For two <div> elements that differ only in className, React never calls document.createElement again \u2013 it reads the existing node and writes the new property."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
    example: {
      caption: "Notice how keys let React move 'Banana' and add 'Cherry' instead of patching index 0 and index 1 in place.",
      language: "tsx",
      code: "function FruitList({ fruits }: { fruits: string[] }) {\n  return (\n    <ul>\n      {fruits.map((f) => (\n        <li key={f}>{f}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Render 1: [\"Apple\", \"Banana\"]\n// Render 2: [\"Banana\", \"Cherry\"]\n// With keys: remove \"Apple\", move \"Banana\", insert \"Cherry\".\n// Without keys (index match): patch index 0 Apple\u2192Banana, patch index 1 Banana\u2192Cherry."
    }
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
        text: "Rendering a component into a separate React tree so it escapes the parent's re-render cycle and avoids cascading updates.",
        isCorrect: false,
        explanation: "Portals change the DOM mount point, not the React tree. The component stays in the same fiber hierarchy, so re-renders, context, and event bubbling behave exactly as if it were rendered inline."
      },
      {
        id: "B",
        text: "Modals, dialogs, tooltips, hover cards, and toasts that must visually escape a parent's `overflow: hidden`, `z-index`, or stacking-context constraints.",
        isCorrect: true,
        explanation: "Correct. `createPortal` mounts the child's DOM output into an alternate node (commonly `document.body`) so it is no longer clipped or stacked by the parent's CSS, while React's component-tree semantics\u2014context, events, state\u2014remain unchanged."
      },
      {
        id: "C",
        text: "Server-side rendering of UI fragments that logically belong to a different page or route than the current component tree.",
        isCorrect: false,
        explanation: "`createPortal` is a client-side `react-dom` API that manipulates the live DOM. It has no role in SSR; server rendering is handled by the framework's render pipeline, not by choosing a different DOM mount target."
      },
      {
        id: "D",
        text: "Sharing mutable state between unrelated components without lifting it to a common ancestor or adding a context provider.",
        isCorrect: false,
        explanation: "Portals only change where in the DOM the output appears; they do not create a new state or data channel. Cross-component state sharing is the job of Context, a store, or lifted props\u2014none of which portals provide."
      }
    ],
    correctAnswer: "B",
    explanation: "React portals (`createPortal` from `react-dom`) render their children into a DOM node outside the parent's DOM hierarchy while keeping them in the same React component tree. Events still bubble through the React tree, `useContext` still resolves to the nearest provider in the component hierarchy, and the component's state and lifecycle are completely unaffected by the DOM relocation.\n\nThe typical use case is UI that must visually break out of a constrained parent: a modal inside a card with `overflow: hidden`, a tooltip inside a table cell trapped by a low `z-index` stacking context, or a toast notification that needs to sit above a `position: fixed` header. Without a portal you would either fight CSS specificity or restructure your component tree just to escape one ancestor's box.\n\nAn edge case interviewers probe: because the DOM node is detached from the parent, the portal's children do not inherit CSS from the parent (no `:hover` from an ancestor, no inherited `font-size` unless set on the portal target). Crucially, the portal does NOT create a new React fiber tree\u2014`useContext` still walks the component hierarchy, not the DOM hierarchy, so a provider above the portal in the component tree still reaches the portal's children.",
    interviewLine: "I use `createPortal` to mount a modal or tooltip into `document.body` so it escapes the parent's `overflow: hidden` or stacking context, while React events still bubble through my component tree and context still flows from the nearest provider.",
    misconception: "Because the portal's DOM node lives under `document.body`, the portal's children form a separate React tree that no longer receives context from providers above the portal in the component hierarchy.",
    hints: [
      "Think about which CSS properties on a parent can visually trap a child element inside its box.",
      "The key distinction is that the DOM mount point changes, but the React component hierarchy\u2014and therefore context resolution and event bubbling\u2014does not.",
      "If a tooltip inside a table cell with `overflow: hidden` needs to appear above the cell, where does the tooltip's DOM node need to live?"
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure",
    example: {
      caption: "Notice that `createPortal` moves the DOM output to `document.body` but the component still lives in the same React tree, so context and event handlers work normally.",
      language: "tsx",
      code: "import { createPortal } from \"react-dom\";\nimport { useState, useRef } from \"react\";\n\nfunction Tooltip({ label, children }: {\n  label: string;\n  children: React.ReactNode;\n}) {\n  const [open, setOpen] = useState(false);\n  const ref = useRef<HTMLSpanElement>(null);\n\n  const tip = open && createPortal(\n    <div className=\"tooltip\" style={{ position: \"fixed\" }}>{label}</div>,\n    document.body // escapes parent overflow / z-index\n  );\n\n  return (\n    <span\n      ref={ref}\n      onMouseEnter={() => setOpen(true)}\n      onMouseLeave={() => setOpen(false)}\n    >\n      {children}\n    </span>\n  );\n}"
    }
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
        text: "The new transform removes the `React` import by inlining the element factory at compile time, so no `createElement` or `jsx` function call remains in the emitted code.",
        isCorrect: false,
        explanation: "This is tempting because \"no React import\" sounds like \"no function call at all.\" In reality the new transform still emits a function call\u2014`jsx('h1', { \u2026 })`\u2014it just imports `jsx` from `react/jsx-runtime` instead of calling a method on the `React` namespace."
      },
      {
        id: "B",
        text: "The old transform compiled `<h1 />` to `React.createElement('h1', \u2026)`, requiring `React` in scope; the new transform auto-imports `jsx` from `react/jsx-runtime` and calls `jsx('h1', { \u2026 })` without any `React` binding.",
        isCorrect: true,
        explanation: "Correct. The new transform delegates element creation to dedicated helpers in `react/jsx-runtime`, decoupling JSX from the `React` global namespace and removing the mandatory `import React` from every file."
      },
      {
        id: "C",
        text: "The only practical difference is that the new transform lets you use `<>\u2026</>` fragments without importing `React.Fragment`; both transforms still emit `React.createElement` calls under the hood.",
        isCorrect: false,
        explanation: "Fragments work in both transforms (the old one emits `React.createElement(React.Fragment, \u2026)`), so that is not the distinguishing change. The new transform calls `jsx`/`jsxs` from `react/jsx-runtime`, not `React.createElement`."
      },
      {
        id: "D",
        text: "The new transform is purely a DX convenience; at runtime the emitted code is byte-for-byte identical because Babel rewrites `jsx()` calls back to `React.createElement` for compatibility.",
        isCorrect: false,
        explanation: "Babel does not rewrite the new runtime calls back to `createElement`. The emitted code references `react/jsx-runtime`, a separate module with its own `jsx` and `jsxs` functions, so the runtime path is genuinely different."
      }
    ],
    correctAnswer: "B",
    explanation: "The old JSX transform (React \u2264 16) desugared every JSX element into `React.createElement(type, props, \u2026children)`. Because that call references the `React` identifier, every file containing JSX needed `import React from 'react'` in scope, even if the component used no other React API.\n\nThe new transform, introduced in React 17, changes the emission target. The compiler (Babel, SWC, or TypeScript with `jsx: \"react-jsx\"`) emits calls to `jsx` or `jsxs` imported from `react/jsx-runtime`. `jsx` handles elements with zero or one child; `jsxs` handles multiple static children. The import is injected automatically, so the file never needs a `React` binding.\n\nIn practice this lets you drop the unused `import React` line, shrinks the module graph, and gives bundlers a tiny separate entry point (`react/jsx-runtime`) to deduplicate independently of the full `react` package. It also opens the door for compiler-level optimisations the generic `createElement` path could not express\u2014React 19's automatic memoisation of static JSX elements is one example.\n\nEdge case: if a monorepo mixes `jsx: \"react\"` (old) and `jsx: \"react-jsx\"` (new) across packages, files compiled with the old setting will still throw \"React is not defined\" at runtime if the import was removed, a subtle build error that only surfaces in the package using the old setting.",
    interviewLine: "The new transform swaps the emission target from `React.createElement` to `jsx`/`jsxs` in `react/jsx-runtime`, so the compiler injects the import itself and the file no longer needs `React` in scope\u2014this is the same mechanism that lets React 19 memoise static JSX automatically.",
    misconception: "Treating the removal of `import React` as a style preference rather than a consequence of a different runtime call target: the old transform's output literally references the `React` identifier, so omitting the import is a runtime ReferenceError, not a lint warning.",
    hints: [
      "Think about which identifier the compiled output actually references at runtime. In the old transform, what global must exist in the module's scope?",
      "In the new transform the compiler auto-injects an import from a specific sub-path of the `react` package. Which sub-path, and which two functions does it export for single-child vs multi-child elements?",
      "Check the `jsx` compiler option in TypeScript (`\"react\"` vs `\"react-jsx\"`) or Babel (`runtime: \"classic\"` vs `runtime: \"automatic\"`). Which value maps to which transform?"
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks",
    example: {
      caption: "Notice that the new-transform file has no `import React` line at all, yet the emitted code still calls a factory function\u2014just one from a different module.",
      language: "tsx",
      code: "import { useState } from \"react\";\n\nfunction Counter() {\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      Clicked {n} times\n    </button>\n  );\n}\n\n// Old transform output (simplified):\n// import React from \"react\";          // \u2190 required\n// React.createElement(\"button\", { onClick: \u2026 }, \"Clicked \", n, \" times\");\n\n// New transform output (simplified):\n// import { jsx as _jsx } from \"react/jsx-runtime\";  // \u2190 auto-injected\n// _jsx(\"button\", { onClick: \u2026, children: \"Clicked \", n, \" times\" });"
    }
  }
];
