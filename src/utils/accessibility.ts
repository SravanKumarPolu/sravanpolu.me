// Accessibility utilities
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const getAriaLabel = (action: string, context?: string): string => {
  const labels: Record<string, string> = {
    'toggle-theme': 'Toggle dark mode',
    'toggle-navigation': 'Toggle navigation menu',
    'scroll-to-top': 'Scroll to top of page',
    'scroll-to-bottom': 'Scroll to bottom of page',
    'download-resume': 'Download resume PDF',
    'view-project': 'View project details',
    'visit-github': 'Visit GitHub repository',
    'visit-demo': 'Visit live demo',
    'close-modal': 'Close modal',
    'next-project': 'View next project',
    'previous-project': 'View previous project',
    'search-projects': 'Search projects',
    'filter-projects': 'Filter projects by technology',
  };
  
  const baseLabel = labels[action] || action;
  return context ? `${baseLabel} - ${context}` : baseLabel;
};

export const getRoleDescription = (component: string): string => {
  const descriptions: Record<string, string> = {
    'navigation': 'Main navigation menu',
    'hero': 'Hero section with introduction',
    'work': 'Portfolio projects section',
    'resume': 'Resume and skills section',
    'footer': 'Contact information and links',
    'project-card': 'Project showcase card',
    'theme-toggle': 'Dark and light mode toggle',
    'search-input': 'Search input for filtering projects',
  };
  
  return descriptions[component] || `${component} component`;
};
