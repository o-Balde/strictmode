import { js, list, output, p, say, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const JAVASCRIPT_CORE: PrepSection = {
  id: "js-core",
  track: "javascript",
  title: "JavaScript under the hood",
  blurb:
    "React and TypeScript interviews always dip into the language underneath. Closures explain hooks, the event loop explains effects and batching, and reference equality explains re-renders. Expect 'what does this log?'.",
  drill: "async-await",
  questions: [
    {
      id: "js-closures",
      question: "What is a closure? What does this code log?",
      level: "junior",
      short:
        "A closure is a function together with the variables that were in scope where it was created. The function keeps access to those variables, live, not as copies, for as long as it exists, even after the outer function has returned.",
      body: [
        js(`
function createCounter() {
  let count = 0;
  const label = "count is " + count; // evaluated once, right here

  return {
    increment() {
      count += 1;
    },
    read() {
      return count;
    },
    describe() {
      return label;
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();

console.log(counter.read());
console.log(counter.describe());
`),
        output(`
2
count is 0
`),
        p(
          "`read` closes over the variable `count`, so it sees the current value. `describe` closes over `label`, which is a string computed once when `count` was 0. A closure captures variables, not expressions: nothing re-evaluates that concatenation.",
        ),
        js(`
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
`),
        output(`
var 3
var 3
var 3
let 0
let 1
let 2
`),
        p(
          "`var` is function-scoped, so all three callbacks share one `i`, which is 3 by the time they run. `let` creates a new binding for every iteration, so each callback has its own `j`.",
        ),
        list(
          "**Used for:** private state (the counter above), function factories, callbacks and event handlers, memoisation, partial application.",
          "**In React:** every render creates new handler and effect functions that close over that render's props and state. That is why a handler sees the values from the render it was created in, and why a missing dependency produces a stale closure.",
        ),
      ],
      followUps: [
        {
          q: "Can closures cause memory leaks?",
          a: "They keep whatever they reference alive. A long-lived callback (a listener, an interval, a cache entry) that closes over a large object or a DOM node prevents it from being collected until the callback itself is released.",
        },
        {
          q: "How would you fix the `var` loop without `let`?",
          a: "Create a new scope per iteration: an immediately invoked function that takes `i` as a parameter, or pass `i` as the third argument to `setTimeout`.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
    },
    {
      id: "js-this",
      question: "How is `this` determined? What does this code log?",
      level: "intermediate",
      short:
        "For a regular function, `this` is decided by how the function is called, not where it is defined. For an arrow function, `this` is taken from the enclosing scope at the point of definition and can never be changed.",
      body: [
        js(`
const user = {
  name: "Ada",
  greet() {
    console.log("method:", this.name);

    const inner = function () {
      console.log("function:", this === undefined ? "no this" : this.name);
    };
    const arrow = () => {
      console.log("arrow:", this.name);
    };

    inner();
    arrow();
  },
};

user.greet();

const { greet } = user;
try {
  greet();
} catch (error) {
  console.log("detached:", error.constructor.name);
}
`),
        output(`
method: Ada
function: no this
arrow: Ada
detached: TypeError
`),
        table(
          ["How it is called", "`this` is"],
          ["`obj.method()`", "`obj`"],
          ["`fn()` (a plain call)", "`undefined` in strict mode and modules; the global object in sloppy scripts"],
          ["`fn.call(x)`, `fn.apply(x)`, `fn.bind(x)()`", "`x`"],
          ["`new Fn()`", "The newly created object"],
          ["An arrow function", "Whatever `this` is in the surrounding scope"],
          ["A DOM listener added with `addEventListener`", "The element (for regular functions)"],
        ),
        list(
          "`inner()` is a plain call, so it has no `this`, even though it is written inside a method.",
          "`arrow` has no `this` of its own; it uses `greet`'s, which is `user`.",
          "Destructuring `greet` detaches it from `user`. Called bare, `this` is `undefined`, and reading `.name` throws.",
        ),
      ],
      followUps: [
        {
          q: "How does this relate to React?",
          a: "It is the reason class component handlers had to be bound: `onClick={this.handleClick}` passes the method detached from its instance. Function components do not use `this` at all.",
        },
        {
          q: "Can you re-bind an arrow function with `call` or `bind`?",
          a: "No. The first argument is ignored. An arrow's `this` is fixed lexically.",
        },
        {
          q: "What does `bind` return?",
          a: "A new function permanently bound to the given `this` (and optionally to leading arguments). Binding it again does not change it.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
    },
    {
      id: "js-event-loop",
      question: "Explain the event loop. In what order does this code log?",
      level: "intermediate",
      short:
        "JavaScript runs one thing at a time on a call stack. When the stack is empty, the event loop first runs every queued microtask (promise callbacks, `queueMicrotask`, the continuation after an `await`), and only then takes one macrotask (a timer, an I/O callback, a UI event). Then it repeats.",
      body: [
        js(`
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

queueMicrotask(() => console.log("E"));

(async () => {
  console.log("F");
  await null;
  console.log("G");
})();

console.log("H");
`),
        output(`
A
F
H
C
E
G
D
B
`),
        list(
          "**Synchronous first:** `A`, then `F` (an async function runs synchronously up to its first `await`), then `H`.",
          "**Then all microtasks, in the order they were queued:** `C`, `E`, `G`. Running `C` queues `D`, which goes to the back of the microtask queue and still runs before any timer.",
          "**Then one macrotask:** `B`, even though its delay was 0.",
        ),
        js(`
setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("microtask from timeout 1"));
}, 0);

setTimeout(() => console.log("timeout 2"), 0);
`),
        output(`
timeout 1
microtask from timeout 1
timeout 2
`),
        p(
          "The microtask queue is drained completely after every macrotask. A microtask scheduled inside the first timer therefore runs before the second timer, and a microtask that keeps scheduling more microtasks can starve timers and rendering indefinitely.",
        ),
        table(
          ["Microtasks", "Macrotasks"],
          ["`.then` / `.catch` / `.finally` callbacks", "`setTimeout`, `setInterval`"],
          ["Code after `await`", "DOM events, I/O, `MessageChannel`"],
          ["`queueMicrotask`, `MutationObserver`", "The browser renders between macrotasks"],
        ),
      ],
      followUps: [
        {
          q: "Is the function passed to `new Promise(...)` asynchronous?",
          a: "No. The executor runs synchronously, immediately. Only the `.then` callbacks are deferred.",
        },
        {
          q: "Why does a long loop freeze the page?",
          a: "Rendering and input handling happen between tasks. While one task is running, nothing else can, including repainting. Break the work up, or move it to a Web Worker.",
        },
        {
          q: "Where does this show up in React?",
          a: "Batching: every state update in one task is collected into a single render. And timing: effects run after the browser has painted, layout effects before.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
    },
    {
      id: "js-promises",
      question: "How do promises work? What is the difference between `Promise.all`, `allSettled`, `race` and `any`?",
      level: "intermediate",
      short:
        "A promise represents a value that will exist later. It is pending, then settles exactly once, as fulfilled or rejected. `async`/`await` is syntax over the same thing. The four combinators differ in what they wait for and how they treat failure.",
      body: [
        table(
          ["Combinator", "Fulfils when", "Rejects when", "Use for"],
          ["`Promise.all`", "All fulfil; gives an array in input order", "Any one rejects (immediately)", "Independent requests that are all required"],
          ["`Promise.allSettled`", "All have settled; never rejects", "Never", "Reporting each outcome; partial success is fine"],
          ["`Promise.race`", "The first one settles, if it fulfilled", "The first one settles, if it rejected", "Timeouts"],
          ["`Promise.any`", "The first one fulfils", "All reject (`AggregateError`)", "Fallbacks: the first mirror that answers"],
        ),
        js(`
const after = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const failAfter = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("boom")), ms));

console.log(await Promise.all([after(20, "a"), after(10, "b")]));

const settled = await Promise.allSettled([after(10, "a"), failAfter(5)]);
console.log(settled.map((result) => result.status));

console.log(await Promise.race([after(30, "slow"), after(5, "fast")]));
console.log(await Promise.any([failAfter(5), after(20, "ok")]));

try {
  await Promise.all([after(20, "a"), failAfter(5)]);
} catch (error) {
  console.log(error.message);
}
`),
        output(`
[ 'a', 'b' ]
[ 'fulfilled', 'rejected' ]
fast
ok
boom
`),
        js(`
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sequential(ids) {
  const results = [];
  for (const id of ids) {
    await delay(100); // each waits for the previous one
    results.push(id);
  }
  return results;
}

async function parallel(ids) {
  return Promise.all(
    ids.map(async (id) => {
      await delay(100); // all three are in flight together
      return id;
    }),
  );
}

let start = Date.now();
await sequential([1, 2, 3]);
const sequentialMs = Date.now() - start;

start = Date.now();
await parallel([1, 2, 3]);
const parallelMs = Date.now() - start;

console.log(sequentialMs >= 300, parallelMs < 300);
`),
        output(`
true true
`),
        trap(
          "`await` inside a `for` loop runs the requests one after another. That is correct when each depends on the previous, and a threefold slowdown when they are independent.",
        ),
      ],
      followUps: [
        {
          q: "Does `Promise.all` cancel the others when one rejects?",
          a: "No. It rejects early, but the other operations keep running and their results are discarded. Promises cannot be cancelled; you cancel the underlying work with an `AbortController`.",
        },
        {
          q: "What happens to an error thrown in an `async` function?",
          a: "It becomes a rejection of the promise the function returned. If nothing awaits or catches it, you get an unhandled rejection.",
        },
        {
          q: "How do you add a timeout to a request?",
          a: "`fetch(url, { signal: AbortSignal.timeout(5000) })`, which also cancels the request. Racing against a timer only stops you waiting; the request carries on.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
    },
    {
      id: "js-reference-vs-value",
      question: "What is the difference between a shallow copy and a deep copy? What does this log?",
      level: "junior",
      short:
        "Primitives are copied by value. Objects, arrays and functions are held by reference, so copying the variable copies the pointer. A shallow copy duplicates the top level and shares everything nested; a deep copy duplicates the whole structure.",
      body: [
        js(`
const original = { name: "Ada", address: { city: "London" }, tags: ["a"] };

const shallow = { ...original };
const deep = structuredClone(original);

shallow.name = "Grace"; // a primitive on the copy: the original is unaffected
shallow.address.city = "Paris"; // a nested object: shared with the original
deep.tags.push("b"); // fully independent

console.log(original.name);
console.log(original.address.city);
console.log(original.tags.length);
console.log(original.address === shallow.address, original.address === deep.address);
`),
        output(`
Ada
Paris
1
true false
`),
        table(
          ["Technique", "Depth", "Notes"],
          ["`{ ...obj }`, `[...arr]`, `Object.assign`, `slice`", "Shallow", "Fast; what React state updates use"],
          ["`structuredClone(obj)`", "Deep", "Handles dates, maps, sets and cycles; cannot clone functions or DOM nodes"],
          ["`JSON.parse(JSON.stringify(obj))`", "Deep", "Loses `undefined`, functions, dates (become strings), maps and sets"],
        ),
        say(
          "This is the entire reason React state must be updated immutably. React, `memo` and dependency arrays compare with `Object.is`, which for objects compares references. Mutate in place and the reference is unchanged, so as far as React can tell, nothing happened.",
        ),
        js(`
const a = { id: 1 };
const b = { id: 1 };
const c = a;

console.log(a === b, a === c, Object.is(a, b));
console.log([] === [], "x" === "x", NaN === NaN, Object.is(NaN, NaN));
`),
        output(`
false true false
false true false true
`),
      ],
      followUps: [
        {
          q: "When updating nested React state, do you need a deep copy?",
          a: "No, and you should not make one. Copy only the objects along the path you are changing and reuse everything else. That is cheaper, and it keeps the untouched branches reference-equal so memoised components that depend on them do not re-render.",
        },
        {
          q: "Does `const` make an object immutable?",
          a: "No. It prevents reassigning the variable. The object can still be changed. `Object.freeze` prevents changes to its own properties, shallowly.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
    },
    {
      id: "js-equality-coercion",
      question: "What is the difference between `==` and `===`? What does this log?",
      level: "junior",
      short:
        "`===` compares without converting types. `==` converts the operands to a common type first, following rules few people can recite. Use `===` everywhere, with the one accepted exception of `value == null`, which is true for both `null` and `undefined`.",
      body: [
        js(`
console.log(1 + "2");
console.log("3" * "4");
console.log([1, 2] + [3]);
console.log([] == false);
console.log(null == undefined, null === undefined);
console.log(NaN === NaN, Object.is(NaN, NaN));
console.log(0.1 + 0.2 === 0.3);
console.log(typeof null, typeof [], typeof (() => {}));
`),
        output(`
12
12
1,23
true
true false
false true
false
object object function
`),
        list(
          "`+` concatenates if either operand is a string; every other arithmetic operator converts to numbers. Hence `\"12\"` and then `12`.",
          "Arrays convert to strings by joining with commas: `\"1,2\" + \"3\"`.",
          "`[] == false`: the array becomes `\"\"`, which becomes `0`, and `false` becomes `0`.",
          "`NaN` is not equal to anything, including itself. `Number.isNaN` and `Object.is` are how you detect it.",
          "`0.1 + 0.2` is `0.30000000000000004`. Binary floating point cannot represent those decimals exactly; compare with a tolerance, or work in integers (cents).",
          "`typeof null` being `\"object\"` is a bug from JavaScript's first release that can never be fixed. Use `Array.isArray` for arrays.",
        ),
        table(
          ["Falsy values (the complete list)", "Truthy surprises"],
          ["`false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, `NaN`", "`\"0\"`, `\"false\"`, `[]`, `{}`, `new Boolean(false)`"],
        ),
      ],
      followUps: [
        {
          q: "Where does truthiness bite in React?",
          a: "`{count && <List />}` renders `0` when `count` is zero, because `0 && anything` evaluates to `0`, and React renders numbers. Write `count > 0 &&`.",
        },
        {
          q: "`||` or `??` for a default value?",
          a: "`??` falls back only on `null` and `undefined`. `||` falls back on every falsy value, so a legitimate `0` or empty string gets replaced.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness",
    },
    {
      id: "js-hoisting",
      question: "What is hoisting? What is the difference between `var`, `let` and `const`?",
      level: "junior",
      short:
        "Declarations are processed before any code runs, so a name exists throughout its scope. `var` and function declarations are usable from the top (a `var` holds `undefined` until assigned). `let` and `const` exist but cannot be touched until their declaration line; that gap is the temporal dead zone.",
      body: [
        js(`
console.log(typeof hoistedFunction, typeof hoistedVar);

try {
  console.log(notYet);
} catch (error) {
  console.log(error.name);
}

var hoistedVar = 1;
let notYet = 2;
function hoistedFunction() {}
`),
        output(`
function undefined
ReferenceError
`),
        table(
          ["", "`var`", "`let`", "`const`"],
          ["Scope", "Function", "Block", "Block"],
          ["Before its declaration", "`undefined`", "ReferenceError", "ReferenceError"],
          ["Reassign", "Yes", "Yes", "No"],
          ["Redeclare in the same scope", "Yes", "No", "No"],
          ["Creates a property on the global object", "Yes (in scripts)", "No", "No"],
        ),
        list(
          "Default to `const`; use `let` when the variable is reassigned; do not use `var`.",
          "`const` fixes the binding, not the value: `const list = []; list.push(1)` is fine.",
          "Function declarations are hoisted with their body. Function expressions and arrow functions assigned to a variable follow that variable's rules.",
          "Classes are hoisted like `let`: using one before its declaration throws.",
        ),
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
    },
    {
      id: "js-prototypes",
      question: "How does prototypal inheritance work? What does this log?",
      level: "intermediate",
      short:
        "Every object has a hidden link to another object, its prototype. Reading a property that the object does not have follows that link, and the next, until the property is found or the chain ends. Writing never follows the chain: assignment always creates or updates a property on the object itself.",
      body: [
        js(`
const defaults = { theme: "light", tags: ["base"] };
const settings = Object.create(defaults);

settings.theme = "dark"; // a write: creates an own property on settings
settings.tags.push("custom"); // a read, then a mutation of the array that defaults owns

console.log(defaults.theme);
console.log(defaults.tags);
console.log(Object.keys(settings));
console.log(Object.hasOwn(settings, "tags"));
`),
        output(`
light
[ 'base', 'custom' ]
[ 'theme' ]
false
`),
        p(
          "Assigning `settings.theme` shadows the inherited property; `defaults` is untouched. But `settings.tags.push(...)` does not assign to `settings` at all. It looks `tags` up, finds the array on `defaults`, and mutates that shared array.",
        ),
        js(`
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + ": woof";
  }
}

const rex = new Dog("Rex");

console.log(rex.speak());
console.log(Object.getPrototypeOf(rex) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
console.log(Object.hasOwn(rex, "name"), Object.hasOwn(rex, "speak"));
`),
        output(`
Rex makes a sound: woof
true
true
true false
`),
        list(
          "`class` is syntax over this mechanism. Methods live once on `Dog.prototype`; instances hold only their own data.",
          "`extends` links `Dog.prototype` to `Animal.prototype`, so a lookup falls through from one to the other.",
          "`Object.create(proto)` makes an object with the given prototype directly, with no constructor involved.",
        ),
      ],
      followUps: [
        {
          q: "What is the difference between `__proto__` and `prototype`?",
          a: "`prototype` is a property of constructor functions and classes: the object that will become the prototype of instances created with `new`. `__proto__` (properly, `Object.getPrototypeOf(obj)`) is the actual link an object has to its prototype.",
        },
        {
          q: "Why is mutable state on a prototype dangerous?",
          a: "It is shared by every object that inherits from it. One instance pushing to an inherited array changes it for all of them, as the first example shows.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
    },
    {
      id: "js-array-methods",
      question: "Which array methods mutate, and which return a new array? What does this log?",
      level: "junior",
      short:
        "`map`, `filter`, `slice`, `concat`, `flat` and the newer `toSorted`, `toReversed`, `toSpliced` and `with` return a new array. `push`, `pop`, `shift`, `unshift`, `splice`, `sort` and `reverse` change the array in place. Knowing which is which matters in React, where state must not be mutated.",
      body: [
        js(`
const numbers = [3, 1, 10, 2];
const sorted = numbers.sort();

console.log(sorted);
console.log(numbers === sorted);
console.log([3, 1, 10, 2].toSorted((a, b) => a - b));
console.log(["1", "2", "3"].map(parseInt));
console.log([1, 2, 3, 4].reduce((sum, n) => sum + n, 0));
`),
        output(`
[ 1, 10, 2, 3 ]
true
[ 1, 2, 3, 10 ]
[ 1, NaN, NaN ]
10
`),
        list(
          "`sort()` with no comparator converts elements to strings, so `10` sorts before `2`. Always pass `(a, b) => a - b` for numbers.",
          "`sort()` sorts in place and returns the same array. Sorting React state directly mutates it; use `toSorted` or copy first.",
          "`map` calls its callback with `(value, index, array)`. `parseInt` takes `(string, radix)`, so the index is used as the radix: `parseInt(\"2\", 1)` is `NaN`. Use `map(Number)` or an explicit arrow.",
        ),
        table(
          ["Goal", "Method", "Returns"],
          ["Transform each item", "`map`", "A new array of the same length"],
          ["Keep some items", "`filter`", "A new, possibly shorter array"],
          ["Combine into one value", "`reduce`", "Anything"],
          ["Find one item", "`find`, `findLast`", "The item, or `undefined`"],
          ["Test items", "`some`, `every`, `includes`", "A boolean"],
          ["Side effects only", "`forEach`", "`undefined`"],
          ["Flatten after mapping", "`flatMap`", "A new array"],
        ),
      ],
      followUps: [
        {
          q: "Why can you not `break` out of `forEach`?",
          a: "It is a function call per item, not a loop. Use `for...of` when you need `break`, `continue` or `await`, or `some`/`find` when you want to stop at the first match.",
        },
        {
          q: "How do you remove duplicates from an array?",
          a: "`[...new Set(items)]` for primitives. For objects, by key: build a `Map` keyed by ID and take its values.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    },
    {
      id: "js-memory-leaks",
      question: "What causes memory leaks in a React application?",
      level: "senior",
      short:
        "Something long-lived keeps a reference to something that should have been released. In React it is nearly always a subscription, listener or timer created in an effect and never cleaned up, so the callback, and everything its closure captured, outlives the component.",
      body: [
        tsx(
          `
function LivePrice({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://example.com/prices/" + symbol);
    socket.onmessage = (event) => setPrice(Number(event.data));

    const onResize = () => console.log(window.innerWidth);
    window.addEventListener("resize", onResize);

    const id = setInterval(() => socket.send("ping"), 30_000);

    // Without this, every symbol change and every unmount leaves behind an open
    // socket, a window listener and an interval, each holding this closure alive.
    return () => {
      socket.close();
      window.removeEventListener("resize", onResize);
      clearInterval(id);
    };
  }, [symbol]);

  return <output>{price ?? "..."}</output>;
}
`,
          { caption: "Every setup needs a matching cleanup" },
        ),
        table(
          ["Source", "Fix"],
          ["Listeners on `window`, `document` or a long-lived element", "Remove them in the effect's cleanup"],
          ["`setInterval`, `setTimeout`, `requestAnimationFrame`", "Clear or cancel in the cleanup"],
          ["WebSockets, observers, store subscriptions", "Close, disconnect or unsubscribe in the cleanup"],
          ["Requests that resolve after unmount", "Abort them; the callback otherwise holds the component's closure"],
          ["Module-level caches and maps that only grow", "Bound the size, expire entries, or use `WeakMap` keyed by object"],
          ["References to removed DOM nodes", "Drop the reference; avoid storing nodes in global structures"],
          ["Third-party widgets (maps, charts, editors)", "Call their `destroy` method in the cleanup"],
        ),
        list(
          "**Find them** with the browser's Memory panel: take a heap snapshot, repeat the suspect interaction several times (open and close the dialog, navigate back and forth), snapshot again, and compare. Look for detached DOM nodes and counts that grow with each repetition.",
          "**Strict Mode helps:** its mount, unmount, remount cycle makes a missing cleanup visible as duplicated behaviour during development.",
        ),
      ],
      followUps: [
        {
          q: "What is the difference between a `WeakMap` and a `Map` here?",
          a: "A `Map` keeps its keys alive. A `WeakMap` does not: when nothing else references the key object, the entry can be collected. That makes it the right structure for attaching data to objects you do not own.",
        },
      ],
      docs: "https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development",
    },
  ],
};
