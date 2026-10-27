/**
 * Verification harness for the interview prep sheet's examples. A wrong example
 * on a page people read the night before an interview is worse than none, so
 * the snippets are checked rather than trusted. Run with `npm run verify:prep`.
 *
 * - Every `typescript` and `tsx` snippet is type-checked under `strict`. A line
 *   whose trailing comment starts with `// error` must produce a diagnostic on
 *   that line, and every other line must be clean.
 * - A `javascript` or `typescript` snippet followed directly by an `output`
 *   block is executed, and what it prints must equal that block.
 * - A snippet whose caption names a file ("store.ts, with Redux Toolkit") is
 *   placed at that path, so a later snippet's `./store` import resolves.
 * - Every `javascript` snippet must at least parse.
 * - The quick review demos' hand-written traces (code stepper, event loops)
 *   are run too: each program must print what its last step's console says.
 *
 * Snippets importing packages this repo does not depend on (React Router,
 * Testing Library, Redux Toolkit, ...) are skipped unless a directory with
 * those packages installed is given: `npm run verify:prep -- --packages <dir>`.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import ts from "typescript";
import { CODESIGNAL_PREP_SECTIONS, codesignalBlockGroups } from "../src/data/codesignal";
import { PREP_SECTIONS, type PrepBlock } from "../src/data/interview-prep";
import { REVIEW_SECTIONS } from "../src/data/quick-review";
import { BROWSER_LOOP_SCENARIOS, NODE_LOOP_SCENARIOS } from "../src/components/quick-review/demos/event-loop-scenarios";
import { specificityOf } from "../src/components/quick-review/demos/specificity";
import { STEPPER_SCENARIOS } from "../src/components/quick-review/demos/stepper-scenarios";

const REPO = process.cwd();
const packagesFlag = process.argv.indexOf("--packages");
const PACKAGES = packagesFlag === -1 ? undefined : process.argv[packagesFlag + 1];

/** Resolvable from this repo's own node_modules. */
const LOCAL_MODULE = /^(react|react-dom|react-dom\/client|react\/jsx-runtime|next\/[a-z]+)$/;
/** "Cannot find name / module": the snippet is an excerpt, not a mistake. */
const EXCERPT_CODES = new Set([2304, 2307, 2503, 2552]);
const CLAIMED_ERROR = /\/\/ error\b/;
const CAPTION_FILE = /^([\w./[\]-]+\.tsx?)(?=$|[\s,])/;

/** What a `.tsx` snippet may use without spelling out its own React import. */
const REACT_PRELUDE = [
  'import * as React from "react";',
  'import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext, useId, useTransition, useDeferredValue, useSyncExternalStore, useImperativeHandle, useOptimistic, useActionState, useEffectEvent, use, memo, lazy, Suspense, Fragment, StrictMode, startTransition, Component, forwardRef, cloneElement, createElement, Children, isValidElement, Activity } from "react";',
  'import type { ReactNode, ReactElement, ComponentProps, ComponentPropsWithoutRef, ElementType, Dispatch, SetStateAction, RefObject, Ref, JSX } from "react";',
  "",
].join("\n");

interface VirtualFile {
  label: string;
  code: string;
  source: string;
  /** Lines the prelude adds above the snippet. */
  offset: number;
}

interface Run {
  label: string;
  code: string;
  typed: boolean;
  expected: string;
}

const files = new Map<string, VirtualFile>();
const runs: Run[] = [];
const scripts: { label: string; code: string }[] = [];
let skipped = 0;

