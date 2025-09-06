import React, { useEffect, useRef } from "react";
import Link from "./Link";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useMediaQuery } from "@react-hook/media-query";
import { useApp } from "../contexts/AppContext";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { getAriaLabel, getRoleDescription } from "../utils/accessibility";
import ThemeToggle from "./ThemeToggle";
// Using simple SVG icons instead of react-icons

const Nav: React.FC = () => {
  const { 
    isDarkMode, 
    isNavOpen, 
    activeLink, 
    isTopOfPage,
    toggleNav,
    setActiveLink 
  } = useApp();
  
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const navRef = useRef<HTMLElement>(null);

  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: () => {
      if (isNavOpen) {
        toggleNav();
      }
    },
  });

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const matchedLink = navLinks.find(
              (link) => link.href === sectionId
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
      const section = document.getElementById(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [setActiveLink]);

  // Dynamic styles
  const navbarStyle = isTopOfPage
    ? "bg-transparent border-b border-white/10 backdrop-blur-md shadow-lg shadow-cyan-500/50"
    : isDarkMode
    ? "bg-gradient-to-r from-neutral-800/90 via-primary-800 to-secondary-800 shadow-lg shadow-primary-400/50 border-b border-white/10 backdrop-blur-md"
    : "bg-gradient-to-r from-primary-500 via-neutral-800 to-secondary-500 shadow-lg shadow-primary-300/50 border-b border-neutral-300 backdrop-blur-md";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition duration-300 ${navbarStyle}`}
      role="navigation"
      aria-label={getRoleDescription('navigation')}>
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
          aria-label="Sravan Kumar Polu - Go to home section">
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
            <ThemeToggle 
              size="md"
              className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md"
            />
          </div>
        ) : (
          // Mobile Hamburger
          <div className="flex items-center gap-4">
            <ThemeToggle 
              size="sm"
              className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md"
            />
            <button
              onClick={toggleNav}
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label={getAriaLabel('toggle-navigation')}
              aria-expanded={isNavOpen}
              aria-controls="mobile-menu">
              {isNavOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {!isAboveMediumScreens && (
        <motion.ul
          id="mobile-menu"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isNavOpen ? 1 : 0, x: isNavOpen ? 0 : 50 }}
          transition={{ duration: 0.5 }}
          className={`absolute top-14 right-4 py-4 px-6 bg-white/90 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg space-y-2 ${
            isNavOpen ? "block" : "hidden"
          }`}
          role="menu"
          aria-label="Mobile navigation menu">
          {navLinks.map((item) => (
            <li key={item.label} role="none">
              <Link
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={(label: string) => {
                  setActiveLink(label);
                  toggleNav();
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
