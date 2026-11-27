/**
 * The Scotiabank concept review, topic by topic in the posting's order.
 */
import type { PrepBlock } from "../../interview-prep";
import { APIS, EVENTS } from "./architecture";
import { JAVA, NODE, SPRING } from "./backend";
import { DATABASES } from "./data";
import { AGILE, PROBLEM_SOLVING } from "./delivery";
import { FINANCE } from "./finance";
import { JAVASCRIPT, NEXTJS, REACT, TYPESCRIPT } from "./frontend";
import { CLOUD, CONTAINERS, DEVOPS } from "./platform";
import { SECURITY } from "./security";
import type { StudyCard, StudyTopic } from "./types";

export * from "./types";

/** The posting's order: core skills, then the "familiar" ones, then the assets. */
export const STUDY_TOPICS: StudyTopic[] = [
  JAVASCRIPT,
  TYPESCRIPT,
  REACT,
  NEXTJS,
  NODE,
  JAVA,
  SPRING,
  APIS,
  DATABASES,
  SECURITY,
  PROBLEM_SOLVING,
  DEVOPS,
  CLOUD,
  AGILE,
  EVENTS,
  CONTAINERS,
  FINANCE,
];

/**
 * A flashcard id: the topic, the front's first words for readability, and a
 * hash of the whole front, since fronts like "`==` vs `===`?" share their
 * words. Editing the answer keeps the id; rewording the front starts afresh.
 */
function cardId(topic: string, kind: StudyCard["kind"], front: string): string {
  const words = front
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 5);
  return [topic, kind === "concept" ? "c" : "q", ...words, fnv1a(front)].join("-");
}

/** FNV-1a, 32-bit, in base 36: short, stable, and good enough to tell a few hundred strings apart. */
function fnv1a(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

/** Every concept and question, as one deck in reading order. */
export function studyCards(topics: readonly StudyTopic[] = STUDY_TOPICS): StudyCard[] {
  return topics.flatMap((topic) => [
    ...topic.concepts.map((item): StudyCard => ({
      id: cardId(topic.id, "concept", item.term),
      topic: topic.id,
      kind: "concept",
      front: item.term,
      back: item.text,
    })),
    ...topic.questions.map((item): StudyCard => ({
      id: cardId(topic.id, "question", item.q),
      topic: topic.id,
      kind: "question",
      front: item.q,
      back: item.a,
    })),
  ]);
}

/** The code-carrying runs of the review, for the prep verifier. Pairs check as two snippets. */
export function studyBlockGroups(): { label: string; blocks: PrepBlock[] }[] {
  return STUDY_TOPICS.flatMap((topic) =>
    topic.parts.flatMap((part) => [
      ...(part.blocks ? [{ label: `study-${part.id}`, blocks: part.blocks }] : []),
      ...(part.pairs ?? []).flatMap((pair, index) => [
        { label: `study-${part.id}-${index}-before`, blocks: [pair.before] },
        { label: `study-${part.id}-${index}-after`, blocks: [pair.after] },
      ]),
    ]),
  );
}
