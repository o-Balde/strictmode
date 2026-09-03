"use client";

/**
 * The mockup proposed two session-home directions rather than one; both are
 * built, and this switches between them.
 */
import { useRouter } from "next/navigation";
import { cn } from "@lib";
import { useProgress } from "@components";

export interface HomeVariantToggleProps {
  current: "dashboard" | "path";
  className?: string;
}

export function HomeVariantToggle({
  current,
  className,
}: Readonly<HomeVariantToggleProps>) {
  const { setHomeVariant } = useProgress();
  const router = useRouter();

  const pick = (variant: "dashboard" | "path") => {
    setHomeVariant(variant);
    router.push("/");
  };

  return (
    <div className={cn("border-line-2 flex gap-px overflow-hidden rounded-lg border", className)}>
      {(
        [
          ["dashboard", "Dashboard"],
          ["path", "Path"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => pick(value)}
          className={cn(
            "flex-1 px-3 py-2 font-mono text-[11px] font-medium tracking-[0.05em] transition-colors",
            current === value
              ? "bg-surface-4 text-paper"
              : "text-slate hover:text-bone",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
