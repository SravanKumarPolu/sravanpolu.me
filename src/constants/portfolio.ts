import { courses, footerLinks, socialMedia } from "./index";

export type ProjectStatus = "production" | "beta" | "client" | "client-demo" | "learning";

export type ProjectDetails = {
  role: string;
  problemSolved: string;
  solution?: string;
  features: string[];
  technicalDecisions: string[];
  challenges: string;
  results: string;
  note?: string;
};

/** Recent product projects in stable order — used in the hero and stats */
export const featuredProjectOrder = [
  { name: "DebiasDaily", link: "https://debiasdaily.com/" },
  { name: "BloomMind", link: "https://bloommind-tracker.netlify.app/" },
  { name: "NexCartis", link: "https://nextcartis.netlify.app/" },
  { name: "ChronoBloom", link: "https://chronobloom.netlify.app/" },
  { name: "Boostlly", link: "https://boostlly.netlify.app/" },
] as const;

export type FlatProject = {
  src: string;
  title: string;
  name: string;
  link: string;
  courseName: string;
  summary: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  language?: { src: string; alt: string; name: string };
  github?: string;
  alt?: string;
  details?: ProjectDetails;
};

/** Placeholders used wherever a detail is not yet verified. */
export const DETAILS_PLACEHOLDER = {
  challenges: "Detailed notes to be added.",
  results: "Metrics to be added once verified.",
} as const;

const PROJECT_META: Record<
  string,
  {
    description: string;
    tags: string[];
    status: ProjectStatus;
    alt?: string;
    details?: ProjectDetails;
  }
