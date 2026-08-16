import React from "react";
import { motion } from "framer-motion";
import {
  getBetaProjects,
  getClientProjects,
  getFeaturedProjects,
  contactLinks,
} from "../constants/portfolio";
import ProjectCard from "./ProjectCard";
import { FiMail } from "react-icons/fi";

const FeaturedWork: React.FC = () => {
  const featured = getFeaturedProjects();
  const beta = getBetaProjects();
  const client = getClientProjects();

  return (
    <div className="space-y-16">
      <section aria-labelledby="production-heading">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h3 id="production-heading" className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Production
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
            Apps I&apos;ve shipped and keep live — the strongest work in this portfolio.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6">
          {featured.map((project, index) => (
            <ProjectCard key={project.link} project={project} index={index} featured />
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
            Beta
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
            Working products still in active development — usable today, evolving toward production.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {beta.map((project, index) => (
            <ProjectCard key={project.link} project={project} index={index} />
          ))}
        </div>
      </section>

      <section aria-labelledby="client-heading">
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h3 id="client-heading" className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Client work
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
            Freelance projects delivered through Fiverr and direct contracts.
          </p>
        </motion.div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <p className="text-neutral-300 leading-relaxed max-w-2xl">
              I&apos;ve delivered responsive React and Next.js builds for clients on Fiverr
              and through direct contracts — from scoped requirements to deployment on
              Netlify and Vercel. Detailed client case studies are available on request.
            </p>
            <a
              href={contactLinks.email.link}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-neutral-200 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors min-h-[44px] shrink-0"
            >
              <FiMail className="w-4 h-4" aria-hidden />
              Request case studies
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {client.map((project, index) => (
              <ProjectCard key={project.link} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedWork;
