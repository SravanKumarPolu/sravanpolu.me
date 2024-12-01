// App.jsx

import "./App.css";

import { Footer, Hero, Resume } from "./sections/index.js";

import About from "./sections/Work.jsx";
import Nav from "./components/Nav.jsx";
import React from "react";

const App = () => {
  return (
    <main className="relative multiple-gradients overflow-x-hidden">
      <Nav />

      <section className=" wide:padding-r padding-b overflow-x-hidden">
        <Hero />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b">
        <About />
      </section>
      <section className="xl:padding-x wide:padding-r padding-b">
        <Resume />
      </section>
      <section className="bg-black   text-white">
        <Footer />
      </section>
    </main>
  );
};

export default App;
