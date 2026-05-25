// App.tsx
import "./App.css";

import Nav from "./components/Nav";
import LazySection from "./components/LazySection";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import ScrollIndicator from "./components/ScrollIndicator";
import { LoadingProvider } from "./contexts/LoadingContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { FocusProvider } from "./contexts/FocusContext";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnnouncementProvider } from "./components/AnnouncementSystem";
import { usePerformanceMonitor, useWebVitals, usePerformanceOptimization } from "./hooks/usePerformanceMonitor";
import { useAccessibility } from "./hooks/useAccessibility";
import React from "react";

const App: React.FC = () => {
  // Performance monitoring
  usePerformanceMonitor('App', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true,
    enableNetworkMonitoring: true
  });
  
  // Web Vitals monitoring
  useWebVitals();
  
  // Performance optimization
  const { shouldReduceAnimations } = usePerformanceOptimization();
  
  // Accessibility features
  const { shouldReduceMotion, isAccessible } = useAccessibility();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnnouncementProvider>
          <NotificationProvider>
            <AppProvider>
              <LoadingProvider>
                <FocusProvider>
              <main 
                id="main-content" 
                className={`relative scroll-smooth bg-neutral-950 text-white overflow-x-hidden ${
                  shouldReduceAnimations ? 'reduce-motion' : ''
                } ${isAccessible ? 'accessibility-enhanced' : ''}`}
                style={{
                  '--reduce-motion': shouldReduceMotion ? '1' : '0',
                  '--accessibility-enhanced': isAccessible ? '1' : '0'
                } as React.CSSProperties}
              >
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
                  href="#about" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-28 focus:left-4 bg-accent-600 text-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200 hover:bg-accent-700"
                >
                  Skip to about
                </a>
                <a 
                  href="#resume" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-40 focus:left-4 bg-accent-600 text-white px-4 py-2 rounded-lg z-50 font-medium transition-all duration-200 hover:bg-accent-700"
                >
                  Skip to resume
                </a>
                
                <section className="sticky top-0 z-50">
                  <Nav />
                </section>
                
                {/* Scroll Progress Indicator */}
                <ScrollIndicator />


                <section id="home" aria-label="Hero section">
                  <LazySection sectionName="hero" />
                </section>

                <section id="about" aria-label="About section">
                  <LazySection sectionName="about" />
                </section>

                <section id="work" aria-label="Work and projects section">
                  <LazySection sectionName="work" />
                </section>

                <section id="skills" aria-label="Skills and expertise section">
                  <LazySection sectionName="skills" />
                </section>

                <section id="resume" aria-label="Resume section">
                  <LazySection sectionName="resume" />
                </section>

                <section id="testimonials" aria-label="Client testimonials section">
                  <LazySection sectionName="testimonials" />
                </section>

                <section id="contact" aria-label="Contact section">
                  <LazySection sectionName="contact" />
                </section>

                <section id="analytics" aria-label="Data analytics section">
                  <LazySection sectionName="analytics" />
                </section>

                <section id="footer" aria-label="Footer section">
                  <LazySection sectionName="footer" />
                </section>
              </main>
                </FocusProvider>
              </LoadingProvider>
            </AppProvider>
          </NotificationProvider>
        </AnnouncementProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
