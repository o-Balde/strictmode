import { describe, expect, it } from "vitest";
import { deferred } from "../../../test/fetch";
import { CancelledError, isCancelledError, latestOnly, makeCancellable } from "../src/cancellable";

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("makeCancellable", () => {
  it("resolves with the original value when left alone", async () => {
    const { promise } = makeCancellable(Promise.resolve(42));
    await expect(promise).resolves.toBe(42);
  });

  it("rejects with the original error when left alone", async () => {
    const { promise } = makeCancellable(Promise.reject(new Error("boom")));
    await expect(promise).rejects.toThrow("boom");
  });

  it("rejects with a CancelledError once cancelled, whatever the original does later", async () => {
    const source = deferred<string>();
    const { promise, cancel } = makeCancellable(source.promise);
    cancel();
    source.resolve("too late");

    const error = await promise.catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(CancelledError);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).name).toBe("CancelledError");
  });

  it("rejects as soon as cancel is called, without waiting for the original", async () => {
    const never = new Promise<string>(() => {});
    const { promise, cancel } = makeCancellable(never);
    cancel();
    await expect(promise).rejects.toBeInstanceOf(CancelledError);
  });

  it("ignores cancel after the promise has settled", async () => {
    const { promise, cancel } = makeCancellable(Promise.resolve("done"));
    await expect(promise).resolves.toBe("done");
    cancel();
    await expect(promise).resolves.toBe("done");
  });

  it("can be cancelled twice safely", async () => {
    const { promise, cancel } = makeCancellable(new Promise<number>(() => {}));
    cancel();
    cancel();
    await expect(promise).rejects.toBeInstanceOf(CancelledError);
  });

  it("swallows an original rejection that arrives after cancel", async () => {
    const source = deferred<string>();
    const { promise, cancel } = makeCancellable(source.promise);
    promise.catch(() => {});
    cancel();
    source.reject(new Error("late failure"));
    // An unhandled rejection here would fail the run.
    await settle();
  });

  it("tells a cancellation apart from a failure", async () => {
    const failed = await makeCancellable(Promise.reject(new Error("x"))).promise.catch((error: unknown) => error);
    const pending = makeCancellable(new Promise(() => {}));
    pending.cancel();
    const cancelled = await pending.promise.catch((error: unknown) => error);

    expect(isCancelledError(failed)).toBe(false);
    expect(isCancelledError(cancelled)).toBe(true);
    expect(isCancelledError("Cancelled")).toBe(false);
  });
});

describe("latestOnly", () => {
  it("lets only the latest call settle with a value", async () => {
    const answers = [deferred<string>(), deferred<string>()];
    let call = 0;
    const search = latestOnly((query: string) => {
      void query;
      return answers[call++].promise;
    });

    const first = search("re");
    const second = search("rea");
    answers[1].resolve("react");
    answers[0].resolve("red");

    await expect(second).resolves.toBe("react");
    await expect(first).rejects.toBeInstanceOf(CancelledError);
  });

  it("passes the arguments through", async () => {
    const double = latestOnly(async (a: number, b: number) => (a + b) * 2);
    await expect(double(1, 2)).resolves.toBe(6);
  });
});
