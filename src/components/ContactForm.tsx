import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';

const ContactForm: React.FC = () => {
  const { shouldReduceMotion } = useAccessibility();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative"
    >
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-3xl"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* Modern Asymmetrical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column - Content */}
        <motion.div variants={itemVariants} className="text-left">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-4 sm:mb-6">
            <span className="text-cyan-400 text-sm font-medium">Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.2] tracking-tight">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Ready to bring your ideas to life? Reach out by email and let's discuss your project.
          </p>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📧</span>
              </div>
              <div>
                <div className="text-white font-semibold">Email</div>
                <div className="text-gray-300">sravanpolu.me@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💼</span>
              </div>
              <div>
                <div className="text-white font-semibold">Available</div>
                <div className="text-gray-300">For freelance projects</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Static Contact CTA */}
        <motion.div variants={itemVariants} className="relative">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact</h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  This site does not use backend email delivery, so direct email is the most reliable option.
                </p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-white font-semibold mb-2">Send email directly</p>
                <a
                  href="mailto:sravanpolu.me@gmail.com"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-center text-sm font-semibold text-white transition hover:from-cyan-600 hover:to-blue-700"
                >
                  Email sravanpolu.me@gmail.com
                </a>
              </div>
              <div className="rounded-2xl bg-blue-950/20 border border-blue-700/20 p-5">
                <p className="text-white font-semibold mb-2">Why this change</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The previous form was not connected to a mail service, so messages could not be delivered reliably.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
