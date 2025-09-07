import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      <BackgroundGradientAnimation className="absolute h-full  flex flex-col justify-between z-10 container mx-auto px-2 md:px-4 pt-40 pb-20 ">
        <div className="gap-6 flex flex-col items-center md:items-start">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full shadow-sm backdrop-blur-3xl border opacity-75 text-xs md:text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            ⚡ Leading AI & Data Science Consultancy
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              Business with AI
            </span>
          </h1>

          <p className="md:text-lg px-4 text-sm opacity-75 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            We help enterprises leverage cutting-edge AI and machine learning to
            drive innovation, optimize operations, and achieve breakthrough
            results.
          </p>
          <motion.div
            className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex text-center text-xs md:text-sm items-center md:px-8 p-3 md:py-4 bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Our Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex  text-xs md:text-sm items-center md:px-8 p-3 md:py-4 border-[0.5px] opacity-75 hover:border-dcg-lightGreen hover:text-dcg-lightGreen font-semibold rounded-xl  transition-all duration-200"
            >
              Get Started
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
