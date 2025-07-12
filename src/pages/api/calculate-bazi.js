import { Lunar, Solar } from 'lunar-javascript';

// 获取地支藏干
function getHiddenElements(earthlyBranch) {
  const hiddenMap = {
    子: [{ stem: '癸', strength: 10 }],
    丑: [{ stem: '己', strength: 5 }, { stem: '癸', strength: 3 }, { stem: '辛', strength: 2 }],
    寅: [{ stem: '甲', strength: 5 }, { stem: '丙', strength: 3 }, { stem: '戊', strength: 2 }],
    卯: [{ stem: '乙', strength: 10 }],
    辰: [{ stem: '戊', strength: 5 }, { stem: '乙', strength: 3 }, { stem: '癸', strength: 2 }],
    巳: [{ stem: '丙', strength: 5 }, { stem: '庚', strength: 3 }, { stem: '戊', strength: 2 }],
    午: [{ stem: '丁', strength: 5 }, { stem: '己', strength: 5 }],
    未: [{ stem: '己', strength: 5 }, { stem: '丁', strength: 3 }, { stem: '乙', strength: 2 }],
    申: [{ stem: '庚', strength: 5 }, { stem: '壬', strength: 3 }, { stem: '戊', strength: 2 }],
    酉: [{ stem: '辛', strength: 10 }],
    戌: [{ stem: '戊', strength: 5 }, { stem: '辛', strength: 3 }, { stem: '丁', strength: 2 }],
    亥: [{ stem: '壬', strength: 5 }, { stem: '甲', strength: 5 }]
  };

  return hiddenMap[earthlyBranch] || [];
}

// 计算五行强度
function calculateWuxingStrength(bazi) {
  const elementMap = {
    甲: '木', 乙: '木',
    丙: '火', 丁: '火',
    戊: '土', 己: '土',
    庚: '金', 辛: '金',
    壬: '水', 癸: '水'
  };

  const strength = {
    木: 0, 火: 0, 土: 0, 金: 0, 水: 0
  };

  // 计算天干五行
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    const stem = bazi[pillar].heavenlyStem;
    const element = elementMap[stem];
    strength[element] += 10;
  });

  // 计算地支藏干
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    bazi[pillar].hiddenElements.forEach(hidden => {
      const element = elementMap[hidden.stem];
      strength[element] += hidden.strength;
    });
  });

  // 根据性别调整五行强度
  if (bazi.gender === '男') {
    // 男性阳刚之气更强，木火相对更旺
    strength['木'] *= 1.1;
    strength['火'] *= 1.1;
  } else if (bazi.gender === '女') {
    // 女性阴柔之气更强，金水相对更旺
    strength['金'] *= 1.1;
    strength['水'] *= 1.1;
  }

  return strength;
}

// 分析五行状态
function analyzeWuxingStatus(strength) {
  const total = Object.values(strength).reduce((a, b) => a + b, 0);
  const average = total / 5;
  
  const status = {};
  for (const [element, value] of Object.entries(strength)) {
    if (value >= average * 1.5) {
      status[element] = '太旺';
    } else if (value >= average * 1.2) {
      status[element] = '偏旺';
    } else if (value <= average * 0.5) {
      status[element] = '太弱';
    } else if (value <= average * 0.8) {
      status[element] = '偏弱';
    } else {
      status[element] = '平衡';
    }
  }
  
  return status;
}

