"use client";

import { useCallback, useState } from "react";
import { ACCENT_STORAGE_KEY, normalizeAccent, type AccentThemeKey } from "@/lib/accentTheme";

function safeGet() {
  try {
    return window.localStorage.getItem(ACCENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeSet(value: string) {
  try {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, value);
  } catch {
    return;
  }
}

export function useResumeAccent() {
  const [accent, setAccentState] = useState<AccentThemeKey>(() => normalizeAccent(safeGet()));

  const setAccent = useCallback((next: AccentThemeKey) => {
    setAccentState(next);
    safeSet(next);
  }, []);

  return { accent, setAccent };
}
