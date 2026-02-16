import type { RbStepStatus } from "@/lib/rbStorage";

export function StatusBadge({ status }: { status: RbStepStatus }) {
  const styles =
    status === "worked"
      ? "bg-emerald-600 text-white"
      : status === "error"
        ? "bg-rose-600 text-white"
        : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";

  const label =
    status === "worked" ? "Worked" : status === "error" ? "Error" : "In progress";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}
