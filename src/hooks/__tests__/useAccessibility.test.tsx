import { renderHook } from '@testing-library/react';
import { useAccessibility } from '../useAccessibility';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('useAccessibility Hook', () => {
  test('returns accessibility state', () => {
    const { result } = renderHook(() => useAccessibility());
    
    expect(result.current).toHaveProperty('shouldReduceMotion');
    expect(result.current).toHaveProperty('prefersReducedMotion');
    expect(result.current).toHaveProperty('isAccessible');
  });

  test('detects reduced motion preference', () => {
    // Mock matchMedia to return true for reduced motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());
    
    expect(result.current.shouldReduceMotion).toBe(true);
  });

  test('detects reduced motion preference', () => {
    // Mock matchMedia to return true for reduced motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());
    
    expect(result.current.prefersReducedMotion).toBe(true);
  });

  test('detects high contrast preference', () => {
    // Mock matchMedia to return true for high contrast
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-contrast: high)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());
    
    expect(result.current.prefersHighContrast).toBe(true);
  });

  test('combines accessibility preferences', () => {
    // Mock matchMedia to return true for multiple preferences
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());
    
    expect(result.current.isAccessible).toBe(true);
  });
});
