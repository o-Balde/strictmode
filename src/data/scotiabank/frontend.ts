import { js, list, output, p, say, steps, table, trap, ts, tsx } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_JAVASCRIPT: PrepSection = {
  id: "sb-javascript",
  track: "frontend",
  title: "JavaScript (ES6+) and TypeScript",
  blurb:
    "The posting lists JavaScript (ES6+) and TypeScript first. Expect a few quick fundamentals, one output-prediction snippet, and a question about money, because it is a bank.",
  drill: "closures",
  questions: [
    {
      id: "sb-js-var-let-const",
      question: "What is the difference between `var`, `let` and `const`?",
      level: "junior",
      short:
        "`var` is function-scoped and hoisted with the value `undefined`. `let` and `const` are block-scoped and sit in the temporal dead zone until their declaration runs. `const` stops you reassigning the binding, but it does not freeze the object behind it.",
      body: [
        table(
          ["", "`var`", "`let`", "`const`"],
          ["Scope", "Function", "Block", "Block"],
          ["Hoisted", "Yes, as `undefined`", "Yes, but in the TDZ", "Yes, but in the TDZ"],
          ["Reassign", "Yes", "Yes", "No"],
          ["Redeclare in the same scope", "Yes", "No", "No"],
        ),
        js(`
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let", j));
`),
        output(`
var 3
var 3
var 3
let 0
let 1
let 2
`),
        p("`let` creates a fresh binding for each iteration, so each callback closes over its own `j`. All three `var` callbacks share one `i`, which is 3 by the time the timers fire."),
        say("I default to `const`, use `let` when a value really changes, and I don't write `var` in new code."),
      ],
      followUps: [
        {
          q: "Can you change a property of a `const` object?",
          a: "Yes. `const` protects the binding, not the value. Use `Object.freeze` for a shallow freeze, or `as const` in TypeScript for a readonly type.",
        },
      ],
    },
    {
      id: "sb-js-equality",
      question: "Explain `==` vs `===`, and truthy and falsy values.",
      level: "junior",
      short:
        "`===` compares without type coercion. `==` coerces first, so `0 == \"\"` and `null == undefined` are true. Falsy values are `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined` and `NaN`. Everything else is truthy, including `\"0\"`, `[]` and `{}`.",
      body: [
        ts(`
const pageSize = 0;
console.log(pageSize || 20); // 0 is falsy, so this falls back to 20
console.log(pageSize ?? 20); // ?? only falls back on null or undefined
console.log(null == undefined, null === undefined);
const parsed = Number("12,50"); // the comma makes it NaN
console.log(Number.isNaN(parsed), parsed === parsed); // NaN is the only value not equal to itself
`),
        output(`
20
0
true false
true false
`),
        trap("`amount || defaultAmount` silently replaces a legitimate `0`. For numbers and empty strings, use `??`."),
      ],
    },
    {
      id: "sb-js-closures",
      question: "What is a closure? Give a practical example.",
      level: "junior",
      short:
        "A closure is a function bundled with the variables of the scope it was created in. The function keeps access to those variables after the outer function returns. Closures give you private state, factories, memoisation, and the timer handles behind debounce and throttle.",
      body: [
        ts(`
function makeCounter() {
  let count = 0; // private: only the returned functions can reach it
  return {
    increment: () => ++count,
    current: () => count,
  };
}

const a = makeCounter();
const b = makeCounter();
a.increment();
a.increment();
b.increment();
console.log(a.current(), b.current());
`),
        output("2 1"),
        p("Each call to `makeCounter` creates a new scope, so `a` and `b` have separate counts. React depends on the same idea: each render's event handlers close over that render's props and state, which is why a stale closure shows old values."),
      ],
      followUps: [
        {
          q: "Can closures leak memory?",
          a: "They keep their captured variables alive. A long-lived listener or timer that closes over a large object holds it in memory until the listener is removed, so remove listeners and clear timers in cleanup.",
        },
      ],
    },
    {
      id: "sb-js-event-loop",
      question: "What does this print, and why? (event loop)",
      level: "intermediate",
      short:
        "All the synchronous code runs first. Then the microtask queue is drained completely (promise callbacks and `queueMicrotask`), and only then does the next macrotask, the timer, run. A `setTimeout(fn, 0)` always runs after every microtask that is already queued.",
      body: [
        js(`
console.log("1: sync");
setTimeout(() => console.log("2: timeout"), 0);
Promise.resolve().then(() => console.log("3: microtask"));
queueMicrotask(() => console.log("4: queueMicrotask"));
console.log("5: sync");
`),
        output(`
1: sync
5: sync
3: microtask
4: queueMicrotask
2: timeout
`),
        steps(
          "The call stack runs lines 1 and 5. The timer callback goes to the macrotask queue, and the two microtasks go to the microtask queue.",
          "The stack is empty, so the event loop drains every microtask, in order: 3, then 4.",
          "The loop takes the next macrotask, the timer: 2.",
        ),
        say("JavaScript is single-threaded. The event loop is what lets it wait on I/O without blocking, and microtasks always run before the next task."),
      ],
    },
    {
      id: "sb-js-async",
      question: "Promises vs `async`/`await`: how do you handle errors and run calls in parallel?",
      level: "intermediate",
      short:
        "`async`/`await` is syntax over promises, so an awaited rejection is thrown and you catch it with `try`/`catch`. Independent calls should start together: `Promise.all` fails fast on the first rejection, and `Promise.allSettled` waits for every call and reports each outcome.",
      body: [
        ts(`
const ok = (value: string, ms: number) =>
  new Promise<string>((resolve) => setTimeout(() => resolve(value), ms));
const fail = (message: string, ms: number) =>
  new Promise<string>((_, reject) => setTimeout(() => reject(new Error(message)), ms));

try {
  await Promise.all([ok("profile", 10), fail("kyc service down", 5)]);
} catch (error) {
  console.log("all rejected:", (error as Error).message);
}

const results = await Promise.allSettled([ok("profile", 10), fail("kyc service down", 5)]);
console.log(results.map((result) => result.status).join(", "));
`),
        output(`
all rejected: kyc service down
fulfilled, rejected
`),
        list(
          "**Sequential by accident:** `await a(); await b();` waits for `a` to finish before `b` starts. When the calls are independent, start both and then await them together.",
          "**Fail fast vs partial results:** use `Promise.all` when one failure makes the whole page useless. Use `allSettled` for a dashboard whose widgets can fail on their own.",
          "`Promise.race` settles with the first call that settles, which makes it useful for timeouts. `Promise.any` resolves with the first call that succeeds.",
        ),
        trap("An `async` function called without `await` or `.catch` turns its failure into an unhandled rejection. In Node, an unhandled rejection crashes the process by default."),
      ],
    },
    {
      id: "sb-js-this",
      question: "How does `this` work, and how do arrow functions change it?",
      level: "intermediate",
      short:
        "For a regular function, `this` depends on how the function is called: a method call sets it to the object, a plain call leaves it `undefined` in strict mode, and `call`, `apply` and `bind` set it explicitly. An arrow function has no `this` of its own; it uses the `this` of the scope it was defined in.",
      body: [
        js(`
const account = {
  id: "TFSA-1",
  regular() {
    return this?.id;
  },
  arrow: () => typeof this,
};

const detached = account.regular;
console.log(account.regular());
console.log(detached());
console.log(account.arrow());
console.log(detached.call({ id: "RRSP-7" }));
`),
        output(`
TFSA-1
undefined
undefined
RRSP-7
`),
        p("This is why passing `obj.method` as a callback loses `this`. The fix is `obj.method.bind(obj)` or an arrow wrapper. Modules run in strict mode, and a module's top-level `this` is `undefined`, which is what the arrow sees here."),
      ],
    },
    {
      id: "sb-js-es6",
      question: "Which ES6+ features do you use every day?",
      level: "junior",
      short:
        "Destructuring, spread and rest, template literals, arrow functions, `let` and `const`, modules, optional chaining `?.`, nullish coalescing `??`, `async`/`await`, `Map` and `Set`, and the newer array helpers such as `at`, `flatMap` and `toSorted`. Know that spread makes a shallow copy.",
      body: [
        ts(`
const client = { name: "Ana", address: { city: "Toronto" } };

const copy = { ...client }; // shallow: address is still shared
copy.address.city = "Halifax";
console.log(client.address.city);

const deep = structuredClone(client); // a real deep copy
deep.address.city = "Calgary";
console.log(client.address.city);

const { name, address: { city } } = client;
console.log(\`\${name} lives in \${city}\`);
console.log(client.address?.city ?? "unknown");
`),
        output(`
Halifax
Halifax
Ana lives in Halifax
Halifax
`),
        trap("Updating nested React state with a single spread mutates the shared inner object. Copy each level you change, or use `structuredClone` or Immer."),
      ],
    },
    {
      id: "sb-js-array-methods",
      question: "Use `map`, `filter` and `reduce` to summarise a list of transactions.",
      level: "junior",
      short:
        "`filter` keeps the items that pass a test, `map` transforms each item, and `reduce` folds the list into one value. Give `reduce` an initial value and type it. None of the three mutates the source array.",
      body: [
        ts(`
interface Txn {
  account: string;
  amountCents: number;
}

const txns: Txn[] = [
  { account: "TFSA-1", amountCents: 50_00 },
  { account: "RRSP-7", amountCents: 125_00 },
  { account: "TFSA-1", amountCents: -20_00 },
];

const deposits = txns.filter((t) => t.amountCents > 0).map((t) => t.amountCents / 100);
console.log(deposits);

const balances = txns.reduce<Record<string, number>>((acc, t) => {
  acc[t.account] = (acc[t.account] ?? 0) + t.amountCents;
  return acc;
}, {});
console.log(balances);
`),
        output(`
[ 50, 125 ]
{ 'TFSA-1': 3000, 'RRSP-7': 12500 }
`),
        p("ES2024's `Object.groupBy(txns, (t) => t.account)` groups items without a hand-written reduce. The amounts are kept in integer cents on purpose; the next question explains why."),
      ],
    },
    {
      id: "sb-js-money",
      question: "Why shouldn't you store money as a JavaScript `number`?",
      level: "junior",
      short:
        "`number` is a binary floating-point value, so most decimal fractions cannot be stored exactly: `0.1 + 0.2` is not `0.3`. Store money as integer minor units (cents), or use a decimal type on the server. Format it with `Intl.NumberFormat` only at the edge, for display.",
      body: [
        ts(`
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log((1.005).toFixed(2)); // 1.005 is really 1.00499999...

const totalCents = 10 + 20;
console.log(totalCents / 100);

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
console.log(cad.format(1234.5));
`),
        output(`
0.30000000000000004
false
1.00
0.3
$1,234.50
`),
        list(
          "On the wire, send amounts as integer cents or as decimal **strings** (`\"1234.50\"`), never as floats.",
          "On a Java backend, use `BigDecimal` with an explicit `RoundingMode`. The Java section covers it.",
          "Integers above `Number.MAX_SAFE_INTEGER` (2^53 - 1) lose precision. Use `BigInt`, or keep them as strings.",
        ),
        say("In a bank I'd keep amounts in integer cents or decimal strings end to end, and only format at the UI."),
      ],
    },
    {
      id: "sb-ts-basics",
      question: "`interface` vs `type`, and `any` vs `unknown` vs `never`?",
      level: "junior",
      short:
        "Both describe object shapes. An `interface` can be extended and merges with other declarations of the same name. A `type` alias can also name unions, tuples and mapped types. `any` turns type checking off, `unknown` makes you narrow before use, and `never` is the type of a value that cannot exist, which is what makes exhaustiveness checks work.",
      body: [
        ts(`
function parseAmount(input: unknown): number {
  if (typeof input === "number") return input;
  if (typeof input === "string" && input.trim() !== "" && !Number.isNaN(Number(input))) {
    return Number(input);
  }
  throw new Error("Not an amount");
}

interface Account {
  id: string;
}
interface Account {
  currency: "CAD" | "USD"; // declaration merging: Account now has both fields
}

type AccountType = "TFSA" | "RRSP" | "FHSA" | "RESP" | "NON_REGISTERED";
`),
        say("I use `unknown` for anything from outside, such as JSON or errors, and narrow it before use. I treat `any` as a code smell that needs a comment."),
      ],
    },
    {
      id: "sb-ts-generics",
      question: "How do you type an API layer with generics and utility types?",
      level: "intermediate",
      short:
        "Write the transport once as a generic, `getJson<T>`, and derive the narrower types from the domain model with `Pick`, `Omit`, `Partial` and `Record`, so they cannot drift apart. Remember that `as T` is a promise to the compiler, not a check. Validate untrusted responses at runtime with a schema library such as Zod.",
      body: [
        ts(`
interface Client {
  id: string;
  legalName: string;
  email: string;
  sin: string;
  riskTolerance: "low" | "medium" | "high";
}

type ClientSummary = Pick<Client, "id" | "legalName">;
type ClientUpdate = Partial<Omit<Client, "id" | "sin">>; // the SIN and id can't be edited
type PublicClient = Omit<Client, "sin">; // never send the SIN to the browser

interface ApiResponse<T> {
  data: T;
  requestId: string;
}

async function getJson<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(\`HTTP \${response.status} for \${url}\`);
  return (await response.json()) as ApiResponse<T>;
}

async function loadSummary(id: string): Promise<ClientSummary> {
  const { data } = await getJson<PublicClient>(\`/api/clients/\${id}\`);
  return { id: data.id, legalName: data.legalName };
}
`),
      ],
      followUps: [
        {
          q: "What does a generic constraint look like?",
          a: "`function byId<T extends { id: string }>(items: T[], id: string): T | undefined`. The constraint promises that `T` has an `id`, and the caller still gets its own full type back.",
        },
      ],
    },
    {
      id: "sb-ts-unions",
      question: "Model an account application's status so invalid states can't exist.",
      level: "intermediate",
      short:
        "Use a discriminated union: each status carries only the fields that make sense for it, and a `switch` on the tag narrows the type. A `never` check in the `default` branch makes the compiler flag every switch that misses a status someone adds later.",
      body: [
        ts(`
type Application =
  | { status: "draft"; savedAt: string }
  | { status: "submitted"; submittedAt: string }
  | { status: "approved"; accountNumber: string }
  | { status: "rejected"; reason: string };

function describe(app: Application): string {
  switch (app.status) {
    case "draft":
      return \`Draft saved \${app.savedAt}\`;
    case "submitted":
      return "Under review";
    case "approved":
      return \`Account \${app.accountNumber} opened\`;
    case "rejected":
      return \`Declined: \${app.reason}\`;
    default: {
      const unreachable: never = app;
      return unreachable;
    }
  }
}
`),
        p("Compare this with `{ status: string; accountNumber?: string; reason?: string }`, where a rejected application with an account number is a valid value. The union is the type-level version of a state machine."),
      ],
    },
  ],
};

