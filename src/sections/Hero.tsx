import DownArrow from "../components/DownArrow";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../assets/lottie/hero-animation.json";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import skr from "../assets/images/skr.png";
import { useHaptic } from "../hooks/useHaptic";
import { ParallaxBackground } from "../components/ParallaxBackground";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Button } from "../components/ui/Button";
// import { useTheme } from "../contexts/ThemeContext";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { useAccessibility } from "../hooks/useAccessibility";
import { ThemeSelector } from "../components/ui/ThemeSelector";
import { PerformanceDashboard } from "../components/ui/PerformanceDashboard";

const Hero: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const { ref: heroRef, inView } = useScrollAnimation(0.1, true);
  // const { currentTheme } = useTheme();
  const { shouldReduceMotion } = useAccessibility();
  
  // Performance monitoring
  usePerformanceMonitor('Hero', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true
  });

  // Advanced magnetic effects for profile image
  const [isHovered, setIsHovered] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) / rect.width;
    const distanceY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(distanceX * 0.3);
    mouseY.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };


  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 text-white overflow-hidden">
      
      {/* Advanced Parallax Background Layers */}
      <ParallaxBackground speed={0.2} opacity={0.3}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
      </ParallaxBackground>
      
      <ParallaxBackground speed={0.4} opacity={0.2}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </ParallaxBackground>
      
      <ParallaxBackground speed={0.6} opacity={0.1}>
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-500/10 to-transparent" />
      </ParallaxBackground>
      
      {/* Subtle Lottie animation */}
      <Lottie
        animationData={heroAnimation}
        loop
        className="absolute bottom-0 right-0 w-64 sm:w-80 opacity-20 z-0 pointer-events-none"
      />

      {/* Theme Selector & Performance Dashboard */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPerformanceDashboard(true)}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          📊
        </Button>
        <ThemeSelector size="lg" />
      </div>

      <div ref={heroRef} className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto transform-gpu">
          
          {/* Enhanced Profile Image with Premium Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8">
            <motion.div 
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 p-1 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <img
                src={skr}
                alt="Sravan Kumar Polu"
                className="w-full h-full rounded-full object-cover"
              />
              
              {/* Shimmer Effect */}
              {isHovered && !shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 opacity-0"
                animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-fluid-6xl font-bold mb-golden-lg leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Sravan Kumar Polu
            </span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8">
            <span className="text-fluid-xl text-accent-400 font-medium">
              <Typewriter
                words={[
                  "MERN Stack Developer",
                  "React Specialist",
                  "Full-Stack Engineer",
                  "UI/UX Enthusiast",
                  "Available for Freelance",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-fluid-lg text-neutral-300 mb-golden-xl max-w-2xl mx-auto leading-relaxed">
            Passionate about building{" "}
            <span className="text-primary-400 font-semibold">scalable</span>,{" "}
            <span className="text-secondary-400 font-semibold">high-performance</span>, and{" "}
            <span className="text-accent-400 font-semibold">user-friendly</span> web applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                triggerHaptic('light');
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              magnetic={true}
              ripple={true}
              glow={true}
              className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            >
              View Portfolio
              <DownArrow />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                triggerHaptic('light');
                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              magnetic={true}
              ripple={true}
              className="px-8 py-3 text-lg font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm"
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Current Project */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-sm sm:text-base text-neutral-400">
            <span>Currently building: </span>
            <a
              href="https://skr-e-commerce.netlify.app/"
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer">
              E-commerce Store
            </a>
            <span className="badge badge-accent badge-outline ml-2">
              MERN Stack
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Performance Dashboard */}
      <PerformanceDashboard 
        isOpen={showPerformanceDashboard}
        onClose={() => setShowPerformanceDashboard(false)}
      />
    </section>
  );
};

export default Hero;
