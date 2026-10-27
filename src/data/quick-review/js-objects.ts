import { js, list, output, p, say, table, trap } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_OBJECTS: ReviewSection = {
  id: "js-objects",
  topic: "javascript",
  title: "Objects, this and prototypes",
  blurb: "How objects are made, how they inherit, what `this` points at, and what copying and comparing an object really does.",
  questions: [
    {
      id: "object-creation",
      question: "Describe the different ways to create an object. When should certain ways be preferred over others?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "An object literal for one-off data; a `class` (or a constructor function with `new`) when you need many instances sharing methods; a factory function when you want privacy through closures and no `new`; `Object.create(proto)` to pick the prototype explicitly, including `Object.create(null)` for a bare dictionary (though a `Map` is usually better).",
      body: [
        js(`
const literal = { name: "Ada" };

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return "Hi, " + this.name;
  }
}
const fromClass = new Person("Grace");

function createPerson(name) {
  return { greet: () => "Hi, " + name };
}
const fromFactory = createPerson("Linus");

const proto = { greet() { return "Hi, " + this.name; } };
const fromCreate = Object.create(proto);
fromCreate.name = "Barbara";

const dictionary = Object.create(null);
console.log(literal.name, fromClass.greet(), fromFactory.greet(), fromCreate.greet());
console.log("toString" in literal, "toString" in dictionary);
`),
        output(`
Ada Hi, Grace Hi, Linus Hi, Barbara
true false
`),
        table(
          ["Way", "Methods live", "Use it for"],
          ["Literal `{}`", "on the object", "config, data, return values"],
          ["`class` / `new F()`", "once, on the prototype", "many instances, `instanceof`, inheritance"],
          ["Factory function", "per object (closures)", "private state, composition, no `this`"],
          ["`Object.create(p)`", "on the prototype you pass", "explicit delegation, null-prototype maps"],
        ),
        p("Others worth naming: `Object.fromEntries(pairs)`, `structuredClone(obj)` and spread copies (`{ ...base, extra: 1 }`)."),
      ],
      goodToHear: ["Literal, class/constructor, factory, `Object.create`", "Shared methods on the prototype save memory", "Factories give privacy without `this`", "`Object.create(null)` has no inherited keys"],
      links: [{ title: "MDN: Working with objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects" }],
    },
    {
      id: "this",
      question: "What is the `this` keyword and how does it work?",
      topics: ["javascript"],
      level: "senior",
      short:
        "`this` is decided by how a function is **called**, not where it is defined. Called as `obj.method()`, it is `obj`. Called with `new`, it is the new object. With `call`, `apply` or `bind`, it is what you pass. Called plainly, it is `undefined` in strict code (the global object in sloppy code). Arrow functions have no `this` of their own and use the surrounding one.",
      body: [
        js(`
const user = {
  name: "Ada",
  regular() {
    return this?.name;
  },
  arrow: () => typeof this,
  later() {
    return [1].map(() => this.name);
  },
};
const detached = user.regular;
console.log(user.regular());
console.log(detached());
console.log(detached.call({ name: "Grace" }));
console.log(user.arrow());
console.log(user.later());
function Person(name) {
  this.name = name;
}
console.log(new Person("Linus").name);
`),
        output(`
Ada
undefined
Grace
undefined
[ 'Ada' ]
Linus
`),
        table(
          ["Call", "`this`"],
          ["`new Fn()`", "the newly created object"],
          ["`fn.call(x)`, `fn.apply(x)`, `fn.bind(x)()`", "`x`"],
          ["`obj.fn()`", "`obj`"],
          ["`fn()`", "`undefined` (strict) / `globalThis` (sloppy)"],
          ["arrow function", "the `this` of the enclosing scope"],
          ["`el.addEventListener(\"click\", fn)`", "`el` (the `currentTarget`)"],
        ),
        p("The rows are in order of precedence: `new` beats `bind`, which beats a method call, which beats the default. `user.arrow` returns `\"undefined\"` because the arrow's surrounding scope is the module, whose `this` is `undefined`; `later` works because the arrow inside it borrows the method's `this`."),
        trap("Passing a method as a callback (`button.addEventListener(\"click\", obj.save)`, `setTimeout(obj.save)`) detaches it from `obj`. Bind it, or wrap it: `() => obj.save()`."),
      ],
      demo: { id: "this-binding", hint: "Run the same function under each call style and read what `this` became." },
      goodToHear: ["Determined at call time", "The four binding rules and their precedence", "Arrow functions are lexical", "Lost `this` in callbacks", "Strict vs sloppy default"],
      links: [{ title: "MDN: this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" }],
    },
    {
      id: "bind-function",
      question: "Create a standalone function `bind` that is functionally equivalent to the method `Function.prototype.bind`.",
      prompt: [
        js(`
function example() {
  console.log(this);
}
const boundExample = bind(example, { a: true });
boundExample.call({ b: true }); // logs { a: true }
`),
      ],
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Return a new function that, whenever it is called, calls the original with the fixed `this` and the preset arguments followed by the new ones: `(...args) => fn.apply(context, [...preset, ...args])`. Because the outer function ignores its own `this`, a later `.call` cannot override the binding.",
      body: [
        js(`
function bind(fn, context, ...preset) {
  return function bound(...args) {
    return fn.apply(context, [...preset, ...args]);
  };
}
function describe(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}
const ada = bind(describe, { name: "Ada" }, "Hello");
console.log(ada("!"));
console.log(ada.call({ name: "Grace" }, "?"));
`),
        output(`
Hello, Ada!
Hello, Ada?
`),
        list(
          "**Partial application** comes for free: the preset arguments are fixed and the rest are supplied later.",
          "The native `bind` also handles `new`: calling a bound function with `new` ignores the bound `this` and constructs normally. Supporting that needs `new.target` and a prototype link.",
          "Binding an arrow function changes nothing about its `this`; only the preset arguments apply.",
        ),
      ],
      goodToHear: ["Return a closure that calls `apply`/`call`", "Supports preset arguments", "Bound `this` can't be overridden by `call`", "Edge case: `new` on a bound function"],
      links: [{ title: "MDN: Function.prototype.bind", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" }],
    },
    {
      id: "prototypal-inheritance",
      question: "How does prototypal inheritance differ from classical inheritance?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "In classical inheritance (Java, C#), classes are blueprints and a subclass extends a parent class. In JavaScript, objects inherit directly from other objects: each object has a hidden link, its prototype, and a property lookup that misses on the object walks up that chain. `class` and `extends` are syntax over this model.",
      body: [
        js(`
const animal = {
  speak() {
    return this.name + " makes a sound";
  },
};
const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak());
console.log(Object.getPrototypeOf(dog) === animal, Object.hasOwn(dog, "speak"));

class Cat {
  constructor(name) {
    this.name = name;
  }
  meow() {
    return "meow";
  }
}
const tom = new Cat("Tom");
console.log(Object.getPrototypeOf(tom) === Cat.prototype, typeof Cat);
console.log(Object.getPrototypeOf(Cat.prototype) === Object.prototype);
`),
        output(`
Rex makes a sound
true false
true function
true
`),
        list(
          "**Delegation, not copying**: methods exist once on the prototype; every instance looks them up.",
          "**Dynamic**: adding a method to a prototype makes it available to existing instances; `Object.setPrototypeOf` can even change the chain (slowly).",
          "**Shadowing**: assigning a property on the instance hides the prototype's one instead of changing it.",
          "The chain ends at `Object.prototype`, whose prototype is `null`.",
        ),
        say("A JavaScript class is a constructor function plus a prototype object; `extends` links one prototype to another."),
      ],
      demo: { id: "prototype-chain-3d", hint: "Look up a property and watch the search drop down the chain until a level owns it." },
      goodToHear: ["Objects inherit from objects", "The prototype chain and lookup", "`class` is syntactic sugar", "Delegation and shadowing", "Chain ends at `null`"],
      links: [{ title: "MDN: Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain" }],
    },
    {
      id: "static-vs-instance-method",
      question: "Explain the difference between a static method and an instance method.",
      topics: ["javascript"],
      level: "senior",
      short:
        "A static method belongs to the class itself (`Array.isArray`, `Object.keys`, `Promise.all`) and is called on it; it has no instance to work on. An instance method lives on the prototype (`Array.prototype.push`) and works on `this`, the instance it is called on. Static methods suit factories and utilities; instance methods suit behaviour of one object.",
      body: [
        js(`
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  static fromFahrenheit(fahrenheit) {
    return new Temperature(((fahrenheit - 32) * 5) / 9);
  }
  toFahrenheit() {
    return (this.celsius * 9) / 5 + 32;
  }
}
const boiling = Temperature.fromFahrenheit(212);
console.log(boiling.celsius, boiling.toFahrenheit());
console.log(typeof boiling.fromFahrenheit, Object.hasOwn(Temperature, "fromFahrenheit"));
console.log(Object.hasOwn(Temperature.prototype, "toFahrenheit"));
`),
        output(`
100 212
undefined true
true
`),
        list(
          "Inside a static method, `this` is the class (or a subclass that inherited it), not an instance.",
          "Static members are inherited by subclasses: `class B extends A` gives `B.create` if `A.create` exists.",
          "Static fields and `static {}` blocks hold class-wide data and setup, such as caches or counters.",
        ),
      ],
      demo: { id: "prototype-chain-3d", hint: "Static methods sit on the constructor, beside the chain; instance methods sit on the prototype in it." },
      goodToHear: ["Static: on the constructor", "Instance: on the prototype, uses `this`", "Factories and utilities are static", "Static members are inherited by subclasses"],
      links: [{ title: "MDN: static", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static" }],
    },
    {
      id: "pass-by-value-reference",
      question: "Does JavaScript pass by value or by reference?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Always by value. For objects, the value that is copied is a reference to the object (sometimes called call by sharing). So a function can mutate an object it receives and the caller sees it, but reassigning the parameter only changes the function's local copy.",
      body: [
        js(`
function update(n, list, user) {
  n += 1;
  list.push(4);
  user = { name: "replaced" };
}
const n = 1;
const list = [1, 2, 3];
const user = { name: "Ada" };
update(n, list, user);
console.log(n, list.length, user.name);
`),
        output(`1 4 Ada`),
        list(
          "`n` is a copied number: changing it inside has no effect outside.",
          "`list` is a copied reference to the same array: `push` mutates that one array.",
          "`user = ...` points the local parameter at a new object; the caller's variable still points at the old one.",
        ),
        p("True pass-by-reference (C++ `&`, C# `ref`) would let `user = ...` replace the caller's variable. JavaScript has no way to do that."),
      ],
      demo: { id: "stepper-references", hint: "Watch the arrows: `list` and the parameter point at one array; reassigning `user` moves only the local arrow." },
      goodToHear: ["Always pass by value", "The value of an object is a reference", "Mutation is visible, reassignment isn't", "Call by sharing"],
      links: [{ title: "MDN: Functions, passing arguments", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters" }],
    },
    {
      id: "clone-object",
      question: "How do you clone an object in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "Shallow copy with spread (`{ ...obj }`, `[...arr]`) or `Object.assign({}, obj)`: top-level properties are copied, nested objects are shared. Deep copy with `structuredClone(obj)`, which handles nested objects, `Date`, `Map`, `Set` and circular references. Avoid the `JSON.parse(JSON.stringify(obj))` trick except for plain JSON data.",
      body: [
        js(`
const original = { name: "Ada", tags: ["math"], born: new Date(Date.UTC(1815, 11, 10)) };
const shallow = { ...original };
const deep = structuredClone(original);
shallow.tags.push("poetry");
console.log(original.tags.length, deep.tags.length);
console.log(deep.born instanceof Date, typeof JSON.parse(JSON.stringify(original)).born);
`),
        output(`
2 1
true string
`),
        table(
          ["Method", "Depth", "Loses"],
          ["`{ ...obj }`, `Object.assign`", "shallow", "nothing at the top level; nested objects are shared"],
          ["`structuredClone`", "deep", "functions and DOM nodes throw; class instances become plain objects; getters are read once"],
          ["`JSON.parse(JSON.stringify())`", "deep", "`undefined`, functions, symbols; `Date` → string; `NaN`/`Infinity` → `null`; throws on cycles"],
        ),
        trap("Spread looks like a copy, and is one, one level deep. Updating nested state in React (`{ ...state, user: { ...state.user, name } }`) has to spread every level it changes."),
      ],
      demo: { id: "stepper-clone", hint: "Compare which boxes get duplicated by the spread and by `structuredClone`." },
      goodToHear: ["Shallow vs deep", "Spread / `Object.assign` are shallow", "`structuredClone` for deep copies", "JSON round-trip limitations", "Nested updates in React"],
      links: [
        { title: "MDN: structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
        { title: "MDN: Shallow copy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy" },
      ],
    },
    {
      id: "comparing-objects",
      question: "How do you compare two objects in JavaScript?",
      topics: ["javascript"],
      level: "intermediate",
      short:
        "`===`, `==` and `Object.is` all compare object **references**, so two separate objects with identical contents are not equal. To compare contents, compare keys and values, shallowly or recursively; in tests and Node use a deep-equal helper (`node:util`'s `isDeepStrictEqual`, Vitest's `toEqual`) rather than `JSON.stringify`.",
      body: [
        js(`
const a = { x: 1, y: { z: 2 } };
const b = { x: 1, y: { z: 2 } };
console.log(a === b, a === a);

function deepEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (typeof left !== "object" || typeof right !== "object" || left === null || right === null) return false;
  if (Array.isArray(left) !== Array.isArray(right)) return false;
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every((key) => Object.hasOwn(right, key) && deepEqual(left[key], right[key]));
}
console.log(deepEqual(a, b), deepEqual({ x: 1 }, { x: 2 }));
console.log(JSON.stringify({ x: 1, y: 2 }) === JSON.stringify({ y: 2, x: 1 }));
`),
        output(`
false true
true false
false
`),
        list(
          "**Shallow equality** (keys and `Object.is` on each value) is what `React.memo` and `useMemo` dependencies effectively use.",
          "A full deep equal also has to handle `Date`, `Map`, `Set`, typed arrays, prototypes and cycles. That is why it belongs in a library.",
          "`JSON.stringify` compares in key order and drops `undefined` and functions, so it misreports both ways.",
        ),
      ],
      goodToHear: ["Objects compare by reference", "Shallow vs deep comparison", "Recursion over keys", "Why JSON.stringify is unreliable", "Use a tested helper"],
      links: [{ title: "Node.js: util.isDeepStrictEqual", url: "https://nodejs.org/api/util.html#utilisdeepstrictequalval1-val2-options" }],
    },
    {
      id: "mutable-vs-immutable",
      question: "Contrast mutable and immutable values, and mutating vs non-mutating methods.",
      topics: ["javascript"],
      level: "senior",
      short:
        "Primitives are immutable: string methods return new strings, and you can only replace a variable's value. Objects and arrays are mutable: they can be changed in place, and everyone holding a reference sees the change. Mutating methods change the array you call them on (`push`, `sort`, `splice`); non-mutating ones return a new array (`map`, `filter`, `slice`, `toSorted`).",
      body: [
        js(`
const scores = [3, 1, 2];
const sorted = scores.toSorted();
console.log(scores, sorted);
scores.sort();
console.log(scores);
const name = "ada";
name.toUpperCase();
console.log(name);
const frozen = Object.freeze({ list: [1] });
frozen.list.push(2);
console.log(frozen.list.length);
`),
        output(`
[ 3, 1, 2 ] [ 1, 2, 3 ]
[ 1, 2, 3 ]
ada
2
`),
        table(
          ["Mutating", "Non-mutating equivalent"],
          ["`push`, `unshift`", "`[...arr, x]`, `[x, ...arr]`"],
          ["`splice`", "`toSpliced`, `slice` + spread"],
          ["`sort`", "`toSorted` (ES2023)"],
          ["`reverse`", "`toReversed` (ES2023)"],
          ["`arr[i] = x`", "`arr.with(i, x)` (ES2023)"],
          ["`Object.assign(obj, patch)`", "`{ ...obj, ...patch }`"],
        ),
        p("Immutability matters most where change is detected by reference. React compares state with `Object.is`: mutate an array and set it back, and React sees the same reference and skips the render."),
        trap("`Object.freeze` is shallow and `const` only stops reassignment: neither makes nested data immutable."),
      ],
      goodToHear: ["Primitives are immutable", "Mutating vs copying methods", "ES2023 change-by-copy methods", "Freeze is shallow", "Reference checks in React"],
      links: [
        { title: "MDN: Mutable", url: "https://developer.mozilla.org/en-US/docs/Glossary/Mutable" },
        { title: "MDN: Array.prototype.toSorted", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" },
      ],
    },
  ],
};
