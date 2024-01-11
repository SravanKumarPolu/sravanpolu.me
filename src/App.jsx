// App.jsx

import { Hero, Footer } from "./sections/index.js";
import Nav from "./components/Nav.jsx";
import React from "react";

import About from "./sections/Work.jsx";

const App = () => {
  return (
    <main className="relative bg-gradient-to-br from-blue-200 to-purple-800 overflow-x-hidden">
      <Nav />

      <section className="xl:padding-l wide:padding-r padding-b overflow-x-hidden">
        <Hero />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b">
        <About />
      </section>
      <section className="bg-black padding-x padding-t pb-8 text-white">
        <Footer />
      </section>
    </main>
  );
};

export default App;
