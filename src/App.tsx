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
      <AppProvider>
        <NotificationProvider>
          <LoadingProvider>
            <FocusProvider>
              <main className="relative scroll-smooth bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-x-hidden">
                <section className="sticky top-0 z-50">
                  <Nav />
                </section>

                <section id="home" role="region" aria-label="Hero section">
                  <LazySection sectionName="hero" />
                </section>

                <section id="work" role="region" aria-label="Work and projects section">
                  <LazySection sectionName="work" />
                </section>

                <section id="resume" role="region" aria-label="Resume and skills section">
                  <LazySection sectionName="resume" />
                </section>

                <section id="footer" role="region" aria-label="Contact and footer section">
                  <LazySection sectionName="footer" />
                </section>
              </main>
              
              <NotificationContainer />
            </FocusProvider>
          </LoadingProvider>
        </NotificationProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
