/**
 * Scotiabank prep: one role, one employer, one interview loop.
 *
 * The interview prep sheet answers React and TypeScript questions for any
 * front-end interview. This page is tailored to a single posting, Scotiabank's
 * Full Stack Developer (Entry Level) in Global Wealth Engineering: what is
 * publicly known about how the bank interviews, the stack the team runs, the
 * wealth-onboarding domain it builds for, and a question bank shaped by the
 * job description. Every claim about the bank carries its sources.
 *
 * Prose uses the prep sheet's inline markers: `code` and **emphasis**.
 */
import type { Checklist, Confidence, Fact, RenderedFact, Source } from "../codesignal";
import type { PrepSection, RenderedPrepSection } from "../interview-prep";

/** How heavily the posting leans on a skill, which decides how deep to prepare it. */
export type RequirementWeight = "core" | "familiar" | "asset";

/** One line of the job description, decoded into what it means in the room. */
export interface Requirement {
  /** The posting's own wording, trimmed. */
  text: string;
  weight: RequirementWeight;
  /** What an interviewer is likely to probe for it. */
  probe: string;
  /** Question-bank section ids that cover it. */
  sections: string[];
}

/** One step of the interview loop, as candidates and the bank describe it. */
export interface InterviewStage {
  id: string;
  name: string;
  /** Typical length, e.g. "30 min". */
  length: string;
  /** Who runs it and how: "Recruiter, phone". */
  format: string;
  expect: string[];
  prepare: string[];
  confidence: Confidence;
  sources: string[];
}

/** A question a candidate reported being asked at Scotiabank. */
export interface ReportedQuestion {
  /** Paraphrased unless the source quotes it, kept short. */
  text: string;
  category: string;
  /** Role or team the report came from, when the source says. */
  context?: string;
  /** Question-bank id that answers it on this page. */
  answer?: string;
  confidence: Confidence;
  sources: string[];
}

export interface StackItem {
  name: string;
  /** What to know, or say, about it for this role. */
  note: string;
  confidence: Confidence;
  sources: string[];
}

export interface StackArea {
  id: string;
  title: string;
  items: StackItem[];
}

/** Something worth saying in "Why Scotiabank?", with where it comes from. */
export interface TalkingPoint {
  title: string;
  text: string;
  confidence: Confidence;
  sources: string[];
}

export interface AskThem {
  question: string;
  /** What the answer tells you, or why it lands well. */
  why: string;
}

export interface PlanDay {
  /** "Day 1", "Day before", "Morning of". */
  day: string;
  title: string;
  tasks: string[];
  /** Section ids this day works through. */
  sections: string[];
}

export interface ScotiabankSheet {
  requirements: Requirement[];
  stages: InterviewStage[];
  /** Loose facts about the loop that are not a stage of it. */
  process: Fact[];
  reported: ReportedQuestion[];
  stack: StackArea[];
  /** The wealth-onboarding domain, and what it means for the code. */
  domain: Fact[];
  /** The question bank, in reading order. */
  sections: PrepSection[];
  whyScotiabank: TalkingPoint[];
  askThem: AskThem[];
  plan: PlanDay[];
  checklists: Checklist[];
  sources: Source[];
}

// ── After the build has highlighted the code ────────────────────────────────

export interface RenderedScotiabankSheet
  extends Omit<ScotiabankSheet, "process" | "domain" | "sections"> {
  process: RenderedFact[];
  domain: RenderedFact[];
  sections: RenderedPrepSection[];
}
