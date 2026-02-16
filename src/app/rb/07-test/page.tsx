import { RbStepShell } from "@/components/rb/RbStepShell";
import { RbTestChecklistPanel } from "@/components/rb/RbTestChecklistPanel";

export default function Page() {
  return (
    <RbStepShell stepIndex={7}>
      <RbTestChecklistPanel />
    </RbStepShell>
  );
}
