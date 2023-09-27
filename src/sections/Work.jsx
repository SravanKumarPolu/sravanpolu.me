import React from "react";
import { courses, work, projects } from "../constants";

const Work = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
  return (
    <section id="work" className="pt-4">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar */}
        <aside className="flex self-stretch sm:w-2/4 flex-col items-center">
          <h2 className=" align-middle font-bold pb-4">Work</h2>
          <ul className="p-0 border-l  border-black ml-[2rem] list-none">
            {courses.map((course) => (
              <li
                key={course.courseName}
                className="flex justify-center  mt-4 items-center relative py-2"
              >
                <div className="relative w-3 h-3 bg-yellow-300 border-2 border-solid border-red-400 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
                  <div className="w-full h-0.5 absolute"></div>
                </div>
                <div>
                  <img
                    src={course.language[0].src}
                    alt={course.language[0].alt}
                    width={60}
                    height={60}
                    className="flex ml-2 justify-center align-middle items-center gap-1 bg-green rounded-full relative"
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
        </aside>
        <main>
          <div className="overflow-x-auto bg-customColor p-10 custom-scrollbar sm:w-[25rem]">
            <div>
              <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg lg:w-[120rem]">
                {courses.map((course, courseIndex) => (
                  <div
                    key={courseIndex}
                    style={{
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 55%, 0% 100%)",
                    }}
                    className="p-4 w-full h-96 sm:w-[20rem] bg-white rounded-lg shadow-lg"
                  >
                    <h1 className="text-xl font-semibold text-gray-800">
                      Language: {course.courseName}
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
                              target="_blank"
                              className="project-link text-blue-500 hover:underline hover:text-blue-700"
                            >
                              {project.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg lg:w-[120rem] max-lg:hidden">
                {courses.map((course, courseIndex) => (
                  <p className="p-4 w-full h-20 sm:w-[20rem] bg-white rounded-lg shadow-lg">
                    <span className="text-red-500">Note:</span> {course.summary}
                  </p>
                ))}
              </div>
              <div className="button">
                <button
                  onClick={prevSlide}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mr-4"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="dig-PictogramIcon w-8 h-8"
                    focusable="false"
                    role="presentation"
                  >
                    <path
                      d="m14.75 5.75-6.25 6.5 6.25 6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="dig-PictogramIcon w-8 h-8"
                    focusable="false"
                    role="presentation"
                  >
                    <path
                      d="m9.25 5.75 6.25 6.5-6.25 6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Work;
