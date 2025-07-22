/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
<<<<<<< HEAD
    unoptimized: true, // 确保图片在Netlify和Vercel上都能正确显示
=======
    unoptimized: true,
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
  },
  // 确保样式正确加载
  webpack: (config) => {
    return config;
<<<<<<< HEAD
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
  // 确保路径正确
  trailingSlash: true,
=======
  }
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
}

module.exports = nextConfig 