import { motion } from "framer-motion";
import { Server, Brain, Database, Cpu, Shield, Zap } from "lucide-react";
import React from "react";

const Services = () => {
  return (
    <section className="container mx-auto px-2 md:px-4">
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-xl md:text-3xl font-bold  mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="md:text-lg opacity-75 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Comprehensive AI and data solutions tailored to your business needs,
          delivered with enterprise-grade quality and security.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Brain,
            title: "AI Consulting",
            description:
              "Strategic guidance on implementing AI solutions to solve complex business challenges.",
            color: "from-dcg-lightBlue to-[#00AACA]",
            features: [
              "Strategy Development",
              "ROI Analysis",
              "Implementation Roadmap",
            ],
          },
          {
            icon: Database,
            title: "Data Analytics",
            description:
              "Transform raw data into actionable insights to drive informed decision-making.",
            color: "from-[#00AACA] to-[#00BACA]",
            features: ["Data Mining", "Predictive Analytics", "Visualization"],
          },
          {
            icon: Cpu,
            title: "Machine Learning",
            description:
              "Custom ML models to predict outcomes and optimize business processes.",
            color: "from-[#00BACA] to-[#00A5CA]",
            features: ["Model Development", "Training & Testing", "Deployment"],
          },
          {
            icon: Server,
            title: "Cloud Solutions",
            description:
              "Scalable cloud infrastructure to support your AI and data initiatives.",
            color: "from-[#00A5CA] to-[#00AACA]",
            features: ["AWS/Azure", "Scalability", "Security"],
          },
          {
            icon: Shield,
            title: "Data Security",
            description:
              "Protect your valuable data assets with advanced security measures.",
            color: "from-[#00B5CA] to-[#00BACA]",
            features: ["PCI Compliance", "Encryption", "Access Control"],
          },
          {
            icon: Zap,
            title: "Process Automation",
            description:
              "Streamline operations with intelligent automation of repetitive tasks.",
            color: "from-[#00BACA] to-dcg-lightGreen",
            features: ["Workflow Design", "Integration", "Monitoring"],
          },
        ].map((service, index) => (
          <motion.div
            key={service.title}
            className="group bg-white dark:bg-black/10 border dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            // whileHover={{ y: -8 }}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300`}
            >
              <service.icon className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-bold  mb-4">{service.title}</h3>
            <p className="opacity-75 mb-6 leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-2 opacity-75">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-sm text-opacity-75"
                >
                  <div className="w-1 h-1 bg-black dark:bg-white rounded-full mr-3"></div>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
};

export default Services;
