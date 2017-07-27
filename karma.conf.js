module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon', 'chai'],
    files: ['./src/**/*Spec.js'],
    preprocessors: {
      './src/**/*.js': ['webpack']
    },
    webpack: {
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