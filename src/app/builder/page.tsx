import { AppShell } from "@/components/AppShell";
import { ResumeProvider } from "@/components/resume/ResumeStore";
import { BuilderClient } from "@/components/resume/BuilderClient";

export default function Page() {
  return (
    <AppShell>
      <ResumeProvider>
        <BuilderClient />
      </ResumeProvider>
    </AppShell>
  );
}
