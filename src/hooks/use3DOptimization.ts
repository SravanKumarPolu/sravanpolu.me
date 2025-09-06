import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './useAccessibility';
import { usePerformanceMonitor } from './usePerformanceMonitor';

interface Use3DOptimizationOptions {
  enableAdaptiveQuality?: boolean;
  enableMemoryManagement?: boolean;
  enableFPSMonitoring?: boolean;
  targetFPS?: number;
  lowEndDeviceThreshold?: number;
}

interface DeviceCapabilities {
  isLowEnd: boolean;
  maxTextureSize: number;
  maxVertexUniforms: number;
  maxFragmentUniforms: number;
  webglVersion: number;
  memoryInfo?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
}

export const use3DOptimization = (options: Use3DOptimizationOptions = {}) => {
  const {
    enableAdaptiveQuality = true,
    enableMemoryManagement = true,
    enableFPSMonitoring = true,
    targetFPS = 60,
    lowEndDeviceThreshold = 0.3
  } = options;

  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null);
  const [currentQuality, setCurrentQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [fps, setFps] = useState(60);
  const [isOptimized, setIsOptimized] = useState(false);
  
  const { shouldReduceMotion } = useAccessibility();
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number>();

  // Performance monitoring
  usePerformanceMonitor('3DOptimization', {
    enableMemoryMonitoring: enableMemoryManagement,
    enableFPSMonitoring: enableFPSMonitoring
  });

  // Detect device capabilities
  useEffect(() => {
    const detectCapabilities = (): DeviceCapabilities => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        return {
          isLowEnd: true,
          maxTextureSize: 1024,
          maxVertexUniforms: 256,
          maxFragmentUniforms: 256,
          webglVersion: 1
        };
      }

      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
      const maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
      const webglVersion = gl.getParameter(gl.VERSION).includes('WebGL 2') ? 2 : 1;

      // Memory info (if available)
      const memoryInfo = (performance as any).memory ? {
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize
      } : undefined;

      // Determine if device is low-end
      const isLowEnd = (
        maxTextureSize < 2048 ||
        maxVertexUniforms < 512 ||
        maxFragmentUniforms < 512 ||
        (memoryInfo && memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit > lowEndDeviceThreshold)
      );

      return {
        isLowEnd: Boolean(isLowEnd),
        maxTextureSize,
        maxVertexUniforms,
        maxFragmentUniforms,
        webglVersion,
        memoryInfo
      };
    };

    setDeviceCapabilities(detectCapabilities());
  }, [lowEndDeviceThreshold]);

  // FPS monitoring
  useEffect(() => {
    if (!enableFPSMonitoring) return;

    const measureFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTimeRef.current >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
        setFps(currentFPS);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      rafRef.current = requestAnimationFrame(measureFPS);
    };

    rafRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enableFPSMonitoring]);

  // Adaptive quality adjustment
  useEffect(() => {
    if (!enableAdaptiveQuality || !deviceCapabilities) return;

    let newQuality: 'high' | 'medium' | 'low' = 'high';

    if (shouldReduceMotion || deviceCapabilities.isLowEnd) {
      newQuality = 'low';
    } else if (fps < targetFPS * 0.8) {
      newQuality = 'medium';
    } else if (fps < targetFPS * 0.6) {
      newQuality = 'low';
    }

    setCurrentQuality(newQuality);
  }, [fps, deviceCapabilities, shouldReduceMotion, enableAdaptiveQuality, targetFPS]);

  // Memory management
  useEffect(() => {
    if (!enableMemoryManagement) return;

    const cleanup = () => {
      // Force garbage collection if available
      if ((window as any).gc) {
        (window as any).gc();
      }
    };

    // Cleanup every 30 seconds
    const interval = setInterval(cleanup, 30000);

    return () => clearInterval(interval);
  }, [enableMemoryManagement]);

  // Optimization status
  useEffect(() => {
    const optimized = (
      currentQuality === 'low' ||
      (deviceCapabilities?.isLowEnd) ||
      shouldReduceMotion
    );
    setIsOptimized(optimized);
  }, [currentQuality, deviceCapabilities, shouldReduceMotion]);

  // Get optimized settings
  const getOptimizedSettings = () => {
    const baseSettings = {
      shadows: true,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      powerPreference: 'high-performance' as WebGLPowerPreference
    };

    switch (currentQuality) {
      case 'low':
        return {
          ...baseSettings,
          shadows: false,
          antialias: false,
          pixelRatio: 1,
          powerPreference: 'low-power' as WebGLPowerPreference
        };
      case 'medium':
        return {
          ...baseSettings,
          shadows: false,
          antialias: true,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5)
        };
      default:
        return baseSettings;
    }
  };

  // Get texture quality
  const getTextureQuality = () => {
    if (!deviceCapabilities) return 1024;
    
    switch (currentQuality) {
      case 'low':
        return Math.min(deviceCapabilities.maxTextureSize, 512);
      case 'medium':
        return Math.min(deviceCapabilities.maxTextureSize, 1024);
      default:
        return Math.min(deviceCapabilities.maxTextureSize, 2048);
    }
  };

  // Get geometry complexity
  const getGeometryComplexity = () => {
    switch (currentQuality) {
      case 'low':
        return { segments: 8, rings: 8 };
      case 'medium':
        return { segments: 16, rings: 16 };
      default:
        return { segments: 32, rings: 32 };
    }
  };

  return {
    deviceCapabilities,
    currentQuality,
    fps,
    isOptimized,
    shouldReduceMotion,
    getOptimizedSettings,
    getTextureQuality,
    getGeometryComplexity,
    // Utility functions
    shouldRenderShadows: currentQuality !== 'low',
    shouldUseAntialias: currentQuality !== 'low',
    shouldUseHighDPI: currentQuality === 'high' && window.devicePixelRatio > 1
  };
};
