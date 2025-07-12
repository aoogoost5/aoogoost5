/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 指定页面目录
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // 用于Netlify部署的配置
  images: {
    unoptimized: true,
  },
  // 确保在Netlify上正确处理路径
  trailingSlash: false,
  // 增加静态生成超时时间
  staticPageGenerationTimeout: 180,
  // 避免部署时的一些问题
  experimental: {
    // 禁用某些可能导致问题的实验性功能
    outputStandalone: true,
  }
}

module.exports = nextConfig 