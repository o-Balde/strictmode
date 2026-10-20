import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProgressQueue } from "../src/ProgressQueue";

const progress = () =>
  screen.queryAllByRole("progressbar").map((bar) => Number(bar.getAttribute("aria-valuenow")));
const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const press = (name: string) => fireEvent.click(screen.getByRole("button", { name }));

describe("Progress queue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("adds an empty bar that fills over two seconds", () => {
    render(<ProgressQueue />);
    press("Add");
    expect(progress()).toEqual([0]);
    tick(1000);
    expect(progress()).toEqual([50]);
    tick(1000);
    expect(progress()).toEqual([100]);
  });

  it("describes each bar for assistive technology", () => {
    render(<ProgressQueue />);
    press("Add");
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("fills at most three bars at once; the rest wait their turn", () => {
    render(<ProgressQueue />);
    for (let index = 0; index < 5; index += 1) press("Add");

    tick(1000);
    expect(progress()).toEqual([50, 50, 50, 0, 0]);
    tick(1000);
    expect(progress()).toEqual([100, 100, 100, 0, 0]);
    tick(1000);
    expect(progress()).toEqual([100, 100, 100, 50, 50]);
  });

  it("starts a waiting bar as soon as a slot frees up", () => {
    render(<ProgressQueue />);
    press("Add");
    tick(1000);
    press("Add");
    press("Add");
    press("Add");
    tick(1000);
    expect(progress()).toEqual([100, 50, 50, 0]);
    tick(500);
    expect(progress()).toEqual([100, 75, 75, 25]);
  });

  it("pauses and resumes where it left off", () => {
    render(<ProgressQueue />);
    press("Add");
    tick(1000);
    press("Pause");
    expect(screen.getByRole("button", { name: "Resume" })).toBeInTheDocument();
    tick(5000);
    expect(progress()).toEqual([50]);

    press("Resume");
    tick(1000);
    expect(progress()).toEqual([100]);
  });

  it("removes every bar on Reset, and starts fresh after", () => {
    render(<ProgressQueue />);
    press("Add");
    press("Add");
    tick(500);
    press("Reset");
    expect(progress()).toEqual([]);

    press("Add");
    tick(1000);
    expect(progress()).toEqual([50]);
  });

  it("honours a custom duration and limit", () => {
    render(<ProgressQueue durationMs={1000} limit={1} />);
    press("Add");
    press("Add");
    tick(500);
    expect(progress()).toEqual([50, 0]);
  });

  it("holds no timer when nothing can move, or after unmounting", () => {
    const { unmount } = render(<ProgressQueue />);
    expect(vi.getTimerCount()).toBe(0);
    press("Add");
    tick(2000);
    expect(vi.getTimerCount()).toBe(0);

    press("Add");
    press("Pause");
    expect(vi.getTimerCount()).toBe(0);
    press("Resume");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
