import Image from "next/image";
import { partnerLogos } from "@/lib/partner-logos";

// Single row scrolling horizontally forever, edges faded out.
// The list is rendered twice and the track shifts by -50% to loop seamlessly.
export default function PartnerLogosMarquee() {
  const loop = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section
      aria-label="Partner logos, infinite scroll"
      className="group w-full overflow-hidden py-10"
    >
      <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
        Trusted by industry leaders
      </p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[logo-marquee_70s_linear_infinite] items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((logo, index) => (
            <Image
              key={`${logo.name}-${index}`}
              src={logo.url}
              alt={index < partnerLogos.length ? logo.name : ""}
              aria-hidden={index >= partnerLogos.length}
              width={logo.width}
              height={logo.height}
              sizes="160px"
              className="mr-32 h-9 w-auto shrink-0 object-contain opacity-70 grayscale md:mr-48 md:h-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
