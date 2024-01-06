import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import headerLogo from "../assets/images/headerLogo.png";
import hamburger from "../assets/icons/hamburger.svg";
import { navLinks } from "../constants";
import { motion } from "framer-motion";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isTopOfPage = window.scrollY === 0;
  const flexBetween = "flex justify-between";

  const navbarBackground = isTopOfPage
    ? ""
    : "text-black bg-pink-300 drop-shadow";
  return (
    <header
      className=" absolute z-10 w-full 
    
    ">
      <nav
        className={` ${navbarBackground} ${flexBetween} fixed  text-gray-700 top-0 z-30 w-full pb-5 sm:py-4 `}>
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
          className="font-bold  text-2xl mx-2 sm:text-2xl md:text-3xl"
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

        <motion.ul
          className="flex-1 flex justify-center items-center gap-16 max-lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a className="font-montserrat text-lg " href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </motion.ul>

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
              <li className="p-2" key={item.label}>
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
