const path = require('path')

// Shared config for TypeScript + JavaScript
const sharedRules = [
  {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true // Faster builds, type-check separately
        }
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 50000
      }
    }
  }
]

const sharedResolve = {
  extensions: ['.tsx', '.ts', '.js', '.scss', '.json', '.png', '.gif', '.jpg', '.svg'],
  alias: {
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    'styled-components': path.resolve('./node_modules/styled-components')
  }
}

module.exports = [
  // CommonJS build
  {
    entry: './src/components/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'swigg.js',
      libraryTarget: 'commonjs2'
    },
    externals: {
      react: 'commonjs react',
      'react-dom': 'commonjs react-dom',
      'styled-components': 'commonjs styled-components',
      'prop-types': 'commonjs prop-types'
    },
    module: {
      rules: sharedRules
    },
    resolve: sharedResolve
  },
  // ESM build
  {
    entry: './src/components/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'swigg.esm.js',
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'styled-components': 'styled-components',
      'prop-types': 'prop-types'
    },
    module: {
      rules: sharedRules
    },
    resolve: sharedResolve
  }
]
