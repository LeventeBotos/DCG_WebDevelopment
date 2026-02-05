/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  distDir: ".next-local",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
