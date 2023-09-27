import linkedIn from "../assets/icons/linkedIn.svg";
import github from "../assets/icons/github.svg";
import netlify from "../assets/icons/netlify.svg";
import react from "../assets/icons/react.svg";
import js from "../assets/icons/js.svg";
import html from "../assets/icons/html.svg";
import css from "../assets/icons/css.svg";
import tailwind from "../assets/icons/tailwind.svg";
import bootstrap from "../assets/icons/bootstrap.svg";
import jsfiddle from "../assets/icons/jsfiddle.svg";
// import {
//   bigShoe1,
//   bigShoe2,
//   bigShoe3,
//   customer1,
//   customer2,
//   shoe4,
//   shoe5,
//   shoe6,
//   shoe7,
//   thumbnailShoe1,
//   thumbnailShoe2,
//   thumbnailShoe3,
// } from "../assets/images";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#footer", label: "Contact me" },
  { href: "#Resume", label: "Resume" },
];

// export const shoes = [
//   {
//     thumbnail: thumbnailShoe1,
//     bigShoe: bigShoe1,
//   },
//   {
//     thumbnail: thumbnailShoe2,
//     bigShoe: bigShoe2,
//   },
//   {
//     thumbnail: thumbnailShoe3,
//     bigShoe: bigShoe3,
//   },
// ];

// export const statistics = [
//   { value: "1k+", label: "Brands" },
//   { value: "500+", label: "Shops" },
//   { value: "250k+", label: "Customers" },
// ];

// export const products = [
//   {
//     imgURL: shoe4,
//     name: "Nike Air Jordan-01",
//     price: "₹2000",
//   },
//   {
//     imgURL: shoe5,
//     name: "Nike Air Jordan-10",
//     price: "₹2200",
//   },
//   {
//     imgURL: shoe6,
//     name: "Nike Air Jordan-100",
//     price: "₹2520",
//   },
//   {
//     imgURL: shoe7,
//     name: "Nike Air Jordan-001",
//     price: "₹3400",
//   },
// ];

// export const services = [
//   {
//     imgURL: truckFast,
//     label: "Free shipping",
//     subtext: "Enjoy seamless shopping with our complimentary shipping service.",
//   },
//   {
//     imgURL: shieldTick,
//     label: "Secure Payment",
//     subtext:
//       "Experience worry-free transactions with our secure payment options.",
//   },
//   {
//     imgURL: support,
//     label: "Love to help you",
//     subtext: "Our dedicated team is here to assist you every step of the way.",
//   },
// ];

// export const reviews = [
//   {
//     imgURL: customer1,
//     customerName: "Sravan Kumar PV",
//     rating: 4.5,
//     feedback:
//       "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
//   },
//   {
//     imgURL: customer2,
//     customerName: "Lota Mongeskar",
//     rating: 4.5,
//     feedback:
//       "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
//   },
// ];
export const courses = [
  {
    courseName: "CSS",
    projects: [
      {
        title: "Grid",
        name: "Stripedemo",
        link: "https://stripedemo1.netlify.app/",
      },
      {
        title: "Animation",
        name: "3DCube",
        link: "https://jsfiddle.net/pvskr/f2vat9bm/1/",
      },
      {
        title: "Animation",
        name: "SolarSystem",
        link: "https://jsfiddle.net/pvskr/95okncw6/388/",
      },
    ],
    language: [{ src: css, alt: "css logo", name: "CSS" }],
    summary: " This project mainly focused on grid, flex,and animations",
  },
  {
    courseName: "JS",
    projects: [
      {
        title: "JSConcept",
        name: "Bank",
        link: "https://jsfiddle.net/pvskr/g9jp2fsd/243/",
      },
    ],
    language: [{ src: js, alt: "JS logo", name: "JS" }],

    summary: " This project mainly focused on js ",
  },
  {
    courseName: "HTML",
    projects: [
      {
        title: "projects",
        name: "BCDPROJECT",
        link: "#", // Replace with the actual link if available
      },
    ],
    language: [{ src: html, alt: "html logo", name: "HTML" }],
  },
  {
    courseName: "React",
    projects: [
      {
        title: "ReactDemo",
        name: "buyMe",
        link: "https://new-buy-me.netlify.app/",
      },
      {
        title: "ReactWith-CSS",
        name: "DropboxSravan",
        link: "https://dropboxsravan.netlify.app/",
      },
    ],
    language: [{ src: react, alt: "react logo", name: "React" }],
    summary: " This project mainly focused on React JS",
  },
  {
    courseName: "BootStrap",
    projects: [
      {
        title: "CardDemo",
        name: "Card",
        link: "https://jsfiddle.net/pvskr/pnfjt029/20/",
      },
    ],
    language: [{ src: bootstrap, alt: "bootstrap logo", name: "BootStrap" }],
    summary: " This project mainly focused on BootStrap CSS",
  },
  {
    courseName: "Tailwind",
    projects: [
      {
        title: "nikesravan",
        name: "nike",
        link: "https://jsfiddle.net/pvskr/pnfjt029/20/",
      },
    ],
    language: [{ src: tailwind, alt: "tailwind logo", name: "Tailwind" }],
    summary: " This project mainly focused on Tailwind CSS",
  },
  // Add more courses here
];
export const work = [{ src: tailwind, alt: "tailwind logo", name: "Tailwind" }];
export const footerLinks = [
  {
    title: "Get in touch",
    links: [
      { name: "+917973943675", link: "tel:+917973943675" },
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
  { src: linkedIn, alt: "LinkedIn logo", name: "LinkedIn" },
  { src: github, alt: "githu logo", name: "Github" },
  { src: netlify, alt: "netlify logo", name: "Netlify" },
  { src: jsfiddle, alt: "jsfiddle logo", name: "Jsfiddle" },
];
