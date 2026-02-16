import type { ResumeData } from "@/lib/resumeTypes";
import type { ResumeTemplate } from "@/lib/resumeTemplate";

export function ResumePreview({
  data,
  template = "classic",
}: {
  data: ResumeData;
  template?: ResumeTemplate;
}) {
  const techSkills = data.skills.technical ?? [];
  const softSkills = data.skills.soft ?? [];
  const toolSkills = data.skills.tools ?? [];

  const hasLinks = Boolean(data.links.github.trim() || data.links.linkedin.trim());
  const showSummary = Boolean(data.summary.trim());
  const showEducation = data.education.some((e) => e.school.trim() || e.degree.trim());
  const showExperience = data.experience.some((x) => x.company.trim() || x.role.trim() || x.highlights.trim());
  const showProjectsNew = data.projects.some((p) => p.title.trim() || p.description.trim());
  const showSkills = techSkills.length + softSkills.length + toolSkills.length > 0;

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

  function Pill({ text }: { text: string }) {
    return (
      <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/80">
        {text}
      </span>
    );
  }

  function LinkIcon({ label }: { label: string }) {
    return (
      <span aria-hidden="true" className="text-xs text-black/60">
        {label}
      </span>
    );
  }

  return (
    <div className={`print-page ${wrapClass} overflow-hidden`}>
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
          <section className="print-avoid-break">
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
          <section className="print-avoid-break">
            <div className={sectionHeaderClass}>Experience</div>
            <div className="mt-2 space-y-4">
              {data.experience
                .filter((x) => x.company.trim() || x.role.trim() || x.highlights.trim())
                .map((x, idx) => (
                  <div key={idx} className="print-avoid-break text-sm">
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

        {showProjectsNew ? (
          <section className="print-avoid-break">
            <div className={sectionHeaderClass}>Projects</div>
            <div className="mt-3 space-y-3">
              {data.projects
                .filter((p) => p.title.trim() || p.description.trim())
                .map((p, idx) => (
                  <div
                    key={idx}
                    className="print-avoid-break rounded-xl border border-black/10 bg-white p-4 text-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-semibold">{p.title}</div>
                      <div className="flex items-center gap-3 text-xs">
                        {p.liveUrl.trim() ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-black/70 hover:underline"
                          >
                            <LinkIcon label="Live" />
                          </a>
                        ) : null}
                        {p.githubUrl.trim() ? (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-black/70 hover:underline"
                          >
                            <LinkIcon label="GitHub" />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {p.description.trim() ? (
                      <div className="mt-2 whitespace-pre-line text-black/80">{p.description}</div>
                    ) : null}

                    {p.techStack?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.techStack.map((t) => (
                          <Pill key={t} text={t} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {showSkills ? (
          <section className="print-avoid-break">
            <div className={sectionHeaderClass}>Skills</div>
            <div className="mt-3 space-y-3">
              {techSkills.length ? (
                <div>
                  <div className="text-xs font-semibold text-black/60">Technical Skills</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {techSkills.map((s) => (
                      <Pill key={s} text={s} />
                    ))}
                  </div>
                </div>
              ) : null}
              {softSkills.length ? (
                <div>
                  <div className="text-xs font-semibold text-black/60">Soft Skills</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {softSkills.map((s) => (
                      <Pill key={s} text={s} />
                    ))}
                  </div>
                </div>
              ) : null}
              {toolSkills.length ? (
                <div>
                  <div className="text-xs font-semibold text-black/60">Tools & Technologies</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {toolSkills.map((s) => (
                      <Pill key={s} text={s} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
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
