import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import SectionShell from './SectionShell';
import { contactLinks } from '../constants/portfolio';
import { socialMedia } from '../constants';

const ContactForm: React.FC = () => {
  const { shouldReduceMotion } = useAccessibility();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 },
    },
  };

  return (
    <SectionShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div variants={itemVariants}>
            <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Get in touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Let&apos;s build{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                something
              </span>
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg mb-8 leading-relaxed">
              Email works best — include the role, timeline, and any links. I typically reply within 24–48 hours.
            </p>
            <div className="space-y-3">
              <a
                href={contactLinks.email.link}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/40 transition-colors"
              >
                <span className="text-cyan-400 font-semibold shrink-0">Email</span>
                <span className="text-neutral-300 break-all text-sm sm:text-base">
                  {contactLinks.email.name}
                </span>
              </a>
              <p className="text-sm text-neutral-500">Available for freelance and full-time opportunities.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Direct email is the most reliable way to reach me.
                </p>
              </div>
              <a
                href={contactLinks.email.link}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 min-h-[48px] transition-colors"
              >
                Email {contactLinks.email.name}
              </a>
              <div>
                <p className="text-sm font-semibold text-white mb-3">Also find me on</p>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((icon) => (
                    <a
                      key={icon.name}
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-white/15 bg-white/5 text-sm text-neutral-200 hover:border-cyan-400/50 hover:text-white transition-colors"
                    >
                      <img src={icon.src} alt="" className="w-5 h-5 invert opacity-80" width={20} height={20} />
                      {icon.name}
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

export default ContactForm;
