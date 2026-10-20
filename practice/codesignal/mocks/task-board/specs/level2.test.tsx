import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { cardIds, column, count, renderBoard } from "./support";

const titleField = () => screen.getByPlaceholderText("Task title*");
const descriptionField = () => screen.getByPlaceholderText("Task description*");
const createButton = () => screen.getByRole("button", { name: "Create task" });

async function createTask(user: ReturnType<typeof userEvent.setup>, title: string, description: string) {
  if (title) await user.type(titleField(), title);
  if (description) await user.type(descriptionField(), description);
  await user.click(createButton());
}

describe("Level 2: dynamic interaction", () => {
  it("renders the form from the template", async () => {
    await renderBoard();
    expect(titleField()).toHaveAttribute("name", "taskTitle");
    expect(descriptionField().tagName).toBe("TEXTAREA");
    expect(descriptionField()).toHaveAttribute("name", "taskDescription");
    expect(createButton()).toHaveAttribute("type", "submit");
  });

  it("appends a new task to the end of To do", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "Ship it", "Deploy v2 to production");

    const ids = cardIds("TO_DO");
    expect(ids).toHaveLength(4);
    const created = screen.getByTestId(ids[3]!);
    expect(created.querySelector(".card__title")).toHaveTextContent("Ship it");
    expect(created.querySelector(".card__description")).toHaveTextContent("Deploy v2 to production");
    expect(count("TO_DO")).toBe("4");
  });

  it("trims the title and description", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "   Padded title  ", "  padded description   ");

    const created = screen.getByTestId(cardIds("TO_DO")[3]!);
    expect(created.querySelector(".card__title")?.textContent).toBe("Padded title");
    expect(created.querySelector(".card__description")?.textContent).toBe("padded description");
  });

  it("refuses a blank title and says why", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "", "Has a description");

    expect(screen.getByRole("alert")).toHaveTextContent("Title and description are required");
    expect(screen.getByRole("alert")).toHaveClass("form__error");
    expect(cardIds("TO_DO")).toHaveLength(3);
  });

  it("refuses a description that is only whitespace", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "Has a title", "    ");

    expect(screen.getByRole("alert")).toHaveTextContent("Title and description are required");
    expect(count("TO_DO")).toBe("3");
  });

  it("clears both fields and the error after a successful submit", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "", "");
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await createTask(user, "Valid", "Also valid");
    expect(titleField()).toHaveValue("");
    expect(descriptionField()).toHaveValue("");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("submits when Enter is pressed in the title field", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.type(descriptionField(), "From the keyboard");
    await user.type(titleField(), "Keyboard task{Enter}");

    expect(within(column("TO_DO")).getByText("Keyboard task")).toBeInTheDocument();
  });

  it("gives tasks with the same title distinct cards", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "Same", "first");
    await createTask(user, "Same", "second");

    const ids = screen.getAllByTestId(/^card-/).map((card) => card.dataset.testid);
    expect(new Set(ids).size).toBe(ids.length);
    expect(within(column("TO_DO")).getAllByText("Same")).toHaveLength(2);
  });

  it("does not let the browser submit the form for real", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    await renderBoard();
    await createTask(user, "No reload", "please");

    const notImplemented = errors.mock.calls.filter((args) => /Not implemented/.test(args.map(String).join(" ")));
    expect(notImplemented).toEqual([]);
  });
});
