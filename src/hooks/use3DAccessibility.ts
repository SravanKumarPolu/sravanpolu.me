import { useEffect, useRef, useState, useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import { useKeyboardNavigation } from './useKeyboardNavigation';

interface Use3DAccessibilityOptions {
  enableKeyboardNavigation?: boolean;
  enableScreenReaderSupport?: boolean;
  enableHighContrast?: boolean;
  enableFocusManagement?: boolean;
  announceChanges?: boolean;
}

interface AccessibilityState {
  isNavigating: boolean;
  currentFocusIndex: number;
  totalElements: number;
  isScreenReaderActive: boolean;
  highContrastMode: boolean;
}

export const use3DAccessibility = (options: Use3DAccessibilityOptions = {}) => {
  const {
    enableKeyboardNavigation = true,
    enableScreenReaderSupport = true,
    enableHighContrast = true,
    enableFocusManagement = true,
    announceChanges = true
  } = options;

  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    isNavigating: false,
    currentFocusIndex: 0,
    totalElements: 0,
    isScreenReaderActive: false,
    highContrastMode: false
  });

  const { shouldReduceMotion } = useAccessibility();
  const announceRef = useRef<(message: string) => void>();
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const lastAnnouncementRef = useRef<string>('');

  // Detect screen reader
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader = (
        window.speechSynthesis ||
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[aria-live]') !== null
      );
      
      setAccessibilityState(prev => ({
        ...prev,
        isScreenReaderActive: Boolean(hasScreenReader)
      }));
    };

    detectScreenReader();
  }, []);

  // Detect high contrast mode
  useEffect(() => {
    if (!enableHighContrast) return;

    const detectHighContrast = () => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      setAccessibilityState(prev => ({
        ...prev,
        highContrastMode: mediaQuery.matches
      }));

      const handleChange = (e: MediaQueryListEvent) => {
        setAccessibilityState(prev => ({
          ...prev,
          highContrastMode: e.matches
        }));
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    };

    detectHighContrast();
  }, [enableHighContrast]);

  // Keyboard navigation
  useKeyboardNavigation({
    onArrowUp: enableKeyboardNavigation ? () => {
      setAccessibilityState(prev => ({
        ...prev,
        currentFocusIndex: Math.max(0, prev.currentFocusIndex - 1),
        isNavigating: true
      }));
    } : undefined,
    
    onArrowDown: enableKeyboardNavigation ? () => {
      setAccessibilityState(prev => ({
        ...prev,
        currentFocusIndex: Math.min(prev.totalElements - 1, prev.currentFocusIndex + 1),
        isNavigating: true
      }));
    } : undefined,
    
    onArrowLeft: enableKeyboardNavigation ? () => {
      setAccessibilityState(prev => ({
        ...prev,
        currentFocusIndex: Math.max(0, prev.currentFocusIndex - 1),
        isNavigating: true
      }));
    } : undefined,
    
    onArrowRight: enableKeyboardNavigation ? () => {
      setAccessibilityState(prev => ({
        ...prev,
        currentFocusIndex: Math.min(prev.totalElements - 1, prev.currentFocusIndex + 1),
        isNavigating: true
      }));
    } : undefined,
    
    onTab: enableFocusManagement ? () => {
      setAccessibilityState(prev => ({
        ...prev,
        currentFocusIndex: (prev.currentFocusIndex + 1) % prev.totalElements,
        isNavigating: true
      }));
    } : undefined,
    
    onEscape: () => {
      setAccessibilityState(prev => ({
        ...prev,
        isNavigating: false
      }));
    }
  });

  // Focus management
  useEffect(() => {
    if (!enableFocusManagement || !accessibilityState.isNavigating) return;

    const currentElement = focusableElementsRef.current[accessibilityState.currentFocusIndex];
    if (currentElement) {
      currentElement.focus();
      currentElement.scrollIntoView({ 
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'center'
      });
    }
  }, [accessibilityState.currentFocusIndex, accessibilityState.isNavigating, enableFocusManagement, shouldReduceMotion]);

  // Announce changes
  const announce = useCallback((message: string) => {
    if (!announceChanges || !enableScreenReaderSupport) return;
    
    // Prevent duplicate announcements
    if (message === lastAnnouncementRef.current) return;
    lastAnnouncementRef.current = message;

    // Use live region for announcements
    const liveRegion = document.getElementById('3d-accessibility-live-region') || 
      (() => {
        const region = document.createElement('div');
        region.id = '3d-accessibility-live-region';
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only';
        document.body.appendChild(region);
        return region;
      })();

    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }, [announceChanges, enableScreenReaderSupport]);

  // Register focusable elements
  const registerFocusableElements = useCallback((elements: HTMLElement[]) => {
    focusableElementsRef.current = elements;
    setAccessibilityState(prev => ({
      ...prev,
      totalElements: elements.length
    }));
  }, []);

  // Get accessibility attributes
  const getAccessibilityAttributes = useCallback((index: number, label: string) => {
    return {
      role: 'button',
      tabIndex: accessibilityState.isNavigating ? (index === accessibilityState.currentFocusIndex ? 0 : -1) : 0,
      'aria-label': label,
      'aria-describedby': `3d-element-${index}-description`,
      'aria-current': index === accessibilityState.currentFocusIndex ? 'true' : 'false',
      'aria-live': accessibilityState.isNavigating ? 'polite' : 'off'
    };
  }, [accessibilityState]);

  // Get 3D scene accessibility settings
  const get3DSceneSettings = useCallback(() => {
    return {
      // Disable complex animations for reduced motion
      enableAnimations: !shouldReduceMotion,
      
      // Reduce complexity for better performance
      enableComplexShaders: !shouldReduceMotion,
      
      // High contrast materials
      useHighContrast: accessibilityState.highContrastMode,
      
      // Simplified interactions
      enableComplexInteractions: !shouldReduceMotion,
      
      // Screen reader optimizations
      enableScreenReaderMode: accessibilityState.isScreenReaderActive,
      
      // Focus indicators
      showFocusIndicators: accessibilityState.isNavigating
    };
  }, [shouldReduceMotion, prefersReducedData, accessibilityState]);

  // Get accessible color scheme
  const getAccessibleColors = useCallback(() => {
    if (accessibilityState.highContrastMode) {
      return {
        primary: '#000000',
        secondary: '#FFFFFF',
        background: '#FFFFFF',
        text: '#000000',
        border: '#000000',
        focus: '#0000FF'
      };
    }
    
    return {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: 'transparent',
      text: '#ffffff',
      border: '#6b7280',
      focus: '#60a5fa'
    };
  }, [accessibilityState.highContrastMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const liveRegion = document.getElementById('3d-accessibility-live-region');
      if (liveRegion) {
        liveRegion.remove();
      }
    };
  }, []);

  return {
    accessibilityState,
    announce,
    registerFocusableElements,
    getAccessibilityAttributes,
    get3DSceneSettings,
    getAccessibleColors,
    // Utility functions
    isAccessible: accessibilityState.isScreenReaderActive || accessibilityState.highContrastMode,
    shouldSimplify: shouldReduceMotion,
    canUseAdvancedFeatures: !shouldReduceMotion && !accessibilityState.isScreenReaderActive
  };
};
