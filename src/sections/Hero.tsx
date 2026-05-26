import DownArrow from "../components/DownArrow";
import React, { useState } from "react";
import skr from "../assets/images/skr.png";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { CustomButton as Button } from "../components/ui/Button";
import { useAccessibility } from "../hooks/useAccessibility";
import { FiDownload } from "react-icons/fi";

const Hero: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const { ref: heroRef, inView } = useScrollAnimation(0.1, true);
  const { shouldReduceMotion } = useAccessibility();

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(((e.clientX - centerX) / rect.width) * 0.2);
    mouseY.set(((e.clientY - centerY) / rect.height) * 0.2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const scrollTo = (id: string) => {
    triggerHaptic("light");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    triggerHaptic("medium");
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Sravan_Kumar_Polu_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div ref={heroRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-6">
                <span className="text-cyan-400 text-sm font-medium">
                  Open to full-time & contract · Remote-friendly
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight">
                <span className="block text-white">Hi, I&apos;m</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Sravan Kumar Polu
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-cyan-400/90 font-medium mb-4">
                MERN Stack Developer · React · TypeScript · Next.js
              </p>

              <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-xl leading-relaxed">
                I build production web apps end-to-end — from UI and APIs to deployment on
                Netlify and Vercel.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo("work")}
                  className="px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-full sm:w-auto"
                >
                  View featured work
                  <DownArrow />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadResume}
                  className="px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold rounded-xl border-2 border-white/30 text-white hover:border-cyan-400 hover:bg-cyan-500/20 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <FiDownload className="w-5 h-5" aria-hidden />
                  Download resume
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollTo("contact")}
                  className="px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold rounded-xl border-2 border-white/20 text-neutral-200 hover:border-white/40 w-full sm:w-auto"
                >
                  Contact me
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <motion.div
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl border border-white/20 shadow-xl overflow-hidden bg-gradient-to-br from-cyan-600/30 to-violet-600/30 p-1"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
                style={{
                  rotateX: shouldReduceMotion ? 0 : rotateX,
                  rotateY: shouldReduceMotion ? 0 : rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={skr}
                  alt="Sravan Kumar Polu - MERN Stack Developer"
                  className="w-full h-full rounded-xl object-cover"
                  loading="eager"
                  width={256}
                  height={256}
                  fetchPriority="high"
                />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-cyan-500/20 pointer-events-none"
                  animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-white/10 bg-white/5 text-sm sm:text-base">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span className="text-neutral-300 font-medium">Currently building:</span>
              <a
                href="https://skr-e-commerce.netlify.app/"
                className="font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-4 decoration-cyan-500/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                E-commerce Store
              </a>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                MERN Stack
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
