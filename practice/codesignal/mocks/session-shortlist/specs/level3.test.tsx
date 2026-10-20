import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { fail, offline, ok } from "../../../shared/mock-server";
import { deferred } from "../../../test/fetch";
import type { ApiSession } from "../contract";
import { API_SESSIONS } from "../server";
import { renderApp, renderShortlist, summary, toggle, visibleIds } from "./support";

const refresh = () => screen.getByTestId("refresh-btn");

describe("Level 3: load the catalogue from the API", () => {
  it("shows Loading... and disables refresh while the request is in flight", async () => {
    const gate = deferred<void>();
    renderApp({
      "GET /api/sessions": async () => {
        await gate.promise;
        return ok(API_SESSIONS);
      },
    });

    expect(screen.getByTestId("status-msg")).toHaveTextContent(/^Loading\.\.\.$/);
    expect(refresh()).toBeDisabled();
    expect(refresh()).toHaveTextContent("Refresh catalogue");

    gate.resolve();
    expect(await screen.findByTestId("session-card-s1")).toBeInTheDocument();
    expect(screen.queryByTestId("status-msg")).toBeNull();
    expect(refresh()).toBeEnabled();
  });

  it("maps the API's field names onto the cards", async () => {
    renderApp({
      "GET /api/sessions": () =>
        ok([{ session_id: "x9", session_title: "Only From The API", category: "AI", available_spots: 4 }]),
    });

    expect(await screen.findByTestId("session-card-x9")).toHaveTextContent("Only From The API");
    expect(screen.getByTestId("session-card-x9")).toHaveTextContent("AI");
    expect(screen.getByTestId("seats-x9")).toHaveTextContent("4 seats left");
  });

  it("reports a failed request and recovers on Retry", async () => {
    let healthy = false;
    const { user } = renderApp({ "GET /api/sessions": () => (healthy ? ok(API_SESSIONS) : fail(500, [])) });

    expect(await screen.findByTestId("error-msg")).toHaveTextContent("Failed to load sessions");

    healthy = true;
    await user.click(screen.getByTestId("retry-btn"));
    expect(await screen.findByTestId("session-card-s1")).toBeInTheDocument();
    expect(screen.queryByTestId("error-msg")).toBeNull();
  });

  it("treats a dropped connection as a failure too", async () => {
    renderApp({ "GET /api/sessions": () => offline() });
    expect(await screen.findByTestId("error-msg")).toHaveTextContent("Failed to load sessions");
  });

  it("keeps the current sessions and shortlist on screen when a refresh fails", async () => {
    let healthy = true;
    const { user } = await renderShortlist({
      "GET /api/sessions": () => (healthy ? ok(API_SESSIONS) : fail(503)),
    });
    await user.click(toggle("s1"));

    healthy = false;
    await user.click(refresh());
    expect(await screen.findByTestId("error-msg")).toBeInTheDocument();
    expect(visibleIds()).toHaveLength(7);
    expect(toggle("s1")).toHaveTextContent("Selected");
    expect(summary()).toHaveTextContent(/^1 selected$/);
  });

  it("rejects a payload with duplicate ids instead of rendering it", async () => {
    let payload: ApiSession[] = API_SESSIONS;
    const { user } = await renderShortlist({ "GET /api/sessions": () => ok(payload) });

    payload = [API_SESSIONS[0], { ...API_SESSIONS[1], session_id: "s1" }];
    await user.click(refresh());
    expect(await screen.findByTestId("error-msg")).toHaveTextContent("Failed to load sessions");
    expect(visibleIds()).toHaveLength(7);
  });

  it("says so when the catalogue is legitimately empty", async () => {
    renderApp({ "GET /api/sessions": () => ok([]) });
    expect(await screen.findByTestId("empty-msg")).toHaveTextContent("No sessions available");
    expect(screen.queryByTestId("error-msg")).toBeNull();
  });

  it("drops selections that vanished or filled up, and keeps the rest", async () => {
    let payload: ApiSession[] = API_SESSIONS;
    const { user } = await renderShortlist({ "GET /api/sessions": () => ok(payload) });
    for (const id of ["s1", "s3", "s4"]) await user.click(toggle(id));

    payload = API_SESSIONS.filter((session) => session.session_id !== "s4").map((session) =>
      session.session_id === "s3" ? { ...session, available_spots: 0 } : session,
    );
    await user.click(refresh());

    expect(await screen.findByText("Full", { selector: '[data-testid="seats-s3"]' })).toBeInTheDocument();
    expect(summary()).toHaveTextContent(/^1 selected$/);
    expect(toggle("s1")).toHaveTextContent("Selected");
    expect(toggle("s3")).toBeDisabled();
    expect(screen.queryByTestId("session-card-s4")).toBeNull();
  });
});
