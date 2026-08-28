/**
 * External store wrapper around the persisted progress record.
 *
 * localStorage is exactly the kind of "external system" useSyncExternalStore
 * exists for: reading it in an effect and calling setState causes a cascading
 * render on every mount, and it cannot be read during SSR at all. Going through
 * a store gives a stable server snapshot, a single cached client snapshot, and
 * — as a bonus worth having in an app whose whole state is browser-local —
 * live sync between tabs.
 */
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  STORAGE_KEY,
  type StoredProgress,
} from "./progress";

/** Stable reference: useSyncExternalStore requires snapshots not to churn. */
const SERVER_SNAPSHOT = emptyProgress();

let cache: StoredProgress | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  // Another tab wrote progress — drop the cache so the next snapshot re-reads.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    cache = null;
    emit();
  };
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(onChange);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): StoredProgress {
  cache ??= loadProgress();
  return cache;
}

export function getServerSnapshot(): StoredProgress {
  return SERVER_SNAPSHOT;
}

/** Apply an update, persist it, and notify every subscriber. */
export function update(fn: (prev: StoredProgress) => StoredProgress): void {
  const next = fn(getSnapshot());
  cache = next;
  saveProgress(next);
  emit();
}

export function replace(next: StoredProgress): void {
  cache = next;
  saveProgress(next);
  emit();
}
