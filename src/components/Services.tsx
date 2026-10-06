import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../hooks/useAccessibility";
import SectionShell from "./SectionShell";
import { contactLinks } from "../constants/portfolio";
import {
  FiCode,
  FiBarChart2,
  FiLayout,
  FiTool,
  FiLink,
  FiUploadCloud,
  FiArrowRight,
} from "react-icons/fi";

const SERVICES = [
  {
    icon: FiCode,
    title: "React & Next.js Development",
    description:
      "Production-ready web applications built with React, Next.js and TypeScript — from first component to deployed product.",
  },
  {
    icon: FiBarChart2,
    title: "SaaS Dashboards & Admin Panels",
    description:
      "Dashboards, role-based applications, business workflows and internal tools — like the five-role school management platform in my work section.",
  },
  {
    icon: FiLayout,
    title: "Frontend from Figma / Designs",
    description:
      "Responsive, accessible implementation from Figma files or existing designs, using modern frontend technologies.",
  },
  {
    icon: FiTool,
    title: "Existing Application Improvements",
    description:
      "Bug fixing, responsive issues, refactoring, accessibility and performance improvements on codebases I didn't start.",
  },
  {
    icon: FiLink,
    title: "API Integration",
    description:
      "REST API integration, authentication, frontend/backend integration and third-party services — wired properly, with honest error handling.",
  },
  {
    icon: FiUploadCloud,
    title: "Deployment",
    description:
      "Deployment and production setup using platforms such as Vercel, Netlify and cloud services where appropriate.",
  },
];

const Services: React.FC = () => {
  const { shouldReduceMotion } = useAccessibility();

  return (
    <SectionShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-4">
            <span className="text-cyan-400 text-sm font-medium">Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What I can <span className="text-cyan-400">build for you</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Clear scope, regular updates, and honest timelines. Every engagement starts with a
            short conversation about what you need — no obligation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 1, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40 transition-colors"
              >
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 text-cyan-300 mb-4"
                  aria-hidden
                >
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            Have something in mind? Tell me the scope and timeline — I'll reply within 24–48
            hours.
          </p>
          <a
            href={contactLinks.email.link}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[48px] transition-colors shrink-0"
          >
            Discuss your project
            <FiArrowRight className="w-4 h-4" aria-hidden />
          </a>
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default Services;
