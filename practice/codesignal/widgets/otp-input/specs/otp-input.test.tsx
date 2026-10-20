import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OtpInput } from "../src/OtpInput";

const box = (n: number) => screen.getByLabelText(`Digit ${n}`) as HTMLInputElement;
const values = () => screen.getAllByLabelText(/^Digit \d$/).map((input) => (input as HTMLInputElement).value);

function setup(props: Parameters<typeof OtpInput>[0] = {}) {
  const onComplete = vi.fn();
  const user = userEvent.setup();
  render(<OtpInput onComplete={onComplete} {...props} />);
  return { user, onComplete };
}

describe("OTP input", () => {
  it("renders six labelled boxes and focuses the first", () => {
    setup();
    expect(values()).toEqual(["", "", "", "", "", ""]);
    expect(box(1)).toHaveFocus();
  });

  it("fills the box and moves to the next one", async () => {
    const { user } = setup();
    await user.keyboard("1");
    expect(box(1)).toHaveValue("1");
    expect(box(2)).toHaveFocus();
  });

  it("reports the code once every box is filled", async () => {
    const { user, onComplete } = setup();
    await user.keyboard("12345");
    expect(onComplete).not.toHaveBeenCalled();
    await user.keyboard("6");
    expect(values()).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("ignores anything that is not a digit", async () => {
    const { user } = setup();
    await user.keyboard("a- ");
    expect(box(1)).toHaveValue("");
    expect(box(1)).toHaveFocus();
  });

  it("clears a filled box on Backspace and stays there", async () => {
    const { user } = setup();
    await user.keyboard("12{ArrowLeft}");
    expect(box(2)).toHaveFocus();
    await user.keyboard("{Backspace}");
    expect(values()).toEqual(["1", "", "", "", "", ""]);
    expect(box(2)).toHaveFocus();
  });

  it("steps back and clears the previous box on Backspace in an empty one", async () => {
    const { user } = setup();
    await user.keyboard("12");
    expect(box(3)).toHaveFocus();
    await user.keyboard("{Backspace}");
    expect(values()).toEqual(["1", "", "", "", "", ""]);
    expect(box(2)).toHaveFocus();
  });

  it("moves with the arrow keys and stops at the ends", async () => {
    const { user } = setup();
    await user.keyboard("{ArrowLeft}");
    expect(box(1)).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(box(3)).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}");
    expect(box(6)).toHaveFocus();
  });

  it("spreads a pasted code across the boxes", async () => {
    const { user, onComplete } = setup();
    await user.paste("123456");
    expect(values()).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("123456");
    expect(box(6)).toHaveFocus();
  });

  it("keeps only the digits of a pasted code", async () => {
    const { user } = setup();
    await user.paste("12-34 56");
    expect(values()).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("pastes from the focused box onwards", async () => {
    const { user } = setup();
    await user.click(box(3));
    await user.paste("999");
    expect(values()).toEqual(["", "", "9", "9", "9", ""]);
    expect(box(6)).toHaveFocus();
  });

  it("replaces a digit when typing into a filled box", async () => {
    const { user, onComplete } = setup();
    await user.paste("123456");
    await user.click(box(2));
    await user.keyboard("7");
    expect(values()).toEqual(["1", "7", "3", "4", "5", "6"]);
    expect(onComplete).toHaveBeenLastCalledWith("173456");
  });

  it("supports other lengths", async () => {
    const { user, onComplete } = setup({ length: 4 });
    expect(values()).toHaveLength(4);
    await user.keyboard("9876");
    expect(onComplete).toHaveBeenCalledWith("9876");
  });
});
