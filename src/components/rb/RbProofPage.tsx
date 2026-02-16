"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { RB_STEPS } from "@/lib/rbSteps";
import {
  getRbArtifact,
  getRbStatus,
  getRbStorageVersion,
  subscribeRbStorage,
} from "@/lib/rbStorage";

function safeGet(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function RbProofPage() {
  const [lovableLink, setLovableLink] = useState(() => safeGet("rb_proof_lovable_link"));
  const [githubLink, setGithubLink] = useState(() => safeGet("rb_proof_github_link"));
  const [deployLink, setDeployLink] = useState(() => safeGet("rb_proof_deploy_link"));

  const storageVersion = useSyncExternalStore(
    subscribeRbStorage,
    getRbStorageVersion,
    () => "0",
  );

  const steps = useMemo(() => {
    return RB_STEPS.map((s) => {
      const artifact = getRbArtifact(s.index);
      const status = getRbStatus(s.index);
      return {
        ...s,
        done: Boolean(artifact && artifact.trim().length > 0),
        status,
      };
    });
  }, [storageVersion]);

  const allDone = steps.every((s) => s.done);

  const finalText = useMemo(() => {
    const lines: string[] = [];
    lines.push("Project 3 — AI Resume Builder — Build Track");
    lines.push("");
    lines.push(`Lovable: ${lovableLink || "(add link)"}`);
    lines.push(`GitHub: ${githubLink || "(add link)"}`);
    lines.push(`Deploy: ${deployLink || "(add link)"}`);
    lines.push("");
    lines.push("Step Status:");
    for (const s of steps) {
      lines.push(`- Step ${s.index}: ${s.done ? "DONE" : "PENDING"} (${s.status})`);
    }
    return lines.join("\n");
  }, [deployLink, githubLink, lovableLink, steps]);

  async function onCopyFinal() {
    await navigator.clipboard.writeText(finalText);
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold">AI Resume Builder</div>
          <div className="text-sm font-semibold">Project 3 — Proof</div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              allDone
                ? "bg-emerald-600 text-white"
                : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            }`}
          >
            {allDone ? "Ready" : "In progress"}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">8 Step Status</div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {steps.map((s) => (
              <div
                key={s.slug}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="text-sm font-semibold">
                  Step {s.index}: {s.title}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xs font-semibold ${
                      s.done ? "text-emerald-600" : "text-zinc-500 dark:text-zinc-300"
                    }`}
                  >
                    {s.done ? "DONE" : "PENDING"}
                  </div>
                  <Link
                    href={`/rb/${s.slug}`}
                    className="text-xs font-semibold underline underline-offset-4"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">Links</div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Lovable link
              </label>
              <input
                value={lovableLink}
                onChange={(e) => {
                  setLovableLink(e.target.value);
                  safeSet("rb_proof_lovable_link", e.target.value);
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                GitHub link
              </label>
              <input
                value={githubLink}
                onChange={(e) => {
                  setGithubLink(e.target.value);
                  safeSet("rb_proof_github_link", e.target.value);
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Deploy link
              </label>
              <input
                value={deployLink}
                onChange={(e) => {
                  setDeployLink(e.target.value);
                  safeSet("rb_proof_deploy_link", e.target.value);
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">Final Submission</div>
          <textarea
            className="mt-3 h-48 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-900"
            readOnly
            value={finalText}
          />
          <button
            type="button"
            onClick={onCopyFinal}
            className="mt-3 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Copy Final Submission
          </button>
        </div>
      </div>
    </div>
  );
}
