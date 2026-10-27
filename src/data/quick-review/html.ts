import { html, http, js, list, p, say, table, trap } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const HTML_SECTION: ReviewSection = {
  id: "html",
  topic: "html",
  title: "HTML and the document",
  blurb: "Markup, the DOM it becomes, how scripts and caches load it, and where the specification ends and the browser begins.",
  questions: [
    {
      id: "dom",
      question: "What is the DOM?",
      topics: ["html", "javascript"],
      level: "intermediate",
      short:
        "The Document Object Model is the tree of objects a browser builds from an HTML document, and the API for reading and changing it. Each element, piece of text and comment becomes a node with a parent and children; JavaScript uses the DOM to find nodes, change their content, attributes and styles, and listen for events, and the browser re-renders to match.",
      body: [
        html(`
<ul id="list">
  <li class="done">Write</li>
</ul>
`),
        js(`
const list = document.getElementById("list");
const item = document.createElement("li");
item.textContent = "Review";
list.append(item);
console.log(list.children.length, list.childNodes.length);
// 2 elements, but 4 nodes: the whitespace between tags is text nodes too
`),
        list(
          "**The DOM is not the HTML source**: the parser fixes broken markup (adds `<tbody>`, closes tags), and scripts change it after load. DevTools' Elements panel shows the DOM, not the source.",
          "**Node types**: `Document`, `Element`, `Text`, `Comment`, `DocumentFragment`. `children` lists element children only; `childNodes` includes text and comments.",
          "**Live vs static**: `getElementsByClassName` returns a live collection that updates; `querySelectorAll` returns a static snapshot.",
          "**Cost**: reading layout (`offsetHeight`) right after writing styles forces a synchronous layout. Batch reads and writes.",
        ),
      ],
      demo: { id: "dom-tree", hint: "Edit the markup: the tree is what the browser's parser actually builds, whitespace and fixes included." },
      goodToHear: ["Tree of nodes built from HTML", "API for JavaScript", "Not the same as the source", "Node types, elements vs nodes", "Live vs static collections"],
      links: [{ title: "MDN: Introduction to the DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" }],
    },
    {
      id: "alt-attribute",
      question: "What is the purpose of the `alt` attribute on images?",
      topics: ["html", "accessibility"],
      level: "junior",
      short:
        "`alt` is the image's text alternative. Screen readers read it instead of the image, browsers show it when the image fails to load, and search engines index it. Describe what the image conveys in context; for purely decorative images use an empty `alt=\"\"`, which tells assistive technology to skip it.",
      body: [
        html(`
<!-- Informative: say what it shows that matters here -->
<img src="chart.png" alt="Sales doubled between March and June" />

<!-- Functional (inside a link or button): describe the action -->
<a href="/"><img src="logo.svg" alt="Acme home" /></a>

<!-- Decorative: empty, not missing -->
<img src="divider.png" alt="" />
`),
        list(
          "A **missing** `alt` is not the same as an empty one: screen readers may read the file name instead (\"IMG underscore 2041 dot jpg\").",
          "Don't start with \"Image of\": the role is already announced.",
          "Complex images (charts, diagrams) need a longer description nearby, linked with `aria-describedby` or a `<figcaption>`.",
          "WCAG 1.1.1 (Non-text Content, level A) requires a text alternative for every meaningful image.",
        ),
      ],
      demo: { id: "alt-text", hint: "Break the image and switch between missing, empty and written alt text." },
      goodToHear: ["Text alternative for screen readers", "Shown when the image fails", "Empty `alt` for decorative images", "Describe purpose in context", "WCAG 1.1.1"],
      links: [
        { title: "W3C WAI: An alt decision tree", url: "https://www.w3.org/WAI/tutorials/images/decision-tree/" },
        { title: "MDN: img alt", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#alt" },
      ],
    },
    {
      id: "async-defer-attributes",
      question: "What are `defer` and `async` attributes on a `<script>` tag?",
      topics: ["html", "javascript"],
      level: "intermediate",
      short:
        "A plain `<script src>` stops the HTML parser while the file downloads and runs. With `async`, it downloads in parallel and runs as soon as it arrives, pausing the parser briefly, in no guaranteed order. With `defer`, it downloads in parallel and runs after the document has been parsed, in document order, just before `DOMContentLoaded`. Module scripts are deferred by default.",
      body: [
        html(`
<script src="blocking.js"></script>        <!-- parse stops: download + run -->
<script src="analytics.js" async></script> <!-- independent: runs whenever it arrives -->
<script src="app.js" defer></script>       <!-- needs the DOM: runs after parsing, in order -->
<script type="module" src="main.js"></script> <!-- deferred automatically -->
`),
        table(
          ["", "Blocks parsing", "Runs", "Order kept", "Before `DOMContentLoaded`"],
          ["plain", "yes (download and run)", "immediately", "yes", "yes"],
          ["`async`", "only while running", "as soon as downloaded", "no", "not guaranteed"],
          ["`defer`", "no", "after parsing finishes", "yes", "yes"],
          ["`type=\"module\"`", "no", "after parsing (like `defer`)", "yes", "yes"],
          ["`type=\"module\" async`", "only while running", "as soon as it and its imports load", "no", "not guaranteed"],
        ),
        list(
          "Use `defer` (or modules) for application code that touches the DOM; `async` for independent scripts such as analytics.",
          "Both are ignored on inline scripts (except `async` on inline modules).",
          "A plain script in `<head>` also waits for preceding stylesheets, because it might read styles.",
        ),
      ],
      demo: { id: "script-loading", hint: "Change the download times and compare the parse timeline for each attribute." },
      goodToHear: ["Plain scripts block parsing", "`async`: parallel download, runs ASAP, unordered", "`defer`: parallel download, runs after parsing, ordered", "Modules defer by default", "When to use which"],
      links: [
        { title: "MDN: script, async and defer", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#async" },
        { title: "HTML spec: script element processing (diagram)", url: "https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async" },
      ],
    },
    {
      id: "cache-busting",
      question: "What is the purpose of cache busting and how can you achieve it?",
      topics: ["html"],
      level: "junior",
      short:
        "Browsers and CDNs cache static files (CSS, JavaScript, images) so pages load fast. After a deploy, those caches can keep serving the old files. Cache busting makes the URL change whenever the content changes, so the new file is fetched while unchanged ones stay cached. The standard way is a content hash in the file name, which bundlers do for you: `app.3f9a1c.js`.",
      body: [
        html(`
<!-- index.html: short-lived, revalidated on each visit -->
<link rel="stylesheet" href="/assets/app.8c2e1f.css" />
<script type="module" src="/assets/app.3f9a1c.js"></script>
`),
        http(`
# Hashed assets: cache forever, the name changes when the content does
Cache-Control: public, max-age=31536000, immutable

# The HTML that references them: always check for a new version
Cache-Control: no-cache
`),
        list(
          "**Content hash in the file name** (`app.[hash].js`): only changed files get new URLs. Vite, webpack and Next.js do it automatically.",
          "**Query strings** (`app.js?v=42`) work in browsers but a few proxies and CDNs ignore or strip them, and a version number busts every file at once.",
          "**The HTML must not be cached long**, or users never learn the new file names.",
        ),
        trap("Hashing assets but caching `index.html` for a day means a deploy reaches users a day late."),
      ],
      demo: { id: "cache-busting", hint: "Edit a file's content and watch only its hashed name change, and what that does to the cache." },
      goodToHear: ["Caches serve stale files after deploys", "Change the URL when content changes", "Content hashes in file names", "Long cache + `immutable` for hashed files", "Short cache for HTML"],
      links: [{ title: "web.dev: Love your cache", url: "https://web.dev/articles/love-your-cache" }],
    },
    {
      id: "html-multiple-header-footers",
      question: "Can a web page contain multiple `<header>` elements? What about `<footer>` elements?",
      topics: ["html"],
      level: "junior",
      short:
        "Yes to both. `<header>` and `<footer>` belong to their nearest sectioning ancestor: the page can have one, and so can every `<article>`, `<section>`, `<aside>` and `<nav>`. Only the ones that are not inside such an element (or `<main>`) become the page's `banner` and `contentinfo` landmarks.",
      body: [
        html(`
<body>
  <header>Site name and navigation</header>   <!-- banner landmark -->
  <main>
    <article>
      <header><h1>Post title</h1><p>By Ada</p></header>  <!-- just a header -->
      <p>...</p>
      <footer>Tags, share links</footer>                  <!-- just a footer -->
    </article>
  </main>
  <footer>© 2026 Example</footer>             <!-- contentinfo landmark -->
</body>
`),
        list(
          "A `<header>` cannot contain another `<header>` or a `<footer>`, and the same goes for `<footer>`.",
          "`<header>` is not the same as `<head>` (metadata) or a heading (`<h1>`–`<h6>`).",
          "There should be only one visible `<main>` per page.",
        ),
      ],
      demo: { id: "page-outline", hint: "Toggle where each header and footer sits and watch which become landmarks." },
      goodToHear: ["Multiple allowed", "Scoped to the nearest sectioning element", "Only top-level ones are landmarks", "No nesting header in header", "One `<main>`"],
      links: [{ title: "MDN: header", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header" }],
    },
    {
      id: "html5-semantic-elements-usage",
      question: "Briefly describe the correct usage of the following HTML5 semantic elements: `<header>`, `<article>`, `<section>`, `<footer>`",
      topics: ["html", "accessibility"],
      level: "junior",
      short:
        "`<header>`: introductory content for the page or a section, such as a logo, title and navigation. `<article>`: a self-contained piece that would make sense on its own, such as a post, a comment or a product card. `<section>`: a thematic group of content, normally with its own heading. `<footer>`: closing information for its section, such as the author, copyright or related links.",
      body: [
        html(`
<article>
  <header>
    <h2>Shipping the redesign</h2>
    <p><time datetime="2026-10-20">20 Oct 2026</time></p>
  </header>
  <section>
    <h3>What changed</h3>
    <p>...</p>
  </section>
  <section>
    <h3>What's next</h3>
    <p>...</p>
  </section>
  <footer>Filed under <a href="/tags/design">design</a></footer>
</article>
`),
        list(
          "Use `<section>` only when the content has a heading; otherwise it is a `<div>`. A `<section>` becomes a `region` landmark only when it has an accessible name (`aria-labelledby`).",
          "An `<article>` can be syndicated or reused elsewhere; nested articles (comments inside a post) are fine.",
          "Related elements: `<main>` for the main content, `<nav>` for major navigation, `<aside>` for tangential content, `<search>` for a search form.",
        ),
        say("Semantic elements give structure to screen readers, search engines and reader modes for free, which a pile of `div`s with class names does not."),
      ],
      demo: { id: "page-outline", hint: "Hover a region of the wireframe to see its element and the role it exposes." },
      goodToHear: ["`header`: introductory content", "`article`: self-contained", "`section`: thematic, with a heading", "`footer`: closing info", "Benefits for accessibility and SEO"],
      links: [{ title: "MDN: HTML elements reference (content sectioning)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements#content_sectioning" }],
    },
    {
      id: "html5-web-storage",
      question: "What is HTML5 Web Storage? Explain `localStorage` and `sessionStorage`.",
      topics: ["html", "javascript"],
      level: "senior",
      short:
        "Web Storage is a simple, synchronous key-value store of strings, scoped to an origin. `localStorage` persists until it is cleared, and is shared by every tab of that origin. `sessionStorage` lives for one tab (top-level browsing context): it survives reloads but is gone when the tab closes, and each tab has its own. Both hold roughly 5 MB per origin and are never sent to the server.",
      body: [
        js(`
localStorage.setItem("theme", "dark");
localStorage.getItem("theme"); // "dark"
localStorage.setItem("prefs", JSON.stringify({ compact: true })); // strings only
const prefs = JSON.parse(localStorage.getItem("prefs") ?? "{}");

sessionStorage.setItem("draft", "Half-written comment");
localStorage.removeItem("theme");

window.addEventListener("storage", (event) => {
  // Fires in other tabs of the same origin when localStorage changes.
  console.log(event.key, event.oldValue, event.newValue);
});
`),
        table(
          ["", "`localStorage`", "`sessionStorage`", "Cookies", "IndexedDB"],
          ["Lifetime", "until cleared", "until the tab closes", "set by `Expires`/`Max-Age`", "until cleared"],
          ["Shared across tabs", "yes", "no", "yes", "yes"],
          ["Sent with requests", "no", "no", "yes", "no"],
          ["Size", "~5 MB", "~5 MB", "~4 KB each", "large (quota)"],
          ["API", "sync, strings", "sync, strings", "string header", "async, structured data"],
        ),
        list(
          "Calls can throw: storage can be full, disabled, or blocked in some private modes. Wrap reads and writes in `try/catch`.",
          "It is synchronous and on the main thread: fine for small values, not for megabytes.",
        ),
        trap("Anything in Web Storage is readable by any script on the page, so one XSS bug exposes it. Don't store auth tokens there; an `HttpOnly` cookie is out of JavaScript's reach."),
      ],
      demo: { id: "web-storage", hint: "Write a key to each store, then reload, and then open this page in a second tab." },
      goodToHear: ["Origin-scoped key-value strings", "`localStorage` persists; `sessionStorage` per tab", "~5 MB, not sent to the server", "`storage` event", "Synchronous; JSON for objects", "Not for secrets"],
      links: [{ title: "MDN: Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" }],
    },
    {
      id: "html-specification-implementation",
      question: "Discuss the differences between an HTML specification and a browser's implementation thereof.",
      topics: ["html"],
      level: "intermediate",
      short:
        "The specification (today the WHATWG HTML Living Standard) defines what documents should contain and exactly how browsers must parse and process them, including how to recover from invalid markup. Each browser engine (Blink, WebKit, Gecko) implements it separately and on its own schedule, so features ship at different times, and occasionally with bugs or deviations. Developers bridge the gap with feature detection, compatibility data and progressive enhancement.",
      body: [
        js(`
if ("showPopover" in HTMLElement.prototype) {
  menu.showPopover();
} else {
  menu.hidden = false; // fallback for engines without the Popover API
}

if (CSS.supports("selector(:has(a))")) {
  document.documentElement.classList.add("has-has");
}
`, { caption: "Feature detection, not browser sniffing" }),
        list(
          "**Living standard**: HTML is no longer versioned (\"HTML5\" was the last big number); it changes continuously as browsers agree.",
          "**Error handling is specified**: since HTML5, every browser parses broken markup the same way. Earlier, each engine guessed differently.",
          "**Where to check**: MDN's compatibility tables, caniuse.com, and **Baseline** labels, which mark features available in all major browsers.",
          "**Gaps are filled** with polyfills (code implementing a missing API) and transpilers for syntax.",
        ),
      ],
      demo: { id: "feature-detect", hint: "The list is checked live in your browser: these are its own answers." },
      goodToHear: ["Spec defines behaviour, browsers implement it", "WHATWG Living Standard", "Error handling is specified", "Uneven support across engines", "Feature detection, Baseline, polyfills"],
      links: [
        { title: "WHATWG HTML Living Standard", url: "https://html.spec.whatwg.org/multipage/" },
        { title: "web.dev: Baseline", url: "https://web.dev/baseline" },
      ],
    },
    {
      id: "html-vs-xhtml",
      question: "What are some differences that XHTML has compared to HTML?",
      topics: ["html"],
      level: "intermediate",
      short:
        "XHTML is HTML written as XML and, when served as `application/xhtml+xml`, parsed by an XML parser. That parser is strict: tags and attributes are case-sensitive and lowercase, every element must be closed (`<br />`), elements must nest properly, attribute values must be quoted, attributes can't be minimised (`checked=\"checked\"`), and special characters must be escaped. One error and the page fails to render, where the HTML parser would recover.",
      body: [
        js(`
const markup = "<p>Unclosed <b>bold<br><input disabled></p>";
const asHtml = new DOMParser().parseFromString(markup, "text/html");
console.log(asHtml.body.innerHTML);
const asXml = new DOMParser().parseFromString(markup, "application/xhtml+xml");
console.log(asXml.querySelector("parsererror") !== null);
`, { caption: "Run in a browser console" }),
        table(
          ["", "HTML", "XHTML (served as XML)"],
          ["Errors", "recovered by the parser", "fatal: the page shows an error"],
          ["Case", "insensitive", "lowercase, case-sensitive"],
          ["Void elements", "`<br>`", "`<br />`"],
          ["Attributes", "`disabled`, unquoted values allowed", "`disabled=\"disabled\"`, always quoted"],
          ["`document.write`", "works", "not available"],
        ),
        p("Content type decides the parser, not the doctype: an XHTML document served as `text/html` is parsed as HTML. JSX borrows XHTML's habits: every tag closes, `<br />` and camelCase attributes."),
      ],
      demo: { id: "html-vs-xhtml", hint: "Feed the same markup to both parsers and compare what comes out." },
      goodToHear: ["HTML serialized as XML", "Strict parsing; errors are fatal", "Lowercase, closed, quoted, no minimisation", "MIME type picks the parser", "JSX resembles XHTML"],
      links: [{ title: "MDN: XHTML", url: "https://developer.mozilla.org/en-US/docs/Glossary/XHTML" }],
    },
  ],
};
