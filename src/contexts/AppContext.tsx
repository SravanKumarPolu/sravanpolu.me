import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNotification } from './NotificationContext';

interface AppState {
  // Theme state
  isDarkMode: boolean;
  
  // Navigation state
  activeLink: string;
  isNavOpen: boolean;
  isTopOfPage: boolean;
  
  // Work section state
  currentSlide: number;
  currentProjectIndex: number;
  hoveredIcon: any;
  
  // Search and filter state
  searchQuery: string;
  selectedFilter: string;
  filteredProjects: any[];
  
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  
  // Error states
  hasError: boolean;
  errorMessage: string;
}

interface AppContextType extends AppState {
  // Theme actions
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  
  // Navigation actions
  setActiveLink: (link: string) => void;
  toggleNav: () => void;
  setIsTopOfPage: (isTop: boolean) => void;
  
  // Work section actions
  setCurrentSlide: (slide: number) => void;
  setCurrentProjectIndex: (index: number) => void;
  setHoveredIcon: (icon: any) => void;
  handleProjectNext: () => void;
  handleProjectPrev: () => void;
  handleCourseNext: () => void;
  handleCoursePrev: () => void;
  
  // Search and filter actions
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: string) => void;
  clearFilters: () => void;
  
  // Loading actions
  setLoading: (loading: boolean, message?: string) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  
  // Error actions
  setError: (hasError: boolean, message?: string) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { showError, showSuccess } = useNotification();
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  // Navigation state
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  
  // Work section state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [hoveredIcon, setHoveredIcon] = useState<any>(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');
  
  // Error states
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  // Work section actions
  const handleProjectNext = useCallback(() => {
    // This will be implemented with actual project data
    setCurrentProjectIndex(prev => prev + 1);
  }, []);

  const handleProjectPrev = useCallback(() => {
    setCurrentProjectIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleCourseNext = useCallback(() => {
    setCurrentSlide(prev => prev + 1);
  }, []);

  const handleCoursePrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  }, []);

  // Search and filter actions
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilter('all');
    setFilteredProjects([]);
  }, []);

  // Loading actions
  const setLoading = useCallback((loading: boolean, message: string = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  }, []);

  const startLoading = useCallback((message: string = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('Loading...');
  }, []);

  // Error actions
  const setError = useCallback((hasError: boolean, message: string = '') => {
    setHasError(hasError);
    setErrorMessage(message);
    if (hasError && message) {
      showError('Error', message);
    }
  }, [showError]);

  const clearError = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
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
    currentSlide,
    currentProjectIndex,
    hoveredIcon,
    searchQuery,
    selectedFilter,
    filteredProjects,
    isLoading,
    loadingMessage,
    hasError,
    errorMessage,
    
    // Actions
    toggleTheme,
    setTheme,
    setActiveLink,
    toggleNav,
    setIsTopOfPage,
    setCurrentSlide,
    setCurrentProjectIndex,
    setHoveredIcon,
    handleProjectNext,
    handleProjectPrev,
    handleCourseNext,
    handleCoursePrev,
    setSearchQuery,
    setSelectedFilter,
    clearFilters,
    setLoading,
    startLoading,
    stopLoading,
    setError,
    clearError,
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
