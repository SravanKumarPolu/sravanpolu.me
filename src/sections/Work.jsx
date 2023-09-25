import React from "react";
import { work } from "../constants";

const Work = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  return (
    <section id="work">
      <div>
        <aside class="flex self-stretch grid-cols-1 w-40 flex-col items-center">
          <h2 className="hidden">Work</h2>
          <ul className="p-0 border-l border-black ml-[3rem] list-none grid gap-[var(--fs-200)]">
            {work.map((icon) => (
              <li className="relative pl-8 py-2">
                <p className="hidden md:block text-2xl font-bold mt-2 mb-2"></p>
                <img
                  key={icon.name}
                  src={icon.src}
                  alt={icon.alt}
                  className=" flex flex-col justify-center items-center gap-1  bg-white rounded-full relative h-[1.5rem] w-[1.5rem] "
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
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Work;
