/**
 * External store over the CodeSignal page's practice state, on the same
 * pattern as progress-store: a stable server snapshot, one cached client
 * snapshot, and live sync between tabs.
 */
import { emptyPractice, loadPractice, PRACTICE_STORAGE_KEY, savePractice, type PracticeState } from "./codesignal";

const SERVER_SNAPSHOT = emptyPractice();

let cache: PracticeState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== PRACTICE_STORAGE_KEY) return;
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

export function getSnapshot(): PracticeState {
  cache ??= loadPractice();
  return cache;
}

export function getServerSnapshot(): PracticeState {
  return SERVER_SNAPSHOT;
}

export function update(transition: (current: PracticeState) => PracticeState): void {
  const next = transition(getSnapshot());
  if (next === cache) return;
  cache = next;
  savePractice(next);
  emit();
}
