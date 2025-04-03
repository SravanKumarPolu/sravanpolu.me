import React, { useState } from "react";

import DownArrow from "../components/DownArrow";
import { courses } from "../constants";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";

const Work = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  };

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCardStyle = (index) => {
    const styles = [
      {
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        color: "white",
      },
      {
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "black",
      },
      {
        background: "linear-gradient(to right, #43e97b, #38f9d7)",
        color: "red",
      },
      {
        background: "linear-gradient(to right, #fa709a, #fee144)",
        color: "#222",
      },
    ];
    return styles[index % styles.length];
  };

  return (
    <section id="work" className="py-12 px-4">
      <div className="flex mt-10 flex-col lg:flex-row min-h-screen items-start justify-center gap-10">
        {/* Desktop Nav */}
        {isAboveMediumScreens ? (
          <>
            <motion.aside
              className="hidden lg:flex flex-col gap-6 items-center lg:w-2/6 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                  Works
                </motion.span>
                <span className="animate-bounce">
                  <DownArrow />
                </span>
              </h2>

              <ul className="border-l border-white pl-1">
                {courses.map((course, index) => (
                  <li key={course.courseName} className="mb-6 cursor-pointer">
                    <div className="relative flex items-center">
                      <div className="w-3 h-3 bg-yellow-300 border-2 border-red-400 rounded-full -ml-[0.7rem] mr-2 shadow-[0_0_8px_2px_white]" />
                      <img
                        src={course.language[0].src}
                        alt={course.language[0].alt}
                        className="w-12 h-12 rounded-full hover:scale-105 transition"
                        onClick={() => changeSlide(index)}
                        onMouseEnter={() => setHoveredIcon(course.language[0])}
                        onMouseLeave={() => setHoveredIcon(null)}
                      />
                      {hoveredIcon === course.language[0] && (
                        <div className="absolute left-16 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded shadow">
                          {hoveredIcon.name}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.aside>

            {/* Desktop Main */}
            <main className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-xl">
                <div className="m-6 flex gap-4 flex-col shadow-lg p-10 relative">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                    }}>
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        style={getCardStyle(index)}
                        className={`p-6 rounded-xl shadow-xl text-center transition-all duration-500 ${
                          index === currentSlide ? "block" : "hidden"
                        }`}>
                        <h3 className="text-2xl font-bold mb-4">
                          {course.courseName}
                        </h3>
                        <h4 className="text-lg font-medium text-blue-800 bg-yellow-200 inline-block px-4 py-2 rounded mb-4">
                          Projects{" "}
                          <span className="inline-block animate-bounce ml-2">
                            <DownArrow />
                          </span>
                        </h4>
                        <div className="space-y-4 shadow-md">
                          {course.projects.map((project, idx) => (
                            <div
                              key={idx}
                              className="bg-white text-black p-4 rounded-lg shadow">
                              <h5 className="font-semibold text-purple-700">
                                {project.title}
                              </h5>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline hover:text-blue-700">
                                {project.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </main>
          </>
        ) : (
          // Mobile Layout
          <main className="flex items-center justify-center w-full">
            <div className="w-full max-w-md">
              <div className="m-4 shadow-lg p-6 w-full flex flex-col gap-6 items-center justify-center sm:px-10">
                {/* Prev/Next Buttons */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={prevSlide}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                    Prev
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                    Next
                  </button>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}>
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      style={getCardStyle(index)}
                      className={`p-4 sm:p-6 rounded-xl shadow-xl text-center transition-all duration-500 w-full ${
                        index === currentSlide ? "block" : "hidden"
                      }`}>
                      <h3 className="text-2xl font-bold mb-4">
                        {course.courseName}
                      </h3>
                      <h4 className="text-lg font-medium text-blue-800 bg-yellow-200 inline-block px-4 py-2 rounded mb-4">
                        Projects{" "}
                        <span className="inline-block animate-bounce ml-2">
                          <DownArrow />
                        </span>
                      </h4>
                      <div className="space-y-4 shadow-md">
                        {course.projects.map((project, idx) => (
                          <div
                            key={idx}
                            className="bg-white text-black p-4 rounded-lg shadow">
                            <h5 className="font-semibold text-purple-700">
                              {project.title}
                            </h5>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline hover:text-blue-700">
                              {project.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Mobile Summary Section */}
                  <div className="flex flex-col gap-4 p-4 rounded-lg sm:hidden">
                    {courses.map((course, index) => (
                      <p
                        key={index}
                        className={`bg-white text-red-500 p-3 rounded-lg shadow transition-all duration-300 ${
                          index === currentSlide ? "block" : "hidden"
                        }`}>
                        <span className="font-bold">Note:</span>{" "}
                        {course.summary}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        )}
      </div>
    </section>
  );
};

export default Work;
