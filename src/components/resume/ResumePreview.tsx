import type { ResumeData } from "@/lib/resumeTypes";
import type { ResumeTemplate } from "@/lib/resumeTemplate";
import type { AccentThemeKey } from "@/lib/accentTheme";
import { accentToHsl } from "@/lib/accentTheme";

export function ResumePreview({
  data,
  template = "classic",
  accent = "teal",
}: {
  data: ResumeData;
  template?: ResumeTemplate;
  accent?: AccentThemeKey;
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

  const accentHsl = accentToHsl(accent);

  const nameClass =
    template === "classic"
      ? "text-3xl font-semibold tracking-tight font-serif"
      : template === "modern"
        ? "text-3xl font-semibold tracking-tight"
        : "text-3xl font-semibold tracking-tight";

  const sectionHeaderClass =
    template === "modern"
      ? "text-[11px] font-semibold uppercase tracking-[0.18em]"
      : template === "minimal"
        ? "text-[11px] font-semibold uppercase tracking-wider"
        : "text-xs font-semibold uppercase tracking-wider";

  const headerStyle = { color: accentHsl } as const;

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

  const ClassicLayout = (
    <div className="rounded-2xl border border-black/10 bg-white p-10">
      <div>
        <div className={nameClass} style={headerStyle}>
          {data.personal.name || "Your Name"}
        </div>
        <div className="mt-2 text-sm text-black/70">
          {(data.personal.email || "email") + " · " + (data.personal.phone || "phone") + " · " + (data.personal.location || "location")}
        </div>
        {hasLinks ? (
          <div className="mt-1 text-sm text-black/70">
            {[data.links.github.trim(), data.links.linkedin.trim()].filter(Boolean).join(" · ")}
          </div>
        ) : null}
      </div>

      <div className="my-6 h-px w-full" style={{ background: accentHsl, opacity: 0.35 }} />

      <div className="grid grid-cols-1 gap-6">
        {showSummary ? (
          <section>
            <div className={sectionHeaderClass} style={headerStyle}>
              Summary
            </div>
            <div className="mt-2 text-sm leading-6">{data.summary}</div>
          </section>
        ) : null}

        {showEducation ? (
          <section className="print-avoid-break">
            <div className={sectionHeaderClass} style={headerStyle}>
              Education
            </div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Experience
            </div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Projects
            </div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Skills
            </div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Links
            </div>
            <div className="mt-2 text-sm text-black/80">
              {[data.links.github.trim(), data.links.linkedin.trim()].filter(Boolean).join(" · ")}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );

  const MinimalLayout = (
    <div className="rounded-2xl border border-black/10 bg-white p-12">
      <div>
        <div className="text-3xl font-semibold tracking-tight" style={headerStyle}>
          {data.personal.name || "Your Name"}
        </div>
        <div className="mt-2 text-sm text-black/70">
          {(data.personal.email || "email") + " · " + (data.personal.phone || "phone") + " · " + (data.personal.location || "location")}
        </div>
        {hasLinks ? (
          <div className="mt-1 text-sm text-black/70">
            {[data.links.github.trim(), data.links.linkedin.trim()].filter(Boolean).join(" · ")}
          </div>
        ) : null}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8">
        {showSummary ? (
          <section>
            <div className={sectionHeaderClass} style={headerStyle}>
              Summary
            </div>
            <div className="mt-2 text-sm leading-7">{data.summary}</div>
          </section>
        ) : null}

        {showEducation ? (
          <section className="print-avoid-break">
            <div className={sectionHeaderClass} style={headerStyle}>
              Education
            </div>
            <div className="mt-3 space-y-4">
              {data.education
                .filter((e) => e.school.trim() || e.degree.trim())
                .map((e, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="font-semibold">{e.school}</div>
                    <div className="mt-1 text-black/70">
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Experience
            </div>
            <div className="mt-3 space-y-5">
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
                    <div className="mt-1 text-black/70">{x.role}</div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Projects
            </div>
            <div className="mt-3 space-y-4">
              {data.projects
                .filter((p) => p.title.trim() || p.description.trim())
                .map((p, idx) => (
                  <div key={idx} className="print-avoid-break text-sm">
                    <div className="font-semibold">{p.title}</div>
                    {p.description.trim() ? (
                      <div className="mt-1 whitespace-pre-line text-black/80">{p.description}</div>
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
            <div className={sectionHeaderClass} style={headerStyle}>
              Skills
            </div>
            <div className="mt-4 space-y-4">
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
      </div>
    </div>
  );

  const ModernLayout = (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="grid grid-cols-3">
        <div className="col-span-1 p-8 text-white" style={{ background: accentHsl }}>
          <div className="text-xl font-semibold tracking-tight">
            {data.personal.name || "Your Name"}
          </div>
          <div className="mt-4 space-y-2 text-sm opacity-95">
            <div>{data.personal.email || "email"}</div>
            <div>{data.personal.phone || "phone"}</div>
            <div>{data.personal.location || "location"}</div>
          </div>

          {hasLinks ? (
            <div className="mt-6 space-y-1 text-sm opacity-95">
              {data.links.github.trim() ? <div>{data.links.github.trim()}</div> : null}
              {data.links.linkedin.trim() ? <div>{data.links.linkedin.trim()}</div> : null}
            </div>
          ) : null}

          {showSkills ? (
            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-95">Skills</div>
              <div className="mt-3 space-y-4">
                {techSkills.length ? (
                  <div>
                    <div className="text-xs font-semibold opacity-95">Technical</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {techSkills.map((s) => (
                        <span key={s} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {toolSkills.length ? (
                  <div>
                    <div className="text-xs font-semibold opacity-95">Tools</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {toolSkills.map((s) => (
                        <span key={s} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {softSkills.length ? (
                  <div>
                    <div className="text-xs font-semibold opacity-95">Soft</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {softSkills.map((s) => (
                        <span key={s} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-span-2 p-10">
          <div className="grid grid-cols-1 gap-6">
            {showSummary ? (
              <section>
                <div className={sectionHeaderClass} style={headerStyle}>
                  Summary
                </div>
                <div className="mt-2 text-sm leading-6 text-black/80">{data.summary}</div>
              </section>
            ) : null}

            {showEducation ? (
              <section className="print-avoid-break">
                <div className={sectionHeaderClass} style={headerStyle}>
                  Education
                </div>
                <div className="mt-3 space-y-3">
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
                <div className={sectionHeaderClass} style={headerStyle}>
                  Experience
                </div>
                <div className="mt-3 space-y-4">
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
                <div className={sectionHeaderClass} style={headerStyle}>
                  Projects
                </div>
                <div className="mt-3 space-y-3">
                  {data.projects
                    .filter((p) => p.title.trim() || p.description.trim())
                    .map((p, idx) => (
                      <div
                        key={idx}
                        className="print-avoid-break rounded-xl border border-black/10 bg-white p-4 text-sm"
                        style={{ borderColor: "rgba(0,0,0,0.08)" }}
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
          </div>
        </div>
      </div>
    </div>
  );

  const content = template === "modern" ? ModernLayout : template === "minimal" ? MinimalLayout : ClassicLayout;

  return <div className="print-page overflow-hidden">{content}</div>;
}
