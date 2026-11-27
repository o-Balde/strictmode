/**
 * The Scotiabank concept review: every technology in the job description,
 * explained, compared, traced through its versions, and turned into flashcards.
 * Unlisted like the prep page it hangs off: only that page links here.
 *
 * Everything renders on the server. The deck, the "drill this topic" buttons
 * and "open all answers" are the only client pieces, and the deck's progress
 * stays in this browser.
 */
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { RenderedPrepCode } from "@data";
import type { RequirementWeight } from "@/data/scotiabank";
import type { RenderedStudyPair, RenderedStudySheet, RenderedStudyTopic } from "@/data/scotiabank/study";
import { Brand, PrepBlocks, PrepText } from "@components";
import { cn } from "@lib";
import { DrillTopicButton, FLASHCARDS_ID, FlashcardDeck, ToggleAnswersButton } from "./study-tools";

const WEIGHT: Record<RequirementWeight, { label: string; group: string; className: string }> = {
  core: { label: "Core", group: "Core skills", className: "border-flame-dim bg-flame-deep text-clay" },
  familiar: { label: "Familiar", group: "Familiarity expected", className: "border-line-3 text-stone" },
  asset: { label: "Asset", group: "Assets", className: "border-mint-line bg-mint-deep text-mint-text" },
};

/**
 * A pair sits side by side only on wide screens, and only when both snippets
 * fit half the column (about 46 monospace characters at `xl`); otherwise the
 * two panes stack, which reads better than scrolling sideways.
 */
const SIDE_BY_SIDE_MAX = 44;

export interface ScotiabankStudyProps {
  sheet: RenderedStudySheet;
}

