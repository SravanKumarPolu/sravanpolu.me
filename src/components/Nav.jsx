import React from "react";
import headerLogo from "../assets/images/headerLogo.png";
import hamburger from "../assets/icons/hamburger.svg";
import { navLinks } from "../constants";
import { motion } from "framer-motion";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <header className="py-6 absolute z-10 w-full">
      <nav className="max-container flex justify-between items-center">
        {/* <a href="/">
          <img
            className="rounded-full object-cover ml-3 max-sm:pl-1 border-4 border-gradient-purple"
            src={headerLogo}
            alt="logo"
            width={70}
            height={50}
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle, red, gold 5px)",
            }}
          />
        </a> */}
        <motion.h1
          className="font-bold text-indigo-500 text-3xl mx-2 sm:text-2xl md:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}>
          sravanpolu.me
        </motion.h1>

        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                className="font-montserrat text-lg text-slate-gray"
                href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden max-lg:block mr-4">
          <img
            src={hamburger}
            alt="hamburger"
            onClick={toggleNav}
            width={25}
            height={25}
          />
          <ul
            className={`${
              isNavOpen ? "block" : "hidden"
            } max-lg:flex-1 flex flex-col max-w-sm absolute mt-5 bg-white top-14
            right-0 py-4 px-6 border
              border-gray-300 rounded-lg shadow-lg`}>
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  onClick={toggleNav}
                  className="font-montserrat gap-16 text-lg text-slate-gray"
                  href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
