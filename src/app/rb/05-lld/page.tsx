import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={5}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Low-level design (LLD). Do not skip steps.
      </div>
    </RbStepShell>
  );
}
