import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ok } from "../../../shared/mock-server";
import type { ApiSession } from "../contract";
import { API_SESSIONS } from "../server";
import { renderShortlist, summary, toggle, visibleIds } from "./support";

const filter = (name: string) => screen.getByTestId(`filter-${name}`);
const search = () => screen.getByTestId("search-input");

describe("Level 4: filter, search and bulk-clear", () => {
  it("filters by track and marks the active filter", async () => {
    const { user } = await renderShortlist();
    expect(filter("All")).toHaveAttribute("aria-pressed", "true");

    await user.click(filter("AI"));
    expect(visibleIds()).toEqual(["s3", "s6"]);
    expect(filter("AI")).toHaveAttribute("aria-pressed", "true");
    expect(filter("All")).toHaveAttribute("aria-pressed", "false");
  });

  it("searches titles case-insensitively, combined with the track", async () => {
    const { user } = await renderShortlist();
    await user.type(search(), "  REACT ");
    expect(visibleIds()).toEqual(["s1", "s7"]);

    await user.clear(search());
    await user.type(search(), "e");
    await user.click(filter("Architecture"));
    expect(visibleIds()).toEqual(["s2", "s5"]);
  });

  it("counts selections hidden by the filters", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));
    await user.click(filter("AI"));

    expect(screen.queryByTestId("session-card-s1")).toBeNull();
    expect(summary()).toHaveTextContent(/^1 selected$/);

    await user.click(filter("All"));
    expect(toggle("s1")).toHaveTextContent("Selected");
  });

  it("enforces the limit with hidden selections included", async () => {
    const { user } = await renderShortlist();
    for (const id of ["s1", "s4", "s7"]) await user.click(toggle(id));
    await user.click(filter("AI"));

    expect(toggle("s6")).toBeDisabled();
    expect(toggle("s3")).toBeDisabled();
  });

  it("clears only the visible selections", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));
    await user.click(toggle("s6"));
    await user.click(filter("Frontend"));
    await user.click(screen.getByTestId("clear-visible-btn"));

    expect(summary()).toHaveTextContent(/^1 selected$/);
    await user.click(filter("All"));
    expect(toggle("s6")).toHaveTextContent("Selected");
    expect(toggle("s1")).toHaveTextContent("Select");
  });

  it("explains an empty result instead of showing nothing", async () => {
    const { user } = await renderShortlist();
    await user.type(search(), "kubernetes");

    expect(visibleIds()).toEqual([]);
    expect(screen.getByTestId("empty-msg")).toHaveTextContent("No sessions match your filters");
  });

  it("keeps the filters, and reconciles hidden selections, across a refresh", async () => {
    let payload: ApiSession[] = API_SESSIONS;
    const { user } = await renderShortlist({ "GET /api/sessions": () => ok(payload) });
    await user.click(toggle("s1"));
    await user.click(toggle("s6"));
    await user.click(filter("AI"));

    payload = API_SESSIONS.filter((session) => session.session_id !== "s1");
    await user.click(screen.getByTestId("refresh-btn"));

    expect(await screen.findByTestId("session-card-s6")).toBeInTheDocument();
    expect(filter("AI")).toHaveAttribute("aria-pressed", "true");
    expect(visibleIds()).toEqual(["s3", "s6"]);
    expect(summary()).toHaveTextContent(/^1 selected$/);
  });
});
