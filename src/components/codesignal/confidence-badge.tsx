import { ArrowUpRight } from "lucide-react";
import type { Confidence, Source } from "@data";
import { cn } from "@lib";

const CONFIDENCE: Record<Confidence, { label: string; className: string }> = {
  official: { label: "Official", className: "border-mint-line bg-mint-deep text-mint-text" },
  reported: { label: "Reported", className: "border-flame-dim bg-flame-deep text-clay" },
  unverified: { label: "Unverified", className: "border-rust-line bg-rust-bg text-rust" },
};

export interface ConfidenceBadgeProps {
  confidence: Confidence;
  className?: string;
}

/** How much a statement about the assessment can bear: see the legend under "What's behind the link". */
export function ConfidenceBadge({ confidence, className }: Readonly<ConfidenceBadgeProps>) {
  const style = CONFIDENCE[confidence];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em] uppercase",
        style.className,
        className,
      )}
    >
      {style.label}
    </span>
  );
}

export interface SourceLinksProps {
  ids: readonly string[];
  sources: ReadonlyMap<string, Source>;
}

/** Inline citations: the short label of each source, linking out. */
export function SourceLinks({ ids, sources }: Readonly<SourceLinksProps>) {
  if (ids.length === 0) return null;
  return (
    <span className="inline-flex flex-wrap gap-x-2.5 gap-y-1">
      {ids.map((id) => {
        const source = sources.get(id);
        if (!source) return null;
        return (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noreferrer noopener"
            title={source.title}
            className="text-slate hover:text-clay inline-flex items-center gap-0.5 font-mono text-[11px] transition-colors"
          >
            {source.label}
            <ArrowUpRight aria-hidden className="size-3" />
          </a>
        );
      })}
    </span>
  );
}
