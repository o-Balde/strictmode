import { html, http, js, list, output, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const JS_BROWSER: ReviewSection = {
  id: "js-browser",
  topic: "javascript",
  title: "JavaScript in the browser",
  blurb: "Events, cross-origin requests, content types and why UI libraries exist: JavaScript where it meets the page and the network.",
  questions: [
    {
      id: "event-delegation",
      question: "What is event delegation and why is it useful? Can you show an example of how to use it?",
      topics: ["javascript", "html"],
      level: "intermediate",
      short:
        "Instead of a listener on every child, put one listener on a common ancestor and use `event.target` to find which child the event came from. It works because most events bubble up through their ancestors. One listener uses less memory, and it also handles children added later, without re-binding.",
      body: [
        html(`
<ul id="todo-list">
  <li data-id="1">Buy milk <button class="remove">×</button></li>
  <li data-id="2">Walk dog <button class="remove">×</button></li>
</ul>
`),
        js(`
const list = document.getElementById("todo-list");
list.addEventListener("click", (event) => {
  const button = event.target.closest("button.remove");
  if (!button || !list.contains(button)) return;
  button.closest("li").remove();
});
`, { caption: "One listener for every current and future remove button" }),
        list(
          "`event.target` is the element that was actually clicked (possibly a `<span>` inside the button), so match with `closest(selector)`, not `===`.",
          "`event.currentTarget` is the element the listener is attached to: here, the list.",
          "`focus`, `blur`, `mouseenter` and `mouseleave` don't bubble. Delegate with `focusin`/`focusout` and `mouseover`/`mouseout` instead.",
          "A child calling `event.stopPropagation()` stops the event from reaching the delegated listener.",
        ),
        p("React uses delegation itself: since React 17 it attaches one listener per event type at the root container and dispatches to your `onClick` props from there."),
      ],
      demo: { id: "event-propagation-3d", hint: "Click an inner layer and follow the event down (capture) and back up (bubble) through its ancestors." },
      goodToHear: ["Relies on event bubbling", "One listener on an ancestor", "`event.target` vs `currentTarget`", "Works for dynamically added elements", "Non-bubbling events"],
      links: [
        { title: "MDN: Event bubbling and delegation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
        { title: "MDN: Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest" },
      ],
    },
    {
      id: "cors",
      question: "What is CORS?",
      topics: ["javascript", "security"],
      level: "intermediate",
      short:
        "Cross-Origin Resource Sharing: the browser mechanism that lets a server relax the same-origin policy. By default, a page's script cannot read responses from another origin (scheme + host + port). With CORS, the server lists which origins, methods and headers it accepts in `Access-Control-Allow-*` response headers, and the browser enforces them. Requests that are not \"simple\" are first checked with an `OPTIONS` preflight.",
      body: [
        http(`
GET /api/profile HTTP/1.1
Host: api.example.com
Origin: https://app.example.com

HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
Vary: Origin
`, { caption: "A simple cross-origin request and the header that permits it" }),
        table(
          ["", "Simple request", "Preflighted request"],
          ["Methods", "`GET`, `HEAD`, `POST`", "anything else (`PUT`, `PATCH`, `DELETE`)"],
          ["Headers", "CORS-safelisted only (`Accept`, `Content-Language`, ...)", "custom headers, `Authorization`"],
          ["`Content-Type`", "form-encoded, `multipart/form-data`, `text/plain`", "`application/json` and others"],
          ["What happens", "sent directly; the response is blocked if not allowed", "`OPTIONS` first; the real request only if it passes"],
        ),
        list(
          "**Credentials** (cookies, `fetch(url, { credentials: \"include\" })`) need `Access-Control-Allow-Credentials: true` and an exact origin: `*` is not allowed with them.",
          "CORS is enforced by the **browser**. `curl`, servers and Postman ignore it. It protects users' data in other origins, not your API: you still need authentication and CSRF protection.",
          "A CORS error is a server configuration problem; `mode: \"no-cors\"` only gets you an opaque response you cannot read.",
        ),
        trap("Reflecting any `Origin` back with credentials allowed is equivalent to turning the same-origin policy off for logged-in users."),
      ],
      demo: { id: "cors-flow", hint: "Switch the request to PUT with JSON and watch the preflight appear; then break the server's config." },
      goodToHear: ["Same-origin policy and origins", "`Access-Control-Allow-Origin`", "Preflight `OPTIONS` requests", "Credentials rules", "Enforced by browsers, not servers"],
      links: [
        { title: "MDN: Cross-Origin Resource Sharing (CORS)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS" },
        { title: "web.dev: Cross-Origin Resource Sharing", url: "https://web.dev/articles/cross-origin-resource-sharing" },
      ],
    },
    {
      id: "mime",
      question: "What is a MIME type and what is it used for?",
      topics: ["javascript", "html"],
      level: "intermediate",
      short:
        "A MIME type (media type) labels what kind of data a stream of bytes is, as `type/subtype` with optional parameters: `text/html; charset=utf-8`, `application/json`, `image/png`. Servers send it in the `Content-Type` header and clients in `Accept`; browsers use it to decide whether to render, run, or download a response.",
      body: [
        table(
          ["MIME type", "Content"],
          ["`text/html`", "HTML documents"],
          ["`text/css`", "stylesheets (required for `<link rel=\"stylesheet\">` in standards mode)"],
          ["`text/javascript`", "JavaScript (the one the spec recommends)"],
          ["`application/json`", "JSON"],
          ["`image/svg+xml`, `image/webp`, `image/avif`", "images"],
          ["`multipart/form-data`", "form submissions with files"],
          ["`application/octet-stream`", "unknown binary: browsers download it"],
        ),
        list(
          "The name comes from Multipurpose Internet Mail Extensions, the email standard that introduced it.",
          "Browsers refuse to run a module script, or a stylesheet, served with the wrong type.",
          "`X-Content-Type-Options: nosniff` stops the browser from guessing (\"sniffing\") a type from the bytes, which blocks some content-injection attacks.",
          "In the browser: `blob.type`, `file.type`, `<input type=\"file\" accept=\"image/*\">`.",
        ),
        js(`
const response = new Response(JSON.stringify({ ok: true }), {
  headers: { "Content-Type": "application/json; charset=utf-8" },
});
console.log(response.headers.get("content-type"));
const blob = new Blob(["<p>hi</p>"], { type: "text/html" });
console.log(blob.type, blob.size);
`),
        output(`
application/json; charset=utf-8
text/html 9
`),
      ],
      goodToHear: ["type/subtype format", "`Content-Type` and `Accept` headers", "Browsers decide how to handle content by it", "`nosniff`"],
      links: [{ title: "MDN: MIME types", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types" }],
    },
    {
      id: "ui-library-framework-purpose",
      question: "What is the purpose of JavaScript UI libraries/frameworks like React, Vue, Angular, Hyperapp, etc?",
      topics: ["javascript", "react"],
      level: "senior",
      short:
        "To keep the UI in sync with application state without hand-written DOM manipulation. You describe what the UI should look like for a given state, and the library works out and applies the DOM changes when the state changes. On top of that they give a component model for reuse and composition, and an ecosystem for routing, data loading and server rendering.",
      body: [
        js(`
// Imperative: you track and patch every piece of the DOM yourself.
let count = 0;
const label = document.querySelector("#count");
const button = document.querySelector("#add");
button.addEventListener("click", () => {
  count += 1;
  label.textContent = String(count);
  label.classList.toggle("many", count > 9);
  button.disabled = count >= 20;
});
`, { caption: "Without a library" }),
        tsx(`
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <span className={count > 9 ? "many" : undefined}>{count}</span>
      <button disabled={count >= 20} onClick={() => setCount(count + 1)}>Add</button>
    </>
  );
}
`, { caption: "With React: UI as a function of state" }),
        list(
          "**State is the single source of truth**: with jQuery-era code, state often lived in the DOM (classes, `data-` attributes) and drifted out of sync.",
          "**Components** package markup, behaviour and styling together and compose like functions.",
          "**Rendering strategy** differs: React and Vue diff a virtual DOM, Svelte and Solid compile to targeted DOM updates, Angular uses change detection over templates.",
        ),
        say("The core value is that the view becomes a function of state, so I change data and the library does the bookkeeping."),
      ],
      goodToHear: ["Sync UI with state declaratively", "Avoid manual DOM manipulation", "Reusable components", "Virtual DOM or compiled updates", "Ecosystem: routing, SSR, data"],
      links: [{ title: "react.dev: Thinking in React", url: "https://react.dev/learn/thinking-in-react" }],
    },
    {
      id: "virtual-dom",
      question: "What is a virtual DOM and why is it used in libraries/frameworks?",
      topics: ["javascript", "react"],
      level: "senior",
      short:
        "A virtual DOM is a lightweight tree of plain JavaScript objects describing what the UI should be. On each update, the library renders a new tree, compares (diffs) it with the previous one, and applies only the differences to the real DOM. It lets you write code as if the whole UI re-renders from scratch, while the browser only sees the minimal changes.",
      body: [
        tsx(`
const element = (
  <ul className="list">
    <li>a</li>
  </ul>
);
// JSX compiles to calls that return plain objects, roughly:
// { type: "ul", props: { className: "list", children: { type: "li", props: { children: "a" } } } }
console.log(element.type, typeof element.props);
`),
        list(
          "**Reconciliation**: React compares element types first. A different type (`div` → `section`) replaces the whole subtree; the same type keeps the DOM node and updates changed attributes.",
          "**Lists** are matched by `key`, so items can move without being recreated.",
          "**Batching**: many state changes produce one diff and one round of DOM writes.",
          "**Not free**: diffing costs CPU. A virtual DOM is not faster than precise hand-written DOM updates; it is faster than naive re-rendering and much easier to write correctly. Svelte and Solid skip it by compiling updates ahead of time.",
          "React's Fiber architecture splits rendering into interruptible units of work, so updates can be prioritised (transitions).",
        ),
        trap("The \"virtual DOM\" is not a copy of the browser DOM, and it is not a shadow DOM (that is an unrelated Web Components feature for encapsulation)."),
      ],
      demo: { id: "vdom-diff", hint: "Apply a change and read the patch list: insert at the start with and without keys." },
      goodToHear: ["In-memory tree of plain objects", "Diffing and reconciliation", "Minimal real DOM updates", "Keys for lists", "Not inherently faster than direct DOM updates", "Virtual DOM is not the shadow DOM"],
      links: [
        { title: "react.dev: Preserving and resetting state", url: "https://react.dev/learn/preserving-and-resetting-state" },
        { title: "legacy.reactjs.org: Reconciliation", url: "https://legacy.reactjs.org/docs/reconciliation.html" },
      ],
    },
  ],
};
