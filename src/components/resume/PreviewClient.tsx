"use client";

import { useMemo, useState } from "react";
import { useResume } from "@/components/resume/ResumeStore";
import { TemplateTabs } from "@/components/resume/TemplateTabs";
import { useResumeTemplate } from "@/components/resume/useResumeTemplate";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { resumeToPlainText } from "@/lib/resumeTextExport";

export function PreviewClient() {
  const { data } = useResume();
  const { template, setTemplate } = useResumeTemplate();

  const [copied, setCopied] = useState(false);

  const exportWarning = useMemo(() => {
    const missingName = !data.personal.name.trim();
    const missingWork = data.projects.length < 1 && data.experience.length < 1;
    if (missingName || missingWork) return "Your resume may look incomplete.";
    return "";
  }, [data.experience.length, data.personal.name, data.projects.length]);

  async function onCopyText() {
    const txt = resumeToPlainText(data);
    await navigator.clipboard.writeText(txt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

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
          <div className="print-hide flex items-center gap-3">
            <TemplateTabs value={template} onChange={setTemplate} />
          </div>
        </div>
      </div>

      <div className="print-hide mb-6 rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Export</div>
            {exportWarning ? (
              <div className="mt-1 text-sm text-black/60">{exportWarning}</div>
            ) : (
              <div className="mt-1 text-sm text-black/60">Ready to export.</div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={() => void onCopyText()}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              {copied ? "Copied" : "Copy Resume as Text"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <ResumePreview data={data} template={template} />
      </div>
    </div>
  );
}
