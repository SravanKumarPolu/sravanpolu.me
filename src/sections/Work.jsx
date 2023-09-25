import React from "react";
import { work } from "../constants";

const Work = () => {
  return (
    <section id="work">
      <div>
        <aside class="flex self-stretch grid-cols-1 w-40 flex-col items-center">
          <h2 className="hidden">Work</h2>
          <ul className="p-0 border-l border-white ml-[3rem] list-none grid gap-[var(--fs-200)]">
            {work.map((item) => (
              <li className="relative pl-8 py-2 ">
                <p class="hidden md:block text-2xl font-bold mt-2 mb-2"></p>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-[1.5rem] w-[1.5rem]"
                ></img>
                <span className="ml-2 text-white">{item.name}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Work;
