import { js, list, output, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_ASYNC: ReviewSection = {
  id: "js-async",
  topic: "javascript",
  title: "Asynchronous JavaScript",
  blurb: "One thread, an event loop, and three generations of async code: callbacks, promises and async/await.",
  questions: [
    {
      id: "sync-vs-async",
      question: "What is the difference between synchronous and asynchronous code in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Synchronous code runs line by line on the one main thread, and each line finishes before the next starts. Asynchronous work (timers, network, file I/O, user events) is started, and its callback runs later, once the current code has finished and the call stack is empty. Promise callbacks (microtasks) run before the next timer or event (macrotask).",
      body: [
        js(`
console.log("1 sync");
setTimeout(() => console.log("4 timeout"), 0);
Promise.resolve().then(() => console.log("3 microtask"));
console.log("2 sync");
`),
        output(`
1 sync
2 sync
3 microtask
4 timeout
`),
        list(
          "**The call stack** runs synchronous code to completion. Nothing interrupts it.",
          "**Web APIs / libuv** do the waiting (timers, sockets, disk) outside the JavaScript thread.",
          "**The task queue** (macrotasks) holds callbacks from timers, events and I/O.",
          "**The microtask queue** holds promise reactions and `queueMicrotask` callbacks. It is drained completely after every task, before rendering and before the next task.",
        ),
        trap("A long synchronous loop blocks everything: clicks, rendering, timers. Async code does not make work faster; it lets the thread do other things while waiting. CPU-heavy work belongs in a Web Worker."),
      ],
      demo: { id: "event-loop-sync-async", hint: "Step through: the timer waits in the task queue even with a 0 ms delay." },
      goodToHear: ["Single thread, run to completion", "The event loop", "Microtasks before macrotasks", "Blocking vs non-blocking", "`setTimeout(fn, 0)` is not immediate"],
      links: [
        { title: "MDN: JavaScript execution model", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model" },
        { title: "Jake Archibald: Tasks, microtasks, queues and schedules", url: "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" },
      ],
    },
    {
      id: "callbacks",
      question: "What is a callback? Can you show an example using one?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "A callback is a function passed to another function, to be called by it later. Some run synchronously (`array.map(fn)`, `sort(compare)`), others asynchronously when something happens (`addEventListener`, `setTimeout`, Node's `fs.readFile`). Callbacks were the original way to handle async results; promises are built on them.",
      body: [
        js(`
const numbers = [1, 2, 3];
console.log(numbers.map((n) => n * 10));

function fetchUser(id, onDone) {
  setTimeout(() => onDone({ id, name: "Ada" }), 10);
}
fetchUser(1, (user) => console.log("loaded", user.name));
console.log("requested");
`),
        output(`
[ 10, 20, 30 ]
requested
loaded Ada
`),
        list(
          "**Inversion of control**: you hand your code to someone else, who decides when, how often and with what to call it.",
          "**Errors** cannot be caught with a surrounding `try/catch` once the callback runs later; conventions like Node's error-first callbacks fill the gap.",
          "**Nesting** dependent steps leads to the \"pyramid of doom\". Promises and `async`/`await` flatten it.",
        ),
      ],
      goodToHear: ["Function passed as an argument", "Synchronous and asynchronous callbacks", "Higher-order functions", "Inversion of control", "Error handling and nesting problems"],
      links: [{ title: "MDN: Callback function", url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function" }],
    },
    {
      id: "promises",
      question: "What are Promises?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "A Promise is an object standing for the eventual result of an asynchronous operation. It starts pending and settles once, either fulfilled with a value or rejected with a reason. You react with `.then`, `.catch` and `.finally`; each returns a new promise, so steps chain, and a thrown error skips ahead to the next `.catch`.",
      body: [
        js(`
const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

wait(20, 2)
  .then((n) => n * 10)
  .then((n) => {
    throw new Error("too big: " + n);
  })
  .catch((error) => console.log("caught", error.message))
  .finally(() => console.log("done"));

const results = await Promise.allSettled([wait(5, "ok"), Promise.reject(new Error("no"))]);
console.log(results.map((result) => result.status));
`),
        output(`
[ 'fulfilled', 'rejected' ]
caught too big: 20
done
`),
        table(
          ["Combinator", "Fulfils when", "Rejects when"],
          ["`Promise.all`", "all fulfil (array of values)", "the first one rejects"],
          ["`Promise.allSettled`", "all settle (array of outcomes)", "never"],
          ["`Promise.race`", "the first one fulfils", "the first one rejects"],
          ["`Promise.any`", "the first one fulfils", "all reject (`AggregateError`)"],
        ),
        list(
          "Handlers always run asynchronously, as microtasks, even on an already-resolved promise.",
          "Returning a promise from `.then` waits for it, which is what makes chains flat.",
          "A rejection with no handler surfaces as an `unhandledrejection` event (and crashes Node by default).",
        ),
      ],
      demo: { id: "event-loop-promises", hint: "Each `.then` queues the next step as a microtask: count how many steps run before the timer." },
      goodToHear: ["Placeholder for a future value", "Pending, fulfilled, rejected", "Chaining returns new promises", "Error propagation to `.catch`", "Combinators", "Microtask timing"],
      links: [
        { title: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
        { title: "MDN: Promise", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" },
      ],
    },
    {
      id: "promise-states",
      question: "In which states can a Promise be?",
      topics: ["javascript"],
      level: "junior",
      short:
        "Three: **pending** (not settled yet), **fulfilled** (it has a value) and **rejected** (it has a reason, usually an `Error`). Fulfilled and rejected together are called **settled**, and a promise settles only once: later `resolve` or `reject` calls are ignored.",
      body: [
        js(`
const p = new Promise((resolve, reject) => {
  resolve("first");
  reject(new Error("ignored"));
  resolve("ignored too");
});
p.then((value) => console.log(value));

const pending = new Promise(() => {});
console.log(Promise.resolve(pending) === pending);
`),
        output(`
true
first
`),
        list(
          "\"Settled\" is a description, not a fourth state.",
          "\"Resolved\" is not the same as \"fulfilled\": a promise resolved with another promise follows it and may still be pending, or end up rejected.",
          "There is no synchronous way to read a promise's state. You find out by attaching a handler.",
        ),
      ],
      demo: { id: "promise-lab", hint: "Resolve, then try to reject the same promise: the state never changes twice." },
      goodToHear: ["Pending, fulfilled, rejected", "Settled = fulfilled or rejected", "Settles exactly once", "Resolved vs fulfilled"],
      links: [{ title: "MDN: Promise, description", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description" }],
    },
    {
      id: "async-functions",
      question: "What is an `async` function?",
      prompt: [
        js(`
async function foo() {
  // ...
}
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "A function that always returns a promise and can use `await` inside. Returning a value fulfils that promise, throwing rejects it. `await` pauses the function (not the thread) until the awaited promise settles, then resumes it as a microtask, so asynchronous code reads like synchronous code, with ordinary `try/catch`.",
      body: [
        js(`
async function getValue() {
  return 42;
}
console.log(getValue() instanceof Promise);

async function main() {
  console.log("before await");
  const value = await getValue();
  console.log("after await", value);
}
main();
console.log("main returned");
`),
        output(`
true
before await
main returned
after await 42
`),
        js(`
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const task = async (name) => {
  await wait(50);
  return name;
};

let start = Date.now();
await task("a");
await task("b");
const sequential = Date.now() - start;

start = Date.now();
await Promise.all([task("a"), task("b")]);
const parallel = Date.now() - start;
console.log(sequential >= 90, parallel < 90);
`, { caption: "Sequential awaits add up; Promise.all runs them together" }),
        output(`true true`),
        trap("`await` in a loop runs the iterations one after another. When the steps don't depend on each other, start them all and `await Promise.all(...)`."),
      ],
      demo: { id: "event-loop-async-await", hint: "Watch `main` leave the call stack at `await` and come back later as a microtask." },
      goodToHear: ["Always returns a promise", "`await` pauses the function, not the thread", "`try/catch` for rejections", "Sequential vs parallel awaits", "Syntax over promises"],
      links: [
        { title: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
        { title: "MDN: await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await" },
      ],
    },
    {
      id: "event-driven-programming",
      question: "What is event-driven programming?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A style where the program's flow is driven by events (clicks, messages, timers, I/O completing) rather than a fixed sequence. Code registers handlers for event types, and an emitter calls every handler subscribed to an event when it happens. The browser's DOM events and Node's `EventEmitter` are both built this way; it keeps the sender and the receivers decoupled.",
      body: [
        js(`
function createEmitter() {
  const handlers = new Map();
  return {
    on(type, handler) {
      if (!handlers.has(type)) handlers.set(type, new Set());
      handlers.get(type).add(handler);
      return () => handlers.get(type).delete(handler);
    },
    emit(type, payload) {
      for (const handler of handlers.get(type) ?? []) handler(payload);
    },
  };
}
const hub = createEmitter();
const off = hub.on("message", (text) => console.log("A got", text));
hub.on("message", (text) => console.log("B got", text));
hub.emit("message", "hi");
off();
hub.emit("message", "bye");
hub.emit("nobody-listens", "...");
`),
        output(`
A got hi
B got hi
B got bye
`),
        list(
          "**Publish/subscribe**: the emitter doesn't know who is listening, and emitting with no listeners is not an error.",
          "**Unsubscribe**: returning an `off` function (as `addEventListener` pairs with `removeEventListener`) is what lets components clean up and avoid leaks.",
          "**In the browser**: `new CustomEvent(\"cart:add\", { detail })` with `dispatchEvent` gives the same pattern on DOM nodes or an `EventTarget`.",
        ),
      ],
      demo: { id: "event-emitter", hint: "Subscribe a few listeners, emit, then unsubscribe one and emit again." },
      goodToHear: ["Flow driven by events", "Emitters and handlers (pub/sub)", "Decoupling", "Unsubscribe to avoid leaks", "DOM events and Node EventEmitter"],
      links: [
        { title: "MDN: Introduction to events", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events" },
        { title: "Node.js: Events", url: "https://nodejs.org/api/events.html" },
      ],
    },
    {
      id: "debouncing",
      question: "What is debouncing?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Delaying a function until calls to it have stopped for a set time. Every call resets the timer, so a burst of calls produces one run, after the burst. It is the standard fix for search-as-you-type, autosave and resize handlers. Throttling is the cousin: run at most once per interval, even during the burst.",
      body: [
        js(`
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const search = debounce((query) => console.log("search", query), 50);
search("r");
search("re");
search("react");
setTimeout(() => search("vue"), 100);
`),
        output(`
search react
search vue
`),
        tsx(`
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
`, { caption: "The React version: the effect cleanup is the clearTimeout" }),
        table(
          ["Technique", "A burst of 20 calls in 1 s", "Use for"],
          ["Debounce (trailing)", "1 run, after the burst", "search input, autosave, resize end"],
          ["Debounce (leading)", "1 run, at the start", "preventing double submits"],
          ["Throttle", "about 1 run per interval", "scroll position, drag, mousemove"],
        ),
        say("Debouncing a search box also needs the latest request to win: the debounce reduces requests, it doesn't stop an old response from arriving last."),
      ],
      demo: { id: "debounce-throttle", hint: "Move the pointer over the pad in bursts and compare the three lanes." },
      goodToHear: ["Wait until calls stop", "Reset the timer on each call", "Search inputs and resize", "Debounce vs throttle", "Leading vs trailing edge"],
      links: [{ title: "CSS-Tricks: Debouncing and throttling explained", url: "https://css-tricks.com/debouncing-throttling-explained-examples/" }],
    },
  ],
};
