class CacheService {
  constructor() {
    this.cache = new Map();
    this.maxSize = 1000; // 最大缓存条目数
    this.expirationTime = 24 * 60 * 60 * 1000; // 24小时过期时间
  }

  // 获取缓存
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // 设置缓存
  set(key, value) {
    // 如果缓存已满，删除最早的条目
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.expirationTime
    });
  }

  // 清除过期缓存
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // 生成缓存键
  generateKey(params) {
    return JSON.stringify(params);
  }
}

export default new CacheService(); 