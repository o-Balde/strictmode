import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deferred } from "../../../test/fetch";
import { Autocomplete, type SearchFn } from "../src/Autocomplete";

/** Each call waits for the test to answer it, through `answer(index, items)`. */
function controlledSearch() {
  const pending: { query: string; signal: AbortSignal; gate: ReturnType<typeof deferred<string[]>> }[] = [];
  const search = vi.fn<SearchFn>((query, signal) => {
    const gate = deferred<string[]>();
    pending.push({ query, signal, gate });
    return gate.promise;
  });
  const answer = (index: number, items: string[]) => act(async () => pending[index].gate.resolve(items));
  const reject = (index: number) => act(async () => pending[index].gate.reject(new Error("boom")));
  return { search, pending, answer, reject };
}

function setup(search: SearchFn) {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const view = render(<Autocomplete search={search} />);
  return { user, input: screen.getByLabelText("Search"), ...view };
}

const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const options = () => screen.queryAllByRole("option").map((option) => option.textContent);

describe("Autocomplete", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("searches once, for the whole term, 300ms after typing stops", async () => {
    const { search } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "rea");

    await wait(299);
    expect(search).not.toHaveBeenCalled();
    await wait(1);
    expect(search).toHaveBeenCalledTimes(1);
    expect(search.mock.calls[0][0]).toBe("rea");
  });

  it("trims the term and never searches for blank input", async () => {
    const { search } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "   ");
    await wait(1000);
    expect(search).not.toHaveBeenCalled();

    await user.type(input, "vue ");
    await wait(300);
    expect(search).toHaveBeenCalledWith("vue", expect.any(AbortSignal));
  });

  it("shows Loading... while searching, then the suggestions", async () => {
    const { search, answer } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "re");
    await wait(300);
    expect(screen.getByTestId("search-status")).toHaveTextContent("Loading...");

    await answer(0, ["react", "redux"]);
    expect(options()).toEqual(["react", "redux"]);
    expect(screen.queryByTestId("search-status")).toBeNull();
  });

  it("says No results for an empty answer", async () => {
    const { search, answer } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "zzz");
    await wait(300);
    await answer(0, []);
    expect(screen.getByTestId("search-status")).toHaveTextContent("No results");
  });

  it("says Something went wrong when the search fails", async () => {
    const { search, reject } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "re");
    await wait(300);
    await reject(0);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("aborts the request in flight when the term changes", async () => {
    const { search, pending } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "re");
    await wait(300);
    await user.type(input, "a");

    expect(pending[0].signal.aborted).toBe(true);
  });

  it("never lets a superseded answer replace a newer one", async () => {
    const { search, answer } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "re");
    await wait(300);
    await user.type(input, "a");
    await wait(300);

    await answer(1, ["react"]);
    await answer(0, ["red", "redux"]);
    expect(options()).toEqual(["react"]);
  });

  it("clears the suggestions when the input is cleared", async () => {
    const { search, answer } = controlledSearch();
    const { user, input } = setup(search);
    await user.type(input, "re");
    await wait(300);
    await answer(0, ["react"]);

    await user.clear(input);
    await wait(300);
    expect(options()).toEqual([]);
    expect(search).toHaveBeenCalledTimes(1);
  });

  it("leaves no timer behind when unmounted mid-debounce", async () => {
    const { search } = controlledSearch();
    const { user, input, unmount } = setup(search);
    await user.type(input, "re");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
