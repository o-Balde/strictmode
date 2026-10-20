/**
 * The CodeSignal React + TypeScript practice run: one statically rendered page.
 *
 * Reading order follows the week before the assessment: what the link can be,
 * how it is graded, the four levels, then practice against the clock and the
 * drills. Everything is rendered here, on the server; the clock, the level
 * gates, the checklists and the question cards' open state are the only
 * client state, all of it kept in this browser.
 */
import Link from "next/link";
import type { Confidence, RenderedCodesignalSheet, RenderedPrepSection, Source } from "@data";
import { Brand, PrepAnswer, PrepBlocks, PrepItem, PrepProvider, PrepSection, PrepText } from "@components";
import { AssessmentClock, type ClockPlan } from "./assessment-clock";
import { ConfidenceBadge, SourceLinks } from "./confidence-badge";
import { Command } from "./kit-file";
import { BugHuntCard, MockCard, WidgetCard } from "./practice-cards";
import { PracticeChecklist } from "./practice-checklist";
import { checkpointMinutes, cn, subjectMeta, type PrepQuestionMeta } from "@lib";

const SECTIONS = [
  { id: "format", title: "What's behind the link" },
  { id: "platform", title: "How it runs and is graded" },
  { id: "levels", title: "The four levels" },
  { id: "kit", title: "The practice kit" },
  { id: "mocks", title: "Timed mocks" },
  { id: "bug-hunt", title: "Bug hunt" },
  { id: "widgets", title: "Widget drills" },
  { id: "drills", title: "Drills" },
  { id: "plan", title: "Game plan" },
  { id: "sources", title: "Sources" },
] as const;

const CONFIDENCE_LEGEND: { confidence: Confidence; meaning: string }[] = [
  { confidence: "official", meaning: "CodeSignal's own documents" },
  { confidence: "reported", meaning: "a named candidate write-up or public repository" },
  { confidence: "unverified", meaning: "a third-party summary that could not be checked" },
];

/** Topics this page leans on that the interview prep sheet covers in depth. */
const RELATED_PREP = [
  { id: "hooks-stale-closure", title: "Stale closures" },
  { id: "hooks-fetch-in-effect", title: "Fetching in an effect" },
  { id: "hooks-effect-loop", title: "Effect loops" },
  { id: "hooks-setstate-batching", title: "Batching and updater functions" },
  { id: "react-keys", title: "Keys" },
  { id: "react-controlled-uncontrolled", title: "Controlled vs uncontrolled" },
  { id: "react-strict-mode", title: "StrictMode" },
  { id: "patterns-where-state-lives", title: "Where state lives" },
  { id: "tsr-events", title: "Typing events" },
  { id: "ts-discriminated-unions", title: "Discriminated unions" },
  { id: "eco-testing-async", title: "Testing async UI" },
  { id: "code-debounced-search", title: "Debounced search" },
];

export interface CodesignalPrepProps {
  sheet: RenderedCodesignalSheet;
}

