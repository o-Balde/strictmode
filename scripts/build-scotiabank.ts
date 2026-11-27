/**
 * Emits the Scotiabank prep page and its concept review, with their snippets
 * already highlighted.
 *
 * Same bargain as the prep sheet: Shiki runs once, here, and the pages import
 * plain markup. Validation also checks the pages' own bookkeeping: every
 * citation names a known source, every "answered here" link, plan day and
 * "go deeper" link points at a section or question that exists, and every
 * flashcard has an id of its own, so ticks saved in a browser stay attached.
 *
 * Run via predev / prebuild. Output is gitignored.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SCOTIABANK_PAGE_ANCHORS, SCOTIABANK_SHEET } from "../src/data/scotiabank";
import type { RenderedScotiabankSheet } from "../src/data/scotiabank";
import { STUDY_TOPICS, studyCards } from "../src/data/scotiabank/study";
import type { RenderedStudyPart, RenderedStudySheet, StudyPart } from "../src/data/scotiabank/study";
import type { Fact, RenderedFact } from "../src/data/codesignal";
import type { PrepBlock, PrepCode, PrepSection, RenderedPrepBlock, RenderedPrepCode, RenderedPrepSection } from "../src/data/interview-prep";
import { highlightCompact } from "../src/lib/highlight";
import { hasStrayPrepMarker } from "../src/lib/prep";

const GENERATED_DIR = join(process.cwd(), "src", "generated");
const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

let snippets = 0;

async function buildScotiabank() {
  validate();
  validateStudy();
  const sheet = SCOTIABANK_SHEET;

  const rendered: RenderedScotiabankSheet = {
    ...sheet,
    process: await Promise.all(sheet.process.map(renderFact)),
    domain: await Promise.all(sheet.domain.map(renderFact)),
    sections: await Promise.all(sheet.sections.map(renderSection)),
  };
  mkdirSync(GENERATED_DIR, { recursive: true });
  const json = JSON.stringify(rendered);
  writeFileSync(join(GENERATED_DIR, "scotiabank.json"), json);

  const questions = sheet.sections.reduce((count, section) => count + section.questions.length, 0);
  console.log(
    `[build-scotiabank] ${questions} questions · ${sheet.sections.length} sections · ` +
      `${sheet.reported.length} reported questions · ${sheet.sources.length} sources · ` +
      `${snippets} snippets highlighted · ${(json.length / 1024).toFixed(0)} KB`,
  );

  snippets = 0;
  const study = await renderStudy();
  const studyJson = JSON.stringify(study);
  writeFileSync(join(GENERATED_DIR, "scotiabank-study.json"), studyJson);

  const concepts = STUDY_TOPICS.reduce((count, topic) => count + topic.concepts.length, 0);
  const pairs = STUDY_TOPICS.reduce((count, topic) => count + topic.parts.reduce((n, part) => n + (part.pairs?.length ?? 0), 0), 0);
  console.log(
    `[build-scotiabank] study: ${STUDY_TOPICS.length} topics · ${concepts} concepts · ` +
      `${study.cards.length - concepts} questions · ${study.cards.length} flashcards · ${pairs} before/after pairs · ` +
      `${snippets} snippets highlighted · ${(studyJson.length / 1024).toFixed(0)} KB`,
  );
}

async function renderCode(block: PrepCode): Promise<RenderedPrepCode> {
  snippets += 1;
  return { ...block, html: await highlightCompact(block.code, block.language) };
}

async function renderBlocks(blocks: PrepBlock[]): Promise<RenderedPrepBlock[]> {
  const out: RenderedPrepBlock[] = [];
  for (const block of blocks) out.push(block.kind === "code" ? await renderCode(block) : block);
  return out;
}

async function renderFact(fact: Fact): Promise<RenderedFact> {
  return { ...fact, body: await renderBlocks(fact.body) };
}

async function renderSection(section: PrepSection): Promise<RenderedPrepSection> {
  const questions = [];
  for (const question of section.questions) {
    questions.push({ ...question, body: await renderBlocks(question.body) });
  }
  return { ...section, questions };
}

async function renderPart(part: StudyPart): Promise<RenderedStudyPart> {
  const pairs = [];
  for (const pair of part.pairs ?? []) {
    pairs.push({ ...pair, before: await renderCode(pair.before), after: await renderCode(pair.after) });
  }
  return {
    ...part,
    blocks: part.blocks ? await renderBlocks(part.blocks) : undefined,
    pairs: part.pairs ? pairs : undefined,
  };
}

async function renderStudy(): Promise<RenderedStudySheet> {
  const sectionTitle = new Map<string, string>([
    ...SCOTIABANK_SHEET.sections.map((section): [string, string] => [section.id, section.title]),
    ["domain", "Wealth onboarding"],
  ]);
  const topics = [];
  for (const topic of STUDY_TOPICS) {
    const parts = [];
    for (const part of topic.parts) parts.push(await renderPart(part));
    topics.push({ ...topic, parts, bankTitles: topic.bank.map((id) => sectionTitle.get(id) ?? id) });
  }
  return { topics, cards: studyCards() };
}

// ── Validation ──────────────────────────────────────────────────────────────

function prose(owner: string, text: string) {
  if (!text.trim()) throw new Error(`${owner}: empty text`);
  if (hasStrayPrepMarker(text)) throw new Error(`${owner}: unclosed backtick or ** marker: "${text.slice(0, 80)}"`);
}

function checkBlocks(owner: string, list: PrepBlock[]) {
  list.forEach((block, index) => {
    const where = `${owner} block ${index} (${block.kind})`;
    switch (block.kind) {
      case "p":
      case "callout":
        return prose(where, block.text);
      case "list":
        if (block.items.length === 0) throw new Error(`${where}: no items`);
        return block.items.forEach((item) => prose(where, item));
      case "table":
        for (const row of block.rows) {
          if (row.length !== block.head.length) {
            throw new Error(`${where}: a row of ${row.length} cells under ${block.head.length} headers`);
          }
        }
        return [...block.head.filter((cell) => cell !== ""), ...block.rows.flat()].forEach((cell) => prose(where, cell));
      case "code":
      case "output":
        if (!(block.kind === "code" ? block.code : block.text).trim()) throw new Error(`${where}: empty`);
        return;
    }
  });
}

function https(owner: string, url: string) {
  if (!url.startsWith("https://")) throw new Error(`${owner}: url must be https: ${url}`);
}

function validate() {
  const sheet = SCOTIABANK_SHEET;
  const ids = new Set<string>();
  const claim = (id: string, owner: string) => {
    if (!ID_PATTERN.test(id)) throw new Error(`${owner}: id "${id}" must be lowercase and hyphenated`);
    if (ids.has(id)) throw new Error(`Duplicate id on the Scotiabank page: ${id}`);
    ids.add(id);
  };

  const sourceIds = new Set(sheet.sources.map((source) => source.id));
  const cites = (owner: string, list: string[], allowNone = false) => {
    if (list.length === 0 && !allowNone) throw new Error(`${owner}: cites no source`);
    list.forEach((id) => {
      if (!sourceIds.has(id)) throw new Error(`${owner}: unknown source "${id}"`);
    });
  };

  for (const source of sheet.sources) {
    claim(source.id, "source");
    https(source.id, source.url);
    if (source.confidence === "inferred") throw new Error(`${source.id}: a source can't be "inferred"`);
    prose(source.id, source.note);
  }

  const questionIds = new Set<string>();
  for (const section of sheet.sections) {
    claim(section.id, "section");
    prose(section.id, section.blurb);
    if (section.questions.length === 0) throw new Error(`${section.id}: a section needs questions`);
    for (const question of section.questions) {
      claim(question.id, section.id);
      questionIds.add(question.id);
      prose(question.id, question.question);
      prose(question.id, question.short);
      checkBlocks(question.id, question.body);
      if (question.docs) https(question.id, question.docs);
      question.followUps?.forEach((followUp) => {
        prose(question.id, followUp.q);
        prose(question.id, followUp.a);
      });
    }
  }

  sheet.requirements.forEach((requirement, index) => {
    const owner = `requirement ${index + 1}`;
    prose(owner, requirement.text);
    prose(owner, requirement.probe);
    pointsAtPrepPage(owner, requirement.sections);
  });
  for (const stage of sheet.stages) {
    claim(stage.id, "stage");
    [stage.name, stage.length, stage.format, ...stage.expect, ...stage.prepare].forEach((text) => prose(stage.id, text));
    cites(stage.id, stage.sources);
  }
  for (const fact of [...sheet.process, ...sheet.domain]) {
    prose(fact.title, fact.title);
    checkBlocks(fact.title, fact.body);
    cites(fact.title, fact.sources, fact.confidence === "inferred");
  }
  sheet.reported.forEach((item, index) => {
    const owner = `reported question ${index + 1}`;
    prose(owner, item.text);
    cites(owner, item.sources);
    if (item.answer && !questionIds.has(item.answer)) throw new Error(`${owner}: answer "${item.answer}" is not a question id`);
  });
  for (const area of sheet.stack) {
    claim(area.id, "stack area");
    for (const item of area.items) {
      prose(`${area.id}: ${item.name}`, item.note);
      cites(`${area.id}: ${item.name}`, item.sources);
    }
  }
  for (const point of sheet.whyScotiabank) {
    prose(point.title, point.text);
    cites(point.title, point.sources);
  }
  sheet.askThem.forEach((item, index) => {
    prose(`ask ${index + 1}`, item.question);
    prose(`ask ${index + 1}`, item.why);
  });
  for (const day of sheet.plan) {
    day.tasks.forEach((task) => prose(day.day, task));
    pointsAtPrepPage(day.day, day.sections);
  }
  for (const list of sheet.checklists) {
    claim(list.id, "checklist");
    list.items.forEach((item) => prose(list.id, item));
  }
}

/** Requirements, plan days and study topics link to sections and anchors of the prep page. */
function pointsAtPrepPage(owner: string, list: string[]) {
  const anchors = new Set<string>([...SCOTIABANK_SHEET.sections.map((section) => section.id), ...SCOTIABANK_PAGE_ANCHORS]);
  list.forEach((id) => {
    if (!anchors.has(id)) throw new Error(`${owner}: points at unknown section "${id}"`);
  });
}

