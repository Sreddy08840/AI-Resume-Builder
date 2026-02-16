"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RB_STEPS } from "@/lib/rbSteps";
import {
  getRbArtifact,
  getRbStatus,
  getRbStorageVersion,
  rbChecklistPassed,
  rbIsShipped,
  subscribeRbStorage,
} from "@/lib/rbStorage";
import { StatusBadge } from "@/components/rb/StatusBadge";
import { BuildPanel } from "@/components/rb/BuildPanel";

export function RbStepShell({
  stepIndex,
  children,
}: {
  stepIndex: number;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const storageVersion = useSyncExternalStore(
    subscribeRbStorage,
    getRbStorageVersion,
    () => "0",
  );

  const artifact = getRbArtifact(stepIndex) ?? "";
  const status = getRbStatus(stepIndex);
  const shipped = rbIsShipped();

  const step = RB_STEPS.find((s) => s.index === stepIndex);

  const firstIncomplete = useMemo(() => {
    for (const s of RB_STEPS) {
      const a = getRbArtifact(s.index);
      if (!a || a.trim().length === 0) return s.index;
    }
    return RB_STEPS.length + 1;
  }, [storageVersion]);

  useEffect(() => {
    if (stepIndex > firstIncomplete) {
      const target = RB_STEPS.find((s) => s.index === firstIncomplete);
      if (target) router.replace(`/rb/${target.slug}`);
    }
  }, [firstIncomplete, router, stepIndex]);

  const nextStep = RB_STEPS.find((s) => s.index === stepIndex + 1);
  const prevStep = RB_STEPS.find((s) => s.index === stepIndex - 1);

  const canNext =
    artifact.trim().length > 0 &&
    (stepIndex === 7 ? rbChecklistPassed() : true);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold">AI Resume Builder</div>
          <div className="text-sm font-semibold">
            Project 3 — Step {stepIndex} of 8
          </div>
          <StatusBadge status={status} shipped={shipped} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Context
          </div>
          <div className="mt-1 text-lg font-semibold">{step ? step.title : "Step"}</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Follow the steps in order. Upload the artifact in the build panel to unlock Next.
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-10">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              {children}

              <div className="mt-8 flex items-center justify-between gap-3">
                {prevStep ? (
                  <Link
                    href={`/rb/${prevStep.slug}`}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    Back
                  </Link>
                ) : (
                  <div />
                )}

                {nextStep ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => router.push(`/rb/${nextStep.slug}`)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      canNext
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <Link
                    href="/rb/proof"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      canNext
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                        : "pointer-events-none bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    Go to Proof
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <BuildPanel stepIndex={stepIndex} />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Proof Footer</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Complete all 8 steps in order, then submit via the proof page.
          </div>
          <div className="mt-3">
            <Link
              href="/rb/proof"
              className="text-sm font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
            >
              Open /rb/proof
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
