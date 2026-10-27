import { js, list, output, p, say, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_FUNCTIONAL: ReviewSection = {
  id: "js-functional",
  topic: "javascript",
  title: "Functions and functional style",
  blurb: "Pure functions, composition, recursion and caching: the ideas behind array methods, reducers and React's render model.",
  questions: [
    {
      id: "functional-programming",
      question: "What is functional programming?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A style of building programs from pure functions over immutable data, combined by composition. Functions are values that can be passed and returned (higher-order functions); state changes are expressed as new values rather than mutation; side effects are pushed to the edges. JavaScript supports it alongside imperative and object-oriented styles.",
      body: [
        js(`
const orders = [
  { item: "book", price: 12, paid: true },
  { item: "pen", price: 2, paid: false },
  { item: "lamp", price: 30, paid: true },
];
const paidTotal = orders
  .filter((order) => order.paid)
  .map((order) => order.price)
  .reduce((sum, price) => sum + price, 0);
console.log(paidTotal);
`),
        output(`42`),
        list(
          "**Pure functions**: output depends only on input; no side effects.",
          "**Immutability**: produce new values instead of changing existing ones.",
          "**First-class and higher-order functions**: `map`, `filter`, `reduce`, `compose`, callbacks.",
          "**Composition**: small functions piped together into bigger ones.",
          "**Declarative**: describe the result, not the loop.",
        ),
        say("React leans on these ideas: components should be pure functions of props and state, and reducers return new state instead of mutating it."),
      ],
      demo: { id: "pipe-builder", hint: "Compose small pure functions into one and watch a value flow through them." },
      goodToHear: ["Pure functions", "Immutability", "Higher-order functions", "Composition", "Side effects at the edges", "Easier testing and reasoning"],
      links: [{ title: "Eloquent JavaScript: Higher-order functions", url: "https://eloquentjavascript.net/05_higher_order.html" }],
    },
    {
      id: "pure-functions",
      question: "What is a pure function?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A function that, given the same arguments, always returns the same result, and has no side effects: it does not mutate its arguments or outside state, and does no I/O (network, DOM, logging, storage, random numbers, the current time). Pure functions are easy to test, cache and run in any order.",
      body: [
        js(`
let total = 0;
function addToTotal(amount) {
  total += amount; // side effect: changes outside state
  return total;
}
console.log(addToTotal(5), addToTotal(5));

const add = (a, b) => a + b;
console.log(add(5, 5), add(5, 5));

const tags = ["b", "a"];
const sortedImpure = (list) => list.sort(); // mutates its argument
const sortedPure = (list) => list.toSorted();
console.log(sortedPure(tags), tags);
sortedImpure(tags);
console.log(tags);
`),
        output(`
5 10
10 10
[ 'a', 'b' ] [ 'b', 'a' ]
[ 'a', 'b' ]
`),
        list(
          "**Referential transparency**: a call can be replaced by its result. That is what makes memoization safe.",
          "Side effects are not bad; they are the point of a program. Purity is about keeping them in a few known places.",
          "React requires rendering to be pure. StrictMode renders twice in development to surface impure components.",
        ),
      ],
      goodToHear: ["Same input, same output", "No side effects", "Doesn't mutate arguments", "Testable, cacheable", "React render purity"],
      links: [{ title: "react.dev: Keeping components pure", url: "https://react.dev/learn/keeping-components-pure" }],
    },
    {
      id: "imperative-vs-declarative",
      question: "Explain the differences between imperative and declarative programming.",
      topics: ["javascript"],
      level: "senior",
      short:
        "Imperative code says **how**: the exact steps, in order, usually mutating state (a `for` loop pushing into an array, `document.createElement` then `appendChild`). Declarative code says **what** result you want and leaves the steps to something else: SQL, HTML, CSS, `array.filter(...)`, or React's JSX, where you describe the UI for a state and React works out the DOM changes.",
      body: [
        js(`
const numbers = [1, 2, 3, 4, 5, 6];

const evensImperative = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) evensImperative.push(numbers[i] * 10);
}

const evensDeclarative = numbers.filter((n) => n % 2 === 0).map((n) => n * 10);

console.log(evensImperative, evensDeclarative);
`),
        output(`[ 20, 40, 60 ] [ 20, 40, 60 ]`),
        tsx(`
function TodoCount({ todos }: { todos: { done: boolean }[] }) {
  const left = todos.filter((todo) => !todo.done).length;
  // Declarative: describe the text for this state. React updates the DOM.
  return <p className={left === 0 ? "done" : undefined}>{left} left</p>;
}
`),
        p("The imperative version of that component would find the element, set its text, and add or remove the class on every change, remembering the previous state to know which. Declarative code is usually shorter and harder to get out of sync; imperative code gives finer control, which is why declarative libraries are built on imperative code underneath."),
      ],
      goodToHear: ["How vs what", "Mutation and steps vs expressions of the result", "SQL, HTML, CSS, JSX are declarative", "Declarative is built on imperative"],
      links: [{ title: "react.dev: Reacting to input with state", url: "https://react.dev/learn/reacting-to-input-with-state" }],
    },
    {
      id: "for-each-map",
      question: "What is the difference between the array methods `map()` and `forEach()`?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`map` returns a **new array** of the callback's return values, the same length as the original. `forEach` returns `undefined`; it exists for side effects. Use `map` to transform data (it is chainable and works in JSX), `forEach` (or `for...of`) to do something for each item.",
      body: [
        js(`
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
const nothing = numbers.forEach((n) => n * 2);
console.log(doubled, nothing, numbers);
`),
        output(`[ 2, 4, 6 ] undefined [ 1, 2, 3 ]`),
        list(
          "Neither can stop early. Use `for...of` with `break`, or `some`/`every`/`find`, which stop at the first match.",
          "Neither awaits an async callback. `forEach(async ...)` fires every call and moves on; use `for...of` with `await` for sequence, or `Promise.all(items.map(async ...))` for parallel.",
          "Both skip holes in sparse arrays.",
        ),
        trap("Using `map` only for its side effects builds an array nobody uses, and tells the reader you meant to transform data."),
      ],
      goodToHear: ["`map` returns a new array", "`forEach` returns undefined", "Neither breaks early", "Neither awaits async callbacks"],
      links: [{ title: "MDN: Array.prototype.map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" }],
    },
    {
      id: "pipe",
      question: "Create a function `pipe` that performs left-to-right function composition by returning a function that accepts one argument.",
      prompt: [
        js(`
const square = (v) => v * v;
const double = (v) => v * 2;
const addOne = (v) => v + 1;
const res = pipe(square, double, addOne);
res(3); // 19; addOne(double(square(3)))
`),
      ],
      topics: ["javascript"],
      level: "senior",
      short:
        "Collect the functions with a rest parameter and return a function that runs a value through them with `reduce`: `const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x)`. `compose` is the same with `reduceRight` (right to left).",
      body: [
        js(`
const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);
const compose = (...fns) => (x) => fns.reduceRight((value, fn) => fn(value), x);

const square = (v) => v * v;
const double = (v) => v * 2;
const addOne = (v) => v + 1;
console.log(pipe(square, double, addOne)(3));
console.log(compose(square, double, addOne)(3));
console.log(pipe()(7));
`),
        output(`
19
64
7
`),
        p("`compose(square, double, addOne)(3)` is `square(double(addOne(3)))`: `(3 + 1) * 2 = 8`, squared is 64. With no functions, `pipe` returns its input unchanged, because `reduce` starts from `x`."),
        list(
          "Each function takes one argument and returns one value, so the output of one fits the input of the next.",
          "An async version awaits each step: `(x) => fns.reduce(async (value, fn) => fn(await value), x)`.",
        ),
      ],
      demo: { id: "pipe-builder", hint: "Reorder the steps: the same functions give a different answer in a different order." },
      goodToHear: ["Rest parameter + `reduce`", "Left-to-right vs `compose`", "Unary functions", "Identity when empty"],
      links: [{ title: "MDN: Array.prototype.reduce", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" }],
    },
    {
      id: "memoize",
      question: "What is memoization?",
      topics: ["javascript"],
      level: "senior",
      short:
        "Caching a function's results by its arguments: the first call computes and stores the result, later calls with the same arguments return the stored value. It trades memory for time, and is only correct for pure functions. The classic win is recursive problems with overlapping subproblems, like Fibonacci.",
      body: [
        js(`
function memoize(fn) {
  const cache = new Map();
  return (n) => {
    if (!cache.has(n)) cache.set(n, fn(n));
    return cache.get(n);
  };
}
let calls = 0;
const slowSquare = (n) => {
  calls += 1;
  return n * n;
};
const fastSquare = memoize(slowSquare);
console.log(fastSquare(9), fastSquare(9), calls);

const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(50));
`),
        output(`
81 81 1
12586269025
`),
        list(
          "**The key**: one primitive argument maps directly to a `Map` key. Several arguments need a combined key (`JSON.stringify(args)` for simple data) or nested maps.",
          "**Memory**: an unbounded cache grows forever. Use an LRU limit, or a `WeakMap` when the argument is an object, so entries can be garbage-collected.",
          "**React**: `useMemo` and `memo` memoize per component instance, and only against the previous inputs. The React Compiler inserts this automatically.",
        ),
        trap("Memoizing an impure function (one that reads the time, `Math.random` or mutable state) returns stale answers."),
      ],
      demo: { id: "recursion-tree", hint: "Turn memoization on and watch the call tree for fib(n) collapse into a line." },
      goodToHear: ["Cache results by arguments", "Only for pure functions", "Overlapping subproblems", "Cache key strategy", "Memory cost, LRU, WeakMap"],
      links: [{ title: "MDN: Memoization", url: "https://developer.mozilla.org/en-US/docs/Glossary/Memoization" }],
    },
    {
      id: "recursion",
      question: "What is recursion and when is it useful?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A function that solves a problem by calling itself on a smaller version of it, until it reaches a base case it can answer directly. It fits data that is recursive itself (trees, the DOM, nested JSON, file systems, menus) and divide-and-conquer algorithms (merge sort, binary search), and it is often clearer than the loop with an explicit stack it replaces.",
      body: [
        js(`
const tree = {
  name: "root",
  children: [
    { name: "a", children: [{ name: "a1", children: [] }] },
    { name: "b", children: [] },
  ],
};
const count = (node) => 1 + node.children.reduce((sum, child) => sum + count(child), 0);
console.log(count(tree));

const flatten = (value) => (Array.isArray(value) ? value.flatMap(flatten) : [value]);
console.log(flatten([1, [2, [3, [4]]], 5]));
`),
        output(`
4
[ 1, 2, 3, 4, 5 ]
`),
        list(
          "**Base case first**: without one, the function recurses until `RangeError: Maximum call stack size exceeded`.",
          "**Depth limit**: the call stack holds roughly ten thousand frames, depending on the engine. Very deep data needs a loop with an explicit stack.",
          "**Repeated work**: naive recursive Fibonacci is O(2^n) because it recomputes the same values. Memoize, or build up iteratively.",
          "Proper tail calls are in the spec but only Safari implements them, so don't rely on them.",
        ),
      ],
      demo: { id: "recursion-tree", hint: "Raise n by one and see how many more calls the naive version makes." },
      goodToHear: ["Base case and recursive case", "Natural for trees and nested data", "Stack overflow risk", "Exponential repeated work, fixed by memoization", "No tail-call optimisation in practice"],
      links: [{ title: "MDN: Recursion", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion" }],
    },
  ],
};
