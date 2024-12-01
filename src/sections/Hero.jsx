import React, { useState } from "react";

import { motion } from "framer-motion";
import skr from "../assets/images/skr.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-screen relative flex flex-col items-center justify-center  min-h-screen gap-10 py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden">
      {/* Profile Section */}
      <motion.div
        className="relative flex flex-col items-center justify-center mt-10 xs:mt-15 sm:mt-12 md:mt-4 lg:mt-0 bg-gradient-to-br from-[#ff6b6b] to-[#ffa07a] rounded-xl p-10 shadow-lg w-4/5 max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}>
        <motion.img
          src={skr}
          alt="SravanKumar Polu"
          className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white shadow-md transform transition hover:scale-105"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
        />

        <motion.h1
          className="mt-6 text-center font-bold text-3xl sm:text-4xl lg:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}>
          Hi, 👋 I'm SravanKumar Polu
        </motion.h1>
        <motion.p
          className="mt-4 text-center text-lg sm:text-xl text-gray-200 font-light leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}>
          MERN Stack Developer passionate about creating responsive and visually
          stunning web applications.
        </motion.p>
      </motion.div>

      {/* Tagline Section */}
      <motion.div
        className="w-full max-w-4xl px-6 sm:px-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}>
        <p className="text-lg sm:text-xl text-gray-400 hover:text-gray-200 transition">
          “Code, like humor, works best when it's concise.” <br />
          Let's build something amazing together!
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}>
        <a
          href="#work"
          className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-full shadow-md hover:from-teal-400 hover:to-green-500 transition">
          View Portfolio
          {/* Upward Arrow */}
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-green-500 text-lg group-hover:opacity-100 opacity-100 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-up-fill"
              viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
          </span>
        </a>

        <a
          href="#footer"
          className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-400 text-white rounded-full shadow-md hover:from-indigo-400 hover:to-blue-500 transition">
          Contact Me
          {/* Downward Arrow */}
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-indigo-500 text-lg group-hover:opacity-100 opacity-100 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
