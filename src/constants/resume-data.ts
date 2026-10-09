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
  /** Optional display text shown instead of the raw link (e.g. "Independent products"). */
  linkLabel?: string;
  description: string;
  tags: string[];
  status?: "production" | "beta" | "demo" | "mobile";
};

export const resumeProfile = {
  name: "Sravan Kumar Polu",
  title: "Full-Stack Developer (MERN + DevOps)",
  tagline: "React · Next.js · Node.js",
  location: "India · Remote-friendly",
  email: "sravanpolu.me@gmail.com",
  website: "https://sravanpolu.com",
  linkedIn: "https://www.linkedin.com/in/SravanPolu",
  github: "https://github.com/SravanKumarPolu",
  yearsExperience: "3+",
  lastUpdated: "October 2026",
} as const;

export const resumeSummary =
  "Full-stack developer building responsive applications with React, Next.js, TypeScript, and Node.js. Experience delivering freelance client work and developing independent products, from interface design and API integration to testing and deployment.";

export const resumeSkillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "React Hook Form",
      "Vite",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT Authentication",
      "Middleware",
      "API Security",
    ],
  },
  {
    label: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "SQLAlchemy", "Transactions", "Indexing"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "AWS (EC2, S3, CloudFront, ALB)",
      "GCP (Compute Engine, VPC, Cloud SQL)",
      "Docker",
      "Kubernetes Fundamentals",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
  },
  {
    label: "Mobile",
    skills: ["React Native", "Expo", "EAS Build"],
  },
  {
    label: "Testing & Tools",
    skills: ["Git", "GitHub", "Postman", "Jest", "Vitest", "Playwright"],
  },
] as const;

/** Aligned with the statuses in PROJECT_META in portfolio.ts */
export const resumeProductionProjects: ResumeProject[] = [
  {
    name: "DebiasDaily",
    link: "https://debiasdaily.com",
    description:
      "Daily cognitive-bias awareness product featuring guided content and mindful habit experiences.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "production",
  },
  {
    name: "NexCartis",
    link: "https://nextcartis.netlify.app",
    description:
      "E-commerce-style storefront featuring shopping-cart and product browsing flows.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    status: "beta",
  },
  {
    name: "ChronoBloom",
    link: "https://chronobloom.netlify.app",
    description: "Time and focus companion with a calm, product-oriented interface.",
    tags: ["Next.js", "TypeScript"],
    status: "beta",
  },
  {
    name: "BloomMind Tracker / Boostlly",
    link: "https://sravanpolu.com",
    linkLabel: "Independent products",
    description:
      "Wellness and productivity dashboards for tracking habits, mood, progress, and goals.",
    tags: ["Next.js", "TypeScript / React"],
    status: "beta",
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    company: "Freelance · Fiverr & direct clients",
    role: "MERN Stack Developer",
    location: "Remote",
    start: "2022",
    end: "Present",
    bullets: [
      "Built and delivered responsive React and Next.js applications, from client requirements through deployment.",
      "Worked with client feedback to improve interfaces, usability, and performance; provided deployment handoffs.",
      "Published production-ready web builds using Netlify and Vercel.",
    ],
  },
  {
    company: "Independent product development",
    role: "Full-Stack Developer",
    location: "Remote",
    start: "2023",
    end: "Present",
    bullets: [
      "Built and deployed DebiasDaily and developed beta products including BloomMind Tracker, NexCartis, ChronoBloom, and Boostlly.",
      "Handled UI component architecture, API integration patterns, and deployment workflows; documented projects for public review.",
    ],
  },
];

export const resumeEducation: ResumeEducation[] = [
  {
    school: "Lovely Professional University",
    degree: "Bachelor of Technology (B.Tech)",
    year: "2019",
  },
];
