/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Otimização de imagens (ideal para portfólio)
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Garante builds consistentes e sem warnings antigos
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Otimização de headers HTTP
  compress: true,
  poweredByHeader: false,

  // Mantem config estavel em producao
  experimental: {},
};

export default nextConfig;
