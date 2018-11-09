const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: require('path').resolve(__dirname, 'dist')
  },
  plugins: [
    new htmlPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    open: true,
    port: 9001,
    hot: true,
    compress: false,
    inline: true,
  },
  watchOptions: {
    ignored: [require('path').resolve(__dirname, './dist/**/*.*'), 'node_modules']
  }
}