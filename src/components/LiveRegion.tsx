import React from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

export const LiveRegion: React.FC<LiveRegionProps> = ({ message, politeness = 'polite' }) => {
  return (
    <div 
      aria-live={politeness} 
      aria-atomic="true" 
      className="sr-only"
    >
      {message}
    </div>
  );
};
