/**
 * The quick review page: 109 short questions on one statically rendered
 * page, in the spirit of 30 seconds of interviews, with an interactive demo
 * wherever a picture explains more than prose.
 *
 * Questions and answers are rendered here, on the server; the client pieces
 * only decide what is visible and open, keep the "known" marks, and load a
 * demo when its answer is opened.
 */
import Link from "next/link";
import { REVIEW_SOURCE, type RenderedReviewSection } from "@data";
import { Brand } from "@components";
import { REVIEW_RESULTS_ID, type ReviewQuestionMeta } from "@lib";
import { ReviewAnswer } from "./review-answer";
import { ReviewItem } from "./review-item";
import { ReviewProvider } from "./review-provider";
import { ReviewSection } from "./review-section";
import { ReviewToc } from "./review-toc";
import { ReviewEmpty, ReviewFilterBar, ReviewProgress, ReviewSearch } from "./review-toolbar";

export interface QuickReviewProps {
  sections: readonly RenderedReviewSection[];
}

export function QuickReview({ sections }: Readonly<QuickReviewProps>) {
  const questions: ReviewQuestionMeta[] = sections.flatMap((section) =>
    section.questions.map((question) => ({
      id: question.id,
      sectionId: section.id,
      topics: question.topics,
      level: question.level,
      interactive: question.demo !== undefined,
    })),
  );
  const demos = new Set(sections.flatMap((section) => section.questions.flatMap((question) => (question.demo ? [question.demo.id] : []))));
  const topics = new Set(questions.flatMap((question) => question.topics));

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand />
        <nav className="flex items-center gap-5 sm:gap-5.5">
          <Link href="/interview-prep" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Interview prep
          </Link>
          <Link href="/codesignal-react-typescript" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors md:block">
            CodeSignal practice
          </Link>
          <Link href="/topics" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Topics
          </Link>
          <Link
            href="/drill"
            className="border-line-3 text-chalk hover:border-flame rounded-md border px-3 py-1.5 font-mono text-[12.5px] font-medium transition-colors"
          >
            Start drilling
          </Link>
        </nav>
      </header>

      <ReviewProvider questions={questions}>
        <div className="mx-auto max-w-295 px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
          <div className="border-line-3 text-clay mb-5 inline-block rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]">
            {questions.length} questions · {demos.size} interactive demos · {topics.size} topics
          </div>
          <h1 className="text-parchment m-0 mb-3.5 text-[34px]/[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]/[1.06]">
            Quick review
          </h1>
          <p className="text-stone m-0 mb-3 max-w-[40em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]">
            Short front-end questions to run through fast: JavaScript, React, CSS, HTML, accessibility, Node and security. Read the
            question, answer it in your head in thirty seconds, then open it to check. Where a concept is easier to see than to read, the
            answer comes with a demo you can play with: event loops you can step through, a 3D box model, live React state.
          </p>
          <p className="text-slate m-0 mb-7 text-[12.5px]">
            Press <kbd className="border-line-2 rounded border px-1 font-mono text-[11px]">/</kbd> to search and{" "}
            <kbd className="border-line-2 rounded border px-1 font-mono text-[11px]">R</kbd> for a random question you haven&apos;t marked as
            known.
          </p>
          <div className="flex flex-col gap-5">
            <ReviewFilterBar />
            <ReviewProgress />
          </div>
        </div>

        <ReviewSearch />

        <div className="mx-auto max-w-295 px-6 py-7 sm:px-10 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <ReviewToc sections={sections.map(({ id, topic, title }) => ({ id, topic, title }))} />

          <main id={REVIEW_RESULTS_ID} className="mt-5 flex min-w-0 scroll-mt-24 flex-col gap-14 lg:mt-0">
            <ReviewEmpty />
            {sections.map((section) => (
              <ReviewSection
                key={section.id}
                id={section.id}
                topic={section.topic}
                title={section.title}
                blurb={section.blurb}
                total={section.questions.length}
              >
                {section.questions.map((question, index) => (
                  <ReviewItem
                    key={question.id}
                    id={question.id}
                    position={index + 1}
                    question={question.question}
                    topics={question.topics}
                    level={question.level}
                    interactive={question.demo !== undefined}
                  >
                    <ReviewAnswer question={question} />
                  </ReviewItem>
                ))}
              </ReviewSection>
            ))}
          </main>
        </div>
      </ReviewProvider>

      <footer className="border-line text-slate mx-auto flex max-w-295 flex-col gap-1.5 border-t px-6 py-8 text-[12.5px] sm:px-10">
        <p className="m-0">
          The list of questions follows{" "}
          <a href={REVIEW_SOURCE.url} target="_blank" rel="noreferrer noopener" className="text-clay hover:underline">
            {REVIEW_SOURCE.title}
          </a>{" "}
          (copyright © 2018 Stefan Feješ and contributors,{" "}
          <a href={`${REVIEW_SOURCE.url}/blob/master/LICENSE`} target="_blank" rel="noreferrer noopener" className="text-clay hover:underline">
            {REVIEW_SOURCE.license} licence
          </a>
          ). The answers, examples and demos are written for StrictMode against current browsers, Node and React 19.
        </p>
        <p className="m-0">Known marks stay in this browser. Reviewing doesn&apos;t touch your streak.</p>
      </footer>
    </div>
  );
}
