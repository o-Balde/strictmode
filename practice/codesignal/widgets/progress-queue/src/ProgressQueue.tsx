/**
 * PROGRESS QUEUE: your workspace. Spec on the prep page; run it with
 *   npm run level -- progress-queue
 */
export interface ProgressQueueProps {
  /** How long one bar takes to fill, in ms. */
  durationMs?: number;
  /** How many bars may fill at the same time. */
  limit?: number;
}

export function ProgressQueue({ durationMs = 2000, limit = 3 }: ProgressQueueProps) {
  void durationMs;
  void limit;
  return (
    <section>
      <button type="button">Add</button>
    </section>
  );
}
