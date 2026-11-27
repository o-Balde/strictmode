/**
 * Scotiabank Full Stack Developer (Entry Level) prep: one statically rendered
 * page, unlisted and kept out of search engines.
 *
 * Reading order follows the weeks before the loop: what the posting really
 * asks, how the bank interviews, what candidates were asked, the stack and the
 * domain, then the question bank, the stories, and a plan. Everything renders
 * on the server; the filters, open cards and ticked checklists are the only
 * client state, and they stay in this browser.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Confidence, PrepTrack, RenderedFact, RenderedPrepSection, Source } from "@data";
import type { RenderedScotiabankSheet, RequirementWeight } from "@/data/scotiabank";
import {
  Brand,
  PrepAnswer,
  PrepBlocks,
  PrepEmpty,
  PrepItem,
  PrepProvider,
  PrepSearch,
  PrepSection,
  PrepText,
} from "@components";
import { ConfidenceBadge, PracticeChecklist, SourceLinks } from "@/components/codesignal";
import { PREP_RESULTS_ID, cn, subjectMeta, type PrepQuestionMeta } from "@lib";
import { BankFilterBar, DrawQuestionButton, OpenFromHash, OpenQuestionLink } from "./question-tools";

const NAV = [
  { id: "role", title: "The role, decoded" },
  { id: "loop", title: "The interview loop" },
  { id: "reported", title: "What candidates were asked" },
  { id: "stack", title: "The stack" },
  { id: "domain", title: "Wealth onboarding" },
  { id: "questions", title: "Question bank" },
  { id: "why", title: "Why Scotiabank" },
  { id: "ask", title: "Questions to ask them" },
  { id: "plan", title: "Seven-day plan" },
  { id: "sources", title: "Sources" },
] as const;

/** The filter row, in the order the bank's sections run. */
const TRACKS: readonly PrepTrack[] = [
  "frontend",
  "backend",
  "architecture",
  "data",
  "platform",
  "security",
  "delivery",
  "coding",
  "behavioral",
];

const CONFIDENCE_LEGEND: { confidence: Confidence; meaning: string }[] = [
  { confidence: "official", meaning: "the bank's own documents and postings, or a regulator" },
  { confidence: "reported", meaning: "a candidate review or credible press" },
  { confidence: "unverified", meaning: "a prep site's summary, or a snippet that couldn't be opened" },
  { confidence: "inferred", meaning: "this page's reasoning from the sourced facts" },
];

const WEIGHT: Record<RequirementWeight, { label: string; className: string }> = {
  core: { label: "Core", className: "border-flame-dim bg-flame-deep text-clay" },
  familiar: { label: "Familiar", className: "border-line-3 text-stone" },
  asset: { label: "Asset", className: "border-mint-line bg-mint-deep text-mint-text" },
};

const SOURCE_ORDER: Confidence[] = ["official", "reported", "unverified"];

export interface ScotiabankPrepProps {
  sheet: RenderedScotiabankSheet;
}

