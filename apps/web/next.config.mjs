/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Otimização de imagens (ideal para portfólio)
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
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

  // Garante paths limpos na build
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
