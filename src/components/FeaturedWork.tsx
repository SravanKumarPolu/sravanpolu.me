import React from "react";
import { motion } from "framer-motion";
import { getFeaturedProjects, type FlatProject } from "../constants/portfolio";
import { CustomButton as Button } from "./ui/Button";

const FeaturedWork: React.FC = () => {
  const featured = getFeaturedProjects();

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Featured work</h3>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
          Production and beta apps — full portfolio by technology is below.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {featured.map((project, index) => (
          <FeaturedCard key={`${project.link}-${project.name}`} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const FeaturedCard: React.FC<{ project: FlatProject; index: number }> = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-cyan-400/40 transition-colors"
  >
    <div className="aspect-video overflow-hidden border-b border-white/10">
      <img
        src={project.src}
        alt={`${project.title} screenshot`}
        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        {project.language?.src && (
          <img src={project.language.src} alt="" className="w-6 h-6 rounded-full" width={24} height={24} />
        )}
        <span className="text-xs font-medium text-cyan-400/90 uppercase tracking-wide">
          {project.courseName}
        </span>
      </div>
      <h4 className="text-lg font-bold text-white mb-1">{project.title}</h4>
      <p className="text-sm text-neutral-400 mb-4 flex-1 line-clamp-2">{project.summary}</p>
      <Button
        variant="primary"
        size="sm"
        onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg"
      >
        View live
      </Button>
    </div>
  </motion.article>
);

export default FeaturedWork;
