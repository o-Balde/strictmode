import { concept, js, output, pair, qa, table, trap, ts, tsx } from "./authoring";
import type { StudyTopic } from "./types";

export const JAVASCRIPT: StudyTopic = {
  id: "javascript",
  short: "JavaScript",
  title: "JavaScript (ES6+)",
  jd: "Front-End: JavaScript (ES6+)",
  weight: "core",
  summary:
    "ES6, officially ECMAScript 2015, rewrote how JavaScript is written: block scope, arrow functions, classes, promises and modules. Since then a smaller edition has shipped every June. Interviewers test the language through those changes: how it was done before, how it's done now, and why the new way is safer.",
  concepts: [
    concept(
      "Scope: `var` vs `let` and `const`",
      "**Lexical scope**: a function sees the variables of the place it was written, not of where it's called. `var` is function-scoped; `let` and `const` are block-scoped, so a `let` in a `for` loop gets a fresh binding on every iteration.",
    ),
    concept(
      "Hoisting and the temporal dead zone",
      "Declarations are registered before the code runs. Function declarations are fully usable early; `var` exists early as `undefined`. `let`, `const` and `class` are hoisted too, but sit in the **temporal dead zone** until their line runs, so touching them early throws a `ReferenceError`.",
    ),
    concept(
      "Closures",
      "A function keeps a live link to the variables of the scope it was created in, even after that scope has returned. That gives private state, factories, memoised helpers and every callback that reads outer variables. The classic bug is a **stale closure**: reading a value captured from an earlier render or loop iteration.",
    ),
    concept(
      "`this`",
      "Set by how a function is called: `obj.method()` gives `obj`; a bare call gives `undefined` in strict mode; `new` gives the new object; `call`, `apply` and `bind` set it explicitly. Arrow functions have no `this` of their own and use the enclosing one.",
    ),
    concept(
      "Prototypes and `class`",
      "Every object links to a prototype, and a property lookup walks that chain until it finds the name. `class` is syntax over this model: methods live on `Class.prototype`, and `extends` links one prototype to another. `#private` fields (ES2022) are the first truly private members.",
    ),
    concept(
      "The event loop",
      "One call stack runs your code. Timers, network calls and I/O are handed to the browser or Node, and their callbacks wait in queues. When the stack is empty, **every microtask** runs (promise callbacks, `queueMicrotask`), then **one macrotask** (a timer or I/O callback), then the microtasks again.",
    ),
    concept(
      "Promises and `async`/`await`",
      "A promise is a value that arrives later: pending, then fulfilled or rejected, exactly once. `.then` returns a new promise, so steps chain and errors fall through to the next `.catch`. `async`/`await` (ES2017) is syntax over promises: `await` pauses the function, never the thread.",
    ),
    concept(
      "Promise combinators",
      "`Promise.all` resolves with every result and rejects on the first failure. `allSettled` (ES2020) waits for all and reports each outcome. `race` settles with whichever settles first. `any` (ES2021) takes the first success and rejects with an `AggregateError` only if all fail.",
    ),
    concept(
      "ES modules vs CommonJS",
      "ES modules (`import`/`export`) are static: the graph is known before any code runs, which enables tree-shaking, and every module is strict mode. CommonJS (`require`, `module.exports`) is Node's original system, resolved synchronously at run time.",
    ),
    concept(
      "Equality and coercion",
      "`===` compares without converting types; `==` converts first, so `'1' == 1` is true. Use `===`, except for `x == null`, which checks `null` and `undefined` at once. `NaN` is the only value not equal to itself, so test it with `Number.isNaN`.",
    ),
    concept(
      "Values and references",
      "Primitives (string, number, boolean, `null`, `undefined`, symbol, bigint) are copied by value. Objects, arrays and functions are shared by reference. Spread copies are **shallow**; `structuredClone` makes a deep copy.",
    ),
    concept(
      "Immutability",
      "`const` stops reassignment, not mutation: a `const` array can still be pushed to. `Object.freeze` stops mutation, shallowly. ES2023's `toSorted`, `toReversed`, `toSpliced` and `with` return changed copies, which is exactly what React state needs.",
    ),
    concept(
      "Iterables and generators",
      "Anything with a `[Symbol.iterator]` method works with `for...of`, spread and destructuring: arrays, strings, `Map`, `Set`. A generator (`function*`) returns an iterator that pauses at each `yield`. ES2025 iterator helpers add `map`, `filter` and `take` directly on iterators.",
    ),
    concept(
      "`Map` and `Set`",
      "`Map` keeps insertion order, takes any key type and has `.size`. Plain objects only take string and symbol keys, and inherit keys from their prototype. `Set` holds unique values and, since ES2025, has `union`, `intersection` and `difference`. `WeakMap` doesn't keep its keys alive.",
    ),
  ],
  parts: [
    {
      id: "javascript-before-after",
      title: "Before and after: ES5 vs modern JavaScript",
      intro:
        "The same task, written the way it was done before ES6 and the way it's done now. Each card says which edition brought the change. Being able to say why the new form is safer is what interviewers are listening for.",
      pairs: [
        pair("Variables: `var` to `let` and `const`", "ES2015", "`let` gives each loop iteration its own binding, so the callbacks print 0, 1, 2. `const` makes reassignment a `TypeError`. Default to `const`, use `let` when you must reassign, never `var`.", {
          before: js(`
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3: every callback shares one i
  }, 0);
}
var rate = 0.05;
rate = "five percent"; // nothing stops this
`),
          after: js(`
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
const RATE = 0.05;
// RATE = 0.06 would throw: TypeError: Assignment to constant variable.
`),
        }),
        pair("Callbacks that need `this`: `self = this` to arrow functions", "ES2015", "An arrow function has no `this` of its own, so it uses the method's. Class fields like `seconds = 0` arrived in ES2022.", {
          before: js(`
function Timer() {
  var self = this;
  self.seconds = 0;
  setInterval(function () {
    self.seconds++; // "this" in here is not the Timer
  }, 1000);
}
`),
          after: js(`
class Timer {
  seconds = 0;

  start() {
    setInterval(() => this.seconds++, 1000);
  }
}
`),
        }),
        pair("Strings: concatenation to template literals", "ES2015", "Template literals interpolate any expression and keep line breaks, so building messages, SQL for logs or HTML strings stops being a game of matching quotes.", {
          before: js(`
var message = "Hello, " + client.name + "! You have " + count +
  " new " + (count === 1 ? "alert" : "alerts") + ".";
`),
          after: js(`
const message = \`Hello, \${client.name}! You have \${count} new \${count === 1 ? "alert" : "alerts"}.\`;
`),
        }),
        pair("Defaults: `x = x || fallback` to default parameters", "ES2015", "The `||` trick replaces every falsy value, so an explicit `0` or empty string is lost. A default parameter only applies when the argument is `undefined`. Shorthand properties (`{ type }`) arrived at the same time.", {
          before: js(`
function openAccount(type, currency) {
  type = type || "chequing";
  currency = currency || "CAD";
  return { type: type, currency: currency };
}
`),
          after: js(`
function openAccount(type = "chequing", currency = "CAD") {
  return { type, currency };
}
`),
        }),
        pair("Variable arguments: `arguments` to rest parameters", "ES2015", "`arguments` is array-like, not an array, and arrow functions don't have it. A rest parameter is a real array.", {
          before: js(`
function sum() {
  var numbers = Array.prototype.slice.call(arguments);
  return numbers.reduce(function (a, b) {
    return a + b;
  }, 0);
}
`),
          after: js(`
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
`),
        }),
        pair("Reading fields: one by one to destructuring", "ES2015", "Destructuring pulls fields and array items out in one statement, can rename and default them, and is how React props and hook results are read.", {
          before: js(`
var name = client.name;
var city = client.address.city;
var first = list[0];
var second = list[1];
`),
          after: js(`
const { name, address: { city } } = client;
const [first, second] = list;
const { limit = 25, ...rest } = options; // default and rest, too
`),
        }),
        pair("Copying and merging: `Object.assign` and `concat` to spread", "ES2015 arrays, ES2018 objects", "Spread reads as the shape it produces. Both forms make **shallow** copies: nested objects are still shared.", {
          before: js(`
var merged = Object.assign({}, defaults, overrides);
var all = first.concat(second);
var max = Math.max.apply(null, numbers);
`),
          after: js(`
const merged = { ...defaults, ...overrides };
const all = [...first, ...second];
const max = Math.max(...numbers);
`),
        }),
        pair("Objects with behaviour: constructor functions to `class`", "ES2015, `#private` in ES2022", "Same prototypes underneath, but `extends` and `super` replace the manual wiring, and `#balance` can't be read or changed from outside the class at all.", {
          before: js(`
function Account(owner, balance) {
  this.owner = owner;
  this.balance = balance; // anyone can overwrite this
}
Account.prototype.deposit = function (amount) {
  this.balance += amount;
};

function Savings(owner, balance, rate) {
  Account.call(this, owner, balance);
  this.rate = rate;
}
Savings.prototype = Object.create(Account.prototype);
Savings.prototype.constructor = Savings;
`),
          after: js(`
class Account {
  #balance;

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  get balance() {
    return this.#balance;
  }
}

class Savings extends Account {
  constructor(owner, balance, rate) {
    super(owner, balance);
    this.rate = rate;
  }
}
`),
        }),
        pair("Async work: nested callbacks to `async`/`await`", "ES2015 promises, ES2017 `async`/`await`", "The code reads top to bottom, one `try`/`catch` handles every step's errors, and each step still runs without blocking the thread.", {
          before: js(`
getClient(id, function (err, client) {
  if (err) return handle(err);
  getAccounts(client, function (err, accounts) {
    if (err) return handle(err);
    getBalance(accounts[0], function (err, balance) {
      if (err) return handle(err);
      render(balance);
    });
  });
});
`),
          after: js(`
async function showBalance(id) {
  try {
    const client = await getClient(id);
    const accounts = await getAccounts(client);
    render(await getBalance(accounts[0]));
  } catch (err) {
    handle(err);
  }
}
`),
        }),
        pair("Modules: `require` and IIFEs to `import`/`export`", "ES2015 (Node: stable since 14)", "Static imports let bundlers drop unused code and catch a misspelt import at build time. Dynamic `import()` (ES2020) loads a module on demand.", {
          before: js(`
// CommonJS in Node
var utils = require("./utils");
module.exports = { formatMoney: formatMoney };

// the "module pattern" in the browser
var App = (function () {
  var secret = 42; // private by closure
  return { run: function () {} };
})();
`),
          after: js(`
import { formatMoney } from "./utils.js";

export function run() {}

const { Chart } = await import("./chart.js"); // loaded only when needed
`),
        }),
        pair("Deep reads: `&&` chains to optional chaining", "ES2020", "`?.` stops and returns `undefined` at the first `null` or `undefined`, for properties, array indexes and calls alike.", {
          before: js(`
var city = client && client.address && client.address.city;
var first = list && list.length ? list[0] : undefined;
if (onDone) onDone();
`),
          after: js(`
const city = client?.address?.city;
const first = list?.[0];
onDone?.();
`),
        }),
        pair("Fallbacks: `||` to nullish coalescing", "ES2020, `??=` in ES2021", "`??` only falls back on `null` or `undefined`, so a real `0`, `false` or `''` survives. The logical assignment `??=` sets a value only if it's missing.", {
          before: js(`
var retries = options.retries || 3; // an explicit 0 becomes 3
var limit = options.limit !== null && options.limit !== undefined ? options.limit : 25;
if (options.timeout === undefined || options.timeout === null) options.timeout = 5000;
`),
          after: js(`
const retries = options.retries ?? 3; // 0 stays 0
const limit = options.limit ?? 25;
options.timeout ??= 5000;
`),
        }),
        pair("Membership: `indexOf` to `includes`", "ES2016", "`includes` says what you mean and, unlike `indexOf`, finds `NaN`.", {
          before: js(`
if (roles.indexOf("admin") !== -1) grantAccess();
[NaN].indexOf(NaN); // -1
`),
          after: js(`
if (roles.includes("admin")) grantAccess();
[NaN].includes(NaN); // true
`),
        }),
        pair("Walking an object: `for...in` to `Object.entries`", "ES2017, `fromEntries` in ES2019, `hasOwn` in ES2022", "`for...in` also visits inherited keys, hence the `hasOwnProperty` guard. `Object.entries` gives own key-value pairs ready to destructure, and `Object.fromEntries` turns pairs back into an object.", {
          before: js(`
for (var key in balances) {
  if (balances.hasOwnProperty(key)) {
    console.log(key, balances[key]);
  }
}
`),
          after: js(`
for (const [currency, amount] of Object.entries(balances)) {
  console.log(currency, amount);
}
const rateByCode = Object.fromEntries(rates.map((rate) => [rate.code, rate.value]));
Object.hasOwn(balances, "CAD"); // safe even on objects without a prototype
`),
        }),
        pair("The end of an array: `length - 1` to `at()` and `findLast()`", "ES2022 `at`, ES2023 `findLast`", "Negative indexes count from the end. `findLast` searches backwards without copying or reversing.", {
          before: js(`
var last = items[items.length - 1];
var lastDebit = items.filter(isDebit).pop(); // builds a whole new array
`),
          after: js(`
const last = items.at(-1);
const lastDebit = items.findLast(isDebit);
`),
        }),
        pair("Updating arrays without mutating: copy first to change-by-copy methods", "ES2023", "`sort` and `reverse` mutate in place, a classic source of React bugs. The copying versions return a new array and leave the original alone.", {
          before: js(`
var sorted = accounts.slice().sort(byBalance); // forget slice() and the prop is mutated
var updated = accounts.slice();
updated[2] = Object.assign({}, updated[2], { frozen: true });
`),
          after: js(`
const sorted = accounts.toSorted(byBalance);
const updated = accounts.with(2, { ...accounts[2], frozen: true });
const newestFirst = accounts.toReversed();
`),
        }),
        pair("Grouping: `reduce` to `Object.groupBy`", "ES2024", "One call, one intent. `Map.groupBy` does the same when the keys aren't strings.", {
          before: js(`
var byType = transactions.reduce(function (groups, tx) {
  (groups[tx.type] = groups[tx.type] || []).push(tx);
  return groups;
}, {});
`),
          after: js(`
const byType = Object.groupBy(transactions, (tx) => tx.type);
// { debit: [...], credit: [...] }
`),
        }),
        pair("Set logic: `filter` and `indexOf` to Set methods", "ES2025", "`intersection`, `union`, `difference`, `symmetricDifference` and `isSubsetOf` are built in, and they run in linear time instead of the quadratic `filter` + `indexOf`.", {
          before: js(`
var both = required.filter(function (doc) {
  return provided.indexOf(doc) !== -1;
});
`),
          after: js(`
const both = required.intersection(provided);
const missing = required.difference(provided);
const complete = required.isSubsetOf(provided);
`),
        }),
      ],
    },
    {
      id: "javascript-editions",
      title: "Edition by edition, ES2016 to ES2027",
      intro:
        "What each yearly edition added. You won't be asked for years, but naming a recent feature, and what it replaces, shows you keep up.",
      blocks: [
        table(
          ["Edition", "What arrived", "Most useful at work"],
          ["ES2015 (ES6)", "`let`/`const`, arrow functions, classes, template literals, destructuring, default/rest/spread, promises, modules, `Map`/`Set`, iterators, generators, `Symbol`", "The modern baseline: everything else builds on it"],
          ["ES2016", "`Array.prototype.includes`, the `**` operator", "`includes` for membership checks"],
          ["ES2017", "`async`/`await`, `Object.values`/`entries`, `padStart`/`padEnd`", "`async`/`await` everywhere"],
          ["ES2018", "Object rest/spread, `Promise.prototype.finally`, `for await...of`, named regex groups, lookbehind", "`{ ...state, field }` updates"],
          ["ES2019", "`flat`/`flatMap`, `Object.fromEntries`, `trimStart`/`trimEnd`, optional `catch` binding", "`fromEntries` to rebuild objects"],
          ["ES2020", "`?.`, `??`, `BigInt`, `Promise.allSettled`, dynamic `import()`, `globalThis`", "Optional chaining and nullish fallbacks"],
          ["ES2021", "`replaceAll`, `Promise.any`, `&&=` `||=` `??=`, numeric separators `1_000_000`, `WeakRef`", "Readable big numbers in limits and amounts"],
          ["ES2022", "Class fields, `#private`, static blocks, top-level `await`, `.at()`, `Object.hasOwn`, `Error` `cause`", "Private fields; `new Error(msg, { cause })`"],
          ["ES2023", "`findLast`/`findLastIndex`, `toSorted`/`toReversed`/`toSpliced`/`with`", "Immutable updates for React state"],
          ["ES2024", "`Object.groupBy`/`Map.groupBy`, `Promise.withResolvers`, resizable `ArrayBuffer`, regex `v` flag", "Grouping without `reduce`"],
          ["ES2025", "Iterator helpers, Set methods, `Promise.try`, `RegExp.escape`, JSON modules with import attributes, `Float16Array`", "Set logic; lazy iterator pipelines"],
          ["ES2026", "`Array.fromAsync`, `Error.isError`, `Math.sumPrecise`, `Uint8Array` base64 and hex, `Iterator.concat`, `Map` `getOrInsert`, `JSON.parse` source text", "Base64 without `btoa` tricks; upserting into a `Map`"],
          ["ES2027 (finished)", "Temporal, explicit resource management (`using`)", "Dates and time zones done right"],
        ),
      ],
    },
    {
      id: "javascript-run",
      title: "Run it in your head, then check",
      intro: "Each snippet runs as printed, and its output is checked when this page is built. Predict the output before reading it.",
      blocks: [
        js(`
console.log("1 sync");
setTimeout(() => console.log("4 macrotask"), 0);
Promise.resolve().then(() => console.log("3 microtask"));
console.log("2 sync");
`, { caption: "The event loop: microtasks before macrotasks" }),
        output(`
1 sync
2 sync
3 microtask
4 macrotask
`),
        js(`
const settings = { retries: 0, label: "" };
console.log(settings.retries || 3, settings.retries ?? 3);
console.log(settings.label || "none", JSON.stringify(settings.label ?? "none"));
console.log(settings.missing?.deep ?? "fallback");
`, { caption: "`||` vs `??`" }),
        output(`
3 0
none ""
fallback
`),
        js(`
function makeCounter() {
  let count = 0;
  return { increment: () => ++count, current: () => count };
}
const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.current(), typeof count);
`, { caption: "A closure keeps private state" }),
        output(`
2 undefined
`),
        js(`
const transactions = [
  { type: "debit", amount: 40 },
  { type: "credit", amount: 100 },
  { type: "debit", amount: 15 },
];
const byType = Object.groupBy(transactions, (tx) => tx.type);
console.log(Object.keys(byType), byType.debit.length);

const required = new Set(["id", "address", "employment"]);
const provided = new Set(["id", "address"]);
console.log([...required.difference(provided)]);

const large = transactions.values().filter((tx) => tx.amount > 20).map((tx) => tx.amount).toArray();
console.log(large);
`, { caption: "ES2024 grouping, ES2025 Set methods and iterator helpers" }),
        output(`
[ 'debit', 'credit' ] 2
[ 'employment' ]
[ 40, 100 ]
`),
        trap("`const` doesn't make a value immutable. `const list = []; list.push(1)` works; only `list = []` fails."),
      ],
    },
  ],
  questions: [
    qa("What does ES6 mean, and what came with it?", "ECMAScript 2015, the sixth edition of the standard JavaScript implements. It brought `let`/`const`, arrow functions, classes, template literals, destructuring, default/rest/spread, promises, modules, `Map`/`Set`, iterators and generators. Since then a smaller edition ships every June: ES2016, ES2017, and so on."),
    qa("What's the difference between `var`, `let` and `const`?", "`var` is function-scoped, hoisted as `undefined`, and can be redeclared. `let` and `const` are block-scoped and unusable before their line (the temporal dead zone). `const` can't be reassigned, though the object it holds can still change. Default to `const`, use `let` to reassign, avoid `var`."),
    qa("What is a closure? Give a real use.", "A function together with the variables of the scope it was created in, which it keeps using after that scope returns. Real uses: private state in a factory, a debounced handler holding its timer id, an event handler reading props. The classic bug is a stale closure reading an old value."),
    qa("Explain the event loop.", "JavaScript runs on one call stack. Timers, I/O and network calls are handed to the browser or Node, and their callbacks queue up. When the stack empties, the loop runs every pending microtask (promise callbacks), then one macrotask (a timer, an I/O callback). So a resolved promise's `.then` always runs before `setTimeout(fn, 0)`."),
    qa("`==` vs `===`?", "`===` checks type and value without conversion. `==` converts types first, so `'0' == 0` and `null == undefined` are both true. Use `===`; the one idiom worth keeping is `x == null` to catch both `null` and `undefined`."),
    qa("How is an arrow function different from a regular function?", "It has no `this`, `arguments`, `super` or `prototype` of its own: it uses the `this` of where it was written, and it can't be called with `new`. Right for callbacks; wrong for object methods and constructors that need their own `this`."),
    qa("What does `this` refer to?", "It depends on the call: `obj.method()` gives `obj`; a bare call gives `undefined` in strict mode; `new Fn()` gives the new object; `call`, `apply` and `bind` set it explicitly; an arrow uses the surrounding `this`. Passing `obj.method` as a callback loses `this`: wrap it in an arrow or `bind` it."),
    qa("`null` vs `undefined`?", "`undefined` means never assigned: a missing property, an unset variable, a function with no `return`. `null` is an explicit 'no value' that you assign. `typeof null` is `'object'`, a historical bug. `??` and `?.` treat the two the same."),
    qa("How do you run several requests in parallel, and what if one fails?", "Start them together with `await Promise.all([...])`, which rejects on the first failure: right when you need every result. `Promise.allSettled` waits for all and reports each outcome: right for independent widgets. Awaiting one after another in a loop is the usual accidental slowdown."),
    qa("How do you handle errors with `async`/`await`?", "Wrap the awaits in `try`/`catch`, or attach `.catch` to the returned promise, and use `finally` for clean-up such as hiding a spinner. A rejection nobody handles becomes an unhandled rejection, which crashes a Node process by default."),
    qa("Shallow copy vs deep copy?", "A shallow copy (`{ ...obj }`, `[...arr]`, `Object.assign`) duplicates the top level only; nested objects are still shared. `structuredClone(obj)` copies deeply, including dates, maps and cycles, but not functions or class prototypes. `JSON.parse(JSON.stringify(x))` is the old trick that loses dates and `undefined`."),
    qa("ES modules vs CommonJS?", "ES modules use `import`/`export`, are linked statically before running (so bundlers can tree-shake), load asynchronously and are always strict. CommonJS uses `require`/`module.exports`, resolved synchronously at run time. Node supports both; new code should be ESM (`\"type\": \"module\"` in `package.json`)."),
    qa("`map` vs `forEach` vs `filter` vs `reduce`?", "`map` returns a new array of transformed items; `filter` a new array of the items that pass a test; `reduce` folds the array into one value; `forEach` returns nothing and is for side effects. None of them can stop early: use `for...of`, `some` or `find` for that."),
    qa("What is hoisting?", "Declarations are registered for their scope before code runs. Function declarations can be called above their line; `var` exists early as `undefined`; `let`, `const` and `class` are hoisted but uninitialised, so using them early throws a `ReferenceError`."),
    qa("Debounce vs throttle?", "Debounce waits until calls stop for a set time, then runs once: search-as-you-type. Throttle runs at most once per interval while calls keep coming: scroll and resize handlers. Both are a closure around a timer."),
    qa("`??` vs `||`?", "`||` falls back on any falsy value, including `0`, `''` and `false`. `??` falls back only on `null` or `undefined`. For a retry count of `0` or an empty label, `??` keeps the real value where `||` silently replaces it."),
    qa("What's new in recent JavaScript?", "ES2023 added copying array methods (`toSorted`, `with`); ES2024 `Object.groupBy` and `Promise.withResolvers`; ES2025 iterator helpers, Set methods such as `union` and `intersection`, `Promise.try` and `RegExp.escape`; ES2026 `Array.fromAsync`, `Error.isError`, `Map.prototype.getOrInsert` and base64 on `Uint8Array`. Temporal, the replacement for `Date`, is finished and due in ES2027."),
  ],
  news: [
    { text: "ES2026 was approved on 30 June 2026 with no new syntax, only library additions: `Array.fromAsync`, `Error.isError`, `Math.sumPrecise`, base64 and hex on `Uint8Array`, `Iterator.concat`, `JSON.parse` source text access and `Map.prototype.getOrInsert`.", url: "https://www.infoworld.com/article/4193461/ecmascript-2026-specification-approved.html" },
    { text: "Temporal (dates, times and time zones without `Date`'s pitfalls) and explicit resource management (`using`) are finished proposals scheduled for ES2027. Node 26 already ships Temporal.", url: "https://github.com/tc39/proposals/blob/main/finished-proposals.md" },
  ],
  docs: [
    { label: "MDN JavaScript reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" },
    { label: "ECMAScript specification (TC39)", url: "https://tc39.es/ecma262/" },
    { label: "TC39 finished proposals, by year", url: "https://github.com/tc39/proposals/blob/main/finished-proposals.md" },
  ],
  bank: ["sb-javascript", "sb-coding"],
};

