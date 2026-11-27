"use client";

/**
 * The concept review's client-side pieces: the flashcard deck, the "drill this
 * topic" buttons that point the deck at one topic, and the switch that opens
 * every answer in a topic for reading straight through.
 *
 * Known cards and the deck's filters live in the study store, so they survive
 * reloads and stay in sync between tabs. Where you are in the deck doesn't:
 * reopening the page starts a fresh pass.
 */
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, RotateCcw, Shuffle, X } from "lucide-react";
import type { StudyCard } from "@/data/scotiabank/study";
import { FilterPill, PrepText } from "@components";
import { cn, forgetCards, markCard, setStudyDeck, studyStore as store, type StudyDeckKind, type StudyState } from "@lib";

export const FLASHCARDS_ID = "flashcards";
const DECK_ID = "flashcard-deck";

export interface StudyTopicLabel {
  id: string;
  short: string;
}

const KINDS: { kind: StudyDeckKind; label: string }[] = [
  { kind: "all", label: "Concepts + questions" },
  { kind: "concept", label: "Concepts" },
  { kind: "question", label: "Questions" },
];

function useStudy(): StudyState {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

export interface FlashcardDeckProps {
  cards: readonly StudyCard[];
  topics: readonly StudyTopicLabel[];
}

export function FlashcardDeck({ cards, topics }: Readonly<FlashcardDeckProps>) {
  const state = useStudy();
  const [seed, setSeed] = useState(0); // 0 keeps reading order
  const known = useMemo(() => new Set(state.known), [state.known]);
  const topicName = useMemo(() => new Map(topics.map((topic) => [topic.id, topic.short])), [topics]);

  const deck = useMemo(() => {
    const matching = cards.filter(
      (card) => (state.topic === "all" || card.topic === state.topic) && (state.kind === "all" || card.kind === state.kind),
    );
    return seed === 0 ? matching : shuffle(matching, seed);
  }, [cards, state.topic, state.kind, seed]);
  const knownInDeck = deck.filter((card) => known.has(card.id)).length;

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Deck topic" className="flex flex-wrap gap-2">
        <FilterPill active={state.topic === "all"} onClick={() => store.update((s) => setStudyDeck(s, { topic: "all" }))}>
          All topics
        </FilterPill>
        {topics.map((topic) => (
          <FilterPill
            key={topic.id}
            active={state.topic === topic.id}
            onClick={() => store.update((s) => setStudyDeck(s, { topic: topic.id }))}
          >
            {topic.short}
          </FilterPill>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <div role="group" aria-label="Card types" className="flex flex-wrap gap-2">
          {KINDS.map((option) => (
            <FilterPill
              key={option.kind}
              active={state.kind === option.kind}
              onClick={() => store.update((s) => setStudyDeck(s, { kind: option.kind }))}
            >
              {option.label}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill active={state.hideKnown} onClick={() => store.update((s) => setStudyDeck(s, { hideKnown: !s.hideKnown }))}>
            Hide known
          </FilterPill>
          <FilterPill active={seed !== 0} onClick={() => setSeed(seed === 0 ? Date.now() : 0)}>
            Shuffled
          </FilterPill>
        </div>
      </div>

      <DeckSession
        key={`${state.topic}|${state.kind}|${seed}`}
        deck={deck}
        known={known}
        hideKnown={state.hideKnown}
        topicName={topicName}
        onShuffle={() => setSeed(Date.now())}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-48 flex-1 items-center gap-3">
          <div
            className="bg-surface-4 h-1.5 flex-1 overflow-hidden rounded-full"
            role="progressbar"
            aria-label="Cards known in this deck"
            aria-valuemin={0}
            aria-valuemax={deck.length}
            aria-valuenow={knownInDeck}
          >
            <div
              className="bg-mint h-full rounded-full transition-[width]"
              style={{ width: `${deck.length ? (knownInDeck / deck.length) * 100 : 0}%` }}
            />
          </div>
          <span className="text-ash font-mono text-[11.5px] tabular-nums">
            {knownInDeck}/{deck.length} known
          </span>
        </div>
        <button
          type="button"
          onClick={() => store.update((s) => forgetCards(s, deck.map((card) => card.id)))}
          disabled={knownInDeck === 0}
          className="text-ash hover:text-bone inline-flex items-center gap-1.5 font-mono text-[11.5px] transition-colors disabled:opacity-40"
        >
          <RotateCcw aria-hidden className="size-3" />
          Reset this deck
        </button>
      </div>
    </div>
  );
}

interface DeckSessionProps {
  deck: readonly StudyCard[];
  known: ReadonlySet<string>;
  hideKnown: boolean;
  topicName: ReadonlyMap<string, string>;
  onShuffle: () => void;
}

/** One pass through the deck. Re-keyed when the filters change, which starts a new pass. */
function DeckSession({ deck, known, hideKnown, topicName, onShuffle }: Readonly<DeckSessionProps>) {
  const visible = hideKnown ? deck.filter((card) => !known.has(card.id)) : deck;
  const [currentId, setCurrentId] = useState<string | null>(() => visible[0]?.id ?? null);
  const [revealed, setRevealed] = useState(false);
  const [tally, setTally] = useState({ knew: 0, again: 0 });
  const deckRef = useRef<HTMLDivElement>(null);

  // A card hidden by "hide known" falls back to the first visible one; null means the pass is over.
  const found = currentId === null ? -1 : visible.findIndex((card) => card.id === currentId);
  const position = currentId === null ? visible.length : Math.max(found, 0);
  const card = visible[position];

  const focusDeck = () => deckRef.current?.focus({ preventScroll: true });
  const go = (index: number) => {
    setCurrentId(visible[index]?.id ?? null);
    setRevealed(false);
    focusDeck();
  };
  const flip = () => {
    setRevealed((shown) => !shown);
    focusDeck();
  };
  const grade = (knew: boolean) => {
    if (!card) return;
    const nextId = visible[position + 1]?.id ?? null; // read before the mark can hide this card
    store.update((s) => markCard(s, card.id, knew));
    setTally((t) => (knew ? { ...t, knew: t.knew + 1 } : { ...t, again: t.again + 1 }));
    setCurrentId(nextId);
    setRevealed(false);
    focusDeck();
  };
  const restart = () => {
    setTally({ knew: 0, again: 0 });
    go(0);
  };

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const actions: Record<string, () => void> = {
      " ": () => card && flip(),
      ArrowRight: () => card && go(position + 1),
      ArrowLeft: () => go(Math.max(position - 1, 0)),
      "1": () => revealed && grade(false),
      "2": () => revealed && grade(true),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  if (deck.length === 0) {
    return <DeckMessage title="No cards match these filters." body="Pick another topic or card type." />;
  }
  if (visible.length === 0) {
    return (
      <DeckMessage
        title="You've marked every card in this deck as known."
        body="Turn off Hide known to go through them again, or reset this deck."
      />
    );
  }

  return (
    <div
      id={DECK_ID}
      ref={deckRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      aria-label="Flashcards. Space shows the answer, 1 means again, 2 means got it, arrows move between cards."
      className="border-line-3 bg-surface-2 rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-flame/50"
    >
      {card ? (
        <>
          <div className="border-line flex flex-wrap items-center justify-between gap-2 border-b px-4.5 py-3 sm:px-6">
            <span className="text-clay font-mono text-[11px] font-medium tracking-[0.06em] uppercase">
              {topicName.get(card.topic) ?? card.topic} · {card.kind === "concept" ? "Concept" : "Question"}
            </span>
            <span className="text-ash flex items-center gap-2.5 font-mono text-[11px] tabular-nums">
              {known.has(card.id) ? <span className="text-mint-text">known</span> : null}
              {position + 1} / {visible.length}
            </span>
          </div>

          <div className="flex min-h-64 flex-col px-4.5 py-6 sm:px-8 sm:py-8">
            <p className="text-parchment m-0 text-[19px]/[1.45] font-semibold tracking-[-0.01em] text-balance sm:text-[22px]/[1.4]">
              <PrepText text={card.front} />
            </p>
            {card.kind === "concept" ? (
              <p className="text-slate m-0 mt-2 text-[12.5px]">Explain it in two or three sentences, out loud, before you look.</p>
            ) : null}

            <div aria-live="polite" className="mt-6 flex-1">
              {revealed ? (
                <div className="border-flame-dim border-l-2 pl-4">
                  <p className="text-bone m-0 max-w-[68ch] text-[15px]/[1.75] text-pretty">
                    <PrepText text={card.back} />
                  </p>
                  <a href={`#${card.topic}`} className="text-clay mt-3 inline-block font-mono text-[11.5px] hover:underline">
                    Read the {topicName.get(card.topic) ?? card.topic} topic ↓
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-line flex items-center justify-between gap-2 border-t px-3.5 py-3.5 sm:gap-3 sm:px-6">
            <button type="button" onClick={() => go(Math.max(position - 1, 0))} disabled={position === 0} className={GHOST}>
              <ArrowLeft aria-hidden className="size-3.5" />
              <span className="sr-only sm:not-sr-only">Previous</span>
            </button>

            {revealed ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => grade(false)} className={cn(SOLID, "border-rust-line text-rust hover:bg-rust-bg")}>
                  <X aria-hidden className="size-3.5" />
                  Again <kbd className={KBD}>1</kbd>
                </button>
                <button type="button" onClick={() => grade(true)} className={cn(SOLID, "border-mint-line text-mint-text hover:bg-mint-deep")}>
                  <Check aria-hidden className="size-3.5" />
                  Got it <kbd className={KBD}>2</kbd>
                </button>
              </div>
            ) : (
              <button type="button" onClick={flip} className={cn(SOLID, "bg-flame text-ink border-flame hover:opacity-90")}>
                <Eye aria-hidden className="size-3.5" />
                Show answer <kbd className={cn(KBD, "border-ink/30 text-ink/70")}>Space</kbd>
              </button>
            )}

            <button type="button" onClick={() => go(position + 1)} className={GHOST}>
              <span className="sr-only sm:not-sr-only">Skip</span>
              <ArrowRight aria-hidden className="size-3.5" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
          <p className="text-parchment m-0 text-[19px] font-semibold">End of the deck</p>
          <p className="text-ash m-0 text-[13.5px]">
            This pass: <span className="text-mint-text tabular-nums">{tally.knew}</span> got it,{" "}
            <span className="text-rust tabular-nums">{tally.again}</span> again.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tally.again > 0 && !hideKnown ? (
              <button
                type="button"
                onClick={() => store.update((s) => setStudyDeck(s, { hideKnown: true }))}
                className={cn(SOLID, "bg-flame text-ink border-flame hover:opacity-90")}
              >
                Only the cards I missed
              </button>
            ) : null}
            <button type="button" onClick={restart} className={GHOST}>
              <RotateCcw aria-hidden className="size-3.5" />
              Start over
            </button>
            <button type="button" onClick={onShuffle} className={GHOST}>
              <Shuffle aria-hidden className="size-3.5" />
              Shuffle and start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const SOLID = "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-3.5";
const GHOST =
  "border-line-3 text-stone hover:text-bone hover:border-flame inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12.5px] transition-colors disabled:opacity-40";
const KBD = "border-current/30 hidden rounded border px-1 font-mono text-[10px] opacity-75 sm:inline";

function DeckMessage({ title, body }: Readonly<{ title: string; body: string }>) {
  return (
    <div className="border-line-3 bg-surface-2 flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border px-6 py-10 text-center">
      <p className="text-paper m-0 text-[15px] font-semibold">{title}</p>
      <p className="text-ash m-0 text-[13px]">{body}</p>
    </div>
  );
}

export interface DrillTopicButtonProps {
  topic: StudyTopicLabel;
  cardIds: readonly string[];
}

/** Points the deck at one topic and brings it into view, with this browser's progress on it. */
export function DrillTopicButton({ topic, cardIds }: Readonly<DrillTopicButtonProps>) {
  const state = useStudy();
  const known = cardIds.filter((id) => state.known.includes(id)).length;

  function drill() {
    store.update((s) => setStudyDeck(s, { topic: topic.id, kind: "all" }));
    requestAnimationFrame(() => {
      document.getElementById(FLASHCARDS_ID)?.scrollIntoView({ block: "start" });
      document.getElementById(DECK_ID)?.focus({ preventScroll: true });
    });
  }

  return (
    <button
      type="button"
      onClick={drill}
      className="border-flame-dim bg-flame-deep text-clay hover:border-flame inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
    >
      Drill {cardIds.length} flashcards
      <span className="text-ash font-mono text-[11px] tabular-nums">{known}/{cardIds.length} known</span>
    </button>
  );
}

/** Opens or closes every answer under one element, for reading a topic straight through. */
export function ToggleAnswersButton({ containerId }: Readonly<{ containerId: string }>) {
  const [open, setOpen] = useState(false);

  function toggle() {
    const next = !open;
    document.getElementById(containerId)?.querySelectorAll("details").forEach((details) => {
      details.open = next;
    });
    setOpen(next);
  }

  return (
    <button type="button" onClick={toggle} className="text-ash hover:text-bone font-mono text-[11.5px] transition-colors">
      {open ? "Close all answers" : "Open all answers"}
    </button>
  );
}

/** A deterministic shuffle, so one seed always gives the same order within a pass. */
function shuffle<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  let state = seed >>> 0 || 1;
  const random = () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let index = out.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [out[index], out[swap]] = [out[swap], out[index]];
  }
  return out;
}
