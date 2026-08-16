import type { NextConfig } from "next";

const rawBasePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "";
const cleanBasePath = rawBasePath
  ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, "")
  : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: cleanBasePath || undefined,
  assetPrefix: cleanBasePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
