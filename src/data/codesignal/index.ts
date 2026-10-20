/**
 * The CodeSignal React + TypeScript practice run, in reading order.
 */
import type { PrepBlock, PrepSection } from "../interview-prep";
import { BUG_HUNT } from "./bug-hunt";
import { GRADER_PROOF, SPOT_THE_BUG, TYPESCRIPT_UNDER_PRESSURE } from "./drills";
import { FORMATS, PLATFORM } from "./intel";
import { FRONTEND_LEVELS, ICF_LEVELS } from "./levels";
import { MOCKS } from "./mocks";
import { CHECKLISTS, PLANS } from "./plan";
import { SOURCES } from "./sources";
import type { CodesignalSheet } from "./types";
import { WIDGETS } from "./widgets";

export * from "./types";

export const CODESIGNAL_SHEET: CodesignalSheet = {
  formats: FORMATS,
  platform: PLATFORM,
  levelGuides: [FRONTEND_LEVELS, ICF_LEVELS],
  mocks: MOCKS,
  bugHunt: BUG_HUNT,
  widgets: WIDGETS,
  drills: [SPOT_THE_BUG, TYPESCRIPT_UNDER_PRESSURE, GRADER_PROOF],
  plans: PLANS,
  checklists: CHECKLISTS,
  sources: SOURCES,
};

/** The page's question cards, in the prep sheet's own format. */
export const CODESIGNAL_PREP_SECTIONS: PrepSection[] = [...CODESIGNAL_SHEET.levelGuides, ...CODESIGNAL_SHEET.drills];

/**
 * Every other run of prose and code on the page, labelled, so the prep
 * verifier can type-check and execute these snippets like the sheet's own.
 */
export function codesignalBlockGroups(): { label: string; blocks: PrepBlock[] }[] {
  const sheet = CODESIGNAL_SHEET;
  return [
    ...sheet.platform.map((fact, index) => ({ label: `platform-${index}`, blocks: fact.body })),
    ...sheet.mocks.flatMap((mock) => [
      ...mock.levels.map((level, index) => ({ label: `${mock.id}-level-${index + 1}`, blocks: level.brief })),
      { label: `${mock.id}-debrief`, blocks: mock.debrief },
    ]),
    { label: "bug-hunt-intro", blocks: sheet.bugHunt.intro },
    ...sheet.bugHunt.tickets.map((ticket) => ({ label: `bug-${ticket.number}`, blocks: ticket.fix })),
    ...sheet.widgets.flatMap((widget) => [
      { label: `${widget.id}-brief`, blocks: widget.brief },
      { label: `${widget.id}-notes`, blocks: widget.notes },
    ]),
  ];
}
