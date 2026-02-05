import { absoluteUrl } from "@/lib/seo";

const title = "Industries | Data Consulting Group";
const description =
  "Industry playbooks for applying AI and analytics across energy, banking, manufacturing, retail, aviation, and transportation.";

export default function Head() {
  const canonical = absoluteUrl("/industries") ?? "/industries";

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

