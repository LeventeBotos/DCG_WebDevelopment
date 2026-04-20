const DEFAULT_GA_ID = "G-T9WH3XWBH5";

const GA_ENV_KEYS = [
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
  "NEXT_PUBLIC_GTAG_ID",
  "GA_ID",
  "GOOGLE_ANALYTICS_ID",
  "GTAG_ID",
] as const;

const isGaMeasurementId = (value: string) => /^G-[A-Z0-9]+$/i.test(value);

export function getGoogleAnalyticsId() {
  const configuredId = GA_ENV_KEYS.map((key) => process.env[key]?.trim()).find(
    (value): value is string => Boolean(value),
  );

  if (configuredId && isGaMeasurementId(configuredId)) {
    return configuredId.toUpperCase();
  }

  return DEFAULT_GA_ID;
}
