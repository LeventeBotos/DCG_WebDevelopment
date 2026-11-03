import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { mediaCredits } from "@/lib/media-credits";

export const metadata: Metadata = {
  title: "Media Credits",
  description:
    "Artist, source, and license credits for third-party footage and media used on the Data Consulting Group website.",
  alternates: {
    canonical: "/credits",
  },
};

export default function CreditsPage() {
  const sections =
    mediaCredits.length > 0
      ? mediaCredits.map((credit) => ({
          title: credit.label,
          paragraphs: [
            `Asset: ${credit.assetPath}`,
            `Artist: ${credit.artist}`,
            <>
              Source:{" "}
              <a
                href={credit.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                {credit.sourceName}
              </a>
            </>,
            credit.licenseUrl ? (
              <>
                License:{" "}
                <a
                  href={credit.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-dcg-lightBlue hover:underline"
                >
                  {credit.license}
                </a>
              </>
            ) : (
              `License: ${credit.license}`
            ),
            ...(credit.notes ? [credit.notes] : []),
          ],
        }))
      : [
          {
            title: "Attribution policy",
            paragraphs: [
              "Third-party footage, imagery, and media that require attribution are listed on this page.",
              "When new licensed assets are added to the site, their artist, source, and license details should be recorded here before launch.",
            ],
          },
        ];

  return (
    <LegalDocumentPage
      title="Media Credits"
      description="Credits for licensed footage and other third-party media used throughout the site."
      lastUpdated="March 2026"
      intro={[
        "This page is the public record for third-party media attribution on the DCG website.",
      ]}
      sections={sections}
    />
  );
}
