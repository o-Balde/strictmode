import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cardIds, column, count, renderBoard, watchKeyWarnings } from "./support";

describe("Level 1: common layout and basic rendering", () => {
  it("renders the board title", async () => {
    await renderBoard();
    const title = screen.getByRole("heading", { level: 2, name: "Tasks" });
    expect(title).toHaveClass("board__title");
    expect(title.closest(".board")).not.toBeNull();
  });

  it("renders three columns in order, each with its label", async () => {
    await renderBoard();
    const columns = screen.getAllByTestId(/^column-/);
    expect(columns.map((element) => element.dataset.testid)).toEqual([
      "column-TO_DO",
      "column-IN_PROGRESS",
      "column-DONE",
    ]);
    expect(columns.map((element) => element.querySelector(".column__title")?.textContent)).toEqual([
      "To do",
      "In progress",
      "Done",
    ]);
  });

  it("puts every task in the column its status names", async () => {
    await renderBoard();
    expect(cardIds("TO_DO")).toEqual(["card-t3", "card-t4", "card-t5"]);
    expect(cardIds("IN_PROGRESS")).toEqual(["card-t1"]);
    expect(cardIds("DONE")).toEqual([]);
  });

  it("shows each card's title and description with the template's classes", async () => {
    await renderBoard();
    const card = screen.getByTestId("card-t1");
    expect(card).toHaveClass("card");
    expect(card.querySelector(".card__title")).toHaveTextContent("Design review");
    expect(card.querySelector(".card__description")).toHaveTextContent("Walk through the new dashboard");
  });

  it("renders two tasks that share a title as two separate cards, without key warnings", async () => {
    const keyWarnings = watchKeyWarnings();
    await renderBoard();
    expect(within(column("TO_DO")).getAllByText("Fix flaky test")).toHaveLength(2);
    expect(screen.getByTestId("card-t4")).toHaveTextContent("checkout.spec times out on CI");
    expect(screen.getByTestId("card-t5")).toHaveTextContent("search.spec fails on Mondays");
    expect(keyWarnings()).toEqual([]);
  });

  it("shows how many cards each column holds", async () => {
    await renderBoard();
    expect([count("TO_DO"), count("IN_PROGRESS"), count("DONE")]).toEqual(["3", "1", "0"]);
  });

  it("shows 'No tasks' in an empty column, and only there", async () => {
    await renderBoard();
    expect(within(column("DONE")).getByText("No tasks")).toHaveClass("column__empty");
    expect(within(column("TO_DO")).queryByText("No tasks")).toBeNull();
    expect(within(column("IN_PROGRESS")).queryByText("No tasks")).toBeNull();
  });
});
