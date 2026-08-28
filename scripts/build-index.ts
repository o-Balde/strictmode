/**
 * Emits everything the client needs, at build time.
 *
 * The bank is ~2.3 MB of TypeScript and must never reach the browser, but the
 * client still has to pick a drill locally (progress lives in localStorage, so
 * the server cannot know what has been seen). The compromise is a packed,
 * columnar index carrying only what selection and the coverage rings need.
 *
 * An object-per-question index measures 110 KB; columnar packing halves the
 * JSON overhead and gzips to roughly 22 KB.
 *
 * Also emits one static JSON payload per question into public/q/, with the
 * Shiki markup already rendered. Those are immutable content served by the CDN,
 * so reading a question costs no function invocation and no Active CPU.
 *
 * Run via predev / prebuild. Output is gitignored.
 */
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS, TOPIC_METADATA } from "../src/data";
import type { QuizQuestion, QuestionSubject, QuestionCategory } from "../src/data/types";
import { highlight } from "../src/lib/highlight";
import type { QuestionPayload } from "../src/lib/question-payload";

const OUT_DIR = join(process.cwd(), "src", "generated");
/** Static payloads, served straight off the CDN — no function invocation. */
const PAYLOAD_DIR = join(process.cwd(), "public", "q");

/** base36 keeps every enum ordinal to a single character. */
const encode = (n: number) => n.toString(36);

function column<T extends string>(values: T[]): { table: T[]; packed: string } {
  const table: T[] = [];
  const seen = new Map<T, number>();
  let packed = "";
  for (const v of values) {
    let i = seen.get(v);
    if (i === undefined) {
      i = table.length;
      table.push(v);
      seen.set(v, i);
    }
    packed += encode(i);
  }
  if (table.length > 36) throw new Error(`column has ${table.length} distinct values; > 36 breaks base36 packing`);
  return { table, packed };
}

async function build() {
  const qs: QuizQuestion[] = ALL_QUESTIONS;

  const subject = column(qs.map((q) => q.subject));
  const category = column(qs.map((q) => q.category));
  const type = column(qs.map((q) => q.type));
  const level = column(qs.map((q) => q.level));

  for (const q of qs) {
    if (q.estimatedMinutes < 0 || q.estimatedMinutes > 35) {
      throw new Error(`${q.id}: estimatedMinutes ${q.estimatedMinutes} does not fit base36 packing`);
    }
  }

  const index = {
    v: 1 as const,
    count: qs.length,
    ids: qs.map((q) => q.id),
    // Titles ride along so the dashboard queue can render without fetching any
    // bodies at all. ~35 KB raw, and it removes one request per home view.
    titles: qs.map((q) => q.title),
    subjects: subject.table,
    categories: category.table,
    types: type.table,
    levels: level.table,
    s: subject.packed,
    c: category.packed,
    t: type.packed,
    l: level.packed,
    m: qs.map((q) => encode(q.estimatedMinutes)).join(""),
  };

  // Bank totals drive the coverage rings and the mastery denominators without
  // the client having to count anything.
  const bySubject = {} as Record<QuestionSubject, number>;
  const byCategory = {} as Record<QuestionCategory, number>;
  for (const q of qs) {
    bySubject[q.subject] = (bySubject[q.subject] ?? 0) + 1;
    byCategory[q.category] = (byCategory[q.category] ?? 0) + 1;
  }

  // Only subjects that actually have questions get a card. Three of the sixteen
  // in TOPIC_METADATA (narrowing, design-patterns, event-loop) have none.
  const subjects = (Object.keys(TOPIC_METADATA) as QuestionSubject[])
    .filter((s) => (bySubject[s] ?? 0) > 0)
    .map((s) => ({
      subject: s,
      title: TOPIC_METADATA[s].title,
      category: TOPIC_METADATA[s].category,
      description: TOPIC_METADATA[s].description,
      recommendedLevel: TOPIC_METADATA[s].recommendedLevel,
      total: bySubject[s],
    }))
    .sort((a, b) => b.total - a.total);

  const codePool = qs.filter((q) => q.type === "live_code" || q.type === "fix").length;

  const stats = {
    total: qs.length,
    codePool,
    bySubject,
    byCategory,
    subjects,
    categories: (Object.keys(byCategory) as QuestionCategory[]).sort(
      (a, b) => byCategory[b] - byCategory[a],
    ),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const indexJson = JSON.stringify(index);
  writeFileSync(join(OUT_DIR, "question-index.json"), indexJson);
  writeFileSync(join(OUT_DIR, "bank-stats.json"), JSON.stringify(stats, null, 2));

  const payloadBytes = await writePayloads(qs);

  console.log(
    `[build-index] ${qs.length} questions · index ${(indexJson.length / 1024).toFixed(1)} KB raw · ` +
      `${subjects.length}/${Object.keys(TOPIC_METADATA).length} subjects populated · ${codePool} code questions`,
  );
  console.log(
    `[build-index] ${qs.length} static payloads -> public/q/ · ` +
      `${(payloadBytes / 1024 / 1024).toFixed(2)} MB · highlighting done at build`,
  );
}

/** One immutable JSON file per question, with the snippet already highlighted. */
async function writePayloads(qs: QuizQuestion[]): Promise<number> {
  rmSync(PAYLOAD_DIR, { recursive: true, force: true });
  mkdirSync(PAYLOAD_DIR, { recursive: true });

  let bytes = 0;
  for (const q of qs) {
    const payload: QuestionPayload = {
      id: q.id,
      title: q.title,
      prompt: q.prompt,
      level: q.level,
      type: q.type,
      category: q.category,
      subject: q.subject,
      subjectTitle: TOPIC_METADATA[q.subject]?.title ?? q.subject,
      tags: q.tags,
      codeSnippet: q.codeSnippet ?? null,
      codeHtml: q.codeSnippet ? await highlight(q.codeSnippet, q.codeLanguage) : null,
      codeLanguage: q.codeLanguage ?? "typescript",
      explanation: q.explanation,
      interviewLine: q.interviewLine,
      misconception: q.misconception,
      hints: q.hints ?? [],
      docsUrl: q.bestPracticeRef,
      estimatedMinutes: q.estimatedMinutes,
      options: (q.options ?? []).map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
        explanation: o.explanation,
      })),
      correctAnswer: q.correctAnswer ?? (q.options ?? []).find((o) => o.isCorrect)?.id ?? "",
    };
    const json = JSON.stringify(payload);
    bytes += json.length;
    writeFileSync(join(PAYLOAD_DIR, `${q.id}.json`), json);
  }
  return bytes;
}

build();
