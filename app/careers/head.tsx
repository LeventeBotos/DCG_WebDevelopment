import { absoluteUrl } from "@/lib/seo";

const title = "Careers | Data Consulting Group";
const description =
  "Open roles at DCG across ML engineering, cloud solutions, and data & analytics consulting.";

export default function Head() {
  const canonical = absoluteUrl("/careers") ?? "/careers";

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

