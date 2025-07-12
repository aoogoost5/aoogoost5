import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TestLocal() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 五行元素资源路径
  const elementPaths = {
    wood: '/api/assets/sounds/wood/test_528hz.txt',
    fire: '/api/assets/sounds/fire/test_639hz.txt',
    earth: '/api/assets/sounds/earth/test_396hz.txt',
    metal: '/api/assets/sounds/metal/test_741hz.txt',
    water: '/api/assets/sounds/water/test_432hz.txt'
  };

  // 测试单个元素资源
  const testElementResource = async (element) => {
    setLoading(true);
    setError(null);
    
    try {
      const path = elementPaths[element];
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setTestResults(prev => ({
        ...prev,
        [element]: {
          success: true,
          data,
          timestamp: new Date().toLocaleString()
        }
      }));
    } catch (err) {
      console.error(`测试${element}元素资源失败:`, err);
      setTestResults(prev => ({
        ...prev,
        [element]: {
          success: false,
          error: err.message,
          timestamp: new Date().toLocaleString()
        }
      }));
      setError(`测试${element}元素资源失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 测试所有元素资源
  const testAllResources = async () => {
    setLoading(true);
    setError(null);
    
    for (const element of Object.keys(elementPaths)) {
      try {
        const path = elementPaths[element];
        const response = await fetch(path);
        
        if (!response.ok) {
          throw new Error(`请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        setTestResults(prev => ({
          ...prev,
          [element]: {
            success: true,
            data,
            timestamp: new Date().toLocaleString()
          }
        }));
      } catch (err) {
        console.error(`测试${element}元素资源失败:`, err);
        setTestResults(prev => ({
          ...prev,
          [element]: {
            success: false,
            error: err.message,
            timestamp: new Date().toLocaleString()
          }
        }));
      }
    }
    
    setLoading(false);
  };

  // 获取元素的中文名称
  const getElementNameCn = (element) => {
    const nameMap = {
      wood: '木',
      fire: '火',
      earth: '土',
      metal: '金',
      water: '水'
    };
    return nameMap[element] || element;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>资源API本地测试</title>
        <meta name="description" content="测试资源API访问" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">资源API本地测试</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">API访问测试</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(elementPaths).map(element => (
              <button
                key={element}
                onClick={() => testElementResource(element)}
                disabled={loading}
                className={`px-4 py-2 text-white rounded hover:bg-opacity-90 disabled:bg-gray-400 ${
                  element === 'wood' ? 'bg-green-500' :
                  element === 'fire' ? 'bg-red-500' :
                  element === 'earth' ? 'bg-yellow-600' :
                  element === 'metal' ? 'bg-gray-500' :
                  'bg-blue-500'
                }`}
              >
                测试{getElementNameCn(element)}元素
              </button>
            ))}
            
            <button
              onClick={testAllResources}
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              测试所有元素
            </button>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">测试中...</span>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">错误:</p>
              <p>{error}</p>
            </div>
          )}
          
          {Object.keys(testResults).length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">测试结果:</h3>
              
              {Object.entries(testResults).map(([element, result]) => (
                <div 
                  key={element}
                  className={`p-4 rounded border ${
                    result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {getElementNameCn(element)}元素 ({element})
                    </h4>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  
                  {result.success ? (
                    <div>
                      <p className="text-green-700 font-medium">测试成功</p>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-sm">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-red-700">
                      <p className="font-medium">测试失败</p>
                      <p className="mt-1">{result.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">资源路径说明</h2>
          <ul className="list-disc pl-5 space-y-2">
            {Object.entries(elementPaths).map(([element, path]) => (
              <li key={element}>
                <code>{path}</code> - {getElementNameCn(element)}元素测试文件
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-medium text-blue-800 mb-2">提示</h3>
            <p>确保在 <code>../5Elements-shop/assets/sounds/</code> 目录下创建了对应的测试文件。</p>
            <p className="mt-2">如果测试失败，请检查:</p>
            <ol className="list-decimal pl-5 mt-1 space-y-1">
              <li>文件是否存在于正确位置</li>
              <li>API路径配置是否正确</li>
              <li>API响应格式是否符合预期</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
} 