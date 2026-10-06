import { courses, footerLinks, socialMedia } from "./index";

export type ProjectStatus =
  | "production"
  | "beta"
  | "client"
  | "client-demo"
  | "mobile"
  | "learning";

export type ProjectDetails = {
  role: string;
  /** First-person description of what I personally designed, built and shipped */
  contribution?: string;
  problemSolved: string;
  solution?: string;
  features: string[];
  technicalDecisions: string[];
  challenges: string;
  results: string;
  note?: string;
};

/** Hero quick links — flagship projects with live URLs */
export const featuredProjectOrder = [
  { name: "SKR E-Commerce", link: "https://skr-e-commerce.netlify.app/" },
  { name: "DebiasDaily", link: "https://debiasdaily.com/" },
  {
    name: "School Management",
    link: "https://smart-training-school-management-de.vercel.app/",
  },
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
    github?: string;
    details?: ProjectDetails;
  }
> = {
  "https://debiasdaily.com/": {
    description:
      "A Next.js and TypeScript microlearning product that teaches one cognitive bias per day in about two minutes.",
    tags: ["Next.js", "TypeScript", "PWA", "Tailwind"],
    status: "production",
    alt: "DebiasDaily cognitive bias learning application",
    github: "https://github.com/SravanKumarPolu/debias",
    details: {
      role: "Solo developer — product, design and engineering",
      contribution:
        "Designed and built the entire product myself: the 83-bias curriculum and daily rotation, Today / Explore / Quiz / Review / Saved flows, text-to-speech playback, offline PWA behaviour, consent-gated analytics and deployment.",
      problemSolved:
        "Learning about cognitive biases usually means dense, overwhelming material. DebiasDaily turns it into a two-minute daily habit with spaced repetition instead of a firehose.",
      features: [
        "83-bias curriculum with daily rotation and streaks",
        "Quiz, review and saved-bias flows",
        "Text-to-speech audio for every entry",
        "Installable, offline-capable PWA",
        "Privacy-first: no account, progress stays on-device",
      ],
      technicalDecisions: [
        "Next.js + React with TypeScript end-to-end for SEO and a fast first paint",
        "Local-first progress state — no accounts, so the privacy promise is structural, not a policy",
        "Web Speech API for TTS instead of pre-rendered audio, keeping the bundle small for 83 entries",
        "Error boundaries around each section so one failing widget never blanks the page",
      ],
      challenges:
        "Keeping the daily rotation, streaks and review state consistent without a backend: all progression logic had to survive reloads and offline use on-device, which pushed most complexity into careful local state design and storage handling.",
      results:
        "Shipped live on a custom domain (debiasdaily.com) with an 83-entry curriculum, installable offline PWA, TTS on every entry and consent-gated Google Analytics.",
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
    github: "https://github.com/SravanKumarPolu/Boostlly",
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
      "Multi-role school management SaaS demo using sample data — admissions, attendance, fees, homework, timetables, communication and reports across five user roles.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Role-based access"],
    status: "client-demo",
    github: "https://github.com/SravanKumarPolu/Smart-Training-School-Management-demo",
    details: {
      role: "Full-stack build — requirements, architecture, UI, data model and deployment",
      contribution:
        "I designed the multi-role architecture and built the application end-to-end: five role-specific dashboards, branch-scoped data access, the admissions-to-fees workflow, responsive UI, and deployment to Vercel.",
      problemSolved:
        "Schools manage admissions, attendance, fees, homework and communication across disconnected spreadsheets and manual processes. This demo shows what a single centralized platform would look like.",
      solution:
        "A centralized multi-role platform giving Admin, Branch Admin, Teacher, Parent and Student role-specific access to school operations, scoped per branch.",
      features: [
        "5 roles: Admin, Branch Admin, Teacher, Parent, Student",
        "School and branch management",
        "Student admissions and profiles",
        "Attendance (daily and monthly)",
        "Homework and timetables",
        "Fee-management workflows",
        "Parent communication",
        "Reports and dashboards",
        "Audit logging",
      ],
      technicalDecisions: [
        "Role-aware views and sign-in flows instead of one generic admin panel",
        "Branch-scoped data model so records never leak between branches",
        "Next.js + TypeScript + Tailwind CSS, deployed on Vercel",
        "Simulated data layer behind the same interfaces a real backend would implement",
      ],
      challenges:
        "Modelling overlapping permissions across five roles without leaking data across branches: every view and action had to be scoped by both role and branch, which shaped the routing and data-access design more than any single feature did.",
      results:
        "Deployed demo covering 5 role-based dashboards and the core admissions-to-fees workflow in one build.",
      note: "Demo application using sample data — sign-in flows are simulated and no real school data is used.",
    },
  },
  "https://skr-e-commerce.netlify.app/": {
    description:
      "Full-stack MERN e-commerce application — React/TypeScript storefront, Node.js/Express API and MongoDB, with retry-safe order processing.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Auth"],
    status: "client",
    github: "https://github.com/SravanKumarPolu/E-commerce-MERN-",
    details: {
      role: "Solo full-stack developer — frontend, API, database and deployment",
      contribution:
        "I built the entire stack myself: the React/TypeScript storefront, the Node.js/Express REST API, the MongoDB data model, authentication, the product catalog, cart, checkout and order flows, and the deployment.",
      problemSolved:
        "Small stores need a working online shop without heavyweight platforms — this project delivers the complete catalog-to-order flow as a self-contained MERN application, and doubles as proof I can own both frontend and backend.",
      features: [
        "Authentication and session handling",
        "Product catalog with product detail pages",
        "Cart and checkout flow",
        "Order creation with order history",
        "REST API behind the storefront",
      ],
      technicalDecisions: [
        "Idempotency keys on order creation: retried checkout requests reuse the original order instead of creating a duplicate",
        "Request payload hashing/validation so a re-submitted cart can't silently become a second order",
        "MongoDB unique constraints as a final database-level guard against duplicate orders",
        "MongoDB sessions/transactions where supported, so multi-step order writes commit or roll back together",
        "Retry-safe order processing — the client can safely retry failed submissions",
      ],
      challenges:
        "Duplicate orders from network retries: a slow checkout response followed by a retry would create two identical orders. Solved it in layers — idempotency keys and payload hashing at the API layer, unique constraints at the database layer — so a duplicate is impossible even if one layer is bypassed.",
      results:
        "Deployed end-to-end at skr-e-commerce.netlify.app with catalog, cart, authentication and duplicate-order prevention active in the order flow.",
    },
  },
  "#airsense": {
    alt: "AirSense air-quality companion app cover",
    description:
      "AirSense tells users not only what the air quality is, but how trustworthy the reading is and what they can practically do next.",
    tags: ["React Native", "Expo", "TypeScript", "REST APIs"],
    status: "mobile",
    details: {
      role: "Solo developer — product, data layer and mobile engineering",
      contribution:
        "I designed and built the app end-to-end: the environmental data layer with multiple providers, the recommendation engine, the confidence/provenance UI, and the EAS build pipeline.",
      problemSolved:
        "Most AQI apps show a single number with no context. AirSense adds what actually matters for a decision: how fresh and how trustworthy the reading is, and what you can realistically do right now.",
      features: [
        "Environmental data from multiple providers with automatic fallback",
        "Freshness handling — stale readings are labelled, not shown as current",
        "Provenance per reading: measured / predicted / estimated",
        "Confidence levels on every data point",
        "Air-quality forecast integration",
        "Recommendation engine: Best Outdoor Window and Daily Mission",
        "Real location handling",
      ],
      technicalDecisions: [
        "Expo / React Native with EAS builds for installable Android builds",
        "Provider fallback chain — when one environmental data source fails or returns stale data, the next takes over instead of the UI failing",
        "Every reading carries provenance and confidence, so the UI can be honest about uncertainty",
        "Recommendations are computed from forecast + confidence, not hardcoded thresholds alone",
      ],
      challenges:
        "Unreliable third-party environmental data: providers disagree, go down, and serve stale readings. I designed a fallback chain with freshness checks and provenance labelling so the app degrades honestly — showing 'estimated, 3 hours old' instead of pretending data is current.",
      results:
        "Working Expo app with EAS builds, automated tests for the core data logic, and a multi-provider data layer that survives provider outages.",
      note: "Mobile build — repository and install details available on request.",
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
    github: meta.github,
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

/** Flagship case studies — strongest full-stack, production, mobile and demo work, explicit order */
const FLAGSHIP_ORDER = [
  "https://skr-e-commerce.netlify.app/",
  "https://debiasdaily.com/",
  "https://smart-training-school-management-de.vercel.app/",
  "#airsense",
] as const;

export function getFlagshipProjects(): FlatProject[] {
  const all = getAllProjects();
  return FLAGSHIP_ORDER.flatMap((link) => all.filter((p) => p.link === link));
}

export const portfolioStats = {
  projectCount: getAllProjects().length,
  productionCount: getProductionProjects().length,
  betaCount: getBetaProjects().length,
  /** production + beta + client/demo products actually shipped and maintained */
  shippedCount: 7,
  /** full-stack builds: SKR E-Commerce (MERN) + School Management demo */
  fullStackCount: 2,
  technologyStacks: courses.length,
  yearsExperience: "3+",
} as const;

export const aboutContent = {
  badge: "About me",
  headline: "Building products people actually use",
  paragraphs: [
    "I'm a frontend / full-stack developer building web products with React, Next.js and TypeScript — from interface to API to deployment on Vercel and Netlify.",
    "My work spans freelance and contract client deliveries plus independent products — including SKR E-Commerce, a full-stack MERN build, and DebiasDaily, a live production Next.js app.",
    "I care about clean component architecture, honest status labels, and shipping on time. I work best with defined scope, regular feedback, and clear outcomes.",
  ],
  highlights: [
    { label: "Products shipped & maintained", value: String(portfolioStats.shippedCount) },
    { label: "Full-stack builds", value: String(portfolioStats.fullStackCount) },
    { label: "Years building", value: portfolioStats.yearsExperience },
  ],
  practices: [
    "GitHub Actions CI",
    "Automated tests",
    "Error boundaries",
    "Accessibility-first UI",
    "Prerendered SEO",
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
  fiverr: socialMedia.find((s) => s.name === "Fiverr")!,
  x: socialMedia.find((s) => s.name === "X")!,
};
