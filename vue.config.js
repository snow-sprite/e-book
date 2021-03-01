const webpack = require("webpack")
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== "production",
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  configureWebpack: {
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   "window.jQuery": 'jquery'
      //  })
    ]
  },
  chainWebpack: config => {},
  css: {
    requireModuleExtension: true,
    extract: process.env.NODE_ENV === "production" ? true : false,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 全局引入公共样式
        // prependData: '@import "~@/assets/scss/variables.scss";'
      }
    }
  },
  // 代理配置
  devServer: {
    port: 8090,
    open: true
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     pathRewrite: {
    //       "^/api": ""
    //     },
    //     secure: false // 可在https上且使用了无效证书的后端服务器上运行
    //   }
    // }
  },
  // 插件
  pluginOptions: {}
};
