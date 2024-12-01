import React from "react";
import resumePdf from "../assets/Resume.pdf";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="Resume"
      className="flex flex-col md:flex-row justify-center items-center h-auto py-10 md:py-16 gap-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col gap-5 m-2 sm:gap-6 md:gap-5 w-full">
        {/* View Portfolio Button */}
        <span className="flex justify-center sm:justify-start">
          <a
            href="#work"
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-600 transition-all duration-300 transform hover:scale-110">
            View Portfolio
            {/* Upward Arrow */}
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-green-600 text-xl opacity-100 animate-bounce">
              ▲
            </span>
          </a>
        </span>

        {/* Download Resume Button */}
        <span className="flex justify-center">
          <button className="flex justify-center items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl focus:ring-2 focus:ring-blue-300">
            Download Resume
          </button>
        </span>

        {/* Contact Me Button */}
        <span className="flex justify-center sm:justify-end">
          <a
            href="#footer"
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-br hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110">
            Contact Me
            {/* Downward Arrow */}
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-600 text-xl opacity-100 animate-bounce">
              ▼
            </span>
          </a>
        </span>
      </div>
    </section>
  );
};

export default Resume;
