import { Box, VStack, Heading, Text, Container, SimpleGrid, Button, Link, Flex, Icon, 
  FormControl, FormLabel, Input, Select, Checkbox, HStack, Divider, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { FaYinYang, FaStore, FaChartPie } from 'react-icons/fa'
import NextLink from 'next/link'
import { useState } from 'react'

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
    
    // 这里是示例结果，实际项目中应该实现真正的五行计算逻辑
    setResult({
      bazi: {
        year: '甲子',
        month: '乙丑',
        day: '丙寅',
        hour: unknownTime ? '未知' : '丁卯'
      },
      wuxing: {
        wood: 30,
        fire: 20,
        earth: 15,
        metal: 25,
        water: 10
      },
      analysis: '您的八字中木火较旺，金水较弱，五行不平衡。建议佩戴金、水相关饰品，有助于平衡五行能量。'
    });
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

          {/* 五行理论简介 */}
          <Box bg="gray.50" borderRadius="lg" p={6} mt={8} w="100%" boxShadow="sm">
            <Heading as="h2" size="md" mb={2} color="teal.600">什么是五行？</Heading>
            <Text color="gray.700">
              五行是中国古代哲学的重要理论，指木、火、土、金、水五种基本元素，代表宇宙万物的五种运动变化。五行之间相生相克，影响着人的性格、健康、事业等方方面面。通过五行分析，可以更好地认识自我，趋利避害，提升人生幸福感。
            </Text>
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
                
                <Box mb={4}>
                  <Heading as="h4" size="sm" mb={2}>五行分布：</Heading>
                  <SimpleGrid columns={5} spacing={2}>
                    <Box bg="green.100" p={2} borderRadius="md" textAlign="center">
                      <Text fontSize="xs">木</Text>
                      <Text fontWeight="bold">{result.wuxing.wood}%</Text>
                    </Box>
                    <Box bg="red.100" p={2} borderRadius="md" textAlign="center">
                      <Text fontSize="xs">火</Text>
                      <Text fontWeight="bold">{result.wuxing.fire}%</Text>
                    </Box>
                    <Box bg="yellow.100" p={2} borderRadius="md" textAlign="center">
                      <Text fontSize="xs">土</Text>
                      <Text fontWeight="bold">{result.wuxing.earth}%</Text>
                    </Box>
                    <Box bg="gray.100" p={2} borderRadius="md" textAlign="center">
                      <Text fontSize="xs">金</Text>
                      <Text fontWeight="bold">{result.wuxing.metal}%</Text>
                    </Box>
                    <Box bg="blue.100" p={2} borderRadius="md" textAlign="center">
                      <Text fontSize="xs">水</Text>
                      <Text fontWeight="bold">{result.wuxing.water}%</Text>
                    </Box>
                  </SimpleGrid>
                </Box>
                
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
  )
} 