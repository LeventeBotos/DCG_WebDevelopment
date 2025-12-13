import Link from "next/link";
import { homepageFeaturedServices, servicesBySlug } from "@/lib/services";
import { ServiceCard } from "./shared";

export default function ServicesSection() {
  const services = homepageFeaturedServices
    .map((slug) => servicesBySlug[slug])
    .filter(
      (service): service is (typeof servicesBySlug)[string] => Boolean(service),
    );

  return (
    <section className="">
      <div className="">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              body={service.excerpt}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-dcg-blue hover:underline"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