// 生成改善建议
function generateSuggestions(status, gender = '男') {
  const suggestions = [];
  
  for (const [element, state] of Object.entries(status)) {
    if (state === '太旺') {
      let suggestion = `${element}太旺，建议: 1.避免${element}相关物品过多 2.增加克制${element}的元素`;
      
      // 根据性别给出更具体的建议
      if (gender === '男' && (element === '木' || element === '火')) {
        suggestion += ` 3.男性${element}过旺可能导致脾气暴躁，建议多冥想平心静气`;
      } else if (gender === '女' && (element === '金' || element === '水')) {
        suggestion += ` 3.女性${element}过旺可能导致情绪波动，建议适当运动释放能量`;
      }
      
      suggestions.push(suggestion);
    } else if (state === '太弱') {
      let suggestion = `${element}太弱，建议: 1.增加${element}相关物品 2.减少克制${element}的元素`;
      
      // 根据性别给出更具体的建议
      if (gender === '男' && (element === '金' || element === '水')) {
        suggestion += ` 3.男性${element}不足可能影响决断力，建议佩戴${element}属性饰品增强`;
      } else if (gender === '女' && (element === '木' || element === '火')) {
        suggestion += ` 3.女性${element}不足可能影响创造力，建议在居室增加${element}元素`;
      }
      
      suggestions.push(suggestion);
    }
  }
  
  return suggestions;
}

export default function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    res.status(405).json({ message: '只允许POST请求' });
    return;
  }

  try {
    const { birthDate, birthTime, gender, unknownTime } = req.body;
    
    if (!birthDate) {
      res.status(400).json({ message: '出生日期不能为空' });
      return;
    }

    // 解析日期和时间
    const date = new Date(birthDate);
    if (unknownTime) {
      date.setHours(12, 0, 0); // 默认中午12点
    } else if (birthTime) {
      const [hours, minutes] = birthTime.split(':').map(Number);
      date.setHours(hours, minutes, 0);
    }

    // 使用lunar-javascript库计算八字
    const solar = Solar.fromDate(date);
    const lunar = Lunar.fromSolar(solar);
    const eightChar = lunar.getEightChar();
    
    // 获取年、月、日、时柱
    const bazi = {
      year: {
        heavenlyStem: eightChar.getYear().getGan(),
        earthlyBranch: eightChar.getYear().getZhi(),
        hiddenElements: getHiddenElements(eightChar.getYear().getZhi())
      },
      month: {
        heavenlyStem: eightChar.getMonth().getGan(),
        earthlyBranch: eightChar.getMonth().getZhi(),
        hiddenElements: getHiddenElements(eightChar.getMonth().getZhi())
      },
      day: {
        heavenlyStem: eightChar.getDay().getGan(),
        earthlyBranch: eightChar.getDay().getZhi(),
        hiddenElements: getHiddenElements(eightChar.getDay().getZhi())
      },
      hour: {
        heavenlyStem: eightChar.getTime().getGan(),
        earthlyBranch: eightChar.getTime().getZhi(),
        hiddenElements: getHiddenElements(eightChar.getTime().getZhi())
      },
      gender
    };

    // 计算五行强度
    const strength = calculateWuxingStrength(bazi);
    
    // 分析五行状态
    const status = analyzeWuxingStatus(strength);
    
    // 生成建议
    const suggestions = generateSuggestions(status, gender);

    // 格式化结果
    const result = {
      bazi: {
        year: `${bazi.year.heavenlyStem}${bazi.year.earthlyBranch}`,
        month: `${bazi.month.heavenlyStem}${bazi.month.earthlyBranch}`,
        day: `${bazi.day.heavenlyStem}${bazi.day.earthlyBranch}`,
        hour: unknownTime ? '未知' : `${bazi.hour.heavenlyStem}${bazi.hour.earthlyBranch}`
      },
      gender,
      wuxing: strength,
      wuxingStatus: status,
      analysis: suggestions.join('。') || '您的五行较为平衡，请继续保持。',
      // 添加农历信息
      lunar: {
        year: lunar.getYearInChinese(),
        month: lunar.getMonthInChinese(),
        day: lunar.getDayInChinese(),
        zodiac: lunar.getYearShengXiao(),
        festival: lunar.getFestivals().join('，')
      }
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('八字计算错误:', error);
    res.status(500).json({ message: '八字计算失败，请检查输入日期是否正确', error: error.message });
  }
} 