/**
 * The practice material on the CodeSignal page: timed mocks, the bug hunt and
 * the widget drills. Rendered on the server; only the level gate is a client
 * component, and it receives the levels already rendered.
 */
import type { RenderedBugHunt, RenderedMock, RenderedMockLevel, RenderedWidgetDrill, Source } from "@data";
import { PrepBlocks, PrepText, TypeBadge } from "@components";
import { SourceLinks } from "./confidence-badge";
import { ChecksList, Command, Disclosure, KitFileView, SpecView } from "./kit-file";
import { MockGate } from "./mock-gate";

const KIND_LABEL = { frontend: "Front-End framework", icf: "Industry Coding framework" } as const;

const LABEL = "text-slate mb-2 font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase";

interface CardHeaderProps {
  badge: string;
  title: string;
  minutes: number;
  lead: string;
  /** Where the task's shape comes from, shown with its sources. */
  basis?: string;
  sourceIds: readonly string[];
  sources: ReadonlyMap<string, Source>;
}

function CardHeader({ badge, title, minutes, lead, basis, sourceIds, sources }: Readonly<CardHeaderProps>) {
  const cited = Boolean(basis) || sourceIds.length > 0;
  return (
    <header className="mb-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <TypeBadge tone="accent">{badge}</TypeBadge>
        <span className="text-slate font-mono text-[11px]">{minutes} min</span>
      </div>
      <h3 className="text-parchment m-0 mb-1.5 text-lg font-semibold tracking-[-0.015em]">{title}</h3>
      <p className="text-bone m-0 mb-2 max-w-[68ch] text-[14px]/[1.65] text-pretty">
        <PrepText text={lead} />
      </p>
      {cited ? (
        <p className="text-ash m-0 max-w-[72ch] text-[12.5px]/[1.6] text-pretty">
          {basis ? <PrepText text={basis} /> : null} <SourceLinks ids={sourceIds} sources={sources} />
        </p>
      ) : null}
    </header>
  );
}

function Traps({ traps }: Readonly<{ traps: readonly string[] }>) {
  return (
    <ul className="text-bone marker:text-flame m-0 flex list-disc flex-col gap-2 pl-5 text-[13.5px]/[1.65]">
      {traps.map((text) => (
        <li key={text} className="pl-1 text-pretty">
          <PrepText text={text} />
        </li>
      ))}
    </ul>
  );
}

interface LevelContentProps {
  taskId: string;
  number: number;
  level: RenderedMockLevel;
}

function LevelContent({ taskId, number, level }: Readonly<LevelContentProps>) {
  return (
    <div className="flex flex-col gap-4">
      <PrepBlocks blocks={level.brief} />
      <div>
        <div className={LABEL}>Grade it</div>
        <Command>{`npm run level -- ${taskId} ${number}`}</Command>
      </div>
      <div className="flex flex-col gap-2">
        <Disclosure summary={`What the grader checks (${level.spec.checks.length})`}>
          <ChecksList checks={level.spec.checks} />
        </Disclosure>
        <Disclosure summary="Where points are lost (after your attempt)">
          <Traps traps={level.traps} />
        </Disclosure>
        <Disclosure summary="The spec file (spoiler)">
          <SpecView spec={level.spec} />
        </Disclosure>
      </div>
    </div>
  );
}

export interface MockCardProps {
  mock: RenderedMock;
  sources: ReadonlyMap<string, Source>;
}

export function MockCard({ mock, sources }: Readonly<MockCardProps>) {
  const minutes = mock.levels.reduce((total, level) => total + level.minutes, 0);

  return (
    <article id={`mock-${mock.id}`} className="border-line-2 scroll-mt-28 rounded-xl border p-4.5 sm:p-6">
      <CardHeader
        badge={KIND_LABEL[mock.kind]}
        title={mock.title}
        minutes={minutes}
        lead={mock.scenario}
        basis={mock.basis}
        sourceIds={mock.sources}
        sources={sources}
      />

      <Disclosure summary={`Provided files (${mock.provided.length}): read these first`} className="mb-4">
        {mock.provided.map((file) => (
          <KitFileView key={file.path} file={file} />
        ))}
      </Disclosure>

      <MockGate
        mockId={mock.id}
        levels={mock.levels.map((level, index) => ({
          title: level.title,
          minutes: level.minutes,
          content: <LevelContent taskId={mock.id} number={index + 1} level={level} />,
        }))}
        debrief={
          <div className="flex flex-col gap-4">
            <div className={LABEL}>Debrief</div>
            <PrepBlocks blocks={mock.debrief} />
            <Disclosure summary="Reference solution">
              {mock.solution.map((file) => (
                <KitFileView key={file.path} file={file} />
              ))}
            </Disclosure>
          </div>
        }
      />
    </article>
  );
}

export interface BugHuntCardProps {
  hunt: RenderedBugHunt;
}

