"use client";

export type RbStepStatus = "idle" | "worked" | "error";

export const RB_STORAGE_EVENT = "rb_storage_updated";
const RB_STORAGE_VERSION_KEY = "rb_storage_version";

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
