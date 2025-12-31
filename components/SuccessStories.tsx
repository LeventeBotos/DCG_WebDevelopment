import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

const successStories = [
  {
    company: "Shell",
    logo: "https://www.pngplay.com/wp-content/uploads/3/Royal-Dutch-Shell-Logo-PNG-HD-Quality.png",
    industry: "Energy",
    result: "40% improvement in production forecasting accuracy",
    impact: "£12M+ annual cost savings",

    delay: 0.1,
  },
  {
    company: "British Airways",
    industry: "Aviation",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo.png",
    result: "60% reduction in fraud detection time",
    impact: "Enhanced customer security",

    delay: 0.2,
  },
  {
    company: "Infosys",
    industry: "Manufacturing",
    result: "35% increase in supply chain efficiency",
    impact: "Faster time-to-market",

    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
    delay: 0.3,
  },
];

const SuccessStories = () => {
  return (
    <section>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {successStories.map((story) => (
          <motion.div
            key={story.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: story.delay }}
            className="h-full"
          >
            <CardContainer className="w-full" containerClassName="w-full py-0">
              <CardBody className="group/card relative h-full w-full min-h-[260px] flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                {/* <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-dcg-lightBlue/15 via-white to-dcg-lightGreen/15 opacity-0 blur-sm transition duration-500 group-hover/card:opacity-100" /> */}

                <CardItem
                  translateZ={50}
                  className="relative  w-full flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {story.logo && (
                      <img
                        src={story.logo}
                        alt={`${story.company} logo`}
                        className="h-8 w-auto grayscale transition duration-300 group-hover/card:grayscale-0"
                      />
                    )}
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-2 py-1 text-xs font-medium text-white">
                    {story.industry}
                  </span>
                </CardItem>

                <CardItem translateZ={100} className="relative mt-6 space-y-3">
                  <h3 className="text-lg font-bold text-dcg-ink">
                    {story.company}
                  </h3>
                  <p className="text-sm text-dcg-slate">{story.result}</p>
                </CardItem>

                <CardItem
                  translateZ={50}
                  className="relative mt-4 text-sm font-semibold text-dcg-ink"
                >
                  {story.impact}
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
