import { courses, footerLinks, socialMedia } from "./index";

/** Production apps — must match links in courses where applicable */
export const PRODUCTION_PROJECT_LINKS = [
  "https://debiasdaily.com/",
  "https://bloommind-tracker.netlify.app/",
  "https://nextcartis.netlify.app/",
  "https://chronobloom.netlify.app/",
  "https://boostlly.netlify.app/",
] as const;

/** @deprecated use PRODUCTION_PROJECT_LINKS */
export const FEATURED_PROJECT_LINKS = [
  ...PRODUCTION_PROJECT_LINKS,
  "https://skr-e-commerce.netlify.app/",
] as const;

export type ProjectTier = "production" | "learning";

export type FlatProject = {
  src: string;
  title: string;
  name: string;
  link: string;
  courseName: string;
  summary: string;
  description: string;
  tags: string[];
  tier: ProjectTier;
  language?: { src: string; alt: string; name: string };
};

const PROJECT_META: Record<
  string,
  { description: string; tags: string[]; tier: ProjectTier }
> = {
  "https://debiasdaily.com/": {
    description: "Next.js product focused on daily bias awareness and mindful habits.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    tier: "production",
  },
  "https://bloommind-tracker.netlify.app/": {
    description: "Wellness tracker (beta) — habits, mood, and progress in one dashboard.",
    tags: ["Next.js", "TypeScript", "Netlify"],
    tier: "production",
  },
  "https://nextcartis.netlify.app/": {
    description: "E-commerce style storefront (beta) with cart and product flows.",
    tags: ["Next.js", "React", "Tailwind"],
    tier: "production",
  },
  "https://chronobloom.netlify.app/": {
    description: "Time and focus companion app with a calm, product-style UI.",
    tags: ["Next.js", "TypeScript"],
    tier: "production",
  },
  "https://boostlly.netlify.app/": {
    description: "Productivity companion (beta) for goals and lightweight tracking.",
    tags: ["Next.js", "React"],
    tier: "production",
  },
  "https://skr-e-commerce.netlify.app/": {
    description: "Full-stack MERN e-commerce — catalog, cart, and deployed demo.",
    tags: ["MERN", "React", "Node.js"],
    tier: "production",
  },
  "https://sravan-gym.netlify.app": {
    description: "Gym landing experience built with TypeScript and responsive layout.",
    tags: ["TypeScript", "React"],
    tier: "learning",
  },
  "https://sravan-quizlet-landingpage.netlify.app/": {
    description: "Quizlet-style marketing page — layout and typography practice.",
    tags: ["TypeScript", "CSS"],
    tier: "learning",
  },
  "https://task-breaks.netlify.app/": {
    description: "Pomodoro-style task and break timer.",
    tags: ["TypeScript", "React"],
    tier: "learning",
  },
  "https://fanciful-kitten-112003.netlify.app/": {
    description: "UI clone exercise — component structure and styling.",
    tags: ["React", "CSS"],
    tier: "learning",
  },
  "https://van-life2.netlify.app/": {
    description: "Van life marketing layout — responsive React + CSS.",
    tags: ["React", "CSS"],
    tier: "learning",
  },
  "https://sravan-nike.netlify.app": {
    description: "Nike-style landing page with Tailwind utility patterns.",
    tags: ["Tailwind", "React"],
    tier: "learning",
  },
  "https://stripedemo1.netlify.app/": {
    description: "Stripe-style layout using CSS Grid.",
    tags: ["CSS", "Grid"],
    tier: "learning",
  },
  "https://sravan-cubedemo.netlify.app/": {
    description: "3D cube CSS animation demo.",
    tags: ["CSS", "Animation"],
    tier: "learning",
  },
  "https://sravan-solarsystemdemo.netlify.app/": {
    description: "Solar system CSS animation study.",
    tags: ["CSS", "Animation"],
    tier: "learning",
  },
  "https://jsfiddle.net/pvskr/pnfjt029/20/": {
    description: "Bootstrap card layout experiment.",
    tags: ["Bootstrap"],
    tier: "learning",
  },
  "https://new-buy-me.netlify.app/": {
    description: "JavaScript DOM and UI interaction practice.",
    tags: ["JavaScript"],
    tier: "learning",
  },
  "https://jsfiddle.net/pvskr/4ygntpoq/28/": {
    description: "Netflix landing page clone in vanilla JS.",
    tags: ["JavaScript", "HTML"],
    tier: "learning",
  },
  "https://sravanotp-project.netlify.app/": {
    description: "OTP input UI built with semantic HTML.",
    tags: ["HTML", "CSS"],
    tier: "learning",
  },
};

