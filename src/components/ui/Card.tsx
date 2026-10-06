import React, { forwardRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { designTokens } from '../../design-tokens';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'gradient' | 'neon' | 'frosted';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  magnetic?: boolean;
  magneticStrength?: number;
  containerQuery?: boolean;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  glow?: boolean;
  tilt?: boolean;
  shimmer?: boolean;
}

const cardVariants = {
  base: "transition-all duration-300 transform-gpu relative overflow-hidden",
  variants: {
    variant: {
      default: "bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700",
      elevated: "bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl border border-neutral-200 dark:border-neutral-700",
      outlined: "bg-transparent border-2 border-neutral-200 dark:border-neutral-700",
      filled: "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
      glass: "bg-white/10 dark:bg-neutral-800/10 backdrop-blur-md border border-white/20 dark:border-neutral-700/50",
      gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700",
      neon: "bg-neutral-900 border border-primary-500/50 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40",
      frosted: "bg-white/5 dark:bg-neutral-800/5 backdrop-blur-xl border border-white/10 dark:border-neutral-700/20 shadow-2xl",
    },
    size: {
      xs: "p-3 rounded-lg",
      sm: "p-4 rounded-lg",
      md: "p-6 rounded-xl",
      lg: "p-8 rounded-xl",
      xl: "p-10 rounded-2xl",
    }
  }
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = '',
  onClick,
  hover = false,
  magnetic = false,
  magneticStrength = 0.05,
  containerQuery = false,
  onMouseMove,
  onMouseLeave,
  glow = false,
  tilt = false,
  shimmer = false
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Advanced tilt effect with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt && !magnetic) return;
    
    const rect = (ref as React.RefObject<HTMLDivElement>)?.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) / rect.width;
    const distanceY = (e.clientY - centerY) / rect.height;
    
    if (tilt) {
      mouseX.set(distanceX * 0.3);
      mouseY.set(distanceY * 0.3);
    }
    
    onMouseMove?.(e);
  };

  const handleMouseLeave = () => {
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
    setIsHovered(false);
    onMouseLeave?.();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const baseClasses = `
    ${cardVariants.base} 
    ${cardVariants.variants.variant[variant]} 
    ${cardVariants.variants.size[size]} 
    ${containerQuery ? '@container' : ''}
    ${glow ? 'shadow-lg hover:shadow-2xl' : ''}
    ${className}
  `.trim();
  
  const cardContent = (
    <motion.div 
      ref={ref}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        rotateX: tilt ? rotateX : undefined,
        rotateY: tilt ? rotateY : undefined,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Shimmer Effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      
      {/* Glow Effect */}
      {glow && variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {children}
    </motion.div>
  );

  if (magnetic) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        onClick={onClick}
        className={`cursor-pointer ${containerQuery ? '@container' : ''}`}
        style={{
          transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        onClick={onClick}
        className={`${onClick ? "cursor-pointer" : ""} ${containerQuery ? '@container' : ''}`}
        style={{
          transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
});

Card.displayName = 'Card';
