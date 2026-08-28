import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Not our code: the Claude Design handoff bundle, the scraped source
    // material, and the Python virtualenv.
    "_REFERENCES/**",
    "scratch/**",
    ".venv/**",
    "src/generated/**",
  ]),
]);

export default eslintConfig;
