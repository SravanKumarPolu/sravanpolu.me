import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHaptic } from '../hooks/useHaptic';
import { useAccessibility } from '../hooks/useAccessibility';
import subbaGAvatar from '../assets/images/subba_g.png';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "subba_g",
    role: "Project Owner",
    company: "Client Fiverr.com",
    content: "Sravan was wonderful to work with. He took the project by the horns and ran with it. He was very understanding of my vision for the project and quickly made the adjustments for it to match up with my vision. I appreciated his polite demeanor and quick response time. The outcome was fantastic and I would definitely work with him again. Great communication and quick handling—highly recommended!",
    rating: 5,
    avatar: subbaGAvatar
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Disabled for single testimonial
  const { triggerHaptic } = useHaptic();
  const { shouldReduceMotion } = useAccessibility();

  useEffect(() => {
    // Disabled auto-play since there's only one testimonial
    if (!isAutoPlaying || shouldReduceMotion || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, shouldReduceMotion]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    triggerHaptic('light');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    triggerHaptic('light');
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    triggerHaptic('light');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
        className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Asymmetrical Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Client Feedback</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              What Clients{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </motion.div>

          {/* Modern Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-3xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-6xl">💬</div>
            </div>
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              animate={{
                y: [0, 10, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Modern Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
              className="relative"
            >
              {/* Modern Card Design */}
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Modern Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-32 h-32 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
                        />
                        {/* Status indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-6">
                        {renderStars(testimonials[currentIndex].rating)}
                        <span className="text-yellow-400 font-semibold ml-2">5.0</span>
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-medium">
                        "{testimonials[currentIndex].content}"
                      </blockquote>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold text-2xl text-white">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-gray-300 text-lg">
                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                          </div>
                        </div>
                        {/* Verified badge */}
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                          ✓ Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls - Hidden for single testimonial */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <motion.button
              onClick={prevSlide}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
