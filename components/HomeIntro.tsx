import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const HomeIntro = () => {
  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Home"
          subtitle="DCG is a cutting edge technology sector where advanced technologies and innovations transforms traditional industries. It involves the integration of smart machines, artificial intelligence, big data and automation to streamline processes, boost productivity, and create more efficient and sustainable solutions."
        />

        <motion.div
          className="mt-6 border rounded-xl p-6 bg-white/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm md:text-base">
            DCG holds the potential to revolutionize various sectors, enhancing
            workplace productivity and shaping the future of business.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntro;

