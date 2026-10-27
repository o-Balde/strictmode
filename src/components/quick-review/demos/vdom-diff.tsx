"use client";

/**
 * A small model of React's reconciliation: diff two virtual trees and list
 * the DOM operations that would follow. It implements the two rules that
 * matter in interviews: a different element type replaces the subtree, and
 * children are matched by key (or by position without one), with React's
 * "last placed index" rule deciding what moves.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, Panel } from "./ui";

interface VNode {
  type: string;
  key?: string;
  props?: Record<string, string>;
  children?: Child[];
}
type Child = VNode | string;

type Status = "same" | "updated" | "inserted" | "removed" | "moved";
interface Op {
  kind: "text" | "prop" | "insert" | "remove" | "move" | "replace";
  text: string;
}

interface Context {
  ops: Op[];
  oldStatus: Map<string, Status>;
  newStatus: Map<string, Status>;
}

const describe = (child: Child) => (typeof child === "string" ? `"${child}"` : `<${child.type}${child.key ? ` key="${child.key}"` : ""}>`);

function mark(child: Child, path: string, map: Map<string, Status>, status: Status) {
  map.set(path, status);
  if (typeof child !== "string") child.children?.forEach((grandchild, index) => mark(grandchild, `${path}.${index}`, map, status));
}

const sameType = (a: Child, b: Child) =>
  typeof a === "string" ? typeof b === "string" : typeof b !== "string" && a.type === b.type;

function reconcile(previous: Child, next: Child, oldPath: string, newPath: string, ctx: Context) {
  if (typeof previous === "string" && typeof next === "string") {
    const changed = previous !== next;
    if (changed) ctx.ops.push({ kind: "text", text: `set text ${describe(previous)} → ${describe(next)}` });
    ctx.oldStatus.set(oldPath, changed ? "updated" : "same");
    ctx.newStatus.set(newPath, changed ? "updated" : "same");
    return;
  }
  if (!sameType(previous, next) || typeof previous === "string" || typeof next === "string") {
    ctx.ops.push({ kind: "replace", text: `replace ${describe(previous)} with ${describe(next)}: the old subtree and its state are destroyed` });
    mark(previous, oldPath, ctx.oldStatus, "removed");
    mark(next, newPath, ctx.newStatus, "inserted");
    return;
  }
  let changed = false;
  const before = previous.props ?? {};
  const after = next.props ?? {};
  for (const name of new Set([...Object.keys(before), ...Object.keys(after)])) {
    if (before[name] === after[name]) continue;
    changed = true;
    ctx.ops.push({ kind: "prop", text: after[name] === undefined ? `remove ${name} from <${next.type}>` : `set ${name}="${after[name]}" on <${next.type}>` });
  }
  ctx.oldStatus.set(oldPath, changed ? "updated" : "same");
  ctx.newStatus.set(newPath, changed ? "updated" : "same");
  reconcileChildren(previous.children ?? [], next.children ?? [], oldPath, newPath, ctx);
}

function reconcileChildren(oldKids: Child[], newKids: Child[], oldPath: string, newPath: string, ctx: Context) {
  const keyOf = (child: Child, index: number) => (typeof child !== "string" && child.key !== undefined ? `key:${child.key}` : `index:${index}`);
  const byKey = new Map(oldKids.map((child, index) => [keyOf(child, index), { child, index }]));
  const used = new Set<string>();
  let lastPlaced = 0;

  newKids.forEach((child, newIndex) => {
    const key = keyOf(child, newIndex);
    const match = byKey.get(key);
    const childNewPath = `${newPath}.${newIndex}`;
    if (!match) {
      ctx.ops.push({ kind: "insert", text: `insert ${describe(child)} at position ${newIndex}` });
      mark(child, childNewPath, ctx.newStatus, "inserted");
      return;
    }
    used.add(key);
    const childOldPath = `${oldPath}.${match.index}`;
    if (!sameType(match.child, child)) {
      reconcile(match.child, child, childOldPath, childNewPath, ctx);
      return;
    }
    const moved = match.index < lastPlaced;
    lastPlaced = Math.max(lastPlaced, match.index);
    reconcile(match.child, child, childOldPath, childNewPath, ctx);
    if (moved) {
      ctx.ops.push({ kind: "move", text: `move ${describe(child)} to position ${newIndex}` });
      ctx.newStatus.set(childNewPath, "moved");
      ctx.oldStatus.set(childOldPath, "moved");
    }
  });

  oldKids.forEach((child, index) => {
    if (used.has(keyOf(child, index))) return;
    ctx.ops.push({ kind: "remove", text: `remove ${describe(child)}` });
    mark(child, `${oldPath}.${index}`, ctx.oldStatus, "removed");
  });
}

function diff(previous: VNode, next: VNode) {
  const ctx: Context = { ops: [], oldStatus: new Map(), newStatus: new Map() };
  reconcile(previous, next, "0", "0", ctx);
  return ctx;
}

const li = (text: string, key?: string): VNode => ({ type: "li", key, children: [text] });

const SCENARIOS: { id: string; label: string; note: string; before: VNode; after: VNode }[] = [
  {
    id: "text",
    label: "change one item's text",
    note: "Same types, same positions: React keeps every node and changes one text.",
    before: { type: "ul", children: [li("Milk"), li("Eggs")] },
    after: { type: "ul", children: [li("Milk"), li("Bread")] },
  },
  {
    id: "append",
    label: "append, no keys",
    note: "Appending is cheap even without keys: the existing positions still line up.",
    before: { type: "ul", children: [li("Milk"), li("Eggs")] },
    after: { type: "ul", children: [li("Milk"), li("Eggs"), li("Bread")] },
  },
  {
    id: "prepend-index",
    label: "prepend, keys = index",
    note: "Matched by position, every item now gets a neighbour's text, and the last one looks new. Any state in the rows stays at its old position.",
    before: { type: "ul", children: [li("Milk", "0"), li("Eggs", "1")] },
    after: { type: "ul", children: [li("Bread", "0"), li("Milk", "1"), li("Eggs", "2")] },
  },
  {
    id: "prepend-keys",
    label: "prepend, keys = id",
    note: "Matched by id, the existing items are untouched and one node is inserted at the front.",
    before: { type: "ul", children: [li("Milk", "milk"), li("Eggs", "eggs")] },
    after: { type: "ul", children: [li("Bread", "bread"), li("Milk", "milk"), li("Eggs", "eggs")] },
  },
  {
    id: "reorder",
    label: "reverse, keys = id",
    note: "With keys, reordering is moves, never re-creation. React walks the new order and moves any node that appears before one it already placed.",
    before: { type: "ul", children: [li("A", "a"), li("B", "b"), li("C", "c")] },
    after: { type: "ul", children: [li("C", "c"), li("B", "b"), li("A", "a")] },
  },
  {
    id: "type",
    label: "change the wrapper type",
    note: "A different element type means a different subtree: the whole thing is rebuilt, and the Counter inside loses its state.",
    before: { type: "div", props: { className: "panel" }, children: [{ type: "Counter", props: { count: "3" } }] },
    after: { type: "section", props: { className: "panel" }, children: [{ type: "Counter", props: { count: "3" } }] },
  },
  {
    id: "props",
    label: "change an attribute",
    note: "Same type: the DOM node is kept and only the changed attribute is written.",
    before: { type: "button", props: { className: "primary", disabled: "false" }, children: ["Save"] },
    after: { type: "button", props: { className: "primary", disabled: "true" }, children: ["Save"] },
  },
];

const STATUS_TONE: Record<Status, string> = {
  same: "text-stone",
  updated: "bg-binary-deep text-binary-soft",
  inserted: "bg-mint-deep text-mint-soft",
  removed: "bg-rust-bg text-rust line-through",
  moved: "bg-flame-deep text-peach",
};

const OP_TONE: Record<Op["kind"], string> = {
  text: "text-binary-soft",
  prop: "text-binary-soft",
  insert: "text-mint-soft",
  remove: "text-rust",
  move: "text-peach",
  replace: "text-rust",
};

function Tree({ node, path, status }: Readonly<{ node: Child; path: string; status: Map<string, Status> }>) {
  const state = status.get(path) ?? "same";
  if (typeof node === "string") {
    return <li className={cn("w-fit rounded px-1", STATUS_TONE[state])}>&quot;{node}&quot;</li>;
  }
  const props = Object.entries(node.props ?? {})
    .map(([name, value]) => ` ${name}="${value}"`)
    .join("");
  return (
    <li>
      <span className={cn("w-fit rounded px-1", STATUS_TONE[state])}>
        &lt;{node.type}
        {node.key !== undefined ? <span className="text-clay"> key=&quot;{node.key}&quot;</span> : null}
        {props}&gt;
      </span>
      {node.children?.length ? (
        <ul className="border-line-3 m-0 ml-3 list-none border-l pl-3">
          {node.children.map((child, index) => (
            <Tree key={index} node={child} path={`${path}.${index}`} status={status} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function VdomDiff() {
  const [id, setId] = useState(SCENARIOS[3].id);
  const scenario = SCENARIOS.find((candidate) => candidate.id === id) ?? SCENARIOS[0];
  const result = useMemo(() => diff(scenario.before, scenario.after), [scenario]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Change to apply">
        {SCENARIOS.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            aria-pressed={candidate.id === id}
            onClick={() => setId(candidate.id)}
            className={cn(
              "rounded-md border px-2.5 py-1.5 text-[12px] transition-colors",
              candidate.id === id ? "border-flame bg-flame text-ink" : "border-line-2 text-stone hover:text-bone",
            )}
          >
            {candidate.label}
          </button>
        ))}
      </div>
      <p className="text-bone m-0 text-[13px]/[1.6]">{scenario.note}</p>
      <div className="grid gap-3 md:grid-cols-3">
        <Panel title="previous render">
          <ul className="m-0 list-none p-0 font-mono text-[12px]/[1.8]">
            <Tree node={scenario.before} path="0" status={result.oldStatus} />
          </ul>
        </Panel>
        <Panel title="next render">
          <ul className="m-0 list-none p-0 font-mono text-[12px]/[1.8]">
            <Tree node={scenario.after} path="0" status={result.newStatus} />
          </ul>
        </Panel>
        <Panel title={`DOM operations (${result.ops.length})`}>
          {result.ops.length === 0 ? (
            <p className="text-slate m-0 font-mono text-[12px]">none: nothing changed</p>
          ) : (
            <ol className="m-0 flex list-decimal flex-col gap-1 pl-5 font-mono text-[11.5px]/[1.6]">
              {result.ops.map((op, index) => (
                <li key={index} className={OP_TONE[op.kind]}>
                  {op.text}
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {(Object.keys(STATUS_TONE) as Status[]).map((status) => (
          <span key={status} className={cn(DEMO_LABEL, "normal-case")}>
            <span className={cn("rounded px-1", STATUS_TONE[status])}>{status}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
