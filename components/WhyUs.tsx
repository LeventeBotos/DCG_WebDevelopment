import { motion } from "framer-motion";
import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineShield } from "react-icons/md";
import SectionTitle from "./SectionTitle";

const WhyUs = () => {
  return (
    <section>
      <div className="container mx-auto px-2 md:px-4 ">
        <SectionTitle
          title={"Why Industry Leaders Choose DCG"}
          subtitle="We're not just another consulting firm. We're your strategic partner in
                the AI revolution, delivering measurable results that transform
                businesses."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <IoBarChartSharp />,
              title: "Proven Results",
              description:
                "£30M+ in cost savings delivered across 200+ projects",
            },
            {
              icon: <CiGlobe />,
              title: "Global Expertise",
              description:
                "Team spanning 3 continents with local market knowledge",
            },
            {
              icon: <AiOutlineThunderbolt />,
              title: "Fast Implementation",
              description: "From concept to deployment in weeks, not months",
            },
            {
              icon: <MdOutlineShield />,
              title: "Enterprise Security",
              description: "PCI compliant with bank-level security standards",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative mb-6">
                <div
                  className={`w-20 text-2xl h-20 border rounded-lg flex items-center justify-center mx-auto transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>

              <h3 className="text-xl font-bold  mb-3">{feature.title}</h3>
              <p className=" leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
