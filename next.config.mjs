const SUB_DIRECTORY = "/.";
const isProd = process.env.NODE_ENV == "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // basePath: isProd ? SUB_DIRECTORY : "",
  assetPrefix: isProd ? "." : "",
  // publicRuntimeConfig: {
  //   basePath: isProd ? SUB_DIRECTORY : "",
  // },
};

export default nextConfig;
