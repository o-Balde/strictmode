import type { BinaryCard } from "./binary-types";

/**
 * The Binary bank.
 *
 * Authoring rules, enforced by scripts/build-binary.ts:
 *
 * 1. Bank size is exactly 180 cards: 60 junior, 60 intermediate, 60 senior.
 * 2. Every statement is a single factual claim about React, TypeScript,
 *    or JavaScript — verifiable from the documentation or standard.
 * 3. Statements have one or two **emphasised** words where the truth pivots.
 * 4. Cards with code snippets keep their statement under 80 chars; cards
 *    without stay under 100 chars.
 * 5. Explanations are 90-210 chars, naming the mechanism then the consequence.
 * 6. Truth is balanced per level (within 8 of 50/50).
 * 7. Category distribution stays balanced across react, typescript, javascript.
 * 8. At least 35% of cards include a minimal, syntax-highlighted code snippet.
 */
export const BINARY_CARDS: BinaryCard[] = [
  {
    "id": "bc-001",
    "statement": "After one click this counter shows **1**, not 2.",
    "truth": true,
    "explanation": "Both calls read `count` from the **same render snapshot**, so both compute 0 + 1. Pass an updater — `setCount(c => c + 1)` — to accumulate them.",
    "level": "junior",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => {\n    setCount(count + 1);\n    setCount(count + 1);\n  }}>{count}</button>;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-002",
    "statement": "Logging `count` right after `setCount(1)` prints the **old** value.",
    "truth": true,
    "explanation": "A setter schedules a re-render; it never reassigns the `count` binding this handler closed over. The new value is visible in the **next** render, not this one.",
    "level": "junior",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "const [count, setCount] = useState(0);\nfunction handleClick() {\n  setCount(1);\n  console.log(count);\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-003",
    "statement": "Mutating `clicks.current` **re-renders** this button.",
    "truth": false,
    "explanation": "A ref persists across renders but sits **outside** React's update path, so nothing schedules a render. The label stays frozen until some other state change repaints it — use `useState` for values the UI displays.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function Clicks() {\n  const clicks = useRef(0);\n  return <button onClick={() => clicks.current++}>\n    {clicks.current}\n  </button>;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-004",
    "statement": "This effect runs after **every** committed render.",
    "truth": true,
    "explanation": "With **no dependency array** React re-runs the effect after each commit. Passing `[count]` would narrow it to renders where `count` actually changed.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "useEffect(() => {\n  document.title = String(count);\n});",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-005",
    "statement": "React re-runs this initializer on **every** render.",
    "truth": false,
    "explanation": "Passing a function makes it an **initializer**, which React calls only while mounting the state. Strict Mode double-invokes it in development to check purity, never in production.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "const [items] = useState(() =>\n  createInitialItems()\n);",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-006",
    "statement": "With `key={index}`, reordering the list can leave state on the **wrong** row.",
    "truth": true,
    "explanation": "Keys are sibling identity. After a reorder, position 0 still has key `0`, so React reuses that instance for different data and its state follows the slot instead of the item. Key by a stable `item.id`.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys",
    "codeSnippet": "items.map((item, index) => (\n  <Row key={index} item={item} />\n));",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-007",
    "statement": "This Hook call is fine because `enabled` never changes mid-render.",
    "truth": false,
    "explanation": "React matches Hooks by **call order**, not by name, so a Hook inside `if` shifts every later Hook's slot when the branch flips. Call it unconditionally and branch on the value instead.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function Profile({ enabled }) {\n  if (enabled) {\n    const [name, setName] = useState(\"\");\n  }\n  return null;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-008",
    "statement": "A component must return exactly **one DOM element**.",
    "truth": false,
    "explanation": "It must return a single React **node**, and a Fragment, string, number, portal, or `null` all qualify. The constraint is on node count, not on DOM elements.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-009",
    "statement": "Props are a **read-only** snapshot for the render that received them.",
    "truth": true,
    "explanation": "Writing to a prop desynchronises parent and child without scheduling any render. New values arrive only when the parent re-renders and passes them down.",
    "level": "junior",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-010",
    "statement": "Setting state in a parent re-renders it and reconciles its subtree.",
    "truth": true,
    "explanation": "A changed value marks the owner dirty, so React re-runs it and diffs the children it returned. Descendants skip that work only behind `memo` or an unchanged element reference.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-011",
    "statement": "An effect's cleanup runs **only** on unmount.",
    "truth": false,
    "explanation": "**only** is what breaks this. Cleanup also runs before each re-run of the effect, whenever a dependency changed. Drop that word and the claim is correct.",
    "level": "junior",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-012",
    "statement": "A component returning `null` renders nothing yet **stays mounted**.",
    "truth": true,
    "explanation": "`null` suppresses output, not the instance: its Hooks and state survive the render. To actually discard that state the parent has to stop rendering the element.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-013",
    "statement": "Context lets a deep child read a value **without** each layer forwarding it.",
    "truth": true,
    "explanation": "A provider publishes to every consumer beneath it, so intermediate components never mention the value. The cost is that a new provider value re-renders all consumers.",
    "level": "junior",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-014",
    "statement": "A controlled input takes `value` from state and reports edits via `onChange`.",
    "truth": true,
    "explanation": "That pairing makes state the single source of truth for what the field shows. Supply `value` with no `onChange` and the input becomes effectively read-only.",
    "level": "junior",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-015",
    "statement": "A `useEffect` callback runs synchronously **during** component JSX rendering.",
    "truth": false,
    "explanation": "Effects execute asynchronously after React commits changes to the DOM and the browser paints the screen. Running side effects during render violates React's pure render model.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function Counter() {\n  useEffect(() => {\n    console.log(\"DOM updated and painted\");\n  });\n  return <h1>Counting</h1>;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-016",
    "statement": "Keys must be unique across **the entire app**.",
    "truth": false,
    "explanation": "Uniqueness is required only among **siblings** in the same list. Two unrelated lists can both use key `1` with no interference.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-017",
    "statement": "React can skip a re-render when the next state is `Object.is`-equal to the current.",
    "truth": true,
    "explanation": "Setting identical state lets React bail out of the update. It may still call the component once more before discarding the result, which is another reason render must stay pure.",
    "level": "junior",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-018",
    "statement": "After one click this counter shows **2**.",
    "truth": true,
    "explanation": "Each updater receives the **previous queued result** rather than the render's snapshot, so the two increments compose. This is why `c => c + 1` is the safe form whenever a handler updates the same state twice.",
    "level": "intermediate",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "const [count, setCount] = useState(0);\nreturn <button onClick={() => {\n  setCount(c => c + 1);\n  setCount(c => c + 1);\n}}>{count}</button>;",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-019",
    "statement": "This subscription keeps logging the **first** `query` forever.",
    "truth": true,
    "explanation": "The empty dependency array prevents re-subscription, so the callback keeps the `query` it captured on mount. List `query` as a dependency, or read it from a ref, to observe later values.",
    "level": "intermediate",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function Search({ query }) {\n  useEffect(() => {\n    subscribe(() => console.log(query));\n  }, []);\n  return null;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-020",
    "statement": "Because `Child` is wrapped in `memo`, a `ThemeContext` update skips it.",
    "truth": false,
    "explanation": "`memo` only short-circuits renders caused by **new props**. A change to consumed context re-renders `Child` regardless, and so does its own state.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance",
    "codeSnippet": "const Child = memo(function Child() {\n  const theme = useContext(ThemeContext);\n  return <span>{theme}</span>;\n});",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-021",
    "statement": "This `memo` is defeated because `onSave` is a **new function** each render.",
    "truth": true,
    "explanation": "`memo` compares props with `Object.is`, and a fresh arrow literal never equals the previous one. Wrap the handler in `useCallback` or hoist it for the memo to have any effect.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance",
    "codeSnippet": "const Child = memo(({ onSave }) => null);\nfunction Parent() {\n  return <Child onSave={() => save()} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-022",
    "statement": "Changing `userId` remounts `Detail` and **resets** its local state.",
    "truth": true,
    "explanation": "A different `key` is a different element identity, so React unmounts the old instance and mounts a fresh one. This is the idiomatic way to reset state when a prop changes.",
    "level": "intermediate",
    "category": "react",
    "subject": "rendering-keys",
    "codeSnippet": "function Page({ userId }) {\n  return <Detail key={userId} userId={userId} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-023",
    "statement": "This `useMemo` is needed for correctness because React caches it permanently.",
    "truth": false,
    "explanation": "`useMemo` is a **performance hint**, not a semantic guarantee: React may drop the cache and recompute. Any code that breaks when the value is recomputed was already broken.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance",
    "codeSnippet": "const result = useMemo(\n  () => expensiveTransform(data),\n  [data]\n);",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-024",
    "statement": "The lazy initializer keeps `localStorage` parsing out of **every** render.",
    "truth": true,
    "explanation": "`useState(fn)` invokes `fn` only while mounting, so the parse happens once. Writing `useState(JSON.parse(raw))` would run it on every render and discard the result.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance",
    "codeSnippet": "const [settings] = useState(() => {\n  const raw = localStorage.getItem(\"settings\");\n  return raw ? JSON.parse(raw) : {};\n});",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-025",
    "statement": "State belongs to a component's **position** in the tree, not to where its JSX sits.",
    "truth": true,
    "explanation": "React matches instances across renders by parent, type, and key. Render the same component at a different position and it starts with fresh state even though the code is identical.",
    "level": "intermediate",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-026",
    "statement": "With `createRoot`, updates fired inside `setTimeout` are **batched**.",
    "truth": true,
    "explanation": "React 18 batches automatically no matter the origin — timeouts, promises, and native events included. Legacy `ReactDOM.render` batched only inside React's own event handlers.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-027",
    "statement": "A `useReducer` dispatch keeps a **stable identity** for the component's lifetime.",
    "truth": true,
    "explanation": "React guarantees it, so handing `dispatch` to a memoized child never breaks memoization and omitting it from a dependency array is safe.",
    "level": "intermediate",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-028",
    "statement": "`useId` is the recommended way to generate `key` props for mapped list items.",
    "truth": false,
    "explanation": "`useId` generates a stable ID for accessible form element pairs (`htmlFor`/`id`) across SSR. List keys must come from individual item data so React can track item identity across re-orders.",
    "level": "intermediate",
    "category": "react",
    "subject": "rendering-keys",
    "codeSnippet": "function List({ users }: { users: { id: string; name: string }[] }) {\n  const id = useId();\n  return users.map(u => <li key={id}>{u.name}</li>); // Bad!\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-029",
    "statement": "A value computable from props and state belongs in render, not mirrored into state.",
    "truth": true,
    "explanation": "Deriving it avoids a second commit and removes any chance of the copy drifting from its source. Reach for state only when the value must outlive its inputs.",
    "level": "intermediate",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-030",
    "statement": "`startTransition` marks its updates non-urgent so input stays responsive.",
    "truth": true,
    "explanation": "Transition renders are interruptible: React can abandon an in-progress result to process an urgent update first, then restart the transition work.",
    "level": "intermediate",
    "category": "react",
    "subject": "concurrency"
  },
  {
    "id": "bc-031",
    "statement": "Wrapping a controlled input's `setValue` in `startTransition` smooths typing.",
    "truth": false,
    "explanation": "The field's own value has to stay **urgent** or the caret visibly outruns the text. Put the expensive derived list inside the transition and leave the input update synchronous.",
    "level": "intermediate",
    "category": "react",
    "subject": "concurrency"
  },
  {
    "id": "bc-032",
    "statement": "A provider handed a **new object** re-renders consumers even with unchanged fields.",
    "truth": true,
    "explanation": "Context compares values with `Object.is`, and a fresh literal fails that check on every render. Memoize the value when the provider re-renders for unrelated reasons.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-033",
    "statement": "In development, Strict Mode sets up, tears down, then sets up each effect again.",
    "truth": true,
    "explanation": "That extra cycle proves setup and cleanup are symmetric, surfacing a missing unsubscribe immediately. Production runs the effect once.",
    "level": "intermediate",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-034",
    "statement": "A component fetching in `useEffect` shows its `Suspense` fallback while loading.",
    "truth": false,
    "explanation": "A boundary reacts to **rendering** that suspends, and effects run after commit — by then there is nothing left to suspend. Use a Suspense-aware data source or render your own loading state.",
    "level": "intermediate",
    "category": "react",
    "subject": "data-fetching"
  },
  {
    "id": "bc-035",
    "statement": "This Server Component may `await` its data **during render**.",
    "truth": true,
    "explanation": "Server Components can be `async`, so React holds the stream until the promise resolves and then emits the markup. A Client Component cannot: it would need `use()` or an effect.",
    "level": "senior",
    "category": "react",
    "subject": "server-components",
    "codeSnippet": "export default async function Page() {\n  const user = await getUser();\n  return <h1>{user.name}</h1>;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-036",
    "statement": "This file stays a Server Component because importing `useState` is harmless.",
    "truth": false,
    "explanation": "**Calling** a state Hook forces the component into the client bundle, so the file needs a `\"use client\"` directive. Without one React has no way to hydrate the button and the build fails.",
    "level": "senior",
    "category": "react",
    "subject": "server-components",
    "codeSnippet": "import { useState } from \"react\";\nexport default function Counter() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-037",
    "statement": "Passing this closure to a Client Component works because React serializes it.",
    "truth": false,
    "explanation": "Props crossing the server-to-client boundary must be **serializable**, and a plain closure is not. Only a Server Function marked `\"use server\"` can be handed over and invoked from the client.",
    "level": "senior",
    "category": "react",
    "subject": "server-components",
    "codeSnippet": "// Server Component\nexport default function Page() {\n  return <ClientButton onClick={() => log(\"click\")} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-038",
    "statement": "`\"use server\"` means only your own UI can reach `deleteAccount`.",
    "truth": false,
    "explanation": "A Server Function is a **public endpoint** with a generated id, and anything can post to it. It must authenticate, authorize, and validate its input exactly like a route handler.",
    "level": "senior",
    "category": "react",
    "subject": "server-components",
    "codeSnippet": "export async function deleteAccount(id: string) {\n  \"use server\";\n  await db.account.delete({ where: { id } });\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-039",
    "statement": "This optimistic entry still has to be reconciled with the server's result.",
    "truth": true,
    "explanation": "`useOptimistic` projects a temporary value only for the life of the Action; once it settles React falls back to the base state. Without a returned record or a refresh the row disappears.",
    "level": "senior",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "const [optimistic, addOptimistic] = useOptimistic(\n  messages,\n  (state, text: string) => [...state, { text, sending: true }]\n);",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-040",
    "statement": "In React 19 this component receives `ref` as an ordinary prop.",
    "truth": true,
    "explanation": "Function components may declare `ref` directly, so `forwardRef` is now needed only for older React versions or when renaming the forwarded ref.",
    "level": "senior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function TextInput({ ref, ...props }) {\n  return <input ref={ref} {...props} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-041",
    "statement": "A `useEffect` runs **on the server** so its result lands in the streamed HTML.",
    "truth": false,
    "explanation": "Effects are client-side post-commit work and never run during server rendering. Anything that must appear in the HTML has to be fetched in a Server Component's body.",
    "level": "senior",
    "category": "react",
    "subject": "server-components"
  },
  {
    "id": "bc-042",
    "statement": "React's `cache` collapses same-argument calls **within one server request**.",
    "truth": true,
    "explanation": "Two components can each ask for the current user and share a single query. The entry is scoped to the request, so it cannot leak one user's data into another's render.",
    "level": "senior",
    "category": "react",
    "subject": "data-fetching"
  },
  {
    "id": "bc-043",
    "statement": "React's `cache` also serves as a **cross-request** application cache.",
    "truth": false,
    "explanation": "Its lifetime is a **single request** and the next one starts empty. Durable caching needs the framework's data cache or an external store.",
    "level": "senior",
    "category": "react",
    "subject": "data-fetching"
  },
  {
    "id": "bc-044",
    "statement": "Hydration expects the client's first render to match the server's HTML.",
    "truth": true,
    "explanation": "On a mismatch React discards the server markup for that subtree and warns. Render `Date`- or locale-dependent output after mount, or opt out with `suppressHydrationWarning`.",
    "level": "senior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-045",
    "statement": "`useSyncExternalStore` keeps an external store consistent under concurrent rendering.",
    "truth": true,
    "explanation": "It hands React a subscribe function plus a snapshot getter so every read inside one render agrees. Its `getServerSnapshot` argument is what stops hydration from tearing.",
    "level": "senior",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-046",
    "statement": "`useLayoutEffect` runs before paint and can therefore delay it.",
    "truth": true,
    "explanation": "That blocking behaviour is exactly what makes it right for measuring or correcting layout without a visible flicker — and wrong for fetching or subscriptions, which belong in `useEffect`.",
    "level": "senior",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-047",
    "statement": "A `Suspense` boundary catches an error thrown inside an **event handler**.",
    "truth": false,
    "explanation": "Suspense responds to **suspension during render**, not to thrown errors, and handlers run long after render finished. Use an error boundary, and handle rejections in the handler itself.",
    "level": "senior",
    "category": "react",
    "subject": "concurrency"
  },
  {
    "id": "bc-048",
    "statement": "Sibling Server Components can start their data reads **concurrently**.",
    "truth": true,
    "explanation": "React renders siblings together, so each one's `await` begins without waiting for the other to finish. Awaiting both inside one parent serialises them into a waterfall.",
    "level": "senior",
    "category": "react",
    "subject": "data-fetching"
  },
  {
    "id": "bc-049",
    "statement": "`memo` pays off only when the skipped render costs more than the prop comparison.",
    "truth": true,
    "explanation": "Every render still runs the comparison and holds the previous props in memory. On a cheap component, or one whose props change each time, it is pure overhead.",
    "level": "senior",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-050",
    "statement": "Module-level mutable state in a server module is isolated **per request**.",
    "truth": false,
    "explanation": "The module is evaluated once per process and shared by every concurrent request, so one user's data can surface in another's response. Keep request state inside the request scope.",
    "level": "senior",
    "category": "react",
    "subject": "server-components"
  },
  {
    "id": "bc-051",
    "statement": "With `strictNullChecks`, this assignment is a **type error**.",
    "truth": true,
    "explanation": "`strictNullChecks` gives `null` and `undefined` their own types, so `string` no longer admits them. Widen the annotation to `string | undefined` when absence is meaningful.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "let name: string = \"Ada\";\nname = undefined;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-052",
    "statement": "This compiles because `unknown` allows any operation on the value.",
    "truth": false,
    "explanation": "`unknown` accepts any **input** but permits no operations until narrowed. Add `typeof value === \"string\"` and the call type-checks — that requirement is the whole point of the type.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function shout(value: unknown) {\n  return value.toUpperCase();\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-053",
    "statement": "`direction` has the literal type `\"north\"` rather than `string`.",
    "truth": true,
    "explanation": "A `const` bound to a string literal already infers that literal, so `as const` is **redundant here**. It earns its keep on objects and arrays, where it stops properties widening and adds `readonly`.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "const direction = \"north\" as const;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-054",
    "statement": "`result` here has the literal type `\"ready\"`.",
    "truth": true,
    "explanation": "`T` is inferred from the argument and handed straight back, so the literal survives the round trip. Annotating the parameter as `string` would widen it immediately.",
    "level": "junior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "function identity<T>(value: T): T {\n  return value;\n}\nconst result = identity(\"ready\");",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-055",
    "statement": "After the `number` branch returns, `value` is narrowed to `string`.",
    "truth": true,
    "explanation": "`typeof` is a recognised guard, so the early return strips `number` from the union on the line below. That is what makes `toUpperCase` legal there.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function format(value: string | number) {\n  if (typeof value === \"number\") {\n    return value.toFixed(2);\n  }\n  return value.toUpperCase();\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-056",
    "statement": "This errors because `age` is **required** on `User`.",
    "truth": true,
    "explanation": "Every required property must be present with a compatible type. Declare it `age?: number` if the field is genuinely optional.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type User = { name: string; age: number };\nconst user: User = { name: \"Ada\" };",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-057",
    "statement": "`readonly` rejects `push` at compile time but does not freeze the array.",
    "truth": true,
    "explanation": "The annotation is erased from the emitted JavaScript, so a cast or an `any` detour still mutates the array. Reach for `Object.freeze` when the guarantee has to hold at runtime.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "const ids: readonly number[] = [1, 2];\nids.push(3);",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-058",
    "statement": "TypeScript compares object types by **shape**, not by declared name.",
    "truth": true,
    "explanation": "A value is assignable once it supplies the required members, whatever interface it was declared against. Add a unique literal field when you need nominal-style separation.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-059",
    "statement": "On an unnarrowed union type, only members shared by **all** variants can be called.",
    "truth": true,
    "explanation": "Unnarrowed union values only permit properties and methods present on every constituent member. Calling type-specific methods like `toFixed` requires a narrowing check first.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "type ID = string | number;\nfunction printId(id: ID) {\n  return id.toString(); // allowed on both\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-060",
    "statement": "`any` **preserves safety** by requiring a runtime check before property access.",
    "truth": false,
    "explanation": "`any` **disables** checking for that value and spreads to everything it touches. `unknown` is the safe boundary type: it demands the narrowing that `any` waves through.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-061",
    "statement": "The optional chain `?.` short-circuits on `null` and `undefined` **only**.",
    "truth": true,
    "explanation": "Optional chaining (`?.`) aborts evaluation only for nullish values (`null` or `undefined`). Falsy values like `0`, `false`, and `\"\"` continue evaluating normally.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "const item = { count: 0, label: \"\" };\nconst count = item.count?.valueOf();",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-062",
    "statement": "An optional property is **always** present at runtime holding `undefined`.",
    "truth": false,
    "explanation": "It can be **absent entirely**, which `in` and `Object.keys` distinguish from a present `undefined`. `exactOptionalPropertyTypes` makes that difference visible in the type.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-063",
    "statement": "Type annotations and interfaces are **erased** from the emitted JavaScript.",
    "truth": true,
    "explanation": "They guide the checker and then vanish, so nothing validates data at runtime. Payloads crossing a boundary still need a schema validator.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-064",
    "statement": "A type assertion converts the value to the asserted type **at runtime**.",
    "truth": false,
    "explanation": "It changes only what the checker believes: no code is emitted and nothing is inspected. Assert the wrong shape and the failure surfaces later, far from the cast.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-065",
    "statement": "An `async` function returns a Promise even when returning a plain primitive value.",
    "truth": true,
    "explanation": "Functions marked `async` automatically wrap their return values inside a resolved Promise. Callers must use `await` or `.then()` to access the resolved value.",
    "level": "junior",
    "category": "javascript",
    "subject": "async-await",
    "codeSnippet": "async function getValue() {\n  return 42;\n}\nconst result = getValue(); // Promise<number>",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-066",
    "statement": "`await` halts the entire JavaScript main thread until the Promise resolves.",
    "truth": false,
    "explanation": "`await` pauses only the execution of the enclosing async function and yields control back to the event loop. Other scripts, events, and UI rendering continue uninterrupted.",
    "level": "junior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "async function loadData() {\n  await fetch(\"/api/users\");\n  console.log(\"Users loaded\");\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-067",
    "statement": "`Promise.all` **always** returns results in input order, whatever the settle order.",
    "truth": true,
    "explanation": "Another absolute that holds: results are positional, so index 0 carries the first input's value even if it resolved last. Reach for `allSettled` when you also need per-item failure.",
    "level": "junior",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-068",
    "statement": "`satisfies` checks this object while keeping the literal keys `red` and `green`.",
    "truth": true,
    "explanation": "An annotation would replace the inferred type with `Record<string, string>` and lose the keys. `satisfies` **verifies** compatibility instead of reinterpreting, so `palette.red` stays known.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "const palette = {\n  red: \"#f00\",\n  green: \"#0f0\",\n} satisfies Record<string, string>;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-069",
    "statement": "This `default` branch compiles only while **every** `kind` is handled.",
    "truth": true,
    "explanation": "Exhaustive narrowing leaves `never`, and `never` is the only type assignable to `never`. Add a third variant and this line becomes the error that points you at the gap.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "switch (shape.kind) {\n  case \"circle\": return shape.radius;\n  case \"square\": return shape.size;\n  default: {\n    const exhaustive: never = shape;\n    return exhaustive;\n  }\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-070",
    "statement": "The constraint is what lets this body read `value.length`.",
    "truth": true,
    "explanation": "`extends` both restricts the accepted type arguments and exposes the constraint's members inside the function. Drop it and `T` could be anything, so `.length` is rejected.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "function sizeOf<T extends { length: number }>(value: T) {\n  return value.length;\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-071",
    "statement": "`key` is restricted to the keys of whichever `T` is passed.",
    "truth": true,
    "explanation": "`K extends keyof T` ties the key to the object and `T[K]` resolves the matching value type. Typing `key: string` instead would collapse the return to a union of every property type.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-072",
    "statement": "The `in` check narrows `pet` to the member that has `swim`.",
    "truth": true,
    "explanation": "`in` is a recognised guard for object unions, so the `else` branch is `Bird`. Because it tests property presence, it suits unions with no shared discriminant field.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "type Fish = { swim(): void };\ntype Bird = { fly(): void };\nfunction move(pet: Fish | Bird) {\n  if (\"swim\" in pet) pet.swim();\n  else pet.fly();\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-073",
    "statement": "`fetch` rejects this promise when the server answers **404**.",
    "truth": false,
    "explanation": "`fetch` rejects only on network failure — a 404 is a perfectly valid response. Check `response.ok` and throw yourself, or `json()` will try to parse the error page.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "data-fetching",
    "codeSnippet": "const response = await fetch(\"/missing\");\nconst data = await response.json();",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-074",
    "statement": "A fresh object literal is checked for excess properties; a variable is not.",
    "truth": true,
    "explanation": "The extra check fires exactly where typos happen — at the literal. Assigning through a variable only requires the target's members, so extra properties come along silently.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-075",
    "statement": "In `type C = A & B`, values assigned to `C` must satisfy **both** `A` and `B`.",
    "truth": true,
    "explanation": "An intersection (`&`) requires values to satisfy both sides. Overlapping primitives narrow to their shared subtype (here `\"test\" | \"123\"`), while conflicting types reduce to `never`.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type A = string;\ntype B = \"test\" | \"123\";\n\ntype C = A & B;\nconst item: C = \"test\";",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-076",
    "statement": "TypeScript **verifies** that a type predicate body proves its return type.",
    "truth": false,
    "explanation": "Type predicates are treated as trusted assertions, never verified against the body. An incorrect predicate compiles without error and creates unsound type narrowings downstream.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "type User = { id: string; name: string };\nfunction isUser(v: unknown): v is User {\n  return true; // compiles without error\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-077",
    "statement": "With `noUncheckedIndexedAccess`, array element lookups include `undefined`.",
    "truth": true,
    "explanation": "By default TypeScript assumes element index lookups always succeed. Enabling `noUncheckedIndexedAccess` forces callers to safely handle out-of-bounds `undefined` values.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "const list: string[] = [\"Ada\", \"Grace\"];\nconst first: string | undefined = list[0];",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-078",
    "statement": "The non-null assertion `!` throws an error at runtime if the value is null.",
    "truth": false,
    "explanation": "The `!` assertion is purely compile-time and erased during build. If the value is `null` at runtime, execution continues unchecked and throws an unhandled `TypeError` on access.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function greet(name: string | null) {\n  console.log(name!.toUpperCase());\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-079",
    "statement": "Starting both promises before awaiting either overlaps their waiting time.",
    "truth": true,
    "explanation": "Kicking off both operations and then awaiting them lets the latency run in parallel, even on a single thread. Awaiting the first before starting the second adds the two durations together.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-080",
    "statement": "`Promise.all` waits for **every** input to settle before it rejects.",
    "truth": false,
    "explanation": "It rejects as soon as the **first** rejection arrives. The remaining operations keep running unobserved, which is how an unhandled rejection surfaces long after the failure.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-081",
    "statement": "An aborted controller cancels operations that never received its signal.",
    "truth": false,
    "explanation": "Cancellation is **cooperative**: only code handed the `signal` can react to it. A `fetch` called without `{ signal }` runs to completion however often you call `abort()`.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "async-await"
  },
  {
    "id": "bc-082",
    "statement": "Calling `.text()` after `.json()` on the same `Response` object throws an error.",
    "truth": true,
    "explanation": "The body of a `Response` is a single-use stream (`ReadableStream`). Once consumed by a reader method like `.json()` or `.text()`, the stream is locked and cannot be read again.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "data-fetching",
    "codeSnippet": "const res = await fetch(\"/api/data\");\nconst json = await res.json();\nconst text = await res.text(); // throws TypeError",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-083",
    "statement": "A generic function requires the caller to specify type arguments **explicitly**.",
    "truth": false,
    "explanation": "TypeScript infers generic arguments directly from the passed values in most cases. Explicit arguments like `first<number>(...)` are needed only when inference lacks context.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst num = first([1, 2, 3]); // inferred number",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-084",
    "statement": "`Result` here is `string[] | number[]`.",
    "truth": true,
    "explanation": "A **naked** type parameter makes the conditional distribute across each union member, giving a union of arrays rather than an array of the union. Wrapping `T` in a tuple would stop that.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type ToArray<T> = T extends unknown ? T[] : never;\ntype Result = ToArray<string | number>;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-085",
    "statement": "Wrapping both sides in tuples makes `Result` `(string | number)[]`.",
    "truth": true,
    "explanation": "`[T] extends [unknown]` tests the union **as a whole**, so no distribution happens. This is the standard trick whenever a conditional type must not split a union apart.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type ToArray<T> = [T] extends [unknown] ? T[] : never;\ntype Result = ToArray<string | number>;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-086",
    "statement": "`infer R` is what captures the function's return type here.",
    "truth": true,
    "explanation": "`infer` declares a type variable inside a conditional's `extends` clause and binds it to the matched position. It is legal **only** there — anywhere else is a syntax error.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type ReturnTypeOf<T> =\n  T extends (...args: never[]) => infer R ? R : never;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-087",
    "statement": "Under `strictFunctionTypes` this assignment is rejected.",
    "truth": true,
    "explanation": "`handleAnimal` promises to accept **any** `Animal`, but `handleDog` calls `bark()`. Parameters are checked contravariantly, so a narrower handler cannot stand in for a wider one.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type Animal = { name: string };\ntype Dog = Animal & { bark(): void };\nlet handleAnimal: (a: Animal) => void;\nconst handleDog = (d: Dog) => d.bark();\nhandleAnimal = handleDog;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-088",
    "statement": "`source` is assignable to `User` despite carrying an extra `password`.",
    "truth": true,
    "explanation": "Excess property checking applies to fresh literals, not to variables, so the extra field rides along. This is precisely how a secret leaks into a response that looks correctly typed.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type User = { id: string };\nconst source = { id: \"1\", password: \"secret\" };\nconst user: User = source;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-089",
    "statement": "After this call returns, `value` is narrowed to `string` for the rest of the block.",
    "truth": true,
    "explanation": "An `asserts` signature tells control-flow analysis that a normal return proves the condition. Like a type predicate the body is **trusted**, so a wrong implementation silently corrupts narrowing.",
    "level": "senior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function assertString(value: unknown): asserts value is string {\n  if (typeof value !== \"string\") throw new TypeError();\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-090",
    "statement": "`B` logs in a later microtask rather than synchronously after `A`.",
    "truth": true,
    "explanation": "`await` **always** yields, even on an already-resolved promise, so the continuation is queued. Any synchronous code following the call runs before `B` appears.",
    "level": "senior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "console.log(\"A\");\nawait Promise.resolve();\nconsole.log(\"B\");",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-091",
    "statement": "`never` is assignable to every type, yet no value can be assigned to `never`.",
    "truth": true,
    "explanation": "As the empty bottom type, `never` is a subtype of every type and can be assigned anywhere. However, no concrete value other than `never` itself can be assigned into it.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "function fail(): never {\n  throw new Error(\"failed\");\n}\nconst text: string = fail(); // valid assignment",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-092",
    "statement": "`keyof (A | B)` yields only property names shared by **both** union members.",
    "truth": false,
    "explanation": "A value of type `A | B` is guaranteed to contain only keys present on both shapes. Taking `keyof` over a union therefore intersects their key sets, yielding `\"id\"` only.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type A = { id: string; name: string };\ntype B = { id: string; age: number };\ntype Keys = keyof (A | B); // \"id\"",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-093",
    "statement": "A mapped type `as` clause can rename keys or filter them by returning `never`.",
    "truth": true,
    "explanation": "The `as` clause re-maps keys via template literals or conditional types. Filtering is done by returning `never`, which strips that key entirely from the resulting object type.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-094",
    "statement": "Declaration merging works for type aliases the **same** as for interfaces.",
    "truth": false,
    "explanation": "Interfaces with matching names in the same scope merge their members into a single contract. Type aliases cannot share names and throw duplicate identifier errors.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "interface User { name: string; }\ninterface User { age: number; } // merges into { name, age }\n// type User = { ... } // Duplicate identifier error",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-095",
    "statement": "Under `useUnknownInCatchVariables`, caught errors require narrowing before use.",
    "truth": true,
    "explanation": "JavaScript allows throwing any value (`throw \"boom\"` or `throw 42`). This flag types `err` as `unknown` instead of `any`, forcing developers to narrow errors safely.",
    "level": "senior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "try {\n  fetch(\"/api\");\n} catch (err) {\n  if (err instanceof Error) console.log(err.message);\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-096",
    "statement": "`Promise.allSettled` resolves only after **every** input promise settles.",
    "truth": true,
    "explanation": "Unlike `Promise.all` which rejects on the first failure, `Promise.allSettled` waits for all inputs to finish, returning an array describing each status (`fulfilled` or `rejected`).",
    "level": "senior",
    "category": "javascript",
    "subject": "concurrency",
    "codeSnippet": "const results = await Promise.allSettled([\n  Promise.resolve(1),\n  Promise.reject(\"err\")\n]);",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-097",
    "statement": "When `Promise.race` settles, slower pending promises are cancelled automatically.",
    "truth": false,
    "explanation": "`Promise.race` resolves or rejects with the first settled result, but slower promises continue running in the background unless explicitly cancelled via an `AbortController` signal.",
    "level": "senior",
    "category": "javascript",
    "subject": "concurrency",
    "codeSnippet": "Promise.race([\n  fetch(\"/fast-endpoint\"),\n  fetch(\"/slow-endpoint\") // continues running!\n]);",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-098",
    "statement": "Limiting concurrency can matter even when `Promise.all` would give the right answer.",
    "truth": true,
    "explanation": "Correctness and capacity are separate problems: a thousand parallel requests can exhaust sockets, memory, or a rate limit. Batch the work or run it through a pool.",
    "level": "senior",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-099",
    "statement": "Asserting an API payload to an interface still leaves it unvalidated.",
    "truth": true,
    "explanation": "The assertion is erased and inspects nothing, so a renamed field fails at the first property read instead of at the boundary. Parse with a schema where the data arrives.",
    "level": "senior",
    "category": "typescript",
    "subject": "data-fetching"
  },
  {
    "id": "bc-100",
    "statement": "A discriminated union stays exhaustively checkable only while its tag keeps literal types.",
    "truth": true,
    "explanation": "Widen the tag to `string` and control flow can no longer tell the members apart, so the `never` check quietly stops catching missing cases. `as const` preserves the literals.",
    "level": "senior",
    "category": "typescript",
    "subject": "narrowing"
  },
  {
    "id": "bc-101",
    "statement": "Seeding state from a prop keeps the two **in sync** as the prop changes.",
    "truth": false,
    "explanation": "`useState(value)` reads the prop once, while mounting; later prop changes never reach that state. Derive the value during render, or change the component's `key` to remount it.",
    "level": "junior",
    "category": "react",
    "subject": "hooks",
    "codeSnippet": "function Field({ value }) {\n  const [draft, setDraft] = useState(value);\n  return <input value={draft} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-102",
    "statement": "JSX compiles to **HTML strings** that React inserts into the document.",
    "truth": false,
    "explanation": "It compiles to `React.createElement` calls producing plain JavaScript objects — the element tree React diffs. HTML is only what the DOM ends up holding.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-103",
    "statement": "`useRef` is the right home for a value the UI **displays**.",
    "truth": false,
    "explanation": "Writing to `.current` never schedules a render, so the screen keeps showing the old value. Refs suit values the UI does not read: timers, DOM nodes, the previous prop.",
    "level": "junior",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-104",
    "statement": "Two components calling the same custom Hook get **independent** state.",
    "truth": true,
    "explanation": "A Hook is a function, not a store: every call site allocates its own state cells. Sharing requires lifting the state up or putting it behind a provider.",
    "level": "junior",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "function useCounter() {\n  const [n, setN] = useState(0);\n  return [n, setN] as const;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-105",
    "statement": "`useMemo` and `useCallback` belong on **every** computed value and handler.",
    "truth": false,
    "explanation": "Each one costs a dependency comparison plus retained memory on every render. They pay off when a memoized child depends on the identity, or the computation is genuinely expensive.",
    "level": "junior",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-106",
    "statement": "This portal's child reads context from where it is **written**, not where it lands.",
    "truth": true,
    "explanation": "A portal relocates the DOM node only. Context, events, and error boundaries all follow the React tree, so a click still bubbles to the React parent.",
    "level": "junior",
    "category": "react",
    "subject": "rendering-keys",
    "codeSnippet": "<ThemeContext value=\"dark\">\n  {createPortal(<Toast />, document.body)}\n</ThemeContext>",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-107",
    "statement": "Returning `false` from a React handler does **not** prevent the default action.",
    "truth": true,
    "explanation": "That shortcut belongs to inline HTML handlers and jQuery. React honours only an explicit `event.preventDefault()` on the synthetic event.",
    "level": "junior",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-108",
    "statement": "An object value satisfies an interface **without** an `implements` keyword.",
    "truth": true,
    "explanation": "TypeScript uses structural subtyping: if a value provides all required members with compatible types, it matches the interface. Nominal declarations are not required.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "interface User { id: string; name: string; }\nconst user = { id: \"1\", name: \"Ada\", role: \"admin\" };\nconst validUser: User = user;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-109",
    "statement": "TypeScript prevents runtime errors from a malformed API response.",
    "truth": false,
    "explanation": "It checks only what is visible at compile time, and every annotation is erased. A response whose shape drifted fails at the first property read, with no type error anywhere.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-110",
    "statement": "`A` and `B` here describe the **same** type.",
    "truth": false,
    "explanation": "`Partial` changes optionality across every key; `Pick` selects keys and leaves them required. `A` has an optional `id` and `name`, `B` has a required `id` only.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type User = { id: string; name: string };\ntype A = Partial<User>;\ntype B = Pick<User, \"id\">;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-111",
    "statement": "`typeof null === \"object\"` lets `null` reach the property access here.",
    "truth": true,
    "explanation": "TypeScript models the old JavaScript wart faithfully, so `value` is `object | null` inside the branch. Add `value !== null` to the condition before reading `id`.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function read(value: unknown) {\n  if (typeof value === \"object\") {\n    return (value as { id: string }).id;\n  }\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-112",
    "statement": "A generic parameter preserves the input type where `any` **discards** it.",
    "truth": true,
    "explanation": "Generics capture the precise type passed by the caller (like string literals), preserving type safety. Using `any` throws away type information and disables checking.",
    "level": "junior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "function wrap<T>(val: T): { data: T } {\n  return { data: val };\n}\nconst res = wrap(\"hello\"); // { data: string }",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-113",
    "statement": "Every `.ts` file automatically gets its **own module scope**.",
    "truth": false,
    "explanation": "Without a top-level `import` or `export` the file is a script sharing the global scope, which is how two files collide on the same `const`. Adding `export {}` makes it a module.",
    "level": "junior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-114",
    "statement": "`private` is erased at compile time; `#secret` survives into JavaScript.",
    "truth": true,
    "explanation": "`private` is an annotation, so `(account as any).balance` still reads it at runtime. `#secret` is a real ECMAScript private field and is genuinely inaccessible from outside.",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "class Account {\n  private balance = 0;\n  #secret = \"pin\";\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-115",
    "statement": "A `boolean` return type is **enough** for a helper to narrow at the call site.",
    "truth": false,
    "explanation": "The compiler will not infer a guard from the body — you must declare `value is User`. Without the predicate the result is an ordinary boolean and nothing narrows.",
    "level": "junior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "function isUser(v: unknown): boolean {\n  return typeof v === \"object\" && v !== null;\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-116",
    "statement": "`void` and `never` differ: a `void` function returns, `never` never returns.",
    "truth": true,
    "explanation": "`void` represents completing execution without returning a useful value. `never` means the function never successfully completes (always throws or enters an infinite loop).",
    "level": "junior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "function log(): void { console.log(\"done\"); }\nfunction crash(): never { throw new Error(\"halt\"); }",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-117",
    "statement": "This prints `t` before `p`.",
    "truth": false,
    "explanation": "It prints `p` first. A timeout is a **macrotask**, and the event loop drains the whole microtask queue before reaching one. Zero is a minimum delay, not a priority.",
    "level": "junior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "setTimeout(() => console.log(\"t\"), 0);\nPromise.resolve().then(() => console.log(\"p\"));",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-118",
    "statement": "All three functions here log **3**.",
    "truth": true,
    "explanation": "`var` has a single function-scoped binding, so every closure observes its final value. Switching to `let` gives each iteration its own binding and logs 0, 1, 2.",
    "level": "junior",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "const fns = [];\nfor (var i = 0; i < 3; i++) {\n  fns.push(() => console.log(i));\n}\nfns.forEach(fn => fn());",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-119",
    "statement": "A closure **re-evaluates** the expression it captured when it is finally called.",
    "truth": false,
    "explanation": "It closes over the binding, and that binding already holds a finished value. Only reassigning the variable changes what the closure sees later.",
    "level": "junior",
    "category": "javascript",
    "subject": "closures"
  },
  {
    "id": "bc-120",
    "statement": "An `async` function's body runs **synchronously** up to its first `await`.",
    "truth": true,
    "explanation": "Calling it executes eagerly until the first suspension point, then hands back a pending promise. Work you meant to defer has to sit after an `await`.",
    "level": "junior",
    "category": "javascript",
    "subject": "async-await"
  },
  {
    "id": "bc-121",
    "statement": "Reading `child.tags` gives the child its **own copy** of the array.",
    "truth": false,
    "explanation": "The read walks the prototype chain and returns the same reference, so `push` mutates the shared array and both objects change. Assigning with `=` is what creates an own property.",
    "level": "junior",
    "category": "javascript",
    "subject": "design-patterns",
    "codeSnippet": "const parent = { tags: [] };\nconst child = Object.create(parent);\nchild.tags.push(\"a\");",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-122",
    "statement": "`Promise.all` returns the values that succeeded when one input rejects.",
    "truth": false,
    "explanation": "You get a rejection, and the successful values are discarded with it. `Promise.allSettled` is the variant that reports every outcome individually.",
    "level": "junior",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-123",
    "statement": "`await` inside a loop lets the next iteration start while the promise is pending.",
    "truth": false,
    "explanation": "`await` suspends the whole function, so each iteration waits for the previous one. Start every promise first and `await Promise.all` when you want the overlap.",
    "level": "junior",
    "category": "javascript",
    "subject": "event-loop"
  },
  {
    "id": "bc-124",
    "statement": "A nested regular `function` inherits `this` from its outer enclosing method.",
    "truth": false,
    "explanation": "Regular functions bind their own `this` based on how they are invoked. Inside `setTimeout`, `this` defaults to `window` or `undefined`. Use arrow functions to retain outer `this`.",
    "level": "junior",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "const counter = {\n  count: 0,\n  start() {\n    setTimeout(function() { this.count++; }, 10);\n  }\n};",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-125",
    "statement": "This awaits each save before starting the next.",
    "truth": false,
    "explanation": "`forEach` ignores the promise each callback returns, so every save starts at once and the loop finishes immediately. Use `for...of` with `await`, or `Promise.all` over a `map`.",
    "level": "junior",
    "category": "javascript",
    "subject": "async-await",
    "codeSnippet": "items.forEach(async (item) => {\n  await save(item);\n});",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-126",
    "statement": "In JavaScript, evaluating `typeof NaN` returns the string `\"number\"`.",
    "truth": true,
    "explanation": "In IEEE 754 floating-point standards, `NaN` (Not-a-Number) is a special numeric value representing undefined mathematical results. Its primitive type remains `number`.",
    "level": "junior",
    "category": "javascript",
    "subject": "design-patterns",
    "codeSnippet": "const result = 0 / 0; // NaN\nconsole.log(typeof result); // \"number\"",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-127",
    "statement": "An error boundary catches an error thrown inside this click handler.",
    "truth": false,
    "explanation": "Boundaries catch errors thrown during **render**, in lifecycles, and in constructors below them. A handler runs outside that window, so it needs its own `try/catch`.",
    "level": "intermediate",
    "category": "react",
    "subject": "rendering-keys",
    "codeSnippet": "<ErrorBoundary>\n  <button onClick={() => { throw new Error(\"boom\"); }}>\n    Go\n  </button>\n</ErrorBoundary>",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-128",
    "statement": "A dependency array cannot stop the effect firing on **mount**.",
    "truth": true,
    "explanation": "Dependencies mean 'after every render where one changed', and the first render always counts as a change. Skipping the initial run takes a ref guard.",
    "level": "intermediate",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-129",
    "statement": "This `memo` never hits, because `tags` is a fresh array each render.",
    "truth": true,
    "explanation": "`[]` allocates a new array every render, so `Object.is` fails on the prop and the comparison always re-renders. Hoist the empty array to a module constant.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance",
    "codeSnippet": "const Row = memo(({ tags }) => <li>{tags.length}</li>);\nfunction List() {\n  return <Row tags={[]} />;\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-130",
    "statement": "Moving a value into context is generally cheaper than restructuring components.",
    "truth": false,
    "explanation": "Every consumer re-renders whenever the provider value changes, so context trades prop drilling for a **wider render surface**. Lifting state or passing `children` often costs less.",
    "level": "intermediate",
    "category": "react",
    "subject": "state-management"
  },
  {
    "id": "bc-131",
    "statement": "Virtual DOM diffing is **faster** than a targeted direct DOM update.",
    "truth": false,
    "explanation": "The diff is extra work layered on top of the same DOM writes, so hand-tuned updates win on raw speed. Its value is correct, batched updates you did not have to write.",
    "level": "intermediate",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-132",
    "statement": "The `exhaustive-deps` rule exists to catch **stale closure** bugs.",
    "truth": true,
    "explanation": "A missing dependency freezes whatever the effect captured on its last run. Silencing the rule is how a subscription keeps calling last week's `onChange`.",
    "level": "intermediate",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-133",
    "statement": "`React.lazy` handles code-splitting during server rendering too.",
    "truth": false,
    "explanation": "`React.lazy` targets the client and has no server story of its own; SSR splitting comes from the framework's dynamic import. Suspense supplies the fallback, not the split.",
    "level": "intermediate",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-134",
    "statement": "`Window` ends up with **both** `theme` and `locale`.",
    "truth": true,
    "explanation": "Interfaces of the same name merge, which is what makes them the tool for augmenting a library's types. Two `type` aliases with one name would be a duplicate-identifier error.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "interface Window { theme: string }\ninterface Window { locale: string }",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-135",
    "statement": "`<T = string>` restricts `T` to `string`.",
    "truth": false,
    "explanation": "`=` supplies a **default** used only when inference has nothing to work from; `extends` is what restricts. Here `Box<number>` is still perfectly legal.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type Box<T = string> = { value: T };\ntype N = Box<number>;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-136",
    "statement": "Narrowing a `let` persists inside a callback defined after the check.",
    "truth": false,
    "explanation": "The compiler assumes the callback may run later, once the binding could have been reassigned, so it resets to the declared type. Copy the value into a `const` first.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "let name: string | null = get();\nif (name !== null) {\n  run(() => name.toUpperCase());\n}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-137",
    "statement": "`Record<string, T>` provides stricter type checking than `{ [k: string]: T }`.",
    "truth": false,
    "explanation": "`Record<string, T>` is implemented under the hood as `{ [P in string]: T }`, which produces the exact same type representation and semantics as a string index signature.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type DictA = Record<string, number>;\ntype DictB = { [key: string]: number };",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-138",
    "statement": "Without `Awaited`, `Data` would still be a `Promise`.",
    "truth": true,
    "explanation": "`ReturnType` yields the declared return type, and for an `async` function that is `Promise<T>`. `Awaited` unwraps it, recursively when promises nest.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "async function load() { return { id: \"1\" }; }\ntype Data = Awaited<ReturnType<typeof load>>;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-139",
    "statement": "An overload's implementation signature is **not** callable by consumers.",
    "truth": true,
    "explanation": "Only the declared overloads are visible, so a permissive implementation signature never widens the public API. It exists to satisfy the compiler inside the body.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-140",
    "statement": "This assignment widens `status` to accept the new string.",
    "truth": false,
    "explanation": "A declared union is fixed; only an **inferred** `let` widens to `string`. Add `\"idle\"` to the union, or drop the annotation and let inference do it.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "let status: \"on\" | \"off\" = \"on\";\nstatus = \"idle\";",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-141",
    "statement": "`import type` ensures an import is stripped completely from emitted JavaScript.",
    "truth": true,
    "explanation": "`import type` explicitly marks imports as type-only. Compilers guarantee they are erased completely from JavaScript bundles, avoiding unwanted runtime side effects or cycles.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "import type { Config } from \"./config\";\nexport function setup(cfg: Config) { return true; }",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-142",
    "statement": "The `in` and `out` annotations describe assignability, not what `T` may be.",
    "truth": true,
    "explanation": "They tell the checker how two instantiations relate so it can skip structural comparison. Restricting the argument itself is still `extends`.",
    "level": "intermediate",
    "category": "typescript",
    "subject": "generics"
  },
  {
    "id": "bc-143",
    "statement": "This logs `1 2 3`.",
    "truth": false,
    "explanation": "It logs `1 3 2`: synchronous code first, then the microtask queue, then the timer. Microtasks always drain before the next macrotask runs.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-144",
    "statement": "`count` stays alive after `makeCounter` returns.",
    "truth": true,
    "explanation": "The returned function closes over the binding, so the variable outlives the call that created it. This is how module-style privacy works without a class.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-145",
    "statement": "A rejected promise with no handler crashes the process immediately.",
    "truth": false,
    "explanation": "It emits `unhandledrejection` first. Node can be configured to exit on it, browsers only log, and either way the failure may surface far from its origin.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "async-await"
  },
  {
    "id": "bc-146",
    "statement": "`Promise.any` skips the rejection and resolves with the **first success**.",
    "truth": true,
    "explanation": "`race` adopts whatever settles first, rejection included, so it would reject here. `any` waits for a fulfilment and rejects only if every input fails, with an `AggregateError`.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "concurrency",
    "codeSnippet": "await Promise.any([\n  Promise.reject(new Error(\"a\")),\n  Promise.resolve(\"b\"),\n]);",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-147",
    "statement": "An arrow function's `this` can be redirected with `call` or `bind`.",
    "truth": false,
    "explanation": "An arrow captures `this` **lexically** where it was defined, and neither `call` nor `bind` can override that. Use a regular function when the caller must supply `this`.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "const arrow = () => this.id;\narrow.call({ id: 1 });",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-148",
    "statement": "`Object.freeze` makes the **whole object graph** immutable.",
    "truth": false,
    "explanation": "Freezing is **shallow**: it seals the top level's own properties, so `config.db.host = \"x\"` still succeeds. Deep immutability needs a recursive freeze.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "design-patterns",
    "codeSnippet": "const config = Object.freeze({ db: { host: \"a\" } });\nconfig.db.host = \"b\";",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-149",
    "statement": "This `catch` block handles a rejection from `fetchData`.",
    "truth": false,
    "explanation": "With no `await` the call returns a promise and the block exits before it settles, so the rejection escapes entirely. Add `await`, or attach `.catch()` to the promise.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "async-await",
    "codeSnippet": "try {\n  fetchData();\n} catch (error) {\n  report(error);\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-150",
    "statement": "A long synchronous loop delays timers but still lets promise callbacks run.",
    "truth": false,
    "explanation": "Both queues wait for the call stack to empty, because there is one thread — painting stalls too. Chunk the work or move it to a worker.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "event-loop"
  },
  {
    "id": "bc-151",
    "statement": "This runs the uploads one at a time.",
    "truth": false,
    "explanation": "`map` with an `async` callback starts **every** call immediately and collects the promises; nothing serialises them. `for...of` with `await` is the sequential form.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "concurrency",
    "codeSnippet": "const results = await Promise.all(\n  files.map(async (file) => upload(file))\n);",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-152",
    "statement": "A `fetch` answering 500 throws, so the surrounding `catch` handles it.",
    "truth": false,
    "explanation": "Only network-level failures reject; a 500 fulfils like any other response. Test `response.ok` and throw deliberately, or the error passes as data.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "data-fetching",
    "codeSnippet": "try {\n  const r = await fetch(\"/api\");\n  return await r.json();\n} catch {\n  return null;\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-153",
    "statement": "This logs `0 1 2`.",
    "truth": true,
    "explanation": "`let` creates a fresh binding each iteration, and each callback captures its own. `var` would share one binding and log `3 3 3`.",
    "level": "intermediate",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-154",
    "statement": "A `useMemo` cache is **shared by every instance** of the component.",
    "truth": false,
    "explanation": "Hook state is **per instance**, so each mounted copy keeps its own cache and loses it on unmount. Cross-instance reuse needs a module-level `Map` or `React.cache` on the server.",
    "level": "senior",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-155",
    "statement": "`\"use client\"` stops the component rendering on the server.",
    "truth": false,
    "explanation": "Client Components still render on the server to produce the initial HTML; the directive marks where **hydration** begins and moves the code into the client bundle. It does not opt out of SSR.",
    "level": "senior",
    "category": "react",
    "subject": "server-components"
  },
  {
    "id": "bc-156",
    "statement": "The function from `useEffectEvent` belongs in the effect's dependency array.",
    "truth": false,
    "explanation": "It is deliberately **stable** while still reading the latest props and state. Listing it changes nothing, and needing it at all is a signal the logic wanted an event handler.",
    "level": "senior",
    "category": "react",
    "subject": "hooks"
  },
  {
    "id": "bc-157",
    "statement": "Streaming SSR can flush HTML before every query resolves, bounded by Suspense.",
    "truth": true,
    "explanation": "`renderToPipeableStream` sends the shell immediately, then patches in each boundary as its data arrives. This is why time-to-first-byte stops tracking the slowest query.",
    "level": "senior",
    "category": "react",
    "subject": "rendering-keys"
  },
  {
    "id": "bc-158",
    "statement": "These two setters cause **two** renders.",
    "truth": false,
    "explanation": "React batches both into a single render pass, so splitting related values across Hooks costs clarity rather than performance. Updates from promises and timers batch too under `createRoot`.",
    "level": "senior",
    "category": "react",
    "subject": "state-management",
    "codeSnippet": "function onSubmit() {\n  setName(\"Ada\");\n  setDirty(true);\n}",
    "codeLanguage": "tsx"
  },
  {
    "id": "bc-159",
    "statement": "Subscribing to a derived boolean re-renders less than reading the raw value.",
    "truth": true,
    "explanation": "A component re-renders when what it reads changes, so selecting `count > 0` collapses hundreds of counts into two states. This is why store selectors return the narrowest useful thing.",
    "level": "senior",
    "category": "react",
    "subject": "performance"
  },
  {
    "id": "bc-160",
    "statement": "`extends` and `&` behave identically when a member conflicts.",
    "truth": false,
    "explanation": "`interface B extends A` **errors** on an incompatible member, while an intersection quietly reduces that property to `never`. One reports the conflict; the other hides it until use.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "type A = { id: string };\ninterface B extends A { id: number }\ntype C = A & { id: number };",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-161",
    "statement": "This `DeepReadonly` is safe to ship.",
    "truth": false,
    "explanation": "It recurses into primitives, functions, `Map`, and `Set`, mangling every one of them. A usable version needs a conditional that stops at anything other than a plain object or array.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type DeepReadonly<T> = {\n  readonly [K in keyof T]: DeepReadonly<T[K]>;\n};",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-162",
    "statement": "`declare` emits nothing, so it cannot collide with a second declaration.",
    "truth": true,
    "explanation": "It only describes something that already exists at runtime. A `const` emits a binding, and declaring the same binding twice in one scope is an error.",
    "level": "senior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-163",
    "statement": "`isolatedModules` changes how TypeScript **emits** modules.",
    "truth": false,
    "explanation": "It constrains the **syntax you may write** so each file can be transpiled alone — no ambiguous type-only re-export, no cross-file `const enum`. Output format is still governed by `module`.",
    "level": "senior",
    "category": "typescript",
    "subject": "types"
  },
  {
    "id": "bc-164",
    "statement": "A discriminated union narrows on any property the members share.",
    "truth": false,
    "explanation": "Narrowing needs a **literal-typed** discriminant; a shared `string` field tells control flow nothing. Give each member a distinct tag, or reach for `in`.",
    "level": "senior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "type Shape =\n  | { kind: string; radius: number }\n  | { kind: string; size: number };",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-165",
    "statement": "`Ev` is `\"onClick\" | \"onFocus\"`, not a widened `string`.",
    "truth": true,
    "explanation": "A template literal type distributes across the union it interpolates. This is what makes typed event-name, route, and CSS-property helpers possible.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type Ev = `on${\"Click\" | \"Focus\"}`;",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-166",
    "statement": "TypeScript decorators are erased at compile time without producing runtime code.",
    "truth": false,
    "explanation": "Decorators are runtime functions invoked when classes, methods, or properties are defined. Unlike type annotations which vanish, decorators execute JavaScript code at runtime.",
    "level": "senior",
    "category": "typescript",
    "subject": "types",
    "codeSnippet": "function log(target: any) {\n  console.log(\"Class evaluated:\", target.name);\n}\n@log\nclass Service {}",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-167",
    "statement": "`keyof T` is assignable to `string` inside a mapped type's `as` clause.",
    "truth": false,
    "explanation": "A key can be `string | number | symbol`, so the clause needs `string & K` before a template literal will accept it. Without that intersection the mapped type errors.",
    "level": "senior",
    "category": "typescript",
    "subject": "generics",
    "codeSnippet": "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<K>}`]: () => T[K];\n};",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-168",
    "statement": "The `\"prop\" in obj` check evaluates to `true` even when `obj.prop` is `undefined`.",
    "truth": true,
    "explanation": "The `in` operator checks for property key existence on the object or its prototype. An explicit key set to `undefined` returns `true`, whereas direct property access reads `undefined`.",
    "level": "senior",
    "category": "typescript",
    "subject": "narrowing",
    "codeSnippet": "const user = { role: undefined };\nconsole.log(\"role\" in user); // true",
    "codeLanguage": "typescript"
  },
  {
    "id": "bc-169",
    "statement": "`B` logs before `A` because a `.then` outranks an `await` continuation.",
    "truth": false,
    "explanation": "`A` logs first. Both are microtasks resolved in **queue order**, and the `await` was reached during the synchronous pass. What matters is when a callback was queued, not its syntax.",
    "level": "senior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "(async () => { await null; console.log(\"A\"); })();\nPromise.resolve().then(() => console.log(\"B\"));",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-170",
    "statement": "Each wrapper returned by `once` gets its **own** `called` flag.",
    "truth": true,
    "explanation": "Every invocation of `once` creates a new scope, so the returned function closes over a private flag. Hoisting `called` outside would make all wrappers share one.",
    "level": "senior",
    "category": "javascript",
    "subject": "closures",
    "codeSnippet": "function once(fn) {\n  let called = false;\n  return (...args) => {\n    if (called) return;\n    called = true;\n    return fn(...args);\n  };\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-171",
    "statement": "Awaiting in a loop over 100 URLs differs from `Promise.all` only in style.",
    "truth": false,
    "explanation": "The loop makes 100 **sequential** round trips; `Promise.all` overlaps them and finishes in roughly the slowest one. The real trade-off is load on the server, which is why bounded pools exist.",
    "level": "senior",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-172",
    "statement": "`Object.keys` on a class instance **omits** its prototype methods.",
    "truth": true,
    "explanation": "It returns own enumerable keys only, and methods live on the prototype. This is why spreading an instance into a literal quietly drops its behaviour.",
    "level": "senior",
    "category": "javascript",
    "subject": "design-patterns",
    "codeSnippet": "class User { constructor() { this.id = 1; } save() {} }\nObject.keys(new User());",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-173",
    "statement": "Wrapping an `await` inside `try/catch` intercepts the Promise's rejection.",
    "truth": true,
    "explanation": "`await` converts promise rejections into thrown exceptions within the async function scope. Surrounding the `await` with `try/catch` catches the error synchronously.",
    "level": "senior",
    "category": "javascript",
    "subject": "async-await",
    "codeSnippet": "async function run() {\n  try {\n    await Promise.reject(new Error(\"fail\"));\n  } catch (err) {\n    console.log(\"caught rejection\");\n  }\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-174",
    "statement": "`queueMicrotask` and `setTimeout(fn, 0)` schedule into the same queue.",
    "truth": false,
    "explanation": "`queueMicrotask` joins the **microtask** queue, which drains completely before the next macrotask; `setTimeout` is a macrotask. A microtask that re-queues itself can starve timers indefinitely.",
    "level": "senior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "setTimeout(() => console.log(\"timer\"), 0);\nqueueMicrotask(() => console.log(\"micro\"));",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-175",
    "statement": "Returning from inside `try` **skips** the `finally` block.",
    "truth": false,
    "explanation": "`finally` runs on **every** exit path, `return` and `throw` included — and a `return` inside it overrides the earlier one. Keep it for cleanup rather than control flow.",
    "level": "senior",
    "category": "javascript",
    "subject": "async-await",
    "codeSnippet": "function pick() {\n  try { return \"a\"; }\n  finally { console.log(\"cleanup\"); }\n}",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-176",
    "statement": "A closure over a large object releases it once the outer function returns.",
    "truth": false,
    "explanation": "The captured binding keeps that object reachable for as long as the closure lives, which is the shape of most listener leaks. Capture the single field you need instead.",
    "level": "senior",
    "category": "javascript",
    "subject": "closures"
  },
  {
    "id": "bc-177",
    "statement": "A second rejection inside `Promise.all` can surface as an unhandled rejection.",
    "truth": true,
    "explanation": "`all` adopts the first rejection and never attaches a handler to the rest, so being handled and being reported come apart. Use `allSettled`, or catch each input, when later failures matter.",
    "level": "senior",
    "category": "javascript",
    "subject": "concurrency"
  },
  {
    "id": "bc-178",
    "statement": "Reusing an aborted `AbortSignal` on a new `fetch` starts a new network request.",
    "truth": false,
    "explanation": "An `AbortSignal` with `aborted: true` immediately rejects any new `fetch` with an `AbortError` before sending network traffic. Retrying requests requires a new `AbortController`.",
    "level": "senior",
    "category": "javascript",
    "subject": "data-fetching",
    "codeSnippet": "const controller = new AbortController();\ncontroller.abort();\nawait fetch(\"/api/retry\", { signal: controller.signal });",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-179",
    "statement": "`obj.fn?.()` still throws when `fn` exists but is not callable.",
    "truth": true,
    "explanation": "Optional call guards against `fn` being `null` or `undefined`, nothing more. A number or string in that slot reaches the call and raises a `TypeError`.",
    "level": "senior",
    "category": "javascript",
    "subject": "design-patterns",
    "codeSnippet": "const obj = { fn: 42 };\nobj.fn?.();",
    "codeLanguage": "javascript"
  },
  {
    "id": "bc-180",
    "statement": "`await` on a non-promise value **skips** the microtask queue.",
    "truth": false,
    "explanation": "`await 1` still queues the continuation, because the value is wrapped in a resolved promise first. There is no synchronous fast path, which is why ordering holds even for plain values.",
    "level": "senior",
    "category": "javascript",
    "subject": "event-loop",
    "codeSnippet": "console.log(\"one\");\nawait 1;\nconsole.log(\"two\");",
    "codeLanguage": "javascript"
  }
];
