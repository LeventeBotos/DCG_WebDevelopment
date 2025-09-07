import { motion } from "framer-motion";
import React from "react";

const SectionTitle = ({
  title,
  subtitle,
  nomb = false,
}: {
  title: String;
  subtitle: string;
  nomb?: boolean;
}) => {
  return (
    <div className={`text-center ${!nomb && "mb-16"}`}>
      <motion.h2
        className=" text-xl md:text-3xl font-bold  mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="md:text-lg  max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
