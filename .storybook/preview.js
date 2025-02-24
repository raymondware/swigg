import React from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../src/styles/GlobalStyles';

import theme from '../src/styles/theme';



export const decorators = [

  (Story) => (

    <ThemeProvider theme={theme}>

      <GlobalStyles />

      <Story />

    </ThemeProvider>

  ),

];



export const parameters = {

  actions: { argTypesRegex: "^on[A-Z].*" },

  controls: {

    matchers: {

      color: /(background|color)$/i,

      date: /Date$/,

    },

  },

};


