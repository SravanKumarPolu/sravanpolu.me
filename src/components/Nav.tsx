import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";

import Link from "./Link";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useMediaQuery } from "@react-hook/media-query";

const Nav: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("Home");
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const toggleNav = (): void => setIsNavOpen(!isNavOpen);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = (): void => setIsTopOfPage(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const matchedLink = navLinks.find(
              (link) => link.label.toLowerCase() === sectionId.toLowerCase()
            );
            if (matchedLink) setActiveLink(matchedLink.label);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );

    navLinks.forEach((link) => {
      const section = document.getElementById(link.label.toLowerCase());
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // LocalStorage theme persistence
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") setIsDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Dynamic styles
  const navbarStyle = isTopOfPage
    ? "bg-transparent border-b border-white/10 backdrop-blur-md border-b border-white/10 shadow-lg shadow-cyan-500/50"
    : isDarkMode
    ? "bg-gradient-to-r from-[#1f1c2c]/90 via-emerald-700 to-[#1f1c2c]/90 shadow-lg shadow-emerald-400/50 border-b border-white/10 backdrop-blur-md "
    : "bg-gradient-to-r from-emerald-500 via-[#1f1c2c] to-fuchsia-700 shadow-lg shadow-green-300/50 border-b border-gray-300 backdrop-blur-md ";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition duration-300 ${navbarStyle}`}>
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-xl sm:text-3xl uppercase bg-gradient-to-r from-primary via-secondary to-accent bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            Sravan Kumar Polu <span className="text-pink-400">| MERN Dev</span>
          </span>
        </a>

        {/* Desktop Navigation + Theme Toggle */}
        {isAboveMediumScreens ? (
          <div className="flex gap-6 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={setActiveLink}
              />
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition text-white"
              title="Toggle Theme">
              {isDarkMode ? (
                <BsMoonStarsFill className="w-5 h-5" />
              ) : (
                <BsSunFill className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        ) : (
          // Mobile Hamburger
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition text-white"
              title="Toggle Theme">
              {isDarkMode ? (
                <BsMoonStarsFill className="w-5 h-5" />
              ) : (
                <BsSunFill className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={toggleNav}
              className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {!isAboveMediumScreens && (
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isNavOpen ? 1 : 0, x: isNavOpen ? 0 : 50 }}
          transition={{ duration: 0.5 }}
          className={`absolute top-14 right-4 py-4 px-6 bg-white/90 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg space-y-2 ${
            isNavOpen ? "block" : "hidden"
          }`}>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={(label: string) => {
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
