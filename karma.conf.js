var path = require('path')

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon', 'chai', 'sinon-chai'],
    files: ['./src/**/*Spec.js'],
    preprocessors: {
      './src/**/*.js': ['webpack']
    },
    reporters: ['spec'],
    webpack: {
      devtool: '#cheap-module-eval-source-map',
      resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      }
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9333'
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
