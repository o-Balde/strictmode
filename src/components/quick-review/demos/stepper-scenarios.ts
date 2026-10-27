/**
 * Step-by-step traces for the code stepper: the scopes, objects and console
 * after each step of a short program.
 *
 * The traces are written by hand, so the program at the top of each one is
 * also executed by `npm run verify:prep`, and what it prints must equal the
 * last step's console. Plain data, no React, so the verifier can import it.
 */

export type Binding =
  | { kind: "value"; value: string }
  /** A `let`, `const` or `class` binding that exists but is not initialised yet. */
  | { kind: "tdz" }
  /** Points at an object in `heap`, by id. */
  | { kind: "ref"; to: string };

export interface ScopeFrame {
  name: string;
  /** e.g. "kept alive by the closure", "finished". */
  note?: string;
  vars: { name: string; binding: Binding }[];
}

export interface HeapObject {
  id: string;
  label: string;
  fields: { name: string; binding: Binding }[];
  /** No variable can reach it any more: it will be garbage-collected. */
  unreachable?: boolean;
}

export interface StepperStep {
  /** 1-based lines highlighted in the code; empty before the first line runs. */
  lines: number[];
  note: string;
  /** Innermost scope first. */
  scopes: ScopeFrame[];
  heap?: HeapObject[];
  /** Callbacks waiting in the task queue, in order. */
  queue?: string[];
  console: string[];
}

export interface StepperScenario {
  title: string;
  code: string;
  steps: StepperStep[];
}

const v = (value: string): Binding => ({ kind: "value", value });
const tdz: Binding = { kind: "tdz" };
const ref = (to: string): Binding => ({ kind: "ref", to });

export type StepperScenarioId = "hoisting" | "var-let" | "closure" | "references" | "clone" | "increment";

export const STEPPER_SCENARIOS: Record<StepperScenarioId, StepperScenario> = {
  hoisting: {
    title: "A local var shadows the outer one before it is assigned",
    code: `var foo = 1;
var foobar = function () {
  console.log(foo);
  var foo = 2;
};
foobar();`,
    steps: [
      {
        lines: [],
        note: "Before any line runs, the global scope registers its `var` declarations. Both exist, holding `undefined`.",
        scopes: [{ name: "Global", vars: [{ name: "foo", binding: v("undefined") }, { name: "foobar", binding: v("undefined") }] }],
        console: [],
      },
      {
        lines: [1],
        note: "The assignment runs where it was written: `foo` becomes 1.",
        scopes: [{ name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("undefined") }] }],
        console: [],
      },
      {
        lines: [2, 3, 4, 5],
        note: "The function expression is assigned to `foobar`. Nothing inside it runs yet.",
        scopes: [{ name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("ƒ") }] }],
        console: [],
      },
      {
        lines: [6],
        note: "Calling `foobar` creates its scope, and hoisting happens again inside it: a **local** `foo`, holding `undefined`, now shadows the global one.",
        scopes: [
          { name: "foobar()", vars: [{ name: "foo", binding: v("undefined") }] },
          { name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("ƒ") }] },
        ],
        console: [],
      },
      {
        lines: [3],
        note: "`foo` is looked up from the innermost scope outwards. The local one is found first, and it is still `undefined`.",
        scopes: [
          { name: "foobar()", vars: [{ name: "foo", binding: v("undefined") }] },
          { name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("ƒ") }] },
        ],
        console: ["undefined"],
      },
      {
        lines: [4],
        note: "Only now is the local `foo` assigned. The global `foo` was never touched.",
        scopes: [
          { name: "foobar()", vars: [{ name: "foo", binding: v("2") }] },
          { name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("ƒ") }] },
        ],
        console: ["undefined"],
      },
      {
        lines: [],
        note: "`foobar` returns and its scope is discarded: nothing refers to it any more.",
        scopes: [{ name: "Global", vars: [{ name: "foo", binding: v("1") }, { name: "foobar", binding: v("ƒ") }] }],
        console: ["undefined"],
      },
    ],
  },

  "var-let": {
    title: "One `var` for the whole loop, one `let` per iteration",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i));
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j));
}`,
    steps: [
      {
        lines: [],
        note: "`var i` is hoisted to the enclosing (here, global) scope. `j` doesn't exist yet: a `let` in a `for` header belongs to the loop.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("undefined") }] }],
        queue: [],
        console: [],
      },
      {
        lines: [1, 2],
        note: "First iteration: `i` is 0. The arrow function is queued; it refers to the variable `i`, not to the value 0.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("0") }] }],
        queue: ["() => log(\"var\", i)  [Global i]"],
        console: [],
      },
      {
        lines: [1, 2],
        note: "Two more iterations queue two more callbacks, all pointing at the same `i`. Then `i++` makes it 3, the test fails, the loop ends.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("3") }] }],
        queue: ["() => log(\"var\", i)  [Global i]", "() => log(\"var\", i)  [Global i]", "() => log(\"var\", i)  [Global i]"],
        console: [],
      },
      {
        lines: [4, 5],
        note: "The `let` loop creates a fresh scope for each iteration, with its own `j`. The first callback captures the first one.",
        scopes: [
          { name: "iteration 1", vars: [{ name: "j", binding: v("0") }] },
          { name: "Global", vars: [{ name: "i", binding: v("3") }] },
        ],
        queue: [
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"let\", j)  [iteration 1 j]",
        ],
        console: [],
      },
      {
        lines: [4, 5],
        note: "Each later iteration copies `j` into a new scope before `j++`, so the three callbacks hold three different `j`s: 0, 1 and 2.",
        scopes: [
          { name: "iteration 3", vars: [{ name: "j", binding: v("2") }] },
          { name: "iteration 2", vars: [{ name: "j", binding: v("1") }] },
          { name: "iteration 1", vars: [{ name: "j", binding: v("0") }] },
          { name: "Global", vars: [{ name: "i", binding: v("3") }] },
        ],
        queue: [
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"var\", i)  [Global i]",
          "() => log(\"let\", j)  [iteration 1 j]",
          "() => log(\"let\", j)  [iteration 2 j]",
          "() => log(\"let\", j)  [iteration 3 j]",
        ],
        console: [],
      },
      {
        lines: [2],
        note: "The script is done, so the timers run. The three `var` callbacks all read the one `i`, which is 3 now.",
        scopes: [
          { name: "iteration 3", vars: [{ name: "j", binding: v("2") }] },
          { name: "iteration 2", vars: [{ name: "j", binding: v("1") }] },
          { name: "iteration 1", vars: [{ name: "j", binding: v("0") }] },
          { name: "Global", vars: [{ name: "i", binding: v("3") }] },
        ],
        queue: [
          "() => log(\"let\", j)  [iteration 1 j]",
          "() => log(\"let\", j)  [iteration 2 j]",
          "() => log(\"let\", j)  [iteration 3 j]",
        ],
        console: ["var 3", "var 3", "var 3"],
      },
      {
        lines: [5],
        note: "Each `let` callback reads its own iteration's `j`.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("3") }] }],
        queue: [],
        console: ["var 3", "var 3", "var 3", "let 0", "let 1", "let 2"],
      },
    ],
  },

  closure: {
    title: "A scope that outlives its function call",
    code: `function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
