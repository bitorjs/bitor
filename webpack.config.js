const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const BitorPlugin = require('../application/webpack-watcher');

var path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
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
    new BitorPlugin({
      root: process.cwd() + '/app',
      cachefile: '.classloader.js',
      rules: {
        components: ["components/**/*.vue"],
        controllers: "controllers/**/*.js",
        // view: ['view/**/*.vue', 'view/**/*.js'],
      },
      onAddCallback: function (ns, path) {
        console.log('add', ns, path)
      },
      onUnlinkCallback: function (ns, path) {
        console.log('del', ns, path)
      },
      onChangeCallback: function (ns) {
        console.log('change', ns)
      },
      onCacheChange(files) {
        console.log(files)
      },
      normalize(data) {
        let import_packages = "";
        let export_packages = {}
        let count = 0;
        for (const p in data) {
          if (data.hasOwnProperty(p)) {
            export_packages[p] = {};
            const arr = data[p];
            arr.forEach(filepath => {
              import_packages += `import x_${count} from '${filepath}';\r\n`;
              export_packages[p][`${p}_${path.basename(filepath).split('.')[0]}`] = `{x_${count}{`;
              ++count;
            });
          }
        }

        return `${import_packages} \r\n\r\nexport default ${JSON.stringify(export_packages, null, 4).replace(/"{|{"/g,'')}`;
      }
    })
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
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // cacheDirectory: true, // for faster rebuild
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'less-loader']
      }
    ]
  }
}