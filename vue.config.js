const path = require('path')

module.exports = {
  parallel: false,
  configureWebpack: {
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