const defaultMeta = (courseName: string): { description: string; tags: string[]; tier: ProjectTier } => ({
  description: `${courseName} project — UI and implementation practice.`,
  tags: [courseName],
  tier: "learning",
});

function enrichProject(
  project: { src: string; title: string; name: string; link: string },
  courseName: string,
  summary: string,
  language?: { src: string; alt: string; name: string }
): FlatProject {
  const meta = PROJECT_META[project.link] ?? defaultMeta(courseName);
  const tier =
    meta.tier === "production" ||
    (PRODUCTION_PROJECT_LINKS as readonly string[]).includes(project.link)
      ? "production"
      : "learning";

  return {
    ...project,
    courseName,
    summary,
    description: meta.description,
    tags: meta.tags,
    tier,
    language,
  };
}

/** Every project from courses */
export function getAllProjects(): FlatProject[] {
  return courses.flatMap((course) =>
    course.projects.map((project) =>
      enrichProject(project, course.courseName, course.summary, course.language?.[0])
    )
  );
}

export function getProductionProjects(): FlatProject[] {
  return getAllProjects().filter((p) => p.tier === "production");
}

export function getLearningProjects(): FlatProject[] {
  return getAllProjects().filter((p) => p.tier === "learning");
}

/** Featured grid — production apps only, stable order */
export function getFeaturedProjects(): FlatProject[] {
  const production = getProductionProjects();
  const ordered = PRODUCTION_PROJECT_LINKS.flatMap((link) => {
    const match = production.find((p) => p.link === link);
    return match ? [match] : [];
  });
  const seen = new Set(ordered.map((p) => p.link));
  const rest = production.filter((p) => !seen.has(p.link));
  return [...ordered, ...rest];
}

export const portfolioStats = {
  projectCount: getAllProjects().length,
  productionCount: getProductionProjects().length,
  technologyStacks: courses.length,
  yearsExperience: "3+",
} as const;

export const aboutContent = {
  badge: "Open to full-time & contract",
  headline: "About me",
  paragraphs: [
    "I'm a MERN stack developer focused on React, Next.js, and TypeScript — building products from UI through APIs to deployment on Netlify and Vercel.",
    "I've shipped production apps including DebiasDaily, BloomMind Tracker, NexCartis, ChronoBloom, and Boostlly, plus client work on Fiverr with clear communication and fast iteration.",
    "I work best with defined scope, regular feedback, and measurable outcomes: performance, usability, and on-time delivery.",
  ],
  highlights: [
    { label: "Production apps", value: String(portfolioStats.productionCount) },
    { label: "Portfolio projects", value: String(portfolioStats.projectCount) },
    { label: "Years building", value: portfolioStats.yearsExperience },
  ],
  location: "India · Remote-friendly",
} as const;

export const contactLinks = {
  email: footerLinks[0].links.find((l) => l.link.startsWith("mailto:"))!,
  linkedIn: socialMedia.find((s) => s.name === "LinkedIn")!,
  github: socialMedia.find((s) => s.name === "Github")!,
  x: socialMedia.find((s) => s.name === "X")!,
};

export const coreSkills = [
  { name: "React", proficiency: "Production" as const },
  { name: "TypeScript", proficiency: "Production" as const },
  { name: "Next.js", proficiency: "Production" as const },
  { name: "Node.js", proficiency: "Proficient" as const },
  { name: "Express.js", proficiency: "Proficient" as const },
  { name: "MongoDB", proficiency: "Proficient" as const },
  { name: "Tailwind CSS", proficiency: "Production" as const },
  { name: "REST APIs", proficiency: "Production" as const },
  { name: "Git", proficiency: "Proficient" as const },
  { name: "Framer Motion", proficiency: "Comfortable" as const },
  { name: "Vercel / Netlify", proficiency: "Proficient" as const },
  { name: "Figma", proficiency: "Comfortable" as const },
];

export function levelToProficiency(level: number): "Production" | "Proficient" | "Comfortable" | "Familiar" {
  if (level >= 90) return "Production";
  if (level >= 82) return "Proficient";
  if (level >= 75) return "Comfortable";
  return "Familiar";
}
