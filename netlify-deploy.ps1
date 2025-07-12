# 检查是否安装了Netlify CLI
$netlifyInstalled = $null
try {
    $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
} catch {}

if (-not $netlifyInstalled) {
    Write-Host "安装 Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# 构建项目
Write-Host "构建项目..." -ForegroundColor Green
npm run build

# 部署到Netlify
Write-Host "部署到Netlify..." -ForegroundColor Cyan
netlify deploy --prod 