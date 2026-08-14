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
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FiCloud, FiLink } from "react-icons/fi";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type SkillTierKey = "production" | "working" | "familiar" | "learning";

interface Skill {
  name: string;
  icon: Icon;
  projects: { name: string; link: string; internal?: boolean }[];
  note?: string;
}

interface TierMeta {
  key: SkillTierKey;
  label: string;
  description: string;
  badge: string;
  border: string;
}

const TIERS: TierMeta[] = [
  {
    key: "production",
    label: "Production experience",
    description: "Shipped and kept live in products.",
    badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
    border: "hover:border-emerald-400/40",
  },
  {
    key: "working",
    label: "Working knowledge",
    description: "Used across client and personal projects — confident building and shipping with these.",
    badge: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300",
    border: "hover:border-cyan-400/40",
  },
  {
    key: "familiar",
    label: "Familiar",
    description: "Comfortable working with these in side projects and experiments.",
    badge: "border-violet-500/30 bg-violet-500/15 text-violet-300",
    border: "hover:border-violet-400/40",
  },
  {
    key: "learning",
    label: "Currently learning",
    description: "Actively exploring and applying in practice.",
    badge: "border-amber-500/30 bg-amber-500/15 text-amber-300",
    border: "hover:border-amber-400/40",
  },
];

const SKILLS: Record<SkillTierKey, Skill[]> = {
  production: [
    {
      name: "React",
      icon: SiReact,
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "NexCartis", link: "https://nextcartis.netlify.app/" },
        { name: "Boostlly", link: "https://boostlly.netlify.app/" },
      ],
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "BloomMind", link: "https://bloommind-tracker.netlify.app/" },
        { name: "ChronoBloom", link: "https://chronobloom.netlify.app/" },
      ],
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "BloomMind", link: "https://bloommind-tracker.netlify.app/" },
        { name: "NexCartis", link: "https://nextcartis.netlify.app/" },
        { name: "ChronoBloom", link: "https://chronobloom.netlify.app/" },
        { name: "Boostlly", link: "https://boostlly.netlify.app/" },
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        { name: "NexCartis", link: "https://nextcartis.netlify.app/" },
        { name: "Nike landing", link: "https://sravan-nike.netlify.app" },
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
    {
      name: "REST APIs",
      icon: FiLink,
      projects: [{ name: "E-commerce store", link: "https://skr-e-commerce.netlify.app/" }],
    },
  ],
  working: [
    {
      name: "Node.js",
      icon: SiNodedotjs,
      projects: [{ name: "E-commerce store", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "Express.js",
      icon: SiExpress,
      projects: [{ name: "E-commerce store", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      projects: [{ name: "E-commerce store", link: "https://skr-e-commerce.netlify.app/" }],
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      projects: [
        { name: "buyMe", link: "https://new-buy-me.netlify.app/" },
        { name: "Netflix clone", link: "https://jsfiddle.net/pvskr/4ygntpoq/28/" },
      ],
    },
    {
      name: "Git",
      icon: SiGit,
      projects: [{ name: "GitHub", link: "https://github.com/SravanKumarPolu" }],
    },
    {
      name: "Netlify",
      icon: SiNetlify,
      projects: [{ name: "BloomMind", link: "https://bloommind-tracker.netlify.app/" }],
    },
    {
      name: "Vercel",
      icon: SiVercel,
      projects: [
        { name: "DebiasDaily", link: "https://debiasdaily.com/" },
        {
          name: "Smart Training & School Management",
          link: "https://smart-training-school-management-de.vercel.app/",
        },
      ],
    },
  ],
  familiar: [
    {
      name: "Framer Motion",
      icon: SiFramer,
      projects: [{ name: "Portfolio projects", link: "#work", internal: true }],
    },
    {
      name: "Figma",
      icon: SiFigma,
      projects: [{ name: "Portfolio and product design", link: "#work", internal: true }],
    },
    {
      name: "Three.js",
      icon: SiThreedotjs,
      projects: [
        { name: "3D cube", link: "https://sravan-cubedemo.netlify.app/" },
        { name: "Solar system", link: "https://sravan-solarsystemdemo.netlify.app/" },
      ],
    },
    {
      name: "Docker",
      icon: SiDocker,
      projects: [],
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      note: "Experience: Familiar",
      projects: [],
    },
    {
      name: "AWS",
      icon: FiCloud,
      projects: [],
    },
  ],
  learning: [
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      projects: [],
    },
    {
      name: "GraphQL",
      icon: SiGraphql,
      projects: [],
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
                      className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-colors duration-300 ${tier.border}`}
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
                      {skill.note ? (
                        <p className="text-xs text-neutral-400 leading-relaxed">{skill.note}</p>
                      ) : skill.projects.length > 0 ? (
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Used in:{" "}
                          {skill.projects.map((project, projectIndex) => (
                            <React.Fragment key={project.link}>
                              {projectIndex > 0 && <span className="text-neutral-600">, </span>}
                              <a
                                href={project.link}
                                target={project.internal ? undefined : "_blank"}
                                rel={project.internal ? undefined : "noopener noreferrer"}
                                className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2 decoration-cyan-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm transition-colors"
                              >
                                {project.name}
                              </a>
                            </React.Fragment>
                          ))}
                        </p>
                      ) : (
                        <p className="text-xs italic text-neutral-500">Details to be added.</p>
                      )}
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
