import React, { createContext, useContext, useRef, useEffect, useCallback, ReactNode } from 'react';

interface FocusContextType {
  registerFocusableElement: (id: string, element: HTMLElement) => void;
  unregisterFocusableElement: (id: string) => void;
  focusElement: (id: string) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  focusFirst: () => void;
  focusLast: () => void;
  getFocusableElements: () => HTMLElement[];
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

interface FocusProviderProps {
  children: ReactNode;
}

export const FocusProvider: React.FC<FocusProviderProps> = ({ children }) => {
  const focusableElements = useRef<Map<string, HTMLElement>>(new Map());
  const focusOrder = useRef<string[]>([]);

  const registerFocusableElement = (id: string, element: HTMLElement) => {
    focusableElements.current.set(id, element);
    if (!focusOrder.current.includes(id)) {
      focusOrder.current.push(id);
    }
  };

  const unregisterFocusableElement = (id: string) => {
    focusableElements.current.delete(id);
    focusOrder.current = focusOrder.current.filter(orderId => orderId !== id);
  };

  const focusElement = (id: string) => {
    const element = focusableElements.current.get(id);
    if (element) {
      element.focus();
    }
  };

  const getFocusableElements = (): HTMLElement[] => {
    return Array.from(focusableElements.current.values());
  };

  const focusNext = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.findIndex(el => el === document.activeElement);
    const nextIndex = (currentIndex + 1) % elements.length;
    elements[nextIndex]?.focus();
  }, []);

  const focusPrevious = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.findIndex(el => el === document.activeElement);
    const prevIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
    elements[prevIndex]?.focus();
  }, []);

  const focusFirst = () => {
    const elements = getFocusableElements();
    elements[0]?.focus();
  };

  const focusLast = () => {
    const elements = getFocusableElements();
    elements[elements.length - 1]?.focus();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        if (event.shiftKey) {
          focusPrevious();
        } else {
          focusNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusNext, focusPrevious]);

  return (
    <FocusContext.Provider
      value={{
        registerFocusableElement,
        unregisterFocusableElement,
        focusElement,
        focusNext,
        focusPrevious,
        focusFirst,
        focusLast,
        getFocusableElements,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = (): FocusContextType => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};
