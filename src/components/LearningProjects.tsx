import React from "react";
import { motion } from "framer-motion";
import { getLearningProjects } from "../constants/portfolio";

const LearningProjects: React.FC = () => {
  const projects = getLearningProjects();

  return (
    <details className="group mt-12 rounded-2xl border border-white/10 bg-white/5 open:bg-white/[0.07]">
      <summary className="cursor-pointer list-none px-5 py-5 sm:px-6 sm:py-6 min-h-[48px] flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">Learning & UI exercises</h3>
          <p className="text-sm text-neutral-400 mt-1">
            {projects.length} clones and practice projects — expand to browse
          </p>
        </div>
        <span
          className="text-cyan-400 text-sm font-semibold shrink-0 group-open:rotate-180 transition-transform"
          aria-hidden
        >
          ▼
        </span>
      </summary>
      <div className="px-5 pb-6 sm:px-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.a
            key={`${project.link}-${project.name}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="flex gap-4 p-4 rounded-xl border border-white/10 hover:border-cyan-400/30 bg-neutral-950/50 transition-colors"
          >
            <img
              src={project.src}
              alt=""
              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/10"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="min-w-0">
              <p className="font-semibold text-white truncate">{project.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{project.courseName}</p>
              <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </details>
  );
};

export default LearningProjects;
