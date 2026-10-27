"use client";

/**
 * The emitter from the answer, live: subscribe listeners to event types, emit
 * events, unsubscribe. The emitter is the real ten-line implementation; the
 * diagram only shows who is subscribed to what.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DemoButton, DemoConsole, Panel, Segmented, line, type ConsoleLine } from "./ui";

type Handler = (payload: string) => void;

function createEmitter() {
  const handlers = new Map<string, Set<Handler>>();
  return {
    on(type: string, handler: Handler) {
      if (!handlers.has(type)) handlers.set(type, new Set());
      handlers.get(type)?.add(handler);
      return () => handlers.get(type)?.delete(handler);
    },
    emit(type: string, payload: string) {
      for (const handler of handlers.get(type) ?? []) handler(payload);
    },
  };
}

const TYPES = ["message", "cart:add", "logout"] as const;
type EventType = (typeof TYPES)[number];

interface Subscription {
  id: number;
  name: string;
  type: EventType;
  once: boolean;
  off: () => void;
}

const NAMES = ["Header", "Toast", "Analytics", "Cart badge", "Logger"];

export function EventEmitterDemo() {
  const emitter = useMemo(() => createEmitter(), []);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [log, setLog] = useState<ConsoleLine[]>([]);
  const [type, setType] = useState<EventType>("message");
  const [nextId, setNextId] = useState(1);
  const [flash, setFlash] = useState<number[]>([]);

  function subscribe(once: boolean) {
    const id = nextId;
    const name = NAMES[(id - 1) % NAMES.length];
    const off = emitter.on(type, (payload) => {
      setLog((current) => [...current, line(`${name} received "${type}": ${payload}`)]);
      setFlash((current) => [...current, id]);
      window.setTimeout(() => setFlash((current) => current.filter((other) => other !== id)), 500);
      if (once) {
        off();
        setSubscriptions((current) => current.filter((subscription) => subscription.id !== id));
      }
    });
    setNextId(id + 1);
    setSubscriptions((current) => [...current, { id, name, type, once, off }]);
  }

  function emit() {
    const listeners = subscriptions.filter((subscription) => subscription.type === type).length;
    setLog((current) => [...current, line(`emit("${type}") → ${listeners} listener${listeners === 1 ? "" : "s"}`, "accent")]);
    emitter.emit(type, type === "cart:add" ? "{ id: 42 }" : type === "message" ? '"hello"' : "{}");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented label="Event type" value={type} options={TYPES.map((value) => ({ value, label: value }))} onChange={setType} />
        <DemoButton onClick={() => subscribe(false)}>on(&quot;{type}&quot;)</DemoButton>
        <DemoButton onClick={() => subscribe(true)}>once(&quot;{type}&quot;)</DemoButton>
        <DemoButton tone="primary" onClick={emit}>
          emit(&quot;{type}&quot;)
        </DemoButton>
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title="Subscriptions by event type">
          <div className="flex flex-col gap-2">
            {TYPES.map((eventType) => {
              const subscribed = subscriptions.filter((subscription) => subscription.type === eventType);
              return (
                <div key={eventType} className="flex flex-wrap items-center gap-1.5">
                  <span className={cn("w-20 font-mono text-[11.5px]", eventType === type ? "text-flame" : "text-stone")}>{eventType}</span>
                  {subscribed.length === 0 ? <span className="text-slate font-mono text-[11px]">no listeners</span> : null}
                  {subscribed.map((subscription) => (
                    <button
                      key={subscription.id}
                      type="button"
                      onClick={() => {
                        subscription.off();
                        setSubscriptions((current) => current.filter((other) => other.id !== subscription.id));
                        setLog((current) => [...current, line(`${subscription.name} unsubscribed from "${eventType}"`, "dim")]);
                      }}
                      title="Unsubscribe"
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors",
                        flash.includes(subscription.id) ? "border-flame bg-flame text-ink" : "border-line-3 text-bone hover:border-rust-line",
                      )}
                    >
                      {subscription.name}
                      {subscription.once ? " (once)" : ""} ×
                    </button>
                  ))}
                </div>
              );
            })}
            <p className="text-slate m-0 mt-1 text-[11.5px]">
              Click a listener to call its <code className="prep-code">off()</code> function.
            </p>
          </div>
        </Panel>
        <DemoConsole lines={log} empty="Subscribe a listener, then emit." />
      </div>
    </div>
  );
}