export function CodesignalPrep({ sheet }: Readonly<CodesignalPrepProps>) {
  const sources = new Map(sheet.sources.map((source) => [source.id, source]));
  const questions: PrepQuestionMeta[] = [...sheet.levelGuides, ...sheet.drills].flatMap((section) =>
    section.questions.map((question) => ({
      id: question.id,
      sectionId: section.id,
      track: section.track,
      level: question.level,
    })),
  );
  const clockPlans: ClockPlan[] = sheet.plans.map((plan) => ({
    id: plan.id,
    label: plan.id === "frontend" ? "Front-End" : "ICF",
    checkpoints: plan.steps.map((step) => ({ label: step.title, endsAt: checkpointMinutes(step.at) })),
  }));
  const frontendMocks = sheet.mocks.filter((mock) => mock.kind === "frontend");
  const icfMocks = sheet.mocks.filter((mock) => mock.kind === "icf");

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand />
        <nav className="flex items-center gap-5 sm:gap-5.5">
          <Link href="/interview-prep" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Interview prep
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

      <div className="mx-auto max-w-295 px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
        <div className="border-line-3 text-clay mb-5 inline-block rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]">
          90 min · 4 levels · scored 200–600 · {sheet.totalChecks} graded checks
        </div>
        <h1 className="text-parchment m-0 mb-3.5 text-[34px]/[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]/[1.06]">
          CodeSignal: React + TypeScript
        </h1>
        <p className="text-stone m-0 mb-8 max-w-[44em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]">
          Everything public about CodeSignal&apos;s React and TypeScript assessments, turned into a practice run as
          close to the real one as that material allows: which format an invite is likely to be, how it is graded,
          timed mocks whose levels stay locked until you pass them, and a runnable kit whose specs grade your code
          the way the hidden tests do.
        </p>
        <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
          {[
            { href: "#format", step: "Know the format", body: "Three shapes a React/TS invite can take, and how to tell them apart on the first screen." },
            { href: "#mocks", step: "Run a mock against the clock", body: "Start the 90-minute clock, open one mock, and do not read ahead." },
            { href: "#drills", step: "Drill the traps", body: "The bugs, compiler errors and grading rules that cost points." },
          ].map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="border-line-2 bg-surface-2 hover:border-line-3 flex h-full flex-col gap-1.5 rounded-[9px] border p-4 transition-colors"
              >
                <span className="text-clay font-mono text-[11px]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-paper text-[14.5px] font-medium">{item.step}</span>
                <span className="text-ash text-[13px]/[1.55] text-pretty">{item.body}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <AssessmentClock plans={clockPlans} />

      <PrepProvider questions={questions}>
        <div className="mx-auto max-w-295 px-6 py-7 sm:px-10 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <nav
            aria-label="Sections"
            className="scrollbar-hairline -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:sticky lg:top-24 lg:mx-0 lg:max-h-[calc(100dvh-8rem)] lg:flex-col lg:gap-0.5 lg:self-start lg:overflow-y-auto lg:px-0"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="border-line-2 text-stone hover:text-bone lg:hover:bg-surface-4 shrink-0 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors lg:rounded-md lg:border-0 lg:px-2 lg:text-[12.5px]/[1.4] lg:whitespace-normal"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <main className="mt-5 flex min-w-0 flex-col gap-16 lg:mt-0">
            <PageSection
              id="format"
              eyebrow="Intel"
              title="What's behind the link"
              blurb="A `/public-test/<test>/<invite>` link is a test a company configured in CodeSignal. That says who set it up, not what is inside. A React/TypeScript invite fits one of three shapes."
            >
              <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
                {CONFIDENCE_LEGEND.map(({ confidence, meaning }) => (
                  <span key={confidence} className="text-ash inline-flex items-center gap-2 text-[12.5px]">
                    <ConfidenceBadge confidence={confidence} />
                    {meaning}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {sheet.formats.map((format) => (
                  <article key={format.id} className="border-line-2 rounded-xl border p-4.5 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-2.5">
                      <h3 className="text-parchment m-0 text-lg font-semibold tracking-[-0.015em]">{format.name}</h3>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium",
                          format.likelihood === "Most likely" ? "bg-flame text-ink" : "border-line-3 text-stone border",
                        )}
                      >
                        {format.likelihood}
                      </span>
                    </div>
                    <p className="text-bone m-0 mb-4 max-w-[70ch] text-[14.5px]/[1.7] text-pretty">
                      <PrepText text={format.summary} />
                    </p>
                    <ul className="m-0 mb-4 flex list-none flex-col gap-2.5 p-0">
                      {format.claims.map((claim) => (
                        <li key={claim.text} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                          <ConfidenceBadge confidence={claim.confidence} className="self-start" />
                          <span className="text-bone min-w-0 text-[13.5px]/[1.6] text-pretty">
                            <PrepText text={claim.text} />{" "}
                            <SourceLinks ids={claim.sources} sources={sources} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-slate mb-2 font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase">
                          How to recognise it
                        </div>
                        <ul className="text-bone marker:text-slate m-0 flex list-disc flex-col gap-1.5 pl-5 text-[13px]/[1.6]">
                          {format.tells.map((tell) => (
                            <li key={tell} className="pl-1 text-pretty">
                              <PrepText text={tell} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-slate mb-2 font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase">
                          Rehearse with
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {format.practice.map((taskId) => (
                            <a
                              key={taskId}
                              href={sheet.widgets.some((widget) => widget.id === taskId) ? `#widget-${taskId}` : `#mock-${taskId}`}
                              className="border-line-2 text-stone hover:text-bone hover:border-line-3 rounded-full border px-2.5 py-1 font-mono text-[11.5px] transition-colors"
                            >
                              {taskId}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </PageSection>

            <PageSection
              id="platform"
              eyebrow="Platform"
              title="How it runs and is graded"
              blurb="The mechanics that decide points before any React knowledge does: what the grader reads, how levels unlock, what the score means, and what you may use."
            >
              <div className="flex flex-col gap-3">
                {sheet.platform.map((fact) => (
                  <article key={fact.title} className="border-line-2 bg-surface-2 rounded-[9px] border p-4.5 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5">
                      <ConfidenceBadge confidence={fact.confidence} />
                      <h3 className="text-paper m-0 text-[15px] font-semibold text-pretty">{fact.title}</h3>
                    </div>
                    <PrepBlocks blocks={fact.body} />
                    {fact.sources.length > 0 ? (
                      <div className="mt-3">
                        <SourceLinks ids={fact.sources} sources={sources} />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </PageSection>

            <PageSection
              id="levels"
              eyebrow="Levels"
              title="The four levels"
              blurb="What each level may ask, according to CodeSignal's framework briefs, what its tests check, and the code shape that keeps the next level additive. Answer each out loud before opening it."
            >
              <div className="flex flex-col gap-12">
                {sheet.levelGuides.map((section) => (
                  <QuestionSection key={section.id} section={section} />
                ))}
              </div>
            </PageSection>

            <PageSection
              id="kit"
              eyebrow="Setup"
              title="The practice kit"
              blurb="Every mock, the bug hunt and every widget below is runnable in `practice/codesignal`: a Vite + React 18 + TypeScript project whose specs query the DOM and call your code the way the hidden tests do."
            >
              <div className="flex flex-col gap-5">
                <ol className="m-0 flex list-none flex-col gap-3 p-0">
                  {[
                    { command: "cd practice/codesignal && npm install", note: "once" },
                    { command: "npm run dev", note: "live preview on localhost:5173, like the pane beside CodeSignal's editor" },
                    { command: "npm run level -- task-board 2", note: "grade Levels 1–2: runs are cumulative, so a regression fails the run" },
                    { command: "npm run level -- ledger-bugs 3", note: "bug hunts grade one bug at a time" },
                    { command: "npm run level -- banking 4 --solution", note: "watch the reference solution pass, after your attempt" },
                  ].map(({ command, note }) => (
                    <li key={command} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                      <Command>{command}</Command>
                      <span className="text-ash text-[12.5px]">{note}</span>
                    </li>
                  ))}
                </ol>
                <ul className="text-bone marker:text-slate m-0 flex max-w-[72ch] list-disc flex-col gap-2 pl-5 text-[14px]/[1.7]">
                  <li className="pl-1 text-pretty">
                    <PrepText text="Your code goes in each task's `src/`; `solution/` holds the reference. To start a task again: `git checkout -- practice/codesignal/<task>/src`." />
                  </li>
                  <li className="pl-1 text-pretty">
                    <PrepText text="Preview flags: `?mock=ledger` or `?widget=otp-input`; add `&solution` for the reference, `&latency=1500` to slow the API, `&chaos=0.3` to fail 30% of requests. The preview runs in `<StrictMode>`, so non-idempotent mount effects show up." />
                  </li>
                  <li className="pl-1 text-pretty">
                    <PrepText text="The mock API behaves like a real one where it matters: a 4xx/5xx **resolves** (check `response.ok`), only a dropped connection rejects, and an aborted request rejects with `AbortError`." />
                  </li>
                  <li className="pl-1 text-pretty">
                    <PrepText text="How close is it? The format (four levels, 90 minutes, DOM-driven grading) follows CodeSignal's briefs and candidate reports. The tasks are original, in the style of the reported ones; they are not leaked questions. Specs run on Vitest and Testing Library; the real grader may be Jest, Mocha or a Selenium browser, which query the DOM the same way." />
                  </li>
                </ul>
              </div>
            </PageSection>

            <PageSection
              id="mocks"
              eyebrow="Practice"
              title="Timed mocks"
              blurb="Start the clock above, pick one mock, and work level by level. A level opens when you confirm every spec of the previous one passes, as in the real assessment. Read the debrief only at the end."
            >
              <div className="flex flex-col gap-6">
                <SubHeading>Front-End framework</SubHeading>
                {frontendMocks.map((mock) => (
                  <MockCard key={mock.id} mock={mock} sources={sources} />
                ))}
                <SubHeading>Industry Coding framework, in TypeScript</SubHeading>
                {icfMocks.map((mock) => (
                  <MockCard key={mock.id} mock={mock} sources={sources} />
                ))}
              </div>
            </PageSection>

            <PageSection
              id="bug-hunt"
              eyebrow="Practice"
              title="Bug hunt"
              blurb="The other shape a company-built React test takes: a working app, seven symptoms, one hour. Each fix is independent and has its own spec."
            >
              <BugHuntCard hunt={sheet.bugHunt} />
            </PageSection>

            <PageSection
              id="widgets"
              eyebrow="Practice"
              title="Widget drills"
              blurb="Single-component tasks, 20–25 minutes each: the kind that appears on its own in a company-built test, or as one level of a bigger one."
            >
              <div className="flex flex-col gap-6">
                {sheet.widgets.map((widget) => (
                  <WidgetCard key={widget.id} widget={widget} sources={sources} />
                ))}
              </div>
            </PageSection>

            <PageSection
              id="drills"
              eyebrow="Drills"
              title="Drills"
              blurb="One bug, one compiler error or one grading rule per card. Find the problem before opening it."
            >
              <div className="flex flex-col gap-12">
                {sheet.drills.map((section) => (
                  <QuestionSection key={section.id} section={section} />
                ))}
                <div>
                  <SubHeading>In more depth on the interview prep sheet</SubHeading>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {RELATED_PREP.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/interview-prep#${topic.id}`}
                        className="border-line-2 text-stone hover:text-bone hover:border-line-3 rounded-full border px-3 py-1.5 text-[12.5px] transition-colors"
                      >
                        {topic.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </PageSection>

            <PageSection
              id="plan"
              eyebrow="On the day"
              title="Game plan"
              blurb="Checkpoints from the framework briefs' per-level times, compressed to keep the last three minutes for a green submit. The clock above marks the same checkpoints."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {sheet.plans.map((plan) => (
                  <article key={plan.id} className="border-line-2 rounded-xl border p-4.5 sm:p-5">
                    <h3 className="text-paper m-0 mb-4 text-[15px] font-semibold">{plan.title}</h3>
                    <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
                      {plan.steps.map((step) => (
                        <li key={step.at} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
                          <span className="text-clay pt-0.5 font-mono text-[11.5px] tabular-nums">{step.at}</span>
                          <div>
                            <div className="text-paper text-[13.5px] font-medium">{step.title}</div>
                            <p className="text-ash m-0 text-[13px]/[1.6] text-pretty">
                              <PrepText text={step.detail} />
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {sheet.checklists.map((list) => (
                  <PracticeChecklist key={list.id} list={list} />
                ))}
              </div>
            </PageSection>

            <PageSection
              id="sources"
              eyebrow="Sources"
              title="Sources"
              blurb="Everything this page claims about the assessment, and how much weight each source can bear. The test link itself was never opened."
            >
              <SourceList sources={sheet.sources} />
            </PageSection>
          </main>
        </div>
      </PrepProvider>

      <footer className="border-line text-slate mx-auto max-w-295 border-t px-6 py-8 text-[12.5px] sm:px-10">
        Built from public material only. The practice tasks are original, not leaked questions; use only what your
        test&apos;s rules allow on the day. Clock, level locks and checklists stay in this browser.
      </footer>
    </div>
  );
}

interface PageSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
}

function PageSection({ id, eyebrow, title, blurb, children }: Readonly<PageSectionProps>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <div className="text-slate mb-1.5 font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">{eyebrow}</div>
      <h2 id={`${id}-title`} className="text-parchment m-0 mb-2 text-2xl font-semibold tracking-[-0.02em] text-balance">
        {title}
      </h2>
      <p className="text-ash m-0 mb-6 max-w-[66ch] text-[14px]/[1.65] text-pretty">
        <PrepText text={blurb} />
      </p>
      {children}
    </section>
  );
}

function SubHeading({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h3 className="text-stone m-0 font-mono text-[12px] font-medium tracking-[0.05em] uppercase">{children}</h3>;
}

interface QuestionSectionProps {
  section: RenderedPrepSection;
}

/** A group of question cards, set exactly like the interview prep sheet. */
function QuestionSection({ section }: Readonly<QuestionSectionProps>) {
  const drill = section.drill ? subjectMeta(section.drill) : undefined;
  return (
    <PrepSection
      id={section.id}
      track={section.track}
      title={section.title}
      blurb={section.blurb}
      total={section.questions.length}
      drill={drill ? { href: `/topics/${drill.subject}`, title: drill.title } : undefined}
    >
      {section.questions.map((question, index) => (
        <PrepItem key={question.id} id={question.id} position={index + 1} question={question.question} level={question.level}>
          <PrepAnswer question={question} />
        </PrepItem>
      ))}
    </PrepSection>
  );
}

const CONFIDENCE_ORDER: Confidence[] = ["official", "reported", "unverified"];

function SourceList({ sources }: Readonly<{ sources: readonly Source[] }>) {
  return (
    <div className="flex flex-col gap-6">
      {CONFIDENCE_ORDER.map((confidence) => (
        <ul key={confidence} className="m-0 flex list-none flex-col gap-3 p-0">
          {sources
            .filter((source) => source.confidence === confidence)
            .map((source) => (
              <li key={source.id} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <ConfidenceBadge confidence={confidence} className="self-start" />
                <div className="min-w-0">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-paper hover:text-clay text-[13.5px] font-medium underline-offset-2 transition-colors hover:underline"
                  >
                    {source.title}
                  </a>
                  <p className="text-ash m-0 text-[12.5px]/[1.6] text-pretty">{source.note}</p>
                </div>
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
}
