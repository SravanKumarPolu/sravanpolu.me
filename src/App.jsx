// App.jsx

import { Hero, Footer } from "./sections/index.js";
import Nav from "./components/Nav.jsx";
import React, { useState, useEffect } from "react";

import About from "./sections/Work.jsx";

// Import types
import { SelectedPage, BenefitType, ClassType } from "./shared/types.js";

const App = () => {
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) {
        setIsTopOfPage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-gradient-to-br from-blue-200 to-purple-800 overflow-x-hidden">
      <Nav
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <section className="xl:padding-l wide:padding-r padding-b overflow-x-hidden">
        <Hero setSelectedPage={setSelectedPage} />
      </section>
      <section className="xl:padding-l wide:padding-r padding-b ">
        <About setSelectedPage={setSelectedPage} />
      </section>
      <section className="bg-black padding-x padding-t pb-8 text-white">
        <Footer setSelectedPage={setSelectedPage} />
      </section>
    </main>
  );
};

export default App;
