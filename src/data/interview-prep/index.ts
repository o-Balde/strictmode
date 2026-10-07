/**
 * The interview prep sheet, in reading order.
 *
 * Question selection follows the interview collections gathered under
 * _REFERENCES/_QUIZ: a question is here because it recurs across them. The
 * answers are written fresh against React 19 and TypeScript 5, since several of
 * those collections still describe class-era APIs or contain outright errors.
 */
import { JAVASCRIPT_CORE } from "./javascript-core";
import { LIVE_CODING } from "./live-coding";
import { REACT_ECOSYSTEM } from "./react-ecosystem";
import { REACT_FUNDAMENTALS } from "./react-fundamentals";
import { REACT_HOOKS } from "./react-hooks";
import { REACT_LEGACY } from "./react-legacy";
import { REACT_MODERN } from "./react-modern";
import { REACT_PATTERNS } from "./react-patterns";
import { REACT_PERFORMANCE } from "./react-performance";
import { REACT_RENDERING } from "./react-rendering";
import { TYPESCRIPT_FUNDAMENTALS } from "./typescript-fundamentals";
import { TYPESCRIPT_GENERICS } from "./typescript-generics";
import { TYPESCRIPT_NARROWING } from "./typescript-narrowing";
import { TYPESCRIPT_REACT } from "./typescript-react";
import { TYPESCRIPT_TOOLING } from "./typescript-tooling";
import { TYPESCRIPT_TYPE_LEVEL } from "./typescript-type-level";
import type { PrepSection } from "./types";

export * from "./types";

export const PREP_SECTIONS: PrepSection[] = [
  TYPESCRIPT_FUNDAMENTALS,
  TYPESCRIPT_NARROWING,
  TYPESCRIPT_GENERICS,
  TYPESCRIPT_TYPE_LEVEL,
  TYPESCRIPT_TOOLING,
  TYPESCRIPT_REACT,
  REACT_FUNDAMENTALS,
  REACT_HOOKS,
  REACT_RENDERING,
  REACT_PERFORMANCE,
  REACT_PATTERNS,
  REACT_MODERN,
  REACT_ECOSYSTEM,
  REACT_LEGACY,
  JAVASCRIPT_CORE,
  LIVE_CODING,
];
