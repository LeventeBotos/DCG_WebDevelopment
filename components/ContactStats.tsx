import { motion } from "framer-motion";
import { Clock, Shield, Globe } from "lucide-react";
import React from "react";

const ContactStats = () => {
  return (
    <section className="px-2 md:px-4">
      <motion.div
        className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen rounded-2xl p-8 md:p-12 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
            Always Here to Help
          </h3>
          <p className="max-w-[600px] mx-auto text-white/80">
            Our team is available across multiple time zones to provide support
            when you need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Response Time",
              value: "< 2 hours",
              description: "Average response time for urgent inquiries",
              icon: Clock,
              delay: 0.1,
            },
            {
              title: "Support Hours",
              value: "24/7",
              description: "Round-the-clock support availability",
              icon: Shield,
              delay: 0.2,
            },
            {
              title: "Global Reach",
              value: "3 Continents",
              description: "Team members across Europe, Africa, and Asia",
              icon: Globe,
              delay: 0.3,
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <motion.div
                className="mx-auto p-3 rounded-full bg-white/10 w-16 h-16 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <div className="text-2xl font-bold mb-2">{item.value}</div>
              <p className="text-sm text-white/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactStats;
