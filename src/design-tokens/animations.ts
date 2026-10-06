export const animationTokens = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  spring: {
    gentle: { type: "spring", stiffness: 300, damping: 30 },
    wobbly: { type: "spring", stiffness: 400, damping: 25 },
    stiff: { type: "spring", stiffness: 500, damping: 40 },
    bouncy: { type: "spring", stiffness: 600, damping: 20 },
  },
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3, ease: "easeOut" }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    slideInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { opacity: 1, scale: 1 },
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    flipIn: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
};
