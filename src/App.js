import { Hero, Footer } from "./sections/index.js";
import Nav from "./components/Nav";
import React from "react";
import About from "./sections/Work.jsx";
const App = () => (
  <main className="relative">
    <Nav />

    <section className="xl:padding-l wide:padding-r padding-b ">
      <Hero />{" "}
    </section>
    <section className="xl:padding-l wide:padding-r padding-b ">
      <About />{" "}
    </section>
    <section className="bg-black padding-x padding-t pb-8 text-white">
      <Footer />
    </section>
  </main>
);

export default App;
