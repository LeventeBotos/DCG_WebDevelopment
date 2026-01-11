import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen flex text-white flex-col items-center w-full justify-center overflow-hidden ">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-poster.jpg" // put a lightweight JPG here
          aria-hidden="true"
        >
          {/* Provide multiple formats for better codec support */}
          {/* <source src="/media/hero-bg.webm" type="video/webm" /> */}
          <source src="/testingvideo.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
      </div>

      {/* Static background for mobile / fallback */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
        style={{
          backgroundImage: "url('/media/hero-poster.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>
      <div className="h-full px-2 md:px-4 relative flex justify-center flex-col w-full">
        <div className="gap-10 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="">Transform ambition into</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              AI-driven impact
            </span>
          </h1>

          <p className="md:text-lg px-4 text-sm opacity-75 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            We enable organisations to realise sustained and measurable value
            through end-to-end digital, technology, and data solutions. Our
            approach blends strategic excellence with advanced engineering
            expertise to design and deliver purpose-built architectures that
            unlock growth and turn complex transformation ambitions into
            scalable, real-world outcomes. As a trusted partner and architect of
            change, we help enterprises unlock growth, drive impact, and deliver
            purpose-led results at scale.
          </p>
          <motion.div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start">
            <Button asChild variant="primary" size="lg">
              <Link href="/projects" className="text-xs md:text-sm">
                Digital, Technology & Data
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/projects" className="text-xs md:text-sm">
                Digital, Technology & Data
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="pt-8 w-full bottom-2 md:bottom-4 absolute flex flex-col md:items-start items-center"
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
      </div>
    </section>
  );
};

export default Hero;
