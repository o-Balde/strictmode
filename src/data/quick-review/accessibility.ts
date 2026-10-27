import { html, list, p, say, table, trap, tsx } from "../interview-prep/blocks";
import type { ReviewSection } from "./types";

export const ACCESSIBILITY: ReviewSection = {
  id: "accessibility",
  topic: "accessibility",
  title: "Accessibility",
  blurb: "How assistive technology sees a page, the standards it is measured against, and the habits that keep an app usable without a mouse or a screen.",
  questions: [
    {
      id: "accessibility-aria",
      question: "What is ARIA and when should you use it?",
      topics: ["accessibility"],
      level: "intermediate",
      short:
        "WAI-ARIA (Accessible Rich Internet Applications) is a W3C set of attributes that add roles (`role=\"tab\"`), states (`aria-expanded`, `aria-selected`) and properties (`aria-label`, `aria-controls`) to elements, so assistive technology can understand custom widgets. Use it only when native HTML can't express the widget: the first rule of ARIA is to use a native element instead, and ARIA changes what is announced, not how anything behaves.",
      body: [
        html(`
<!-- Native first: role, focus, Enter and Space all come free -->
<button type="button" aria-expanded="false" aria-controls="menu">Options</button>
<ul id="menu" hidden>...</ul>

<!-- ARIA where HTML has no element: a tab interface -->
<div role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true" aria-controls="general" id="tab-general">General</button>
  <button role="tab" aria-selected="false" aria-controls="privacy" id="tab-privacy" tabindex="-1">Privacy</button>
</div>
<div role="tabpanel" id="general" aria-labelledby="tab-general">...</div>
`),
        list(
          "**No ARIA is better than bad ARIA**: a `role=\"button\"` on a `<div>` promises keyboard behaviour that you then have to build (`tabindex=\"0\"`, Enter and Space handlers).",
          "**States must be kept in sync** with JavaScript: an `aria-expanded=\"false\"` on an open menu is worse than nothing.",
          "**Live regions** (`aria-live=\"polite\"`, `role=\"status\"`) announce changes that happen away from focus, such as \"Saved\" or search result counts.",
          "Patterns for common widgets (tabs, combobox, dialog, menu) are in the ARIA Authoring Practices Guide.",
        ),
        trap("`aria-label` overrides the visible text for screen readers. If the two differ, voice-control users who say what they see can't activate the control."),
      ],
      demo: { id: "accessibility-tree", hint: "Switch between the native button and the div with ARIA, and compare what reaches the accessibility tree." },
      goodToHear: ["Roles, states and properties", "Native HTML first", "ARIA doesn't add behaviour", "Keep states in sync", "Live regions", "Authoring Practices Guide"],
      links: [
        { title: "W3C: ARIA Authoring Practices Guide", url: "https://www.w3.org/WAI/ARIA/apg/" },
        { title: "MDN: ARIA", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" },
      ],
    },
    {
      id: "accessibility-tree",
      question: "What is the Accessibility Tree?",
      topics: ["accessibility"],
      level: "intermediate",
      short:
        "A tree the browser derives from the DOM (plus CSS and ARIA) and exposes to assistive technology through the platform's accessibility APIs. Each node has a **role** (button, heading, link), a **name** (\"Save\"), a **state** (checked, expanded) and sometimes a value. It is smaller than the DOM: purely presentational wrappers are dropped, and hidden content is removed.",
      body: [
        html(`
<div class="card">                         <!-- generic: usually ignored -->
  <h2>Plans</h2>                            <!-- heading, level 2, "Plans" -->
  <img src="star.svg" alt="" />             <!-- removed: decorative -->
  <label for="seats">Seats</label>
  <input id="seats" type="number" value="3" /> <!-- spinbutton "Seats", value 3 -->
  <span aria-hidden="true">★★★</span>       <!-- removed -->
  <button>Upgrade</button>                  <!-- button "Upgrade" -->
  <div onclick="upgrade()">Upgrade</div>    <!-- just text: not a button -->
</div>
`),
        list(
          "**Removed**: `display: none`, `visibility: hidden`, the `hidden` attribute, `aria-hidden=\"true\"`, and `alt=\"\"` images.",
          "**Names** come from content, `<label>`, `alt`, `aria-labelledby` and `aria-label`, in a specified order (the accessible name computation).",
          "**Inspect it** in Chrome or Firefox DevTools' Accessibility panel; Testing Library's `getByRole` queries are built on the same idea.",
        ),
        say("Semantic HTML builds a good accessibility tree for free; ARIA patches it where HTML falls short."),
      ],
      demo: { id: "accessibility-tree", hint: "Pick a snippet and compare its DOM with the much smaller tree a screen reader gets." },
      goodToHear: ["Derived from the DOM", "Exposed to assistive technology", "Role, name, state, value", "Fewer nodes than the DOM", "Semantic HTML builds it correctly"],
      links: [{ title: "MDN: Accessibility tree", url: "https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree" }],
    },
    {
      id: "accessibility-contrast",
      question: "What is the minimum recommended ratio of contrast between foreground text and background to comply with WCAG? Why does this matter?",
      topics: ["accessibility", "css"],
      level: "junior",
      short:
        "4.5:1 for normal text, and 3:1 for large text (at least 24px, or about 18.7px bold), under WCAG success criterion 1.4.3, level AA. Level AAA (1.4.6) raises it to 7:1 and 4.5:1. Low-contrast text is hard or impossible to read for people with low vision or colour-vision deficiencies, and for everyone in sunlight, on a dim screen or with ageing eyes.",
      body: [
        table(
          ["Content", "AA", "AAA"],
          ["Normal text", "4.5:1", "7:1"],
          ["Large text (≥ 24px, or ≥ 18.66px bold)", "3:1", "4.5:1"],
          ["UI components and meaningful graphics (1.4.11)", "3:1", "n/a"],
          ["Disabled controls, logos, decoration", "exempt", "exempt"],
        ),
        p("The ratio is `(L1 + 0.05) / (L2 + 0.05)`, where L1 and L2 are the relative luminances of the lighter and darker colours. It runs from 1:1 (identical) to 21:1 (black on white). Pure `#777` grey on white is 4.47:1 (checkers round down), just under AA."),
        list(
          "Contrast is not the only signal: information must not depend on colour alone (1.4.1), so pair a red border with an icon or text.",
          "Text over images needs a scrim or text shadow; the check applies to the worst part of the image behind the text.",
        ),
      ],
      demo: { id: "contrast-checker", hint: "Nudge the text colour until AA flips to pass: the ratio is computed live." },
      goodToHear: ["4.5:1 normal text, 3:1 large text (AA)", "7:1 for AAA", "3:1 for UI components", "Low vision and colour deficiency", "Not colour alone"],
      links: [
        { title: "W3C: Understanding SC 1.4.3 Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
        { title: "WebAIM: Contrast checker", url: "https://webaim.org/resources/contrastchecker/" },
      ],
    },
    {
      id: "accessibility-testing",
      question: "What are some of the tools available to test the accessibility of a website or web application?",
      topics: ["accessibility"],
      level: "intermediate",
      short:
        "Automated checkers find the mechanical problems: axe (the DevTools extension, and `axe-core` in Playwright, Cypress or `jest-axe`), Lighthouse, WAVE and `eslint-plugin-jsx-a11y` in the editor. They catch only part of the issues, so manual testing is essential: use the keyboard alone, test with a screen reader (VoiceOver, NVDA, JAWS, TalkBack), zoom to 200% and 400%, and check focus order and contrast.",
      body: [
        tsx(`
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

test("the signup form has no detectable violations", async () => {
  const { container } = render(<SignupForm />);
  // Role queries fail when the accessible name or role is missing.
  screen.getByRole("textbox", { name: "Email" });
  screen.getByRole("button", { name: "Create account" });
  expect(await axe(container)).toHaveNoViolations();
});
`),
        table(
          ["Layer", "Tools", "Catches"],
          ["Editor", "`eslint-plugin-jsx-a11y`", "missing `alt`, click handlers on non-interactive elements"],
          ["Unit tests", "Testing Library `getByRole`, `jest-axe`", "missing names and roles, invalid ARIA"],
          ["End to end", "`@axe-core/playwright`, Cypress axe", "issues across whole pages and states"],
          ["Browser", "axe DevTools, Lighthouse, WAVE, Accessibility panel", "contrast, structure, tree"],
          ["Manual", "keyboard, screen readers, zoom, reduced motion", "focus order, traps, meaning, usability"],
        ),
        trap("A clean Lighthouse score is not \"accessible\": tools can tell that an image has `alt` text, not whether the text makes sense."),
      ],
      goodToHear: ["Automated tools (axe, Lighthouse, WAVE)", "Linting and tests", "Manual keyboard testing", "Screen readers", "Tools miss many issues"],
      links: [
        { title: "Deque: axe-core", url: "https://github.com/dequelabs/axe-core" },
        { title: "W3C WAI: Easy checks", url: "https://www.w3.org/WAI/test-evaluate/preliminary/" },
      ],
    },
    {
      id: "wcag",
      question: "What is WCAG? What are the differences between A, AA, and AAA compliance?",
      topics: ["accessibility"],
      level: "junior",
      short:
        "The Web Content Accessibility Guidelines, published by the W3C's Web Accessibility Initiative. They are organised under four principles (content must be Perceivable, Operable, Understandable and Robust) into testable success criteria, each at a conformance level: **A** is the essential minimum, **AA** adds the criteria most laws and policies require, and **AAA** is the strictest, not expected for whole sites. The current version is WCAG 2.2.",
      body: [
        table(
          ["Level", "Examples of criteria", "In practice"],
          ["A", "text alternatives (1.1.1), keyboard access (2.1.1), no keyboard trap (2.1.2), page titles (2.4.2)", "without these, some users can't use the site at all"],
          ["AA", "contrast 4.5:1 (1.4.3), resize text to 200% (1.4.4), visible focus (2.4.7), consistent navigation (3.2.3)", "the usual legal and contractual target"],
          ["AAA", "contrast 7:1 (1.4.6), sign language for video (1.2.6), no timing (2.2.3)", "aimed for where possible, rarely required"],
        ),
        list(
          "Each level includes the ones below it: AA conformance means every A and AA criterion passes.",
          "WCAG 2.2 (2023) added criteria such as Focus Not Obscured (2.4.11), Target Size minimum 24×24px (2.5.8) and Accessible Authentication (3.3.8).",
          "AA is referenced by the ADA case law and Section 508 in the US, EN 301 549 and the European Accessibility Act in the EU.",
        ),
      ],
      demo: { id: "contrast-checker", hint: "The same colours can pass AA and fail AAA: find a pair that does." },
      goodToHear: ["W3C guidelines", "POUR principles", "A, AA, AAA levels", "AA is the common legal target", "WCAG 2.2"],
      links: [
        { title: "W3C: WCAG 2 overview", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
        { title: "W3C: How to meet WCAG (quick reference)", url: "https://www.w3.org/WAI/WCAG22/quickref/" },
      ],
    },
    {
      id: "landmark-roles",
      question: "What are landmark roles and how can they be useful?",
      topics: ["accessibility", "html"],
      level: "intermediate",
      short:
        "Landmarks mark the major regions of a page: `banner`, `navigation`, `main`, `complementary`, `contentinfo`, `search`, `form` and `region`. Screen reader users can list them and jump straight to one (to the main content, or the navigation) instead of reading the page from the top. Semantic HTML elements create most of them without any ARIA.",
      body: [
        table(
          ["Landmark role", "HTML element"],
          ["`banner`", "`<header>` not inside `article`, `aside`, `main`, `nav` or `section`"],
          ["`navigation`", "`<nav>`"],
          ["`main`", "`<main>` (one per page)"],
          ["`complementary`", "`<aside>`"],
          ["`contentinfo`", "`<footer>` not inside a sectioning element"],
          ["`search`", "`<search>`"],
          ["`form`, `region`", "`<form>`, `<section>`, only when they have an accessible name"],
        ),
        html(`
<header>...</header>
<nav aria-label="Primary">...</nav>
<main>...</main>
<nav aria-label="Footer">...</nav>
<footer>...</footer>
`),
        list(
          "When a landmark appears more than once (two `<nav>`s), label each one so the list reads \"Primary navigation\" and \"Footer navigation\".",
          "All content should sit inside some landmark, so nothing is skipped when users navigate by them.",
          "Writing `role=\"main\"` on a `<div>` works, but `<main>` says it without ARIA.",
        ),
      ],
      demo: { id: "page-outline", hint: "Open the landmarks list the way a screen reader would and jump between regions." },
      goodToHear: ["Regions of the page", "Navigation for screen reader users", "HTML elements map to landmarks", "Label duplicates", "All content inside landmarks"],
      links: [{ title: "W3C: Landmark regions (APG)", url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/" }],
    },
    {
      id: "handling-route-changes-in-single-page-apps",
      question: "Describe your thoughts on how a single page web app should handle focus when changing routes",
      topics: ["accessibility", "react"],
      level: "intermediate",
      short:
        "In an SPA, a route change swaps content without loading a new page, so the browser does none of what it does on a real navigation: focus stays on the link that was clicked (which may no longer exist), and screen readers announce nothing. The app should move focus to the new content, usually its main `<h1>` (made focusable with `tabindex=\"-1\"`), update `document.title`, and let the change be announced.",
      body: [
        tsx(`
function RouteHeading({ title }: { title: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = title + " · Example";
    headingRef.current?.focus();
  }, [title]);

  return (
    <h1 ref={headingRef} tabIndex={-1} className="route-heading">
      {title}
    </h1>
  );
}
`),
        list(
          "**Why the heading**: focus lands at the top of the new content, and the screen reader reads its name, which tells the user where they are. Focusing a skip link, or announcing the new title through a live region, are the other approaches people use; Gatsby's 2019 user research (linked below) compared them with real users.",
          "**Remove the outline** on that heading only if it's distracting (`.route-heading:focus { outline: none }`): it is not an interactive control.",
          "**Restore scroll** to the top on new pages, and to the previous position on Back.",
          "**Framework support**: Next.js's App Router includes a route announcer that reads the new page's title; check what your router does before adding your own.",
        ),
        trap("Moving focus to `<body>` or not moving it at all leaves keyboard users at a stale position halfway down the page."),
      ],
      demo: { id: "route-focus", hint: "Navigate the mini app with and without focus management, and watch where focus ends up." },
      goodToHear: ["Client-side navigation skips the browser's reset", "Focus stays on a stale element", "Move focus to the new heading (`tabindex=-1`)", "Update the title and announce", "Scroll restoration"],
      links: [
        { title: "Gatsby: What we learned from user testing of accessible client-side routing", url: "https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/" },
        { title: "Up Your A11y: Handling focus on route change", url: "https://www.upyoura11y.com/handling-focus/" },
      ],
    },
  ],
};
