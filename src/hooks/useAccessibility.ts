import { useEffect, useState, useCallback, useRef } from 'react';

interface AccessibilityOptions {
  enableReducedMotion?: boolean;
  enableHighContrast?: boolean;
  enableScreenReader?: boolean;
  enableKeyboardNavigation?: boolean;
  enableFocusManagement?: boolean;
}

interface AccessibilityState {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  isScreenReaderActive: boolean;
  isKeyboardUser: boolean;
  focusVisible: boolean;
  currentFocusIndex: number;
  totalFocusableElements: number;
}

export const useAccessibility = (options: AccessibilityOptions = {}) => {
  const {
    enableReducedMotion = true,
    enableHighContrast = true,
    enableScreenReader = true,
    enableKeyboardNavigation = true,
    enableFocusManagement = true
  } = options;

  const [state, setState] = useState<AccessibilityState>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    isScreenReaderActive: false,
    isKeyboardUser: false,
    focusVisible: false,
    currentFocusIndex: 0,
    totalFocusableElements: 0
  });

  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const lastInteractionRef = useRef<'mouse' | 'keyboard'>('mouse');

  // Detect reduced motion preference
  useEffect(() => {
    if (!enableReducedMotion) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState(prev => ({ ...prev, prefersReducedMotion: mediaQuery.matches }));

    const handleChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableReducedMotion]);

  // Detect high contrast preference
  useEffect(() => {
    if (!enableHighContrast) return;

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setState(prev => ({ ...prev, prefersHighContrast: mediaQuery.matches }));

    const handleChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, prefersHighContrast: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableHighContrast]);

  // Detect screen reader
  useEffect(() => {
    if (!enableScreenReader) return;

    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader = Boolean(
        window.speechSynthesis ||
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[aria-live]') !== null
      );
      
      setState(prev => ({ ...prev, isScreenReaderActive: hasScreenReader }));
    };

    detectScreenReader();
  }, [enableScreenReader]);

  // Detect keyboard usage
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        lastInteractionRef.current = 'keyboard';
        setState(prev => ({ ...prev, isKeyboardUser: true, focusVisible: true }));
      }
    };

    const handleMouseDown = () => {
      lastInteractionRef.current = 'mouse';
      setState(prev => ({ ...prev, isKeyboardUser: false, focusVisible: false }));
    };

    const handleFocusIn = () => {
      if (lastInteractionRef.current === 'keyboard') {
        setState(prev => ({ ...prev, focusVisible: true }));
      }
    };

    const handleFocusOut = () => {
      setState(prev => ({ ...prev, focusVisible: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [enableKeyboardNavigation]);

  // Focus management
  const updateFocusableElements = useCallback((container: HTMLElement) => {
    if (!enableFocusManagement) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    const elements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
    focusableElementsRef.current = elements;
    
    setState(prev => ({ 
      ...prev, 
      totalFocusableElements: elements.length,
      currentFocusIndex: 0
    }));
  }, [enableFocusManagement]);

  const focusNext = useCallback(() => {
    if (focusableElementsRef.current.length === 0) return;
    
    const nextIndex = (state.currentFocusIndex + 1) % focusableElementsRef.current.length;
    focusableElementsRef.current[nextIndex]?.focus();
    
    setState(prev => ({ ...prev, currentFocusIndex: nextIndex }));
  }, [state.currentFocusIndex]);

  const focusPrevious = useCallback(() => {
    if (focusableElementsRef.current.length === 0) return;
    
    const prevIndex = state.currentFocusIndex === 0 
      ? focusableElementsRef.current.length - 1 
      : state.currentFocusIndex - 1;
    
    focusableElementsRef.current[prevIndex]?.focus();
    
    setState(prev => ({ ...prev, currentFocusIndex: prevIndex }));
  }, [state.currentFocusIndex]);

  const focusFirst = useCallback(() => {
    if (focusableElementsRef.current.length === 0) return;
    
    focusableElementsRef.current[0]?.focus();
    setState(prev => ({ ...prev, currentFocusIndex: 0 }));
  }, []);

  const focusLast = useCallback(() => {
    if (focusableElementsRef.current.length === 0) return;
    
    const lastIndex = focusableElementsRef.current.length - 1;
    focusableElementsRef.current[lastIndex]?.focus();
    setState(prev => ({ ...prev, currentFocusIndex: lastIndex }));
  }, []);

  // Announce to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!state.isScreenReaderActive) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [state.isScreenReaderActive]);

  // Skip link functionality
  const createSkipLink = useCallback((targetId: string, label: string = 'Skip to main content') => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = label;
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50';
    
    return skipLink;
  }, []);

  return {
    ...state,
    updateFocusableElements,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    announce,
    createSkipLink,
    // Utility functions
    shouldReduceMotion: state.prefersReducedMotion,
    shouldUseHighContrast: state.prefersHighContrast,
    isAccessible: state.isScreenReaderActive || state.isKeyboardUser,
  };
};

// Focus trap hook
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store the previously focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Focus the first element
    firstElement.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously focused element
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
};

// ARIA live region hook
export const useAriaLive = () => {
  const [messages, setMessages] = useState<Array<{ id: string; message: string; priority: 'polite' | 'assertive' }>>([]);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { id, message, priority }]);
    
    // Remove message after announcement
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 1000);
  }, []);

  return { announce, messages };
};

// Keyboard navigation hook
export const useKeyboardNavigation = (onEscape?: () => void, onEnter?: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onEscape?.();
          break;
        case 'Enter':
          if (e.target instanceof HTMLElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            onEnter?.();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter]);
};
