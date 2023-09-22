import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col 
   justify-center min-h-screen gap-10 max-container"
    >
      <div
        className=" relative flex 
        justify-center items-start w-full
         max-xl:padding-x pt-28 top-10"
      >
        <h2
          className=" pt-10 font-palanquin text-3xl max-sm:text-[24px] 
        max-sm:leading-[2] font-semibold"
        >
          Hi , <span>👏</span> this is
          <span className="text-coral-red"> SravanKumar PV</span>
        </h2>
      </div>
    </section>
  );
};

export default Hero;
