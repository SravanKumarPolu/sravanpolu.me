// App.tsx
import "./App.css";

import Nav from "./components/Nav";
import LazySection from "./components/LazySection";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";
import React from "react";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <main className="relative scroll-smooth bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-x-hidden">
          <section className="sticky top-0 z-50">
            <Nav />
          </section>

          <section id="home">
            <LazySection sectionName="hero" />
          </section>

          <section id="work">
            <LazySection sectionName="work" />
          </section>

          <section id="resume">
            <LazySection sectionName="resume" />
          </section>

          <section id="footer">
            <LazySection sectionName="footer" />
          </section>
        </main>
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
