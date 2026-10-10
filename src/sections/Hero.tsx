import React, { useState } from "react";
import skr from "../assets/images/skr.webp";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { CustomButton as Button } from "../components/ui/Button";
import { useAccessibility } from "../hooks/useAccessibility";
import { FiArrowRight } from "react-icons/fi";
import { contactLinks, featuredProjectOrder } from "../constants/portfolio";

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

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div ref={heroRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-5">
                <span className="text-cyan-400 text-sm font-medium">
                  Available for freelance, contract & full-time · Remote-friendly
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-[1.1] tracking-tight">
                <span className="block text-white">Hi, I&apos;m</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Sravan Kumar Polu
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-cyan-400/90 font-medium mb-3">
                React &amp; Next.js Full-Stack Developer · React · TypeScript · Node.js
              </p>

              <p className="text-base sm:text-lg text-neutral-300 mb-4 max-w-xl leading-relaxed">
                I build production React and Next.js apps end-to-end — UI, APIs, and deployment
                on Vercel and Netlify.
              </p>
              <p className="text-sm text-neutral-300 mb-6 max-w-xl leading-relaxed">
                Flagship projects:{" "}
                {featuredProjectOrder.map((project, index) => (
                  <React.Fragment key={project.link}>
                    {index > 0 && (
                      <span className="text-neutral-500 mx-1" aria-hidden>
                        ·
                      </span>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-cyan-300 hover:text-cyan-100 underline underline-offset-4 decoration-cyan-500/50 transition-colors"
                    >
                      {project.name}
                    </a>
                  </React.Fragment>
                ))}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-3 sm:gap-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo("work")}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 border-0 shadow-lg shadow-cyan-500/20 px-6 sm:px-7 focus-visible:ring-cyan-400"
                >
                  View Featured Work
                  <FiArrowRight className="w-5 h-5" aria-hidden />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollTo("contact")}
                  className="w-full sm:w-auto border-2 border-cyan-400/50 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-500/10 hover:text-white px-6 sm:px-7 focus-visible:ring-cyan-400"
                >
                  Discuss your project
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-neutral-400">Also on</span>
                {[contactLinks.linkedIn, contactLinks.github, contactLinks.fiverr, contactLinks.x].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-lg border border-white/15 bg-white/5 text-sm text-neutral-200 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                  >
                    {social.icon ? (
                      <social.icon className="w-4 h-4 opacity-80" aria-hidden />
                    ) : (
                      social.src && (
                        <img src={social.src} alt="" className="w-4 h-4 invert opacity-80" width={16} height={16} />
                      )
                    )}
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/25 to-blue-600/25 blur-2xl"
                  aria-hidden
                />
                <motion.div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-[2rem] p-1.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-2xl shadow-cyan-500/25"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={() => setIsHovered(true)}
                  style={{
                    rotateX: shouldReduceMotion ? 0 : rotateX,
                    rotateY: shouldReduceMotion ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-neutral-900">
                    <img
                      src={skr}
                      alt="Sravan Kumar Polu — React & Next.js full-stack developer"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={320}
                      height={320}
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-[1.6rem] bg-cyan-500/20 pointer-events-none"
                    animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/80 backdrop-blur px-4 py-2 text-xs sm:text-sm shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                  <span className="text-neutral-200">Open to work · Remote</span>
                </div>
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cyan-400/40 blur-[1px]" aria-hidden />
                <div className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-blue-500/40" aria-hidden />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 lg:mt-12"
          >
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-white/10 bg-white/5 text-sm sm:text-base">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span className="text-neutral-300 font-medium">Latest build:</span>
              <a
                href="https://skr-e-commerce.netlify.app/"
                className="font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-4 decoration-cyan-500/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                SKR E-Commerce
              </a>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                Full-Stack MERN
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
