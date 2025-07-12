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
  // 确保API路由正确处理
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  },
  // 添加静态导出配置
  output: 'export',
  // 禁用图片优化以便静态导出
  images: {
    unoptimized: true,
  },
  // 确保路径正确
  trailingSlash: true,
}

module.exports = nextConfig 