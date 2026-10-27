import { js, list, output, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_SCOPE: ReviewSection = {
  id: "js-scope",
  topic: "javascript",
  title: "Scope, hoisting and closures",
  blurb: "Where a variable is visible, when it exists, and how a function keeps hold of the variables around it.",
  questions: [
    {
      id: "var-let-const",
      question: "What are the differences between `var`, `let`, `const` and no keyword statements?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`var` is function-scoped, hoisted with the value `undefined`, and can be redeclared. `let` and `const` are block-scoped and sit in a temporal dead zone until their declaration runs; `const` also cannot be reassigned (its object can still change). Assigning with no keyword creates an accidental global in sloppy code and throws in strict code.",
      body: [
        table(
          ["", "`var`", "`let`", "`const`", "no keyword"],
          ["Scope", "function", "block", "block", "global (sloppy) / error (strict)"],
          ["Before the declaration", "`undefined`", "`ReferenceError` (TDZ)", "`ReferenceError` (TDZ)", "n/a"],
          ["Redeclare in the same scope", "yes", "no", "no", "n/a"],
          ["Reassign", "yes", "yes", "no", "yes"],
          ["Top level adds a `window` property", "yes", "no", "no", "yes"],
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
        p("The loop shows the practical difference. There is one `var i` for the whole function, and the callbacks run after the loop, when it is 3. A `let` in a `for` header gets a fresh binding per iteration, so each callback closes over its own `j`."),
        say("I use `const` by default, `let` when the variable is reassigned, and never `var`."),
      ],
      demo: { id: "stepper-var-let", hint: "Step through both loops and count how many `i` bindings exist versus `j` bindings." },
      goodToHear: ["Function scope vs block scope", "Temporal dead zone", "`const` prevents reassignment, not mutation", "Per-iteration `let` bindings in loops", "Implicit globals without a keyword"],
      links: [
        { title: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
        { title: "MDN: const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" },
      ],
    },
    {
      id: "hoisting",
      question: "How does hoisting work in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Before running a scope, the engine registers every declaration in it, as if they had moved to the top. Function declarations are fully available. `var` exists with the value `undefined`. `let`, `const` and `class` exist but are uninitialised (the temporal dead zone) until their line runs. Assignments are never hoisted.",
      body: [
        js(`
console.log(typeof hoisted, typeof notYet);
function hoisted() {}
var notYet = function () {};
try {
  console.log(later);
} catch (error) {
  console.log(error.name);
}
let later = 1;
`),
        output(`
function undefined
ReferenceError
`),
        list(
          "**Function declarations** can be called before the line they appear on. That is what lets helpers live at the bottom of a file.",
          "**Function expressions and arrow functions** follow their variable: `var` gives `undefined` (calling it is a `TypeError`), `let`/`const` throw in the TDZ.",
          "The TDZ is a feature: reading a variable before it is set is almost always a bug, and `let` turns it into an error instead of a silent `undefined`.",
        ),
        trap("Nothing is physically moved. Hoisting is a model for the creation phase: the scope's bindings are created first, then the code runs line by line."),
      ],
      goodToHear: ["Declarations are processed before execution", "Function declarations are fully hoisted", "`var` → undefined; `let`/`const` → TDZ", "Assignments are not hoisted"],
      links: [{ title: "MDN: Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" }],
    },
    {
      id: "hoisting-example",
      question: "What will the console log in this example?",
      prompt: [
        js(`
var foo = 1;
var foobar = function () {
  console.log(foo);
  var foo = 2;
};
foobar();
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`undefined`. The inner `var foo` is hoisted to the top of `foobar`, so inside the function `foo` refers to the local variable, not the outer one. At the `console.log`, that local exists but has not been assigned yet.",
      body: [
        js(`
var foo = 1;
var foobar = function () {
  var foo; // hoisted declaration, value undefined
  console.log(foo);
  foo = 2; // the assignment stays where it was written
};
foobar();
`, { caption: "What the engine effectively runs" }),
        output(`undefined`),
        p("With `let foo = 2` inside the function, the same code throws a `ReferenceError` instead: the local still shadows the outer `foo`, but it is in its temporal dead zone at the `console.log`."),
      ],
      demo: { id: "stepper-hoisting", hint: "Watch the local `foo` appear in the function's scope before the first line runs." },
      goodToHear: ["The local declaration shadows the outer variable", "Declaration hoisted, assignment not", "`let` would throw instead"],
      links: [{ title: "MDN: var hoisting", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#hoisting" }],
    },
    {
      id: "lexical-vs-dynamic-scoping",
      question: "What is the difference between lexical scoping and dynamic scoping?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "With lexical (static) scoping, a function sees the variables of the place where it is **written**. With dynamic scoping, it sees the variables of the place where it is **called**. JavaScript is lexically scoped, which is what makes closures work. The one dynamic-looking part is `this`, which depends on the call (except in arrow functions).",
      body: [
        js(`
const level = "global";
function show() {
  return level;
}
function run() {
  const level = "inside run";
  return show();
}
console.log(run());
`),
        output(`global`),
        p("`show` was defined at the top level, so `level` resolves there. Under dynamic scoping (Bash, early Lisps, Perl's `local`) the call from `run` would have printed `\"inside run\"`."),
        list(
          "Lexical scoping can be read from the source: you know what a name refers to without running the program.",
          "`this` is resolved per call, which is why a method passed as a callback loses its object.",
          "Arrow functions take `this` lexically, from the surrounding code, which is why they fix that problem.",
        ),
      ],
      goodToHear: ["Lexical = where defined; dynamic = where called", "JavaScript is lexical", "Enables closures", "`this` is the dynamic exception, arrows make it lexical"],
      links: [{ title: "MDN: Closures, lexical scoping", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#lexical_scoping" }],
    },
    {
      id: "closures",
      question: "What is a closure? Can you give a useful example of one?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A closure is a function together with the variables of the scope it was created in. The function keeps access to them after that scope has finished running. Every function in JavaScript is a closure; it matters when a function outlives its parent, as with factories, callbacks, private state and React hooks.",
      body: [
        js(`
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    current: () => count,
  };
}
const a = createCounter();
const b = createCounter();
a.increment();
a.increment();
b.increment();
console.log(a.current(), b.current());
console.log(a.count);
`),
        output(`
2 1
undefined
`),
        p("Each call to `createCounter` makes a new `count`, and only the two returned functions can reach it: private state without a class. The same mechanism powers `once`, `memoize`, debounce timers, partially applied functions and event handlers that remember their item."),
        js(`
function once(fn) {
  let done = false;
  let result;
  return (...args) => {
    if (!done) {
      done = true;
      result = fn(...args);
    }
    return result;
  };
}
const init = once(() => {
  console.log("initialising");
  return 42;
});
console.log(init(), init());
`),
        output(`
initialising
42 42
`),
        tsx(`
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    // This closure captured the first render's \`seconds\` (0) forever.
    const id = setInterval(() => setSeconds(seconds + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{seconds}</p>;
}
`, { caption: "A stale closure: the timer shows 1 and stops", tone: "bad" }),
        trap("Closures capture variables, not values. A stale closure is one that captured an old variable: in React, every render has its own `seconds`. The fix above is `setSeconds((s) => s + 1)`."),
      ],
      demo: { id: "stepper-closure", hint: "Follow `count` after `createCounter` returns: the scope survives because a function still points at it." },
      goodToHear: ["Function + its lexical environment", "Outlives the parent scope", "Private state and factories", "Each call creates a new scope", "Stale closures in React"],
      links: [{ title: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" }],
    },
    {
      id: "iife",
      question: "What is the reason for wrapping the entire contents of a JavaScript source file in a function that is immediately invoked?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "An IIFE (immediately invoked function expression) gives the file a private scope. Classic scripts all share one global scope, so top-level `var`s and functions would collide with other scripts; inside the function they stay local, and you expose only what you choose. ES modules have their own scope, so IIFEs are now mostly legacy.",
      body: [
        js(`
const counterModule = (() => {
  let count = 0;
  return { next: () => ++count };
})();
console.log(counterModule.next(), counterModule.next());
console.log(typeof count);
`),
        output(`
1 2
undefined
`),
        list(
          "**The module pattern**: return an object of public functions, keep the rest private (jQuery plugins, UMD bundles).",
          "**Safe aliases**: `(function ($, undefined) { ... })(jQuery)` gave the file a guaranteed `$`.",
          "**Async setup** in a classic script: `(async () => { await init(); })();`. Modules can use top-level `await` instead.",
          "The parentheses are required: `function () {}()` at the start of a statement parses as a declaration, not an expression.",
        ),
        say("With `type=\"module\"` scripts and bundlers, every file already has its own scope, so I reach for an IIFE only to run async code in a classic script."),
      ],
      goodToHear: ["Avoids polluting the global scope", "Private state (module pattern)", "Parentheses make it an expression", "Replaced by ES modules"],
      links: [{ title: "MDN: IIFE", url: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE" }],
    },
    {
      id: "parameter-vs-argument",
      question: "What is the difference between a parameter and an argument?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Parameters are the names in a function's definition; arguments are the values passed when it is called. In `function add(a, b)`, `a` and `b` are parameters; in `add(1, 2)`, `1` and `2` are arguments.",
      body: [
        js(`
function greet(name, greeting = "Hello") {
  return greeting + ", " + name;
}
console.log(greet("Ada"));
console.log(greet("Ada", "Hi", "extra"));
console.log(greet.length);
function count(...args) {
  return args.length;
}
console.log(count(1, 2, 3));
`),
        output(`
Hello, Ada
Hi, Ada
1
3
`),
        list(
          "JavaScript does not check the count: missing arguments are `undefined` (or take the default), extra ones are ignored unless collected with a rest parameter.",
          "`fn.length` counts parameters before the first one with a default or a rest parameter.",
          "Arguments are passed by value; for objects, that value is a reference.",
        ),
      ],
      goodToHear: ["Parameters: definition; arguments: call", "Missing → undefined, extra → ignored", "Default and rest parameters", "`function.length`"],
      links: [{ title: "MDN: Parameter", url: "https://developer.mozilla.org/en-US/docs/Glossary/Parameter" }],
    },
  ],
};
