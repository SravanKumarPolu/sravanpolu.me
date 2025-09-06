import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card' | 'avatar' | 'button';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'shimmer' | 'glow' | 'none';
  lines?: number;
  rounded?: boolean;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  lines = 1,
  rounded = true
}) => {
  const baseClasses = 'bg-gray-300 dark:bg-gray-700';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]',
    shimmer: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]',
    glow: 'animate-pulse bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%] animate-[glow_2s_ease-in-out_infinite]',
    none: ''
  };

  const variantClasses = {
    text: `h-4 ${rounded ? 'rounded' : ''}`,
    rectangular: rounded ? 'rounded' : '',
    circular: 'rounded-full',
    card: 'rounded-lg',
    avatar: 'rounded-full',
    button: 'rounded-lg'
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : style.width,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

// Predefined skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string; animation?: 'pulse' | 'wave' | 'shimmer' | 'glow' | 'none' }> = ({ 
  lines = 1, 
  className = '',
  animation = 'pulse'
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader
        key={index}
        variant="text"
        width={index === lines - 1 ? '75%' : '100%'}
        className="h-4"
        animation={animation}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <SkeletonLoader variant="circular" width={48} height={48} />
      <div className="flex-1">
        <SkeletonLoader variant="text" width="60%" height={20} className="mb-2" />
        <SkeletonLoader variant="text" width="40%" height={16} />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonProjectCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
    <SkeletonLoader variant="rectangular" height={200} className="w-full" />
    <div className="p-4">
      <SkeletonLoader variant="text" width="80%" height={24} className="mb-2" />
      <SkeletonLoader variant="text" width="60%" height={16} className="mb-4" />
      <div className="flex justify-between items-center">
        <SkeletonLoader variant="text" width="40%" height={16} />
        <SkeletonLoader variant="rectangular" width={80} height={32} className="rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonNav: React.FC = () => (
  <nav className="fixed top-0 z-50 w-full bg-gray-800 p-4">
    <div className="flex justify-between items-center">
      <SkeletonLoader variant="text" width={200} height={32} />
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonLoader key={index} variant="text" width={60} height={24} />
        ))}
      </div>
    </div>
  </nav>
);

export const SkeletonHero: React.FC = () => (
  <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
    <div className="text-center max-w-2xl">
      <SkeletonLoader variant="circular" width={160} height={160} className="mx-auto mb-6" animation="shimmer" />
      <SkeletonLoader variant="text" width="80%" height={48} className="mx-auto mb-4" animation="shimmer" />
      <SkeletonLoader variant="text" width="60%" height={32} className="mx-auto mb-6" animation="shimmer" />
      <SkeletonText lines={3} className="mb-8" animation="shimmer" />
      <div className="flex justify-center space-x-4">
        <SkeletonLoader variant="button" width={150} height={48} animation="shimmer" />
        <SkeletonLoader variant="button" width={150} height={48} animation="shimmer" />
      </div>
    </div>
  </section>
);

// Advanced skeleton components
export const SkeletonCardAdvanced: React.FC<{ variant?: 'default' | 'elevated' | 'glass' }> = ({ 
  variant = 'default' 
}) => {
  const cardClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl',
    glass: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20'
  };

  return (
    <motion.div
      className={`rounded-xl p-6 ${cardClasses[variant]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <SkeletonLoader variant="avatar" width={48} height={48} animation="shimmer" />
        <div className="flex-1">
          <SkeletonLoader variant="text" width="60%" height={20} className="mb-2" animation="shimmer" />
          <SkeletonLoader variant="text" width="40%" height={16} animation="shimmer" />
        </div>
      </div>
      <SkeletonLoader variant="rectangular" height={200} className="mb-4" animation="shimmer" />
      <SkeletonText lines={2} animation="shimmer" />
    </motion.div>
  );
};

export const SkeletonProjectCardAdvanced: React.FC = () => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <SkeletonLoader variant="rectangular" height={200} className="mb-4" animation="shimmer" />
    <SkeletonLoader variant="text" width="80%" height={24} className="mb-2" animation="shimmer" />
    <SkeletonLoader variant="text" width="60%" height={16} className="mb-4" animation="shimmer" />
    <SkeletonLoader variant="button" width={120} height={36} animation="shimmer" />
  </motion.div>
);

export const SkeletonNavAdvanced: React.FC = () => (
  <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
    <div className="flex items-center justify-between">
      <SkeletonLoader variant="text" width={120} height={32} animation="shimmer" />
      <div className="flex space-x-4">
        <SkeletonLoader variant="text" width={60} height={20} animation="shimmer" />
        <SkeletonLoader variant="text" width={60} height={20} animation="shimmer" />
        <SkeletonLoader variant="text" width={60} height={20} animation="shimmer" />
      </div>
    </div>
  </nav>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonLoader 
            key={index} 
            variant="text" 
            width={100} 
            height={20} 
            animation="shimmer" 
          />
        ))}
      </div>
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonLoader 
                key={colIndex} 
                variant="text" 
                width={80} 
                height={16} 
                animation="shimmer" 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
