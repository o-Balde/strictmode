/**
 * Runs a task's specs the way CodeSignal grades a level: cumulatively. Asking
 * for Level 3 runs Levels 1, 2 and 3, so a regression in an earlier level
 * fails the run exactly as it would lock you out of the next level there.
 *
 *   npm run level -- task-board 2          Levels 1-2 of a mock
 *   npm run level -- banking 4             all four levels of an ICF task
 *   npm run level -- ledger-bugs 3         only bug 3 (bug hunts are independent)
 *   npm run level -- otp-input             every spec of a task
 *   npm run level -- --all                 every spec in the kit
 *   add --solution to grade the reference solution instead of your code
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["mocks", "icf", "widgets"];
const args = process.argv.slice(2);
const solution = args.includes("--solution");
const all = args.includes("--all");
const [task, levelArg] = args.filter((arg) => !arg.startsWith("--"));

function listTasks() {
  return ROOTS.flatMap((root) =>
    existsSync(root) ? readdirSync(root).map((name) => ({ root, name })) : [],
  );
}

function specFiles(root, name) {
  const dir = join(root, name, "specs");
  return readdirSync(dir)
    .filter((file) => /\.test\.tsx?$/.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => join(dir, file));
}

let files;
if (all) {
  files = listTasks().flatMap(({ root, name }) => specFiles(root, name));
} else {
  const found = listTasks().find(({ name }) => name === task);
  if (!found) {
    console.error(`Unknown task "${task ?? ""}". Choose one of:\n  ${listTasks().map((t) => t.name).join("\n  ")}`);
    process.exit(1);
  }
  const specs = specFiles(found.root, found.name);
  const level = levelArg === undefined ? undefined : Number(levelArg);
  if (level === undefined) {
    files = specs;
  } else {
    const numbered = (file) => Number(/(\d+)\.test\.tsx?$/.exec(file)?.[1]);
    const bugHunt = specs.some((file) => /bug\d+\.test/.test(file));
    files = specs.filter((file) => (bugHunt ? numbered(file) === level : numbered(file) <= level));
    if (files.length === 0) {
      console.error(`No specs for level ${levelArg} of ${task}.`);
      process.exit(1);
    }
  }
}

console.log(`\n▶ ${solution ? "reference solution" : "your workspace"} · ${files.length} spec file(s)\n`);
const result = spawnSync(join("node_modules", ".bin", "vitest"), ["run", ...files], {
  stdio: "inherit",
  env: { ...process.env, SOLUTION: solution ? "1" : "" },
});
process.exit(result.status ?? 1);
