import { absoluteUrl } from "@/lib/seo";

const title = "Knowledge Graph & Digital Twin | Data Consulting Group";
const description =
  "A knowledge graph and digital twin approach for mapping entities, relationships, and operational signals into decision-ready context.";

export default function Head() {
  const canonical =
    absoluteUrl("/projects/knowledge-graph") ?? "/projects/knowledge-graph";

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

