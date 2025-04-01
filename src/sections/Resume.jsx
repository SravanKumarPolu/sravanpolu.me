import DownArrow from "../components/DownArrow";
import React from "react";
import UpArrow from "../components/UpArrow";
import { motion } from "framer-motion";
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
      id="resume"
      className="flex flex-col md:flex-row justify-center  items-center py-10 md:py-16 gap-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
      <div className="flex flex-col gap-5 m-2 sm:gap-6 md:gap-5 w-full my-4">
        {/* View Portfolio Button */}
        <motion.span
          className="flex justify-center sm:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}>
          <a
            href="#work"
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-600 transition-all duration-300 transform hover:scale-110">
            View Portfolio
            {/* Upward Arrow */}
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-green-600 text-xl opacity-100 animate-bounce">
              <UpArrow />
            </span>
          </a>
        </motion.span>

        {/* Download Resume Button */}
        <span className="flex justify-center">
          <button
            className="flex justify-center items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl focus:ring-2 focus:ring-blue-300"
            onClick={handleDownload}>
            Download Resume
          </button>
        </span>

        {/* Contact Me Button */}
        <motion.span
          className="flex justify-center sm:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 80 },
            visible: { opacity: 1, y: 0 },
          }}>
          <a
            href="#footer"
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-br hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110">
            Contact Me
            {/* Downward Arrow */}
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-600 text-xl opacity-100 animate-bounce">
              <DownArrow className="" />
            </span>
          </a>
        </motion.span>
      </div>
    </section>
  );
};

export default Resume;
