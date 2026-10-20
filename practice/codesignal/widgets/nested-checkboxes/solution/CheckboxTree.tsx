import { useEffect, useRef, useState } from "react";
import type { TreeNode } from "../tree";

/**
 * NESTED CHECKBOXES: reference solution.
 *
 * Only leaves are state. A parent's checked / indeterminate look is derived
 * from its leaves on every render, so it can never disagree with them, and
 * clicking a parent is "set all my leaves". `indeterminate` exists only as a
 * DOM property (there is no HTML attribute for it), hence the ref.
 */
export interface CheckboxTreeProps {
  nodes: TreeNode[];
}

type Mark = "checked" | "unchecked" | "mixed";

export function CheckboxTree({ nodes }: CheckboxTreeProps) {
  const [checkedLeaves, setCheckedLeaves] = useState<ReadonlySet<string>>(() => new Set());

  function toggle(node: TreeNode) {
    const leaves = leavesOf(node);
    const allChecked = leaves.every((id) => checkedLeaves.has(id));
    setCheckedLeaves((current) => {
      const next = new Set(current);
      for (const id of leaves) {
        if (allChecked) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }

  return <Branch nodes={nodes} checkedLeaves={checkedLeaves} onToggle={toggle} />;
}

interface BranchProps {
  nodes: TreeNode[];
  checkedLeaves: ReadonlySet<string>;
  onToggle: (node: TreeNode) => void;
}

function Branch({ nodes, checkedLeaves, onToggle }: BranchProps) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <Checkbox
            label={node.label}
            mark={markOf(node, checkedLeaves)}
            onToggle={() => onToggle(node)}
          />
          {node.children?.length ? (
            <Branch nodes={node.children} checkedLeaves={checkedLeaves} onToggle={onToggle} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

interface CheckboxProps {
  label: string;
  mark: Mark;
  onToggle: () => void;
}

function Checkbox({ label, mark, onToggle }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = mark === "mixed";
  }, [mark]);

  return (
    <label>
      <input
        ref={ref}
        type="checkbox"
        checked={mark === "checked"}
        aria-checked={mark === "mixed" ? "mixed" : mark === "checked"}
        onChange={onToggle}
      />{" "}
      {label}
    </label>
  );
}

function leavesOf(node: TreeNode): string[] {
  return node.children?.length ? node.children.flatMap(leavesOf) : [node.id];
}

function markOf(node: TreeNode, checkedLeaves: ReadonlySet<string>): Mark {
  const leaves = leavesOf(node);
  const checked = leaves.filter((id) => checkedLeaves.has(id)).length;
  if (checked === 0) return "unchecked";
  return checked === leaves.length ? "checked" : "mixed";
}
