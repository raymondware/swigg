/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "docs": {
    "autodocs": "tag",
  },
  "webpackFinal": async (config) => {
    // Update the rules to handle JavaScript files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          sourceMap: true,
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            'babel-plugin-styled-components',
            'babel-plugin-macros'
          ]
        }
      }
    });

    return config;
  },
};

export default config;
