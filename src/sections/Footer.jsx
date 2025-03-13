import { footerLinks, socialMedia } from "../constants";

import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="footer" className="bg-neutral py-12 w-full">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6 px-6 sm:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 place-items-center">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="relative flex justify-center items-center card card-bordered shadow-xl bg-base-100">
            <figure>
              <a href="/" className="relative">
                <img
                  src={footerLogo}
                  alt="footer logo"
                  className="w-24 h-24 rounded-full border-4 border-primary shadow-xl transition-transform hover:scale-110 hover:border-accent"
                />
              </a>
            </figure>
            <div className="card-body text-center">
              <h4 className="card-title text-xl text-center font-semibold text-gray-500">
                About me
              </h4>
              <p className="text-gray-600 max-w-xs">
                Showcasing my journey as a developer through projects and
                innovations.
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="flex flex-wrap justify-center sm:justify-start gap-8 card card-bordered shadow-xl w-96 bg-base-100">
            {footerLinks.map((section) => (
              <div
                key={section.title}
                className="card-body text-center sm:text-left">
                <h4 className="card-title text-xl font-semibold text-gray-500">
                  {section.title}
                </h4>
                <ul>
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
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center">
          <motion.div
            className="card card-bordered shadow-xl w-96 bg-base-100"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.7 }}>
            <div className="card-body text-center gap-6">
              <h4 className="card-title text-gray-500">Follow Me</h4>
              <div className="flex gap-4 flex-wrap justify-center">
                {socialMedia.map((icon) => (
                  <a
                    key={icon.name}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group p-3 bg-white rounded-full shadow-lg transition hover:bg-blue-500">
                    <figure>
                      <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
                    </figure>
                    <span className="absolute opacity-0 group-hover:opacity-100 text-xs bg-black text-white rounded px-2 py-1 bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 transition">
                      {icon.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom - Copyright */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-10 pt-6 border-t border-gray-700 text-center">
          <img src={copyrightSign} alt="Copyright" width={20} height={20} />
          <p className="text-gray-400 text-sm">© 2024 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
