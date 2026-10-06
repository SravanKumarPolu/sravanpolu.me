/**
 * Single source for resume PDF generation (pnpm run build:resume).
 * Keep project list in sync with src/constants/portfolio.ts.
 */

export type ResumeExperience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ResumeEducation = {
  school: string;
  degree: string;
  year: string;
  details?: string;
};

export type ResumeProject = {
  name: string;
  link: string;
  description: string;
  tags: string[];
  status?: "production" | "beta" | "demo" | "mobile";
};

export const resumeProfile = {
  name: "Sravan Kumar Polu",
  title: "Frontend / Full-Stack Developer",
  tagline: "React · Next.js · TypeScript · Node.js · MongoDB",
  location: "India · Remote-friendly",
  email: "sravanpolu.me@gmail.com",
  website: "https://sravanpolu.com",
  linkedIn: "https://www.linkedin.com/in/SravanPolu",
  github: "https://github.com/SravanKumarPolu",
  yearsExperience: "3+",
  lastUpdated: "October 2026",
} as const;

export const resumeSummary =
  "Frontend / full-stack developer building production web apps with React, Next.js and TypeScript — from UI through APIs to deployment on Vercel and Netlify. Ships and maintains independent products, including one live production app (DebiasDaily) and a full-stack MERN e-commerce build, alongside freelance client work. Growing DevOps skill area through hands-on CI/CD and cloud infrastructure labs.";

export const resumeSkillGroups = [
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native (AirSense)",
      "Expo / EAS",
    ],
  },
  {
    label: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT Authentication"],
  },
  {
    label: "Databases",
    skills: ["MongoDB (sessions, transactions, unique constraints)"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "Git",
      "GitHub Actions (CI on this portfolio)",
      "Vercel",
      "Netlify",
      "Docker (learning)",
      "AWS / Terraform / Jenkins (hands-on labs)",
    ],
  },
] as const;

/** Aligned with the statuses in PROJECT_META in portfolio.ts */
export const resumeProductionProjects: ResumeProject[] = [
  {
    name: "SKR E-Commerce",
    link: "https://skr-e-commerce.netlify.app/",
    description:
      "Full-stack MERN e-commerce (React/TS + Node/Express + MongoDB) with retry-safe order processing: idempotency keys, payload hashing and DB unique constraints prevent duplicate orders.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
  },
  {
    name: "DebiasDaily",
    link: "https://debiasdaily.com/",
    description:
      "Live production Next.js + TypeScript app: 83-bias daily curriculum, quiz/review flows, text-to-speech, offline-capable PWA.",
    tags: ["Next.js", "TypeScript", "PWA", "Tailwind"],
    status: "production",
  },
  {
    name: "Smart Training & School Management",
    link: "https://smart-training-school-management-de.vercel.app/",
    description:
      "Multi-role school SaaS demo (sample data): five role-based dashboards, branch-scoped access, admissions-to-fees workflows.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "demo",
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    company: "Freelance — Fiverr & direct clients",
    role: "Frontend / Full-Stack Developer",
    location: "Remote",
    start: "2022",
    end: "Present",
    bullets: [
      "Built and deployed responsive React/Next.js applications across client and independent projects, including dashboards, landing pages and application workflows.",
      "Owned delivery end-to-end: requirements scoping, implementation, deployment to Netlify/Vercel, and handoff documentation.",
      "Iterated on client feedback across UI, performance and accessibility with regular progress updates.",
    ],
  },
  {
    company: "Independent product development",
    role: "Full-Stack Developer",
    location: "Remote",
    start: "2023",
    end: "Present",
    bullets: [
      "Designed, built and shipped DebiasDaily — a live production Next.js/TypeScript product with an 83-bias curriculum, quiz/review flows, offline PWA support and text-to-speech.",
      "Built SKR E-Commerce end-to-end (MERN) with authentication and retry-safe, idempotent order processing; built a five-role school management demo with branch-scoped access.",
      "Also built AirSense (React Native/Expo): multi-provider environmental data with fallback, provenance labelling and a recommendation engine.",
      "Maintains this portfolio with automated tests, GitHub Actions CI, prerendered SEO and accessibility tooling.",
    ],
  },
];

export const resumeEducation: ResumeEducation[] = [
  {
    school: "Lovely Professional University",
    degree: "B.Tech",
    year: "2019",
  },
];
