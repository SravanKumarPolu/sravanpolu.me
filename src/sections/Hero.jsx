import React, { useState } from "react";
import headerLogo from "../assets/images/headerLogo.png";
import { motion } from "framer-motion";
const Hero = () => {
  const [selectedPage, setSelectedPage] = useState("");
  return (
    <section
      id="home"
      className="w-full overflow-x:hidden flex flex-col items-center justify-center min-h-screen gap-10 max-container  py-10">
      <motion.div
        className="   relative py-10  top-20 flex
       flex-col justify-center items-center m-4 w-4/5
        max-sm:p-5 bg-gradient-to-br from-[#ff6b6b] to-[#ffa07a] rounded"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}>
        <motion.img
          className="relative items-center  cursor-pointer p-1 border-4 rounded-full object-cover filter brightness-[75%] hover:border-l-green-500 hover:border-t-green-500 hover:border-b-red-400 hover:brightness-100 transition "
          src={headerLogo}
          alt="logo"
          width={200}
          height={200}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.5 }}
          variants={{
            hidden: { opacity: 0.2, x: -30 },
            visible: { opacity: 1, x: 10 },
          }}
        />
      </motion.div>

      <div className="relative flex flex-col justify-center items-center w-full max-xl:px-10 pt-10 sm:mb-10">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: { opacity: 0, x: 150 },
            visible: { opacity: 1, x: 0 },
          }}
          className="pt-6 font-palanquin text-4xl md:text-5xl max-sm:text-2xl
           max-sm:leading-[2] font-semibold text-center text-gray-500 hover:text-gray-300">
          Hi,{" "}
          <span role="img" aria-label="Wave">
            👋
          </span>{" "}
          this is <br />
          <span className="text-3xl md:text-4xl">SravanKumar </span> <br />
          <span className="font-montserrat hyphen-auto text-2xl md:text-3xl text-white">
            Web developer with expertise in front-end development.
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
          className="max-sm:mt-4 leading-loose text-center text-gray-500 hover:text-gray-300 text-lg">
          Code, like humor, works best when it's concise.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
