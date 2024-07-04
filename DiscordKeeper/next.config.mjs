/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },
  images: {
    domains: ['www.mydevify.com'],
  },
};

export default nextConfig;
