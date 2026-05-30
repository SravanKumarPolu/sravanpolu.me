import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { portfolioStats } from "../constants/portfolio";
import FeaturedWork from "../components/FeaturedWork";
import LearningProjects from "../components/LearningProjects";
import SectionShell from "../components/SectionShell";

const Work: React.FC = () => {
  const { ref: workRef, inView } = useScrollAnimation(0.1, true);

  return (
    <SectionShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          ref={workRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-left mb-12 max-w-3xl"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-4 sm:mb-6">
            <span className="text-cyan-400 text-sm font-medium">Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-[1.2] tracking-tight">
            Selected{" "}
            <span className="text-cyan-400">projects</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl">
            {portfolioStats.productionCount} production apps and {portfolioStats.projectCount} total
            projects in this portfolio — led with React, Next.js, and TypeScript.
          </p>
        </motion.div>

        <FeaturedWork />
        <LearningProjects />
      </div>
    </SectionShell>
  );
};

export default Work;
