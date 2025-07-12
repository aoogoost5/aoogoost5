#!/bin/bash

# 安装Netlify CLI（如果尚未安装）
if ! command -v netlify &> /dev/null; then
    echo "安装 Netlify CLI..."
    npm install -g netlify-cli
fi

# 构建项目
echo "构建项目..."
npm run build

# 部署到Netlify
echo "部署到Netlify..."
netlify deploy --prod 