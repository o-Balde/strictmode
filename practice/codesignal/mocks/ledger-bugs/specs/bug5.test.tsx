import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderLedger, viewMore } from "./support";

describe("Bug 5: View more stays visible at the end of the data, and clicking it crashes", () => {
  it("disappears once the last page is loaded", async () => {
    const { api, user } = await renderLedger();
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t10");
    await user.click(viewMore()!);
    await screen.findByTestId("txn-t12");

    expect(viewMore()).toBeNull();
    expect(api.calls.some((call) => call.path.endsWith("page=null"))).toBe(false);
  });
});
