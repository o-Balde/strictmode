import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { filter, renderLedger } from "./support";

describe("Bug 3: an approval jumps to another transaction when the employee changes", () => {
  it("shows each transaction's own approval after switching employees", async () => {
    const { user } = await renderLedger();
    await user.selectOptions(filter(), "e1");
    await screen.findByTestId("txn-t7");
    await user.click(screen.getByTestId("approve-t1"));
    expect(screen.getByTestId("approve-t1")).toBeChecked();

    await user.selectOptions(filter(), "e3");
    await screen.findByTestId("txn-t6");
    expect(screen.getByTestId("approve-t3")).not.toBeChecked();
    expect(screen.getByTestId("approve-t12")).toBeChecked();

    await user.selectOptions(filter(), "e1");
    await screen.findByTestId("txn-t7");
    expect(screen.getByTestId("approve-t1")).toBeChecked();
  });
});
