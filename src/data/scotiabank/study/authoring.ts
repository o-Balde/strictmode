/**
 * Authoring helpers for the concept review. Topics are long, so concepts,
 * questions and before/after pairs are written as calls, the way the prep
 * sheet writes its blocks.
 */
import type { PrepCode } from "../../interview-prep";
import type { StudyConcept, StudyPair, StudyQuestion } from "./types";

export const concept = (term: string, text: string): StudyConcept => ({ term, text });

export const qa = (q: string, a: string): StudyQuestion => ({ q, a });

export const pair = (
  title: string,
  since: string,
  note: string,
  code: { before: PrepCode; after: PrepCode },
): StudyPair => ({ title, since, note, ...code });

export { bash, dockerfile, groovy, http, java, js, json, list, output, p, say, sql, steps, table, trap, ts, tsx, xml, yaml } from "../../interview-prep/blocks";
