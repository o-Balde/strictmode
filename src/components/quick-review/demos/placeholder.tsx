/** Shown while a demo's chunk downloads, and before the slot scrolls into view. */
export function DemoPlaceholder() {
  return (
    <div className="grid min-h-40 place-items-center">
      <span className="text-slate animate-pulse font-mono text-[11.5px]">loading demo…</span>
    </div>
  );
}
