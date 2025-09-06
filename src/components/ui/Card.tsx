import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  magnetic?: boolean;
  magneticStrength?: number;
}

const cardVariants = {
  base: "rounded-xl transition-all duration-300",
  variants: {
    variant: {
      default: "bg-white dark:bg-neutral-800 shadow-md",
      elevated: "bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl",
      outlined: "bg-transparent border-2 border-neutral-200 dark:border-neutral-700",
      filled: "bg-neutral-50 dark:bg-neutral-900",
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    }
  }
};

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = '',
  onClick,
  hover = false,
  magnetic = false,
  magneticStrength = 0.1
}) => {
  const baseClasses = `${cardVariants.base} ${cardVariants.variants.variant[variant]} ${cardVariants.variants.size[size]} ${className}`;
  
  const cardContent = (
    <div className={baseClasses}>
      {children}
    </div>
  );

  if (magnetic) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        onClick={onClick}
        className="cursor-pointer"
        style={{
          transform: `translate(${magneticStrength * 10}px, ${magneticStrength * 10}px)`
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
        className={onClick ? "cursor-pointer" : ""}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
