"use client";

import { RESUME_TEMPLATES, type ResumeTemplate } from "@/lib/resumeTemplate";

export function TemplateTabs({
  value,
  onChange,
}: {
  value: ResumeTemplate;
  onChange: (t: ResumeTemplate) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-black/10 bg-white p-1">
      {RESUME_TEMPLATES.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              active ? "bg-black text-white" : "text-black/70 hover:bg-black/5"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
