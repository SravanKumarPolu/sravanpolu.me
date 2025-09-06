import React, { useState, useEffect, Suspense, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAccessibility } from '../../hooks/useAccessibility';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import { use3DAccessibility } from '../../hooks/use3DAccessibility';

interface Lazy3DWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  enablePerformanceMonitoring?: boolean;
  enableMemoryOptimization?: boolean;
  preloadDelay?: number;
  unloadDelay?: number;
  showLoadingProgress?: boolean;
}

// Enhanced Performance-optimized 3D wrapper with lazy loading
const Lazy3DWrapper: React.FC<Lazy3DWrapperProps> = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  enablePerformanceMonitoring = true,
  enableMemoryOptimization = true,
  preloadDelay = 100,
  unloadDelay = 5000,
  showLoadingProgress = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isUnloading, setIsUnloading] = useState(false);
  const unloadTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { shouldReduceMotion } = useAccessibility();
  const { announce } = use3DAccessibility();

  // Enhanced Performance monitoring
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

  // Enhanced visibility handling with memory optimization
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      announce('Loading 3D content');
      
      // Clear any existing unload timer
      if (unloadTimerRef.current) {
        clearTimeout(unloadTimerRef.current);
        unloadTimerRef.current = null;
      }
      
      // Delay rendering to improve performance
      const timer = setTimeout(() => {
        setShouldRender(true);
        setIsUnloading(false);
      }, preloadDelay);
      
      return () => clearTimeout(timer);
    } else if (!inView && isVisible && enableMemoryOptimization) {
      // Start unload timer when out of view
      unloadTimerRef.current = setTimeout(() => {
        setIsUnloading(true);
        setShouldRender(false);
        setIsLoaded(false);
        setLoadingProgress(0);
        announce('3D content unloaded to save memory');
      }, unloadDelay);
    }
  }, [inView, isVisible, preloadDelay, unloadDelay, enableMemoryOptimization, announce]);

  // Fallback: If intersection observer doesn't work, render after a delay
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!shouldRender && !isUnloading) {
        setShouldRender(true);
      }
    }, 2000); // Render after 2 seconds regardless

    return () => clearTimeout(fallbackTimer);
  }, [shouldRender, isUnloading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unloadTimerRef.current) {
        clearTimeout(unloadTimerRef.current);
      }
    };
  }, []);

  // Enhanced loaded state handling
  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
    setLoadingProgress(100);
    announce('3D content loaded successfully');
  }, [announce]);

  // Simulate loading progress
  useEffect(() => {
    if (shouldRender && !isLoaded && showLoadingProgress) {
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Stop at 90% until actually loaded
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [shouldRender, isLoaded, showLoadingProgress]);

  // Memoized fallback component
  const defaultFallback = useMemo(() => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">Loading 3D Experience...</p>
        {showLoadingProgress && (
          <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto">
            <div 
              className="h-2 bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        )}
        {enableMemoryOptimization && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
            Memory optimized loading
          </p>
        )}
      </div>
    </div>
  ), [loadingProgress, showLoadingProgress, enableMemoryOptimization]);


  return (
    <div ref={setNode} className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!shouldRender || isUnloading ? (
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
                  shouldReduceMotion,
                  enablePerformanceMonitoring
                })}
              </div>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Performance indicator */}
      {enablePerformanceMonitoring && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
            isLoaded 
              ? 'bg-green-500/80' 
              : isUnloading 
                ? 'bg-orange-500/80' 
                : 'bg-blue-500/80'
          }`}>
            {isLoaded 
              ? '3D Ready' 
              : isUnloading 
                ? 'Unloading...' 
                : 'Loading...'}
          </div>
        </div>
      )}

      {/* Memory optimization indicator */}
      {enableMemoryOptimization && isVisible && (
        <div className="absolute bottom-2 right-2 z-10">
          <div className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            Memory Optimized
          </div>
        </div>
      )}
    </div>
  );
};

export default Lazy3DWrapper;
