import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../hooks/useAccessibility";
import SectionShell from "./SectionShell";
import { contactLinks } from "../constants/portfolio";
import { socialMedia } from "../constants";
import { FiMail } from "react-icons/fi";

/**
 * Contact section — email-first contact panel.
 * Renamed from `ContactForm.tsx`: it never was a form, so the name no longer lies.
 * A real form was intentionally skipped to avoid adding backend infrastructure.
 */
const ContactSection: React.FC = () => {
  const { shouldReduceMotion } = useAccessibility();

  return (
    <SectionShell>
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Get in touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Have a project or role in mind?{" "}
              <span className="text-cyan-400">Let&apos;s talk.</span>
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg mb-4 leading-relaxed">
              Email works best. For projects, it helps if you include the scope, the timeline,
              any relevant links — and a budget range if you already have one. For roles, a short
              note about the team and stack is perfect.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base mb-8 leading-relaxed">
              I typically reply within 24–48 hours.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Direct email is the most reliable way to reach me — I typically reply within
                  24–48 hours.
                </p>
              </div>
              <a
                href={contactLinks.email.link}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 min-h-[48px] transition-colors"
              >
                <FiMail className="w-4 h-4" aria-hidden />
                Send an email
              </a>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-neutral-200">
                  <span className="font-semibold text-white">Availability:</span> freelance,
                  contract, and full-time — remote-friendly.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-3">Also find me on</p>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-white/15 bg-white/5 text-sm text-neutral-200 hover:border-cyan-400/50 hover:text-white transition-colors"
                    >
                      {social.icon ? (
                        <social.icon className="w-5 h-5 opacity-80" aria-hidden />
                      ) : (
                        social.src && (
                          <img src={social.src} alt="" className="w-5 h-5 invert opacity-80" width={20} height={20} />
                        )
                      )}
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default ContactSection;
