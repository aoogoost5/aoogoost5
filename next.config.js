/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: [], // 如果需要外部图片源，在这里添加
    unoptimized: true, // 确保图片在Vercel上正确显示
  },
  trailingSlash: false,
  staticPageGenerationTimeout: 180,
}

module.exports = nextConfig 