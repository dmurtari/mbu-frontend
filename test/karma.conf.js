module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon', 'chai'],
    files: ['**/*Spec.js'],
    preprocessors: {
      '**/*.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.vue$/,
            loader: 'vue'
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  });
};