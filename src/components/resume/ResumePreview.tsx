import type { ResumeData } from "@/lib/resumeTypes";
import type { ResumeTemplate } from "@/lib/resumeTemplate";

export function ResumePreview({
  data,
  template = "classic",
}: {
  data: ResumeData;
  template?: ResumeTemplate;
}) {
  const skills = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const hasLinks = Boolean(data.links.github.trim() || data.links.linkedin.trim());
  const showSummary = Boolean(data.summary.trim());
  const showEducation = data.education.some((e) => e.school.trim() || e.degree.trim());
  const showExperience = data.experience.some((x) => x.company.trim() || x.role.trim() || x.highlights.trim());
  const showProjects = data.projects.some((p) => p.name.trim() || p.description.trim());
  const showSkills = skills.length > 0;

  const wrapClass =
    template === "modern"
      ? "rounded-2xl border border-black/10 bg-white p-10"
      : template === "minimal"
        ? "rounded-2xl border border-black/10 bg-white p-7"
        : "rounded-2xl border border-black/10 bg-white p-8";

  const nameClass =
    template === "modern"
      ? "text-3xl font-semibold tracking-tight"
      : template === "minimal"
        ? "text-2xl font-semibold tracking-tight"
        : "text-2xl font-semibold tracking-tight";

  const sectionHeaderClass =
    template === "modern"
      ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60"
      : template === "minimal"
        ? "text-[11px] font-semibold uppercase tracking-wider text-black/60"
        : "text-xs font-semibold uppercase tracking-wider text-black/60";

  return (
    <div className={wrapClass}>
      <div className="flex flex-col gap-1">
        <div className={nameClass}>
          {data.personal.name || "Your Name"}
        </div>
        <div className="text-sm text-black/70">
          {(data.personal.email || "email") + " · " + (data.personal.phone || "phone") + " · " + (data.personal.location || "location")}
        </div>
        {hasLinks ? (
          <div className="text-sm text-black/70">
            {[data.links.github.trim(), data.links.linkedin.trim()].filter(Boolean).join(" · ")}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {showSummary ? (
          <section>
            <div className={sectionHeaderClass}>Summary</div>
            <div className="mt-2 text-sm leading-6">{data.summary}</div>
          </section>
        ) : null}

        {showEducation ? (
          <section>
            <div className={sectionHeaderClass}>Education</div>
            <div className="mt-2 space-y-3">
              {data.education
                .filter((e) => e.school.trim() || e.degree.trim())
                .map((e, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="font-semibold">{e.school}</div>
                    <div className="text-black/70">
                      {[e.degree, [e.start, e.end].filter(Boolean).join(" — "), e.location]
                        .filter((v) => (v ?? "").trim().length > 0)
                        .join(" · ")}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {showExperience ? (
          <section>
            <div className={sectionHeaderClass}>Experience</div>
            <div className="mt-2 space-y-4">
              {data.experience
                .filter((x) => x.company.trim() || x.role.trim() || x.highlights.trim())
                .map((x, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-semibold">{x.company}</div>
                      <div className="text-xs text-black/60">
                        {[x.start, x.end].filter(Boolean).join(" — ")}
                      </div>
                    </div>
                    <div className="text-black/70">{x.role}</div>
                    {x.highlights.trim() ? (
                      <div className="mt-2 whitespace-pre-line text-black/80">{x.highlights}</div>
                    ) : null}
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {showProjects ? (
          <section>
            <div className={sectionHeaderClass}>Projects</div>
            <div className="mt-2 space-y-3">
              {data.projects
                .filter((p) => p.name.trim() || p.description.trim())
                .map((p, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="font-semibold">{p.name}</div>
                    {p.description.trim() ? (
                      <div className="text-black/80">{p.description}</div>
                    ) : null}
                    {p.tech.trim() ? <div className="text-black/60">{p.tech}</div> : null}
                    {p.link.trim() ? <div className="text-black/60">{p.link}</div> : null}
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {showSkills ? (
          <section>
            <div className={sectionHeaderClass}>Skills</div>
            <div className="mt-2 text-sm text-black/80">{skills.join(", ")}</div>
          </section>
        ) : null}

        {hasLinks ? (
          <section>
            <div className={sectionHeaderClass}>Links</div>
            <div className="mt-2 text-sm text-black/80">
              {[data.links.github.trim(), data.links.linkedin.trim()].filter(Boolean).join(" · ")}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
