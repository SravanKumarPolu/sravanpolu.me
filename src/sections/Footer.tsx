import { footerLinks, socialMedia, secondaryNavLinks } from "../constants";
import React from "react";
import copyrightSign from "../assets/icons/copyright-sign.svg";
import footerLogo from "../assets/images/footerLogo.png";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-neutral-950 border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Sravan Kumar Polu</h2>
            <p className="text-neutral-400 mb-6 leading-relaxed max-w-md">
              MERN stack developer · React · Next.js · TypeScript. Shipping web products end-to-end.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
              <img
                src={footerLogo}
                alt=""
                className="w-14 h-14 rounded-full border border-white/20 object-cover"
                loading="lazy"
                width={56}
                height={56}
              />
              <div>
                <p className="font-semibold text-white">Sravan Kumar Polu</p>
                <p className="text-cyan-400/90 text-sm">MERN Stack Developer</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Get in touch</h3>
              <div className="space-y-2">
                {footerLinks[0].links.map((link) => (
                  <a
                    key={link.name}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-cyan-400/40 text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Follow</h3>
              <div className="flex gap-3 flex-wrap">
                {socialMedia.map((icon) => (
                  <a
                    key={icon.name}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-white/10 hover:border-cyan-400/40 transition-colors"
                    aria-label={`Follow on ${icon.name}`}
                  >
                    <img
                      src={icon.src}
                      alt=""
                      className="w-5 h-5 invert opacity-80"
                      width={20}
                      height={20}
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 mb-10 text-sm" aria-label="More sections">
          {secondaryNavLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="text-neutral-400 hover:text-cyan-400 transition-colors min-h-[44px] inline-flex items-center px-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <img src={copyrightSign} alt="" width={16} height={16} className="opacity-60" />
            <span>{currentYear} Sravan Kumar Polu</span>
          </div>
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
