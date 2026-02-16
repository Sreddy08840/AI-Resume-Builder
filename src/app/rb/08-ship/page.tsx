import { RbStepShell } from "@/components/rb/RbStepShell";

export default function Page() {
  return (
    <RbStepShell stepIndex={8}>
      <div className="text-sm text-zinc-700 dark:text-zinc-200">
        Shipping step. After uploading the artifact, go to Proof.
      </div>
    </RbStepShell>
  );
}
