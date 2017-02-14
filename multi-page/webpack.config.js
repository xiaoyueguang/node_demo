const path = require('path')
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (env) {
  const isProd = env === 'prod'
  const plugins = [
    new FriendlyErrors(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
  ]

  let devtool = 'cheap-module-source-map'

  if (isProd) {
    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }))

    devtool = 'cheap-source-map'
  }

  return {
    entry: {
      index: path.resolve(__dirname, './src/index/index.js'),
      login: path.resolve(__dirname, './src/login/index.js')
    },
    output: {
      filename: 'js/[name].js',
      path: __dirname + '/public/static/'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            loader: 'css-loader'
          })
        },
        {
          test: /\.(sass|scss)$/,
          use: ["style-loader", {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.(png|jpg|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            // {
            //   loader: 'file-loader'
            // },
            {
              loader: 'url-loader',
              query: {
                limit: 100,
                // name: '[name].[ext]'
                name: '/images/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: plugins,
    devtool: devtool,
    devServer: {
      port: 8080,
      host: 'localhost',
      publicPath: '/public/static/'
    }
  }

}