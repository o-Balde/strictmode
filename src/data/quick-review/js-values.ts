import { js, jsx, list, output, p, say, table, trap } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_VALUES: ReviewSection = {
  id: "js-values",
  topic: "javascript",
  title: "Types, values and equality",
  blurb: "The eight types, how they convert, and the comparisons that trip people up: the questions that open most JavaScript screens.",
  questions: [
    {
      id: "types",
      question: "What are JavaScript data types?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Eight: seven primitives (`string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`) and `object`. Arrays, functions, dates, maps and class instances are all objects. Primitives are immutable and compared by value; objects are mutable and compared by reference.",
      body: [
        table(
          ["Type", "Example", "`typeof`"],
          ["string", "`\"hi\"`", "`\"string\"`"],
          ["number", "`42`, `3.14`, `NaN`, `Infinity`", "`\"number\"`"],
          ["bigint", "`10n`", "`\"bigint\"`"],
          ["boolean", "`true`", "`\"boolean\"`"],
          ["undefined", "`undefined`", "`\"undefined\"`"],
          ["symbol", "`Symbol(\"id\")`", "`\"symbol\"`"],
          ["null", "`null`", "`\"object\"` (a historical bug)"],
          ["object", "`{}`, `[]`, `new Date()`", "`\"object\"`, or `\"function\"` for functions"],
        ),
        js(`
const values = ["hi", 42, 10n, true, undefined, Symbol("id"), null, {}, [], () => {}];
for (const value of values) console.log(typeof value);
`),
        output(`
string
number
bigint
boolean
undefined
symbol
object
object
object
function
`),
        p("A primitive has no methods of its own. `\"hi\".length` works because the engine wraps the string in a temporary `String` object for the property access (autoboxing), then throws the wrapper away."),
        trap("`typeof []` and `typeof null` are both `\"object\"`. Use `Array.isArray(value)` for arrays and `value === null` for null."),
      ],
      demo: { id: "value-inspector", hint: "Pick values and compare `typeof` with what `Object.prototype.toString` reports." },
      goodToHear: [
        "Seven primitives plus `object`",
        "`typeof null === \"object\"` is a legacy bug",
        "Primitives are immutable and compared by value",
        "Arrays and functions are objects",
        "Autoboxing explains methods on primitives",
      ],
      links: [
        { title: "MDN: JavaScript data types and data structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures" },
      ],
    },
    {
      id: "typeof-typeof",
      question: "What does `typeof typeof 0` evaluate to?",
      prompt: [js(`typeof typeof 0`)],
      topics: ["javascript"],
      level: "intermediate",
      short: "`\"string\"`. `typeof 0` is the string `\"number\"`, and the `typeof` of any string is `\"string\"`. Because `typeof` always returns a string, any chain of two or more is `\"string\"`.",
      body: [
        p("Unary operators apply right to left, so the inner `typeof` runs first."),
        js(`
console.log(typeof 0);
console.log(typeof typeof 0);
console.log(typeof typeof typeof undefined);
`),
        output(`
number
string
string
`),
        p("`typeof` is also the one safe way to probe a variable that may not be declared at all: `typeof notDeclared` is `\"undefined\"` instead of a `ReferenceError`. The exception is a `let` or `const` still in its temporal dead zone, which throws."),
      ],
      goodToHear: ["`typeof` returns a string", "Evaluates right to left", "Safe on undeclared variables, except in the TDZ"],
      links: [{ title: "MDN: typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" }],
    },
    {
      id: "null-vs-undefined",
      question: "What is the difference between `null` and `undefined`?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`undefined` means no value has been assigned: an unset variable, a missing property or argument, a function with no `return`. `null` is a value your code assigns on purpose to say \"empty\". They are loosely equal (`==`) but not strictly equal (`===`).",
      body: [
        js(`
let notSet;
const user = { name: "Ada", nickname: null };
console.log(notSet, user.age, user.nickname);
console.log(null == undefined, null === undefined);
console.log(JSON.stringify({ a: undefined, b: null }));
const greet = (name = "friend") => "hi " + name;
console.log(greet(undefined), greet(null));
`),
        output(`
undefined undefined null
true false
{"b":null}
hi friend hi null
`),
        list(
          "Default parameters and destructuring defaults apply to `undefined` only, not to `null`.",
          "`JSON.stringify` drops properties whose value is `undefined` and keeps `null`. An API that wants to clear a field needs `null`.",
          "`??` and `?.` treat both as \"nullish\". `value == null` is the one idiomatic use of `==`: it is true for exactly these two.",
          "`typeof undefined` is `\"undefined\"`; `typeof null` is `\"object\"`.",
        ),
      ],
      demo: { id: "value-inspector", hint: "Compare how `null` and `undefined` behave in each column." },
      goodToHear: [
        "`undefined`: not assigned; `null`: intentionally empty",
        "`null == undefined` but `null !== undefined`",
        "Defaults only kick in for `undefined`",
        "JSON keeps `null`, drops `undefined`",
      ],
      links: [
        { title: "MDN: null", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null" },
        { title: "MDN: undefined", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined" },
      ],
    },
    {
      id: "nan",
      question: "What is the only value not equal to itself in JavaScript?",
      topics: ["javascript"],
      level: "senior",
      short:
        "`NaN`. IEEE 754 defines NaN as unequal to everything, itself included, so `NaN === NaN` is `false`. Test for it with `Number.isNaN(x)` or `Object.is(x, NaN)`, never with `===`.",
      body: [
        js(`
console.log(NaN === NaN);
console.log(Number.isNaN(NaN), Number.isNaN("abc"));
console.log(isNaN("abc"));
console.log(Object.is(NaN, NaN));
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));
console.log(typeof NaN);
`),
        output(`
false
true false
true
true
true -1
number
`),
        list(
          "The global `isNaN` converts its argument to a number first, so `isNaN(\"abc\")` is `true`. `Number.isNaN` does not convert.",
          "`includes`, `Set` and `Map` use SameValueZero, which finds `NaN`; `indexOf` uses `===`, which cannot.",
          "NaN comes from failed numeric conversions (`Number(\"abc\")`, `parseInt(\"x\")`) and undefined maths (`0 / 0`, `Math.sqrt(-1)`).",
        ),
        trap("The self-inequality is a usable test: `x !== x` is true only for `NaN`. It works, but `Number.isNaN` says what it means."),
      ],
      goodToHear: ["`NaN !== NaN`", "`Number.isNaN` vs global `isNaN`", "`Object.is` and `includes` find it", "`typeof NaN` is `\"number\"`"],
      links: [{ title: "MDN: NaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN" }],
    },
    {
      id: "falsy-truthy",
      question: "What are truthy and falsy values in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "A value is falsy if it converts to `false` in a boolean context. The list is short: `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined` and `NaN`. Everything else is truthy, including `\"0\"`, `\"false\"`, `[]` and `{}`.",
      body: [
        js(`
const falsy = [false, 0, -0, 0n, "", null, undefined, NaN];
console.log(falsy.every((value) => !value));
const surprising = ["0", "false", " ", [], {}, () => {}];
console.log(surprising.every((value) => Boolean(value)));
`),
        output(`
true
true
`),
        p("Boolean contexts are `if`, `while`, the ternary, `!`, `&&` and `||`. `Boolean(value)` and `!!value` make the conversion explicit."),
        trap("`if (count)` treats a real `0` like a missing value, and `name || \"Anonymous\"` replaces an intentional empty string. When `0` or `\"\"` are valid, test for `null`/`undefined` explicitly or use `??`."),
      ],
      demo: { id: "value-inspector", hint: "The truthy column flips for exactly eight values. Find them all." },
      goodToHear: ["The eight falsy values", "Empty arrays and objects are truthy", "`\"0\"` and `\"false\"` are truthy strings", "Prefer `??` when 0 or \"\" are valid"],
      links: [
        { title: "MDN: Falsy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Falsy" },
        { title: "MDN: Truthy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Truthy" },
      ],
    },
    {
      id: "double-vs-triple-equals",
      question: "What is the difference between the equality operators `==` and `===`?",
      topics: ["javascript"],
      level: "junior",
      short:
        "`===` (strict equality) compares type and value with no conversion. `==` (loose equality) first converts the operands to a common type by a fixed set of rules, which produces surprises like `\"0\" == false`. Use `===`; the one common exception is `x == null`, which matches both `null` and `undefined`.",
      body: [
        js(`
console.log(0 == "", "0" == false, [] == false);
console.log(null == 0, null == undefined, NaN == NaN);
console.log("1" === 1, 1 === 1);
`),
        output(`
true true true
false true false
false true
`),
        table(
          ["Comparison", "What `==` does", "Result"],
          ["`\"0\" == false`", "booleans become numbers (`0`); `\"0\"` becomes `0`", "`true`"],
          ["`[] == false`", "`false` → `0`; `[]` → `\"\"` → `0`", "`true`"],
          ["`null == 0`", "`null` only loosely equals `undefined`", "`false`"],
          ["`{} == {}`", "two objects: compared by reference, no conversion", "`false`"],
        ),
        p("`Object.is` is a third comparison: like `===`, except `Object.is(NaN, NaN)` is `true` and `Object.is(0, -0)` is `false`. React uses it to decide whether state changed."),
        say("I default to `===`, and use `== null` on purpose when I mean \"null or undefined\"."),
      ],
      demo: { id: "equality-table", hint: "Switch between `==` and `===` and look at how much of the grid lights up." },
      goodToHear: ["`===` never converts types", "`==` follows the abstract equality algorithm", "`x == null` idiom", "Objects compare by reference either way", "`Object.is` for NaN and -0"],
      links: [
        { title: "MDN: Equality comparisons and sameness", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness" },
      ],
    },
    {
      id: "reference-example",
      question: "What is the output of the following code?",
      prompt: [
        js(`
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = "1,2,3";

console.log(a == c);
console.log(a == b);
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`true`, then `false`. In `a == c`, an object meets a string, so the array is converted to a primitive: `\"1,2,3\"`, equal to `c`. In `a == b`, both sides are objects, so there is no conversion and they are compared by reference: two different arrays.",
      body: [
        js(`
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(String(a));
console.log(a == "1,2,3", a == b, a === a);
const sameItems = a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
console.log(sameItems);
`),
        output(`
1,2,3
true false true
true
`),
        p("To compare contents, compare element by element (as above), or deeply for nested data. `JSON.stringify(a) === JSON.stringify(b)` works for plain data but is order-sensitive for objects and loses `undefined`, functions and `NaN`."),
      ],
      goodToHear: ["Object vs primitive: the object is converted with `toString`", "Object vs object: reference comparison", "How to compare arrays by content"],
      links: [{ title: "MDN: Equality (==)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality" }],
    },
    {
      id: "floating-point",
      question: "What does `0.1 + 0.2 === 0.3` evaluate to?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`false`. Numbers are IEEE 754 doubles, stored in binary, and 0.1, 0.2 and 0.3 have no exact binary representation. The rounding errors don't cancel: the sum is `0.30000000000000004`. Compare with a tolerance, or keep money in integer cents.",
      body: [
        js(`
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log((0.1).toPrecision(21));
const nearlyEqual = (x, y) => Math.abs(x - y) <= Number.EPSILON * Math.max(Math.abs(x), Math.abs(y));
console.log(nearlyEqual(0.1 + 0.2, 0.3));
console.log((10 + 20) / 100 === 0.3);
`),
        output(`
0.30000000000000004
false
0.100000000000000005551
true
true
`),
        list(
          "The same happens in every language that uses binary floating point: Python, Java, C#.",
          "For display, round: `(0.1 + 0.2).toFixed(2)` or `Intl.NumberFormat`. For money, store integer cents (or use `BigInt`), and format at the edge.",
          "Integers are exact up to `Number.MAX_SAFE_INTEGER` (2^53 − 1). Past that, use `BigInt`.",
        ),
      ],
      demo: { id: "float-bits", hint: "Type 0.1, then 0.3: look at the exact decimal value each one actually stores." },
      goodToHear: ["IEEE 754 binary64", "0.1 has no exact binary form", "Compare with a relative epsilon", "Integer cents for money", "MAX_SAFE_INTEGER and BigInt"],
      links: [
        { title: "MDN: Number.EPSILON", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON" },
        { title: "What Every Programmer Should Know About Floating-Point", url: "https://floating-point-gui.de/" },
      ],
    },
    {
      id: "short-circuit-evaluation",
      question: "What is short-circuit evaluation in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`&&`, `||` and `??` stop evaluating as soon as the result is known, and return one of their operands, not necessarily a boolean. `a && b` returns `a` if it is falsy, otherwise `b`. `a || b` returns `a` if it is truthy, otherwise `b`. `a ?? b` returns `b` only when `a` is `null` or `undefined`.",
      body: [
        js(`
const log = (label, value) => {
  console.log("evaluated " + label);
  return value;
};
console.log(log("a", 0) && log("b", 1));
console.log(log("c", 0) || log("d", "fallback"));
console.log(0 ?? "fallback", null ?? "fallback");
`),
        output(`
evaluated a
0
evaluated c
evaluated d
fallback
0 fallback
`),
        list(
          "Guards: `user && user.name`, today usually `user?.name`.",
          "Defaults: `options.retries ?? 3` keeps a deliberate `0`; `options.retries || 3` would replace it.",
          "Conditional calls: `onClose && onClose()`, or `onClose?.()`.",
          "Logical assignment: `cache[key] ??= compute()` only computes when the entry is missing.",
        ),
        trap("`a ?? b || c` is a syntax error: `??` cannot be mixed with `&&` or `||` without parentheses."),
      ],
      demo: { id: "short-circuit", hint: "Change the left operand and watch whether the right side runs at all." },
      goodToHear: ["Returns an operand, not a boolean", "Right side may never run", "`??` vs `||` for defaults", "Optional chaining is related short-circuiting"],
      links: [
        { title: "MDN: Logical AND (&&)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND" },
        { title: "MDN: Nullish coalescing (??)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" },
      ],
    },
    {
      id: "postfix-vs-prefix-increment",
      question: "What is the difference between the postfix `i++` and prefix `++i` increment operators?",
      topics: ["javascript"],
      level: "junior",
      short:
        "Both add 1 to the variable. They differ in the value of the expression: `i++` evaluates to the value **before** the increment, `++i` to the value **after**. The difference only matters when the result is used.",
      body: [
        js(`
let i = 0;
const a = i++;
console.log(a, i);
let j = 0;
const b = ++j;
console.log(b, j);
`),
        output(`
0 1
1 1
`),
        p("In a `for` loop's update clause the value is thrown away, so `i++` and `++i` behave the same. In an expression like `arr[i++] = x`, the old index is used and then `i` moves on."),
        trap("`count++` inside a React state setter (`setCount(count++)`) passes the old value **and** mutates a local variable. Write `setCount((c) => c + 1)`."),
      ],
      demo: { id: "stepper-increment", hint: "Step through and compare the value of each expression with the variable." },
      goodToHear: ["Same side effect, different expression value", "Postfix returns the old value", "Irrelevant when the value is discarded"],
      links: [{ title: "MDN: Increment (++)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment" }],
    },
    {
      id: "expression-vs-statement",
      question: "What is the difference between an expression and a statement in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "An expression produces a value: `1 + 2`, `user.name`, `fn()`, `a ? b : c`. A statement performs an action and produces no value you can use: `if`, `for`, `return`, a `let` declaration. Rule of thumb: if you can assign it to a variable or pass it as an argument, it is an expression.",
      body: [
        js(`
const max = (a, b) => (a > b ? a : b);
let label;
if (max(2, 3) > 2) {
  label = "big";
} else {
  label = "small";
}
const sameLabel = max(2, 3) > 2 ? "big" : "small";
console.log(label === sameLabel);
`),
        output(`true`),
        list(
          "An **expression statement** is an expression used where a statement is expected: `fn();` or `x = 1;`.",
          "A **function declaration** is a statement and is hoisted; a **function expression** (`const f = function () {}`) is a value and follows its variable's rules.",
          "JSX braces accept expressions only. That is why conditional rendering uses `&&` and `? :` rather than `if`.",
          "An arrow function's concise body is an expression; a body with braces is a block of statements and needs `return`.",
        ),
        jsx(
          `
// Does not compile: if is a statement, and braces in JSX take an expression.
<p>{if (done) { "Done" }}</p>

// Compiles: the ternary is an expression.
<p>{done ? "Done" : "Pending"}</p>
`,
          { caption: "Why JSX needs expressions", tone: "bad" },
        ),
      ],
      goodToHear: ["Expressions produce values; statements perform actions", "Expression statements", "Function declarations vs expressions", "JSX braces take expressions"],
      links: [{ title: "MDN: Expressions and operators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators" }],
    },
    {
      id: "semicolons",
      question: "Are semicolons required in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Not strictly. Automatic semicolon insertion (ASI) adds them at line breaks where the next token cannot continue the statement. But ASI does not insert one before a line that starts with `(`, `[` or a template literal, and it does insert one right after `return`. Pick a style and let a formatter enforce it.",
      body: [
        js(`
const a = 1
try {
  const b = a
  [1, 2].forEach((n) => console.log(n))
} catch (error) {
  console.log(error.constructor.name)
}
`, { caption: "No semicolon after `a`: the next line continues the expression" }),
        output(`TypeError`),
        p("The engine reads `a\\n[1, 2].forEach(...)` as `a[1, 2].forEach(...)`: the comma operator makes that `a[2]`, which is `undefined`, and calling `forEach` on it throws. A leading `;` before such lines (the no-semicolon style's rule) or semicolons everywhere both prevent it."),
        list(
          "Lines starting with `(`, `[`, a template literal, `+`, `-` or `/` are the hazards.",
          "`return`, `throw`, `break`, `continue`, `yield` and postfix `++`/`--` are \"restricted productions\": a line break after them ends the statement.",
          "Prettier with `semi: false` inserts the protective leading semicolons for you.",
        ),
      ],
      goodToHear: ["ASI exists and is specified", "Hazards: lines starting with `(`, `[` or a template literal", "`return` followed by a newline", "Consistency via a formatter"],
      links: [
        { title: "MDN: Automatic semicolon insertion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion" },
      ],
    },
    {
      id: "return-semicolon",
      question: "What does the following function return?",
      prompt: [
        js(`
function greet() {
  return
  {
    message: "hello"
  }
}
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`undefined`. A line break directly after `return` ends the statement, so ASI turns it into `return;`. The object literal below becomes an unreachable block containing a label (`message:`) and a string expression.",
      body: [
        js(`
function greet() {
  return
  {
    message: "hello"
  }
}
function greetFixed() {
  return {
    message: "hello",
  };
}
console.log(greet());
console.log(greetFixed());
`),
        output(`
undefined
{ message: 'hello' }
`),
        p("Keep the opening brace (or parenthesis) on the same line as `return`. This is one reason JavaScript style guides put braces at the end of the line, not on the next one. Multi-line JSX is wrapped in `return (` for the same reason."),
      ],
      goodToHear: ["ASI after `return`", "The braces become a block with a label", "Brace on the same line"],
      links: [{ title: "MDN: return, automatic semicolon insertion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#automatic_semicolon_insertion" }],
    },
    {
      id: "use-strict",
      question: "What does `\"use strict\"` do and what are some of the key benefits to using it?",
      topics: ["javascript"],
      level: "senior",
      short:
        "It opts a script or a function into strict mode, which turns silent mistakes into errors and removes some confusing features. ES modules and class bodies are strict automatically, so in modern code you rarely type it.",
      body: [
        list(
          "Assigning to an undeclared variable throws a `ReferenceError` instead of creating a global.",
          "Writing to a read-only or non-writable property, or adding to a frozen object, throws a `TypeError` instead of failing silently.",
          "`this` is `undefined` in a plain function call, instead of the global object.",
          "`with`, octal literals like `010`, duplicate parameter names and `delete` on a plain variable are syntax errors.",
          "Words reserved for the future (`implements`, `interface`, `package`, ...) cannot be identifiers.",
        ),
        js(`
// ES modules are strict, so this file runs in strict mode.
try {
  undeclared = 1;
} catch (error) {
  console.log(error.name);
}
const frozen = Object.freeze({ count: 1 });
try {
  frozen.count = 2;
} catch (error) {
  console.log(error.name);
}
function whoAmI() {
  return this;
}
console.log(whoAmI());
`),
        output(`
ReferenceError
TypeError
undefined
`),
        p("In a non-strict (\"sloppy\") script, the first assignment would silently create a global, the second would be ignored, and `whoAmI()` would return the global object."),
        trap("`\"use strict\"` must be the first statement of the script or function. Concatenating a strict file with a sloppy one can switch the whole bundle's mode, which is one reason bundlers emit modules."),
      ],
      goodToHear: ["Silent errors become thrown errors", "No accidental globals", "`this` is undefined in plain calls", "Modules and classes are strict by default"],
      links: [{ title: "MDN: Strict mode", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" }],
    },
  ],
};
