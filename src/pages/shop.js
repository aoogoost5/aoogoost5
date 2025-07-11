import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

export default function ShopPage() {
  return (
    <>
      <Head>
        <title>五行能量商城 - 五行分析系统</title>
        <meta name="description" content="选购五行能量符号及相关产品，提升生活品质" />
      </Head>
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8}>
          <Heading as="h1" size="xl" textAlign="center">
            五行能量商城
          </Heading>
          <Text textAlign="center" maxW="700px">
            在这里，您可以选购各种五行能量符号及相关产品，帮助您平衡五行能量，提升生活品质。
          </Text>
          
          <Box p={8} bg="white" borderRadius="lg" boxShadow="md" w="100%">
            <VStack spacing={6}>
              <Heading as="h2" size="md">商城建设中</Heading>
              <Text>
                五行能量商城正在建设中，敬请期待！
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