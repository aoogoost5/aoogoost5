# 五行分析系统 - 部署脚本
# 此脚本用于将项目推送到GitHub，然后可以在Netlify上进行部署

# 确保所有更改都已添加到Git
Write-Output "正在添加所有更改到Git..."
git add .

# 提交更改
$commitMessage = "添加Netlify部署配置"
Write-Output "正在提交更改..."
git commit -m "$commitMessage"

# 推送到GitHub
Write-Output "正在推送到GitHub..."
git push origin main

Write-Output "推送完成！"
Write-Output "现在您可以登录Netlify进行部署：https://app.netlify.com/teams/aoogoost5/projects"

# 提示用户访问Netlify部署指南
Write-Output "请参考 NETLIFY-DEPLOY-GUIDE.md 文件了解如何在Netlify上部署项目" 