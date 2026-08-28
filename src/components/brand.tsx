import Link from "next/link";
import { cn } from "@/lib/utils";

/** The flame square + wordmark that opens every screen in the mockup. */
export function Brand({
  className,
  size = "md",
  href = "/",
}: {
  className?: string;
  size?: "sm" | "md";
  href?: string | null;
}) {
  const content = (
    <span className={cn("flex items-center gap-[9px]", className)}>
      <span
        className={cn(
          "bg-flame rounded-[2px]",
          size === "sm" ? "size-2.5" : "size-[11px]",
        )}
      />
      <span
        className={cn(
          "text-chalk font-mono font-semibold tracking-[-0.01em]",
          size === "sm" ? "text-[13px]" : "text-[14px]",
        )}
      >
        strictmode
      </span>
    </span>
  );
  if (!href) return content;
  return (
    <Link href={href} className="transition-opacity hover:opacity-80">
      {content}
    </Link>
  );
}
