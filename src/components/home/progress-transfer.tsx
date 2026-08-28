"use client";

/**
 * "Progress is kept in this browser only. Export it if you switch machines."
 *
 * Import merges rather than replaces, so restoring a backup on a machine that
 * has since done a few drills doesn't throw that work away.
 */
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useProgress } from "@/components/progress-provider";

export function ProgressTransfer() {
  const { exportJson, importJson, progress } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `strictmode-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${progress.seenQuestionIds.length} answered questions.`);
  };

  const upload = async (file: File) => {
    setBusy(true);
    try {
      importJson(await file.text());
      toast.success("Progress merged.");
    } catch {
      toast.error("That file didn't look like a StrictMode export.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="border-line-3 text-ash rounded-lg border border-dashed p-4 text-[12.5px]/[1.6]">
      Progress is kept in this browser only.{" "}
      <button
        type="button"
        onClick={download}
        className="text-clay underline underline-offset-2 hover:opacity-80"
      >
        Export it
      </button>{" "}
      if you switch machines, or{" "}
      <button
        type="button"
        disabled={busy}
        onClick={() => fileRef.current?.click()}
        className="text-clay underline underline-offset-2 hover:opacity-80 disabled:opacity-50"
      >
        import a backup
      </button>
      .
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
    </div>
  );
}
