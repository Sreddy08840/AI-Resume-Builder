import type { ResumeData } from "@/lib/resumeTypes";

export type AtsResult = {
  score: number;
  suggestions: string[];
  band: {
    label: "Needs Work" | "Getting There" | "Strong Resume";
    color: "red" | "amber" | "green";
  };
  breakdown: {
    name: boolean;
    email: boolean;
    phone: boolean;
    summaryLong: boolean;
    summaryVerbs: boolean;
    experienceWithBullets: boolean;
    education: boolean;
    skills: boolean;
    project: boolean;
    linkedin: boolean;
    github: boolean;
  };
};

function skillsCountAny(skills: ResumeData["skills"]) {
  return (
    (skills?.technical?.length ?? 0) +
    (skills?.soft?.length ?? 0) +
    (skills?.tools?.length ?? 0)
  );
}

function hasExperienceWithBullets(data: ResumeData) {
  return data.experience.some((e) => {
    const t = (e.highlights ?? "").trim();
    if (!t) return false;
    const lines = t
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
    return lines.length >= 1;
  });
}

function summaryHasActionVerbs(summary: string) {
  const s = (summary ?? "").toLowerCase();
  const verbs = [
    "built",
    "led",
    "designed",
    "improved",
    "developed",
    "implemented",
    "created",
    "optimized",
    "automated",
    "launched",
    "delivered",
  ];
  return verbs.some((v) => s.includes(v));
}

function bandForScore(score: number) {
  if (score <= 40) return { label: "Needs Work" as const, color: "red" as const };
  if (score <= 70) return { label: "Getting There" as const, color: "amber" as const };
  return { label: "Strong Resume" as const, color: "green" as const };
}

export function computeAtsScoreV1(data: ResumeData): AtsResult {
  let score = 0;

  const nameOk = Boolean(data.personal.name.trim());
  if (nameOk) score += 10;

  const emailOk = Boolean(data.personal.email.trim());
  if (emailOk) score += 10;

  const summaryLongOk = (data.summary ?? "").trim().length > 50;
  if (summaryLongOk) score += 10;

  const experienceWithBulletsOk = hasExperienceWithBullets(data);
  if (experienceWithBulletsOk) score += 15;

  const educationOk = data.education.length >= 1;
  if (educationOk) score += 10;

  const skillsOk = skillsCountAny(data.skills) >= 5;
  if (skillsOk) score += 10;

  const projectOk = data.projects.length >= 1;
  if (projectOk) score += 10;

  const phoneOk = Boolean(data.personal.phone.trim());
  if (phoneOk) score += 5;

  const linkedinOk = Boolean(data.links.linkedin.trim());
  if (linkedinOk) score += 5;

  const githubOk = Boolean(data.links.github.trim());
  if (githubOk) score += 5;

  const summaryVerbsOk = summaryHasActionVerbs(data.summary ?? "");
  if (summaryVerbsOk) score += 10;

  score = Math.min(100, score);

  const suggestions: string[] = [];
  if (!nameOk) suggestions.push("Add your name (+10 points)");
  if (!emailOk) suggestions.push("Add your email (+10 points)");
  if (!summaryLongOk) suggestions.push("Add a professional summary (+10 points)");
  if (!experienceWithBulletsOk) suggestions.push("Add experience with bullet highlights (+15 points)");
  if (!educationOk) suggestions.push("Add education (+10 points)");
  if (!skillsOk) suggestions.push("Add at least 5 skills (+10 points)");
  if (!projectOk) suggestions.push("Add at least 1 project (+10 points)");
  if (!phoneOk) suggestions.push("Add your phone number (+5 points)");
  if (!linkedinOk) suggestions.push("Add your LinkedIn (+5 points)");
  if (!githubOk) suggestions.push("Add your GitHub (+5 points)");
  if (!summaryVerbsOk) suggestions.push("Use action verbs in summary (e.g., built, led, designed) (+10 points)");

  return {
    score,
    band: bandForScore(score),
    suggestions,
    breakdown: {
      name: nameOk,
      email: emailOk,
      phone: phoneOk,
      summaryLong: summaryLongOk,
      summaryVerbs: summaryVerbsOk,
      experienceWithBullets: experienceWithBulletsOk,
      education: educationOk,
      skills: skillsOk,
      project: projectOk,
      linkedin: linkedinOk,
      github: githubOk,
    },
  };
}
