import React, { useEffect, useState } from "react";

import hamburger from "../assets/icons/hamburger.svg";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useMediaQuery } from "@react-hook/media-query";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  const navbarBackground = isTopOfPage
    ? " "
    : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-b border-gray-300 shadow-md shadow-white-400";

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = (label) => {
    setActiveLink(label);
    toggleNav();
  };

  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const flexBetween = "flex justify-between";

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="flex w-screen relative">
      <div
        className={`fixed ${navbarBackground} ${flexBetween} z-50 flex text-center top-0 w-full pb-5 sm:py-4  items-center`}>
        <motion.h1
          className={` flex-1 flex justify-start ml-5 sm:justify-start md:justify-center lg:justify-center xl:justify-center font-semibold  font-sans text-3xl mt-1 sm:text-2xl md:text-4xl ${
            isTopOfPage ? "text-[#f3f4f6]" : "text-[#f3f4f6]"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}>
          sravanpolu.me
        </motion.h1>
        {isAboveMediumScreens ? (
          <motion.div
            className="flex-1 flex justify-center items-center gap-5 max-lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}>
            <div className="flex justify-center items-center   ">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.label)}
                  className={`px-8 py-4 text-center   hover:text-black ${
                    activeLink === item.label
                      ? "  font-semibold bg-white border-t  text-black rounded-t-lg border-l    border-r shadow "
                      : "border-b text-white rounded-md"
                  }`}>
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="hidden max-lg:block mr-4 mt-3">
            <span onClick={toggleNav} className="text-[#f3f4f6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-three-dots-vertical current-color"
                viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </span>
            <ul
              className={`${
                isNavOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              } transition-transform transform duration-300 ease-in-out absolute top-14 right-0 py-4 px-6 bg-white border border-gray-300 rounded-lg shadow-lg`}>
              {navLinks.map((item) => (
                <li className="p-2" key={item.label}>
                  <a
                    onClick={() => handleLinkClick(item.label)}
                    className={`font-montserrat gap-16 text-lg text-slate-gray ${
                      !isTopOfPage ? "text-blue-500" : ""
                    }`}
                    href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
