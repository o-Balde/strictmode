import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { checkbox, renderLedger, summary } from "./support";

describe("Level 2: approve transactions", () => {
  it("renders a labelled checkbox per row, checked when approved", async () => {
    await renderLedger();
    expect(screen.getByRole("checkbox", { name: "Approve Uber Eats" })).toBe(checkbox("t1"));
    expect(checkbox("t1")).not.toBeChecked();
    expect(checkbox("t2")).toBeChecked();
    expect(checkbox("t4")).toBeChecked();
  });

  it("summarises how many rows are approved and for how much", async () => {
    await renderLedger();
    expect(summary()).toHaveTextContent(/^2 of 5 approved \(\$1,324\.49\)$/);
  });

  it("approves a row when its box is checked", async () => {
    const { user } = await renderLedger();
    await user.click(checkbox("t1"));

    expect(checkbox("t1")).toBeChecked();
    expect(summary()).toHaveTextContent(/^3 of 5 approved \(\$1,342\.89\)$/);
  });

  it("un-approves a row when its box is cleared", async () => {
    const { user } = await renderLedger();
    await user.click(checkbox("t2"));

    expect(checkbox("t2")).not.toBeChecked();
    expect(summary()).toHaveTextContent(/^1 of 5 approved \(\$89\.99\)$/);
  });

  it("changes only the row that was clicked", async () => {
    const { user } = await renderLedger();
    await user.click(checkbox("t3"));
    await user.click(checkbox("t3"));

    expect(checkbox("t3")).not.toBeChecked();
    expect(checkbox("t2")).toBeChecked();
    expect(summary()).toHaveTextContent(/^2 of 5 approved/);
  });
});
