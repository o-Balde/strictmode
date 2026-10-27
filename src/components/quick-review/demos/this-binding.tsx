"use client";

/**
 * One function, called nine ways. Each call really runs in this browser (in
 * a module, so strict mode), and the panel reports what `this` was.
 */
import { useState } from "react";
import { cn } from "@lib";
import { CodeView, DemoButton } from "./ui";

interface Named {
  name: string;
}

const user = {
  name: "user",
  whoAmI(this: unknown) {
    return this;
  },
  later(this: Named) {
    return [1].map(() => this)[0];
  },
  // Written at module level: an ES module's top-level `this` is undefined.
  arrow: () => this,
};

const other = { name: "other" };

let constructed: unknown;
class Wrapper {
  name = "a new object";
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- capturing `this` is what the demo shows
    constructed = this;
  }
}

class Counter {
  name = "counter instance";
  regular() {
    return this;
  }
  bound = () => this;
}

type Call = {
  id: string;
  label: string;
  code: string;
  run: () => unknown | Promise<unknown>;
  rule: string;
};

const element = typeof document === "undefined" ? null : document.createElement("button");
if (element) element.dataset.name = "the <button> element";

const CALLS: Call[] = [
  { id: "method", label: "method call", code: "user.whoAmI()", run: () => user.whoAmI(), rule: "Called as a method, `this` is the object before the dot." },
  {
    id: "detached",
    label: "detached method",
    code: "const f = user.whoAmI;\nf()",
    run: () => {
      const f = user.whoAmI;
      return f();
    },
    rule: "A plain call has no object: `this` is undefined in strict code (the global object in sloppy scripts).",
  },
  { id: "call", label: "call()", code: "user.whoAmI.call(other)", run: () => user.whoAmI.call(other), rule: "`call` and `apply` set `this` explicitly for one call." },
  {
    id: "bind",
    label: "bind()",
    code: "const g = user.whoAmI.bind(other);\ng.call(user)",
    run: () => user.whoAmI.bind(other).call(user),
    rule: "A bound function ignores later attempts: `call(user)` cannot override `bind(other)`.",
  },
  {
    id: "new",
    label: "new",
    code: "new Wrapper() // this, inside the constructor",
    run: () => {
      new Wrapper();
      return constructed;
    },
    rule: "With `new`, `this` is the freshly created object.",
  },
  {
    id: "callback",
    label: "as a callback",
    code: "[1].map(user.whoAmI)",
    run: () => [1].map(user.whoAmI)[0],
    rule: "Passing the method passes the function alone: it is called plainly, so `this` is undefined.",
  },
  {
    id: "listener",
    label: "event listener",
    code: 'button.addEventListener("click", user.whoAmI)',
    run: () => {
      let seen: unknown;
      if (!element) return undefined;
      const listener = function (this: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias -- capturing `this` is what the demo shows
        seen = this;
      };
      element.addEventListener("click", listener);
      element.click();
      element.removeEventListener("click", listener);
      return seen;
    },
    rule: "A non-arrow listener added with `addEventListener` gets the element as `this` (the event's `currentTarget`).",
  },
  {
    id: "arrow",
    label: "arrow function",
    code: "user.arrow()",
    run: () => user.arrow(),
    rule: "Arrows have no `this` of their own. This one was written at module level, where `this` is undefined, and calling it as a method doesn't change that.",
  },
  {
    id: "arrow-inside",
    label: "arrow inside a method",
    code: "user.later() // [1].map(() => this)",
    run: () => user.later(),
    rule: "An arrow inside a method borrows the method's `this`, which is why arrows fix callbacks.",
  },
  {
    id: "class-field",
    label: "class field arrow",
    code: "const { bound } = new Counter();\nbound()",
    run: () => {
      const { bound } = new Counter();
      return bound();
    },
    rule: "An arrow class field captures the instance when it is created, so it survives being detached.",
  },
  {
    id: "class-method",
    label: "detached class method",
    code: "const { regular } = new Counter();\nregular()",
    run: () => {
      const { regular } = new Counter();
      return regular();
    },
    rule: "Class bodies are always strict: a detached method gets `this === undefined`. This is the classic React class bug.",
  },
];

function describe(value: unknown): { text: string; tone: string } {
  if (value === undefined) return { text: "undefined", tone: "text-rust" };
  if (value === globalThis) return { text: "globalThis (window)", tone: "text-peach" };
  if (value === user) return { text: "user", tone: "text-mint-soft" };
  if (value === other) return { text: "other", tone: "text-binary-soft" };
  if (value === element) return { text: "the <button> element", tone: "text-clay" };
  if (value instanceof Counter) return { text: "the Counter instance", tone: "text-mint-soft" };
  if (typeof value === "object" && value !== null && "name" in value) return { text: `{ name: "${String((value as Named).name)}" }`, tone: "text-salmon" };
  return { text: String(value), tone: "text-bone" };
}

export function ThisBinding() {
  const [selected, setSelected] = useState<Call>(CALLS[0]);
  const [result, setResult] = useState<unknown>(() => CALLS[0].run());

  function choose(call: Call) {
    setSelected(call);
    setResult(call.run());
  }

  const description = describe(result);

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
      <div className="flex flex-wrap gap-1.5 md:flex-col">
        {CALLS.map((call) => (
          <DemoButton
            key={call.id}
            onClick={() => choose(call)}
            aria-pressed={call.id === selected.id}
            className={cn("justify-start", call.id === selected.id && "border-flame text-paper")}
          >
            {call.label}
          </DemoButton>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <CodeView
          code={`const user = {\n  name: "user",\n  whoAmI() { return this; },\n};\n\n${selected.code}`}
          active={[6, 7].slice(0, selected.code.split("\n").length)}
        />
        <div className="border-line-3 bg-surface rounded-lg border p-3.5" aria-live="polite">
          <div className="text-ash text-[12px]">this was</div>
          <div className={cn("font-mono text-[17px] font-semibold", description.tone)}>{description.text}</div>
          <p className="text-bone m-0 mt-2 text-[13px]/[1.6]">{renderRule(selected.rule)}</p>
        </div>
      </div>
    </div>
  );
}

/** The rules use the page's `code` markers; render them without pulling in the full parser. */
function renderRule(text: string) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="prep-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
