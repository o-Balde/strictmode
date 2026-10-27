/**
 * Selector specificity, per Selectors Level 4. Plain data in, plain data out,
 * so it can be tested without a browser.
 *
 * - IDs count in A; classes, attributes and pseudo-classes in B; type
 *   selectors and pseudo-elements in C. `*` and combinators count nothing.
 * - `:where()` counts nothing. `:is()`, `:not()` and `:has()` count as their
 *   most specific argument. `:nth-child(An+B of S)` is one pseudo-class plus
 *   the most specific selector in S.
 */

export type Specificity = [number, number, number];

export interface Part {
  text: string;
  column: "A" | "B" | "C" | "none";
}

export interface Breakdown {
  specificity: Specificity;
  parts: Part[];
}

const LEGACY_PSEUDO_ELEMENTS = new Set(["before", "after", "first-line", "first-letter"]);
const MAX_OF_ARGUMENTS = new Set(["is", "not", "has", "matches", "-webkit-any", "-moz-any"]);
const NTH_OF = new Set(["nth-child", "nth-last-child"]);

const add = (a: Specificity, b: Specificity): Specificity => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export function compareSpecificity(a: Specificity, b: Specificity): number {
  for (let column = 0; column < 3; column++) if (a[column] !== b[column]) return a[column] - b[column];
  return 0;
}

const max = (list: Specificity[]): Specificity => list.reduce((best, current) => (compareSpecificity(current, best) > 0 ? current : best), [0, 0, 0]);

/** Splits on commas that are not inside parentheses or brackets. */
export function splitList(selector: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < selector.length; index++) {
    const char = selector[index];
    if (char === "(" || char === "[") depth += 1;
    else if (char === ")" || char === "]") depth -= 1;
    else if (char === "," && depth === 0) {
      out.push(selector.slice(start, index).trim());
      start = index + 1;
    }
  }
  out.push(selector.slice(start).trim());
  return out.filter(Boolean);
}

/** The argument of a functional pseudo-class starting at `open` (the index of its "("). */
function readArgument(selector: string, open: number): { argument: string; end: number } {
  let depth = 0;
  for (let index = open; index < selector.length; index++) {
    if (selector[index] === "(") depth += 1;
    else if (selector[index] === ")") {
      depth -= 1;
      if (depth === 0) return { argument: selector.slice(open + 1, index), end: index + 1 };
    }
  }
  return { argument: selector.slice(open + 1), end: selector.length };
}

const IDENT = /^-?[_a-zA-Z -￿][-\w -￿]*|^\\./;

function readIdent(selector: string, from: number): string {
  let end = from;
  while (end < selector.length) {
    const rest = selector.slice(end);
    if (rest.startsWith("\\")) {
      end += 2;
      continue;
    }
    const match = /^[-\w -￿]+/.exec(rest);
    if (!match) break;
    end += match[0].length;
  }
  return selector.slice(from, end);
}

/** Specificity of one complex selector (no top-level commas). */
export function specificityOf(selector: string): Breakdown {
  const parts: Part[] = [];
  let total: Specificity = [0, 0, 0];
  let index = 0;
  const push = (text: string, column: Part["column"], value: Specificity) => {
    parts.push({ text, column });
    total = add(total, value);
  };

  while (index < selector.length) {
    const char = selector[index];
    if (/[\s>+~]/.test(char)) {
      index += 1;
      continue;
    }
    if (char === "*") {
      push("*", "none", [0, 0, 0]);
      index += 1;
    } else if (char === "#") {
      const name = readIdent(selector, index + 1);
      push(`#${name}`, "A", [1, 0, 0]);
      index += 1 + name.length;
    } else if (char === ".") {
      const name = readIdent(selector, index + 1);
      push(`.${name}`, "B", [0, 1, 0]);
      index += 1 + name.length;
    } else if (char === "[") {
      const end = selector.indexOf("]", index);
      const text = selector.slice(index, end === -1 ? selector.length : end + 1);
      push(text, "B", [0, 1, 0]);
      index += text.length;
    } else if (char === ":") {
      const isElement = selector[index + 1] === ":";
      const nameStart = index + (isElement ? 2 : 1);
      const name = readIdent(selector, nameStart).toLowerCase();
      let next = nameStart + name.length;
      let argument: string | null = null;
      if (selector[next] === "(") {
        const read = readArgument(selector, next);
        argument = read.argument;
        next = read.end;
      }
      const text = selector.slice(index, next);
      if (isElement || LEGACY_PSEUDO_ELEMENTS.has(name)) {
        push(text, "C", [0, 0, 1]);
      } else if (name === "where") {
        push(text, "none", [0, 0, 0]);
      } else if (MAX_OF_ARGUMENTS.has(name) && argument !== null) {
        const best = max(splitList(argument).map((inner) => specificityOf(inner).specificity));
        push(text, best[0] ? "A" : best[1] ? "B" : best[2] ? "C" : "none", best);
      } else if (NTH_OF.has(name) && argument !== null && / of /i.test(argument)) {
        const list = argument.slice(argument.toLowerCase().indexOf(" of ") + 4);
        push(text, "B", add([0, 1, 0], max(splitList(list).map((inner) => specificityOf(inner).specificity))));
      } else {
        push(text, "B", [0, 1, 0]);
      }
      index = next;
    } else if (IDENT.test(selector.slice(index))) {
      const name = readIdent(selector, index);
      push(name, "C", [0, 0, 1]);
      index += name.length;
    } else {
      index += 1;
    }
  }
  return { specificity: total, parts };
}
