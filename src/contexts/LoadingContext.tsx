import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');

  const setLoading = (loading: boolean, message: string = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  const startLoading = (message: string = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('Loading...');
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        setLoading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
