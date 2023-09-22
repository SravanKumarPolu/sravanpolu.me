import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer id="footer" className="max-container">
      <div
      //   className="flex justify-between items-center
      // gap-20 flex-wrap max-lg:flex-col"
      >
        <div
          className="flex justify-center items-center
      gap-20 flex-wrap max-lg:flex-col"
        >
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white
              font-montserrat text-2xl
              leading-normal font-medium mb-6"
              >
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="mt-3 text-white-400
                  font-montserrat text-base
                  leading-normal hover:text-slate-gray
                  cursor-pointer"
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
