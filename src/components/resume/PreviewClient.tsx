"use client";

import { useMemo, useState } from "react";
import { useResume } from "@/components/resume/ResumeStore";
import { useResumeTemplate } from "@/components/resume/useResumeTemplate";
import { useResumeAccent } from "@/components/resume/useResumeAccent";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { resumeToPlainText } from "@/lib/resumeTextExport";
import { TemplateThumbnailPicker } from "@/components/resume/TemplateThumbnailPicker";
import { ColorThemePicker } from "@/components/resume/ColorThemePicker";
import { computeAtsScoreV1 } from "@/lib/atsScore";
import { AtsScoreCircle } from "@/components/resume/AtsScoreCircle";

export function PreviewClient() {
  const { data } = useResume();
  const { template, setTemplate } = useResumeTemplate();
  const { accent, setAccent } = useResumeAccent();

  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  const ats = useMemo(() => computeAtsScoreV1(data), [data]);

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
        </div>
      </div>

      <div className="print-hide mb-6 rounded-2xl border border-black/10 bg-white p-4">
        <AtsScoreCircle result={ats} />

        {ats.suggestions.length ? (
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-black/60">Improvements</div>
            <div className="mt-2 space-y-2">
              {ats.suggestions.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-black/70">Strong resume. Keep polishing formatting and clarity.</div>
        )}
      </div>

      <div className="print-hide mb-6 rounded-2xl border border-black/10 bg-white p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-black/60">Template</div>
        <div className="mt-3">
          <TemplateThumbnailPicker value={template} onChange={setTemplate} />
        </div>

        <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-black/60">Accent Color</div>
        <div className="mt-3">
          <ColorThemePicker value={accent} onChange={setAccent} />
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
              onClick={() => {
                window.print();
                setToast(true);
                window.setTimeout(() => setToast(false), 2000);
              }}
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

      {toast ? (
        <div className="print-hide mb-6 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80">
          PDF export ready! Check your downloads.
        </div>
      ) : null}

      <div className="bg-white">
        <ResumePreview data={data} template={template} accent={accent} />
      </div>
    </div>
  );
}
