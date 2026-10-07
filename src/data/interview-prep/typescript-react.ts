import { list, p, say, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_REACT: PrepSection = {
  id: "ts-react",
  track: "typescript",
  title: "TypeScript with React",
  blurb:
    "Where the two halves of the interview meet. Most React roles assume TypeScript, and these are the typing questions that come up while you are live-coding a component.",
  drill: "types",
  questions: [
    {
      id: "tsr-props",
      question: "How do you type a component's props, including `children` and default values?",
      level: "junior",
      short:
        "Declare an interface or type for the props and annotate the destructured parameter. Optional props get a `?`, defaults go in the destructuring, and `children` is typed as `ReactNode`.",
      body: [
        tsx(`
interface ButtonProps {
  variant?: "primary" | "ghost"; // optional; the default is set below
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode; // anything React can render
}

function Button({ variant = "primary", disabled = false, onClick, children }: ButtonProps) {
  return (
    <button className={"btn btn-" + variant} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

const ok = <Button onClick={() => {}}>Save</Button>;
const bad = <Button variant="danger" onClick={() => {}}>Delete</Button>; // error: "danger" is not a variant
`),
        list(
          "Use a union of literals, not `string`, for anything with a fixed set of values. It is checked and it autocompletes.",
          "`defaultProps` is no longer supported on function components in React 19; default parameter values replace it.",
          "`PropTypes` was the runtime predecessor of all this. It is removed in React 19, and TypeScript catches the same mistakes at compile time.",
        ),
      ],
      followUps: [
        {
          q: "Should you use `React.FC`?",
          a: "It works, and since the React 18 types it no longer adds an implicit `children` prop. But it adds nothing over annotating the props parameter, and it cannot express generic components, so most codebases skip it.",
        },
        {
          q: "Should you annotate the return type?",
          a: "Usually not; let it infer. If you do, `ReactNode` is the right annotation for a component.",
        },
      ],
      docs: "https://react.dev/learn/typescript#typescript-with-react-components",
    },
    {
      id: "tsr-reactnode",
      question: "What is the difference between `ReactNode`, `ReactElement` and `JSX.Element`?",
      level: "intermediate",
      short:
        "`ReactNode` is anything React can render: elements, strings, numbers, `null`, `undefined`, booleans, arrays of those. `ReactElement` is specifically the object a JSX expression produces. `JSX.Element` is a `ReactElement` with the generics set to `any`: the type of a JSX expression.",
      body: [
        table(
          ["Type", "Accepts", "Use for"],
          ["`ReactNode`", "Elements, strings, numbers, `null`, `undefined`, booleans, iterables", "`children` and any 'slot' prop"],
          ["`ReactElement`", "Only `<Something />` objects", "Props you intend to `cloneElement` or inspect"],
          ["`JSX.Element`", "Same as `ReactElement<any, any>`", "Rarely written by hand"],
        ),
        tsx(`
function Layout({ children }: { children: JSX.Element }) {
  return <main>{children}</main>;
}

const a = <Layout><p>hello</p></Layout>; // ok
const b = <Layout>hello</Layout>; // error: a string is not a JSX.Element

function BetterLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

const c = <BetterLayout>hello</BetterLayout>; // ok
const d = <BetterLayout>{null}</BetterLayout>; // ok
`),
        trap(
          "Typing `children` as `JSX.Element` rejects strings, numbers, `null`, conditionals like `{open && <Menu />}`, and multiple children. It is almost always a mistake for `ReactNode`.",
        ),
      ],
      followUps: [
        {
          q: "How do you type `children` as a function (a render prop)?",
          a: "As a function type: `children: (state: { open: boolean }) => ReactNode`.",
        },
        {
          q: "What is the type of a component itself?",
          a: "`ComponentType<Props>` for 'any component accepting these props', or `ElementType` for 'anything valid as a JSX tag', which includes strings like `\"div\"`.",
        },
      ],
      docs: "https://react.dev/learn/typescript#typing-children",
    },
    {
      id: "tsr-hooks",
      question: "How do you type `useState`, `useRef` and `useReducer`?",
      level: "junior",
      short:
        "`useState` infers from its initial value, so you only pass a type argument when that value does not tell the whole story (`null`, an empty array, a union). `useRef` takes the element type and starts at `null` for DOM refs. `useReducer` is typed by typing the reducer, with the action as a discriminated union.",
      body: [
        tsx(`
interface User {
  id: string;
  name: string;
}

function Profile() {
  const [count, setCount] = useState(0); // number, inferred
  const [user, setUser] = useState<User | null>(null); // the union has to be stated
  const [tags, setTags] = useState<string[]>([]); // [] alone would be never[]

  const inputRef = useRef<HTMLInputElement>(null); // attached to a DOM node by React
  const timerRef = useRef<number | undefined>(undefined); // a mutable value that survives renders

  useEffect(() => {
    inputRef.current?.focus(); // current is HTMLInputElement | null
    timerRef.current = window.setTimeout(() => setCount((c) => c + 1), 1000);
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return <input ref={inputRef} placeholder={user?.name ?? "Anonymous"} />;
}
`),
        tsx(`
type State = { count: number; step: number };

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setStep"; step: number }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.step }; // step exists only on this action
    case "reset":
      return { count: 0, step: 1 };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  function examples() {
    dispatch({ type: "setStep", step: 5 }); // ok
    dispatch({ type: "setStep" }); // error: 'step' is missing
    dispatch({ type: "multiply" }); // error: not a known action
  }

  return <button onClick={() => dispatch({ type: "increment" })}>{state.count}</button>;
}
`),
        p(
          "Because the reducer's return type is annotated as `State` and every case returns, a new action type that is not handled makes the function fall off the end, which the compiler reports. That is the exhaustiveness check for free.",
        ),
      ],
      followUps: [
        {
          q: "What type do you give a state setter passed as a prop?",
          a: "`Dispatch<SetStateAction<T>>`, although it is usually better to pass a narrower callback such as `onChange: (value: T) => void` so the child does not depend on the parent using `useState`.",
        },
        {
          q: "Why does `useRef()` with no argument fail in React 19's types?",
          a: "The initial value is now required. Pass `null` for a DOM ref or `undefined` for a mutable value. The separate `MutableRefObject` type is deprecated; every ref's `current` is now assignable.",
        },
      ],
      docs: "https://react.dev/learn/typescript#example-hooks",
    },
    {
      id: "tsr-events",
      question: "How do you type event handlers?",
      level: "junior",
      short:
        "An inline handler needs no annotation, since the type flows from the JSX attribute. A handler declared separately takes the matching React event type, parameterised by the element: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.SubmitEvent<HTMLFormElement>`.",
      body: [
        tsx(`
function SignupForm({ onSignup }: { onSignup: (email: string) => void }) {
  const [email, setEmail] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") setEmail("");
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget); // currentTarget is the form
    onSignup(String(data.get("email")));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={email} onChange={handleChange} onKeyDown={handleKeyDown} />
      <button type="submit" onClick={(event) => event.currentTarget.blur()}>
        Sign up
      </button>
    </form>
  );
}
`),
        list(
          "`event.currentTarget` is the element the handler is attached to, and is precisely typed. `event.target` is where the event started, which may be a child, so it is only typed as `EventTarget` (change events are the exception).",
          "For a handler passed as a prop, type the prop with the handler alias: `onClick?: React.MouseEventHandler<HTMLButtonElement>`.",
          "Not sure which type? Write the handler inline, hover over the parameter, and copy what the editor shows.",
        ),
        trap(
          "Older code and tutorials type submit handlers as `React.FormEvent`. Current React types deprecate it in favour of `SubmitEvent`, `ChangeEvent` and `InputEvent`, which describe events that actually exist.",
        ),
      ],
      docs: "https://react.dev/learn/typescript#typing-dom-events",
    },
    {
      id: "tsr-native-props",
      question: "How do you build a component that accepts every prop of a native element, plus your own?",
      level: "intermediate",
      short:
        "Intersect your props with `ComponentProps<\"button\">` (or whichever element), then spread the rest onto the element. The wrapper gets `type`, `disabled`, `aria-*`, event handlers and, in React 19, `ref`, all typed, without listing any of them.",
      body: [
        tsx(`
type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const classes = ["btn", "btn-" + variant, className].filter(Boolean).join(" ");
  return <button className={classes} {...rest} />;
}

function Toolbar() {
  const saveRef = useRef<HTMLButtonElement>(null);

  return (
    <Button ref={saveRef} type="submit" aria-label="Save" onClick={(e) => e.currentTarget.blur()}>
      Save
    </Button>
  );
}

const wrong = <Button href="/docs">Docs</Button>; // error: a button has no href
`),
        p(
          "`ref` is an ordinary prop on function components since React 19, so `ComponentProps<\"button\">` already includes it. Before 19, the same component needed `forwardRef`:",
        ),
        tsx(
          `
const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function Input(props, ref) {
    return <input ref={ref} {...props} />;
  },
);
`,
          { caption: "React 18 and earlier" },
        ),
        list(
          "`ComponentProps<typeof Other>` borrows the props of another component, which keeps wrappers in sync with what they wrap.",
          "Use `Omit<ComponentProps<\"input\">, \"onChange\">` when you want to replace a native prop with your own signature.",
        ),
      ],
      followUps: [
        {
          q: "How do you expose an imperative API instead of the DOM node?",
          a: "Type the ref as `Ref<Handle>`, where `Handle` is an interface such as `{ focus(): void; reset(): void }`, and return an object of that shape from `useImperativeHandle(ref, () => ({ ... }))`.",
        },
        {
          q: "Why separate `className` from `...rest`?",
          a: "So the wrapper's own classes and the caller's are merged. Spreading `rest` after a hard-coded `className` would silently let the caller overwrite yours.",
        },
      ],
      docs: "https://react.dev/reference/react/forwardRef",
    },
    {
      id: "tsr-generic-components",
      question: "How do you write a generic component?",
      level: "intermediate",
      short:
        "Give the component function a type parameter and use it in the props, so the item type flows from one prop to the others. The caller never writes the type; it is inferred from the data they pass.",
      body: [
        tsx(`
interface ListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  empty?: ReactNode;
}

function List<T>({ items, getKey, renderItem, empty = null }: ListProps<T>) {
  if (items.length === 0) return empty;
  return (
    <ul>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

const users = [{ id: "1", name: "Ada" }];

const ok = <List items={users} getKey={(user) => user.id} renderItem={(user) => user.name} />;
const bad = <List items={users} getKey={(user) => user.id} renderItem={(user) => user.email} />; // error: no 'email' on the item
`),
        p("The same pattern types any 'value in, value out' control, such as a select whose options are objects:"),
        tsx(`
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select
      value={options.indexOf(value)}
      onChange={(event) => {
        const next = options[Number(event.target.value)];
        if (next !== undefined) onChange(next);
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={index}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
`),
      ],
      followUps: [
        {
          q: "How do you write a generic arrow-function component in a `.tsx` file?",
          a: "`const List = <T,>(props: ListProps<T>) => ...`. The trailing comma stops the parser reading `<T>` as a JSX tag. A function declaration avoids the issue.",
        },
        {
          q: "Can a generic component be wrapped in `memo` or `forwardRef`?",
          a: "Not without losing the type parameter, because those helpers are typed over a fixed props type. The usual fixes are a cast back to the generic signature or, in React 19, dropping `forwardRef` and taking `ref` as a prop.",
        },
      ],
      docs: "https://react.dev/learn/typescript",
    },
    {
      id: "tsr-discriminated-props",
      question: "A component has props that only make sense in certain combinations. How do you type that?",
      level: "senior",
      short:
        "As a discriminated union of prop shapes, not as one interface full of optionals. Each variant lists exactly the props it needs, the compiler rejects invalid combinations at the call site, and inside the component a check on the discriminant narrows the props.",
      body: [
        tsx(`
type AvatarProps =
  | { kind: "image"; src: string; alt: string }
  | { kind: "initials"; name: string };

function Avatar(props: AvatarProps) {
  if (props.kind === "image") {
    return <img src={props.src} alt={props.alt} />;
  }
  return <span>{props.name.slice(0, 2).toUpperCase()}</span>;
}

const a = <Avatar kind="image" src="/ada.png" alt="Ada" />; // ok
const b = <Avatar kind="initials" name="Ada Lovelace" />; // ok
const c = <Avatar kind="initials" src="/ada.png" />; // error: wrong props for this variant
`),
        p("When there is no natural discriminant, `never` expresses 'one or the other, not both':"),
        tsx(`
type ActionProps =
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never };

function Action(props: ActionProps & { children: ReactNode }) {
  return props.href !== undefined ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <button onClick={props.onClick}>{props.children}</button>
  );
}

const link = <Action href="/docs">Docs</Action>; // ok
const both = <Action href="/docs" onClick={() => {}}>Docs</Action>; // error: cannot pass both
`),
        say(
          "If I find myself writing a comment like 'only pass `onRetry` when `status` is error', that is a type I have not written yet.",
        ),
      ],
      followUps: [
        {
          q: "Why keep `props` whole instead of destructuring in the parameter list?",
          a: "Narrowing follows the `props` object. Once the fields are pulled apart, a property that exists on only one variant cannot be destructured at all, and the relationship between the discriminant and the rest is harder for the compiler to follow.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
    },
    {
      id: "tsr-polymorphic",
      question: "How would you type a polymorphic component with an `as` prop?",
      level: "senior",
      short:
        "Make the component generic over an `ElementType`, and compute its props from that type with `ComponentProps<E>`. Then `as=\"a\"` allows `href` and `as=\"button\"` does not.",
      body: [
        tsx(`
type BoxProps<E extends ElementType> = {
  as?: E;
  children?: ReactNode;
} & Omit<ComponentProps<E>, "as" | "children">;

function Box<E extends ElementType = "div">({ as, children, ...rest }: BoxProps<E>) {
  const Tag: ElementType = as ?? "div";
  return <Tag {...rest}>{children}</Tag>;
}

const plain = <Box className="card">A div by default</Box>;
const link = <Box as="a" href="/docs">A link</Box>; // href is allowed: E is "a"
const wrong = <Box as="button" href="/docs">Nope</Box>; // error: a button has no href
`),
        list(
          "The local `Tag` is annotated as plain `ElementType` because the compiler cannot prove that the remaining props match an unresolved generic `E`. The public signature is what stays precise.",
          "Polymorphic types are expensive to check and produce long error messages, so keep them to a few primitives (`Box`, `Text`, `Button`).",
        ),
        trap(
          "This is a place to show judgement, not just skill. Many design systems now prefer composition (`<Button asChild><a href=\"/docs\" /></Button>`, or a render prop) because it gives the same flexibility with far simpler types.",
        ),
      ],
      docs: "https://react.dev/learn/typescript",
    },
    {
      id: "tsr-context",
      question: "How do you type a context so consumers do not have to handle `undefined` everywhere?",
      level: "intermediate",
      short:
        "Create the context with `null` as the default, and expose it only through a custom hook that throws if the provider is missing. The hook's return type is then the non-null value, and a forgotten provider fails loudly instead of rendering with a fake default.",
      body: [
        tsx(`
interface User {
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({ user, signIn: setUser, signOut: () => setUser(null) }),
    [user],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (value === null) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}

function Greeting() {
  const { user } = useAuth(); // no null check on the context itself
  return <p>{user ? "Hello, " + user.name : "Signed out"}</p>;
}
`),
        list(
          "`<AuthContext value={...}>` is the React 19 form. Earlier versions write `<AuthContext.Provider value={...}>`.",
          "The `useMemo` matters for behaviour, not types: a new object every render would re-render every consumer.",
          "Avoid `createContext({} as AuthContextValue)`. It type-checks and then fails at runtime with an unhelpful 'undefined is not a function' when the provider is missing.",
        ),
      ],
      docs: "https://react.dev/learn/typescript#typing-usecontext",
    },
    {
      id: "tsr-custom-hooks",
      question: "How do you type a custom hook's return value?",
      level: "intermediate",
      short:
        "Let it infer, with one exception: when returning a pair, add `as const` so the result is a tuple and not an array of a union. Use a generic when the hook stores or returns the caller's data.",
      body: [
        tsx(`
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((value) => !value), []);
  return [on, toggle] as const; // readonly [boolean, () => void]
}

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored === null ? initial : (JSON.parse(stored) as T);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function Settings() {
  const [open, toggleOpen] = useToggle();
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");

  return (
    <button onClick={toggleOpen} onDoubleClick={() => setTheme("light")}>
      {open ? "Close" : "Open"} ({theme})
    </button>
  );
}
`),
        list(
          "**Tuple** for one or two values the caller will want to rename (`const [open, toggleOpen] = ...`).",
          "**Object** for three or more, so call sites are self-describing and adding a field is not a breaking change.",
          "The `JSON.parse(...) as T` above is an unchecked boundary. For anything that matters, pass a validator or schema into the hook.",
        ),
      ],
      followUps: [
        {
          q: "What does the return type look like without `as const`?",
          a: "`(boolean | (() => void))[]`. Every element could be either, so calling `toggle()` would not compile without a check.",
        },
      ],
      docs: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    },
    {
      id: "tsr-hoc",
      question: "How do you type a higher-order component?",
      level: "senior",
      short:
        "Make it generic over the wrapped component's props, constrained to include the props the HOC injects. The returned component takes the original props minus the injected ones, via `Omit`.",
      body: [
        tsx(`
interface WithUserProps {
  user: { id: string; name: string };
}

declare function useCurrentUser(): WithUserProps["user"];

function withUser<P extends WithUserProps>(Wrapped: React.ComponentType<P>) {
  function WithUser(props: Omit<P, keyof WithUserProps>) {
    const user = useCurrentUser();
    return <Wrapped {...(props as P)} user={user} />;
  }
  WithUser.displayName = "withUser(" + (Wrapped.displayName ?? Wrapped.name) + ")";
  return WithUser;
}

function Dashboard({ user, title }: WithUserProps & { title: string }) {
  return <h1>{title + ": " + user.name}</h1>;
}

const DashboardWithUser = withUser(Dashboard);

const ok = <DashboardWithUser title="Home" />; // user is supplied by the HOC
const bad = <DashboardWithUser />; // error: 'title' is missing
`),
        list(
          "The `props as P` assertion is the known rough edge: the compiler cannot prove that `Omit<P, K>` plus `K` rebuilds `P` for a generic `P`.",
          "Setting `displayName` keeps the component tree readable in React DevTools.",
        ),
        say(
          "I can write this, and I would then say that a custom hook, `const user = useCurrentUser()`, does the same job with no wrapper component, no assertion and no prop-name collisions. That is why HOCs are rare in new code.",
        ),
      ],
      docs: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    },
  ],
};
