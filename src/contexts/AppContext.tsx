import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNotification } from './NotificationContext';

interface AppState {
  // Theme state
  isDarkMode: boolean;

  // Navigation state
  activeLink: string;
  isNavOpen: boolean;
  isTopOfPage: boolean;
}

interface AppContextType extends AppState {
  // Theme actions
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;

  // Navigation actions
  setActiveLink: (link: string) => void;
  toggleNav: () => void;
  setIsTopOfPage: (isTop: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { showSuccess } = useNotification();

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Navigation state
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  // Theme actions
  const toggleTheme = useCallback(() => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    showSuccess('Theme Updated', `Switched to ${newTheme ? 'dark' : 'light'} mode`);
  }, [isDarkMode, showSuccess]);

  const setTheme = useCallback((isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, []);

  // Navigation actions
  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Handle scroll for top of page detection
  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close navigation on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavOpen]);

  const contextValue: AppContextType = {
    // State
    isDarkMode,
    activeLink,
    isNavOpen,
    isTopOfPage,

    // Actions
    toggleTheme,
    setTheme,
    setActiveLink,
    toggleNav,
    setIsTopOfPage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
