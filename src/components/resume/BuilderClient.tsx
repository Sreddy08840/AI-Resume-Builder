"use client";
import { useState } from "react";
import { useResume } from "@/components/resume/ResumeStore";
import { AtsScoreCard } from "@/components/resume/AtsScoreCard";
import { BulletGuidance } from "@/components/resume/BulletGuidance";
import { AccordionSection } from "@/components/resume/Accordion";
import { TagInput } from "@/components/resume/TagInput";
import { TemplateThumbnailPicker } from "@/components/resume/TemplateThumbnailPicker";
import { ColorThemePicker } from "@/components/resume/ColorThemePicker";
import { useResumeTemplate } from "@/components/resume/useResumeTemplate";
import { useResumeAccent } from "@/components/resume/useResumeAccent";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { type EducationEntry, type ExperienceEntry, type ProjectEntry } from "@/lib/resumeTypes";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-black/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-black/60">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-28 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export function BuilderClient() {
  const { data, setData, loadSample } = useResume();
  const { template, setTemplate } = useResumeTemplate();
  const { accent, setAccent } = useResumeAccent();
  const [suggestingSkills, setSuggestingSkills] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <div className="lg:col-span-6">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold tracking-tight">Builder</div>
              <div className="mt-1 text-sm text-black/60">Autosave + ATS scoring v1. No export/validation.</div>
            </div>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              Load sample
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold">Personal Info</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="Name"
                value={data.personal.name}
                onChange={(v) => setData({ ...data, personal: { ...data.personal, name: v } })}
              />
              <Field
                label="Email"
                value={data.personal.email}
                onChange={(v) => setData({ ...data, personal: { ...data.personal, email: v } })}
              />
              <Field
                label="Phone"
                value={data.personal.phone}
                onChange={(v) => setData({ ...data, personal: { ...data.personal, phone: v } })}
              />
              <Field
                label="Location"
                value={data.personal.location}
                onChange={(v) => setData({ ...data, personal: { ...data.personal, location: v } })}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold">Summary</div>
            <div className="mt-4">
              <TextArea
                label=""
                value={data.summary}
                onChange={(v) => setData({ ...data, summary: v })}
                placeholder="Write a short professional summary..."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Education</div>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    education: [
                      ...data.education,
                      { school: "", degree: "", start: "", end: "", location: "" } satisfies EducationEntry,
                    ],
                  })
                }
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5"
              >
                Add
              </button>
            </div>
            <div className="mt-4 space-y-6">
              {data.education.map((e, idx) => (
                <div key={idx} className="rounded-xl border border-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-black/60">Entry {idx + 1}</div>
                    <button
                      type="button"
                      onClick={() => setData({ ...data, education: data.education.filter((_, i) => i !== idx) })}
                      className="text-xs font-semibold text-black/60 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      label="School"
                      value={e.school}
                      onChange={(v) => {
                        const next = [...data.education];
                        next[idx] = { ...e, school: v };
                        setData({ ...data, education: next });
                      }}
                    />
                    <Field
                      label="Degree"
                      value={e.degree}
                      onChange={(v) => {
                        const next = [...data.education];
                        next[idx] = { ...e, degree: v };
                        setData({ ...data, education: next });
                      }}
                    />
                    <Field
                      label="Start"
                      value={e.start}
                      onChange={(v) => {
                        const next = [...data.education];
                        next[idx] = { ...e, start: v };
                        setData({ ...data, education: next });
                      }}
                    />
                    <Field
                      label="End"
                      value={e.end}
                      onChange={(v) => {
                        const next = [...data.education];
                        next[idx] = { ...e, end: v };
                        setData({ ...data, education: next });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Experience</div>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    experience: [
                      ...data.experience,
                      {
                        company: "",
                        role: "",
                        start: "",
                        end: "",
                        location: "",
                        highlights: "",
                      } satisfies ExperienceEntry,
                    ],
                  })
                }
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5"
              >
                Add
              </button>
            </div>
            <div className="mt-4 space-y-6">
              {data.experience.map((x, idx) => (
                <div key={idx} className="rounded-xl border border-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-black/60">Entry {idx + 1}</div>
                    <button
                      type="button"
                      onClick={() => setData({ ...data, experience: data.experience.filter((_, i) => i !== idx) })}
                      className="text-xs font-semibold text-black/60 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      label="Company"
                      value={x.company}
                      onChange={(v) => {
                        const next = [...data.experience];
                        next[idx] = { ...x, company: v };
                        setData({ ...data, experience: next });
                      }}
                    />
                    <Field
                      label="Role"
                      value={x.role}
                      onChange={(v) => {
                        const next = [...data.experience];
                        next[idx] = { ...x, role: v };
                        setData({ ...data, experience: next });
                      }}
                    />
                    <Field
                      label="Start"
                      value={x.start}
                      onChange={(v) => {
                        const next = [...data.experience];
                        next[idx] = { ...x, start: v };
                        setData({ ...data, experience: next });
                      }}
                    />
                    <Field
                      label="End"
                      value={x.end}
                      onChange={(v) => {
                        const next = [...data.experience];
                        next[idx] = { ...x, end: v };
                        setData({ ...data, experience: next });
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label="Highlights"
                      value={x.highlights}
                      onChange={(v) => {
                        const next = [...data.experience];
                        next[idx] = { ...x, highlights: v };
                        setData({ ...data, experience: next });
                      }}
                      placeholder="Bullet-style highlights..."
                    />
                    <BulletGuidance text={x.highlights} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AccordionSection
            title="Projects"
            defaultOpen
            right={
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    projects: [
                      ...data.projects,
                      {
                        title: "",
                        description: "",
                        techStack: [],
                        liveUrl: "",
                        githubUrl: "",
                      } satisfies ProjectEntry,
                    ],
                  })
                }
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5"
              >
                Add Project
              </button>
            }
          >
            <div className="mt-4 space-y-4">
              {data.projects.map((p, idx) => (
                <details key={idx} className="rounded-xl border border-black/10 bg-white" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3">
                    <div className="text-sm font-semibold">
                      {p.title.trim() ? p.title : `Project ${idx + 1}`}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setData({ ...data, projects: data.projects.filter((_, i) => i !== idx) });
                      }}
                      className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-black/5"
                    >
                      Delete
                    </button>
                  </summary>

                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Field
                        label="Project Title"
                        value={p.title}
                        onChange={(v) => {
                          const next = [...data.projects];
                          next[idx] = { ...p, title: v };
                          setData({ ...data, projects: next });
                        }}
                      />

                      <div>
                        <label className="text-xs font-semibold text-black/60">Live URL (optional)</label>
                        <input
                          value={p.liveUrl}
                          onChange={(e) => {
                            const next = [...data.projects];
                            next[idx] = { ...p, liveUrl: e.target.value };
                            setData({ ...data, projects: next });
                          }}
                          placeholder="https://..."
                          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-black/60">GitHub URL (optional)</label>
                        <input
                          value={p.githubUrl}
                          onChange={(e) => {
                            const next = [...data.projects];
                            next[idx] = { ...p, githubUrl: e.target.value };
                            setData({ ...data, projects: next });
                          }}
                          placeholder="https://github.com/..."
                          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-black/60">Tech Stack</label>
                        <div className="mt-2">
                          <TagInput
                            value={p.techStack}
                            onChange={(nextTags) => {
                              const next = [...data.projects];
                              next[idx] = { ...p, techStack: nextTags };
                              setData({ ...data, projects: next });
                            }}
                            placeholder="Type a tech and press Enter"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-black/60">Description (max 200)</label>
                        <div className="text-xs font-semibold text-black/40">
                          {p.description.length}/200
                        </div>
                      </div>
                      <textarea
                        value={p.description}
                        onChange={(e) => {
                          const v = e.target.value.slice(0, 200);
                          const next = [...data.projects];
                          next[idx] = { ...p, description: v };
                          setData({ ...data, projects: next });
                        }}
                        className="mt-2 h-28 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                        placeholder="Use bullet lines. Press Enter for new bullet."
                      />
                      <BulletGuidance text={p.description} />
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={`Skills`}
            defaultOpen
            right={
              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  if (suggestingSkills) return;
                  setSuggestingSkills(true);
                  await new Promise((r) => window.setTimeout(r, 1000));
                  setData({
                    ...data,
                    skills: {
                      technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
                      soft: ["Team Leadership", "Problem Solving"],
                      tools: ["Git", "Docker", "AWS"],
                    },
                  });
                  setSuggestingSkills(false);
                }}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5"
              >
                {suggestingSkills ? "Loading..." : "✨ Suggest Skills"}
              </button>
            }
          >
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold">Technical Skills ({data.skills.technical.length})</div>
                <div className="mt-3">
                  <TagInput
                    value={data.skills.technical}
                    onChange={(nextTags) =>
                      setData({
                        ...data,
                        skills: { ...data.skills, technical: nextTags },
                      })
                    }
                    placeholder="Type a skill and press Enter"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Soft Skills ({data.skills.soft.length})</div>
                <div className="mt-3">
                  <TagInput
                    value={data.skills.soft}
                    onChange={(nextTags) =>
                      setData({
                        ...data,
                        skills: { ...data.skills, soft: nextTags },
                      })
                    }
                    placeholder="Type a skill and press Enter"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Tools & Technologies ({data.skills.tools.length})</div>
                <div className="mt-3">
                  <TagInput
                    value={data.skills.tools}
                    onChange={(nextTags) =>
                      setData({
                        ...data,
                        skills: { ...data.skills, tools: nextTags },
                      })
                    }
                    placeholder="Type a tool and press Enter"
                  />
                </div>
              </div>
            </div>
          </AccordionSection>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold">Links</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="GitHub"
                value={data.links.github}
                onChange={(v) => setData({ ...data, links: { ...data.links, github: v } })}
                placeholder="https://github.com/..."
              />
              <Field
                label="LinkedIn"
                value={data.links.linkedin}
                onChange={(v) => setData({ ...data, links: { ...data.links, linkedin: v } })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="sticky top-24">
          <div className="mb-6">
            <AtsScoreCard data={data} />
          </div>

          <div className="mb-4 rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Template
            </div>
            <div className="mt-3">
              <TemplateThumbnailPicker value={template} onChange={setTemplate} />
            </div>

            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-black/60">
              Accent Color
            </div>
            <div className="mt-3">
              <ColorThemePicker value={accent} onChange={setAccent} />
            </div>
          </div>

          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/60">
            Live Preview
          </div>
          <ResumePreview data={data} template={template} accent={accent} />
        </div>
      </div>
    </div>
  );
}
