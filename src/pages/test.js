import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';
import Head from 'next/head';

export default function TestPage() {
  return (
    <>
      <Head>
        <title>测试页面</title>
        <meta name="description" content="测试页面" />
      </Head>
      <Container maxW="container.lg" py={12}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            这是一个测试页面
          </Heading>
          <Text fontSize="xl">
            如果您能看到这个页面，说明基本渲染正常。
          </Text>
        </Box>
      </Container>
    </>
  );
} 