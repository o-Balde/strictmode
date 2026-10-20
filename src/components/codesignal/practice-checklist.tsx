"use client";

import { useSyncExternalStore } from "react";
import type { Checklist } from "@data";
import { PrepText } from "@components";
import { cn, codesignalStore as store, toggleChecklistItem } from "@lib";

export interface PracticeChecklistProps {
  list: Checklist;
}

/** A checklist that remembers what was ticked, per browser. */
export function PracticeChecklist({ list }: Readonly<PracticeChecklistProps>) {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const checked = state.checked[list.id] ?? [];

  return (
    <div className="border-line-2 bg-surface-2 rounded-[9px] border p-4.5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-paper m-0 text-[14.5px] font-semibold">{list.title}</h3>
        <span className="text-slate font-mono text-[11px] tabular-nums">
          {checked.length}/{list.items.length}
        </span>
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {list.items.map((item, index) => {
          const done = checked.includes(index);
          return (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px]/[1.55]">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => store.update((current) => toggleChecklistItem(current, list.id, index))}
                  className="accent-flame mt-1 size-3.5 shrink-0"
                />
                <span className={cn("text-pretty", done ? "text-slate line-through" : "text-bone")}>
                  <PrepText text={item} />
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
