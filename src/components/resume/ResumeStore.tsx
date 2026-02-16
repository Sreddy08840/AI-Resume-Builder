"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EMPTY_RESUME, SAMPLE_RESUME, type ResumeData } from "@/lib/resumeTypes";

const STORAGE_KEY = "resumeBuilderData";

type ResumeStore = {
  data: ResumeData;
  setData: (next: ResumeData) => void;
  loadSample: () => void;
};

const ResumeContext = createContext<ResumeStore | null>(null);

function safeRead(): ResumeData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_RESUME;
    return JSON.parse(raw) as ResumeData;
  } catch {
    return EMPTY_RESUME;
  }
}

function safeWrite(data: ResumeData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    return;
  }
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(() => safeRead());

  const setData = useCallback((next: ResumeData) => {
    setDataState(next);
    safeWrite(next);
  }, []);

  const loadSample = useCallback(() => {
    setData(SAMPLE_RESUME);
  }, [setData]);

  const value = useMemo(() => ({ data, setData, loadSample }), [data, loadSample, setData]);

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
