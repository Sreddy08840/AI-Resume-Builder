import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={4}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        High-level design (HLD). Do not skip steps.
      </div>
    </RbStepShell>
  );
}
