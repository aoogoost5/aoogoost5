# 五行分析系统

基于中国传统五行理论的综合性项目，提供八字五行分析、能量符号定制与专属商城服务。

## 项目结构

```
/
├── src/                  # 源代码目录
│   ├── components/       # React组件
│   ├── pages/            # Next.js页面
│   ├── services/         # 服务层
│   ├── styles/           # 样式文件
│   └── utils/            # 工具函数
├── public/               # 静态资源
├── package.json          # 项目依赖
├── next.config.js        # Next.js配置
└── README.md             # 项目说明
```

## 功能特点

- **八字五行分析**：输入生辰八字，精准分析五行能量分布
- **能量符号定制**：根据五行分析结果，生成专属能量符号
- **五行能量商城**：选购五行能量符号及相关产品

## 技术栈

- Next.js
- React
- Chakra UI
- Chart.js
- Lunar-JavaScript（农历计算）

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yourusername/wuxing.git
cd wuxing
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 部署

项目使用Vercel进行部署，每次推送到主分支会自动触发部署。

## 许可证

MIT 