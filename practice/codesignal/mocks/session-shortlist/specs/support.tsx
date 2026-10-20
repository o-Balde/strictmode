import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Routes } from "../../../shared/mock-server";
import { stubApi } from "../../../test/fetch";
import App from "../src/App";
import { routes } from "../server";

/** The API serves sessions.json, so Levels 1–2 pass both before and after Level 3. */
export async function renderShortlist(overrides: Routes = {}) {
  const api = stubApi({ ...routes, ...overrides });
  const user = userEvent.setup();
  const view = render(<App />);
  await screen.findByTestId("session-card-s1");
  return { api, user, ...view };
}

export function renderApp(overrides: Routes = {}) {
  const api = stubApi({ ...routes, ...overrides });
  return { api, user: userEvent.setup(), ...render(<App />) };
}

export const toggle = (id: string) => screen.getByTestId(`toggle-btn-${id}`);
export const summary = () => screen.getByTestId("selected-summary");

/** Ids of the cards currently in the DOM, in order. */
export const visibleIds = () =>
  screen.queryAllByTestId(/^session-card-/).map((card) => card.dataset.testid?.replace("session-card-", ""));
