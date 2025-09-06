import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, useRevealAnimation, useScaleAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  staggerDelay?: number;
  itemCount?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  staggerDelay = 0.1,
  itemCount = 1
}) => {
  const { ref, inView } = useScrollAnimation(threshold, triggerOnce);
  
  const getAnimationProps = () => {
    switch (animation) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      case 'slideDown':
        return {
          initial: { opacity: 0, y: -50 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      case 'slideLeft':
        return {
          initial: { opacity: 0, x: 50 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      case 'slideRight':
        return {
          initial: { opacity: 0, x: -50 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
          transition: { duration, delay, ease: "easeOut" }
        };
      
      default:
        return {
          initial: { opacity: 0, y: 50 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration, delay, ease: "easeOut" }
        };
    }
  };

  if (animation === 'stagger') {
    const { ref: staggerRef, getStaggerProps } = useStaggerAnimation(itemCount, staggerDelay);
    
    return (
      <div ref={staggerRef} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            {...getStaggerProps(index)}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

// Specialized animated components
export const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="fade" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const SlideUp: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="slideUp" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const SlideDown: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="slideDown" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const SlideLeft: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="slideLeft" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const SlideRight: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="slideRight" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const ScaleIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <AnimatedSection animation="scale" delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const StaggerContainer: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  staggerDelay?: number;
  itemCount?: number;
}> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  itemCount
}) => (
  <AnimatedSection 
    animation="stagger" 
    className={className}
    staggerDelay={staggerDelay}
    itemCount={itemCount || React.Children.count(children)}
  >
    {children}
  </AnimatedSection>
);
