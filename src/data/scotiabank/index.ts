/**
 * The Scotiabank Full Stack Developer (Entry Level) prep page, in reading order.
 */
import type { PrepBlock, PrepSection } from "../interview-prep";
import { SB_DESIGN, SB_EVENTS, SB_MICROSERVICES, SB_REST } from "./architecture";
import { SB_JAVA, SB_NODE, SB_SPRING } from "./backend";
import { SB_BEHAVIORAL } from "./behavioral";
import { SB_BUILDS, SB_CODING } from "./coding";
import { SB_MONGO, SB_SQL } from "./data";
import { SB_AGILE, SB_TESTING } from "./delivery";
import { DOMAIN } from "./domain";
import { SB_JAVASCRIPT, SB_NEXTJS, SB_REACT } from "./frontend";
import { PROCESS, REPORTED, REQUIREMENTS, STAGES } from "./intel";
import { ASK_THEM, CHECKLISTS, PLAN, WHY_SCOTIABANK } from "./plan";
import { SB_CLOUD, SB_DEVOPS } from "./platform";
import { SB_SECURITY } from "./security";
import { SOURCES } from "./sources";
import { STACK } from "./stack";
import type { ScotiabankSheet } from "./types";

export * from "./types";

/** The question bank, in the order a full-stack interview tends to walk it. */
export const SCOTIABANK_SECTIONS: PrepSection[] = [
  SB_JAVASCRIPT,
  SB_REACT,
  SB_NEXTJS,
  SB_NODE,
  SB_JAVA,
  SB_SPRING,
  SB_REST,
  SB_MICROSERVICES,
  SB_EVENTS,
  SB_DESIGN,
  SB_SQL,
  SB_MONGO,
  SB_CLOUD,
  SB_DEVOPS,
  SB_SECURITY,
  SB_TESTING,
  SB_AGILE,
  SB_CODING,
  SB_BUILDS,
  SB_BEHAVIORAL,
];

export const SCOTIABANK_SHEET: ScotiabankSheet = {
  requirements: REQUIREMENTS,
  stages: STAGES,
  process: PROCESS,
  reported: REPORTED,
  stack: STACK,
  domain: DOMAIN,
  sections: SCOTIABANK_SECTIONS,
  whyScotiabank: WHY_SCOTIABANK,
  askThem: ASK_THEM,
  plan: PLAN,
  checklists: CHECKLISTS,
  sources: SOURCES,
};

/** Page anchors outside the question bank that requirements and plan days may point at. */
export const SCOTIABANK_PAGE_ANCHORS = ["domain"] as const;

/** The prose-and-code runs outside the question cards, for the prep verifier. */
export function scotiabankBlockGroups(): { label: string; blocks: PrepBlock[] }[] {
  return [
    ...PROCESS.map((fact, index) => ({ label: `process-${index}`, blocks: fact.body })),
    ...DOMAIN.map((fact, index) => ({ label: `domain-${index}`, blocks: fact.body })),
  ];
}
