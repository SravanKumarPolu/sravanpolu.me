import React, { useEffect, useRef } from "react";
import Link from "./Link";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useMediaQuery } from "@react-hook/media-query";
import { useApp } from "../contexts/AppContext";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { getAriaLabel, getRoleDescription } from "../utils/accessibility";
import { FiDownload } from "react-icons/fi";

const Nav: React.FC = () => {
  const { isDarkMode, isNavOpen, activeLink, isTopOfPage, toggleNav, setActiveLink } = useApp();
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const navRef = useRef<HTMLElement>(null);

  useKeyboardNavigation({
    onEscape: () => {
      if (isNavOpen) toggleNav();
    },
  });

  useEffect(() => {
    const getCurrentSection = (): string => {
      const navHeight = 80;
      const scrollPosition = window.scrollY;
      const tolerance = 4;
      let current = navLinks[0].label;

      for (const link of navLinks) {
        const section = document.getElementById(link.href);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition + navHeight + tolerance) {
          current = link.label;
        } else {
          break;
        }
      }

      const isBottomOfPage =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (isBottomOfPage) current = navLinks[navLinks.length - 1].label;

      return current;
    };

    const handleScroll = () => setActiveLink(getCurrentSection());

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setActiveLink]);

  const navbarStyle = isTopOfPage
    ? "bg-neutral-950/80 border-b border-white/10 backdrop-blur-md"
    : isDarkMode
    ? "bg-neutral-950/95 border-b border-white/10 backdrop-blur-lg shadow-lg"
    : "bg-neutral-950/95 border-b border-white/10 backdrop-blur-lg shadow-lg";

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Sravan_Kumar_Polu_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (!isAboveMediumScreens && isNavOpen) toggleNav();
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarStyle}`}
      role="navigation"
      aria-label={getRoleDescription("navigation")}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 md:py-4 max-w-7xl mx-auto">
        <a
          href="#home"
          className="font-semibold text-white text-sm sm:text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-1"
          aria-label="Sravan Kumar Polu - Go to home"
        >
          <span className="text-white">Sravan </span>
          <span className="text-cyan-400">Polu</span>
          <span className="hidden md:inline text-neutral-500 font-normal ml-2 text-sm">
            Developer
          </span>
        </a>

        {isAboveMediumScreens ? (
          <div className="flex gap-2 sm:gap-4 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                page={item.label}
                selectedPage={activeLink}
                setSelectedPage={setActiveLink}
              />
            ))}
            <a
              href="/Resume.pdf"
              onClick={handleResumeClick}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg text-sm font-semibold text-neutral-200 border border-white/15 bg-white/5 hover:border-cyan-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
              aria-label="Download resume PDF"
            >
              <FiDownload className="w-4 h-4" aria-hidden />
              Resume
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href="/Resume.pdf"
              onClick={handleResumeClick}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg bg-white/10 border border-white/15 text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Download resume"
            >
              <FiDownload className="w-5 h-5" aria-hidden />
            </a>
            <button
              onClick={toggleNav}
              className="text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/10 border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={getAriaLabel("toggle-navigation")}
              aria-expanded={isNavOpen}
              aria-controls="mobile-menu"
            >
              {isNavOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {!isAboveMediumScreens && isNavOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            className="fixed inset-0 bg-black/50 z-40"
            aria-label="Close menu"
            onClick={toggleNav}
          />
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed left-0 right-0 top-[57px] z-50 py-6 px-4 bg-neutral-950 border-b border-white/10 space-y-1"
            aria-label="Mobile navigation menu"
          >
            {navLinks.map((item) => (
              <li key={item.label}>
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
        </>
      )}
    </nav>
  );
};

export default Nav;
