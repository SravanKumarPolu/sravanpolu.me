import React from 'react';
import { useParallax } from '../hooks/useParallax';

interface ParallaxBackgroundProps {
  speed?: number;
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  speed = 0.3, 
  opacity = 0.2, 
  children,
  className = ''
}) => {
  const parallaxRef = useParallax(speed);

  return (
    <div 
      ref={parallaxRef} 
      className={`absolute inset-0 opacity-${Math.round(opacity * 100)} ${className}`}
      style={{ opacity }}
    >
      {children}
    </div>
  );
};
