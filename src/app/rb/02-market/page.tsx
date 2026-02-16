import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={2}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Market research and positioning for the build track. Do not skip steps.
      </div>
    </RbStepShell>
  );
}
