import DownArrow from "../components/DownArrow";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../assets/lottie/hero-animation.json";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import skr from "../assets/images/skr.png";
import { useHaptic } from "../hooks/useHaptic";
// import { ParallaxBackground } from "../components/ParallaxBackground";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { CustomButton as Button } from "../components/ui/Button";
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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        {/* Large geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-40 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl"
          animate={{
            rotate: [0, 90, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>
      
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

      <div ref={heroRef} className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto transform-gpu">
          
          {/* Modern Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left lg:text-left">
              {/* Modern Typography with Better Hierarchy */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
                  <span className="text-cyan-400 text-sm font-medium">Available for Freelance</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="block text-white">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Sravan Kumar Polu
                </span>
              </motion.h1>

              {/* Modern Role Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg font-medium text-white">
                    <Typewriter
                      words={[
                        "MERN Stack Developer",
                        "React Specialist", 
                        "Full-Stack Engineer",
                        "UI/UX Enthusiast"
                      ]}
                      loop={true}
                      cursor={true}
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </span>
                </div>
              </motion.div>

              {/* Modern Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
              >
                Passionate about building{" "}
                <span className="font-semibold text-cyan-400">scalable</span>,{" "}
                <span className="font-semibold text-purple-400">high-performance</span>, and{" "}
                <span className="font-semibold text-pink-400">user-friendly</span> web applications.
              </motion.p>

              {/* Modern CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    triggerHaptic('light');
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                >
                  View Portfolio
                  <DownArrow />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    triggerHaptic('light');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-white/30 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105"
                >
                  Contact Me
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Modern Profile Image */}
                <motion.div 
                  className="w-64 h-64 mx-auto rounded-3xl border-4 border-white/20 shadow-2xl overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-1 cursor-pointer relative"
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
                    className="w-full h-full rounded-3xl object-cover"
                  />
                  
                  {/* Modern Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 opacity-0"
                    animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Current Project - Modern Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80">Currently building:</span>
              <a
                href="https://skr-e-commerce.netlify.app/"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                E-commerce Store
              </a>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                MERN Stack
              </span>
            </div>
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
