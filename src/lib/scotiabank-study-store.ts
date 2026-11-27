/**
 * External store over the concept review's saved state, on the same pattern
 * as quick-review-store: a stable server snapshot, one cached client
 * snapshot, and live sync between tabs.
 */
import { emptyStudy, loadStudy, saveStudy, STUDY_STORAGE_KEY, type StudyState } from "./scotiabank-study";

const SERVER_SNAPSHOT = emptyStudy();

let cache: StudyState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STUDY_STORAGE_KEY) return;
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

export function getSnapshot(): StudyState {
  cache ??= loadStudy();
  return cache;
}

export function getServerSnapshot(): StudyState {
  return SERVER_SNAPSHOT;
}

export function update(transition: (current: StudyState) => StudyState): void {
  const next = transition(getSnapshot());
  if (next === cache) return;
  cache = next;
  saveStudy(next);
  emit();
}
