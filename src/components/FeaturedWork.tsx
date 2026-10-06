import React from "react";
import { motion } from "framer-motion";
import { getFlagshipProjects, getBetaProjects } from "../constants/portfolio";
import ProjectCard from "./ProjectCard";

const FeaturedWork: React.FC = () => {
  const flagship = getFlagshipProjects();
  const beta = getBetaProjects();

  return (
    <div className="space-y-16">
      <section aria-labelledby="flagship-heading">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h3 id="flagship-heading" className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Flagship projects
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
            The strongest work in this portfolio — full-stack, production and mobile builds with
            the engineering story behind each one.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6">
          {flagship.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} featured />
          ))}
        </div>
      </section>

      <section aria-labelledby="beta-heading">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h3 id="beta-heading" className="text-2xl sm:text-3xl font-bold text-white mb-2">
            More products
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
            Independent beta products — working today, labelled honestly about where they stand.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {beta.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedWork;
