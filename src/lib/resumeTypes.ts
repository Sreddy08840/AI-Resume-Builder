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
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
};

export type SkillsData = {
  technical: string[];
  soft: string[];
  tools: string[];
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
  skills: SkillsData;
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
  skills: { technical: [], soft: [], tools: [] },
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
      title: "AI Resume Builder",
      description: "Built a premium resume builder with live preview and clean layout.",
      techStack: ["Next.js", "TypeScript"],
      liveUrl: "",
      githubUrl: "",
    },
  ],
  skills: {
    technical: ["React", "TypeScript", "Next.js"],
    soft: ["Problem Solving"],
    tools: ["Git"],
  },
  links: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
  },
};