export const TYPESCRIPT: StudyTopic = {
  id: "typescript",
  short: "TypeScript",
  title: "TypeScript",
  jd: "Front-End: TypeScript",
  weight: "core",
  summary:
    "TypeScript is JavaScript with a type checker that runs before the code does. Interviews stay practical: how you model data so mistakes can't compile, the difference between the escape hatches (`any`, `as`) and the safe tools (`unknown`, narrowing, `satisfies`), and why types still don't protect you from what arrives at run time.",
  concepts: [
    concept("Static types, erased at build", "Types are checked at compile time and then **erased**: none of them exist at run time. Data from an API, a form or `JSON.parse` still has to be validated (for example with Zod) before its type means anything."),
    concept("Structural typing", "Compatibility is decided by shape, not by name: any object with the right properties fits an interface, even if it never declared that it implements it. Extra properties are only rejected in object literals, by excess property checks."),
    concept("Type inference", "TypeScript works out most types itself, from initial values, return statements and how callbacks are used. Annotate the boundaries (function parameters, exported APIs, component props) and let inference handle the inside."),
    concept("Union and intersection types", "`A | B` is a value that is one or the other, so you must narrow it before using what's specific to either. `A & B` is a value that is both at once, typically used to combine object shapes."),
    concept("Narrowing", "Inside a branch, TypeScript refines a union using `typeof`, `instanceof`, `in`, equality checks, truthiness, or a custom type guard (`value is Client`). Once every case has been handled, what's left is `never`."),
    concept("Discriminated unions", "A union of object types sharing a literal field, such as `status: 'pending' | 'approved' | 'rejected'`. Switching on that field narrows to the exact variant, and assigning the leftover to `never` in `default` makes the compiler flag a forgotten case."),
    concept("Generics", "Type parameters that let one function or type work for many types while keeping the relationship between them: `first<T>(items: T[]): T | undefined`. A constraint (`T extends { id: string }`) states what `T` must at least have."),
    concept("Utility types", "Built-in transformers that derive types from one source of truth: `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `ReturnType`, `Parameters`, `Awaited`, `NonNullable`."),
    concept("`any`, `unknown` and `never`", "`any` switches checking off, and it spreads silently. `unknown` accepts anything but allows nothing until you narrow it: the safe type for untrusted input. `never` is the empty type: a function that always throws, or a branch that can't happen."),
    concept("`interface` vs `type`", "Both describe object shapes. Interfaces can be reopened (declaration merging) and extended with `extends`. Type aliases can also name unions, tuples, primitives and mapped types. Use one convention for objects and `type` for the rest."),
    concept("`strict` mode", "One flag for the checks that matter: `strictNullChecks` (no `null` unless declared), `noImplicitAny`, strict function types, and more. Start every project strict; `noUncheckedIndexedAccess` is a worthwhile extra."),
    concept("`as const`, `satisfies` and `as`", "`as const` narrows a literal to its exact, readonly type. `satisfies` checks a value against a type without widening it, so exact keys keep their autocomplete. `as` is an assertion that overrides the checker, and should be rare."),
    concept("`keyof`, `typeof` and mapped types", "`keyof T` is the union of `T`'s keys; `typeof value` lifts a value's type into type space; a mapped type (`{ [K in keyof T]: ... }`) builds a new type by walking keys. Together they derive types from code instead of restating them."),
  ],
  parts: [
    {
      id: "typescript-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "`interface`", "`type`"],
          ["Object shapes", "Yes", "Yes"],
          ["Unions, tuples, primitives, mapped types", "No", "Yes"],
          ["Reopen and merge declarations", "Yes: two `interface Window` blocks merge", "No: a duplicate name is an error"],
          ["Extending", "`interface B extends A`", "`type B = A & { ... }`"],
          ["Good default for", "Public object contracts, class shapes", "Everything else"],
        ),
        table(
          ["Type", "Accepts", "Lets you use it as", "Use it for"],
          ["`any`", "Anything", "Anything: no checking at all", "Almost never; a migration escape hatch"],
          ["`unknown`", "Anything", "Nothing, until narrowed", "API responses, `JSON.parse`, `catch` errors"],
          ["`never`", "Nothing", "Anything (it can't exist)", "Exhaustive checks, functions that always throw"],
          ["`void`", "`undefined`", "Nothing useful", "Functions whose return value is ignored"],
        ),
        table(
          ["Utility", "What it does", "Example"],
          ["`Partial<T>`", "Every property optional", "A PATCH body: `Partial<Client>`"],
          ["`Required<T>`", "Every property required", "Config after defaults are applied"],
          ["`Readonly<T>`", "Every property read-only", "State you must not mutate"],
          ["`Pick<T, K>`", "Only keys `K`", "`Pick<Client, \"id\" | \"name\">`"],
          ["`Omit<T, K>`", "Every key except `K`", "`Omit<Client, \"password\">` for a response"],
          ["`Record<K, V>`", "An object with keys `K` and values `V`", "`Record<Currency, number>`"],
          ["`ReturnType<F>` / `Parameters<F>`", "A function's result or argument types", "Typing a wrapper around a library call"],
          ["`Awaited<P>`", "The value a promise resolves to", "`Awaited<ReturnType<typeof getClient>>`"],
          ["`NonNullable<T>`", "Removes `null` and `undefined`", "After a guard has run"],
        ),
      ],
    },
    {
      id: "typescript-before-after",
      title: "Before and after: loose code to code that can't compile wrong",
      pairs: [
        pair("An untyped boundary to a typed one", "TypeScript", "The request type documents the units and the required fields, and every caller is checked against it.", {
          before: js(`
function transfer(from, to, amount) {
  // dollars or cents? can "to" be missing?
  return api.post("/transfers", { from, to, amount });
}
`),
          after: ts(`
interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  /** Minor units: 1050 means $10.50. */
  amountCents: number;
}

declare const api: { post(path: string, body: unknown): Promise<{ id: string }> };

function transfer(request: TransferRequest): Promise<{ id: string }> {
  return api.post("/transfers", request);
}
`),
        }),
        pair("`any` to `unknown` and a type guard", "TypeScript 3.0", "With `any`, the typo compiles and crashes in production. With `unknown`, nothing compiles until a check proves the shape, and the guard runs at run time where the data actually arrives.", {
          before: ts(`
function parseClient(json: string): any {
  return JSON.parse(json);
}
const client = parseClient('{"name":"Ana"}');
client.adress.city; // a typo, and it compiles
`),
          after: ts(`
interface Client {
  name: string;
}

function isClient(value: unknown): value is Client {
  return typeof value === "object" && value !== null && "name" in value && typeof value.name === "string";
}

function parseClient(json: string): Client {
  const value: unknown = JSON.parse(json);
  if (!isClient(value)) throw new Error("Not a client");
  return value;
}
`),
        }),
        pair("Loose strings and optional fields to a discriminated union", "TypeScript 2.0", "Each status carries exactly the fields it needs, a misspelt status can't compile, and the `never` line turns a forgotten case into a build error.", {
          before: ts(`
interface Application {
  status: string; // "pending", "approved", "rejected"... or "aproved"
  approvedBy?: string;
  rejectionReason?: string;
}
`),
          after: ts(`
type Application =
  | { status: "pending" }
  | { status: "approved"; approvedBy: string }
  | { status: "rejected"; rejectionReason: string };

function describe(application: Application): string {
  switch (application.status) {
    case "pending":
      return "Waiting for review";
    case "approved":
      return \`Approved by \${application.approvedBy}\`;
    case "rejected":
      return \`Rejected: \${application.rejectionReason}\`;
    default: {
      const unhandled: never = application;
      return unhandled;
    }
  }
}
`),
        }),
        pair("`enum` to an `as const` object", "TypeScript 3.4 (`as const`), 5.8 (`erasableSyntaxOnly`)", "Enums generate run-time code, so Node's built-in TypeScript support (which only strips types) rejects them. A const object plus a derived union gives the same autocomplete over plain JavaScript.", {
          before: ts(`
enum AccountType {
  Chequing = "CHEQUING",
  Savings = "SAVINGS",
}
const type: AccountType = AccountType.Savings;
`),
          after: ts(`
const AccountType = {
  Chequing: "CHEQUING",
  Savings: "SAVINGS",
} as const;
type AccountType = (typeof AccountType)[keyof typeof AccountType]; // "CHEQUING" | "SAVINGS"

const type: AccountType = AccountType.Savings;
`),
        }),
        pair("A widening annotation to `satisfies`", "TypeScript 4.9", "Annotating with `Record<string, number>` throws away the exact keys. `satisfies` checks the shape and keeps the precise type, so `limits.GBP` becomes a compile error.", {
          before: ts(`
const limits: Record<string, number> = { CAD: 10_000, USD: 7_500 };
limits.GBP; // typed as number: no complaint
`),
          after: ts(`
type Currency = "CAD" | "USD";
const limits = { CAD: 10_000, USD: 7_500 } satisfies Record<Currency, number>;
limits.CAD; // number, and limits.GBP would not compile
`),
        }),
        pair("Copied types to derived types", "TypeScript 2.1 (mapped types)", "When `Client` gains a field or renames one, the derived types follow automatically instead of drifting apart.", {
          before: ts(`
interface Client {
  id: string;
  name: string;
  email: string;
  riskScore: number;
}
interface ClientSummary {
  id: string;
  name: string;
}
interface ClientUpdate {
  name?: string;
  email?: string;
}
`),
          after: ts(`
interface Client {
  id: string;
  name: string;
  email: string;
  riskScore: number;
}
type ClientSummary = Pick<Client, "id" | "name">;
type ClientUpdate = Partial<Pick<Client, "name" | "email">>;
type ClientsById = Record<string, Client>;
`),
        }),
      ],
    },
    {
      id: "typescript-generics",
      title: "A generic, run",
      blocks: [
        ts(`
function indexById<T extends { id: string }>(items: readonly T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

const accounts = indexById([
  { id: "a1", type: "chequing", balance: 120 },
  { id: "a2", type: "savings", balance: 900 },
]);
console.log(accounts.get("a2")?.balance);
`, { caption: "The constraint requires an `id`; the result keeps the full item type" }),
        output(`
900
`),
      ],
    },
  ],
  questions: [
    qa("`interface` vs `type`?", "Both describe object shapes. Interfaces can be extended and merged across declarations; type aliases can also express unions, tuples, primitives and mapped types. I use interfaces for object contracts and `type` for everything else, and stay consistent within a codebase."),
    qa("`any` vs `unknown`?", "Both accept any value. `any` also lets you do anything with it, so it silently turns checking off. `unknown` makes you narrow first, with `typeof`, `instanceof` or a type guard, so it's the right type for API responses, `JSON.parse` and caught errors."),
    qa("What is a generic? Give an example.", "A type parameter that keeps the link between input and output types: `function first<T>(items: T[]): T | undefined` returns a `Client` for a `Client[]` and a `number` for a `number[]`. Constraints such as `T extends { id: string }` say what `T` must have."),
    qa("How do you narrow a union type?", "With `typeof` for primitives, `instanceof` for classes, `in` for a property, equality on a discriminant field, truthiness checks, or a custom type guard returning `value is X`. After the checks, TypeScript knows the exact member in each branch."),
    qa("What is a discriminated union, and why use it?", "A union of object types that share a literal field such as `status`. Checking that field narrows to one variant, so each state carries only its own fields. With a `never` check in `default`, adding a new state breaks the build until every switch handles it."),
    qa("What does `strict` mode turn on?", "`strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `useUnknownInCatchVariables` and `alwaysStrict`. The biggest one is `strictNullChecks`: `null` and `undefined` must be handled wherever they can appear."),
    qa("Do TypeScript types exist at run time?", "No. They're erased when the code is compiled, so a response typed `Client` can still be anything. Validate data at the boundaries (API responses, forms, environment variables, messages) with a schema library such as Zod, and derive the type from the schema."),
    qa("`as` vs `satisfies`?", "`as` asserts a type and overrides the checker, so it can hide real mistakes. `satisfies` checks that a value matches a type but keeps the value's own, more precise type. Prefer `satisfies` for config objects and lookup tables."),
    qa("Name some utility types you use.", "`Partial` for PATCH bodies, `Pick` and `Omit` to derive summaries or strip secrets from a response type, `Record` for lookup tables, `ReturnType` and `Awaited` to type the result of a function I don't own, and `Readonly` for state."),
    qa("What is structural typing?", "TypeScript checks shapes, not names: any value with the required properties fits a type, even if it was never declared as that type. It's why plain object literals satisfy interfaces, and why two interfaces with the same fields are interchangeable."),
    qa("How do you type a React component's props and events?", "Declare a props type and destructure it: `function Row({ client, onSelect }: RowProps)`. Children are `React.ReactNode`. Events are typed by element, such as `React.ChangeEvent<HTMLInputElement>`, and are usually inferred when the handler is written inline."),
    qa("When would you use `never`?", "For exhaustive checks (assigning the leftover of a union to `never` in a `default` branch), for functions that always throw or never return, and in conditional types to filter members out of a union."),
    qa("Enum or union of string literals?", "Usually a union, or an `as const` object when you also want a runtime list of values. String unions cost nothing at run time, read naturally in JSON, and work with Node's type stripping; enums generate code and have numeric-enum surprises."),
    qa("What changed with TypeScript 7?", "The compiler was rewritten in Go and released in July 2026: same language, roughly ten times faster builds and editor feedback. TypeScript 6.0, in March 2026, was the last JavaScript-based compiler and deprecated old options in preparation."),
  ],
  news: [
    { text: "TypeScript 7.0 (July 2026) is the Go-native compiler: the same language, with full builds roughly ten times faster. Tools that hook into compiler internals may stay on 6.x for a while.", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
    { text: "TypeScript 6.0 (March 2026) was the last release built on the JavaScript codebase; it deprecated options that 7.0 removes.", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/" },
    { text: "Node.js runs `.ts` files directly by stripping types, as long as they use only erasable syntax: no enums, namespaces or parameter properties. `erasableSyntaxOnly` enforces this in `tsc`.", url: "https://nodejs.org/api/typescript.html" },
  ],
  docs: [
    { label: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    { label: "TSConfig reference", url: "https://www.typescriptlang.org/tsconfig/" },
    { label: "Utility types", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html" },
  ],
  bank: ["sb-javascript", "sb-react"],
};

export const REACT: StudyTopic = {
  id: "react",
  short: "React",
  title: "React",
  jd: "Front-End: React.js",
  weight: "core",
  summary:
    "React describes UI as a function of state: components return what the screen should look like, and React works out the smallest set of DOM changes. A full-stack interview checks the fundamentals (props, state, effects, keys, where state should live) and whether you know what modern React (19 and the Compiler) changed. Candidates have reported live builds here: a fetched table, a class-component counter, a todo app.",
  concepts: [
    concept("Components and JSX", "A component is a function that takes props and returns JSX, a syntax that compiles to `React.createElement`-style calls describing elements. Components must be pure: same props and state in, same output out, with no side effects during render."),
    concept("Props vs state", "Props are inputs passed down by the parent: read-only for the child. State is data a component owns and changes over time with its setter. Changing either re-renders the component; data flows one way, down the tree."),
    concept("Rendering and reconciliation", "On a state change, React calls the component again to get a new element tree, compares it with the previous one, and applies only the differences to the DOM. Changing an element's type at a position replaces the whole subtree there."),
    concept("Keys", "Keys tell React which list item is which between renders. Use a stable id from the data, not the array index: with index keys, inserting or reordering items attaches state and DOM nodes to the wrong rows."),
    concept("`useState`", "Returns the current value and a setter. Updates are batched and applied on the next render, so the variable doesn't change immediately. When the next value depends on the previous one, pass a function: `setCount((c) => c + 1)`."),
    concept("`useEffect`", "Runs after React has updated the screen, to synchronise with something outside React: a subscription, a timer, a non-React widget, a request. The dependency array controls when it re-runs, and the returned clean-up function runs before the next run and on unmount."),
    concept("`useRef`", "A mutable box (`ref.current`) that survives re-renders without causing them. It's used for DOM nodes (focus, measuring) and for values like timer ids that must persist but don't affect what's rendered."),
    concept("`useContext`", "Reads a value provided higher in the tree without passing props through every level. Good for theme, locale or the current user. Every consumer re-renders when the provided value changes, so it's not a replacement for a state library in busy apps."),
    concept("`useReducer`", "State updates expressed as `dispatch({ type: 'deposit', amount })` and a pure `reducer(state, action)` that returns the next state. Worth it when several fields change together or the next state depends on many rules."),
    concept("`memo`, `useMemo` and `useCallback`", "`memo` skips re-rendering a component when its props are unchanged; `useMemo` caches a computed value; `useCallback` caches a function's identity. Since the React Compiler 1.0 (October 2025), the compiler can insert this memoisation automatically."),
    concept("Controlled vs uncontrolled inputs", "A controlled input's value lives in React state and updates on every `onChange`: easy to validate and format as the user types. An uncontrolled input keeps its own value in the DOM, read with a ref or `FormData` on submit: less code, fewer re-renders."),
    concept("Custom hooks", "A function starting with `use` that calls other hooks, extracting reusable stateful logic such as `useDebounce` or `useFetch`. Each component calling it gets its own state; hooks share logic, not data."),
    concept("Error boundaries", "A component that catches render errors in its children and shows a fallback instead of unmounting the whole app. They're still written as classes (`componentDidCatch`, `getDerivedStateFromError`) and don't catch errors in event handlers or async code."),
    concept("Suspense and `lazy`", "`<Suspense fallback>` shows a fallback while something inside is waiting: code loaded with `lazy()`, or data read with `use()` or a Suspense-aware library. In Next.js it's how server-rendered pages stream."),
    concept("React 19: Actions", "Functions passed to `<form action>` or run in a transition. `useActionState` tracks their result and pending state, `useFormStatus` reads the pending state from a child button, and `useOptimistic` shows the expected result while the request is in flight. `ref` is now a plain prop."),
    concept("React 19.2: `Activity` and `useEffectEvent`", "`<Activity mode=\"hidden\">` hides a subtree while keeping its state, ready to show instantly. `useEffectEvent` gives an effect a callback that always reads the latest props without making them dependencies, so it doesn't re-run."),
  ],
  parts: [
    {
      id: "react-before-after",
      title: "Before and after: how React code changed",
      pairs: [
        pair("A class component to a function component with hooks", "React 16.8 (hooks)", "One effect replaces two lifecycle methods. The clean-up aborts an outdated request, so a slow response for the previous account can't overwrite the current one. In production, prefer a data library or a Server Component to a hand-written fetch effect.", {
          before: tsx(`
interface Props {
  accountId: string;
}
interface State {
  balance: number | null;
}

declare function fetchBalance(id: string): Promise<number>;

class BalanceCard extends Component<Props, State> {
  state: State = { balance: null };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(previous: Props) {
    if (previous.accountId !== this.props.accountId) this.load();
  }

  load() {
    fetchBalance(this.props.accountId).then((balance) => this.setState({ balance }));
  }

  render() {
    return <p>{this.state.balance ?? "Loading…"}</p>;
  }
}
`),
          after: tsx(`
interface Props {
  accountId: string;
}

declare function fetchBalance(id: string, signal: AbortSignal): Promise<number>;

function BalanceCard({ accountId }: Props) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchBalance(accountId, controller.signal)
      .then(setBalance)
      .catch(() => {}); // aborted, or show an error state
    return () => controller.abort();
  }, [accountId]);

  return <p>{balance ?? "Loading…"}</p>;
}
`),
        }),
        pair("Hand-written memoisation to the React Compiler", "React Compiler 1.0 (October 2025)", "With the compiler enabled at build time, plain code gets the memoisation that `useMemo`, `useCallback` and `memo` used to add by hand. Knowing why those hooks exist is still an interview question.", {
          before: tsx(`
interface Account {
  id: string;
  balance: number;
}
interface ListProps {
  accounts: Account[];
  total: number;
  onSelect: (id: string) => void;
}

const AccountList = memo(function AccountList({ accounts, total }: ListProps) {
  return <p>{accounts.length} accounts, {total}</p>;
});

function Accounts({ accounts, onSelect }: { accounts: Account[]; onSelect: (id: string) => void }) {
  const total = useMemo(() => accounts.reduce((sum, a) => sum + a.balance, 0), [accounts]);
  const handleSelect = useCallback((id: string) => onSelect(id), [onSelect]);
  return <AccountList accounts={accounts} total={total} onSelect={handleSelect} />;
}
`),
          after: tsx(`
interface Account {
  id: string;
  balance: number;
}
interface ListProps {
  accounts: Account[];
  total: number;
  onSelect: (id: string) => void;
}

function AccountList({ accounts, total }: ListProps) {
  return <p>{accounts.length} accounts, {total}</p>;
}

function Accounts({ accounts, onSelect }: { accounts: Account[]; onSelect: (id: string) => void }) {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);
  return <AccountList accounts={accounts} total={total} onSelect={onSelect} />;
}
`),
        }),
        pair("`forwardRef` to `ref` as a prop", "React 19", "Function components receive `ref` like any other prop, so the wrapper is gone. `forwardRef` still works and will be deprecated later.", {
          before: tsx(`
const AmountInput = forwardRef<HTMLInputElement, { label: string }>(function AmountInput({ label }, ref) {
  return (
    <label>
      {label}
      <input ref={ref} inputMode="decimal" />
    </label>
  );
});
`),
          after: tsx(`
function AmountInput({ label, ref }: { label: string; ref?: Ref<HTMLInputElement> }) {
  return (
    <label>
      {label}
      <input ref={ref} inputMode="decimal" />
    </label>
  );
}
`),
        }),
        pair("Submit handlers with loading state to form Actions", "React 19", "`useActionState` returns the action's last result and a pending flag, the form resets after success, and in Next.js the same action can be a Server Function that works before JavaScript loads.", {
          before: tsx(`
declare function saveEmail(email: string): Promise<{ error?: string }>;

function EmailForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await saveEmail(email);
    setError(result.error ?? null);
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <button disabled={pending}>Save</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
`),
          after: tsx(`
declare function saveEmail(email: string): Promise<{ error?: string }>;

function EmailForm() {
  const [error, submit, pending] = useActionState<string | null, FormData>(async (_previous, form) => {
    const result = await saveEmail(String(form.get("email")));
    return result.error ?? null;
  }, null);

  return (
    <form action={submit}>
      <input name="email" />
      <button disabled={pending}>Save</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
`),
        }),
        pair("A dependency that shouldn't restart the effect to `useEffectEvent`", "React 19.2", "Reading `muted` inside an Effect Event always sees its latest value, but it no longer has to be a dependency, so toggling mute doesn't tear down and reopen the connection.", {
          before: tsx(`
declare function connect(roomId: string): {
  on(event: "message", handler: (text: string) => void): void;
  close(): void;
};

function Chat({ roomId, muted }: { roomId: string; muted: boolean }) {
  useEffect(() => {
    const connection = connect(roomId);
    connection.on("message", (text) => {
      if (!muted) new Notification(text);
    });
    return () => connection.close();
  }, [roomId, muted]); // toggling mute reconnects
  return null;
}
`),
          after: tsx(`
declare function connect(roomId: string): {
  on(event: "message", handler: (text: string) => void): void;
  close(): void;
};

function Chat({ roomId, muted }: { roomId: string; muted: boolean }) {
  const onMessage = useEffectEvent((text: string) => {
    if (!muted) new Notification(text);
  });

  useEffect(() => {
    const connection = connect(roomId);
    connection.on("message", (text) => onMessage(text));
    return () => connection.close();
  }, [roomId]); // only a new room reconnects
  return null;
}
`),
        }),
      ],
    },
    {
      id: "react-compare",
      title: "Side by side",
      blocks: [
        table(
          ["Class component", "Function component"],
          ["`this.state` and `this.setState`", "`useState` or `useReducer`"],
          ["`componentDidMount`", "`useEffect(fn, [])`"],
          ["`componentDidUpdate`", "`useEffect(fn, [deps])`"],
          ["`componentWillUnmount`", "The function an effect returns"],
          ["`shouldComponentUpdate` / `PureComponent`", "`memo`, or the React Compiler"],
          ["Instance fields for timers", "`useRef`"],
          ["`componentDidCatch` / `getDerivedStateFromError`", "No hook yet: error boundaries stay classes"],
        ),
        table(
          ["Where state lives", "Use it for", "Watch out for"],
          ["Local (`useState`, `useReducer`)", "Form fields, toggles, anything one component owns", "Lifting it later when siblings need it"],
          ["Lifted to a parent", "Two siblings sharing a value", "Prop drilling through many levels"],
          ["Context", "Theme, locale, current user: read widely, changed rarely", "Every consumer re-renders on each change"],
          ["Redux Toolkit or Zustand", "Large client state with many writers, devtools, middleware", "Boilerplate, and putting server data in it"],
          ["Server state (TanStack Query, Server Components)", "Anything fetched: caching, refetching, deduplication", "Copying it into local state and letting it go stale"],
          ["The URL", "Filters, tabs, pagination: shareable and survives reloads", "Encoding and validating the values"],
        ),
        table(
          ["", "Controlled", "Uncontrolled"],
          ["The value lives in", "React state", "The DOM"],
          ["You read it", "From state, at any time", "From a ref or `FormData`, usually on submit"],
          ["Validation as you type", "Easy", "Needs extra wiring"],
          ["Re-renders", "On every keystroke", "None while typing"],
          ["Good for", "Masks, live validation, dependent fields", "Simple forms, file inputs, form Actions"],
        ),
      ],
    },
  ],
  questions: [
    qa("What is the virtual DOM, and how does reconciliation work?", "When state changes, React calls your components again to build a new element tree, diffs it against the previous one, and applies only the differences to the real DOM in a batch. Elements of a different type at the same position are replaced; list items are matched by `key`."),
    qa("Why do list items need keys, and why not the index?", "Keys tell React which item is which between renders, so it can keep each item's state and DOM node. With the index as key, inserting, deleting or sorting moves state onto the wrong rows. Use a stable id from the data."),
    qa("Props vs state?", "Props are inputs from the parent and read-only in the child. State is owned by the component and changed through its setter. Both trigger a re-render when they change; data flows down through props, and changes flow up through callbacks."),
    qa("Why doesn't a state variable change right after I call its setter?", "State is a snapshot per render: the setter schedules a re-render, and updates are batched, so the variable in the current render keeps its old value. Use the functional form `setCount((c) => c + 1)` when the next value depends on the previous one."),
    qa("Explain `useEffect`'s dependency array and clean-up.", "The effect runs after render, then re-runs when a value in the array changes; `[]` means once after mount, and no array means after every render. The function it returns runs before the next run and on unmount, to unsubscribe, clear timers or abort requests."),
    qa("`useMemo` vs `useCallback` vs `memo`?", "`useMemo` caches a computed value, `useCallback` caches a function, and `memo` makes a component skip re-rendering when its props are unchanged. They're optimisations, used when profiling shows a cost; the React Compiler now adds them automatically."),
    qa("Controlled vs uncontrolled components?", "Controlled: the input's value comes from state and changes through `onChange`, so React is the source of truth. Uncontrolled: the DOM holds the value and you read it with a ref or `FormData`. Controlled suits live validation; uncontrolled suits simple forms and file inputs."),
    qa("Context API vs Redux?", "Context passes a value down the tree without props; it isn't a state manager and re-renders every consumer when the value changes. Redux Toolkit is a store with actions, reducers, selectors, middleware and devtools, built for large shared client state. Server data belongs in a query library instead of either."),
    qa("How do you avoid prop drilling?", "First, composition: pass components as `children` so intermediate levels don't need the data. Then Context for widely read values, or a store for busy shared state. Keeping state as close as possible to where it's used avoids most of the problem."),
    qa("What are error boundaries?", "Components that catch errors thrown while rendering their children and show a fallback instead of a blank page. They're class components using `getDerivedStateFromError` and `componentDidCatch`. They don't catch errors in event handlers, timers or async code; handle those with `try`/`catch`."),
    qa("How do you fetch data in React?", "In plain React: an effect with an `AbortController` clean-up and loading and error states, or better a library like TanStack Query for caching and retries. In Next.js App Router: fetch in a Server Component and stream with Suspense."),
    qa("What's new in React 19?", "Actions for forms and transitions with `useActionState`, `useFormStatus` and `useOptimistic`; `use()` to read a promise or context; `ref` as a regular prop; document metadata tags rendered from components; Server Components and Server Functions as stable features. 19.2 added `Activity` and `useEffectEvent`."),
    qa("Why do my effects run twice in development?", "`StrictMode` mounts, unmounts and remounts components in development to expose missing clean-up. If running twice breaks something, the effect is missing a clean-up. It doesn't happen in production."),
    qa("How would you speed up a slow list?", "Measure first with the React Profiler. Then give rows stable keys, memoise rows so typing elsewhere doesn't re-render them, virtualise long lists so only visible rows are in the DOM, and move expensive work out of render or behind `useDeferredValue`."),
    qa("What are the rules of hooks?", "Call hooks only at the top level of a component or custom hook, never inside conditions, loops or nested functions, because React matches hook state by call order. And call them only from React functions. The ESLint plugin enforces both."),
    qa("What does the React Compiler do?", "A build-time tool, stable since October 2025, that analyses components and inserts memoisation automatically, so you rarely need `useMemo`, `useCallback` or `memo` by hand. It relies on components following the rules of React: pure render, no mutation of props or state."),
  ],
  news: [
    { text: "React 19.2 (October 2025) added `<Activity>`, to hide part of the UI while keeping its state, and `useEffectEvent`, for effect callbacks that read the latest props without re-running the effect.", url: "https://react.dev/blog/2025/10/01/react-19-2" },
    { text: "React Compiler 1.0 shipped in October 2025: build-time automatic memoisation that works with Babel, Vite and Next.js, so hand-written `useMemo` and `useCallback` are rarely needed.", url: "https://react.dev/blog/2025/10/07/react-compiler-1" },
  ],
  docs: [
    { label: "react.dev: Learn React", url: "https://react.dev/learn" },
    { label: "Hooks reference", url: "https://react.dev/reference/react/hooks" },
    { label: "You might not need an effect", url: "https://react.dev/learn/you-might-not-need-an-effect" },
  ],
  bank: ["sb-react", "sb-builds"],
};

export const NEXTJS: StudyTopic = {
  id: "nextjs",
  short: "Next.js",
  title: "Next.js",
  jd: "Front-End: Next.js",
  weight: "core",
  summary:
    "Next.js is the React framework that adds routing, server rendering, data fetching and a backend layer. GWE's postings describe Next.js used as a backend-for-frontend, so expect questions about what runs on the server and what in the browser, how pages are rendered and cached, and how you'd protect a route. This page is built with Next.js 16, so the details below follow its documentation.",
  concepts: [
    concept("App Router", "Routes are folders under `app/`: `page.tsx` is the page, `layout.tsx` wraps child routes and keeps its state across navigation, and `loading.tsx`, `error.tsx` and `not-found.tsx` handle those states. Folders in `[brackets]` are dynamic segments, and route groups `(name)` organise without changing the URL."),
    concept("Server Components", "The default in the App Router. They run only on the server, can be `async`, can read databases and secrets directly, and send no JavaScript to the browser. They can't use state, effects or browser APIs."),
    concept("Client Components", "`\"use client\"` at the top of a file marks a boundary: that module and everything it imports run in the browser too (pre-rendered to HTML, then hydrated). Use them for state, effects, event handlers and browser APIs, and keep them as small as possible."),
    concept("Hydration", "The server sends HTML so the page shows immediately; the browser then loads the JavaScript and attaches React to that HTML to make it interactive. A hydration mismatch is when the first client render differs from the server HTML, for example by reading `Date.now()` or `window` during render."),
    concept("Rendering strategies", "**SSG**: rendered at build time. **ISR**: static, regenerated after a time or on demand. **SSR**: rendered per request. **CSR**: an empty shell filled in by the browser. **PPR** (Partial Prerendering): a static shell sent instantly, with dynamic parts streamed into it."),
    concept("Cache Components (Next.js 16)", "With `cacheComponents: true`, nothing is cached unless you say so: mark functions or components with `\"use cache\"`, set lifetimes with `cacheLife`, label entries with `cacheTag`, and expire them with `revalidateTag` or `updateTag`. Dynamic parts stream inside `<Suspense>`."),
    concept("Server Functions (Server Actions)", "Async functions marked `\"use server\"` that the client can call, typically through `<form action>`. Next.js turns each into a POST endpoint, so they must validate their input and check the user's permissions like any public API."),
    concept("Route Handlers", "`app/**/route.ts` files exporting `GET`, `POST` and so on, built on the Web `Request` and `Response` APIs. Use them for webhooks, APIs consumed by other clients, and anything that isn't a form submission."),
    concept("Proxy (formerly middleware)", "`proxy.ts` at the project root runs before a request reaches a route: redirects, rewrites, headers, quick session checks. Next.js 16 renamed it from `middleware` to stress that it's a network boundary, not the place for full authorisation."),
    concept("Streaming and Suspense", "A page can send its HTML in pieces: the shell first, then each `<Suspense>` boundary as its data arrives, with `loading.tsx` as a route-level boundary. Users see content sooner, and one slow query doesn't block the whole page."),
    concept("Request APIs are async", "Since Next.js 15, `params`, `searchParams`, `cookies()` and `headers()` return promises and must be awaited. Reading them marks the code as request-time, which matters for caching."),
    concept("Backend-for-frontend (BFF)", "A server layer built for one front end: it calls the microservices, aggregates and reshapes their responses, keeps tokens and secrets server-side, and exposes exactly what the UI needs. Next.js Route Handlers and Server Components can play that role."),
    concept("Built-in optimisations", "`next/image` resizes, lazy-loads and serves modern formats; `next/font` self-hosts fonts with no layout shift; `<Link>` prefetches routes; the Metadata API generates `<title>` and Open Graph tags. Turbopack is the default bundler since Next.js 16."),
  ],
  parts: [
    {
      id: "nextjs-compare",
      title: "Side by side",
      blocks: [
        table(
          ["Strategy", "HTML is made", "Data freshness", "Good for", "In the App Router"],
          ["SSG", "At build time", "As old as the build", "Marketing pages, docs", "A page with no request-time data"],
          ["ISR", "At build, then regenerated", "Refreshed on a schedule or on demand", "Catalogues, rates, content", "`\"use cache\"` with `cacheLife`, or `revalidateTag`"],
          ["SSR", "On every request", "Always current", "Account pages, personalised data", "Reading `cookies()`, `headers()` or uncached data"],
          ["CSR", "In the browser", "Whenever the client fetches", "Highly interactive widgets behind login", "A Client Component fetching after mount"],
          ["PPR", "Static shell + streamed dynamic holes", "Shell cached, holes per request", "Most real pages", "`cacheComponents: true` and `<Suspense>`"],
        ),
        table(
          ["", "Server Component", "Client Component"],
          ["Runs", "On the server only", "On the server for the first HTML, then in the browser"],
          ["Data access", "Direct: database, internal APIs, secrets", "Through an API, Route Handler or Server Function"],
          ["State, effects, event handlers", "No", "Yes"],
          ["Browser APIs (`window`, `localStorage`)", "No", "Yes, after mount"],
          ["JavaScript sent to the browser", "None", "The component and everything it imports"],
          ["Marked by", "Default", "`\"use client\"` at the top of the file"],
        ),
        table(
          ["", "Pages Router (`pages/`)", "App Router (`app/`)"],
          ["Default component", "Client (hydrated everywhere)", "Server Component"],
          ["Data fetching", "`getServerSideProps`, `getStaticProps`", "`async` components, `fetch`, `\"use cache\"`"],
          ["Layouts", "`_app` and per-page patterns", "Nested `layout.tsx` that keep state"],
          ["API endpoints", "`pages/api/*`", "`route.ts` Route Handlers"],
          ["Mutations", "API routes called from the client", "Server Functions, or Route Handlers"],
          ["Status", "Supported, no new features", "Where new features land"],
        ),
      ],
    },
    {
      id: "nextjs-before-after",
      title: "Before and after: Pages Router and earlier versions to Next.js 16",
      pairs: [
        pair("`getServerSideProps` to an async Server Component", "Next.js 13.4 (App Router stable)", "The component fetches its own data on the server and none of the fetching code reaches the browser.", {
          before: tsx(`
// pages/accounts.tsx
import type { GetServerSideProps } from "next";

interface Account {
  id: string;
  name: string;
}
declare function getAccounts(): Promise<Account[]>;

export const getServerSideProps: GetServerSideProps<{ accounts: Account[] }> = async () => {
  return { props: { accounts: await getAccounts() } };
};

export default function AccountsPage({ accounts }: { accounts: Account[] }) {
  return <ul>{accounts.map((account) => <li key={account.id}>{account.name}</li>)}</ul>;
}
`),
          after: tsx(`
// app/accounts/page.tsx
interface Account {
  id: string;
  name: string;
}
declare function getAccounts(): Promise<Account[]>;

export default async function AccountsPage() {
  const accounts = await getAccounts();
  return <ul>{accounts.map((account) => <li key={account.id}>{account.name}</li>)}</ul>;
}
`),
        }),
        pair("API routes to Route Handlers", "Next.js 13.2", "One exported function per HTTP method, built on standard `Request` and `Response`; an unexported method gets `405` automatically.", {
          before: ts(`
// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  res.status(200).json({ status: "ok" });
}
`),
          after: ts(`
// app/api/health/route.ts
export function GET() {
  return Response.json({ status: "ok" });
}
`),
        }),
        pair("`middleware.ts` to `proxy.ts`", "Next.js 16", "Same API under a name that says what it is. A cookie check here is only an optimistic redirect: verify the session again where the data is read.", {
          before: ts(`
// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/accounts/:path*"] };
`),
          after: ts(`
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/accounts/:path*"] };
`),
        }),
        pair("Synchronous `params` to awaited `params`", "Next.js 15", "Request data is a promise, so the page can start rendering before it's needed, and reading it clearly marks the code as request-time.", {
          before: tsx(`
// Next.js 14
export default function ClientPage({ params }: { params: { id: string } }) {
  return <h1>Client {params.id}</h1>;
}
`),
          after: tsx(`
// Next.js 15 and later
export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Client {id}</h1>;
}
`),
        }),
        pair("`unstable_cache` to `\"use cache\"`", "Next.js 16 (Cache Components)", "Caching becomes explicit and local to the function: a named lifetime profile, a tag to expire it by, and no hidden caching of `fetch` calls.", {
          before: ts(`
import { unstable_cache } from "next/cache";

declare function queryRates(): Promise<Record<string, number>>;

export const getRates = unstable_cache(queryRates, ["rates"], { revalidate: 3600, tags: ["rates"] });
`),
          after: ts(`
import { cacheLife, cacheTag } from "next/cache";

declare function queryRates(): Promise<Record<string, number>>;

export async function getRates() {
  "use cache";
  cacheLife("hours");
  cacheTag("rates");
  return queryRates();
}
`),
        }),
        pair("A client-side `fetch` to a Server Function", "Next.js 14 (stable Server Actions); `updateTag` in 16", "No API route to write and the form works before JavaScript loads. A Server Function is still a public POST endpoint, so it authorises the caller first. `updateTag` makes the user see their own change immediately.", {
          before: tsx(`
"use client";

export function RenameForm({ accountId }: { accountId: string }) {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name");
    await fetch(\`/api/accounts/\${accountId}\`, { method: "PATCH", body: JSON.stringify({ name }) });
  }
  return (
    <form onSubmit={onSubmit}>
      <input name="name" />
      <button>Rename</button>
    </form>
  );
}
`),
          after: tsx(`
import { updateTag } from "next/cache";

declare function requireOwner(accountId: string): Promise<void>;
declare function renameAccount(accountId: string, name: string): Promise<void>;

async function rename(accountId: string, form: FormData) {
  "use server";
  await requireOwner(accountId);
  await renameAccount(accountId, String(form.get("name")));
  updateTag(\`account-\${accountId}\`);
}

export function RenameForm({ accountId }: { accountId: string }) {
  return (
    <form action={rename.bind(null, accountId)}>
      <input name="name" />
      <button>Rename</button>
    </form>
  );
}
`),
        }),
      ],
    },
  ],
  questions: [
    qa("Server Components vs Client Components?", "Server Components run only on the server, can fetch data and use secrets directly, and ship no JavaScript; they're the default. Client Components, marked with `\"use client\"`, add state, effects, event handlers and browser APIs, and are hydrated in the browser. Keep interactivity in small client leaves."),
    qa("SSR vs SSG vs ISR?", "SSG renders at build time: fastest, but as stale as the last build. SSR renders on every request: always fresh, costs server time per request. ISR serves static pages and regenerates them on a schedule or when data changes. In Next.js 16 these are expressed with `\"use cache\"`, `cacheLife` and tags."),
    qa("What does `\"use client\"` actually do?", "It marks a module boundary. That file and everything it imports become part of the client bundle; components above it stay on the server. Server Components can still be passed to a Client Component as `children`, which keeps them on the server."),
    qa("What is hydration, and what causes a hydration error?", "Hydration is React attaching event handlers and state to the server-rendered HTML in the browser. An error means the first client render produced different markup from the server: reading `window`, dates, random values or `localStorage` during render. Move that into an effect or a Client Component."),
    qa("How do you fetch data in the App Router?", "Make the Server Component `async` and await the data: from the database, an internal API or `fetch`. Start independent requests in parallel, wrap slow parts in `<Suspense>` so they stream, and cache explicitly with `\"use cache\"` where the data allows."),
    qa("How do you protect a route?", "An optimistic check in `proxy.ts` redirects users without a session. The real check sits next to the data: verify the session and permissions in the Server Component, Route Handler or Server Function that reads or changes data. Never rely on hiding a link."),
    qa("What security rules apply to Server Actions?", "Each one is a public POST endpoint, even if only your form calls it. Validate the input, authenticate and authorise the user inside the function, never trust IDs from the client without an ownership check, and return only what the UI needs."),
    qa("Server Action or Route Handler?", "Server Actions for mutations from your own UI: forms and buttons, with revalidation built in. Route Handlers when something else calls you: webhooks, mobile apps, other services, or when you need full control over the HTTP method, headers and status codes."),
    qa("How does caching work in Next.js 16?", "With Cache Components on, everything is dynamic by default. You opt in with `\"use cache\"` on a function or component, give it a lifetime with `cacheLife` and a tag with `cacheTag`, then expire it with `revalidateTag(tag, profile)` (stale-while-revalidate) or `updateTag` in a Server Action (read-your-writes)."),
    qa("Why use Next.js as a backend-for-frontend?", "It keeps tokens, secrets and service URLs on the server, aggregates several microservice calls into one response shaped for the page, renders HTML fast for the first view, and lets the front-end team own that layer without touching the core services."),
    qa("What is streaming?", "Sending the page in chunks instead of waiting for all its data. The shell and fast parts arrive first; each `<Suspense>` boundary shows its fallback, then swaps in when its data resolves. `loading.tsx` adds a boundary for a whole route."),
    qa("What did Next.js 16 change?", "Turbopack became the default bundler for `dev` and `build`; `middleware` was renamed `proxy`; Cache Components replaced the experimental PPR flags; `revalidateTag` now takes a cache profile, with new `updateTag` and `refresh` APIs; it ships with React 19.2 and needs Node 20.9 or later."),
    qa("How do you handle SEO and metadata?", "Export a `metadata` object or a `generateMetadata` function from a page or layout for titles, descriptions, canonical URLs, Open Graph and robots rules. Add `sitemap.ts` and `robots.ts`. Server rendering means crawlers get real HTML."),
  ],
  news: [
    { text: "Next.js 16 made Turbopack the default bundler, renamed `middleware` to `proxy`, introduced Cache Components (`\"use cache\"`, `cacheLife`, `cacheTag`) in place of experimental PPR, and added `updateTag` and `refresh`.", url: "https://nextjs.org/blog/next-16" },
  ],
  docs: [
    { label: "Next.js documentation", url: "https://nextjs.org/docs" },
    { label: "Server and Client Components", url: "https://nextjs.org/docs/app/getting-started/server-and-client-components" },
    { label: "Upgrading to version 16", url: "https://nextjs.org/docs/app/guides/upgrading/version-16" },
  ],
  bank: ["sb-nextjs", "sb-builds"],
};
