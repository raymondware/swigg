module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'standard',
    'standard-react',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  env: {
    node: true,
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['error', {
      varsIgnorePattern: '^React$',
      argsIgnorePattern: '^_'
    }],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always']
  }
} 