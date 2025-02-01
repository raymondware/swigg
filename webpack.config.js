const path = require('path')

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
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
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
    },
    resolve: {
      extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg', '.svg'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'styled-components': path.resolve('./node_modules/styled-components')
      }
    }
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
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
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
    },
    resolve: {
      extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg', '.svg'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'styled-components': path.resolve('./node_modules/styled-components')
      }
    }
  }
]
