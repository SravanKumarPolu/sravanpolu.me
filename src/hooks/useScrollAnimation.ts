import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export const useScrollAnimation = (
  threshold: number = 0.1,
  triggerOnce: boolean = true
): UseScrollAnimationReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView, entry } = useInView({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -50px 0px',
  });

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      inViewRef(ref.current);
    }
  }, [inViewRef]);

  return { ref, inView, entry };
};

// Advanced scroll animation hook with multiple variants
export const useAdvancedScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    duration = 0.6
  } = options;

  const { ref, inView, entry } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return {
    ref,
    inView,
    entry,
    hasAnimated,
    animationProps: {
      initial: { opacity: 0, y: 50 },
      animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    }
  };
};

// Parallax scroll hook
export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

// Stagger animation hook for lists
export const useStaggerAnimation = (itemCount: number, delay: number = 0.1) => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  const getStaggerProps = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: {
      duration: 0.6,
      delay: index * delay,
      ease: "easeOut"
    }
  });

  return { ref, inView, getStaggerProps };
};

// Reveal animation hook with direction
export const useRevealAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50
) => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': return { opacity: 1, y: 0 };
      case 'down': return { opacity: 1, y: 0 };
      case 'left': return { opacity: 1, x: 0 };
      case 'right': return { opacity: 1, x: 0 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return {
    ref,
    inView,
    animationProps: {
      initial: getInitialPosition(),
      animate: inView ? getAnimatePosition() : getInitialPosition(),
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
};

// Scale animation hook
export const useScaleAnimation = (scale: number = 0.8) => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  return {
    ref,
    inView,
    animationProps: {
      initial: { opacity: 0, scale },
      animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale },
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
};

// Rotate animation hook
export const useRotateAnimation = (rotation: number = 10) => {
  const { ref, inView } = useScrollAnimation(0.1, true);

  return {
    ref,
    inView,
    animationProps: {
      initial: { opacity: 0, rotate: rotation },
      animate: inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: rotation },
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
};