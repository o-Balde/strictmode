/**
 * One answer on the prep sheet: the short version, the worked detail, and the
 * follow-ups. Rendered on the server; nothing in here needs the client.
 *
 * It borrows the drill's feedback vocabulary on purpose. "The trap" and
 * "Interview line" mean the same thing here as they do after a question, and a
 * snippet is set like an editor while console output is set like a terminal.
 */
import { ArrowUpRight } from "lucide-react";
import type { RenderedPrepBlock, RenderedPrepCode, RenderedPrepQuestion } from "@data";
import { PrepText } from "@components";
import { cn } from "@lib";

const LABEL = "text-slate font-mono text-[11px] font-medium tracking-[0.09em]";

export interface PrepAnswerProps {
  question: RenderedPrepQuestion;
}

export function PrepAnswer({ question }: Readonly<PrepAnswerProps>) {
  return (
    <div className="border-line border-t px-4.5 pt-5 pb-6 sm:px-6">
      <div className={cn(LABEL, "mb-2.5")}>SHORT ANSWER</div>
      <p className="text-paper m-0 max-w-[70ch] text-[15px]/[1.7] text-pretty">
        <PrepText text={question.short} />
      </p>

      <PrepBlocks blocks={question.body} className="mt-5" />

      {question.followUps?.length ? (
        <div className="mt-7">
          <div className={cn(LABEL, "mb-3")}>FOLLOW-UPS</div>
          <dl className="border-line-3 m-0 flex flex-col gap-4 border-l pl-4">
            {question.followUps.map((followUp, index) => (
              <div key={index}>
                <dt className="text-paper mb-1 text-sm/[1.5] font-medium text-pretty">
                  <PrepText text={followUp.q} />
                </dt>
                <dd className="text-stone m-0 max-w-[70ch] text-sm/[1.7] text-pretty">
                  <PrepText text={followUp.a} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {question.docs ? (
        <a
          href={question.docs}
          target="_blank"
          rel="noreferrer noopener"
          className="text-clay mt-6 inline-flex items-center gap-1.5 font-mono text-[11.5px] hover:underline"
        >
          {new URL(question.docs).hostname.replace(/^www\./, "")}
          <ArrowUpRight className="size-3" />
        </a>
      ) : null}
    </div>
  );
}

export interface PrepBlocksProps {
  blocks: readonly RenderedPrepBlock[];
  className?: string;
}

/** A run of answer blocks, set the same way wherever they appear. */
export function PrepBlocks({ blocks, className }: Readonly<PrepBlocksProps>) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

interface BlockProps {
  block: RenderedPrepBlock;
}

function Block({ block }: Readonly<BlockProps>) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-bone m-0 max-w-[70ch] text-[14.5px]/[1.75] text-pretty">
          <PrepText text={block.text} />
        </p>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={cn(
            "text-bone marker:text-slate m-0 flex max-w-[70ch] flex-col gap-2 pl-5 text-[14.5px]/[1.7]",
            block.ordered ? "list-decimal marker:font-mono marker:text-xs" : "list-disc",
          )}
        >
          {block.items.map((item, index) => (
            <li key={index} className="pl-1 text-pretty">
              <PrepText text={item} />
            </li>
          ))}
        </List>
      );
    }

    case "code":
      return <Snippet block={block} />;

    case "output":
      return (
        <figure className="m-0">
          <figcaption className="mb-1.5 flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.12em] text-[#28fe14]/70 uppercase">
            <span aria-hidden className="h-px w-3 bg-[#28fe14]/40" />
            stdout
          </figcaption>
          <div
            data-skin="terminal"
            className="term-scanlines scrollbar-hairline relative overflow-x-auto rounded-[7px] border border-[#123c0c] bg-[var(--term-bg)]"
          >
            <pre className="term-glow m-0 w-max min-w-full px-4 py-3 font-mono text-[13px]/[1.7] text-[var(--term-fg)]">
              {block.text}
            </pre>
          </div>
        </figure>
      );

    case "table":
      return (
        <div className="border-line-2 scrollbar-hairline overflow-x-auto rounded-lg border">
          <table
            className={cn(
              "w-full border-collapse text-left text-[13px]/[1.6]",
              block.head.length >= 4 ? "min-w-176" : block.head.length === 3 ? "min-w-128" : "min-w-88",
            )}
          >
            <thead>
              <tr className="bg-surface-4">
                {block.head.map((cell, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="text-ash px-3.5 py-2.5 align-bottom text-xs font-medium"
                  >
                    <PrepText text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-line border-t">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-3.5 py-2.5 align-top text-pretty",
                        cellIndex === 0 ? "text-paper" : "text-bone",
                      )}
                    >
                      <PrepText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      return (
        <div className="bg-surface-3 border-flame max-w-[74ch] rounded-r-lg border-l-2 p-4">
          <p className="text-bone m-0 text-sm/[1.7] text-pretty">
            <strong className="text-peach font-semibold">
              {block.tone === "trap" ? "The trap: " : "Interview line: "}
            </strong>
            <PrepText text={block.text} />
          </p>
        </div>
      );
  }
}

const CAPTION_TONE = {
  bad: { text: "text-rust", rule: "bg-rust-line" },
  good: { text: "text-mint-text", rule: "bg-mint-line" },
  neutral: { text: "text-slate", rule: "bg-line-3" },
} as const;

interface SnippetProps {
  block: RenderedPrepCode;
}

function Snippet({ block }: Readonly<SnippetProps>) {
  const tone = CAPTION_TONE[block.tone ?? "neutral"];

  return (
    <figure className="m-0">
      {block.caption ? (
        <figcaption className={cn("mb-1.5 flex items-center gap-2 font-mono text-[11px] font-medium", tone.text)}>
          <span aria-hidden className={cn("h-px w-3 shrink-0", tone.rule)} />
          {block.caption}
        </figcaption>
      ) : null}
      <div className="border-line-4 bg-well scrollbar-hairline overflow-x-auto rounded-[7px] border">
        <pre
          className="m-0 w-max min-w-full px-4 py-3.5 font-mono text-[13px]/[1.7]"
          style={{ color: "var(--code-plain)" }}
        >
          <code dangerouslySetInnerHTML={{ __html: block.html }} />
        </pre>
      </div>
    </figure>
  );
}
