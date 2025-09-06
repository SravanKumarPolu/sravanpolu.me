import DownArrow from "../components/DownArrow";
import Lottie from "lottie-react";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../assets/lottie/hero-animation.json";
import { motion } from "framer-motion";
import skr from "../assets/images/skr.png";
import { useHaptic } from "../hooks/useHaptic";

const Hero: React.FC = () => {
  const { triggerHaptic } = useHaptic();

  const handleButtonClick = (action: string) => {
    triggerHaptic('light');
    // Handle button click actions here
    if (action === 'Download Resume') {
      // Add resume download logic
    } else if (action === 'View Projects') {
      // Add scroll to projects logic
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 text-white overflow-hidden">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      {/* Subtle Lottie animation */}
      <Lottie
        animationData={heroAnimation}
        loop
        className="absolute bottom-0 right-0 w-64 sm:w-80 opacity-20 z-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto">
          
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <img
                src={skr}
                alt="Sravan Kumar Polu"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
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
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              View Portfolio
              <DownArrow />
            </motion.a>

            <motion.a
              href="#footer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-lg px-8 py-3 text-lg font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300">
              Contact Me
            </motion.a>
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
    </section>
  );
};

export default Hero;
