"use client";

import type { ResumeTemplate } from "@/lib/resumeTemplate";

function Check() {
  return (
    <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
      ✓
    </div>
  );
}

function ThumbClassic() {
  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="h-2 w-3/4 rounded bg-black/20" />
      <div className="h-px w-full bg-black/15" />
      <div className="h-2 w-full rounded bg-black/10" />
      <div className="h-px w-full bg-black/10" />
      <div className="h-2 w-5/6 rounded bg-black/10" />
      <div className="h-px w-full bg-black/10" />
      <div className="h-2 w-2/3 rounded bg-black/10" />
    </div>
  );
}

function ThumbModern() {
  return (
    <div className="flex h-full">
      <div className="h-full w-1/3 bg-black/15" />
      <div className="flex h-full w-2/3 flex-col gap-2 p-2">
        <div className="h-2 w-3/4 rounded bg-black/20" />
        <div className="h-2 w-full rounded bg-black/10" />
        <div className="h-2 w-5/6 rounded bg-black/10" />
        <div className="h-2 w-2/3 rounded bg-black/10" />
      </div>
    </div>
  );
}

function ThumbMinimal() {
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="h-2 w-2/3 rounded bg-black/20" />
      <div className="h-2 w-full rounded bg-black/10" />
      <div className="h-2 w-5/6 rounded bg-black/10" />
      <div className="h-2 w-3/4 rounded bg-black/10" />
    </div>
  );
}

export function TemplateThumbnailPicker({
  value,
  onChange,
}: {
  value: ResumeTemplate;
  onChange: (t: ResumeTemplate) => void;
}) {
  const items: { key: ResumeTemplate; label: string; thumb: React.ReactNode }[] = [
    { key: "classic", label: "Classic", thumb: <ThumbClassic /> },
    { key: "modern", label: "Modern", thumb: <ThumbModern /> },
    { key: "minimal", label: "Minimal", thumb: <ThumbMinimal /> },
  ];

  return (
    <div className="flex items-start gap-3">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={`relative w-[120px] overflow-hidden rounded-2xl border bg-white text-left transition ${
              active ? "border-blue-600" : "border-black/10 hover:border-black/20"
            }`}
          >
            {active ? <Check /> : null}
            <div className="h-20">{it.thumb}</div>
            <div className="border-t border-black/10 px-3 py-2">
              <div className="text-xs font-semibold text-black/80">{it.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
