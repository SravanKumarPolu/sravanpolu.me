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
import React from "react";

const App: React.FC = () => {

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AppProvider>
          <LoadingProvider>
            <FocusProvider>
              <main className="relative scroll-smooth bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white overflow-x-hidden">
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
    </ErrorBoundary>
  );
};

export default App;
