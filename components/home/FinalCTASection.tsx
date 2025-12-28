import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { DottedGlowBackground } from "./ui/dotted-glow-background";

export default function FinalCTASection() {
  return (
    <section className="w-full py-20 px-2 md:px-4 mx-auto flex flex-row justify-center relative">
      {/* <DottedGlowBackground
        className="pointer-events-none h-full w-full bg-gradient-to-b from-white to-transparent"
     
      /> */}

      <div className="rounded-3xl z-10 max-w-7xl border border-dcg-lightBlue/25 bg-white self-center px-6 py-10 shadow-lg md:px-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
              Let&apos;s build tomorrow together.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-dcg-slate md:text-base">
              Whether you&apos;re exploring your first AI use-cases or scaling
              an existing data and AI portfolio, we help you move from slideware
              to impact – quickly and responsibly.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Schedule a conversation</Link>
            </Button>
            <p className="text-xs text-dcg-slate">
              Or email us at{" "}
              <a
                href="mailto:info@dataconsulting-group.com"
                className="font-semibold text-dcg-blue hover:underline"
              >
                info@dataconsulting-group.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
