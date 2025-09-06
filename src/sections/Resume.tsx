import DownArrow from "../components/DownArrow";
import { FiDownload } from "react-icons/fi";
import React from "react";
import UpArrow from "../components/UpArrow";
import { motion } from "framer-motion";

const Resume: React.FC = () => {
  const handleDownload = (): void => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      className="relative py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-center mb-12">
        Download My <span className="text-yellow-300">Resume</span>
      </motion.h2>

      {/* Resume Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="card w-full max-w-5xl mx-auto shadow-2xl bg-base-100 rounded-xl overflow-hidden">
        <figure className="px-4 pt-6">
          <iframe
            src="https://docs.google.com/gview?url=https://sravanpolu.me/Resume.pdf&embedded=true"
            title="Resume Preview"
            className="w-full max-w-5xl h-[500px] rounded-lg shadow-xl border border-gray-300"
          />
        </figure>

        <div className="card-body flex flex-col justify-center items-center gap-6 py-8">
          {/* Buttons Group */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* View Portfolio */}
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group btn btn-success btn-outline">
              View Portfolio 🚀
              <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-green-300 text-xl animate-bounce">
                <UpArrow />
              </span>
            </motion.a>

            {/* Download Resume */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="btn btn-accent gap-2">
              <FiDownload className="w-5 h-5" />
              Download Resume
            </motion.button>

            {/* Contact Me */}
            <motion.a
              href="#footer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group btn btn-warning btn-outline">
              Contact Me 📩
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-yellow-200 text-xl animate-bounce">
                <DownArrow />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
