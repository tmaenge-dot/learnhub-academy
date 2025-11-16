import createMDX from '@next/mdx'
import type { NextConfig } from "next";
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'learnhub-academy'; // Your GitHub repo name

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: 'export', // Enable static export
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

const withMDX = createMDX({
  // Add markdown plugins here if needed
})

export default withMDX(nextConfig);