export function ScotiabankStudy({ sheet }: Readonly<ScotiabankStudyProps>) {
  const { topics, cards } = sheet;
  const labels = topics.map((topic) => ({ id: topic.id, short: topic.short }));
  const cardIds = new Map<string, string[]>();
  for (const card of cards) cardIds.set(card.topic, [...(cardIds.get(card.topic) ?? []), card.id]);

  const concepts = topics.reduce((count, topic) => count + topic.concepts.length, 0);
  const questions = topics.reduce((count, topic) => count + topic.questions.length, 0);
  const pairs = topics.reduce((count, topic) => count + topic.parts.reduce((n, part) => n + (part.pairs?.length ?? 0), 0), 0);
  const groups = (["core", "familiar", "asset"] as const).map((weight) => ({
    weight,
    topics: topics.filter((topic) => topic.weight === weight),
  }));

  return (
    <div className="min-h-dvh">
      <header className="border-line flex items-center justify-between border-b px-6 py-4 sm:px-8">
        <Brand />
        <nav className="flex items-center gap-5">
          <Link href="/scotiabank" className="text-ash hover:text-bone text-[12.5px] transition-colors">
            ← Prep page
          </Link>
          <span className="border-line-3 text-slate rounded-md border px-2.5 py-1 font-mono text-[11px]">Unlisted</span>
        </nav>
      </header>

      <div className="mx-auto max-w-295 px-6 pt-10 pb-8 sm:px-10 sm:pt-14">
        <div className="border-line-3 text-clay mb-5 inline-block rounded-full border px-[11px] py-1.5 font-mono text-[11px] font-medium tracking-[0.03em]">
          Req 278593 · Full Stack Developer · Concept review
        </div>
        <h1 className="text-parchment m-0 mb-3.5 text-[34px]/[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]/[1.06]">
          Every technology in the posting, reviewed
        </h1>
        <p className="text-stone m-0 mb-6 max-w-[46em] text-[15px]/[1.7] text-pretty sm:text-base/[1.7]">
          The night-before companion to the Scotiabank prep page. Each line of the job description gets the concepts
          behind it, the comparisons interviewers like (PostgreSQL vs Azure SQL vs MongoDB, OAuth vs OIDC vs JWT, Cloud
          Run vs App Service), what changed between versions, with the old way and the new way side by side, and the
          short questions used to check you know it. Every concept and question is also a flashcard.
        </p>
        <div className="text-ash mb-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
          {[
            [topics.length, "topics"],
            [concepts, "concepts"],
            [questions, "questions with answers"],
            [cards.length, "flashcards"],
            [pairs, "before/after comparisons"],
          ].map(([value, label]) => (
            <span key={label}>
              <span className="text-paper tabular-nums">{value}</span> {label}
            </span>
          ))}
          <span>Checked November 2026</span>
        </div>
        <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
          {[
            { href: `#${topics[0]?.id ?? ""}`, step: "Read a topic", body: "Concepts first, then the comparisons and the before/after code. Say each concept out loud." },
            { href: `#${FLASHCARDS_ID}`, step: "Drill the flashcards", body: "Answer, flip, mark it. Then go again on only the cards you missed. Progress stays in this browser." },
            { href: "/scotiabank#questions", step: "Go deeper", body: "Each topic links to its section of the prep page: long answers, follow-ups and worked examples." },
          ].map((item, index) => (
            <li key={item.step}>
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

      <div className="mx-auto max-w-295 px-6 py-7 sm:px-10 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
        <nav
          aria-label="Topics"
          className="scrollbar-hairline -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:sticky lg:top-6 lg:mx-0 lg:max-h-[calc(100dvh-3rem)] lg:flex-col lg:gap-0.5 lg:self-start lg:overflow-y-auto lg:px-0"
        >
          <a href={`#${FLASHCARDS_ID}`} className={cn(NAV_LINK, "lg:text-clay")}>
            Flashcards
          </a>
          {groups.map((group) => (
            <div key={group.weight} className="contents lg:mt-3 lg:flex lg:flex-col lg:gap-0.5">
              <span className="text-slate hidden px-2 pb-1 font-mono text-[10px] font-medium tracking-[0.08em] uppercase lg:block">
                {WEIGHT[group.weight].group}
              </span>
              {group.topics.map((topic) => (
                <a key={topic.id} href={`#${topic.id}`} className={NAV_LINK}>
                  {topic.short}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <main className="mt-5 flex min-w-0 flex-col gap-20 lg:mt-0">
          <section id={FLASHCARDS_ID} aria-labelledby="flashcards-title" className="scroll-mt-6">
            <div className="text-slate mb-1.5 font-mono text-[10.5px] font-medium tracking-[0.07em] uppercase">Study</div>
            <h2 id="flashcards-title" className="text-parchment m-0 mb-2 text-2xl font-semibold tracking-[-0.02em]">
              Flashcards
            </h2>
            <p className="text-ash m-0 mb-5 max-w-[66ch] text-[14px]/[1.65] text-pretty">
              {cards.length} cards from every topic below. Say the answer out loud, then show it and mark yourself
              honestly. After a pass, run the deck again with only the cards you missed. Keys: <Kbd>Space</Kbd> shows
              the answer, <Kbd>1</Kbd> again, <Kbd>2</Kbd> got it, <Kbd>←</Kbd> <Kbd>→</Kbd> move.
            </p>
            <FlashcardDeck cards={cards} topics={labels} />
          </section>

          {topics.map((topic) => (
            <TopicSection key={topic.id} topic={topic} cardIds={cardIds.get(topic.id) ?? []} />
          ))}
        </main>
      </div>

      <footer className="border-line text-slate mx-auto max-w-295 border-t px-6 py-8 text-[12.5px]/[1.7] sm:px-10">
        An unlisted study page, checked against official documentation in November 2026. Not affiliated with or
        endorsed by Scotiabank. Versions move quickly: the documentation links in each topic are the source of truth.
        Flashcard progress stays in this browser.
      </footer>
    </div>
  );
}

const NAV_LINK =
  "border-line-2 text-stone hover:text-bone lg:hover:bg-surface-4 shrink-0 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors lg:rounded-md lg:border-0 lg:px-2 lg:text-[12.5px]/[1.4] lg:whitespace-normal";

function Kbd({ children }: Readonly<{ children: React.ReactNode }>) {
  return <kbd className="border-line-3 text-bone rounded border px-1.5 py-px font-mono text-[11px]">{children}</kbd>;
}

function TopicSection({ topic, cardIds }: Readonly<{ topic: RenderedStudyTopic; cardIds: string[] }>) {
  const weight = WEIGHT[topic.weight];
  const answersId = `${topic.id}-answers`;

  return (
    <section id={topic.id} aria-labelledby={`${topic.id}-title`} className="scroll-mt-6">
      <div className="mb-2 flex flex-wrap items-center gap-2.5">
        <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em] uppercase", weight.className)}>
          {weight.label}
        </span>
        <span className="text-slate text-[12.5px] text-pretty">{topic.jd}</span>
      </div>
      <h2 id={`${topic.id}-title`} className="text-parchment m-0 mb-2.5 text-[26px]/[1.2] font-semibold tracking-[-0.02em] text-balance">
        {topic.title}
      </h2>
      <p className="text-stone m-0 mb-5 max-w-[68ch] text-[14.5px]/[1.7] text-pretty">
        <PrepText text={topic.summary} />
      </p>

      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <DrillTopicButton topic={{ id: topic.id, short: topic.short }} cardIds={cardIds} />
        </div>
        <LinkRow label="Go deeper">
          {topic.bank.map((id, index) => (
            <Link
              key={id}
              href={`/scotiabank#${id}`}
              className="border-line-2 text-stone hover:text-bone hover:border-line-3 rounded-full border px-2.5 py-0.5 text-[11.5px] transition-colors"
            >
              {topic.bankTitles[index]}
            </Link>
          ))}
        </LinkRow>
        <LinkRow label="Docs">
          {topic.docs.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ash hover:text-clay inline-flex items-center gap-1 text-[12px] underline-offset-2 transition-colors hover:underline"
            >
              {link.label}
              <ArrowUpRight aria-hidden className="size-3 shrink-0" />
            </a>
          ))}
        </LinkRow>
      </div>

      <SubHeading>Concepts</SubHeading>
      <dl className="m-0 mt-3 mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {topic.concepts.map((item) => (
          <div key={item.term} className="border-line-2 bg-surface-2 min-w-0 rounded-[9px] border p-4">
            <dt className="text-paper m-0 mb-1.5 text-[14px]/[1.45] font-semibold text-pretty">
              <PrepText text={item.term} />
            </dt>
            <dd className="text-bone m-0 text-[13.5px]/[1.65] text-pretty">
              <PrepText text={item.text} />
            </dd>
          </div>
        ))}
      </dl>

      {topic.news.length > 0 ? (
        <aside className="border-mint-line bg-mint-deep/40 mb-10 rounded-[9px] border p-4.5">
          <div className="text-mint-text mb-2.5 font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase">
            What changed recently
          </div>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {topic.news.map((item) => (
              <li key={item.url} className="text-bone text-[13.5px]/[1.6] text-pretty">
                <PrepText text={item.text} />{" "}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-mint-text inline-flex items-center gap-0.5 font-mono text-[11px] whitespace-nowrap hover:underline"
                >
                  {new URL(item.url).hostname.replace(/^www\./, "")}
                  <ArrowUpRight aria-hidden className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="mb-10 flex flex-col gap-10">
        {topic.parts.map((part) => (
          <div key={part.id} id={part.id} className="scroll-mt-6">
            <h3 className="text-paper m-0 mb-2 text-[17px] font-semibold tracking-[-0.01em] text-pretty">
              <PrepText text={part.title} />
            </h3>
            {part.intro ? (
              <p className="text-ash m-0 mb-4 max-w-[68ch] text-[13.5px]/[1.65] text-pretty">
                <PrepText text={part.intro} />
              </p>
            ) : null}
            {part.blocks ? <PrepBlocks blocks={part.blocks} className={part.intro ? undefined : "mt-3"} /> : null}
            {part.pairs ? (
              <ol className="m-0 mt-3 flex list-none flex-col gap-4 p-0">
                {part.pairs.map((pair, index) => (
                  <PairCard key={pair.title} pair={pair} index={index} />
                ))}
              </ol>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <SubHeading>Questions and answers</SubHeading>
        <ToggleAnswersButton containerId={answersId} />
      </div>
      <p className="text-ash m-0 mb-3 text-[13px]">Answer out loud first, then open the card.</p>
      <ol id={answersId} className="m-0 flex list-none flex-col gap-2 p-0">
        {topic.questions.map((item, index) => (
          <li key={item.q}>
            <details className="group border-line-2 bg-surface-2 open:border-line-3 rounded-[9px] border">
              <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="text-clay pt-0.5 font-mono text-[11px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-paper flex-1 text-[14px]/[1.55] font-medium text-pretty">
                  <PrepText text={item.q} />
                </span>
                <ChevronDown aria-hidden className="text-slate mt-1 size-3.5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-line border-t px-4 py-3.5 pl-12">
                <p className="text-bone m-0 max-w-[70ch] text-[14px]/[1.7] text-pretty">
                  <PrepText text={item.a} />
                </p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PairCard({ pair, index }: Readonly<{ pair: RenderedStudyPair; index: number }>) {
  const sideBySide = widest(pair.before) <= SIDE_BY_SIDE_MAX && widest(pair.after) <= SIDE_BY_SIDE_MAX;

  return (
    <li className="border-line-2 rounded-xl border p-4.5 sm:p-5">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <span className="text-clay font-mono text-[11px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <h4 className="text-paper m-0 text-[14.5px] font-semibold text-pretty">
          <PrepText text={pair.title} />
        </h4>
        <span className="border-line-3 text-ash rounded border px-1.5 py-0.5 font-mono text-[10.5px]">
          <PrepText text={pair.since} />
        </span>
      </div>
      <p className="text-ash m-0 mb-4 max-w-[70ch] text-[13.5px]/[1.65] text-pretty">
        <PrepText text={pair.note} />
      </p>
      <div className={cn("grid grid-cols-1 gap-3", sideBySide && "xl:grid-cols-2")}>
        <PrepBlocks blocks={[{ ...pair.before, caption: labelled("Before", pair.before.caption), tone: "bad" }]} className="min-w-0" />
        <PrepBlocks blocks={[{ ...pair.after, caption: labelled("After", pair.after.caption), tone: "good" }]} className="min-w-0" />
      </div>
    </li>
  );
}

function labelled(side: string, caption: string | undefined): string {
  return caption ? `${side} · ${caption}` : side;
}

function widest(block: RenderedPrepCode): number {
  return Math.max(...block.code.split("\n").map((line) => line.length));
}

function LinkRow({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span className="text-slate w-20 shrink-0 font-mono whitespace-nowrap text-[10.5px] font-medium tracking-[0.08em] uppercase">{label}</span>
      {children}
    </div>
  );
}

function SubHeading({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h3 className="text-stone m-0 font-mono text-[12px] font-medium tracking-[0.05em] uppercase">{children}</h3>;
}
