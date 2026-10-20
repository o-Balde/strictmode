import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fail } from "../../../shared/mock-server";
import { stubApi } from "../../../test/fetch";
import { Typewriter, TypewriterFromUrl } from "../src/Typewriter";

const shown = () => screen.getByTestId("typewriter").textContent;
const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe("Typewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("starts empty and reveals one character per interval", () => {
    render(<Typewriter text="Hello" intervalMs={100} />);
    expect(shown()).toBe("");
    tick(100);
    expect(shown()).toBe("H");
    tick(300);
    expect(shown()).toBe("Hell");
    tick(100);
    expect(shown()).toBe("Hello");
    tick(1000);
    expect(shown()).toBe("Hello");
  });

  it("types every 50ms by default", () => {
    render(<Typewriter text="abc" />);
    tick(100);
    expect(shown()).toBe("ab");
  });

  it("calls onDone once, when the last character appears", () => {
    const onDone = vi.fn();
    render(<Typewriter text="Hi" intervalMs={100} onDone={onDone} />);
    tick(100);
    expect(onDone).not.toHaveBeenCalled();
    tick(100);
    expect(onDone).toHaveBeenCalledTimes(1);
    tick(1000);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("starts over when the text changes", () => {
    const { rerender } = render(<Typewriter text="Hello" intervalMs={100} />);
    tick(300);
    rerender(<Typewriter text="Bye" intervalMs={100} />);
    expect(shown()).toBe("");
    tick(100);
    expect(shown()).toBe("B");
    tick(200);
    expect(shown()).toBe("Bye");
  });

  it("keeps typing when the parent re-renders with a new onDone", () => {
    const { rerender } = render(<Typewriter text="Hello" intervalMs={100} onDone={() => {}} />);
    tick(200);
    rerender(<Typewriter text="Hello" intervalMs={100} onDone={() => {}} />);
    expect(shown()).toBe("He");
    tick(100);
    expect(shown()).toBe("Hel");
  });

  it("never shows half an emoji", () => {
    render(<Typewriter text="Hi 👋!" intervalMs={100} />);
    tick(300);
    expect(shown()).toBe("Hi ");
    tick(100);
    expect(shown()).toBe("Hi 👋");
    tick(100);
    expect(shown()).toBe("Hi 👋!");
  });

  it("leaves no timer running once finished or unmounted", () => {
    const { unmount } = render(<Typewriter text="ab" intervalMs={100} />);
    tick(200);
    expect(vi.getTimerCount()).toBe(0);

    const second = render(<Typewriter text="long text" intervalMs={100} />);
    tick(200);
    second.unmount();
    expect(vi.getTimerCount()).toBe(0);
    unmount();
  });
});

describe("TypewriterFromUrl", () => {
  it("shows Loading..., then types out the text it fetched", async () => {
    stubApi({ "GET /api/flag": () => ({ text: "  welcome-to-ramp \n" }) });
    render(<TypewriterFromUrl url="/api/flag" intervalMs={1} />);

    expect(screen.getByTestId("typewriter-status")).toHaveTextContent("Loading...");
    expect(await screen.findByText("welcome-to-ramp")).toBeInTheDocument();
  });

  it("says so when the request fails", async () => {
    stubApi({ "GET /api/flag": () => fail(404, { error: "Not found" }) });
    render(<TypewriterFromUrl url="/api/flag" />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to load");
  });
});
