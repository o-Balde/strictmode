/**
 * CANCELLABLE PROMISES: your workspace. Spec on the prep page; run it with
 *   npm run level -- cancellable
 *
 * Reported as a CodeSignal front-end task: "a JavaScript module that handles
 * cancellable promises". No React here: plain TypeScript.
 */
export class CancelledError extends Error {}

export function isCancelledError(error: unknown): boolean {
  void error;
  return false;
}

export interface Cancellable<T> {
  promise: Promise<T>;
  cancel: () => void;
}

export function makeCancellable<T>(promise: Promise<T>): Cancellable<T> {
  return { promise, cancel: () => {} };
}

/**
 * Wraps an async function so that calling it again cancels the previous
 * call's result: only the latest call ever settles with a value.
 */
export function latestOnly<A extends unknown[], T>(fn: (...args: A) => Promise<T>): (...args: A) => Promise<T> {
  return fn;
}
