import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { footerLinks, socialMedia } from "../constants";
import { motion } from "framer-motion";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  return (
    <footer id="footer" className="max-container bg-gray-800 text-white p-8">
      <div className="  flex flex-col md:flex-row justify-between items-center gap-8">
        <div
          className="flex flex-col
      gap-10 flex-wrap max-lg:flex-col">
          <motion.a
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            href="/"
            style={{
              background: "white",
            }}
            className="flex h-80 rounded-full justify-center align-middle ">
            <img
              className="border-4 rounded-full align-middle border-red-300 object-cover ml-1 max-sm:pl-1 transition-transform transform hover:scale-150"
              src={footerLogo}
              alt="logo"
              width={60}
              height={60}
            />
          </motion.a>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            className="text-base font-montserrat w-[300px] text-white-400
          sm:max-w-sm">
            This below sites use to Code practice and develops few sites in{" "}
          </motion.p>
          <div className="flex  justify-center items-center gap-5 mt-2 ">
            {socialMedia.map((icon) => (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4 }}
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: { opacity: 1, x: 0 },
                }}
                key={icon.name}
                className="flex flex-col justify-center items-center gap-1 w-12 h-12 bg-white rounded-full relative"
                onMouseEnter={() => setHoveredIcon(icon)}
                onMouseLeave={() => setHoveredIcon(null)}>
                <a href={icon.link} target="_blank" rel="noopener noreferrer">
                  <img src={icon.src} alt={icon.alt} width={24} height={24} />
                </a>
                {hoveredIcon === icon && (
                  <div
                    className=" flex absolute text-gray-800
                   bg-white text-xs px-2 ml-[4rem]
                   py-1 mt-20 rounded opacity-100 
                    transform -translate-x-1/2">
                    {icon.name}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div
          className="flex  items-center
      gap-20 flex-wrap max-lg:flex-col">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <motion.h4
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4 }}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-white
              font-montserrat text-2xl
              leading-normal font-medium mb-6">
                {section.title}
              </motion.h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="mt-3 text-white-400
                  font-montserrat text-base
                  leading-normal hover:text-slate-gray
                  cursor-pointer">
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
        </div>
      </div>
      <div
        className="flex mt-6 p-1
        justify-center items-center gap-2
        font-montserrat cursor-pointer">
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          src={copyrightSign}
          alt="copy right sign"
          width={20}
          height={20}
          className="rounded-full m-0 "
        />
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}>
          Copyright. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
