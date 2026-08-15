import React from "react";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../hooks/useAccessibility";
import SectionShell from "./SectionShell";
import { portfolioStats } from "../constants/portfolio";
import {
  SiBootstrap,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
import { BiLogoCss3 } from "react-icons/bi";
import { FaAws } from "react-icons/fa";
import { FiBarChart2, FiZap } from "react-icons/fi";
import { TbBrain } from "react-icons/tb";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type SkillTierKey = "production" | "project" | "familiar" | "learning";

interface ProjectRef {
  name: string;
  link?: string;
  internal?: boolean;
}

interface Skill {
  name: string;
  icon: Icon;
  evidence: string;
  projects: ProjectRef[];
}

interface TierMeta {
  key: SkillTierKey;
  label: string;
  description: string;
  badge: string;
}

const TIERS: TierMeta[] = [
  {
    key: "production",
    label: "Production experience",
    description: "Technologies verified in deployed, working products.",
    badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  },
  {
    key: "project",
    label: "Project experience",
    description: "Technologies verified in substantial beta, client or portfolio projects.",
    badge: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300",
  },
  {
    key: "familiar",
    label: "Familiar",
    description: "Technologies used in focused projects and practical exercises.",
    badge: "border-violet-500/30 bg-violet-500/15 text-violet-300",
  },
  {
    key: "learning",
    label: "Currently learning",
    description: "Technologies I am actively studying through courses and hands-on labs.",
    badge: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  },
];

const SKILLS: Record<SkillTierKey, Skill[]> = {
  production: [
    {
      name: "React",
      icon: SiReact,
      evidence: "Used in:",
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "this portfolio", link: "#work", internal: true },
      ],
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      evidence: "Used in:",
      projects: [{ name: "this portfolio", link: "#work", internal: true }],
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      evidence: "Used in:",
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
    {
      name: "Netlify",
      icon: SiNetlify,
      evidence: "Used in:",
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "SKR E-Commerce", link: "https://skr-e-commerce.netlify.app/" },
      ],
    },
  ],
  project: [
    {
      name: "Next.js",
      icon: SiNextdotjs,
      evidence: "Used in:",
      projects: [
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      evidence: "Used in:",
      projects: [{ name: "SKR E-Commerce", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "Express",
      icon: SiExpress,
      evidence: "Used in:",
      projects: [{ name: "SKR E-Commerce", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      evidence: "Used in:",
      projects: [{ name: "SKR E-Commerce", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "Vercel",
      icon: SiVercel,
      evidence: "Used in:",
      projects: [
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
    {
      name: "Git",
      icon: SiGit,
      evidence: "Used in:",
      projects: [
        { name: "All projects (GitHub)", link: "https://github.com/SravanKumarPolu" },
      ],
    },
    {
      name: "GitHub",
      icon: SiGithub,
      evidence: "Used in:",
      projects: [
        { name: "Project repositories", link: "https://github.com/SravanKumarPolu" },
      ],
    },
  ],
  familiar: [
    {
      name: "Framer Motion",
      icon: SiFramer,
      evidence: "Used in:",
      projects: [{ name: "Portfolio interactions", link: "#work", internal: true }],
    },
    {
      name: "Figma",
      icon: SiFigma,
      evidence: "Used for:",
      projects: [{ name: "Portfolio and product UI design", link: "#work", internal: true }],
    },
    {
      name: "Three.js",
      icon: SiThreedotjs,
      evidence: "Practised in:",
      projects: [
        { name: "3D Cube", link: "https://sravan-cubedemo.netlify.app/" },
        { name: "Solar System", link: "https://sravan-solarsystemdemo.netlify.app/" },
      ],
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      evidence: "Practised in:",
      projects: [{ name: "Responsive UI exercises" }],
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      evidence: "Practised in:",
      projects: [
        { name: "buyMe", link: "https://new-buy-me.netlify.app/" },
        { name: "Netflix clone" },
      ],
    },
    {
      name: "HTML",
      icon: SiHtml5,
      evidence: "Practised in:",
      projects: [{ name: "Semantic markup exercises", link: "https://sravanotp-project.netlify.app/" }],
    },
    {
      name: "CSS",
      icon: BiLogoCss3,
      evidence: "Practised in:",
      projects: [{ name: "Grid, Flexbox and animation exercises", link: "https://stripedemo1.netlify.app/" }],
    },
  ],
  learning: [
    {
      name: "Docker",
      icon: SiDocker,
      evidence: "Learning:",
      projects: [{ name: "Containers and local development environments" }],
    },
    {
      name: "AWS",
      icon: FaAws,
      evidence: "Learning:",
      projects: [{ name: "EC2, VPC, IAM, S3, RDS and cloud deployment" }],
    },
    {
      name: "GraphQL",
      icon: SiGraphql,
      evidence: "Learning:",
      projects: [{ name: "Queries, mutations and API integration" }],
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      evidence: "Learning:",
      projects: [{ name: "Relational data modelling and SQL fundamentals" }],
    },
    {
      name: "Prisma",
      icon: SiPrisma,
      evidence: "Learning:",
      projects: [{ name: "Database access and schema migrations" }],
    },
    {
      name: "Zustand",
      icon: TbBrain,
      evidence: "Learning:",
      projects: [{ name: "State management with a minimal API" }],
    },
    {
      name: "TanStack Query",
      icon: FiZap,
      evidence: "Learning:",
      projects: [{ name: "Server-state management with React Query" }],
    },
    {
      name: "React Hook Form",
      icon: SiReacthookform,
      evidence: "Learning:",
      projects: [{ name: "Form state and validation workflows" }],
    },
    {
      name: "Zod",
      icon: SiZod,
      evidence: "Learning:",
      projects: [{ name: "Runtime validation and type-safe schemas" }],
    },
    {
      name: "Recharts",
      icon: FiBarChart2,
      evidence: "Learning:",
      projects: [{ name: "Data visualisation with charts" }],
    },
  ],
};

const SkillsShowcase: React.FC = () => {
  const { shouldReduceMotion } = useAccessibility();
  const totalSkills = Object.values(SKILLS).reduce((sum, list) => sum + list.length, 0);

  return (
    <SectionShell variant="elevated">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Tech I ship with
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {totalSkills} technologies grouped by how I use them today — every tier is tied to
            real projects, not percentages.
          </p>
        </motion.div>

        <div className="space-y-10 sm:space-y-12">
          {TIERS.map((tier, tierIndex) => (
            <motion.section
              key={tier.key}
              aria-labelledby={`tier-${tier.key}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : tierIndex * 0.06,
              }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h3
                  id={`tier-${tier.key}`}
                  className="text-xl sm:text-2xl font-bold text-white"
                >
                  {tier.label}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tier.badge}`}
                >
                  {SKILLS[tier.key].length} technologies
                </span>
              </div>
              <p className="text-sm sm:text-base text-neutral-400 mb-5">{tier.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SKILLS[tier.key].map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <article
                      key={skill.name}
                      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white shrink-0"
                          aria-hidden
                        >
                          <IconComponent className="w-5 h-5" />
                        </span>
                        <h4 className="text-base font-semibold text-white">{skill.name}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        <span className="font-semibold text-neutral-200">{skill.evidence}</span>{" "}
                        {skill.projects.map((project, projectIndex) => (
                          <React.Fragment key={project.name}>
                            {projectIndex > 0 && <span className="text-neutral-500">, </span>}
                            {project.link ? (
                              <a
                                href={project.link}
                                target={project.internal ? undefined : "_blank"}
                                rel={project.internal ? undefined : "noopener noreferrer"}
                                className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2 decoration-cyan-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm transition-colors"
                              >
                                {project.name}
                              </a>
                            ) : (
                              <span>{project.name}</span>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </article>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {[
            { label: "Skills listed", value: totalSkills },
            { label: "Years building", value: portfolioStats.yearsExperience },
            { label: "Portfolio projects", value: portfolioStats.projectCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default SkillsShowcase;
