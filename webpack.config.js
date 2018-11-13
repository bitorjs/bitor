const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BitorPlugin = require('../application/webpack-watcher');

var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // new BitorPlugin({
    //   root: process.cwd() + '/app',
    //   cachefile: '.classloader',
    //   rules: {
    //     controller: "controller/**/*.js",
    //     view: ['view/**/*.vue', 'view/**/*.js'],
    //   },
    //   onAddCallback: function (ns, path) {
    //     console.log('add', ns, path)
    //   },
    //   onUnlinkCallback: function (ns, path) {
    //     console.log('del', ns, path)
    //   },
    //   onChangeCallback: function (ns) {
    //     console.log('change', ns)
    //   },
    //   onCacheChange(files) {
    //     console.log(files)
    //   },
    //   normalize(data) {
    //     return `module.exports = ${JSON.stringify(data,null, 4)}`;
    //   }
    // })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 9001,
    hot: true,
    compress: false,
    inline: true,
  },
  watchOptions: {
    ignored: [require('path').resolve(__dirname, './dist/**/*.*'), 'node_modules']
  },
  resolve: {
    // modules:[
    //   // path.resolve( "./"), 
    //   path.resolve( "./node_modules"), 
    //   // path.resolve('../router'),
    //   // path.resolve('../router/node_modules'),
    //   // path.resolve('../application'),
    //   // path.resolve('../application/node_modules'),
    //   // path.resolve('../HashHistory'),
    //   // path.resolve('../HashHistory/node_modules'),
    // ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}