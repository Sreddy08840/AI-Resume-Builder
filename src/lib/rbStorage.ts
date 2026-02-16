"use client";

export type RbStepStatus = "idle" | "worked" | "error";

export const RB_STORAGE_EVENT = "rb_storage_updated";
const RB_STORAGE_VERSION_KEY = "rb_storage_version";

export const RB_FINAL_SUBMISSION_KEY = "rb_final_submission";
export const RB_TEST_CHECKLIST_KEY = "rb_test_checklist";

function safeGet(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
    window.localStorage.setItem(RB_STORAGE_VERSION_KEY, String(Date.now()));
    window.dispatchEvent(new Event(RB_STORAGE_EVENT));
  } catch {
    return;
  }
}

export type RbFinalSubmission = {
  lovableProject: string;
  githubRepository: string;
  liveDeployment: string;
};

export type RbTestChecklist = {
  items: boolean[]; // length 10
};

export function getRbFinalSubmission(): RbFinalSubmission {
  try {
    const raw = safeGet(RB_FINAL_SUBMISSION_KEY);
    if (!raw) return { lovableProject: "", githubRepository: "", liveDeployment: "" };
    const parsed = JSON.parse(raw) as Partial<RbFinalSubmission>;
    return {
      lovableProject: String(parsed.lovableProject ?? ""),
      githubRepository: String(parsed.githubRepository ?? ""),
      liveDeployment: String(parsed.liveDeployment ?? ""),
    };
  } catch {
    return { lovableProject: "", githubRepository: "", liveDeployment: "" };
  }
}

export function setRbFinalSubmission(next: RbFinalSubmission) {
  safeSet(RB_FINAL_SUBMISSION_KEY, JSON.stringify(next));
}

export function getRbTestChecklist(): RbTestChecklist {
  try {
    const raw = safeGet(RB_TEST_CHECKLIST_KEY);
    if (!raw) return { items: Array.from({ length: 10 }, () => false) };
    const parsed = JSON.parse(raw) as Partial<RbTestChecklist>;
    const arr = Array.isArray(parsed.items) ? parsed.items : [];
    const normalized = Array.from({ length: 10 }, (_, i) => Boolean(arr[i]));
    return { items: normalized };
  } catch {
    return { items: Array.from({ length: 10 }, () => false) };
  }
}

export function setRbTestChecklist(next: RbTestChecklist) {
  safeSet(RB_TEST_CHECKLIST_KEY, JSON.stringify(next));
}

export function rbIsValidHttpUrl(raw: string) {
  const v = (raw ?? "").trim();
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function rbChecklistPassed() {
  const c = getRbTestChecklist();
  return c.items.length === 10 && c.items.every(Boolean);
}

export function rbAllStepsDone(stepCount: number) {
  for (let i = 1; i <= stepCount; i++) {
    const a = getRbArtifact(i);
    if (!a || a.trim().length === 0) return false;
  }
  return true;
}

export function rbHasAllProofLinks() {
  const s = getRbFinalSubmission();
  return (
    rbIsValidHttpUrl(s.lovableProject) &&
    rbIsValidHttpUrl(s.githubRepository) &&
    rbIsValidHttpUrl(s.liveDeployment)
  );
}

export function rbIsShipped() {
  return rbAllStepsDone(8) && rbChecklistPassed() && rbHasAllProofLinks();
}

export function subscribeRbStorage(callback: () => void) {
  window.addEventListener(RB_STORAGE_EVENT, callback);
  return () => window.removeEventListener(RB_STORAGE_EVENT, callback);
}

export function getRbStorageVersion() {
  return safeGet(RB_STORAGE_VERSION_KEY) ?? "0";
}

export function rbArtifactKey(stepIndex: number) {
  return `rb_step_${stepIndex}_artifact`;
}

export function rbStatusKey(stepIndex: number) {
  return `rb_step_${stepIndex}_status`;
}

export function getRbArtifact(stepIndex: number) {
  return safeGet(rbArtifactKey(stepIndex));
}

export function setRbArtifact(stepIndex: number, artifact: string) {
  safeSet(rbArtifactKey(stepIndex), artifact);
}

export function getRbStatus(stepIndex: number): RbStepStatus {
  const v = safeGet(rbStatusKey(stepIndex));
  if (v === "worked" || v === "error") return v;
  return "idle";
}

export function setRbStatus(stepIndex: number, status: RbStepStatus) {
  safeSet(rbStatusKey(stepIndex), status);
}

export async function fileToDataUrl(file: File) {
  const reader = new FileReader();
  const p = new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
  });
  reader.readAsDataURL(file);
  return p;
}
