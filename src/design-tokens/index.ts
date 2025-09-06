// Enhanced Design Tokens System
export const designTokens = {
  // Color System
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

  // Spacing System
  spacing: {
    // Base spacing scale
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px
    
    // Golden ratio spacing
    golden: {
      xs: '0.618rem',    // 10px
      sm: '1rem',        // 16px
      md: '1.618rem',    // 26px
      lg: '2.618rem',    // 42px
      xl: '4.236rem',    // 68px
      '2xl': '6.854rem', // 110px
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      display: ['Palanquin', 'sans-serif'],
    },
    fontSize: {
      // Fixed sizes
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      
      // Fluid sizes
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
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },

  // Animation System
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  },

  // Border Radius System
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadow System
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },

  // Z-Index System
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },

  // Breakpoints System
  breakpoints: {
    xs: '400px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    wide: '2880px',
  },

  // Container Queries
  containerQueries: {
    xs: '20rem',    // 320px
    sm: '24rem',    // 384px
    md: '28rem',    // 448px
    lg: '32rem',    // 512px
    xl: '36rem',    // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
    '4xl': '56rem', // 896px
    '5xl': '64rem', // 1024px
    '6xl': '72rem', // 1152px
    '7xl': '80rem', // 1280px
  }
};

// Utility functions for design tokens
export const getToken = (path: string) => {
  const keys = path.split('.');
  let value: any = designTokens;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return undefined;
  }
  
  return value;
};

export const createTokenClass = (tokenPath: string, property: string) => {
  const value = getToken(tokenPath);
  return value ? `${property}: ${value}` : '';
};

// Component-specific token combinations
export const componentTokens = {
  button: {
    primary: {
      background: designTokens.colors.primary[600],
      backgroundHover: designTokens.colors.primary[700],
      text: '#ffffff',
      borderRadius: designTokens.borderRadius.lg,
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
    },
    secondary: {
      background: designTokens.colors.secondary[600],
      backgroundHover: designTokens.colors.secondary[700],
      text: '#ffffff',
      borderRadius: designTokens.borderRadius.lg,
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
    }
  },
  card: {
    default: {
      background: '#ffffff',
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing.lg,
      boxShadow: designTokens.boxShadow.md,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
    },
    elevated: {
      background: '#ffffff',
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing.lg,
      boxShadow: designTokens.boxShadow.lg,
      border: 'none',
    }
  }
};
