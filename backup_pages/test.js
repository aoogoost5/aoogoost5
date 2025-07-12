import { Box, Heading, Text, Container, Button } from '@chakra-ui/react'
import Head from 'next/head'

export default function TestPage() {
  return (
    <>
      <Head>
        <title>测试页面 - 五行分析系统</title>
        <meta name="description" content="测试页面加载" />
      </Head>
      <Container maxW="container.lg" py={12} className="overflow-fix">
        <Box textAlign="center" py={10} px={6}>
          <Heading as="h1" size="2xl" mb={6}>
            测试页面
          </Heading>
          <Text fontSize="xl" mb={6}>
            这是一个测试页面，用于验证网站是否正确加载所有内容。
          </Text>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md" my={8}>
            <Heading as="h2" size="lg" mb={4}>
              表单测试区域
            </Heading>
            <Text mb={4}>
              这里应该显示一个表单区域。如果您能看到这段文字，说明页面加载正常。
            </Text>
            <Button colorScheme="blue" size="lg">
              测试按钮
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
} 