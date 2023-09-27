import React from "react";
import headerLogo from "../assets/images/headerLogo.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex flex-col  items-center 
   justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative p-20 top-20 flex flex-col justify-center items-center w-full max-sm:p-10 bg-gradient-to-b from-[rgba(245, 246, 252, 0.52)] to-[rgba(117, 19, 93, 0.73)]">
        <div
          className="bg-gradient-to-br from-[#ff6b6b] to-[#ffa07a] rounded"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73))",
          }}
        >
          <img
            className="relative cursor-pointer p-1 border-4 rounded-bl-[30%]
     rounded-br-[30%] rounded-tl-[0] rounded-tr-[30%]
      object-cover filter brightness-[75%] 
      hover:border-l-green-500
      hover:border-t-green-500
      hover:border-b-red-400
      hover:brightness-100 transition duration-300"
            src={headerLogo}
            alt="logo"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div
        className=" relative flex   flex-col
        justify-center items-center w-full
         max-xl:padding-x pt-10 "
      >
        <h3
          className=" pt-10 font-palanquin text-3xl max-sm:text-[24px] 
        max-sm:leading-[2] font-semibold"
        >
          Hi , <span>👏</span> I'm
          <br />
          <span className="text-coral-red"> SravanKumar PV </span>
          <br />
          <span className="font-montserrat">Web Developer</span>
        </h3>
        <p>Code, like humor, works best when it's concise.</p>
      </div>
    </section>
  );
};

export default Hero;
