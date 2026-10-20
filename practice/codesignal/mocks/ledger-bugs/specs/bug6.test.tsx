import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { filter, renderLedger } from "./support";

describe("Bug 6: the total never changes", () => {
  it("totals the transactions on screen", async () => {
    const { user } = await renderLedger();
    expect(screen.getByTestId("ledger-total")).toHaveTextContent("Total: $1,799.89");

    await user.selectOptions(filter(), "e3");
    await screen.findByTestId("txn-t12");
    expect(screen.getByTestId("ledger-total")).toHaveTextContent("Total: $2,572.00");
  });
});
