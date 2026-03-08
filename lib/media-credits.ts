export type MediaCredit = {
  id: string;
  label: string;
  assetPath: string;
  artist: string;
  sourceName: string;
  sourceUrl: string;
  license: string;
  licenseUrl?: string;
  notes?: string;
};

export const mediaCredits: MediaCredit[] = [
  // Add entries here when footage or imagery requires attribution.
  // {
  //   id: "home-hero-video",
  //   label: "Homepage hero background video",
  //   assetPath: "/bg_video.mp4",
  //   artist: "Artist name",
  //   sourceName: "Pexels",
  //   sourceUrl: "https://www.pexels.com/video/...",
  //   license: "Pexels License",
  //   licenseUrl: "https://www.pexels.com/license/",
  //   notes: "Used as the homepage background video.",
  // },
];

export function hasMediaCredits(): boolean {
  return mediaCredits.length > 0;
}
