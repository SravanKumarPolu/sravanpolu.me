import React from "react";
import { motion } from "framer-motion";
import { getFeaturedProjects, type FlatProject } from "../constants/portfolio";
import { CustomButton as Button } from "./ui/Button";

const FeaturedWork: React.FC = () => {
  const featured = getFeaturedProjects();

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Production work</h3>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
          Apps I&apos;ve built and shipped — live demos below. Learning exercises are in a separate list.
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
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-cyan-300/90"
          >
            {tag}
          </span>
        ))}
      </div>
      <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
      <p className="text-sm text-neutral-400 mb-4 flex-1 leading-relaxed">{project.description}</p>
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
