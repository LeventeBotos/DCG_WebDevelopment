import { absoluteUrl } from "@/lib/seo";

const title = "Data Consulting Group | AI & Data Consulting";
const description =
  "AI predictions and data consulting for leading British companies.";

export default function Head() {
  const canonical = absoluteUrl("/") ?? "/";

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

