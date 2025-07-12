#!/bin/bash

# 确保使用正确的Node版本
echo "使用Node版本: $(node -v)"
echo "使用NPM版本: $(npm -v)"

# 安装依赖
echo "安装项目依赖..."
npm install

# 构建Next.js应用
echo "构建Next.js应用..."
npm run build

echo "部署完成!" 