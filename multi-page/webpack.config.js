const path = require('path')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index/index.js'),
    login: path.resolve(__dirname, './src/login/index.js')
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/static/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
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
              name: '[name].[ext]'
              // name: '.images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrors(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  devtool: "cheap-eval-source-map"

}