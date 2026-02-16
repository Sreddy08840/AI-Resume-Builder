export type EducationEntry = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  highlights: string;
};

export type ProjectEntry = {
  name: string;
  description: string;
  tech: string;
  link: string;
};

export type ResumeData = {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string;
  links: {
    github: string;
    linkedin: string;
  };
};

export const EMPTY_RESUME: ResumeData = {
  personal: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: "",
  links: { github: "", linkedin: "" },
};

export const SAMPLE_RESUME: ResumeData = {
  personal: {
    name: "Aarav Kumar",
    email: "aarav.kumar@example.com",
    phone: "+91 90000 00000",
    location: "Bengaluru, India",
  },
  summary:
    "Entry-level full-stack developer focused on clean UI, reliable APIs, and excellent developer experience.",
  education: [
    {
      school: "KodNest",
      degree: "Full Stack Development",
      start: "2025",
      end: "2026",
      location: "India",
    },
  ],
  experience: [
    {
      company: "Sample Company",
      role: "Intern, Software Engineering",
      start: "2025",
      end: "2025",
      location: "Remote",
      highlights: "Built UI components, integrated APIs, wrote basic tests.",
    },
  ],
  projects: [
    {
      name: "AI Resume Builder",
      description: "A premium resume builder with live preview and clean layout.",
      tech: "Next.js, TypeScript",
      link: "",
    },
  ],
  skills: "React, TypeScript, Next.js, HTML, CSS",
  links: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
  },
};
