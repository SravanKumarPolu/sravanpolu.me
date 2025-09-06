import { FiDownload } from "react-icons/fi";
import React from "react";
import { motion } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { MagneticCard } from "../components/MagneticCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Resume: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const { ref: resumeRef, inView } = useScrollAnimation(0.1, true);

  const handleDownload = (): void => {
    triggerHaptic('medium');
    try {
      const link = document.createElement("a");
      link.href = "/Resume.pdf";
      link.download = "Sravan_Kumar_Polu_Resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Fallback: open in new tab
      window.open("/Resume.pdf", "_blank");
    }
  };

  return (
    <section
      id="resume"
      className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={resumeRef}
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-gpu">
          <h2 className="text-fluid-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Resume</span>
          </h2>
          <p className="text-fluid-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Download my resume to learn more about my experience and skills
          </p>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto">
          <MagneticCard strength={0.1} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Resume Preview */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                <iframe
                  src="https://docs.google.com/gview?url=https://sravanpolu.me/Resume.pdf&embedded=true"
                  title="Resume Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="btn btn-primary btn-lg gap-2 flex-1 sm:flex-none">
                  <FiDownload className="w-5 h-5" />
                  Download Resume
                </motion.button>

                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-lg flex-1 sm:flex-none">
                  View Portfolio
                </motion.a>

                <motion.a
                  href="#footer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-lg flex-1 sm:flex-none">
                  Contact Me
                </motion.a>
              </div>
            </div>
          </MagneticCard>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-fluid-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Key Skills & Technologies
            </h3>
          </div>
          
          <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 max-w-2xl mx-auto">
            {[
              { name: "React", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { name: "Node.js", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
              { name: "MongoDB", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
              { name: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
              { name: "Express.js", color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" },
              { name: "Git", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
              { name: "AWS", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
            ].map((skill, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg text-center font-medium ${skill.color}`}>
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
