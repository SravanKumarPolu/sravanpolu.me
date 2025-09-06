import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAccessibility } from '../../hooks/useAccessibility';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

interface Lazy3DWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  enablePerformanceMonitoring?: boolean;
}

// Performance-optimized 3D wrapper with lazy loading
const Lazy3DWrapper: React.FC<Lazy3DWrapperProps> = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  enablePerformanceMonitoring = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAccessibility();

  // Performance monitoring
  usePerformanceMonitor('Lazy3DWrapper', {
    enableMemoryMonitoring: enablePerformanceMonitoring,
    enableFPSMonitoring: enablePerformanceMonitoring
  });

  // Intersection observer for lazy loading
  const [setNode, entry] = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  });
  
  const inView = entry?.isIntersecting;

  // Handle visibility changes
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      
      // Delay rendering to improve performance
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView, isVisible]);

  // Handle loaded state
  const handleLoaded = () => {
    setIsLoaded(true);
  };

  // Default fallback component
  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">Loading 3D Experience...</p>
      </div>
    </div>
  );

  return (
    <div ref={setNode} className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!shouldRender ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {fallback || defaultFallback}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Suspense fallback={fallback || defaultFallback}>
              <div onLoad={handleLoaded}>
                {React.cloneElement(children as React.ReactElement, {
                  onLoaded: handleLoaded,
                  shouldReduceMotion
                })}
              </div>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance indicator */}
      {enablePerformanceMonitoring && isLoaded && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            3D Ready
          </div>
        </div>
      )}
    </div>
  );
};

export default Lazy3DWrapper;
