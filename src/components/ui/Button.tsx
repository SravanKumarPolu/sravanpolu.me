import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { designTokens } from '../../design-tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  magnetic?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ripple?: boolean;
  glow?: boolean;
  pulse?: boolean;
}

const buttonVariants = {
  base: "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu",
  variants: {
    size: {
      xs: "px-2 py-1 text-xs gap-1.5 rounded-md",
      sm: "px-3 py-1.5 text-sm gap-2 rounded-lg",
      md: "px-4 py-2 text-base gap-2 rounded-lg",
      lg: "px-6 py-3 text-lg gap-3 rounded-xl",
      xl: "px-8 py-4 text-xl gap-4 rounded-xl",
    },
    variant: {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl active:shadow-md",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl active:shadow-md",
      outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 bg-transparent",
      ghost: "text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500 bg-transparent",
      accent: "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl active:shadow-md",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl active:shadow-md",
    }
  }
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick,
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  magnetic = false,
  type = 'button',
  ripple = false,
  glow = false,
  pulse = false
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Advanced magnetic effect with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || disabled || loading) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) / rect.width;
    const distanceY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(distanceX * 0.3);
    mouseY.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (ripple && !disabled && !loading) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }
    }
    
    onClick?.();
  };
  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  const buttonClasses = `
    ${buttonVariants.base} 
    ${buttonVariants.variants.size[size]} 
    ${buttonVariants.variants.variant[variant]} 
    ${fullWidth ? 'w-full' : ''}
    ${glow ? 'shadow-lg hover:shadow-2xl' : ''}
    ${pulse ? 'animate-pulse' : ''}
    ${className}
  `.trim();

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      className={buttonClasses}
      style={{
        transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
        rotateX: magnetic ? rotateX : undefined,
        rotateY: magnetic ? rotateY : undefined,
        transformStyle: 'preserve-3d',
      }}
      whileHover={disabled || loading ? {} : { 
        scale: magnetic ? 1.02 : 1.05, 
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={disabled || loading ? {} : { 
        scale: 0.98, 
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {content}
      
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          animate={{
            width: 100,
            height: 100,
            x: -50,
            y: -50,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.button>
  );
};
