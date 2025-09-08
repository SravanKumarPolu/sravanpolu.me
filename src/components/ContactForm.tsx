import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHaptic } from '../hooks/useHaptic';
import { useAccessibility } from '../hooks/useAccessibility';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { triggerHaptic } = useHaptic();
  const { shouldReduceMotion } = useAccessibility();

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof ContactFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      triggerHaptic('heavy');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    triggerHaptic('medium');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      triggerHaptic('medium');
    } catch (error) {
      setSubmitStatus('error');
      triggerHaptic('heavy');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      className="w-full max-w-3xl mx-auto py-20 sm:py-24 md:py-28 px-8 bg-black border-4 border-white rounded-none shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden"
    >
      {/* 2024 Bold Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>
      
      <motion.div variants={itemVariants} className="text-center mb-8 relative z-10">
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight">
          LET'S WORK <span className="text-yellow-400">TOGETHER</span>
        </h2>
        <p className="text-xl text-white font-bold uppercase tracking-wide">
          READY TO BRING YOUR IDEAS TO LIFE? SEND ME A MESSAGE AND LET'S DISCUSS YOUR PROJECT.
        </p>
      </motion.div>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="space-y-6 relative z-10"
        aria-label="Contact form"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-lg font-black text-white mb-3 uppercase tracking-wide">
              NAME *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              className={`w-full px-6 py-4 bg-white border-4 border-white text-black placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all duration-300 font-bold text-lg ${
                errors.name ? 'border-red-500' : 'border-white'
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.name}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-lg font-black text-white mb-3 uppercase tracking-wide">
              EMAIL *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              className={`w-full px-6 py-4 bg-white border-4 border-white text-black placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all duration-300 font-bold text-lg ${
                errors.email ? 'border-red-500' : 'border-white'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <label htmlFor="subject" className="block text-lg font-black text-white mb-3 uppercase tracking-wide">
            SUBJECT *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            aria-describedby={errors.subject ? "subject-error" : undefined}
            aria-invalid={!!errors.subject}
            className={`w-full px-6 py-4 bg-white border-4 border-white text-black placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all duration-300 font-bold text-lg ${
              errors.subject ? 'border-red-500' : 'border-white'
            }`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.subject}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="message" className="block text-lg font-black text-white mb-3 uppercase tracking-wide">
            MESSAGE *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            rows={6}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
            className={`w-full px-6 py-4 bg-white border-4 border-white text-black placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all duration-300 resize-none font-bold text-lg ${
              errors.message ? 'border-red-500' : 'border-white'
            }`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            aria-describedby="submit-status"
            className="px-12 py-6 bg-yellow-400 text-black font-black text-xl uppercase tracking-wide border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 hover:border-yellow-400 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" aria-hidden="true"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <span className="relative z-10">SEND MESSAGE</span>
            )}
          </motion.button>
          <div id="submit-status" className="sr-only" aria-live="polite">
            {isSubmitting && "Form is being submitted"}
            {submitStatus === 'success' && "Message sent successfully"}
            {submitStatus === 'error' && "Failed to send message"}
          </div>
        </motion.div>
      </motion.form>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
            role="alert"
            aria-live="polite"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2" aria-hidden="true">✅</span>
              Message sent successfully! I'll get back to you soon.
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
            role="alert"
            aria-live="polite"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2" aria-hidden="true">❌</span>
              Something went wrong. Please try again or contact me directly.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;
