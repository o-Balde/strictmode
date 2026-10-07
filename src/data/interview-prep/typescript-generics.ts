import { list, p, say, table, trap, ts } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_GENERICS: PrepSection = {
  id: "ts-generics",
  track: "typescript",
  title: "Generics and utility types",
  blurb:
    "Where mid-level interviews spend most of their time. You should be able to write a constrained generic function from memory and explain every built-in utility type.",
  drill: "generics",
  questions: [
    {
      id: "ts-generics-basics",
      question: "What are generics, and what problem do they solve?",
      level: "junior",
      short:
        "A generic is a type parameter: a placeholder filled in by the caller. It lets one function, class or type work over many types while keeping the relationship between its inputs and outputs, which `any` throws away.",
      body: [
        ts(`
function firstAny(items: any[]): any {
  return items[0];
}

function first<T>(items: T[]): T | undefined {
  return items[0];
}

const lost = firstAny([1, 2, 3]); // any: the link between input and output is gone
const n = first([1, 2, 3]); // number | undefined, inferred from the argument
const s = first(["a", "b"]); // string | undefined
const explicit = first<Date>([]); // T supplied by hand when there is nothing to infer from
`),
        p("The same idea applies to types, interfaces and classes:"),
        ts(`
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

class Dictionary<V> {
  #entries = new Map<string, V>();

  set(key: string, value: V) {
    this.#entries.set(key, value);
  }

  get(key: string): V | undefined {
    return this.#entries.get(key);
  }
}

const ages = new Dictionary<number>();
ages.set("ada", 36);
ages.set("bob", "forty"); // error: string is not assignable to number
`),
        say(
          "A generic links types together. If a function takes a `T` and returns a `T`, the caller gets back exactly what they put in, without me knowing what it is.",
        ),
      ],
      followUps: [
        {
          q: "How is `T` decided?",
          a: "By inference from the arguments wherever possible. You only pass it explicitly when there is nothing to infer from (`useState<User | null>(null)`, `new Map<string, number>()`), or to override a too-narrow inference.",
        },
        {
          q: "Do generics exist at runtime?",
          a: "No. They are erased with every other type, so you cannot write `new T()` or `value instanceof T`. If you need the type at runtime, pass a value that carries it: a constructor, a schema, a type guard.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    },
    {
      id: "ts-generic-constraints",
      question: "What is a generic constraint? Write a type-safe `getProperty(obj, key)`.",
      level: "intermediate",
      short:
        "`T extends Something` restricts what a type parameter may be, which is what lets the function body use that shape. For `getProperty`, constrain the key to `keyof T` and return the indexed access type `T[K]`.",
      body: [
        ts(`
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest([1, 2], [3]); // number[]
longest("alice", "bob"); // "alice" | "bob"
longest(10, 20); // error: number has no 'length' property
`),
        ts(`
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ada", tags: ["admin"] };

const name = getProperty(user, "name"); // string
const tags = getProperty(user, "tags"); // string[]
getProperty(user, "email"); // error: "email" is not a key of user
`),
        list(
          "`keyof T` is the union of T's keys: here `\"id\" | \"name\" | \"tags\"`.",
          "`K extends keyof T` lets `K` be inferred as the one literal the caller passed.",
          "`T[K]` looks up the type of that property, so each call returns a different, exact type.",
        ),
        trap(
          "Writing `key: keyof T` without the second type parameter compiles, but the return type becomes the union of every property type (`string | number | string[]`), because the compiler no longer knows which key was passed.",
        ),
      ],
      followUps: [
        {
          q: "Does `extends` here mean inheritance?",
          a: "No. In a constraint it means 'is assignable to'. `T extends string | number` accepts `string`, `number`, and any literal or union of them.",
        },
        {
          q: "How would you type a `pluck(items, key)` that returns an array of that property?",
          a: "`function pluck<T, K extends keyof T>(items: T[], key: K): T[K][]`, returning `items.map((item) => item[key])`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
    },
    {
      id: "ts-generics-when-not",
      question: "When is a generic the wrong tool?",
      level: "senior",
      short:
        "When the type parameter appears only once. A generic exists to relate two or more positions; if it relates nothing, it is `unknown` with extra syntax. And a type parameter that appears only in the return type is a type assertion in disguise.",
      body: [
        ts(`
// Pointless: T is used once, so it constrains nothing.
function logValue<T>(value: T): void {
  console.log(value);
}
function logSimpler(value: unknown): void {
  console.log(value);
}

// Useful: T links the argument to the result.
function wrap<T>(value: T): { value: T } {
  return { value };
}

// Dangerous: the caller picks T and nothing checks it.
async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

const user = await getJson<{ id: string }>("/api/user"); // reads like a check; it is a cast
`),
        list(
          "**Rule of thumb:** every type parameter should appear at least twice in the signature.",
          "**Push constraints down.** Prefer `<T>(items: T[])` over `<A extends unknown[]>(items: A)`: the simpler the parameter, the better the inference.",
          "**Defaults** (`<T = unknown>`) keep a generic type convenient when most callers do not care.",
        ),
      ],
      followUps: [
        {
          q: "How do you stop one argument from widening the inferred type?",
          a: "Wrap the other positions in `NoInfer<T>` (5.4). In `createMachine<S extends string>(states: S[], initial: NoInfer<S>)`, `S` is inferred only from `states`, so a misspelt `initial` is an error instead of a new member of the union.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/functions.html#guidelines-for-writing-good-generic-functions",
    },
    {
      id: "ts-keyof-typeof",
      question: "What do `keyof`, `typeof` and indexed access types do? How do you derive a type from a value?",
      level: "intermediate",
      short:
        "`typeof value` gives the static type of a value. `keyof T` gives the union of T's keys. `T[K]` looks up the type of a property. Together they let you write the data once and compute the types from it, so the two cannot drift apart.",
      body: [
        ts(`
const routes = {
  home: "/",
  settings: "/settings",
  profile: "/u/:id",
} as const;

type Routes = typeof routes; // the type of the value
type RouteName = keyof Routes; // "home" | "settings" | "profile"
type RoutePath = Routes[RouteName]; // "/" | "/settings" | "/u/:id"

function href(to: RouteName): RoutePath {
  return routes[to];
}

interface Order {
  id: string;
  customer: { email: string; addresses: { city: string }[] };
}

type Email = Order["customer"]["email"]; // string
type Address = Order["customer"]["addresses"][number]; // { city: string }
`),
        p(
          "`[number]` indexes an array or tuple type by 'any numeric index', which yields its element type. It is the standard way to turn a `const` array into a union.",
        ),
        ts(`
const SIZES = ["sm", "md", "lg"] as const;
type Size = (typeof SIZES)[number]; // "sm" | "md" | "lg"

const isSize = (value: string): value is Size =>
  (SIZES as readonly string[]).includes(value); // one list drives the type and the runtime check
`),
      ],
      followUps: [
        {
          q: "How is this `typeof` different from JavaScript's?",
          a: "In an expression, `typeof x` is the runtime operator and returns a string. In a type position it is a type query and returns the full static type. Same keyword, two languages.",
        },
        {
          q: "What is `keyof` of a union?",
          a: "Only the keys common to every member, because those are the only ones that are safe to access. `keyof (A | B)` is `keyof A & keyof B`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
    },
    {
      id: "ts-utility-types",
      question: "Which built-in utility types do you use, and what does each one do?",
      level: "junior",
      short:
        "The everyday ones reshape object types (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`), filter unions (`Exclude`, `Extract`, `NonNullable`) and read function types (`Parameters`, `ReturnType`, `Awaited`). They are all ordinary mapped and conditional types that ship with the compiler.",
      body: [
        table(
          ["Utility", "Result"],
          ["`Partial<T>`", "Every property optional"],
          ["`Required<T>`", "Every property required"],
          ["`Readonly<T>`", "Every property `readonly` (shallow)"],
          ["`Pick<T, K>`", "Only the listed keys"],
          ["`Omit<T, K>`", "Everything except the listed keys"],
          ["`Record<K, V>`", "An object with keys `K` and values `V`"],
          ["`Exclude<U, M>`", "Union members of `U` not assignable to `M`"],
          ["`Extract<U, M>`", "Union members of `U` assignable to `M`"],
          ["`NonNullable<T>`", "`T` without `null` and `undefined`"],
          ["`Parameters<F>`", "A function's parameters as a tuple"],
          ["`ReturnType<F>`", "A function's return type"],
          ["`Awaited<P>`", "What a promise resolves to, recursively"],
        ),
        ts(`
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, "password">;
type Credentials = Pick<User, "email" | "password">;
type UserPatch = Partial<Omit<User, "id">>; // any subset of fields, never the id
type UsersById = Record<User["id"], PublicUser>;

type Event = "click" | "focus" | "submit" | null;
type PointerOrFocus = Extract<Event, "click" | "focus">; // "click" | "focus"
type RealEvent = NonNullable<Event>; // "click" | "focus" | "submit"

declare function createUser(input: Omit<User, "id">): Promise<User>;
type CreateInput = Parameters<typeof createUser>[0]; // Omit<User, "id">
type Created = Awaited<ReturnType<typeof createUser>>; // User
`),
        trap(
          "`Omit` does not check its keys, so `Omit<User, \"pasword\">` compiles and removes nothing. It also does not distribute over unions: applied to a discriminated union it flattens the members into one object type and the discrimination is lost.",
        ),
      ],
      followUps: [
        {
          q: "How do you fix `Omit` for a union?",
          a: "Make it distribute: `type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never`. The conditional type runs once per member and re-unions the results.",
        },
        {
          q: "How would you make just one property optional?",
          a: "`type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>`. Composing the built-ins usually beats writing a new mapped type.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
    },
    {
      id: "ts-implement-utility-types",
      question: "Implement `Partial`, `Pick`, `Omit`, `Exclude` and `ReturnType` yourself.",
      level: "senior",
      short:
        "The object utilities are mapped types (`[K in keyof T]`) with modifiers; the union utilities are distributive conditional types; the function utilities use `infer` to pull a type out of a pattern.",
      body: [
        ts(`
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] }; // -? removes optionality
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyRecord<K extends PropertyKey, V> = { [P in K]: V };

type MyExclude<U, M> = U extends M ? never : U; // distributes over each member of U
type MyExtract<U, M> = U extends M ? U : never;
type MyNonNullable<T> = T & {}; // {} is "anything but null and undefined"

type MyOmit<T, K extends PropertyKey> = MyPick<T, MyExclude<keyof T, K>>;

type MyParameters<F> = F extends (...args: infer P) => unknown ? P : never;
type MyReturnType<F> = F extends (...args: never[]) => infer R ? R : never;
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;
`),
        p(
          "If you are asked how you would know these are right, the answer is a type-level test. `Equal` compares two types exactly, and `Expect` fails to compile when it is given `false`:",
        ),
        ts(`
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyExclude<U, M> = U extends M ? never : U;
type MyOmit<T, K extends PropertyKey> = MyPick<T, MyExclude<keyof T, K>>;
type MyReturnType<F> = F extends (...args: never[]) => infer R ? R : never;
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

type Tests = [
  Expect<Equal<MyPick<Todo, "id" | "done">, { id: number; done: boolean }>>,
  Expect<Equal<MyOmit<Todo, "done">, { id: number; title: string }>>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyReturnType<(x: string) => Promise<number>>, Promise<number>>>,
  Expect<Equal<MyAwaited<Promise<Promise<string>>>, string>>,
];
`,
          { caption: "Proving it" },
        ),
      ],
      followUps: [
        {
          q: "Why does the mapped-type version keep `readonly` and `?` from the original?",
          a: "Mapping over `keyof T` is a homomorphic mapped type: the compiler knows the keys come from `T` and copies each property's modifiers across. Mapping over an unrelated union of strings does not.",
        },
        {
          q: "Why is `MyOmit` constrained to `PropertyKey` rather than `keyof T`?",
          a: "That matches the built-in. It lets you omit keys that might not exist, which is convenient for generic code and is also exactly why typos are not caught.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
    },
  ],
};
