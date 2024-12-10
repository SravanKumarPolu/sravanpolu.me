import { footerLinks, socialMedia } from "../constants";

import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  return (
    <footer id="footer" className="bg-gray-800 text-white py-16 mt-4 w-full">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
        {/* Footer Content Container */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-12">
          {/* Left Section - Logo and Description */}
          <div className="flex flex-col flex-1 justify-center  items-center  gap-6 sm:w-1/3">
            <motion.a
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              href="/"
              className="relative flex justify-center items-center w-24 h-24  bg-white rounded-full">
              <img
                src={footerLogo}
                alt="footer logo"
                className="rounded-full object-cover w-20 h-20 border-4 border-white transition-transform transform hover:scale-125"
              />
            </motion.a>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4 }}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-base text-center sm:text-left text-white opacity-75 sm:max-w-xs">
              This site is built using various coding platforms and is a
              showcase of projects created during my development journey.
            </motion.p>
            <div className="flex justify-center sm:justify-start gap-6 mt-4">
              {socialMedia.map((icon) => (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  key={icon.name}
                  className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => setHoveredIcon(icon)}
                  onMouseLeave={() => setHoveredIcon(null)}>
                  <a href={icon.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      width={24}
                      height={24}
                      className="transition-transform transform hover:scale-110"
                    />
                  </a>
                  {hoveredIcon === icon && (
                    <div className="absolute text-xs text-gray-800 bg-white px-2 py-1 rounded mt-2 transform -translate-x-1/2 left-1/2">
                      {icon.name}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Section - Footer Links */}
          <div className="flex flex-col flex-1 sm:flex-row gap-8  justify-center items-center ">
            {footerLinks.map((section) => (
              <div key={section.title} className="sm:w-1/4">
                <motion.h4
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-2xl text-white font-semibold mb-4">
                  {section.title}
                </motion.h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      key={link.name}
                      className="text-base text-white opacity-75 mb-3 hover:text-blue-400">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex justify-center items-center gap-2 mt-10 pt-6 border-t border-gray-700">
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            src={copyrightSign}
            alt="Copyright Sign"
            width={20}
            height={20}
            className="rounded-full"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            className="text-white text-sm">
            Copyright. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
