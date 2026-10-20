import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { deferred } from "../../../test/fetch";
import { checkbox, renderLedger, rowIds, total, transactionPages, viewMore } from "./support";

const filter = () => screen.getByTestId("employee-filter");

async function employeesLoaded() {
  await screen.findByRole("option", { name: "Ana Lee" });
}

describe("Level 4: filter by employee", () => {
  it("offers All employees and every employee from the API", async () => {
    await renderLedger();
    await employeesLoaded();

    const options = within(filter()).getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["All employees", "James Smith", "Mary Jones", "Ana Lee"]);
    expect(filter()).toHaveValue("");
  });

  it("shows only the chosen employee's transactions, without View more", async () => {
    const { user } = await renderLedger();
    await employeesLoaded();
    await user.selectOptions(filter(), "e1");

    expect(await screen.findByTestId("txn-t10")).toBeInTheDocument();
    expect(rowIds()).toEqual(["t1", "t4", "t7", "t10"]);
    expect(viewMore()).toBeNull();
  });

  it("totals only the rows on screen", async () => {
    const { user } = await renderLedger();
    await employeesLoaded();
    await user.selectOptions(filter(), "e3");

    await screen.findByTestId("txn-t12");
    expect(total()).toHaveTextContent(/^Total: \$2,572\.00$/);
  });

  it("goes back to every page already loaded when All employees is chosen again", async () => {
    const { api, user } = await renderLedger();
    await employeesLoaded();
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t10");

    await user.selectOptions(filter(), "e2");
    await screen.findByTestId("txn-t11");
    await user.selectOptions(filter(), "");

    expect(await screen.findByTestId("txn-t3")).toBeInTheDocument();
    expect(rowIds()).toHaveLength(10);
    expect(viewMore()).toBeInTheDocument();
    expect(transactionPages(api.calls)).toEqual(["/api/transactions?page=0", "/api/transactions?page=1"]);
    expect(api.calls.some((call) => call.path.includes("//"))).toBe(false);
  });

  it("keeps an approval made in the employee view after switching back", async () => {
    const { user } = await renderLedger();
    await employeesLoaded();
    await user.selectOptions(filter(), "e1");
    await screen.findByTestId("txn-t7");
    await user.click(checkbox("t1"));

    await user.selectOptions(filter(), "");
    await screen.findByTestId("txn-t2");
    expect(checkbox("t1")).toBeChecked();
  });

  it("keeps an approval the server has not confirmed yet when the view changes", async () => {
    const gate = deferred<void>();
    const { user } = await renderLedger((base) => ({
      "PUT /api/transactions/:id/approval": async (request) => {
        await gate.promise;
        return base["PUT /api/transactions/:id/approval"](request);
      },
    }));
    await employeesLoaded();
    await user.click(checkbox("t3"));

    await user.selectOptions(filter(), "e3");
    await screen.findByTestId("txn-t6");
    expect(checkbox("t3")).toBeChecked();
    gate.resolve();
  });

  it("shows the latest choice even when an earlier request answers last", async () => {
    const slow = deferred<void>();
    const { user } = await renderLedger((base) => ({
      "GET /api/employees/:id/transactions": async (request) => {
        if (request.params.id === "e1") await slow.promise;
        return base["GET /api/employees/:id/transactions"](request);
      },
    }));
    await employeesLoaded();

    await user.selectOptions(filter(), "e1");
    await user.selectOptions(filter(), "e2");
    await screen.findByTestId("txn-t11");

    slow.resolve();
    await new Promise((settle) => setTimeout(settle, 20));
    expect(rowIds()).toEqual(["t2", "t5", "t8", "t11"]);
    expect(filter()).toHaveValue("e2");
  });
});
