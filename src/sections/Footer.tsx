import { footerLinks, socialMedia } from "../constants";

import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { motion } from "framer-motion";

const fadeIn = (direction: string = "up", delay: number = 0.2) => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay } },
});

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* About Section */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <img
                src={footerLogo}
                alt="Sravan Kumar Polu"
                className="w-16 h-16 rounded-full border-2 border-primary-500 shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Sravan Kumar Polu</h3>
                <p className="text-neutral-400">MERN Stack Developer</p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Passionate about building scalable, high-performance web applications 
              with modern technologies. Always learning and growing in the ever-evolving 
              world of web development.
            </p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
            <div className="space-y-3">
              {footerLinks[0].links.map((link) => (
                <a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-6">Follow Me</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialMedia.map((icon) => (
                <motion.a
                  key={icon.name}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-3 bg-neutral-800 rounded-full hover:bg-primary-600 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}>
                  <img 
                    src={icon.src} 
                    alt={icon.alt} 
                    className="w-6 h-6 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300" 
                  />
                  <span className="absolute opacity-0 group-hover:opacity-100 text-xs bg-white text-neutral-900 rounded px-2 py-1 bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 transition-all duration-300 z-30 whitespace-nowrap">
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
          className="text-center mb-12">
          <blockquote className="text-lg italic text-neutral-300 max-w-2xl mx-auto">
            "Every pixel matters. Every interaction counts. Building digital experiences 
            that make a difference."
          </blockquote>
          <cite className="text-sm text-neutral-400 mt-2 block">— Sravan Kumar Polu</cite>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeIn("up", 1.0)}
          initial="hidden"
          animate="visible"
          className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <img src={copyrightSign} alt="Copyright" width={16} height={16} />
              <span>© 2024 Sravan Kumar Polu. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>Built with</span>
              <span className="text-red-500">❤️</span>
              <span>using React & TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
