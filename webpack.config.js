const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
let { apps } = require('./config');

const isProduction = process.env.NODE_ENV === 'production';

// 开发模式只加载需要开发的entry
if (!isProduction) {
  const devPage = process.env.DEV_PAGE;
  if (devPage) {
    apps = apps.filter(entry => entry.name === devPage);
  }
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: apps.reduce((acc, value) => {
    return {
      ...acc,
      [value.name]: [path.resolve('./src/global'), path.resolve(value.entry)]
    };
  }, {}),
  output: {
    path: path.resolve('apps'),
    filename: '[name].js?q=[hash:8]'
  },
  resolve: {
    alias: {
      config: path.resolve('config'),
      '@': path.resolve('src'),
      vue$: 'vue/dist/vue.runtime.esm'
    },
    extensions: ['.ts', '.js', '.json', '.vue'],
    plugins: [new TsconfigPathsPlugin()]
  },
  devServer: {
    contentBase: ['static'],
    port: 10001,
    hot: true,
    open: true,
    openPage: apps[0].name + '.html',
    useLocalIp: true,
    overlay: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s[x]?$/,
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
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: 'url-loader'
      }
    ]
  },
  devtool: !isProduction ? 'source-map' : undefined,
  externals: {
    vue: 'Vue'
  },
  plugins: [
    ...apps.map(
      value =>
        new HtmlWebpackPlugin({
          template: 'templates/index.html',
          filename: `${value.name}.html`,
          inject: true,
          chunks: [value.name],
          title: value.title
        })
    ),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve('static'),
        to: path.resolve('apps')
      }
    ]),
    new CaseSensitivePathsPlugin()
  ]
};
