/**
 * One answer on the quick review page: the thirty-second version, the points
 * an interviewer listens for, the worked examples, the demo, and links.
 * Rendered on the server; the demo slot and the known toggle are the only
 * client pieces.
 *
 * A question that shows code keeps its answer behind a second disclosure, so
 * opening the question shows the code without giving the answer away.
 */
import { ArrowUpRight } from "lucide-react";
import type { RenderedReviewQuestion } from "@data";
import { PrepBlocks, PrepText } from "@components";
import { cn } from "@lib";
import { DemoSlot } from "./demo-slot";
import { KnownToggle } from "./review-item";

const LABEL = "text-slate font-mono text-[11px] font-medium tracking-[0.09em]";

export function ReviewAnswer({ question }: Readonly<{ question: RenderedReviewQuestion }>) {
  return (
    <div className="border-line border-t px-4.5 pt-5 pb-6 sm:px-6">
      {question.prompt ? (
        <>
          <div className={cn(LABEL, "mb-2.5")}>THE QUESTION&apos;S CODE</div>
          <PrepBlocks blocks={question.prompt} />
          <details className="group/answer mt-5">
            <summary className="border-line-3 text-bone hover:border-line-2 inline-flex cursor-pointer list-none items-center rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors group-open/answer:mb-5 [&::-webkit-details-marker]:hidden">
              <span className="group-open/answer:hidden">Show the answer</span>
              <span className="hidden group-open/answer:inline">Hide the answer</span>
            </summary>
            <AnswerBody question={question} />
          </details>
        </>
      ) : (
        <AnswerBody question={question} />
      )}

      <footer className="border-line mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-4">
        <KnownToggle id={question.id} />
        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0">
          {question.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-clay inline-flex items-center gap-1 text-[12.5px] hover:underline"
              >
                {link.title}
                <ArrowUpRight aria-hidden className="size-3 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

function AnswerBody({ question }: Readonly<{ question: RenderedReviewQuestion }>) {
  return (
    <>
      <div className={cn(LABEL, "mb-2.5")}>IN 30 SECONDS</div>
      <p className="text-paper m-0 max-w-[70ch] text-[15px]/[1.7] text-pretty">
        <PrepText text={question.short} />
      </p>

      <div className="mt-5">
        <div className={cn(LABEL, "mb-2.5")}>GOOD TO HEAR</div>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {question.goodToHear.map((point) => (
            <li key={point} className="border-line-3 bg-surface-3 text-bone rounded-md border px-2.5 py-1 text-[12.5px]/[1.5]">
              <PrepText text={point} />
            </li>
          ))}
        </ul>
      </div>

      <PrepBlocks blocks={question.body} className="mt-6" />

      {question.demo ? <DemoSlot questionId={question.id} demo={question.demo} /> : null}
    </>
  );
}
