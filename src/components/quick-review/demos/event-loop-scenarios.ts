/**
 * Step-by-step traces for the event loop demos: what is on the call stack and
 * in each queue after every step.
 *
 * Written by hand, so each program is also run by `npm run verify:prep`, and
 * what it prints must equal the last step's console. Plain data, no React.
 */

export interface LoopStep {
  /** 1-based lines highlighted in the code. */
  lines: number[];
  note: string;
  /** Bottom of the stack first. */
  stack: string[];
  /** Work handed to the browser (timers, network) or libuv. */
  waiting: string[];
  macrotasks: string[];
  microtasks: string[];
  console: string[];
}

export interface LoopScenario {
  title: string;
  code: string;
  steps: LoopStep[];
}

export type BrowserLoopScenarioId = "sync-async" | "promises" | "async-await";

const step = (lines: number[], note: string, state: Omit<LoopStep, "lines" | "note">): LoopStep => ({ lines, note, ...state });

export const BROWSER_LOOP_SCENARIOS: Record<BrowserLoopScenarioId, LoopScenario> = {
  "sync-async": {
    title: "A 0 ms timer still waits for the microtasks",
    code: `console.log("1 sync");
setTimeout(() => console.log("4 timeout"), 0);
Promise.resolve().then(() => console.log("3 microtask"));
console.log("2 sync");`,
    steps: [
      step([], "The whole script is one task. It goes on the call stack and runs to completion before anything else can.", {
        stack: ["script"], waiting: [], macrotasks: [], microtasks: [], console: [],
      }),
      step([1], "A synchronous call runs immediately.", {
        stack: ["script", "console.log"], waiting: [], macrotasks: [], microtasks: [], console: ["1 sync"],
      }),
      step([2], "`setTimeout` hands the callback to the browser's timer and returns at once. The script carries on.", {
        stack: ["script"], waiting: ["timer (0 ms) → timeout callback"], macrotasks: [], microtasks: [], console: ["1 sync"],
      }),
      step([2], "The timer expires almost immediately, so its callback moves to the task (macrotask) queue. It still has to wait for the stack to empty.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: ["1 sync"],
      }),
      step([3], "The promise is already resolved, so `.then` queues its callback as a **microtask**.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then callback"], console: ["1 sync"],
      }),
      step([4], "The last synchronous line.", {
        stack: ["script", "console.log"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then callback"], console: ["1 sync", "2 sync"],
      }),
      step([3], "The script's task is done and the stack is empty. Before taking the next task, the event loop drains **every** microtask.", {
        stack: ["then callback"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: ["1 sync", "2 sync", "3 microtask"],
      }),
      step([2], "Microtasks are empty (the browser may render here). Now the next task runs: the timer callback.", {
        stack: ["timeout callback"], waiting: [], macrotasks: [], microtasks: [], console: ["1 sync", "2 sync", "3 microtask", "4 timeout"],
      }),
    ],
  },

  promises: {
    title: "Each .then step is its own microtask",
    code: `setTimeout(() => console.log("timeout"), 0);
Promise.resolve()
  .then(() => console.log("then 1"))
  .then(() => console.log("then 2"));
queueMicrotask(() => console.log("microtask"));
console.log("sync");`,
    steps: [
      step([1], "The timer callback will end up in the task queue.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: [],
      }),
      step([2, 3, 4], "Only the **first** `.then` is queued: its promise is already resolved. The second `.then` is attached to the promise the first one returns, which is still pending.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then 1"], console: [],
      }),
      step([5], "`queueMicrotask` adds straight to the microtask queue, behind `then 1`.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then 1", "microtask"], console: [],
      }),
      step([6], "The last synchronous line.", {
        stack: ["script", "console.log"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then 1", "microtask"], console: ["sync"],
      }),
      step([3], "The stack is empty: drain microtasks. `then 1` runs, and its returned promise resolves, which queues `then 2` at the **back** of the queue.", {
        stack: ["then 1"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["microtask", "then 2"], console: ["sync", "then 1"],
      }),
      step([5], "Next in line is the `queueMicrotask` callback, so it overtakes the second `.then`.", {
        stack: ["microtask"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["then 2"], console: ["sync", "then 1", "microtask"],
      }),
      step([4], "The queue is drained completely, including microtasks added while draining.", {
        stack: ["then 2"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: ["sync", "then 1", "microtask", "then 2"],
      }),
      step([1], "Only now does the next task, the timer, get its turn.", {
        stack: ["timeout callback"], waiting: [], macrotasks: [], microtasks: [], console: ["sync", "then 1", "microtask", "then 2", "timeout"],
      }),
    ],
  },

  "async-await": {
    title: "await pauses the function, not the thread",
    code: `async function main() {
  console.log("A: before await");
  await null;
  console.log("C: after await");
}
setTimeout(() => console.log("D: timeout"), 0);
main();
console.log("B: sync, after calling main");`,
    steps: [
      step([6], "The timer callback heads for the task queue.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: [],
      }),
      step([7, 2], "Calling an async function runs its body **synchronously**, up to the first `await`.", {
        stack: ["script", "main"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: ["A: before await"],
      }),
      step([3], "`await` suspends `main`: it leaves the stack, and the rest of its body is queued to resume as a microtask once the awaited value settles. `main()` returns a pending promise.", {
        stack: ["script"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["resume main"], console: ["A: before await"],
      }),
      step([8], "The caller carries on immediately.", {
        stack: ["script", "console.log"], waiting: [], macrotasks: ["timeout callback"], microtasks: ["resume main"], console: ["A: before await", "B: sync, after calling main"],
      }),
      step([4], "The script is done; microtasks run first, so `main` resumes right after the `await`.", {
        stack: ["main (resumed)"], waiting: [], macrotasks: ["timeout callback"], microtasks: [], console: ["A: before await", "B: sync, after calling main", "C: after await"],
      }),
      step([6], "Then the next task: the timer.", {
        stack: ["timeout callback"], waiting: [], macrotasks: [], microtasks: [], console: ["A: before await", "B: sync, after calling main", "C: after await", "D: timeout"],
      }),
    ],
  },
};

// ── Node ────────────────────────────────────────────────────────────────────

export type NodePhase = "main" | "timers" | "pending" | "poll" | "check" | "close";

export const NODE_PHASES: readonly { id: Exclude<NodePhase, "main">; label: string; runs: string }[] = [
  { id: "timers", label: "timers", runs: "setTimeout, setInterval" },
  { id: "pending", label: "pending callbacks", runs: "deferred system I/O" },
  { id: "poll", label: "poll", runs: "I/O callbacks; waits for events" },
  { id: "check", label: "check", runs: "setImmediate" },
  { id: "close", label: "close callbacks", runs: "'close' events" },
];

export interface NodeLoopStep {
  lines: number[];
  note: string;
  phase: NodePhase;
  stack: string[];
  /** libuv's thread pool or the OS. */
  waiting: string[];
  timers: string[];
  immediates: string[];
  nextTicks: string[];
  microtasks: string[];
  console: string[];
}

export interface NodeLoopScenario {
  title: string;
  code: string;
  steps: NodeLoopStep[];
}

export type NodeLoopScenarioId = "inside-io" | "inside-timer";

const nodeStep = (lines: number[], note: string, phase: NodePhase, state: Omit<NodeLoopStep, "lines" | "note" | "phase">): NodeLoopStep => ({
  lines,
  note,
  phase,
  ...state,
});

const empty = { stack: [], waiting: [], timers: [], immediates: [], nextTicks: [], microtasks: [] };

export const NODE_LOOP_SCENARIOS: Record<NodeLoopScenarioId, NodeLoopScenario> = {
  "inside-io": {
    title: "Scheduled from an I/O callback",
    code: `import { readFile } from "node:fs";

readFile("package.json", () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  Promise.resolve().then(() => console.log("promise"));
  console.log("I/O callback");
});`,
    steps: [
      nodeStep([3], "The main module runs first. `readFile` hands the work to libuv's thread pool and returns.", "main", {
        ...empty, stack: ["main module"], waiting: ["read package.json"], console: [],
      }),
      nodeStep([3], "The module is done. The loop starts: no timers are due, so it goes on to **poll** and waits there for I/O.", "poll", {
        ...empty, waiting: ["read package.json"], console: [],
      }),
      nodeStep([3, 4, 5, 6, 7, 8], "The read completes: its callback runs in the poll phase and schedules four things, one of each kind.", "poll", {
        ...empty,
        stack: ["readFile callback"],
        timers: ["timeout"],
        immediates: ["immediate"],
        nextTicks: ["nextTick"],
        microtasks: ["promise"],
        console: ["I/O callback"],
      }),
      nodeStep([6], "Between **every** callback, Node drains the `process.nextTick` queue first...", "poll", {
        ...empty, stack: ["nextTick callback"], timers: ["timeout"], immediates: ["immediate"], microtasks: ["promise"], console: ["I/O callback", "nextTick"],
      }),
      nodeStep([7], "...then the promise microtask queue.", "poll", {
        ...empty, stack: ["then callback"], timers: ["timeout"], immediates: ["immediate"], console: ["I/O callback", "nextTick", "promise"],
      }),
      nodeStep([5], "Poll has nothing more to do and immediates are waiting, so the loop moves on to **check**, which comes before the loop wraps round to timers.", "check", {
        ...empty, stack: ["immediate callback"], timers: ["timeout"], console: ["I/O callback", "nextTick", "promise", "immediate"],
      }),
      nodeStep([4], "Close callbacks (none), then a new turn of the loop begins with **timers**: the 0 ms timeout runs last.", "timers", {
        ...empty, stack: ["timeout callback"], console: ["I/O callback", "nextTick", "promise", "immediate", "timeout"],
      }),
    ],
  },

  "inside-timer": {
    title: "Scheduled from a timer callback",
    code: `setTimeout(() => {
  setImmediate(() => console.log("immediate"));
  setTimeout(() => console.log("timeout 2"), 0);
  Promise.resolve().then(() => console.log("promise"));
  process.nextTick(() => console.log("nextTick"));
}, 0);`,
    steps: [
      nodeStep([1], "The main module schedules one timer and ends.", "main", {
        ...empty, stack: ["main module"], timers: ["outer timeout"], console: [],
      }),
      nodeStep([1, 2, 3, 4, 5], "In the **timers** phase the outer callback runs and schedules four more things.", "timers", {
        ...empty,
        stack: ["outer timeout"],
        timers: ["timeout 2"],
        immediates: ["immediate"],
        nextTicks: ["nextTick"],
        microtasks: ["promise"],
        console: [],
      }),
      nodeStep([5], "nextTick first, even though it was scheduled after the promise.", "timers", {
        ...empty, stack: ["nextTick callback"], timers: ["timeout 2"], immediates: ["immediate"], microtasks: ["promise"], console: ["nextTick"],
      }),
      nodeStep([4], "Then the promise microtasks.", "timers", {
        ...empty, stack: ["then callback"], timers: ["timeout 2"], immediates: ["immediate"], console: ["nextTick", "promise"],
      }),
      nodeStep([2], "The new timer was added during this timers phase, so it waits for the next turn. The loop passes poll and reaches **check**.", "check", {
        ...empty, stack: ["immediate callback"], timers: ["timeout 2"], console: ["nextTick", "promise", "immediate"],
      }),
      nodeStep([3], "Next turn, timers phase: `timeout 2`.", "timers", {
        ...empty, stack: ["timeout 2"], console: ["nextTick", "promise", "immediate", "timeout 2"],
      }),
    ],
  },
};