// The CodeSignal page's question cards and its other prose (level briefs,
// debriefs, bug fixes, widget notes) carry snippets of their own.
for (const section of [...PREP_SECTIONS, ...CODESIGNAL_PREP_SECTIONS]) {
  for (const question of section.questions) {
    question.body.forEach((block, index) => collect(`${question.id}#${index}`, block, question.body[index + 1]));
  }
}
for (const { label, blocks } of codesignalBlockGroups()) {
  blocks.forEach((block, index) => collect(`codesignal-${label}#${index}`, block, blocks[index + 1]));
}
// The quick review page: each question's prompt snippets and its answer.
for (const section of REVIEW_SECTIONS) {
  for (const question of section.questions) {
    for (const [part, blocks] of [["prompt", question.prompt ?? []], ["body", question.body]] as const) {
      blocks.forEach((block, index) => collect(`review-${question.id}-${part}#${index}`, block, blocks[index + 1]));
    }
  }
}
const traces = [
  ...Object.entries(STEPPER_SCENARIOS).map(([id, scenario]) => ({ label: `stepper:${id}`, ...scenario })),
  ...Object.entries(BROWSER_LOOP_SCENARIOS).map(([id, scenario]) => ({ label: `event-loop:${id}`, ...scenario })),
  ...Object.entries(NODE_LOOP_SCENARIOS).map(([id, scenario]) => ({ label: `node-loop:${id}`, ...scenario })),
];
for (const { label, code, steps } of traces) {
  runs.push({ label, code, typed: false, expected: steps.at(-1)?.console.join("\n") ?? "" });
}
/** A trace's console only ever grows, and it only highlights lines the program has. */
function traceProblems(code: string, steps: readonly { lines: number[]; console: string[] }[]): string[] {
  const lineCount = code.split("\n").length;
  return steps.flatMap((current, index) => {
    const problems = current.lines.filter((line) => line < 1 || line > lineCount).map((line) => `step ${index + 1} highlights line ${line}`);
    const previous = steps[index - 1]?.console ?? [];
    const grows = previous.every((text, at) => current.console[at] === text);
    return grows ? problems : [...problems, `step ${index + 1} rewrites the console`];
  });
}

function collect(label: string, block: PrepBlock, next: PrepBlock | undefined) {
  if (block.kind !== "code") return;

  const typed = block.language === "typescript" || block.language === "tsx";
  const runnable = block.language === "typescript" || block.language === "javascript";
  if (block.language === "javascript") scripts.push({ label, code: block.code });
  if (runnable && next?.kind === "output") {
    runs.push({ label, code: block.code, typed, expected: next.text });
  }
  if (!typed) return;

  const imports = [...block.code.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1]);
  const external = imports.some((name) => !name.startsWith(".") && !LOCAL_MODULE.test(name));
  if (external && !PACKAGES) {
    skipped += 1;
    return;
  }

  const isTsx = block.language === "tsx";
  const prelude = isTsx && !imports.includes("react") ? REACT_PRELUDE : "";
  // An ambient `declare module` only means what it says in a script, not a module.
  const ambient = /declare module "/.test(block.code) && !/^(import|export)\b/m.test(block.code);
  const root = external && PACKAGES ? join(PACKAGES, "src") : join(REPO, ".prep-verify");
  const named = CAPTION_FILE.exec(block.caption ?? "")?.[1];
  const path = join(root, named ?? `${label.replace(/[^a-z0-9]+/gi, "_")}.${isTsx ? "tsx" : "ts"}`);

  files.set(path, {
    label,
    code: block.code,
    source: ambient ? `${block.code}\n` : `${prelude}${block.code}\nexport {};\n`,
    offset: prelude === "" ? 0 : prelude.split("\n").length - 1,
  });
}

if (PACKAGES) {
  // Registers the jest-dom matchers that the testing snippets assert with.
  files.set(join(PACKAGES, "src", "__setup.ts"), {
    label: "setup",
    code: "",
    source: 'import "@testing-library/jest-dom/vitest";\nexport {};\n',
    offset: 0,
  });
}

