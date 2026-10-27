/**
 * The quick review page, in reading order: JavaScript first, since most of
 * the list is JavaScript, then React, CSS, HTML, accessibility, Node and
 * security.
 */
import { ACCESSIBILITY } from "./accessibility";
import { CSS_SECTION } from "./css";
import { HTML_SECTION } from "./html";
import { JS_ASYNC } from "./js-async";
import { JS_BROWSER } from "./js-browser";
import { JS_CODING } from "./js-coding";
import { JS_FUNCTIONAL } from "./js-functional";
import { JS_OBJECTS } from "./js-objects";
import { JS_SCOPE } from "./js-scope";
import { JS_VALUES } from "./js-values";
import { NODE, SECURITY } from "./node-security";
import { REACT_EVENTS_REFS } from "./react-events-refs";
import { REACT_FUNDAMENTALS } from "./react-fundamentals";
import { REACT_LIFECYCLE } from "./react-lifecycle";
import type { ReviewSection } from "./types";

export * from "./types";

export const REVIEW_SECTIONS: ReviewSection[] = [
  JS_VALUES,
  JS_SCOPE,
  JS_OBJECTS,
  JS_FUNCTIONAL,
  JS_ASYNC,
  JS_BROWSER,
  JS_CODING,
  REACT_FUNDAMENTALS,
  REACT_EVENTS_REFS,
  REACT_LIFECYCLE,
  CSS_SECTION,
  HTML_SECTION,
  ACCESSIBILITY,
  NODE,
  SECURITY,
];

/** Where the question list comes from. The answers are this site's own. */
export const REVIEW_SOURCE = {
  title: "30 seconds of interviews",
  url: "https://github.com/Chalarangelo/30-seconds-of-interviews",
  license: "MIT",
} as const;
