import { ChakraProvider, Box, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" p={8}>
        <Heading as="h1" size="xl" textAlign="center">
          五行分析系统
        </Heading>
      </Box>
    </ChakraProvider>
  )
} 