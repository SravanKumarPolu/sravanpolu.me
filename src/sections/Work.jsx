import React, { useState } from "react";
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

  return (
    <section id="work" className="sm:pt-4  sm:my-10 ">
      <div className="flex h-auto flex-col sm:flex-row gap-6 my-16">
        {/* Sidebar */}

        <motion.aside
          className="flex self-stretch sm:w-2/4 flex-col items-center max-lg:hidden mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}>
          <motion.h2
            className="align-middle font-bold pb-2 pr-10 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: { opacity: 1, y: 0 },
            }}>
            Work
          </motion.h2>
          <ul className="p-0 border-l border-white ml-[1rem] list-none">
            {courses.map((course, courseIndex) => (
              <li
                key={course.courseName}
                className="flex justify-center mt-6 items-center relative py-2">
                <div className="relative w-3 h-3 bg-yellow-300 border-2 border-solid border-red-400 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
                  <div className="w-full h-0.2 absolute"></div>
                </div>
                <div>
                  <img
                    src={course.language[0].src}
                    alt={course.language[0].alt}
                    width={60}
                    height={60}
                    onClick={() => changeSlide(courseIndex)}
                    className="flex ml-2 justify-center align-middle items-center gap-1 bg-green rounded-full relative cursor-pointer"
                    onMouseEnter={() => setHoveredIcon(course.language[0])}
                    onMouseLeave={() => setHoveredIcon(null)}
                  />
                  {hoveredIcon === course.language[0] && (
                    <div className="flex absolute text-gray-800 bg-gray-200 text-xs px-2 ml-[5.5rem] py-1 rounded opacity-100 transform -translate-x-1/2">
                      {course.language[0].name}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.aside>
        <main className="flex flex-col relative justify-between items-center mt-[3.5rem] ">
          <div className="m-6  bg-customColor p-10   sm:w-[25rem]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}>
              <div className="flex flex-col gap-2 py-4 rounded-lg lg:w-3/4 sm:w-full">
                {courses.map((course, courseIndex) => (
                  <div
                    key={courseIndex}
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 55%, 0% 100%)",
                    }}
                    className={`p-4 w-full h-96 sm:w-[20rem] bg-white rounded-lg shadow-lg ${
                      courseIndex === currentSlide ? "" : "hidden"
                    }`}>
                    <h1 className="text-xl font-semibold text-gray-800 text-center">
                      {course.courseName}
                    </h1>
                    <div className="mt-4">
                      <h2 className="text-lg font-medium text-blue-700">
                        Projects:
                      </h2>
                      <div className="mt-2">
                        {course.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="mb-4">
                            <h3 className="text-md font-medium text-gray-700">
                              {project.title}:
                            </h3>
                            <a
                              href={project.link}
                              target=" _blank"
                              className="project-link text-blue-500 hover:underline hover:text-blue-700">
                              {project.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show the content meant for big displays on small layouts */}
              <div className="flex flex-col m-2 sm:flex-row gap-6 p-4 rounded-lg lg:w-3/4 sm:hidden">
                {courses.map((course, courseIndex) => (
                  <p
                    key={courseIndex}
                    className={`p-3 w-full  h-22 sm:w-[20rem] bg-white rounded-lg  shadow-lg ${
                      courseIndex === currentSlide ? "" : "hidden"
                    }`}>
                    <span className="text-red-500">Note:</span> {course.summary}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="sm:hidden flex  absolute  m-2 align-middle">
            {" "}
            {/* Wrap buttons in a div with sm:hidden class */}
            <div className="  sm:flex  ">
              <button
                onClick={prevSlide}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mr-4">
                Prev
              </button>
              <button
                onClick={nextSlide}
                className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Work;
