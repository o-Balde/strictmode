/**
 * The interview prep sheet: every question on one statically rendered page.
 *
 * A drill gives five questions and a score. This is the reference to read the
 * night before, so it is one long page that can be searched, filtered and
 * scanned. The questions and answers are rendered here, on the server; the
 * client components below only decide which of them are showing.
 */
import Link from "next/link";
import type { RenderedPrepSection } from "@data";
import {
  Brand,
  PrepAnswer,
  PrepEmpty,
  PrepFilterBar,
  PrepItem,
  PrepProvider,
  PrepSearch,
  PrepSection,
  PrepToc,
} from "@components";
import { PREP_RESULTS_ID, subjectMeta, type PrepQuestionMeta } from "@lib";

export interface InterviewPrepProps {
  sections: readonly RenderedPrepSection[];
}

export function InterviewPrep({ sections }: Readonly<InterviewPrepProps>) {
  const questions: PrepQuestionMeta[] = sections.flatMap((section) =>
    section.questions.map((question) => ({
      id: question.id,
      sectionId: section.id,
      track: section.track,
      level: question.level,
    })),
  );

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand />
        <nav className="flex items-center gap-5 sm:gap-5.5">
          <Link href="/topics" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Topics
          </Link>
          <Link href="/progress" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Progress
          </Link>
          <Link
            href="/drill"
            className="border-line-3 text-chalk hover:border-flame rounded-md border px-3 py-1.5 font-mono text-[12.5px] font-medium transition-colors"
          >
            Start drilling
          </Link>
        </nav>
      </header>

      <PrepProvider questions={questions}>
        <div className="mx-auto max-w-295 px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
          <div className="border-line-3 text-clay mb-5 inline-block rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]">
            {questions.length} questions · {sections.length} sections · React 19 · TypeScript 5
          </div>
          <h1 className="text-parchment m-0 mb-3.5 text-[34px]/[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]/[1.06]">
            Interview prep
          </h1>
          <p className="text-stone m-0 mb-7 max-w-[38em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]">
            The TypeScript and React questions that come up most, each with the answer to give, a
            worked example and the follow-up that tends to come next. Read the question, answer it
            out loud, then open it to check.
          </p>
          <PrepFilterBar />
        </div>

        <PrepSearch />

        <div className="mx-auto max-w-295 px-6 py-7 sm:px-10 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <PrepToc sections={sections.map(({ id, track, title }) => ({ id, track, title }))} />

          <main id={PREP_RESULTS_ID} className="mt-5 flex min-w-0 scroll-mt-24 flex-col gap-14 lg:mt-0">
            <PrepEmpty />
            {sections.map((section) => {
              const drill = section.drill ? subjectMeta(section.drill) : undefined;
              return (
                <PrepSection
                  key={section.id}
                  id={section.id}
                  track={section.track}
                  title={section.title}
                  blurb={section.blurb}
                  total={section.questions.length}
                  drill={drill ? { href: `/topics/${drill.subject}`, title: drill.title } : undefined}
                >
                  {section.questions.map((question, index) => (
                    <PrepItem
                      key={question.id}
                      id={question.id}
                      position={index + 1}
                      question={question.question}
                      level={question.level}
                    >
                      <PrepAnswer question={question} />
                    </PrepItem>
                  ))}
                </PrepSection>
              );
            })}
          </main>
        </div>
      </PrepProvider>

      <footer className="border-line text-slate mx-auto max-w-295 border-t px-6 py-8 text-[12.5px] sm:px-10">
        Written against React 19 and TypeScript 5. Reading here does not touch your streak.
      </footer>
    </div>
  );
}
