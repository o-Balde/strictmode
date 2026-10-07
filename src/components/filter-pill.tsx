import { cn } from "@lib";

export interface FilterPillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/** One choice in a row of filters. Flame marks the active one. */
export function FilterPill({
  active,
  onClick,
  children,
}: Readonly<FilterPillProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3 py-1.75 font-mono text-xs font-medium transition-colors",
        active
          ? "bg-flame text-ink"
          : "border-line-2 text-stone hover:text-bone border",
      )}
    >
      {children}
    </button>
  );
}
