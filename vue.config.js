/* eslint-disable indent */
const path = require('path')
const port = 8089
function resolve(dir) {
  return path.join(__dirname, dir)
}

const proxy = true
const isDev = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// vue.config.js
module.exports = {
  transpileDependencies: process.env.NODE_ENV === 'development' ? [] : ['*'],
  publicPath: isProduction ? '/Friendly-Almond' : '/', // URL prefix
  outputDir: 'yacht',
  assetsDir: 'assets',
  filenameHashing: true,
  lintOnSave: isDev,
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    https: false,
    hotOnly: false,
    proxy: proxy
      ? {
          [process.env.VUE_APP_API_BASE_URL]: {
            target: process.env.PROXY_URL_1,
            pathRewrite: {
              ['^' + process.env.VUE_APP_API_BASE_URL]: ''
            },
            changeOrigin: true, // when the target is domain nor ip,set it true
            secure: false
          }
        }
      : null,
    disableHostCheck: isDev
  },
  configureWebpack: config => {
    // console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
  }
}
