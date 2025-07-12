class LoggerService {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
  }

  // 记录信息
  info(message, data = {}) {
    this.log('INFO', message, data);
  }

  // 记录警告
  warn(message, data = {}) {
    this.log('WARN', message, data);
  }

  // 记录错误
  error(message, error = null) {
    this.log('ERROR', message, {
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : null
    });
  }

  // 记录调试信息
  debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.log('DEBUG', message, data);
    }
  }

  // 基础日志记录方法
  log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    // 在开发环境下打印到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level}] ${message}`, data);
    }

    // 添加到日志数组
    this.logs.unshift(logEntry);

    // 限制日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // TODO: 在生产环境中，可以将日志发送到服务器或保存到文件
    if (process.env.NODE_ENV === 'production') {
      // 实现日志持久化存储
    }
  }

  // 获取最近的日志
  getRecentLogs(count = 10) {
    return this.logs.slice(0, count);
  }

  // 清除日志
  clearLogs() {
    this.logs = [];
  }

  // 获取特定级别的日志
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  // 获取特定时间范围的日志
  getLogsByTimeRange(startTime, endTime) {
    return this.logs.filter(log => {
      const logTime = new Date(log.timestamp);
      return logTime >= startTime && logTime <= endTime;
    });
  }
}

export default new LoggerService(); 