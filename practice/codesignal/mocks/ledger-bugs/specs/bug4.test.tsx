import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { deferred } from "../../../test/fetch";
import { filter, renderLedger, rowIds } from "./support";

describe("Bug 4: a slow answer for a previous employee replaces the current one", () => {
  it("keeps showing the employee chosen last", async () => {
    const slow = deferred<void>();
    const { user } = await renderLedger((base) => ({
      "GET /api/employees/:id/transactions": async (request) => {
        if (request.params.id === "e1") await slow.promise;
        return base["GET /api/employees/:id/transactions"](request);
      },
    }));

    await user.selectOptions(filter(), "e1");
    await user.selectOptions(filter(), "e2");
    await screen.findByTestId("txn-t11");

    slow.resolve();
    await new Promise((settle) => setTimeout(settle, 20));
    expect(rowIds()).toEqual(["t2", "t5", "t8", "t11"]);
  });
});
