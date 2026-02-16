export type AccentThemeKey = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

export const ACCENT_THEMES: { key: AccentThemeKey; label: string; hsl: string }[] = [
  { key: "teal", label: "Teal", hsl: "hsl(168, 60%, 40%)" },
  { key: "navy", label: "Navy", hsl: "hsl(220, 60%, 35%)" },
  { key: "burgundy", label: "Burgundy", hsl: "hsl(345, 60%, 35%)" },
  { key: "forest", label: "Forest", hsl: "hsl(150, 50%, 30%)" },
  { key: "charcoal", label: "Charcoal", hsl: "hsl(0, 0%, 25%)" },
];

export const ACCENT_STORAGE_KEY = "resumeBuilderAccentColor";

export function normalizeAccent(v: string | null): AccentThemeKey {
  if (v === "navy" || v === "burgundy" || v === "forest" || v === "charcoal") return v;
  return "teal";
}

export function accentToHsl(key: AccentThemeKey) {
  return ACCENT_THEMES.find((t) => t.key === key)?.hsl ?? ACCENT_THEMES[0].hsl;
}
