import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={1}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Define the problem clearly. Do not skip steps.
      </div>
    </RbStepShell>
  );
}
