import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Container, 
  SimpleGrid, 
  Button, 
  Flex, 
  Icon,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  HStack,
  useToast,
  Divider
} from '@chakra-ui/react';
import Head from 'next/head';
import { FaYinYang, FaStore, FaChartPie } from 'react-icons/fa';
import NextLink from 'next/link';
import ElementsIntro from '../components/ElementsIntro';
import ElementEnergy from '../components/ElementEnergy';
<<<<<<< HEAD
import axios from 'axios';
=======
import baziService from '../services/bazi.service';
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('男');
  const [unknownTime, setUnknownTime] = useState(false);
  const [result, setResult] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
=======
  const toast = useToast();

  const handleSubmit = (e) => {
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
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
<<<<<<< HEAD
      setLoading(true);
      
      // 根据当前环境选择API端点
      let response;
      
      // 检测是否在Vercel平台上
      const isVercel = window.location.hostname.includes('vercel.app');
      
      if (isVercel) {
        // 在Vercel平台上，使用Vercel API端点
        response = await axios.post('/api/calculate-bazi', {
          birthDate,
          birthTime,
          gender,
          unknownTime
        });
        console.log('使用Vercel API端点');
      } else {
        // 在Netlify或其他平台上，使用Netlify Function
        response = await axios.post('/.netlify/functions/calculate-bazi', {
          birthDate,
          birthTime,
          gender,
          unknownTime
        });
        console.log('使用Netlify Function');
      }
      
      setResult(response.data);
      
      // 如果有节日信息，显示祝福
      if (response.data.lunarInfo && response.data.lunarInfo.festivals && response.data.lunarInfo.festivals.length > 0) {
        toast({
          title: "今天是特殊日子",
          description: `农历：${response.data.lunarInfo.year}年${response.data.lunarInfo.month}月${response.data.lunarInfo.day}日，${response.data.lunarInfo.festivals.join('，')}`,
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "计算错误",
        description: error.response?.data?.error || error.message,
=======
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
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
        status: "error",
        duration: 3000,
        isClosable: true,
      });
<<<<<<< HEAD
    } finally {
      setLoading(false);
=======
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
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
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" bgGradient="linear(to-r, green.400, blue.500)" bgClip="text" fontWeight="extrabold" textAlign="center">
            五行分析系统
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center" maxW="700px">
            基于中国传统五行理论，结合现代科技，提供八字五行分析、能量符号定制与专属商城服务，助您探索命理奥秘，平衡人生能量。
          </Text>

          {/* 功能导航卡片 */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center" _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }} transition="all 0.2s">
              <Icon as={FaChartPie} w={10} h={10} color="blue.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>八字五行分析</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>输入生辰八字，精准分析五行能量分布，发现自身命理特征。</Text>
              <Button colorScheme="blue" variant="solid" w="full" onClick={() => document.getElementById('analyze-section').scrollIntoView({ behavior: 'smooth' })}>
                开始测算
              </Button>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center" _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }} transition="all 0.2s">
              <Icon as={FaYinYang} w={10} h={10} color="green.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>能量符号定制</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>根据五行分析结果，生成专属能量符号，助力能量平衡。</Text>
              <NextLink href="/symbol" passHref legacyBehavior>
                <Button colorScheme="green" variant="solid" w="full">定制符号</Button>
              </NextLink>
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" textAlign="center" _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }} transition="all 0.2s">
              <Icon as={FaStore} w={10} h={10} color="purple.400" mb={3} />
              <Heading as="h3" size="md" mb={2}>五行能量商城</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>选购五行能量符号及相关产品，提升生活品质。</Text>
              <NextLink href="/shop" passHref legacyBehavior>
                <Button colorScheme="purple" variant="solid" w="full">进入商城</Button>
              </NextLink>
            </Box>
          </SimpleGrid>

          {/* 五行理论介绍 */}
          <Box w="100%" mt={12}>
            <ElementsIntro />
          </Box>
          
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
<<<<<<< HEAD
                    isLoading={loading}
                    loadingText="计算中..."
=======
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
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
                
<<<<<<< HEAD
                {/* 添加版本信息显示 - 更明显的位置和样式 */}
                <Box mb={4} p={2} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
                  <Text fontSize="md" fontWeight="bold" color="blue.700">
                    API信息: {result.version || '未知版本'} | {result.platform || '未知平台'} | 性别: {result.gender || '未知'}
                  </Text>
                  {result.debug && (
                    <Text fontSize="sm" color="blue.600" mt={1}>
                      调试: {JSON.stringify(result.debug)}
                    </Text>
                  )}
                </Box>
                
=======
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
                <Box mb={4}>
                  <Heading as="h4" size="sm" mb={2}>您的八字：</Heading>
                  <HStack spacing={4} bg="white" p={3} borderRadius="md">
                    <Box textAlign="center">
<<<<<<< HEAD
                      <Text fontSize="xs" color="gray.500">性别</Text>
                      <Text fontWeight="bold">{result.gender}</Text>
                    </Box>
                    <Box textAlign="center">
=======
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
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
                
<<<<<<< HEAD
                {/* 添加农历信息显示 */}
                {result.lunarInfo && (
                  <Box mb={4}>
                    <Heading as="h4" size="sm" mb={2}>农历信息：</Heading>
                    <HStack spacing={4} bg="white" p={3} borderRadius="md">
                      <Box textAlign="center">
                        <Text fontSize="xs" color="gray.500">农历年</Text>
                        <Text fontWeight="bold">{result.lunarInfo.year}</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="gray.500">农历月</Text>
                        <Text fontWeight="bold">{result.lunarInfo.month}</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="gray.500">农历日</Text>
                        <Text fontWeight="bold">{result.lunarInfo.day}</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="gray.500">生肖</Text>
                        <Text fontWeight="bold">{result.lunarInfo.zodiac}</Text>
                      </Box>
                    </HStack>
                  </Box>
                )}
                
=======
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
                <Divider my={4} />
                
                <Box mb={4}>
                  <ElementEnergy 
<<<<<<< HEAD
                    elementStrength={result.strength} 
                    elementStatus={result.status} 
=======
                    elementStrength={result.wuxing} 
                    elementStatus={result.wuxingStatus} 
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
                  />
                </Box>
                
                <Divider my={4} />
                
                <Box>
                  <Heading as="h4" size="sm" mb={2}>分析说明：</Heading>
<<<<<<< HEAD
                  <Text>{result.suggestions ? result.suggestions.join('。') : '您的五行较为平衡，请继续保持。'}</Text>
=======
                  <Text>{result.analysis}</Text>
>>>>>>> 1af66ab390b14a1bf97a1e4da8306e198dc67bd1
                </Box>
                
                <Divider my={4} />
                
                <Box mt={6} textAlign="center">
                  <NextLink href="/symbol" passHref legacyBehavior>
                    <Button colorScheme="green" size="lg">
                      获取您的专属能量符号
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            )}
            
            {/* 结果显示 */}
            {result && (
              <Box mt={8} p={6} bg="gray.50" borderRadius="lg" w="100%">
                <Heading as="h3" size="md" mb={4}>您的八字五行分析结果</Heading>
                <VStack align="stretch" spacing={4}>
                  <Text><strong>八字：</strong> {result.bazi.year} {result.bazi.month} {result.bazi.day} {result.bazi.hour}</Text>
                  <Text><strong>五行能量分布：</strong></Text>
                  <ElementEnergy wuxing={result.wuxing} />
                  <Text><strong>五行状态分析：</strong> {result.wuxingStatus}</Text>
                  <Text><strong>平衡建议：</strong> {result.analysis}</Text>
                </VStack>
                <Flex justify="center" mt={6} gap={4}>
                  <Button colorScheme="green" onClick={() => window.location.href = '/symbol'}>生成能量符号</Button>
                  <Button colorScheme="purple" onClick={() => window.location.href = '/shop'}>进入商城</Button>
                  <Button variant="outline" onClick={handleReset}>重新测算</Button>
                </Flex>
              </Box>
            )}
            
            {/* 添加版本和日期 */}
            <Box mt={8} textAlign="center" color="gray.500">
              <Text>版本: 1.0.0 - 日期: {new Date().toLocaleDateString('zh-CN')}</Text>
            </Box>
          </VStack>
        </Container>
      </>
    );
}