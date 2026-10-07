import { json, list, output, p, say, steps, table, trap, ts } from "./blocks";
import type { PrepSection } from "./types";

export const TYPESCRIPT_TOOLING: PrepSection = {
  id: "ts-tooling",
  track: "typescript",
  title: "Config, modules and declarations",
  blurb:
    "The questions that separate people who have written TypeScript from people who have set it up: compiler flags, declaration files, the build pipeline, and migrating a real codebase.",
  drill: "types",
  questions: [
    {
      id: "ts-strict-flags",
      question: "What does `strict` turn on, and which other compiler options do you care about?",
      level: "intermediate",
      short:
        "`strict` is a bundle of checks, the most important being `strictNullChecks` and `noImplicitAny`. Without it TypeScript is closer to a linter than a type system. Beyond `strict`, `noUncheckedIndexedAccess` is the flag most worth adding, and `isolatedModules` is required by every modern bundler.",
      body: [
        table(
          ["Flag (all included in `strict`)", "What it catches"],
          ["`noImplicitAny`", "A parameter or variable that would silently become `any`"],
          ["`strictNullChecks`", "Using a value that may be `null` or `undefined`"],
          ["`strictFunctionTypes`", "Unsafe callback parameter types (contravariance)"],
          ["`strictBindCallApply`", "Wrong arguments to `bind`, `call` and `apply`"],
          ["`strictPropertyInitialization`", "Class properties never assigned in the constructor"],
          ["`noImplicitThis`", "`this` with an implied `any` type"],
          ["`useUnknownInCatchVariables`", "Treating a caught error as `any` instead of `unknown`"],
          ["`alwaysStrict`", "Parses in strict mode and emits `\"use strict\"`"],
        ),
        json(
          `
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,

    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "skipLibCheck": true
  }
}
`,
          { caption: "tsconfig.json for a bundled React app" },
        ),
        list(
          "**`noUncheckedIndexedAccess`**: `array[i]` and `record[key]` become `T | undefined`.",
          "**`exactOptionalPropertyTypes`**: `name?: string` no longer accepts an explicit `undefined`.",
          "**`noEmit`**: the bundler emits JavaScript; `tsc` only type-checks.",
          "**`skipLibCheck`**: do not re-check `.d.ts` files in `node_modules`. Faster, and avoids errors you cannot fix.",
          "**`target` / `lib`**: which syntax to emit, and which built-in APIs the types assume exist.",
        ),
      ],
      followUps: [
        {
          q: "You inherit a project with `strict: false`. What do you do?",
          a: "Turn the flags on one at a time, `noImplicitAny` first and `strictNullChecks` second, fixing or explicitly suppressing errors per directory, so the change lands as several reviewable pull requests and not as one that touches every file.",
        },
        {
          q: "What is the difference between `target` and `lib`?",
          a: "`target` controls the syntax of the emitted JavaScript. `lib` controls which runtime APIs the type checker believes are available. Neither adds polyfills.",
        },
      ],
      docs: "https://www.typescriptlang.org/tsconfig/#strict",
    },
    {
      id: "ts-compile-pipeline",
      question: "How does TypeScript get from source to something a browser runs?",
      level: "intermediate",
      short:
        "Two separate jobs: type-checking and emitting JavaScript. `tsc` can do both, but modern toolchains split them. A fast transpiler (esbuild, SWC, Babel) strips the types file by file, with no type information, and `tsc --noEmit` runs alongside to do the actual checking.",
      body: [
        steps(
          "**Transpile**: the bundler removes type syntax and compiles JSX. Each file is handled in isolation, which is why it is fast and why it cannot catch type errors.",
          "**Type-check**: `tsc --noEmit` in the editor, in a pre-commit hook and in CI. This is the step that fails the build on a type error.",
          "**Bundle**: modules are resolved, tree-shaken, split and minified.",
        ),
        p(
          "The consequence worth saying out loud: your dev server will happily run code that does not type-check. The types are enforced by the editor and by CI, not by the runtime.",
        ),
        list(
          "`isolatedModules` makes the compiler reject code a single-file transpiler cannot handle correctly.",
          "Libraries additionally emit `.d.ts` files (`declaration: true`) so consumers get types without the source.",
          "Node can now run `.ts` files directly by stripping types. That only works for erasable syntax, so enums, namespaces and constructor parameter properties are out; `erasableSyntaxOnly` enforces the subset.",
        ),
      ],
      followUps: [
        {
          q: "Why does Babel or esbuild not just type-check too?",
          a: "Type-checking needs the whole program: to check one file you must resolve the types of everything it imports. Stripping syntax needs only the file itself, which is what makes it parallel and fast.",
        },
        {
          q: "How do you speed up type-checking on a large repo?",
          a: "Incremental builds (`incremental`, `tsBuildInfoFile`), project references so packages are checked independently, `skipLibCheck`, and avoiding pathological types (huge unions, deep recursion, enormous intersections). The native port of the compiler (TypeScript 7) targets an order-of-magnitude speed-up on top of that.",
        },
      ],
      docs: "https://www.typescriptlang.org/tsconfig/#isolatedModules",
    },
    {
      id: "ts-import-type",
      question: "What are `import type` and `isolatedModules` for?",
      level: "intermediate",
      short:
        "`import type` marks an import as types only, so it is guaranteed to be erased. That matters because a single-file transpiler cannot tell whether an imported name is a type or a value. `isolatedModules` makes the compiler flag anything that would be ambiguous to such a tool.",
      body: [
        ts(`
import type { User } from "./models"; // erased entirely
import { createUser, type Role } from "./models"; // createUser stays, Role is erased

export type { User }; // a type re-export must say so
export { createUser };
`),
        list(
          "Without the `type` keyword, a transpiler looking at one file cannot know whether `User` is a type (drop the import) or a value (keep it, and its side effects).",
          "`verbatimModuleSyntax` makes the rule mechanical: anything marked `type` is removed, everything else is emitted exactly as written.",
          "Type-only imports also cannot create circular-dependency problems at runtime, because they do not exist at runtime.",
        ),
        trap(
          "Under `isolatedModules` you cannot re-export a type with a plain `export { User }`, and `const enum` values from other files cannot be relied on, because both need knowledge of another file to compile correctly.",
        ),
      ],
      followUps: [
        {
          q: "Does importing a type add to the bundle?",
          a: "No. Types are erased, so a type-only import contributes zero bytes, even if the module it comes from is large.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export",
    },
    {
      id: "ts-declaration-files",
      question: "What is a `.d.ts` file, and what does `declare` do?",
      level: "intermediate",
      short:
        "A declaration file contains types with no implementation: it describes the shape of JavaScript that exists somewhere else. `declare` is the keyword that says 'this exists at runtime, emit nothing for it'. Libraries ship `.d.ts` files (or you install them from `@types/*`), and you write your own for globals and non-code imports.",
      body: [
        ts(
          `
// A file with no imports or exports is a global script: these are visible everywhere.
declare const __APP_VERSION__: string; // injected by the bundler at build time

declare function gtag(command: "event", name: string, params?: Record<string, unknown>): void;

// Teach the compiler what importing an asset returns.
declare module "*.svg" {
  const url: string;
  export default url;
}

// Minimal types for a JavaScript package that ships none.
declare module "legacy-charts" {
  export function render(el: HTMLElement, data: number[]): void;
}
`,
          { caption: "globals.d.ts" },
        ),
        list(
          "`declare const` is an ambient declaration. A plain `const` in a `.d.ts` would be an error, because declaration files cannot contain values.",
          "Being ambient, it can be included any number of times without a duplicate-definition error.",
          "`export const` would make the file a module and the constant module-scoped, not global.",
        ),
        table(
          ["Where types come from", "Example"],
          ["Bundled with the package", "`\"types\"` or `\"exports\"` in its `package.json`"],
          ["DefinitelyTyped", "`npm i -D @types/lodash`"],
          ["Generated from your own code", "`tsc --declaration`"],
          ["Hand-written", "`globals.d.ts`, `env.d.ts`"],
        ),
      ],
      followUps: [
        {
          q: "A library has no types and no `@types` package. What are your options?",
          a: "Write a small `declare module \"name\"` with just the functions you call; that is better than the shorthand `declare module \"name\";`, which types every import as `any`.",
        },
        {
          q: "How do you add a typed global from inside a module file?",
          a: "Wrap it in `declare global { ... }`. A file with an import or export is a module, so top-level declarations in it are local.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
    },
    {
      id: "ts-declaration-merging",
      question: "What is declaration merging, and what is module augmentation?",
      level: "senior",
      short:
        "When two declarations share a name, the compiler merges them into one. Interfaces merge member by member, and namespaces merge with classes, functions and enums. Module augmentation uses this to add to types you do not own: a global like `Window`, or a library's interface.",
      body: [
        ts(`
import type { CSSProperties } from "react";

// Extend a global interface. The wrapper is needed because this file is a module.
declare global {
  interface Window {
    analytics?: { track(event: string): void };
  }
}

window.analytics?.track("page_view"); // typed

// Extend a library's interface: allow CSS custom properties in the style prop.
declare module "react" {
  interface CSSProperties {
    [customProperty: \`--\${string}\`]: string | number;
  }
}

const style: CSSProperties = { "--accent": "#e4572e" }; // ok after the augmentation
`),
        list(
          "**Interfaces** with the same name merge. Non-function members must agree on their type; methods become overloads, later declarations first.",
          "**Type aliases** never merge. A second `type X` is a duplicate identifier error.",
          "**Namespaces** merge with a class, function or enum of the same name, which is how static members and nested types are added in older declaration files.",
        ),
        say(
          "This is the real reason library authors publish interfaces instead of type aliases for anything users may need to extend: themes, session objects, route maps, environment variables.",
        ),
      ],
      followUps: [
        {
          q: "How do you type `process.env` or `import.meta.env`?",
          a: "Augment the interface the runtime declares: `namespace NodeJS { interface ProcessEnv { API_URL: string } }` for Node, or `interface ImportMetaEnv { readonly VITE_API_URL: string }` for Vite.",
        },
        {
          q: "What goes wrong with augmentation?",
          a: "It is global and invisible at the use site. Two packages augmenting the same interface with conflicting types produce errors that are hard to trace, and an augmentation in a file that is not part of the program silently does nothing.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/declaration-merging.html",
    },
    {
      id: "ts-modules",
      question: "How do modules work in TypeScript? What about namespaces?",
      level: "junior",
      short:
        "TypeScript uses standard ES modules: a file with a top-level `import` or `export` is a module with its own scope, and anything else is a global script. Namespaces are the pre-ES-module way of grouping code and today survive mainly inside declaration files.",
      body: [
        ts(
          `
export interface User {
  id: number;
  name: string;
}

export class UserStore {
  #users = new Map<number, User>();

  add(user: User) {
    this.#users.set(user.id, user);
  }

  byId(id: number): User | undefined {
    return this.#users.get(id);
  }
}

export default UserStore; // a default export: one per module, imported under any name
`,
          { caption: "user.ts" },
        ),
        ts(
          `
import UserStore, { type User } from "./user";

const store = new UserStore();
const ada: User = { id: 1, name: "Ada" };
store.add(ada);
`,
          { caption: "app.ts" },
        ),
        list(
          "**Named exports** are generally preferred over default exports: they rename consistently, autocomplete better and survive refactors.",
          "**`moduleResolution`** decides how an import specifier becomes a file. Use `bundler` for an app built by Vite, webpack or Next, and `nodenext` for code Node runs directly.",
          "**Path aliases** (`paths` in `tsconfig`) only affect type-checking. The bundler or runtime needs the same mapping configured separately.",
          "**Barrel files** (`index.ts` that re-exports) tidy up imports but can defeat tree-shaking and slow down tooling when they grow.",
        ),
      ],
      followUps: [
        {
          q: "What does `esModuleInterop` do?",
          a: "It lets you write `import express from \"express\"` for a CommonJS module that uses `module.exports = ...`, by emitting a small helper that wraps the module as a default export.",
        },
        {
          q: "When is a namespace still reasonable?",
          a: "In `.d.ts` files describing a global library, and for declaration merging. For application code, an ES module does everything a namespace does and bundlers understand it.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
    },
    {
      id: "ts-decorators",
      question: "What are decorators, and how do they work in TypeScript?",
      level: "intermediate",
      short:
        "A decorator is a function applied with `@name` to a class or class member; it receives the thing it decorates and may wrap or replace it. They are used for cross-cutting behaviour such as logging, validation and dependency injection. TypeScript 5 implements the standard decorators; the older `experimentalDecorators` flavour is what Angular and NestJS were built on.",
      body: [
        ts(`
function logged<This, Args extends unknown[], Return>(
  method: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): Return {
    console.log("call " + name + "(" + args.join(", ") + ")");
    const result = method.call(this, ...args);
    console.log("return " + result);
    return result;
  };
}

class Calculator {
  @logged
  add(a: number, b: number) {
    return a + b;
  }
}

new Calculator().add(2, 3);
`),
        output(`
call add(2, 3)
return 5
`),
        table(
          ["", "Standard (TS 5.0+)", "Legacy (`experimentalDecorators`)"],
          ["Method decorator receives", "`(value, context)`", "`(target, propertyKey, descriptor)`"],
          ["Parameter decorators", "Not supported", "Supported"],
          ["Type metadata", "No", "`emitDecoratorMetadata`"],
          ["Used by", "New code and libraries", "Angular, NestJS, TypeORM"],
        ),
        trap(
          "The two are not compatible. A decorator written for one signature fails under the other, so check which mode a codebase uses before answering 'how do you write a decorator'.",
        ),
      ],
      followUps: [
        {
          q: "Where do decorators show up in React?",
          a: "Mostly historically: MobX's `@observable` and `@observer`, and Redux's `@connect` on class components. Hooks replaced almost all of it, so in a React codebase today they are rare.",
        },
        {
          q: "What can be decorated?",
          a: "Classes, methods, accessors, fields and (with the `accessor` keyword) auto-accessors. Not standalone functions, which is why function composition or higher-order functions do that job in React.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators",
    },
    {
      id: "ts-async-types",
      question: "How do you type asynchronous code? What is the type of a caught error?",
      level: "junior",
      short:
        "An `async` function always returns `Promise<T>`, where `T` is the type of what you `return`. `await` unwraps it. A promise's rejection has no type, so the variable in `catch` is `unknown` and must be narrowed before you read from it.",
      body: [
        ts(`
interface User {
  id: string;
  name: string;
}

async function getUser(id: string): Promise<User> {
  const res = await fetch("/api/users/" + id);
  if (!res.ok) throw new Error("Request failed with " + res.status);
  return (await res.json()) as User; // json() is Promise<any>; validate at a real boundary
}

async function load() {
  // Runs both requests in parallel and keeps each position's type.
  const [user, count] = await Promise.all([getUser("1"), Promise.resolve(3)]);

  try {
    await getUser("missing");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
  }

  return { user, count }; // { user: User; count: number }
}

type Resolved = Awaited<ReturnType<typeof getUser>>; // User
`),
        p("When failure is an expected outcome and not an exception, put it in the return type, where the compiler can make callers handle it:"),
        ts(`
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

async function attempt<T>(work: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await work() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

async function demo() {
  const result = await attempt(() => fetch("/api/health"));
  if (!result.ok) return result.error.message;
  return result.value.status; // narrowed: value only exists when ok is true
}
`),
        trap(
          "Awaiting inside a loop runs the requests one after another. If they are independent, start them all and `await Promise.all(...)`. And a promise you neither `await` nor `.catch` fails silently; the `no-floating-promises` lint rule exists for that.",
        ),
      ],
      followUps: [
        {
          q: "`Promise.all` vs `allSettled` vs `race` vs `any`?",
          a: "`all` rejects as soon as one input rejects. `allSettled` waits for everything and reports each outcome. `race` settles with the first to settle, either way. `any` resolves with the first to fulfil and rejects only if all reject.",
        },
        {
          q: "Why can you not write `Promise<User, HttpError>`?",
          a: "Anything can be thrown in JavaScript, including from code you call, so a rejection type could never be guaranteed. The language reflects that by typing it `unknown`.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements",
    },
    {
      id: "ts-migrate-js",
      question: "How would you migrate a large JavaScript codebase to TypeScript?",
      level: "senior",
      short:
        "Incrementally, with the app shippable at every step. Let TypeScript and JavaScript coexist (`allowJs`), convert from the leaves of the dependency graph inward, start with loose settings, and tighten the compiler flags one at a time once most files are converted.",
      body: [
        steps(
          "**Set up side by side.** Add a `tsconfig` with `allowJs: true` and `strict: false`, wire `tsc --noEmit` into CI, and install the `@types/*` packages for your dependencies.",
          "**Type the foundations first.** Shared utilities, API clients and domain models have no internal dependencies and are imported everywhere, so typing them improves inference across the app immediately.",
          "**Convert leaf to root.** Rename `.js` to `.ts` in small pull requests. A file's imports should already be typed when you reach it.",
          "**Allow escape hatches, but track them.** Use `// @ts-expect-error` with a reason rather than `any`, and lint against new explicit `any`.",
          "**Ratchet the strictness.** Enable `noImplicitAny`, then `strictNullChecks`, then full `strict`, each as its own piece of work.",
          "**Validate the boundaries.** Once the inside is typed, add runtime validation where data enters, so the types describe reality.",
        ),
        list(
          "`checkJs` with JSDoc annotations gives type-checking in files you have not renamed yet.",
          "`@ts-expect-error` is better than `@ts-ignore`: it fails when the error it suppresses goes away, so suppressions do not outlive their reason.",
          "New code is written in TypeScript from day one, so the untyped surface only shrinks.",
        ),
        say(
          "The goal is not zero `any` on day one. It is that every week there is less untyped code than the week before, and nothing new is added to it.",
        ),
      ],
      followUps: [
        {
          q: "How do you measure progress?",
          a: "Percentage of files converted, count of `any` and `@ts-expect-error`, and which strict flags are on. A type-coverage tool in CI stops the number going backwards.",
        },
        {
          q: "What is the most common mistake?",
          a: "Turning on `strict` everywhere at once and then silencing thousands of errors with `any`. You end up with TypeScript syntax and none of the guarantees.",
        },
      ],
      docs: "https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html",
    },
  ],
};
