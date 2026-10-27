/**
 * External store over the quick review page's saved state, on the same
 * pattern as progress-store: a stable server snapshot, one cached client
 * snapshot, and live sync between tabs.
 */
import { emptyReview, loadReview, REVIEW_STORAGE_KEY, saveReview, type ReviewState } from "./quick-review";

const SERVER_SNAPSHOT = emptyReview();

let cache: ReviewState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== REVIEW_STORAGE_KEY) return;
  cache = null;
  emit();
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): ReviewState {
  cache ??= loadReview();
  return cache;
}

export function getServerSnapshot(): ReviewState {
  return SERVER_SNAPSHOT;
}

export function update(transition: (current: ReviewState) => ReviewState): void {
  const next = transition(getSnapshot());
  if (next === cache) return;
  cache = next;
  saveReview(next);
  emit();
}
