import { motion } from "framer-motion";

const SuccessStories = () => {
  return (
    <section>
      <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            company: "Shell",
            logo: "https://www.pngplay.com/wp-content/uploads/3/Royal-Dutch-Shell-Logo-PNG-HD-Quality.png",
            industry: "Energy",
            result: "40% improvement in production forecasting accuracy",
            impact: "£12M+ annual cost savings",
            icon: "⚡",
            delay: 0.1,
          },
          {
            company: "British Airways",
            industry: "Aviation",
            logo: "https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo.png",
            result: "60% reduction in fraud detection time",
            impact: "Enhanced customer security",
            icon: "✈️",
            delay: 0.2,
          },
          {
            company: "Infosys",
            industry: "Manufacturing",
            result: "35% increase in supply chain efficiency",
            impact: "Faster time-to-market",
            icon: "⚙️",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
            delay: 0.3,
          },
        ].map((story) => (
          <motion.div
            key={story.company}
            className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: story.delay }}
            // whileHover={{ y: -5 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* <span className="text-3xl">{story.icon}</span> */}
                <img
                  src={story.logo}
                  alt={`${story.company} logo`}
                  className="h-8 grayscale"
                />
                <span className="text-xs font-medium text-white bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-2 py-1 rounded-full">
                  {story.industry}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold  mb-2">{story.company}</h3>
                <p className="text-sm opacity-75 mb-3">{story.result}</p>
                <div className="text-sm font-semibold ">{story.impact}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