export function BugHuntCard({ hunt }: Readonly<BugHuntCardProps>) {
  return (
    <article id={`mock-${hunt.id}`} className="border-line-2 scroll-mt-28 rounded-xl border p-4.5 sm:p-6">
      <header className="mb-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <TypeBadge tone="accent">Company-built task</TypeBadge>
          <span className="text-slate font-mono text-[11px]">60 min</span>
        </div>
        <h3 className="text-parchment m-0 mb-3 text-lg font-semibold tracking-[-0.015em]">{hunt.title}</h3>
        <PrepBlocks blocks={hunt.intro} />
      </header>

      <div className={LABEL}>Rules</div>
      <ul className="text-bone marker:text-slate m-0 mb-4 flex list-disc flex-col gap-1.5 pl-5 text-[13.5px]/[1.6]">
        {hunt.rules.map((rule) => (
          <li key={rule} className="pl-1">
            <PrepText text={rule} />
          </li>
        ))}
      </ul>

      <Disclosure summary={`The code you are given (${hunt.provided.length} files)`} className="mb-4">
        {hunt.provided.map((file) => (
          <KitFileView key={file.path} file={file} />
        ))}
      </Disclosure>

      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {hunt.tickets.map((ticket) => (
          <li key={ticket.number} className="border-line-3 bg-surface-2 rounded-[9px] border p-4.5">
            <div className="mb-2 flex items-start gap-3">
              <span className="bg-flame-deep text-clay border-flame-dim grid size-7 shrink-0 place-items-center rounded-md border font-mono text-[12px] font-semibold">
                {ticket.number}
              </span>
              <h4 className="text-paper m-0 pt-0.5 text-[14.5px] font-medium text-pretty">
                <PrepText text={ticket.title} />
              </h4>
            </div>
            <dl className="m-0 mb-3 grid gap-x-4 gap-y-1.5 text-[13.5px]/[1.6] sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <dt className="text-slate font-mono text-[11px] tracking-[0.06em] uppercase sm:pt-0.5">Symptom</dt>
              <dd className="text-bone m-0">
                <PrepText text={ticket.symptom} />
              </dd>
              <dt className="text-slate font-mono text-[11px] tracking-[0.06em] uppercase sm:pt-0.5">Expected</dt>
              <dd className="text-bone m-0">
                <PrepText text={ticket.expected} />
              </dd>
            </dl>
            <div className="mb-3">
              <Command>{`npm run level -- ${hunt.id} ${ticket.number}`}</Command>
            </div>
            <div className="flex flex-col gap-2">
              <Disclosure summary="Hint">
                <p className="text-bone m-0 text-[13.5px]/[1.65]">
                  <PrepText text={ticket.hint} />
                </p>
              </Disclosure>
              <Disclosure summary="Cause and fix (after your attempt)">
                <PrepBlocks blocks={ticket.fix} />
              </Disclosure>
              <Disclosure summary="The spec file">
                <SpecView spec={ticket.spec} />
              </Disclosure>
            </div>
          </li>
        ))}
      </ol>

      <Disclosure summary="Reference solution: the fixed files" className="mt-4">
        {hunt.solution.map((file) => (
          <KitFileView key={file.path} file={file} />
        ))}
      </Disclosure>
    </article>
  );
}

export interface WidgetCardProps {
  widget: RenderedWidgetDrill;
  sources: ReadonlyMap<string, Source>;
}

/** Widgets with a component get a live preview; the cancellable module has none. */
const PREVIEWABLE = new Set(["typewriter", "otp-input", "nested-checkboxes", "progress-queue", "autocomplete"]);

export function WidgetCard({ widget, sources }: Readonly<WidgetCardProps>) {
  return (
    <article id={`widget-${widget.id}`} className="border-line-2 scroll-mt-28 rounded-xl border p-4.5 sm:p-6">
      <CardHeader
        badge="Widget drill"
        title={widget.title}
        minutes={widget.minutes}
        lead={widget.basis}
        sourceIds={widget.sources}
        sources={sources}
      />
      <PrepBlocks blocks={widget.brief} />
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Command>{`npm run level -- ${widget.id}`}</Command>
        {PREVIEWABLE.has(widget.id) ? (
          <span className="text-slate font-mono text-[11.5px]">preview: localhost:5173/?widget={widget.id}</span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Disclosure summary={`What the grader checks (${widget.spec.checks.length})`}>
          <ChecksList checks={widget.spec.checks} />
        </Disclosure>
        <Disclosure summary="Notes (after your attempt)">
          <PrepBlocks blocks={widget.notes} />
        </Disclosure>
        <Disclosure summary="The spec file">
          <SpecView spec={widget.spec} />
        </Disclosure>
        <Disclosure summary="Reference solution">
          {widget.solution.map((file) => (
            <KitFileView key={file.path} file={file} />
          ))}
        </Disclosure>
      </div>
    </article>
  );
}
