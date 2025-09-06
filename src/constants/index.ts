import bootstrap from "../assets/icons/bootstrap.svg";
import buyMeImg from "../assets/images/buy-me.png";
import cardImg from "../assets/images/card.png";
import css from "../assets/icons/css.svg";
import cubeImg from "../assets/images/cubedemo.png";
import downArrow from "../assets/icons/downArrow.svg";
import dropboxImg from "../assets/images/dropbox.png";
import github from "../assets/icons/github.svg";
import gymImg from "../assets/images/SravanGym.png";
import html from "../assets/icons/html.svg";
import js from "../assets/icons/js.svg";
import linkedIn from "../assets/icons/linkedIn.svg";
import netflixImg from "../assets/images/NetFlixDemo.png";
import nikeImg from "../assets/images/NikeDemo.png";
import otpImg from "../assets/images/otp.png";
import quizletImg from "../assets/images/quizlet.png";
import react from "../assets/icons/react.svg";
import solorImg from "../assets/images/solordemo.png";
import stripeImg from "../assets/images/stripeDemo.png";
import tailwind from "../assets/icons/tailwind.svg";
import timerImg from "../assets/images/Task+Breaks.png";
import twitter from "../assets/icons/twitter.svg";
import typescript from "../assets/icons/ts.svg";
import vanlifImg from "../assets/images/vanlife.png";

export const assets = {
  downArrow,
};

export const navLinks = [
  { label: "Home", href: "home" },
  { label: "Work", href: "work" },
  { label: "Resume", href: "resume" },
  { label: "Contact", href: "footer" },
];

export const courses = [
  {
    courseName: "TypeScript",
    projects: [
      {
        src: gymImg,
        title: "sravan-gym",
        name: "GYM",
        link: "https://sravan-gym.netlify.app",
      },
      {
        src: quizletImg,
        title: "quizlet-landingpage-replica",
        name: "Quizlet",
        link: "https://sravan-quizlet-landingpage.netlify.app/",
      },

      {
        src: timerImg,
        title: "Task+Breaks",
        name: "Timer",
        link: "https://task-breaks.netlify.app/",
      },
    ],
    language: [{ src: typescript, alt: "TypeScript logo", name: "TypeScript" }],
    summary: " This project mainly focused on TypeScript",
  },
  {
    courseName: "React",
    projects: [
      {
        src: dropboxImg,

        title: "ReactWith-CSS",
        name: "DropboxDemo",
        link: "https://fanciful-kitten-112003.netlify.app/",
      },
      {
        src: vanlifImg,
        title: "ReactWith-CSS",
        name: "#VANLIFE",
        link: "https://van-life2.netlify.app/",
      },
    ],
    language: [{ src: react, alt: "react logo", name: "React" }],
    summary: " This project mainly focused on React JS",
  },

  {
    courseName: "Tailwind",
    projects: [
      {
        src: nikeImg,
        title: "nikesravan",
        name: "nike",
        link: "https://sravan-nike.netlify.app",
      },
    ],
    language: [{ src: tailwind, alt: "tailwind logo", name: "Tailwind" }],
    summary: " This project mainly focused on Tailwind CSS",
  },
  {
    courseName: "CSS",
    projects: [
      {
        src: stripeImg,
        title: "Grid",
        name: "Stripedemo",
        link: "https://stripedemo1.netlify.app/",
      },
      {
        src: cubeImg,
        title: "Animation",
        name: "3DCube",
        link: "https://sravan-cubedemo.netlify.app/",
      },
      {
        src: solorImg,
        title: "Animation",
        name: "SolarSystem",
        link: "https://sravan-solarsystemdemo.netlify.app/",
      },
    ],
    language: [{ src: css, alt: "css logo", name: "CSS" }],
    summary: " This project mainly focused on grid, flex,and animations",
  },
  {
    courseName: "BootStrap",
    projects: [
      {
        src: cardImg,
        title: "CardDemo",
        name: "Card",
        link: "https://jsfiddle.net/pvskr/pnfjt029/20/",
      },
    ],
    language: [{ src: bootstrap, alt: "bootstrap logo", name: "BootStrap" }],
    summary: " This project mainly focused on BootStrap CSS",
  },
  {
    courseName: "JavaScript",
    projects: [
      {
        src: buyMeImg,
        title: "JSPractice",
        name: "buyMe",
        link: "https://new-buy-me.netlify.app/",
      },
      {
        src: netflixImg,
        title: "JSPractice",
        name: "Netflix Landing page",
        link: "https://jsfiddle.net/pvskr/4ygntpoq/28/",
      },
    ],
    language: [{ src: js, alt: "JS logo", name: "JS" }],

    summary: " This project mainly focused on js ",
  },
  {
    courseName: "HTML",
    projects: [
      {
        src: otpImg,
        title: "projects",
        name: "Otp-sravan",
        link: "https://sravanotp-project.netlify.app/", // Replace with the actual link if available
      },
    ],
    language: [{ src: html, alt: "html logo", name: "HTML" }],
    summary: " This project mainly focused on Frames of HTML",
  },

  // Add more courses here
];

export const work = [{ src: tailwind, alt: "tailwind logo", name: "Tailwind" }];

export const footerLinks = [
  {
    title: "Get in touch",
    links: [
      {
        name: "sravanpolu.me@gmail.com",
        link: "mailto:sravanpolu.me@gmail.com",
      },

      {
        name: "linkedin.com/in/SravanPolu",
        link: "https://www.linkedin.com/in/SravanPolu",
      },
      {
        name: "github.com/SravanKumarPolu",
        link: "https://github.com/SravanKumarPolu",
      },
    ],
  },
];

export const socialMedia = [
  {
    src: linkedIn,
    alt: "LinkedIn logo",
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/SravanPolu",
  },
  {
    src: github,
    alt: "githu logo",
    name: "Github",
    link: "https://github.com/SravanKumarPolu",
  },
  {
    src: twitter,
    alt: "X logo",
    name: "X",
    link: "https://x.com/SravanPolu",
  },
];
