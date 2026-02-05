import { absoluteUrl } from "@/lib/seo";

const title = "Projects & Case Studies | Data Consulting Group";
const description =
  "Explore featured solutions and projects—from digital twins to retail AI—delivered with strategy, implementation, and adoption support.";

export default function Head() {
  const canonical = absoluteUrl("/projects") ?? "/projects";

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

