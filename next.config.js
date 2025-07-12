/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // 确保图片在Netlify和Vercel上都能正确显示
  },
  // 确保样式正确加载
  webpack: (config) => {
    return config;
  },
  // 支持Netlify部署
  target: process.env.NETLIFY ? 'serverless' : undefined
}

module.exports = nextConfig 