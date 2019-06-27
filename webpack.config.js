const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    first: path.resolve('./src/demos/click2ShowPixel')
  },
  output: {
    path: path.resolve('dist-webpack'),
    filename: '[name]-webpack-bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'shader': path.resolve('src/shader'),
      'webgl-helper': path.resolve('src/utils/webgl-helper'),
      'utils': path.resolve('src/utils')
    }
  },
  devServer: {
    contentBase: 'dist-webpack',
    port: 10001,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(frag|vert)$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist-webpack/template.html',
      filename: 'index.html',
      inject: true,
      chunks: ['first']
    })
  ]
}
