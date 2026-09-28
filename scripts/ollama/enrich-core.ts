/**
 * The data half of the question enricher (scripts/ollama-enrich.ts): the shape
 * the model returns, the structured-output schemas, lenient parsing, patches,
 * and the validation that stands between the model and the bank. Prompts live
 * in ./prompts.ts, the Ollama client in ./client.ts.
 *
 * The model only ever proposes teaching copy. The answer key — which option is
 * correct, the option ids, the snippet, the console output an `output`
 * question prints — never passes through it, so `mergeEnrichment` rebuilds the
 * question from the original and takes only the prose fields from the model.
 */
import ts from "typescript";
import type { CodeLanguage, QuestionExample, QuizQuestion } from "../../src/data/types";

// ─── Shapes ─────────────────────────────────────────────────────────────────

export interface Enrichment {
  explanation: string;
  options: { id: string; text: string; explanation: string }[];
  misconception: string;
  interviewLine: string;
  hints: string[];
  example: QuestionExample;
  /** Non-empty when the model doubts the answer key; never written to the bank. */
  keyConcern?: string;
}

/** Only the fields that change. Options are matched by id. */
export interface EnrichmentPatch {
  explanation?: string;
  options?: { id: string; text?: string; explanation?: string }[];
  misconception?: string;
  interviewLine?: string;
  hints?: string[];
  example?: QuestionExample;
}

export interface Review {
  issues: { field: string; problem: string }[];
  patch: EnrichmentPatch;
  keyConcern: string;
}

export const LANGUAGES: CodeLanguage[] = ["tsx", "typescript", "javascript", "jsx", "css", "json"];

// ─── Structured-output schemas ──────────────────────────────────────────────

const STRING = { type: "string" } as const;
const EXAMPLE_SCHEMA = {
  type: "object",
  properties: { caption: STRING, language: { type: "string", enum: LANGUAGES }, code: STRING },
  required: ["caption", "language", "code"],
} as const;

export const ENRICHMENT_SCHEMA = {
  type: "object",
  properties: {
    explanation: STRING,
    options: {
      type: "array",
      items: {
        type: "object",
        properties: { id: STRING, text: STRING, explanation: STRING },
        required: ["id", "text", "explanation"],
      },
    },
    misconception: STRING,
    interviewLine: STRING,
    hints: { type: "array", items: STRING },
    example: EXAMPLE_SCHEMA,
    keyConcern: STRING,
  },
  required: ["explanation", "options", "misconception", "interviewLine", "hints", "example", "keyConcern"],
} as const;

export const PATCH_SCHEMA = {
  type: "object",
  properties: {
    explanation: STRING,
    options: {
      type: "array",
      items: {
        type: "object",
        properties: { id: STRING, text: STRING, explanation: STRING },
        required: ["id"],
      },
    },
    misconception: STRING,
    interviewLine: STRING,
    hints: { type: "array", items: STRING },
    example: EXAMPLE_SCHEMA,
  },
} as const;

/** Which fields a set of failed checks points at; null when one is unrecognised. */
export interface FixTargets {
  fields: ("explanation" | "misconception" | "interviewLine" | "hints" | "example")[];
  /** Option id → the parts of it to rewrite. */
  options: Record<string, ("text" | "explanation")[]>;
}

export function fixTargets(problems: string[], optionIds: string[]): FixTargets | null {
  const fields = new Set<FixTargets["fields"][number]>();
  const options: FixTargets["options"] = {};
  const addOption = (id: string, part: "text" | "explanation") => {
    options[id] = [...new Set([...(options[id] ?? []), part])];
  };
  for (const p of problems) {
    const opt = p.match(/^option (\S+) (text|explanation|is )/);
    if (opt) addOption(opt[1], opt[2] === "text" ? "text" : "explanation");
    else if (/^two options have the same text/.test(p)) optionIds.forEach((id) => addOption(id, "text"));
    else if (/^explanation\b/.test(p)) fields.add("explanation");
    else if (/^misconception\b/.test(p)) fields.add("misconception");
    else if (/^interviewLine\b/.test(p)) fields.add("interviewLine");
    else if (/^(hints|a hint|hint \d|two hints)\b/.test(p)) fields.add("hints");
    else if (/^example\b/.test(p)) fields.add("example");
    else return null;
  }
  return { fields: [...fields], options };
}

