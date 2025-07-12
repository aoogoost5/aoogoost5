# Netlify部署指南

本项目支持通过Netlify进行部署。以下是部署步骤：

## 方法一：使用Netlify网站

1. 登录[Netlify](https://app.netlify.com/)
2. 点击"New site from Git"
3. 选择GitHub作为Git提供商
4. 授权Netlify访问您的GitHub账户
5. 选择本仓库
6. 部署设置：
   - 构建命令：`npm run build`
   - 发布目录：`.next`
   - 高级设置 > 新建环境变量：
     - `NODE_VERSION`: `16`
     - `NPM_VERSION`: `8`
7. 点击"Deploy site"

## 方法二：使用命令行

### Linux/Mac用户

1. 确保您已安装Node.js
2. 在项目根目录下运行：
   ```bash
   chmod +x netlify.sh
   ./netlify.sh
   ```

### Windows用户

1. 确保您已安装Node.js
2. 在项目根目录下运行PowerShell：
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\netlify-deploy.ps1
   ```

## 注意事项

- 首次部署时，Netlify CLI会要求您登录并选择团队/站点
- 如果您已经在Netlify上创建了站点，CLI会自动检测并使用它
- 如果遇到任何问题，请参考[Netlify文档](https://docs.netlify.com/) 