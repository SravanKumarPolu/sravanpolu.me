// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Lightweight mock for framer-motion to avoid env-specific listeners
jest.mock('framer-motion', () => {
  const React = require('react');
  const stripMotionProps = (props) => {
    const { whileHover, whileTap, whileInView, transition, animate, initial, exit, viewport, ...rest } = props || {};
    return rest;
  };
  const Noop = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...stripMotionProps(props)}>{children}</div>
  ));
  Noop.displayName = 'MotionNoop';
  const MotionButton = React.forwardRef(({ children, ...props }, ref) => (
    <button ref={ref} {...stripMotionProps(props)}>{children}</button>
  ));
  MotionButton.displayName = 'MotionButton';
  const motionProxy = new Proxy({}, {
    get: (_t, prop) => (prop === 'button' ? MotionButton : Noop),
  });
  const useMotionValue = (initial) => {
    let value = initial;
    return {
      get: () => value,
      set: (v) => { value = v; },
      onChange: () => () => {},
    };
  };
  const useSpring = (v) => v;
  const useTransform = (v) => v;
  return {
    __esModule: true,
    motion: motionProxy,
    AnimatePresence: ({ children }) => <>{children}</>,
    useMotionValue,
    useSpring,
    useTransform,
  };
});

// Mock @react-three/fiber and @react-three/drei for jsdom
jest.mock('@react-three/fiber', () => ({
  __esModule: true,
  Canvas: ({ children, ...props }) => <div data-testid="canvas" {...props}>{children}</div>,
  useFrame: () => {},
  useThree: () => ({ gl: { setPixelRatio: () => {}, shadowMap: {}, outputColorSpace: '', toneMapping: 0 } }),
}));

jest.mock('@react-three/drei', () => ({
  __esModule: true,
  OrbitControls: () => null,
  useTexture: () => ({}),
  ContactShadows: () => null,
}));

// Mock Lottie component for testing
jest.mock('lottie-react', () => {
  return function MockLottie({ animationData, ...props }) {
    return <div data-testid="lottie-animation" {...props} />;
  };
});

// Mock canvas for Lottie
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Array(4) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => ({ data: new Array(4) })),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  })),
});

// Mock window.matchMedia for useMediaQuery hook and libs
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

// Mock the @react-hook/media-query library
jest.mock('@react-hook/media-query', () => ({
  useMediaQuery: jest.fn(() => false),
}));

// Robust IntersectionObserver mock compatible with framer-motion
class MockIntersectionObserver {
  constructor(callback, options) {
    this._callback = callback;
    this._options = options;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }
  observe = (target) => {
    this._callback?.([
      {
        isIntersecting: true,
        target,
        intersectionRatio: 1,
        boundingClientRect: target?.getBoundingClientRect?.() ?? {},
        intersectionRect: target?.getBoundingClientRect?.() ?? {},
        rootBounds: null,
        time: Date.now(),
      },
    ], this);
  };
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

global.IntersectionObserver = MockIntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;
window.ResizeObserver = MockResizeObserver;

// requestAnimationFrame/cancelAnimationFrame for animation libs
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
