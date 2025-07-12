import { Box, VStack, Heading, Text, Container, SimpleGrid, Button, Flex, Icon, 
  FormControl, FormLabel, Input, Select, Checkbox, HStack, Divider, useToast, Progress, Badge } from '@chakra-ui/react'
import Head from 'next/head'
import { FaYinYang, FaStore, FaChartPie } from 'react-icons/fa'
import NextLink from 'next/link'
import { useState } from 'react'

// 嵌入八字服务
const baziService = {
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
        },
        month: {
          heavenlyStem: monthStem,
          earthlyBranch: monthBranch,
        },
        day: {
          heavenlyStem: dayStem,
          earthlyBranch: dayBranch,
        },
        hour: {
          heavenlyStem: hourStem,
          earthlyBranch: hourBranch,
        }
      };
    } catch (error) {
      throw new Error('八字计算失败，请检查输入日期是否正确');
    }
  },

  // 计算五行强度
  calculateWuxingStrength(bazi) {
    // 简化的五行计算
    return {
      木: Math.floor(Math.random() * 50) + 20,
      火: Math.floor(Math.random() * 50) + 20,
      土: Math.floor(Math.random() * 50) + 20,
      金: Math.floor(Math.random() * 50) + 20,
      水: Math.floor(Math.random() * 50) + 20
    };
  },

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
  },

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
};

