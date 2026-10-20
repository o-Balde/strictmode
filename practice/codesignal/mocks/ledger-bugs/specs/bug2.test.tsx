import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { filter, renderLedger, rowIds } from "./support";

describe("Bug 2: choosing All employees after an employee crashes the page", () => {
  it("shows every transaction again, without asking for an empty employee", async () => {
    const { api, user } = await renderLedger();
    await user.selectOptions(filter(), "e1");
    await screen.findByTestId("txn-t7");

    await user.selectOptions(filter(), "");
    expect(await screen.findByTestId("txn-t2")).toBeInTheDocument();
    expect(rowIds()).toEqual(["t1", "t2", "t3", "t4", "t5"]);
    expect(api.calls.some((call) => call.path.includes("/api/employees//"))).toBe(false);
  });
});
