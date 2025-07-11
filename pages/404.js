import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Custom404() {
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>页面未找到 - 五行分析系统</title>
      </Head>
      <Box minH="100vh" bg="gray.50" p={8} textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          页面未找到
        </Heading>
        <Text mb={8}>
          抱歉，您访问的页面不存在。
        </Text>
        <Button colorScheme="blue" onClick={() => router.push('/')}>
          返回首页
        </Button>
      </Box>
    </>
  )
} 