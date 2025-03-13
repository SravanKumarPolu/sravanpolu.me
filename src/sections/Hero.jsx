import DownArrow from "../components/DownArrow";
import React from "react";
import { assets } from "../constants";
import { motion } from "framer-motion";
import skr from "../assets/images/skr.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full gap-10 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Profile Card */}
      <motion.div
        className="card w-4/5 max-w-4xl bg-gradient-to-br from-primary to-secondary shadow-xl p-10 rounded-2xl flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.img
          src={skr}
          alt="SravanKumar Polu"
          className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white shadow-md hover:scale-105 transition-transform"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          Hi, 👋 I'm SravanKumar Polu
        </motion.h1>

        <motion.p
          className="mt-3 text-lg sm:text-xl text-gray-200 font-light leading-relaxed"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}>
          MERN Stack Developer passionate about building elegant, scalable, and
          high-performance web applications.
        </motion.p>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="w-full max-w-3xl text-center text-lg sm:text-xl text-gray-400"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <p className="hover:text-gray-200 transition">
          “Code, like humor, works best when it's concise.” <br />
          Let's build something amazing together! 🚀
        </p>
      </motion.div>

      {/* Current Project */}
      <motion.span
        className="text-gray-400 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}>
        Currently working on:{" "}
        <a
          href="https://skr-e-commerce.netlify.app/"
          className="text-blue-500 hover:text-blue-400 font-semibold underline transition"
          target="_blank"
          rel="noopener noreferrer">
          E-commerce Store
        </a>
      </motion.span>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        <motion.a
          href="#work"
          className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-full shadow-md hover:from-teal-400 hover:to-green-500 transition flex items-center gap-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}>
          View Portfolio
          {/* Upward Arrow */}
          <span className="text-green-500 text-lg group-hover:opacity-100 opacity-100 animate-bounce">
            <DownArrow className="text-green-500 group-hover:text-green-300" />
          </span>
        </motion.a>

        <motion.a
          href="#footer"
          className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-400 text-white rounded-full shadow-md hover:from-indigo-400 hover:to-blue-500 transition flex items-center gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}>
          Contact Me
          {/* Downward Arrow (SVG with dynamic color) */}
          <span className="text-indigo-500 text-lg group-hover:opacity-100 opacity-100 animate-bounce">
            <DownArrow className="text-indigo-500 group-hover:text-indigo-300" />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
