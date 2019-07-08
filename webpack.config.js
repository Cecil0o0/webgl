const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    first: path.resolve('src/pages/writing-board'),
    triangle: path.resolve('src/pages/triangle')
  },
  output: {
    path: path.resolve('apps'),
    filename: '[name].js?q=[hash:8]'
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'webgl-helper': path.resolve('src/utils/webgl-helper'),
      'utils': path.resolve('src/utils'),
      'vue$': 'vue/dist/vue.runtime.esm'
    },
    extensions: ['.ts', '.js', '.json', '.vue']
  },
  devServer: {
    contentBase: 'apps',
    port: 10001,
    hot: true,
    open: true,
    openPage: 'triangle.html',
    useLocalIp: true,
    overlay: true,
    host: '0.0.0.0'
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
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  devtool: isProduction ? 'cheap-eval-source-map' : undefined,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: 'writing-board.html',
      inject: true,
      chunks: ['first'],
      title: 'mini sketchpad'
    }),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: 'triangle.html',
      inject: true,
      chunks: ['triangle'],
      title: 'welcome to triangles\' world'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve('static'),
        to: path.resolve('apps')
      }
    ]),
    new CaseSensitivePathsPlugin()
  ]
}
