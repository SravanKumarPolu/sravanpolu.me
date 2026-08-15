import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DETAILS_PLACEHOLDER, type FlatProject } from "../constants/portfolio";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectImage from "./ProjectImage";
import { FiBookOpen, FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  project: FlatProject;
  index?: number;
  featured?: boolean;
}

const toSlug = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const CaseStudyField: React.FC<{
  label: string;
  value?: string;
  items?: string[];
}> = ({ label, value, items }) => {
  const isPlaceholder =
    value === DETAILS_PLACEHOLDER.challenges ||
    value === DETAILS_PLACEHOLDER.results;

  if (isPlaceholder) return null;

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">
        {label}
      </dt>
      {items ? (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-neutral-200"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <dd className="text-sm leading-relaxed text-neutral-300">{value}</dd>
      )}
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, featured = false }) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const hasDetails = Boolean(project.details);
  const slug = toSlug(project.name);
  const titleId = `project-title-${slug}`;
  const caseStudyId = `project-case-study-${slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-cyan-400/40 transition-colors ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden border-b border-white/10 ${
          featured ? "lg:border-b-0 lg:border-r lg:min-h-[400px]" : ""
        }`}
      >
        <div className={`aspect-[16/10] ${featured ? "lg:aspect-auto lg:absolute lg:inset-0" : ""}`}>
          <ProjectImage
            src={project.src}
            alt={project.alt ?? `${project.title} screenshot`}
            title={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
            width={640}
            height={400}
          />
        </div>
        <div className="absolute top-3 left-3">
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <div className={`p-5 flex flex-col flex-1 ${featured ? "lg:p-8 lg:justify-center" : ""}`}>
        <h4 id={titleId} className="text-lg font-bold text-white mb-2">
          {project.title}
        </h4>
        <p className="text-sm text-neutral-400 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-cyan-300/90"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px]"
          >
            <FiExternalLink className="w-4 h-4" aria-hidden />
            View live
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-200 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px]"
            >
              <FiGithub className="w-4 h-4" aria-hidden />
              GitHub
            </a>
          )}
          {hasDetails && (
            <button
              type="button"
              onClick={() => setShowCaseStudy((value) => !value)}
              aria-expanded={showCaseStudy}
              aria-controls={caseStudyId}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-200 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px]"
            >
              <FiBookOpen className="w-4 h-4" aria-hidden />
              View details
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {showCaseStudy && project.details && (
            <motion.div
              id={caseStudyId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <dl className="mt-5 pt-5 border-t border-white/10 grid gap-4 sm:grid-cols-2">
                <CaseStudyField label="Role" value={project.details.role} />
                <CaseStudyField
                  label="Problem solved"
                  value={project.details.problemSolved}
                />
                {project.details.solution && (
                  <CaseStudyField
                    label="Solution"
                    value={project.details.solution}
                  />
                )}
                <CaseStudyField label="Features" items={project.details.features} />
                <CaseStudyField
                  label="Technical decisions"
                  items={project.details.technicalDecisions}
                />
                <CaseStudyField
                  label="Challenges"
                  value={project.details.challenges}
                />
                <CaseStudyField label="Results" value={project.details.results} />
                {project.details.note && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                      Development status
                    </dt>
                    <dd className="text-sm leading-relaxed text-neutral-300">
                      {project.details.note}
                    </dd>
                  </div>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
