import { Box, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>五行分析系统</title>
      </Head>
      <Box minH="100vh" bg="gray.50" p={8}>
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          五行分析系统
        </Heading>
        <Text textAlign="center">
          欢迎使用五行分析系统，探索您的命理五行，找寻人生方向。
        </Text>
      </Box>
    </>
  )
} 