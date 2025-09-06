import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { CustomButton as Button } from './Button';
import { Card } from './Card';

interface ThemeSelectorProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = '',
  showLabel = false,
  size = 'md'
}) => {
  const { currentTheme, setTheme, themes, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeClasses[size]} p-0`}
        magnetic={true}
      >
        <div className="relative">
          {/* Sun Icon */}
          <motion.svg
            className={`${iconSizes[size]} text-yellow-500`}
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={false}
            animate={{
              opacity: isDarkMode ? 0 : 1,
              rotate: isDarkMode ? 90 : 0,
              scale: isDarkMode ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </motion.svg>

          {/* Moon Icon */}
          <motion.svg
            className={`${iconSizes[size]} text-blue-400 absolute inset-0`}
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={false}
            animate={{
              opacity: isDarkMode ? 1 : 0,
              rotate: isDarkMode ? 0 : -90,
              scale: isDarkMode ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </motion.svg>
        </div>
      </Button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 z-50"
          >
            <Card variant="elevated" size="md" className="p-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Choose Theme
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme.name)}
                      className={`
                        relative p-3 rounded-lg border-2 transition-all duration-200
                        ${currentTheme.name === theme.name
                          ? 'border-primary-500 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Theme Preview */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {theme.displayName}
                        </span>
                      </div>
                      
                      {/* Color Palette Preview */}
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                        <div
                          className="w-3 h-3 rounded-sm border border-gray-300"
                          style={{ backgroundColor: theme.colors.background }}
                        />
                      </div>
                      
                      {/* Active Indicator */}
                      {currentTheme.name === theme.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {/* Quick Toggle */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="w-full"
                    magnetic={true}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Toggle Dark Mode
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
