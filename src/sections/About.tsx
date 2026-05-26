import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import SectionShell from "../components/SectionShell";
import { aboutContent } from "../constants/portfolio";
import skr from "../assets/images/skr.png";

const About: React.FC = () => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  return (
    <SectionShell id="about">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
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
            <p className="mt-6 text-sm text-cyan-400/90 font-medium">{aboutContent.location}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src={skr}
                alt="Sravan Kumar Polu"
                className="w-20 h-20 rounded-xl object-cover border border-white/20"
                width={80}
                height={80}
                loading="lazy"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Sravan Kumar Polu</h3>
                <p className="text-neutral-400">MERN Stack Developer · React · Next.js</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
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
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
};

export default About;
