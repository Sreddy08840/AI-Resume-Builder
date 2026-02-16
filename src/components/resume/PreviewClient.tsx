"use client";

import { useResume } from "@/components/resume/ResumeStore";
import { TemplateTabs } from "@/components/resume/TemplateTabs";
import { useResumeTemplate } from "@/components/resume/useResumeTemplate";
import { ResumePreview } from "@/components/resume/ResumePreview";

export function PreviewClient() {
  const { data } = useResume();
  const { template, setTemplate } = useResumeTemplate();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold tracking-tight">Preview</div>
            <div className="mt-1 text-sm text-black/60">
              Clean, black + white, premium typography.
            </div>
          </div>
          <TemplateTabs value={template} onChange={setTemplate} />
        </div>
      </div>

      <div className="bg-white">
        <ResumePreview data={data} template={template} />
      </div>
    </div>
  );
}
