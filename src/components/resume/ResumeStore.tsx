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
    const parsed: unknown = JSON.parse(raw);

    const obj = (parsed && typeof parsed === "object" ? parsed : null) as Record<string, unknown> | null;

    const skillsRaw = obj?.skills;
    const skillsIsString = typeof skillsRaw === "string";
    const skillsIsObject =
      skillsRaw &&
      typeof skillsRaw === "object" &&
      Array.isArray((skillsRaw as Record<string, unknown>).technical) &&
      Array.isArray((skillsRaw as Record<string, unknown>).soft) &&
      Array.isArray((skillsRaw as Record<string, unknown>).tools);

    const migratedSkills = skillsIsObject
      ? (skillsRaw as ResumeData["skills"])
      : skillsIsString
        ? {
            technical: String(skillsRaw)
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean),
            soft: [],
            tools: [],
          }
        : EMPTY_RESUME.skills;

    const projectsRaw = obj?.projects;
    const migratedProjects = Array.isArray(projectsRaw)
      ? projectsRaw.map((p: unknown) => {
          const pObj = (p && typeof p === "object" ? p : null) as Record<string, unknown> | null;
          const hasNew =
            typeof pObj?.title === "string" && Array.isArray(pObj?.techStack);
          if (hasNew) return pObj as ResumeData["projects"][number];
          return {
            title: String(pObj?.name ?? ""),
            description: String(pObj?.description ?? ""),
            techStack: String(pObj?.tech ?? "")
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean),
            liveUrl: String(pObj?.link ?? ""),
            githubUrl: "",
          };
        })
      : [];

    const migrated: ResumeData = {
      ...EMPTY_RESUME,
      ...(obj as Partial<ResumeData>),
      skills: migratedSkills,
      projects: migratedProjects,
    };

    return migrated;
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
