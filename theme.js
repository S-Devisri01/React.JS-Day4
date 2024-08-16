// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      100: '#f6f9f8',  // Very Light Green
      200: '#e0f2f1',  // Light Mint
      300: '#b9e2d5',  // Soft Mint
      400: '#8cd4be',  // Pale Turquoise
      500: '#4cb8a4',  // Teal
    },
    secondary: {
      100: '#f9f9f9',  // Lightest Gray
      200: '#e2e2e2',  // Light Gray
      300: '#c0c0c0',  // Medium Gray
      400: '#9e9e9e',  // Dark Gray
      500: '#7d7d7d',  // Darker Gray
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          borderColor: 'primary.300',
          _placeholder: {
            color: 'secondary.400',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderColor: 'primary.300',
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: 'primary.300',
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          borderColor: 'primary.300',
        },
      },
    },
  },
});

export default theme;
