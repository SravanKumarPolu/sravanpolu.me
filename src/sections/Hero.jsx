import React from "react";
import headerLogo from "../assets/images/headerLogo.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex flex-col items-center justify-center min-h-screen gap-10 max-container ">
      <div className="relative py-10  top-20 flex flex-col justify-center items-center m-4 w-4/5 max-sm:p-5 bg-gradient-to-br from-[#ff6b6b] to-[#ffa07a] rounded">
        <img
          className="relative cursor-pointer p-1 border-4 rounded-full object-cover filter brightness-[75%] hover:border-l-green-500 hover:border-t-green-500 hover:border-b-red-400 hover:brightness-100 transition duration-300"
          src={headerLogo}
          alt="logo"
          width={200}
          height={200}
        />
      </div>

      <div className="relative flex flex-col justify-center items-center w-full max-xl:px-10 pt-10">
        <h3 className="pt-6 font-palanquin text-4xl md:text-5xl max-sm:text-2xl max-sm:leading-[2] font-semibold text-center text-gray-700 ">
          Hi,{" "}
          <span role="img" aria-label="Wave">
            👋
          </span>{" "}
          I'm <br />
          <span className="text-3xl md:text-4xl">SravanKumar PV</span> <br />
          <span className="font-montserrat text-2xl md:text-3xl text-white">
            Web Developer
          </span>
        </h3>
        <p className="max-sm:mt-4 text-center text-gray-700 text-lg">
          Code, like humor, works best when it's concise.
        </p>
      </div>
    </section>
  );
};

export default Hero;
