import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import hamburger from "../assets/icons/hamburger.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
import { navLinks } from "../constants";
import { motion } from "framer-motion";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const navbarBackground = isTopOfPage
    ? ""
    : "bg-primary-100 bg-blue-200 drop-shadow";
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

  const navbarBackground = isTopOfPage
  return (
    <header className="absolute z-20 w-full">
      <nav className="sticky">
        <div
          className={`${navbarBackground} ${flexBetween} flex fixed top-0 z-30 w-full pb-5 sm:py-4 justify-center items-center `}>
          <motion.h1
            className="font-semibold text-3xl mx-4 mt-1 sm:text-2xl md:text-3xl"
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
                    className={`px-5 py-1  bg-opacity-50 border-2 border-transparent active:border-white hover:border-white rounded ${
                      activeLink === item.label
                        ? "active-link  border-white "
                        : ""
                    }`}
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
                      className=" font-montserrat gap-16 text-lg text-slate-gray "
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
    </header>
  );
};

export default Nav;
