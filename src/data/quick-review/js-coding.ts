import { js, list, output, p, table, trap } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_CODING: ReviewSection = {
  id: "js-coding",
  topic: "javascript",
  title: "Coding challenges",
  blurb: "Small functions to write on the spot, plus the vocabulary for talking about how fast they are.",
  questions: [
    {
      id: "batches",
      question: "Create a function `batches` that returns the maximum number of whole batches that can be cooked from a recipe.",
      prompt: [
        js(`
/**
 * batches(recipe, available)
 * Both arguments map an ingredient to a number of units.
 */

// 0 batches can be made
batches({ milk: 100, butter: 50, flour: 5 }, { milk: 132, butter: 48, flour: 51 });
batches({ milk: 100, flour: 4, sugar: 10, butter: 5 }, { milk: 1288, flour: 9, sugar: 95 });

// 1 batch can be made
batches({ milk: 100, butter: 50, cheese: 10 }, { milk: 198, butter: 52, cheese: 10 });

// 2 batches can be made
batches({ milk: 2, sugar: 40, butter: 20 }, { milk: 5, sugar: 120, butter: 500 });
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "For every ingredient in the recipe, the number of batches it allows is `Math.floor(available / required)`, and 0 when it is missing. The answer is the smallest of those numbers: the scarcest ingredient decides.",
      body: [
        js(`
const batches = (recipe, available) =>
  Math.min(
    ...Object.entries(recipe).map(([ingredient, required]) =>
      Math.floor((available[ingredient] ?? 0) / required),
    ),
  );

console.log(batches({ milk: 100, butter: 50, flour: 5 }, { milk: 132, butter: 48, flour: 51 }));
console.log(batches({ milk: 100, flour: 4, sugar: 10, butter: 5 }, { milk: 1288, flour: 9, sugar: 95 }));
console.log(batches({ milk: 100, butter: 50, cheese: 10 }, { milk: 198, butter: 52, cheese: 10 }));
console.log(batches({ milk: 2, sugar: 40, butter: 20 }, { milk: 5, sugar: 120, butter: 500 }));
`),
        output(`
0
0
1
2
`),
        list(
          "Iterate the **recipe**, not the pantry: extra ingredients in `available` don't matter, missing ones do.",
          "`?? 0` turns a missing ingredient into 0 batches. Without it, `undefined / 5` is `NaN` and `Math.min` returns `NaN`.",
          "Edge case to mention: an empty recipe gives `Math.min()` = `Infinity`. Decide what that should mean and say so.",
          "It is O(r) for r recipe ingredients. Spreading into `Math.min` is fine here; for very large arrays, `reduce` avoids argument-count limits.",
        ),
      ],
      demo: { id: "function-lab-batches", hint: "Edit the pantry and see which ingredient becomes the bottleneck." },
      goodToHear: ["Ratio per ingredient, floored", "Minimum across ingredients", "Missing ingredient → 0", "Edge cases: empty recipe, NaN"],
      links: [{ title: "MDN: Math.min()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min" }],
    },
    {
      id: "mask",
      question: "Create a function that masks a string of characters with `#` except for the last four (4) characters.",
      prompt: [js(`mask("123456789"); // "#####6789"`)],
      topics: ["javascript"],
      level: "intermediate",
      short: "Take the last four characters with `slice(-4)` and pad them back to the original length with `padStart(length, \"#\")`. Strings of four characters or fewer come back unchanged.",
      body: [
        js(`
const mask = (text, maskChar = "#") => text.slice(-4).padStart(text.length, maskChar);

console.log(mask("123456789"));
console.log(mask("4111111111111111"));
console.log(mask("abc"));
console.log(mask(""));
`),
        output(`
#####6789
############1111
abc
`),
        p("The last call returns an empty string. One subtlety worth raising: `length` and `slice` count UTF-16 code units, so emoji and some accented characters count as two. Splitting into code points with `[...text]` fixes that."),
        js(`
const maskCodePoints = (text, maskChar = "#") => {
  const chars = [...text];
  return maskChar.repeat(Math.max(0, chars.length - 4)) + chars.slice(-4).join("");
};
console.log(maskCodePoints("ab🙂cdef"));
`),
        output(`###cdef`),
      ],
      demo: { id: "function-lab-mask", hint: "Try short strings, the empty string, and an emoji." },
      goodToHear: ["`slice(-4)` + `padStart`", "Short strings unchanged", "Unicode code units vs code points", "One-liner but explain it"],
      links: [{ title: "MDN: String.prototype.padStart", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" }],
    },
    {
      id: "fibonacci",
      question: "Generate an array, containing the Fibonacci sequence, up until the nth term.",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Start from 0 and 1, and make each next term the sum of the previous two, until the array has n terms. A loop does it in O(n) time; the naive recursive definition is O(2^n) and is the classic reason to memoize.",
      body: [
        js(`
function fibonacci(n) {
  const sequence = [];
  for (let i = 0; i < n; i++) {
    sequence.push(i < 2 ? i : sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}
console.log(fibonacci(10).join(" "));
console.log(fibonacci(1), fibonacci(0));
`),
        output(`
0 1 1 2 3 5 8 13 21 34
[ 0 ] []
`),
        list(
          "Clarify the start: some definitions begin at 1, 1. Ask, or state your assumption.",
          "Handle `n` of 0 and 1 without special cases by building up from an empty array, as above.",
          "Terms pass `Number.MAX_SAFE_INTEGER` at the 79th; use `BigInt` (`0n`, `1n`) for exact large terms.",
        ),
        js(`
const fibonacciBig = (n) => {
  const sequence = [0n, 1n].slice(0, n);
  while (sequence.length < n) sequence.push(sequence.at(-1) + sequence.at(-2));
  return sequence;
};
console.log(String(fibonacciBig(100).at(-1)));
`),
        output(`218922995834555169026`),
      ],
      demo: { id: "recursion-tree", hint: "Compare the loop's n steps with the naive recursion's call count." },
      goodToHear: ["Iterative O(n) solution", "Base terms and edge cases", "Naive recursion is exponential", "BigInt for large terms"],
      links: [{ title: "MDN: BigInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" }],
    },
    {
      id: "find-the-anagrams",
      question: "Given an array of words, write a method to output matching sets of anagrams.",
      prompt: [js(`const words = ["rates", "rat", "stare", "taser", "tears", "art", "tabs", "tar", "bats", "state"];`)],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Anagrams share the same letters, so they share the same letters **sorted**. Use the sorted word as a key in a `Map`, push each word into its key's group, and keep the groups with more than one word.",
      body: [
        js(`
const words = ["rates", "rat", "stare", "taser", "tears", "art", "tabs", "tar", "bats", "state"];

function anagramGroups(list) {
  const groups = new Map();
  for (const word of list) {
    const key = [...word.toLowerCase()].sort().join("");
    groups.set(key, [...(groups.get(key) ?? []), word]);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

for (const group of anagramGroups(words)) console.log(group.join(","));
`),
        output(`
rates,stare,taser,tears
rat,art,tar
tabs,bats
`),
        list(
          "Complexity: O(n · k log k) for n words of length k, because of the sort per word.",
          "A letter-count key (`a1e1r1s1t1`) avoids sorting and makes it O(n · k).",
          "`Object.groupBy(words, keyFn)` (ES2024) does the grouping in one call.",
          "`state` is left out: it has no partner.",
        ),
      ],
      demo: { id: "function-lab-anagrams", hint: "Add your own words and see which key each one gets." },
      goodToHear: ["Canonical key: sorted letters", "Group with a Map or object", "Filter groups of size > 1", "Complexity and the counting alternative"],
      links: [{ title: "MDN: Object.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy" }],
    },
    {
      id: "big-o-notation",
      question: "What is Big O Notation?",
      topics: ["javascript"],
      level: "senior",
      short:
        "A way to describe how an algorithm's running time (or memory) grows as its input grows, keeping only the dominant term and dropping constants. O(n) means doubling the input roughly doubles the work; O(n²) means it quadruples it. It describes scalability, usually for the worst case, not the speed on a given input.",
      body: [
        table(
          ["Big O", "Name", "JavaScript example"],
          ["O(1)", "constant", "`arr[i]`, `map.get(key)`, `set.has(x)` (average)"],
          ["O(log n)", "logarithmic", "binary search over a sorted array"],
          ["O(n)", "linear", "`arr.includes(x)`, `arr.map(fn)`, one loop"],
          ["O(n log n)", "linearithmic", "`arr.sort()`"],
          ["O(n²)", "quadratic", "a loop inside a loop over the same array"],
          ["O(2ⁿ)", "exponential", "naive recursive Fibonacci, all subsets"],
        ),
        js(`
const hasDuplicateQuadratic = (items) =>
  items.some((item, i) => items.some((other, j) => i !== j && item === other));
const hasDuplicateLinear = (items) => new Set(items).size !== items.length;

const data = Array.from({ length: 5000 }, (_, i) => i);
console.log(hasDuplicateQuadratic(data), hasDuplicateLinear(data));
`, { caption: "Same answer: about 25 million comparisons versus 5,000 insertions" }),
        output(`false false`),
        list(
          "**Drop constants and smaller terms**: 3n² + 10n + 7 is O(n²).",
          "**Space complexity** counts extra memory the same way: the `Set` version trades O(n) memory for time.",
          "**Big O is an upper bound**; Big Θ is a tight bound and Big Ω a lower bound. In interviews, \"Big O\" usually means the tight worst case.",
        ),
        trap("For small inputs, constants dominate: a simple O(n²) loop over 20 items can beat a clever O(n log n) solution. Big O says what happens as n gets large."),
      ],
      demo: { id: "big-o-chart", hint: "Drag n up and switch to the log scale to see how far apart the curves really are." },
      goodToHear: ["Growth rate relative to input size", "Worst case, dominant term, no constants", "Common classes with examples", "Time vs space", "Practical limits of the notation"],
      links: [{ title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" }],
    },
  ],
};
