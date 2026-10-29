import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import TrackedLink from "@/components/TrackedLink";

const trustedClients = [
  { name: "BP", url: "/bp.png", width: 480, height: 300 },
  { name: "Shell", url: "/shell.png", width: 480, height: 147 },
  { name: "British Airways", url: "/ba.png", width: 480, height: 270 },
  { name: "Infosys", url: "/infosys.png", width: 480, height: 192 },
];

const Hero = () => {
  return (
    <section
      className="relative h-[100svh] md:min-h-screen flex text-white flex-col items-center w-full justify-center overflow-hidden "
      aria-labelledby="home-hero-title"
      aria-describedby="home-hero-copy"
    >
      <HeroBackgroundVideo />

      {/* Static background for mobile / fallback */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/bg_video_thumbnail.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div className="h-full px-2 md:px-4 relative flex justify-center flex-col w-full">
        <div className="gap-10 flex flex-col items-center md:items-start">
          <h1
            id="home-hero-title"
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            <span className="">Transform ambition into</span>
            <br />
            <span className="bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
              AI-driven impact
            </span>
          </h1>

          <p
            id="home-hero-copy"
            className="md:text-lg px-4 text-sm opacity-75 max-w-2xl  leading-relaxed"
          >
            We enable organisations to achieve sustained, measurable growth
            through end-to-end digital, technology, and data solutions,
            combining strategic thinking with advanced engineering to turn
            complex transformation into scalable, real-world impact.
          </p>

          <Button asChild variant="primary" className="self-start" size="lg">
            <TrackedLink
              href="/projects"
              className="text-xs md:text-sm"
              event="cta_click"
              eventParams={{
                label: "Digital, Technology & Data",
                href: "/projects",
                location: "home_hero",
              }}
            >
              Digital, Technology & Data
            </TrackedLink>
          </Button>
        </div>
        {/* Trust Indicators */}
        <div className="pt-8 w-full bottom-2 md:bottom-4 absolute flex flex-col md:items-start items-center">
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap w-full items-center justify-center lg:justify-start gap-2 md:gap-6">
            {trustedClients.map((client) => (
              <Image
                key={client.name}
                className="px-4 py-2 h-8 md:h-14 w-auto object-contain opacity-75 grayscale"
                src={client.url}
                alt={client.name}
                width={client.width}
                height={client.height}
                sizes="(min-width: 768px) 180px, 120px"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
