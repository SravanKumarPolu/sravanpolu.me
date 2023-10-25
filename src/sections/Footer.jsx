import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  return (
    <footer id="footer" className="max-container">
      <div
        className="flex justify-between items-center
      gap-20 flex-wrap max-lg:flex-col">
        <div
          className="flex flex-col
      gap-10 flex-wrap max-lg:flex-col">
          <a
            href="/"
            style={{
              background: "white",
            }}
            className="flex  h-70  rounded-full justify-center align-middle">
            <img
              className="border-4 rounded-full align-middle object-cover ml-1 max-sm:pl-1"
              src={footerLogo}
              alt="logo"
              width={80}
              height={60}
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #0000ff, #008080, #FFC0CB, #c13584, #b5c135, #fd1d1d)",
                borderImage:
                  "linear-gradient(270deg, #0000ff, #008080, #FFC0CB, #c13584, #b5c135, #fd1d1d) 2",
                borderImageSlice: "2",
              }}
            />
          </a>
          <p
            className="text-base font-montserrat w-[300px] text-white-400
          sm:max-w-sm">
            This below sites use to Code practice and develops few sites in{" "}
          </p>
          <div className="flex  justify-center items-center gap-5 mt-2 ">
            {socialMedia.map((icon) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex  items-center
      gap-20 flex-wrap max-lg:flex-col">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white
              font-montserrat text-2xl
              leading-normal font-medium mb-6">
                {section.title}
              </h4>
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
        className="flex mt-2 p-1
        justify-center items-center gap-2
        font-montserrat cursor-pointer">
        <img
          src={copyrightSign}
          alt="copy right sign"
          width={20}
          height={20}
          className="rounded-full m-0 "
        />
        <p>Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