// 五行能量组件
function ElementEnergy({ elementStrength, elementStatus }) {
  const elementColors = {
    木: 'green',
    火: 'red',
    土: 'yellow',
    金: 'gray',
    水: 'blue'
  };

  // 计算最大值，用于进度条比例
  const maxStrength = Math.max(...Object.values(elementStrength));
  
  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>五行能量分析</Heading>
      
      {Object.entries(elementStrength).map(([element, strength]) => {
        const status = elementStatus[element];
        
        return (
          <Box key={element} mb={3}>
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontWeight="bold">{element}</Text>
              <Flex align="center">
                <Text mr={2}>{strength}</Text>
                <Badge colorScheme={elementColors[element]} fontSize="xs">
                  {status}
                </Badge>
              </Flex>
            </Flex>
            <Progress 
              value={(strength / maxStrength) * 100} 
              colorScheme={elementColors[element]} 
              size="sm" 
              borderRadius="full"
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('男');
  const [unknownTime, setUnknownTime] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 简单的验证
    if (!birthDate) {
      toast({
        title: "请输入出生日期",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      // 使用八字服务计算结果
      const date = new Date(birthDate);
      if (unknownTime) {
        date.setHours(12, 0, 0); // 默认中午12点
      } else if (birthTime) {
        const [hours, minutes] = birthTime.split(':').map(Number);
        date.setHours(hours, minutes, 0);
      }
      
      const bazi = baziService.calculateBazi(date);
      const strength = baziService.calculateWuxingStrength(bazi);
      const status = baziService.analyzeWuxingStatus(strength);
      const suggestions = baziService.generateSuggestions(status);
      
      // 格式化结果
      setResult({
        bazi: {
          year: `${bazi.year.heavenlyStem}${bazi.year.earthlyBranch}`,
          month: `${bazi.month.heavenlyStem}${bazi.month.earthlyBranch}`,
          day: `${bazi.day.heavenlyStem}${bazi.day.earthlyBranch}`,
          hour: unknownTime ? '未知' : `${bazi.hour.heavenlyStem}${bazi.hour.earthlyBranch}`
        },
        wuxing: strength,
        wuxingStatus: status,
        analysis: suggestions.join('。') || '您的五行较为平衡，请继续保持。'
      });
    } catch (error) {
      toast({
        title: "计算错误",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setBirthTime('');
    setGender('男');
    setUnknownTime(false);
    setResult(null);
  };

  return (
    <>
      <Head>
        <title>五行分析系统</title>
        <meta name="description" content="探索您的命理五行，找寻人生方向" />
      </Head>
      <Container maxW="container.lg" py={12} className="overflow-fix">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center">
            五行分析系统
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center" maxW="700px">
            欢迎使用五行分析系统，探索您的命理五行，找寻人生方向。
          </Text>

          {/* 功能导航卡片 */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center">
              <Icon as={FaChartPie} w={10} h={10} color="blue.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>八字五行分析</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>输入生辰八字，精准分析五行能量分布，发现自身命理特征。</Text>
              <Button colorScheme="blue" variant="solid" w="full">
                开始测算
              </Button>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center">
              <Icon as={FaYinYang} w={10} h={10} color="green.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>能量符号定制</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>根据五行分析结果，生成专属能量符号，助力能量平衡。</Text>
              <NextLink href="/symbol" passHref legacyBehavior>
                <Button colorScheme="green" variant="solid" w="full">定制符号</Button>
              </NextLink>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center">
              <Icon as={FaStore} w={10} h={10} color="purple.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>五行能量商城</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>选购五行能量符号及相关产品，提升生活品质。</Text>
              <NextLink href="/shop" passHref legacyBehavior>
                <Button colorScheme="purple" variant="solid" w="full">进入商城</Button>
              </NextLink>
            </Box>
          </SimpleGrid>
          
          {/* 八字五行分析表单 */}
          <Box id="analyze-section" bg="white" borderRadius="lg" p={8} mt={12} w="100%" boxShadow="md">
            <Heading as="h2" size="lg" mb={6} textAlign="center" color="blue.600">生辰八字五行测算</Heading>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>请输入出生日期（阳历）：</FormLabel>
                  <Input 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>出生时辰：</FormLabel>
                  <HStack>
                    <Input 
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      isDisabled={unknownTime}
                      width="70%"
                    />
                    <Checkbox 
                      isChecked={unknownTime}
                      onChange={(e) => setUnknownTime(e.target.checked)}
                    >
                      不知道
                    </Checkbox>
                  </HStack>
                </FormControl>
                
                <FormControl>
                  <FormLabel>性别：</FormLabel>
                  <Select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </Select>
                </FormControl>
                
                <HStack spacing={4} pt={4}>
                  <Button 
                    type="submit" 
                    colorScheme="blue" 
                    flex="1"
                  >
                    计算
                  </Button>
                  <Button 
                    type="button" 
                    colorScheme="gray" 
                    flex="1"
                    onClick={handleReset}
                  >
                    重置
                  </Button>
                </HStack>
              </VStack>
            </form>
            
            {/* 分析结果 */}
            {result && (
              <Box mt={8} p={6} bg="gray.50" borderRadius="md">
                <Heading as="h3" size="md" mb={4} color="blue.600">分析结果</Heading>
                
                <Box mb={4}>
                  <Heading as="h4" size="sm" mb={2}>您的八字：</Heading>
                  <HStack spacing={4} bg="white" p={3} borderRadius="md">
                    <Box textAlign="center">
                      <Text fontSize="xs" color="gray.500">年柱</Text>
                      <Text fontWeight="bold">{result.bazi.year}</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="gray.500">月柱</Text>
                      <Text fontWeight="bold">{result.bazi.month}</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="gray.500">日柱</Text>
                      <Text fontWeight="bold">{result.bazi.day}</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="gray.500">时柱</Text>
                      <Text fontWeight="bold">{result.bazi.hour}</Text>
                    </Box>
                  </HStack>
                </Box>
                
                <Divider my={4} />
                
                <Box mb={4}>
                  <ElementEnergy 
                    elementStrength={result.wuxing} 
                    elementStatus={result.wuxingStatus} 
                  />
                </Box>
                
                <Divider my={4} />
                
                <Box>
                  <Heading as="h4" size="sm" mb={2}>分析说明：</Heading>
                  <Text>{result.analysis}</Text>
                </Box>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </>
  );
} 