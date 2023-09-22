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
          <span className="text-coral-red"> SravanKumar PV</span>
        </h2>
        <p>Code, like humor, works best when it's concise.</p>
      </div>
      <div
        className="
        relative  flex p-20 top-20 
       flex-col justify-center items-center w-full max-sm:p-10"
      >
        <img
          className="relative  rounded-bl-[30%] rounded-br-[30%] rounded-tl-[0] rounded-tr-[30%] object-cover "
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
