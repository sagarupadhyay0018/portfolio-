/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages serves this project repository under /portfolio-.
  // Keep local development and local builds at the domain root.
  basePath: process.env.GITHUB_PAGES === 'true' ? '/portfolio-' : '',
};

export default nextConfig;
