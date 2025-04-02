import DownArrow from "../components/DownArrow";
import { FiDownload } from "react-icons/fi";
import React from "react";
import UpArrow from "../components/UpArrow";
import { motion } from "framer-motion";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf"; // Updated path from public folder
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      className="py-16 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-10">
        Download My <span className="text-yellow-200">Resume</span>
      </motion.h2>

      {/* Resume Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full flex justify-center my-6">
        <iframe
          src="https://docs.google.com/gview?url=https://sravanpolu.me/Resume.pdf&embedded=true"
          title="Resume Preview"
          className="w-[90%] max-w-4xl h-[500px] rounded-xl shadow-2xl border border-white/30"
        />
      </motion.div>

      {/* Button Group */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
        {/* View Portfolio */}
        <motion.a
          href="#work"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
          View Portfolio
          <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-green-200 text-xl animate-bounce">
            <UpArrow />
          </span>
        </motion.a>

        {/* Download Resume */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-full shadow-md border border-white/20 hover:bg-white/20 transition duration-300">
          <FiDownload className="text-lg" />
          Download Resume
        </motion.button>

        {/* Contact Me */}
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-semibold rounded-full shadow-lg transition duration-300">
          Contact Me
          <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-yellow-200 text-xl animate-bounce">
            <DownArrow />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Resume;
