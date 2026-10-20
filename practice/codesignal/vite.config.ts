import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * `SOLUTION=1` points every spec at the reference solution instead of your
 * workspace: a spec imports `../src/App`, and the alias swaps in `../solution/App`.
 * That is how the kit checks its own answers; you never need it while practising.
 */
const againstSolution = process.env.SOLUTION === "1";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: againstSolution ? [{ find: /^\.\.\/src\//, replacement: "../solution/" }] : [],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["{mocks,icf,widgets}/**/specs/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    testTimeout: 10_000,
  },
});
