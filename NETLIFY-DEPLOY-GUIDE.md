# 五行分析系统 - Netlify部署指南

## 针对用户：aoogoost5

本指南提供了如何将五行分析系统部署到您的Netlify账户的详细步骤。

## 通过Netlify UI部署（推荐方式）

1. 登录您的Netlify账户：https://app.netlify.com/teams/aoogoost5/projects

2. 在Netlify仪表板中点击"Add new site" > "Import an existing project"

3. 选择"Deploy with GitHub"（或其他代码托管平台）

4. 授权Netlify访问您的GitHub仓库并选择五行分析系统项目

5. 配置以下部署设置：
   - 构建命令：`npm run build`
   - 发布目录：`.next`
   - 高级设置 > 添加环境变量：`NODE_VERSION` = `16` (或更高版本)

6. 点击"Deploy site"按钮开始部署

7. 部署完成后，Netlify会提供一个默认域名（例如 https://wuxing-analysis.netlify.app）

## 自定义域名设置（可选）

1. 在您的站点设置中，进入"Domain management"部分

2. 点击"Add custom domain"

3. 输入您想要使用的域名并按照提示完成设置

4. 更新您的DNS记录，指向Netlify提供的值

## 常见问题排查

如果部署过程中遇到问题：

1. **构建失败**：检查构建日志，确保所有依赖项都已正确安装

2. **页面显示不完整**：
   - 确保所有资源路径正确
   - 检查是否有路径引用了绝对路径而非相对路径
   - 验证所有资源文件都包含在部署中

3. **样式加载问题**：
   - 确保CSS文件正确引用
   - 检查是否有外部样式资源未能加载

## 持续部署

设置完成后，每次您推送代码到GitHub仓库，Netlify将自动重新部署您的网站。

## 需要帮助？

如果您在部署过程中遇到任何问题，可以查阅Netlify的官方文档或联系Netlify支持团队。 