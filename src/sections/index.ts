// sections/index.ts

import About from "./Work";
import Footer from "./Footer";
import Hero from "./Hero";
import Resume from "./Resume";

export { Hero, Footer, About, Resume };

// types.ts
export const SelectedPage = Object.freeze({
  Home: "home",
  Work: "work",
  Resume: "resume",
  Contact: "footer",
});

export const BenefitType = {
  icon: null,
  title: "",
  description: "",
};

export const ClassType = {
  name: "",
  description: "",
  image: "",
  src: "",
};
