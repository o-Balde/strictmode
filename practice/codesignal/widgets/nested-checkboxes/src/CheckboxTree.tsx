import type { TreeNode } from "../tree";

/**
 * NESTED CHECKBOXES: your workspace. Spec on the prep page; run it with
 *   npm run level -- nested-checkboxes
 */
export interface CheckboxTreeProps {
  nodes: TreeNode[];
}

export function CheckboxTree({ nodes }: CheckboxTreeProps) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <label>
            <input type="checkbox" /> {node.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