export const SB_REACT: PrepSection = {
  id: "sb-react",
  track: "frontend",
  title: "React",
  blurb:
    "GWE builds client and account onboarding screens: long, multi-step forms with validation, saved drafts and accessibility requirements. Expect React fundamentals asked through that lens.",
  drill: "hooks",
  questions: [
    {
      id: "sb-react-rendering",
      question: "How does React decide what to update? What are keys for?",
      level: "junior",
      short:
        "When state changes, React calls the component again to get a new element tree, compares it with the previous one, and applies only the differences to the DOM. This is reconciliation. Keys tell React which list item is which between renders, so use a stable id. An index key breaks when items are reordered or inserted.",
      body: [
        tsx(`
interface Beneficiary {
  id: string;
  name: string;
  sharePercent: number;
}

function BeneficiaryList({ items }: { items: Beneficiary[] }) {
  return (
    <ul>
      {items.map((b) => (
        // key={index} would move each input's typed text to the wrong person after a deletion
        <li key={b.id}>
          {b.name}: <input defaultValue={b.sharePercent} aria-label={\`Share for \${b.name}\`} />
        </li>
      ))}
    </ul>
  );
}
`),
        list(
          "A render is a pure calculation. The **commit** is when React touches the DOM.",
          "A component re-renders when its state changes, when its parent re-renders, or when a context it reads changes.",
          "React 18 and later batch every state update in the same event into a single render.",
        ),
      ],
    },
    {
      id: "sb-react-state-props",
      question: "State vs props, and controlled vs uncontrolled inputs?",
      level: "junior",
      short:
        "Props are inputs the parent passes down, and they are read-only. State is data a component owns and changes over time. A controlled input gets its value from React state on every keystroke. An uncontrolled input keeps its value in the DOM, and you read it through a ref or `FormData`.",
      body: [
        tsx(`
function EmailField() {
  const [email, setEmail] = useState("");
  const invalid = email !== "" && !email.includes("@");

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={invalid}
        aria-describedby={invalid ? "email-error" : undefined}
      />
      {invalid && (
        <p id="email-error" role="alert">
          Enter a valid email address
        </p>
      )}
    </div>
  );
}
`),
        p("Use controlled inputs when the UI reacts as the user types: live validation, formatting a phone number, enabling the Next button. Uncontrolled inputs, or a library such as React Hook Form, are cheaper for big forms because typing does not re-render the whole form."),
        trap("When two siblings need the same data, lift the state to their nearest common parent. Don't copy props into state and then try to keep the two in sync."),
      ],
    },
    {
      id: "sb-react-effects",
      question: "Fetch a client's accounts in `useEffect`. What can go wrong?",
      level: "intermediate",
      short:
        "Effects sync a component with something outside React. A fetch inside one needs three things: the right dependencies, a cleanup that cancels the request when the id changes or the component unmounts, and loading and error states. Without the cleanup, a slow earlier response can land after a newer one and show the wrong client.",
      body: [
        tsx(`
interface Account {
  id: string;
  type: string;
  balanceCents: number;
}

function useAccounts(clientId: string) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(\`/api/clients/\${clientId}/accounts\`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`); // fetch resolves on 4xx/5xx
        return response.json() as Promise<Account[]>;
      })
      .then((data) => {
        setAccounts(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // the id changed or the component unmounted: drop the stale request
  }, [clientId]);

  return { accounts, error, loading };
}
`),
        list(
          "**Missing dependencies** leave you reading stale values. An object or function created during render, used as a dependency, re-runs the effect on every render, which can turn into a fetch loop.",
          "**StrictMode** in development mounts, unmounts and remounts each component once, so an effect without a proper cleanup shows up twice in the network tab.",
          "In production code, prefer a data library (TanStack Query, SWR) or server-side fetching in Next.js. They handle caching, retries and deduplication for you.",
        ),
      ],
    },
    {
      id: "sb-react-memo",
      question: "When do `useMemo`, `useCallback` and `React.memo` actually help?",
      level: "intermediate",
      short:
        "`React.memo` skips re-rendering a child whose props are shallowly equal to last time. `useCallback` and `useMemo` keep a function or a computed value stable between renders, which is only useful when something compares it: a memoised child or an effect's dependency array. Measure with the React Profiler before adding them. React Compiler can now add this memoisation automatically.",
      body: [
        tsx(`
interface Holding {
  id: string;
  symbol: string;
  marketValueCents: number;
}

const HoldingRow = memo(function HoldingRow({
  holding,
  onSelect,
}: {
  holding: Holding;
  onSelect: (id: string) => void;
}) {
  return (
    <tr onClick={() => onSelect(holding.id)}>
      <td>{holding.symbol}</td>
      <td>{(holding.marketValueCents / 100).toFixed(2)}</td>
    </tr>
  );
});

function Holdings({ holdings }: { holdings: Holding[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const onSelect = useCallback((id: string) => setSelected(id), []); // stable, so memo can skip rows
  const total = useMemo(() => holdings.reduce((sum, h) => sum + h.marketValueCents, 0), [holdings]);

  return (
    <table>
      <caption>
        Total {(total / 100).toFixed(2)}, selected {selected ?? "none"}
      </caption>
      <tbody>
        {holdings.map((h) => (
          <HoldingRow key={h.id} holding={h} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  );
}
`),
        trap("Wrapping everything in `useMemo` adds comparison work and makes the code harder to read. Restructure first: move state down, or pass components as `children`."),
      ],
    },
    {
      id: "sb-react-custom-hook",
      question: "Write a custom hook. When would you extract one?",
      level: "intermediate",
      short:
        "A custom hook is a function whose name starts with `use` and which calls other hooks. Extract one when the same stateful logic appears in two components, or when a component's effect code hides what the component is for. Each component that calls the hook gets its own copy of the state.",
      body: [
        tsx(`
function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id); // a new keystroke cancels the pending update
  }, [value, delayMs]);

  return debounced;
}

function AdvisorSearch() {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 400);

  useEffect(() => {
    if (debounced.length < 2) return;
    // fetch(\`/api/advisors?q=\${encodeURIComponent(debounced)}\`) ...
  }, [debounced]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Find an advisor" />;
}
`),
      ],
    },
    {
      id: "sb-react-state-placement",
      question: "Context, prop drilling, or a state library: where should state live?",
      level: "intermediate",
      short:
        "Sort state by kind. **Server state** (accounts, client profile) belongs in a data cache such as TanStack Query, or on the server. **URL state** (filters, the current step) belongs in the route. **Form state** belongs in the form. **Shared UI state** belongs in context or a small store. Context suits values that change rarely, such as theme, locale or the signed-in user. Every consumer re-renders when it changes.",
      body: [
        table(
          ["State", "Example in onboarding", "Where"],
          ["Server", "Client profile, account types offered", "TanStack Query / server component"],
          ["URL", "`/onboarding/joint-account?step=3`", "Router search params"],
          ["Form", "Field values, touched, errors", "Form library or `useReducer`"],
          ["Global UI", "Locale (EN/FR), advisor session", "Context"],
          ["Local UI", "Is the tooltip open", "`useState`"],
        ),
        say("Most of the 'global state' I've seen was server data that should have been cached, not copied into a store."),
      ],
    },
    {
      id: "sb-react-context-redux",
      question: "What's the difference between the Context API and Redux?",
      level: "junior",
      short:
        "Context is a **transport**. It passes a value down the tree without prop drilling, and every consumer re-renders when the value changes. It has no opinion on how the state is updated. Redux (in practice Redux Toolkit) is a **state container**. It is one store updated by pure reducers through dispatched actions, components subscribe to slices through selectors so they only re-render for what they read, and it adds middleware and time-travel devtools. Scotiabank candidates report this exact question, and the GWE senior posting lists Redux.",
      body: [
        table(
          ["", "Context (+ useReducer)", "Redux Toolkit"],
          ["What it is", "Dependency injection for a value", "A predictable global store"],
          ["Re-renders", "Every consumer when the value changes", "Only components whose selected slice changed"],
          ["Updates", "Whatever you put in the value", "Actions → reducers (Immer inside)"],
          ["Tooling", "React DevTools", "Redux DevTools, middleware, RTK Query"],
          ["Fits", "Theme, locale, auth user, small shared state", "Large apps with complex shared client state"],
        ),
        tsx(`
const LocaleContext = createContext<"en" | "fr">("en");

function useLocale() {
  return useContext(LocaleContext); // a value that changes rarely: a good fit for context
}

function App({ children }: { children: ReactNode }) {
  const [locale] = useState<"en" | "fr">("en");
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
`),
        say("I'd use context for values that change rarely, such as locale or the signed-in advisor, a data-fetching cache for server state, and Redux Toolkit only when there is a lot of complex, frequently changing client state shared across the app."),
      ],
    },
    {
      id: "sb-react-wizard",
      question: "How would you build a multi-step account-opening form?",
      level: "intermediate",
      short:
        "Keep one draft object and move between steps with a reducer. Validate each step before letting the user advance, save the draft to the server so the client or advisor can resume, keep the current step in the URL, and validate everything again on the server at submit. Each step needs a heading and focus management for screen readers, and errors that are announced.",
      body: [
        tsx(`
const STEPS = ["identity", "contact", "employment", "review"] as const;

interface Draft {
  legalName: string;
  dateOfBirth: string;
  email: string;
  employer: string;
}

type Action =
  | { type: "update"; field: keyof Draft; value: string }
  | { type: "next" }
  | { type: "back" };

interface WizardState {
  step: number;
  draft: Draft;
}

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "update":
      return { ...state, draft: { ...state.draft, [action.field]: action.value } };
    case "next":
      return { ...state, step: Math.min(state.step + 1, STEPS.length - 1) };
    case "back":
      return { ...state, step: Math.max(state.step - 1, 0) };
  }
}

const VALIDATORS: Record<(typeof STEPS)[number], (d: Draft) => string[]> = {
  identity: (d) => (d.legalName.trim() ? [] : ["Legal name is required"]),
  contact: (d) => (/^[^@\\s]+@[^@\\s]+$/.test(d.email) ? [] : ["Enter a valid email"]),
  employment: () => [],
  review: () => [],
};

function OpenAccountWizard({ initial }: { initial: Draft }) {
  const [state, dispatch] = useReducer(reducer, { step: 0, draft: initial });
  const [errors, setErrors] = useState<string[]>([]);
  const step = STEPS[state.step];

  function next() {
    const found = VALIDATORS[step](state.draft);
    setErrors(found);
    if (found.length === 0) dispatch({ type: "next" }); // also: PUT /applications/:id/draft to save progress
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} aria-labelledby="step-title">
      <h2 id="step-title" tabIndex={-1}>
        Step {state.step + 1} of {STEPS.length}: {step}
      </h2>
      {errors.length > 0 && (
        <ul role="alert">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      {/* render the fields for the current step here */}
      <button type="button" onClick={() => dispatch({ type: "back" })} disabled={state.step === 0}>
        Back
      </button>
      <button type="button" onClick={next}>
        Next
      </button>
    </form>
  );
}
`),
        list(
          "**Server is the authority.** Client-side validation is for user experience. The API validates again, and so do the KYC and compliance rules.",
          "**Drafts and resume.** Save after each step. Submit with an idempotency key, so a double-click or a retry opens one account, not two.",
          "**Bilingual.** Canadian banks serve clients in English and French, so keep every label and error message in translation files from day one.",
          "**Accessibility (WCAG 2.1 AA, AODA in Ontario).** Real `<label>`s, `aria-invalid`, an error summary that receives focus, focus moved to the new step's heading, and never colour alone to show an error.",
        ),
      ],
    },
    {
      id: "sb-react-a11y",
      question: "What makes a form accessible?",
      level: "junior",
      short:
        "Every input has a visible `<label>` tied to it. Errors are linked to their fields with `aria-describedby` and announced to screen readers. Native elements are used before ARIA. Everything works from the keyboard with a visible focus ring. The page meets WCAG 2.1 AA contrast, which in Ontario is a legal requirement under AODA.",
      body: [
        list(
          "Group related inputs (a mailing address, account-type radios) in a `<fieldset>` with a `<legend>`.",
          "Mark required fields with text or a symbol, plus the `required` attribute. Colour alone is not enough.",
          "When validation fails on submit, move focus to an error summary that links to each invalid field.",
          "Test with axe in CI, keyboard-only navigation, and a screen reader (VoiceOver or NVDA).",
        ),
      ],
    },
    {
      id: "sb-react-errors-loading",
      question: "How do you handle loading and error states across a page?",
      level: "intermediate",
      short:
        "Wrap parts of the page in `<Suspense>` with a loading fallback, so data-loading components can suspend, and wrap them in error boundaries that catch render errors and show a fallback with a retry. Error boundaries don't catch errors in event handlers or async code; handle those with `try`/`catch` and state.",
      body: [
        tsx(`
class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack); // in production: send to monitoring, without PII
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function AccountsPanel({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<p>We couldn&apos;t load your accounts. Try again later.</p>}>
      <Suspense fallback={<p>Loading accounts…</p>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
`),
        p("In the Next.js App Router, `loading.tsx` and `error.tsx` files create these same boundaries for each route segment."),
      ],
    },
    {
      id: "sb-react-performance",
      question: "A page with thousands of rows is slow. How do you speed it up?",
      level: "intermediate",
      short:
        "Measure first, with the React Profiler and the browser's Performance panel. Then: paginate on the server or virtualise the list so only visible rows render, memoise rows that receive stable props, move fast-changing state down the tree, debounce filters or wrap them in `useTransition`, and code-split heavy screens with `lazy`.",
      body: [
        list(
          "**Virtualisation** (TanStack Virtual, react-window) renders about 30 rows instead of 10,000.",
          "**`useTransition` / `useDeferredValue`** keep typing responsive while an expensive filter re-renders at a lower priority.",
          "**Bundle size:** check imports, avoid barrel files that pull in whole libraries, and lazy-load charts.",
          "**Network:** avoid request waterfalls. In Next.js, fetch on the server, in parallel.",
        ),
      ],
    },
  ],
};

export const SB_NEXTJS: PrepSection = {
  id: "sb-nextjs",
  track: "frontend",
  title: "Next.js",
  blurb:
    "The posting names Next.js beside React. Juniors get asked about rendering strategies, Server vs Client Components, and how to keep secrets and auth on the server. Ask which version they run: caching defaults changed in 15, and 16 renamed middleware to proxy.",
  drill: "server-components",
  questions: [
    {
      id: "sb-next-rendering",
      question: "CSR, SSR, SSG and ISR: which would you use for which page?",
      level: "junior",
      short:
        "**SSG** builds the HTML once, at build time: marketing and help pages. **ISR** is static HTML regenerated on a timer or on demand: rates and product pages. **SSR** renders on every request: anything personal, such as an account dashboard. **CSR** renders in the browser after JavaScript loads: highly interactive widgets. The App Router mixes these per route and per component.",
      body: [
        table(
          ["Page", "Strategy", "Why"],
          ["Scotia Wealth landing page", "Static (SSG)", "Same for everyone, fastest, cacheable on a CDN"],
          ["GIC rates table", "ISR / revalidate", "Changes daily, not per user"],
          ["Client's account summary", "Dynamic (SSR) + streaming", "Personal, must be fresh, needs auth"],
          ["Portfolio chart with filters", "Client Component", "Interactive, needs browser state"],
        ),
      ],
    },
    {
      id: "sb-next-server-client",
      question: "What are Server Components, and when do you need `\"use client\"`?",
      level: "intermediate",
      short:
        "In the App Router, components are Server Components by default. They run only on the server, can be `async`, can read databases and secrets directly, and send no JavaScript to the browser. Add `\"use client\"` at the top of a file when a component needs state, effects, event handlers or browser APIs. Everything that file imports becomes part of the client bundle.",
      body: [
        tsx(
          `
import { cookies } from "next/headers";

interface Account {
  id: string;
  nickname: string;
  balanceCents: number;
}

async function getAccounts(apiUrl: string): Promise<Account[]> {
  const session = (await cookies()).get("session")?.value; // cookies() is async since Next 15
  const response = await fetch(\`\${apiUrl}/accounts\`, {
    headers: { Authorization: \`Bearer \${session}\` },
    cache: "no-store", // personal data: never cache it across users
  });
  if (!response.ok) throw new Error("Failed to load accounts");
  return response.json();
}

export default async function AccountsPage() {
  const accounts = await getAccounts("https://accounts.internal.example");
  return (
    <ul>
      {accounts.map((account) => (
        <li key={account.id}>{account.nickname}</li>
      ))}
    </ul>
  );
}
`,
          { caption: "Server Component, app/accounts/page.tsx" },
        ),
        list(
          "Props passed from a Server Component to a Client Component must be serialisable: no functions, no class instances.",
          "Keep `\"use client\"` as far down the tree as you can, on the interactive part only, such as a chart or a filter bar.",
          "Fetching on the server avoids client-side waterfalls, and the tokens never reach the browser.",
        ),
      ],
    },
    {
      id: "sb-next-caching",
      question: "How do data fetching and caching work in the App Router?",
      level: "intermediate",
      short:
        "It depends on the version. Next 13 and 14 cached `fetch` by default, and you opted out with `cache: \"no-store\"`. Next 15 made fetch uncached by default. Next 16 adds Cache Components: you cache a function or a component explicitly with `\"use cache\"` and `cacheLife`, and stream uncached data inside `<Suspense>`. Either way, revalidate with `revalidatePath` or `revalidateTag` after a mutation.",
      body: [
        list(
          "Never cache anything personal in a shared cache. Account data is per request.",
          "Use time-based revalidation for slowly changing public data (rates), and tag-based revalidation when you know exactly what changed.",
          "Start independent fetches in parallel (`Promise.all`) rather than awaiting them one after another in nested components.",
        ),
        say("I'd ask which Next version the team is on, because the caching defaults flipped in 15 and Cache Components arrived in 16."),
      ],
      docs: "https://nextjs.org/docs/app/getting-started/caching",
    },
    {
      id: "sb-next-route-handlers",
      question: "Route Handlers vs Server Actions: how would you build a small backend-for-frontend?",
      level: "intermediate",
      short:
        "A Route Handler (`app/api/.../route.ts`) is an HTTP endpoint you define with `GET`, `POST` and so on: good for webhooks, for other clients, and for proxying to microservices. A Server Action is an async function marked `\"use server\"` that a form or a button calls directly. It is still a public POST endpoint, so it has to authenticate, authorise and validate like any API.",
      body: [
        ts(
          `
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // params are async since Next 15
  if (!/^[A-Z0-9-]{4,20}$/.test(id)) {
    return NextResponse.json({ title: "Invalid client id" }, { status: 400 });
  }
  const upstream = await fetch(\`https://clients.internal.example/clients/\${id}\`);
  if (upstream.status === 404) return NextResponse.json({ title: "Not found" }, { status: 404 });
  const client = await upstream.json();
  return NextResponse.json({ id: client.id, legalName: client.legalName }); // strip fields the UI doesn't need
}
`,
          { caption: "Route Handler, app/api/clients/[id]/route.ts" },
        ),
        ts(
          `
"use server";
import { revalidatePath } from "next/cache";

export async function updateEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
    return { ok: false as const, error: "Enter a valid email" };
  }
  // check the session and that this user may edit this profile before writing
  await saveEmail(email);
  revalidatePath("/profile");
  return { ok: true as const };
}
`,
          { caption: "Server Action, app/profile/actions.ts" },
        ),
      ],
    },
    {
      id: "sb-next-proxy",
      question: "How do you protect authenticated routes in Next.js?",
      level: "intermediate",
      short:
        "Do a fast check in the proxy file (it was called middleware before Next 16): no session cookie, redirect to sign-in. Then do the real authorisation where the data is read, in the Server Component, Route Handler or Server Action, and again in the backend API. The proxy alone is not a security boundary.",
      body: [
        ts(
          `
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.has("session")) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/accounts/:path*", "/onboarding/:path*"] };
`,
          { caption: "Optimistic check, proxy.ts" },
        ),
        trap("Checking auth only in a layout or in the proxy, and not in the data layer. Requests can reach Server Actions and Route Handlers directly."),
      ],
      docs: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy",
    },
    {
      id: "sb-next-env",
      question: "How do environment variables work in Next.js, and what's the risk?",
      level: "junior",
      short:
        "Variables are server-only by default. Any variable prefixed `NEXT_PUBLIC_` is written into the browser bundle at build time, where anyone can read it. Never give a secret, an API key or a connection string that prefix. In the cloud, read secrets from Key Vault or Secret Manager at runtime instead of baking them into the build.",
      body: [
        list(
          "`NEXT_PUBLIC_` values are fixed at build time, so the same image cannot pick up different values in dev and prod unless they are read on the server at runtime.",
          "Add `import \"server-only\"` to modules that touch secrets, so importing one from a Client Component fails the build.",
          "Keep `.env*` files out of Git, and rotate any secret that was ever committed.",
        ),
      ],
    },
    {
      id: "sb-next-performance",
      question: "What does Next.js give you for performance out of the box?",
      level: "junior",
      short:
        "Automatic code splitting per route, prefetching of `<Link>` targets, `next/image` (resizing, modern formats, lazy loading, no layout shift), `next/font` (self-hosted fonts with no layout shift), static rendering and streaming. Track the results with Core Web Vitals: LCP, INP and CLS.",
      body: [
        list(
          "**LCP:** server-render the main content, give the hero image priority, keep the critical CSS small.",
          "**INP:** ship less client JavaScript (Server Components help), split long tasks, use transitions.",
          "**CLS:** set image sizes, use `next/font`, and reserve space for content that loads late.",
        ),
      ],
    },
  ],
};
