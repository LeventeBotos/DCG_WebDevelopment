import { absoluteUrl } from "@/lib/seo";

const title = "Services | Data Consulting Group";
const description =
  "Data, AI, and cloud operations services that take strategy to production with governance, MLOps, and measurable outcomes.";

export default function Head() {
  const canonical = absoluteUrl("/services") ?? "/services";

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

