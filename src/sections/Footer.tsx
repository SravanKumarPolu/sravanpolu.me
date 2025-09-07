import { footerLinks, socialMedia } from "../constants";
import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const fadeIn = (direction: string = "up", delay: number = 0.2) => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
});

const Footer: React.FC = () => {
  const { currentTheme, isDarkMode } = useTheme();

  return (
    <footer 
      className="relative overflow-hidden"
      role="contentinfo"
      aria-label="Site footer with contact information and social media links"
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, ${currentTheme.colors.background} 0%, ${currentTheme.colors.surface} 100%)`
          : `linear-gradient(135deg, #1f2937 0%, #111827 100%)`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.1
              } 
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16"
        >
          {/* About Section - Takes up more space */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            className="lg:col-span-5"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src={footerLogo}
                  alt="Sravan Kumar Polu - Professional headshot"
                  className="relative w-20 h-20 rounded-full border-3 border-primary-500/20 shadow-2xl ring-4 ring-primary-500/10"
                  loading="lazy"
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-bold text-white mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  Sravan Kumar Polu
                </motion.h3>
                <motion.p 
                  className="text-lg text-blue-400 font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  MERN Stack Developer
                </motion.p>
              </div>
            </div>
            <motion.p 
              className="text-gray-300 leading-relaxed text-lg max-w-md mx-auto sm:mx-0"
              whileHover={{ scale: 1.01 }}
            >
              Passionate about building scalable, high-performance web applications 
              with modern technologies. Always learning and growing in the ever-evolving 
              world of web development.
            </motion.p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="lg:col-span-3"
          >
            <motion.h4 
              className="text-xl font-bold text-white mb-8 text-center lg:text-left"
              whileHover={{ scale: 1.02 }}
              id="contact-heading"
            >
              Get in Touch
            </motion.h4>
            <div className="space-y-4" role="list" aria-labelledby="contact-heading">
              {footerLinks[0].links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  role="listitem"
                  aria-label={`Contact via ${link.name}`}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300" aria-hidden="true"></div>
                  <span className="text-sm lg:text-base">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            className="lg:col-span-4"
          >
            <motion.h4 
              className="text-xl font-bold text-white mb-8 text-center lg:text-left"
              whileHover={{ scale: 1.02 }}
              id="social-heading"
            >
              Follow Me
            </motion.h4>
            <div className="flex justify-center lg:justify-start gap-4 flex-wrap" role="list" aria-labelledby="social-heading">
              {socialMedia.map((icon, index) => (
                <motion.a
                  key={icon.name}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -2, 2, 0],
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  role="listitem"
                  aria-label={`Follow on ${icon.name}`}
                >
                  <img 
                    src={icon.src} 
                    alt={`${icon.name} icon`}
                    className="w-6 h-6 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300" aria-hidden="true"></div>
                  <span className="absolute opacity-0 group-hover:opacity-100 text-xs bg-white text-neutral-900 rounded-lg px-3 py-2 bottom-[-3rem] left-1/2 transform -translate-x-1/2 transition-all duration-300 z-30 whitespace-nowrap shadow-lg" aria-hidden="true">
                    {icon.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            className="relative max-w-4xl mx-auto p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            <blockquote className="relative text-xl lg:text-2xl italic text-white leading-relaxed mb-4" cite="Sravan Kumar Polu">
              "Every pixel matters. Every interaction counts. Building digital experiences 
              that make a difference."
            </blockquote>
            <cite className="relative text-base text-blue-400 font-medium">
              — Sravan Kumar Polu
            </cite>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeIn("up", 1.0)}
          initial="hidden"
          animate="visible"
          className="border-t border-gray-700/50 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div 
              className="flex items-center gap-3 text-gray-400 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              <img src={copyrightSign} alt="Copyright" width={16} height={16} className="opacity-60" />
              <span>© 2024 Sravan Kumar Polu. All rights reserved.</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 text-sm text-gray-400"
              whileHover={{ scale: 1.02 }}
            >
              <span>Built with</span>
              <motion.span 
                className="text-red-500 text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ❤️
              </motion.span>
              <span>using React & TypeScript & Tailwind CSS</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
