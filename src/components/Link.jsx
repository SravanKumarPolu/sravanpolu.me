import React from "react";
import { useMediaQuery } from "@react-hook/media-query";

const Link = ({ page, selectedPage, setSelectedPage }) => {
  const isActive = selectedPage === page;
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const pageLink = `#${page.toLowerCase()}`;

  return isAboveMediumScreens ? (
    <a
      href={pageLink}
      onClick={() => setSelectedPage(page)}
      className={`relative group py-2 px-4 text-lg transition duration-300 font-medium ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}>
      {page}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  ) : (
    <a
      href={pageLink}
      onClick={() => setSelectedPage(page)}
      className={`block text-center text-base font-medium px-4 py-2 rounded-md ${
        isActive
          ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600"
          : "text-gray-800 hover:bg-gray-100"
      }`}>
      {page}
    </a>
  );
};

export default Link;