/**
 * A grammar that only admits the fields being fixed. With every field
 * optional, models rewrite the whole copy; this keeps a one-field fix at a
 * few dozen tokens.
 */
export function fixSchema(t: FixTargets | null): object {
  if (!t) return PATCH_SCHEMA;
  const properties: Record<string, object> = {};
  for (const f of t.fields) properties[f] = PATCH_SCHEMA.properties[f];
  const ids = Object.keys(t.options);
  if (ids.length) {
    const parts = [...new Set(Object.values(t.options).flat())];
    properties.options = {
      type: "array",
      items: {
        type: "object",
        properties: { id: { type: "string", enum: ids }, ...Object.fromEntries(parts.map((p) => [p, STRING])) },
        required: ["id", ...parts],
      },
    };
  }
  return { type: "object", properties, required: Object.keys(properties) };
}

/** The same targets in words, for the fixer's prompt. */
export function describeTargets(t: FixTargets | null): string {
  if (!t) return "only the fields the failed checks name";
  const opts = Object.entries(t.options).map(([id, parts]) => `option ${id} ${parts.join(" and ")}`);
  return [...t.fields, ...opts].join(", ");
}

export const REVIEW_SCHEMA = {
  type: "object",
  properties: {
    issues: {
      type: "array",
      items: { type: "object", properties: { field: STRING, problem: STRING }, required: ["field", "problem"] },
    },
    patch: PATCH_SCHEMA,
    keyConcern: STRING,
  },
  required: ["issues", "patch", "keyConcern"],
} as const;

// ─── Parsing ────────────────────────────────────────────────────────────────

/**
 * Escapes raw newlines and tabs inside JSON strings: the commonest way a model
 * breaks JSON is pasting multi-line code into a string verbatim.
 */
function escapeControlCharsInStrings(text: string): string {
  let out = "";
  let inString = false;
  let escaped = false;
  for (const ch of text) {
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      else if (ch === "\n") {
        out += "\\n";
        continue;
      } else if (ch === "\r") continue;
      else if (ch === "\t") {
        out += "\\t";
        continue;
      }
    } else if (ch === '"') inString = true;
    out += ch;
  }
  return out;
}

/**
 * Pulls the JSON object out of a free-form reply (thinking tags, fences, a
 * sentence before or after) and repairs the two mistakes models make most.
 */
export function parseJsonObject(raw: string): Record<string, unknown> {
  let text = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fence && fence[1].trimStart().startsWith("{")) text = fence[1];
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("no JSON object in the reply");
  text = text.slice(start, end + 1);
  try {
    return JSON.parse(text);
  } catch (first) {
    const repaired = escapeControlCharsInStrings(text).replace(/,(\s*[}\]])/g, "$1");
    try {
      return JSON.parse(repaired);
    } catch {
      throw first;
    }
  }
}

/**
 * Models fill keyConcern with remarks that agree with the key; a real concern
 * names the option it believes in, as the prompt asks.
 */
export function realConcern(text: unknown): string {
  const t = typeof text === "string" ? text.trim() : "";
  return /^([Oo]ption\s+)?[A-F]\b|\b[Oo]ption\s+[A-F]\b/.test(t) ? t : "";
}

export const parsePatch = (raw: string) => parseJsonObject(raw) as EnrichmentPatch;

export function parseReview(raw: string): Review {
  const r = parseJsonObject(raw) as Partial<Review>;
  return {
    issues: Array.isArray(r.issues) ? r.issues.filter((i) => i && typeof i.problem === "string") : [],
    patch: r.patch && typeof r.patch === "object" ? r.patch : {},
    keyConcern: realConcern(r.keyConcern),
  };
}

/**
 * Coerces a parsed reply onto the question's own shape: options keyed to the
 * original ids (matched by id, else by position), missing strings as "". A
 * structural slip then surfaces as an empty field, which a small patch can
 * fix, instead of an unfixable mismatch that throws the whole draft away.
 */
