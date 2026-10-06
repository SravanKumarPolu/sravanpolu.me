import type { ComponentType, SVGProps } from "react";
import { SiFiverr } from "react-icons/si";
import bootstrap from "../assets/icons/bootstrap.svg";
import nexCartisImg from "../assets/images/nexCartis.png";
import skrEcommerceCover from "../assets/images/skr-ecommerce-cover.svg";
import airsenseCover from "../assets/images/airsense-cover.svg";
import boostllyImg from "../assets/images/boostlly.png";
import debiasDailyImg from "../assets/images/debiasDailyImg.png";
import bloommindTrackerImg from "../assets/images/bloommindTrackerImg.png";
import buyMeImg from "../assets/images/buy-me.jpg";
import cardImg from "../assets/images/card.jpg";
import chronobloomImg from "../assets/images/chronobloom.png";
import css from "../assets/icons/css.svg";
import cubeImg from "../assets/images/cubedemo.png";
import dropboxImg from "../assets/images/dropbox.png";
import github from "../assets/icons/github.svg";
import gymImg from "../assets/images/SravanGym.png";
import html from "../assets/icons/html.svg";
import js from "../assets/icons/js.svg";
import linkedIn from "../assets/icons/linkedIn.svg";
import netflixImg from "../assets/images/NetFlixDemo.jpg";
import nextjs from "../assets/icons/nextjs.svg";
import nikeImg from "../assets/images/NikeDemo.png";
import otpImg from "../assets/images/otp.png";
import quizletImg from "../assets/images/quizlet.png";
import react from "../assets/icons/react.svg";
import solorImg from "../assets/images/solordemo.png";
import schoolManagementImg from "../assets/images/school-management.png";
import stripeImg from "../assets/images/stripeDemo.jpg";
import tailwind from "../assets/icons/tailwind.svg";
import timerImg from "../assets/images/Task+Breaks.jpg";
import twitter from "../assets/icons/twitter.svg";
import typescript from "../assets/icons/ts.svg";
import vanlifImg from "../assets/images/vanlife.png";

export const navLinks = [
  { label: "Home", href: "home" },
 
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Work", href: "work" },
  
  { label: "Resume", href: "resume" },
  { label: "Tech", href: "skills" },
  { label: "Contact", href: "contact" },
];

/** Secondary nav — sections on page, not in primary nav */
export const secondaryNavLinks = [{ label: "Feedback", href: "testimonials" }];

export const courses = [
  {
    courseName: "Full-Stack & Mobile",
    projects: [
      {
        src: skrEcommerceCover,
        title: "SKR E-Commerce",
        name: "SKR E-Commerce",
        link: "https://skr-e-commerce.netlify.app/",
        alt: "SKR E-Commerce full-stack MERN application",
      },
      {
        src: airsenseCover,
        title: "AirSense",
        name: "AirSense",
        link: "#airsense",
        alt: "AirSense air-quality companion app",
      },
    ],
    summary: "Flagship full-stack and mobile product builds.",
  },
  {
    courseName: "Next.js",
    projects: [
      {
        src: debiasDailyImg,
        title: "DebiasDaily",
        name: "DebiasDaily",
        link: "https://debiasdaily.com/",
        alt: "DebiasDaily cognitive bias learning application"
      },
      {
        src: bloommindTrackerImg,
        title: "BloomMind Tracker (beta)",
        name: "BloomMind Tracker",
        link: "https://bloommind-tracker.netlify.app/"
      },
      {
        src: nexCartisImg,
        title: "NexCartis (beta)",
        name: "NexCartis",
        link: "https://nextcartis.netlify.app/",
      },
   
      {
        src: chronobloomImg,
        title: "chronoBloom",
        name: "ChronoBloom",
        link: "https://chronobloom.netlify.app/",
      },
      {
        src: boostllyImg,
        title: "Boostlly (beta, limited features)",
        name: "Boostlly",
        link: "https://boostlly.netlify.app/",
      },
      {
        src: schoolManagementImg,
        title: "Smart Training & School Management",
        name: "Smart Training & School Management",
        link: "https://smart-training-school-management-de.vercel.app/",
      },
    ],
    language: [{ src: nextjs, alt: "Next.js logo", name: "Next.js" }],
    summary: "This project mainly focuses on the Next.js framework.",
  },
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
    summary: "This project mainly focuses on TypeScript.",
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
    summary: "This project mainly focuses on React.",
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
    summary: "This project mainly focuses on Tailwind CSS.",
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
    summary: "This project mainly focuses on CSS Grid, Flexbox, and animations.",
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
    summary: "This project mainly focuses on Bootstrap CSS.",
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

    summary: "This project mainly focuses on JavaScript.",
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
    summary: "This project mainly focuses on HTML frame layouts.",
  },

  // Add more courses here
];

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

export const fiverrProfileUrl = "https://www.fiverr.com/users/sravankumarpolu/portfolio";

export type SocialMediaLink = {
  src?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  alt: string;
  name: string;
  link: string;
};

export const socialMedia: SocialMediaLink[] = [
  {
    src: linkedIn,
    alt: "LinkedIn logo",
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/SravanPolu",
  },
  {
    src: github,
    alt: "GitHub logo",
    name: "GitHub",
    link: "https://github.com/SravanKumarPolu",
  },
  {
    icon: SiFiverr,
    alt: "Fiverr logo",
    name: "Fiverr",
    link: fiverrProfileUrl,
  },
  {
    src: twitter,
    alt: "X logo",
    name: "X",
    link: "https://x.com/SravanPolu",
  },
];
