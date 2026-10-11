import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { navLinks } from "../constants";
import { scrollToSection } from "../utils/navigation";

interface LinkProps {
  page: string;
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}

const Link: React.FC<LinkProps> = React.memo(({ page, selectedPage, setSelectedPage }) => {
  const isActive = selectedPage === page;
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  // Get the correct href from navLinks
  const navLink = navLinks.find(link => link.label === page);
  const pageLink = navLink ? `#${navLink.href}` : `#${page.toLowerCase()}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // scrollToSection calls e.preventDefault(), performs the smooth scroll,
    // and strips any pre-existing hash from the URL via history.replaceState.
    // If the target section doesn't exist, it returns false and we let the
    // native anchor behave as a progressive-enhancement fallback.
    const sectionId = navLink?.href || page.toLowerCase();
    if (scrollToSection(e, sectionId)) {
      setSelectedPage(page);
    }
  };

  return isAboveMediumScreens ? (
    <a
      href={pageLink}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={`relative group py-2 px-4 text-base sm:text-lg transition duration-300 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      }`}>
      {page}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />
    </a>
  ) : (
    <a
      href={pageLink}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={`block text-left text-base font-medium px-4 py-3 min-h-[48px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        isActive
          ? "text-white bg-cyan-600/30 border border-cyan-500/40"
          : "text-neutral-200 hover:bg-white/10"
      }`}>
      {page}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
