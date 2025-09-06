import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { CustomButton as Button } from './Button';
import { usePerformanceMonitor, useMemoryMonitor, useWebVitals, usePerformanceOptimization } from '../../hooks/usePerformanceMonitor';
// import { useAccessibility } from '../../hooks/useAccessibility';

interface PerformanceDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  // const { shouldReduceMotion } = useAccessibility();
  
  // Performance monitoring
  const appMetrics = usePerformanceMonitor('App', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true,
    enableNetworkMonitoring: true
  });
  
  const memoryUsage = useMemoryMonitor();
  const webVitals = useWebVitals();
  const { isSlowConnection, isLowEndDevice, shouldReduceAnimations } = usePerformanceOptimization();

  const [fps, setFps] = useState(60);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!isMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMonitoring]);

  const getPerformanceColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-500';
    if (value <= thresholds.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'Good';
    if (value <= thresholds.poor) return 'Needs Attention';
    return 'Poor';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${
            isMinimized ? 'h-16' : 'h-auto'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Performance Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={isMonitoring ? 'text-green-500' : 'text-neutral-500'}
              >
                {isMonitoring ? '⏸️' : '▶️'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? '⬆️' : '⬇️'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                ✕
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-y-auto max-h-[calc(90vh-80px)]"
              >
                <div className="p-6 space-y-6">
                  {/* Real-time Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="elevated" size="sm" className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{fps}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">FPS</div>
                      <div className={`text-xs ${getPerformanceColor(fps, { good: 50, poor: 30 })}`}>
                        {getPerformanceStatus(fps, { good: 50, poor: 30 })}
                      </div>
                    </Card>

                    <Card variant="elevated" size="sm" className="text-center">
                      <div className="text-2xl font-bold text-green-500">
                        {memoryUsage ? `${memoryUsage.used}MB` : 'N/A'}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">Memory</div>
                      <div className="text-xs text-neutral-500">
                        {memoryUsage ? `${Math.round((memoryUsage.used / memoryUsage.limit) * 100)}% used` : ''}
                      </div>
                    </Card>

                    <Card variant="elevated" size="sm" className="text-center">
                      <div className="text-2xl font-bold text-purple-500">
                        {appMetrics.renderTime ? `${appMetrics.renderTime.toFixed(1)}ms` : 'N/A'}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">Render Time</div>
                      <div className={`text-xs ${getPerformanceColor(appMetrics.renderTime || 0, { good: 16, poor: 50 })}`}>
                        {getPerformanceStatus(appMetrics.renderTime || 0, { good: 16, poor: 50 })}
                      </div>
                    </Card>
                  </div>

                  {/* Web Vitals */}
                  <Card variant="glass" size="md">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      Web Vitals
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(webVitals).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary-500">
                            {value ? `${value.toFixed(0)}` : 'N/A'}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Device & Network Info */}
                  <Card variant="glass" size="md">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      Device & Network
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Device Capabilities
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Connection:</span>
                            <span className={isSlowConnection ? 'text-yellow-500' : 'text-green-500'}>
                              {isSlowConnection ? 'Slow' : 'Fast'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Device:</span>
                            <span className={isLowEndDevice ? 'text-yellow-500' : 'text-green-500'}>
                              {isLowEndDevice ? 'Low-end' : 'High-end'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Animations:</span>
                            <span className={shouldReduceAnimations ? 'text-yellow-500' : 'text-green-500'}>
                              {shouldReduceAnimations ? 'Reduced' : 'Full'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Network Info
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span>{appMetrics.networkInfo?.effectiveType || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Downlink:</span>
                            <span>{appMetrics.networkInfo?.downlink || 'N/A'} Mbps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RTT:</span>
                            <span>{appMetrics.networkInfo?.rtt || 'N/A'} ms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Performance Recommendations */}
                  <Card variant="neon" size="md">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      Recommendations
                    </h3>
                    <div className="space-y-2 text-sm">
                      {fps < 30 && (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <span>⚠️</span>
                          <span>Consider reducing animations for better performance</span>
                        </div>
                      )}
                      {memoryUsage && memoryUsage.used > memoryUsage.limit * 0.8 && (
                        <div className="flex items-center gap-2 text-red-600">
                          <span>🚨</span>
                          <span>High memory usage detected</span>
                        </div>
                      )}
                      {isSlowConnection && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <span>💡</span>
                          <span>Optimizing for slow connection</span>
                        </div>
                      )}
                      {shouldReduceAnimations && (
                        <div className="flex items-center gap-2 text-green-600">
                          <span>✅</span>
                          <span>Animations automatically reduced for better performance</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
