import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticCardProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({ 
  children, 
  strength = 0.2, 
  className = '',
  onClick
}) => {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic({ strength });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`cursor-pointer transition-transform duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
