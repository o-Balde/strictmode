/**
 * TYPEWRITER: your workspace. Spec on the prep page; run it with
 *   npm run level -- typewriter
 *
 * Reported in a Ramp front-end OA on CodeSignal: fetch text from a URL and
 * reveal it one character at a time, in JavaScript/React only (no CSS
 * animation).
 */
export interface TypewriterProps {
  text: string;
  /** Milliseconds between characters. */
  intervalMs?: number;
  onDone?: () => void;
}

export function Typewriter({ text }: TypewriterProps) {
  return <p data-testid="typewriter">{text}</p>;
}

export interface TypewriterFromUrlProps {
  url: string;
  intervalMs?: number;
}

export function TypewriterFromUrl({ url }: TypewriterFromUrlProps) {
  void url;
  return <p data-testid="typewriter-status">Loading...</p>;
}
