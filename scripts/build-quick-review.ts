/**
 * Emits the quick review page with its snippets already highlighted.
 *
 * Same bargain as the prep sheet: Shiki runs once, here, and the page imports
 * plain markup. Every snippet lands in one statically rendered document, so
 * they use the compact token markup.
 *
 * Run via predev / prebuild. Output is gitignored.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { REVIEW_SECTIONS } from "../src/data/quick-review";
import type { PrepBlock, RenderedPrepBlock } from "../src/data/interview-prep";
import type { RenderedReviewSection, ReviewQuestion } from "../src/data/quick-review";
import { highlightCompact } from "../src/lib/highlight";
import { hasStrayPrepMarker } from "../src/lib/prep";
import { REVIEW_TOPICS } from "../src/lib/quick-review";

const GENERATED_DIR = join(process.cwd(), "src", "generated");

/** IDs double as URL fragments, so they stay lowercase, hyphenated and stable. */
const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

let snippets = 0;

async function renderBlocks(blocks: readonly PrepBlock[]): Promise<RenderedPrepBlock[]> {
  const rendered: RenderedPrepBlock[] = [];
  for (const block of blocks) {
    if (block.kind !== "code") {
      rendered.push(block);
      continue;
    }
    snippets += 1;
    rendered.push({ ...block, html: await highlightCompact(block.code, block.language) });
  }
  return rendered;
}

async function buildQuickReview() {
  validate();

  const sections: RenderedReviewSection[] = [];
  for (const section of REVIEW_SECTIONS) {
    const questions = [];
    for (const question of section.questions) {
      questions.push({
        ...question,
        prompt: question.prompt ? await renderBlocks(question.prompt) : undefined,
        body: await renderBlocks(question.body),
      });
    }
    sections.push({ ...section, questions });
  }

  mkdirSync(GENERATED_DIR, { recursive: true });
  const json = JSON.stringify({ sections });
  writeFileSync(join(GENERATED_DIR, "quick-review.json"), json);

  const questions = sections.flatMap((section) => section.questions);
  const demos = new Set(questions.flatMap((question) => (question.demo ? [question.demo.id] : [])));
  console.log(
    `[build-quick-review] ${questions.length} questions · ${sections.length} sections · ` +
      `${demos.size} demos · ${snippets} snippets highlighted · ${(json.length / 1024).toFixed(0)} KB`,
  );
}

function validate() {
  const ids = new Set<string>();
  const claim = (id: string, owner: string) => {
    if (!ID_PATTERN.test(id)) throw new Error(`${owner}: id "${id}" must be lowercase and hyphenated`);
    if (ids.has(id)) throw new Error(`Duplicate quick review id: ${id}`);
    ids.add(id);
  };

  for (const section of REVIEW_SECTIONS) {
    claim(section.id, "section");
    if (section.questions.length === 0) throw new Error(`${section.id}: a section needs questions`);
    checkProse(section.id, "blurb", section.blurb);
    for (const question of section.questions) {
      claim(question.id, section.id);
      validateQuestion(question);
    }
  }
}

function validateQuestion(question: ReviewQuestion) {
  const { id } = question;
  if (!question.question.trim() || !question.short.trim()) throw new Error(`${id}: question and short answer are required`);
  if (question.body.length === 0) throw new Error(`${id}: the body is empty`);
  if (question.topics.length === 0) throw new Error(`${id}: a question needs a topic`);
  for (const topic of question.topics) {
    if (!REVIEW_TOPICS.includes(topic)) throw new Error(`${id}: unknown topic ${topic}`);
  }
  if (new Set(question.topics).size !== question.topics.length) throw new Error(`${id}: a topic is listed twice`);
  if (question.goodToHear.length === 0) throw new Error(`${id}: "good to hear" needs at least one point`);
  if (question.links.length === 0) throw new Error(`${id}: a question needs at least one link`);
  for (const link of question.links) {
    if (!link.url.startsWith("https://")) throw new Error(`${id}: link "${link.title}" must be an https URL`);
  }

  checkProse(id, "question", question.question);
  checkProse(id, "short", question.short);
  if (question.demo) checkProse(id, "demo hint", question.demo.hint);
  question.goodToHear.forEach((point) => checkProse(id, "good to hear", point));
  [...(question.prompt ?? []), ...question.body].forEach((block, index) => validateBlock(id, index, block));
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
      if (!(block.kind === "code" ? block.code : block.text).trim()) throw new Error(`${id}: ${where} is empty`);
      return;
  }
}

/** Only backtick and `**` spans are parsed; an unclosed one would print as punctuation. */
function checkProse(id: string, field: string, text: string) {
  if (hasStrayPrepMarker(text)) {
    throw new Error(`${id}: ${field} has an unclosed backtick or ** marker: "${text.slice(0, 80)}"`);
  }
}

buildQuickReview();
