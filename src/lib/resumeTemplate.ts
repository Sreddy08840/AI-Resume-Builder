export type ResumeTemplate = "classic" | "modern" | "minimal";

export const RESUME_TEMPLATES: { key: ResumeTemplate; label: string }[] = [
  { key: "classic", label: "Classic" },
  { key: "modern", label: "Modern" },
  { key: "minimal", label: "Minimal" },
];

export const RESUME_TEMPLATE_STORAGE_KEY = "resumeBuilderTemplate";

export function normalizeTemplate(v: string | null): ResumeTemplate {
  if (v === "modern" || v === "minimal") return v;
  return "classic";
}
