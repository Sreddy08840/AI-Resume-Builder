"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { RB_STEPS } from "@/lib/rbSteps";
import {
  getRbArtifact,
  getRbFinalSubmission,
  getRbStatus,
  getRbStorageVersion,
  rbChecklistPassed,
  rbHasAllProofLinks,
  rbIsShipped,
  rbIsValidHttpUrl,
  setRbFinalSubmission,
  subscribeRbStorage,
} from "@/lib/rbStorage";

function labelUrlError(v: string) {
  if (!v.trim()) return "Required";
  if (!rbIsValidHttpUrl(v)) return "Enter a valid URL (http/https)";
  return "";
}

export function RbProofPage() {
  const initial = useMemo(() => getRbFinalSubmission(), []);
  const [lovableLink, setLovableLink] = useState(() => initial.lovableProject);
  const [githubLink, setGithubLink] = useState(() => initial.githubRepository);
  const [deployLink, setDeployLink] = useState(() => initial.liveDeployment);

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

  const allStepsDone = steps.every((s) => s.done);
  const checklistPassed = rbChecklistPassed();
  const proofLinksOk = rbHasAllProofLinks();
  const shipped = rbIsShipped();

  const lovableError = labelUrlError(lovableLink);
  const githubError = labelUrlError(githubLink);
  const deployError = labelUrlError(deployLink);

  const finalText = useMemo(() => {
    const lines: string[] = [];
    lines.push("------------------------------------------");
    lines.push("AI Resume Builder — Final Submission");
    lines.push("");
    lines.push(`Lovable Project: ${lovableLink || ""}`);
    lines.push(`GitHub Repository: ${githubLink || ""}`);
    lines.push(`Live Deployment: ${deployLink || ""}`);
    lines.push("");
    lines.push("Core Capabilities:");
    lines.push("- Structured resume builder");
    lines.push("- Deterministic ATS scoring");
    lines.push("- Template switching");
    lines.push("- PDF export with clean formatting");
    lines.push("- Persistence + validation checklist");
    lines.push("------------------------------------------");
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
              shipped
                ? "bg-emerald-600 text-white"
                : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            }`}
          >
            {shipped ? "Shipped" : "In Progress"}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {shipped ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
            <div className="text-lg font-semibold">Project 3 Shipped Successfully.</div>
            <div className="mt-2 text-sm opacity-90">
              All steps, checklist tests, and submission links are complete.
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">Step Completion Overview</div>
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

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                allStepsDone
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200"
                  : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              }`}
            >
              {allStepsDone ? "All 8 steps completed" : "Steps incomplete"}
            </div>
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                checklistPassed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200"
                  : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              }`}
            >
              {checklistPassed ? "All 10 tests passed" : "Checklist incomplete"}
            </div>
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                proofLinksOk
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200"
                  : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              }`}
            >
              {proofLinksOk ? "All proof links provided" : "Proof links missing"}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-lg font-semibold">Artifact Collection (Required to mark Shipped)</div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Lovable Project Link
              </label>
              <input
                value={lovableLink}
                onChange={(e) => {
                  setLovableLink(e.target.value);
                  setRbFinalSubmission({
                    lovableProject: e.target.value,
                    githubRepository: githubLink,
                    liveDeployment: deployLink,
                  });
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://..."
              />
              {lovableError ? (
                <div className="mt-2 text-xs font-semibold text-rose-600">{lovableError}</div>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                GitHub Repository Link
              </label>
              <input
                value={githubLink}
                onChange={(e) => {
                  setGithubLink(e.target.value);
                  setRbFinalSubmission({
                    lovableProject: lovableLink,
                    githubRepository: e.target.value,
                    liveDeployment: deployLink,
                  });
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://github.com/..."
              />
              {githubError ? (
                <div className="mt-2 text-xs font-semibold text-rose-600">{githubError}</div>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Deployed URL
              </label>
              <input
                value={deployLink}
                onChange={(e) => {
                  setDeployLink(e.target.value);
                  setRbFinalSubmission({
                    lovableProject: lovableLink,
                    githubRepository: githubLink,
                    liveDeployment: e.target.value,
                  });
                }}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-100/10"
                placeholder="https://..."
              />
              {deployError ? (
                <div className="mt-2 text-xs font-semibold text-rose-600">{deployError}</div>
              ) : null}
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