export function normalizeEnrichment(q: QuizQuestion, raw: Record<string, unknown>): Enrichment {
  const text = (v: unknown) => (typeof v === "string" ? v : "");
  const given = (Array.isArray(raw.options) ? raw.options : []).filter(
    (o): o is Record<string, unknown> => Boolean(o) && typeof o === "object",
  );
  const byId = new Map(given.map((o) => [String(o.id ?? "").trim().toUpperCase(), o]));
  const original = q.options ?? [];
  const options = original.map((src, i) => {
    const o = byId.get(src.id.toUpperCase()) ?? (given.length === original.length ? given[i] : undefined);
    return { id: src.id, text: text(o?.text) || src.text, explanation: text(o?.explanation) };
  });
  const ex = (raw.example && typeof raw.example === "object" ? raw.example : {}) as Record<string, unknown>;
  return {
    explanation: text(raw.explanation),
    options,
    misconception: text(raw.misconception),
    interviewLine: text(raw.interviewLine),
    hints: Array.isArray(raw.hints) ? raw.hints.filter((h): h is string => typeof h === "string") : [],
    example: {
      caption: text(ex.caption),
      language: (LANGUAGES as string[]).includes(text(ex.language)) ? (ex.language as CodeLanguage) : "typescript",
      code: text(ex.code),
    },
    keyConcern: realConcern(raw.keyConcern),
  };
}

// ─── Patches ────────────────────────────────────────────────────────────────

const str = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/** The fields a patch actually changes, for logs. */
export function patchedFields(p: EnrichmentPatch): string[] {
  const fields = (["explanation", "misconception", "interviewLine", "hints", "example"] as const).filter(
    (k) => p[k] !== undefined,
  ) as string[];
  for (const o of p.options ?? []) {
    if (o?.text !== undefined) fields.push(`option ${o.id} text`);
    if (o?.explanation !== undefined) fields.push(`option ${o.id} explanation`);
  }
  return fields;
}

/**
 * Applies only well-formed replacements; anything malformed is ignored and
 * left for validation to catch on the result.
 */
export function applyPatch(e: Enrichment, p: EnrichmentPatch): Enrichment {
  const next: Enrichment = { ...e, options: e.options.map((o) => ({ ...o })), hints: [...e.hints] };
  for (const k of ["explanation", "misconception", "interviewLine"] as const) {
    if (str(p[k])) next[k] = p[k];
  }
  if (Array.isArray(p.hints) && p.hints.length > 0 && p.hints.every(str)) next.hints = p.hints;
  if (p.example && str(p.example.code) && str(p.example.caption)) next.example = p.example;
  for (const po of Array.isArray(p.options) ? p.options : []) {
    const target = next.options.find((o) => o.id === po?.id);
    if (!target) continue;
    if (str(po.text)) target.text = po.text;
    if (str(po.explanation)) target.explanation = po.explanation;
  }
  return next;
}

// ─── Validation ─────────────────────────────────────────────────────────────

export function optionTextLocked(q: QuizQuestion): boolean {
  return q.type === "output" || q.type === "puzzle";
}

const TEMPLATED = [
  /^common misconception:/i,
  /^interview takeaway:/i,
  /^the trap:/i,
  /^misconception:/i,
  /clearly articulate the underlying mechanism/i,
  /misunderstanding the execution lifecycle/i,
];

const FILLER =
  /\b(it'?s (important|worth) (to note|noting)|in summary|in conclusion|simply put|great question|as mentioned (above|earlier)|let'?s (dive|break))\b/i;

/**
 * The app renders these fields as plain text with `code` spans only, so any
 * other markdown shows up as literal asterisks and underscores.
 */
