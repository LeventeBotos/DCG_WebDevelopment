import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { hexToRgb, platformBySlug, platforms } from "@/lib/platforms";
import { Vortex } from "@/components/ui/vortex";
import { Button } from "@/components/ui/button";
import ContactCtaSection from "@/components/ContactCtaSection";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  const legacy = Object.keys(legacyRedirects).map((slug) => ({ slug }));
  const primary = platforms.map((platform) => ({ slug: platform.slug }));
  return [...primary, ...legacy];
}

const legacyRedirects: Record<string, string> = {
  "dcg-ai-platform": "personalization-ai",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = legacyRedirects[slug] ?? slug;
  const platform = platformBySlug[targetSlug];

  if (!platform) {
    return {
      title: "Solution not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/solutions/${targetSlug}`;

  return {
    title: `${platform.title} | DCG AI Platform`,
    description: platform.hero.description || platform.cardBody,
    alternates: { canonical },
    openGraph: {
      title: `${platform.title} | DCG AI Platform`,
      description: platform.hero.description || platform.cardBody,
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: `${platform.title} | DCG AI Platform`,
      description: platform.hero.description || platform.cardBody,
    },
  };
}

const withAlpha = (rgb: [number, number, number], alpha: number) =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

const buildHeroBackground = (
  start: [number, number, number],
  end: [number, number, number]
) => ({
  backgroundImage: `
    radial-gradient(circle at 15% 20%, ${withAlpha(
      start,
      0.35
    )} 0, transparent 40%),
    radial-gradient(circle at 82% 16%, ${withAlpha(
      end,
      0.36
    )} 0, transparent 40%),
    radial-gradient(circle at 68% 78%, ${withAlpha(
      end,
      0.26
    )} 0, transparent 40%),
    linear-gradient(135deg, ${withAlpha(start, 0.25)}, ${withAlpha(end, 0.12)})
  `,
});

const cardBackground = (
  start: [number, number, number],
  end: [number, number, number]
) => ({
  background: `linear-gradient(135deg, ${withAlpha(start, 0.08)}, ${withAlpha(
    end,
    0.16
  )})`,
  borderColor: withAlpha(start, 0.25),
});

const toRgb = (rgb: [number, number, number]) =>
  `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

const buttonGradient = (
  start: [number, number, number],
  end: [number, number, number],
  alpha = 1
) =>
  `linear-gradient(90deg, ${withAlpha(start, alpha)}, ${withAlpha(
    end,
    alpha
  )})`;

const rgbToHue = ([r, g, b]: [number, number, number]) => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue =
    max === nr
      ? (ng - nb) / delta
      : max === ng
      ? 2 + (nb - nr) / delta
      : 4 + (nr - ng) / delta;

  hue *= 60;
  if (hue < 0) hue += 360;
  return hue;
};

const hueRange = (
  start: [number, number, number],
  end: [number, number, number]
) => {
  const h1 = rgbToHue(start);
  const h2 = rgbToHue(end);
  const diffClockwise = (h2 - h1 + 360) % 360;
  const diffCounter = 360 - diffClockwise;

  if (diffClockwise <= diffCounter) {
    return { baseHue: h1, rangeHue: diffClockwise };
  }

  return { baseHue: h2, rangeHue: diffCounter };
};

export default async function PlatformPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = legacyRedirects[slug] ?? slug;
  const platform = platformBySlug[targetSlug];

  if (!platform) {
    notFound();
  }

  if (targetSlug !== slug) {
    redirect(`/solutions/${targetSlug}`);
  }

  const startColor = hexToRgb(platform.gradient.start);
  const endColor = hexToRgb(platform.gradient.end);
  const heroBackground = buildHeroBackground(startColor, endColor);
  const accent = cardBackground(startColor, endColor);
  const accentTextColor = toRgb(endColor);
  const accentBorderColor = withAlpha(startColor, 0.25);
  const secondaryButtonStyle = {
    // backgroundImage: buttonGradient(startColor, endColor, 0.12),
    borderColor: "rgba(0, 0, 0, 0.5)",
    color: "rgba(0, 0, 0, 0.5)",
  };
  const { baseHue: heroHue, rangeHue: heroHueRange } = hueRange(
    startColor,
    endColor
  );

  return (
    <div className="flex min-h-screen flex-col" data-footer-black>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={heroBackground} />
        <Vortex
          backgroundColor="#ffffff"
          containerClassName="bg-white"
          baseHue={heroHue}
          rangeHue={heroHueRange}
          baseRadius={2}
          rangeY={150}
          className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
        >
          {/* <div className="absolute inset-0 bg-white/70" /> */}
          <div className="relative dcg-section py-16 md:py-24 space-y-10">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12 text-black">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-opacity-50">
                  {platform.hero.kicker}
                </span>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight  md:text-5xl">
                    {platform.hero.headline}
                  </h1>
                  <p className="text-lg text-opacity-70 md:text-xl max-w-3xl">
                    {platform.hero.description}
                  </p>
                </div>

                <div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                  >
                    <Link href="/contact">Book a working session</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    style={secondaryButtonStyle}
                  >
                    <Link href="/projects">See how we deliver</Link>
                  </Button>
                </div>

                {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {platform.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border bg-white p-4 shadow-sm"
                      style={accent}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-slate">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-semibold text-dcg-ink">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* <div className="grid gap-4">
              <div
                className="rounded-3xl border bg-white/80 p-6 shadow-lg backdrop-blur"
                style={{ borderColor: accentBorderColor }}
              >
                <div
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: accentTextColor }}
                >
                  <Sparkles className="h-4 w-4" />
                  Why teams choose this platform
                </div>
                <p className="mt-3 text-sm text-dcg-slate">
                  {platform.hero.partnerNote}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {platform.signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border px-3 py-1 text-xs font-semibold text-dcg-ink"
                      style={{
                        borderColor: withAlpha(endColor, 0.35),
                        background: withAlpha(startColor, 0.1),
                      }}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </Vortex>
      </section>

      <section className="dcg-section py-12 md:py-16 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
            What success looks like
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            Outcome targets
          </h2>
          <p className="text-dcg-slate">
            The value we design for from day one—paired with measurement that
            proves it.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platform.outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className="flex h-full flex-col justify-between rounded-3xl border bg-white p-5 shadow-sm"
              style={{ borderColor: accentBorderColor }}
            >
              <div
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: accentTextColor }}
              >
                <CheckCircle2 className="h-4 w-4" />
                {outcome.title}
              </div>
              <p className="mt-3 text-sm text-dcg-slate">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="dcg-section py-12 md:py-16 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
            Composable capabilities
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            What we build and run together
          </h2>
          <p className="text-dcg-slate">
            Pre-built components plus your stack. We wire in the data,
            guardrails, and human workflows that make AI reliable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platform.capabilities.map((capability) => (
            <div
              key={capability.title}
              className="flex h-full flex-col gap-3 rounded-3xl border bg-white p-5 shadow-md"
              style={{ borderColor: accentBorderColor }}
            >
              <div
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: accentTextColor }}
              >
                <Sparkles className="h-4 w-4" />
                {capability.title}
              </div>
              <ul className="space-y-2 text-sm text-dcg-slate">
                {capability.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      className="mt-1 inline-block h-2 w-2 rounded-full"
                      style={{
                        background: withAlpha(startColor, 0.6),
                      }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="dcg-section py-12 md:py-16 space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className="rounded-3xl border bg-white p-6 shadow-md"
            style={{ borderColor: accentBorderColor }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: accentTextColor }}
            >
              <ArrowRight className="h-4 w-4" />
              Launch patterns
            </div>
            <p className="mt-2 text-sm text-dcg-slate">
              Examples we can stand up first to prove value, then scale with
              your teams.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-dcg-slate">
              {platform.launches.map((launch) => (
                <li key={launch} className="flex gap-3">
                  <span
                    className="mt-1 inline-block h-2 w-2 rounded-full"
                    style={{
                      background: withAlpha(endColor, 0.65),
                    }}
                  />
                  <span>{launch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl border bg-white p-6 shadow-md"
            style={{ borderColor: accentBorderColor }}
          >
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: accentTextColor }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Operating model & enablement
            </div>
            <p className="mt-2 text-sm text-dcg-slate">
              How we keep the platform safe, transparent, and easy for teams to
              extend.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-dcg-slate">
              {platform.enablers.map((enabler) => (
                <li key={enabler} className="flex gap-3">
                  <span
                    className="mt-1 inline-block h-2 w-2 rounded-full"
                    style={{
                      background: withAlpha(startColor, 0.65),
                    }}
                  />
                  <span>{enabler}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-5 rounded-2xl border bg-dcg-sand/60 p-4"
              style={{ borderColor: accentBorderColor }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                Signals we instrument
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {platform.signals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border px-3 py-1 text-xs font-semibold text-dcg-ink"
                    style={{
                      borderColor: withAlpha(endColor, 0.35),
                      background: withAlpha(endColor, 0.1),
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCtaSection
        eyebrow="Ready to plan the first 6 weeks?"
        title="Let’s roadmap, then launch an evidence-backed pilot."
        description="We co-deliver with your teams, leave behind the runbooks, and stay long enough to make sure the value sticks."
        primaryLabel="Schedule a call"
        primaryHref="/contact"
        secondaryLabel="Explore our services"
        secondaryHref="/services"
      />
    </div>
  );
}
