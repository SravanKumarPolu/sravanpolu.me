// Nav.jsx

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import hamburger from "../assets/icons/hamburger.svg";
import { motion } from "framer-motion";

import { navLinks } from "../constants";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  const navbarBackground = isTopOfPage
    ? " "
    : "bg-multiple-gradients border-b  border-gray-300  shadow-md shadow-white-400 ";

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
    <nav className="flex  w-screen ">
      <div
        className={`fixed ${navbarBackground} ${flexBetween} z-50 flex text-center top-0  w-full pb-5 sm:py-4 justify-center items-center `}>
        <motion.h1
          className={`font-semibold mx-16  font-sans text-3xl  mt-1 sm:text-2xl md:text-4xl ${
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
            {navLinks.map((item) => (
              <button key={item.label} className="px-1">
                <a
                  onClick={() => handleLinkClick(item.label)}
                  className={`px-5 text-lg py-1 bg-opacity-50 border-[1px] font-medium border-transparent active:border-white hover:border-white rounded ${
                    activeLink === item.label ? "active-link  " : ""
                  } ${!isTopOfPage ? "text-[#f3f4f6]" : "text-[#f3f4f6]"}`}
                  href={item.href}>
                  {item.label}
                </a>
              </button>
            ))}
          </motion.div>
        ) : (
          <div className="hidden max-lg:block mr-4 mt-3">
            <img
              src={hamburger}
              alt="hamburger"
              onClick={toggleNav}
              width={25}
              height={25}
            />
            <ul
              className={`${
                isNavOpen ? "block" : "hidden"
              } max-lg:flex-1 flex flex-col max-w-sm absolute mt-5 bg-white top-14
            right-0 py-4 px-6 border
              border-gray-300 rounded-lg shadow-lg`}>
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
