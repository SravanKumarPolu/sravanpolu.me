import React from "react";
import headerLogo from "../assets/images/headerLogo.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col 
   justify-center min-h-screen gap-10 max-container"
    >
      <div
        className=" relative flex  flex-col
        justify-center items-center w-full
         max-xl:padding-x pt-28 top-10"
      >
        <h2
          className=" pt-10 font-palanquin text-3xl max-sm:text-[24px] 
        max-sm:leading-[2] font-semibold"
        >
          Hi , <span>👏</span> this is
          <br />
          <span className="text-coral-red"> SravanKumar PV </span>
          <br />
          <span className="font-montserrat">Web Developer</span>
        </h2>
        <p>Code, like humor, works best when it's concise.</p>
      </div>
      <div className="relative p-20 top-20 flex flex-col justify-center items-center w-full max-sm:p-10">
        <img
          className="relative p-1 border-4 rounded-bl-[30%]
           rounded-br-[30%] rounded-tl-[0] rounded-tr-[30%]
            object-cover filter brightness-[75%] 
            hover: hover:border-l-green-500
            hover: hover:border-t-green-500
            hover:border-b-red-400
         hover:brightness-100 transition duration-300"
          src={headerLogo}
          alt="logo"
          width={600}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
