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
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl text-white mb-6 leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    
                    <div className="text-white">
                      <div className="font-semibold text-xl">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-300">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
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
      </div>
    </section>
  );
};

export default Testimonials;
