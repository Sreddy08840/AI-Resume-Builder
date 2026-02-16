"use client";

export function AccordionSection({
  title,
  children,
  defaultOpen,
  right,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <details
      className="rounded-2xl border border-black/10 bg-white"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4">
        <div className="text-sm font-semibold">{title}</div>
        <div className="flex items-center gap-3">
          {right}
          <span className="text-xs font-semibold text-black/40">▾</span>
        </div>
      </summary>
      <div className="px-6 pb-6">{children}</div>
    </details>
  );
}
