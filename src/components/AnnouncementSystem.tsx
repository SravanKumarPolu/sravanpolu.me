import React, { createContext, useContext, useState, useCallback } from 'react';

interface AnnouncementContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  clearAnnouncements: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider');
  }
  return context;
};

interface AnnouncementProviderProps {
  children: React.ReactNode;
}

export const AnnouncementProvider: React.FC<AnnouncementProviderProps> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Array<{ id: string; message: string; priority: 'polite' | 'assertive' }>>([]);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const id = Math.random().toString(36).substr(2, 9);
    setAnnouncements(prev => [...prev, { id, message, priority }]);
    
    // Auto-clear after 3 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    }, 3000);
  }, []);

  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
  }, []);

  return (
    <AnnouncementContext.Provider value={{ announce, clearAnnouncements }}>
      {children}
      {/* Live regions for announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements.filter(a => a.priority === 'polite').map(announcement => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announcements.filter(a => a.priority === 'assertive').map(announcement => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
    </AnnouncementContext.Provider>
  );
};
