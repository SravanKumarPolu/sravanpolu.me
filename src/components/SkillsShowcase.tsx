import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { useAccessibility } from "../hooks/useAccessibility";
import SectionShell from "./SectionShell";
import { levelToProficiency, portfolioStats } from "../constants/portfolio";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
  icon: string;
  color: string;
}

const skills: Skill[] = [
  { name: "React", level: 95, category: "frontend", icon: "⚛️", color: "from-blue-400 to-cyan-400" },
  { name: "TypeScript", level: 90, category: "frontend", icon: "🔷", color: "from-blue-500 to-blue-600" },
  { name: "Next.js", level: 88, category: "frontend", icon: "▲", color: "from-slate-500 to-slate-700" },
  { name: "Three.js", level: 85, category: "frontend", icon: "🎮", color: "from-purple-400 to-pink-400" },
  { name: "Tailwind CSS", level: 92, category: "frontend", icon: "🎨", color: "from-cyan-400 to-blue-500" },
  { name: "Framer Motion", level: 87, category: "frontend", icon: "✨", color: "from-pink-400 to-purple-500" },
  { name: "Node.js", level: 90, category: "backend", icon: "🟢", color: "from-green-400 to-green-600" },
  { name: "Express.js", level: 88, category: "backend", icon: "🚀", color: "from-slate-500 to-slate-700" },
  { name: "MongoDB", level: 85, category: "backend", icon: "🍃", color: "from-green-500 to-green-700" },
  { name: "PostgreSQL", level: 82, category: "backend", icon: "🐘", color: "from-blue-600 to-blue-800" },
  { name: "GraphQL", level: 80, category: "backend", icon: "🔺", color: "from-pink-500 to-purple-600" },
  { name: "REST APIs", level: 93, category: "backend", icon: "🔗", color: "from-orange-400 to-red-500" },
  { name: "Git", level: 90, category: "tools", icon: "📚", color: "from-orange-500 to-red-600" },
  { name: "Docker", level: 75, category: "tools", icon: "🐳", color: "from-blue-400 to-blue-600" },
  { name: "AWS", level: 70, category: "tools", icon: "☁️", color: "from-orange-400 to-yellow-500" },
  { name: "Vercel", level: 85, category: "tools", icon: "▲", color: "from-slate-500 to-slate-700" },
  { name: "Figma", level: 80, category: "tools", icon: "🎨", color: "from-purple-400 to-pink-500" },
  { name: "VS Code", level: 95, category: "tools", icon: "💻", color: "from-blue-500 to-blue-700" },
  { name: "UI/UX Design", level: 85, category: "design", icon: "🎯", color: "from-purple-400 to-pink-400" },
  { name: "3D Design", level: 80, category: "design", icon: "🎮", color: "from-cyan-400 to-blue-500" },
  { name: "Animation", level: 88, category: "design", icon: "✨", color: "from-pink-400 to-purple-500" },
  { name: "Prototyping", level: 82, category: "design", icon: "🔧", color: "from-orange-400 to-red-500" },
];

const categories = [
  { key: "frontend" as const, label: "Frontend", icon: "💻" },
  { key: "backend" as const, label: "Backend", icon: "⚙️" },
  { key: "tools" as const, label: "Tools", icon: "🛠️" },
  { key: "design" as const, label: "Design", icon: "🎨" },
];

const proficiencyBadgeClass: Record<string, string> = {
  Production: "text-cyan-300 bg-cyan-500/15",
  Proficient: "text-emerald-300 bg-emerald-500/15",
  Comfortable: "text-violet-300 bg-violet-500/15",
  Familiar: "text-neutral-300 bg-white/10",
};

const SkillsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Skill["category"]>("frontend");
  const { triggerHaptic } = useHaptic();
  const { shouldReduceMotion } = useAccessibility();

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  const handleCategoryChange = (category: Skill["category"]) => {
    setActiveCategory(category);
    triggerHaptic("light");
  };

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
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Full skill list across {skills.length} technologies — proficiency reflects hands-on
            project use.
          </p>
        </motion.div>

        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-3 mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => handleCategoryChange(category.key)}
              className={`snap-start shrink-0 px-5 sm:px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                activeCategory === category.key
                  ? "bg-white text-neutral-900 shadow-lg shadow-white/10"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
              aria-pressed={activeCategory === category.key}
            >
              <span className="text-lg" aria-hidden>
                {category.icon}
              </span>
              {category.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredSkills.map((skill, index) => {
              const proficiency = levelToProficiency(skill.level);
              return (
                <motion.article
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                  }}
                  className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] hover:border-cyan-400/30 hover:from-white/15 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0" aria-hidden>
                        {skill.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-white truncate">{skill.name}</h3>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${proficiencyBadgeClass[proficiency]}`}
                    >
                      {proficiency}
                    </span>
                  </div>

                  <div
                    className="w-full h-2 rounded-full bg-neutral-800/80 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} experience level`}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 1.2,
                        delay: shouldReduceMotion ? 0 : index * 0.08 + 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {[
            { label: "Skills listed", value: skills.length },
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
