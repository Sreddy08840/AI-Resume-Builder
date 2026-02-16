import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={3}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Architecture planning. Do not skip steps.
      </div>
    </RbStepShell>
  );
}
