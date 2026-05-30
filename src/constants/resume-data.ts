/**
 * Single source for resume PDF generation (pnpm run build:resume).
 * Keep production projects in sync with src/constants/portfolio.ts.
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
};

export const resumeProfile = {
  name: "Sravan Kumar Polu",
  title: "MERN Stack Developer",
  tagline: "React · TypeScript · Next.js · Node.js",
  location: "India · Remote-friendly",
  email: "sravanpolu.me@gmail.com",
  website: "https://sravanpolu.me",
  linkedIn: "https://www.linkedin.com/in/SravanPolu",
  github: "https://github.com/SravanKumarPolu",
  yearsExperience: "3+",
} as const;

export const resumeSummary =
  "MERN stack developer focused on React, Next.js, and TypeScript — building products from UI through APIs to deployment on Netlify and Vercel. Shipped multiple production web apps and delivered client work on Fiverr with clear communication, fast iteration, and measurable outcomes in performance and usability.";

export const resumeSkillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    label: "Tools & deployment",
    skills: ["Git", "Vercel", "Netlify", "Docker", "Figma"],
  },
] as const;

/** Production apps — align with PRODUCTION_PROJECT_LINKS in portfolio.ts */
export const resumeProductionProjects: ResumeProject[] = [
  {
    name: "DebiasDaily",
    link: "https://debiasdaily.com/",
    description: "Next.js product focused on daily bias awareness and mindful habits.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "BloomMind Tracker",
    link: "https://bloommind-tracker.netlify.app/",
    description: "Wellness tracker (beta) — habits, mood, and progress in one dashboard.",
    tags: ["Next.js", "TypeScript", "Netlify"],
  },
  {
    name: "NexCartis",
    link: "https://nextcartis.netlify.app/",
    description: "E-commerce style storefront (beta) with cart and product flows.",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    name: "ChronoBloom",
    link: "https://chronobloom.netlify.app/",
    description: "Time and focus companion app with a calm, product-style UI.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    name: "Boostlly",
    link: "https://boostlly.netlify.app/",
    description: "Productivity companion (beta) for goals and lightweight tracking.",
    tags: ["Next.js", "React"],
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    company: "Freelance — Fiverr & direct clients",
    role: "MERN Stack Developer",
    location: "Remote",
    start: "2022",
    end: "Present",
    bullets: [
      "Built and delivered responsive React and Next.js applications from scoped requirements through deployment.",
      "Communicated progress with regular updates; iterated quickly on feedback for UI, performance, and usability.",
      "Deployed client projects to Netlify and Vercel with production-ready builds and clear handoff documentation.",
    ],
  },
  {
    company: "Independent product development",
    role: "Full-Stack Developer",
    location: "Remote",
    start: "2023",
    end: "Present",
    bullets: [
      "Designed, built, and shipped production Next.js apps including DebiasDaily, BloomMind Tracker, NexCartis, ChronoBloom, and Boostlly.",
      "Owned end-to-end delivery: component architecture, API integration patterns, and CI-friendly static deployments.",
      "Maintained portfolio and project documentation at sravanpolu.me for recruiters and hiring managers.",
    ],
  },
];

/** Add degrees here when ready; section is omitted from PDF when empty. */
export const resumeEducation: ResumeEducation[] = [];
