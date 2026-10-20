/**
 * Files from practice/codesignal, highlighted at build time: provided files,
 * specs and reference solutions. Long files scroll inside their well so a
 * level's prose stays in view.
 */
import { ChevronDown } from "lucide-react";
import type { RenderedKitFile, RenderedSpec } from "@data";
import { cn } from "@lib";
import { CopyButton } from "./copy-button";

const KIT_ROOT = "practice/codesignal/";

interface CodeWellProps {
  path: string;
  meta?: string;
  html: string;
}

function KitCode({ path, meta, html }: Readonly<CodeWellProps>) {
  return (
    <figure className="border-line-4 bg-well m-0 overflow-hidden rounded-[7px] border">
      <figcaption className="border-line-4 flex items-center justify-between gap-3 border-b px-3.5 py-2">
        <span className="text-stone min-w-0 truncate font-mono text-[11.5px]" title={KIT_ROOT + path}>
          {path}
          {meta ? <span className="text-slate"> · {meta}</span> : null}
        </span>
        <CopyButton />
      </figcaption>
      <div className="scrollbar-hairline max-h-[34rem] overflow-auto">
        <pre className="m-0 w-max min-w-full px-4 py-3.5 font-mono text-[12.5px]/[1.7]" style={{ color: "var(--code-plain)" }}>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </figure>
  );
}

export interface KitFileViewProps {
  file: RenderedKitFile;
}

export function KitFileView({ file }: Readonly<KitFileViewProps>) {
  return <KitCode path={file.path} meta={`${file.lines} lines`} html={file.html} />;
}

export interface SpecViewProps {
  spec: RenderedSpec;
}

export function SpecView({ spec }: Readonly<SpecViewProps>) {
  return <KitCode path={spec.path} meta={`${spec.checks.length} specs`} html={spec.html} />;
}

export interface DisclosureProps {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** A native <details>: works before hydration, and find-in-page reaches inside. */
export function Disclosure({ summary, children, className }: Readonly<DisclosureProps>) {
  return (
    <details className={cn("group border-line-2 rounded-lg border", className)}>
      <summary className="hover:bg-surface-4 text-bone flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">{summary}</span>
        <ChevronDown aria-hidden className="text-slate size-4 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-line flex flex-col gap-3 border-t p-3.5">{children}</div>
    </details>
  );
}

export interface ChecksListProps {
  checks: readonly string[];
}

/** The spec's `it(...)` names: what the grader will try, in order. */
export function ChecksList({ checks }: Readonly<ChecksListProps>) {
  return (
    <ol className="text-bone marker:text-slate m-0 flex list-decimal flex-col gap-1.5 pl-5 text-[13px]/[1.55] marker:font-mono marker:text-[11px]">
      {checks.map((check) => (
        <li key={check} className="pl-1 text-pretty">
          {check}
        </li>
      ))}
    </ol>
  );
}

export interface CommandProps {
  children: string;
}

/** A shell command to run in the kit, set apart from source code. */
export function Command({ children }: Readonly<CommandProps>) {
  return (
    <code className="border-line-2 bg-well text-chalk inline-block rounded-md border px-2.5 py-1.5 font-mono text-[12px] break-all">
      <span aria-hidden className="text-slate select-none">
        ${" "}
      </span>
      {children}
    </code>
  );
}
