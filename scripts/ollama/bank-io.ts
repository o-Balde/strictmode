/**
 * Reads and writes the question bank as it actually ships: the modules under
 * src/data/questions/*.ts.
 *
 * questions.json is NOT read here. It has drifted behind the .ts modules (the
 * option rewrites of aab0299 only landed in the .ts files), so regenerating
 * from it with generate_all_ts_files.py would silently revert them.
 *
 * `toTs` is a byte-for-byte port of `to_ts_string` in generate_all_ts_files.py
 * — Python's json.dumps escapes everything outside printable ASCII — so a
 * rewrite touches only the questions that changed.
 */
import { readdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { QuizQuestion } from "../../src/data/types";

export const QUESTIONS_DIR = join(process.cwd(), "src", "data", "questions");

export interface BankModule {
  file: string;
  exportName: string;
  questions: QuizQuestion[];
}

export async function loadBank(): Promise<BankModule[]> {
  const files = readdirSync(QUESTIONS_DIR).filter((f) => f.endsWith(".ts")).sort();
  const modules: BankModule[] = [];
  for (const file of files) {
    const mod = (await import(pathToFileURL(join(QUESTIONS_DIR, file)).href)) as Record<string, unknown>;
    const entries = Object.entries(mod).filter(([, v]) => Array.isArray(v));
    if (entries.length !== 1) throw new Error(`${file}: expected exactly one exported question array`);
    const [exportName, questions] = entries[0] as [string, QuizQuestion[]];
    modules.push({ file, exportName, questions });
  }
  return modules;
}

/** json.dumps with ensure_ascii: every char outside 0x20–0x7e becomes \uXXXX. */
function pyString(s: string): string {
  return JSON.stringify(s).replace(
    /[^\x20-\x7e]/g,
    (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

export function toTs(val: unknown, level = 0): string {
  const indent = "  ".repeat(level);
  if (val === null || val === undefined) return "undefined";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return pyString(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((item) => `${indent}  ${toTs(item, level + 1)}`).join(",\n");
    return `[\n${items}\n${indent}]`;
  }
  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `${indent}  ${k}: ${toTs(v, level + 1)}`)
      .join(",\n");
    return `{\n${items}\n${indent}}`;
  }
  return "undefined";
}

/** Atomic: a crash mid-write never leaves a half-written module behind. */
export function writeModule(mod: BankModule): void {
  const target = join(QUESTIONS_DIR, mod.file);
  const code =
    `import { QuizQuestion } from '../types';\n\n` +
    `export const ${mod.exportName}: QuizQuestion[] = ${toTs(mod.questions, 0)};\n`;
  const tmp = `${target}.tmp`;
  writeFileSync(tmp, code, "utf-8");
  renameSync(tmp, target);
}