function validateStudy() {
  const ids = new Set<string>();
  const claim = (id: string, owner: string) => {
    if (!ID_PATTERN.test(id)) throw new Error(`${owner}: id "${id}" must be lowercase and hyphenated`);
    if (ids.has(id)) throw new Error(`Duplicate id on the study page: ${id}`);
    ids.add(id);
  };

  for (const topic of STUDY_TOPICS) {
    claim(topic.id, "topic");
    [topic.short, topic.title, topic.jd, topic.summary].forEach((text) => prose(topic.id, text));
    if (topic.concepts.length === 0 || topic.questions.length === 0) throw new Error(`${topic.id}: needs concepts and questions`);
    topic.concepts.forEach((item) => {
      prose(`${topic.id} concept`, item.term);
      prose(`${topic.id}: ${item.term}`, item.text);
    });
    topic.questions.forEach((item) => {
      prose(`${topic.id} question`, item.q);
      prose(`${topic.id}: ${item.q}`, item.a);
    });
    for (const part of topic.parts) {
      claim(part.id, topic.id);
      prose(part.id, part.title);
      if (part.intro) prose(part.id, part.intro);
      if (!part.blocks?.length && !part.pairs?.length) throw new Error(`${part.id}: a part needs blocks or pairs`);
      if (part.blocks) checkBlocks(part.id, part.blocks);
      part.pairs?.forEach((pair, index) => {
        const owner = `${part.id} pair ${index + 1}`;
        [pair.title, pair.since, pair.note].forEach((text) => prose(owner, text));
        checkBlocks(owner, [pair.before, pair.after]);
      });
    }
    topic.news.forEach((item, index) => {
      prose(`${topic.id} news ${index + 1}`, item.text);
      https(`${topic.id} news ${index + 1}`, item.url);
    });
    topic.docs.forEach((link) => {
      prose(`${topic.id} docs`, link.label);
      https(`${topic.id} docs`, link.url);
    });
    if (topic.bank.length === 0) throw new Error(`${topic.id}: link at least one prep-page section`);
    pointsAtPrepPage(topic.id, topic.bank);
  }

  const cardIds = new Set<string>();
  for (const card of studyCards()) {
    if (cardIds.has(card.id)) throw new Error(`Two flashcards share the id "${card.id}": reword one front`);
    cardIds.add(card.id);
  }
}

buildScotiabank();
