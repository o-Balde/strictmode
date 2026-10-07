import { list, output, p, say, trap, ts } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_NARROWING: PrepSection = {
  id: "ts-narrowing",
  track: "typescript",
  title: "Narrowing and unions",
  blurb:
    "How the compiler follows your `if` statements. Discriminated unions and exhaustiveness checks are the part of TypeScript you use every day, so expect to write one on the spot.",
  drill: "narrowing",
  questions: [
    {
      id: "ts-narrowing-basics",
      question: "What is type narrowing, and what are the ways to narrow a type?",
      level: "junior",
      short:
        "Narrowing is the compiler refining a broad type to a more specific one by following your runtime checks. Inside an `if (typeof x === \"string\")` block, `x` is a `string`. It works with `typeof`, equality, truthiness, `in`, `instanceof`, `Array.isArray`, discriminant properties and custom type guards.",
      body: [
        ts(`
function describe(value: string | number | string[] | Date | null) {
  if (value === null) return "nothing"; // equality
  if (typeof value === "string") return value.toUpperCase(); // typeof
  if (typeof value === "number") return value.toFixed(1);
  if (Array.isArray(value)) return value.join(", "); // built-in type guard
  return value.toISOString(); // only Date is left
}

type Fish = { swim(): void };
type Bird = { fly(): void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) animal.swim(); // the in operator
  else animal.fly();
}

function message(error: unknown) {
  return error instanceof Error ? error.message : String(error); // instanceof
}
`),
        p(
          "This is control flow analysis: the compiler tracks the type of each variable through branches, early returns, assignments and `throw`. You rarely annotate anything; you write the checks you would write in JavaScript anyway, and the types follow.",
        ),
        trap(
          "Truthiness narrowing removes `null` and `undefined`, but it also filters out `0`, `\"\"` and `NaN`. `if (!count) return` is a bug when zero is a valid count. Compare against `undefined` or `null` explicitly.",
        ),
      ],
      followUps: [
        {
          q: "Why does `typeof value === \"object\"` not rule out `null`?",
          a: "Because `typeof null` is `\"object\"`, a quirk JavaScript has had since its first version. The compiler knows, and keeps `null` in the narrowed type until you check for it.",
        },
        {
          q: "What does `in` narrow when the value is `unknown`?",
          a: "After `typeof value === \"object\" && value !== null && \"id\" in value`, the type becomes `object & Record<\"id\", unknown>`, so you can read `value.id` and narrow that in turn. That is how hand-written validators are built.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    },
    {
      id: "ts-type-guards",
      question: "What is a user-defined type guard, and how is it different from a function that returns `boolean`?",
      level: "intermediate",
      short:
        "A type guard is a function whose return type is a type predicate, `value is T`. When it returns `true`, the compiler narrows the argument to `T` at the call site. A plain `boolean` return carries no type information, so nothing is narrowed.",
      body: [
        ts(`
interface Cat {
  meow(): void;
}
interface Dog {
  bark(): void;
}

function looksLikeCat(pet: Cat | Dog): boolean {
  return "meow" in pet;
}

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;
}

function speak(pet: Cat | Dog) {
  if (looksLikeCat(pet)) {
    pet.meow(); // error: a boolean says nothing about the type of pet
  }
  if (isCat(pet)) {
    pet.meow(); // ok: narrowed to Cat
  } else {
    pet.bark(); // ok: narrowed to Dog
  }
}
`),
        p("An assertion function is the same idea for code that throws instead of branching:"),
        ts(`
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new TypeError("Expected a string");
}

function shout(input: unknown) {
  assertIsString(input);
  return input.toUpperCase(); // narrowed for the rest of the scope
}

const mixed = [1, null, 2, undefined];
const numbers = mixed.filter((n): n is number => n != null); // number[]
`),
        trap(
          "The compiler trusts a predicate; it does not verify it. `function isUser(v: unknown): v is User { return true; }` compiles, and every caller now holds a lie. A guard's body deserves the same care as a type assertion.",
        ),
      ],
      followUps: [
        {
          q: "Do you always have to write the predicate by hand?",
          a: "Not since TypeScript 5.5: a function with no return annotation whose body is a simple narrowing expression gets an inferred predicate, so `mixed.filter((n) => n != null)` is `number[]` on its own. An explicit `: boolean` annotation switches that inference off, and `filter(Boolean)` still does not narrow.",
        },
        {
          q: "What are the rules for the predicate?",
          a: "It must name one of the function's parameters (or `this`), and the asserted type must be assignable to that parameter's declared type.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
    },
    {
      id: "ts-discriminated-unions",
      question: "What is a discriminated union, and how do you make sure a `switch` handles every case?",
      level: "intermediate",
      short:
        "A discriminated union is a union of object types that share one literal property, the discriminant. Checking that property narrows to a single member. For exhaustiveness, assign the value to `never` in the `default` branch: if a case is missing, the leftover type is not `never` and the code stops compiling.",
      body: [
        ts(`
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function render(state: RequestState<string[]>): string {
  switch (state.status) {
    case "idle":
      return "Nothing yet";
    case "loading":
      return "Loading";
    case "success":
      return state.data.join(", "); // data exists only on this member
    case "error":
      return state.error.message;
    default: {
      const unreachable: never = state; // stops compiling the day a status is added
      return unreachable;
    }
  }
}
`),
        p("Here is what the check catches. A `triangle` was added to the union and one function was not updated:"),
        ts(`
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; base: number; height: number };

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(value));
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default:
      return assertNever(shape); // error: the triangle member is not assignable to never
  }
}
`),
        say(
          "I model state as a union of the states that can actually occur, not as one object with optional fields. `{ loading: boolean; data?: T; error?: Error }` allows loading with data and an error at once; the union makes that state unrepresentable.",
        ),
      ],
      followUps: [
        {
          q: "What can be a discriminant?",
          a: "Any property whose type is a literal in every member: string and number literals, `true`/`false`, `null`/`undefined`. Strings are the convention because they read well in a `switch`.",
        },
        {
          q: "Does narrowing survive destructuring?",
          a: "Partly. When every member has the same property names, `const { kind, payload } = action` followed by a check on `kind` narrows `payload` too (since 4.6), provided both are `const` bindings. If in doubt, switch on `action.kind` directly.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
    },
    {
      id: "ts-never-control-flow",
      question: "What is the return type of a function that always throws, and why does it matter?",
      level: "intermediate",
      short:
        "`never`: the function has no reachable end point. It matters because the compiler treats a call to a `never`-returning function as the end of that code path, so narrowing continues after it exactly as it would after a `throw` or `return`.",
      body: [
        ts(`
function fail(message: string): never {
  throw new Error(message);
}

function parsePort(value: string | undefined): number {
  if (value === undefined) fail("PORT is required");
  return Number(value.trim()); // value is string here: fail() cannot return
}
`),
        p(
          "A detail that catches people out: the inferred return type depends on how the function is written. An arrow or function expression that only throws is inferred as `never`, but a function declaration is inferred as `void`, so annotate it.",
        ),
        ts(`
function failDeclared(message: string) {
  throw new Error(message);
}
type A = ReturnType<typeof failDeclared>; // void

const failArrow = (message: string) => {
  throw new Error(message);
};
type B = ReturnType<typeof failArrow>; // never
`),
        list(
          "`void`: the function returns, but its value should be ignored.",
          "`never`: the function does not return at all.",
          "`never` is also what remains when a union is narrowed to nothing, which is the mechanism behind exhaustiveness checks.",
        ),
      ],
      followUps: [
        {
          q: "For the narrowing to work, does `fail` need anything special?",
          a: "Yes: an explicit `never` return annotation, and it must be called as a statement. The compiler only does this analysis for functions whose type is declared, not inferred.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/functions.html#never",
    },
    {
      id: "ts-object-keys",
      question: "Why does `Object.keys(obj)` return `string[]` instead of `(keyof T)[]`?",
      level: "intermediate",
      short:
        "Because types are structural and open: a value of type `T` is guaranteed to have T's properties, but nothing stops it having more. `Object.keys` returns every key present at runtime, so promising `keyof T` would be unsound.",
      body: [
        ts(`
const user = { name: "Ada", age: 36 };

for (const key of Object.keys(user)) {
  user[key]; // error: a string cannot index { name: string; age: number }
}

// When you own the object and know it has no extra keys, say so once:
const keys = Object.keys(user) as (keyof typeof user)[];
keys.forEach((key) => user[key]); // ok

// Or keep the keys you care about as the source of truth:
const FIELDS = ["name", "age"] as const;
FIELDS.forEach((key) => user[key]); // ok, no assertion
`),
        p("The unsoundness is easy to demonstrate, which is why the standard library refuses to hide it:"),
        ts(`
interface Point {
  x: number;
  y: number;
}

function sum(point: Point) {
  let total = 0;
  for (const key of Object.keys(point) as (keyof Point)[]) {
    total += point[key]; // typed as number...
  }
  return total;
}

const labelled = { x: 1, y: 2, label: "origin" };
console.log(sum(labelled)); // compiles: extra properties are allowed on a variable
`),
        output(`
3origin
`),
      ],
      followUps: [
        {
          q: "Same question for `for...in`?",
          a: "Same answer: the loop variable is `string`, for the same reason, and it also walks inherited enumerable properties.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
    },
    {
      id: "ts-narrowing-pitfalls",
      question: "Where does narrowing break down?",
      level: "senior",
      short:
        "Narrowing is tied to a specific variable at a specific point in the control flow. It is lost when the compiler cannot prove the value is still the same: in callbacks over a variable that is reassigned later, across function calls for anything it cannot track, and through helpers that return a plain `boolean`.",
      body: [
        ts(`
function schedule(value: string | number) {
  if (typeof value === "string") {
    setTimeout(() => value.toUpperCase()); // error: value might be reassigned before this runs
  }
  value = 5;
}

function scheduleFixed(value: string | number) {
  if (typeof value === "string") {
    const text = value; // a const cannot change, so the narrowing is safe to capture
    setTimeout(() => text.toUpperCase()); // ok
  }
  value = 5;
}
`),
        list(
          "**Reassigned captures.** A closure may run later, so narrowing only survives into it when the variable is never assigned again afterwards. Copy to a `const`.",
          "**Opaque checks.** `if (isValid(user))` narrows nothing unless `isValid` is a type guard.",
          "**`filter(Boolean)`** does not remove `null` from the element type; a predicate (written or inferred) does.",
          "**Property narrowing is optimistic.** After `if (obj.value !== null)`, a function call that mutates `obj` does not reset the narrowing. The compiler accepts this unsoundness on purpose, because resetting on every call would make narrowing useless.",
          "**Generics.** Inside a generic function, `typeof` checks narrow the value but not the type parameter `T` itself, so the return type often still needs an assertion or overloads.",
        ),
      ],
      followUps: [
        {
          q: "How do you narrow by a computed key, like `obj[key]`?",
          a: "Since 5.5 the compiler narrows `obj[key]` when both `obj` and `key` are effectively constant. The portable fix is the same as for closures: read it into a `const` and narrow that.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis",
    },
  ],
};
