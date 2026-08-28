"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * True only after hydration. Distinguishes "this user has no progress" from
 * "progress hasn't been read out of localStorage yet" — the two render
 * completely different home screens.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, onClient, onServer);
}
