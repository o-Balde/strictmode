import { list, p, say, table, trap, ts } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_FUNDAMENTALS: PrepSection = {
  id: "ts-fundamentals",
  track: "typescript",
  title: "TypeScript fundamentals",
  blurb:
    "The warm-up round. Almost every TypeScript interview opens here, and a vague answer to any of these sets the tone for the rest.",
  drill: "types",
  questions: [
    {
      id: "ts-what-is-typescript",
      question: "What is TypeScript, and what does it actually give you over JavaScript?",
      level: "junior",
      short:
        "TypeScript is JavaScript plus a static type system that is checked at compile time and then erased. It catches a whole class of bugs before the code runs, and it is what makes editor tooling (autocomplete, safe renames, jump to definition) trustworthy on a large codebase.",
      body: [
        list(
          "**A superset.** Every valid JavaScript program is syntactically valid TypeScript, so a codebase can adopt it file by file.",
          "**Compile-time only.** `tsc` (or Babel, SWC, esbuild) strips the types and emits plain JavaScript. Nothing about your types exists at runtime.",
          "**Structural.** Two types are compatible when their shapes match, not when their names match.",
          "**Inferred.** You annotate the boundaries (parameters, public return types) and the compiler works out the rest.",
        ),
        ts(`
function total(price: number, quantity: number) {
  return price * quantity;
}

total(9.99, 3); // ok
total("9.99", 3); // error: string is not assignable to number
total(9.99); // error: expected 2 arguments, but got 1
`),
        p(
          "Beyond catching mistakes, the types are documentation that cannot go stale, and they make refactoring mechanical: change a function signature and the compiler lists every call site you broke.",
        ),
        trap(
          "TypeScript does not validate data at runtime. A `fetch` response typed as `User` is a claim, not a check. If the server sends something else, the bug surfaces far from where the lie was told.",
        ),
      ],
      followUps: [
        {
          q: "Does TypeScript make the code faster?",
          a: "No. Types are erased, so the emitted JavaScript runs exactly as hand-written JavaScript would. The win is in correctness and maintenance, not performance.",
        },
        {
          q: "What does it cost?",
          a: "A build step, compile time on large projects, a learning curve for the advanced type features, and the temptation to trust types at boundaries where they were only asserted (`any`, `as`, untyped JSON).",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
    },
    {
      id: "ts-any-unknown-never",
      question: "What is the difference between `any`, `unknown`, `never` and `void`?",
      level: "junior",
      short:
        "`any` switches the type checker off for a value. `unknown` is the safe version: it accepts anything, but you must narrow it before using it. `never` is the type with no values, for code that cannot be reached. `void` means a function's return value is not meant to be used.",
      body: [
        table(
          ["Type", "What you can assign to it", "What you can do with it"],
          ["`any`", "Anything", "Anything. No checking, and it spreads to whatever it touches."],
          ["`unknown`", "Anything", "Nothing, until you narrow it with a check."],
          ["`never`", "Nothing", "It is assignable to every type; it marks impossible states."],
          ["`void`", "`undefined`", "Signals that a return value should be ignored."],
        ),
        ts(`
declare const input: unknown;

input.toUpperCase(); // error: 'input' is of type 'unknown'

if (typeof input === "string") {
  input.toUpperCase(); // ok: narrowed to string
}

const anything: any = input;
anything.foo.bar(); // compiles, then throws at runtime

function fail(message: string): never {
  throw new Error(message);
}
`),
        p(
          "Reach for `unknown` wherever a value arrives from outside the type system: `JSON.parse`, a `catch` clause, `postMessage`, a third-party callback. It forces the check that `any` lets you skip.",
        ),
        trap(
          "`any` is contagious. One `any` return type silently turns every value derived from it into `any` as well, and the compiler stops reporting anything along that path.",
        ),
      ],
      followUps: [
        {
          q: "Where does `never` show up in real code?",
          a: "As the return type of functions that always throw or loop forever, as the type left over once a union has been fully narrowed (which powers exhaustiveness checks), and as the way to drop members inside conditional types.",
        },
        {
          q: "What is the difference between `void` and `undefined`?",
          a: "A function typed to return `undefined` must return exactly that. A callback typed `() => void` may return anything, and the caller promises to ignore it. That is why `items.forEach((item) => list.push(item))` type-checks even though `push` returns a number.",
        },
        {
          q: "What is the type of the variable in a `catch` clause?",
          a: "`unknown` under `strict` (via `useUnknownInCatchVariables`), because anything can be thrown. Narrow with `instanceof Error` before reading `.message`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/functions.html#other-types-to-know-about",
    },
    {
      id: "ts-interface-vs-type",
      question: "`interface` or `type`: what is the difference, and when do you use each?",
      level: "junior",
      short:
        "For object shapes they are nearly interchangeable. An `interface` can be extended and reopened (declaration merging); a `type` alias can name anything, including unions, tuples and mapped or conditional types, but cannot be reopened. Pick one convention for objects and use `type` whenever you need something an interface cannot express.",
      body: [
        ts(`
interface User {
  id: string;
  name: string;
}
interface Admin extends User {
  permissions: string[];
}

type AdminAlias = User & { permissions: string[] }; // intersection instead of extends
type Id = string | number; // only an alias can name a union
type Point = [x: number, y: number]; // ...or a tuple
type Getter<T> = () => T; // ...or a function type

interface Box { width: number }
interface Box { height: number }
const box: Box = { width: 1, height: 2 }; // ok: the two declarations merged

type Size = { width: number };
// type Size = { height: number }; // error: Duplicate identifier 'Size'
`),
        table(
          ["", "`interface`", "`type`"],
          ["Object shapes", "Yes", "Yes"],
          ["Unions, tuples, primitives", "No", "Yes"],
          ["Mapped and conditional types", "No", "Yes"],
          ["Extending", "`extends` (conflicts are reported)", "`&` (conflicts quietly become `never`)"],
          ["Declaration merging", "Yes", "No"],
          ["`implements` on a class", "Yes", "Yes, for object types"],
        ),
        say(
          "I default to `interface` for public object shapes that others may extend, and `type` for unions, function signatures and anything computed. What matters most is that the team is consistent.",
        ),
      ],
      followUps: [
        {
          q: "When is declaration merging actually useful?",
          a: "Augmenting types you do not own: adding a property to `Window`, extending a library's `Theme` or session type, or adding fields to Express's `Request`.",
        },
        {
          q: "Is there a performance difference?",
          a: "On very large codebases, yes, slightly. `interface extends` relationships are cached by name, while big intersections are re-evaluated structurally. It only matters at scale.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
    },
    {
      id: "ts-inference-as-const",
      question: "How does type inference work, and what does `as const` do?",
      level: "intermediate",
      short:
        "TypeScript infers a type from the initializer. A `let` or a mutable property is widened to the general type (`string`), while a `const` keeps the literal (`\"dark\"`). `as const` asks for the narrowest possible type everywhere: literals stay literals, objects become `readonly`, arrays become readonly tuples.",
      body: [
        ts(`
let mode = "dark"; // string: a let can be reassigned, so the literal widens
const theme = "dark"; // "dark": a const cannot change, so the literal is kept

const config = { env: "prod", retries: 3 };
// { env: string; retries: number } because properties are mutable

const frozen = { env: "prod", retries: 3 } as const;
// { readonly env: "prod"; readonly retries: 3 }

const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number]; // "admin" | "editor" | "viewer"
`),
        p("The classic bug it fixes is a literal that widened before it reached a function expecting a union:"),
        ts(`
declare function request(url: string, method: "GET" | "POST"): void;

const req = { url: "/users", method: "GET" };
request(req.url, req.method); // error: string is not assignable to "GET" | "POST"

const fixed = { url: "/users", method: "GET" } as const;
request(fixed.url, fixed.method); // ok
`),
        trap(
          "`as const` is compile-time only. It does not freeze anything: the object can still be mutated by untyped code at runtime. `Object.freeze` is the runtime tool, and it is shallow.",
        ),
      ],
      followUps: [
        {
          q: "When should you write an annotation instead of relying on inference?",
          a: "At boundaries: function parameters always, and return types of exported functions so a change in the body cannot silently change the public contract. Locals are best left to inference.",
        },
        {
          q: "What is a `const` type parameter?",
          a: "Since TypeScript 5.0, `function f<const T>(value: T)` infers `T` as if the caller had written `as const`, so `f([\"a\", \"b\"])` gives `readonly [\"a\", \"b\"]` instead of `string[]`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
    },
    {
      id: "ts-union-intersection",
      question: "What are union and intersection types?",
      level: "junior",
      short:
        "A union `A | B` is a value that is one or the other, so you may only use what both have in common until you narrow. An intersection `A & B` is a value that is both at once, so it has every member of each.",
      body: [
        ts(`
type Id = string | number;

function format(id: Id) {
  id.toFixed(); // error: 'toFixed' does not exist on type 'string'
  return typeof id === "number" ? id.toFixed(0) : id.trim();
}

type Timestamps = { createdAt: Date; updatedAt: Date };
type Post = { title: string } & Timestamps; // has all three properties

type Impossible = string & number; // never: no value is both
`),
        p(
          "The naming feels backwards for objects until you think in sets of values: a union admits more values, so you know less about any one of them; an intersection admits fewer values, so you know more.",
        ),
        trap(
          "Intersecting object types with a conflicting property does not error. The property becomes `never` and the type is unusable. `interface extends` reports the conflict instead.",
        ),
      ],
      followUps: [
        {
          q: "How do you safely use a union of object types?",
          a: "Give every member a shared literal property (a discriminant such as `kind` or `status`) and switch on it. That is a discriminated union, and it is the single most useful pattern in application TypeScript.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
    },
    {
      id: "ts-structural-typing",
      question: "TypeScript is structurally typed. What does that mean, and what are excess property checks?",
      level: "intermediate",
      short:
        "Compatibility is decided by shape: if a value has at least the required members with compatible types, it is assignable, whatever its declared name. The one exception is a fresh object literal, where extra properties are reported because they are almost always typos.",
      body: [
        ts(`
interface Point {
  x: number;
  y: number;
}

class Vector {
  constructor(public x: number, public y: number, public z: number) {}
}

const fromClass: Point = new Vector(1, 2, 3); // ok: it has x and y, which is all Point asks for

const literal: Point = { x: 1, y: 2, z: 3 }; // error: 'z' does not exist in type 'Point'

const wide = { x: 1, y: 2, z: 3 };
const viaVariable: Point = wide; // ok: the excess property check only applies to fresh literals
`),
        p(
          "Languages like Java and C# are nominal: a `Vector` is a `Point` only if it says so. Structural typing fits JavaScript, where objects are routinely built as literals and passed around without classes.",
        ),
      ],
      followUps: [
        {
          q: "How do you get nominal behaviour when you need it, say to stop a `UserId` being passed as an `OrderId`?",
          a: "Brand the type: intersect the primitive with a phantom property that only a constructor function can add. The brand exists only at the type level; at runtime the value is still a plain string.",
        },
        {
          q: "Why are the excess property checks limited to literals?",
          a: "Because a literal has no other use, an unknown key is certainly a mistake. A variable may legitimately carry more than this consumer needs, and rejecting it would break ordinary subtyping.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
    },
    {
      id: "ts-branded-types",
      question: "How would you stop two IDs that are both strings from being mixed up?",
      level: "senior",
      short:
        "With branded (opaque) types: intersect the primitive with a unique phantom property, and only hand out the brand through a constructor or validator. Structurally identical strings then become mutually unassignable.",
      body: [
        ts(`
type Brand<T, Name extends string> = T & { readonly __brand: Name };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const toUserId = (value: string) => value as UserId; // the single place the assertion lives

declare function loadUser(id: UserId): void;
declare const orderId: OrderId;

loadUser(toUserId("u_1")); // ok
loadUser(orderId); // error: 'OrderId' is not assignable to 'UserId'
loadUser("u_1"); // error: 'string' is not assignable to 'UserId'
`),
        p(
          "The same trick encodes validation in the type: `type Email = Brand<string, \"Email\">` can only be produced by a function that actually checked the format, so any function accepting `Email` knows the check already happened.",
        ),
      ],
      docs: "https://www.typescriptlang.org/play/?#example/nominal-typing",
    },
    {
      id: "ts-null-undefined",
      question: "How does TypeScript handle `null` and `undefined`? What do `?.`, `??` and `!` do?",
      level: "junior",
      short:
        "With `strictNullChecks` on, `null` and `undefined` are their own types and must be handled before use. `?.` short-circuits to `undefined` when the left side is nullish, `??` supplies a fallback only for `null` or `undefined`, and the postfix `!` tells the compiler to trust you, with no runtime check at all.",
      body: [
        ts(`
interface User {
  name: string;
  address?: { city: string }; // optional: { city: string } | undefined
}

function describe(user: User | null) {
  user.name; // error: 'user' is possibly 'null'

  const city = user?.address?.city; // string | undefined
  const label = user?.address?.city ?? "Unknown"; // string
  const forced = user!.name; // compiles; throws at runtime if user is null
  return [city, label, forced];
}

declare const stored: number | undefined; // imagine it holds 0
const a = stored || 10; // 10: || treats every falsy value as missing
const b = stored ?? 10; // 0: ?? only replaces null and undefined
`),
        trap(
          "`!` is an assertion, not a guard. Every `!` is a place where the compiler stopped helping, so treat it like `as`: fine when you can explain why it holds, a smell when it is there to make an error go away.",
        ),
      ],
      followUps: [
        {
          q: "Is `name?: string` the same as `name: string | undefined`?",
          a: "Not quite. The optional form lets you omit the key entirely; the union form requires the key to be present, even if its value is `undefined`. With `exactOptionalPropertyTypes` the optional form also refuses an explicit `undefined`.",
        },
        {
          q: "What happens with `strictNullChecks` off?",
          a: "`null` and `undefined` become assignable to every type, so `string` really means `string | null | undefined` and the compiler cannot warn about the most common runtime error in JavaScript.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined",
    },
    {
      id: "ts-as-vs-satisfies",
      question: "What is the difference between a type annotation, a type assertion (`as`) and `satisfies`?",
      level: "intermediate",
      short:
        "An annotation checks the value and then widens it to the annotated type. An assertion overrides the compiler without checking. `satisfies` checks the value against a type but keeps the value's own, more precise inferred type.",
      body: [
        ts(`
type Theme = Record<string, string | [number, number, number]>;

const annotated: Theme = { primary: "#e4572e", ink: [18, 16, 15] };
annotated.primary.toUpperCase(); // error: widened to string | [number, number, number]

const checked = { primary: "#e4572e", ink: [18, 16, 15] } satisfies Theme;
checked.primary.toUpperCase(); // ok: validated against Theme, still known to be a string
checked.missing; // error: unknown keys are rejected, unlike the annotated version

const asserted = {} as Theme; // compiles and checks nothing
`),
        list(
          "**Annotation** (`const x: T = ...`): use when you want the variable to have exactly type `T`.",
          "**`satisfies`**: use for config objects, route tables and lookup maps, where you want validation plus precise keys and literal values.",
          "**Assertion** (`as T`): use when you know something the compiler cannot, for example `document.getElementById(\"email\") as HTMLInputElement`.",
        ),
        trap(
          "An assertion is only allowed between types that overlap, which is why you sometimes see `value as unknown as T`. That double assertion compiles for any two types and is the loudest escape hatch in the language.",
        ),
      ],
      followUps: [
        {
          q: "Why can you not use the `<T>value` assertion syntax in a `.tsx` file?",
          a: "It is ambiguous with JSX, so only `value as T` is allowed there.",
        },
        {
          q: "Can you combine them?",
          a: "Yes: `{ ... } as const satisfies Config` gives literal, readonly types and validation in one expression.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
    },
    {
      id: "ts-tuples-readonly",
      question: "What is a tuple, and how is `readonly` different from `const`?",
      level: "junior",
      short:
        "A tuple is an array type with a fixed length and a known type at each position. `const` stops a variable from being reassigned at runtime; `readonly` stops a property or array from being mutated through that reference at compile time. They solve different problems and are often used together.",
      body: [
        ts(`
const pair: [string, number] = ["age", 42];
const [label, value] = pair; // label: string, value: number

type Range = [start: number, end?: number]; // labelled, with an optional element
type Args = [first: string, ...rest: number[]]; // a variadic tail

function useToggle(initial = false) {
  let on = initial;
  const toggle = () => {
    on = !on;
  };
  return [on, toggle] as const; // readonly [boolean, () => void]
}

const frozen: readonly number[] = [1, 2, 3];
frozen.push(4); // error: 'push' does not exist on type 'readonly number[]'

const items = [1, 2, 3]; // const only fixes the binding
items.push(4); // ok: the array itself is still mutable
`),
        p(
          "Without `as const`, the hook above would return `(boolean | (() => void))[]`, and every caller would have to narrow each element. This is why custom hooks that return a pair almost always end in `as const`.",
        ),
      ],
      followUps: [
        {
          q: "Is `readonly` deep?",
          a: "No. `readonly items: Item[]` stops you reassigning `items`, not pushing to it. Use `readonly Item[]` or `ReadonlyArray<Item>` for the array, and a recursive `DeepReadonly` type if you need it all the way down.",
        },
        {
          q: "Can a mutable array be passed where a readonly one is expected?",
          a: "Yes, a mutable array is assignable to a readonly one. The reverse is an error, which is why accepting `readonly T[]` in function parameters is the more flexible signature.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
    },
    {
      id: "ts-function-overloads",
      question: "How do you type functions: optional, default and rest parameters, and overloads?",
      level: "intermediate",
      short:
        "Parameters are annotated individually; `?` makes one optional, a default value makes it optional and infers its type, and a rest parameter is typed as an array or tuple. Overloads list several call signatures over one implementation, for when the return type depends on which arguments were passed.",
      body: [
        ts(`
function greet(name: string, greeting = "Hello", ...titles: string[]): string {
  return greeting + ", " + [...titles, name].join(" ");
}

type Comparator<T> = (a: T, b: T) => number; // a function type, reusable as a callback type
`),
        ts(`
function parse(input: string): number;
function parse(input: string[]): number[];
function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}

const one = parse("42"); // number
const many = parse(["1", "2"]); // number[]

declare const either: string | string[];
parse(either); // error: no overload matches; the implementation signature is not callable
`),
        list(
          "Callers only see the overload signatures. The implementation signature must be compatible with all of them but is not itself a valid call.",
          "Overloads are resolved top to bottom, so list the most specific one first.",
          "Prefer a union parameter or a generic when the return type does not change. Overloads earn their place only when different inputs produce different output types.",
        ),
      ],
      followUps: [
        {
          q: "Two overloads take `(a: string)` and `(a: string, ...rest: number[])`. What must the implementation look like?",
          a: "It must accept every call the overloads allow, so `(a: string, ...rest: number[])` works: a rest parameter is already optional, and is simply empty for the first overload. There is no need to loosen it to `any[]`.",
        },
        {
          q: "How do you type `this` inside a function?",
          a: "With a fake first parameter: `function onClick(this: HTMLButtonElement, event: MouseEvent)`. It is erased from the output and only tells the checker what `this` will be.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
    },
    {
      id: "ts-classes-modifiers",
      question: "What do `public`, `private`, `protected` and `readonly` do on a class? How is `private` different from `#private`?",
      level: "junior",
      short:
        "They control who may touch a member: `public` (the default) anyone, `protected` the class and its subclasses, `private` only the class. `readonly` allows assignment only in the declaration or constructor. TypeScript's `private` is enforced by the type checker and erased; JavaScript's `#field` is enforced by the engine at runtime.",
      body: [
        ts(`
abstract class Shape {
  // A parameter property: declares the field and assigns it in one step.
  constructor(protected readonly name: string) {}

  abstract area(): number; // subclasses must implement this

  describe() {
    return this.name + " with area " + this.area().toFixed(2);
  }
}

class Circle extends Shape {
  #radius: number; // private at runtime
  private scale = 1; // private only to the type checker

  constructor(radius: number) {
    super("circle");
    this.#radius = radius;
  }

  area() {
    return Math.PI * this.#radius ** 2 * this.scale;
  }
}

const circle = new Circle(2);
circle.describe(); // ok
circle.name; // error: 'name' is protected
circle.scale; // error: 'scale' is private
new Shape("blob"); // error: cannot create an instance of an abstract class
`),
        trap(
          "The two bugs interviewers plant in class snippets: reading a field without `this.` inside a method, and assigning `this.make = make` in a constructor without declaring `make` on the class. Both are compile errors, and both are easy to read past.",
        ),
      ],
      followUps: [
        {
          q: "Abstract class or interface?",
          a: "An interface is a pure contract, erased at compile time, and a class can implement many. An abstract class exists at runtime and can carry state and shared implementation, but a class can extend only one. Use an interface unless you need to share code.",
        },
        {
          q: "What does `implements` actually do?",
          a: "It only checks that the class satisfies the interface. It does not add members or change the class's type, so you still have to declare and type every property yourself.",
        },
        {
          q: "What is `strictPropertyInitialization`?",
          a: "Part of `strict`: every declared property must be assigned in its declaration or in the constructor, otherwise its type would be lying about never being `undefined`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility",
    },
    {
      id: "ts-object-vs-record",
      question: "What is the difference between `object`, `{}` and `Record<string, unknown>`? And how do index signatures work?",
      level: "intermediate",
      short:
        "`object` is any non-primitive. `{}` is anything except `null` and `undefined`, which includes numbers and strings. `Record<string, unknown>` is the one you usually want for 'some object with string keys': you can read any key, and each value must be narrowed before use.",
      body: [
        ts(`
let a: object; // objects, arrays, functions
let b: {}; // anything but null and undefined, yes, including 42
let c: Record<string, unknown>;

a = [1, 2];
a = 42; // error: number is not assignable to object
b = 42; // ok, which is rarely what you meant
b = null; // error
c = { id: 1 };
c.id.toFixed(); // error: 'c.id' is of type 'unknown'
`),
        p("An index signature says 'any key of this type maps to this value type', which is convenient and slightly dishonest:"),
        ts(`
const prices: Record<string, number> = { apple: 1.2 };
const pear = prices.pear; // typed as number, actually undefined

// Honest alternatives:
const known: Record<"apple" | "pear", number> = { apple: 1.2, pear: 0.9 }; // exact keys
const sparse: Partial<Record<string, number>> = { apple: 1.2 }; // values may be missing
const lookup = new Map<string, number>(); // .get() returns number | undefined
`),
        p(
          "A favourite exercise is typing a `merge` function. Parameters typed as `object` do compile, spread included, but the return type is `object`, on which you can access nothing. Generics keep the shape:",
        ),
        ts(`
function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}

const merged = merge({ name: "Ada" }, { age: 36 });
merged.name; // string
merged.age; // number
`),
      ],
      followUps: [
        {
          q: "What does `noUncheckedIndexedAccess` change?",
          a: "Reading through an index signature or an array index yields `T | undefined`, so `prices.pear` and `items[0]` must be checked before use. It is not part of `strict`, and it is worth turning on.",
        },
        {
          q: "When do you use a `Map` instead of an object?",
          a: "When keys are dynamic or not strings, when you need insertion order with frequent adds and deletes, or when you want `.get()` to be honest about missing entries.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures",
    },
    {
      id: "ts-enums-vs-unions",
      question: "Enums, unions of string literals, or an `as const` object: which do you use?",
      level: "intermediate",
      short:
        "A union of string literals is the default: it costs nothing at runtime and narrows perfectly. An `as const` object adds a runtime value you can iterate over while still deriving the union from it. Enums work, but they are one of the few TypeScript features that emit code, and string enums are nominal, which surprises people.",
      body: [
        ts(`
enum Direction { Up, Down } // numeric: Up = 0, Down = 1, plus a reverse mapping at runtime
enum Status { Active = "ACTIVE", Archived = "ARCHIVED" } // string enum

type StatusUnion = "active" | "archived"; // no runtime code at all

const STATUS = { Active: "active", Archived: "archived" } as const;
type StatusValue = (typeof STATUS)[keyof typeof STATUS]; // "active" | "archived"

declare function setStatus(status: Status): void;
setStatus(Status.Active); // ok
setStatus("ACTIVE"); // error: the raw string is not assignable to a string enum
`),
        table(
          ["", "Runtime output", "Iterable", "Accepts the raw literal"],
          ["`enum`", "An object (numeric enums add a reverse map)", "Yes", "No"],
          ["Union of literals", "None", "No", "Yes"],
          ["`as const` object", "The object you wrote", "Yes", "Yes"],
        ),
        trap(
          "A numeric enum parameter accepts any `number` variable, so `setDirection(someNumber)` compiles even when the value is 99. String enums and literal unions do not have this hole.",
        ),
      ],
      followUps: [
        {
          q: "What is a `const enum`?",
          a: "An enum whose members are inlined at each use site, leaving no object behind. Inlining needs whole-program knowledge, which single-file transpilers (Babel, esbuild, SWC) do not have, so `isolatedModules` restricts it and most teams avoid it.",
        },
        {
          q: "Why do some teams ban enums outright?",
          a: "They are not erasable syntax, so they do not work with type-stripping runtimes (Node's built-in TypeScript support, `erasableSyntaxOnly`), and a union or `as const` object does the same job with plain JavaScript semantics.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/enums.html",
    },
    {
      id: "ts-runtime-validation",
      question: "Types are erased at runtime. How do you make data from an API trustworthy?",
      level: "intermediate",
      short:
        "Treat everything that crosses a boundary as `unknown` and validate it once, at the edge: with a type guard for small shapes, or a schema library such as Zod or Valibot, from which the static type is derived. Inside the boundary the types can then be trusted.",
      body: [
        ts(`
interface User {
  id: string;
  name: string;
}

async function unsafe(): Promise<User> {
  const res = await fetch("/api/user");
  return res.json(); // json() is Promise<any>: this compiles whatever the server sends
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string"
  );
}

async function safe(): Promise<User> {
  const data: unknown = await (await fetch("/api/user")).json();
  if (!isUser(data)) throw new Error("Unexpected response shape");
  return data; // narrowed to User by the guard
}
`),
        p("Hand-written guards do not scale past a few fields. A schema gives you the validator and the type from one definition:"),
        ts(
          `
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
});

type User = z.infer<typeof UserSchema>; // derived, never written twice

export async function loadUser(): Promise<User> {
  const res = await fetch("/api/user");
  return UserSchema.parse(await res.json()); // throws with a precise message on a bad payload
}
`,
          { caption: "With a schema library" },
        ),
        say(
          "Boundaries I validate: HTTP responses, form input, URL params, `localStorage`, `postMessage`, environment variables. Everything else I let the compiler handle.",
        ),
      ],
      followUps: [
        {
          q: "Why not just write `as User`?",
          a: "It moves the failure. Instead of an error at the boundary saying the payload was wrong, you get `undefined is not a function` three components away, with a type that swears the property exists.",
        },
        {
          q: "How do you keep the client types in sync with the server?",
          a: "Generate them from the source of truth (OpenAPI, GraphQL codegen) or share them end to end (tRPC, a shared schema package). Hand-copied interfaces drift.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
    },
  ],
};
