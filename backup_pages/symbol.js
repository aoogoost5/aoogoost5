import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

export default function SymbolPage() {
  return (
    <>
      <Head>
        <title>能量符号定制 - 五行分析系统</title>
        <meta name="description" content="根据您的五行分析结果，定制专属能量符号" />
      </Head>
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8}>
          <Heading as="h1" size="xl" textAlign="center">
            能量符号定制
          </Heading>
          <Text textAlign="center" maxW="700px">
            根据您的五行分析结果，我们可以为您定制专属的能量符号，帮助您平衡五行能量，提升生活品质。
          </Text>
          
          <Box p={8} bg="white" borderRadius="lg" boxShadow="md" w="100%">
            <VStack spacing={6}>
              <Heading as="h2" size="md">功能开发中</Heading>
              <Text>
                能量符号定制功能正在开发中，敬请期待！
              </Text>
              <NextLink href="/" passHref legacyBehavior>
                <Button colorScheme="blue">返回首页</Button>
              </NextLink>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
} 