"use client";

import { ACCENT_THEMES, type AccentThemeKey } from "@/lib/accentTheme";

export function ColorThemePicker({
  value,
  onChange,
}: {
  value: AccentThemeKey;
  onChange: (k: AccentThemeKey) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {ACCENT_THEMES.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`h-8 w-8 rounded-full border ${
              active ? "border-blue-600" : "border-black/10"
            }`}
            style={{ background: t.hsl }}
            aria-label={t.label}
            title={t.label}
          />
        );
      })}
    </div>
  );
}
