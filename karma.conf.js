var path = require('path')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon', 'chai'],
    files: ['./src/**/*Spec.js'],
    preprocessors: {
      './src/**/*.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: {
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

    webpackMiddleware: {
      noInfo: true
    }
  });
};