counter();
counter();
console.log(counter());`,
    steps: [
      {
        lines: [],
        note: "The function declaration is hoisted whole. `counter` exists but is in its temporal dead zone.",
        scopes: [{ name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: tdz }] }],
        heap: [],
        console: [],
      },
      {
        lines: [5],
        note: "Calling `createCounter` creates a new scope for this call.",
        scopes: [
          { name: "createCounter()", vars: [{ name: "count", binding: tdz }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: tdz }] },
        ],
        heap: [],
        console: [],
      },
      {
        lines: [2],
        note: "`count` is initialised to 0.",
        scopes: [
          { name: "createCounter()", vars: [{ name: "count", binding: v("0") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: tdz }] },
        ],
        heap: [],
        console: [],
      },
      {
        lines: [3],
        note: "The arrow function is created here, so it remembers this scope: that link is the closure.",
        scopes: [
          { name: "createCounter()", vars: [{ name: "count", binding: v("0") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: tdz }] },
        ],
        heap: [{ id: "f1", label: "arrow function", fields: [{ name: "[[Environment]]", binding: v("createCounter() scope") }] }],
        console: [],
      },
      {
        lines: [5],
        note: "`createCounter` has returned, but its scope is not discarded: the function stored in `counter` still points at it.",
        scopes: [
          { name: "createCounter()", note: "finished, kept alive by the closure", vars: [{ name: "count", binding: v("0") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: ref("f1") }] },
        ],
        heap: [{ id: "f1", label: "arrow function", fields: [{ name: "[[Environment]]", binding: v("createCounter() scope") }] }],
        console: [],
      },
      {
        lines: [6],
        note: "Each call reaches into that remembered scope and increments the same `count`.",
        scopes: [
          { name: "createCounter()", note: "finished, kept alive by the closure", vars: [{ name: "count", binding: v("1") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: ref("f1") }] },
        ],
        heap: [{ id: "f1", label: "arrow function", fields: [{ name: "[[Environment]]", binding: v("createCounter() scope") }] }],
        console: [],
      },
      {
        lines: [7],
        note: "Nothing outside can read or change `count` directly: it is private to the closure.",
        scopes: [
          { name: "createCounter()", note: "finished, kept alive by the closure", vars: [{ name: "count", binding: v("2") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: ref("f1") }] },
        ],
        heap: [{ id: "f1", label: "arrow function", fields: [{ name: "[[Environment]]", binding: v("createCounter() scope") }] }],
        console: [],
      },
      {
        lines: [8],
        note: "The third call returns 3, which is logged.",
        scopes: [
          { name: "createCounter()", note: "finished, kept alive by the closure", vars: [{ name: "count", binding: v("3") }] },
          { name: "Global", vars: [{ name: "createCounter", binding: v("ƒ") }, { name: "counter", binding: ref("f1") }] },
        ],
        heap: [{ id: "f1", label: "arrow function", fields: [{ name: "[[Environment]]", binding: v("createCounter() scope") }] }],
        console: ["3"],
      },
    ],
  },

  references: {
    title: "Arguments are copies, but an object's value is a reference",
    code: `function update(n, list, user) {
  n += 1;
  list.push(4);
  user = { name: "replaced" };
}
const n = 1;
const list = [1, 2, 3];
const user = { name: "Ada" };
update(n, list, user);
console.log(n, list.length, user.name);`,
    steps: [
      {
        lines: [],
        note: "`update` is hoisted; the three `const`s are in their temporal dead zone.",
        scopes: [
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: tdz },
              { name: "list", binding: tdz },
              { name: "user", binding: tdz },
            ],
          },
        ],
        heap: [],
        console: [],
      },
      {
        lines: [6, 7, 8],
        note: "`n` holds the number itself. `list` and `user` hold references to two objects on the heap.",
        scopes: [
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }] },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
        ],
        console: [],
      },
      {
        lines: [9],
        note: "The call copies each argument into a parameter. The copies of `list` and `user` are copies of the **references**: they point at the same objects.",
        scopes: [
          { name: "update()", vars: [{ name: "n", binding: v("1") }, { name: "list", binding: ref("a1") }, { name: "user", binding: ref("o1") }] },
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }] },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
        ],
        console: [],
      },
      {
        lines: [2],
        note: "Changing the local `n` changes only the local copy.",
        scopes: [
          { name: "update()", vars: [{ name: "n", binding: v("2") }, { name: "list", binding: ref("a1") }, { name: "user", binding: ref("o1") }] },
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }] },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
        ],
        console: [],
      },
      {
        lines: [3],
        note: "`push` follows the reference and mutates the one shared array: the caller will see it.",
        scopes: [
          { name: "update()", vars: [{ name: "n", binding: v("2") }, { name: "list", binding: ref("a1") }, { name: "user", binding: ref("o1") }] },
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          {
            id: "a1",
            label: "Array",
            fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }, { name: "3", binding: v("4") }],
          },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
        ],
        console: [],
      },
      {
        lines: [4],
        note: "Assigning to `user` points the **local** parameter at a new object. The caller's `user` still points at the old one.",
        scopes: [
          { name: "update()", vars: [{ name: "n", binding: v("2") }, { name: "list", binding: ref("a1") }, { name: "user", binding: ref("o2") }] },
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          {
            id: "a1",
            label: "Array",
            fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }, { name: "3", binding: v("4") }],
          },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
          { id: "o2", label: "Object", fields: [{ name: "name", binding: v("\"replaced\"") }] },
        ],
        console: [],
      },
      {
        lines: [10],
        note: "After the call, nothing refers to the `\"replaced\"` object, and the global variables tell the story: 1, 4, Ada.",
        scopes: [
          {
            name: "Global",
            vars: [
              { name: "update", binding: v("ƒ") },
              { name: "n", binding: v("1") },
              { name: "list", binding: ref("a1") },
              { name: "user", binding: ref("o1") },
            ],
          },
        ],
        heap: [
          {
            id: "a1",
            label: "Array",
            fields: [{ name: "0", binding: v("1") }, { name: "1", binding: v("2") }, { name: "2", binding: v("3") }, { name: "3", binding: v("4") }],
          },
          { id: "o1", label: "Object", fields: [{ name: "name", binding: v("\"Ada\"") }] },
          { id: "o2", label: "Object", fields: [{ name: "name", binding: v("\"replaced\"") }], unreachable: true },
        ],
        console: ["1 4 Ada"],
      },
    ],
  },

  clone: {
    title: "A spread copies one level; structuredClone copies them all",
    code: `const original = { name: "Ada", tags: ["math"] };
const shallow = { ...original };
const deep = structuredClone(original);
shallow.tags.push("poetry");
console.log(original.tags.length, deep.tags.length);`,
    steps: [
      {
        lines: [],
        note: "Three `const`s, all in their temporal dead zone.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: tdz }, { name: "shallow", binding: tdz }, { name: "deep", binding: tdz }] }],
        heap: [],
        console: [],
      },
      {
        lines: [1],
        note: "Two objects: the outer one, and the `tags` array it points at.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: ref("o1") }, { name: "shallow", binding: tdz }, { name: "deep", binding: tdz }] }],
        heap: [
          { id: "o1", label: "original", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
        ],
        console: [],
      },
      {
        lines: [2],
        note: "The spread makes a new outer object and copies each property's **value**. For `tags`, the value is a reference, so both objects share one array.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: ref("o1") }, { name: "shallow", binding: ref("o2") }, { name: "deep", binding: tdz }] }],
        heap: [
          { id: "o1", label: "original", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
          { id: "o2", label: "shallow copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
        ],
        console: [],
      },
      {
        lines: [3],
        note: "`structuredClone` walks the whole graph and copies every object it finds, the array included.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: ref("o1") }, { name: "shallow", binding: ref("o2") }, { name: "deep", binding: ref("o3") }] }],
        heap: [
          { id: "o1", label: "original", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
          { id: "o2", label: "shallow copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "o3", label: "deep copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a2") }] },
          { id: "a2", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
        ],
        console: [],
      },
      {
        lines: [4],
        note: "Pushing through the shallow copy changes the shared array, so `original` sees it too. The deep copy's array is untouched.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: ref("o1") }, { name: "shallow", binding: ref("o2") }, { name: "deep", binding: ref("o3") }] }],
        heap: [
          { id: "o1", label: "original", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }, { name: "1", binding: v("\"poetry\"") }] },
          { id: "o2", label: "shallow copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "o3", label: "deep copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a2") }] },
          { id: "a2", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
        ],
        console: [],
      },
      {
        lines: [5],
        note: "2 for the shared array, 1 for the deep copy's own.",
        scopes: [{ name: "Global", vars: [{ name: "original", binding: ref("o1") }, { name: "shallow", binding: ref("o2") }, { name: "deep", binding: ref("o3") }] }],
        heap: [
          { id: "o1", label: "original", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "a1", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }, { name: "1", binding: v("\"poetry\"") }] },
          { id: "o2", label: "shallow copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a1") }] },
          { id: "o3", label: "deep copy", fields: [{ name: "name", binding: v("\"Ada\"") }, { name: "tags", binding: ref("a2") }] },
          { id: "a2", label: "Array", fields: [{ name: "0", binding: v("\"math\"") }] },
        ],
        console: ["2 1"],
      },
    ],
  },

  increment: {
    title: "The same side effect, a different expression value",
    code: `let i = 0;
const a = i++;
let j = 0;
const b = ++j;
console.log(a, i, b, j);`,
    steps: [
      {
        lines: [],
        note: "Four bindings, all in their temporal dead zone.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: tdz }, { name: "a", binding: tdz }, { name: "j", binding: tdz }, { name: "b", binding: tdz }] }],
        console: [],
      },
      {
        lines: [1],
        note: "`i` starts at 0.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("0") }, { name: "a", binding: tdz }, { name: "j", binding: tdz }, { name: "b", binding: tdz }] }],
        console: [],
      },
      {
        lines: [2],
        note: "`i++` reads `i` (0), stores 0 + 1 back into `i`, and the expression's value is the **old** 0. So `a` is 0 and `i` is 1.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("1") }, { name: "a", binding: v("0") }, { name: "j", binding: tdz }, { name: "b", binding: tdz }] }],
        console: [],
      },
      {
        lines: [3],
        note: "`j` starts at 0.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("1") }, { name: "a", binding: v("0") }, { name: "j", binding: v("0") }, { name: "b", binding: tdz }] }],
        console: [],
      },
      {
        lines: [4],
        note: "`++j` stores 1 into `j` first, and the expression's value is the **new** 1. So `b` and `j` are both 1.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("1") }, { name: "a", binding: v("0") }, { name: "j", binding: v("1") }, { name: "b", binding: v("1") }] }],
        console: [],
      },
      {
        lines: [5],
        note: "Both variables ended at 1; only the values handed to `a` and `b` differ.",
        scopes: [{ name: "Global", vars: [{ name: "i", binding: v("1") }, { name: "a", binding: v("0") }, { name: "j", binding: v("1") }, { name: "b", binding: v("1") }] }],
        console: ["0 1 1 1"],
      },
    ],
  },
};
