import { list, p, say, table, trap, ts } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_TYPE_LEVEL: PrepSection = {
  id: "ts-type-level",
  track: "typescript",
  title: "Advanced types",
  blurb:
    "Mapped, conditional and template literal types, plus variance. Senior interviews use these to find out whether you understand the type system or only use it.",
  drill: "generics",
  questions: [
    {
      id: "ts-mapped-types",
      question: "What is a mapped type? What does the `as` clause do?",
      level: "intermediate",
      short:
        "A mapped type builds a new object type by iterating over a union of keys: `{ [K in Keys]: ... }`. Modifiers (`readonly`, `?`, and their removals `-readonly`, `-?`) can be added per key, and an `as` clause renames or filters the keys as it goes.",
      body: [
        ts(`
type Flags<T> = { [K in keyof T]: boolean };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

interface Person {
  name: string;
  age: number;
}

type PersonFlags = Flags<Person>; // { name: boolean; age: boolean }
`),
        p(
          "Key remapping (4.1) puts an `as` clause after the key. Mapping a key to `never` drops it, which turns a mapped type into a filter:",
        ),
        ts(`
interface Person {
  name: string;
  age: number;
}

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }

type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
type StringFields = PickByValue<Person, string>; // { name: string }
`),
        list(
          "`string & K` is there because `keyof T` may include `number` and `symbol` keys, and `Capitalize` only accepts strings.",
          "`Capitalize`, `Uncapitalize`, `Uppercase` and `Lowercase` are intrinsic string-manipulation types.",
        ),
      ],
      followUps: [
        {
          q: "What happens when you map over an array or tuple type?",
          a: "A homomorphic mapped type applied to an array or tuple maps the element types and returns an array or tuple, not an object with numeric keys. That is why `Readonly<string[]>` is `readonly string[]`.",
        },
        {
          q: "Where do you actually use this outside puzzles?",
          a: "Deriving form state from a model (`{ [K in keyof T]: FieldState<T[K]> }`), typing event maps, generating handler names for a component API, and stripping or adding `readonly` at a module boundary.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
    },
    {
      id: "ts-conditional-infer",
      question: "What are conditional types, and how does `infer` work?",
      level: "senior",
      short:
        "A conditional type is a type-level ternary: `T extends U ? X : Y`. Inside the `extends` clause, `infer R` declares a type variable that the compiler fills in by pattern-matching, so you can pull a piece out of a larger type.",
      body: [
        ts(`
type IsString<T> = T extends string ? true : false;

type ElementOf<T> = T extends readonly (infer U)[] ? U : never;
type Item = ElementOf<string[]>; // string

type Unwrap<T> = T extends Promise<infer U> ? U : T;
type A = Unwrap<Promise<number>>; // number
type B = Unwrap<string>; // string: not a promise, returned unchanged

type FirstArg<F> = F extends (first: infer A, ...rest: never[]) => unknown ? A : never;
type C = FirstArg<(id: string, force: boolean) => void>; // string
`),
        p(
          "When the checked type is a bare type parameter and you pass it a union, the conditional type is applied to each member separately and the results are unioned. This is distribution, and it is how `Exclude` works:",
        ),
        ts(`
type ToArray<T> = T extends unknown ? T[] : never;
type Distributed = ToArray<string | number>; // string[] | number[]

type ToArrayTogether<T> = [T] extends [unknown] ? T[] : never;
type Together = ToArrayTogether<string | number>; // (string | number)[]

type IsNeverWrong<T> = T extends never ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;

type X = IsNeverWrong<never>; // never: distributing over an empty union produces nothing
type Y = IsNever<never>; // true
`),
        trap(
          "Wrapping both sides in a tuple, `[T] extends [U]`, switches distribution off. Forgetting this is the usual reason a conditional type returns a union you did not expect, or `never` when you pass it `never`.",
        ),
      ],
      followUps: [
        {
          q: "Where may `infer` appear?",
          a: "Only inside the `extends` clause of a conditional type, and the variable is only in scope in the true branch. Since 4.7 it can carry a constraint: `infer U extends string`.",
        },
        {
          q: "Name two built-ins that use it.",
          a: "`ReturnType<F>` is `F extends (...args: any) => infer R ? R : any`, and `Awaited<T>` recursively infers the value type of a thenable.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
    },
    {
      id: "ts-template-literal-types",
      question: "What are template literal types?",
      level: "senior",
      short:
        "String literal types built with template syntax. Interpolating a union produces every combination, and combined with `infer` they can parse a string type, which is how routers and CSS-in-TS libraries type paths and class names.",
      body: [
        ts(`
type EventName = "click" | "focus" | "blur";
type HandlerName = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onBlur"

type Side = "top" | "right" | "bottom" | "left";
type Spacing = \`\${"margin" | "padding"}-\${Side}\`; // all 8 combinations

type Id = \`user_\${number}\`;
const ok: Id = "user_42";
const bad: Id = "user_abc"; // error: not assignable to \`user_\${number}\`
`),
        p("With `infer`, a template literal type becomes a parser. This one extracts the parameter names from a route:"),
        ts(`
type PathParams<Path extends string> =
  Path extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | PathParams<\`/\${Rest}\`>
    : Path extends \`\${string}:\${infer Param}\`
      ? Param
      : never;

type Params = PathParams<"/users/:userId/posts/:postId">; // "userId" | "postId"

declare function navigate<P extends string>(
  path: P,
  params: Record<PathParams<P>, string>,
): void;

navigate("/users/:userId/posts/:postId", { userId: "1", postId: "9" }); // ok
navigate("/users/:userId", { id: "1" }); // error: 'id' is not a parameter of this path
`),
        trap(
          "Unions multiply. Two 50-member unions interpolated together produce 2,500 literal types, and the compiler gives up above 100,000. Keep the inputs small.",
        ),
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
    },
    {
      id: "ts-recursive-types",
      question: "Write a `DeepReadonly<T>`. Why does it need a conditional?",
      level: "senior",
      short:
        "A type may refer to itself, which lets it walk a nested structure. `DeepReadonly` maps every property to `readonly` and recurses into the ones that are objects. The conditional is the base case: without it the recursion would try to map over primitives and functions.",
      body: [
        ts(`
type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T // leave functions alone
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T; // primitives are the base case

interface Config {
  api: { url: string; retries: number };
  features: string[];
}

declare const config: DeepReadonly<Config>;

config.api.url = "https://example.com"; // error: 'url' is a read-only property
config.features.push("beta"); // error: 'push' does not exist on 'readonly string[]'
`),
        p("The same shape gives you `DeepPartial`, and a recursive alias is the natural way to describe JSON:"),
        ts(`
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const payload: Json = { user: { tags: ["a", "b"], active: true } }; // ok
const invalid: Json = { createdAt: new Date() }; // error: Date is not Json
`),
        list(
          "Arrays work because a mapped type over an array type maps its elements: `string[]` becomes `readonly string[]`.",
          "`Date`, `Map` and `Set` are objects too, so this simple version maps over their members. A production version special-cases them (`ReadonlyMap`, `ReadonlySet`).",
          "Recursion depth is limited; very deep or self-referential data can hit 'Type instantiation is excessively deep'.",
        ),
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#more-recursive-type-aliases",
    },
    {
      id: "ts-variance",
      question: "What are covariance and contravariance? What do the `in` and `out` annotations do?",
      level: "senior",
      short:
        "Variance describes how subtyping of a type argument carries over to the generic type. Output positions are covariant (a producer of `Dog` is a producer of `Animal`); input positions are contravariant (a consumer of `Animal` is a consumer of `Dog`). `out T` and `in T` declare that intent explicitly so the compiler checks it and skips the structural comparison.",
      body: [
        ts(`
class Animal {
  name = "animal";
}
class Dog extends Animal {
  bark() {}
}

// Return types are covariant.
const makeAnimal: () => Animal = (): Dog => new Dog(); // ok

// Parameter types are contravariant.
const handleDog: (dog: Dog) => void = (animal: Animal) => {}; // ok: handles any Animal, so it handles Dogs
const handleAnimal: (animal: Animal) => void = (dog: Dog) => dog.bark(); // error: it may be given a non-Dog
`),
        table(
          ["Position of `T`", "Variance", "Annotation", "Assignability"],
          ["Only produced (return type, readonly property)", "Covariant", "`out T`", "`Box<Dog>` to `Box<Animal>`"],
          ["Only consumed (parameter)", "Contravariant", "`in T`", "`Box<Animal>` to `Box<Dog>`"],
          ["Both", "Invariant", "`in out T`", "Neither direction"],
        ),
        ts(`
interface Producer<out T> {
  get(): T;
}
interface Consumer<in T> {
  accept: (value: T) => void;
}
interface Cell<in out T> {
  get(): T;
  set: (value: T) => void;
}
`),
        p("TypeScript is deliberately unsound in one familiar place: mutable arrays are treated as covariant."),
        ts(`
class Animal {
  name = "animal";
}
class Dog extends Animal {
  bark() {}
}

const dogs: Dog[] = [new Dog()];
const animals: Animal[] = dogs; // allowed
animals.push(new Animal()); // also allowed... and now dogs[1].bark() throws at runtime
`),
        trap(
          "Parameter contravariance is only enforced under `strictFunctionTypes`, and only for function-typed properties. Methods written with method syntax (`accept(value: T): void`) are still compared bivariantly. Declaring callbacks as properties (`onChange: (value: T) => void`) gets you the strict check.",
        ),
      ],
      followUps: [
        {
          q: "Why would you add `in` or `out` if the compiler can already work variance out?",
          a: "Documentation of intent, faster type-checking of deeply recursive generics, and an error at the declaration if someone later uses `T` in the wrong position. They do not change behaviour; a wrong annotation is rejected.",
        },
        {
          q: "Why can a React `onChange` that accepts a `ChangeEvent<HTMLInputElement>` not be passed where `ChangeEvent<HTMLElement>` handlers are expected?",
          a: "Contravariance. That handler may read `event.target.value`, so it cannot safely be called with an event from an arbitrary element. A handler for the wider type can be used for the narrower one, never the reverse.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/generics.html#variance-annotations",
    },
    {
      id: "ts-type-puzzles",
      question: "Type puzzles: write `First`, `Last`, `TupleToUnion`, `Length` and `If`.",
      level: "senior",
      short:
        "Tuple puzzles come down to three moves: index with `[number]` or `[\"length\"]`, pattern-match with a variadic tuple and `infer`, and branch with a conditional type.",
      body: [
        ts(`
type First<T extends readonly unknown[]> = T extends readonly [infer Head, ...unknown[]] ? Head : never;
type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer Tail] ? Tail : never;
type Length<T extends readonly unknown[]> = T["length"];
type TupleToUnion<T extends readonly unknown[]> = T[number];
type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
type If<C extends boolean, Then, Else> = C extends true ? Then : Else;

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

type Tests = [
  Expect<Equal<First<[1, 2, 3]>, 1>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<Last<["a", "b", "c"]>, "c">>,
  Expect<Equal<Length<readonly ["x", "y"]>, 2>>,
  Expect<Equal<TupleToUnion<["sm", "md", "lg"]>, "sm" | "md" | "lg">>,
  Expect<Equal<Concat<[1], ["a", true]>, [1, "a", true]>>,
  Expect<Equal<If<true, "yes", "no">, "yes">>,
];
`),
        say(
          "I talk through the base case first, then the recursive or pattern-matching case, and I write one or two `Expect<Equal<...>>` lines before the implementation so the interviewer can see me checking the edge cases: the empty tuple, `never`, a union.",
        ),
      ],
      followUps: [
        {
          q: "Why is `First<T> = T[0]` not quite right?",
          a: "For the empty tuple, `[][0]` is `undefined` rather than `never`, which usually is not what the puzzle wants. The `infer` version handles the empty case explicitly.",
        },
        {
          q: "Should this kind of type appear in application code?",
          a: "Rarely. It belongs in libraries and shared utilities, where the complexity is paid once and hidden. In feature code, a type that needs a comment to be understood is usually a sign that the data model could be simpler.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
    },
  ],
};
