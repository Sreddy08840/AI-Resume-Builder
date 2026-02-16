"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getRbStorageVersion,
  getRbTestChecklist,
  rbChecklistPassed,
  setRbTestChecklist,
  subscribeRbStorage,
} from "@/lib/rbStorage";

const ITEMS: string[] = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page",
];

export function RbTestChecklistPanel() {
  const storageVersion = useSyncExternalStore(
    subscribeRbStorage,
    getRbStorageVersion,
    () => "0",
  );

  const checklist = useMemo(() => getRbTestChecklist(), [storageVersion]);
  const passed = rbChecklistPassed();

  return (
    <div>
      <div className="text-lg font-semibold">Test Checklist (10)</div>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Check every item after verifying in the app. This checklist is required to unlock Next.
      </div>

      <div className="mt-5 space-y-3">
        {ITEMS.map((label, idx) => {
          const checked = Boolean(checklist.items[idx]);
          return (
            <label
              key={label}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {label}
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                  const next = [...checklist.items];
                  next[idx] = e.target.checked;
                  setRbTestChecklist({ items: next });
                }}
                className="mt-0.5 h-4 w-4"
              />
            </label>
          );
        })}
      </div>

      <div
        className={`mt-6 rounded-xl border px-4 py-3 text-sm font-semibold ${
          passed
            ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200"
            : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
        }`}
      >
        {passed ? "All 10 checklist tests passed." : "Complete all 10 checklist items to proceed."}
      </div>
    </div>
  );
}
