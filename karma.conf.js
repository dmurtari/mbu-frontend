module.exports = {
  browsers: ['ChromeHeadless'],
  frameworks: ['mocha', 'sinon', 'chai', 'sinon-chai'],
  files: ['./src/**/*Spec.js'],
  preprocessors: {
    './src/**/*.vue': ['webpack', 'sourcemap'],
    './src/**/*.js': ['webpack']
  },
  reporters: ['spec'],
  customLaunchers: {
    ChromeHeadless: {
      base: 'Chrome',
      flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9333']
    }
  },
  webpackMiddleware: {
    noInfo: true
  },
  webpack: require('./webpack.config')
};
