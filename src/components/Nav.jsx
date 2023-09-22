import React from "react";
import headerLogo from "../assets/images/headerLogo.png";
import hamburger from "../assets/icons/hamburger.svg";
import { navLinks } from "../constants";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <header className="py-6 absolute z-10 w-full bg-red-300">
      <nav className="max-container flex justify-between items-center">
        <a href="/">
          <img
            className="rounded-full object-cover pl-2 max-sm:pl-1"
            src={headerLogo}
            alt="logo"
            width={70}
            height={50}
          />
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                className="font-montserrat text-lg text-slate-gray"
                href={item.href}
              >
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
              border-gray-300 rounded-lg shadow-lg`}
          >
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  onClick={toggleNav}
                  className="font-montserrat gap-16 text-lg text-slate-gray"
                  href={item.href}
                >
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
