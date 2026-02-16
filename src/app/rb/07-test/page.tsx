import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={7}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Testing step. Upload the artifact to unlock Next.
      </div>
    </RbStepShell>
  );
}
