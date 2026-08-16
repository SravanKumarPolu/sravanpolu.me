import { FiArrowUpRight, FiDownload, FiFileText } from "react-icons/fi";
import React from "react";
import { motion } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { useAnnouncement } from "../components/AnnouncementSystem";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useMediaQuery } from "@react-hook/media-query";
import SectionShell from "../components/SectionShell";
import { resumeProfile } from "../constants/resume-data";

const Resume: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const { announce } = useAnnouncement();
  const { ref: resumeRef, inView } = useScrollAnimation(0.1, true);
  const isDesktop = useMediaQuery("(min-width:768px)");

  const handleDownload = (): void => {
    triggerHaptic("medium");
    announce("Resume download started", "polite");
    try {
      const link = document.createElement("a");
      link.href = "/Resume.pdf";
      link.download = "Sravan_Kumar_Polu_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      announce("Resume downloaded successfully", "polite");
    } catch (error) {
      window.open("/Resume.pdf", "_blank");
      announce("Resume opened in new tab", "polite");
    }
  };

  return (
    <SectionShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            ref={resumeRef}
            initial={{ opacity: 1, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-4 sm:mb-6">
              <span className="text-cyan-400 text-sm font-medium">Resume</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-[1.2] tracking-tight">
              My <span className="text-cyan-400">resume</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 mb-4 leading-relaxed">
              One-page PDF covering experience, skills, and selected projects.
            </p>

            <p className="text-sm text-neutral-400 mb-6">
              Last updated:{" "}
              <span className="font-medium text-neutral-200">{resumeProfile.lastUpdated}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base sm:text-lg rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiDownload className="w-5 h-5" aria-hidden />
                Download PDF
              </motion.button>

              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/30 text-white font-semibold text-base sm:text-lg rounded-xl hover:border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                See my projects
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {isDesktop ? (
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-300">
                    <FiFileText className="w-4 h-4 text-cyan-400" aria-hidden />
                    Resume preview
                  </span>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                  >
                    Open PDF
                    <FiArrowUpRight className="w-4 h-4" aria-hidden />
                  </a>
                </div>
                <iframe
                  src="/resume-preview.html"
                  title="Sravan Kumar Polu Resume Preview"
                  className="block w-full h-[70vh] max-h-[760px] border-0 bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 text-sm text-neutral-300 mb-4">
                  <FiFileText className="w-4 h-4 text-cyan-400" aria-hidden />
                  Resume preview
                </span>
                <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                  The full PDF preview is best on a larger screen. You can still open the resume
                  directly — it downloads or opens in your device&apos;s PDF viewer.
                </p>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    if (!isDesktop) {
                      event.preventDefault();
                      handleDownload();
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-base font-semibold text-white hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[48px] transition-colors"
                >
                  <FiDownload className="w-5 h-5" aria-hidden />
                  Download resume PDF
                </a>
              </div>
            )}
          </motion.div>
        </div>

        <p className="text-center text-neutral-400 text-sm">
          Full skill list in the{" "}
          <a
            href="#skills"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
          >
            tech section
          </a>{" "}
          below.
        </p>
      </div>
    </SectionShell>
  );
};

export default Resume;
