export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export const GROCERIES: TreeNode[] = [
  {
    id: "fruit",
    label: "Fruit",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      {
        id: "citrus",
        label: "Citrus",
        children: [
          { id: "lemon", label: "Lemon" },
          { id: "orange", label: "Orange" },
        ],
      },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "pea", label: "Pea" },
    ],
  },
];
