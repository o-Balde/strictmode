import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderShortlist, summary, toggle, visibleIds } from "./support";

describe("Level 1: render the catalogue", () => {
  it("renders one card per session, in catalogue order", async () => {
    await renderShortlist();
    expect(visibleIds()).toEqual(["s1", "s2", "s3", "s4", "s5", "s6", "s7"]);
  });

  it("shows each session's title and track", async () => {
    await renderShortlist();
    const card = screen.getByTestId("session-card-s5");
    expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent("Scaling Postgres");
    expect(card).toHaveTextContent("Architecture");
  });

  it("shows the seats left, with the right plural", async () => {
    await renderShortlist();
    expect(screen.getByTestId("seats-s1")).toHaveTextContent(/^12 seats left$/);
    expect(screen.getByTestId("seats-s3")).toHaveTextContent(/^1 seat left$/);
    expect(screen.getByTestId("seats-s2")).toHaveTextContent(/^Full$/);
  });

  it("offers Select on sessions with room", async () => {
    await renderShortlist();
    expect(toggle("s1")).toHaveTextContent("Select");
    expect(toggle("s1")).toBeEnabled();
  });

  it("disables a full session's button and labels it Full", async () => {
    await renderShortlist();
    expect(toggle("s2")).toHaveTextContent("Full");
    expect(toggle("s2")).toBeDisabled();
  });

  it("starts with an empty shortlist", async () => {
    await renderShortlist();
    expect(summary()).toHaveTextContent(/^0 selected$/);
  });
});
