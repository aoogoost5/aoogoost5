import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const products = [
  {
    id: 'water',
    name: '水元素能量符号',
    englishName: 'Water Element Energy Symbol',
    description: '增强水元素能量，适合五行缺水人士，有助于提升智慧、沟通能力和适应性。',
    price: '$19.99',
    image: '/images/water-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/water-element'
  },
  {
    id: 'wood',
    name: '木元素能量符号',
    englishName: 'Wood Element Energy Symbol',
    description: '增强木元素能量，适合五行缺木人士，有助于提升创造力、成长能力和灵活性。',
    price: '$19.99',
    image: '/images/wood-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/wood-element'
  },
  {
    id: 'fire',
    name: '火元素能量符号',
    englishName: 'Fire Element Energy Symbol',
    description: '增强火元素能量，适合五行缺火人士，有助于提升热情、领导力和表现力。',
    price: '$19.99',
    image: '/images/fire-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/fire-element'
  },
  {
    id: 'earth',
    name: '土元素能量符号',
    englishName: 'Earth Element Energy Symbol',
    description: '增强土元素能量，适合五行缺土人士，有助于提升稳定性、实用性和可靠性。',
    price: '$19.99',
    image: '/images/earth-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/earth-element'
  },
  {
    id: 'metal',
    name: '金元素能量符号',
    englishName: 'Metal Element Energy Symbol',
    description: '增强金元素能量，适合五行缺金人士，有助于提升专注力、精确性和自律性。',
    price: '$19.99',
    image: '/images/metal-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/metal-element'
  },
  {
    id: 'custom',
    name: '定制五行能量符号',
    englishName: 'Custom Five Elements Symbol',
    description: '根据您的八字五行分析结果，定制专属能量符号，平衡您的五行能量。',
    price: '$29.99',
    image: '/images/custom-symbol.jpg',
    gumroadUrl: 'https://gumroad.com/l/custom-wuxing'
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>五行能量符号商城 | Five Elements Energy Symbols</title>
        <meta name="description" content="基于古老五行理论的能量符号，帮助平衡您的五行能量" />
      </Head>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">五行能量符号</h1>
          <h2 className="text-2xl text-gray-600">Five Elements Energy Symbols</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            我们的五行能量符号基于古老的东方五行理论，通过平衡五行能量，帮助您实现身心和谐。
            每个符号都经过精心设计，蕴含特定元素的能量特质。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.englishName}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  <a 
                    href={product.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    立即购买
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-indigo-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">基于您的五行分析定制符号</h2>
            <p className="mt-2 text-gray-600">
              完成我们的五行分析后，我们可以为您创建完全个性化的能量符号
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/">
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                进行五行分析
              </a>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} 五行能量商城 | Five Elements Shop. 保留所有权利。
          </p>
        </div>
      </footer>
    </div>
  );
} 