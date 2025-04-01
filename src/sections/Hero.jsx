import DownArrow from "../components/DownArrow";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import skr from "../assets/images/skr.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full gap-10 h-auto py-14 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="p-[2px]   rounded-3xl bg-gradient-to-r  from-teal-500 via-purple-500 to-pink-500">
        <div className="bg-gray-900 rounded-3xl p-6 ">
          {/* original motion.div content here */}
          {/* Profile Card */}
          <motion.div
            className="  
          flex flex-col items-center text-center shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.img
              src={skr}
              alt="SravanKumar Polu"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
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
              <span className="text-green-400">SravanKumar Polu</span>
            </motion.h1>

            <span className="block mt-2 text-green-300 text-xl sm:text-2xl font-semibold">
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
        className="w-full max-w-2xl text-center text-lg sm:text-xl text-gray-400 italic"
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
        className="mt-4 text-sm sm:text-base text-gray-400 font-medium">
        <span>Currently building: </span>
        <a
          href="https://skr-e-commerce.netlify.app/"
          className="text-blue-400 hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer">
          E-commerce Store
        </a>{" "}
        <span className="text-xs bg-gray-700 px-2 py-1 rounded-full ml-2">
          MERN Stack
        </span>
      </motion.div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <motion.a
          href="#work"
          className="group px-6 py-3 text-lg font-semibold rounded-full bg-white/10 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          View Portfolio 🚀
          <span className="text-green-400 group-hover:text-white animate-bounce">
            <DownArrow />
          </span>
        </motion.a>

        <motion.a
          href="#footer"
          className="group px-6 py-3 text-lg font-semibold rounded-full bg-white/10 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Contact Me 📩
          <span className="text-blue-400 group-hover:text-white animate-bounce">
            <DownArrow />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
