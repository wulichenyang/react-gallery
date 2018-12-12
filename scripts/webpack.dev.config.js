
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const devPort = 3838
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      resolve('../app/index.js')
    ],
  },
  output: {
    // 开发环境chunkhash与-hot热加载冲突
    filename: '[name].[hash:4].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 注意顺序 postcss 在中间
          use: ['css-loader', 'postcss-loader', 'less-loader']
        }))
      }
    ]
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),

    // 防止与热加载冲突[name]
    new ExtractTextPlugin('style.[name].css'),
    new OpenBrowserPlugin({
      url: `http://localhost:${devPort}/#/`,
    }),
  ],
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: devPort,
  },
}

module.exports = merge({
  customizeArray(a, b, key) {
    // entry.main不合并，全部替换
    if(key === 'entry.main') {
      return b
    }
    return undefined
  }
})(webpackConfigBase, webpackConfigDev)
