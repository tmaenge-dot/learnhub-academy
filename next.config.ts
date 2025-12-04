import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/learnhub-academy',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    // Exclude problematic test files from Netlify CLI
    config.module.rules.push({
      test: /node_modules\/netlify-cli/,
      use: 'null-loader',
    });
    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here if needed
})

export default withMDX(nextConfig);
