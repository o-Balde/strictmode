import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Routes } from "../../../shared/mock-server";
import { stubApi } from "../../../test/fetch";
import App from "../src/App";
import { createRoutes } from "../server";

/** Override some endpoints; `base` is this test's own server, so overrides can delegate to it. */
export type Customize = (base: Routes) => Routes;

export function renderApp(customize: Customize = () => ({})) {
  const base = createRoutes();
  const api = stubApi({ ...base, ...customize(base) });
  return { api, user: userEvent.setup(), ...render(<App />) };
}

/** Page 0 equals transactions.json, so Levels 1–2 pass before and after Level 3. */
export async function renderLedger(customize?: Customize) {
  const rendered = renderApp(customize);
  await screen.findByTestId("txn-t1");
  return rendered;
}

export const rowIds = () =>
  screen.queryAllByTestId(/^txn-/).map((row) => row.dataset.testid?.replace("txn-", ""));

export const checkbox = (id: string) => screen.getByTestId(`approve-${id}`);
export const total = () => screen.getByTestId("ledger-total");
export const summary = () => screen.getByTestId("approved-summary");
export const viewMore = () => screen.queryByTestId("view-more");

export const transactionPages = (calls: { method: string; path: string }[]) =>
  calls.filter((call) => call.method === "GET" && call.path.startsWith("/api/transactions")).map((call) => call.path);
