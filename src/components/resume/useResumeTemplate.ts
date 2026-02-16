"use client";

import { useCallback, useState } from "react";
import {
  normalizeTemplate,
  RESUME_TEMPLATE_STORAGE_KEY,
  type ResumeTemplate,
} from "@/lib/resumeTemplate";

function safeGet() {
  try {
    return window.localStorage.getItem(RESUME_TEMPLATE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeSet(value: string) {
  try {
    window.localStorage.setItem(RESUME_TEMPLATE_STORAGE_KEY, value);
  } catch {
    return;
  }
}

export function useResumeTemplate() {
  const [template, setTemplateState] = useState<ResumeTemplate>(() => normalizeTemplate(safeGet()));

  const setTemplate = useCallback((next: ResumeTemplate) => {
    setTemplateState(next);
    safeSet(next);
  }, []);

  return { template, setTemplate };
}
