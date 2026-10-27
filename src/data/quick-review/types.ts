/**
 * Quick review: short questions across the whole front-end stack, each with
 * the answer worth giving in thirty seconds, a worked example, and, where a
 * picture explains more than prose, an interactive demo.
 *
 * The question list follows 30 seconds of interviews (MIT); every answer and
 * example here is written fresh, against current browsers, Node and React 19.
 *
 * Prose uses the prep sheet's inline markers: `code` and **emphasis**.
 */
import type { PrepBlock, RenderedPrepBlock } from "../interview-prep";
import type { QuestionLevel } from "../types";

export type ReviewTopic = "javascript" | "react" | "css" | "html" | "accessibility" | "node" | "security";

export interface ReviewLink {
  title: string;
  url: string;
}

/**
 * Every interactive example on the page. The page's demo registry maps each id
 * to a component, so a question can only name a demo that exists.
 */
export type DemoId =
  // three.js
  | "box-model-3d"
  | "event-propagation-3d"
  | "prototype-chain-3d"
  // the event loop
  | "event-loop-sync-async"
  | "event-loop-promises"
  | "event-loop-async-await"
  | "node-event-loop"
  | "promise-lab"
  | "debounce-throttle"
  | "event-emitter"
  // values and scope
  | "equality-table"
  | "value-inspector"
  | "float-bits"
  | "short-circuit"
  | "stepper-hoisting"
  | "stepper-var-let"
  | "stepper-closure"
  | "stepper-references"
  | "stepper-clone"
  | "stepper-increment"
  | "this-binding"
  // functions
  | "recursion-tree"
  | "pipe-builder"
  | "big-o-chart"
  | "function-lab-batches"
  | "function-lab-mask"
  | "function-lab-anagrams"
  // the browser
  | "dom-tree"
  | "vdom-diff"
  | "cors-flow"
  | "xss-inspector"
  | "web-storage"
  | "script-loading"
  | "html-vs-xhtml"
  | "feature-detect"
  | "cache-busting"
  | "rest-explorer"
  // CSS
  | "specificity-calculator"
  | "flex-playground"
  | "em-rem"
  | "sibling-selectors"
  | "media-queries"
  | "sprite-sheet"
  | "focus-ring"
  // accessibility
  | "contrast-checker"
  | "page-outline"
  | "accessibility-tree"
  | "route-focus"
  | "alt-text"
  // React
  | "react-keys"
  | "lifecycle-log"
  | "lift-state"
  | "error-boundary"
  | "portal"
  | "context-renders"
  | "refs-lab";

export interface ReviewDemo {
  id: DemoId;
  /** One line above the demo: what to try first. */
  hint: string;
}

export interface ReviewQuestion {
  /** The source question's file name, lowercased: it stays stable and doubles as the anchor. */
  id: string;
  question: string;
  /** Code the question itself shows, before the answer. */
  prompt?: PrepBlock[];
  /** The first topic is the question's own; the rest are what it touches. */
  topics: ReviewTopic[];
  level: QuestionLevel;
  /** The thirty-second answer. */
  short: string;
  body: PrepBlock[];
  demo?: ReviewDemo;
  /** What an interviewer listens for. */
  goodToHear: string[];
  links: ReviewLink[];
}

export interface ReviewSection {
  id: string;
  /** Groups the section in the table of contents. */
  topic: ReviewTopic;
  title: string;
  blurb: string;
  questions: ReviewQuestion[];
}

// ── After the build has highlighted the code ────────────────────────────────

export interface RenderedReviewQuestion extends Omit<ReviewQuestion, "prompt" | "body"> {
  prompt?: RenderedPrepBlock[];
  body: RenderedPrepBlock[];
}

export interface RenderedReviewSection extends Omit<ReviewSection, "questions"> {
  questions: RenderedReviewQuestion[];
}
