import type { ResumeData } from "@/lib/resumeTypes";

function line(v: string) {
  return (v ?? "").trim();
}

export function resumeToPlainText(data: ResumeData) {
  const out: string[] = [];

  const name = line(data.personal.name);
  const contact = [line(data.personal.email), line(data.personal.phone), line(data.personal.location)]
    .filter(Boolean)
    .join(" | ");

  if (name) out.push(name);
  if (contact) out.push(contact);

  const links = [line(data.links.github), line(data.links.linkedin)].filter(Boolean).join(" | ");
  if (links) out.push(links);

  function section(title: string, bodyLines: string[]) {
    const clean = bodyLines.map((l) => l.trim()).filter(Boolean);
    if (clean.length === 0) return;
    out.push("");
    out.push(title);
    out.push(...clean);
  }

  section(
    "Summary",
    line(data.summary)
      ? [line(data.summary)]
      : [],
  );

  section(
    "Education",
    data.education.map((e) => {
      const left = [line(e.school), line(e.degree)].filter(Boolean).join(" — ");
      const right = [line(e.start), line(e.end), line(e.location)].filter(Boolean).join(" | ");
      return [left, right].filter(Boolean).join(" | ");
    }),
  );

  section(
    "Experience",
    data.experience.flatMap((x) => {
      const head = [line(x.company), line(x.role)].filter(Boolean).join(" — ");
      const meta = [line(x.start), line(x.end), line(x.location)].filter(Boolean).join(" | ");
      const bullets = (x.highlights ?? "")
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean)
        .map((b) => `- ${b}`);
      const lines = [head, meta].filter(Boolean);
      return [...lines, ...bullets, ""];
    }),
  );

  section(
    "Projects",
    data.projects.flatMap((p) => {
      const head = [line(p.title), p.techStack?.length ? p.techStack.join(", ") : ""]
        .filter(Boolean)
        .join(" — ");
      const link = [line(p.liveUrl), line(p.githubUrl)].filter(Boolean).join(" | ");
      const bullets = (p.description ?? "")
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean)
        .map((b) => `- ${b}`);
      const lines = [head, link].filter(Boolean);
      return [...lines, ...bullets, ""];
    }),
  );

  const tech = data.skills.technical ?? [];
  const soft = data.skills.soft ?? [];
  const tools = data.skills.tools ?? [];

  section(
    "Skills",
    [
      tech.length ? `Technical Skills: ${tech.join(", ")}` : "",
      soft.length ? `Soft Skills: ${soft.join(", ")}` : "",
      tools.length ? `Tools & Technologies: ${tools.join(", ")}` : "",
    ].filter(Boolean),
  );

  section("Links", links ? [links] : []);

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
