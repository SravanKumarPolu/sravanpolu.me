import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-300 dark:bg-gray-700';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]',
    none: ''
  };

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    card: 'rounded-lg'
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Predefined skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader
        key={index}
        variant="text"
        width={index === lines - 1 ? '75%' : '100%'}
        className="h-4"
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
      <SkeletonLoader variant="circular" width={160} height={160} className="mx-auto mb-6" />
      <SkeletonLoader variant="text" width="80%" height={48} className="mx-auto mb-4" />
      <SkeletonLoader variant="text" width="60%" height={32} className="mx-auto mb-6" />
      <SkeletonText lines={3} className="mb-8" />
      <div className="flex justify-center space-x-4">
        <SkeletonLoader variant="rectangular" width={150} height={48} className="rounded-lg" />
        <SkeletonLoader variant="rectangular" width={150} height={48} className="rounded-lg" />
      </div>
    </div>
  </section>
);

export default SkeletonLoader;