export function ScotiabankPrep({ sheet }: Readonly<ScotiabankPrepProps>) {
  const sources = new Map(sheet.sources.map((source) => [source.id, source]));
  const sectionTitle = new Map<string, string>([
    ...sheet.sections.map((section): [string, string] => [section.id, section.title]),
    ["domain", "Wealth onboarding"],
  ]);
  const questions: PrepQuestionMeta[] = sheet.sections.flatMap((section) =>
    section.questions.map((question) => ({
      id: question.id,
      sectionId: section.id,
      track: section.track,
      level: question.level,
    })),
  );
  const reportedByCategory = groupBy(sheet.reported, (item) => item.category);

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand />
        <nav className="flex items-center gap-5 sm:gap-5.5">
          <Link href="/scotiabank/study" className="text-clay hover:text-bone text-[12.5px] transition-colors">
            Concepts &amp; flashcards
          </Link>
          <Link href="/interview-prep" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Interview prep
          </Link>
          <Link href="/quick-review" className="text-ash hover:text-bone hidden text-[12.5px] transition-colors sm:block">
            Quick review
          </Link>
          <span className="border-line-3 text-slate rounded-md border px-2.5 py-1 font-mono text-[11px]">Unlisted</span>
        </nav>
      </header>

      <PrepProvider questions={questions}>
        <OpenFromHash />

        <div className="mx-auto max-w-295 px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
          <div className="border-line-3 text-clay mb-5 inline-block rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]">
            Req 278593 · Global Wealth Engineering · Toronto
          </div>
          <h1 className="text-parchment m-0 mb-3.5 text-[34px]/[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]/[1.06]">
            Scotiabank: Full Stack Developer, Entry Level
          </h1>
          <p className="text-stone m-0 mb-6 max-w-[46em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]">
            A prep page for one posting: GWE&apos;s client and account onboarding platforms for Scotia Wealth
            Management. It covers how the bank interviews, the questions candidates actually report, the stack and the
            regulations the team builds against, then {questions.length} questions written for this job description,
            with sources for every claim about the bank.
          </p>
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-ash font-mono text-[12px]">
            <span>
              <span className="text-paper tabular-nums">{questions.length}</span> questions
            </span>
            <span>
              <span className="text-paper tabular-nums">{sheet.reported.length}</span> reported by candidates
            </span>
            <span>
              <span className="text-paper tabular-nums">{sheet.sources.length}</span> sources
            </span>
            <span>Researched November 2026</span>
          </div>
          <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "#loop", step: "Know the loop", body: "Recruiter, Codility, two senior developers, the manager. What each round wants." },
              { href: "/scotiabank/study", step: "Review the concepts", body: "Every technology in the posting explained and compared, with before/after code and flashcards." },
              { href: "#questions", step: "Drill the bank", body: "Answer out loud, then open the card. Filter by track, or draw questions at random." },
              { href: "#plan", step: "Rehearse your stories", body: "Seven STAR stories mapped to ScotiaBond, and a seven-day plan." },
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

        <PrepSearch />

        <div className="mx-auto max-w-295 px-6 py-7 sm:px-10 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <nav
            aria-label="Sections"
            className="scrollbar-hairline -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:sticky lg:top-22 lg:mx-0 lg:max-h-[calc(100dvh-7rem)] lg:flex-col lg:gap-0.5 lg:self-start lg:overflow-y-auto lg:px-0"
          >
            {NAV.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="border-line-2 text-stone hover:text-bone lg:hover:bg-surface-4 shrink-0 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors lg:rounded-md lg:border-0 lg:px-2 lg:text-[12.5px]/[1.4] lg:whitespace-normal"
              >
                {entry.title}
              </a>
            ))}
          </nav>

          <main className="mt-5 flex min-w-0 flex-col gap-16 lg:mt-0">
            <PageSection
              id="role"
              eyebrow="The posting"
              title="The role, decoded"
              blurb="Each line of the job description, how heavily it weighs, and what an interviewer is likely to probe for it. **Core** lines get the most questions. **Assets** earn credit, but nobody fails for lacking them."
            >
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {sheet.requirements.map((requirement) => (
                  <li
                    key={requirement.text}
                    className="border-line-2 bg-surface-2 grid gap-2 rounded-[9px] border p-4 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-5"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className={cn(
                          "rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em] uppercase",
                          WEIGHT[requirement.weight].className,
                        )}
                      >
                        {WEIGHT[requirement.weight].label}
                      </span>
                      <span className="text-paper text-[13.5px]/[1.5] font-medium text-pretty">
                        <PrepText text={requirement.text} />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-bone m-0 mb-2.5 text-[13.5px]/[1.65] text-pretty">
                        <PrepText text={requirement.probe} />
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {requirement.sections.map((id) => (
                          <a
                            key={id}
                            href={`#${id}`}
                            className="border-line-2 text-stone hover:text-bone hover:border-line-3 rounded-full border px-2.5 py-0.5 text-[11.5px] transition-colors"
                          >
                            {sectionTitle.get(id) ?? id}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </PageSection>

            <PageSection
              id="loop"
              eyebrow="Process"
              title="The interview loop"
              blurb="Pieced together from the bank's careers pages and candidate reports for software roles; no review names GWE itself. Loops vary by team, so confirm yours with the recruiter. The badges say how much weight each claim can bear."
            >
              <ConfidenceLegend />
              <ol className="m-0 mb-10 flex list-none flex-col gap-3 p-0">
                {sheet.stages.map((stage, index) => (
                  <li key={stage.id} className="border-line-2 rounded-xl border p-4.5 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                      <span className="text-clay font-mono text-[11px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="text-parchment m-0 text-[16px] font-semibold tracking-[-0.01em]">{stage.name}</h3>
                      <ConfidenceBadge confidence={stage.confidence} />
                    </div>
                    <div className="text-ash mb-3.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11.5px]">
                      <span>{stage.length}</span>
                      <span>{stage.format}</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <BulletBlock title="What happens" items={stage.expect} />
                      <BulletBlock title="How to prepare" items={stage.prepare} />
                    </div>
                    <div className="mt-3.5">
                      <SourceLinks ids={stage.sources} sources={sources} />
                    </div>
                  </li>
                ))}
              </ol>
              <SubHeading>Worth knowing</SubHeading>
              <FactList facts={sheet.process} sources={sources} className="mt-3" />
            </PageSection>

            <PageSection
              id="reported"
              eyebrow="Intel"
              title="What candidates were asked"
              blurb="Questions candidates report from Scotiabank software interviews, paraphrased and grouped. Each links to its answer on this page. Most come from Glassdoor, read through search extracts because the site blocks direct reading. Reddit couldn't be reached at all."
            >
              <div className="flex flex-col gap-8">
                {[...reportedByCategory].map(([category, items]) => (
                  <div key={category}>
                    <SubHeading>{category}</SubHeading>
                    <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                      {items.map((item) => (
                        <li
                          key={item.text}
                          className="border-line-2 bg-surface-2 flex flex-col gap-2 rounded-[9px] border px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <ConfidenceBadge confidence={item.confidence} className="self-start" />
                          <div className="min-w-0 flex-1">
                            <p className="text-paper m-0 text-[14px]/[1.55] text-pretty">
                              <PrepText text={item.text} />
                            </p>
                            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              {item.context ? <span className="text-ash text-[12px]">{item.context}</span> : null}
                              <SourceLinks ids={item.sources} sources={sources} />
                            </div>
                          </div>
                          {item.answer ? (
                            <OpenQuestionLink
                              id={item.answer}
                              className="text-clay shrink-0 self-start font-mono text-[11.5px] whitespace-nowrap hover:underline sm:self-center"
                            >
                              Answer →
                            </OpenQuestionLink>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PageSection>

            <PageSection
              id="stack"
              eyebrow="Technology"
              title="The stack"
              blurb="What GWE and the teams around it run, from Scotiabank's own postings for this team and its neighbours, and from the bank's press releases. Use it to tie your answers to their tools: 'I'd look in Splunk for the correlation id' lands better than 'I'd check the logs'."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {sheet.stack.map((area) => (
                  <article key={area.id} id={area.id} className="border-line-2 rounded-xl border p-4.5 sm:p-5">
                    <h3 className="text-parchment m-0 mb-3.5 text-[15px] font-semibold">{area.title}</h3>
                    <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                      {area.items.map((item) => (
                        <li key={item.name}>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="text-paper text-[13.5px] font-medium">{item.name}</span>
                            <ConfidenceBadge confidence={item.confidence} />
                          </div>
                          <p className="text-bone m-0 mb-1 text-[13px]/[1.6] text-pretty">
                            <PrepText text={item.note} />
                          </p>
                          <SourceLinks ids={item.sources} sources={sources} />
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </PageSection>

            <PageSection
              id="domain"
              eyebrow="Domain"
              title="Wealth onboarding, and what it means for the code"
              blurb="Financial-services knowledge is an 'asset' in the posting. A few minutes of domain vocabulary, such as KYC, suitability, identity verification and audit trails, turns generic answers into answers about their system. The rules come from the regulators' own texts; what they mean for software is reasoning, marked as such."
            >
              <FactList facts={sheet.domain} sources={sources} />
            </PageSection>

            <section id="questions" aria-labelledby="questions-title" className="scroll-mt-28">
              <div className="text-slate mb-1.5 font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">Practice</div>
              <h2 id="questions-title" className="text-parchment m-0 mb-2 text-2xl font-semibold tracking-[-0.02em] text-balance">
                Question bank
              </h2>
              <p className="text-ash m-0 mb-5 max-w-[66ch] text-[14px]/[1.65] text-pretty">
                {questions.length} questions, shaped by the posting and by the questions candidates reported. Answer each
                one out loud before opening it. The search bar above covers every answer, and &ldquo;Draw a
                question&rdquo; picks one at random from the current filters, for a mock round.
              </p>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <BankFilterBar tracks={TRACKS} />
                <DrawQuestionButton />
              </div>

              <div id={PREP_RESULTS_ID} className="flex scroll-mt-24 flex-col gap-14">
                <PrepEmpty />
                {sheet.sections.map((section) => (
                  <QuestionSection key={section.id} section={section} />
                ))}
              </div>
            </section>

            <PageSection
              id="why"
              eyebrow="Your answer"
              title="Why Scotiabank? Material for the most-asked question"
              blurb="'Why do you want to work at Scotiabank?' is the most frequently reported question. Pick two or three of these, connect them to what you want to build, and say them in your own words."
            >
              <div className="grid gap-3 md:grid-cols-2">
                {sheet.whyScotiabank.map((point) => (
                  <article key={point.title} className="border-line-2 bg-surface-2 rounded-[9px] border p-4.5">
                    <div className="mb-2 flex flex-wrap items-center gap-2.5">
                      <ConfidenceBadge confidence={point.confidence} />
                      <h3 className="text-paper m-0 text-[14.5px] font-semibold text-pretty">{point.title}</h3>
                    </div>
                    <p className="text-bone m-0 mb-2.5 text-[13.5px]/[1.65] text-pretty">
                      <PrepText text={point.text} />
                    </p>
                    <SourceLinks ids={point.sources} sources={sources} />
                  </article>
                ))}
              </div>
            </PageSection>

            <PageSection
              id="ask"
              eyebrow="Your questions"
              title="Questions to ask them"
              blurb="Each one shows you've done the reading, and gets an answer you can use. Ask the technical ones of the senior developers, and the team ones of the manager."
            >
              <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {sheet.askThem.map((item, index) => (
                  <li key={item.question} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2">
                    <span className="text-clay pt-0.5 font-mono text-[11.5px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-paper m-0 mb-1 text-[14px]/[1.6] font-medium text-pretty">
                        <PrepText text={item.question} />
                      </p>
                      <p className="text-ash m-0 text-[13px]/[1.6] text-pretty">
                        <PrepText text={item.why} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </PageSection>

            <PageSection
              id="plan"
              eyebrow="On the way there"
              title="Seven-day plan"
              blurb="About two hours a day. Each day ends with something said out loud or built from a blank file, because reading an answer is not the same as giving it. The checklists remember what you've ticked, in this browser."
            >
              <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
                {sheet.plan.map((day) => (
                  <li key={day.day} className="border-line-2 rounded-xl border p-4.5">
                    <div className="mb-2.5 flex items-baseline gap-3">
                      <span className="text-clay shrink-0 font-mono text-[11.5px] whitespace-nowrap">{day.day}</span>
                      <h3 className="text-paper m-0 text-[14.5px] font-semibold">{day.title}</h3>
                    </div>
                    <ul className="text-bone marker:text-slate m-0 mb-3 flex list-disc flex-col gap-1.5 pl-5 text-[13px]/[1.6]">
                      {day.tasks.map((task) => (
                        <li key={task} className="pl-1 text-pretty">
                          <PrepText text={task} />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {day.sections.map((id) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="border-line-2 text-stone hover:text-bone hover:border-line-3 rounded-full border px-2.5 py-0.5 text-[11.5px] transition-colors"
                        >
                          {sectionTitle.get(id) ?? id}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {sheet.checklists.map((list) => (
                  <PracticeChecklist key={list.id} list={list} />
                ))}
              </div>
            </PageSection>

            <PageSection
              id="sources"
              eyebrow="Sources"
              title="Sources"
              blurb="Everything this page claims about Scotiabank, and how much weight each source can bear. Several closed postings survive only as faithful third-party copies, marked as such. Reported questions are paraphrased, and quotations are kept short."
            >
              <SourceList sources={sheet.sources} />
            </PageSection>
          </main>
        </div>
      </PrepProvider>

      <footer className="border-line text-slate mx-auto max-w-295 border-t px-6 py-8 text-[12.5px]/[1.7] sm:px-10">
        An unlisted study page, kept out of search engines, built from public sources in November 2026. Not affiliated
        with or endorsed by Scotiabank. Candidate reports are anonymous and vary by team, so treat them as patterns, not
        promises. Checklists and open cards stay in this browser.
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

function ConfidenceLegend() {
  return (
    <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
      {CONFIDENCE_LEGEND.map(({ confidence, meaning }) => (
        <span key={confidence} className="text-ash inline-flex items-center gap-2 text-[12.5px]">
          <ConfidenceBadge confidence={confidence} />
          {meaning}
        </span>
      ))}
    </div>
  );
}

function BulletBlock({ title, items }: Readonly<{ title: string; items: readonly string[] }>) {
  return (
    <div>
      <div className="text-slate mb-2 font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase">{title}</div>
      <ul className="text-bone marker:text-slate m-0 flex list-disc flex-col gap-1.5 pl-5 text-[13px]/[1.6]">
        {items.map((item) => (
          <li key={item} className="pl-1 text-pretty">
            <PrepText text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FactListProps {
  facts: readonly RenderedFact[];
  sources: ReadonlyMap<string, Source>;
  className?: string;
}

function FactList({ facts, sources, className }: Readonly<FactListProps>) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {facts.map((fact) => (
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
  );
}

/** A group of question cards, set exactly like the interview prep sheet. */
function QuestionSection({ section }: Readonly<{ section: RenderedPrepSection }>) {
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

function SourceList({ sources }: Readonly<{ sources: readonly Source[] }>) {
  return (
    <div className="flex flex-col gap-6">
      {SOURCE_ORDER.map((confidence) => (
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
                    className="text-paper hover:text-clay inline-flex items-center gap-1 text-[13.5px] font-medium underline-offset-2 transition-colors hover:underline"
                  >
                    {source.title}
                    <ArrowUpRight aria-hidden className="size-3 shrink-0" />
                  </a>
                  <p className="text-ash m-0 text-[12.5px]/[1.6] text-pretty">
                    <PrepText text={source.note} />
                  </p>
                </div>
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
}

function groupBy<T>(items: readonly T[], key: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const name = key(item);
    groups.set(name, [...(groups.get(name) ?? []), item]);
  }
  return groups;
}
