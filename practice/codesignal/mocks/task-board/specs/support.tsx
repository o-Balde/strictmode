import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import type { Routes } from "../../../shared/mock-server";
import { stubApi } from "../../../test/fetch";
import App from "../src/App";
import { routes } from "../server";

/**
 * Every level serves the API, so the Level 1–2 specs keep passing after
 * Level 3 swaps data.json for `fetch`: the API returns the same tasks.
 */
export async function renderBoard(overrides: Routes = {}) {
  const api = stubApi({ ...routes, ...overrides });
  const view = render(<App />);
  await screen.findByTestId("card-t3");
  return { api, ...view };
}

export function renderApp(overrides: Routes = {}) {
  const api = stubApi({ ...routes, ...overrides });
  return { api, ...render(<App />) };
}

export const column = (status: string) => screen.getByTestId(`column-${status}`);

/** Card test ids in a column, in DOM order. */
export const cardIds = (status: string) =>
  within(column(status))
    .queryAllByTestId(/^card-/)
    .map((card) => card.dataset.testid);

export const count = (status: string) => screen.getByTestId(`count-${status}`).textContent?.trim();

/** React reports duplicate or missing keys through console.error in development. */
export function watchKeyWarnings() {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  return () =>
    spy.mock.calls.filter((args) => /same key|unique "key"/.test(args.map(String).join(" ")));
}
