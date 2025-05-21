import { footerLinks, socialMedia } from "../constants";

import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0.2) => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay } },
});

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-neutral py-16 w-full min-h-screen items-center justify-center">
      <div className="card bg-base-100 shadow-xl border border-gray-300 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 rounded-xl sm:rounded-2xl">
        {/* Grid Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-12 place-items-center">
          {/* Logo & About */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            className="card bg-base-100 shadow-md border border-gray-300 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl hover:shadow-2xl transition-all duration-700 mx-auto">
            <figure className="pt-6">
              <a href="/">
                <img
                  src={footerLogo}
                  alt="footer logo"
                  className="w-24 h-24 rounded-full border-4 border-primary shadow-lg transition-transform hover:scale-110 hover:border-accent"
                />
              </a>
            </figure>
            <div className="card-body text-center px-4 sm:px-6 md:px-8">
              <h4 className="card-title text-lg font-semibold text-gray-500">
                About Me
              </h4>
              <p className="text-gray-600">
                Showcasing my journey as a developer through projects and
                innovations.
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="card bg-base-100 shadow-md border border-gray-300 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl hover:shadow-2xl transition-all duration-700 mx-auto">
            {footerLinks.map((section) => (
              <div key={section.title} className="mb-4">
                <h4 className="card-title justify-center pt-6 text-lg font-semibold text-gray-500">
                  {section.title}
                </h4>
                <ul className="card-body">
                  {section.links.map((link) => (
                    <li
                      key={link.name}
                      className="text-gray-400 hover:text-accent transition mb-2">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center mt-8">
          <div className="card bg-base-100 shadow-md border border-gray-300 w-96 h-64 p-6 hover:shadow-2xl transition-all duration-500">
            <h4 className="card-title text-gray-500">Follow Me</h4>
            <div className="card-body text-center">
              <div className="flex gap-4 justify-center items-center p-4">
                {socialMedia.map((icon) => (
                  <motion.a
                    key={icon.name}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group p-3 bg-white rounded-full shadow-md transition hover:bg-blue-500"
                    whileHover={{ scale: 1.1 }}>
                    <figure>
                      <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
                    </figure>
                    <span className="absolute opacity-0 group-hover:opacity-100 text-xs bg-black text-white rounded px-2 py-1 bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 transition z-30">
                      {icon.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Toggle + Signature */}
        <div className="mt-10 flex flex-col justify-center items-center">
          <div className="text-sm italic text-center text-gray-400">
            “Every pixel matters. Every interaction counts.” — Sravan Polu
          </div>
          <div className="mt-4">
            <input type="checkbox" className="toggle theme-controller" />
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-10 pt-6 border-t border-gray-700 text-center">
          <img src={copyrightSign} alt="Copyright" width={20} height={20} />
          <p className="text-gray-400 text-sm">© 2024 All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
