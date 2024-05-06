/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add raw-loader for handling .Rmd files
    config.module.rules.push({
      test: /\.Rmd$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
