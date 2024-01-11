import React, { useState } from "react";
import headerLogo from "../assets/images/headerLogo.png";
import { motion } from "framer-motion";
const Hero = () => {
  const [selectedPage, setSelectedPage] = useState("");
  return (
    <section
      id="home"
      className="w-full overflow-x:hidden flex flex-col items-center justify-center min-h-screen gap-10 max-container ">
      <motion.div
        className="   relative py-10  top-20 flex
       flex-col justify-center items-center m-4 w-4/5
        max-sm:p-5 bg-gradient-to-br from-[#ff6b6b] to-[#ffa07a] rounded"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}>
        <motion.img
          className="relative cursor-pointer p-1 border-4 rounded-full object-cover filter brightness-[75%] hover:border-l-green-500 hover:border-t-green-500 hover:border-b-red-400 hover:brightness-100 transition duration-300"
          src={headerLogo}
          alt="logo"
          width={200}
          height={200}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: -170 },
            visible: { opacity: 1, y: 0 },
          }}
        />
      </motion.div>

      <div className="relative flex flex-col justify-center items-center w-full max-xl:px-10 pt-10">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, x: 150 },
            visible: { opacity: 1, x: 0 },
          }}
          className="pt-6 font-palanquin text-4xl md:text-5xl max-sm:text-2xl max-sm:leading-[2] font-semibold text-center text-gray-700 ">
          Hi,{" "}
          <span role="img" aria-label="Wave">
            👋
          </span>{" "}
          I'm <br />
          <span className="text-3xl md:text-4xl">SravanKumar PV</span> <br />
          <span className="font-montserrat text-2xl md:text-3xl text-white">
            Web Developer
          </span>
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="max-sm:mt-4 text-center text-gray-700 text-lg">
          Code, like humor, works best when it's concise.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
