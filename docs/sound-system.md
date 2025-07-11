# 五行赫兹频率音效系统技术文档

## 概述

五行赫兹频率音效系统是五行图境平台的一个创新功能，通过将用户的八字五行分析结果与特定赫兹频率音效相结合，为用户提供多感官体验，增强能量平衡效果。本系统基于Web Audio API开发，支持实时音效生成、混合和个性化调整。

## 核心频率设计

系统根据古老的五行理论和现代声学研究，为五行元素匹配了特定的赫兹频率：

| 五行 | 频率 | 感受 | 推荐音效 |
|------|------|------|---------|
| 木 | 528 Hz | 舒展、生发 | 笛声、风铃 |
| 火 | 639 Hz | 热情、鼓舞 | 鼓点、心跳 |
| 土 | 396 Hz | 稳定、安全 | 太鼓、钟声 |
| 金 | 741 Hz | 清明、理性 | 铜铃、锣声 |
| 水 | 432 Hz | 宁静、疗愈 | 水声、钢琴 |

这些频率基于索尔菲尔吉奥音阶(Solfeggio Frequencies)，一种被认为具有特殊能量和疗愈特性的古老音频频率体系。

## 系统架构

赫兹频率音效系统由以下几个核心模块组成：

1. **音效资源库模块**(`soundLibrary.js`)：定义五行频率对应关系和音效资源
2. **音频管理器模块**(`audioManager.js`)：负责音频文件的加载、缓存、处理与播放
3. **API服务模块**(`generateSound.js`)：根据用户五行数据生成音效配置
4. **资源代理API**(`/api/assets/[...path].js`)：安全访问受保护的资源文件
5. **前端播放器组件**(`SoundPlayer.js`)：交互界面，支持播放、暂停、调节音量等操作

### 数据流程

```
用户五行数据 → 音效配置生成 → 资源代理API → 音频资源加载 → 音效合成与处理 → 播放与用户交互
```

## 资源保护机制

为了保护音效、图片和动图等产品资源，系统采用了以下保护机制：

1. **资源存储隔离**：所有产品资源文件存储在独立的`5Elements-shop`目录中，而非公共目录
2. **API代理访问**：前端不直接访问资源文件，而是通过`/api/assets/`API端点代理访问
3. **路径验证**：API端点验证请求的资源路径，防止目录遍历攻击
4. **文件类型限制**：只允许访问预定义的安全文件类型
5. **缓存控制**：适当设置缓存策略，平衡性能和资源保护

## 工作原理

### 1. 用户五行分析

系统首先获取用户的八字五行分布情况，例如：
```javascript
{
  wood: 2,
  fire: 1,
  earth: 3,
  metal: 0,
  water: 2
}
```

### 2. 音效配置生成

系统根据用户五行分布，通过两种模式生成音效配置：

- **平衡模式**：增强最弱五行的能量频率
- **增强模式**：突出最强五行的能量频率

同时，结合次要五行元素，形成和谐的频率组合。

### 3. 实时音效合成

系统使用Web Audio API进行实时音效合成：

- 使用`OscillatorNode`生成精确的基础频率
- 添加调制效果增强听觉体验
- 应用增益节点控制音量和淡入淡出效果

### 4. 用户交互与体验

用户可以通过界面控制：

- 切换基础频率和定制音效
- 调节音量
- 下载个性化音效文件
- 与视觉效果同步

## 关键技术

### 音频合成

```javascript
// 创建振荡器节点生成特定频率声音
function createOscillator(frequency, type = 'sine') {
  const oscillator = audioContext.createOscillator();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  return oscillator;
}
```

### 音效混合

```javascript
// 混合多个频率源
function mixSources(sources) {
  const masterGain = audioContext.createGain();
  
  sources.forEach(source => {
    const oscillator = createOscillator(source.frequency);
    const gainNode = audioContext.createGain();
    gainNode.gain.value = source.volume;
    
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    oscillator.start();
  });
  
  masterGain.connect(audioContext.destination);
  return masterGain;
}
```

### 资源代理访问

```javascript
// 通过API代理访问受保护资源
async function loadProtectedAsset(assetPath) {
  const response = await fetch(`/api/assets/${assetPath}`);
  if (!response.ok) {
    throw new Error(`资源加载失败: ${response.statusText}`);
  }
  return response;
}
```

