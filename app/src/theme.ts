import { theme as baseTheme } from '@chakra-ui/react'

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    redCross: {
      50: '#FFE5E5',
      100: '#FFCCCC',
      200: '#FF9999',
      300: '#FF6666',
      400: '#FF3333',
      500: '#FF0000', // Couleur principale de la Croix-Rouge
      600: '#CC0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
  },
  components: {
    ...baseTheme.components,
    Button: {
      ...baseTheme.components?.Button,
      defaultProps: {
        colorScheme: 'redCross',
      },
    },
    Heading: {
      ...baseTheme.components?.Heading,
      baseStyle: {
        color: 'redCross.500',
      },
    },
  },
  styles: {
    ...baseTheme.styles,
    global: {
      ...baseTheme.styles?.global,
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
}

export default theme 