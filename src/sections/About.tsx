import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import SectionShell from "../components/SectionShell";
import { aboutContent, careerTimeline } from "../constants/portfolio";
import skr from "../assets/images/skr.webp";
import { FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";

const About: React.FC = () => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  return (
    <SectionShell>
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 1, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-6">
              <span className="text-cyan-400 text-sm font-medium">{aboutContent.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {aboutContent.headline}
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              {aboutContent.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-400/90 font-medium">
              <FiMapPin className="w-4 h-4" aria-hidden />
              {aboutContent.location}
            </p>
            <div className="grid grid-cols-3 gap-3 mt-8">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white">{item.value}</div>
                  <div className="text-xs sm:text-sm text-neutral-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2" aria-label="Engineering practices">
              {aboutContent.practices.map((practice) => (
                <span
                  key={practice}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400" aria-hidden />
                  {practice}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src={skr}
                alt="Portrait of Sravan Kumar Polu"
                className="w-20 h-20 rounded-xl object-cover border border-white/20"
                width={80}
                height={80}
                loading="lazy"
              />
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
                  Available for freelance, contract & full-time
                </p>
                <p className="text-sm text-neutral-400">
                  Remote-friendly — India based, working worldwide.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <FiBriefcase className="w-4 h-4 text-cyan-400" aria-hidden />
                Career timeline
              </h3>
              <ol className="mt-5 space-y-0 relative">
                {careerTimeline.map((item, index) => (
                  <li key={item.title} className="relative pl-6 pb-8 last:pb-0">
                    {index < careerTimeline.length - 1 && (
                      <span
                        className="absolute left-[5px] top-3 bottom-0 w-px bg-white/15"
                        aria-hidden
                      />
                    )}
                    <span
                      className="absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border-2 border-cyan-400 bg-neutral-950"
                      aria-hidden
                    />
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                      <FiClock className="w-3.5 h-3.5" aria-hidden />
                      {item.period}
                    </p>
                    <h4 className="text-base font-semibold text-white mt-1">{item.title}</h4>
                    <p className="text-sm text-neutral-500 mt-0.5">{item.org}</p>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
};

export default About;
