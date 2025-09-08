import { FiDownload } from "react-icons/fi";
import React from "react";
import { motion } from "framer-motion";
import { useHaptic } from "../hooks/useHaptic";
import { useAnnouncement } from "../components/AnnouncementSystem";
import { MagneticCard } from "../components/MagneticCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
// import { Button } from "../components/ui/Button";
// import { Card } from "../components/ui/Card";

const Resume: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const { announce } = useAnnouncement();
  const { ref: resumeRef, inView } = useScrollAnimation(0.1, true);

  const handleDownload = (): void => {
    triggerHaptic('medium');
    announce('Resume download started', 'polite');
    try {
      const link = document.createElement("a");
      link.href = "/Resume.pdf";
      link.download = "Sravan_Kumar_Polu_Resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      announce('Resume downloaded successfully', 'polite');
    } catch (error) {
      // Fallback: open in new tab
      window.open("/Resume.pdf", "_blank");
      announce('Resume opened in new tab', 'polite');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <motion.div
            ref={resumeRef}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Download Resume</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Resume
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Download my resume to learn more about my experience and skills. 
              Get a comprehensive overview of my professional journey.
            </p>

            {/* Modern Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-2xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FiDownload className="w-5 h-5" />
                Download Resume
              </motion.button>

              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-2xl hover:border-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                View Portfolio
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden border border-white/20">
                <iframe
                  src="https://docs.google.com/gview?url=https://sravanpolu.me/Resume.pdf&embedded=true"
                  title="Resume Preview"
                  className="w-full h-full border-0 rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>


        {/* Modern Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Key Skills &{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Technologies
              </span>
            </h3>
            <p className="text-lg text-gray-300">
              Technologies I work with to build amazing web applications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "React", color: "from-blue-500 to-blue-600" },
              { name: "Node.js", color: "from-green-500 to-green-600" },
              { name: "MongoDB", color: "from-emerald-500 to-emerald-600" },
              { name: "TypeScript", color: "from-blue-500 to-blue-600" },
              { name: "Tailwind CSS", color: "from-cyan-500 to-cyan-600" },
              { name: "Express.js", color: "from-gray-500 to-gray-600" },
              { name: "Git", color: "from-orange-500 to-orange-600" },
              { name: "AWS", color: "from-yellow-500 to-yellow-600" },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`px-6 py-4 rounded-2xl text-center font-semibold text-white bg-gradient-to-r ${skill.color} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
