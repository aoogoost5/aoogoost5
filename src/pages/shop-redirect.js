import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ShopRedirect() {
  const router = useRouter();
  const { data } = router.query; // 获取从主站传递的五行数据

  useEffect(() => {
    // 将五行数据编码并跳转到商城网站
    if (data) {
      const encodedData = encodeURIComponent(data);
      window.location.href = `https://5elements-shop.vercel.app/custom-symbol?data=${encodedData}`;
    } else {
      // 如果没有数据，跳转到商城首页
      window.location.href = 'https://5elements-shop.vercel.app';
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">正在跳转到五行能量商城...</h1>
        <p className="text-gray-600">请稍候，正在为您准备个性化体验</p>
      </div>
    </div>
  );
} 