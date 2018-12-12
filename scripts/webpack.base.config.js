
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = (relatedPath) => {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    main: [
      'babel-polyfill',
      resolve('../app/index.js')
    ],
  },
  output: {
    path: resolve('../dist'),
    // 生产环境用，开发环境chunkhash与-hot热加载冲突
    filename: '[name].[chunkhash:4].js',
    // filename: '[name].[hash:4].js',
    // equire.ensure去加载模块的时候才会出现
    chunkFilename: '[name].[chunhash:4].js',
    publicPath:'/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@app': path.join(__dirname, '../app'),
      // redux路径引用有点问题 暂时相对路径
      '@redux': path.join(__dirname, '../app/redux'),
      '@actions': path.join(__dirname, '../app/redux/actions'),
      '@reducers': path.join(__dirname, '../app/redux/reducers'),
      '@selectors': path.join(__dirname, '../app/redux/selectors'),
      '@api': path.join(__dirname, '../app/api'),
      '@components': path.join(__dirname, '../app/components'),
      '@containers': path.join(__dirname, '../app/containers'),
      '@configs': path.join(__dirname, '../app/configs'),
      '@images': path.join(__dirname, '../app/images'),
      // '@middleware': path.join(__dirname, '../app/middleware'),
      '@pages': path.join(__dirname, '../app/pages'),
      '@styles': path.join(__dirname, '../app/styles'),
      '@utils': path.join(__dirname, '../app/utils'),
      '@model': path.join(__dirname, '../server/models'),
      '@routes': path.join(__dirname, '../server/routes'),
      '@schema': path.join(__dirname, '../server/schema'),
      // '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
    },
  },
  // resolveLoader: {
  //   moduleExtensions: ['-loader']
  // },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../app/index.html'),
    }),
    // vendor hash名字保持不变
    new webpack.HashedModuleIdsPlugin(),
    // 包含了 node_modules 里的公共js包统一打包到vendor里
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 入口文件名
      filename: 'vendor.[chunkhash:4].js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'async-common',
    //   minChunks: 3,
    // }),
  ]
}

module.exports = webpackConfigBase
