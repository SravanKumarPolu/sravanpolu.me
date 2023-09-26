import React from "react";
import { courses, work, projects } from "../constants";

const Work = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  return (
    <section id="work">
      <div className="flex flex-row gap-6">
        <aside class="flex self-stretch grid-cols-1 w-1/4  h-full flex-col items-center">
          <h2 className="">Work</h2>
          <ul className="p-0 border-l border-black ml-[2rem] list-none grid ">
            {work.map((icon) => (
              <li className=" flex  justify-center items-center relative  py-2">
                <div class="relative    w-3 h-3 bg-yellow-300  border-2 border-solid border-red-400  transform -translate-x-1/2 -translate-y-1/2 rounded-full">
                  <div class="w-full h-0.5  absolute  "></div>
                </div>
                <div>
                  <img
                    key={icon.name}
                    src={icon.src}
                    alt={icon.alt}
                    width={60}
                    height={60}
                    className=" flex ml-2 justify-center align-middle items-centerflex-col justify-center items-center gap-1  bg-green rounded-full relative  "
                    onMouseEnter={() => setHoveredIcon(icon)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  />
                  {hoveredIcon === icon && (
                    <div
                      className=" flex absolute text-gray-800
                   bg-gray-200 text-xs px-2 ml-[4rem]
                   py-1 mt-1 rounded opacity-100 
                    transform -translate-x-1/2"
                    >
                      {icon.name}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="">
          <div className="overflow-x-auto bg-customColor p-10 custom-scrollbar w-96">
            <div className="flex flex-row gap-6 p-4 rounded-lg w-[120rem]">
              {courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  className="p-4 bg-white w-[20rem]  rounded-lg shadow-lg "
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
          </div>
        </main>
      </div>
    </section>
  );
};

export default Work;
