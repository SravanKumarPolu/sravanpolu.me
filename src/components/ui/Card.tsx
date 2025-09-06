import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { designTokens } from '../../design-tokens';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'gradient';
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
}

const cardVariants = {
  base: "transition-all duration-300 transform-gpu",
  variants: {
    variant: {
      default: "bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700",
      elevated: "bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl border border-neutral-200 dark:border-neutral-700",
      outlined: "bg-transparent border-2 border-neutral-200 dark:border-neutral-700",
      filled: "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
      glass: "bg-white/10 dark:bg-neutral-800/10 backdrop-blur-md border border-white/20 dark:border-neutral-700/50",
      gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700",
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
  onMouseLeave
}, ref) => {
  const baseClasses = `
    ${cardVariants.base} 
    ${cardVariants.variants.variant[variant]} 
    ${cardVariants.variants.size[size]} 
    ${containerQuery ? '@container' : ''}
    ${className}
  `.trim();
  
  const cardContent = (
    <div 
      ref={ref}
      className={baseClasses}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
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
