/**
 * CodeSignal React + TypeScript practice run.
 *
 * The interview prep sheet answers questions asked out loud. This page is for
 * one specific, timed, auto-graded assessment: what is publicly known about its
 * format, mocks built to that format, and the specs that grade them. The specs
 * and reference solutions live in practice/codesignal, a runnable kit; the
 * build reads them from there, so the page shows exactly what the kit runs.
 *
 * Prose uses the prep sheet's inline markers: `code` and **emphasis**.
 */
import type { PrepBlock, PrepSection, RenderedPrepBlock, RenderedPrepSection } from "../interview-prep";

/** How much weight a statement about the assessment can bear. */
export type Confidence = "official" | "reported" | "unverified";

export interface Source {
  id: string;
  /** A few words, for inline citations. */
  label: string;
  title: string;
  url: string;
  /** What the source supports, in one line. */
  note: string;
  confidence: Confidence;
}

export interface Claim {
  text: string;
  confidence: Confidence;
  /** Source ids. */
  sources: string[];
}

/** One of the shapes a "React/TypeScript" CodeSignal link can turn out to be. */
export interface FormatProfile {
  id: string;
  name: string;
  /** Short label for the badge: how likely this is for a React/TS invite. */
  likelihood: string;
  summary: string;
  claims: Claim[];
  /** How to recognise it on the first screen. */
  tells: string[];
  /** Which mocks rehearse it. */
  practice: string[];
}

export interface Fact {
  title: string;
  body: PrepBlock[];
  confidence: Confidence;
  sources: string[];
}

/** A file from practice/codesignal, shown on the page. */
export interface KitFile {
  /** Relative to practice/codesignal. */
  path: string;
  caption?: string;
}

export interface MockLevel {
  title: string;
  /** The time budget the framework gives this level. */
  minutes: number;
  /** The level's spec, written the way the assessment writes it. */
  brief: PrepBlock[];
  /** The spec file that grades it, relative to practice/codesignal. */
  spec: string;
  /** What tends to cost points here. */
  traps: string[];
}

export type MockKind = "frontend" | "icf";

export interface Mock {
  /** The kit task name: `npm run level -- <id> <level>`. */
  id: string;
  kind: MockKind;
  title: string;
  scenario: string;
  /** Where the shape of this mock comes from. */
  basis: string;
  sources: string[];
  /** Files to read before Level 1, as the assessment's provided files. */
  provided: KitFile[];
  levels: MockLevel[];
  /** What the reference solution does, and why it survives Level 4. */
  debrief: PrepBlock[];
  solution: KitFile[];
}

export interface BugTicket {
  number: number;
  title: string;
  /** What the user sees. */
  symptom: string;
  /** What should happen instead. */
  expected: string;
  hint: string;
  /** The cause and the fix, shown after the reader has tried. */
  fix: PrepBlock[];
  spec: string;
}

export interface BugHunt {
  id: string;
  title: string;
  intro: PrepBlock[];
  rules: string[];
  tickets: BugTicket[];
  provided: KitFile[];
  solution: KitFile[];
}

export interface WidgetDrill {
  id: string;
  title: string;
  /** Why it is here: who reported it, or why it recurs. */
  basis: string;
  sources: string[];
  minutes: number;
  brief: PrepBlock[];
  spec: string;
  notes: PrepBlock[];
  solution: KitFile[];
}

export interface PlanStep {
  /** e.g. "0:00–0:03" */
  at: string;
  title: string;
  detail: string;
}

export interface Plan {
  id: MockKind;
  title: string;
  steps: PlanStep[];
}

export interface Checklist {
  id: string;
  title: string;
  items: string[];
}

export interface CodesignalSheet {
  formats: FormatProfile[];
  platform: Fact[];
  levelGuides: PrepSection[];
  mocks: Mock[];
  bugHunt: BugHunt;
  widgets: WidgetDrill[];
  drills: PrepSection[];
  plans: Plan[];
  checklists: Checklist[];
  sources: Source[];
}

// ── After the build has highlighted the code ────────────────────────────────

export interface RenderedKitFile extends KitFile {
  language: "tsx" | "typescript" | "json";
  html: string;
  lines: number;
}

export interface RenderedSpec {
  path: string;
  html: string;
  /** The `it(...)` names, in order: the grader's checklist for the level. */
  checks: string[];
}

export interface RenderedFact extends Omit<Fact, "body"> {
  body: RenderedPrepBlock[];
}

export interface RenderedMockLevel extends Omit<MockLevel, "brief" | "spec"> {
  brief: RenderedPrepBlock[];
  spec: RenderedSpec;
}

export interface RenderedMock extends Omit<Mock, "provided" | "levels" | "debrief" | "solution"> {
  provided: RenderedKitFile[];
  levels: RenderedMockLevel[];
  debrief: RenderedPrepBlock[];
  solution: RenderedKitFile[];
}

export interface RenderedBugTicket extends Omit<BugTicket, "fix" | "spec"> {
  fix: RenderedPrepBlock[];
  spec: RenderedSpec;
}

export interface RenderedBugHunt extends Omit<BugHunt, "intro" | "tickets" | "provided" | "solution"> {
  intro: RenderedPrepBlock[];
  tickets: RenderedBugTicket[];
  provided: RenderedKitFile[];
  solution: RenderedKitFile[];
}

export interface RenderedWidgetDrill extends Omit<WidgetDrill, "brief" | "spec" | "notes" | "solution"> {
  brief: RenderedPrepBlock[];
  spec: RenderedSpec;
  notes: RenderedPrepBlock[];
  solution: RenderedKitFile[];
}

export interface RenderedCodesignalSheet
  extends Omit<CodesignalSheet, "platform" | "levelGuides" | "mocks" | "bugHunt" | "widgets" | "drills"> {
  platform: RenderedFact[];
  levelGuides: RenderedPrepSection[];
  mocks: RenderedMock[];
  bugHunt: RenderedBugHunt;
  widgets: RenderedWidgetDrill[];
  drills: RenderedPrepSection[];
  /** Spec count across the kit, for the header. */
  totalChecks: number;
}
