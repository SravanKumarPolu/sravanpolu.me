// App.jsx

import { Hero, Footer, Resume } from "./sections/index.js";
import Nav from "./components/Nav.jsx";
import React from "react";

import About from "./sections/Work.jsx";
import "./App.css";
const App = () => {
  return (
    <main className="relative multiple-gradients overflow-x-hidden">
      <Nav />

      <section className="xl:padding-l wide:padding-r padding-b overflow-x-hidden">
        <Hero />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b">
        <About />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b">
        <Resume />
      </section>
      <section className="bg-black   text-white">
        <Footer />
      </section>
    </main>
  );
};

export default App;
