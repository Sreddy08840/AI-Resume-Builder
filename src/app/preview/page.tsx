import { AppShell } from "@/components/AppShell";
import { ResumeProvider } from "@/components/resume/ResumeStore";
import { PreviewClient } from "@/components/resume/PreviewClient";

export default function Page() {
  return (
    <AppShell>
      <ResumeProvider>
        <PreviewClient />
      </ResumeProvider>
    </AppShell>
  );
}