function proseProblems(label: string, text: string): string[] {
  const problems: string[] = [];
  if ((text.match(/`/g) ?? []).length % 2) problems.push(`${label} has an unmatched backtick`);
  const prose = text.replace(/`[^`]*`/g, "");
  if (/\*\*[^*]+\*\*|(^|[\s(])\*[^*\s][^*\n]*\*(?=[\s).,;:!?]|$)|(^|[\s(])_[^_\s][^_\n]*_(?=[\s).,;:!?]|$)/m.test(prose)) {
    problems.push(`${label} uses markdown emphasis; the app shows plain text with backtick code only`);
  }
  return problems;
}

const normalizeCode = (code: string) => code.replace(/\s+/g, " ").trim();

const SCRIPT_EXT: Partial<Record<CodeLanguage, string>> = {
  tsx: "tsx",
  typescript: "ts",
  javascript: "js",
  jsx: "jsx",
};

function syntaxErrors(code: string, ext: string): string[] {
  const out = ts.transpileModule(code, {
    fileName: `example.${ext}`,
    reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  });
  return (out.diagnostics ?? [])
    .filter((d) => d.category === ts.DiagnosticCategory.Error)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, " "));
}

/**
 * A syntax check, not a type check: examples are fragments that reference
 * things they never import, but they must at least parse as the language
 * they claim to be.
 */
export function exampleSyntaxProblems(ex: QuestionExample): string[] {
  if (ex.language === "json") {
    try {
      JSON.parse(ex.code);
      return [];
    } catch (err) {
      return [`example is not valid JSON: ${(err as Error).message}`];
    }
  }
  if (ex.language === "css") {
    const depth = [...ex.code].reduce((d, c) => d + (c === "{" ? 1 : c === "}" ? -1 : 0), 0);
    return depth === 0 ? [] : ["example CSS has unbalanced braces"];
  }
  const ext = SCRIPT_EXT[ex.language];
  if (!ext) return [];
  const errors = syntaxErrors(ex.code, ext);
  if (!errors.length) return [];
  if (ext === "ts" && !syntaxErrors(ex.code, "tsx").length) return ['example contains JSX; set its language to "tsx"'];
  if (ext === "js" && !syntaxErrors(ex.code, "jsx").length) return ['example contains JSX; set its language to "jsx"'];
  if (ext === "js" && !syntaxErrors(ex.code, "ts").length) return ['example contains TypeScript syntax; set its language to "typescript"'];
  return [`example does not parse as ${ex.language}: ${errors.slice(0, 2).join("; ")}`];
}

/**
 * Hard problems make the attempt fail and get repaired with the problems fed
 * back. Warnings are handed to the review pass but never block a write.
 */
export function validate(q: QuizQuestion, e: Enrichment): { problems: string[]; warnings: string[] } {
  const problems: string[] = [];
  const warnings: string[] = [];
  const original = q.options ?? [];
  const locked = optionTextLocked(q);

  if (!str(e.explanation)) problems.push("explanation is empty");
  else {
    const floor = Math.min(Math.round(q.explanation.length * 0.8), 600);
    if (e.explanation.length < floor) {
      problems.push(`explanation shrank to ${e.explanation.length} chars; it must be at least ${floor}`);
    }
    if (e.explanation.length > 3500) problems.push(`explanation is ${e.explanation.length} chars; keep it under 3500`);
    if (/```/.test(e.explanation)) problems.push("explanation contains a fenced code block; use inline backticks only");
    if (/^\s*(#{1,6}\s|[-*•]\s|\d+[.)]\s)/m.test(e.explanation)) problems.push("explanation uses markdown headings or lists; write paragraphs");
    problems.push(...proseProblems("explanation", e.explanation));
    if (!e.explanation.includes("\n\n") && e.explanation.length > 700) {
      warnings.push("explanation is one block of text; split it into 2–4 short paragraphs");
    }
    if (FILLER.test(e.explanation)) warnings.push("explanation contains filler phrases; cut them");
  }

  if (!Array.isArray(e.options)) problems.push("options is missing");
  else {
    const want = original.map((o) => o.id).join(",");
    const got = e.options.map((o) => o?.id).join(",");
    if (want !== got) problems.push(`option ids must be exactly [${want}] in that order, got [${got}]`);
    for (const [i, o] of e.options.entries()) {
      const src = original[i];
      if (!src || !o) continue;
      if (!str(o.text)) problems.push(`option ${o.id} text is empty`);
      else if (!locked) problems.push(...proseProblems(`option ${o.id} text`, o.text));
      if (!str(o.explanation)) problems.push(`option ${o.id} explanation is empty`);
      else {
        problems.push(...proseProblems(`option ${o.id} explanation`, o.explanation));
        if (!src.isCorrect && /^correct\b/i.test(o.explanation.trim())) {
          problems.push(`option ${o.id} is WRONG but its explanation starts with "Correct"`);
        } else if (src.isCorrect && /^(incorrect|wrong)\b/i.test(o.explanation.trim())) {
          problems.push(`option ${o.id} is the CORRECT answer but its explanation calls it wrong`);
        } else if (src.isCorrect && !/^correct\b/i.test(o.explanation.trim())) {
          warnings.push(`correct option ${o.id}'s explanation should start with "Correct."`);
        }
      }
    }
    if (!locked && e.options.length === original.length && original.length > 1) {
      const texts = e.options.map((o) => o.text?.trim().toLowerCase());
      if (new Set(texts).size !== texts.length) problems.push("two options have the same text");
      const correct = e.options.find((_, i) => original[i].isCorrect);
      const wrong = e.options.filter((_, i) => !original[i].isCorrect);
      const avg = wrong.reduce((n, o) => n + (o.text?.length ?? 0), 0) / Math.max(1, wrong.length);
      if (correct?.text && avg > 0 && correct.text.length > avg * 1.8) {
        warnings.push(
          `the correct option is ${correct.text.length} chars vs ${Math.round(avg)} on average for the wrong ones — its length gives it away`,
        );
      }
      const hadCatchAll = original.some((o) => /\b(all|none) of the above\b/i.test(o.text));
      if (!hadCatchAll && e.options.some((o) => /\b(all|none) of the above\b/i.test(o.text ?? ""))) {
        warnings.push('an option became "all/none of the above"; keep each option a concrete claim');
      }
    }
  }

  for (const field of ["misconception", "interviewLine"] as const) {
    const v = e[field];
    if (!str(v)) problems.push(`${field} is empty`);
    else {
      if (TEMPLATED.some((re) => re.test(v.trim()))) problems.push(`${field} is boilerplate; make it specific to this question`);
      if (v.length > 500) problems.push(`${field} is ${v.length} chars; keep it under 500`);
      problems.push(...proseProblems(field, v));
    }
  }

  if (!Array.isArray(e.hints) || e.hints.length < 2 || e.hints.length > 4) {
    problems.push("hints must be an array of 2 to 3 strings");
  } else {
    const correct = original.find((o) => o.isCorrect);
    for (const [i, h] of e.hints.entries()) {
      if (!str(h)) {
        problems.push("a hint is empty");
        continue;
      }
      if (/\b(option|answer|choice)\s+[A-F]\b/i.test(h)) problems.push(`hint ${i + 1} names an option letter`);
      else if (correct && correct.text.length > 20 && h.toLowerCase().includes(correct.text.toLowerCase())) {
        problems.push(`hint ${i + 1} quotes the correct option`);
      }
      problems.push(...proseProblems(`hint ${i + 1}`, h));
      if (h.length > 300) warnings.push(`hint ${i + 1} is ${h.length} chars; hints should be one short sentence`);
    }
    if (new Set(e.hints.map((h) => h?.trim().toLowerCase())).size !== e.hints.length) problems.push("two hints are identical");
  }

  const ex = e.example;
  if (!ex || !str(ex.code) || !str(ex.caption)) problems.push("example needs caption and code");
  else if (!LANGUAGES.includes(ex.language)) problems.push(`example.language must be one of ${LANGUAGES.join(", ")}`);
  else {
    const lines = ex.code.trim().split("\n").length;
    if (lines > 30) problems.push(`example is ${lines} lines; keep it at 25 or fewer`);
    if (lines < 3) warnings.push(`example is only ${lines} line(s); show a small but complete snippet`);
    if (ex.code.length > 1800) problems.push("example code is too long");
    if (q.codeSnippet && normalizeCode(ex.code) === normalizeCode(q.codeSnippet)) {
      problems.push("example repeats the question's own snippet; show the concept from a different angle");
    }
    problems.push(...exampleSyntaxProblems(ex));
    problems.push(...proseProblems("example caption", ex.caption));
  }

  return { problems, warnings };
}

/**
 * Rebuilds the question around the model's copy. Everything that decides
 * grading comes from the original.
 */
export function mergeEnrichment(q: QuizQuestion, e: Enrichment): QuizQuestion {
  const locked = optionTextLocked(q);
  const options = (q.options ?? []).map((o, i) => ({
    ...o,
    text: locked ? o.text : e.options[i].text.trim(),
    explanation: e.options[i].explanation.trim(),
  }));
  return {
    ...q,
    options,
    explanation: e.explanation.trim(),
    misconception: e.misconception.trim(),
    interviewLine: e.interviewLine.trim(),
    hints: e.hints.map((h) => h.trim()),
    example: {
      caption: e.example.caption.trim(),
      language: e.example.language,
      code: e.example.code.replace(/\s+$/, ""),
    },
  };
}
