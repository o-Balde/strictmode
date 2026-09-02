import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BINARY_CARDS } from "../src/data/binary-cards";
import type { BinaryCardPayload, BinaryCategory } from "../src/data/binary-types";
import type { QuestionLevel } from "../src/data/types";
import { emphasisedPhrases, stripMarkers } from "../src/lib/statement-tokens";
import { highlight } from "../src/lib/highlight";

const GENERATED_DIR = join(process.cwd(), "src", "generated");
const PAYLOAD_DIR = join(process.cwd(), "public", "b");

const LEVELS: QuestionLevel[] = ["junior", "intermediate", "senior"];
const CATEGORIES: BinaryCategory[] = ["react", "typescript", "javascript"];

const EXPECTED_BANK_SIZE = 180;
/** Statement budgets, in characters, matched to the two front type sizes. */
const STATEMENT_LIMIT = 100;
const STATEMENT_LIMIT_WITH_CODE = 80;
/** An explanation names the mechanism, then the consequence or the fix. */
const EXPLANATION_MIN = 90;
const EXPLANATION_MAX = 210;
/** Per level, |true - false| may not exceed this. */
const MAX_TRUTH_GAP = 8;
const MIN_CATEGORY_SHARE = 0.2;
const MIN_CODE_SHARE = 0.35;
/** Guessing by phrasing may beat the majority class by no more than this. */
const MAX_WORDING_EDGE = 0.08;
/** Emphasis coverage may differ between true and false cards by no more than this. */
const MAX_EMPHASIS_GAP = 0.15;

/** Words that leak the answer when they cluster on one side of the bank. */
const ABSOLUTE_WORD = /\b(always|never|every|automatically|guarantees?|entire|only|any)\b/i;

async function buildBinaryCards() {
  validateBank();
  mkdirSync(GENERATED_DIR, { recursive: true });
  rmSync(PAYLOAD_DIR, { recursive: true, force: true });
  mkdirSync(PAYLOAD_DIR, { recursive: true });

  const index = BINARY_CARDS.map(({ id, level, category, subject }) => ({
    id,
    level,
    category,
    subject,
  }));
  writeFileSync(
    join(GENERATED_DIR, "binary-card-index.json"),
    JSON.stringify(index),
  );

  let bytes = 0;
  for (const card of BINARY_CARDS) {
    const payload: BinaryCardPayload = {
      ...card,
      codeHtml: card.codeSnippet
        ? await highlight(card.codeSnippet, card.codeLanguage)
        : null,
    };
    const json = JSON.stringify(payload);
    bytes += json.length;
    writeFileSync(join(PAYLOAD_DIR, `${card.id}.json`), json);
  }

  const levels = Object.fromEntries(
    LEVELS.map((level) => [
      level,
      BINARY_CARDS.filter((card) => card.level === level).length,
    ]),
  );
  const categories = Object.fromEntries(
    CATEGORIES.map((category) => [
      category,
      BINARY_CARDS.filter((card) => card.category === category).length,
    ]),
  );
  const trues = BINARY_CARDS.filter((card) => card.truth).length;
  const withCode = BINARY_CARDS.filter((card) => card.codeSnippet).length;

  console.log(
    `[build-binary] ${BINARY_CARDS.length} cards · ${JSON.stringify(levels)} · ` +
      `${JSON.stringify(categories)} · ${trues}T/${BINARY_CARDS.length - trues}F · ` +
      `${withCode} with code · ${(bytes / 1024).toFixed(1)} KB payloads`,
  );
}