const options: ts.CompilerOptions = {
  strict: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  lib: ["lib.es2023.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  noEmit: true,
  skipLibCheck: true,
  types: [],
};

/** The snippets exist only in memory, so the host answers for them before the disk. */
const host = ts.createCompilerHost(options);
const disk = {
  getSourceFile: host.getSourceFile.bind(host),
  fileExists: host.fileExists.bind(host),
  readFile: host.readFile.bind(host),
  directoryExists: host.directoryExists?.bind(host),
};
const virtualDirs = new Set<string>();
for (const path of files.keys()) {
  for (let dir = dirname(path); !virtualDirs.has(dir) && dir !== dirname(dir); dir = dirname(dir)) {
    virtualDirs.add(dir);
  }
}
host.getSourceFile = (name, languageVersion, ...rest) => {
  const file = files.get(name);
  return file
    ? ts.createSourceFile(name, file.source, languageVersion, true)
    : disk.getSourceFile(name, languageVersion, ...rest);
};
host.fileExists = (name) => files.has(name) || disk.fileExists(name);
host.readFile = (name) => files.get(name)?.source ?? disk.readFile(name);
host.directoryExists = (dir) => virtualDirs.has(dir) || (disk.directoryExists?.(dir) ?? false);

const program = ts.createProgram([...files.keys()], options, host);

let failures = 0;
let confirmed = 0;
let excerpts = 0;
const fail = (message: string) => {
  failures += 1;
  console.log(`  FAIL ${message}`);
};

console.log("\n— snippets type-check, and error exactly where they say they do —");
for (const [path, file] of files) {
  const sourceFile = program.getSourceFile(path);
  if (!sourceFile) continue;

  const lines = file.code.split("\n");
  const claimed = new Set<number>();
  lines.forEach((line, index) => {
    const at = line.search(CLAIMED_ERROR);
    // A line that is only a comment is prose about an error, not a claim of one.
    if (at > 0 && !line.trimStart().startsWith("//")) claimed.add(index);
  });

  const reported = new Set<number>();
  const diagnostics = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ];
  for (const diagnostic of diagnostics) {
    const line = sourceFile.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line - file.offset;
    if (claimed.has(line)) {
      reported.add(line);
      continue;
    }
    if (EXCERPT_CODES.has(diagnostic.code)) {
      excerpts += 1;
      continue;
    }
    const text = ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
    fail(`${file.label}:${line + 1} unexpected TS${diagnostic.code}: ${text.slice(0, 140)}`);
  }

  for (const line of claimed) {
    if (reported.has(line)) confirmed += 1;
    else fail(`${file.label}:${line + 1} claims an error the compiler does not report: ${lines[line].trim()}`);
  }
}

console.log("\n— demo traces are consistent step to step —");
for (const { label, code, steps } of traces) {
  for (const problem of traceProblems(code, steps)) fail(`${label}: ${problem}`);
}

console.log("\n— the specificity calculator agrees with Selectors Level 4 —");
const SPECIFICITY_CASES: [string, [number, number, number]][] = [
  ["li", [0, 0, 1]],
  ["ul li::marker", [0, 0, 3]],
  [".item", [0, 1, 0]],
  ["li.item[data-new]:hover", [0, 3, 1]],
  ["#menu .item", [1, 1, 0]],
  [":is(#menu, .nav) a", [1, 0, 1]],
  [":where(#menu) a", [0, 0, 1]],
  ["*", [0, 0, 0]],
  ["div > p + span ~ em", [0, 0, 4]],
  ["a:not(.x, #y)", [1, 0, 1]],
  [":nth-child(2n of .a, #b)", [1, 1, 0]],
  ["p::before", [0, 0, 2]],
  ["p:before", [0, 0, 2]],
  ['input[type="checkbox"]:checked + label', [0, 2, 2]],
  ["h2:has(+ p)", [0, 0, 2]],
  [".card:hover .title::after", [0, 3, 1]],
];
for (const [selector, expected] of SPECIFICITY_CASES) {
  const actual = specificityOf(selector).specificity;
  if (actual.join() !== expected.join()) fail(`specificity of "${selector}" is (${actual}), expected (${expected})`);
}

console.log("\n— javascript snippets parse —");
for (const { label, code } of scripts) {
  // Parsed as a module, as the runner executes it: top-level await is allowed.
  const source = ts.createSourceFile(`${label}.mjs`, code, ts.ScriptTarget.ES2022, false, ts.ScriptKind.JS);
  const { parseDiagnostics } = source as ts.SourceFile & { parseDiagnostics: ts.Diagnostic[] };
  for (const diagnostic of parseDiagnostics) {
    const line = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line;
    fail(`${label}:${line + 1} does not parse: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`);
  }
}

console.log("\n— snippets print what their output block says —");
for (const run of runs) {
  const script = run.typed
    ? ts.transpileModule(run.code, {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
      }).outputText
    : run.code;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
    encoding: "utf8",
    timeout: 10_000,
  });
  const printed = result.stdout.trim();
  if (printed !== run.expected.trim()) {
    fail(`${run.label} printed:\n${printed}\n--- but the sheet says:\n${run.expected.trim()}`);
  }
}

console.log(
  `\n${files.size - (PACKAGES ? 1 : 0)} snippets type-checked · ${scripts.length} javascript snippets parsed · ` +
    `${confirmed} claimed errors confirmed · ` +
    `${runs.length} outputs executed · ${excerpts} unresolved names in excerpts · ` +
    `${skipped} skipped (third-party imports) · ${failures} failed\n`,
);
process.exit(failures === 0 ? 0 : 1);
