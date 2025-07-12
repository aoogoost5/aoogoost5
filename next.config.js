/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // 确保样式正确加载
  webpack: (config) => {
    return config;
  }
}

module.exports = nextConfig 