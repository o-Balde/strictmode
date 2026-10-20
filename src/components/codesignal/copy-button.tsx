"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copies the code in the surrounding <figure>. It reads the text from the
 * rendered <pre> instead of taking it as a prop, so a file shown on the page is
 * not shipped a second time in the payload just to be copyable.
 */
export function CopyButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy(button: HTMLButtonElement) {
    const text = button.closest("figure")?.querySelector("pre")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, denied permission): selecting by hand still works.
    }
  }

  return (
    <button
      type="button"
      onClick={(event) => void copy(event.currentTarget)}
      className="text-slate hover:text-bone inline-flex items-center gap-1 font-mono text-[11px] transition-colors"
    >
      {copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
