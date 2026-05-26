import { courses, footerLinks, socialMedia } from "./index";

/** Live links to highlight at top of Work — must match existing project links in courses */
export const FEATURED_PROJECT_LINKS = [
  "https://debiasdaily.com/",
  "https://bloommind-tracker.netlify.app/",
  "https://nextcartis.netlify.app/",
  "https://chronobloom.netlify.app/",
  "https://skr-e-commerce.netlify.app/",
  "https://boostlly.netlify.app/",
] as const;

export type FlatProject = {
  src: string;
  title: string;
  name: string;
  link: string;
  courseName: string;
  summary: string;
  language?: { src: string; alt: string; name: string };
};

/** Every project from courses — nothing omitted */
export function getAllProjects(): FlatProject[] {
  return courses.flatMap((course) =>
    course.projects.map((project) => ({
      ...project,
      courseName: course.courseName,
      summary: course.summary,
      language: course.language?.[0],
    }))
  );
}

export function getFeaturedProjects(): FlatProject[] {
  const all = getAllProjects();
  const featured = FEATURED_PROJECT_LINKS.flatMap((link) => {
    const match = all.find((p) => p.link === link);
    return match ? [match] : [];
  });
  const featuredSet = new Set(featured.map((p) => p.link));
  const rest = all.filter((p) => !featuredSet.has(p.link));
  return [...featured, ...rest.slice(0, Math.max(0, 6 - featured.length))];
}

export const portfolioStats = {
  projectCount: getAllProjects().length,
  technologyStacks: courses.length,
  yearsExperience: "3+",
} as const;

export const aboutContent = {
  badge: "Open to full-time & contract",
  headline: "About me",
  paragraphs: [
    "I'm a MERN stack developer focused on React, Next.js, and TypeScript — building products from UI through APIs to deployment on Netlify and Vercel.",
    "I've shipped production apps including DebiasDaily, BloomMind Tracker, NexCartis, ChronoBloom, Boostlly, and multiple client deliverables on Fiverr with strong communication and fast turnaround.",
    "I work best with clear requirements, iterative feedback, and measurable outcomes: performance, usability, and reliable delivery.",
  ],
  highlights: [
    { label: "Projects shipped", value: String(portfolioStats.projectCount) },
    { label: "Tech stacks explored", value: String(portfolioStats.technologyStacks) },
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

export function levelToProficiency(level: number): "Production" | "Proficient" | "Comfortable" | "Familiar" {
  if (level >= 90) return "Production";
  if (level >= 82) return "Proficient";
  if (level >= 75) return "Comfortable";
  return "Familiar";
}
