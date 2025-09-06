export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    accent: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    }
  },
  spacing: {
    golden: {
      xs: '0.618rem',    // 10px
      sm: '1rem',        // 16px
      md: '1.618rem',    // 26px
      lg: '2.618rem',    // 42px
      xl: '4.236rem',    // 68px
      '2xl': '6.854rem', // 110px
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      fluid: {
        xs: 'clamp(0.75rem, 2vw, 0.875rem)',
        sm: 'clamp(0.875rem, 2.5vw, 1rem)',
        base: 'clamp(1rem, 3vw, 1.125rem)',
        lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',
        xl: 'clamp(1.25rem, 4vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 5vw, 2rem)',
        '3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
        '4xl': 'clamp(2.25rem, 7vw, 3rem)',
        '5xl': 'clamp(3rem, 8vw, 4rem)',
        '6xl': 'clamp(3.75rem, 10vw, 5rem)',
      }
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};
