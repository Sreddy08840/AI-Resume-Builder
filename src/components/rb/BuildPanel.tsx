"use client";

import { useMemo, useState } from "react";
import {
  fileToDataUrl,
  getRbArtifact,
  getRbStatus,
  setRbArtifact,
  setRbStatus,
  type RbStepStatus,
} from "@/lib/rbStorage";

export function BuildPanel({ stepIndex }: { stepIndex: number }) {
  const [artifact, setArtifactState] = useState<string>(() => getRbArtifact(stepIndex) ?? "");
  const [status, setStatusState] = useState<RbStepStatus>(() => getRbStatus(stepIndex));

  const copyText = useMemo(() => {
    return `Project 3 — AI Resume Builder (Build Track)\nStep ${stepIndex} artifact request\n\nPaste your work output or attach screenshot below.`;
  }, [stepIndex]);

  const canGoNext = artifact.trim().length > 0;

  async function onPickFile(file: File) {
    const dataUrl = await fileToDataUrl(file);
    setRbArtifact(stepIndex, dataUrl);
    setArtifactState(dataUrl);
  }

  function onSetStatus(next: RbStepStatus) {
    setRbStatus(stepIndex, next);
    setStatusState(next);
  }

  async function onCopy() {
    await navigator.clipboard.writeText(copyText);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-sm font-semibold">Copy This Into Lovable</div>
        <textarea
          className="mt-2 h-40 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
          value={copyText}
          readOnly
        />
        <button
          type="button"
          onClick={onCopy}
          className="mt-3 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Copy
        </button>
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noreferrer"
          className="mt-3 block w-full rounded-lg border border-zinc-200 px-3 py-2 text-center text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          Build in Lovable
        </a>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-sm font-semibold">It Worked / Error / Add Screenshot</div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSetStatus("worked")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              status === "worked"
                ? "bg-emerald-600 text-white"
                : "border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            }`}
          >
            It Worked
          </button>
          <button
            type="button"
            onClick={() => onSetStatus("error")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              status === "error"
                ? "bg-rose-600 text-white"
                : "border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            }`}
          >
            Error
          </button>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            Upload artifact (required to unlock Next)
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onPickFile(file);
            }}
          />

          <div className="mt-3 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            {canGoNext ? "Artifact uploaded." : "No artifact uploaded yet."}
          </div>

          {artifact.startsWith("data:image") ? (
            <img
              src={artifact}
              alt="Artifact preview"
              className="mt-3 max-h-48 w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-800"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
