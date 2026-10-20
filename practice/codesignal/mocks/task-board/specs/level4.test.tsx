import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { cardIds, column, count, renderBoard } from "./support";

const card = (id: string) => screen.getByTestId(`card-${id}`);
const button = (id: string, name: string) => within(card(id)).queryByRole("button", { name });

describe("Level 4: extending the design", () => {
  it("shows only the move buttons that make sense for the column", async () => {
    const user = userEvent.setup();
    await renderBoard();

    expect(button("t3", "button left")).toBeNull();
    expect(button("t3", "button right")).toBeInTheDocument();
    expect(button("t1", "button left")).toBeInTheDocument();
    expect(button("t1", "button right")).toBeInTheDocument();

    await user.click(button("t1", "button right")!);
    expect(button("t1", "button right")).toBeNull();
    expect(button("t1", "button left")).toBeInTheDocument();
  });

  it("uses the template's markup for the buttons", async () => {
    await renderBoard();
    const right = button("t3", "button right")!;
    expect(right).toHaveClass("card__button", "card__button--right");
    expect(right).toHaveAttribute("type", "button");
    expect(right.closest(".card__buttons")).not.toBeNull();
  });

  it("moves a card right, to the end of the next column", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.click(button("t3", "button right")!);

    expect(cardIds("IN_PROGRESS")).toEqual(["card-t1", "card-t3"]);
    expect(cardIds("TO_DO")).toEqual(["card-t4", "card-t5"]);
    expect([count("TO_DO"), count("IN_PROGRESS"), count("DONE")]).toEqual(["2", "2", "0"]);
  });

  it("moves a card left, to the end of the previous column", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.click(button("t1", "button left")!);

    expect(cardIds("TO_DO")).toEqual(["card-t3", "card-t4", "card-t5", "card-t1"]);
    expect(within(column("IN_PROGRESS")).getByText("No tasks")).toBeInTheDocument();
  });

  it("keeps everything about a card when it moves", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.click(button("t1", "button right")!);

    const moved = within(column("DONE")).getByTestId("card-t1");
    expect(moved).toHaveTextContent("Design review");
    expect(moved).toHaveTextContent("Walk through the new dashboard");
    expect(moved.querySelector(".card__assignee")).toHaveTextContent("Assigned to Andrew Quill");
    expect(within(column("DONE")).queryByText("No tasks")).toBeNull();
  });

  it("moves only the card that was clicked when two share a title", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.click(button("t5", "button right")!);

    expect(cardIds("TO_DO")).toEqual(["card-t3", "card-t4"]);
    expect(cardIds("IN_PROGRESS")).toEqual(["card-t1", "card-t5"]);
    expect(card("t4")).toHaveTextContent("checkout.spec times out on CI");
  });

  it("moves a task created with the form", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.type(screen.getByPlaceholderText("Task title*"), "Fresh");
    await user.type(screen.getByPlaceholderText("Task description*"), "Made in Level 2");
    await user.click(screen.getByRole("button", { name: "Create task" }));

    const fresh = within(column("TO_DO")).getByText("Fresh").closest<HTMLElement>(".card")!;
    await user.click(within(fresh).getByRole("button", { name: "button right" }));
    expect(within(column("IN_PROGRESS")).getByText("Fresh")).toBeInTheDocument();
  });

  it("deletes only the card whose delete button was clicked", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.click(button("t4", "delete task")!);

    expect(screen.queryByTestId("card-t4")).toBeNull();
    expect(cardIds("TO_DO")).toEqual(["card-t3", "card-t5"]);
    expect(count("TO_DO")).toBe("2");
  });
});
