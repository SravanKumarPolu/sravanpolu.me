// src/components/Work.tsx

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from "react";

import DownArrow from "../components/DownArrow";
import { courses } from "../constants";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";

const Work: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width:1060px)");

  const prevSlide = (): void =>
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  const nextSlide = (): void =>
    setCurrentSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));

  const changeSlide = (index: number): void => {
    setCurrentSlide(index);
    setCurrentProjectIndex(0);
  };

  const handleProjectPrev = (): void => {
    const projects = courses[currentSlide].projects;
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const handleProjectNext = (): void => {
    const projects = courses[currentSlide].projects;
    setCurrentProjectIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const getCardStyle = (index: number): string => {
    const styles = [
      "bg-gradient-to-r from-orange-400 to-pink-500",
      "bg-gradient-to-r from-cyan-400 to-blue-500",
      "bg-gradient-to-r from-green-400 to-teal-500",
      "bg-gradient-to-r from-purple-500 to-yellow-300",
    ];
    return styles[index % styles.length];
  };

  return (
    <section
      id="work"
      className=" py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-gray-950 text-white">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 ">
        {/* Sidebar */}
        {isDesktop && (
          <motion.aside
            className="hidden lg:flex flex-col items-center gap-6 lg:w-1/4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text mb-4 flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>
                Works
              </motion.span>
              <span className="inline-block animate-bounce ml-2 text-white">
                <DownArrow />
              </span>
            </h2>
            <ul className="border-l   border-white/30 pl-4">
              {courses.map((course, index) => (
                <li
                  key={course.courseName}
                  className={` mb-5  cursor-pointer transition-transform ${
                    index === currentSlide ? "scale-110" : "opacity-60"
                  }`}>
                  <div className="relative flex items-center ">
                    <div className="w-3 h-3 bg-yellow-300 border-2 border-red-400 rounded-full -ml-3 mr-3 shadow-md" />
                    <img
                      src={course.language[0].src}
                      alt={course.language[0].alt}
                      className="w-10 h-10 rounded-full hover:scale-110 transition-transform"
                      onClick={() => changeSlide(index)}
                      onMouseEnter={() => setHoveredIcon(course.language[0])}
                      onMouseLeave={() => setHoveredIcon(null)}
                    />
                    {hoveredIcon === course.language[0] && (
                      <div className="absolute left-14 bg-white text-black text-xs font-medium px-3 py-1 rounded shadow border border-gray-300">
                        {hoveredIcon.name}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl">
              {!isDesktop && (
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={prevSlide}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition">
                    Prev
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition">
                    Next
                  </button>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}>
                <div
                  className={`rounded-xl p-6 sm:p-8 text-center shadow-xl transition-all duration-500 ${getCardStyle(
                    currentSlide
                  )} text-white`}>
                  <h3 className="text-3xl font-bold mb-4">
                    {courses[currentSlide].courseName}
                  </h3>
                  <h4 className="text-lg font-medium bg-yellow-200 text-blue-900 inline-block px-4 py-2 rounded mb-6">
                    Projects
                    <span className="inline-block animate-bounce ml-2">
                      <DownArrow />
                    </span>
                  </h4>
                  <div className="  flex justify-between items-center mb-4 ">
                    <button
                      onClick={handleProjectPrev}
                      className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-110 transition"
                      aria-label="Previous Project">
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleProjectNext}
                      className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-110 transition"
                      aria-label="Next Project">
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative ">
                    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition">
                      <figure>
                        <img
                          src={
                            courses[currentSlide].projects[currentProjectIndex]
                              .src
                          }
                          alt={
                            courses[currentSlide].projects[currentProjectIndex]
                              .title
                          }
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      </figure>
                      <div className="card-body">
                        <h5 className="text-lg font-semibold text-purple-700">
                          {
                            courses[currentSlide].projects[currentProjectIndex]
                              .title
                          }
                        </h5>
                        <div className="card-actions justify-end">
                          <a
                            href={
                              courses[currentSlide].projects[
                                currentProjectIndex
                              ].link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 mt-2 block">
                            {
                              courses[currentSlide].projects[
                                currentProjectIndex
                              ].name
                            }
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isDesktop && (
                    <p className="bg-white text-red-600 p-4 rounded-lg shadow mt-6">
                      <strong>Note:</strong> {courses[currentSlide].summary}
                    </p>
                  )}
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
