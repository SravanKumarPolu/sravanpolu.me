import React from "react";
import footerLogo from "../assets/images/footerLogo.png";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer id="footer" className="max-container">
      <div
        className="flex justify-between items-center
      gap-20 flex-wrap max-lg:flex-col"
      >
        <div
          className="flex flex-col
      gap-10 flex-wrap max-lg:flex-col"
        >
          <a href="/" className="flex justify-center align-middle">
            <img
              className="rounded-full align-middle object-cover ml-1 max-sm:pl-1"
              src={footerLogo}
              alt="logo"
              width={80}
              height={50}
            />
          </a>
          <p
            className="text-base font-montserrat w-[300px] text-white-400
          sm:max-w-sm"
          >
            This below sites use to Code practice and develops few sites in{" "}
          </p>
          <div className="flex  justify-center items-center gap-5 mt-2 ">
            {socialMedia.map((icon) => (
              <div
                className="flex  justify-center item-center gap-5
            w-12 h-12 bg-white rounded-full"
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex  items-center
      gap-20 flex-wrap max-lg:flex-col"
        >
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white
              font-montserrat text-2xl
              leading-normal font-medium mb-6"
              >
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="mt-3 text-white-400
                  font-montserrat text-base
                  leading-normal hover:text-slate-gray
                  cursor-pointer"
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
