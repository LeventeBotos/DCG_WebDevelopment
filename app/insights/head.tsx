import { absoluteUrl } from "@/lib/seo";

const title = "Insights | Data Consulting Group";
const description =
  "Short reads on agentic enterprise, AI adoption, and building AI-first operating models that scale.";

export default function Head() {
  const canonical = absoluteUrl("/insights") ?? "/insights";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
    </>
  );
}

