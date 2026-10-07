import { list, p, say, steps, table, trap, ts, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_PATTERNS: PrepSection = {
  id: "react-patterns",
  track: "react",
  title: "State management and patterns",
  blurb:
    "Design questions. There is rarely one right answer, so what is being assessed is whether you can name the trade-offs and say when you would choose differently.",
  drill: "state-management",
  questions: [
    {
      id: "patterns-where-state-lives",
      question: "Local state, context, or a store: how do you decide where state lives?",
      level: "intermediate",
      short:
        "Start by asking what kind of state it is. Most of what people put in a global store is really server data that belongs in a cache, or URL state that belongs in the address bar. For genuine client state, keep it as local as possible and move it outward only when something forces you to.",
      body: [
        table(
          ["Kind of state", "Examples", "Where it belongs"],
          ["Local UI", "Open or closed, input text, selected tab", "`useState` / `useReducer` in the component"],
          ["Shared UI", "Two siblings need the same value", "Lifted to the nearest common parent"],
          ["URL", "Filters, search, pagination, the current item", "Search params and route params"],
          ["Server", "Anything fetched from an API", "A query cache (TanStack Query, SWR, RTK Query) or the framework"],
          ["App-wide, rarely changing", "Theme, locale, signed-in user", "Context"],
          ["App-wide, frequently changing", "Cart, editor document, complex wizards", "A store (Zustand, Redux, Jotai)"],
          ["Form", "Field values, touched, errors", "The form itself, or a form library"],
        ),
        steps(
          "Can it be computed from existing props or state? Then it is not state.",
          "Does only one component need it? Keep it there.",
          "Do a few nearby components need it? Lift it to their common parent.",
          "Should it survive a refresh or be shareable as a link? Put it in the URL.",
          "Does it come from the server? Let a query cache own it.",
          "Is it needed all over the tree? Context if it changes rarely, a store if it changes often.",
        ),
        say(
          "I reach for a store last. Once server data moves into a query cache and filters move into the URL, what is left is usually small enough for local state and one or two contexts.",
        ),
      ],
      followUps: [
        {
          q: "Why not put everything in one global store?",
          a: "Everything becomes coupled to the store, components stop being reusable, state outlives the screen that needed it, and you rebuild by hand what a query library already does: caching, deduplication, invalidation, loading and error states.",
        },
        {
          q: "Why is the URL a good place for state?",
          a: "It survives a refresh, it works with the back button, it can be shared or bookmarked, and the server can read it for the first render. Filters kept in `useState` have none of that.",
        },
      ],
      docs: "https://react.dev/learn/managing-state",
    },
    {
      id: "patterns-prop-drilling",
      question: "What is prop drilling, and how do you avoid it?",
      level: "junior",
      short:
        "Prop drilling is passing data through components that do not use it, just to get it to a deeply nested one. A little is fine and explicit. When it hurts, the first fix is composition, so the intermediate components never see the data; then context; then a store.",
      body: [
        tsx(
          `
interface User {
  name: string;
}

function App({ user }: { user: User }) {
  return <Layout user={user} />;
}
function Layout({ user }: { user: User }) {
  return <Header user={user} />; // Layout does not care about user
}
function Header({ user }: { user: User }) {
  return <Avatar user={user} />; // neither does Header
}
function Avatar({ user }: { user: User }) {
  return <span>{user.name}</span>;
}
`,
          { caption: "Drilling", tone: "bad" },
        ),
        tsx(
          `
interface User {
  name: string;
}

function App({ user }: { user: User }) {
  // App owns the data, so App builds the element that needs it.
  return <Layout header={<Header avatar={<Avatar user={user} />} />} />;
}
function Layout({ header }: { header: ReactNode }) {
  return <div>{header}</div>;
}
function Header({ avatar }: { avatar: ReactNode }) {
  return <header>{avatar}</header>;
}
function Avatar({ user }: { user: User }) {
  return <span>{user.name}</span>;
}
`,
          { caption: "Composition: pass the element, not the data", tone: "good" },
        ),
        table(
          ["Fix", "Use when", "Cost"],
          ["Composition (`children`, slot props)", "The intermediate components are layout", "The top component gets more to assemble"],
          ["Context", "Many components at different depths need the value", "Implicit dependency; all consumers re-render on change"],
          ["A store", "The value changes often or needs selective subscriptions", "A dependency and its conventions"],
        ),
      ],
      followUps: [
        {
          q: "Is prop drilling always bad?",
          a: "No. Two or three levels of explicit props are easier to trace than context, because you can follow the data by reading the code. It becomes a problem when adding one prop means editing five files that do not care about it.",
        },
      ],
      docs: "https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context",
    },
    {
      id: "patterns-redux",
      question: "What is Redux, and how does it work? When would you not use it?",
      level: "intermediate",
      short:
        "Redux keeps application state in a single store outside the component tree. The only way to change it is to dispatch an action, a plain object describing what happened; pure functions called reducers compute the next state from the current state and the action. Components subscribe to the slices they need through selectors.",
      body: [
        list(
          "**Single source of truth.** One store holds the state tree.",
          "**State is read-only.** You never assign to it; you dispatch actions.",
          "**Changes are made by pure reducers.** `(state, action) => newState`, with no side effects, which is what makes time-travel debugging and replay possible.",
        ),
        ts(
          `
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    // Redux Toolkit runs reducers through Immer, so this "mutation" produces a new state.
    itemAdded(state, action: PayloadAction<string>) {
      const existing = state.find((item) => item.id === action.payload);
      if (existing) existing.quantity += 1;
      else state.push({ id: action.payload, quantity: 1 });
    },
    itemRemoved(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { itemAdded, itemRemoved } = cartSlice.actions;

export const store = configureStore({ reducer: { cart: cartSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`,
          { caption: "store.ts, with Redux Toolkit" },
        ),
        tsx(
          `
import { useDispatch, useSelector } from "react-redux";
import { itemAdded, type AppDispatch, type RootState } from "./store";

export function AddToCart({ productId }: { productId: string }) {
  // Re-renders only when this selected value changes, not on every store update.
  const quantity = useSelector(
    (state: RootState) => state.cart.find((item) => item.id === productId)?.quantity ?? 0,
  );
  const dispatch = useDispatch<AppDispatch>();

  return <button onClick={() => dispatch(itemAdded(productId))}>In cart: {quantity}</button>;
}
`,
          { caption: "A component" },
        ),
        steps(
          "The UI dispatches an action.",
          "Middleware sees it first (thunks, logging, async work).",
          "Reducers compute the next state.",
          "The store notifies subscribers.",
          "Selectors run; components whose selected value changed re-render.",
        ),
        table(
          ["", "Context", "Redux", "Zustand", "TanStack Query"],
          ["What it is", "A way to pass a value down", "A store with strict update rules", "A small store with hooks", "A cache for server data"],
          ["Selective subscriptions", "No", "Yes, selectors", "Yes, selectors", "Yes, per query"],
          ["Devtools and middleware", "No", "Extensive", "Some", "Its own devtools"],
          ["Boilerplate", "Low", "Moderate with Toolkit", "Low", "Low"],
          ["Reach for it when", "Rarely-changing global values", "Large teams, complex client state, auditability", "Simple shared client state", "Anything that comes from an API"],
        ),
        trap(
          "Do not use Redux as a cache for API responses with hand-written loading flags. That is the part of Redux that made people dislike it, and RTK Query or TanStack Query replaces all of it.",
        ),
      ],
      followUps: [
        {
          q: "How does Redux relate to Flux?",
          a: "Flux is the pattern: actions flow one way through a dispatcher into stores, which update views. Redux is a refinement of it with one store, no dispatcher, and reducers as pure functions.",
        },
        {
          q: "How do you handle async logic?",
          a: "With middleware. Thunks (built into Redux Toolkit) are functions that receive `dispatch` and can await things. Sagas use generators for complex orchestration such as cancellation and races. For plain data fetching, RTK Query generates the whole thing.",
        },
        {
          q: "Can a reducer dispatch an action or call an API?",
          a: "No. A reducer must be pure. Side effects belong in middleware or in the event handler that dispatches.",
        },
        {
          q: "What were `connect`, `mapStateToProps` and `mapDispatchToProps`?",
          a: "The pre-hooks API: a higher-order component that subscribed a class component to the store and injected state and action creators as props. `useSelector` and `useDispatch` replace them.",
        },
        {
          q: "Redux vs MobX?",
          a: "Redux is explicit and immutable: plain actions, pure reducers, one store. MobX is implicit and mutable: you change observable objects directly and it tracks which components read what. MobX needs less code; Redux is easier to trace and debug.",
        },
      ],
      docs: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts",
    },
    {
      id: "patterns-server-state",
      question: "What is 'server state', and why use a library like TanStack Query for it?",
      level: "intermediate",
      short:
        "Server state is data your app does not own: it lives on a server, you hold a copy, and that copy can go stale at any time. Managing it well means caching, deduplicating requests, refetching in the background, retrying, and invalidating after mutations. A query library does all of that behind one hook.",
      body: [
        tsx(
          `
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
}
declare function fetchTodos(): Promise<Todo[]>;
declare function createTodo(title: string): Promise<Todo>;

export function Todos() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 60_000, // treat as fresh for a minute: no refetch on remount within that time
  });

  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }), // refetch the list
  });

  if (isPending) return <p>Loading</p>;
  if (error) return <p role="alert">{error.message}</p>;

  return (
    <>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={() => addTodo.mutate("New todo")} disabled={addTodo.isPending}>
        Add
      </button>
    </>
  );
}
`,
          { caption: "With TanStack Query" },
        ),
        table(
          ["Problem", "What the library does"],
          ["Two components need the same data", "One request, shared by cache key"],
          ["Data may be out of date", "Shows the cached copy, refetches in the background (stale-while-revalidate)"],
          ["The user returns to the tab or reconnects", "Refetches automatically"],
          ["A request fails", "Retries with backoff, then exposes the error"],
          ["A mutation changed the data", "Invalidate by key and the affected queries refetch"],
          ["Race conditions and cancellation", "Handled per query key"],
          ["Pagination and infinite lists", "Built-in primitives"],
        ),
        p(
          "The important idea is the split. Client state is synchronous and you are its only writer. Server state is asynchronous, shared, and can change without you. Treating them the same way is what led to stores full of `isLoading` flags.",
        ),
      ],
      followUps: [
        {
          q: "How do optimistic updates work with it?",
          a: "In `onMutate`: cancel in-flight queries for that key, save the current cache value, and write the expected result into the cache. In `onError`, restore the saved value. In `onSettled`, invalidate so the server's truth replaces your guess.",
        },
        {
          q: "What is the difference between `staleTime` and `gcTime`?",
          a: "`staleTime` is how long data counts as fresh, during which no refetch happens. `gcTime` is how long unused data stays in memory after the last component using it unmounts.",
        },
        {
          q: "Do you still need this with Server Components?",
          a: "Less. Data fetched in a Server Component arrives with the HTML and the framework handles caching and revalidation. A client cache is still useful for highly interactive screens: polling, infinite scroll, optimistic mutations.",
        },
      ],
      docs: "https://tanstack.com/query/latest/docs/framework/react/overview",
    },
    {
      id: "patterns-hoc",
      question: "What is a higher-order component? What are its drawbacks?",
      level: "intermediate",
      short:
        "A higher-order component is a function that takes a component and returns a new component with extra behaviour or props. It was the main way to share logic across class components. Custom hooks now cover almost every use, without the wrapper.",
      body: [
        tsx(`
declare function useAuth(): { user: { name: string } | null };

function withAuth<P extends object>(Wrapped: React.ComponentType<P>) {
  function WithAuth(props: P) {
    const { user } = useAuth();
    if (!user) return <p>Please sign in.</p>;
    return <Wrapped {...props} />;
  }
  WithAuth.displayName = "withAuth(" + (Wrapped.displayName ?? Wrapped.name) + ")";
  return WithAuth;
}

function Dashboard({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

const ProtectedDashboard = withAuth(Dashboard); // applied once, at module level
`),
        table(
          ["Drawback", "Detail"],
          ["Wrapper nesting", "`withRouter(withTheme(connect(...)(Component)))` produces a deep tree that is hard to read in DevTools"],
          ["Invisible props", "You cannot tell from the component which HOC supplies which prop"],
          ["Name collisions", "Two HOCs injecting a prop of the same name silently overwrite each other"],
          ["Refs and statics", "Refs pointed at the wrapper, and static methods were not copied, unless handled explicitly"],
          ["Typing", "Removing injected props from the public type needs generics and usually an assertion"],
        ),
        list(
          "Never apply a HOC inside a render function. It creates a new component type every time, so the subtree unmounts and remounts on each render.",
          "A HOC should pass through unrelated props, and must not mutate the component it receives.",
          "You still meet them in older code and some library APIs: `connect` from React Redux, `withRouter`, `React.memo` itself.",
        ),
        say(
          "The hook equivalent of `withAuth` is `const { user } = useAuth()` inside the component. Same logic, explicit at the call site, no extra component in the tree.",
        ),
      ],
      followUps: [
        {
          q: "Do hooks replace HOCs completely?",
          a: "Nearly. A HOC can still be the right shape when you need to wrap rendering itself, for example to put a component behind an error boundary, a permission check or a feature flag without touching it.",
        },
      ],
      docs: "https://legacy.reactjs.org/docs/higher-order-components.html",
    },
    {
      id: "patterns-render-props",
      question: "What is the render props pattern?",
      level: "intermediate",
      short:
        "A component that takes a function as a prop and calls it to decide what to render, passing its internal state as arguments. The component owns the behaviour; the caller owns the markup. The function is often passed as `children`.",
      body: [
        tsx(`
interface MousePosition {
  x: number;
  y: number;
}

function MouseTracker({ children }: { children: (position: MousePosition) => ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  return (
    <div onMouseMove={(event) => setPosition({ x: event.clientX, y: event.clientY })}>
      {children(position)}
    </div>
  );
}

function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <p>
          The pointer is at {x}, {y}
        </p>
      )}
    </MouseTracker>
  );
}
`),
        list(
          "The prop does not have to be called `render`. Any prop that is a function returning JSX is a render prop.",
          "Like HOCs, it predates hooks. `const position = useMousePosition()` is simpler when you only need the data.",
          "It is still the right tool when the component must control where and how often your markup is rendered: virtualised lists (`renderItem`), headless UI components, form field wrappers.",
        ),
        trap(
          "Several render-prop components nested inside each other produce a pyramid of callbacks. That, more than anything, is what hooks were designed to flatten.",
        ),
      ],
      docs: "https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering",
    },
    {
      id: "patterns-composition",
      question: "What does 'composition over inheritance' mean in React? What is a compound component?",
      level: "intermediate",
      short:
        "React components are combined, not extended. You build specific components by rendering generic ones and passing them content through `children` or other props. A compound component is a set of components designed to be used together that share state implicitly, like `<select>` and `<option>` do.",
      body: [
        tsx(
          `
function Dialog({ title, children, footer }: { title: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section role="dialog" aria-label={title}>
      <h2>{title}</h2>
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

// A specific dialog is the generic one, configured. No class hierarchy involved.
function DeleteDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog title="Delete file?" footer={<button onClick={onConfirm}>Delete</button>}>
      <p>This cannot be undone.</p>
    </Dialog>
  );
}
`,
          { caption: "Specialisation by composition" },
        ),
        tsx(
          `
const TabsContext = createContext<{ active: string; select: (id: string) => void } | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab components must be rendered inside <Tabs>");
  return context;
}

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, select] = useState(defaultTab);
  return <TabsContext value={{ active, select }}>{children}</TabsContext>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, select } = useTabs();
  return (
    <button role="tab" aria-selected={active === id} onClick={() => select(id)}>
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div role="tabpanel">{children}</div> : null;
}

function Settings() {
  return (
    <Tabs defaultTab="profile">
      <div role="tablist">
        <Tab id="profile">Profile</Tab>
        <Tab id="billing">Billing</Tab>
      </div>
      <TabPanel id="profile">Name, email</TabPanel>
      <TabPanel id="billing">Cards, invoices</TabPanel>
    </Tabs>
  );
}
`,
          { caption: "A compound component" },
        ),
        list(
          "The caller controls structure and order; the parent owns the state. Compare that with one `<Tabs items={[...]} />` component that needs a new prop for every variation.",
          "This is the cure for boolean-prop explosion (`showHeader`, `withIcon`, `compact`...): expose pieces to compose, not flags to combine.",
        ),
      ],
      followUps: [
        {
          q: "Why does React not use inheritance for components?",
          a: "Props and composition already cover every case inheritance would: a component can accept arbitrary elements, functions and data. Shared non-UI logic goes in hooks or plain modules. The React team has said they never found a case where a component hierarchy was the better design.",
        },
      ],
      docs: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children",
    },
    {
      id: "patterns-container-presentational",
      question: "What is the container and presentational component pattern? Is it still relevant?",
      level: "intermediate",
      short:
        "It splits components into two roles. Presentational components take props and render markup, with no knowledge of where data comes from. Container components fetch data and hold state, and render presentational components. The idea of separating concerns still holds; the mechanism today is usually a custom hook, not a wrapper component.",
      body: [
        tsx(`
interface User {
  id: string;
  name: string;
}
declare function fetchUsers(signal: AbortSignal): Promise<User[]>;

// Presentational: pure function of its props. Trivial to test and to show in Storybook.
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// The "container" logic, as a hook.
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller.signal).then(setUsers).catch(() => {});
    return () => controller.abort();
  }, []);

  return users;
}

function UsersPage() {
  const users = useUsers();
  return <UserList users={users} />;
}
`),
        list(
          "**Still valuable:** components that only render are reusable, easy to test, and usable in a design system.",
          "**No longer a rule:** Dan Abramov, who popularised the pattern, later said not to split components this way dogmatically. Hooks let one component use data logic without a wrapper.",
          "**The modern form** of the same split is Server Components that fetch, rendering Client Components that interact.",
        ),
      ],
      docs: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    },
    {
      id: "patterns-anti-patterns",
      question: "What React anti-patterns do you look for in a code review?",
      level: "intermediate",
      short:
        "Mostly state that should not be state, effects that should not be effects, and identity problems: unstable keys, components defined inside components, and objects recreated on every render where a stable reference is expected.",
      body: [
        table(
          ["Anti-pattern", "Why it hurts", "Do this instead"],
          ["Mutating state or props", "React cannot see the change; memoisation and effects break", "Create a new object or array"],
          ["Storing derived data in state", "Two sources of truth that drift apart", "Compute it during render"],
          ["Copying props into state", "The copy ignores later prop changes", "Use the prop, or reset with a `key`"],
          ["An effect that sets state from props or state", "An extra render with stale data", "Derive it, or do it in the event handler"],
          ["Index or random keys on dynamic lists", "State sticks to the wrong item, or everything remounts", "Stable IDs from the data"],
          ["Defining a component inside another", "A new component type each render; state resets", "Move it to module level"],
          ["Fetching in an effect with no cleanup", "Race conditions and updates after unmount", "Abort or ignore; better, a query library"],
          ["Suppressing the exhaustive-deps lint rule", "Stale closures", "Restructure so the dependency is not needed"],
          ["State for values that are never rendered", "Needless re-renders", "A ref"],
          ["A context holding everything", "Every consumer re-renders on any change", "Split it, or use a store"],
          ["Boolean props multiplying (`isCompact`, `hasIcon`, ...)", "Untestable combinations", "Composition, or a single `variant` union"],
          ["Spreading unknown props onto a DOM element", "Invalid attributes, accidental overrides", "Pick the props you forward"],
          ["`memo`, `useMemo`, `useCallback` everywhere", "Noise, and stale values when dependencies are wrong", "Measure first; fix the structure"],
        ),
        trap(
          "The older lists you will find online also mention `componentWillMount`, `componentWillReceiveProps`, string refs and `findDOMNode`. Those APIs are deprecated or removed, so they are history questions now, not review comments.",
        ),
      ],
      followUps: [
        {
          q: "Which of these causes the most bugs in practice?",
          a: "Derived state kept in sync with effects. It is the root of most 'the UI shows the old value for a moment' reports, and removing the state usually deletes more code than it adds.",
        },
      ],
      docs: "https://react.dev/learn/you-might-not-need-an-effect",
    },
    {
      id: "patterns-forms",
      question: "How do you handle forms and validation in React?",
      level: "intermediate",
      short:
        "For a small form, controlled inputs with validation in the submit handler, or uncontrolled inputs read from `FormData`. For anything larger, a form library (React Hook Form is the usual choice) with a schema (Zod) that produces both the validation and the TypeScript type. In React 19, form actions handle pending and error state without client-side plumbing.",
      body: [
        tsx(
          `
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(12, "At least 12 characters"),
});
type FormValues = z.infer<typeof schema>;

export function SignInForm({ onSignIn }: { onSignIn: (values: FormValues) => Promise<void> }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSignIn)} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" aria-invalid={Boolean(errors.password)} {...register("password")} />
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <button disabled={isSubmitting}>Sign in</button>
    </form>
  );
}
`,
          { caption: "React Hook Form with a Zod schema" },
        ),
        list(
          "**Validate on the server too.** Client-side validation is for the user's convenience; it protects nothing.",
          "**When to validate:** on submit first, then on blur or on change for fields that already have an error. Validating on every keystroke from the start shouts at people mid-word.",
          "**Accessibility:** every input has a label; errors are linked with `aria-describedby` and announced; focus moves to the first invalid field on submit.",
          "**Performance:** controlled inputs re-render the form on each keystroke. React Hook Form registers uncontrolled inputs, so typing in one field does not re-render the others.",
        ),
        table(
          ["Approach", "Fits"],
          ["Controlled `useState` per field", "Two or three fields; live formatting; dependent fields"],
          ["Uncontrolled + `FormData`", "Simple submit-only forms; progressive enhancement"],
          ["React Hook Form + schema", "Many fields, field arrays, async validation"],
          ["`useActionState` with a form action", "Server-validated forms in a framework with Server Functions"],
        ),
      ],
      followUps: [
        {
          q: "How do you prevent a double submit?",
          a: "Disable the submit button while the request is pending (`isSubmitting`, `useFormStatus().pending`), and make the server operation idempotent, because disabling a button is not a guarantee.",
        },
        {
          q: "How do you show errors that come back from the server?",
          a: "Map them onto the fields (`setError` in React Hook Form, or the state returned by the action), and keep a form-level message for errors that belong to no field.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/components/form",
    },
    {
      id: "patterns-architecture",
      question: "How do you structure a large React codebase?",
      level: "senior",
      short:
        "By feature, not by file type. Code that changes together lives together, each feature exposes a small public API, and dependencies point in one direction: features may use shared code, shared code never imports from a feature. The exact folder names matter far less than enforcing those boundaries.",
      body: [
        ts(
          `
// src/
//   app/                 routing, providers, global styles: wires features together
//   features/
//     checkout/
//       components/      used only inside this feature
//       hooks/
//       api.ts           the feature's requests and query keys
//       types.ts
//       index.ts         the public API: the only file other features may import
//     catalog/
//   shared/
//     ui/                design-system components: Button, Dialog, Input
//     lib/               framework-agnostic utilities
//     api/               the HTTP client, auth headers, error mapping

// features/checkout/index.ts
export { CheckoutPage } from "./components/CheckoutPage";
export { useCart } from "./hooks/useCart";
export type { CartItem } from "./types";
`,
          { caption: "A feature-based layout" },
        ),
        list(
          "**Colocation.** A component's styles, tests and stories sit next to it. Deleting a feature is deleting a folder.",
          "**A public API per feature.** Other code imports from `features/checkout`, never from deep inside it. A lint rule (`no-restricted-imports`, `eslint-plugin-boundaries`) makes that a build error rather than a convention.",
          "**One-way dependencies.** `app` depends on `features`, which depend on `shared`. Two features that need each other usually share a concept that belongs in a third place.",
          "**Shared is earned.** Code moves to `shared` when a second feature needs it, not in anticipation.",
        ),
        p(
          "Named methodologies describe the same ideas at different granularity: Feature-Sliced Design formalises the layers (app, pages, widgets, features, entities, shared), and Atomic Design organises the UI library itself (atoms, molecules, organisms).",
        ),
      ],
      followUps: [
        {
          q: "What goes wrong with grouping by type (`components/`, `hooks/`, `utils/`)?",
          a: "It scales with the number of files, not the number of features. One change touches five distant folders, nothing tells you what belongs together, and every folder becomes a place where anything can import anything.",
        },
        {
          q: "Are barrel files a problem?",
          a: "As a feature's public API, no. As a habit in every folder, they can pull unrelated modules into a bundle, slow down tooling and hide circular imports.",
        },
      ],
      docs: "https://react.dev/learn/thinking-in-react",
    },
  ],
};