function validateBank() {
  const total = BINARY_CARDS.length;
  if (total !== EXPECTED_BANK_SIZE) {
    throw new Error(`Binary bank must contain ${EXPECTED_BANK_SIZE} cards, found ${total}`);
  }

  const ids = new Set<string>();
  const statements = new Set<string>();
  for (const card of BINARY_CARDS) {
    if (ids.has(card.id)) throw new Error(`Duplicate Binary card id: ${card.id}`);
    ids.add(card.id);

    const normalized = stripMarkers(card.statement).trim().toLowerCase();
    if (statements.has(normalized)) {
      throw new Error(`Duplicate Binary statement: ${card.statement}`);
    }
    statements.add(normalized);

    if (!card.statement.trim() || !card.explanation.trim()) {
      throw new Error(`${card.id}: statement and explanation are required`);
    }
    if (card.codeSnippet && !card.codeLanguage) {
      throw new Error(`${card.id}: codeLanguage is required with codeSnippet`);
    }

    // The front renders at 26-32px, dropping to 21-25px when a snippet shares
    // the card, so the budget tightens rather than the type shrinking further.
    const limit = card.codeSnippet ? STATEMENT_LIMIT_WITH_CODE : STATEMENT_LIMIT;
    const length = stripMarkers(card.statement).length;
    if (length > limit) {
      throw new Error(`${card.id}: statement is ${length} chars, limit is ${limit}`);
    }

    const explanation = stripMarkers(card.explanation).length;
    if (explanation < EXPLANATION_MIN || explanation > EXPLANATION_MAX) {
      throw new Error(
        `${card.id}: explanation is ${explanation} chars, expected ${EXPLANATION_MIN}-${EXPLANATION_MAX}`,
      );
    }

    // Only `**emphasis**` and backtick code spans are parsed, so a leftover
    // single asterisk or an unclosed marker would render as literal punctuation.
    for (const [field, value] of [
      ["statement", card.statement],
      ["explanation", card.explanation],
    ] as const) {
      if (stripMarkers(value).includes("*")) {
        throw new Error(`${card.id}: ${field} has a stray asterisk; use **double** markers`);
      }
      if ((value.match(/`/g)?.length ?? 0) % 2 !== 0) {
        throw new Error(`${card.id}: ${field} has an unclosed backtick span`);
      }
    }
  }

  // Levels split into equal thirds, because a deck is drawn from one level and
  // the pool size decides how long a player goes before seeing a repeat.
  const perLevel = total / 3;
  for (const level of LEVELS) {
    const actual = BINARY_CARDS.filter((card) => card.level === level).length;
    if (actual !== perLevel) {
      throw new Error(`Binary ${level} count must be ${perLevel}, found ${actual}`);
    }

    // Truth balance is checked per level, not just overall: a level that leans
    // one way is guessable even when the whole bank looks even.
    const trues = BINARY_CARDS.filter((c) => c.level === level && c.truth).length;
    const gap = Math.abs(trues - (perLevel - trues));
    if (gap > MAX_TRUTH_GAP) {
      throw new Error(
        `Binary ${level} truth gap is ${gap} (${trues}T/${perLevel - trues}F), max ${MAX_TRUTH_GAP}`,
      );
    }
  }

  for (const category of CATEGORIES) {
    const actual = BINARY_CARDS.filter((card) => card.category === category).length;
    if (actual < total * MIN_CATEGORY_SHARE) {
      throw new Error(
        `Binary ${category} has ${actual} cards, below the ${Math.round(MIN_CATEGORY_SHARE * 100)}% floor`,
      );
    }
  }

  const withCode = BINARY_CARDS.filter((card) => card.codeSnippet).length;
  if (withCode < total * MIN_CODE_SHARE) {
    throw new Error(
      `Binary code mix is ${withCode}, below the ${Math.round(MIN_CODE_SHARE * 100)}% floor`,
    );
  }

  validateNotGameable();
}

/**
 * A true/false deck is only worth playing if the answer needs the reader's
 * mental model. Two shortcuts have to stay closed:
 *
 * 1. Phrasing. False claims drift toward absolutes ("always", "never",
 *    "automatically") while true ones hedge, so a reader can score well by
 *    grammar alone. The check measures that strategy and compares it to simply
 *    guessing the majority class — wording must add almost nothing on top.
 * 2. Emphasis. The `**marks**` point at the load-bearing words, so if they
 *    appeared mainly on false cards they would read as "this word is a lie".
 */
function validateNotGameable() {
  const total = BINARY_CARDS.length;
  const trues = BINARY_CARDS.filter((card) => card.truth).length;
  const baseline = Math.max(trues, total - trues) / total;

  const hits = BINARY_CARDS.filter((card) => {
    const guess = !ABSOLUTE_WORD.test(stripMarkers(card.statement));
    return guess === card.truth;
  }).length;
  const wording = hits / total;

  if (wording > baseline + MAX_WORDING_EDGE) {
    throw new Error(
      `Binary wording heuristic scores ${(wording * 100).toFixed(0)}% against a ` +
        `${(baseline * 100).toFixed(0)}% baseline, exceeding the ` +
        `${(MAX_WORDING_EDGE * 100).toFixed(0)}pt margin. Rephrase false cards as plausible claims.`,
    );
  }

  const share = (truth: boolean) => {
    const pool = BINARY_CARDS.filter((card) => card.truth === truth);
    const marked = pool.filter((card) => emphasisedPhrases(card.statement).length > 0);
    return marked.length / pool.length;
  };
  const emphasisGap = Math.abs(share(true) - share(false));
  if (emphasisGap > MAX_EMPHASIS_GAP) {
    throw new Error(
      `Binary emphasis differs by ${(emphasisGap * 100).toFixed(0)}pts between true and ` +
        `false cards, exceeding ${(MAX_EMPHASIS_GAP * 100).toFixed(0)}pts. Emphasis would become a tell.`,
    );
  }
}

buildBinaryCards();
