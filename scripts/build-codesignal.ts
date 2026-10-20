/**
 * Emits the CodeSignal practice page with its code already highlighted.
 *
 * Same bargain as the prep sheet: Shiki runs here, once, and the page imports
 * plain markup. The specs and reference solutions are read straight from the
 * runnable kit in practice/codesignal, so what the page shows is exactly what
 * `npm run level` grades. Each spec's `it(...)` names become the level's
 * checklist.
 *
 * Run via predev / prebuild. Output is gitignored.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { CODESIGNAL_SHEET } from "../src/data/codesignal";
import type {
  KitFile,
  PrepBlock,
  PrepSection,
  RenderedCodesignalSheet,
  RenderedKitFile,
  RenderedPrepBlock,
  RenderedPrepSection,
  RenderedSpec,
} from "../src/data";
import { highlightCompact } from "../src/lib/highlight";
import { hasStrayPrepMarker } from "../src/lib/prep";

const KIT_DIR = join(process.cwd(), "practice", "codesignal");
const GENERATED_DIR = join(process.cwd(), "src", "generated");
const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const TEST_NAME = /\bit\(\s*(["'`])((?:\\.|(?!\1).)*)\1/g;

let snippets = 0;
let checks = 0;

async function buildCodesignal() {
  validate();
  const sheet = CODESIGNAL_SHEET;

  const rendered: RenderedCodesignalSheet = {
    formats: sheet.formats,
    platform: await Promise.all(sheet.platform.map(async (fact) => ({ ...fact, body: await renderBlocks(fact.body) }))),
    levelGuides: await Promise.all(sheet.levelGuides.map(renderSection)),
    mocks: await Promise.all(
      sheet.mocks.map(async (mock) => ({
        ...mock,
        provided: await Promise.all(mock.provided.map(renderKitFile)),
        levels: await Promise.all(
          mock.levels.map(async (level) => ({
            ...level,
            brief: await renderBlocks(level.brief),
            spec: await renderSpec(level.spec),
          })),
        ),
        debrief: await renderBlocks(mock.debrief),
        solution: await Promise.all(mock.solution.map(renderKitFile)),
      })),
    ),
    bugHunt: {
      ...sheet.bugHunt,
      intro: await renderBlocks(sheet.bugHunt.intro),
      tickets: await Promise.all(
        sheet.bugHunt.tickets.map(async (ticket) => ({
          ...ticket,
          fix: await renderBlocks(ticket.fix),
          spec: await renderSpec(ticket.spec),
        })),
      ),
      provided: await Promise.all(sheet.bugHunt.provided.map(renderKitFile)),
      solution: await Promise.all(sheet.bugHunt.solution.map(renderKitFile)),
    },
    widgets: await Promise.all(
      sheet.widgets.map(async (widget) => ({
        ...widget,
        brief: await renderBlocks(widget.brief),
        spec: await renderSpec(widget.spec),
        notes: await renderBlocks(widget.notes),
        solution: await Promise.all(widget.solution.map(renderKitFile)),
      })),
    ),
    drills: await Promise.all(sheet.drills.map(renderSection)),
    plans: sheet.plans,
    checklists: sheet.checklists,
    sources: sheet.sources,
    totalChecks: 0,
  };
  rendered.totalChecks = checks;

  mkdirSync(GENERATED_DIR, { recursive: true });
  const json = JSON.stringify(rendered);
  writeFileSync(join(GENERATED_DIR, "codesignal.json"), json);

  console.log(
    `[build-codesignal] ${sheet.mocks.length} mocks · ${sheet.widgets.length} widgets · ` +
      `${sheet.bugHunt.tickets.length} bugs · ${checks} graded checks · ${snippets} snippets highlighted · ` +
      `${(json.length / 1024).toFixed(0)} KB`,
  );
}

async function renderSection(section: PrepSection): Promise<RenderedPrepSection> {
  return {
    ...section,
    questions: await Promise.all(
      section.questions.map(async (question) => ({ ...question, body: await renderBlocks(question.body) })),
    ),
  };
}

async function renderBlocks(blocks: PrepBlock[]): Promise<RenderedPrepBlock[]> {
  return Promise.all(
    blocks.map(async (block) => {
      if (block.kind !== "code") return block;
      snippets += 1;
      return { ...block, html: await highlightCompact(block.code, block.language) };
    }),
  );
}

function readKit(path: string): string {
  return readFileSync(join(KIT_DIR, path), "utf8").trimEnd();
}

function languageOf(path: string): RenderedKitFile["language"] {
  const extension = extname(path);
  if (extension === ".tsx") return "tsx";
  if (extension === ".json") return "json";
  return "typescript";
}

async function renderKitFile(file: KitFile): Promise<RenderedKitFile> {
  const code = readKit(file.path);
  const language = languageOf(file.path);
  snippets += 1;
  return { ...file, language, html: await highlightCompact(code, language), lines: code.split("\n").length };
}

async function renderSpec(path: string): Promise<RenderedSpec> {
  const code = readKit(path);
  const names = [...code.matchAll(TEST_NAME)].map((match) => match[2].replace(/\\(.)/g, "$1"));
  checks += names.length;
  snippets += 1;
  return { path, html: await highlightCompact(code, languageOf(path)), checks: names };
}

function validate() {
  const sheet = CODESIGNAL_SHEET;
  const ids = new Set<string>();
  const claim = (id: string, owner: string) => {
    if (!ID_PATTERN.test(id)) throw new Error(`${owner}: id "${id}" must be lowercase and hyphenated`);
    if (ids.has(id)) throw new Error(`Duplicate id on the CodeSignal page: ${id}`);
    ids.add(id);
  };
  const prose = (owner: string, text: string) => {
    if (hasStrayPrepMarker(text)) throw new Error(`${owner}: unclosed backtick or ** marker: "${text.slice(0, 80)}"`);
  };
  const blocks = (owner: string, list: PrepBlock[]) =>
    list.forEach((block, index) => {
      const where = `${owner} block ${index}`;
      if (block.kind === "p" || block.kind === "callout") prose(where, block.text);
      if (block.kind === "list") block.items.forEach((item) => prose(where, item));
      if (block.kind === "table") {
        for (const row of block.rows) {
          if (row.length !== block.head.length) throw new Error(`${where}: a row has ${row.length} cells under ${block.head.length} headers`);
        }
        [block.head, ...block.rows].flat().forEach((cell) => prose(where, cell));
      }
    });
  const kitFile = (owner: string, path: string) => {
    if (!existsSync(join(KIT_DIR, path))) throw new Error(`${owner}: practice/codesignal/${path} does not exist`);
  };
  const sourceIds = new Set(sheet.sources.map((source) => source.id));
  const cites = (owner: string, list: string[]) =>
    list.forEach((id) => {
      if (!sourceIds.has(id)) throw new Error(`${owner}: unknown source "${id}"`);
    });

  for (const source of sheet.sources) {
    claim(source.id, "source");
    if (!source.url.startsWith("https://")) throw new Error(`${source.id}: url must be https`);
  }
  for (const format of sheet.formats) {
    claim(format.id, "format");
    prose(format.id, format.summary);
    format.tells.forEach((tell) => prose(format.id, tell));
    for (const item of format.claims) {
      prose(format.id, item.text);
      cites(format.id, item.sources);
    }
  }
  sheet.platform.forEach((fact) => {
    blocks(fact.title, fact.body);
    cites(fact.title, fact.sources);
  });
  for (const section of [...sheet.levelGuides, ...sheet.drills]) {
    claim(section.id, "section");
    prose(section.id, section.blurb);
    for (const question of section.questions) {
      claim(question.id, section.id);
      prose(question.id, question.question);
      prose(question.id, question.short);
      blocks(question.id, question.body);
      question.followUps?.forEach((followUp) => {
        prose(question.id, followUp.q);
        prose(question.id, followUp.a);
      });
    }
  }
  for (const mock of sheet.mocks) {
    claim(mock.id, "mock");
    cites(mock.id, mock.sources);
    if (mock.levels.length !== 4) throw new Error(`${mock.id}: a mock has four levels`);
    [...mock.provided, ...mock.solution].forEach((file) => kitFile(mock.id, file.path));
    mock.levels.forEach((level, index) => {
      const owner = `${mock.id} level ${index + 1}`;
      kitFile(owner, level.spec);
      blocks(owner, level.brief);
      level.traps.forEach((text) => prose(owner, text));
    });
    blocks(`${mock.id} debrief`, mock.debrief);
  }
  const hunt = sheet.bugHunt;
  claim(hunt.id, "bug hunt");
  blocks(hunt.id, hunt.intro);
  hunt.rules.forEach((rule) => prose(hunt.id, rule));
  [...hunt.provided, ...hunt.solution].forEach((file) => kitFile(hunt.id, file.path));
  for (const ticket of hunt.tickets) {
    const owner = `bug ${ticket.number}`;
    kitFile(owner, ticket.spec);
    [ticket.title, ticket.symptom, ticket.expected, ticket.hint].forEach((text) => prose(owner, text));
    blocks(owner, ticket.fix);
  }
  for (const widget of sheet.widgets) {
    claim(widget.id, "widget");
    cites(widget.id, widget.sources);
    kitFile(widget.id, widget.spec);
    widget.solution.forEach((file) => kitFile(widget.id, file.path));
    blocks(widget.id, widget.brief);
    blocks(widget.id, widget.notes);
  }
  for (const plan of sheet.plans) plan.steps.forEach((step) => prose(plan.id, step.detail));
  for (const list of sheet.checklists) {
    claim(list.id, "checklist");
    list.items.forEach((item) => prose(list.id, item));
  }
}

buildCodesignal();
