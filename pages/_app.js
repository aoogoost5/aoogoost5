import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// 创建自定义主题
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      }
    }
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'gray.700',
      }
    },
    Text: {
      baseStyle: {
        color: 'gray.600',
      }
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp 