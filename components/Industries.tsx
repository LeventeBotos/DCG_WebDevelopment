import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AiFillThunderbolt, AiOutlineThunderbolt } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoBarChart, IoCard } from "react-icons/io5";
import SectionTitle from "./SectionTitle";

const Industries = () => {
  return (
    <section className="px-2 md:px-4">
      <div className="container mx-auto ">
        <SectionTitle
          title={"Industries We Serve"}
          subtitle="Our projects span across leading industries, delivering transformative AI and data solutions that drive real business value and measurable results."
        />
      </div>

      <div className="grid md:grid-cols-2 self-center mx-auto lg:grid-cols-4 gap-8">
        {[
          {
            title: "Energy",
            description:
              "Optimizing production forecasting and operational efficiency for energy companies.",
            href: "/industries/energy",
            icon: <AiOutlineThunderbolt />,
            color: "from-dcg-lightBlue to-[#00AACA]",
            delay: 0.1,
          },
          {
            title: "Retail",
            description:
              "Advanced analytics and AI solutions for retail optimization and customer experience.",
            href: "/industries/retail",
            icon: <IoBarChart />,
            color: "from-[#00AACA] to-[#00BACA]",
            delay: 0.15,
          },
          {
            title: "Manufacturing & Production",
            description:
              "Predictive maintenance and supply chain optimization for manufacturing and production.",
            href: "/industries/manufacturing",
            icon: <CiSettings />,
            color: "from-[#00B5CA] to-[#00BACA]",
            delay: 0.2,
          },
          {
            title: "Banking",
            description:
              "Advanced risk assessment and fraud detection solutions for financial institutions.",
            href: "/industries/banking",
            icon: <IoCard />,
            color: "from-[#00BACA] to-dcg-lightGreen",
            delay: 0.25,
          },
        ].map((industry) => (
          <motion.div
            key={industry.title}
            className="group bg-white border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: industry.delay }}
            // whileHover={{ y: -8 }}
          >
            <div
              className={`w-16 h-16 text-2xl bg-gradient-to-r text-white ${industry.color} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              {industry.icon}
            </div>

            <h3 className="text-lg font-bold  mb-3">{industry.title}</h3>
            <p className="opacity-75 text-sm mb-4 leading-relaxed">
              {industry.description}
            </p>

            <Link
              href={industry.href}
              className="inline-flex items-center text-sm font-medium  group-hover:underline"
            >
              Learn More
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Industries;
