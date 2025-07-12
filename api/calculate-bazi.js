import { Lunar } from 'lunar-javascript';

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

  // 根据性别调整五行强度 - 确保这里的代码被执行
  console.log('性别:', bazi.gender);
  if (bazi.gender === '男') {
    // 男性阳刚之气更强，木火相对更旺
    strength['木'] = strength['木'] * 1.1;
    strength['火'] = strength['火'] * 1.1;
    console.log('应用男性五行调整: 木火增强10%');
  } else if (bazi.gender === '女') {
    // 女性阴柔之气更强，金水相对更旺
    strength['金'] = strength['金'] * 1.1;
    strength['水'] = strength['水'] * 1.1;
    console.log('应用女性五行调整: 金水增强10%');
  }
  
  console.log('调整后的五行强度:', strength);

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

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'Preflight call successful' });
  }
  
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' });
  }

  try {
    const { birthDate, birthTime, gender } = req.body;
    
    console.log('收到请求参数:', { birthDate, birthTime, gender });
    
    if (!birthDate) {
      return res.status(400).json({ error: '出生日期不能为空' });
    }

    // 解析日期时间
    const dateTime = birthTime ? `${birthDate}T${birthTime}` : birthDate;
    const date = new Date(dateTime);
    
    try {
      // 使用lunar-javascript库计算农历日期
      const lunar = Lunar.fromDate(date);
      
      // 获取农历信息
      const yearGZ = lunar.getYearInGanZhi();
      const monthGZ = lunar.getMonthInGanZhi();
      const dayGZ = lunar.getDayInGanZhi();
      const timeGZ = lunar.getTimeInGanZhi();
      
      const lunarInfo = {
        year: lunar.getYear(),
        month: lunar.getMonth(),
        day: lunar.getDay(),
        yearInGanZhi: yearGZ,
        monthInGanZhi: monthGZ,
        dayInGanZhi: dayGZ,
        timeInGanZhi: timeGZ,
        festivals: lunar.getFestivals()
      };
      
      // 解析天干地支
      const yearStem = yearGZ.substring(0, 1);
      const yearBranch = yearGZ.substring(1, 2);
      const monthStem = monthGZ.substring(0, 1);
      const monthBranch = monthGZ.substring(1, 2);
      const dayStem = dayGZ.substring(0, 1);
      const dayBranch = dayGZ.substring(1, 2);
      const timeStem = timeGZ.substring(0, 1);
      const timeBranch = timeGZ.substring(1, 2);
      
      // 构建八字对象
      const bazi = {
        year: {
          heavenlyStem: yearStem,
          earthlyBranch: yearBranch,
          hiddenElements: getHiddenElements(yearBranch)
        },
        month: {
          heavenlyStem: monthStem,
          earthlyBranch: monthBranch,
          hiddenElements: getHiddenElements(monthBranch)
        },
        day: {
          heavenlyStem: dayStem,
          earthlyBranch: dayBranch,
          hiddenElements: getHiddenElements(dayBranch)
        },
        hour: {
          heavenlyStem: timeStem,
          earthlyBranch: timeBranch,
          hiddenElements: getHiddenElements(timeBranch)
        },
        gender: gender // 确保性别被正确传递
      };
      
      console.log('构建的八字对象:', bazi);
      
      // 计算五行强度
      const strength = calculateWuxingStrength(bazi);
      console.log('五行强度计算结果:', strength);
      
      // 分析五行状态
      const status = analyzeWuxingStatus(strength);
      console.log('五行状态分析结果:', status);
      
      // 生成建议
      const suggestions = generateSuggestions(status, gender);
      console.log('建议生成结果:', suggestions);

      return res.status(200).json({
        bazi: {
          year: `${yearStem}${yearBranch}`,
          month: `${monthStem}${monthBranch}`,
          day: `${dayStem}${dayBranch}`,
          hour: `${timeStem}${timeBranch}`
        },
        strength,
        status,
        suggestions,
        lunarInfo,
        version: 'v1.1.1-vercel', // 更新版本标记
        platform: 'Vercel API',
        gender: gender // 返回性别信息以便验证
      });
    } catch (lunarError) {
      return res.status(500).json({ error: `农历计算失败: ${lunarError.message}` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || '八字计算失败，请稍后再试' });
  }
} 