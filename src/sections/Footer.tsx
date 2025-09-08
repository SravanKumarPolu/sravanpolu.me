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
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
      role="contentinfo"
      aria-label="Site footer with contact information and social media links"
    >
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 90, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Modern Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - About */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Let's Connect</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Work Together?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Passionate about building scalable, high-performance web applications 
              with modern technologies. Always learning and growing in the ever-evolving 
              world of web development.
            </p>

            {/* Modern Profile Card */}
            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src={footerLogo}
                  alt="Sravan Kumar Polu - Professional headshot"
                  className="relative w-16 h-16 rounded-full border-4 border-white/20 shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Sravan Kumar Polu
                </h3>
                <p className="text-cyan-400 font-medium">
                  MERN Stack Developer
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            {/* Contact Links */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-6" id="contact-heading">
                Get in Touch
              </h4>
              <div className="space-y-4" role="list" aria-labelledby="contact-heading">
                {footerLinks[0].links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 text-gray-300 hover:text-white"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    role="listitem"
                    aria-label={`Contact via ${link.name}`}
                  >
                    <div className="w-3 h-3 rounded-full bg-cyan-400 group-hover:bg-cyan-300 transition-colors duration-300" aria-hidden="true"></div>
                    <span className="text-base font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-6" id="social-heading">
                Follow Me
              </h4>
              <div className="flex gap-4 flex-wrap" role="list" aria-labelledby="social-heading">
                {socialMedia.map((icon, index) => (
                  <motion.a
                    key={icon.name}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -2, 2, 0],
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300" aria-hidden="true"></div>
                    <span className="absolute opacity-0 group-hover:opacity-100 text-xs bg-white text-neutral-900 rounded-lg px-3 py-2 bottom-[-3rem] left-1/2 transform -translate-x-1/2 transition-all duration-300 z-30 whitespace-nowrap shadow-lg" aria-hidden="true">
                      {icon.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative max-w-4xl mx-auto p-8 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            <blockquote className="relative text-2xl lg:text-3xl italic text-white leading-relaxed mb-6 font-medium" cite="Sravan Kumar Polu">
              "Every pixel matters. Every interaction counts. Building digital experiences 
              that make a difference."
            </blockquote>
            <cite className="relative text-lg text-cyan-400 font-semibold">
              — Sravan Kumar Polu
            </cite>
          </div>
        </motion.div>

        {/* Modern Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <img src={copyrightSign} alt="Copyright" width={16} height={16} className="opacity-60" />
              <span>© 2024 Sravan Kumar Polu. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>Built with</span>
              <motion.span 
                className="text-red-500 text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ❤️
              </motion.span>
              <span>using React & TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
