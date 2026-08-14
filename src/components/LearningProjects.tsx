import React from "react";
import { motion } from "framer-motion";
import { getLearningProjects } from "../constants/portfolio";
import ProjectStatusBadge from "./ProjectStatusBadge";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

const LearningProjects: React.FC = () => {
  const projects = getLearningProjects();

  return (
    <details className="group mt-16 rounded-2xl border border-white/10 bg-white/5 open:bg-white/[0.07]">
      <summary className="cursor-pointer list-none px-5 py-5 sm:px-6 sm:py-6 min-h-[48px] flex items-center justify-between gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">Learning projects</h3>
          <p className="text-sm text-neutral-400 mt-1">
            {projects.length} clones and practice projects — expand to browse
          </p>
        </div>
        <FiChevronDown
          className="w-5 h-5 text-cyan-400 shrink-0 group-open:rotate-180 transition-transform"
          aria-hidden
        />
      </summary>
      <div className="px-5 pb-6 sm:px-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.article
            key={`${project.link}-${project.name}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="flex flex-col rounded-xl border border-white/10 hover:border-cyan-400/30 bg-neutral-950/50 overflow-hidden transition-colors"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
              <img
                src={project.src}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={640}
                height={400}
              />
              <div className="absolute top-2 left-2">
                <ProjectStatusBadge status="learning" />
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="font-semibold text-white">{project.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{project.courseName}</p>
              <p className="text-sm text-neutral-400 mt-1 flex-1 leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 -mx-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px]"
              >
                <FiExternalLink className="w-4 h-4" aria-hidden />
                Live demo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </details>
  );
};

export default LearningProjects;