> = {
  "https://debiasdaily.com/": {
    description: "React product focused on daily bias awareness and mindful habits.",
    tags: ["React", "Tailwind"],
    status: "production",
    alt: "DebiasDaily cognitive bias learning application",
    details: {
      role: "Developer",
      problemSolved:
        "Brings daily bias awareness and mindful habit-building into one focused product.",
      features: ["Daily bias awareness prompts", "Mindful habit-building flow"],
      technicalDecisions: [
        "Built with Next.js",
        "TypeScript end-to-end",
        "Tailwind CSS styling",
      ],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://bloommind-tracker.netlify.app/": {
    description: "Wellness tracker (beta) — habits, mood, and progress in one dashboard.",
    tags: ["Next.js", "TypeScript", "Netlify"],
    status: "beta",
    details: {
      role: "Developer",
      problemSolved: "Tracks habits, mood, and progress in one dashboard.",
      features: ["Habit tracking", "Mood logging", "Progress dashboard"],
      technicalDecisions: ["Next.js + TypeScript", "Static deployment on Netlify"],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://nextcartis.netlify.app/": {
    description: "E-commerce style storefront (beta) with cart and product flows.",
    tags: ["Next.js", "React", "Tailwind"],
    status: "beta",
    details: {
      role: "Developer",
      problemSolved: "Demonstrates e-commerce storefront flows — catalog and cart.",
      features: ["Product catalog", "Cart flows", "Responsive storefront"],
      technicalDecisions: ["Next.js + React", "Tailwind CSS"],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://chronobloom.netlify.app/": {
    description: "Time and focus companion app with a calm, product-style UI.",
    tags: ["Next.js", "TypeScript"],
    status: "beta",
    details: {
      role: "Developer",
      problemSolved: "Provides a calm companion for time and focus management.",
      features: ["Time management", "Focus sessions"],
      technicalDecisions: ["Next.js + TypeScript"],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://boostlly.netlify.app/": {
    description: "Productivity companion (beta) for goals and lightweight tracking.",
    tags: ["Next.js", "React"],
    status: "beta",
    details: {
      role: "Developer",
      problemSolved: "Offers lightweight goal and productivity tracking.",
      features: ["Goal tracking", "Lightweight progress tracking"],
      technicalDecisions: ["Next.js + React"],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://smart-training-school-management-de.vercel.app/": {
    alt: "Smart Training and School Management dashboard",
    description:
      "A multi-role school management platform for managing branches, students, teachers, attendance, homework, timetables, fees, communication, reports, and administrative workflows.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "client-demo",
    details: {
      role: "Full-stack development covering requirements analysis, application architecture, responsive UI, data modelling, role-based workflows, testing and deployment.",
      problemSolved:
        "Schools often manage admissions, attendance, fees, homework and communication across disconnected spreadsheets and manual processes.",
      solution:
        "A centralized multi-role platform giving administrators, branch administrators, teachers, parents and students role-specific access to school operations.",
      features: [
        "Role-based access for Admin, Branch Admin, Teacher, Parent and Student",
        "School and branch management",
        "Student admission and profiles",
        "Teacher profiles and assignments",
        "Daily and monthly attendance",
        "Homework",
        "Timetables",
        "Fee-management workflows",
        "Communication",
        "Reports and dashboards",
        "Audit logging",
      ],
      technicalDecisions: [
        "Next.js frontend",
        "Tailwind CSS styling",
        "Role-aware views and sign-in flows",
        "Deployed on Vercel",
      ],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
      note: "Demo build in development — sign-in flows and data are simulated with mock data while the platform evolves toward production.",
    },
  },
  "https://skr-e-commerce.netlify.app/": {
    description: "Full-stack MERN e-commerce — catalog, cart, and deployed demo.",
    tags: ["MERN", "React", "Node.js"],
    status: "client",
    details: {
      role: "Developer",
      problemSolved: "Full-stack MERN e-commerce flow — catalog through checkout-ready cart.",
      features: ["Product catalog", "Cart", "MERN backend"],
      technicalDecisions: ["React + Node.js + Express + MongoDB"],
      challenges: DETAILS_PLACEHOLDER.challenges,
      results: DETAILS_PLACEHOLDER.results,
    },
  },
  "https://sravan-gym.netlify.app": {
    description: "Gym landing experience built with TypeScript and responsive layout.",
    tags: ["TypeScript", "React"],
    status: "learning",
  },
  "https://sravan-quizlet-landingpage.netlify.app/": {
    description: "Quizlet-style marketing page — layout and typography practice.",
    tags: ["TypeScript", "CSS"],
    status: "learning",
  },
  "https://task-breaks.netlify.app/": {
    description: "Pomodoro-style task and break timer.",
    tags: ["TypeScript", "React"],
    status: "learning",
  },
  "https://fanciful-kitten-112003.netlify.app/": {
    description: "UI clone exercise — component structure and styling.",
    tags: ["React", "CSS"],
    status: "learning",
  },
  "https://van-life2.netlify.app/": {
    description: "Van life marketing layout — responsive React + CSS.",
    tags: ["React", "CSS"],
    status: "learning",
  },
  "https://sravan-nike.netlify.app": {
    description: "Nike-style landing page with Tailwind utility patterns.",
    tags: ["Tailwind", "React"],
    status: "learning",
  },
  "https://stripedemo1.netlify.app/": {
    description: "Stripe-style layout using CSS Grid.",
    tags: ["CSS", "Grid"],
    status: "learning",
  },
  "https://sravan-cubedemo.netlify.app/": {
    description: "3D cube CSS animation demo.",
    tags: ["CSS", "Animation"],
    status: "learning",
  },
  "https://sravan-solarsystemdemo.netlify.app/": {
    description: "Solar system CSS animation study.",
    tags: ["CSS", "Animation"],
    status: "learning",
  },
  "https://jsfiddle.net/pvskr/pnfjt029/20/": {
    description: "Bootstrap card layout experiment.",
    tags: ["Bootstrap"],
    status: "learning",
  },
  "https://new-buy-me.netlify.app/": {
    description: "JavaScript DOM and UI interaction practice.",
    tags: ["JavaScript"],
    status: "learning",
  },
  "https://jsfiddle.net/pvskr/4ygntpoq/28/": {
    description: "Netflix landing page clone in vanilla JS.",
    tags: ["JavaScript", "HTML"],
    status: "learning",
  },
  "https://sravanotp-project.netlify.app/": {
    description: "OTP input UI built with semantic HTML.",
    tags: ["HTML", "CSS"],
    status: "learning",
  },
};

const defaultMeta = (courseName: string): {
  description: string;
  tags: string[];
  status: ProjectStatus;
} => ({
  description: `${courseName} project — UI and implementation practice.`,
  tags: [courseName],
  status: "learning",
});

function enrichProject(
  project: { src: string; title: string; name: string; link: string },
  courseName: string,
  summary: string,
  language?: { src: string; alt: string; name: string }
): FlatProject {
  const meta = PROJECT_META[project.link] ?? defaultMeta(courseName);

  return {
    ...project,
    courseName,
    summary,
    description: meta.description,
    tags: meta.tags,
    status: meta.status,
    alt: meta.alt,
    details: meta.details,
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
  return getAllProjects().filter((p) => p.status === "production");
}

export function getBetaProjects(): FlatProject[] {
  return getAllProjects().filter((p) => p.status === "beta");
}

export function getClientProjects(): FlatProject[] {
  return getAllProjects().filter(
    (p) => p.status === "client" || p.status === "client-demo"
  );
}

export function getLearningProjects(): FlatProject[] {
  return getAllProjects().filter((p) => p.status === "learning");
}

/** Featured grid — production apps only, stable order */
export function getFeaturedProjects(): FlatProject[] {
  const production = getProductionProjects();
  const ordered = featuredProjectOrder.flatMap((item) => {
    const match = production.find((p) => p.link === item.link);
    return match ? [match] : [];
  });
  const seen = new Set(ordered.map((p) => p.link));
  const rest = production.filter((p) => !seen.has(p.link));
  return [...ordered, ...rest];
}

export const portfolioStats = {
  projectCount: getAllProjects().length,
  productionCount: getProductionProjects().length,
  betaCount: getBetaProjects().length,
  technologyStacks: courses.length,
  yearsExperience: "3+",
} as const;

export const aboutContent = {
  badge: "About me",
  headline: "Building products people actually use",
  paragraphs: [
    "I'm a MERN stack developer who builds web products end-to-end — from React and Next.js interfaces to APIs and deployment on Netlify and Vercel.",
    "My experience spans freelance and contract work with clients, plus my own independent products like DebiasDaily, BloomMind Tracker, and NexCartis.",
    "I focus on clean component architecture, responsive UI, and shipping on time. I work best with defined scope, regular feedback, and clear outcomes.",
  ],
  highlights: [
    { label: "Production apps", value: String(portfolioStats.productionCount) },
    { label: "Portfolio projects", value: String(portfolioStats.projectCount) },
    { label: "Years building", value: portfolioStats.yearsExperience },
  ],
  location: "India · Remote-friendly",
} as const;

export const careerTimeline = [
  {
    period: "2023 – Present",
    title: "Independent products",
    org: "Personal projects",
    description:
      "Designed, built, and shipped products including DebiasDaily, BloomMind Tracker, NexCartis, ChronoBloom, and Boostlly — from component architecture through deployment.",
  },
  {
    period: "2022 – Present",
    title: "Freelance & contract",
    org: "Fiverr and direct clients",
    description:
      "Delivered responsive React and Next.js applications from scoped requirements through deployment, iterating quickly on UI and performance feedback.",
  },
] as const;

export const contactLinks = {
  email: footerLinks[0].links.find((l) => l.link.startsWith("mailto:"))!,
  linkedIn: socialMedia.find((s) => s.name === "LinkedIn")!,
  github: socialMedia.find((s) => s.name === "GitHub")!,
  x: socialMedia.find((s) => s.name === "X")!,
};
