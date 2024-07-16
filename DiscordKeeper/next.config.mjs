/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mydevify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
};

export default nextConfig;
