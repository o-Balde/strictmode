import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { fail, ok, offline } from "../../../shared/mock-server";
import { deferred } from "../../../test/fetch";
import {
  checkbox,
  renderApp,
  renderLedger,
  rowIds,
  summary,
  total,
  transactionPages,
  viewMore,
} from "./support";

describe("Level 3: paginate from the API, save approvals", () => {
  it("shows a loading message until the first page arrives", async () => {
    const gate = deferred<void>();
    renderApp((base) => ({
      "GET /api/transactions": async (request) => {
        await gate.promise;
        return base["GET /api/transactions"](request);
      },
    }));

    expect(screen.getByTestId("ledger-status")).toHaveTextContent("Loading transactions...");
    gate.resolve();
    expect(await screen.findByTestId("txn-t1")).toBeInTheDocument();
    expect(screen.queryByTestId("ledger-status")).toBeNull();
  });

  it("appends the next page on View more, keeping the rows already shown", async () => {
    const { user } = await renderLedger();
    await user.click(viewMore()!);

    expect(await screen.findByTestId("txn-t10")).toBeInTheDocument();
    expect(rowIds()).toEqual(["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"]);
  });

  it("asks for each page once, in order, and hides View more after the last", async () => {
    const { api, user } = await renderLedger();
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t10");
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t12");

    expect(rowIds()).toHaveLength(12);
    expect(viewMore()).toBeNull();
    expect(transactionPages(api.calls)).toEqual([
      "/api/transactions?page=0",
      "/api/transactions?page=1",
      "/api/transactions?page=2",
    ]);
  });

  it("disables View more and says Loading... while a page is in flight", async () => {
    const gate = deferred<void>();
    const { user } = await renderLedger((base) => ({
      "GET /api/transactions": async (request) => {
        if (request.url.searchParams.get("page") === "1") await gate.promise;
        return base["GET /api/transactions"](request);
      },
    }));

    await user.click(viewMore()!);
    expect(viewMore()).toBeDisabled();
    expect(viewMore()).toHaveTextContent("Loading...");
    expect(rowIds()).toHaveLength(5);

    gate.resolve();
    expect(await screen.findByTestId("txn-t6")).toBeInTheDocument();
    expect(viewMore()).toBeEnabled();
  });

  it("recovers from a failed first page with Retry", async () => {
    let healthy = false;
    const { user } = renderApp((base) => ({
      "GET /api/transactions": (request) => (healthy ? base["GET /api/transactions"](request) : offline()),
    }));

    expect(await screen.findByTestId("ledger-error")).toHaveTextContent("Could not load transactions");
    healthy = true;
    await user.click(screen.getByTestId("retry-btn"));
    expect(await screen.findByTestId("txn-t1")).toBeInTheDocument();
    expect(screen.queryByTestId("ledger-error")).toBeNull();
  });

  it("keeps loaded rows when a later page fails, and Retry appends that page", async () => {
    let healthy = false;
    const { user } = await renderLedger((base) => ({
      "GET /api/transactions": (request) =>
        request.url.searchParams.get("page") === "1" && !healthy
          ? fail(500, { data: [], nextPage: null })
          : base["GET /api/transactions"](request),
    }));

    await user.click(viewMore()!);
    expect(await screen.findByTestId("ledger-error")).toBeInTheDocument();
    expect(rowIds()).toHaveLength(5);

    healthy = true;
    await user.click(screen.getByTestId("retry-btn"));
    expect(await screen.findByTestId("txn-t10")).toBeInTheDocument();
    expect(rowIds()).toHaveLength(10);
  });

  it("saves an approval with PUT and the new value", async () => {
    const { api, user } = await renderLedger();
    await user.click(checkbox("t1"));

    expect(api.calls).toContainEqual({
      method: "PUT",
      path: "/api/transactions/t1/approval",
      body: { approved: true },
    });
  });

  it("flips the box immediately, before the server answers", async () => {
    const gate = deferred<void>();
    const { user } = await renderLedger((base) => ({
      "PUT /api/transactions/:id/approval": async (request) => {
        await gate.promise;
        return base["PUT /api/transactions/:id/approval"](request);
      },
    }));

    await user.click(checkbox("t3"));
    expect(checkbox("t3")).toBeChecked();
    gate.resolve();
  });

  it("puts the box back and says so when saving fails", async () => {
    const { user } = await renderLedger(() => ({ "PUT /api/transactions/:id/approval": () => fail(503) }));
    await user.click(checkbox("t1"));

    expect(await screen.findByTestId("approval-error")).toHaveTextContent("Could not update approval");
    expect(checkbox("t1")).not.toBeChecked();
    expect(summary()).toHaveTextContent(/^2 of 5 approved/);
  });

  it("totals and summarises every loaded page", async () => {
    const { user } = await renderLedger();
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t10");

    expect(total()).toHaveTextContent(/^Total: \$4,383\.74$/);
    expect(summary()).toHaveTextContent(/^3 of 10 approved \(\$1,334\.49\)$/);
  });

  it("says when there are no transactions at all", async () => {
    renderApp(() => ({ "GET /api/transactions": () => ok({ data: [], nextPage: null }) }));

    expect(await screen.findByTestId("ledger-empty")).toHaveTextContent("No transactions");
    expect(viewMore()).toBeNull();
  });
});
