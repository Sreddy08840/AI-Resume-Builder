"use client";
import { useResume } from "@/components/resume/ResumeStore";
import { AtsScoreCard } from "@/components/resume/AtsScoreCard";
import { BulletGuidance } from "@/components/resume/BulletGuidance";
import { TemplateTabs } from "@/components/resume/TemplateTabs";
import { useResumeTemplate } from "@/components/resume/useResumeTemplate";
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

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <div className="lg:col-span-6">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold tracking-tight">Builder</div>
              <div className="mt-1 text-sm text-black/60">Autosave + ATS scoring v1. No export/validation.</div>
            </div>
            <div className="flex items-center gap-3">
              <TemplateTabs value={template} onChange={setTemplate} />
              <button
                type="button"
                onClick={loadSample}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-black/5"
              >
                Load Sample Data
              </button>
            </div>
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

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Projects</div>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    projects: [
                      ...data.projects,
                      { name: "", description: "", tech: "", link: "" } satisfies ProjectEntry,
                    ],
                  })
                }
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold hover:bg-black/5"
              >
                Add
              </button>
            </div>
            <div className="mt-4 space-y-6">
              {data.projects.map((p, idx) => (
                <div key={idx} className="rounded-xl border border-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-black/60">Entry {idx + 1}</div>
                    <button
                      type="button"
                      onClick={() => setData({ ...data, projects: data.projects.filter((_, i) => i !== idx) })}
                      className="text-xs font-semibold text-black/60 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      label="Name"
                      value={p.name}
                      onChange={(v) => {
                        const next = [...data.projects];
                        next[idx] = { ...p, name: v };
                        setData({ ...data, projects: next });
                      }}
                    />
                    <Field
                      label="Tech"
                      value={p.tech}
                      onChange={(v) => {
                        const next = [...data.projects];
                        next[idx] = { ...p, tech: v };
                        setData({ ...data, projects: next });
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label="Description"
                      value={p.description}
                      onChange={(v) => {
                        const next = [...data.projects];
                        next[idx] = { ...p, description: v };
                        setData({ ...data, projects: next });
                      }}
                    />
                    <BulletGuidance text={p.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold">Skills</div>
            <div className="mt-4">
              <Field
                label="Comma-separated"
                value={data.skills}
                onChange={(v) => setData({ ...data, skills: v })}
                placeholder="React, TypeScript, ..."
              />
            </div>
          </div>

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
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/60">
            Live Preview
          </div>
          <ResumePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}
