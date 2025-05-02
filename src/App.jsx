// App.jsx
import "./App.css";

import { Footer, Hero, Resume } from "./sections/index.js";

import Nav from "./components/Nav.jsx";
import React from "react";
import Work from "./sections/Work.jsx";

const App = () => {
  return (
    <main className="relative scroll-smooth bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-x-hidden">
      <section className="sticky top-0 z-50">
        <Nav />
      </section>

      <section id="home">
        <Hero />
      </section>

      <section id="work">
        <Work />
      </section>

      <section id="resume">
        <Resume />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </main>
  );
};

export default App;
