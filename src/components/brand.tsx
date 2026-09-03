import Link from "next/link";
import { cn } from "@lib";

export interface BrandProps {
  className?: string;
  size?: "sm" | "md";
  href?: string | null;
}

/** The flame square + wordmark that opens every screen in the mockup. */
export function Brand({
  className,
  size = "md",
  href = "/",
}: Readonly<BrandProps>) {
  const content = (
    <span className={cn("flex items-center gap-2.25", className)}>
      <span
        className={cn(
          "bg-flame rounded-xs",
          size === "sm" ? "size-2.5" : "size-2.75",
        )}
      />
      <span
        className={cn(
          "text-chalk font-mono font-semibold tracking-[-0.01em]",
          size === "sm" ? "text-[13px]" : "text-sm",
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
