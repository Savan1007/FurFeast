import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5f6fa',
      100: '#e4e7f5',
      200: '#d0d5eb',
      300: '#b3badc',
      400: '#8f98c7',
      500: '#6b76b2',
      600: '#515c96',
      700: '#3f477a',
      800: '#2d335e',
      900: '#1b1f42',
    }
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'sm',
        }
      }
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
});

export default theme;