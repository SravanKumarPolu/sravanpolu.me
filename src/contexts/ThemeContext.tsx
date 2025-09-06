import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface Theme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'light',
    displayName: 'Light',
    colors: {
      primary: '#3b82f6',
      secondary: '#a855f7',
      accent: '#10b981',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      secondary: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'dark',
    displayName: 'Dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#c084fc',
      accent: '#34d399',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      secondary: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'ocean',
    displayName: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#14b8a6',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#bae6fd',
      success: '#14b8a6',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#0ea5e9',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(14, 165, 233, 0.1)',
      md: '0 4px 6px -1px rgba(14, 165, 233, 0.2)',
      lg: '0 10px 15px -3px rgba(14, 165, 233, 0.2)',
      xl: '0 20px 25px -5px rgba(14, 165, 233, 0.2)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'sunset',
    displayName: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fef7ed',
      surface: '#fed7aa',
      text: '#9a3412',
      textSecondary: '#c2410c',
      border: '#fdba74',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      secondary: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(249, 115, 22, 0.1)',
      md: '0 4px 6px -1px rgba(249, 115, 22, 0.2)',
      lg: '0 10px 15px -3px rgba(249, 115, 22, 0.2)',
      xl: '0 20px 25px -5px rgba(249, 115, 22, 0.2)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'forest',
    displayName: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#84cc16',
      background: '#f0fdf4',
      surface: '#dcfce7',
      text: '#14532d',
      textSecondary: '#166534',
      border: '#bbf7d0',
      success: '#059669',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      secondary: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(5, 150, 105, 0.1)',
      md: '0 4px 6px -1px rgba(5, 150, 105, 0.2)',
      lg: '0 10px 15px -3px rgba(5, 150, 105, 0.2)',
      xl: '0 20px 25px -5px rgba(5, 150, 105, 0.2)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'midnight',
    displayName: 'Midnight',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#e2e8f0',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      secondary: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(139, 92, 246, 0.2)',
      md: '0 4px 6px -1px rgba(139, 92, 246, 0.3)',
      lg: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
      xl: '0 20px 25px -5px rgba(139, 92, 246, 0.3)',
    },
    animations: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  themes: Theme[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedThemeName = localStorage.getItem('themeName');
    
    if (savedThemeName) {
      const theme = themes.find(t => t.name === savedThemeName);
      if (theme) return theme;
    }
    
    // Fallback to system preference or default
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? themes[1] : themes[0]; // dark or light
  });

  const setTheme = useCallback((themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('theme', theme.name === 'dark' ? 'dark' : 'light');
      localStorage.setItem('themeName', theme.name);
      applyTheme(theme);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newTheme = currentTheme.name === 'dark' ? themes[0] : themes[1];
    setTheme(newTheme.name);
  }, [currentTheme.name, setTheme]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
    
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Apply theme class to document
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${theme.name}`);
    
    // Apply dark mode class
    if (theme.name === 'dark' || theme.name === 'midnight') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('themeName')) {
        const newTheme = e.matches ? themes[1] : themes[0];
        setCurrentTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const contextValue: ThemeContextType = {
    currentTheme,
    setTheme,
    themes,
    isDarkMode: currentTheme.name === 'dark' || currentTheme.name === 'midnight',
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
