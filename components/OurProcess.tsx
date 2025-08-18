import { motion } from "framer-motion";
import { Notebook } from "lucide-react";
import React from "react";
import { CiInboxIn, CiSearch, CiSettings } from "react-icons/ci";

const OurProcess = () => {
  return (
    <section className="px-2 md:px-4">
      <motion.div
        className="border dark:border-white/10 rounded-3xl p-8 lg:p-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Proven Process</h3>
          <p className="text-lg opacity-75">
            A systematic approach that ensures success in every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Discover",
              desc: "Deep dive into your business challenges and objectives",
              icon: <CiSearch />,
            },
            {
              step: "2",
              title: "Strategize",
              desc: "AI roadmap tailored to your specific goals",
              icon: <Notebook />,
            },
            {
              step: "3",
              title: "Build",
              desc: "Rapid development and testing with agile methods",
              icon: <CiSettings />,
            },
            {
              step: "4",
              title: "Deploy",
              desc: "Seamless rollout with ongoing support",
              icon: <CiInboxIn />,
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 border dark:border-white/10 rounded-lg flex items-center justify-center mx-auto shadow-lg  transition-colors duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8  text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
              </div>

              <h4 className="text-lg font-bold  mb-2">{item.title}</h4>
              <p className="opacity-75 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OurProcess;