### 适应性调整

系统根据用户的心情/场景需求，提供不同的音效参数调整：

- **平静模式**：慢节奏、低音量、长时间体验
- **专注模式**：中等节奏、清晰音效、中等持续时间
- **活力模式**：快节奏、高音量、短时高强度体验
- **助眠模式**：极慢节奏、极低音量、渐变效果

## 文件结构

```
/my-library/
  ├── soundLibrary.js    # 音效资源库与配置
  └── audioManager.js    # 音频文件管理与处理
/components/
  └── SoundPlayer.js     # 前端播放器组件
/pages/
  ├── api/
  │   ├── generateSound.js # 音效配置API
  │   └── assets/
  │       └── [...path].js # 资源代理API
  └── index.js           # 集成到分析结果页面
/docs/
  └── sound-system.md    # 技术文档
/5Elements-shop/         # 商店资源目录（受保护）
  └── assets/
      ├── sounds/        # 音效资源
      │   ├── wood/      # 木元素音效
      │   ├── fire/      # 火元素音效
      │   ├── earth/     # 土元素音效
      │   ├── metal/     # 金元素音效
      │   └── water/     # 水元素音效
      ├── images/        # 图片资源
      │   ├── wood/      # 木元素图片
      │   ├── fire/      # 火元素图片
      │   ├── earth/     # 土元素图片
      │   ├── metal/     # 金元素图片
      │   └── water/     # 水元素图片
      └── animations/    # 动图资源
          ├── wood/      # 木元素动图
          ├── fire/      # 火元素动图
          ├── earth/     # 土元素动图
          ├── metal/     # 金元素动图
          └── water/     # 水元素动图
```

## 使用指南

### 前端集成

在任何React组件中使用音效播放器：

```jsx
import SoundPlayer from '../components/SoundPlayer';

function MyComponent({ baziResult }) {
  return (
    <div>
      {/* 其他内容 */}
      <SoundPlayer wuxingData={baziResult.wuxingCounts} mode="balanced" mood="calm" />
    </div>
  );
}
```

### API调用

直接通过API获取音效配置：

```javascript
async function getSoundConfig(wuxingData) {
  const response = await fetch('/api/generateSound', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      wuxingCounts: wuxingData,
      mode: 'balanced',
      mood: 'focus'
    })
  });
  
  return await response.json();
}
```

## 扩展与定制

### 添加新音效

1. 将音频文件放置在`5Elements-shop/assets/sounds/[element]/`相应元素文件夹下
2. 在`soundLibrary.js`中更新`ELEMENT_SOUNDS`对象
3. 重新生成音效配置

### 添加新频率模式

在`soundLibrary.js`中扩展`getSoundResources`函数：

```javascript
// 添加新模式：强化模式
if (mode === 'enhance') {
  // 现有逻辑
} else if (mode === 'newMode') {
  // 新模式逻辑
  primaryElement = customLogic();
  secondaryElement = anotherCustomLogic();
}
```

## 安全考量

- 所有产品资源文件存储在`5Elements-shop`目录中，不在公共可访问目录
- 通过API代理访问资源，实现访问控制和权限验证
- 可以在API代理中添加用户认证和授权检查
- 可以实现按需生成临时访问令牌，增强安全性

## 性能考量

- 使用Web Audio API的振荡器比加载音频文件更高效
- 对于复杂音效，预先加载音频文件以减少延迟
- 使用音频缓存机制避免重复加载
- 在移动设备上调整音效质量以平衡性能
- 适当设置资源缓存策略，减少API请求

## 浏览器兼容性

该系统依赖于Web Audio API，支持以下浏览器：

- Chrome 34+
- Firefox 25+
- Safari 7.1+
- Edge 12+
- Opera 22+

对于不支持Web Audio API的浏览器，系统会优雅降级，仅显示静态音效信息。

## 未来扩展

1. **脑波同步**：结合五行频率与脑波频率（α波、θ波等）
2. **音乐治疗整合**：将五行频率与传统音乐治疗方法结合
3. **智能推荐**：基于用户反馈自动调整最佳频率组合
4. **VR/AR集成**：在虚拟环境中创建沉浸式五行声音体验
5. **订阅模式**：实现高级音效资源的会员订阅机制 