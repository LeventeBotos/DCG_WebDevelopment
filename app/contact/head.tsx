import { absoluteUrl } from "@/lib/seo";

const title = "Contact | Data Consulting Group";
const description =
  "Talk to DCG about AI strategy, data platforms, knowledge graphs, digital twins, and production-ready delivery.";

export default function Head() {
  const canonical = absoluteUrl("/contact") ?? "/contact";

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

