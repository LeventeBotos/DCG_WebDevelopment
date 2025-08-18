import { motion } from "framer-motion";
import { Database, Link, ArrowRight } from "lucide-react";
import React from "react";

const Industries = () => {
  return (
    <section className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="md:text-3xl text-xl font-bold  mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Industries We Serve
          </motion.h2>
          <motion.p
            className="md:text-lg  max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Our projects span across leading industries, delivering
            transformative AI and data solutions that drive real business value
            and measurable results.
          </motion.p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 max-w-7xl self-center mx-auto lg:grid-cols-4 gap-8">
        {[
          {
            title: "Energy",
            description:
              "Optimizing production forecasting and operational efficiency for energy companies.",
            href: "/industries/energy",
            icon: "⚡",
            color: "from-blue-500 to-blue-600",
            delay: 0.1,
          },
          {
            title: "Retail",
            description:
              "Advanced analytics and AI solutions for retail optimization and customer experience.",
            href: "/industries/retail",
            icon: "📊",
            color: "from-blue-600 to-blue-700",
            delay: 0.15,
          },
          {
            title: "Manufacturing",
            description:
              "Predictive maintenance and supply chain optimization for manufacturing companies.",
            href: "/industries/manufacturing",
            icon: "⚙️",
            color: "from-blue-700 to-blue-800",
            delay: 0.2,
          },
          {
            title: "Banking",
            description:
              "Advanced risk assessment and fraud detection solutions for financial institutions.",
            href: "/industries/banking",
            icon: "💳",
            color: "from-blue-800 to-blue-900",
            delay: 0.25,
          },
        ].map((industry) => (
          <motion.div
            key={industry.title}
            className="group bg-white border dark:border-white/10 dark:bg-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: industry.delay }}
            // whileHover={{ y: -8 }}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              <span className="text-2xl">{industry.icon}</span>
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

      <div className="flex justify-center mt-12">
        <Link
          href="/industries"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View All Industries
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default Industries;
