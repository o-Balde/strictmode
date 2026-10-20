/**
 * CANCELLABLE PROMISES: reference solution.
 *
 * A promise cannot be stopped, only ignored. The wrapper races the original
 * against a cancel signal and always attaches handlers to the original, so a
 * rejection that arrives after cancel is swallowed instead of surfacing as an
 * unhandled rejection.
 */
export class CancelledError extends Error {
  constructor() {
    super("Cancelled");
    this.name = "CancelledError";
  }
}

export function isCancelledError(error: unknown): error is CancelledError {
  return error instanceof CancelledError;
}

export interface Cancellable<T> {
  promise: Promise<T>;
  cancel: () => void;
}

export function makeCancellable<T>(promise: Promise<T>): Cancellable<T> {
  let cancelled = false;
  let rejectWrapper: (reason: unknown) => void = () => {};

  const wrapped = new Promise<T>((resolve, reject) => {
    rejectWrapper = reject;
    promise.then(
      (value) => {
        if (!cancelled) resolve(value);
      },
      (error: unknown) => {
        if (!cancelled) reject(error);
      },
    );
  });

  return {
    promise: wrapped,
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      // A settled promise ignores this, so cancelling after the fact is a no-op.
      rejectWrapper(new CancelledError());
    },
  };
}

/**
 * Wraps an async function so that calling it again cancels the previous
 * call's result: only the latest call ever settles with a value.
 */
export function latestOnly<A extends unknown[], T>(fn: (...args: A) => Promise<T>): (...args: A) => Promise<T> {
  let previous: Cancellable<T> | null = null;
  return (...args: A) => {
    previous?.cancel();
    const current = makeCancellable(fn(...args));
    previous = current;
    return current.promise;
  };
}
