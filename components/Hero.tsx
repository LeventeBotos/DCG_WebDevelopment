import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center w-full justify-center overflow-hidden ">
      <BackgroundGradientAnimation className="absolute h-full w-full flex flex-col justify-between z-10 container mx-auto px-2 md:px-4 pt-40 pb-20 ">
        <div className="gap-6 flex flex-col items-center md:items-start">
          <div className="glass inline-flex items-center px-4 py-2 rounded-full shadow-sm  opacity-75 text-xs md:text-sm font-medium">
            ⚡ Leading AI & Data Science Consultancy
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="">Transform ambition into</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              AI-driven impact
            </span>
          </h1>

          <p className="md:text-lg px-4 text-sm opacity-75 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Data Consulting Group helps enterprises turn technology, data, and
            AI into measurable outcomes across retail, energy, finance, IT,
            transportation, aviation, and oil &amp; gas.
          </p>
          <motion.div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start">
            <Link
              href="/contact"
              className=" group inline-flex text-center text-xs md:text-sm items-center p-4 px-8  bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen text-white font-semibold rounded-xl transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-4 h-4 w-4  group-hover:translate-x-2 transition-all transform" />
            </Link>
            <Link
              href="/projects"
              className=" group inline-flex text-center text-xs md:text-sm items-center p-4 px-8  backdrop-blur-3xl  rounded-xl transform transition-all duration-200  hover:shadow-xl"
            >
              Go to Our Projects
            </Link>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="pt-8 w-full flex flex-col md:items-start items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap w-full items-center justify-center lg:justify-start gap-2 md:gap-6">
            {[
              "https://1000logos.net/wp-content/uploads/2016/10/BP-Logo.png",
              "https://www.pngplay.com/wp-content/uploads/3/Royal-Dutch-Shell-Logo-PNG-HD-Quality.png",
              "https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
            ].map((client, index) => (
              <motion.img
                key={client}
                className="px-4 py-2 h-8 md:h-14 object-contain opacity-75 grayscale"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                src={client}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              ></motion.img>
            ))}
          </div>
        </motion.div>
      </BackgroundGradientAnimation>
    </section>
  );
};

export default Hero;
