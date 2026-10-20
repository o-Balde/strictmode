import { act, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderShortlist, summary, toggle } from "./support";

describe("Level 2: build a shortlist", () => {
  it("selects a session and counts it", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));

    expect(toggle("s1")).toHaveTextContent("Selected");
    expect(summary()).toHaveTextContent(/^1 selected$/);
  });

  it("deselects a session when clicked again", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));
    await user.click(toggle("s1"));

    expect(toggle("s1")).toHaveTextContent("Select");
    expect(summary()).toHaveTextContent(/^0 selected$/);
  });

  it("disables every other open session once three are selected", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));
    await user.click(toggle("s3"));
    await user.click(toggle("s4"));

    expect(summary()).toHaveTextContent(/^3 selected$/);
    for (const id of ["s5", "s6", "s7"]) expect(toggle(id)).toBeDisabled();
    for (const id of ["s1", "s3", "s4"]) expect(toggle(id)).toBeEnabled();
  });

  it("re-enables the others when one is deselected at the limit", async () => {
    const { user } = await renderShortlist();
    for (const id of ["s1", "s3", "s4"]) await user.click(toggle(id));
    await user.click(toggle("s4"));

    expect(toggle("s5")).toBeEnabled();
    await user.click(toggle("s5"));
    expect(summary()).toHaveTextContent(/^3 selected$/);
  });

  it("never selects a full session", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s2"));

    expect(toggle("s2")).toHaveTextContent("Full");
    expect(summary()).toHaveTextContent(/^0 selected$/);
  });

  it("holds the limit even when two clicks land before a re-render", async () => {
    const { user } = await renderShortlist();
    await user.click(toggle("s1"));
    await user.click(toggle("s3"));

    // Both clicks are dispatched inside one act(), so the second handler runs
    // before React re-renders and disables it: only state read inside the
    // updater function knows the first click already filled the shortlist.
    act(() => {
      fireEvent.click(toggle("s5"));
      fireEvent.click(toggle("s6"));
    });

    expect(summary()).toHaveTextContent(/^3 selected$/);
  });

  it("keeps a full session labelled Full even at the limit", async () => {
    const { user } = await renderShortlist();
    for (const id of ["s1", "s3", "s4"]) await user.click(toggle(id));
    expect(toggle("s2")).toHaveTextContent("Full");
    expect(toggle("s5")).toHaveTextContent("Select");
  });
});
