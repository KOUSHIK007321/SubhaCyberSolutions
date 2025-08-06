/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
    },
  },
  devIndicators: false,
};

export default nextConfig;
