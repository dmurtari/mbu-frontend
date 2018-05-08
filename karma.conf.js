var path = require('path')
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon', 'chai', 'sinon-chai'],
    files: ['./src/**/*Spec.js'],
    preprocessors: {
      './src/**/*.js': ['webpack']
    },
    reporters: ['spec'],
    webpack: webpackConfig,
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
