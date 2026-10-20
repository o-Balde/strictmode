import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderLedger, rowIds, total } from "./support";

const row = (id: string) => screen.getByTestId(`txn-${id}`);

describe("Level 1: render the ledger", () => {
  it("renders one row per transaction, in order", async () => {
    await renderLedger();
    expect(rowIds()).toEqual(["t1", "t2", "t3", "t4", "t5"]);
    expect(row("t1").tagName).toBe("TR");
  });

  it("shows the merchant and the employee's full name", async () => {
    await renderLedger();
    expect(within(row("t2")).getByText("Delta Air Lines")).toBeInTheDocument();
    expect(row("t2")).toHaveTextContent("Mary Jones");
  });

  it("formats amounts as US dollars with cents and thousands separators", async () => {
    await renderLedger();
    expect(within(row("t2")).getByText("$1,234.50")).toBeInTheDocument();
    expect(within(row("t3")).getByText("$7.00")).toBeInTheDocument();
    expect(within(row("t1")).getByText("$18.40")).toBeInTheDocument();
  });

  it("shows the calendar date the data holds, whatever the timezone", async () => {
    await renderLedger();
    expect(within(row("t1")).getByText("Mar 1, 2026")).toBeInTheDocument();
    expect(within(row("t3")).getByText("Mar 2, 2026")).toBeInTheDocument();
  });

  it("totals every row", async () => {
    await renderLedger();
    expect(total()).toHaveTextContent(/^Total: \$1,799\.89$/);
  });
});
