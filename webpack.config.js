const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    first: path.resolve('./src/demos/index')
  },
  output: {
    path: path.resolve('writing-board'),
    filename: '[name].js?q=[hash:8]'
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'shader': path.resolve('src/shader'),
      'webgl-helper': path.resolve('src/utils/webgl-helper'),
      'utils': path.resolve('src/utils'),
      'vue$': 'vue/dist/vue.runtime.esm'
    },
    extensions: ['.js', '.json', '.vue', '.less']
  },
  devServer: {
    contentBase: 'dist-webpack',
    port: 10001,
    hot: true,
    open: true,
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
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/template.html',
      filename: 'index.html',
      inject: true,
      chunks: ['first']
    }),
    new VueLoaderPlugin()
  ]
}
