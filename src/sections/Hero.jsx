import BlobBackground from "../components/BlobBackground";
import DownArrow from "../components/DownArrow";
import Lottie from "lottie-react";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import heroAnimation from "../assets/lottie/hero-animation.json";
import { motion } from "framer-motion";
import skr from "../assets/images/skr.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full py-14 gap-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 overflow-hidden">
      {/* Background Effects */}
      <BlobBackground />

      <Lottie
        animationData={heroAnimation}
        loop
        className="absolute bottom-0 right-0 w-72 sm:w-96 opacity-60 z-0 pointer-events-none"
      />

      {/* Profile Card */}
      <div className="p-[2px] rounded-3xl mt-10 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 z-10">
        <div className="bg-gray-900 rounded-3xl p-6">
          <motion.div
            className="flex flex-col items-center text-center shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.img
              src={skr}
              alt="Sravan Kumar Polu"
              className=" w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.h1
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}>
              Hi, 👋 I'm{" "}
              <span className="text-green-400">Sravan Kumar Polu</span>
            </motion.h1>

            <span className="block mt-2 text-green-300 text-xl sm:text-2xl font-semibold transition-colors duration-300">
              <Typewriter
                words={[
                  "MERN Stack Developer",
                  "React Specialist",
                  "Freelance Ready",
                  "Real-Time App Enthusiast",
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

            <motion.p
              className="mt-3 text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}>
              MERN Stack Developer passionate about{" "}
              <span className="text-green-400">
                scalable, high-performance,
              </span>{" "}
              and <span className="text-blue-400">user-friendly</span> web
              applications.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Tagline */}
      <motion.div
        className="w-full max-w-2xl text-center text-lg sm:text-xl text-gray-400 italic z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <p className="hover:text-gray-200 transition duration-300">
          “Building scalable web solutions with MERN Stack—one project at a
          time.” 🚀
        </p>
      </motion.div>

      {/* Current Project */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 text-sm sm:text-base text-gray-400 font-medium z-10">
        <span>Currently building: </span>
        <a
          href="https://skr-e-commerce.netlify.app/"
          className="text-blue-400 hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer">
          E-commerce Store
        </a>
        <span className="badge badge-accent badge-outline ml-2">
          MERN Stack
        </span>
      </motion.div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 z-10">
        <motion.a
          href="#work"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline btn-success gap-2 text-lg font-semibold shadow-md transition-all duration-300">
          View Portfolio 🚀
          <span className="animate-bounce">
            <DownArrow />
          </span>
        </motion.a>

        <motion.a
          href="#footer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline btn-info gap-2 text-lg font-semibold shadow-md transition-all duration-300">
          Contact Me 📩
          <span className="animate-bounce">
            <DownArrow />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
