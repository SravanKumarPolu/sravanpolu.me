import React, { useEffect, useState } from "react";

import Link from "./Link"; // Your custom Link component
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useMediaQuery } from "@react-hook/media-query";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    const handleScroll = () => setIsTopOfPage(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = isTopOfPage
    ? "bg-transparent border-b border-gray-200 shadow-lg border-b border-white/10"
    : "bg-gradient-to-r from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] shadow-md border-b border-white/10";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition duration-300 ${navbarStyle}`}>
      <div className="flex justify-between items-center px-6 py-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-xl sm:text-3xl text-white">
            Sravan Kumar Polu <span className="text-pink-400">| MERN Dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        {isAboveMediumScreens ? (
          <div className="flex gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={setActiveLink}
              />
            ))}
          </div>
        ) : (
          // Mobile Hamburger
          <button onClick={toggleNav} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {!isAboveMediumScreens && (
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isNavOpen ? 1 : 0, x: isNavOpen ? 0 : 50 }}
          transition={{ duration: 0.5 }}
          className={`absolute top-14 right-4 py-4 px-6 bg-white backdrop-blur-md border border-gray-300 rounded-lg shadow-lg space-y-2 ${
            isNavOpen ? "block" : "hidden"
          }`}>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={(label) => {
                  setActiveLink(label);
                  setIsNavOpen(false);
                }}
              />
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default Nav;
