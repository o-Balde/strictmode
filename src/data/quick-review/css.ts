import { css, html, list, p, say, table, trap } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const CSS_SECTION: ReviewSection = {
  id: "css",
  topic: "css",
  title: "CSS",
  blurb: "The box model, the cascade and the layout and naming tools that come up in front-end screens.",
  questions: [
    {
      id: "css-box-model",
      question: "Describe the layout of the CSS Box Model and briefly describe each component.",
      topics: ["css"],
      level: "intermediate",
      short:
        "Every element is a rectangular box of four layers, from the inside out: **content** (the text or image, sized by `width`/`height`), **padding** (space inside the border, which shows the background), **border**, and **margin** (transparent space outside the border, separating the box from its neighbours). `box-sizing` decides whether `width` measures the content alone (`content-box`, the default) or content + padding + border (`border-box`).",
      body: [
        css(`
.card {
  width: 200px;
  padding: 16px;
  border: 2px solid;
  margin: 24px;
}
/* content-box: rendered width = 200 + 2×16 + 2×2 = 236px */

.card.border-box {
  box-sizing: border-box;
}
/* border-box: rendered width = 200px; the content shrinks to 164px */
`),
        list(
          "Most resets apply `*, *::before, *::after { box-sizing: border-box; }` so widths mean what they say.",
          "**Vertical margins collapse**: two adjacent block margins of 24px and 16px give a 24px gap, not 40px. Flex and grid items don't collapse.",
          "`outline` and `box-shadow` are drawn outside the border but take no space in the layout.",
          "Inline elements (`<span>`) ignore `width`, `height` and vertical margins.",
        ),
      ],
      demo: { id: "box-model-3d", hint: "Drag the sliders and orbit the box: each layer is a slab, and box-sizing changes which one `width` measures." },
      goodToHear: ["Content, padding, border, margin", "`box-sizing: content-box` vs `border-box`", "Margin collapsing", "Outline takes no space"],
      links: [{ title: "MDN: The box model", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model" }],
    },
    {
      id: "css-specificity",
      question: "Can you describe how CSS specificity works?",
      topics: ["css"],
      level: "senior",
      short:
        "When several rules set the same property on an element, the most specific selector wins. Specificity is a three-part score (A, B, C): A counts IDs; B counts classes, attributes and pseudo-classes; C counts element types and pseudo-elements. Scores are compared column by column from the left, so one ID beats any number of classes. Equal scores fall back to source order: the later rule wins.",
      body: [
        table(
          ["Selector", "Specificity (A, B, C)"],
          ["`li`", "(0, 0, 1)"],
          ["`ul li::marker`", "(0, 0, 3)"],
          ["`.item`", "(0, 1, 0)"],
          ["`li.item[data-new]:hover`", "(0, 3, 1)"],
          ["`#menu .item`", "(1, 1, 0)"],
          ["`:is(#menu, .nav) a`", "(1, 0, 1): `:is()` takes its most specific argument"],
          ["`:where(#menu) a`", "(0, 0, 1): `:where()` always counts zero"],
          ["`*`, `>`, `+`, `~`", "(0, 0, 0)"],
        ),
        list(
          "**Inline styles** (`style=\"...\"`) beat any selector.",
          "**`!important`** moves a declaration to a higher layer of the cascade; among important declarations, specificity applies again.",
          "**Before specificity**, the cascade checks origin and importance, then **cascade layers** (`@layer`): a rule in a later layer wins over a more specific rule in an earlier one.",
          "`:not()`, `:is()` and `:has()` count as their most specific argument; `:where()` lets libraries ship styles that are trivial to override.",
        ),
        trap("Fighting specificity with more IDs or `!important` escalates. Keep selectors flat (one class, as in BEM), and use `@layer` to order third-party, base and component styles."),
      ],
      demo: { id: "specificity-calculator", hint: "Type two selectors and see which wins, and why, column by column." },
      goodToHear: ["(ID, class, type) columns", "Compared left to right", "Inline styles and `!important`", "Source order for ties", "`:is`/`:not`/`:has` vs `:where`", "Cascade layers"],
      links: [
        { title: "MDN: Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity" },
        { title: "Specificity calculator (Polypane)", url: "https://polypane.app/css-specificity-calculator/" },
      ],
    },
    {
      id: "css-sibling-selectors",
      question: "What is the difference between `+` and `~` sibling selectors?",
      topics: ["css"],
      level: "senior",
      short:
        "Both match elements that come after another element under the same parent. `A + B` (adjacent sibling) matches a `B` that comes **immediately** after an `A`. `A ~ B` (general sibling) matches **every** `B` that comes anywhere after an `A`. Neither looks backwards or into other parents.",
      body: [
        html(`
<article>
  <h2>Title</h2>
  <p>First paragraph</p>   <!-- matched by h2 + p and h2 ~ p -->
  <p>Second paragraph</p>  <!-- matched by h2 ~ p only -->
  <img src="a.png" alt="" />
  <p>After the image</p>   <!-- matched by h2 ~ p only -->
</article>
`),
        css(`
h2 + p { font-size: 1.25em; }        /* the lead paragraph */
h2 ~ p { color: var(--muted); }      /* every paragraph after the heading */
input:checked + label { font-weight: bold; }
`),
        p("To style an element based on what comes **after** it (a \"previous sibling\" selector), use `:has()`: `h2:has(+ p)` matches an `h2` immediately followed by a `p`."),
      ],
      demo: { id: "sibling-selectors", hint: "Move the heading around and watch which siblings each selector matches." },
      goodToHear: ["`+` immediately next sibling", "`~` all following siblings", "Same parent, forward only", "`:has()` for the reverse"],
      links: [{ title: "MDN: Next-sibling combinator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator" }],
    },
    {
      id: "em-rem-difference",
      question: "What is the difference between `em` and `rem` units?",
      topics: ["css"],
      level: "intermediate",
      short:
        "Both are relative to a font size. `rem` is relative to the **root** element's font size (`<html>`, 16px by default), so `1.5rem` means the same everywhere. `em` is relative to the **current element's** font size (and, for `font-size` itself, the parent's), so it compounds when elements are nested.",
      body: [
        css(`
html { font-size: 100%; }          /* 16px, or whatever the user set */

.list { font-size: 1.2em; }        /* nested three deep: 16 × 1.2 × 1.2 × 1.2 ≈ 27.6px */
.title { font-size: 1.5rem; }      /* always 24px */

.button {
  font-size: 1rem;
  padding: 0.5em 1em;              /* scales with the button's own font size */
}
`),
        list(
          "**`rem` for type scale and spacing**: predictable, and it follows the user's browser font-size setting.",
          "**`em` for things that should scale with their component's text**: padding and icon sizes in buttons, so a `.button.large` grows as a whole.",
          "Setting `html { font-size: 62.5% }` to make `1rem = 10px` works but fights user settings; most teams now keep 100% and think in rems.",
          "Media queries in `em` or `rem` use the browser's default font size, not your root style.",
        ),
      ],
      demo: { id: "em-rem", hint: "Nest the boxes and change the root size: `em` boxes compound, `rem` boxes don't." },
      goodToHear: ["`rem`: root font size", "`em`: element's (parent's for font-size)", "`em` compounds when nested", "Respect user font settings", "When to use each"],
      links: [{ title: "MDN: CSS values and units", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units" }],
    },
    {
      id: "flex-layout",
      question: "Using flexbox, create a 3-column layout where each column takes up a `col-{n} / 12` ratio of the container.",
      prompt: [
        html(`
<div class="row">
  <div class="col-2"></div>
  <div class="col-7"></div>
  <div class="col-3"></div>
</div>
`),
      ],
      topics: ["css"],
      level: "junior",
      short:
        "Make `.row` a flex container and give each column a `flex-grow` equal to its n, with a zero basis: `.col-2 { flex: 2 }`, `.col-7 { flex: 7 }`, `.col-3 { flex: 3 }`. The shorthand `flex: n` means `n 1 0%`, so the space is shared in the ratio 2 : 7 : 3, which here is exactly n/12.",
      body: [
        css(`
.row {
  display: flex;
  gap: 16px;
}
.col-2 { flex: 2; }
.col-7 { flex: 7; }
.col-3 { flex: 3; }
`),
        p("`flex-grow` alone shares the **remaining** space, and only matches n/12 when the columns add up to 12. A grid-system answer that fixes each column to n/12 of the row regardless of its siblings sets the basis instead:"),
        css(`
.row { display: flex; flex-wrap: wrap; }
[class^="col-"] { flex: 0 0 auto; }
.col-2 { width: calc(2 / 12 * 100%); }
.col-3 { width: calc(3 / 12 * 100%); }
.col-7 { width: calc(7 / 12 * 100%); }
`),
        list(
          "With `gap`, the percentage version overflows: subtract the gaps or use the `flex-grow` version, which absorbs them.",
          "Content can stop an item from shrinking below its minimum content width; `min-width: 0` on the column fixes overflowing text.",
          "CSS Grid says the same thing more directly: `grid-template-columns: 2fr 7fr 3fr`, or `repeat(12, 1fr)` with `grid-column: span n`.",
        ),
      ],
      demo: { id: "flex-playground", hint: "Change each column's n and compare the grow-based and width-based versions with a gap." },
      goodToHear: ["`display: flex` on the row", "`flex: n` sets the grow ratio", "`flex: n` = `n 1 0%`", "Gap and basis caveats", "Grid alternative"],
      links: [
        { title: "MDN: flex", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex" },
        { title: "CSS-Tricks: A complete guide to flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
      ],
    },
    {
      id: "focus-ring",
      question: "What is a focus ring? What is the correct solution to handle them?",
      topics: ["css", "accessibility"],
      level: "senior",
      short:
        "The focus ring is the outline a browser draws around the focused element. Keyboard users depend on it to know where they are, so removing it (`outline: none`) without a replacement fails WCAG. Style it with `:focus-visible`, which the browser applies when focus should be visible (keyboard navigation, text inputs) and skips for a mouse click on a button.",
      body: [
        css(`
/* Never this on its own: */
/* button:focus { outline: none; } */

:focus-visible {
  outline: 3px solid var(--focus-color, #1a73e8);
  outline-offset: 2px;
}

/* Only if a design insists on hiding focus for mouse users: */
:focus:not(:focus-visible) {
  outline: none;
}
`),
        list(
          "`:focus-visible` is supported in every modern browser (since 2022), so the old JavaScript polyfill is no longer needed.",
          "Use `outline` rather than `box-shadow`: Windows high-contrast (forced colors) mode keeps outlines and removes shadows.",
          "WCAG 2.2 adds **Focus Not Obscured** (2.4.11): a sticky header must not hide the focused element. Make the ring contrast at least 3:1 with its background.",
          "`:focus-within` styles a container while anything inside it has focus.",
        ),
      ],
      demo: { id: "focus-ring", hint: "Click the buttons with the mouse, then Tab to them: only one style responds to both." },
      goodToHear: ["Visible indicator of keyboard focus", "Never remove without a replacement", "`:focus-visible`", "`outline` over `box-shadow` for forced colors", "WCAG focus criteria"],
      links: [
        { title: "MDN: :focus-visible", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible" },
        { title: "WCAG 2.2: Focus Visible", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" },
      ],
    },
    {
      id: "media-properties",
      question: "Can you name the four types of `@media` properties?",
      topics: ["css"],
      level: "junior",
      short:
        "The four media types are `all` (every device, the default), `print` (printed pages and print preview), `screen` (anything with a screen) and `speech` (speech synthesisers). Most real queries combine a type with media features, such as `width`, `orientation`, `hover` and `prefers-color-scheme`.",
      body: [
        css(`
@media print {
  nav, .ads { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
}

@media screen and (width >= 48rem) {
  .layout { grid-template-columns: 16rem 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
`),
        list(
          "Older types (`tv`, `handheld`, `projection`, `aural`, ...) are deprecated and match nothing.",
          "`speech` is defined but browsers and screen readers don't apply it; don't rely on it for accessibility.",
          "The range syntax `(width >= 48rem)` replaces `(min-width: 48rem)` and is supported everywhere current.",
          "For component-level responsiveness, container queries (`@container`) respond to the parent's size instead of the viewport's.",
        ),
      ],
      demo: { id: "media-queries", hint: "Resize the frame and see which queries match the simulated viewport." },
      goodToHear: ["`all`, `print`, `screen`, `speech`", "Media features", "Range syntax", "User-preference queries", "Container queries"],
      links: [{ title: "MDN: Using media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using" }],
    },
    {
      id: "sprites",
      question: "What are the advantages of using CSS sprites and how are they utilized?",
      topics: ["css"],
      level: "intermediate",
      short:
        "A sprite sheet combines many small images into one file. Each element shows its slice by setting the sheet as `background-image` and moving it with `background-position`, inside a box the size of one icon. One file means fewer HTTP requests and no flicker on hover, because every state is already loaded.",
      body: [
        css(`
.icon {
  width: 24px;
  height: 24px;
  background-image: url("/icons.png");
  background-repeat: no-repeat;
}
.icon-home   { background-position: 0 0; }
.icon-search { background-position: -24px 0; }
.icon-user   { background-position: -48px 0; }
`),
        list(
          "**Why it mattered**: under HTTP/1.1, browsers opened about six connections per host and every request paid a round trip. HTTP/2 and HTTP/3 multiplex many requests on one connection, so the gain is now much smaller.",
          "**Downsides**: editing the sheet means regenerating it and its coordinates; one changed icon invalidates the cache for all of them; sprites as backgrounds have no `alt` text.",
          "**Today**: SVG icons are the common choice, either inline or as an SVG sprite of `<symbol>`s used with `<svg><use href=\"#search\"/></svg>`, which scale crisply and take `currentColor`.",
          "For high-density screens, ship a 2× sheet and set `background-size` to the 1× size.",
        ),
      ],
      demo: { id: "sprite-sheet", hint: "Pick an icon and watch the window slide over the sheet as `background-position` changes." },
      goodToHear: ["Fewer HTTP requests", "`background-position` to select", "Hover states preloaded", "HTTP/2 reduces the benefit", "SVG `<symbol>` sprites today"],
      links: [{ title: "MDN: Implementing image sprites in CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Implementing_image_sprites" }],
    },
    {
      id: "bem",
      question: "What is CSS BEM?",
      topics: ["css"],
      level: "junior",
      short:
        "BEM (Block, Element, Modifier) is a class-naming convention: `.block` for a standalone component, `.block__element` for a part of it, and `.block--modifier` (or `.block__element--modifier`) for a variant. Every selector is a single class, so specificity stays flat, names don't collide, and the markup says how pieces relate.",
      body: [
        html(`
<form class="search search--compact">
  <input class="search__input" />
  <button class="search__button search__button--primary">Go</button>
</form>
`),
        css(`
.search { display: flex; gap: 8px; }
.search--compact { gap: 4px; }
.search__input { flex: 1; }
.search__button--primary { background: var(--brand); }
`),
        list(
          "Elements belong to the block, not to each other: `.search__icon`, never `.search__button__icon`.",
          "A modifier is used together with the base class: `class=\"search search--compact\"`.",
          "The benefit is predictability in large shared stylesheets. CSS Modules, scoped styles, `@scope` and utility-first CSS (Tailwind) solve the same collision problem in other ways, which is why BEM is less common in component-based apps.",
        ),
        say("BEM trades verbose class names for flat specificity and zero guessing about where a style applies."),
      ],
      goodToHear: ["Block, Element, Modifier", "`__` and `--` separators", "Single-class, flat specificity", "Avoids naming collisions", "Alternatives: CSS Modules, utility CSS"],
      links: [{ title: "CSS-Tricks: BEM 101", url: "https://css-tricks.com/bem-101/" }],
    },
    {
      id: "css-preprocessors",
      question: "What are the advantages of using CSS preprocessors?",
      topics: ["css"],
      level: "junior",
      short:
        "Preprocessors like Sass, Less and Stylus add programming features to CSS and compile to plain CSS: variables, nesting, mixins, functions, loops, maths, and partials combined into one file. They made large stylesheets easier to organise and keep consistent. Native CSS has since gained custom properties, nesting, `color-mix()`, `calc()` and cascade layers, so many projects now need much less of them.",
      body: [
        css(`
// Sass (SCSS syntax)
$radius: 8px;

@mixin focus-ring($color) {
  outline: 3px solid $color;
  outline-offset: 2px;
}

.button {
  border-radius: $radius;
  &:focus-visible { @include focus-ring(royalblue); }
  &--large { padding: 1rem 2rem; }
}
`, { caption: "Sass" }),
        css(`
:root { --radius: 8px; }

.button {
  border-radius: var(--radius);
  &:focus-visible { outline: 3px solid royalblue; outline-offset: 2px; }
  background: color-mix(in oklch, royalblue, white 20%);
}
`, { caption: "The same ideas in native CSS" }),
        list(
          "**Sass variables are static**, resolved at build time; **custom properties are live**: they cascade, can change per element or media query, and can be set from JavaScript.",
          "Mixins and loops still have no direct native equivalent, which is where Sass keeps an edge in design-system code.",
          "PostCSS is a different tool: plugins that transform standard CSS (autoprefixing, future syntax), rather than a new language.",
        ),
      ],
      goodToHear: ["Variables, nesting, mixins, functions, partials", "Compile to CSS", "Maintainability and DRY", "Native CSS now covers much of it", "Static variables vs custom properties"],
      links: [
        { title: "Sass: Basics", url: "https://sass-lang.com/guide/" },
        { title: "MDN: CSS nesting", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting" },
      ],
    },
  ],
};
