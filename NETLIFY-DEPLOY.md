# Netlify 部署指南

本文档提供了如何将五行分析系统部署到 Netlify 的详细说明。

## 前提条件

1. 已有 Netlify 账户
2. 已将代码推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Netlify UI 部署

1. 登录 Netlify 账户
2. 点击 "New site from Git" 按钮
3. 选择 "GitHub" 作为代码源
4. 授权 Netlify 访问您的 GitHub 仓库
5. 选择包含五行分析系统的仓库
6. 配置构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`.next`
7. 点击 "Deploy site" 按钮

### 方法二：使用 Netlify CLI 部署

1. 安装 Netlify CLI：
   ```bash
   npm install -g netlify-cli
   ```

2. 登录 Netlify 账户：
   ```bash
   netlify login
   ```

3. 初始化项目：
   ```bash
   netlify init
   ```

4. 按照提示完成配置

5. 部署网站：
   ```bash
   netlify deploy --prod
   ```

## 注意事项

- 确保 `netlify.toml` 文件已正确配置
- 确保已安装 `@netlify/plugin-nextjs` 插件
- 如果遇到部署问题，请检查 Netlify 构建日志

## 自定义域名设置

1. 在 Netlify 网站设置中，进入 "Domain management" 部分
2. 点击 "Add custom domain"
3. 输入您的域名并按照提示完成设置
4. 更新您的 DNS 记录，指向 Netlify 提供的值

## 环境变量

如需添加环境变量，请在 Netlify 网站设置中的 "Build & deploy" > "Environment" 部分进行配置。 