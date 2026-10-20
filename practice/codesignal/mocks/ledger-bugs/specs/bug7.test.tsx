import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { deferred } from "../../../test/fetch";
import { renderApp } from "./support";

describe("Bug 7: the employee filter says Loading employees... until the transactions arrive", () => {
  it("offers the employees as soon as they are loaded", async () => {
    const transactionsGate = deferred<void>();
    renderApp((base) => ({
      "GET /api/transactions": async (request) => {
        await transactionsGate.promise;
        return base["GET /api/transactions"](request);
      },
    }));

    try {
      expect(await screen.findByRole("option", { name: "Ana Lee" })).toBeInTheDocument();
      expect(screen.getByTestId("employee-filter")).toBeEnabled();
    } finally {
      transactionsGate.resolve();
    }
  });
});
