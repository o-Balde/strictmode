/**
 * Emits the interview prep sheet with its snippets already highlighted.
 *
 * Same bargain as the question bank: Shiki runs once here, at build time, and
 * the page imports plain markup. The sheet is one statically prerendered route,
 * so its content ships as HTML and never as a client bundle. Because every
 * snippet lands in that one document, they use the compact token markup.
 *
 * Run via predev / prebuild. Output is gitignored.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PREP_SECTIONS } from "../src/data/interview-prep";
import type {
  PrepBlock,
  PrepQuestion,
  RenderedPrepBlock,
  RenderedPrepSection,
} from "../src/data/interview-prep";
import { highlightCompact } from "../src/lib/highlight";
import { hasStrayPrepMarker } from "../src/lib/prep";

const GENERATED_DIR = join(process.cwd(), "src", "generated");

/** IDs double as URL fragments, so they stay lowercase, hyphenated and stable. */
const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

async function buildPrep() {
  validateSheet();

  const sections: RenderedPrepSection[] = [];
  let snippets = 0;

  for (const section of PREP_SECTIONS) {
    const questions = [];
    for (const question of section.questions) {
      const body: RenderedPrepBlock[] = [];
      for (const block of question.body) {
        if (block.kind !== "code") {
          body.push(block);
          continue;
        }
        snippets += 1;
        body.push({ ...block, html: await highlightCompact(block.code, block.language) });
      }
      questions.push({ ...question, body });
    }
    sections.push({ ...section, questions });
  }

  mkdirSync(GENERATED_DIR, { recursive: true });
  const json = JSON.stringify({ sections });
  writeFileSync(join(GENERATED_DIR, "interview-prep.json"), json);

  const total = sections.reduce((count, section) => count + section.questions.length, 0);
  console.log(
    `[build-prep] ${total} questions · ${sections.length} sections · ` +
      `${snippets} snippets highlighted · ${(json.length / 1024).toFixed(0)} KB`,
  );
}

function validateSheet() {
  const ids = new Set<string>();
  const claim = (id: string, owner: string) => {
    if (!ID_PATTERN.test(id)) throw new Error(`${owner}: id "${id}" must be lowercase and hyphenated`);
    if (ids.has(id)) throw new Error(`Duplicate prep id: ${id}`);
    ids.add(id);
  };

  for (const section of PREP_SECTIONS) {
    claim(section.id, "section");
    if (section.questions.length === 0) throw new Error(`${section.id}: a section needs questions`);
    checkProse(section.id, "blurb", section.blurb);

    for (const question of section.questions) {
      claim(question.id, section.id);
      validateQuestion(question);
    }
  }
}

function validateQuestion(question: PrepQuestion) {
  const { id } = question;
  if (!question.question.trim() || !question.short.trim()) {
    throw new Error(`${id}: question and short answer are required`);
  }
  if (question.body.length === 0) throw new Error(`${id}: the body is empty`);
  if (question.docs && !question.docs.startsWith("https://")) {
    throw new Error(`${id}: docs must be an https URL`);
  }

  checkProse(id, "question", question.question);
  checkProse(id, "short", question.short);
  question.body.forEach((block, index) => validateBlock(id, index, block));
  for (const followUp of question.followUps ?? []) {
    checkProse(id, "follow-up question", followUp.q);
    checkProse(id, "follow-up answer", followUp.a);
  }
}

function validateBlock(id: string, index: number, block: PrepBlock) {
  const where = `block ${index} (${block.kind})`;
  switch (block.kind) {
    case "p":
    case "callout":
      return checkProse(id, where, block.text);
    case "list":
      if (block.items.length === 0) throw new Error(`${id}: ${where} has no items`);
      return block.items.forEach((item) => checkProse(id, where, item));
    case "table":
      for (const row of block.rows) {
        if (row.length !== block.head.length) {
          throw new Error(`${id}: ${where} has a row of ${row.length} cells under ${block.head.length} headers`);
        }
      }
      return [block.head, ...block.rows].flat().forEach((cell) => checkProse(id, where, cell));
    case "code":
    case "output":
      if (!(block.kind === "code" ? block.code : block.text).trim()) {
        throw new Error(`${id}: ${where} is empty`);
      }
      return;
  }
}

/** Only backtick and `**` spans are parsed; an unclosed one would print as punctuation. */
function checkProse(id: string, field: string, text: string) {
  if (hasStrayPrepMarker(text)) {
    throw new Error(`${id}: ${field} has an unclosed backtick or ** marker: "${text.slice(0, 80)}"`);
  }
}

buildPrep();
