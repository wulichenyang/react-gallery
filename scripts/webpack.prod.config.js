const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 构建前删除dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 注意顺序 postcss 在中间
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
    ]
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 清理dist
    new CleanWebpackPlugin(['dist'],{
      root: path.join(__dirname, '../'),
      verbose:false,
      // exclude:['img']//不删除img静态资源
    }),
    // 提取css
    new ExtractTextPlugin({
      filename: 'style.[name].[contenthash:4].css',
      allChunks: true
    }),
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    new webpack.optimize.OccurrenceOrderPlugin (),
    // 压缩优化代码开始
    new webpack.optimize.UglifyJsPlugin({ 
      minimize: true,
      comments: false //去掉注释
    }),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    new Copy([
      { from: './app/images', to: './images' },
    ]),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)