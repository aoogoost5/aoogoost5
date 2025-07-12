import React, { useState, useEffect, useRef } from 'react';

/**
 * 五行赫兹频率音效播放器组件
 * 可以播放基于用户五行分布的频率音效
 */
const SoundPlayer = ({ wuxingData, mode = 'balanced', mood = 'calm' }) => {
  const [soundConfig, setSoundConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [activeTab, setActiveTab] = useState('base'); // 'base' 或 'custom'
  
  // 音频上下文和节点引用
  const audioContextRef = useRef(null);
  const audioSourcesRef = useRef({});
  const gainNodesRef = useRef({});
  
  // 获取音效配置
  useEffect(() => {
    if (!wuxingData) return;
    
    const fetchSoundConfig = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/generateSound', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wuxingCounts: wuxingData,
            mode,
            mood
          })
        });
        
        if (!response.ok) {
          throw new Error('获取音效配置失败');
        }
        
        const data = await response.json();
        if (data.success) {
          setSoundConfig(data.data);
        } else {
          throw new Error(data.error || '未知错误');
        }
      } catch (err) {
        setError(err.message);
        console.error('音效配置获取错误:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSoundConfig();
  }, [wuxingData, mode, mood]);
  
  // 初始化音频上下文
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    }
    
    // 组件卸载时清理资源
    return () => {
      stopAllSounds();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);
  
  // 播放基本频率音效
  const playBaseFrequency = async () => {
    if (!audioContextRef.current || !soundConfig) return;
    
    try {
      // 停止当前播放的所有音效
      stopAllSounds();
      
      // 创建振荡器节点播放基本频率
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      // 设置频率
      oscillator.type = 'sine'; // 正弦波
      oscillator.frequency.value = soundConfig.primary.frequency;
      
      // 设置音量
      gainNode.gain.value = volume;
      
      // 连接节点
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // 保存节点引用
      audioSourcesRef.current.base = oscillator;
      gainNodesRef.current.base = gainNode;
      
      // 添加渐入效果
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 1);
      
      // 开始播放
      oscillator.start();
      setIsPlaying(true);
      setCurrentTrack('base');
      
    } catch (err) {
      console.error('播放基本频率音效失败:', err);
      setError('播放音效失败');
    }
  };
  
  // 播放复合音效
  const playCompositeSound = async (trackIndex = 0) => {
    if (!audioContextRef.current || !soundConfig || !soundConfig.suggestions[trackIndex]) return;
    
    try {
      // 停止当前播放的所有音效
      stopAllSounds();
      
      const track = soundConfig.suggestions[trackIndex];
      
      // 创建多个振荡器来模拟复合音效
      track.elements.forEach((element, index) => {
        // 为每个元素创建一个振荡器
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        // 设置频率 - 主频率加上微小变化以创造和声
        const baseFreq = element.type ? 
          soundConfig.all.find(e => e.element === element.type)?.frequency || 528 : 
          track.baseFrequency;
        
        oscillator.type = index % 2 === 0 ? 'sine' : 'triangle'; // 混合波形
        oscillator.frequency.value = baseFreq + (index * 0.5); // 轻微频率变化
        
        // 设置音量 - 根据权重调整
        const elementVolume = volume * (element.weight || 0.5);
        gainNode.gain.value = elementVolume;
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        // 保存节点引用
        audioSourcesRef.current[`composite_${index}`] = oscillator;
        gainNodesRef.current[`composite_${index}`] = gainNode;
        
        // 添加渐入效果
        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          elementVolume, 
          audioContextRef.current.currentTime + (index * 0.5 + 0.5)
        );
        
        // 开始播放
        oscillator.start();
      });
      
      setIsPlaying(true);
      setCurrentTrack(`composite_${trackIndex}`);
      
    } catch (err) {
      console.error('播放复合音效失败:', err);
      setError('播放音效失败');
    }
  };
  
  // 停止所有音效
  const stopAllSounds = () => {
    try {
      // 停止所有音频源
      Object.values(audioSourcesRef.current).forEach(source => {
        if (source) {
          // 渐出效果
          const gainNode = source.gainNode;
          if (gainNode && gainNode.gain) {
            gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
          }
          
          // 延迟停止以允许渐出效果完成
          setTimeout(() => {
            try {
              source.stop();
            } catch (e) {
              // 忽略已停止的音频源错误
            }
          }, 500);
        }
      });
      
      // 重置引用
      audioSourcesRef.current = {};
      gainNodesRef.current = {};
      
      setIsPlaying(false);
      setCurrentTrack(null);
    } catch (err) {
      console.error('停止音效失败:', err);
    }
  };
  
  // 切换播放状态
  const togglePlay = () => {
    if (isPlaying) {
      stopAllSounds();
    } else {
      if (activeTab === 'base') {
        playBaseFrequency();
      } else {
        playCompositeSound(0); // 播放第一个建议音效
      }
    }
  };
  
  // 调整音量
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // 调整当前播放音效的音量
    Object.values(gainNodesRef.current).forEach(gainNode => {
      if (gainNode && gainNode.gain) {
        gainNode.gain.linearRampToValueAtTime(newVolume, audioContextRef.current.currentTime + 0.1);
      }
    });
  };

  if (loading) return <div className="flex justify-center py-4">加载音效配置中...</div>;
  if (error) return <div className="text-red-500 py-2">错误: {error}</div>;
  if (!soundConfig) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 my-4">
      <h3 className="text-lg font-semibold mb-3">五行赫兹频率音效</h3>
      
      {/* 选项卡切换 */}
      <div className="flex mb-4 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'base' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('base')}
        >
          基础频率
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'custom' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('custom')}
        >
          定制音效
        </button>
      </div>
      
      {/* 基础频率面板 */}
      {activeTab === 'base' && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-medium">{getElementNameCn(soundConfig.primary.element)}</span>
              <span className="text-sm text-gray-600 ml-2">
                {soundConfig.primary.frequency} Hz
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {getMoodDescription(mood)}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                isPlaying && currentTrack === 'base'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => togglePlay()}
            >
              {isPlaying && currentTrack === 'base' ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  停止
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  播放基础频率
                </>
              )}
            </button>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
              <svg className="w-4 h-4 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="text-sm bg-gray-50 p-3 rounded">
            <p className="mb-2"><span className="font-medium">频率特性：</span> {getFrequencyDescription(soundConfig.primary.element)}</p>
            <p><span className="font-medium">适用场景：</span> {getApplicationScenario(soundConfig.primary.element)}</p>
          </div>
        </div>
      )}
      
      {/* 定制音效面板 */}
      {activeTab === 'custom' && (
        <div>
          <p className="text-sm text-gray-600 mb-3">基于您的五行分布量身定制的音效组合</p>
          
          {soundConfig.suggestions.map((suggestion, index) => (
            <div key={index} className="mb-4 border-b pb-4 last:border-0">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{suggestion.name}</h4>
                <span className="text-sm text-gray-500">{suggestion.duration}秒</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
              
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded text-sm flex items-center ${
                    isPlaying && currentTrack === `composite_${index}`
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                  onClick={() => {
                    if (isPlaying && currentTrack === `composite_${index}`) {
                      stopAllSounds();
                    } else {
                      playCompositeSound(index);
                    }
                  }}
                >
                  {isPlaying && currentTrack === `composite_${index}` ? '停止' : '播放'}
                </button>
                
                <button className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center hover:bg-gray-200">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  下载
                </button>
                
                <button className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center hover:bg-gray-200">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  分享
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap">
                {suggestion.elements.map((el, i) => (
                  <span key={i} className="text-xs mr-2 mb-1 px-2 py-1 bg-gray-100 rounded-full">
                    {getElementNameCn(el.type)} {Math.round(el.weight * 100)}%
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        <p>*注意：请使用耳机获得最佳体验。长时间聆听同一频率可能导致听觉疲劳，建议每20分钟休息一次。</p>
      </div>
    </div>
  );
};

// 辅助函数：获取五行元素的中文名称
function getElementNameCn(element) {
  const nameMap = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水'
  };
  return nameMap[element] || element;
}

// 辅助函数：获取心情描述
function getMoodDescription(mood) {
  const descriptions = {
    calm: '平静放松模式',
    focus: '专注提升模式',
    energize: '活力激发模式',
    sleep: '助眠模式'
  };
  return descriptions[mood] || '默认模式';
}

// 辅助函数：获取频率描述
function getFrequencyDescription(element) {
  const descriptions = {
    wood: '528Hz被称为"奇迹音调"，有助于DNA修复和细胞再生，带来生命活力和成长能量。',
    fire: '639Hz与心轮共振，促进人际关系的和谐，增强爱、理解和连接感。',
    earth: '396Hz有助于消除恐惧和焦虑，增强安全感和稳定感。',
    metal: '741Hz促进直觉发展和问题解决能力，增强清晰思考和表达能力。',
    water: '432Hz被认为是自然频率，与宇宙谐振，带来宁静和深层放松。'
  };
  return descriptions[element] || '';
}

// 辅助函数：获取应用场景
function getApplicationScenario(element) {
  const scenarios = {
    wood: '早晨能量激活、创意发想、春季调节',
    fire: '社交活动前、情感交流、中午能量补充',
    earth: '工作稳定期、决策时刻、季节过渡期',
    metal: '需要专注工作、分析问题、秋季调养',
    water: '睡前放松、深度冥想、冬季能量保存'
  };
  return scenarios[element] || '';
}

export default SoundPlayer; 