// Accessibility utilities
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
