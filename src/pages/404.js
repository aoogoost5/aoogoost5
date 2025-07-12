import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>页面未找到 - 五行分析系统</title>
      </Head>
      <Box 
        minHeight="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="gray.50"
      >
        <VStack spacing={6} textAlign="center" p={8}>
          <Heading size="2xl">404</Heading>
          <Heading size="lg">页面未找到</Heading>
          <Text>您访问的页面不存在或已被移除。</Text>
          <NextLink href="/" passHref legacyBehavior>
            <Button colorScheme="blue">返回首页</Button>
          </NextLink>
        </VStack>
      </Box>
    </>
  );
} 