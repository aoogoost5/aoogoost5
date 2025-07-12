# 五行分析系统

基于中国传统五行理论的综合性项目，提供八字五行分析、能量符号定制与专属商城服务。

## Git仓库

- **GitHub仓库**: https://github.com/aoogoost5/aoogoost5.git
- **主分支**: master
- **自动部署**: 推送到master分支会自动触发Netlify和Vercel的部署

## 项目结构

```
/
├── src/                  # 源代码目录
│   ├── components/       # React组件
│   ├── pages/            # Next.js页面
│   ├── services/         # 服务层
│   ├── styles/           # 样式文件
│   └── utils/            # 工具函数
├── api/                  # Vercel API端点
├── netlify/              # Netlify函数
│   └── functions/        # Netlify Functions
├── public/               # 静态资源
├── package.json          # 项目依赖
├── next.config.js        # Next.js配置
├── vercel.json           # Vercel配置
├── netlify.toml          # Netlify配置
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
- Netlify Functions
- Vercel Serverless Functions

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/aoogoost5/aoogoost5.git
cd aoogoost5
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

### Vercel部署
项目使用Vercel进行部署，每次推送到主分支会自动触发部署。

- **部署地址**: https://aoogoost5.vercel.app/
- **配置文件**: vercel.json
- **API端点**: /api/calculate-bazi.js

### Netlify部署
项目也支持通过Netlify部署，每次推送到主分支会自动触发部署。

- **部署地址**: https://aoogoost5.netlify.app/
- **配置文件**: netlify.toml
- **Netlify函数**: netlify/functions/calculate-bazi.js
- **详细说明**: 请参考[Netlify部署指南](./NETLIFY-DEPLOY-GUIDE.md)

#### 使用Netlify CLI部署:
```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

## 平台差异

- **前端代码**: 会自动检测当前平台（Vercel或Netlify），并调用相应的API端点
- **API端点**: 
  - Vercel: `/api/calculate-bazi`
  - Netlify: `/.netlify/functions/calculate-bazi`
- **版本信息**: 在分析结果页面可以看到当前使用的API版本和平台信息

## 许可证

MIT 