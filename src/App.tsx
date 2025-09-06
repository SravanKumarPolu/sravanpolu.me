// App.tsx
import "./App.css";

import Nav from "./components/Nav";
import LazySection from "./components/LazySection";
import ErrorBoundary from "./components/ErrorBoundary";
import NotificationContainer from "./components/NotificationContainer";
import { LoadingProvider } from "./contexts/LoadingContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { FocusProvider } from "./contexts/FocusContext";
import { AppProvider } from "./contexts/AppContext";
import { AnnouncementProvider } from "./components/AnnouncementSystem";
import React from "react";

const App: React.FC = () => {

  return (
    <ErrorBoundary>
      <AnnouncementProvider>
        <NotificationProvider>
          <AppProvider>
            <LoadingProvider>
              <FocusProvider>
              <main id="main-content" className="relative scroll-smooth bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white overflow-x-hidden">
                {/* Skip Links for Accessibility */}
                <a 
                  href="#main-content" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200 hover:bg-primary-700"
                >
                  Skip to main content
                </a>
                <a 
                  href="#work" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-secondary-600 text-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200 hover:bg-secondary-700"
                >
                  Skip to work section
                </a>
                <a 
                  href="#resume" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-28 focus:left-4 bg-accent-600 text-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200 hover:bg-accent-700"
                >
                  Skip to resume
                </a>
                
                <section className="sticky top-0 z-50">
                  <Nav />
                </section>


                <section id="home" aria-label="Hero section">
                  <LazySection sectionName="hero" />
                </section>

                <section id="work" aria-label="Work and projects section">
                  <LazySection sectionName="work" />
                </section>

                <section id="resume" aria-label="Resume and skills section">
                  <LazySection sectionName="resume" />
                </section>

                <section id="footer" aria-label="Contact and footer section">
                  <LazySection sectionName="footer" />
                </section>
              </main>
              
              <NotificationContainer />
              </FocusProvider>
            </LoadingProvider>
          </AppProvider>
        </NotificationProvider>
      </AnnouncementProvider>
    </ErrorBoundary>
  );
};

export default App;
