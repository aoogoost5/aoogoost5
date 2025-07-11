# UI元素

此目录用于存放应用界面的UI元素，如按钮、图标、背景等。

## 预期文件结构

```
ui/
├── icons/        # 图标
├── buttons/      # 按钮
├── backgrounds/  # 背景
└── components/   # 组件
```

## 命名规范

```
{组件类型}-{用途}-{状态}.{格式}
```

例如：
- `button-calculate-normal.png` - 计算按钮正常状态
- `button-calculate-hover.png` - 计算按钮悬停状态
- `icon-settings.svg` - 设置图标

## 设计规范

- 使用一致的色彩方案
- 优先使用矢量图形（SVG）
- 确保适当的对比度和可访问性
- 支持深色/浅色模式 