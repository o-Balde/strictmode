import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderLedger, rowIds, viewMore } from "./support";

describe("Bug 1: View more replaces the transactions instead of adding to them", () => {
  it("keeps the first page and appends the second", async () => {
    const { user } = await renderLedger();
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t6");

    expect(rowIds()).toEqual(["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"]);
  });
});
