import React, { useRef, useEffect } from 'react';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useApp } from '../contexts/AppContext';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { getAriaLabel } from '../utils/accessibility';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  showLabel = false 
}) => {
  const { isDarkMode, toggleTheme } = useApp();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Keyboard navigation
  useKeyboardNavigation({
    onEnter: toggleTheme,
    onSpace: toggleTheme,
  });

  // Focus management
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute('aria-pressed', isDarkMode.toString());
    }
  }, [isDarkMode]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        ${className}
        relative inline-flex items-center justify-center
        rounded-full border-2 border-transparent
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-all duration-200 ease-in-out
        transform hover:scale-105 active:scale-95
        group
      `}
      aria-label={getAriaLabel('toggle-theme')}
      aria-pressed={isDarkMode}
      role="switch"
      tabIndex={0}
    >
      {/* Sun icon */}
      <BsSunFill
        className={`
          ${iconSizes[size]}
          text-yellow-500
          transition-all duration-300 ease-in-out
          ${isDarkMode 
            ? 'opacity-0 rotate-90 scale-0' 
            : 'opacity-100 rotate-0 scale-100'
          }
          absolute
        `}
        aria-hidden="true"
      />
      
      {/* Moon icon */}
      <BsMoonStarsFill
        className={`
          ${iconSizes[size]}
          text-blue-400
          transition-all duration-300 ease-in-out
          ${isDarkMode 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0'
          }
          absolute
        `}
        aria-hidden="true"
      />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-active:opacity-20 transition-opacity duration-150" />
      
      {/* Screen reader text */}
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
