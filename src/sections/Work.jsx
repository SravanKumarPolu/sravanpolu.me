import React, { useState } from "react";

import DownArrow from "../components/DownArrow";
import { courses } from "../constants";
import { motion } from "framer-motion";

const Work = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? courses.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === courses.length - 1 ? 0 : prevSlide + 1
    );
  };

  const changeSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
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
        {/* Sidebar (Hidden on small and medium screens) */}
        <motion.aside
          className="hidden lg:flex flex-col gap-6 items-center lg:w-2/6 w-full "
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

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-xl">
            <div className="m-6 flex gap-4 flex-col  shadow-lg p-10 sm:w-[25rem] relative">
              {/* Previous/Next Buttons - Adjust visibility */}
              <div className="sm:hidden align-top">
                {/* Wrap buttons in a div with sm:hidden class */}
                {/* Mobile Nav */}
                <div className="lg:hidden flex justify-center gap-4 mb-6">
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
                {/* Show content for small screens */}
                <div className="flex flex-col m-2 sm:flex-row gap-6 p-4 rounded-lg lg:w-3/4 sm:hidden">
                  {courses.map((course, courseIndex) => (
                    <p
                      key={courseIndex}
                      className={`p-3 w-full h-22 sm:w-[20rem] bg-white text-red-500 rounded-lg shadow-lg ${
                        courseIndex === currentSlide ? "" : "hidden"
                      }`}>
                      <span className="text-red-500">Note:</span>{" "}
                      {course.summary}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Work;
