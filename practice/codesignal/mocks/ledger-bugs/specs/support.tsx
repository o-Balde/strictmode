import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Routes } from "../../../shared/mock-server";
import { stubApi } from "../../../test/fetch";
import { createRoutes } from "../../ledger/server";
import App from "../src/App";

export type Customize = (base: Routes) => Routes;

export function renderApp(customize: Customize = () => ({})) {
  const base = createRoutes();
  const api = stubApi({ ...base, ...customize(base) });
  return { api, user: userEvent.setup(), ...render(<App />) };
}

export async function renderLedger(customize?: Customize) {
  const rendered = renderApp(customize);
  await screen.findByTestId("txn-t1");
  await screen.findByRole("option", { name: "Ana Lee" });
  return rendered;
}

export const rowIds = () =>
  screen.queryAllByTestId(/^txn-/).map((row) => row.dataset.testid?.replace("txn-", ""));

export const filter = () => screen.getByTestId("employee-filter");
export const viewMore = () => screen.queryByTestId("view-more");
