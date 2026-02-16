import type { ResumeData } from "@/lib/resumeTypes";

type AtsResult = {
  score: number;
  suggestions: string[];
  breakdown: {
    summary: boolean;
    projects: boolean;
    experience: boolean;
    skills: boolean;
    links: boolean;
    numbers: boolean;
    educationComplete: boolean;
  };
};

function wordCount(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function skillsCount(skills: string) {
  return skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
}

function hasNumberImpact(text: string) {
  const t = text ?? "";
  return /\d/.test(t);
}

function educationHasCompleteFields(data: ResumeData) {
  return data.education.some((e) =>
    Boolean(
      e.school.trim() &&
        e.degree.trim() &&
        e.start.trim() &&
        e.end.trim() &&
        e.location.trim(),
    ),
  );
}

export function computeAtsScoreV1(data: ResumeData): AtsResult {
  let score = 0;

  const wc = wordCount(data.summary);
  const summaryOk = wc >= 40 && wc <= 120;
  if (summaryOk) score += 15;

  const projectsOk = data.projects.length >= 2;
  if (projectsOk) score += 10;

  const experienceOk = data.experience.length >= 1;
  if (experienceOk) score += 10;

  const skillsOk = skillsCount(data.skills) >= 8;
  if (skillsOk) score += 10;

  const linksOk = Boolean(data.links.github.trim() || data.links.linkedin.trim());
  if (linksOk) score += 10;

  const combinedBullets = [
    ...data.experience.map((x) => x.highlights ?? ""),
    ...data.projects.map((p) => p.description ?? ""),
  ].join("\n");
  const numbersOk = hasNumberImpact(combinedBullets);
  if (numbersOk) score += 15;

  const educationCompleteOk = educationHasCompleteFields(data);
  if (educationCompleteOk) score += 10;

  score = Math.min(100, score);

  const suggestions: string[] = [];
  if (!projectsOk) suggestions.push("Add at least 2 projects.");
  if (!experienceOk) suggestions.push("Add at least 1 experience entry.");
  if (!skillsOk) suggestions.push("Add more skills (target 8+).");
  if (!summaryOk) suggestions.push("Write a stronger summary (40–120 words).");
  if (!linksOk) suggestions.push("Add your GitHub or LinkedIn link.");
  if (!numbersOk) suggestions.push("Add measurable impact (numbers) in bullets.");
  if (!educationCompleteOk) suggestions.push("Complete education fields (school, degree, dates, location).");

  return {
    score,
    suggestions: suggestions.slice(0, 3),
    breakdown: {
      summary: summaryOk,
      projects: projectsOk,
      experience: experienceOk,
      skills: skillsOk,
      links: linksOk,
      numbers: numbersOk,
      educationComplete: educationCompleteOk,
    },
  };
}
