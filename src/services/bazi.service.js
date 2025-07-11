import { Lunar } from 'lunar-javascript';

class BaziService {
  // 计算八字
  calculateBazi(birthDate) {
    try {
      // 这里是一个简化的八字计算示例
      const date = new Date(birthDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();

      // 简化的天干地支对应
      const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
      const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

      // 简化的计算方法
      const yearStem = heavenlyStems[(year - 4) % 10];
      const yearBranch = earthlyBranches[(year - 4) % 12];
      const monthStem = heavenlyStems[(year * 2 + month) % 10];
      const monthBranch = earthlyBranches[month];
      const dayStem = heavenlyStems[(year * 5 + month * 6 + day) % 10];
      const dayBranch = earthlyBranches[(year * 5 + month * 6 + day) % 12];
      const hourStem = heavenlyStems[(day * 2 + hour) % 10];
      const hourBranch = earthlyBranches[Math.floor(hour / 2)];

      return {
        year: {
          heavenlyStem: yearStem,
          earthlyBranch: yearBranch,
          hiddenElements: this.getHiddenElements(yearBranch)
        },
        month: {
          heavenlyStem: monthStem,
          earthlyBranch: monthBranch,
          hiddenElements: this.getHiddenElements(monthBranch)
        },
        day: {
          heavenlyStem: dayStem,
          earthlyBranch: dayBranch,
          hiddenElements: this.getHiddenElements(dayBranch)
        },
        hour: {
          heavenlyStem: hourStem,
          earthlyBranch: hourBranch,
          hiddenElements: this.getHiddenElements(hourBranch)
        }
      };
    } catch (error) {
      throw new Error('八字计算失败，请检查输入日期是否正确');
    }
  }

  // 获取地支藏干
  getHiddenElements(earthlyBranch) {
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
  calculateWuxingStrength(bazi) {
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

    return strength;
  }

  // 分析五行状态
  analyzeWuxingStatus(strength) {
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
  generateSuggestions(status) {
    const suggestions = [];
    
    for (const [element, state] of Object.entries(status)) {
      if (state === '太旺') {
        suggestions.push(`${element}太旺，建议: 1.避免${element}相关物品过多 2.增加克制${element}的元素`);
      } else if (state === '太弱') {
        suggestions.push(`${element}太弱，建议: 1.增加${element}相关物品 2.减少克制${element}的元素`);
      }
    }
    
    return suggestions;
  }
}

export default new BaziService(); 