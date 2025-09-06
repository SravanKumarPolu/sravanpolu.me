import { useEffect, useState, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
  fps?: number;
  networkInfo?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
}

interface PerformanceConfig {
  enableMemoryMonitoring?: boolean;
  enableFPSMonitoring?: boolean;
  enableNetworkMonitoring?: boolean;
  slowRenderThreshold?: number;
  memoryWarningThreshold?: number;
  lowFPSThreshold?: number;
}

export const usePerformanceMonitor = (
  componentName: string, 
  config: PerformanceConfig = {}
) => {
  const {
    enableMemoryMonitoring = true,
    enableFPSMonitoring = true,
    enableNetworkMonitoring = true,
    slowRenderThreshold = 100,
    memoryWarningThreshold = 0.8,
    lowFPSThreshold = 30
  } = config;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(0);

  const measureFPS = useCallback(() => {
    frameCountRef.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTimeRef.current >= 1000) {
      fpsRef.current = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
      
      if (fpsRef.current < lowFPSThreshold) {
        console.warn(`Low FPS detected: ${fpsRef.current} FPS`);
      }
    }
    
    if (enableFPSMonitoring) {
      requestAnimationFrame(measureFPS);
    }
  }, [enableFPSMonitoring, lowFPSThreshold]);

  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return undefined;
  }, []);

  const getNetworkInfo = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const startTime = performance.now();
    
    // Start FPS monitoring
    if (enableFPSMonitoring) {
      measureFPS();
    }
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      const newMetrics: PerformanceMetrics = {
        loadTime: renderTime,
        renderTime,
        memoryUsage: enableMemoryMonitoring ? getMemoryUsage() : undefined,
        fps: enableFPSMonitoring ? fpsRef.current : undefined,
        networkInfo: enableNetworkMonitoring ? getNetworkInfo() : undefined,
      };
      
      setMetrics(newMetrics);
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} performance:`, newMetrics);
      }
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        if (renderTime > slowRenderThreshold) {
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }
        
        if (enableMemoryMonitoring && newMetrics.memoryUsage) {
          const { used, limit } = newMetrics.memoryUsage;
          if (used > limit * memoryWarningThreshold) {
            console.warn(`High memory usage detected: ${used}MB / ${limit}MB`);
          }
        }
      }
    };
  }, [componentName, enableMemoryMonitoring, enableFPSMonitoring, enableNetworkMonitoring, slowRenderThreshold, memoryWarningThreshold, measureFPS, getMemoryUsage, getNetworkInfo]);

  return metrics;
};

export const useMemoryMonitor = (warningThreshold: number = 0.8) => {
  const [memoryUsage, setMemoryUsage] = useState<{
    used: number;
    total: number;
    limit: number;
  } | null>(null);

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usage = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
        };
        
        setMemoryUsage(usage);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Memory usage:', usage);
        }
        
        // Warn if memory usage is high
        if (usage.used > usage.limit * warningThreshold) {
          console.warn('High memory usage detected:', usage);
        }
      }
    };

    // Check memory immediately
    checkMemory();
    
    // Check memory every 5 seconds
    const interval = setInterval(checkMemory, 5000);
    
    return () => clearInterval(interval);
  }, [warningThreshold]);

  return memoryUsage;
};

// Web Vitals monitoring
export const useWebVitals = () => {
  const [vitals, setVitals] = useState<{
    FCP?: number;
    LCP?: number;
    FID?: number;
    CLS?: number;
    TTFB?: number;
  }>({});

  useEffect(() => {
    const handleVital = (metric: any) => {
      setVitals(prev => ({
        ...prev,
        [metric.name]: metric.value
      }));
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vital - ${metric.name}:`, metric.value);
      }
    };

    // Import web-vitals dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(handleVital);
      getFID(handleVital);
      getFCP(handleVital);
      getLCP(handleVital);
      getTTFB(handleVital);
    });

  }, []);

  return vitals;
};

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnection = connection.effectiveType === 'slow-2g' || 
                           connection.effectiveType === '2g' ||
                           connection.downlink < 1;
      setIsSlowConnection(slowConnection);
    }

    // Check device capabilities
    const checkDeviceCapabilities = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const isLowEnd = !gl || 
                      navigator.hardwareConcurrency < 4 ||
                      (navigator as any).deviceMemory < 4;
      setIsLowEndDevice(isLowEnd);
    };

    checkDeviceCapabilities();
  }, []);

  return {
    isSlowConnection,
    isLowEndDevice,
    shouldReduceAnimations: isSlowConnection || isLowEndDevice,
    shouldLazyLoad: isSlowConnection,
    shouldReduceQuality: isSlowConnection || isLowEndDevice,
  };
};
