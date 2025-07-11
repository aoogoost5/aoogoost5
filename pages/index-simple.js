import { Box, VStack, Heading, Text, Container, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'

export default function SimpleHome() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('男');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 简单的结果设置
    setResult({
      message: `您的出生日期是 ${birthDate}，时间是 ${birthTime || '未知'}，性别是 ${gender}。`
    });
  };

  return (
    <>
      <Head>
        <title>五行分析系统 - 简化版</title>
        <meta name="description" content="五行分析系统简化版" />
      </Head>
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            五行分析系统
          </Heading>
          <Text fontSize="lg" textAlign="center">
            欢迎使用五行分析系统，探索您的命理五行，找寻人生方向。
          </Text>
          
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <Heading as="h2" size="lg" mb={6} textAlign="center">
              生辰八字五行测算
            </Heading>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>出生日期（阳历）：</FormLabel>
                  <Input 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>出生时辰：</FormLabel>
                  <Input 
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                  />
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
                
                <Button 
                  type="submit" 
                  colorScheme="blue" 
                  size="lg" 
                  width="100%"
                  mt={4}
                >
                  计算
                </Button>
              </VStack>
            </form>
            
            {result && (
              <Box mt={8} p={6} bg="gray.50" borderRadius="md">
                <Heading as="h3" size="md" mb={4}>
                  分析结果
                </Heading>
                <Text>{result.message}</Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </>
  );
} 