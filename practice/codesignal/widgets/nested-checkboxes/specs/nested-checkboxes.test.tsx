import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GROCERIES } from "../tree";
import { CheckboxTree } from "../src/CheckboxTree";

const box = (label: string) => screen.getByRole("checkbox", { name: label }) as HTMLInputElement;

function setup() {
  const user = userEvent.setup();
  render(<CheckboxTree nodes={GROCERIES} />);
  return user;
}

describe("Nested checkboxes", () => {
  it("renders every node as a labelled, unchecked checkbox, children nested in their parent", () => {
    setup();
    for (const label of ["Fruit", "Apple", "Banana", "Citrus", "Lemon", "Orange", "Vegetables", "Carrot", "Pea"]) {
      expect(box(label)).not.toBeChecked();
    }
    expect(box("Fruit").closest("li")).toContainElement(box("Lemon"));
    expect(box("Vegetables").closest("li")).not.toContainElement(box("Lemon"));
  });

  it("marks every ancestor of a checked leaf as indeterminate", async () => {
    const user = setup();
    await user.click(box("Lemon"));

    expect(box("Lemon")).toBeChecked();
    expect(box("Citrus").indeterminate).toBe(true);
    expect(box("Citrus")).not.toBeChecked();
    expect(box("Fruit").indeterminate).toBe(true);
    expect(box("Vegetables").indeterminate).toBe(false);
  });

  it("checks a parent once all of its leaves are checked", async () => {
    const user = setup();
    await user.click(box("Lemon"));
    await user.click(box("Orange"));

    expect(box("Citrus")).toBeChecked();
    expect(box("Citrus").indeterminate).toBe(false);
    expect(box("Fruit").indeterminate).toBe(true);
  });

  it("checks every descendant when a parent is checked", async () => {
    const user = setup();
    await user.click(box("Fruit"));

    for (const label of ["Fruit", "Apple", "Banana", "Citrus", "Lemon", "Orange"]) expect(box(label)).toBeChecked();
    expect(box("Carrot")).not.toBeChecked();
  });

  it("unchecks every descendant when a checked parent is clicked", async () => {
    const user = setup();
    await user.click(box("Citrus"));
    await user.click(box("Citrus"));

    expect(box("Lemon")).not.toBeChecked();
    expect(box("Orange")).not.toBeChecked();
    expect(box("Fruit").indeterminate).toBe(false);
  });

  it("checks everything under an indeterminate parent when it is clicked", async () => {
    const user = setup();
    await user.click(box("Apple"));
    await user.click(box("Fruit"));

    expect(box("Fruit")).toBeChecked();
    expect(box("Orange")).toBeChecked();
  });

  it("turns a checked parent indeterminate when one leaf is unchecked", async () => {
    const user = setup();
    await user.click(box("Vegetables"));
    await user.click(box("Pea"));

    expect(box("Vegetables")).not.toBeChecked();
    expect(box("Vegetables").indeterminate).toBe(true);
    expect(box("Vegetables")).toBePartiallyChecked();
  });
});
